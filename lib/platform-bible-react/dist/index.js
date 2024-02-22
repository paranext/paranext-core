import { jsx as O, jsxs as ye, Fragment as ht } from "react/jsx-runtime";
import { Button as xo, Autocomplete as To, TextField as Pr, FormControlLabel as At, FormLabel as ko, Checkbox as So, MenuItem as Rr, ListItemText as wo, ListItemIcon as Oo, Menu as Co, Grid as Nr, List as Po, IconButton as _r, Paper as Ro, Slider as No, Snackbar as _o, Switch as $o, AppBar as Mo, Toolbar as Io, Drawer as Ao } from "@mui/material";
import * as w from "react";
import en, { useMemo as mt, useState as je, useCallback as xn, useRef as it, useEffect as In } from "react";
import Do, { ThemeContext as Bo, internal_processStyles as jo } from "@mui/styled-engine";
import * as Lo from "react-dom";
import vn from "react-dom";
import { offsetBook as Dt, FIRST_SCR_BOOK_NUM as Fo, offsetChapter as Bt, FIRST_SCR_CHAPTER_NUM as Vo, getChaptersForBook as zo, offsetVerse as jt, FIRST_SCR_VERSE_NUM as Uo } from "platform-bible-utils";
import Ho, { SelectColumn as qo } from "react-data-grid";
function qe({
  id: e,
  isDisabled: n = !1,
  className: t,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ O(
    xo,
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
  onFocus: f,
  onBlur: p,
  getOptionLabel: y
}) {
  return /* @__PURE__ */ O(
    To,
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
      onFocus: f,
      onBlur: p,
      getOptionLabel: y,
      renderInput: (b) => /* @__PURE__ */ O(
        Pr,
        {
          ...b,
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
function Tl({
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
    So,
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
  let f;
  if (t) {
    const p = r === Ze.Before || r === Ze.Above, y = /* @__PURE__ */ O("span", { className: `papi-checkbox-label ${c ? "error" : ""} ${l ?? ""}`, children: t }), b = r === Ze.Before || r === Ze.After, g = b ? y : /* @__PURE__ */ O("div", { children: y }), h = b ? d : /* @__PURE__ */ O("div", { children: d });
    f = /* @__PURE__ */ ye(
      ko,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: c,
        children: [
          p && g,
          h,
          !p && g
        ]
      }
    );
  } else
    f = d;
  return f;
}
function Lt(e, n, t) {
  return e ? /* @__PURE__ */ O(Oo, { className: `papi-menu-icon-${t ? "leading" : "trailing"}`, children: /* @__PURE__ */ O("img", { src: e, alt: `${t ? "Leading" : "Trailing"} icon for ${n}` }) }) : void 0;
}
function Wo(e) {
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
    hasDivider: f = !1,
    focusVisibleClassName: p,
    id: y,
    children: b
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
      divider: f,
      focusVisibleClassName: p,
      onClick: n,
      id: y,
      children: t ? /* @__PURE__ */ ye(ht, { children: [
        Lt(o, t, !0),
        /* @__PURE__ */ O(wo, { primary: t, inset: !o && r }),
        Lt(i, t, !1)
      ] }) : b
    }
  );
}
function Ko(e) {
  const [n, t] = je(void 0), { parentMenuItem: r, menuDefinition: o } = e, i = (l) => {
    t(l.currentTarget);
  }, s = () => {
    t(void 0);
  }, c = () => {
    let d = Object.entries(o.groups).map(([f, p]) => ({ id: f, group: p })).filter((f) => "menuItem" in f.group);
    return r != null && r.id && (d = d.filter(
      (f) => "menuItem" in f && f.menuItem === r.id
    )), gt(e, d);
  };
  return /* @__PURE__ */ ye(ht, { children: [
    /* @__PURE__ */ O(Rr, { onClick: i, children: r.label }),
    /* @__PURE__ */ O(
      Co,
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
const Xo = (e, n) => {
  e === "platform.helpGroup" && console.log(`allItems: ${JSON.stringify(n)}`);
  const t = n.filter((o) => o.group === e);
  e === "platform.helpGroup" && console.log(`itemsForGroup: ${JSON.stringify(t)}`);
  const r = t.sort((o, i) => (o.order || 0) - (i.order || 0));
  return console.log(`sortedItems for group ${e}:\r
${JSON.stringify(r)}`), r;
};
function gt(e, n) {
  const { menuDefinition: t, onClick: r, commandHandler: o } = e, i = Object.values(n).sort(
    (f, p) => (f.group.order || 0) - (p.group.order || 0)
  ), s = [];
  i.forEach((f) => {
    Xo(f.id, t.items).forEach(
      (p) => s.push({ item: p, isLastItemInGroup: !1 })
    ), console.log(`Now have ${s.length} items for menu containing group ${f.id}`), s.length > 0 && (s[s.length - 1].isLastItemInGroup = !0);
  }), s.length > 0 && (s[s.length - 1].isLastItemInGroup = !1);
  const c = s == null ? void 0 : s.some((f) => "iconPathBefore" in f), l = ({ item: f, isLastItemInGroup: p }) => ({
    className: "papi-menu-item",
    label: f.label,
    iconPathBefore: "iconPathBefore" in f ? f.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in f ? f.iconPathAfter : void 0,
    hasDivider: p,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: c
  }), [u] = s;
  if (!u)
    return /* @__PURE__ */ O("div", {});
  const d = u.item.group;
  return console.log(`GroupedMenuItemList key: ${d}`), /* @__PURE__ */ O("div", { children: s.map((f, p) => {
    const { item: y } = f, b = l(f);
    if ("command" in y) {
      const g = y.group + p;
      return console.log(`MenuItem key: ${g}`), /* @__PURE__ */ O(
        Wo,
        {
          onClick: () => {
            r == null || r(), o(y);
          },
          ...b
        },
        g
      );
    }
    return /* @__PURE__ */ O(Ko, { parentMenuItem: y, ...e }, d + y.id);
  }) }, d);
}
function Yo(e) {
  const { menuDefinition: n, columnId: t } = e;
  let i = Object.entries(n.groups).map(([s, c]) => ({ id: s, group: c })).filter((s) => "column" in s.group);
  return t && "columns" in n && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  n.columns[t] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === t
  ), console.log(`included groups in column ${t}:
\r${JSON.stringify(i)}`)), gt(e, i);
}
function Jo({
  commandHandler: e,
  menuDefinition: n,
  id: t,
  metadata: r,
  onClick: o,
  className: i
  // className is now part of the destructured props object
}) {
  return /* @__PURE__ */ ye(Nr, { id: t, item: !0, xs: "auto", className: `papi-menu-column ${i ?? ""}`, children: [
    /* @__PURE__ */ O("h3", { className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
    /* @__PURE__ */ O(Po, { id: t, dense: !0, className: i ?? "", children: /* @__PURE__ */ O(
      Yo,
      {
        commandHandler: e,
        menuDefinition: n,
        columnId: t,
        onClick: o
      }
    ) })
  ] });
}
function Zo({
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
      id: r,
      children: s.map((c, l) => /* @__PURE__ */ O(
        Jo,
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
function kl({
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
function Qo(e) {
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
function ei() {
  if (Ft)
    return ne;
  Ft = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), b;
  b = Symbol.for("react.module.reference");
  function g(h) {
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
                case p:
                case f:
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
  return ne.ContextConsumer = s, ne.ContextProvider = i, ne.Element = e, ne.ForwardRef = l, ne.Fragment = t, ne.Lazy = p, ne.Memo = f, ne.Portal = n, ne.Profiler = o, ne.StrictMode = r, ne.Suspense = u, ne.SuspenseList = d, ne.isAsyncMode = function() {
    return !1;
  }, ne.isConcurrentMode = function() {
    return !1;
  }, ne.isContextConsumer = function(h) {
    return g(h) === s;
  }, ne.isContextProvider = function(h) {
    return g(h) === i;
  }, ne.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, ne.isForwardRef = function(h) {
    return g(h) === l;
  }, ne.isFragment = function(h) {
    return g(h) === t;
  }, ne.isLazy = function(h) {
    return g(h) === p;
  }, ne.isMemo = function(h) {
    return g(h) === f;
  }, ne.isPortal = function(h) {
    return g(h) === n;
  }, ne.isProfiler = function(h) {
    return g(h) === o;
  }, ne.isStrictMode = function(h) {
    return g(h) === r;
  }, ne.isSuspense = function(h) {
    return g(h) === u;
  }, ne.isSuspenseList = function(h) {
    return g(h) === d;
  }, ne.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === t || h === o || h === r || h === u || h === d || h === y || typeof h == "object" && h !== null && (h.$$typeof === p || h.$$typeof === f || h.$$typeof === i || h.$$typeof === s || h.$$typeof === l || h.$$typeof === b || h.getModuleId !== void 0);
  }, ne.typeOf = g, ne;
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
function ni() {
  return Vt || (Vt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), b = !1, g = !1, h = !1, T = !1, B = !1, E;
    E = Symbol.for("react.module.reference");
    function x(S) {
      return !!(typeof S == "string" || typeof S == "function" || S === t || S === o || B || S === r || S === u || S === d || T || S === y || b || g || h || typeof S == "object" && S !== null && (S.$$typeof === p || S.$$typeof === f || S.$$typeof === i || S.$$typeof === s || S.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      S.$$typeof === E || S.getModuleId !== void 0));
    }
    function m(S) {
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
                  case p:
                  case f:
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
    var I = s, _ = i, K = e, Z = l, R = t, W = p, q = f, ee = n, M = o, N = r, $ = u, j = d, ie = !1, Q = !1;
    function v(S) {
      return ie || (ie = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function P(S) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(S) {
      return m(S) === s;
    }
    function z(S) {
      return m(S) === i;
    }
    function D(S) {
      return typeof S == "object" && S !== null && S.$$typeof === e;
    }
    function V(S) {
      return m(S) === l;
    }
    function L(S) {
      return m(S) === t;
    }
    function F(S) {
      return m(S) === p;
    }
    function G(S) {
      return m(S) === f;
    }
    function X(S) {
      return m(S) === n;
    }
    function U(S) {
      return m(S) === o;
    }
    function de(S) {
      return m(S) === r;
    }
    function C(S) {
      return m(S) === u;
    }
    function H(S) {
      return m(S) === d;
    }
    te.ContextConsumer = I, te.ContextProvider = _, te.Element = K, te.ForwardRef = Z, te.Fragment = R, te.Lazy = W, te.Memo = q, te.Portal = ee, te.Profiler = M, te.StrictMode = N, te.Suspense = $, te.SuspenseList = j, te.isAsyncMode = v, te.isConcurrentMode = P, te.isContextConsumer = A, te.isContextProvider = z, te.isElement = D, te.isForwardRef = V, te.isFragment = L, te.isLazy = F, te.isMemo = G, te.isPortal = X, te.isProfiler = U, te.isStrictMode = de, te.isSuspense = C, te.isSuspenseList = H, te.isValidElementType = x, te.typeOf = m;
  }()), te;
}
process.env.NODE_ENV === "production" ? at.exports = ei() : at.exports = ni();
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
function ti() {
  if (zt)
    return re;
  zt = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, B = e ? Symbol.for("react.scope") : 60119;
  function E(m) {
    if (typeof m == "object" && m !== null) {
      var I = m.$$typeof;
      switch (I) {
        case n:
          switch (m = m.type, m) {
            case l:
            case u:
            case r:
            case i:
            case o:
            case f:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case c:
                case d:
                case b:
                case y:
                case s:
                  return m;
                default:
                  return I;
              }
          }
        case t:
          return I;
      }
    }
  }
  function x(m) {
    return E(m) === u;
  }
  return re.AsyncMode = l, re.ConcurrentMode = u, re.ContextConsumer = c, re.ContextProvider = s, re.Element = n, re.ForwardRef = d, re.Fragment = r, re.Lazy = b, re.Memo = y, re.Portal = t, re.Profiler = i, re.StrictMode = o, re.Suspense = f, re.isAsyncMode = function(m) {
    return x(m) || E(m) === l;
  }, re.isConcurrentMode = x, re.isContextConsumer = function(m) {
    return E(m) === c;
  }, re.isContextProvider = function(m) {
    return E(m) === s;
  }, re.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === n;
  }, re.isForwardRef = function(m) {
    return E(m) === d;
  }, re.isFragment = function(m) {
    return E(m) === r;
  }, re.isLazy = function(m) {
    return E(m) === b;
  }, re.isMemo = function(m) {
    return E(m) === y;
  }, re.isPortal = function(m) {
    return E(m) === t;
  }, re.isProfiler = function(m) {
    return E(m) === i;
  }, re.isStrictMode = function(m) {
    return E(m) === o;
  }, re.isSuspense = function(m) {
    return E(m) === f;
  }, re.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === r || m === u || m === i || m === o || m === f || m === p || typeof m == "object" && m !== null && (m.$$typeof === b || m.$$typeof === y || m.$$typeof === s || m.$$typeof === c || m.$$typeof === d || m.$$typeof === h || m.$$typeof === T || m.$$typeof === B || m.$$typeof === g);
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
function ri() {
  return Ut || (Ut = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, B = e ? Symbol.for("react.scope") : 60119;
    function E(C) {
      return typeof C == "string" || typeof C == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      C === r || C === u || C === i || C === o || C === f || C === p || typeof C == "object" && C !== null && (C.$$typeof === b || C.$$typeof === y || C.$$typeof === s || C.$$typeof === c || C.$$typeof === d || C.$$typeof === h || C.$$typeof === T || C.$$typeof === B || C.$$typeof === g);
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
              case f:
                return S;
              default:
                var fe = S && S.$$typeof;
                switch (fe) {
                  case c:
                  case d:
                  case b:
                  case y:
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
    var m = l, I = u, _ = c, K = s, Z = n, R = d, W = r, q = b, ee = y, M = t, N = i, $ = o, j = f, ie = !1;
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
      return x(C) === b;
    }
    function F(C) {
      return x(C) === y;
    }
    function G(C) {
      return x(C) === t;
    }
    function X(C) {
      return x(C) === i;
    }
    function U(C) {
      return x(C) === o;
    }
    function de(C) {
      return x(C) === f;
    }
    oe.AsyncMode = m, oe.ConcurrentMode = I, oe.ContextConsumer = _, oe.ContextProvider = K, oe.Element = Z, oe.ForwardRef = R, oe.Fragment = W, oe.Lazy = q, oe.Memo = ee, oe.Portal = M, oe.Profiler = N, oe.StrictMode = $, oe.Suspense = j, oe.isAsyncMode = Q, oe.isConcurrentMode = v, oe.isContextConsumer = P, oe.isContextProvider = A, oe.isElement = z, oe.isForwardRef = D, oe.isFragment = V, oe.isLazy = L, oe.isMemo = F, oe.isPortal = G, oe.isProfiler = X, oe.isStrictMode = U, oe.isSuspense = de, oe.isValidElementType = E, oe.typeOf = x;
  }()), oe;
}
var Ht;
function $r() {
  return Ht || (Ht = 1, process.env.NODE_ENV === "production" ? En.exports = ti() : En.exports = ri()), En.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Gn, qt;
function oi() {
  if (qt)
    return Gn;
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
  return Gn = o() ? Object.assign : function(i, s) {
    for (var c, l = r(i), u, d = 1; d < arguments.length; d++) {
      c = Object(arguments[d]);
      for (var f in c)
        n.call(c, f) && (l[f] = c[f]);
      if (e) {
        u = e(c);
        for (var p = 0; p < u.length; p++)
          t.call(c, u[p]) && (l[u[p]] = c[u[p]]);
      }
    }
    return l;
  }, Gn;
}
var Wn, Gt;
function bt() {
  if (Gt)
    return Wn;
  Gt = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Wn = e, Wn;
}
var Kn, Wt;
function Mr() {
  return Wt || (Wt = 1, Kn = Function.call.bind(Object.prototype.hasOwnProperty)), Kn;
}
var Xn, Kt;
function ii() {
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
          var f;
          try {
            if (typeof i[d] != "function") {
              var p = Error(
                (l || "React class") + ": " + c + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            f = i[d](s, d, l, c, null, n);
          } catch (b) {
            f = b;
          }
          if (f && !(f instanceof Error) && e(
            (l || "React class") + ": type specification of " + c + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in t)) {
            t[f.message] = !0;
            var y = u ? u() : "";
            e(
              "Failed " + c + " type: " + f.message + (y ?? "")
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
function si() {
  if (Xt)
    return Yn;
  Xt = 1;
  var e = $r(), n = oi(), t = bt(), r = Mr(), o = ii(), i = function() {
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
    function f(v) {
      var P = v && (u && v[u] || v[d]);
      if (typeof P == "function")
        return P;
    }
    var p = "<<anonymous>>", y = {
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
      elementType: m(),
      instanceOf: I,
      node: R(),
      objectOf: K,
      oneOf: _,
      oneOfType: Z,
      shape: q,
      exact: ee
    };
    function b(v, P) {
      return v === P ? v !== 0 || 1 / v === 1 / P : v !== v && P !== P;
    }
    function g(v, P) {
      this.message = v, this.data = P && typeof P == "object" ? P : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function h(v) {
      if (process.env.NODE_ENV !== "production")
        var P = {}, A = 0;
      function z(V, L, F, G, X, U, de) {
        if (G = G || p, U = U || F, de !== t) {
          if (l) {
            var C = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw C.name = "Invariant Violation", C;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var H = G + ":" + F;
            !P[H] && // Avoid spamming the console because they are often not actionable except for lib authors
            A < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + U + "` prop on `" + G + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), P[H] = !0, A++);
          }
        }
        return L[F] == null ? V ? L[F] === null ? new g("The " + X + " `" + U + "` is marked as required " + ("in `" + G + "`, but its value is `null`.")) : new g("The " + X + " `" + U + "` is marked as required in " + ("`" + G + "`, but its value is `undefined`.")) : null : v(L, F, G, X, U);
      }
      var D = z.bind(null, !1);
      return D.isRequired = z.bind(null, !0), D;
    }
    function T(v) {
      function P(A, z, D, V, L, F) {
        var G = A[z], X = $(G);
        if (X !== v) {
          var U = j(G);
          return new g(
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
          return new g("Property `" + L + "` of component `" + D + "` has invalid PropType notation inside arrayOf.");
        var F = A[z];
        if (!Array.isArray(F)) {
          var G = $(F);
          return new g("Invalid " + V + " `" + L + "` of type " + ("`" + G + "` supplied to `" + D + "`, expected an array."));
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
          return new g("Invalid " + D + " `" + V + "` of type " + ("`" + F + "` supplied to `" + z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(v);
    }
    function m() {
      function v(P, A, z, D, V) {
        var L = P[A];
        if (!e.isValidElementType(L)) {
          var F = $(L);
          return new g("Invalid " + D + " `" + V + "` of type " + ("`" + F + "` supplied to `" + z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(v);
    }
    function I(v) {
      function P(A, z, D, V, L) {
        if (!(A[z] instanceof v)) {
          var F = v.name || p, G = Q(A[z]);
          return new g("Invalid " + V + " `" + L + "` of type " + ("`" + G + "` supplied to `" + D + "`, expected ") + ("instance of `" + F + "`."));
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
        for (var F = A[z], G = 0; G < v.length; G++)
          if (b(F, v[G]))
            return null;
        var X = JSON.stringify(v, function(de, C) {
          var H = j(C);
          return H === "symbol" ? String(C) : C;
        });
        return new g("Invalid " + V + " `" + L + "` of value `" + String(F) + "` " + ("supplied to `" + D + "`, expected one of " + X + "."));
      }
      return h(P);
    }
    function K(v) {
      function P(A, z, D, V, L) {
        if (typeof v != "function")
          return new g("Property `" + L + "` of component `" + D + "` has invalid PropType notation inside objectOf.");
        var F = A[z], G = $(F);
        if (G !== "object")
          return new g("Invalid " + V + " `" + L + "` of type " + ("`" + G + "` supplied to `" + D + "`, expected an object."));
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
      function z(D, V, L, F, G) {
        for (var X = [], U = 0; U < v.length; U++) {
          var de = v[U], C = de(D, V, L, F, G, t);
          if (C == null)
            return null;
          C.data && r(C.data, "expectedType") && X.push(C.data.expectedType);
        }
        var H = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new g("Invalid " + F + " `" + G + "` supplied to " + ("`" + L + "`" + H + "."));
      }
      return h(z);
    }
    function R() {
      function v(P, A, z, D, V) {
        return M(P[A]) ? null : new g("Invalid " + D + " `" + V + "` supplied to " + ("`" + z + "`, expected a ReactNode."));
      }
      return h(v);
    }
    function W(v, P, A, z, D) {
      return new g(
        (v || "React class") + ": " + P + " type `" + A + "." + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + D + "`."
      );
    }
    function q(v) {
      function P(A, z, D, V, L) {
        var F = A[z], G = $(F);
        if (G !== "object")
          return new g("Invalid " + V + " `" + L + "` of type `" + G + "` " + ("supplied to `" + D + "`, expected `object`."));
        for (var X in v) {
          var U = v[X];
          if (typeof U != "function")
            return W(D, V, L, X, j(U));
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
        var F = A[z], G = $(F);
        if (G !== "object")
          return new g("Invalid " + V + " `" + L + "` of type `" + G + "` " + ("supplied to `" + D + "`, expected `object`."));
        var X = n({}, A[z], v);
        for (var U in X) {
          var de = v[U];
          if (r(v, U) && typeof de != "function")
            return W(D, V, L, U, j(de));
          if (!de)
            return new g(
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
    function M(v) {
      switch (typeof v) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !v;
        case "object":
          if (Array.isArray(v))
            return v.every(M);
          if (v === null || c(v))
            return !0;
          var P = f(v);
          if (P) {
            var A = P.call(v), z;
            if (P !== v.entries) {
              for (; !(z = A.next()).done; )
                if (!M(z.value))
                  return !1;
            } else
              for (; !(z = A.next()).done; ) {
                var D = z.value;
                if (D && !M(D[1]))
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
      return !v.constructor || !v.constructor.name ? p : v.constructor.name;
    }
    return y.checkPropTypes = o, y.resetWarningCache = o.resetWarningCache, y.PropTypes = y, y;
  }, Yn;
}
var Jn, Yt;
function ai() {
  if (Yt)
    return Jn;
  Yt = 1;
  var e = bt();
  function n() {
  }
  function t() {
  }
  return t.resetWarningCache = n, Jn = function() {
    function r(s, c, l, u, d, f) {
      if (f !== e) {
        var p = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw p.name = "Invariant Violation", p;
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
  var ci = $r(), li = !0;
  ct.exports = si()(ci.isElement, li);
} else
  ct.exports = ai()();
var ui = ct.exports;
const a = /* @__PURE__ */ Qo(ui);
function Ir(e) {
  var n, t, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (n = 0; n < o; n++)
        e[n] && (t = Ir(e[n])) && (r && (r += " "), r += t);
    } else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function Ce() {
  for (var e, n, t = 0, r = "", o = arguments.length; t < o; t++)
    (e = arguments[t]) && (n = Ir(e)) && (r && (r += " "), r += n);
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
function Ar(e) {
  if (!$e(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((t) => {
    n[t] = Ar(e[t]);
  }), n;
}
function xe(e, n, t = {
  clone: !0
}) {
  const r = t.clone ? k({}, e) : e;
  return $e(e) && $e(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && ($e(n[o]) && o in e && $e(e[o]) ? r[o] = xe(e[o], n[o], t) : t.clone ? r[o] = $e(n[o]) ? Ar(n[o]) : n[o] : r[o] = n[o]);
  }), r;
}
function di(e) {
  const {
    prototype: n = {}
  } = e;
  return !!n.isReactComponent;
}
function Dr(e, n, t, r, o) {
  const i = e[n], s = o || n;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  const l = i.type;
  return typeof l == "function" && !di(l) && (c = "Did you accidentally use a plain function component for an element instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Br = gn(a.element, Dr);
Br.isRequired = gn(a.element.isRequired, Dr);
const An = Br;
function fi(e) {
  const {
    prototype: n = {}
  } = e;
  return !!n.isReactComponent;
}
function pi(e, n, t, r, o) {
  const i = e[n], s = o || n;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  return typeof i == "function" && !fi(i) && (c = "Did you accidentally provide a plain function component instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${t}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const hi = gn(a.elementType, pi), mi = "exact-prop: ​";
function jr(e) {
  return process.env.NODE_ENV === "production" ? e : k({}, e, {
    [mi]: (n) => {
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
const gi = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function bi(e) {
  const n = `${e}`.match(gi);
  return n && n[1] || "";
}
function Lr(e, n = "") {
  return e.displayName || e.name || bi(e) || n;
}
function Jt(e, n, t) {
  const r = Lr(n);
  return e.displayName || (r !== "" ? `${t}(${r})` : t);
}
function yi(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Lr(e, "Component");
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
const vi = a.oneOfType([a.func, a.object]), Ei = vi;
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
function xi(e, n = 166) {
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
const Ti = typeof window < "u" ? w.useLayoutEffect : w.useEffect, On = Ti;
function Qt(e) {
  const n = w.useRef(e);
  return On(() => {
    n.current = e;
  }), w.useRef((...t) => (
    // @ts-expect-error hide `this`
    (0, n.current)(...t)
  )).current;
}
function Me(...e) {
  return w.useMemo(() => e.every((n) => n == null) ? null : (n) => {
    e.forEach((t) => {
      lt(t, n);
    });
  }, e);
}
function Fr(e) {
  const n = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - n);
}
function ki(e) {
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
function Si(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const wi = Number.isInteger || Si;
function Vr(e, n, t, r) {
  const o = e[n];
  if (o == null || !wi(o)) {
    const i = ki(o);
    return new RangeError(`Invalid ${r} \`${n}\` of type \`${i}\` supplied to \`${t}\`, expected \`integer\`.`);
  }
  return null;
}
function zr(e, n, ...t) {
  return e[n] === void 0 ? null : Vr(e, n, ...t);
}
function ut() {
  return null;
}
zr.isRequired = Vr;
ut.isRequired = ut;
const Ur = process.env.NODE_ENV === "production" ? ut : zr;
function Hr(e, n) {
  const t = k({}, n);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      t[r] = k({}, e[r], t[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = n[r];
      t[r] = {}, !i || !Object.keys(i) ? t[r] = o : !o || !Object.keys(o) ? t[r] = i : (t[r] = k({}, i), Object.keys(o).forEach((s) => {
        t[r][s] = Hr(o[s], i[s]);
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
const er = (e) => e, Oi = () => {
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
}, Ci = Oi(), Pi = Ci, Ri = {
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
  const r = Ri[n];
  return r ? `${t}-${r}` : `${Pi.generate(e)}-${n}`;
}
function ze(e, n, t = "Mui") {
  const r = {};
  return n.forEach((o) => {
    r[o] = Re(e, o, t);
  }), r;
}
function Ni(e, n = Number.MIN_SAFE_INTEGER, t = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, t));
}
function qr(e) {
  return typeof e == "string";
}
function _i(e, n, t) {
  return e === void 0 || qr(e) ? n : k({}, n, {
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
function $i(e, n, t) {
  return typeof e == "function" ? e(n, t) : e;
}
function Wr(e) {
  var n, t, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (n = 0; n < o; n++)
        e[n] && (t = Wr(e[n])) && (r && (r += " "), r += t);
    } else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function nr() {
  for (var e, n, t = 0, r = "", o = arguments.length; t < o; t++)
    (e = arguments[t]) && (n = Wr(e)) && (r && (r += " "), r += n);
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
    const y = nr(t == null ? void 0 : t.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), b = k({}, t == null ? void 0 : t.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = k({}, t, o, r);
    return y.length > 0 && (g.className = y), Object.keys(b).length > 0 && (g.style = b), {
      props: g,
      internalRef: void 0
    };
  }
  const s = Gr(k({}, o, r)), c = tr(r), l = tr(o), u = n(s), d = nr(u == null ? void 0 : u.className, t == null ? void 0 : t.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = k({}, u == null ? void 0 : u.style, t == null ? void 0 : t.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), p = k({}, u, t, l, c);
  return d.length > 0 && (p.className = d), Object.keys(f).length > 0 && (p.style = f), {
    props: p,
    internalRef: u.ref
  };
}
const Ii = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function rn(e) {
  var n;
  const {
    elementType: t,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = ae(e, Ii), c = i ? {} : $i(r, o), {
    props: l,
    internalRef: u
  } = Mi(k({}, s, {
    externalSlotProps: c
  })), d = Me(u, c == null ? void 0 : c.ref, (n = e.additionalProps) == null ? void 0 : n.ref);
  return _i(t, k({}, l, {
    ref: d
  }), o);
}
const Ai = ["values", "unit", "step"], Di = (e) => {
  const n = Object.keys(e).map((t) => ({
    key: t,
    val: e[t]
  })) || [];
  return n.sort((t, r) => t.val - r.val), n.reduce((t, r) => k({}, t, {
    [r.key]: r.val
  }), {});
};
function Bi(e) {
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
  } = e, o = ae(e, Ai), i = Di(n), s = Object.keys(i);
  function c(p) {
    return `@media (min-width:${typeof n[p] == "number" ? n[p] : p}${t})`;
  }
  function l(p) {
    return `@media (max-width:${(typeof n[p] == "number" ? n[p] : p) - r / 100}${t})`;
  }
  function u(p, y) {
    const b = s.indexOf(y);
    return `@media (min-width:${typeof n[p] == "number" ? n[p] : p}${t}) and (max-width:${(b !== -1 && typeof n[s[b]] == "number" ? n[s[b]] : y) - r / 100}${t})`;
  }
  function d(p) {
    return s.indexOf(p) + 1 < s.length ? u(p, s[s.indexOf(p) + 1]) : c(p);
  }
  function f(p) {
    const y = s.indexOf(p);
    return y === 0 ? c(s[1]) : y === s.length - 1 ? l(s[y]) : u(p, s[s.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return k({
    keys: s,
    values: i,
    up: c,
    down: l,
    between: u,
    only: d,
    not: f,
    unit: t
  }, o);
}
const ji = {
  borderRadius: 4
}, Li = ji, Fi = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, Ie = Fi;
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
function Vi(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function zi(e, n) {
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
    return Pe(s, c, (f) => {
      let p = Cn(u, o, f);
      return f === p && typeof f == "string" && (p = Cn(u, o, `${n}${f === "default" ? "" : ke(f)}`, f)), t === !1 ? p : {
        [t]: p
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: Ie
  } : {}, i.filterProps = [n], i;
}
function Ui(e) {
  const n = {};
  return (t) => (n[t] === void 0 && (n[t] = e(t)), n[t]);
}
const Hi = {
  m: "margin",
  p: "padding"
}, qi = {
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
}, Gi = Ui((e) => {
  if (e.length > 2)
    if (or[e])
      e = or[e];
    else
      return [e];
  const [n, t] = e.split(""), r = Hi[n], o = qi[t] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Bn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], jn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Wi = [...Bn, ...jn];
function bn(e, n, t, r) {
  var o;
  const i = (o = Dn(e, n, !1)) != null ? o : t;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Kr(e) {
  return bn(e, "spacing", 8, "spacing");
}
function yn(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const t = Math.abs(n), r = e(t);
  return n >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Ki(e, n) {
  return (t) => e.reduce((r, o) => (r[o] = yn(n, t), r), {});
}
function Xi(e, n, t, r) {
  if (n.indexOf(t) === -1)
    return null;
  const o = Gi(t), i = Ki(o, r), s = e[t];
  return Pe(e, s, i);
}
function Xr(e, n) {
  const t = Kr(e.theme);
  return Object.keys(e).map((r) => Xi(e, n, r, t)).reduce(dn, {});
}
function ce(e) {
  return Xr(e, Bn);
}
ce.propTypes = process.env.NODE_ENV !== "production" ? Bn.reduce((e, n) => (e[n] = Ie, e), {}) : {};
ce.filterProps = Bn;
function le(e) {
  return Xr(e, jn);
}
le.propTypes = process.env.NODE_ENV !== "production" ? jn.reduce((e, n) => (e[n] = Ie, e), {}) : {};
le.filterProps = jn;
process.env.NODE_ENV !== "production" && Wi.reduce((e, n) => (e[n] = Ie, e), {});
function Yi(e = 8) {
  if (e.mui)
    return e;
  const n = Kr({
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
const Ji = ve("border", me), Zi = ve("borderTop", me), Qi = ve("borderRight", me), es = ve("borderBottom", me), ns = ve("borderLeft", me), ts = ve("borderColor"), rs = ve("borderTopColor"), os = ve("borderRightColor"), is = ve("borderBottomColor"), ss = ve("borderLeftColor"), as = ve("outline", me), cs = ve("outlineColor"), Fn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = bn(e.theme, "shape.borderRadius", 4, "borderRadius"), t = (r) => ({
      borderRadius: yn(n, r)
    });
    return Pe(e, e.borderRadius, t);
  }
  return null;
};
Fn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Ie
} : {};
Fn.filterProps = ["borderRadius"];
Ln(Ji, Zi, Qi, es, ns, ts, rs, os, is, ss, Fn, as, cs);
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
  gap: Ie
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
  columnGap: Ie
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
  rowGap: Ie
} : {};
Un.filterProps = ["rowGap"];
const ls = ue({
  prop: "gridColumn"
}), us = ue({
  prop: "gridRow"
}), ds = ue({
  prop: "gridAutoFlow"
}), fs = ue({
  prop: "gridAutoColumns"
}), ps = ue({
  prop: "gridAutoRows"
}), hs = ue({
  prop: "gridTemplateColumns"
}), ms = ue({
  prop: "gridTemplateRows"
}), gs = ue({
  prop: "gridTemplateAreas"
}), bs = ue({
  prop: "gridArea"
});
Ln(Vn, zn, Un, ls, us, ds, fs, ps, hs, ms, gs, bs);
function nn(e, n) {
  return n === "grey" ? n : e;
}
const ys = ue({
  prop: "color",
  themeKey: "palette",
  transform: nn
}), vs = ue({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: nn
}), Es = ue({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: nn
});
Ln(ys, vs, Es);
function pe(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const xs = ue({
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
const Ts = ue({
  prop: "minWidth",
  transform: pe
}), ks = ue({
  prop: "height",
  transform: pe
}), Ss = ue({
  prop: "maxHeight",
  transform: pe
}), ws = ue({
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
const Os = ue({
  prop: "boxSizing"
});
Ln(xs, vt, Ts, ks, Ss, ws, Os);
const Cs = {
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
}, Et = Cs;
function Ps(...e) {
  const n = e.reduce((r, o) => r.concat(Object.keys(o)), []), t = new Set(n);
  return e.every((r) => t.size === Object.keys(r).length);
}
function Rs(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Ns() {
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
      style: f
    } = c;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [t]: r
      };
    const p = Dn(o, u) || {};
    return f ? f(s) : Pe(s, r, (b) => {
      let g = Cn(p, d, b);
      return b === g && typeof b == "string" && (g = Cn(p, d, `${t}${b === "default" ? "" : ke(b)}`, b)), l === !1 ? g : {
        [l]: g
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
      const d = Vi(i.breakpoints), f = Object.keys(d);
      let p = d;
      return Object.keys(u).forEach((y) => {
        const b = Rs(u[y], i);
        if (b != null)
          if (typeof b == "object")
            if (s[y])
              p = dn(p, e(y, b, i, s));
            else {
              const g = Pe({
                theme: i
              }, b, (h) => ({
                [y]: h
              }));
              Ps(g, b) ? p[y] = n({
                sx: b,
                theme: i
              }) : p = dn(p, g);
            }
          else
            p = dn(p, e(y, b, i, s));
      }), zi(f, p);
    }
    return Array.isArray(o) ? o.map(c) : c(o);
  }
  return n;
}
const Yr = Ns();
Yr.filterProps = ["sx"];
const xt = Yr, _s = ["breakpoints", "palette", "spacing", "shape"];
function Tt(e = {}, ...n) {
  const {
    breakpoints: t = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = ae(e, _s), c = Bi(t), l = Yi(o);
  let u = xe({
    breakpoints: c,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: k({
      mode: "light"
    }, r),
    spacing: l,
    shape: k({}, Li, i)
  }, s);
  return u = n.reduce((d, f) => xe(d, f), u), u.unstable_sxConfig = k({}, Et, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return xt({
      sx: f,
      theme: this
    });
  }, u;
}
function $s(e) {
  return Object.keys(e).length === 0;
}
function Ms(e = null) {
  const n = w.useContext(Bo);
  return !n || $s(n) ? e : n;
}
const Is = Tt();
function Jr(e = Is) {
  return Ms(e);
}
const As = ["variant"];
function ir(e) {
  return e.length === 0;
}
function Zr(e) {
  const {
    variant: n
  } = e, t = ae(e, As);
  let r = n || "";
  return Object.keys(t).sort().forEach((o) => {
    o === "color" ? r += ir(r) ? e[o] : ke(e[o]) : r += `${ir(r) ? o : ke(o)}${ke(e[o].toString())}`;
  }), r;
}
const Ds = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Bs(e) {
  return Object.keys(e).length === 0;
}
function js(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const Ls = (e, n) => n.components && n.components[e] && n.components[e].styleOverrides ? n.components[e].styleOverrides : null, Pn = (e) => {
  let n = 0;
  const t = {};
  return e && e.forEach((r) => {
    let o = "";
    typeof r.props == "function" ? (o = `callback${n}`, n += 1) : o = Zr(r.props), t[o] = r.style;
  }), t;
}, Fs = (e, n) => {
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
    c && (typeof s.props == "function" ? o.push(n[`callback${i}`]) : o.push(n[Zr(s.props)])), typeof s.props == "function" && (i += 1);
  }), o;
}, Vs = (e, n, t, r) => {
  var o;
  const i = t == null || (o = t.components) == null || (o = o[r]) == null ? void 0 : o.variants;
  return Rn(e, n, i);
};
function Tn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const zs = Tt(), sr = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function kn({
  defaultTheme: e,
  theme: n,
  themeId: t
}) {
  return Bs(n) ? e : n[t] || n;
}
function Us(e) {
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
function Hs(e = {}) {
  const {
    themeId: n,
    defaultTheme: t = zs,
    rootShouldForwardProp: r = Tn,
    slotShouldForwardProp: o = Tn
  } = e, i = (s) => xt(k({}, s, {
    theme: kn(k({}, s, {
      defaultTheme: t,
      themeId: n
    }))
  }));
  return i.__mui_systemSx = !0, (s, c = {}) => {
    jo(s, (x) => x.filter((m) => !(m != null && m.__mui_systemSx)));
    const {
      name: l,
      slot: u,
      skipVariantsResolver: d,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = Us(sr(u))
    } = c, y = ae(c, Ds), b = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), g = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && l && (h = `${l}-${sr(u || "Root")}`);
    let T = Tn;
    u === "Root" || u === "root" ? T = r : u ? T = o : js(s) && (T = void 0);
    const B = Do(s, k({
      shouldForwardProp: T,
      label: h
    }, y)), E = (x, ...m) => {
      const I = m ? m.map((R) => {
        if (typeof R == "function" && R.__emotion_real !== R)
          return (W) => ar({
            styledArg: R,
            props: W,
            defaultTheme: t,
            themeId: n
          });
        if ($e(R)) {
          let W = R, q;
          return R && R.variants && (q = R.variants, delete W.variants, W = (ee) => {
            let M = R;
            return Rn(ee, Pn(q), q).forEach(($) => {
              M = xe(M, $);
            }), M;
          }), W;
        }
        return R;
      }) : [];
      let _ = x;
      if ($e(x)) {
        let R;
        x && x.variants && (R = x.variants, delete _.variants, _ = (W) => {
          let q = x;
          return Rn(W, Pn(R), R).forEach((M) => {
            q = xe(q, M);
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
      l && p && I.push((R) => {
        const W = kn(k({}, R, {
          defaultTheme: t,
          themeId: n
        })), q = Ls(l, W);
        if (q) {
          const ee = {};
          return Object.entries(q).forEach(([M, N]) => {
            ee[M] = typeof N == "function" ? N(k({}, R, {
              theme: W
            })) : N;
          }), p(R, ee);
        }
        return null;
      }), l && !b && I.push((R) => {
        const W = kn(k({}, R, {
          defaultTheme: t,
          themeId: n
        }));
        return Vs(R, Fs(l, W), W, l);
      }), g || I.push(i);
      const K = I.length - m.length;
      if (Array.isArray(x) && K > 0) {
        const R = new Array(K).fill("");
        _ = [...x, ...R], _.raw = [...x.raw, ...R];
      }
      const Z = B(_, ...I);
      if (process.env.NODE_ENV !== "production") {
        let R;
        l && (R = `${l}${ke(u || "")}`), R === void 0 && (R = `Styled(${yi(s)})`), Z.displayName = R;
      }
      return s.muiName && (Z.muiName = s.muiName), Z;
    };
    return B.withConfig && (E.withConfig = B.withConfig), E;
  };
}
function qs(e) {
  const {
    theme: n,
    name: t,
    props: r
  } = e;
  return !n || !n.components || !n.components[t] || !n.components[t].defaultProps ? r : Hr(n.components[t].defaultProps, r);
}
function Gs({
  props: e,
  name: n,
  defaultTheme: t,
  themeId: r
}) {
  let o = Jr(t);
  return r && (o = o[r] || o), qs({
    theme: o,
    name: n,
    props: e
  });
}
function kt(e, n = 0, t = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > t) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${t}].`), Ni(e, n, t);
}
function Ws(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let t = e.match(n);
  return t && t[0].length === 1 && (t = t.map((r) => r + r)), t ? `rgb${t.length === 4 ? "a" : ""}(${t.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Le(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Le(Ws(e));
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
function Ks(e) {
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
  let n = e.type === "hsl" || e.type === "hsla" ? Le(Ks(e)).values : e.values;
  return n = n.map((t) => (e.type !== "color" && (t /= 255), t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function lr(e, n) {
  const t = cr(e), r = cr(n);
  return (Math.max(t, r) + 0.05) / (Math.min(t, r) + 0.05);
}
function ur(e, n) {
  return e = Le(e), n = kt(n), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${n}` : e.values[3] = n, Hn(e);
}
function Xs(e, n) {
  if (e = Le(e), n = kt(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] *= 1 - n;
  return Hn(e);
}
function Ys(e, n) {
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
function Js(e, n) {
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
const Zs = {
  black: "#000",
  white: "#fff"
}, mn = Zs, Qs = {
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
}, ea = Qs, na = {
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
}, Ge = na, ta = {
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
}, We = ta, ra = {
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
}, an = ra, oa = {
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
}, Ke = oa, ia = {
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
}, Xe = ia, sa = {
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
}, Ye = sa, aa = ["mode", "contrastThreshold", "tonalOffset"], dr = {
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
  e[n] || (e.hasOwnProperty(t) ? e[n] = e[t] : n === "light" ? e.light = Ys(e.main, o) : n === "dark" && (e.dark = Xs(e.main, i)));
}
function ca(e = "light") {
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
function la(e = "light") {
  return e === "dark" ? {
    main: Ge[200],
    light: Ge[50],
    dark: Ge[400]
  } : {
    main: Ge[500],
    light: Ge[300],
    dark: Ge[700]
  };
}
function ua(e = "light") {
  return e === "dark" ? {
    main: We[500],
    light: We[300],
    dark: We[700]
  } : {
    main: We[700],
    light: We[400],
    dark: We[800]
  };
}
function da(e = "light") {
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
function fa(e = "light") {
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
function pa(e = "light") {
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
function ha(e) {
  const {
    mode: n = "light",
    contrastThreshold: t = 3,
    tonalOffset: r = 0.2
  } = e, o = ae(e, aa), i = e.primary || ca(n), s = e.secondary || la(n), c = e.error || ua(n), l = e.info || da(n), u = e.success || fa(n), d = e.warning || pa(n);
  function f(g) {
    const h = lr(g, Zn.text.primary) >= t ? Zn.text.primary : dr.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const T = lr(g, h);
      T < 3 && console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const p = ({
    color: g,
    name: h,
    mainShade: T = 500,
    lightShade: B = 300,
    darkShade: E = 700
  }) => {
    if (g = k({}, g), !g.main && g[T] && (g.main = g[T]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.` : tn(11, h ? ` (${h})` : "", T));
    if (typeof g.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : tn(12, h ? ` (${h})` : "", JSON.stringify(g.main)));
    return fr(g, "light", B, r), fr(g, "dark", E, r), g.contrastText || (g.contrastText = f(g.main)), g;
  }, y = {
    dark: Zn,
    light: dr
  };
  return process.env.NODE_ENV !== "production" && (y[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), xe(k({
    // A collection of common colors.
    common: k({}, mn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: n,
    // The colors used to represent primary interface elements for a user.
    primary: p({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: p({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: p({
      color: c,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: p({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: p({
      color: l,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: p({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: ea,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: t,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, y[n]), o);
}
const ma = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function ga(e) {
  return Math.round(e * 1e5) / 1e5;
}
const pr = {
  textTransform: "uppercase"
}, hr = '"Roboto", "Helvetica", "Arial", sans-serif';
function ba(e, n) {
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
    pxToRem: f
  } = t, p = ae(t, ma);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const y = o / 14, b = f || ((T) => `${T / u * y}rem`), g = (T, B, E, x, m) => k({
    fontFamily: r,
    fontWeight: T,
    fontSize: b(B),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: E
  }, r === hr ? {
    letterSpacing: `${ga(x / B)}em`
  } : {}, m, d), h = {
    h1: g(i, 96, 1.167, -1.5),
    h2: g(i, 60, 1.2, -0.5),
    h3: g(s, 48, 1.167, 0),
    h4: g(s, 34, 1.235, 0.25),
    h5: g(s, 24, 1.334, 0),
    h6: g(c, 20, 1.6, 0.15),
    subtitle1: g(s, 16, 1.75, 0.15),
    subtitle2: g(c, 14, 1.57, 0.1),
    body1: g(s, 16, 1.5, 0.15),
    body2: g(s, 14, 1.43, 0.15),
    button: g(c, 14, 1.75, 0.4, pr),
    caption: g(s, 12, 1.66, 0.4),
    overline: g(s, 12, 2.66, 1, pr),
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
    pxToRem: b,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: c,
    fontWeightBold: l
  }, h), p, {
    clone: !1
    // No need to clone deep
  });
}
const ya = 0.2, va = 0.14, Ea = 0.12;
function se(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ya})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${va})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ea})`].join(",");
}
const xa = ["none", se(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), se(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), se(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), se(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), se(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), se(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), se(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), se(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), se(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), se(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), se(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), se(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), se(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), se(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), se(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), se(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), se(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), se(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), se(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), se(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), se(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), se(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), se(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), se(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ta = xa, ka = ["duration", "easing", "delay"], Sa = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, wa = {
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
function Oa(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function Ca(e) {
  const n = k({}, Sa, e.easing), t = k({}, wa, e.duration);
  return k({
    getAutoHeightDuration: Oa,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = t.standard,
        easing: c = n.easeInOut,
        delay: l = 0
      } = i, u = ae(i, ka);
      if (process.env.NODE_ENV !== "production") {
        const d = (p) => typeof p == "string", f = (p) => !isNaN(parseFloat(p));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(c) || console.error('MUI: Argument "easing" must be a string.'), !f(l) && !d(l) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : mr(s)} ${c} ${typeof l == "string" ? l : mr(l)}`).join(",");
    }
  }, e, {
    easing: n,
    duration: t
  });
}
const Pa = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Ra = Pa, Na = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function _a(e = {}, ...n) {
  const {
    mixins: t = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = ae(e, Na);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : tn(18));
  const c = ha(r), l = Tt(e);
  let u = xe(l, {
    mixins: Js(l.breakpoints, t),
    palette: c,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ta.slice(),
    typography: ba(c, i),
    transitions: Ca(o),
    zIndex: k({}, Ra),
    applyDarkStyles(d) {
      return this.vars ? {
        [this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/, ":where($1)")]: d
      } : this.palette.mode === "dark" ? d : {};
    }
  });
  if (u = xe(u, s), u = n.reduce((d, f) => xe(d, f), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (p, y) => {
      let b;
      for (b in p) {
        const g = p[b];
        if (d.indexOf(b) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = Re("", b);
            console.error([`MUI: The \`${y}\` component increases the CSS specificity of the \`${b}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: g
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[b] = {};
        }
      }
    };
    Object.keys(u.components).forEach((p) => {
      const y = u.components[p].styleOverrides;
      y && p.indexOf("Mui") === 0 && f(y, p);
    });
  }
  return u.unstable_sxConfig = k({}, Et, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return xt({
      sx: f,
      theme: this
    });
  }, u;
}
const $a = _a(), St = $a, wt = "$$material", Qr = (e) => Tn(e) && e !== "classes", Ma = Hs({
  themeId: wt,
  defaultTheme: St,
  rootShouldForwardProp: Qr
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
const eo = /* @__PURE__ */ w.createContext({});
process.env.NODE_ENV !== "production" && (eo.displayName = "ListContext");
const Ia = eo;
function Aa(e) {
  return Re("MuiList", e);
}
ze("MuiList", ["root", "padding", "dense", "subheader"]);
const Da = ["children", "className", "component", "dense", "disablePadding", "subheader"], Ba = (e) => {
  const {
    classes: n,
    disablePadding: t,
    dense: r,
    subheader: o
  } = e;
  return Ve({
    root: ["root", !t && "padding", r && "dense", o && "subheader"]
  }, Aa, n);
}, ja = Te("ul", {
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
})), no = /* @__PURE__ */ w.forwardRef(function(n, t) {
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
  } = r, d = ae(r, Da), f = w.useMemo(() => ({
    dense: c
  }), [c]), p = k({}, r, {
    component: s,
    dense: c,
    disablePadding: l
  }), y = Ba(p);
  return /* @__PURE__ */ O(Ia.Provider, {
    value: f,
    children: /* @__PURE__ */ ye(ja, k({
      as: s,
      className: Ce(y.root, i),
      ref: t,
      ownerState: p
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (no.propTypes = {
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
const La = no, Fa = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Qn(e, n, t) {
  return e === n ? e.firstChild : n && n.nextElementSibling ? n.nextElementSibling : t ? null : e.firstChild;
}
function gr(e, n, t) {
  return e === n ? t ? e.firstChild : e.lastChild : n && n.previousElementSibling ? n.previousElementSibling : t ? null : e.lastChild;
}
function to(e, n) {
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
    if (!c.hasAttribute("tabindex") || !to(c, i) || l)
      c = o(e, c, t);
    else
      return c.focus(), !0;
  }
  return !1;
}
const ro = /* @__PURE__ */ w.forwardRef(function(n, t) {
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
    variant: f = "selectedMenu"
  } = n, p = ae(n, Fa), y = w.useRef(null), b = w.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  On(() => {
    o && y.current.focus();
  }, [o]), w.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (E, x) => {
      const m = !y.current.style.width;
      if (E.clientHeight < y.current.clientHeight && m) {
        const I = `${Fr(be(E))}px`;
        y.current.style[x.direction === "rtl" ? "paddingLeft" : "paddingRight"] = I, y.current.style.width = `calc(100% + ${I})`;
      }
      return y.current;
    }
  }), []);
  const g = (E) => {
    const x = y.current, m = E.key, I = be(x).activeElement;
    if (m === "ArrowDown")
      E.preventDefault(), cn(x, I, u, l, Qn);
    else if (m === "ArrowUp")
      E.preventDefault(), cn(x, I, u, l, gr);
    else if (m === "Home")
      E.preventDefault(), cn(x, null, u, l, Qn);
    else if (m === "End")
      E.preventDefault(), cn(x, null, u, l, gr);
    else if (m.length === 1) {
      const _ = b.current, K = m.toLowerCase(), Z = performance.now();
      _.keys.length > 0 && (Z - _.lastTime > 500 ? (_.keys = [], _.repeating = !0, _.previousKeyMatched = !0) : _.repeating && K !== _.keys[0] && (_.repeating = !1)), _.lastTime = Z, _.keys.push(K);
      const R = I && !_.repeating && to(I, _);
      _.previousKeyMatched && (R || cn(x, I, !1, l, Qn, _)) ? E.preventDefault() : _.previousKeyMatched = !1;
    }
    d && d(E);
  }, h = Me(y, t);
  let T = -1;
  w.Children.forEach(s, (E, x) => {
    if (!/* @__PURE__ */ w.isValidElement(E)) {
      T === x && (T += 1, T >= s.length && (T = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && wn.isFragment(E) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), E.props.disabled || (f === "selectedMenu" && E.props.selected || T === -1) && (T = x), T === x && (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) && (T += 1, T >= s.length && (T = -1));
  });
  const B = w.Children.map(s, (E, x) => {
    if (x === T) {
      const m = {};
      return i && (m.autoFocus = !0), E.props.tabIndex === void 0 && f === "selectedMenu" && (m.tabIndex = 0), /* @__PURE__ */ w.cloneElement(E, m);
    }
    return E;
  });
  return /* @__PURE__ */ O(La, k({
    role: "menu",
    ref: h,
    className: c,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, p, {
    children: B
  }));
});
process.env.NODE_ENV !== "production" && (ro.propTypes = {
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
const Va = ro, za = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Ua(e) {
  const n = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(n) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : n;
}
function Ha(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const n = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let t = n(`[name="${e.name}"]:checked`);
  return t || (t = n(`[name="${e.name}"]`)), t !== e;
}
function qa(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Ha(e));
}
function Ga(e) {
  const n = [], t = [];
  return Array.from(e.querySelectorAll(za)).forEach((r, o) => {
    const i = Ua(r);
    i === -1 || !qa(r) || (i === 0 ? n.push(r) : t.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), t.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(n);
}
function Wa() {
  return !0;
}
function Nn(e) {
  const {
    children: n,
    disableAutoFocus: t = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Ga,
    isEnabled: s = Wa,
    open: c
  } = e, l = w.useRef(!1), u = w.useRef(null), d = w.useRef(null), f = w.useRef(null), p = w.useRef(null), y = w.useRef(!1), b = w.useRef(null), g = Me(n.ref, b), h = w.useRef(null);
  w.useEffect(() => {
    !c || !b.current || (y.current = !t);
  }, [t, c]), w.useEffect(() => {
    if (!c || !b.current)
      return;
    const E = be(b.current);
    return b.current.contains(E.activeElement) || (b.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), b.current.setAttribute("tabIndex", "-1")), y.current && b.current.focus()), () => {
      o || (f.current && f.current.focus && (l.current = !0, f.current.focus()), f.current = null);
    };
  }, [c]), w.useEffect(() => {
    if (!c || !b.current)
      return;
    const E = be(b.current), x = (_) => {
      h.current = _, !(r || !s() || _.key !== "Tab") && E.activeElement === b.current && _.shiftKey && (l.current = !0, d.current && d.current.focus());
    }, m = () => {
      const _ = b.current;
      if (_ === null)
        return;
      if (!E.hasFocus() || !s() || l.current) {
        l.current = !1;
        return;
      }
      if (_.contains(E.activeElement) || r && E.activeElement !== u.current && E.activeElement !== d.current)
        return;
      if (E.activeElement !== p.current)
        p.current = null;
      else if (p.current !== null)
        return;
      if (!y.current)
        return;
      let K = [];
      if ((E.activeElement === u.current || E.activeElement === d.current) && (K = i(b.current)), K.length > 0) {
        var Z, R;
        const W = !!((Z = h.current) != null && Z.shiftKey && ((R = h.current) == null ? void 0 : R.key) === "Tab"), q = K[0], ee = K[K.length - 1];
        typeof q != "string" && typeof ee != "string" && (W ? ee.focus() : q.focus());
      } else
        _.focus();
    };
    E.addEventListener("focusin", m), E.addEventListener("keydown", x, !0);
    const I = setInterval(() => {
      E.activeElement && E.activeElement.tagName === "BODY" && m();
    }, 50);
    return () => {
      clearInterval(I), E.removeEventListener("focusin", m), E.removeEventListener("keydown", x, !0);
    };
  }, [t, r, o, s, c, i]);
  const T = (E) => {
    f.current === null && (f.current = E.relatedTarget), y.current = !0, p.current = E.target;
    const x = n.props.onFocus;
    x && x(E);
  }, B = (E) => {
    f.current === null && (f.current = E.relatedTarget), y.current = !0;
  };
  return /* @__PURE__ */ ye(w.Fragment, {
    children: [/* @__PURE__ */ O("div", {
      tabIndex: c ? 0 : -1,
      onFocus: B,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ w.cloneElement(n, {
      ref: g,
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
process.env.NODE_ENV !== "production" && (Nn["propTypes"] = jr(Nn.propTypes));
function Ka(e) {
  return typeof e == "function" ? e() : e;
}
const _n = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = n, [s, c] = w.useState(null), l = Me(/* @__PURE__ */ w.isValidElement(r) ? r.ref : null, t);
  if (On(() => {
    i || c(Ka(o) || document.body);
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
    children: s && /* @__PURE__ */ Lo.createPortal(r, s)
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
process.env.NODE_ENV !== "production" && (_n["propTypes"] = jr(_n.propTypes));
function Xa(e) {
  const n = be(e);
  return n.body === e ? hn(e).innerWidth > n.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function fn(e, n) {
  n ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function br(e) {
  return parseInt(hn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Ya(e) {
  const t = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return t || r;
}
function yr(e, n, t, r, o) {
  const i = [n, t, ...r];
  [].forEach.call(e.children, (s) => {
    const c = i.indexOf(s) === -1, l = !Ya(s);
    c && l && fn(s, o);
  });
}
function et(e, n) {
  let t = -1;
  return e.some((r, o) => n(r) ? (t = o, !0) : !1), t;
}
function Ja(e, n) {
  const t = [], r = e.container;
  if (!n.disableScrollLock) {
    if (Xa(r)) {
      const s = Fr(be(r));
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
function Za(e) {
  const n = [];
  return [].forEach.call(e.children, (t) => {
    t.getAttribute("aria-hidden") === "true" && n.push(t);
  }), n;
}
class Qa {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(n, t) {
    let r = this.modals.indexOf(n);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(n), n.modalRef && fn(n.modalRef, !1);
    const o = Za(t);
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
    o.restore || (o.restore = Ja(o, t));
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
function ec(e) {
  return typeof e == "function" ? e() : e;
}
function nc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const tc = new Qa();
function rc(e) {
  const {
    container: n,
    disableEscapeKeyDown: t = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = tc,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: c,
    children: l,
    onClose: u,
    open: d,
    rootRef: f
  } = e, p = w.useRef({}), y = w.useRef(null), b = w.useRef(null), g = Me(b, f), [h, T] = w.useState(!d), B = nc(l);
  let E = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (E = !1);
  const x = () => be(y.current), m = () => (p.current.modalRef = b.current, p.current.mount = y.current, p.current), I = () => {
    o.mount(m(), {
      disableScrollLock: r
    }), b.current && (b.current.scrollTop = 0);
  }, _ = Qt(() => {
    const $ = ec(n) || x().body;
    o.add(m(), $), b.current && I();
  }), K = w.useCallback(() => o.isTopModal(m()), [o]), Z = Qt(($) => {
    y.current = $, $ && (d && K() ? I() : b.current && fn(b.current, E));
  }), R = w.useCallback(() => {
    o.remove(m(), E);
  }, [E, o]);
  w.useEffect(() => () => {
    R();
  }, [R]), w.useEffect(() => {
    d ? _() : (!B || !i) && R();
  }, [d, R, B, i, _]);
  const W = ($) => (j) => {
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
        onKeyDown: W(ie),
        ref: g
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
    rootRef: g,
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
function oc(e, n) {
  e.prototype = Object.create(n.prototype), e.prototype.constructor = e, dt(e, n);
}
const vr = {
  disabled: !1
};
var ic = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
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
const oo = en.createContext(null);
var sc = function(n) {
  return n.scrollTop;
}, un = "unmounted", Ae = "exited", De = "entering", Qe = "entered", ft = "exiting", Ne = /* @__PURE__ */ function(e) {
  oc(n, e);
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
          s && sc(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ae && this.setState({
        status: un
      });
  }, t.performEnter = function(o) {
    var i = this, s = this.props.enter, c = this.context ? this.context.isMounting : o, l = this.props.nodeRef ? [c] : [vn.findDOMNode(this), c], u = l[0], d = l[1], f = this.getTimeouts(), p = c ? f.appear : f.enter;
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
      i.props.onEntering(u, d), i.onTransitionEnd(p, function() {
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
      /* @__PURE__ */ en.createElement(oo.Provider, {
        value: null
      }, typeof s == "function" ? s(o, c) : en.cloneElement(en.Children.only(s), c))
    );
  }, n;
}(en.Component);
Ne.contextType = oo;
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
    var t = ic;
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
const io = Ne;
function qn() {
  const e = Jr(St);
  return process.env.NODE_ENV !== "production" && w.useDebugValue(e), e[wt] || e;
}
const so = (e) => e.scrollTop;
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
const ac = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function pt(e) {
  return `scale(${e}, ${e ** 2})`;
}
const cc = {
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
    onExit: f,
    onExited: p,
    onExiting: y,
    style: b,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = io
  } = n, T = ae(n, ac), B = w.useRef(), E = w.useRef(), x = qn(), m = w.useRef(null), I = Me(m, i.ref, t), _ = (N) => ($) => {
    if (N) {
      const j = m.current;
      $ === void 0 ? N(j) : N(j, $);
    }
  }, K = _(d), Z = _((N, $) => {
    so(N);
    const {
      duration: j,
      delay: ie,
      easing: Q
    } = $n({
      style: b,
      timeout: g,
      easing: s
    }, {
      mode: "enter"
    });
    let v;
    g === "auto" ? (v = x.transitions.getAutoHeightDuration(N.clientHeight), E.current = v) : v = j, N.style.transition = [x.transitions.create("opacity", {
      duration: v,
      delay: ie
    }), x.transitions.create("transform", {
      duration: nt ? v : v * 0.666,
      delay: ie,
      easing: Q
    })].join(","), l && l(N, $);
  }), R = _(u), W = _(y), q = _((N) => {
    const {
      duration: $,
      delay: j,
      easing: ie
    } = $n({
      style: b,
      timeout: g,
      easing: s
    }, {
      mode: "exit"
    });
    let Q;
    g === "auto" ? (Q = x.transitions.getAutoHeightDuration(N.clientHeight), E.current = Q) : Q = $, N.style.transition = [x.transitions.create("opacity", {
      duration: Q,
      delay: j
    }), x.transitions.create("transform", {
      duration: nt ? Q : Q * 0.666,
      delay: nt ? j : j || Q * 0.333,
      easing: ie
    })].join(","), N.style.opacity = 0, N.style.transform = pt(0.75), f && f(N);
  }), ee = _(p), M = (N) => {
    g === "auto" && (B.current = setTimeout(N, E.current || 0)), r && r(m.current, N);
  };
  return w.useEffect(() => () => {
    clearTimeout(B.current);
  }, []), /* @__PURE__ */ O(h, k({
    appear: o,
    in: c,
    nodeRef: m,
    onEnter: Z,
    onEntered: R,
    onEntering: K,
    onExit: q,
    onExited: ee,
    onExiting: W,
    addEndListener: M,
    timeout: g === "auto" ? null : g
  }, T, {
    children: (N, $) => /* @__PURE__ */ w.cloneElement(i, k({
      style: k({
        opacity: 0,
        transform: pt(0.75),
        visibility: N === "exited" && !c ? "hidden" : void 0
      }, cc[N], b, i.props.style),
      ref: I
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
const lc = Ot, uc = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], dc = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, ao = /* @__PURE__ */ w.forwardRef(function(n, t) {
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
    onEntered: f,
    onEntering: p,
    onExit: y,
    onExited: b,
    onExiting: g,
    style: h,
    timeout: T = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: B = io
  } = n, E = ae(n, uc), x = w.useRef(null), m = Me(x, c.ref, t), I = (M) => (N) => {
    if (M) {
      const $ = x.current;
      N === void 0 ? M($) : M($, N);
    }
  }, _ = I(p), K = I((M, N) => {
    so(M);
    const $ = $n({
      style: h,
      timeout: T,
      easing: l
    }, {
      mode: "enter"
    });
    M.style.webkitTransition = r.transitions.create("opacity", $), M.style.transition = r.transitions.create("opacity", $), d && d(M, N);
  }), Z = I(f), R = I(g), W = I((M) => {
    const N = $n({
      style: h,
      timeout: T,
      easing: l
    }, {
      mode: "exit"
    });
    M.style.webkitTransition = r.transitions.create("opacity", N), M.style.transition = r.transitions.create("opacity", N), y && y(M);
  }), q = I(b);
  return /* @__PURE__ */ O(B, k({
    appear: s,
    in: u,
    nodeRef: x,
    onEnter: K,
    onEntered: Z,
    onEntering: _,
    onExit: W,
    onExited: q,
    onExiting: R,
    addEndListener: (M) => {
      i && i(x.current, M);
    },
    timeout: T
  }, E, {
    children: (M, N) => /* @__PURE__ */ w.cloneElement(c, k({
      style: k({
        opacity: 0,
        visibility: M === "exited" && !u ? "hidden" : void 0
      }, dc[M], h, c.props.style),
      ref: m
    }, N))
  }));
});
process.env.NODE_ENV !== "production" && (ao.propTypes = {
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
const fc = ao;
function pc(e) {
  return Re("MuiBackdrop", e);
}
ze("MuiBackdrop", ["root", "invisible"]);
const hc = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], mc = (e) => {
  const {
    classes: n,
    invisible: t
  } = e;
  return Ve({
    root: ["root", t && "invisible"]
  }, pc, n);
}, gc = Te("div", {
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
})), co = /* @__PURE__ */ w.forwardRef(function(n, t) {
  var r, o, i;
  const s = Ue({
    props: n,
    name: "MuiBackdrop"
  }), {
    children: c,
    className: l,
    component: u = "div",
    components: d = {},
    componentsProps: f = {},
    invisible: p = !1,
    open: y,
    slotProps: b = {},
    slots: g = {},
    TransitionComponent: h = fc,
    transitionDuration: T
  } = s, B = ae(s, hc), E = k({}, s, {
    component: u,
    invisible: p
  }), x = mc(E), m = (r = b.root) != null ? r : f.root;
  return /* @__PURE__ */ O(h, k({
    in: y,
    timeout: T
  }, B, {
    children: /* @__PURE__ */ O(gc, k({
      "aria-hidden": !0
    }, m, {
      as: (o = (i = g.root) != null ? i : d.Root) != null ? o : u,
      className: Ce(x.root, l, m == null ? void 0 : m.className),
      ownerState: k({}, E, m == null ? void 0 : m.ownerState),
      classes: x,
      ref: t,
      children: c
    }))
  }));
});
process.env.NODE_ENV !== "production" && (co.propTypes = {
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
const bc = co;
function yc(e) {
  return Re("MuiModal", e);
}
ze("MuiModal", ["root", "hidden", "backdrop"]);
const vc = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Ec = (e) => {
  const {
    open: n,
    exited: t,
    classes: r
  } = e;
  return Ve({
    root: ["root", !n && t && "hidden"],
    backdrop: ["backdrop"]
  }, yc, r);
}, xc = Te("div", {
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
})), Tc = Te(bc, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, n) => n.backdrop
})({
  zIndex: -1
}), lo = /* @__PURE__ */ w.forwardRef(function(n, t) {
  var r, o, i, s, c, l;
  const u = Ue({
    name: "MuiModal",
    props: n
  }), {
    BackdropComponent: d = Tc,
    BackdropProps: f,
    className: p,
    closeAfterTransition: y = !1,
    children: b,
    container: g,
    component: h,
    components: T = {},
    componentsProps: B = {},
    disableAutoFocus: E = !1,
    disableEnforceFocus: x = !1,
    disableEscapeKeyDown: m = !1,
    disablePortal: I = !1,
    disableRestoreFocus: _ = !1,
    disableScrollLock: K = !1,
    hideBackdrop: Z = !1,
    keepMounted: R = !1,
    onBackdropClick: W,
    open: q,
    slotProps: ee,
    slots: M
    // eslint-disable-next-line react/prop-types
  } = u, N = ae(u, vc), $ = k({}, u, {
    closeAfterTransition: y,
    disableAutoFocus: E,
    disableEnforceFocus: x,
    disableEscapeKeyDown: m,
    disablePortal: I,
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
  } = rc(k({}, $, {
    rootRef: t
  })), D = k({}, $, {
    exited: A
  }), V = Ec(D), L = {};
  if (b.props.tabIndex === void 0 && (L.tabIndex = "-1"), z) {
    const {
      onEnter: H,
      onExited: S
    } = Q();
    L.onEnter = H, L.onExited = S;
  }
  const F = (r = (o = M == null ? void 0 : M.root) != null ? o : T.Root) != null ? r : xc, G = (i = (s = M == null ? void 0 : M.backdrop) != null ? s : T.Backdrop) != null ? i : d, X = (c = ee == null ? void 0 : ee.root) != null ? c : B.root, U = (l = ee == null ? void 0 : ee.backdrop) != null ? l : B.backdrop, de = rn({
    elementType: F,
    externalSlotProps: X,
    externalForwardedProps: N,
    getSlotProps: j,
    additionalProps: {
      ref: t,
      as: h
    },
    ownerState: D,
    className: Ce(p, X == null ? void 0 : X.className, V == null ? void 0 : V.root, !D.open && D.exited && (V == null ? void 0 : V.hidden))
  }), C = rn({
    elementType: G,
    externalSlotProps: U,
    additionalProps: f,
    getSlotProps: (H) => ie(k({}, H, {
      onClick: (S) => {
        W && W(S), H != null && H.onClick && H.onClick(S);
      }
    })),
    className: Ce(U == null ? void 0 : U.className, f == null ? void 0 : f.className, V == null ? void 0 : V.backdrop),
    ownerState: D
  });
  return !R && !q && (!z || A) ? null : /* @__PURE__ */ O(_n, {
    ref: v,
    container: g,
    disablePortal: I,
    children: /* @__PURE__ */ ye(F, k({}, de, {
      children: [!Z && d ? /* @__PURE__ */ O(G, k({}, C)) : null, /* @__PURE__ */ O(Nn, {
        disableEnforceFocus: x,
        disableAutoFocus: E,
        disableRestoreFocus: _,
        isEnabled: P,
        open: q,
        children: /* @__PURE__ */ w.cloneElement(b, L)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (lo.propTypes = {
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
const kc = lo, Sc = (e) => {
  let n;
  return e < 1 ? n = 5.11916 * e ** 2 : n = 4.5 * Math.log(e + 1) + 2, (n / 100).toFixed(2);
}, Er = Sc;
function wc(e) {
  return Re("MuiPaper", e);
}
ze("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Oc = ["className", "component", "elevation", "square", "variant"], Cc = (e) => {
  const {
    square: n,
    elevation: t,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !n && "rounded", r === "elevation" && `elevation${t}`]
  };
  return Ve(i, wc, o);
}, Pc = Te("div", {
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
}), uo = /* @__PURE__ */ w.forwardRef(function(n, t) {
  const r = Ue({
    props: n,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: c = !1,
    variant: l = "elevation"
  } = r, u = ae(r, Oc), d = k({}, r, {
    component: i,
    elevation: s,
    square: c,
    variant: l
  }), f = Cc(d);
  return process.env.NODE_ENV !== "production" && qn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ O(Pc, k({
    as: i,
    ownerState: d,
    className: Ce(f.root, o),
    ref: t
  }, u));
});
process.env.NODE_ENV !== "production" && (uo.propTypes = {
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
  elevation: gn(Ur, (e) => {
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
const Rc = uo;
function Nc(e) {
  return Re("MuiPopover", e);
}
ze("MuiPopover", ["root", "paper"]);
const _c = ["onEntering"], $c = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Mc = ["slotProps"];
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
const Ic = (e) => {
  const {
    classes: n
  } = e;
  return Ve({
    root: ["root"],
    paper: ["paper"]
  }, Nc, n);
}, Ac = Te(kc, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), fo = Te(Rc, {
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
}), po = /* @__PURE__ */ w.forwardRef(function(n, t) {
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
    anchorReference: f = "anchorEl",
    children: p,
    className: y,
    container: b,
    elevation: g = 8,
    marginThreshold: h = 16,
    open: T,
    PaperProps: B = {},
    slots: E,
    slotProps: x,
    transformOrigin: m = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: I = lc,
    transitionDuration: _ = "auto",
    TransitionProps: {
      onEntering: K
    } = {},
    disableScrollLock: Z = !1
  } = s, R = ae(s.TransitionProps, _c), W = ae(s, $c), q = (r = x == null ? void 0 : x.paper) != null ? r : B, ee = w.useRef(), M = Me(ee, q.ref), N = k({}, s, {
    anchorOrigin: u,
    anchorReference: f,
    elevation: g,
    marginThreshold: h,
    externalPaperSlotProps: q,
    transformOrigin: m,
    TransitionComponent: I,
    transitionDuration: _,
    TransitionProps: R
  }), $ = Ic(N), j = w.useCallback(() => {
    if (f === "anchorPosition")
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
  }, [l, u.horizontal, u.vertical, d, f]), ie = w.useCallback((H) => ({
    vertical: xr(H, m.vertical),
    horizontal: Tr(H, m.horizontal)
  }), [m.horizontal, m.vertical]), Q = w.useCallback((H) => {
    const S = {
      width: H.offsetWidth,
      height: H.offsetHeight
    }, fe = ie(S);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: kr(fe)
      };
    const he = j();
    let Se = he.top - fe.vertical, He = he.left - fe.horizontal;
    const _t = Se + S.height, $t = He + S.width, Mt = hn(Sn(l)), sn = Mt.innerHeight - h, It = Mt.innerWidth - h;
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
    } else if ($t > It) {
      const Ee = $t - It;
      He -= Ee, fe.horizontal += Ee;
    }
    return {
      top: `${Math.round(Se)}px`,
      left: `${Math.round(He)}px`,
      transformOrigin: kr(fe)
    };
  }, [l, f, j, ie, h]), [v, P] = w.useState(T), A = w.useCallback(() => {
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
    const H = xi(() => {
      A();
    }), S = hn(l);
    return S.addEventListener("resize", H), () => {
      H.clear(), S.removeEventListener("resize", H);
    };
  }, [l, T, A]);
  let V = _;
  _ === "auto" && !I.muiSupportAuto && (V = void 0);
  const L = b || (l ? be(Sn(l)).body : void 0), F = (o = E == null ? void 0 : E.root) != null ? o : Ac, G = (i = E == null ? void 0 : E.paper) != null ? i : fo, X = rn({
    elementType: G,
    externalSlotProps: k({}, q, {
      style: v ? q.style : k({}, q.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: M
    },
    ownerState: N,
    className: Ce($.paper, q == null ? void 0 : q.className)
  }), U = rn({
    elementType: F,
    externalSlotProps: (x == null ? void 0 : x.root) || {},
    externalForwardedProps: W,
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
    className: Ce($.root, y)
  }), {
    slotProps: de
  } = U, C = ae(U, Mc);
  return /* @__PURE__ */ O(F, k({}, C, !qr(F) && {
    slotProps: de,
    disableScrollLock: Z
  }, {
    children: /* @__PURE__ */ O(I, k({
      appear: !0,
      in: T,
      onEntering: z,
      onExited: D,
      timeout: V
    }, R, {
      children: /* @__PURE__ */ O(G, k({}, X, {
        children: p
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (po.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Ei,
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
  elevation: Ur,
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
    component: hi
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
const Dc = po;
function Bc(e) {
  return Re("MuiMenu", e);
}
ze("MuiMenu", ["root", "paper", "list"]);
const jc = ["onEntering"], Lc = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Fc = {
  vertical: "top",
  horizontal: "right"
}, Vc = {
  vertical: "top",
  horizontal: "left"
}, zc = (e) => {
  const {
    classes: n
  } = e;
  return Ve({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Bc, n);
}, Uc = Te(Dc, {
  shouldForwardProp: (e) => Qr(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), Hc = Te(fo, {
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
}), qc = Te(Va, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, n) => n.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), ho = /* @__PURE__ */ w.forwardRef(function(n, t) {
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
    onClose: f,
    open: p,
    PaperProps: y = {},
    PopoverClasses: b,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: T = "selectedMenu",
    slots: B = {},
    slotProps: E = {}
  } = i, x = ae(i.TransitionProps, jc), m = ae(i, Lc), I = qn(), _ = I.direction === "rtl", K = k({}, i, {
    autoFocus: s,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: h,
    PaperProps: y,
    transitionDuration: g,
    TransitionProps: x,
    variant: T
  }), Z = zc(K), R = s && !u && p, W = w.useRef(null), q = (Q, v) => {
    W.current && W.current.adjustStyleForScrollbar(Q, I), h && h(Q, v);
  }, ee = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), f && f(Q, "tabKeyDown"));
  };
  let M = -1;
  w.Children.map(c, (Q, v) => {
    /* @__PURE__ */ w.isValidElement(Q) && (process.env.NODE_ENV !== "production" && wn.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (T === "selectedMenu" && Q.props.selected || M === -1) && (M = v));
  });
  const N = (r = B.paper) != null ? r : Hc, $ = (o = E.paper) != null ? o : y, j = rn({
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
  return /* @__PURE__ */ O(Uc, k({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: _ ? "right" : "left"
    },
    transformOrigin: _ ? Fc : Vc,
    slots: {
      paper: N,
      root: B.root
    },
    slotProps: {
      root: j,
      paper: ie
    },
    open: p,
    ref: t,
    transitionDuration: g,
    TransitionProps: k({
      onEntering: q
    }, x),
    ownerState: K
  }, m, {
    classes: b,
    children: /* @__PURE__ */ O(qc, k({
      onKeyDown: ee,
      actions: W,
      autoFocus: s && (M === -1 || u),
      autoFocusItem: R,
      variant: T
    }, d, {
      className: Ce(Z.list, d.className),
      children: c
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ho.propTypes = {
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
const Gc = ho;
function Sl(e) {
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
  return (((u = r.items) == null ? void 0 : u.length) ?? 0) === 0 || !o ? o : /* @__PURE__ */ ye(
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
var Wc = Object.defineProperty, Kc = (e, n, t) => n in e ? Wc(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, J = (e, n, t) => (Kc(e, typeof n != "symbol" ? n + "" : n, t), t);
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
], mo = [
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
], Sr = ol();
function on(e, n = !0) {
  return n && (e = e.toUpperCase()), e in Sr ? Sr[e] : 0;
}
function Pt(e) {
  return on(e) > 0;
}
function Xc(e) {
  const n = typeof e == "string" ? on(e) : e;
  return n >= 40 && n <= 66;
}
function Yc(e) {
  return (typeof e == "string" ? on(e) : e) <= 39;
}
function go(e) {
  return e <= 66;
}
function Jc(e) {
  const n = typeof e == "string" ? on(e) : e;
  return vo(n) && !go(n);
}
function* Zc() {
  for (let e = 1; e <= Fe.length; e++)
    yield e;
}
const Qc = 1, bo = Fe.length;
function el() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Rt(e, n = "***") {
  const t = e - 1;
  return t < 0 || t >= Fe.length ? n : Fe[t];
}
function yo(e) {
  return e <= 0 || e > bo ? "******" : mo[e - 1];
}
function nl(e) {
  return yo(on(e));
}
function vo(e) {
  const n = typeof e == "number" ? Rt(e) : e;
  return Pt(n) && !Ct.includes(n);
}
function tl(e) {
  const n = typeof e == "number" ? Rt(e) : e;
  return Pt(n) && Ct.includes(n);
}
function rl(e) {
  return mo[e - 1].includes("*obsolete*");
}
function ol() {
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
  isBookNT: Xc,
  isBookOT: Yc,
  isBookOTNT: go,
  isBookDC: Jc,
  allBookNumbers: Zc,
  firstBook: Qc,
  lastBook: bo,
  extraBooks: el,
  bookNumberToId: Rt,
  bookNumberToEnglishName: yo,
  bookIdToEnglishName: nl,
  isCanonical: vo,
  isExtraMaterial: tl,
  isObsolete: rl
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
var Eo = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Eo || {});
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
J(we, "ValidStatusType", Eo);
class ln extends Error {
}
function Mn({
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
  value: f,
  onChange: p,
  onFocus: y,
  onBlur: b
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
      value: f,
      onChange: p,
      onFocus: y,
      onBlur: b
    }
  );
}
let tt;
const rt = () => (tt || (tt = Oe.allBookIds.map((e) => ({
  bookId: e,
  label: Oe.bookIdToEnglishName(e)
}))), tt);
function wl({ scrRef: e, handleSubmit: n, id: t }) {
  const r = (l) => {
    n(l);
  }, o = (l, u) => {
    const f = { bookNum: Oe.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
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
        isDisabled: e.bookNum <= Fo,
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
      Mn,
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
        isDisabled: e.chapterNum <= Vo,
        children: "<"
      }
    ),
    /* @__PURE__ */ O(
      qe,
      {
        onClick: () => n(Bt(e, 1)),
        isDisabled: e.chapterNum >= zo(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ O(
      Mn,
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
        isDisabled: e.verseNum <= Uo,
        children: "<"
      }
    ),
    /* @__PURE__ */ O(qe, { onClick: () => n(jt(e, 1)), children: ">" })
  ] });
}
function Ol({ onSearch: e, placeholder: n, isFullWidth: t }) {
  const [r, o] = je(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ O(Ro, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ O(
    Mn,
    {
      isFullWidth: t,
      className: "search-bar-input",
      placeholder: n,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  ) });
}
function Cl({
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
  onChange: f,
  onChangeCommitted: p
}) {
  return /* @__PURE__ */ O(
    No,
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
      onChange: f,
      onChangeCommitted: p
    }
  );
}
function Pl({
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
    _o,
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
function Rl({
  id: e,
  isChecked: n,
  isDisabled: t = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ O(
    $o,
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
  return /* @__PURE__ */ O(Mn, { defaultValue: n[t.key], onChange: r });
}
const il = ({ onChange: e, disabled: n, checked: t, ...r }) => /* @__PURE__ */ O(
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
function Nl({
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
  selectColumnWidth: f = 50,
  rowKeyGetter: p,
  rowHeight: y = 35,
  headerRowHeight: b = 35,
  selectedRows: g,
  onSelectedRowsChange: h,
  onRowsChange: T,
  onCellClick: B,
  onCellDoubleClick: E,
  onCellContextMenu: x,
  onCellKeyDown: m,
  direction: I = "ltr",
  enableVirtualization: _ = !0,
  onCopy: K,
  onPaste: Z,
  onScroll: R,
  className: W,
  id: q
}) {
  const ee = mt(() => {
    const M = e.map((N) => typeof N.editable == "function" ? {
      ...N,
      editable: (j) => !!N.editable(j),
      renderEditCell: N.renderEditCell || Or
    } : N.editable && !N.renderEditCell ? { ...N, renderEditCell: Or } : N.renderEditCell && !N.editable ? { ...N, editable: !1 } : N);
    return d ? [{ ...qo, minWidth: f }, ...M] : M;
  }, [e, d, f]);
  return /* @__PURE__ */ O(
    Ho,
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
      rowKeyGetter: p,
      rowHeight: y,
      headerRowHeight: b,
      selectedRows: g,
      onSelectedRowsChange: h,
      onRowsChange: T,
      onCellClick: B,
      onCellDoubleClick: E,
      onCellContextMenu: x,
      onCellKeyDown: m,
      direction: I,
      enableVirtualization: _,
      onCopy: K,
      onPaste: Z,
      onScroll: R,
      renderers: { renderCheckbox: il },
      className: `papi-table ${W ?? "rdg-light"}`,
      id: q
    }
  );
}
function sl(e) {
  return Re("MuiSvgIcon", e);
}
ze("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const al = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], cl = (e) => {
  const {
    color: n,
    fontSize: t,
    classes: r
  } = e, o = {
    root: ["root", n !== "inherit" && `color${ke(n)}`, `fontSize${ke(t)}`]
  };
  return Ve(o, sl, r);
}, ll = Te("svg", {
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
  var t, r, o, i, s, c, l, u, d, f, p, y, b;
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
    color: (f = (p = (e.vars || e).palette) == null || (p = p[n.color]) == null ? void 0 : p.main) != null ? f : {
      action: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.active,
      disabled: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.disabled,
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
    titleAccess: f,
    viewBox: p = "0 0 24 24"
  } = r, y = ae(r, al), b = /* @__PURE__ */ w.isValidElement(o) && o.type === "svg", g = k({}, r, {
    color: s,
    component: c,
    fontSize: l,
    instanceFontSize: n.fontSize,
    inheritViewBox: d,
    viewBox: p,
    hasSvgAsChild: b
  }), h = {};
  d || (h.viewBox = p);
  const T = cl(g);
  return /* @__PURE__ */ ye(ll, k({
    as: c,
    className: Ce(T.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: t
  }, h, y, b && o.props, {
    ownerState: g,
    children: [b ? o.props.children : o, f ? /* @__PURE__ */ O("title", {
      children: f
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
function ul(e, n) {
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
const dl = ul(/* @__PURE__ */ O("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function _l({
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
  }, []), f = it(void 0), [p, y] = je(0);
  In(() => {
    i && f.current && y(f.current.clientHeight);
  }, [i]);
  const b = xn(
    (h) => (u(), n(h)),
    [n, u]
  ), g = e == null ? void 0 : e(c);
  return /* @__PURE__ */ O("div", { ref: f, style: { position: "relative" }, children: /* @__PURE__ */ O(Mo, { position: "static", id: r, children: /* @__PURE__ */ ye(Io, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    g ? /* @__PURE__ */ O(
      _r,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: d,
        children: /* @__PURE__ */ O(dl, {})
      }
    ) : void 0,
    o ? /* @__PURE__ */ O("div", { className: "papi-menu-children", children: o }) : void 0,
    g ? /* @__PURE__ */ O(
      Ao,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: i,
        onClose: u,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: p
          }
        },
        children: /* @__PURE__ */ O(
          Zo,
          {
            className: t,
            commandHandler: b,
            multiColumnMenu: g
          }
        )
      }
    ) : void 0
  ] }) }) });
}
const $l = (e, n) => {
  In(() => {
    if (!e)
      return () => {
      };
    const t = e(n);
    return () => {
      t();
    };
  }, [e, n]);
};
function fl(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const pl = (e, n, t = {}) => {
  const r = it(n);
  r.current = n;
  const o = it(t);
  o.current = fl(o.current);
  const [i, s] = je(() => r.current), [c, l] = je(!0);
  return In(() => {
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
  const [t] = pl(
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
  In(() => () => {
    t !== ot && t();
  }, [t]);
};
function hl(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const t = document.head || document.querySelector("head"), r = t.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && r ? t.insertBefore(o, r) : t.appendChild(o);
}
hl(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
`, "top");
export {
  qe as Button,
  Tl as ChapterRangeSelector,
  Go as Checkbox,
  st as ComboBox,
  Sl as ContextMenu,
  Zo as GridMenu,
  kl as IconButton,
  Ze as LabelPosition,
  Wo as MenuItem,
  wl as RefSelector,
  Ol as SearchBar,
  Cl as Slider,
  Pl as Snackbar,
  Rl as Switch,
  Nl as Table,
  Mn as TextField,
  _l as Toolbar,
  Yo as TopLevelMenu,
  $l as useEvent,
  Ml as useEventAsync,
  pl as usePromise
};
//# sourceMappingURL=index.js.map
