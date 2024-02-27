import { jsx as O, jsxs as ye, Fragment as ht } from "react/jsx-runtime";
import { Button as To, Autocomplete as ko, TextField as Pr, FormControlLabel as At, FormLabel as So, Checkbox as wo, MenuItem as Rr, ListItemText as Oo, ListItemIcon as Co, Menu as Po, Grid as Nr, List as Ro, IconButton as _r, Paper as No, Slider as _o, Snackbar as $o, Switch as Io, AppBar as Mo, Toolbar as Ao, Drawer as Do } from "@mui/material";
import * as w from "react";
import en, { useMemo as mt, useState as je, useCallback as xn, useRef as it, useEffect as Mn } from "react";
import Bo, { ThemeContext as jo, internal_processStyles as Lo } from "@mui/styled-engine";
import * as Fo from "react-dom";
import vn from "react-dom";
import { offsetBook as Dt, FIRST_SCR_BOOK_NUM as Vo, offsetChapter as Bt, FIRST_SCR_CHAPTER_NUM as zo, getChaptersForBook as Uo, offsetVerse as jt, FIRST_SCR_VERSE_NUM as Ho } from "platform-bible-utils";
import qo, { SelectColumn as Wo } from "react-data-grid";
function qe({
  id: e,
  isDisabled: n = !1,
  className: t,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ O(
    To,
    {
      id: e,
      disabled: n,
      className: `papi-button ${t ?? ""}`,
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
function st({
  id: e,
  title: n,
  isDisabled: t = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: s,
  options: c = [],
  className: l,
  value: u,
  onChange: d,
  onFocus: p,
  onBlur: f,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ O(
    ko,
    {
      id: e,
      disablePortal: !0,
      disabled: t,
      disableClearable: !r,
      fullWidth: i,
      options: c,
      className: `papi-combo-box ${o ? "error" : ""} ${l ?? ""}`,
      value: u,
      onChange: d,
      onFocus: p,
      onBlur: f,
      getOptionLabel: b,
      renderInput: (y) => /* @__PURE__ */ O(
        Pr,
        {
          ...y,
          error: o,
          fullWidth: i,
          disabled: t,
          label: n,
          style: { width: s }
        }
      )
    }
  );
}
function kl({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: t,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const s = mt(
    () => Array.from({ length: i }, (u, d) => d + 1),
    [i]
  ), c = (u, d) => {
    t(d), d > n && r(d);
  }, l = (u, d) => {
    r(d), d < e && t(d);
  };
  return /* @__PURE__ */ ye(ht, { children: [
    /* @__PURE__ */ O(
      At,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ O(
          st,
          {
            onChange: (u, d) => c(u, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (u) => u.toString(),
            value: e,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ O(
      At,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ O(
          st,
          {
            onChange: (u, d) => l(u, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (u) => u.toString(),
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
var Ze = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Ze || {});
function Go({
  id: e,
  isChecked: n,
  labelText: t = "",
  labelPosition: r = Ze.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: c = !1,
  className: l,
  onChange: u
}) {
  const d = /* @__PURE__ */ O(
    wo,
    {
      id: e,
      checked: n,
      indeterminate: o,
      defaultChecked: i,
      disabled: s,
      className: `papi-checkbox ${c ? "error" : ""} ${l ?? ""}`,
      onChange: u
    }
  );
  let p;
  if (t) {
    const f = r === Ze.Before || r === Ze.Above, b = /* @__PURE__ */ O("span", { className: `papi-checkbox-label ${c ? "error" : ""} ${l ?? ""}`, children: t }), y = r === Ze.Before || r === Ze.After, m = y ? b : /* @__PURE__ */ O("div", { children: b }), h = y ? d : /* @__PURE__ */ O("div", { children: d });
    p = /* @__PURE__ */ ye(
      So,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: c,
        children: [
          f && m,
          h,
          !f && m
        ]
      }
    );
  } else
    p = d;
  return p;
}
function Lt(e, n, t) {
  return e ? /* @__PURE__ */ O(Co, { className: `papi-menu-icon-${t ? "leading" : "trailing"}`, children: /* @__PURE__ */ O("img", { src: e, alt: `${t ? "Leading" : "Trailing"} icon for ${n}` }) }) : void 0;
}
function Ko(e) {
  const {
    onClick: n,
    label: t,
    allowForLeadingIcons: r = !0,
    iconPathBefore: o = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: s = !1,
    className: c,
    isDisabled: l = !1,
    isDense: u = !0,
    hasDisabledGutters: d = !1,
    hasDivider: p = !1,
    focusVisibleClassName: f,
    id: b,
    children: y
  } = e;
  return /* @__PURE__ */ O(
    Rr,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: s,
      className: c,
      disabled: l,
      dense: u,
      disableGutters: d,
      divider: p,
      focusVisibleClassName: f,
      onClick: n,
      id: b,
      children: t ? /* @__PURE__ */ ye(ht, { children: [
        Lt(o, t, !0),
        /* @__PURE__ */ O(Oo, { primary: t, inset: !o && r }),
        Lt(i, t, !1)
      ] }) : y
    }
  );
}
function $r(e) {
  return Object.entries(e.groups).map(([t, r]) => ({ id: t, group: r }));
}
function Xo(e) {
  const [n, t] = je(void 0), { parentMenuItem: r, menuDefinition: o } = e, i = (l) => {
    t(l.currentTarget);
  }, s = () => {
    t(void 0);
  }, c = () => {
    let l = $r(o).filter((u) => "menuItem" in u.group);
    return r != null && r.id && (l = l.filter(
      (u) => "menuItem" in u && u.menuItem === r.id
    )), gt(e, l);
  };
  return /* @__PURE__ */ ye(ht, { children: [
    /* @__PURE__ */ O(Rr, { onClick: i, children: r.label }),
    /* @__PURE__ */ O(
      Po,
      {
        anchorEl: n,
        open: !!n,
        onClose: s,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        children: c()
      },
      r.id
    )
  ] });
}
const Yo = (e, n) => n.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function gt(e, n) {
  const { menuDefinition: t, onClick: r, commandHandler: o } = e, i = ((n == null ? void 0 : n.length) ?? 0) > 0 ? n : (
    // We're apparently laying out a single-column menu (presumably a context menu). In this case,
    // all groups should be included expect ones that belong to a submenu.
    $r(t).filter((f) => !("menuItem" in f.group))
  ), s = Object.values(i).sort(
    (f, b) => (f.group.order || 0) - (b.group.order || 0)
  ), c = [];
  s.forEach((f) => {
    Yo(f.id, t.items).forEach(
      (b) => c.push({ item: b, isLastItemInGroup: !1 })
    ), c.length > 0 && (c[c.length - 1].isLastItemInGroup = !0);
  }), c.length > 0 && (c[c.length - 1].isLastItemInGroup = !1);
  const l = c == null ? void 0 : c.some((f) => "iconPathBefore" in f), u = ({ item: f, isLastItemInGroup: b }) => ({
    className: "papi-menu-item",
    label: f.label,
    iconPathBefore: "iconPathBefore" in f ? f.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in f ? f.iconPathAfter : void 0,
    hasDivider: b,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: l
  }), [d] = c;
  if (!d)
    return /* @__PURE__ */ O("div", {});
  const p = d.item.group;
  return /* @__PURE__ */ O("div", { role: "menu", "aria-label": p, children: (() => {
    const f = [];
    return c.forEach((b, y) => {
      const { item: m } = b, h = u(b);
      if ("command" in m) {
        const T = m.group + y;
        f.push(
          /* @__PURE__ */ O(
            Ko,
            {
              onClick: () => {
                r == null || r(), o(m);
              },
              ...h
            },
            T
          )
        );
      } else
        f.push(/* @__PURE__ */ O(Xo, { parentMenuItem: m, ...e }, p + m.id));
    }), f;
  })() }, p);
}
function Jo(e) {
  const { menuDefinition: n, columnId: t } = e;
  let i = Object.entries(n.groups).map(([s, c]) => ({ id: s, group: c })).filter((s) => "column" in s.group);
  return t && "columns" in n && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  n.columns[t] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === t
  )), gt(e, i);
}
function Zo({
  commandHandler: e,
  menuDefinition: n,
  id: t,
  metadata: r,
  onClick: o,
  className: i
  // className is now part of the destructured props object
}) {
  return /* @__PURE__ */ ye(
    Nr,
    {
      id: t,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": t,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ O("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ O(Ro, { id: t, dense: !0, className: i ?? "", children: /* @__PURE__ */ O(
          Jo,
          {
            commandHandler: e,
            menuDefinition: n,
            columnId: t,
            onClick: o
          }
        ) })
      ]
    }
  );
}
function Qo({
  commandHandler: e,
  className: n,
  multiColumnMenu: t,
  id: r
}) {
  const { columns: o } = t, i = /* @__PURE__ */ new Map();
  Object.getOwnPropertyNames(o).forEach((c) => {
    if (c === "isExtensible")
      return;
    const l = c, u = o[l];
    typeof u == "object" && i.set(u.order, { id: l, metadata: u });
  });
  const s = Array.from(i.values()).sort((c, l) => (c.metadata.order || 0) - (l.metadata.order || 0));
  return /* @__PURE__ */ O(
    Nr,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${n ?? ""}`,
      columns: s.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: s.map((c, l) => /* @__PURE__ */ O(
        Zo,
        {
          commandHandler: e,
          menuDefinition: t,
          ...c,
          className: n
        },
        l
      ))
    }
  );
}
function Sl({
  id: e,
  label: n,
  isDisabled: t = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: s = "medium",
  className: c,
  onClick: l,
  children: u
}) {
  return /* @__PURE__ */ O(
    _r,
    {
      id: e,
      disabled: t,
      edge: i,
      size: s,
      "aria-label": n,
      title: o ? void 0 : r ?? n,
      className: `papi-icon-button ${c ?? ""}`,
      onClick: l,
      children: u
    }
  );
}
function k() {
  return k = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = arguments[n];
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
  }, k.apply(this, arguments);
}
function ae(e, n) {
  if (e == null)
    return {};
  var t = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(n.indexOf(o) >= 0) && (t[o] = e[o]);
  return t;
}
function ei(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var at = { exports: {} }, ne = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ft;
function ni() {
  if (Ft)
    return ne;
  Ft = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function m(h) {
    if (typeof h == "object" && h !== null) {
      var T = h.$$typeof;
      switch (T) {
        case e:
          switch (h = h.type, h) {
            case t:
            case o:
            case r:
            case u:
            case d:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case c:
                case s:
                case l:
                case f:
                case p:
                case i:
                  return h;
                default:
                  return T;
              }
          }
        case n:
          return T;
      }
    }
  }
  return ne.ContextConsumer = s, ne.ContextProvider = i, ne.Element = e, ne.ForwardRef = l, ne.Fragment = t, ne.Lazy = f, ne.Memo = p, ne.Portal = n, ne.Profiler = o, ne.StrictMode = r, ne.Suspense = u, ne.SuspenseList = d, ne.isAsyncMode = function() {
    return !1;
  }, ne.isConcurrentMode = function() {
    return !1;
  }, ne.isContextConsumer = function(h) {
    return m(h) === s;
  }, ne.isContextProvider = function(h) {
    return m(h) === i;
  }, ne.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, ne.isForwardRef = function(h) {
    return m(h) === l;
  }, ne.isFragment = function(h) {
    return m(h) === t;
  }, ne.isLazy = function(h) {
    return m(h) === f;
  }, ne.isMemo = function(h) {
    return m(h) === p;
  }, ne.isPortal = function(h) {
    return m(h) === n;
  }, ne.isProfiler = function(h) {
    return m(h) === o;
  }, ne.isStrictMode = function(h) {
    return m(h) === r;
  }, ne.isSuspense = function(h) {
    return m(h) === u;
  }, ne.isSuspenseList = function(h) {
    return m(h) === d;
  }, ne.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === t || h === o || h === r || h === u || h === d || h === b || typeof h == "object" && h !== null && (h.$$typeof === f || h.$$typeof === p || h.$$typeof === i || h.$$typeof === s || h.$$typeof === l || h.$$typeof === y || h.getModuleId !== void 0);
  }, ne.typeOf = m, ne;
}
var te = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function ti() {
  return Vt || (Vt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y = !1, m = !1, h = !1, T = !1, B = !1, E;
    E = Symbol.for("react.module.reference");
    function x(S) {
      return !!(typeof S == "string" || typeof S == "function" || S === t || S === o || B || S === r || S === u || S === d || T || S === b || y || m || h || typeof S == "object" && S !== null && (S.$$typeof === f || S.$$typeof === p || S.$$typeof === i || S.$$typeof === s || S.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      S.$$typeof === E || S.getModuleId !== void 0));
    }
    function g(S) {
      if (typeof S == "object" && S !== null) {
        var fe = S.$$typeof;
        switch (fe) {
          case e:
            var he = S.type;
            switch (he) {
              case t:
              case o:
              case r:
              case u:
              case d:
                return he;
              default:
                var Se = he && he.$$typeof;
                switch (Se) {
                  case c:
                  case s:
                  case l:
                  case f:
                  case p:
                  case i:
                    return Se;
                  default:
                    return fe;
                }
            }
          case n:
            return fe;
        }
      }
    }
    var M = s, _ = i, K = e, Z = l, R = t, G = f, q = p, ee = n, I = o, N = r, $ = u, j = d, ie = !1, Q = !1;
    function v(S) {
      return ie || (ie = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function P(S) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(S) {
      return g(S) === s;
    }
    function z(S) {
      return g(S) === i;
    }
    function D(S) {
      return typeof S == "object" && S !== null && S.$$typeof === e;
    }
    function V(S) {
      return g(S) === l;
    }
    function L(S) {
      return g(S) === t;
    }
    function F(S) {
      return g(S) === f;
    }
    function W(S) {
      return g(S) === p;
    }
    function X(S) {
      return g(S) === n;
    }
    function U(S) {
      return g(S) === o;
    }
    function de(S) {
      return g(S) === r;
    }
    function C(S) {
      return g(S) === u;
    }
    function H(S) {
      return g(S) === d;
    }
    te.ContextConsumer = M, te.ContextProvider = _, te.Element = K, te.ForwardRef = Z, te.Fragment = R, te.Lazy = G, te.Memo = q, te.Portal = ee, te.Profiler = I, te.StrictMode = N, te.Suspense = $, te.SuspenseList = j, te.isAsyncMode = v, te.isConcurrentMode = P, te.isContextConsumer = A, te.isContextProvider = z, te.isElement = D, te.isForwardRef = V, te.isFragment = L, te.isLazy = F, te.isMemo = W, te.isPortal = X, te.isProfiler = U, te.isStrictMode = de, te.isSuspense = C, te.isSuspenseList = H, te.isValidElementType = x, te.typeOf = g;
  }()), te;
}
process.env.NODE_ENV === "production" ? at.exports = ni() : at.exports = ti();
var wn = at.exports, ct = { exports: {} }, En = { exports: {} }, re = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zt;
function ri() {
  if (zt)
    return re;
  zt = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, B = e ? Symbol.for("react.scope") : 60119;
  function E(g) {
    if (typeof g == "object" && g !== null) {
      var M = g.$$typeof;
      switch (M) {
        case n:
          switch (g = g.type, g) {
            case l:
            case u:
            case r:
            case i:
            case o:
            case p:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case c:
                case d:
                case y:
                case b:
                case s:
                  return g;
                default:
                  return M;
              }
          }
        case t:
          return M;
      }
    }
  }
  function x(g) {
    return E(g) === u;
  }
  return re.AsyncMode = l, re.ConcurrentMode = u, re.ContextConsumer = c, re.ContextProvider = s, re.Element = n, re.ForwardRef = d, re.Fragment = r, re.Lazy = y, re.Memo = b, re.Portal = t, re.Profiler = i, re.StrictMode = o, re.Suspense = p, re.isAsyncMode = function(g) {
    return x(g) || E(g) === l;
  }, re.isConcurrentMode = x, re.isContextConsumer = function(g) {
    return E(g) === c;
  }, re.isContextProvider = function(g) {
    return E(g) === s;
  }, re.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === n;
  }, re.isForwardRef = function(g) {
    return E(g) === d;
  }, re.isFragment = function(g) {
    return E(g) === r;
  }, re.isLazy = function(g) {
    return E(g) === y;
  }, re.isMemo = function(g) {
    return E(g) === b;
  }, re.isPortal = function(g) {
    return E(g) === t;
  }, re.isProfiler = function(g) {
    return E(g) === i;
  }, re.isStrictMode = function(g) {
    return E(g) === o;
  }, re.isSuspense = function(g) {
    return E(g) === p;
  }, re.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === u || g === i || g === o || g === p || g === f || typeof g == "object" && g !== null && (g.$$typeof === y || g.$$typeof === b || g.$$typeof === s || g.$$typeof === c || g.$$typeof === d || g.$$typeof === h || g.$$typeof === T || g.$$typeof === B || g.$$typeof === m);
  }, re.typeOf = E, re;
}
var oe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ut;
function oi() {
  return Ut || (Ut = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, B = e ? Symbol.for("react.scope") : 60119;
    function E(C) {
      return typeof C == "string" || typeof C == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      C === r || C === u || C === i || C === o || C === p || C === f || typeof C == "object" && C !== null && (C.$$typeof === y || C.$$typeof === b || C.$$typeof === s || C.$$typeof === c || C.$$typeof === d || C.$$typeof === h || C.$$typeof === T || C.$$typeof === B || C.$$typeof === m);
    }
    function x(C) {
      if (typeof C == "object" && C !== null) {
        var H = C.$$typeof;
        switch (H) {
          case n:
            var S = C.type;
            switch (S) {
              case l:
              case u:
              case r:
              case i:
              case o:
              case p:
                return S;
              default:
                var fe = S && S.$$typeof;
                switch (fe) {
                  case c:
                  case d:
                  case y:
                  case b:
                  case s:
                    return fe;
                  default:
                    return H;
                }
            }
          case t:
            return H;
        }
      }
    }
    var g = l, M = u, _ = c, K = s, Z = n, R = d, G = r, q = y, ee = b, I = t, N = i, $ = o, j = p, ie = !1;
    function Q(C) {
      return ie || (ie = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), v(C) || x(C) === l;
    }
    function v(C) {
      return x(C) === u;
    }
    function P(C) {
      return x(C) === c;
    }
    function A(C) {
      return x(C) === s;
    }
    function z(C) {
      return typeof C == "object" && C !== null && C.$$typeof === n;
    }
    function D(C) {
      return x(C) === d;
    }
    function V(C) {
      return x(C) === r;
    }
    function L(C) {
      return x(C) === y;
    }
    function F(C) {
      return x(C) === b;
    }
    function W(C) {
      return x(C) === t;
    }
    function X(C) {
      return x(C) === i;
    }
    function U(C) {
      return x(C) === o;
    }
    function de(C) {
      return x(C) === p;
    }
    oe.AsyncMode = g, oe.ConcurrentMode = M, oe.ContextConsumer = _, oe.ContextProvider = K, oe.Element = Z, oe.ForwardRef = R, oe.Fragment = G, oe.Lazy = q, oe.Memo = ee, oe.Portal = I, oe.Profiler = N, oe.StrictMode = $, oe.Suspense = j, oe.isAsyncMode = Q, oe.isConcurrentMode = v, oe.isContextConsumer = P, oe.isContextProvider = A, oe.isElement = z, oe.isForwardRef = D, oe.isFragment = V, oe.isLazy = L, oe.isMemo = F, oe.isPortal = W, oe.isProfiler = X, oe.isStrictMode = U, oe.isSuspense = de, oe.isValidElementType = E, oe.typeOf = x;
  }()), oe;
}
var Ht;
function Ir() {
  return Ht || (Ht = 1, process.env.NODE_ENV === "production" ? En.exports = ri() : En.exports = oi()), En.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Wn, qt;
function ii() {
  if (qt)
    return Wn;
  qt = 1;
  var e = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function r(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, c = 0; c < 10; c++)
        s["_" + String.fromCharCode(c)] = c;
      var l = Object.getOwnPropertyNames(s).map(function(d) {
        return s[d];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        u[d] = d;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Wn = o() ? Object.assign : function(i, s) {
    for (var c, l = r(i), u, d = 1; d < arguments.length; d++) {
      c = Object(arguments[d]);
      for (var p in c)
        n.call(c, p) && (l[p] = c[p]);
      if (e) {
        u = e(c);
        for (var f = 0; f < u.length; f++)
          t.call(c, u[f]) && (l[u[f]] = c[u[f]]);
      }
    }
    return l;
  }, Wn;
}
var Gn, Wt;
function bt() {
  if (Wt)
    return Gn;
  Wt = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Gn = e, Gn;
}
var Kn, Gt;
function Mr() {
  return Gt || (Gt = 1, Kn = Function.call.bind(Object.prototype.hasOwnProperty)), Kn;
}
var Xn, Kt;
function si() {
  if (Kt)
    return Xn;
  Kt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = bt(), t = {}, r = Mr();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, c, l, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in i)
        if (r(i, d)) {
          var p;
          try {
            if (typeof i[d] != "function") {
              var f = Error(
                (l || "React class") + ": " + c + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            p = i[d](s, d, l, c, null, n);
          } catch (y) {
            p = y;
          }
          if (p && !(p instanceof Error) && e(
            (l || "React class") + ": type specification of " + c + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in t)) {
            t[p.message] = !0;
            var b = u ? u() : "";
            e(
              "Failed " + c + " type: " + p.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, Xn = o, Xn;
}
var Yn, Xt;
function ai() {
  if (Xt)
    return Yn;
  Xt = 1;
  var e = Ir(), n = ii(), t = bt(), r = Mr(), o = si(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(c) {
    var l = "Warning: " + c;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return Yn = function(c, l) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function p(v) {
      var P = v && (u && v[u] || v[d]);
      if (typeof P == "function")
        return P;
    }
    var f = "<<anonymous>>", b = {
      array: T("array"),
      bigint: T("bigint"),
      bool: T("boolean"),
      func: T("function"),
      number: T("number"),
      object: T("object"),
      string: T("string"),
      symbol: T("symbol"),
      any: B(),
      arrayOf: E,
      element: x(),
      elementType: g(),
      instanceOf: M,
      node: R(),
      objectOf: K,
      oneOf: _,
      oneOfType: Z,
      shape: q,
      exact: ee
    };
    function y(v, P) {
      return v === P ? v !== 0 || 1 / v === 1 / P : v !== v && P !== P;
    }
    function m(v, P) {
      this.message = v, this.data = P && typeof P == "object" ? P : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function h(v) {
      if (process.env.NODE_ENV !== "production")
        var P = {}, A = 0;
      function z(V, L, F, W, X, U, de) {
        if (W = W || f, U = U || F, de !== t) {
          if (l) {
            var C = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw C.name = "Invariant Violation", C;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var H = W + ":" + F;
            !P[H] && // Avoid spamming the console because they are often not actionable except for lib authors
            A < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + U + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), P[H] = !0, A++);
          }
        }
        return L[F] == null ? V ? L[F] === null ? new m("The " + X + " `" + U + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new m("The " + X + " `" + U + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : v(L, F, W, X, U);
      }
      var D = z.bind(null, !1);
      return D.isRequired = z.bind(null, !0), D;
    }
    function T(v) {
      function P(A, z, D, V, L, F) {
        var W = A[z], X = $(W);
        if (X !== v) {
          var U = j(W);
          return new m(
            "Invalid " + V + " `" + L + "` of type " + ("`" + U + "` supplied to `" + D + "`, expected ") + ("`" + v + "`."),
            { expectedType: v }
          );
        }
        return null;
      }
      return h(P);
    }
    function B() {
      return h(s);
    }
    function E(v) {
      function P(A, z, D, V, L) {
        if (typeof v != "function")
          return new m("Property `" + L + "` of component `" + D + "` has invalid PropType notation inside arrayOf.");
        var F = A[z];
        if (!Array.isArray(F)) {
          var W = $(F);
          return new m("Invalid " + V + " `" + L + "` of type " + ("`" + W + "` supplied to `" + D + "`, expected an array."));
        }
        for (var X = 0; X < F.length; X++) {
          var U = v(F, X, D, V, L + "[" + X + "]", t);
          if (U instanceof Error)
            return U;
        }
        return null;
      }
      return h(P);
    }
    function x() {
      function v(P, A, z, D, V) {
        var L = P[A];
        if (!c(L)) {
          var F = $(L);
          return new m("Invalid " + D + " `" + V + "` of type " + ("`" + F + "` supplied to `" + z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(v);
    }
    function g() {
      function v(P, A, z, D, V) {
        var L = P[A];
        if (!e.isValidElementType(L)) {
          var F = $(L);
          return new m("Invalid " + D + " `" + V + "` of type " + ("`" + F + "` supplied to `" + z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(v);
    }
    function M(v) {
      function P(A, z, D, V, L) {
        if (!(A[z] instanceof v)) {
          var F = v.name || f, W = Q(A[z]);
          return new m("Invalid " + V + " `" + L + "` of type " + ("`" + W + "` supplied to `" + D + "`, expected ") + ("instance of `" + F + "`."));
        }
        return null;
      }
      return h(P);
    }
    function _(v) {
      if (!Array.isArray(v))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function P(A, z, D, V, L) {
        for (var F = A[z], W = 0; W < v.length; W++)
          if (y(F, v[W]))
            return null;
        var X = JSON.stringify(v, function(de, C) {
          var H = j(C);
          return H === "symbol" ? String(C) : C;
        });
        return new m("Invalid " + V + " `" + L + "` of value `" + String(F) + "` " + ("supplied to `" + D + "`, expected one of " + X + "."));
      }
      return h(P);
    }
    function K(v) {
      function P(A, z, D, V, L) {
        if (typeof v != "function")
          return new m("Property `" + L + "` of component `" + D + "` has invalid PropType notation inside objectOf.");
        var F = A[z], W = $(F);
        if (W !== "object")
          return new m("Invalid " + V + " `" + L + "` of type " + ("`" + W + "` supplied to `" + D + "`, expected an object."));
        for (var X in F)
          if (r(F, X)) {
            var U = v(F, X, D, V, L + "." + X, t);
            if (U instanceof Error)
              return U;
          }
        return null;
      }
      return h(P);
    }
    function Z(v) {
      if (!Array.isArray(v))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var P = 0; P < v.length; P++) {
        var A = v[P];
        if (typeof A != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ie(A) + " at index " + P + "."
          ), s;
      }
      function z(D, V, L, F, W) {
        for (var X = [], U = 0; U < v.length; U++) {
          var de = v[U], C = de(D, V, L, F, W, t);
          if (C == null)
            return null;
          C.data && r(C.data, "expectedType") && X.push(C.data.expectedType);
        }
        var H = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new m("Invalid " + F + " `" + W + "` supplied to " + ("`" + L + "`" + H + "."));
      }
      return h(z);
    }
    function R() {
      function v(P, A, z, D, V) {
        return I(P[A]) ? null : new m("Invalid " + D + " `" + V + "` supplied to " + ("`" + z + "`, expected a ReactNode."));
      }
      return h(v);
    }
    function G(v, P, A, z, D) {
      return new m(
        (v || "React class") + ": " + P + " type `" + A + "." + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + D + "`."
      );
    }
    function q(v) {
      function P(A, z, D, V, L) {
        var F = A[z], W = $(F);
        if (W !== "object")
          return new m("Invalid " + V + " `" + L + "` of type `" + W + "` " + ("supplied to `" + D + "`, expected `object`."));
        for (var X in v) {
          var U = v[X];
          if (typeof U != "function")
            return G(D, V, L, X, j(U));
          var de = U(F, X, D, V, L + "." + X, t);
          if (de)
            return de;
        }
        return null;
      }
      return h(P);
    }
    function ee(v) {
      function P(A, z, D, V, L) {
        var F = A[z], W = $(F);
        if (W !== "object")
          return new m("Invalid " + V + " `" + L + "` of type `" + W + "` " + ("supplied to `" + D + "`, expected `object`."));
        var X = n({}, A[z], v);
        for (var U in X) {
          var de = v[U];
          if (r(v, U) && typeof de != "function")
            return G(D, V, L, U, j(de));
          if (!de)
            return new m(
              "Invalid " + V + " `" + L + "` key `" + U + "` supplied to `" + D + "`.\nBad object: " + JSON.stringify(A[z], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(v), null, "  ")
            );
          var C = de(F, U, D, V, L + "." + U, t);
          if (C)
            return C;
        }
        return null;
      }
      return h(P);
    }
    function I(v) {
      switch (typeof v) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !v;
        case "object":
          if (Array.isArray(v))
            return v.every(I);
          if (v === null || c(v))
            return !0;
          var P = p(v);
          if (P) {
            var A = P.call(v), z;
            if (P !== v.entries) {
              for (; !(z = A.next()).done; )
                if (!I(z.value))
                  return !1;
            } else
              for (; !(z = A.next()).done; ) {
                var D = z.value;
                if (D && !I(D[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function N(v, P) {
      return v === "symbol" ? !0 : P ? P["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && P instanceof Symbol : !1;
    }
    function $(v) {
      var P = typeof v;
      return Array.isArray(v) ? "array" : v instanceof RegExp ? "object" : N(P, v) ? "symbol" : P;
    }
    function j(v) {
      if (typeof v > "u" || v === null)
        return "" + v;
      var P = $(v);
      if (P === "object") {
        if (v instanceof Date)
          return "date";
        if (v instanceof RegExp)
          return "regexp";
      }
      return P;
    }
    function ie(v) {
      var P = j(v);
      switch (P) {
        case "array":
        case "object":
          return "an " + P;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + P;
        default:
          return P;
      }
    }
    function Q(v) {
      return !v.constructor || !v.constructor.name ? f : v.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, Yn;
}
var Jn, Yt;
function ci() {
  if (Yt)
    return Jn;
  Yt = 1;
  var e = bt();
  function n() {
  }
  function t() {
  }
  return t.resetWarningCache = n, Jn = function() {
    function r(s, c, l, u, d, p) {
      if (p !== e) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
      }
    }
    r.isRequired = r;
    function o() {
      return r;
    }
    var i = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: o,
      element: r,
      elementType: r,
      instanceOf: o,
      node: r,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: t,
      resetWarningCache: n
    };
    return i.PropTypes = i, i;
  }, Jn;
}
if (process.env.NODE_ENV !== "production") {
  var li = Ir(), ui = !0;
  ct.exports = ai()(li.isElement, ui);
} else
  ct.exports = ci()();
var di = ct.exports;
const a = /* @__PURE__ */ ei(di);
function Ar(e) {
  var n, t, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (n = 0; n < o; n++)
        e[n] && (t = Ar(e[n])) && (r && (r += " "), r += t);
    } else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function Ce() {
  for (var e, n, t = 0, r = "", o = arguments.length; t < o; t++)
    (e = arguments[t]) && (n = Ar(e)) && (r && (r += " "), r += n);
  return r;
}
function gn(e, n) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || n(...r);
  };
}
function $e(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Dr(e) {
  if (!$e(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((t) => {
    n[t] = Dr(e[t]);
  }), n;
}
function xe(e, n, t = {
  clone: !0
}) {
  const r = t.clone ? k({}, e) : e;
  return $e(e) && $e(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && ($e(n[o]) && o in e && $e(e[o]) ? r[o] = xe(e[o], n[o], t) : t.clone ? r[o] = $e(n[o]) ? Dr(n[o]) : n[o] : r[o] = n[o]);
  }), r;
}
function fi(e) {
  const {
    prototype: n = {}
  } = e;
  return !!n.isReactComponent;
}
function Br(e, n, t, r, o) {
  const i = e[n], s = o || n;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  const l = i.type;
  return typeof l == "function" && !fi(l) && (c = "Did you accidentally use a plain function component for an element instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const jr = gn(a.element, Br);
jr.isRequired = gn(a.element.isRequired, Br);
const An = jr;
function pi(e) {
  const {
    prototype: n = {}
  } = e;
  return !!n.isReactComponent;
}
function hi(e, n, t, r, o) {
  const i = e[n], s = o || n;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  return typeof i == "function" && !pi(i) && (c = "Did you accidentally provide a plain function component instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${t}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const mi = gn(a.elementType, hi), gi = "exact-prop: ​";
function Lr(e) {
  return process.env.NODE_ENV === "production" ? e : k({}, e, {
    [gi]: (n) => {
      const t = Object.keys(n).filter((r) => !e.hasOwnProperty(r));
      return t.length > 0 ? new Error(`The following props are not supported: ${t.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function tn(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let t = 1; t < arguments.length; t += 1)
    n += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
const bi = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function yi(e) {
  const n = `${e}`.match(bi);
  return n && n[1] || "";
}
function Fr(e, n = "") {
  return e.displayName || e.name || yi(e) || n;
}
function Jt(e, n, t) {
  const r = Fr(n);
  return e.displayName || (r !== "" ? `${t}(${r})` : t);
}
function vi(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Fr(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case wn.ForwardRef:
          return Jt(e, e.render, "ForwardRef");
        case wn.Memo:
          return Jt(e, e.type, "memo");
        default:
          return;
      }
  }
}
function pn(e, n, t, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[n], s = o || n;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${t}\`. Expected an HTMLElement.`) : null;
}
const Ei = a.oneOfType([a.func, a.object]), xi = Ei;
function ke(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : tn(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Zt(...e) {
  return e.reduce((n, t) => t == null ? n : function(...o) {
    n.apply(this, o), t.apply(this, o);
  }, () => {
  });
}
function Ti(e, n = 166) {
  let t;
  function r(...o) {
    const i = () => {
      e.apply(this, o);
    };
    clearTimeout(t), t = setTimeout(i, n);
  }
  return r.clear = () => {
    clearTimeout(t);
  }, r;
}
function be(e) {
  return e && e.ownerDocument || document;
}
function hn(e) {
  return be(e).defaultView || window;
}
function lt(e, n) {
  typeof e == "function" ? e(n) : e && (e.current = n);
}
const ki = typeof window < "u" ? w.useLayoutEffect : w.useEffect, On = ki;
function Qt(e) {
  const n = w.useRef(e);
  return On(() => {
    n.current = e;
  }), w.useRef((...t) => (
    // @ts-expect-error hide `this`
    (0, n.current)(...t)
  )).current;
}
function Ie(...e) {
  return w.useMemo(() => e.every((n) => n == null) ? null : (n) => {
    e.forEach((t) => {
      lt(t, n);
    });
  }, e);
}
function Vr(e) {
  const n = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - n);
}
function Si(e) {
  const n = typeof e;
  switch (n) {
    case "number":
      return Number.isNaN(e) ? "NaN" : Number.isFinite(e) ? e !== Math.floor(e) ? "float" : "number" : "Infinity";
    case "object":
      return e === null ? "null" : e.constructor.name;
    default:
      return n;
  }
}
function wi(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Oi = Number.isInteger || wi;
function zr(e, n, t, r) {
  const o = e[n];
  if (o == null || !Oi(o)) {
    const i = Si(o);
    return new RangeError(`Invalid ${r} \`${n}\` of type \`${i}\` supplied to \`${t}\`, expected \`integer\`.`);
  }
  return null;
}
function Ur(e, n, ...t) {
  return e[n] === void 0 ? null : zr(e, n, ...t);
}
function ut() {
  return null;
}
Ur.isRequired = zr;
ut.isRequired = ut;
const Hr = process.env.NODE_ENV === "production" ? ut : Ur;
function qr(e, n) {
  const t = k({}, n);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      t[r] = k({}, e[r], t[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = n[r];
      t[r] = {}, !i || !Object.keys(i) ? t[r] = o : !o || !Object.keys(o) ? t[r] = i : (t[r] = k({}, i), Object.keys(o).forEach((s) => {
        t[r][s] = qr(o[s], i[s]);
      }));
    } else
      t[r] === void 0 && (t[r] = e[r]);
  }), t;
}
function Ve(e, n, t = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((i, s) => {
        if (s) {
          const c = n(s);
          c !== "" && i.push(c), t && t[s] && i.push(t[s]);
        }
        return i;
      }, []).join(" ");
    }
  ), r;
}
const er = (e) => e, Ci = () => {
  let e = er;
  return {
    configure(n) {
      e = n;
    },
    generate(n) {
      return e(n);
    },
    reset() {
      e = er;
    }
  };
}, Pi = Ci(), Ri = Pi, Ni = {
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
function Re(e, n, t = "Mui") {
  const r = Ni[n];
  return r ? `${t}-${r}` : `${Ri.generate(e)}-${n}`;
}
function ze(e, n, t = "Mui") {
  const r = {};
  return n.forEach((o) => {
    r[o] = Re(e, o, t);
  }), r;
}
function _i(e, n = Number.MIN_SAFE_INTEGER, t = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, t));
}
function Wr(e) {
  return typeof e == "string";
}
function $i(e, n, t) {
  return e === void 0 || Wr(e) ? n : k({}, n, {
    ownerState: k({}, n.ownerState, t)
  });
}
function Gr(e, n = []) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !n.includes(r)).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function Ii(e, n, t) {
  return typeof e == "function" ? e(n, t) : e;
}
function Kr(e) {
  var n, t, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (n = 0; n < o; n++)
        e[n] && (t = Kr(e[n])) && (r && (r += " "), r += t);
    } else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function nr() {
  for (var e, n, t = 0, r = "", o = arguments.length; t < o; t++)
    (e = arguments[t]) && (n = Kr(e)) && (r && (r += " "), r += n);
  return r;
}
function tr(e) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((t) => !(t.match(/^on[A-Z]/) && typeof e[t] == "function")).forEach((t) => {
    n[t] = e[t];
  }), n;
}
function Mi(e) {
  const {
    getSlotProps: n,
    additionalProps: t,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!n) {
    const b = nr(t == null ? void 0 : t.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), y = k({}, t == null ? void 0 : t.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = k({}, t, o, r);
    return b.length > 0 && (m.className = b), Object.keys(y).length > 0 && (m.style = y), {
      props: m,
      internalRef: void 0
    };
  }
  const s = Gr(k({}, o, r)), c = tr(r), l = tr(o), u = n(s), d = nr(u == null ? void 0 : u.className, t == null ? void 0 : t.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), p = k({}, u == null ? void 0 : u.style, t == null ? void 0 : t.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = k({}, u, t, l, c);
  return d.length > 0 && (f.className = d), Object.keys(p).length > 0 && (f.style = p), {
    props: f,
    internalRef: u.ref
  };
}
const Ai = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function rn(e) {
  var n;
  const {
    elementType: t,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = ae(e, Ai), c = i ? {} : Ii(r, o), {
    props: l,
    internalRef: u
  } = Mi(k({}, s, {
    externalSlotProps: c
  })), d = Ie(u, c == null ? void 0 : c.ref, (n = e.additionalProps) == null ? void 0 : n.ref);
  return $i(t, k({}, l, {
    ref: d
  }), o);
}
const Di = ["values", "unit", "step"], Bi = (e) => {
  const n = Object.keys(e).map((t) => ({
    key: t,
    val: e[t]
  })) || [];
  return n.sort((t, r) => t.val - r.val), n.reduce((t, r) => k({}, t, {
    [r.key]: r.val
  }), {});
};
function ji(e) {
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
    unit: t = "px",
    step: r = 5
  } = e, o = ae(e, Di), i = Bi(n), s = Object.keys(i);
  function c(f) {
    return `@media (min-width:${typeof n[f] == "number" ? n[f] : f}${t})`;
  }
  function l(f) {
    return `@media (max-width:${(typeof n[f] == "number" ? n[f] : f) - r / 100}${t})`;
  }
  function u(f, b) {
    const y = s.indexOf(b);
    return `@media (min-width:${typeof n[f] == "number" ? n[f] : f}${t}) and (max-width:${(y !== -1 && typeof n[s[y]] == "number" ? n[s[y]] : b) - r / 100}${t})`;
  }
  function d(f) {
    return s.indexOf(f) + 1 < s.length ? u(f, s[s.indexOf(f) + 1]) : c(f);
  }
  function p(f) {
    const b = s.indexOf(f);
    return b === 0 ? c(s[1]) : b === s.length - 1 ? l(s[b]) : u(f, s[s.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return k({
    keys: s,
    values: i,
    up: c,
    down: l,
    between: u,
    only: d,
    not: p,
    unit: t
  }, o);
}
const Li = {
  borderRadius: 4
}, Fi = Li, Vi = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, Me = Vi;
function dn(e, n) {
  return n ? xe(e, n, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const yt = {
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
}, rr = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${yt[e]}px)`
};
function Pe(e, n, t) {
  const r = e.theme || {};
  if (Array.isArray(n)) {
    const i = r.breakpoints || rr;
    return n.reduce((s, c, l) => (s[i.up(i.keys[l])] = t(n[l]), s), {});
  }
  if (typeof n == "object") {
    const i = r.breakpoints || rr;
    return Object.keys(n).reduce((s, c) => {
      if (Object.keys(i.values || yt).indexOf(c) !== -1) {
        const l = i.up(c);
        s[l] = t(n[c], c);
      } else {
        const l = c;
        s[l] = n[l];
      }
      return s;
    }, {});
  }
  return t(n);
}
function zi(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Ui(e, n) {
  return e.reduce((t, r) => {
    const o = t[r];
    return (!o || Object.keys(o).length === 0) && delete t[r], t;
  }, n);
}
function Dn(e, n, t = !0) {
  if (!n || typeof n != "string")
    return null;
  if (e && e.vars && t) {
    const r = `vars.${n}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return n.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Cn(e, n, t, r = t) {
  let o;
  return typeof e == "function" ? o = e(t) : Array.isArray(e) ? o = e[t] || r : o = Dn(e, t) || r, n && (o = n(o, r, e)), o;
}
function ue(e) {
  const {
    prop: n,
    cssProperty: t = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[n] == null)
      return null;
    const c = s[n], l = s.theme, u = Dn(l, r) || {};
    return Pe(s, c, (p) => {
      let f = Cn(u, o, p);
      return p === f && typeof p == "string" && (f = Cn(u, o, `${n}${p === "default" ? "" : ke(p)}`, p)), t === !1 ? f : {
        [t]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: Me
  } : {}, i.filterProps = [n], i;
}
function Hi(e) {
  const n = {};
  return (t) => (n[t] === void 0 && (n[t] = e(t)), n[t]);
}
const qi = {
  m: "margin",
  p: "padding"
}, Wi = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, or = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Gi = Hi((e) => {
  if (e.length > 2)
    if (or[e])
      e = or[e];
    else
      return [e];
  const [n, t] = e.split(""), r = qi[n], o = Wi[t] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Bn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], jn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Ki = [...Bn, ...jn];
function bn(e, n, t, r) {
  var o;
  const i = (o = Dn(e, n, !1)) != null ? o : t;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Xr(e) {
  return bn(e, "spacing", 8, "spacing");
}
function yn(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const t = Math.abs(n), r = e(t);
  return n >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Xi(e, n) {
  return (t) => e.reduce((r, o) => (r[o] = yn(n, t), r), {});
}
function Yi(e, n, t, r) {
  if (n.indexOf(t) === -1)
    return null;
  const o = Gi(t), i = Xi(o, r), s = e[t];
  return Pe(e, s, i);
}
function Yr(e, n) {
  const t = Xr(e.theme);
  return Object.keys(e).map((r) => Yi(e, n, r, t)).reduce(dn, {});
}
function ce(e) {
  return Yr(e, Bn);
}
ce.propTypes = process.env.NODE_ENV !== "production" ? Bn.reduce((e, n) => (e[n] = Me, e), {}) : {};
ce.filterProps = Bn;
function le(e) {
  return Yr(e, jn);
}
le.propTypes = process.env.NODE_ENV !== "production" ? jn.reduce((e, n) => (e[n] = Me, e), {}) : {};
le.filterProps = jn;
process.env.NODE_ENV !== "production" && Ki.reduce((e, n) => (e[n] = Me, e), {});
function Ji(e = 8) {
  if (e.mui)
    return e;
  const n = Xr({
    spacing: e
  }), t = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = n(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return t.mui = !0, t;
}
function Ln(...e) {
  const n = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), t = (r) => Object.keys(r).reduce((o, i) => n[i] ? dn(o, n[i](r)) : o, {});
  return t.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, t.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), t;
}
function me(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function ve(e, n) {
  return ue({
    prop: e,
    themeKey: "borders",
    transform: n
  });
}
const Zi = ve("border", me), Qi = ve("borderTop", me), es = ve("borderRight", me), ns = ve("borderBottom", me), ts = ve("borderLeft", me), rs = ve("borderColor"), os = ve("borderTopColor"), is = ve("borderRightColor"), ss = ve("borderBottomColor"), as = ve("borderLeftColor"), cs = ve("outline", me), ls = ve("outlineColor"), Fn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = bn(e.theme, "shape.borderRadius", 4, "borderRadius"), t = (r) => ({
      borderRadius: yn(n, r)
    });
    return Pe(e, e.borderRadius, t);
  }
  return null;
};
Fn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Me
} : {};
Fn.filterProps = ["borderRadius"];
Ln(Zi, Qi, es, ns, ts, rs, os, is, ss, as, Fn, cs, ls);
const Vn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = bn(e.theme, "spacing", 8, "gap"), t = (r) => ({
      gap: yn(n, r)
    });
    return Pe(e, e.gap, t);
  }
  return null;
};
Vn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Me
} : {};
Vn.filterProps = ["gap"];
const zn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = bn(e.theme, "spacing", 8, "columnGap"), t = (r) => ({
      columnGap: yn(n, r)
    });
    return Pe(e, e.columnGap, t);
  }
  return null;
};
zn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Me
} : {};
zn.filterProps = ["columnGap"];
const Un = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = bn(e.theme, "spacing", 8, "rowGap"), t = (r) => ({
      rowGap: yn(n, r)
    });
    return Pe(e, e.rowGap, t);
  }
  return null;
};
Un.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Me
} : {};
Un.filterProps = ["rowGap"];
const us = ue({
  prop: "gridColumn"
}), ds = ue({
  prop: "gridRow"
}), fs = ue({
  prop: "gridAutoFlow"
}), ps = ue({
  prop: "gridAutoColumns"
}), hs = ue({
  prop: "gridAutoRows"
}), ms = ue({
  prop: "gridTemplateColumns"
}), gs = ue({
  prop: "gridTemplateRows"
}), bs = ue({
  prop: "gridTemplateAreas"
}), ys = ue({
  prop: "gridArea"
});
Ln(Vn, zn, Un, us, ds, fs, ps, hs, ms, gs, bs, ys);
function nn(e, n) {
  return n === "grey" ? n : e;
}
const vs = ue({
  prop: "color",
  themeKey: "palette",
  transform: nn
}), Es = ue({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: nn
}), xs = ue({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: nn
});
Ln(vs, Es, xs);
function pe(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Ts = ue({
  prop: "width",
  transform: pe
}), vt = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const n = (t) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[t]) || yt[t];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: pe(t)
      };
    };
    return Pe(e, e.maxWidth, n);
  }
  return null;
};
vt.filterProps = ["maxWidth"];
const ks = ue({
  prop: "minWidth",
  transform: pe
}), Ss = ue({
  prop: "height",
  transform: pe
}), ws = ue({
  prop: "maxHeight",
  transform: pe
}), Os = ue({
  prop: "minHeight",
  transform: pe
});
ue({
  prop: "size",
  cssProperty: "width",
  transform: pe
});
ue({
  prop: "size",
  cssProperty: "height",
  transform: pe
});
const Cs = ue({
  prop: "boxSizing"
});
Ln(Ts, vt, ks, Ss, ws, Os, Cs);
const Ps = {
  // borders
  border: {
    themeKey: "borders",
    transform: me
  },
  borderTop: {
    themeKey: "borders",
    transform: me
  },
  borderRight: {
    themeKey: "borders",
    transform: me
  },
  borderBottom: {
    themeKey: "borders",
    transform: me
  },
  borderLeft: {
    themeKey: "borders",
    transform: me
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
    transform: me
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Fn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: nn
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: nn
  },
  backgroundColor: {
    themeKey: "palette",
    transform: nn
  },
  // spacing
  p: {
    style: le
  },
  pt: {
    style: le
  },
  pr: {
    style: le
  },
  pb: {
    style: le
  },
  pl: {
    style: le
  },
  px: {
    style: le
  },
  py: {
    style: le
  },
  padding: {
    style: le
  },
  paddingTop: {
    style: le
  },
  paddingRight: {
    style: le
  },
  paddingBottom: {
    style: le
  },
  paddingLeft: {
    style: le
  },
  paddingX: {
    style: le
  },
  paddingY: {
    style: le
  },
  paddingInline: {
    style: le
  },
  paddingInlineStart: {
    style: le
  },
  paddingInlineEnd: {
    style: le
  },
  paddingBlock: {
    style: le
  },
  paddingBlockStart: {
    style: le
  },
  paddingBlockEnd: {
    style: le
  },
  m: {
    style: ce
  },
  mt: {
    style: ce
  },
  mr: {
    style: ce
  },
  mb: {
    style: ce
  },
  ml: {
    style: ce
  },
  mx: {
    style: ce
  },
  my: {
    style: ce
  },
  margin: {
    style: ce
  },
  marginTop: {
    style: ce
  },
  marginRight: {
    style: ce
  },
  marginBottom: {
    style: ce
  },
  marginLeft: {
    style: ce
  },
  marginX: {
    style: ce
  },
  marginY: {
    style: ce
  },
  marginInline: {
    style: ce
  },
  marginInlineStart: {
    style: ce
  },
  marginInlineEnd: {
    style: ce
  },
  marginBlock: {
    style: ce
  },
  marginBlockStart: {
    style: ce
  },
  marginBlockEnd: {
    style: ce
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
    style: Vn
  },
  rowGap: {
    style: Un
  },
  columnGap: {
    style: zn
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
    transform: pe
  },
  maxWidth: {
    style: vt
  },
  minWidth: {
    transform: pe
  },
  height: {
    transform: pe
  },
  maxHeight: {
    transform: pe
  },
  minHeight: {
    transform: pe
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
}, Et = Ps;
function Rs(...e) {
  const n = e.reduce((r, o) => r.concat(Object.keys(o)), []), t = new Set(n);
  return e.every((r) => t.size === Object.keys(r).length);
}
function Ns(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function _s() {
  function e(t, r, o, i) {
    const s = {
      [t]: r,
      theme: o
    }, c = i[t];
    if (!c)
      return {
        [t]: r
      };
    const {
      cssProperty: l = t,
      themeKey: u,
      transform: d,
      style: p
    } = c;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [t]: r
      };
    const f = Dn(o, u) || {};
    return p ? p(s) : Pe(s, r, (y) => {
      let m = Cn(f, d, y);
      return y === m && typeof y == "string" && (m = Cn(f, d, `${t}${y === "default" ? "" : ke(y)}`, y)), l === !1 ? m : {
        [l]: m
      };
    });
  }
  function n(t) {
    var r;
    const {
      sx: o,
      theme: i = {}
    } = t || {};
    if (!o)
      return null;
    const s = (r = i.unstable_sxConfig) != null ? r : Et;
    function c(l) {
      let u = l;
      if (typeof l == "function")
        u = l(i);
      else if (typeof l != "object")
        return l;
      if (!u)
        return null;
      const d = zi(i.breakpoints), p = Object.keys(d);
      let f = d;
      return Object.keys(u).forEach((b) => {
        const y = Ns(u[b], i);
        if (y != null)
          if (typeof y == "object")
            if (s[b])
              f = dn(f, e(b, y, i, s));
            else {
              const m = Pe({
                theme: i
              }, y, (h) => ({
                [b]: h
              }));
              Rs(m, y) ? f[b] = n({
                sx: y,
                theme: i
              }) : f = dn(f, m);
            }
          else
            f = dn(f, e(b, y, i, s));
      }), Ui(p, f);
    }
    return Array.isArray(o) ? o.map(c) : c(o);
  }
  return n;
}
const Jr = _s();
Jr.filterProps = ["sx"];
const xt = Jr, $s = ["breakpoints", "palette", "spacing", "shape"];
function Tt(e = {}, ...n) {
  const {
    breakpoints: t = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = ae(e, $s), c = ji(t), l = Ji(o);
  let u = xe({
    breakpoints: c,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: k({
      mode: "light"
    }, r),
    spacing: l,
    shape: k({}, Fi, i)
  }, s);
  return u = n.reduce((d, p) => xe(d, p), u), u.unstable_sxConfig = k({}, Et, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(p) {
    return xt({
      sx: p,
      theme: this
    });
  }, u;
}
function Is(e) {
  return Object.keys(e).length === 0;
}
function Ms(e = null) {
  const n = w.useContext(jo);
  return !n || Is(n) ? e : n;
}
const As = Tt();
function Zr(e = As) {
  return Ms(e);
}
const Ds = ["variant"];
function ir(e) {
  return e.length === 0;
}
function Qr(e) {
  const {
    variant: n
  } = e, t = ae(e, Ds);
  let r = n || "";
  return Object.keys(t).sort().forEach((o) => {
    o === "color" ? r += ir(r) ? e[o] : ke(e[o]) : r += `${ir(r) ? o : ke(o)}${ke(e[o].toString())}`;
  }), r;
}
const Bs = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function js(e) {
  return Object.keys(e).length === 0;
}
function Ls(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const Fs = (e, n) => n.components && n.components[e] && n.components[e].styleOverrides ? n.components[e].styleOverrides : null, Pn = (e) => {
  let n = 0;
  const t = {};
  return e && e.forEach((r) => {
    let o = "";
    typeof r.props == "function" ? (o = `callback${n}`, n += 1) : o = Qr(r.props), t[o] = r.style;
  }), t;
}, Vs = (e, n) => {
  let t = [];
  return n && n.components && n.components[e] && n.components[e].variants && (t = n.components[e].variants), Pn(t);
}, Rn = (e, n, t) => {
  const {
    ownerState: r = {}
  } = e, o = [];
  let i = 0;
  return t && t.forEach((s) => {
    let c = !0;
    if (typeof s.props == "function") {
      const l = k({}, e, r);
      c = s.props(l);
    } else
      Object.keys(s.props).forEach((l) => {
        r[l] !== s.props[l] && e[l] !== s.props[l] && (c = !1);
      });
    c && (typeof s.props == "function" ? o.push(n[`callback${i}`]) : o.push(n[Qr(s.props)])), typeof s.props == "function" && (i += 1);
  }), o;
}, zs = (e, n, t, r) => {
  var o;
  const i = t == null || (o = t.components) == null || (o = o[r]) == null ? void 0 : o.variants;
  return Rn(e, n, i);
};
function Tn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Us = Tt(), sr = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function kn({
  defaultTheme: e,
  theme: n,
  themeId: t
}) {
  return js(n) ? e : n[t] || n;
}
function Hs(e) {
  return e ? (n, t) => t[e] : null;
}
const ar = ({
  styledArg: e,
  props: n,
  defaultTheme: t,
  themeId: r
}) => {
  const o = e(k({}, n, {
    theme: kn(k({}, n, {
      defaultTheme: t,
      themeId: r
    }))
  }));
  let i;
  if (o && o.variants && (i = o.variants, delete o.variants), i) {
    const s = Rn(n, Pn(i), i);
    return [o, ...s];
  }
  return o;
};
function qs(e = {}) {
  const {
    themeId: n,
    defaultTheme: t = Us,
    rootShouldForwardProp: r = Tn,
    slotShouldForwardProp: o = Tn
  } = e, i = (s) => xt(k({}, s, {
    theme: kn(k({}, s, {
      defaultTheme: t,
      themeId: n
    }))
  }));
  return i.__mui_systemSx = !0, (s, c = {}) => {
    Lo(s, (x) => x.filter((g) => !(g != null && g.__mui_systemSx)));
    const {
      name: l,
      slot: u,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = Hs(sr(u))
    } = c, b = ae(c, Bs), y = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), m = p || !1;
    let h;
    process.env.NODE_ENV !== "production" && l && (h = `${l}-${sr(u || "Root")}`);
    let T = Tn;
    u === "Root" || u === "root" ? T = r : u ? T = o : Ls(s) && (T = void 0);
    const B = Bo(s, k({
      shouldForwardProp: T,
      label: h
    }, b)), E = (x, ...g) => {
      const M = g ? g.map((R) => {
        if (typeof R == "function" && R.__emotion_real !== R)
          return (G) => ar({
            styledArg: R,
            props: G,
            defaultTheme: t,
            themeId: n
          });
        if ($e(R)) {
          let G = R, q;
          return R && R.variants && (q = R.variants, delete G.variants, G = (ee) => {
            let I = R;
            return Rn(ee, Pn(q), q).forEach(($) => {
              I = xe(I, $);
            }), I;
          }), G;
        }
        return R;
      }) : [];
      let _ = x;
      if ($e(x)) {
        let R;
        x && x.variants && (R = x.variants, delete _.variants, _ = (G) => {
          let q = x;
          return Rn(G, Pn(R), R).forEach((I) => {
            q = xe(q, I);
          }), q;
        });
      } else
        typeof x == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        x.__emotion_real !== x && (_ = (R) => ar({
          styledArg: x,
          props: R,
          defaultTheme: t,
          themeId: n
        }));
      l && f && M.push((R) => {
        const G = kn(k({}, R, {
          defaultTheme: t,
          themeId: n
        })), q = Fs(l, G);
        if (q) {
          const ee = {};
          return Object.entries(q).forEach(([I, N]) => {
            ee[I] = typeof N == "function" ? N(k({}, R, {
              theme: G
            })) : N;
          }), f(R, ee);
        }
        return null;
      }), l && !y && M.push((R) => {
        const G = kn(k({}, R, {
          defaultTheme: t,
          themeId: n
        }));
        return zs(R, Vs(l, G), G, l);
      }), m || M.push(i);
      const K = M.length - g.length;
      if (Array.isArray(x) && K > 0) {
        const R = new Array(K).fill("");
        _ = [...x, ...R], _.raw = [...x.raw, ...R];
      }
      const Z = B(_, ...M);
      if (process.env.NODE_ENV !== "production") {
        let R;
        l && (R = `${l}${ke(u || "")}`), R === void 0 && (R = `Styled(${vi(s)})`), Z.displayName = R;
      }
      return s.muiName && (Z.muiName = s.muiName), Z;
    };
    return B.withConfig && (E.withConfig = B.withConfig), E;
  };
}
function Ws(e) {
  const {
    theme: n,
    name: t,
    props: r
  } = e;
  return !n || !n.components || !n.components[t] || !n.components[t].defaultProps ? r : qr(n.components[t].defaultProps, r);
}
function Gs({
  props: e,
  name: n,
  defaultTheme: t,
  themeId: r
}) {
  let o = Zr(t);
  return r && (o = o[r] || o), Ws({
    theme: o,
    name: n,
    props: e
  });
}
function kt(e, n = 0, t = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > t) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${t}].`), _i(e, n, t);
}
function Ks(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let t = e.match(n);
  return t && t[0].length === 1 && (t = t.map((r) => r + r)), t ? `rgb${t.length === 4 ? "a" : ""}(${t.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Le(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Le(Ks(e));
  const n = e.indexOf("("), t = e.substring(0, n);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(t) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : tn(9, e));
  let r = e.substring(n + 1, e.length - 1), o;
  if (t === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : tn(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: t,
    values: r,
    colorSpace: o
  };
}
function Hn(e) {
  const {
    type: n,
    colorSpace: t
  } = e;
  let {
    values: r
  } = e;
  return n.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : n.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), n.indexOf("color") !== -1 ? r = `${t} ${r.join(" ")}` : r = `${r.join(", ")}`, `${n}(${r})`;
}
function Xs(e) {
  e = Le(e);
  const {
    values: n
  } = e, t = n[0], r = n[1] / 100, o = n[2] / 100, i = r * Math.min(o, 1 - o), s = (u, d = (u + t / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let c = "rgb";
  const l = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (c += "a", l.push(n[3])), Hn({
    type: c,
    values: l
  });
}
function cr(e) {
  e = Le(e);
  let n = e.type === "hsl" || e.type === "hsla" ? Le(Xs(e)).values : e.values;
  return n = n.map((t) => (e.type !== "color" && (t /= 255), t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function lr(e, n) {
  const t = cr(e), r = cr(n);
  return (Math.max(t, r) + 0.05) / (Math.min(t, r) + 0.05);
}
function ur(e, n) {
  return e = Le(e), n = kt(n), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${n}` : e.values[3] = n, Hn(e);
}
function Ys(e, n) {
  if (e = Le(e), n = kt(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] *= 1 - n;
  return Hn(e);
}
function Js(e, n) {
  if (e = Le(e), n = kt(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (255 - e.values[t]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (1 - e.values[t]) * n;
  return Hn(e);
}
function Zs(e, n) {
  return k({
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
const Qs = {
  black: "#000",
  white: "#fff"
}, mn = Qs, ea = {
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
}, na = ea, ta = {
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
}, We = ta, ra = {
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
}, Ge = ra, oa = {
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
}, an = oa, ia = {
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
}, Ke = ia, sa = {
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
}, Xe = sa, aa = {
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
}, Ye = aa, ca = ["mode", "contrastThreshold", "tonalOffset"], dr = {
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
    paper: mn.white,
    default: mn.white
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
}, Zn = {
  text: {
    primary: mn.white,
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
    active: mn.white,
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
function fr(e, n, t, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[n] || (e.hasOwnProperty(t) ? e[n] = e[t] : n === "light" ? e.light = Js(e.main, o) : n === "dark" && (e.dark = Ys(e.main, i)));
}
function la(e = "light") {
  return e === "dark" ? {
    main: Ke[200],
    light: Ke[50],
    dark: Ke[400]
  } : {
    main: Ke[700],
    light: Ke[400],
    dark: Ke[800]
  };
}
function ua(e = "light") {
  return e === "dark" ? {
    main: We[200],
    light: We[50],
    dark: We[400]
  } : {
    main: We[500],
    light: We[300],
    dark: We[700]
  };
}
function da(e = "light") {
  return e === "dark" ? {
    main: Ge[500],
    light: Ge[300],
    dark: Ge[700]
  } : {
    main: Ge[700],
    light: Ge[400],
    dark: Ge[800]
  };
}
function fa(e = "light") {
  return e === "dark" ? {
    main: Xe[400],
    light: Xe[300],
    dark: Xe[700]
  } : {
    main: Xe[700],
    light: Xe[500],
    dark: Xe[900]
  };
}
function pa(e = "light") {
  return e === "dark" ? {
    main: Ye[400],
    light: Ye[300],
    dark: Ye[700]
  } : {
    main: Ye[800],
    light: Ye[500],
    dark: Ye[900]
  };
}
function ha(e = "light") {
  return e === "dark" ? {
    main: an[400],
    light: an[300],
    dark: an[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: an[500],
    dark: an[900]
  };
}
function ma(e) {
  const {
    mode: n = "light",
    contrastThreshold: t = 3,
    tonalOffset: r = 0.2
  } = e, o = ae(e, ca), i = e.primary || la(n), s = e.secondary || ua(n), c = e.error || da(n), l = e.info || fa(n), u = e.success || pa(n), d = e.warning || ha(n);
  function p(m) {
    const h = lr(m, Zn.text.primary) >= t ? Zn.text.primary : dr.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const T = lr(m, h);
      T < 3 && console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const f = ({
    color: m,
    name: h,
    mainShade: T = 500,
    lightShade: B = 300,
    darkShade: E = 700
  }) => {
    if (m = k({}, m), !m.main && m[T] && (m.main = m[T]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.` : tn(11, h ? ` (${h})` : "", T));
    if (typeof m.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : tn(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return fr(m, "light", B, r), fr(m, "dark", E, r), m.contrastText || (m.contrastText = p(m.main)), m;
  }, b = {
    dark: Zn,
    light: dr
  };
  return process.env.NODE_ENV !== "production" && (b[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), xe(k({
    // A collection of common colors.
    common: k({}, mn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: n,
    // The colors used to represent primary interface elements for a user.
    primary: f({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: f({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: f({
      color: c,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: f({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: l,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: na,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: t,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, b[n]), o);
}
const ga = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function ba(e) {
  return Math.round(e * 1e5) / 1e5;
}
const pr = {
  textTransform: "uppercase"
}, hr = '"Roboto", "Helvetica", "Arial", sans-serif';
function ya(e, n) {
  const t = typeof n == "function" ? n(e) : n, {
    fontFamily: r = hr,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: c = 500,
    fontWeightBold: l = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: p
  } = t, f = ae(t, ga);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, y = p || ((T) => `${T / u * b}rem`), m = (T, B, E, x, g) => k({
    fontFamily: r,
    fontWeight: T,
    fontSize: y(B),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: E
  }, r === hr ? {
    letterSpacing: `${ba(x / B)}em`
  } : {}, g, d), h = {
    h1: m(i, 96, 1.167, -1.5),
    h2: m(i, 60, 1.2, -0.5),
    h3: m(s, 48, 1.167, 0),
    h4: m(s, 34, 1.235, 0.25),
    h5: m(s, 24, 1.334, 0),
    h6: m(c, 20, 1.6, 0.15),
    subtitle1: m(s, 16, 1.75, 0.15),
    subtitle2: m(c, 14, 1.57, 0.1),
    body1: m(s, 16, 1.5, 0.15),
    body2: m(s, 14, 1.43, 0.15),
    button: m(c, 14, 1.75, 0.4, pr),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, pr),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return xe(k({
    htmlFontSize: u,
    pxToRem: y,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: c,
    fontWeightBold: l
  }, h), f, {
    clone: !1
    // No need to clone deep
  });
}
const va = 0.2, Ea = 0.14, xa = 0.12;
function se(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${va})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ea})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${xa})`].join(",");
}
const Ta = ["none", se(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), se(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), se(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), se(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), se(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), se(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), se(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), se(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), se(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), se(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), se(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), se(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), se(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), se(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), se(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), se(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), se(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), se(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), se(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), se(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), se(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), se(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), se(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), se(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], ka = Ta, Sa = ["duration", "easing", "delay"], wa = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Oa = {
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
function mr(e) {
  return `${Math.round(e)}ms`;
}
function Ca(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function Pa(e) {
  const n = k({}, wa, e.easing), t = k({}, Oa, e.duration);
  return k({
    getAutoHeightDuration: Ca,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = t.standard,
        easing: c = n.easeInOut,
        delay: l = 0
      } = i, u = ae(i, Sa);
      if (process.env.NODE_ENV !== "production") {
        const d = (f) => typeof f == "string", p = (f) => !isNaN(parseFloat(f));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(c) || console.error('MUI: Argument "easing" must be a string.'), !p(l) && !d(l) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : mr(s)} ${c} ${typeof l == "string" ? l : mr(l)}`).join(",");
    }
  }, e, {
    easing: n,
    duration: t
  });
}
const Ra = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Na = Ra, _a = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function $a(e = {}, ...n) {
  const {
    mixins: t = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = ae(e, _a);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : tn(18));
  const c = ma(r), l = Tt(e);
  let u = xe(l, {
    mixins: Zs(l.breakpoints, t),
    palette: c,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ka.slice(),
    typography: ya(c, i),
    transitions: Pa(o),
    zIndex: k({}, Na),
    applyDarkStyles(d) {
      return this.vars ? {
        [this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/, ":where($1)")]: d
      } : this.palette.mode === "dark" ? d : {};
    }
  });
  if (u = xe(u, s), u = n.reduce((d, p) => xe(d, p), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (f, b) => {
      let y;
      for (y in f) {
        const m = f[y];
        if (d.indexOf(y) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = Re("", y);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[y] = {};
        }
      }
    };
    Object.keys(u.components).forEach((f) => {
      const b = u.components[f].styleOverrides;
      b && f.indexOf("Mui") === 0 && p(b, f);
    });
  }
  return u.unstable_sxConfig = k({}, Et, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(p) {
    return xt({
      sx: p,
      theme: this
    });
  }, u;
}
const Ia = $a(), St = Ia, wt = "$$material", eo = (e) => Tn(e) && e !== "classes", Ma = qs({
  themeId: wt,
  defaultTheme: St,
  rootShouldForwardProp: eo
}), Te = Ma;
function Ue({
  props: e,
  name: n
}) {
  return Gs({
    props: e,
    name: n,
    defaultTheme: St,
    themeId: wt
  });
}
const no = /* @__PURE__ */ w.createContext({});
process.env.NODE_ENV !== "production" && (no.displayName = "ListContext");
const Aa = no;
function Da(e) {
  return Re("MuiList", e);
}
ze("MuiList", ["root", "padding", "dense", "subheader"]);
const Ba = ["children", "className", "component", "dense", "disablePadding", "subheader"], ja = (e) => {
  const {
    classes: n,
    disablePadding: t,
    dense: r,
    subheader: o
  } = e;
  return Ve({
    root: ["root", !t && "padding", r && "dense", o && "subheader"]
  }, Da, n);
}, La = Te("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: t
    } = e;
    return [n.root, !t.disablePadding && n.padding, t.dense && n.dense, t.subheader && n.subheader];
  }
})(({
  ownerState: e
}) => k({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), to = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const r = Ue({
    props: n,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: c = !1,
    disablePadding: l = !1,
    subheader: u
  } = r, d = ae(r, Ba), p = w.useMemo(() => ({
    dense: c
  }), [c]), f = k({}, r, {
    component: s,
    dense: c,
    disablePadding: l
  }), b = ja(f);
  return /* @__PURE__ */ O(Aa.Provider, {
    value: p,
    children: /* @__PURE__ */ ye(La, k({
      as: s,
      className: Ce(b.root, i),
      ref: t,
      ownerState: f
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (to.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: a.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: a.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: a.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object])
});
const Fa = to, Va = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Qn(e, n, t) {
  return e === n ? e.firstChild : n && n.nextElementSibling ? n.nextElementSibling : t ? null : e.firstChild;
}
function gr(e, n, t) {
  return e === n ? t ? e.firstChild : e.lastChild : n && n.previousElementSibling ? n.previousElementSibling : t ? null : e.lastChild;
}
function ro(e, n) {
  if (n === void 0)
    return !0;
  let t = e.innerText;
  return t === void 0 && (t = e.textContent), t = t.trim().toLowerCase(), t.length === 0 ? !1 : n.repeating ? t[0] === n.keys[0] : t.indexOf(n.keys.join("")) === 0;
}
function cn(e, n, t, r, o, i) {
  let s = !1, c = o(e, n, n ? t : !1);
  for (; c; ) {
    if (c === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const l = r ? !1 : c.disabled || c.getAttribute("aria-disabled") === "true";
    if (!c.hasAttribute("tabindex") || !ro(c, i) || l)
      c = o(e, c, t);
    else
      return c.focus(), !0;
  }
  return !1;
}
const oo = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: s,
    className: c,
    disabledItemsFocusable: l = !1,
    disableListWrap: u = !1,
    onKeyDown: d,
    variant: p = "selectedMenu"
  } = n, f = ae(n, Va), b = w.useRef(null), y = w.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  On(() => {
    o && b.current.focus();
  }, [o]), w.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (E, x) => {
      const g = !b.current.style.width;
      if (E.clientHeight < b.current.clientHeight && g) {
        const M = `${Vr(be(E))}px`;
        b.current.style[x.direction === "rtl" ? "paddingLeft" : "paddingRight"] = M, b.current.style.width = `calc(100% + ${M})`;
      }
      return b.current;
    }
  }), []);
  const m = (E) => {
    const x = b.current, g = E.key, M = be(x).activeElement;
    if (g === "ArrowDown")
      E.preventDefault(), cn(x, M, u, l, Qn);
    else if (g === "ArrowUp")
      E.preventDefault(), cn(x, M, u, l, gr);
    else if (g === "Home")
      E.preventDefault(), cn(x, null, u, l, Qn);
    else if (g === "End")
      E.preventDefault(), cn(x, null, u, l, gr);
    else if (g.length === 1) {
      const _ = y.current, K = g.toLowerCase(), Z = performance.now();
      _.keys.length > 0 && (Z - _.lastTime > 500 ? (_.keys = [], _.repeating = !0, _.previousKeyMatched = !0) : _.repeating && K !== _.keys[0] && (_.repeating = !1)), _.lastTime = Z, _.keys.push(K);
      const R = M && !_.repeating && ro(M, _);
      _.previousKeyMatched && (R || cn(x, M, !1, l, Qn, _)) ? E.preventDefault() : _.previousKeyMatched = !1;
    }
    d && d(E);
  }, h = Ie(b, t);
  let T = -1;
  w.Children.forEach(s, (E, x) => {
    if (!/* @__PURE__ */ w.isValidElement(E)) {
      T === x && (T += 1, T >= s.length && (T = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && wn.isFragment(E) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), E.props.disabled || (p === "selectedMenu" && E.props.selected || T === -1) && (T = x), T === x && (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) && (T += 1, T >= s.length && (T = -1));
  });
  const B = w.Children.map(s, (E, x) => {
    if (x === T) {
      const g = {};
      return i && (g.autoFocus = !0), E.props.tabIndex === void 0 && p === "selectedMenu" && (g.tabIndex = 0), /* @__PURE__ */ w.cloneElement(E, g);
    }
    return E;
  });
  return /* @__PURE__ */ O(Fa, k({
    role: "menu",
    ref: h,
    className: c,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, f, {
    children: B
  }));
});
process.env.NODE_ENV !== "production" && (oo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: a.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: a.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: a.node,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: a.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: a.bool,
  /**
   * @ignore
   */
  onKeyDown: a.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: a.oneOf(["menu", "selectedMenu"])
});
const za = oo, Ua = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Ha(e) {
  const n = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(n) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : n;
}
function qa(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const n = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let t = n(`[name="${e.name}"]:checked`);
  return t || (t = n(`[name="${e.name}"]`)), t !== e;
}
function Wa(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || qa(e));
}
function Ga(e) {
  const n = [], t = [];
  return Array.from(e.querySelectorAll(Ua)).forEach((r, o) => {
    const i = Ha(r);
    i === -1 || !Wa(r) || (i === 0 ? n.push(r) : t.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), t.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(n);
}
function Ka() {
  return !0;
}
function Nn(e) {
  const {
    children: n,
    disableAutoFocus: t = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Ga,
    isEnabled: s = Ka,
    open: c
  } = e, l = w.useRef(!1), u = w.useRef(null), d = w.useRef(null), p = w.useRef(null), f = w.useRef(null), b = w.useRef(!1), y = w.useRef(null), m = Ie(n.ref, y), h = w.useRef(null);
  w.useEffect(() => {
    !c || !y.current || (b.current = !t);
  }, [t, c]), w.useEffect(() => {
    if (!c || !y.current)
      return;
    const E = be(y.current);
    return y.current.contains(E.activeElement) || (y.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), y.current.setAttribute("tabIndex", "-1")), b.current && y.current.focus()), () => {
      o || (p.current && p.current.focus && (l.current = !0, p.current.focus()), p.current = null);
    };
  }, [c]), w.useEffect(() => {
    if (!c || !y.current)
      return;
    const E = be(y.current), x = (_) => {
      h.current = _, !(r || !s() || _.key !== "Tab") && E.activeElement === y.current && _.shiftKey && (l.current = !0, d.current && d.current.focus());
    }, g = () => {
      const _ = y.current;
      if (_ === null)
        return;
      if (!E.hasFocus() || !s() || l.current) {
        l.current = !1;
        return;
      }
      if (_.contains(E.activeElement) || r && E.activeElement !== u.current && E.activeElement !== d.current)
        return;
      if (E.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!b.current)
        return;
      let K = [];
      if ((E.activeElement === u.current || E.activeElement === d.current) && (K = i(y.current)), K.length > 0) {
        var Z, R;
        const G = !!((Z = h.current) != null && Z.shiftKey && ((R = h.current) == null ? void 0 : R.key) === "Tab"), q = K[0], ee = K[K.length - 1];
        typeof q != "string" && typeof ee != "string" && (G ? ee.focus() : q.focus());
      } else
        _.focus();
    };
    E.addEventListener("focusin", g), E.addEventListener("keydown", x, !0);
    const M = setInterval(() => {
      E.activeElement && E.activeElement.tagName === "BODY" && g();
    }, 50);
    return () => {
      clearInterval(M), E.removeEventListener("focusin", g), E.removeEventListener("keydown", x, !0);
    };
  }, [t, r, o, s, c, i]);
  const T = (E) => {
    p.current === null && (p.current = E.relatedTarget), b.current = !0, f.current = E.target;
    const x = n.props.onFocus;
    x && x(E);
  }, B = (E) => {
    p.current === null && (p.current = E.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ ye(w.Fragment, {
    children: [/* @__PURE__ */ O("div", {
      tabIndex: c ? 0 : -1,
      onFocus: B,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ w.cloneElement(n, {
      ref: m,
      onFocus: T
    }), /* @__PURE__ */ O("div", {
      tabIndex: c ? 0 : -1,
      onFocus: B,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Nn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: An,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: a.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: a.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: a.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: a.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: a.func,
  /**
   * If `true`, focus is locked.
   */
  open: a.bool.isRequired
});
process.env.NODE_ENV !== "production" && (Nn["propTypes"] = Lr(Nn.propTypes));
function Xa(e) {
  return typeof e == "function" ? e() : e;
}
const _n = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = n, [s, c] = w.useState(null), l = Ie(/* @__PURE__ */ w.isValidElement(r) ? r.ref : null, t);
  if (On(() => {
    i || c(Xa(o) || document.body);
  }, [o, i]), On(() => {
    if (s && !i)
      return lt(t, s), () => {
        lt(t, null);
      };
  }, [t, s, i]), i) {
    if (/* @__PURE__ */ w.isValidElement(r)) {
      const u = {
        ref: l
      };
      return /* @__PURE__ */ w.cloneElement(r, u);
    }
    return /* @__PURE__ */ O(w.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ O(w.Fragment, {
    children: s && /* @__PURE__ */ Fo.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (_n.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: a.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([pn, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool
});
process.env.NODE_ENV !== "production" && (_n["propTypes"] = Lr(_n.propTypes));
function Ya(e) {
  const n = be(e);
  return n.body === e ? hn(e).innerWidth > n.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function fn(e, n) {
  n ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function br(e) {
  return parseInt(hn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Ja(e) {
  const t = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return t || r;
}
function yr(e, n, t, r, o) {
  const i = [n, t, ...r];
  [].forEach.call(e.children, (s) => {
    const c = i.indexOf(s) === -1, l = !Ja(s);
    c && l && fn(s, o);
  });
}
function et(e, n) {
  let t = -1;
  return e.some((r, o) => n(r) ? (t = o, !0) : !1), t;
}
function Za(e, n) {
  const t = [], r = e.container;
  if (!n.disableScrollLock) {
    if (Ya(r)) {
      const s = Vr(be(r));
      t.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${br(r) + s}px`;
      const c = be(r).querySelectorAll(".mui-fixed");
      [].forEach.call(c, (l) => {
        t.push({
          value: l.style.paddingRight,
          property: "padding-right",
          el: l
        }), l.style.paddingRight = `${br(l) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = be(r).body;
    else {
      const s = r.parentElement, c = hn(r);
      i = (s == null ? void 0 : s.nodeName) === "HTML" && c.getComputedStyle(s).overflowY === "scroll" ? s : r;
    }
    t.push({
      value: i.style.overflow,
      property: "overflow",
      el: i
    }, {
      value: i.style.overflowX,
      property: "overflow-x",
      el: i
    }, {
      value: i.style.overflowY,
      property: "overflow-y",
      el: i
    }), i.style.overflow = "hidden";
  }
  return () => {
    t.forEach(({
      value: i,
      el: s,
      property: c
    }) => {
      i ? s.style.setProperty(c, i) : s.style.removeProperty(c);
    });
  };
}
function Qa(e) {
  const n = [];
  return [].forEach.call(e.children, (t) => {
    t.getAttribute("aria-hidden") === "true" && n.push(t);
  }), n;
}
class ec {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(n, t) {
    let r = this.modals.indexOf(n);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(n), n.modalRef && fn(n.modalRef, !1);
    const o = Qa(t);
    yr(t, n.mount, n.modalRef, o, !0);
    const i = et(this.containers, (s) => s.container === t);
    return i !== -1 ? (this.containers[i].modals.push(n), r) : (this.containers.push({
      modals: [n],
      container: t,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(n, t) {
    const r = et(this.containers, (i) => i.modals.indexOf(n) !== -1), o = this.containers[r];
    o.restore || (o.restore = Za(o, t));
  }
  remove(n, t = !0) {
    const r = this.modals.indexOf(n);
    if (r === -1)
      return r;
    const o = et(this.containers, (s) => s.modals.indexOf(n) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(n), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), n.modalRef && fn(n.modalRef, t), yr(i.container, n.mount, n.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && fn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(n) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === n;
  }
}
function nc(e) {
  return typeof e == "function" ? e() : e;
}
function tc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const rc = new ec();
function oc(e) {
  const {
    container: n,
    disableEscapeKeyDown: t = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = rc,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: c,
    children: l,
    onClose: u,
    open: d,
    rootRef: p
  } = e, f = w.useRef({}), b = w.useRef(null), y = w.useRef(null), m = Ie(y, p), [h, T] = w.useState(!d), B = tc(l);
  let E = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (E = !1);
  const x = () => be(b.current), g = () => (f.current.modalRef = y.current, f.current.mount = b.current, f.current), M = () => {
    o.mount(g(), {
      disableScrollLock: r
    }), y.current && (y.current.scrollTop = 0);
  }, _ = Qt(() => {
    const $ = nc(n) || x().body;
    o.add(g(), $), y.current && M();
  }), K = w.useCallback(() => o.isTopModal(g()), [o]), Z = Qt(($) => {
    b.current = $, $ && (d && K() ? M() : y.current && fn(y.current, E));
  }), R = w.useCallback(() => {
    o.remove(g(), E);
  }, [E, o]);
  w.useEffect(() => () => {
    R();
  }, [R]), w.useEffect(() => {
    d ? _() : (!B || !i) && R();
  }, [d, R, B, i, _]);
  const G = ($) => (j) => {
    var ie;
    (ie = $.onKeyDown) == null || ie.call($, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !K()) && (t || (j.stopPropagation(), u && u(j, "escapeKeyDown")));
  }, q = ($) => (j) => {
    var ie;
    (ie = $.onClick) == null || ie.call($, j), j.target === j.currentTarget && u && u(j, "backdropClick");
  };
  return {
    getRootProps: ($ = {}) => {
      const j = Gr(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const ie = k({}, j, $);
      return k({
        role: "presentation"
      }, ie, {
        onKeyDown: G(ie),
        ref: m
      });
    },
    getBackdropProps: ($ = {}) => {
      const j = $;
      return k({
        "aria-hidden": !0
      }, j, {
        onClick: q(j),
        open: d
      });
    },
    getTransitionProps: () => {
      const $ = () => {
        T(!1), s && s();
      }, j = () => {
        T(!0), c && c(), i && R();
      };
      return {
        onEnter: Zt($, l == null ? void 0 : l.props.onEnter),
        onExited: Zt(j, l == null ? void 0 : l.props.onExited)
      };
    },
    rootRef: m,
    portalRef: Z,
    isTopModal: K,
    exited: h,
    hasTransition: B
  };
}
function dt(e, n) {
  return dt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, dt(e, n);
}
function ic(e, n) {
  e.prototype = Object.create(n.prototype), e.prototype.constructor = e, dt(e, n);
}
const vr = {
  disabled: !1
};
var sc = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
  enter: a.number,
  exit: a.number,
  appear: a.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && a.oneOfType([a.string, a.shape({
  enter: a.string,
  exit: a.string,
  active: a.string
}), a.shape({
  enter: a.string,
  enterDone: a.string,
  enterActive: a.string,
  exit: a.string,
  exitDone: a.string,
  exitActive: a.string
})]);
const io = en.createContext(null);
var ac = function(n) {
  return n.scrollTop;
}, un = "unmounted", Ae = "exited", De = "entering", Qe = "entered", ft = "exiting", Ne = /* @__PURE__ */ function(e) {
  ic(n, e);
  function n(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, c = s && !s.isMounting ? r.enter : r.appear, l;
    return i.appearStatus = null, r.in ? c ? (l = Ae, i.appearStatus = De) : l = Qe : r.unmountOnExit || r.mountOnEnter ? l = un : l = Ae, i.state = {
      status: l
    }, i.nextCallback = null, i;
  }
  n.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === un ? {
      status: Ae
    } : null;
  };
  var t = n.prototype;
  return t.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, t.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== De && s !== Qe && (i = De) : (s === De || s === Qe) && (i = ft);
    }
    this.updateStatus(!1, i);
  }, t.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, t.getTimeouts = function() {
    var o = this.props.timeout, i, s, c;
    return i = s = c = o, o != null && typeof o != "number" && (i = o.exit, s = o.enter, c = o.appear !== void 0 ? o.appear : s), {
      exit: i,
      enter: s,
      appear: c
    };
  }, t.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === De) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : vn.findDOMNode(this);
          s && ac(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ae && this.setState({
        status: un
      });
  }, t.performEnter = function(o) {
    var i = this, s = this.props.enter, c = this.context ? this.context.isMounting : o, l = this.props.nodeRef ? [c] : [vn.findDOMNode(this), c], u = l[0], d = l[1], p = this.getTimeouts(), f = c ? p.appear : p.enter;
    if (!o && !s || vr.disabled) {
      this.safeSetState({
        status: Qe
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: De
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(f, function() {
        i.safeSetState({
          status: Qe
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, t.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), c = this.props.nodeRef ? void 0 : vn.findDOMNode(this);
    if (!i || vr.disabled) {
      this.safeSetState({
        status: Ae
      }, function() {
        o.props.onExited(c);
      });
      return;
    }
    this.props.onExit(c), this.safeSetState({
      status: ft
    }, function() {
      o.props.onExiting(c), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: Ae
        }, function() {
          o.props.onExited(c);
        });
      });
    });
  }, t.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, t.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, t.setNextCallback = function(o) {
    var i = this, s = !0;
    return this.nextCallback = function(c) {
      s && (s = !1, i.nextCallback = null, o(c));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, t.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var s = this.props.nodeRef ? this.props.nodeRef.current : vn.findDOMNode(this), c = o == null && !this.props.addEndListener;
    if (!s || c) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var l = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], u = l[0], d = l[1];
      this.props.addEndListener(u, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, t.render = function() {
    var o = this.state.status;
    if (o === un)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var c = ae(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ en.createElement(io.Provider, {
        value: null
      }, typeof s == "function" ? s(o, c) : en.cloneElement(en.Children.only(s), c))
    );
  }, n;
}(en.Component);
Ne.contextType = io;
Ne.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: a.shape({
    current: typeof Element > "u" ? a.any : function(e, n, t, r, o, i) {
      var s = e[n];
      return a.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, n, t, r, o, i);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: a.oneOfType([a.func.isRequired, a.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: a.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: a.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: a.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: a.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: a.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: a.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(n) {
    var t = sc;
    n.addEndListener || (t = t.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
      o[i - 1] = arguments[i];
    return t.apply(void 0, [n].concat(o));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: a.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: a.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: a.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: a.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: a.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: a.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: a.func
} : {};
function Je() {
}
Ne.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Je,
  onEntering: Je,
  onEntered: Je,
  onExit: Je,
  onExiting: Je,
  onExited: Je
};
Ne.UNMOUNTED = un;
Ne.EXITED = Ae;
Ne.ENTERING = De;
Ne.ENTERED = Qe;
Ne.EXITING = ft;
const so = Ne;
function qn() {
  const e = Zr(St);
  return process.env.NODE_ENV !== "production" && w.useDebugValue(e), e[wt] || e;
}
const ao = (e) => e.scrollTop;
function $n(e, n) {
  var t, r;
  const {
    timeout: o,
    easing: i,
    style: s = {}
  } = e;
  return {
    duration: (t = s.transitionDuration) != null ? t : typeof o == "number" ? o : o[n.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof i == "object" ? i[n.mode] : i,
    delay: s.transitionDelay
  };
}
const cc = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function pt(e) {
  return `scale(${e}, ${e ** 2})`;
}
const lc = {
  entering: {
    opacity: 1,
    transform: pt(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, nt = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Ot = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: c,
    onEnter: l,
    onEntered: u,
    onEntering: d,
    onExit: p,
    onExited: f,
    onExiting: b,
    style: y,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = so
  } = n, T = ae(n, cc), B = w.useRef(), E = w.useRef(), x = qn(), g = w.useRef(null), M = Ie(g, i.ref, t), _ = (N) => ($) => {
    if (N) {
      const j = g.current;
      $ === void 0 ? N(j) : N(j, $);
    }
  }, K = _(d), Z = _((N, $) => {
    ao(N);
    const {
      duration: j,
      delay: ie,
      easing: Q
    } = $n({
      style: y,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let v;
    m === "auto" ? (v = x.transitions.getAutoHeightDuration(N.clientHeight), E.current = v) : v = j, N.style.transition = [x.transitions.create("opacity", {
      duration: v,
      delay: ie
    }), x.transitions.create("transform", {
      duration: nt ? v : v * 0.666,
      delay: ie,
      easing: Q
    })].join(","), l && l(N, $);
  }), R = _(u), G = _(b), q = _((N) => {
    const {
      duration: $,
      delay: j,
      easing: ie
    } = $n({
      style: y,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let Q;
    m === "auto" ? (Q = x.transitions.getAutoHeightDuration(N.clientHeight), E.current = Q) : Q = $, N.style.transition = [x.transitions.create("opacity", {
      duration: Q,
      delay: j
    }), x.transitions.create("transform", {
      duration: nt ? Q : Q * 0.666,
      delay: nt ? j : j || Q * 0.333,
      easing: ie
    })].join(","), N.style.opacity = 0, N.style.transform = pt(0.75), p && p(N);
  }), ee = _(f), I = (N) => {
    m === "auto" && (B.current = setTimeout(N, E.current || 0)), r && r(g.current, N);
  };
  return w.useEffect(() => () => {
    clearTimeout(B.current);
  }, []), /* @__PURE__ */ O(h, k({
    appear: o,
    in: c,
    nodeRef: g,
    onEnter: Z,
    onEntered: R,
    onEntering: K,
    onExit: q,
    onExited: ee,
    onExiting: G,
    addEndListener: I,
    timeout: m === "auto" ? null : m
  }, T, {
    children: (N, $) => /* @__PURE__ */ w.cloneElement(i, k({
      style: k({
        opacity: 0,
        transform: pt(0.75),
        visibility: N === "exited" && !c ? "hidden" : void 0
      }, lc[N], y, i.props.style),
      ref: M
    }, $))
  }));
});
process.env.NODE_ENV !== "production" && (Ot.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: a.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: a.bool,
  /**
   * A single child content element.
   */
  children: An.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: a.oneOfType([a.shape({
    enter: a.string,
    exit: a.string
  }), a.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: a.bool,
  /**
   * @ignore
   */
  onEnter: a.func,
  /**
   * @ignore
   */
  onEntered: a.func,
  /**
   * @ignore
   */
  onEntering: a.func,
  /**
   * @ignore
   */
  onExit: a.func,
  /**
   * @ignore
   */
  onExited: a.func,
  /**
   * @ignore
   */
  onExiting: a.func,
  /**
   * @ignore
   */
  style: a.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
Ot.muiSupportAuto = !0;
const uc = Ot, dc = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], fc = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, co = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const r = qn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: c,
    easing: l,
    in: u,
    onEnter: d,
    onEntered: p,
    onEntering: f,
    onExit: b,
    onExited: y,
    onExiting: m,
    style: h,
    timeout: T = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: B = so
  } = n, E = ae(n, dc), x = w.useRef(null), g = Ie(x, c.ref, t), M = (I) => (N) => {
    if (I) {
      const $ = x.current;
      N === void 0 ? I($) : I($, N);
    }
  }, _ = M(f), K = M((I, N) => {
    ao(I);
    const $ = $n({
      style: h,
      timeout: T,
      easing: l
    }, {
      mode: "enter"
    });
    I.style.webkitTransition = r.transitions.create("opacity", $), I.style.transition = r.transitions.create("opacity", $), d && d(I, N);
  }), Z = M(p), R = M(m), G = M((I) => {
    const N = $n({
      style: h,
      timeout: T,
      easing: l
    }, {
      mode: "exit"
    });
    I.style.webkitTransition = r.transitions.create("opacity", N), I.style.transition = r.transitions.create("opacity", N), b && b(I);
  }), q = M(y);
  return /* @__PURE__ */ O(B, k({
    appear: s,
    in: u,
    nodeRef: x,
    onEnter: K,
    onEntered: Z,
    onEntering: _,
    onExit: G,
    onExited: q,
    onExiting: R,
    addEndListener: (I) => {
      i && i(x.current, I);
    },
    timeout: T
  }, E, {
    children: (I, N) => /* @__PURE__ */ w.cloneElement(c, k({
      style: k({
        opacity: 0,
        visibility: I === "exited" && !u ? "hidden" : void 0
      }, fc[I], h, c.props.style),
      ref: g
    }, N))
  }));
});
process.env.NODE_ENV !== "production" && (co.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: a.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: a.bool,
  /**
   * A single child content element.
   */
  children: An.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: a.oneOfType([a.shape({
    enter: a.string,
    exit: a.string
  }), a.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: a.bool,
  /**
   * @ignore
   */
  onEnter: a.func,
  /**
   * @ignore
   */
  onEntered: a.func,
  /**
   * @ignore
   */
  onEntering: a.func,
  /**
   * @ignore
   */
  onExit: a.func,
  /**
   * @ignore
   */
  onExited: a.func,
  /**
   * @ignore
   */
  onExiting: a.func,
  /**
   * @ignore
   */
  style: a.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: a.oneOfType([a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
const pc = co;
function hc(e) {
  return Re("MuiBackdrop", e);
}
ze("MuiBackdrop", ["root", "invisible"]);
const mc = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], gc = (e) => {
  const {
    classes: n,
    invisible: t
  } = e;
  return Ve({
    root: ["root", t && "invisible"]
  }, hc, n);
}, bc = Te("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: t
    } = e;
    return [n.root, t.invisible && n.invisible];
  }
})(({
  ownerState: e
}) => k({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, e.invisible && {
  backgroundColor: "transparent"
})), lo = /* @__PURE__ */ w.forwardRef(function(n, t) {
  var r, o, i;
  const s = Ue({
    props: n,
    name: "MuiBackdrop"
  }), {
    children: c,
    className: l,
    component: u = "div",
    components: d = {},
    componentsProps: p = {},
    invisible: f = !1,
    open: b,
    slotProps: y = {},
    slots: m = {},
    TransitionComponent: h = pc,
    transitionDuration: T
  } = s, B = ae(s, mc), E = k({}, s, {
    component: u,
    invisible: f
  }), x = gc(E), g = (r = y.root) != null ? r : p.root;
  return /* @__PURE__ */ O(h, k({
    in: b,
    timeout: T
  }, B, {
    children: /* @__PURE__ */ O(bc, k({
      "aria-hidden": !0
    }, g, {
      as: (o = (i = m.root) != null ? i : d.Root) != null ? o : u,
      className: Ce(x.root, l, g == null ? void 0 : g.className),
      ownerState: k({}, E, g == null ? void 0 : g.ownerState),
      classes: x,
      ref: t,
      children: c
    }))
  }));
});
process.env.NODE_ENV !== "production" && (lo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Root: a.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: a.shape({
    root: a.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: a.bool,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: a.shape({
    root: a.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: a.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: a.oneOfType([a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
const yc = lo;
function vc(e) {
  return Re("MuiModal", e);
}
ze("MuiModal", ["root", "hidden", "backdrop"]);
const Ec = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], xc = (e) => {
  const {
    open: n,
    exited: t,
    classes: r
  } = e;
  return Ve({
    root: ["root", !n && t && "hidden"],
    backdrop: ["backdrop"]
  }, vc, r);
}, Tc = Te("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: t
    } = e;
    return [n.root, !t.open && t.exited && n.hidden];
  }
})(({
  theme: e,
  ownerState: n
}) => k({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !n.open && n.exited && {
  visibility: "hidden"
})), kc = Te(yc, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, n) => n.backdrop
})({
  zIndex: -1
}), uo = /* @__PURE__ */ w.forwardRef(function(n, t) {
  var r, o, i, s, c, l;
  const u = Ue({
    name: "MuiModal",
    props: n
  }), {
    BackdropComponent: d = kc,
    BackdropProps: p,
    className: f,
    closeAfterTransition: b = !1,
    children: y,
    container: m,
    component: h,
    components: T = {},
    componentsProps: B = {},
    disableAutoFocus: E = !1,
    disableEnforceFocus: x = !1,
    disableEscapeKeyDown: g = !1,
    disablePortal: M = !1,
    disableRestoreFocus: _ = !1,
    disableScrollLock: K = !1,
    hideBackdrop: Z = !1,
    keepMounted: R = !1,
    onBackdropClick: G,
    open: q,
    slotProps: ee,
    slots: I
    // eslint-disable-next-line react/prop-types
  } = u, N = ae(u, Ec), $ = k({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: E,
    disableEnforceFocus: x,
    disableEscapeKeyDown: g,
    disablePortal: M,
    disableRestoreFocus: _,
    disableScrollLock: K,
    hideBackdrop: Z,
    keepMounted: R
  }), {
    getRootProps: j,
    getBackdropProps: ie,
    getTransitionProps: Q,
    portalRef: v,
    isTopModal: P,
    exited: A,
    hasTransition: z
  } = oc(k({}, $, {
    rootRef: t
  })), D = k({}, $, {
    exited: A
  }), V = xc(D), L = {};
  if (y.props.tabIndex === void 0 && (L.tabIndex = "-1"), z) {
    const {
      onEnter: H,
      onExited: S
    } = Q();
    L.onEnter = H, L.onExited = S;
  }
  const F = (r = (o = I == null ? void 0 : I.root) != null ? o : T.Root) != null ? r : Tc, W = (i = (s = I == null ? void 0 : I.backdrop) != null ? s : T.Backdrop) != null ? i : d, X = (c = ee == null ? void 0 : ee.root) != null ? c : B.root, U = (l = ee == null ? void 0 : ee.backdrop) != null ? l : B.backdrop, de = rn({
    elementType: F,
    externalSlotProps: X,
    externalForwardedProps: N,
    getSlotProps: j,
    additionalProps: {
      ref: t,
      as: h
    },
    ownerState: D,
    className: Ce(f, X == null ? void 0 : X.className, V == null ? void 0 : V.root, !D.open && D.exited && (V == null ? void 0 : V.hidden))
  }), C = rn({
    elementType: W,
    externalSlotProps: U,
    additionalProps: p,
    getSlotProps: (H) => ie(k({}, H, {
      onClick: (S) => {
        G && G(S), H != null && H.onClick && H.onClick(S);
      }
    })),
    className: Ce(U == null ? void 0 : U.className, p == null ? void 0 : p.className, V == null ? void 0 : V.backdrop),
    ownerState: D
  });
  return !R && !q && (!z || A) ? null : /* @__PURE__ */ O(_n, {
    ref: v,
    container: m,
    disablePortal: M,
    children: /* @__PURE__ */ ye(F, k({}, de, {
      children: [!Z && d ? /* @__PURE__ */ O(W, k({}, C)) : null, /* @__PURE__ */ O(Nn, {
        disableEnforceFocus: x,
        disableAutoFocus: E,
        disableRestoreFocus: _,
        isEnabled: P,
        open: q,
        children: /* @__PURE__ */ w.cloneElement(y, L)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (uo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: a.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: a.object,
  /**
   * A single child content element.
   */
  children: An.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: a.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Backdrop: a.elementType,
    Root: a.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: a.shape({
    backdrop: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([pn, a.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: a.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: a.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: a.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: a.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: a.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: a.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: a.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: a.shape({
    backdrop: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    backdrop: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object])
});
const Sc = uo, wc = (e) => {
  let n;
  return e < 1 ? n = 5.11916 * e ** 2 : n = 4.5 * Math.log(e + 1) + 2, (n / 100).toFixed(2);
}, Er = wc;
function Oc(e) {
  return Re("MuiPaper", e);
}
ze("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Cc = ["className", "component", "elevation", "square", "variant"], Pc = (e) => {
  const {
    square: n,
    elevation: t,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !n && "rounded", r === "elevation" && `elevation${t}`]
  };
  return Ve(i, Oc, o);
}, Rc = Te("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: t
    } = e;
    return [n.root, n[t.variant], !t.square && n.rounded, t.variant === "elevation" && n[`elevation${t.elevation}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var t;
  return k({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !n.square && {
    borderRadius: e.shape.borderRadius
  }, n.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, n.variant === "elevation" && k({
    boxShadow: (e.vars || e).shadows[n.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${ur("#fff", Er(n.elevation))}, ${ur("#fff", Er(n.elevation))})`
  }, e.vars && {
    backgroundImage: (t = e.vars.overlays) == null ? void 0 : t[n.elevation]
  }));
}), fo = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const r = Ue({
    props: n,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: c = !1,
    variant: l = "elevation"
  } = r, u = ae(r, Cc), d = k({}, r, {
    component: i,
    elevation: s,
    square: c,
    variant: l
  }), p = Pc(d);
  return process.env.NODE_ENV !== "production" && qn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ O(Rc, k({
    as: i,
    ownerState: d,
    className: Ce(p.root, o),
    ref: t
  }, u));
});
process.env.NODE_ENV !== "production" && (fo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: gn(Hr, (e) => {
    const {
      elevation: n,
      variant: t
    } = e;
    return n > 0 && t === "outlined" ? new Error(`MUI: Combining \`elevation={${n}}\` with \`variant="${t}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: a.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: a.oneOfType([a.oneOf(["elevation", "outlined"]), a.string])
});
const Nc = fo;
function _c(e) {
  return Re("MuiPopover", e);
}
ze("MuiPopover", ["root", "paper"]);
const $c = ["onEntering"], Ic = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Mc = ["slotProps"];
function xr(e, n) {
  let t = 0;
  return typeof n == "number" ? t = n : n === "center" ? t = e.height / 2 : n === "bottom" && (t = e.height), t;
}
function Tr(e, n) {
  let t = 0;
  return typeof n == "number" ? t = n : n === "center" ? t = e.width / 2 : n === "right" && (t = e.width), t;
}
function kr(e) {
  return [e.horizontal, e.vertical].map((n) => typeof n == "number" ? `${n}px` : n).join(" ");
}
function Sn(e) {
  return typeof e == "function" ? e() : e;
}
const Ac = (e) => {
  const {
    classes: n
  } = e;
  return Ve({
    root: ["root"],
    paper: ["paper"]
  }, _c, n);
}, Dc = Te(Sc, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), po = Te(Nc, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (e, n) => n.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), ho = /* @__PURE__ */ w.forwardRef(function(n, t) {
  var r, o, i;
  const s = Ue({
    props: n,
    name: "MuiPopover"
  }), {
    action: c,
    anchorEl: l,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: d,
    anchorReference: p = "anchorEl",
    children: f,
    className: b,
    container: y,
    elevation: m = 8,
    marginThreshold: h = 16,
    open: T,
    PaperProps: B = {},
    slots: E,
    slotProps: x,
    transformOrigin: g = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: M = uc,
    transitionDuration: _ = "auto",
    TransitionProps: {
      onEntering: K
    } = {},
    disableScrollLock: Z = !1
  } = s, R = ae(s.TransitionProps, $c), G = ae(s, Ic), q = (r = x == null ? void 0 : x.paper) != null ? r : B, ee = w.useRef(), I = Ie(ee, q.ref), N = k({}, s, {
    anchorOrigin: u,
    anchorReference: p,
    elevation: m,
    marginThreshold: h,
    externalPaperSlotProps: q,
    transformOrigin: g,
    TransitionComponent: M,
    transitionDuration: _,
    TransitionProps: R
  }), $ = Ac(N), j = w.useCallback(() => {
    if (p === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const H = Sn(l), S = H && H.nodeType === 1 ? H : be(ee.current).body, fe = S.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const he = S.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && he.top === 0 && he.left === 0 && he.right === 0 && he.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: fe.top + xr(fe, u.vertical),
      left: fe.left + Tr(fe, u.horizontal)
    };
  }, [l, u.horizontal, u.vertical, d, p]), ie = w.useCallback((H) => ({
    vertical: xr(H, g.vertical),
    horizontal: Tr(H, g.horizontal)
  }), [g.horizontal, g.vertical]), Q = w.useCallback((H) => {
    const S = {
      width: H.offsetWidth,
      height: H.offsetHeight
    }, fe = ie(S);
    if (p === "none")
      return {
        top: null,
        left: null,
        transformOrigin: kr(fe)
      };
    const he = j();
    let Se = he.top - fe.vertical, He = he.left - fe.horizontal;
    const _t = Se + S.height, $t = He + S.width, It = hn(Sn(l)), sn = It.innerHeight - h, Mt = It.innerWidth - h;
    if (h !== null && Se < h) {
      const Ee = Se - h;
      Se -= Ee, fe.vertical += Ee;
    } else if (h !== null && _t > sn) {
      const Ee = _t - sn;
      Se -= Ee, fe.vertical += Ee;
    }
    if (process.env.NODE_ENV !== "production" && S.height > sn && S.height && sn && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${S.height - sn}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && He < h) {
      const Ee = He - h;
      He -= Ee, fe.horizontal += Ee;
    } else if ($t > Mt) {
      const Ee = $t - Mt;
      He -= Ee, fe.horizontal += Ee;
    }
    return {
      top: `${Math.round(Se)}px`,
      left: `${Math.round(He)}px`,
      transformOrigin: kr(fe)
    };
  }, [l, p, j, ie, h]), [v, P] = w.useState(T), A = w.useCallback(() => {
    const H = ee.current;
    if (!H)
      return;
    const S = Q(H);
    S.top !== null && (H.style.top = S.top), S.left !== null && (H.style.left = S.left), H.style.transformOrigin = S.transformOrigin, P(!0);
  }, [Q]);
  w.useEffect(() => (Z && window.addEventListener("scroll", A), () => window.removeEventListener("scroll", A)), [l, Z, A]);
  const z = (H, S) => {
    K && K(H, S), A();
  }, D = () => {
    P(!1);
  };
  w.useEffect(() => {
    T && A();
  }), w.useImperativeHandle(c, () => T ? {
    updatePosition: () => {
      A();
    }
  } : null, [T, A]), w.useEffect(() => {
    if (!T)
      return;
    const H = Ti(() => {
      A();
    }), S = hn(l);
    return S.addEventListener("resize", H), () => {
      H.clear(), S.removeEventListener("resize", H);
    };
  }, [l, T, A]);
  let V = _;
  _ === "auto" && !M.muiSupportAuto && (V = void 0);
  const L = y || (l ? be(Sn(l)).body : void 0), F = (o = E == null ? void 0 : E.root) != null ? o : Dc, W = (i = E == null ? void 0 : E.paper) != null ? i : po, X = rn({
    elementType: W,
    externalSlotProps: k({}, q, {
      style: v ? q.style : k({}, q.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: I
    },
    ownerState: N,
    className: Ce($.paper, q == null ? void 0 : q.className)
  }), U = rn({
    elementType: F,
    externalSlotProps: (x == null ? void 0 : x.root) || {},
    externalForwardedProps: G,
    additionalProps: {
      ref: t,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: L,
      open: T
    },
    ownerState: N,
    className: Ce($.root, b)
  }), {
    slotProps: de
  } = U, C = ae(U, Mc);
  return /* @__PURE__ */ O(F, k({}, C, !Wr(F) && {
    slotProps: de,
    disableScrollLock: Z
  }, {
    children: /* @__PURE__ */ O(M, k({
      appear: !0,
      in: T,
      onEntering: z,
      onExited: D,
      timeout: V
    }, R, {
      children: /* @__PURE__ */ O(W, k({}, X, {
        children: f
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ho.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: xi,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: gn(a.oneOfType([pn, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const n = Sn(e.anchorEl);
      if (n && n.nodeType === 1) {
        const t = n.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && t.top === 0 && t.left === 0 && t.right === 0 && t.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${n}\` instead.`].join(`
`));
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: a.shape({
    horizontal: a.oneOfType([a.oneOf(["center", "left", "right"]), a.number]).isRequired,
    vertical: a.oneOfType([a.oneOf(["bottom", "center", "top"]), a.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: a.shape({
    left: a.number.isRequired,
    top: a.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: a.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([pn, a.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Hr,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: a.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: a.shape({
    component: mi
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: a.shape({
    paper: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: a.shape({
    paper: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: a.shape({
    horizontal: a.oneOfType([a.oneOf(["center", "left", "right"]), a.number]).isRequired,
    vertical: a.oneOfType([a.oneOf(["bottom", "center", "top"]), a.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: a.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: a.object
});
const Bc = ho;
function jc(e) {
  return Re("MuiMenu", e);
}
ze("MuiMenu", ["root", "paper", "list"]);
const Lc = ["onEntering"], Fc = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Vc = {
  vertical: "top",
  horizontal: "right"
}, zc = {
  vertical: "top",
  horizontal: "left"
}, Uc = (e) => {
  const {
    classes: n
  } = e;
  return Ve({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, jc, n);
}, Hc = Te(Bc, {
  shouldForwardProp: (e) => eo(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), qc = Te(po, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (e, n) => n.paper
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), Wc = Te(za, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, n) => n.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), mo = /* @__PURE__ */ w.forwardRef(function(n, t) {
  var r, o;
  const i = Ue({
    props: n,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: c,
    className: l,
    disableAutoFocusItem: u = !1,
    MenuListProps: d = {},
    onClose: p,
    open: f,
    PaperProps: b = {},
    PopoverClasses: y,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: T = "selectedMenu",
    slots: B = {},
    slotProps: E = {}
  } = i, x = ae(i.TransitionProps, Lc), g = ae(i, Fc), M = qn(), _ = M.direction === "rtl", K = k({}, i, {
    autoFocus: s,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: h,
    PaperProps: b,
    transitionDuration: m,
    TransitionProps: x,
    variant: T
  }), Z = Uc(K), R = s && !u && f, G = w.useRef(null), q = (Q, v) => {
    G.current && G.current.adjustStyleForScrollbar(Q, M), h && h(Q, v);
  }, ee = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), p && p(Q, "tabKeyDown"));
  };
  let I = -1;
  w.Children.map(c, (Q, v) => {
    /* @__PURE__ */ w.isValidElement(Q) && (process.env.NODE_ENV !== "production" && wn.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (T === "selectedMenu" && Q.props.selected || I === -1) && (I = v));
  });
  const N = (r = B.paper) != null ? r : qc, $ = (o = E.paper) != null ? o : b, j = rn({
    elementType: B.root,
    externalSlotProps: E.root,
    ownerState: K,
    className: [Z.root, l]
  }), ie = rn({
    elementType: N,
    externalSlotProps: $,
    ownerState: K,
    className: Z.paper
  });
  return /* @__PURE__ */ O(Hc, k({
    onClose: p,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: _ ? "right" : "left"
    },
    transformOrigin: _ ? Vc : zc,
    slots: {
      paper: N,
      root: B.root
    },
    slotProps: {
      root: j,
      paper: ie
    },
    open: f,
    ref: t,
    transitionDuration: m,
    TransitionProps: k({
      onEntering: q
    }, x),
    ownerState: K
  }, g, {
    classes: y,
    children: /* @__PURE__ */ O(Wc, k({
      onKeyDown: ee,
      actions: G,
      autoFocus: s && (I === -1 || u),
      autoFocusItem: R,
      variant: T
    }, d, {
      className: Ce(Z.list, d.className),
      children: c
    }))
  }));
});
process.env.NODE_ENV !== "production" && (mo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: a.oneOfType([pn, a.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: a.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: a.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: a.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: a.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: a.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: a.shape({
    paper: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: a.shape({
    paper: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: a.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: a.oneOf(["menu", "selectedMenu"])
});
const Gc = mo;
function wl(e) {
  var u;
  const { className: n, commandHandler: t, menuDefinition: r, children: o } = e, [i, s] = en.useState(void 0), c = (d) => {
    d.preventDefault(), s(
      i === void 0 ? {
        mouseX: d.clientX + 2,
        mouseY: d.clientY - 6
      } : (
        // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
        // Other native context menus might behave different.
        // With this behavior we prevent re-locating existing context menus.
        void 0
      )
    );
  }, l = () => {
    s(void 0);
  };
  return (((u = r == null ? void 0 : r.items) == null ? void 0 : u.length) ?? 0) === 0 || !o ? o : /* @__PURE__ */ ye(
    "div",
    {
      className: `papi-context-menu-target ${n ?? ""}`,
      onContextMenu: c,
      style: { cursor: "context-menu" },
      children: [
        o,
        /* @__PURE__ */ O(
          Gc,
          {
            className: `papi-context-menu ${n ?? ""}`,
            open: i !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: i !== void 0 ? { top: i.mouseY, left: i.mouseX } : void 0,
            children: /* @__PURE__ */ O(
              gt,
              {
                menuDefinition: r,
                commandHandler: t,
                onClick: l
              }
            )
          }
        )
      ]
    }
  );
}
var Kc = Object.defineProperty, Xc = (e, n, t) => n in e ? Kc(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, J = (e, n, t) => (Xc(e, typeof n != "symbol" ? n + "" : n, t), t);
const Fe = [
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
], Ct = [
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
], go = [
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
], Sr = il();
function on(e, n = !0) {
  return n && (e = e.toUpperCase()), e in Sr ? Sr[e] : 0;
}
function Pt(e) {
  return on(e) > 0;
}
function Yc(e) {
  const n = typeof e == "string" ? on(e) : e;
  return n >= 40 && n <= 66;
}
function Jc(e) {
  return (typeof e == "string" ? on(e) : e) <= 39;
}
function bo(e) {
  return e <= 66;
}
function Zc(e) {
  const n = typeof e == "string" ? on(e) : e;
  return Eo(n) && !bo(n);
}
function* Qc() {
  for (let e = 1; e <= Fe.length; e++)
    yield e;
}
const el = 1, yo = Fe.length;
function nl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Rt(e, n = "***") {
  const t = e - 1;
  return t < 0 || t >= Fe.length ? n : Fe[t];
}
function vo(e) {
  return e <= 0 || e > yo ? "******" : go[e - 1];
}
function tl(e) {
  return vo(on(e));
}
function Eo(e) {
  const n = typeof e == "number" ? Rt(e) : e;
  return Pt(n) && !Ct.includes(n);
}
function rl(e) {
  const n = typeof e == "number" ? Rt(e) : e;
  return Pt(n) && Ct.includes(n);
}
function ol(e) {
  return go[e - 1].includes("*obsolete*");
}
function il() {
  const e = {};
  for (let n = 0; n < Fe.length; n++)
    e[Fe[n]] = n + 1;
  return e;
}
const Oe = {
  allBookIds: Fe,
  nonCanonicalIds: Ct,
  bookIdToNumber: on,
  isBookIdValid: Pt,
  isBookNT: Yc,
  isBookOT: Jc,
  isBookOTNT: bo,
  isBookDC: Zc,
  allBookNumbers: Qc,
  firstBook: el,
  lastBook: yo,
  extraBooks: nl,
  bookNumberToId: Rt,
  bookNumberToEnglishName: vo,
  bookIdToEnglishName: tl,
  isCanonical: Eo,
  isExtraMaterial: rl,
  isObsolete: ol
};
var _e = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(_e || {});
const Be = class {
  // private versInfo: Versification;
  constructor(e) {
    if (J(this, "name"), J(this, "fullPath"), J(this, "isPresent"), J(this, "hasVerseSegments"), J(this, "isCustomized"), J(this, "baseVersification"), J(this, "scriptureBooks"), J(this, "_type"), e != null)
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
let ge = Be;
J(ge, "Original", new Be(_e.Original)), J(ge, "Septuagint", new Be(_e.Septuagint)), J(ge, "Vulgate", new Be(_e.Vulgate)), J(ge, "English", new Be(_e.English)), J(ge, "RussianProtestant", new Be(_e.RussianProtestant)), J(ge, "RussianOrthodox", new Be(_e.RussianOrthodox));
function wr(e, n) {
  const t = n[0];
  for (let r = 1; r < n.length; r++)
    e = e.split(n[r]).join(t);
  return e.split(t);
}
var xo = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(xo || {});
const Y = class {
  constructor(e, n, t, r) {
    if (J(this, "firstChapter"), J(this, "lastChapter"), J(this, "lastVerse"), J(this, "hasSegmentsDefined"), J(this, "text"), J(this, "BBBCCCVVVS"), J(this, "longHashCode"), J(this, "versification"), J(this, "rtlMark", "‏"), J(this, "_bookNum", 0), J(this, "_chapterNum", 0), J(this, "_verseNum", 0), J(this, "_verse"), t == null && r == null)
      if (e != null && typeof e == "string") {
        const o = e, i = n != null && n instanceof ge ? n : void 0;
        this.setEmpty(i), this.parse(o);
      } else if (e != null && typeof e == "number") {
        const o = n != null && n instanceof ge ? n : void 0;
        this.setEmpty(o), this._verseNum = e % Y.chapterDigitShifter, this._chapterNum = Math.floor(
          e % Y.bookDigitShifter / Y.chapterDigitShifter
        ), this._bookNum = Math.floor(e / Y.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof Y) {
          const o = e;
          this._bookNum = o.bookNum, this._chapterNum = o.chapterNum, this._verseNum = o.verseNum, this._verse = o.verse, this.versification = o.versification;
        } else {
          if (e == null)
            return;
          const o = e instanceof ge ? e : Y.defaultVersification;
          this.setEmpty(o);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && t != null)
      if (typeof e == "string" && typeof n == "string" && typeof t == "string")
        this.setEmpty(r), this.updateInternal(e, n, t);
      else if (typeof e == "number" && typeof n == "number" && typeof t == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = t, this.versification = r ?? Y.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, n = Y.defaultVersification) {
    const t = new Y(n);
    return t.parse(e), t;
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
      return n = Y.parse(e), { success: !0, verseRef: n };
    } catch (t) {
      if (t instanceof ln)
        return n = new Y(), { success: !1, verseRef: n };
      throw t;
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
  static getBBBCCCVVV(e, n, t) {
    return e % Y.bcvMaxValue * Y.bookDigitShifter + (n >= 0 ? n % Y.bcvMaxValue * Y.chapterDigitShifter : 0) + (t >= 0 ? t % Y.bcvMaxValue : 0);
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
    let t;
    for (let r = 0; r < e.length; r++) {
      if (t = e[r], t < "0" || t > "9")
        return r === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +t - +"0", n > Y.bcvMaxValue)
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
    return Oe.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = Oe.bookIdToNumber(e);
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
    const { success: n, vNum: t } = Y.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = t, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = Y.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > Oe.lastBook)
      throw new ln(
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
    this.versification = this.versification != null ? new ge(e) : void 0;
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
  parse(e) {
    if (e = e.replace(this.rtlMark, ""), e.includes("/")) {
      const o = e.split("/");
      if (e = o[0], o.length > 1)
        try {
          const i = +o[1].trim();
          this.versification = new ge(_e[i]);
        } catch {
          throw new ln("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new ln("Invalid reference : " + e);
    const t = n[1].split(":"), r = +t[0];
    if (t.length !== 2 || Oe.bookIdToNumber(n[0]) === 0 || !Number.isInteger(r) || r < 0 || !Y.isVerseParseable(t[1]))
      throw new ln("Invalid reference : " + e);
    this.updateInternal(n[0], t[0], t[1]);
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
  allVerses(e = !1, n = Y.verseRangeSeparators, t = Y.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const r = [], o = wr(this._verse, t);
    for (const i of o.map((s) => wr(s, n))) {
      const s = this.clone();
      s.verse = i[0];
      const c = s.verseNum;
      if (r.push(s), i.length > 1) {
        const l = this.clone();
        if (l.verse = i[1], !e)
          for (let u = c + 1; u < l.verseNum; u++) {
            const d = new Y(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || r.push(d);
          }
        r.push(l);
      }
    }
    return r;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let t = 0;
    for (const r of this.allVerses(!0, e, n)) {
      const o = r.internalValid;
      if (o !== 0)
        return o;
      const i = r.BBBCCCVVV;
      if (t > i)
        return 3;
      if (t === i)
        return 4;
      t = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Oe.lastBook ? 2 : 0;
  }
  setEmpty(e = Y.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, t) {
    this.bookNum = Oe.bookIdToNumber(e), this.chapter = n, this.verse = t;
  }
};
let we = Y;
J(we, "defaultVersification", ge.English), J(we, "verseRangeSeparator", "-"), J(we, "verseSequenceIndicator", ","), J(we, "verseRangeSeparators", [Y.verseRangeSeparator]), J(we, "verseSequenceIndicators", [Y.verseSequenceIndicator]), J(we, "chapterDigitShifter", 1e3), J(we, "bookDigitShifter", Y.chapterDigitShifter * Y.chapterDigitShifter), J(we, "bcvMaxValue", Y.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
J(we, "ValidStatusType", xo);
class ln extends Error {
}
function In({
  variant: e = "outlined",
  id: n,
  isDisabled: t = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: s,
  placeholder: c,
  isRequired: l = !1,
  className: u,
  defaultValue: d,
  value: p,
  onChange: f,
  onFocus: b,
  onBlur: y
}) {
  return /* @__PURE__ */ O(
    Pr,
    {
      variant: e,
      id: n,
      disabled: t,
      error: r,
      fullWidth: o,
      helperText: i,
      label: s,
      placeholder: c,
      required: l,
      className: `papi-textfield ${u ?? ""}`,
      defaultValue: d,
      value: p,
      onChange: f,
      onFocus: b,
      onBlur: y
    }
  );
}
let tt;
const rt = () => (tt || (tt = Oe.allBookIds.map((e) => ({
  bookId: e,
  label: Oe.bookIdToEnglishName(e)
}))), tt);
function Ol({ scrRef: e, handleSubmit: n, id: t }) {
  const r = (l) => {
    n(l);
  }, o = (l, u) => {
    const p = { bookNum: Oe.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(p);
  }, i = (l) => {
    n({ ...e, chapterNum: +l.target.value });
  }, s = (l) => {
    n({ ...e, verseNum: +l.target.value });
  }, c = mt(() => rt()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ ye("span", { id: t, children: [
    /* @__PURE__ */ O(
      st,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: c,
        options: rt(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ O(
      qe,
      {
        onClick: () => r(Dt(e, -1)),
        isDisabled: e.bookNum <= Vo,
        children: "<"
      }
    ),
    /* @__PURE__ */ O(
      qe,
      {
        onClick: () => r(Dt(e, 1)),
        isDisabled: e.bookNum >= rt().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ O(
      In,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ O(
      qe,
      {
        onClick: () => n(Bt(e, -1)),
        isDisabled: e.chapterNum <= zo,
        children: "<"
      }
    ),
    /* @__PURE__ */ O(
      qe,
      {
        onClick: () => n(Bt(e, 1)),
        isDisabled: e.chapterNum >= Uo(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ O(
      In,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ O(
      qe,
      {
        onClick: () => n(jt(e, -1)),
        isDisabled: e.verseNum <= Ho,
        children: "<"
      }
    ),
    /* @__PURE__ */ O(qe, { onClick: () => n(jt(e, 1)), children: ">" })
  ] });
}
function Cl({ onSearch: e, placeholder: n, isFullWidth: t }) {
  const [r, o] = je(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ O(No, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ O(
    In,
    {
      isFullWidth: t,
      className: "search-bar-input",
      placeholder: n,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  ) });
}
function Pl({
  id: e,
  isDisabled: n = !1,
  orientation: t = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: s = !1,
  defaultValue: c,
  value: l,
  valueLabelDisplay: u = "off",
  className: d,
  onChange: p,
  onChangeCommitted: f
}) {
  return /* @__PURE__ */ O(
    _o,
    {
      id: e,
      disabled: n,
      orientation: t,
      min: r,
      max: o,
      step: i,
      marks: s,
      defaultValue: c,
      value: l,
      valueLabelDisplay: u,
      className: `papi-slider ${t} ${d ?? ""}`,
      onChange: p,
      onChangeCommitted: f
    }
  );
}
function Rl({
  autoHideDuration: e = void 0,
  id: n,
  isOpen: t = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: c
}) {
  const l = {
    action: (s == null ? void 0 : s.action) || c,
    message: s == null ? void 0 : s.message,
    className: r
  };
  return /* @__PURE__ */ O(
    $o,
    {
      autoHideDuration: e ?? void 0,
      open: t,
      onClose: o,
      anchorOrigin: i,
      id: n,
      ContentProps: l
    }
  );
}
function Nl({
  id: e,
  isChecked: n,
  isDisabled: t = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ O(
    Io,
    {
      id: e,
      checked: n,
      disabled: t,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Or({ onRowChange: e, row: n, column: t }) {
  const r = (o) => {
    e({ ...n, [t.key]: o.target.value });
  };
  return /* @__PURE__ */ O(In, { defaultValue: n[t.key], onChange: r });
}
const sl = ({ onChange: e, disabled: n, checked: t, ...r }) => /* @__PURE__ */ O(
  Go,
  {
    ...r,
    isChecked: t,
    isDisabled: n,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function _l({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: t,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: c = !0,
  defaultColumnResizable: l = !0,
  rows: u,
  enableSelectColumn: d,
  selectColumnWidth: p = 50,
  rowKeyGetter: f,
  rowHeight: b = 35,
  headerRowHeight: y = 35,
  selectedRows: m,
  onSelectedRowsChange: h,
  onRowsChange: T,
  onCellClick: B,
  onCellDoubleClick: E,
  onCellContextMenu: x,
  onCellKeyDown: g,
  direction: M = "ltr",
  enableVirtualization: _ = !0,
  onCopy: K,
  onPaste: Z,
  onScroll: R,
  className: G,
  id: q
}) {
  const ee = mt(() => {
    const I = e.map((N) => typeof N.editable == "function" ? {
      ...N,
      editable: (j) => !!N.editable(j),
      renderEditCell: N.renderEditCell || Or
    } : N.editable && !N.renderEditCell ? { ...N, renderEditCell: Or } : N.renderEditCell && !N.editable ? { ...N, editable: !1 } : N);
    return d ? [{ ...Wo, minWidth: p }, ...I] : I;
  }, [e, d, p]);
  return /* @__PURE__ */ O(
    qo,
    {
      columns: ee,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: s,
        sortable: c,
        resizable: l
      },
      sortColumns: n,
      onSortColumnsChange: t,
      onColumnResize: r,
      rows: u,
      rowKeyGetter: f,
      rowHeight: b,
      headerRowHeight: y,
      selectedRows: m,
      onSelectedRowsChange: h,
      onRowsChange: T,
      onCellClick: B,
      onCellDoubleClick: E,
      onCellContextMenu: x,
      onCellKeyDown: g,
      direction: M,
      enableVirtualization: _,
      onCopy: K,
      onPaste: Z,
      onScroll: R,
      renderers: { renderCheckbox: sl },
      className: `papi-table ${G ?? "rdg-light"}`,
      id: q
    }
  );
}
function al(e) {
  return Re("MuiSvgIcon", e);
}
ze("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const cl = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ll = (e) => {
  const {
    color: n,
    fontSize: t,
    classes: r
  } = e, o = {
    root: ["root", n !== "inherit" && `color${ke(n)}`, `fontSize${ke(t)}`]
  };
  return Ve(o, al, r);
}, ul = Te("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: t
    } = e;
    return [n.root, t.color !== "inherit" && n[`color${ke(t.color)}`], n[`fontSize${ke(t.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var t, r, o, i, s, c, l, u, d, p, f, b, y;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: n.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (t = e.transitions) == null || (r = t.create) == null ? void 0 : r.call(t, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((i = e.typography) == null || (s = i.pxToRem) == null ? void 0 : s.call(i, 20)) || "1.25rem",
      medium: ((c = e.typography) == null || (l = c.pxToRem) == null ? void 0 : l.call(c, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (d = u.pxToRem) == null ? void 0 : d.call(u, 35)) || "2.1875rem"
    }[n.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (p = (f = (e.vars || e).palette) == null || (f = f[n.color]) == null ? void 0 : f.main) != null ? p : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[n.color]
  };
}), Nt = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const r = Ue({
    props: n,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: c = "svg",
    fontSize: l = "medium",
    htmlColor: u,
    inheritViewBox: d = !1,
    titleAccess: p,
    viewBox: f = "0 0 24 24"
  } = r, b = ae(r, cl), y = /* @__PURE__ */ w.isValidElement(o) && o.type === "svg", m = k({}, r, {
    color: s,
    component: c,
    fontSize: l,
    instanceFontSize: n.fontSize,
    inheritViewBox: d,
    viewBox: f,
    hasSvgAsChild: y
  }), h = {};
  d || (h.viewBox = f);
  const T = ll(m);
  return /* @__PURE__ */ ye(ul, k({
    as: c,
    className: Ce(T.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: t
  }, h, b, y && o.props, {
    ownerState: m,
    children: [y ? o.props.children : o, p ? /* @__PURE__ */ O("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Nt.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: a.oneOfType([a.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), a.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: a.oneOfType([a.oneOf(["inherit", "large", "medium", "small"]), a.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: a.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: a.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: a.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: a.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: a.string
});
Nt.muiName = "SvgIcon";
const Cr = Nt;
function dl(e, n) {
  function t(r, o) {
    return /* @__PURE__ */ O(Cr, k({
      "data-testid": `${n}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (t.displayName = `${n}Icon`), t.muiName = Cr.muiName, /* @__PURE__ */ w.memo(/* @__PURE__ */ w.forwardRef(t));
}
const fl = dl(/* @__PURE__ */ O("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function $l({
  // menu: propsMenu, --- Just use "menu provider"???
  menuProvider: e,
  commandHandler: n,
  className: t,
  id: r,
  children: o
}) {
  const [i, s] = je(!1), [c, l] = je(!1), u = xn(() => {
    i && s(!1), l(!1);
  }, [i]), d = xn((h) => {
    h.stopPropagation(), s((T) => {
      const B = !T;
      return B && h.shiftKey ? l(!0) : B || l(!1), B;
    });
  }, []), p = it(void 0), [f, b] = je(0);
  Mn(() => {
    i && p.current && b(p.current.clientHeight);
  }, [i]);
  const y = xn(
    (h) => (u(), n(h)),
    [n, u]
  ), m = e == null ? void 0 : e(c);
  return /* @__PURE__ */ O("div", { ref: p, style: { position: "relative" }, children: /* @__PURE__ */ O(Mo, { position: "static", id: r, children: /* @__PURE__ */ ye(Ao, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    m ? /* @__PURE__ */ O(
      _r,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: d,
        children: /* @__PURE__ */ O(fl, {})
      }
    ) : void 0,
    o ? /* @__PURE__ */ O("div", { className: "papi-menu-children", children: o }) : void 0,
    m ? /* @__PURE__ */ O(
      Do,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: i,
        onClose: u,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: f
          }
        },
        children: /* @__PURE__ */ O(
          Qo,
          {
            className: t,
            commandHandler: y,
            multiColumnMenu: m
          }
        )
      }
    ) : void 0
  ] }) }) });
}
const Il = (e, n) => {
  Mn(() => {
    if (!e)
      return () => {
      };
    const t = e(n);
    return () => {
      t();
    };
  }, [e, n]);
};
function pl(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const hl = (e, n, t = {}) => {
  const r = it(n);
  r.current = n;
  const o = it(t);
  o.current = pl(o.current);
  const [i, s] = je(() => r.current), [c, l] = je(!0);
  return Mn(() => {
    let u = !0;
    return l(!!e), (async () => {
      if (e) {
        const d = await e();
        u && (s(() => d), l(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, c];
}, ot = () => !1, Ml = (e, n) => {
  const [t] = hl(
    xn(async () => {
      if (!e)
        return ot;
      const r = await Promise.resolve(e(n));
      return async () => r();
    }, [n, e]),
    ot,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Mn(() => () => {
    t !== ot && t();
  }, [t]);
};
function ml(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const t = document.head || document.querySelector("head"), r = t.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && r ? t.insertBefore(o, r) : t.appendChild(o);
}
ml(`.papi-button {
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
.papi-combo-box {
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
.papi-multi-column-menu {
  background-color: rgb(222, 222, 222);
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu-column {
  font-size: 11pt;
  font-weight: 600;
  padding-bottom: 2px;
}

.papi-menu-column ul {
  padding-top: 0;
}

.papi-menu-column-header {
  background-color: rgb(181, 181, 181);
  padding-left: 24px;
  margin-top: 0;
  margin-bottom: 0;
}

.papi-multi-column-menu.paratext {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-multi-column-menu.paratext.bright {
  color: rgb(76, 106, 76);
  background-color: rgb(214, 255, 152);
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-menu-item {
  background-color: transparent;
}

.papi-menu-icon-trailing {
  margin-left: 10px;
  place-content: flex-end;
}

.papi-menu-item img {
  max-width: 24px;
  max-height: 24px;
}
.papi-snackbar {
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
.papi-context-menu-target {
  white-space: nowrap;
}

.papi-context-menu-target * {
  white-space: normal;
}

.papi-context-menu-target:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07); /* Faint shadowy background */
}

.papi-context-menu-target.paratext:hover {
  box-shadow: 0 0 10px rgba(0, 100, 0, 0.07); /* Faint shadowy background */
}

.papi-context-menu-target.paratext.bright:hover {
  box-shadow: 0 0 10px rgba(173, 255, 47, 0.07); /* Faint shadowy background */
}

.papi-context-menu.paratext ul {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-context-menu.paratext.bright ul {
  color: rgb(76, 106, 76);
  background-color: rgb(214, 255, 152);
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
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
  }

@layer rdg.Cell {

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}
  }

@layer rdg.Cell {

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
  }

@layer rdg.FocusSink {
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
  }

@layer rdg.Cell {

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
  }

@layer rdg.SummaryRow {
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }

@layer rdg.SummaryRow {
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }

@layer rdg.SummaryRow {
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
`, "top");
export {
  qe as Button,
  kl as ChapterRangeSelector,
  Go as Checkbox,
  st as ComboBox,
  wl as ContextMenu,
  Qo as GridMenu,
  Sl as IconButton,
  Ze as LabelPosition,
  Ko as MenuItem,
  Ol as RefSelector,
  Cl as SearchBar,
  Pl as Slider,
  Rl as Snackbar,
  Nl as Switch,
  _l as Table,
  In as TextField,
  $l as Toolbar,
  Jo as TopLevelMenu,
  Il as useEvent,
  Ml as useEventAsync,
  hl as usePromise
};
//# sourceMappingURL=index.js.map
