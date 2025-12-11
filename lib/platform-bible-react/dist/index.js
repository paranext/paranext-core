var ws = Object.defineProperty;
var cs = (e, t, n) => t in e ? ws(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pt = (e, t, n) => cs(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as o, jsxs as d, Fragment as at } from "react/jsx-runtime";
import b, { forwardRef as tn, useRef as Q, useMemo as $, useState as D, useCallback as j, useLayoutEffect as $t, createContext as xn, useContext as fr, useEffect as q, Component as ds, createElement as Br, Suspense as ps, createRef as us, Fragment as fo } from "react";
import { Command as ft } from "cmdk";
import { X as en, Search as go, Check as Ot, Clock as jr, ChevronsLeft as zr, ChevronsRight as Fr, ChevronLeft as qn, ChevronRight as Ce, ArrowLeft as ms, ArrowRight as hs, Circle as yn, ChevronDown as ue, BoldIcon as fs, ItalicIcon as gs, UnderlineIcon as bs, StrikethroughIcon as vs, Pencil as xs, Trash2 as ys, ArrowUp as bo, MoreHorizontal as vo, ChevronUp as Jn, AtSign as Ns, FilterIcon as ks, ArrowLeftIcon as _s, ChevronLeftIcon as Cs, ChevronRightIcon as Es, ArrowRightIcon as Ss, Copy as xo, Filter as Ts, User as Rs, Link as Ds, CircleHelp as Os, ChevronsUpDown as yo, Star as Ms, FunctionSquare as No, SquareSigma as ko, SquareX as Is, AlertCircle as Wn, CircleCheckIcon as As, CircleXIcon as Vs, CircleHelpIcon as Ps, ArrowUpIcon as $s, ArrowDownIcon as Ls, ArrowUpDownIcon as Bs, PanelLeft as js, PanelRight as zs, ScrollText as Fs, MenuIcon as Gs, Menu as Hs, EllipsisVertical as Xs, LoaderCircle as Ks, GripVertical as Us } from "lucide-react";
import { clsx as Ys } from "clsx";
import { extendTailwindMerge as qs } from "tailwind-merge";
import * as Ct from "@radix-ui/react-dialog";
import { includes as wn, Section as H, getChaptersForBook as Js, formatScrRef as ke, getSectionForBook as He, formatRelativeDate as Ws, formatReplacementString as le, sanitizeHtml as Zs, parseParatextHtml as Gr, hasCustomParatextTags as Qs, NumberFormat as ti, formatBytes as ei, getCurrentLocale as ni, getFormatCallerFunction as ri, deepEqual as _o, isString as Vn, compareScrRefs as Zn, scrRefToBBBCCCVVV as Pn, getLocalizeKeyForScrollGroupId as U } from "platform-bible-utils";
import { Slot as Me } from "@radix-ui/react-slot";
import { cva as Zt } from "class-variance-authority";
import * as Ee from "@radix-ui/react-popover";
import * as Co from "@radix-ui/react-label";
import * as qe from "@radix-ui/react-radio-group";
import { createEditor as Eo, $getRoot as qt, $createParagraphNode as Nn, $getSelection as Lt, HISTORY_MERGE_TAG as gr, ParagraphNode as So, TextNode as To, $isTokenOrSegmented as oi, $getCharacterOffsets as ai, $cloneWithPropertiesEphemeral as si, $findMatchingParent as ii, $isElementNode as we, CLEAR_EDITOR_COMMAND as Ro, COMMAND_PRIORITY_EDITOR as Do, $isRangeSelection as Je, shallowMergeConfig as li, defineExtension as jt, safeCast as nn, RootNode as wi, LineBreakNode as ci, TabNode as di, $isEditorState as pi, createCommand as ui, CLICK_COMMAND as mi, isDOMNode as hi, $getNodeFromDOMNode as fi, $isNodeSelection as gi, $createNodeSelection as bi, $setSelection as vi, COMMAND_PRIORITY_LOW as xi, DecoratorNode as yi, $create as Ni, $getNodeByKey as ki, INDENT_CONTENT_COMMAND as Hr, COMMAND_PRIORITY_CRITICAL as br, KEY_TAB_COMMAND as _i, $createRangeSelection as Ci, $normalizeSelection__EXPERIMENTAL as Ei, OUTDENT_CONTENT_COMMAND as Si, INSERT_TAB_COMMAND as Ti, $isBlockElementNode as hn, $isDecoratorNode as Ri, $isParagraphNode as Di, $isTextNode as fn, SELECTION_CHANGE_COMMAND as Oo, FORMAT_TEXT_COMMAND as Oi, getRegisteredNode as Mi, isHTMLElement as Ii, isDocumentFragment as Xr, isDOMDocumentNode as Ai, ArtificialNode__DO_NOT_USE as Mo, $createLineBreakNode as Io, $isRootOrShadowRoot as Vi, isBlockDomNode as Kr, isInlineDomNode as Ur, $insertNodes as Pi } from "lexical";
import * as rn from "@radix-ui/react-tooltip";
import { TooltipTrigger as $i } from "@radix-ui/react-tooltip";
import { HeadingNode as Li, QuoteNode as Bi, registerRichText as ji } from "@lexical/rich-text";
import { flushSync as zi, createPortal as Fi } from "react-dom";
import { $isTableSelection as Gi } from "@lexical/table";
import * as kn from "@radix-ui/react-toggle-group";
import * as Ao from "@radix-ui/react-toggle";
import { createHeadlessEditor as Vo } from "@lexical/headless";
import * as Po from "@radix-ui/react-separator";
import * as Ie from "@radix-ui/react-avatar";
import * as et from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Hi } from "@radix-ui/react-dropdown-menu";
import { useReactTable as $o, getFilteredRowModel as Xi, getSortedRowModel as Lo, getPaginationRowModel as Ki, getCoreRowModel as Bo, flexRender as Xe, getGroupedRowModel as Ui, getExpandedRowModel as Yi } from "@tanstack/react-table";
import * as st from "@radix-ui/react-select";
import qi from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Qn, HIDDEN_NOTE_CALLER as tr, getDefaultViewOptions as Ji, isInsertEmbedOpOfType as $n, Editorial as Wi } from "@eten-tech-foundation/platform-editor";
import * as er from "@radix-ui/react-checkbox";
import * as gt from "@radix-ui/react-tabs";
import * as nt from "@radix-ui/react-menubar";
import { useHotkeys as Zi } from "react-hotkeys-hook";
import * as rt from "@radix-ui/react-context-menu";
import { Drawer as Et } from "vaul";
import * as nr from "@radix-ui/react-progress";
import * as vr from "react-resizable-panels";
import { Toaster as Qi } from "sonner";
import { toast as Nu } from "sonner";
import * as Ge from "@radix-ui/react-slider";
import * as rr from "@radix-ui/react-switch";
const tl = qs({ prefix: "tw-" });
function h(...e) {
  return tl(Ys(e));
}
const el = "layoutDirection";
function lt() {
  const e = localStorage.getItem(el);
  return e === "rtl" ? e : "ltr";
}
const nl = Ct.Root, rl = Ct.Portal, jo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ct.Overlay,
  {
    ref: n,
    className: h(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
jo.displayName = Ct.Overlay.displayName;
const zo = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = lt();
  return /* @__PURE__ */ d(rl, { children: [
    /* @__PURE__ */ o(jo, {}),
    /* @__PURE__ */ d(
      Ct.Content,
      {
        ref: r,
        className: h(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          e
        ),
        ...n,
        dir: a,
        children: [
          t,
          /* @__PURE__ */ d(
            Ct.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ o(en, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
zo.displayName = Ct.Content.displayName;
function Fo({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: h(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        e
      ),
      ...t
    }
  );
}
Fo.displayName = "DialogHeader";
const Go = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ct.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Go.displayName = Ct.Title.displayName;
const ol = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ct.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
ol.displayName = Ct.Description.displayName;
const Qt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft,
  {
    ref: n,
    className: h(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
Qt.displayName = ft.displayName;
const Ae = b.forwardRef(({ className: e, ...t }, n) => {
  const r = lt();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ o(go, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ o(
      ft.Input,
      {
        ref: n,
        className: h(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          e
        ),
        ...t
      }
    )
  ] });
});
Ae.displayName = ft.Input.displayName;
const te = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
te.displayName = ft.List.displayName;
const on = b.forwardRef((e, t) => /* @__PURE__ */ o(ft.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
on.displayName = ft.Empty.displayName;
const Bt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft.Group,
  {
    ref: n,
    className: h(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Bt.displayName = ft.Group.displayName;
const Ho = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
Ho.displayName = ft.Separator.displayName;
const zt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft.Item,
  {
    ref: n,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
zt.displayName = ft.Item.displayName;
function Xo({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
Xo.displayName = "CommandShortcut";
var al = Object.defineProperty, sl = (e, t, n) => t in e ? al(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, G = (e, t, n) => sl(e, typeof t != "symbol" ? t + "" : t, n);
const me = [
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  // 10
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  // 20
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  // 30
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
  "MAT",
  // 40
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  // 50
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  // 60
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
  "TOB",
  "JDT",
  "ESG",
  "WIS",
  // 70
  "SIR",
  "BAR",
  "LJE",
  "S3Y",
  "SUS",
  "BEL",
  "1MA",
  "2MA",
  "3MA",
  "4MA",
  // 80
  "1ES",
  "2ES",
  "MAN",
  "PS2",
  "ODA",
  "PSS",
  "JSA",
  // actual variant text for JOS, now in LXA text
  "JDB",
  // actual variant text for JDG, now in LXA text
  "TBS",
  // actual variant text for TOB, now in LXA text
  "SST",
  // actual variant text for SUS, now in LXA text // 90
  "DNT",
  // actual variant text for DAN, now in LXA text
  "BLT",
  // actual variant text for BEL, now in LXA text
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  // 100
  "BAK",
  "OTH",
  "3ES",
  // Used previously but really should be 2ES
  "EZA",
  // Used to be called 4ES, but not actually in any known project
  "5EZ",
  // Used to be called 5ES, but not actually in any known project
  "6EZ",
  // Used to be called 6ES, but not actually in any known project
  "INT",
  "CNC",
  "GLO",
  "TDX",
  // 110
  "NDX",
  "DAG",
  "PS3",
  "2BA",
  "LBA",
  "JUB",
  "ENO",
  "1MQ",
  "2MQ",
  "3MQ",
  // 120
  "REP",
  "4BA",
  "LAO"
], xr = [
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  "BAK",
  "OTH",
  "INT",
  "CNC",
  "GLO",
  "TDX",
  "NDX"
], Ko = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther (Hebrew)",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Songs",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel (Hebrew)",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
  "Tobit",
  "Judith",
  "Esther Greek",
  "Wisdom of Solomon",
  "Sirach (Ecclesiasticus)",
  "Baruch",
  "Letter of Jeremiah",
  "Song of 3 Young Men",
  "Susanna",
  "Bel and the Dragon",
  "1 Maccabees",
  "2 Maccabees",
  "3 Maccabees",
  "4 Maccabees",
  "1 Esdras (Greek)",
  "2 Esdras (Latin)",
  "Prayer of Manasseh",
  "Psalm 151",
  "Odes",
  "Psalms of Solomon",
  // WARNING, if you change the spelling of the *obsolete* tag be sure to update
  // IsObsolete routine
  "Joshua A. *obsolete*",
  "Judges B. *obsolete*",
  "Tobit S. *obsolete*",
  "Susanna Th. *obsolete*",
  "Daniel Th. *obsolete*",
  "Bel Th. *obsolete*",
  "Extra A",
  "Extra B",
  "Extra C",
  "Extra D",
  "Extra E",
  "Extra F",
  "Extra G",
  "Front Matter",
  "Back Matter",
  "Other Matter",
  "3 Ezra *obsolete*",
  "Apocalypse of Ezra",
  "5 Ezra (Latin Prologue)",
  "6 Ezra (Latin Epilogue)",
  "Introduction",
  "Concordance ",
  "Glossary ",
  "Topical Index",
  "Names Index",
  "Daniel Greek",
  "Psalms 152-155",
  "2 Baruch (Apocalypse)",
  "Letter of Baruch",
  "Jubilees",
  "Enoch",
  "1 Meqabyan",
  "2 Meqabyan",
  "3 Meqabyan",
  "Reproof (Proverbs 25-31)",
  "4 Baruch (Rest of Baruch)",
  "Laodiceans"
], Yr = fl();
function Ve(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Yr ? Yr[e] : 0;
}
function yr(e) {
  return Ve(e) > 0;
}
function il(e) {
  const t = typeof e == "string" ? Ve(e) : e;
  return t >= 40 && t <= 66;
}
function ll(e) {
  return (typeof e == "string" ? Ve(e) : e) <= 39;
}
function Uo(e) {
  return e <= 66;
}
function wl(e) {
  const t = typeof e == "string" ? Ve(e) : e;
  return Jo(t) && !Uo(t);
}
function* cl() {
  for (let e = 1; e <= me.length; e++) yield e;
}
const dl = 1, Yo = me.length;
function pl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Nr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= me.length ? t : me[n];
}
function qo(e) {
  return e <= 0 || e > Yo ? "******" : Ko[e - 1];
}
function ul(e) {
  return qo(Ve(e));
}
function Jo(e) {
  const t = typeof e == "number" ? Nr(e) : e;
  return yr(t) && !xr.includes(t);
}
function ml(e) {
  const t = typeof e == "number" ? Nr(e) : e;
  return yr(t) && xr.includes(t);
}
function hl(e) {
  return Ko[e - 1].includes("*obsolete*");
}
function fl() {
  const e = {};
  for (let t = 0; t < me.length; t++)
    e[me[t]] = t + 1;
  return e;
}
const Y = {
  allBookIds: me,
  nonCanonicalIds: xr,
  bookIdToNumber: Ve,
  isBookIdValid: yr,
  isBookNT: il,
  isBookOT: ll,
  isBookOTNT: Uo,
  isBookDC: wl,
  allBookNumbers: cl,
  firstBook: dl,
  lastBook: Yo,
  extraBooks: pl,
  bookNumberToId: Nr,
  bookNumberToEnglishName: qo,
  bookIdToEnglishName: ul,
  isCanonical: Jo,
  isExtraMaterial: ml,
  isObsolete: hl
};
var Rt = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Rt || {});
const xt = class {
  // private versInfo: Versification;
  constructor(t) {
    if (G(this, "name"), G(this, "fullPath"), G(this, "isPresent"), G(this, "hasVerseSegments"), G(this, "isCustomized"), G(this, "baseVersification"), G(this, "scriptureBooks"), G(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Rt[t]) : (this._type = t, this.name = Rt[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
G(xt, "Original", new xt(Rt.Original)), G(xt, "Septuagint", new xt(Rt.Septuagint)), G(xt, "Vulgate", new xt(Rt.Vulgate)), G(xt, "English", new xt(Rt.English)), G(xt, "RussianProtestant", new xt(Rt.RussianProtestant)), G(xt, "RussianOrthodox", new xt(Rt.RussianOrthodox));
let ae = xt;
function qr(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Wo = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Wo || {});
const ht = class X {
  constructor(t, n, r, a) {
    if (G(this, "firstChapter"), G(this, "lastChapter"), G(this, "lastVerse"), G(this, "hasSegmentsDefined"), G(this, "text"), G(this, "BBBCCCVVVS"), G(this, "longHashCode"), G(this, "versification"), G(this, "rtlMark", "‏"), G(this, "_bookNum", 0), G(this, "_chapterNum", 0), G(this, "_verseNum", 0), G(this, "_verse"), r == null && a == null)
      if (t != null && typeof t == "string") {
        const s = t, i = n != null && n instanceof ae ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (t != null && typeof t == "number") {
        const s = n != null && n instanceof ae ? n : void 0;
        this.setEmpty(s), this._verseNum = t % X.chapterDigitShifter, this._chapterNum = Math.floor(
          t % X.bookDigitShifter / X.chapterDigitShifter
        ), this._bookNum = Math.floor(t / X.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof X) {
          const s = t;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (t == null) return;
          const s = t instanceof ae ? t : X.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(a), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = a ?? X.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(t) {
    return t.length > 0 && "0123456789".includes(t[0]) && !t.endsWith(this.verseRangeSeparator) && !t.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(t) {
    let n;
    try {
      return n = new X(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof je)
        return n = new X(), { success: !1, verseRef: n };
      throw r;
    }
  }
  /**
   * Gets the reference as a comparable integer where the book, chapter, and verse each occupy 3
   * digits.
   * @param bookNum - Book number (this is 1-based, not an index).
   * @param chapterNum - Chapter number.
   * @param verseNum - Verse number.
   * @returns The reference as a comparable integer where the book, chapter, and verse each occupy 3
   * digits.
   */
  static getBBBCCCVVV(t, n, r) {
    return t % X.bcvMaxValue * X.bookDigitShifter + (n >= 0 ? n % X.bcvMaxValue * X.chapterDigitShifter : 0) + (r >= 0 ? r % X.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: a, verse: s, versificationStr: i } = t, l = s || a.toString();
    let c;
    return i && (c = new ae(i)), n ? new X(n, r.toString(), l, c) : new X();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(t) {
    let n;
    if (!t)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let r;
    for (let a = 0; a < t.length; a++) {
      if (r = t[a], r < "0" || r > "9")
        return a === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +r - 0, n > X.bcvMaxValue)
        return n = -1, { success: !1, vNum: n };
    }
    return { success: !0, vNum: n };
  }
  /**
   * Checks to see if a VerseRef hasn't been set - all values are the default.
   */
  get isDefault() {
    return this.bookNum === 0 && this.chapterNum === 0 && this.verseNum === 0 && this.versification == null;
  }
  /**
   * Gets whether the verse contains multiple verses.
   */
  get hasMultiple() {
    return this._verse != null && (this._verse.includes(X.verseRangeSeparator) || this._verse.includes(X.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Y.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = Y.bookIdToNumber(t);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(t) {
    const n = +t;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(t) {
    const { success: n, vNum: r } = X.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = X.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > Y.lastBook)
      throw new je(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = t;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(t) {
    this.chapterNum = t;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(t) {
    this._verseNum = t;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var t;
    return (t = this.versification) == null ? void 0 : t.name;
  }
  set versificationStr(t) {
    this.versification = this.versification != null ? new ae(t) : void 0;
  }
  /**
   * Determines if the reference is valid.
   */
  get valid() {
    return this.validStatus === 0;
  }
  /**
   * Get the valid status for this reference.
   */
  get validStatus() {
    return this.validateVerse(X.verseRangeSeparators, X.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return X.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return X.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  /**
   * Gets whether the verse is defined as an excluded verse in the versification.
   * Does not handle verse ranges.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isExcluded() {
    return !1;
  }
  /**
   * Parses the reference in the specified string.
   * Optionally versification can follow reference as in GEN 3:11/4
   * Throw an exception if
   * - invalid book name
   * - chapter number is missing or not a number
   * - verse number is missing or does not start with a number
   * - versification is invalid
   * @param verseStr - string to parse e.g. 'MAT 3:11'
   */
  parse(t) {
    if (t = t.replace(this.rtlMark, ""), t.includes("/")) {
      const s = t.split("/");
      if (t = s[0], s.length > 1)
        try {
          const i = +s[1].trim();
          this.versification = new ae(Rt[i]);
        } catch {
          throw new je("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new je("Invalid reference : " + t);
    const r = n[1].split(":"), a = +r[0];
    if (r.length !== 2 || Y.bookIdToNumber(n[0]) === 0 || !Number.isInteger(a) || a < 0 || !X.isVerseParseable(r[1]))
      throw new je("Invalid reference : " + t);
    this.updateInternal(n[0], r[0], r[1]);
  }
  /**
   * Simplifies this verse ref so that it has no bridging of verses or
   * verse segments like `'1a'`.
   */
  simplify() {
    this._verse = void 0;
  }
  /**
   * Makes a clone of the reference.
   *
   * @returns The cloned VerseRef.
   */
  clone() {
    return new X(this);
  }
  toString() {
    const t = this.book;
    return t === "" ? "" : `${t} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let t = this.verse;
    (t === "" || t === this.verseNum.toString()) && (t = void 0);
    const n = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: t,
      versificationStr: this.versificationStr
    };
    return t || delete n.verse, n;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(t) {
    return t instanceof X ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
  }
  /**
   * Enumerate all individual verses contained in a VerseRef.
   * Verse ranges are indicated by "-" and consecutive verses by ","s.
   * Examples:
   * GEN 1:2 returns GEN 1:2
   * GEN 1:1a-3b,5 returns GEN 1:1a, GEN 1:2, GEN 1:3b, GEN 1:5
   * GEN 1:2a-2c returns //! ??????
   *
   * @param specifiedVersesOnly - if set to <c>true</c> return only verses that are
   * explicitly specified only, not verses within a range. Defaults to `false`.
   * @param verseRangeSeparators - Verse range separators.
   * Defaults to `VerseRef.verseRangeSeparators`.
   * @param verseSequenceSeparators - Verse sequence separators.
   * Defaults to `VerseRef.verseSequenceIndicators`.
   * @returns An array of all single verse references in this VerseRef.
   */
  allVerses(t = !1, n = X.verseRangeSeparators, r = X.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const a = [], s = qr(this._verse, r);
    for (const i of s.map((l) => qr(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (a.push(l), i.length > 1) {
        const w = this.clone();
        if (w.verse = i[1], !t)
          for (let p = c + 1; p < w.verseNum; p++) {
            const f = new X(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || a.push(f);
          }
        a.push(w);
      }
    }
    return a;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(t, n) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const a of this.allVerses(!0, t, n)) {
      const s = a.internalValid;
      if (s !== 0)
        return s;
      const i = a.BBBCCCVVV;
      if (r > i)
        return 3;
      if (r === i)
        return 4;
      r = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Y.lastBook ? 2 : (Y.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = X.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = Y.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
G(ht, "defaultVersification", ae.English), G(ht, "verseRangeSeparator", "-"), G(ht, "verseSequenceIndicator", ","), G(ht, "verseRangeSeparators", [ht.verseRangeSeparator]), G(ht, "verseSequenceIndicators", [ht.verseSequenceIndicator]), G(ht, "chapterDigitShifter", 1e3), G(ht, "bookDigitShifter", ht.chapterDigitShifter * ht.chapterDigitShifter), G(ht, "bcvMaxValue", ht.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
G(ht, "ValidStatusType", Wo);
let je = class extends Error {
};
const Zo = (e, t, n, r, a) => {
  switch (e) {
    case H.OT:
      return t ?? "Old Testament";
    case H.NT:
      return n ?? "New Testament";
    case H.DC:
      return r ?? "Deuterocanon";
    case H.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
}, gl = (e, t, n, r, a) => {
  switch (e) {
    case H.OT:
      return t ?? "OT";
    case H.NT:
      return n ?? "NT";
    case H.DC:
      return r ?? "DC";
    case H.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
};
function _e(e, t) {
  var r;
  return ((r = t == null ? void 0 : t.get(e)) == null ? void 0 : r.localizedName) ?? Y.bookIdToEnglishName(e);
}
function kr(e, t) {
  var r;
  return ((r = t == null ? void 0 : t.get(e)) == null ? void 0 : r.localizedId) ?? e.toUpperCase();
}
const Qo = Y.allBookIds.filter(
  (e) => !Y.isObsolete(Y.bookIdToNumber(e))
), ce = Object.fromEntries(
  Qo.map((e) => [e, Y.bookIdToEnglishName(e)])
);
function _r(e, t, n) {
  const r = t.trim().toLowerCase();
  if (!r) return !1;
  const a = Y.bookIdToEnglishName(e), s = n == null ? void 0 : n.get(e);
  return !!(wn(a.toLowerCase(), r) || wn(e.toLowerCase(), r) || (s ? wn(s.localizedName.toLowerCase(), r) || wn(s.localizedId.toLowerCase(), r) : !1));
}
const ta = tn(
  ({
    bookId: e,
    isSelected: t,
    onSelect: n,
    onMouseDown: r,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: c
  }, w) => {
    const p = Q(!1), f = () => {
      p.current || n == null || n(e), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, m = (k) => {
      p.current = !0, r ? r(k) : n == null || n(e);
    }, u = $(
      () => _e(e, l),
      [e, l]
    ), g = $(
      () => kr(e, l),
      [e, l]
    );
    return /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === H.OT,
            "tw-border-s-purple-200": a === H.NT,
            "tw-border-s-indigo-200": a === H.DC,
            "tw-border-s-amber-200": a === H.Extra
          }
        ),
        children: /* @__PURE__ */ d(
          zt,
          {
            ref: w,
            value: c || `${e} ${Y.bookIdToEnglishName(e)}`,
            onSelect: f,
            onMouseDown: m,
            role: "option",
            "aria-selected": t,
            "aria-label": `${Y.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ o(
                Ot,
                {
                  className: h(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    t ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ o("span", { className: "tw-min-w-0 tw-flex-1", children: u }),
              /* @__PURE__ */ o("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), bl = Zt(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",
  {
    variants: {
      variant: {
        default: "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",
        destructive: "tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",
        outline: "tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",
        secondary: "tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
        link: "tw-text-primary tw-underline-offset-4 hover:tw-underline"
      },
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-9 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), L = b.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...a }, s) => /* @__PURE__ */ o(r ? Me : "button", { className: h(bl({ variant: t, size: n, className: e })), ref: s, ...a })
);
L.displayName = "Button";
const ge = Ee.Root, be = Ee.Trigger, up = Ee.Anchor, ee = b.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, a) => {
  const s = lt();
  return /* @__PURE__ */ o(Ee.Portal, { children: /* @__PURE__ */ o(
    Ee.Content,
    {
      ref: a,
      align: t,
      sideOffset: n,
      className: h(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...r,
      dir: s
    }
  ) });
});
ee.displayName = Ee.Content.displayName;
function or(e, t, n) {
  return `${e} ${ce[e]}${t ? ` ${kr(e, t)} ${_e(e, t)}` : ""}${n ? ` ${n}` : ""}`;
}
function vl({
  recentSearches: e,
  onSearchItemSelect: t,
  renderItem: n = (l) => String(l),
  getItemKey: r = (l) => String(l),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i
}) {
  const [l, c] = D(!1);
  if (e.length === 0)
    return;
  const w = (p) => {
    t(p), c(!1);
  };
  return /* @__PURE__ */ d(ge, { open: l, onOpenChange: c, children: [
    /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ o(
      L,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ o(jr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ o(ee, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ o(Qt, { children: /* @__PURE__ */ o(te, { children: /* @__PURE__ */ o(Bt, { heading: s, children: e.map((p) => /* @__PURE__ */ d(
      zt,
      {
        onSelect: () => w(p),
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ o(jr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ o("span", { children: n(p) })
        ]
      },
      r(p)
    )) }) }) }) })
  ] });
}
function mp(e, t, n = (a, s) => a === s, r = 15) {
  return (a) => {
    const s = e.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, r - 1)];
    t(i);
  };
}
const Ln = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, xl = [
  Ln.BOOK_ONLY,
  Ln.BOOK_CHAPTER,
  Ln.BOOK_CHAPTER_VERSE
];
function Jr(e) {
  const t = /^[a-zA-Z]$/.test(e), n = /^[0-9]$/.test(e);
  return { isLetter: t, isDigit: n };
}
function Dt(e) {
  return Js(Y.bookIdToNumber(e));
}
function yl(e, t, n) {
  if (!e.trim() || t.length === 0) return;
  const r = xl.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(e.trim());
      if (i) {
        const [l, c = void 0, w = void 0] = i.slice(1);
        let p;
        const f = t.filter((m) => _r(m, l, n));
        if (f.length === 1 && ([p] = f), !p && c) {
          if (Y.isBookIdValid(l)) {
            const m = l.toUpperCase();
            t.includes(m) && (p = m);
          }
          if (!p && n) {
            const m = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            m && t.includes(m[0]) && ([p] = m);
          }
        }
        if (!p && c) {
          const u = ((g) => Object.keys(ce).find(
            (k) => ce[k].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && t.includes(u) && (p = u), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, k]) => k.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && t.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let m = c ? parseInt(c, 10) : void 0;
          m && m > Dt(p) && (m = Math.max(Dt(p), 1));
          const u = w ? parseInt(w, 10) : void 0;
          return {
            book: p,
            chapterNum: m,
            verseNum: u
          };
        }
      }
    },
    void 0
  );
  if (r) return r;
}
function Nl(e, t, n, r) {
  const a = j(() => {
    if (e.chapterNum > 1)
      r({
        book: e.book,
        chapterNum: e.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = t.indexOf(e.book);
      if (c > 0) {
        const w = t[c - 1], p = Math.max(Dt(w), 1);
        r({
          book: w,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [e, t, r]), s = j(() => {
    const c = Dt(e.book);
    if (e.chapterNum < c)
      r({
        book: e.book,
        chapterNum: e.chapterNum + 1,
        verseNum: 1
      });
    else {
      const w = t.indexOf(e.book);
      if (w < t.length - 1) {
        const p = t[w + 1];
        r({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [e, t, r]), i = j(() => {
    r({
      book: e.book,
      chapterNum: e.chapterNum,
      verseNum: e.verseNum > 1 ? e.verseNum - 1 : 0
    });
  }, [e, r]), l = j(() => {
    r({
      book: e.book,
      chapterNum: e.chapterNum,
      verseNum: e.verseNum + 1
    });
  }, [e, r]);
  return $(() => [
    {
      onClick: a,
      disabled: t.length === 0 || e.chapterNum === 1 && t.indexOf(e.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? zr : Fr
    },
    {
      onClick: i,
      disabled: t.length === 0 || e.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? qn : Ce
    },
    {
      onClick: l,
      disabled: t.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Ce : qn
    },
    {
      onClick: s,
      disabled: t.length === 0 || (e.chapterNum === Dt(e.book) || Dt(e.book) === -1) && t.indexOf(e.book) === t.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Fr : zr
    }
  ], [
    e,
    t,
    n,
    a,
    i,
    l,
    s
  ]);
}
function Wr({
  bookId: e,
  scrRef: t,
  onChapterSelect: n,
  setChapterRef: r,
  isChapterDimmed: a,
  className: s
}) {
  if (e)
    return /* @__PURE__ */ o(Bt, { children: /* @__PURE__ */ o("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: Dt(e) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ o(
      zt,
      {
        value: `${e} ${ce[e] || ""} ${i}`,
        onSelect: () => n(i),
        ref: r(i),
        className: h(
          "tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",
          {
            "tw-bg-primary tw-text-primary-foreground": e === t.book && i === t.chapterNum
          },
          {
            "tw-bg-muted/50 tw-text-muted-foreground/50": (a == null ? void 0 : a(i)) ?? !1
          }
        ),
        children: i
      },
      i
    )) }) });
}
function hp({
  scrRef: e,
  handleSubmit: t,
  className: n,
  getActiveBookIds: r,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: c
}) {
  const w = lt(), [p, f] = D(!1), [m, u] = D(""), [g, k] = D(""), [x, _] = D("books"), [C, y] = D(void 0), [E, I] = D(!1), R = Q(void 0), S = Q(void 0), O = Q(void 0), N = Q(void 0), T = Q({}), V = j(
    (v) => {
      t(v), l && l(v);
    },
    [t, l]
  ), B = $(() => r ? r() : Qo, [r]), F = $(() => ({
    [H.OT]: B.filter((z) => Y.isBookOT(z)),
    [H.NT]: B.filter((z) => Y.isBookNT(z)),
    [H.DC]: B.filter((z) => Y.isBookDC(z)),
    [H.Extra]: B.filter((z) => Y.extraBooks().includes(z))
  }), [B]), A = $(() => Object.values(F).flat(), [F]), W = $(() => {
    if (!g.trim()) return F;
    const v = {
      [H.OT]: [],
      [H.NT]: [],
      [H.DC]: [],
      [H.Extra]: []
    };
    return [H.OT, H.NT, H.DC, H.Extra].forEach((Z) => {
      v[Z] = F[Z].filter((ct) => _r(ct, g, a));
    }), v;
  }, [F, g, a]), M = $(
    () => yl(g, A, a),
    [g, A, a]
  ), ot = j(() => {
    M && (V({
      book: M.book,
      chapterNum: M.chapterNum ?? 1,
      verseNum: M.verseNum ?? 1
    }), f(!1), k(""), u(""));
  }, [V, M]), yt = j(
    (v) => {
      if (Dt(v) <= 1) {
        V({
          book: v,
          chapterNum: 1,
          verseNum: 1
        }), f(!1), k("");
        return;
      }
      y(v), _("chapters");
    },
    [V]
  ), _t = j(
    (v) => {
      const z = x === "chapters" ? C : M == null ? void 0 : M.book;
      z && (V({
        book: z,
        chapterNum: v,
        verseNum: 1
      }), f(!1), _("books"), y(void 0), k(""));
    },
    [V, x, C, M]
  ), bt = j(
    (v) => {
      V(v), f(!1), k("");
    },
    [V]
  ), P = Nl(e, A, w, t), tt = j(() => {
    _("books"), y(void 0), setTimeout(() => {
      S.current && S.current.focus();
    }, 0);
  }, []), dt = j(
    (v) => {
      if (!v && x === "chapters") {
        tt();
        return;
      }
      f(v), v && (_("books"), y(void 0), k(""));
    },
    [x, tt]
  ), { otLong: wt, ntLong: Nt, dcLong: Gt, extraLong: vt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, On = j(
    (v) => Zo(v, wt, Nt, Gt, vt),
    [wt, Nt, Gt, vt]
  ), Mn = j(
    (v) => M ? !!M.chapterNum && !v.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), xe = $(
    () => ke(
      e,
      a ? _e(e.book, a) : "English"
    ),
    [e, a]
  ), sn = j((v) => (z) => {
    T.current[v] = z;
  }, []), In = j((v) => {
    (v.key === "Home" || v.key === "End") && v.stopPropagation();
  }, []), ln = j(
    (v) => {
      if (v.ctrlKey) return;
      const { isLetter: z, isDigit: Z } = Jr(v.key);
      if (x === "chapters") {
        if (v.key === "Backspace") {
          v.preventDefault(), v.stopPropagation(), tt();
          return;
        }
        if (z || Z) {
          if (v.preventDefault(), v.stopPropagation(), _("books"), y(void 0), Z && C) {
            const ct = ce[C];
            k(`${ct} ${v.key}`);
          } else
            k(v.key);
          setTimeout(() => {
            S.current && S.current.focus();
          }, 0);
          return;
        }
      }
      if ((x === "chapters" || x === "books" && M) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(v.key)) {
        const ct = x === "chapters" ? C : M == null ? void 0 : M.book;
        if (!ct) return;
        const mt = (() => {
          if (!m) return 1;
          const Be = m.match(/(\d+)$/);
          return Be ? parseInt(Be[1], 10) : 0;
        })(), re = Dt(ct);
        if (!re) return;
        let It = mt;
        const Lr = 6;
        switch (v.key) {
          case "ArrowLeft":
            mt !== 0 && (It = mt > 1 ? mt - 1 : re);
            break;
          case "ArrowRight":
            mt !== 0 && (It = mt < re ? mt + 1 : 1);
            break;
          case "ArrowUp":
            It = mt === 0 ? re : Math.max(1, mt - Lr);
            break;
          case "ArrowDown":
            It = mt === 0 ? 1 : Math.min(re, mt + Lr);
            break;
          default:
            return;
        }
        It !== mt && (v.preventDefault(), v.stopPropagation(), u(or(ct, a, It)), setTimeout(() => {
          const Be = T.current[It];
          Be && Be.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      x,
      M,
      tt,
      C,
      m,
      a
    ]
  ), An = j((v) => {
    if (v.shiftKey || v.key === "Tab" || v.key === " ") return;
    const { isLetter: z, isDigit: Z } = Jr(v.key);
    (z || Z) && (v.preventDefault(), k((ct) => ct + v.key), S.current.focus(), I(!1));
  }, []);
  return $t(() => {
    const v = setTimeout(() => {
      if (p && x === "books" && O.current && N.current) {
        const z = O.current, Z = N.current, ct = Z.offsetTop, mt = z.clientHeight, re = Z.clientHeight, It = ct - mt / 2 + re / 2;
        z.scrollTo({
          top: Math.max(0, It),
          behavior: "smooth"
        }), u(or(e.book));
      }
    }, 0);
    return () => {
      clearTimeout(v);
    };
  }, [p, x, g, M, e.book]), $t(() => {
    if (x === "chapters" && C) {
      const v = C === e.book;
      setTimeout(() => {
        if (O.current)
          if (v) {
            const z = T.current[e.chapterNum];
            z && z.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            O.current.scrollTo({ top: 0 });
        R.current && R.current.focus();
      }, 0);
    }
  }, [x, C, M, e.book, e.chapterNum]), /* @__PURE__ */ d(ge, { open: p, onOpenChange: dt, children: [
    /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ o(
      L,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: h(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ o("span", { className: "tw-truncate", children: xe })
      }
    ) }),
    /* @__PURE__ */ o(ee, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ d(
      Qt,
      {
        ref: R,
        onKeyDown: ln,
        loop: !0,
        value: m,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          x === "books" ? /* @__PURE__ */ d("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ d("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ o(
                Ae,
                {
                  ref: S,
                  value: g,
                  onValueChange: k,
                  onKeyDown: In,
                  onFocus: () => I(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ o(
                vl,
                {
                  recentSearches: i,
                  onSearchItemSelect: bt,
                  renderItem: (v) => ke(v, "English"),
                  getItemKey: (v) => `${v.book}-${v.chapterNum}-${v.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: P.map(({ onClick: v, disabled: z, title: Z, icon: ct }) => /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  I(!0), v();
                },
                disabled: z,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: Z,
                onKeyDown: An,
                children: /* @__PURE__ */ o(ct, {})
              },
              Z
            )) })
          ] }) : /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "sm",
                onClick: tt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ o(ms, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ o(hs, { className: "tw-h-4 tw-w-4" })
              }
            ),
            C && /* @__PURE__ */ o("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: _e(C, a) })
          ] }),
          !E && /* @__PURE__ */ d(te, { ref: O, children: [
            x === "books" && /* @__PURE__ */ d(at, { children: [
              !M && Object.entries(W).map(([v, z]) => {
                if (z.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ o(Bt, { heading: On(v), children: z.map((Z) => /* @__PURE__ */ o(
                      ta,
                      {
                        bookId: Z,
                        onSelect: (ct) => yt(ct),
                        section: He(Z),
                        commandValue: `${Z} ${ce[Z]}`,
                        ref: Z === e.book ? N : void 0,
                        localizedBookNames: a
                      },
                      Z
                    )) }, v)
                  );
              }),
              M && /* @__PURE__ */ o(Bt, { children: /* @__PURE__ */ o(
                zt,
                {
                  value: `${M.book} ${ce[M.book]} ${M.chapterNum || ""}:${M.verseNum || ""})}`,
                  onSelect: ot,
                  className: "tw-font-semibold tw-text-primary",
                  children: ke(
                    {
                      book: M.book,
                      chapterNum: M.chapterNum ?? 1,
                      verseNum: M.verseNum ?? 1
                    },
                    a ? kr(M.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              M && Dt(M.book) > 1 && /* @__PURE__ */ d(at, { children: [
                /* @__PURE__ */ o("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: _e(M.book, a) }),
                /* @__PURE__ */ o(
                  Wr,
                  {
                    bookId: M.book,
                    scrRef: e,
                    onChapterSelect: _t,
                    setChapterRef: sn,
                    isChapterDimmed: Mn,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            x === "chapters" && C && /* @__PURE__ */ o(
              Wr,
              {
                bookId: C,
                scrRef: e,
                onChapterSelect: _t,
                setChapterRef: sn,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const fp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), kl = Zt(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), it = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(Co.Root, { ref: n, className: h("pr-twp", kl(), e), ...t }));
it.displayName = Co.Root.displayName;
const Cr = b.forwardRef(({ className: e, ...t }, n) => {
  const r = lt();
  return /* @__PURE__ */ o(
    qe.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", e),
      ...t,
      ref: n,
      dir: r
    }
  );
});
Cr.displayName = qe.Root.displayName;
const gn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  qe.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ o(qe.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ o(yn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
gn.displayName = qe.Item.displayName;
function _l(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function ar({
  id: e,
  options: t = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = _l,
  getButtonLabel: c,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: f = "",
  commandEmptyMessage: m = "No option found",
  buttonVariant: u = "outline",
  alignDropDown: g = "start",
  isDisabled: k = !1,
  ariaLabel: x,
  ..._
}) {
  const [C, y] = D(!1), E = c ?? l, I = (S) => S.length > 0 && typeof S[0] == "object" && "options" in S[0], R = (S, O) => {
    const N = l(S), T = typeof S == "object" && "secondaryLabel" in S ? S.secondaryLabel : void 0, V = `${O ?? ""}${N}${T ?? ""}`;
    return /* @__PURE__ */ d(
      zt,
      {
        value: N,
        onSelect: () => {
          i(S), y(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ o(
            Ot,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || l(s) !== N
              })
            }
          ),
          /* @__PURE__ */ d("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            N,
            T && /* @__PURE__ */ d("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              T
            ] })
          ] })
        ]
      },
      V
    );
  };
  return /* @__PURE__ */ d(ge, { open: C, onOpenChange: y, ..._, children: [
    /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ d(
      L,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": C,
        "aria-label": x,
        id: e,
        className: h(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: k,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            w && /* @__PURE__ */ o("div", { className: "tw-shrink-0 tw-pe-2", children: w }),
            /* @__PURE__ */ o(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? E(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ o(ue, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(
      ee,
      {
        align: g,
        className: h("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ d(Qt, { children: [
          /* @__PURE__ */ o(Ae, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ o(on, { children: m }),
          /* @__PURE__ */ o(te, { children: I(t) ? t.map((S) => /* @__PURE__ */ o(Bt, { heading: S.groupHeading, children: S.options.map((O) => R(O, S.groupHeading)) }, S.groupHeading)) : t.map((S) => R(S)) })
        ] })
      }
    )
  ] });
}
function Cl({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = $(
    () => Array.from({ length: s }, (w, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ d(at, { children: [
    /* @__PURE__ */ o(it, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ o(
      ar,
      {
        isDisabled: a,
        onChange: (w) => {
          n(w), w > t && r(w);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (w) => w.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ o(it, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ o(
      ar,
      {
        isDisabled: a,
        onChange: (w) => {
          r(w), w < e && n(w);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (w) => w.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var El = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(El || {});
const gp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Bn = (e, t) => e[t] ?? t;
function bp({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: w
}) {
  const p = Bn(w, "%webView_bookSelector_currentBook%"), f = Bn(w, "%webView_bookSelector_choose%"), m = Bn(w, "%webView_bookSelector_chooseBooks%"), [u, g] = D(
    "current book"
    /* CURRENT_BOOK */
  ), k = (x) => {
    g(x), e(x);
  };
  return /* @__PURE__ */ o(
    Cr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (x) => k(x),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(gn, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ o(it, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ o(it, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ o(
            Cl,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(gn, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ o(it, { className: "tw-ms-1", children: m })
          ] }),
          /* @__PURE__ */ o(it, { className: "tw-flex tw-items-center", children: r.map((x) => Y.bookIdToEnglishName(x)).join(", ") }),
          /* @__PURE__ */ o(
            L,
            {
              disabled: u === "current book",
              onClick: () => n(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
const vp = [
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
  "%no_comments%"
], Sl = ["input", "select", "textarea", "button"], Tl = ["button", "textbox"], Rl = ({
  options: e,
  onFocusChange: t,
  onOptionSelect: n,
  onCharacterPress: r
}) => {
  const a = Q(null), [s, i] = D(void 0), [l, c] = D(void 0), w = j(
    (u) => {
      i(u);
      const g = e.find((x) => x.id === u);
      g && (t == null || t(g));
      const k = document.getElementById(u);
      k && (k.scrollIntoView({ block: "center" }), k.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [t, e]
  ), p = j(
    (u) => {
      const g = e.find((k) => k.id === u);
      g && (c((k) => k === u ? void 0 : u), n == null || n(g));
    },
    [n, e]
  ), f = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || Sl.includes(g)) return !0;
    const k = u.getAttribute("role");
    if (k && Tl.includes(k)) return !0;
    const x = u.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, m = j(
    (u) => {
      var S;
      const g = u.target, k = (O) => O ? document.getElementById(O) : void 0, x = k(l), _ = k(s);
      if (!!(x && g && x.contains(g) && g !== x) && f(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const O = e.find((N) => N.id === l);
            O && w(O.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!x) return;
          const O = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (O.length === 0) return;
          const N = O.findIndex((V) => V === g);
          if (N === -1) return;
          let T;
          u.key === "ArrowDown" ? T = Math.min(N + 1, O.length - 1) : T = Math.max(N - 1, 0), T !== N && (u.preventDefault(), u.stopPropagation(), (S = O[T]) == null || S.focus());
          return;
        }
        return;
      }
      const E = e.findIndex((O) => O.id === s);
      let I = E;
      switch (u.key) {
        case "ArrowDown":
          I = Math.min(E + 1, e.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          I = Math.max(E - 1, 0), u.preventDefault();
          break;
        case "Home":
          I = 0, u.preventDefault();
          break;
        case "End":
          I = e.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const O = _;
          if (O) {
            const N = O.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = O.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), V = N ?? T;
            if (V) {
              u.preventDefault(), V.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (f(g) || (r == null || r(u.key), u.preventDefault()));
          return;
      }
      const R = e[I];
      R && w(R.id);
    },
    [e, w, s, l, p, r]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: m,
    /** Focus an option by its ID */
    focusOption: w
  };
}, ea = xn(null);
function Dl(e, t) {
  return { getTheme: function() {
    return t ?? null;
  } };
}
function Mt() {
  const e = fr(ea);
  return e == null && function(t, ...n) {
    const r = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", t);
    for (const s of n) a.append("v", s);
    throw r.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), e;
}
const na = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ol = na ? $t : q, cn = { tag: gr };
function Ml({ initialConfig: e, children: t }) {
  const n = $(() => {
    const { theme: r, namespace: a, nodes: s, onError: i, editorState: l, html: c } = e, w = Dl(null, r), p = Eo({ editable: e.editable, html: c, namespace: a, nodes: s, onError: (f) => i(f, p), theme: r });
    return function(f, m) {
      if (m !== null) {
        if (m === void 0) f.update(() => {
          const u = qt();
          if (u.isEmpty()) {
            const g = Nn();
            u.append(g);
            const k = na ? document.activeElement : null;
            (Lt() !== null || k !== null && k === f.getRootElement()) && g.select();
          }
        }, cn);
        else if (m !== null) switch (typeof m) {
          case "string": {
            const u = f.parseEditorState(m);
            f.setEditorState(u, cn);
            break;
          }
          case "object":
            f.setEditorState(m, cn);
            break;
          case "function":
            f.update(() => {
              qt().isEmpty() && m(f);
            }, cn);
        }
      }
    }(p, l), [p, w];
  }, []);
  return Ol(() => {
    const r = e.editable, [a] = n;
    a.setEditable(r === void 0 || r);
  }, []), o(ea.Provider, { value: n, children: t });
}
const Il = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : q;
function Al({ ignoreHistoryMergeTagChange: e = !0, ignoreSelectionChange: t = !1, onChange: n }) {
  const [r] = Mt();
  return Il(() => {
    if (n) return r.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: c }) => {
      t && s.size === 0 && i.size === 0 || e && c.has(gr) || l.isEmpty() || n(a, r, c);
    });
  }, [r, e, t, n]), null;
}
const Er = {
  ltr: "tw-text-left",
  rtl: "tw-text-right",
  heading: {
    h1: "tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",
    h2: "tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",
    h3: "tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",
    h4: "tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",
    h5: "tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",
    h6: "tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"
  },
  paragraph: "tw-outline-none",
  quote: "tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",
  link: "tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",
  list: {
    checklist: "tw-relative",
    listitem: "tw-mx-8",
    listitemChecked: 'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',
    listitemUnchecked: 'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',
    nested: {
      listitem: "tw-list-none before:tw-hidden after:tw-hidden"
    },
    ol: "tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",
    olDepth: [
      "tw-list-outside !tw-list-decimal",
      "tw-list-outside !tw-list-[upper-roman]",
      "tw-list-outside !tw-list-[lower-roman]",
      "tw-list-outside !tw-list-[upper-alpha]",
      "tw-list-outside !tw-list-[lower-alpha]"
    ],
    ul: "tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",
    ulDepth: [
      "tw-list-outside !tw-list-disc",
      "tw-list-outside !tw-list-disc",
      "tw-list-outside !tw-list-disc",
      "tw-list-outside !tw-list-disc",
      "tw-list-outside !tw-list-disc"
    ]
  },
  hashtag: "tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",
  text: {
    bold: "tw-font-bold",
    code: "tw-bg-gray-100 tw-p-1 tw-rounded-md",
    italic: "tw-italic",
    strikethrough: "tw-line-through",
    subscript: "tw-sub",
    superscript: "tw-sup",
    underline: "tw-underline",
    underlineStrikethrough: "tw-underline tw-line-through"
  },
  image: "tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",
  inlineImage: "tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",
  keyword: "tw-text-purple-900 tw-font-bold",
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
  characterLimit: "!tw-bg-destructive/50",
  table: "EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",
  tableCell: "EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",
  tableCellActionButton: "EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",
  tableCellActionButtonContainer: "EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",
  tableCellEditing: "EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",
  tableCellHeader: "EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",
  tableCellPrimarySelected: "EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",
  tableCellResizer: "EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",
  tableCellSelected: "EditorTheme__tableCellSelected tw-bg-muted",
  tableCellSortedIndicator: "EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",
  tableResizeRuler: "EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",
  tableRowStriping: "EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",
  tableSelected: "EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",
  tableSelection: "EditorTheme__tableSelection tw-bg-transparent",
  layoutItem: "tw-border tw-border-dashed tw-px-4 tw-py-2",
  layoutContainer: "tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",
  autocomplete: "tw-text-muted-foreground",
  blockCursor: "",
  embedBlock: {
    base: "tw-user-select-none",
    focus: "tw-ring-2 tw-ring-primary tw-ring-offset-2"
  },
  hr: 'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',
  indent: "[--lexical-indent-base-value:40px]",
  mark: "",
  markOverlap: ""
}, Vt = rn.Provider, Kt = rn.Root, de = rn.Trigger, Pt = b.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ o(
  rn.Content,
  {
    ref: r,
    sideOffset: t,
    className: h(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
Pt.displayName = rn.Content.displayName;
const Sr = [
  Li,
  So,
  To,
  Bi
], Vl = xn(null), jn = {
  didCatch: !1,
  error: null
};
class Pl extends ds {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = jn;
  }
  static getDerivedStateFromError(t) {
    return {
      didCatch: !0,
      error: t
    };
  }
  resetErrorBoundary() {
    const {
      error: t
    } = this.state;
    if (t !== null) {
      for (var n, r, a = arguments.length, s = new Array(a), i = 0; i < a; i++)
        s[i] = arguments[i];
      (n = (r = this.props).onReset) === null || n === void 0 || n.call(r, {
        args: s,
        reason: "imperative-api"
      }), this.setState(jn);
    }
  }
  componentDidCatch(t, n) {
    var r, a;
    (r = (a = this.props).onError) === null || r === void 0 || r.call(a, t, n);
  }
  componentDidUpdate(t, n) {
    const {
      didCatch: r
    } = this.state, {
      resetKeys: a
    } = this.props;
    if (r && n.error !== null && $l(t.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState(jn);
    }
  }
  render() {
    const {
      children: t,
      fallbackRender: n,
      FallbackComponent: r,
      fallback: a
    } = this.props, {
      didCatch: s,
      error: i
    } = this.state;
    let l = t;
    if (s) {
      const c = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(c);
      else if (r)
        l = Br(r, c);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Br(Vl.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function $l() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, r) => !Object.is(n, t[r]));
}
function Ll({ children: e, onError: t }) {
  return o(Pl, { fallback: o("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: t, children: e });
}
const Bl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : q;
function jl(e) {
  return { initialValueFn: () => e.isEditable(), subscribe: (t) => e.registerEditableListener(t) };
}
function zl() {
  return function(e) {
    const [t] = Mt(), n = $(() => e(t), [t, e]), [r, a] = D(() => n.initialValueFn()), s = Q(r);
    return Bl(() => {
      const { initialValueFn: i, subscribe: l } = n, c = i();
      return s.current !== c && (s.current = c, a(c)), l((w) => {
        s.current = w, a(w);
      });
    }, [n, e]), r;
  }(jl);
}
function Fl(e, t, n = "self") {
  const r = e.getStartEndPoints();
  if (t.isSelected(e) && !oi(t) && r !== null) {
    const [a, s] = r, i = e.isBackward(), l = a.getNode(), c = s.getNode(), w = t.is(l), p = t.is(c);
    if (w || p) {
      const [f, m] = ai(e), u = l.is(c), g = t.is(i ? c : l), k = t.is(i ? l : c);
      let x, _ = 0;
      u ? (_ = f > m ? m : f, x = f > m ? f : m) : g ? (_ = i ? m : f, x = void 0) : k && (_ = 0, x = i ? f : m);
      const C = t.__text.slice(_, x);
      C !== t.__text && (n === "clone" && (t = si(t)), t.__text = C);
    }
  }
  return t;
}
function Gl(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ra = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Hl = ra && "documentMode" in document ? document.documentMode : null;
!(!ra || !("InputEvent" in window) || Hl) && "getTargetRanges" in new window.InputEvent("input");
function oa(...e) {
  const t = [];
  for (const n of e) if (n && typeof n == "string") for (const [r] of n.matchAll(/\S+/g)) t.push(r);
  return t;
}
function Jt(...e) {
  return () => {
    for (let t = e.length - 1; t >= 0; t--) e[t]();
    e.length = 0;
  };
}
function aa(e, ...t) {
  const n = oa(...t);
  n.length > 0 && e.classList.add(...n);
}
function Xl(e, ...t) {
  const n = oa(...t);
  n.length > 0 && e.classList.remove(...n);
}
function Zr(e) {
  const t = ii(e, (n) => we(n) && !n.isInline());
  return we(t) || Gl(4, e.__key), t;
}
function Kl(e, t) {
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const a = t(e[r]);
    a !== null && n.push(a);
  }
  return n;
}
const Ul = Symbol.for("preact-signals");
function _n() {
  if (Ut > 1) return void Ut--;
  let e, t = !1;
  for (; Ke !== void 0; ) {
    let n = Ke;
    for (Ke = void 0, sr++; n !== void 0; ) {
      const r = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && sa(n)) try {
        n.c();
      } catch (a) {
        t || (e = a, t = !0);
      }
      n = r;
    }
  }
  if (sr = 0, Ut--, t) throw e;
}
function Yl(e) {
  if (Ut > 0) return e();
  Ut++;
  try {
    return e();
  } finally {
    _n();
  }
}
let K, Ke;
function Qr(e) {
  const t = K;
  K = void 0;
  try {
    return e();
  } finally {
    K = t;
  }
}
let Ut = 0, sr = 0, un = 0;
function to(e) {
  if (K === void 0) return;
  let t = e.n;
  return t === void 0 || t.t !== K ? (t = { i: 0, S: e, p: K.s, n: void 0, t: K, e: void 0, x: void 0, r: t }, K.s !== void 0 && (K.s.n = t), K.s = t, e.n = t, 32 & K.f && e.S(t), t) : t.i === -1 ? (t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = K.s, t.n = void 0, K.s.n = t, K.s = t), t) : void 0;
}
function ut(e, t) {
  this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function We(e, t) {
  return new ut(e, t);
}
function sa(e) {
  for (let t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function eo(e) {
  for (let t = e.s; t !== void 0; t = t.n) {
    const n = t.S.n;
    if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
      e.s = t;
      break;
    }
  }
}
function ia(e) {
  let t, n = e.s;
  for (; n !== void 0; ) {
    const r = n.p;
    n.i === -1 ? (n.S.U(n), r !== void 0 && (r.n = n.n), n.n !== void 0 && (n.n.p = r)) : t = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = r;
  }
  e.s = t;
}
function se(e, t) {
  ut.call(this, void 0), this.x = e, this.s = void 0, this.g = un - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function ql(e, t) {
  return new se(e, t);
}
function la(e) {
  const t = e.u;
  if (e.u = void 0, typeof t == "function") {
    Ut++;
    const n = K;
    K = void 0;
    try {
      t();
    } catch (r) {
      throw e.f &= -2, e.f |= 8, Tr(e), r;
    } finally {
      K = n, _n();
    }
  }
}
function Tr(e) {
  for (let t = e.s; t !== void 0; t = t.n) t.S.U(t);
  e.x = void 0, e.s = void 0, la(e);
}
function Jl(e) {
  if (K !== this) throw new Error("Out-of-order effect");
  ia(this), K = e, this.f &= -2, 8 & this.f && Tr(this), _n();
}
function Ne(e, t) {
  this.x = e, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = t == null ? void 0 : t.name;
}
function Wt(e, t) {
  const n = new Ne(e, t);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const r = n.d.bind(n);
  return r[Symbol.dispose] = r, r;
}
function Cn(e, t = {}) {
  const n = {};
  for (const r in e) {
    const a = t[r], s = We(a === void 0 ? e[r] : a);
    n[r] = s;
  }
  return n;
}
ut.prototype.brand = Ul, ut.prototype.h = function() {
  return !0;
}, ut.prototype.S = function(e) {
  const t = this.t;
  t !== e && e.e === void 0 && (e.x = t, this.t = e, t !== void 0 ? t.e = e : Qr(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, ut.prototype.U = function(e) {
  if (this.t !== void 0) {
    const t = e.e, n = e.x;
    t !== void 0 && (t.x = n, e.e = void 0), n !== void 0 && (n.e = t, e.x = void 0), e === this.t && (this.t = n, n === void 0 && Qr(() => {
      var r;
      (r = this.Z) == null || r.call(this);
    }));
  }
}, ut.prototype.subscribe = function(e) {
  return Wt(() => {
    const t = this.value, n = K;
    K = void 0;
    try {
      e(t);
    } finally {
      K = n;
    }
  }, { name: "sub" });
}, ut.prototype.valueOf = function() {
  return this.value;
}, ut.prototype.toString = function() {
  return this.value + "";
}, ut.prototype.toJSON = function() {
  return this.value;
}, ut.prototype.peek = function() {
  const e = K;
  K = void 0;
  try {
    return this.value;
  } finally {
    K = e;
  }
}, Object.defineProperty(ut.prototype, "value", { get() {
  const e = to(this);
  return e !== void 0 && (e.i = this.i), this.v;
}, set(e) {
  if (e !== this.v) {
    if (sr > 100) throw new Error("Cycle detected");
    this.v = e, this.i++, un++, Ut++;
    try {
      for (let t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      _n();
    }
  }
} }), se.prototype = new ut(), se.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === un)) return !0;
  if (this.g = un, this.f |= 1, this.i > 0 && !sa(this)) return this.f &= -2, !0;
  const e = K;
  try {
    eo(this), K = this;
    const t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return K = e, ia(this), this.f &= -2, !0;
}, se.prototype.S = function(e) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  ut.prototype.S.call(this, e);
}, se.prototype.U = function(e) {
  if (this.t !== void 0 && (ut.prototype.U.call(this, e), this.t === void 0)) {
    this.f &= -33;
    for (let t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
}, se.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let e = this.t; e !== void 0; e = e.x) e.t.N();
  }
}, Object.defineProperty(se.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const e = to(this);
  if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ne.prototype.c = function() {
  const e = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    e();
  }
}, Ne.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, la(this), eo(this), Ut++;
  const e = K;
  return K = this, Jl.bind(this, e);
}, Ne.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Ke, Ke = this);
}, Ne.prototype.d = function() {
  this.f |= 8, 1 & this.f || Tr(this);
}, Ne.prototype.dispose = function() {
  this.d();
};
jt({ build: (e, t, n) => Cn(t), config: nn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(e, t, n) {
  const r = n.getOutput();
  return Wt(() => r.disabled.value ? void 0 : e.registerRootListener((a) => {
    e.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: r.defaultSelection.peek() });
  }));
} });
function wa() {
  const e = qt(), t = Lt(), n = Nn();
  e.clear(), e.append(n), t !== null && n.select(), Je(t) && (t.format = 0);
}
function ca(e, t = wa) {
  return e.registerCommand(Ro, (n) => (e.update(t), !0), Do);
}
jt({ build: (e, t, n) => Cn(t), config: nn({ $onClear: wa }), name: "@lexical/extension/ClearEditor", register(e, t, n) {
  const { $onClear: r } = n.getOutput();
  return Wt(() => ca(e, r.value));
} });
function Wl(e) {
  return (typeof e.nodes == "function" ? e.nodes() : e.nodes) || [];
}
function da(e, t) {
  let n;
  return We(e(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = e(), n = t(this);
  } });
}
const ir = jt({ build: (e) => da(() => e.getEditorState(), (t) => e.registerUpdateListener((n) => {
  t.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function J(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function pa(e, t) {
  if (e && t && !Array.isArray(t) && typeof e == "object" && typeof t == "object") {
    const n = e, r = t;
    for (const a in r) n[a] = pa(n[a], r[a]);
    return e;
  }
  return t;
}
const Rr = 0, lr = 1, ua = 2, zn = 3, dn = 4, ye = 5, Fn = 6, ze = 7;
function Gn(e) {
  return e.id === Rr;
}
function ma(e) {
  return e.id === ua;
}
function Zl(e) {
  return function(t) {
    return t.id === lr;
  }(e) || J(305, String(e.id), String(lr)), Object.assign(e, { id: ua });
}
const Ql = /* @__PURE__ */ new Set();
class tw {
  constructor(t, n) {
    pt(this, "builder");
    pt(this, "configs");
    pt(this, "_dependency");
    pt(this, "_peerNameSet");
    pt(this, "extension");
    pt(this, "state");
    pt(this, "_signal");
    this.builder = t, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Rr };
  }
  mergeConfigs() {
    let t = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : li;
    for (const r of this.configs) t = n(t, r);
    return t;
  }
  init(t) {
    const n = this.state;
    ma(n) || J(306, String(n.id));
    const r = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...r, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, c, w) {
      return Object.assign(l, { config: c, id: zn, registerState: w });
    }(n, this.mergeConfigs(), r);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(t, s.config, r)), this.state = function(l, c, w) {
      return Object.assign(l, { id: dn, initResult: c, registerState: w });
    }(s, i, a);
  }
  build(t) {
    const n = this.state;
    let r;
    n.id !== dn && J(307, String(n.id), String(ye)), this.extension.build && (r = this.extension.build(t, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => r, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: ye, output: i, registerState: l });
    }(n, r, a);
  }
  register(t, n) {
    this._signal = n;
    const r = this.state;
    r.id !== ye && J(308, String(r.id), String(ye));
    const a = this.extension.register && this.extension.register(t, r.config, r.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Fn });
    }(r), () => {
      const s = this.state;
      s.id !== ze && J(309, String(r.id), String(ze)), this.state = function(i) {
        return Object.assign(i, { id: ye });
      }(s), a && a();
    };
  }
  afterRegistration(t) {
    const n = this.state;
    let r;
    return n.id !== Fn && J(310, String(n.id), String(Fn)), this.extension.afterRegistration && (r = this.extension.afterRegistration(t, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: ze });
    }(n), r;
  }
  getSignal() {
    return this._signal === void 0 && J(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && J(312, this.extension.name);
    const t = this.state;
    return function(n) {
      return n.id >= dn;
    }(t) || J(313, String(t.id), String(dn)), t.initResult;
  }
  getInitPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const t = this.state;
    return function(n) {
      return n.id >= zn;
    }(t) || J(314, String(t.id), String(zn)), { config: t.config };
  }
  getPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && J(315, this.extension.name, t.name), n.getExtensionInitDependency();
  }
  getDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && J(315, this.extension.name, t.name), n.getExtensionDependency();
  }
  getState() {
    const t = this.state;
    return function(n) {
      return n.id >= ze;
    }(t) || J(316, String(t.id), String(ze)), t;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Ql;
  }
  getPeerNameSet() {
    let t = this._peerNameSet;
    return t || (t = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = t), t;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const t = this.state;
      (function(n) {
        return n.id >= ye;
      })(t) || J(317, this.extension.name), this._dependency = { config: t.config, init: t.initResult, output: t.output };
    }
    return this._dependency;
  }
}
const no = { tag: gr };
function ew() {
  const e = qt();
  e.isEmpty() && e.append(Nn());
}
const nw = jt({ config: nn({ setOptions: no, updateOptions: no }), init: ({ $initialEditorState: e = ew }) => ({ $initialEditorState: e, initialized: !1 }), afterRegistration(e, { updateOptions: t, setOptions: n }, r) {
  const a = r.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (pi(s)) e.setEditorState(s, n);
    else if (typeof s == "function") e.update(() => {
      s(e);
    }, t);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const i = e.parseEditorState(s);
      e.setEditorState(i, n);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [wi, To, ci, di, So] }), ro = Symbol.for("@lexical/extension/LexicalBuilder");
function oo() {
}
function rw(e) {
  throw e;
}
function pn(e) {
  return Array.isArray(e) ? e : [e];
}
const Hn = "0.38.2+prod.esm";
class Ue {
  constructor(t) {
    pt(this, "roots");
    pt(this, "extensionNameMap");
    pt(this, "outgoingConfigEdges");
    pt(this, "incomingEdges");
    pt(this, "conflicts");
    pt(this, "_sortedExtensionReps");
    pt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Hn, this.roots = t;
    for (const n of t) this.addExtension(n);
  }
  static fromExtensions(t) {
    const n = [pn(nw)];
    for (const r of t) n.push(pn(r));
    return new Ue(n);
  }
  static maybeFromEditor(t) {
    const n = t[ro];
    return n && (n.PACKAGE_VERSION !== Hn && J(292, n.PACKAGE_VERSION, Hn), n instanceof Ue || J(293)), n;
  }
  static fromEditor(t) {
    const n = Ue.maybeFromEditor(t);
    return n === void 0 && J(294), n;
  }
  constructEditor() {
    const { $initialEditorState: t, onError: n, ...r } = this.buildCreateEditorArgs(), a = Object.assign(Eo({ ...r, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [ro]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let t = oo;
    function n() {
      try {
        t();
      } finally {
        t = oo;
      }
    }
    const r = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return t = Jt(this.registerEditor(r), () => r.setRootElement(null)), r;
  }
  hasExtensionByName(t) {
    return this.extensionNameMap.has(t);
  }
  getExtensionRep(t) {
    const n = this.extensionNameMap.get(t.name);
    if (n) return n.extension !== t && J(295, t.name), n;
  }
  addEdge(t, n, r) {
    const a = this.outgoingConfigEdges.get(t);
    a ? a.set(n, r) : this.outgoingConfigEdges.set(t, /* @__PURE__ */ new Map([[n, r]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(t) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([t]));
  }
  addExtension(t) {
    this._sortedExtensionReps !== void 0 && J(296);
    const n = pn(t), [r] = n;
    typeof r.name != "string" && J(297, typeof r.name);
    let a = this.extensionNameMap.get(r.name);
    if (a !== void 0 && a.extension !== r && J(298, r.name), !a) {
      a = new tw(this, r), this.extensionNameMap.set(r.name, a);
      const s = this.conflicts.get(r.name);
      typeof s == "string" && J(299, r.name, s);
      for (const i of r.conflictsWith || []) this.extensionNameMap.has(i) && J(299, r.name, i), this.conflicts.set(i, r.name);
      for (const i of r.dependencies || []) {
        const l = pn(i);
        this.addEdge(r.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of r.peerDependencies || []) this.addEdge(r.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const t = [], n = (r, a) => {
      let s = r.state;
      if (ma(s)) return;
      const i = r.extension.name;
      var l;
      Gn(s) || J(300, i, a || "[unknown]"), Gn(l = s) || J(304, String(l.id), String(Rr)), s = Object.assign(l, { id: lr }), r.state = s;
      const c = this.outgoingConfigEdges.get(i);
      if (c) for (const w of c.keys()) {
        const p = this.extensionNameMap.get(w);
        p && n(p, i);
      }
      s = Zl(s), r.state = s, t.push(r);
    };
    for (const r of this.extensionNameMap.values()) Gn(r.state) && n(r);
    for (const r of t) for (const [a, s] of this.outgoingConfigEdges.get(r.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [r, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(r.name);
      s === void 0 && J(301, r.name);
      for (const i of a) s.configs.add(i);
    }
    return this._sortedExtensionReps = t, this._sortedExtensionReps;
  }
  registerEditor(t) {
    const n = this.sortedExtensionReps(), r = new AbortController(), a = [() => r.abort()], s = r.signal;
    for (const i of n) {
      const l = i.register(t, s);
      l && a.push(l);
    }
    for (const i of n) {
      const l = i.afterRegistration(t);
      l && a.push(l);
    }
    return Jt(...a);
  }
  buildCreateEditorArgs() {
    const t = {}, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: f } = p;
      if (f.onError !== void 0 && (t.onError = f.onError), f.disableEvents !== void 0 && (t.disableEvents = f.disableEvents), f.parentEditor !== void 0 && (t.parentEditor = f.parentEditor), f.editable !== void 0 && (t.editable = f.editable), f.namespace !== void 0 && (t.namespace = f.namespace), f.$initialEditorState !== void 0 && (t.$initialEditorState = f.$initialEditorState), f.nodes) for (const m of Wl(f)) {
        if (typeof m != "function") {
          const u = r.get(m.replace);
          u && J(302, f.name, m.replace.name, u.extension.name), r.set(m.replace, p);
        }
        n.add(m);
      }
      if (f.html) {
        if (f.html.export) for (const [m, u] of f.html.export.entries()) a.set(m, u);
        f.html.import && Object.assign(s, f.html.import);
      }
      f.theme && pa(i, f.theme);
    }
    Object.keys(i).length > 0 && (t.theme = i), n.size && (t.nodes = [...n]);
    const c = Object.keys(s).length > 0, w = a.size > 0;
    (c || w) && (t.html = {}, c && (t.html.import = s), w && (t.html.export = a));
    for (const p of l) p.init(t);
    return t.onError || (t.onError = rw), t;
  }
}
const ow = /* @__PURE__ */ new Set(), ao = jt({ build(e, t, n) {
  const r = n.getDependency(ir).output, a = We({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = da(() => {
  }, () => Wt(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    r.value.read(() => {
      if (Lt()) for (const [p, f] of l.entries()) {
        if (f.size === 0) {
          l.delete(p);
          continue;
        }
        const m = ki(p), u = m && m.isSelected() || !1;
        w = w || u !== (!!i && i.has(p)), u && (c = c || /* @__PURE__ */ new Set(), c.add(p));
      }
    }), !w && c && i && c.size === i.size || (s.value = c);
  }));
  return { watchNodeKey: function(i) {
    const l = ql(() => (s.value || ow).has(i)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(i);
    const p = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), p || (c.set(i, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [ir], name: "@lexical/extension/NodeSelection" });
ui("INSERT_HORIZONTAL_RULE_COMMAND");
class Se extends yi {
  static getType() {
    return "horizontalrule";
  }
  static clone(t) {
    return new Se(t.__key);
  }
  static importJSON(t) {
    return ha().updateFromJSON(t);
  }
  static importDOM() {
    return { hr: () => ({ conversion: aw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(t) {
    const n = document.createElement("hr");
    return aa(n, t.theme.hr), n;
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
function aw() {
  return { node: ha() };
}
function ha() {
  return Ni(Se);
}
function sw(e) {
  return e instanceof Se;
}
jt({ dependencies: [ir, ao], name: "@lexical/extension/HorizontalRule", nodes: [Se], register(e, t, n) {
  const { watchNodeKey: r } = n.getDependency(ao).output, a = We({ nodeSelections: /* @__PURE__ */ new Map() }), s = e._config.theme.hrSelected ?? "selected";
  return Jt(e.registerCommand(mi, (i) => {
    if (hi(i.target)) {
      const l = fi(i.target);
      if (sw(l)) return function(c, w = !1) {
        const p = Lt(), f = c.isSelected(), m = c.getKey();
        let u;
        w && gi(p) ? u = p : (u = bi(), vi(u)), f ? u.delete(m) : u.add(m);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, xi), e.registerMutationListener(Se, (i, l) => {
    Yl(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [p, f] of i.entries()) if (f === "destroyed") w.delete(p), c = !0;
      else {
        const m = w.get(p), u = e.getElementByKey(p);
        m ? m.domNode.value = u : (c = !0, w.set(p, { domNode: We(u), selectedSignal: r(p) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), Wt(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) i.push(Wt(() => {
      const w = l.value;
      w && (c.value ? aa(w, s) : Xl(w, s));
    }));
    return Jt(...i);
  }));
} });
function iw(e, t) {
  return Jt(e.registerCommand(_i, (n) => {
    const r = Lt();
    if (!Je(r)) return !1;
    n.preventDefault();
    const a = function(s) {
      const i = s.getNodes();
      if (Kl(i, (m) => hn(m) && m.canIndent() ? m : null).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, p = w.getNode(), f = Zr(p);
      if (f.canIndent()) {
        const m = f.getKey();
        let u = Ci();
        if (u.anchor.set(m, 0, "element"), u.focus.set(m, 0, "element"), u = Ei(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(r) ? n.shiftKey ? Si : Hr : Ti;
    return e.dispatchCommand(a, void 0);
  }, Do), e.registerCommand(Hr, () => {
    const n = typeof t == "number" ? t : t ? t.peek() : null;
    if (n == null) return !1;
    const r = Lt();
    if (!Je(r)) return !1;
    const a = r.getNodes().map((s) => Zr(s).getIndent());
    return Math.max(...a) + 1 >= n;
  }, br));
}
jt({ build: (e, t, n) => Cn(t), config: nn({ disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(e, t, n) {
  const { disabled: r, maxIndent: a } = n.getOutput();
  return Wt(() => {
    if (!r.value) return iw(e, a);
  });
} });
const lw = jt({ name: "@lexical/react/ReactProvider" });
function ww() {
  return qt().getTextContent();
}
function cw(e, t = !0) {
  if (e) return !1;
  let n = ww();
  return t && (n = n.trim()), n === "";
}
function dw(e) {
  if (!cw(e, !1)) return !1;
  const t = qt().getChildren(), n = t.length;
  if (n > 1) return !1;
  for (let r = 0; r < n; r++) {
    const a = t[r];
    if (Ri(a)) return !1;
    if (we(a)) {
      if (!Di(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const c = s[r];
        if (!fn(c)) return !1;
      }
    }
  }
  return !0;
}
function fa(e) {
  return () => dw(e);
}
function ga(e) {
  const t = window.location.origin, n = (r) => {
    if (r.origin !== t) return;
    const a = e.getRootElement();
    if (document.activeElement !== a) return;
    const s = r.data;
    if (typeof s == "string") {
      let i;
      try {
        i = JSON.parse(s);
      } catch {
        return;
      }
      if (i && i.protocol === "nuanria_messaging" && i.type === "request") {
        const l = i.payload;
        if (l && l.functionId === "makeChanges") {
          const c = l.args;
          if (c) {
            const [w, p, f, m, u] = c;
            e.update(() => {
              const g = Lt();
              if (Je(g)) {
                const k = g.anchor;
                let x = k.getNode(), _ = 0, C = 0;
                if (fn(x) && w >= 0 && p >= 0 && (_ = w, C = w + p, g.setTextNodeRange(x, _, x, C)), _ === C && f === "" || (g.insertRawText(f), x = k.getNode()), fn(x)) {
                  _ = m, C = m + u;
                  const y = x.getTextContentSize();
                  _ = _ > y ? y : _, C = C > y ? y : C, g.setTextNodeRange(x, _, x, C);
                }
                r.stopImmediatePropagation();
              }
            });
          }
        }
      }
    }
  };
  return window.addEventListener("message", n, !0), () => {
    window.removeEventListener("message", n, !0);
  };
}
jt({ build: (e, t, n) => Cn(t), config: nn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (e, t, n) => Wt(() => n.getOutput().disabled.value ? void 0 : ga(e)) });
function pw(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Dr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : q;
function uw({ editor: e, ErrorBoundary: t }) {
  return function(n, r) {
    const [a, s] = D(() => n.getDecorators());
    return Dr(() => n.registerDecoratorListener((i) => {
      zi(() => {
        s(i);
      });
    }), [n]), q(() => {
      s(n.getDecorators());
    }, [n]), $(() => {
      const i = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], p = o(r, { onError: (m) => n._onError(m), children: o(ps, { fallback: null, children: a[w] }) }), f = n.getElementByKey(w);
        f !== null && i.push(Fi(p, f, w));
      }
      return i;
    }, [r, a, n]);
  }(e, t);
}
function mw({ editor: e, ErrorBoundary: t }) {
  return function(n) {
    const r = Ue.maybeFromEditor(n);
    if (r && r.hasExtensionByName(lw.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) r.hasExtensionByName(a) && pw(320, a);
      return !0;
    }
    return !1;
  }(e) ? null : o(uw, { editor: e, ErrorBoundary: t });
}
function so(e) {
  return e.getEditorState().read(fa(e.isComposing()));
}
function hw({ contentEditable: e, placeholder: t = null, ErrorBoundary: n }) {
  const [r] = Mt();
  return function(a) {
    Dr(() => Jt(ji(a), ga(a)), [a]);
  }(r), d(at, { children: [e, o(fw, { content: t }), o(mw, { editor: r, ErrorBoundary: n })] });
}
function fw({ content: e }) {
  const [t] = Mt(), n = function(a) {
    const [s, i] = D(() => so(a));
    return Dr(() => {
      function l() {
        const c = so(a);
        i(c);
      }
      return l(), Jt(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(t), r = zl();
  return n ? typeof e == "function" ? e(r) : e : null;
}
function gw({ defaultSelection: e }) {
  const [t] = Mt();
  return q(() => {
    t.focus(() => {
      const n = document.activeElement, r = t.getRootElement();
      r === null || n !== null && r.contains(n) || r.focus({ preventScroll: !0 });
    }, { defaultSelection: e });
  }, [e, t]), null;
}
const bw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : q;
function vw({ onClear: e }) {
  const [t] = Mt();
  return bw(() => ca(t, e), [t, e]), null;
}
const ba = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : q;
function xw({ editor: e, ariaActiveDescendant: t, ariaAutoComplete: n, ariaControls: r, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: p, ariaOwns: f, ariaRequired: m, autoCapitalize: u, className: g, id: k, role: x = "textbox", spellCheck: _ = !0, style: C, tabIndex: y, "data-testid": E, ...I }, R) {
  const [S, O] = D(e.isEditable()), N = j((V) => {
    V && V.ownerDocument && V.ownerDocument.defaultView ? e.setRootElement(V) : e.setRootElement(null);
  }, [e]), T = $(() => /* @__PURE__ */ function(...V) {
    return (B) => {
      for (const F of V) typeof F == "function" ? F(B) : F != null && (F.current = B);
    };
  }(R, N), [N, R]);
  return ba(() => (O(e.isEditable()), e.registerEditableListener((V) => {
    O(V);
  })), [e]), o("div", { "aria-activedescendant": S ? t : void 0, "aria-autocomplete": S ? n : "none", "aria-controls": S ? r : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": S && x === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": p, "aria-owns": S ? f : void 0, "aria-readonly": !S || void 0, "aria-required": m, autoCapitalize: u, className: g, contentEditable: S, "data-testid": E, id: k, ref: T, role: x, spellCheck: _, style: C, tabIndex: y, ...I });
}
const yw = tn(xw);
function io(e) {
  return e.getEditorState().read(fa(e.isComposing()));
}
const Nw = tn(kw);
function kw(e, t) {
  const { placeholder: n, ...r } = e, [a] = Mt();
  return d(at, { children: [o(yw, { editor: a, ...r, ref: t }), n != null && o(_w, { editor: a, content: n })] });
}
function _w({ content: e, editor: t }) {
  const n = function(i) {
    const [l, c] = D(() => io(i));
    return ba(() => {
      function w() {
        const p = io(i);
        c(p);
      }
      return w(), Jt(i.registerUpdateListener(() => {
        w();
      }), i.registerEditableListener(() => {
        w();
      }));
    }, [i]), l;
  }(t), [r, a] = D(t.isEditable());
  if ($t(() => (a(t.isEditable()), t.registerEditableListener((i) => {
    a(i);
  })), [t]), !n) return null;
  let s = null;
  return typeof e == "function" ? s = e(r) : e !== null && (s = e), s === null ? null : o("div", { "aria-hidden": !0, children: s });
}
function Cw({
  placeholder: e,
  className: t,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ o(
    Nw,
    {
      className: t ?? "ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none",
      "aria-placeholder": e,
      placeholder: /* @__PURE__ */ o(
        "div",
        {
          className: n ?? "tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",
          children: e
        }
      )
    }
  );
}
const va = xn(void 0);
function Ew({
  activeEditor: e,
  $updateToolbar: t,
  blockType: n,
  setBlockType: r,
  showModal: a,
  children: s
}) {
  const i = $(
    () => ({
      activeEditor: e,
      $updateToolbar: t,
      blockType: n,
      setBlockType: r,
      showModal: a
    }),
    [e, t, n, r, a]
  );
  return /* @__PURE__ */ o(va.Provider, { value: i, children: s });
}
function xa() {
  const e = fr(va);
  if (!e)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return e;
}
function Sw() {
  const [e, t] = D(void 0), n = j(() => {
    t(void 0);
  }, []), r = $(() => {
    if (e === void 0)
      return;
    const { title: s, content: i } = e;
    return /* @__PURE__ */ o(nl, { open: !0, onOpenChange: n, children: /* @__PURE__ */ d(zo, { children: [
      /* @__PURE__ */ o(Fo, { children: /* @__PURE__ */ o(Go, { children: s }) }),
      i
    ] }) });
  }, [e, n]), a = j(
    (s, i, l = !1) => {
      t({
        closeOnClickOutside: l,
        content: i(n),
        title: s
      });
    },
    [n]
  );
  return [r, a];
}
function Tw({
  children: e
}) {
  const [t] = Mt(), [n, r] = D(t), [a, s] = D("paragraph"), [i, l] = Sw(), c = () => {
  };
  return q(() => n.registerCommand(
    Oo,
    (w, p) => (r(p), !1),
    br
  ), [n]), /* @__PURE__ */ d(
    Ew,
    {
      activeEditor: n,
      $updateToolbar: c,
      blockType: a,
      setBlockType: s,
      showModal: l,
      children: [
        i,
        e({ blockType: a })
      ]
    }
  );
}
function Rw(e) {
  const [t] = Mt(), { activeEditor: n } = xa();
  q(() => n.registerCommand(
    Oo,
    () => {
      const r = Lt();
      return r && e(r), !1;
    },
    br
  ), [t, e]), q(() => {
    n.getEditorState().read(() => {
      const r = Lt();
      r && e(r);
    });
  }, [n, e]);
}
const ya = Zt(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-transparent",
        outline: "tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"
      },
      size: {
        default: "tw-h-10 tw-px-3",
        sm: "tw-h-9 tw-px-2.5",
        lg: "tw-h-11 tw-px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Dw = b.forwardRef(({ className: e, variant: t, size: n, ...r }, a) => /* @__PURE__ */ o(
  Ao.Root,
  {
    ref: a,
    className: h(ya({ variant: t, size: n, className: e })),
    ...r
  }
));
Dw.displayName = Ao.Root.displayName;
const Na = b.createContext({
  size: "default",
  variant: "default"
}), Or = b.forwardRef(({ className: e, variant: t, size: n, children: r, ...a }, s) => {
  const i = lt();
  return /* @__PURE__ */ o(
    kn.Root,
    {
      ref: s,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
      ...a,
      dir: i,
      children: /* @__PURE__ */ o(
        Na.Provider,
        {
          value: { variant: t, size: n },
          children: r
        }
      )
    }
  );
});
Or.displayName = kn.Root.displayName;
const Ye = b.forwardRef(({ className: e, children: t, variant: n, size: r, ...a }, s) => {
  const i = b.useContext(Na);
  return /* @__PURE__ */ o(
    kn.Item,
    {
      ref: s,
      className: h(
        ya({
          variant: i.variant || n,
          size: i.size || r
        }),
        e
      ),
      ...a,
      children: t
    }
  );
});
Ye.displayName = kn.Item.displayName;
const lo = [
  { format: "bold", icon: fs, label: "Bold" },
  { format: "italic", icon: gs, label: "Italic" },
  { format: "underline", icon: bs, label: "Underline" },
  { format: "strikethrough", icon: vs, label: "Strikethrough" }
];
function Ow() {
  const { activeEditor: e } = xa(), [t, n] = D([]), r = j((a) => {
    if (Je(a) || Gi(a)) {
      const s = [];
      lo.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return Rw(r), /* @__PURE__ */ o(
    Or,
    {
      type: "multiple",
      value: t,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: lo.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ o(
        Ye,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            e.dispatchCommand(Oi, a);
          },
          children: /* @__PURE__ */ o(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function Mw({ onClear: e }) {
  const [t] = Mt();
  q(() => {
    e && e(() => {
      t.dispatchCommand(Ro, void 0);
    });
  }, [t, e]);
}
function Iw({
  placeholder: e = "Start typing ...",
  autoFocus: t = !1,
  onClear: n
}) {
  const [, r] = D(void 0);
  return /* @__PURE__ */ d("div", { className: "tw-relative", children: [
    /* @__PURE__ */ o(Tw, { children: () => /* @__PURE__ */ o("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ o(Ow, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw-relative", children: [
      /* @__PURE__ */ o(
        hw,
        {
          contentEditable: /* @__PURE__ */ o("div", { ref: (s) => {
            s !== void 0 && r(s);
          }, children: /* @__PURE__ */ o(Cw, { placeholder: e }) }),
          ErrorBoundary: Ll
        }
      ),
      t && /* @__PURE__ */ o(gw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ o(Mw, { onClear: n }),
      /* @__PURE__ */ o(vw, {})
    ] })
  ] });
}
const Aw = {
  namespace: "commentEditor",
  theme: Er,
  nodes: Sr,
  onError: (e) => {
    console.error(e);
  }
};
function wr({
  editorState: e,
  editorSerializedState: t,
  onChange: n,
  onSerializedChange: r,
  placeholder: a = "Start typing…",
  autoFocus: s = !1,
  onClear: i
}) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow", children: /* @__PURE__ */ o(
    Ml,
    {
      initialConfig: {
        ...Aw,
        ...e ? { editorState: e } : {},
        ...t ? { editorState: JSON.stringify(t) } : {}
      },
      children: /* @__PURE__ */ d(Vt, { children: [
        /* @__PURE__ */ o(Iw, { placeholder: a, autoFocus: s, onClear: i }),
        /* @__PURE__ */ o(
          Al,
          {
            ignoreSelectionChange: !0,
            onChange: (l) => {
              n == null || n(l), r == null || r(l.toJSON());
            }
          }
        )
      ] })
    }
  ) });
}
function Vw(e, t) {
  const n = Ai(t) ? t.body.childNodes : t.childNodes;
  let r = [];
  const a = [];
  for (const s of n) if (!_a.has(s.nodeName)) {
    const i = Ca(s, e, a, !1);
    i !== null && (r = r.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof Mo && i.insertAfter(Io());
    for (const i of s) {
      const l = i.getChildren();
      for (const c of l) i.insertBefore(c);
      i.remove();
    }
  }(a), r;
}
function Pw(e, t) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), r = qt().getChildren();
  for (let a = 0; a < r.length; a++)
    ka(e, r[a], n, t);
  return n.innerHTML;
}
function ka(e, t, n, r = null) {
  let a = r === null || t.isSelected(r);
  const s = we(t) && t.excludeFromCopy("html");
  let i = t;
  r !== null && fn(t) && (i = Fl(r, t, "clone"));
  const l = we(i) ? i.getChildren() : [], c = Mi(e, i.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(e, i) : i.exportDOM(e);
  const { element: p, after: f } = w;
  if (!p) return !1;
  const m = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], k = ka(e, g, m, r);
    !a && we(t) && k && t.extractWithChild(g, r, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Ii(p) || Xr(p)) && p.append(m), n.append(p), f) {
      const u = f.call(i, p);
      u && (Xr(p) ? p.replaceChildren(u) : p.replaceWith(u));
    }
  } else n.append(m);
  return a;
}
const _a = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ca(e, t, n, r, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (_a.has(e.nodeName)) return i;
  let l = null;
  const c = function(g, k) {
    const { nodeName: x } = g, _ = k._htmlConversions.get(x.toLowerCase());
    let C = null;
    if (_ !== void 0) for (const y of _) {
      const E = y(g);
      E !== null && (C === null || (C.priority || 0) <= (E.priority || 0)) && (C = E);
    }
    return C !== null ? C.conversion : null;
  }(e, t), w = c ? c(e) : null;
  let p = null;
  if (w !== null) {
    p = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, k] of a) if (l = k(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(e.nodeName, w.forChild);
  }
  const f = e.childNodes;
  let m = [];
  const u = (l == null || !Vi(l)) && (l != null && hn(l) || r);
  for (let g = 0; g < f.length; g++) m.push(...Ca(f[g], t, n, u, new Map(a), l));
  return p != null && (m = p(m)), Kr(e) && (m = $w(e, m, u ? () => {
    const g = new Mo();
    return n.push(g), g;
  } : Nn)), l == null ? m.length > 0 ? i = i.concat(m) : Kr(e) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Ur(g.nextSibling) && Ur(g.previousSibling);
  }(e) && (i = i.concat(Io())) : we(l) && l.append(...m), i;
}
function $w(e, t, n) {
  const r = e.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (hn(l)) r && !l.getFormat() && l.setFormat(r), a.push(l);
    else if (s.push(l), i === t.length - 1 || i < t.length - 1 && hn(t[i + 1])) {
      const c = n();
      c.setFormat(r), c.append(...s), a.push(c), s = [];
    }
  }
  return a;
}
function Lw(e) {
  const t = e.querySelector('[contenteditable="true"]');
  if (!t) return !1;
  t.focus();
  const n = window.getSelection(), r = document.createRange();
  return r.selectNodeContents(t), r.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(r), !0;
}
function Ht(e) {
  var t;
  return (t = e == null ? void 0 : e.root) != null && t.children ? e.root.children.some((n) => n != null && n.children ? n.children.some((r) => (r == null ? void 0 : r.text) && r.text.trim().length > 0) : !1) : !1;
}
function Bw(e) {
  if (!e || e.trim() === "")
    throw new Error("Input HTML is empty");
  const t = e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi, "<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi, "$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi, "$1"), n = Vo({
    namespace: "EditorUtils",
    theme: Er,
    nodes: Sr,
    onError: (a) => {
      console.error(a);
    }
  });
  let r;
  if (n.update(
    () => {
      const s = new DOMParser().parseFromString(t, "text/html"), i = Vw(n, s);
      qt().clear(), Pi(i);
    },
    {
      discrete: !0
    }
  ), n.getEditorState().read(() => {
    r = n.getEditorState().toJSON();
  }), !r)
    throw new Error("Failed to convert HTML to editor state");
  return r;
}
function cr(e) {
  const t = Vo({
    namespace: "EditorUtils",
    theme: Er,
    nodes: Sr,
    onError: (a) => {
      console.error(a);
    }
  }), n = t.parseEditorState(JSON.stringify(e));
  t.setEditorState(n);
  let r = "";
  return t.getEditorState().read(() => {
    r = Pw(t);
  }), r = r.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<s>(.*?)<\/s>/g, "<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi, "<br/>"), r;
}
function Ea(e) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key) ? (e.stopPropagation(), !0) : !1;
}
const jw = Zt(
  "pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",
  {
    variants: {
      variant: {
        default: "tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",
        secondary: "tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        muted: "tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",
        destructive: "tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",
        outline: "tw-border tw-text-foreground",
        blueIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",
        mutedIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Te = b.forwardRef(
  ({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ o("div", { ref: r, className: h("pr-twp", jw({ variant: t }), e), ...n })
);
Te.displayName = "Badge";
const Mr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: h(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Mr.displayName = "Card";
const zw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
zw.displayName = "CardHeader";
const Fw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "h3",
    {
      ref: n,
      className: h(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...t,
      children: t.children
    }
  )
);
Fw.displayName = "CardTitle";
const Gw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
Gw.displayName = "CardDescription";
const Sa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
Sa.displayName = "CardContent";
const Hw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
Hw.displayName = "CardFooter";
const Re = b.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, a) => /* @__PURE__ */ o(
  Po.Root,
  {
    ref: a,
    decorative: n,
    orientation: t,
    className: h(
      "pr-twp tw-shrink-0 tw-bg-border",
      t === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...r
  }
));
Re.displayName = Po.Root.displayName;
const Ta = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ie.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      e
    ),
    ...t
  }
));
Ta.displayName = Ie.Root.displayName;
const Xw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ie.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", e),
    ...t
  }
));
Xw.displayName = Ie.Image.displayName;
const Ra = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ie.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      e
    ),
    ...t
  }
));
Ra.displayName = Ie.Fallback.displayName;
const Ir = xn(void 0);
function St() {
  const e = fr(Ir);
  if (!e)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return e;
}
const Ft = Zt("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Pe = et.Trigger, Da = et.Group, Kw = et.Portal, Uw = et.Sub, Yw = et.RadioGroup;
function ve({ variant: e = "default", ...t }) {
  const n = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ o(Ir.Provider, { value: n, children: /* @__PURE__ */ o(et.Root, { ...t }) });
}
const Oa = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => {
  const s = St();
  return /* @__PURE__ */ d(
    et.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        t && "tw-pl-8",
        e,
        Ft({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ o(Ce, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Oa.displayName = et.SubTrigger.displayName;
const Ma = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  et.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Ma.displayName = et.SubContent.displayName;
const ne = b.forwardRef(({ className: e, sideOffset: t = 4, children: n, ...r }, a) => {
  const s = lt();
  return /* @__PURE__ */ o(et.Portal, { children: /* @__PURE__ */ o(
    et.Content,
    {
      ref: a,
      sideOffset: t,
      className: h(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...r,
      children: /* @__PURE__ */ o("div", { dir: s, children: n })
    }
  ) });
});
ne.displayName = et.Content.displayName;
const bn = b.forwardRef(({ className: e, inset: t, ...n }, r) => {
  const a = lt(), s = St();
  return /* @__PURE__ */ o(
    et.Item,
    {
      ref: r,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        e,
        Ft({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
bn.displayName = et.Item.displayName;
const Yt = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => {
  const s = St();
  return /* @__PURE__ */ d(
    et.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Ft({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(Ot, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
Yt.displayName = et.CheckboxItem.displayName;
const Ia = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = St();
  return /* @__PURE__ */ d(
    et.RadioItem,
    {
      ref: r,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Ft({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(yn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
Ia.displayName = et.RadioItem.displayName;
const an = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  et.Label,
  {
    ref: r,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
an.displayName = et.Label.displayName;
const $e = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  et.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
$e.displayName = et.Separator.displayName;
function qw({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
qw.displayName = "DropdownMenuShortcut";
function mn(e, t) {
  return e === "" ? t["%comment_assign_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%comment_assign_team%"] ?? "Team" : e;
}
function wo({
  comment: e,
  isReply: t = !1,
  localizedStrings: n,
  isThreadExpanded: r = !1,
  threadStatus: a = "Unspecified",
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  onEditingChange: c,
  canUserEditOrDeleteCommentCallback: w,
  canUserResolveThread: p = !1
}) {
  const [f, m] = D(!1), [u, g] = D(), [k, x] = D(!1), _ = Q(null);
  q(() => {
    let N = !0;
    if (!r) {
      x(!1);
      return;
    }
    return (async () => {
      const V = w ? await w(e.id) : !1;
      N && x(V);
    })(), () => {
      N = !1;
    };
  }, [w, e.id, r]), q(() => {
    if (!f) return;
    let N = !0;
    const T = _.current;
    if (!T) return;
    const V = setTimeout(() => {
      N && Lw(T);
    }, 300);
    return () => {
      N = !1, clearTimeout(V);
    };
  }, [f]);
  const C = j(() => {
    m(!1), g(void 0), c == null || c(!1);
  }, [c]), y = j(async () => {
    if (!u || !i) return;
    await i(
      e.id,
      cr(u)
    ) && (m(!1), g(void 0), c == null || c(!1));
  }, [u, i, e.id, c]), E = $(() => {
    const N = new Date(e.date), T = Ws(
      N,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), V = N.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return le(n["%comment_dateAtTime%"], {
      date: T,
      time: V
    });
  }, [e.date, n]), I = $(() => e.user, [e.user]), R = $(
    () => e.user.split(" ").map((N) => N[0]).join("").toUpperCase().slice(0, 2),
    [e.user]
  ), S = $(
    () => Zs(Gr(e.contents)),
    [e.contents]
  ), O = $(() => {
    if (r && k)
      return /* @__PURE__ */ d(at, { children: [
        !Qs(e.contents) && /* @__PURE__ */ d(
          bn,
          {
            onClick: () => {
              m(!0), g(Bw(Gr(e.contents))), c == null || c(!0);
            },
            children: [
              /* @__PURE__ */ o(xs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ d(
          bn,
          {
            onClick: async () => {
              l && await l(e.id);
            },
            children: [
              /* @__PURE__ */ o(ys, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    k,
    r,
    n,
    e.contents,
    e.id,
    l,
    c
  ]);
  return /* @__PURE__ */ d(
    "div",
    {
      className: h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": t
      }),
      children: [
        /* @__PURE__ */ o(Ta, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ o(Ra, { className: "tw-text-xs tw-font-medium", children: R }) }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ o("p", { className: "tw-text-sm tw-font-medium", children: I }),
            /* @__PURE__ */ o("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: E }),
            /* @__PURE__ */ o("div", { className: "tw-flex-1" }),
            t && e.assignedUser !== void 0 && /* @__PURE__ */ d(Te, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              mn(e.assignedUser, n)
            ] })
          ] }),
          f && /* @__PURE__ */ d(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: _,
              onKeyDownCapture: (N) => {
                N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), C()) : N.key === "Enter" && N.shiftKey && (N.preventDefault(), N.stopPropagation(), Ht(u) && y());
              },
              onKeyDown: (N) => {
                Ea(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
              },
              children: [
                /* @__PURE__ */ o(
                  wr,
                  {
                    editorSerializedState: u,
                    onSerializedChange: (N) => g(N)
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ o(
                    L,
                    {
                      size: "icon",
                      onClick: C,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ o(en, {})
                    }
                  ),
                  /* @__PURE__ */ o(
                    L,
                    {
                      size: "icon",
                      onClick: y,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !Ht(u),
                      children: /* @__PURE__ */ o(bo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !f && /* @__PURE__ */ d(at, { children: [
            e.status === "Resolved" && /* @__PURE__ */ o("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_resolved%"] }),
            e.status === "Todo" && /* @__PURE__ */ o("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_todo%"] }),
            /* @__PURE__ */ o(
              "div",
              {
                className: h(
                  "tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",
                  // tw-prose has a max width defined on it, that we choose to override
                  "tw-max-w-none",
                  {
                    "tw-line-clamp-3": !r
                  }
                ),
                dangerouslySetInnerHTML: { __html: S }
              }
            )
          ] })
        ] }),
        r && p && !t && a !== "Resolved" && s && /* @__PURE__ */ o(
          L,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-shrink-0",
            onClick: (N) => {
              N.stopPropagation(), s({ threadId: e.thread, status: "Resolved" });
            },
            children: /* @__PURE__ */ o(Ot, {})
          }
        ),
        O && /* @__PURE__ */ d(ve, { children: [
          /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ o(L, { variant: "ghost", size: "icon", children: /* @__PURE__ */ o(vo, {}) }) }),
          /* @__PURE__ */ o(ne, { align: "end", children: O })
        ] })
      ]
    }
  );
}
const co = {
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
function Jw({
  comments: e,
  localizedStrings: t,
  isSelected: n = !1,
  verseRef: r,
  assignedUser: a,
  currentUser: s,
  handleSelectThread: i,
  threadId: l,
  threadStatus: c,
  handleAddCommentToThread: w,
  handleUpdateComment: p,
  handleDeleteComment: f,
  assignableUsers: m,
  canUserAddCommentToThread: u,
  canUserAssignThreadCallback: g,
  canUserResolveThreadCallback: k,
  canUserEditOrDeleteCommentCallback: x
}) {
  const [_, C] = D(co), [y, E] = D(!1), [I, R] = D(!1), [S, O] = D(!1), [N, T] = D(!1), [V, B] = D(!1), [F, A] = D(void 0), [W, M] = D(!1), [ot, yt] = D(!1);
  q(() => {
    let v = !0;
    if (!n) {
      M(!1), yt(!1);
      return;
    }
    return (async () => {
      const Z = g ? await g(l) : !1;
      if (!v) return;
      const ct = k ? await k(l) : !1;
      v && (M(Z), yt(ct));
    })(), () => {
      v = !1;
    };
  }, [n, l, g, k]);
  const _t = $(() => e.filter((v) => !v.deleted), [e]), bt = $(() => _t[0], [_t]), P = Q(null), tt = Q(void 0), dt = j(() => {
    var v;
    (v = tt.current) == null || v.call(tt), C(co);
  }, []);
  q(() => {
    const v = P.current;
    if (!v) return;
    const z = () => {
      R(v.scrollWidth > v.clientWidth);
    };
    return z(), window.addEventListener("resize", z), () => window.removeEventListener("resize", z);
  }, [bt == null ? void 0 : bt.verse]), q(() => {
    O(!1);
  }, [n]);
  const wt = $(
    () => ({
      singleReply: t["%comment_thread_single_reply%"],
      multipleReplies: t["%comment_thread_multiple_replies%"]
    }),
    [t]
  ), Nt = $(() => {
    if (a === void 0)
      return;
    if (a === "")
      return t["%comment_assign_unassigned%"] ?? "Unassigned";
    const v = mn(a, t);
    return le(t["%comment_assigned_to%"], {
      assignedUser: v
    });
  }, [a, t]), Gt = $(() => _t.slice(1), [_t]), vt = $(() => Gt.length ?? 0, [Gt.length]), On = $(() => vt > 0, [vt]), Mn = $(() => S || vt <= 2 ? Gt : Gt.slice(-2), [Gt, vt, S]), xe = $(() => S || vt <= 2 ? 0 : vt - 2, [vt, S]), sn = $(
    () => vt === 1 ? wt.singleReply : le(wt.multipleReplies, { count: vt }),
    [vt, wt]
  ), In = $(
    () => xe === 1 ? wt.singleReply : le(wt.multipleReplies, { count: xe }),
    [xe, wt]
  ), ln = j(async () => {
    const v = Ht(_) ? cr(_) : void 0;
    if (F !== void 0) {
      await w({
        threadId: l,
        contents: v,
        assignedUser: F
      }) && (A(void 0), v && dt());
      return;
    }
    v && await w({ threadId: l, contents: v }) && dt();
  }, [dt, _, w, F, l]), An = j(
    async (v) => {
      const z = Ht(_) ? cr(_) : void 0, Z = await w({
        ...v,
        contents: z,
        assignedUser: F ?? v.assignedUser
      });
      return Z && z && dt(), Z && F !== void 0 && A(void 0), Z;
    },
    [dt, _, w, F]
  );
  return /* @__PURE__ */ o(
    Mr,
    {
      role: "option",
      "aria-selected": n,
      id: l,
      className: h(
        "tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        { "tw-cursor-pointer hover:tw-shadow-md": !n },
        {
          "tw-bg-primary-foreground": !n && c !== "Resolved",
          "tw-bg-background": n && c !== "Resolved",
          "tw-bg-muted": c === "Resolved"
        }
      ),
      onClick: () => {
        i(l);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ d(Sa, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          Nt && /* @__PURE__ */ o(Te, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: Nt }),
          /* @__PURE__ */ d("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: [
            /* @__PURE__ */ d(
              "p",
              {
                ref: P,
                className: h(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": y
                  },
                  { "tw-whitespace-nowrap": !y }
                ),
                children: [
                  r,
                  " ",
                  bt.verse
                ]
              }
            ),
            I && /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "icon",
                onClick: (v) => {
                  v.stopPropagation(), E(!y);
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": y ? "Collapse text" : "Expand text",
                children: y ? /* @__PURE__ */ o(Jn, {}) : /* @__PURE__ */ o(ue, {})
              }
            )
          ] }),
          /* @__PURE__ */ o(
            wo,
            {
              comment: bt,
              localizedStrings: t,
              isThreadExpanded: n,
              threadStatus: c,
              handleAddCommentToThread: An,
              handleUpdateComment: p,
              handleDeleteComment: f,
              onEditingChange: T,
              canUserEditOrDeleteCommentCallback: x,
              canUserResolveThread: ot
            }
          )
        ] }),
        /* @__PURE__ */ d(at, { children: [
          On && !n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ o("div", { className: "tw-w-8", children: /* @__PURE__ */ o(Re, {}) }),
            /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: sn })
          ] }),
          !n && Ht(_) && /* @__PURE__ */ o(
            wr,
            {
              editorSerializedState: _,
              onSerializedChange: (v) => C(v),
              placeholder: t["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ d(at, { children: [
            xe > 0 && /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (v) => {
                  v.stopPropagation(), O(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (v) => {
                  (v.key === "Enter" || v.key === " ") && (v.preventDefault(), v.stopPropagation(), O(!0));
                },
                children: [
                  /* @__PURE__ */ o("div", { className: "tw-w-8", children: /* @__PURE__ */ o(Re, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: In }),
                    S ? /* @__PURE__ */ o(Jn, {}) : /* @__PURE__ */ o(ue, {})
                  ] })
                ]
              }
            ),
            Mn.map((v) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
              wo,
              {
                comment: v,
                localizedStrings: t,
                isReply: !0,
                isThreadExpanded: n,
                handleUpdateComment: p,
                handleDeleteComment: f,
                onEditingChange: T,
                canUserEditOrDeleteCommentCallback: x
              }
            ) }, v.id)),
            u !== !1 && (!N || Ht(_)) && /* @__PURE__ */ d(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (v) => v.stopPropagation(),
                onKeyDownCapture: (v) => {
                  v.key === "Enter" && v.shiftKey && (v.preventDefault(), v.stopPropagation(), (Ht(_) || F !== void 0) && ln());
                },
                onKeyDown: (v) => {
                  Ea(v), (v.key === "Enter" || v.key === " ") && v.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ o(
                    wr,
                    {
                      editorSerializedState: _,
                      onSerializedChange: (v) => C(v),
                      placeholder: c === "Resolved" ? t["%comment_reopenResolved%"] : t["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (v) => {
                        tt.current = v;
                      }
                    }
                  ),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    F !== void 0 && /* @__PURE__ */ o("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: le(
                      t["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: mn(
                          F,
                          t
                        )
                      }
                    ) }),
                    /* @__PURE__ */ d(ge, { open: V, onOpenChange: B, children: [
                      /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ o(
                        L,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !W || !m || m.length === 0 || !m.includes(s),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ o(Ns, {})
                        }
                      ) }),
                      /* @__PURE__ */ o(
                        ee,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (v) => {
                            v.key === "Escape" && (v.stopPropagation(), B(!1));
                          },
                          children: /* @__PURE__ */ o(Qt, { children: /* @__PURE__ */ o(te, { children: m == null ? void 0 : m.map((v) => /* @__PURE__ */ o(
                            zt,
                            {
                              onSelect: () => {
                                A(v !== a ? v : void 0), B(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ o("span", { children: mn(v, t) })
                            },
                            v || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ o(
                      L,
                      {
                        size: "icon",
                        onClick: ln,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !Ht(_) && F === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ o(bo, {})
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
function xp({
  className: e = "",
  threads: t,
  currentUser: n,
  localizedStrings: r,
  handleAddCommentToThread: a,
  handleUpdateComment: s,
  handleDeleteComment: i,
  assignableUsers: l,
  canUserAddCommentToThread: c,
  canUserAssignThreadCallback: w,
  canUserResolveThreadCallback: p,
  canUserEditOrDeleteCommentCallback: f
}) {
  const [m, u] = D(), g = t.filter(
    (R) => R.comments.some((S) => !S.deleted)
  ), k = g.map((R) => ({
    id: R.id
  })), x = j((R) => {
    u(R.id);
  }, []), _ = j((R) => {
    u(R);
  }, []), { listboxRef: C, activeId: y, handleKeyDown: E } = Rl({
    options: k,
    onOptionSelect: x
  }), I = j(
    (R) => {
      R.key === "Escape" ? (u(void 0), R.preventDefault(), R.stopPropagation()) : E(R);
    },
    [E]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: C,
      "aria-activedescendant": y ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        e
      ),
      onKeyDown: I,
      children: g.map((R) => /* @__PURE__ */ o(
        "div",
        {
          className: h({
            "tw-opacity-60": R.status === "Resolved"
          }),
          children: /* @__PURE__ */ o(
            Jw,
            {
              comments: R.comments,
              localizedStrings: r,
              verseRef: R.verseRef,
              handleSelectThread: _,
              threadId: R.id,
              isSelected: m === R.id,
              currentUser: n,
              assignedUser: R.assignedUser,
              threadStatus: R.status,
              handleAddCommentToThread: a,
              handleUpdateComment: s,
              handleDeleteComment: i,
              assignableUsers: l,
              canUserAddCommentToThread: c,
              canUserAssignThreadCallback: w,
              canUserResolveThreadCallback: p,
              canUserEditOrDeleteCommentCallback: f
            }
          )
        },
        R.id
      ))
    }
  );
}
function Ww({ table: e }) {
  return /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ o(Hi, { asChild: !0, children: /* @__PURE__ */ d(L, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ o(ks, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(ne, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ o(an, { children: "Toggle columns" }),
      /* @__PURE__ */ o($e, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ o(
        Yt,
        {
          className: "tw-capitalize",
          checked: t.getIsVisible(),
          onCheckedChange: (n) => t.toggleVisibility(!!n),
          children: t.id
        },
        t.id
      ))
    ] })
  ] });
}
const De = st.Root, Zw = st.Group, Oe = st.Value, Qw = Zt(
  "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
  {
    variants: {
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-8 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
), he = b.forwardRef(({ className: e, children: t, size: n, ...r }, a) => {
  const s = lt();
  return /* @__PURE__ */ d(
    st.Trigger,
    {
      className: h(Qw({ size: n, className: e })),
      ref: a,
      ...r,
      dir: s,
      children: [
        t,
        /* @__PURE__ */ o(st.Icon, { asChild: !0, children: /* @__PURE__ */ o(ue, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
he.displayName = st.Trigger.displayName;
const Aa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  st.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ o(Jn, { className: "tw-h-4 tw-w-4" })
  }
));
Aa.displayName = st.ScrollUpButton.displayName;
const Va = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  st.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ o(ue, { className: "tw-h-4 tw-w-4" })
  }
));
Va.displayName = st.ScrollDownButton.displayName;
const fe = b.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, a) => {
  const s = lt();
  return /* @__PURE__ */ o(st.Portal, { children: /* @__PURE__ */ d(
    st.Content,
    {
      ref: a,
      className: h(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ o(Aa, {}),
        /* @__PURE__ */ o(
          st.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ o("div", { dir: s, children: t })
          }
        ),
        /* @__PURE__ */ o(Va, {})
      ]
    }
  ) });
});
fe.displayName = st.Content.displayName;
const tc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  st.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
tc.displayName = st.Label.displayName;
const kt = b.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ d(
  st.Item,
  {
    ref: r,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(st.ItemIndicator, { children: /* @__PURE__ */ o(Ot, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ o(st.ItemText, { children: t })
    ]
  }
));
kt.displayName = st.Item.displayName;
const ec = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  st.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
ec.displayName = st.Separator.displayName;
function nc({ table: e }) {
  return /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ o("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ d(
        De,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ o(he, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ o(Oe, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ o(fe, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ o(kt, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ d(
        L,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ o(_s, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        L,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ o(Cs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        L,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ o(Es, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        L,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ o(Ss, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const po = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [contenteditable],
  tr:not([disabled])
`;
function rc(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function Ze(e, t) {
  const n = t ? `${po}, ${t}` : po;
  return Array.from(e.querySelectorAll(n)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && rc(r)
  );
}
const En = b.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Ze(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const c = new MutationObserver(() => {
      l();
    });
    return c.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      c.disconnect();
    };
  }, []);
  const s = (i) => {
    const { current: l } = a;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Ze(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return /* @__PURE__ */ o("div", { className: h("pr-twp tw-relative tw-w-full", { "tw-p-1": t }), children: /* @__PURE__ */ o(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
      ref: a,
      className: h(
        "tw-w-full tw-caption-bottom tw-text-sm tw-outline-none",
        // CUSTOM: Add outline-none to remove duplicate outline
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        // CUSTOM: Add focus styles
        e
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...n
    }
  ) });
});
En.displayName = "Table";
const Sn = b.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ o(
  "thead",
  {
    ref: r,
    className: h(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": t
      },
      "[&_tr]:tw-border-b",
      e
    ),
    ...n
  }
));
Sn.displayName = "TableHeader";
const Tn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", e), ...t }));
Tn.displayName = "TableBody";
const oc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
oc.displayName = "TableFooter";
function ac(e) {
  b.useEffect(() => {
    const t = e.current;
    if (!t) return;
    const n = (r) => {
      if (t.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const a = e.current ? Ze(e.current) : [], s = a.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        r.key === "Escape" && (r.preventDefault(), t.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    };
    return t.addEventListener("keydown", n), () => {
      t.removeEventListener("keydown", n);
    };
  }, [e]);
}
function sc(e, t, n) {
  let r;
  return n === "ArrowLeft" && t > 0 ? r = e[t - 1] : n === "ArrowRight" && t < e.length - 1 && (r = e[t + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ic(e, t, n) {
  let r;
  return n === "ArrowDown" && t < e.length - 1 ? r = e[t + 1] : n === "ArrowUp" && t > 0 && (r = e[t - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
const At = b.forwardRef(({ className: e, onKeyDown: t, onSelect: n, setFocusAlsoRunsSelect: r = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), ac(i);
  const l = b.useMemo(
    () => i.current ? Ze(i.current) : [],
    [i]
  ), c = b.useCallback(
    (p) => {
      const { current: f } = i;
      if (!f || !f.parentElement) return;
      const m = f.closest("table"), u = m ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Ze(m).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], g = u.indexOf(f), k = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), ic(u, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), sc(l, k, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const x = f.closest("table");
        x && x.focus();
      }
      t == null || t(p);
    },
    [i, l, t]
  ), w = b.useCallback(
    (p) => {
      r && (n == null || n(p));
    },
    [r, n]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: i,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: w,
      className: h(
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        "tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50",
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        "data-[state=selected]:tw-bg-muted",
        e
      ),
      ...a
    }
  );
});
At.displayName = "TableRow";
const Qe = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "th",
  {
    ref: n,
    className: h(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...t
  }
));
Qe.displayName = "TableHead";
const pe = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
pe.displayName = "TableCell";
const lc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
lc.displayName = "TableCaption";
function dr({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", e),
      ...t
    }
  );
}
function wc({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: w
}) {
  var R;
  const [p, f] = D([]), [m, u] = D([]), [g, k] = D({}), [x, _] = D({}), C = $(() => t ?? [], [t]), y = $o({
    data: C,
    columns: e,
    getCoreRowModel: Bo(),
    ...n && { getPaginationRowModel: Ki() },
    onSortingChange: f,
    getSortedRowModel: Lo(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Xi(),
    onColumnVisibilityChange: k,
    onRowSelectionChange: _,
    state: {
      sorting: p,
      columnFilters: m,
      columnVisibility: g,
      rowSelection: x
    }
  }), E = y.getVisibleFlatColumns();
  let I;
  return c ? I = Array.from({ length: 10 }).map((N, T) => `skeleton-row-${T}`).map((N) => /* @__PURE__ */ o(At, { children: /* @__PURE__ */ o(pe, { colSpan: E.length ?? e.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ o("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ o(dr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, N)) : ((R = y.getRowModel().rows) == null ? void 0 : R.length) > 0 ? I = y.getRowModel().rows.map((S) => /* @__PURE__ */ o(
    At,
    {
      onClick: () => i(S, y),
      "data-state": S.getIsSelected() && "selected",
      children: S.getVisibleCells().map((O) => /* @__PURE__ */ o(pe, { children: Xe(O.column.columnDef.cell, O.getContext()) }, O.id))
    },
    S.id
  )) : I = /* @__PURE__ */ o(At, { children: /* @__PURE__ */ o(pe, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ o(Ww, { table: y }),
    /* @__PURE__ */ d(En, { stickyHeader: s, children: [
      /* @__PURE__ */ o(Sn, { stickyHeader: s, children: y.getHeaderGroups().map((S) => /* @__PURE__ */ o(At, { children: S.headers.map((O) => /* @__PURE__ */ o(Qe, { children: O.isPlaceholder ? void 0 : Xe(O.column.columnDef.header, O.getContext()) }, O.id)) }, S.id)) }),
      /* @__PURE__ */ o(Tn, { children: I })
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ o(
        L,
        {
          variant: "outline",
          size: "sm",
          onClick: () => y.previousPage(),
          disabled: !y.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o(
        L,
        {
          variant: "outline",
          size: "sm",
          onClick: () => y.nextPage(),
          disabled: !y.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ o(nc, { table: y })
  ] });
}
function yp({
  id: e,
  markdown: t,
  className: n,
  anchorTarget: r,
  truncate: a
}) {
  const s = $(
    () => ({
      overrides: {
        a: {
          props: {
            target: r
          }
        }
      }
    }),
    [r]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: e,
      className: h(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ o(qi, { options: s, children: t })
    }
  );
}
const cc = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), uo = (e, t) => e[t] ?? t;
function dc({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  id: r
}) {
  const a = uo(n, "%webView_error_dump_header%"), s = uo(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(e), t && t();
  }
  return /* @__PURE__ */ d(
    "div",
    {
      id: r,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ o("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ o("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ o(L, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ o(xo, {}) })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ o("pre", { className: "tw-text-xs", children: e }) })
      ]
    }
  );
}
const Np = Object.freeze([
  ...cc,
  "%webView_error_dump_copied_message%"
]);
function kp({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  children: r,
  className: a,
  id: s
}) {
  const [i, l] = D(!1), c = () => {
    l(!0), t && t();
  };
  return /* @__PURE__ */ d(ge, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ o(be, { asChild: !0, children: r }),
    /* @__PURE__ */ d(ee, { id: s, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ o(it, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ o(
        dc,
        {
          errorDetails: e,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var pc = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(pc || {});
function _p({ id: e, label: t, groups: n }) {
  const [r, a] = D(
    Object.fromEntries(
      n.map(
        (w, p) => w.itemType === 0 ? [p, []] : void 0
      ).filter((w) => !!w)
    )
  ), [s, i] = D({}), l = (w, p) => {
    const f = !r[w][p];
    a((u) => (u[w][p] = f, { ...u }));
    const m = n[w].items[p];
    m.onUpdate(m.id, f);
  }, c = (w, p) => {
    i((m) => (m[w] = p, { ...m }));
    const f = n[w].items.find((m) => m.id === p);
    f ? f.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ o("div", { id: e, children: /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ d(L, { variant: "default", children: [
      /* @__PURE__ */ o(Ts, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      t,
      /* @__PURE__ */ o(ue, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ o(ne, { children: n.map((w, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ o(an, { children: w.label }),
      /* @__PURE__ */ o(Da, { children: w.itemType === 0 ? /* @__PURE__ */ o(at, { children: w.items.map((f, m) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
        Yt,
        {
          checked: r[p][m],
          onCheckedChange: () => l(p, m),
          children: f.label
        }
      ) }, f.id)) }) : /* @__PURE__ */ o(
        Yw,
        {
          value: s[p],
          onValueChange: (f) => c(p, f),
          children: w.items.map((f) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Ia, { value: f.id, children: f.label }) }, f.id))
        }
      ) }),
      /* @__PURE__ */ o($e, {})
    ] }, w.label)) })
  ] }) });
}
function Cp({
  id: e,
  category: t,
  downloads: n,
  languages: r,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const c = new ti("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, f) => p + f, 0)), w = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      id: e,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        t && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ o("div", { className: "tw-flex", children: /* @__PURE__ */ o("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: t }) }),
          /* @__PURE__ */ o("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ o(Rs, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ o("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c })
          ] }),
          /* @__PURE__ */ o("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ o("div", { className: "tw-flex tw-gap-2", children: r.slice(0, 3).map((p) => /* @__PURE__ */ o("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          r.length > 3 && /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => w(),
              className: "tw-text-xs tw-text-foreground tw-underline",
              children: [
                "+",
                r.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (a || i) && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ o("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            L,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ o(Ds, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ o("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            L,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ o(Os, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function uc({ id: e, versionHistory: t }) {
  const [n, r] = D(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), p = w.getUTCFullYear() - 1970, f = w.getUTCMonth(), m = w.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : f > 0 ? u = `${f.toString()} month${f === 1 ? "" : "s"} ago` : m === 0 ? u = "today" : u = `${m.toString()} day${m === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ d("div", { className: "pr-twp", id: e, children: [
    /* @__PURE__ */ o("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ o("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ d("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ o("div", { className: "tw-text-foreground", children: /* @__PURE__ */ o("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ o("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ d("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ d("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ o("div", { children: s(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => r(!n),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Ep({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: r,
  versionHistory: a,
  currentVersion: s
}) {
  const i = $(() => ei(n), [n]), c = ((w) => {
    const p = new Intl.DisplayNames(ni(), { type: "language" });
    return w.map((f) => p.of(f));
  })(r);
  return /* @__PURE__ */ o("div", { id: e, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ o(uc, { versionHistory: a }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ o("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Publisher" }),
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ o("span", { children: "Size" }),
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Version" }),
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ o("span", { children: "Languages" }),
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function mc({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: r,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: w = void 0,
  onOpenChange: p = void 0,
  isDisabled: f = !1,
  sortSelected: m = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: k = "ghost",
  id: x
}) {
  const [_, C] = D(!1), y = j(
    (T) => {
      var B;
      const V = (B = e.find((F) => F.label === T)) == null ? void 0 : B.value;
      V && n(
        t.includes(V) ? t.filter((F) => F !== V) : [...t, V]
      );
    },
    [e, t, n]
  ), E = () => c || r, I = $(() => {
    if (!m) return e;
    const T = e.filter((B) => B.starred).sort((B, F) => B.label.localeCompare(F.label)), V = e.filter((B) => !B.starred).sort((B, F) => {
      const A = t.includes(B.value), W = t.includes(F.value);
      return A && !W ? -1 : !A && W ? 1 : B.label.localeCompare(F.label);
    });
    return [...T, ...V];
  }, [e, t, m]), R = () => {
    n(e.map((T) => T.value));
  }, S = () => {
    n([]);
  }, O = w ?? _;
  return /* @__PURE__ */ o("div", { id: x, className: g, children: /* @__PURE__ */ d(ge, { open: O, onOpenChange: p ?? C, children: [
    /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ d(
      L,
      {
        variant: k,
        role: "combobox",
        "aria-expanded": O,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: f,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ o("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ o("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: E()
              }
            )
          ] }),
          /* @__PURE__ */ o(yo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(ee, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(Qt, { children: [
      /* @__PURE__ */ o(Ae, { placeholder: `Search ${r.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: R, children: s }),
        /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: S, children: i })
      ] }),
      /* @__PURE__ */ d(te, { children: [
        /* @__PURE__ */ o(on, { children: l }),
        /* @__PURE__ */ o(Bt, { children: I.map((T) => /* @__PURE__ */ d(
          zt,
          {
            value: T.label,
            onSelect: y,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Ot,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    t.includes(T.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ o(Ms, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ o("div", { className: "tw-flex-grow", children: T.label }),
              T.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw-text-end tw-text-muted-foreground", children: T.secondaryLabel })
            ]
          },
          T.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Sp({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: r,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: c,
  className: w,
  badgesPlaceholder: p,
  id: f
}) {
  return /* @__PURE__ */ d("div", { id: f, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ o(
      mc,
      {
        entries: e,
        selected: t,
        onChange: n,
        placeholder: r,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: c,
        className: w
      }
    ),
    t.length > 0 ? /* @__PURE__ */ o("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: t.map((m) => {
      var u;
      return /* @__PURE__ */ d(Te, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ o(
          L,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(t.filter((g) => g !== m)),
            children: /* @__PURE__ */ o(en, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = e.find((g) => g.value === m)) == null ? void 0 : u.label
      ] }, m);
    }) }) : /* @__PURE__ */ o(it, { children: p })
  ] });
}
const Le = b.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ o(
    "input",
    {
      type: t,
      className: h(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Le.displayName = "Input";
const hc = (e, t, n) => e === "generated" ? /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_generated%"]
] }) : e === "hidden" ? /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ o("p", { children: n }),
  " ",
  t["%footnoteEditor_callerDropdown_item_custom%"]
] });
function fc({
  callerType: e,
  updateCallerType: t,
  customCaller: n,
  updateCustomCaller: r,
  localizedStrings: a
}) {
  const s = Q(null), i = Q(null), l = Q(!1), [c, w] = D(e), [p, f] = D(n), [m, u] = D(!1);
  q(() => {
    w(e);
  }, [e]), q(() => {
    p !== n && f(n);
  }, [n]);
  const g = (x) => {
    l.current = !1, u(x), x || (c !== "custom" || p ? (t(c), r(p)) : (w(e), f(n)));
  }, k = (x) => {
    var _, C, y, E;
    x.stopPropagation(), document.activeElement === i.current && x.key === "ArrowDown" || x.key === "ArrowRight" ? ((_ = s.current) == null || _.focus(), l.current = !0) : document.activeElement === s.current && x.key === "ArrowUp" ? ((C = i.current) == null || C.focus(), l.current = !1) : document.activeElement === s.current && x.key === "ArrowLeft" && ((y = s.current) == null ? void 0 : y.selectionStart) === 0 && ((E = i.current) == null || E.focus(), l.current = !1), c === "custom" && x.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ d(ve, { open: m, onOpenChange: g, children: [
    /* @__PURE__ */ o(Vt, { children: /* @__PURE__ */ d(Kt, { children: [
      /* @__PURE__ */ o(de, { asChild: !0, children: /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ o(L, { variant: "outline", className: "tw-h-6", children: hc(e, a, n) }) }) }),
      /* @__PURE__ */ o(Pt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      ne,
      {
        className: "tw-z-[300]",
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: k,
        onMouseMove: () => {
          var x;
          l.current && ((x = s.current) == null || x.focus());
        },
        children: [
          /* @__PURE__ */ o(an, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o($e, {}),
          /* @__PURE__ */ o(
            Yt,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw-w-10 tw-text-center", children: Qn })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Yt,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw-w-10 tw-text-center", children: tr })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Yt,
            {
              ref: i,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (x) => {
                var _;
                x.stopPropagation(), l.current = !0, (_ = s.current) == null || _.focus();
              },
              onSelect: (x) => x.preventDefault(),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  Le,
                  {
                    tabIndex: 0,
                    onMouseDown: (x) => {
                      console.log("trigger"), x.stopPropagation(), w("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: p,
                    onKeyDown: (x) => {
                      x.key === "Enter" || x.key === "ArrowUp" || x.key === "ArrowDown" || x.key === "ArrowLeft" || x.key === "ArrowRight" || x.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (x) => f(x.target.value)
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
const gc = (e, t) => e === "f" ? /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ o(No, {}),
  " ",
  t["%footnoteEditor_noteType_footnote_label%"]
] }) : e === "fe" ? /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ o(ko, {}),
  " ",
  t["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ o(Is, {}),
  " ",
  t["%footnoteEditor_noteType_crossReference_label%"]
] }), bc = (e, t) => {
  if (e === "x")
    return t["%footnoteEditor_noteType_crossReference_label%"];
  let n = t["%footnoteEditor_noteType_endNote_label%"];
  return e === "f" && (n = t["%footnoteEditor_noteType_footnote_label%"]), le(t["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function vc({
  noteType: e,
  handleNoteTypeChange: t,
  localizedStrings: n
}) {
  return /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ o(Vt, { children: /* @__PURE__ */ d(Kt, { children: [
      /* @__PURE__ */ o($i, { asChild: !0, children: /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ o(
        L,
        {
          variant: "outline",
          className: "tw-h-6 disabled:tw-pointer-events-auto",
          disabled: e === "x",
          children: gc(e, n)
        }
      ) }) }),
      /* @__PURE__ */ o(Pt, { children: /* @__PURE__ */ o("p", { children: bc(e, n) }) })
    ] }) }),
    e !== "x" && /* @__PURE__ */ d(ne, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ o(an, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ o($e, {}),
      /* @__PURE__ */ d(
        Yt,
        {
          checked: e === "f",
          onCheckedChange: () => t("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ o(No, {}),
            /* @__PURE__ */ o("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Yt,
        {
          checked: e === "fe",
          onCheckedChange: () => t("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ o(ko, {}),
            /* @__PURE__ */ o("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
function Tp({
  noteOps: e,
  onSave: t,
  onClose: n,
  scrRef: r,
  noteKey: a,
  editorOptions: s,
  localizedStrings: i
}) {
  const l = Q(null), c = us(), [w, p] = D("generated"), [f, m] = D("*"), [u, g] = D("f"), k = $(
    () => ({
      ...s,
      markerMenuTrigger: s.markerMenuTrigger ?? "\\",
      hasExternalUI: !0,
      view: { ...s.view ?? Ji(), noteMode: "expanded" }
    }),
    [s]
  );
  q(() => {
    var y;
    (y = l.current) == null || y.focus();
  }), q(() => {
    var I, R;
    let y;
    const E = e == null ? void 0 : e.at(0);
    if (E && $n("note", E)) {
      const S = (I = E.insert.note) == null ? void 0 : I.caller;
      let O = "custom";
      S === Qn ? O = "generated" : S === tr ? O = "hidden" : S && m(S), p(O), g(((R = E.insert.note) == null ? void 0 : R.style) ?? "f"), E.insert.note && (E.insert.note.caller = ""), y = setTimeout(() => {
        var N;
        (N = l.current) == null || N.applyUpdate([{ delete: 1 }, E]);
      }, 0);
    }
    return () => {
      y && clearTimeout(y);
    };
  }, [e, a]);
  const x = j(() => {
    var E, I;
    const y = (I = (E = l.current) == null ? void 0 : E.getNoteOps(0)) == null ? void 0 : I.at(0);
    y && $n("note", y) && (y.insert.note && (w === "custom" ? y.insert.note.caller = f : y.insert.note.caller = w === "generated" ? Qn : tr), t([y]));
  }, [w, f, t]), _ = () => {
    var E;
    const y = (E = c.current) == null ? void 0 : E.getElementsByClassName("editor-input")[0];
    y != null && y.textContent && navigator.clipboard.writeText(y.textContent);
  };
  return /* @__PURE__ */ d("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex", children: [
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-4", children: [
        /* @__PURE__ */ o(
          vc,
          {
            noteType: u,
            handleNoteTypeChange: (y) => {
              var I, R, S;
              g(y);
              const E = (R = (I = l.current) == null ? void 0 : I.getNoteOps(0)) == null ? void 0 : R.at(0);
              E && $n("note", E) && (E.insert.note && (E.insert.note.style = y), (S = l.current) == null || S.applyUpdate([{ delete: 1 }, E]));
            },
            localizedStrings: i
          }
        ),
        /* @__PURE__ */ o(
          fc,
          {
            callerType: w,
            updateCallerType: p,
            customCaller: f,
            updateCustomCaller: m,
            localizedStrings: i
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
        /* @__PURE__ */ o(Vt, { children: /* @__PURE__ */ d(Kt, { children: [
          /* @__PURE__ */ o(de, { asChild: !0, children: /* @__PURE__ */ o(L, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ o(en, {}) }) }),
          /* @__PURE__ */ o(Pt, { children: /* @__PURE__ */ o("p", { children: i["%footnoteEditor_cancelButton_tooltip%"] }) })
        ] }) }),
        /* @__PURE__ */ o(Vt, { children: /* @__PURE__ */ d(Kt, { children: [
          /* @__PURE__ */ o(de, { asChild: !0, children: /* @__PURE__ */ o(
            L,
            {
              onClick: x,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              children: /* @__PURE__ */ o(Ot, {})
            }
          ) }),
          /* @__PURE__ */ o(Pt, { children: i["%footnoteEditor_saveButton_tooltip%"] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ d(
      "div",
      {
        ref: c,
        className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
        children: [
          /* @__PURE__ */ o(Wi, { options: k, onScrRefChange: () => {
          }, scrRef: r, ref: l }),
          /* @__PURE__ */ o("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ o(Vt, { children: /* @__PURE__ */ d(Kt, { children: [
            /* @__PURE__ */ o(de, { asChild: !0, children: /* @__PURE__ */ o(L, { onClick: _, className: "tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(xo, {}) }) }),
            /* @__PURE__ */ o(Pt, { children: /* @__PURE__ */ o("p", { children: i["%footnoteEditor_copyButton_tooltip%"] }) })
          ] }) }) })
        ]
      }
    )
  ] });
}
const Rp = Object.freeze([
  "%footnoteEditor_callerDropdown_label%",
  "%footnoteEditor_callerDropdown_item_generated%",
  "%footnoteEditor_callerDropdown_item_hidden%",
  "%footnoteEditor_callerDropdown_item_custom%",
  "%footnoteEditor_callerDropdown_tooltip%",
  "%footnoteEditor_cancelButton_tooltip%",
  "%footnoteEditor_copyButton_tooltip%",
  "%footnoteEditor_noteType_crossReference_label%",
  "%footnoteEditor_noteType_endNote_label%",
  "%footnoteEditor_noteType_footnote_label%",
  "%footnoteEditor_noteType_tooltip%",
  "%footnoteEditor_noteTypeDropdown_label%",
  "%footnoteEditor_saveButton_tooltip%"
]);
function Pa(e, t) {
  if (!t || t.length === 0) return e ?? "empty";
  const n = t.find((a) => typeof a == "string");
  if (n)
    return `key-${e ?? "unknown"}-${n.slice(0, 10)}`;
  const r = typeof t[0] == "string" ? "impossible" : t[0].marker ?? "unknown";
  return `key-${e ?? "unknown"}-${r}`;
}
function xc(e, t, n = !0, r = void 0) {
  if (!t || t.length === 0) return;
  const a = [], s = [];
  let i = [];
  return t.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, c) => {
    const w = c === s.length - 1;
    return /* @__PURE__ */ d("p", { className: "tw-mb-2", children: [
      Ar(e, l, n, !0, a),
      w && r
    ] }, Pa(e, l));
  });
}
function Ar(e, t, n = !0, r = !0, a = []) {
  if (!(!t || t.length === 0))
    return t.map((s) => {
      if (typeof s == "string") {
        const i = `${e}-text-${s.slice(0, 10)}`;
        if (r) {
          const l = h(`usfm_${e}`);
          return /* @__PURE__ */ o("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ d(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ o(Wn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ o("span", { children: s }),
              /* @__PURE__ */ o(Wn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return yc(
        s,
        Pa(`${e}\\${s.marker}`, [s]),
        n,
        [...a, e ?? "unknown"]
      );
    });
}
function yc(e, t, n, r = []) {
  const { marker: a } = e;
  return /* @__PURE__ */ d("span", { children: [
    a ? n && /* @__PURE__ */ o("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ o(
      Wn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Ar(a, e.content, n, !0, [
      ...r,
      a ?? "unknown"
    ])
  ] }, t);
}
function Nc({
  footnote: e,
  layout: t = "horizontal",
  formatCaller: n,
  showMarkers: r = !0
}) {
  const a = n ? n(e.caller) : e.caller, s = a !== e.caller;
  let i, l = e.content;
  Array.isArray(e.content) && e.content.length > 0 && typeof e.content[0] != "string" && (e.content[0].marker === "fr" || e.content[0].marker === "xo") && ([i, ...l] = e.content);
  const c = r ? /* @__PURE__ */ o("span", { className: "marker", children: `\\${e.marker} ` }) : void 0, w = r ? /* @__PURE__ */ o("span", { className: "marker", children: ` \\${e.marker}*` }) : void 0, p = /* @__PURE__ */ d(at, { children: [
    a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
    // specific class name in case styling is needed.
    /* @__PURE__ */ d("span", { className: h("note-caller", { formatted: s }), children: [
      a,
      " "
    ] }),
    i && /* @__PURE__ */ d(at, { children: [
      Ar(e.marker, [i], r, !1),
      " "
    ] })
  ] }), u = h(t === "horizontal" ? "horizontal tw-table-cell" : "vertical", r ? "marker-visible" : "");
  return /* @__PURE__ */ d(at, { children: [
    /* @__PURE__ */ d("div", { className: h("textual-note-header tw-text-nowrap tw-pr-2", u), children: [
      c,
      p
    ] }),
    /* @__PURE__ */ o("div", { className: h("textual-note-body tw-pr-0.5", u), children: l && l.length > 0 && /* @__PURE__ */ o(at, { children: xc(e.marker, l, r, w) }) })
  ] });
}
const Dp = ["%webView_footnoteList_header%"], kc = (e, t) => e[t] ?? t;
function Op({
  className: e,
  classNameForItems: t,
  footnotes: n,
  layout: r = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: c,
  onFootnoteSelected: w,
  localizedStrings: p
}) {
  const f = p ? kc(p, "%webView_footnoteList_header%") : "Footnotes", m = c ?? ri(n, void 0), u = (y, E) => {
    w == null || w(y, E, a);
  }, g = s ? n.findIndex((y) => y === s) : 0, [k, x] = D(g), _ = (y) => {
    if (n.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), x((E) => Math.min(E + 1, n.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), x((E) => Math.max(E - 1, 0));
          break;
        case "Enter":
        case " ":
          y.preventDefault(), w == null || w(n[k], k, a);
          break;
      }
  }, C = Q([]);
  return q(() => {
    var y;
    k >= 0 && k < C.current.length && ((y = C.current[k]) == null || y.focus());
  }, [k]), /* @__PURE__ */ d(at, { children: [
    r === "vertical" && /* @__PURE__ */ o("h2", { className: "tw-mb-1 tw-font-semibold", children: f }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "listbox",
        "aria-label": "Footnotes",
        tabIndex: 0,
        className: h("tw-h-full tw-overflow-y-auto", e),
        onKeyDown: _,
        children: /* @__PURE__ */ o(
          "div",
          {
            className: h(
              "tw-p-0.5 tw-pt-1",
              r === "horizontal" ? "tw-table tw-min-w-full" : "tw-flex tw-flex-col tw-gap-0.5",
              !l && "formatted-font"
            ),
            children: n.map((y, E) => {
              const I = y === s, R = `${a}-${E}`;
              return /* @__PURE__ */ d(at, { children: [
                /* @__PURE__ */ o(
                  Mr,
                  {
                    ref: (S) => {
                      C.current[E] = S;
                    },
                    role: "option",
                    "aria-selected": I,
                    "data-marker": y.marker,
                    "data-state": I ? "selected" : void 0,
                    tabIndex: -1,
                    className: h(
                      "data-[state=selected]:tw-bg-muted",
                      w && "hover:tw-bg-muted/50",
                      "tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none",
                      "focus:tw-outline-none focus-visible:tw-outline-none",
                      /* ENHANCE: After considerable fiddling, this set of styles makes a focus ring
                         that looks great in Storybook. However, the left edge of the ring is clipped in
                         P.B app. These are similar, but not identical to, the customizations made in
                         our shadcn table component.
                      */
                      "focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",
                      r === "horizontal" ? "horizontal tw-table-row" : "vertical tw-block tw-text-sm",
                      t
                    ),
                    onClick: () => u(y, E),
                    children: /* @__PURE__ */ o(
                      Nc,
                      {
                        footnote: y,
                        layout: r,
                        formatCaller: () => m(y.caller, E),
                        showMarkers: i
                      }
                    )
                  },
                  R
                ),
                E < n.length - 1 && r === "vertical" && /* @__PURE__ */ o(Re, {})
              ] });
            })
          }
        )
      }
    )
  ] });
}
function _c(e) {
  const t = [];
  let n = 0;
  const r = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = r.exec(e)) !== null; )
    a.index > n && t.push(e.substring(n, a.index)), t.push(/* @__PURE__ */ o("strong", { children: a[1] }, a.index)), n = r.lastIndex;
  return n < e.length && t.push(e.substring(n)), t.length > 0 ? t : [e];
}
function Cc({
  occurrenceData: e,
  setScriptureReference: t,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], a = n["%webView_inventory_occurrences_table_header_occurrence%"], s = $(() => {
    const i = [], l = /* @__PURE__ */ new Set();
    return e.forEach((c) => {
      const w = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      l.has(w) || (l.add(w), i.push(c));
    }), i;
  }, [e]);
  return /* @__PURE__ */ d(En, { stickyHeader: !0, children: [
    /* @__PURE__ */ o(Sn, { stickyHeader: !0, children: /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ o(Qe, { children: r }),
      /* @__PURE__ */ o(Qe, { children: a })
    ] }) }),
    /* @__PURE__ */ o(Tn, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ d(
      At,
      {
        onClick: () => {
          t(i.reference);
        },
        children: [
          /* @__PURE__ */ o(pe, { children: `${Y.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ o(pe, { children: _c(i.text) })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const Vr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  er.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ o(
      er.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ o(Ot, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Vr.displayName = er.Root.displayName;
const Rn = (e) => e === "asc" ? /* @__PURE__ */ o($s, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ o(Ls, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ o(Bs, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Mp = (e) => ({
  accessorKey: "item",
  accessorFn: (t) => t.items[0],
  header: ({ column: t }) => /* @__PURE__ */ d(L, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Rn(t.getIsSorted())
  ] })
}), Ec = (e, t) => ({
  accessorKey: `item${t}`,
  accessorFn: (n) => n.items[t],
  header: ({ column: n }) => /* @__PURE__ */ d(L, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    Rn(n.getIsSorted())
  ] })
}), Ip = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ d(L, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Rn(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), Xn = (e, t, n, r, a, s) => {
  let i = [...n];
  e.forEach((c) => {
    t === "approved" ? i.includes(c) || i.push(c) : i = i.filter((w) => w !== c);
  }), r(i);
  let l = [...a];
  e.forEach((c) => {
    t === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), s(l);
}, Ap = (e, t, n, r, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ d(L, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    e,
    Rn(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ d(Or, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ o(
        Ye,
        {
          onClick: (c) => {
            c.stopPropagation(), Xn(
              [l],
              "approved",
              t,
              n,
              r,
              a
            );
          },
          value: "approved",
          children: /* @__PURE__ */ o(As, {})
        }
      ),
      /* @__PURE__ */ o(
        Ye,
        {
          onClick: (c) => {
            c.stopPropagation(), Xn(
              [l],
              "unapproved",
              t,
              n,
              r,
              a
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ o(Vs, {})
        }
      ),
      /* @__PURE__ */ o(
        Ye,
        {
          onClick: (c) => {
            c.stopPropagation(), Xn(
              [l],
              "unknown",
              t,
              n,
              r,
              a
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ o(Ps, {})
        }
      )
    ] });
  }
}), Vp = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Pp = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, $p = (e) => {
  const t = e.match(/^\\id\s+([A-Za-z]+)/);
  return t ? t[1] : "";
}, Sc = (e, t, n) => n.includes(e) ? "unapproved" : t.includes(e) ? "approved" : "unknown", Lp = Object.freeze([
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
]), Tc = (e, t, n) => {
  let r = e;
  return t !== "all" && (r = r.filter(
    (a) => t === "approved" && a.status === "approved" || t === "unapproved" && a.status === "unapproved" || t === "unknown" && a.status === "unknown"
  )), n !== "" && (r = r.filter((a) => a.items[0].includes(n))), r;
}, Rc = (e, t, n) => {
  const r = [];
  return e.forEach((a) => {
    const s = r.find(
      (i) => _o(
        i.items,
        Vn(a.inventoryText) ? [a.inventoryText] : a.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: a.verseRef,
        text: a.verse
      });
    else {
      const i = {
        items: Vn(a.inventoryText) ? [a.inventoryText] : a.inventoryText,
        count: 1,
        status: Sc(
          Vn(a.inventoryText) ? a.inventoryText : a.inventoryText[0],
          t,
          n
        ),
        occurrences: [
          {
            reference: a.verseRef,
            text: a.verse
          }
        ]
      };
      r.push(i);
    }
  }), r;
}, Tt = (e, t) => e[t] ?? t;
function Bp({
  inventoryItems: e,
  setVerseRef: t,
  localizedStrings: n,
  additionalItemsLabels: r,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: c,
  id: w,
  areInventoryItemsLoading: p = !1
}) {
  const f = Tt(n, "%webView_inventory_all%"), m = Tt(n, "%webView_inventory_approved%"), u = Tt(n, "%webView_inventory_unapproved%"), g = Tt(n, "%webView_inventory_unknown%"), k = Tt(n, "%webView_inventory_scope_currentBook%"), x = Tt(n, "%webView_inventory_scope_chapter%"), _ = Tt(n, "%webView_inventory_scope_verse%"), C = Tt(n, "%webView_inventory_filter_text%"), y = Tt(
    n,
    "%webView_inventory_show_additional_items%"
  ), E = Tt(n, "%webView_inventory_no_results%"), [I, R] = D(!1), [S, O] = D("all"), [N, T] = D(""), [V, B] = D([]), F = $(() => {
    const P = e ?? [];
    return P.length === 0 ? [] : Rc(P, a, s);
  }, [e, a, s]), A = $(() => {
    if (I) return F;
    const P = [];
    return F.forEach((tt) => {
      const dt = tt.items[0], wt = P.find(
        (Nt) => Nt.items[0] === dt
      );
      wt ? (wt.count += tt.count, wt.occurrences = wt.occurrences.concat(tt.occurrences)) : P.push({
        items: [dt],
        count: tt.count,
        occurrences: tt.occurrences,
        status: tt.status
      });
    }), P;
  }, [I, F]), W = $(() => A.length === 0 ? [] : Tc(A, S, N), [A, S, N]), M = $(() => {
    var dt, wt;
    if (!I) return c;
    const P = (dt = r == null ? void 0 : r.tableHeaders) == null ? void 0 : dt.length;
    if (!P) return c;
    const tt = [];
    for (let Nt = 0; Nt < P; Nt++)
      tt.push(
        Ec(
          ((wt = r == null ? void 0 : r.tableHeaders) == null ? void 0 : wt[Nt]) || "Additional Item",
          Nt + 1
        )
      );
    return [...tt, ...c];
  }, [r == null ? void 0 : r.tableHeaders, c, I]);
  q(() => {
    W.length === 0 ? B([]) : W.length === 1 && B(W[0].items);
  }, [W]);
  const ot = (P, tt) => {
    tt.setRowSelection(() => {
      const dt = {};
      return dt[P.index] = !0, dt;
    }), B(P.original.items);
  }, yt = (P) => {
    if (P === "book" || P === "chapter" || P === "verse")
      l(P);
    else
      throw new Error(`Invalid scope value: ${P}`);
  }, _t = (P) => {
    if (P === "all" || P === "approved" || P === "unapproved" || P === "unknown")
      O(P);
    else
      throw new Error(`Invalid status filter value: ${P}`);
  }, bt = $(() => {
    if (A.length === 0 || V.length === 0) return [];
    const P = A.filter((tt) => _o(
      I ? tt.items : [tt.items[0]],
      V
    ));
    if (P.length > 1) throw new Error("Selected item is not unique");
    return P.length === 0 ? [] : P[0].occurrences;
  }, [V, I, A]);
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        De,
        {
          onValueChange: (P) => _t(P),
          defaultValue: S,
          children: [
            /* @__PURE__ */ o(he, { className: "tw-m-1", children: /* @__PURE__ */ o(Oe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(fe, { children: [
              /* @__PURE__ */ o(kt, { value: "all", children: f }),
              /* @__PURE__ */ o(kt, { value: "approved", children: m }),
              /* @__PURE__ */ o(kt, { value: "unapproved", children: u }),
              /* @__PURE__ */ o(kt, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(De, { onValueChange: (P) => yt(P), defaultValue: i, children: [
        /* @__PURE__ */ o(he, { className: "tw-m-1", children: /* @__PURE__ */ o(Oe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(fe, { children: [
          /* @__PURE__ */ o(kt, { value: "book", children: k }),
          /* @__PURE__ */ o(kt, { value: "chapter", children: x }),
          /* @__PURE__ */ o(kt, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ o(
        Le,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: C,
          value: N,
          onChange: (P) => {
            T(P.target.value);
          }
        }
      ),
      r && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ o(
          Vr,
          {
            className: "tw-m-1",
            checked: I,
            onCheckedChange: (P) => {
              R(P);
            }
          }
        ),
        /* @__PURE__ */ o(it, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (r == null ? void 0 : r.checkboxText) ?? y })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ o(
      wc,
      {
        columns: M,
        data: W,
        onRowClickHandler: ot,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: E
      }
    ) }),
    bt.length > 0 && /* @__PURE__ */ o("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ o(
      Cc,
      {
        occurrenceData: bt,
        setScriptureReference: t,
        localizedStrings: n
      }
    ) })
  ] });
}
const jp = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function zp({ localizedStrings: e, markerMenuItems: t }) {
  const [n, r] = D(""), a = $(() => {
    const s = n.trim().toLowerCase();
    return s ? t.filter(
      (i) => {
        var l;
        return ((l = i.marker) == null ? void 0 : l.toLowerCase().includes(s)) || i.title.toLowerCase().includes(s);
      }
    ) : t;
  }, [n, t]);
  return /* @__PURE__ */ d(Qt, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ o(
      Ae,
      {
        value: n,
        onValueChange: (s) => r(s),
        placeholder: e["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ d(te, { children: [
      /* @__PURE__ */ o(on, { children: e["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(Bt, { children: a.map((s) => /* @__PURE__ */ d(
        zt,
        {
          className: "tw-flex tw-gap-2 hover:tw-bg-accent",
          disabled: s.isDisallowed || s.isDeprecated,
          onSelect: s.action,
          children: [
            /* @__PURE__ */ o("div", { className: "tw-w-6", children: s.marker ? /* @__PURE__ */ o("span", { className: "tw-text-xs", children: s.marker }) : /* @__PURE__ */ o("div", { children: s.icon }) }),
            /* @__PURE__ */ d("div", { children: [
              /* @__PURE__ */ o("p", { className: "tw-text-sm", children: s.title }),
              s.subtitle && /* @__PURE__ */ o("p", { className: "tw-text-xs tw-text-muted-foreground", children: s.subtitle })
            ] }),
            (s.isDisallowed || s.isDeprecated) && /* @__PURE__ */ o(Xo, { className: "tw-font-sans", children: s.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
          ]
        },
        `item-${s.title}`
      )) })
    ] })
  ] });
}
const Dc = "16rem", Oc = "3rem", $a = b.createContext(void 0);
function Dn() {
  const e = b.useContext($a);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return e;
}
const La = b.forwardRef(
  ({
    defaultOpen: e = !0,
    open: t,
    onOpenChange: n,
    className: r,
    style: a,
    children: s,
    side: i = "primary",
    ...l
  }, c) => {
    const [w, p] = b.useState(e), f = t ?? w, m = b.useCallback(
      (y) => {
        const E = typeof y == "function" ? y(f) : y;
        n ? n(E) : p(E);
      },
      [n, f]
    ), u = b.useCallback(() => m((y) => !y), [m]), g = f ? "expanded" : "collapsed", _ = lt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", C = b.useMemo(
      () => ({
        state: g,
        open: f,
        setOpen: m,
        toggleSidebar: u,
        side: _
      }),
      [g, f, m, u, _]
    );
    return /* @__PURE__ */ o($a.Provider, { value: C, children: /* @__PURE__ */ o(Vt, { delayDuration: 0, children: /* @__PURE__ */ o(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Dc,
            "--sidebar-width-icon": Oc,
            ...a
          }
        ),
        className: h(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          r
        ),
        ref: c,
        ...l,
        children: s
      }
    ) }) });
  }
);
La.displayName = "SidebarProvider";
const Ba = b.forwardRef(({ variant: e = "sidebar", collapsible: t = "offcanvas", className: n, children: r, ...a }, s) => {
  const i = Dn();
  return t === "none" ? /* @__PURE__ */ o(
    "div",
    {
      className: h(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...a,
      children: r
    }
  ) : /* @__PURE__ */ d(
    "div",
    {
      ref: s,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": i.state,
      "data-collapsible": i.state === "collapsed" ? t : "",
      "data-variant": e,
      "data-side": i.side,
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: h(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            className: h(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              e === "floating" || e === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              n
            ),
            ...a,
            children: /* @__PURE__ */ o(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                children: r
              }
            )
          }
        )
      ]
    }
  );
});
Ba.displayName = "Sidebar";
const Mc = b.forwardRef(({ className: e, onClick: t, ...n }, r) => {
  const a = Dn();
  return /* @__PURE__ */ d(
    L,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: h("tw-h-7 tw-w-7", e),
      onClick: (s) => {
        t == null || t(s), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ o(js, {}) : /* @__PURE__ */ o(zs, {}),
        /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Mc.displayName = "SidebarTrigger";
const Ic = b.forwardRef(
  ({ className: e, ...t }, n) => {
    const { toggleSidebar: r } = Dn();
    return /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: r,
        title: "Toggle Sidebar",
        className: h(
          "tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex",
          "[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize",
          "[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize",
          "group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar",
          "[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2",
          "[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",
          e
        ),
        ...t
      }
    );
  }
);
Ic.displayName = "SidebarRail";
const ja = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "main",
    {
      ref: n,
      className: h(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        e
      ),
      ...t
    }
  )
);
ja.displayName = "SidebarInset";
const Ac = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Le,
  {
    ref: n,
    "data-sidebar": "input",
    className: h(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      e
    ),
    ...t
  }
));
Ac.displayName = "SidebarInput";
const Vc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: h("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
Vc.displayName = "SidebarHeader";
const Pc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: h("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
Pc.displayName = "SidebarFooter";
const $c = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Re,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", e),
    ...t
  }
));
$c.displayName = "SidebarSeparator";
const za = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: h(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        e
      ),
      ...t
    }
  )
);
za.displayName = "SidebarContent";
const pr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", e),
      ...t
    }
  )
);
pr.displayName = "SidebarGroup";
const ur = b.forwardRef(({ className: e, asChild: t = !1, ...n }, r) => /* @__PURE__ */ o(
  t ? Me : "div",
  {
    ref: r,
    "data-sidebar": "group-label",
    className: h(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      e
    ),
    ...n
  }
));
ur.displayName = "SidebarGroupLabel";
const Lc = b.forwardRef(({ className: e, asChild: t = !1, ...n }, r) => /* @__PURE__ */ o(
  t ? Me : "button",
  {
    ref: r,
    "data-sidebar": "group-action",
    className: h(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      e
    ),
    ...n
  }
));
Lc.displayName = "SidebarGroupAction";
const mr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: h("tw-w-full tw-text-sm", e),
      ...t
    }
  )
);
mr.displayName = "SidebarGroupContent";
const Fa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", e),
      ...t
    }
  )
);
Fa.displayName = "SidebarMenu";
const Ga = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: h("tw-group/menu-item tw-relative", e),
      ...t
    }
  )
);
Ga.displayName = "SidebarMenuItem";
const Bc = Zt(
  "tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
  {
    variants: {
      variant: {
        default: "hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",
        outline: "tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "tw-h-8 tw-text-sm",
        sm: "tw-h-7 tw-text-xs",
        lg: "tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Ha = b.forwardRef(
  ({
    asChild: e = !1,
    isActive: t = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const c = e ? Me : "button", { state: w } = Dn(), p = /* @__PURE__ */ o(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": t,
        className: h(Bc({ variant: n, size: r }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ d(Kt, { children: [
      /* @__PURE__ */ o(de, { asChild: !0, children: p }),
      /* @__PURE__ */ o(Pt, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : p;
  }
);
Ha.displayName = "SidebarMenuButton";
const jc = b.forwardRef(({ className: e, asChild: t = !1, showOnHover: n = !1, ...r }, a) => /* @__PURE__ */ o(
  t ? Me : "button",
  {
    ref: a,
    "data-sidebar": "menu-action",
    className: h(
      "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "tw-peer-data-[size=sm]/menu-button:top-1",
      "tw-peer-data-[size=default]/menu-button:top-1.5",
      "tw-peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:tw-hidden",
      n && "tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",
      e
    ),
    ...r
  }
));
jc.displayName = "SidebarMenuAction";
const zc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: h(
        "tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground",
        "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "tw-peer-data-[size=sm]/menu-button:top-1",
        "tw-peer-data-[size=default]/menu-button:top-1.5",
        "tw-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...t
    }
  )
);
zc.displayName = "SidebarMenuBadge";
const Fc = b.forwardRef(({ className: e, showIcon: t = !1, ...n }, r) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", e),
      ...n,
      children: [
        t && /* @__PURE__ */ o(dr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ o(
          dr,
          {
            className: "tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              {
                "--skeleton-width": a
              }
            )
          }
        )
      ]
    }
  );
});
Fc.displayName = "SidebarMenuSkeleton";
const Gc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: h(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...t
    }
  )
);
Gc.displayName = "SidebarMenuSub";
const Hc = b.forwardRef(
  ({ ...e }, t) => /* @__PURE__ */ o("li", { ref: t, ...e })
);
Hc.displayName = "SidebarMenuSubItem";
const Xc = b.forwardRef(({ asChild: e = !1, size: t = "md", isActive: n, className: r, ...a }, s) => /* @__PURE__ */ o(
  e ? Me : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": t,
    "data-active": n,
    className: h(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      t === "sm" && "tw-text-xs",
      t === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      r
    ),
    ...a
  }
));
Xc.displayName = "SidebarMenuSubButton";
function Kc({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: c
}) {
  const w = j(
    (m, u) => {
      r(m, u);
    },
    [r]
  ), p = j(
    (m) => {
      const u = n.find((g) => g.projectId === m);
      return u ? u.projectName : m;
    },
    [n]
  ), f = j(
    (m) => !a.projectId && m === a.label,
    [a]
  );
  return /* @__PURE__ */ o(
    Ba,
    {
      id: e,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ d(za, { children: [
        /* @__PURE__ */ d(pr, { children: [
          /* @__PURE__ */ o(ur, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ o(mr, { children: /* @__PURE__ */ o(Fa, { children: Object.entries(t).map(([m, u]) => /* @__PURE__ */ o(Ga, { children: /* @__PURE__ */ o(
            Ha,
            {
              onClick: () => w(m),
              isActive: f(m),
              children: /* @__PURE__ */ o("span", { className: "tw-pl-3", children: u })
            }
          ) }, m)) }) })
        ] }),
        /* @__PURE__ */ d(pr, { children: [
          /* @__PURE__ */ o(ur, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ o(mr, { className: "tw-pl-3", children: /* @__PURE__ */ o(
            ar,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((m) => m.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (m) => {
                const u = p(m);
                w(u, m);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ o(Fs, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Pr = tn(
  ({ value: e, onSearch: t, placeholder: n, isFullWidth: r, className: a, isDisabled: s = !1, id: i }, l) => {
    const c = lt();
    return /* @__PURE__ */ d("div", { id: i, className: h("tw-relative", { "tw-w-full": r }, a), children: [
      /* @__PURE__ */ o(
        go,
        {
          className: h(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ o(
        Le,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: e,
          onChange: (w) => t(w.target.value),
          disabled: s
        }
      ),
      e && /* @__PURE__ */ d(
        L,
        {
          variant: "ghost",
          size: "icon",
          className: h(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": c === "rtl" },
            { "tw-right-0": c === "ltr" }
          ),
          onClick: () => {
            t("");
          },
          children: [
            /* @__PURE__ */ o(en, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Pr.displayName = "SearchBar";
function Fp({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  children: r,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: w,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ o("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ o(
      Pr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      La,
      {
        id: e,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ o(
            Kc,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: t,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ o(ja, { className: "tw-min-w-[215px]", children: r })
        ]
      }
    )
  ] });
}
const Xt = "scrBook", Uc = "scrRef", ie = "source", Yc = "details", qc = "Scripture Reference", Jc = "Scripture Book", Xa = "Type", Wc = "Details";
function Zc(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${r.start.book} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: Xt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? qc,
      cell: (r) => {
        const a = r.row.original;
        return r.row.getIsGrouped() ? Y.bookIdToEnglishName(a.start.book) : r.row.groupingColumnId === Xt ? ke(a.start) : void 0;
      },
      getGroupingValue: (r) => Y.bookIdToNumber(r.start.book),
      sortingFn: (r, a) => Zn(r.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => ke(r.start),
      id: Uc,
      header: void 0,
      cell: (r) => {
        const a = r.row.original;
        return r.row.getIsGrouped() ? void 0 : ke(a.start);
      },
      sortingFn: (r, a) => Zn(r.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: ie,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Xa : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, a) => r.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Yc,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Wc,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const Qc = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || Zn(e.start, e.end) === 0 ? `${Pn(e.start)}+${t}` : `${Pn(e.start)}+${t}-${Pn(e.end)}+${n}`;
}, mo = (e) => `${Qc({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function Gp({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: c
}) {
  const [w, p] = D([]), [f, m] = D([{ id: Xt, desc: !1 }]), [u, g] = D({}), k = $(
    () => e.flatMap((N) => N.data.map((T) => ({
      ...T,
      source: N.source
    }))),
    [e]
  ), x = $(
    () => Zc(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [r, s, i, n]
  );
  q(() => {
    w.includes(ie) ? m([
      { id: ie, desc: !1 },
      { id: Xt, desc: !1 }
    ]) : m([{ id: Xt, desc: !1 }]);
  }, [w]);
  const _ = $o({
    data: k,
    columns: x,
    state: {
      grouping: w,
      sorting: f,
      rowSelection: u
    },
    onGroupingChange: p,
    onSortingChange: m,
    onRowSelectionChange: g,
    getExpandedRowModel: Yi(),
    getGroupedRowModel: Ui(),
    getCoreRowModel: Bo(),
    getSortedRowModel: Lo(),
    getRowId: mo,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const N = _.getSelectedRowModel().rowsById, T = Object.keys(N);
      if (T.length === 1) {
        const V = k.find((B) => mo(B) === T[0]) || void 0;
        V && l(V);
      }
    }
  }, [u, k, l, _]);
  const C = a ?? Jc, y = s ?? Xa, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [Xt] },
    { label: `Group by ${y}`, value: [ie] },
    {
      label: `Group by ${C} and ${y}`,
      value: [Xt, ie]
    },
    {
      label: `Group by ${y} and ${C}`,
      value: [ie, Xt]
    }
  ], I = (N) => {
    p(JSON.parse(N));
  }, R = (N, T) => {
    !N.getIsGrouped() && !N.getIsSelected() && N.getToggleSelectedHandler()(T);
  }, S = (N, T) => N.getIsGrouped() ? "" : h("banded-row", T % 2 === 0 ? "even" : "odd"), O = (N, T, V) => {
    if (!((N == null ? void 0 : N.length) === 0 || T.depth < V.column.getGroupedIndex())) {
      if (T.getIsGrouped())
        switch (T.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (T.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ d("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !t && /* @__PURE__ */ d(
      De,
      {
        value: JSON.stringify(w),
        onValueChange: (N) => {
          I(N);
        },
        children: [
          /* @__PURE__ */ o(he, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ o(Oe, {}) }),
          /* @__PURE__ */ o(fe, { position: "item-aligned", children: /* @__PURE__ */ o(Zw, { children: E.map((N) => /* @__PURE__ */ o(kt, { value: JSON.stringify(N.value), children: N.label }, N.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(En, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ o(Sn, { children: _.getHeaderGroups().map((N) => /* @__PURE__ */ o(At, { children: N.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ o(Qe, { colSpan: T.colSpan, className: "top-0 tw-sticky", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ o(
            L,
            {
              variant: "ghost",
              title: `Toggle grouping by ${T.column.columnDef.header}`,
              onClick: T.column.getToggleGroupingHandler(),
              type: "button",
              children: T.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Xe(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, N.id)) }),
      /* @__PURE__ */ o(Tn, { children: _.getRowModel().rows.map((N, T) => {
        const V = lt();
        return /* @__PURE__ */ o(
          At,
          {
            "data-state": N.getIsSelected() ? "selected" : "",
            className: h(S(N, T)),
            onClick: (B) => R(N, B),
            children: N.getVisibleCells().map((B) => {
              if (!(B.getIsPlaceholder() || B.column.columnDef.enableGrouping && !B.getIsGrouped() && (B.column.columnDef.id !== ie || !n)))
                return /* @__PURE__ */ o(
                  pe,
                  {
                    className: h(
                      B.column.columnDef.id,
                      "tw-p-[1px]",
                      O(w, N, B)
                    ),
                    children: B.getIsGrouped() ? /* @__PURE__ */ d(
                      L,
                      {
                        variant: "link",
                        onClick: N.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          N.getIsExpanded() && /* @__PURE__ */ o(ue, {}),
                          !N.getIsExpanded() && (V === "ltr" ? /* @__PURE__ */ o(Ce, {}) : /* @__PURE__ */ o(qn, {})),
                          " ",
                          Xe(B.column.columnDef.cell, B.getContext()),
                          " (",
                          N.subRows.length,
                          ")"
                        ]
                      }
                    ) : Xe(B.column.columnDef.cell, B.getContext())
                  },
                  B.id
                );
            })
          },
          N.id
        );
      }) })
    ] })
  ] });
}
const $r = (e, t) => e.filter((n) => {
  try {
    return He(n) === t;
  } catch {
    return !1;
  }
}), Ka = (e, t, n) => $r(e, t).every((r) => n.includes(r));
function td({
  section: e,
  availableBookIds: t,
  selectedBookIds: n,
  onToggle: r,
  localizedStrings: a
}) {
  const s = $r(t, e).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ o(
    L,
    {
      variant: "outline",
      size: "sm",
      onClick: () => r(e),
      className: h(
        Ka(t, e, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: gl(
        e,
        i,
        l,
        c,
        w
      )
    }
  );
}
const ho = 5, Kn = 6;
function ed({
  availableBookInfo: e,
  selectedBookIds: t,
  onChangeSelectedBookIds: n,
  localizedStrings: r,
  localizedBookNames: a
}) {
  const s = r["%webView_book_selector_books_selected%"], i = r["%webView_book_selector_select_books%"], l = r["%webView_book_selector_search_books%"], c = r["%webView_book_selector_select_all%"], w = r["%webView_book_selector_clear_all%"], p = r["%webView_book_selector_no_book_found%"], f = r["%webView_book_selector_more%"], { otLong: m, ntLong: u, dcLong: g, extraLong: k } = {
    otLong: r == null ? void 0 : r["%scripture_section_ot_long%"],
    ntLong: r == null ? void 0 : r["%scripture_section_nt_long%"],
    dcLong: r == null ? void 0 : r["%scripture_section_dc_long%"],
    extraLong: r == null ? void 0 : r["%scripture_section_extra_long%"]
  }, [x, _] = D(!1), [C, y] = D(""), E = Q(void 0), I = Q(!1);
  if (e.length !== Y.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const R = $(() => Y.allBookIds.filter(
    (A, W) => e[W] === "1" && !Y.isObsolete(Y.bookIdToNumber(A))
  ), [e]), S = $(() => {
    if (!C.trim()) {
      const M = {
        [H.OT]: [],
        [H.NT]: [],
        [H.DC]: [],
        [H.Extra]: []
      };
      return R.forEach((ot) => {
        const yt = He(ot);
        M[yt].push(ot);
      }), M;
    }
    const A = R.filter(
      (M) => _r(M, C, a)
    ), W = {
      [H.OT]: [],
      [H.NT]: [],
      [H.DC]: [],
      [H.Extra]: []
    };
    return A.forEach((M) => {
      const ot = He(M);
      W[ot].push(M);
    }), W;
  }, [R, C, a]), O = j(
    (A, W = !1) => {
      if (!W || !E.current) {
        n(
          t.includes(A) ? t.filter((P) => P !== A) : [...t, A]
        ), E.current = A;
        return;
      }
      const M = R.findIndex((P) => P === E.current), ot = R.findIndex((P) => P === A);
      if (M === -1 || ot === -1) return;
      const [yt, _t] = [
        Math.min(M, ot),
        Math.max(M, ot)
      ], bt = R.slice(yt, _t + 1).map((P) => P);
      n(
        t.includes(A) ? t.filter((P) => !bt.includes(P)) : [.../* @__PURE__ */ new Set([...t, ...bt])]
      );
    },
    [t, n, R]
  ), N = (A) => {
    O(A, I.current), I.current = !1;
  }, T = (A, W) => {
    A.preventDefault(), O(W, A.shiftKey);
  }, V = j(
    (A) => {
      const W = $r(R, A).map((M) => M);
      n(
        Ka(R, A, t) ? t.filter((M) => !W.includes(M)) : [.../* @__PURE__ */ new Set([...t, ...W])]
      );
    },
    [t, n, R]
  ), B = () => {
    n(R.map((A) => A));
  }, F = () => {
    n([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ o("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(H).map((A) => /* @__PURE__ */ o(
      td,
      {
        section: A,
        availableBookIds: R,
        selectedBookIds: t,
        onToggle: V,
        localizedStrings: r
      },
      A
    )) }),
    /* @__PURE__ */ d(
      ge,
      {
        open: x,
        onOpenChange: (A) => {
          _(A), A || y("");
        },
        children: [
          /* @__PURE__ */ o(be, { asChild: !0, children: /* @__PURE__ */ d(
            L,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                t.length > 0 ? `${s}: ${t.length}` : i,
                /* @__PURE__ */ o(yo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ o(ee, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
            Qt,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (I.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ o(
                  Ae,
                  {
                    placeholder: l,
                    value: C,
                    onValueChange: y
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: B, children: c }),
                  /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: F, children: w })
                ] }),
                /* @__PURE__ */ d(te, { children: [
                  /* @__PURE__ */ o(on, { children: p }),
                  Object.values(H).map((A, W) => {
                    const M = S[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ d(fo, { children: [
                        /* @__PURE__ */ o(
                          Bt,
                          {
                            heading: Zo(A, m, u, g, k),
                            children: M.map((ot) => /* @__PURE__ */ o(
                              ta,
                              {
                                bookId: ot,
                                isSelected: t.includes(ot),
                                onSelect: () => N(ot),
                                onMouseDown: (yt) => T(yt, ot),
                                section: He(ot),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: or(ot, a),
                                className: "tw-flex tw-items-center"
                              },
                              ot
                            ))
                          }
                        ),
                        W < Object.values(H).length - 1 && /* @__PURE__ */ o(Ho, {})
                      ] }, A);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    t.length > 0 && /* @__PURE__ */ d("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      t.slice(
        0,
        t.length === Kn ? Kn : ho
      ).map((A) => /* @__PURE__ */ o(Te, { className: "hover:tw-bg-secondary", variant: "secondary", children: _e(A, a) }, A)),
      t.length > Kn && /* @__PURE__ */ o(
        Te,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${t.length - ho} ${f}`
        }
      )
    ] })
  ] });
}
const Hp = Object.freeze([
  "%webView_scope_selector_selected_text%",
  "%webView_scope_selector_current_verse%",
  "%webView_scope_selector_current_chapter%",
  "%webView_scope_selector_current_book%",
  "%webView_scope_selector_choose_books%",
  "%webView_scope_selector_scope%",
  "%webView_scope_selector_select_books%",
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
]), oe = (e, t) => e[t] ?? t;
function Xp({
  scope: e,
  availableScopes: t,
  onScopeChange: n,
  availableBookInfo: r,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: c
}) {
  const w = oe(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = oe(
    i,
    "%webView_scope_selector_current_verse%"
  ), f = oe(
    i,
    "%webView_scope_selector_current_chapter%"
  ), m = oe(i, "%webView_scope_selector_current_book%"), u = oe(i, "%webView_scope_selector_choose_books%"), g = oe(i, "%webView_scope_selector_scope%"), k = oe(i, "%webView_scope_selector_select_books%"), x = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: m, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], _ = t ? x.filter((C) => t.includes(C.value)) : x;
  return /* @__PURE__ */ d("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ o(it, { children: g }),
      /* @__PURE__ */ o(
        Cr,
        {
          value: e,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: _.map(({ value: C, label: y, id: E }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(gn, { className: "tw-me-2", value: C, id: E }),
            /* @__PURE__ */ o(it, { htmlFor: E, children: y })
          ] }, E))
        }
      )
    ] }),
    e === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ o(it, { children: k }),
      /* @__PURE__ */ o(
        ed,
        {
          availableBookInfo: r,
          selectedBookIds: a,
          onChangeSelectedBookIds: s,
          localizedStrings: i,
          localizedBookNames: l
        }
      )
    ] })
  ] });
}
const Un = {
  [U("undefined")]: "Ø",
  [U(0)]: "A",
  [U(1)]: "B",
  [U(2)]: "C",
  [U(3)]: "D",
  [U(4)]: "E",
  [U(5)]: "F",
  [U(6)]: "G",
  [U(7)]: "H",
  [U(8)]: "I",
  [U(9)]: "J",
  [U(10)]: "K",
  [U(11)]: "L",
  [U(12)]: "M",
  [U(13)]: "N",
  [U(14)]: "O",
  [U(15)]: "P",
  [U(16)]: "Q",
  [U(17)]: "R",
  [U(18)]: "S",
  [U(19)]: "T",
  [U(20)]: "U",
  [U(21)]: "V",
  [U(22)]: "W",
  [U(23)]: "X",
  [U(24)]: "Y",
  [U(25)]: "Z"
};
function Kp({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: r = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Un,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([w, p]) => [
          w,
          w === p && w in Un ? Un[w] : p
        ]
      )
    )
  }, c = lt();
  return /* @__PURE__ */ d(
    De,
    {
      value: `${t}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ o(he, { size: a, className: h("pr-twp tw-w-auto", s), children: /* @__PURE__ */ o(
          Oe,
          {
            placeholder: l[U(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ o(
          fe,
          {
            id: i,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: e.map((w) => /* @__PURE__ */ o(kt, { value: `${w}`, children: l[U(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Up({ children: e }) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw-grid", children: e });
}
function Yp({
  primary: e,
  secondary: t,
  children: n,
  isLoading: r = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ o("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ o("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ o("div", { children: n })
  ] });
}
function qp({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ o("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ o(Re, {}) : ""
  ] });
}
function Ua(e, t) {
  var n;
  return (n = Object.entries(e).find(
    ([, r]) => "menuItem" in r && r.menuItem === t
  )) == null ? void 0 : n[0];
}
function vn({ icon: e, menuLabel: t, leading: n }) {
  return e ? /* @__PURE__ */ o(
    "img",
    {
      className: h("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: e,
      alt: `${n ? "Leading" : "Trailing"} icon for ${t}`
    }
  ) : void 0;
}
const Ya = (e, t, n, r) => n ? Object.entries(e).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => t.filter((l) => l.group === s).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ d(Kt, { children: [
  /* @__PURE__ */ o(de, { asChild: !0, children: "command" in l ? /* @__PURE__ */ d(
    bn,
    {
      onClick: () => {
        r(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ o(vn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ o(vn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ d(Uw, { children: [
    /* @__PURE__ */ o(Oa, { children: l.label }),
    /* @__PURE__ */ o(Kw, { children: /* @__PURE__ */ o(Ma, { children: Ya(
      e,
      t,
      Ua(e, l.id),
      r
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ o(Pt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function hr({
  onSelectMenuItem: e,
  menuData: t,
  tabLabel: n,
  icon: r,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ d(ve, { variant: s, children: [
    /* @__PURE__ */ o(Pe, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ o(L, { variant: i, size: "icon", children: r ?? /* @__PURE__ */ o(Gs, {}) }) }),
    /* @__PURE__ */ o(ne, { align: "start", className: "tw-z-[250]", children: Object.entries(t.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, p) => /* @__PURE__ */ d(fo, { children: [
      /* @__PURE__ */ o(Da, { children: /* @__PURE__ */ o(Vt, { children: Ya(t.groups, t.items, c, e) }) }),
      w < p.length - 1 && /* @__PURE__ */ o($e, {})
    ] }, c)) })
  ] });
}
const qa = b.forwardRef(
  ({ id: e, className: t, children: n }, r) => /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      className: `tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,
      id: e,
      children: n
    }
  )
);
function Jp({
  onSelectProjectMenuItem: e,
  onSelectViewInfoMenuItem: t,
  projectMenuData: n,
  tabViewMenuData: r,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: c,
  menuButtonIcon: w
}) {
  return /* @__PURE__ */ d(qa, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ o(
      hr,
      {
        onSelectMenuItem: e,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ o(Hs, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ o("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    l && /* @__PURE__ */ o("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      r && /* @__PURE__ */ o(
        hr,
        {
          onSelectMenuItem: t,
          menuData: r,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ o(Xs, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Wp({
  onSelectProjectMenuItem: e,
  projectMenuData: t,
  id: n,
  className: r,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ o(qa, { className: "tw-pointer-events-none", id: n, children: t && /* @__PURE__ */ o(
    hr,
    {
      onSelectMenuItem: e,
      menuData: t,
      tabLabel: "Project",
      icon: a,
      className: `tw-pointer-events-auto tw-shadow-lg ${r}`,
      buttonVariant: "outline"
    }
  ) });
}
const Ja = b.forwardRef(({ className: e, ...t }, n) => {
  const r = lt();
  return /* @__PURE__ */ o(
    gt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
      ...t,
      dir: r
    }
  );
});
Ja.displayName = gt.List.displayName;
const Wa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Wa.displayName = gt.List.displayName;
const nd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.Trigger,
  {
    ref: n,
    ...t,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), Za = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.Content,
  {
    ref: n,
    className: h(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Za.displayName = gt.Content.displayName;
function Zp({
  tabList: e,
  searchValue: t,
  onSearch: n,
  searchPlaceholder: r,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ d("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ d("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ o("h1", { children: a }) : "",
      /* @__PURE__ */ o(
        Pr,
        {
          className: s,
          value: t,
          onSearch: n,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ d(Ja, { children: [
      /* @__PURE__ */ o(Wa, { children: e.map((l) => /* @__PURE__ */ o(nd, { value: l.value, children: l.value }, l.key)) }),
      e.map((l) => /* @__PURE__ */ o(Za, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function rd({ ...e }) {
  return /* @__PURE__ */ o(nt.Menu, { ...e });
}
function od({ ...e }) {
  return /* @__PURE__ */ o(nt.Sub, { "data-slot": "menubar-sub", ...e });
}
const Qa = b.forwardRef(({ className: e, variant: t = "default", ...n }, r) => {
  const a = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(Ir.Provider, { value: a, children: /* @__PURE__ */ o(
    nt.Root,
    {
      ref: r,
      className: h(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        e
      ),
      ...n
    }
  ) });
});
Qa.displayName = nt.Root.displayName;
const ts = b.forwardRef(({ className: e, ...t }, n) => {
  const r = St();
  return /* @__PURE__ */ o(
    nt.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Ft({ variant: r.variant, className: e })
        // CUSTOM use context to add variants
      ),
      ...t
    }
  );
});
ts.displayName = nt.Trigger.displayName;
const es = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => {
  const s = St();
  return /* @__PURE__ */ d(
    nt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        t && "tw-pl-8",
        Ft({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ o(Ce, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
es.displayName = nt.SubTrigger.displayName;
const ns = b.forwardRef(({ className: e, ...t }, n) => {
  const r = St();
  return /* @__PURE__ */ o(
    nt.SubContent,
    {
      ref: n,
      className: h(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": r.variant === "muted"
        },
        e
      ),
      ...t
    }
  );
});
ns.displayName = nt.SubContent.displayName;
const rs = b.forwardRef(({ className: e, align: t = "start", alignOffset: n = -4, sideOffset: r = 8, ...a }, s) => {
  const i = St();
  return /* @__PURE__ */ o(nt.Portal, { children: /* @__PURE__ */ o(
    nt.Content,
    {
      ref: s,
      align: t,
      alignOffset: n,
      sideOffset: r,
      className: h(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": i.variant === "muted"
        },
        e
      ),
      ...a
    }
  ) });
});
rs.displayName = nt.Content.displayName;
const os = b.forwardRef(({ className: e, inset: t, ...n }, r) => {
  const a = St();
  return /* @__PURE__ */ o(
    nt.Item,
    {
      ref: r,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        Ft({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n
    }
  );
});
os.displayName = nt.Item.displayName;
const ad = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => {
  const s = St();
  return /* @__PURE__ */ d(
    nt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Ft({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(nt.ItemIndicator, { children: /* @__PURE__ */ o(Ot, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
ad.displayName = nt.CheckboxItem.displayName;
const sd = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = St();
  return /* @__PURE__ */ d(
    nt.RadioItem,
    {
      ref: r,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Ft({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(nt.ItemIndicator, { children: /* @__PURE__ */ o(yn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
sd.displayName = nt.RadioItem.displayName;
const id = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  nt.Label,
  {
    ref: r,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
id.displayName = nt.Label.displayName;
const as = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  nt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
as.displayName = nt.Separator.displayName;
const Fe = (e, t) => {
  setTimeout(() => {
    t.forEach((n) => {
      var r;
      (r = e.current) == null || r.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, ss = (e, t, n, r) => {
  if (!n) return;
  const a = Object.entries(e).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = t.filter((w) => w.group === s).sort((w, p) => w.order - p.order).map((w) => /* @__PURE__ */ d(Kt, { children: [
      /* @__PURE__ */ o(de, { asChild: !0, children: "command" in w ? /* @__PURE__ */ d(
        os,
        {
          onClick: () => {
            r(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ o(vn, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ o(vn, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ d(od, { children: [
        /* @__PURE__ */ o(es, { children: w.label }),
        /* @__PURE__ */ o(ns, { children: ss(
          e,
          t,
          Ua(e, w.id),
          r
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ o(Pt, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && i < a.length - 1 && c.push(/* @__PURE__ */ o(as, {}, `separator-${s}`)), c;
  });
};
function ld({
  menuData: e,
  onSelectMenuItem: t,
  onOpenChange: n,
  variant: r
}) {
  const a = Q(void 0), s = Q(void 0), i = Q(void 0), l = Q(void 0), c = Q(void 0), w = (p) => {
    switch (p) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return l;
      case "platform.help":
        return c;
      default:
        return;
    }
  };
  if (Zi(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, f) => {
    var g, k, x, _;
    p.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        Fe(s, [m]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Fe(s, [m, u]);
        break;
      case "alt+l":
        (k = i.current) == null || k.focus(), Fe(i, [m, u]);
        break;
      case "alt+n":
        (x = l.current) == null || x.focus(), Fe(l, [m, u]);
        break;
      case "alt+h":
        (_ = c.current) == null || _.focus(), Fe(c, [m, u]);
        break;
    }
  }), q(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const k = g.target.getAttribute("data-state");
          n(k === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      p.observe(u, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!e)
    return /* @__PURE__ */ o(Qa, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: r, children: Object.entries(e.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, f]) => typeof p == "boolean" || typeof f == "boolean" ? 0 : p.order - f.order).map(([p, f]) => /* @__PURE__ */ d(rd, { children: [
      /* @__PURE__ */ o(ts, { ref: w(p), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ o(
        rs,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ o(Vt, { children: ss(e.groups, e.items, p, t) })
        }
      )
    ] }, p)) });
}
function Qp(e) {
  switch (e) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function tu({
  menuData: e,
  onOpenChange: t,
  onSelectMenuItem: n,
  className: r,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: w = "default"
}) {
  const p = Q(void 0);
  return /* @__PURE__ */ o(
    "div",
    {
      className: h("tw-border tw-px-4 tw-text-foreground", r),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ o("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  e && /* @__PURE__ */ o(
                    ld,
                    {
                      menuData: e,
                      onOpenChange: t,
                      onSelectMenuItem: n,
                      variant: w
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ o(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ o("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ o(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: l
              }
            ) })
          ]
        }
      )
    }
  );
}
const wd = (e, t) => e[t] ?? t;
function eu({
  knownUiLanguages: e,
  primaryLanguage: t = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: r,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: c
}) {
  const w = wd(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, f] = D(!1), m = (g) => {
    a && a(g), r && r([g, ...n.filter((k) => k !== g)]), s && n.find((k) => k === g) && s([...n.filter((k) => k !== g)]), f(!1);
  }, u = (g, k) => {
    var _, C, y, E, I, R;
    const x = k !== g ? ((C = (_ = e[g]) == null ? void 0 : _.uiNames) == null ? void 0 : C[k]) ?? ((E = (y = e[g]) == null ? void 0 : y.uiNames) == null ? void 0 : E.en) : void 0;
    return x ? `${(I = e[g]) == null ? void 0 : I.autonym} (${x})` : (R = e[g]) == null ? void 0 : R.autonym;
  };
  return /* @__PURE__ */ d("div", { id: c, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ d(
      De,
      {
        name: "uiLanguage",
        value: t,
        onValueChange: m,
        open: p,
        onOpenChange: (g) => f(g),
        children: [
          /* @__PURE__ */ o(he, { children: /* @__PURE__ */ o(Oe, {}) }),
          /* @__PURE__ */ o(
            fe,
            {
              className: "tw-z-[250]",
              children: Object.keys(e).map((g) => /* @__PURE__ */ o(kt, { value: g, children: u(g, t) }, g))
            }
          )
        ]
      }
    ),
    t !== "en" && /* @__PURE__ */ o("div", { className: "tw-pt-3", children: /* @__PURE__ */ o(it, { className: "tw-font-normal tw-text-muted-foreground", children: le(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, t)).join(", ") : e.en.autonym
    }) }) })
  ] });
}
function cd({ item: e, createLabel: t, createComplexLabel: n }) {
  return t ? /* @__PURE__ */ o(it, { children: t(e) }) : n ? /* @__PURE__ */ o(it, { children: n(e) }) : /* @__PURE__ */ o(it, { children: e });
}
function nu({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ o("div", { id: e, className: t, children: n.map((l) => /* @__PURE__ */ d("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ o(
      Vr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ o(
      cd,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function ru({
  cardKey: e,
  isSelected: t,
  onSelect: n,
  isDenied: r,
  isHidden: a = !1,
  className: s,
  children: i,
  dropdownContent: l,
  additionalSelectedContent: c,
  accentColor: w
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (f) => {
        (f.key === "Enter" || f.key === " ") && (f.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": t,
      className: h(
        "tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": r && !t },
        { "tw-bg-accent": t },
        { "tw-bg-transparent": !t },
        s
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ o("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            t && l && /* @__PURE__ */ d(ve, { children: [
              /* @__PURE__ */ o(Pe, { className: h(w && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ o(L, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(vo, {}) }) }),
              /* @__PURE__ */ o(ne, { align: "end", children: l })
            ] })
          ] }),
          t && c && /* @__PURE__ */ o("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: c })
        ] }),
        w && /* @__PURE__ */ o(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`
          }
        )
      ]
    },
    e
  );
}
const dd = tn(({ className: e, ...t }, n) => /* @__PURE__ */ o(Ks, { size: 35, className: h("tw-animate-spin", e), ...t, ref: n }));
dd.displayName = "Spinner";
function ou({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: w,
  value: p,
  onChange: f,
  onFocus: m,
  onBlur: u
}) {
  return /* @__PURE__ */ d("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ o(
      it,
      {
        htmlFor: e,
        className: h({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ o(
      Le,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: h(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: p,
        onChange: f,
        onFocus: m,
        onBlur: u
      }
    ),
    /* @__PURE__ */ o("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const pd = Zt(
  // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can use
  // images (or svgs from file) as icons
  // Implemented by TJ Couch
  // Approved by Alex Mercado
  // 20 February 2025
  "tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-background tw-text-foreground",
        destructive: (
          // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can
          // use images (or svgs from file) as icons
          // Implemented by TJ Couch
          // Approved by Alex Mercado
          // 20 February 2025
          "tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), ud = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ o(
  "div",
  {
    ref: r,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      pd({ variant: t }),
      e
    ),
    ...n
  }
));
ud.displayName = "Alert";
const md = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d(
    "h5",
    {
      ref: n,
      className: h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
md.displayName = "AlertTitle";
const hd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
hd.displayName = "AlertDescription";
const au = rt.Root, su = rt.Trigger, iu = rt.Group, lu = rt.Portal, wu = rt.Sub, cu = rt.RadioGroup, fd = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => /* @__PURE__ */ d(
  rt.SubTrigger,
  {
    ref: a,
    className: h(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      t && "tw-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ o(Ce, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
fd.displayName = rt.SubTrigger.displayName;
const gd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  rt.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
gd.displayName = rt.SubContent.displayName;
const bd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(rt.Portal, { children: /* @__PURE__ */ o(
  rt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
bd.displayName = rt.Content.displayName;
const vd = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  rt.Item,
  {
    ref: r,
    className: h(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
vd.displayName = rt.Item.displayName;
const xd = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => /* @__PURE__ */ d(
  rt.CheckboxItem,
  {
    ref: a,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(Ot, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
xd.displayName = rt.CheckboxItem.displayName;
const yd = b.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ d(
  rt.RadioItem,
  {
    ref: r,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(yn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
yd.displayName = rt.RadioItem.displayName;
const Nd = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  rt.Label,
  {
    ref: r,
    className: h(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
Nd.displayName = rt.Label.displayName;
const kd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  rt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
kd.displayName = rt.Separator.displayName;
function _d({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
_d.displayName = "ContextMenuShortcut";
const is = b.createContext({
  direction: "bottom"
});
function Cd({
  shouldScaleBackground: e = !0,
  direction: t = "bottom",
  ...n
}) {
  const r = b.useMemo(() => ({ direction: t }), [t]);
  return /* @__PURE__ */ o(is.Provider, { value: r, children: /* @__PURE__ */ o(
    Et.Root,
    {
      shouldScaleBackground: e,
      direction: t,
      ...n
    }
  ) });
}
Cd.displayName = "Drawer";
const du = Et.Trigger, Ed = Et.Portal, pu = Et.Close, ls = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Et.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", e),
    ...t
  }
));
ls.displayName = Et.Overlay.displayName;
const Sd = b.forwardRef(({ className: e, children: t, hideDrawerHandle: n = !1, ...r }, a) => {
  const { direction: s = "bottom" } = b.useContext(is), i = {
    bottom: "tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",
    top: "tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",
    left: "tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",
    right: "tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"
  }, l = {
    bottom: "tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    top: "tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    left: "tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",
    right: "tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"
  };
  return /* @__PURE__ */ d(Ed, { children: [
    /* @__PURE__ */ o(ls, {}),
    /* @__PURE__ */ d(
      Et.Content,
      {
        ref: a,
        className: h(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          i[s],
          e
        ),
        ...r,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ o("div", { className: l[s] }),
          /* @__PURE__ */ o("div", { className: "tw-flex tw-flex-col", children: t }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ o("div", { className: l[s] })
        ]
      }
    )
  ] });
});
Sd.displayName = "DrawerContent";
function Td({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", e),
      ...t
    }
  );
}
Td.displayName = "DrawerHeader";
function Rd({ className: e, ...t }) {
  return /* @__PURE__ */ o("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", e), ...t });
}
Rd.displayName = "DrawerFooter";
const Dd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Et.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Dd.displayName = Et.Title.displayName;
const Od = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Et.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Od.displayName = Et.Description.displayName;
const Md = b.forwardRef(({ className: e, value: t, ...n }, r) => /* @__PURE__ */ o(
  nr.Root,
  {
    ref: r,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      e
    ),
    ...n,
    children: /* @__PURE__ */ o(
      nr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (t || 0)}%)` }
      }
    )
  }
));
Md.displayName = nr.Root.displayName;
function uu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ o(
    vr.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        e
      ),
      ...t
    }
  );
}
const mu = vr.Panel;
function hu({
  withHandle: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ o(
    vr.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        t
      ),
      ...n,
      children: e && /* @__PURE__ */ o("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ o(Us, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function fu({ ...e }) {
  return /* @__PURE__ */ o(
    Qi,
    {
      className: "tw-toaster tw-group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...e
    }
  );
}
const Id = b.forwardRef(({ className: e, ...t }, n) => {
  const r = lt();
  return /* @__PURE__ */ d(
    Ge.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        e
      ),
      ...t,
      dir: r,
      children: [
        /* @__PURE__ */ o(Ge.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ o(Ge.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ o(Ge.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Id.displayName = Ge.Root.displayName;
const Ad = b.forwardRef(({ className: e, ...t }, n) => {
  const r = lt();
  return /* @__PURE__ */ o(
    rr.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        e
      ),
      ...t,
      ref: n,
      children: /* @__PURE__ */ o(
        rr.Thumb,
        {
          className: h(
            "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",
            {
              "data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0": r === "ltr"
            },
            {
              "data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0": r === "rtl"
            }
          )
        }
      )
    }
  );
});
Ad.displayName = rr.Root.displayName;
const gu = gt.Root, Vd = b.forwardRef(({ className: e, ...t }, n) => {
  const r = lt();
  return /* @__PURE__ */ o(
    gt.List,
    {
      ref: n,
      className: h(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        e
      ),
      ...t,
      dir: r
    }
  );
});
Vd.displayName = gt.List.displayName;
const Pd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
Pd.displayName = gt.Trigger.displayName;
const $d = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
$d.displayName = gt.Content.displayName;
const Ld = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "textarea",
    {
      className: h(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        e
      ),
      ref: n,
      ...t
    }
  )
);
Ld.displayName = "Textarea";
const bu = (e, t) => {
  q(() => {
    if (!e) return () => {
    };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
};
function Bd(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const jd = (e, t, n = {}) => {
  const r = Q(t);
  r.current = t;
  const a = Q(n);
  a.current = Bd(a.current);
  const [s, i] = D(() => r.current), [l, c] = D(!0);
  return q(() => {
    let w = !0;
    return c(!!e), (async () => {
      if (e) {
        const p = await e();
        w && (i(() => p), c(!1));
      }
    })(), () => {
      w = !1, a.current.preserveValue || i(() => r.current);
    };
  }, [e]), [s, l];
}, Yn = () => !1, vu = (e, t) => {
  const [n] = jd(
    j(async () => {
      if (!e) return Yn;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Yn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    n !== Yn && n();
  }, [n]);
};
function zd(e, t = "top") {
  if (!e || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(a, r) : n.appendChild(a);
}
zd(`*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*:where(.pr-twp,.pr-twp *),
::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html:where(.pr-twp,.pr-twp *),
:host:where(.pr-twp,.pr-twp *) {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */ /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body:where(.pr-twp,.pr-twp *) {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr:where(.pr-twp,.pr-twp *) {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]):where(.pr-twp,.pr-twp *) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *) {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a:where(.pr-twp,.pr-twp *) {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b:where(.pr-twp,.pr-twp *),
strong:where(.pr-twp,.pr-twp *) {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code:where(.pr-twp,.pr-twp *),
kbd:where(.pr-twp,.pr-twp *),
samp:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small:where(.pr-twp,.pr-twp *) {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub:where(.pr-twp,.pr-twp *),
sup:where(.pr-twp,.pr-twp *) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub:where(.pr-twp,.pr-twp *) {
  bottom: -0.25em;
}

sup:where(.pr-twp,.pr-twp *) {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table:where(.pr-twp,.pr-twp *) {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button:where(.pr-twp,.pr-twp *),
input:where(.pr-twp,.pr-twp *),
optgroup:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *),
textarea:where(.pr-twp,.pr-twp *) {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *) {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button:where(.pr-twp,.pr-twp *),
input:where([type='button']):where(.pr-twp,.pr-twp *),
input:where([type='reset']):where(.pr-twp,.pr-twp *),
input:where([type='submit']):where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring:where(.pr-twp,.pr-twp *) {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid:where(.pr-twp,.pr-twp *) {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress:where(.pr-twp,.pr-twp *) {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button:where(.pr-twp,.pr-twp *),
::-webkit-outer-spin-button:where(.pr-twp,.pr-twp *) {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search']:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary:where(.pr-twp,.pr-twp *) {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote:where(.pr-twp,.pr-twp *),
dl:where(.pr-twp,.pr-twp *),
dd:where(.pr-twp,.pr-twp *),
h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *),
hr:where(.pr-twp,.pr-twp *),
figure:where(.pr-twp,.pr-twp *),
p:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  margin: 0;
}

fieldset:where(.pr-twp,.pr-twp *) {
  margin: 0;
  padding: 0;
}

legend:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

ol:where(.pr-twp,.pr-twp *),
ul:where(.pr-twp,.pr-twp *),
menu:where(.pr-twp,.pr-twp *) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea:where(.pr-twp,.pr-twp *) {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder:where(.pr-twp,.pr-twp *),
textarea::placeholder:where(.pr-twp,.pr-twp *) {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button:where(.pr-twp,.pr-twp *),
[role="button"]:where(.pr-twp,.pr-twp *) {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled:where(.pr-twp,.pr-twp *) {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img:where(.pr-twp,.pr-twp *),
svg:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *),
canvas:where(.pr-twp,.pr-twp *),
audio:where(.pr-twp,.pr-twp *),
iframe:where(.pr-twp,.pr-twp *),
embed:where(.pr-twp,.pr-twp *),
object:where(.pr-twp,.pr-twp *) {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *) {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
  display: none;
}
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using \`hsl(var(--variableName))\` or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  /* ["Slate" base theme by shadcn/ui](https://ui.shadcn.com/docs/theming#slate) */
  :root {
    --background: 0 0% 100%; /* white */
    --foreground: 222.2 84% 4.9%; /* slate-950 */
    --card: 0 0% 100%; /* white */
    --card-foreground: 222.2 84% 4.9%; /* slate-950 */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* slate-950 */
    --primary: 222.2 47.4% 11.2%; /* slate-900 */
    --primary-foreground: 210 40% 98%; /* slate-50 */
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%; /* slate-500 */
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* slate-950 */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-primary: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-primary-foreground: 210 40% 98%; /* slate-50 */
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* slate-950 */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* slate-950 */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* slate-950 */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* slate-950 */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%; /* slate-800 */
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%; /* slate-800 */
    --muted-foreground: 215 20.2% 65.1%; /* slate-400 */
    --accent: 217.2 32.6% 17.5%; /* slate-800 */
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%; /* slate-300 */

    --sidebar-background: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-accent-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-border: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-ring: 212.7 26.8% 83.9%; /* slate-300 */
  }

  /* Palette built in https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74 based on "Caffeine" theme*/
  .pr-twp,
  .pr-twp * {
  border-color: hsl(var(--border));
  outline-color: hsl(var(--ring) / 0.5);
}

  /**
    * disabled because tslint does not like it, but it is the selector that's needed
    */
  /* stylelint-disable-next-line selector-no-qualifying-type */
  body.pr-twp {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "0o201C""0o201D""0o2018""0o2019";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: hsl(var(--foreground));
  --tw-prose-headings: hsl(var(--foreground));
  --tw-prose-lead: hsl(var(--muted-foreground));
  --tw-prose-links: hsl(var(--primary));
  --tw-prose-bold: hsl(var(--foreground));
  --tw-prose-counters: hsl(var(--muted-foreground));
  --tw-prose-bullets: hsl(var(--muted-foreground));
  --tw-prose-hr: hsl(var(--border));
  --tw-prose-quotes: hsl(var(--foreground));
  --tw-prose-quote-borders: hsl(var(--border));
  --tw-prose-captions: hsl(var(--muted-foreground));
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: hsl(var(--foreground));
  --tw-prose-pre-code: hsl(var(--muted-foreground));
  --tw-prose-pre-bg: hsl(var(--muted));
  --tw-prose-th-borders: hsl(var(--border));
  --tw-prose-td-borders: hsl(var(--border));
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-prose-sm {
  font-size: 0.875rem;
  line-height: 1.7142857;
}
.tw-prose-sm :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  line-height: 1.5555556;
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.tw-prose-sm :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
  padding-inline-start: 1.1111111em;
}
.tw-prose-sm :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 2.1428571em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
.tw-prose-sm :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.4285714em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
.tw-prose-sm :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  margin-top: 1.5555556em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.tw-prose-sm :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.4285714em;
  margin-bottom: 0.5714286em;
  line-height: 1.4285714;
}
.tw-prose-sm :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  border-radius: 0.3125rem;
  padding-top: 0.1428571em;
  padding-inline-end: 0.3571429em;
  padding-bottom: 0.1428571em;
  padding-inline-start: 0.3571429em;
}
.tw-prose-sm :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
}
.tw-prose-sm :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.9em;
}
.tw-prose-sm :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8888889em;
}
.tw-prose-sm :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.6666667;
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  border-radius: 0.25rem;
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  margin-bottom: 0.2857143em;
}
.tw-prose-sm :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2.8571429em;
  margin-bottom: 2.8571429em;
}
.tw-prose-sm :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.5;
}
.tw-prose-sm :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.3333333;
  margin-top: 0.6666667em;
}
.tw-prose-sm :where(.tw-prose-sm > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(.tw-prose-sm > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-pointer-events-auto {
  pointer-events: auto;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw--left-\\[1px\\] {
  left: -1px;
}
.tw--right-1 {
  right: -0.25rem;
}
.tw--top-\\[1px\\] {
  top: -1px;
}
.tw-bottom-0 {
  bottom: 0px;
}
.tw-left-0 {
  left: 0px;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-4 {
  left: 1rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-2 {
  inset-inline-start: 0.5rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-50 {
  z-index: 50;
}
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-z-\\[300\\] {
  z-index: 300;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-m-0 {
  margin: 0px;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-0 {
  margin-left: 0px;
  margin-right: 0px;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.tw-mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2\\.5 {
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
}
.tw-my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-24 {
  margin-bottom: 6rem;
}
.tw-mb-4 {
  margin-bottom: 1rem;
}
.tw-me-1 {
  margin-inline-end: 0.25rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-4 {
  margin-left: 1rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-1 {
  margin-right: 0.25rem;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-mr-24 {
  margin-right: 6rem;
}
.tw-mr-4 {
  margin-right: 1rem;
}
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-24 {
  margin-top: 6rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-6 {
  margin-top: 1.5rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-table {
  display: table;
}
.tw-table-cell {
  display: table-cell;
}
.tw-table-row {
  display: table-row;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-size-4 {
  width: 1rem;
  height: 1rem;
}
.tw-h-1 {
  height: 0.25rem;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-32 {
  height: 8rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-40 {
  height: 10rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-64 {
  height: 16rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[300px\\] {
  height: 300px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[calc\\(100\\%-2px\\)\\] {
  height: calc(100% - 2px);
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-auto {
  height: auto;
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-10 {
  max-height: 2.5rem;
}
.tw-max-h-5 {
  max-height: 1.25rem;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-11 {
  min-height: 2.75rem;
}
.tw-min-h-\\[80px\\] {
  min-height: 80px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-12 {
  width: 3rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-24 {
  width: 6rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-32 {
  width: 8rem;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-4\\/5 {
  width: 80%;
}
.tw-w-4\\/6 {
  width: 66.666667%;
}
.tw-w-48 {
  width: 12rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-5\\/6 {
  width: 83.333333%;
}
.tw-w-56 {
  width: 14rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-60 {
  width: 15rem;
}
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-80 {
  width: 20rem;
}
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[180px\\] {
  width: 180px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[250px\\] {
  width: 250px;
}
.tw-w-\\[280px\\] {
  width: 280px;
}
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
}
.tw-w-\\[500px\\] {
  width: 500px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[600px\\] {
  width: 600px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-\\[calc\\(100\\%-2px\\)\\] {
  width: calc(100% - 2px);
}
.tw-w-auto {
  width: auto;
}
.tw-w-fit {
  width: fit-content;
}
.tw-w-full {
  width: 100%;
}
.tw-w-px {
  width: 1px;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-16 {
  min-width: 4rem;
}
.tw-min-w-36 {
  min-width: 9rem;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-80 {
  min-width: 20rem;
}
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[140px\\] {
  min-width: 140px;
}
.tw-min-w-\\[215px\\] {
  min-width: 215px;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-min-w-full {
  min-width: 100%;
}
.tw-max-w-2xl {
  max-width: 42rem;
}
.tw-max-w-3xl {
  max-width: 48rem;
}
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-6xl {
  max-width: 72rem;
}
.tw-max-w-96 {
  max-width: 24rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-full {
  max-width: 100%;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-md {
  max-width: 28rem;
}
.tw-max-w-none {
  max-width: none;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink {
  flex-shrink: 1;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-grow-\\[2\\] {
  flex-grow: 2;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw-border-collapse {
  border-collapse: collapse;
}
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-ew-resize {
  cursor: ew-resize;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-resize {
  resize: both;
}
.tw-scroll-m-20 {
  scroll-margin: 5rem;
}
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-outside {
  list-style-position: outside;
}
.\\!tw-list-\\[lower-alpha\\] {
  list-style-type: lower-alpha !important;
}
.\\!tw-list-\\[lower-roman\\] {
  list-style-type: lower-roman !important;
}
.\\!tw-list-\\[upper-alpha\\] {
  list-style-type: upper-alpha !important;
}
.\\!tw-list-\\[upper-roman\\] {
  list-style-type: upper-roman !important;
}
.\\!tw-list-decimal {
  list-style-type: decimal !important;
}
.\\!tw-list-disc {
  list-style-type: disc !important;
}
.tw-list-decimal {
  list-style-type: decimal;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-list-none {
  list-style-type: none;
}
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.tw-grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.tw-grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-row-reverse {
  flex-direction: row-reverse;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-content-center {
  align-content: center;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-end {
  align-items: flex-end;
}
.tw-items-center {
  align-items: center;
}
.tw-items-baseline {
  align-items: baseline;
}
.tw-items-stretch {
  align-items: stretch;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-0\\.5 {
  gap: 0.125rem;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-5 {
  gap: 1.25rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-\\[12px\\] {
  gap: 12px;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
}
.tw-divide-x > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--tw-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
}
.tw-divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-clip {
  overflow: clip;
}
.tw-overflow-visible {
  overflow: visible;
}
.tw-overflow-scroll {
  overflow: scroll;
}
.tw-overflow-x-auto {
  overflow-x: auto;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-text-clip {
  text-overflow: clip;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded {
  border-radius: 0.25rem;
}
.tw-rounded-2xl {
  border-radius: 1rem;
}
.tw-rounded-\\[6px\\] {
  border-radius: 6px;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-xl {
  border-radius: 0.75rem;
}
.tw-rounded-b-\\[10px\\] {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-l-4 {
  border-left-width: 4px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-none {
  border-style: none;
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-border {
  border-color: hsl(var(--border));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-muted-foreground {
  border-color: hsl(var(--muted-foreground));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-300 {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity, 1));
}
.tw-border-red-400 {
  --tw-border-opacity: 1;
  border-color: rgb(248 113 113 / var(--tw-border-opacity, 1));
}
.tw-border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-ring {
  border-color: hsl(var(--ring));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-slate-300 {
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-yellow-400 {
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity, 1));
}
.tw-border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
}
.tw-border-s-amber-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(253 230 138 / var(--tw-border-opacity, 1));
}
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.\\!tw-bg-destructive\\/50 {
  background-color: hsl(var(--destructive) / 0.5) !important;
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-orange-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-fill-current {
  fill: currentColor;
}
.tw-fill-destructive {
  fill: hsl(var(--destructive));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-0\\.5 {
  padding: 0.125rem;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[10px\\] {
  padding: 10px;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.\\!tw-pr-10 {
  padding-right: 2.5rem !important;
}
.tw-pb-0 {
  padding-bottom: 0px;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pe-1 {
  padding-inline-end: 0.25rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
}
.tw-pl-2 {
  padding-left: 0.5rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-6 {
  padding-left: 1.5rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-0 {
  padding-right: 0px;
}
.tw-pr-0\\.5 {
  padding-right: 0.125rem;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
}
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-1 {
  padding-top: 0.25rem;
}
.tw-pt-2 {
  padding-top: 0.5rem;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-6 {
  padding-top: 1.5rem;
}
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-extrabold {
  font-weight: 800;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-italic {
  font-style: italic;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-loose {
  line-height: 2;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-leading-tight {
  line-height: 1.25;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-blue-400 {
  --tw-text-opacity: 1;
  color: rgb(96 165 250 / var(--tw-text-opacity, 1));
}
.tw-text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
.tw-text-green-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity, 1));
}
.tw-text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-muted-foreground\\/50 {
  color: hsl(var(--muted-foreground) / 0.5);
}
.tw-text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity, 1));
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-purple-900 {
  --tw-text-opacity: 1;
  color: rgb(88 28 135 / var(--tw-text-opacity, 1));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.tw-text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-line-through {
  text-decoration-line: line-through;
}
.tw-decoration-destructive {
  text-decoration-color: hsl(var(--destructive));
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-100 {
  opacity: 1;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-primary {
  --tw-ring-color: hsl(var(--primary));
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-2 {
  --tw-ring-offset-width: 2px;
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-ease-linear {
  transition-timing-function: linear;
}
@keyframes enter {

  from {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
  }
}
@keyframes exit {

  to {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
  }
}
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-fade-in-80 {
  --tw-enter-opacity: 0.8;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
}
.tw-\\@container\\/toolbar {
  container-type: inline-size;
  container-name: toolbar;
}
.\\[--lexical-indent-base-value\\:40px\\] {
  --lexical-indent-base-value: 40px;
}

/*
 * WARNING: These themes are also represented in paranext-core/src/shared/data/themes.data.json!
 * Please update in both locations
*/
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */
/* #endregion */

/* Note that the following region is from shadcn/ui's styles
 * https://ui.shadcn.com/docs/installation/manual#configure-styles but is scoped down to .pr-twp
 * because this is just a component library and should not apply its styles to the entire page.
 *
 * There is now a section in this library's README.md that explains how to apply these styles to the
 * entire page if desired.
 *
 * The template has the original shadcn/ui styles because it intentionally applies the styles to the
 * entire page. The same is true for Platform.Bible - see \`app.component.scss\`
 */
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css but with the difference of being scoped to .pr-twp here */
.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}
.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}
.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}
.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}
.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}
.before\\:tw-absolute::before {
  content: var(--tw-content);
  position: absolute;
}
.before\\:tw-left-0::before {
  content: var(--tw-content);
  left: 0px;
}
.before\\:tw-top-0\\.5::before {
  content: var(--tw-content);
  top: 0.125rem;
}
.before\\:tw-block::before {
  content: var(--tw-content);
  display: block;
}
.before\\:tw-hidden::before {
  content: var(--tw-content);
  display: none;
}
.before\\:tw-h-4::before {
  content: var(--tw-content);
  height: 1rem;
}
.before\\:tw-w-4::before {
  content: var(--tw-content);
  width: 1rem;
}
.before\\:tw-cursor-pointer::before {
  content: var(--tw-content);
  cursor: pointer;
}
.before\\:tw-rounded::before {
  content: var(--tw-content);
  border-radius: 0.25rem;
}
.before\\:tw-border::before {
  content: var(--tw-content);
  border-width: 1px;
}
.before\\:tw-border-primary::before {
  content: var(--tw-content);
  border-color: hsl(var(--primary));
}
.before\\:tw-bg-primary::before {
  content: var(--tw-content);
  background-color: hsl(var(--primary));
}
.before\\:tw-bg-cover::before {
  content: var(--tw-content);
  background-size: cover;
}
.before\\:tw-bg-no-repeat::before {
  content: var(--tw-content);
  background-repeat: no-repeat;
}
.before\\:tw-content-\\[\\"\\"\\]::before {
  --tw-content: "";
  content: var(--tw-content);
}
.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}
.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}
.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}
.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}
.after\\:tw-left-\\[7px\\]::after {
  content: var(--tw-content);
  left: 7px;
}
.after\\:tw-right-\\[7px\\]::after {
  content: var(--tw-content);
  right: 7px;
}
.after\\:tw-top-\\[6px\\]::after {
  content: var(--tw-content);
  top: 6px;
}
.after\\:tw-block::after {
  content: var(--tw-content);
  display: block;
}
.after\\:tw-hidden::after {
  content: var(--tw-content);
  display: none;
}
.after\\:tw-h-0\\.5::after {
  content: var(--tw-content);
  height: 0.125rem;
}
.after\\:tw-h-\\[6px\\]::after {
  content: var(--tw-content);
  height: 6px;
}
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw-w-\\[3px\\]::after {
  content: var(--tw-content);
  width: 3px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-rotate-45::after {
  content: var(--tw-content);
  --tw-rotate: 45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-cursor-pointer::after {
  content: var(--tw-content);
  cursor: pointer;
}
.after\\:tw-border-b-2::after {
  content: var(--tw-content);
  border-bottom-width: 2px;
}
.after\\:tw-border-l-0::after {
  content: var(--tw-content);
  border-left-width: 0px;
}
.after\\:tw-border-r-2::after {
  content: var(--tw-content);
  border-right-width: 2px;
}
.after\\:tw-border-t-0::after {
  content: var(--tw-content);
  border-top-width: 0px;
}
.after\\:tw-border-solid::after {
  content: var(--tw-content);
  border-style: solid;
}
.after\\:tw-border-white::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}
.after\\:tw-bg-muted::after {
  content: var(--tw-content);
  background-color: hsl(var(--muted));
}
.after\\:tw-content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}
.first\\:tw-mt-0:first-child {
  margin-top: 0px;
}
.even\\:tw-bg-muted:nth-child(even) {
  background-color: hsl(var(--muted));
}
.hover\\:tw-cursor-pointer:hover {
  cursor: pointer;
}
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:tw-bg-blue-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:tw-bg-input:hover {
  background-color: hsl(var(--input));
}
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}
.hover\\:tw-bg-primary\\/70:hover {
  background-color: hsl(var(--primary) / 0.7);
}
.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}
.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:tw-bg-secondary:hover {
  background-color: hsl(var(--secondary));
}
.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}
.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}
.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:tw-text-primary-foreground:hover {
  color: hsl(var(--primary-foreground));
}
.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-opacity-80:hover {
  opacity: 0.8;
}
.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:tw-shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}
.focus\\:tw-relative:focus {
  position: relative;
}
.focus\\:tw-z-10:focus {
  z-index: 10;
}
.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:tw-bg-muted:focus {
  background-color: hsl(var(--muted));
}
.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:tw-text-foreground:focus {
  color: hsl(var(--foreground));
}
.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:tw-ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus\\:tw-ring-offset-background:focus {
  --tw-ring-offset-color: hsl(var(--background));
}
.focus-visible\\:tw-relative:focus-visible {
  position: relative;
}
.focus-visible\\:tw-z-10:focus-visible {
  z-index: 10;
}
.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:tw-ring-1:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}
.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.focus-visible\\:tw-ring-offset-1:focus-visible {
  --tw-ring-offset-width: 1px;
}
.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}
.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}
.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
}
.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:tw-pointer-events-auto:disabled {
  pointer-events: auto;
}
.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}
.has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:tw-gap-2:has(>[data-slot=button-group]) {
  gap: 0.5rem;
}
.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}
.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}
.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[orientation\\=vertical\\]\\:tw-h-auto[data-orientation="vertical"] {
  height: auto;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-h-px[data-panel-group-direction="vertical"] {
  height: 1px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-w-full[data-panel-group-direction="vertical"] {
  width: 100%;
}
.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-flex-col[data-panel-group-direction="vertical"] {
  flex-direction: column;
}
.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-muted[data-state="open"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}
.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}
.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-accent-foreground[data-state="open"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-foreground[data-state="open"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}
.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-left-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  left: 0px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-h-1[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  height: 0.25rem;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-w-full[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  width: 100%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw--translate-y-1\\/2[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-translate-x-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--right-4 {
  right: -1rem;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-left-0 {
  left: 0px;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw-border-r {
  border-right-width: 1px;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-border-l {
  border-left-width: 1px;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}
.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
}
@container (min-width: 24rem) {

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
}
@media (min-width: 640px) {

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-text-left {
    text-align: left;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}
@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\\:tw-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
@media (min-width: 1024px) {

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\\:tw-text-5xl {
    font-size: 3rem;
    line-height: 1;
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
@media (prefers-color-scheme: dark) {

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-l-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-t-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-l-0>*:not(:first-child) {
  border-left-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-t-0>*:not(:first-child) {
  border-top-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-b-none>*:not(:last-child) {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-r-none>*:not(:last-child) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-relative:focus-visible>* {
  position: relative;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-z-10:focus-visible>* {
  z-index: 10;
}
.has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:tw-rounded-r-md>[data-slot=select-trigger]:last-of-type:has(select[aria-hidden=true]:last-child) {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}
.\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:tw-w-fit>[data-slot=select-trigger]:not([class*=w-]) {
  width: fit-content;
}
.\\[\\&\\>img\\+div\\]\\:tw-translate-y-\\[-3px\\]>img+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>img\\]\\:tw-absolute>img {
  position: absolute;
}
.\\[\\&\\>img\\]\\:tw-left-4>img {
  left: 1rem;
}
.\\[\\&\\>img\\]\\:tw-top-4>img {
  top: 1rem;
}
.\\[\\&\\>img\\]\\:tw-text-destructive>img {
  color: hsl(var(--destructive));
}
.\\[\\&\\>img\\]\\:tw-text-foreground>img {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\~\\*\\]\\:tw-pl-7>img~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>input\\]\\:tw-flex-1>input {
  flex: 1 1 0%;
}
.\\[\\&\\>li\\]\\:tw-mt-2>li {
  margin-top: 0.5rem;
}
.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}
.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&\\[align\\=center\\]\\]\\:tw-text-center[align=center] {
  text-align: center;
}
.\\[\\&\\[align\\=right\\]\\]\\:tw-text-right[align=right] {
  text-align: right;
}
.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:tw-rotate-90[data-panel-group-direction=vertical]>div {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:tw-size-4 svg:not([class*=size-]) {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-pointer-events-none svg {
  pointer-events: none;
}
.\\[\\&_svg\\]\\:tw-size-4 svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-shrink-0 svg {
  flex-shrink: 0;
}
.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}
[data-side=primary][data-collapsible=offcanvas] .\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}
[data-side=primary][data-state=collapsed] .\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary][data-collapsible=offcanvas] .\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}
[data-side=secondary][data-state=collapsed] .\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
   shorter. */
.footnote-editor .editor-input {
  min-height: 75px;
}

.footnote-editor .typeahead-popover {
  z-index: 300;
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
`, "after-all");
export {
  ud as Alert,
  hd as AlertDescription,
  md as AlertTitle,
  Ta as Avatar,
  Ra as AvatarFallback,
  Xw as AvatarImage,
  fp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  gp as BOOK_SELECTOR_STRING_KEYS,
  Te as Badge,
  hp as BookChapterControl,
  El as BookSelectionMode,
  bp as BookSelector,
  L as Button,
  vp as COMMENT_LIST_STRING_KEYS,
  Mr as Card,
  Sa as CardContent,
  Gw as CardDescription,
  Hw as CardFooter,
  zw as CardHeader,
  Fw as CardTitle,
  Cl as ChapterRangeSelector,
  Vr as Checkbox,
  nu as Checklist,
  ar as ComboBox,
  Qt as Command,
  on as CommandEmpty,
  Bt as CommandGroup,
  Ae as CommandInput,
  zt as CommandItem,
  te as CommandList,
  xp as CommentList,
  au as ContextMenu,
  xd as ContextMenuCheckboxItem,
  bd as ContextMenuContent,
  iu as ContextMenuGroup,
  vd as ContextMenuItem,
  Nd as ContextMenuLabel,
  lu as ContextMenuPortal,
  cu as ContextMenuRadioGroup,
  yd as ContextMenuRadioItem,
  kd as ContextMenuSeparator,
  _d as ContextMenuShortcut,
  wu as ContextMenuSub,
  gd as ContextMenuSubContent,
  fd as ContextMenuSubTrigger,
  su as ContextMenuTrigger,
  wc as DataTable,
  Cd as Drawer,
  pu as DrawerClose,
  Sd as DrawerContent,
  Od as DrawerDescription,
  Rd as DrawerFooter,
  Td as DrawerHeader,
  ls as DrawerOverlay,
  Ed as DrawerPortal,
  Dd as DrawerTitle,
  du as DrawerTrigger,
  ve as DropdownMenu,
  Yt as DropdownMenuCheckboxItem,
  ne as DropdownMenuContent,
  Da as DropdownMenuGroup,
  bn as DropdownMenuItem,
  pc as DropdownMenuItemType,
  an as DropdownMenuLabel,
  Kw as DropdownMenuPortal,
  Yw as DropdownMenuRadioGroup,
  Ia as DropdownMenuRadioItem,
  $e as DropdownMenuSeparator,
  qw as DropdownMenuShortcut,
  Uw as DropdownMenuSub,
  Ma as DropdownMenuSubContent,
  Oa as DropdownMenuSubTrigger,
  Pe as DropdownMenuTrigger,
  cc as ERROR_DUMP_STRING_KEYS,
  Np as ERROR_POPOVER_STRING_KEYS,
  dc as ErrorDump,
  kp as ErrorPopover,
  Rp as FOOTNOTE_EDITOR_STRING_KEYS,
  Dp as FOOTNOTE_LIST_STRING_KEYS,
  Sp as Filter,
  _p as FilterDropdown,
  Ep as Footer,
  Tp as FootnoteEditor,
  Nc as FootnoteItem,
  Op as FootnoteList,
  Lp as INVENTORY_STRING_KEYS,
  Le as Input,
  Bp as Inventory,
  it as Label,
  jp as MARKER_MENU_STRING_KEYS,
  yp as MarkdownRenderer,
  zp as MarkerMenu,
  Cp as MoreInfo,
  mc as MultiSelectComboBox,
  Zp as NavigationContentSearch,
  ge as Popover,
  up as PopoverAnchor,
  ee as PopoverContent,
  be as PopoverTrigger,
  Md as Progress,
  Cr as RadioGroup,
  gn as RadioGroupItem,
  vl as RecentSearches,
  hu as ResizableHandle,
  mu as ResizablePanel,
  uu as ResizablePanelGroup,
  ru as ResultsCard,
  Hp as SCOPE_SELECTOR_STRING_KEYS,
  Xp as ScopeSelector,
  Gp as ScriptureResultsViewer,
  Kp as ScrollGroupSelector,
  Pr as SearchBar,
  De as Select,
  fe as SelectContent,
  Zw as SelectGroup,
  kt as SelectItem,
  tc as SelectLabel,
  Va as SelectScrollDownButton,
  Aa as SelectScrollUpButton,
  ec as SelectSeparator,
  he as SelectTrigger,
  Oe as SelectValue,
  Re as Separator,
  Up as SettingsList,
  qp as SettingsListHeader,
  Yp as SettingsListItem,
  Kc as SettingsSidebar,
  Fp as SettingsSidebarContentSearch,
  Ba as Sidebar,
  za as SidebarContent,
  Pc as SidebarFooter,
  pr as SidebarGroup,
  Lc as SidebarGroupAction,
  mr as SidebarGroupContent,
  ur as SidebarGroupLabel,
  Vc as SidebarHeader,
  Ac as SidebarInput,
  ja as SidebarInset,
  Fa as SidebarMenu,
  jc as SidebarMenuAction,
  zc as SidebarMenuBadge,
  Ha as SidebarMenuButton,
  Ga as SidebarMenuItem,
  Fc as SidebarMenuSkeleton,
  Gc as SidebarMenuSub,
  Xc as SidebarMenuSubButton,
  Hc as SidebarMenuSubItem,
  La as SidebarProvider,
  Ic as SidebarRail,
  $c as SidebarSeparator,
  Mc as SidebarTrigger,
  dr as Skeleton,
  Id as Slider,
  fu as Sonner,
  dd as Spinner,
  Ad as Switch,
  hr as TabDropdownMenu,
  Wp as TabFloatingMenu,
  Jp as TabToolbar,
  En as Table,
  Tn as TableBody,
  lc as TableCaption,
  pe as TableCell,
  oc as TableFooter,
  Qe as TableHead,
  Sn as TableHeader,
  At as TableRow,
  gu as Tabs,
  $d as TabsContent,
  Vd as TabsList,
  Pd as TabsTrigger,
  ou as TextField,
  Ld as Textarea,
  Or as ToggleGroup,
  Ye as ToggleGroupItem,
  tu as Toolbar,
  Kt as Tooltip,
  Pt as TooltipContent,
  Vt as TooltipProvider,
  de as TooltipTrigger,
  eu as UiLanguageSelector,
  Ja as VerticalTabs,
  Za as VerticalTabsContent,
  Wa as VerticalTabsList,
  nd as VerticalTabsTrigger,
  jw as badgeVariants,
  bl as buttonVariants,
  h as cn,
  $p as getBookIdFromUSFM,
  Vp as getLinesFromUSFM,
  Pp as getNumberFromUSFM,
  Sc as getStatusForItem,
  Qp as getToolbarOSReservedSpaceClassName,
  Ip as inventoryCountColumn,
  Mp as inventoryItemColumn,
  Ap as inventoryStatusColumn,
  Qw as selectTriggerVariants,
  Nu as sonner,
  bu as useEvent,
  vu as useEventAsync,
  Rl as useListbox,
  jd as usePromise,
  mp as useRecentSearches,
  Dn as useSidebar
};
//# sourceMappingURL=index.js.map
