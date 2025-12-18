var ps = Object.defineProperty;
var us = (e, t, n) => t in e ? ps(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ut = (e, t, n) => us(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as r, jsxs as d, Fragment as lt } from "react/jsx-runtime";
import b, { forwardRef as rn, useRef as Z, useMemo as L, useState as D, useCallback as z, useLayoutEffect as Gt, createContext as kn, useContext as gr, useEffect as U, Component as ms, createElement as jr, Suspense as hs, createRef as fs, Fragment as go } from "react";
import { Command as ft } from "cmdk";
import { X as Ie, Search as bo, Check as Dt, Clock as zr, ChevronsLeft as Fr, ChevronsRight as Gr, ChevronLeft as Zn, ChevronRight as Ee, ArrowLeft as gs, ArrowRight as bs, Circle as _n, ChevronDown as fe, BoldIcon as vs, ItalicIcon as xs, UnderlineIcon as ys, StrikethroughIcon as Ns, AtSign as vo, Pencil as ks, Trash2 as _s, ArrowUp as xo, MoreHorizontal as yo, ChevronUp as Qn, FilterIcon as Cs, ArrowLeftIcon as Es, ChevronLeftIcon as Ss, ChevronRightIcon as Ts, ArrowRightIcon as Rs, Copy as No, Filter as Ds, User as Ms, Link as Os, CircleHelp as Is, ChevronsUpDown as ko, Star as As, FunctionSquare as _o, SquareSigma as Co, SquareX as Ps, AlertCircle as tr, CircleCheckIcon as Vs, CircleXIcon as $s, CircleHelpIcon as Ls, ArrowUpIcon as Bs, ArrowDownIcon as js, ArrowUpDownIcon as zs, PanelLeft as Fs, PanelRight as Gs, ScrollText as Ks, MenuIcon as Hs, Menu as Xs, EllipsisVertical as Us, LoaderCircle as Ys, GripVertical as qs } from "lucide-react";
import { clsx as Js } from "clsx";
import { extendTailwindMerge as Ws } from "tailwind-merge";
import * as Rt from "@radix-ui/react-dialog";
import { includes as cn, Section as K, getChaptersForBook as Zs, formatScrRef as _e, getSectionForBook as Ue, formatRelativeDate as Qs, formatReplacementString as pe, sanitizeHtml as ti, parseParatextHtml as Kr, hasCustomParatextTags as ei, NumberFormat as ni, formatBytes as ri, getCurrentLocale as oi, getFormatCallerFunction as ai, deepEqual as Eo, isString as $n, compareScrRefs as er, scrRefToBBBCCCVVV as Ln, getLocalizeKeyForScrollGroupId as J } from "platform-bible-utils";
import { Slot as Ae } from "@radix-ui/react-slot";
import { cva as re } from "class-variance-authority";
import * as Se from "@radix-ui/react-popover";
import * as So from "@radix-ui/react-label";
import * as Ze from "@radix-ui/react-radio-group";
import { createEditor as To, $getRoot as te, $createParagraphNode as Cn, $getSelection as Kt, HISTORY_MERGE_TAG as br, ParagraphNode as Ro, TextNode as Do, $isTokenOrSegmented as si, $getCharacterOffsets as ii, $cloneWithPropertiesEphemeral as li, $findMatchingParent as wi, $isElementNode as ue, CLEAR_EDITOR_COMMAND as Mo, COMMAND_PRIORITY_EDITOR as Oo, $isRangeSelection as Qe, shallowMergeConfig as ci, defineExtension as Xt, safeCast as on, RootNode as di, LineBreakNode as pi, TabNode as ui, $isEditorState as mi, createCommand as hi, CLICK_COMMAND as fi, isDOMNode as gi, $getNodeFromDOMNode as bi, $isNodeSelection as vi, $createNodeSelection as xi, $setSelection as yi, COMMAND_PRIORITY_LOW as Ni, DecoratorNode as ki, $create as _i, $getNodeByKey as Ci, INDENT_CONTENT_COMMAND as Hr, COMMAND_PRIORITY_CRITICAL as vr, KEY_TAB_COMMAND as Ei, $createRangeSelection as Si, $normalizeSelection__EXPERIMENTAL as Ti, OUTDENT_CONTENT_COMMAND as Ri, INSERT_TAB_COMMAND as Di, $isBlockElementNode as fn, $isDecoratorNode as Mi, $isParagraphNode as Oi, $isTextNode as gn, SELECTION_CHANGE_COMMAND as Io, FORMAT_TEXT_COMMAND as Ii, getRegisteredNode as Ai, isHTMLElement as Pi, isDocumentFragment as Xr, isDOMDocumentNode as Vi, ArtificialNode__DO_NOT_USE as Ao, $createLineBreakNode as Po, $isRootOrShadowRoot as $i, isBlockDomNode as Ur, isInlineDomNode as Yr, $insertNodes as Li } from "lexical";
import * as an from "@radix-ui/react-tooltip";
import { TooltipTrigger as Bi } from "@radix-ui/react-tooltip";
import { HeadingNode as ji, QuoteNode as zi, registerRichText as Fi } from "@lexical/rich-text";
import { flushSync as Gi, createPortal as Ki } from "react-dom";
import { $isTableSelection as Hi } from "@lexical/table";
import * as En from "@radix-ui/react-toggle-group";
import * as Vo from "@radix-ui/react-toggle";
import { createHeadlessEditor as $o } from "@lexical/headless";
import * as Lo from "@radix-ui/react-separator";
import * as Pe from "@radix-ui/react-avatar";
import * as nt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Xi } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Bo, getFilteredRowModel as Ui, getSortedRowModel as jo, getPaginationRowModel as Yi, getCoreRowModel as zo, flexRender as Ye, getGroupedRowModel as qi, getExpandedRowModel as Ji } from "@tanstack/react-table";
import * as it from "@radix-ui/react-select";
import Wi from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as nr, HIDDEN_NOTE_CALLER as rr, getDefaultViewOptions as Zi, isInsertEmbedOpOfType as Bn, Editorial as Qi } from "@eten-tech-foundation/platform-editor";
import * as or from "@radix-ui/react-checkbox";
import * as gt from "@radix-ui/react-tabs";
import * as rt from "@radix-ui/react-menubar";
import { useHotkeys as tl } from "react-hotkeys-hook";
import * as ot from "@radix-ui/react-context-menu";
import { Drawer as Mt } from "vaul";
import * as ar from "@radix-ui/react-progress";
import * as xr from "react-resizable-panels";
import { Toaster as el } from "sonner";
import { toast as _u } from "sonner";
import * as Xe from "@radix-ui/react-slider";
import * as sr from "@radix-ui/react-switch";
const nl = Ws({ prefix: "tw-" });
function f(...e) {
  return nl(Js(e));
}
const rl = "layoutDirection";
function ct() {
  const e = localStorage.getItem(rl);
  return e === "rtl" ? e : "ltr";
}
const ol = Rt.Root, al = Rt.Portal, Fo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Rt.Overlay,
  {
    ref: n,
    className: f(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
Fo.displayName = Rt.Overlay.displayName;
const Go = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = ct();
  return /* @__PURE__ */ d(al, { children: [
    /* @__PURE__ */ r(Fo, {}),
    /* @__PURE__ */ d(
      Rt.Content,
      {
        ref: o,
        className: f(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          e
        ),
        ...n,
        dir: a,
        children: [
          t,
          /* @__PURE__ */ d(
            Rt.Close,
            {
              className: f(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Ie, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Go.displayName = Rt.Content.displayName;
function Ko({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        e
      ),
      ...t
    }
  );
}
Ko.displayName = "DialogHeader";
const Ho = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Rt.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Ho.displayName = Rt.Title.displayName;
const sl = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Rt.Description,
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
sl.displayName = Rt.Description.displayName;
const Ut = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ft,
  {
    ref: n,
    className: f(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
Ut.displayName = ft.displayName;
const Ve = b.forwardRef(({ className: e, ...t }, n) => {
  const o = ct();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(bo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      ft.Input,
      {
        ref: n,
        className: f(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          e
        ),
        ...t
      }
    )
  ] });
});
Ve.displayName = ft.Input.displayName;
const Yt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ft.List,
  {
    ref: n,
    className: f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
Yt.displayName = ft.List.displayName;
const sn = b.forwardRef((e, t) => /* @__PURE__ */ r(ft.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
sn.displayName = ft.Empty.displayName;
const Ht = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ft.Group,
  {
    ref: n,
    className: f(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ht.displayName = ft.Group.displayName;
const Xo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ft.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
Xo.displayName = ft.Separator.displayName;
const $t = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ft.Item,
  {
    ref: n,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
$t.displayName = ft.Item.displayName;
function Uo({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
Uo.displayName = "CommandShortcut";
var il = Object.defineProperty, ll = (e, t, n) => t in e ? il(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, G = (e, t, n) => ll(e, typeof t != "symbol" ? t + "" : t, n);
const ge = [
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
], yr = [
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
], Yo = [
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
], qr = bl();
function $e(e, t = !0) {
  return t && (e = e.toUpperCase()), e in qr ? qr[e] : 0;
}
function Nr(e) {
  return $e(e) > 0;
}
function wl(e) {
  const t = typeof e == "string" ? $e(e) : e;
  return t >= 40 && t <= 66;
}
function cl(e) {
  return (typeof e == "string" ? $e(e) : e) <= 39;
}
function qo(e) {
  return e <= 66;
}
function dl(e) {
  const t = typeof e == "string" ? $e(e) : e;
  return Zo(t) && !qo(t);
}
function* pl() {
  for (let e = 1; e <= ge.length; e++) yield e;
}
const ul = 1, Jo = ge.length;
function ml() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function kr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= ge.length ? t : ge[n];
}
function Wo(e) {
  return e <= 0 || e > Jo ? "******" : Yo[e - 1];
}
function hl(e) {
  return Wo($e(e));
}
function Zo(e) {
  const t = typeof e == "number" ? kr(e) : e;
  return Nr(t) && !yr.includes(t);
}
function fl(e) {
  const t = typeof e == "number" ? kr(e) : e;
  return Nr(t) && yr.includes(t);
}
function gl(e) {
  return Yo[e - 1].includes("*obsolete*");
}
function bl() {
  const e = {};
  for (let t = 0; t < ge.length; t++)
    e[ge[t]] = t + 1;
  return e;
}
const W = {
  allBookIds: ge,
  nonCanonicalIds: yr,
  bookIdToNumber: $e,
  isBookIdValid: Nr,
  isBookNT: wl,
  isBookOT: cl,
  isBookOTNT: qo,
  isBookDC: dl,
  allBookNumbers: pl,
  firstBook: ul,
  lastBook: Jo,
  extraBooks: ml,
  bookNumberToId: kr,
  bookNumberToEnglishName: Wo,
  bookIdToEnglishName: hl,
  isCanonical: Zo,
  isExtraMaterial: fl,
  isObsolete: gl
};
var At = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(At || {});
const vt = class {
  // private versInfo: Versification;
  constructor(t) {
    if (G(this, "name"), G(this, "fullPath"), G(this, "isPresent"), G(this, "hasVerseSegments"), G(this, "isCustomized"), G(this, "baseVersification"), G(this, "scriptureBooks"), G(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = At[t]) : (this._type = t, this.name = At[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
G(vt, "Original", new vt(At.Original)), G(vt, "Septuagint", new vt(At.Septuagint)), G(vt, "Vulgate", new vt(At.Vulgate)), G(vt, "English", new vt(At.English)), G(vt, "RussianProtestant", new vt(At.RussianProtestant)), G(vt, "RussianOrthodox", new vt(At.RussianOrthodox));
let we = vt;
function Jr(e, t) {
  const n = t[0];
  for (let o = 1; o < t.length; o++)
    e = e.split(t[o]).join(n);
  return e.split(n);
}
var Qo = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Qo || {});
const ht = class H {
  constructor(t, n, o, a) {
    if (G(this, "firstChapter"), G(this, "lastChapter"), G(this, "lastVerse"), G(this, "hasSegmentsDefined"), G(this, "text"), G(this, "BBBCCCVVVS"), G(this, "longHashCode"), G(this, "versification"), G(this, "rtlMark", "‏"), G(this, "_bookNum", 0), G(this, "_chapterNum", 0), G(this, "_verseNum", 0), G(this, "_verse"), o == null && a == null)
      if (t != null && typeof t == "string") {
        const s = t, i = n != null && n instanceof we ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (t != null && typeof t == "number") {
        const s = n != null && n instanceof we ? n : void 0;
        this.setEmpty(s), this._verseNum = t % H.chapterDigitShifter, this._chapterNum = Math.floor(
          t % H.bookDigitShifter / H.chapterDigitShifter
        ), this._bookNum = Math.floor(t / H.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof H) {
          const s = t;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (t == null) return;
          const s = t instanceof we ? t : H.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && o != null)
      if (typeof t == "string" && typeof n == "string" && typeof o == "string")
        this.setEmpty(a), this.updateInternal(t, n, o);
      else if (typeof t == "number" && typeof n == "number" && typeof o == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = o, this.versification = a ?? H.defaultVersification;
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
      return n = new H(t), { success: !0, verseRef: n };
    } catch (o) {
      if (o instanceof Ge)
        return n = new H(), { success: !1, verseRef: n };
      throw o;
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
  static getBBBCCCVVV(t, n, o) {
    return t % H.bcvMaxValue * H.bookDigitShifter + (n >= 0 ? n % H.bcvMaxValue * H.chapterDigitShifter : 0) + (o >= 0 ? o % H.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: o, verseNum: a, verse: s, versificationStr: i } = t, l = s || a.toString();
    let c;
    return i && (c = new we(i)), n ? new H(n, o.toString(), l, c) : new H();
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
    let o;
    for (let a = 0; a < t.length; a++) {
      if (o = t[a], o < "0" || o > "9")
        return a === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +o - 0, n > H.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(H.verseRangeSeparator) || this._verse.includes(H.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return W.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = W.bookIdToNumber(t);
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
    const { success: n, vNum: o } = H.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = o, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = H.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > W.lastBook)
      throw new Ge(
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
    this.versification = this.versification != null ? new we(t) : void 0;
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
    return this.validateVerse(H.verseRangeSeparators, H.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return H.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return H.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new we(At[i]);
        } catch {
          throw new Ge("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Ge("Invalid reference : " + t);
    const o = n[1].split(":"), a = +o[0];
    if (o.length !== 2 || W.bookIdToNumber(n[0]) === 0 || !Number.isInteger(a) || a < 0 || !H.isVerseParseable(o[1]))
      throw new Ge("Invalid reference : " + t);
    this.updateInternal(n[0], o[0], o[1]);
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
    return new H(this);
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
    return t instanceof H ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, n = H.verseRangeSeparators, o = H.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const a = [], s = Jr(this._verse, o);
    for (const i of s.map((l) => Jr(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (a.push(l), i.length > 1) {
        const w = this.clone();
        if (w.verse = i[1], !t)
          for (let p = c + 1; p < w.verseNum; p++) {
            const h = new H(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || a.push(h);
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
    let o = 0;
    for (const a of this.allVerses(!0, t, n)) {
      const s = a.internalValid;
      if (s !== 0)
        return s;
      const i = a.BBBCCCVVV;
      if (o > i)
        return 3;
      if (o === i)
        return 4;
      o = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > W.lastBook ? 2 : (W.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = H.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, o) {
    this.bookNum = W.bookIdToNumber(t), this.chapter = n, this.verse = o;
  }
};
G(ht, "defaultVersification", we.English), G(ht, "verseRangeSeparator", "-"), G(ht, "verseSequenceIndicator", ","), G(ht, "verseRangeSeparators", [ht.verseRangeSeparator]), G(ht, "verseSequenceIndicators", [ht.verseSequenceIndicator]), G(ht, "chapterDigitShifter", 1e3), G(ht, "bookDigitShifter", ht.chapterDigitShifter * ht.chapterDigitShifter), G(ht, "bcvMaxValue", ht.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
G(ht, "ValidStatusType", Qo);
let Ge = class extends Error {
};
const ta = (e, t, n, o, a) => {
  switch (e) {
    case K.OT:
      return t ?? "Old Testament";
    case K.NT:
      return n ?? "New Testament";
    case K.DC:
      return o ?? "Deuterocanon";
    case K.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
}, vl = (e, t, n, o, a) => {
  switch (e) {
    case K.OT:
      return t ?? "OT";
    case K.NT:
      return n ?? "NT";
    case K.DC:
      return o ?? "DC";
    case K.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
};
function Ce(e, t) {
  var o;
  return ((o = t == null ? void 0 : t.get(e)) == null ? void 0 : o.localizedName) ?? W.bookIdToEnglishName(e);
}
function _r(e, t) {
  var o;
  return ((o = t == null ? void 0 : t.get(e)) == null ? void 0 : o.localizedId) ?? e.toUpperCase();
}
const ea = W.allBookIds.filter(
  (e) => !W.isObsolete(W.bookIdToNumber(e))
), me = Object.fromEntries(
  ea.map((e) => [e, W.bookIdToEnglishName(e)])
);
function Cr(e, t, n) {
  const o = t.trim().toLowerCase();
  if (!o) return !1;
  const a = W.bookIdToEnglishName(e), s = n == null ? void 0 : n.get(e);
  return !!(cn(a.toLowerCase(), o) || cn(e.toLowerCase(), o) || (s ? cn(s.localizedName.toLowerCase(), o) || cn(s.localizedId.toLowerCase(), o) : !1));
}
const na = rn(
  ({
    bookId: e,
    isSelected: t,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: c
  }, w) => {
    const p = Z(!1), h = () => {
      p.current || n == null || n(e), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, m = (N) => {
      p.current = !0, o ? o(N) : n == null || n(e);
    }, u = L(
      () => Ce(e, l),
      [e, l]
    ), g = L(
      () => _r(e, l),
      [e, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === K.OT,
            "tw-border-s-purple-200": a === K.NT,
            "tw-border-s-indigo-200": a === K.DC,
            "tw-border-s-amber-200": a === K.Extra
          }
        ),
        children: /* @__PURE__ */ d(
          $t,
          {
            ref: w,
            value: c || `${e} ${W.bookIdToEnglishName(e)}`,
            onSelect: h,
            onMouseDown: m,
            role: "option",
            "aria-selected": t,
            "aria-label": `${W.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ r(
                Dt,
                {
                  className: f(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    t ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: u }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), xl = re(
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
), $ = b.forwardRef(
  ({ className: e, variant: t, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? Ae : "button", { className: f(xl({ variant: t, size: n, className: e })), ref: s, ...a })
);
$.displayName = "Button";
const oe = Se.Root, ae = Se.Trigger, mp = Se.Anchor, qt = b.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...o }, a) => {
  const s = ct();
  return /* @__PURE__ */ r(Se.Portal, { children: /* @__PURE__ */ r(
    Se.Content,
    {
      ref: a,
      align: t,
      sideOffset: n,
      className: f(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...o,
      dir: s
    }
  ) });
});
qt.displayName = Se.Content.displayName;
function ir(e, t, n) {
  return `${e} ${me[e]}${t ? ` ${_r(e, t)} ${Ce(e, t)}` : ""}${n ? ` ${n}` : ""}`;
}
function yl({
  recentSearches: e,
  onSearchItemSelect: t,
  renderItem: n = (l) => String(l),
  getItemKey: o = (l) => String(l),
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
  return /* @__PURE__ */ d(oe, { open: l, onOpenChange: c, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ r(
      $,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ r(zr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(qt, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(Ut, { children: /* @__PURE__ */ r(Yt, { children: /* @__PURE__ */ r(Ht, { heading: s, children: e.map((p) => /* @__PURE__ */ d(
      $t,
      {
        onSelect: () => w(p),
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(zr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(p) })
        ]
      },
      o(p)
    )) }) }) }) })
  ] });
}
function hp(e, t, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = e.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    t(i);
  };
}
const jn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Nl = [
  jn.BOOK_ONLY,
  jn.BOOK_CHAPTER,
  jn.BOOK_CHAPTER_VERSE
];
function Wr(e) {
  const t = /^[a-zA-Z]$/.test(e), n = /^[0-9]$/.test(e);
  return { isLetter: t, isDigit: n };
}
function Pt(e) {
  return Zs(W.bookIdToNumber(e));
}
function kl(e, t, n) {
  if (!e.trim() || t.length === 0) return;
  const o = Nl.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(e.trim());
      if (i) {
        const [l, c = void 0, w = void 0] = i.slice(1);
        let p;
        const h = t.filter((m) => Cr(m, l, n));
        if (h.length === 1 && ([p] = h), !p && c) {
          if (W.isBookIdValid(l)) {
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
          const u = ((g) => Object.keys(me).find(
            (N) => me[N].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && t.includes(u) && (p = u), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, N]) => N.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && t.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let m = c ? parseInt(c, 10) : void 0;
          m && m > Pt(p) && (m = Math.max(Pt(p), 1));
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
  if (o) return o;
}
function _l(e, t, n, o) {
  const a = z(() => {
    if (e.chapterNum > 1)
      o({
        book: e.book,
        chapterNum: e.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = t.indexOf(e.book);
      if (c > 0) {
        const w = t[c - 1], p = Math.max(Pt(w), 1);
        o({
          book: w,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [e, t, o]), s = z(() => {
    const c = Pt(e.book);
    if (e.chapterNum < c)
      o({
        book: e.book,
        chapterNum: e.chapterNum + 1,
        verseNum: 1
      });
    else {
      const w = t.indexOf(e.book);
      if (w < t.length - 1) {
        const p = t[w + 1];
        o({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [e, t, o]), i = z(() => {
    o({
      book: e.book,
      chapterNum: e.chapterNum,
      verseNum: e.verseNum > 1 ? e.verseNum - 1 : 0
    });
  }, [e, o]), l = z(() => {
    o({
      book: e.book,
      chapterNum: e.chapterNum,
      verseNum: e.verseNum + 1
    });
  }, [e, o]);
  return L(() => [
    {
      onClick: a,
      disabled: t.length === 0 || e.chapterNum === 1 && t.indexOf(e.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Fr : Gr
    },
    {
      onClick: i,
      disabled: t.length === 0 || e.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Zn : Ee
    },
    {
      onClick: l,
      disabled: t.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Ee : Zn
    },
    {
      onClick: s,
      disabled: t.length === 0 || (e.chapterNum === Pt(e.book) || Pt(e.book) === -1) && t.indexOf(e.book) === t.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Gr : Fr
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
function Zr({
  bookId: e,
  scrRef: t,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (e)
    return /* @__PURE__ */ r(Ht, { children: /* @__PURE__ */ r("div", { className: f("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: Pt(e) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ r(
      $t,
      {
        value: `${e} ${me[e] || ""} ${i}`,
        onSelect: () => n(i),
        ref: o(i),
        className: f(
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
function fp({
  scrRef: e,
  handleSubmit: t,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: c
}) {
  const w = ct(), [p, h] = D(!1), [m, u] = D(""), [g, N] = D(""), [v, x] = D("books"), [_, y] = D(void 0), [S, P] = D(!1), V = Z(void 0), C = Z(void 0), M = Z(void 0), k = Z(void 0), T = Z({}), j = z(
    (R) => {
      t(R), l && l(R);
    },
    [t, l]
  ), B = L(() => o ? o() : ea, [o]), F = L(() => ({
    [K.OT]: B.filter((X) => W.isBookOT(X)),
    [K.NT]: B.filter((X) => W.isBookNT(X)),
    [K.DC]: B.filter((X) => W.isBookDC(X)),
    [K.Extra]: B.filter((X) => W.extraBooks().includes(X))
  }), [B]), A = L(() => Object.values(F).flat(), [F]), tt = L(() => {
    if (!g.trim()) return F;
    const R = {
      [K.OT]: [],
      [K.NT]: [],
      [K.DC]: [],
      [K.Extra]: []
    };
    return [K.OT, K.NT, K.DC, K.Extra].forEach((E) => {
      R[E] = F[E].filter((et) => Cr(et, g, a));
    }), R;
  }, [F, g, a]), O = L(
    () => kl(g, A, a),
    [g, A, a]
  ), st = z(() => {
    O && (j({
      book: O.book,
      chapterNum: O.chapterNum ?? 1,
      verseNum: O.verseNum ?? 1
    }), h(!1), N(""), u(""));
  }, [j, O]), xt = z(
    (R) => {
      if (Pt(R) <= 1) {
        j({
          book: R,
          chapterNum: 1,
          verseNum: 1
        }), h(!1), N("");
        return;
      }
      y(R), x("chapters");
    },
    [j]
  ), Bt = z(
    (R) => {
      const X = v === "chapters" ? _ : O == null ? void 0 : O.book;
      X && (j({
        book: X,
        chapterNum: R,
        verseNum: 1
      }), h(!1), x("books"), y(void 0), N(""));
    },
    [j, v, _, O]
  ), _t = z(
    (R) => {
      j(R), h(!1), N("");
    },
    [j]
  ), I = _l(e, A, w, t), q = z(() => {
    x("books"), y(void 0), setTimeout(() => {
      C.current && C.current.focus();
    }, 0);
  }, []), bt = z(
    (R) => {
      if (!R && v === "chapters") {
        q();
        return;
      }
      h(R), R && (x("books"), y(void 0), N(""));
    },
    [v, q]
  ), { otLong: dt, ntLong: pt, dcLong: jt, extraLong: ze } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, ie = z(
    (R) => ta(R, dt, pt, jt, ze),
    [dt, pt, jt, ze]
  ), yt = z(
    (R) => O ? !!O.chapterNum && !R.toString().includes(O.chapterNum.toString()) : !1,
    [O]
  ), An = L(
    () => _e(
      e,
      a ? Ce(e.book, a) : "English"
    ),
    [e, a]
  ), wn = z((R) => (X) => {
    T.current[R] = X;
  }, []), ye = z((R) => {
    (R.key === "Home" || R.key === "End") && R.stopPropagation();
  }, []), Pn = z(
    (R) => {
      if (R.ctrlKey) return;
      const { isLetter: X, isDigit: E } = Wr(R.key);
      if (v === "chapters") {
        if (R.key === "Backspace") {
          R.preventDefault(), R.stopPropagation(), q();
          return;
        }
        if (X || E) {
          if (R.preventDefault(), R.stopPropagation(), x("books"), y(void 0), E && _) {
            const et = me[_];
            N(`${et} ${R.key}`);
          } else
            N(R.key);
          setTimeout(() => {
            C.current && C.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && O) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(R.key)) {
        const et = v === "chapters" ? _ : O == null ? void 0 : O.book;
        if (!et) return;
        const at = (() => {
          if (!m) return 1;
          const Fe = m.match(/(\d+)$/);
          return Fe ? parseInt(Fe[1], 10) : 0;
        })(), Nt = Pt(et);
        if (!Nt) return;
        let Ct = at;
        const Br = 6;
        switch (R.key) {
          case "ArrowLeft":
            at !== 0 && (Ct = at > 1 ? at - 1 : Nt);
            break;
          case "ArrowRight":
            at !== 0 && (Ct = at < Nt ? at + 1 : 1);
            break;
          case "ArrowUp":
            Ct = at === 0 ? Nt : Math.max(1, at - Br);
            break;
          case "ArrowDown":
            Ct = at === 0 ? 1 : Math.min(Nt, at + Br);
            break;
          default:
            return;
        }
        Ct !== at && (R.preventDefault(), R.stopPropagation(), u(ir(et, a, Ct)), setTimeout(() => {
          const Fe = T.current[Ct];
          Fe && Fe.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      O,
      q,
      _,
      m,
      a
    ]
  ), Vn = z((R) => {
    if (R.shiftKey || R.key === "Tab" || R.key === " ") return;
    const { isLetter: X, isDigit: E } = Wr(R.key);
    (X || E) && (R.preventDefault(), N((et) => et + R.key), C.current.focus(), P(!1));
  }, []);
  return Gt(() => {
    const R = setTimeout(() => {
      if (p && v === "books" && M.current && k.current) {
        const X = M.current, E = k.current, et = E.offsetTop, at = X.clientHeight, Nt = E.clientHeight, Ct = et - at / 2 + Nt / 2;
        X.scrollTo({
          top: Math.max(0, Ct),
          behavior: "smooth"
        }), u(ir(e.book));
      }
    }, 0);
    return () => {
      clearTimeout(R);
    };
  }, [p, v, g, O, e.book]), Gt(() => {
    if (v === "chapters" && _) {
      const R = _ === e.book;
      setTimeout(() => {
        if (M.current)
          if (R) {
            const X = T.current[e.chapterNum];
            X && X.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            M.current.scrollTo({ top: 0 });
        V.current && V.current.focus();
      }, 0);
    }
  }, [v, _, O, e.book, e.chapterNum]), /* @__PURE__ */ d(oe, { open: p, onOpenChange: bt, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ r(
      $,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: f(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: An })
      }
    ) }),
    /* @__PURE__ */ r(qt, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ d(
      Ut,
      {
        ref: V,
        onKeyDown: Pn,
        loop: !0,
        value: m,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ d("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ d("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Ve,
                {
                  ref: C,
                  value: g,
                  onValueChange: N,
                  onKeyDown: ye,
                  onFocus: () => P(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ r(
                yl,
                {
                  recentSearches: i,
                  onSearchItemSelect: _t,
                  renderItem: (R) => _e(R, "English"),
                  getItemKey: (R) => `${R.book}-${R.chapterNum}-${R.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: I.map(({ onClick: R, disabled: X, title: E, icon: et }) => /* @__PURE__ */ r(
              $,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  P(!0), R();
                },
                disabled: X,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: E,
                onKeyDown: Vn,
                children: /* @__PURE__ */ r(et, {})
              },
              E
            )) })
          ] }) : /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              $,
              {
                variant: "ghost",
                size: "sm",
                onClick: q,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ r(gs, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(bs, { className: "tw-h-4 tw-w-4" })
              }
            ),
            _ && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Ce(_, a) })
          ] }),
          !S && /* @__PURE__ */ d(Yt, { ref: M, children: [
            v === "books" && /* @__PURE__ */ d(lt, { children: [
              !O && Object.entries(tt).map(([R, X]) => {
                if (X.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Ht, { heading: ie(R), children: X.map((E) => /* @__PURE__ */ r(
                      na,
                      {
                        bookId: E,
                        onSelect: (et) => xt(et),
                        section: Ue(E),
                        commandValue: `${E} ${me[E]}`,
                        ref: E === e.book ? k : void 0,
                        localizedBookNames: a
                      },
                      E
                    )) }, R)
                  );
              }),
              O && /* @__PURE__ */ r(Ht, { children: /* @__PURE__ */ r(
                $t,
                {
                  value: `${O.book} ${me[O.book]} ${O.chapterNum || ""}:${O.verseNum || ""})}`,
                  onSelect: st,
                  className: "tw-font-semibold tw-text-primary",
                  children: _e(
                    {
                      book: O.book,
                      chapterNum: O.chapterNum ?? 1,
                      verseNum: O.verseNum ?? 1
                    },
                    a ? _r(O.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              O && Pt(O.book) > 1 && /* @__PURE__ */ d(lt, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Ce(O.book, a) }),
                /* @__PURE__ */ r(
                  Zr,
                  {
                    bookId: O.book,
                    scrRef: e,
                    onChapterSelect: Bt,
                    setChapterRef: wn,
                    isChapterDimmed: yt,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && _ && /* @__PURE__ */ r(
              Zr,
              {
                bookId: _,
                scrRef: e,
                onChapterSelect: Bt,
                setChapterRef: wn,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const gp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Cl = re(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), wt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(So.Root, { ref: n, className: f("pr-twp", Cl(), e), ...t }));
wt.displayName = So.Root.displayName;
const Er = b.forwardRef(({ className: e, ...t }, n) => {
  const o = ct();
  return /* @__PURE__ */ r(
    Ze.Root,
    {
      className: f("pr-twp tw-grid tw-gap-2", e),
      ...t,
      ref: n,
      dir: o
    }
  );
});
Er.displayName = Ze.Root.displayName;
const bn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ze.Item,
  {
    ref: n,
    className: f(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(Ze.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(_n, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
bn.displayName = Ze.Item.displayName;
function El(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function lr({
  id: e,
  options: t = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = El,
  getButtonLabel: c,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: h = "",
  commandEmptyMessage: m = "No option found",
  buttonVariant: u = "outline",
  alignDropDown: g = "start",
  isDisabled: N = !1,
  ariaLabel: v,
  ...x
}) {
  const [_, y] = D(!1), S = c ?? l, P = (C) => C.length > 0 && typeof C[0] == "object" && "options" in C[0], V = (C, M) => {
    const k = l(C), T = typeof C == "object" && "secondaryLabel" in C ? C.secondaryLabel : void 0, j = `${M ?? ""}${k}${T ?? ""}`;
    return /* @__PURE__ */ d(
      $t,
      {
        value: k,
        onSelect: () => {
          i(C), y(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Dt,
            {
              className: f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || l(s) !== k
              })
            }
          ),
          /* @__PURE__ */ d("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            k,
            T && /* @__PURE__ */ d("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              T
            ] })
          ] })
        ]
      },
      j
    );
  };
  return /* @__PURE__ */ d(oe, { open: _, onOpenChange: y, ...x, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ d(
      $,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": _,
        "aria-label": v,
        id: e,
        className: f(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: N,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            w && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: w }),
            /* @__PURE__ */ r(
              "span",
              {
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? S(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ r(fe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      qt,
      {
        align: g,
        className: f("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ d(Ut, { children: [
          /* @__PURE__ */ r(Ve, { placeholder: h, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(sn, { children: m }),
          /* @__PURE__ */ r(Yt, { children: P(t) ? t.map((C) => /* @__PURE__ */ r(Ht, { heading: C.groupHeading, children: C.options.map((M) => V(M, C.groupHeading)) }, C.groupHeading)) : t.map((C) => V(C)) })
        ] })
      }
    )
  ] });
}
function Sl({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = L(
    () => Array.from({ length: s }, (w, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ d(lt, { children: [
    /* @__PURE__ */ r(wt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      lr,
      {
        isDisabled: a,
        onChange: (w) => {
          n(w), w > t && o(w);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (w) => w.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(wt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      lr,
      {
        isDisabled: a,
        onChange: (w) => {
          o(w), w < e && n(w);
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
var Tl = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(Tl || {});
const bp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), zn = (e, t) => e[t] ?? t;
function vp({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: w
}) {
  const p = zn(w, "%webView_bookSelector_currentBook%"), h = zn(w, "%webView_bookSelector_choose%"), m = zn(w, "%webView_bookSelector_chooseBooks%"), [u, g] = D(
    "current book"
    /* CURRENT_BOOK */
  ), N = (v) => {
    g(v), e(v);
  };
  return /* @__PURE__ */ r(
    Er,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (v) => N(v),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(bn, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(wt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(wt, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Sl,
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
            /* @__PURE__ */ r(bn, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(wt, { className: "tw-ms-1", children: m })
          ] }),
          /* @__PURE__ */ r(wt, { className: "tw-flex tw-items-center", children: o.map((v) => W.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            $,
            {
              disabled: u === "current book",
              onClick: () => n(),
              children: h
            }
          )
        ] })
      ] })
    }
  );
}
const ra = kn(null);
function Rl(e, t) {
  return { getTheme: function() {
    return t ?? null;
  } };
}
function Lt() {
  const e = gr(ra);
  return e == null && function(t, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", t);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), e;
}
const oa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Dl = oa ? Gt : U, dn = { tag: br };
function Ml({ initialConfig: e, children: t }) {
  const n = L(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: c } = e, w = Rl(null, o), p = To({ editable: e.editable, html: c, namespace: a, nodes: s, onError: (h) => i(h, p), theme: o });
    return function(h, m) {
      if (m !== null) {
        if (m === void 0) h.update(() => {
          const u = te();
          if (u.isEmpty()) {
            const g = Cn();
            u.append(g);
            const N = oa ? document.activeElement : null;
            (Kt() !== null || N !== null && N === h.getRootElement()) && g.select();
          }
        }, dn);
        else if (m !== null) switch (typeof m) {
          case "string": {
            const u = h.parseEditorState(m);
            h.setEditorState(u, dn);
            break;
          }
          case "object":
            h.setEditorState(m, dn);
            break;
          case "function":
            h.update(() => {
              te().isEmpty() && m(h);
            }, dn);
        }
      }
    }(p, l), [p, w];
  }, []);
  return Dl(() => {
    const o = e.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(ra.Provider, { value: n, children: t });
}
const Ol = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Gt : U;
function Il({ ignoreHistoryMergeTagChange: e = !0, ignoreSelectionChange: t = !1, onChange: n }) {
  const [o] = Lt();
  return Ol(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: c }) => {
      t && s.size === 0 && i.size === 0 || e && c.has(br) || l.isEmpty() || n(a, o, c);
    });
  }, [o, e, t, n]), null;
}
const Sr = {
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
}, St = an.Provider, Vt = an.Root, Ft = an.Trigger, Tt = b.forwardRef(({ className: e, sideOffset: t = 4, ...n }, o) => /* @__PURE__ */ r(
  an.Content,
  {
    ref: o,
    sideOffset: t,
    className: f(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
Tt.displayName = an.Content.displayName;
const Tr = [
  ji,
  Ro,
  Do,
  zi
], Al = kn(null), Fn = {
  didCatch: !1,
  error: null
};
class Pl extends ms {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Fn;
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
      for (var n, o, a = arguments.length, s = new Array(a), i = 0; i < a; i++)
        s[i] = arguments[i];
      (n = (o = this.props).onReset) === null || n === void 0 || n.call(o, {
        args: s,
        reason: "imperative-api"
      }), this.setState(Fn);
    }
  }
  componentDidCatch(t, n) {
    var o, a;
    (o = (a = this.props).onError) === null || o === void 0 || o.call(a, t, n);
  }
  componentDidUpdate(t, n) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: a
    } = this.props;
    if (o && n.error !== null && Vl(t.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState(Fn);
    }
  }
  render() {
    const {
      children: t,
      fallbackRender: n,
      FallbackComponent: o,
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
      else if (o)
        l = jr(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return jr(Al.Provider, {
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
  return e.length !== t.length || e.some((n, o) => !Object.is(n, t[o]));
}
function $l({ children: e, onError: t }) {
  return r(Pl, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: t, children: e });
}
const Ll = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Gt : U;
function Bl(e) {
  return { initialValueFn: () => e.isEditable(), subscribe: (t) => e.registerEditableListener(t) };
}
function jl() {
  return function(e) {
    const [t] = Lt(), n = L(() => e(t), [t, e]), [o, a] = D(() => n.initialValueFn()), s = Z(o);
    return Ll(() => {
      const { initialValueFn: i, subscribe: l } = n, c = i();
      return s.current !== c && (s.current = c, a(c)), l((w) => {
        s.current = w, a(w);
      });
    }, [n, e]), o;
  }(Bl);
}
function zl(e, t, n = "self") {
  const o = e.getStartEndPoints();
  if (t.isSelected(e) && !si(t) && o !== null) {
    const [a, s] = o, i = e.isBackward(), l = a.getNode(), c = s.getNode(), w = t.is(l), p = t.is(c);
    if (w || p) {
      const [h, m] = ii(e), u = l.is(c), g = t.is(i ? c : l), N = t.is(i ? l : c);
      let v, x = 0;
      u ? (x = h > m ? m : h, v = h > m ? h : m) : g ? (x = i ? m : h, v = void 0) : N && (x = 0, v = i ? h : m);
      const _ = t.__text.slice(x, v);
      _ !== t.__text && (n === "clone" && (t = li(t)), t.__text = _);
    }
  }
  return t;
}
function Fl(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const aa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Gl = aa && "documentMode" in document ? document.documentMode : null;
!(!aa || !("InputEvent" in window) || Gl) && "getTargetRanges" in new window.InputEvent("input");
function sa(...e) {
  const t = [];
  for (const n of e) if (n && typeof n == "string") for (const [o] of n.matchAll(/\S+/g)) t.push(o);
  return t;
}
function ee(...e) {
  return () => {
    for (let t = e.length - 1; t >= 0; t--) e[t]();
    e.length = 0;
  };
}
function ia(e, ...t) {
  const n = sa(...t);
  n.length > 0 && e.classList.add(...n);
}
function Kl(e, ...t) {
  const n = sa(...t);
  n.length > 0 && e.classList.remove(...n);
}
function Qr(e) {
  const t = wi(e, (n) => ue(n) && !n.isInline());
  return ue(t) || Fl(4, e.__key), t;
}
function Hl(e, t) {
  const n = [];
  for (let o = 0; o < e.length; o++) {
    const a = t(e[o]);
    a !== null && n.push(a);
  }
  return n;
}
const Xl = Symbol.for("preact-signals");
function Sn() {
  if (Zt > 1) return void Zt--;
  let e, t = !1;
  for (; qe !== void 0; ) {
    let n = qe;
    for (qe = void 0, wr++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && la(n)) try {
        n.c();
      } catch (a) {
        t || (e = a, t = !0);
      }
      n = o;
    }
  }
  if (wr = 0, Zt--, t) throw e;
}
function Ul(e) {
  if (Zt > 0) return e();
  Zt++;
  try {
    return e();
  } finally {
    Sn();
  }
}
let Y, qe;
function to(e) {
  const t = Y;
  Y = void 0;
  try {
    return e();
  } finally {
    Y = t;
  }
}
let Zt = 0, wr = 0, mn = 0;
function eo(e) {
  if (Y === void 0) return;
  let t = e.n;
  return t === void 0 || t.t !== Y ? (t = { i: 0, S: e, p: Y.s, n: void 0, t: Y, e: void 0, x: void 0, r: t }, Y.s !== void 0 && (Y.s.n = t), Y.s = t, e.n = t, 32 & Y.f && e.S(t), t) : t.i === -1 ? (t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = Y.s, t.n = void 0, Y.s.n = t, Y.s = t), t) : void 0;
}
function mt(e, t) {
  this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function tn(e, t) {
  return new mt(e, t);
}
function la(e) {
  for (let t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function no(e) {
  for (let t = e.s; t !== void 0; t = t.n) {
    const n = t.S.n;
    if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
      e.s = t;
      break;
    }
  }
}
function wa(e) {
  let t, n = e.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : t = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  e.s = t;
}
function ce(e, t) {
  mt.call(this, void 0), this.x = e, this.s = void 0, this.g = mn - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function Yl(e, t) {
  return new ce(e, t);
}
function ca(e) {
  const t = e.u;
  if (e.u = void 0, typeof t == "function") {
    Zt++;
    const n = Y;
    Y = void 0;
    try {
      t();
    } catch (o) {
      throw e.f &= -2, e.f |= 8, Rr(e), o;
    } finally {
      Y = n, Sn();
    }
  }
}
function Rr(e) {
  for (let t = e.s; t !== void 0; t = t.n) t.S.U(t);
  e.x = void 0, e.s = void 0, ca(e);
}
function ql(e) {
  if (Y !== this) throw new Error("Out-of-order effect");
  wa(this), Y = e, this.f &= -2, 8 & this.f && Rr(this), Sn();
}
function ke(e, t) {
  this.x = e, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = t == null ? void 0 : t.name;
}
function ne(e, t) {
  const n = new ke(e, t);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Tn(e, t = {}) {
  const n = {};
  for (const o in e) {
    const a = t[o], s = tn(a === void 0 ? e[o] : a);
    n[o] = s;
  }
  return n;
}
mt.prototype.brand = Xl, mt.prototype.h = function() {
  return !0;
}, mt.prototype.S = function(e) {
  const t = this.t;
  t !== e && e.e === void 0 && (e.x = t, this.t = e, t !== void 0 ? t.e = e : to(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, mt.prototype.U = function(e) {
  if (this.t !== void 0) {
    const t = e.e, n = e.x;
    t !== void 0 && (t.x = n, e.e = void 0), n !== void 0 && (n.e = t, e.x = void 0), e === this.t && (this.t = n, n === void 0 && to(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, mt.prototype.subscribe = function(e) {
  return ne(() => {
    const t = this.value, n = Y;
    Y = void 0;
    try {
      e(t);
    } finally {
      Y = n;
    }
  }, { name: "sub" });
}, mt.prototype.valueOf = function() {
  return this.value;
}, mt.prototype.toString = function() {
  return this.value + "";
}, mt.prototype.toJSON = function() {
  return this.value;
}, mt.prototype.peek = function() {
  const e = Y;
  Y = void 0;
  try {
    return this.value;
  } finally {
    Y = e;
  }
}, Object.defineProperty(mt.prototype, "value", { get() {
  const e = eo(this);
  return e !== void 0 && (e.i = this.i), this.v;
}, set(e) {
  if (e !== this.v) {
    if (wr > 100) throw new Error("Cycle detected");
    this.v = e, this.i++, mn++, Zt++;
    try {
      for (let t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      Sn();
    }
  }
} }), ce.prototype = new mt(), ce.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === mn)) return !0;
  if (this.g = mn, this.f |= 1, this.i > 0 && !la(this)) return this.f &= -2, !0;
  const e = Y;
  try {
    no(this), Y = this;
    const t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return Y = e, wa(this), this.f &= -2, !0;
}, ce.prototype.S = function(e) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  mt.prototype.S.call(this, e);
}, ce.prototype.U = function(e) {
  if (this.t !== void 0 && (mt.prototype.U.call(this, e), this.t === void 0)) {
    this.f &= -33;
    for (let t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
}, ce.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let e = this.t; e !== void 0; e = e.x) e.t.N();
  }
}, Object.defineProperty(ce.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const e = eo(this);
  if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), ke.prototype.c = function() {
  const e = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    e();
  }
}, ke.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ca(this), no(this), Zt++;
  const e = Y;
  return Y = this, ql.bind(this, e);
}, ke.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = qe, qe = this);
}, ke.prototype.d = function() {
  this.f |= 8, 1 & this.f || Rr(this);
}, ke.prototype.dispose = function() {
  this.d();
};
Xt({ build: (e, t, n) => Tn(t), config: on({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(e, t, n) {
  const o = n.getOutput();
  return ne(() => o.disabled.value ? void 0 : e.registerRootListener((a) => {
    e.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function da() {
  const e = te(), t = Kt(), n = Cn();
  e.clear(), e.append(n), t !== null && n.select(), Qe(t) && (t.format = 0);
}
function pa(e, t = da) {
  return e.registerCommand(Mo, (n) => (e.update(t), !0), Oo);
}
Xt({ build: (e, t, n) => Tn(t), config: on({ $onClear: da }), name: "@lexical/extension/ClearEditor", register(e, t, n) {
  const { $onClear: o } = n.getOutput();
  return ne(() => pa(e, o.value));
} });
function Jl(e) {
  return (typeof e.nodes == "function" ? e.nodes() : e.nodes) || [];
}
function ua(e, t) {
  let n;
  return tn(e(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = e(), n = t(this);
  } });
}
const cr = Xt({ build: (e) => ua(() => e.getEditorState(), (t) => e.registerUpdateListener((n) => {
  t.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function Q(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ma(e, t) {
  if (e && t && !Array.isArray(t) && typeof e == "object" && typeof t == "object") {
    const n = e, o = t;
    for (const a in o) n[a] = ma(n[a], o[a]);
    return e;
  }
  return t;
}
const Dr = 0, dr = 1, ha = 2, Gn = 3, pn = 4, Ne = 5, Kn = 6, Ke = 7;
function Hn(e) {
  return e.id === Dr;
}
function fa(e) {
  return e.id === ha;
}
function Wl(e) {
  return function(t) {
    return t.id === dr;
  }(e) || Q(305, String(e.id), String(dr)), Object.assign(e, { id: ha });
}
const Zl = /* @__PURE__ */ new Set();
class Ql {
  constructor(t, n) {
    ut(this, "builder");
    ut(this, "configs");
    ut(this, "_dependency");
    ut(this, "_peerNameSet");
    ut(this, "extension");
    ut(this, "state");
    ut(this, "_signal");
    this.builder = t, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Dr };
  }
  mergeConfigs() {
    let t = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : ci;
    for (const o of this.configs) t = n(t, o);
    return t;
  }
  init(t) {
    const n = this.state;
    fa(n) || Q(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, c, w) {
      return Object.assign(l, { config: c, id: Gn, registerState: w });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(t, s.config, o)), this.state = function(l, c, w) {
      return Object.assign(l, { id: pn, initResult: c, registerState: w });
    }(s, i, a);
  }
  build(t) {
    const n = this.state;
    let o;
    n.id !== pn && Q(307, String(n.id), String(Ne)), this.extension.build && (o = this.extension.build(t, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: Ne, output: i, registerState: l });
    }(n, o, a);
  }
  register(t, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Ne && Q(308, String(o.id), String(Ne));
    const a = this.extension.register && this.extension.register(t, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Kn });
    }(o), () => {
      const s = this.state;
      s.id !== Ke && Q(309, String(o.id), String(Ke)), this.state = function(i) {
        return Object.assign(i, { id: Ne });
      }(s), a && a();
    };
  }
  afterRegistration(t) {
    const n = this.state;
    let o;
    return n.id !== Kn && Q(310, String(n.id), String(Kn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(t, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Ke });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && Q(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && Q(312, this.extension.name);
    const t = this.state;
    return function(n) {
      return n.id >= pn;
    }(t) || Q(313, String(t.id), String(pn)), t.initResult;
  }
  getInitPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const t = this.state;
    return function(n) {
      return n.id >= Gn;
    }(t) || Q(314, String(t.id), String(Gn)), { config: t.config };
  }
  getPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && Q(315, this.extension.name, t.name), n.getExtensionInitDependency();
  }
  getDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && Q(315, this.extension.name, t.name), n.getExtensionDependency();
  }
  getState() {
    const t = this.state;
    return function(n) {
      return n.id >= Ke;
    }(t) || Q(316, String(t.id), String(Ke)), t;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Zl;
  }
  getPeerNameSet() {
    let t = this._peerNameSet;
    return t || (t = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = t), t;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const t = this.state;
      (function(n) {
        return n.id >= Ne;
      })(t) || Q(317, this.extension.name), this._dependency = { config: t.config, init: t.initResult, output: t.output };
    }
    return this._dependency;
  }
}
const ro = { tag: br };
function tw() {
  const e = te();
  e.isEmpty() && e.append(Cn());
}
const ew = Xt({ config: on({ setOptions: ro, updateOptions: ro }), init: ({ $initialEditorState: e = tw }) => ({ $initialEditorState: e, initialized: !1 }), afterRegistration(e, { updateOptions: t, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (mi(s)) e.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [di, Do, pi, ui, Ro] }), oo = Symbol.for("@lexical/extension/LexicalBuilder");
function ao() {
}
function nw(e) {
  throw e;
}
function un(e) {
  return Array.isArray(e) ? e : [e];
}
const Xn = "0.38.2+prod.esm";
class Je {
  constructor(t) {
    ut(this, "roots");
    ut(this, "extensionNameMap");
    ut(this, "outgoingConfigEdges");
    ut(this, "incomingEdges");
    ut(this, "conflicts");
    ut(this, "_sortedExtensionReps");
    ut(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Xn, this.roots = t;
    for (const n of t) this.addExtension(n);
  }
  static fromExtensions(t) {
    const n = [un(ew)];
    for (const o of t) n.push(un(o));
    return new Je(n);
  }
  static maybeFromEditor(t) {
    const n = t[oo];
    return n && (n.PACKAGE_VERSION !== Xn && Q(292, n.PACKAGE_VERSION, Xn), n instanceof Je || Q(293)), n;
  }
  static fromEditor(t) {
    const n = Je.maybeFromEditor(t);
    return n === void 0 && Q(294), n;
  }
  constructEditor() {
    const { $initialEditorState: t, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(To({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [oo]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let t = ao;
    function n() {
      try {
        t();
      } finally {
        t = ao;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return t = ee(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(t) {
    return this.extensionNameMap.has(t);
  }
  getExtensionRep(t) {
    const n = this.extensionNameMap.get(t.name);
    if (n) return n.extension !== t && Q(295, t.name), n;
  }
  addEdge(t, n, o) {
    const a = this.outgoingConfigEdges.get(t);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(t, /* @__PURE__ */ new Map([[n, o]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(t) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([t]));
  }
  addExtension(t) {
    this._sortedExtensionReps !== void 0 && Q(296);
    const n = un(t), [o] = n;
    typeof o.name != "string" && Q(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && Q(298, o.name), !a) {
      a = new Ql(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && Q(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && Q(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = un(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const t = [], n = (o, a) => {
      let s = o.state;
      if (fa(s)) return;
      const i = o.extension.name;
      var l;
      Hn(s) || Q(300, i, a || "[unknown]"), Hn(l = s) || Q(304, String(l.id), String(Dr)), s = Object.assign(l, { id: dr }), o.state = s;
      const c = this.outgoingConfigEdges.get(i);
      if (c) for (const w of c.keys()) {
        const p = this.extensionNameMap.get(w);
        p && n(p, i);
      }
      s = Wl(s), o.state = s, t.push(o);
    };
    for (const o of this.extensionNameMap.values()) Hn(o.state) && n(o);
    for (const o of t) for (const [a, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && Q(301, o.name);
      for (const i of a) s.configs.add(i);
    }
    return this._sortedExtensionReps = t, this._sortedExtensionReps;
  }
  registerEditor(t) {
    const n = this.sortedExtensionReps(), o = new AbortController(), a = [() => o.abort()], s = o.signal;
    for (const i of n) {
      const l = i.register(t, s);
      l && a.push(l);
    }
    for (const i of n) {
      const l = i.afterRegistration(t);
      l && a.push(l);
    }
    return ee(...a);
  }
  buildCreateEditorArgs() {
    const t = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: h } = p;
      if (h.onError !== void 0 && (t.onError = h.onError), h.disableEvents !== void 0 && (t.disableEvents = h.disableEvents), h.parentEditor !== void 0 && (t.parentEditor = h.parentEditor), h.editable !== void 0 && (t.editable = h.editable), h.namespace !== void 0 && (t.namespace = h.namespace), h.$initialEditorState !== void 0 && (t.$initialEditorState = h.$initialEditorState), h.nodes) for (const m of Jl(h)) {
        if (typeof m != "function") {
          const u = o.get(m.replace);
          u && Q(302, h.name, m.replace.name, u.extension.name), o.set(m.replace, p);
        }
        n.add(m);
      }
      if (h.html) {
        if (h.html.export) for (const [m, u] of h.html.export.entries()) a.set(m, u);
        h.html.import && Object.assign(s, h.html.import);
      }
      h.theme && ma(i, h.theme);
    }
    Object.keys(i).length > 0 && (t.theme = i), n.size && (t.nodes = [...n]);
    const c = Object.keys(s).length > 0, w = a.size > 0;
    (c || w) && (t.html = {}, c && (t.html.import = s), w && (t.html.export = a));
    for (const p of l) p.init(t);
    return t.onError || (t.onError = nw), t;
  }
}
const rw = /* @__PURE__ */ new Set(), so = Xt({ build(e, t, n) {
  const o = n.getDependency(cr).output, a = tn({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = ua(() => {
  }, () => ne(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (Kt()) for (const [p, h] of l.entries()) {
        if (h.size === 0) {
          l.delete(p);
          continue;
        }
        const m = Ci(p), u = m && m.isSelected() || !1;
        w = w || u !== (!!i && i.has(p)), u && (c = c || /* @__PURE__ */ new Set(), c.add(p));
      }
    }), !w && c && i && c.size === i.size || (s.value = c);
  }));
  return { watchNodeKey: function(i) {
    const l = Yl(() => (s.value || rw).has(i)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(i);
    const p = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), p || (c.set(i, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [cr], name: "@lexical/extension/NodeSelection" });
hi("INSERT_HORIZONTAL_RULE_COMMAND");
class Te extends ki {
  static getType() {
    return "horizontalrule";
  }
  static clone(t) {
    return new Te(t.__key);
  }
  static importJSON(t) {
    return ga().updateFromJSON(t);
  }
  static importDOM() {
    return { hr: () => ({ conversion: ow, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(t) {
    const n = document.createElement("hr");
    return ia(n, t.theme.hr), n;
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
function ow() {
  return { node: ga() };
}
function ga() {
  return _i(Te);
}
function aw(e) {
  return e instanceof Te;
}
Xt({ dependencies: [cr, so], name: "@lexical/extension/HorizontalRule", nodes: [Te], register(e, t, n) {
  const { watchNodeKey: o } = n.getDependency(so).output, a = tn({ nodeSelections: /* @__PURE__ */ new Map() }), s = e._config.theme.hrSelected ?? "selected";
  return ee(e.registerCommand(fi, (i) => {
    if (gi(i.target)) {
      const l = bi(i.target);
      if (aw(l)) return function(c, w = !1) {
        const p = Kt(), h = c.isSelected(), m = c.getKey();
        let u;
        w && vi(p) ? u = p : (u = xi(), yi(u)), h ? u.delete(m) : u.add(m);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Ni), e.registerMutationListener(Te, (i, l) => {
    Ul(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [p, h] of i.entries()) if (h === "destroyed") w.delete(p), c = !0;
      else {
        const m = w.get(p), u = e.getElementByKey(p);
        m ? m.domNode.value = u : (c = !0, w.set(p, { domNode: tn(u), selectedSignal: o(p) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), ne(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) i.push(ne(() => {
      const w = l.value;
      w && (c.value ? ia(w, s) : Kl(w, s));
    }));
    return ee(...i);
  }));
} });
function sw(e, t) {
  return ee(e.registerCommand(Ei, (n) => {
    const o = Kt();
    if (!Qe(o)) return !1;
    n.preventDefault();
    const a = function(s) {
      const i = s.getNodes();
      if (Hl(i, (m) => fn(m) && m.canIndent() ? m : null).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, p = w.getNode(), h = Qr(p);
      if (h.canIndent()) {
        const m = h.getKey();
        let u = Si();
        if (u.anchor.set(m, 0, "element"), u.focus.set(m, 0, "element"), u = Ti(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(o) ? n.shiftKey ? Ri : Hr : Di;
    return e.dispatchCommand(a, void 0);
  }, Oo), e.registerCommand(Hr, () => {
    const n = typeof t == "number" ? t : t ? t.peek() : null;
    if (n == null) return !1;
    const o = Kt();
    if (!Qe(o)) return !1;
    const a = o.getNodes().map((s) => Qr(s).getIndent());
    return Math.max(...a) + 1 >= n;
  }, vr));
}
Xt({ build: (e, t, n) => Tn(t), config: on({ disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(e, t, n) {
  const { disabled: o, maxIndent: a } = n.getOutput();
  return ne(() => {
    if (!o.value) return sw(e, a);
  });
} });
const iw = Xt({ name: "@lexical/react/ReactProvider" });
function lw() {
  return te().getTextContent();
}
function ww(e, t = !0) {
  if (e) return !1;
  let n = lw();
  return t && (n = n.trim()), n === "";
}
function cw(e) {
  if (!ww(e, !1)) return !1;
  const t = te().getChildren(), n = t.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = t[o];
    if (Mi(a)) return !1;
    if (ue(a)) {
      if (!Oi(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const c = s[o];
        if (!gn(c)) return !1;
      }
    }
  }
  return !0;
}
function ba(e) {
  return () => cw(e);
}
function va(e) {
  const t = window.location.origin, n = (o) => {
    if (o.origin !== t) return;
    const a = e.getRootElement();
    if (document.activeElement !== a) return;
    const s = o.data;
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
            const [w, p, h, m, u] = c;
            e.update(() => {
              const g = Kt();
              if (Qe(g)) {
                const N = g.anchor;
                let v = N.getNode(), x = 0, _ = 0;
                if (gn(v) && w >= 0 && p >= 0 && (x = w, _ = w + p, g.setTextNodeRange(v, x, v, _)), x === _ && h === "" || (g.insertRawText(h), v = N.getNode()), gn(v)) {
                  x = m, _ = m + u;
                  const y = v.getTextContentSize();
                  x = x > y ? y : x, _ = _ > y ? y : _, g.setTextNodeRange(v, x, v, _);
                }
                o.stopImmediatePropagation();
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
Xt({ build: (e, t, n) => Tn(t), config: on({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (e, t, n) => ne(() => n.getOutput().disabled.value ? void 0 : va(e)) });
function dw(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Mr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Gt : U;
function pw({ editor: e, ErrorBoundary: t }) {
  return function(n, o) {
    const [a, s] = D(() => n.getDecorators());
    return Mr(() => n.registerDecoratorListener((i) => {
      Gi(() => {
        s(i);
      });
    }), [n]), U(() => {
      s(n.getDecorators());
    }, [n]), L(() => {
      const i = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], p = r(o, { onError: (m) => n._onError(m), children: r(hs, { fallback: null, children: a[w] }) }), h = n.getElementByKey(w);
        h !== null && i.push(Ki(p, h, w));
      }
      return i;
    }, [o, a, n]);
  }(e, t);
}
function uw({ editor: e, ErrorBoundary: t }) {
  return function(n) {
    const o = Je.maybeFromEditor(n);
    if (o && o.hasExtensionByName(iw.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && dw(320, a);
      return !0;
    }
    return !1;
  }(e) ? null : r(pw, { editor: e, ErrorBoundary: t });
}
function io(e) {
  return e.getEditorState().read(ba(e.isComposing()));
}
function mw({ contentEditable: e, placeholder: t = null, ErrorBoundary: n }) {
  const [o] = Lt();
  return function(a) {
    Mr(() => ee(Fi(a), va(a)), [a]);
  }(o), d(lt, { children: [e, r(hw, { content: t }), r(uw, { editor: o, ErrorBoundary: n })] });
}
function hw({ content: e }) {
  const [t] = Lt(), n = function(a) {
    const [s, i] = D(() => io(a));
    return Mr(() => {
      function l() {
        const c = io(a);
        i(c);
      }
      return l(), ee(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(t), o = jl();
  return n ? typeof e == "function" ? e(o) : e : null;
}
function fw({ defaultSelection: e }) {
  const [t] = Lt();
  return U(() => {
    t.focus(() => {
      const n = document.activeElement, o = t.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: e });
  }, [e, t]), null;
}
const gw = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Gt : U;
function bw({ onClear: e }) {
  const [t] = Lt();
  return gw(() => pa(t, e), [t, e]), null;
}
const xa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Gt : U;
function vw({ editor: e, ariaActiveDescendant: t, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: p, ariaOwns: h, ariaRequired: m, autoCapitalize: u, className: g, id: N, role: v = "textbox", spellCheck: x = !0, style: _, tabIndex: y, "data-testid": S, ...P }, V) {
  const [C, M] = D(e.isEditable()), k = z((j) => {
    j && j.ownerDocument && j.ownerDocument.defaultView ? e.setRootElement(j) : e.setRootElement(null);
  }, [e]), T = L(() => /* @__PURE__ */ function(...j) {
    return (B) => {
      for (const F of j) typeof F == "function" ? F(B) : F != null && (F.current = B);
    };
  }(V, k), [k, V]);
  return xa(() => (M(e.isEditable()), e.registerEditableListener((j) => {
    M(j);
  })), [e]), r("div", { "aria-activedescendant": C ? t : void 0, "aria-autocomplete": C ? n : "none", "aria-controls": C ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": C && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": p, "aria-owns": C ? h : void 0, "aria-readonly": !C || void 0, "aria-required": m, autoCapitalize: u, className: g, contentEditable: C, "data-testid": S, id: N, ref: T, role: v, spellCheck: x, style: _, tabIndex: y, ...P });
}
const xw = rn(vw);
function lo(e) {
  return e.getEditorState().read(ba(e.isComposing()));
}
const yw = rn(Nw);
function Nw(e, t) {
  const { placeholder: n, ...o } = e, [a] = Lt();
  return d(lt, { children: [r(xw, { editor: a, ...o, ref: t }), n != null && r(kw, { editor: a, content: n })] });
}
function kw({ content: e, editor: t }) {
  const n = function(i) {
    const [l, c] = D(() => lo(i));
    return xa(() => {
      function w() {
        const p = lo(i);
        c(p);
      }
      return w(), ee(i.registerUpdateListener(() => {
        w();
      }), i.registerEditableListener(() => {
        w();
      }));
    }, [i]), l;
  }(t), [o, a] = D(t.isEditable());
  if (Gt(() => (a(t.isEditable()), t.registerEditableListener((i) => {
    a(i);
  })), [t]), !n) return null;
  let s = null;
  return typeof e == "function" ? s = e(o) : e !== null && (s = e), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function _w({
  placeholder: e,
  className: t,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    yw,
    {
      className: t ?? "ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none",
      "aria-placeholder": e,
      placeholder: /* @__PURE__ */ r(
        "div",
        {
          className: n ?? "tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",
          children: e
        }
      )
    }
  );
}
const ya = kn(void 0);
function Cw({
  activeEditor: e,
  $updateToolbar: t,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = L(
    () => ({
      activeEditor: e,
      $updateToolbar: t,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [e, t, n, o, a]
  );
  return /* @__PURE__ */ r(ya.Provider, { value: i, children: s });
}
function Na() {
  const e = gr(ya);
  if (!e)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return e;
}
function Ew() {
  const [e, t] = D(void 0), n = z(() => {
    t(void 0);
  }, []), o = L(() => {
    if (e === void 0)
      return;
    const { title: s, content: i } = e;
    return /* @__PURE__ */ r(ol, { open: !0, onOpenChange: n, children: /* @__PURE__ */ d(Go, { children: [
      /* @__PURE__ */ r(Ko, { children: /* @__PURE__ */ r(Ho, { children: s }) }),
      i
    ] }) });
  }, [e, n]), a = z(
    (s, i, l = !1) => {
      t({
        closeOnClickOutside: l,
        content: i(n),
        title: s
      });
    },
    [n]
  );
  return [o, a];
}
function Sw({
  children: e
}) {
  const [t] = Lt(), [n, o] = D(t), [a, s] = D("paragraph"), [i, l] = Ew(), c = () => {
  };
  return U(() => n.registerCommand(
    Io,
    (w, p) => (o(p), !1),
    vr
  ), [n]), /* @__PURE__ */ d(
    Cw,
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
function Tw(e) {
  const [t] = Lt(), { activeEditor: n } = Na();
  U(() => n.registerCommand(
    Io,
    () => {
      const o = Kt();
      return o && e(o), !1;
    },
    vr
  ), [t, e]), U(() => {
    n.getEditorState().read(() => {
      const o = Kt();
      o && e(o);
    });
  }, [n, e]);
}
const ka = re(
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
), Rw = b.forwardRef(({ className: e, variant: t, size: n, ...o }, a) => /* @__PURE__ */ r(
  Vo.Root,
  {
    ref: a,
    className: f(ka({ variant: t, size: n, className: e })),
    ...o
  }
));
Rw.displayName = Vo.Root.displayName;
const _a = b.createContext({
  size: "default",
  variant: "default"
}), Or = b.forwardRef(({ className: e, variant: t, size: n, children: o, ...a }, s) => {
  const i = ct();
  return /* @__PURE__ */ r(
    En.Root,
    {
      ref: s,
      className: f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        _a.Provider,
        {
          value: { variant: t, size: n },
          children: o
        }
      )
    }
  );
});
Or.displayName = En.Root.displayName;
const We = b.forwardRef(({ className: e, children: t, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(_a);
  return /* @__PURE__ */ r(
    En.Item,
    {
      ref: s,
      className: f(
        ka({
          variant: i.variant || n,
          size: i.size || o
        }),
        e
      ),
      ...a,
      children: t
    }
  );
});
We.displayName = En.Item.displayName;
const wo = [
  { format: "bold", icon: vs, label: "Bold" },
  { format: "italic", icon: xs, label: "Italic" },
  { format: "underline", icon: ys, label: "Underline" },
  { format: "strikethrough", icon: Ns, label: "Strikethrough" }
];
function Dw() {
  const { activeEditor: e } = Na(), [t, n] = D([]), o = z((a) => {
    if (Qe(a) || Hi(a)) {
      const s = [];
      wo.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return Tw(o), /* @__PURE__ */ r(
    Or,
    {
      type: "multiple",
      value: t,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: wo.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        We,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            e.dispatchCommand(Ii, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function Mw({ onClear: e }) {
  const [t] = Lt();
  U(() => {
    e && e(() => {
      t.dispatchCommand(Mo, void 0);
    });
  }, [t, e]);
}
function Ow({
  placeholder: e = "Start typing ...",
  autoFocus: t = !1,
  onClear: n
}) {
  const [, o] = D(void 0);
  return /* @__PURE__ */ d("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(Sw, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(Dw, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        mw,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(_w, { placeholder: e }) }),
          ErrorBoundary: $l
        }
      ),
      t && /* @__PURE__ */ r(fw, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(Mw, { onClear: n }),
      /* @__PURE__ */ r(bw, {})
    ] })
  ] });
}
const Iw = {
  namespace: "commentEditor",
  theme: Sr,
  nodes: Tr,
  onError: (e) => {
    console.error(e);
  }
};
function vn({
  editorState: e,
  editorSerializedState: t,
  onChange: n,
  onSerializedChange: o,
  placeholder: a = "Start typing…",
  autoFocus: s = !1,
  onClear: i
}) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow", children: /* @__PURE__ */ r(
    Ml,
    {
      initialConfig: {
        ...Iw,
        ...e ? { editorState: e } : {},
        ...t ? { editorState: JSON.stringify(t) } : {}
      },
      children: /* @__PURE__ */ d(St, { children: [
        /* @__PURE__ */ r(Ow, { placeholder: a, autoFocus: s, onClear: i }),
        /* @__PURE__ */ r(
          Il,
          {
            ignoreSelectionChange: !0,
            onChange: (l) => {
              n == null || n(l), o == null || o(l.toJSON());
            }
          }
        )
      ] })
    }
  ) });
}
function Aw(e, t) {
  const n = Vi(t) ? t.body.childNodes : t.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!Ea.has(s.nodeName)) {
    const i = Sa(s, e, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof Ao && i.insertAfter(Po());
    for (const i of s) {
      const l = i.getChildren();
      for (const c of l) i.insertBefore(c);
      i.remove();
    }
  }(a), o;
}
function Pw(e, t) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = te().getChildren();
  for (let a = 0; a < o.length; a++)
    Ca(e, o[a], n, t);
  return n.innerHTML;
}
function Ca(e, t, n, o = null) {
  let a = o === null || t.isSelected(o);
  const s = ue(t) && t.excludeFromCopy("html");
  let i = t;
  o !== null && gn(t) && (i = zl(o, t, "clone"));
  const l = ue(i) ? i.getChildren() : [], c = Ai(e, i.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(e, i) : i.exportDOM(e);
  const { element: p, after: h } = w;
  if (!p) return !1;
  const m = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], N = Ca(e, g, m, o);
    !a && ue(t) && N && t.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Pi(p) || Xr(p)) && p.append(m), n.append(p), h) {
      const u = h.call(i, p);
      u && (Xr(p) ? p.replaceChildren(u) : p.replaceWith(u));
    }
  } else n.append(m);
  return a;
}
const Ea = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Sa(e, t, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (Ea.has(e.nodeName)) return i;
  let l = null;
  const c = function(g, N) {
    const { nodeName: v } = g, x = N._htmlConversions.get(v.toLowerCase());
    let _ = null;
    if (x !== void 0) for (const y of x) {
      const S = y(g);
      S !== null && (_ === null || (_.priority || 0) <= (S.priority || 0)) && (_ = S);
    }
    return _ !== null ? _.conversion : null;
  }(e, t), w = c ? c(e) : null;
  let p = null;
  if (w !== null) {
    p = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, N] of a) if (l = N(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(e.nodeName, w.forChild);
  }
  const h = e.childNodes;
  let m = [];
  const u = (l == null || !$i(l)) && (l != null && fn(l) || o);
  for (let g = 0; g < h.length; g++) m.push(...Sa(h[g], t, n, u, new Map(a), l));
  return p != null && (m = p(m)), Ur(e) && (m = Vw(e, m, u ? () => {
    const g = new Ao();
    return n.push(g), g;
  } : Cn)), l == null ? m.length > 0 ? i = i.concat(m) : Ur(e) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Yr(g.nextSibling) && Yr(g.previousSibling);
  }(e) && (i = i.concat(Po())) : ue(l) && l.append(...m), i;
}
function Vw(e, t, n) {
  const o = e.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (fn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === t.length - 1 || i < t.length - 1 && fn(t[i + 1])) {
      const c = n();
      c.setFormat(o), c.append(...s), a.push(c), s = [];
    }
  }
  return a;
}
function Ta(e) {
  const t = e.querySelector('[contenteditable="true"]');
  if (!t) return !1;
  t.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(t), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Et(e) {
  var t;
  return (t = e == null ? void 0 : e.root) != null && t.children ? e.root.children.some((n) => n != null && n.children ? n.children.some((o) => (o == null ? void 0 : o.text) && o.text.trim().length > 0) : !1) : !1;
}
function $w(e) {
  if (!e || e.trim() === "")
    throw new Error("Input HTML is empty");
  const t = e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi, "<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi, "$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi, "$1"), n = $o({
    namespace: "EditorUtils",
    theme: Sr,
    nodes: Tr,
    onError: (a) => {
      console.error(a);
    }
  });
  let o;
  if (n.update(
    () => {
      const s = new DOMParser().parseFromString(t, "text/html"), i = Aw(n, s);
      te().clear(), Li(i);
    },
    {
      discrete: !0
    }
  ), n.getEditorState().read(() => {
    o = n.getEditorState().toJSON();
  }), !o)
    throw new Error("Failed to convert HTML to editor state");
  return o;
}
function xn(e) {
  const t = $o({
    namespace: "EditorUtils",
    theme: Sr,
    nodes: Tr,
    onError: (a) => {
      console.error(a);
    }
  }), n = t.parseEditorState(JSON.stringify(e));
  t.setEditorState(n);
  let o = "";
  return t.getEditorState().read(() => {
    o = Pw(t);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<s>(.*?)<\/s>/g, "<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Ir(e) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key) ? (e.stopPropagation(), !0) : !1;
}
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
function Un(e, t) {
  return e === "" ? t["%commentEditor_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%commentEditor_team%"] ?? "Team" : e;
}
function xp({
  assignableUsers: e,
  onSave: t,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = D(Lw), [i, l] = D(void 0), [c, w] = D(!1), p = Z(void 0), h = Z(null);
  U(() => {
    let x = !0;
    const _ = h.current;
    if (!_) return;
    const y = setTimeout(() => {
      x && Ta(_);
    }, 300);
    return () => {
      x = !1, clearTimeout(y);
    };
  }, []);
  const m = z(() => {
    if (!Et(a)) return;
    const x = xn(a);
    t(x, i);
  }, [a, t, i]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", N = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Vt, { children: [
          /* @__PURE__ */ r(Ft, { asChild: !0, children: /* @__PURE__ */ r($, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Ie, {}) }) }),
          /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: N }) })
        ] }) }),
        /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Vt, { children: [
          /* @__PURE__ */ r(Ft, { asChild: !0, children: /* @__PURE__ */ r(
            $,
            {
              onClick: m,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !Et(a),
              children: /* @__PURE__ */ r(Dt, {})
            }
          ) }),
          /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ d(oe, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ d(
        $,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: e.length === 0,
          children: [
            /* @__PURE__ */ r(vo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Un(i !== void 0 ? i : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        qt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (x) => {
            x.key === "Escape" && (x.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ r(Ut, { children: /* @__PURE__ */ r(Yt, { children: e.map((x) => /* @__PURE__ */ r(
            $t,
            {
              onSelect: () => {
                l(x === "" ? void 0 : x), w(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Un(x, o) })
            },
            x || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ r(
      "div",
      {
        ref: h,
        role: "textbox",
        tabIndex: -1,
        className: "tw-outline-none",
        onKeyDownCapture: (x) => {
          x.key === "Escape" ? (x.preventDefault(), x.stopPropagation(), n()) : x.key === "Enter" && x.shiftKey && (x.preventDefault(), x.stopPropagation(), Et(a) && m());
        },
        onKeyDown: (x) => {
          Ir(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          vn,
          {
            editorSerializedState: a,
            onSerializedChange: (x) => s(x),
            placeholder: u,
            onClear: (x) => {
              p.current = x;
            }
          }
        )
      }
    )
  ] });
}
const yp = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), Np = [
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
], Bw = ["input", "select", "textarea", "button"], jw = ["button", "textbox"], zw = ({
  options: e,
  onFocusChange: t,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = Z(null), [s, i] = D(void 0), [l, c] = D(void 0), w = z(
    (u) => {
      i(u);
      const g = e.find((v) => v.id === u);
      g && (t == null || t(g));
      const N = document.getElementById(u);
      N && (N.scrollIntoView({ block: "center" }), N.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [t, e]
  ), p = z(
    (u) => {
      const g = e.find((N) => N.id === u);
      g && (c((N) => N === u ? void 0 : u), n == null || n(g));
    },
    [n, e]
  ), h = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || Bw.includes(g)) return !0;
    const N = u.getAttribute("role");
    if (N && jw.includes(N)) return !0;
    const v = u.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, m = z(
    (u) => {
      var C;
      const g = u.target, N = (M) => M ? document.getElementById(M) : void 0, v = N(l), x = N(s);
      if (!!(v && g && v.contains(g) && g !== v) && h(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const M = e.find((k) => k.id === l);
            M && w(M.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!v) return;
          const M = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (M.length === 0) return;
          const k = M.findIndex((j) => j === g);
          if (k === -1) return;
          let T;
          u.key === "ArrowDown" ? T = Math.min(k + 1, M.length - 1) : T = Math.max(k - 1, 0), T !== k && (u.preventDefault(), u.stopPropagation(), (C = M[T]) == null || C.focus());
          return;
        }
        return;
      }
      const S = e.findIndex((M) => M.id === s);
      let P = S;
      switch (u.key) {
        case "ArrowDown":
          P = Math.min(S + 1, e.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          P = Math.max(S - 1, 0), u.preventDefault();
          break;
        case "Home":
          P = 0, u.preventDefault();
          break;
        case "End":
          P = e.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const M = x;
          if (M) {
            const k = M.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = M.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), j = k ?? T;
            if (j) {
              u.preventDefault(), j.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (h(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const V = e[P];
      V && w(V.id);
    },
    [e, w, s, l, p, o]
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
}, Fw = re(
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
), Re = b.forwardRef(
  ({ className: e, variant: t, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: f("pr-twp", Fw({ variant: t }), e), ...n })
);
Re.displayName = "Badge";
const Ra = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Ra.displayName = "Card";
const Gw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
Gw.displayName = "CardHeader";
const Kw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: f(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...t,
      children: t.children
    }
  )
);
Kw.displayName = "CardTitle";
const Hw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("p", { ref: n, className: f("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
Hw.displayName = "CardDescription";
const Da = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
Da.displayName = "CardContent";
const Xw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
Xw.displayName = "CardFooter";
const De = b.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Lo.Root,
  {
    ref: a,
    decorative: n,
    orientation: t,
    className: f(
      "pr-twp tw-shrink-0 tw-bg-border",
      t === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...o
  }
));
De.displayName = Lo.Root.displayName;
const Ma = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Pe.Root,
  {
    ref: n,
    className: f(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      e
    ),
    ...t
  }
));
Ma.displayName = Pe.Root.displayName;
const Uw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Pe.Image,
  {
    ref: n,
    className: f("pr-twp tw-aspect-square tw-h-full tw-w-full", e),
    ...t
  }
));
Uw.displayName = Pe.Image.displayName;
const Oa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Pe.Fallback,
  {
    ref: n,
    className: f(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      e
    ),
    ...t
  }
));
Oa.displayName = Pe.Fallback.displayName;
const Ar = kn(void 0);
function Ot() {
  const e = gr(Ar);
  if (!e)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return e;
}
const Jt = re("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Le = nt.Trigger, Ia = nt.Group, Yw = nt.Portal, qw = nt.Sub, Jw = nt.RadioGroup;
function xe({ variant: e = "default", ...t }) {
  const n = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Ar.Provider, { value: n, children: /* @__PURE__ */ r(nt.Root, { ...t }) });
}
const Aa = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => {
  const s = Ot();
  return /* @__PURE__ */ d(
    nt.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        t && "tw-pl-8",
        e,
        Jt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Ee, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Aa.displayName = nt.SubTrigger.displayName;
const Pa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  nt.SubContent,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Pa.displayName = nt.SubContent.displayName;
const se = b.forwardRef(({ className: e, sideOffset: t = 4, children: n, ...o }, a) => {
  const s = ct();
  return /* @__PURE__ */ r(nt.Portal, { children: /* @__PURE__ */ r(
    nt.Content,
    {
      ref: a,
      sideOffset: t,
      className: f(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
se.displayName = nt.Content.displayName;
const yn = b.forwardRef(({ className: e, inset: t, ...n }, o) => {
  const a = ct(), s = Ot();
  return /* @__PURE__ */ r(
    nt.Item,
    {
      ref: o,
      className: f(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        e,
        Jt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
yn.displayName = nt.Item.displayName;
const Qt = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => {
  const s = Ot();
  return /* @__PURE__ */ d(
    nt.CheckboxItem,
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Jt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(Dt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
Qt.displayName = nt.CheckboxItem.displayName;
const Va = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = Ot();
  return /* @__PURE__ */ d(
    nt.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Jt({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(nt.ItemIndicator, { children: /* @__PURE__ */ r(_n, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
Va.displayName = nt.RadioItem.displayName;
const ln = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  nt.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
ln.displayName = nt.Label.displayName;
const Be = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  nt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Be.displayName = nt.Separator.displayName;
function Ww({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
Ww.displayName = "DropdownMenuShortcut";
function hn(e, t) {
  return e === "" ? t["%comment_assign_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%comment_assign_team%"] ?? "Team" : e;
}
function co({
  comment: e,
  isReply: t = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  threadStatus: a = "Unspecified",
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  onEditingChange: c,
  canEditOrDelete: w = !1,
  canUserResolveThread: p = !1
}) {
  const [h, m] = D(!1), [u, g] = D(), N = Z(null);
  U(() => {
    if (!h) return;
    let C = !0;
    const M = N.current;
    if (!M) return;
    const k = setTimeout(() => {
      C && Ta(M);
    }, 300);
    return () => {
      C = !1, clearTimeout(k);
    };
  }, [h]);
  const v = z(() => {
    m(!1), g(void 0), c == null || c(!1);
  }, [c]), x = z(async () => {
    if (!u || !i) return;
    await i(
      e.id,
      xn(u)
    ) && (m(!1), g(void 0), c == null || c(!1));
  }, [u, i, e.id, c]), _ = L(() => {
    const C = new Date(e.date), M = Qs(
      C,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), k = C.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return pe(n["%comment_dateAtTime%"], {
      date: M,
      time: k
    });
  }, [e.date, n]), y = L(() => e.user, [e.user]), S = L(
    () => e.user.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2),
    [e.user]
  ), P = L(
    () => ti(Kr(e.contents)),
    [e.contents]
  ), V = L(() => {
    if (o && w)
      return /* @__PURE__ */ d(lt, { children: [
        !ei(e.contents) && /* @__PURE__ */ d(
          yn,
          {
            onClick: () => {
              m(!0), g($w(Kr(e.contents))), c == null || c(!0);
            },
            children: [
              /* @__PURE__ */ r(ks, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ d(
          yn,
          {
            onClick: async () => {
              l && await l(e.id);
            },
            children: [
              /* @__PURE__ */ r(_s, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    w,
    o,
    n,
    e.contents,
    e.id,
    l,
    c
  ]);
  return /* @__PURE__ */ d(
    "div",
    {
      className: f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": t
      }),
      children: [
        /* @__PURE__ */ r(Ma, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Oa, { className: "tw-text-xs tw-font-medium", children: S }) }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: y }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: _ }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            t && e.assignedUser !== void 0 && /* @__PURE__ */ d(Re, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              hn(e.assignedUser, n)
            ] })
          ] }),
          h && /* @__PURE__ */ d(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: N,
              onKeyDownCapture: (C) => {
                C.key === "Escape" ? (C.preventDefault(), C.stopPropagation(), v()) : C.key === "Enter" && C.shiftKey && (C.preventDefault(), C.stopPropagation(), Et(u) && x());
              },
              onKeyDown: (C) => {
                Ir(C), (C.key === "Enter" || C.key === " ") && C.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  vn,
                  {
                    editorSerializedState: u,
                    onSerializedChange: (C) => g(C)
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    $,
                    {
                      size: "icon",
                      onClick: v,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Ie, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    $,
                    {
                      size: "icon",
                      onClick: x,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !Et(u),
                      children: /* @__PURE__ */ r(xo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !h && /* @__PURE__ */ d(lt, { children: [
            e.status === "Resolved" && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_resolved%"] }),
            e.status === "Todo" && t && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_todo%"] }),
            /* @__PURE__ */ r(
              "div",
              {
                className: f(
                  "tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",
                  // tw-prose has a max width defined on it, that we choose to override
                  "tw-max-w-none",
                  {
                    "tw-line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: P }
              }
            )
          ] })
        ] }),
        o && p && !t && a !== "Resolved" && s && /* @__PURE__ */ r(
          $,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-shrink-0",
            onClick: (C) => {
              C.stopPropagation(), s({ threadId: e.thread, status: "Resolved" });
            },
            children: /* @__PURE__ */ r(Dt, {})
          }
        ),
        V && /* @__PURE__ */ d(xe, { children: [
          /* @__PURE__ */ r(Le, { asChild: !0, children: /* @__PURE__ */ r($, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(yo, {}) }) }),
          /* @__PURE__ */ r(se, { align: "end", children: V })
        ] })
      ]
    }
  );
}
const po = {
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
function Zw({
  comments: e,
  localizedStrings: t,
  isSelected: n = !1,
  verseRef: o,
  assignedUser: a,
  currentUser: s,
  handleSelectThread: i,
  threadId: l,
  threadStatus: c,
  handleAddCommentToThread: w,
  handleUpdateComment: p,
  handleDeleteComment: h,
  assignableUsers: m,
  canUserAddCommentToThread: u,
  canUserAssignThreadCallback: g,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: v
}) {
  const [x, _] = D(po), [y, S] = D(!1), [P, V] = D(!1), [C, M] = D(!1), [k, T] = D(!1), [j, B] = D(!1), [F, A] = D(void 0), [tt, O] = D(!1), [st, xt] = D(!1), [Bt, _t] = D(/* @__PURE__ */ new Map());
  U(() => {
    let E = !0;
    if (!n) {
      O(!1), xt(!1), _t(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const at = g ? await g(l) : !1;
      if (!E) return;
      const Nt = N ? await N(l) : !1;
      E && (O(at), xt(Nt));
    })(), () => {
      E = !1;
    };
  }, [n, l, g, N]);
  const I = L(() => e.filter((E) => !E.deleted), [e]);
  U(() => {
    let E = !0;
    if (!n || !v) {
      _t(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const at = /* @__PURE__ */ new Map();
      await Promise.all(
        I.map(async (Nt) => {
          const Ct = await v(Nt.id);
          E && at.set(Nt.id, Ct);
        })
      ), E && _t(at);
    })(), () => {
      E = !1;
    };
  }, [n, I, v]);
  const q = L(() => I[0], [I]), bt = Z(null), dt = Z(void 0), pt = z(() => {
    var E;
    (E = dt.current) == null || E.call(dt), _(po);
  }, []);
  U(() => {
    const E = bt.current;
    if (!E) return;
    const et = () => {
      V(E.scrollWidth > E.clientWidth);
    };
    return et(), window.addEventListener("resize", et), () => window.removeEventListener("resize", et);
  }, [q == null ? void 0 : q.verse]), U(() => {
    M(!1);
  }, [n]);
  const jt = L(
    () => ({
      singleReply: t["%comment_thread_single_reply%"],
      multipleReplies: t["%comment_thread_multiple_replies%"]
    }),
    [t]
  ), ze = L(() => {
    if (a === void 0)
      return;
    if (a === "")
      return t["%comment_assign_unassigned%"] ?? "Unassigned";
    const E = hn(a, t);
    return pe(t["%comment_assigned_to%"], {
      assignedUser: E
    });
  }, [a, t]), ie = L(() => I.slice(1), [I]), yt = L(() => ie.length ?? 0, [ie.length]), An = L(() => yt > 0, [yt]), wn = L(() => C || yt <= 2 ? ie : ie.slice(-2), [ie, yt, C]), ye = L(() => C || yt <= 2 ? 0 : yt - 2, [yt, C]), Pn = L(
    () => yt === 1 ? jt.singleReply : pe(jt.multipleReplies, { count: yt }),
    [yt, jt]
  ), Vn = L(
    () => ye === 1 ? jt.singleReply : pe(jt.multipleReplies, { count: ye }),
    [ye, jt]
  ), R = z(async () => {
    const E = Et(x) ? xn(x) : void 0;
    if (F !== void 0) {
      await w({
        threadId: l,
        contents: E,
        assignedUser: F
      }) && (A(void 0), E && pt());
      return;
    }
    E && await w({ threadId: l, contents: E }) && pt();
  }, [pt, x, w, F, l]), X = z(
    async (E) => {
      const et = Et(x) ? xn(x) : void 0, at = await w({
        ...E,
        contents: et,
        assignedUser: F ?? E.assignedUser
      });
      return at && et && pt(), at && F !== void 0 && A(void 0), at;
    },
    [pt, x, w, F]
  );
  return /* @__PURE__ */ r(
    Ra,
    {
      role: "option",
      "aria-selected": n,
      id: l,
      className: f(
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
      children: /* @__PURE__ */ d(Da, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          ze && /* @__PURE__ */ r(Re, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: ze }),
          /* @__PURE__ */ d("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: [
            /* @__PURE__ */ d(
              "p",
              {
                ref: bt,
                className: f(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": y
                  },
                  { "tw-whitespace-nowrap": !y }
                ),
                children: [
                  o,
                  " ",
                  q.contextBefore,
                  /* @__PURE__ */ r("span", { className: "tw-font-bold", children: q.selectedText }),
                  q.contextAfter
                ]
              }
            ),
            P && /* @__PURE__ */ r(
              $,
              {
                variant: "ghost",
                size: "icon",
                onClick: (E) => {
                  E.stopPropagation(), S(!y);
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": y ? "Collapse text" : "Expand text",
                children: y ? /* @__PURE__ */ r(Qn, {}) : /* @__PURE__ */ r(fe, {})
              }
            )
          ] }),
          /* @__PURE__ */ r(
            co,
            {
              comment: q,
              localizedStrings: t,
              isThreadExpanded: n,
              threadStatus: c,
              handleAddCommentToThread: X,
              handleUpdateComment: p,
              handleDeleteComment: h,
              onEditingChange: T,
              canEditOrDelete: Bt.get(q.id) ?? !1,
              canUserResolveThread: st
            }
          )
        ] }),
        /* @__PURE__ */ d(lt, { children: [
          An && !n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(De, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Pn })
          ] }),
          !n && Et(x) && /* @__PURE__ */ r(
            vn,
            {
              editorSerializedState: x,
              onSerializedChange: (E) => _(E),
              placeholder: t["%comment_replyOrAssign%"]
            }
          ),
          n && /* @__PURE__ */ d(lt, { children: [
            ye > 0 && /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (E) => {
                  E.stopPropagation(), M(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (E) => {
                  (E.key === "Enter" || E.key === " ") && (E.preventDefault(), E.stopPropagation(), M(!0));
                },
                children: [
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(De, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Vn }),
                    C ? /* @__PURE__ */ r(Qn, {}) : /* @__PURE__ */ r(fe, {})
                  ] })
                ]
              }
            ),
            wn.map((E) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              co,
              {
                comment: E,
                localizedStrings: t,
                isReply: !0,
                isThreadExpanded: n,
                handleUpdateComment: p,
                handleDeleteComment: h,
                onEditingChange: T,
                canEditOrDelete: Bt.get(E.id) ?? !1
              }
            ) }, E.id)),
            u !== !1 && (!k || Et(x)) && /* @__PURE__ */ d(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (E) => E.stopPropagation(),
                onKeyDownCapture: (E) => {
                  E.key === "Enter" && E.shiftKey && (E.preventDefault(), E.stopPropagation(), (Et(x) || F !== void 0) && R());
                },
                onKeyDown: (E) => {
                  Ir(E), (E.key === "Enter" || E.key === " ") && E.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    vn,
                    {
                      editorSerializedState: x,
                      onSerializedChange: (E) => _(E),
                      placeholder: c === "Resolved" ? t["%comment_reopenResolved%"] : t["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (E) => {
                        dt.current = E;
                      }
                    }
                  ),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    F !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: pe(
                      t["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: hn(
                          F,
                          t
                        )
                      }
                    ) }),
                    /* @__PURE__ */ d(oe, { open: j, onOpenChange: B, children: [
                      /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ r(
                        $,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !tt || !m || m.length === 0 || !m.includes(s),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(vo, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        qt,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (E) => {
                            E.key === "Escape" && (E.stopPropagation(), B(!1));
                          },
                          children: /* @__PURE__ */ r(Ut, { children: /* @__PURE__ */ r(Yt, { children: m == null ? void 0 : m.map((E) => /* @__PURE__ */ r(
                            $t,
                            {
                              onSelect: () => {
                                A(E !== a ? E : void 0), B(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: hn(E, t) })
                            },
                            E || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      $,
                      {
                        size: "icon",
                        onClick: R,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !Et(x) && F === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(xo, {})
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
function kp({
  className: e = "",
  threads: t,
  currentUser: n,
  localizedStrings: o,
  handleAddCommentToThread: a,
  handleUpdateComment: s,
  handleDeleteComment: i,
  assignableUsers: l,
  canUserAddCommentToThread: c,
  canUserAssignThreadCallback: w,
  canUserResolveThreadCallback: p,
  canUserEditOrDeleteCommentCallback: h,
  selectedThreadId: m,
  onSelectedThreadChange: u
}) {
  const [g, N] = D(
    void 0
  ), v = m ?? g;
  U(() => {
    m !== void 0 && N(m);
  }, [m]);
  const x = t.filter(
    (k) => k.comments.some((T) => !T.deleted)
  ), _ = x.map((k) => ({
    id: k.id
  })), y = z(
    (k) => {
      N(k.id), u == null || u(k.id);
    },
    [u]
  ), S = z(
    (k) => {
      N(k), u == null || u(k);
    },
    [u]
  ), { listboxRef: P, activeId: V, handleKeyDown: C } = zw({
    options: _,
    onOptionSelect: y
  }), M = z(
    (k) => {
      k.key === "Escape" ? (N(void 0), u == null || u(void 0), k.preventDefault(), k.stopPropagation()) : C(k);
    },
    [C, u]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: P,
      "aria-activedescendant": V ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        e
      ),
      onKeyDown: M,
      children: x.map((k) => /* @__PURE__ */ r(
        "div",
        {
          id: k.id,
          className: f({
            "tw-opacity-60": k.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Zw,
            {
              comments: k.comments,
              localizedStrings: o,
              verseRef: k.verseRef,
              handleSelectThread: S,
              threadId: k.id,
              isSelected: v === k.id,
              currentUser: n,
              assignedUser: k.assignedUser,
              threadStatus: k.status,
              handleAddCommentToThread: a,
              handleUpdateComment: s,
              handleDeleteComment: i,
              assignableUsers: l,
              canUserAddCommentToThread: c,
              canUserAssignThreadCallback: w,
              canUserResolveThreadCallback: p,
              canUserEditOrDeleteCommentCallback: h
            }
          )
        },
        k.id
      ))
    }
  );
}
function Qw({ table: e }) {
  return /* @__PURE__ */ d(xe, { children: [
    /* @__PURE__ */ r(Xi, { asChild: !0, children: /* @__PURE__ */ d($, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Cs, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(se, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(ln, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Be, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ r(
        Qt,
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
const Me = it.Root, tc = it.Group, Oe = it.Value, ec = re(
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
), be = b.forwardRef(({ className: e, children: t, size: n, ...o }, a) => {
  const s = ct();
  return /* @__PURE__ */ d(
    it.Trigger,
    {
      className: f(ec({ size: n, className: e })),
      ref: a,
      ...o,
      dir: s,
      children: [
        t,
        /* @__PURE__ */ r(it.Icon, { asChild: !0, children: /* @__PURE__ */ r(fe, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
be.displayName = it.Trigger.displayName;
const $a = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  it.ScrollUpButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ r(Qn, { className: "tw-h-4 tw-w-4" })
  }
));
$a.displayName = it.ScrollUpButton.displayName;
const La = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  it.ScrollDownButton,
  {
    ref: n,
    className: f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ r(fe, { className: "tw-h-4 tw-w-4" })
  }
));
La.displayName = it.ScrollDownButton.displayName;
const ve = b.forwardRef(({ className: e, children: t, position: n = "popper", ...o }, a) => {
  const s = ct();
  return /* @__PURE__ */ r(it.Portal, { children: /* @__PURE__ */ d(
    it.Content,
    {
      ref: a,
      className: f(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        e
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r($a, {}),
        /* @__PURE__ */ r(
          it.Viewport,
          {
            className: f(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: t })
          }
        ),
        /* @__PURE__ */ r(La, {})
      ]
    }
  ) });
});
ve.displayName = it.Content.displayName;
const nc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  it.Label,
  {
    ref: n,
    className: f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
nc.displayName = it.Label.displayName;
const kt = b.forwardRef(({ className: e, children: t, ...n }, o) => /* @__PURE__ */ d(
  it.Item,
  {
    ref: o,
    className: f(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(it.ItemIndicator, { children: /* @__PURE__ */ r(Dt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(it.ItemText, { children: t })
    ]
  }
));
kt.displayName = it.Item.displayName;
const rc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  it.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
rc.displayName = it.Separator.displayName;
function oc({ table: e }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ d(
        Me,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ r(be, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Oe, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(ve, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ r(kt, { value: `${t}`, children: t }, t)) })
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
        $,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Es, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        $,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Ss, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        $,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Ts, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        $,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Rs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const uo = `
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
function ac(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function en(e, t) {
  const n = t ? `${uo}, ${t}` : uo;
  return Array.from(e.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && ac(o)
  );
}
const Rn = b.forwardRef(({ className: e, stickyHeader: t, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        en(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
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
        i.preventDefault(), en(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: f("pr-twp tw-relative tw-w-full", { "tw-p-1": t }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
      ref: a,
      className: f(
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
Rn.displayName = "Table";
const Dn = b.forwardRef(({ className: e, stickyHeader: t, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: f(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": t
      },
      "[&_tr]:tw-border-b",
      e
    ),
    ...n
  }
));
Dn.displayName = "TableHeader";
const Mn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: f("[&_tr:last-child]:tw-border-0", e), ...t }));
Mn.displayName = "TableBody";
const sc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
sc.displayName = "TableFooter";
function ic(e) {
  b.useEffect(() => {
    const t = e.current;
    if (!t) return;
    const n = (o) => {
      if (t.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = e.current ? en(e.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), t.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return t.addEventListener("keydown", n), () => {
      t.removeEventListener("keydown", n);
    };
  }, [e]);
}
function lc(e, t, n) {
  let o;
  return n === "ArrowLeft" && t > 0 ? o = e[t - 1] : n === "ArrowRight" && t < e.length - 1 && (o = e[t + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function wc(e, t, n) {
  let o;
  return n === "ArrowDown" && t < e.length - 1 ? o = e[t + 1] : n === "ArrowUp" && t > 0 && (o = e[t - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const zt = b.forwardRef(({ className: e, onKeyDown: t, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), ic(i);
  const l = b.useMemo(
    () => i.current ? en(i.current) : [],
    [i]
  ), c = b.useCallback(
    (p) => {
      const { current: h } = i;
      if (!h || !h.parentElement) return;
      const m = h.closest("table"), u = m ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        en(m).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = u.indexOf(h), N = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), wc(u, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), lc(l, N, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = h.closest("table");
        v && v.focus();
      }
      t == null || t(p);
    },
    [i, l, t]
  ), w = b.useCallback(
    (p) => {
      o && (n == null || n(p));
    },
    [o, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: i,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: w,
      className: f(
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
zt.displayName = "TableRow";
const nn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: f(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...t
  }
));
nn.displayName = "TableHead";
const he = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
he.displayName = "TableCell";
const cc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: f("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
cc.displayName = "TableCaption";
function pr({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", e),
      ...t
    }
  );
}
function dc({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: w
}) {
  var V;
  const [p, h] = D([]), [m, u] = D([]), [g, N] = D({}), [v, x] = D({}), _ = L(() => t ?? [], [t]), y = Bo({
    data: _,
    columns: e,
    getCoreRowModel: zo(),
    ...n && { getPaginationRowModel: Yi() },
    onSortingChange: h,
    getSortedRowModel: jo(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Ui(),
    onColumnVisibilityChange: N,
    onRowSelectionChange: x,
    state: {
      sorting: p,
      columnFilters: m,
      columnVisibility: g,
      rowSelection: v
    }
  }), S = y.getVisibleFlatColumns();
  let P;
  return c ? P = Array.from({ length: 10 }).map((k, T) => `skeleton-row-${T}`).map((k) => /* @__PURE__ */ r(zt, { children: /* @__PURE__ */ r(he, { colSpan: S.length ?? e.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(pr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, k)) : ((V = y.getRowModel().rows) == null ? void 0 : V.length) > 0 ? P = y.getRowModel().rows.map((C) => /* @__PURE__ */ r(
    zt,
    {
      onClick: () => i(C, y),
      "data-state": C.getIsSelected() && "selected",
      children: C.getVisibleCells().map((M) => /* @__PURE__ */ r(he, { children: Ye(M.column.columnDef.cell, M.getContext()) }, M.id))
    },
    C.id
  )) : P = /* @__PURE__ */ r(zt, { children: /* @__PURE__ */ r(he, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Qw, { table: y }),
    /* @__PURE__ */ d(Rn, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Dn, { stickyHeader: s, children: y.getHeaderGroups().map((C) => /* @__PURE__ */ r(zt, { children: C.headers.map((M) => /* @__PURE__ */ r(nn, { children: M.isPlaceholder ? void 0 : Ye(M.column.columnDef.header, M.getContext()) }, M.id)) }, C.id)) }),
      /* @__PURE__ */ r(Mn, { children: P })
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        $,
        {
          variant: "outline",
          size: "sm",
          onClick: () => y.previousPage(),
          disabled: !y.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        $,
        {
          variant: "outline",
          size: "sm",
          onClick: () => y.nextPage(),
          disabled: !y.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(oc, { table: y })
  ] });
}
function _p({
  id: e,
  markdown: t,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const s = L(
    () => ({
      overrides: {
        a: {
          props: {
            target: o
          }
        }
      }
    }),
    [o]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: e,
      className: f(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ r(Wi, { options: s, children: t })
    }
  );
}
const pc = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), mo = (e, t) => e[t] ?? t;
function uc({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  id: o
}) {
  const a = mo(n, "%webView_error_dump_header%"), s = mo(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(e), t && t();
  }
  return /* @__PURE__ */ d(
    "div",
    {
      id: o,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ r($, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(No, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: e }) })
      ]
    }
  );
}
const Cp = Object.freeze([
  ...pc,
  "%webView_error_dump_copied_message%"
]);
function Ep({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, l] = D(!1), c = () => {
    l(!0), t && t();
  };
  return /* @__PURE__ */ d(oe, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: o }),
    /* @__PURE__ */ d(qt, { id: s, className: f("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(wt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        uc,
        {
          errorDetails: e,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var mc = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(mc || {});
function Sp({ id: e, label: t, groups: n }) {
  const [o, a] = D(
    Object.fromEntries(
      n.map(
        (w, p) => w.itemType === 0 ? [p, []] : void 0
      ).filter((w) => !!w)
    )
  ), [s, i] = D({}), l = (w, p) => {
    const h = !o[w][p];
    a((u) => (u[w][p] = h, { ...u }));
    const m = n[w].items[p];
    m.onUpdate(m.id, h);
  }, c = (w, p) => {
    i((m) => (m[w] = p, { ...m }));
    const h = n[w].items.find((m) => m.id === p);
    h ? h.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: e, children: /* @__PURE__ */ d(xe, { children: [
    /* @__PURE__ */ r(Le, { asChild: !0, children: /* @__PURE__ */ d($, { variant: "default", children: [
      /* @__PURE__ */ r(Ds, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      t,
      /* @__PURE__ */ r(fe, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(se, { children: n.map((w, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(ln, { children: w.label }),
      /* @__PURE__ */ r(Ia, { children: w.itemType === 0 ? /* @__PURE__ */ r(lt, { children: w.items.map((h, m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Qt,
        {
          checked: o[p][m],
          onCheckedChange: () => l(p, m),
          children: h.label
        }
      ) }, h.id)) }) : /* @__PURE__ */ r(
        Jw,
        {
          value: s[p],
          onValueChange: (h) => c(p, h),
          children: w.items.map((h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Va, { value: h.id, children: h.label }) }, h.id))
        }
      ) }),
      /* @__PURE__ */ r(Be, {})
    ] }, w.label)) })
  ] }) });
}
function Tp({
  id: e,
  category: t,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const c = new ni("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, h) => p + h, 0)), w = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      id: e,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        t && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: t }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(Ms, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((p) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          o.length > 3 && /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => w(),
              className: "tw-text-xs tw-text-foreground tw-underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (a || i) && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            $,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Os, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            $,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Is, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function hc({ id: e, versionHistory: t }) {
  const [n, o] = D(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), p = w.getUTCFullYear() - 1970, h = w.getUTCMonth(), m = w.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : h > 0 ? u = `${h.toString()} month${h === 1 ? "" : "s"} ago` : m === 0 ? u = "today" : u = `${m.toString()} day${m === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ d("div", { className: "pr-twp", id: e, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ d("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ d("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ d("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ r("div", { children: s(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => o(!n),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Rp({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = L(() => ri(n), [n]), c = ((w) => {
    const p = new Intl.DisplayNames(oi(), { type: "language" });
    return w.map((h) => p.of(h));
  })(o);
  return /* @__PURE__ */ r("div", { id: e, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(hc, { versionHistory: a }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function fc({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: w = void 0,
  onOpenChange: p = void 0,
  isDisabled: h = !1,
  sortSelected: m = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: N = "ghost",
  id: v
}) {
  const [x, _] = D(!1), y = z(
    (T) => {
      var B;
      const j = (B = e.find((F) => F.label === T)) == null ? void 0 : B.value;
      j && n(
        t.includes(j) ? t.filter((F) => F !== j) : [...t, j]
      );
    },
    [e, t, n]
  ), S = () => c || o, P = L(() => {
    if (!m) return e;
    const T = e.filter((B) => B.starred).sort((B, F) => B.label.localeCompare(F.label)), j = e.filter((B) => !B.starred).sort((B, F) => {
      const A = t.includes(B.value), tt = t.includes(F.value);
      return A && !tt ? -1 : !A && tt ? 1 : B.label.localeCompare(F.label);
    });
    return [...T, ...j];
  }, [e, t, m]), V = () => {
    n(e.map((T) => T.value));
  }, C = () => {
    n([]);
  }, M = w ?? x;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ d(oe, { open: M, onOpenChange: p ?? _, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ d(
      $,
      {
        variant: N,
        role: "combobox",
        "aria-expanded": M,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: h,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: S()
              }
            )
          ] }),
          /* @__PURE__ */ r(ko, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(qt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(Ut, { children: [
      /* @__PURE__ */ r(Ve, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r($, { variant: "ghost", size: "sm", onClick: V, children: s }),
        /* @__PURE__ */ r($, { variant: "ghost", size: "sm", onClick: C, children: i })
      ] }),
      /* @__PURE__ */ d(Yt, { children: [
        /* @__PURE__ */ r(sn, { children: l }),
        /* @__PURE__ */ r(Ht, { children: P.map((T) => /* @__PURE__ */ d(
          $t,
          {
            value: T.label,
            onSelect: y,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Dt,
                {
                  className: f(
                    "tw-h-4 tw-w-4",
                    t.includes(T.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ r(As, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: T.label }),
              T.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: T.secondaryLabel })
            ]
          },
          T.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Dp({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: c,
  className: w,
  badgesPlaceholder: p,
  id: h
}) {
  return /* @__PURE__ */ d("div", { id: h, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      fc,
      {
        entries: e,
        selected: t,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: c,
        className: w
      }
    ),
    t.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: t.map((m) => {
      var u;
      return /* @__PURE__ */ d(Re, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          $,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(t.filter((g) => g !== m)),
            children: /* @__PURE__ */ r(Ie, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = e.find((g) => g.value === m)) == null ? void 0 : u.label
      ] }, m);
    }) }) : /* @__PURE__ */ r(wt, { children: p })
  ] });
}
const je = b.forwardRef(
  ({ className: e, type: t, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: t,
      className: f(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: o,
      ...n
    }
  )
);
je.displayName = "Input";
const gc = (e, t, n) => e === "generated" ? /* @__PURE__ */ d(lt, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_generated%"]
] }) : e === "hidden" ? /* @__PURE__ */ d(lt, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ d(lt, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  t["%footnoteEditor_callerDropdown_item_custom%"]
] });
function bc({
  callerType: e,
  updateCallerType: t,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = Z(null), i = Z(null), l = Z(!1), [c, w] = D(e), [p, h] = D(n), [m, u] = D(!1);
  U(() => {
    w(e);
  }, [e]), U(() => {
    p !== n && h(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, u(v), v || (c !== "custom" || p ? (t(c), o(p)) : (w(e), h(n)));
  }, N = (v) => {
    var x, _, y, S;
    v.stopPropagation(), document.activeElement === i.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((x = s.current) == null || x.focus(), l.current = !0) : document.activeElement === s.current && v.key === "ArrowUp" ? ((_ = i.current) == null || _.focus(), l.current = !1) : document.activeElement === s.current && v.key === "ArrowLeft" && ((y = s.current) == null ? void 0 : y.selectionStart) === 0 && ((S = i.current) == null || S.focus(), l.current = !1), c === "custom" && v.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ d(xe, { open: m, onOpenChange: g, children: [
    /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Vt, { children: [
      /* @__PURE__ */ r(Ft, { asChild: !0, children: /* @__PURE__ */ r(Le, { asChild: !0, children: /* @__PURE__ */ r($, { variant: "outline", className: "tw-h-6", children: gc(e, a, n) }) }) }),
      /* @__PURE__ */ r(Tt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      se,
      {
        className: "tw-z-[300]",
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: N,
        onMouseMove: () => {
          var v;
          l.current && ((v = s.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ r(ln, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Be, {}),
          /* @__PURE__ */ r(
            Qt,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: nr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Qt,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: rr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Qt,
            {
              ref: i,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (v) => {
                var x;
                v.stopPropagation(), l.current = !0, (x = s.current) == null || x.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  je,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), w("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: p,
                    onKeyDown: (v) => {
                      v.key === "Enter" || v.key === "ArrowUp" || v.key === "ArrowDown" || v.key === "ArrowLeft" || v.key === "ArrowRight" || v.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (v) => h(v.target.value)
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
const vc = (e, t) => e === "f" ? /* @__PURE__ */ d(lt, { children: [
  /* @__PURE__ */ r(_o, {}),
  " ",
  t["%footnoteEditor_noteType_footnote_label%"]
] }) : e === "fe" ? /* @__PURE__ */ d(lt, { children: [
  /* @__PURE__ */ r(Co, {}),
  " ",
  t["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ d(lt, { children: [
  /* @__PURE__ */ r(Ps, {}),
  " ",
  t["%footnoteEditor_noteType_crossReference_label%"]
] }), xc = (e, t) => {
  if (e === "x")
    return t["%footnoteEditor_noteType_crossReference_label%"];
  let n = t["%footnoteEditor_noteType_endNote_label%"];
  return e === "f" && (n = t["%footnoteEditor_noteType_footnote_label%"]), pe(t["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function yc({
  noteType: e,
  handleNoteTypeChange: t,
  localizedStrings: n
}) {
  return /* @__PURE__ */ d(xe, { children: [
    /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Vt, { children: [
      /* @__PURE__ */ r(Bi, { asChild: !0, children: /* @__PURE__ */ r(Le, { asChild: !0, children: /* @__PURE__ */ r(
        $,
        {
          variant: "outline",
          className: "tw-h-6 disabled:tw-pointer-events-auto",
          disabled: e === "x",
          children: vc(e, n)
        }
      ) }) }),
      /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: xc(e, n) }) })
    ] }) }),
    e !== "x" && /* @__PURE__ */ d(se, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ r(ln, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Be, {}),
      /* @__PURE__ */ d(
        Qt,
        {
          checked: e === "f",
          onCheckedChange: () => t("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(_o, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Qt,
        {
          checked: e === "fe",
          onCheckedChange: () => t("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Co, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
function Mp({
  noteOps: e,
  onSave: t,
  onClose: n,
  scrRef: o,
  noteKey: a,
  editorOptions: s,
  localizedStrings: i
}) {
  const l = Z(null), c = fs(), [w, p] = D("generated"), [h, m] = D("*"), [u, g] = D("f"), N = L(
    () => ({
      ...s,
      markerMenuTrigger: s.markerMenuTrigger ?? "\\",
      hasExternalUI: !0,
      view: { ...s.view ?? Zi(), noteMode: "expanded" }
    }),
    [s]
  );
  U(() => {
    var y;
    (y = l.current) == null || y.focus();
  }), U(() => {
    var P, V;
    let y;
    const S = e == null ? void 0 : e.at(0);
    if (S && Bn("note", S)) {
      const C = (P = S.insert.note) == null ? void 0 : P.caller;
      let M = "custom";
      C === nr ? M = "generated" : C === rr ? M = "hidden" : C && m(C), p(M), g(((V = S.insert.note) == null ? void 0 : V.style) ?? "f"), S.insert.note && (S.insert.note.caller = ""), y = setTimeout(() => {
        var k;
        (k = l.current) == null || k.applyUpdate([{ delete: 1 }, S]);
      }, 0);
    }
    return () => {
      y && clearTimeout(y);
    };
  }, [e, a]);
  const v = z(() => {
    var S, P;
    const y = (P = (S = l.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : P.at(0);
    y && Bn("note", y) && (y.insert.note && (w === "custom" ? y.insert.note.caller = h : y.insert.note.caller = w === "generated" ? nr : rr), t([y]));
  }, [w, h, t]), x = () => {
    var S;
    const y = (S = c.current) == null ? void 0 : S.getElementsByClassName("editor-input")[0];
    y != null && y.textContent && navigator.clipboard.writeText(y.textContent);
  };
  return /* @__PURE__ */ d("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex", children: [
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-4", children: [
        /* @__PURE__ */ r(
          yc,
          {
            noteType: u,
            handleNoteTypeChange: (y) => {
              var P, V, C;
              g(y);
              const S = (V = (P = l.current) == null ? void 0 : P.getNoteOps(0)) == null ? void 0 : V.at(0);
              S && Bn("note", S) && (S.insert.note && (S.insert.note.style = y), (C = l.current) == null || C.applyUpdate([{ delete: 1 }, S]));
            },
            localizedStrings: i
          }
        ),
        /* @__PURE__ */ r(
          bc,
          {
            callerType: w,
            updateCallerType: p,
            customCaller: h,
            updateCustomCaller: m,
            localizedStrings: i
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
        /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Vt, { children: [
          /* @__PURE__ */ r(Ft, { asChild: !0, children: /* @__PURE__ */ r($, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Ie, {}) }) }),
          /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: i["%footnoteEditor_cancelButton_tooltip%"] }) })
        ] }) }),
        /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Vt, { children: [
          /* @__PURE__ */ r(Ft, { asChild: !0, children: /* @__PURE__ */ r(
            $,
            {
              onClick: v,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              children: /* @__PURE__ */ r(Dt, {})
            }
          ) }),
          /* @__PURE__ */ r(Tt, { children: i["%footnoteEditor_saveButton_tooltip%"] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ d(
      "div",
      {
        ref: c,
        className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
        children: [
          /* @__PURE__ */ r(Qi, { options: N, onScrRefChange: () => {
          }, scrRef: o, ref: l }),
          /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(St, { children: /* @__PURE__ */ d(Vt, { children: [
            /* @__PURE__ */ r(Ft, { asChild: !0, children: /* @__PURE__ */ r($, { onClick: x, className: "tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(No, {}) }) }),
            /* @__PURE__ */ r(Tt, { children: /* @__PURE__ */ r("p", { children: i["%footnoteEditor_copyButton_tooltip%"] }) })
          ] }) }) })
        ]
      }
    )
  ] });
}
const Op = Object.freeze([
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
function Ba(e, t) {
  if (!t || t.length === 0) return e ?? "empty";
  const n = t.find((a) => typeof a == "string");
  if (n)
    return `key-${e ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof t[0] == "string" ? "impossible" : t[0].marker ?? "unknown";
  return `key-${e ?? "unknown"}-${o}`;
}
function Nc(e, t, n = !0, o = void 0) {
  if (!t || t.length === 0) return;
  const a = [], s = [];
  let i = [];
  return t.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, c) => {
    const w = c === s.length - 1;
    return /* @__PURE__ */ d("p", { children: [
      Pr(e, l, n, !0, a),
      w && o
    ] }, Ba(e, l));
  });
}
function Pr(e, t, n = !0, o = !0, a = []) {
  if (!(!t || t.length === 0))
    return t.map((s) => {
      if (typeof s == "string") {
        const i = `${e}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = f(`usfm_${e}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ d(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(tr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(tr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return kc(
        s,
        Ba(`${e}\\${s.marker}`, [s]),
        n,
        [...a, e ?? "unknown"]
      );
    });
}
function kc(e, t, n, o = []) {
  const { marker: a } = e;
  return /* @__PURE__ */ d("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      tr,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Pr(a, e.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, t);
}
function _c({
  footnote: e,
  layout: t = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(e.caller) : e.caller, s = a !== e.caller;
  let i, l = e.content;
  Array.isArray(e.content) && e.content.length > 0 && typeof e.content[0] != "string" && (e.content[0].marker === "fr" || e.content[0].marker === "xo") && ([i, ...l] = e.content);
  const c = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${e.marker} ` }) : void 0, w = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${e.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ d("span", { className: f("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), h = i && /* @__PURE__ */ d(lt, { children: [
    Pr(e.marker, [i], o, !1),
    " "
  ] }), m = t === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = t === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", N = f(m, u);
  return /* @__PURE__ */ d(lt, { children: [
    /* @__PURE__ */ d("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", N), children: [
      c,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", N), children: h }),
    /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          N
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(lt, { children: Nc(e.marker, l, o, w) })
      }
    )
  ] });
}
function Ip({
  className: e,
  classNameForItems: t,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: c,
  onFootnoteSelected: w
}) {
  const p = c ?? ai(n, void 0), h = (_, y) => {
    w == null || w(_, y, a);
  }, m = s ? n.findIndex((_) => _ === s) : -1, [u, g] = D(m), N = (_, y, S) => {
    if (n.length)
      switch (_.key) {
        case "Enter":
        case " ":
          _.preventDefault(), w == null || w(y, S, a);
          break;
      }
  }, v = (_) => {
    if (n.length)
      switch (_.key) {
        case "ArrowDown":
          _.preventDefault(), g((y) => Math.min(y + 1, n.length - 1));
          break;
        case "ArrowUp":
          _.preventDefault(), g((y) => Math.max(y - 1, 0));
          break;
      }
  }, x = Z([]);
  return U(() => {
    var _;
    u >= 0 && u < x.current.length && ((_ = x.current[u]) == null || _.focus());
  }, [u]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: f("tw-h-full tw-overflow-y-auto", e),
      onKeyDown: v,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: f(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            o === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((_, y) => {
            const S = _ === s, P = `${a}-${y}`;
            return /* @__PURE__ */ d(lt, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (V) => {
                    x.current[y] = V;
                  },
                  role: "option",
                  "aria-selected": S,
                  "data-marker": _.marker,
                  "data-state": S ? "selected" : void 0,
                  tabIndex: y === u ? 0 : -1,
                  className: f(
                    "tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",
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
                    o === "horizontal" ? "tw-col-span-3" : "tw-col-span-2 tw-row-span-2",
                    t
                  ),
                  onClick: () => h(_, y),
                  onKeyDown: (V) => N(V, _, y),
                  children: /* @__PURE__ */ r(
                    _c,
                    {
                      footnote: _,
                      layout: o,
                      formatCaller: () => p(_.caller, y),
                      showMarkers: i
                    }
                  )
                },
                P
              ),
              y < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(De, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Cc(e) {
  const t = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(e)) !== null; )
    a.index > n && t.push(e.substring(n, a.index)), t.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < e.length && t.push(e.substring(n)), t.length > 0 ? t : [e];
}
function Ec({
  occurrenceData: e,
  setScriptureReference: t,
  localizedStrings: n
}) {
  const o = n["%webView_inventory_occurrences_table_header_reference%"], a = n["%webView_inventory_occurrences_table_header_occurrence%"], s = L(() => {
    const i = [], l = /* @__PURE__ */ new Set();
    return e.forEach((c) => {
      const w = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      l.has(w) || (l.add(w), i.push(c));
    }), i;
  }, [e]);
  return /* @__PURE__ */ d(Rn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Dn, { stickyHeader: !0, children: /* @__PURE__ */ d(zt, { children: [
      /* @__PURE__ */ r(nn, { children: o }),
      /* @__PURE__ */ r(nn, { children: a })
    ] }) }),
    /* @__PURE__ */ r(Mn, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ d(
      zt,
      {
        onClick: () => {
          t(i.reference);
        },
        children: [
          /* @__PURE__ */ r(he, { children: `${W.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ r(he, { children: Cc(i.text) })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const Vr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  or.Root,
  {
    ref: n,
    className: f(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(
      or.Indicator,
      {
        className: f("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Dt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Vr.displayName = or.Root.displayName;
const On = (e) => e === "asc" ? /* @__PURE__ */ r(Bs, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ r(js, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(zs, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Ap = (e) => ({
  accessorKey: "item",
  accessorFn: (t) => t.items[0],
  header: ({ column: t }) => /* @__PURE__ */ d($, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    On(t.getIsSorted())
  ] })
}), Sc = (e, t) => ({
  accessorKey: `item${t}`,
  accessorFn: (n) => n.items[t],
  header: ({ column: n }) => /* @__PURE__ */ d($, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    On(n.getIsSorted())
  ] })
}), Pp = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ d($, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    On(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), Yn = (e, t, n, o, a, s) => {
  let i = [...n];
  e.forEach((c) => {
    t === "approved" ? i.includes(c) || i.push(c) : i = i.filter((w) => w !== c);
  }), o(i);
  let l = [...a];
  e.forEach((c) => {
    t === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), s(l);
}, Vp = (e, t, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ d($, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    e,
    On(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ d(Or, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        We,
        {
          onClick: (c) => {
            c.stopPropagation(), Yn(
              [l],
              "approved",
              t,
              n,
              o,
              a
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(Vs, {})
        }
      ),
      /* @__PURE__ */ r(
        We,
        {
          onClick: (c) => {
            c.stopPropagation(), Yn(
              [l],
              "unapproved",
              t,
              n,
              o,
              a
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r($s, {})
        }
      ),
      /* @__PURE__ */ r(
        We,
        {
          onClick: (c) => {
            c.stopPropagation(), Yn(
              [l],
              "unknown",
              t,
              n,
              o,
              a
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(Ls, {})
        }
      )
    ] });
  }
}), $p = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Lp = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, Bp = (e) => {
  const t = e.match(/^\\id\s+([A-Za-z]+)/);
  return t ? t[1] : "";
}, Tc = (e, t, n) => n.includes(e) ? "unapproved" : t.includes(e) ? "approved" : "unknown", jp = Object.freeze([
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
]), Rc = (e, t, n) => {
  let o = e;
  return t !== "all" && (o = o.filter(
    (a) => t === "approved" && a.status === "approved" || t === "unapproved" && a.status === "unapproved" || t === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, Dc = (e, t, n) => {
  const o = [];
  return e.forEach((a) => {
    const s = o.find(
      (i) => Eo(
        i.items,
        $n(a.inventoryText) ? [a.inventoryText] : a.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: a.verseRef,
        text: a.verse
      });
    else {
      const i = {
        items: $n(a.inventoryText) ? [a.inventoryText] : a.inventoryText,
        count: 1,
        status: Tc(
          $n(a.inventoryText) ? a.inventoryText : a.inventoryText[0],
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
      o.push(i);
    }
  }), o;
}, It = (e, t) => e[t] ?? t;
function zp({
  inventoryItems: e,
  setVerseRef: t,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: c,
  id: w,
  areInventoryItemsLoading: p = !1
}) {
  const h = It(n, "%webView_inventory_all%"), m = It(n, "%webView_inventory_approved%"), u = It(n, "%webView_inventory_unapproved%"), g = It(n, "%webView_inventory_unknown%"), N = It(n, "%webView_inventory_scope_currentBook%"), v = It(n, "%webView_inventory_scope_chapter%"), x = It(n, "%webView_inventory_scope_verse%"), _ = It(n, "%webView_inventory_filter_text%"), y = It(
    n,
    "%webView_inventory_show_additional_items%"
  ), S = It(n, "%webView_inventory_no_results%"), [P, V] = D(!1), [C, M] = D("all"), [k, T] = D(""), [j, B] = D([]), F = L(() => {
    const I = e ?? [];
    return I.length === 0 ? [] : Dc(I, a, s);
  }, [e, a, s]), A = L(() => {
    if (P) return F;
    const I = [];
    return F.forEach((q) => {
      const bt = q.items[0], dt = I.find(
        (pt) => pt.items[0] === bt
      );
      dt ? (dt.count += q.count, dt.occurrences = dt.occurrences.concat(q.occurrences)) : I.push({
        items: [bt],
        count: q.count,
        occurrences: q.occurrences,
        status: q.status
      });
    }), I;
  }, [P, F]), tt = L(() => A.length === 0 ? [] : Rc(A, C, k), [A, C, k]), O = L(() => {
    var bt, dt;
    if (!P) return c;
    const I = (bt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : bt.length;
    if (!I) return c;
    const q = [];
    for (let pt = 0; pt < I; pt++)
      q.push(
        Sc(
          ((dt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : dt[pt]) || "Additional Item",
          pt + 1
        )
      );
    return [...q, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, P]);
  U(() => {
    tt.length === 0 ? B([]) : tt.length === 1 && B(tt[0].items);
  }, [tt]);
  const st = (I, q) => {
    q.setRowSelection(() => {
      const bt = {};
      return bt[I.index] = !0, bt;
    }), B(I.original.items);
  }, xt = (I) => {
    if (I === "book" || I === "chapter" || I === "verse")
      l(I);
    else
      throw new Error(`Invalid scope value: ${I}`);
  }, Bt = (I) => {
    if (I === "all" || I === "approved" || I === "unapproved" || I === "unknown")
      M(I);
    else
      throw new Error(`Invalid status filter value: ${I}`);
  }, _t = L(() => {
    if (A.length === 0 || j.length === 0) return [];
    const I = A.filter((q) => Eo(
      P ? q.items : [q.items[0]],
      j
    ));
    if (I.length > 1) throw new Error("Selected item is not unique");
    return I.length === 0 ? [] : I[0].occurrences;
  }, [j, P, A]);
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        Me,
        {
          onValueChange: (I) => Bt(I),
          defaultValue: C,
          children: [
            /* @__PURE__ */ r(be, { className: "tw-m-1", children: /* @__PURE__ */ r(Oe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(ve, { children: [
              /* @__PURE__ */ r(kt, { value: "all", children: h }),
              /* @__PURE__ */ r(kt, { value: "approved", children: m }),
              /* @__PURE__ */ r(kt, { value: "unapproved", children: u }),
              /* @__PURE__ */ r(kt, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(Me, { onValueChange: (I) => xt(I), defaultValue: i, children: [
        /* @__PURE__ */ r(be, { className: "tw-m-1", children: /* @__PURE__ */ r(Oe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(ve, { children: [
          /* @__PURE__ */ r(kt, { value: "book", children: N }),
          /* @__PURE__ */ r(kt, { value: "chapter", children: v }),
          /* @__PURE__ */ r(kt, { value: "verse", children: x })
        ] })
      ] }),
      /* @__PURE__ */ r(
        je,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: _,
          value: k,
          onChange: (I) => {
            T(I.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Vr,
          {
            className: "tw-m-1",
            checked: P,
            onCheckedChange: (I) => {
              V(I);
            }
          }
        ),
        /* @__PURE__ */ r(wt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? y })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      dc,
      {
        columns: O,
        data: tt,
        onRowClickHandler: st,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: S
      }
    ) }),
    _t.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Ec,
      {
        occurrenceData: _t,
        setScriptureReference: t,
        localizedStrings: n
      }
    ) })
  ] });
}
const Fp = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function Gp({ localizedStrings: e, markerMenuItems: t }) {
  const [n, o] = D(""), a = L(() => {
    const s = n.trim().toLowerCase();
    return s ? t.filter(
      (i) => {
        var l;
        return ((l = i.marker) == null ? void 0 : l.toLowerCase().includes(s)) || i.title.toLowerCase().includes(s);
      }
    ) : t;
  }, [n, t]);
  return /* @__PURE__ */ d(Ut, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Ve,
      {
        value: n,
        onValueChange: (s) => o(s),
        placeholder: e["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ d(Yt, { children: [
      /* @__PURE__ */ r(sn, { children: e["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Ht, { children: a.map((s) => /* @__PURE__ */ d(
        $t,
        {
          className: "tw-flex tw-gap-2 hover:tw-bg-accent",
          disabled: s.isDisallowed || s.isDeprecated,
          onSelect: s.action,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-w-6", children: s.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: s.marker }) : /* @__PURE__ */ r("div", { children: s.icon }) }),
            /* @__PURE__ */ d("div", { children: [
              /* @__PURE__ */ r("p", { className: "tw-text-sm", children: s.title }),
              s.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: s.subtitle })
            ] }),
            (s.isDisallowed || s.isDeprecated) && /* @__PURE__ */ r(Uo, { className: "tw-font-sans", children: s.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
          ]
        },
        `item-${s.title}`
      )) })
    ] })
  ] });
}
const Mc = "16rem", Oc = "3rem", ja = b.createContext(void 0);
function In() {
  const e = b.useContext(ja);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return e;
}
const za = b.forwardRef(
  ({
    defaultOpen: e = !0,
    open: t,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    ...l
  }, c) => {
    const [w, p] = b.useState(e), h = t ?? w, m = b.useCallback(
      (y) => {
        const S = typeof y == "function" ? y(h) : y;
        n ? n(S) : p(S);
      },
      [n, h]
    ), u = b.useCallback(() => m((y) => !y), [m]), g = h ? "expanded" : "collapsed", x = ct() === "ltr" ? i : i === "primary" ? "secondary" : "primary", _ = b.useMemo(
      () => ({
        state: g,
        open: h,
        setOpen: m,
        toggleSidebar: u,
        side: x
      }),
      [g, h, m, u, x]
    );
    return /* @__PURE__ */ r(ja.Provider, { value: _, children: /* @__PURE__ */ r(St, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Mc,
            "--sidebar-width-icon": Oc,
            ...a
          }
        ),
        className: f(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: c,
        ...l,
        children: s
      }
    ) }) });
  }
);
za.displayName = "SidebarProvider";
const Fa = b.forwardRef(({ variant: e = "sidebar", collapsible: t = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = In();
  return t === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: f(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...a,
      children: o
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
        /* @__PURE__ */ r(
          "div",
          {
            className: f(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: f(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              e === "floating" || e === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              n
            ),
            ...a,
            children: /* @__PURE__ */ r(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                children: o
              }
            )
          }
        )
      ]
    }
  );
});
Fa.displayName = "Sidebar";
const Ic = b.forwardRef(({ className: e, onClick: t, ...n }, o) => {
  const a = In();
  return /* @__PURE__ */ d(
    $,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: f("tw-h-7 tw-w-7", e),
      onClick: (s) => {
        t == null || t(s), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(Fs, {}) : /* @__PURE__ */ r(Gs, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Ic.displayName = "SidebarTrigger";
const Ac = b.forwardRef(
  ({ className: e, ...t }, n) => {
    const { toggleSidebar: o } = In();
    return /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: o,
        title: "Toggle Sidebar",
        className: f(
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
Ac.displayName = "SidebarRail";
const Ga = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: f(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        e
      ),
      ...t
    }
  )
);
Ga.displayName = "SidebarInset";
const Pc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  je,
  {
    ref: n,
    "data-sidebar": "input",
    className: f(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      e
    ),
    ...t
  }
));
Pc.displayName = "SidebarInput";
const Vc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: f("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
Vc.displayName = "SidebarHeader";
const $c = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: f("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
$c.displayName = "SidebarFooter";
const Lc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  De,
  {
    ref: n,
    "data-sidebar": "separator",
    className: f("tw-mx-2 tw-w-auto tw-bg-sidebar-border", e),
    ...t
  }
));
Lc.displayName = "SidebarSeparator";
const Ka = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: f(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        e
      ),
      ...t
    }
  )
);
Ka.displayName = "SidebarContent";
const ur = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", e),
      ...t
    }
  )
);
ur.displayName = "SidebarGroup";
const mr = b.forwardRef(({ className: e, asChild: t = !1, ...n }, o) => /* @__PURE__ */ r(
  t ? Ae : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: f(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      e
    ),
    ...n
  }
));
mr.displayName = "SidebarGroupLabel";
const Bc = b.forwardRef(({ className: e, asChild: t = !1, ...n }, o) => /* @__PURE__ */ r(
  t ? Ae : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: f(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      e
    ),
    ...n
  }
));
Bc.displayName = "SidebarGroupAction";
const hr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: f("tw-w-full tw-text-sm", e),
      ...t
    }
  )
);
hr.displayName = "SidebarGroupContent";
const Ha = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", e),
      ...t
    }
  )
);
Ha.displayName = "SidebarMenu";
const Xa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: f("tw-group/menu-item tw-relative", e),
      ...t
    }
  )
);
Xa.displayName = "SidebarMenuItem";
const jc = re(
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
), Ua = b.forwardRef(
  ({
    asChild: e = !1,
    isActive: t = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const c = e ? Ae : "button", { state: w } = In(), p = /* @__PURE__ */ r(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": t,
        className: f(jc({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ d(Vt, { children: [
      /* @__PURE__ */ r(Ft, { asChild: !0, children: p }),
      /* @__PURE__ */ r(Tt, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : p;
  }
);
Ua.displayName = "SidebarMenuButton";
const zc = b.forwardRef(({ className: e, asChild: t = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  t ? Ae : "button",
  {
    ref: a,
    "data-sidebar": "menu-action",
    className: f(
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
    ...o
  }
));
zc.displayName = "SidebarMenuAction";
const Fc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: f(
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
Fc.displayName = "SidebarMenuBadge";
const Gc = b.forwardRef(({ className: e, showIcon: t = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", e),
      ...n,
      children: [
        t && /* @__PURE__ */ r(pr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          pr,
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
Gc.displayName = "SidebarMenuSkeleton";
const Kc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: f(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...t
    }
  )
);
Kc.displayName = "SidebarMenuSub";
const Hc = b.forwardRef(
  ({ ...e }, t) => /* @__PURE__ */ r("li", { ref: t, ...e })
);
Hc.displayName = "SidebarMenuSubItem";
const Xc = b.forwardRef(({ asChild: e = !1, size: t = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  e ? Ae : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": t,
    "data-active": n,
    className: f(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      t === "sm" && "tw-text-xs",
      t === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      o
    ),
    ...a
  }
));
Xc.displayName = "SidebarMenuSubButton";
function Uc({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: c
}) {
  const w = z(
    (m, u) => {
      o(m, u);
    },
    [o]
  ), p = z(
    (m) => {
      const u = n.find((g) => g.projectId === m);
      return u ? u.projectName : m;
    },
    [n]
  ), h = z(
    (m) => !a.projectId && m === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Fa,
    {
      id: e,
      collapsible: "none",
      variant: "inset",
      className: f("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ d(Ka, { children: [
        /* @__PURE__ */ d(ur, { children: [
          /* @__PURE__ */ r(mr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(hr, { children: /* @__PURE__ */ r(Ha, { children: Object.entries(t).map(([m, u]) => /* @__PURE__ */ r(Xa, { children: /* @__PURE__ */ r(
            Ua,
            {
              onClick: () => w(m),
              isActive: h(m),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, m)) }) })
        ] }),
        /* @__PURE__ */ d(ur, { children: [
          /* @__PURE__ */ r(mr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(hr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            lr,
            {
              buttonVariant: "ghost",
              buttonClassName: f("tw-w-full", {
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
              icon: /* @__PURE__ */ r(Ks, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const $r = rn(
  ({ value: e, onSearch: t, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const c = ct();
    return /* @__PURE__ */ d("div", { id: i, className: f("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        bo,
        {
          className: f(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        je,
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
        $,
        {
          variant: "ghost",
          size: "icon",
          className: f(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": c === "rtl" },
            { "tw-right-0": c === "ltr" }
          ),
          onClick: () => {
            t("");
          },
          children: [
            /* @__PURE__ */ r(Ie, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
$r.displayName = "SearchBar";
function Kp({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: w,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      $r,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      za,
      {
        id: e,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Uc,
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
          /* @__PURE__ */ r(Ga, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Wt = "scrBook", Yc = "scrRef", de = "source", qc = "details", Jc = "Scripture Reference", Wc = "Scripture Book", Ya = "Type", Zc = "Details";
function Qc(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Wt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Jc,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? W.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === Wt ? _e(a.start) : void 0;
      },
      getGroupingValue: (o) => W.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => er(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => _e(o.start),
      id: Yc,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : _e(a.start);
      },
      sortingFn: (o, a) => er(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: de,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Ya : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: qc,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Zc,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const td = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || er(e.start, e.end) === 0 ? `${Ln(e.start)}+${t}` : `${Ln(e.start)}+${t}-${Ln(e.end)}+${n}`;
}, ho = (e) => `${td({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function Hp({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: c
}) {
  const [w, p] = D([]), [h, m] = D([{ id: Wt, desc: !1 }]), [u, g] = D({}), N = L(
    () => e.flatMap((k) => k.data.map((T) => ({
      ...T,
      source: k.source
    }))),
    [e]
  ), v = L(
    () => Qc(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
  U(() => {
    w.includes(de) ? m([
      { id: de, desc: !1 },
      { id: Wt, desc: !1 }
    ]) : m([{ id: Wt, desc: !1 }]);
  }, [w]);
  const x = Bo({
    data: N,
    columns: v,
    state: {
      grouping: w,
      sorting: h,
      rowSelection: u
    },
    onGroupingChange: p,
    onSortingChange: m,
    onRowSelectionChange: g,
    getExpandedRowModel: Ji(),
    getGroupedRowModel: qi(),
    getCoreRowModel: zo(),
    getSortedRowModel: jo(),
    getRowId: ho,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  U(() => {
    if (l) {
      const k = x.getSelectedRowModel().rowsById, T = Object.keys(k);
      if (T.length === 1) {
        const j = N.find((B) => ho(B) === T[0]) || void 0;
        j && l(j);
      }
    }
  }, [u, N, l, x]);
  const _ = a ?? Wc, y = s ?? Ya, S = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${_}`, value: [Wt] },
    { label: `Group by ${y}`, value: [de] },
    {
      label: `Group by ${_} and ${y}`,
      value: [Wt, de]
    },
    {
      label: `Group by ${y} and ${_}`,
      value: [de, Wt]
    }
  ], P = (k) => {
    p(JSON.parse(k));
  }, V = (k, T) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(T);
  }, C = (k, T) => k.getIsGrouped() ? "" : f("banded-row", T % 2 === 0 ? "even" : "odd"), M = (k, T, j) => {
    if (!((k == null ? void 0 : k.length) === 0 || T.depth < j.column.getGroupedIndex())) {
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
      Me,
      {
        value: JSON.stringify(w),
        onValueChange: (k) => {
          P(k);
        },
        children: [
          /* @__PURE__ */ r(be, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Oe, {}) }),
          /* @__PURE__ */ r(ve, { position: "item-aligned", children: /* @__PURE__ */ r(tc, { children: S.map((k) => /* @__PURE__ */ r(kt, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(Rn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ r(Dn, { children: x.getHeaderGroups().map((k) => /* @__PURE__ */ r(zt, { children: k.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(nn, { colSpan: T.colSpan, className: "top-0 tw-sticky", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ r(
            $,
            {
              variant: "ghost",
              title: `Toggle grouping by ${T.column.columnDef.header}`,
              onClick: T.column.getToggleGroupingHandler(),
              type: "button",
              children: T.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Ye(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, k.id)) }),
      /* @__PURE__ */ r(Mn, { children: x.getRowModel().rows.map((k, T) => {
        const j = ct();
        return /* @__PURE__ */ r(
          zt,
          {
            "data-state": k.getIsSelected() ? "selected" : "",
            className: f(C(k, T)),
            onClick: (B) => V(k, B),
            children: k.getVisibleCells().map((B) => {
              if (!(B.getIsPlaceholder() || B.column.columnDef.enableGrouping && !B.getIsGrouped() && (B.column.columnDef.id !== de || !n)))
                return /* @__PURE__ */ r(
                  he,
                  {
                    className: f(
                      B.column.columnDef.id,
                      "tw-p-[1px]",
                      M(w, k, B)
                    ),
                    children: B.getIsGrouped() ? /* @__PURE__ */ d(
                      $,
                      {
                        variant: "link",
                        onClick: k.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          k.getIsExpanded() && /* @__PURE__ */ r(fe, {}),
                          !k.getIsExpanded() && (j === "ltr" ? /* @__PURE__ */ r(Ee, {}) : /* @__PURE__ */ r(Zn, {})),
                          " ",
                          Ye(B.column.columnDef.cell, B.getContext()),
                          " (",
                          k.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ye(B.column.columnDef.cell, B.getContext())
                  },
                  B.id
                );
            })
          },
          k.id
        );
      }) })
    ] })
  ] });
}
const Lr = (e, t) => e.filter((n) => {
  try {
    return Ue(n) === t;
  } catch {
    return !1;
  }
}), qa = (e, t, n) => Lr(e, t).every((o) => n.includes(o));
function ed({
  section: e,
  availableBookIds: t,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Lr(t, e).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    $,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(e),
      className: f(
        qa(t, e, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: vl(
        e,
        i,
        l,
        c,
        w
      )
    }
  );
}
const fo = 5, qn = 6;
function nd({
  availableBookInfo: e,
  selectedBookIds: t,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], h = o["%webView_book_selector_more%"], { otLong: m, ntLong: u, dcLong: g, extraLong: N } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, x] = D(!1), [_, y] = D(""), S = Z(void 0), P = Z(!1);
  if (e.length !== W.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const V = L(() => W.allBookIds.filter(
    (A, tt) => e[tt] === "1" && !W.isObsolete(W.bookIdToNumber(A))
  ), [e]), C = L(() => {
    if (!_.trim()) {
      const O = {
        [K.OT]: [],
        [K.NT]: [],
        [K.DC]: [],
        [K.Extra]: []
      };
      return V.forEach((st) => {
        const xt = Ue(st);
        O[xt].push(st);
      }), O;
    }
    const A = V.filter(
      (O) => Cr(O, _, a)
    ), tt = {
      [K.OT]: [],
      [K.NT]: [],
      [K.DC]: [],
      [K.Extra]: []
    };
    return A.forEach((O) => {
      const st = Ue(O);
      tt[st].push(O);
    }), tt;
  }, [V, _, a]), M = z(
    (A, tt = !1) => {
      if (!tt || !S.current) {
        n(
          t.includes(A) ? t.filter((I) => I !== A) : [...t, A]
        ), S.current = A;
        return;
      }
      const O = V.findIndex((I) => I === S.current), st = V.findIndex((I) => I === A);
      if (O === -1 || st === -1) return;
      const [xt, Bt] = [
        Math.min(O, st),
        Math.max(O, st)
      ], _t = V.slice(xt, Bt + 1).map((I) => I);
      n(
        t.includes(A) ? t.filter((I) => !_t.includes(I)) : [.../* @__PURE__ */ new Set([...t, ..._t])]
      );
    },
    [t, n, V]
  ), k = (A) => {
    M(A, P.current), P.current = !1;
  }, T = (A, tt) => {
    A.preventDefault(), M(tt, A.shiftKey);
  }, j = z(
    (A) => {
      const tt = Lr(V, A).map((O) => O);
      n(
        qa(V, A, t) ? t.filter((O) => !tt.includes(O)) : [.../* @__PURE__ */ new Set([...t, ...tt])]
      );
    },
    [t, n, V]
  ), B = () => {
    n(V.map((A) => A));
  }, F = () => {
    n([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(K).map((A) => /* @__PURE__ */ r(
      ed,
      {
        section: A,
        availableBookIds: V,
        selectedBookIds: t,
        onToggle: j,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ d(
      oe,
      {
        open: v,
        onOpenChange: (A) => {
          x(A), A || y("");
        },
        children: [
          /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ d(
            $,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                t.length > 0 ? `${s}: ${t.length}` : i,
                /* @__PURE__ */ r(ko, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(qt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
            Ut,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (P.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Ve,
                  {
                    placeholder: l,
                    value: _,
                    onValueChange: y
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r($, { variant: "ghost", size: "sm", onClick: B, children: c }),
                  /* @__PURE__ */ r($, { variant: "ghost", size: "sm", onClick: F, children: w })
                ] }),
                /* @__PURE__ */ d(Yt, { children: [
                  /* @__PURE__ */ r(sn, { children: p }),
                  Object.values(K).map((A, tt) => {
                    const O = C[A];
                    if (O.length !== 0)
                      return /* @__PURE__ */ d(go, { children: [
                        /* @__PURE__ */ r(
                          Ht,
                          {
                            heading: ta(A, m, u, g, N),
                            children: O.map((st) => /* @__PURE__ */ r(
                              na,
                              {
                                bookId: st,
                                isSelected: t.includes(st),
                                onSelect: () => k(st),
                                onMouseDown: (xt) => T(xt, st),
                                section: Ue(st),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: ir(st, a),
                                className: "tw-flex tw-items-center"
                              },
                              st
                            ))
                          }
                        ),
                        tt < Object.values(K).length - 1 && /* @__PURE__ */ r(Xo, {})
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
        t.length === qn ? qn : fo
      ).map((A) => /* @__PURE__ */ r(Re, { className: "hover:tw-bg-secondary", variant: "secondary", children: Ce(A, a) }, A)),
      t.length > qn && /* @__PURE__ */ r(
        Re,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${t.length - fo} ${h}`
        }
      )
    ] })
  ] });
}
const Xp = Object.freeze([
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
]), le = (e, t) => e[t] ?? t;
function Up({
  scope: e,
  availableScopes: t,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: c
}) {
  const w = le(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = le(
    i,
    "%webView_scope_selector_current_verse%"
  ), h = le(
    i,
    "%webView_scope_selector_current_chapter%"
  ), m = le(i, "%webView_scope_selector_current_book%"), u = le(i, "%webView_scope_selector_choose_books%"), g = le(i, "%webView_scope_selector_scope%"), N = le(i, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: h, id: "scope-chapter" },
    { value: "book", label: m, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], x = t ? v.filter((_) => t.includes(_.value)) : v;
  return /* @__PURE__ */ d("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(wt, { children: g }),
      /* @__PURE__ */ r(
        Er,
        {
          value: e,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: x.map(({ value: _, label: y, id: S }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(bn, { className: "tw-me-2", value: _, id: S }),
            /* @__PURE__ */ r(wt, { htmlFor: S, children: y })
          ] }, S))
        }
      )
    ] }),
    e === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(wt, { children: N }),
      /* @__PURE__ */ r(
        nd,
        {
          availableBookInfo: o,
          selectedBookIds: a,
          onChangeSelectedBookIds: s,
          localizedStrings: i,
          localizedBookNames: l
        }
      )
    ] })
  ] });
}
const Jn = {
  [J("undefined")]: "Ø",
  [J(0)]: "A",
  [J(1)]: "B",
  [J(2)]: "C",
  [J(3)]: "D",
  [J(4)]: "E",
  [J(5)]: "F",
  [J(6)]: "G",
  [J(7)]: "H",
  [J(8)]: "I",
  [J(9)]: "J",
  [J(10)]: "K",
  [J(11)]: "L",
  [J(12)]: "M",
  [J(13)]: "N",
  [J(14)]: "O",
  [J(15)]: "P",
  [J(16)]: "Q",
  [J(17)]: "R",
  [J(18)]: "S",
  [J(19)]: "T",
  [J(20)]: "U",
  [J(21)]: "V",
  [J(22)]: "W",
  [J(23)]: "X",
  [J(24)]: "Y",
  [J(25)]: "Z"
};
function Yp({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Jn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in Jn ? Jn[w] : p
        ]
      )
    )
  }, c = ct();
  return /* @__PURE__ */ d(
    Me,
    {
      value: `${t}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ r(be, { size: a, className: f("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Oe,
          {
            placeholder: l[J(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ r(
          ve,
          {
            id: i,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: e.map((w) => /* @__PURE__ */ r(kt, { value: `${w}`, children: l[J(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function qp({ children: e }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: e });
}
function Jp({
  primary: e,
  secondary: t,
  children: n,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function Wp({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ r(De, {}) : ""
  ] });
}
function Ja(e, t) {
  var n;
  return (n = Object.entries(e).find(
    ([, o]) => "menuItem" in o && o.menuItem === t
  )) == null ? void 0 : n[0];
}
function Nn({ icon: e, menuLabel: t, leading: n }) {
  return e ? /* @__PURE__ */ r(
    "img",
    {
      className: f("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: e,
      alt: `${n ? "Leading" : "Trailing"} icon for ${t}`
    }
  ) : void 0;
}
const Wa = (e, t, n, o) => n ? Object.entries(e).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => t.filter((l) => l.group === s).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ d(Vt, { children: [
  /* @__PURE__ */ r(Ft, { asChild: !0, children: "command" in l ? /* @__PURE__ */ d(
    yn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(Nn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(Nn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ d(qw, { children: [
    /* @__PURE__ */ r(Aa, { children: l.label }),
    /* @__PURE__ */ r(Yw, { children: /* @__PURE__ */ r(Pa, { children: Wa(
      e,
      t,
      Ja(e, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(Tt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function fr({
  onSelectMenuItem: e,
  menuData: t,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ d(xe, { variant: s, children: [
    /* @__PURE__ */ r(Le, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r($, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(Hs, {}) }) }),
    /* @__PURE__ */ r(se, { align: "start", className: "tw-z-[250]", children: Object.entries(t.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, p) => /* @__PURE__ */ d(go, { children: [
      /* @__PURE__ */ r(Ia, { children: /* @__PURE__ */ r(St, { children: Wa(t.groups, t.items, c, e) }) }),
      w < p.length - 1 && /* @__PURE__ */ r(Be, {})
    ] }, c)) })
  ] });
}
const Za = b.forwardRef(
  ({ id: e, className: t, children: n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,
      id: e,
      children: n
    }
  )
);
function Zp({
  onSelectProjectMenuItem: e,
  onSelectViewInfoMenuItem: t,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: c,
  menuButtonIcon: w
}) {
  return /* @__PURE__ */ d(Za, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      fr,
      {
        onSelectMenuItem: e,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ r(Xs, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      o && /* @__PURE__ */ r(
        fr,
        {
          onSelectMenuItem: t,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(Us, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Qp({
  onSelectProjectMenuItem: e,
  projectMenuData: t,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(Za, { className: "tw-pointer-events-none", id: n, children: t && /* @__PURE__ */ r(
    fr,
    {
      onSelectMenuItem: e,
      menuData: t,
      tabLabel: "Project",
      icon: a,
      className: `tw-pointer-events-auto tw-shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const Qa = b.forwardRef(({ className: e, ...t }, n) => {
  const o = ct();
  return /* @__PURE__ */ r(
    gt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
      ...t,
      dir: o
    }
  );
});
Qa.displayName = gt.List.displayName;
const ts = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  gt.List,
  {
    ref: n,
    className: f(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
ts.displayName = gt.List.displayName;
const rd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  gt.Trigger,
  {
    ref: n,
    ...t,
    className: f(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), es = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  gt.Content,
  {
    ref: n,
    className: f(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
es.displayName = gt.Content.displayName;
function tu({
  tabList: e,
  searchValue: t,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ d("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ d("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        $r,
        {
          className: s,
          value: t,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ d(Qa, { children: [
      /* @__PURE__ */ r(ts, { children: e.map((l) => /* @__PURE__ */ r(rd, { value: l.value, children: l.value }, l.key)) }),
      e.map((l) => /* @__PURE__ */ r(es, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function od({ ...e }) {
  return /* @__PURE__ */ r(rt.Menu, { ...e });
}
function ad({ ...e }) {
  return /* @__PURE__ */ r(rt.Sub, { "data-slot": "menubar-sub", ...e });
}
const ns = b.forwardRef(({ className: e, variant: t = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Ar.Provider, { value: a, children: /* @__PURE__ */ r(
    rt.Root,
    {
      ref: o,
      className: f(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        e
      ),
      ...n
    }
  ) });
});
ns.displayName = rt.Root.displayName;
const rs = b.forwardRef(({ className: e, ...t }, n) => {
  const o = Ot();
  return /* @__PURE__ */ r(
    rt.Trigger,
    {
      ref: n,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Jt({ variant: o.variant, className: e })
        // CUSTOM use context to add variants
      ),
      ...t
    }
  );
});
rs.displayName = rt.Trigger.displayName;
const os = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => {
  const s = Ot();
  return /* @__PURE__ */ d(
    rt.SubTrigger,
    {
      ref: a,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        t && "tw-pl-8",
        Jt({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Ee, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
os.displayName = rt.SubTrigger.displayName;
const as = b.forwardRef(({ className: e, ...t }, n) => {
  const o = Ot();
  return /* @__PURE__ */ r(
    rt.SubContent,
    {
      ref: n,
      className: f(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": o.variant === "muted"
        },
        e
      ),
      ...t
    }
  );
});
as.displayName = rt.SubContent.displayName;
const ss = b.forwardRef(({ className: e, align: t = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = Ot();
  return /* @__PURE__ */ r(rt.Portal, { children: /* @__PURE__ */ r(
    rt.Content,
    {
      ref: s,
      align: t,
      alignOffset: n,
      sideOffset: o,
      className: f(
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
ss.displayName = rt.Content.displayName;
const is = b.forwardRef(({ className: e, inset: t, ...n }, o) => {
  const a = Ot();
  return /* @__PURE__ */ r(
    rt.Item,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        Jt({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n
    }
  );
});
is.displayName = rt.Item.displayName;
const sd = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => {
  const s = Ot();
  return /* @__PURE__ */ d(
    rt.CheckboxItem,
    {
      ref: a,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Jt({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Dt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
sd.displayName = rt.CheckboxItem.displayName;
const id = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = Ot();
  return /* @__PURE__ */ d(
    rt.RadioItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Jt({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(_n, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
id.displayName = rt.RadioItem.displayName;
const ld = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  rt.Label,
  {
    ref: o,
    className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
ld.displayName = rt.Label.displayName;
const ls = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  rt.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
ls.displayName = rt.Separator.displayName;
const He = (e, t) => {
  setTimeout(() => {
    t.forEach((n) => {
      var o;
      (o = e.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, ws = (e, t, n, o) => {
  if (!n) return;
  const a = Object.entries(e).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = t.filter((w) => w.group === s).sort((w, p) => w.order - p.order).map((w) => /* @__PURE__ */ d(Vt, { children: [
      /* @__PURE__ */ r(Ft, { asChild: !0, children: "command" in w ? /* @__PURE__ */ d(
        is,
        {
          onClick: () => {
            o(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ r(Nn, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ r(Nn, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ d(ad, { children: [
        /* @__PURE__ */ r(os, { children: w.label }),
        /* @__PURE__ */ r(as, { children: ws(
          e,
          t,
          Ja(e, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ r(Tt, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && i < a.length - 1 && c.push(/* @__PURE__ */ r(ls, {}, `separator-${s}`)), c;
  });
};
function wd({
  menuData: e,
  onSelectMenuItem: t,
  onOpenChange: n,
  variant: o
}) {
  const a = Z(void 0), s = Z(void 0), i = Z(void 0), l = Z(void 0), c = Z(void 0), w = (p) => {
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
  if (tl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, h) => {
    var g, N, v, x;
    p.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (h.hotkey) {
      case "alt":
        He(s, [m]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), He(s, [m, u]);
        break;
      case "alt+l":
        (N = i.current) == null || N.focus(), He(i, [m, u]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), He(l, [m, u]);
        break;
      case "alt+h":
        (x = c.current) == null || x.focus(), He(c, [m, u]);
        break;
    }
  }), U(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const N = g.target.getAttribute("data-state");
          n(N === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      p.observe(u, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!e)
    return /* @__PURE__ */ r(ns, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(e.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, h]) => typeof p == "boolean" || typeof h == "boolean" ? 0 : p.order - h.order).map(([p, h]) => /* @__PURE__ */ d(od, { children: [
      /* @__PURE__ */ r(rs, { ref: w(p), children: typeof h == "object" && "label" in h && h.label }),
      /* @__PURE__ */ r(
        ss,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(St, { children: ws(e.groups, e.items, p, t) })
        }
      )
    ] }, p)) });
}
function eu(e) {
  switch (e) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function nu({
  menuData: e,
  onOpenChange: t,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: w = "default"
}) {
  const p = Z(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("tw-border tw-px-4 tw-text-foreground", o),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  e && /* @__PURE__ */ r(
                    wd,
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
            /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
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
const cd = (e, t) => e[t] ?? t;
function ru({
  knownUiLanguages: e,
  primaryLanguage: t = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: c
}) {
  const w = cd(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, h] = D(!1), m = (g) => {
    a && a(g), o && o([g, ...n.filter((N) => N !== g)]), s && n.find((N) => N === g) && s([...n.filter((N) => N !== g)]), h(!1);
  }, u = (g, N) => {
    var x, _, y, S, P, V;
    const v = N !== g ? ((_ = (x = e[g]) == null ? void 0 : x.uiNames) == null ? void 0 : _[N]) ?? ((S = (y = e[g]) == null ? void 0 : y.uiNames) == null ? void 0 : S.en) : void 0;
    return v ? `${(P = e[g]) == null ? void 0 : P.autonym} (${v})` : (V = e[g]) == null ? void 0 : V.autonym;
  };
  return /* @__PURE__ */ d("div", { id: c, className: f("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ d(
      Me,
      {
        name: "uiLanguage",
        value: t,
        onValueChange: m,
        open: p,
        onOpenChange: (g) => h(g),
        children: [
          /* @__PURE__ */ r(be, { children: /* @__PURE__ */ r(Oe, {}) }),
          /* @__PURE__ */ r(
            ve,
            {
              className: "tw-z-[250]",
              children: Object.keys(e).map((g) => /* @__PURE__ */ r(kt, { value: g, children: u(g, t) }, g))
            }
          )
        ]
      }
    ),
    t !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(wt, { className: "tw-font-normal tw-text-muted-foreground", children: pe(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, t)).join(", ") : e.en.autonym
    }) }) })
  ] });
}
function dd({ item: e, createLabel: t, createComplexLabel: n }) {
  return t ? /* @__PURE__ */ r(wt, { children: t(e) }) : n ? /* @__PURE__ */ r(wt, { children: n(e) }) : /* @__PURE__ */ r(wt, { children: e });
}
function ou({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: e, className: t, children: n.map((l) => /* @__PURE__ */ d("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      Vr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      dd,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function au({
  cardKey: e,
  isSelected: t,
  onSelect: n,
  isDenied: o,
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
      onKeyDown: (h) => {
        (h.key === "Enter" || h.key === " ") && (h.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": t,
      className: f(
        "tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !t },
        { "tw-bg-accent": t },
        { "tw-bg-transparent": !t },
        s
      ),
      children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            t && l && /* @__PURE__ */ d(xe, { children: [
              /* @__PURE__ */ r(Le, { className: f(w && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r($, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(yo, {}) }) }),
              /* @__PURE__ */ r(se, { align: "end", children: l })
            ] })
          ] }),
          t && c && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: c })
        ] }),
        w && /* @__PURE__ */ r(
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
const pd = rn(({ className: e, ...t }, n) => /* @__PURE__ */ r(Ys, { size: 35, className: f("tw-animate-spin", e), ...t, ref: n }));
pd.displayName = "Spinner";
function su({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: w,
  value: p,
  onChange: h,
  onFocus: m,
  onBlur: u
}) {
  return /* @__PURE__ */ d("div", { className: f("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      wt,
      {
        htmlFor: e,
        className: f({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      je,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: f(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: p,
        onChange: h,
        onFocus: m,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: f({ "tw-hidden": !a }), children: a })
  ] });
}
const ud = re(
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
), md = b.forwardRef(({ className: e, variant: t, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: f(
      // CUSTOM
      "pr-twp",
      ud({ variant: t }),
      e
    ),
    ...n
  }
));
md.displayName = "Alert";
const hd = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d(
    "h5",
    {
      ref: n,
      className: f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
hd.displayName = "AlertTitle";
const fd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("div", { ref: n, className: f("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
fd.displayName = "AlertDescription";
const iu = ot.Root, lu = ot.Trigger, wu = ot.Group, cu = ot.Portal, du = ot.Sub, pu = ot.RadioGroup, gd = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => /* @__PURE__ */ d(
  ot.SubTrigger,
  {
    ref: a,
    className: f(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      t && "tw-pl-8",
      e
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(Ee, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
gd.displayName = ot.SubTrigger.displayName;
const bd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ot.SubContent,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
bd.displayName = ot.SubContent.displayName;
const vd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
  ot.Content,
  {
    ref: n,
    className: f(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
vd.displayName = ot.Content.displayName;
const xd = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  ot.Item,
  {
    ref: o,
    className: f(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
xd.displayName = ot.Item.displayName;
const yd = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => /* @__PURE__ */ d(
  ot.CheckboxItem,
  {
    ref: a,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Dt, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
yd.displayName = ot.CheckboxItem.displayName;
const Nd = b.forwardRef(({ className: e, children: t, ...n }, o) => /* @__PURE__ */ d(
  ot.RadioItem,
  {
    ref: o,
    className: f(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(_n, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
Nd.displayName = ot.RadioItem.displayName;
const kd = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  ot.Label,
  {
    ref: o,
    className: f(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
kd.displayName = ot.Label.displayName;
const _d = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
_d.displayName = ot.Separator.displayName;
function Cd({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
Cd.displayName = "ContextMenuShortcut";
const cs = b.createContext({
  direction: "bottom"
});
function Ed({
  shouldScaleBackground: e = !0,
  direction: t = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: t }), [t]);
  return /* @__PURE__ */ r(cs.Provider, { value: o, children: /* @__PURE__ */ r(
    Mt.Root,
    {
      shouldScaleBackground: e,
      direction: t,
      ...n
    }
  ) });
}
Ed.displayName = "Drawer";
const uu = Mt.Trigger, Sd = Mt.Portal, mu = Mt.Close, ds = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Mt.Overlay,
  {
    ref: n,
    className: f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", e),
    ...t
  }
));
ds.displayName = Mt.Overlay.displayName;
const Td = b.forwardRef(({ className: e, children: t, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(cs), i = {
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
  return /* @__PURE__ */ d(Sd, { children: [
    /* @__PURE__ */ r(ds, {}),
    /* @__PURE__ */ d(
      Mt.Content,
      {
        ref: a,
        className: f(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          i[s],
          e
        ),
        ...o,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: l[s] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: t }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: l[s] })
        ]
      }
    )
  ] });
});
Td.displayName = "DrawerContent";
function Rd({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", e),
      ...t
    }
  );
}
Rd.displayName = "DrawerHeader";
function Dd({ className: e, ...t }) {
  return /* @__PURE__ */ r("div", { className: f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", e), ...t });
}
Dd.displayName = "DrawerFooter";
const Md = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Mt.Title,
  {
    ref: n,
    className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Md.displayName = Mt.Title.displayName;
const Od = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Mt.Description,
  {
    ref: n,
    className: f("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Od.displayName = Mt.Description.displayName;
const Id = b.forwardRef(({ className: e, value: t, ...n }, o) => /* @__PURE__ */ r(
  ar.Root,
  {
    ref: o,
    className: f(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      e
    ),
    ...n,
    children: /* @__PURE__ */ r(
      ar.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (t || 0)}%)` }
      }
    )
  }
));
Id.displayName = ar.Root.displayName;
function hu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    xr.PanelGroup,
    {
      className: f(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        e
      ),
      ...t
    }
  );
}
const fu = xr.Panel;
function gu({
  withHandle: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ r(
    xr.PanelResizeHandle,
    {
      className: f(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        t
      ),
      ...n,
      children: e && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(qs, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function bu({ ...e }) {
  return /* @__PURE__ */ r(
    el,
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
const Ad = b.forwardRef(({ className: e, ...t }, n) => {
  const o = ct();
  return /* @__PURE__ */ d(
    Xe.Root,
    {
      ref: n,
      className: f(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        e
      ),
      ...t,
      dir: o,
      children: [
        /* @__PURE__ */ r(Xe.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Xe.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Xe.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Ad.displayName = Xe.Root.displayName;
const Pd = b.forwardRef(({ className: e, ...t }, n) => {
  const o = ct();
  return /* @__PURE__ */ r(
    sr.Root,
    {
      className: f(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        e
      ),
      ...t,
      ref: n,
      children: /* @__PURE__ */ r(
        sr.Thumb,
        {
          className: f(
            "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",
            {
              "data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0": o === "ltr"
            },
            {
              "data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0": o === "rtl"
            }
          )
        }
      )
    }
  );
});
Pd.displayName = sr.Root.displayName;
const vu = gt.Root, Vd = b.forwardRef(({ className: e, ...t }, n) => {
  const o = ct();
  return /* @__PURE__ */ r(
    gt.List,
    {
      ref: n,
      className: f(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        e
      ),
      ...t,
      dir: o
    }
  );
});
Vd.displayName = gt.List.displayName;
const $d = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  gt.Trigger,
  {
    ref: n,
    className: f(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
$d.displayName = gt.Trigger.displayName;
const Ld = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  gt.Content,
  {
    ref: n,
    className: f(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Ld.displayName = gt.Content.displayName;
const Bd = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: f(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        e
      ),
      ref: n,
      ...t
    }
  )
);
Bd.displayName = "Textarea";
const xu = (e, t) => {
  U(() => {
    if (!e) return () => {
    };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
};
function jd(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const zd = (e, t, n = {}) => {
  const o = Z(t);
  o.current = t;
  const a = Z(n);
  a.current = jd(a.current);
  const [s, i] = D(() => o.current), [l, c] = D(!0);
  return U(() => {
    let w = !0;
    return c(!!e), (async () => {
      if (e) {
        const p = await e();
        w && (i(() => p), c(!1));
      }
    })(), () => {
      w = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [e]), [s, l];
}, Wn = () => !1, yu = (e, t) => {
  const [n] = zd(
    z(async () => {
      if (!e) return Wn;
      const o = await Promise.resolve(e(t));
      return async () => o();
    }, [t, e]),
    Wn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  U(() => () => {
    n !== Wn && n();
  }, [n]);
};
function Fd(e, t = "top") {
  if (!e || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(e)), t === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Fd(`*, ::before, ::after {
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
.tw-gap-x-3 {
  column-gap: 0.75rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-gap-y-1 {
  row-gap: 0.25rem;
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
  md as Alert,
  fd as AlertDescription,
  hd as AlertTitle,
  Ma as Avatar,
  Oa as AvatarFallback,
  Uw as AvatarImage,
  gp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  bp as BOOK_SELECTOR_STRING_KEYS,
  Re as Badge,
  fp as BookChapterControl,
  Tl as BookSelectionMode,
  vp as BookSelector,
  $ as Button,
  yp as COMMENT_EDITOR_STRING_KEYS,
  Np as COMMENT_LIST_STRING_KEYS,
  Ra as Card,
  Da as CardContent,
  Hw as CardDescription,
  Xw as CardFooter,
  Gw as CardHeader,
  Kw as CardTitle,
  Sl as ChapterRangeSelector,
  Vr as Checkbox,
  ou as Checklist,
  lr as ComboBox,
  Ut as Command,
  sn as CommandEmpty,
  Ht as CommandGroup,
  Ve as CommandInput,
  $t as CommandItem,
  Yt as CommandList,
  xp as CommentEditor,
  kp as CommentList,
  iu as ContextMenu,
  yd as ContextMenuCheckboxItem,
  vd as ContextMenuContent,
  wu as ContextMenuGroup,
  xd as ContextMenuItem,
  kd as ContextMenuLabel,
  cu as ContextMenuPortal,
  pu as ContextMenuRadioGroup,
  Nd as ContextMenuRadioItem,
  _d as ContextMenuSeparator,
  Cd as ContextMenuShortcut,
  du as ContextMenuSub,
  bd as ContextMenuSubContent,
  gd as ContextMenuSubTrigger,
  lu as ContextMenuTrigger,
  dc as DataTable,
  Ed as Drawer,
  mu as DrawerClose,
  Td as DrawerContent,
  Od as DrawerDescription,
  Dd as DrawerFooter,
  Rd as DrawerHeader,
  ds as DrawerOverlay,
  Sd as DrawerPortal,
  Md as DrawerTitle,
  uu as DrawerTrigger,
  xe as DropdownMenu,
  Qt as DropdownMenuCheckboxItem,
  se as DropdownMenuContent,
  Ia as DropdownMenuGroup,
  yn as DropdownMenuItem,
  mc as DropdownMenuItemType,
  ln as DropdownMenuLabel,
  Yw as DropdownMenuPortal,
  Jw as DropdownMenuRadioGroup,
  Va as DropdownMenuRadioItem,
  Be as DropdownMenuSeparator,
  Ww as DropdownMenuShortcut,
  qw as DropdownMenuSub,
  Pa as DropdownMenuSubContent,
  Aa as DropdownMenuSubTrigger,
  Le as DropdownMenuTrigger,
  pc as ERROR_DUMP_STRING_KEYS,
  Cp as ERROR_POPOVER_STRING_KEYS,
  uc as ErrorDump,
  Ep as ErrorPopover,
  Op as FOOTNOTE_EDITOR_STRING_KEYS,
  Dp as Filter,
  Sp as FilterDropdown,
  Rp as Footer,
  Mp as FootnoteEditor,
  _c as FootnoteItem,
  Ip as FootnoteList,
  jp as INVENTORY_STRING_KEYS,
  je as Input,
  zp as Inventory,
  wt as Label,
  Fp as MARKER_MENU_STRING_KEYS,
  _p as MarkdownRenderer,
  Gp as MarkerMenu,
  Tp as MoreInfo,
  fc as MultiSelectComboBox,
  tu as NavigationContentSearch,
  oe as Popover,
  mp as PopoverAnchor,
  qt as PopoverContent,
  ae as PopoverTrigger,
  Id as Progress,
  Er as RadioGroup,
  bn as RadioGroupItem,
  yl as RecentSearches,
  gu as ResizableHandle,
  fu as ResizablePanel,
  hu as ResizablePanelGroup,
  au as ResultsCard,
  Xp as SCOPE_SELECTOR_STRING_KEYS,
  Up as ScopeSelector,
  Hp as ScriptureResultsViewer,
  Yp as ScrollGroupSelector,
  $r as SearchBar,
  Me as Select,
  ve as SelectContent,
  tc as SelectGroup,
  kt as SelectItem,
  nc as SelectLabel,
  La as SelectScrollDownButton,
  $a as SelectScrollUpButton,
  rc as SelectSeparator,
  be as SelectTrigger,
  Oe as SelectValue,
  De as Separator,
  qp as SettingsList,
  Wp as SettingsListHeader,
  Jp as SettingsListItem,
  Uc as SettingsSidebar,
  Kp as SettingsSidebarContentSearch,
  Fa as Sidebar,
  Ka as SidebarContent,
  $c as SidebarFooter,
  ur as SidebarGroup,
  Bc as SidebarGroupAction,
  hr as SidebarGroupContent,
  mr as SidebarGroupLabel,
  Vc as SidebarHeader,
  Pc as SidebarInput,
  Ga as SidebarInset,
  Ha as SidebarMenu,
  zc as SidebarMenuAction,
  Fc as SidebarMenuBadge,
  Ua as SidebarMenuButton,
  Xa as SidebarMenuItem,
  Gc as SidebarMenuSkeleton,
  Kc as SidebarMenuSub,
  Xc as SidebarMenuSubButton,
  Hc as SidebarMenuSubItem,
  za as SidebarProvider,
  Ac as SidebarRail,
  Lc as SidebarSeparator,
  Ic as SidebarTrigger,
  pr as Skeleton,
  Ad as Slider,
  bu as Sonner,
  pd as Spinner,
  Pd as Switch,
  fr as TabDropdownMenu,
  Qp as TabFloatingMenu,
  Zp as TabToolbar,
  Rn as Table,
  Mn as TableBody,
  cc as TableCaption,
  he as TableCell,
  sc as TableFooter,
  nn as TableHead,
  Dn as TableHeader,
  zt as TableRow,
  vu as Tabs,
  Ld as TabsContent,
  Vd as TabsList,
  $d as TabsTrigger,
  su as TextField,
  Bd as Textarea,
  Or as ToggleGroup,
  We as ToggleGroupItem,
  nu as Toolbar,
  Vt as Tooltip,
  Tt as TooltipContent,
  St as TooltipProvider,
  Ft as TooltipTrigger,
  ru as UiLanguageSelector,
  Qa as VerticalTabs,
  es as VerticalTabsContent,
  ts as VerticalTabsList,
  rd as VerticalTabsTrigger,
  Fw as badgeVariants,
  xl as buttonVariants,
  f as cn,
  Bp as getBookIdFromUSFM,
  $p as getLinesFromUSFM,
  Lp as getNumberFromUSFM,
  Tc as getStatusForItem,
  eu as getToolbarOSReservedSpaceClassName,
  Pp as inventoryCountColumn,
  Ap as inventoryItemColumn,
  Vp as inventoryStatusColumn,
  ec as selectTriggerVariants,
  _u as sonner,
  xu as useEvent,
  yu as useEventAsync,
  zw as useListbox,
  zd as usePromise,
  hp as useRecentSearches,
  In as useSidebar
};
//# sourceMappingURL=index.js.map
