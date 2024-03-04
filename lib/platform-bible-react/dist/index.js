import Js, { jsx as C, jsxs as Oe, Fragment as Rr } from "react/jsx-runtime";
import { Button as Zs, Autocomplete as Qs, TextField as vi, FormControlLabel as mo, FormLabel as ea, Checkbox as ta, MenuItem as na, ListItemText as ra, ListItemIcon as yi, Menu as oa, Grid as Ei, List as ia, IconButton as xi, Paper as sa, Slider as aa, Snackbar as la, Switch as ca, AppBar as ua, Toolbar as pa, Drawer as da } from "@mui/material";
import * as x from "react";
import Ct, { useMemo as Dt, useState as pt, useCallback as ut, useRef as gr, useEffect as Dn } from "react";
import fa, { ThemeContext as ha, internal_processStyles as ma } from "@mui/styled-engine";
import * as ga from "react-dom";
import mn from "react-dom";
import { offsetBook as go, FIRST_SCR_BOOK_NUM as ba, offsetChapter as bo, FIRST_SCR_CHAPTER_NUM as va, getChaptersForBook as ya, offsetVerse as vo, FIRST_SCR_VERSE_NUM as Ea } from "platform-bible-utils";
import xa, { SelectColumn as Ta } from "react-data-grid";
function vt({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ C(
    Zs,
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
function br({
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
  return /* @__PURE__ */ C(
    Qs,
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
      renderInput: (v) => /* @__PURE__ */ C(
        vi,
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
function Ff({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const a = Dt(
    () => Array.from({ length: i }, (u, p) => p + 1),
    [i]
  ), l = (u, p) => {
    n(p), p > t && r(p);
  }, c = (u, p) => {
    r(p), p < e && n(p);
  };
  return /* @__PURE__ */ Oe(Rr, { children: [
    /* @__PURE__ */ C(
      mo,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ C(
          br,
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
    /* @__PURE__ */ C(
      mo,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ C(
          br,
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
var Pt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Pt || {});
function wa({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Pt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const p = /* @__PURE__ */ C(
    ta,
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
    const d = r === Pt.Before || r === Pt.Above, b = /* @__PURE__ */ C("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === Pt.Before || r === Pt.After, m = v ? b : /* @__PURE__ */ C("div", { children: b }), h = v ? p : /* @__PURE__ */ C("div", { children: p });
    f = /* @__PURE__ */ Oe(
      ea,
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
function Oa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Pa(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var vr = { exports: {} }, gn = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yo;
function ka() {
  if (yo)
    return ie;
  yo = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, N = e ? Symbol.for("react.scope") : 60119;
  function E(g) {
    if (typeof g == "object" && g !== null) {
      var S = g.$$typeof;
      switch (S) {
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
                  return S;
              }
          }
        case n:
          return S;
      }
    }
  }
  function y(g) {
    return E(g) === u;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = u, ie.ContextConsumer = l, ie.ContextProvider = a, ie.Element = t, ie.ForwardRef = p, ie.Fragment = r, ie.Lazy = v, ie.Memo = b, ie.Portal = n, ie.Profiler = i, ie.StrictMode = o, ie.Suspense = f, ie.isAsyncMode = function(g) {
    return y(g) || E(g) === c;
  }, ie.isConcurrentMode = y, ie.isContextConsumer = function(g) {
    return E(g) === l;
  }, ie.isContextProvider = function(g) {
    return E(g) === a;
  }, ie.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === t;
  }, ie.isForwardRef = function(g) {
    return E(g) === p;
  }, ie.isFragment = function(g) {
    return E(g) === r;
  }, ie.isLazy = function(g) {
    return E(g) === v;
  }, ie.isMemo = function(g) {
    return E(g) === b;
  }, ie.isPortal = function(g) {
    return E(g) === n;
  }, ie.isProfiler = function(g) {
    return E(g) === i;
  }, ie.isStrictMode = function(g) {
    return E(g) === o;
  }, ie.isSuspense = function(g) {
    return E(g) === f;
  }, ie.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === u || g === i || g === o || g === f || g === d || typeof g == "object" && g !== null && (g.$$typeof === v || g.$$typeof === b || g.$$typeof === a || g.$$typeof === l || g.$$typeof === p || g.$$typeof === h || g.$$typeof === T || g.$$typeof === N || g.$$typeof === m);
  }, ie.typeOf = E, ie;
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
var Eo;
function Sa() {
  return Eo || (Eo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, T = e ? Symbol.for("react.responder") : 60118, N = e ? Symbol.for("react.scope") : 60119;
    function E(_) {
      return typeof _ == "string" || typeof _ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      _ === r || _ === u || _ === i || _ === o || _ === f || _ === d || typeof _ == "object" && _ !== null && (_.$$typeof === v || _.$$typeof === b || _.$$typeof === a || _.$$typeof === l || _.$$typeof === p || _.$$typeof === h || _.$$typeof === T || _.$$typeof === N || _.$$typeof === m);
    }
    function y(_) {
      if (typeof _ == "object" && _ !== null) {
        var J = _.$$typeof;
        switch (J) {
          case t:
            var R = _.type;
            switch (R) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case f:
                return R;
              default:
                var re = R && R.$$typeof;
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
    var g = c, S = u, k = l, B = a, A = t, P = p, L = r, z = v, G = b, j = n, I = i, $ = o, D = f, Q = !1;
    function Z(_) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(_) || y(_) === c;
    }
    function O(_) {
      return y(_) === u;
    }
    function M(_) {
      return y(_) === l;
    }
    function F(_) {
      return y(_) === a;
    }
    function K(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === t;
    }
    function V(_) {
      return y(_) === p;
    }
    function U(_) {
      return y(_) === r;
    }
    function W(_) {
      return y(_) === v;
    }
    function q(_) {
      return y(_) === b;
    }
    function H(_) {
      return y(_) === n;
    }
    function X(_) {
      return y(_) === i;
    }
    function Y(_) {
      return y(_) === o;
    }
    function ne(_) {
      return y(_) === f;
    }
    se.AsyncMode = g, se.ConcurrentMode = S, se.ContextConsumer = k, se.ContextProvider = B, se.Element = A, se.ForwardRef = P, se.Fragment = L, se.Lazy = z, se.Memo = G, se.Portal = j, se.Profiler = I, se.StrictMode = $, se.Suspense = D, se.isAsyncMode = Z, se.isConcurrentMode = O, se.isContextConsumer = M, se.isContextProvider = F, se.isElement = K, se.isForwardRef = V, se.isFragment = U, se.isLazy = W, se.isMemo = q, se.isPortal = H, se.isProfiler = X, se.isStrictMode = Y, se.isSuspense = ne, se.isValidElementType = E, se.typeOf = y;
  }()), se;
}
var xo;
function Ti() {
  return xo || (xo = 1, process.env.NODE_ENV === "production" ? gn.exports = ka() : gn.exports = Sa()), gn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var er, To;
function Ca() {
  if (To)
    return er;
  To = 1;
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
var tr, wo;
function Nr() {
  if (wo)
    return tr;
  wo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return tr = e, tr;
}
var nr, Oo;
function wi() {
  return Oo || (Oo = 1, nr = Function.call.bind(Object.prototype.hasOwnProperty)), nr;
}
var rr, Po;
function Ra() {
  if (Po)
    return rr;
  Po = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Nr(), n = {}, r = wi();
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
var or, ko;
function Na() {
  if (ko)
    return or;
  ko = 1;
  var e = Ti(), t = Ca(), n = Nr(), r = wi(), o = Ra(), i = function() {
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
      array: T("array"),
      bigint: T("bigint"),
      bool: T("boolean"),
      func: T("function"),
      number: T("number"),
      object: T("object"),
      string: T("string"),
      symbol: T("symbol"),
      any: N(),
      arrayOf: E,
      element: y(),
      elementType: g(),
      instanceOf: S,
      node: P(),
      objectOf: B,
      oneOf: k,
      oneOfType: A,
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
            var _ = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw _.name = "Invariant Violation", _;
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
    function T(O) {
      function M(F, K, V, U, W, q) {
        var H = F[K], X = $(H);
        if (X !== O) {
          var Y = D(H);
          return new m(
            "Invalid " + U + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + V + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return h(M);
    }
    function N() {
      return h(a);
    }
    function E(O) {
      function M(F, K, V, U, W) {
        if (typeof O != "function")
          return new m("Property `" + W + "` of component `" + V + "` has invalid PropType notation inside arrayOf.");
        var q = F[K];
        if (!Array.isArray(q)) {
          var H = $(q);
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
    function y() {
      function O(M, F, K, V, U) {
        var W = M[F];
        if (!l(W)) {
          var q = $(W);
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
          var q = $(W);
          return new m("Invalid " + V + " `" + U + "` of type " + ("`" + q + "` supplied to `" + K + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(O);
    }
    function S(O) {
      function M(F, K, V, U, W) {
        if (!(F[K] instanceof O)) {
          var q = O.name || d, H = Z(F[K]);
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + H + "` supplied to `" + V + "`, expected ") + ("instance of `" + q + "`."));
        }
        return null;
      }
      return h(M);
    }
    function k(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function M(F, K, V, U, W) {
        for (var q = F[K], H = 0; H < O.length; H++)
          if (v(q, O[H]))
            return null;
        var X = JSON.stringify(O, function(ne, _) {
          var J = D(_);
          return J === "symbol" ? String(_) : _;
        });
        return new m("Invalid " + U + " `" + W + "` of value `" + String(q) + "` " + ("supplied to `" + V + "`, expected one of " + X + "."));
      }
      return h(M);
    }
    function B(O) {
      function M(F, K, V, U, W) {
        if (typeof O != "function")
          return new m("Property `" + W + "` of component `" + V + "` has invalid PropType notation inside objectOf.");
        var q = F[K], H = $(q);
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
    function A(O) {
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
          var ne = O[Y], _ = ne(V, U, W, q, H, n);
          if (_ == null)
            return null;
          _.data && r(_.data, "expectedType") && X.push(_.data.expectedType);
        }
        var J = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new m("Invalid " + q + " `" + H + "` supplied to " + ("`" + W + "`" + J + "."));
      }
      return h(K);
    }
    function P() {
      function O(M, F, K, V, U) {
        return j(M[F]) ? null : new m("Invalid " + V + " `" + U + "` supplied to " + ("`" + K + "`, expected a ReactNode."));
      }
      return h(O);
    }
    function L(O, M, F, K, V) {
      return new m(
        (O || "React class") + ": " + M + " type `" + F + "." + K + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + V + "`."
      );
    }
    function z(O) {
      function M(F, K, V, U, W) {
        var q = F[K], H = $(q);
        if (H !== "object")
          return new m("Invalid " + U + " `" + W + "` of type `" + H + "` " + ("supplied to `" + V + "`, expected `object`."));
        for (var X in O) {
          var Y = O[X];
          if (typeof Y != "function")
            return L(V, U, W, X, D(Y));
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
        var q = F[K], H = $(q);
        if (H !== "object")
          return new m("Invalid " + U + " `" + W + "` of type `" + H + "` " + ("supplied to `" + V + "`, expected `object`."));
        var X = t({}, F[K], O);
        for (var Y in X) {
          var ne = O[Y];
          if (r(O, Y) && typeof ne != "function")
            return L(V, U, W, Y, D(ne));
          if (!ne)
            return new m(
              "Invalid " + U + " `" + W + "` key `" + Y + "` supplied to `" + V + "`.\nBad object: " + JSON.stringify(F[K], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var _ = ne(q, Y, V, U, W + "." + Y, n);
          if (_)
            return _;
        }
        return null;
      }
      return h(M);
    }
    function j(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(j);
          if (O === null || l(O))
            return !0;
          var M = f(O);
          if (M) {
            var F = M.call(O), K;
            if (M !== O.entries) {
              for (; !(K = F.next()).done; )
                if (!j(K.value))
                  return !1;
            } else
              for (; !(K = F.next()).done; ) {
                var V = K.value;
                if (V && !j(V[1]))
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
    function $(O) {
      var M = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : I(M, O) ? "symbol" : M;
    }
    function D(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var M = $(O);
      if (M === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function Q(O) {
      var M = D(O);
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
var ir, So;
function $a() {
  if (So)
    return ir;
  So = 1;
  var e = Nr();
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
  var _a = Ti(), Ma = !0;
  vr.exports = Na()(_a.isElement, Ma);
} else
  vr.exports = $a()();
var Ia = vr.exports;
const s = /* @__PURE__ */ Oa(Ia);
function Oi(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = Oi(e[t])) && (r && (r += " "), r += n);
    } else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function Re() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Oi(e)) && (r && (r += " "), r += t);
  return r;
}
function jt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function tt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Pi(e) {
  if (!tt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Pi(e[n]);
  }), t;
}
function Le(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? w({}, e) : e;
  return tt(e) && tt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (tt(t[o]) && o in e && tt(e[o]) ? r[o] = Le(e[o], t[o], n) : n.clone ? r[o] = tt(t[o]) ? Pi(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function Aa(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ki(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !Aa(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Si = jt(s.element, ki);
Si.isRequired = jt(s.element.isRequired, ki);
const sn = Si;
function Da(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ja(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !Da(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ba = jt(s.elementType, ja), La = "exact-prop: ​";
function Ci(e) {
  return process.env.NODE_ENV === "production" ? e : w({}, e, {
    [La]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Nt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var yr = { exports: {} }, ae = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Co;
function Va() {
  if (Co)
    return ae;
  Co = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function m(h) {
    if (typeof h == "object" && h !== null) {
      var T = h.$$typeof;
      switch (T) {
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
                  return T;
              }
          }
        case t:
          return T;
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
var Ro;
function Fa() {
  return Ro || (Ro = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, m = !1, h = !1, T = !1, N = !1, E;
    E = Symbol.for("react.module.reference");
    function y(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === n || R === o || N || R === r || R === u || R === p || T || R === b || v || m || h || typeof R == "object" && R !== null && (R.$$typeof === d || R.$$typeof === f || R.$$typeof === i || R.$$typeof === a || R.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === E || R.getModuleId !== void 0));
    }
    function g(R) {
      if (typeof R == "object" && R !== null) {
        var re = R.$$typeof;
        switch (re) {
          case e:
            var ge = R.type;
            switch (ge) {
              case n:
              case o:
              case r:
              case u:
              case p:
                return ge;
              default:
                var ye = ge && ge.$$typeof;
                switch (ye) {
                  case l:
                  case a:
                  case c:
                  case d:
                  case f:
                  case i:
                    return ye;
                  default:
                    return re;
                }
            }
          case t:
            return re;
        }
      }
    }
    var S = a, k = i, B = e, A = c, P = n, L = d, z = f, G = t, j = o, I = r, $ = u, D = p, Q = !1, Z = !1;
    function O(R) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function M(R) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function F(R) {
      return g(R) === a;
    }
    function K(R) {
      return g(R) === i;
    }
    function V(R) {
      return typeof R == "object" && R !== null && R.$$typeof === e;
    }
    function U(R) {
      return g(R) === c;
    }
    function W(R) {
      return g(R) === n;
    }
    function q(R) {
      return g(R) === d;
    }
    function H(R) {
      return g(R) === f;
    }
    function X(R) {
      return g(R) === t;
    }
    function Y(R) {
      return g(R) === o;
    }
    function ne(R) {
      return g(R) === r;
    }
    function _(R) {
      return g(R) === u;
    }
    function J(R) {
      return g(R) === p;
    }
    le.ContextConsumer = S, le.ContextProvider = k, le.Element = B, le.ForwardRef = A, le.Fragment = P, le.Lazy = L, le.Memo = z, le.Portal = G, le.Profiler = j, le.StrictMode = I, le.Suspense = $, le.SuspenseList = D, le.isAsyncMode = O, le.isConcurrentMode = M, le.isContextConsumer = F, le.isContextProvider = K, le.isElement = V, le.isForwardRef = U, le.isFragment = W, le.isLazy = q, le.isMemo = H, le.isPortal = X, le.isProfiler = Y, le.isStrictMode = ne, le.isSuspense = _, le.isSuspenseList = J, le.isValidElementType = y, le.typeOf = g;
  }()), le;
}
process.env.NODE_ENV === "production" ? yr.exports = Va() : yr.exports = Fa();
var On = yr.exports;
const za = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Ua(e) {
  const t = `${e}`.match(za);
  return t && t[1] || "";
}
function Ri(e, t = "") {
  return e.displayName || e.name || Ua(e) || t;
}
function No(e, t, n) {
  const r = Ri(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Ha(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Ri(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case On.ForwardRef:
          return No(e, e.render, "ForwardRef");
        case On.Memo:
          return No(e, e.type, "memo");
        default:
          return;
      }
  }
}
function Ke(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], a = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Wa = s.oneOfType([s.func, s.object]), $r = Wa;
function Ne(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Nt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Er(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Ni(e, t = 166) {
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
function qa(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, a) => {
    const l = o || "<<anonymous>>", c = a || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Ga(e, t) {
  var n, r;
  return /* @__PURE__ */ x.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function be(e) {
  return e && e.ownerDocument || document;
}
function $t(e) {
  return be(e).defaultView || window;
}
function Ka(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? w({}, t.propTypes) : null;
  return (o) => (i, a, l, c, u, ...p) => {
    const f = u || a, d = n == null ? void 0 : n[f];
    if (d) {
      const b = d(i, a, l, c, u, ...p);
      if (b)
        return b;
    }
    return typeof i[a] < "u" && !i[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Pn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Xa = typeof window < "u" ? x.useLayoutEffect : x.useEffect, ft = Xa;
let $o = 0;
function Ya(e) {
  const [t, n] = x.useState(e), r = e || t;
  return x.useEffect(() => {
    t == null && ($o += 1, n(`mui-${$o}`));
  }, [t]), r;
}
const _o = x["useId".toString()];
function $i(e) {
  if (_o !== void 0) {
    const t = _o();
    return e ?? t;
  }
  return Ya(e);
}
function Ja(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function _i({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = x.useRef(e !== void 0), [i, a] = x.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    x.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: u
    } = x.useRef(t);
    x.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = x.useCallback((u) => {
    o || a(u);
  }, []);
  return [l, c];
}
function kn(e) {
  const t = x.useRef(e);
  return ft(() => {
    t.current = e;
  }), x.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Ae(...e) {
  return x.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Pn(n, t);
    });
  }, e);
}
let jn = !0, xr = !1, Mo;
const Za = {
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
function Qa(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Za[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function el(e) {
  e.metaKey || e.altKey || e.ctrlKey || (jn = !0);
}
function sr() {
  jn = !1;
}
function tl() {
  this.visibilityState === "hidden" && xr && (jn = !0);
}
function nl(e) {
  e.addEventListener("keydown", el, !0), e.addEventListener("mousedown", sr, !0), e.addEventListener("pointerdown", sr, !0), e.addEventListener("touchstart", sr, !0), e.addEventListener("visibilitychange", tl, !0);
}
function rl(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return jn || Qa(t);
}
function Mi() {
  const e = x.useCallback((o) => {
    o != null && nl(o.ownerDocument);
  }, []), t = x.useRef(!1);
  function n() {
    return t.current ? (xr = !0, window.clearTimeout(Mo), Mo = window.setTimeout(() => {
      xr = !1;
    }, 100), t.current = !1, !0) : !1;
  }
  function r(o) {
    return rl(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Ii(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function ol(e) {
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
function il(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const sl = Number.isInteger || il;
function Ai(e, t, n, r) {
  const o = e[t];
  if (o == null || !sl(o)) {
    const i = ol(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Di(e, t, ...n) {
  return e[t] === void 0 ? null : Ai(e, t, ...n);
}
function Tr() {
  return null;
}
Di.isRequired = Ai;
Tr.isRequired = Tr;
const ji = process.env.NODE_ENV === "production" ? Tr : Di;
function Bi(e, t) {
  const n = w({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = w({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = w({}, i), Object.keys(o).forEach((a) => {
        n[r][a] = Bi(o[a], i[a]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function Je(e, t, n = void 0) {
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
const Io = (e) => e, al = () => {
  let e = Io;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Io;
    }
  };
}, ll = al(), Li = ll, Vi = {
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
function He(e, t, n = "Mui") {
  const r = Vi[t];
  return r ? `${n}-${r}` : `${Li.generate(e)}-${t}`;
}
function rt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = He(e, o, n);
  }), r;
}
function cl(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Fi(e) {
  return typeof e == "string";
}
function Xt(e, t, n) {
  return e === void 0 || Fi(e) ? t : w({}, t, {
    ownerState: w({}, t.ownerState, n)
  });
}
const ul = {
  disableDefaultClasses: !1
}, pl = /* @__PURE__ */ x.createContext(ul);
function dl(e) {
  const {
    disableDefaultClasses: t
  } = x.useContext(pl);
  return (n) => t ? "" : e(n);
}
function zi(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function fl(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Ui(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = Ui(e[t])) && (r && (r += " "), r += n);
    } else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function Ao() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Ui(e)) && (r && (r += " "), r += t);
  return r;
}
function Do(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function hl(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = Ao(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = w({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = w({}, n, o, r);
    return b.length > 0 && (m.className = b), Object.keys(v).length > 0 && (m.style = v), {
      props: m,
      internalRef: void 0
    };
  }
  const a = zi(w({}, o, r)), l = Do(r), c = Do(o), u = t(a), p = Ao(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = w({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = w({}, u, n, c, l);
  return p.length > 0 && (d.className = p), Object.keys(f).length > 0 && (d.style = f), {
    props: d,
    internalRef: u.ref
  };
}
const ml = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function ht(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, a = ce(e, ml), l = i ? {} : fl(r, o), {
    props: c,
    internalRef: u
  } = hl(w({}, a, {
    externalSlotProps: l
  })), p = Ae(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Xt(n, w({}, c, {
    ref: p
  }), o);
}
const Hi = "base";
function gl(e) {
  return `${Hi}--${e}`;
}
function bl(e, t) {
  return `${Hi}-${e}-${t}`;
}
function Wi(e, t) {
  const n = Vi[t];
  return n ? gl(n) : bl(e, t);
}
function vl(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Wi(e, r);
  }), n;
}
const yl = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function El(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function xl(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Tl(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || xl(e));
}
function wl(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(yl)).forEach((r, o) => {
    const i = El(r);
    i === -1 || !Tl(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Ol() {
  return !0;
}
function Sn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = wl,
    isEnabled: a = Ol,
    open: l
  } = e, c = x.useRef(!1), u = x.useRef(null), p = x.useRef(null), f = x.useRef(null), d = x.useRef(null), b = x.useRef(!1), v = x.useRef(null), m = Ae(t.ref, v), h = x.useRef(null);
  x.useEffect(() => {
    !l || !v.current || (b.current = !n);
  }, [n, l]), x.useEffect(() => {
    if (!l || !v.current)
      return;
    const E = be(v.current);
    return v.current.contains(E.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), b.current && v.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), x.useEffect(() => {
    if (!l || !v.current)
      return;
    const E = be(v.current), y = (k) => {
      h.current = k, !(r || !a() || k.key !== "Tab") && E.activeElement === v.current && k.shiftKey && (c.current = !0, p.current && p.current.focus());
    }, g = () => {
      const k = v.current;
      if (k === null)
        return;
      if (!E.hasFocus() || !a() || c.current) {
        c.current = !1;
        return;
      }
      if (k.contains(E.activeElement) || r && E.activeElement !== u.current && E.activeElement !== p.current)
        return;
      if (E.activeElement !== d.current)
        d.current = null;
      else if (d.current !== null)
        return;
      if (!b.current)
        return;
      let B = [];
      if ((E.activeElement === u.current || E.activeElement === p.current) && (B = i(v.current)), B.length > 0) {
        var A, P;
        const L = !!((A = h.current) != null && A.shiftKey && ((P = h.current) == null ? void 0 : P.key) === "Tab"), z = B[0], G = B[B.length - 1];
        typeof z != "string" && typeof G != "string" && (L ? G.focus() : z.focus());
      } else
        k.focus();
    };
    E.addEventListener("focusin", g), E.addEventListener("keydown", y, !0);
    const S = setInterval(() => {
      E.activeElement && E.activeElement.tagName === "BODY" && g();
    }, 50);
    return () => {
      clearInterval(S), E.removeEventListener("focusin", g), E.removeEventListener("keydown", y, !0);
    };
  }, [n, r, o, a, l, i]);
  const T = (E) => {
    f.current === null && (f.current = E.relatedTarget), b.current = !0, d.current = E.target;
    const y = t.props.onFocus;
    y && y(E);
  }, N = (E) => {
    f.current === null && (f.current = E.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ Oe(x.Fragment, {
    children: [/* @__PURE__ */ C("div", {
      tabIndex: l ? 0 : -1,
      onFocus: N,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ x.cloneElement(t, {
      ref: m,
      onFocus: T
    }), /* @__PURE__ */ C("div", {
      tabIndex: l ? 0 : -1,
      onFocus: N,
      ref: p,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Sn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: sn,
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
process.env.NODE_ENV !== "production" && (Sn["propTypes"] = Ci(Sn.propTypes));
var Te = "top", De = "bottom", je = "right", we = "left", _r = "auto", an = [Te, De, je, we], _t = "start", tn = "end", Pl = "clippingParents", qi = "viewport", Ht = "popper", kl = "reference", jo = /* @__PURE__ */ an.reduce(function(e, t) {
  return e.concat([t + "-" + _t, t + "-" + tn]);
}, []), Gi = /* @__PURE__ */ [].concat(an, [_r]).reduce(function(e, t) {
  return e.concat([t, t + "-" + _t, t + "-" + tn]);
}, []), Sl = "beforeRead", Cl = "read", Rl = "afterRead", Nl = "beforeMain", $l = "main", _l = "afterMain", Ml = "beforeWrite", Il = "write", Al = "afterWrite", Dl = [Sl, Cl, Rl, Nl, $l, _l, Ml, Il, Al];
function Ue(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function $e(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function mt(e) {
  var t = $e(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ie(e) {
  var t = $e(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Mr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = $e(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function jl(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ie(i) || !Ue(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? i.removeAttribute(a) : i.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function Bl(e) {
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
      !Ie(o) || !Ue(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Ll = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: jl,
  effect: Bl,
  requires: ["computeStyles"]
};
function ze(e) {
  return e.split("-")[0];
}
var dt = Math.max, Cn = Math.min, Mt = Math.round;
function wr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ki() {
  return !/^((?!chrome|android).)*safari/i.test(wr());
}
function It(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ie(e) && (o = e.offsetWidth > 0 && Mt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Mt(r.height) / e.offsetHeight || 1);
  var a = mt(e) ? $e(e) : window, l = a.visualViewport, c = !Ki() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, d = r.height / i;
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
function Ir(e) {
  var t = It(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Xi(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Mr(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Xe(e) {
  return $e(e).getComputedStyle(e);
}
function Vl(e) {
  return ["table", "td", "th"].indexOf(Ue(e)) >= 0;
}
function ot(e) {
  return ((mt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Bn(e) {
  return Ue(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Mr(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ot(e)
  );
}
function Bo(e) {
  return !Ie(e) || // https://github.com/popperjs/popper-core/issues/837
  Xe(e).position === "fixed" ? null : e.offsetParent;
}
function Fl(e) {
  var t = /firefox/i.test(wr()), n = /Trident/i.test(wr());
  if (n && Ie(e)) {
    var r = Xe(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Bn(e);
  for (Mr(o) && (o = o.host); Ie(o) && ["html", "body"].indexOf(Ue(o)) < 0; ) {
    var i = Xe(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function ln(e) {
  for (var t = $e(e), n = Bo(e); n && Vl(n) && Xe(n).position === "static"; )
    n = Bo(n);
  return n && (Ue(n) === "html" || Ue(n) === "body" && Xe(n).position === "static") ? t : n || Fl(e) || t;
}
function Ar(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Jt(e, t, n) {
  return dt(e, Cn(t, n));
}
function zl(e, t, n) {
  var r = Jt(e, t, n);
  return r > n ? n : r;
}
function Yi() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ji(e) {
  return Object.assign({}, Yi(), e);
}
function Zi(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Ul = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Ji(typeof t != "number" ? t : Zi(t, an));
};
function Hl(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, l = ze(n.placement), c = Ar(l), u = [we, je].indexOf(l) >= 0, p = u ? "height" : "width";
  if (!(!i || !a)) {
    var f = Ul(o.padding, n), d = Ir(i), b = c === "y" ? Te : we, v = c === "y" ? De : je, m = n.rects.reference[p] + n.rects.reference[c] - a[c] - n.rects.popper[p], h = a[c] - n.rects.reference[c], T = ln(i), N = T ? c === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, E = m / 2 - h / 2, y = f[b], g = N - d[p] - f[v], S = N / 2 - d[p] / 2 + E, k = Jt(y, S, g), B = c;
    n.modifiersData[r] = (t = {}, t[B] = k, t.centerOffset = k - S, t);
  }
}
function Wl(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Xi(t.elements.popper, o) && (t.elements.arrow = o));
}
const ql = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Hl,
  effect: Wl,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function At(e) {
  return e.split("-")[1];
}
var Gl = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Kl(e, t) {
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
  var T = a.hasOwnProperty("x"), N = a.hasOwnProperty("y"), E = we, y = Te, g = window;
  if (u) {
    var S = ln(n), k = "clientHeight", B = "clientWidth";
    if (S === $e(n) && (S = ot(n), Xe(S).position !== "static" && l === "absolute" && (k = "scrollHeight", B = "scrollWidth")), S = S, o === Te || (o === we || o === je) && i === tn) {
      y = De;
      var A = f && S === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        S[k]
      );
      m -= A - r.height, m *= c ? 1 : -1;
    }
    if (o === we || (o === Te || o === De) && i === tn) {
      E = je;
      var P = f && S === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        S[B]
      );
      b -= P - r.width, b *= c ? 1 : -1;
    }
  }
  var L = Object.assign({
    position: l
  }, u && Gl), z = p === !0 ? Kl({
    x: b,
    y: m
  }, $e(n)) : {
    x: b,
    y: m
  };
  if (b = z.x, m = z.y, c) {
    var G;
    return Object.assign({}, L, (G = {}, G[y] = N ? "0" : "", G[E] = T ? "0" : "", G.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + m + "px)" : "translate3d(" + b + "px, " + m + "px, 0)", G));
  }
  return Object.assign({}, L, (t = {}, t[y] = N ? m + "px" : "", t[E] = T ? b + "px" : "", t.transform = "", t));
}
function Xl(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, a = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: ze(t.placement),
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
const Yl = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Xl,
  data: {}
};
var bn = {
  passive: !0
};
function Jl(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, a = r.resize, l = a === void 0 ? !0 : a, c = $e(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(p) {
    p.addEventListener("scroll", n.update, bn);
  }), l && c.addEventListener("resize", n.update, bn), function() {
    i && u.forEach(function(p) {
      p.removeEventListener("scroll", n.update, bn);
    }), l && c.removeEventListener("resize", n.update, bn);
  };
}
const Zl = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Jl,
  data: {}
};
var Ql = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function En(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Ql[t];
  });
}
var ec = {
  start: "end",
  end: "start"
};
function Vo(e) {
  return e.replace(/start|end/g, function(t) {
    return ec[t];
  });
}
function Dr(e) {
  var t = $e(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function jr(e) {
  return It(ot(e)).left + Dr(e).scrollLeft;
}
function tc(e, t) {
  var n = $e(e), r = ot(e), o = n.visualViewport, i = r.clientWidth, a = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, a = o.height;
    var u = Ki();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: l + jr(e),
    y: c
  };
}
function nc(e) {
  var t, n = ot(e), r = Dr(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = dt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = dt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + jr(e), c = -r.scrollTop;
  return Xe(o || n).direction === "rtl" && (l += dt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function Br(e) {
  var t = Xe(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Qi(e) {
  return ["html", "body", "#document"].indexOf(Ue(e)) >= 0 ? e.ownerDocument.body : Ie(e) && Br(e) ? e : Qi(Bn(e));
}
function Zt(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Qi(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = $e(r), a = o ? [i].concat(i.visualViewport || [], Br(r) ? r : []) : r, l = t.concat(a);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Zt(Bn(a)))
  );
}
function Or(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function rc(e, t) {
  var n = It(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Fo(e, t, n) {
  return t === qi ? Or(tc(e, n)) : mt(t) ? rc(t, n) : Or(nc(ot(e)));
}
function oc(e) {
  var t = Zt(Bn(e)), n = ["absolute", "fixed"].indexOf(Xe(e).position) >= 0, r = n && Ie(e) ? ln(e) : e;
  return mt(r) ? t.filter(function(o) {
    return mt(o) && Xi(o, r) && Ue(o) !== "body";
  }) : [];
}
function ic(e, t, n, r) {
  var o = t === "clippingParents" ? oc(e) : [].concat(t), i = [].concat(o, [n]), a = i[0], l = i.reduce(function(c, u) {
    var p = Fo(e, u, r);
    return c.top = dt(p.top, c.top), c.right = Cn(p.right, c.right), c.bottom = Cn(p.bottom, c.bottom), c.left = dt(p.left, c.left), c;
  }, Fo(e, a, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function es(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? ze(r) : null, i = r ? At(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Te:
      c = {
        x: a,
        y: t.y - n.height
      };
      break;
    case De:
      c = {
        x: a,
        y: t.y + t.height
      };
      break;
    case je:
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
  var u = o ? Ar(o) : null;
  if (u != null) {
    var p = u === "y" ? "height" : "width";
    switch (i) {
      case _t:
        c[u] = c[u] - (t[p] / 2 - n[p] / 2);
        break;
      case tn:
        c[u] = c[u] + (t[p] / 2 - n[p] / 2);
        break;
    }
  }
  return c;
}
function nn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, a = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? Pl : l, u = n.rootBoundary, p = u === void 0 ? qi : u, f = n.elementContext, d = f === void 0 ? Ht : f, b = n.altBoundary, v = b === void 0 ? !1 : b, m = n.padding, h = m === void 0 ? 0 : m, T = Ji(typeof h != "number" ? h : Zi(h, an)), N = d === Ht ? kl : Ht, E = e.rects.popper, y = e.elements[v ? N : d], g = ic(mt(y) ? y : y.contextElement || ot(e.elements.popper), c, p, a), S = It(e.elements.reference), k = es({
    reference: S,
    element: E,
    strategy: "absolute",
    placement: o
  }), B = Or(Object.assign({}, E, k)), A = d === Ht ? B : S, P = {
    top: g.top - A.top + T.top,
    bottom: A.bottom - g.bottom + T.bottom,
    left: g.left - A.left + T.left,
    right: A.right - g.right + T.right
  }, L = e.modifiersData.offset;
  if (d === Ht && L) {
    var z = L[o];
    Object.keys(P).forEach(function(G) {
      var j = [je, De].indexOf(G) >= 0 ? 1 : -1, I = [Te, De].indexOf(G) >= 0 ? "y" : "x";
      P[G] += z[I] * j;
    });
  }
  return P;
}
function sc(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? Gi : c, p = At(r), f = p ? l ? jo : jo.filter(function(v) {
    return At(v) === p;
  }) : an, d = f.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  d.length === 0 && (d = f);
  var b = d.reduce(function(v, m) {
    return v[m] = nn(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: a
    })[ze(m)], v;
  }, {});
  return Object.keys(b).sort(function(v, m) {
    return b[v] - b[m];
  });
}
function ac(e) {
  if (ze(e) === _r)
    return [];
  var t = En(e);
  return [Vo(e), t, Vo(t)];
}
function lc(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !0 : a, c = n.fallbackPlacements, u = n.padding, p = n.boundary, f = n.rootBoundary, d = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, m = n.allowedAutoPlacements, h = t.options.placement, T = ze(h), N = T === h, E = c || (N || !v ? [En(h)] : ac(h)), y = [h].concat(E).reduce(function(V, U) {
      return V.concat(ze(U) === _r ? sc(t, {
        placement: U,
        boundary: p,
        rootBoundary: f,
        padding: u,
        flipVariations: v,
        allowedAutoPlacements: m
      }) : U);
    }, []), g = t.rects.reference, S = t.rects.popper, k = /* @__PURE__ */ new Map(), B = !0, A = y[0], P = 0; P < y.length; P++) {
      var L = y[P], z = ze(L), G = At(L) === _t, j = [Te, De].indexOf(z) >= 0, I = j ? "width" : "height", $ = nn(t, {
        placement: L,
        boundary: p,
        rootBoundary: f,
        altBoundary: d,
        padding: u
      }), D = j ? G ? je : we : G ? De : Te;
      g[I] > S[I] && (D = En(D));
      var Q = En(D), Z = [];
      if (i && Z.push($[z] <= 0), l && Z.push($[D] <= 0, $[Q] <= 0), Z.every(function(V) {
        return V;
      })) {
        A = L, B = !1;
        break;
      }
      k.set(L, Z);
    }
    if (B)
      for (var O = v ? 3 : 1, M = function(U) {
        var W = y.find(function(q) {
          var H = k.get(q);
          if (H)
            return H.slice(0, U).every(function(X) {
              return X;
            });
        });
        if (W)
          return A = W, "break";
      }, F = O; F > 0; F--) {
        var K = M(F);
        if (K === "break")
          break;
      }
    t.placement !== A && (t.modifiersData[r]._skip = !0, t.placement = A, t.reset = !0);
  }
}
const cc = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: lc,
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
  return [Te, je, De, we].some(function(t) {
    return e[t] >= 0;
  });
}
function uc(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, a = nn(t, {
    elementContext: "reference"
  }), l = nn(t, {
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
const pc = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: uc
};
function dc(e, t, n) {
  var r = ze(e), o = [we, Te].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, a = i[0], l = i[1];
  return a = a || 0, l = (l || 0) * o, [we, je].indexOf(r) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function fc(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = Gi.reduce(function(p, f) {
    return p[f] = dc(f, t.rects, i), p;
  }, {}), l = a[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
const hc = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: fc
};
function mc(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = es({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const gc = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: mc,
  data: {}
};
function bc(e) {
  return e === "x" ? "y" : "x";
}
function vc(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !1 : a, c = n.boundary, u = n.rootBoundary, p = n.altBoundary, f = n.padding, d = n.tether, b = d === void 0 ? !0 : d, v = n.tetherOffset, m = v === void 0 ? 0 : v, h = nn(t, {
    boundary: c,
    rootBoundary: u,
    padding: f,
    altBoundary: p
  }), T = ze(t.placement), N = At(t.placement), E = !N, y = Ar(T), g = bc(y), S = t.modifiersData.popperOffsets, k = t.rects.reference, B = t.rects.popper, A = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, P = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), L = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, z = {
    x: 0,
    y: 0
  };
  if (S) {
    if (i) {
      var G, j = y === "y" ? Te : we, I = y === "y" ? De : je, $ = y === "y" ? "height" : "width", D = S[y], Q = D + h[j], Z = D - h[I], O = b ? -B[$] / 2 : 0, M = N === _t ? k[$] : B[$], F = N === _t ? -B[$] : -k[$], K = t.elements.arrow, V = b && K ? Ir(K) : {
        width: 0,
        height: 0
      }, U = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Yi(), W = U[j], q = U[I], H = Jt(0, k[$], V[$]), X = E ? k[$] / 2 - O - H - W - P.mainAxis : M - H - W - P.mainAxis, Y = E ? -k[$] / 2 + O + H + q + P.mainAxis : F + H + q + P.mainAxis, ne = t.elements.arrow && ln(t.elements.arrow), _ = ne ? y === "y" ? ne.clientTop || 0 : ne.clientLeft || 0 : 0, J = (G = L == null ? void 0 : L[y]) != null ? G : 0, R = D + X - J - _, re = D + Y - J, ge = Jt(b ? Cn(Q, R) : Q, D, b ? dt(Z, re) : Z);
      S[y] = ge, z[y] = ge - D;
    }
    if (l) {
      var ye, fe = y === "x" ? Te : we, st = y === "x" ? De : je, Ee = S[g], We = g === "y" ? "height" : "width", Pe = Ee + h[fe], qe = Ee - h[st], me = [Te, we].indexOf(T) !== -1, at = (ye = L == null ? void 0 : L[g]) != null ? ye : 0, Ve = me ? Pe : Ee - k[We] - B[We] - at + P.altAxis, Lt = me ? Ee + k[We] + B[We] - at - P.altAxis : qe, dn = b && me ? zl(Ve, Ee, Lt) : Jt(b ? Ve : Pe, Ee, b ? Lt : qe);
      S[g] = dn, z[g] = dn - Ee;
    }
    t.modifiersData[r] = z;
  }
}
const yc = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: vc,
  requiresIfExists: ["offset"]
};
function Ec(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function xc(e) {
  return e === $e(e) || !Ie(e) ? Dr(e) : Ec(e);
}
function Tc(e) {
  var t = e.getBoundingClientRect(), n = Mt(t.width) / e.offsetWidth || 1, r = Mt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function wc(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ie(t), o = Ie(t) && Tc(t), i = ot(t), a = It(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Ue(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Br(i)) && (l = xc(t)), Ie(t) ? (c = It(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = jr(i))), {
    x: a.left + l.scrollLeft - c.x,
    y: a.top + l.scrollTop - c.y,
    width: a.width,
    height: a.height
  };
}
function Oc(e) {
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
function Pc(e) {
  var t = Oc(e);
  return Dl.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function kc(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Sc(e) {
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
function Cc(e) {
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
      setOptions: function(T) {
        var N = typeof T == "function" ? T(p.options) : T;
        m(), p.options = Object.assign({}, i, p.options, N), p.scrollParents = {
          reference: mt(l) ? Zt(l) : l.contextElement ? Zt(l.contextElement) : [],
          popper: Zt(c)
        };
        var E = Pc(Sc([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = E.filter(function(y) {
          return y.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!d) {
          var T = p.elements, N = T.reference, E = T.popper;
          if (Wo(N, E)) {
            p.rects = {
              reference: wc(N, ln(E), p.options.strategy === "fixed"),
              popper: Ir(E)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(P) {
              return p.modifiersData[P.name] = Object.assign({}, P.data);
            });
            for (var y = 0; y < p.orderedModifiers.length; y++) {
              if (p.reset === !0) {
                p.reset = !1, y = -1;
                continue;
              }
              var g = p.orderedModifiers[y], S = g.fn, k = g.options, B = k === void 0 ? {} : k, A = g.name;
              typeof S == "function" && (p = S({
                state: p,
                options: B,
                name: A,
                instance: b
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: kc(function() {
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
        var T = h.name, N = h.options, E = N === void 0 ? {} : N, y = h.effect;
        if (typeof y == "function") {
          var g = y({
            state: p,
            name: T,
            instance: b,
            options: E
          }), S = function() {
          };
          f.push(g || S);
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
var Rc = [Zl, gc, Yl, Ll, hc, cc, yc, ql, pc], Nc = /* @__PURE__ */ Cc({
  defaultModifiers: Rc
});
function $c(e) {
  return typeof e == "function" ? e() : e;
}
const rn = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [a, l] = x.useState(null), c = Ae(/* @__PURE__ */ x.isValidElement(r) ? r.ref : null, n);
  if (ft(() => {
    i || l($c(o) || document.body);
  }, [o, i]), ft(() => {
    if (a && !i)
      return Pn(n, a), () => {
        Pn(n, null);
      };
  }, [n, a, i]), i) {
    if (/* @__PURE__ */ x.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ x.cloneElement(r, u);
    }
    return /* @__PURE__ */ C(x.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ C(x.Fragment, {
    children: a && /* @__PURE__ */ ga.createPortal(r, a)
  });
});
process.env.NODE_ENV !== "production" && (rn.propTypes = {
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
  container: s.oneOfType([Ke, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (rn["propTypes"] = Ci(rn.propTypes));
const ts = "Popper";
function _c(e) {
  return Wi(ts, e);
}
vl(ts, ["root"]);
const Mc = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Ic = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Ac(e, t) {
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
function Rn(e) {
  return typeof e == "function" ? e() : e;
}
function Ln(e) {
  return e.nodeType !== void 0;
}
function Dc(e) {
  return !Ln(e);
}
const jc = () => Je({
  root: ["root"]
}, dl(_c)), Bc = {}, Lc = /* @__PURE__ */ x.forwardRef(function(t, n) {
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
  } = t, h = ce(t, Mc), T = x.useRef(null), N = Ae(T, n), E = x.useRef(null), y = Ae(E, d), g = x.useRef(y);
  ft(() => {
    g.current = y;
  }, [y]), x.useImperativeHandle(d, () => E.current, []);
  const S = Ac(p, a), [k, B] = x.useState(S), [A, P] = x.useState(Rn(o));
  x.useEffect(() => {
    E.current && E.current.forceUpdate();
  }), x.useEffect(() => {
    o && P(Rn(o));
  }, [o]), ft(() => {
    if (!A || !u)
      return;
    const I = (Q) => {
      B(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && A && Ln(A) && A.nodeType === 1) {
      const Q = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Q.top === 0 && Q.left === 0 && Q.right === 0 && Q.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let $ = [{
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
    c != null && ($ = $.concat(c)), f && f.modifiers != null && ($ = $.concat(f.modifiers));
    const D = Nc(A, T.current, w({
      placement: S
    }, f, {
      modifiers: $
    }));
    return g.current(D), () => {
      D.destroy(), g.current(null);
    };
  }, [A, l, c, u, f, S]);
  const L = {
    placement: k
  };
  m !== null && (L.TransitionProps = m);
  const z = jc(), G = (r = v.root) != null ? r : "div", j = ht({
    elementType: G,
    externalSlotProps: b.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: N
    },
    ownerState: t,
    className: z.root
  });
  return /* @__PURE__ */ C(G, w({}, j, {
    children: typeof i == "function" ? i(L) : i
  }));
}), ns = /* @__PURE__ */ x.forwardRef(function(t, n) {
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
    popperOptions: d = Bc,
    popperRef: b,
    style: v,
    transition: m = !1,
    slotProps: h = {},
    slots: T = {}
  } = t, N = ce(t, Ic), [E, y] = x.useState(!0), g = () => {
    y(!1);
  }, S = () => {
    y(!0);
  };
  if (!c && !p && (!m || E))
    return null;
  let k;
  if (i)
    k = i;
  else if (r) {
    const P = Rn(r);
    k = P && Ln(P) ? be(P).body : be(null).body;
  }
  const B = !p && c && (!m || E) ? "none" : void 0, A = m ? {
    in: p,
    onEnter: g,
    onExited: S
  } : void 0;
  return /* @__PURE__ */ C(rn, {
    disablePortal: l,
    container: k,
    children: /* @__PURE__ */ C(Lc, w({
      anchorEl: r,
      direction: a,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: m ? !E : p,
      placement: f,
      popperOptions: d,
      popperRef: b,
      slotProps: h,
      slots: T
    }, N, {
      style: w({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: B
      }, v),
      TransitionProps: A,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (ns.propTypes = {
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
  anchorEl: jt(s.oneOfType([Ke, s.object, s.func]), (e) => {
    if (e.open) {
      const t = Rn(e.anchorEl);
      if (t && Ln(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Dc(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: s.oneOfType([Ke, s.func]),
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
  popperRef: $r,
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
function Vc(e) {
  const t = be(e);
  return t.body === e ? $t(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Qt(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function qo(e) {
  return parseInt($t(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Fc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Go(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (a) => {
    const l = i.indexOf(a) === -1, c = !Fc(a);
    l && c && Qt(a, o);
  });
}
function ar(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function zc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Vc(r)) {
      const a = Ii(be(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${qo(r) + a}px`;
      const l = be(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${qo(c) + a}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = be(r).body;
    else {
      const a = r.parentElement, l = $t(r);
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
function Uc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Hc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && Qt(t.modalRef, !1);
    const o = Uc(n);
    Go(n, t.mount, t.modalRef, o, !0);
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
    o.restore || (o.restore = zc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = ar(this.containers, (a) => a.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && Qt(t.modalRef, n), Go(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && Qt(a.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Wc(e) {
  return typeof e == "function" ? e() : e;
}
function qc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Gc = new Hc();
function Kc(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Gc,
    closeAfterTransition: i = !1,
    onTransitionEnter: a,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: p,
    rootRef: f
  } = e, d = x.useRef({}), b = x.useRef(null), v = x.useRef(null), m = Ae(v, f), [h, T] = x.useState(!p), N = qc(c);
  let E = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (E = !1);
  const y = () => be(b.current), g = () => (d.current.modalRef = v.current, d.current.mount = b.current, d.current), S = () => {
    o.mount(g(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, k = kn(() => {
    const $ = Wc(t) || y().body;
    o.add(g(), $), v.current && S();
  }), B = x.useCallback(() => o.isTopModal(g()), [o]), A = kn(($) => {
    b.current = $, $ && (p && B() ? S() : v.current && Qt(v.current, E));
  }), P = x.useCallback(() => {
    o.remove(g(), E);
  }, [E, o]);
  x.useEffect(() => () => {
    P();
  }, [P]), x.useEffect(() => {
    p ? k() : (!N || !i) && P();
  }, [p, P, N, i, k]);
  const L = ($) => (D) => {
    var Q;
    (Q = $.onKeyDown) == null || Q.call($, D), !(D.key !== "Escape" || D.which === 229 || // Wait until IME is settled.
    !B()) && (n || (D.stopPropagation(), u && u(D, "escapeKeyDown")));
  }, z = ($) => (D) => {
    var Q;
    (Q = $.onClick) == null || Q.call($, D), D.target === D.currentTarget && u && u(D, "backdropClick");
  };
  return {
    getRootProps: ($ = {}) => {
      const D = zi(e);
      delete D.onTransitionEnter, delete D.onTransitionExited;
      const Q = w({}, D, $);
      return w({
        role: "presentation"
      }, Q, {
        onKeyDown: L(Q),
        ref: m
      });
    },
    getBackdropProps: ($ = {}) => {
      const D = $;
      return w({
        "aria-hidden": !0
      }, D, {
        onClick: z(D),
        open: p
      });
    },
    getTransitionProps: () => {
      const $ = () => {
        T(!1), a && a();
      }, D = () => {
        T(!0), l && l(), i && P();
      };
      return {
        onEnter: Er($, c == null ? void 0 : c.props.onEnter),
        onExited: Er(D, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: m,
    portalRef: A,
    isTopModal: B,
    exited: h,
    hasTransition: N
  };
}
const Xc = ["values", "unit", "step"], Yc = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => w({}, n, {
    [r.key]: r.val
  }), {});
};
function Jc(e) {
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
  } = e, o = ce(e, Xc), i = Yc(t), a = Object.keys(i);
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
const Zc = {
  borderRadius: 4
}, Qc = Zc, eu = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, it = eu;
function en(e, t) {
  return t ? Le(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Lr = {
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
}, Ko = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Lr[e]}px)`
};
function Ye(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Ko;
    return t.reduce((a, l, c) => (a[i.up(i.keys[c])] = n(t[c]), a), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Ko;
    return Object.keys(t).reduce((a, l) => {
      if (Object.keys(i.values || Lr).indexOf(l) !== -1) {
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
function tu(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function nu(e, t) {
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
function Nn(e, t, n, r = n) {
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
    return Ye(a, l, (f) => {
      let d = Nn(u, o, f);
      return f === d && typeof f == "string" && (d = Nn(u, o, `${t}${f === "default" ? "" : Ne(f)}`, f)), n === !1 ? d : {
        [n]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: it
  } : {}, i.filterProps = [t], i;
}
function ru(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const ou = {
  m: "margin",
  p: "padding"
}, iu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Xo = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, su = ru((e) => {
  if (e.length > 2)
    if (Xo[e])
      e = Xo[e];
    else
      return [e];
  const [t, n] = e.split(""), r = ou[t], o = iu[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Fn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], zn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], au = [...Fn, ...zn];
function cn(e, t, n, r) {
  var o;
  const i = (o = Vn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function rs(e) {
  return cn(e, "spacing", 8, "spacing");
}
function un(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function lu(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = un(t, n), r), {});
}
function cu(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = su(n), i = lu(o, r), a = e[n];
  return Ye(e, a, i);
}
function os(e, t) {
  const n = rs(e.theme);
  return Object.keys(e).map((r) => cu(e, t, r, n)).reduce(en, {});
}
function pe(e) {
  return os(e, Fn);
}
pe.propTypes = process.env.NODE_ENV !== "production" ? Fn.reduce((e, t) => (e[t] = it, e), {}) : {};
pe.filterProps = Fn;
function de(e) {
  return os(e, zn);
}
de.propTypes = process.env.NODE_ENV !== "production" ? zn.reduce((e, t) => (e[t] = it, e), {}) : {};
de.filterProps = zn;
process.env.NODE_ENV !== "production" && au.reduce((e, t) => (e[t] = it, e), {});
function uu(e = 8) {
  if (e.mui)
    return e;
  const t = rs({
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
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? en(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Me(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Be(e, t) {
  return he({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const pu = Be("border", Me), du = Be("borderTop", Me), fu = Be("borderRight", Me), hu = Be("borderBottom", Me), mu = Be("borderLeft", Me), gu = Be("borderColor"), bu = Be("borderTopColor"), vu = Be("borderRightColor"), yu = Be("borderBottomColor"), Eu = Be("borderLeftColor"), xu = Be("outline", Me), Tu = Be("outlineColor"), Hn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = cn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: un(t, r)
    });
    return Ye(e, e.borderRadius, n);
  }
  return null;
};
Hn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: it
} : {};
Hn.filterProps = ["borderRadius"];
Un(pu, du, fu, hu, mu, gu, bu, vu, yu, Eu, Hn, xu, Tu);
const Wn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = cn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: un(t, r)
    });
    return Ye(e, e.gap, n);
  }
  return null;
};
Wn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: it
} : {};
Wn.filterProps = ["gap"];
const qn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = cn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: un(t, r)
    });
    return Ye(e, e.columnGap, n);
  }
  return null;
};
qn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: it
} : {};
qn.filterProps = ["columnGap"];
const Gn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = cn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: un(t, r)
    });
    return Ye(e, e.rowGap, n);
  }
  return null;
};
Gn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: it
} : {};
Gn.filterProps = ["rowGap"];
const wu = he({
  prop: "gridColumn"
}), Ou = he({
  prop: "gridRow"
}), Pu = he({
  prop: "gridAutoFlow"
}), ku = he({
  prop: "gridAutoColumns"
}), Su = he({
  prop: "gridAutoRows"
}), Cu = he({
  prop: "gridTemplateColumns"
}), Ru = he({
  prop: "gridTemplateRows"
}), Nu = he({
  prop: "gridTemplateAreas"
}), $u = he({
  prop: "gridArea"
});
Un(Wn, qn, Gn, wu, Ou, Pu, ku, Su, Cu, Ru, Nu, $u);
function Rt(e, t) {
  return t === "grey" ? t : e;
}
const _u = he({
  prop: "color",
  themeKey: "palette",
  transform: Rt
}), Mu = he({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Rt
}), Iu = he({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Rt
});
Un(_u, Mu, Iu);
function Ce(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Au = he({
  prop: "width",
  transform: Ce
}), Vr = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Lr[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Ce(n)
      };
    };
    return Ye(e, e.maxWidth, t);
  }
  return null;
};
Vr.filterProps = ["maxWidth"];
const Du = he({
  prop: "minWidth",
  transform: Ce
}), ju = he({
  prop: "height",
  transform: Ce
}), Bu = he({
  prop: "maxHeight",
  transform: Ce
}), Lu = he({
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
const Vu = he({
  prop: "boxSizing"
});
Un(Au, Vr, Du, ju, Bu, Lu, Vu);
const Fu = {
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
    transform: Rt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Rt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Rt
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
    style: Vr
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
}, Fr = Fu;
function zu(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Uu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Hu() {
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
    return f ? f(a) : Ye(a, r, (v) => {
      let m = Nn(d, p, v);
      return v === m && typeof v == "string" && (m = Nn(d, p, `${n}${v === "default" ? "" : Ne(v)}`, v)), c === !1 ? m : {
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
    const a = (r = i.unstable_sxConfig) != null ? r : Fr;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const p = tu(i.breakpoints), f = Object.keys(p);
      let d = p;
      return Object.keys(u).forEach((b) => {
        const v = Uu(u[b], i);
        if (v != null)
          if (typeof v == "object")
            if (a[b])
              d = en(d, e(b, v, i, a));
            else {
              const m = Ye({
                theme: i
              }, v, (h) => ({
                [b]: h
              }));
              zu(m, v) ? d[b] = t({
                sx: v,
                theme: i
              }) : d = en(d, m);
            }
          else
            d = en(d, e(b, v, i, a));
      }), nu(f, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const is = Hu();
is.filterProps = ["sx"];
const zr = is, Wu = ["breakpoints", "palette", "spacing", "shape"];
function Ur(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, a = ce(e, Wu), l = Jc(n), c = uu(o);
  let u = Le({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: w({
      mode: "light"
    }, r),
    spacing: c,
    shape: w({}, Qc, i)
  }, a);
  return u = t.reduce((p, f) => Le(p, f), u), u.unstable_sxConfig = w({}, Fr, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(f) {
    return zr({
      sx: f,
      theme: this
    });
  }, u;
}
function qu(e) {
  return Object.keys(e).length === 0;
}
function ss(e = null) {
  const t = x.useContext(ha);
  return !t || qu(t) ? e : t;
}
const Gu = Ur();
function as(e = Gu) {
  return ss(e);
}
const Ku = ["variant"];
function Yo(e) {
  return e.length === 0;
}
function ls(e) {
  const {
    variant: t
  } = e, n = ce(e, Ku);
  let r = t || "";
  return Object.keys(n).sort().forEach((o) => {
    o === "color" ? r += Yo(r) ? e[o] : Ne(e[o]) : r += `${Yo(r) ? o : Ne(o)}${Ne(e[o].toString())}`;
  }), r;
}
const Xu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Yu(e) {
  return Object.keys(e).length === 0;
}
function Ju(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const Zu = (e, t) => t.components && t.components[e] && t.components[e].styleOverrides ? t.components[e].styleOverrides : null, $n = (e) => {
  let t = 0;
  const n = {};
  return e && e.forEach((r) => {
    let o = "";
    typeof r.props == "function" ? (o = `callback${t}`, t += 1) : o = ls(r.props), n[o] = r.style;
  }), n;
}, Qu = (e, t) => {
  let n = [];
  return t && t.components && t.components[e] && t.components[e].variants && (n = t.components[e].variants), $n(n);
}, _n = (e, t, n) => {
  const {
    ownerState: r = {}
  } = e, o = [];
  let i = 0;
  return n && n.forEach((a) => {
    let l = !0;
    if (typeof a.props == "function") {
      const c = w({}, e, r);
      l = a.props(c);
    } else
      Object.keys(a.props).forEach((c) => {
        r[c] !== a.props[c] && e[c] !== a.props[c] && (l = !1);
      });
    l && (typeof a.props == "function" ? o.push(t[`callback${i}`]) : o.push(t[ls(a.props)])), typeof a.props == "function" && (i += 1);
  }), o;
}, ep = (e, t, n, r) => {
  var o;
  const i = n == null || (o = n.components) == null || (o = o[r]) == null ? void 0 : o.variants;
  return _n(e, t, i);
};
function xn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const tp = Ur(), Jo = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Tn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Yu(t) ? e : t[n] || t;
}
function np(e) {
  return e ? (t, n) => n[e] : null;
}
const Zo = ({
  styledArg: e,
  props: t,
  defaultTheme: n,
  themeId: r
}) => {
  const o = e(w({}, t, {
    theme: Tn(w({}, t, {
      defaultTheme: n,
      themeId: r
    }))
  }));
  let i;
  if (o && o.variants && (i = o.variants, delete o.variants), i) {
    const a = _n(t, $n(i), i);
    return [o, ...a];
  }
  return o;
};
function rp(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = tp,
    rootShouldForwardProp: r = xn,
    slotShouldForwardProp: o = xn
  } = e, i = (a) => zr(w({}, a, {
    theme: Tn(w({}, a, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    ma(a, (y) => y.filter((g) => !(g != null && g.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: p,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = np(Jo(u))
    } = l, b = ce(l, Xu), v = p !== void 0 ? p : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), m = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Jo(u || "Root")}`);
    let T = xn;
    u === "Root" || u === "root" ? T = r : u ? T = o : Ju(a) && (T = void 0);
    const N = fa(a, w({
      shouldForwardProp: T,
      label: h
    }, b)), E = (y, ...g) => {
      const S = g ? g.map((P) => {
        if (typeof P == "function" && P.__emotion_real !== P)
          return (L) => Zo({
            styledArg: P,
            props: L,
            defaultTheme: n,
            themeId: t
          });
        if (tt(P)) {
          let L = P, z;
          return P && P.variants && (z = P.variants, delete L.variants, L = (G) => {
            let j = P;
            return _n(G, $n(z), z).forEach(($) => {
              j = Le(j, $);
            }), j;
          }), L;
        }
        return P;
      }) : [];
      let k = y;
      if (tt(y)) {
        let P;
        y && y.variants && (P = y.variants, delete k.variants, k = (L) => {
          let z = y;
          return _n(L, $n(P), P).forEach((j) => {
            z = Le(z, j);
          }), z;
        });
      } else
        typeof y == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        y.__emotion_real !== y && (k = (P) => Zo({
          styledArg: y,
          props: P,
          defaultTheme: n,
          themeId: t
        }));
      c && d && S.push((P) => {
        const L = Tn(w({}, P, {
          defaultTheme: n,
          themeId: t
        })), z = Zu(c, L);
        if (z) {
          const G = {};
          return Object.entries(z).forEach(([j, I]) => {
            G[j] = typeof I == "function" ? I(w({}, P, {
              theme: L
            })) : I;
          }), d(P, G);
        }
        return null;
      }), c && !v && S.push((P) => {
        const L = Tn(w({}, P, {
          defaultTheme: n,
          themeId: t
        }));
        return ep(P, Qu(c, L), L, c);
      }), m || S.push(i);
      const B = S.length - g.length;
      if (Array.isArray(y) && B > 0) {
        const P = new Array(B).fill("");
        k = [...y, ...P], k.raw = [...y.raw, ...P];
      }
      const A = N(k, ...S);
      if (process.env.NODE_ENV !== "production") {
        let P;
        c && (P = `${c}${Ne(u || "")}`), P === void 0 && (P = `Styled(${Ha(a)})`), A.displayName = P;
      }
      return a.muiName && (A.muiName = a.muiName), A;
    };
    return N.withConfig && (E.withConfig = N.withConfig), E;
  };
}
function op(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Bi(t.components[n].defaultProps, r);
}
function ip({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = as(n);
  return r && (o = o[r] || o), op({
    theme: o,
    name: t,
    props: e
  });
}
function Hr(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), cl(e, t, n);
}
function sp(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function gt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return gt(sp(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Nt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Nt(10, o));
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
function ap(e) {
  e = gt(e);
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
function Qo(e) {
  e = gt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? gt(ap(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function ei(e, t) {
  const n = Qo(e), r = Qo(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Mn(e, t) {
  return e = gt(e), t = Hr(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Kn(e);
}
function lp(e, t) {
  if (e = gt(e), t = Hr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Kn(e);
}
function cp(e, t) {
  if (e = gt(e), t = Hr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Kn(e);
}
function up(e, t) {
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
const pp = {
  black: "#000",
  white: "#fff"
}, on = pp, dp = {
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
}, fp = dp, hp = {
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
}, yt = hp, mp = {
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
}, Et = mp, gp = {
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
}, Wt = gp, bp = {
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
}, xt = bp, vp = {
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
}, Tt = vp, yp = {
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
}, wt = yp, Ep = ["mode", "contrastThreshold", "tonalOffset"], ti = {
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
function ni(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = cp(e.main, o) : t === "dark" && (e.dark = lp(e.main, i)));
}
function xp(e = "light") {
  return e === "dark" ? {
    main: xt[200],
    light: xt[50],
    dark: xt[400]
  } : {
    main: xt[700],
    light: xt[400],
    dark: xt[800]
  };
}
function Tp(e = "light") {
  return e === "dark" ? {
    main: yt[200],
    light: yt[50],
    dark: yt[400]
  } : {
    main: yt[500],
    light: yt[300],
    dark: yt[700]
  };
}
function wp(e = "light") {
  return e === "dark" ? {
    main: Et[500],
    light: Et[300],
    dark: Et[700]
  } : {
    main: Et[700],
    light: Et[400],
    dark: Et[800]
  };
}
function Op(e = "light") {
  return e === "dark" ? {
    main: Tt[400],
    light: Tt[300],
    dark: Tt[700]
  } : {
    main: Tt[700],
    light: Tt[500],
    dark: Tt[900]
  };
}
function Pp(e = "light") {
  return e === "dark" ? {
    main: wt[400],
    light: wt[300],
    dark: wt[700]
  } : {
    main: wt[800],
    light: wt[500],
    dark: wt[900]
  };
}
function kp(e = "light") {
  return e === "dark" ? {
    main: Wt[400],
    light: Wt[300],
    dark: Wt[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Wt[500],
    dark: Wt[900]
  };
}
function Sp(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ce(e, Ep), i = e.primary || xp(t), a = e.secondary || Tp(t), l = e.error || wp(t), c = e.info || Op(t), u = e.success || Pp(t), p = e.warning || kp(t);
  function f(m) {
    const h = ei(m, lr.text.primary) >= n ? lr.text.primary : ti.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const T = ei(m, h);
      T < 3 && console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const d = ({
    color: m,
    name: h,
    mainShade: T = 500,
    lightShade: N = 300,
    darkShade: E = 700
  }) => {
    if (m = w({}, m), !m.main && m[T] && (m.main = m[T]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.` : Nt(11, h ? ` (${h})` : "", T));
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
} });` : Nt(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return ni(m, "light", N, r), ni(m, "dark", E, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, b = {
    dark: lr,
    light: ti
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Le(w({
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
    grey: fp,
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
const Cp = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Rp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ri = {
  textTransform: "uppercase"
}, oi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Np(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = oi,
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
  } = n, d = ce(n, Cp);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = f || ((T) => `${T / u * b}rem`), m = (T, N, E, y, g) => w({
    fontFamily: r,
    fontWeight: T,
    fontSize: v(N),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: E
  }, r === oi ? {
    letterSpacing: `${Rp(y / N)}em`
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
    button: m(l, 14, 1.75, 0.4, ri),
    caption: m(a, 12, 1.66, 0.4),
    overline: m(a, 12, 2.66, 1, ri),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Le(w({
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
const $p = 0.2, _p = 0.14, Mp = 0.12;
function ue(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${$p})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${_p})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Mp})`].join(",");
}
const Ip = ["none", ue(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ue(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ue(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ue(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ue(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ue(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ue(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ue(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ue(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ue(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ue(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ue(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ue(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ue(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ue(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ue(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ue(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ue(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ue(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ue(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ue(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ue(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ue(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ue(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ap = Ip, Dp = ["duration", "easing", "delay"], jp = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Bp = {
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
function ii(e) {
  return `${Math.round(e)}ms`;
}
function Lp(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Vp(e) {
  const t = w({}, jp, e.easing), n = w({}, Bp, e.duration);
  return w({
    getAutoHeightDuration: Lp,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = ce(i, Dp);
      if (process.env.NODE_ENV !== "production") {
        const p = (d) => typeof d == "string", f = (d) => !isNaN(parseFloat(d));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(a) && !p(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), p(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !p(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof a == "string" ? a : ii(a)} ${l} ${typeof c == "string" ? c : ii(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Fp = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, zp = Fp, Up = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Hp(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = ce(e, Up);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Nt(18));
  const l = Sp(r), c = Ur(e);
  let u = Le(c, {
    mixins: up(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ap.slice(),
    typography: Np(l, i),
    transitions: Vp(o),
    zIndex: w({}, zp),
    applyDarkStyles(p) {
      return this.vars ? {
        [this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/, ":where($1)")]: p
      } : this.palette.mode === "dark" ? p : {};
    }
  });
  if (u = Le(u, a), u = t.reduce((p, f) => Le(p, f), u), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (d, b) => {
      let v;
      for (v in d) {
        const m = d[v];
        if (p.indexOf(v) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = He("", v);
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
  return u.unstable_sxConfig = w({}, Fr, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(f) {
    return zr({
      sx: f,
      theme: this
    });
  }, u;
}
const Wp = Hp(), Wr = Wp, qr = "$$material", cs = (e) => xn(e) && e !== "classes", qp = rp({
  themeId: qr,
  defaultTheme: Wr,
  rootShouldForwardProp: cs
}), ve = qp;
function pn() {
  const e = as(Wr);
  return process.env.NODE_ENV !== "production" && x.useDebugValue(e), e[qr] || e;
}
function Ze({
  props: e,
  name: t
}) {
  return ip({
    props: e,
    name: t,
    defaultTheme: Wr,
    themeId: qr
  });
}
function Pr(e, t) {
  return Pr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Pr(e, t);
}
function Gp(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Pr(e, t);
}
const si = {
  disabled: !1
};
var Kp = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const us = Ct.createContext(null);
var Xp = function(t) {
  return t.scrollTop;
}, Yt = "unmounted", lt = "exited", ct = "entering", kt = "entered", kr = "exiting", Qe = /* @__PURE__ */ function(e) {
  Gp(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var a = o, l = a && !a.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = lt, i.appearStatus = ct) : c = kt : r.unmountOnExit || r.mountOnEnter ? c = Yt : c = lt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === Yt ? {
      status: lt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== ct && a !== kt && (i = ct) : (a === ct || a === kt) && (i = kr);
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
      if (this.cancelNextCallback(), i === ct) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : mn.findDOMNode(this);
          a && Xp(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === lt && this.setState({
        status: Yt
      });
  }, n.performEnter = function(o) {
    var i = this, a = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [mn.findDOMNode(this), l], u = c[0], p = c[1], f = this.getTimeouts(), d = l ? f.appear : f.enter;
    if (!o && !a || si.disabled) {
      this.safeSetState({
        status: kt
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, p), this.safeSetState({
      status: ct
    }, function() {
      i.props.onEntering(u, p), i.onTransitionEnd(d, function() {
        i.safeSetState({
          status: kt
        }, function() {
          i.props.onEntered(u, p);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts(), l = this.props.nodeRef ? void 0 : mn.findDOMNode(this);
    if (!i || si.disabled) {
      this.safeSetState({
        status: lt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: kr
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(a.exit, function() {
        o.safeSetState({
          status: lt
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
    var a = this.props.nodeRef ? this.props.nodeRef.current : mn.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === Yt)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = ce(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Ct.createElement(us.Provider, {
        value: null
      }, typeof a == "function" ? a(o, l) : Ct.cloneElement(Ct.Children.only(a), l))
    );
  }, t;
}(Ct.Component);
Qe.contextType = us;
Qe.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var n = Kp;
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
function Ot() {
}
Qe.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ot,
  onEntering: Ot,
  onEntered: Ot,
  onExit: Ot,
  onExiting: Ot,
  onExited: Ot
};
Qe.UNMOUNTED = Yt;
Qe.EXITED = lt;
Qe.ENTERING = ct;
Qe.ENTERED = kt;
Qe.EXITING = kr;
const ps = Qe, ds = (e) => e.scrollTop;
function In(e, t) {
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
const Yp = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Sr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Jp = {
  entering: {
    opacity: 1,
    transform: Sr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, cr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Gr = /* @__PURE__ */ x.forwardRef(function(t, n) {
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
    TransitionComponent: h = ps
  } = t, T = ce(t, Yp), N = x.useRef(), E = x.useRef(), y = pn(), g = x.useRef(null), S = Ae(g, i.ref, n), k = (I) => ($) => {
    if (I) {
      const D = g.current;
      $ === void 0 ? I(D) : I(D, $);
    }
  }, B = k(p), A = k((I, $) => {
    ds(I);
    const {
      duration: D,
      delay: Q,
      easing: Z
    } = In({
      style: v,
      timeout: m,
      easing: a
    }, {
      mode: "enter"
    });
    let O;
    m === "auto" ? (O = y.transitions.getAutoHeightDuration(I.clientHeight), E.current = O) : O = D, I.style.transition = [y.transitions.create("opacity", {
      duration: O,
      delay: Q
    }), y.transitions.create("transform", {
      duration: cr ? O : O * 0.666,
      delay: Q,
      easing: Z
    })].join(","), c && c(I, $);
  }), P = k(u), L = k(b), z = k((I) => {
    const {
      duration: $,
      delay: D,
      easing: Q
    } = In({
      style: v,
      timeout: m,
      easing: a
    }, {
      mode: "exit"
    });
    let Z;
    m === "auto" ? (Z = y.transitions.getAutoHeightDuration(I.clientHeight), E.current = Z) : Z = $, I.style.transition = [y.transitions.create("opacity", {
      duration: Z,
      delay: D
    }), y.transitions.create("transform", {
      duration: cr ? Z : Z * 0.666,
      delay: cr ? D : D || Z * 0.333,
      easing: Q
    })].join(","), I.style.opacity = 0, I.style.transform = Sr(0.75), f && f(I);
  }), G = k(d), j = (I) => {
    m === "auto" && (N.current = setTimeout(I, E.current || 0)), r && r(g.current, I);
  };
  return x.useEffect(() => () => {
    clearTimeout(N.current);
  }, []), /* @__PURE__ */ C(h, w({
    appear: o,
    in: l,
    nodeRef: g,
    onEnter: A,
    onEntered: P,
    onEntering: B,
    onExit: z,
    onExited: G,
    onExiting: L,
    addEndListener: j,
    timeout: m === "auto" ? null : m
  }, T, {
    children: (I, $) => /* @__PURE__ */ x.cloneElement(i, w({
      style: w({
        opacity: 0,
        transform: Sr(0.75),
        visibility: I === "exited" && !l ? "hidden" : void 0
      }, Jp[I], v, i.props.style),
      ref: S
    }, $))
  }));
});
process.env.NODE_ENV !== "production" && (Gr.propTypes = {
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
  children: sn.isRequired,
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
Gr.muiSupportAuto = !0;
const Cr = Gr, Zp = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ai = Zp, Qp = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], ed = ve(ns, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), fs = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r;
  const o = ss(), i = Ze({
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
    popperRef: T,
    transition: N,
    slots: E,
    slotProps: y
  } = i, g = ce(i, Qp), S = (r = E == null ? void 0 : E.root) != null ? r : c == null ? void 0 : c.Root, k = w({
    anchorEl: a,
    container: p,
    disablePortal: f,
    keepMounted: d,
    modifiers: b,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: T,
    transition: N
  }, g);
  return /* @__PURE__ */ C(ed, w({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: S
    },
    slotProps: y ?? u
  }, k, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (fs.propTypes = {
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
  anchorEl: s.oneOfType([Ke, s.object, s.func]),
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
  container: s.oneOfType([Ke, s.func]),
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
  popperRef: $r,
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
const hs = fs;
function td(e) {
  return He("MuiTooltip", e);
}
const nd = rt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), nt = nd, rd = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function od(e) {
  return Math.round(e * 1e5) / 1e5;
}
const id = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, a = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ne(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Je(a, td, t);
}, sd = ve(hs, {
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
  [`&[data-popper-placement*="bottom"] .${nt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${nt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${nt.arrow}`]: w({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${nt.arrow}`]: w({}, t.isRtl ? {
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
})), ad = ve("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Ne(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => w({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Mn(e.palette.grey[700], 0.92),
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
  lineHeight: `${od(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${nt.popper}[data-popper-placement*="left"] &`]: w({
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
  [`.${nt.popper}[data-popper-placement*="right"] &`]: w({
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
  [`.${nt.popper}[data-popper-placement*="top"] &`]: w({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${nt.popper}[data-popper-placement*="bottom"] &`]: w({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), ld = ve("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Mn(e.palette.grey[700], 0.9),
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
let vn = !1, ur = null, qt = {
  x: 0,
  y: 0
};
function yn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const ms = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i, a, l, c, u, p, f, d, b, v, m, h, T, N, E, y, g;
  const S = Ze({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: k = !1,
    children: B,
    components: A = {},
    componentsProps: P = {},
    describeChild: L = !1,
    disableFocusListener: z = !1,
    disableHoverListener: G = !1,
    disableInteractive: j = !1,
    disableTouchListener: I = !1,
    enterDelay: $ = 100,
    enterNextDelay: D = 0,
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
    TransitionComponent: _ = Cr,
    TransitionProps: J
  } = S, R = ce(S, rd), re = /* @__PURE__ */ x.isValidElement(B) ? B : /* @__PURE__ */ C("span", {
    children: B
  }), ge = pn(), ye = ge.direction === "rtl", [fe, st] = x.useState(), [Ee, We] = x.useState(null), Pe = x.useRef(!1), qe = j || Z, me = x.useRef(), at = x.useRef(), Ve = x.useRef(), Lt = x.useRef(), [dn, eo] = _i({
    controlled: U,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Ge = dn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = x.useRef(U !== void 0);
    x.useEffect(() => {
      fe && fe.disabled && !ee && ne !== "" && fe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ne, fe, ee]);
  }
  const Xn = $i(O), Vt = x.useRef(), fn = x.useCallback(() => {
    Vt.current !== void 0 && (document.body.style.WebkitUserSelect = Vt.current, Vt.current = void 0), clearTimeout(Lt.current);
  }, []);
  x.useEffect(() => () => {
    clearTimeout(me.current), clearTimeout(at.current), clearTimeout(Ve.current), fn();
  }, [fn]);
  const to = (ee) => {
    clearTimeout(ur), vn = !0, eo(!0), V && !Ge && V(ee);
  }, hn = kn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      clearTimeout(ur), ur = setTimeout(() => {
        vn = !1;
      }, 800 + M), eo(!1), K && Ge && K(ee), clearTimeout(me.current), me.current = setTimeout(() => {
        Pe.current = !1;
      }, ge.transitions.duration.shortest);
    }
  ), Yn = (ee) => {
    Pe.current && ee.type !== "touchstart" || (fe && fe.removeAttribute("title"), clearTimeout(at.current), clearTimeout(Ve.current), $ || vn && D ? at.current = setTimeout(() => {
      to(ee);
    }, vn ? D : $) : to(ee));
  }, no = (ee) => {
    clearTimeout(at.current), clearTimeout(Ve.current), Ve.current = setTimeout(() => {
      hn(ee);
    }, M);
  }, {
    isFocusVisibleRef: ro,
    onBlur: Ls,
    onFocus: Vs,
    ref: Fs
  } = Mi(), [, oo] = x.useState(!1), io = (ee) => {
    Ls(ee), ro.current === !1 && (oo(!1), no(ee));
  }, so = (ee) => {
    fe || st(ee.currentTarget), Vs(ee), ro.current === !0 && (oo(!0), Yn(ee));
  }, ao = (ee) => {
    Pe.current = !0;
    const ke = re.props;
    ke.onTouchStart && ke.onTouchStart(ee);
  }, lo = Yn, co = no, zs = (ee) => {
    ao(ee), clearTimeout(Ve.current), clearTimeout(me.current), fn(), Vt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Lt.current = setTimeout(() => {
      document.body.style.WebkitUserSelect = Vt.current, Yn(ee);
    }, Q);
  }, Us = (ee) => {
    re.props.onTouchEnd && re.props.onTouchEnd(ee), fn(), clearTimeout(Ve.current), Ve.current = setTimeout(() => {
      hn(ee);
    }, F);
  };
  x.useEffect(() => {
    if (!Ge)
      return;
    function ee(ke) {
      (ke.key === "Escape" || ke.key === "Esc") && hn(ke);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [hn, Ge]);
  const Hs = Ae(re.ref, Fs, st, n);
  !ne && ne !== 0 && (Ge = !1);
  const Jn = x.useRef(), Ws = (ee) => {
    const ke = re.props;
    ke.onMouseMove && ke.onMouseMove(ee), qt = {
      x: ee.clientX,
      y: ee.clientY
    }, Jn.current && Jn.current.update();
  }, Ft = {}, Zn = typeof ne == "string";
  L ? (Ft.title = !Ge && Zn && !G ? ne : null, Ft["aria-describedby"] = Ge ? Xn : null) : (Ft["aria-label"] = Zn ? ne : null, Ft["aria-labelledby"] = Ge && !Zn ? Xn : null);
  const _e = w({}, Ft, R, re.props, {
    className: Re(R.className, re.props.className),
    onTouchStart: ao,
    ref: Hs
  }, Z ? {
    onMouseMove: Ws
  } : {});
  process.env.NODE_ENV !== "production" && (_e["data-mui-internal-clone-element"] = !0, x.useEffect(() => {
    fe && !fe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [fe]));
  const zt = {};
  I || (_e.onTouchStart = zs, _e.onTouchEnd = Us), G || (_e.onMouseOver = yn(lo, _e.onMouseOver), _e.onMouseLeave = yn(co, _e.onMouseLeave), qe || (zt.onMouseOver = lo, zt.onMouseLeave = co)), z || (_e.onFocus = yn(so, _e.onFocus), _e.onBlur = yn(io, _e.onBlur), qe || (zt.onFocus = so, zt.onBlur = io)), process.env.NODE_ENV !== "production" && re.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${re.props.title}\` or the Tooltip component.`].join(`
`));
  const qs = x.useMemo(() => {
    var ee;
    let ke = [{
      name: "arrow",
      enabled: !!Ee,
      options: {
        element: Ee,
        padding: 4
      }
    }];
    return (ee = H.popperOptions) != null && ee.modifiers && (ke = ke.concat(H.popperOptions.modifiers)), w({}, H.popperOptions, {
      modifiers: ke
    });
  }, [Ee, H]), Ut = w({}, S, {
    isRtl: ye,
    arrow: k,
    disableInteractive: qe,
    placement: W,
    PopperComponentProp: q,
    touch: Pe.current
  }), Qn = id(Ut), uo = (r = (o = Y.popper) != null ? o : A.Popper) != null ? r : sd, po = (i = (a = (l = Y.transition) != null ? l : A.Transition) != null ? a : _) != null ? i : Cr, fo = (c = (u = Y.tooltip) != null ? u : A.Tooltip) != null ? c : ad, ho = (p = (f = Y.arrow) != null ? f : A.Arrow) != null ? p : ld, Gs = Xt(uo, w({}, H, (d = X.popper) != null ? d : P.popper, {
    className: Re(Qn.popper, H == null ? void 0 : H.className, (b = (v = X.popper) != null ? v : P.popper) == null ? void 0 : b.className)
  }), Ut), Ks = Xt(po, w({}, J, (m = X.transition) != null ? m : P.transition), Ut), Xs = Xt(fo, w({}, (h = X.tooltip) != null ? h : P.tooltip, {
    className: Re(Qn.tooltip, (T = (N = X.tooltip) != null ? N : P.tooltip) == null ? void 0 : T.className)
  }), Ut), Ys = Xt(ho, w({}, (E = X.arrow) != null ? E : P.arrow, {
    className: Re(Qn.arrow, (y = (g = X.arrow) != null ? g : P.arrow) == null ? void 0 : y.className)
  }), Ut);
  return /* @__PURE__ */ Oe(x.Fragment, {
    children: [/* @__PURE__ */ x.cloneElement(re, _e), /* @__PURE__ */ C(uo, w({
      as: q ?? hs,
      placement: W,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: qt.y,
          left: qt.x,
          right: qt.x,
          bottom: qt.y,
          width: 0,
          height: 0
        })
      } : fe,
      popperRef: Jn,
      open: fe ? Ge : !1,
      id: Xn,
      transition: !0
    }, zt, Gs, {
      popperOptions: qs,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ C(po, w({
        timeout: ge.transitions.duration.shorter
      }, ee, Ks, {
        children: /* @__PURE__ */ Oe(fo, w({}, Xs, {
          children: [ne, k ? /* @__PURE__ */ C(ho, w({}, Ys, {
            ref: We
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (ms.propTypes = {
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
  children: sn.isRequired,
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
const cd = ms;
var Kr = {}, gs = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(gs);
var ud = gs.exports, pr = {};
function pd(e) {
  return He("MuiSvgIcon", e);
}
rt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const dd = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], fd = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ne(t)}`, `fontSize${Ne(n)}`]
  };
  return Je(o, pd, r);
}, hd = ve("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Ne(n.color)}`], t[`fontSize${Ne(n.fontSize)}`]];
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
}), Xr = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = Ze({
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
  } = r, b = ce(r, dd), v = /* @__PURE__ */ x.isValidElement(o) && o.type === "svg", m = w({}, r, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: p,
    viewBox: d,
    hasSvgAsChild: v
  }), h = {};
  p || (h.viewBox = d);
  const T = fd(m);
  return /* @__PURE__ */ Oe(hd, w({
    as: l,
    className: Re(T.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, b, v && o.props, {
    ownerState: m,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ C("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Xr.propTypes = {
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
Xr.muiName = "SvgIcon";
const li = Xr;
function bs(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ C(li, w({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = li.muiName, /* @__PURE__ */ x.memo(/* @__PURE__ */ x.forwardRef(n));
}
const md = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Li.configure(e);
  }
}, gd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ne,
  createChainedFunction: Er,
  createSvgIcon: bs,
  debounce: Ni,
  deprecatedPropType: qa,
  isMuiElement: Ga,
  ownerDocument: be,
  ownerWindow: $t,
  requirePropFactory: Ka,
  setRef: Pn,
  unstable_ClassNameGenerator: md,
  unstable_useEnhancedEffect: ft,
  unstable_useId: $i,
  unsupportedProp: Ja,
  useControlled: _i,
  useEventCallback: kn,
  useForkRef: Ae,
  useIsFocusVisible: Mi
}, Symbol.toStringTag, { value: "Module" })), bd = /* @__PURE__ */ Pa(gd);
var ci;
function vd() {
  return ci || (ci = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = bd;
  }(pr)), pr;
}
var yd = ud;
Object.defineProperty(Kr, "__esModule", {
  value: !0
});
var vs = Kr.default = void 0, Ed = yd(vd()), xd = Js;
vs = Kr.default = (0, Ed.default)(/* @__PURE__ */ (0, xd.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function ui(e, t, n) {
  return e ? /* @__PURE__ */ C(yi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ C("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function ys(e) {
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
    isSubMenuParent: f = !1,
    hasDisabledGutters: d = !1,
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: m,
    children: h
  } = e, T = /* @__PURE__ */ C(
    na,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: p,
      disableGutters: d,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: m,
      children: n ? /* @__PURE__ */ Oe(Rr, { children: [
        ui(i, n, !0),
        /* @__PURE__ */ C(ra, { primary: n, inset: !i && o }),
        f ? /* @__PURE__ */ C(yi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ C(vs, {}) }) : ui(a, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ C(cd, { title: r, placement: "right", children: /* @__PURE__ */ C("div", { children: T }) }) : T;
}
function Es(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Td(e) {
  const [t, n] = pt(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, a = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = Es(i).filter((p) => "menuItem" in p.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (p) => "menuItem" in p.group && p.group.menuItem === r.id
    ), /* @__PURE__ */ C(Yr, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ Oe(Rr, { children: [
    /* @__PURE__ */ C(ys, { onClick: a, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ C(
      oa,
      {
        anchorEl: t,
        open: !!t,
        onClose: l,
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
const wd = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function Yr(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: a } = Dt(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Es(t).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(p).sort(
      (v, m) => (v.group.order || 0) - (m.group.order || 0)
    ), d = [];
    f.forEach((v) => {
      wd(v.id, t.items).forEach(
        (m) => d.push({ item: m, isLastItemInGroup: !1 })
      ), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !0);
    }), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !1);
    const b = d.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: d, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: p, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: p.label,
    tooltip: p.tooltip,
    iconPathBefore: "iconPathBefore" in p ? p.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in p ? p.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: a
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ C("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ C("div", { role: "menu", "aria-label": u, children: i.map((p, f) => {
    const { item: d } = p, b = l(p);
    if ("command" in d) {
      const v = d.group + f;
      return /* @__PURE__ */ C(
        ys,
        {
          onClick: (m) => {
            n == null || n(m), r(d);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ C(
      Td,
      {
        parentMenuItem: d,
        parentItemProps: b,
        ...e
      },
      u + d.id
    );
  }) }, u);
}
function Od(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([a, l]) => ({ id: a, group: l })).filter((a) => "column" in a.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (a) => "column" in a.group && a.group.column === n
  )), /* @__PURE__ */ C(Yr, { ...e, includedGroups: i });
}
function Pd({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ Oe(
    Ei,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ C("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ C(ia, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ C(
          Od,
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
function kd({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Dt(() => {
    const a = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? a.set(u.order, { id: c, metadata: u }) : console.warn(
        `Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(a.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ C(
    Ei,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((a, l) => /* @__PURE__ */ C(
        Pd,
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
const xs = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== "production" && (xs.displayName = "ListContext");
const Sd = xs;
function Cd(e) {
  return He("MuiList", e);
}
rt("MuiList", ["root", "padding", "dense", "subheader"]);
const Rd = ["children", "className", "component", "dense", "disablePadding", "subheader"], Nd = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return Je({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Cd, t);
}, $d = ve("ul", {
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
})), Ts = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = Ze({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, p = ce(r, Rd), f = x.useMemo(() => ({
    dense: l
  }), [l]), d = w({}, r, {
    component: a,
    dense: l,
    disablePadding: c
  }), b = Nd(d);
  return /* @__PURE__ */ C(Sd.Provider, {
    value: f,
    children: /* @__PURE__ */ Oe($d, w({
      as: a,
      className: Re(b.root, i),
      ref: n,
      ownerState: d
    }, p, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ts.propTypes = {
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
const _d = Ts, Md = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function dr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function pi(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function ws(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function Gt(e, t, n, r, o, i) {
  let a = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (a)
        return !1;
      a = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !ws(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Os = /* @__PURE__ */ x.forwardRef(function(t, n) {
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
  } = t, d = ce(t, Md), b = x.useRef(null), v = x.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  ft(() => {
    o && b.current.focus();
  }, [o]), x.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (E, y) => {
      const g = !b.current.style.width;
      if (E.clientHeight < b.current.clientHeight && g) {
        const S = `${Ii(be(E))}px`;
        b.current.style[y.direction === "rtl" ? "paddingLeft" : "paddingRight"] = S, b.current.style.width = `calc(100% + ${S})`;
      }
      return b.current;
    }
  }), []);
  const m = (E) => {
    const y = b.current, g = E.key, S = be(y).activeElement;
    if (g === "ArrowDown")
      E.preventDefault(), Gt(y, S, u, c, dr);
    else if (g === "ArrowUp")
      E.preventDefault(), Gt(y, S, u, c, pi);
    else if (g === "Home")
      E.preventDefault(), Gt(y, null, u, c, dr);
    else if (g === "End")
      E.preventDefault(), Gt(y, null, u, c, pi);
    else if (g.length === 1) {
      const k = v.current, B = g.toLowerCase(), A = performance.now();
      k.keys.length > 0 && (A - k.lastTime > 500 ? (k.keys = [], k.repeating = !0, k.previousKeyMatched = !0) : k.repeating && B !== k.keys[0] && (k.repeating = !1)), k.lastTime = A, k.keys.push(B);
      const P = S && !k.repeating && ws(S, k);
      k.previousKeyMatched && (P || Gt(y, S, !1, c, dr, k)) ? E.preventDefault() : k.previousKeyMatched = !1;
    }
    p && p(E);
  }, h = Ae(b, n);
  let T = -1;
  x.Children.forEach(a, (E, y) => {
    if (!/* @__PURE__ */ x.isValidElement(E)) {
      T === y && (T += 1, T >= a.length && (T = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && On.isFragment(E) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), E.props.disabled || (f === "selectedMenu" && E.props.selected || T === -1) && (T = y), T === y && (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) && (T += 1, T >= a.length && (T = -1));
  });
  const N = x.Children.map(a, (E, y) => {
    if (y === T) {
      const g = {};
      return i && (g.autoFocus = !0), E.props.tabIndex === void 0 && f === "selectedMenu" && (g.tabIndex = 0), /* @__PURE__ */ x.cloneElement(E, g);
    }
    return E;
  });
  return /* @__PURE__ */ C(_d, w({
    role: "menu",
    ref: h,
    className: l,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, d, {
    children: N
  }));
});
process.env.NODE_ENV !== "production" && (Os.propTypes = {
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
const Id = Os, Ad = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Dd = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Ps = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = pn(), o = {
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
    timeout: T = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: N = ps
  } = t, E = ce(t, Ad), y = x.useRef(null), g = Ae(y, l.ref, n), S = (j) => (I) => {
    if (j) {
      const $ = y.current;
      I === void 0 ? j($) : j($, I);
    }
  }, k = S(d), B = S((j, I) => {
    ds(j);
    const $ = In({
      style: h,
      timeout: T,
      easing: c
    }, {
      mode: "enter"
    });
    j.style.webkitTransition = r.transitions.create("opacity", $), j.style.transition = r.transitions.create("opacity", $), p && p(j, I);
  }), A = S(f), P = S(m), L = S((j) => {
    const I = In({
      style: h,
      timeout: T,
      easing: c
    }, {
      mode: "exit"
    });
    j.style.webkitTransition = r.transitions.create("opacity", I), j.style.transition = r.transitions.create("opacity", I), b && b(j);
  }), z = S(v);
  return /* @__PURE__ */ C(N, w({
    appear: a,
    in: u,
    nodeRef: y,
    onEnter: B,
    onEntered: A,
    onEntering: k,
    onExit: L,
    onExited: z,
    onExiting: P,
    addEndListener: (j) => {
      i && i(y.current, j);
    },
    timeout: T
  }, E, {
    children: (j, I) => /* @__PURE__ */ x.cloneElement(l, w({
      style: w({
        opacity: 0,
        visibility: j === "exited" && !u ? "hidden" : void 0
      }, Dd[j], h, l.props.style),
      ref: g
    }, I))
  }));
});
process.env.NODE_ENV !== "production" && (Ps.propTypes = {
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
  children: sn.isRequired,
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
const jd = Ps;
function Bd(e) {
  return He("MuiBackdrop", e);
}
rt("MuiBackdrop", ["root", "invisible"]);
const Ld = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Vd = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return Je({
    root: ["root", n && "invisible"]
  }, Bd, t);
}, Fd = ve("div", {
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
})), ks = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i;
  const a = Ze({
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
    TransitionComponent: h = jd,
    transitionDuration: T
  } = a, N = ce(a, Ld), E = w({}, a, {
    component: u,
    invisible: d
  }), y = Vd(E), g = (r = v.root) != null ? r : f.root;
  return /* @__PURE__ */ C(h, w({
    in: b,
    timeout: T
  }, N, {
    children: /* @__PURE__ */ C(Fd, w({
      "aria-hidden": !0
    }, g, {
      as: (o = (i = m.root) != null ? i : p.Root) != null ? o : u,
      className: Re(y.root, c, g == null ? void 0 : g.className),
      ownerState: w({}, E, g == null ? void 0 : g.ownerState),
      classes: y,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ks.propTypes = {
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
const zd = ks;
function Ud(e) {
  return He("MuiModal", e);
}
rt("MuiModal", ["root", "hidden", "backdrop"]);
const Hd = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Wd = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return Je({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Ud, r);
}, qd = ve("div", {
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
})), Gd = ve(zd, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Ss = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i, a, l, c;
  const u = Ze({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: p = Gd,
    BackdropProps: f,
    className: d,
    closeAfterTransition: b = !1,
    children: v,
    container: m,
    component: h,
    components: T = {},
    componentsProps: N = {},
    disableAutoFocus: E = !1,
    disableEnforceFocus: y = !1,
    disableEscapeKeyDown: g = !1,
    disablePortal: S = !1,
    disableRestoreFocus: k = !1,
    disableScrollLock: B = !1,
    hideBackdrop: A = !1,
    keepMounted: P = !1,
    onBackdropClick: L,
    open: z,
    slotProps: G,
    slots: j
    // eslint-disable-next-line react/prop-types
  } = u, I = ce(u, Hd), $ = w({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: E,
    disableEnforceFocus: y,
    disableEscapeKeyDown: g,
    disablePortal: S,
    disableRestoreFocus: k,
    disableScrollLock: B,
    hideBackdrop: A,
    keepMounted: P
  }), {
    getRootProps: D,
    getBackdropProps: Q,
    getTransitionProps: Z,
    portalRef: O,
    isTopModal: M,
    exited: F,
    hasTransition: K
  } = Kc(w({}, $, {
    rootRef: n
  })), V = w({}, $, {
    exited: F
  }), U = Wd(V), W = {};
  if (v.props.tabIndex === void 0 && (W.tabIndex = "-1"), K) {
    const {
      onEnter: J,
      onExited: R
    } = Z();
    W.onEnter = J, W.onExited = R;
  }
  const q = (r = (o = j == null ? void 0 : j.root) != null ? o : T.Root) != null ? r : qd, H = (i = (a = j == null ? void 0 : j.backdrop) != null ? a : T.Backdrop) != null ? i : p, X = (l = G == null ? void 0 : G.root) != null ? l : N.root, Y = (c = G == null ? void 0 : G.backdrop) != null ? c : N.backdrop, ne = ht({
    elementType: q,
    externalSlotProps: X,
    externalForwardedProps: I,
    getSlotProps: D,
    additionalProps: {
      ref: n,
      as: h
    },
    ownerState: V,
    className: Re(d, X == null ? void 0 : X.className, U == null ? void 0 : U.root, !V.open && V.exited && (U == null ? void 0 : U.hidden))
  }), _ = ht({
    elementType: H,
    externalSlotProps: Y,
    additionalProps: f,
    getSlotProps: (J) => Q(w({}, J, {
      onClick: (R) => {
        L && L(R), J != null && J.onClick && J.onClick(R);
      }
    })),
    className: Re(Y == null ? void 0 : Y.className, f == null ? void 0 : f.className, U == null ? void 0 : U.backdrop),
    ownerState: V
  });
  return !P && !z && (!K || F) ? null : /* @__PURE__ */ C(rn, {
    ref: O,
    container: m,
    disablePortal: S,
    children: /* @__PURE__ */ Oe(q, w({}, ne, {
      children: [!A && p ? /* @__PURE__ */ C(H, w({}, _)) : null, /* @__PURE__ */ C(Sn, {
        disableEnforceFocus: y,
        disableAutoFocus: E,
        disableRestoreFocus: k,
        isEnabled: M,
        open: z,
        children: /* @__PURE__ */ x.cloneElement(v, W)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ss.propTypes = {
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
  children: sn.isRequired,
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
  container: s.oneOfType([Ke, s.func]),
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
const Kd = Ss;
function Xd(e) {
  return He("MuiPaper", e);
}
rt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Yd = ["className", "component", "elevation", "square", "variant"], Jd = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return Je(i, Xd, o);
}, Zd = ve("div", {
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
    backgroundImage: `linear-gradient(${Mn("#fff", ai(t.elevation))}, ${Mn("#fff", ai(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Cs = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = Ze({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: a = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = ce(r, Yd), p = w({}, r, {
    component: i,
    elevation: a,
    square: l,
    variant: c
  }), f = Jd(p);
  return process.env.NODE_ENV !== "production" && pn().shadows[a] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)), /* @__PURE__ */ C(Zd, w({
    as: i,
    ownerState: p,
    className: Re(f.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (Cs.propTypes = {
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
  elevation: jt(ji, (e) => {
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
const Qd = Cs;
function ef(e) {
  return He("MuiPopover", e);
}
rt("MuiPopover", ["root", "paper"]);
const tf = ["onEntering"], nf = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], rf = ["slotProps"];
function di(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function fi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function hi(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function wn(e) {
  return typeof e == "function" ? e() : e;
}
const of = (e) => {
  const {
    classes: t
  } = e;
  return Je({
    root: ["root"],
    paper: ["paper"]
  }, ef, t);
}, sf = ve(Kd, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Rs = ve(Qd, {
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
}), Ns = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i;
  const a = Ze({
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
    open: T,
    PaperProps: N = {},
    slots: E,
    slotProps: y,
    transformOrigin: g = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: S = Cr,
    transitionDuration: k = "auto",
    TransitionProps: {
      onEntering: B
    } = {},
    disableScrollLock: A = !1
  } = a, P = ce(a.TransitionProps, tf), L = ce(a, nf), z = (r = y == null ? void 0 : y.paper) != null ? r : N, G = x.useRef(), j = Ae(G, z.ref), I = w({}, a, {
    anchorOrigin: u,
    anchorReference: f,
    elevation: m,
    marginThreshold: h,
    externalPaperSlotProps: z,
    transformOrigin: g,
    TransitionComponent: S,
    transitionDuration: k,
    TransitionProps: P
  }), $ = of(I), D = x.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (p || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), p;
    const J = wn(c), R = J && J.nodeType === 1 ? J : be(G.current).body, re = R.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ge = R.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ge.top === 0 && ge.left === 0 && ge.right === 0 && ge.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: re.top + di(re, u.vertical),
      left: re.left + fi(re, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, p, f]), Q = x.useCallback((J) => ({
    vertical: di(J, g.vertical),
    horizontal: fi(J, g.horizontal)
  }), [g.horizontal, g.vertical]), Z = x.useCallback((J) => {
    const R = {
      width: J.offsetWidth,
      height: J.offsetHeight
    }, re = Q(R);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: hi(re)
      };
    const ge = D();
    let ye = ge.top - re.vertical, fe = ge.left - re.horizontal;
    const st = ye + R.height, Ee = fe + R.width, We = $t(wn(c)), Pe = We.innerHeight - h, qe = We.innerWidth - h;
    if (h !== null && ye < h) {
      const me = ye - h;
      ye -= me, re.vertical += me;
    } else if (h !== null && st > Pe) {
      const me = st - Pe;
      ye -= me, re.vertical += me;
    }
    if (process.env.NODE_ENV !== "production" && R.height > Pe && R.height && Pe && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${R.height - Pe}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && fe < h) {
      const me = fe - h;
      fe -= me, re.horizontal += me;
    } else if (Ee > qe) {
      const me = Ee - qe;
      fe -= me, re.horizontal += me;
    }
    return {
      top: `${Math.round(ye)}px`,
      left: `${Math.round(fe)}px`,
      transformOrigin: hi(re)
    };
  }, [c, f, D, Q, h]), [O, M] = x.useState(T), F = x.useCallback(() => {
    const J = G.current;
    if (!J)
      return;
    const R = Z(J);
    R.top !== null && (J.style.top = R.top), R.left !== null && (J.style.left = R.left), J.style.transformOrigin = R.transformOrigin, M(!0);
  }, [Z]);
  x.useEffect(() => (A && window.addEventListener("scroll", F), () => window.removeEventListener("scroll", F)), [c, A, F]);
  const K = (J, R) => {
    B && B(J, R), F();
  }, V = () => {
    M(!1);
  };
  x.useEffect(() => {
    T && F();
  }), x.useImperativeHandle(l, () => T ? {
    updatePosition: () => {
      F();
    }
  } : null, [T, F]), x.useEffect(() => {
    if (!T)
      return;
    const J = Ni(() => {
      F();
    }), R = $t(c);
    return R.addEventListener("resize", J), () => {
      J.clear(), R.removeEventListener("resize", J);
    };
  }, [c, T, F]);
  let U = k;
  k === "auto" && !S.muiSupportAuto && (U = void 0);
  const W = v || (c ? be(wn(c)).body : void 0), q = (o = E == null ? void 0 : E.root) != null ? o : sf, H = (i = E == null ? void 0 : E.paper) != null ? i : Rs, X = ht({
    elementType: H,
    externalSlotProps: w({}, z, {
      style: O ? z.style : w({}, z.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: j
    },
    ownerState: I,
    className: Re($.paper, z == null ? void 0 : z.className)
  }), Y = ht({
    elementType: q,
    externalSlotProps: (y == null ? void 0 : y.root) || {},
    externalForwardedProps: L,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: W,
      open: T
    },
    ownerState: I,
    className: Re($.root, b)
  }), {
    slotProps: ne
  } = Y, _ = ce(Y, rf);
  return /* @__PURE__ */ C(q, w({}, _, !Fi(q) && {
    slotProps: ne,
    disableScrollLock: A
  }, {
    children: /* @__PURE__ */ C(S, w({
      appear: !0,
      in: T,
      onEntering: K,
      onExited: V,
      timeout: U
    }, P, {
      children: /* @__PURE__ */ C(H, w({}, X, {
        children: d
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ns.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: $r,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: jt(s.oneOfType([Ke, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = wn(e.anchorEl);
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
  container: s.oneOfType([Ke, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: ji,
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
    component: Ba
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
const af = Ns;
function lf(e) {
  return He("MuiMenu", e);
}
rt("MuiMenu", ["root", "paper", "list"]);
const cf = ["onEntering"], uf = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], pf = {
  vertical: "top",
  horizontal: "right"
}, df = {
  vertical: "top",
  horizontal: "left"
}, ff = (e) => {
  const {
    classes: t
  } = e;
  return Je({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, lf, t);
}, hf = ve(af, {
  shouldForwardProp: (e) => cs(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), mf = ve(Rs, {
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
}), gf = ve(Id, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), $s = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o;
  const i = Ze({
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
    variant: T = "selectedMenu",
    slots: N = {},
    slotProps: E = {}
  } = i, y = ce(i.TransitionProps, cf), g = ce(i, uf), S = pn(), k = S.direction === "rtl", B = w({}, i, {
    autoFocus: a,
    disableAutoFocusItem: u,
    MenuListProps: p,
    onEntering: h,
    PaperProps: b,
    transitionDuration: m,
    TransitionProps: y,
    variant: T
  }), A = ff(B), P = a && !u && d, L = x.useRef(null), z = (Z, O) => {
    L.current && L.current.adjustStyleForScrollbar(Z, S), h && h(Z, O);
  }, G = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), f && f(Z, "tabKeyDown"));
  };
  let j = -1;
  x.Children.map(l, (Z, O) => {
    /* @__PURE__ */ x.isValidElement(Z) && (process.env.NODE_ENV !== "production" && On.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (T === "selectedMenu" && Z.props.selected || j === -1) && (j = O));
  });
  const I = (r = N.paper) != null ? r : mf, $ = (o = E.paper) != null ? o : b, D = ht({
    elementType: N.root,
    externalSlotProps: E.root,
    ownerState: B,
    className: [A.root, c]
  }), Q = ht({
    elementType: I,
    externalSlotProps: $,
    ownerState: B,
    className: A.paper
  });
  return /* @__PURE__ */ C(hf, w({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: k ? "right" : "left"
    },
    transformOrigin: k ? pf : df,
    slots: {
      paper: I,
      root: N.root
    },
    slotProps: {
      root: D,
      paper: Q
    },
    open: d,
    ref: n,
    transitionDuration: m,
    TransitionProps: w({
      onEntering: z
    }, y),
    ownerState: B
  }, g, {
    classes: v,
    children: /* @__PURE__ */ C(gf, w({
      onKeyDown: G,
      actions: L,
      autoFocus: a && (j === -1 || u),
      autoFocusItem: P,
      variant: T
    }, p, {
      className: Re(A.list, p.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && ($s.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([Ke, s.func]),
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
const bf = $s;
function zf({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = Ct.useState(void 0), a = ut(
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
  ), l = ut(() => {
    i(void 0);
  }, []), c = Dt(() => {
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
        /* @__PURE__ */ C(
          bf,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ C(
              Yr,
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
function Uf({
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
  return /* @__PURE__ */ C(
    xi,
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
var vf = Object.defineProperty, yf = (e, t, n) => t in e ? vf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => (yf(e, typeof t != "symbol" ? t + "" : t, n), n);
const bt = [
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
], Jr = [
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
], _s = [
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
], mi = Rf();
function Bt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in mi ? mi[e] : 0;
}
function Zr(e) {
  return Bt(e) > 0;
}
function Ef(e) {
  const t = typeof e == "string" ? Bt(e) : e;
  return t >= 40 && t <= 66;
}
function xf(e) {
  return (typeof e == "string" ? Bt(e) : e) <= 39;
}
function Ms(e) {
  return e <= 66;
}
function Tf(e) {
  const t = typeof e == "string" ? Bt(e) : e;
  return Ds(t) && !Ms(t);
}
function* wf() {
  for (let e = 1; e <= bt.length; e++)
    yield e;
}
const Of = 1, Is = bt.length;
function Pf() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Qr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= bt.length ? t : bt[n];
}
function As(e) {
  return e <= 0 || e > Is ? "******" : _s[e - 1];
}
function kf(e) {
  return As(Bt(e));
}
function Ds(e) {
  const t = typeof e == "number" ? Qr(e) : e;
  return Zr(t) && !Jr.includes(t);
}
function Sf(e) {
  const t = typeof e == "number" ? Qr(e) : e;
  return Zr(t) && Jr.includes(t);
}
function Cf(e) {
  return _s[e - 1].includes("*obsolete*");
}
function Rf() {
  const e = {};
  for (let t = 0; t < bt.length; t++)
    e[bt[t]] = t + 1;
  return e;
}
const Fe = {
  allBookIds: bt,
  nonCanonicalIds: Jr,
  bookIdToNumber: Bt,
  isBookIdValid: Zr,
  isBookNT: Ef,
  isBookOT: xf,
  isBookOTNT: Ms,
  isBookDC: Tf,
  allBookNumbers: wf,
  firstBook: Of,
  lastBook: Is,
  extraBooks: Pf,
  bookNumberToId: Qr,
  bookNumberToEnglishName: As,
  bookIdToEnglishName: kf,
  isCanonical: Ds,
  isExtraMaterial: Sf,
  isObsolete: Cf
};
var et = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(et || {});
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
te(Se, "Original", new Se(et.Original)), te(Se, "Septuagint", new Se(et.Septuagint)), te(Se, "Vulgate", new Se(et.Vulgate)), te(Se, "English", new Se(et.English)), te(Se, "RussianProtestant", new Se(et.RussianProtestant)), te(Se, "RussianOrthodox", new Se(et.RussianOrthodox));
let St = Se;
function gi(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var js = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(js || {});
const xe = class oe {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, a = n != null && n instanceof St ? n : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof St ? n : void 0;
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
          const i = t instanceof St ? t : oe.defaultVersification;
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
      if (r instanceof Kt)
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
    return Fe.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = Fe.bookIdToNumber(t);
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
    if (t <= 0 || t > Fe.lastBook)
      throw new Kt(
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
    this.versification = this.versification != null ? new St(t) : void 0;
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
          this.versification = new St(et[a]);
        } catch {
          throw new Kt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Kt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || Fe.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
      throw new Kt("Invalid reference : " + t);
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
    const o = [], i = gi(this._verse, r);
    for (const a of i.map((l) => gi(l, n))) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Fe.lastBook ? 2 : (Fe.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = Fe.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
te(xe, "defaultVersification", St.English), te(xe, "verseRangeSeparator", "-"), te(xe, "verseSequenceIndicator", ","), te(xe, "verseRangeSeparators", [xe.verseRangeSeparator]), te(xe, "verseSequenceIndicators", [xe.verseSequenceIndicator]), te(xe, "chapterDigitShifter", 1e3), te(xe, "bookDigitShifter", xe.chapterDigitShifter * xe.chapterDigitShifter), te(xe, "bcvMaxValue", xe.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(xe, "ValidStatusType", js);
class Kt extends Error {
}
function An({
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
  return /* @__PURE__ */ C(
    vi,
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
let fr;
const hr = () => (fr || (fr = Fe.allBookIds.map((e) => ({
  bookId: e,
  label: Fe.bookIdToEnglishName(e)
}))), fr);
function Wf({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const f = { bookNum: Fe.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, a = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = Dt(() => hr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ Oe("span", { id: n, children: [
    /* @__PURE__ */ C(
      br,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: hr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ C(
      vt,
      {
        onClick: () => r(go(e, -1)),
        isDisabled: e.bookNum <= ba,
        children: "<"
      }
    ),
    /* @__PURE__ */ C(
      vt,
      {
        onClick: () => r(go(e, 1)),
        isDisabled: e.bookNum >= hr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ C(
      An,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ C(
      vt,
      {
        onClick: () => t(bo(e, -1)),
        isDisabled: e.chapterNum <= va,
        children: "<"
      }
    ),
    /* @__PURE__ */ C(
      vt,
      {
        onClick: () => t(bo(e, 1)),
        isDisabled: e.chapterNum >= ya(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ C(
      An,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ C(
      vt,
      {
        onClick: () => t(vo(e, -1)),
        isDisabled: e.verseNum <= Ea,
        children: "<"
      }
    ),
    /* @__PURE__ */ C(vt, { onClick: () => t(vo(e, 1)), children: ">" })
  ] });
}
function qf({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = pt(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ C(sa, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ C(
    An,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (a) => i(a.target.value)
    }
  ) });
}
function Gf({
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
  return /* @__PURE__ */ C(
    aa,
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
function Kf({
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
  return /* @__PURE__ */ C(
    la,
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
function Xf({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ C(
    ca,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function bi({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ C(An, { defaultValue: t[n.key], onChange: r });
}
const Nf = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ C(
  wa,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Yf({
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
  onRowsChange: T,
  onCellClick: N,
  onCellDoubleClick: E,
  onCellContextMenu: y,
  onCellKeyDown: g,
  direction: S = "ltr",
  enableVirtualization: k = !0,
  onCopy: B,
  onPaste: A,
  onScroll: P,
  className: L,
  id: z
}) {
  const G = Dt(() => {
    const j = e.map((I) => typeof I.editable == "function" ? {
      ...I,
      editable: (D) => !!I.editable(D),
      renderEditCell: I.renderEditCell || bi
    } : I.editable && !I.renderEditCell ? { ...I, renderEditCell: bi } : I.renderEditCell && !I.editable ? { ...I, editable: !1 } : I);
    return p ? [{ ...Ta, minWidth: f }, ...j] : j;
  }, [e, p, f]);
  return /* @__PURE__ */ C(
    xa,
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
      onRowsChange: T,
      onCellClick: N,
      onCellDoubleClick: E,
      onCellContextMenu: y,
      onCellKeyDown: g,
      direction: S,
      enableVirtualization: k,
      onCopy: B,
      onPaste: A,
      onScroll: P,
      renderers: { renderCheckbox: Nf },
      className: `papi-table ${L ?? "rdg-light"}`,
      id: z
    }
  );
}
const $f = bs(/* @__PURE__ */ C("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function _f(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Bs = (e, t, n = {}) => {
  const r = gr(t);
  r.current = t;
  const o = gr(n);
  o.current = _f(o.current);
  const [i, a] = pt(() => r.current), [l, c] = pt(!0);
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
};
function Jf({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const [i, a] = pt(!1), [l, c] = pt(!1), u = ut(() => {
    i && a(!1), c(!1);
  }, [i]), p = ut((h) => {
    h.stopPropagation(), a((T) => {
      const N = !T;
      return N && h.shiftKey ? c(!0) : N || c(!1), N;
    });
  }, []), f = gr(void 0), [d, b] = pt(0);
  Dn(() => {
    i && f.current && b(f.current.clientHeight);
  }, [i]);
  const v = ut(
    (h) => (u(), t(h)),
    [t, u]
  ), [m] = Bs(
    ut(async () => e == null ? void 0 : e(l), [e, l, i]),
    void 0
  );
  return /* @__PURE__ */ C("div", { ref: f, style: { position: "relative" }, children: /* @__PURE__ */ C(ua, { position: "static", id: r, children: /* @__PURE__ */ Oe(pa, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    m ? /* @__PURE__ */ C(
      xi,
      {
        edge: "start",
        className: `papi-menuButton ${n ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: p,
        children: /* @__PURE__ */ C($f, {})
      }
    ) : void 0,
    o ? /* @__PURE__ */ C("div", { className: "papi-menu-children", children: o }) : void 0,
    m ? /* @__PURE__ */ C(
      da,
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
        children: /* @__PURE__ */ C(
          kd,
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
const Zf = (e, t) => {
  Dn(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, mr = () => !1, Qf = (e, t) => {
  const [n] = Bs(
    ut(async () => {
      if (!e)
        return mr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    mr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Dn(() => () => {
    n !== mr && n();
  }, [n]);
};
function Mf(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Mf(`.papi-button {
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
  vt as Button,
  Ff as ChapterRangeSelector,
  wa as Checkbox,
  br as ComboBox,
  zf as ContextMenu,
  kd as GridMenu,
  Uf as IconButton,
  Pt as LabelPosition,
  ys as MenuItem,
  Wf as RefSelector,
  qf as SearchBar,
  Gf as Slider,
  Kf as Snackbar,
  Xf as Switch,
  Yf as Table,
  An as TextField,
  Jf as Toolbar,
  Zf as useEvent,
  Qf as useEventAsync,
  Bs as usePromise
};
//# sourceMappingURL=index.js.map
