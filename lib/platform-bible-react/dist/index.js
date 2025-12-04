var is = Object.defineProperty;
var ls = (e, t, n) => t in e ? is(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pt = (e, t, n) => ls(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as o, jsxs as p, Fragment as at } from "react/jsx-runtime";
import b, { forwardRef as We, useRef as rt, useMemo as B, useState as V, useCallback as j, useLayoutEffect as Vt, createContext as mn, useContext as lr, useEffect as W, Component as ws, createElement as Ir, Suspense as cs, createRef as ds, Fragment as io } from "react";
import { Command as ft } from "cmdk";
import { X as Ze, Search as lo, Check as Rt, Clock as Mr, ChevronsLeft as Ar, ChevronsRight as Vr, ChevronLeft as jn, ChevronRight as be, ArrowLeft as ps, ArrowRight as us, Circle as hn, ChevronDown as se, BoldIcon as ms, ItalicIcon as hs, UnderlineIcon as fs, StrikethroughIcon as gs, Pencil as bs, Trash2 as vs, ArrowUp as wo, MoreHorizontal as co, ChevronUp as Fn, AtSign as xs, FilterIcon as ys, ArrowLeftIcon as Ns, ChevronLeftIcon as ks, ChevronRightIcon as _s, ArrowRightIcon as Cs, Copy as po, Filter as Es, User as Ss, Link as Ts, CircleHelp as Rs, ChevronsUpDown as uo, Star as Ds, FunctionSquare as mo, SquareSigma as ho, SquareX as Os, AlertCircle as Gn, CircleCheckIcon as Is, CircleXIcon as Ms, CircleHelpIcon as As, ArrowUpIcon as Vs, ArrowDownIcon as $s, ArrowUpDownIcon as Ps, PanelLeft as Ls, PanelRight as Bs, ScrollText as zs, MenuIcon as js, Menu as Fs, EllipsisVertical as Gs, LoaderCircle as Hs, GripVertical as Xs } from "lucide-react";
import { clsx as Ks } from "clsx";
import { extendTailwindMerge as Us } from "tailwind-merge";
import * as Nt from "@radix-ui/react-dialog";
import { includes as rn, Section as G, getChaptersForBook as Ys, formatScrRef as he, getSectionForBook as ze, formatRelativeDate as qs, formatReplacementString as fe, sanitizeHtml as Js, parseParatextHtml as $r, hasCustomParatextTags as Ws, NumberFormat as Zs, formatBytes as Qs, getCurrentLocale as ti, getFormatCallerFunction as ei, deepEqual as fo, isString as En, compareScrRefs as Hn, scrRefToBBBCCCVVV as Sn, getLocalizeKeyForScrollGroupId as Y } from "platform-bible-utils";
import { Slot as _e } from "@radix-ui/react-slot";
import { cva as qt } from "class-variance-authority";
import * as ve from "@radix-ui/react-popover";
import * as go from "@radix-ui/react-label";
import * as Xe from "@radix-ui/react-radio-group";
import { createEditor as bo, $getRoot as Xt, $createParagraphNode as fn, $getSelection as $t, HISTORY_MERGE_TAG as wr, ParagraphNode as vo, TextNode as xo, $isTokenOrSegmented as ni, $getCharacterOffsets as ri, $cloneWithPropertiesEphemeral as oi, $findMatchingParent as ai, $isElementNode as ne, CLEAR_EDITOR_COMMAND as yo, COMMAND_PRIORITY_EDITOR as No, $isRangeSelection as Ke, shallowMergeConfig as si, defineExtension as Pt, safeCast as Qe, RootNode as ii, LineBreakNode as li, TabNode as wi, $isEditorState as ci, createCommand as di, CLICK_COMMAND as pi, isDOMNode as ui, $getNodeFromDOMNode as mi, $isNodeSelection as hi, $createNodeSelection as fi, $setSelection as gi, COMMAND_PRIORITY_LOW as bi, DecoratorNode as vi, $create as xi, $getNodeByKey as yi, INDENT_CONTENT_COMMAND as Pr, COMMAND_PRIORITY_CRITICAL as cr, KEY_TAB_COMMAND as Ni, $createRangeSelection as ki, $normalizeSelection__EXPERIMENTAL as _i, OUTDENT_CONTENT_COMMAND as Ci, INSERT_TAB_COMMAND as Ei, $isBlockElementNode as wn, $isDecoratorNode as Si, $isParagraphNode as Ti, $isTextNode as cn, SELECTION_CHANGE_COMMAND as ko, FORMAT_TEXT_COMMAND as Ri, getRegisteredNode as Di, isHTMLElement as Oi, isDocumentFragment as Lr, isDOMDocumentNode as Ii, ArtificialNode__DO_NOT_USE as _o, $createLineBreakNode as Co, $isRootOrShadowRoot as Mi, isBlockDomNode as Br, isInlineDomNode as zr, $insertNodes as Ai } from "lexical";
import * as tn from "@radix-ui/react-tooltip";
import { TooltipTrigger as Vi } from "@radix-ui/react-tooltip";
import { HeadingNode as $i, QuoteNode as Pi, registerRichText as Li } from "@lexical/rich-text";
import { flushSync as Bi, createPortal as zi } from "react-dom";
import { $isTableSelection as ji } from "@lexical/table";
import * as gn from "@radix-ui/react-toggle-group";
import * as Eo from "@radix-ui/react-toggle";
import { createHeadlessEditor as So } from "@lexical/headless";
import * as To from "@radix-ui/react-separator";
import * as Ce from "@radix-ui/react-avatar";
import * as tt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Fi } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Ro, getFilteredRowModel as Gi, getSortedRowModel as Do, getPaginationRowModel as Hi, getCoreRowModel as Oo, flexRender as je, getGroupedRowModel as Xi, getExpandedRowModel as Ki } from "@tanstack/react-table";
import * as ot from "@radix-ui/react-select";
import Ui from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Xn, HIDDEN_NOTE_CALLER as Kn, getDefaultViewOptions as Yi, isInsertEmbedOpOfType as Tn, Editorial as qi } from "@eten-tech-foundation/platform-editor";
import * as Un from "@radix-ui/react-checkbox";
import * as gt from "@radix-ui/react-tabs";
import * as et from "@radix-ui/react-menubar";
import { useHotkeys as Ji } from "react-hotkeys-hook";
import * as nt from "@radix-ui/react-context-menu";
import { Drawer as kt } from "vaul";
import * as Yn from "@radix-ui/react-progress";
import * as dr from "react-resizable-panels";
import { Toaster as Wi } from "sonner";
import { toast as bu } from "sonner";
import * as Be from "@radix-ui/react-slider";
import * as qn from "@radix-ui/react-switch";
const Zi = Us({ prefix: "tw-" });
function m(...e) {
  return Zi(Ks(e));
}
const Qi = "layoutDirection";
function wt() {
  const e = localStorage.getItem(Qi);
  return e === "rtl" ? e : "ltr";
}
const tl = Nt.Root, el = Nt.Portal, Io = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Nt.Overlay,
  {
    ref: n,
    className: m(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
Io.displayName = Nt.Overlay.displayName;
const Mo = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = wt();
  return /* @__PURE__ */ p(el, { children: [
    /* @__PURE__ */ o(Io, {}),
    /* @__PURE__ */ p(
      Nt.Content,
      {
        ref: r,
        className: m(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          e
        ),
        ...n,
        dir: a,
        children: [
          t,
          /* @__PURE__ */ p(
            Nt.Close,
            {
              className: m(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ o(Ze, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Mo.displayName = Nt.Content.displayName;
function Ao({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        e
      ),
      ...t
    }
  );
}
Ao.displayName = "DialogHeader";
const Vo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Nt.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Vo.displayName = Nt.Title.displayName;
const nl = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Nt.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
nl.displayName = Nt.Description.displayName;
const Ee = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft,
  {
    ref: n,
    className: m(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
Ee.displayName = ft.displayName;
const en = b.forwardRef(({ className: e, ...t }, n) => {
  const r = wt();
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ o(lo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ o(
      ft.Input,
      {
        ref: n,
        className: m(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          e
        ),
        ...t
      }
    )
  ] });
});
en.displayName = ft.Input.displayName;
const Se = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft.List,
  {
    ref: n,
    className: m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
Se.displayName = ft.List.displayName;
const bn = b.forwardRef((e, t) => /* @__PURE__ */ o(ft.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
bn.displayName = ft.Empty.displayName;
const Kt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft.Group,
  {
    ref: n,
    className: m(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Kt.displayName = ft.Group.displayName;
const $o = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
$o.displayName = ft.Separator.displayName;
const ce = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ft.Item,
  {
    ref: n,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
ce.displayName = ft.Item.displayName;
var rl = Object.defineProperty, ol = (e, t, n) => t in e ? rl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, F = (e, t, n) => ol(e, typeof t != "symbol" ? t + "" : t, n);
const ie = [
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
], pr = [
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
], Po = [
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
], jr = ml();
function Te(e, t = !0) {
  return t && (e = e.toUpperCase()), e in jr ? jr[e] : 0;
}
function ur(e) {
  return Te(e) > 0;
}
function al(e) {
  const t = typeof e == "string" ? Te(e) : e;
  return t >= 40 && t <= 66;
}
function sl(e) {
  return (typeof e == "string" ? Te(e) : e) <= 39;
}
function Lo(e) {
  return e <= 66;
}
function il(e) {
  const t = typeof e == "string" ? Te(e) : e;
  return jo(t) && !Lo(t);
}
function* ll() {
  for (let e = 1; e <= ie.length; e++) yield e;
}
const wl = 1, Bo = ie.length;
function cl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function mr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= ie.length ? t : ie[n];
}
function zo(e) {
  return e <= 0 || e > Bo ? "******" : Po[e - 1];
}
function dl(e) {
  return zo(Te(e));
}
function jo(e) {
  const t = typeof e == "number" ? mr(e) : e;
  return ur(t) && !pr.includes(t);
}
function pl(e) {
  const t = typeof e == "number" ? mr(e) : e;
  return ur(t) && pr.includes(t);
}
function ul(e) {
  return Po[e - 1].includes("*obsolete*");
}
function ml() {
  const e = {};
  for (let t = 0; t < ie.length; t++)
    e[ie[t]] = t + 1;
  return e;
}
const q = {
  allBookIds: ie,
  nonCanonicalIds: pr,
  bookIdToNumber: Te,
  isBookIdValid: ur,
  isBookNT: al,
  isBookOT: sl,
  isBookOTNT: Lo,
  isBookDC: il,
  allBookNumbers: ll,
  firstBook: wl,
  lastBook: Bo,
  extraBooks: cl,
  bookNumberToId: mr,
  bookNumberToEnglishName: zo,
  bookIdToEnglishName: dl,
  isCanonical: jo,
  isExtraMaterial: pl,
  isObsolete: ul
};
var St = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(St || {});
const bt = class {
  // private versInfo: Versification;
  constructor(t) {
    if (F(this, "name"), F(this, "fullPath"), F(this, "isPresent"), F(this, "hasVerseSegments"), F(this, "isCustomized"), F(this, "baseVersification"), F(this, "scriptureBooks"), F(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = St[t]) : (this._type = t, this.name = St[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
F(bt, "Original", new bt(St.Original)), F(bt, "Septuagint", new bt(St.Septuagint)), F(bt, "Vulgate", new bt(St.Vulgate)), F(bt, "English", new bt(St.English)), F(bt, "RussianProtestant", new bt(St.RussianProtestant)), F(bt, "RussianOrthodox", new bt(St.RussianOrthodox));
let Qt = bt;
function Fr(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Fo = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Fo || {});
const ht = class X {
  constructor(t, n, r, a) {
    if (F(this, "firstChapter"), F(this, "lastChapter"), F(this, "lastVerse"), F(this, "hasSegmentsDefined"), F(this, "text"), F(this, "BBBCCCVVVS"), F(this, "longHashCode"), F(this, "versification"), F(this, "rtlMark", "‏"), F(this, "_bookNum", 0), F(this, "_chapterNum", 0), F(this, "_verseNum", 0), F(this, "_verse"), r == null && a == null)
      if (t != null && typeof t == "string") {
        const s = t, i = n != null && n instanceof Qt ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (t != null && typeof t == "number") {
        const s = n != null && n instanceof Qt ? n : void 0;
        this.setEmpty(s), this._verseNum = t % X.chapterDigitShifter, this._chapterNum = Math.floor(
          t % X.bookDigitShifter / X.chapterDigitShifter
        ), this._bookNum = Math.floor(t / X.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof X) {
          const s = t;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (t == null) return;
          const s = t instanceof Qt ? t : X.defaultVersification;
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
      if (r instanceof $e)
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
    return i && (c = new Qt(i)), n ? new X(n, r.toString(), l, c) : new X();
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
    return q.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = q.bookIdToNumber(t);
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
    if (t <= 0 || t > q.lastBook)
      throw new $e(
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
    this.versification = this.versification != null ? new Qt(t) : void 0;
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
          this.versification = new Qt(St[i]);
        } catch {
          throw new $e("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new $e("Invalid reference : " + t);
    const r = n[1].split(":"), a = +r[0];
    if (r.length !== 2 || q.bookIdToNumber(n[0]) === 0 || !Number.isInteger(a) || a < 0 || !X.isVerseParseable(r[1]))
      throw new $e("Invalid reference : " + t);
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
    const a = [], s = Fr(this._verse, r);
    for (const i of s.map((l) => Fr(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (a.push(l), i.length > 1) {
        const w = this.clone();
        if (w.verse = i[1], !t)
          for (let d = c + 1; d < w.verseNum; d++) {
            const f = new X(
              this._bookNum,
              this._chapterNum,
              d,
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > q.lastBook ? 2 : (q.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = X.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = q.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
F(ht, "defaultVersification", Qt.English), F(ht, "verseRangeSeparator", "-"), F(ht, "verseSequenceIndicator", ","), F(ht, "verseRangeSeparators", [ht.verseRangeSeparator]), F(ht, "verseSequenceIndicators", [ht.verseSequenceIndicator]), F(ht, "chapterDigitShifter", 1e3), F(ht, "bookDigitShifter", ht.chapterDigitShifter * ht.chapterDigitShifter), F(ht, "bcvMaxValue", ht.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
F(ht, "ValidStatusType", Fo);
let $e = class extends Error {
};
const Go = (e, t, n, r, a) => {
  switch (e) {
    case G.OT:
      return t ?? "Old Testament";
    case G.NT:
      return n ?? "New Testament";
    case G.DC:
      return r ?? "Deuterocanon";
    case G.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
}, hl = (e, t, n, r, a) => {
  switch (e) {
    case G.OT:
      return t ?? "OT";
    case G.NT:
      return n ?? "NT";
    case G.DC:
      return r ?? "DC";
    case G.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
};
function ge(e, t) {
  var r;
  return ((r = t == null ? void 0 : t.get(e)) == null ? void 0 : r.localizedName) ?? q.bookIdToEnglishName(e);
}
function hr(e, t) {
  var r;
  return ((r = t == null ? void 0 : t.get(e)) == null ? void 0 : r.localizedId) ?? e.toUpperCase();
}
const Ho = q.allBookIds.filter(
  (e) => !q.isObsolete(q.bookIdToNumber(e))
), re = Object.fromEntries(
  Ho.map((e) => [e, q.bookIdToEnglishName(e)])
);
function fr(e, t, n) {
  const r = t.trim().toLowerCase();
  if (!r) return !1;
  const a = q.bookIdToEnglishName(e), s = n == null ? void 0 : n.get(e);
  return !!(rn(a.toLowerCase(), r) || rn(e.toLowerCase(), r) || (s ? rn(s.localizedName.toLowerCase(), r) || rn(s.localizedId.toLowerCase(), r) : !1));
}
const Xo = We(
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
    const d = rt(!1), f = () => {
      d.current || n == null || n(e), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, h = (v) => {
      d.current = !0, r ? r(v) : n == null || n(e);
    }, u = B(
      () => ge(e, l),
      [e, l]
    ), g = B(
      () => hr(e, l),
      [e, l]
    );
    return /* @__PURE__ */ o(
      "div",
      {
        className: m(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === G.OT,
            "tw-border-s-purple-200": a === G.NT,
            "tw-border-s-indigo-200": a === G.DC,
            "tw-border-s-amber-200": a === G.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          ce,
          {
            ref: w,
            value: c || `${e} ${q.bookIdToEnglishName(e)}`,
            onSelect: f,
            onMouseDown: h,
            role: "option",
            "aria-selected": t,
            "aria-label": `${q.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ o(
                Rt,
                {
                  className: m(
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
), fl = qt(
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
  ({ className: e, variant: t, size: n, asChild: r = !1, ...a }, s) => /* @__PURE__ */ o(r ? _e : "button", { className: m(fl({ variant: t, size: n, className: e })), ref: s, ...a })
);
L.displayName = "Button";
const Re = ve.Root, De = ve.Trigger, dp = ve.Anchor, de = b.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, a) => {
  const s = wt();
  return /* @__PURE__ */ o(ve.Portal, { children: /* @__PURE__ */ o(
    ve.Content,
    {
      ref: a,
      align: t,
      sideOffset: n,
      className: m(
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
de.displayName = ve.Content.displayName;
function Jn(e, t, n) {
  return `${e} ${re[e]}${t ? ` ${hr(e, t)} ${ge(e, t)}` : ""}${n ? ` ${n}` : ""}`;
}
function gl({
  recentSearches: e,
  onSearchItemSelect: t,
  renderItem: n = (l) => String(l),
  getItemKey: r = (l) => String(l),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i
}) {
  const [l, c] = V(!1);
  if (e.length === 0)
    return;
  const w = (d) => {
    t(d), c(!1);
  };
  return /* @__PURE__ */ p(Re, { open: l, onOpenChange: c, children: [
    /* @__PURE__ */ o(De, { asChild: !0, children: /* @__PURE__ */ o(
      L,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ o(Mr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ o(de, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ o(Ee, { children: /* @__PURE__ */ o(Se, { children: /* @__PURE__ */ o(Kt, { heading: s, children: e.map((d) => /* @__PURE__ */ p(
      ce,
      {
        onSelect: () => w(d),
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ o(Mr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ o("span", { children: n(d) })
        ]
      },
      r(d)
    )) }) }) }) })
  ] });
}
function pp(e, t, n = (a, s) => a === s, r = 15) {
  return (a) => {
    const s = e.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, r - 1)];
    t(i);
  };
}
const Rn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, bl = [
  Rn.BOOK_ONLY,
  Rn.BOOK_CHAPTER,
  Rn.BOOK_CHAPTER_VERSE
];
function Gr(e) {
  const t = /^[a-zA-Z]$/.test(e), n = /^[0-9]$/.test(e);
  return { isLetter: t, isDigit: n };
}
function Tt(e) {
  return Ys(q.bookIdToNumber(e));
}
function vl(e, t, n) {
  if (!e.trim() || t.length === 0) return;
  const r = bl.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(e.trim());
      if (i) {
        const [l, c = void 0, w = void 0] = i.slice(1);
        let d;
        const f = t.filter((h) => fr(h, l, n));
        if (f.length === 1 && ([d] = f), !d && c) {
          if (q.isBookIdValid(l)) {
            const h = l.toUpperCase();
            t.includes(h) && (d = h);
          }
          if (!d && n) {
            const h = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            h && t.includes(h[0]) && ([d] = h);
          }
        }
        if (!d && c) {
          const u = ((g) => Object.keys(re).find(
            (v) => re[v].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && t.includes(u) && (d = u), !d && n) {
            const g = Array.from(n.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && t.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let h = c ? parseInt(c, 10) : void 0;
          h && h > Tt(d) && (h = Math.max(Tt(d), 1));
          const u = w ? parseInt(w, 10) : void 0;
          return {
            book: d,
            chapterNum: h,
            verseNum: u
          };
        }
      }
    },
    void 0
  );
  if (r) return r;
}
function xl(e, t, n, r) {
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
        const w = t[c - 1], d = Math.max(Tt(w), 1);
        r({
          book: w,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [e, t, r]), s = j(() => {
    const c = Tt(e.book);
    if (e.chapterNum < c)
      r({
        book: e.book,
        chapterNum: e.chapterNum + 1,
        verseNum: 1
      });
    else {
      const w = t.indexOf(e.book);
      if (w < t.length - 1) {
        const d = t[w + 1];
        r({
          book: d,
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
  return B(() => [
    {
      onClick: a,
      disabled: t.length === 0 || e.chapterNum === 1 && t.indexOf(e.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Ar : Vr
    },
    {
      onClick: i,
      disabled: t.length === 0 || e.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? jn : be
    },
    {
      onClick: l,
      disabled: t.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? be : jn
    },
    {
      onClick: s,
      disabled: t.length === 0 || (e.chapterNum === Tt(e.book) || Tt(e.book) === -1) && t.indexOf(e.book) === t.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Vr : Ar
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
function Hr({
  bookId: e,
  scrRef: t,
  onChapterSelect: n,
  setChapterRef: r,
  isChapterDimmed: a,
  className: s
}) {
  if (e)
    return /* @__PURE__ */ o(Kt, { children: /* @__PURE__ */ o("div", { className: m("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: Tt(e) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ o(
      ce,
      {
        value: `${e} ${re[e] || ""} ${i}`,
        onSelect: () => n(i),
        ref: r(i),
        className: m(
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
function up({
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
  const w = wt(), [d, f] = V(!1), [h, u] = V(""), [g, v] = V(""), [x, O] = V("books"), [y, N] = V(void 0), [k, R] = V(!1), _ = rt(void 0), C = rt(void 0), T = rt(void 0), E = rt(void 0), S = rt({}), $ = j(
    (D) => {
      t(D), l && l(D);
    },
    [t, l]
  ), z = B(() => r ? r() : Ho, [r]), H = B(() => ({
    [G.OT]: z.filter((U) => q.isBookOT(U)),
    [G.NT]: z.filter((U) => q.isBookNT(U)),
    [G.DC]: z.filter((U) => q.isBookDC(U)),
    [G.Extra]: z.filter((U) => q.extraBooks().includes(U))
  }), [z]), I = B(() => Object.values(H).flat(), [H]), Z = B(() => {
    if (!g.trim()) return H;
    const D = {
      [G.OT]: [],
      [G.NT]: [],
      [G.DC]: [],
      [G.Extra]: []
    };
    return [G.OT, G.NT, G.DC, G.Extra].forEach((it) => {
      D[it] = H[it].filter((dt) => fr(dt, g, a));
    }), D;
  }, [H, g, a]), A = B(
    () => vl(g, I, a),
    [g, I, a]
  ), Q = j(() => {
    A && ($({
      book: A.book,
      chapterNum: A.chapterNum ?? 1,
      verseNum: A.verseNum ?? 1
    }), f(!1), v(""), u(""));
  }, [$, A]), yt = j(
    (D) => {
      if (Tt(D) <= 1) {
        $({
          book: D,
          chapterNum: 1,
          verseNum: 1
        }), f(!1), v("");
        return;
      }
      N(D), O("chapters");
    },
    [$]
  ), Bt = j(
    (D) => {
      const U = x === "chapters" ? y : A == null ? void 0 : A.book;
      U && ($({
        book: U,
        chapterNum: D,
        verseNum: 1
      }), f(!1), O("books"), N(void 0), v(""));
    },
    [$, x, y, A]
  ), Ct = j(
    (D) => {
      $(D), f(!1), v("");
    },
    [$]
  ), P = xl(e, I, w, t), M = j(() => {
    O("books"), N(void 0), setTimeout(() => {
      C.current && C.current.focus();
    }, 0);
  }, []), st = j(
    (D) => {
      if (!D && x === "chapters") {
        M();
        return;
      }
      f(D), D && (O("books"), N(void 0), v(""));
    },
    [x, M]
  ), { otLong: ct, ntLong: vt, dcLong: Ae, extraLong: Rr } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, es = j(
    (D) => Go(D, ct, vt, Ae, Rr),
    [ct, vt, Ae, Rr]
  ), ns = j(
    (D) => A ? !!A.chapterNum && !D.toString().includes(A.chapterNum.toString()) : !1,
    [A]
  ), rs = B(
    () => he(
      e,
      a ? ge(e.book, a) : "English"
    ),
    [e, a]
  ), Dr = j((D) => (U) => {
    S.current[D] = U;
  }, []), os = j((D) => {
    (D.key === "Home" || D.key === "End") && D.stopPropagation();
  }, []), as = j(
    (D) => {
      if (D.ctrlKey) return;
      const { isLetter: U, isDigit: it } = Gr(D.key);
      if (x === "chapters") {
        if (D.key === "Backspace") {
          D.preventDefault(), D.stopPropagation(), M();
          return;
        }
        if (U || it) {
          if (D.preventDefault(), D.stopPropagation(), O("books"), N(void 0), it && y) {
            const dt = re[y];
            v(`${dt} ${D.key}`);
          } else
            v(D.key);
          setTimeout(() => {
            C.current && C.current.focus();
          }, 0);
          return;
        }
      }
      if ((x === "chapters" || x === "books" && A) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(D.key)) {
        const dt = x === "chapters" ? y : A == null ? void 0 : A.book;
        if (!dt) return;
        const mt = (() => {
          if (!h) return 1;
          const Ve = h.match(/(\d+)$/);
          return Ve ? parseInt(Ve[1], 10) : 0;
        })(), Wt = Tt(dt);
        if (!Wt) return;
        let Ot = mt;
        const Or = 6;
        switch (D.key) {
          case "ArrowLeft":
            mt !== 0 && (Ot = mt > 1 ? mt - 1 : Wt);
            break;
          case "ArrowRight":
            mt !== 0 && (Ot = mt < Wt ? mt + 1 : 1);
            break;
          case "ArrowUp":
            Ot = mt === 0 ? Wt : Math.max(1, mt - Or);
            break;
          case "ArrowDown":
            Ot = mt === 0 ? 1 : Math.min(Wt, mt + Or);
            break;
          default:
            return;
        }
        Ot !== mt && (D.preventDefault(), D.stopPropagation(), u(Jn(dt, a, Ot)), setTimeout(() => {
          const Ve = S.current[Ot];
          Ve && Ve.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      x,
      A,
      M,
      y,
      h,
      a
    ]
  ), ss = j((D) => {
    if (D.shiftKey || D.key === "Tab" || D.key === " ") return;
    const { isLetter: U, isDigit: it } = Gr(D.key);
    (U || it) && (D.preventDefault(), v((dt) => dt + D.key), C.current.focus(), R(!1));
  }, []);
  return Vt(() => {
    const D = setTimeout(() => {
      if (d && x === "books" && T.current && E.current) {
        const U = T.current, it = E.current, dt = it.offsetTop, mt = U.clientHeight, Wt = it.clientHeight, Ot = dt - mt / 2 + Wt / 2;
        U.scrollTo({
          top: Math.max(0, Ot),
          behavior: "smooth"
        }), u(Jn(e.book));
      }
    }, 0);
    return () => {
      clearTimeout(D);
    };
  }, [d, x, g, A, e.book]), Vt(() => {
    if (x === "chapters" && y) {
      const D = y === e.book;
      setTimeout(() => {
        if (T.current)
          if (D) {
            const U = S.current[e.chapterNum];
            U && U.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            T.current.scrollTo({ top: 0 });
        _.current && _.current.focus();
      }, 0);
    }
  }, [x, y, A, e.book, e.chapterNum]), /* @__PURE__ */ p(Re, { open: d, onOpenChange: st, children: [
    /* @__PURE__ */ o(De, { asChild: !0, children: /* @__PURE__ */ o(
      L,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: m(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ o("span", { className: "tw-truncate", children: rs })
      }
    ) }),
    /* @__PURE__ */ o(de, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ p(
      Ee,
      {
        ref: _,
        onKeyDown: as,
        loop: !0,
        value: h,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          x === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ o(
                en,
                {
                  ref: C,
                  value: g,
                  onValueChange: v,
                  onKeyDown: os,
                  onFocus: () => R(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ o(
                gl,
                {
                  recentSearches: i,
                  onSearchItemSelect: Ct,
                  renderItem: (D) => he(D, "English"),
                  getItemKey: (D) => `${D.book}-${D.chapterNum}-${D.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: P.map(({ onClick: D, disabled: U, title: it, icon: dt }) => /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  R(!0), D();
                },
                disabled: U,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: it,
                onKeyDown: ss,
                children: /* @__PURE__ */ o(dt, {})
              },
              it
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "sm",
                onClick: M,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ o(ps, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ o(us, { className: "tw-h-4 tw-w-4" })
              }
            ),
            y && /* @__PURE__ */ o("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: ge(y, a) })
          ] }),
          !k && /* @__PURE__ */ p(Se, { ref: T, children: [
            x === "books" && /* @__PURE__ */ p(at, { children: [
              !A && Object.entries(Z).map(([D, U]) => {
                if (U.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ o(Kt, { heading: es(D), children: U.map((it) => /* @__PURE__ */ o(
                      Xo,
                      {
                        bookId: it,
                        onSelect: (dt) => yt(dt),
                        section: ze(it),
                        commandValue: `${it} ${re[it]}`,
                        ref: it === e.book ? E : void 0,
                        localizedBookNames: a
                      },
                      it
                    )) }, D)
                  );
              }),
              A && /* @__PURE__ */ o(Kt, { children: /* @__PURE__ */ o(
                ce,
                {
                  value: `${A.book} ${re[A.book]} ${A.chapterNum || ""}:${A.verseNum || ""})}`,
                  onSelect: Q,
                  className: "tw-font-semibold tw-text-primary",
                  children: he(
                    {
                      book: A.book,
                      chapterNum: A.chapterNum ?? 1,
                      verseNum: A.verseNum ?? 1
                    },
                    a ? hr(A.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              A && Tt(A.book) > 1 && /* @__PURE__ */ p(at, { children: [
                /* @__PURE__ */ o("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: ge(A.book, a) }),
                /* @__PURE__ */ o(
                  Hr,
                  {
                    bookId: A.book,
                    scrRef: e,
                    onChapterSelect: Bt,
                    setChapterRef: Dr,
                    isChapterDimmed: ns,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            x === "chapters" && y && /* @__PURE__ */ o(
              Hr,
              {
                bookId: y,
                scrRef: e,
                onChapterSelect: Bt,
                setChapterRef: Dr,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const mp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), yl = qt(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), lt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(go.Root, { ref: n, className: m("pr-twp", yl(), e), ...t }));
lt.displayName = go.Root.displayName;
const gr = b.forwardRef(({ className: e, ...t }, n) => {
  const r = wt();
  return /* @__PURE__ */ o(
    Xe.Root,
    {
      className: m("pr-twp tw-grid tw-gap-2", e),
      ...t,
      ref: n,
      dir: r
    }
  );
});
gr.displayName = Xe.Root.displayName;
const dn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Xe.Item,
  {
    ref: n,
    className: m(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ o(Xe.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ o(hn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
dn.displayName = Xe.Item.displayName;
function Nl(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Wn({
  id: e,
  options: t = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = Nl,
  getButtonLabel: c,
  icon: w = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: f = "",
  commandEmptyMessage: h = "No option found",
  buttonVariant: u = "outline",
  alignDropDown: g = "start",
  isDisabled: v = !1,
  ariaLabel: x,
  ...O
}) {
  const [y, N] = V(!1), k = c ?? l, R = (C) => C.length > 0 && typeof C[0] == "object" && "options" in C[0], _ = (C, T) => {
    const E = l(C), S = typeof C == "object" && "secondaryLabel" in C ? C.secondaryLabel : void 0, $ = `${T ?? ""}${E}${S ?? ""}`;
    return /* @__PURE__ */ p(
      ce,
      {
        value: E,
        onSelect: () => {
          i(C), N(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ o(
            Rt,
            {
              className: m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || l(s) !== E
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            E,
            S && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              S
            ] })
          ] })
        ]
      },
      $
    );
  };
  return /* @__PURE__ */ p(Re, { open: y, onOpenChange: N, ...O, children: [
    /* @__PURE__ */ o(De, { asChild: !0, children: /* @__PURE__ */ p(
      L,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": y,
        "aria-label": x,
        id: e,
        className: m(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            w && /* @__PURE__ */ o("div", { className: "tw-shrink-0 tw-pe-2", children: w }),
            /* @__PURE__ */ o(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? k(s) : d
              }
            )
          ] }),
          /* @__PURE__ */ o(se, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(
      de,
      {
        align: g,
        className: m("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ p(Ee, { children: [
          /* @__PURE__ */ o(en, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ o(bn, { children: h }),
          /* @__PURE__ */ o(Se, { children: R(t) ? t.map((C) => /* @__PURE__ */ o(Kt, { heading: C.groupHeading, children: C.options.map((T) => _(T, C.groupHeading)) }, C.groupHeading)) : t.map((C) => _(C)) })
        ] })
      }
    )
  ] });
}
function kl({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = B(
    () => Array.from({ length: s }, (w, d) => d + 1),
    [s]
  );
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ o(lt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ o(
      Wn,
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
    /* @__PURE__ */ o(lt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ o(
      Wn,
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
var _l = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(_l || {});
const hp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Dn = (e, t) => e[t] ?? t;
function fp({
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
  const d = Dn(w, "%webView_bookSelector_currentBook%"), f = Dn(w, "%webView_bookSelector_choose%"), h = Dn(w, "%webView_bookSelector_chooseBooks%"), [u, g] = V(
    "current book"
    /* CURRENT_BOOK */
  ), v = (x) => {
    g(x), e(x);
  };
  return /* @__PURE__ */ o(
    gr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (x) => v(x),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(dn, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ o(lt, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ o(lt, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ o(
            kl,
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
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(dn, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ o(lt, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ o(lt, { className: "tw-flex tw-items-center", children: r.map((x) => q.bookIdToEnglishName(x)).join(", ") }),
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
const gp = [
  "%comment_assigned_to%",
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
], Cl = ["input", "select", "textarea", "button"], El = ["button", "textbox"], Sl = ({
  options: e,
  onFocusChange: t,
  onOptionSelect: n,
  onCharacterPress: r
}) => {
  const a = rt(null), [s, i] = V(void 0), [l, c] = V(void 0), w = j(
    (u) => {
      i(u);
      const g = e.find((x) => x.id === u);
      g && (t == null || t(g));
      const v = document.getElementById(u);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [t, e]
  ), d = j(
    (u) => {
      const g = e.find((v) => v.id === u);
      g && (c((v) => v === u ? void 0 : u), n == null || n(g));
    },
    [n, e]
  ), f = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || Cl.includes(g)) return !0;
    const v = u.getAttribute("role");
    if (v && El.includes(v)) return !0;
    const x = u.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, h = j(
    (u) => {
      var C;
      const g = u.target, v = (T) => T ? document.getElementById(T) : void 0, x = v(l), O = v(s);
      if (!!(x && g && x.contains(g) && g !== x) && f(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const T = e.find((E) => E.id === l);
            T && w(T.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!x) return;
          const T = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (T.length === 0) return;
          const E = T.findIndex(($) => $ === g);
          if (E === -1) return;
          let S;
          u.key === "ArrowDown" ? S = Math.min(E + 1, T.length - 1) : S = Math.max(E - 1, 0), S !== E && (u.preventDefault(), u.stopPropagation(), (C = T[S]) == null || C.focus());
          return;
        }
        return;
      }
      const k = e.findIndex((T) => T.id === s);
      let R = k;
      switch (u.key) {
        case "ArrowDown":
          R = Math.min(k + 1, e.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          R = Math.max(k - 1, 0), u.preventDefault();
          break;
        case "Home":
          R = 0, u.preventDefault();
          break;
        case "End":
          R = e.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && d(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const T = O;
          if (T) {
            const E = T.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = T.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), $ = E ?? S;
            if ($) {
              u.preventDefault(), $.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (f(g) || (r == null || r(u.key), u.preventDefault()));
          return;
      }
      const _ = e[R];
      _ && w(_.id);
    },
    [e, w, s, l, d, r]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: w
  };
}, Ko = mn(null);
function Tl(e, t) {
  return { getTheme: function() {
    return t ?? null;
  } };
}
function Dt() {
  const e = lr(Ko);
  return e == null && function(t, ...n) {
    const r = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", t);
    for (const s of n) a.append("v", s);
    throw r.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), e;
}
const Uo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Rl = Uo ? Vt : W, on = { tag: wr };
function Dl({ initialConfig: e, children: t }) {
  const n = B(() => {
    const { theme: r, namespace: a, nodes: s, onError: i, editorState: l, html: c } = e, w = Tl(null, r), d = bo({ editable: e.editable, html: c, namespace: a, nodes: s, onError: (f) => i(f, d), theme: r });
    return function(f, h) {
      if (h !== null) {
        if (h === void 0) f.update(() => {
          const u = Xt();
          if (u.isEmpty()) {
            const g = fn();
            u.append(g);
            const v = Uo ? document.activeElement : null;
            ($t() !== null || v !== null && v === f.getRootElement()) && g.select();
          }
        }, on);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const u = f.parseEditorState(h);
            f.setEditorState(u, on);
            break;
          }
          case "object":
            f.setEditorState(h, on);
            break;
          case "function":
            f.update(() => {
              Xt().isEmpty() && h(f);
            }, on);
        }
      }
    }(d, l), [d, w];
  }, []);
  return Rl(() => {
    const r = e.editable, [a] = n;
    a.setEditable(r === void 0 || r);
  }, []), o(Ko.Provider, { value: n, children: t });
}
const Ol = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vt : W;
function Il({ ignoreHistoryMergeTagChange: e = !0, ignoreSelectionChange: t = !1, onChange: n }) {
  const [r] = Dt();
  return Ol(() => {
    if (n) return r.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: c }) => {
      t && s.size === 0 && i.size === 0 || e && c.has(wr) || l.isEmpty() || n(a, r, c);
    });
  }, [r, e, t, n]), null;
}
const br = {
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
}, Mt = tn.Provider, Ft = tn.Root, oe = tn.Trigger, At = b.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ o(
  tn.Content,
  {
    ref: r,
    sideOffset: t,
    className: m(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
At.displayName = tn.Content.displayName;
const vr = [
  $i,
  vo,
  xo,
  Pi
], Ml = mn(null), On = {
  didCatch: !1,
  error: null
};
class Al extends ws {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = On;
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
      }), this.setState(On);
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
    if (r && n.error !== null && Vl(t.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState(On);
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
        l = Ir(r, c);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Ir(Ml.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Vl() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, r) => !Object.is(n, t[r]));
}
function $l({ children: e, onError: t }) {
  return o(Al, { fallback: o("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: t, children: e });
}
const Pl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vt : W;
function Ll(e) {
  return { initialValueFn: () => e.isEditable(), subscribe: (t) => e.registerEditableListener(t) };
}
function Bl() {
  return function(e) {
    const [t] = Dt(), n = B(() => e(t), [t, e]), [r, a] = V(() => n.initialValueFn()), s = rt(r);
    return Pl(() => {
      const { initialValueFn: i, subscribe: l } = n, c = i();
      return s.current !== c && (s.current = c, a(c)), l((w) => {
        s.current = w, a(w);
      });
    }, [n, e]), r;
  }(Ll);
}
function zl(e, t, n = "self") {
  const r = e.getStartEndPoints();
  if (t.isSelected(e) && !ni(t) && r !== null) {
    const [a, s] = r, i = e.isBackward(), l = a.getNode(), c = s.getNode(), w = t.is(l), d = t.is(c);
    if (w || d) {
      const [f, h] = ri(e), u = l.is(c), g = t.is(i ? c : l), v = t.is(i ? l : c);
      let x, O = 0;
      u ? (O = f > h ? h : f, x = f > h ? f : h) : g ? (O = i ? h : f, x = void 0) : v && (O = 0, x = i ? f : h);
      const y = t.__text.slice(O, x);
      y !== t.__text && (n === "clone" && (t = oi(t)), t.__text = y);
    }
  }
  return t;
}
function jl(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Yo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Fl = Yo && "documentMode" in document ? document.documentMode : null;
!(!Yo || !("InputEvent" in window) || Fl) && "getTargetRanges" in new window.InputEvent("input");
function qo(...e) {
  const t = [];
  for (const n of e) if (n && typeof n == "string") for (const [r] of n.matchAll(/\S+/g)) t.push(r);
  return t;
}
function Ut(...e) {
  return () => {
    for (let t = e.length - 1; t >= 0; t--) e[t]();
    e.length = 0;
  };
}
function Jo(e, ...t) {
  const n = qo(...t);
  n.length > 0 && e.classList.add(...n);
}
function Gl(e, ...t) {
  const n = qo(...t);
  n.length > 0 && e.classList.remove(...n);
}
function Xr(e) {
  const t = ai(e, (n) => ne(n) && !n.isInline());
  return ne(t) || jl(4, e.__key), t;
}
function Hl(e, t) {
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const a = t(e[r]);
    a !== null && n.push(a);
  }
  return n;
}
const Xl = Symbol.for("preact-signals");
function vn() {
  if (Gt > 1) return void Gt--;
  let e, t = !1;
  for (; Fe !== void 0; ) {
    let n = Fe;
    for (Fe = void 0, Zn++; n !== void 0; ) {
      const r = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && Wo(n)) try {
        n.c();
      } catch (a) {
        t || (e = a, t = !0);
      }
      n = r;
    }
  }
  if (Zn = 0, Gt--, t) throw e;
}
function Kl(e) {
  if (Gt > 0) return e();
  Gt++;
  try {
    return e();
  } finally {
    vn();
  }
}
let K, Fe;
function Kr(e) {
  const t = K;
  K = void 0;
  try {
    return e();
  } finally {
    K = t;
  }
}
let Gt = 0, Zn = 0, ln = 0;
function Ur(e) {
  if (K === void 0) return;
  let t = e.n;
  return t === void 0 || t.t !== K ? (t = { i: 0, S: e, p: K.s, n: void 0, t: K, e: void 0, x: void 0, r: t }, K.s !== void 0 && (K.s.n = t), K.s = t, e.n = t, 32 & K.f && e.S(t), t) : t.i === -1 ? (t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = K.s, t.n = void 0, K.s.n = t, K.s = t), t) : void 0;
}
function ut(e, t) {
  this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function Ue(e, t) {
  return new ut(e, t);
}
function Wo(e) {
  for (let t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function Yr(e) {
  for (let t = e.s; t !== void 0; t = t.n) {
    const n = t.S.n;
    if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
      e.s = t;
      break;
    }
  }
}
function Zo(e) {
  let t, n = e.s;
  for (; n !== void 0; ) {
    const r = n.p;
    n.i === -1 ? (n.S.U(n), r !== void 0 && (r.n = n.n), n.n !== void 0 && (n.n.p = r)) : t = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = r;
  }
  e.s = t;
}
function te(e, t) {
  ut.call(this, void 0), this.x = e, this.s = void 0, this.g = ln - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function Ul(e, t) {
  return new te(e, t);
}
function Qo(e) {
  const t = e.u;
  if (e.u = void 0, typeof t == "function") {
    Gt++;
    const n = K;
    K = void 0;
    try {
      t();
    } catch (r) {
      throw e.f &= -2, e.f |= 8, xr(e), r;
    } finally {
      K = n, vn();
    }
  }
}
function xr(e) {
  for (let t = e.s; t !== void 0; t = t.n) t.S.U(t);
  e.x = void 0, e.s = void 0, Qo(e);
}
function Yl(e) {
  if (K !== this) throw new Error("Out-of-order effect");
  Zo(this), K = e, this.f &= -2, 8 & this.f && xr(this), vn();
}
function me(e, t) {
  this.x = e, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = t == null ? void 0 : t.name;
}
function Yt(e, t) {
  const n = new me(e, t);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const r = n.d.bind(n);
  return r[Symbol.dispose] = r, r;
}
function xn(e, t = {}) {
  const n = {};
  for (const r in e) {
    const a = t[r], s = Ue(a === void 0 ? e[r] : a);
    n[r] = s;
  }
  return n;
}
ut.prototype.brand = Xl, ut.prototype.h = function() {
  return !0;
}, ut.prototype.S = function(e) {
  const t = this.t;
  t !== e && e.e === void 0 && (e.x = t, this.t = e, t !== void 0 ? t.e = e : Kr(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, ut.prototype.U = function(e) {
  if (this.t !== void 0) {
    const t = e.e, n = e.x;
    t !== void 0 && (t.x = n, e.e = void 0), n !== void 0 && (n.e = t, e.x = void 0), e === this.t && (this.t = n, n === void 0 && Kr(() => {
      var r;
      (r = this.Z) == null || r.call(this);
    }));
  }
}, ut.prototype.subscribe = function(e) {
  return Yt(() => {
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
  const e = Ur(this);
  return e !== void 0 && (e.i = this.i), this.v;
}, set(e) {
  if (e !== this.v) {
    if (Zn > 100) throw new Error("Cycle detected");
    this.v = e, this.i++, ln++, Gt++;
    try {
      for (let t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      vn();
    }
  }
} }), te.prototype = new ut(), te.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === ln)) return !0;
  if (this.g = ln, this.f |= 1, this.i > 0 && !Wo(this)) return this.f &= -2, !0;
  const e = K;
  try {
    Yr(this), K = this;
    const t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return K = e, Zo(this), this.f &= -2, !0;
}, te.prototype.S = function(e) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  ut.prototype.S.call(this, e);
}, te.prototype.U = function(e) {
  if (this.t !== void 0 && (ut.prototype.U.call(this, e), this.t === void 0)) {
    this.f &= -33;
    for (let t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
}, te.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let e = this.t; e !== void 0; e = e.x) e.t.N();
  }
}, Object.defineProperty(te.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const e = Ur(this);
  if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), me.prototype.c = function() {
  const e = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    e();
  }
}, me.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Qo(this), Yr(this), Gt++;
  const e = K;
  return K = this, Yl.bind(this, e);
}, me.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Fe, Fe = this);
}, me.prototype.d = function() {
  this.f |= 8, 1 & this.f || xr(this);
}, me.prototype.dispose = function() {
  this.d();
};
Pt({ build: (e, t, n) => xn(t), config: Qe({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(e, t, n) {
  const r = n.getOutput();
  return Yt(() => r.disabled.value ? void 0 : e.registerRootListener((a) => {
    e.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: r.defaultSelection.peek() });
  }));
} });
function ta() {
  const e = Xt(), t = $t(), n = fn();
  e.clear(), e.append(n), t !== null && n.select(), Ke(t) && (t.format = 0);
}
function ea(e, t = ta) {
  return e.registerCommand(yo, (n) => (e.update(t), !0), No);
}
Pt({ build: (e, t, n) => xn(t), config: Qe({ $onClear: ta }), name: "@lexical/extension/ClearEditor", register(e, t, n) {
  const { $onClear: r } = n.getOutput();
  return Yt(() => ea(e, r.value));
} });
function ql(e) {
  return (typeof e.nodes == "function" ? e.nodes() : e.nodes) || [];
}
function na(e, t) {
  let n;
  return Ue(e(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = e(), n = t(this);
  } });
}
const Qn = Pt({ build: (e) => na(() => e.getEditorState(), (t) => e.registerUpdateListener((n) => {
  t.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function J(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ra(e, t) {
  if (e && t && !Array.isArray(t) && typeof e == "object" && typeof t == "object") {
    const n = e, r = t;
    for (const a in r) n[a] = ra(n[a], r[a]);
    return e;
  }
  return t;
}
const yr = 0, tr = 1, oa = 2, In = 3, an = 4, ue = 5, Mn = 6, Pe = 7;
function An(e) {
  return e.id === yr;
}
function aa(e) {
  return e.id === oa;
}
function Jl(e) {
  return function(t) {
    return t.id === tr;
  }(e) || J(305, String(e.id), String(tr)), Object.assign(e, { id: oa });
}
const Wl = /* @__PURE__ */ new Set();
class Zl {
  constructor(t, n) {
    pt(this, "builder");
    pt(this, "configs");
    pt(this, "_dependency");
    pt(this, "_peerNameSet");
    pt(this, "extension");
    pt(this, "state");
    pt(this, "_signal");
    this.builder = t, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: yr };
  }
  mergeConfigs() {
    let t = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : si;
    for (const r of this.configs) t = n(t, r);
    return t;
  }
  init(t) {
    const n = this.state;
    aa(n) || J(306, String(n.id));
    const r = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...r, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, c, w) {
      return Object.assign(l, { config: c, id: In, registerState: w });
    }(n, this.mergeConfigs(), r);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(t, s.config, r)), this.state = function(l, c, w) {
      return Object.assign(l, { id: an, initResult: c, registerState: w });
    }(s, i, a);
  }
  build(t) {
    const n = this.state;
    let r;
    n.id !== an && J(307, String(n.id), String(ue)), this.extension.build && (r = this.extension.build(t, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => r, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: ue, output: i, registerState: l });
    }(n, r, a);
  }
  register(t, n) {
    this._signal = n;
    const r = this.state;
    r.id !== ue && J(308, String(r.id), String(ue));
    const a = this.extension.register && this.extension.register(t, r.config, r.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Mn });
    }(r), () => {
      const s = this.state;
      s.id !== Pe && J(309, String(r.id), String(Pe)), this.state = function(i) {
        return Object.assign(i, { id: ue });
      }(s), a && a();
    };
  }
  afterRegistration(t) {
    const n = this.state;
    let r;
    return n.id !== Mn && J(310, String(n.id), String(Mn)), this.extension.afterRegistration && (r = this.extension.afterRegistration(t, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Pe });
    }(n), r;
  }
  getSignal() {
    return this._signal === void 0 && J(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && J(312, this.extension.name);
    const t = this.state;
    return function(n) {
      return n.id >= an;
    }(t) || J(313, String(t.id), String(an)), t.initResult;
  }
  getInitPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const t = this.state;
    return function(n) {
      return n.id >= In;
    }(t) || J(314, String(t.id), String(In)), { config: t.config };
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
      return n.id >= Pe;
    }(t) || J(316, String(t.id), String(Pe)), t;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Wl;
  }
  getPeerNameSet() {
    let t = this._peerNameSet;
    return t || (t = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = t), t;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const t = this.state;
      (function(n) {
        return n.id >= ue;
      })(t) || J(317, this.extension.name), this._dependency = { config: t.config, init: t.initResult, output: t.output };
    }
    return this._dependency;
  }
}
const qr = { tag: wr };
function Ql() {
  const e = Xt();
  e.isEmpty() && e.append(fn());
}
const tw = Pt({ config: Qe({ setOptions: qr, updateOptions: qr }), init: ({ $initialEditorState: e = Ql }) => ({ $initialEditorState: e, initialized: !1 }), afterRegistration(e, { updateOptions: t, setOptions: n }, r) {
  const a = r.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (ci(s)) e.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [ii, xo, li, wi, vo] }), Jr = Symbol.for("@lexical/extension/LexicalBuilder");
function Wr() {
}
function ew(e) {
  throw e;
}
function sn(e) {
  return Array.isArray(e) ? e : [e];
}
const Vn = "0.38.2+prod.esm";
class Ge {
  constructor(t) {
    pt(this, "roots");
    pt(this, "extensionNameMap");
    pt(this, "outgoingConfigEdges");
    pt(this, "incomingEdges");
    pt(this, "conflicts");
    pt(this, "_sortedExtensionReps");
    pt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Vn, this.roots = t;
    for (const n of t) this.addExtension(n);
  }
  static fromExtensions(t) {
    const n = [sn(tw)];
    for (const r of t) n.push(sn(r));
    return new Ge(n);
  }
  static maybeFromEditor(t) {
    const n = t[Jr];
    return n && (n.PACKAGE_VERSION !== Vn && J(292, n.PACKAGE_VERSION, Vn), n instanceof Ge || J(293)), n;
  }
  static fromEditor(t) {
    const n = Ge.maybeFromEditor(t);
    return n === void 0 && J(294), n;
  }
  constructEditor() {
    const { $initialEditorState: t, onError: n, ...r } = this.buildCreateEditorArgs(), a = Object.assign(bo({ ...r, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [Jr]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let t = Wr;
    function n() {
      try {
        t();
      } finally {
        t = Wr;
      }
    }
    const r = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return t = Ut(this.registerEditor(r), () => r.setRootElement(null)), r;
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
    const n = sn(t), [r] = n;
    typeof r.name != "string" && J(297, typeof r.name);
    let a = this.extensionNameMap.get(r.name);
    if (a !== void 0 && a.extension !== r && J(298, r.name), !a) {
      a = new Zl(this, r), this.extensionNameMap.set(r.name, a);
      const s = this.conflicts.get(r.name);
      typeof s == "string" && J(299, r.name, s);
      for (const i of r.conflictsWith || []) this.extensionNameMap.has(i) && J(299, r.name, i), this.conflicts.set(i, r.name);
      for (const i of r.dependencies || []) {
        const l = sn(i);
        this.addEdge(r.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of r.peerDependencies || []) this.addEdge(r.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const t = [], n = (r, a) => {
      let s = r.state;
      if (aa(s)) return;
      const i = r.extension.name;
      var l;
      An(s) || J(300, i, a || "[unknown]"), An(l = s) || J(304, String(l.id), String(yr)), s = Object.assign(l, { id: tr }), r.state = s;
      const c = this.outgoingConfigEdges.get(i);
      if (c) for (const w of c.keys()) {
        const d = this.extensionNameMap.get(w);
        d && n(d, i);
      }
      s = Jl(s), r.state = s, t.push(r);
    };
    for (const r of this.extensionNameMap.values()) An(r.state) && n(r);
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
    return Ut(...a);
  }
  buildCreateEditorArgs() {
    const t = {}, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: f } = d;
      if (f.onError !== void 0 && (t.onError = f.onError), f.disableEvents !== void 0 && (t.disableEvents = f.disableEvents), f.parentEditor !== void 0 && (t.parentEditor = f.parentEditor), f.editable !== void 0 && (t.editable = f.editable), f.namespace !== void 0 && (t.namespace = f.namespace), f.$initialEditorState !== void 0 && (t.$initialEditorState = f.$initialEditorState), f.nodes) for (const h of ql(f)) {
        if (typeof h != "function") {
          const u = r.get(h.replace);
          u && J(302, f.name, h.replace.name, u.extension.name), r.set(h.replace, d);
        }
        n.add(h);
      }
      if (f.html) {
        if (f.html.export) for (const [h, u] of f.html.export.entries()) a.set(h, u);
        f.html.import && Object.assign(s, f.html.import);
      }
      f.theme && ra(i, f.theme);
    }
    Object.keys(i).length > 0 && (t.theme = i), n.size && (t.nodes = [...n]);
    const c = Object.keys(s).length > 0, w = a.size > 0;
    (c || w) && (t.html = {}, c && (t.html.import = s), w && (t.html.export = a));
    for (const d of l) d.init(t);
    return t.onError || (t.onError = ew), t;
  }
}
const nw = /* @__PURE__ */ new Set(), Zr = Pt({ build(e, t, n) {
  const r = n.getDependency(Qn).output, a = Ue({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = na(() => {
  }, () => Yt(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    r.value.read(() => {
      if ($t()) for (const [d, f] of l.entries()) {
        if (f.size === 0) {
          l.delete(d);
          continue;
        }
        const h = yi(d), u = h && h.isSelected() || !1;
        w = w || u !== (!!i && i.has(d)), u && (c = c || /* @__PURE__ */ new Set(), c.add(d));
      }
    }), !w && c && i && c.size === i.size || (s.value = c);
  }));
  return { watchNodeKey: function(i) {
    const l = Ul(() => (s.value || nw).has(i)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(i);
    const d = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), d || (c.set(i, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [Qn], name: "@lexical/extension/NodeSelection" });
di("INSERT_HORIZONTAL_RULE_COMMAND");
class xe extends vi {
  static getType() {
    return "horizontalrule";
  }
  static clone(t) {
    return new xe(t.__key);
  }
  static importJSON(t) {
    return sa().updateFromJSON(t);
  }
  static importDOM() {
    return { hr: () => ({ conversion: rw, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(t) {
    const n = document.createElement("hr");
    return Jo(n, t.theme.hr), n;
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
function rw() {
  return { node: sa() };
}
function sa() {
  return xi(xe);
}
function ow(e) {
  return e instanceof xe;
}
Pt({ dependencies: [Qn, Zr], name: "@lexical/extension/HorizontalRule", nodes: [xe], register(e, t, n) {
  const { watchNodeKey: r } = n.getDependency(Zr).output, a = Ue({ nodeSelections: /* @__PURE__ */ new Map() }), s = e._config.theme.hrSelected ?? "selected";
  return Ut(e.registerCommand(pi, (i) => {
    if (ui(i.target)) {
      const l = mi(i.target);
      if (ow(l)) return function(c, w = !1) {
        const d = $t(), f = c.isSelected(), h = c.getKey();
        let u;
        w && hi(d) ? u = d : (u = fi(), gi(u)), f ? u.delete(h) : u.add(h);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, bi), e.registerMutationListener(xe, (i, l) => {
    Kl(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [d, f] of i.entries()) if (f === "destroyed") w.delete(d), c = !0;
      else {
        const h = w.get(d), u = e.getElementByKey(d);
        h ? h.domNode.value = u : (c = !0, w.set(d, { domNode: Ue(u), selectedSignal: r(d) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), Yt(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) i.push(Yt(() => {
      const w = l.value;
      w && (c.value ? Jo(w, s) : Gl(w, s));
    }));
    return Ut(...i);
  }));
} });
function aw(e, t) {
  return Ut(e.registerCommand(Ni, (n) => {
    const r = $t();
    if (!Ke(r)) return !1;
    n.preventDefault();
    const a = function(s) {
      const i = s.getNodes();
      if (Hl(i, (h) => wn(h) && h.canIndent() ? h : null).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, d = w.getNode(), f = Xr(d);
      if (f.canIndent()) {
        const h = f.getKey();
        let u = ki();
        if (u.anchor.set(h, 0, "element"), u.focus.set(h, 0, "element"), u = _i(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(r) ? n.shiftKey ? Ci : Pr : Ei;
    return e.dispatchCommand(a, void 0);
  }, No), e.registerCommand(Pr, () => {
    const n = typeof t == "number" ? t : t ? t.peek() : null;
    if (n == null) return !1;
    const r = $t();
    if (!Ke(r)) return !1;
    const a = r.getNodes().map((s) => Xr(s).getIndent());
    return Math.max(...a) + 1 >= n;
  }, cr));
}
Pt({ build: (e, t, n) => xn(t), config: Qe({ disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(e, t, n) {
  const { disabled: r, maxIndent: a } = n.getOutput();
  return Yt(() => {
    if (!r.value) return aw(e, a);
  });
} });
const sw = Pt({ name: "@lexical/react/ReactProvider" });
function iw() {
  return Xt().getTextContent();
}
function lw(e, t = !0) {
  if (e) return !1;
  let n = iw();
  return t && (n = n.trim()), n === "";
}
function ww(e) {
  if (!lw(e, !1)) return !1;
  const t = Xt().getChildren(), n = t.length;
  if (n > 1) return !1;
  for (let r = 0; r < n; r++) {
    const a = t[r];
    if (Si(a)) return !1;
    if (ne(a)) {
      if (!Ti(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const c = s[r];
        if (!cn(c)) return !1;
      }
    }
  }
  return !0;
}
function ia(e) {
  return () => ww(e);
}
function la(e) {
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
            const [w, d, f, h, u] = c;
            e.update(() => {
              const g = $t();
              if (Ke(g)) {
                const v = g.anchor;
                let x = v.getNode(), O = 0, y = 0;
                if (cn(x) && w >= 0 && d >= 0 && (O = w, y = w + d, g.setTextNodeRange(x, O, x, y)), O === y && f === "" || (g.insertRawText(f), x = v.getNode()), cn(x)) {
                  O = h, y = h + u;
                  const N = x.getTextContentSize();
                  O = O > N ? N : O, y = y > N ? N : y, g.setTextNodeRange(x, O, x, y);
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
Pt({ build: (e, t, n) => xn(t), config: Qe({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (e, t, n) => Yt(() => n.getOutput().disabled.value ? void 0 : la(e)) });
function cw(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Nr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vt : W;
function dw({ editor: e, ErrorBoundary: t }) {
  return function(n, r) {
    const [a, s] = V(() => n.getDecorators());
    return Nr(() => n.registerDecoratorListener((i) => {
      Bi(() => {
        s(i);
      });
    }), [n]), W(() => {
      s(n.getDecorators());
    }, [n]), B(() => {
      const i = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], d = o(r, { onError: (h) => n._onError(h), children: o(cs, { fallback: null, children: a[w] }) }), f = n.getElementByKey(w);
        f !== null && i.push(zi(d, f, w));
      }
      return i;
    }, [r, a, n]);
  }(e, t);
}
function pw({ editor: e, ErrorBoundary: t }) {
  return function(n) {
    const r = Ge.maybeFromEditor(n);
    if (r && r.hasExtensionByName(sw.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) r.hasExtensionByName(a) && cw(320, a);
      return !0;
    }
    return !1;
  }(e) ? null : o(dw, { editor: e, ErrorBoundary: t });
}
function Qr(e) {
  return e.getEditorState().read(ia(e.isComposing()));
}
function uw({ contentEditable: e, placeholder: t = null, ErrorBoundary: n }) {
  const [r] = Dt();
  return function(a) {
    Nr(() => Ut(Li(a), la(a)), [a]);
  }(r), p(at, { children: [e, o(mw, { content: t }), o(pw, { editor: r, ErrorBoundary: n })] });
}
function mw({ content: e }) {
  const [t] = Dt(), n = function(a) {
    const [s, i] = V(() => Qr(a));
    return Nr(() => {
      function l() {
        const c = Qr(a);
        i(c);
      }
      return l(), Ut(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(t), r = Bl();
  return n ? typeof e == "function" ? e(r) : e : null;
}
function hw({ defaultSelection: e }) {
  const [t] = Dt();
  return W(() => {
    t.focus(() => {
      const n = document.activeElement, r = t.getRootElement();
      r === null || n !== null && r.contains(n) || r.focus({ preventScroll: !0 });
    }, { defaultSelection: e });
  }, [e, t]), null;
}
const fw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vt : W;
function gw({ onClear: e }) {
  const [t] = Dt();
  return fw(() => ea(t, e), [t, e]), null;
}
const wa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vt : W;
function bw({ editor: e, ariaActiveDescendant: t, ariaAutoComplete: n, ariaControls: r, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: d, ariaOwns: f, ariaRequired: h, autoCapitalize: u, className: g, id: v, role: x = "textbox", spellCheck: O = !0, style: y, tabIndex: N, "data-testid": k, ...R }, _) {
  const [C, T] = V(e.isEditable()), E = j(($) => {
    $ && $.ownerDocument && $.ownerDocument.defaultView ? e.setRootElement($) : e.setRootElement(null);
  }, [e]), S = B(() => /* @__PURE__ */ function(...$) {
    return (z) => {
      for (const H of $) typeof H == "function" ? H(z) : H != null && (H.current = z);
    };
  }(_, E), [E, _]);
  return wa(() => (T(e.isEditable()), e.registerEditableListener(($) => {
    T($);
  })), [e]), o("div", { "aria-activedescendant": C ? t : void 0, "aria-autocomplete": C ? n : "none", "aria-controls": C ? r : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": C && x === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": d, "aria-owns": C ? f : void 0, "aria-readonly": !C || void 0, "aria-required": h, autoCapitalize: u, className: g, contentEditable: C, "data-testid": k, id: v, ref: S, role: x, spellCheck: O, style: y, tabIndex: N, ...R });
}
const vw = We(bw);
function to(e) {
  return e.getEditorState().read(ia(e.isComposing()));
}
const xw = We(yw);
function yw(e, t) {
  const { placeholder: n, ...r } = e, [a] = Dt();
  return p(at, { children: [o(vw, { editor: a, ...r, ref: t }), n != null && o(Nw, { editor: a, content: n })] });
}
function Nw({ content: e, editor: t }) {
  const n = function(i) {
    const [l, c] = V(() => to(i));
    return wa(() => {
      function w() {
        const d = to(i);
        c(d);
      }
      return w(), Ut(i.registerUpdateListener(() => {
        w();
      }), i.registerEditableListener(() => {
        w();
      }));
    }, [i]), l;
  }(t), [r, a] = V(t.isEditable());
  if (Vt(() => (a(t.isEditable()), t.registerEditableListener((i) => {
    a(i);
  })), [t]), !n) return null;
  let s = null;
  return typeof e == "function" ? s = e(r) : e !== null && (s = e), s === null ? null : o("div", { "aria-hidden": !0, children: s });
}
function kw({
  placeholder: e,
  className: t,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ o(
    xw,
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
const ca = mn(void 0);
function _w({
  activeEditor: e,
  $updateToolbar: t,
  blockType: n,
  setBlockType: r,
  showModal: a,
  children: s
}) {
  const i = B(
    () => ({
      activeEditor: e,
      $updateToolbar: t,
      blockType: n,
      setBlockType: r,
      showModal: a
    }),
    [e, t, n, r, a]
  );
  return /* @__PURE__ */ o(ca.Provider, { value: i, children: s });
}
function da() {
  const e = lr(ca);
  if (!e)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return e;
}
function Cw() {
  const [e, t] = V(void 0), n = j(() => {
    t(void 0);
  }, []), r = B(() => {
    if (e === void 0)
      return;
    const { title: s, content: i } = e;
    return /* @__PURE__ */ o(tl, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(Mo, { children: [
      /* @__PURE__ */ o(Ao, { children: /* @__PURE__ */ o(Vo, { children: s }) }),
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
function Ew({
  children: e
}) {
  const [t] = Dt(), [n, r] = V(t), [a, s] = V("paragraph"), [i, l] = Cw(), c = () => {
  };
  return W(() => n.registerCommand(
    ko,
    (w, d) => (r(d), !1),
    cr
  ), [n]), /* @__PURE__ */ p(
    _w,
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
function Sw(e) {
  const [t] = Dt(), { activeEditor: n } = da();
  W(() => n.registerCommand(
    ko,
    () => {
      const r = $t();
      return r && e(r), !1;
    },
    cr
  ), [t, e]), W(() => {
    n.getEditorState().read(() => {
      const r = $t();
      r && e(r);
    });
  }, [n, e]);
}
const pa = qt(
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
), Tw = b.forwardRef(({ className: e, variant: t, size: n, ...r }, a) => /* @__PURE__ */ o(
  Eo.Root,
  {
    ref: a,
    className: m(pa({ variant: t, size: n, className: e })),
    ...r
  }
));
Tw.displayName = Eo.Root.displayName;
const ua = b.createContext({
  size: "default",
  variant: "default"
}), kr = b.forwardRef(({ className: e, variant: t, size: n, children: r, ...a }, s) => {
  const i = wt();
  return /* @__PURE__ */ o(
    gn.Root,
    {
      ref: s,
      className: m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
      ...a,
      dir: i,
      children: /* @__PURE__ */ o(
        ua.Provider,
        {
          value: { variant: t, size: n },
          children: r
        }
      )
    }
  );
});
kr.displayName = gn.Root.displayName;
const He = b.forwardRef(({ className: e, children: t, variant: n, size: r, ...a }, s) => {
  const i = b.useContext(ua);
  return /* @__PURE__ */ o(
    gn.Item,
    {
      ref: s,
      className: m(
        pa({
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
He.displayName = gn.Item.displayName;
const eo = [
  { format: "bold", icon: ms, label: "Bold" },
  { format: "italic", icon: hs, label: "Italic" },
  { format: "underline", icon: fs, label: "Underline" },
  { format: "strikethrough", icon: gs, label: "Strikethrough" }
];
function Rw() {
  const { activeEditor: e } = da(), [t, n] = V([]), r = j((a) => {
    if (Ke(a) || ji(a)) {
      const s = [];
      eo.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return Sw(r), /* @__PURE__ */ o(
    kr,
    {
      type: "multiple",
      value: t,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: eo.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ o(
        He,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            e.dispatchCommand(Ri, a);
          },
          children: /* @__PURE__ */ o(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function Dw({ onClear: e }) {
  const [t] = Dt();
  W(() => {
    e && e(() => {
      t.dispatchCommand(yo, void 0);
    });
  }, [t, e]);
}
function Ow({
  placeholder: e = "Start typing ...",
  autoFocus: t = !1,
  onClear: n
}) {
  const [, r] = V(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ o(Ew, { children: () => /* @__PURE__ */ o("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ o(Rw, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ o(
        uw,
        {
          contentEditable: /* @__PURE__ */ o("div", { ref: (s) => {
            s !== void 0 && r(s);
          }, children: /* @__PURE__ */ o(kw, { placeholder: e }) }),
          ErrorBoundary: $l
        }
      ),
      t && /* @__PURE__ */ o(hw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ o(Dw, { onClear: n }),
      /* @__PURE__ */ o(gw, {})
    ] })
  ] });
}
const Iw = {
  namespace: "commentEditor",
  theme: br,
  nodes: vr,
  onError: (e) => {
    console.error(e);
  }
};
function er({
  editorState: e,
  editorSerializedState: t,
  onChange: n,
  onSerializedChange: r,
  placeholder: a = "Start typing…",
  autoFocus: s = !1,
  onClear: i
}) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow", children: /* @__PURE__ */ o(
    Dl,
    {
      initialConfig: {
        ...Iw,
        ...e ? { editorState: e } : {},
        ...t ? { editorState: JSON.stringify(t) } : {}
      },
      children: /* @__PURE__ */ p(Mt, { children: [
        /* @__PURE__ */ o(Ow, { placeholder: a, autoFocus: s, onClear: i }),
        /* @__PURE__ */ o(
          Il,
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
function Mw(e, t) {
  const n = Ii(t) ? t.body.childNodes : t.childNodes;
  let r = [];
  const a = [];
  for (const s of n) if (!ha.has(s.nodeName)) {
    const i = fa(s, e, a, !1);
    i !== null && (r = r.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof _o && i.insertAfter(Co());
    for (const i of s) {
      const l = i.getChildren();
      for (const c of l) i.insertBefore(c);
      i.remove();
    }
  }(a), r;
}
function Aw(e, t) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), r = Xt().getChildren();
  for (let a = 0; a < r.length; a++)
    ma(e, r[a], n, t);
  return n.innerHTML;
}
function ma(e, t, n, r = null) {
  let a = r === null || t.isSelected(r);
  const s = ne(t) && t.excludeFromCopy("html");
  let i = t;
  r !== null && cn(t) && (i = zl(r, t, "clone"));
  const l = ne(i) ? i.getChildren() : [], c = Di(e, i.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(e, i) : i.exportDOM(e);
  const { element: d, after: f } = w;
  if (!d) return !1;
  const h = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], v = ma(e, g, h, r);
    !a && ne(t) && v && t.extractWithChild(g, r, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Oi(d) || Lr(d)) && d.append(h), n.append(d), f) {
      const u = f.call(i, d);
      u && (Lr(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else n.append(h);
  return a;
}
const ha = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function fa(e, t, n, r, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (ha.has(e.nodeName)) return i;
  let l = null;
  const c = function(g, v) {
    const { nodeName: x } = g, O = v._htmlConversions.get(x.toLowerCase());
    let y = null;
    if (O !== void 0) for (const N of O) {
      const k = N(g);
      k !== null && (y === null || (y.priority || 0) <= (k.priority || 0)) && (y = k);
    }
    return y !== null ? y.conversion : null;
  }(e, t), w = c ? c(e) : null;
  let d = null;
  if (w !== null) {
    d = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, v] of a) if (l = v(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(e.nodeName, w.forChild);
  }
  const f = e.childNodes;
  let h = [];
  const u = (l == null || !Mi(l)) && (l != null && wn(l) || r);
  for (let g = 0; g < f.length; g++) h.push(...fa(f[g], t, n, u, new Map(a), l));
  return d != null && (h = d(h)), Br(e) && (h = Vw(e, h, u ? () => {
    const g = new _o();
    return n.push(g), g;
  } : fn)), l == null ? h.length > 0 ? i = i.concat(h) : Br(e) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : zr(g.nextSibling) && zr(g.previousSibling);
  }(e) && (i = i.concat(Co())) : ne(l) && l.append(...h), i;
}
function Vw(e, t, n) {
  const r = e.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (wn(l)) r && !l.getFormat() && l.setFormat(r), a.push(l);
    else if (s.push(l), i === t.length - 1 || i < t.length - 1 && wn(t[i + 1])) {
      const c = n();
      c.setFormat(r), c.append(...s), a.push(c), s = [];
    }
  }
  return a;
}
function $w(e) {
  const t = e.querySelector('[contenteditable="true"]');
  if (!t) return !1;
  t.focus();
  const n = window.getSelection(), r = document.createRange();
  return r.selectNodeContents(t), r.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(r), !0;
}
function zt(e) {
  var t;
  return (t = e == null ? void 0 : e.root) != null && t.children ? e.root.children.some((n) => n != null && n.children ? n.children.some((r) => (r == null ? void 0 : r.text) && r.text.trim().length > 0) : !1) : !1;
}
function Pw(e) {
  if (!e || e.trim() === "")
    throw new Error("Input HTML is empty");
  const t = e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi, "<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi, "$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi, "$1"), n = So({
    namespace: "EditorUtils",
    theme: br,
    nodes: vr,
    onError: (a) => {
      console.error(a);
    }
  });
  let r;
  if (n.update(
    () => {
      const s = new DOMParser().parseFromString(t, "text/html"), i = Mw(n, s);
      Xt().clear(), Ai(i);
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
function nr(e) {
  const t = So({
    namespace: "EditorUtils",
    theme: br,
    nodes: vr,
    onError: (a) => {
      console.error(a);
    }
  }), n = t.parseEditorState(JSON.stringify(e));
  t.setEditorState(n);
  let r = "";
  return t.getEditorState().read(() => {
    r = Aw(t);
  }), r = r.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<s>(.*?)<\/s>/g, "<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi, "<br/>"), r;
}
function ga(e) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key) ? (e.stopPropagation(), !0) : !1;
}
const Lw = qt(
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
), Ye = b.forwardRef(
  ({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ o("div", { ref: r, className: m("pr-twp", Lw({ variant: t }), e), ...n })
);
Ye.displayName = "Badge";
const ba = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: m(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...t
    }
  )
);
ba.displayName = "Card";
const Bw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
Bw.displayName = "CardHeader";
const zw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "h3",
    {
      ref: n,
      className: m(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...t,
      children: t.children
    }
  )
);
zw.displayName = "CardTitle";
const jw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("p", { ref: n, className: m("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
jw.displayName = "CardDescription";
const va = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o("div", { ref: n, className: m("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
va.displayName = "CardContent";
const Fw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
Fw.displayName = "CardFooter";
const ye = b.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, a) => /* @__PURE__ */ o(
  To.Root,
  {
    ref: a,
    decorative: n,
    orientation: t,
    className: m(
      "pr-twp tw-shrink-0 tw-bg-border",
      t === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...r
  }
));
ye.displayName = To.Root.displayName;
const xa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ce.Root,
  {
    ref: n,
    className: m(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      e
    ),
    ...t
  }
));
xa.displayName = Ce.Root.displayName;
const Gw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ce.Image,
  {
    ref: n,
    className: m("pr-twp tw-aspect-square tw-h-full tw-w-full", e),
    ...t
  }
));
Gw.displayName = Ce.Image.displayName;
const ya = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ce.Fallback,
  {
    ref: n,
    className: m(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      e
    ),
    ...t
  }
));
ya.displayName = Ce.Fallback.displayName;
const _r = mn(void 0);
function _t() {
  const e = lr(_r);
  if (!e)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return e;
}
const Lt = qt("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Oe = tt.Trigger, Na = tt.Group, Hw = tt.Portal, Xw = tt.Sub, Kw = tt.RadioGroup;
function pe({ variant: e = "default", ...t }) {
  const n = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ o(_r.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { ...t }) });
}
const ka = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => {
  const s = _t();
  return /* @__PURE__ */ p(
    tt.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        t && "tw-pl-8",
        e,
        Lt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ o(be, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ka.displayName = tt.SubTrigger.displayName;
const _a = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  tt.SubContent,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
_a.displayName = tt.SubContent.displayName;
const Jt = b.forwardRef(({ className: e, sideOffset: t = 4, children: n, ...r }, a) => {
  const s = wt();
  return /* @__PURE__ */ o(tt.Portal, { children: /* @__PURE__ */ o(
    tt.Content,
    {
      ref: a,
      sideOffset: t,
      className: m(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...r,
      children: /* @__PURE__ */ o("div", { dir: s, children: n })
    }
  ) });
});
Jt.displayName = tt.Content.displayName;
const pn = b.forwardRef(({ className: e, inset: t, ...n }, r) => {
  const a = wt(), s = _t();
  return /* @__PURE__ */ o(
    tt.Item,
    {
      ref: r,
      className: m(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        e,
        Lt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
pn.displayName = tt.Item.displayName;
const Ht = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => {
  const s = _t();
  return /* @__PURE__ */ p(
    tt.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Lt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
Ht.displayName = tt.CheckboxItem.displayName;
const Ca = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = _t();
  return /* @__PURE__ */ p(
    tt.RadioItem,
    {
      ref: r,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Lt({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(hn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
Ca.displayName = tt.RadioItem.displayName;
const nn = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  tt.Label,
  {
    ref: r,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
nn.displayName = tt.Label.displayName;
const Ie = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  tt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Ie.displayName = tt.Separator.displayName;
function Uw({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
Uw.displayName = "DropdownMenuShortcut";
function no({
  comment: e,
  isReply: t = !1,
  isEditable: n = !1,
  localizedStrings: r,
  isThreadExpanded: a = !1,
  threadStatus: s = "Unspecified",
  handleResolveCommentThread: i,
  handleUpdateComment: l,
  handleDeleteComment: c,
  onEditingChange: w
}) {
  const [d, f] = V(!1), [h, u] = V(), g = rt(null);
  W(() => {
    if (!d) return;
    let _ = !0;
    const C = g.current;
    if (!C) return;
    const T = setTimeout(() => {
      _ && $w(C);
    }, 300);
    return () => {
      _ = !1, clearTimeout(T);
    };
  }, [d]);
  const v = j(() => {
    f(!1), u(void 0), w == null || w(!1);
  }, [w]), x = j(async () => {
    if (!h || !l) return;
    await l(
      e.id,
      nr(h)
    ) && (f(!1), u(void 0), w == null || w(!1));
  }, [h, l, e.id, w]), O = B(() => {
    const _ = new Date(e.date), C = qs(
      _,
      r["%comment_date_today%"],
      r["%comment_date_yesterday%"]
    ), T = _.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return fe(r["%comment_dateAtTime%"], {
      date: C,
      time: T
    });
  }, [e.date, r]), y = B(() => e.user, [e.user]), N = B(
    () => e.user.split(" ").map((_) => _[0]).join("").toUpperCase().slice(0, 2),
    [e.user]
  ), k = B(
    () => Js($r(e.contents)),
    [e.contents]
  ), R = B(() => {
    if (a && n)
      return /* @__PURE__ */ p(at, { children: [
        !Ws(e.contents) && /* @__PURE__ */ p(
          pn,
          {
            onClick: () => {
              f(!0), u(Pw($r(e.contents))), w == null || w(!0);
            },
            children: [
              /* @__PURE__ */ o(bs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              r["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          pn,
          {
            onClick: async () => {
              c && await c(e.id);
            },
            children: [
              /* @__PURE__ */ o(vs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              r["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    n,
    a,
    r,
    e.contents,
    e.id,
    c,
    w
  ]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": t
      }),
      children: [
        /* @__PURE__ */ o(xa, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ o(ya, { className: "tw-text-xs tw-font-medium", children: N }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ o("p", { className: "tw-text-sm tw-font-medium", children: y }),
            /* @__PURE__ */ o("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: O })
          ] }),
          d && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: g,
              onKeyDownCapture: (_) => {
                _.key === "Escape" ? (_.preventDefault(), _.stopPropagation(), v()) : _.key === "Enter" && _.shiftKey && (_.preventDefault(), _.stopPropagation(), zt(h) && x());
              },
              onKeyDown: (_) => {
                ga(_), (_.key === "Enter" || _.key === " ") && _.stopPropagation();
              },
              children: [
                /* @__PURE__ */ o(
                  er,
                  {
                    editorSerializedState: h,
                    onSerializedChange: (_) => u(_)
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ o(
                    L,
                    {
                      size: "icon",
                      onClick: v,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ o(Ze, {})
                    }
                  ),
                  /* @__PURE__ */ o(
                    L,
                    {
                      size: "icon",
                      onClick: x,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !zt(h),
                      children: /* @__PURE__ */ o(wo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ p(at, { children: [
            e.status === "Resolved" && /* @__PURE__ */ o("div", { className: "tw-text-sm tw-italic", children: r["%comment_status_resolved%"] }),
            e.status === "Todo" && /* @__PURE__ */ o("div", { className: "tw-text-sm tw-italic", children: r["%comment_status_todo%"] }),
            /* @__PURE__ */ o(
              "div",
              {
                className: m(
                  "tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",
                  // tw-prose has a max width defined on it, that we choose to override
                  "tw-max-w-none",
                  {
                    "tw-line-clamp-3": !a
                  }
                ),
                dangerouslySetInnerHTML: { __html: k }
              }
            )
          ] })
        ] }),
        a && !t && s !== "Resolved" && i && /* @__PURE__ */ o(
          L,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-shrink-0",
            onClick: (_) => {
              _.stopPropagation(), i(e.thread, !0);
            },
            children: /* @__PURE__ */ o(Rt, {})
          }
        ),
        R && /* @__PURE__ */ p(pe, { children: [
          /* @__PURE__ */ o(Oe, { asChild: !0, children: /* @__PURE__ */ o(L, { variant: "ghost", size: "icon", children: /* @__PURE__ */ o(co, {}) }) }),
          /* @__PURE__ */ o(Jt, { align: "end", children: R })
        ] })
      ]
    }
  );
}
const $n = {
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
function Yw({
  comments: e,
  localizedStrings: t,
  isSelected: n = !1,
  verseRef: r,
  assignedUser: a,
  currentUser: s,
  handleSelectThread: i,
  threadId: l,
  threadStatus: c,
  handleResolveCommentThread: w,
  handleAddComment: d,
  handleUpdateComment: f,
  handleDeleteComment: h
}) {
  const [u, g] = V($n), [v, x] = V(!1), [O, y] = V(!1), [N, k] = V(!1), [R, _] = V(!1), C = B(() => e.filter((M) => !M.deleted), [e]), T = B(() => C[0], [C]), E = rt(null), S = rt(void 0);
  W(() => {
    const M = E.current;
    if (!M) return;
    const st = () => {
      y(M.scrollWidth > M.clientWidth);
    };
    return st(), window.addEventListener("resize", st), () => window.removeEventListener("resize", st);
  }, [T == null ? void 0 : T.verse]), W(() => {
    k(!1);
  }, [n]);
  const $ = B(
    () => ({
      singleReply: t["%comment_thread_single_reply%"],
      multipleReplies: t["%comment_thread_multiple_replies%"]
    }),
    [t]
  ), z = B(
    () => a ? fe(t["%comment_assigned_to%"], { assignedUser: a }) : void 0,
    [a, t]
  ), H = B(() => C.slice(1), [C]), I = B(() => H.length ?? 0, [H.length]), Z = B(() => I > 0, [I]), A = B(() => N || I <= 2 ? H : H.slice(-2), [H, I, N]), Q = B(() => N || I <= 2 ? 0 : I - 2, [I, N]), yt = B(
    () => I === 1 ? $.singleReply : fe($.multipleReplies, { count: I }),
    [I, $]
  ), Bt = B(
    () => Q === 1 ? $.singleReply : fe($.multipleReplies, { count: Q }),
    [Q, $]
  ), Ct = j(async () => {
    var st;
    await d(l, nr(u)) && ((st = S.current) == null || st.call(S), g($n));
  }, [u, d, l]), P = j(
    async (M, st) => {
      var Ae;
      if (!w) return !1;
      const ct = zt(u) ? nr(u) : void 0, vt = await w(M, st, ct);
      return vt && ct && ((Ae = S.current) == null || Ae.call(S), g($n)), vt;
    },
    [u, w]
  );
  return /* @__PURE__ */ o(
    ba,
    {
      role: "option",
      "aria-selected": n,
      id: l,
      className: m(
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
      children: /* @__PURE__ */ p(va, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          z && /* @__PURE__ */ o(Ye, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: z }),
          /* @__PURE__ */ p("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: [
            /* @__PURE__ */ p(
              "p",
              {
                ref: E,
                className: m(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": v
                  },
                  { "tw-whitespace-nowrap": !v }
                ),
                children: [
                  r,
                  " ",
                  T.verse
                ]
              }
            ),
            O && /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "icon",
                onClick: (M) => {
                  M.stopPropagation(), x(!v);
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": v ? "Collapse text" : "Expand text",
                children: v ? /* @__PURE__ */ o(Fn, {}) : /* @__PURE__ */ o(se, {})
              }
            )
          ] }),
          /* @__PURE__ */ o(
            no,
            {
              comment: T,
              localizedStrings: t,
              isThreadExpanded: n,
              threadStatus: c,
              isEditable: C.length === 1 && (T == null ? void 0 : T.user) === s,
              handleResolveCommentThread: P,
              handleUpdateComment: f,
              handleDeleteComment: h,
              onEditingChange: _
            }
          )
        ] }),
        /* @__PURE__ */ p(at, { children: [
          Z && !n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ o("div", { className: "tw-w-8", children: /* @__PURE__ */ o(ye, {}) }),
            /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: yt })
          ] }),
          !n && zt(u) && /* @__PURE__ */ o(
            er,
            {
              editorSerializedState: u,
              onSerializedChange: (M) => g(M),
              placeholder: t["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ p(at, { children: [
            Q > 0 && /* @__PURE__ */ p(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (M) => {
                  M.stopPropagation(), k(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (M) => {
                  (M.key === "Enter" || M.key === " ") && (M.preventDefault(), M.stopPropagation(), k(!0));
                },
                children: [
                  /* @__PURE__ */ o("div", { className: "tw-w-8", children: /* @__PURE__ */ o(ye, {}) }),
                  /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: Bt }),
                    N ? /* @__PURE__ */ o(Fn, {}) : /* @__PURE__ */ o(se, {})
                  ] })
                ]
              }
            ),
            A.map((M) => {
              const ct = M.id === H[H.length - 1].id && M.user === s;
              return /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
                no,
                {
                  comment: M,
                  localizedStrings: t,
                  isReply: !0,
                  isThreadExpanded: n,
                  isEditable: ct,
                  handleUpdateComment: f,
                  handleDeleteComment: h,
                  onEditingChange: _
                }
              ) }, M.id);
            }),
            (!R || zt(u)) && /* @__PURE__ */ p(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (M) => M.stopPropagation(),
                onKeyDownCapture: (M) => {
                  M.key === "Enter" && M.shiftKey && (M.preventDefault(), M.stopPropagation(), zt(u) && Ct());
                },
                onKeyDown: (M) => {
                  ga(M), (M.key === "Enter" || M.key === " ") && M.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ o(
                    er,
                    {
                      editorSerializedState: u,
                      onSerializedChange: (M) => g(M),
                      placeholder: c === "Resolved" ? t["%comment_reopenResolved%"] : t["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (M) => {
                        S.current = M;
                      }
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                    /* @__PURE__ */ o(
                      L,
                      {
                        size: "icon",
                        variant: "outline",
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !zt(u),
                        children: /* @__PURE__ */ o(xs, {})
                      }
                    ),
                    /* @__PURE__ */ o(
                      L,
                      {
                        size: "icon",
                        onClick: Ct,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !zt(u),
                        children: /* @__PURE__ */ o(wo, {})
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
function bp({
  className: e = "",
  threads: t,
  currentUser: n,
  localizedStrings: r,
  handleAddComment: a,
  handleResolveCommentThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l
}) {
  const [c, w] = V(), d = t.filter(
    (y) => y.comments.some((N) => !N.deleted)
  ), f = d.map((y) => ({
    id: y.id
  })), h = j((y) => {
    w(y.id);
  }, []), u = j((y) => {
    w(y);
  }, []), { listboxRef: g, activeId: v, handleKeyDown: x } = Sl({
    options: f,
    onOptionSelect: h
  }), O = j(
    (y) => {
      y.key === "Escape" ? (w(void 0), y.preventDefault(), y.stopPropagation()) : x(y);
    },
    [x]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: g,
      "aria-activedescendant": v ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        e
      ),
      onKeyDown: O,
      children: d.map((y) => /* @__PURE__ */ o(
        "div",
        {
          className: m({
            "tw-opacity-60": y.status === "Resolved"
          }),
          children: /* @__PURE__ */ o(
            Yw,
            {
              comments: y.comments,
              localizedStrings: r,
              verseRef: y.verseRef,
              handleSelectThread: u,
              threadId: y.id,
              isSelected: c === y.id,
              currentUser: n,
              assignedUser: y.assignedUser,
              threadStatus: y.status,
              handleAddComment: a,
              handleResolveCommentThread: s,
              handleUpdateComment: i,
              handleDeleteComment: l
            }
          )
        },
        y.id
      ))
    }
  );
}
function qw({ table: e }) {
  return /* @__PURE__ */ p(pe, { children: [
    /* @__PURE__ */ o(Fi, { asChild: !0, children: /* @__PURE__ */ p(L, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ o(ys, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(Jt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ o(nn, { children: "Toggle columns" }),
      /* @__PURE__ */ o(Ie, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ o(
        Ht,
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
const Ne = ot.Root, Jw = ot.Group, ke = ot.Value, Ww = qt(
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
), le = b.forwardRef(({ className: e, children: t, size: n, ...r }, a) => {
  const s = wt();
  return /* @__PURE__ */ p(
    ot.Trigger,
    {
      className: m(Ww({ size: n, className: e })),
      ref: a,
      ...r,
      dir: s,
      children: [
        t,
        /* @__PURE__ */ o(ot.Icon, { asChild: !0, children: /* @__PURE__ */ o(se, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
le.displayName = ot.Trigger.displayName;
const Ea = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ot.ScrollUpButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ o(Fn, { className: "tw-h-4 tw-w-4" })
  }
));
Ea.displayName = ot.ScrollUpButton.displayName;
const Sa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ot.ScrollDownButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ o(se, { className: "tw-h-4 tw-w-4" })
  }
));
Sa.displayName = ot.ScrollDownButton.displayName;
const we = b.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, a) => {
  const s = wt();
  return /* @__PURE__ */ o(ot.Portal, { children: /* @__PURE__ */ p(
    ot.Content,
    {
      ref: a,
      className: m(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ o(Ea, {}),
        /* @__PURE__ */ o(
          ot.Viewport,
          {
            className: m(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ o("div", { dir: s, children: t })
          }
        ),
        /* @__PURE__ */ o(Sa, {})
      ]
    }
  ) });
});
we.displayName = ot.Content.displayName;
const Zw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ot.Label,
  {
    ref: n,
    className: m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
Zw.displayName = ot.Label.displayName;
const xt = b.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ p(
  ot.Item,
  {
    ref: r,
    className: m(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(ot.ItemIndicator, { children: /* @__PURE__ */ o(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ o(ot.ItemText, { children: t })
    ]
  }
));
xt.displayName = ot.Item.displayName;
const Qw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ot.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Qw.displayName = ot.Separator.displayName;
function tc({ table: e }) {
  return /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ o("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ p(
        Ne,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ o(le, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ o(ke, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ o(we, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ o(xt, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ p(
        L,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ o(Ns, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        L,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ o(ks, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        L,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ o(_s, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        L,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ o(Cs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const ro = `
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
function ec(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function qe(e, t) {
  const n = t ? `${ro}, ${t}` : ro;
  return Array.from(e.querySelectorAll(n)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && ec(r)
  );
}
const yn = b.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        qe(i, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
          d.setAttribute("tabindex", "-1");
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
        i.preventDefault(), qe(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return /* @__PURE__ */ o("div", { className: m("pr-twp tw-relative tw-w-full", { "tw-p-1": t }), children: /* @__PURE__ */ o(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
      ref: a,
      className: m(
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
yn.displayName = "Table";
const Nn = b.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ o(
  "thead",
  {
    ref: r,
    className: m(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": t
      },
      "[&_tr]:tw-border-b",
      e
    ),
    ...n
  }
));
Nn.displayName = "TableHeader";
const kn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("tbody", { ref: n, className: m("[&_tr:last-child]:tw-border-0", e), ...t }));
kn.displayName = "TableBody";
const nc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "tfoot",
  {
    ref: n,
    className: m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
nc.displayName = "TableFooter";
function rc(e) {
  b.useEffect(() => {
    const t = e.current;
    if (!t) return;
    const n = (r) => {
      if (t.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const a = e.current ? qe(e.current) : [], s = a.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function oc(e, t, n) {
  let r;
  return n === "ArrowLeft" && t > 0 ? r = e[t - 1] : n === "ArrowRight" && t < e.length - 1 && (r = e[t + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ac(e, t, n) {
  let r;
  return n === "ArrowDown" && t < e.length - 1 ? r = e[t + 1] : n === "ArrowUp" && t > 0 && (r = e[t - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
const It = b.forwardRef(({ className: e, onKeyDown: t, onSelect: n, setFocusAlsoRunsSelect: r = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), rc(i);
  const l = b.useMemo(
    () => i.current ? qe(i.current) : [],
    [i]
  ), c = b.useCallback(
    (d) => {
      const { current: f } = i;
      if (!f || !f.parentElement) return;
      const h = f.closest("table"), u = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        qe(h).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], g = u.indexOf(f), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), ac(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), oc(l, v, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const x = f.closest("table");
        x && x.focus();
      }
      t == null || t(d);
    },
    [i, l, t]
  ), w = b.useCallback(
    (d) => {
      r && (n == null || n(d));
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
      className: m(
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
It.displayName = "TableRow";
const Je = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "th",
  {
    ref: n,
    className: m(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...t
  }
));
Je.displayName = "TableHead";
const ae = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "td",
  {
    ref: n,
    className: m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
ae.displayName = "TableCell";
const sc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "caption",
  {
    ref: n,
    className: m("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
sc.displayName = "TableCaption";
function rr({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", e),
      ...t
    }
  );
}
function ic({
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
  var _;
  const [d, f] = V([]), [h, u] = V([]), [g, v] = V({}), [x, O] = V({}), y = B(() => t ?? [], [t]), N = Ro({
    data: y,
    columns: e,
    getCoreRowModel: Oo(),
    ...n && { getPaginationRowModel: Hi() },
    onSortingChange: f,
    getSortedRowModel: Do(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Gi(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: O,
    state: {
      sorting: d,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: x
    }
  }), k = N.getVisibleFlatColumns();
  let R;
  return c ? R = Array.from({ length: 10 }).map((E, S) => `skeleton-row-${S}`).map((E) => /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o(ae, { colSpan: k.length ?? e.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ o("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ o(rr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, E)) : ((_ = N.getRowModel().rows) == null ? void 0 : _.length) > 0 ? R = N.getRowModel().rows.map((C) => /* @__PURE__ */ o(
    It,
    {
      onClick: () => i(C, N),
      "data-state": C.getIsSelected() && "selected",
      children: C.getVisibleCells().map((T) => /* @__PURE__ */ o(ae, { children: je(T.column.columnDef.cell, T.getContext()) }, T.id))
    },
    C.id
  )) : R = /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o(ae, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ o(qw, { table: N }),
    /* @__PURE__ */ p(yn, { stickyHeader: s, children: [
      /* @__PURE__ */ o(Nn, { stickyHeader: s, children: N.getHeaderGroups().map((C) => /* @__PURE__ */ o(It, { children: C.headers.map((T) => /* @__PURE__ */ o(Je, { children: T.isPlaceholder ? void 0 : je(T.column.columnDef.header, T.getContext()) }, T.id)) }, C.id)) }),
      /* @__PURE__ */ o(kn, { children: R })
    ] }),
    n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ o(
        L,
        {
          variant: "outline",
          size: "sm",
          onClick: () => N.previousPage(),
          disabled: !N.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o(
        L,
        {
          variant: "outline",
          size: "sm",
          onClick: () => N.nextPage(),
          disabled: !N.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ o(tc, { table: N })
  ] });
}
function vp({
  id: e,
  markdown: t,
  className: n,
  anchorTarget: r,
  truncate: a
}) {
  const s = B(
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
      className: m(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ o(Ui, { options: s, children: t })
    }
  );
}
const lc = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), oo = (e, t) => e[t] ?? t;
function wc({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  id: r
}) {
  const a = oo(n, "%webView_error_dump_header%"), s = oo(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(e), t && t();
  }
  return /* @__PURE__ */ p(
    "div",
    {
      id: r,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ p("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ p("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ o("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ o("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ o(L, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ o(po, {}) })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ o("pre", { className: "tw-text-xs", children: e }) })
      ]
    }
  );
}
const xp = Object.freeze([
  ...lc,
  "%webView_error_dump_copied_message%"
]);
function yp({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  children: r,
  className: a,
  id: s
}) {
  const [i, l] = V(!1), c = () => {
    l(!0), t && t();
  };
  return /* @__PURE__ */ p(Re, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ o(De, { asChild: !0, children: r }),
    /* @__PURE__ */ p(de, { id: s, className: m("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ o(lt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ o(
        wc,
        {
          errorDetails: e,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var cc = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(cc || {});
function Np({ id: e, label: t, groups: n }) {
  const [r, a] = V(
    Object.fromEntries(
      n.map(
        (w, d) => w.itemType === 0 ? [d, []] : void 0
      ).filter((w) => !!w)
    )
  ), [s, i] = V({}), l = (w, d) => {
    const f = !r[w][d];
    a((u) => (u[w][d] = f, { ...u }));
    const h = n[w].items[d];
    h.onUpdate(h.id, f);
  }, c = (w, d) => {
    i((h) => (h[w] = d, { ...h }));
    const f = n[w].items.find((h) => h.id === d);
    f ? f.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ o("div", { id: e, children: /* @__PURE__ */ p(pe, { children: [
    /* @__PURE__ */ o(Oe, { asChild: !0, children: /* @__PURE__ */ p(L, { variant: "default", children: [
      /* @__PURE__ */ o(Es, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      t,
      /* @__PURE__ */ o(se, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ o(Jt, { children: n.map((w, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o(nn, { children: w.label }),
      /* @__PURE__ */ o(Na, { children: w.itemType === 0 ? /* @__PURE__ */ o(at, { children: w.items.map((f, h) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
        Ht,
        {
          checked: r[d][h],
          onCheckedChange: () => l(d, h),
          children: f.label
        }
      ) }, f.id)) }) : /* @__PURE__ */ o(
        Kw,
        {
          value: s[d],
          onValueChange: (f) => c(d, f),
          children: w.items.map((f) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Ca, { value: f.id, children: f.label }) }, f.id))
        }
      ) }),
      /* @__PURE__ */ o(Ie, {})
    ] }, w.label)) })
  ] }) });
}
function kp({
  id: e,
  category: t,
  downloads: n,
  languages: r,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const c = new Zs("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((d, f) => d + f, 0)), w = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ p(
    "div",
    {
      id: e,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        t && /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ o("div", { className: "tw-flex", children: /* @__PURE__ */ o("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: t }) }),
          /* @__PURE__ */ o("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ o(Ss, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ o("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c })
          ] }),
          /* @__PURE__ */ o("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ o("div", { className: "tw-flex tw-gap-2", children: r.slice(0, 3).map((d) => /* @__PURE__ */ o("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: d.toUpperCase() }, d)) }),
          r.length > 3 && /* @__PURE__ */ p(
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
        (a || i) && /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ o("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            L,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ o(Ts, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ o("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            L,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ o(Rs, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function dc({ id: e, versionHistory: t }) {
  const [n, r] = V(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), d = w.getUTCFullYear() - 1970, f = w.getUTCMonth(), h = w.getUTCDate() - 1;
    let u = "";
    return d > 0 ? u = `${d.toString()} year${d === 1 ? "" : "s"} ago` : f > 0 ? u = `${f.toString()} month${f === 1 ? "" : "s"} ago` : h === 0 ? u = "today" : u = `${h.toString()} day${h === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ p("div", { className: "pr-twp", id: e, children: [
    /* @__PURE__ */ o("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ o("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ p("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ o("div", { className: "tw-text-foreground", children: /* @__PURE__ */ o("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ o("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ p("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ p("div", { children: [
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
function _p({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: r,
  versionHistory: a,
  currentVersion: s
}) {
  const i = B(() => Qs(n), [n]), c = ((w) => {
    const d = new Intl.DisplayNames(ti(), { type: "language" });
    return w.map((f) => d.of(f));
  })(r);
  return /* @__PURE__ */ o("div", { id: e, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ o(dc, { versionHistory: a }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ o("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ p("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Publisher" }),
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ o("span", { children: "Size" }),
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ p("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ o("span", { children: "Version" }),
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ o("span", { children: "Languages" }),
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function pc({
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
  onOpenChange: d = void 0,
  isDisabled: f = !1,
  sortSelected: h = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: x
}) {
  const [O, y] = V(!1), N = j(
    (S) => {
      var z;
      const $ = (z = e.find((H) => H.label === S)) == null ? void 0 : z.value;
      $ && n(
        t.includes($) ? t.filter((H) => H !== $) : [...t, $]
      );
    },
    [e, t, n]
  ), k = () => c || r, R = B(() => {
    if (!h) return e;
    const S = e.filter((z) => z.starred).sort((z, H) => z.label.localeCompare(H.label)), $ = e.filter((z) => !z.starred).sort((z, H) => {
      const I = t.includes(z.value), Z = t.includes(H.value);
      return I && !Z ? -1 : !I && Z ? 1 : z.label.localeCompare(H.label);
    });
    return [...S, ...$];
  }, [e, t, h]), _ = () => {
    n(e.map((S) => S.value));
  }, C = () => {
    n([]);
  }, T = w ?? O;
  return /* @__PURE__ */ o("div", { id: x, className: g, children: /* @__PURE__ */ p(Re, { open: T, onOpenChange: d ?? y, children: [
    /* @__PURE__ */ o(De, { asChild: !0, children: /* @__PURE__ */ p(
      L,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": T,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: f,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ o("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ o("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: k()
              }
            )
          ] }),
          /* @__PURE__ */ o(uo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(de, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(Ee, { children: [
      /* @__PURE__ */ o(en, { placeholder: `Search ${r.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: _, children: s }),
        /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: C, children: i })
      ] }),
      /* @__PURE__ */ p(Se, { children: [
        /* @__PURE__ */ o(bn, { children: l }),
        /* @__PURE__ */ o(Kt, { children: R.map((S) => /* @__PURE__ */ p(
          ce,
          {
            value: S.label,
            onSelect: N,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Rt,
                {
                  className: m(
                    "tw-h-4 tw-w-4",
                    t.includes(S.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ o(Ds, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ o("div", { className: "tw-flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw-text-end tw-text-muted-foreground", children: S.secondaryLabel })
            ]
          },
          S.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Cp({
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
  badgesPlaceholder: d,
  id: f
}) {
  return /* @__PURE__ */ p("div", { id: f, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ o(
      pc,
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
    t.length > 0 ? /* @__PURE__ */ o("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: t.map((h) => {
      var u;
      return /* @__PURE__ */ p(Ye, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ o(
          L,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(t.filter((g) => g !== h)),
            children: /* @__PURE__ */ o(Ze, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = e.find((g) => g.value === h)) == null ? void 0 : u.label
      ] }, h);
    }) }) : /* @__PURE__ */ o(lt, { children: d })
  ] });
}
const Me = b.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ o(
    "input",
    {
      type: t,
      className: m(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Me.displayName = "Input";
const uc = (e, t, n) => e === "generated" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_generated%"]
] }) : e === "hidden" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o("p", { children: n }),
  " ",
  t["%footnoteEditor_callerDropdown_item_custom%"]
] });
function mc({
  callerType: e,
  updateCallerType: t,
  customCaller: n,
  updateCustomCaller: r,
  localizedStrings: a
}) {
  const [s, i] = V(e), [l, c] = V(n);
  return W(() => {
    i(e);
  }, [e]), W(() => {
    l !== n && c(n);
  }, [n]), /* @__PURE__ */ p(pe, { onOpenChange: (d) => {
    d || (s !== "custom" || l ? (t(s), r(l)) : (i(e), c(n)));
  }, children: [
    /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ p(Ft, { children: [
      /* @__PURE__ */ o(oe, { asChild: !0, children: /* @__PURE__ */ o(Oe, { asChild: !0, children: /* @__PURE__ */ o(L, { variant: "outline", className: "tw-h-6", children: uc(e, a, n) }) }) }),
      /* @__PURE__ */ o(At, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(Jt, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ o(nn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
      /* @__PURE__ */ o(Ie, {}),
      /* @__PURE__ */ o(
        Ht,
        {
          checked: s === "generated",
          onCheckedChange: () => i("generated"),
          children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
            /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
            /* @__PURE__ */ o("span", { className: "tw-w-10 tw-text-center", children: Xn })
          ] })
        }
      ),
      /* @__PURE__ */ o(
        Ht,
        {
          checked: s === "hidden",
          onCheckedChange: () => i("hidden"),
          children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
            /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
            /* @__PURE__ */ o("span", { className: "tw-w-10 tw-text-center", children: Kn })
          ] })
        }
      ),
      /* @__PURE__ */ o(
        Ht,
        {
          checked: s === "custom",
          onCheckedChange: () => i("custom"),
          onSelect: (d) => d.preventDefault(),
          children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
            /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
            /* @__PURE__ */ o(
              Me,
              {
                className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                value: l,
                maxLength: 1,
                onChange: (d) => c(d.target.value)
              }
            )
          ] })
        }
      )
    ] })
  ] });
}
const hc = (e, t) => e === "f" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o(mo, {}),
  " ",
  t["%footnoteEditor_noteType_footnote_label%"]
] }) : e === "fe" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o(ho, {}),
  " ",
  t["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ o(Os, {}),
  " ",
  t["%footnoteEditor_noteType_crossReference_label%"]
] }), fc = (e, t) => {
  if (e === "x")
    return t["%footnoteEditor_noteType_crossReference_label%"];
  let n = t["%footnoteEditor_noteType_endNote_label%"];
  return e === "f" && (n = t["%footnoteEditor_noteType_footnote_label%"]), fe(t["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function gc({
  noteType: e,
  handleNoteTypeChange: t,
  localizedStrings: n
}) {
  return /* @__PURE__ */ p(pe, { children: [
    /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ p(Ft, { children: [
      /* @__PURE__ */ o(Vi, { asChild: !0, children: /* @__PURE__ */ o(Oe, { asChild: !0, children: /* @__PURE__ */ o(
        L,
        {
          variant: "outline",
          className: "tw-h-6 disabled:tw-pointer-events-auto",
          disabled: e === "x",
          children: hc(e, n)
        }
      ) }) }),
      /* @__PURE__ */ o(At, { children: /* @__PURE__ */ o("p", { children: fc(e, n) }) })
    ] }) }),
    e !== "x" && /* @__PURE__ */ p(Jt, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ o(nn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ o(Ie, {}),
      /* @__PURE__ */ p(
        Ht,
        {
          checked: e === "f",
          onCheckedChange: () => t("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ o(mo, {}),
            /* @__PURE__ */ o("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        Ht,
        {
          checked: e === "fe",
          onCheckedChange: () => t("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ o(ho, {}),
            /* @__PURE__ */ o("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
function Ep({
  noteOps: e,
  onSave: t,
  onClose: n,
  scrRef: r,
  noteKey: a,
  editorOptions: s,
  localizedStrings: i
}) {
  const l = rt(null), c = ds(), [w, d] = V("generated"), [f, h] = V("*"), [u, g] = V("f"), v = B(
    () => ({
      ...s,
      markerMenuTrigger: s.markerMenuTrigger ?? "\\",
      hasExternalUI: !0,
      view: { ...s.view ?? Yi(), noteMode: "expanded" }
    }),
    [s]
  );
  W(() => {
    var N;
    (N = l.current) == null || N.focus();
  }), W(() => {
    var R, _;
    let N;
    const k = e == null ? void 0 : e.at(0);
    if (k && Tn("note", k)) {
      const C = (R = k.insert.note) == null ? void 0 : R.caller;
      let T = "custom";
      C === Xn ? T = "generated" : C === Kn ? T = "hidden" : C && h(C), d(T), g(((_ = k.insert.note) == null ? void 0 : _.style) ?? "f"), k.insert.note && (k.insert.note.caller = ""), N = setTimeout(() => {
        var E;
        (E = l.current) == null || E.applyUpdate([{ delete: 1 }, k]);
      }, 0);
    }
    return () => {
      N && clearTimeout(N);
    };
  }, [e, a]);
  const x = j(() => {
    var k, R;
    const N = (R = (k = l.current) == null ? void 0 : k.getNoteOps(0)) == null ? void 0 : R.at(0);
    N && Tn("note", N) && (N.insert.note && (w === "custom" ? N.insert.note.caller = f : N.insert.note.caller = w === "generated" ? Xn : Kn), t([N]));
  }, [w, f, t]), O = () => {
    var k;
    const N = (k = c.current) == null ? void 0 : k.getElementsByClassName("editor-input")[0];
    N != null && N.textContent && navigator.clipboard.writeText(N.textContent);
  };
  return /* @__PURE__ */ p("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
        /* @__PURE__ */ o(
          gc,
          {
            noteType: u,
            handleNoteTypeChange: (N) => {
              var R, _, C;
              g(N);
              const k = (_ = (R = l.current) == null ? void 0 : R.getNoteOps(0)) == null ? void 0 : _.at(0);
              k && Tn("note", k) && (k.insert.note && (k.insert.note.style = N), (C = l.current) == null || C.applyUpdate([{ delete: 1 }, k]));
            },
            localizedStrings: i
          }
        ),
        /* @__PURE__ */ o(
          mc,
          {
            callerType: w,
            updateCallerType: d,
            customCaller: f,
            updateCustomCaller: h,
            localizedStrings: i
          }
        )
      ] }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
        /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ p(Ft, { children: [
          /* @__PURE__ */ o(oe, { asChild: !0, children: /* @__PURE__ */ o(L, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ o(Ze, {}) }) }),
          /* @__PURE__ */ o(At, { children: /* @__PURE__ */ o("p", { children: i["%footnoteEditor_cancelButton_tooltip%"] }) })
        ] }) }),
        /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ p(Ft, { children: [
          /* @__PURE__ */ o(oe, { asChild: !0, children: /* @__PURE__ */ o(
            L,
            {
              onClick: x,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              children: /* @__PURE__ */ o(Rt, {})
            }
          ) }),
          /* @__PURE__ */ o(At, { children: i["%footnoteEditor_saveButton_tooltip%"] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ p(
      "div",
      {
        ref: c,
        className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
        children: [
          /* @__PURE__ */ o(qi, { options: v, onScrRefChange: () => {
          }, scrRef: r, ref: l }),
          /* @__PURE__ */ o("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ o(Mt, { children: /* @__PURE__ */ p(Ft, { children: [
            /* @__PURE__ */ o(oe, { asChild: !0, children: /* @__PURE__ */ o(L, { onClick: O, className: "tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(po, {}) }) }),
            /* @__PURE__ */ o(At, { children: /* @__PURE__ */ o("p", { children: i["%footnoteEditor_copyButton_tooltip%"] }) })
          ] }) }) })
        ]
      }
    )
  ] });
}
const Sp = Object.freeze([
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
function Ta(e, t) {
  if (!t || t.length === 0) return e ?? "empty";
  const n = t.find((a) => typeof a == "string");
  if (n)
    return `key-${e ?? "unknown"}-${n.slice(0, 10)}`;
  const r = typeof t[0] == "string" ? "impossible" : t[0].marker ?? "unknown";
  return `key-${e ?? "unknown"}-${r}`;
}
function bc(e, t, n = !0, r = void 0) {
  if (!t || t.length === 0) return;
  const a = [], s = [];
  let i = [];
  return t.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, c) => {
    const w = c === s.length - 1;
    return /* @__PURE__ */ p("p", { className: "tw-mb-2", children: [
      Cr(e, l, n, !0, a),
      w && r
    ] }, Ta(e, l));
  });
}
function Cr(e, t, n = !0, r = !0, a = []) {
  if (!(!t || t.length === 0))
    return t.map((s) => {
      if (typeof s == "string") {
        const i = `${e}-text-${s.slice(0, 10)}`;
        if (r) {
          const l = m(`usfm_${e}`);
          return /* @__PURE__ */ o("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ o(Gn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ o("span", { children: s }),
              /* @__PURE__ */ o(Gn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return vc(
        s,
        Ta(`${e}\\${s.marker}`, [s]),
        n,
        [...a, e ?? "unknown"]
      );
    });
}
function vc(e, t, n, r = []) {
  const { marker: a } = e;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ o("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ o(
      Gn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Cr(a, e.content, n, !0, [
      ...r,
      a ?? "unknown"
    ])
  ] }, t);
}
function xc({
  footnote: e,
  layout: t = "horizontal",
  formatCaller: n,
  showMarkers: r = !0
}) {
  const a = n ? n(e.caller) : e.caller, s = a !== e.caller;
  let i, l = e.content;
  Array.isArray(e.content) && e.content.length > 0 && typeof e.content[0] != "string" && (e.content[0].marker === "fr" || e.content[0].marker === "xo") && ([i, ...l] = e.content);
  const c = r ? /* @__PURE__ */ o("span", { className: "marker", children: `\\${e.marker} ` }) : void 0, w = r ? /* @__PURE__ */ o("span", { className: "marker", children: ` \\${e.marker}*` }) : void 0, d = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ p("span", { className: m("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), f = i && /* @__PURE__ */ p(at, { children: [
    Cr(e.marker, [i], r, !1),
    " "
  ] }), h = t === "horizontal" ? "horizontal" : "vertical", u = r ? "marker-visible" : "", g = t === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", v = m(h, u);
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: m(
          "textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap tw-pr-2",
          v
        ),
        children: [
          c,
          d
        ]
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: m(
          "textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap tw-pr-2",
          v
        ),
        children: f
      }
    ),
    /* @__PURE__ */ o("div", { className: m("textual-note-body tw-pr-0.5", g, v), children: l && l.length > 0 && /* @__PURE__ */ o(at, { children: bc(e.marker, l, r, w) }) })
  ] });
}
const Tp = ["%webView_footnoteList_header%"], yc = (e, t) => e[t] ?? t;
function Rp({
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
  localizedStrings: d
}) {
  const f = d ? yc(d, "%webView_footnoteList_header%") : "Footnotes", h = c ?? ei(n, void 0), u = (k, R) => {
    w == null || w(k, R, a);
  }, g = s ? n.findIndex((k) => k === s) : 0, [v, x] = V(g), O = (k, R, _) => {
    if (n.length)
      switch (k.key) {
        case "Enter":
        case " ":
          k.preventDefault(), w == null || w(R, _, a);
          break;
      }
  }, y = (k) => {
    if (n.length)
      switch (k.key) {
        case "ArrowDown":
          k.preventDefault(), x((R) => Math.min(R + 1, n.length - 1));
          break;
        case "ArrowUp":
          k.preventDefault(), x((R) => Math.max(R - 1, 0));
          break;
      }
  }, N = rt([]);
  return W(() => {
    var k;
    v >= 0 && v < N.current.length && ((k = N.current[v]) == null || k.focus());
  }, [v]), /* @__PURE__ */ p(at, { children: [
    r === "vertical" && /* @__PURE__ */ o("h2", { className: "tw-mb-1 tw-font-semibold", children: f }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "listbox",
        "aria-label": "Footnotes",
        tabIndex: 0,
        className: m("tw-h-full tw-overflow-y-auto", e),
        onKeyDown: y,
        children: /* @__PURE__ */ o(
          "ul",
          {
            className: m(
              "tw-p-0.5 tw-pt-1",
              "tw-grid",
              r === "horizontal" ? "tw-grid-cols-3 tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-2 tw-grid-cols-[min-content_1fr]",
              !l && "formatted-font"
            ),
            children: n.map((k, R) => {
              const _ = k === s, C = `${a}-${R}`;
              return /* @__PURE__ */ p(at, { children: [
                /* @__PURE__ */ o(
                  "li",
                  {
                    ref: (T) => {
                      N.current[R] = T;
                    },
                    role: "option",
                    "aria-selected": _,
                    "data-marker": k.marker,
                    "data-state": _ ? "selected" : void 0,
                    tabIndex: -1,
                    className: m(
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
                      "tw-grid tw-grid-flow-col tw-grid-cols-subgrid",
                      r === "horizontal" ? "tw-col-span-3" : "tw-col-span-2 tw-row-span-2",
                      t
                    ),
                    onClick: () => u(k, R),
                    onKeyDown: (T) => O(T, k, R),
                    children: /* @__PURE__ */ o(
                      xc,
                      {
                        footnote: k,
                        layout: r,
                        formatCaller: () => h(k.caller, R),
                        showMarkers: i
                      }
                    )
                  },
                  C
                ),
                R < n.length - 1 && r === "vertical" && /* @__PURE__ */ o("li", { tabIndex: -1, className: "tw-col-span-2", children: /* @__PURE__ */ o(ye, {}) })
              ] });
            })
          }
        )
      }
    )
  ] });
}
function Nc(e) {
  const t = [];
  let n = 0;
  const r = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = r.exec(e)) !== null; )
    a.index > n && t.push(e.substring(n, a.index)), t.push(/* @__PURE__ */ o("strong", { children: a[1] }, a.index)), n = r.lastIndex;
  return n < e.length && t.push(e.substring(n)), t.length > 0 ? t : [e];
}
function kc({
  occurrenceData: e,
  setScriptureReference: t,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], a = n["%webView_inventory_occurrences_table_header_occurrence%"], s = B(() => {
    const i = [], l = /* @__PURE__ */ new Set();
    return e.forEach((c) => {
      const w = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      l.has(w) || (l.add(w), i.push(c));
    }), i;
  }, [e]);
  return /* @__PURE__ */ p(yn, { stickyHeader: !0, children: [
    /* @__PURE__ */ o(Nn, { stickyHeader: !0, children: /* @__PURE__ */ p(It, { children: [
      /* @__PURE__ */ o(Je, { children: r }),
      /* @__PURE__ */ o(Je, { children: a })
    ] }) }),
    /* @__PURE__ */ o(kn, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ p(
      It,
      {
        onClick: () => {
          t(i.reference);
        },
        children: [
          /* @__PURE__ */ o(ae, { children: `${q.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ o(ae, { children: Nc(i.text) })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const Er = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Un.Root,
  {
    ref: n,
    className: m(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ o(
      Un.Indicator,
      {
        className: m("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ o(Rt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Er.displayName = Un.Root.displayName;
const _n = (e) => e === "asc" ? /* @__PURE__ */ o(Vs, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ o($s, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ o(Ps, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Dp = (e) => ({
  accessorKey: "item",
  accessorFn: (t) => t.items[0],
  header: ({ column: t }) => /* @__PURE__ */ p(L, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    _n(t.getIsSorted())
  ] })
}), _c = (e, t) => ({
  accessorKey: `item${t}`,
  accessorFn: (n) => n.items[t],
  header: ({ column: n }) => /* @__PURE__ */ p(L, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    _n(n.getIsSorted())
  ] })
}), Op = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ p(L, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    _n(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), Pn = (e, t, n, r, a, s) => {
  let i = [...n];
  e.forEach((c) => {
    t === "approved" ? i.includes(c) || i.push(c) : i = i.filter((w) => w !== c);
  }), r(i);
  let l = [...a];
  e.forEach((c) => {
    t === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), s(l);
}, Ip = (e, t, n, r, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ p(L, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    e,
    _n(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ p(kr, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ o(
        He,
        {
          onClick: (c) => {
            c.stopPropagation(), Pn(
              [l],
              "approved",
              t,
              n,
              r,
              a
            );
          },
          value: "approved",
          children: /* @__PURE__ */ o(Is, {})
        }
      ),
      /* @__PURE__ */ o(
        He,
        {
          onClick: (c) => {
            c.stopPropagation(), Pn(
              [l],
              "unapproved",
              t,
              n,
              r,
              a
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ o(Ms, {})
        }
      ),
      /* @__PURE__ */ o(
        He,
        {
          onClick: (c) => {
            c.stopPropagation(), Pn(
              [l],
              "unknown",
              t,
              n,
              r,
              a
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ o(As, {})
        }
      )
    ] });
  }
}), Mp = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ap = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, Vp = (e) => {
  const t = e.match(/^\\id\s+([A-Za-z]+)/);
  return t ? t[1] : "";
}, Cc = (e, t, n) => n.includes(e) ? "unapproved" : t.includes(e) ? "approved" : "unknown", $p = Object.freeze([
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
]), Ec = (e, t, n) => {
  let r = e;
  return t !== "all" && (r = r.filter(
    (a) => t === "approved" && a.status === "approved" || t === "unapproved" && a.status === "unapproved" || t === "unknown" && a.status === "unknown"
  )), n !== "" && (r = r.filter((a) => a.items[0].includes(n))), r;
}, Sc = (e, t, n) => {
  const r = [];
  return e.forEach((a) => {
    const s = r.find(
      (i) => fo(
        i.items,
        En(a.inventoryText) ? [a.inventoryText] : a.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: a.verseRef,
        text: a.verse
      });
    else {
      const i = {
        items: En(a.inventoryText) ? [a.inventoryText] : a.inventoryText,
        count: 1,
        status: Cc(
          En(a.inventoryText) ? a.inventoryText : a.inventoryText[0],
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
}, Et = (e, t) => e[t] ?? t;
function Pp({
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
  areInventoryItemsLoading: d = !1
}) {
  const f = Et(n, "%webView_inventory_all%"), h = Et(n, "%webView_inventory_approved%"), u = Et(n, "%webView_inventory_unapproved%"), g = Et(n, "%webView_inventory_unknown%"), v = Et(n, "%webView_inventory_scope_currentBook%"), x = Et(n, "%webView_inventory_scope_chapter%"), O = Et(n, "%webView_inventory_scope_verse%"), y = Et(n, "%webView_inventory_filter_text%"), N = Et(
    n,
    "%webView_inventory_show_additional_items%"
  ), k = Et(n, "%webView_inventory_no_results%"), [R, _] = V(!1), [C, T] = V("all"), [E, S] = V(""), [$, z] = V([]), H = B(() => {
    const P = e ?? [];
    return P.length === 0 ? [] : Sc(P, a, s);
  }, [e, a, s]), I = B(() => {
    if (R) return H;
    const P = [];
    return H.forEach((M) => {
      const st = M.items[0], ct = P.find(
        (vt) => vt.items[0] === st
      );
      ct ? (ct.count += M.count, ct.occurrences = ct.occurrences.concat(M.occurrences)) : P.push({
        items: [st],
        count: M.count,
        occurrences: M.occurrences,
        status: M.status
      });
    }), P;
  }, [R, H]), Z = B(() => I.length === 0 ? [] : Ec(I, C, E), [I, C, E]), A = B(() => {
    var st, ct;
    if (!R) return c;
    const P = (st = r == null ? void 0 : r.tableHeaders) == null ? void 0 : st.length;
    if (!P) return c;
    const M = [];
    for (let vt = 0; vt < P; vt++)
      M.push(
        _c(
          ((ct = r == null ? void 0 : r.tableHeaders) == null ? void 0 : ct[vt]) || "Additional Item",
          vt + 1
        )
      );
    return [...M, ...c];
  }, [r == null ? void 0 : r.tableHeaders, c, R]);
  W(() => {
    Z.length === 0 ? z([]) : Z.length === 1 && z(Z[0].items);
  }, [Z]);
  const Q = (P, M) => {
    M.setRowSelection(() => {
      const st = {};
      return st[P.index] = !0, st;
    }), z(P.original.items);
  }, yt = (P) => {
    if (P === "book" || P === "chapter" || P === "verse")
      l(P);
    else
      throw new Error(`Invalid scope value: ${P}`);
  }, Bt = (P) => {
    if (P === "all" || P === "approved" || P === "unapproved" || P === "unknown")
      T(P);
    else
      throw new Error(`Invalid status filter value: ${P}`);
  }, Ct = B(() => {
    if (I.length === 0 || $.length === 0) return [];
    const P = I.filter((M) => fo(
      R ? M.items : [M.items[0]],
      $
    ));
    if (P.length > 1) throw new Error("Selected item is not unique");
    return P.length === 0 ? [] : P[0].occurrences;
  }, [$, R, I]);
  return /* @__PURE__ */ p("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ p(
        Ne,
        {
          onValueChange: (P) => Bt(P),
          defaultValue: C,
          children: [
            /* @__PURE__ */ o(le, { className: "tw-m-1", children: /* @__PURE__ */ o(ke, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(we, { children: [
              /* @__PURE__ */ o(xt, { value: "all", children: f }),
              /* @__PURE__ */ o(xt, { value: "approved", children: h }),
              /* @__PURE__ */ o(xt, { value: "unapproved", children: u }),
              /* @__PURE__ */ o(xt, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Ne, { onValueChange: (P) => yt(P), defaultValue: i, children: [
        /* @__PURE__ */ o(le, { className: "tw-m-1", children: /* @__PURE__ */ o(ke, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(we, { children: [
          /* @__PURE__ */ o(xt, { value: "book", children: v }),
          /* @__PURE__ */ o(xt, { value: "chapter", children: x }),
          /* @__PURE__ */ o(xt, { value: "verse", children: O })
        ] })
      ] }),
      /* @__PURE__ */ o(
        Me,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: y,
          value: E,
          onChange: (P) => {
            S(P.target.value);
          }
        }
      ),
      r && /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ o(
          Er,
          {
            className: "tw-m-1",
            checked: R,
            onCheckedChange: (P) => {
              _(P);
            }
          }
        ),
        /* @__PURE__ */ o(lt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (r == null ? void 0 : r.checkboxText) ?? N })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ o(
      ic,
      {
        columns: A,
        data: Z,
        onRowClickHandler: Q,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: k
      }
    ) }),
    Ct.length > 0 && /* @__PURE__ */ o("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ o(
      kc,
      {
        occurrenceData: Ct,
        setScriptureReference: t,
        localizedStrings: n
      }
    ) })
  ] });
}
const Tc = "16rem", Rc = "3rem", Ra = b.createContext(void 0);
function Cn() {
  const e = b.useContext(Ra);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return e;
}
const Da = b.forwardRef(
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
    const [w, d] = b.useState(e), f = t ?? w, h = b.useCallback(
      (N) => {
        const k = typeof N == "function" ? N(f) : N;
        n ? n(k) : d(k);
      },
      [n, f]
    ), u = b.useCallback(() => h((N) => !N), [h]), g = f ? "expanded" : "collapsed", O = wt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", y = b.useMemo(
      () => ({
        state: g,
        open: f,
        setOpen: h,
        toggleSidebar: u,
        side: O
      }),
      [g, f, h, u, O]
    );
    return /* @__PURE__ */ o(Ra.Provider, { value: y, children: /* @__PURE__ */ o(Mt, { delayDuration: 0, children: /* @__PURE__ */ o(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Tc,
            "--sidebar-width-icon": Rc,
            ...a
          }
        ),
        className: m(
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
Da.displayName = "SidebarProvider";
const Oa = b.forwardRef(({ variant: e = "sidebar", collapsible: t = "offcanvas", className: n, children: r, ...a }, s) => {
  const i = Cn();
  return t === "none" ? /* @__PURE__ */ o(
    "div",
    {
      className: m(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...a,
      children: r
    }
  ) : /* @__PURE__ */ p(
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
            className: m(
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
            className: m(
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
Oa.displayName = "Sidebar";
const Dc = b.forwardRef(({ className: e, onClick: t, ...n }, r) => {
  const a = Cn();
  return /* @__PURE__ */ p(
    L,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: m("tw-h-7 tw-w-7", e),
      onClick: (s) => {
        t == null || t(s), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ o(Ls, {}) : /* @__PURE__ */ o(Bs, {}),
        /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Dc.displayName = "SidebarTrigger";
const Oc = b.forwardRef(
  ({ className: e, ...t }, n) => {
    const { toggleSidebar: r } = Cn();
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
        className: m(
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
Oc.displayName = "SidebarRail";
const Ia = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "main",
    {
      ref: n,
      className: m(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        e
      ),
      ...t
    }
  )
);
Ia.displayName = "SidebarInset";
const Ic = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Me,
  {
    ref: n,
    "data-sidebar": "input",
    className: m(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      e
    ),
    ...t
  }
));
Ic.displayName = "SidebarInput";
const Mc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
Mc.displayName = "SidebarHeader";
const Ac = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
Ac.displayName = "SidebarFooter";
const Vc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ye,
  {
    ref: n,
    "data-sidebar": "separator",
    className: m("tw-mx-2 tw-w-auto tw-bg-sidebar-border", e),
    ...t
  }
));
Vc.displayName = "SidebarSeparator";
const Ma = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: m(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        e
      ),
      ...t
    }
  )
);
Ma.displayName = "SidebarContent";
const or = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", e),
      ...t
    }
  )
);
or.displayName = "SidebarGroup";
const ar = b.forwardRef(({ className: e, asChild: t = !1, ...n }, r) => /* @__PURE__ */ o(
  t ? _e : "div",
  {
    ref: r,
    "data-sidebar": "group-label",
    className: m(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      e
    ),
    ...n
  }
));
ar.displayName = "SidebarGroupLabel";
const $c = b.forwardRef(({ className: e, asChild: t = !1, ...n }, r) => /* @__PURE__ */ o(
  t ? _e : "button",
  {
    ref: r,
    "data-sidebar": "group-action",
    className: m(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      e
    ),
    ...n
  }
));
$c.displayName = "SidebarGroupAction";
const sr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: m("tw-w-full tw-text-sm", e),
      ...t
    }
  )
);
sr.displayName = "SidebarGroupContent";
const Aa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", e),
      ...t
    }
  )
);
Aa.displayName = "SidebarMenu";
const Va = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: m("tw-group/menu-item tw-relative", e),
      ...t
    }
  )
);
Va.displayName = "SidebarMenuItem";
const Pc = qt(
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
), $a = b.forwardRef(
  ({
    asChild: e = !1,
    isActive: t = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const c = e ? _e : "button", { state: w } = Cn(), d = /* @__PURE__ */ o(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": t,
        className: m(Pc({ variant: n, size: r }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(Ft, { children: [
      /* @__PURE__ */ o(oe, { asChild: !0, children: d }),
      /* @__PURE__ */ o(At, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : d;
  }
);
$a.displayName = "SidebarMenuButton";
const Lc = b.forwardRef(({ className: e, asChild: t = !1, showOnHover: n = !1, ...r }, a) => /* @__PURE__ */ o(
  t ? _e : "button",
  {
    ref: a,
    "data-sidebar": "menu-action",
    className: m(
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
Lc.displayName = "SidebarMenuAction";
const Bc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: m(
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
Bc.displayName = "SidebarMenuBadge";
const zc = b.forwardRef(({ className: e, showIcon: t = !1, ...n }, r) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", e),
      ...n,
      children: [
        t && /* @__PURE__ */ o(rr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ o(
          rr,
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
zc.displayName = "SidebarMenuSkeleton";
const jc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: m(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...t
    }
  )
);
jc.displayName = "SidebarMenuSub";
const Fc = b.forwardRef(
  ({ ...e }, t) => /* @__PURE__ */ o("li", { ref: t, ...e })
);
Fc.displayName = "SidebarMenuSubItem";
const Gc = b.forwardRef(({ asChild: e = !1, size: t = "md", isActive: n, className: r, ...a }, s) => /* @__PURE__ */ o(
  e ? _e : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": t,
    "data-active": n,
    className: m(
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
Gc.displayName = "SidebarMenuSubButton";
function Hc({
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
    (h, u) => {
      r(h, u);
    },
    [r]
  ), d = j(
    (h) => {
      const u = n.find((g) => g.projectId === h);
      return u ? u.projectName : h;
    },
    [n]
  ), f = j(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ o(
    Oa,
    {
      id: e,
      collapsible: "none",
      variant: "inset",
      className: m("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ p(Ma, { children: [
        /* @__PURE__ */ p(or, { children: [
          /* @__PURE__ */ o(ar, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ o(sr, { children: /* @__PURE__ */ o(Aa, { children: Object.entries(t).map(([h, u]) => /* @__PURE__ */ o(Va, { children: /* @__PURE__ */ o(
            $a,
            {
              onClick: () => w(h),
              isActive: f(h),
              children: /* @__PURE__ */ o("span", { className: "tw-pl-3", children: u })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ p(or, { children: [
          /* @__PURE__ */ o(ar, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ o(sr, { className: "tw-pl-3", children: /* @__PURE__ */ o(
            Wn,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (h) => {
                const u = d(h);
                w(u, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ o(zs, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Sr = We(
  ({ value: e, onSearch: t, placeholder: n, isFullWidth: r, className: a, isDisabled: s = !1, id: i }, l) => {
    const c = wt();
    return /* @__PURE__ */ p("div", { id: i, className: m("tw-relative", { "tw-w-full": r }, a), children: [
      /* @__PURE__ */ o(
        lo,
        {
          className: m(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ o(
        Me,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: e,
          onChange: (w) => t(w.target.value),
          disabled: s
        }
      ),
      e && /* @__PURE__ */ p(
        L,
        {
          variant: "ghost",
          size: "icon",
          className: m(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": c === "rtl" },
            { "tw-right-0": c === "ltr" }
          ),
          onClick: () => {
            t("");
          },
          children: [
            /* @__PURE__ */ o(Ze, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Sr.displayName = "SearchBar";
function Lp({
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
  buttonPlaceholderText: d
}) {
  return /* @__PURE__ */ p("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ o("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ o(
      Sr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      Da,
      {
        id: e,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ o(
            Hc,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: t,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: d
            }
          ),
          /* @__PURE__ */ o(Ia, { className: "tw-min-w-[215px]", children: r })
        ]
      }
    )
  ] });
}
const jt = "scrBook", Xc = "scrRef", ee = "source", Kc = "details", Uc = "Scripture Reference", Yc = "Scripture Book", Pa = "Type", qc = "Details";
function Jc(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${r.start.book} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: jt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Uc,
      cell: (r) => {
        const a = r.row.original;
        return r.row.getIsGrouped() ? q.bookIdToEnglishName(a.start.book) : r.row.groupingColumnId === jt ? he(a.start) : void 0;
      },
      getGroupingValue: (r) => q.bookIdToNumber(r.start.book),
      sortingFn: (r, a) => Hn(r.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => he(r.start),
      id: Xc,
      header: void 0,
      cell: (r) => {
        const a = r.row.original;
        return r.row.getIsGrouped() ? void 0 : he(a.start);
      },
      sortingFn: (r, a) => Hn(r.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: ee,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Pa : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, a) => r.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Kc,
      header: (e == null ? void 0 : e.detailsColumnName) ?? qc,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const Wc = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || Hn(e.start, e.end) === 0 ? `${Sn(e.start)}+${t}` : `${Sn(e.start)}+${t}-${Sn(e.end)}+${n}`;
}, ao = (e) => `${Wc({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function Bp({
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
  const [w, d] = V([]), [f, h] = V([{ id: jt, desc: !1 }]), [u, g] = V({}), v = B(
    () => e.flatMap((E) => E.data.map((S) => ({
      ...S,
      source: E.source
    }))),
    [e]
  ), x = B(
    () => Jc(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [r, s, i, n]
  );
  W(() => {
    w.includes(ee) ? h([
      { id: ee, desc: !1 },
      { id: jt, desc: !1 }
    ]) : h([{ id: jt, desc: !1 }]);
  }, [w]);
  const O = Ro({
    data: v,
    columns: x,
    state: {
      grouping: w,
      sorting: f,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: Ki(),
    getGroupedRowModel: Xi(),
    getCoreRowModel: Oo(),
    getSortedRowModel: Do(),
    getRowId: ao,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  W(() => {
    if (l) {
      const E = O.getSelectedRowModel().rowsById, S = Object.keys(E);
      if (S.length === 1) {
        const $ = v.find((z) => ao(z) === S[0]) || void 0;
        $ && l($);
      }
    }
  }, [u, v, l, O]);
  const y = a ?? Yc, N = s ?? Pa, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [jt] },
    { label: `Group by ${N}`, value: [ee] },
    {
      label: `Group by ${y} and ${N}`,
      value: [jt, ee]
    },
    {
      label: `Group by ${N} and ${y}`,
      value: [ee, jt]
    }
  ], R = (E) => {
    d(JSON.parse(E));
  }, _ = (E, S) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(S);
  }, C = (E, S) => E.getIsGrouped() ? "" : m("banded-row", S % 2 === 0 ? "even" : "odd"), T = (E, S, $) => {
    if (!((E == null ? void 0 : E.length) === 0 || S.depth < $.column.getGroupedIndex())) {
      if (S.getIsGrouped())
        switch (S.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (S.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ p("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !t && /* @__PURE__ */ p(
      Ne,
      {
        value: JSON.stringify(w),
        onValueChange: (E) => {
          R(E);
        },
        children: [
          /* @__PURE__ */ o(le, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ o(ke, {}) }),
          /* @__PURE__ */ o(we, { position: "item-aligned", children: /* @__PURE__ */ o(Jw, { children: k.map((E) => /* @__PURE__ */ o(xt, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(yn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ o(Nn, { children: O.getHeaderGroups().map((E) => /* @__PURE__ */ o(It, { children: E.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ o(Je, { colSpan: S.colSpan, className: "top-0 tw-sticky", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ o(
            L,
            {
              variant: "ghost",
              title: `Toggle grouping by ${S.column.columnDef.header}`,
              onClick: S.column.getToggleGroupingHandler(),
              type: "button",
              children: S.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          je(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, E.id)) }),
      /* @__PURE__ */ o(kn, { children: O.getRowModel().rows.map((E, S) => {
        const $ = wt();
        return /* @__PURE__ */ o(
          It,
          {
            "data-state": E.getIsSelected() ? "selected" : "",
            className: m(C(E, S)),
            onClick: (z) => _(E, z),
            children: E.getVisibleCells().map((z) => {
              if (!(z.getIsPlaceholder() || z.column.columnDef.enableGrouping && !z.getIsGrouped() && (z.column.columnDef.id !== ee || !n)))
                return /* @__PURE__ */ o(
                  ae,
                  {
                    className: m(
                      z.column.columnDef.id,
                      "tw-p-[1px]",
                      T(w, E, z)
                    ),
                    children: z.getIsGrouped() ? /* @__PURE__ */ p(
                      L,
                      {
                        variant: "link",
                        onClick: E.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          E.getIsExpanded() && /* @__PURE__ */ o(se, {}),
                          !E.getIsExpanded() && ($ === "ltr" ? /* @__PURE__ */ o(be, {}) : /* @__PURE__ */ o(jn, {})),
                          " ",
                          je(z.column.columnDef.cell, z.getContext()),
                          " (",
                          E.subRows.length,
                          ")"
                        ]
                      }
                    ) : je(z.column.columnDef.cell, z.getContext())
                  },
                  z.id
                );
            })
          },
          E.id
        );
      }) })
    ] })
  ] });
}
const Tr = (e, t) => e.filter((n) => {
  try {
    return ze(n) === t;
  } catch {
    return !1;
  }
}), La = (e, t, n) => Tr(e, t).every((r) => n.includes(r));
function Zc({
  section: e,
  availableBookIds: t,
  selectedBookIds: n,
  onToggle: r,
  localizedStrings: a
}) {
  const s = Tr(t, e).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ o(
    L,
    {
      variant: "outline",
      size: "sm",
      onClick: () => r(e),
      className: m(
        La(t, e, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: hl(
        e,
        i,
        l,
        c,
        w
      )
    }
  );
}
const so = 5, Ln = 6;
function Qc({
  availableBookInfo: e,
  selectedBookIds: t,
  onChangeSelectedBookIds: n,
  localizedStrings: r,
  localizedBookNames: a
}) {
  const s = r["%webView_book_selector_books_selected%"], i = r["%webView_book_selector_select_books%"], l = r["%webView_book_selector_search_books%"], c = r["%webView_book_selector_select_all%"], w = r["%webView_book_selector_clear_all%"], d = r["%webView_book_selector_no_book_found%"], f = r["%webView_book_selector_more%"], { otLong: h, ntLong: u, dcLong: g, extraLong: v } = {
    otLong: r == null ? void 0 : r["%scripture_section_ot_long%"],
    ntLong: r == null ? void 0 : r["%scripture_section_nt_long%"],
    dcLong: r == null ? void 0 : r["%scripture_section_dc_long%"],
    extraLong: r == null ? void 0 : r["%scripture_section_extra_long%"]
  }, [x, O] = V(!1), [y, N] = V(""), k = rt(void 0), R = rt(!1);
  if (e.length !== q.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const _ = B(() => q.allBookIds.filter(
    (I, Z) => e[Z] === "1" && !q.isObsolete(q.bookIdToNumber(I))
  ), [e]), C = B(() => {
    if (!y.trim()) {
      const A = {
        [G.OT]: [],
        [G.NT]: [],
        [G.DC]: [],
        [G.Extra]: []
      };
      return _.forEach((Q) => {
        const yt = ze(Q);
        A[yt].push(Q);
      }), A;
    }
    const I = _.filter(
      (A) => fr(A, y, a)
    ), Z = {
      [G.OT]: [],
      [G.NT]: [],
      [G.DC]: [],
      [G.Extra]: []
    };
    return I.forEach((A) => {
      const Q = ze(A);
      Z[Q].push(A);
    }), Z;
  }, [_, y, a]), T = j(
    (I, Z = !1) => {
      if (!Z || !k.current) {
        n(
          t.includes(I) ? t.filter((P) => P !== I) : [...t, I]
        ), k.current = I;
        return;
      }
      const A = _.findIndex((P) => P === k.current), Q = _.findIndex((P) => P === I);
      if (A === -1 || Q === -1) return;
      const [yt, Bt] = [
        Math.min(A, Q),
        Math.max(A, Q)
      ], Ct = _.slice(yt, Bt + 1).map((P) => P);
      n(
        t.includes(I) ? t.filter((P) => !Ct.includes(P)) : [.../* @__PURE__ */ new Set([...t, ...Ct])]
      );
    },
    [t, n, _]
  ), E = (I) => {
    T(I, R.current), R.current = !1;
  }, S = (I, Z) => {
    I.preventDefault(), T(Z, I.shiftKey);
  }, $ = j(
    (I) => {
      const Z = Tr(_, I).map((A) => A);
      n(
        La(_, I, t) ? t.filter((A) => !Z.includes(A)) : [.../* @__PURE__ */ new Set([...t, ...Z])]
      );
    },
    [t, n, _]
  ), z = () => {
    n(_.map((I) => I));
  }, H = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ o("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(G).map((I) => /* @__PURE__ */ o(
      Zc,
      {
        section: I,
        availableBookIds: _,
        selectedBookIds: t,
        onToggle: $,
        localizedStrings: r
      },
      I
    )) }),
    /* @__PURE__ */ p(
      Re,
      {
        open: x,
        onOpenChange: (I) => {
          O(I), I || N("");
        },
        children: [
          /* @__PURE__ */ o(De, { asChild: !0, children: /* @__PURE__ */ p(
            L,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                t.length > 0 ? `${s}: ${t.length}` : i,
                /* @__PURE__ */ o(uo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ o(de, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            Ee,
            {
              shouldFilter: !1,
              onKeyDown: (I) => {
                I.key === "Enter" && (R.current = I.shiftKey);
              },
              children: [
                /* @__PURE__ */ o(
                  en,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: N
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: z, children: c }),
                  /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: H, children: w })
                ] }),
                /* @__PURE__ */ p(Se, { children: [
                  /* @__PURE__ */ o(bn, { children: d }),
                  Object.values(G).map((I, Z) => {
                    const A = C[I];
                    if (A.length !== 0)
                      return /* @__PURE__ */ p(io, { children: [
                        /* @__PURE__ */ o(
                          Kt,
                          {
                            heading: Go(I, h, u, g, v),
                            children: A.map((Q) => /* @__PURE__ */ o(
                              Xo,
                              {
                                bookId: Q,
                                isSelected: t.includes(Q),
                                onSelect: () => E(Q),
                                onMouseDown: (yt) => S(yt, Q),
                                section: ze(Q),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: Jn(Q, a),
                                className: "tw-flex tw-items-center"
                              },
                              Q
                            ))
                          }
                        ),
                        Z < Object.values(G).length - 1 && /* @__PURE__ */ o($o, {})
                      ] }, I);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    t.length > 0 && /* @__PURE__ */ p("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      t.slice(
        0,
        t.length === Ln ? Ln : so
      ).map((I) => /* @__PURE__ */ o(Ye, { className: "hover:tw-bg-secondary", variant: "secondary", children: ge(I, a) }, I)),
      t.length > Ln && /* @__PURE__ */ o(
        Ye,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${t.length - so} ${f}`
        }
      )
    ] })
  ] });
}
const zp = Object.freeze([
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
]), Zt = (e, t) => e[t] ?? t;
function jp({
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
  const w = Zt(
    i,
    "%webView_scope_selector_selected_text%"
  ), d = Zt(
    i,
    "%webView_scope_selector_current_verse%"
  ), f = Zt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), h = Zt(i, "%webView_scope_selector_current_book%"), u = Zt(i, "%webView_scope_selector_choose_books%"), g = Zt(i, "%webView_scope_selector_scope%"), v = Zt(i, "%webView_scope_selector_select_books%"), x = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], O = t ? x.filter((y) => t.includes(y.value)) : x;
  return /* @__PURE__ */ p("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ o(lt, { children: g }),
      /* @__PURE__ */ o(
        gr,
        {
          value: e,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: O.map(({ value: y, label: N, id: k }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(dn, { className: "tw-me-2", value: y, id: k }),
            /* @__PURE__ */ o(lt, { htmlFor: k, children: N })
          ] }, k))
        }
      )
    ] }),
    e === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ o(lt, { children: v }),
      /* @__PURE__ */ o(
        Qc,
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
const Bn = {
  [Y("undefined")]: "Ø",
  [Y(0)]: "A",
  [Y(1)]: "B",
  [Y(2)]: "C",
  [Y(3)]: "D",
  [Y(4)]: "E",
  [Y(5)]: "F",
  [Y(6)]: "G",
  [Y(7)]: "H",
  [Y(8)]: "I",
  [Y(9)]: "J",
  [Y(10)]: "K",
  [Y(11)]: "L",
  [Y(12)]: "M",
  [Y(13)]: "N",
  [Y(14)]: "O",
  [Y(15)]: "P",
  [Y(16)]: "Q",
  [Y(17)]: "R",
  [Y(18)]: "S",
  [Y(19)]: "T",
  [Y(20)]: "U",
  [Y(21)]: "V",
  [Y(22)]: "W",
  [Y(23)]: "X",
  [Y(24)]: "Y",
  [Y(25)]: "Z"
};
function Fp({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: r = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Bn,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([w, d]) => [
          w,
          w === d && w in Bn ? Bn[w] : d
        ]
      )
    )
  }, c = wt();
  return /* @__PURE__ */ p(
    Ne,
    {
      value: `${t}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ o(le, { size: a, className: m("pr-twp tw-w-auto", s), children: /* @__PURE__ */ o(
          ke,
          {
            placeholder: l[Y(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ o(
          we,
          {
            id: i,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: e.map((w) => /* @__PURE__ */ o(xt, { value: `${w}`, children: l[Y(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Gp({ children: e }) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw-grid", children: e });
}
function Hp({
  primary: e,
  secondary: t,
  children: n,
  isLoading: r = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ o("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ o("div", { children: n })
  ] });
}
function Xp({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ o("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ o(ye, {}) : ""
  ] });
}
function Ba(e, t) {
  var n;
  return (n = Object.entries(e).find(
    ([, r]) => "menuItem" in r && r.menuItem === t
  )) == null ? void 0 : n[0];
}
function un({ icon: e, menuLabel: t, leading: n }) {
  return e ? /* @__PURE__ */ o(
    "img",
    {
      className: m("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: e,
      alt: `${n ? "Leading" : "Trailing"} icon for ${t}`
    }
  ) : void 0;
}
const za = (e, t, n, r) => n ? Object.entries(e).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => t.filter((l) => l.group === s).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ p(Ft, { children: [
  /* @__PURE__ */ o(oe, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    pn,
    {
      onClick: () => {
        r(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ o(un, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ o(un, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(Xw, { children: [
    /* @__PURE__ */ o(ka, { children: l.label }),
    /* @__PURE__ */ o(Hw, { children: /* @__PURE__ */ o(_a, { children: za(
      e,
      t,
      Ba(e, l.id),
      r
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ o(At, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function ir({
  onSelectMenuItem: e,
  menuData: t,
  tabLabel: n,
  icon: r,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(pe, { variant: s, children: [
    /* @__PURE__ */ o(Oe, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ o(L, { variant: i, size: "icon", children: r ?? /* @__PURE__ */ o(js, {}) }) }),
    /* @__PURE__ */ o(Jt, { align: "start", className: "tw-z-[250]", children: Object.entries(t.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, d) => /* @__PURE__ */ p(io, { children: [
      /* @__PURE__ */ o(Na, { children: /* @__PURE__ */ o(Mt, { children: za(t.groups, t.items, c, e) }) }),
      w < d.length - 1 && /* @__PURE__ */ o(Ie, {})
    ] }, c)) })
  ] });
}
const ja = b.forwardRef(
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
function Kp({
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
  return /* @__PURE__ */ p(ja, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ o(
      ir,
      {
        onSelectMenuItem: e,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ o(Fs, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ o("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    l && /* @__PURE__ */ o("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      r && /* @__PURE__ */ o(
        ir,
        {
          onSelectMenuItem: t,
          menuData: r,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ o(Gs, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Up({
  onSelectProjectMenuItem: e,
  projectMenuData: t,
  id: n,
  className: r,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ o(ja, { className: "tw-pointer-events-none", id: n, children: t && /* @__PURE__ */ o(
    ir,
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
const Fa = b.forwardRef(({ className: e, ...t }, n) => {
  const r = wt();
  return /* @__PURE__ */ o(
    gt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
      ...t,
      dir: r
    }
  );
});
Fa.displayName = gt.List.displayName;
const Ga = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.List,
  {
    ref: n,
    className: m(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ga.displayName = gt.List.displayName;
const td = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.Trigger,
  {
    ref: n,
    ...t,
    className: m(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), Ha = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.Content,
  {
    ref: n,
    className: m(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Ha.displayName = gt.Content.displayName;
function Yp({
  tabList: e,
  searchValue: t,
  onSearch: n,
  searchPlaceholder: r,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ p("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ p("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ o("h1", { children: a }) : "",
      /* @__PURE__ */ o(
        Sr,
        {
          className: s,
          value: t,
          onSearch: n,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ p(Fa, { children: [
      /* @__PURE__ */ o(Ga, { children: e.map((l) => /* @__PURE__ */ o(td, { value: l.value, children: l.value }, l.key)) }),
      e.map((l) => /* @__PURE__ */ o(Ha, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function ed({ ...e }) {
  return /* @__PURE__ */ o(et.Menu, { ...e });
}
function nd({ ...e }) {
  return /* @__PURE__ */ o(et.Sub, { "data-slot": "menubar-sub", ...e });
}
const Xa = b.forwardRef(({ className: e, variant: t = "default", ...n }, r) => {
  const a = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(_r.Provider, { value: a, children: /* @__PURE__ */ o(
    et.Root,
    {
      ref: r,
      className: m(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        e
      ),
      ...n
    }
  ) });
});
Xa.displayName = et.Root.displayName;
const Ka = b.forwardRef(({ className: e, ...t }, n) => {
  const r = _t();
  return /* @__PURE__ */ o(
    et.Trigger,
    {
      ref: n,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Lt({ variant: r.variant, className: e })
        // CUSTOM use context to add variants
      ),
      ...t
    }
  );
});
Ka.displayName = et.Trigger.displayName;
const Ua = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => {
  const s = _t();
  return /* @__PURE__ */ p(
    et.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        t && "tw-pl-8",
        Lt({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ o(be, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ua.displayName = et.SubTrigger.displayName;
const Ya = b.forwardRef(({ className: e, ...t }, n) => {
  const r = _t();
  return /* @__PURE__ */ o(
    et.SubContent,
    {
      ref: n,
      className: m(
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
Ya.displayName = et.SubContent.displayName;
const qa = b.forwardRef(({ className: e, align: t = "start", alignOffset: n = -4, sideOffset: r = 8, ...a }, s) => {
  const i = _t();
  return /* @__PURE__ */ o(et.Portal, { children: /* @__PURE__ */ o(
    et.Content,
    {
      ref: s,
      align: t,
      alignOffset: n,
      sideOffset: r,
      className: m(
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
qa.displayName = et.Content.displayName;
const Ja = b.forwardRef(({ className: e, inset: t, ...n }, r) => {
  const a = _t();
  return /* @__PURE__ */ o(
    et.Item,
    {
      ref: r,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        Lt({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n
    }
  );
});
Ja.displayName = et.Item.displayName;
const rd = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => {
  const s = _t();
  return /* @__PURE__ */ p(
    et.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Lt({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
rd.displayName = et.CheckboxItem.displayName;
const od = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = _t();
  return /* @__PURE__ */ p(
    et.RadioItem,
    {
      ref: r,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Lt({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(hn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
od.displayName = et.RadioItem.displayName;
const ad = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  et.Label,
  {
    ref: r,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
ad.displayName = et.Label.displayName;
const Wa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  et.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Wa.displayName = et.Separator.displayName;
const Le = (e, t) => {
  setTimeout(() => {
    t.forEach((n) => {
      var r;
      (r = e.current) == null || r.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Za = (e, t, n, r) => {
  if (!n) return;
  const a = Object.entries(e).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = t.filter((w) => w.group === s).sort((w, d) => w.order - d.order).map((w) => /* @__PURE__ */ p(Ft, { children: [
      /* @__PURE__ */ o(oe, { asChild: !0, children: "command" in w ? /* @__PURE__ */ p(
        Ja,
        {
          onClick: () => {
            r(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ o(un, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ o(un, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ p(nd, { children: [
        /* @__PURE__ */ o(Ua, { children: w.label }),
        /* @__PURE__ */ o(Ya, { children: Za(
          e,
          t,
          Ba(e, w.id),
          r
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ o(At, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && i < a.length - 1 && c.push(/* @__PURE__ */ o(Wa, {}, `separator-${s}`)), c;
  });
};
function sd({
  menuData: e,
  onSelectMenuItem: t,
  onOpenChange: n,
  variant: r
}) {
  const a = rt(void 0), s = rt(void 0), i = rt(void 0), l = rt(void 0), c = rt(void 0), w = (d) => {
    switch (d) {
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
  if (Ji(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, f) => {
    var g, v, x, O;
    d.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        Le(s, [h]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Le(s, [h, u]);
        break;
      case "alt+l":
        (v = i.current) == null || v.focus(), Le(i, [h, u]);
        break;
      case "alt+n":
        (x = l.current) == null || x.focus(), Le(l, [h, u]);
        break;
      case "alt+h":
        (O = c.current) == null || O.focus(), Le(c, [h, u]);
        break;
    }
  }), W(() => {
    if (!n || !a.current) return;
    const d = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const v = g.target.getAttribute("data-state");
          n(v === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      d.observe(u, { attributes: !0 });
    }), () => d.disconnect();
  }, [n]), !!e)
    return /* @__PURE__ */ o(Xa, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: r, children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, f]) => typeof d == "boolean" || typeof f == "boolean" ? 0 : d.order - f.order).map(([d, f]) => /* @__PURE__ */ p(ed, { children: [
      /* @__PURE__ */ o(Ka, { ref: w(d), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ o(
        qa,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ o(Mt, { children: Za(e.groups, e.items, d, t) })
        }
      )
    ] }, d)) });
}
function qp(e) {
  switch (e) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Jp({
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
  const d = rt(void 0);
  return /* @__PURE__ */ o(
    "div",
    {
      className: m("tw-border tw-px-4 tw-text-foreground", r),
      ref: d,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ o("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  e && /* @__PURE__ */ o(
                    sd,
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
const id = (e, t) => e[t] ?? t;
function Wp({
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
  const w = id(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, f] = V(!1), h = (g) => {
    a && a(g), r && r([g, ...n.filter((v) => v !== g)]), s && n.find((v) => v === g) && s([...n.filter((v) => v !== g)]), f(!1);
  }, u = (g, v) => {
    var O, y, N, k, R, _;
    const x = v !== g ? ((y = (O = e[g]) == null ? void 0 : O.uiNames) == null ? void 0 : y[v]) ?? ((k = (N = e[g]) == null ? void 0 : N.uiNames) == null ? void 0 : k.en) : void 0;
    return x ? `${(R = e[g]) == null ? void 0 : R.autonym} (${x})` : (_ = e[g]) == null ? void 0 : _.autonym;
  };
  return /* @__PURE__ */ p("div", { id: c, className: m("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Ne,
      {
        name: "uiLanguage",
        value: t,
        onValueChange: h,
        open: d,
        onOpenChange: (g) => f(g),
        children: [
          /* @__PURE__ */ o(le, { children: /* @__PURE__ */ o(ke, {}) }),
          /* @__PURE__ */ o(
            we,
            {
              className: "tw-z-[250]",
              children: Object.keys(e).map((g) => /* @__PURE__ */ o(xt, { value: g, children: u(g, t) }, g))
            }
          )
        ]
      }
    ),
    t !== "en" && /* @__PURE__ */ o("div", { className: "tw-pt-3", children: /* @__PURE__ */ o(lt, { className: "tw-font-normal tw-text-muted-foreground", children: fe(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, t)).join(", ") : e.en.autonym
    }) }) })
  ] });
}
function ld({ item: e, createLabel: t, createComplexLabel: n }) {
  return t ? /* @__PURE__ */ o(lt, { children: t(e) }) : n ? /* @__PURE__ */ o(lt, { children: n(e) }) : /* @__PURE__ */ o(lt, { children: e });
}
function Zp({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ o("div", { id: e, className: t, children: n.map((l) => /* @__PURE__ */ p("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ o(
      Er,
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ o(
      ld,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function Qp({
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
  return /* @__PURE__ */ p(
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
      className: m(
        "tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": r && !t },
        { "tw-bg-accent": t },
        { "tw-bg-transparent": !t },
        s
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ o("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            t && l && /* @__PURE__ */ p(pe, { children: [
              /* @__PURE__ */ o(Oe, { className: m(w && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ o(L, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(co, {}) }) }),
              /* @__PURE__ */ o(Jt, { align: "end", children: l })
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
const wd = We(({ className: e, ...t }, n) => /* @__PURE__ */ o(Hs, { size: 35, className: m("tw-animate-spin", e), ...t, ref: n }));
wd.displayName = "Spinner";
function tu({
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
  value: d,
  onChange: f,
  onFocus: h,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: m("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ o(
      lt,
      {
        htmlFor: e,
        className: m({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ o(
      Me,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: m(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: d,
        onChange: f,
        onFocus: h,
        onBlur: u
      }
    ),
    /* @__PURE__ */ o("p", { className: m({ "tw-hidden": !a }), children: a })
  ] });
}
const cd = qt(
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
), dd = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ o(
  "div",
  {
    ref: r,
    role: "alert",
    className: m(
      // CUSTOM
      "pr-twp",
      cd({ variant: t }),
      e
    ),
    ...n
  }
));
dd.displayName = "Alert";
const pd = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ p(
    "h5",
    {
      ref: n,
      className: m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
pd.displayName = "AlertTitle";
const ud = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", { ref: n, className: m("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
ud.displayName = "AlertDescription";
const eu = nt.Root, nu = nt.Trigger, ru = nt.Group, ou = nt.Portal, au = nt.Sub, su = nt.RadioGroup, md = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => /* @__PURE__ */ p(
  nt.SubTrigger,
  {
    ref: a,
    className: m(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      t && "tw-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ o(be, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
md.displayName = nt.SubTrigger.displayName;
const hd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  nt.SubContent,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
hd.displayName = nt.SubContent.displayName;
const fd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(nt.Portal, { children: /* @__PURE__ */ o(
  nt.Content,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
fd.displayName = nt.Content.displayName;
const gd = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  nt.Item,
  {
    ref: r,
    className: m(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
gd.displayName = nt.Item.displayName;
const bd = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => /* @__PURE__ */ p(
  nt.CheckboxItem,
  {
    ref: a,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(nt.ItemIndicator, { children: /* @__PURE__ */ o(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
bd.displayName = nt.CheckboxItem.displayName;
const vd = b.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ p(
  nt.RadioItem,
  {
    ref: r,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(nt.ItemIndicator, { children: /* @__PURE__ */ o(hn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
vd.displayName = nt.RadioItem.displayName;
const xd = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  nt.Label,
  {
    ref: r,
    className: m(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
xd.displayName = nt.Label.displayName;
const yd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  nt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
yd.displayName = nt.Separator.displayName;
function Nd({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
Nd.displayName = "ContextMenuShortcut";
const Qa = b.createContext({
  direction: "bottom"
});
function kd({
  shouldScaleBackground: e = !0,
  direction: t = "bottom",
  ...n
}) {
  const r = b.useMemo(() => ({ direction: t }), [t]);
  return /* @__PURE__ */ o(Qa.Provider, { value: r, children: /* @__PURE__ */ o(
    kt.Root,
    {
      shouldScaleBackground: e,
      direction: t,
      ...n
    }
  ) });
}
kd.displayName = "Drawer";
const iu = kt.Trigger, _d = kt.Portal, lu = kt.Close, ts = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  kt.Overlay,
  {
    ref: n,
    className: m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", e),
    ...t
  }
));
ts.displayName = kt.Overlay.displayName;
const Cd = b.forwardRef(({ className: e, children: t, hideDrawerHandle: n = !1, ...r }, a) => {
  const { direction: s = "bottom" } = b.useContext(Qa), i = {
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
  return /* @__PURE__ */ p(_d, { children: [
    /* @__PURE__ */ o(ts, {}),
    /* @__PURE__ */ p(
      kt.Content,
      {
        ref: a,
        className: m(
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
Cd.displayName = "DrawerContent";
function Ed({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", e),
      ...t
    }
  );
}
Ed.displayName = "DrawerHeader";
function Sd({ className: e, ...t }) {
  return /* @__PURE__ */ o("div", { className: m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", e), ...t });
}
Sd.displayName = "DrawerFooter";
const Td = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  kt.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Td.displayName = kt.Title.displayName;
const Rd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  kt.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Rd.displayName = kt.Description.displayName;
const Dd = b.forwardRef(({ className: e, value: t, ...n }, r) => /* @__PURE__ */ o(
  Yn.Root,
  {
    ref: r,
    className: m(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      e
    ),
    ...n,
    children: /* @__PURE__ */ o(
      Yn.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (t || 0)}%)` }
      }
    )
  }
));
Dd.displayName = Yn.Root.displayName;
function wu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ o(
    dr.PanelGroup,
    {
      className: m(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        e
      ),
      ...t
    }
  );
}
const cu = dr.Panel;
function du({
  withHandle: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ o(
    dr.PanelResizeHandle,
    {
      className: m(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        t
      ),
      ...n,
      children: e && /* @__PURE__ */ o("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ o(Xs, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function pu({ ...e }) {
  return /* @__PURE__ */ o(
    Wi,
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
const Od = b.forwardRef(({ className: e, ...t }, n) => {
  const r = wt();
  return /* @__PURE__ */ p(
    Be.Root,
    {
      ref: n,
      className: m(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        e
      ),
      ...t,
      dir: r,
      children: [
        /* @__PURE__ */ o(Be.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ o(Be.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ o(Be.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Od.displayName = Be.Root.displayName;
const Id = b.forwardRef(({ className: e, ...t }, n) => {
  const r = wt();
  return /* @__PURE__ */ o(
    qn.Root,
    {
      className: m(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        e
      ),
      ...t,
      ref: n,
      children: /* @__PURE__ */ o(
        qn.Thumb,
        {
          className: m(
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
Id.displayName = qn.Root.displayName;
const uu = gt.Root, Md = b.forwardRef(({ className: e, ...t }, n) => {
  const r = wt();
  return /* @__PURE__ */ o(
    gt.List,
    {
      ref: n,
      className: m(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        e
      ),
      ...t,
      dir: r
    }
  );
});
Md.displayName = gt.List.displayName;
const Ad = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.Trigger,
  {
    ref: n,
    className: m(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
Ad.displayName = gt.Trigger.displayName;
const Vd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  gt.Content,
  {
    ref: n,
    className: m(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Vd.displayName = gt.Content.displayName;
const $d = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "textarea",
    {
      className: m(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        e
      ),
      ref: n,
      ...t
    }
  )
);
$d.displayName = "Textarea";
const mu = (e, t) => {
  W(() => {
    if (!e) return () => {
    };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
};
function Pd(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Ld = (e, t, n = {}) => {
  const r = rt(t);
  r.current = t;
  const a = rt(n);
  a.current = Pd(a.current);
  const [s, i] = V(() => r.current), [l, c] = V(!0);
  return W(() => {
    let w = !0;
    return c(!!e), (async () => {
      if (e) {
        const d = await e();
        w && (i(() => d), c(!1));
      }
    })(), () => {
      w = !1, a.current.preserveValue || i(() => r.current);
    };
  }, [e]), [s, l];
}, zn = () => !1, hu = (e, t) => {
  const [n] = Ld(
    j(async () => {
      if (!e) return zn;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    zn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  W(() => () => {
    n !== zn && n();
  }, [n]);
};
function Bd(e, t = "top") {
  if (!e || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(a, r) : n.appendChild(a);
}
Bd(`*, ::before, ::after {
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
.tw-col-span-1 {
  grid-column: span 1 / span 1;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-col-start-1 {
  grid-column-start: 1;
}
.tw-row-span-2 {
  grid-row: span 2 / span 2;
}
.tw-row-start-2 {
  grid-row-start: 2;
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
.tw-grid-flow-col {
  grid-auto-flow: column;
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
.tw-grid-cols-\\[min-content_1fr\\] {
  grid-template-columns: min-content 1fr;
}
.tw-grid-cols-\\[min-content_min-content_1fr\\] {
  grid-template-columns: min-content min-content 1fr;
}
.tw-grid-cols-subgrid {
  grid-template-columns: subgrid;
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
  dd as Alert,
  ud as AlertDescription,
  pd as AlertTitle,
  xa as Avatar,
  ya as AvatarFallback,
  Gw as AvatarImage,
  mp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  hp as BOOK_SELECTOR_STRING_KEYS,
  Ye as Badge,
  up as BookChapterControl,
  _l as BookSelectionMode,
  fp as BookSelector,
  L as Button,
  gp as COMMENT_LIST_STRING_KEYS,
  ba as Card,
  va as CardContent,
  jw as CardDescription,
  Fw as CardFooter,
  Bw as CardHeader,
  zw as CardTitle,
  kl as ChapterRangeSelector,
  Er as Checkbox,
  Zp as Checklist,
  Wn as ComboBox,
  Ee as Command,
  bn as CommandEmpty,
  Kt as CommandGroup,
  en as CommandInput,
  ce as CommandItem,
  Se as CommandList,
  bp as CommentList,
  eu as ContextMenu,
  bd as ContextMenuCheckboxItem,
  fd as ContextMenuContent,
  ru as ContextMenuGroup,
  gd as ContextMenuItem,
  xd as ContextMenuLabel,
  ou as ContextMenuPortal,
  su as ContextMenuRadioGroup,
  vd as ContextMenuRadioItem,
  yd as ContextMenuSeparator,
  Nd as ContextMenuShortcut,
  au as ContextMenuSub,
  hd as ContextMenuSubContent,
  md as ContextMenuSubTrigger,
  nu as ContextMenuTrigger,
  ic as DataTable,
  kd as Drawer,
  lu as DrawerClose,
  Cd as DrawerContent,
  Rd as DrawerDescription,
  Sd as DrawerFooter,
  Ed as DrawerHeader,
  ts as DrawerOverlay,
  _d as DrawerPortal,
  Td as DrawerTitle,
  iu as DrawerTrigger,
  pe as DropdownMenu,
  Ht as DropdownMenuCheckboxItem,
  Jt as DropdownMenuContent,
  Na as DropdownMenuGroup,
  pn as DropdownMenuItem,
  cc as DropdownMenuItemType,
  nn as DropdownMenuLabel,
  Hw as DropdownMenuPortal,
  Kw as DropdownMenuRadioGroup,
  Ca as DropdownMenuRadioItem,
  Ie as DropdownMenuSeparator,
  Uw as DropdownMenuShortcut,
  Xw as DropdownMenuSub,
  _a as DropdownMenuSubContent,
  ka as DropdownMenuSubTrigger,
  Oe as DropdownMenuTrigger,
  lc as ERROR_DUMP_STRING_KEYS,
  xp as ERROR_POPOVER_STRING_KEYS,
  wc as ErrorDump,
  yp as ErrorPopover,
  Sp as FOOTNOTE_EDITOR_STRING_KEYS,
  Tp as FOOTNOTE_LIST_STRING_KEYS,
  Cp as Filter,
  Np as FilterDropdown,
  _p as Footer,
  Ep as FootnoteEditor,
  xc as FootnoteItem,
  Rp as FootnoteList,
  $p as INVENTORY_STRING_KEYS,
  Me as Input,
  Pp as Inventory,
  lt as Label,
  vp as MarkdownRenderer,
  kp as MoreInfo,
  pc as MultiSelectComboBox,
  Yp as NavigationContentSearch,
  Re as Popover,
  dp as PopoverAnchor,
  de as PopoverContent,
  De as PopoverTrigger,
  Dd as Progress,
  gr as RadioGroup,
  dn as RadioGroupItem,
  gl as RecentSearches,
  du as ResizableHandle,
  cu as ResizablePanel,
  wu as ResizablePanelGroup,
  Qp as ResultsCard,
  zp as SCOPE_SELECTOR_STRING_KEYS,
  jp as ScopeSelector,
  Bp as ScriptureResultsViewer,
  Fp as ScrollGroupSelector,
  Sr as SearchBar,
  Ne as Select,
  we as SelectContent,
  Jw as SelectGroup,
  xt as SelectItem,
  Zw as SelectLabel,
  Sa as SelectScrollDownButton,
  Ea as SelectScrollUpButton,
  Qw as SelectSeparator,
  le as SelectTrigger,
  ke as SelectValue,
  ye as Separator,
  Gp as SettingsList,
  Xp as SettingsListHeader,
  Hp as SettingsListItem,
  Hc as SettingsSidebar,
  Lp as SettingsSidebarContentSearch,
  Oa as Sidebar,
  Ma as SidebarContent,
  Ac as SidebarFooter,
  or as SidebarGroup,
  $c as SidebarGroupAction,
  sr as SidebarGroupContent,
  ar as SidebarGroupLabel,
  Mc as SidebarHeader,
  Ic as SidebarInput,
  Ia as SidebarInset,
  Aa as SidebarMenu,
  Lc as SidebarMenuAction,
  Bc as SidebarMenuBadge,
  $a as SidebarMenuButton,
  Va as SidebarMenuItem,
  zc as SidebarMenuSkeleton,
  jc as SidebarMenuSub,
  Gc as SidebarMenuSubButton,
  Fc as SidebarMenuSubItem,
  Da as SidebarProvider,
  Oc as SidebarRail,
  Vc as SidebarSeparator,
  Dc as SidebarTrigger,
  rr as Skeleton,
  Od as Slider,
  pu as Sonner,
  wd as Spinner,
  Id as Switch,
  ir as TabDropdownMenu,
  Up as TabFloatingMenu,
  Kp as TabToolbar,
  yn as Table,
  kn as TableBody,
  sc as TableCaption,
  ae as TableCell,
  nc as TableFooter,
  Je as TableHead,
  Nn as TableHeader,
  It as TableRow,
  uu as Tabs,
  Vd as TabsContent,
  Md as TabsList,
  Ad as TabsTrigger,
  tu as TextField,
  $d as Textarea,
  kr as ToggleGroup,
  He as ToggleGroupItem,
  Jp as Toolbar,
  Ft as Tooltip,
  At as TooltipContent,
  Mt as TooltipProvider,
  oe as TooltipTrigger,
  Wp as UiLanguageSelector,
  Fa as VerticalTabs,
  Ha as VerticalTabsContent,
  Ga as VerticalTabsList,
  td as VerticalTabsTrigger,
  Lw as badgeVariants,
  fl as buttonVariants,
  m as cn,
  Vp as getBookIdFromUSFM,
  Mp as getLinesFromUSFM,
  Ap as getNumberFromUSFM,
  Cc as getStatusForItem,
  qp as getToolbarOSReservedSpaceClassName,
  Op as inventoryCountColumn,
  Dp as inventoryItemColumn,
  Ip as inventoryStatusColumn,
  Ww as selectTriggerVariants,
  bu as sonner,
  mu as useEvent,
  hu as useEventAsync,
  Sl as useListbox,
  Ld as usePromise,
  pp as useRecentSearches,
  Cn as useSidebar
};
//# sourceMappingURL=index.js.map
