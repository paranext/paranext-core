import { jsxs as me, jsx as w, Fragment as Hr } from "react/jsx-runtime";
import { ChevronRight as Wr, Check as Gr, Circle as qr, Search as Xr, History as Yr } from "lucide-react";
import * as oe from "react";
import { useMemo as _n, useState as Be, useCallback as Ke, useRef as Sn, useEffect as tn } from "react";
import * as Y from "@radix-ui/react-dropdown-menu";
import Kr, { clsx as Jr } from "clsx";
import { twMerge as Zr } from "tailwind-merge";
import { Button as Qr, Autocomplete as et, TextField as xr, FormControlLabel as Fn, FormLabel as nt, Checkbox as rt, MenuItem as tt, Grid as kr, IconButton as Sr, Paper as ot, Slider as at, Snackbar as it, Switch as st, AppBar as ct, Toolbar as lt, Drawer as ut } from "@mui/material";
import { offsetBook as Ln, FIRST_SCR_BOOK_NUM as dt, offsetChapter as Un, FIRST_SCR_CHAPTER_NUM as ft, getChaptersForBook as pt, offsetVerse as Hn, FIRST_SCR_VERSE_NUM as ht } from "platform-bible-utils";
import mt, { SelectColumn as gt } from "react-data-grid";
import bt, { ThemeContext as yt, internal_processStyles as vt } from "@mui/styled-engine";
function we(...e) {
  return Zr(Jr(e));
}
const wt = Y.Root, xt = Y.Trigger, kt = oe.forwardRef(({ className: e, inset: n, children: r, ...t }, o) => /* @__PURE__ */ me(
  Y.SubTrigger,
  {
    ref: o,
    className: we(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      n && "pr-pl-8",
      e
    ),
    ...t,
    children: [
      r,
      /* @__PURE__ */ w(Wr, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
kt.displayName = Y.SubTrigger.displayName;
const St = oe.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ w(
  Y.SubContent,
  {
    ref: r,
    className: we(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
St.displayName = Y.SubContent.displayName;
const Er = oe.forwardRef(({ className: e, sideOffset: n = 4, ...r }, t) => /* @__PURE__ */ w(Y.Portal, { children: /* @__PURE__ */ w(
  Y.Content,
  {
    ref: t,
    sideOffset: n,
    className: we(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Er.displayName = Y.Content.displayName;
const Et = oe.forwardRef(({ className: e, inset: n, ...r }, t) => /* @__PURE__ */ w(
  Y.Item,
  {
    ref: t,
    className: we(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      n && "pr-pl-8",
      e
    ),
    ...r
  }
));
Et.displayName = Y.Item.displayName;
const Ct = oe.forwardRef(({ className: e, children: n, checked: r, ...t }, o) => /* @__PURE__ */ me(
  Y.CheckboxItem,
  {
    ref: o,
    className: we(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...t,
    children: [
      /* @__PURE__ */ w("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ w(Y.ItemIndicator, { children: /* @__PURE__ */ w(Gr, { className: "pr-h-4 pr-w-4" }) }) }),
      n
    ]
  }
));
Ct.displayName = Y.CheckboxItem.displayName;
const Tt = oe.forwardRef(({ className: e, children: n, ...r }, t) => /* @__PURE__ */ me(
  Y.RadioItem,
  {
    ref: t,
    className: we(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ w("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ w(Y.ItemIndicator, { children: /* @__PURE__ */ w(qr, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      n
    ]
  }
));
Tt.displayName = Y.RadioItem.displayName;
const _t = oe.forwardRef(({ className: e, inset: n, ...r }, t) => /* @__PURE__ */ w(
  Y.Label,
  {
    ref: t,
    className: we("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", n && "pr-pl-8", e),
    ...r
  }
));
_t.displayName = Y.Label.displayName;
const Ot = oe.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ w(
  Y.Separator,
  {
    ref: r,
    className: we("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...n
  }
));
Ot.displayName = Y.Separator.displayName;
const Cr = oe.forwardRef(
  ({ className: e, type: n, ...r }, t) => /* @__PURE__ */ w(
    "input",
    {
      type: n,
      className: we(
        "pr-flex pr-h-10 pr-w-full pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: t,
      ...r
    }
  )
);
Cr.displayName = "Input";
function Nt({
  // handleSearch,
  // handleClick,
  value: e,
  placeholder: n
}) {
  return /* @__PURE__ */ w(
    Cr,
    {
      className: "book-chapter-input",
      placeholder: n,
      type: "text",
      value: e
    }
  );
}
function Rt({ endChapter: e, activeChapter: n, handleSelectChapter: r }) {
  const t = Array.from({ length: e }, (o, a) => a + 1);
  return /* @__PURE__ */ w("div", { className: "chapter-select", children: t.map((o) => (
    // When adding onClick to <div> get error: Visible, non-interactive elements with click handlers must have at least one keyboard listener.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ w(
      "div",
      {
        className: `chapter ${o === n ? "active" : void 0}`,
        onClick: () => r(o),
        children: o
      },
      o
    )
  )) });
}
function Di() {
  return /* @__PURE__ */ w("div", { children: /* @__PURE__ */ me(wt, { children: [
    /* @__PURE__ */ w(
      Xr,
      {
        style: {
          position: "absolute",
          left: "8px",
          top: "32px",
          color: "gray",
          width: "16px"
        }
      }
    ),
    /* @__PURE__ */ w(xt, { style: { backgroundColor: "transparent", border: "none" }, children: /* @__PURE__ */ w(
      Nt,
      {
        value: "Hello",
        placeholder: "Hello"
      }
    ) }),
    /* @__PURE__ */ w(
      Yr,
      {
        style: {
          position: "absolute",
          left: "276px",
          top: "32px",
          cursor: "pointer",
          width: "16px"
        },
        onClick: () => {
          console.log("back in history");
        }
      }
    ),
    /* @__PURE__ */ w(Er, { children: /* @__PURE__ */ w(
      Rt,
      {
        endChapter: 30,
        handleSelectChapter: (e) => {
          throw new Error(`Function not implemented. ${e}`);
        },
        activeChapter: 0
      }
    ) })
  ] }) });
}
function Re({
  id: e,
  isDisabled: n = !1,
  className: r,
  onClick: t,
  onContextMenu: o,
  children: a
}) {
  return /* @__PURE__ */ w(
    Qr,
    {
      id: e,
      disabled: n,
      className: `papi-button ${r ?? ""}`,
      onClick: t,
      onContextMenu: o,
      children: a
    }
  );
}
function En({
  id: e,
  title: n,
  isDisabled: r = !1,
  isClearable: t = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: i,
  options: l = [],
  className: c,
  value: s,
  onChange: u,
  onFocus: p,
  onBlur: d,
  getOptionLabel: v
}) {
  return /* @__PURE__ */ w(
    et,
    {
      id: e,
      disablePortal: !0,
      disabled: r,
      disableClearable: !t,
      fullWidth: a,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: s,
      onChange: u,
      onFocus: p,
      onBlur: d,
      getOptionLabel: v,
      renderInput: (b) => /* @__PURE__ */ w(
        xr,
        {
          ...b,
          error: o,
          fullWidth: a,
          disabled: r,
          label: n,
          style: { width: i }
        }
      )
    }
  );
}
function ji({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: r,
  handleSelectEndChapter: t,
  isDisabled: o,
  chapterCount: a
}) {
  const i = _n(
    () => Array.from({ length: a }, (s, u) => u + 1),
    [a]
  ), l = (s, u) => {
    r(u), u > n && t(u);
  }, c = (s, u) => {
    t(u), u < e && r(u);
  };
  return /* @__PURE__ */ me(Hr, { children: [
    /* @__PURE__ */ w(
      Fn,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ w(
          En,
          {
            onChange: (s, u) => l(s, u),
            className: "book-selection-chapter",
            isClearable: !1,
            options: i,
            getOptionLabel: (s) => s.toString(),
            value: e,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ w(
      Fn,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ w(
          En,
          {
            onChange: (s, u) => c(s, u),
            className: "book-selection-chapter",
            isClearable: !1,
            options: i,
            getOptionLabel: (s) => s.toString(),
            value: n,
            isDisabled: o
          },
          "end chapter"
        ),
        label: "to",
        labelPlacement: "start"
      }
    )
  ] });
}
var ze = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(ze || {});
function $t({
  id: e,
  isChecked: n,
  labelText: r = "",
  labelPosition: t = ze.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: s
}) {
  const u = /* @__PURE__ */ w(
    rt,
    {
      id: e,
      checked: n,
      indeterminate: o,
      defaultChecked: a,
      disabled: i,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: s
    }
  );
  let p;
  if (r) {
    const d = t === ze.Before || t === ze.Above, v = /* @__PURE__ */ w("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), b = t === ze.Before || t === ze.After, h = b ? v : /* @__PURE__ */ w("div", { children: v }), f = b ? u : /* @__PURE__ */ w("div", { children: u });
    p = /* @__PURE__ */ me(
      nt,
      {
        className: `papi-checkbox ${t.toString()}`,
        disabled: i,
        error: l,
        children: [
          d && h,
          f,
          !d && h
        ]
      }
    );
  } else
    p = u;
  return p;
}
function At(e) {
  const {
    onClick: n,
    name: r,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: i = !1,
    hasDivider: l = !1,
    focusVisibleClassName: c,
    id: s,
    children: u
  } = e;
  return /* @__PURE__ */ w(
    tt,
    {
      autoFocus: t,
      className: o,
      dense: a,
      disableGutters: i,
      divider: l,
      focusVisibleClassName: c,
      onClick: n,
      id: s,
      children: r || u
    }
  );
}
function Pt({ commandHandler: e, name: n, className: r, items: t, id: o }) {
  return /* @__PURE__ */ me(kr, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${r ?? ""}`, children: [
    /* @__PURE__ */ w("h3", { className: `papi-menu ${r ?? ""}`, children: n }),
    t.map((a, i) => /* @__PURE__ */ w(
      At,
      {
        className: `papi-menu-item ${a.className}`,
        onClick: () => {
          e(a);
        },
        ...a
      },
      i
    ))
  ] });
}
function It({ commandHandler: e, className: n, columns: r, id: t }) {
  return /* @__PURE__ */ w(
    kr,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${n ?? ""}`,
      columns: r.length,
      id: t,
      children: r.map((o, a) => /* @__PURE__ */ w(
        Pt,
        {
          commandHandler: e,
          name: o.name,
          className: n,
          items: o.items
        },
        a
      ))
    }
  );
}
function Vi({
  id: e,
  label: n,
  isDisabled: r = !1,
  tooltip: t,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: s
}) {
  return /* @__PURE__ */ w(
    Sr,
    {
      id: e,
      disabled: r,
      edge: a,
      size: i,
      "aria-label": n,
      title: o ? void 0 : t ?? n,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: s
    }
  );
}
var Mt = Object.defineProperty, zt = (e, n, r) => n in e ? Mt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, A = (e, n, r) => (zt(e, typeof n != "symbol" ? n + "" : n, r), r);
const _e = [
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
], On = [
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
], Tr = [
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
], Wn = Gt();
function Fe(e, n = !0) {
  return n && (e = e.toUpperCase()), e in Wn ? Wn[e] : 0;
}
function Nn(e) {
  return Fe(e) > 0;
}
function Bt(e) {
  const n = typeof e == "string" ? Fe(e) : e;
  return n >= 40 && n <= 66;
}
function Dt(e) {
  return (typeof e == "string" ? Fe(e) : e) <= 39;
}
function _r(e) {
  return e <= 66;
}
function jt(e) {
  const n = typeof e == "string" ? Fe(e) : e;
  return Rr(n) && !_r(n);
}
function* Vt() {
  for (let e = 1; e <= _e.length; e++)
    yield e;
}
const Ft = 1, Or = _e.length;
function Lt() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Rn(e, n = "***") {
  const r = e - 1;
  return r < 0 || r >= _e.length ? n : _e[r];
}
function Nr(e) {
  return e <= 0 || e > Or ? "******" : Tr[e - 1];
}
function Ut(e) {
  return Nr(Fe(e));
}
function Rr(e) {
  const n = typeof e == "number" ? Rn(e) : e;
  return Nn(n) && !On.includes(n);
}
function Ht(e) {
  const n = typeof e == "number" ? Rn(e) : e;
  return Nn(n) && On.includes(n);
}
function Wt(e) {
  return Tr[e - 1].includes("*obsolete*");
}
function Gt() {
  const e = {};
  for (let n = 0; n < _e.length; n++)
    e[_e[n]] = n + 1;
  return e;
}
const ye = {
  allBookIds: _e,
  nonCanonicalIds: On,
  bookIdToNumber: Fe,
  isBookIdValid: Nn,
  isBookNT: Bt,
  isBookOT: Dt,
  isBookOTNT: _r,
  isBookDC: jt,
  allBookNumbers: Vt,
  firstBook: Ft,
  lastBook: Or,
  extraBooks: Lt,
  bookNumberToId: Rn,
  bookNumberToEnglishName: Nr,
  bookIdToEnglishName: Ut,
  isCanonical: Rr,
  isExtraMaterial: Ht,
  isObsolete: Wt
};
var ke = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(ke || {});
const Te = class {
  // private versInfo: Versification;
  constructor(e) {
    if (A(this, "name"), A(this, "fullPath"), A(this, "isPresent"), A(this, "hasVerseSegments"), A(this, "isCustomized"), A(this, "baseVersification"), A(this, "scriptureBooks"), A(this, "_type"), e != null)
      typeof e == "string" ? this.name = e : this._type = e;
    else
      throw new Error("Argument null");
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
let se = Te;
A(se, "Original", new Te(ke.Original)), A(se, "Septuagint", new Te(ke.Septuagint)), A(se, "Vulgate", new Te(ke.Vulgate)), A(se, "English", new Te(ke.English)), A(se, "RussianProtestant", new Te(ke.RussianProtestant)), A(se, "RussianOrthodox", new Te(ke.RussianOrthodox));
function Gn(e, n) {
  const r = n[0];
  for (let t = 1; t < n.length; t++)
    e = e.split(n[t]).join(r);
  return e.split(r);
}
var $r = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))($r || {});
const $ = class {
  constructor(e, n, r, t) {
    if (A(this, "firstChapter"), A(this, "lastChapter"), A(this, "lastVerse"), A(this, "hasSegmentsDefined"), A(this, "text"), A(this, "BBBCCCVVVS"), A(this, "longHashCode"), A(this, "versification"), A(this, "rtlMark", "‏"), A(this, "_bookNum", 0), A(this, "_chapterNum", 0), A(this, "_verseNum", 0), A(this, "_verse"), r == null && t == null)
      if (e != null && typeof e == "string") {
        const o = e, a = n != null && n instanceof se ? n : void 0;
        this.setEmpty(a), this.parse(o);
      } else if (e != null && typeof e == "number") {
        const o = n != null && n instanceof se ? n : void 0;
        this.setEmpty(o), this._verseNum = e % $.chapterDigitShifter, this._chapterNum = Math.floor(
          e % $.bookDigitShifter / $.chapterDigitShifter
        ), this._bookNum = Math.floor(e / $.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof $) {
          const o = e;
          this._bookNum = o.bookNum, this._chapterNum = o.chapterNum, this._verseNum = o.verseNum, this._verse = o.verse, this.versification = o.versification;
        } else {
          if (e == null)
            return;
          const o = e instanceof se ? e : $.defaultVersification;
          this.setEmpty(o);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(t), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = t ?? $.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, n = $.defaultVersification) {
    const r = new $(n);
    return r.parse(e), r;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(e) {
    return e.length > 0 && "0123456789".includes(e[0]) && !e.endsWith(this.verseRangeSeparator) && !e.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(e) {
    let n;
    try {
      return n = $.parse(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Le)
        return n = new $(), { success: !1, verseRef: n };
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
  static getBBBCCCVVV(e, n, r) {
    return e % $.bcvMaxValue * $.bookDigitShifter + (n >= 0 ? n % $.bcvMaxValue * $.chapterDigitShifter : 0) + (r >= 0 ? r % $.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let n;
    if (!e)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let r;
    for (let t = 0; t < e.length; t++) {
      if (r = e[t], r < "0" || r > "9")
        return t === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +r - +"0", n > $.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes($.verseRangeSeparator) || this._verse.includes($.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ye.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = ye.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const n = +e;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: n, vNum: r } = $.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = $.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > ye.lastBook)
      throw new Le(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = e;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(e) {
    this.chapterNum = e;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(e) {
    this._verseNum = e;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var e;
    return (e = this.versification) == null ? void 0 : e.name;
  }
  set versificationStr(e) {
    this.versification = this.versification != null ? new se(e) : void 0;
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
    return this.validateVerse($.verseRangeSeparators, $.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return $.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return $.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
  parse(e) {
    if (e = e.replace(this.rtlMark, ""), e.includes("/")) {
      const o = e.split("/");
      if (e = o[0], o.length > 1)
        try {
          const a = +o[1].trim();
          this.versification = new se(ke[a]);
        } catch {
          throw new Le("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Le("Invalid reference : " + e);
    const r = n[1].split(":"), t = +r[0];
    if (r.length !== 2 || ye.bookIdToNumber(n[0]) === 0 || !Number.isInteger(t) || t < 0 || !$.isVerseParseable(r[1]))
      throw new Le("Invalid reference : " + e);
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
    return new $(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(e) {
    return e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e._verse === this._verse && e.versification != null && this.versification != null && e.versification.equals(this.versification);
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
  allVerses(e = !1, n = $.verseRangeSeparators, r = $.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const t = [], o = Gn(this._verse, r);
    for (const a of o.map((i) => Gn(i, n))) {
      const i = this.clone();
      i.verse = a[0];
      const l = i.verseNum;
      if (t.push(i), a.length > 1) {
        const c = this.clone();
        if (c.verse = a[1], !e)
          for (let s = l + 1; s < c.verseNum; s++) {
            const u = new $(
              this._bookNum,
              this._chapterNum,
              s,
              this.versification
            );
            this.isExcluded || t.push(u);
          }
        t.push(c);
      }
    }
    return t;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const t of this.allVerses(!0, e, n)) {
      const o = t.internalValid;
      if (o !== 0)
        return o;
      const a = t.BBBCCCVVV;
      if (r > a)
        return 3;
      if (r === a)
        return 4;
      r = a;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ye.lastBook ? 2 : 0;
  }
  setEmpty(e = $.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = ye.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
let be = $;
A(be, "defaultVersification", se.English), A(be, "verseRangeSeparator", "-"), A(be, "verseSequenceIndicator", ","), A(be, "verseRangeSeparators", [$.verseRangeSeparator]), A(be, "verseSequenceIndicators", [$.verseSequenceIndicator]), A(be, "chapterDigitShifter", 1e3), A(be, "bookDigitShifter", $.chapterDigitShifter * $.chapterDigitShifter), A(be, "bcvMaxValue", $.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
A(be, "ValidStatusType", $r);
class Le extends Error {
}
function Qe({
  variant: e = "outlined",
  id: n,
  isDisabled: r = !1,
  hasError: t = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: i,
  placeholder: l,
  isRequired: c = !1,
  className: s,
  defaultValue: u,
  value: p,
  onChange: d,
  onFocus: v,
  onBlur: b
}) {
  return /* @__PURE__ */ w(
    xr,
    {
      variant: e,
      id: n,
      disabled: r,
      error: t,
      fullWidth: o,
      helperText: a,
      label: i,
      placeholder: l,
      required: c,
      className: `papi-textfield ${s ?? ""}`,
      defaultValue: u,
      value: p,
      onChange: d,
      onFocus: v,
      onBlur: b
    }
  );
}
let pn;
const hn = () => (pn || (pn = ye.allBookIds.map((e) => ({
  bookId: e,
  label: ye.bookIdToEnglishName(e)
}))), pn);
function Fi({ scrRef: e, handleSubmit: n, id: r }) {
  const t = (c) => {
    n(c);
  }, o = (c, s) => {
    const p = { bookNum: ye.bookIdToNumber(s.bookId), chapterNum: 1, verseNum: 1 };
    t(p);
  }, a = (c) => {
    n({ ...e, chapterNum: +c.target.value });
  }, i = (c) => {
    n({ ...e, verseNum: +c.target.value });
  }, l = _n(() => hn()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ me("span", { id: r, children: [
    /* @__PURE__ */ w(
      En,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: hn(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ w(
      Re,
      {
        onClick: () => t(Ln(e, -1)),
        isDisabled: e.bookNum <= dt,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(
      Re,
      {
        onClick: () => t(Ln(e, 1)),
        isDisabled: e.bookNum >= hn().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ w(
      Qe,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ w(
      Re,
      {
        onClick: () => n(Un(e, -1)),
        isDisabled: e.chapterNum <= ft,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(
      Re,
      {
        onClick: () => n(Un(e, 1)),
        isDisabled: e.chapterNum >= pt(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ w(
      Qe,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ w(
      Re,
      {
        onClick: () => n(Hn(e, -1)),
        isDisabled: e.verseNum <= ht,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(Re, { onClick: () => n(Hn(e, 1)), children: ">" })
  ] });
}
function Li({ onSearch: e, placeholder: n, isFullWidth: r }) {
  const [t, o] = Be(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ w(ot, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ w(
    Qe,
    {
      isFullWidth: r,
      className: "search-bar-input",
      placeholder: n,
      value: t,
      onChange: (i) => a(i.target.value)
    }
  ) });
}
function Ui({
  id: e,
  isDisabled: n = !1,
  orientation: r = "horizontal",
  min: t = 0,
  max: o = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: s = "off",
  className: u,
  onChange: p,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ w(
    at,
    {
      id: e,
      disabled: n,
      orientation: r,
      min: t,
      max: o,
      step: a,
      marks: i,
      defaultValue: l,
      value: c,
      valueLabelDisplay: s,
      className: `papi-slider ${r} ${u ?? ""}`,
      onChange: p,
      onChangeCommitted: d
    }
  );
}
function Hi({
  autoHideDuration: e = void 0,
  id: n,
  isOpen: r = !1,
  className: t,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: i,
  children: l
}) {
  const c = {
    action: (i == null ? void 0 : i.action) || l,
    message: i == null ? void 0 : i.message,
    className: t
  };
  return /* @__PURE__ */ w(
    it,
    {
      autoHideDuration: e ?? void 0,
      open: r,
      onClose: o,
      anchorOrigin: a,
      id: n,
      ContentProps: c
    }
  );
}
function Wi({
  id: e,
  isChecked: n,
  isDisabled: r = !1,
  hasError: t = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ w(
    st,
    {
      id: e,
      checked: n,
      disabled: r,
      className: `papi-switch ${t ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function qn({ onRowChange: e, row: n, column: r }) {
  const t = (o) => {
    e({ ...n, [r.key]: o.target.value });
  };
  return /* @__PURE__ */ w(Qe, { defaultValue: n[r.key], onChange: t });
}
const qt = ({ onChange: e, disabled: n, checked: r, ...t }) => /* @__PURE__ */ w(
  $t,
  {
    ...t,
    isChecked: r,
    isDisabled: n,
    onChange: (a) => {
      e(a.target.checked, a.nativeEvent.shiftKey);
    }
  }
);
function Gi({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: r,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: i,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: s,
  enableSelectColumn: u,
  selectColumnWidth: p = 50,
  rowKeyGetter: d,
  rowHeight: v = 35,
  headerRowHeight: b = 35,
  selectedRows: h,
  onSelectedRowsChange: f,
  onRowsChange: S,
  onCellClick: J,
  onCellDoubleClick: B,
  onCellContextMenu: C,
  onCellKeyDown: m,
  direction: Q = "ltr",
  enableVirtualization: re = !0,
  onCopy: pe,
  onPaste: ue,
  onScroll: T,
  className: G
  // id,
}) {
  const Z = _n(() => {
    const te = e.map((U) => typeof U.editable == "function" ? {
      ...U,
      editable: (ee) => !!U.editable(ee),
      renderEditCell: U.renderEditCell || qn
    } : U.editable && !U.renderEditCell ? { ...U, renderEditCell: qn } : U.renderEditCell && !U.editable ? { ...U, editable: !1 } : U);
    return u ? [{ ...gt, minWidth: p }, ...te] : te;
  }, [e, u, p]);
  return /* @__PURE__ */ w(
    mt,
    {
      columns: Z,
      defaultColumnOptions: {
        width: o,
        minWidth: a,
        maxWidth: i,
        sortable: l,
        resizable: c
      },
      sortColumns: n,
      onSortColumnsChange: r,
      onColumnResize: t,
      rows: s,
      rowKeyGetter: d,
      rowHeight: v,
      headerRowHeight: b,
      selectedRows: h,
      onSelectedRowsChange: f,
      onRowsChange: S,
      onCellClick: J,
      onCellDoubleClick: B,
      onCellContextMenu: C,
      onCellKeyDown: m,
      direction: Q,
      enableVirtualization: re,
      onCopy: pe,
      onPaste: ue,
      onScroll: T,
      renderers: { renderCheckbox: qt },
      className: G ?? "rdg-light"
    }
  );
}
function z() {
  return z = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var t in r)
        Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    }
    return e;
  }, z.apply(this, arguments);
}
function Se(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ar(e) {
  if (!Se(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((r) => {
    n[r] = Ar(e[r]);
  }), n;
}
function fe(e, n, r = {
  clone: !0
}) {
  const t = r.clone ? z({}, e) : e;
  return Se(e) && Se(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && (Se(n[o]) && o in e && Se(e[o]) ? t[o] = fe(e[o], n[o], r) : r.clone ? t[o] = Se(n[o]) ? Ar(n[o]) : n[o] : t[o] = n[o]);
  }), t;
}
function Xt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Cn = { exports: {} }, Ye = { exports: {} }, j = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xn;
function Yt() {
  if (Xn)
    return j;
  Xn = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, J = e ? Symbol.for("react.scope") : 60119;
  function B(m) {
    if (typeof m == "object" && m !== null) {
      var Q = m.$$typeof;
      switch (Q) {
        case n:
          switch (m = m.type, m) {
            case c:
            case s:
            case t:
            case a:
            case o:
            case p:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case u:
                case b:
                case v:
                case i:
                  return m;
                default:
                  return Q;
              }
          }
        case r:
          return Q;
      }
    }
  }
  function C(m) {
    return B(m) === s;
  }
  return j.AsyncMode = c, j.ConcurrentMode = s, j.ContextConsumer = l, j.ContextProvider = i, j.Element = n, j.ForwardRef = u, j.Fragment = t, j.Lazy = b, j.Memo = v, j.Portal = r, j.Profiler = a, j.StrictMode = o, j.Suspense = p, j.isAsyncMode = function(m) {
    return C(m) || B(m) === c;
  }, j.isConcurrentMode = C, j.isContextConsumer = function(m) {
    return B(m) === l;
  }, j.isContextProvider = function(m) {
    return B(m) === i;
  }, j.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === n;
  }, j.isForwardRef = function(m) {
    return B(m) === u;
  }, j.isFragment = function(m) {
    return B(m) === t;
  }, j.isLazy = function(m) {
    return B(m) === b;
  }, j.isMemo = function(m) {
    return B(m) === v;
  }, j.isPortal = function(m) {
    return B(m) === r;
  }, j.isProfiler = function(m) {
    return B(m) === a;
  }, j.isStrictMode = function(m) {
    return B(m) === o;
  }, j.isSuspense = function(m) {
    return B(m) === p;
  }, j.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === t || m === s || m === a || m === o || m === p || m === d || typeof m == "object" && m !== null && (m.$$typeof === b || m.$$typeof === v || m.$$typeof === i || m.$$typeof === l || m.$$typeof === u || m.$$typeof === f || m.$$typeof === S || m.$$typeof === J || m.$$typeof === h);
  }, j.typeOf = B, j;
}
var V = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yn;
function Kt() {
  return Yn || (Yn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, J = e ? Symbol.for("react.scope") : 60119;
    function B(y) {
      return typeof y == "string" || typeof y == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      y === t || y === s || y === a || y === o || y === p || y === d || typeof y == "object" && y !== null && (y.$$typeof === b || y.$$typeof === v || y.$$typeof === i || y.$$typeof === l || y.$$typeof === u || y.$$typeof === f || y.$$typeof === S || y.$$typeof === J || y.$$typeof === h);
    }
    function C(y) {
      if (typeof y == "object" && y !== null) {
        var ie = y.$$typeof;
        switch (ie) {
          case n:
            var k = y.type;
            switch (k) {
              case c:
              case s:
              case t:
              case a:
              case o:
              case p:
                return k;
              default:
                var Ne = k && k.$$typeof;
                switch (Ne) {
                  case l:
                  case u:
                  case b:
                  case v:
                  case i:
                    return Ne;
                  default:
                    return ie;
                }
            }
          case r:
            return ie;
        }
      }
    }
    var m = c, Q = s, re = l, pe = i, ue = n, T = u, G = t, Z = b, te = v, U = r, de = a, ee = o, ge = p, Ce = !1;
    function Oe(y) {
      return Ce || (Ce = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), g(y) || C(y) === c;
    }
    function g(y) {
      return C(y) === s;
    }
    function x(y) {
      return C(y) === l;
    }
    function R(y) {
      return C(y) === i;
    }
    function O(y) {
      return typeof y == "object" && y !== null && y.$$typeof === n;
    }
    function E(y) {
      return C(y) === u;
    }
    function P(y) {
      return C(y) === t;
    }
    function _(y) {
      return C(y) === b;
    }
    function N(y) {
      return C(y) === v;
    }
    function I(y) {
      return C(y) === r;
    }
    function D(y) {
      return C(y) === a;
    }
    function M(y) {
      return C(y) === o;
    }
    function ne(y) {
      return C(y) === p;
    }
    V.AsyncMode = m, V.ConcurrentMode = Q, V.ContextConsumer = re, V.ContextProvider = pe, V.Element = ue, V.ForwardRef = T, V.Fragment = G, V.Lazy = Z, V.Memo = te, V.Portal = U, V.Profiler = de, V.StrictMode = ee, V.Suspense = ge, V.isAsyncMode = Oe, V.isConcurrentMode = g, V.isContextConsumer = x, V.isContextProvider = R, V.isElement = O, V.isForwardRef = E, V.isFragment = P, V.isLazy = _, V.isMemo = N, V.isPortal = I, V.isProfiler = D, V.isStrictMode = M, V.isSuspense = ne, V.isValidElementType = B, V.typeOf = C;
  }()), V;
}
var Kn;
function Pr() {
  return Kn || (Kn = 1, process.env.NODE_ENV === "production" ? Ye.exports = Yt() : Ye.exports = Kt()), Ye.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var mn, Jn;
function Jt() {
  if (Jn)
    return mn;
  Jn = 1;
  var e = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function t(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var i = {}, l = 0; l < 10; l++)
        i["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(i).map(function(u) {
        return i[u];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        s[u] = u;
      }), Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return mn = o() ? Object.assign : function(a, i) {
    for (var l, c = t(a), s, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var p in l)
        n.call(l, p) && (c[p] = l[p]);
      if (e) {
        s = e(l);
        for (var d = 0; d < s.length; d++)
          r.call(l, s[d]) && (c[s[d]] = l[s[d]]);
      }
    }
    return c;
  }, mn;
}
var gn, Zn;
function $n() {
  if (Zn)
    return gn;
  Zn = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return gn = e, gn;
}
var bn, Qn;
function Ir() {
  return Qn || (Qn = 1, bn = Function.call.bind(Object.prototype.hasOwnProperty)), bn;
}
var yn, er;
function Zt() {
  if (er)
    return yn;
  er = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = $n(), r = {}, t = Ir();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, l, c, s) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in a)
        if (t(a, u)) {
          var p;
          try {
            if (typeof a[u] != "function") {
              var d = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            p = a[u](i, u, c, l, null, n);
          } catch (b) {
            p = b;
          }
          if (p && !(p instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in r)) {
            r[p.message] = !0;
            var v = s ? s() : "";
            e(
              "Failed " + l + " type: " + p.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, yn = o, yn;
}
var vn, nr;
function Qt() {
  if (nr)
    return vn;
  nr = 1;
  var e = Pr(), n = Jt(), r = $n(), t = Ir(), o = Zt(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(l) {
    var c = "Warning: " + l;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return vn = function(l, c) {
    var s = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function p(g) {
      var x = g && (s && g[s] || g[u]);
      if (typeof x == "function")
        return x;
    }
    var d = "<<anonymous>>", v = {
      array: S("array"),
      bigint: S("bigint"),
      bool: S("boolean"),
      func: S("function"),
      number: S("number"),
      object: S("object"),
      string: S("string"),
      symbol: S("symbol"),
      any: J(),
      arrayOf: B,
      element: C(),
      elementType: m(),
      instanceOf: Q,
      node: T(),
      objectOf: pe,
      oneOf: re,
      oneOfType: ue,
      shape: Z,
      exact: te
    };
    function b(g, x) {
      return g === x ? g !== 0 || 1 / g === 1 / x : g !== g && x !== x;
    }
    function h(g, x) {
      this.message = g, this.data = x && typeof x == "object" ? x : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function f(g) {
      if (process.env.NODE_ENV !== "production")
        var x = {}, R = 0;
      function O(P, _, N, I, D, M, ne) {
        if (I = I || d, M = M || N, ne !== r) {
          if (c) {
            var y = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw y.name = "Invariant Violation", y;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ie = I + ":" + N;
            !x[ie] && // Avoid spamming the console because they are often not actionable except for lib authors
            R < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + M + "` prop on `" + I + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[ie] = !0, R++);
          }
        }
        return _[N] == null ? P ? _[N] === null ? new h("The " + D + " `" + M + "` is marked as required " + ("in `" + I + "`, but its value is `null`.")) : new h("The " + D + " `" + M + "` is marked as required in " + ("`" + I + "`, but its value is `undefined`.")) : null : g(_, N, I, D, M);
      }
      var E = O.bind(null, !1);
      return E.isRequired = O.bind(null, !0), E;
    }
    function S(g) {
      function x(R, O, E, P, _, N) {
        var I = R[O], D = ee(I);
        if (D !== g) {
          var M = ge(I);
          return new h(
            "Invalid " + P + " `" + _ + "` of type " + ("`" + M + "` supplied to `" + E + "`, expected ") + ("`" + g + "`."),
            { expectedType: g }
          );
        }
        return null;
      }
      return f(x);
    }
    function J() {
      return f(i);
    }
    function B(g) {
      function x(R, O, E, P, _) {
        if (typeof g != "function")
          return new h("Property `" + _ + "` of component `" + E + "` has invalid PropType notation inside arrayOf.");
        var N = R[O];
        if (!Array.isArray(N)) {
          var I = ee(N);
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected an array."));
        }
        for (var D = 0; D < N.length; D++) {
          var M = g(N, D, E, P, _ + "[" + D + "]", r);
          if (M instanceof Error)
            return M;
        }
        return null;
      }
      return f(x);
    }
    function C() {
      function g(x, R, O, E, P) {
        var _ = x[R];
        if (!l(_)) {
          var N = ee(_);
          return new h("Invalid " + E + " `" + P + "` of type " + ("`" + N + "` supplied to `" + O + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(g);
    }
    function m() {
      function g(x, R, O, E, P) {
        var _ = x[R];
        if (!e.isValidElementType(_)) {
          var N = ee(_);
          return new h("Invalid " + E + " `" + P + "` of type " + ("`" + N + "` supplied to `" + O + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(g);
    }
    function Q(g) {
      function x(R, O, E, P, _) {
        if (!(R[O] instanceof g)) {
          var N = g.name || d, I = Oe(R[O]);
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected ") + ("instance of `" + N + "`."));
        }
        return null;
      }
      return f(x);
    }
    function re(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function x(R, O, E, P, _) {
        for (var N = R[O], I = 0; I < g.length; I++)
          if (b(N, g[I]))
            return null;
        var D = JSON.stringify(g, function(ne, y) {
          var ie = ge(y);
          return ie === "symbol" ? String(y) : y;
        });
        return new h("Invalid " + P + " `" + _ + "` of value `" + String(N) + "` " + ("supplied to `" + E + "`, expected one of " + D + "."));
      }
      return f(x);
    }
    function pe(g) {
      function x(R, O, E, P, _) {
        if (typeof g != "function")
          return new h("Property `" + _ + "` of component `" + E + "` has invalid PropType notation inside objectOf.");
        var N = R[O], I = ee(N);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected an object."));
        for (var D in N)
          if (t(N, D)) {
            var M = g(N, D, E, P, _ + "." + D, r);
            if (M instanceof Error)
              return M;
          }
        return null;
      }
      return f(x);
    }
    function ue(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var x = 0; x < g.length; x++) {
        var R = g[x];
        if (typeof R != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Ce(R) + " at index " + x + "."
          ), i;
      }
      function O(E, P, _, N, I) {
        for (var D = [], M = 0; M < g.length; M++) {
          var ne = g[M], y = ne(E, P, _, N, I, r);
          if (y == null)
            return null;
          y.data && t(y.data, "expectedType") && D.push(y.data.expectedType);
        }
        var ie = D.length > 0 ? ", expected one of type [" + D.join(", ") + "]" : "";
        return new h("Invalid " + N + " `" + I + "` supplied to " + ("`" + _ + "`" + ie + "."));
      }
      return f(O);
    }
    function T() {
      function g(x, R, O, E, P) {
        return U(x[R]) ? null : new h("Invalid " + E + " `" + P + "` supplied to " + ("`" + O + "`, expected a ReactNode."));
      }
      return f(g);
    }
    function G(g, x, R, O, E) {
      return new h(
        (g || "React class") + ": " + x + " type `" + R + "." + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + E + "`."
      );
    }
    function Z(g) {
      function x(R, O, E, P, _) {
        var N = R[O], I = ee(N);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type `" + I + "` " + ("supplied to `" + E + "`, expected `object`."));
        for (var D in g) {
          var M = g[D];
          if (typeof M != "function")
            return G(E, P, _, D, ge(M));
          var ne = M(N, D, E, P, _ + "." + D, r);
          if (ne)
            return ne;
        }
        return null;
      }
      return f(x);
    }
    function te(g) {
      function x(R, O, E, P, _) {
        var N = R[O], I = ee(N);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type `" + I + "` " + ("supplied to `" + E + "`, expected `object`."));
        var D = n({}, R[O], g);
        for (var M in D) {
          var ne = g[M];
          if (t(g, M) && typeof ne != "function")
            return G(E, P, _, M, ge(ne));
          if (!ne)
            return new h(
              "Invalid " + P + " `" + _ + "` key `" + M + "` supplied to `" + E + "`.\nBad object: " + JSON.stringify(R[O], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(g), null, "  ")
            );
          var y = ne(N, M, E, P, _ + "." + M, r);
          if (y)
            return y;
        }
        return null;
      }
      return f(x);
    }
    function U(g) {
      switch (typeof g) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !g;
        case "object":
          if (Array.isArray(g))
            return g.every(U);
          if (g === null || l(g))
            return !0;
          var x = p(g);
          if (x) {
            var R = x.call(g), O;
            if (x !== g.entries) {
              for (; !(O = R.next()).done; )
                if (!U(O.value))
                  return !1;
            } else
              for (; !(O = R.next()).done; ) {
                var E = O.value;
                if (E && !U(E[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function de(g, x) {
      return g === "symbol" ? !0 : x ? x["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && x instanceof Symbol : !1;
    }
    function ee(g) {
      var x = typeof g;
      return Array.isArray(g) ? "array" : g instanceof RegExp ? "object" : de(x, g) ? "symbol" : x;
    }
    function ge(g) {
      if (typeof g > "u" || g === null)
        return "" + g;
      var x = ee(g);
      if (x === "object") {
        if (g instanceof Date)
          return "date";
        if (g instanceof RegExp)
          return "regexp";
      }
      return x;
    }
    function Ce(g) {
      var x = ge(g);
      switch (x) {
        case "array":
        case "object":
          return "an " + x;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + x;
        default:
          return x;
      }
    }
    function Oe(g) {
      return !g.constructor || !g.constructor.name ? d : g.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, vn;
}
var wn, rr;
function eo() {
  if (rr)
    return wn;
  rr = 1;
  var e = $n();
  function n() {
  }
  function r() {
  }
  return r.resetWarningCache = n, wn = function() {
    function t(i, l, c, s, u, p) {
      if (p !== e) {
        var d = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw d.name = "Invariant Violation", d;
      }
    }
    t.isRequired = t;
    function o() {
      return t;
    }
    var a = {
      array: t,
      bigint: t,
      bool: t,
      func: t,
      number: t,
      object: t,
      string: t,
      symbol: t,
      any: t,
      arrayOf: o,
      element: t,
      elementType: t,
      instanceOf: o,
      node: t,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: r,
      resetWarningCache: n
    };
    return a.PropTypes = a, a;
  }, wn;
}
if (process.env.NODE_ENV !== "production") {
  var no = Pr(), ro = !0;
  Cn.exports = Qt()(no.isElement, ro);
} else
  Cn.exports = eo()();
var to = Cn.exports;
const H = /* @__PURE__ */ Xt(to);
function je(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    n += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
var Tn = { exports: {} }, F = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tr;
function oo() {
  if (tr)
    return F;
  tr = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b;
  b = Symbol.for("react.module.reference");
  function h(f) {
    if (typeof f == "object" && f !== null) {
      var S = f.$$typeof;
      switch (S) {
        case e:
          switch (f = f.type, f) {
            case r:
            case o:
            case t:
            case s:
            case u:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case l:
                case i:
                case c:
                case d:
                case p:
                case a:
                  return f;
                default:
                  return S;
              }
          }
        case n:
          return S;
      }
    }
  }
  return F.ContextConsumer = i, F.ContextProvider = a, F.Element = e, F.ForwardRef = c, F.Fragment = r, F.Lazy = d, F.Memo = p, F.Portal = n, F.Profiler = o, F.StrictMode = t, F.Suspense = s, F.SuspenseList = u, F.isAsyncMode = function() {
    return !1;
  }, F.isConcurrentMode = function() {
    return !1;
  }, F.isContextConsumer = function(f) {
    return h(f) === i;
  }, F.isContextProvider = function(f) {
    return h(f) === a;
  }, F.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, F.isForwardRef = function(f) {
    return h(f) === c;
  }, F.isFragment = function(f) {
    return h(f) === r;
  }, F.isLazy = function(f) {
    return h(f) === d;
  }, F.isMemo = function(f) {
    return h(f) === p;
  }, F.isPortal = function(f) {
    return h(f) === n;
  }, F.isProfiler = function(f) {
    return h(f) === o;
  }, F.isStrictMode = function(f) {
    return h(f) === t;
  }, F.isSuspense = function(f) {
    return h(f) === s;
  }, F.isSuspenseList = function(f) {
    return h(f) === u;
  }, F.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === o || f === t || f === s || f === u || f === v || typeof f == "object" && f !== null && (f.$$typeof === d || f.$$typeof === p || f.$$typeof === a || f.$$typeof === i || f.$$typeof === c || f.$$typeof === b || f.getModuleId !== void 0);
  }, F.typeOf = h, F;
}
var L = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or;
function ao() {
  return or || (or = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b = !1, h = !1, f = !1, S = !1, J = !1, B;
    B = Symbol.for("react.module.reference");
    function C(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === r || k === o || J || k === t || k === s || k === u || S || k === v || b || h || f || typeof k == "object" && k !== null && (k.$$typeof === d || k.$$typeof === p || k.$$typeof === a || k.$$typeof === i || k.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === B || k.getModuleId !== void 0));
    }
    function m(k) {
      if (typeof k == "object" && k !== null) {
        var Ne = k.$$typeof;
        switch (Ne) {
          case e:
            var Xe = k.type;
            switch (Xe) {
              case r:
              case o:
              case t:
              case s:
              case u:
                return Xe;
              default:
                var Vn = Xe && Xe.$$typeof;
                switch (Vn) {
                  case l:
                  case i:
                  case c:
                  case d:
                  case p:
                  case a:
                    return Vn;
                  default:
                    return Ne;
                }
            }
          case n:
            return Ne;
        }
      }
    }
    var Q = i, re = a, pe = e, ue = c, T = r, G = d, Z = p, te = n, U = o, de = t, ee = s, ge = u, Ce = !1, Oe = !1;
    function g(k) {
      return Ce || (Ce = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function x(k) {
      return Oe || (Oe = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function R(k) {
      return m(k) === i;
    }
    function O(k) {
      return m(k) === a;
    }
    function E(k) {
      return typeof k == "object" && k !== null && k.$$typeof === e;
    }
    function P(k) {
      return m(k) === c;
    }
    function _(k) {
      return m(k) === r;
    }
    function N(k) {
      return m(k) === d;
    }
    function I(k) {
      return m(k) === p;
    }
    function D(k) {
      return m(k) === n;
    }
    function M(k) {
      return m(k) === o;
    }
    function ne(k) {
      return m(k) === t;
    }
    function y(k) {
      return m(k) === s;
    }
    function ie(k) {
      return m(k) === u;
    }
    L.ContextConsumer = Q, L.ContextProvider = re, L.Element = pe, L.ForwardRef = ue, L.Fragment = T, L.Lazy = G, L.Memo = Z, L.Portal = te, L.Profiler = U, L.StrictMode = de, L.Suspense = ee, L.SuspenseList = ge, L.isAsyncMode = g, L.isConcurrentMode = x, L.isContextConsumer = R, L.isContextProvider = O, L.isElement = E, L.isForwardRef = P, L.isFragment = _, L.isLazy = N, L.isMemo = I, L.isPortal = D, L.isProfiler = M, L.isStrictMode = ne, L.isSuspense = y, L.isSuspenseList = ie, L.isValidElementType = C, L.typeOf = m;
  }()), L;
}
process.env.NODE_ENV === "production" ? Tn.exports = oo() : Tn.exports = ao();
var ar = Tn.exports;
const io = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function so(e) {
  const n = `${e}`.match(io);
  return n && n[1] || "";
}
function Mr(e, n = "") {
  return e.displayName || e.name || so(e) || n;
}
function ir(e, n, r) {
  const t = Mr(n);
  return e.displayName || (t !== "" ? `${r}(${t})` : r);
}
function co(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Mr(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ar.ForwardRef:
          return ir(e, e.render, "ForwardRef");
        case ar.Memo:
          return ir(e, e.type, "memo");
        default:
          return;
      }
  }
}
function he(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : je(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function zr(e, n) {
  const r = z({}, n);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      r[t] = z({}, e[t], r[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, a = n[t];
      r[t] = {}, !a || !Object.keys(a) ? r[t] = o : !o || !Object.keys(o) ? r[t] = a : (r[t] = z({}, a), Object.keys(o).forEach((i) => {
        r[t][i] = zr(o[i], a[i]);
      }));
    } else
      r[t] === void 0 && (r[t] = e[t]);
  }), r;
}
function lo(e, n, r = void 0) {
  const t = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      t[o] = e[o].reduce((a, i) => {
        if (i) {
          const l = n(i);
          l !== "" && a.push(l), r && r[i] && a.push(r[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), t;
}
const sr = (e) => e, uo = () => {
  let e = sr;
  return {
    configure(n) {
      e = n;
    },
    generate(n) {
      return e(n);
    },
    reset() {
      e = sr;
    }
  };
}, fo = uo(), po = fo, ho = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function An(e, n, r = "Mui") {
  const t = ho[n];
  return t ? `${r}-${t}` : `${po.generate(e)}-${n}`;
}
function mo(e, n, r = "Mui") {
  const t = {};
  return n.forEach((o) => {
    t[o] = An(e, o, r);
  }), t;
}
function go(e, n = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, r));
}
function xe(e, n) {
  if (e == null)
    return {};
  var r = {}, t = Object.keys(e), o, a;
  for (a = 0; a < t.length; a++)
    o = t[a], !(n.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const bo = ["values", "unit", "step"], yo = (e) => {
  const n = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return n.sort((r, t) => r.val - t.val), n.reduce((r, t) => z({}, r, {
    [t.key]: t.val
  }), {});
};
function vo(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: n = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: r = "px",
    step: t = 5
  } = e, o = xe(e, bo), a = yo(n), i = Object.keys(a);
  function l(d) {
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof n[d] == "number" ? n[d] : d) - t / 100}${r})`;
  }
  function s(d, v) {
    const b = i.indexOf(v);
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r}) and (max-width:${(b !== -1 && typeof n[i[b]] == "number" ? n[i[b]] : v) - t / 100}${r})`;
  }
  function u(d) {
    return i.indexOf(d) + 1 < i.length ? s(d, i[i.indexOf(d) + 1]) : l(d);
  }
  function p(d) {
    const v = i.indexOf(d);
    return v === 0 ? l(i[1]) : v === i.length - 1 ? c(i[v]) : s(d, i[i.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return z({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: s,
    only: u,
    not: p,
    unit: r
  }, o);
}
const wo = {
  borderRadius: 4
}, xo = wo, ko = process.env.NODE_ENV !== "production" ? H.oneOfType([H.number, H.string, H.object, H.array]) : {}, Ee = ko;
function He(e, n) {
  return n ? fe(e, n, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Pn = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, cr = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Pn[e]}px)`
};
function ve(e, n, r) {
  const t = e.theme || {};
  if (Array.isArray(n)) {
    const a = t.breakpoints || cr;
    return n.reduce((i, l, c) => (i[a.up(a.keys[c])] = r(n[c]), i), {});
  }
  if (typeof n == "object") {
    const a = t.breakpoints || cr;
    return Object.keys(n).reduce((i, l) => {
      if (Object.keys(a.values || Pn).indexOf(l) !== -1) {
        const c = a.up(l);
        i[c] = r(n[l], l);
      } else {
        const c = l;
        i[c] = n[c];
      }
      return i;
    }, {});
  }
  return r(n);
}
function So(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((t, o) => {
    const a = e.up(o);
    return t[a] = {}, t;
  }, {})) || {};
}
function Eo(e, n) {
  return e.reduce((r, t) => {
    const o = r[t];
    return (!o || Object.keys(o).length === 0) && delete r[t], r;
  }, n);
}
function on(e, n, r = !0) {
  if (!n || typeof n != "string")
    return null;
  if (e && e.vars && r) {
    const t = `vars.${n}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (t != null)
      return t;
  }
  return n.split(".").reduce((t, o) => t && t[o] != null ? t[o] : null, e);
}
function en(e, n, r, t = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || t : o = on(e, r) || t, n && (o = n(o, t, e)), o;
}
function K(e) {
  const {
    prop: n,
    cssProperty: r = e.prop,
    themeKey: t,
    transform: o
  } = e, a = (i) => {
    if (i[n] == null)
      return null;
    const l = i[n], c = i.theme, s = on(c, t) || {};
    return ve(i, l, (p) => {
      let d = en(s, o, p);
      return p === d && typeof p == "string" && (d = en(s, o, `${n}${p === "default" ? "" : he(p)}`, p)), r === !1 ? d : {
        [r]: d
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: Ee
  } : {}, a.filterProps = [n], a;
}
function Co(e) {
  const n = {};
  return (r) => (n[r] === void 0 && (n[r] = e(r)), n[r]);
}
const To = {
  m: "margin",
  p: "padding"
}, _o = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, lr = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Oo = Co((e) => {
  if (e.length > 2)
    if (lr[e])
      e = lr[e];
    else
      return [e];
  const [n, r] = e.split(""), t = To[n], o = _o[r] || "";
  return Array.isArray(o) ? o.map((a) => t + a) : [t + o];
}), an = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], sn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], No = [...an, ...sn];
function Ge(e, n, r, t) {
  var o;
  const a = (o = on(e, n, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${t} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${n}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Br(e) {
  return Ge(e, "spacing", 8, "spacing");
}
function qe(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const r = Math.abs(n), t = e(r);
  return n >= 0 ? t : typeof t == "number" ? -t : `-${t}`;
}
function Ro(e, n) {
  return (r) => e.reduce((t, o) => (t[o] = qe(n, r), t), {});
}
function $o(e, n, r, t) {
  if (n.indexOf(r) === -1)
    return null;
  const o = Oo(r), a = Ro(o, t), i = e[r];
  return ve(e, i, a);
}
function Dr(e, n) {
  const r = Br(e.theme);
  return Object.keys(e).map((t) => $o(e, n, t, r)).reduce(He, {});
}
function q(e) {
  return Dr(e, an);
}
q.propTypes = process.env.NODE_ENV !== "production" ? an.reduce((e, n) => (e[n] = Ee, e), {}) : {};
q.filterProps = an;
function X(e) {
  return Dr(e, sn);
}
X.propTypes = process.env.NODE_ENV !== "production" ? sn.reduce((e, n) => (e[n] = Ee, e), {}) : {};
X.filterProps = sn;
process.env.NODE_ENV !== "production" && No.reduce((e, n) => (e[n] = Ee, e), {});
function Ao(e = 8) {
  if (e.mui)
    return e;
  const n = Br({
    spacing: e
  }), r = (...t) => (process.env.NODE_ENV !== "production" && (t.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)), (t.length === 0 ? [1] : t).map((a) => {
    const i = n(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function cn(...e) {
  const n = e.reduce((t, o) => (o.filterProps.forEach((a) => {
    t[a] = o;
  }), t), {}), r = (t) => Object.keys(t).reduce((o, a) => n[a] ? He(o, n[a](t)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((t, o) => Object.assign(t, o.propTypes), {}) : {}, r.filterProps = e.reduce((t, o) => t.concat(o.filterProps), []), r;
}
function ce(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function le(e, n) {
  return K({
    prop: e,
    themeKey: "borders",
    transform: n
  });
}
const Po = le("border", ce), Io = le("borderTop", ce), Mo = le("borderRight", ce), zo = le("borderBottom", ce), Bo = le("borderLeft", ce), Do = le("borderColor"), jo = le("borderTopColor"), Vo = le("borderRightColor"), Fo = le("borderBottomColor"), Lo = le("borderLeftColor"), Uo = le("outline", ce), Ho = le("outlineColor"), ln = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = Ge(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (t) => ({
      borderRadius: qe(n, t)
    });
    return ve(e, e.borderRadius, r);
  }
  return null;
};
ln.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Ee
} : {};
ln.filterProps = ["borderRadius"];
cn(Po, Io, Mo, zo, Bo, Do, jo, Vo, Fo, Lo, ln, Uo, Ho);
const un = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = Ge(e.theme, "spacing", 8, "gap"), r = (t) => ({
      gap: qe(n, t)
    });
    return ve(e, e.gap, r);
  }
  return null;
};
un.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Ee
} : {};
un.filterProps = ["gap"];
const dn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = Ge(e.theme, "spacing", 8, "columnGap"), r = (t) => ({
      columnGap: qe(n, t)
    });
    return ve(e, e.columnGap, r);
  }
  return null;
};
dn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Ee
} : {};
dn.filterProps = ["columnGap"];
const fn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = Ge(e.theme, "spacing", 8, "rowGap"), r = (t) => ({
      rowGap: qe(n, t)
    });
    return ve(e, e.rowGap, r);
  }
  return null;
};
fn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Ee
} : {};
fn.filterProps = ["rowGap"];
const Wo = K({
  prop: "gridColumn"
}), Go = K({
  prop: "gridRow"
}), qo = K({
  prop: "gridAutoFlow"
}), Xo = K({
  prop: "gridAutoColumns"
}), Yo = K({
  prop: "gridAutoRows"
}), Ko = K({
  prop: "gridTemplateColumns"
}), Jo = K({
  prop: "gridTemplateRows"
}), Zo = K({
  prop: "gridTemplateAreas"
}), Qo = K({
  prop: "gridArea"
});
cn(un, dn, fn, Wo, Go, qo, Xo, Yo, Ko, Jo, Zo, Qo);
function De(e, n) {
  return n === "grey" ? n : e;
}
const ea = K({
  prop: "color",
  themeKey: "palette",
  transform: De
}), na = K({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: De
}), ra = K({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: De
});
cn(ea, na, ra);
function ae(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const ta = K({
  prop: "width",
  transform: ae
}), In = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const n = (r) => {
      var t, o;
      const a = ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[r]) || Pn[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: ae(r)
      };
    };
    return ve(e, e.maxWidth, n);
  }
  return null;
};
In.filterProps = ["maxWidth"];
const oa = K({
  prop: "minWidth",
  transform: ae
}), aa = K({
  prop: "height",
  transform: ae
}), ia = K({
  prop: "maxHeight",
  transform: ae
}), sa = K({
  prop: "minHeight",
  transform: ae
});
K({
  prop: "size",
  cssProperty: "width",
  transform: ae
});
K({
  prop: "size",
  cssProperty: "height",
  transform: ae
});
const ca = K({
  prop: "boxSizing"
});
cn(ta, In, oa, aa, ia, sa, ca);
const la = {
  // borders
  border: {
    themeKey: "borders",
    transform: ce
  },
  borderTop: {
    themeKey: "borders",
    transform: ce
  },
  borderRight: {
    themeKey: "borders",
    transform: ce
  },
  borderBottom: {
    themeKey: "borders",
    transform: ce
  },
  borderLeft: {
    themeKey: "borders",
    transform: ce
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: ce
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: ln
  },
  // palette
  color: {
    themeKey: "palette",
    transform: De
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: De
  },
  backgroundColor: {
    themeKey: "palette",
    transform: De
  },
  // spacing
  p: {
    style: X
  },
  pt: {
    style: X
  },
  pr: {
    style: X
  },
  pb: {
    style: X
  },
  pl: {
    style: X
  },
  px: {
    style: X
  },
  py: {
    style: X
  },
  padding: {
    style: X
  },
  paddingTop: {
    style: X
  },
  paddingRight: {
    style: X
  },
  paddingBottom: {
    style: X
  },
  paddingLeft: {
    style: X
  },
  paddingX: {
    style: X
  },
  paddingY: {
    style: X
  },
  paddingInline: {
    style: X
  },
  paddingInlineStart: {
    style: X
  },
  paddingInlineEnd: {
    style: X
  },
  paddingBlock: {
    style: X
  },
  paddingBlockStart: {
    style: X
  },
  paddingBlockEnd: {
    style: X
  },
  m: {
    style: q
  },
  mt: {
    style: q
  },
  mr: {
    style: q
  },
  mb: {
    style: q
  },
  ml: {
    style: q
  },
  mx: {
    style: q
  },
  my: {
    style: q
  },
  margin: {
    style: q
  },
  marginTop: {
    style: q
  },
  marginRight: {
    style: q
  },
  marginBottom: {
    style: q
  },
  marginLeft: {
    style: q
  },
  marginX: {
    style: q
  },
  marginY: {
    style: q
  },
  marginInline: {
    style: q
  },
  marginInlineStart: {
    style: q
  },
  marginInlineEnd: {
    style: q
  },
  marginBlock: {
    style: q
  },
  marginBlockStart: {
    style: q
  },
  marginBlockEnd: {
    style: q
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: un
  },
  rowGap: {
    style: fn
  },
  columnGap: {
    style: dn
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: ae
  },
  maxWidth: {
    style: In
  },
  minWidth: {
    transform: ae
  },
  height: {
    transform: ae
  },
  maxHeight: {
    transform: ae
  },
  minHeight: {
    transform: ae
  },
  boxSizing: {},
  // typography
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
}, Mn = la;
function ua(...e) {
  const n = e.reduce((t, o) => t.concat(Object.keys(o)), []), r = new Set(n);
  return e.every((t) => r.size === Object.keys(t).length);
}
function da(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function fa() {
  function e(r, t, o, a) {
    const i = {
      [r]: t,
      theme: o
    }, l = a[r];
    if (!l)
      return {
        [r]: t
      };
    const {
      cssProperty: c = r,
      themeKey: s,
      transform: u,
      style: p
    } = l;
    if (t == null)
      return null;
    if (s === "typography" && t === "inherit")
      return {
        [r]: t
      };
    const d = on(o, s) || {};
    return p ? p(i) : ve(i, t, (b) => {
      let h = en(d, u, b);
      return b === h && typeof b == "string" && (h = en(d, u, `${r}${b === "default" ? "" : he(b)}`, b)), c === !1 ? h : {
        [c]: h
      };
    });
  }
  function n(r) {
    var t;
    const {
      sx: o,
      theme: a = {}
    } = r || {};
    if (!o)
      return null;
    const i = (t = a.unstable_sxConfig) != null ? t : Mn;
    function l(c) {
      let s = c;
      if (typeof c == "function")
        s = c(a);
      else if (typeof c != "object")
        return c;
      if (!s)
        return null;
      const u = So(a.breakpoints), p = Object.keys(u);
      let d = u;
      return Object.keys(s).forEach((v) => {
        const b = da(s[v], a);
        if (b != null)
          if (typeof b == "object")
            if (i[v])
              d = He(d, e(v, b, a, i));
            else {
              const h = ve({
                theme: a
              }, b, (f) => ({
                [v]: f
              }));
              ua(h, b) ? d[v] = n({
                sx: b,
                theme: a
              }) : d = He(d, h);
            }
          else
            d = He(d, e(v, b, a, i));
      }), Eo(p, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return n;
}
const jr = fa();
jr.filterProps = ["sx"];
const zn = jr, pa = ["breakpoints", "palette", "spacing", "shape"];
function Bn(e = {}, ...n) {
  const {
    breakpoints: r = {},
    palette: t = {},
    spacing: o,
    shape: a = {}
  } = e, i = xe(e, pa), l = vo(r), c = Ao(o);
  let s = fe({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: z({
      mode: "light"
    }, t),
    spacing: c,
    shape: z({}, xo, a)
  }, i);
  return s = n.reduce((u, p) => fe(u, p), s), s.unstable_sxConfig = z({}, Mn, i == null ? void 0 : i.unstable_sxConfig), s.unstable_sx = function(p) {
    return zn({
      sx: p,
      theme: this
    });
  }, s;
}
function ha(e) {
  return Object.keys(e).length === 0;
}
function ma(e = null) {
  const n = oe.useContext(yt);
  return !n || ha(n) ? e : n;
}
const ga = Bn();
function ba(e = ga) {
  return ma(e);
}
const ya = ["variant"];
function ur(e) {
  return e.length === 0;
}
function Vr(e) {
  const {
    variant: n
  } = e, r = xe(e, ya);
  let t = n || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? t += ur(t) ? e[o] : he(e[o]) : t += `${ur(t) ? o : he(o)}${he(e[o].toString())}`;
  }), t;
}
const va = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function wa(e) {
  return Object.keys(e).length === 0;
}
function xa(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const ka = (e, n) => n.components && n.components[e] && n.components[e].styleOverrides ? n.components[e].styleOverrides : null, nn = (e) => {
  let n = 0;
  const r = {};
  return e && e.forEach((t) => {
    let o = "";
    typeof t.props == "function" ? (o = `callback${n}`, n += 1) : o = Vr(t.props), r[o] = t.style;
  }), r;
}, Sa = (e, n) => {
  let r = [];
  return n && n.components && n.components[e] && n.components[e].variants && (r = n.components[e].variants), nn(r);
}, rn = (e, n, r) => {
  const {
    ownerState: t = {}
  } = e, o = [];
  let a = 0;
  return r && r.forEach((i) => {
    let l = !0;
    if (typeof i.props == "function") {
      const c = z({}, e, t);
      l = i.props(c);
    } else
      Object.keys(i.props).forEach((c) => {
        t[c] !== i.props[c] && e[c] !== i.props[c] && (l = !1);
      });
    l && (typeof i.props == "function" ? o.push(n[`callback${a}`]) : o.push(n[Vr(i.props)])), typeof i.props == "function" && (a += 1);
  }), o;
}, Ea = (e, n, r, t) => {
  var o;
  const a = r == null || (o = r.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return rn(e, n, a);
};
function Je(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Ca = Bn(), dr = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Ze({
  defaultTheme: e,
  theme: n,
  themeId: r
}) {
  return wa(n) ? e : n[r] || n;
}
function Ta(e) {
  return e ? (n, r) => r[e] : null;
}
const fr = ({
  styledArg: e,
  props: n,
  defaultTheme: r,
  themeId: t
}) => {
  const o = e(z({}, n, {
    theme: Ze(z({}, n, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  let a;
  if (o && o.variants && (a = o.variants, delete o.variants), a) {
    const i = rn(n, nn(a), a);
    return [o, ...i];
  }
  return o;
};
function _a(e = {}) {
  const {
    themeId: n,
    defaultTheme: r = Ca,
    rootShouldForwardProp: t = Je,
    slotShouldForwardProp: o = Je
  } = e, a = (i) => zn(z({}, i, {
    theme: Ze(z({}, i, {
      defaultTheme: r,
      themeId: n
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    vt(i, (C) => C.filter((m) => !(m != null && m.__mui_systemSx)));
    const {
      name: c,
      slot: s,
      skipVariantsResolver: u,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = Ta(dr(s))
    } = l, v = xe(l, va), b = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      s && s !== "Root" && s !== "root" || !1
    ), h = p || !1;
    let f;
    process.env.NODE_ENV !== "production" && c && (f = `${c}-${dr(s || "Root")}`);
    let S = Je;
    s === "Root" || s === "root" ? S = t : s ? S = o : xa(i) && (S = void 0);
    const J = bt(i, z({
      shouldForwardProp: S,
      label: f
    }, v)), B = (C, ...m) => {
      const Q = m ? m.map((T) => {
        if (typeof T == "function" && T.__emotion_real !== T)
          return (G) => fr({
            styledArg: T,
            props: G,
            defaultTheme: r,
            themeId: n
          });
        if (Se(T)) {
          let G = T, Z;
          return T && T.variants && (Z = T.variants, delete G.variants, G = (te) => {
            let U = T;
            return rn(te, nn(Z), Z).forEach((ee) => {
              U = fe(U, ee);
            }), U;
          }), G;
        }
        return T;
      }) : [];
      let re = C;
      if (Se(C)) {
        let T;
        C && C.variants && (T = C.variants, delete re.variants, re = (G) => {
          let Z = C;
          return rn(G, nn(T), T).forEach((U) => {
            Z = fe(Z, U);
          }), Z;
        });
      } else
        typeof C == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        C.__emotion_real !== C && (re = (T) => fr({
          styledArg: C,
          props: T,
          defaultTheme: r,
          themeId: n
        }));
      c && d && Q.push((T) => {
        const G = Ze(z({}, T, {
          defaultTheme: r,
          themeId: n
        })), Z = ka(c, G);
        if (Z) {
          const te = {};
          return Object.entries(Z).forEach(([U, de]) => {
            te[U] = typeof de == "function" ? de(z({}, T, {
              theme: G
            })) : de;
          }), d(T, te);
        }
        return null;
      }), c && !b && Q.push((T) => {
        const G = Ze(z({}, T, {
          defaultTheme: r,
          themeId: n
        }));
        return Ea(T, Sa(c, G), G, c);
      }), h || Q.push(a);
      const pe = Q.length - m.length;
      if (Array.isArray(C) && pe > 0) {
        const T = new Array(pe).fill("");
        re = [...C, ...T], re.raw = [...C.raw, ...T];
      }
      const ue = J(re, ...Q);
      if (process.env.NODE_ENV !== "production") {
        let T;
        c && (T = `${c}${he(s || "")}`), T === void 0 && (T = `Styled(${co(i)})`), ue.displayName = T;
      }
      return i.muiName && (ue.muiName = i.muiName), ue;
    };
    return J.withConfig && (B.withConfig = J.withConfig), B;
  };
}
function Oa(e) {
  const {
    theme: n,
    name: r,
    props: t
  } = e;
  return !n || !n.components || !n.components[r] || !n.components[r].defaultProps ? t : zr(n.components[r].defaultProps, t);
}
function Na({
  props: e,
  name: n,
  defaultTheme: r,
  themeId: t
}) {
  let o = ba(r);
  return t && (o = o[t] || o), Oa({
    theme: o,
    name: n,
    props: e
  });
}
function Fr(e, n = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > r) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`), go(e, n, r);
}
function Ra(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(n);
  return r && r[0].length === 1 && (r = r.map((t) => t + t)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ve(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ve(Ra(e));
  const n = e.indexOf("("), r = e.substring(0, n);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : je(9, e));
  let t = e.substring(n + 1, e.length - 1), o;
  if (r === "color") {
    if (t = t.split(" "), o = t.shift(), t.length === 4 && t[3].charAt(0) === "/" && (t[3] = t[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : je(10, o));
  } else
    t = t.split(",");
  return t = t.map((a) => parseFloat(a)), {
    type: r,
    values: t,
    colorSpace: o
  };
}
function Dn(e) {
  const {
    type: n,
    colorSpace: r
  } = e;
  let {
    values: t
  } = e;
  return n.indexOf("rgb") !== -1 ? t = t.map((o, a) => a < 3 ? parseInt(o, 10) : o) : n.indexOf("hsl") !== -1 && (t[1] = `${t[1]}%`, t[2] = `${t[2]}%`), n.indexOf("color") !== -1 ? t = `${r} ${t.join(" ")}` : t = `${t.join(", ")}`, `${n}(${t})`;
}
function $a(e) {
  e = Ve(e);
  const {
    values: n
  } = e, r = n[0], t = n[1] / 100, o = n[2] / 100, a = t * Math.min(o, 1 - o), i = (s, u = (s + r / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(n[3])), Dn({
    type: l,
    values: c
  });
}
function pr(e) {
  e = Ve(e);
  let n = e.type === "hsl" || e.type === "hsla" ? Ve($a(e)).values : e.values;
  return n = n.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function hr(e, n) {
  const r = pr(e), t = pr(n);
  return (Math.max(r, t) + 0.05) / (Math.min(r, t) + 0.05);
}
function Aa(e, n) {
  if (e = Ve(e), n = Fr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - n;
  return Dn(e);
}
function Pa(e, n) {
  if (e = Ve(e), n = Fr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * n;
  return Dn(e);
}
function Ia(e, n) {
  return z({
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    }
  }, n);
}
const Ma = {
  black: "#000",
  white: "#fff"
}, We = Ma, za = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, Ba = za, Da = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
}, $e = Da, ja = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
}, Ae = ja, Va = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
}, Ue = Va, Fa = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
}, Pe = Fa, La = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
}, Ie = La, Ua = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
}, Me = Ua, Ha = ["mode", "contrastThreshold", "tonalOffset"], mr = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: We.white,
    default: We.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
}, xn = {
  text: {
    primary: We.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: We.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function gr(e, n, r, t) {
  const o = t.light || t, a = t.dark || t * 1.5;
  e[n] || (e.hasOwnProperty(r) ? e[n] = e[r] : n === "light" ? e.light = Pa(e.main, o) : n === "dark" && (e.dark = Aa(e.main, a)));
}
function Wa(e = "light") {
  return e === "dark" ? {
    main: Pe[200],
    light: Pe[50],
    dark: Pe[400]
  } : {
    main: Pe[700],
    light: Pe[400],
    dark: Pe[800]
  };
}
function Ga(e = "light") {
  return e === "dark" ? {
    main: $e[200],
    light: $e[50],
    dark: $e[400]
  } : {
    main: $e[500],
    light: $e[300],
    dark: $e[700]
  };
}
function qa(e = "light") {
  return e === "dark" ? {
    main: Ae[500],
    light: Ae[300],
    dark: Ae[700]
  } : {
    main: Ae[700],
    light: Ae[400],
    dark: Ae[800]
  };
}
function Xa(e = "light") {
  return e === "dark" ? {
    main: Ie[400],
    light: Ie[300],
    dark: Ie[700]
  } : {
    main: Ie[700],
    light: Ie[500],
    dark: Ie[900]
  };
}
function Ya(e = "light") {
  return e === "dark" ? {
    main: Me[400],
    light: Me[300],
    dark: Me[700]
  } : {
    main: Me[800],
    light: Me[500],
    dark: Me[900]
  };
}
function Ka(e = "light") {
  return e === "dark" ? {
    main: Ue[400],
    light: Ue[300],
    dark: Ue[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Ue[500],
    dark: Ue[900]
  };
}
function Ja(e) {
  const {
    mode: n = "light",
    contrastThreshold: r = 3,
    tonalOffset: t = 0.2
  } = e, o = xe(e, Ha), a = e.primary || Wa(n), i = e.secondary || Ga(n), l = e.error || qa(n), c = e.info || Xa(n), s = e.success || Ya(n), u = e.warning || Ka(n);
  function p(h) {
    const f = hr(h, xn.text.primary) >= r ? xn.text.primary : mr.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const S = hr(h, f);
      S < 3 && console.error([`MUI: The contrast ratio of ${S}:1 for ${f} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return f;
  }
  const d = ({
    color: h,
    name: f,
    mainShade: S = 500,
    lightShade: J = 300,
    darkShade: B = 700
  }) => {
    if (h = z({}, h), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.` : je(11, f ? ` (${f})` : "", S));
    if (typeof h.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : je(12, f ? ` (${f})` : "", JSON.stringify(h.main)));
    return gr(h, "light", J, t), gr(h, "dark", B, t), h.contrastText || (h.contrastText = p(h.main)), h;
  }, v = {
    dark: xn,
    light: mr
  };
  return process.env.NODE_ENV !== "production" && (v[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), fe(z({
    // A collection of common colors.
    common: z({}, We),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: n,
    // The colors used to represent primary interface elements for a user.
    primary: d({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: d({
      color: i,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: d({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: d({
      color: u,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: d({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: d({
      color: s,
      name: "success"
    }),
    // The grey colors.
    grey: Ba,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: d,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: t
  }, v[n]), o);
}
const Za = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Qa(e) {
  return Math.round(e * 1e5) / 1e5;
}
const br = {
  textTransform: "uppercase"
}, yr = '"Roboto", "Helvetica", "Arial", sans-serif';
function ei(e, n) {
  const r = typeof n == "function" ? n(e) : n, {
    fontFamily: t = yr,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: s = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: p
  } = r, d = xe(r, Za);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof s != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, b = p || ((S) => `${S / s * v}rem`), h = (S, J, B, C, m) => z({
    fontFamily: t,
    fontWeight: S,
    fontSize: b(J),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: B
  }, t === yr ? {
    letterSpacing: `${Qa(C / J)}em`
  } : {}, m, u), f = {
    h1: h(a, 96, 1.167, -1.5),
    h2: h(a, 60, 1.2, -0.5),
    h3: h(i, 48, 1.167, 0),
    h4: h(i, 34, 1.235, 0.25),
    h5: h(i, 24, 1.334, 0),
    h6: h(l, 20, 1.6, 0.15),
    subtitle1: h(i, 16, 1.75, 0.15),
    subtitle2: h(l, 14, 1.57, 0.1),
    body1: h(i, 16, 1.5, 0.15),
    body2: h(i, 14, 1.43, 0.15),
    button: h(l, 14, 1.75, 0.4, br),
    caption: h(i, 12, 1.66, 0.4),
    overline: h(i, 12, 2.66, 1, br),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return fe(z({
    htmlFontSize: s,
    pxToRem: b,
    fontFamily: t,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, f), d, {
    clone: !1
    // No need to clone deep
  });
}
const ni = 0.2, ri = 0.14, ti = 0.12;
function W(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ni})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ri})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${ti})`].join(",");
}
const oi = ["none", W(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), W(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), W(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), W(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), W(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), W(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), W(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), W(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), W(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), W(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), W(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), W(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), W(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), W(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), W(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), W(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), W(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), W(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), W(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), W(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), W(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), W(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), W(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), W(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], ai = oi, ii = ["duration", "easing", "delay"], si = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ci = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function vr(e) {
  return `${Math.round(e)}ms`;
}
function li(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function ui(e) {
  const n = z({}, si, e.easing), r = z({}, ci, e.duration);
  return z({
    getAutoHeightDuration: li,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = n.easeInOut,
        delay: c = 0
      } = a, s = xe(a, ii);
      if (process.env.NODE_ENV !== "production") {
        const u = (d) => typeof d == "string", p = (d) => !isNaN(parseFloat(d));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(i) && !u(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !p(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(s).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof i == "string" ? i : vr(i)} ${l} ${typeof c == "string" ? c : vr(c)}`).join(",");
    }
  }, e, {
    easing: n,
    duration: r
  });
}
const di = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, fi = di, pi = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function hi(e = {}, ...n) {
  const {
    mixins: r = {},
    palette: t = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = xe(e, pi);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : je(18));
  const l = Ja(t), c = Bn(e);
  let s = fe(c, {
    mixins: Ia(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ai.slice(),
    typography: ei(l, a),
    transitions: ui(o),
    zIndex: z({}, fi),
    applyDarkStyles(u) {
      return this.vars ? {
        [this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/, ":where($1)")]: u
      } : this.palette.mode === "dark" ? u : {};
    }
  });
  if (s = fe(s, i), s = n.reduce((u, p) => fe(u, p), s), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (d, v) => {
      let b;
      for (b in d) {
        const h = d[b];
        if (u.indexOf(b) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const f = An("", b);
            console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${b}\` internal state.`, "You can not override it like this: ", JSON.stringify(d, null, 2), "", `Instead, you need to use the '&.${f}' syntax:`, JSON.stringify({
              root: {
                [`&.${f}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          d[b] = {};
        }
      }
    };
    Object.keys(s.components).forEach((d) => {
      const v = s.components[d].styleOverrides;
      v && d.indexOf("Mui") === 0 && p(v, d);
    });
  }
  return s.unstable_sxConfig = z({}, Mn, i == null ? void 0 : i.unstable_sxConfig), s.unstable_sx = function(p) {
    return zn({
      sx: p,
      theme: this
    });
  }, s;
}
const mi = hi(), Lr = mi, Ur = "$$material";
function gi({
  props: e,
  name: n
}) {
  return Na({
    props: e,
    name: n,
    defaultTheme: Lr,
    themeId: Ur
  });
}
const bi = (e) => Je(e) && e !== "classes", yi = _a({
  themeId: Ur,
  defaultTheme: Lr,
  rootShouldForwardProp: bi
}), vi = yi;
function wi(e) {
  return An("MuiSvgIcon", e);
}
mo("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const xi = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ki = (e) => {
  const {
    color: n,
    fontSize: r,
    classes: t
  } = e, o = {
    root: ["root", n !== "inherit" && `color${he(n)}`, `fontSize${he(r)}`]
  };
  return lo(o, wi, t);
}, Si = vi("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: r
    } = e;
    return [n.root, r.color !== "inherit" && n[`color${he(r.color)}`], n[`fontSize${he(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var r, t, o, a, i, l, c, s, u, p, d, v, b;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: n.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (r = e.transitions) == null || (t = r.create) == null ? void 0 : t.call(r, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = e.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((s = e.typography) == null || (u = s.pxToRem) == null ? void 0 : u.call(s, 35)) || "2.1875rem"
    }[n.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (p = (d = (e.vars || e).palette) == null || (d = d[n.color]) == null ? void 0 : d.main) != null ? p : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.disabled,
      inherit: void 0
    }[n.color]
  };
}), jn = /* @__PURE__ */ oe.forwardRef(function(n, r) {
  const t = gi({
    props: n,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: s,
    inheritViewBox: u = !1,
    titleAccess: p,
    viewBox: d = "0 0 24 24"
  } = t, v = xe(t, xi), b = /* @__PURE__ */ oe.isValidElement(o) && o.type === "svg", h = z({}, t, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: n.fontSize,
    inheritViewBox: u,
    viewBox: d,
    hasSvgAsChild: b
  }), f = {};
  u || (f.viewBox = d);
  const S = ki(h);
  return /* @__PURE__ */ me(Si, z({
    as: l,
    className: Kr(S.root, a),
    focusable: "false",
    color: s,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: r
  }, f, v, b && o.props, {
    ownerState: h,
    children: [b ? o.props.children : o, p ? /* @__PURE__ */ w("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (jn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: H.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: H.object,
  /**
   * @ignore
   */
  className: H.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: H.oneOfType([H.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), H.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: H.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: H.oneOfType([H.oneOf(["inherit", "large", "medium", "small"]), H.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: H.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: H.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: H.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: H.oneOfType([H.arrayOf(H.oneOfType([H.func, H.object, H.bool])), H.func, H.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: H.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: H.string
});
jn.muiName = "SvgIcon";
const wr = jn;
function Ei(e, n) {
  function r(t, o) {
    return /* @__PURE__ */ w(wr, z({
      "data-testid": `${n}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${n}Icon`), r.muiName = wr.muiName, /* @__PURE__ */ oe.memo(/* @__PURE__ */ oe.forwardRef(r));
}
const Ci = Ei(/* @__PURE__ */ w("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function qi({
  menu: e,
  dataHandler: n,
  commandHandler: r,
  className: t,
  id: o,
  children: a
}) {
  const [i, l] = Be(!1), [c, s] = Be(!1), u = Ke(() => {
    i && l(!1), s(!1);
  }, [i]), p = Ke((S) => {
    S.stopPropagation(), l((J) => {
      const B = !J;
      return B && S.shiftKey ? s(!0) : B || s(!1), B;
    });
  }, []), d = Sn(void 0), [v, b] = Be(0);
  tn(() => {
    i && d.current && b(d.current.clientHeight);
  }, [i]);
  const h = Ke(
    (S) => (u(), r(S)),
    [r, u]
  );
  let f = e;
  return !f && n && (f = n(c)), /* @__PURE__ */ w("div", { ref: d, style: { position: "relative" }, children: /* @__PURE__ */ w(ct, { position: "static", id: o, children: /* @__PURE__ */ me(lt, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    f ? /* @__PURE__ */ w(
      Sr,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: p,
        children: /* @__PURE__ */ w(Ci, {})
      }
    ) : void 0,
    a ? /* @__PURE__ */ w("div", { className: "papi-menu-children", children: a }) : void 0,
    f ? /* @__PURE__ */ w(
      ut,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: i,
        onClose: u,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v
          }
        },
        children: /* @__PURE__ */ w(It, { commandHandler: h, columns: f.columns })
      }
    ) : void 0
  ] }) }) });
}
const Xi = (e, n) => {
  tn(() => {
    if (!e)
      return () => {
      };
    const r = e(n);
    return () => {
      r();
    };
  }, [e, n]);
};
function Ti(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const _i = (e, n, r = {}) => {
  const t = Sn(n);
  t.current = n;
  const o = Sn(r);
  o.current = Ti(o.current);
  const [a, i] = Be(() => t.current), [l, c] = Be(!0);
  return tn(() => {
    let s = !0;
    return c(!!e), (async () => {
      if (e) {
        const u = await e();
        s && (i(() => u), c(!1));
      }
    })(), () => {
      s = !1, o.current.preserveValue || i(() => t.current);
    };
  }, [e]), [a, l];
}, kn = () => !1, Yi = (e, n) => {
  const [r] = _i(
    Ke(async () => {
      if (!e)
        return kn;
      const t = await Promise.resolve(e(n));
      return async () => t();
    }, [n, e]),
    kn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  tn(() => () => {
    r !== kn && r();
  }, [r]);
};
function Oi(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), t = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && t ? r.insertBefore(o, t) : r.appendChild(o);
}
Oi(`.papi-combo-box {
  background-color: transparent;
}

.papi-combo-box.fullwidth {
  width: 100%;
}

.papi-combo-box.error {
  background-color: #f00;
}

.papi-combo-box.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-combo-box.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

/*
Remove the default font size and weight for headings.
*/

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

/*
Add the correct font weight in Edge and Safari.
*/

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

/*
Add the correct font size in all browsers.
*/

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

/*
Use the modern Firefox focus style for all focusable elements.
*/

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

/*
Add the correct display in Chrome and Safari.
*/

/*
Removes the default spacing and border for appropriate elements.
*/

/*
Reset default styling for dialogs.
*/

/*
Prevent resizing textareas horizontally by default.
*/

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

/*
Set the default cursor for buttons.
*/

/*
Make sure disabled buttons don't get the pointer cursor.
*/

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

/* Make elements with the HTML hidden attribute stay hidden by default */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
  * {
    border-color: hsl(var(--border));
}

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
}
*, ::before, ::after {
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
}
.pr-absolute {
    position: absolute;
}
.pr-relative {
    position: relative;
}
.pr-left-2 {
    left: 0.5rem;
}
.pr-z-50 {
    z-index: 50;
}
.pr--mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
}
.pr-my-1 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
.pr-ml-auto {
    margin-left: auto;
}
.pr-flex {
    display: flex;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-2 {
    height: 0.5rem;
}
.pr-h-3 {
    height: 0.75rem;
}
.pr-h-3\\.5 {
    height: 0.875rem;
}
.pr-h-4 {
    height: 1rem;
}
.pr-h-px {
    height: 1px;
}
.pr-w-2 {
    width: 0.5rem;
}
.pr-w-3 {
    width: 0.75rem;
}
.pr-w-3\\.5 {
    width: 0.875rem;
}
.pr-w-4 {
    width: 1rem;
}
.pr-w-full {
    width: 100%;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr-cursor-default {
    cursor: default;
}
.pr-select-none {
    user-select: none;
}
.pr-items-center {
    align-items: center;
}
.pr-justify-center {
    justify-content: center;
}
.pr-overflow-hidden {
    overflow: hidden;
}
.pr-rounded-md {
    border-radius: calc(var(--radius) - 2px);
}
.pr-rounded-sm {
    border-radius: calc(var(--radius) - 4px);
}
.pr-border {
    border-width: 1px;
}
.pr-border-input {
    border-color: hsl(var(--input));
}
.pr-bg-background {
    background-color: hsl(var(--background));
}
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
}
.pr-fill-current {
    fill: currentColor;
}
.pr-p-1 {
    padding: 0.25rem;
}
.pr-px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.pr-px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}
.pr-py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}
.pr-py-1\\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
}
.pr-py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.pr-pl-8 {
    padding-left: 2rem;
}
.pr-pr-2 {
    padding-right: 0.5rem;
}
.pr-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.pr-text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.pr-font-semibold {
    font-weight: 600;
}
.pr-tracking-widest {
    letter-spacing: 0.1em;
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
}
.pr-opacity-60 {
    opacity: 0.6;
}
.pr-shadow-lg {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-shadow-md {
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.pr-ring-offset-background {
    --tw-ring-offset-color: hsl(var(--background));
}
.pr-transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
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
.file\\:pr-border-0::file-selector-button {
    border-width: 0px;
}
.file\\:pr-bg-transparent::file-selector-button {
    background-color: transparent;
}
.file\\:pr-text-sm::file-selector-button {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.file\\:pr-font-medium::file-selector-button {
    font-weight: 500;
}
.placeholder\\:pr-text-muted-foreground::placeholder {
    color: hsl(var(--muted-foreground));
}
.focus\\:pr-bg-accent:focus {
    background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
    color: hsl(var(--accent-foreground));
}
.focus-visible\\:pr-outline-none:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.focus-visible\\:pr-ring-2:focus-visible {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:pr-ring-ring:focus-visible {
    --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:pr-ring-offset-2:focus-visible {
    --tw-ring-offset-width: 2px;
}
.disabled\\:pr-cursor-not-allowed:disabled {
    cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
    opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
    pointer-events: none;
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
    background-color: hsl(var(--accent));
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
    opacity: 0.5;
}
.data-\\[state\\=open\\]\\:pr-animate-in[data-state=open] {
    animation-name: enter;
    animation-duration: 150ms;
    --tw-enter-opacity: initial;
    --tw-enter-scale: initial;
    --tw-enter-rotate: initial;
    --tw-enter-translate-x: initial;
    --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-animate-out[data-state=closed] {
    animation-name: exit;
    animation-duration: 150ms;
    --tw-exit-opacity: initial;
    --tw-exit-scale: initial;
    --tw-exit-rotate: initial;
    --tw-exit-translate-x: initial;
    --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-fade-out-0[data-state=closed] {
    --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:pr-fade-in-0[data-state=open] {
    --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:pr-zoom-out-95[data-state=closed] {
    --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:pr-zoom-in-95[data-state=open] {
    --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:pr-slide-in-from-top-2[data-side=bottom] {
    --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:pr-slide-in-from-right-2[data-side=left] {
    --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:pr-slide-in-from-left-2[data-side=right] {
    --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:pr-slide-in-from-bottom-2[data-side=top] {
    --tw-enter-translate-y: 0.5rem;
}.papi-snackbar {
  font-family: Arial, Helvetica, sans-serif;
}

.papi-snackbar.primary {
  background: #1ea7fd;
  color: white;
}

.papi-snackbar.external {
  background-color: lightsteelblue;
  border-color: white;
  border-style: dotted;
  padding: 2%;
  width: 30%;
}

.papi-snackbar.secondary {
  background: transparent;
  color: #333;
}

.papi-snackbar.alert {
  background: lightcoral;
}

.papi-snackbar.paratext {
  background: darkgreen;
  color: greenyellow;
}

.papi-snackbar.bright {
  background: greenyellow;
  color: darkgreen;
}
.papi-checkbox {
  background-color: transparent;
}

.papi-checkbox.error {
  color: #f00;
}

.papi-checkbox.error:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.papi-checkbox.paratext {
  color: greenyellow;
}

.papi-checkbox-label.paratext {
  color: darkgreen;
}

.papi-checkbox.paratext:hover {
  background-color: rgba(0, 100, 0, 0.3);
}

.papi-checkbox.paratext.bright {
  color: darkgreen;
}

.papi-checkbox-label.paratext.bright {
  background-color: greenyellow;
}

.papi-checkbox.paratext.bright:hover {
  background-color: rgba(173, 255, 47, 0.3);
}

.papi-checkbox.below,
.papi-checkbox.above {
  text-align: center;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-menu-item {
  line-height: 0.8;
}

.papi-menu-item.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-menu-item.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-slider {
  background-color: transparent;
  color: #1ea7fd;
}

.papi-slider.vertical {
  min-height: 200px;
}

.papi-slider.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-slider.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.papi-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-button.secondary {
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
  color: #333;
}

.papi-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-button.video {
  background-color: red;
  color: white;
}

.papi-button.video a,
.papi-button.video a:visited {
  color: white;
  text-decoration: none;
}

.papi-button.video a:hover {
  color: white;
  text-decoration: underline;
}
.papi-icon-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
}

.papi-icon-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-icon-button.secondary {
  background-color: transparent;
  color: #333;
}

.papi-icon-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-icon-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-multi-column-menu {
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu {
  background-color: rgb(145, 145, 145);
  font-size: 11pt;
  font-weight: 600;
  margin-top: 1px;
  padding-bottom: 2px;
  padding-left: 24px;
  padding-top: 2px;
}
.papi-switch {
  background-color: transparent;
}

.papi-switch.primary {
  background-color: #1ea7fd;
}

.papi-switch.secondary {
  background-color: #6fc8ff;
}

.papi-switch.error {
  background-color: #f00;
}

.papi-switch.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-switch.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.papi-toolbar {
  background-color: #eee;
  color: black;
}

.papi-toolbar.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-toolbar.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-menu-children {
  padding: 10px;
  position: relative;
}
.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
.chapter-select {
  display: flex;
  padding: 0 8px 0 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background: hsl(0, 0%, 96%);
}

.chapter {
  display: flex;
  width: 16px;
  height: 16px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chapter:hover {
  background: yellow;
}

.active {
  border-radius: 4px;
  background: yellow;
}

/* .chapterSelector {
  display: flex;
  padding: 0px 8px 0px 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background-color: whitesmoke;
}
.chapterSelector.focus\\:bg-accent:focus {
  background-color: whitesmoke;
}
.chapterSelector > * {
  display: flex;
  width: 36px;
  padding: 8px 12px 8px 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.chapterSelector > *.active {
  background-color: #fef3c7;
}
.chapterSelector > *:hover {
  background-color: hsl(48 100% 96.1%);
} */

/* State=default, type=default */
.book-chapter-input {
  width: 300px;
  height: 36px;
  padding: 0 12px 0 40px;
}

/* navigation menu item */
/*
box-sizing: border-box;

 Auto layout
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 12px 8px 16px;
gap: 10px;

width: 153px;
height: 36px;

background: #FFFFFF;
border: 1px solid #000000;
border-radius: 6px;

/* Inside auto layout
flex: none;
order: 0;
flex-grow: 0; */
@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-34 {
    contain: strict;
    grid-row: 1;
    visibility: hidden
}
  }


@layer rdg.Cell {.c1wupbe7-0-0-beta-34 {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    contain: style;
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none
}

    .c1wupbe7-0-0-beta-34[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}

.c1730fa47-0-0-beta-34 {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3)
}
  }


@layer rdg.CheckboxLabel {.c1hs68w07-0-0-beta-34 {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px /* align checkbox in row group cell */
}
  }

@layer rdg.CheckboxInput {

.cojpd0n7-0-0-beta-34 {
    all: unset
}
  }

@layer rdg.CheckboxIcon {

.cwsfieb7-0-0-beta-34 {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color)
}

    .cojpd0n7-0-0-beta-34:checked + .cwsfieb7-0-0-beta-34 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .cojpd0n7-0-0-beta-34:focus + .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

@layer rdg.CheckboxLabel {

.c1fgadbl7-0-0-beta-34 {
    cursor: default
}

    .c1fgadbl7-0-0-beta-34 .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }


@layer rdg.GroupCellContent {.g1w3c5217-0-0-beta-34 {
    outline: none
}
  }

@layer rdg.GroupCellCaret {

.cm5tyhw7-0-0-beta-34 {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

    .cm5tyhw7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg.DragHandle {.cadd3bp7-0-0-beta-34 {
    cursor: move;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color)
}

    .cadd3bp7-0-0-beta-34:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }


@layer rdg.EditCell {.c1tngyp17-0-0-beta-34 {
    padding: 0
}
  }


@layer rdg.Row {.r1otpg647-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color)
}

    .r1otpg647-0-0-beta-34:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-34[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

      .r1otpg647-0-0-beta-34[aria-selected='true']:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
  }

@layer rdg.FocusSink {

.rel5gk27-0-0-beta-34 {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px
}
    .r1qymf1z7-0-0-beta-34::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }


@layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-34:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-34 > .c1wupbe7-0-0-beta-34:not(:last-child):not(.c1730fa47-0-0-beta-34) {
      border-inline-end: none;
    }
  }


@layer rdg.SortableHeaderCell {.hizp7y17-0-0-beta-34 {
    cursor: pointer;
    display: flex
}

    .hizp7y17-0-0-beta-34:focus {
      outline: none;
    }
  }

@layer rdg.SortableHeaderCellName {

.h14cojrm7-0-0-beta-34 {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis
}
  }


@layer rdg.HeaderCell {.celq7o97-0-0-beta-34 {
    touch-action: none
}

    .celq7o97-0-0-beta-34::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }


@layer rdg.HeaderRow {.h197vzie7-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold
}

    .h197vzie7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }


@layer rdg.Cell {.ccpfvsn7-0-0-beta-34 {
    background-color: #ccccff
}

.c1bmg16t7-0-0-beta-34 {
    background-color: #ccccff
}

    .c1bmg16t7-0-0-beta-34.ccpfvsn7-0-0-beta-34 {
      background-color: #9999ff;
    }
  }


@layer rdg.SortIcon {.a1mygwml7-0-0-beta-34 {
    fill: currentColor
}

    .a1mygwml7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg {
    @layer Defaults,
      FocusSink,
      CheckboxInput,
      CheckboxIcon,
      CheckboxLabel,
      Cell,
      HeaderCell,
      SummaryCell,
      EditCell,
      Row,
      HeaderRow,
      SummaryRow,
      GroupedRow,
      Root;

    @layer Defaults {
      .r104f42s7-0-0-beta-34 *,
      .r104f42s7-0-0-beta-34 *::before,
      .r104f42s7-0-0-beta-34 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {.r104f42s7-0-0-beta-34 {
      --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
      --rdg-selection-color: #66afe9;
      --rdg-font-size: 14px;

      display: grid;

      color-scheme: var(--rdg-color-scheme, light dark);

      /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
      /* We set a stacking context so internal elements don't render on top of external elements. */
      /* size containment is not used as it could break "width: min-content" for example, and the grid would infinitely resize on Chromium browsers */
      contain: content;
      content-visibility: auto;
      block-size: 350px;
      border: 1px solid var(--rdg-border-color);
      box-sizing: border-box;
      overflow: auto;
      background-color: var(--rdg-background-color);
      color: var(--rdg-color);
      font-size: var(--rdg-font-size)

      /* needed on Firefox */
}
      .r104f42s7-0-0-beta-34::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-34.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-34.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-34:not(.rdg-light) {
          --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

@layer rdg.Root {

.v7ly7s7-0-0-beta-34 {
    user-select: none
}

    .v7ly7s7-0-0-beta-34 .r1otpg647-0-0-beta-34 {
      cursor: move;
    }
  }

@layer rdg.FocusSink {

.fc4f4zb7-0-0-beta-34 {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 2 to show up above header row */
    z-index: 3
}
  }


@layer rdg.SummaryCell {.s1n3hxke7-0-0-beta-34 {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom)
}
  }


@layer rdg.SummaryRow {.snfqesz7-0-0-beta-34 {
    line-height: var(--rdg-summary-row-height)
}

    .snfqesz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      position: sticky;
    }
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
    .b1odhhml7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }


@layer rdg.TextEditor {.tlmcuo07-0-0-beta-34 {
    appearance: none;

    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding-block: 0;
    padding-inline: 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--rdg-color);
    background-color: var(--rdg-background-color);

    font-family: inherit;
    font-size: var(--rdg-font-size)
}

    .tlmcuo07-0-0-beta-34:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-34::placeholder {
      color: #999;
      opacity: 1;
    }
  }

`, "top");
export {
  Di as BookChapterControl,
  Re as Button,
  ji as ChapterRangeSelector,
  $t as Checkbox,
  En as ComboBox,
  It as GridMenu,
  Vi as IconButton,
  ze as LabelPosition,
  At as MenuItem,
  Fi as RefSelector,
  Li as SearchBar,
  Ui as Slider,
  Hi as Snackbar,
  Wi as Switch,
  Gi as Table,
  Qe as TextField,
  qi as Toolbar,
  Xi as useEvent,
  Yi as useEventAsync,
  _i as usePromise
};
//# sourceMappingURL=index.js.map
