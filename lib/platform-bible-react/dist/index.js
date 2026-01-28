var ys = Object.defineProperty;
var Ns = (e, t, n) => t in e ? ys(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var mt = (e, t, n) => Ns(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as o, jsxs as d, Fragment as wt } from "react/jsx-runtime";
import b, { forwardRef as wn, useRef as Z, useMemo as B, useState as M, useCallback as z, useLayoutEffect as Kt, createContext as On, useContext as Nr, useEffect as q, Component as ks, createElement as Hr, Suspense as _s, createRef as Cs, Fragment as No } from "react";
import { Command as vt } from "cmdk";
import { X as je, Search as ko, Check as Mt, Clock as Kr, ChevronsLeft as Xr, ChevronsRight as Yr, ChevronLeft as rr, ChevronRight as Ie, ArrowLeft as Es, ArrowRight as Ts, Circle as In, ChevronDown as _e, BoldIcon as Ss, ItalicIcon as Rs, UnderlineIcon as Ds, StrikethroughIcon as Ms, AtSign as _o, Pencil as Os, Trash2 as Is, ArrowUp as Co, MoreHorizontal as Eo, MailOpen as As, Mail as Ps, ChevronUp as or, FilterIcon as Vs, ArrowLeftIcon as $s, ChevronLeftIcon as Ls, ChevronRightIcon as Bs, ArrowRightIcon as js, Copy as To, Filter as zs, User as Fs, Link as Gs, CircleHelp as Us, ChevronsUpDown as So, Star as Hs, SquareX as Ro, FunctionSquare as Do, SquareSigma as Mo, AlertCircle as ar, CircleCheckIcon as Ks, CircleXIcon as Xs, CircleHelpIcon as Ys, ArrowUpIcon as qs, ArrowDownIcon as Js, ArrowUpDownIcon as Ws, PanelLeft as Zs, PanelRight as Qs, ScrollText as ti, MenuIcon as ei, Menu as ni, EllipsisVertical as ri, LoaderCircle as oi, GripVertical as ai } from "lucide-react";
import { clsx as si } from "clsx";
import { extendTailwindMerge as ii } from "tailwind-merge";
import * as Dt from "@radix-ui/react-dialog";
import { includes as bn, Section as X, getChaptersForBook as li, formatScrRef as xe, getSectionForBook as Qe, formatRelativeDate as ci, formatReplacementString as ve, sanitizeHtml as wi, parseParatextHtml as qr, hasCustomParatextTags as di, NumberFormat as pi, formatBytes as ui, getCurrentLocale as mi, getFormatCallerFunction as hi, deepEqual as Oo, isString as Gn, compareScrRefs as sr, scrRefToBBBCCCVVV as Un, getLocalizeKeyForScrollGroupId as W } from "platform-bible-utils";
import { Slot as ze } from "@radix-ui/react-slot";
import { cva as ie } from "class-variance-authority";
import * as Ae from "@radix-ui/react-popover";
import * as Io from "@radix-ui/react-label";
import * as on from "@radix-ui/react-radio-group";
import { createEditor as Ao, $getRoot as oe, $createParagraphNode as An, $getSelection as Xt, HISTORY_MERGE_TAG as kr, ParagraphNode as Po, TextNode as Vo, $isTokenOrSegmented as fi, $getCharacterOffsets as gi, $cloneWithPropertiesEphemeral as bi, $findMatchingParent as vi, $isElementNode as ye, CLEAR_EDITOR_COMMAND as $o, COMMAND_PRIORITY_EDITOR as Lo, $isRangeSelection as an, shallowMergeConfig as xi, defineExtension as qt, safeCast as dn, RootNode as yi, LineBreakNode as Ni, TabNode as ki, $isEditorState as _i, createCommand as Ci, CLICK_COMMAND as Ei, isDOMNode as Ti, $getNodeFromDOMNode as Si, $isNodeSelection as Ri, $createNodeSelection as Di, $setSelection as Mi, COMMAND_PRIORITY_LOW as Oi, DecoratorNode as Ii, $create as Ai, $getNodeByKey as Pi, INDENT_CONTENT_COMMAND as Jr, COMMAND_PRIORITY_CRITICAL as _r, KEY_TAB_COMMAND as Vi, $createRangeSelection as $i, $normalizeSelection__EXPERIMENTAL as Li, OUTDENT_CONTENT_COMMAND as Bi, INSERT_TAB_COMMAND as ji, $isBlockElementNode as Cn, $isDecoratorNode as zi, $isParagraphNode as Fi, $isTextNode as En, SELECTION_CHANGE_COMMAND as Bo, FORMAT_TEXT_COMMAND as Gi, getRegisteredNode as Ui, isHTMLElement as Hi, isDocumentFragment as Wr, isDOMDocumentNode as Ki, ArtificialNode__DO_NOT_USE as jo, $createLineBreakNode as zo, $isRootOrShadowRoot as Xi, isBlockDomNode as Zr, isInlineDomNode as Qr, $insertNodes as Yi } from "lexical";
import * as pn from "@radix-ui/react-tooltip";
import { TooltipTrigger as qi } from "@radix-ui/react-tooltip";
import { HeadingNode as Ji, QuoteNode as Wi, registerRichText as Zi } from "@lexical/rich-text";
import { flushSync as Qi, createPortal as tl } from "react-dom";
import { $isTableSelection as el } from "@lexical/table";
import * as Pn from "@radix-ui/react-toggle-group";
import * as Fo from "@radix-ui/react-toggle";
import { createHeadlessEditor as Go } from "@lexical/headless";
import * as Uo from "@radix-ui/react-separator";
import * as Fe from "@radix-ui/react-avatar";
import * as rt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as nl } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Ho, getFilteredRowModel as rl, getSortedRowModel as Ko, getPaginationRowModel as ol, getCoreRowModel as Xo, flexRender as tn, getGroupedRowModel as al, getExpandedRowModel as sl } from "@tanstack/react-table";
import * as it from "@radix-ui/react-select";
import il from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as ir, HIDDEN_NOTE_CALLER as lr, getDefaultViewOptions as ll, isInsertEmbedOpOfType as vn, Editorial as cl } from "@eten-tech-foundation/platform-editor";
import * as cr from "@radix-ui/react-checkbox";
import * as xt from "@radix-ui/react-tabs";
import * as ot from "@radix-ui/react-menubar";
import { useHotkeys as wl } from "react-hotkeys-hook";
import * as at from "@radix-ui/react-context-menu";
import { Drawer as Ot } from "vaul";
import * as wr from "@radix-ui/react-progress";
import * as Cr from "react-resizable-panels";
import { Toaster as dl } from "sonner";
import { toast as Lu } from "sonner";
import * as Ze from "@radix-ui/react-slider";
import * as dr from "@radix-ui/react-switch";
const pl = ii({ prefix: "tw-" });
function h(...e) {
  return pl(si(e));
}
const ul = "layoutDirection";
function pt() {
  const e = localStorage.getItem(ul);
  return e === "rtl" ? e : "ltr";
}
const ml = Dt.Root, hl = Dt.Portal, Yo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Dt.Overlay,
  {
    ref: n,
    className: h(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
Yo.displayName = Dt.Overlay.displayName;
const qo = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = pt();
  return /* @__PURE__ */ d(hl, { children: [
    /* @__PURE__ */ o(Yo, {}),
    /* @__PURE__ */ d(
      Dt.Content,
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
            Dt.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ o(je, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
qo.displayName = Dt.Content.displayName;
function Jo({ className: e, ...t }) {
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
Jo.displayName = "DialogHeader";
const Wo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Dt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Wo.displayName = Dt.Title.displayName;
const fl = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Dt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
fl.displayName = Dt.Description.displayName;
const Jt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  vt,
  {
    ref: n,
    className: h(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
Jt.displayName = vt.displayName;
const Ge = b.forwardRef(({ className: e, ...t }, n) => {
  const r = pt();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ o(ko, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ o(
      vt.Input,
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
Ge.displayName = vt.Input.displayName;
const Wt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  vt.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
Wt.displayName = vt.List.displayName;
const un = b.forwardRef((e, t) => /* @__PURE__ */ o(vt.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
un.displayName = vt.Empty.displayName;
const Yt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  vt.Group,
  {
    ref: n,
    className: h(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Yt.displayName = vt.Group.displayName;
const Zo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  vt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
Zo.displayName = vt.Separator.displayName;
const Bt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  vt.Item,
  {
    ref: n,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
Bt.displayName = vt.Item.displayName;
function Qo({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
Qo.displayName = "CommandShortcut";
var gl = Object.defineProperty, bl = (e, t, n) => t in e ? gl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, K = (e, t, n) => bl(e, typeof t != "symbol" ? t + "" : t, n);
const Ce = [
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
], Er = [
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
], ta = [
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
], to = Sl();
function Ue(e, t = !0) {
  return t && (e = e.toUpperCase()), e in to ? to[e] : 0;
}
function Tr(e) {
  return Ue(e) > 0;
}
function vl(e) {
  const t = typeof e == "string" ? Ue(e) : e;
  return t >= 40 && t <= 66;
}
function xl(e) {
  return (typeof e == "string" ? Ue(e) : e) <= 39;
}
function ea(e) {
  return e <= 66;
}
function yl(e) {
  const t = typeof e == "string" ? Ue(e) : e;
  return oa(t) && !ea(t);
}
function* Nl() {
  for (let e = 1; e <= Ce.length; e++) yield e;
}
const kl = 1, na = Ce.length;
function _l() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Sr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Ce.length ? t : Ce[n];
}
function ra(e) {
  return e <= 0 || e > na ? "******" : ta[e - 1];
}
function Cl(e) {
  return ra(Ue(e));
}
function oa(e) {
  const t = typeof e == "number" ? Sr(e) : e;
  return Tr(t) && !Er.includes(t);
}
function El(e) {
  const t = typeof e == "number" ? Sr(e) : e;
  return Tr(t) && Er.includes(t);
}
function Tl(e) {
  return ta[e - 1].includes("*obsolete*");
}
function Sl() {
  const e = {};
  for (let t = 0; t < Ce.length; t++)
    e[Ce[t]] = t + 1;
  return e;
}
const Q = {
  allBookIds: Ce,
  nonCanonicalIds: Er,
  bookIdToNumber: Ue,
  isBookIdValid: Tr,
  isBookNT: vl,
  isBookOT: xl,
  isBookOTNT: ea,
  isBookDC: yl,
  allBookNumbers: Nl,
  firstBook: kl,
  lastBook: na,
  extraBooks: _l,
  bookNumberToId: Sr,
  bookNumberToEnglishName: ra,
  bookIdToEnglishName: Cl,
  isCanonical: oa,
  isExtraMaterial: El,
  isObsolete: Tl
};
var Vt = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Vt || {});
const Nt = class {
  // private versInfo: Versification;
  constructor(t) {
    if (K(this, "name"), K(this, "fullPath"), K(this, "isPresent"), K(this, "hasVerseSegments"), K(this, "isCustomized"), K(this, "baseVersification"), K(this, "scriptureBooks"), K(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Vt[t]) : (this._type = t, this.name = Vt[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
K(Nt, "Original", new Nt(Vt.Original)), K(Nt, "Septuagint", new Nt(Vt.Septuagint)), K(Nt, "Vulgate", new Nt(Vt.Vulgate)), K(Nt, "English", new Nt(Vt.English)), K(Nt, "RussianProtestant", new Nt(Vt.RussianProtestant)), K(Nt, "RussianOrthodox", new Nt(Vt.RussianOrthodox));
let fe = Nt;
function eo(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var aa = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(aa || {});
const bt = class Y {
  constructor(t, n, r, a) {
    if (K(this, "firstChapter"), K(this, "lastChapter"), K(this, "lastVerse"), K(this, "hasSegmentsDefined"), K(this, "text"), K(this, "BBBCCCVVVS"), K(this, "longHashCode"), K(this, "versification"), K(this, "rtlMark", "‏"), K(this, "_bookNum", 0), K(this, "_chapterNum", 0), K(this, "_verseNum", 0), K(this, "_verse"), r == null && a == null)
      if (t != null && typeof t == "string") {
        const s = t, i = n != null && n instanceof fe ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (t != null && typeof t == "number") {
        const s = n != null && n instanceof fe ? n : void 0;
        this.setEmpty(s), this._verseNum = t % Y.chapterDigitShifter, this._chapterNum = Math.floor(
          t % Y.bookDigitShifter / Y.chapterDigitShifter
        ), this._bookNum = Math.floor(t / Y.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof Y) {
          const s = t;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (t == null) return;
          const s = t instanceof fe ? t : Y.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(a), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = a ?? Y.defaultVersification;
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
      return n = new Y(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof qe)
        return n = new Y(), { success: !1, verseRef: n };
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
    return t % Y.bcvMaxValue * Y.bookDigitShifter + (n >= 0 ? n % Y.bcvMaxValue * Y.chapterDigitShifter : 0) + (r >= 0 ? r % Y.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: a, verse: s, versificationStr: i } = t, l = s || a.toString();
    let w;
    return i && (w = new fe(i)), n ? new Y(n, r.toString(), l, w) : new Y();
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
      if (n = n * 10 + +r - 0, n > Y.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(Y.verseRangeSeparator) || this._verse.includes(Y.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Q.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = Q.bookIdToNumber(t);
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
    const { success: n, vNum: r } = Y.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = Y.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > Q.lastBook)
      throw new qe(
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
    this.versification = this.versification != null ? new fe(t) : void 0;
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
    return this.validateVerse(Y.verseRangeSeparators, Y.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return Y.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return Y.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new fe(Vt[i]);
        } catch {
          throw new qe("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new qe("Invalid reference : " + t);
    const r = n[1].split(":"), a = +r[0];
    if (r.length !== 2 || Q.bookIdToNumber(n[0]) === 0 || !Number.isInteger(a) || a < 0 || !Y.isVerseParseable(r[1]))
      throw new qe("Invalid reference : " + t);
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
    return new Y(this);
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
    return t instanceof Y ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, n = Y.verseRangeSeparators, r = Y.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const a = [], s = eo(this._verse, r);
    for (const i of s.map((l) => eo(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const w = l.verseNum;
      if (a.push(l), i.length > 1) {
        const c = this.clone();
        if (c.verse = i[1], !t)
          for (let p = w + 1; p < c.verseNum; p++) {
            const m = new Y(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || a.push(m);
          }
        a.push(c);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Q.lastBook ? 2 : (Q.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = Y.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = Q.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
K(bt, "defaultVersification", fe.English), K(bt, "verseRangeSeparator", "-"), K(bt, "verseSequenceIndicator", ","), K(bt, "verseRangeSeparators", [bt.verseRangeSeparator]), K(bt, "verseSequenceIndicators", [bt.verseSequenceIndicator]), K(bt, "chapterDigitShifter", 1e3), K(bt, "bookDigitShifter", bt.chapterDigitShifter * bt.chapterDigitShifter), K(bt, "bcvMaxValue", bt.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
K(bt, "ValidStatusType", aa);
let qe = class extends Error {
};
const sa = (e, t, n, r, a) => {
  switch (e) {
    case X.OT:
      return t ?? "Old Testament";
    case X.NT:
      return n ?? "New Testament";
    case X.DC:
      return r ?? "Deuterocanon";
    case X.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
}, Rl = (e, t, n, r, a) => {
  switch (e) {
    case X.OT:
      return t ?? "OT";
    case X.NT:
      return n ?? "NT";
    case X.DC:
      return r ?? "DC";
    case X.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
};
function Oe(e, t) {
  var r;
  return ((r = t == null ? void 0 : t.get(e)) == null ? void 0 : r.localizedName) ?? Q.bookIdToEnglishName(e);
}
function Rr(e, t) {
  var r;
  return ((r = t == null ? void 0 : t.get(e)) == null ? void 0 : r.localizedId) ?? e.toUpperCase();
}
const ia = Q.allBookIds.filter(
  (e) => !Q.isObsolete(Q.bookIdToNumber(e))
), Ne = Object.fromEntries(
  ia.map((e) => [e, Q.bookIdToEnglishName(e)])
);
function Dr(e, t, n) {
  const r = t.trim().toLowerCase();
  if (!r) return !1;
  const a = Q.bookIdToEnglishName(e), s = n == null ? void 0 : n.get(e);
  return !!(bn(a.toLowerCase(), r) || bn(e.toLowerCase(), r) || (s ? bn(s.localizedName.toLowerCase(), r) || bn(s.localizedId.toLowerCase(), r) : !1));
}
const la = wn(
  ({
    bookId: e,
    isSelected: t,
    onSelect: n,
    onMouseDown: r,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: w
  }, c) => {
    const p = Z(!1), m = () => {
      p.current || n == null || n(e), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, f = (x) => {
      p.current = !0, r ? r(x) : n == null || n(e);
    }, u = B(
      () => Oe(e, l),
      [e, l]
    ), g = B(
      () => Rr(e, l),
      [e, l]
    );
    return /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === X.OT,
            "tw-border-s-purple-200": a === X.NT,
            "tw-border-s-indigo-200": a === X.DC,
            "tw-border-s-amber-200": a === X.Extra
          }
        ),
        children: /* @__PURE__ */ d(
          Bt,
          {
            ref: c,
            value: w || `${e} ${Q.bookIdToEnglishName(e)}`,
            onSelect: m,
            onMouseDown: f,
            role: "option",
            "aria-selected": t,
            "aria-label": `${Q.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ o(
                Mt,
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
), Dl = ie(
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
  ({ className: e, variant: t, size: n, asChild: r = !1, ...a }, s) => /* @__PURE__ */ o(r ? ze : "button", { className: h(Dl({ variant: t, size: n, className: e })), ref: s, ...a })
);
L.displayName = "Button";
const le = Ae.Root, ce = Ae.Trigger, Tp = Ae.Anchor, Zt = b.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, a) => {
  const s = pt();
  return /* @__PURE__ */ o(Ae.Portal, { children: /* @__PURE__ */ o(
    Ae.Content,
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
Zt.displayName = Ae.Content.displayName;
function pr(e, t, n) {
  return `${e} ${Ne[e]}${t ? ` ${Rr(e, t)} ${Oe(e, t)}` : ""}${n ? ` ${n}` : ""}`;
}
function Ml({
  recentSearches: e,
  onSearchItemSelect: t,
  renderItem: n = (w) => String(w),
  getItemKey: r = (w) => String(w),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l
}) {
  const [w, c] = M(!1);
  if (e.length === 0)
    return;
  const p = (m) => {
    t(m), c(!1);
  };
  return /* @__PURE__ */ d(le, { open: w, onOpenChange: c, children: [
    /* @__PURE__ */ o(ce, { asChild: !0, children: /* @__PURE__ */ o(
      L,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ o(Kr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ o(Zt, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ o(Jt, { children: /* @__PURE__ */ o(Wt, { children: /* @__PURE__ */ o(Yt, { heading: s, children: e.map((m) => /* @__PURE__ */ d(
      Bt,
      {
        onSelect: () => p(m),
        className: h("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ o(Kr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ o("span", { children: n(m) })
        ]
      },
      r(m)
    )) }) }) }) })
  ] });
}
function Sp(e, t, n = (a, s) => a === s, r = 15) {
  return (a) => {
    const s = e.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, r - 1)];
    t(i);
  };
}
const Hn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ol = [
  Hn.BOOK_ONLY,
  Hn.BOOK_CHAPTER,
  Hn.BOOK_CHAPTER_VERSE
];
function no(e) {
  const t = /^[a-zA-Z]$/.test(e), n = /^[0-9]$/.test(e);
  return { isLetter: t, isDigit: n };
}
function $t(e) {
  return li(Q.bookIdToNumber(e));
}
function Il(e, t, n) {
  if (!e.trim() || t.length === 0) return;
  const r = Ol.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(e.trim());
      if (i) {
        const [l, w = void 0, c = void 0] = i.slice(1);
        let p;
        const m = t.filter((f) => Dr(f, l, n));
        if (m.length === 1 && ([p] = m), !p && w) {
          if (Q.isBookIdValid(l)) {
            const f = l.toUpperCase();
            t.includes(f) && (p = f);
          }
          if (!p && n) {
            const f = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && t.includes(f[0]) && ([p] = f);
          }
        }
        if (!p && w) {
          const u = ((g) => Object.keys(Ne).find(
            (x) => Ne[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && t.includes(u) && (p = u), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && t.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let f = w ? parseInt(w, 10) : void 0;
          f && f > $t(p) && (f = Math.max($t(p), 1));
          const u = c ? parseInt(c, 10) : void 0;
          return {
            book: p,
            chapterNum: f,
            verseNum: u
          };
        }
      }
    },
    void 0
  );
  if (r) return r;
}
function Al(e, t, n, r) {
  const a = z(() => {
    if (e.chapterNum > 1)
      r({
        book: e.book,
        chapterNum: e.chapterNum - 1,
        verseNum: 1
      });
    else {
      const w = t.indexOf(e.book);
      if (w > 0) {
        const c = t[w - 1], p = Math.max($t(c), 1);
        r({
          book: c,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [e, t, r]), s = z(() => {
    const w = $t(e.book);
    if (e.chapterNum < w)
      r({
        book: e.book,
        chapterNum: e.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = t.indexOf(e.book);
      if (c < t.length - 1) {
        const p = t[c + 1];
        r({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [e, t, r]), i = z(() => {
    r({
      book: e.book,
      chapterNum: e.chapterNum,
      verseNum: e.verseNum > 1 ? e.verseNum - 1 : 0
    });
  }, [e, r]), l = z(() => {
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
      icon: n === "ltr" ? Xr : Yr
    },
    {
      onClick: i,
      disabled: t.length === 0 || e.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? rr : Ie
    },
    {
      onClick: l,
      disabled: t.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Ie : rr
    },
    {
      onClick: s,
      disabled: t.length === 0 || (e.chapterNum === $t(e.book) || $t(e.book) === -1) && t.indexOf(e.book) === t.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Yr : Xr
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
function ro({
  bookId: e,
  scrRef: t,
  onChapterSelect: n,
  setChapterRef: r,
  isChapterDimmed: a,
  className: s
}) {
  if (e)
    return /* @__PURE__ */ o(Yt, { children: /* @__PURE__ */ o("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: $t(e) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ o(
      Bt,
      {
        value: `${e} ${Ne[e] || ""} ${i}`,
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
function Rp({
  scrRef: e,
  handleSubmit: t,
  className: n,
  getActiveBookIds: r,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: w
}) {
  const c = pt(), [p, m] = M(!1), [f, u] = M(""), [g, x] = M(""), [v, N] = M("books"), [k, T] = M(void 0), [V, $] = M(!1), P = Z(void 0), y = Z(void 0), C = Z(void 0), _ = Z(void 0), S = Z({}), E = z(
    (O) => {
      t(O), l && l(O);
    },
    [t, l]
  ), A = B(() => r ? r() : ia, [r]), U = B(() => ({
    [X.OT]: A.filter((H) => Q.isBookOT(H)),
    [X.NT]: A.filter((H) => Q.isBookNT(H)),
    [X.DC]: A.filter((H) => Q.isBookDC(H)),
    [X.Extra]: A.filter((H) => Q.extraBooks().includes(H))
  }), [A]), I = B(() => Object.values(U).flat(), [U]), G = B(() => {
    if (!g.trim()) return U;
    const O = {
      [X.OT]: [],
      [X.NT]: [],
      [X.DC]: [],
      [X.Extra]: []
    };
    return [X.OT, X.NT, X.DC, X.Extra].forEach((st) => {
      O[st] = U[st].filter((lt) => Dr(lt, g, a));
    }), O;
  }, [U, g, a]), D = B(
    () => Il(g, I, a),
    [g, I, a]
  ), F = z(() => {
    D && (E({
      book: D.book,
      chapterNum: D.chapterNum ?? 1,
      verseNum: D.verseNum ?? 1
    }), m(!1), x(""), u(""));
  }, [E, D]), ct = z(
    (O) => {
      if ($t(O) <= 1) {
        E({
          book: O,
          chapterNum: 1,
          verseNum: 1
        }), m(!1), x("");
        return;
      }
      T(O), N("chapters");
    },
    [E]
  ), ft = z(
    (O) => {
      const H = v === "chapters" ? k : D == null ? void 0 : D.book;
      H && (E({
        book: H,
        chapterNum: O,
        verseNum: 1
      }), m(!1), N("books"), T(void 0), x(""));
    },
    [E, v, k, D]
  ), zt = z(
    (O) => {
      E(O), m(!1), x("");
    },
    [E]
  ), ut = Al(e, I, c, t), j = z(() => {
    N("books"), T(void 0), setTimeout(() => {
      y.current && y.current.focus();
    }, 0);
  }, []), et = z(
    (O) => {
      if (!O && v === "chapters") {
        j();
        return;
      }
      m(O), O && (N("books"), T(void 0), x(""));
    },
    [v, j]
  ), { otLong: gt, ntLong: yt, dcLong: kt, extraLong: de } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, hn = z(
    (O) => sa(O, gt, yt, kt, de),
    [gt, yt, kt, de]
  ), Ye = z(
    (O) => D ? !!D.chapterNum && !O.toString().includes(D.chapterNum.toString()) : !1,
    [D]
  ), te = B(
    () => xe(
      e,
      a ? Oe(e.book, a) : "English"
    ),
    [e, a]
  ), Ct = z((O) => (H) => {
    S.current[O] = H;
  }, []), fn = z((O) => {
    (O.key === "Home" || O.key === "End") && O.stopPropagation();
  }, []), Re = z(
    (O) => {
      if (O.ctrlKey) return;
      const { isLetter: H, isDigit: st } = no(O.key);
      if (v === "chapters") {
        if (O.key === "Backspace") {
          O.preventDefault(), O.stopPropagation(), j();
          return;
        }
        if (H || st) {
          if (O.preventDefault(), O.stopPropagation(), N("books"), T(void 0), st && k) {
            const lt = Ne[k];
            x(`${lt} ${O.key}`);
          } else
            x(O.key);
          setTimeout(() => {
            y.current && y.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && D) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(O.key)) {
        const lt = v === "chapters" ? k : D == null ? void 0 : D.book;
        if (!lt) return;
        const nt = (() => {
          if (!f) return 1;
          const me = f.match(/(\d+)$/);
          return me ? parseInt(me[1], 10) : 0;
        })(), Ft = $t(lt);
        if (!Ft) return;
        let Et = nt;
        const ue = 6;
        switch (O.key) {
          case "ArrowLeft":
            nt !== 0 && (Et = nt > 1 ? nt - 1 : Ft);
            break;
          case "ArrowRight":
            nt !== 0 && (Et = nt < Ft ? nt + 1 : 1);
            break;
          case "ArrowUp":
            Et = nt === 0 ? Ft : Math.max(1, nt - ue);
            break;
          case "ArrowDown":
            Et = nt === 0 ? 1 : Math.min(Ft, nt + ue);
            break;
          default:
            return;
        }
        Et !== nt && (O.preventDefault(), O.stopPropagation(), u(pr(lt, a, Et)), setTimeout(() => {
          const me = S.current[Et];
          me && me.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      D,
      j,
      k,
      f,
      a
    ]
  ), pe = z((O) => {
    if (O.shiftKey || O.key === "Tab" || O.key === " ") return;
    const { isLetter: H, isDigit: st } = no(O.key);
    (H || st) && (O.preventDefault(), x((lt) => lt + O.key), y.current.focus(), $(!1));
  }, []);
  return Kt(() => {
    const O = setTimeout(() => {
      if (p && v === "books" && C.current && _.current) {
        const H = C.current, st = _.current, lt = st.offsetTop, nt = H.clientHeight, Ft = st.clientHeight, Et = lt - nt / 2 + Ft / 2;
        H.scrollTo({
          top: Math.max(0, Et),
          behavior: "smooth"
        }), u(pr(e.book));
      }
    }, 0);
    return () => {
      clearTimeout(O);
    };
  }, [p, v, g, D, e.book]), Kt(() => {
    if (v === "chapters" && k) {
      const O = k === e.book;
      setTimeout(() => {
        if (C.current)
          if (O) {
            const H = S.current[e.chapterNum];
            H && H.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            C.current.scrollTo({ top: 0 });
        P.current && P.current.focus();
      }, 0);
    }
  }, [v, k, D, e.book, e.chapterNum]), /* @__PURE__ */ d(le, { open: p, onOpenChange: et, children: [
    /* @__PURE__ */ o(ce, { asChild: !0, children: /* @__PURE__ */ o(
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
        children: /* @__PURE__ */ o("span", { className: "tw-truncate", children: te })
      }
    ) }),
    /* @__PURE__ */ o(Zt, { id: w, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ d(
      Jt,
      {
        ref: P,
        onKeyDown: Re,
        loop: !0,
        value: f,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ d("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ d("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ o(
                Ge,
                {
                  ref: y,
                  value: g,
                  onValueChange: x,
                  onKeyDown: fn,
                  onFocus: () => $(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ o(
                Ml,
                {
                  recentSearches: i,
                  onSearchItemSelect: zt,
                  renderItem: (O) => xe(O, "English"),
                  getItemKey: (O) => `${O.book}-${O.chapterNum}-${O.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: ut.map(({ onClick: O, disabled: H, title: st, icon: lt }) => /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  $(!0), O();
                },
                disabled: H,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: st,
                onKeyDown: pe,
                children: /* @__PURE__ */ o(lt, {})
              },
              st
            )) })
          ] }) : /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "sm",
                onClick: j,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ o(Es, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ o(Ts, { className: "tw-h-4 tw-w-4" })
              }
            ),
            k && /* @__PURE__ */ o("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Oe(k, a) })
          ] }),
          !V && /* @__PURE__ */ d(Wt, { ref: C, children: [
            v === "books" && /* @__PURE__ */ d(wt, { children: [
              !D && Object.entries(G).map(([O, H]) => {
                if (H.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ o(Yt, { heading: hn(O), children: H.map((st) => /* @__PURE__ */ o(
                      la,
                      {
                        bookId: st,
                        onSelect: (lt) => ct(lt),
                        section: Qe(st),
                        commandValue: `${st} ${Ne[st]}`,
                        ref: st === e.book ? _ : void 0,
                        localizedBookNames: a
                      },
                      st
                    )) }, O)
                  );
              }),
              D && /* @__PURE__ */ o(Yt, { children: /* @__PURE__ */ o(
                Bt,
                {
                  value: `${D.book} ${Ne[D.book]} ${D.chapterNum || ""}:${D.verseNum || ""})}`,
                  onSelect: F,
                  className: "tw-font-semibold tw-text-primary",
                  children: xe(
                    {
                      book: D.book,
                      chapterNum: D.chapterNum ?? 1,
                      verseNum: D.verseNum ?? 1
                    },
                    a ? Rr(D.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              D && $t(D.book) > 1 && /* @__PURE__ */ d(wt, { children: [
                /* @__PURE__ */ o("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Oe(D.book, a) }),
                /* @__PURE__ */ o(
                  ro,
                  {
                    bookId: D.book,
                    scrRef: e,
                    onChapterSelect: ft,
                    setChapterRef: Ct,
                    isChapterDimmed: Ye,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && k && /* @__PURE__ */ o(
              ro,
              {
                bookId: k,
                scrRef: e,
                onChapterSelect: ft,
                setChapterRef: Ct,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Dp = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Pl = ie(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), dt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(Io.Root, { ref: n, className: h("pr-twp", Pl(), e), ...t }));
dt.displayName = Io.Root.displayName;
const Mr = b.forwardRef(({ className: e, ...t }, n) => {
  const r = pt();
  return /* @__PURE__ */ o(
    on.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", e),
      ...t,
      ref: n,
      dir: r
    }
  );
});
Mr.displayName = on.Root.displayName;
const Tn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  on.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ o(on.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ o(In, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Tn.displayName = on.Item.displayName;
function Vl(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function ur({
  id: e,
  options: t = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = Vl,
  getButtonLabel: w,
  icon: c = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: m = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: u = "outline",
  alignDropDown: g = "start",
  isDisabled: x = !1,
  ariaLabel: v,
  ...N
}) {
  const [k, T] = M(!1), V = w ?? l, $ = (y) => y.length > 0 && typeof y[0] == "object" && "options" in y[0], P = (y, C) => {
    const _ = l(y), S = typeof y == "object" && "secondaryLabel" in y ? y.secondaryLabel : void 0, E = `${C ?? ""}${_}${S ?? ""}`;
    return /* @__PURE__ */ d(
      Bt,
      {
        value: _,
        onSelect: () => {
          i(y), T(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ o(
            Mt,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || l(s) !== _
              })
            }
          ),
          /* @__PURE__ */ d("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            _,
            S && /* @__PURE__ */ d("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              S
            ] })
          ] })
        ]
      },
      E
    );
  };
  return /* @__PURE__ */ d(le, { open: k, onOpenChange: T, ...N, children: [
    /* @__PURE__ */ o(ce, { asChild: !0, children: /* @__PURE__ */ d(
      L,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": k,
        "aria-label": v,
        id: e,
        className: h(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: x,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ o("div", { className: "tw-shrink-0 tw-pe-2", children: c }),
            /* @__PURE__ */ o(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? V(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ o(_e, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(
      Zt,
      {
        align: g,
        className: h("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ d(Jt, { children: [
          /* @__PURE__ */ o(Ge, { placeholder: m, className: "tw-text-inherit" }),
          /* @__PURE__ */ o(un, { children: f }),
          /* @__PURE__ */ o(Wt, { children: $(t) ? t.map((y) => /* @__PURE__ */ o(Yt, { heading: y.groupHeading, children: y.options.map((C) => P(C, y.groupHeading)) }, y.groupHeading)) : t.map((y) => P(y)) })
        ] })
      }
    )
  ] });
}
function $l({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = B(
    () => Array.from({ length: s }, (c, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ d(wt, { children: [
    /* @__PURE__ */ o(dt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ o(
      ur,
      {
        isDisabled: a,
        onChange: (c) => {
          n(c), c > t && r(c);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ o(dt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ o(
      ur,
      {
        isDisabled: a,
        onChange: (c) => {
          r(c), c < e && n(c);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var Ll = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(Ll || {});
const Mp = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Kn = (e, t) => e[t] ?? t;
function Op({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: w,
  localizedStrings: c
}) {
  const p = Kn(c, "%webView_bookSelector_currentBook%"), m = Kn(c, "%webView_bookSelector_choose%"), f = Kn(c, "%webView_bookSelector_chooseBooks%"), [u, g] = M(
    "current book"
    /* CURRENT_BOOK */
  ), x = (v) => {
    g(v), e(v);
  };
  return /* @__PURE__ */ o(
    Mr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(Tn, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ o(dt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ o(dt, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ o(
            $l,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: w,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(Tn, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ o(dt, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ o(dt, { className: "tw-flex tw-items-center", children: r.map((v) => Q.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ o(
            L,
            {
              disabled: u === "current book",
              onClick: () => n(),
              children: m
            }
          )
        ] })
      ] })
    }
  );
}
const ca = On(null);
function Bl(e, t) {
  return { getTheme: function() {
    return t ?? null;
  } };
}
function jt() {
  const e = Nr(ca);
  return e == null && function(t, ...n) {
    const r = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", t);
    for (const s of n) a.append("v", s);
    throw r.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), e;
}
const wa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, jl = wa ? Kt : q, xn = { tag: kr };
function zl({ initialConfig: e, children: t }) {
  const n = B(() => {
    const { theme: r, namespace: a, nodes: s, onError: i, editorState: l, html: w } = e, c = Bl(null, r), p = Ao({ editable: e.editable, html: w, namespace: a, nodes: s, onError: (m) => i(m, p), theme: r });
    return function(m, f) {
      if (f !== null) {
        if (f === void 0) m.update(() => {
          const u = oe();
          if (u.isEmpty()) {
            const g = An();
            u.append(g);
            const x = wa ? document.activeElement : null;
            (Xt() !== null || x !== null && x === m.getRootElement()) && g.select();
          }
        }, xn);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const u = m.parseEditorState(f);
            m.setEditorState(u, xn);
            break;
          }
          case "object":
            m.setEditorState(f, xn);
            break;
          case "function":
            m.update(() => {
              oe().isEmpty() && f(m);
            }, xn);
        }
      }
    }(p, l), [p, c];
  }, []);
  return jl(() => {
    const r = e.editable, [a] = n;
    a.setEditable(r === void 0 || r);
  }, []), o(ca.Provider, { value: n, children: t });
}
const Fl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function Gl({ ignoreHistoryMergeTagChange: e = !0, ignoreSelectionChange: t = !1, onChange: n }) {
  const [r] = jt();
  return Fl(() => {
    if (n) return r.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: w }) => {
      t && s.size === 0 && i.size === 0 || e && w.has(kr) || l.isEmpty() || n(a, r, w);
    });
  }, [r, e, t, n]), null;
}
const Or = {
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
}, St = pn.Provider, Lt = pn.Root, Ut = pn.Trigger, Rt = b.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ o(
  pn.Content,
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
Rt.displayName = pn.Content.displayName;
const Ir = [
  Ji,
  Po,
  Vo,
  Wi
], Ul = On(null), Xn = {
  didCatch: !1,
  error: null
};
class Hl extends ks {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Xn;
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
      }), this.setState(Xn);
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
    if (r && n.error !== null && Kl(t.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState(Xn);
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
      const w = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(w);
      else if (r)
        l = Hr(r, w);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Hr(Ul.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Kl() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, r) => !Object.is(n, t[r]));
}
function Xl({ children: e, onError: t }) {
  return o(Hl, { fallback: o("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: t, children: e });
}
const Yl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function ql(e) {
  return { initialValueFn: () => e.isEditable(), subscribe: (t) => e.registerEditableListener(t) };
}
function Jl() {
  return function(e) {
    const [t] = jt(), n = B(() => e(t), [t, e]), [r, a] = M(() => n.initialValueFn()), s = Z(r);
    return Yl(() => {
      const { initialValueFn: i, subscribe: l } = n, w = i();
      return s.current !== w && (s.current = w, a(w)), l((c) => {
        s.current = c, a(c);
      });
    }, [n, e]), r;
  }(ql);
}
function Wl(e, t, n = "self") {
  const r = e.getStartEndPoints();
  if (t.isSelected(e) && !fi(t) && r !== null) {
    const [a, s] = r, i = e.isBackward(), l = a.getNode(), w = s.getNode(), c = t.is(l), p = t.is(w);
    if (c || p) {
      const [m, f] = gi(e), u = l.is(w), g = t.is(i ? w : l), x = t.is(i ? l : w);
      let v, N = 0;
      u ? (N = m > f ? f : m, v = m > f ? m : f) : g ? (N = i ? f : m, v = void 0) : x && (N = 0, v = i ? m : f);
      const k = t.__text.slice(N, v);
      k !== t.__text && (n === "clone" && (t = bi(t)), t.__text = k);
    }
  }
  return t;
}
function Zl(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const da = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ql = da && "documentMode" in document ? document.documentMode : null;
!(!da || !("InputEvent" in window) || Ql) && "getTargetRanges" in new window.InputEvent("input");
function pa(...e) {
  const t = [];
  for (const n of e) if (n && typeof n == "string") for (const [r] of n.matchAll(/\S+/g)) t.push(r);
  return t;
}
function ae(...e) {
  return () => {
    for (let t = e.length - 1; t >= 0; t--) e[t]();
    e.length = 0;
  };
}
function ua(e, ...t) {
  const n = pa(...t);
  n.length > 0 && e.classList.add(...n);
}
function tc(e, ...t) {
  const n = pa(...t);
  n.length > 0 && e.classList.remove(...n);
}
function oo(e) {
  const t = vi(e, (n) => ye(n) && !n.isInline());
  return ye(t) || Zl(4, e.__key), t;
}
function ec(e, t) {
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const a = t(e[r]);
    a !== null && n.push(a);
  }
  return n;
}
const nc = Symbol.for("preact-signals");
function Vn() {
  if (re > 1) return void re--;
  let e, t = !1;
  for (; en !== void 0; ) {
    let n = en;
    for (en = void 0, mr++; n !== void 0; ) {
      const r = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && ma(n)) try {
        n.c();
      } catch (a) {
        t || (e = a, t = !0);
      }
      n = r;
    }
  }
  if (mr = 0, re--, t) throw e;
}
function rc(e) {
  if (re > 0) return e();
  re++;
  try {
    return e();
  } finally {
    Vn();
  }
}
let J, en;
function ao(e) {
  const t = J;
  J = void 0;
  try {
    return e();
  } finally {
    J = t;
  }
}
let re = 0, mr = 0, kn = 0;
function so(e) {
  if (J === void 0) return;
  let t = e.n;
  return t === void 0 || t.t !== J ? (t = { i: 0, S: e, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: t }, J.s !== void 0 && (J.s.n = t), J.s = t, e.n = t, 32 & J.f && e.S(t), t) : t.i === -1 ? (t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = J.s, t.n = void 0, J.s.n = t, J.s = t), t) : void 0;
}
function ht(e, t) {
  this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function sn(e, t) {
  return new ht(e, t);
}
function ma(e) {
  for (let t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function io(e) {
  for (let t = e.s; t !== void 0; t = t.n) {
    const n = t.S.n;
    if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
      e.s = t;
      break;
    }
  }
}
function ha(e) {
  let t, n = e.s;
  for (; n !== void 0; ) {
    const r = n.p;
    n.i === -1 ? (n.S.U(n), r !== void 0 && (r.n = n.n), n.n !== void 0 && (n.n.p = r)) : t = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = r;
  }
  e.s = t;
}
function ge(e, t) {
  ht.call(this, void 0), this.x = e, this.s = void 0, this.g = kn - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function oc(e, t) {
  return new ge(e, t);
}
function fa(e) {
  const t = e.u;
  if (e.u = void 0, typeof t == "function") {
    re++;
    const n = J;
    J = void 0;
    try {
      t();
    } catch (r) {
      throw e.f &= -2, e.f |= 8, Ar(e), r;
    } finally {
      J = n, Vn();
    }
  }
}
function Ar(e) {
  for (let t = e.s; t !== void 0; t = t.n) t.S.U(t);
  e.x = void 0, e.s = void 0, fa(e);
}
function ac(e) {
  if (J !== this) throw new Error("Out-of-order effect");
  ha(this), J = e, this.f &= -2, 8 & this.f && Ar(this), Vn();
}
function Me(e, t) {
  this.x = e, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = t == null ? void 0 : t.name;
}
function se(e, t) {
  const n = new Me(e, t);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const r = n.d.bind(n);
  return r[Symbol.dispose] = r, r;
}
function $n(e, t = {}) {
  const n = {};
  for (const r in e) {
    const a = t[r], s = sn(a === void 0 ? e[r] : a);
    n[r] = s;
  }
  return n;
}
ht.prototype.brand = nc, ht.prototype.h = function() {
  return !0;
}, ht.prototype.S = function(e) {
  const t = this.t;
  t !== e && e.e === void 0 && (e.x = t, this.t = e, t !== void 0 ? t.e = e : ao(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, ht.prototype.U = function(e) {
  if (this.t !== void 0) {
    const t = e.e, n = e.x;
    t !== void 0 && (t.x = n, e.e = void 0), n !== void 0 && (n.e = t, e.x = void 0), e === this.t && (this.t = n, n === void 0 && ao(() => {
      var r;
      (r = this.Z) == null || r.call(this);
    }));
  }
}, ht.prototype.subscribe = function(e) {
  return se(() => {
    const t = this.value, n = J;
    J = void 0;
    try {
      e(t);
    } finally {
      J = n;
    }
  }, { name: "sub" });
}, ht.prototype.valueOf = function() {
  return this.value;
}, ht.prototype.toString = function() {
  return this.value + "";
}, ht.prototype.toJSON = function() {
  return this.value;
}, ht.prototype.peek = function() {
  const e = J;
  J = void 0;
  try {
    return this.value;
  } finally {
    J = e;
  }
}, Object.defineProperty(ht.prototype, "value", { get() {
  const e = so(this);
  return e !== void 0 && (e.i = this.i), this.v;
}, set(e) {
  if (e !== this.v) {
    if (mr > 100) throw new Error("Cycle detected");
    this.v = e, this.i++, kn++, re++;
    try {
      for (let t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      Vn();
    }
  }
} }), ge.prototype = new ht(), ge.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === kn)) return !0;
  if (this.g = kn, this.f |= 1, this.i > 0 && !ma(this)) return this.f &= -2, !0;
  const e = J;
  try {
    io(this), J = this;
    const t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return J = e, ha(this), this.f &= -2, !0;
}, ge.prototype.S = function(e) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  ht.prototype.S.call(this, e);
}, ge.prototype.U = function(e) {
  if (this.t !== void 0 && (ht.prototype.U.call(this, e), this.t === void 0)) {
    this.f &= -33;
    for (let t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
}, ge.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let e = this.t; e !== void 0; e = e.x) e.t.N();
  }
}, Object.defineProperty(ge.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const e = so(this);
  if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Me.prototype.c = function() {
  const e = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    e();
  }
}, Me.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, fa(this), io(this), re++;
  const e = J;
  return J = this, ac.bind(this, e);
}, Me.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = en, en = this);
}, Me.prototype.d = function() {
  this.f |= 8, 1 & this.f || Ar(this);
}, Me.prototype.dispose = function() {
  this.d();
};
qt({ build: (e, t, n) => $n(t), config: dn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(e, t, n) {
  const r = n.getOutput();
  return se(() => r.disabled.value ? void 0 : e.registerRootListener((a) => {
    e.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: r.defaultSelection.peek() });
  }));
} });
function ga() {
  const e = oe(), t = Xt(), n = An();
  e.clear(), e.append(n), t !== null && n.select(), an(t) && (t.format = 0);
}
function ba(e, t = ga) {
  return e.registerCommand($o, (n) => (e.update(t), !0), Lo);
}
qt({ build: (e, t, n) => $n(t), config: dn({ $onClear: ga }), name: "@lexical/extension/ClearEditor", register(e, t, n) {
  const { $onClear: r } = n.getOutput();
  return se(() => ba(e, r.value));
} });
function sc(e) {
  return (typeof e.nodes == "function" ? e.nodes() : e.nodes) || [];
}
function va(e, t) {
  let n;
  return sn(e(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = e(), n = t(this);
  } });
}
const hr = qt({ build: (e) => va(() => e.getEditorState(), (t) => e.registerUpdateListener((n) => {
  t.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function tt(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function xa(e, t) {
  if (e && t && !Array.isArray(t) && typeof e == "object" && typeof t == "object") {
    const n = e, r = t;
    for (const a in r) n[a] = xa(n[a], r[a]);
    return e;
  }
  return t;
}
const Pr = 0, fr = 1, ya = 2, Yn = 3, yn = 4, De = 5, qn = 6, Je = 7;
function Jn(e) {
  return e.id === Pr;
}
function Na(e) {
  return e.id === ya;
}
function ic(e) {
  return function(t) {
    return t.id === fr;
  }(e) || tt(305, String(e.id), String(fr)), Object.assign(e, { id: ya });
}
const lc = /* @__PURE__ */ new Set();
class cc {
  constructor(t, n) {
    mt(this, "builder");
    mt(this, "configs");
    mt(this, "_dependency");
    mt(this, "_peerNameSet");
    mt(this, "extension");
    mt(this, "state");
    mt(this, "_signal");
    this.builder = t, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: Pr };
  }
  mergeConfigs() {
    let t = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : xi;
    for (const r of this.configs) t = n(t, r);
    return t;
  }
  init(t) {
    const n = this.state;
    Na(n) || tt(306, String(n.id));
    const r = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...r, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, w, c) {
      return Object.assign(l, { config: w, id: Yn, registerState: c });
    }(n, this.mergeConfigs(), r);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(t, s.config, r)), this.state = function(l, w, c) {
      return Object.assign(l, { id: yn, initResult: w, registerState: c });
    }(s, i, a);
  }
  build(t) {
    const n = this.state;
    let r;
    n.id !== yn && tt(307, String(n.id), String(De)), this.extension.build && (r = this.extension.build(t, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => r, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: De, output: i, registerState: l });
    }(n, r, a);
  }
  register(t, n) {
    this._signal = n;
    const r = this.state;
    r.id !== De && tt(308, String(r.id), String(De));
    const a = this.extension.register && this.extension.register(t, r.config, r.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: qn });
    }(r), () => {
      const s = this.state;
      s.id !== Je && tt(309, String(r.id), String(Je)), this.state = function(i) {
        return Object.assign(i, { id: De });
      }(s), a && a();
    };
  }
  afterRegistration(t) {
    const n = this.state;
    let r;
    return n.id !== qn && tt(310, String(n.id), String(qn)), this.extension.afterRegistration && (r = this.extension.afterRegistration(t, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: Je });
    }(n), r;
  }
  getSignal() {
    return this._signal === void 0 && tt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && tt(312, this.extension.name);
    const t = this.state;
    return function(n) {
      return n.id >= yn;
    }(t) || tt(313, String(t.id), String(yn)), t.initResult;
  }
  getInitPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const t = this.state;
    return function(n) {
      return n.id >= Yn;
    }(t) || tt(314, String(t.id), String(Yn)), { config: t.config };
  }
  getPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && tt(315, this.extension.name, t.name), n.getExtensionInitDependency();
  }
  getDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && tt(315, this.extension.name, t.name), n.getExtensionDependency();
  }
  getState() {
    const t = this.state;
    return function(n) {
      return n.id >= Je;
    }(t) || tt(316, String(t.id), String(Je)), t;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || lc;
  }
  getPeerNameSet() {
    let t = this._peerNameSet;
    return t || (t = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = t), t;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const t = this.state;
      (function(n) {
        return n.id >= De;
      })(t) || tt(317, this.extension.name), this._dependency = { config: t.config, init: t.initResult, output: t.output };
    }
    return this._dependency;
  }
}
const lo = { tag: kr };
function wc() {
  const e = oe();
  e.isEmpty() && e.append(An());
}
const dc = qt({ config: dn({ setOptions: lo, updateOptions: lo }), init: ({ $initialEditorState: e = wc }) => ({ $initialEditorState: e, initialized: !1 }), afterRegistration(e, { updateOptions: t, setOptions: n }, r) {
  const a = r.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (_i(s)) e.setEditorState(s, n);
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
}, name: "@lexical/extension/InitialState", nodes: [yi, Vo, Ni, ki, Po] }), co = Symbol.for("@lexical/extension/LexicalBuilder");
function wo() {
}
function pc(e) {
  throw e;
}
function Nn(e) {
  return Array.isArray(e) ? e : [e];
}
const Wn = "0.38.2+prod.esm";
class nn {
  constructor(t) {
    mt(this, "roots");
    mt(this, "extensionNameMap");
    mt(this, "outgoingConfigEdges");
    mt(this, "incomingEdges");
    mt(this, "conflicts");
    mt(this, "_sortedExtensionReps");
    mt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = Wn, this.roots = t;
    for (const n of t) this.addExtension(n);
  }
  static fromExtensions(t) {
    const n = [Nn(dc)];
    for (const r of t) n.push(Nn(r));
    return new nn(n);
  }
  static maybeFromEditor(t) {
    const n = t[co];
    return n && (n.PACKAGE_VERSION !== Wn && tt(292, n.PACKAGE_VERSION, Wn), n instanceof nn || tt(293)), n;
  }
  static fromEditor(t) {
    const n = nn.maybeFromEditor(t);
    return n === void 0 && tt(294), n;
  }
  constructEditor() {
    const { $initialEditorState: t, onError: n, ...r } = this.buildCreateEditorArgs(), a = Object.assign(Ao({ ...r, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [co]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let t = wo;
    function n() {
      try {
        t();
      } finally {
        t = wo;
      }
    }
    const r = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return t = ae(this.registerEditor(r), () => r.setRootElement(null)), r;
  }
  hasExtensionByName(t) {
    return this.extensionNameMap.has(t);
  }
  getExtensionRep(t) {
    const n = this.extensionNameMap.get(t.name);
    if (n) return n.extension !== t && tt(295, t.name), n;
  }
  addEdge(t, n, r) {
    const a = this.outgoingConfigEdges.get(t);
    a ? a.set(n, r) : this.outgoingConfigEdges.set(t, /* @__PURE__ */ new Map([[n, r]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(t) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([t]));
  }
  addExtension(t) {
    this._sortedExtensionReps !== void 0 && tt(296);
    const n = Nn(t), [r] = n;
    typeof r.name != "string" && tt(297, typeof r.name);
    let a = this.extensionNameMap.get(r.name);
    if (a !== void 0 && a.extension !== r && tt(298, r.name), !a) {
      a = new cc(this, r), this.extensionNameMap.set(r.name, a);
      const s = this.conflicts.get(r.name);
      typeof s == "string" && tt(299, r.name, s);
      for (const i of r.conflictsWith || []) this.extensionNameMap.has(i) && tt(299, r.name, i), this.conflicts.set(i, r.name);
      for (const i of r.dependencies || []) {
        const l = Nn(i);
        this.addEdge(r.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of r.peerDependencies || []) this.addEdge(r.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const t = [], n = (r, a) => {
      let s = r.state;
      if (Na(s)) return;
      const i = r.extension.name;
      var l;
      Jn(s) || tt(300, i, a || "[unknown]"), Jn(l = s) || tt(304, String(l.id), String(Pr)), s = Object.assign(l, { id: fr }), r.state = s;
      const w = this.outgoingConfigEdges.get(i);
      if (w) for (const c of w.keys()) {
        const p = this.extensionNameMap.get(c);
        p && n(p, i);
      }
      s = ic(s), r.state = s, t.push(r);
    };
    for (const r of this.extensionNameMap.values()) Jn(r.state) && n(r);
    for (const r of t) for (const [a, s] of this.outgoingConfigEdges.get(r.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [r, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(r.name);
      s === void 0 && tt(301, r.name);
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
    return ae(...a);
  }
  buildCreateEditorArgs() {
    const t = {}, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: m } = p;
      if (m.onError !== void 0 && (t.onError = m.onError), m.disableEvents !== void 0 && (t.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (t.parentEditor = m.parentEditor), m.editable !== void 0 && (t.editable = m.editable), m.namespace !== void 0 && (t.namespace = m.namespace), m.$initialEditorState !== void 0 && (t.$initialEditorState = m.$initialEditorState), m.nodes) for (const f of sc(m)) {
        if (typeof f != "function") {
          const u = r.get(f.replace);
          u && tt(302, m.name, f.replace.name, u.extension.name), r.set(f.replace, p);
        }
        n.add(f);
      }
      if (m.html) {
        if (m.html.export) for (const [f, u] of m.html.export.entries()) a.set(f, u);
        m.html.import && Object.assign(s, m.html.import);
      }
      m.theme && xa(i, m.theme);
    }
    Object.keys(i).length > 0 && (t.theme = i), n.size && (t.nodes = [...n]);
    const w = Object.keys(s).length > 0, c = a.size > 0;
    (w || c) && (t.html = {}, w && (t.html.import = s), c && (t.html.export = a));
    for (const p of l) p.init(t);
    return t.onError || (t.onError = pc), t;
  }
}
const uc = /* @__PURE__ */ new Set(), po = qt({ build(e, t, n) {
  const r = n.getDependency(hr).output, a = sn({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = va(() => {
  }, () => se(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let w, c = !1;
    r.value.read(() => {
      if (Xt()) for (const [p, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(p);
          continue;
        }
        const f = Pi(p), u = f && f.isSelected() || !1;
        c = c || u !== (!!i && i.has(p)), u && (w = w || /* @__PURE__ */ new Set(), w.add(p));
      }
    }), !c && w && i && w.size === i.size || (s.value = w);
  }));
  return { watchNodeKey: function(i) {
    const l = oc(() => (s.value || uc).has(i)), { watchedNodeKeys: w } = a.peek();
    let c = w.get(i);
    const p = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), p || (w.set(i, c), a.value = { watchedNodeKeys: w }), l;
  } };
}, dependencies: [hr], name: "@lexical/extension/NodeSelection" });
Ci("INSERT_HORIZONTAL_RULE_COMMAND");
class Pe extends Ii {
  static getType() {
    return "horizontalrule";
  }
  static clone(t) {
    return new Pe(t.__key);
  }
  static importJSON(t) {
    return ka().updateFromJSON(t);
  }
  static importDOM() {
    return { hr: () => ({ conversion: mc, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(t) {
    const n = document.createElement("hr");
    return ua(n, t.theme.hr), n;
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
function mc() {
  return { node: ka() };
}
function ka() {
  return Ai(Pe);
}
function hc(e) {
  return e instanceof Pe;
}
qt({ dependencies: [hr, po], name: "@lexical/extension/HorizontalRule", nodes: [Pe], register(e, t, n) {
  const { watchNodeKey: r } = n.getDependency(po).output, a = sn({ nodeSelections: /* @__PURE__ */ new Map() }), s = e._config.theme.hrSelected ?? "selected";
  return ae(e.registerCommand(Ei, (i) => {
    if (Ti(i.target)) {
      const l = Si(i.target);
      if (hc(l)) return function(w, c = !1) {
        const p = Xt(), m = w.isSelected(), f = w.getKey();
        let u;
        c && Ri(p) ? u = p : (u = Di(), Mi(u)), m ? u.delete(f) : u.add(f);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, Oi), e.registerMutationListener(Pe, (i, l) => {
    rc(() => {
      let w = !1;
      const { nodeSelections: c } = a.peek();
      for (const [p, m] of i.entries()) if (m === "destroyed") c.delete(p), w = !0;
      else {
        const f = c.get(p), u = e.getElementByKey(p);
        f ? f.domNode.value = u : (w = !0, c.set(p, { domNode: sn(u), selectedSignal: r(p) }));
      }
      w && (a.value = { nodeSelections: c });
    });
  }), se(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: w } of a.value.nodeSelections.values()) i.push(se(() => {
      const c = l.value;
      c && (w.value ? ua(c, s) : tc(c, s));
    }));
    return ae(...i);
  }));
} });
function fc(e, t) {
  return ae(e.registerCommand(Vi, (n) => {
    const r = Xt();
    if (!an(r)) return !1;
    n.preventDefault();
    const a = function(s) {
      const i = s.getNodes();
      if (ec(i, (f) => Cn(f) && f.canIndent() ? f : null).length > 0) return !0;
      const l = s.anchor, w = s.focus, c = w.isBefore(l) ? w : l, p = c.getNode(), m = oo(p);
      if (m.canIndent()) {
        const f = m.getKey();
        let u = $i();
        if (u.anchor.set(f, 0, "element"), u.focus.set(f, 0, "element"), u = Li(u), u.anchor.is(c)) return !0;
      }
      return !1;
    }(r) ? n.shiftKey ? Bi : Jr : ji;
    return e.dispatchCommand(a, void 0);
  }, Lo), e.registerCommand(Jr, () => {
    const n = typeof t == "number" ? t : t ? t.peek() : null;
    if (n == null) return !1;
    const r = Xt();
    if (!an(r)) return !1;
    const a = r.getNodes().map((s) => oo(s).getIndent());
    return Math.max(...a) + 1 >= n;
  }, _r));
}
qt({ build: (e, t, n) => $n(t), config: dn({ disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(e, t, n) {
  const { disabled: r, maxIndent: a } = n.getOutput();
  return se(() => {
    if (!r.value) return fc(e, a);
  });
} });
const gc = qt({ name: "@lexical/react/ReactProvider" });
function bc() {
  return oe().getTextContent();
}
function vc(e, t = !0) {
  if (e) return !1;
  let n = bc();
  return t && (n = n.trim()), n === "";
}
function xc(e) {
  if (!vc(e, !1)) return !1;
  const t = oe().getChildren(), n = t.length;
  if (n > 1) return !1;
  for (let r = 0; r < n; r++) {
    const a = t[r];
    if (zi(a)) return !1;
    if (ye(a)) {
      if (!Fi(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const w = s[r];
        if (!En(w)) return !1;
      }
    }
  }
  return !0;
}
function _a(e) {
  return () => xc(e);
}
function Ca(e) {
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
          const w = l.args;
          if (w) {
            const [c, p, m, f, u] = w;
            e.update(() => {
              const g = Xt();
              if (an(g)) {
                const x = g.anchor;
                let v = x.getNode(), N = 0, k = 0;
                if (En(v) && c >= 0 && p >= 0 && (N = c, k = c + p, g.setTextNodeRange(v, N, v, k)), N === k && m === "" || (g.insertRawText(m), v = x.getNode()), En(v)) {
                  N = f, k = f + u;
                  const T = v.getTextContentSize();
                  N = N > T ? T : N, k = k > T ? T : k, g.setTextNodeRange(v, N, v, k);
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
qt({ build: (e, t, n) => $n(t), config: dn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (e, t, n) => se(() => n.getOutput().disabled.value ? void 0 : Ca(e)) });
function yc(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
  r.append("code", e);
  for (const a of t) r.append("v", a);
  throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Vr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function Nc({ editor: e, ErrorBoundary: t }) {
  return function(n, r) {
    const [a, s] = M(() => n.getDecorators());
    return Vr(() => n.registerDecoratorListener((i) => {
      Qi(() => {
        s(i);
      });
    }), [n]), q(() => {
      s(n.getDecorators());
    }, [n]), B(() => {
      const i = [], l = Object.keys(a);
      for (let w = 0; w < l.length; w++) {
        const c = l[w], p = o(r, { onError: (f) => n._onError(f), children: o(_s, { fallback: null, children: a[c] }) }), m = n.getElementByKey(c);
        m !== null && i.push(tl(p, m, c));
      }
      return i;
    }, [r, a, n]);
  }(e, t);
}
function kc({ editor: e, ErrorBoundary: t }) {
  return function(n) {
    const r = nn.maybeFromEditor(n);
    if (r && r.hasExtensionByName(gc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) r.hasExtensionByName(a) && yc(320, a);
      return !0;
    }
    return !1;
  }(e) ? null : o(Nc, { editor: e, ErrorBoundary: t });
}
function uo(e) {
  return e.getEditorState().read(_a(e.isComposing()));
}
function _c({ contentEditable: e, placeholder: t = null, ErrorBoundary: n }) {
  const [r] = jt();
  return function(a) {
    Vr(() => ae(Zi(a), Ca(a)), [a]);
  }(r), d(wt, { children: [e, o(Cc, { content: t }), o(kc, { editor: r, ErrorBoundary: n })] });
}
function Cc({ content: e }) {
  const [t] = jt(), n = function(a) {
    const [s, i] = M(() => uo(a));
    return Vr(() => {
      function l() {
        const w = uo(a);
        i(w);
      }
      return l(), ae(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(t), r = Jl();
  return n ? typeof e == "function" ? e(r) : e : null;
}
function Ec({ defaultSelection: e }) {
  const [t] = jt();
  return q(() => {
    t.focus(() => {
      const n = document.activeElement, r = t.getRootElement();
      r === null || n !== null && r.contains(n) || r.focus({ preventScroll: !0 });
    }, { defaultSelection: e });
  }, [e, t]), null;
}
const Tc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function Sc({ onClear: e }) {
  const [t] = jt();
  return Tc(() => ba(t, e), [t, e]), null;
}
const Ea = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Kt : q;
function Rc({ editor: e, ariaActiveDescendant: t, ariaAutoComplete: n, ariaControls: r, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: w, ariaLabelledBy: c, ariaMultiline: p, ariaOwns: m, ariaRequired: f, autoCapitalize: u, className: g, id: x, role: v = "textbox", spellCheck: N = !0, style: k, tabIndex: T, "data-testid": V, ...$ }, P) {
  const [y, C] = M(e.isEditable()), _ = z((E) => {
    E && E.ownerDocument && E.ownerDocument.defaultView ? e.setRootElement(E) : e.setRootElement(null);
  }, [e]), S = B(() => /* @__PURE__ */ function(...E) {
    return (A) => {
      for (const U of E) typeof U == "function" ? U(A) : U != null && (U.current = A);
    };
  }(P, _), [_, P]);
  return Ea(() => (C(e.isEditable()), e.registerEditableListener((E) => {
    C(E);
  })), [e]), o("div", { "aria-activedescendant": y ? t : void 0, "aria-autocomplete": y ? n : "none", "aria-controls": y ? r : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": y && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": w, "aria-labelledby": c, "aria-multiline": p, "aria-owns": y ? m : void 0, "aria-readonly": !y || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: y, "data-testid": V, id: x, ref: S, role: v, spellCheck: N, style: k, tabIndex: T, ...$ });
}
const Dc = wn(Rc);
function mo(e) {
  return e.getEditorState().read(_a(e.isComposing()));
}
const Mc = wn(Oc);
function Oc(e, t) {
  const { placeholder: n, ...r } = e, [a] = jt();
  return d(wt, { children: [o(Dc, { editor: a, ...r, ref: t }), n != null && o(Ic, { editor: a, content: n })] });
}
function Ic({ content: e, editor: t }) {
  const n = function(i) {
    const [l, w] = M(() => mo(i));
    return Ea(() => {
      function c() {
        const p = mo(i);
        w(p);
      }
      return c(), ae(i.registerUpdateListener(() => {
        c();
      }), i.registerEditableListener(() => {
        c();
      }));
    }, [i]), l;
  }(t), [r, a] = M(t.isEditable());
  if (Kt(() => (a(t.isEditable()), t.registerEditableListener((i) => {
    a(i);
  })), [t]), !n) return null;
  let s = null;
  return typeof e == "function" ? s = e(r) : e !== null && (s = e), s === null ? null : o("div", { "aria-hidden": !0, children: s });
}
function Ac({
  placeholder: e,
  className: t,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ o(
    Mc,
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
const Ta = On(void 0);
function Pc({
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
  return /* @__PURE__ */ o(Ta.Provider, { value: i, children: s });
}
function Sa() {
  const e = Nr(Ta);
  if (!e)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return e;
}
function Vc() {
  const [e, t] = M(void 0), n = z(() => {
    t(void 0);
  }, []), r = B(() => {
    if (e === void 0)
      return;
    const { title: s, content: i } = e;
    return /* @__PURE__ */ o(ml, { open: !0, onOpenChange: n, children: /* @__PURE__ */ d(qo, { children: [
      /* @__PURE__ */ o(Jo, { children: /* @__PURE__ */ o(Wo, { children: s }) }),
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
  return [r, a];
}
function $c({
  children: e
}) {
  const [t] = jt(), [n, r] = M(t), [a, s] = M("paragraph"), [i, l] = Vc(), w = () => {
  };
  return q(() => n.registerCommand(
    Bo,
    (c, p) => (r(p), !1),
    _r
  ), [n]), /* @__PURE__ */ d(
    Pc,
    {
      activeEditor: n,
      $updateToolbar: w,
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
function Lc(e) {
  const [t] = jt(), { activeEditor: n } = Sa();
  q(() => n.registerCommand(
    Bo,
    () => {
      const r = Xt();
      return r && e(r), !1;
    },
    _r
  ), [t, e]), q(() => {
    n.getEditorState().read(() => {
      const r = Xt();
      r && e(r);
    });
  }, [n, e]);
}
const Ra = ie(
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
), Bc = b.forwardRef(({ className: e, variant: t, size: n, ...r }, a) => /* @__PURE__ */ o(
  Fo.Root,
  {
    ref: a,
    className: h(Ra({ variant: t, size: n, className: e })),
    ...r
  }
));
Bc.displayName = Fo.Root.displayName;
const Da = b.createContext({
  size: "default",
  variant: "default"
}), $r = b.forwardRef(({ className: e, variant: t, size: n, children: r, ...a }, s) => {
  const i = pt();
  return /* @__PURE__ */ o(
    Pn.Root,
    {
      ref: s,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
      ...a,
      dir: i,
      children: /* @__PURE__ */ o(
        Da.Provider,
        {
          value: { variant: t, size: n },
          children: r
        }
      )
    }
  );
});
$r.displayName = Pn.Root.displayName;
const rn = b.forwardRef(({ className: e, children: t, variant: n, size: r, ...a }, s) => {
  const i = b.useContext(Da);
  return /* @__PURE__ */ o(
    Pn.Item,
    {
      ref: s,
      className: h(
        Ra({
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
rn.displayName = Pn.Item.displayName;
const ho = [
  { format: "bold", icon: Ss, label: "Bold" },
  { format: "italic", icon: Rs, label: "Italic" },
  { format: "underline", icon: Ds, label: "Underline" },
  { format: "strikethrough", icon: Ms, label: "Strikethrough" }
];
function jc() {
  const { activeEditor: e } = Sa(), [t, n] = M([]), r = z((a) => {
    if (an(a) || el(a)) {
      const s = [];
      ho.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return Lc(r), /* @__PURE__ */ o(
    $r,
    {
      type: "multiple",
      value: t,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: ho.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ o(
        rn,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            e.dispatchCommand(Gi, a);
          },
          children: /* @__PURE__ */ o(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function zc({ onClear: e }) {
  const [t] = jt();
  q(() => {
    e && e(() => {
      t.dispatchCommand($o, void 0);
    });
  }, [t, e]);
}
function Fc({
  placeholder: e = "Start typing ...",
  autoFocus: t = !1,
  onClear: n
}) {
  const [, r] = M(void 0);
  return /* @__PURE__ */ d("div", { className: "tw-relative", children: [
    /* @__PURE__ */ o($c, { children: () => /* @__PURE__ */ o("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ o(jc, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw-relative", children: [
      /* @__PURE__ */ o(
        _c,
        {
          contentEditable: /* @__PURE__ */ o("div", { ref: (s) => {
            s !== void 0 && r(s);
          }, children: /* @__PURE__ */ o(Ac, { placeholder: e }) }),
          ErrorBoundary: Xl
        }
      ),
      t && /* @__PURE__ */ o(Ec, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ o(zc, { onClear: n }),
      /* @__PURE__ */ o(Sc, {})
    ] })
  ] });
}
const Gc = {
  namespace: "commentEditor",
  theme: Or,
  nodes: Ir,
  onError: (e) => {
    console.error(e);
  }
};
function Sn({
  editorState: e,
  editorSerializedState: t,
  onChange: n,
  onSerializedChange: r,
  placeholder: a = "Start typing…",
  autoFocus: s = !1,
  onClear: i
}) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow", children: /* @__PURE__ */ o(
    zl,
    {
      initialConfig: {
        ...Gc,
        ...e ? { editorState: e } : {},
        ...t ? { editorState: JSON.stringify(t) } : {}
      },
      children: /* @__PURE__ */ d(St, { children: [
        /* @__PURE__ */ o(Fc, { placeholder: a, autoFocus: s, onClear: i }),
        /* @__PURE__ */ o(
          Gl,
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
function Uc(e, t) {
  const n = Ki(t) ? t.body.childNodes : t.childNodes;
  let r = [];
  const a = [];
  for (const s of n) if (!Oa.has(s.nodeName)) {
    const i = Ia(s, e, a, !1);
    i !== null && (r = r.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof jo && i.insertAfter(zo());
    for (const i of s) {
      const l = i.getChildren();
      for (const w of l) i.insertBefore(w);
      i.remove();
    }
  }(a), r;
}
function Hc(e, t) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), r = oe().getChildren();
  for (let a = 0; a < r.length; a++)
    Ma(e, r[a], n, t);
  return n.innerHTML;
}
function Ma(e, t, n, r = null) {
  let a = r === null || t.isSelected(r);
  const s = ye(t) && t.excludeFromCopy("html");
  let i = t;
  r !== null && En(t) && (i = Wl(r, t, "clone"));
  const l = ye(i) ? i.getChildren() : [], w = Ui(e, i.getType());
  let c;
  c = w && w.exportDOM !== void 0 ? w.exportDOM(e, i) : i.exportDOM(e);
  const { element: p, after: m } = c;
  if (!p) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], x = Ma(e, g, f, r);
    !a && ye(t) && x && t.extractWithChild(g, r, "html") && (a = !0);
  }
  if (a && !s) {
    if ((Hi(p) || Wr(p)) && p.append(f), n.append(p), m) {
      const u = m.call(i, p);
      u && (Wr(p) ? p.replaceChildren(u) : p.replaceWith(u));
    }
  } else n.append(f);
  return a;
}
const Oa = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ia(e, t, n, r, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (Oa.has(e.nodeName)) return i;
  let l = null;
  const w = function(g, x) {
    const { nodeName: v } = g, N = x._htmlConversions.get(v.toLowerCase());
    let k = null;
    if (N !== void 0) for (const T of N) {
      const V = T(g);
      V !== null && (k === null || (k.priority || 0) <= (V.priority || 0)) && (k = V);
    }
    return k !== null ? k.conversion : null;
  }(e, t), c = w ? w(e) : null;
  let p = null;
  if (c !== null) {
    p = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(e.nodeName, c.forChild);
  }
  const m = e.childNodes;
  let f = [];
  const u = (l == null || !Xi(l)) && (l != null && Cn(l) || r);
  for (let g = 0; g < m.length; g++) f.push(...Ia(m[g], t, n, u, new Map(a), l));
  return p != null && (f = p(f)), Zr(e) && (f = Kc(e, f, u ? () => {
    const g = new jo();
    return n.push(g), g;
  } : An)), l == null ? f.length > 0 ? i = i.concat(f) : Zr(e) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Qr(g.nextSibling) && Qr(g.previousSibling);
  }(e) && (i = i.concat(zo())) : ye(l) && l.append(...f), i;
}
function Kc(e, t, n) {
  const r = e.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (Cn(l)) r && !l.getFormat() && l.setFormat(r), a.push(l);
    else if (s.push(l), i === t.length - 1 || i < t.length - 1 && Cn(t[i + 1])) {
      const w = n();
      w.setFormat(r), w.append(...s), a.push(w), s = [];
    }
  }
  return a;
}
function Aa(e) {
  const t = e.querySelector('[contenteditable="true"]');
  if (!t) return !1;
  t.focus();
  const n = window.getSelection(), r = document.createRange();
  return r.selectNodeContents(t), r.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(r), !0;
}
function Tt(e) {
  var t;
  return (t = e == null ? void 0 : e.root) != null && t.children ? e.root.children.some((n) => n != null && n.children ? n.children.some((r) => (r == null ? void 0 : r.text) && r.text.trim().length > 0) : !1) : !1;
}
function Xc(e) {
  if (!e || e.trim() === "")
    throw new Error("Input HTML is empty");
  const t = e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi, "<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi, "$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi, "$1"), n = Go({
    namespace: "EditorUtils",
    theme: Or,
    nodes: Ir,
    onError: (a) => {
      console.error(a);
    }
  });
  let r;
  if (n.update(
    () => {
      const s = new DOMParser().parseFromString(t, "text/html"), i = Uc(n, s);
      oe().clear(), Yi(i);
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
function Rn(e) {
  const t = Go({
    namespace: "EditorUtils",
    theme: Or,
    nodes: Ir,
    onError: (a) => {
      console.error(a);
    }
  }), n = t.parseEditorState(JSON.stringify(e));
  t.setEditorState(n);
  let r = "";
  return t.getEditorState().read(() => {
    r = Hc(t);
  }), r = r.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<s>(.*?)<\/s>/g, "<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi, "<br/>"), r;
}
function Lr(e) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key) ? (e.stopPropagation(), !0) : !1;
}
const Yc = {
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
function Zn(e, t) {
  return e === "" ? t["%commentEditor_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%commentEditor_team%"] ?? "Team" : e;
}
function Ip({
  assignableUsers: e,
  onSave: t,
  onClose: n,
  localizedStrings: r
}) {
  const [a, s] = M(Yc), [i, l] = M(void 0), [w, c] = M(!1), p = Z(void 0), m = Z(null);
  q(() => {
    let N = !0;
    const k = m.current;
    if (!k) return;
    const T = setTimeout(() => {
      N && Aa(k);
    }, 300);
    return () => {
      N = !1, clearTimeout(T);
    };
  }, []);
  const f = z(() => {
    if (!Tt(a)) return;
    const N = Rn(a);
    t(N, i);
  }, [a, t, i]), u = r["%commentEditor_placeholder%"] ?? "Type your comment here...", g = r["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = r["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = r["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ o("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ o(St, { children: /* @__PURE__ */ d(Lt, { children: [
          /* @__PURE__ */ o(Ut, { asChild: !0, children: /* @__PURE__ */ o(L, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ o(je, {}) }) }),
          /* @__PURE__ */ o(Rt, { children: /* @__PURE__ */ o("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ o(St, { children: /* @__PURE__ */ d(Lt, { children: [
          /* @__PURE__ */ o(Ut, { asChild: !0, children: /* @__PURE__ */ o(
            L,
            {
              onClick: f,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !Tt(a),
              children: /* @__PURE__ */ o(Mt, {})
            }
          ) }),
          /* @__PURE__ */ o(Rt, { children: /* @__PURE__ */ o("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ d(le, { open: w, onOpenChange: c, children: [
      /* @__PURE__ */ o(ce, { asChild: !0, children: /* @__PURE__ */ d(
        L,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: e.length === 0,
          children: [
            /* @__PURE__ */ o(_o, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ o("span", { children: Zn(i !== void 0 ? i : "", r) })
          ]
        }
      ) }),
      /* @__PURE__ */ o(
        Zt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (N) => {
            N.key === "Escape" && (N.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ o(Jt, { children: /* @__PURE__ */ o(Wt, { children: e.map((N) => /* @__PURE__ */ o(
            Bt,
            {
              onSelect: () => {
                l(N === "" ? void 0 : N), c(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ o("span", { children: Zn(N, r) })
            },
            N || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: m,
        role: "textbox",
        tabIndex: -1,
        className: "tw-outline-none",
        onKeyDownCapture: (N) => {
          N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), n()) : N.key === "Enter" && N.shiftKey && (N.preventDefault(), N.stopPropagation(), Tt(a) && f());
        },
        onKeyDown: (N) => {
          Lr(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
        },
        children: /* @__PURE__ */ o(
          Sn,
          {
            editorSerializedState: a,
            onSerializedChange: (N) => s(N),
            placeholder: u,
            onClear: (N) => {
              p.current = N;
            }
          }
        )
      }
    )
  ] });
}
const Ap = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), Pp = [
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
], qc = ["input", "select", "textarea", "button"], Jc = ["button", "textbox"], Wc = ({
  options: e,
  onFocusChange: t,
  onOptionSelect: n,
  onCharacterPress: r
}) => {
  const a = Z(null), [s, i] = M(void 0), [l, w] = M(void 0), c = z(
    (u) => {
      i(u);
      const g = e.find((v) => v.id === u);
      g && (t == null || t(g));
      const x = document.getElementById(u);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [t, e]
  ), p = z(
    (u) => {
      const g = e.find((x) => x.id === u);
      g && (w((x) => x === u ? void 0 : u), n == null || n(g));
    },
    [n, e]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || qc.includes(g)) return !0;
    const x = u.getAttribute("role");
    if (x && Jc.includes(x)) return !0;
    const v = u.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, f = z(
    (u) => {
      var y;
      const g = u.target, x = (C) => C ? document.getElementById(C) : void 0, v = x(l), N = x(s);
      if (!!(v && g && v.contains(g) && g !== v) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const C = e.find((_) => _.id === l);
            C && c(C.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!v) return;
          const C = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const _ = C.findIndex((E) => E === g);
          if (_ === -1) return;
          let S;
          u.key === "ArrowDown" ? S = Math.min(_ + 1, C.length - 1) : S = Math.max(_ - 1, 0), S !== _ && (u.preventDefault(), u.stopPropagation(), (y = C[S]) == null || y.focus());
          return;
        }
        return;
      }
      const V = e.findIndex((C) => C.id === s);
      let $ = V;
      switch (u.key) {
        case "ArrowDown":
          $ = Math.min(V + 1, e.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          $ = Math.max(V - 1, 0), u.preventDefault();
          break;
        case "Home":
          $ = 0, u.preventDefault();
          break;
        case "End":
          $ = e.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const C = N;
          if (C) {
            const _ = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), E = _ ?? S;
            if (E) {
              u.preventDefault(), E.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (m(g) || (r == null || r(u.key), u.preventDefault()));
          return;
      }
      const P = e[$];
      P && c(P.id);
    },
    [e, c, s, l, p, r]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: f,
    /** Focus an option by its ID */
    focusOption: c
  };
}, Zc = ie(
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
), Ve = b.forwardRef(
  ({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ o("div", { ref: r, className: h("pr-twp", Zc({ variant: t }), e), ...n })
);
Ve.displayName = "Badge";
const Pa = b.forwardRef(
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
Pa.displayName = "Card";
const Qc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
Qc.displayName = "CardHeader";
const tw = b.forwardRef(
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
tw.displayName = "CardTitle";
const ew = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
ew.displayName = "CardDescription";
const Va = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
Va.displayName = "CardContent";
const nw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
nw.displayName = "CardFooter";
const $e = b.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, a) => /* @__PURE__ */ o(
  Uo.Root,
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
$e.displayName = Uo.Root.displayName;
const $a = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Fe.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      e
    ),
    ...t
  }
));
$a.displayName = Fe.Root.displayName;
const rw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Fe.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", e),
    ...t
  }
));
rw.displayName = Fe.Image.displayName;
const La = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Fe.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      e
    ),
    ...t
  }
));
La.displayName = Fe.Fallback.displayName;
const Br = On(void 0);
function It() {
  const e = Nr(Br);
  if (!e)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return e;
}
const Qt = ie("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), He = rt.Trigger, Ba = rt.Group, ow = rt.Portal, aw = rt.Sub, sw = rt.RadioGroup;
function Se({ variant: e = "default", ...t }) {
  const n = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ o(Br.Provider, { value: n, children: /* @__PURE__ */ o(rt.Root, { ...t }) });
}
const ja = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => {
  const s = It();
  return /* @__PURE__ */ d(
    rt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        t && "tw-pl-8",
        e,
        Qt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ o(Ie, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ja.displayName = rt.SubTrigger.displayName;
const za = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  rt.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
za.displayName = rt.SubContent.displayName;
const we = b.forwardRef(({ className: e, sideOffset: t = 4, children: n, ...r }, a) => {
  const s = pt();
  return /* @__PURE__ */ o(rt.Portal, { children: /* @__PURE__ */ o(
    rt.Content,
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
we.displayName = rt.Content.displayName;
const Dn = b.forwardRef(({ className: e, inset: t, ...n }, r) => {
  const a = pt(), s = It();
  return /* @__PURE__ */ o(
    rt.Item,
    {
      ref: r,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        e,
        Qt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Dn.displayName = rt.Item.displayName;
const Ht = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => {
  const s = It();
  return /* @__PURE__ */ d(
    rt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Qt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(Mt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
Ht.displayName = rt.CheckboxItem.displayName;
const Fa = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = It();
  return /* @__PURE__ */ d(
    rt.RadioItem,
    {
      ref: r,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Qt({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(In, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
Fa.displayName = rt.RadioItem.displayName;
const mn = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  rt.Label,
  {
    ref: r,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
mn.displayName = rt.Label.displayName;
const Ke = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  rt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Ke.displayName = rt.Separator.displayName;
function iw({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
iw.displayName = "DropdownMenuShortcut";
function _n(e, t) {
  return e === "" ? t["%comment_assign_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%comment_assign_team%"] ?? "Team" : e;
}
function fo({
  comment: e,
  isReply: t = !1,
  localizedStrings: n,
  isThreadExpanded: r = !1,
  threadStatus: a = "Unspecified",
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  onEditingChange: w,
  canEditOrDelete: c = !1,
  canUserResolveThread: p = !1
}) {
  const [m, f] = M(!1), [u, g] = M(), x = Z(null);
  q(() => {
    if (!m) return;
    let y = !0;
    const C = x.current;
    if (!C) return;
    const _ = setTimeout(() => {
      y && Aa(C);
    }, 300);
    return () => {
      y = !1, clearTimeout(_);
    };
  }, [m]);
  const v = z(() => {
    f(!1), g(void 0), w == null || w(!1);
  }, [w]), N = z(async () => {
    if (!u || !i) return;
    await i(
      e.id,
      Rn(u)
    ) && (f(!1), g(void 0), w == null || w(!1));
  }, [u, i, e.id, w]), k = B(() => {
    const y = new Date(e.date), C = ci(
      y,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), _ = y.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ve(n["%comment_dateAtTime%"], {
      date: C,
      time: _
    });
  }, [e.date, n]), T = B(() => e.user, [e.user]), V = B(
    () => e.user.split(" ").map((y) => y[0]).join("").toUpperCase().slice(0, 2),
    [e.user]
  ), $ = B(
    () => wi(qr(e.contents)),
    [e.contents]
  ), P = B(() => {
    if (r && c)
      return /* @__PURE__ */ d(wt, { children: [
        !di(e.contents) && /* @__PURE__ */ d(
          Dn,
          {
            onClick: () => {
              f(!0), g(Xc(qr(e.contents))), w == null || w(!0);
            },
            children: [
              /* @__PURE__ */ o(Os, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ d(
          Dn,
          {
            onClick: async () => {
              l && await l(e.id);
            },
            children: [
              /* @__PURE__ */ o(Is, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    c,
    r,
    n,
    e.contents,
    e.id,
    l,
    w
  ]);
  return /* @__PURE__ */ d(
    "div",
    {
      className: h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": t
      }),
      children: [
        /* @__PURE__ */ o($a, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ o(La, { className: "tw-text-xs tw-font-medium", children: V }) }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ o("p", { className: "tw-text-sm tw-font-medium", children: T }),
            /* @__PURE__ */ o("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: k }),
            /* @__PURE__ */ o("div", { className: "tw-flex-1" }),
            t && e.assignedUser !== void 0 && /* @__PURE__ */ d(Ve, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              _n(e.assignedUser, n)
            ] })
          ] }),
          m && /* @__PURE__ */ d(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: x,
              onKeyDownCapture: (y) => {
                y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), v()) : y.key === "Enter" && y.shiftKey && (y.preventDefault(), y.stopPropagation(), Tt(u) && N());
              },
              onKeyDown: (y) => {
                Lr(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
              },
              children: [
                /* @__PURE__ */ o(
                  Sn,
                  {
                    editorSerializedState: u,
                    onSerializedChange: (y) => g(y)
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ o(
                    L,
                    {
                      size: "icon",
                      onClick: v,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ o(je, {})
                    }
                  ),
                  /* @__PURE__ */ o(
                    L,
                    {
                      size: "icon",
                      onClick: N,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !Tt(u),
                      children: /* @__PURE__ */ o(Co, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !m && /* @__PURE__ */ d(wt, { children: [
            e.status === "Resolved" && /* @__PURE__ */ o("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_resolved%"] }),
            e.status === "Todo" && t && /* @__PURE__ */ o("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_todo%"] }),
            /* @__PURE__ */ o(
              "div",
              {
                className: h(
                  "tw-prose tw-prose-quoteless tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",
                  // tw-prose has a max width defined on it, that we choose to override
                  "tw-max-w-none",
                  {
                    "tw-line-clamp-3": !r
                  }
                ),
                dangerouslySetInnerHTML: { __html: $ }
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
            onClick: (y) => {
              y.stopPropagation(), s({ threadId: e.thread, status: "Resolved" });
            },
            children: /* @__PURE__ */ o(Mt, {})
          }
        ),
        P && /* @__PURE__ */ d(Se, { children: [
          /* @__PURE__ */ o(He, { asChild: !0, children: /* @__PURE__ */ o(L, { variant: "ghost", size: "icon", children: /* @__PURE__ */ o(Eo, {}) }) }),
          /* @__PURE__ */ o(we, { align: "end", children: P })
        ] })
      ]
    }
  );
}
const go = {
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
function lw({
  classNameForVerseText: e,
  comments: t,
  localizedStrings: n,
  isSelected: r = !1,
  verseRef: a,
  assignedUser: s,
  currentUser: i,
  handleSelectThread: l,
  threadId: w,
  threadStatus: c,
  handleAddCommentToThread: p,
  handleUpdateComment: m,
  handleDeleteComment: f,
  handleReadStatusChange: u,
  assignableUsers: g,
  canUserAddCommentToThread: x,
  canUserAssignThreadCallback: v,
  canUserResolveThreadCallback: N,
  canUserEditOrDeleteCommentCallback: k,
  isRead: T = !1,
  autoReadDelay: V = 5
}) {
  const [$, P] = M(go), [y, C] = M(!1), [_, S] = M(!1), [E, A] = M(!1), [U, I] = M(!1), [G, D] = M(!1), [F, ct] = M(void 0), [ft, zt] = M(!1), [ut, j] = M(!1), [et, gt] = M(T), [yt, kt] = M(!1), de = Z(void 0), [hn, Ye] = M(/* @__PURE__ */ new Map());
  q(() => {
    let R = !0;
    if (!r) {
      zt(!1), j(!1), Ye(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ee = v ? await v(w) : !1;
      if (!R) return;
      const gn = N ? await N(w) : !1;
      R && (zt(ee), j(gn));
    })(), () => {
      R = !1;
    };
  }, [r, w, v, N]);
  const te = B(() => t.filter((R) => !R.deleted), [t]);
  q(() => {
    let R = !0;
    if (!r || !k) {
      Ye(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const ee = /* @__PURE__ */ new Map();
      await Promise.all(
        te.map(async (gn) => {
          const xs = await k(gn.id);
          R && ee.set(gn.id, xs);
        })
      ), R && Ye(ee);
    })(), () => {
      R = !1;
    };
  }, [r, te, k]);
  const Ct = B(() => te[0], [te]), fn = Z(null), Re = Z(void 0), pe = z(() => {
    var R;
    (R = Re.current) == null || R.call(Re), P(go);
  }, []), O = z(() => {
    const R = !et;
    gt(R), kt(!R), u == null || u(w, R);
  }, [et, u, w]);
  q(() => {
    const R = fn.current;
    if (!R)
      return;
    const At = () => {
      S(R.scrollWidth > R.clientWidth);
    };
    return At(), window.addEventListener("resize", At), () => window.removeEventListener("resize", At);
  }, [Ct == null ? void 0 : Ct.verse]), q(() => {
    A(!1);
  }, [r]), q(() => {
    if (r && !et && !yt) {
      const R = setTimeout(() => {
        gt(!0), u == null || u(w, !0);
      }, V * 1e3);
      return de.current = R, () => clearTimeout(R);
    }
    de.current && (clearTimeout(de.current), de.current = void 0);
  }, [r, et, yt, V, w, u]);
  const H = B(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), st = B(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const R = _n(s, n);
    return ve(n["%comment_assigned_to%"], {
      assignedUser: R
    });
  }, [s, n]), lt = B(() => te.slice(1), [te]), nt = B(() => lt.length ?? 0, [lt.length]), Ft = B(() => nt > 0, [nt]), Et = B(() => E || nt <= 2 ? lt : lt.slice(-2), [lt, nt, E]), ue = B(() => E || nt <= 2 ? 0 : nt - 2, [nt, E]), me = B(
    () => nt === 1 ? H.singleReply : ve(H.multipleReplies, { count: nt }),
    [nt, H]
  ), bs = B(
    () => ue === 1 ? H.singleReply : ve(H.multipleReplies, { count: ue }),
    [ue, H]
  ), Ur = z(async () => {
    const R = Tt($) ? Rn($) : void 0;
    if (F !== void 0) {
      await p({
        threadId: w,
        contents: R,
        assignedUser: F
      }) && (ct(void 0), R && pe());
      return;
    }
    R && await p({ threadId: w, contents: R }) && pe();
  }, [pe, $, p, F, w]), vs = z(
    async (R) => {
      const At = Tt($) ? Rn($) : void 0, ee = await p({
        ...R,
        contents: At,
        assignedUser: F ?? R.assignedUser
      });
      return ee && At && pe(), ee && F !== void 0 && ct(void 0), ee;
    },
    [pe, $, p, F]
  );
  return /* @__PURE__ */ o(
    Pa,
    {
      role: "option",
      "aria-selected": r,
      id: w,
      className: h(
        "tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        { "tw-cursor-pointer hover:tw-shadow-md": !r },
        {
          "tw-bg-primary-foreground": !r && c !== "Resolved" && et,
          "tw-bg-background": r && c !== "Resolved" && et,
          "tw-bg-muted": c === "Resolved",
          "tw-bg-blue-50": !et && !r && c !== "Resolved"
        }
      ),
      onClick: () => {
        l(w);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ d(Va, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "icon",
                onClick: (R) => {
                  R.stopPropagation(), O();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": et ? "Mark as unread" : "Mark as read",
                children: et ? /* @__PURE__ */ o(As, {}) : /* @__PURE__ */ o(Ps, {})
              }
            ),
            st && /* @__PURE__ */ o(Ve, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: st })
          ] }),
          /* @__PURE__ */ d("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: [
            /* @__PURE__ */ d(
              "p",
              {
                ref: fn,
                className: h(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": y
                  },
                  { "tw-whitespace-nowrap": !y }
                ),
                children: [
                  a,
                  /* @__PURE__ */ d("span", { className: e, children: [
                    Ct.contextBefore,
                    /* @__PURE__ */ o("span", { className: "tw-font-bold", children: Ct.selectedText }),
                    Ct.contextAfter
                  ] })
                ]
              }
            ),
            _ && /* @__PURE__ */ o(
              L,
              {
                variant: "ghost",
                size: "icon",
                onClick: (R) => {
                  R.stopPropagation(), C(!y);
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": y ? "Collapse text" : "Expand text",
                children: y ? /* @__PURE__ */ o(or, {}) : /* @__PURE__ */ o(_e, {})
              }
            )
          ] }),
          /* @__PURE__ */ o(
            fo,
            {
              comment: Ct,
              localizedStrings: n,
              isThreadExpanded: r,
              threadStatus: c,
              handleAddCommentToThread: vs,
              handleUpdateComment: m,
              handleDeleteComment: f,
              onEditingChange: I,
              canEditOrDelete: hn.get(Ct.id) ?? !1,
              canUserResolveThread: ut
            }
          )
        ] }),
        /* @__PURE__ */ d(wt, { children: [
          Ft && !r && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ o("div", { className: "tw-w-8", children: /* @__PURE__ */ o($e, {}) }),
            /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: me })
          ] }),
          !r && Tt($) && /* @__PURE__ */ o(
            Sn,
            {
              editorSerializedState: $,
              onSerializedChange: (R) => P(R),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          r && /* @__PURE__ */ d(wt, { children: [
            ue > 0 && /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (R) => {
                  R.stopPropagation(), A(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (R) => {
                  (R.key === "Enter" || R.key === " ") && (R.preventDefault(), R.stopPropagation(), A(!0));
                },
                children: [
                  /* @__PURE__ */ o("div", { className: "tw-w-8", children: /* @__PURE__ */ o($e, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: bs }),
                    E ? /* @__PURE__ */ o(or, {}) : /* @__PURE__ */ o(_e, {})
                  ] })
                ]
              }
            ),
            Et.map((R) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
              fo,
              {
                comment: R,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: r,
                handleUpdateComment: m,
                handleDeleteComment: f,
                onEditingChange: I,
                canEditOrDelete: hn.get(R.id) ?? !1
              }
            ) }, R.id)),
            x !== !1 && (!U || Tt($)) && /* @__PURE__ */ d(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (R) => R.stopPropagation(),
                onKeyDownCapture: (R) => {
                  R.key === "Enter" && R.shiftKey && (R.preventDefault(), R.stopPropagation(), (Tt($) || F !== void 0) && Ur());
                },
                onKeyDown: (R) => {
                  Lr(R), (R.key === "Enter" || R.key === " ") && R.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ o(
                    Sn,
                    {
                      editorSerializedState: $,
                      onSerializedChange: (R) => P(R),
                      placeholder: c === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (R) => {
                        Re.current = R;
                      }
                    }
                  ),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    F !== void 0 && /* @__PURE__ */ o("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ve(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: _n(
                          F,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ d(le, { open: G, onOpenChange: D, children: [
                      /* @__PURE__ */ o(ce, { asChild: !0, children: /* @__PURE__ */ o(
                        L,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !ft || !g || g.length === 0 || !g.includes(i),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ o(_o, {})
                        }
                      ) }),
                      /* @__PURE__ */ o(
                        Zt,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (R) => {
                            R.key === "Escape" && (R.stopPropagation(), D(!1));
                          },
                          children: /* @__PURE__ */ o(Jt, { children: /* @__PURE__ */ o(Wt, { children: g == null ? void 0 : g.map((R) => /* @__PURE__ */ o(
                            Bt,
                            {
                              onSelect: () => {
                                ct(R !== s ? R : void 0), D(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ o("span", { children: _n(R, n) })
                            },
                            R || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ o(
                      L,
                      {
                        size: "icon",
                        onClick: Ur,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !Tt($) && F === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ o(Co, {})
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
function Vp({
  className: e = "",
  classNameForVerseText: t,
  threads: n,
  currentUser: r,
  localizedStrings: a,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  handleReadStatusChange: w,
  assignableUsers: c,
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: m,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: x
}) {
  const [v, N] = M(
    void 0
  ), k = g ?? v;
  q(() => {
    g !== void 0 && N(g);
  }, [g]);
  const T = n.filter(
    (E) => E.comments.some((A) => !A.deleted)
  ), V = T.map((E) => ({
    id: E.id
  })), $ = z(
    (E) => {
      N(E.id), x == null || x(E.id);
    },
    [x]
  ), P = z(
    (E) => {
      N(E), x == null || x(E);
    },
    [x]
  ), { listboxRef: y, activeId: C, handleKeyDown: _ } = Wc({
    options: V,
    onOptionSelect: $
  }), S = z(
    (E) => {
      E.key === "Escape" ? (N(void 0), x == null || x(void 0), E.preventDefault(), E.stopPropagation()) : _(E);
    },
    [_, x]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: y,
      "aria-activedescendant": C ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        e
      ),
      onKeyDown: S,
      children: T.map((E) => /* @__PURE__ */ o(
        "div",
        {
          id: E.id,
          className: h({
            "tw-opacity-60": E.status === "Resolved"
          }),
          children: /* @__PURE__ */ o(
            lw,
            {
              classNameForVerseText: t,
              comments: E.comments,
              localizedStrings: a,
              verseRef: E.verseRef,
              handleSelectThread: P,
              threadId: E.id,
              isRead: E.isRead,
              isSelected: k === E.id,
              currentUser: r,
              assignedUser: E.assignedUser,
              threadStatus: E.status,
              handleAddCommentToThread: s,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: w,
              assignableUsers: c,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: u
            }
          )
        },
        E.id
      ))
    }
  );
}
function cw({ table: e }) {
  return /* @__PURE__ */ d(Se, { children: [
    /* @__PURE__ */ o(nl, { asChild: !0, children: /* @__PURE__ */ d(L, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ o(Vs, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(we, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ o(mn, { children: "Toggle columns" }),
      /* @__PURE__ */ o(Ke, {}),
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
const Le = it.Root, ww = it.Group, Be = it.Value, dw = ie(
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
), Ee = b.forwardRef(({ className: e, children: t, size: n, ...r }, a) => {
  const s = pt();
  return /* @__PURE__ */ d(
    it.Trigger,
    {
      className: h(dw({ size: n, className: e })),
      ref: a,
      ...r,
      dir: s,
      children: [
        t,
        /* @__PURE__ */ o(it.Icon, { asChild: !0, children: /* @__PURE__ */ o(_e, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Ee.displayName = it.Trigger.displayName;
const Ga = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  it.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ o(or, { className: "tw-h-4 tw-w-4" })
  }
));
Ga.displayName = it.ScrollUpButton.displayName;
const Ua = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  it.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ o(_e, { className: "tw-h-4 tw-w-4" })
  }
));
Ua.displayName = it.ScrollDownButton.displayName;
const Te = b.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, a) => {
  const s = pt();
  return /* @__PURE__ */ o(it.Portal, { children: /* @__PURE__ */ d(
    it.Content,
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
        /* @__PURE__ */ o(Ga, {}),
        /* @__PURE__ */ o(
          it.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ o("div", { dir: s, children: t })
          }
        ),
        /* @__PURE__ */ o(Ua, {})
      ]
    }
  ) });
});
Te.displayName = it.Content.displayName;
const pw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  it.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
pw.displayName = it.Label.displayName;
const _t = b.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ d(
  it.Item,
  {
    ref: r,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(it.ItemIndicator, { children: /* @__PURE__ */ o(Mt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ o(it.ItemText, { children: t })
    ]
  }
));
_t.displayName = it.Item.displayName;
const uw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  it.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
uw.displayName = it.Separator.displayName;
function mw({ table: e }) {
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
        Le,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ o(Ee, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ o(Be, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ o(Te, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ o(_t, { value: `${t}`, children: t }, t)) })
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
            /* @__PURE__ */ o($s, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ o(Ls, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ o(Bs, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ o(js, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const bo = `
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
function hw(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function ln(e, t) {
  const n = t ? `${bo}, ${t}` : bo;
  return Array.from(e.querySelectorAll(n)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && hw(r)
  );
}
const Ln = b.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        ln(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const w = new MutationObserver(() => {
      l();
    });
    return w.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      w.disconnect();
    };
  }, []);
  const s = (i) => {
    const { current: l } = a;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), ln(l)[0].focus();
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
Ln.displayName = "Table";
const Bn = b.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ o(
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
Bn.displayName = "TableHeader";
const jn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", e), ...t }));
jn.displayName = "TableBody";
const fw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
fw.displayName = "TableFooter";
function gw(e) {
  b.useEffect(() => {
    const t = e.current;
    if (!t) return;
    const n = (r) => {
      if (t.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const a = e.current ? ln(e.current) : [], s = a.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function bw(e, t, n) {
  let r;
  return n === "ArrowLeft" && t > 0 ? r = e[t - 1] : n === "ArrowRight" && t < e.length - 1 && (r = e[t + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function vw(e, t, n) {
  let r;
  return n === "ArrowDown" && t < e.length - 1 ? r = e[t + 1] : n === "ArrowUp" && t > 0 && (r = e[t - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
const Gt = b.forwardRef(({ className: e, onKeyDown: t, onSelect: n, setFocusAlsoRunsSelect: r = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), gw(i);
  const l = b.useMemo(
    () => i.current ? ln(i.current) : [],
    [i]
  ), w = b.useCallback(
    (p) => {
      const { current: m } = i;
      if (!m || !m.parentElement) return;
      const f = m.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ln(f).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), vw(u, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), bw(l, x, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = m.closest("table");
        v && v.focus();
      }
      t == null || t(p);
    },
    [i, l, t]
  ), c = b.useCallback(
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
      onKeyDown: w,
      onFocus: c,
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
Gt.displayName = "TableRow";
const cn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
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
cn.displayName = "TableHead";
const ke = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
ke.displayName = "TableCell";
const xw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
xw.displayName = "TableCaption";
function gr({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", e),
      ...t
    }
  );
}
function yw({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: w = !1,
  noResultsMessage: c
}) {
  var P;
  const [p, m] = M([]), [f, u] = M([]), [g, x] = M({}), [v, N] = M({}), k = B(() => t ?? [], [t]), T = Ho({
    data: k,
    columns: e,
    getCoreRowModel: Xo(),
    ...n && { getPaginationRowModel: ol() },
    onSortingChange: m,
    getSortedRowModel: Ko(),
    onColumnFiltersChange: u,
    getFilteredRowModel: rl(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: N,
    state: {
      sorting: p,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: v
    }
  }), V = T.getVisibleFlatColumns();
  let $;
  return w ? $ = Array.from({ length: 10 }).map((_, S) => `skeleton-row-${S}`).map((_) => /* @__PURE__ */ o(Gt, { children: /* @__PURE__ */ o(ke, { colSpan: V.length ?? e.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ o("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ o(gr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, _)) : ((P = T.getRowModel().rows) == null ? void 0 : P.length) > 0 ? $ = T.getRowModel().rows.map((y) => /* @__PURE__ */ o(
    Gt,
    {
      onClick: () => i(y, T),
      "data-state": y.getIsSelected() && "selected",
      children: y.getVisibleCells().map((C) => /* @__PURE__ */ o(ke, { children: tn(C.column.columnDef.cell, C.getContext()) }, C.id))
    },
    y.id
  )) : $ = /* @__PURE__ */ o(Gt, { children: /* @__PURE__ */ o(ke, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ o(cw, { table: T }),
    /* @__PURE__ */ d(Ln, { stickyHeader: s, children: [
      /* @__PURE__ */ o(Bn, { stickyHeader: s, children: T.getHeaderGroups().map((y) => /* @__PURE__ */ o(Gt, { children: y.headers.map((C) => /* @__PURE__ */ o(cn, { children: C.isPlaceholder ? void 0 : tn(C.column.columnDef.header, C.getContext()) }, C.id)) }, y.id)) }),
      /* @__PURE__ */ o(jn, { children: $ })
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ o(
        L,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.previousPage(),
          disabled: !T.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o(
        L,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.nextPage(),
          disabled: !T.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ o(mw, { table: T })
  ] });
}
function $p({
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
      className: h(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ o(il, { options: s, children: t })
    }
  );
}
const Nw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), vo = (e, t) => e[t] ?? t;
function kw({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  id: r
}) {
  const a = vo(n, "%webView_error_dump_header%"), s = vo(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ o(L, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ o(To, {}) })
        ] }),
        /* @__PURE__ */ o("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ o("pre", { className: "tw-text-xs", children: e }) })
      ]
    }
  );
}
const Lp = Object.freeze([
  ...Nw,
  "%webView_error_dump_copied_message%"
]);
function Bp({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  children: r,
  className: a,
  id: s
}) {
  const [i, l] = M(!1), w = () => {
    l(!0), t && t();
  };
  return /* @__PURE__ */ d(le, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ o(ce, { asChild: !0, children: r }),
    /* @__PURE__ */ d(Zt, { id: s, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ o(dt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ o(
        kw,
        {
          errorDetails: e,
          handleCopyNotify: w,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var _w = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(_w || {});
function jp({ id: e, label: t, groups: n }) {
  const [r, a] = M(
    Object.fromEntries(
      n.map(
        (c, p) => c.itemType === 0 ? [p, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = M({}), l = (c, p) => {
    const m = !r[c][p];
    a((u) => (u[c][p] = m, { ...u }));
    const f = n[c].items[p];
    f.onUpdate(f.id, m);
  }, w = (c, p) => {
    i((f) => (f[c] = p, { ...f }));
    const m = n[c].items.find((f) => f.id === p);
    m ? m.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ o("div", { id: e, children: /* @__PURE__ */ d(Se, { children: [
    /* @__PURE__ */ o(He, { asChild: !0, children: /* @__PURE__ */ d(L, { variant: "default", children: [
      /* @__PURE__ */ o(zs, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      t,
      /* @__PURE__ */ o(_e, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ o(we, { children: n.map((c, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ o(mn, { children: c.label }),
      /* @__PURE__ */ o(Ba, { children: c.itemType === 0 ? /* @__PURE__ */ o(wt, { children: c.items.map((m, f) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(
        Ht,
        {
          checked: r[p][f],
          onCheckedChange: () => l(p, f),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ o(
        sw,
        {
          value: s[p],
          onValueChange: (m) => w(p, m),
          children: c.items.map((m) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Fa, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ o(Ke, {})
    ] }, c.label)) })
  ] }) });
}
function zp({
  id: e,
  category: t,
  downloads: n,
  languages: r,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const w = new pi("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, m) => p + m, 0)), c = () => {
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
            /* @__PURE__ */ o(Fs, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ o("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: w })
          ] }),
          /* @__PURE__ */ o("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ o("div", { className: "tw-flex tw-gap-2", children: r.slice(0, 3).map((p) => /* @__PURE__ */ o("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          r.length > 3 && /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => c(),
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
                /* @__PURE__ */ o(Gs, { className: "tw-h-4 tw-w-4" })
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
                /* @__PURE__ */ o(Us, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Cw({ id: e, versionHistory: t }) {
  const [n, r] = M(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const w = new Date(l), c = new Date(a.getTime() - w.getTime()), p = c.getUTCFullYear() - 1970, m = c.getUTCMonth(), f = c.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : f === 0 ? u = "today" : u = `${f.toString()} day${f === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(t).sort((l, w) => w[0].localeCompare(l[0]));
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
function Fp({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: r,
  versionHistory: a,
  currentVersion: s
}) {
  const i = B(() => ui(n), [n]), w = ((c) => {
    const p = new Intl.DisplayNames(mi(), { type: "language" });
    return c.map((m) => p.of(m));
  })(r);
  return /* @__PURE__ */ o("div", { id: e, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ o(Cw, { versionHistory: a }),
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
          /* @__PURE__ */ o("span", { className: "tw-font-semibold", children: w.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Ew({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: r,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: w,
  isOpen: c = void 0,
  onOpenChange: p = void 0,
  isDisabled: m = !1,
  sortSelected: f = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: v
}) {
  const [N, k] = M(!1), T = z(
    (S) => {
      var A;
      const E = (A = e.find((U) => U.label === S)) == null ? void 0 : A.value;
      E && n(
        t.includes(E) ? t.filter((U) => U !== E) : [...t, E]
      );
    },
    [e, t, n]
  ), V = () => w || r, $ = B(() => {
    if (!f) return e;
    const S = e.filter((A) => A.starred).sort((A, U) => A.label.localeCompare(U.label)), E = e.filter((A) => !A.starred).sort((A, U) => {
      const I = t.includes(A.value), G = t.includes(U.value);
      return I && !G ? -1 : !I && G ? 1 : A.label.localeCompare(U.label);
    });
    return [...S, ...E];
  }, [e, t, f]), P = () => {
    n(e.map((S) => S.value));
  }, y = () => {
    n([]);
  }, C = c ?? N;
  return /* @__PURE__ */ o("div", { id: v, className: g, children: /* @__PURE__ */ d(le, { open: C, onOpenChange: p ?? k, children: [
    /* @__PURE__ */ o(ce, { asChild: !0, children: /* @__PURE__ */ d(
      L,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": C,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: m,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ o("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ o("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: V()
              }
            )
          ] }),
          /* @__PURE__ */ o(So, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(Zt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(Jt, { children: [
      /* @__PURE__ */ o(Ge, { placeholder: `Search ${r.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: P, children: s }),
        /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: y, children: i })
      ] }),
      /* @__PURE__ */ d(Wt, { children: [
        /* @__PURE__ */ o(un, { children: l }),
        /* @__PURE__ */ o(Yt, { children: $.map((S) => /* @__PURE__ */ d(
          Bt,
          {
            value: S.label,
            onSelect: T,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Mt,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    t.includes(S.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ o(Hs, { className: "tw-h-4 tw-w-4" }),
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
function Gp({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: r,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: w,
  className: c,
  badgesPlaceholder: p,
  id: m
}) {
  return /* @__PURE__ */ d("div", { id: m, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ o(
      Ew,
      {
        entries: e,
        selected: t,
        onChange: n,
        placeholder: r,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: w,
        className: c
      }
    ),
    t.length > 0 ? /* @__PURE__ */ o("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: t.map((f) => {
      var u;
      return /* @__PURE__ */ d(Ve, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ o(
          L,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(t.filter((g) => g !== f)),
            children: /* @__PURE__ */ o(je, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = e.find((g) => g.value === f)) == null ? void 0 : u.label
      ] }, f);
    }) }) : /* @__PURE__ */ o(dt, { children: p })
  ] });
}
const Xe = b.forwardRef(
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
Xe.displayName = "Input";
const Tw = (e, t, n) => e === "generated" ? /* @__PURE__ */ d(wt, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_generated%"]
] }) : e === "hidden" ? /* @__PURE__ */ d(wt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ d(wt, { children: [
  /* @__PURE__ */ o("p", { children: n }),
  " ",
  t["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Sw({
  callerType: e,
  updateCallerType: t,
  customCaller: n,
  updateCustomCaller: r,
  localizedStrings: a
}) {
  const s = Z(null), i = Z(null), l = Z(!1), [w, c] = M(e), [p, m] = M(n), [f, u] = M(!1);
  q(() => {
    c(e);
  }, [e]), q(() => {
    p !== n && m(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, u(v), v || (w !== "custom" || p ? (t(w), r(p)) : (c(e), m(n)));
  }, x = (v) => {
    var N, k, T, V;
    v.stopPropagation(), document.activeElement === i.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((N = s.current) == null || N.focus(), l.current = !0) : document.activeElement === s.current && v.key === "ArrowUp" ? ((k = i.current) == null || k.focus(), l.current = !1) : document.activeElement === s.current && v.key === "ArrowLeft" && ((T = s.current) == null ? void 0 : T.selectionStart) === 0 && ((V = i.current) == null || V.focus(), l.current = !1), w === "custom" && v.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ d(Se, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ o(St, { children: /* @__PURE__ */ d(Lt, { children: [
      /* @__PURE__ */ o(Ut, { asChild: !0, children: /* @__PURE__ */ o(He, { asChild: !0, children: /* @__PURE__ */ o(L, { variant: "outline", className: "tw-h-6", children: Tw(e, a, n) }) }) }),
      /* @__PURE__ */ o(Rt, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      we,
      {
        className: "tw-z-[300]",
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var v;
          l.current && ((v = s.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ o(mn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(Ke, {}),
          /* @__PURE__ */ o(
            Ht,
            {
              checked: w === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw-w-10 tw-text-center", children: ir })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Ht,
            {
              checked: w === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw-w-10 tw-text-center", children: lr })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Ht,
            {
              ref: i,
              checked: w === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (v) => {
                var N;
                v.stopPropagation(), l.current = !0, (N = s.current) == null || N.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ o("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  Xe,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: p,
                    onKeyDown: (v) => {
                      v.key === "Enter" || v.key === "ArrowUp" || v.key === "ArrowDown" || v.key === "ArrowLeft" || v.key === "ArrowRight" || v.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (v) => m(v.target.value)
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
const Rw = (e, t) => e === "f" ? /* @__PURE__ */ d(wt, { children: [
  /* @__PURE__ */ o(Do, {}),
  " ",
  t["%footnoteEditor_noteType_footnote_label%"]
] }) : e === "fe" ? /* @__PURE__ */ d(wt, { children: [
  /* @__PURE__ */ o(Mo, {}),
  " ",
  t["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ d(wt, { children: [
  /* @__PURE__ */ o(Ro, {}),
  " ",
  t["%footnoteEditor_noteType_crossReference_label%"]
] }), Dw = (e, t) => {
  if (e === "x")
    return t["%footnoteEditor_noteType_crossReference_label%"];
  let n = t["%footnoteEditor_noteType_endNote_label%"];
  return e === "f" && (n = t["%footnoteEditor_noteType_footnote_label%"]), ve(t["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function Mw({
  noteType: e,
  handleNoteTypeChange: t,
  localizedStrings: n,
  isTypeSwitchable: r
}) {
  return /* @__PURE__ */ d(Se, { children: [
    /* @__PURE__ */ o(St, { children: /* @__PURE__ */ d(Lt, { children: [
      /* @__PURE__ */ o(qi, { asChild: !0, children: /* @__PURE__ */ o(He, { asChild: !0, children: /* @__PURE__ */ o(L, { variant: "outline", className: "tw-h-6", children: Rw(e, n) }) }) }),
      /* @__PURE__ */ o(Rt, { children: /* @__PURE__ */ o("p", { children: Dw(e, n) }) })
    ] }) }),
    /* @__PURE__ */ d(we, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ o(mn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ o(Ke, {}),
      /* @__PURE__ */ d(
        Ht,
        {
          disabled: e !== "x" && !r,
          checked: e === "x",
          onCheckedChange: () => t("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ o(Ro, {}),
            /* @__PURE__ */ o("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Ht,
        {
          disabled: e === "x" && !r,
          checked: e === "f",
          onCheckedChange: () => t("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ o(Do, {}),
            /* @__PURE__ */ o("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        Ht,
        {
          disabled: e === "x" && !r,
          checked: e === "fe",
          onCheckedChange: () => t("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ o(Mo, {}),
            /* @__PURE__ */ o("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
function Ow(e) {
  var n;
  const t = (n = e.attributes) == null ? void 0 : n.char;
  t.style && (t.style === "ft" && (t.style = "xt"), t.style === "fr" && (t.style = "xo"), t.style === "fq" && (t.style = "xq"));
}
function Iw(e) {
  var n;
  const t = (n = e.attributes) == null ? void 0 : n.char;
  t.style && (t.style === "xt" && (t.style = "ft"), t.style === "xo" && (t.style = "fr"), t.style === "xq" && (t.style = "fq"));
}
const Aw = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Up({
  classNameForEditor: e,
  noteOps: t,
  onSave: n,
  onClose: r,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  localizedStrings: l
}) {
  const w = Z(null), c = Cs(), [p, m] = M("generated"), [f, u] = M("*"), [g, x] = M("f"), [v, N] = M(!1), k = B(
    () => ({
      ...i,
      markerMenuTrigger: i.markerMenuTrigger ?? "\\",
      hasExternalUI: !0,
      view: { ...i.view ?? ll(), noteMode: "expanded" }
    }),
    [i]
  );
  q(() => {
    var y;
    (y = w.current) == null || y.focus();
  }), q(() => {
    var _, S;
    let y;
    const C = t == null ? void 0 : t.at(0);
    if (C && vn("note", C)) {
      const E = (_ = C.insert.note) == null ? void 0 : _.caller;
      let A = "custom";
      E === ir ? A = "generated" : E === lr ? A = "hidden" : E && u(E), m(A), x(((S = C.insert.note) == null ? void 0 : S.style) ?? "f"), y = setTimeout(() => {
        var U;
        (U = w.current) == null || U.applyUpdate([C]);
      }, 0);
    }
    return () => {
      y && clearTimeout(y);
    };
  }, [t, s]);
  const T = z(() => {
    var C, _;
    const y = (_ = (C = w.current) == null ? void 0 : C.getNoteOps(0)) == null ? void 0 : _.at(0);
    y && vn("note", y) && (y.insert.note && (p === "custom" ? y.insert.note.caller = f : y.insert.note.caller = p === "generated" ? ir : lr), n([y]));
  }, [p, f, n]), V = () => {
    var C;
    const y = (C = c.current) == null ? void 0 : C.getElementsByClassName("editor-input")[0];
    y != null && y.textContent && navigator.clipboard.writeText(y.textContent);
  }, $ = (y) => {
    var _, S, E, A, U;
    x(y);
    const C = (S = (_ = w.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : S.at(0);
    if (C && vn("note", C)) {
      C.insert.note && (C.insert.note.style = y);
      const I = (A = (E = C.insert.note) == null ? void 0 : E.contents) == null ? void 0 : A.ops;
      g !== "x" && y === "x" ? I == null || I.forEach((G) => Ow(G)) : g === "x" && y !== "x" && (I == null || I.forEach((G) => Iw(G))), (U = w.current) == null || U.applyUpdate([C, { delete: 1 }]);
    }
  }, P = (y) => {
    var _, S, E, A, U;
    const C = (S = (_ = w.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : S.at(0);
    if (C && vn("note", C)) {
      y.content.length > 1 && setTimeout(() => {
        var D;
        (D = w.current) == null || D.applyUpdate([{ retain: 2 }, { delete: 1 }]);
      }, 0);
      const I = (E = C.insert.note) == null ? void 0 : E.style, G = (U = (A = C.insert.note) == null ? void 0 : A.contents) == null ? void 0 : U.ops;
      I || N(!1), N(
        I === "x" ? !!(G != null && G.every((D) => {
          var ct, ft;
          if (!((ct = D.attributes) != null && ct.char)) return !0;
          const F = ((ft = D.attributes) == null ? void 0 : ft.char).style;
          return F === "xt" || F === "xo" || F === "xq";
        })) : !!(G != null && G.every((D) => {
          var ct, ft;
          if (!((ct = D.attributes) != null && ct.char)) return !0;
          const F = ((ft = D.attributes) == null ? void 0 : ft.char).style;
          return F === "ft" || F === "fr" || F === "fq";
        }))
      );
    } else
      N(!1);
  };
  return /* @__PURE__ */ d("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex", children: [
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-4", children: [
        /* @__PURE__ */ o(
          Mw,
          {
            isTypeSwitchable: v,
            noteType: g,
            handleNoteTypeChange: $,
            localizedStrings: l
          }
        ),
        /* @__PURE__ */ o(
          Sw,
          {
            callerType: p,
            updateCallerType: m,
            customCaller: f,
            updateCustomCaller: u,
            localizedStrings: l
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
        /* @__PURE__ */ o(St, { children: /* @__PURE__ */ d(Lt, { children: [
          /* @__PURE__ */ o(Ut, { asChild: !0, children: /* @__PURE__ */ o(L, { onClick: r, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ o(je, {}) }) }),
          /* @__PURE__ */ o(Rt, { children: /* @__PURE__ */ o("p", { children: l["%footnoteEditor_cancelButton_tooltip%"] }) })
        ] }) }),
        /* @__PURE__ */ o(St, { children: /* @__PURE__ */ d(Lt, { children: [
          /* @__PURE__ */ o(Ut, { asChild: !0, children: /* @__PURE__ */ o(
            L,
            {
              onClick: T,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              children: /* @__PURE__ */ o(Mt, {})
            }
          ) }),
          /* @__PURE__ */ o(Rt, { children: l["%footnoteEditor_saveButton_tooltip%"] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ d(
      "div",
      {
        ref: c,
        className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
        children: [
          /* @__PURE__ */ o("div", { className: e, children: /* @__PURE__ */ o(
            cl,
            {
              options: k,
              onUsjChange: P,
              defaultUsj: Aw,
              onScrRefChange: () => {
              },
              scrRef: a,
              ref: w
            }
          ) }),
          /* @__PURE__ */ o("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ o(St, { children: /* @__PURE__ */ d(Lt, { children: [
            /* @__PURE__ */ o(Ut, { asChild: !0, children: /* @__PURE__ */ o(L, { onClick: V, className: "tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(To, {}) }) }),
            /* @__PURE__ */ o(Rt, { children: /* @__PURE__ */ o("p", { children: l["%footnoteEditor_copyButton_tooltip%"] }) })
          ] }) }) })
        ]
      }
    )
  ] });
}
const Hp = Object.freeze([
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
function Ha(e, t) {
  if (!t || t.length === 0) return e ?? "empty";
  const n = t.find((a) => typeof a == "string");
  if (n)
    return `key-${e ?? "unknown"}-${n.slice(0, 10)}`;
  const r = typeof t[0] == "string" ? "impossible" : t[0].marker ?? "unknown";
  return `key-${e ?? "unknown"}-${r}`;
}
function Pw(e, t, n = !0, r = void 0) {
  if (!t || t.length === 0) return;
  const a = [], s = [];
  let i = [];
  return t.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, w) => {
    const c = w === s.length - 1;
    return /* @__PURE__ */ d("p", { children: [
      jr(e, l, n, !0, a),
      c && r
    ] }, Ha(e, l));
  });
}
function jr(e, t, n = !0, r = !0, a = []) {
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
              /* @__PURE__ */ o(ar, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ o("span", { children: s }),
              /* @__PURE__ */ o(ar, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return Vw(
        s,
        Ha(`${e}\\${s.marker}`, [s]),
        n,
        [...a, e ?? "unknown"]
      );
    });
}
function Vw(e, t, n, r = []) {
  const { marker: a } = e;
  return /* @__PURE__ */ d("span", { children: [
    a ? n && /* @__PURE__ */ o("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ o(
      ar,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    jr(a, e.content, n, !0, [
      ...r,
      a ?? "unknown"
    ])
  ] }, t);
}
function $w({
  footnote: e,
  layout: t = "horizontal",
  formatCaller: n,
  showMarkers: r = !0
}) {
  const a = n ? n(e.caller) : e.caller, s = a !== e.caller;
  let i, l = e.content;
  Array.isArray(e.content) && e.content.length > 0 && typeof e.content[0] != "string" && (e.content[0].marker === "fr" || e.content[0].marker === "xo") && ([i, ...l] = e.content);
  const w = r ? /* @__PURE__ */ o("span", { className: "marker", children: `\\${e.marker} ` }) : void 0, c = r ? /* @__PURE__ */ o("span", { className: "marker", children: ` \\${e.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ d("span", { className: h("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), m = i && /* @__PURE__ */ d(wt, { children: [
    jr(e.marker, [i], r, !1),
    " "
  ] }), f = t === "horizontal" ? "horizontal" : "vertical", u = r ? "marker-visible" : "", g = t === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = h(f, u);
  return /* @__PURE__ */ d(wt, { children: [
    /* @__PURE__ */ d("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      w,
      p
    ] }),
    /* @__PURE__ */ o("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: m }),
    /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          x
        ),
        children: l && l.length > 0 && /* @__PURE__ */ o(wt, { children: Pw(e.marker, l, r, c) })
      }
    )
  ] });
}
function Kp({
  className: e,
  classNameForItems: t,
  footnotes: n,
  layout: r = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: w,
  onFootnoteSelected: c
}) {
  const p = w ?? hi(n, void 0), m = (k, T) => {
    c == null || c(k, T, a);
  }, f = s ? n.findIndex((k) => k === s) : -1, [u, g] = M(f), x = (k, T, V) => {
    if (n.length)
      switch (k.key) {
        case "Enter":
        case " ":
          k.preventDefault(), c == null || c(T, V, a);
          break;
      }
  }, v = (k) => {
    if (n.length)
      switch (k.key) {
        case "ArrowDown":
          k.preventDefault(), g((T) => Math.min(T + 1, n.length - 1));
          break;
        case "ArrowUp":
          k.preventDefault(), g((T) => Math.max(T - 1, 0));
          break;
      }
  }, N = Z([]);
  return q(() => {
    var k;
    u >= 0 && u < N.current.length && ((k = N.current[u]) == null || k.focus());
  }, [u]), /* @__PURE__ */ o(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: h("tw-h-full tw-overflow-y-auto", e),
      onKeyDown: v,
      children: /* @__PURE__ */ o(
        "ul",
        {
          className: h(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            r === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((k, T) => {
            const V = k === s, $ = `${a}-${T}`;
            return /* @__PURE__ */ d(wt, { children: [
              /* @__PURE__ */ o(
                "li",
                {
                  ref: (P) => {
                    N.current[T] = P;
                  },
                  role: "option",
                  "aria-selected": V,
                  "data-marker": k.marker,
                  "data-state": V ? "selected" : void 0,
                  tabIndex: T === u ? 0 : -1,
                  className: h(
                    "tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",
                    c && "hover:tw-bg-muted/50",
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
                  onClick: () => m(k, T),
                  onKeyDown: (P) => x(P, k, T),
                  children: /* @__PURE__ */ o(
                    $w,
                    {
                      footnote: k,
                      layout: r,
                      formatCaller: () => p(k.caller, T),
                      showMarkers: i
                    }
                  )
                },
                $
              ),
              T < n.length - 1 && r === "vertical" && /* @__PURE__ */ o($e, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Lw(e) {
  const t = [];
  let n = 0;
  const r = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = r.exec(e)) !== null; )
    a.index > n && t.push(e.substring(n, a.index)), t.push(/* @__PURE__ */ o("strong", { children: a[1] }, a.index)), n = r.lastIndex;
  return n < e.length && t.push(e.substring(n)), t.length > 0 ? t : [e];
}
function Bw({
  occurrenceData: e,
  setScriptureReference: t,
  localizedStrings: n,
  classNameForText: r
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = B(() => {
    const l = [], w = /* @__PURE__ */ new Set();
    return e.forEach((c) => {
      const p = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      w.has(p) || (w.add(p), l.push(c));
    }), l;
  }, [e]);
  return /* @__PURE__ */ d(Ln, { stickyHeader: !0, children: [
    /* @__PURE__ */ o(Bn, { stickyHeader: !0, children: /* @__PURE__ */ d(Gt, { children: [
      /* @__PURE__ */ o(cn, { children: a }),
      /* @__PURE__ */ o(cn, { children: s })
    ] }) }),
    /* @__PURE__ */ o(jn, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ d(
      Gt,
      {
        onClick: () => {
          t(l.reference);
        },
        children: [
          /* @__PURE__ */ o(ke, { children: xe(l.reference, "English") }),
          /* @__PURE__ */ o(ke, { className: r, children: Lw(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const zr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  cr.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ o(
      cr.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ o(Mt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
zr.displayName = cr.Root.displayName;
const zn = (e) => e === "asc" ? /* @__PURE__ */ o(qs, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ o(Js, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ o(Ws, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Xp = (e) => ({
  accessorKey: "item",
  accessorFn: (t) => t.items[0],
  header: ({ column: t }) => /* @__PURE__ */ d(L, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    zn(t.getIsSorted())
  ] })
}), jw = (e, t) => ({
  accessorKey: `item${t}`,
  accessorFn: (n) => n.items[t],
  header: ({ column: n }) => /* @__PURE__ */ d(L, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    zn(n.getIsSorted())
  ] })
}), Yp = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ d(L, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    zn(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), Qn = (e, t, n, r, a, s) => {
  let i = [...n];
  e.forEach((w) => {
    t === "approved" ? i.includes(w) || i.push(w) : i = i.filter((c) => c !== w);
  }), r(i);
  let l = [...a];
  e.forEach((w) => {
    t === "unapproved" ? l.includes(w) || l.push(w) : l = l.filter((c) => c !== w);
  }), s(l);
}, qp = (e, t, n, r, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ o("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ d(L, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    e,
    zn(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ d($r, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ o(
        rn,
        {
          onClick: (w) => {
            w.stopPropagation(), Qn(
              [l],
              "approved",
              t,
              n,
              r,
              a
            );
          },
          value: "approved",
          children: /* @__PURE__ */ o(Ks, {})
        }
      ),
      /* @__PURE__ */ o(
        rn,
        {
          onClick: (w) => {
            w.stopPropagation(), Qn(
              [l],
              "unapproved",
              t,
              n,
              r,
              a
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ o(Xs, {})
        }
      ),
      /* @__PURE__ */ o(
        rn,
        {
          onClick: (w) => {
            w.stopPropagation(), Qn(
              [l],
              "unknown",
              t,
              n,
              r,
              a
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ o(Ys, {})
        }
      )
    ] });
  }
}), Jp = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Wp = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, Zp = (e) => {
  const t = e.match(/^\\id\s+([A-Za-z]+)/);
  return t ? t[1] : "";
}, zw = (e, t, n) => n.includes(e) ? "unapproved" : t.includes(e) ? "approved" : "unknown", Qp = Object.freeze([
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
]), Fw = (e, t, n) => {
  let r = e;
  return t !== "all" && (r = r.filter(
    (a) => t === "approved" && a.status === "approved" || t === "unapproved" && a.status === "unapproved" || t === "unknown" && a.status === "unknown"
  )), n !== "" && (r = r.filter((a) => a.items[0].includes(n))), r;
}, Gw = (e, t, n) => {
  const r = [];
  return e.forEach((a) => {
    const s = r.find(
      (i) => Oo(
        i.items,
        Gn(a.inventoryText) ? [a.inventoryText] : a.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: a.verseRef,
        text: a.verse
      });
    else {
      const i = {
        items: Gn(a.inventoryText) ? [a.inventoryText] : a.inventoryText,
        count: 1,
        status: zw(
          Gn(a.inventoryText) ? a.inventoryText : a.inventoryText[0],
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
}, Pt = (e, t) => e[t] ?? t;
function tu({
  inventoryItems: e,
  setVerseRef: t,
  localizedStrings: n,
  additionalItemsLabels: r,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: w,
  id: c,
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: m
}) {
  const f = Pt(n, "%webView_inventory_all%"), u = Pt(n, "%webView_inventory_approved%"), g = Pt(n, "%webView_inventory_unapproved%"), x = Pt(n, "%webView_inventory_unknown%"), v = Pt(n, "%webView_inventory_scope_currentBook%"), N = Pt(n, "%webView_inventory_scope_chapter%"), k = Pt(n, "%webView_inventory_scope_verse%"), T = Pt(n, "%webView_inventory_filter_text%"), V = Pt(
    n,
    "%webView_inventory_show_additional_items%"
  ), $ = Pt(n, "%webView_inventory_no_results%"), [P, y] = M(!1), [C, _] = M("all"), [S, E] = M(""), [A, U] = M([]), I = B(() => {
    const j = e ?? [];
    return j.length === 0 ? [] : Gw(j, a, s);
  }, [e, a, s]), G = B(() => {
    if (P) return I;
    const j = [];
    return I.forEach((et) => {
      const gt = et.items[0], yt = j.find(
        (kt) => kt.items[0] === gt
      );
      yt ? (yt.count += et.count, yt.occurrences = yt.occurrences.concat(et.occurrences)) : j.push({
        items: [gt],
        count: et.count,
        occurrences: et.occurrences,
        status: et.status
      });
    }), j;
  }, [P, I]), D = B(() => G.length === 0 ? [] : Fw(G, C, S), [G, C, S]), F = B(() => {
    var gt, yt;
    if (!P) return w;
    const j = (gt = r == null ? void 0 : r.tableHeaders) == null ? void 0 : gt.length;
    if (!j) return w;
    const et = [];
    for (let kt = 0; kt < j; kt++)
      et.push(
        jw(
          ((yt = r == null ? void 0 : r.tableHeaders) == null ? void 0 : yt[kt]) || "Additional Item",
          kt + 1
        )
      );
    return [...et, ...w];
  }, [r == null ? void 0 : r.tableHeaders, w, P]);
  q(() => {
    D.length === 0 ? U([]) : D.length === 1 && U(D[0].items);
  }, [D]);
  const ct = (j, et) => {
    et.setRowSelection(() => {
      const gt = {};
      return gt[j.index] = !0, gt;
    }), U(j.original.items);
  }, ft = (j) => {
    if (j === "book" || j === "chapter" || j === "verse")
      l(j);
    else
      throw new Error(`Invalid scope value: ${j}`);
  }, zt = (j) => {
    if (j === "all" || j === "approved" || j === "unapproved" || j === "unknown")
      _(j);
    else
      throw new Error(`Invalid status filter value: ${j}`);
  }, ut = B(() => {
    if (G.length === 0 || A.length === 0) return [];
    const j = G.filter((et) => Oo(
      P ? et.items : [et.items[0]],
      A
    ));
    if (j.length > 1) throw new Error("Selected item is not unique");
    return j.length === 0 ? [] : j[0].occurrences;
  }, [A, P, G]);
  return /* @__PURE__ */ d("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        Le,
        {
          onValueChange: (j) => zt(j),
          defaultValue: C,
          children: [
            /* @__PURE__ */ o(Ee, { className: "tw-m-1", children: /* @__PURE__ */ o(Be, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(Te, { children: [
              /* @__PURE__ */ o(_t, { value: "all", children: f }),
              /* @__PURE__ */ o(_t, { value: "approved", children: u }),
              /* @__PURE__ */ o(_t, { value: "unapproved", children: g }),
              /* @__PURE__ */ o(_t, { value: "unknown", children: x })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(Le, { onValueChange: (j) => ft(j), defaultValue: i, children: [
        /* @__PURE__ */ o(Ee, { className: "tw-m-1", children: /* @__PURE__ */ o(Be, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(Te, { children: [
          /* @__PURE__ */ o(_t, { value: "book", children: v }),
          /* @__PURE__ */ o(_t, { value: "chapter", children: N }),
          /* @__PURE__ */ o(_t, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ o(
        Xe,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: T,
          value: S,
          onChange: (j) => {
            E(j.target.value);
          }
        }
      ),
      r && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ o(
          zr,
          {
            className: "tw-m-1",
            checked: P,
            onCheckedChange: (j) => {
              y(j);
            }
          }
        ),
        /* @__PURE__ */ o(dt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (r == null ? void 0 : r.checkboxText) ?? V })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ o(
      yw,
      {
        columns: F,
        data: D,
        onRowClickHandler: ct,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: $
      }
    ) }),
    ut.length > 0 && /* @__PURE__ */ o("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ o(
      Bw,
      {
        classNameForText: m,
        occurrenceData: ut,
        setScriptureReference: t,
        localizedStrings: n
      }
    ) })
  ] });
}
const eu = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function nu({ localizedStrings: e, markerMenuItems: t }) {
  const [n, r] = M(""), a = B(() => {
    const s = n.trim().toLowerCase();
    return s ? t.filter(
      (i) => {
        var l;
        return ((l = i.marker) == null ? void 0 : l.toLowerCase().includes(s)) || i.title.toLowerCase().includes(s);
      }
    ) : t;
  }, [n, t]);
  return /* @__PURE__ */ d(Jt, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ o(
      Ge,
      {
        value: n,
        onValueChange: (s) => r(s),
        placeholder: e["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ d(Wt, { children: [
      /* @__PURE__ */ o(un, { children: e["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(Yt, { children: a.map((s) => /* @__PURE__ */ d(
        Bt,
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
            (s.isDisallowed || s.isDeprecated) && /* @__PURE__ */ o(Qo, { className: "tw-font-sans", children: s.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
          ]
        },
        `item-${s.title}`
      )) })
    ] })
  ] });
}
const Uw = "16rem", Hw = "3rem", Ka = b.createContext(void 0);
function Fn() {
  const e = b.useContext(Ka);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return e;
}
const Xa = b.forwardRef(
  ({
    defaultOpen: e = !0,
    open: t,
    onOpenChange: n,
    className: r,
    style: a,
    children: s,
    side: i = "primary",
    ...l
  }, w) => {
    const [c, p] = b.useState(e), m = t ?? c, f = b.useCallback(
      (T) => {
        const V = typeof T == "function" ? T(m) : T;
        n ? n(V) : p(V);
      },
      [n, m]
    ), u = b.useCallback(() => f((T) => !T), [f]), g = m ? "expanded" : "collapsed", N = pt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", k = b.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: f,
        toggleSidebar: u,
        side: N
      }),
      [g, m, f, u, N]
    );
    return /* @__PURE__ */ o(Ka.Provider, { value: k, children: /* @__PURE__ */ o(St, { delayDuration: 0, children: /* @__PURE__ */ o(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Uw,
            "--sidebar-width-icon": Hw,
            ...a
          }
        ),
        className: h(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          r
        ),
        ref: w,
        ...l,
        children: s
      }
    ) }) });
  }
);
Xa.displayName = "SidebarProvider";
const Ya = b.forwardRef(({ variant: e = "sidebar", collapsible: t = "offcanvas", className: n, children: r, ...a }, s) => {
  const i = Fn();
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
Ya.displayName = "Sidebar";
const Kw = b.forwardRef(({ className: e, onClick: t, ...n }, r) => {
  const a = Fn();
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
        a.side === "primary" ? /* @__PURE__ */ o(Zs, {}) : /* @__PURE__ */ o(Qs, {}),
        /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Kw.displayName = "SidebarTrigger";
const Xw = b.forwardRef(
  ({ className: e, ...t }, n) => {
    const { toggleSidebar: r } = Fn();
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
Xw.displayName = "SidebarRail";
const qa = b.forwardRef(
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
qa.displayName = "SidebarInset";
const Yw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Xe,
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
Yw.displayName = "SidebarInput";
const qw = b.forwardRef(
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
qw.displayName = "SidebarHeader";
const Jw = b.forwardRef(
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
Jw.displayName = "SidebarFooter";
const Ww = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  $e,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", e),
    ...t
  }
));
Ww.displayName = "SidebarSeparator";
const Ja = b.forwardRef(
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
Ja.displayName = "SidebarContent";
const br = b.forwardRef(
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
br.displayName = "SidebarGroup";
const vr = b.forwardRef(({ className: e, asChild: t = !1, ...n }, r) => /* @__PURE__ */ o(
  t ? ze : "div",
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
vr.displayName = "SidebarGroupLabel";
const Zw = b.forwardRef(({ className: e, asChild: t = !1, ...n }, r) => /* @__PURE__ */ o(
  t ? ze : "button",
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
Zw.displayName = "SidebarGroupAction";
const xr = b.forwardRef(
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
xr.displayName = "SidebarGroupContent";
const Wa = b.forwardRef(
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
Wa.displayName = "SidebarMenu";
const Za = b.forwardRef(
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
Za.displayName = "SidebarMenuItem";
const Qw = ie(
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
), Qa = b.forwardRef(
  ({
    asChild: e = !1,
    isActive: t = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const w = e ? ze : "button", { state: c } = Fn(), p = /* @__PURE__ */ o(
      w,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": t,
        className: h(Qw({ variant: n, size: r }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ d(Lt, { children: [
      /* @__PURE__ */ o(Ut, { asChild: !0, children: p }),
      /* @__PURE__ */ o(Rt, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : p;
  }
);
Qa.displayName = "SidebarMenuButton";
const td = b.forwardRef(({ className: e, asChild: t = !1, showOnHover: n = !1, ...r }, a) => /* @__PURE__ */ o(
  t ? ze : "button",
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
td.displayName = "SidebarMenuAction";
const ed = b.forwardRef(
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
ed.displayName = "SidebarMenuBadge";
const nd = b.forwardRef(({ className: e, showIcon: t = !1, ...n }, r) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", e),
      ...n,
      children: [
        t && /* @__PURE__ */ o(gr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ o(
          gr,
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
nd.displayName = "SidebarMenuSkeleton";
const rd = b.forwardRef(
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
rd.displayName = "SidebarMenuSub";
const od = b.forwardRef(
  ({ ...e }, t) => /* @__PURE__ */ o("li", { ref: t, ...e })
);
od.displayName = "SidebarMenuSubItem";
const ad = b.forwardRef(({ asChild: e = !1, size: t = "md", isActive: n, className: r, ...a }, s) => /* @__PURE__ */ o(
  e ? ze : "a",
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
ad.displayName = "SidebarMenuSubButton";
function sd({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: w
}) {
  const c = z(
    (f, u) => {
      r(f, u);
    },
    [r]
  ), p = z(
    (f) => {
      const u = n.find((g) => g.projectId === f);
      return u ? u.projectName : f;
    },
    [n]
  ), m = z(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ o(
    Ya,
    {
      id: e,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", w),
      children: /* @__PURE__ */ d(Ja, { children: [
        /* @__PURE__ */ d(br, { children: [
          /* @__PURE__ */ o(vr, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ o(xr, { children: /* @__PURE__ */ o(Wa, { children: Object.entries(t).map(([f, u]) => /* @__PURE__ */ o(Za, { children: /* @__PURE__ */ o(
            Qa,
            {
              onClick: () => c(f),
              isActive: m(f),
              children: /* @__PURE__ */ o("span", { className: "tw-pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ d(br, { children: [
          /* @__PURE__ */ o(vr, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ o(xr, { className: "tw-pl-3", children: /* @__PURE__ */ o(
            ur,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = p(f);
                c(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ o(ti, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Fr = wn(
  ({ value: e, onSearch: t, placeholder: n, isFullWidth: r, className: a, isDisabled: s = !1, id: i }, l) => {
    const w = pt();
    return /* @__PURE__ */ d("div", { id: i, className: h("tw-relative", { "tw-w-full": r }, a), children: [
      /* @__PURE__ */ o(
        ko,
        {
          className: h(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ o(
        Xe,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: e,
          onChange: (c) => t(c.target.value),
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
            { "tw-left-0": w === "rtl" },
            { "tw-right-0": w === "ltr" }
          ),
          onClick: () => {
            t("");
          },
          children: [
            /* @__PURE__ */ o(je, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ o("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Fr.displayName = "SearchBar";
function ru({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  children: r,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: w,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ o("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ o(
      Fr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      Xa,
      {
        id: e,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ o(
            sd,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: t,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: w,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ o(qa, { className: "tw-min-w-[215px]", children: r })
        ]
      }
    )
  ] });
}
const ne = "scrBook", id = "scrRef", be = "source", ld = "details", cd = "Scripture Reference", wd = "Scripture Book", ts = "Type", dd = "Details";
function pd(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${r.start.book} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: ne,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? cd,
      cell: (r) => {
        const a = r.row.original;
        return r.row.getIsGrouped() ? Q.bookIdToEnglishName(a.start.book) : r.row.groupingColumnId === ne ? xe(a.start) : void 0;
      },
      getGroupingValue: (r) => Q.bookIdToNumber(r.start.book),
      sortingFn: (r, a) => sr(r.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => xe(r.start),
      id,
      header: void 0,
      cell: (r) => {
        const a = r.row.original;
        return r.row.getIsGrouped() ? void 0 : xe(a.start);
      },
      sortingFn: (r, a) => sr(r.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: be,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? ts : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, a) => r.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: ld,
      header: (e == null ? void 0 : e.detailsColumnName) ?? dd,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const ud = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || sr(e.start, e.end) === 0 ? `${Un(e.start)}+${t}` : `${Un(e.start)}+${t}-${Un(e.end)}+${n}`;
}, xo = (e) => `${ud({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function ou({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: w
}) {
  const [c, p] = M([]), [m, f] = M([{ id: ne, desc: !1 }]), [u, g] = M({}), x = B(
    () => e.flatMap((_) => _.data.map((S) => ({
      ...S,
      source: _.source
    }))),
    [e]
  ), v = B(
    () => pd(
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
    c.includes(be) ? f([
      { id: be, desc: !1 },
      { id: ne, desc: !1 }
    ]) : f([{ id: ne, desc: !1 }]);
  }, [c]);
  const N = Ho({
    data: x,
    columns: v,
    state: {
      grouping: c,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: p,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: sl(),
    getGroupedRowModel: al(),
    getCoreRowModel: Xo(),
    getSortedRowModel: Ko(),
    getRowId: xo,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  q(() => {
    if (l) {
      const _ = N.getSelectedRowModel().rowsById, S = Object.keys(_);
      if (S.length === 1) {
        const E = x.find((A) => xo(A) === S[0]) || void 0;
        E && l(E);
      }
    }
  }, [u, x, l, N]);
  const k = a ?? wd, T = s ?? ts, V = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [ne] },
    { label: `Group by ${T}`, value: [be] },
    {
      label: `Group by ${k} and ${T}`,
      value: [ne, be]
    },
    {
      label: `Group by ${T} and ${k}`,
      value: [be, ne]
    }
  ], $ = (_) => {
    p(JSON.parse(_));
  }, P = (_, S) => {
    !_.getIsGrouped() && !_.getIsSelected() && _.getToggleSelectedHandler()(S);
  }, y = (_, S) => _.getIsGrouped() ? "" : h("banded-row", S % 2 === 0 ? "even" : "odd"), C = (_, S, E) => {
    if (!((_ == null ? void 0 : _.length) === 0 || S.depth < E.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !t && /* @__PURE__ */ d(
      Le,
      {
        value: JSON.stringify(c),
        onValueChange: (_) => {
          $(_);
        },
        children: [
          /* @__PURE__ */ o(Ee, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ o(Be, {}) }),
          /* @__PURE__ */ o(Te, { position: "item-aligned", children: /* @__PURE__ */ o(ww, { children: V.map((_) => /* @__PURE__ */ o(_t, { value: JSON.stringify(_.value), children: _.label }, _.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(Ln, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ o(Bn, { children: N.getHeaderGroups().map((_) => /* @__PURE__ */ o(Gt, { children: _.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ o(cn, { colSpan: S.colSpan, className: "top-0 tw-sticky", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
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
          tn(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, _.id)) }),
      /* @__PURE__ */ o(jn, { children: N.getRowModel().rows.map((_, S) => {
        const E = pt();
        return /* @__PURE__ */ o(
          Gt,
          {
            "data-state": _.getIsSelected() ? "selected" : "",
            className: h(y(_, S)),
            onClick: (A) => P(_, A),
            children: _.getVisibleCells().map((A) => {
              if (!(A.getIsPlaceholder() || A.column.columnDef.enableGrouping && !A.getIsGrouped() && (A.column.columnDef.id !== be || !n)))
                return /* @__PURE__ */ o(
                  ke,
                  {
                    className: h(
                      A.column.columnDef.id,
                      "tw-p-[1px]",
                      C(c, _, A)
                    ),
                    children: A.getIsGrouped() ? /* @__PURE__ */ d(
                      L,
                      {
                        variant: "link",
                        onClick: _.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          _.getIsExpanded() && /* @__PURE__ */ o(_e, {}),
                          !_.getIsExpanded() && (E === "ltr" ? /* @__PURE__ */ o(Ie, {}) : /* @__PURE__ */ o(rr, {})),
                          " ",
                          tn(A.column.columnDef.cell, A.getContext()),
                          " (",
                          _.subRows.length,
                          ")"
                        ]
                      }
                    ) : tn(A.column.columnDef.cell, A.getContext())
                  },
                  A.id
                );
            })
          },
          _.id
        );
      }) })
    ] })
  ] });
}
const Gr = (e, t) => e.filter((n) => {
  try {
    return Qe(n) === t;
  } catch {
    return !1;
  }
}), es = (e, t, n) => Gr(e, t).every((r) => n.includes(r));
function md({
  section: e,
  availableBookIds: t,
  selectedBookIds: n,
  onToggle: r,
  localizedStrings: a
}) {
  const s = Gr(t, e).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], w = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ o(
    L,
    {
      variant: "outline",
      size: "sm",
      onClick: () => r(e),
      className: h(
        es(t, e, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: Rl(
        e,
        i,
        l,
        w,
        c
      )
    }
  );
}
const yo = 5, tr = 6;
function hd({
  availableBookInfo: e,
  selectedBookIds: t,
  onChangeSelectedBookIds: n,
  localizedStrings: r,
  localizedBookNames: a
}) {
  const s = r["%webView_book_selector_books_selected%"], i = r["%webView_book_selector_select_books%"], l = r["%webView_book_selector_search_books%"], w = r["%webView_book_selector_select_all%"], c = r["%webView_book_selector_clear_all%"], p = r["%webView_book_selector_no_book_found%"], m = r["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: x } = {
    otLong: r == null ? void 0 : r["%scripture_section_ot_long%"],
    ntLong: r == null ? void 0 : r["%scripture_section_nt_long%"],
    dcLong: r == null ? void 0 : r["%scripture_section_dc_long%"],
    extraLong: r == null ? void 0 : r["%scripture_section_extra_long%"]
  }, [v, N] = M(!1), [k, T] = M(""), V = Z(void 0), $ = Z(!1);
  if (e.length !== Q.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const P = B(() => Q.allBookIds.filter(
    (I, G) => e[G] === "1" && !Q.isObsolete(Q.bookIdToNumber(I))
  ), [e]), y = B(() => {
    if (!k.trim()) {
      const D = {
        [X.OT]: [],
        [X.NT]: [],
        [X.DC]: [],
        [X.Extra]: []
      };
      return P.forEach((F) => {
        const ct = Qe(F);
        D[ct].push(F);
      }), D;
    }
    const I = P.filter(
      (D) => Dr(D, k, a)
    ), G = {
      [X.OT]: [],
      [X.NT]: [],
      [X.DC]: [],
      [X.Extra]: []
    };
    return I.forEach((D) => {
      const F = Qe(D);
      G[F].push(D);
    }), G;
  }, [P, k, a]), C = z(
    (I, G = !1) => {
      if (!G || !V.current) {
        n(
          t.includes(I) ? t.filter((ut) => ut !== I) : [...t, I]
        ), V.current = I;
        return;
      }
      const D = P.findIndex((ut) => ut === V.current), F = P.findIndex((ut) => ut === I);
      if (D === -1 || F === -1) return;
      const [ct, ft] = [
        Math.min(D, F),
        Math.max(D, F)
      ], zt = P.slice(ct, ft + 1).map((ut) => ut);
      n(
        t.includes(I) ? t.filter((ut) => !zt.includes(ut)) : [.../* @__PURE__ */ new Set([...t, ...zt])]
      );
    },
    [t, n, P]
  ), _ = (I) => {
    C(I, $.current), $.current = !1;
  }, S = (I, G) => {
    I.preventDefault(), C(G, I.shiftKey);
  }, E = z(
    (I) => {
      const G = Gr(P, I).map((D) => D);
      n(
        es(P, I, t) ? t.filter((D) => !G.includes(D)) : [.../* @__PURE__ */ new Set([...t, ...G])]
      );
    },
    [t, n, P]
  ), A = () => {
    n(P.map((I) => I));
  }, U = () => {
    n([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ o("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(X).map((I) => /* @__PURE__ */ o(
      md,
      {
        section: I,
        availableBookIds: P,
        selectedBookIds: t,
        onToggle: E,
        localizedStrings: r
      },
      I
    )) }),
    /* @__PURE__ */ d(
      le,
      {
        open: v,
        onOpenChange: (I) => {
          N(I), I || T("");
        },
        children: [
          /* @__PURE__ */ o(ce, { asChild: !0, children: /* @__PURE__ */ d(
            L,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                t.length > 0 ? `${s}: ${t.length}` : i,
                /* @__PURE__ */ o(So, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ o(Zt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
            Jt,
            {
              shouldFilter: !1,
              onKeyDown: (I) => {
                I.key === "Enter" && ($.current = I.shiftKey);
              },
              children: [
                /* @__PURE__ */ o(
                  Ge,
                  {
                    placeholder: l,
                    value: k,
                    onValueChange: T
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: A, children: w }),
                  /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: U, children: c })
                ] }),
                /* @__PURE__ */ d(Wt, { children: [
                  /* @__PURE__ */ o(un, { children: p }),
                  Object.values(X).map((I, G) => {
                    const D = y[I];
                    if (D.length !== 0)
                      return /* @__PURE__ */ d(No, { children: [
                        /* @__PURE__ */ o(
                          Yt,
                          {
                            heading: sa(I, f, u, g, x),
                            children: D.map((F) => /* @__PURE__ */ o(
                              la,
                              {
                                bookId: F,
                                isSelected: t.includes(F),
                                onSelect: () => _(F),
                                onMouseDown: (ct) => S(ct, F),
                                section: Qe(F),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: pr(F, a),
                                className: "tw-flex tw-items-center"
                              },
                              F
                            ))
                          }
                        ),
                        G < Object.values(X).length - 1 && /* @__PURE__ */ o(Zo, {})
                      ] }, I);
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
        t.length === tr ? tr : yo
      ).map((I) => /* @__PURE__ */ o(Ve, { className: "hover:tw-bg-secondary", variant: "secondary", children: Oe(I, a) }, I)),
      t.length > tr && /* @__PURE__ */ o(
        Ve,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${t.length - yo} ${m}`
        }
      )
    ] })
  ] });
}
const au = Object.freeze([
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
]), he = (e, t) => e[t] ?? t;
function su({
  scope: e,
  availableScopes: t,
  onScopeChange: n,
  availableBookInfo: r,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: w
}) {
  const c = he(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = he(
    i,
    "%webView_scope_selector_current_verse%"
  ), m = he(
    i,
    "%webView_scope_selector_current_chapter%"
  ), f = he(i, "%webView_scope_selector_current_book%"), u = he(i, "%webView_scope_selector_choose_books%"), g = he(i, "%webView_scope_selector_scope%"), x = he(i, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], N = t ? v.filter((k) => t.includes(k.value)) : v;
  return /* @__PURE__ */ d("div", { id: w, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ o(dt, { children: g }),
      /* @__PURE__ */ o(
        Mr,
        {
          value: e,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: N.map(({ value: k, label: T, id: V }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ o(Tn, { className: "tw-me-2", value: k, id: V }),
            /* @__PURE__ */ o(dt, { htmlFor: V, children: T })
          ] }, V))
        }
      )
    ] }),
    e === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ o(dt, { children: x }),
      /* @__PURE__ */ o(
        hd,
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
const er = {
  [W("undefined")]: "Ø",
  [W(0)]: "A",
  [W(1)]: "B",
  [W(2)]: "C",
  [W(3)]: "D",
  [W(4)]: "E",
  [W(5)]: "F",
  [W(6)]: "G",
  [W(7)]: "H",
  [W(8)]: "I",
  [W(9)]: "J",
  [W(10)]: "K",
  [W(11)]: "L",
  [W(12)]: "M",
  [W(13)]: "N",
  [W(14)]: "O",
  [W(15)]: "P",
  [W(16)]: "Q",
  [W(17)]: "R",
  [W(18)]: "S",
  [W(19)]: "T",
  [W(20)]: "U",
  [W(21)]: "V",
  [W(22)]: "W",
  [W(23)]: "X",
  [W(24)]: "Y",
  [W(25)]: "Z"
};
function iu({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: r = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...er,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([c, p]) => [
          c,
          c === p && c in er ? er[c] : p
        ]
      )
    )
  }, w = pt();
  return /* @__PURE__ */ d(
    Le,
    {
      value: `${t}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ o(Ee, { size: a, className: h("pr-twp tw-w-auto", s), children: /* @__PURE__ */ o(
          Be,
          {
            placeholder: l[W(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ o(
          Te,
          {
            id: i,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: e.map((c) => /* @__PURE__ */ o(_t, { value: `${c}`, children: l[W(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function lu({ children: e }) {
  return /* @__PURE__ */ o("div", { className: "pr-twp tw-grid", children: e });
}
function cu({
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
function wu({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ o("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ o("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ o($e, {}) : ""
  ] });
}
function ns(e, t) {
  var n;
  return (n = Object.entries(e).find(
    ([, r]) => "menuItem" in r && r.menuItem === t
  )) == null ? void 0 : n[0];
}
function Mn({ icon: e, menuLabel: t, leading: n }) {
  return e ? /* @__PURE__ */ o(
    "img",
    {
      className: h("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: e,
      alt: `${n ? "Leading" : "Trailing"} icon for ${t}`
    }
  ) : void 0;
}
const rs = (e, t, n, r) => n ? Object.entries(e).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => t.filter((l) => l.group === s).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ d(Lt, { children: [
  /* @__PURE__ */ o(Ut, { asChild: !0, children: "command" in l ? /* @__PURE__ */ d(
    Dn,
    {
      onClick: () => {
        r(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ o(Mn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ o(Mn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ d(aw, { children: [
    /* @__PURE__ */ o(ja, { children: l.label }),
    /* @__PURE__ */ o(ow, { children: /* @__PURE__ */ o(za, { children: rs(
      e,
      t,
      ns(e, l.id),
      r
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ o(Rt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function yr({
  onSelectMenuItem: e,
  menuData: t,
  tabLabel: n,
  icon: r,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ d(Se, { variant: s, children: [
    /* @__PURE__ */ o(He, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ o(L, { variant: i, size: "icon", children: r ?? /* @__PURE__ */ o(ei, {}) }) }),
    /* @__PURE__ */ o(we, { align: "start", className: "tw-z-[250]", children: Object.entries(t.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, p) => /* @__PURE__ */ d(No, { children: [
      /* @__PURE__ */ o(Ba, { children: /* @__PURE__ */ o(St, { children: rs(t.groups, t.items, w, e) }) }),
      c < p.length - 1 && /* @__PURE__ */ o(Ke, {})
    ] }, w)) })
  ] });
}
const os = b.forwardRef(
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
function du({
  onSelectProjectMenuItem: e,
  onSelectViewInfoMenuItem: t,
  projectMenuData: n,
  tabViewMenuData: r,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: w,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ d(os, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ o(
      yr,
      {
        onSelectMenuItem: e,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ o(ni, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ o("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    l && /* @__PURE__ */ o("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      r && /* @__PURE__ */ o(
        yr,
        {
          onSelectMenuItem: t,
          menuData: r,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ o(ri, {}),
          className: "tw-h-full"
        }
      ),
      w
    ] })
  ] });
}
function pu({
  onSelectProjectMenuItem: e,
  projectMenuData: t,
  id: n,
  className: r,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ o(os, { className: "tw-pointer-events-none", id: n, children: t && /* @__PURE__ */ o(
    yr,
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
const as = b.forwardRef(({ className: e, ...t }, n) => {
  const r = pt();
  return /* @__PURE__ */ o(
    xt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
      ...t,
      dir: r
    }
  );
});
as.displayName = xt.List.displayName;
const ss = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  xt.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
ss.displayName = xt.List.displayName;
const fd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  xt.Trigger,
  {
    ref: n,
    ...t,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), is = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  xt.Content,
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
is.displayName = xt.Content.displayName;
function uu({
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
        Fr,
        {
          className: s,
          value: t,
          onSearch: n,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ d(as, { children: [
      /* @__PURE__ */ o(ss, { children: e.map((l) => /* @__PURE__ */ o(fd, { value: l.value, children: l.value }, l.key)) }),
      e.map((l) => /* @__PURE__ */ o(is, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function gd({ ...e }) {
  return /* @__PURE__ */ o(ot.Menu, { ...e });
}
function bd({ ...e }) {
  return /* @__PURE__ */ o(ot.Sub, { "data-slot": "menubar-sub", ...e });
}
const ls = b.forwardRef(({ className: e, variant: t = "default", ...n }, r) => {
  const a = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(Br.Provider, { value: a, children: /* @__PURE__ */ o(
    ot.Root,
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
ls.displayName = ot.Root.displayName;
const cs = b.forwardRef(({ className: e, ...t }, n) => {
  const r = It();
  return /* @__PURE__ */ o(
    ot.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Qt({ variant: r.variant, className: e })
        // CUSTOM use context to add variants
      ),
      ...t
    }
  );
});
cs.displayName = ot.Trigger.displayName;
const ws = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => {
  const s = It();
  return /* @__PURE__ */ d(
    ot.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        t && "tw-pl-8",
        Qt({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ o(Ie, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ws.displayName = ot.SubTrigger.displayName;
const ds = b.forwardRef(({ className: e, ...t }, n) => {
  const r = It();
  return /* @__PURE__ */ o(
    ot.SubContent,
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
ds.displayName = ot.SubContent.displayName;
const ps = b.forwardRef(({ className: e, align: t = "start", alignOffset: n = -4, sideOffset: r = 8, ...a }, s) => {
  const i = It();
  return /* @__PURE__ */ o(ot.Portal, { children: /* @__PURE__ */ o(
    ot.Content,
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
ps.displayName = ot.Content.displayName;
const us = b.forwardRef(({ className: e, inset: t, ...n }, r) => {
  const a = It();
  return /* @__PURE__ */ o(
    ot.Item,
    {
      ref: r,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        Qt({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n
    }
  );
});
us.displayName = ot.Item.displayName;
const vd = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => {
  const s = It();
  return /* @__PURE__ */ d(
    ot.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Qt({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(ot.ItemIndicator, { children: /* @__PURE__ */ o(Mt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
vd.displayName = ot.CheckboxItem.displayName;
const xd = b.forwardRef(({ className: e, children: t, ...n }, r) => {
  const a = It();
  return /* @__PURE__ */ d(
    ot.RadioItem,
    {
      ref: r,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Qt({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(ot.ItemIndicator, { children: /* @__PURE__ */ o(In, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
xd.displayName = ot.RadioItem.displayName;
const yd = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  ot.Label,
  {
    ref: r,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
yd.displayName = ot.Label.displayName;
const ms = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  ot.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
ms.displayName = ot.Separator.displayName;
const We = (e, t) => {
  setTimeout(() => {
    t.forEach((n) => {
      var r;
      (r = e.current) == null || r.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, hs = (e, t, n, r) => {
  if (!n) return;
  const a = Object.entries(e).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = t.filter((c) => c.group === s).sort((c, p) => c.order - p.order).map((c) => /* @__PURE__ */ d(Lt, { children: [
      /* @__PURE__ */ o(Ut, { asChild: !0, children: "command" in c ? /* @__PURE__ */ d(
        us,
        {
          onClick: () => {
            r(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ o(Mn, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ o(Mn, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ d(bd, { children: [
        /* @__PURE__ */ o(ws, { children: c.label }),
        /* @__PURE__ */ o(ds, { children: hs(
          e,
          t,
          ns(e, c.id),
          r
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ o(Rt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), w = [...l];
    return l.length > 0 && i < a.length - 1 && w.push(/* @__PURE__ */ o(ms, {}, `separator-${s}`)), w;
  });
};
function Nd({
  menuData: e,
  onSelectMenuItem: t,
  onOpenChange: n,
  variant: r
}) {
  const a = Z(void 0), s = Z(void 0), i = Z(void 0), l = Z(void 0), w = Z(void 0), c = (p) => {
    switch (p) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return l;
      case "platform.help":
        return w;
      default:
        return;
    }
  };
  if (wl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, m) => {
    var g, x, v, N;
    p.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        We(s, [f]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), We(s, [f, u]);
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), We(i, [f, u]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), We(l, [f, u]);
        break;
      case "alt+h":
        (N = w.current) == null || N.focus(), We(w, [f, u]);
        break;
    }
  }), q(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          n(x === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      p.observe(u, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!e)
    return /* @__PURE__ */ o(ls, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: r, children: Object.entries(e.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, m]) => typeof p == "boolean" || typeof m == "boolean" ? 0 : p.order - m.order).map(([p, m]) => /* @__PURE__ */ d(gd, { children: [
      /* @__PURE__ */ o(cs, { ref: c(p), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ o(
        ps,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ o(St, { children: hs(e.groups, e.items, p, t) })
        }
      )
    ] }, p)) });
}
function mu(e) {
  switch (e) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function hu({
  menuData: e,
  onOpenChange: t,
  onSelectMenuItem: n,
  className: r,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: w,
  menubarVariant: c = "default"
}) {
  const p = Z(void 0);
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
          style: w ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ o("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  e && /* @__PURE__ */ o(
                    Nd,
                    {
                      menuData: e,
                      onOpenChange: t,
                      onSelectMenuItem: n,
                      variant: c
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ o(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ o("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ o(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: l
              }
            ) })
          ]
        }
      )
    }
  );
}
const kd = (e, t) => e[t] ?? t;
function fu({
  knownUiLanguages: e,
  primaryLanguage: t = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: r,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: w
}) {
  const c = kd(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, m] = M(!1), f = (g) => {
    a && a(g), r && r([g, ...n.filter((x) => x !== g)]), s && n.find((x) => x === g) && s([...n.filter((x) => x !== g)]), m(!1);
  }, u = (g, x) => {
    var N, k, T, V, $, P;
    const v = x !== g ? ((k = (N = e[g]) == null ? void 0 : N.uiNames) == null ? void 0 : k[x]) ?? ((V = (T = e[g]) == null ? void 0 : T.uiNames) == null ? void 0 : V.en) : void 0;
    return v ? `${($ = e[g]) == null ? void 0 : $.autonym} (${v})` : (P = e[g]) == null ? void 0 : P.autonym;
  };
  return /* @__PURE__ */ d("div", { id: w, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ d(
      Le,
      {
        name: "uiLanguage",
        value: t,
        onValueChange: f,
        open: p,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ o(Ee, { children: /* @__PURE__ */ o(Be, {}) }),
          /* @__PURE__ */ o(
            Te,
            {
              className: "tw-z-[250]",
              children: Object.keys(e).map((g) => /* @__PURE__ */ o(_t, { value: g, children: u(g, t) }, g))
            }
          )
        ]
      }
    ),
    t !== "en" && /* @__PURE__ */ o("div", { className: "tw-pt-3", children: /* @__PURE__ */ o(dt, { className: "tw-font-normal tw-text-muted-foreground", children: ve(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, t)).join(", ") : e.en.autonym
    }) }) })
  ] });
}
function _d({ item: e, createLabel: t, createComplexLabel: n }) {
  return t ? /* @__PURE__ */ o(dt, { children: t(e) }) : n ? /* @__PURE__ */ o(dt, { children: n(e) }) : /* @__PURE__ */ o(dt, { children: e });
}
function gu({
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
      zr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(l),
        onCheckedChange: (w) => a(l, w)
      }
    ),
    /* @__PURE__ */ o(
      _d,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function bu({
  cardKey: e,
  isSelected: t,
  onSelect: n,
  isDenied: r,
  isHidden: a = !1,
  className: s,
  children: i,
  dropdownContent: l,
  additionalSelectedContent: w,
  accentColor: c
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (m) => {
        (m.key === "Enter" || m.key === " ") && (m.preventDefault(), n());
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
            t && l && /* @__PURE__ */ d(Se, { children: [
              /* @__PURE__ */ o(He, { className: h(c && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ o(L, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ o(Eo, {}) }) }),
              /* @__PURE__ */ o(we, { align: "end", children: l })
            ] })
          ] }),
          t && w && /* @__PURE__ */ o("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: w })
        ] }),
        c && /* @__PURE__ */ o(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${c}`
          }
        )
      ]
    },
    e
  );
}
const Cd = wn(({ className: e, ...t }, n) => /* @__PURE__ */ o(oi, { size: 35, className: h("tw-animate-spin", e), ...t, ref: n }));
Cd.displayName = "Spinner";
function vu({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: w,
  defaultValue: c,
  value: p,
  onChange: m,
  onFocus: f,
  onBlur: u
}) {
  return /* @__PURE__ */ d("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ o(
      dt,
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
      Xe,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: h(w, { "tw-border-red-600": n }),
        defaultValue: c,
        value: p,
        onChange: m,
        onFocus: f,
        onBlur: u
      }
    ),
    /* @__PURE__ */ o("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const Ed = ie(
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
), Td = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ o(
  "div",
  {
    ref: r,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      Ed({ variant: t }),
      e
    ),
    ...n
  }
));
Td.displayName = "Alert";
const Sd = b.forwardRef(
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
Sd.displayName = "AlertTitle";
const Rd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
Rd.displayName = "AlertDescription";
const xu = at.Root, yu = at.Trigger, Nu = at.Group, ku = at.Portal, _u = at.Sub, Cu = at.RadioGroup, Dd = b.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => /* @__PURE__ */ d(
  at.SubTrigger,
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
      /* @__PURE__ */ o(Ie, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Dd.displayName = at.SubTrigger.displayName;
const Md = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  at.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Md.displayName = at.SubContent.displayName;
const Od = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(at.Portal, { children: /* @__PURE__ */ o(
  at.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
Od.displayName = at.Content.displayName;
const Id = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  at.Item,
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
Id.displayName = at.Item.displayName;
const Ad = b.forwardRef(({ className: e, children: t, checked: n, ...r }, a) => /* @__PURE__ */ d(
  at.CheckboxItem,
  {
    ref: a,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(at.ItemIndicator, { children: /* @__PURE__ */ o(Mt, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
Ad.displayName = at.CheckboxItem.displayName;
const Pd = b.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ d(
  at.RadioItem,
  {
    ref: r,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ o("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ o(at.ItemIndicator, { children: /* @__PURE__ */ o(In, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
Pd.displayName = at.RadioItem.displayName;
const Vd = b.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ o(
  at.Label,
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
Vd.displayName = at.Label.displayName;
const $d = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  at.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
$d.displayName = at.Separator.displayName;
function Ld({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
Ld.displayName = "ContextMenuShortcut";
const fs = b.createContext({
  direction: "bottom"
});
function Bd({
  shouldScaleBackground: e = !0,
  direction: t = "bottom",
  ...n
}) {
  const r = b.useMemo(() => ({ direction: t }), [t]);
  return /* @__PURE__ */ o(fs.Provider, { value: r, children: /* @__PURE__ */ o(
    Ot.Root,
    {
      shouldScaleBackground: e,
      direction: t,
      ...n
    }
  ) });
}
Bd.displayName = "Drawer";
const Eu = Ot.Trigger, jd = Ot.Portal, Tu = Ot.Close, gs = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ot.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", e),
    ...t
  }
));
gs.displayName = Ot.Overlay.displayName;
const zd = b.forwardRef(({ className: e, children: t, hideDrawerHandle: n = !1, ...r }, a) => {
  const { direction: s = "bottom" } = b.useContext(fs), i = {
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
  return /* @__PURE__ */ d(jd, { children: [
    /* @__PURE__ */ o(gs, {}),
    /* @__PURE__ */ d(
      Ot.Content,
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
zd.displayName = "DrawerContent";
function Fd({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", e),
      ...t
    }
  );
}
Fd.displayName = "DrawerHeader";
function Gd({ className: e, ...t }) {
  return /* @__PURE__ */ o("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", e), ...t });
}
Gd.displayName = "DrawerFooter";
const Ud = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ot.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Ud.displayName = Ot.Title.displayName;
const Hd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  Ot.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Hd.displayName = Ot.Description.displayName;
const Kd = b.forwardRef(({ className: e, value: t, ...n }, r) => /* @__PURE__ */ o(
  wr.Root,
  {
    ref: r,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      e
    ),
    ...n,
    children: /* @__PURE__ */ o(
      wr.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (t || 0)}%)` }
      }
    )
  }
));
Kd.displayName = wr.Root.displayName;
function Su({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ o(
    Cr.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        e
      ),
      ...t
    }
  );
}
const Ru = Cr.Panel;
function Du({
  withHandle: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ o(
    Cr.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        t
      ),
      ...n,
      children: e && /* @__PURE__ */ o("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ o(ai, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Mu({ ...e }) {
  return /* @__PURE__ */ o(
    dl,
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
const Xd = b.forwardRef(({ className: e, ...t }, n) => {
  const r = pt();
  return /* @__PURE__ */ d(
    Ze.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        e
      ),
      ...t,
      dir: r,
      children: [
        /* @__PURE__ */ o(Ze.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ o(Ze.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ o(Ze.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Xd.displayName = Ze.Root.displayName;
const Yd = b.forwardRef(({ className: e, ...t }, n) => {
  const r = pt();
  return /* @__PURE__ */ o(
    dr.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        e
      ),
      ...t,
      ref: n,
      children: /* @__PURE__ */ o(
        dr.Thumb,
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
Yd.displayName = dr.Root.displayName;
const Ou = xt.Root, qd = b.forwardRef(({ className: e, ...t }, n) => {
  const r = pt();
  return /* @__PURE__ */ o(
    xt.List,
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
qd.displayName = xt.List.displayName;
const Jd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  xt.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
Jd.displayName = xt.Trigger.displayName;
const Wd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o(
  xt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Wd.displayName = xt.Content.displayName;
const Zd = b.forwardRef(
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
Zd.displayName = "Textarea";
const Iu = (e, t) => {
  q(() => {
    if (!e) return () => {
    };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
};
function Qd(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const tp = (e, t, n = {}) => {
  const r = Z(t);
  r.current = t;
  const a = Z(n);
  a.current = Qd(a.current);
  const [s, i] = M(() => r.current), [l, w] = M(!0);
  return q(() => {
    let c = !0;
    return w(!!e), (async () => {
      if (e) {
        const p = await e();
        c && (i(() => p), w(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || i(() => r.current);
    };
  }, [e]), [s, l];
}, nr = () => !1, Au = (e, t) => {
  const [n] = tp(
    z(async () => {
      if (!e) return nr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    nr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  q(() => () => {
    n !== nr && n();
  }, [n]);
};
function Pu(e) {
  q(() => {
    let t;
    return e && (t = document.createElement("style"), t.appendChild(document.createTextNode(e)), document.head.appendChild(t)), () => {
      t && document.head.removeChild(t);
    };
  }, [e]);
}
function ep(e, t = "top") {
  if (!e || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(a, r) : n.appendChild(a);
}
ep(`*, ::before, ::after {
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
  quotes: "“""”""‘""’";
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
.tw-prose-quoteless :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose-quoteless :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
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

.footnote-editor .immutable-note-caller {
  display: none;
}

/* Need to be able to override the styles for the editor that happens to have an underscore */
/* stylelint-disable selector-class-pattern */
.footnote-editor .text-spacing .usfm_p {
  text-indent: 0;
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
  Td as Alert,
  Rd as AlertDescription,
  Sd as AlertTitle,
  $a as Avatar,
  La as AvatarFallback,
  rw as AvatarImage,
  Dp as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Mp as BOOK_SELECTOR_STRING_KEYS,
  Ve as Badge,
  Rp as BookChapterControl,
  Ll as BookSelectionMode,
  Op as BookSelector,
  L as Button,
  Ap as COMMENT_EDITOR_STRING_KEYS,
  Pp as COMMENT_LIST_STRING_KEYS,
  Pa as Card,
  Va as CardContent,
  ew as CardDescription,
  nw as CardFooter,
  Qc as CardHeader,
  tw as CardTitle,
  $l as ChapterRangeSelector,
  zr as Checkbox,
  gu as Checklist,
  ur as ComboBox,
  Jt as Command,
  un as CommandEmpty,
  Yt as CommandGroup,
  Ge as CommandInput,
  Bt as CommandItem,
  Wt as CommandList,
  Ip as CommentEditor,
  Vp as CommentList,
  xu as ContextMenu,
  Ad as ContextMenuCheckboxItem,
  Od as ContextMenuContent,
  Nu as ContextMenuGroup,
  Id as ContextMenuItem,
  Vd as ContextMenuLabel,
  ku as ContextMenuPortal,
  Cu as ContextMenuRadioGroup,
  Pd as ContextMenuRadioItem,
  $d as ContextMenuSeparator,
  Ld as ContextMenuShortcut,
  _u as ContextMenuSub,
  Md as ContextMenuSubContent,
  Dd as ContextMenuSubTrigger,
  yu as ContextMenuTrigger,
  yw as DataTable,
  Bd as Drawer,
  Tu as DrawerClose,
  zd as DrawerContent,
  Hd as DrawerDescription,
  Gd as DrawerFooter,
  Fd as DrawerHeader,
  gs as DrawerOverlay,
  jd as DrawerPortal,
  Ud as DrawerTitle,
  Eu as DrawerTrigger,
  Se as DropdownMenu,
  Ht as DropdownMenuCheckboxItem,
  we as DropdownMenuContent,
  Ba as DropdownMenuGroup,
  Dn as DropdownMenuItem,
  _w as DropdownMenuItemType,
  mn as DropdownMenuLabel,
  ow as DropdownMenuPortal,
  sw as DropdownMenuRadioGroup,
  Fa as DropdownMenuRadioItem,
  Ke as DropdownMenuSeparator,
  iw as DropdownMenuShortcut,
  aw as DropdownMenuSub,
  za as DropdownMenuSubContent,
  ja as DropdownMenuSubTrigger,
  He as DropdownMenuTrigger,
  Nw as ERROR_DUMP_STRING_KEYS,
  Lp as ERROR_POPOVER_STRING_KEYS,
  kw as ErrorDump,
  Bp as ErrorPopover,
  Hp as FOOTNOTE_EDITOR_STRING_KEYS,
  Gp as Filter,
  jp as FilterDropdown,
  Fp as Footer,
  Up as FootnoteEditor,
  $w as FootnoteItem,
  Kp as FootnoteList,
  Qp as INVENTORY_STRING_KEYS,
  Xe as Input,
  tu as Inventory,
  dt as Label,
  eu as MARKER_MENU_STRING_KEYS,
  $p as MarkdownRenderer,
  nu as MarkerMenu,
  zp as MoreInfo,
  Ew as MultiSelectComboBox,
  uu as NavigationContentSearch,
  le as Popover,
  Tp as PopoverAnchor,
  Zt as PopoverContent,
  ce as PopoverTrigger,
  Kd as Progress,
  Mr as RadioGroup,
  Tn as RadioGroupItem,
  Ml as RecentSearches,
  Du as ResizableHandle,
  Ru as ResizablePanel,
  Su as ResizablePanelGroup,
  bu as ResultsCard,
  au as SCOPE_SELECTOR_STRING_KEYS,
  su as ScopeSelector,
  ou as ScriptureResultsViewer,
  iu as ScrollGroupSelector,
  Fr as SearchBar,
  Le as Select,
  Te as SelectContent,
  ww as SelectGroup,
  _t as SelectItem,
  pw as SelectLabel,
  Ua as SelectScrollDownButton,
  Ga as SelectScrollUpButton,
  uw as SelectSeparator,
  Ee as SelectTrigger,
  Be as SelectValue,
  $e as Separator,
  lu as SettingsList,
  wu as SettingsListHeader,
  cu as SettingsListItem,
  sd as SettingsSidebar,
  ru as SettingsSidebarContentSearch,
  Ya as Sidebar,
  Ja as SidebarContent,
  Jw as SidebarFooter,
  br as SidebarGroup,
  Zw as SidebarGroupAction,
  xr as SidebarGroupContent,
  vr as SidebarGroupLabel,
  qw as SidebarHeader,
  Yw as SidebarInput,
  qa as SidebarInset,
  Wa as SidebarMenu,
  td as SidebarMenuAction,
  ed as SidebarMenuBadge,
  Qa as SidebarMenuButton,
  Za as SidebarMenuItem,
  nd as SidebarMenuSkeleton,
  rd as SidebarMenuSub,
  ad as SidebarMenuSubButton,
  od as SidebarMenuSubItem,
  Xa as SidebarProvider,
  Xw as SidebarRail,
  Ww as SidebarSeparator,
  Kw as SidebarTrigger,
  gr as Skeleton,
  Xd as Slider,
  Mu as Sonner,
  Cd as Spinner,
  Yd as Switch,
  yr as TabDropdownMenu,
  pu as TabFloatingMenu,
  du as TabToolbar,
  Ln as Table,
  jn as TableBody,
  xw as TableCaption,
  ke as TableCell,
  fw as TableFooter,
  cn as TableHead,
  Bn as TableHeader,
  Gt as TableRow,
  Ou as Tabs,
  Wd as TabsContent,
  qd as TabsList,
  Jd as TabsTrigger,
  vu as TextField,
  Zd as Textarea,
  $r as ToggleGroup,
  rn as ToggleGroupItem,
  hu as Toolbar,
  Lt as Tooltip,
  Rt as TooltipContent,
  St as TooltipProvider,
  Ut as TooltipTrigger,
  fu as UiLanguageSelector,
  as as VerticalTabs,
  is as VerticalTabsContent,
  ss as VerticalTabsList,
  fd as VerticalTabsTrigger,
  Zc as badgeVariants,
  Dl as buttonVariants,
  h as cn,
  Zp as getBookIdFromUSFM,
  Jp as getLinesFromUSFM,
  Wp as getNumberFromUSFM,
  zw as getStatusForItem,
  mu as getToolbarOSReservedSpaceClassName,
  Yp as inventoryCountColumn,
  Xp as inventoryItemColumn,
  qp as inventoryStatusColumn,
  dw as selectTriggerVariants,
  Lu as sonner,
  Iu as useEvent,
  Au as useEventAsync,
  Wc as useListbox,
  tp as usePromise,
  Sp as useRecentSearches,
  Fn as useSidebar,
  Pu as useStylesheet
};
//# sourceMappingURL=index.js.map
