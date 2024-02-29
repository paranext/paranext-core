import { jsx as S, jsxs as Oe, Fragment as Sr } from "react/jsx-runtime";
import { Button as Ds, Autocomplete as js, TextField as hi, FormControlLabel as po, FormLabel as Bs, Checkbox as Ls, MenuItem as mi, ListItemText as Vs, ListItemIcon as Fs, Menu as zs, Grid as gi, List as Us, IconButton as bi, Paper as Hs, Slider as Ws, Snackbar as qs, Switch as Gs, AppBar as Ks, Toolbar as Xs, Drawer as Ys } from "@mui/material";
import * as T from "react";
import Pt, { useMemo as sn, useState as ct, useCallback as St, useRef as hr, useEffect as Dn } from "react";
import Js, { ThemeContext as Zs, internal_processStyles as Qs } from "@mui/styled-engine";
import * as ea from "react-dom";
import bn from "react-dom";
import { offsetBook as fo, FIRST_SCR_BOOK_NUM as ta, offsetChapter as ho, FIRST_SCR_CHAPTER_NUM as na, getChaptersForBook as ra, offsetVerse as mo, FIRST_SCR_VERSE_NUM as oa } from "platform-bible-utils";
import ia, { SelectColumn as sa } from "react-data-grid";
function gt({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ S(
    Ds,
    {
      id: e,
      disabled: t,
      className: `papi-button ${n ?? ""}`,
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
function mr({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: a,
  options: l = [],
  className: c,
  value: u,
  onChange: p,
  onFocus: f,
  onBlur: d,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ S(
    js,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: u,
      onChange: p,
      onFocus: f,
      onBlur: d,
      getOptionLabel: b,
      renderInput: (v) => /* @__PURE__ */ S(
        hi,
        {
          ...v,
          error: o,
          fullWidth: i,
          disabled: n,
          label: t,
          style: { width: a }
        }
      )
    }
  );
}
function wf({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const a = sn(
    () => Array.from({ length: i }, (u, p) => p + 1),
    [i]
  ), l = (u, p) => {
    n(p), p > t && r(p);
  }, c = (u, p) => {
    r(p), p < e && n(p);
  };
  return /* @__PURE__ */ Oe(Sr, { children: [
    /* @__PURE__ */ S(
      po,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ S(
          mr,
          {
            onChange: (u, p) => l(u, p),
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
    /* @__PURE__ */ S(
      po,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ S(
          mr,
          {
            onChange: (u, p) => c(u, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: a,
            getOptionLabel: (u) => u.toString(),
            value: t,
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
var wt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(wt || {});
function aa({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = wt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const p = /* @__PURE__ */ S(
    Ls,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: a,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: u
    }
  );
  let f;
  if (n) {
    const d = r === wt.Before || r === wt.Above, b = /* @__PURE__ */ S("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === wt.Before || r === wt.After, m = v ? b : /* @__PURE__ */ S("div", { children: b }), h = v ? p : /* @__PURE__ */ S("div", { children: p });
    f = /* @__PURE__ */ Oe(
      Bs,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: a,
        error: l,
        children: [
          d && m,
          h,
          !d && m
        ]
      }
    );
  } else
    f = p;
  return f;
}
function ce(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function w() {
  return w = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, w.apply(this, arguments);
}
function la(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var gr = { exports: {} }, vn = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var go;
function ca() {
  if (go)
    return ie;
  go = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
  function y(g) {
    if (typeof g == "object" && g !== null) {
      var k = g.$$typeof;
      switch (k) {
        case t:
          switch (g = g.type, g) {
            case c:
            case u:
            case r:
            case i:
            case o:
            case f:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case p:
                case v:
                case b:
                case a:
                  return g;
                default:
                  return k;
              }
          }
        case n:
          return k;
      }
    }
  }
  function E(g) {
    return y(g) === u;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = u, ie.ContextConsumer = l, ie.ContextProvider = a, ie.Element = t, ie.ForwardRef = p, ie.Fragment = r, ie.Lazy = v, ie.Memo = b, ie.Portal = n, ie.Profiler = i, ie.StrictMode = o, ie.Suspense = f, ie.isAsyncMode = function(g) {
    return E(g) || y(g) === c;
  }, ie.isConcurrentMode = E, ie.isContextConsumer = function(g) {
    return y(g) === l;
  }, ie.isContextProvider = function(g) {
    return y(g) === a;
  }, ie.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === t;
  }, ie.isForwardRef = function(g) {
    return y(g) === p;
  }, ie.isFragment = function(g) {
    return y(g) === r;
  }, ie.isLazy = function(g) {
    return y(g) === v;
  }, ie.isMemo = function(g) {
    return y(g) === b;
  }, ie.isPortal = function(g) {
    return y(g) === n;
  }, ie.isProfiler = function(g) {
    return y(g) === i;
  }, ie.isStrictMode = function(g) {
    return y(g) === o;
  }, ie.isSuspense = function(g) {
    return y(g) === f;
  }, ie.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === u || g === i || g === o || g === f || g === d || typeof g == "object" && g !== null && (g.$$typeof === v || g.$$typeof === b || g.$$typeof === a || g.$$typeof === l || g.$$typeof === p || g.$$typeof === h || g.$$typeof === x || g.$$typeof === $ || g.$$typeof === m);
  }, ie.typeOf = y, ie;
}
var se = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bo;
function ua() {
  return bo || (bo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
    function y(N) {
      return typeof N == "string" || typeof N == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      N === r || N === u || N === i || N === o || N === f || N === d || typeof N == "object" && N !== null && (N.$$typeof === v || N.$$typeof === b || N.$$typeof === a || N.$$typeof === l || N.$$typeof === p || N.$$typeof === h || N.$$typeof === x || N.$$typeof === $ || N.$$typeof === m);
    }
    function E(N) {
      if (typeof N == "object" && N !== null) {
        var J = N.$$typeof;
        switch (J) {
          case t:
            var C = N.type;
            switch (C) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case f:
                return C;
              default:
                var re = C && C.$$typeof;
                switch (re) {
                  case l:
                  case p:
                  case v:
                  case b:
                  case a:
                    return re;
                  default:
                    return J;
                }
            }
          case n:
            return J;
        }
      }
    }
    var g = c, k = u, P = l, D = a, _ = t, A = p, B = r, z = v, G = b, L = n, I = i, R = o, j = f, Q = !1;
    function Z(N) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(N) || E(N) === c;
    }
    function O(N) {
      return E(N) === u;
    }
    function M(N) {
      return E(N) === l;
    }
    function F(N) {
      return E(N) === a;
    }
    function K(N) {
      return typeof N == "object" && N !== null && N.$$typeof === t;
    }
    function V(N) {
      return E(N) === p;
    }
    function U(N) {
      return E(N) === r;
    }
    function W(N) {
      return E(N) === v;
    }
    function q(N) {
      return E(N) === b;
    }
    function H(N) {
      return E(N) === n;
    }
    function X(N) {
      return E(N) === i;
    }
    function Y(N) {
      return E(N) === o;
    }
    function ne(N) {
      return E(N) === f;
    }
    se.AsyncMode = g, se.ConcurrentMode = k, se.ContextConsumer = P, se.ContextProvider = D, se.Element = _, se.ForwardRef = A, se.Fragment = B, se.Lazy = z, se.Memo = G, se.Portal = L, se.Profiler = I, se.StrictMode = R, se.Suspense = j, se.isAsyncMode = Z, se.isConcurrentMode = O, se.isContextConsumer = M, se.isContextProvider = F, se.isElement = K, se.isForwardRef = V, se.isFragment = U, se.isLazy = W, se.isMemo = q, se.isPortal = H, se.isProfiler = X, se.isStrictMode = Y, se.isSuspense = ne, se.isValidElementType = y, se.typeOf = E;
  }()), se;
}
var vo;
function vi() {
  return vo || (vo = 1, process.env.NODE_ENV === "production" ? vn.exports = ca() : vn.exports = ua()), vn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var er, yo;
function pa() {
  if (yo)
    return er;
  yo = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
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
      for (var a = {}, l = 0; l < 10; l++)
        a["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(a).map(function(p) {
        return a[p];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(p) {
        u[p] = p;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return er = o() ? Object.assign : function(i, a) {
    for (var l, c = r(i), u, p = 1; p < arguments.length; p++) {
      l = Object(arguments[p]);
      for (var f in l)
        t.call(l, f) && (c[f] = l[f]);
      if (e) {
        u = e(l);
        for (var d = 0; d < u.length; d++)
          n.call(l, u[d]) && (c[u[d]] = l[u[d]]);
      }
    }
    return c;
  }, er;
}
var tr, Eo;
function Cr() {
  if (Eo)
    return tr;
  Eo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return tr = e, tr;
}
var nr, xo;
function yi() {
  return xo || (xo = 1, nr = Function.call.bind(Object.prototype.hasOwnProperty)), nr;
}
var rr, To;
function da() {
  if (To)
    return rr;
  To = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Cr(), n = {}, r = yi();
    e = function(i) {
      var a = "Warning: " + i;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function o(i, a, l, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var p in i)
        if (r(i, p)) {
          var f;
          try {
            if (typeof i[p] != "function") {
              var d = Error(
                (c || "React class") + ": " + l + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            f = i[p](a, p, c, l, null, t);
          } catch (v) {
            f = v;
          }
          if (f && !(f instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + p + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var b = u ? u() : "";
            e(
              "Failed " + l + " type: " + f.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, rr = o, rr;
}
var or, wo;
function fa() {
  if (wo)
    return or;
  wo = 1;
  var e = vi(), t = pa(), n = Cr(), r = yi(), o = da(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(l) {
    var c = "Warning: " + l;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return or = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function f(O) {
      var M = O && (u && O[u] || O[p]);
      if (typeof M == "function")
        return M;
    }
    var d = "<<anonymous>>", b = {
      array: x("array"),
      bigint: x("bigint"),
      bool: x("boolean"),
      func: x("function"),
      number: x("number"),
      object: x("object"),
      string: x("string"),
      symbol: x("symbol"),
      any: $(),
      arrayOf: y,
      element: E(),
      elementType: g(),
      instanceOf: k,
      node: A(),
      objectOf: D,
      oneOf: P,
      oneOfType: _,
      shape: z,
      exact: G
    };
    function v(O, M) {
      return O === M ? O !== 0 || 1 / O === 1 / M : O !== O && M !== M;
    }
    function m(O, M) {
      this.message = O, this.data = M && typeof M == "object" ? M : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function h(O) {
      if (process.env.NODE_ENV !== "production")
        var M = {}, F = 0;
      function K(U, W, q, H, X, Y, ne) {
        if (H = H || d, Y = Y || q, ne !== n) {
          if (c) {
            var N = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw N.name = "Invariant Violation", N;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var J = H + ":" + q;
            !M[J] && // Avoid spamming the console because they are often not actionable except for lib authors
            F < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + H + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), M[J] = !0, F++);
          }
        }
        return W[q] == null ? U ? W[q] === null ? new m("The " + X + " `" + Y + "` is marked as required " + ("in `" + H + "`, but its value is `null`.")) : new m("The " + X + " `" + Y + "` is marked as required in " + ("`" + H + "`, but its value is `undefined`.")) : null : O(W, q, H, X, Y);
      }
      var V = K.bind(null, !1);
      return V.isRequired = K.bind(null, !0), V;
    }
    function x(O) {
      function M(F, K, V, U, W, q) {
        var H = F[K], X = R(H);
        if (X !== O) {
          var Y = j(H);
          return new m(
            "Invalid " + U + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + V + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return h(M);
    }
    function $() {
      return h(a);
    }
    function y(O) {
      function M(F, K, V, U, W) {
        if (typeof O != "function")
          return new m("Property `" + W + "` of component `" + V + "` has invalid PropType notation inside arrayOf.");
        var q = F[K];
        if (!Array.isArray(q)) {
          var H = R(q);
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + H + "` supplied to `" + V + "`, expected an array."));
        }
        for (var X = 0; X < q.length; X++) {
          var Y = O(q, X, V, U, W + "[" + X + "]", n);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return h(M);
    }
    function E() {
      function O(M, F, K, V, U) {
        var W = M[F];
        if (!l(W)) {
          var q = R(W);
          return new m("Invalid " + V + " `" + U + "` of type " + ("`" + q + "` supplied to `" + K + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(O);
    }
    function g() {
      function O(M, F, K, V, U) {
        var W = M[F];
        if (!e.isValidElementType(W)) {
          var q = R(W);
          return new m("Invalid " + V + " `" + U + "` of type " + ("`" + q + "` supplied to `" + K + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(O);
    }
    function k(O) {
      function M(F, K, V, U, W) {
        if (!(F[K] instanceof O)) {
          var q = O.name || d, H = Z(F[K]);
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + H + "` supplied to `" + V + "`, expected ") + ("instance of `" + q + "`."));
        }
        return null;
      }
      return h(M);
    }
    function P(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function M(F, K, V, U, W) {
        for (var q = F[K], H = 0; H < O.length; H++)
          if (v(q, O[H]))
            return null;
        var X = JSON.stringify(O, function(ne, N) {
          var J = j(N);
          return J === "symbol" ? String(N) : N;
        });
        return new m("Invalid " + U + " `" + W + "` of value `" + String(q) + "` " + ("supplied to `" + V + "`, expected one of " + X + "."));
      }
      return h(M);
    }
    function D(O) {
      function M(F, K, V, U, W) {
        if (typeof O != "function")
          return new m("Property `" + W + "` of component `" + V + "` has invalid PropType notation inside objectOf.");
        var q = F[K], H = R(q);
        if (H !== "object")
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + H + "` supplied to `" + V + "`, expected an object."));
        for (var X in q)
          if (r(q, X)) {
            var Y = O(q, X, V, U, W + "." + X, n);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return h(M);
    }
    function _(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var M = 0; M < O.length; M++) {
        var F = O[M];
        if (typeof F != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(F) + " at index " + M + "."
          ), a;
      }
      function K(V, U, W, q, H) {
        for (var X = [], Y = 0; Y < O.length; Y++) {
          var ne = O[Y], N = ne(V, U, W, q, H, n);
          if (N == null)
            return null;
          N.data && r(N.data, "expectedType") && X.push(N.data.expectedType);
        }
        var J = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new m("Invalid " + q + " `" + H + "` supplied to " + ("`" + W + "`" + J + "."));
      }
      return h(K);
    }
    function A() {
      function O(M, F, K, V, U) {
        return L(M[F]) ? null : new m("Invalid " + V + " `" + U + "` supplied to " + ("`" + K + "`, expected a ReactNode."));
      }
      return h(O);
    }
    function B(O, M, F, K, V) {
      return new m(
        (O || "React class") + ": " + M + " type `" + F + "." + K + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + V + "`."
      );
    }
    function z(O) {
      function M(F, K, V, U, W) {
        var q = F[K], H = R(q);
        if (H !== "object")
          return new m("Invalid " + U + " `" + W + "` of type `" + H + "` " + ("supplied to `" + V + "`, expected `object`."));
        for (var X in O) {
          var Y = O[X];
          if (typeof Y != "function")
            return B(V, U, W, X, j(Y));
          var ne = Y(q, X, V, U, W + "." + X, n);
          if (ne)
            return ne;
        }
        return null;
      }
      return h(M);
    }
    function G(O) {
      function M(F, K, V, U, W) {
        var q = F[K], H = R(q);
        if (H !== "object")
          return new m("Invalid " + U + " `" + W + "` of type `" + H + "` " + ("supplied to `" + V + "`, expected `object`."));
        var X = t({}, F[K], O);
        for (var Y in X) {
          var ne = O[Y];
          if (r(O, Y) && typeof ne != "function")
            return B(V, U, W, Y, j(ne));
          if (!ne)
            return new m(
              "Invalid " + U + " `" + W + "` key `" + Y + "` supplied to `" + V + "`.\nBad object: " + JSON.stringify(F[K], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var N = ne(q, Y, V, U, W + "." + Y, n);
          if (N)
            return N;
        }
        return null;
      }
      return h(M);
    }
    function L(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(L);
          if (O === null || l(O))
            return !0;
          var M = f(O);
          if (M) {
            var F = M.call(O), K;
            if (M !== O.entries) {
              for (; !(K = F.next()).done; )
                if (!L(K.value))
                  return !1;
            } else
              for (; !(K = F.next()).done; ) {
                var V = K.value;
                if (V && !L(V[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function I(O, M) {
      return O === "symbol" ? !0 : M ? M["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && M instanceof Symbol : !1;
    }
    function R(O) {
      var M = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : I(M, O) ? "symbol" : M;
    }
    function j(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var M = R(O);
      if (M === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function Q(O) {
      var M = j(O);
      switch (M) {
        case "array":
        case "object":
          return "an " + M;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + M;
        default:
          return M;
      }
    }
    function Z(O) {
      return !O.constructor || !O.constructor.name ? d : O.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, or;
}
var ir, Oo;
function ha() {
  if (Oo)
    return ir;
  Oo = 1;
  var e = Cr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, ir = function() {
    function r(a, l, c, u, p, f) {
      if (f !== e) {
        var d = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw d.name = "Invariant Violation", d;
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
      checkPropTypes: n,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, ir;
}
if (process.env.NODE_ENV !== "production") {
  var ma = vi(), ga = !0;
  gr.exports = fa()(ma.isElement, ga);
} else
  gr.exports = ha()();
var ba = gr.exports;
const s = /* @__PURE__ */ la(ba);
function Ei(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = Ei(e[t])) && (r && (r += " "), r += n);
    } else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function Re() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Ei(e)) && (r && (r += " "), r += t);
  return r;
}
function _t(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function lt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function xi(e) {
  if (!lt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = xi(e[n]);
  }), t;
}
function We(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? w({}, e) : e;
  return lt(e) && lt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (lt(t[o]) && o in e && lt(e[o]) ? r[o] = We(e[o], t[o], n) : n.clone ? r[o] = lt(t[o]) ? xi(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function va(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Ti(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !va(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const wi = _t(s.element, Ti);
wi.isRequired = _t(s.element.isRequired, Ti);
const an = wi;
function ya(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Ea(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !ya(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const xa = _t(s.elementType, Ea), Ta = "exact-prop: ​";
function Oi(e) {
  return process.env.NODE_ENV === "production" ? e : w({}, e, {
    [Ta]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Rt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var br = { exports: {} }, ae = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ko;
function wa() {
  if (ko)
    return ae;
  ko = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function m(h) {
    if (typeof h == "object" && h !== null) {
      var x = h.$$typeof;
      switch (x) {
        case e:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case u:
            case p:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case a:
                case c:
                case d:
                case f:
                case i:
                  return h;
                default:
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return ae.ContextConsumer = a, ae.ContextProvider = i, ae.Element = e, ae.ForwardRef = c, ae.Fragment = n, ae.Lazy = d, ae.Memo = f, ae.Portal = t, ae.Profiler = o, ae.StrictMode = r, ae.Suspense = u, ae.SuspenseList = p, ae.isAsyncMode = function() {
    return !1;
  }, ae.isConcurrentMode = function() {
    return !1;
  }, ae.isContextConsumer = function(h) {
    return m(h) === a;
  }, ae.isContextProvider = function(h) {
    return m(h) === i;
  }, ae.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, ae.isForwardRef = function(h) {
    return m(h) === c;
  }, ae.isFragment = function(h) {
    return m(h) === n;
  }, ae.isLazy = function(h) {
    return m(h) === d;
  }, ae.isMemo = function(h) {
    return m(h) === f;
  }, ae.isPortal = function(h) {
    return m(h) === t;
  }, ae.isProfiler = function(h) {
    return m(h) === o;
  }, ae.isStrictMode = function(h) {
    return m(h) === r;
  }, ae.isSuspense = function(h) {
    return m(h) === u;
  }, ae.isSuspenseList = function(h) {
    return m(h) === p;
  }, ae.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === u || h === p || h === b || typeof h == "object" && h !== null && (h.$$typeof === d || h.$$typeof === f || h.$$typeof === i || h.$$typeof === a || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
  }, ae.typeOf = m, ae;
}
var le = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Po;
function Oa() {
  return Po || (Po = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, m = !1, h = !1, x = !1, $ = !1, y;
    y = Symbol.for("react.module.reference");
    function E(C) {
      return !!(typeof C == "string" || typeof C == "function" || C === n || C === o || $ || C === r || C === u || C === p || x || C === b || v || m || h || typeof C == "object" && C !== null && (C.$$typeof === d || C.$$typeof === f || C.$$typeof === i || C.$$typeof === a || C.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      C.$$typeof === y || C.getModuleId !== void 0));
    }
    function g(C) {
      if (typeof C == "object" && C !== null) {
        var re = C.$$typeof;
        switch (re) {
          case e:
            var me = C.type;
            switch (me) {
              case n:
              case o:
              case r:
              case u:
              case p:
                return me;
              default:
                var ve = me && me.$$typeof;
                switch (ve) {
                  case l:
                  case a:
                  case c:
                  case d:
                  case f:
                  case i:
                    return ve;
                  default:
                    return re;
                }
            }
          case t:
            return re;
        }
      }
    }
    var k = a, P = i, D = e, _ = c, A = n, B = d, z = f, G = t, L = o, I = r, R = u, j = p, Q = !1, Z = !1;
    function O(C) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function M(C) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function F(C) {
      return g(C) === a;
    }
    function K(C) {
      return g(C) === i;
    }
    function V(C) {
      return typeof C == "object" && C !== null && C.$$typeof === e;
    }
    function U(C) {
      return g(C) === c;
    }
    function W(C) {
      return g(C) === n;
    }
    function q(C) {
      return g(C) === d;
    }
    function H(C) {
      return g(C) === f;
    }
    function X(C) {
      return g(C) === t;
    }
    function Y(C) {
      return g(C) === o;
    }
    function ne(C) {
      return g(C) === r;
    }
    function N(C) {
      return g(C) === u;
    }
    function J(C) {
      return g(C) === p;
    }
    le.ContextConsumer = k, le.ContextProvider = P, le.Element = D, le.ForwardRef = _, le.Fragment = A, le.Lazy = B, le.Memo = z, le.Portal = G, le.Profiler = L, le.StrictMode = I, le.Suspense = R, le.SuspenseList = j, le.isAsyncMode = O, le.isConcurrentMode = M, le.isContextConsumer = F, le.isContextProvider = K, le.isElement = V, le.isForwardRef = U, le.isFragment = W, le.isLazy = q, le.isMemo = H, le.isPortal = X, le.isProfiler = Y, le.isStrictMode = ne, le.isSuspense = N, le.isSuspenseList = J, le.isValidElementType = E, le.typeOf = g;
  }()), le;
}
process.env.NODE_ENV === "production" ? br.exports = wa() : br.exports = Oa();
var Sn = br.exports;
const ka = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Pa(e) {
  const t = `${e}`.match(ka);
  return t && t[1] || "";
}
function ki(e, t = "") {
  return e.displayName || e.name || Pa(e) || t;
}
function So(e, t, n) {
  const r = ki(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Sa(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ki(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Sn.ForwardRef:
          return So(e, e.render, "ForwardRef");
        case Sn.Memo:
          return So(e, e.type, "memo");
        default:
          return;
      }
  }
}
function qe(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], a = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Ca = s.oneOfType([s.func, s.object]), Rr = Ca;
function Ge(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Rt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Co(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Ra(e, t = 166) {
  let n;
  function r(...o) {
    const i = () => {
      e.apply(this, o);
    };
    clearTimeout(n), n = setTimeout(i, t);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function xe(e) {
  return e && e.ownerDocument || document;
}
function en(e) {
  return xe(e).defaultView || window;
}
function vr(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Na = typeof window < "u" ? T.useLayoutEffect : T.useEffect, Nt = Na;
let Ro = 0;
function $a(e) {
  const [t, n] = T.useState(e), r = e || t;
  return T.useEffect(() => {
    t == null && (Ro += 1, n(`mui-${Ro}`));
  }, [t]), r;
}
const No = T["useId".toString()];
function Ma(e) {
  if (No !== void 0) {
    const t = No();
    return e ?? t;
  }
  return $a(e);
}
function Ia({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = T.useRef(e !== void 0), [i, a] = T.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    T.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: u
    } = T.useRef(t);
    T.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = T.useCallback((u) => {
    o || a(u);
  }, []);
  return [l, c];
}
function Cn(e) {
  const t = T.useRef(e);
  return Nt(() => {
    t.current = e;
  }), T.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function je(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      vr(n, t);
    });
  }, e);
}
const $o = {};
function Aa(e, t) {
  const n = T.useRef($o);
  return n.current === $o && (n.current = e(t)), n;
}
const _a = [];
function Da(e) {
  T.useEffect(e, _a);
}
class ln {
  constructor() {
    this.currentId = 0, this.clear = () => {
      this.currentId !== 0 && (clearTimeout(this.currentId), this.currentId = 0);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new ln();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = 0, n();
    }, t);
  }
}
function Gt() {
  const e = Aa(ln.create).current;
  return Da(e.disposeEffect), e;
}
let jn = !0, yr = !1;
const ja = new ln(), Ba = {
  text: !0,
  search: !0,
  url: !0,
  tel: !0,
  email: !0,
  password: !0,
  number: !0,
  date: !0,
  month: !0,
  week: !0,
  time: !0,
  datetime: !0,
  "datetime-local": !0
};
function La(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Ba[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Va(e) {
  e.metaKey || e.altKey || e.ctrlKey || (jn = !0);
}
function sr() {
  jn = !1;
}
function Fa() {
  this.visibilityState === "hidden" && yr && (jn = !0);
}
function za(e) {
  e.addEventListener("keydown", Va, !0), e.addEventListener("mousedown", sr, !0), e.addEventListener("pointerdown", sr, !0), e.addEventListener("touchstart", sr, !0), e.addEventListener("visibilitychange", Fa, !0);
}
function Ua(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return jn || La(t);
}
function Ha() {
  const e = T.useCallback((o) => {
    o != null && za(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function n() {
    return t.current ? (yr = !0, ja.start(100, () => {
      yr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Ua(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Pi(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Wa(e) {
  const t = typeof e;
  switch (t) {
    case "number":
      return Number.isNaN(e) ? "NaN" : Number.isFinite(e) ? e !== Math.floor(e) ? "float" : "number" : "Infinity";
    case "object":
      return e === null ? "null" : e.constructor.name;
    default:
      return t;
  }
}
function qa(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Ga = Number.isInteger || qa;
function Si(e, t, n, r) {
  const o = e[t];
  if (o == null || !Ga(o)) {
    const i = Wa(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Ci(e, t, ...n) {
  return e[t] === void 0 ? null : Si(e, t, ...n);
}
function Er() {
  return null;
}
Ci.isRequired = Si;
Er.isRequired = Er;
const Ri = process.env.NODE_ENV === "production" ? Er : Ci;
function Ni(e, t) {
  const n = w({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = w({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = w({}, i), Object.keys(o).forEach((a) => {
        n[r][a] = Ni(o[a], i[a]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function Ye(e, t, n = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((i, a) => {
        if (a) {
          const l = t(a);
          l !== "" && i.push(l), n && n[a] && i.push(n[a]);
        }
        return i;
      }, []).join(" ");
    }
  ), r;
}
const Mo = (e) => e, Ka = () => {
  let e = Mo;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Mo;
    }
  };
}, Xa = Ka(), Ya = Xa, $i = {
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
function Fe(e, t, n = "Mui") {
  const r = $i[t];
  return r ? `${n}-${r}` : `${Ya.generate(e)}-${t}`;
}
function tt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Fe(e, o, n);
  }), r;
}
function Ja(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Mi(e) {
  return typeof e == "string";
}
function Kt(e, t, n) {
  return e === void 0 || Mi(e) ? t : w({}, t, {
    ownerState: w({}, t.ownerState, n)
  });
}
const Za = {
  disableDefaultClasses: !1
}, Qa = /* @__PURE__ */ T.createContext(Za);
function el(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(Qa);
  return (n) => t ? "" : e(n);
}
function Ii(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function tl(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Ai(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = Ai(e[t])) && (r && (r += " "), r += n);
    } else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function Io() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Ai(e)) && (r && (r += " "), r += t);
  return r;
}
function Ao(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function nl(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = Io(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = w({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = w({}, n, o, r);
    return b.length > 0 && (m.className = b), Object.keys(v).length > 0 && (m.style = v), {
      props: m,
      internalRef: void 0
    };
  }
  const a = Ii(w({}, o, r)), l = Ao(r), c = Ao(o), u = t(a), p = Io(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = w({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = w({}, u, n, c, l);
  return p.length > 0 && (d.className = p), Object.keys(f).length > 0 && (d.style = f), {
    props: d,
    internalRef: u.ref
  };
}
const rl = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function pt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, a = ce(e, rl), l = i ? {} : tl(r, o), {
    props: c,
    internalRef: u
  } = nl(w({}, a, {
    externalSlotProps: l
  })), p = je(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Kt(n, w({}, c, {
    ref: p
  }), o);
}
const _i = "base";
function ol(e) {
  return `${_i}--${e}`;
}
function il(e, t) {
  return `${_i}-${e}-${t}`;
}
function Di(e, t) {
  const n = $i[t];
  return n ? ol(n) : il(e, t);
}
function sl(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Di(e, r);
  }), n;
}
const al = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function ll(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function cl(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function ul(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || cl(e));
}
function pl(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(al)).forEach((r, o) => {
    const i = ll(r);
    i === -1 || !ul(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function dl() {
  return !0;
}
function Rn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = pl,
    isEnabled: a = dl,
    open: l
  } = e, c = T.useRef(!1), u = T.useRef(null), p = T.useRef(null), f = T.useRef(null), d = T.useRef(null), b = T.useRef(!1), v = T.useRef(null), m = je(t.ref, v), h = T.useRef(null);
  T.useEffect(() => {
    !l || !v.current || (b.current = !n);
  }, [n, l]), T.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = xe(v.current);
    return v.current.contains(y.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), b.current && v.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = xe(v.current), E = (P) => {
      h.current = P, !(r || !a() || P.key !== "Tab") && y.activeElement === v.current && P.shiftKey && (c.current = !0, p.current && p.current.focus());
    }, g = () => {
      const P = v.current;
      if (P === null)
        return;
      if (!y.hasFocus() || !a() || c.current) {
        c.current = !1;
        return;
      }
      if (P.contains(y.activeElement) || r && y.activeElement !== u.current && y.activeElement !== p.current)
        return;
      if (y.activeElement !== d.current)
        d.current = null;
      else if (d.current !== null)
        return;
      if (!b.current)
        return;
      let D = [];
      if ((y.activeElement === u.current || y.activeElement === p.current) && (D = i(v.current)), D.length > 0) {
        var _, A;
        const B = !!((_ = h.current) != null && _.shiftKey && ((A = h.current) == null ? void 0 : A.key) === "Tab"), z = D[0], G = D[D.length - 1];
        typeof z != "string" && typeof G != "string" && (B ? G.focus() : z.focus());
      } else
        P.focus();
    };
    y.addEventListener("focusin", g), y.addEventListener("keydown", E, !0);
    const k = setInterval(() => {
      y.activeElement && y.activeElement.tagName === "BODY" && g();
    }, 50);
    return () => {
      clearInterval(k), y.removeEventListener("focusin", g), y.removeEventListener("keydown", E, !0);
    };
  }, [n, r, o, a, l, i]);
  const x = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0, d.current = y.target;
    const E = t.props.onFocus;
    E && E(y);
  }, $ = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ Oe(T.Fragment, {
    children: [/* @__PURE__ */ S("div", {
      tabIndex: l ? 0 : -1,
      onFocus: $,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: m,
      onFocus: x
    }), /* @__PURE__ */ S("div", {
      tabIndex: l ? 0 : -1,
      onFocus: $,
      ref: p,
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
  children: an,
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
process.env.NODE_ENV !== "production" && (Rn["propTypes"] = Oi(Rn.propTypes));
function fl(e) {
  return typeof e == "function" ? e() : e;
}
const tn = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [a, l] = T.useState(null), c = je(/* @__PURE__ */ T.isValidElement(r) ? r.ref : null, n);
  if (Nt(() => {
    i || l(fl(o) || document.body);
  }, [o, i]), Nt(() => {
    if (a && !i)
      return vr(n, a), () => {
        vr(n, null);
      };
  }, [n, a, i]), i) {
    if (/* @__PURE__ */ T.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(r, u);
    }
    return /* @__PURE__ */ S(T.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ S(T.Fragment, {
    children: a && /* @__PURE__ */ ea.createPortal(r, a)
  });
});
process.env.NODE_ENV !== "production" && (tn.propTypes = {
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
  container: s.oneOfType([qe, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (tn["propTypes"] = Oi(tn.propTypes));
function hl(e) {
  const t = xe(e);
  return t.body === e ? en(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Yt(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function _o(e) {
  return parseInt(en(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function ml(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Do(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (a) => {
    const l = i.indexOf(a) === -1, c = !ml(a);
    l && c && Yt(a, o);
  });
}
function ar(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function gl(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (hl(r)) {
      const a = Pi(xe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${_o(r) + a}px`;
      const l = xe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${_o(c) + a}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = xe(r).body;
    else {
      const a = r.parentElement, l = en(r);
      i = (a == null ? void 0 : a.nodeName) === "HTML" && l.getComputedStyle(a).overflowY === "scroll" ? a : r;
    }
    n.push({
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
    n.forEach(({
      value: i,
      el: a,
      property: l
    }) => {
      i ? a.style.setProperty(l, i) : a.style.removeProperty(l);
    });
  };
}
function bl(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class vl {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && Yt(t.modalRef, !1);
    const o = bl(n);
    Do(n, t.mount, t.modalRef, o, !0);
    const i = ar(this.containers, (a) => a.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = ar(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = gl(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = ar(this.containers, (a) => a.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && Yt(t.modalRef, n), Do(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && Yt(a.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function yl(e) {
  return typeof e == "function" ? e() : e;
}
function El(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const xl = new vl();
function Tl(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = xl,
    closeAfterTransition: i = !1,
    onTransitionEnter: a,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: p,
    rootRef: f
  } = e, d = T.useRef({}), b = T.useRef(null), v = T.useRef(null), m = je(v, f), [h, x] = T.useState(!p), $ = El(c);
  let y = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (y = !1);
  const E = () => xe(b.current), g = () => (d.current.modalRef = v.current, d.current.mount = b.current, d.current), k = () => {
    o.mount(g(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, P = Cn(() => {
    const R = yl(t) || E().body;
    o.add(g(), R), v.current && k();
  }), D = T.useCallback(() => o.isTopModal(g()), [o]), _ = Cn((R) => {
    b.current = R, R && (p && D() ? k() : v.current && Yt(v.current, y));
  }), A = T.useCallback(() => {
    o.remove(g(), y);
  }, [y, o]);
  T.useEffect(() => () => {
    A();
  }, [A]), T.useEffect(() => {
    p ? P() : (!$ || !i) && A();
  }, [p, A, $, i, P]);
  const B = (R) => (j) => {
    var Q;
    (Q = R.onKeyDown) == null || Q.call(R, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !D()) && (n || (j.stopPropagation(), u && u(j, "escapeKeyDown")));
  }, z = (R) => (j) => {
    var Q;
    (Q = R.onClick) == null || Q.call(R, j), j.target === j.currentTarget && u && u(j, "backdropClick");
  };
  return {
    getRootProps: (R = {}) => {
      const j = Ii(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const Q = w({}, j, R);
      return w({
        role: "presentation"
      }, Q, {
        onKeyDown: B(Q),
        ref: m
      });
    },
    getBackdropProps: (R = {}) => {
      const j = R;
      return w({
        "aria-hidden": !0
      }, j, {
        onClick: z(j),
        open: p
      });
    },
    getTransitionProps: () => {
      const R = () => {
        x(!1), a && a();
      }, j = () => {
        x(!0), l && l(), i && A();
      };
      return {
        onEnter: Co(R, c == null ? void 0 : c.props.onEnter),
        onExited: Co(j, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: m,
    portalRef: _,
    isTopModal: D,
    exited: h,
    hasTransition: $
  };
}
var Te = "top", Ae = "bottom", _e = "right", we = "left", Nr = "auto", cn = [Te, Ae, _e, we], $t = "start", nn = "end", wl = "clippingParents", ji = "viewport", zt = "popper", Ol = "reference", jo = /* @__PURE__ */ cn.reduce(function(e, t) {
  return e.concat([t + "-" + $t, t + "-" + nn]);
}, []), Bi = /* @__PURE__ */ [].concat(cn, [Nr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + $t, t + "-" + nn]);
}, []), kl = "beforeRead", Pl = "read", Sl = "afterRead", Cl = "beforeMain", Rl = "main", Nl = "afterMain", $l = "beforeWrite", Ml = "write", Il = "afterWrite", Al = [kl, Pl, Sl, Cl, Rl, Nl, $l, Ml, Il];
function Ve(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ne(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function dt(e) {
  var t = Ne(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ie(e) {
  var t = Ne(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function $r(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ne(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function _l(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ie(i) || !Ve(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? i.removeAttribute(a) : i.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function Dl(e) {
  var t = e.state, n = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var o = t.elements[r], i = t.attributes[r] || {}, a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = a.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !Ie(o) || !Ve(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const jl = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: _l,
  effect: Dl,
  requires: ["computeStyles"]
};
function Le(e) {
  return e.split("-")[0];
}
var ut = Math.max, Nn = Math.min, Mt = Math.round;
function xr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Li() {
  return !/^((?!chrome|android).)*safari/i.test(xr());
}
function It(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ie(e) && (o = e.offsetWidth > 0 && Mt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Mt(r.height) / e.offsetHeight || 1);
  var a = dt(e) ? Ne(e) : window, l = a.visualViewport, c = !Li() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, d = r.height / i;
  return {
    width: f,
    height: d,
    top: p,
    right: u + f,
    bottom: p + d,
    left: u,
    x: u,
    y: p
  };
}
function Mr(e) {
  var t = It(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Vi(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && $r(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ke(e) {
  return Ne(e).getComputedStyle(e);
}
function Bl(e) {
  return ["table", "td", "th"].indexOf(Ve(e)) >= 0;
}
function nt(e) {
  return ((dt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Bn(e) {
  return Ve(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    ($r(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    nt(e)
  );
}
function Bo(e) {
  return !Ie(e) || // https://github.com/popperjs/popper-core/issues/837
  Ke(e).position === "fixed" ? null : e.offsetParent;
}
function Ll(e) {
  var t = /firefox/i.test(xr()), n = /Trident/i.test(xr());
  if (n && Ie(e)) {
    var r = Ke(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Bn(e);
  for ($r(o) && (o = o.host); Ie(o) && ["html", "body"].indexOf(Ve(o)) < 0; ) {
    var i = Ke(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function un(e) {
  for (var t = Ne(e), n = Bo(e); n && Bl(n) && Ke(n).position === "static"; )
    n = Bo(n);
  return n && (Ve(n) === "html" || Ve(n) === "body" && Ke(n).position === "static") ? t : n || Ll(e) || t;
}
function Ir(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Jt(e, t, n) {
  return ut(e, Nn(t, n));
}
function Vl(e, t, n) {
  var r = Jt(e, t, n);
  return r > n ? n : r;
}
function Fi() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function zi(e) {
  return Object.assign({}, Fi(), e);
}
function Ui(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Fl = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, zi(typeof t != "number" ? t : Ui(t, cn));
};
function zl(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, l = Le(n.placement), c = Ir(l), u = [we, _e].indexOf(l) >= 0, p = u ? "height" : "width";
  if (!(!i || !a)) {
    var f = Fl(o.padding, n), d = Mr(i), b = c === "y" ? Te : we, v = c === "y" ? Ae : _e, m = n.rects.reference[p] + n.rects.reference[c] - a[c] - n.rects.popper[p], h = a[c] - n.rects.reference[c], x = un(i), $ = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, y = m / 2 - h / 2, E = f[b], g = $ - d[p] - f[v], k = $ / 2 - d[p] / 2 + y, P = Jt(E, k, g), D = c;
    n.modifiersData[r] = (t = {}, t[D] = P, t.centerOffset = P - k, t);
  }
}
function Ul(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Vi(t.elements.popper, o) && (t.elements.arrow = o));
}
const Hl = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: zl,
  effect: Ul,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function At(e) {
  return e.split("-")[1];
}
var Wl = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ql(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Mt(n * o) / o || 0,
    y: Mt(r * o) / o || 0
  };
}
function Lo(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, a = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, p = e.roundOffsets, f = e.isFixed, d = a.x, b = d === void 0 ? 0 : d, v = a.y, m = v === void 0 ? 0 : v, h = typeof p == "function" ? p({
    x: b,
    y: m
  }) : {
    x: b,
    y: m
  };
  b = h.x, m = h.y;
  var x = a.hasOwnProperty("x"), $ = a.hasOwnProperty("y"), y = we, E = Te, g = window;
  if (u) {
    var k = un(n), P = "clientHeight", D = "clientWidth";
    if (k === Ne(n) && (k = nt(n), Ke(k).position !== "static" && l === "absolute" && (P = "scrollHeight", D = "scrollWidth")), k = k, o === Te || (o === we || o === _e) && i === nn) {
      E = Ae;
      var _ = f && k === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        k[P]
      );
      m -= _ - r.height, m *= c ? 1 : -1;
    }
    if (o === we || (o === Te || o === Ae) && i === nn) {
      y = _e;
      var A = f && k === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        k[D]
      );
      b -= A - r.width, b *= c ? 1 : -1;
    }
  }
  var B = Object.assign({
    position: l
  }, u && Wl), z = p === !0 ? ql({
    x: b,
    y: m
  }, Ne(n)) : {
    x: b,
    y: m
  };
  if (b = z.x, m = z.y, c) {
    var G;
    return Object.assign({}, B, (G = {}, G[E] = $ ? "0" : "", G[y] = x ? "0" : "", G.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + m + "px)" : "translate3d(" + b + "px, " + m + "px, 0)", G));
  }
  return Object.assign({}, B, (t = {}, t[E] = $ ? m + "px" : "", t[y] = x ? b + "px" : "", t.transform = "", t));
}
function Gl(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, a = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Le(t.placement),
    variation: At(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Lo(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Lo(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Kl = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Gl,
  data: {}
};
var yn = {
  passive: !0
};
function Xl(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, a = r.resize, l = a === void 0 ? !0 : a, c = Ne(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(p) {
    p.addEventListener("scroll", n.update, yn);
  }), l && c.addEventListener("resize", n.update, yn), function() {
    i && u.forEach(function(p) {
      p.removeEventListener("scroll", n.update, yn);
    }), l && c.removeEventListener("resize", n.update, yn);
  };
}
const Yl = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Xl,
  data: {}
};
var Jl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function wn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Jl[t];
  });
}
var Zl = {
  start: "end",
  end: "start"
};
function Vo(e) {
  return e.replace(/start|end/g, function(t) {
    return Zl[t];
  });
}
function Ar(e) {
  var t = Ne(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function _r(e) {
  return It(nt(e)).left + Ar(e).scrollLeft;
}
function Ql(e, t) {
  var n = Ne(e), r = nt(e), o = n.visualViewport, i = r.clientWidth, a = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, a = o.height;
    var u = Li();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: l + _r(e),
    y: c
  };
}
function ec(e) {
  var t, n = nt(e), r = Ar(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = ut(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = ut(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + _r(e), c = -r.scrollTop;
  return Ke(o || n).direction === "rtl" && (l += ut(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function Dr(e) {
  var t = Ke(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Hi(e) {
  return ["html", "body", "#document"].indexOf(Ve(e)) >= 0 ? e.ownerDocument.body : Ie(e) && Dr(e) ? e : Hi(Bn(e));
}
function Zt(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Hi(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Ne(r), a = o ? [i].concat(i.visualViewport || [], Dr(r) ? r : []) : r, l = t.concat(a);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Zt(Bn(a)))
  );
}
function Tr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function tc(e, t) {
  var n = It(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Fo(e, t, n) {
  return t === ji ? Tr(Ql(e, n)) : dt(t) ? tc(t, n) : Tr(ec(nt(e)));
}
function nc(e) {
  var t = Zt(Bn(e)), n = ["absolute", "fixed"].indexOf(Ke(e).position) >= 0, r = n && Ie(e) ? un(e) : e;
  return dt(r) ? t.filter(function(o) {
    return dt(o) && Vi(o, r) && Ve(o) !== "body";
  }) : [];
}
function rc(e, t, n, r) {
  var o = t === "clippingParents" ? nc(e) : [].concat(t), i = [].concat(o, [n]), a = i[0], l = i.reduce(function(c, u) {
    var p = Fo(e, u, r);
    return c.top = ut(p.top, c.top), c.right = Nn(p.right, c.right), c.bottom = Nn(p.bottom, c.bottom), c.left = ut(p.left, c.left), c;
  }, Fo(e, a, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Wi(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Le(r) : null, i = r ? At(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Te:
      c = {
        x: a,
        y: t.y - n.height
      };
      break;
    case Ae:
      c = {
        x: a,
        y: t.y + t.height
      };
      break;
    case _e:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case we:
      c = {
        x: t.x - n.width,
        y: l
      };
      break;
    default:
      c = {
        x: t.x,
        y: t.y
      };
  }
  var u = o ? Ir(o) : null;
  if (u != null) {
    var p = u === "y" ? "height" : "width";
    switch (i) {
      case $t:
        c[u] = c[u] - (t[p] / 2 - n[p] / 2);
        break;
      case nn:
        c[u] = c[u] + (t[p] / 2 - n[p] / 2);
        break;
    }
  }
  return c;
}
function rn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, a = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? wl : l, u = n.rootBoundary, p = u === void 0 ? ji : u, f = n.elementContext, d = f === void 0 ? zt : f, b = n.altBoundary, v = b === void 0 ? !1 : b, m = n.padding, h = m === void 0 ? 0 : m, x = zi(typeof h != "number" ? h : Ui(h, cn)), $ = d === zt ? Ol : zt, y = e.rects.popper, E = e.elements[v ? $ : d], g = rc(dt(E) ? E : E.contextElement || nt(e.elements.popper), c, p, a), k = It(e.elements.reference), P = Wi({
    reference: k,
    element: y,
    strategy: "absolute",
    placement: o
  }), D = Tr(Object.assign({}, y, P)), _ = d === zt ? D : k, A = {
    top: g.top - _.top + x.top,
    bottom: _.bottom - g.bottom + x.bottom,
    left: g.left - _.left + x.left,
    right: _.right - g.right + x.right
  }, B = e.modifiersData.offset;
  if (d === zt && B) {
    var z = B[o];
    Object.keys(A).forEach(function(G) {
      var L = [_e, Ae].indexOf(G) >= 0 ? 1 : -1, I = [Te, Ae].indexOf(G) >= 0 ? "y" : "x";
      A[G] += z[I] * L;
    });
  }
  return A;
}
function oc(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? Bi : c, p = At(r), f = p ? l ? jo : jo.filter(function(v) {
    return At(v) === p;
  }) : cn, d = f.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  d.length === 0 && (d = f);
  var b = d.reduce(function(v, m) {
    return v[m] = rn(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: a
    })[Le(m)], v;
  }, {});
  return Object.keys(b).sort(function(v, m) {
    return b[v] - b[m];
  });
}
function ic(e) {
  if (Le(e) === Nr)
    return [];
  var t = wn(e);
  return [Vo(e), t, Vo(t)];
}
function sc(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !0 : a, c = n.fallbackPlacements, u = n.padding, p = n.boundary, f = n.rootBoundary, d = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, m = n.allowedAutoPlacements, h = t.options.placement, x = Le(h), $ = x === h, y = c || ($ || !v ? [wn(h)] : ic(h)), E = [h].concat(y).reduce(function(V, U) {
      return V.concat(Le(U) === Nr ? oc(t, {
        placement: U,
        boundary: p,
        rootBoundary: f,
        padding: u,
        flipVariations: v,
        allowedAutoPlacements: m
      }) : U);
    }, []), g = t.rects.reference, k = t.rects.popper, P = /* @__PURE__ */ new Map(), D = !0, _ = E[0], A = 0; A < E.length; A++) {
      var B = E[A], z = Le(B), G = At(B) === $t, L = [Te, Ae].indexOf(z) >= 0, I = L ? "width" : "height", R = rn(t, {
        placement: B,
        boundary: p,
        rootBoundary: f,
        altBoundary: d,
        padding: u
      }), j = L ? G ? _e : we : G ? Ae : Te;
      g[I] > k[I] && (j = wn(j));
      var Q = wn(j), Z = [];
      if (i && Z.push(R[z] <= 0), l && Z.push(R[j] <= 0, R[Q] <= 0), Z.every(function(V) {
        return V;
      })) {
        _ = B, D = !1;
        break;
      }
      P.set(B, Z);
    }
    if (D)
      for (var O = v ? 3 : 1, M = function(U) {
        var W = E.find(function(q) {
          var H = P.get(q);
          if (H)
            return H.slice(0, U).every(function(X) {
              return X;
            });
        });
        if (W)
          return _ = W, "break";
      }, F = O; F > 0; F--) {
        var K = M(F);
        if (K === "break")
          break;
      }
    t.placement !== _ && (t.modifiersData[r]._skip = !0, t.placement = _, t.reset = !0);
  }
}
const ac = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: sc,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function zo(e, t, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function Uo(e) {
  return [Te, _e, Ae, we].some(function(t) {
    return e[t] >= 0;
  });
}
function lc(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, a = rn(t, {
    elementContext: "reference"
  }), l = rn(t, {
    altBoundary: !0
  }), c = zo(a, r), u = zo(l, o, i), p = Uo(c), f = Uo(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: p,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": f
  });
}
const cc = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: lc
};
function uc(e, t, n) {
  var r = Le(e), o = [we, Te].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, a = i[0], l = i[1];
  return a = a || 0, l = (l || 0) * o, [we, _e].indexOf(r) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function pc(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = Bi.reduce(function(p, f) {
    return p[f] = uc(f, t.rects, i), p;
  }, {}), l = a[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
const dc = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: pc
};
function fc(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Wi({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const hc = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: fc,
  data: {}
};
function mc(e) {
  return e === "x" ? "y" : "x";
}
function gc(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !1 : a, c = n.boundary, u = n.rootBoundary, p = n.altBoundary, f = n.padding, d = n.tether, b = d === void 0 ? !0 : d, v = n.tetherOffset, m = v === void 0 ? 0 : v, h = rn(t, {
    boundary: c,
    rootBoundary: u,
    padding: f,
    altBoundary: p
  }), x = Le(t.placement), $ = At(t.placement), y = !$, E = Ir(x), g = mc(E), k = t.modifiersData.popperOffsets, P = t.rects.reference, D = t.rects.popper, _ = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, A = typeof _ == "number" ? {
    mainAxis: _,
    altAxis: _
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, _), B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, z = {
    x: 0,
    y: 0
  };
  if (k) {
    if (i) {
      var G, L = E === "y" ? Te : we, I = E === "y" ? Ae : _e, R = E === "y" ? "height" : "width", j = k[E], Q = j + h[L], Z = j - h[I], O = b ? -D[R] / 2 : 0, M = $ === $t ? P[R] : D[R], F = $ === $t ? -D[R] : -P[R], K = t.elements.arrow, V = b && K ? Mr(K) : {
        width: 0,
        height: 0
      }, U = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Fi(), W = U[L], q = U[I], H = Jt(0, P[R], V[R]), X = y ? P[R] / 2 - O - H - W - A.mainAxis : M - H - W - A.mainAxis, Y = y ? -P[R] / 2 + O + H + q + A.mainAxis : F + H + q + A.mainAxis, ne = t.elements.arrow && un(t.elements.arrow), N = ne ? E === "y" ? ne.clientTop || 0 : ne.clientLeft || 0 : 0, J = (G = B == null ? void 0 : B[E]) != null ? G : 0, C = j + X - J - N, re = j + Y - J, me = Jt(b ? Nn(Q, C) : Q, j, b ? ut(Z, re) : Z);
      k[E] = me, z[E] = me - j;
    }
    if (l) {
      var ve, fe = E === "x" ? Te : we, ot = E === "x" ? Ae : _e, ye = k[g], ze = g === "y" ? "height" : "width", ke = ye + h[fe], Ue = ye - h[ot], ge = [Te, we].indexOf(x) !== -1, mt = (ve = B == null ? void 0 : B[g]) != null ? ve : 0, it = ge ? ke : ye - P[ze] - D[ze] - mt + A.altAxis, jt = ge ? ye + P[ze] + D[ze] - mt - A.altAxis : Ue, hn = b && ge ? Vl(it, ye, jt) : Jt(b ? it : ke, ye, b ? jt : Ue);
      k[g] = hn, z[g] = hn - ye;
    }
    t.modifiersData[r] = z;
  }
}
const bc = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: gc,
  requiresIfExists: ["offset"]
};
function vc(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function yc(e) {
  return e === Ne(e) || !Ie(e) ? Ar(e) : vc(e);
}
function Ec(e) {
  var t = e.getBoundingClientRect(), n = Mt(t.width) / e.offsetWidth || 1, r = Mt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function xc(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ie(t), o = Ie(t) && Ec(t), i = nt(t), a = It(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Ve(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Dr(i)) && (l = yc(t)), Ie(t) ? (c = It(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = _r(i))), {
    x: a.left + l.scrollLeft - c.x,
    y: a.top + l.scrollTop - c.y,
    width: a.width,
    height: a.height
  };
}
function Tc(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var a = [].concat(i.requires || [], i.requiresIfExists || []);
    a.forEach(function(l) {
      if (!n.has(l)) {
        var c = t.get(l);
        c && o(c);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function wc(e) {
  var t = Tc(e);
  return Al.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Oc(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function kc(e) {
  var t = e.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var Ho = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Wo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Pc(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Ho : o;
  return function(l, c, u) {
    u === void 0 && (u = i);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ho, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], d = !1, b = {
      state: p,
      setOptions: function(x) {
        var $ = typeof x == "function" ? x(p.options) : x;
        m(), p.options = Object.assign({}, i, p.options, $), p.scrollParents = {
          reference: dt(l) ? Zt(l) : l.contextElement ? Zt(l.contextElement) : [],
          popper: Zt(c)
        };
        var y = wc(kc([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = y.filter(function(E) {
          return E.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!d) {
          var x = p.elements, $ = x.reference, y = x.popper;
          if (Wo($, y)) {
            p.rects = {
              reference: xc($, un(y), p.options.strategy === "fixed"),
              popper: Mr(y)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(A) {
              return p.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var E = 0; E < p.orderedModifiers.length; E++) {
              if (p.reset === !0) {
                p.reset = !1, E = -1;
                continue;
              }
              var g = p.orderedModifiers[E], k = g.fn, P = g.options, D = P === void 0 ? {} : P, _ = g.name;
              typeof k == "function" && (p = k({
                state: p,
                options: D,
                name: _,
                instance: b
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Oc(function() {
        return new Promise(function(h) {
          b.forceUpdate(), h(p);
        });
      }),
      destroy: function() {
        m(), d = !0;
      }
    };
    if (!Wo(l, c))
      return b;
    b.setOptions(u).then(function(h) {
      !d && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function v() {
      p.orderedModifiers.forEach(function(h) {
        var x = h.name, $ = h.options, y = $ === void 0 ? {} : $, E = h.effect;
        if (typeof E == "function") {
          var g = E({
            state: p,
            name: x,
            instance: b,
            options: y
          }), k = function() {
          };
          f.push(g || k);
        }
      });
    }
    function m() {
      f.forEach(function(h) {
        return h();
      }), f = [];
    }
    return b;
  };
}
var Sc = [Yl, hc, Kl, jl, dc, ac, bc, Hl, cc], Cc = /* @__PURE__ */ Pc({
  defaultModifiers: Sc
});
const qi = "Popper";
function Rc(e) {
  return Di(qi, e);
}
sl(qi, ["root"]);
const Nc = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], $c = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Mc(e, t) {
  if (t === "ltr")
    return e;
  switch (e) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return e;
  }
}
function $n(e) {
  return typeof e == "function" ? e() : e;
}
function Ln(e) {
  return e.nodeType !== void 0;
}
function Ic(e) {
  return !Ln(e);
}
const Ac = () => Ye({
  root: ["root"]
}, el(Rc)), _c = {}, Dc = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: a,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: p,
    popperOptions: f,
    popperRef: d,
    slotProps: b = {},
    slots: v = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, h = ce(t, Nc), x = T.useRef(null), $ = je(x, n), y = T.useRef(null), E = je(y, d), g = T.useRef(E);
  Nt(() => {
    g.current = E;
  }, [E]), T.useImperativeHandle(d, () => y.current, []);
  const k = Mc(p, a), [P, D] = T.useState(k), [_, A] = T.useState($n(o));
  T.useEffect(() => {
    y.current && y.current.forceUpdate();
  }), T.useEffect(() => {
    o && A($n(o));
  }, [o]), Nt(() => {
    if (!_ || !u)
      return;
    const I = (Q) => {
      D(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && _ && Ln(_) && _.nodeType === 1) {
      const Q = _.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Q.top === 0 && Q.left === 0 && Q.right === 0 && Q.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let R = [{
      name: "preventOverflow",
      options: {
        altBoundary: l
      }
    }, {
      name: "flip",
      options: {
        altBoundary: l
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: Q
      }) => {
        I(Q);
      }
    }];
    c != null && (R = R.concat(c)), f && f.modifiers != null && (R = R.concat(f.modifiers));
    const j = Cc(_, x.current, w({
      placement: k
    }, f, {
      modifiers: R
    }));
    return g.current(j), () => {
      j.destroy(), g.current(null);
    };
  }, [_, l, c, u, f, k]);
  const B = {
    placement: P
  };
  m !== null && (B.TransitionProps = m);
  const z = Ac(), G = (r = v.root) != null ? r : "div", L = pt({
    elementType: G,
    externalSlotProps: b.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: $
    },
    ownerState: t,
    className: z.root
  });
  return /* @__PURE__ */ S(G, w({}, L, {
    children: typeof i == "function" ? i(B) : i
  }));
}), Gi = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: a = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: p,
    placement: f = "bottom",
    popperOptions: d = _c,
    popperRef: b,
    style: v,
    transition: m = !1,
    slotProps: h = {},
    slots: x = {}
  } = t, $ = ce(t, $c), [y, E] = T.useState(!0), g = () => {
    E(!1);
  }, k = () => {
    E(!0);
  };
  if (!c && !p && (!m || y))
    return null;
  let P;
  if (i)
    P = i;
  else if (r) {
    const A = $n(r);
    P = A && Ln(A) ? xe(A).body : xe(null).body;
  }
  const D = !p && c && (!m || y) ? "none" : void 0, _ = m ? {
    in: p,
    onEnter: g,
    onExited: k
  } : void 0;
  return /* @__PURE__ */ S(tn, {
    disablePortal: l,
    container: P,
    children: /* @__PURE__ */ S(Dc, w({
      anchorEl: r,
      direction: a,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: m ? !y : p,
      placement: f,
      popperOptions: d,
      popperRef: b,
      slotProps: h,
      slots: x
    }, $, {
      style: w({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: D
      }, v),
      TransitionProps: _,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Gi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: _t(s.oneOfType([qe, s.object, s.func]), (e) => {
    if (e.open) {
      const t = $n(e.anchorEl);
      if (t && Ln(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Ic(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: s.oneOfType([s.node, s.func]),
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
  container: s.oneOfType([qe, s.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: s.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: s.arrayOf(s.shape({
    data: s.object,
    effect: s.func,
    enabled: s.bool,
    fn: s.func,
    name: s.any,
    options: s.object,
    phase: s.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: s.arrayOf(s.string),
    requiresIfExists: s.arrayOf(s.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: s.shape({
    modifiers: s.array,
    onFirstUpdate: s.func,
    placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: s.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: Rr,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: s.shape({
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: s.bool
});
const jc = ["values", "unit", "step"], Bc = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => w({}, n, {
    [r.key]: r.val
  }), {});
};
function Lc(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
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
    unit: n = "px",
    step: r = 5
  } = e, o = ce(e, jc), i = Bc(t), a = Object.keys(i);
  function l(d) {
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof t[d] == "number" ? t[d] : d) - r / 100}${n})`;
  }
  function u(d, b) {
    const v = a.indexOf(b);
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n}) and (max-width:${(v !== -1 && typeof t[a[v]] == "number" ? t[a[v]] : b) - r / 100}${n})`;
  }
  function p(d) {
    return a.indexOf(d) + 1 < a.length ? u(d, a[a.indexOf(d) + 1]) : l(d);
  }
  function f(d) {
    const b = a.indexOf(d);
    return b === 0 ? l(a[1]) : b === a.length - 1 ? c(a[b]) : u(d, a[a.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return w({
    keys: a,
    values: i,
    up: l,
    down: c,
    between: u,
    only: p,
    not: f,
    unit: n
  }, o);
}
const Vc = {
  borderRadius: 4
}, Fc = Vc, zc = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, rt = zc;
function Qt(e, t) {
  return t ? We(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const jr = {
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
}, qo = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${jr[e]}px)`
};
function Xe(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || qo;
    return t.reduce((a, l, c) => (a[i.up(i.keys[c])] = n(t[c]), a), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || qo;
    return Object.keys(t).reduce((a, l) => {
      if (Object.keys(i.values || jr).indexOf(l) !== -1) {
        const c = i.up(l);
        a[c] = n(t[l], l);
      } else {
        const c = l;
        a[c] = t[c];
      }
      return a;
    }, {});
  }
  return n(t);
}
function Uc(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Hc(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Vn(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Mn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Vn(e, n) || r, t && (o = t(o, r, e)), o;
}
function he(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (a) => {
    if (a[t] == null)
      return null;
    const l = a[t], c = a.theme, u = Vn(c, r) || {};
    return Xe(a, l, (f) => {
      let d = Mn(u, o, f);
      return f === d && typeof f == "string" && (d = Mn(u, o, `${t}${f === "default" ? "" : Ge(f)}`, f)), n === !1 ? d : {
        [n]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: rt
  } : {}, i.filterProps = [t], i;
}
function Wc(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const qc = {
  m: "margin",
  p: "padding"
}, Gc = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Go = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Kc = Wc((e) => {
  if (e.length > 2)
    if (Go[e])
      e = Go[e];
    else
      return [e];
  const [t, n] = e.split(""), r = qc[t], o = Gc[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Fn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], zn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Xc = [...Fn, ...zn];
function pn(e, t, n, r) {
  var o;
  const i = (o = Vn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Ki(e) {
  return pn(e, "spacing", 8, "spacing");
}
function dn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Yc(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = dn(t, n), r), {});
}
function Jc(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Kc(n), i = Yc(o, r), a = e[n];
  return Xe(e, a, i);
}
function Xi(e, t) {
  const n = Ki(e.theme);
  return Object.keys(e).map((r) => Jc(e, t, r, n)).reduce(Qt, {});
}
function pe(e) {
  return Xi(e, Fn);
}
pe.propTypes = process.env.NODE_ENV !== "production" ? Fn.reduce((e, t) => (e[t] = rt, e), {}) : {};
pe.filterProps = Fn;
function de(e) {
  return Xi(e, zn);
}
de.propTypes = process.env.NODE_ENV !== "production" ? zn.reduce((e, t) => (e[t] = rt, e), {}) : {};
de.filterProps = zn;
process.env.NODE_ENV !== "production" && Xc.reduce((e, t) => (e[t] = rt, e), {});
function Zc(e = 8) {
  if (e.mui)
    return e;
  const t = Ki({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const a = t(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return n.mui = !0, n;
}
function Un(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? Qt(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Me(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function De(e, t) {
  return he({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Qc = De("border", Me), eu = De("borderTop", Me), tu = De("borderRight", Me), nu = De("borderBottom", Me), ru = De("borderLeft", Me), ou = De("borderColor"), iu = De("borderTopColor"), su = De("borderRightColor"), au = De("borderBottomColor"), lu = De("borderLeftColor"), cu = De("outline", Me), uu = De("outlineColor"), Hn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = pn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: dn(t, r)
    });
    return Xe(e, e.borderRadius, n);
  }
  return null;
};
Hn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: rt
} : {};
Hn.filterProps = ["borderRadius"];
Un(Qc, eu, tu, nu, ru, ou, iu, su, au, lu, Hn, cu, uu);
const Wn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = pn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: dn(t, r)
    });
    return Xe(e, e.gap, n);
  }
  return null;
};
Wn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: rt
} : {};
Wn.filterProps = ["gap"];
const qn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = pn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: dn(t, r)
    });
    return Xe(e, e.columnGap, n);
  }
  return null;
};
qn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: rt
} : {};
qn.filterProps = ["columnGap"];
const Gn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = pn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: dn(t, r)
    });
    return Xe(e, e.rowGap, n);
  }
  return null;
};
Gn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: rt
} : {};
Gn.filterProps = ["rowGap"];
const pu = he({
  prop: "gridColumn"
}), du = he({
  prop: "gridRow"
}), fu = he({
  prop: "gridAutoFlow"
}), hu = he({
  prop: "gridAutoColumns"
}), mu = he({
  prop: "gridAutoRows"
}), gu = he({
  prop: "gridTemplateColumns"
}), bu = he({
  prop: "gridTemplateRows"
}), vu = he({
  prop: "gridTemplateAreas"
}), yu = he({
  prop: "gridArea"
});
Un(Wn, qn, Gn, pu, du, fu, hu, mu, gu, bu, vu, yu);
function Ct(e, t) {
  return t === "grey" ? t : e;
}
const Eu = he({
  prop: "color",
  themeKey: "palette",
  transform: Ct
}), xu = he({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ct
}), Tu = he({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ct
});
Un(Eu, xu, Tu);
function Ce(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const wu = he({
  prop: "width",
  transform: Ce
}), Br = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || jr[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Ce(n)
      };
    };
    return Xe(e, e.maxWidth, t);
  }
  return null;
};
Br.filterProps = ["maxWidth"];
const Ou = he({
  prop: "minWidth",
  transform: Ce
}), ku = he({
  prop: "height",
  transform: Ce
}), Pu = he({
  prop: "maxHeight",
  transform: Ce
}), Su = he({
  prop: "minHeight",
  transform: Ce
});
he({
  prop: "size",
  cssProperty: "width",
  transform: Ce
});
he({
  prop: "size",
  cssProperty: "height",
  transform: Ce
});
const Cu = he({
  prop: "boxSizing"
});
Un(wu, Br, Ou, ku, Pu, Su, Cu);
const Ru = {
  // borders
  border: {
    themeKey: "borders",
    transform: Me
  },
  borderTop: {
    themeKey: "borders",
    transform: Me
  },
  borderRight: {
    themeKey: "borders",
    transform: Me
  },
  borderBottom: {
    themeKey: "borders",
    transform: Me
  },
  borderLeft: {
    themeKey: "borders",
    transform: Me
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
    transform: Me
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Hn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ct
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ct
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ct
  },
  // spacing
  p: {
    style: de
  },
  pt: {
    style: de
  },
  pr: {
    style: de
  },
  pb: {
    style: de
  },
  pl: {
    style: de
  },
  px: {
    style: de
  },
  py: {
    style: de
  },
  padding: {
    style: de
  },
  paddingTop: {
    style: de
  },
  paddingRight: {
    style: de
  },
  paddingBottom: {
    style: de
  },
  paddingLeft: {
    style: de
  },
  paddingX: {
    style: de
  },
  paddingY: {
    style: de
  },
  paddingInline: {
    style: de
  },
  paddingInlineStart: {
    style: de
  },
  paddingInlineEnd: {
    style: de
  },
  paddingBlock: {
    style: de
  },
  paddingBlockStart: {
    style: de
  },
  paddingBlockEnd: {
    style: de
  },
  m: {
    style: pe
  },
  mt: {
    style: pe
  },
  mr: {
    style: pe
  },
  mb: {
    style: pe
  },
  ml: {
    style: pe
  },
  mx: {
    style: pe
  },
  my: {
    style: pe
  },
  margin: {
    style: pe
  },
  marginTop: {
    style: pe
  },
  marginRight: {
    style: pe
  },
  marginBottom: {
    style: pe
  },
  marginLeft: {
    style: pe
  },
  marginX: {
    style: pe
  },
  marginY: {
    style: pe
  },
  marginInline: {
    style: pe
  },
  marginInlineStart: {
    style: pe
  },
  marginInlineEnd: {
    style: pe
  },
  marginBlock: {
    style: pe
  },
  marginBlockStart: {
    style: pe
  },
  marginBlockEnd: {
    style: pe
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
    style: Wn
  },
  rowGap: {
    style: Gn
  },
  columnGap: {
    style: qn
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
    transform: Ce
  },
  maxWidth: {
    style: Br
  },
  minWidth: {
    transform: Ce
  },
  height: {
    transform: Ce
  },
  maxHeight: {
    transform: Ce
  },
  minHeight: {
    transform: Ce
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
}, Lr = Ru;
function Nu(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function $u(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Mu() {
  function e(n, r, o, i) {
    const a = {
      [n]: r,
      theme: o
    }, l = i[n];
    if (!l)
      return {
        [n]: r
      };
    const {
      cssProperty: c = n,
      themeKey: u,
      transform: p,
      style: f
    } = l;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const d = Vn(o, u) || {};
    return f ? f(a) : Xe(a, r, (v) => {
      let m = Mn(d, p, v);
      return v === m && typeof v == "string" && (m = Mn(d, p, `${n}${v === "default" ? "" : Ge(v)}`, v)), c === !1 ? m : {
        [c]: m
      };
    });
  }
  function t(n) {
    var r;
    const {
      sx: o,
      theme: i = {}
    } = n || {};
    if (!o)
      return null;
    const a = (r = i.unstable_sxConfig) != null ? r : Lr;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const p = Uc(i.breakpoints), f = Object.keys(p);
      let d = p;
      return Object.keys(u).forEach((b) => {
        const v = $u(u[b], i);
        if (v != null)
          if (typeof v == "object")
            if (a[b])
              d = Qt(d, e(b, v, i, a));
            else {
              const m = Xe({
                theme: i
              }, v, (h) => ({
                [b]: h
              }));
              Nu(m, v) ? d[b] = t({
                sx: v,
                theme: i
              }) : d = Qt(d, m);
            }
          else
            d = Qt(d, e(b, v, i, a));
      }), Hc(f, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Yi = Mu();
Yi.filterProps = ["sx"];
const Vr = Yi;
function Iu(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Au = ["breakpoints", "palette", "spacing", "shape"];
function Fr(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, a = ce(e, Au), l = Lc(n), c = Zc(o);
  let u = We({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: w({
      mode: "light"
    }, r),
    spacing: c,
    shape: w({}, Fc, i)
  }, a);
  return u.applyStyles = Iu, u = t.reduce((p, f) => We(p, f), u), u.unstable_sxConfig = w({}, Lr, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(f) {
    return Vr({
      sx: f,
      theme: this
    });
  }, u;
}
function _u(e) {
  return Object.keys(e).length === 0;
}
function Ji(e = null) {
  const t = T.useContext(Zs);
  return !t || _u(t) ? e : t;
}
const Du = Fr();
function Zi(e = Du) {
  return Ji(e);
}
const ju = ["ownerState"], Bu = ["variants"], Lu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Vu(e) {
  return Object.keys(e).length === 0;
}
function Fu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function On(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const zu = Fr(), Ko = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function En({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Vu(t) ? e : t[n] || t;
}
function Uu(e) {
  return e ? (t, n) => n[e] : null;
}
function kn(e, t) {
  let {
    ownerState: n
  } = t, r = ce(t, ju);
  const o = typeof e == "function" ? e(w({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => kn(i, w({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = ce(o, Bu);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(w({
        ownerState: n
      }, r)) : Object.keys(c.props).forEach((p) => {
        (n == null ? void 0 : n[p]) !== c.props[p] && r[p] !== c.props[p] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(w({
        ownerState: n
      }, r)) : c.style));
    }), l;
  }
  return o;
}
function Hu(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = zu,
    rootShouldForwardProp: r = On,
    slotShouldForwardProp: o = On
  } = e, i = (a) => Vr(w({}, a, {
    theme: En(w({}, a, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    Qs(a, (g) => g.filter((k) => !(k != null && k.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: p,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = Uu(Ko(u))
    } = l, b = ce(l, Lu), v = p !== void 0 ? p : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), m = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Ko(u || "Root")}`);
    let x = On;
    u === "Root" || u === "root" ? x = r : u ? x = o : Fu(a) && (x = void 0);
    const $ = Js(a, w({
      shouldForwardProp: x,
      label: h
    }, b)), y = (g) => typeof g == "function" && g.__emotion_real !== g || lt(g) ? (k) => kn(g, w({}, k, {
      theme: En({
        theme: k.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : g, E = (g, ...k) => {
      let P = y(g);
      const D = k ? k.map(y) : [];
      c && d && D.push((B) => {
        const z = En(w({}, B, {
          defaultTheme: n,
          themeId: t
        }));
        if (!z.components || !z.components[c] || !z.components[c].styleOverrides)
          return null;
        const G = z.components[c].styleOverrides, L = {};
        return Object.entries(G).forEach(([I, R]) => {
          L[I] = kn(R, w({}, B, {
            theme: z
          }));
        }), d(B, L);
      }), c && !v && D.push((B) => {
        var z;
        const G = En(w({}, B, {
          defaultTheme: n,
          themeId: t
        })), L = G == null || (z = G.components) == null || (z = z[c]) == null ? void 0 : z.variants;
        return kn({
          variants: L
        }, w({}, B, {
          theme: G
        }));
      }), m || D.push(i);
      const _ = D.length - k.length;
      if (Array.isArray(g) && _ > 0) {
        const B = new Array(_).fill("");
        P = [...g, ...B], P.raw = [...g.raw, ...B];
      }
      const A = $(P, ...D);
      if (process.env.NODE_ENV !== "production") {
        let B;
        c && (B = `${c}${Ge(u || "")}`), B === void 0 && (B = `Styled(${Sa(a)})`), A.displayName = B;
      }
      return a.muiName && (A.muiName = a.muiName), A;
    };
    return $.withConfig && (E.withConfig = $.withConfig), E;
  };
}
function Wu(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Ni(t.components[n].defaultProps, r);
}
function qu({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Zi(n);
  return r && (o = o[r] || o), Wu({
    theme: o,
    name: t,
    props: e
  });
}
function zr(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Ja(e, t, n);
}
function Gu(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function ft(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return ft(Gu(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Rt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Rt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Kn(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Ku(e) {
  e = ft(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), a = (u, p = (u + n / 30) % 12) => o - i * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let l = "rgb";
  const c = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Kn({
    type: l,
    values: c
  });
}
function Xo(e) {
  e = ft(e);
  let t = e.type === "hsl" || e.type === "hsla" ? ft(Ku(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Yo(e, t) {
  const n = Xo(e), r = Xo(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function In(e, t) {
  return e = ft(e), t = zr(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Kn(e);
}
function Xu(e, t) {
  if (e = ft(e), t = zr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Kn(e);
}
function Yu(e, t) {
  if (e = ft(e), t = zr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Kn(e);
}
function Ju(e, t) {
  return w({
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
  }, t);
}
const Zu = {
  black: "#000",
  white: "#fff"
}, on = Zu, Qu = {
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
}, ep = Qu, tp = {
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
}, bt = tp, np = {
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
}, vt = np, rp = {
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
}, Ut = rp, op = {
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
}, yt = op, ip = {
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
}, Et = ip, sp = {
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
}, xt = sp, ap = ["mode", "contrastThreshold", "tonalOffset"], Jo = {
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
    paper: on.white,
    default: on.white
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
}, lr = {
  text: {
    primary: on.white,
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
    active: on.white,
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
function Zo(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Yu(e.main, o) : t === "dark" && (e.dark = Xu(e.main, i)));
}
function lp(e = "light") {
  return e === "dark" ? {
    main: yt[200],
    light: yt[50],
    dark: yt[400]
  } : {
    main: yt[700],
    light: yt[400],
    dark: yt[800]
  };
}
function cp(e = "light") {
  return e === "dark" ? {
    main: bt[200],
    light: bt[50],
    dark: bt[400]
  } : {
    main: bt[500],
    light: bt[300],
    dark: bt[700]
  };
}
function up(e = "light") {
  return e === "dark" ? {
    main: vt[500],
    light: vt[300],
    dark: vt[700]
  } : {
    main: vt[700],
    light: vt[400],
    dark: vt[800]
  };
}
function pp(e = "light") {
  return e === "dark" ? {
    main: Et[400],
    light: Et[300],
    dark: Et[700]
  } : {
    main: Et[700],
    light: Et[500],
    dark: Et[900]
  };
}
function dp(e = "light") {
  return e === "dark" ? {
    main: xt[400],
    light: xt[300],
    dark: xt[700]
  } : {
    main: xt[800],
    light: xt[500],
    dark: xt[900]
  };
}
function fp(e = "light") {
  return e === "dark" ? {
    main: Ut[400],
    light: Ut[300],
    dark: Ut[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Ut[500],
    dark: Ut[900]
  };
}
function hp(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ce(e, ap), i = e.primary || lp(t), a = e.secondary || cp(t), l = e.error || up(t), c = e.info || pp(t), u = e.success || dp(t), p = e.warning || fp(t);
  function f(m) {
    const h = Yo(m, lr.text.primary) >= n ? lr.text.primary : Jo.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = Yo(m, h);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${h} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const d = ({
    color: m,
    name: h,
    mainShade: x = 500,
    lightShade: $ = 300,
    darkShade: y = 700
  }) => {
    if (m = w({}, m), !m.main && m[x] && (m.main = m[x]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : Rt(11, h ? ` (${h})` : "", x));
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
} });` : Rt(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return Zo(m, "light", $, r), Zo(m, "dark", y, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, b = {
    dark: lr,
    light: Jo
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), We(w({
    // A collection of common colors.
    common: w({}, on),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: d({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: d({
      color: a,
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
      color: p,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: d({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: d({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: ep,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: d,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, b[t]), o);
}
const mp = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function gp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Qo = {
  textTransform: "uppercase"
}, ei = '"Roboto", "Helvetica", "Arial", sans-serif';
function bp(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = ei,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: a = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: p,
    pxToRem: f
  } = n, d = ce(n, mp);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = f || ((x) => `${x / u * b}rem`), m = (x, $, y, E, g) => w({
    fontFamily: r,
    fontWeight: x,
    fontSize: v($),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: y
  }, r === ei ? {
    letterSpacing: `${gp(E / $)}em`
  } : {}, g, p), h = {
    h1: m(i, 96, 1.167, -1.5),
    h2: m(i, 60, 1.2, -0.5),
    h3: m(a, 48, 1.167, 0),
    h4: m(a, 34, 1.235, 0.25),
    h5: m(a, 24, 1.334, 0),
    h6: m(l, 20, 1.6, 0.15),
    subtitle1: m(a, 16, 1.75, 0.15),
    subtitle2: m(l, 14, 1.57, 0.1),
    body1: m(a, 16, 1.5, 0.15),
    body2: m(a, 14, 1.43, 0.15),
    button: m(l, 14, 1.75, 0.4, Qo),
    caption: m(a, 12, 1.66, 0.4),
    overline: m(a, 12, 2.66, 1, Qo),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return We(w({
    htmlFontSize: u,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), d, {
    clone: !1
    // No need to clone deep
  });
}
const vp = 0.2, yp = 0.14, Ep = 0.12;
function ue(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${vp})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${yp})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ep})`].join(",");
}
const xp = ["none", ue(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ue(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ue(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ue(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ue(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ue(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ue(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ue(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ue(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ue(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ue(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ue(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ue(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ue(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ue(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ue(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ue(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ue(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ue(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ue(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ue(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ue(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ue(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ue(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Tp = xp, wp = ["duration", "easing", "delay"], Op = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, kp = {
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
function ti(e) {
  return `${Math.round(e)}ms`;
}
function Pp(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Sp(e) {
  const t = w({}, Op, e.easing), n = w({}, kp, e.duration);
  return w({
    getAutoHeightDuration: Pp,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = ce(i, wp);
      if (process.env.NODE_ENV !== "production") {
        const p = (d) => typeof d == "string", f = (d) => !isNaN(parseFloat(d));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(a) && !p(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), p(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !p(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof a == "string" ? a : ti(a)} ${l} ${typeof c == "string" ? c : ti(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Cp = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Rp = Cp, Np = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function $p(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = ce(e, Np);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Rt(18));
  const l = hp(r), c = Fr(e);
  let u = We(c, {
    mixins: Ju(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Tp.slice(),
    typography: bp(l, i),
    transitions: Sp(o),
    zIndex: w({}, Rp)
  });
  if (u = We(u, a), u = t.reduce((p, f) => We(p, f), u), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (d, b) => {
      let v;
      for (v in d) {
        const m = d[v];
        if (p.indexOf(v) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = Fe("", v);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(d, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          d[v] = {};
        }
      }
    };
    Object.keys(u.components).forEach((d) => {
      const b = u.components[d].styleOverrides;
      b && d.indexOf("Mui") === 0 && f(b, d);
    });
  }
  return u.unstable_sxConfig = w({}, Lr, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(f) {
    return Vr({
      sx: f,
      theme: this
    });
  }, u;
}
const Mp = $p(), Ur = Mp, Hr = "$$material", Qi = (e) => On(e) && e !== "classes", Ip = Hu({
  themeId: Hr,
  defaultTheme: Ur,
  rootShouldForwardProp: Qi
}), be = Ip;
function fn() {
  const e = Zi(Ur);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[Hr] || e;
}
function Je({
  props: e,
  name: t
}) {
  return qu({
    props: e,
    name: t,
    defaultTheme: Ur,
    themeId: Hr
  });
}
function wr(e, t) {
  return wr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, wr(e, t);
}
function Ap(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, wr(e, t);
}
const ni = {
  disabled: !1
};
var _p = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const es = Pt.createContext(null);
var Dp = function(t) {
  return t.scrollTop;
}, Xt = "unmounted", st = "exited", at = "entering", Ot = "entered", Or = "exiting", Ze = /* @__PURE__ */ function(e) {
  Ap(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var a = o, l = a && !a.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = st, i.appearStatus = at) : c = Ot : r.unmountOnExit || r.mountOnEnter ? c = Xt : c = st, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === Xt ? {
      status: st
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== at && a !== Ot && (i = at) : (a === at || a === Ot) && (i = Or);
    }
    this.updateStatus(!1, i);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, i, a, l;
    return i = a = l = o, o != null && typeof o != "number" && (i = o.exit, a = o.enter, l = o.appear !== void 0 ? o.appear : a), {
      exit: i,
      enter: a,
      appear: l
    };
  }, n.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === at) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : bn.findDOMNode(this);
          a && Dp(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === st && this.setState({
        status: Xt
      });
  }, n.performEnter = function(o) {
    var i = this, a = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [bn.findDOMNode(this), l], u = c[0], p = c[1], f = this.getTimeouts(), d = l ? f.appear : f.enter;
    if (!o && !a || ni.disabled) {
      this.safeSetState({
        status: Ot
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, p), this.safeSetState({
      status: at
    }, function() {
      i.props.onEntering(u, p), i.onTransitionEnd(d, function() {
        i.safeSetState({
          status: Ot
        }, function() {
          i.props.onEntered(u, p);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts(), l = this.props.nodeRef ? void 0 : bn.findDOMNode(this);
    if (!i || ni.disabled) {
      this.safeSetState({
        status: st
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Or
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(a.exit, function() {
        o.safeSetState({
          status: st
        }, function() {
          o.props.onExited(l);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, n.setNextCallback = function(o) {
    var i = this, a = !0;
    return this.nextCallback = function(l) {
      a && (a = !1, i.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      a = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var a = this.props.nodeRef ? this.props.nodeRef.current : bn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!a || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback], u = c[0], p = c[1];
      this.props.addEndListener(u, p);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === Xt)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = ce(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Pt.createElement(es.Provider, {
        value: null
      }, typeof a == "function" ? a(o, l) : Pt.cloneElement(Pt.Children.only(a), l))
    );
  }, t;
}(Pt.Component);
Ze.contextType = es;
Ze.propTypes = process.env.NODE_ENV !== "production" ? {
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
    current: typeof Element > "u" ? s.any : function(e, t, n, r, o, i) {
      var a = e[t];
      return s.instanceOf(a && "ownerDocument" in a ? a.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, i);
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
  timeout: function(t) {
    var n = _p;
    t.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
      o[i - 1] = arguments[i];
    return n.apply(void 0, [t].concat(o));
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
function Tt() {
}
Ze.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Tt,
  onEntering: Tt,
  onEntered: Tt,
  onExit: Tt,
  onExiting: Tt,
  onExited: Tt
};
Ze.UNMOUNTED = Xt;
Ze.EXITED = st;
Ze.ENTERING = at;
Ze.ENTERED = Ot;
Ze.EXITING = Or;
const ts = Ze, ns = (e) => e.scrollTop;
function An(e, t) {
  var n, r;
  const {
    timeout: o,
    easing: i,
    style: a = {}
  } = e;
  return {
    duration: (n = a.transitionDuration) != null ? n : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (r = a.transitionTimingFunction) != null ? r : typeof i == "object" ? i[t.mode] : i,
    delay: a.transitionDelay
  };
}
const jp = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function kr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Bp = {
  entering: {
    opacity: 1,
    transform: kr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, cr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Wr = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: a,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: p,
    onExit: f,
    onExited: d,
    onExiting: b,
    style: v,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = ts
  } = t, x = ce(t, jp), $ = Gt(), y = T.useRef(), E = fn(), g = T.useRef(null), k = je(g, i.ref, n), P = (I) => (R) => {
    if (I) {
      const j = g.current;
      R === void 0 ? I(j) : I(j, R);
    }
  }, D = P(p), _ = P((I, R) => {
    ns(I);
    const {
      duration: j,
      delay: Q,
      easing: Z
    } = An({
      style: v,
      timeout: m,
      easing: a
    }, {
      mode: "enter"
    });
    let O;
    m === "auto" ? (O = E.transitions.getAutoHeightDuration(I.clientHeight), y.current = O) : O = j, I.style.transition = [E.transitions.create("opacity", {
      duration: O,
      delay: Q
    }), E.transitions.create("transform", {
      duration: cr ? O : O * 0.666,
      delay: Q,
      easing: Z
    })].join(","), c && c(I, R);
  }), A = P(u), B = P(b), z = P((I) => {
    const {
      duration: R,
      delay: j,
      easing: Q
    } = An({
      style: v,
      timeout: m,
      easing: a
    }, {
      mode: "exit"
    });
    let Z;
    m === "auto" ? (Z = E.transitions.getAutoHeightDuration(I.clientHeight), y.current = Z) : Z = R, I.style.transition = [E.transitions.create("opacity", {
      duration: Z,
      delay: j
    }), E.transitions.create("transform", {
      duration: cr ? Z : Z * 0.666,
      delay: cr ? j : j || Z * 0.333,
      easing: Q
    })].join(","), I.style.opacity = 0, I.style.transform = kr(0.75), f && f(I);
  }), G = P(d);
  return /* @__PURE__ */ S(h, w({
    appear: o,
    in: l,
    nodeRef: g,
    onEnter: _,
    onEntered: A,
    onEntering: D,
    onExit: z,
    onExited: G,
    onExiting: B,
    addEndListener: (I) => {
      m === "auto" && $.start(y.current || 0, I), r && r(g.current, I);
    },
    timeout: m === "auto" ? null : m
  }, x, {
    children: (I, R) => /* @__PURE__ */ T.cloneElement(i, w({
      style: w({
        opacity: 0,
        transform: kr(0.75),
        visibility: I === "exited" && !l ? "hidden" : void 0
      }, Bp[I], v, i.props.style),
      ref: k
    }, R))
  }));
});
process.env.NODE_ENV !== "production" && (Wr.propTypes = {
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
  children: an.isRequired,
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
Wr.muiSupportAuto = !0;
const Pr = Wr, Lp = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ri = Lp, Vp = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Fp = be(Gi, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), rs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const o = Ji(), i = Je({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: a,
    component: l,
    components: c,
    componentsProps: u,
    container: p,
    disablePortal: f,
    keepMounted: d,
    modifiers: b,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: x,
    transition: $,
    slots: y,
    slotProps: E
  } = i, g = ce(i, Vp), k = (r = y == null ? void 0 : y.root) != null ? r : c == null ? void 0 : c.Root, P = w({
    anchorEl: a,
    container: p,
    disablePortal: f,
    keepMounted: d,
    modifiers: b,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: x,
    transition: $
  }, g);
  return /* @__PURE__ */ S(Fp, w({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: k
    },
    slotProps: E ?? u
  }, P, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (rs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: s.oneOfType([qe, s.object, s.func]),
  /**
   * Popper render function or node.
   */
  children: s.oneOfType([s.node, s.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: s.shape({
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
  container: s.oneOfType([qe, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: s.arrayOf(s.shape({
    data: s.object,
    effect: s.func,
    enabled: s.bool,
    fn: s.func,
    name: s.any,
    options: s.object,
    phase: s.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: s.arrayOf(s.string),
    requiresIfExists: s.arrayOf(s.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: s.shape({
    modifiers: s.array,
    onFirstUpdate: s.func,
    placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: s.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: Rr,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: s.shape({
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
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
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: s.bool
});
const os = rs;
function zp(e) {
  return Fe("MuiTooltip", e);
}
const Up = tt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), et = Up, Hp = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Wp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const qp = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, a = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ge(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Ye(a, zp, t);
}, Gp = be(os, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.popper, !n.disableInteractive && t.popperInteractive, n.arrow && t.popperArrow, !n.open && t.popperClose];
  }
})(({
  theme: e,
  ownerState: t,
  open: n
}) => w({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${et.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${et.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${et.arrow}`]: w({}, t.isRtl ? {
    right: 0,
    marginRight: "-0.71em"
  } : {
    left: 0,
    marginLeft: "-0.71em"
  }, {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "100% 100%"
    }
  }),
  [`&[data-popper-placement*="left"] .${et.arrow}`]: w({}, t.isRtl ? {
    left: 0,
    marginLeft: "-0.71em"
  } : {
    right: 0,
    marginRight: "-0.71em"
  }, {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "0 0"
    }
  })
})), Kp = be("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Ge(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => w({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : In(e.palette.grey[700], 0.92),
  borderRadius: (e.vars || e).shape.borderRadius,
  color: (e.vars || e).palette.common.white,
  fontFamily: e.typography.fontFamily,
  padding: "4px 8px",
  fontSize: e.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: e.typography.fontWeightMedium
}, t.arrow && {
  position: "relative",
  margin: 0
}, t.touch && {
  padding: "8px 16px",
  fontSize: e.typography.pxToRem(14),
  lineHeight: `${Wp(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${et.popper}[data-popper-placement*="left"] &`]: w({
    transformOrigin: "right center"
  }, t.isRtl ? w({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : w({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${et.popper}[data-popper-placement*="right"] &`]: w({
    transformOrigin: "left center"
  }, t.isRtl ? w({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : w({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${et.popper}[data-popper-placement*="top"] &`]: w({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${et.popper}[data-popper-placement*="bottom"] &`]: w({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Xp = be("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (e, t) => t.arrow
})(({
  theme: e
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: e.vars ? e.vars.palette.Tooltip.bg : In(e.palette.grey[700], 0.9),
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)"
  }
}));
let xn = !1;
const oi = new ln();
let Ht = {
  x: 0,
  y: 0
};
function Tn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const is = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, a, l, c, u, p, f, d, b, v, m, h, x, $, y, E, g;
  const k = Je({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: P = !1,
    children: D,
    components: _ = {},
    componentsProps: A = {},
    describeChild: B = !1,
    disableFocusListener: z = !1,
    disableHoverListener: G = !1,
    disableInteractive: L = !1,
    disableTouchListener: I = !1,
    enterDelay: R = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: Q = 700,
    followCursor: Z = !1,
    id: O,
    leaveDelay: M = 0,
    leaveTouchDelay: F = 1500,
    onClose: K,
    onOpen: V,
    open: U,
    placement: W = "bottom",
    PopperComponent: q,
    PopperProps: H = {},
    slotProps: X = {},
    slots: Y = {},
    title: ne,
    TransitionComponent: N = Pr,
    TransitionProps: J
  } = k, C = ce(k, Hp), re = /* @__PURE__ */ T.isValidElement(D) ? D : /* @__PURE__ */ S("span", {
    children: D
  }), me = fn(), ve = me.direction === "rtl", [fe, ot] = T.useState(), [ye, ze] = T.useState(null), ke = T.useRef(!1), Ue = L || Z, ge = Gt(), mt = Gt(), it = Gt(), jt = Gt(), [hn, Jr] = Ia({
    controlled: U,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let He = hn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = T.useRef(U !== void 0);
    T.useEffect(() => {
      fe && fe.disabled && !ee && ne !== "" && fe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ne, fe, ee]);
  }
  const Xn = Ma(O), Bt = T.useRef(), mn = Cn(() => {
    Bt.current !== void 0 && (document.body.style.WebkitUserSelect = Bt.current, Bt.current = void 0), jt.clear();
  });
  T.useEffect(() => mn, [mn]);
  const Zr = (ee) => {
    oi.clear(), xn = !0, Jr(!0), V && !He && V(ee);
  }, gn = Cn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      oi.start(800 + M, () => {
        xn = !1;
      }), Jr(!1), K && He && K(ee), ge.start(me.transitions.duration.shortest, () => {
        ke.current = !1;
      });
    }
  ), Yn = (ee) => {
    ke.current && ee.type !== "touchstart" || (fe && fe.removeAttribute("title"), mt.clear(), it.clear(), R || xn && j ? mt.start(xn ? j : R, () => {
      Zr(ee);
    }) : Zr(ee));
  }, Qr = (ee) => {
    mt.clear(), it.start(M, () => {
      gn(ee);
    });
  }, {
    isFocusVisibleRef: eo,
    onBlur: Os,
    onFocus: ks,
    ref: Ps
  } = Ha(), [, to] = T.useState(!1), no = (ee) => {
    Os(ee), eo.current === !1 && (to(!1), Qr(ee));
  }, ro = (ee) => {
    fe || ot(ee.currentTarget), ks(ee), eo.current === !0 && (to(!0), Yn(ee));
  }, oo = (ee) => {
    ke.current = !0;
    const Pe = re.props;
    Pe.onTouchStart && Pe.onTouchStart(ee);
  }, io = Yn, so = Qr, Ss = (ee) => {
    oo(ee), it.clear(), ge.clear(), mn(), Bt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", jt.start(Q, () => {
      document.body.style.WebkitUserSelect = Bt.current, Yn(ee);
    });
  }, Cs = (ee) => {
    re.props.onTouchEnd && re.props.onTouchEnd(ee), mn(), it.start(F, () => {
      gn(ee);
    });
  };
  T.useEffect(() => {
    if (!He)
      return;
    function ee(Pe) {
      (Pe.key === "Escape" || Pe.key === "Esc") && gn(Pe);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [gn, He]);
  const Rs = je(re.ref, Ps, ot, n);
  !ne && ne !== 0 && (He = !1);
  const Jn = T.useRef(), Ns = (ee) => {
    const Pe = re.props;
    Pe.onMouseMove && Pe.onMouseMove(ee), Ht = {
      x: ee.clientX,
      y: ee.clientY
    }, Jn.current && Jn.current.update();
  }, Lt = {}, Zn = typeof ne == "string";
  B ? (Lt.title = !He && Zn && !G ? ne : null, Lt["aria-describedby"] = He ? Xn : null) : (Lt["aria-label"] = Zn ? ne : null, Lt["aria-labelledby"] = He && !Zn ? Xn : null);
  const $e = w({}, Lt, C, re.props, {
    className: Re(C.className, re.props.className),
    onTouchStart: oo,
    ref: Rs
  }, Z ? {
    onMouseMove: Ns
  } : {});
  process.env.NODE_ENV !== "production" && ($e["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    fe && !fe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [fe]));
  const Vt = {};
  I || ($e.onTouchStart = Ss, $e.onTouchEnd = Cs), G || ($e.onMouseOver = Tn(io, $e.onMouseOver), $e.onMouseLeave = Tn(so, $e.onMouseLeave), Ue || (Vt.onMouseOver = io, Vt.onMouseLeave = so)), z || ($e.onFocus = Tn(ro, $e.onFocus), $e.onBlur = Tn(no, $e.onBlur), Ue || (Vt.onFocus = ro, Vt.onBlur = no)), process.env.NODE_ENV !== "production" && re.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${re.props.title}\` or the Tooltip component.`].join(`
`));
  const $s = T.useMemo(() => {
    var ee;
    let Pe = [{
      name: "arrow",
      enabled: !!ye,
      options: {
        element: ye,
        padding: 4
      }
    }];
    return (ee = H.popperOptions) != null && ee.modifiers && (Pe = Pe.concat(H.popperOptions.modifiers)), w({}, H.popperOptions, {
      modifiers: Pe
    });
  }, [ye, H]), Ft = w({}, k, {
    isRtl: ve,
    arrow: P,
    disableInteractive: Ue,
    placement: W,
    PopperComponentProp: q,
    touch: ke.current
  }), Qn = qp(Ft), ao = (r = (o = Y.popper) != null ? o : _.Popper) != null ? r : Gp, lo = (i = (a = (l = Y.transition) != null ? l : _.Transition) != null ? a : N) != null ? i : Pr, co = (c = (u = Y.tooltip) != null ? u : _.Tooltip) != null ? c : Kp, uo = (p = (f = Y.arrow) != null ? f : _.Arrow) != null ? p : Xp, Ms = Kt(ao, w({}, H, (d = X.popper) != null ? d : A.popper, {
    className: Re(Qn.popper, H == null ? void 0 : H.className, (b = (v = X.popper) != null ? v : A.popper) == null ? void 0 : b.className)
  }), Ft), Is = Kt(lo, w({}, J, (m = X.transition) != null ? m : A.transition), Ft), As = Kt(co, w({}, (h = X.tooltip) != null ? h : A.tooltip, {
    className: Re(Qn.tooltip, (x = ($ = X.tooltip) != null ? $ : A.tooltip) == null ? void 0 : x.className)
  }), Ft), _s = Kt(uo, w({}, (y = X.arrow) != null ? y : A.arrow, {
    className: Re(Qn.arrow, (E = (g = X.arrow) != null ? g : A.arrow) == null ? void 0 : E.className)
  }), Ft);
  return /* @__PURE__ */ Oe(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(re, $e), /* @__PURE__ */ S(ao, w({
      as: q ?? os,
      placement: W,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: Ht.y,
          left: Ht.x,
          right: Ht.x,
          bottom: Ht.y,
          width: 0,
          height: 0
        })
      } : fe,
      popperRef: Jn,
      open: fe ? He : !1,
      id: Xn,
      transition: !0
    }, Vt, Ms, {
      popperOptions: $s,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ S(lo, w({
        timeout: me.transitions.duration.shorter
      }, ee, Is, {
        children: /* @__PURE__ */ Oe(co, w({}, As, {
          children: [ne, P ? /* @__PURE__ */ S(uo, w({}, _s, {
            ref: ze
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (is.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: s.bool,
  /**
   * Tooltip reference element.
   */
  children: an.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Arrow: s.elementType,
    Popper: s.elementType,
    Tooltip: s.elementType,
    Transition: s.elementType
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
    arrow: s.object,
    popper: s.object,
    tooltip: s.object,
    transition: s.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: s.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: s.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: s.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: s.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: s.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: s.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: s.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: s.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: s.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: s.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: s.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: s.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: s.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: s.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: s.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    arrow: s.object,
    popper: s.object,
    tooltip: s.object,
    transition: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    arrow: s.elementType,
    popper: s.elementType,
    tooltip: s.elementType,
    transition: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: s.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: s.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: s.object
});
const Yp = is;
function ii(e, t, n) {
  return e ? /* @__PURE__ */ S(Fs, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ S("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Jp(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: i = void 0,
    iconPathAfter: a = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: u = !1,
    isDense: p = !0,
    hasDisabledGutters: f = !1,
    hasDivider: d = !1,
    focusVisibleClassName: b,
    id: v,
    children: m
  } = e, h = /* @__PURE__ */ S(
    mi,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: p,
      disableGutters: f,
      divider: d,
      focusVisibleClassName: b,
      onClick: t,
      id: v,
      children: n ? /* @__PURE__ */ Oe(Sr, { children: [
        ii(i, n, !0),
        /* @__PURE__ */ S(Vs, { primary: n, inset: !i && o }),
        ii(a, n, !1)
      ] }) : m
    }
  );
  return r ? /* @__PURE__ */ S(Yp, { title: r, placement: "right", children: /* @__PURE__ */ S("div", { children: h }) }) : h;
}
function ss(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Zp(e) {
  const [t, n] = ct(void 0), { parentMenuItem: r, menuDefinition: o } = e, i = (c) => {
    n(c.currentTarget);
  }, a = () => {
    n(void 0);
  }, l = () => {
    let c = ss(o).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return c = c.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ S(qr, { ...e, includedGroups: c });
  };
  return /* @__PURE__ */ Oe(Sr, { children: [
    /* @__PURE__ */ S(mi, { onClick: i, children: r.label }),
    /* @__PURE__ */ S(
      zs,
      {
        anchorEl: t,
        open: !!t,
        onClose: a,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        children: l()
      },
      r.id
    )
  ] });
}
const Qp = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function qr(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, i = o && o.length > 0 ? o : (
    // We're apparently laying out a single-column menu (presumably a context menu). In this
    // case, all groups should be included except ones that belong to a submenu.
    ss(t).filter((d) => !("menuItem" in d.group))
  ), a = Object.values(i).sort(
    (d, b) => (d.group.order || 0) - (b.group.order || 0)
  ), l = [];
  a.forEach((d) => {
    Qp(d.id, t.items).forEach(
      (b) => l.push({ item: b, isLastItemInGroup: !1 })
    ), l.length > 0 && (l[l.length - 1].isLastItemInGroup = !0);
  }), l.length > 0 && (l[l.length - 1].isLastItemInGroup = !1);
  const c = l == null ? void 0 : l.some((d) => "iconPathBefore" in d), u = ({ item: d, isLastItemInGroup: b }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: b,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: c
  }), [p] = l;
  if (!p)
    return /* @__PURE__ */ S("div", {});
  const f = p.item.group;
  return /* @__PURE__ */ S("div", { role: "menu", "aria-label": f, children: (() => {
    const d = [];
    return l.forEach((b, v) => {
      const { item: m } = b, h = u(b);
      if ("command" in m) {
        const x = m.group + v;
        d.push(
          /* @__PURE__ */ S(
            Jp,
            {
              onClick: () => {
                n == null || n(), r(m);
              },
              ...h
            },
            x
          )
        );
      } else
        d.push(/* @__PURE__ */ S(Zp, { parentMenuItem: m, ...e }, f + m.id));
    }), d;
  })() }, f);
}
function ed(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([a, l]) => ({ id: a, group: l })).filter((a) => "column" in a.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (a) => "column" in a.group && a.group.column === n
  )), /* @__PURE__ */ S(qr, { ...e, includedGroups: i });
}
function td({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ Oe(
    gi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ S("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ S(Us, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ S(
          ed,
          {
            commandHandler: e,
            menuDefinition: t,
            columnId: n,
            onClick: o
          }
        ) })
      ]
    }
  );
}
function nd({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = sn(() => {
    const a = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) && a.set(u.order, { id: c, metadata: u });
    }), Array.from(a.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o]);
  return /* @__PURE__ */ S(
    gi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((a, l) => /* @__PURE__ */ S(
        td,
        {
          commandHandler: e,
          menuDefinition: n,
          ...a,
          className: t
        },
        l
      ))
    }
  );
}
const as = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (as.displayName = "ListContext");
const rd = as;
function od(e) {
  return Fe("MuiList", e);
}
tt("MuiList", ["root", "padding", "dense", "subheader"]);
const id = ["children", "className", "component", "dense", "disablePadding", "subheader"], sd = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return Ye({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, od, t);
}, ad = be("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.disablePadding && t.padding, n.dense && t.dense, n.subheader && t.subheader];
  }
})(({
  ownerState: e
}) => w({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), ls = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = Je({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, p = ce(r, id), f = T.useMemo(() => ({
    dense: l
  }), [l]), d = w({}, r, {
    component: a,
    dense: l,
    disablePadding: c
  }), b = sd(d);
  return /* @__PURE__ */ S(rd.Provider, {
    value: f,
    children: /* @__PURE__ */ Oe(ad, w({
      as: a,
      className: Re(b.root, i),
      ref: n,
      ownerState: d
    }, p, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (ls.propTypes = {
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
const ld = ls, cd = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function ur(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function si(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function cs(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function Wt(e, t, n, r, o, i) {
  let a = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (a)
        return !1;
      a = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !cs(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const us = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: a,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: u = !1,
    onKeyDown: p,
    variant: f = "selectedMenu"
  } = t, d = ce(t, cd), b = T.useRef(null), v = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Nt(() => {
    o && b.current.focus();
  }, [o]), T.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (y, E) => {
      const g = !b.current.style.width;
      if (y.clientHeight < b.current.clientHeight && g) {
        const k = `${Pi(xe(y))}px`;
        b.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = k, b.current.style.width = `calc(100% + ${k})`;
      }
      return b.current;
    }
  }), []);
  const m = (y) => {
    const E = b.current, g = y.key, k = xe(E).activeElement;
    if (g === "ArrowDown")
      y.preventDefault(), Wt(E, k, u, c, ur);
    else if (g === "ArrowUp")
      y.preventDefault(), Wt(E, k, u, c, si);
    else if (g === "Home")
      y.preventDefault(), Wt(E, null, u, c, ur);
    else if (g === "End")
      y.preventDefault(), Wt(E, null, u, c, si);
    else if (g.length === 1) {
      const P = v.current, D = g.toLowerCase(), _ = performance.now();
      P.keys.length > 0 && (_ - P.lastTime > 500 ? (P.keys = [], P.repeating = !0, P.previousKeyMatched = !0) : P.repeating && D !== P.keys[0] && (P.repeating = !1)), P.lastTime = _, P.keys.push(D);
      const A = k && !P.repeating && cs(k, P);
      P.previousKeyMatched && (A || Wt(E, k, !1, c, ur, P)) ? y.preventDefault() : P.previousKeyMatched = !1;
    }
    p && p(y);
  }, h = je(b, n);
  let x = -1;
  T.Children.forEach(a, (y, E) => {
    if (!/* @__PURE__ */ T.isValidElement(y)) {
      x === E && (x += 1, x >= a.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Sn.isFragment(y) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), y.props.disabled || (f === "selectedMenu" && y.props.selected || x === -1) && (x = E), x === E && (y.props.disabled || y.props.muiSkipListHighlight || y.type.muiSkipListHighlight) && (x += 1, x >= a.length && (x = -1));
  });
  const $ = T.Children.map(a, (y, E) => {
    if (E === x) {
      const g = {};
      return i && (g.autoFocus = !0), y.props.tabIndex === void 0 && f === "selectedMenu" && (g.tabIndex = 0), /* @__PURE__ */ T.cloneElement(y, g);
    }
    return y;
  });
  return /* @__PURE__ */ S(ld, w({
    role: "menu",
    ref: h,
    className: l,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, d, {
    children: $
  }));
});
process.env.NODE_ENV !== "production" && (us.propTypes = {
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
const ud = us, pd = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], dd = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, ps = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = fn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: a = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: p,
    onEntered: f,
    onEntering: d,
    onExit: b,
    onExited: v,
    onExiting: m,
    style: h,
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: $ = ts
  } = t, y = ce(t, pd), E = T.useRef(null), g = je(E, l.ref, n), k = (L) => (I) => {
    if (L) {
      const R = E.current;
      I === void 0 ? L(R) : L(R, I);
    }
  }, P = k(d), D = k((L, I) => {
    ns(L);
    const R = An({
      style: h,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    L.style.webkitTransition = r.transitions.create("opacity", R), L.style.transition = r.transitions.create("opacity", R), p && p(L, I);
  }), _ = k(f), A = k(m), B = k((L) => {
    const I = An({
      style: h,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    L.style.webkitTransition = r.transitions.create("opacity", I), L.style.transition = r.transitions.create("opacity", I), b && b(L);
  }), z = k(v);
  return /* @__PURE__ */ S($, w({
    appear: a,
    in: u,
    nodeRef: E,
    onEnter: D,
    onEntered: _,
    onEntering: P,
    onExit: B,
    onExited: z,
    onExiting: A,
    addEndListener: (L) => {
      i && i(E.current, L);
    },
    timeout: x
  }, y, {
    children: (L, I) => /* @__PURE__ */ T.cloneElement(l, w({
      style: w({
        opacity: 0,
        visibility: L === "exited" && !u ? "hidden" : void 0
      }, dd[L], h, l.props.style),
      ref: g
    }, I))
  }));
});
process.env.NODE_ENV !== "production" && (ps.propTypes = {
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
  children: an.isRequired,
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
const fd = ps;
function hd(e) {
  return Fe("MuiBackdrop", e);
}
tt("MuiBackdrop", ["root", "invisible"]);
const md = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], gd = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return Ye({
    root: ["root", n && "invisible"]
  }, hd, t);
}, bd = be("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.invisible && t.invisible];
  }
})(({
  ownerState: e
}) => w({
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
})), ds = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i;
  const a = Je({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: p = {},
    componentsProps: f = {},
    invisible: d = !1,
    open: b,
    slotProps: v = {},
    slots: m = {},
    TransitionComponent: h = fd,
    transitionDuration: x
  } = a, $ = ce(a, md), y = w({}, a, {
    component: u,
    invisible: d
  }), E = gd(y), g = (r = v.root) != null ? r : f.root;
  return /* @__PURE__ */ S(h, w({
    in: b,
    timeout: x
  }, $, {
    children: /* @__PURE__ */ S(bd, w({
      "aria-hidden": !0
    }, g, {
      as: (o = (i = m.root) != null ? i : p.Root) != null ? o : u,
      className: Re(E.root, c, g == null ? void 0 : g.className),
      ownerState: w({}, y, g == null ? void 0 : g.ownerState),
      classes: E,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ds.propTypes = {
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
const vd = ds;
function yd(e) {
  return Fe("MuiModal", e);
}
tt("MuiModal", ["root", "hidden", "backdrop"]);
const Ed = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], xd = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return Ye({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, yd, r);
}, Td = be("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.open && n.exited && t.hidden];
  }
})(({
  theme: e,
  ownerState: t
}) => w({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), wd = be(vd, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), fs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, a, l, c;
  const u = Je({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: p = wd,
    BackdropProps: f,
    className: d,
    closeAfterTransition: b = !1,
    children: v,
    container: m,
    component: h,
    components: x = {},
    componentsProps: $ = {},
    disableAutoFocus: y = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: g = !1,
    disablePortal: k = !1,
    disableRestoreFocus: P = !1,
    disableScrollLock: D = !1,
    hideBackdrop: _ = !1,
    keepMounted: A = !1,
    onBackdropClick: B,
    open: z,
    slotProps: G,
    slots: L
    // eslint-disable-next-line react/prop-types
  } = u, I = ce(u, Ed), R = w({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: y,
    disableEnforceFocus: E,
    disableEscapeKeyDown: g,
    disablePortal: k,
    disableRestoreFocus: P,
    disableScrollLock: D,
    hideBackdrop: _,
    keepMounted: A
  }), {
    getRootProps: j,
    getBackdropProps: Q,
    getTransitionProps: Z,
    portalRef: O,
    isTopModal: M,
    exited: F,
    hasTransition: K
  } = Tl(w({}, R, {
    rootRef: n
  })), V = w({}, R, {
    exited: F
  }), U = xd(V), W = {};
  if (v.props.tabIndex === void 0 && (W.tabIndex = "-1"), K) {
    const {
      onEnter: J,
      onExited: C
    } = Z();
    W.onEnter = J, W.onExited = C;
  }
  const q = (r = (o = L == null ? void 0 : L.root) != null ? o : x.Root) != null ? r : Td, H = (i = (a = L == null ? void 0 : L.backdrop) != null ? a : x.Backdrop) != null ? i : p, X = (l = G == null ? void 0 : G.root) != null ? l : $.root, Y = (c = G == null ? void 0 : G.backdrop) != null ? c : $.backdrop, ne = pt({
    elementType: q,
    externalSlotProps: X,
    externalForwardedProps: I,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: h
    },
    ownerState: V,
    className: Re(d, X == null ? void 0 : X.className, U == null ? void 0 : U.root, !V.open && V.exited && (U == null ? void 0 : U.hidden))
  }), N = pt({
    elementType: H,
    externalSlotProps: Y,
    additionalProps: f,
    getSlotProps: (J) => Q(w({}, J, {
      onClick: (C) => {
        B && B(C), J != null && J.onClick && J.onClick(C);
      }
    })),
    className: Re(Y == null ? void 0 : Y.className, f == null ? void 0 : f.className, U == null ? void 0 : U.backdrop),
    ownerState: V
  });
  return !A && !z && (!K || F) ? null : /* @__PURE__ */ S(tn, {
    ref: O,
    container: m,
    disablePortal: k,
    children: /* @__PURE__ */ Oe(q, w({}, ne, {
      children: [!_ && p ? /* @__PURE__ */ S(H, w({}, N)) : null, /* @__PURE__ */ S(Rn, {
        disableEnforceFocus: E,
        disableAutoFocus: y,
        disableRestoreFocus: P,
        isEnabled: M,
        open: z,
        children: /* @__PURE__ */ T.cloneElement(v, W)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (fs.propTypes = {
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
  children: an.isRequired,
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
  container: s.oneOfType([qe, s.func]),
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
const Od = fs;
function kd(e) {
  return Fe("MuiPaper", e);
}
tt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Pd = ["className", "component", "elevation", "square", "variant"], Sd = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return Ye(i, kd, o);
}, Cd = be("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], !n.square && t.rounded, n.variant === "elevation" && t[`elevation${n.elevation}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n;
  return w({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && w({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${In("#fff", ri(t.elevation))}, ${In("#fff", ri(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), hs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = Je({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: a = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = ce(r, Pd), p = w({}, r, {
    component: i,
    elevation: a,
    square: l,
    variant: c
  }), f = Sd(p);
  return process.env.NODE_ENV !== "production" && fn().shadows[a] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)), /* @__PURE__ */ S(Cd, w({
    as: i,
    ownerState: p,
    className: Re(f.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (hs.propTypes = {
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
  elevation: _t(Ri, (e) => {
    const {
      elevation: t,
      variant: n
    } = e;
    return t > 0 && n === "outlined" ? new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
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
const Rd = hs;
function Nd(e) {
  return Fe("MuiPopover", e);
}
tt("MuiPopover", ["root", "paper"]);
const $d = ["onEntering"], Md = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Id = ["slotProps"];
function ai(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function li(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function ci(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Pn(e) {
  return typeof e == "function" ? e() : e;
}
const Ad = (e) => {
  const {
    classes: t
  } = e;
  return Ye({
    root: ["root"],
    paper: ["paper"]
  }, Nd, t);
}, _d = be(Od, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ms = be(Rd, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
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
}), gs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i;
  const a = Je({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: p,
    anchorReference: f = "anchorEl",
    children: d,
    className: b,
    container: v,
    elevation: m = 8,
    marginThreshold: h = 16,
    open: x,
    PaperProps: $ = {},
    slots: y,
    slotProps: E,
    transformOrigin: g = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: k = Pr,
    transitionDuration: P = "auto",
    TransitionProps: {
      onEntering: D
    } = {},
    disableScrollLock: _ = !1
  } = a, A = ce(a.TransitionProps, $d), B = ce(a, Md), z = (r = E == null ? void 0 : E.paper) != null ? r : $, G = T.useRef(), L = je(G, z.ref), I = w({}, a, {
    anchorOrigin: u,
    anchorReference: f,
    elevation: m,
    marginThreshold: h,
    externalPaperSlotProps: z,
    transformOrigin: g,
    TransitionComponent: k,
    transitionDuration: P,
    TransitionProps: A
  }), R = Ad(I), j = T.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (p || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), p;
    const J = Pn(c), C = J && J.nodeType === 1 ? J : xe(G.current).body, re = C.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const me = C.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && me.top === 0 && me.left === 0 && me.right === 0 && me.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: re.top + ai(re, u.vertical),
      left: re.left + li(re, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, p, f]), Q = T.useCallback((J) => ({
    vertical: ai(J, g.vertical),
    horizontal: li(J, g.horizontal)
  }), [g.horizontal, g.vertical]), Z = T.useCallback((J) => {
    const C = {
      width: J.offsetWidth,
      height: J.offsetHeight
    }, re = Q(C);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: ci(re)
      };
    const me = j();
    let ve = me.top - re.vertical, fe = me.left - re.horizontal;
    const ot = ve + C.height, ye = fe + C.width, ze = en(Pn(c)), ke = ze.innerHeight - h, Ue = ze.innerWidth - h;
    if (h !== null && ve < h) {
      const ge = ve - h;
      ve -= ge, re.vertical += ge;
    } else if (h !== null && ot > ke) {
      const ge = ot - ke;
      ve -= ge, re.vertical += ge;
    }
    if (process.env.NODE_ENV !== "production" && C.height > ke && C.height && ke && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${C.height - ke}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && fe < h) {
      const ge = fe - h;
      fe -= ge, re.horizontal += ge;
    } else if (ye > Ue) {
      const ge = ye - Ue;
      fe -= ge, re.horizontal += ge;
    }
    return {
      top: `${Math.round(ve)}px`,
      left: `${Math.round(fe)}px`,
      transformOrigin: ci(re)
    };
  }, [c, f, j, Q, h]), [O, M] = T.useState(x), F = T.useCallback(() => {
    const J = G.current;
    if (!J)
      return;
    const C = Z(J);
    C.top !== null && (J.style.top = C.top), C.left !== null && (J.style.left = C.left), J.style.transformOrigin = C.transformOrigin, M(!0);
  }, [Z]);
  T.useEffect(() => (_ && window.addEventListener("scroll", F), () => window.removeEventListener("scroll", F)), [c, _, F]);
  const K = (J, C) => {
    D && D(J, C), F();
  }, V = () => {
    M(!1);
  };
  T.useEffect(() => {
    x && F();
  }), T.useImperativeHandle(l, () => x ? {
    updatePosition: () => {
      F();
    }
  } : null, [x, F]), T.useEffect(() => {
    if (!x)
      return;
    const J = Ra(() => {
      F();
    }), C = en(c);
    return C.addEventListener("resize", J), () => {
      J.clear(), C.removeEventListener("resize", J);
    };
  }, [c, x, F]);
  let U = P;
  P === "auto" && !k.muiSupportAuto && (U = void 0);
  const W = v || (c ? xe(Pn(c)).body : void 0), q = (o = y == null ? void 0 : y.root) != null ? o : _d, H = (i = y == null ? void 0 : y.paper) != null ? i : ms, X = pt({
    elementType: H,
    externalSlotProps: w({}, z, {
      style: O ? z.style : w({}, z.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: L
    },
    ownerState: I,
    className: Re(R.paper, z == null ? void 0 : z.className)
  }), Y = pt({
    elementType: q,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: B,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: W,
      open: x
    },
    ownerState: I,
    className: Re(R.root, b)
  }), {
    slotProps: ne
  } = Y, N = ce(Y, Id);
  return /* @__PURE__ */ S(q, w({}, N, !Mi(q) && {
    slotProps: ne,
    disableScrollLock: _
  }, {
    children: /* @__PURE__ */ S(k, w({
      appear: !0,
      in: x,
      onEntering: K,
      onExited: V,
      timeout: U
    }, A, {
      children: /* @__PURE__ */ S(H, w({}, X, {
        children: d
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (gs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Rr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: _t(s.oneOfType([qe, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Pn(e.anchorEl);
      if (t && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
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
  container: s.oneOfType([qe, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Ri,
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
    component: xa
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
const Dd = gs;
function jd(e) {
  return Fe("MuiMenu", e);
}
tt("MuiMenu", ["root", "paper", "list"]);
const Bd = ["onEntering"], Ld = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Vd = {
  vertical: "top",
  horizontal: "right"
}, Fd = {
  vertical: "top",
  horizontal: "left"
}, zd = (e) => {
  const {
    classes: t
  } = e;
  return Ye({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, jd, t);
}, Ud = be(Dd, {
  shouldForwardProp: (e) => Qi(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Hd = be(ms, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), Wd = be(ud, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), bs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o;
  const i = Je({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: a = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: p = {},
    onClose: f,
    open: d,
    PaperProps: b = {},
    PopoverClasses: v,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: x = "selectedMenu",
    slots: $ = {},
    slotProps: y = {}
  } = i, E = ce(i.TransitionProps, Bd), g = ce(i, Ld), k = fn(), P = k.direction === "rtl", D = w({}, i, {
    autoFocus: a,
    disableAutoFocusItem: u,
    MenuListProps: p,
    onEntering: h,
    PaperProps: b,
    transitionDuration: m,
    TransitionProps: E,
    variant: x
  }), _ = zd(D), A = a && !u && d, B = T.useRef(null), z = (Z, O) => {
    B.current && B.current.adjustStyleForScrollbar(Z, k), h && h(Z, O);
  }, G = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), f && f(Z, "tabKeyDown"));
  };
  let L = -1;
  T.Children.map(l, (Z, O) => {
    /* @__PURE__ */ T.isValidElement(Z) && (process.env.NODE_ENV !== "production" && Sn.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (x === "selectedMenu" && Z.props.selected || L === -1) && (L = O));
  });
  const I = (r = $.paper) != null ? r : Hd, R = (o = y.paper) != null ? o : b, j = pt({
    elementType: $.root,
    externalSlotProps: y.root,
    ownerState: D,
    className: [_.root, c]
  }), Q = pt({
    elementType: I,
    externalSlotProps: R,
    ownerState: D,
    className: _.paper
  });
  return /* @__PURE__ */ S(Ud, w({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: P ? "right" : "left"
    },
    transformOrigin: P ? Vd : Fd,
    slots: {
      paper: I,
      root: $.root
    },
    slotProps: {
      root: j,
      paper: Q
    },
    open: d,
    ref: n,
    transitionDuration: m,
    TransitionProps: w({
      onEntering: z
    }, E),
    ownerState: D
  }, g, {
    classes: v,
    children: /* @__PURE__ */ S(Wd, w({
      onKeyDown: G,
      actions: B,
      autoFocus: a && (L === -1 || u),
      autoFocusItem: A,
      variant: x
    }, p, {
      className: Re(_.list, p.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (bs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([qe, s.func]),
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
const qd = bs;
function Of({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = Pt.useState(void 0), a = St(
    (p) => {
      p.preventDefault(), i(
        o === void 0 ? {
          mouseX: p.clientX + 2,
          mouseY: p.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), l = St(() => {
    i(void 0);
  }, []), c = sn(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ Oe(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: a,
      children: [
        r,
        /* @__PURE__ */ S(
          qd,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ S(
              qr,
              {
                menuDefinition: n,
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
function kf({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: a = "medium",
  className: l,
  onClick: c,
  children: u
}) {
  return /* @__PURE__ */ S(
    bi,
    {
      id: e,
      disabled: n,
      edge: i,
      size: a,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: u
    }
  );
}
var Gd = Object.defineProperty, Kd = (e, t, n) => t in e ? Gd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => (Kd(e, typeof t != "symbol" ? t + "" : t, n), n);
const ht = [
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
], Gr = [
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
], vs = [
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
], ui = of();
function Dt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ui ? ui[e] : 0;
}
function Kr(e) {
  return Dt(e) > 0;
}
function Xd(e) {
  const t = typeof e == "string" ? Dt(e) : e;
  return t >= 40 && t <= 66;
}
function Yd(e) {
  return (typeof e == "string" ? Dt(e) : e) <= 39;
}
function ys(e) {
  return e <= 66;
}
function Jd(e) {
  const t = typeof e == "string" ? Dt(e) : e;
  return Ts(t) && !ys(t);
}
function* Zd() {
  for (let e = 1; e <= ht.length; e++)
    yield e;
}
const Qd = 1, Es = ht.length;
function ef() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Xr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= ht.length ? t : ht[n];
}
function xs(e) {
  return e <= 0 || e > Es ? "******" : vs[e - 1];
}
function tf(e) {
  return xs(Dt(e));
}
function Ts(e) {
  const t = typeof e == "number" ? Xr(e) : e;
  return Kr(t) && !Gr.includes(t);
}
function nf(e) {
  const t = typeof e == "number" ? Xr(e) : e;
  return Kr(t) && Gr.includes(t);
}
function rf(e) {
  return vs[e - 1].includes("*obsolete*");
}
function of() {
  const e = {};
  for (let t = 0; t < ht.length; t++)
    e[ht[t]] = t + 1;
  return e;
}
const Be = {
  allBookIds: ht,
  nonCanonicalIds: Gr,
  bookIdToNumber: Dt,
  isBookIdValid: Kr,
  isBookNT: Xd,
  isBookOT: Yd,
  isBookOTNT: ys,
  isBookDC: Jd,
  allBookNumbers: Zd,
  firstBook: Qd,
  lastBook: Es,
  extraBooks: ef,
  bookNumberToId: Xr,
  bookNumberToEnglishName: xs,
  bookIdToEnglishName: tf,
  isCanonical: Ts,
  isExtraMaterial: nf,
  isObsolete: rf
};
var Qe = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Qe || {});
const Se = class {
  // private versInfo: Versification;
  constructor(t) {
    if (te(this, "name"), te(this, "fullPath"), te(this, "isPresent"), te(this, "hasVerseSegments"), te(this, "isCustomized"), te(this, "baseVersification"), te(this, "scriptureBooks"), te(this, "_type"), t != null)
      typeof t == "string" ? this.name = t : this._type = t;
    else
      throw new Error("Argument null");
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
te(Se, "Original", new Se(Qe.Original)), te(Se, "Septuagint", new Se(Qe.Septuagint)), te(Se, "Vulgate", new Se(Qe.Vulgate)), te(Se, "English", new Se(Qe.English)), te(Se, "RussianProtestant", new Se(Qe.RussianProtestant)), te(Se, "RussianOrthodox", new Se(Qe.RussianOrthodox));
let kt = Se;
function pi(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var ws = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(ws || {});
const Ee = class oe {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, a = n != null && n instanceof kt ? n : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof kt ? n : void 0;
        this.setEmpty(i), this._verseNum = t % oe.chapterDigitShifter, this._chapterNum = Math.floor(
          t % oe.bookDigitShifter / oe.chapterDigitShifter
        ), this._bookNum = Math.floor(t / oe.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof oe) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof kt ? t : oe.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? oe.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(t, n = oe.defaultVersification) {
    const r = new oe(n);
    return r.parse(t), r;
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
      return n = oe.parse(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof qt)
        return n = new oe(), { success: !1, verseRef: n };
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
    return t % oe.bcvMaxValue * oe.bookDigitShifter + (n >= 0 ? n % oe.bcvMaxValue * oe.chapterDigitShifter : 0) + (r >= 0 ? r % oe.bcvMaxValue : 0);
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
    for (let o = 0; o < t.length; o++) {
      if (r = t[o], r < "0" || r > "9")
        return o === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +r - +"0", n > oe.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(oe.verseRangeSeparator) || this._verse.includes(oe.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Be.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = Be.bookIdToNumber(t);
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
    const { success: n, vNum: r } = oe.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = oe.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > Be.lastBook)
      throw new qt(
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
    this.versification = this.versification != null ? new kt(t) : void 0;
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
    return this.validateVerse(oe.verseRangeSeparators, oe.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return oe.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return oe.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
      const i = t.split("/");
      if (t = i[0], i.length > 1)
        try {
          const a = +i[1].trim();
          this.versification = new kt(Qe[a]);
        } catch {
          throw new qt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new qt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || Be.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
      throw new qt("Invalid reference : " + t);
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
    return new oe(this);
  }
  toString() {
    const t = this.book;
    return t === "" ? "" : `${t} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(t) {
    return t instanceof oe ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && t.versification != null && this.versification != null && t.versification.equals(this.versification) : !1;
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
  allVerses(t = !1, n = oe.verseRangeSeparators, r = oe.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = pi(this._verse, r);
    for (const a of i.map((l) => pi(l, n))) {
      const l = this.clone();
      l.verse = a[0];
      const c = l.verseNum;
      if (o.push(l), a.length > 1) {
        const u = this.clone();
        if (u.verse = a[1], !t)
          for (let p = c + 1; p < u.verseNum; p++) {
            const f = new oe(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || o.push(f);
          }
        o.push(u);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(t, n) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const o of this.allVerses(!0, t, n)) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Be.lastBook ? 2 : (Be.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = Be.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
te(Ee, "defaultVersification", kt.English), te(Ee, "verseRangeSeparator", "-"), te(Ee, "verseSequenceIndicator", ","), te(Ee, "verseRangeSeparators", [Ee.verseRangeSeparator]), te(Ee, "verseSequenceIndicators", [Ee.verseSequenceIndicator]), te(Ee, "chapterDigitShifter", 1e3), te(Ee, "bookDigitShifter", Ee.chapterDigitShifter * Ee.chapterDigitShifter), te(Ee, "bcvMaxValue", Ee.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(Ee, "ValidStatusType", ws);
class qt extends Error {
}
function _n({
  variant: e = "outlined",
  id: t,
  isDisabled: n = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: a,
  placeholder: l,
  isRequired: c = !1,
  className: u,
  defaultValue: p,
  value: f,
  onChange: d,
  onFocus: b,
  onBlur: v
}) {
  return /* @__PURE__ */ S(
    hi,
    {
      variant: e,
      id: t,
      disabled: n,
      error: r,
      fullWidth: o,
      helperText: i,
      label: a,
      placeholder: l,
      required: c,
      className: `papi-textfield ${u ?? ""}`,
      defaultValue: p,
      value: f,
      onChange: d,
      onFocus: b,
      onBlur: v
    }
  );
}
let pr;
const dr = () => (pr || (pr = Be.allBookIds.map((e) => ({
  bookId: e,
  label: Be.bookIdToEnglishName(e)
}))), pr);
function Sf({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const f = { bookNum: Be.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, a = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = sn(() => dr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ Oe("span", { id: n, children: [
    /* @__PURE__ */ S(
      mr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: dr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ S(
      gt,
      {
        onClick: () => r(fo(e, -1)),
        isDisabled: e.bookNum <= ta,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(
      gt,
      {
        onClick: () => r(fo(e, 1)),
        isDisabled: e.bookNum >= dr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ S(
      _n,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ S(
      gt,
      {
        onClick: () => t(ho(e, -1)),
        isDisabled: e.chapterNum <= na,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(
      gt,
      {
        onClick: () => t(ho(e, 1)),
        isDisabled: e.chapterNum >= ra(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ S(
      _n,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ S(
      gt,
      {
        onClick: () => t(mo(e, -1)),
        isDisabled: e.verseNum <= oa,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(gt, { onClick: () => t(mo(e, 1)), children: ">" })
  ] });
}
function Cf({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = ct(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ S(Hs, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ S(
    _n,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (a) => i(a.target.value)
    }
  ) });
}
function Rf({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: a = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: u = "off",
  className: p,
  onChange: f,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ S(
    Ws,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: i,
      marks: a,
      defaultValue: l,
      value: c,
      valueLabelDisplay: u,
      className: `papi-slider ${n} ${p ?? ""}`,
      onChange: f,
      onChangeCommitted: d
    }
  );
}
function Nf({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: a,
  children: l
}) {
  const c = {
    action: (a == null ? void 0 : a.action) || l,
    message: a == null ? void 0 : a.message,
    className: r
  };
  return /* @__PURE__ */ S(
    qs,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: i,
      id: t,
      ContentProps: c
    }
  );
}
function $f({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ S(
    Gs,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function di({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ S(_n, { defaultValue: t[n.key], onChange: r });
}
const sf = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ S(
  aa,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Mf({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: n,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: a,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: u,
  enableSelectColumn: p,
  selectColumnWidth: f = 50,
  rowKeyGetter: d,
  rowHeight: b = 35,
  headerRowHeight: v = 35,
  selectedRows: m,
  onSelectedRowsChange: h,
  onRowsChange: x,
  onCellClick: $,
  onCellDoubleClick: y,
  onCellContextMenu: E,
  onCellKeyDown: g,
  direction: k = "ltr",
  enableVirtualization: P = !0,
  onCopy: D,
  onPaste: _,
  onScroll: A,
  className: B,
  id: z
}) {
  const G = sn(() => {
    const L = e.map((I) => typeof I.editable == "function" ? {
      ...I,
      editable: (j) => !!I.editable(j),
      renderEditCell: I.renderEditCell || di
    } : I.editable && !I.renderEditCell ? { ...I, renderEditCell: di } : I.renderEditCell && !I.editable ? { ...I, editable: !1 } : I);
    return p ? [{ ...sa, minWidth: f }, ...L] : L;
  }, [e, p, f]);
  return /* @__PURE__ */ S(
    ia,
    {
      columns: G,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: a,
        sortable: l,
        resizable: c
      },
      sortColumns: t,
      onSortColumnsChange: n,
      onColumnResize: r,
      rows: u,
      rowKeyGetter: d,
      rowHeight: b,
      headerRowHeight: v,
      selectedRows: m,
      onSelectedRowsChange: h,
      onRowsChange: x,
      onCellClick: $,
      onCellDoubleClick: y,
      onCellContextMenu: E,
      onCellKeyDown: g,
      direction: k,
      enableVirtualization: P,
      onCopy: D,
      onPaste: _,
      onScroll: A,
      renderers: { renderCheckbox: sf },
      className: `papi-table ${B ?? "rdg-light"}`,
      id: z
    }
  );
}
function af(e) {
  return Fe("MuiSvgIcon", e);
}
tt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const lf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], cf = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ge(t)}`, `fontSize${Ge(n)}`]
  };
  return Ye(o, af, r);
}, uf = be("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Ge(n.color)}`], t[`fontSize${Ge(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, a, l, c, u, p, f, d, b, v;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: t.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (n = e.transitions) == null || (r = n.create) == null ? void 0 : r.call(n, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((i = e.typography) == null || (a = i.pxToRem) == null ? void 0 : a.call(i, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (p = u.pxToRem) == null ? void 0 : p.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (d = (e.vars || e).palette) == null || (d = d[t.color]) == null ? void 0 : d.main) != null ? f : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), Yr = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = Je({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: a = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: p = !1,
    titleAccess: f,
    viewBox: d = "0 0 24 24"
  } = r, b = ce(r, lf), v = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", m = w({}, r, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: p,
    viewBox: d,
    hasSvgAsChild: v
  }), h = {};
  p || (h.viewBox = d);
  const x = cf(m);
  return /* @__PURE__ */ Oe(uf, w({
    as: l,
    className: Re(x.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, b, v && o.props, {
    ownerState: m,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ S("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Yr.propTypes = {
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
Yr.muiName = "SvgIcon";
const fi = Yr;
function pf(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ S(fi, w({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = fi.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(n));
}
const df = pf(/* @__PURE__ */ S("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function If({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const [i, a] = ct(!1), [l, c] = ct(!1), u = St(() => {
    i && a(!1), c(!1);
  }, [i]), p = St((h) => {
    h.stopPropagation(), a((x) => {
      const $ = !x;
      return $ && h.shiftKey ? c(!0) : $ || c(!1), $;
    });
  }, []), f = hr(void 0), [d, b] = ct(0);
  Dn(() => {
    i && f.current && b(f.current.clientHeight);
  }, [i]);
  const v = St(
    (h) => (u(), t(h)),
    [t, u]
  ), m = e == null ? void 0 : e(l);
  return /* @__PURE__ */ S("div", { ref: f, style: { position: "relative" }, children: /* @__PURE__ */ S(Ks, { position: "static", id: r, children: /* @__PURE__ */ Oe(Xs, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    m ? /* @__PURE__ */ S(
      bi,
      {
        edge: "start",
        className: `papi-menuButton ${n ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: p,
        children: /* @__PURE__ */ S(df, {})
      }
    ) : void 0,
    o ? /* @__PURE__ */ S("div", { className: "papi-menu-children", children: o }) : void 0,
    m ? /* @__PURE__ */ S(
      Ys,
      {
        className: `papi-menu-drawer ${n ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: i,
        onClose: u,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: d
          }
        },
        children: /* @__PURE__ */ S(
          nd,
          {
            className: n,
            commandHandler: v,
            multiColumnMenu: m
          }
        )
      }
    ) : void 0
  ] }) }) });
}
const Af = (e, t) => {
  Dn(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
};
function ff(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const hf = (e, t, n = {}) => {
  const r = hr(t);
  r.current = t;
  const o = hr(n);
  o.current = ff(o.current);
  const [i, a] = ct(() => r.current), [l, c] = ct(!0);
  return Dn(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const p = await e();
        u && (a(() => p), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || a(() => r.current);
    };
  }, [e]), [i, l];
}, fr = () => !1, _f = (e, t) => {
  const [n] = hf(
    St(async () => {
      if (!e)
        return fr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    fr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Dn(() => () => {
    n !== fr && n();
  }, [n]);
};
function mf(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
mf(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
  gt as Button,
  wf as ChapterRangeSelector,
  aa as Checkbox,
  mr as ComboBox,
  Of as ContextMenu,
  nd as GridMenu,
  kf as IconButton,
  wt as LabelPosition,
  Jp as MenuItem,
  Sf as RefSelector,
  Cf as SearchBar,
  Rf as Slider,
  Nf as Snackbar,
  $f as Switch,
  Mf as Table,
  _n as TextField,
  If as Toolbar,
  ed as TopLevelMenu,
  Af as useEvent,
  _f as useEventAsync,
  hf as usePromise
};
//# sourceMappingURL=index.js.map
