import { jsx as O, jsxs as ve, Fragment as ht } from "react/jsx-runtime";
import { Button as Eo, Autocomplete as xo, TextField as Cr, FormControlLabel as At, FormLabel as To, Checkbox as ko, MenuItem as Pr, ListItemText as So, ListItemIcon as wo, Menu as Oo, Grid as Nr, List as Co, IconButton as Rr, Paper as Po, Slider as No, Snackbar as Ro, Switch as $o, AppBar as _o, Toolbar as Io, Drawer as Mo } from "@mui/material";
import * as S from "react";
import en, { useMemo as bn, useState as De, useCallback as nn, useRef as it, useEffect as Mn } from "react";
import Ao, { ThemeContext as Do, internal_processStyles as Bo } from "@mui/styled-engine";
import * as jo from "react-dom";
import xn from "react-dom";
import { offsetBook as Dt, FIRST_SCR_BOOK_NUM as Lo, offsetChapter as Bt, FIRST_SCR_CHAPTER_NUM as Fo, getChaptersForBook as Vo, offsetVerse as jt, FIRST_SCR_VERSE_NUM as zo } from "platform-bible-utils";
import Uo, { SelectColumn as Ho } from "react-data-grid";
function He({
  id: e,
  isDisabled: n = !1,
  className: t,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ O(
    Eo,
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
  width: a,
  options: c = [],
  className: l,
  value: u,
  onChange: d,
  onFocus: p,
  onBlur: f,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ O(
    xo,
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
        Cr,
        {
          ...y,
          error: o,
          fullWidth: i,
          disabled: t,
          label: n,
          style: { width: a }
        }
      )
    }
  );
}
function Sl({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: t,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const a = bn(
    () => Array.from({ length: i }, (u, d) => d + 1),
    [i]
  ), c = (u, d) => {
    t(d), d > n && r(d);
  }, l = (u, d) => {
    r(d), d < e && t(d);
  };
  return /* @__PURE__ */ ve(ht, { children: [
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
            options: a,
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
            options: a,
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
var Je = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Je || {});
function qo({
  id: e,
  isChecked: n,
  labelText: t = "",
  labelPosition: r = Je.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: c = !1,
  className: l,
  onChange: u
}) {
  const d = /* @__PURE__ */ O(
    ko,
    {
      id: e,
      checked: n,
      indeterminate: o,
      defaultChecked: i,
      disabled: a,
      className: `papi-checkbox ${c ? "error" : ""} ${l ?? ""}`,
      onChange: u
    }
  );
  let p;
  if (t) {
    const f = r === Je.Before || r === Je.Above, b = /* @__PURE__ */ O("span", { className: `papi-checkbox-label ${c ? "error" : ""} ${l ?? ""}`, children: t }), y = r === Je.Before || r === Je.After, g = y ? b : /* @__PURE__ */ O("div", { children: b }), h = y ? d : /* @__PURE__ */ O("div", { children: d });
    p = /* @__PURE__ */ ve(
      To,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: a,
        error: c,
        children: [
          f && g,
          h,
          !f && g
        ]
      }
    );
  } else
    p = d;
  return p;
}
function Lt(e, n, t) {
  return e ? /* @__PURE__ */ O(wo, { className: `papi-menu-icon-${t ? "leading" : "trailing"}`, children: /* @__PURE__ */ O("img", { src: e, alt: `${t ? "Leading" : "Trailing"} icon for ${n}` }) }) : void 0;
}
function Wo(e) {
  const {
    onClick: n,
    label: t,
    allowForLeadingIcons: r = !0,
    iconPathBefore: o = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: a = !1,
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
    Pr,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: a,
      className: c,
      disabled: l,
      dense: u,
      disableGutters: d,
      divider: p,
      focusVisibleClassName: f,
      onClick: n,
      id: b,
      children: t ? /* @__PURE__ */ ve(ht, { children: [
        Lt(o, t, !0),
        /* @__PURE__ */ O(So, { primary: t, inset: !o && r }),
        Lt(i, t, !1)
      ] }) : y
    }
  );
}
function $r(e) {
  return Object.entries(e.groups).map(([t, r]) => ({ id: t, group: r }));
}
function Go(e) {
  const [n, t] = De(void 0), { parentMenuItem: r, menuDefinition: o } = e, i = (l) => {
    t(l.currentTarget);
  }, a = () => {
    t(void 0);
  }, c = () => {
    let l = $r(o).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return l = l.filter(
      (u) => "menuItem" in u && u.menuItem === r.id
    ), mt(e, l);
  };
  return /* @__PURE__ */ ve(ht, { children: [
    /* @__PURE__ */ O(Pr, { onClick: i, children: r.label }),
    /* @__PURE__ */ O(
      Oo,
      {
        anchorEl: n,
        open: !!n,
        onClose: a,
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
const Ko = (e, n) => n.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function mt(e, n) {
  const { menuDefinition: t, onClick: r, commandHandler: o } = e, i = ((n == null ? void 0 : n.length) ?? 0) > 0 ? n : (
    // We're apparently laying out a single-column menu (presumably a context menu). In this case,
    // all groups should be included expect ones that belong to a submenu.
    $r(t).filter((f) => !("menuItem" in f.group))
  ), a = Object.values(i).sort(
    (f, b) => (f.group.order || 0) - (b.group.order || 0)
  ), c = [];
  a.forEach((f) => {
    Ko(f.id, t.items).forEach(
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
      const { item: g } = b, h = u(b);
      if ("command" in g) {
        const T = g.group + y;
        f.push(
          /* @__PURE__ */ O(
            Wo,
            {
              onClick: () => {
                r == null || r(), o(g);
              },
              ...h
            },
            T
          )
        );
      } else
        f.push(/* @__PURE__ */ O(Go, { parentMenuItem: g, ...e }, p + g.id));
    }), f;
  })() }, p);
}
function Xo(e) {
  const { menuDefinition: n, columnId: t } = e;
  let i = Object.entries(n.groups).map(([a, c]) => ({ id: a, group: c })).filter((a) => "column" in a.group);
  return t && "columns" in n && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  n.columns[t] && (i = i.filter(
    (a) => "column" in a.group && a.group.column === t
  )), mt(e, i);
}
function Yo({
  commandHandler: e,
  menuDefinition: n,
  id: t,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ ve(
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
        /* @__PURE__ */ O(Co, { id: t, dense: !0, className: i ?? "", children: /* @__PURE__ */ O(
          Xo,
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
function Jo({
  commandHandler: e,
  className: n,
  multiColumnMenu: t,
  id: r
}) {
  const { columns: o } = t, i = bn(() => {
    const a = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((c) => {
      if (c === "isExtensible")
        return;
      const l = c, u = o[l];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) && a.set(u.order, { id: l, metadata: u });
    }), Array.from(a.values()).sort((c, l) => (c.metadata.order || 0) - (l.metadata.order || 0));
  }, [o]);
  return /* @__PURE__ */ O(
    Nr,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${n ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((a, c) => /* @__PURE__ */ O(
        Yo,
        {
          commandHandler: e,
          menuDefinition: t,
          ...a,
          className: n
        },
        c
      ))
    }
  );
}
function x() {
  return x = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = arguments[n];
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
  }, x.apply(this, arguments);
}
function ae(e, n) {
  if (e == null)
    return {};
  var t = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(n.indexOf(o) >= 0) && (t[o] = e[o]);
  return t;
}
function Zo(e) {
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
function Qo() {
  if (Ft)
    return ne;
  Ft = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
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
                case a:
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
  return ne.ContextConsumer = a, ne.ContextProvider = i, ne.Element = e, ne.ForwardRef = l, ne.Fragment = t, ne.Lazy = f, ne.Memo = p, ne.Portal = n, ne.Profiler = o, ne.StrictMode = r, ne.Suspense = u, ne.SuspenseList = d, ne.isAsyncMode = function() {
    return !1;
  }, ne.isConcurrentMode = function() {
    return !1;
  }, ne.isContextConsumer = function(h) {
    return g(h) === a;
  }, ne.isContextProvider = function(h) {
    return g(h) === i;
  }, ne.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, ne.isForwardRef = function(h) {
    return g(h) === l;
  }, ne.isFragment = function(h) {
    return g(h) === t;
  }, ne.isLazy = function(h) {
    return g(h) === f;
  }, ne.isMemo = function(h) {
    return g(h) === p;
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
    return typeof h == "string" || typeof h == "function" || h === t || h === o || h === r || h === u || h === d || h === b || typeof h == "object" && h !== null && (h.$$typeof === f || h.$$typeof === p || h.$$typeof === i || h.$$typeof === a || h.$$typeof === l || h.$$typeof === y || h.getModuleId !== void 0);
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
function ei() {
  return Vt || (Vt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y = !1, g = !1, h = !1, T = !1, B = !1, E;
    E = Symbol.for("react.module.reference");
    function w(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === t || k === o || B || k === r || k === u || k === d || T || k === b || y || g || h || typeof k == "object" && k !== null && (k.$$typeof === f || k.$$typeof === p || k.$$typeof === i || k.$$typeof === a || k.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === E || k.getModuleId !== void 0));
    }
    function m(k) {
      if (typeof k == "object" && k !== null) {
        var fe = k.$$typeof;
        switch (fe) {
          case e:
            var ge = k.type;
            switch (ge) {
              case t:
              case o:
              case r:
              case u:
              case d:
                return ge;
              default:
                var Se = ge && ge.$$typeof;
                switch (Se) {
                  case c:
                  case a:
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
    var _ = a, R = i, H = e, J = l, Y = t, q = f, W = p, ee = n, A = o, N = r, $ = u, D = d, ie = !1, Z = !1;
    function v(k) {
      return ie || (ie = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function P(k) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function I(k) {
      return m(k) === a;
    }
    function V(k) {
      return m(k) === i;
    }
    function M(k) {
      return typeof k == "object" && k !== null && k.$$typeof === e;
    }
    function F(k) {
      return m(k) === l;
    }
    function j(k) {
      return m(k) === t;
    }
    function L(k) {
      return m(k) === f;
    }
    function G(k) {
      return m(k) === p;
    }
    function K(k) {
      return m(k) === n;
    }
    function z(k) {
      return m(k) === o;
    }
    function de(k) {
      return m(k) === r;
    }
    function C(k) {
      return m(k) === u;
    }
    function U(k) {
      return m(k) === d;
    }
    te.ContextConsumer = _, te.ContextProvider = R, te.Element = H, te.ForwardRef = J, te.Fragment = Y, te.Lazy = q, te.Memo = W, te.Portal = ee, te.Profiler = A, te.StrictMode = N, te.Suspense = $, te.SuspenseList = D, te.isAsyncMode = v, te.isConcurrentMode = P, te.isContextConsumer = I, te.isContextProvider = V, te.isElement = M, te.isForwardRef = F, te.isFragment = j, te.isLazy = L, te.isMemo = G, te.isPortal = K, te.isProfiler = z, te.isStrictMode = de, te.isSuspense = C, te.isSuspenseList = U, te.isValidElementType = w, te.typeOf = m;
  }()), te;
}
process.env.NODE_ENV === "production" ? at.exports = Qo() : at.exports = ei();
var Cn = at.exports, ct = { exports: {} }, Tn = { exports: {} }, re = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zt;
function ni() {
  if (zt)
    return re;
  zt = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, B = e ? Symbol.for("react.scope") : 60119;
  function E(m) {
    if (typeof m == "object" && m !== null) {
      var _ = m.$$typeof;
      switch (_) {
        case n:
          switch (m = m.type, m) {
            case l:
            case u:
            case r:
            case i:
            case o:
            case p:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case c:
                case d:
                case y:
                case b:
                case a:
                  return m;
                default:
                  return _;
              }
          }
        case t:
          return _;
      }
    }
  }
  function w(m) {
    return E(m) === u;
  }
  return re.AsyncMode = l, re.ConcurrentMode = u, re.ContextConsumer = c, re.ContextProvider = a, re.Element = n, re.ForwardRef = d, re.Fragment = r, re.Lazy = y, re.Memo = b, re.Portal = t, re.Profiler = i, re.StrictMode = o, re.Suspense = p, re.isAsyncMode = function(m) {
    return w(m) || E(m) === l;
  }, re.isConcurrentMode = w, re.isContextConsumer = function(m) {
    return E(m) === c;
  }, re.isContextProvider = function(m) {
    return E(m) === a;
  }, re.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === n;
  }, re.isForwardRef = function(m) {
    return E(m) === d;
  }, re.isFragment = function(m) {
    return E(m) === r;
  }, re.isLazy = function(m) {
    return E(m) === y;
  }, re.isMemo = function(m) {
    return E(m) === b;
  }, re.isPortal = function(m) {
    return E(m) === t;
  }, re.isProfiler = function(m) {
    return E(m) === i;
  }, re.isStrictMode = function(m) {
    return E(m) === o;
  }, re.isSuspense = function(m) {
    return E(m) === p;
  }, re.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === r || m === u || m === i || m === o || m === p || m === f || typeof m == "object" && m !== null && (m.$$typeof === y || m.$$typeof === b || m.$$typeof === a || m.$$typeof === c || m.$$typeof === d || m.$$typeof === h || m.$$typeof === T || m.$$typeof === B || m.$$typeof === g);
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
function ti() {
  return Ut || (Ut = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, B = e ? Symbol.for("react.scope") : 60119;
    function E(C) {
      return typeof C == "string" || typeof C == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      C === r || C === u || C === i || C === o || C === p || C === f || typeof C == "object" && C !== null && (C.$$typeof === y || C.$$typeof === b || C.$$typeof === a || C.$$typeof === c || C.$$typeof === d || C.$$typeof === h || C.$$typeof === T || C.$$typeof === B || C.$$typeof === g);
    }
    function w(C) {
      if (typeof C == "object" && C !== null) {
        var U = C.$$typeof;
        switch (U) {
          case n:
            var k = C.type;
            switch (k) {
              case l:
              case u:
              case r:
              case i:
              case o:
              case p:
                return k;
              default:
                var fe = k && k.$$typeof;
                switch (fe) {
                  case c:
                  case d:
                  case y:
                  case b:
                  case a:
                    return fe;
                  default:
                    return U;
                }
            }
          case t:
            return U;
        }
      }
    }
    var m = l, _ = u, R = c, H = a, J = n, Y = d, q = r, W = y, ee = b, A = t, N = i, $ = o, D = p, ie = !1;
    function Z(C) {
      return ie || (ie = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), v(C) || w(C) === l;
    }
    function v(C) {
      return w(C) === u;
    }
    function P(C) {
      return w(C) === c;
    }
    function I(C) {
      return w(C) === a;
    }
    function V(C) {
      return typeof C == "object" && C !== null && C.$$typeof === n;
    }
    function M(C) {
      return w(C) === d;
    }
    function F(C) {
      return w(C) === r;
    }
    function j(C) {
      return w(C) === y;
    }
    function L(C) {
      return w(C) === b;
    }
    function G(C) {
      return w(C) === t;
    }
    function K(C) {
      return w(C) === i;
    }
    function z(C) {
      return w(C) === o;
    }
    function de(C) {
      return w(C) === p;
    }
    oe.AsyncMode = m, oe.ConcurrentMode = _, oe.ContextConsumer = R, oe.ContextProvider = H, oe.Element = J, oe.ForwardRef = Y, oe.Fragment = q, oe.Lazy = W, oe.Memo = ee, oe.Portal = A, oe.Profiler = N, oe.StrictMode = $, oe.Suspense = D, oe.isAsyncMode = Z, oe.isConcurrentMode = v, oe.isContextConsumer = P, oe.isContextProvider = I, oe.isElement = V, oe.isForwardRef = M, oe.isFragment = F, oe.isLazy = j, oe.isMemo = L, oe.isPortal = G, oe.isProfiler = K, oe.isStrictMode = z, oe.isSuspense = de, oe.isValidElementType = E, oe.typeOf = w;
  }()), oe;
}
var Ht;
function _r() {
  return Ht || (Ht = 1, process.env.NODE_ENV === "production" ? Tn.exports = ni() : Tn.exports = ti()), Tn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Wn, qt;
function ri() {
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
      for (var a = {}, c = 0; c < 10; c++)
        a["_" + String.fromCharCode(c)] = c;
      var l = Object.getOwnPropertyNames(a).map(function(d) {
        return a[d];
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
  return Wn = o() ? Object.assign : function(i, a) {
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
function gt() {
  if (Wt)
    return Gn;
  Wt = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Gn = e, Gn;
}
var Kn, Gt;
function Ir() {
  return Gt || (Gt = 1, Kn = Function.call.bind(Object.prototype.hasOwnProperty)), Kn;
}
var Xn, Kt;
function oi() {
  if (Kt)
    return Xn;
  Kt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = gt(), t = {}, r = Ir();
    e = function(i) {
      var a = "Warning: " + i;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function o(i, a, c, l, u) {
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
            p = i[d](a, d, l, c, null, n);
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
function ii() {
  if (Xt)
    return Yn;
  Xt = 1;
  var e = _r(), n = ri(), t = gt(), r = Ir(), o = oi(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(c) {
    var l = "Warning: " + c;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function a() {
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
      element: w(),
      elementType: m(),
      instanceOf: _,
      node: Y(),
      objectOf: H,
      oneOf: R,
      oneOfType: J,
      shape: W,
      exact: ee
    };
    function y(v, P) {
      return v === P ? v !== 0 || 1 / v === 1 / P : v !== v && P !== P;
    }
    function g(v, P) {
      this.message = v, this.data = P && typeof P == "object" ? P : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function h(v) {
      if (process.env.NODE_ENV !== "production")
        var P = {}, I = 0;
      function V(F, j, L, G, K, z, de) {
        if (G = G || f, z = z || L, de !== t) {
          if (l) {
            var C = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw C.name = "Invariant Violation", C;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var U = G + ":" + L;
            !P[U] && // Avoid spamming the console because they are often not actionable except for lib authors
            I < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + z + "` prop on `" + G + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), P[U] = !0, I++);
          }
        }
        return j[L] == null ? F ? j[L] === null ? new g("The " + K + " `" + z + "` is marked as required " + ("in `" + G + "`, but its value is `null`.")) : new g("The " + K + " `" + z + "` is marked as required in " + ("`" + G + "`, but its value is `undefined`.")) : null : v(j, L, G, K, z);
      }
      var M = V.bind(null, !1);
      return M.isRequired = V.bind(null, !0), M;
    }
    function T(v) {
      function P(I, V, M, F, j, L) {
        var G = I[V], K = $(G);
        if (K !== v) {
          var z = D(G);
          return new g(
            "Invalid " + F + " `" + j + "` of type " + ("`" + z + "` supplied to `" + M + "`, expected ") + ("`" + v + "`."),
            { expectedType: v }
          );
        }
        return null;
      }
      return h(P);
    }
    function B() {
      return h(a);
    }
    function E(v) {
      function P(I, V, M, F, j) {
        if (typeof v != "function")
          return new g("Property `" + j + "` of component `" + M + "` has invalid PropType notation inside arrayOf.");
        var L = I[V];
        if (!Array.isArray(L)) {
          var G = $(L);
          return new g("Invalid " + F + " `" + j + "` of type " + ("`" + G + "` supplied to `" + M + "`, expected an array."));
        }
        for (var K = 0; K < L.length; K++) {
          var z = v(L, K, M, F, j + "[" + K + "]", t);
          if (z instanceof Error)
            return z;
        }
        return null;
      }
      return h(P);
    }
    function w() {
      function v(P, I, V, M, F) {
        var j = P[I];
        if (!c(j)) {
          var L = $(j);
          return new g("Invalid " + M + " `" + F + "` of type " + ("`" + L + "` supplied to `" + V + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(v);
    }
    function m() {
      function v(P, I, V, M, F) {
        var j = P[I];
        if (!e.isValidElementType(j)) {
          var L = $(j);
          return new g("Invalid " + M + " `" + F + "` of type " + ("`" + L + "` supplied to `" + V + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(v);
    }
    function _(v) {
      function P(I, V, M, F, j) {
        if (!(I[V] instanceof v)) {
          var L = v.name || f, G = Z(I[V]);
          return new g("Invalid " + F + " `" + j + "` of type " + ("`" + G + "` supplied to `" + M + "`, expected ") + ("instance of `" + L + "`."));
        }
        return null;
      }
      return h(P);
    }
    function R(v) {
      if (!Array.isArray(v))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function P(I, V, M, F, j) {
        for (var L = I[V], G = 0; G < v.length; G++)
          if (y(L, v[G]))
            return null;
        var K = JSON.stringify(v, function(de, C) {
          var U = D(C);
          return U === "symbol" ? String(C) : C;
        });
        return new g("Invalid " + F + " `" + j + "` of value `" + String(L) + "` " + ("supplied to `" + M + "`, expected one of " + K + "."));
      }
      return h(P);
    }
    function H(v) {
      function P(I, V, M, F, j) {
        if (typeof v != "function")
          return new g("Property `" + j + "` of component `" + M + "` has invalid PropType notation inside objectOf.");
        var L = I[V], G = $(L);
        if (G !== "object")
          return new g("Invalid " + F + " `" + j + "` of type " + ("`" + G + "` supplied to `" + M + "`, expected an object."));
        for (var K in L)
          if (r(L, K)) {
            var z = v(L, K, M, F, j + "." + K, t);
            if (z instanceof Error)
              return z;
          }
        return null;
      }
      return h(P);
    }
    function J(v) {
      if (!Array.isArray(v))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var P = 0; P < v.length; P++) {
        var I = v[P];
        if (typeof I != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ie(I) + " at index " + P + "."
          ), a;
      }
      function V(M, F, j, L, G) {
        for (var K = [], z = 0; z < v.length; z++) {
          var de = v[z], C = de(M, F, j, L, G, t);
          if (C == null)
            return null;
          C.data && r(C.data, "expectedType") && K.push(C.data.expectedType);
        }
        var U = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new g("Invalid " + L + " `" + G + "` supplied to " + ("`" + j + "`" + U + "."));
      }
      return h(V);
    }
    function Y() {
      function v(P, I, V, M, F) {
        return A(P[I]) ? null : new g("Invalid " + M + " `" + F + "` supplied to " + ("`" + V + "`, expected a ReactNode."));
      }
      return h(v);
    }
    function q(v, P, I, V, M) {
      return new g(
        (v || "React class") + ": " + P + " type `" + I + "." + V + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + M + "`."
      );
    }
    function W(v) {
      function P(I, V, M, F, j) {
        var L = I[V], G = $(L);
        if (G !== "object")
          return new g("Invalid " + F + " `" + j + "` of type `" + G + "` " + ("supplied to `" + M + "`, expected `object`."));
        for (var K in v) {
          var z = v[K];
          if (typeof z != "function")
            return q(M, F, j, K, D(z));
          var de = z(L, K, M, F, j + "." + K, t);
          if (de)
            return de;
        }
        return null;
      }
      return h(P);
    }
    function ee(v) {
      function P(I, V, M, F, j) {
        var L = I[V], G = $(L);
        if (G !== "object")
          return new g("Invalid " + F + " `" + j + "` of type `" + G + "` " + ("supplied to `" + M + "`, expected `object`."));
        var K = n({}, I[V], v);
        for (var z in K) {
          var de = v[z];
          if (r(v, z) && typeof de != "function")
            return q(M, F, j, z, D(de));
          if (!de)
            return new g(
              "Invalid " + F + " `" + j + "` key `" + z + "` supplied to `" + M + "`.\nBad object: " + JSON.stringify(I[V], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(v), null, "  ")
            );
          var C = de(L, z, M, F, j + "." + z, t);
          if (C)
            return C;
        }
        return null;
      }
      return h(P);
    }
    function A(v) {
      switch (typeof v) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !v;
        case "object":
          if (Array.isArray(v))
            return v.every(A);
          if (v === null || c(v))
            return !0;
          var P = p(v);
          if (P) {
            var I = P.call(v), V;
            if (P !== v.entries) {
              for (; !(V = I.next()).done; )
                if (!A(V.value))
                  return !1;
            } else
              for (; !(V = I.next()).done; ) {
                var M = V.value;
                if (M && !A(M[1]))
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
    function D(v) {
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
      var P = D(v);
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
    function Z(v) {
      return !v.constructor || !v.constructor.name ? f : v.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, Yn;
}
var Jn, Yt;
function si() {
  if (Yt)
    return Jn;
  Yt = 1;
  var e = gt();
  function n() {
  }
  function t() {
  }
  return t.resetWarningCache = n, Jn = function() {
    function r(a, c, l, u, d, p) {
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
  var ai = _r(), ci = !0;
  ct.exports = ii()(ai.isElement, ci);
} else
  ct.exports = si()();
var li = ct.exports;
const s = /* @__PURE__ */ Zo(li);
function Mr(e) {
  var n, t, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (n = 0; n < o; n++)
        e[n] && (t = Mr(e[n])) && (r && (r += " "), r += t);
    } else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function Oe() {
  for (var e, n, t = 0, r = "", o = arguments.length; t < o; t++)
    (e = arguments[t]) && (n = Mr(e)) && (r && (r += " "), r += n);
  return r;
}
function yn(e, n) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || n(...r);
  };
}
function Ae(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ar(e) {
  if (!Ae(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((t) => {
    n[t] = Ar(e[t]);
  }), n;
}
function we(e, n, t = {
  clone: !0
}) {
  const r = t.clone ? x({}, e) : e;
  return Ae(e) && Ae(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && (Ae(n[o]) && o in e && Ae(e[o]) ? r[o] = we(e[o], n[o], t) : t.clone ? r[o] = Ae(n[o]) ? Ar(n[o]) : n[o] : r[o] = n[o]);
  }), r;
}
function ui(e) {
  const {
    prototype: n = {}
  } = e;
  return !!n.isReactComponent;
}
function Dr(e, n, t, r, o) {
  const i = e[n], a = o || n;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  const l = i.type;
  return typeof l == "function" && !ui(l) && (c = "Did you accidentally use a plain function component for an element instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Br = yn(s.element, Dr);
Br.isRequired = yn(s.element.isRequired, Dr);
const An = Br;
function di(e) {
  const {
    prototype: n = {}
  } = e;
  return !!n.isReactComponent;
}
function fi(e, n, t, r, o) {
  const i = e[n], a = o || n;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  return typeof i == "function" && !di(i) && (c = "Did you accidentally provide a plain function component instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const pi = yn(s.elementType, fi), hi = "exact-prop: ​";
function jr(e) {
  return process.env.NODE_ENV === "production" ? e : x({}, e, {
    [hi]: (n) => {
      const t = Object.keys(n).filter((r) => !e.hasOwnProperty(r));
      return t.length > 0 ? new Error(`The following props are not supported: ${t.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function rn(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let t = 1; t < arguments.length; t += 1)
    n += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
const mi = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function gi(e) {
  const n = `${e}`.match(mi);
  return n && n[1] || "";
}
function Lr(e, n = "") {
  return e.displayName || e.name || gi(e) || n;
}
function Jt(e, n, t) {
  const r = Lr(n);
  return e.displayName || (r !== "" ? `${t}(${r})` : t);
}
function bi(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Lr(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Cn.ForwardRef:
          return Jt(e, e.render, "ForwardRef");
        case Cn.Memo:
          return Jt(e, e.type, "memo");
        default:
          return;
      }
  }
}
function hn(e, n, t, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[n], a = o || n;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an HTMLElement.`) : null;
}
const yi = s.oneOfType([s.func, s.object]), vi = yi;
function Be(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : rn(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Zt(...e) {
  return e.reduce((n, t) => t == null ? n : function(...o) {
    n.apply(this, o), t.apply(this, o);
  }, () => {
  });
}
function Ei(e, n = 166) {
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
function ye(e) {
  return e && e.ownerDocument || document;
}
function mn(e) {
  return ye(e).defaultView || window;
}
function lt(e, n) {
  typeof e == "function" ? e(n) : e && (e.current = n);
}
const xi = typeof window < "u" ? S.useLayoutEffect : S.useEffect, Pn = xi;
function Qt(e) {
  const n = S.useRef(e);
  return Pn(() => {
    n.current = e;
  }), S.useRef((...t) => (
    // @ts-expect-error hide `this`
    (0, n.current)(...t)
  )).current;
}
function $e(...e) {
  return S.useMemo(() => e.every((n) => n == null) ? null : (n) => {
    e.forEach((t) => {
      lt(t, n);
    });
  }, e);
}
const er = {};
function Ti(e, n) {
  const t = S.useRef(er);
  return t.current === er && (t.current = e(n)), t;
}
const ki = [];
function Si(e) {
  S.useEffect(e, ki);
}
class bt {
  constructor() {
    this.currentId = 0, this.clear = () => {
      this.currentId !== 0 && (clearTimeout(this.currentId), this.currentId = 0);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new bt();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(n, t) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = 0, t();
    }, n);
  }
}
function wi() {
  const e = Ti(bt.create).current;
  return Si(e.disposeEffect), e;
}
function Fr(e) {
  const n = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - n);
}
function Oi(e) {
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
function Ci(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Pi = Number.isInteger || Ci;
function Vr(e, n, t, r) {
  const o = e[n];
  if (o == null || !Pi(o)) {
    const i = Oi(o);
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
  const t = x({}, n);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      t[r] = x({}, e[r], t[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = n[r];
      t[r] = {}, !i || !Object.keys(i) ? t[r] = o : !o || !Object.keys(o) ? t[r] = i : (t[r] = x({}, i), Object.keys(o).forEach((a) => {
        t[r][a] = Hr(o[a], i[a]);
      }));
    } else
      t[r] === void 0 && (t[r] = e[r]);
  }), t;
}
function Fe(e, n, t = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((i, a) => {
        if (a) {
          const c = n(a);
          c !== "" && i.push(c), t && t[a] && i.push(t[a]);
        }
        return i;
      }, []).join(" ");
    }
  ), r;
}
const nr = (e) => e, Ni = () => {
  let e = nr;
  return {
    configure(n) {
      e = n;
    },
    generate(n) {
      return e(n);
    },
    reset() {
      e = nr;
    }
  };
}, Ri = Ni(), $i = Ri, _i = {
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
function Pe(e, n, t = "Mui") {
  const r = _i[n];
  return r ? `${t}-${r}` : `${$i.generate(e)}-${n}`;
}
function Ve(e, n, t = "Mui") {
  const r = {};
  return n.forEach((o) => {
    r[o] = Pe(e, o, t);
  }), r;
}
function Ii(e, n = Number.MIN_SAFE_INTEGER, t = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, t));
}
function qr(e) {
  return typeof e == "string";
}
function Mi(e, n, t) {
  return e === void 0 || qr(e) ? n : x({}, n, {
    ownerState: x({}, n.ownerState, t)
  });
}
function Wr(e, n = []) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !n.includes(r)).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function Ai(e, n, t) {
  return typeof e == "function" ? e(n, t) : e;
}
function Gr(e) {
  var n, t, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (n = 0; n < o; n++)
        e[n] && (t = Gr(e[n])) && (r && (r += " "), r += t);
    } else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function tr() {
  for (var e, n, t = 0, r = "", o = arguments.length; t < o; t++)
    (e = arguments[t]) && (n = Gr(e)) && (r && (r += " "), r += n);
  return r;
}
function rr(e) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((t) => !(t.match(/^on[A-Z]/) && typeof e[t] == "function")).forEach((t) => {
    n[t] = e[t];
  }), n;
}
function Di(e) {
  const {
    getSlotProps: n,
    additionalProps: t,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!n) {
    const b = tr(t == null ? void 0 : t.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), y = x({}, t == null ? void 0 : t.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = x({}, t, o, r);
    return b.length > 0 && (g.className = b), Object.keys(y).length > 0 && (g.style = y), {
      props: g,
      internalRef: void 0
    };
  }
  const a = Wr(x({}, o, r)), c = rr(r), l = rr(o), u = n(a), d = tr(u == null ? void 0 : u.className, t == null ? void 0 : t.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), p = x({}, u == null ? void 0 : u.style, t == null ? void 0 : t.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = x({}, u, t, l, c);
  return d.length > 0 && (f.className = d), Object.keys(p).length > 0 && (f.style = p), {
    props: f,
    internalRef: u.ref
  };
}
const Bi = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function on(e) {
  var n;
  const {
    elementType: t,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, a = ae(e, Bi), c = i ? {} : Ai(r, o), {
    props: l,
    internalRef: u
  } = Di(x({}, a, {
    externalSlotProps: c
  })), d = $e(u, c == null ? void 0 : c.ref, (n = e.additionalProps) == null ? void 0 : n.ref);
  return Mi(t, x({}, l, {
    ref: d
  }), o);
}
const ji = ["values", "unit", "step"], Li = (e) => {
  const n = Object.keys(e).map((t) => ({
    key: t,
    val: e[t]
  })) || [];
  return n.sort((t, r) => t.val - r.val), n.reduce((t, r) => x({}, t, {
    [r.key]: r.val
  }), {});
};
function Fi(e) {
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
  } = e, o = ae(e, ji), i = Li(n), a = Object.keys(i);
  function c(f) {
    return `@media (min-width:${typeof n[f] == "number" ? n[f] : f}${t})`;
  }
  function l(f) {
    return `@media (max-width:${(typeof n[f] == "number" ? n[f] : f) - r / 100}${t})`;
  }
  function u(f, b) {
    const y = a.indexOf(b);
    return `@media (min-width:${typeof n[f] == "number" ? n[f] : f}${t}) and (max-width:${(y !== -1 && typeof n[a[y]] == "number" ? n[a[y]] : b) - r / 100}${t})`;
  }
  function d(f) {
    return a.indexOf(f) + 1 < a.length ? u(f, a[a.indexOf(f) + 1]) : c(f);
  }
  function p(f) {
    const b = a.indexOf(f);
    return b === 0 ? c(a[1]) : b === a.length - 1 ? l(a[b]) : u(f, a[a.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return x({
    keys: a,
    values: i,
    up: c,
    down: l,
    between: u,
    only: d,
    not: p,
    unit: t
  }, o);
}
const Vi = {
  borderRadius: 4
}, zi = Vi, Ui = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, _e = Ui;
function fn(e, n) {
  return n ? we(e, n, {
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
}, or = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${yt[e]}px)`
};
function Ce(e, n, t) {
  const r = e.theme || {};
  if (Array.isArray(n)) {
    const i = r.breakpoints || or;
    return n.reduce((a, c, l) => (a[i.up(i.keys[l])] = t(n[l]), a), {});
  }
  if (typeof n == "object") {
    const i = r.breakpoints || or;
    return Object.keys(n).reduce((a, c) => {
      if (Object.keys(i.values || yt).indexOf(c) !== -1) {
        const l = i.up(c);
        a[l] = t(n[c], c);
      } else {
        const l = c;
        a[l] = n[l];
      }
      return a;
    }, {});
  }
  return t(n);
}
function Hi(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function qi(e, n) {
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
function Nn(e, n, t, r = t) {
  let o;
  return typeof e == "function" ? o = e(t) : Array.isArray(e) ? o = e[t] || r : o = Dn(e, t) || r, n && (o = n(o, r, e)), o;
}
function ue(e) {
  const {
    prop: n,
    cssProperty: t = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (a) => {
    if (a[n] == null)
      return null;
    const c = a[n], l = a.theme, u = Dn(l, r) || {};
    return Ce(a, c, (p) => {
      let f = Nn(u, o, p);
      return p === f && typeof p == "string" && (f = Nn(u, o, `${n}${p === "default" ? "" : Be(p)}`, p)), t === !1 ? f : {
        [t]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: _e
  } : {}, i.filterProps = [n], i;
}
function Wi(e) {
  const n = {};
  return (t) => (n[t] === void 0 && (n[t] = e(t)), n[t]);
}
const Gi = {
  m: "margin",
  p: "padding"
}, Ki = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ir = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Xi = Wi((e) => {
  if (e.length > 2)
    if (ir[e])
      e = ir[e];
    else
      return [e];
  const [n, t] = e.split(""), r = Gi[n], o = Ki[t] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Bn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], jn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Yi = [...Bn, ...jn];
function vn(e, n, t, r) {
  var o;
  const i = (o = Dn(e, n, !1)) != null ? o : t;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Kr(e) {
  return vn(e, "spacing", 8, "spacing");
}
function En(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const t = Math.abs(n), r = e(t);
  return n >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Ji(e, n) {
  return (t) => e.reduce((r, o) => (r[o] = En(n, t), r), {});
}
function Zi(e, n, t, r) {
  if (n.indexOf(t) === -1)
    return null;
  const o = Xi(t), i = Ji(o, r), a = e[t];
  return Ce(e, a, i);
}
function Xr(e, n) {
  const t = Kr(e.theme);
  return Object.keys(e).map((r) => Zi(e, n, r, t)).reduce(fn, {});
}
function ce(e) {
  return Xr(e, Bn);
}
ce.propTypes = process.env.NODE_ENV !== "production" ? Bn.reduce((e, n) => (e[n] = _e, e), {}) : {};
ce.filterProps = Bn;
function le(e) {
  return Xr(e, jn);
}
le.propTypes = process.env.NODE_ENV !== "production" ? jn.reduce((e, n) => (e[n] = _e, e), {}) : {};
le.filterProps = jn;
process.env.NODE_ENV !== "production" && Yi.reduce((e, n) => (e[n] = _e, e), {});
function Qi(e = 8) {
  if (e.mui)
    return e;
  const n = Kr({
    spacing: e
  }), t = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const a = n(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return t.mui = !0, t;
}
function Ln(...e) {
  const n = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), t = (r) => Object.keys(r).reduce((o, i) => n[i] ? fn(o, n[i](r)) : o, {});
  return t.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, t.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), t;
}
function be(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ee(e, n) {
  return ue({
    prop: e,
    themeKey: "borders",
    transform: n
  });
}
const es = Ee("border", be), ns = Ee("borderTop", be), ts = Ee("borderRight", be), rs = Ee("borderBottom", be), os = Ee("borderLeft", be), is = Ee("borderColor"), ss = Ee("borderTopColor"), as = Ee("borderRightColor"), cs = Ee("borderBottomColor"), ls = Ee("borderLeftColor"), us = Ee("outline", be), ds = Ee("outlineColor"), Fn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = vn(e.theme, "shape.borderRadius", 4, "borderRadius"), t = (r) => ({
      borderRadius: En(n, r)
    });
    return Ce(e, e.borderRadius, t);
  }
  return null;
};
Fn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: _e
} : {};
Fn.filterProps = ["borderRadius"];
Ln(es, ns, ts, rs, os, is, ss, as, cs, ls, Fn, us, ds);
const Vn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = vn(e.theme, "spacing", 8, "gap"), t = (r) => ({
      gap: En(n, r)
    });
    return Ce(e, e.gap, t);
  }
  return null;
};
Vn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: _e
} : {};
Vn.filterProps = ["gap"];
const zn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = vn(e.theme, "spacing", 8, "columnGap"), t = (r) => ({
      columnGap: En(n, r)
    });
    return Ce(e, e.columnGap, t);
  }
  return null;
};
zn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: _e
} : {};
zn.filterProps = ["columnGap"];
const Un = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = vn(e.theme, "spacing", 8, "rowGap"), t = (r) => ({
      rowGap: En(n, r)
    });
    return Ce(e, e.rowGap, t);
  }
  return null;
};
Un.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: _e
} : {};
Un.filterProps = ["rowGap"];
const fs = ue({
  prop: "gridColumn"
}), ps = ue({
  prop: "gridRow"
}), hs = ue({
  prop: "gridAutoFlow"
}), ms = ue({
  prop: "gridAutoColumns"
}), gs = ue({
  prop: "gridAutoRows"
}), bs = ue({
  prop: "gridTemplateColumns"
}), ys = ue({
  prop: "gridTemplateRows"
}), vs = ue({
  prop: "gridTemplateAreas"
}), Es = ue({
  prop: "gridArea"
});
Ln(Vn, zn, Un, fs, ps, hs, ms, gs, bs, ys, vs, Es);
function tn(e, n) {
  return n === "grey" ? n : e;
}
const xs = ue({
  prop: "color",
  themeKey: "palette",
  transform: tn
}), Ts = ue({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: tn
}), ks = ue({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: tn
});
Ln(xs, Ts, ks);
function me(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Ss = ue({
  prop: "width",
  transform: me
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
        maxWidth: me(t)
      };
    };
    return Ce(e, e.maxWidth, n);
  }
  return null;
};
vt.filterProps = ["maxWidth"];
const ws = ue({
  prop: "minWidth",
  transform: me
}), Os = ue({
  prop: "height",
  transform: me
}), Cs = ue({
  prop: "maxHeight",
  transform: me
}), Ps = ue({
  prop: "minHeight",
  transform: me
});
ue({
  prop: "size",
  cssProperty: "width",
  transform: me
});
ue({
  prop: "size",
  cssProperty: "height",
  transform: me
});
const Ns = ue({
  prop: "boxSizing"
});
Ln(Ss, vt, ws, Os, Cs, Ps, Ns);
const Rs = {
  // borders
  border: {
    themeKey: "borders",
    transform: be
  },
  borderTop: {
    themeKey: "borders",
    transform: be
  },
  borderRight: {
    themeKey: "borders",
    transform: be
  },
  borderBottom: {
    themeKey: "borders",
    transform: be
  },
  borderLeft: {
    themeKey: "borders",
    transform: be
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
    transform: be
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
    transform: tn
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: tn
  },
  backgroundColor: {
    themeKey: "palette",
    transform: tn
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
    transform: me
  },
  maxWidth: {
    style: vt
  },
  minWidth: {
    transform: me
  },
  height: {
    transform: me
  },
  maxHeight: {
    transform: me
  },
  minHeight: {
    transform: me
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
}, Et = Rs;
function $s(...e) {
  const n = e.reduce((r, o) => r.concat(Object.keys(o)), []), t = new Set(n);
  return e.every((r) => t.size === Object.keys(r).length);
}
function _s(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Is() {
  function e(t, r, o, i) {
    const a = {
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
    return p ? p(a) : Ce(a, r, (y) => {
      let g = Nn(f, d, y);
      return y === g && typeof y == "string" && (g = Nn(f, d, `${t}${y === "default" ? "" : Be(y)}`, y)), l === !1 ? g : {
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
    const a = (r = i.unstable_sxConfig) != null ? r : Et;
    function c(l) {
      let u = l;
      if (typeof l == "function")
        u = l(i);
      else if (typeof l != "object")
        return l;
      if (!u)
        return null;
      const d = Hi(i.breakpoints), p = Object.keys(d);
      let f = d;
      return Object.keys(u).forEach((b) => {
        const y = _s(u[b], i);
        if (y != null)
          if (typeof y == "object")
            if (a[b])
              f = fn(f, e(b, y, i, a));
            else {
              const g = Ce({
                theme: i
              }, y, (h) => ({
                [b]: h
              }));
              $s(g, y) ? f[b] = n({
                sx: y,
                theme: i
              }) : f = fn(f, g);
            }
          else
            f = fn(f, e(b, y, i, a));
      }), qi(p, f);
    }
    return Array.isArray(o) ? o.map(c) : c(o);
  }
  return n;
}
const Yr = Is();
Yr.filterProps = ["sx"];
const xt = Yr;
function Ms(e, n) {
  const t = this;
  return t.vars && typeof t.getColorSchemeSelector == "function" ? {
    [t.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: n
  } : t.palette.mode === e ? n : {};
}
const As = ["breakpoints", "palette", "spacing", "shape"];
function Tt(e = {}, ...n) {
  const {
    breakpoints: t = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, a = ae(e, As), c = Fi(t), l = Qi(o);
  let u = we({
    breakpoints: c,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: x({
      mode: "light"
    }, r),
    spacing: l,
    shape: x({}, zi, i)
  }, a);
  return u.applyStyles = Ms, u = n.reduce((d, p) => we(d, p), u), u.unstable_sxConfig = x({}, Et, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(p) {
    return xt({
      sx: p,
      theme: this
    });
  }, u;
}
function Ds(e) {
  return Object.keys(e).length === 0;
}
function Bs(e = null) {
  const n = S.useContext(Do);
  return !n || Ds(n) ? e : n;
}
const js = Tt();
function Jr(e = js) {
  return Bs(e);
}
const Ls = ["ownerState"], Fs = ["variants"], Vs = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function zs(e) {
  return Object.keys(e).length === 0;
}
function Us(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Sn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Hs = Tt(), sr = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function kn({
  defaultTheme: e,
  theme: n,
  themeId: t
}) {
  return zs(n) ? e : n[t] || n;
}
function qs(e) {
  return e ? (n, t) => t[e] : null;
}
function wn(e, n) {
  let {
    ownerState: t
  } = n, r = ae(n, Ls);
  const o = typeof e == "function" ? e(x({
    ownerState: t
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => wn(i, x({
      ownerState: t
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let c = ae(o, Fs);
    return i.forEach((l) => {
      let u = !0;
      typeof l.props == "function" ? u = l.props(x({
        ownerState: t
      }, r)) : Object.keys(l.props).forEach((d) => {
        (t == null ? void 0 : t[d]) !== l.props[d] && r[d] !== l.props[d] && (u = !1);
      }), u && (Array.isArray(c) || (c = [c]), c.push(typeof l.style == "function" ? l.style(x({
        ownerState: t
      }, r)) : l.style));
    }), c;
  }
  return o;
}
function Ws(e = {}) {
  const {
    themeId: n,
    defaultTheme: t = Hs,
    rootShouldForwardProp: r = Sn,
    slotShouldForwardProp: o = Sn
  } = e, i = (a) => xt(x({}, a, {
    theme: kn(x({}, a, {
      defaultTheme: t,
      themeId: n
    }))
  }));
  return i.__mui_systemSx = !0, (a, c = {}) => {
    Bo(a, (m) => m.filter((_) => !(_ != null && _.__mui_systemSx)));
    const {
      name: l,
      slot: u,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = qs(sr(u))
    } = c, b = ae(c, Vs), y = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), g = p || !1;
    let h;
    process.env.NODE_ENV !== "production" && l && (h = `${l}-${sr(u || "Root")}`);
    let T = Sn;
    u === "Root" || u === "root" ? T = r : u ? T = o : Us(a) && (T = void 0);
    const B = Ao(a, x({
      shouldForwardProp: T,
      label: h
    }, b)), E = (m) => typeof m == "function" && m.__emotion_real !== m || Ae(m) ? (_) => wn(m, x({}, _, {
      theme: kn({
        theme: _.theme,
        defaultTheme: t,
        themeId: n
      })
    })) : m, w = (m, ..._) => {
      let R = E(m);
      const H = _ ? _.map(E) : [];
      l && f && H.push((q) => {
        const W = kn(x({}, q, {
          defaultTheme: t,
          themeId: n
        }));
        if (!W.components || !W.components[l] || !W.components[l].styleOverrides)
          return null;
        const ee = W.components[l].styleOverrides, A = {};
        return Object.entries(ee).forEach(([N, $]) => {
          A[N] = wn($, x({}, q, {
            theme: W
          }));
        }), f(q, A);
      }), l && !y && H.push((q) => {
        var W;
        const ee = kn(x({}, q, {
          defaultTheme: t,
          themeId: n
        })), A = ee == null || (W = ee.components) == null || (W = W[l]) == null ? void 0 : W.variants;
        return wn({
          variants: A
        }, x({}, q, {
          theme: ee
        }));
      }), g || H.push(i);
      const J = H.length - _.length;
      if (Array.isArray(m) && J > 0) {
        const q = new Array(J).fill("");
        R = [...m, ...q], R.raw = [...m.raw, ...q];
      }
      const Y = B(R, ...H);
      if (process.env.NODE_ENV !== "production") {
        let q;
        l && (q = `${l}${Be(u || "")}`), q === void 0 && (q = `Styled(${bi(a)})`), Y.displayName = q;
      }
      return a.muiName && (Y.muiName = a.muiName), Y;
    };
    return B.withConfig && (w.withConfig = B.withConfig), w;
  };
}
function Gs(e) {
  const {
    theme: n,
    name: t,
    props: r
  } = e;
  return !n || !n.components || !n.components[t] || !n.components[t].defaultProps ? r : Hr(n.components[t].defaultProps, r);
}
function Ks({
  props: e,
  name: n,
  defaultTheme: t,
  themeId: r
}) {
  let o = Jr(t);
  return r && (o = o[r] || o), Gs({
    theme: o,
    name: n,
    props: e
  });
}
function kt(e, n = 0, t = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > t) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${t}].`), Ii(e, n, t);
}
function Xs(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let t = e.match(n);
  return t && t[0].length === 1 && (t = t.map((r) => r + r)), t ? `rgb${t.length === 4 ? "a" : ""}(${t.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function je(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return je(Xs(e));
  const n = e.indexOf("("), t = e.substring(0, n);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(t) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : rn(9, e));
  let r = e.substring(n + 1, e.length - 1), o;
  if (t === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : rn(10, o));
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
function Ys(e) {
  e = je(e);
  const {
    values: n
  } = e, t = n[0], r = n[1] / 100, o = n[2] / 100, i = r * Math.min(o, 1 - o), a = (u, d = (u + t / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let c = "rgb";
  const l = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (c += "a", l.push(n[3])), Hn({
    type: c,
    values: l
  });
}
function ar(e) {
  e = je(e);
  let n = e.type === "hsl" || e.type === "hsla" ? je(Ys(e)).values : e.values;
  return n = n.map((t) => (e.type !== "color" && (t /= 255), t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function cr(e, n) {
  const t = ar(e), r = ar(n);
  return (Math.max(t, r) + 0.05) / (Math.min(t, r) + 0.05);
}
function lr(e, n) {
  return e = je(e), n = kt(n), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${n}` : e.values[3] = n, Hn(e);
}
function Js(e, n) {
  if (e = je(e), n = kt(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] *= 1 - n;
  return Hn(e);
}
function Zs(e, n) {
  if (e = je(e), n = kt(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (255 - e.values[t]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (1 - e.values[t]) * n;
  return Hn(e);
}
function Qs(e, n) {
  return x({
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
const ea = {
  black: "#000",
  white: "#fff"
}, gn = ea, na = {
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
}, ta = na, ra = {
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
}, qe = ra, oa = {
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
}, We = oa, ia = {
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
}, cn = ia, sa = {
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
}, Ge = sa, aa = {
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
}, Ke = aa, ca = {
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
}, Xe = ca, la = ["mode", "contrastThreshold", "tonalOffset"], ur = {
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
    paper: gn.white,
    default: gn.white
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
    primary: gn.white,
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
    active: gn.white,
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
function dr(e, n, t, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[n] || (e.hasOwnProperty(t) ? e[n] = e[t] : n === "light" ? e.light = Zs(e.main, o) : n === "dark" && (e.dark = Js(e.main, i)));
}
function ua(e = "light") {
  return e === "dark" ? {
    main: Ge[200],
    light: Ge[50],
    dark: Ge[400]
  } : {
    main: Ge[700],
    light: Ge[400],
    dark: Ge[800]
  };
}
function da(e = "light") {
  return e === "dark" ? {
    main: qe[200],
    light: qe[50],
    dark: qe[400]
  } : {
    main: qe[500],
    light: qe[300],
    dark: qe[700]
  };
}
function fa(e = "light") {
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
function pa(e = "light") {
  return e === "dark" ? {
    main: Ke[400],
    light: Ke[300],
    dark: Ke[700]
  } : {
    main: Ke[700],
    light: Ke[500],
    dark: Ke[900]
  };
}
function ha(e = "light") {
  return e === "dark" ? {
    main: Xe[400],
    light: Xe[300],
    dark: Xe[700]
  } : {
    main: Xe[800],
    light: Xe[500],
    dark: Xe[900]
  };
}
function ma(e = "light") {
  return e === "dark" ? {
    main: cn[400],
    light: cn[300],
    dark: cn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: cn[500],
    dark: cn[900]
  };
}
function ga(e) {
  const {
    mode: n = "light",
    contrastThreshold: t = 3,
    tonalOffset: r = 0.2
  } = e, o = ae(e, la), i = e.primary || ua(n), a = e.secondary || da(n), c = e.error || fa(n), l = e.info || pa(n), u = e.success || ha(n), d = e.warning || ma(n);
  function p(g) {
    const h = cr(g, Zn.text.primary) >= t ? Zn.text.primary : ur.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const T = cr(g, h);
      T < 3 && console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const f = ({
    color: g,
    name: h,
    mainShade: T = 500,
    lightShade: B = 300,
    darkShade: E = 700
  }) => {
    if (g = x({}, g), !g.main && g[T] && (g.main = g[T]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.` : rn(11, h ? ` (${h})` : "", T));
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
} });` : rn(12, h ? ` (${h})` : "", JSON.stringify(g.main)));
    return dr(g, "light", B, r), dr(g, "dark", E, r), g.contrastText || (g.contrastText = p(g.main)), g;
  }, b = {
    dark: Zn,
    light: ur
  };
  return process.env.NODE_ENV !== "production" && (b[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), we(x({
    // A collection of common colors.
    common: x({}, gn),
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
      color: a,
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
    grey: ta,
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
const ba = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function ya(e) {
  return Math.round(e * 1e5) / 1e5;
}
const fr = {
  textTransform: "uppercase"
}, pr = '"Roboto", "Helvetica", "Arial", sans-serif';
function va(e, n) {
  const t = typeof n == "function" ? n(e) : n, {
    fontFamily: r = pr,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: a = 400,
    fontWeightMedium: c = 500,
    fontWeightBold: l = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: p
  } = t, f = ae(t, ba);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, y = p || ((T) => `${T / u * b}rem`), g = (T, B, E, w, m) => x({
    fontFamily: r,
    fontWeight: T,
    fontSize: y(B),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: E
  }, r === pr ? {
    letterSpacing: `${ya(w / B)}em`
  } : {}, m, d), h = {
    h1: g(i, 96, 1.167, -1.5),
    h2: g(i, 60, 1.2, -0.5),
    h3: g(a, 48, 1.167, 0),
    h4: g(a, 34, 1.235, 0.25),
    h5: g(a, 24, 1.334, 0),
    h6: g(c, 20, 1.6, 0.15),
    subtitle1: g(a, 16, 1.75, 0.15),
    subtitle2: g(c, 14, 1.57, 0.1),
    body1: g(a, 16, 1.5, 0.15),
    body2: g(a, 14, 1.43, 0.15),
    button: g(c, 14, 1.75, 0.4, fr),
    caption: g(a, 12, 1.66, 0.4),
    overline: g(a, 12, 2.66, 1, fr),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return we(x({
    htmlFontSize: u,
    pxToRem: y,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: c,
    fontWeightBold: l
  }, h), f, {
    clone: !1
    // No need to clone deep
  });
}
const Ea = 0.2, xa = 0.14, Ta = 0.12;
function se(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ea})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${xa})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ta})`].join(",");
}
const ka = ["none", se(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), se(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), se(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), se(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), se(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), se(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), se(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), se(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), se(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), se(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), se(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), se(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), se(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), se(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), se(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), se(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), se(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), se(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), se(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), se(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), se(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), se(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), se(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), se(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Sa = ka, wa = ["duration", "easing", "delay"], Oa = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ca = {
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
function hr(e) {
  return `${Math.round(e)}ms`;
}
function Pa(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function Na(e) {
  const n = x({}, Oa, e.easing), t = x({}, Ca, e.duration);
  return x({
    getAutoHeightDuration: Pa,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = t.standard,
        easing: c = n.easeInOut,
        delay: l = 0
      } = i, u = ae(i, wa);
      if (process.env.NODE_ENV !== "production") {
        const d = (f) => typeof f == "string", p = (f) => !isNaN(parseFloat(f));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(a) && !d(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), d(c) || console.error('MUI: Argument "easing" must be a string.'), !p(l) && !d(l) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof a == "string" ? a : hr(a)} ${c} ${typeof l == "string" ? l : hr(l)}`).join(",");
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
}, $a = Ra, _a = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Ia(e = {}, ...n) {
  const {
    mixins: t = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = ae(e, _a);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : rn(18));
  const c = ga(r), l = Tt(e);
  let u = we(l, {
    mixins: Qs(l.breakpoints, t),
    palette: c,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Sa.slice(),
    typography: va(c, i),
    transitions: Na(o),
    zIndex: x({}, $a)
  });
  if (u = we(u, a), u = n.reduce((d, p) => we(d, p), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (f, b) => {
      let y;
      for (y in f) {
        const g = f[y];
        if (d.indexOf(y) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = Pe("", y);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: g
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
  return u.unstable_sxConfig = x({}, Et, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(p) {
    return xt({
      sx: p,
      theme: this
    });
  }, u;
}
const Ma = Ia(), St = Ma, wt = "$$material", Zr = (e) => Sn(e) && e !== "classes", Aa = Ws({
  themeId: wt,
  defaultTheme: St,
  rootShouldForwardProp: Zr
}), Te = Aa;
function ze({
  props: e,
  name: n
}) {
  return Ks({
    props: e,
    name: n,
    defaultTheme: St,
    themeId: wt
  });
}
const Qr = /* @__PURE__ */ S.createContext({});
process.env.NODE_ENV !== "production" && (Qr.displayName = "ListContext");
const Da = Qr;
function Ba(e) {
  return Pe("MuiList", e);
}
Ve("MuiList", ["root", "padding", "dense", "subheader"]);
const ja = ["children", "className", "component", "dense", "disablePadding", "subheader"], La = (e) => {
  const {
    classes: n,
    disablePadding: t,
    dense: r,
    subheader: o
  } = e;
  return Fe({
    root: ["root", !t && "padding", r && "dense", o && "subheader"]
  }, Ba, n);
}, Fa = Te("ul", {
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
}) => x({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), eo = /* @__PURE__ */ S.forwardRef(function(n, t) {
  const r = ze({
    props: n,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: c = !1,
    disablePadding: l = !1,
    subheader: u
  } = r, d = ae(r, ja), p = S.useMemo(() => ({
    dense: c
  }), [c]), f = x({}, r, {
    component: a,
    dense: c,
    disablePadding: l
  }), b = La(f);
  return /* @__PURE__ */ O(Da.Provider, {
    value: p,
    children: /* @__PURE__ */ ve(Fa, x({
      as: a,
      className: Oe(b.root, i),
      ref: t,
      ownerState: f
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (eo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: s.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: s.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const Va = eo, za = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Qn(e, n, t) {
  return e === n ? e.firstChild : n && n.nextElementSibling ? n.nextElementSibling : t ? null : e.firstChild;
}
function mr(e, n, t) {
  return e === n ? t ? e.firstChild : e.lastChild : n && n.previousElementSibling ? n.previousElementSibling : t ? null : e.lastChild;
}
function no(e, n) {
  if (n === void 0)
    return !0;
  let t = e.innerText;
  return t === void 0 && (t = e.textContent), t = t.trim().toLowerCase(), t.length === 0 ? !1 : n.repeating ? t[0] === n.keys[0] : t.indexOf(n.keys.join("")) === 0;
}
function ln(e, n, t, r, o, i) {
  let a = !1, c = o(e, n, n ? t : !1);
  for (; c; ) {
    if (c === e.firstChild) {
      if (a)
        return !1;
      a = !0;
    }
    const l = r ? !1 : c.disabled || c.getAttribute("aria-disabled") === "true";
    if (!c.hasAttribute("tabindex") || !no(c, i) || l)
      c = o(e, c, t);
    else
      return c.focus(), !0;
  }
  return !1;
}
const to = /* @__PURE__ */ S.forwardRef(function(n, t) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: a,
    className: c,
    disabledItemsFocusable: l = !1,
    disableListWrap: u = !1,
    onKeyDown: d,
    variant: p = "selectedMenu"
  } = n, f = ae(n, za), b = S.useRef(null), y = S.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Pn(() => {
    o && b.current.focus();
  }, [o]), S.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (E, w) => {
      const m = !b.current.style.width;
      if (E.clientHeight < b.current.clientHeight && m) {
        const _ = `${Fr(ye(E))}px`;
        b.current.style[w.direction === "rtl" ? "paddingLeft" : "paddingRight"] = _, b.current.style.width = `calc(100% + ${_})`;
      }
      return b.current;
    }
  }), []);
  const g = (E) => {
    const w = b.current, m = E.key, _ = ye(w).activeElement;
    if (m === "ArrowDown")
      E.preventDefault(), ln(w, _, u, l, Qn);
    else if (m === "ArrowUp")
      E.preventDefault(), ln(w, _, u, l, mr);
    else if (m === "Home")
      E.preventDefault(), ln(w, null, u, l, Qn);
    else if (m === "End")
      E.preventDefault(), ln(w, null, u, l, mr);
    else if (m.length === 1) {
      const R = y.current, H = m.toLowerCase(), J = performance.now();
      R.keys.length > 0 && (J - R.lastTime > 500 ? (R.keys = [], R.repeating = !0, R.previousKeyMatched = !0) : R.repeating && H !== R.keys[0] && (R.repeating = !1)), R.lastTime = J, R.keys.push(H);
      const Y = _ && !R.repeating && no(_, R);
      R.previousKeyMatched && (Y || ln(w, _, !1, l, Qn, R)) ? E.preventDefault() : R.previousKeyMatched = !1;
    }
    d && d(E);
  }, h = $e(b, t);
  let T = -1;
  S.Children.forEach(a, (E, w) => {
    if (!/* @__PURE__ */ S.isValidElement(E)) {
      T === w && (T += 1, T >= a.length && (T = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Cn.isFragment(E) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), E.props.disabled || (p === "selectedMenu" && E.props.selected || T === -1) && (T = w), T === w && (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) && (T += 1, T >= a.length && (T = -1));
  });
  const B = S.Children.map(a, (E, w) => {
    if (w === T) {
      const m = {};
      return i && (m.autoFocus = !0), E.props.tabIndex === void 0 && p === "selectedMenu" && (m.tabIndex = 0), /* @__PURE__ */ S.cloneElement(E, m);
    }
    return E;
  });
  return /* @__PURE__ */ O(Va, x({
    role: "menu",
    ref: h,
    className: c,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, f, {
    children: B
  }));
});
process.env.NODE_ENV !== "production" && (to.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: s.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: s.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: s.node,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: s.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: s.bool,
  /**
   * @ignore
   */
  onKeyDown: s.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: s.oneOf(["menu", "selectedMenu"])
});
const Ua = to, Ha = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function qa(e) {
  const n = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(n) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : n;
}
function Wa(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const n = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let t = n(`[name="${e.name}"]:checked`);
  return t || (t = n(`[name="${e.name}"]`)), t !== e;
}
function Ga(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Wa(e));
}
function Ka(e) {
  const n = [], t = [];
  return Array.from(e.querySelectorAll(Ha)).forEach((r, o) => {
    const i = qa(r);
    i === -1 || !Ga(r) || (i === 0 ? n.push(r) : t.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), t.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(n);
}
function Xa() {
  return !0;
}
function Rn(e) {
  const {
    children: n,
    disableAutoFocus: t = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Ka,
    isEnabled: a = Xa,
    open: c
  } = e, l = S.useRef(!1), u = S.useRef(null), d = S.useRef(null), p = S.useRef(null), f = S.useRef(null), b = S.useRef(!1), y = S.useRef(null), g = $e(n.ref, y), h = S.useRef(null);
  S.useEffect(() => {
    !c || !y.current || (b.current = !t);
  }, [t, c]), S.useEffect(() => {
    if (!c || !y.current)
      return;
    const E = ye(y.current);
    return y.current.contains(E.activeElement) || (y.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), y.current.setAttribute("tabIndex", "-1")), b.current && y.current.focus()), () => {
      o || (p.current && p.current.focus && (l.current = !0, p.current.focus()), p.current = null);
    };
  }, [c]), S.useEffect(() => {
    if (!c || !y.current)
      return;
    const E = ye(y.current), w = (R) => {
      h.current = R, !(r || !a() || R.key !== "Tab") && E.activeElement === y.current && R.shiftKey && (l.current = !0, d.current && d.current.focus());
    }, m = () => {
      const R = y.current;
      if (R === null)
        return;
      if (!E.hasFocus() || !a() || l.current) {
        l.current = !1;
        return;
      }
      if (R.contains(E.activeElement) || r && E.activeElement !== u.current && E.activeElement !== d.current)
        return;
      if (E.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!b.current)
        return;
      let H = [];
      if ((E.activeElement === u.current || E.activeElement === d.current) && (H = i(y.current)), H.length > 0) {
        var J, Y;
        const q = !!((J = h.current) != null && J.shiftKey && ((Y = h.current) == null ? void 0 : Y.key) === "Tab"), W = H[0], ee = H[H.length - 1];
        typeof W != "string" && typeof ee != "string" && (q ? ee.focus() : W.focus());
      } else
        R.focus();
    };
    E.addEventListener("focusin", m), E.addEventListener("keydown", w, !0);
    const _ = setInterval(() => {
      E.activeElement && E.activeElement.tagName === "BODY" && m();
    }, 50);
    return () => {
      clearInterval(_), E.removeEventListener("focusin", m), E.removeEventListener("keydown", w, !0);
    };
  }, [t, r, o, a, c, i]);
  const T = (E) => {
    p.current === null && (p.current = E.relatedTarget), b.current = !0, f.current = E.target;
    const w = n.props.onFocus;
    w && w(E);
  }, B = (E) => {
    p.current === null && (p.current = E.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ ve(S.Fragment, {
    children: [/* @__PURE__ */ O("div", {
      tabIndex: c ? 0 : -1,
      onFocus: B,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ S.cloneElement(n, {
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
process.env.NODE_ENV !== "production" && (Rn.propTypes = {
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
  disableAutoFocus: s.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: s.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: s.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: s.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: s.func,
  /**
   * If `true`, focus is locked.
   */
  open: s.bool.isRequired
});
process.env.NODE_ENV !== "production" && (Rn["propTypes"] = jr(Rn.propTypes));
function Ya(e) {
  return typeof e == "function" ? e() : e;
}
const $n = /* @__PURE__ */ S.forwardRef(function(n, t) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = n, [a, c] = S.useState(null), l = $e(/* @__PURE__ */ S.isValidElement(r) ? r.ref : null, t);
  if (Pn(() => {
    i || c(Ya(o) || document.body);
  }, [o, i]), Pn(() => {
    if (a && !i)
      return lt(t, a), () => {
        lt(t, null);
      };
  }, [t, a, i]), i) {
    if (/* @__PURE__ */ S.isValidElement(r)) {
      const u = {
        ref: l
      };
      return /* @__PURE__ */ S.cloneElement(r, u);
    }
    return /* @__PURE__ */ O(S.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ O(S.Fragment, {
    children: a && /* @__PURE__ */ jo.createPortal(r, a)
  });
});
process.env.NODE_ENV !== "production" && ($n.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: s.node,
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
  container: s.oneOfType([hn, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && ($n["propTypes"] = jr($n.propTypes));
function Ja(e) {
  const n = ye(e);
  return n.body === e ? mn(e).innerWidth > n.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function pn(e, n) {
  n ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function gr(e) {
  return parseInt(mn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Za(e) {
  const t = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return t || r;
}
function br(e, n, t, r, o) {
  const i = [n, t, ...r];
  [].forEach.call(e.children, (a) => {
    const c = i.indexOf(a) === -1, l = !Za(a);
    c && l && pn(a, o);
  });
}
function et(e, n) {
  let t = -1;
  return e.some((r, o) => n(r) ? (t = o, !0) : !1), t;
}
function Qa(e, n) {
  const t = [], r = e.container;
  if (!n.disableScrollLock) {
    if (Ja(r)) {
      const a = Fr(ye(r));
      t.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${gr(r) + a}px`;
      const c = ye(r).querySelectorAll(".mui-fixed");
      [].forEach.call(c, (l) => {
        t.push({
          value: l.style.paddingRight,
          property: "padding-right",
          el: l
        }), l.style.paddingRight = `${gr(l) + a}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = ye(r).body;
    else {
      const a = r.parentElement, c = mn(r);
      i = (a == null ? void 0 : a.nodeName) === "HTML" && c.getComputedStyle(a).overflowY === "scroll" ? a : r;
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
      el: a,
      property: c
    }) => {
      i ? a.style.setProperty(c, i) : a.style.removeProperty(c);
    });
  };
}
function ec(e) {
  const n = [];
  return [].forEach.call(e.children, (t) => {
    t.getAttribute("aria-hidden") === "true" && n.push(t);
  }), n;
}
class nc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(n, t) {
    let r = this.modals.indexOf(n);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(n), n.modalRef && pn(n.modalRef, !1);
    const o = ec(t);
    br(t, n.mount, n.modalRef, o, !0);
    const i = et(this.containers, (a) => a.container === t);
    return i !== -1 ? (this.containers[i].modals.push(n), r) : (this.containers.push({
      modals: [n],
      container: t,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(n, t) {
    const r = et(this.containers, (i) => i.modals.indexOf(n) !== -1), o = this.containers[r];
    o.restore || (o.restore = Qa(o, t));
  }
  remove(n, t = !0) {
    const r = this.modals.indexOf(n);
    if (r === -1)
      return r;
    const o = et(this.containers, (a) => a.modals.indexOf(n) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(n), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), n.modalRef && pn(n.modalRef, t), br(i.container, n.mount, n.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && pn(a.modalRef, !1);
    }
    return r;
  }
  isTopModal(n) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === n;
  }
}
function tc(e) {
  return typeof e == "function" ? e() : e;
}
function rc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const oc = new nc();
function ic(e) {
  const {
    container: n,
    disableEscapeKeyDown: t = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = oc,
    closeAfterTransition: i = !1,
    onTransitionEnter: a,
    onTransitionExited: c,
    children: l,
    onClose: u,
    open: d,
    rootRef: p
  } = e, f = S.useRef({}), b = S.useRef(null), y = S.useRef(null), g = $e(y, p), [h, T] = S.useState(!d), B = rc(l);
  let E = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (E = !1);
  const w = () => ye(b.current), m = () => (f.current.modalRef = y.current, f.current.mount = b.current, f.current), _ = () => {
    o.mount(m(), {
      disableScrollLock: r
    }), y.current && (y.current.scrollTop = 0);
  }, R = Qt(() => {
    const $ = tc(n) || w().body;
    o.add(m(), $), y.current && _();
  }), H = S.useCallback(() => o.isTopModal(m()), [o]), J = Qt(($) => {
    b.current = $, $ && (d && H() ? _() : y.current && pn(y.current, E));
  }), Y = S.useCallback(() => {
    o.remove(m(), E);
  }, [E, o]);
  S.useEffect(() => () => {
    Y();
  }, [Y]), S.useEffect(() => {
    d ? R() : (!B || !i) && Y();
  }, [d, Y, B, i, R]);
  const q = ($) => (D) => {
    var ie;
    (ie = $.onKeyDown) == null || ie.call($, D), !(D.key !== "Escape" || D.which === 229 || // Wait until IME is settled.
    !H()) && (t || (D.stopPropagation(), u && u(D, "escapeKeyDown")));
  }, W = ($) => (D) => {
    var ie;
    (ie = $.onClick) == null || ie.call($, D), D.target === D.currentTarget && u && u(D, "backdropClick");
  };
  return {
    getRootProps: ($ = {}) => {
      const D = Wr(e);
      delete D.onTransitionEnter, delete D.onTransitionExited;
      const ie = x({}, D, $);
      return x({
        role: "presentation"
      }, ie, {
        onKeyDown: q(ie),
        ref: g
      });
    },
    getBackdropProps: ($ = {}) => {
      const D = $;
      return x({
        "aria-hidden": !0
      }, D, {
        onClick: W(D),
        open: d
      });
    },
    getTransitionProps: () => {
      const $ = () => {
        T(!1), a && a();
      }, D = () => {
        T(!0), c && c(), i && Y();
      };
      return {
        onEnter: Zt($, l == null ? void 0 : l.props.onEnter),
        onExited: Zt(D, l == null ? void 0 : l.props.onExited)
      };
    },
    rootRef: g,
    portalRef: J,
    isTopModal: H,
    exited: h,
    hasTransition: B
  };
}
function dt(e, n) {
  return dt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, dt(e, n);
}
function sc(e, n) {
  e.prototype = Object.create(n.prototype), e.prototype.constructor = e, dt(e, n);
}
const yr = {
  disabled: !1
};
var ac = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
  enter: s.number,
  exit: s.number,
  appear: s.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && s.oneOfType([s.string, s.shape({
  enter: s.string,
  exit: s.string,
  active: s.string
}), s.shape({
  enter: s.string,
  enterDone: s.string,
  enterActive: s.string,
  exit: s.string,
  exitDone: s.string,
  exitActive: s.string
})]);
const ro = en.createContext(null);
var cc = function(n) {
  return n.scrollTop;
}, dn = "unmounted", Ie = "exited", Me = "entering", Ze = "entered", ft = "exiting", Ne = /* @__PURE__ */ function(e) {
  sc(n, e);
  function n(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var a = o, c = a && !a.isMounting ? r.enter : r.appear, l;
    return i.appearStatus = null, r.in ? c ? (l = Ie, i.appearStatus = Me) : l = Ze : r.unmountOnExit || r.mountOnEnter ? l = dn : l = Ie, i.state = {
      status: l
    }, i.nextCallback = null, i;
  }
  n.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === dn ? {
      status: Ie
    } : null;
  };
  var t = n.prototype;
  return t.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, t.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== Me && a !== Ze && (i = Me) : (a === Me || a === Ze) && (i = ft);
    }
    this.updateStatus(!1, i);
  }, t.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, t.getTimeouts = function() {
    var o = this.props.timeout, i, a, c;
    return i = a = c = o, o != null && typeof o != "number" && (i = o.exit, a = o.enter, c = o.appear !== void 0 ? o.appear : a), {
      exit: i,
      enter: a,
      appear: c
    };
  }, t.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === Me) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : xn.findDOMNode(this);
          a && cc(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ie && this.setState({
        status: dn
      });
  }, t.performEnter = function(o) {
    var i = this, a = this.props.enter, c = this.context ? this.context.isMounting : o, l = this.props.nodeRef ? [c] : [xn.findDOMNode(this), c], u = l[0], d = l[1], p = this.getTimeouts(), f = c ? p.appear : p.enter;
    if (!o && !a || yr.disabled) {
      this.safeSetState({
        status: Ze
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: Me
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(f, function() {
        i.safeSetState({
          status: Ze
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, t.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts(), c = this.props.nodeRef ? void 0 : xn.findDOMNode(this);
    if (!i || yr.disabled) {
      this.safeSetState({
        status: Ie
      }, function() {
        o.props.onExited(c);
      });
      return;
    }
    this.props.onExit(c), this.safeSetState({
      status: ft
    }, function() {
      o.props.onExiting(c), o.onTransitionEnd(a.exit, function() {
        o.safeSetState({
          status: Ie
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
    var i = this, a = !0;
    return this.nextCallback = function(c) {
      a && (a = !1, i.nextCallback = null, o(c));
    }, this.nextCallback.cancel = function() {
      a = !1;
    }, this.nextCallback;
  }, t.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var a = this.props.nodeRef ? this.props.nodeRef.current : xn.findDOMNode(this), c = o == null && !this.props.addEndListener;
    if (!a || c) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var l = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback], u = l[0], d = l[1];
      this.props.addEndListener(u, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, t.render = function() {
    var o = this.state.status;
    if (o === dn)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var c = ae(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ en.createElement(ro.Provider, {
        value: null
      }, typeof a == "function" ? a(o, c) : en.cloneElement(en.Children.only(a), c))
    );
  }, n;
}(en.Component);
Ne.contextType = ro;
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
  nodeRef: s.shape({
    current: typeof Element > "u" ? s.any : function(e, n, t, r, o, i) {
      var a = e[n];
      return s.instanceOf(a && "ownerDocument" in a ? a.ownerDocument.defaultView.Element : Element)(e, n, t, r, o, i);
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
  children: s.oneOfType([s.func.isRequired, s.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: s.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: s.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: s.bool,
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
  appear: s.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: s.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: s.bool,
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
    var t = ac;
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
  addEndListener: s.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: s.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: s.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: s.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: s.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: s.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: s.func
} : {};
function Ye() {
}
Ne.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ye,
  onEntering: Ye,
  onEntered: Ye,
  onExit: Ye,
  onExiting: Ye,
  onExited: Ye
};
Ne.UNMOUNTED = dn;
Ne.EXITED = Ie;
Ne.ENTERING = Me;
Ne.ENTERED = Ze;
Ne.EXITING = ft;
const oo = Ne;
function qn() {
  const e = Jr(St);
  return process.env.NODE_ENV !== "production" && S.useDebugValue(e), e[wt] || e;
}
const io = (e) => e.scrollTop;
function _n(e, n) {
  var t, r;
  const {
    timeout: o,
    easing: i,
    style: a = {}
  } = e;
  return {
    duration: (t = a.transitionDuration) != null ? t : typeof o == "number" ? o : o[n.mode] || 0,
    easing: (r = a.transitionTimingFunction) != null ? r : typeof i == "object" ? i[n.mode] : i,
    delay: a.transitionDelay
  };
}
const lc = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function pt(e) {
  return `scale(${e}, ${e ** 2})`;
}
const uc = {
  entering: {
    opacity: 1,
    transform: pt(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, nt = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Ot = /* @__PURE__ */ S.forwardRef(function(n, t) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: a,
    in: c,
    onEnter: l,
    onEntered: u,
    onEntering: d,
    onExit: p,
    onExited: f,
    onExiting: b,
    style: y,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = oo
  } = n, T = ae(n, lc), B = wi(), E = S.useRef(), w = qn(), m = S.useRef(null), _ = $e(m, i.ref, t), R = (N) => ($) => {
    if (N) {
      const D = m.current;
      $ === void 0 ? N(D) : N(D, $);
    }
  }, H = R(d), J = R((N, $) => {
    io(N);
    const {
      duration: D,
      delay: ie,
      easing: Z
    } = _n({
      style: y,
      timeout: g,
      easing: a
    }, {
      mode: "enter"
    });
    let v;
    g === "auto" ? (v = w.transitions.getAutoHeightDuration(N.clientHeight), E.current = v) : v = D, N.style.transition = [w.transitions.create("opacity", {
      duration: v,
      delay: ie
    }), w.transitions.create("transform", {
      duration: nt ? v : v * 0.666,
      delay: ie,
      easing: Z
    })].join(","), l && l(N, $);
  }), Y = R(u), q = R(b), W = R((N) => {
    const {
      duration: $,
      delay: D,
      easing: ie
    } = _n({
      style: y,
      timeout: g,
      easing: a
    }, {
      mode: "exit"
    });
    let Z;
    g === "auto" ? (Z = w.transitions.getAutoHeightDuration(N.clientHeight), E.current = Z) : Z = $, N.style.transition = [w.transitions.create("opacity", {
      duration: Z,
      delay: D
    }), w.transitions.create("transform", {
      duration: nt ? Z : Z * 0.666,
      delay: nt ? D : D || Z * 0.333,
      easing: ie
    })].join(","), N.style.opacity = 0, N.style.transform = pt(0.75), p && p(N);
  }), ee = R(f);
  return /* @__PURE__ */ O(h, x({
    appear: o,
    in: c,
    nodeRef: m,
    onEnter: J,
    onEntered: Y,
    onEntering: H,
    onExit: W,
    onExited: ee,
    onExiting: q,
    addEndListener: (N) => {
      g === "auto" && B.start(E.current || 0, N), r && r(m.current, N);
    },
    timeout: g === "auto" ? null : g
  }, T, {
    children: (N, $) => /* @__PURE__ */ S.cloneElement(i, x({
      style: x({
        opacity: 0,
        transform: pt(0.75),
        visibility: N === "exited" && !c ? "hidden" : void 0
      }, uc[N], y, i.props.style),
      ref: _
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
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: An.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
Ot.muiSupportAuto = !0;
const dc = Ot, fc = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], pc = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, so = /* @__PURE__ */ S.forwardRef(function(n, t) {
  const r = qn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: a = !0,
    children: c,
    easing: l,
    in: u,
    onEnter: d,
    onEntered: p,
    onEntering: f,
    onExit: b,
    onExited: y,
    onExiting: g,
    style: h,
    timeout: T = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: B = oo
  } = n, E = ae(n, fc), w = S.useRef(null), m = $e(w, c.ref, t), _ = (A) => (N) => {
    if (A) {
      const $ = w.current;
      N === void 0 ? A($) : A($, N);
    }
  }, R = _(f), H = _((A, N) => {
    io(A);
    const $ = _n({
      style: h,
      timeout: T,
      easing: l
    }, {
      mode: "enter"
    });
    A.style.webkitTransition = r.transitions.create("opacity", $), A.style.transition = r.transitions.create("opacity", $), d && d(A, N);
  }), J = _(p), Y = _(g), q = _((A) => {
    const N = _n({
      style: h,
      timeout: T,
      easing: l
    }, {
      mode: "exit"
    });
    A.style.webkitTransition = r.transitions.create("opacity", N), A.style.transition = r.transitions.create("opacity", N), b && b(A);
  }), W = _(y);
  return /* @__PURE__ */ O(B, x({
    appear: a,
    in: u,
    nodeRef: w,
    onEnter: H,
    onEntered: J,
    onEntering: R,
    onExit: q,
    onExited: W,
    onExiting: Y,
    addEndListener: (A) => {
      i && i(w.current, A);
    },
    timeout: T
  }, E, {
    children: (A, N) => /* @__PURE__ */ S.cloneElement(c, x({
      style: x({
        opacity: 0,
        visibility: A === "exited" && !u ? "hidden" : void 0
      }, pc[A], h, c.props.style),
      ref: m
    }, N))
  }));
});
process.env.NODE_ENV !== "production" && (so.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: An.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
const hc = so;
function mc(e) {
  return Pe("MuiBackdrop", e);
}
Ve("MuiBackdrop", ["root", "invisible"]);
const gc = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], bc = (e) => {
  const {
    classes: n,
    invisible: t
  } = e;
  return Fe({
    root: ["root", t && "invisible"]
  }, mc, n);
}, yc = Te("div", {
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
}) => x({
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
})), ao = /* @__PURE__ */ S.forwardRef(function(n, t) {
  var r, o, i;
  const a = ze({
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
    slots: g = {},
    TransitionComponent: h = hc,
    transitionDuration: T
  } = a, B = ae(a, gc), E = x({}, a, {
    component: u,
    invisible: f
  }), w = bc(E), m = (r = y.root) != null ? r : p.root;
  return /* @__PURE__ */ O(h, x({
    in: b,
    timeout: T
  }, B, {
    children: /* @__PURE__ */ O(yc, x({
      "aria-hidden": !0
    }, m, {
      as: (o = (i = g.root) != null ? i : d.Root) != null ? o : u,
      className: Oe(w.root, l, m == null ? void 0 : m.className),
      ownerState: x({}, E, m == null ? void 0 : m.ownerState),
      classes: w,
      ref: t,
      children: c
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ao.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
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
  componentsProps: s.shape({
    root: s.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: s.bool,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    root: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: s.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
const vc = ao;
function Ec(e) {
  return Pe("MuiModal", e);
}
Ve("MuiModal", ["root", "hidden", "backdrop"]);
const xc = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Tc = (e) => {
  const {
    open: n,
    exited: t,
    classes: r
  } = e;
  return Fe({
    root: ["root", !n && t && "hidden"],
    backdrop: ["backdrop"]
  }, Ec, r);
}, kc = Te("div", {
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
}) => x({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !n.open && n.exited && {
  visibility: "hidden"
})), Sc = Te(vc, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, n) => n.backdrop
})({
  zIndex: -1
}), co = /* @__PURE__ */ S.forwardRef(function(n, t) {
  var r, o, i, a, c, l;
  const u = ze({
    name: "MuiModal",
    props: n
  }), {
    BackdropComponent: d = Sc,
    BackdropProps: p,
    className: f,
    closeAfterTransition: b = !1,
    children: y,
    container: g,
    component: h,
    components: T = {},
    componentsProps: B = {},
    disableAutoFocus: E = !1,
    disableEnforceFocus: w = !1,
    disableEscapeKeyDown: m = !1,
    disablePortal: _ = !1,
    disableRestoreFocus: R = !1,
    disableScrollLock: H = !1,
    hideBackdrop: J = !1,
    keepMounted: Y = !1,
    onBackdropClick: q,
    open: W,
    slotProps: ee,
    slots: A
    // eslint-disable-next-line react/prop-types
  } = u, N = ae(u, xc), $ = x({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: E,
    disableEnforceFocus: w,
    disableEscapeKeyDown: m,
    disablePortal: _,
    disableRestoreFocus: R,
    disableScrollLock: H,
    hideBackdrop: J,
    keepMounted: Y
  }), {
    getRootProps: D,
    getBackdropProps: ie,
    getTransitionProps: Z,
    portalRef: v,
    isTopModal: P,
    exited: I,
    hasTransition: V
  } = ic(x({}, $, {
    rootRef: t
  })), M = x({}, $, {
    exited: I
  }), F = Tc(M), j = {};
  if (y.props.tabIndex === void 0 && (j.tabIndex = "-1"), V) {
    const {
      onEnter: U,
      onExited: k
    } = Z();
    j.onEnter = U, j.onExited = k;
  }
  const L = (r = (o = A == null ? void 0 : A.root) != null ? o : T.Root) != null ? r : kc, G = (i = (a = A == null ? void 0 : A.backdrop) != null ? a : T.Backdrop) != null ? i : d, K = (c = ee == null ? void 0 : ee.root) != null ? c : B.root, z = (l = ee == null ? void 0 : ee.backdrop) != null ? l : B.backdrop, de = on({
    elementType: L,
    externalSlotProps: K,
    externalForwardedProps: N,
    getSlotProps: D,
    additionalProps: {
      ref: t,
      as: h
    },
    ownerState: M,
    className: Oe(f, K == null ? void 0 : K.className, F == null ? void 0 : F.root, !M.open && M.exited && (F == null ? void 0 : F.hidden))
  }), C = on({
    elementType: G,
    externalSlotProps: z,
    additionalProps: p,
    getSlotProps: (U) => ie(x({}, U, {
      onClick: (k) => {
        q && q(k), U != null && U.onClick && U.onClick(k);
      }
    })),
    className: Oe(z == null ? void 0 : z.className, p == null ? void 0 : p.className, F == null ? void 0 : F.backdrop),
    ownerState: M
  });
  return !Y && !W && (!V || I) ? null : /* @__PURE__ */ O($n, {
    ref: v,
    container: g,
    disablePortal: _,
    children: /* @__PURE__ */ ve(L, x({}, de, {
      children: [!J && d ? /* @__PURE__ */ O(G, x({}, C)) : null, /* @__PURE__ */ O(Rn, {
        disableEnforceFocus: w,
        disableAutoFocus: E,
        disableRestoreFocus: R,
        isEnabled: P,
        open: W,
        children: /* @__PURE__ */ S.cloneElement(y, j)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (co.propTypes = {
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
  BackdropComponent: s.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: s.object,
  /**
   * A single child content element.
   */
  children: An.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: s.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Backdrop: s.elementType,
    Root: s.elementType
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
  componentsProps: s.shape({
    backdrop: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
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
  container: s.oneOfType([hn, s.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: s.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: s.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: s.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: s.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: s.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: s.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: s.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: s.shape({
    backdrop: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    backdrop: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const wc = co, Oc = (e) => {
  let n;
  return e < 1 ? n = 5.11916 * e ** 2 : n = 4.5 * Math.log(e + 1) + 2, (n / 100).toFixed(2);
}, vr = Oc;
function Cc(e) {
  return Pe("MuiPaper", e);
}
Ve("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Pc = ["className", "component", "elevation", "square", "variant"], Nc = (e) => {
  const {
    square: n,
    elevation: t,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !n && "rounded", r === "elevation" && `elevation${t}`]
  };
  return Fe(i, Cc, o);
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
  return x({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !n.square && {
    borderRadius: e.shape.borderRadius
  }, n.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, n.variant === "elevation" && x({
    boxShadow: (e.vars || e).shadows[n.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${lr("#fff", vr(n.elevation))}, ${lr("#fff", vr(n.elevation))})`
  }, e.vars && {
    backgroundImage: (t = e.vars.overlays) == null ? void 0 : t[n.elevation]
  }));
}), lo = /* @__PURE__ */ S.forwardRef(function(n, t) {
  const r = ze({
    props: n,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: a = 1,
    square: c = !1,
    variant: l = "elevation"
  } = r, u = ae(r, Pc), d = x({}, r, {
    component: i,
    elevation: a,
    square: c,
    variant: l
  }), p = Nc(d);
  return process.env.NODE_ENV !== "production" && qn().shadows[a] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)), /* @__PURE__ */ O(Rc, x({
    as: i,
    ownerState: d,
    className: Oe(p.root, o),
    ref: t
  }, u));
});
process.env.NODE_ENV !== "production" && (lo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: yn(Ur, (e) => {
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
  square: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: s.oneOfType([s.oneOf(["elevation", "outlined"]), s.string])
});
const $c = lo;
function _c(e) {
  return Pe("MuiPopover", e);
}
Ve("MuiPopover", ["root", "paper"]);
const Ic = ["onEntering"], Mc = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Ac = ["slotProps"];
function Er(e, n) {
  let t = 0;
  return typeof n == "number" ? t = n : n === "center" ? t = e.height / 2 : n === "bottom" && (t = e.height), t;
}
function xr(e, n) {
  let t = 0;
  return typeof n == "number" ? t = n : n === "center" ? t = e.width / 2 : n === "right" && (t = e.width), t;
}
function Tr(e) {
  return [e.horizontal, e.vertical].map((n) => typeof n == "number" ? `${n}px` : n).join(" ");
}
function On(e) {
  return typeof e == "function" ? e() : e;
}
const Dc = (e) => {
  const {
    classes: n
  } = e;
  return Fe({
    root: ["root"],
    paper: ["paper"]
  }, _c, n);
}, Bc = Te(wc, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), uo = Te($c, {
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
}), fo = /* @__PURE__ */ S.forwardRef(function(n, t) {
  var r, o, i;
  const a = ze({
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
    elevation: g = 8,
    marginThreshold: h = 16,
    open: T,
    PaperProps: B = {},
    slots: E,
    slotProps: w,
    transformOrigin: m = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: _ = dc,
    transitionDuration: R = "auto",
    TransitionProps: {
      onEntering: H
    } = {},
    disableScrollLock: J = !1
  } = a, Y = ae(a.TransitionProps, Ic), q = ae(a, Mc), W = (r = w == null ? void 0 : w.paper) != null ? r : B, ee = S.useRef(), A = $e(ee, W.ref), N = x({}, a, {
    anchorOrigin: u,
    anchorReference: p,
    elevation: g,
    marginThreshold: h,
    externalPaperSlotProps: W,
    transformOrigin: m,
    TransitionComponent: _,
    transitionDuration: R,
    TransitionProps: Y
  }), $ = Dc(N), D = S.useCallback(() => {
    if (p === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const U = On(l), k = U && U.nodeType === 1 ? U : ye(ee.current).body, fe = k.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ge = k.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ge.top === 0 && ge.left === 0 && ge.right === 0 && ge.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: fe.top + Er(fe, u.vertical),
      left: fe.left + xr(fe, u.horizontal)
    };
  }, [l, u.horizontal, u.vertical, d, p]), ie = S.useCallback((U) => ({
    vertical: Er(U, m.vertical),
    horizontal: xr(U, m.horizontal)
  }), [m.horizontal, m.vertical]), Z = S.useCallback((U) => {
    const k = {
      width: U.offsetWidth,
      height: U.offsetHeight
    }, fe = ie(k);
    if (p === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Tr(fe)
      };
    const ge = D();
    let Se = ge.top - fe.vertical, Ue = ge.left - fe.horizontal;
    const $t = Se + k.height, _t = Ue + k.width, It = mn(On(l)), an = It.innerHeight - h, Mt = It.innerWidth - h;
    if (h !== null && Se < h) {
      const xe = Se - h;
      Se -= xe, fe.vertical += xe;
    } else if (h !== null && $t > an) {
      const xe = $t - an;
      Se -= xe, fe.vertical += xe;
    }
    if (process.env.NODE_ENV !== "production" && k.height > an && k.height && an && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${k.height - an}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && Ue < h) {
      const xe = Ue - h;
      Ue -= xe, fe.horizontal += xe;
    } else if (_t > Mt) {
      const xe = _t - Mt;
      Ue -= xe, fe.horizontal += xe;
    }
    return {
      top: `${Math.round(Se)}px`,
      left: `${Math.round(Ue)}px`,
      transformOrigin: Tr(fe)
    };
  }, [l, p, D, ie, h]), [v, P] = S.useState(T), I = S.useCallback(() => {
    const U = ee.current;
    if (!U)
      return;
    const k = Z(U);
    k.top !== null && (U.style.top = k.top), k.left !== null && (U.style.left = k.left), U.style.transformOrigin = k.transformOrigin, P(!0);
  }, [Z]);
  S.useEffect(() => (J && window.addEventListener("scroll", I), () => window.removeEventListener("scroll", I)), [l, J, I]);
  const V = (U, k) => {
    H && H(U, k), I();
  }, M = () => {
    P(!1);
  };
  S.useEffect(() => {
    T && I();
  }), S.useImperativeHandle(c, () => T ? {
    updatePosition: () => {
      I();
    }
  } : null, [T, I]), S.useEffect(() => {
    if (!T)
      return;
    const U = Ei(() => {
      I();
    }), k = mn(l);
    return k.addEventListener("resize", U), () => {
      U.clear(), k.removeEventListener("resize", U);
    };
  }, [l, T, I]);
  let F = R;
  R === "auto" && !_.muiSupportAuto && (F = void 0);
  const j = y || (l ? ye(On(l)).body : void 0), L = (o = E == null ? void 0 : E.root) != null ? o : Bc, G = (i = E == null ? void 0 : E.paper) != null ? i : uo, K = on({
    elementType: G,
    externalSlotProps: x({}, W, {
      style: v ? W.style : x({}, W.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: A
    },
    ownerState: N,
    className: Oe($.paper, W == null ? void 0 : W.className)
  }), z = on({
    elementType: L,
    externalSlotProps: (w == null ? void 0 : w.root) || {},
    externalForwardedProps: q,
    additionalProps: {
      ref: t,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: j,
      open: T
    },
    ownerState: N,
    className: Oe($.root, b)
  }), {
    slotProps: de
  } = z, C = ae(z, Ac);
  return /* @__PURE__ */ O(L, x({}, C, !qr(L) && {
    slotProps: de,
    disableScrollLock: J
  }, {
    children: /* @__PURE__ */ O(_, x({
      appear: !0,
      in: T,
      onEntering: V,
      onExited: M,
      timeout: F
    }, Y, {
      children: /* @__PURE__ */ O(G, x({}, K, {
        children: f
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (fo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: vi,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: yn(s.oneOfType([hn, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const n = On(e.anchorEl);
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
  anchorOrigin: s.shape({
    horizontal: s.oneOfType([s.oneOf(["center", "left", "right"]), s.number]).isRequired,
    vertical: s.oneOfType([s.oneOf(["bottom", "center", "top"]), s.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: s.shape({
    left: s.number.isRequired,
    top: s.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: s.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([hn, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
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
  marginThreshold: s.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: s.shape({
    component: pi
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: s.shape({
    paper: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: s.shape({
    paper: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
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
  transformOrigin: s.shape({
    horizontal: s.oneOfType([s.oneOf(["center", "left", "right"]), s.number]).isRequired,
    vertical: s.oneOfType([s.oneOf(["bottom", "center", "top"]), s.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: s.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object
});
const jc = fo;
function Lc(e) {
  return Pe("MuiMenu", e);
}
Ve("MuiMenu", ["root", "paper", "list"]);
const Fc = ["onEntering"], Vc = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], zc = {
  vertical: "top",
  horizontal: "right"
}, Uc = {
  vertical: "top",
  horizontal: "left"
}, Hc = (e) => {
  const {
    classes: n
  } = e;
  return Fe({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Lc, n);
}, qc = Te(jc, {
  shouldForwardProp: (e) => Zr(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), Wc = Te(uo, {
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
}), Gc = Te(Ua, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, n) => n.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), po = /* @__PURE__ */ S.forwardRef(function(n, t) {
  var r, o;
  const i = ze({
    props: n,
    name: "MuiMenu"
  }), {
    autoFocus: a = !0,
    children: c,
    className: l,
    disableAutoFocusItem: u = !1,
    MenuListProps: d = {},
    onClose: p,
    open: f,
    PaperProps: b = {},
    PopoverClasses: y,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: T = "selectedMenu",
    slots: B = {},
    slotProps: E = {}
  } = i, w = ae(i.TransitionProps, Fc), m = ae(i, Vc), _ = qn(), R = _.direction === "rtl", H = x({}, i, {
    autoFocus: a,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: h,
    PaperProps: b,
    transitionDuration: g,
    TransitionProps: w,
    variant: T
  }), J = Hc(H), Y = a && !u && f, q = S.useRef(null), W = (Z, v) => {
    q.current && q.current.adjustStyleForScrollbar(Z, _), h && h(Z, v);
  }, ee = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), p && p(Z, "tabKeyDown"));
  };
  let A = -1;
  S.Children.map(c, (Z, v) => {
    /* @__PURE__ */ S.isValidElement(Z) && (process.env.NODE_ENV !== "production" && Cn.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (T === "selectedMenu" && Z.props.selected || A === -1) && (A = v));
  });
  const N = (r = B.paper) != null ? r : Wc, $ = (o = E.paper) != null ? o : b, D = on({
    elementType: B.root,
    externalSlotProps: E.root,
    ownerState: H,
    className: [J.root, l]
  }), ie = on({
    elementType: N,
    externalSlotProps: $,
    ownerState: H,
    className: J.paper
  });
  return /* @__PURE__ */ O(qc, x({
    onClose: p,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: R ? "right" : "left"
    },
    transformOrigin: R ? zc : Uc,
    slots: {
      paper: N,
      root: B.root
    },
    slotProps: {
      root: D,
      paper: ie
    },
    open: f,
    ref: t,
    transitionDuration: g,
    TransitionProps: x({
      onEntering: W
    }, w),
    ownerState: H
  }, m, {
    classes: y,
    children: /* @__PURE__ */ O(Gc, x({
      onKeyDown: ee,
      actions: q,
      autoFocus: a && (A === -1 || u),
      autoFocusItem: Y,
      variant: T
    }, d, {
      className: Oe(J.list, d.className),
      children: c
    }))
  }));
});
process.env.NODE_ENV !== "production" && (po.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([hn, s.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: s.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: s.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: s.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: s.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: s.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: s.shape({
    paper: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: s.shape({
    paper: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: s.oneOf(["menu", "selectedMenu"])
});
const Kc = po;
function wl({
  className: e,
  commandHandler: n,
  menuDefinition: t,
  children: r
}) {
  var u;
  const [o, i] = en.useState(void 0), a = nn(
    (d) => {
      d.preventDefault(), i(
        o === void 0 ? {
          mouseX: d.clientX + 2,
          mouseY: d.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), c = nn(() => {
    i(void 0);
  }, []), l = bn(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = t == null ? void 0 : t.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ ve(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: a,
      children: [
        r,
        /* @__PURE__ */ O(
          Kc,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: c,
            anchorReference: "anchorPosition",
            anchorPosition: l,
            children: /* @__PURE__ */ O(
              mt,
              {
                menuDefinition: t,
                commandHandler: n,
                onClick: c
              }
            )
          }
        )
      ]
    }
  );
}
function Ol({
  id: e,
  label: n,
  isDisabled: t = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: a = "medium",
  className: c,
  onClick: l,
  children: u
}) {
  return /* @__PURE__ */ O(
    Rr,
    {
      id: e,
      disabled: t,
      edge: i,
      size: a,
      "aria-label": n,
      title: o ? void 0 : r ?? n,
      className: `papi-icon-button ${c ?? ""}`,
      onClick: l,
      children: u
    }
  );
}
var Xc = Object.defineProperty, Yc = (e, n, t) => n in e ? Xc(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, X = (e, n, t) => (Yc(e, typeof n != "symbol" ? n + "" : n, t), t);
const Le = [
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
], ho = [
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
], kr = sl();
function sn(e, n = !0) {
  return n && (e = e.toUpperCase()), e in kr ? kr[e] : 0;
}
function Pt(e) {
  return sn(e) > 0;
}
function Jc(e) {
  const n = typeof e == "string" ? sn(e) : e;
  return n >= 40 && n <= 66;
}
function Zc(e) {
  return (typeof e == "string" ? sn(e) : e) <= 39;
}
function mo(e) {
  return e <= 66;
}
function Qc(e) {
  const n = typeof e == "string" ? sn(e) : e;
  return yo(n) && !mo(n);
}
function* el() {
  for (let e = 1; e <= Le.length; e++)
    yield e;
}
const nl = 1, go = Le.length;
function tl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Nt(e, n = "***") {
  const t = e - 1;
  return t < 0 || t >= Le.length ? n : Le[t];
}
function bo(e) {
  return e <= 0 || e > go ? "******" : ho[e - 1];
}
function rl(e) {
  return bo(sn(e));
}
function yo(e) {
  const n = typeof e == "number" ? Nt(e) : e;
  return Pt(n) && !Ct.includes(n);
}
function ol(e) {
  const n = typeof e == "number" ? Nt(e) : e;
  return Pt(n) && Ct.includes(n);
}
function il(e) {
  return ho[e - 1].includes("*obsolete*");
}
function sl() {
  const e = {};
  for (let n = 0; n < Le.length; n++)
    e[Le[n]] = n + 1;
  return e;
}
const ke = {
  allBookIds: Le,
  nonCanonicalIds: Ct,
  bookIdToNumber: sn,
  isBookIdValid: Pt,
  isBookNT: Jc,
  isBookOT: Zc,
  isBookOTNT: mo,
  isBookDC: Qc,
  allBookNumbers: el,
  firstBook: nl,
  lastBook: go,
  extraBooks: tl,
  bookNumberToId: Nt,
  bookNumberToEnglishName: bo,
  bookIdToEnglishName: rl,
  isCanonical: yo,
  isExtraMaterial: ol,
  isObsolete: il
};
var Re = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Re || {});
const he = class {
  // private versInfo: Versification;
  constructor(n) {
    if (X(this, "name"), X(this, "fullPath"), X(this, "isPresent"), X(this, "hasVerseSegments"), X(this, "isCustomized"), X(this, "baseVersification"), X(this, "scriptureBooks"), X(this, "_type"), n != null)
      typeof n == "string" ? this.name = n : this._type = n;
    else
      throw new Error("Argument null");
  }
  get type() {
    return this._type;
  }
  equals(n) {
    return !n.type || !this.type ? !1 : n.type === this.type;
  }
};
X(he, "Original", new he(Re.Original)), X(he, "Septuagint", new he(Re.Septuagint)), X(he, "Vulgate", new he(Re.Vulgate)), X(he, "English", new he(Re.English)), X(he, "RussianProtestant", new he(Re.RussianProtestant)), X(he, "RussianOrthodox", new he(Re.RussianOrthodox));
let Qe = he;
function Sr(e, n) {
  const t = n[0];
  for (let r = 1; r < n.length; r++)
    e = e.split(n[r]).join(t);
  return e.split(t);
}
var vo = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(vo || {});
const pe = class Q {
  constructor(n, t, r, o) {
    if (X(this, "firstChapter"), X(this, "lastChapter"), X(this, "lastVerse"), X(this, "hasSegmentsDefined"), X(this, "text"), X(this, "BBBCCCVVVS"), X(this, "longHashCode"), X(this, "versification"), X(this, "rtlMark", "‏"), X(this, "_bookNum", 0), X(this, "_chapterNum", 0), X(this, "_verseNum", 0), X(this, "_verse"), r == null && o == null)
      if (n != null && typeof n == "string") {
        const i = n, a = t != null && t instanceof Qe ? t : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (n != null && typeof n == "number") {
        const i = t != null && t instanceof Qe ? t : void 0;
        this.setEmpty(i), this._verseNum = n % Q.chapterDigitShifter, this._chapterNum = Math.floor(
          n % Q.bookDigitShifter / Q.chapterDigitShifter
        ), this._bookNum = Math.floor(n / Q.bookDigitShifter);
      } else if (t == null)
        if (n != null && n instanceof Q) {
          const i = n;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (n == null)
            return;
          const i = n instanceof Qe ? n : Q.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (n != null && t != null && r != null)
      if (typeof n == "string" && typeof t == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(n, t, r);
      else if (typeof n == "number" && typeof t == "number" && typeof r == "number")
        this._bookNum = n, this._chapterNum = t, this._verseNum = r, this.versification = o ?? Q.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(n, t = Q.defaultVersification) {
    const r = new Q(t);
    return r.parse(n), r;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(n) {
    return n.length > 0 && "0123456789".includes(n[0]) && !n.endsWith(this.verseRangeSeparator) && !n.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(n) {
    let t;
    try {
      return t = Q.parse(n), { success: !0, verseRef: t };
    } catch (r) {
      if (r instanceof un)
        return t = new Q(), { success: !1, verseRef: t };
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
  static getBBBCCCVVV(n, t, r) {
    return n % Q.bcvMaxValue * Q.bookDigitShifter + (t >= 0 ? t % Q.bcvMaxValue * Q.chapterDigitShifter : 0) + (r >= 0 ? r % Q.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(n) {
    let t;
    if (!n)
      return t = -1, { success: !0, vNum: t };
    t = 0;
    let r;
    for (let o = 0; o < n.length; o++) {
      if (r = n[o], r < "0" || r > "9")
        return o === 0 && (t = -1), { success: !1, vNum: t };
      if (t = t * 10 + +r - +"0", t > Q.bcvMaxValue)
        return t = -1, { success: !1, vNum: t };
    }
    return { success: !0, vNum: t };
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
    return this._verse != null && (this._verse.includes(Q.verseRangeSeparator) || this._verse.includes(Q.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ke.bookNumberToId(this.bookNum, "");
  }
  set book(n) {
    this.bookNum = ke.bookIdToNumber(n);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(n) {
    const t = +n;
    this._chapterNum = Number.isInteger(t) ? t : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(n) {
    const { success: t, vNum: r } = Q.tryGetVerseNum(n);
    this._verse = t ? void 0 : n.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = Q.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(n) {
    if (n <= 0 || n > ke.lastBook)
      throw new un(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = n;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(n) {
    this.chapterNum = n;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(n) {
    this._verseNum = n;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var n;
    return (n = this.versification) == null ? void 0 : n.name;
  }
  set versificationStr(n) {
    this.versification = this.versification != null ? new Qe(n) : void 0;
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
    return this.validateVerse(Q.verseRangeSeparators, Q.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return Q.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return Q.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
  parse(n) {
    if (n = n.replace(this.rtlMark, ""), n.includes("/")) {
      const i = n.split("/");
      if (n = i[0], i.length > 1)
        try {
          const a = +i[1].trim();
          this.versification = new Qe(Re[a]);
        } catch {
          throw new un("Invalid reference : " + n);
        }
    }
    const t = n.trim().split(" ");
    if (t.length !== 2)
      throw new un("Invalid reference : " + n);
    const r = t[1].split(":"), o = +r[0];
    if (r.length !== 2 || ke.bookIdToNumber(t[0]) === 0 || !Number.isInteger(o) || o < 0 || !Q.isVerseParseable(r[1]))
      throw new un("Invalid reference : " + n);
    this.updateInternal(t[0], r[0], r[1]);
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
    return new Q(this);
  }
  toString() {
    const n = this.book;
    return n === "" ? "" : `${n} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(n) {
    return n instanceof Q ? n._bookNum === this._bookNum && n._chapterNum === this._chapterNum && n._verseNum === this._verseNum && n.verse === this.verse && n.versification != null && this.versification != null && n.versification.equals(this.versification) : !1;
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
  allVerses(n = !1, t = Q.verseRangeSeparators, r = Q.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = Sr(this._verse, r);
    for (const a of i.map((c) => Sr(c, t))) {
      const c = this.clone();
      c.verse = a[0];
      const l = c.verseNum;
      if (o.push(c), a.length > 1) {
        const u = this.clone();
        if (u.verse = a[1], !n)
          for (let d = l + 1; d < u.verseNum; d++) {
            const p = new Q(
              this._bookNum,
              this._chapterNum,
              d,
              this.versification
            );
            this.isExcluded || o.push(p);
          }
        o.push(u);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(n, t) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const o of this.allVerses(!0, n, t)) {
      const i = o.internalValid;
      if (i !== 0)
        return i;
      const a = o.BBBCCCVVV;
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ke.lastBook ? 2 : (ke.isCanonical(this._bookNum), 0);
  }
  setEmpty(n = Q.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = n;
  }
  updateInternal(n, t, r) {
    this.bookNum = ke.bookIdToNumber(n), this.chapter = t, this.verse = r;
  }
};
X(pe, "defaultVersification", Qe.English), X(pe, "verseRangeSeparator", "-"), X(pe, "verseSequenceIndicator", ","), X(pe, "verseRangeSeparators", [pe.verseRangeSeparator]), X(pe, "verseSequenceIndicators", [pe.verseSequenceIndicator]), X(pe, "chapterDigitShifter", 1e3), X(pe, "bookDigitShifter", pe.chapterDigitShifter * pe.chapterDigitShifter), X(pe, "bcvMaxValue", pe.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
X(pe, "ValidStatusType", vo);
class un extends Error {
}
function In({
  variant: e = "outlined",
  id: n,
  isDisabled: t = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: a,
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
    Cr,
    {
      variant: e,
      id: n,
      disabled: t,
      error: r,
      fullWidth: o,
      helperText: i,
      label: a,
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
const rt = () => (tt || (tt = ke.allBookIds.map((e) => ({
  bookId: e,
  label: ke.bookIdToEnglishName(e)
}))), tt);
function Pl({ scrRef: e, handleSubmit: n, id: t }) {
  const r = (l) => {
    n(l);
  }, o = (l, u) => {
    const p = { bookNum: ke.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(p);
  }, i = (l) => {
    n({ ...e, chapterNum: +l.target.value });
  }, a = (l) => {
    n({ ...e, verseNum: +l.target.value });
  }, c = bn(() => rt()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ ve("span", { id: t, children: [
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
      He,
      {
        onClick: () => r(Dt(e, -1)),
        isDisabled: e.bookNum <= Lo,
        children: "<"
      }
    ),
    /* @__PURE__ */ O(
      He,
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
      He,
      {
        onClick: () => n(Bt(e, -1)),
        isDisabled: e.chapterNum <= Fo,
        children: "<"
      }
    ),
    /* @__PURE__ */ O(
      He,
      {
        onClick: () => n(Bt(e, 1)),
        isDisabled: e.chapterNum >= Vo(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ O(
      In,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ O(
      He,
      {
        onClick: () => n(jt(e, -1)),
        isDisabled: e.verseNum <= zo,
        children: "<"
      }
    ),
    /* @__PURE__ */ O(He, { onClick: () => n(jt(e, 1)), children: ">" })
  ] });
}
function Nl({ onSearch: e, placeholder: n, isFullWidth: t }) {
  const [r, o] = De(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ O(Po, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ O(
    In,
    {
      isFullWidth: t,
      className: "search-bar-input",
      placeholder: n,
      value: r,
      onChange: (a) => i(a.target.value)
    }
  ) });
}
function Rl({
  id: e,
  isDisabled: n = !1,
  orientation: t = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: a = !1,
  defaultValue: c,
  value: l,
  valueLabelDisplay: u = "off",
  className: d,
  onChange: p,
  onChangeCommitted: f
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
      marks: a,
      defaultValue: c,
      value: l,
      valueLabelDisplay: u,
      className: `papi-slider ${t} ${d ?? ""}`,
      onChange: p,
      onChangeCommitted: f
    }
  );
}
function $l({
  autoHideDuration: e = void 0,
  id: n,
  isOpen: t = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: a,
  children: c
}) {
  const l = {
    action: (a == null ? void 0 : a.action) || c,
    message: a == null ? void 0 : a.message,
    className: r
  };
  return /* @__PURE__ */ O(
    Ro,
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
function _l({
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
function wr({ onRowChange: e, row: n, column: t }) {
  const r = (o) => {
    e({ ...n, [t.key]: o.target.value });
  };
  return /* @__PURE__ */ O(In, { defaultValue: n[t.key], onChange: r });
}
const al = ({ onChange: e, disabled: n, checked: t, ...r }) => /* @__PURE__ */ O(
  qo,
  {
    ...r,
    isChecked: t,
    isDisabled: n,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Il({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: t,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: a,
  defaultColumnSortable: c = !0,
  defaultColumnResizable: l = !0,
  rows: u,
  enableSelectColumn: d,
  selectColumnWidth: p = 50,
  rowKeyGetter: f,
  rowHeight: b = 35,
  headerRowHeight: y = 35,
  selectedRows: g,
  onSelectedRowsChange: h,
  onRowsChange: T,
  onCellClick: B,
  onCellDoubleClick: E,
  onCellContextMenu: w,
  onCellKeyDown: m,
  direction: _ = "ltr",
  enableVirtualization: R = !0,
  onCopy: H,
  onPaste: J,
  onScroll: Y,
  className: q,
  id: W
}) {
  const ee = bn(() => {
    const A = e.map((N) => typeof N.editable == "function" ? {
      ...N,
      editable: (D) => !!N.editable(D),
      renderEditCell: N.renderEditCell || wr
    } : N.editable && !N.renderEditCell ? { ...N, renderEditCell: wr } : N.renderEditCell && !N.editable ? { ...N, editable: !1 } : N);
    return d ? [{ ...Ho, minWidth: p }, ...A] : A;
  }, [e, d, p]);
  return /* @__PURE__ */ O(
    Uo,
    {
      columns: ee,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: a,
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
      selectedRows: g,
      onSelectedRowsChange: h,
      onRowsChange: T,
      onCellClick: B,
      onCellDoubleClick: E,
      onCellContextMenu: w,
      onCellKeyDown: m,
      direction: _,
      enableVirtualization: R,
      onCopy: H,
      onPaste: J,
      onScroll: Y,
      renderers: { renderCheckbox: al },
      className: `papi-table ${q ?? "rdg-light"}`,
      id: W
    }
  );
}
function cl(e) {
  return Pe("MuiSvgIcon", e);
}
Ve("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const ll = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ul = (e) => {
  const {
    color: n,
    fontSize: t,
    classes: r
  } = e, o = {
    root: ["root", n !== "inherit" && `color${Be(n)}`, `fontSize${Be(t)}`]
  };
  return Fe(o, cl, r);
}, dl = Te("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: t
    } = e;
    return [n.root, t.color !== "inherit" && n[`color${Be(t.color)}`], n[`fontSize${Be(t.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var t, r, o, i, a, c, l, u, d, p, f, b, y;
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
      small: ((i = e.typography) == null || (a = i.pxToRem) == null ? void 0 : a.call(i, 20)) || "1.25rem",
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
}), Rt = /* @__PURE__ */ S.forwardRef(function(n, t) {
  const r = ze({
    props: n,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: a = "inherit",
    component: c = "svg",
    fontSize: l = "medium",
    htmlColor: u,
    inheritViewBox: d = !1,
    titleAccess: p,
    viewBox: f = "0 0 24 24"
  } = r, b = ae(r, ll), y = /* @__PURE__ */ S.isValidElement(o) && o.type === "svg", g = x({}, r, {
    color: a,
    component: c,
    fontSize: l,
    instanceFontSize: n.fontSize,
    inheritViewBox: d,
    viewBox: f,
    hasSvgAsChild: y
  }), h = {};
  d || (h.viewBox = f);
  const T = ul(g);
  return /* @__PURE__ */ ve(dl, x({
    as: c,
    className: Oe(T.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: t
  }, h, b, y && o.props, {
    ownerState: g,
    children: [y ? o.props.children : o, p ? /* @__PURE__ */ O("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Rt.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: s.oneOfType([s.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: s.oneOfType([s.oneOf(["inherit", "large", "medium", "small"]), s.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: s.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: s.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: s.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: s.string
});
Rt.muiName = "SvgIcon";
const Or = Rt;
function fl(e, n) {
  function t(r, o) {
    return /* @__PURE__ */ O(Or, x({
      "data-testid": `${n}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (t.displayName = `${n}Icon`), t.muiName = Or.muiName, /* @__PURE__ */ S.memo(/* @__PURE__ */ S.forwardRef(t));
}
const pl = fl(/* @__PURE__ */ O("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Ml({
  // menu: propsMenu, --- Just use "menu provider"???
  menuProvider: e,
  commandHandler: n,
  className: t,
  id: r,
  children: o
}) {
  const [i, a] = De(!1), [c, l] = De(!1), u = nn(() => {
    i && a(!1), l(!1);
  }, [i]), d = nn((h) => {
    h.stopPropagation(), a((T) => {
      const B = !T;
      return B && h.shiftKey ? l(!0) : B || l(!1), B;
    });
  }, []), p = it(void 0), [f, b] = De(0);
  Mn(() => {
    i && p.current && b(p.current.clientHeight);
  }, [i]);
  const y = nn(
    (h) => (u(), n(h)),
    [n, u]
  ), g = e == null ? void 0 : e(c);
  return /* @__PURE__ */ O("div", { ref: p, style: { position: "relative" }, children: /* @__PURE__ */ O(_o, { position: "static", id: r, children: /* @__PURE__ */ ve(Io, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    g ? /* @__PURE__ */ O(
      Rr,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: d,
        children: /* @__PURE__ */ O(pl, {})
      }
    ) : void 0,
    o ? /* @__PURE__ */ O("div", { className: "papi-menu-children", children: o }) : void 0,
    g ? /* @__PURE__ */ O(
      Mo,
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
          Jo,
          {
            className: t,
            commandHandler: y,
            multiColumnMenu: g
          }
        )
      }
    ) : void 0
  ] }) }) });
}
const Al = (e, n) => {
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
function hl(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const ml = (e, n, t = {}) => {
  const r = it(n);
  r.current = n;
  const o = it(t);
  o.current = hl(o.current);
  const [i, a] = De(() => r.current), [c, l] = De(!0);
  return Mn(() => {
    let u = !0;
    return l(!!e), (async () => {
      if (e) {
        const d = await e();
        u && (a(() => d), l(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || a(() => r.current);
    };
  }, [e]), [i, c];
}, ot = () => !1, Dl = (e, n) => {
  const [t] = ml(
    nn(async () => {
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
function gl(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const t = document.head || document.querySelector("head"), r = t.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && r ? t.insertBefore(o, r) : t.appendChild(o);
}
gl(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
  cursor: context-menu;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
`, "top");
export {
  He as Button,
  Sl as ChapterRangeSelector,
  qo as Checkbox,
  st as ComboBox,
  wl as ContextMenu,
  Jo as GridMenu,
  Ol as IconButton,
  Je as LabelPosition,
  Wo as MenuItem,
  Pl as RefSelector,
  Nl as SearchBar,
  Rl as Slider,
  $l as Snackbar,
  _l as Switch,
  Il as Table,
  In as TextField,
  Ml as Toolbar,
  Xo as TopLevelMenu,
  Al as useEvent,
  Dl as useEventAsync,
  ml as usePromise
};
//# sourceMappingURL=index.js.map
