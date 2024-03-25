import Ta, { jsx as k, jsxs as Se, Fragment as Vr } from "react/jsx-runtime";
import { Button as wa, Autocomplete as Oa, TextField as Ni, FormControlLabel as So, FormLabel as Pa, Checkbox as Sa, MenuItem as ka, ListItemText as Ca, ListItemIcon as $i, Menu as Ra, Grid as _i, List as Na, IconButton as Mi, Paper as $a, Slider as _a, Snackbar as Ma, Switch as Ia, AppBar as Aa, Toolbar as Da, Drawer as ja } from "@mui/material";
import * as T from "react";
import ft, { useMemo as Bt, useState as mt, useCallback as ht, useRef as Sr, useEffect as Wn } from "react";
import Ii, { ThemeContext as Ba } from "@mui/styled-engine";
import * as La from "react-dom";
import Pn from "react-dom";
import { offsetBook as ko, FIRST_SCR_BOOK_NUM as Va, offsetChapter as Co, FIRST_SCR_CHAPTER_NUM as Fa, getChaptersForBook as za, offsetVerse as Ro, FIRST_SCR_VERSE_NUM as Ua } from "platform-bible-utils";
import qa, { SelectColumn as Wa } from "react-data-grid";
function Tt({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ k(
    wa,
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
function kr({
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
  onChange: d,
  onFocus: f,
  onBlur: p,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ k(
    Oa,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: u,
      onChange: d,
      onFocus: f,
      onBlur: p,
      getOptionLabel: b,
      renderInput: (v) => /* @__PURE__ */ k(
        Ni,
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
function Xh({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const a = Bt(
    () => Array.from({ length: i }, (u, d) => d + 1),
    [i]
  ), l = (u, d) => {
    n(d), d > t && r(d);
  }, c = (u, d) => {
    r(d), d < e && n(d);
  };
  return /* @__PURE__ */ Se(Vr, { children: [
    /* @__PURE__ */ k(
      So,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ k(
          kr,
          {
            onChange: (u, d) => l(u, d),
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
    /* @__PURE__ */ k(
      So,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ k(
          kr,
          {
            onChange: (u, d) => c(u, d),
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
var Rt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Rt || {});
function Ha({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Rt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const d = /* @__PURE__ */ k(
    Sa,
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
    const p = r === Rt.Before || r === Rt.Above, b = /* @__PURE__ */ k("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === Rt.Before || r === Rt.After, m = v ? b : /* @__PURE__ */ k("div", { children: b }), h = v ? d : /* @__PURE__ */ k("div", { children: d });
    f = /* @__PURE__ */ Se(
      Pa,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: a,
        error: l,
        children: [
          p && m,
          h,
          !p && m
        ]
      }
    );
  } else
    f = d;
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
function Ga(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function it(e) {
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
var Cr = { exports: {} }, Sn = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var No;
function Ka() {
  if (No)
    return ie;
  No = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
  function y(g) {
    if (typeof g == "object" && g !== null) {
      var P = g.$$typeof;
      switch (P) {
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
                case d:
                case v:
                case b:
                case a:
                  return g;
                default:
                  return P;
              }
          }
        case n:
          return P;
      }
    }
  }
  function x(g) {
    return y(g) === u;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = u, ie.ContextConsumer = l, ie.ContextProvider = a, ie.Element = t, ie.ForwardRef = d, ie.Fragment = r, ie.Lazy = v, ie.Memo = b, ie.Portal = n, ie.Profiler = i, ie.StrictMode = o, ie.Suspense = f, ie.isAsyncMode = function(g) {
    return x(g) || y(g) === c;
  }, ie.isConcurrentMode = x, ie.isContextConsumer = function(g) {
    return y(g) === l;
  }, ie.isContextProvider = function(g) {
    return y(g) === a;
  }, ie.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === t;
  }, ie.isForwardRef = function(g) {
    return y(g) === d;
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
    return typeof g == "string" || typeof g == "function" || g === r || g === u || g === i || g === o || g === f || g === p || typeof g == "object" && g !== null && (g.$$typeof === v || g.$$typeof === b || g.$$typeof === a || g.$$typeof === l || g.$$typeof === d || g.$$typeof === h || g.$$typeof === E || g.$$typeof === $ || g.$$typeof === m);
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
var $o;
function Xa() {
  return $o || ($o = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
    function y(N) {
      return typeof N == "string" || typeof N == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      N === r || N === u || N === i || N === o || N === f || N === p || typeof N == "object" && N !== null && (N.$$typeof === v || N.$$typeof === b || N.$$typeof === a || N.$$typeof === l || N.$$typeof === d || N.$$typeof === h || N.$$typeof === E || N.$$typeof === $ || N.$$typeof === m);
    }
    function x(N) {
      if (typeof N == "object" && N !== null) {
        var Z = N.$$typeof;
        switch (Z) {
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
                  case d:
                  case v:
                  case b:
                  case a:
                    return re;
                  default:
                    return Z;
                }
            }
          case n:
            return Z;
        }
      }
    }
    var g = c, P = u, S = l, A = a, D = t, I = d, B = r, z = v, U = b, V = n, M = i, R = o, j = f, G = !1;
    function ee(N) {
      return G || (G = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(N) || x(N) === c;
    }
    function O(N) {
      return x(N) === u;
    }
    function _(N) {
      return x(N) === l;
    }
    function F(N) {
      return x(N) === a;
    }
    function X(N) {
      return typeof N == "object" && N !== null && N.$$typeof === t;
    }
    function L(N) {
      return x(N) === d;
    }
    function q(N) {
      return x(N) === r;
    }
    function H(N) {
      return x(N) === v;
    }
    function K(N) {
      return x(N) === b;
    }
    function W(N) {
      return x(N) === n;
    }
    function Y(N) {
      return x(N) === i;
    }
    function J(N) {
      return x(N) === o;
    }
    function ne(N) {
      return x(N) === f;
    }
    se.AsyncMode = g, se.ConcurrentMode = P, se.ContextConsumer = S, se.ContextProvider = A, se.Element = D, se.ForwardRef = I, se.Fragment = B, se.Lazy = z, se.Memo = U, se.Portal = V, se.Profiler = M, se.StrictMode = R, se.Suspense = j, se.isAsyncMode = ee, se.isConcurrentMode = O, se.isContextConsumer = _, se.isContextProvider = F, se.isElement = X, se.isForwardRef = L, se.isFragment = q, se.isLazy = H, se.isMemo = K, se.isPortal = W, se.isProfiler = Y, se.isStrictMode = J, se.isSuspense = ne, se.isValidElementType = y, se.typeOf = x;
  }()), se;
}
var _o;
function Ai() {
  return _o || (_o = 1, process.env.NODE_ENV === "production" ? Sn.exports = Ka() : Sn.exports = Xa()), Sn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var cr, Mo;
function Ya() {
  if (Mo)
    return cr;
  Mo = 1;
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
      var c = Object.getOwnPropertyNames(a).map(function(d) {
        return a[d];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        u[d] = d;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return cr = o() ? Object.assign : function(i, a) {
    for (var l, c = r(i), u, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var f in l)
        t.call(l, f) && (c[f] = l[f]);
      if (e) {
        u = e(l);
        for (var p = 0; p < u.length; p++)
          n.call(l, u[p]) && (c[u[p]] = l[u[p]]);
      }
    }
    return c;
  }, cr;
}
var ur, Io;
function Fr() {
  if (Io)
    return ur;
  Io = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ur = e, ur;
}
var dr, Ao;
function Di() {
  return Ao || (Ao = 1, dr = Function.call.bind(Object.prototype.hasOwnProperty)), dr;
}
var pr, Do;
function Ja() {
  if (Do)
    return pr;
  Do = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Fr(), n = {}, r = Di();
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
      for (var d in i)
        if (r(i, d)) {
          var f;
          try {
            if (typeof i[d] != "function") {
              var p = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            f = i[d](a, d, c, l, null, t);
          } catch (v) {
            f = v;
          }
          if (f && !(f instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
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
  }, pr = o, pr;
}
var fr, jo;
function Za() {
  if (jo)
    return fr;
  jo = 1;
  var e = Ai(), t = Ya(), n = Fr(), r = Di(), o = Ja(), i = function() {
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
  return fr = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function f(O) {
      var _ = O && (u && O[u] || O[d]);
      if (typeof _ == "function")
        return _;
    }
    var p = "<<anonymous>>", b = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: $(),
      arrayOf: y,
      element: x(),
      elementType: g(),
      instanceOf: P,
      node: I(),
      objectOf: A,
      oneOf: S,
      oneOfType: D,
      shape: z,
      exact: U
    };
    function v(O, _) {
      return O === _ ? O !== 0 || 1 / O === 1 / _ : O !== O && _ !== _;
    }
    function m(O, _) {
      this.message = O, this.data = _ && typeof _ == "object" ? _ : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function h(O) {
      if (process.env.NODE_ENV !== "production")
        var _ = {}, F = 0;
      function X(q, H, K, W, Y, J, ne) {
        if (W = W || p, J = J || K, ne !== n) {
          if (c) {
            var N = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw N.name = "Invariant Violation", N;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Z = W + ":" + K;
            !_[Z] && // Avoid spamming the console because they are often not actionable except for lib authors
            F < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + J + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), _[Z] = !0, F++);
          }
        }
        return H[K] == null ? q ? H[K] === null ? new m("The " + Y + " `" + J + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new m("The " + Y + " `" + J + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : O(H, K, W, Y, J);
      }
      var L = X.bind(null, !1);
      return L.isRequired = X.bind(null, !0), L;
    }
    function E(O) {
      function _(F, X, L, q, H, K) {
        var W = F[X], Y = R(W);
        if (Y !== O) {
          var J = j(W);
          return new m(
            "Invalid " + q + " `" + H + "` of type " + ("`" + J + "` supplied to `" + L + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return h(_);
    }
    function $() {
      return h(a);
    }
    function y(O) {
      function _(F, X, L, q, H) {
        if (typeof O != "function")
          return new m("Property `" + H + "` of component `" + L + "` has invalid PropType notation inside arrayOf.");
        var K = F[X];
        if (!Array.isArray(K)) {
          var W = R(K);
          return new m("Invalid " + q + " `" + H + "` of type " + ("`" + W + "` supplied to `" + L + "`, expected an array."));
        }
        for (var Y = 0; Y < K.length; Y++) {
          var J = O(K, Y, L, q, H + "[" + Y + "]", n);
          if (J instanceof Error)
            return J;
        }
        return null;
      }
      return h(_);
    }
    function x() {
      function O(_, F, X, L, q) {
        var H = _[F];
        if (!l(H)) {
          var K = R(H);
          return new m("Invalid " + L + " `" + q + "` of type " + ("`" + K + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(O);
    }
    function g() {
      function O(_, F, X, L, q) {
        var H = _[F];
        if (!e.isValidElementType(H)) {
          var K = R(H);
          return new m("Invalid " + L + " `" + q + "` of type " + ("`" + K + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(O);
    }
    function P(O) {
      function _(F, X, L, q, H) {
        if (!(F[X] instanceof O)) {
          var K = O.name || p, W = ee(F[X]);
          return new m("Invalid " + q + " `" + H + "` of type " + ("`" + W + "` supplied to `" + L + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return h(_);
    }
    function S(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function _(F, X, L, q, H) {
        for (var K = F[X], W = 0; W < O.length; W++)
          if (v(K, O[W]))
            return null;
        var Y = JSON.stringify(O, function(ne, N) {
          var Z = j(N);
          return Z === "symbol" ? String(N) : N;
        });
        return new m("Invalid " + q + " `" + H + "` of value `" + String(K) + "` " + ("supplied to `" + L + "`, expected one of " + Y + "."));
      }
      return h(_);
    }
    function A(O) {
      function _(F, X, L, q, H) {
        if (typeof O != "function")
          return new m("Property `" + H + "` of component `" + L + "` has invalid PropType notation inside objectOf.");
        var K = F[X], W = R(K);
        if (W !== "object")
          return new m("Invalid " + q + " `" + H + "` of type " + ("`" + W + "` supplied to `" + L + "`, expected an object."));
        for (var Y in K)
          if (r(K, Y)) {
            var J = O(K, Y, L, q, H + "." + Y, n);
            if (J instanceof Error)
              return J;
          }
        return null;
      }
      return h(_);
    }
    function D(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var _ = 0; _ < O.length; _++) {
        var F = O[_];
        if (typeof F != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + G(F) + " at index " + _ + "."
          ), a;
      }
      function X(L, q, H, K, W) {
        for (var Y = [], J = 0; J < O.length; J++) {
          var ne = O[J], N = ne(L, q, H, K, W, n);
          if (N == null)
            return null;
          N.data && r(N.data, "expectedType") && Y.push(N.data.expectedType);
        }
        var Z = Y.length > 0 ? ", expected one of type [" + Y.join(", ") + "]" : "";
        return new m("Invalid " + K + " `" + W + "` supplied to " + ("`" + H + "`" + Z + "."));
      }
      return h(X);
    }
    function I() {
      function O(_, F, X, L, q) {
        return V(_[F]) ? null : new m("Invalid " + L + " `" + q + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return h(O);
    }
    function B(O, _, F, X, L) {
      return new m(
        (O || "React class") + ": " + _ + " type `" + F + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + L + "`."
      );
    }
    function z(O) {
      function _(F, X, L, q, H) {
        var K = F[X], W = R(K);
        if (W !== "object")
          return new m("Invalid " + q + " `" + H + "` of type `" + W + "` " + ("supplied to `" + L + "`, expected `object`."));
        for (var Y in O) {
          var J = O[Y];
          if (typeof J != "function")
            return B(L, q, H, Y, j(J));
          var ne = J(K, Y, L, q, H + "." + Y, n);
          if (ne)
            return ne;
        }
        return null;
      }
      return h(_);
    }
    function U(O) {
      function _(F, X, L, q, H) {
        var K = F[X], W = R(K);
        if (W !== "object")
          return new m("Invalid " + q + " `" + H + "` of type `" + W + "` " + ("supplied to `" + L + "`, expected `object`."));
        var Y = t({}, F[X], O);
        for (var J in Y) {
          var ne = O[J];
          if (r(O, J) && typeof ne != "function")
            return B(L, q, H, J, j(ne));
          if (!ne)
            return new m(
              "Invalid " + q + " `" + H + "` key `" + J + "` supplied to `" + L + "`.\nBad object: " + JSON.stringify(F[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var N = ne(K, J, L, q, H + "." + J, n);
          if (N)
            return N;
        }
        return null;
      }
      return h(_);
    }
    function V(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(V);
          if (O === null || l(O))
            return !0;
          var _ = f(O);
          if (_) {
            var F = _.call(O), X;
            if (_ !== O.entries) {
              for (; !(X = F.next()).done; )
                if (!V(X.value))
                  return !1;
            } else
              for (; !(X = F.next()).done; ) {
                var L = X.value;
                if (L && !V(L[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function M(O, _) {
      return O === "symbol" ? !0 : _ ? _["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && _ instanceof Symbol : !1;
    }
    function R(O) {
      var _ = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : M(_, O) ? "symbol" : _;
    }
    function j(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var _ = R(O);
      if (_ === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return _;
    }
    function G(O) {
      var _ = j(O);
      switch (_) {
        case "array":
        case "object":
          return "an " + _;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + _;
        default:
          return _;
      }
    }
    function ee(O) {
      return !O.constructor || !O.constructor.name ? p : O.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, fr;
}
var hr, Bo;
function Qa() {
  if (Bo)
    return hr;
  Bo = 1;
  var e = Fr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, hr = function() {
    function r(a, l, c, u, d, f) {
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
      checkPropTypes: n,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, hr;
}
if (process.env.NODE_ENV !== "production") {
  var el = Ai(), tl = !0;
  Cr.exports = Za()(el.isElement, tl);
} else
  Cr.exports = Qa()();
var nl = Cr.exports;
const s = /* @__PURE__ */ Ga(nl);
function ji(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = ji(e[t])) && (r && (r += " "), r += n);
    } else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function ve() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = ji(e)) && (r && (r += " "), r += t);
  return r;
}
const Lo = {};
function rl(e, t) {
  const n = T.useRef(Lo);
  return n.current === Lo && (n.current = e(t)), n;
}
const ol = [];
function il(e) {
  T.useEffect(e, ol);
}
class fn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new fn();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, n();
    }, t);
  }
}
function Qt() {
  const e = rl(fn.create).current;
  return il(e.disposeEffect), e;
}
function Lt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function sl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Bi(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !sl(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Li = Lt(s.element, Bi);
Li.isRequired = Lt(s.element.isRequired, Bi);
const hn = Li;
function Vi(e) {
  return typeof e == "string";
}
function en(e, t, n) {
  return e === void 0 || Vi(e) ? t : w({}, t, {
    ownerState: w({}, t.ownerState, n)
  });
}
const al = {
  disableDefaultClasses: !1
}, Fi = /* @__PURE__ */ T.createContext(al);
process.env.NODE_ENV !== "production" && (Fi.displayName = "ClassNameConfiguratorContext");
function ll(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(Fi);
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
function cl(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function rt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ui(e) {
  if (!rt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Ui(e[n]);
  }), t;
}
function ze(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? w({}, e) : e;
  return rt(e) && rt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (rt(t[o]) && o in e && rt(e[o]) ? r[o] = ze(e[o], t[o], n) : n.clone ? r[o] = rt(t[o]) ? Ui(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
const ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ze,
  isPlainObject: rt
}, Symbol.toStringTag, { value: "Module" }));
function dl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function pl(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !dl(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const fl = Lt(s.elementType, pl), hl = "exact-prop: ​";
function qi(e) {
  return process.env.NODE_ENV === "production" ? e : w({}, e, {
    [hl]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function an(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
const ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: an
}, Symbol.toStringTag, { value: "Module" }));
var Rr = { exports: {} }, ae = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vo;
function gl() {
  if (Vo)
    return ae;
  Vo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function m(h) {
    if (typeof h == "object" && h !== null) {
      var E = h.$$typeof;
      switch (E) {
        case e:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case u:
            case d:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case a:
                case c:
                case p:
                case f:
                case i:
                  return h;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  return ae.ContextConsumer = a, ae.ContextProvider = i, ae.Element = e, ae.ForwardRef = c, ae.Fragment = n, ae.Lazy = p, ae.Memo = f, ae.Portal = t, ae.Profiler = o, ae.StrictMode = r, ae.Suspense = u, ae.SuspenseList = d, ae.isAsyncMode = function() {
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
    return m(h) === p;
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
    return m(h) === d;
  }, ae.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === u || h === d || h === b || typeof h == "object" && h !== null && (h.$$typeof === p || h.$$typeof === f || h.$$typeof === i || h.$$typeof === a || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
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
var Fo;
function bl() {
  return Fo || (Fo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, m = !1, h = !1, E = !1, $ = !1, y;
    y = Symbol.for("react.module.reference");
    function x(C) {
      return !!(typeof C == "string" || typeof C == "function" || C === n || C === o || $ || C === r || C === u || C === d || E || C === b || v || m || h || typeof C == "object" && C !== null && (C.$$typeof === p || C.$$typeof === f || C.$$typeof === i || C.$$typeof === a || C.$$typeof === c || // This needs to include all possible module reference object
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
            var ge = C.type;
            switch (ge) {
              case n:
              case o:
              case r:
              case u:
              case d:
                return ge;
              default:
                var Ee = ge && ge.$$typeof;
                switch (Ee) {
                  case l:
                  case a:
                  case c:
                  case p:
                  case f:
                  case i:
                    return Ee;
                  default:
                    return re;
                }
            }
          case t:
            return re;
        }
      }
    }
    var P = a, S = i, A = e, D = c, I = n, B = p, z = f, U = t, V = o, M = r, R = u, j = d, G = !1, ee = !1;
    function O(C) {
      return G || (G = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function _(C) {
      return ee || (ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function F(C) {
      return g(C) === a;
    }
    function X(C) {
      return g(C) === i;
    }
    function L(C) {
      return typeof C == "object" && C !== null && C.$$typeof === e;
    }
    function q(C) {
      return g(C) === c;
    }
    function H(C) {
      return g(C) === n;
    }
    function K(C) {
      return g(C) === p;
    }
    function W(C) {
      return g(C) === f;
    }
    function Y(C) {
      return g(C) === t;
    }
    function J(C) {
      return g(C) === o;
    }
    function ne(C) {
      return g(C) === r;
    }
    function N(C) {
      return g(C) === u;
    }
    function Z(C) {
      return g(C) === d;
    }
    le.ContextConsumer = P, le.ContextProvider = S, le.Element = A, le.ForwardRef = D, le.Fragment = I, le.Lazy = B, le.Memo = z, le.Portal = U, le.Profiler = V, le.StrictMode = M, le.Suspense = R, le.SuspenseList = j, le.isAsyncMode = O, le.isConcurrentMode = _, le.isContextConsumer = F, le.isContextProvider = X, le.isElement = L, le.isForwardRef = q, le.isFragment = H, le.isLazy = K, le.isMemo = W, le.isPortal = Y, le.isProfiler = J, le.isStrictMode = ne, le.isSuspense = N, le.isSuspenseList = Z, le.isValidElementType = x, le.typeOf = g;
  }()), le;
}
process.env.NODE_ENV === "production" ? Rr.exports = gl() : Rr.exports = bl();
var An = Rr.exports;
const vl = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Wi(e) {
  const t = `${e}`.match(vl);
  return t && t[1] || "";
}
function Hi(e, t = "") {
  return e.displayName || e.name || Wi(e) || t;
}
function zo(e, t, n) {
  const r = Hi(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function yl(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Hi(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case An.ForwardRef:
          return zo(e, e.render, "ForwardRef");
        case An.Memo:
          return zo(e, e.type, "memo");
        default:
          return;
      }
  }
}
const xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yl,
  getFunctionName: Wi
}, Symbol.toStringTag, { value: "Module" }));
function Ye(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], a = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const El = s.oneOfType([s.func, s.object]), zr = El;
function qe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : an(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qe
}, Symbol.toStringTag, { value: "Module" }));
function Nr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Gi(e, t = 166) {
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
function wl(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, a) => {
    const l = o || "<<anonymous>>", c = a || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Ol(e, t) {
  var n, r;
  return /* @__PURE__ */ T.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function ye(e) {
  return e && e.ownerDocument || document;
}
function Mt(e) {
  return ye(e).defaultView || window;
}
function Pl(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? w({}, t.propTypes) : null;
  return (o) => (i, a, l, c, u, ...d) => {
    const f = u || a, p = n == null ? void 0 : n[f];
    if (p) {
      const b = p(i, a, l, c, u, ...d);
      if (b)
        return b;
    }
    return typeof i[a] < "u" && !i[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Dn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Sl = typeof window < "u" ? T.useLayoutEffect : T.useEffect, bt = Sl;
let Uo = 0;
function kl(e) {
  const [t, n] = T.useState(e), r = e || t;
  return T.useEffect(() => {
    t == null && (Uo += 1, n(`mui-${Uo}`));
  }, [t]), r;
}
const qo = T["useId".toString()];
function Ki(e) {
  if (qo !== void 0) {
    const t = qo();
    return e ?? t;
  }
  return kl(e);
}
function Cl(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Xi({
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
function ln(e) {
  const t = T.useRef(e);
  return bt(() => {
    t.current = e;
  }), T.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function De(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Dn(n, t);
    });
  }, e);
}
let Hn = !0, $r = !1;
const Rl = new fn(), Nl = {
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
function $l(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Nl[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function _l(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Hn = !0);
}
function mr() {
  Hn = !1;
}
function Ml() {
  this.visibilityState === "hidden" && $r && (Hn = !0);
}
function Il(e) {
  e.addEventListener("keydown", _l, !0), e.addEventListener("mousedown", mr, !0), e.addEventListener("pointerdown", mr, !0), e.addEventListener("touchstart", mr, !0), e.addEventListener("visibilitychange", Ml, !0);
}
function Al(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Hn || $l(t);
}
function Yi() {
  const e = T.useCallback((o) => {
    o != null && Il(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function n() {
    return t.current ? ($r = !0, Rl.start(100, () => {
      $r = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Al(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Ji(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Dl(e) {
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
function jl(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Bl = Number.isInteger || jl;
function Zi(e, t, n, r) {
  const o = e[t];
  if (o == null || !Bl(o)) {
    const i = Dl(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Qi(e, t, ...n) {
  return e[t] === void 0 ? null : Zi(e, t, ...n);
}
function _r() {
  return null;
}
Qi.isRequired = Zi;
_r.isRequired = _r;
const es = process.env.NODE_ENV === "production" ? _r : Qi;
function ts(e, t) {
  const n = w({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = w({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = w({}, i), Object.keys(o).forEach((a) => {
        n[r][a] = ts(o[a], i[a]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function Qe(e, t, n = void 0) {
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
const Wo = (e) => e, Ll = () => {
  let e = Wo;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Wo;
    }
  };
}, Vl = Ll(), ns = Vl, rs = {
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
  const r = rs[t];
  return r ? `${n}-${r}` : `${ns.generate(e)}-${t}`;
}
function st(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = He(e, o, n);
  }), r;
}
function Fl(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
const zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fl
}, Symbol.toStringTag, { value: "Module" }));
function Ho(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Ul(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = ve(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = w({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = w({}, n, o, r);
    return b.length > 0 && (m.className = b), Object.keys(v).length > 0 && (m.style = v), {
      props: m,
      internalRef: void 0
    };
  }
  const a = zi(w({}, o, r)), l = Ho(r), c = Ho(o), u = t(a), d = ve(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = w({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), p = w({}, u, n, c, l);
  return d.length > 0 && (p.className = d), Object.keys(f).length > 0 && (p.style = f), {
    props: p,
    internalRef: u.ref
  };
}
const ql = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function vt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, a = ce(e, ql), l = i ? {} : cl(r, o), {
    props: c,
    internalRef: u
  } = Ul(w({}, a, {
    externalSlotProps: l
  })), d = De(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return en(n, w({}, c, {
    ref: d
  }), o);
}
var he = {}, os = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(os);
var Ur = os.exports;
const Wl = /* @__PURE__ */ it(ml), Hl = /* @__PURE__ */ it(zl);
var is = Ur;
Object.defineProperty(he, "__esModule", {
  value: !0
});
var jn = he.alpha = cs;
he.blend = oc;
he.colorChannel = void 0;
var Gl = he.darken = Wr;
he.decomposeColor = je;
he.emphasize = rc;
var Go = he.getContrastRatio = Ql;
he.getLuminance = Bn;
he.hexToRgb = ss;
he.hslToRgb = ls;
var Kl = he.lighten = Hr;
he.private_safeAlpha = ec;
he.private_safeColorChannel = void 0;
he.private_safeDarken = tc;
he.private_safeEmphasize = us;
he.private_safeLighten = nc;
he.recomposeColor = Vt;
he.rgbToHex = Zl;
var Ko = is(Wl), Xl = is(Hl);
function qr(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), (0, Xl.default)(e, t, n);
}
function ss(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Yl(e) {
  const t = e.toString(16);
  return t.length === 1 ? `0${t}` : t;
}
function je(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return je(ss(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : (0, Ko.default)(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : (0, Ko.default)(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
const as = (e) => {
  const t = je(e);
  return t.values.slice(0, 3).map((n, r) => t.type.indexOf("hsl") !== -1 && r !== 0 ? `${n}%` : n).join(" ");
};
he.colorChannel = as;
const Jl = (e, t) => {
  try {
    return as(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
he.private_safeColorChannel = Jl;
function Vt(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Zl(e) {
  if (e.indexOf("#") === 0)
    return e;
  const {
    values: t
  } = je(e);
  return `#${t.map((n, r) => Yl(r === 3 ? Math.round(255 * n) : n)).join("")}`;
}
function ls(e) {
  e = je(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), a = (u, d = (u + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Vt({
    type: l,
    values: c
  });
}
function Bn(e) {
  e = je(e);
  let t = e.type === "hsl" || e.type === "hsla" ? je(ls(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ql(e, t) {
  const n = Bn(e), r = Bn(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function cs(e, t) {
  return e = je(e), t = qr(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Vt(e);
}
function ec(e, t, n) {
  try {
    return cs(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Wr(e, t) {
  if (e = je(e), t = qr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Vt(e);
}
function tc(e, t, n) {
  try {
    return Wr(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Hr(e, t) {
  if (e = je(e), t = qr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Vt(e);
}
function nc(e, t, n) {
  try {
    return Hr(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function rc(e, t = 0.15) {
  return Bn(e) > 0.5 ? Wr(e, t) : Hr(e, t);
}
function us(e, t, n) {
  try {
    return us(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function oc(e, t, n, r = 1) {
  const o = (c, u) => Math.round((c ** (1 / r) * (1 - n) + u ** (1 / r) * n) ** r), i = je(e), a = je(t), l = [o(i.values[0], a.values[0]), o(i.values[1], a.values[1]), o(i.values[2], a.values[2])];
  return Vt({
    type: "rgb",
    values: l
  });
}
const ic = /* @__PURE__ */ T.createContext();
process.env.NODE_ENV !== "production" && (s.node, s.bool);
const ds = () => {
  const e = T.useContext(ic);
  return e ?? !1;
};
var mn = {}, gr = { exports: {} }, Xo;
function sc() {
  return Xo || (Xo = 1, function(e) {
    function t() {
      return e.exports = t = Object.assign ? Object.assign.bind() : function(n) {
        for (var r = 1; r < arguments.length; r++) {
          var o = arguments[r];
          for (var i in o)
            Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }
        return n;
      }, e.exports.__esModule = !0, e.exports.default = e.exports, t.apply(this, arguments);
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(gr)), gr.exports;
}
var br = { exports: {} }, Yo;
function ac() {
  return Yo || (Yo = 1, function(e) {
    function t(n, r) {
      if (n == null)
        return {};
      var o = {}, i = Object.keys(n), a, l;
      for (l = 0; l < i.length; l++)
        a = i[l], !(r.indexOf(a) >= 0) && (o[a] = n[a]);
      return o;
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(br)), br.exports;
}
const lc = /* @__PURE__ */ it(ul), cc = /* @__PURE__ */ it(Tl), uc = /* @__PURE__ */ it(xl), dc = ["values", "unit", "step"], pc = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => w({}, n, {
    [r.key]: r.val
  }), {});
};
function ps(e) {
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
  } = e, o = ce(e, dc), i = pc(t), a = Object.keys(i);
  function l(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n})`;
  }
  function c(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${n})`;
  }
  function u(p, b) {
    const v = a.indexOf(b);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n}) and (max-width:${(v !== -1 && typeof t[a[v]] == "number" ? t[a[v]] : b) - r / 100}${n})`;
  }
  function d(p) {
    return a.indexOf(p) + 1 < a.length ? u(p, a[a.indexOf(p) + 1]) : l(p);
  }
  function f(p) {
    const b = a.indexOf(p);
    return b === 0 ? l(a[1]) : b === a.length - 1 ? c(a[b]) : u(p, a[a.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return w({
    keys: a,
    values: i,
    up: l,
    down: c,
    between: u,
    only: d,
    not: f,
    unit: n
  }, o);
}
const fc = {
  borderRadius: 4
}, hc = fc, mc = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, at = mc;
function nn(e, t) {
  return t ? ze(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Gr = {
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
}, Jo = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Gr[e]}px)`
};
function Je(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Jo;
    return t.reduce((a, l, c) => (a[i.up(i.keys[c])] = n(t[c]), a), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Jo;
    return Object.keys(t).reduce((a, l) => {
      if (Object.keys(i.values || Gr).indexOf(l) !== -1) {
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
function gc(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function bc(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Gn(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Ln(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Gn(e, n) || r, t && (o = t(o, r, e)), o;
}
function me(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (a) => {
    if (a[t] == null)
      return null;
    const l = a[t], c = a.theme, u = Gn(c, r) || {};
    return Je(a, l, (f) => {
      let p = Ln(u, o, f);
      return f === p && typeof f == "string" && (p = Ln(u, o, `${t}${f === "default" ? "" : qe(f)}`, f)), n === !1 ? p : {
        [n]: p
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: at
  } : {}, i.filterProps = [t], i;
}
function vc(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const yc = {
  m: "margin",
  p: "padding"
}, xc = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Zo = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Ec = vc((e) => {
  if (e.length > 2)
    if (Zo[e])
      e = Zo[e];
    else
      return [e];
  const [t, n] = e.split(""), r = yc[t], o = xc[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Kn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Xn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Tc = [...Kn, ...Xn];
function gn(e, t, n, r) {
  var o;
  const i = (o = Gn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function fs(e) {
  return gn(e, "spacing", 8, "spacing");
}
function bn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function wc(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = bn(t, n), r), {});
}
function Oc(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Ec(n), i = wc(o, r), a = e[n];
  return Je(e, a, i);
}
function hs(e, t) {
  const n = fs(e.theme);
  return Object.keys(e).map((r) => Oc(e, t, r, n)).reduce(nn, {});
}
function de(e) {
  return hs(e, Kn);
}
de.propTypes = process.env.NODE_ENV !== "production" ? Kn.reduce((e, t) => (e[t] = at, e), {}) : {};
de.filterProps = Kn;
function pe(e) {
  return hs(e, Xn);
}
pe.propTypes = process.env.NODE_ENV !== "production" ? Xn.reduce((e, t) => (e[t] = at, e), {}) : {};
pe.filterProps = Xn;
process.env.NODE_ENV !== "production" && Tc.reduce((e, t) => (e[t] = at, e), {});
function Pc(e = 8) {
  if (e.mui)
    return e;
  const t = fs({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const a = t(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return n.mui = !0, n;
}
function Yn(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? nn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Ie(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ve(e, t) {
  return me({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Sc = Ve("border", Ie), kc = Ve("borderTop", Ie), Cc = Ve("borderRight", Ie), Rc = Ve("borderBottom", Ie), Nc = Ve("borderLeft", Ie), $c = Ve("borderColor"), _c = Ve("borderTopColor"), Mc = Ve("borderRightColor"), Ic = Ve("borderBottomColor"), Ac = Ve("borderLeftColor"), Dc = Ve("outline", Ie), jc = Ve("outlineColor"), Jn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = gn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: bn(t, r)
    });
    return Je(e, e.borderRadius, n);
  }
  return null;
};
Jn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: at
} : {};
Jn.filterProps = ["borderRadius"];
Yn(Sc, kc, Cc, Rc, Nc, $c, _c, Mc, Ic, Ac, Jn, Dc, jc);
const Zn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = gn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: bn(t, r)
    });
    return Je(e, e.gap, n);
  }
  return null;
};
Zn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: at
} : {};
Zn.filterProps = ["gap"];
const Qn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = gn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: bn(t, r)
    });
    return Je(e, e.columnGap, n);
  }
  return null;
};
Qn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: at
} : {};
Qn.filterProps = ["columnGap"];
const er = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = gn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: bn(t, r)
    });
    return Je(e, e.rowGap, n);
  }
  return null;
};
er.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: at
} : {};
er.filterProps = ["rowGap"];
const Bc = me({
  prop: "gridColumn"
}), Lc = me({
  prop: "gridRow"
}), Vc = me({
  prop: "gridAutoFlow"
}), Fc = me({
  prop: "gridAutoColumns"
}), zc = me({
  prop: "gridAutoRows"
}), Uc = me({
  prop: "gridTemplateColumns"
}), qc = me({
  prop: "gridTemplateRows"
}), Wc = me({
  prop: "gridTemplateAreas"
}), Hc = me({
  prop: "gridArea"
});
Yn(Zn, Qn, er, Bc, Lc, Vc, Fc, zc, Uc, qc, Wc, Hc);
function _t(e, t) {
  return t === "grey" ? t : e;
}
const Gc = me({
  prop: "color",
  themeKey: "palette",
  transform: _t
}), Kc = me({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: _t
}), Xc = me({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: _t
});
Yn(Gc, Kc, Xc);
function Ne(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Yc = me({
  prop: "width",
  transform: Ne
}), Kr = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Gr[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Ne(n)
      };
    };
    return Je(e, e.maxWidth, t);
  }
  return null;
};
Kr.filterProps = ["maxWidth"];
const Jc = me({
  prop: "minWidth",
  transform: Ne
}), Zc = me({
  prop: "height",
  transform: Ne
}), Qc = me({
  prop: "maxHeight",
  transform: Ne
}), eu = me({
  prop: "minHeight",
  transform: Ne
});
me({
  prop: "size",
  cssProperty: "width",
  transform: Ne
});
me({
  prop: "size",
  cssProperty: "height",
  transform: Ne
});
const tu = me({
  prop: "boxSizing"
});
Yn(Yc, Kr, Jc, Zc, Qc, eu, tu);
const nu = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ie
  },
  borderTop: {
    themeKey: "borders",
    transform: Ie
  },
  borderRight: {
    themeKey: "borders",
    transform: Ie
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ie
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ie
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
    transform: Ie
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Jn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: _t
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: _t
  },
  backgroundColor: {
    themeKey: "palette",
    transform: _t
  },
  // spacing
  p: {
    style: pe
  },
  pt: {
    style: pe
  },
  pr: {
    style: pe
  },
  pb: {
    style: pe
  },
  pl: {
    style: pe
  },
  px: {
    style: pe
  },
  py: {
    style: pe
  },
  padding: {
    style: pe
  },
  paddingTop: {
    style: pe
  },
  paddingRight: {
    style: pe
  },
  paddingBottom: {
    style: pe
  },
  paddingLeft: {
    style: pe
  },
  paddingX: {
    style: pe
  },
  paddingY: {
    style: pe
  },
  paddingInline: {
    style: pe
  },
  paddingInlineStart: {
    style: pe
  },
  paddingInlineEnd: {
    style: pe
  },
  paddingBlock: {
    style: pe
  },
  paddingBlockStart: {
    style: pe
  },
  paddingBlockEnd: {
    style: pe
  },
  m: {
    style: de
  },
  mt: {
    style: de
  },
  mr: {
    style: de
  },
  mb: {
    style: de
  },
  ml: {
    style: de
  },
  mx: {
    style: de
  },
  my: {
    style: de
  },
  margin: {
    style: de
  },
  marginTop: {
    style: de
  },
  marginRight: {
    style: de
  },
  marginBottom: {
    style: de
  },
  marginLeft: {
    style: de
  },
  marginX: {
    style: de
  },
  marginY: {
    style: de
  },
  marginInline: {
    style: de
  },
  marginInlineStart: {
    style: de
  },
  marginInlineEnd: {
    style: de
  },
  marginBlock: {
    style: de
  },
  marginBlockStart: {
    style: de
  },
  marginBlockEnd: {
    style: de
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
    style: Zn
  },
  rowGap: {
    style: er
  },
  columnGap: {
    style: Qn
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
    transform: Ne
  },
  maxWidth: {
    style: Kr
  },
  minWidth: {
    transform: Ne
  },
  height: {
    transform: Ne
  },
  maxHeight: {
    transform: Ne
  },
  minHeight: {
    transform: Ne
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
}, vn = nu;
function ru(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function ou(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ms() {
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
      transform: d,
      style: f
    } = l;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const p = Gn(o, u) || {};
    return f ? f(a) : Je(a, r, (v) => {
      let m = Ln(p, d, v);
      return v === m && typeof v == "string" && (m = Ln(p, d, `${n}${v === "default" ? "" : qe(v)}`, v)), c === !1 ? m : {
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
    const a = (r = i.unstable_sxConfig) != null ? r : vn;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const d = gc(i.breakpoints), f = Object.keys(d);
      let p = d;
      return Object.keys(u).forEach((b) => {
        const v = ou(u[b], i);
        if (v != null)
          if (typeof v == "object")
            if (a[b])
              p = nn(p, e(b, v, i, a));
            else {
              const m = Je({
                theme: i
              }, v, (h) => ({
                [b]: h
              }));
              ru(m, v) ? p[b] = t({
                sx: v,
                theme: i
              }) : p = nn(p, m);
            }
          else
            p = nn(p, e(b, v, i, a));
      }), bc(f, p);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const gs = ms();
gs.filterProps = ["sx"];
const Xr = gs;
function bs(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const iu = ["breakpoints", "palette", "spacing", "shape"];
function Yr(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, a = ce(e, iu), l = ps(n), c = Pc(o);
  let u = ze({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: w({
      mode: "light"
    }, r),
    spacing: c,
    shape: w({}, hc, i)
  }, a);
  return u.applyStyles = bs, u = t.reduce((d, f) => ze(d, f), u), u.unstable_sxConfig = w({}, vn, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(f) {
    return Xr({
      sx: f,
      theme: this
    });
  }, u;
}
const su = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yr,
  private_createBreakpoints: ps,
  unstable_applyStyles: bs
}, Symbol.toStringTag, { value: "Module" })), au = /* @__PURE__ */ it(su), lu = ["sx"], cu = (e) => {
  var t, n;
  const r = {
    systemProps: {},
    otherProps: {}
  }, o = (t = e == null || (n = e.theme) == null ? void 0 : n.unstable_sxConfig) != null ? t : vn;
  return Object.keys(e).forEach((i) => {
    o[i] ? r.systemProps[i] = e[i] : r.otherProps[i] = e[i];
  }), r;
};
function uu(e) {
  const {
    sx: t
  } = e, n = ce(e, lu), {
    systemProps: r,
    otherProps: o
  } = cu(n);
  let i;
  return Array.isArray(t) ? i = [r, ...t] : typeof t == "function" ? i = (...a) => {
    const l = t(...a);
    return rt(l) ? w({}, r, l) : r;
  } : i = w({}, r, t), w({}, o, {
    sx: i
  });
}
const du = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xr,
  extendSxProp: uu,
  unstable_createStyleFunctionSx: ms,
  unstable_defaultSxConfig: vn
}, Symbol.toStringTag, { value: "Module" })), pu = /* @__PURE__ */ it(du);
var Ft = Ur;
Object.defineProperty(mn, "__esModule", {
  value: !0
});
var fu = mn.default = ku;
mn.shouldForwardProp = $n;
mn.systemDefaultTheme = void 0;
var Me = Ft(sc()), Mr = Ft(ac()), Qo = Tu(Ii), hu = lc, mu = Ft(cc), gu = Ft(uc), bu = Ft(au), vu = Ft(pu);
const yu = ["ownerState"], xu = ["variants"], Eu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function vs(e) {
  if (typeof WeakMap != "function")
    return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (vs = function(r) {
    return r ? n : t;
  })(e);
}
function Tu(e, t) {
  if (!t && e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var n = vs(t);
  if (n && n.has(e))
    return n.get(e);
  var r = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
      var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
      a && (a.get || a.set) ? Object.defineProperty(r, i, a) : r[i] = e[i];
    }
  return r.default = e, n && n.set(e, r), r;
}
function wu(e) {
  return Object.keys(e).length === 0;
}
function Ou(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function $n(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Pu = mn.systemDefaultTheme = (0, bu.default)(), ei = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function kn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return wu(t) ? e : t[n] || t;
}
function Su(e) {
  return e ? (t, n) => n[e] : null;
}
function _n(e, t) {
  let {
    ownerState: n
  } = t, r = (0, Mr.default)(t, yu);
  const o = typeof e == "function" ? e((0, Me.default)({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => _n(i, (0, Me.default)({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = (0, Mr.default)(o, xu);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props((0, Me.default)({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== c.props[d] && r[d] !== c.props[d] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style((0, Me.default)({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function ku(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Pu,
    rootShouldForwardProp: r = $n,
    slotShouldForwardProp: o = $n
  } = e, i = (a) => (0, vu.default)((0, Me.default)({}, a, {
    theme: kn((0, Me.default)({}, a, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    (0, Qo.internal_processStyles)(a, (g) => g.filter((P) => !(P != null && P.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = Su(ei(u))
    } = l, b = (0, Mr.default)(l, Eu), v = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), m = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${ei(u || "Root")}`);
    let E = $n;
    u === "Root" || u === "root" ? E = r : u ? E = o : Ou(a) && (E = void 0);
    const $ = (0, Qo.default)(a, (0, Me.default)({
      shouldForwardProp: E,
      label: h
    }, b)), y = (g) => typeof g == "function" && g.__emotion_real !== g || (0, hu.isPlainObject)(g) ? (P) => _n(g, (0, Me.default)({}, P, {
      theme: kn({
        theme: P.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : g, x = (g, ...P) => {
      let S = y(g);
      const A = P ? P.map(y) : [];
      c && p && A.push((B) => {
        const z = kn((0, Me.default)({}, B, {
          defaultTheme: n,
          themeId: t
        }));
        if (!z.components || !z.components[c] || !z.components[c].styleOverrides)
          return null;
        const U = z.components[c].styleOverrides, V = {};
        return Object.entries(U).forEach(([M, R]) => {
          V[M] = _n(R, (0, Me.default)({}, B, {
            theme: z
          }));
        }), p(B, V);
      }), c && !v && A.push((B) => {
        var z;
        const U = kn((0, Me.default)({}, B, {
          defaultTheme: n,
          themeId: t
        })), V = U == null || (z = U.components) == null || (z = z[c]) == null ? void 0 : z.variants;
        return _n({
          variants: V
        }, (0, Me.default)({}, B, {
          theme: U
        }));
      }), m || A.push(i);
      const D = A.length - P.length;
      if (Array.isArray(g) && D > 0) {
        const B = new Array(D).fill("");
        S = [...g, ...B], S.raw = [...g.raw, ...B];
      }
      const I = $(S, ...A);
      if (process.env.NODE_ENV !== "production") {
        let B;
        c && (B = `${c}${(0, mu.default)(u || "")}`), B === void 0 && (B = `Styled(${(0, gu.default)(a)})`), I.displayName = B;
      }
      return a.muiName && (I.muiName = a.muiName), I;
    };
    return $.withConfig && (x.withConfig = $.withConfig), x;
  };
}
function Cu(e, t) {
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
const Ru = {
  black: "#000",
  white: "#fff"
}, cn = Ru, Nu = {
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
}, $u = Nu, _u = {
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
}, wt = _u, Mu = {
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
}, Ot = Mu, Iu = {
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
}, Kt = Iu, Au = {
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
}, Pt = Au, Du = {
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
}, St = Du, ju = {
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
}, kt = ju, Bu = ["mode", "contrastThreshold", "tonalOffset"], ti = {
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
    paper: cn.white,
    default: cn.white
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
}, vr = {
  text: {
    primary: cn.white,
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
    active: cn.white,
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
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Kl(e.main, o) : t === "dark" && (e.dark = Gl(e.main, i)));
}
function Lu(e = "light") {
  return e === "dark" ? {
    main: Pt[200],
    light: Pt[50],
    dark: Pt[400]
  } : {
    main: Pt[700],
    light: Pt[400],
    dark: Pt[800]
  };
}
function Vu(e = "light") {
  return e === "dark" ? {
    main: wt[200],
    light: wt[50],
    dark: wt[400]
  } : {
    main: wt[500],
    light: wt[300],
    dark: wt[700]
  };
}
function Fu(e = "light") {
  return e === "dark" ? {
    main: Ot[500],
    light: Ot[300],
    dark: Ot[700]
  } : {
    main: Ot[700],
    light: Ot[400],
    dark: Ot[800]
  };
}
function zu(e = "light") {
  return e === "dark" ? {
    main: St[400],
    light: St[300],
    dark: St[700]
  } : {
    main: St[700],
    light: St[500],
    dark: St[900]
  };
}
function Uu(e = "light") {
  return e === "dark" ? {
    main: kt[400],
    light: kt[300],
    dark: kt[700]
  } : {
    main: kt[800],
    light: kt[500],
    dark: kt[900]
  };
}
function qu(e = "light") {
  return e === "dark" ? {
    main: Kt[400],
    light: Kt[300],
    dark: Kt[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Kt[500],
    dark: Kt[900]
  };
}
function Wu(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ce(e, Bu), i = e.primary || Lu(t), a = e.secondary || Vu(t), l = e.error || Fu(t), c = e.info || zu(t), u = e.success || Uu(t), d = e.warning || qu(t);
  function f(m) {
    const h = Go(m, vr.text.primary) >= n ? vr.text.primary : ti.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = Go(m, h);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const p = ({
    color: m,
    name: h,
    mainShade: E = 500,
    lightShade: $ = 300,
    darkShade: y = 700
  }) => {
    if (m = w({}, m), !m.main && m[E] && (m.main = m[E]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : an(11, h ? ` (${h})` : "", E));
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
} });` : an(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return ni(m, "light", $, r), ni(m, "dark", y, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, b = {
    dark: vr,
    light: ti
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), ze(w({
    // A collection of common colors.
    common: w({}, cn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: p({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: p({
      color: a,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: p({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: p({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: p({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: p({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: $u,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, b[t]), o);
}
const Hu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Gu(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ri = {
  textTransform: "uppercase"
}, oi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ku(e, t) {
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
    allVariants: d,
    pxToRem: f
  } = n, p = ce(n, Hu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = f || ((E) => `${E / u * b}rem`), m = (E, $, y, x, g) => w({
    fontFamily: r,
    fontWeight: E,
    fontSize: v($),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: y
  }, r === oi ? {
    letterSpacing: `${Gu(x / $)}em`
  } : {}, g, d), h = {
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
  return ze(w({
    htmlFontSize: u,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), p, {
    clone: !1
    // No need to clone deep
  });
}
const Xu = 0.2, Yu = 0.14, Ju = 0.12;
function ue(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Xu})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Yu})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ju})`].join(",");
}
const Zu = ["none", ue(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ue(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ue(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ue(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ue(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ue(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ue(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ue(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ue(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ue(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ue(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ue(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ue(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ue(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ue(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ue(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ue(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ue(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ue(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ue(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ue(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ue(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ue(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ue(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Qu = Zu, ed = ["duration", "easing", "delay"], td = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, nd = {
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
function rd(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function od(e) {
  const t = w({}, td, e.easing), n = w({}, nd, e.duration);
  return w({
    getAutoHeightDuration: rd,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = ce(i, ed);
      if (process.env.NODE_ENV !== "production") {
        const d = (p) => typeof p == "string", f = (p) => !isNaN(parseFloat(p));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(a) && !d(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof a == "string" ? a : ii(a)} ${l} ${typeof c == "string" ? c : ii(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const id = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, sd = id, ad = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function ld(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = ce(e, ad);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : an(18));
  const l = Wu(r), c = Yr(e);
  let u = ze(c, {
    mixins: Cu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Qu.slice(),
    typography: Ku(l, i),
    transitions: od(o),
    zIndex: w({}, sd)
  });
  if (u = ze(u, a), u = t.reduce((d, f) => ze(d, f), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (p, b) => {
      let v;
      for (v in p) {
        const m = p[v];
        if (d.indexOf(v) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = He("", v);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[v] = {};
        }
      }
    };
    Object.keys(u.components).forEach((p) => {
      const b = u.components[p].styleOverrides;
      b && p.indexOf("Mui") === 0 && f(b, p);
    });
  }
  return u.unstable_sxConfig = w({}, vn, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(f) {
    return Xr({
      sx: f,
      theme: this
    });
  }, u;
}
const cd = ld(), Jr = cd, Zr = "$$material";
function ud(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const dd = (e) => ud(e) && e !== "classes", ys = dd, pd = fu({
  themeId: Zr,
  defaultTheme: Jr,
  rootShouldForwardProp: ys
}), xe = pd;
function fd(e) {
  return Object.keys(e).length === 0;
}
function hd(e = null) {
  const t = T.useContext(Ba);
  return !t || fd(t) ? e : t;
}
const md = Yr();
function xs(e = md) {
  return hd(e);
}
function gd(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : ts(t.components[n].defaultProps, r);
}
function bd({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = xs(n);
  return r && (o = o[r] || o), gd({
    theme: o,
    name: t,
    props: e
  });
}
function tr() {
  const e = xs(Jr);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[Zr] || e;
}
function et({
  props: e,
  name: t
}) {
  return bd({
    props: e,
    name: t,
    defaultTheme: Jr,
    themeId: Zr
  });
}
function Ir(e, t) {
  return Ir = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Ir(e, t);
}
function vd(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ir(e, t);
}
const si = {
  disabled: !1
};
var yd = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const Es = ft.createContext(null);
var xd = function(t) {
  return t.scrollTop;
}, tn = "unmounted", dt = "exited", pt = "entering", Nt = "entered", Ar = "exiting", tt = /* @__PURE__ */ function(e) {
  vd(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var a = o, l = a && !a.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = dt, i.appearStatus = pt) : c = Nt : r.unmountOnExit || r.mountOnEnter ? c = tn : c = dt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === tn ? {
      status: dt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== pt && a !== Nt && (i = pt) : (a === pt || a === Nt) && (i = Ar);
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
      if (this.cancelNextCallback(), i === pt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : Pn.findDOMNode(this);
          a && xd(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === dt && this.setState({
        status: tn
      });
  }, n.performEnter = function(o) {
    var i = this, a = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Pn.findDOMNode(this), l], u = c[0], d = c[1], f = this.getTimeouts(), p = l ? f.appear : f.enter;
    if (!o && !a || si.disabled) {
      this.safeSetState({
        status: Nt
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: pt
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(p, function() {
        i.safeSetState({
          status: Nt
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Pn.findDOMNode(this);
    if (!i || si.disabled) {
      this.safeSetState({
        status: dt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Ar
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(a.exit, function() {
        o.safeSetState({
          status: dt
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
    var a = this.props.nodeRef ? this.props.nodeRef.current : Pn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!a || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback], u = c[0], d = c[1];
      this.props.addEndListener(u, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === tn)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = ce(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ ft.createElement(Es.Provider, {
        value: null
      }, typeof a == "function" ? a(o, l) : ft.cloneElement(ft.Children.only(a), l))
    );
  }, t;
}(ft.Component);
tt.contextType = Es;
tt.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var n = yd;
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
function Ct() {
}
tt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ct,
  onEntering: Ct,
  onEntered: Ct,
  onExit: Ct,
  onExiting: Ct,
  onExited: Ct
};
tt.UNMOUNTED = tn;
tt.EXITED = dt;
tt.ENTERING = pt;
tt.ENTERED = Nt;
tt.EXITING = Ar;
const Ts = tt, ws = (e) => e.scrollTop;
function Vn(e, t) {
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
const Ed = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Dr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Td = {
  entering: {
    opacity: 1,
    transform: Dr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, yr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Qr = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: a,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: d,
    onExit: f,
    onExited: p,
    onExiting: b,
    style: v,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = Ts
  } = t, E = ce(t, Ed), $ = Qt(), y = T.useRef(), x = tr(), g = T.useRef(null), P = De(g, i.ref, n), S = (M) => (R) => {
    if (M) {
      const j = g.current;
      R === void 0 ? M(j) : M(j, R);
    }
  }, A = S(d), D = S((M, R) => {
    ws(M);
    const {
      duration: j,
      delay: G,
      easing: ee
    } = Vn({
      style: v,
      timeout: m,
      easing: a
    }, {
      mode: "enter"
    });
    let O;
    m === "auto" ? (O = x.transitions.getAutoHeightDuration(M.clientHeight), y.current = O) : O = j, M.style.transition = [x.transitions.create("opacity", {
      duration: O,
      delay: G
    }), x.transitions.create("transform", {
      duration: yr ? O : O * 0.666,
      delay: G,
      easing: ee
    })].join(","), c && c(M, R);
  }), I = S(u), B = S(b), z = S((M) => {
    const {
      duration: R,
      delay: j,
      easing: G
    } = Vn({
      style: v,
      timeout: m,
      easing: a
    }, {
      mode: "exit"
    });
    let ee;
    m === "auto" ? (ee = x.transitions.getAutoHeightDuration(M.clientHeight), y.current = ee) : ee = R, M.style.transition = [x.transitions.create("opacity", {
      duration: ee,
      delay: j
    }), x.transitions.create("transform", {
      duration: yr ? ee : ee * 0.666,
      delay: yr ? j : j || ee * 0.333,
      easing: G
    })].join(","), M.style.opacity = 0, M.style.transform = Dr(0.75), f && f(M);
  }), U = S(p);
  return /* @__PURE__ */ k(h, w({
    appear: o,
    in: l,
    nodeRef: g,
    onEnter: D,
    onEntered: I,
    onEntering: A,
    onExit: z,
    onExited: U,
    onExiting: B,
    addEndListener: (M) => {
      m === "auto" && $.start(y.current || 0, M), r && r(g.current, M);
    },
    timeout: m === "auto" ? null : m
  }, E, {
    children: (M, R) => /* @__PURE__ */ T.cloneElement(i, w({
      style: w({
        opacity: 0,
        transform: Dr(0.75),
        visibility: M === "exited" && !l ? "hidden" : void 0
      }, Td[M], v, i.props.style),
      ref: P
    }, R))
  }));
});
process.env.NODE_ENV !== "production" && (Qr.propTypes = {
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
  children: hn.isRequired,
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
Qr.muiSupportAuto = !0;
const jr = Qr;
var Oe = "top", Be = "bottom", Le = "right", Pe = "left", eo = "auto", yn = [Oe, Be, Le, Pe], It = "start", un = "end", wd = "clippingParents", Os = "viewport", Xt = "popper", Od = "reference", ai = /* @__PURE__ */ yn.reduce(function(e, t) {
  return e.concat([t + "-" + It, t + "-" + un]);
}, []), Ps = /* @__PURE__ */ [].concat(yn, [eo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + It, t + "-" + un]);
}, []), Pd = "beforeRead", Sd = "read", kd = "afterRead", Cd = "beforeMain", Rd = "main", Nd = "afterMain", $d = "beforeWrite", _d = "write", Md = "afterWrite", Id = [Pd, Sd, kd, Cd, Rd, Nd, $d, _d, Md];
function We(e) {
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
function yt(e) {
  var t = $e(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ae(e) {
  var t = $e(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function to(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = $e(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Ad(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ae(i) || !We(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? i.removeAttribute(a) : i.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function Dd(e) {
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
      !Ae(o) || !We(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const jd = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ad,
  effect: Dd,
  requires: ["computeStyles"]
};
function Ue(e) {
  return e.split("-")[0];
}
var gt = Math.max, Fn = Math.min, At = Math.round;
function Br() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ss() {
  return !/^((?!chrome|android).)*safari/i.test(Br());
}
function Dt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ae(e) && (o = e.offsetWidth > 0 && At(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && At(r.height) / e.offsetHeight || 1);
  var a = yt(e) ? $e(e) : window, l = a.visualViewport, c = !Ss() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, d = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, p = r.height / i;
  return {
    width: f,
    height: p,
    top: d,
    right: u + f,
    bottom: d + p,
    left: u,
    x: u,
    y: d
  };
}
function no(e) {
  var t = Dt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ks(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && to(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ze(e) {
  return $e(e).getComputedStyle(e);
}
function Bd(e) {
  return ["table", "td", "th"].indexOf(We(e)) >= 0;
}
function lt(e) {
  return ((yt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function nr(e) {
  return We(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (to(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    lt(e)
  );
}
function li(e) {
  return !Ae(e) || // https://github.com/popperjs/popper-core/issues/837
  Ze(e).position === "fixed" ? null : e.offsetParent;
}
function Ld(e) {
  var t = /firefox/i.test(Br()), n = /Trident/i.test(Br());
  if (n && Ae(e)) {
    var r = Ze(e);
    if (r.position === "fixed")
      return null;
  }
  var o = nr(e);
  for (to(o) && (o = o.host); Ae(o) && ["html", "body"].indexOf(We(o)) < 0; ) {
    var i = Ze(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function xn(e) {
  for (var t = $e(e), n = li(e); n && Bd(n) && Ze(n).position === "static"; )
    n = li(n);
  return n && (We(n) === "html" || We(n) === "body" && Ze(n).position === "static") ? t : n || Ld(e) || t;
}
function ro(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function rn(e, t, n) {
  return gt(e, Fn(t, n));
}
function Vd(e, t, n) {
  var r = rn(e, t, n);
  return r > n ? n : r;
}
function Cs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Rs(e) {
  return Object.assign({}, Cs(), e);
}
function Ns(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Fd = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Rs(typeof t != "number" ? t : Ns(t, yn));
};
function zd(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, l = Ue(n.placement), c = ro(l), u = [Pe, Le].indexOf(l) >= 0, d = u ? "height" : "width";
  if (!(!i || !a)) {
    var f = Fd(o.padding, n), p = no(i), b = c === "y" ? Oe : Pe, v = c === "y" ? Be : Le, m = n.rects.reference[d] + n.rects.reference[c] - a[c] - n.rects.popper[d], h = a[c] - n.rects.reference[c], E = xn(i), $ = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, y = m / 2 - h / 2, x = f[b], g = $ - p[d] - f[v], P = $ / 2 - p[d] / 2 + y, S = rn(x, P, g), A = c;
    n.modifiersData[r] = (t = {}, t[A] = S, t.centerOffset = S - P, t);
  }
}
function Ud(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ks(t.elements.popper, o) && (t.elements.arrow = o));
}
const qd = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: zd,
  effect: Ud,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function jt(e) {
  return e.split("-")[1];
}
var Wd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Hd(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: At(n * o) / o || 0,
    y: At(r * o) / o || 0
  };
}
function ci(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, a = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, f = e.isFixed, p = a.x, b = p === void 0 ? 0 : p, v = a.y, m = v === void 0 ? 0 : v, h = typeof d == "function" ? d({
    x: b,
    y: m
  }) : {
    x: b,
    y: m
  };
  b = h.x, m = h.y;
  var E = a.hasOwnProperty("x"), $ = a.hasOwnProperty("y"), y = Pe, x = Oe, g = window;
  if (u) {
    var P = xn(n), S = "clientHeight", A = "clientWidth";
    if (P === $e(n) && (P = lt(n), Ze(P).position !== "static" && l === "absolute" && (S = "scrollHeight", A = "scrollWidth")), P = P, o === Oe || (o === Pe || o === Le) && i === un) {
      x = Be;
      var D = f && P === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        P[S]
      );
      m -= D - r.height, m *= c ? 1 : -1;
    }
    if (o === Pe || (o === Oe || o === Be) && i === un) {
      y = Le;
      var I = f && P === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        P[A]
      );
      b -= I - r.width, b *= c ? 1 : -1;
    }
  }
  var B = Object.assign({
    position: l
  }, u && Wd), z = d === !0 ? Hd({
    x: b,
    y: m
  }, $e(n)) : {
    x: b,
    y: m
  };
  if (b = z.x, m = z.y, c) {
    var U;
    return Object.assign({}, B, (U = {}, U[x] = $ ? "0" : "", U[y] = E ? "0" : "", U.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + m + "px)" : "translate3d(" + b + "px, " + m + "px, 0)", U));
  }
  return Object.assign({}, B, (t = {}, t[x] = $ ? m + "px" : "", t[y] = E ? b + "px" : "", t.transform = "", t));
}
function Gd(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, a = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ue(t.placement),
    variation: jt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ci(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ci(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Kd = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Gd,
  data: {}
};
var Cn = {
  passive: !0
};
function Xd(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, a = r.resize, l = a === void 0 ? !0 : a, c = $e(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, Cn);
  }), l && c.addEventListener("resize", n.update, Cn), function() {
    i && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Cn);
    }), l && c.removeEventListener("resize", n.update, Cn);
  };
}
const Yd = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Xd,
  data: {}
};
var Jd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Mn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Jd[t];
  });
}
var Zd = {
  start: "end",
  end: "start"
};
function ui(e) {
  return e.replace(/start|end/g, function(t) {
    return Zd[t];
  });
}
function oo(e) {
  var t = $e(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function io(e) {
  return Dt(lt(e)).left + oo(e).scrollLeft;
}
function Qd(e, t) {
  var n = $e(e), r = lt(e), o = n.visualViewport, i = r.clientWidth, a = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, a = o.height;
    var u = Ss();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: l + io(e),
    y: c
  };
}
function ep(e) {
  var t, n = lt(e), r = oo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = gt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = gt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + io(e), c = -r.scrollTop;
  return Ze(o || n).direction === "rtl" && (l += gt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function so(e) {
  var t = Ze(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function $s(e) {
  return ["html", "body", "#document"].indexOf(We(e)) >= 0 ? e.ownerDocument.body : Ae(e) && so(e) ? e : $s(nr(e));
}
function on(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = $s(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = $e(r), a = o ? [i].concat(i.visualViewport || [], so(r) ? r : []) : r, l = t.concat(a);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(on(nr(a)))
  );
}
function Lr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function tp(e, t) {
  var n = Dt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function di(e, t, n) {
  return t === Os ? Lr(Qd(e, n)) : yt(t) ? tp(t, n) : Lr(ep(lt(e)));
}
function np(e) {
  var t = on(nr(e)), n = ["absolute", "fixed"].indexOf(Ze(e).position) >= 0, r = n && Ae(e) ? xn(e) : e;
  return yt(r) ? t.filter(function(o) {
    return yt(o) && ks(o, r) && We(o) !== "body";
  }) : [];
}
function rp(e, t, n, r) {
  var o = t === "clippingParents" ? np(e) : [].concat(t), i = [].concat(o, [n]), a = i[0], l = i.reduce(function(c, u) {
    var d = di(e, u, r);
    return c.top = gt(d.top, c.top), c.right = Fn(d.right, c.right), c.bottom = Fn(d.bottom, c.bottom), c.left = gt(d.left, c.left), c;
  }, di(e, a, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function _s(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ue(r) : null, i = r ? jt(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Oe:
      c = {
        x: a,
        y: t.y - n.height
      };
      break;
    case Be:
      c = {
        x: a,
        y: t.y + t.height
      };
      break;
    case Le:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Pe:
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
  var u = o ? ro(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (i) {
      case It:
        c[u] = c[u] - (t[d] / 2 - n[d] / 2);
        break;
      case un:
        c[u] = c[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function dn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, a = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? wd : l, u = n.rootBoundary, d = u === void 0 ? Os : u, f = n.elementContext, p = f === void 0 ? Xt : f, b = n.altBoundary, v = b === void 0 ? !1 : b, m = n.padding, h = m === void 0 ? 0 : m, E = Rs(typeof h != "number" ? h : Ns(h, yn)), $ = p === Xt ? Od : Xt, y = e.rects.popper, x = e.elements[v ? $ : p], g = rp(yt(x) ? x : x.contextElement || lt(e.elements.popper), c, d, a), P = Dt(e.elements.reference), S = _s({
    reference: P,
    element: y,
    strategy: "absolute",
    placement: o
  }), A = Lr(Object.assign({}, y, S)), D = p === Xt ? A : P, I = {
    top: g.top - D.top + E.top,
    bottom: D.bottom - g.bottom + E.bottom,
    left: g.left - D.left + E.left,
    right: D.right - g.right + E.right
  }, B = e.modifiersData.offset;
  if (p === Xt && B) {
    var z = B[o];
    Object.keys(I).forEach(function(U) {
      var V = [Le, Be].indexOf(U) >= 0 ? 1 : -1, M = [Oe, Be].indexOf(U) >= 0 ? "y" : "x";
      I[U] += z[M] * V;
    });
  }
  return I;
}
function op(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? Ps : c, d = jt(r), f = d ? l ? ai : ai.filter(function(v) {
    return jt(v) === d;
  }) : yn, p = f.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  p.length === 0 && (p = f);
  var b = p.reduce(function(v, m) {
    return v[m] = dn(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: a
    })[Ue(m)], v;
  }, {});
  return Object.keys(b).sort(function(v, m) {
    return b[v] - b[m];
  });
}
function ip(e) {
  if (Ue(e) === eo)
    return [];
  var t = Mn(e);
  return [ui(e), t, ui(t)];
}
function sp(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !0 : a, c = n.fallbackPlacements, u = n.padding, d = n.boundary, f = n.rootBoundary, p = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, m = n.allowedAutoPlacements, h = t.options.placement, E = Ue(h), $ = E === h, y = c || ($ || !v ? [Mn(h)] : ip(h)), x = [h].concat(y).reduce(function(L, q) {
      return L.concat(Ue(q) === eo ? op(t, {
        placement: q,
        boundary: d,
        rootBoundary: f,
        padding: u,
        flipVariations: v,
        allowedAutoPlacements: m
      }) : q);
    }, []), g = t.rects.reference, P = t.rects.popper, S = /* @__PURE__ */ new Map(), A = !0, D = x[0], I = 0; I < x.length; I++) {
      var B = x[I], z = Ue(B), U = jt(B) === It, V = [Oe, Be].indexOf(z) >= 0, M = V ? "width" : "height", R = dn(t, {
        placement: B,
        boundary: d,
        rootBoundary: f,
        altBoundary: p,
        padding: u
      }), j = V ? U ? Le : Pe : U ? Be : Oe;
      g[M] > P[M] && (j = Mn(j));
      var G = Mn(j), ee = [];
      if (i && ee.push(R[z] <= 0), l && ee.push(R[j] <= 0, R[G] <= 0), ee.every(function(L) {
        return L;
      })) {
        D = B, A = !1;
        break;
      }
      S.set(B, ee);
    }
    if (A)
      for (var O = v ? 3 : 1, _ = function(q) {
        var H = x.find(function(K) {
          var W = S.get(K);
          if (W)
            return W.slice(0, q).every(function(Y) {
              return Y;
            });
        });
        if (H)
          return D = H, "break";
      }, F = O; F > 0; F--) {
        var X = _(F);
        if (X === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[r]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const ap = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: sp,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function pi(e, t, n) {
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
function fi(e) {
  return [Oe, Le, Be, Pe].some(function(t) {
    return e[t] >= 0;
  });
}
function lp(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, a = dn(t, {
    elementContext: "reference"
  }), l = dn(t, {
    altBoundary: !0
  }), c = pi(a, r), u = pi(l, o, i), d = fi(c), f = fi(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": f
  });
}
const cp = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: lp
};
function up(e, t, n) {
  var r = Ue(e), o = [Pe, Oe].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, a = i[0], l = i[1];
  return a = a || 0, l = (l || 0) * o, [Pe, Le].indexOf(r) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function dp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = Ps.reduce(function(d, f) {
    return d[f] = up(f, t.rects, i), d;
  }, {}), l = a[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
const pp = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: dp
};
function fp(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = _s({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const hp = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: fp,
  data: {}
};
function mp(e) {
  return e === "x" ? "y" : "x";
}
function gp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !1 : a, c = n.boundary, u = n.rootBoundary, d = n.altBoundary, f = n.padding, p = n.tether, b = p === void 0 ? !0 : p, v = n.tetherOffset, m = v === void 0 ? 0 : v, h = dn(t, {
    boundary: c,
    rootBoundary: u,
    padding: f,
    altBoundary: d
  }), E = Ue(t.placement), $ = jt(t.placement), y = !$, x = ro(E), g = mp(x), P = t.modifiersData.popperOffsets, S = t.rects.reference, A = t.rects.popper, D = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, I = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, z = {
    x: 0,
    y: 0
  };
  if (P) {
    if (i) {
      var U, V = x === "y" ? Oe : Pe, M = x === "y" ? Be : Le, R = x === "y" ? "height" : "width", j = P[x], G = j + h[V], ee = j - h[M], O = b ? -A[R] / 2 : 0, _ = $ === It ? S[R] : A[R], F = $ === It ? -A[R] : -S[R], X = t.elements.arrow, L = b && X ? no(X) : {
        width: 0,
        height: 0
      }, q = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Cs(), H = q[V], K = q[M], W = rn(0, S[R], L[R]), Y = y ? S[R] / 2 - O - W - H - I.mainAxis : _ - W - H - I.mainAxis, J = y ? -S[R] / 2 + O + W + K + I.mainAxis : F + W + K + I.mainAxis, ne = t.elements.arrow && xn(t.elements.arrow), N = ne ? x === "y" ? ne.clientTop || 0 : ne.clientLeft || 0 : 0, Z = (U = B == null ? void 0 : B[x]) != null ? U : 0, C = j + Y - Z - N, re = j + J - Z, ge = rn(b ? Fn(G, C) : G, j, b ? gt(ee, re) : ee);
      P[x] = ge, z[x] = ge - j;
    }
    if (l) {
      var Ee, fe = x === "x" ? Oe : Pe, ct = x === "x" ? Be : Le, Te = P[g], Ge = g === "y" ? "height" : "width", ke = Te + h[fe], Ke = Te - h[ct], be = [Oe, Pe].indexOf(E) !== -1, Et = (Ee = B == null ? void 0 : B[g]) != null ? Ee : 0, ut = be ? ke : Te - S[Ge] - A[Ge] - Et + I.altAxis, Ut = be ? Te + S[Ge] + A[Ge] - Et - I.altAxis : Ke, En = b && be ? Vd(ut, Te, Ut) : rn(b ? ut : ke, Te, b ? Ut : Ke);
      P[g] = En, z[g] = En - Te;
    }
    t.modifiersData[r] = z;
  }
}
const bp = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: gp,
  requiresIfExists: ["offset"]
};
function vp(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function yp(e) {
  return e === $e(e) || !Ae(e) ? oo(e) : vp(e);
}
function xp(e) {
  var t = e.getBoundingClientRect(), n = At(t.width) / e.offsetWidth || 1, r = At(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Ep(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ae(t), o = Ae(t) && xp(t), i = lt(t), a = Dt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((We(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  so(i)) && (l = yp(t)), Ae(t) ? (c = Dt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = io(i))), {
    x: a.left + l.scrollLeft - c.x,
    y: a.top + l.scrollTop - c.y,
    width: a.width,
    height: a.height
  };
}
function Tp(e) {
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
function wp(e) {
  var t = Tp(e);
  return Id.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Op(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Pp(e) {
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
var hi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function mi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Sp(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? hi : o;
  return function(l, c, u) {
    u === void 0 && (u = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, hi, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], p = !1, b = {
      state: d,
      setOptions: function(E) {
        var $ = typeof E == "function" ? E(d.options) : E;
        m(), d.options = Object.assign({}, i, d.options, $), d.scrollParents = {
          reference: yt(l) ? on(l) : l.contextElement ? on(l.contextElement) : [],
          popper: on(c)
        };
        var y = wp(Pp([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = y.filter(function(x) {
          return x.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var E = d.elements, $ = E.reference, y = E.popper;
          if (mi($, y)) {
            d.rects = {
              reference: Ep($, xn(y), d.options.strategy === "fixed"),
              popper: no(y)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(I) {
              return d.modifiersData[I.name] = Object.assign({}, I.data);
            });
            for (var x = 0; x < d.orderedModifiers.length; x++) {
              if (d.reset === !0) {
                d.reset = !1, x = -1;
                continue;
              }
              var g = d.orderedModifiers[x], P = g.fn, S = g.options, A = S === void 0 ? {} : S, D = g.name;
              typeof P == "function" && (d = P({
                state: d,
                options: A,
                name: D,
                instance: b
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Op(function() {
        return new Promise(function(h) {
          b.forceUpdate(), h(d);
        });
      }),
      destroy: function() {
        m(), p = !0;
      }
    };
    if (!mi(l, c))
      return b;
    b.setOptions(u).then(function(h) {
      !p && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function v() {
      d.orderedModifiers.forEach(function(h) {
        var E = h.name, $ = h.options, y = $ === void 0 ? {} : $, x = h.effect;
        if (typeof x == "function") {
          var g = x({
            state: d,
            name: E,
            instance: b,
            options: y
          }), P = function() {
          };
          f.push(g || P);
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
var kp = [Yd, hp, Kd, jd, pp, ap, bp, qd, cp], Cp = /* @__PURE__ */ Sp({
  defaultModifiers: kp
});
function Rp(e) {
  return typeof e == "function" ? e() : e;
}
const pn = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [a, l] = T.useState(null), c = De(/* @__PURE__ */ T.isValidElement(r) ? r.ref : null, n);
  if (bt(() => {
    i || l(Rp(o) || document.body);
  }, [o, i]), bt(() => {
    if (a && !i)
      return Dn(n, a), () => {
        Dn(n, null);
      };
  }, [n, a, i]), i) {
    if (/* @__PURE__ */ T.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(r, u);
    }
    return /* @__PURE__ */ k(T.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ k(T.Fragment, {
    children: a && /* @__PURE__ */ La.createPortal(r, a)
  });
});
process.env.NODE_ENV !== "production" && (pn.propTypes = {
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
  container: s.oneOfType([Ye, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (pn["propTypes"] = qi(pn.propTypes));
const Ms = "base";
function Np(e) {
  return `${Ms}--${e}`;
}
function $p(e, t) {
  return `${Ms}-${e}-${t}`;
}
function Is(e, t) {
  const n = rs[t];
  return n ? Np(n) : $p(e, t);
}
function _p(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Is(e, r);
  }), n;
}
const As = "Popper";
function Mp(e) {
  return Is(As, e);
}
_p(As, ["root"]);
const Ip = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Ap = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Dp(e, t) {
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
function zn(e) {
  return typeof e == "function" ? e() : e;
}
function rr(e) {
  return e.nodeType !== void 0;
}
function jp(e) {
  return !rr(e);
}
const Bp = () => Qe({
  root: ["root"]
}, ll(Mp)), Lp = {}, Vp = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: a,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: d,
    popperOptions: f,
    popperRef: p,
    slotProps: b = {},
    slots: v = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, h = ce(t, Ip), E = T.useRef(null), $ = De(E, n), y = T.useRef(null), x = De(y, p), g = T.useRef(x);
  bt(() => {
    g.current = x;
  }, [x]), T.useImperativeHandle(p, () => y.current, []);
  const P = Dp(d, a), [S, A] = T.useState(P), [D, I] = T.useState(zn(o));
  T.useEffect(() => {
    y.current && y.current.forceUpdate();
  }), T.useEffect(() => {
    o && I(zn(o));
  }, [o]), bt(() => {
    if (!D || !u)
      return;
    const M = (G) => {
      A(G.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && rr(D) && D.nodeType === 1) {
      const G = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && G.top === 0 && G.left === 0 && G.right === 0 && G.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: G
      }) => {
        M(G);
      }
    }];
    c != null && (R = R.concat(c)), f && f.modifiers != null && (R = R.concat(f.modifiers));
    const j = Cp(D, E.current, w({
      placement: P
    }, f, {
      modifiers: R
    }));
    return g.current(j), () => {
      j.destroy(), g.current(null);
    };
  }, [D, l, c, u, f, P]);
  const B = {
    placement: S
  };
  m !== null && (B.TransitionProps = m);
  const z = Bp(), U = (r = v.root) != null ? r : "div", V = vt({
    elementType: U,
    externalSlotProps: b.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: $
    },
    ownerState: t,
    className: z.root
  });
  return /* @__PURE__ */ k(U, w({}, V, {
    children: typeof i == "function" ? i(B) : i
  }));
}), Ds = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: a = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: d,
    placement: f = "bottom",
    popperOptions: p = Lp,
    popperRef: b,
    style: v,
    transition: m = !1,
    slotProps: h = {},
    slots: E = {}
  } = t, $ = ce(t, Ap), [y, x] = T.useState(!0), g = () => {
    x(!1);
  }, P = () => {
    x(!0);
  };
  if (!c && !d && (!m || y))
    return null;
  let S;
  if (i)
    S = i;
  else if (r) {
    const I = zn(r);
    S = I && rr(I) ? ye(I).body : ye(null).body;
  }
  const A = !d && c && (!m || y) ? "none" : void 0, D = m ? {
    in: d,
    onEnter: g,
    onExited: P
  } : void 0;
  return /* @__PURE__ */ k(pn, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ k(Vp, w({
      anchorEl: r,
      direction: a,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: m ? !y : d,
      placement: f,
      popperOptions: p,
      popperRef: b,
      slotProps: h,
      slots: E
    }, $, {
      style: w({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: A
      }, v),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ds.propTypes = {
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
  anchorEl: Lt(s.oneOfType([Ye, s.object, s.func]), (e) => {
    if (e.open) {
      const t = zn(e.anchorEl);
      if (t && rr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || jp(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: s.oneOfType([Ye, s.func]),
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
  popperRef: zr,
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
var ao = {};
Object.defineProperty(ao, "__esModule", {
  value: !0
});
var js = ao.default = void 0, Fp = Up(ft), zp = Ii;
function Bs(e) {
  if (typeof WeakMap != "function")
    return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (Bs = function(r) {
    return r ? n : t;
  })(e);
}
function Up(e, t) {
  if (!t && e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var n = Bs(t);
  if (n && n.has(e))
    return n.get(e);
  var r = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
      var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
      a && (a.get || a.set) ? Object.defineProperty(r, i, a) : r[i] = e[i];
    }
  return r.default = e, n && n.set(e, r), r;
}
function qp(e) {
  return Object.keys(e).length === 0;
}
function Wp(e = null) {
  const t = Fp.useContext(zp.ThemeContext);
  return !t || qp(t) ? e : t;
}
js = ao.default = Wp;
const Hp = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, gi = Hp, Gp = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Kp = xe(Ds, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ls = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const o = js(), i = et({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: a,
    component: l,
    components: c,
    componentsProps: u,
    container: d,
    disablePortal: f,
    keepMounted: p,
    modifiers: b,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: E,
    transition: $,
    slots: y,
    slotProps: x
  } = i, g = ce(i, Gp), P = (r = y == null ? void 0 : y.root) != null ? r : c == null ? void 0 : c.Root, S = w({
    anchorEl: a,
    container: d,
    disablePortal: f,
    keepMounted: p,
    modifiers: b,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: E,
    transition: $
  }, g);
  return /* @__PURE__ */ k(Kp, w({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: P
    },
    slotProps: x ?? u
  }, S, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Ls.propTypes = {
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
  anchorEl: s.oneOfType([Ye, s.object, s.func]),
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
  container: s.oneOfType([Ye, s.func]),
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
  popperRef: zr,
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
const Vs = Ls;
function Xp(e) {
  return He("MuiTooltip", e);
}
const Yp = st("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ot = Yp, Jp = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Zp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Qp = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, a = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${qe(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Qe(a, Xp, t);
}, ef = xe(Vs, {
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
  [`&[data-popper-placement*="bottom"] .${ot.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ot.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ot.arrow}`]: w({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ot.arrow}`]: w({}, t.isRtl ? {
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
})), tf = xe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${qe(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => w({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : jn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Zp(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ot.popper}[data-popper-placement*="left"] &`]: w({
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
  [`.${ot.popper}[data-popper-placement*="right"] &`]: w({
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
  [`.${ot.popper}[data-popper-placement*="top"] &`]: w({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ot.popper}[data-popper-placement*="bottom"] &`]: w({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), nf = xe("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : jn(e.palette.grey[700], 0.9),
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
let Rn = !1;
const bi = new fn();
let Yt = {
  x: 0,
  y: 0
};
function Nn(e, t) {
  return (n, ...r) => {
    t && t(n, ...r), e(n, ...r);
  };
}
const Fs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, a, l, c, u, d, f, p, b, v, m, h, E, $, y, x, g;
  const P = et({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: S = !1,
    children: A,
    components: D = {},
    componentsProps: I = {},
    describeChild: B = !1,
    disableFocusListener: z = !1,
    disableHoverListener: U = !1,
    disableInteractive: V = !1,
    disableTouchListener: M = !1,
    enterDelay: R = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: G = 700,
    followCursor: ee = !1,
    id: O,
    leaveDelay: _ = 0,
    leaveTouchDelay: F = 1500,
    onClose: X,
    onOpen: L,
    open: q,
    placement: H = "bottom",
    PopperComponent: K,
    PopperProps: W = {},
    slotProps: Y = {},
    slots: J = {},
    title: ne,
    TransitionComponent: N = jr,
    TransitionProps: Z
  } = P, C = ce(P, Jp), re = /* @__PURE__ */ T.isValidElement(A) ? A : /* @__PURE__ */ k("span", {
    children: A
  }), ge = tr(), Ee = ds(), [fe, ct] = T.useState(), [Te, Ge] = T.useState(null), ke = T.useRef(!1), Ke = V || ee, be = Qt(), Et = Qt(), ut = Qt(), Ut = Qt(), [En, mo] = Xi({
    controlled: q,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Xe = En;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: Q
    } = T.useRef(q !== void 0);
    T.useEffect(() => {
      fe && fe.disabled && !Q && ne !== "" && fe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ne, fe, Q]);
  }
  const or = Ki(O), qt = T.useRef(), Tn = ln(() => {
    qt.current !== void 0 && (document.body.style.WebkitUserSelect = qt.current, qt.current = void 0), Ut.clear();
  });
  T.useEffect(() => Tn, [Tn]);
  const go = (Q) => {
    bi.clear(), Rn = !0, mo(!0), L && !Xe && L(Q);
  }, wn = ln(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (Q) => {
      bi.start(800 + _, () => {
        Rn = !1;
      }), mo(!1), X && Xe && X(Q), be.start(ge.transitions.duration.shortest, () => {
        ke.current = !1;
      });
    }
  ), On = (Q) => {
    ke.current && Q.type !== "touchstart" || (fe && fe.removeAttribute("title"), Et.clear(), ut.clear(), R || Rn && j ? Et.start(Rn ? j : R, () => {
      go(Q);
    }) : go(Q));
  }, ir = (Q) => {
    Et.clear(), ut.start(_, () => {
      wn(Q);
    });
  }, {
    isFocusVisibleRef: bo,
    onBlur: ua,
    onFocus: da,
    ref: pa
  } = Yi(), [, vo] = T.useState(!1), yo = (Q) => {
    ua(Q), bo.current === !1 && (vo(!1), ir(Q));
  }, xo = (Q) => {
    fe || ct(Q.currentTarget), da(Q), bo.current === !0 && (vo(!0), On(Q));
  }, Eo = (Q) => {
    ke.current = !0;
    const Ce = re.props;
    Ce.onTouchStart && Ce.onTouchStart(Q);
  }, fa = (Q) => {
    Eo(Q), ut.clear(), be.clear(), Tn(), qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Ut.start(G, () => {
      document.body.style.WebkitUserSelect = qt.current, On(Q);
    });
  }, ha = (Q) => {
    re.props.onTouchEnd && re.props.onTouchEnd(Q), Tn(), ut.start(F, () => {
      wn(Q);
    });
  };
  T.useEffect(() => {
    if (!Xe)
      return;
    function Q(Ce) {
      (Ce.key === "Escape" || Ce.key === "Esc") && wn(Ce);
    }
    return document.addEventListener("keydown", Q), () => {
      document.removeEventListener("keydown", Q);
    };
  }, [wn, Xe]);
  const ma = De(re.ref, pa, ct, n);
  !ne && ne !== 0 && (Xe = !1);
  const sr = T.useRef(), ga = (Q) => {
    const Ce = re.props;
    Ce.onMouseMove && Ce.onMouseMove(Q), Yt = {
      x: Q.clientX,
      y: Q.clientY
    }, sr.current && sr.current.update();
  }, Wt = {}, ar = typeof ne == "string";
  B ? (Wt.title = !Xe && ar && !U ? ne : null, Wt["aria-describedby"] = Xe ? or : null) : (Wt["aria-label"] = ar ? ne : null, Wt["aria-labelledby"] = Xe && !ar ? or : null);
  const _e = w({}, Wt, C, re.props, {
    className: ve(C.className, re.props.className),
    onTouchStart: Eo,
    ref: ma
  }, ee ? {
    onMouseMove: ga
  } : {});
  process.env.NODE_ENV !== "production" && (_e["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    fe && !fe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [fe]));
  const Ht = {};
  M || (_e.onTouchStart = fa, _e.onTouchEnd = ha), U || (_e.onMouseOver = Nn(On, _e.onMouseOver), _e.onMouseLeave = Nn(ir, _e.onMouseLeave), Ke || (Ht.onMouseOver = On, Ht.onMouseLeave = ir)), z || (_e.onFocus = Nn(xo, _e.onFocus), _e.onBlur = Nn(yo, _e.onBlur), Ke || (Ht.onFocus = xo, Ht.onBlur = yo)), process.env.NODE_ENV !== "production" && re.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${re.props.title}\` or the Tooltip component.`].join(`
`));
  const ba = T.useMemo(() => {
    var Q;
    let Ce = [{
      name: "arrow",
      enabled: !!Te,
      options: {
        element: Te,
        padding: 4
      }
    }];
    return (Q = W.popperOptions) != null && Q.modifiers && (Ce = Ce.concat(W.popperOptions.modifiers)), w({}, W.popperOptions, {
      modifiers: Ce
    });
  }, [Te, W]), Gt = w({}, P, {
    isRtl: Ee,
    arrow: S,
    disableInteractive: Ke,
    placement: H,
    PopperComponentProp: K,
    touch: ke.current
  }), lr = Qp(Gt), To = (r = (o = J.popper) != null ? o : D.Popper) != null ? r : ef, wo = (i = (a = (l = J.transition) != null ? l : D.Transition) != null ? a : N) != null ? i : jr, Oo = (c = (u = J.tooltip) != null ? u : D.Tooltip) != null ? c : tf, Po = (d = (f = J.arrow) != null ? f : D.Arrow) != null ? d : nf, va = en(To, w({}, W, (p = Y.popper) != null ? p : I.popper, {
    className: ve(lr.popper, W == null ? void 0 : W.className, (b = (v = Y.popper) != null ? v : I.popper) == null ? void 0 : b.className)
  }), Gt), ya = en(wo, w({}, Z, (m = Y.transition) != null ? m : I.transition), Gt), xa = en(Oo, w({}, (h = Y.tooltip) != null ? h : I.tooltip, {
    className: ve(lr.tooltip, (E = ($ = Y.tooltip) != null ? $ : I.tooltip) == null ? void 0 : E.className)
  }), Gt), Ea = en(Po, w({}, (y = Y.arrow) != null ? y : I.arrow, {
    className: ve(lr.arrow, (x = (g = Y.arrow) != null ? g : I.arrow) == null ? void 0 : x.className)
  }), Gt);
  return /* @__PURE__ */ Se(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(re, _e), /* @__PURE__ */ k(To, w({
      as: K ?? Vs,
      placement: H,
      anchorEl: ee ? {
        getBoundingClientRect: () => ({
          top: Yt.y,
          left: Yt.x,
          right: Yt.x,
          bottom: Yt.y,
          width: 0,
          height: 0
        })
      } : fe,
      popperRef: sr,
      open: fe ? Xe : !1,
      id: or,
      transition: !0
    }, Ht, va, {
      popperOptions: ba,
      children: ({
        TransitionProps: Q
      }) => /* @__PURE__ */ k(wo, w({
        timeout: ge.transitions.duration.shorter
      }, Q, ya, {
        children: /* @__PURE__ */ Se(Oo, w({}, xa, {
          children: [ne, S ? /* @__PURE__ */ k(Po, w({}, Ea, {
            ref: Ge
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Fs.propTypes = {
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
  children: hn.isRequired,
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: s.object
});
const rf = Fs;
var lo = {}, xr = {};
function of(e) {
  return He("MuiSvgIcon", e);
}
st("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const sf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], af = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${qe(t)}`, `fontSize${qe(n)}`]
  };
  return Qe(o, of, r);
}, lf = xe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${qe(n.color)}`], t[`fontSize${qe(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, a, l, c, u, d, f, p, b, v;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // for example heroicons uses fill="none" and stroke="currentColor"
    fill: t.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (n = e.transitions) == null || (r = n.create) == null ? void 0 : r.call(n, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((i = e.typography) == null || (a = i.pxToRem) == null ? void 0 : a.call(i, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (d = u.pxToRem) == null ? void 0 : d.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (p = (e.vars || e).palette) == null || (p = p[t.color]) == null ? void 0 : p.main) != null ? f : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), co = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = et({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: a = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: d = !1,
    titleAccess: f,
    viewBox: p = "0 0 24 24"
  } = r, b = ce(r, sf), v = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", m = w({}, r, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: p,
    hasSvgAsChild: v
  }), h = {};
  d || (h.viewBox = p);
  const E = af(m);
  return /* @__PURE__ */ Se(lf, w({
    as: l,
    className: ve(E.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, b, v && o.props, {
    ownerState: m,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ k("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (co.propTypes = {
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
co.muiName = "SvgIcon";
const vi = co;
function zs(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ k(vi, w({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = vi.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(n));
}
const cf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ns.configure(e);
  }
}, uf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: qe,
  createChainedFunction: Nr,
  createSvgIcon: zs,
  debounce: Gi,
  deprecatedPropType: wl,
  isMuiElement: Ol,
  ownerDocument: ye,
  ownerWindow: Mt,
  requirePropFactory: Pl,
  setRef: Dn,
  unstable_ClassNameGenerator: cf,
  unstable_useEnhancedEffect: bt,
  unstable_useId: Ki,
  unsupportedProp: Cl,
  useControlled: Xi,
  useEventCallback: ln,
  useForkRef: De,
  useIsFocusVisible: Yi
}, Symbol.toStringTag, { value: "Module" })), df = /* @__PURE__ */ it(uf);
var yi;
function pf() {
  return yi || (yi = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = df;
  }(xr)), xr;
}
var ff = Ur;
Object.defineProperty(lo, "__esModule", {
  value: !0
});
var Us = lo.default = void 0, hf = ff(pf()), mf = Ta;
Us = lo.default = (0, hf.default)(/* @__PURE__ */ (0, mf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function xi(e, t, n) {
  return e ? /* @__PURE__ */ k($i, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ k("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function qs(e) {
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
    isDense: d = !0,
    isSubMenuParent: f = !1,
    hasDisabledGutters: p = !1,
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: m,
    children: h
  } = e, E = /* @__PURE__ */ k(
    ka,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: d,
      disableGutters: p,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: m,
      children: n ? /* @__PURE__ */ Se(Vr, { children: [
        xi(i, n, !0),
        /* @__PURE__ */ k(Ca, { primary: n, inset: !i && o }),
        f ? /* @__PURE__ */ k($i, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ k(Us, {}) }) : xi(a, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ k(rf, { title: r, placement: "right", children: /* @__PURE__ */ k("div", { children: E }) }) : E;
}
function Ws(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function gf(e) {
  const [t, n] = mt(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, a = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = Ws(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ k(uo, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ Se(Vr, { children: [
    /* @__PURE__ */ k(qs, { onClick: a, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ k(
      Ra,
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
const bf = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function uo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: a } = Bt(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ws(t).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(d).sort(
      (v, m) => (v.group.order || 0) - (m.group.order || 0)
    ), p = [];
    f.forEach((v) => {
      bf(v.id, t.items).forEach(
        (m) => p.push({ item: m, isLastItemInGroup: !1 })
      ), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !0);
    }), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !1);
    const b = p.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: p, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: d, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: a
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ k("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ k("div", { role: "menu", "aria-label": u, children: i.map((d, f) => {
    const { item: p } = d, b = l(d);
    if ("command" in p) {
      const v = p.group + f;
      return /* @__PURE__ */ k(
        qs,
        {
          onClick: (m) => {
            n == null || n(m), r(p);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ k(
      gf,
      {
        parentMenuItem: p,
        parentItemProps: b,
        ...e
      },
      u + p.id
    );
  }) }, u);
}
function vf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([a, l]) => ({ id: a, group: l })).filter((a) => "column" in a.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (a) => "column" in a.group && a.group.column === n
  )), /* @__PURE__ */ k(uo, { ...e, includedGroups: i });
}
function yf({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ Se(
    _i,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ k("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ k(Na, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ k(
          vf,
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
function xf({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Bt(() => {
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
  return /* @__PURE__ */ k(
    _i,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((a, l) => /* @__PURE__ */ k(
        yf,
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
const Hs = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (Hs.displayName = "ListContext");
const Ef = Hs;
function Tf(e) {
  return He("MuiList", e);
}
st("MuiList", ["root", "padding", "dense", "subheader"]);
const wf = ["children", "className", "component", "dense", "disablePadding", "subheader"], Of = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return Qe({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Tf, t);
}, Pf = xe("ul", {
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
})), Gs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = et({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, d = ce(r, wf), f = T.useMemo(() => ({
    dense: l
  }), [l]), p = w({}, r, {
    component: a,
    dense: l,
    disablePadding: c
  }), b = Of(p);
  return /* @__PURE__ */ k(Ef.Provider, {
    value: f,
    children: /* @__PURE__ */ Se(Pf, w({
      as: a,
      className: ve(b.root, i),
      ref: n,
      ownerState: p
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Gs.propTypes = {
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
const Sf = Gs, kf = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Er(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function Ei(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ks(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function Jt(e, t, n, r, o, i) {
  let a = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (a)
        return !1;
      a = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Ks(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Xs = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    onKeyDown: d,
    variant: f = "selectedMenu"
  } = t, p = ce(t, kf), b = T.useRef(null), v = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  bt(() => {
    o && b.current.focus();
  }, [o]), T.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (y, {
      direction: x
    }) => {
      const g = !b.current.style.width;
      if (y.clientHeight < b.current.clientHeight && g) {
        const P = `${Ji(ye(y))}px`;
        b.current.style[x === "rtl" ? "paddingLeft" : "paddingRight"] = P, b.current.style.width = `calc(100% + ${P})`;
      }
      return b.current;
    }
  }), []);
  const m = (y) => {
    const x = b.current, g = y.key, P = ye(x).activeElement;
    if (g === "ArrowDown")
      y.preventDefault(), Jt(x, P, u, c, Er);
    else if (g === "ArrowUp")
      y.preventDefault(), Jt(x, P, u, c, Ei);
    else if (g === "Home")
      y.preventDefault(), Jt(x, null, u, c, Er);
    else if (g === "End")
      y.preventDefault(), Jt(x, null, u, c, Ei);
    else if (g.length === 1) {
      const S = v.current, A = g.toLowerCase(), D = performance.now();
      S.keys.length > 0 && (D - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && A !== S.keys[0] && (S.repeating = !1)), S.lastTime = D, S.keys.push(A);
      const I = P && !S.repeating && Ks(P, S);
      S.previousKeyMatched && (I || Jt(x, P, !1, c, Er, S)) ? y.preventDefault() : S.previousKeyMatched = !1;
    }
    d && d(y);
  }, h = De(b, n);
  let E = -1;
  T.Children.forEach(a, (y, x) => {
    if (!/* @__PURE__ */ T.isValidElement(y)) {
      E === x && (E += 1, E >= a.length && (E = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && An.isFragment(y) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), y.props.disabled || (f === "selectedMenu" && y.props.selected || E === -1) && (E = x), E === x && (y.props.disabled || y.props.muiSkipListHighlight || y.type.muiSkipListHighlight) && (E += 1, E >= a.length && (E = -1));
  });
  const $ = T.Children.map(a, (y, x) => {
    if (x === E) {
      const g = {};
      return i && (g.autoFocus = !0), y.props.tabIndex === void 0 && f === "selectedMenu" && (g.tabIndex = 0), /* @__PURE__ */ T.cloneElement(y, g);
    }
    return y;
  });
  return /* @__PURE__ */ k(Sf, w({
    role: "menu",
    ref: h,
    className: l,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, p, {
    children: $
  }));
});
process.env.NODE_ENV !== "production" && (Xs.propTypes = {
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
const Cf = Xs;
function Rf(e) {
  const t = ye(e);
  return t.body === e ? Mt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function sn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Ti(e) {
  return parseInt(Mt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Nf(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function wi(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (a) => {
    const l = i.indexOf(a) === -1, c = !Nf(a);
    l && c && sn(a, o);
  });
}
function Tr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function $f(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Rf(r)) {
      const a = Ji(ye(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Ti(r) + a}px`;
      const l = ye(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Ti(c) + a}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = ye(r).body;
    else {
      const a = r.parentElement, l = Mt(r);
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
function _f(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Mf {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && sn(t.modalRef, !1);
    const o = _f(n);
    wi(n, t.mount, t.modalRef, o, !0);
    const i = Tr(this.containers, (a) => a.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Tr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = $f(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Tr(this.containers, (a) => a.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && sn(t.modalRef, n), wi(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && sn(a.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function If(e) {
  return typeof e == "function" ? e() : e;
}
function Af(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Df = new Mf();
function jf(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Df,
    closeAfterTransition: i = !1,
    onTransitionEnter: a,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: d,
    rootRef: f
  } = e, p = T.useRef({}), b = T.useRef(null), v = T.useRef(null), m = De(v, f), [h, E] = T.useState(!d), $ = Af(c);
  let y = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (y = !1);
  const x = () => ye(b.current), g = () => (p.current.modalRef = v.current, p.current.mount = b.current, p.current), P = () => {
    o.mount(g(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, S = ln(() => {
    const R = If(t) || x().body;
    o.add(g(), R), v.current && P();
  }), A = T.useCallback(() => o.isTopModal(g()), [o]), D = ln((R) => {
    b.current = R, R && (d && A() ? P() : v.current && sn(v.current, y));
  }), I = T.useCallback(() => {
    o.remove(g(), y);
  }, [y, o]);
  T.useEffect(() => () => {
    I();
  }, [I]), T.useEffect(() => {
    d ? S() : (!$ || !i) && I();
  }, [d, I, $, i, S]);
  const B = (R) => (j) => {
    var G;
    (G = R.onKeyDown) == null || G.call(R, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !A()) && (n || (j.stopPropagation(), u && u(j, "escapeKeyDown")));
  }, z = (R) => (j) => {
    var G;
    (G = R.onClick) == null || G.call(R, j), j.target === j.currentTarget && u && u(j, "backdropClick");
  };
  return {
    getRootProps: (R = {}) => {
      const j = zi(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const G = w({}, j, R);
      return w({
        role: "presentation"
      }, G, {
        onKeyDown: B(G),
        ref: m
      });
    },
    getBackdropProps: (R = {}) => {
      const j = R;
      return w({
        "aria-hidden": !0
      }, j, {
        onClick: z(j),
        open: d
      });
    },
    getTransitionProps: () => {
      const R = () => {
        E(!1), a && a();
      }, j = () => {
        E(!0), l && l(), i && I();
      };
      return {
        onEnter: Nr(R, c == null ? void 0 : c.props.onEnter),
        onExited: Nr(j, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: m,
    portalRef: D,
    isTopModal: A,
    exited: h,
    hasTransition: $
  };
}
const Bf = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Lf(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Vf(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Ff(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Vf(e));
}
function zf(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Bf)).forEach((r, o) => {
    const i = Lf(r);
    i === -1 || !Ff(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Uf() {
  return !0;
}
function Un(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = zf,
    isEnabled: a = Uf,
    open: l
  } = e, c = T.useRef(!1), u = T.useRef(null), d = T.useRef(null), f = T.useRef(null), p = T.useRef(null), b = T.useRef(!1), v = T.useRef(null), m = De(t.ref, v), h = T.useRef(null);
  T.useEffect(() => {
    !l || !v.current || (b.current = !n);
  }, [n, l]), T.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = ye(v.current);
    return v.current.contains(y.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), b.current && v.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = ye(v.current), x = (S) => {
      h.current = S, !(r || !a() || S.key !== "Tab") && y.activeElement === v.current && S.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, g = () => {
      const S = v.current;
      if (S === null)
        return;
      if (!y.hasFocus() || !a() || c.current) {
        c.current = !1;
        return;
      }
      if (S.contains(y.activeElement) || r && y.activeElement !== u.current && y.activeElement !== d.current)
        return;
      if (y.activeElement !== p.current)
        p.current = null;
      else if (p.current !== null)
        return;
      if (!b.current)
        return;
      let A = [];
      if ((y.activeElement === u.current || y.activeElement === d.current) && (A = i(v.current)), A.length > 0) {
        var D, I;
        const B = !!((D = h.current) != null && D.shiftKey && ((I = h.current) == null ? void 0 : I.key) === "Tab"), z = A[0], U = A[A.length - 1];
        typeof z != "string" && typeof U != "string" && (B ? U.focus() : z.focus());
      } else
        S.focus();
    };
    y.addEventListener("focusin", g), y.addEventListener("keydown", x, !0);
    const P = setInterval(() => {
      y.activeElement && y.activeElement.tagName === "BODY" && g();
    }, 50);
    return () => {
      clearInterval(P), y.removeEventListener("focusin", g), y.removeEventListener("keydown", x, !0);
    };
  }, [n, r, o, a, l, i]);
  const E = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0, p.current = y.target;
    const x = t.props.onFocus;
    x && x(y);
  }, $ = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ Se(T.Fragment, {
    children: [/* @__PURE__ */ k("div", {
      tabIndex: l ? 0 : -1,
      onFocus: $,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: m,
      onFocus: E
    }), /* @__PURE__ */ k("div", {
      tabIndex: l ? 0 : -1,
      onFocus: $,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Un.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: hn,
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
process.env.NODE_ENV !== "production" && (Un["propTypes"] = qi(Un.propTypes));
const qf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Wf = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Ys = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = tr(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: a = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: d,
    onEntered: f,
    onEntering: p,
    onExit: b,
    onExited: v,
    onExiting: m,
    style: h,
    timeout: E = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: $ = Ts
  } = t, y = ce(t, qf), x = T.useRef(null), g = De(x, l.ref, n), P = (V) => (M) => {
    if (V) {
      const R = x.current;
      M === void 0 ? V(R) : V(R, M);
    }
  }, S = P(p), A = P((V, M) => {
    ws(V);
    const R = Vn({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "enter"
    });
    V.style.webkitTransition = r.transitions.create("opacity", R), V.style.transition = r.transitions.create("opacity", R), d && d(V, M);
  }), D = P(f), I = P(m), B = P((V) => {
    const M = Vn({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "exit"
    });
    V.style.webkitTransition = r.transitions.create("opacity", M), V.style.transition = r.transitions.create("opacity", M), b && b(V);
  }), z = P(v);
  return /* @__PURE__ */ k($, w({
    appear: a,
    in: u,
    nodeRef: x,
    onEnter: A,
    onEntered: D,
    onEntering: S,
    onExit: B,
    onExited: z,
    onExiting: I,
    addEndListener: (V) => {
      i && i(x.current, V);
    },
    timeout: E
  }, y, {
    children: (V, M) => /* @__PURE__ */ T.cloneElement(l, w({
      style: w({
        opacity: 0,
        visibility: V === "exited" && !u ? "hidden" : void 0
      }, Wf[V], h, l.props.style),
      ref: g
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (Ys.propTypes = {
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
  children: hn.isRequired,
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
const Hf = Ys;
function Gf(e) {
  return He("MuiBackdrop", e);
}
st("MuiBackdrop", ["root", "invisible"]);
const Kf = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Xf = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return Qe({
    root: ["root", n && "invisible"]
  }, Gf, t);
}, Yf = xe("div", {
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
})), Js = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i;
  const a = et({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: d = {},
    componentsProps: f = {},
    invisible: p = !1,
    open: b,
    slotProps: v = {},
    slots: m = {},
    TransitionComponent: h = Hf,
    transitionDuration: E
  } = a, $ = ce(a, Kf), y = w({}, a, {
    component: u,
    invisible: p
  }), x = Xf(y), g = (r = v.root) != null ? r : f.root;
  return /* @__PURE__ */ k(h, w({
    in: b,
    timeout: E
  }, $, {
    children: /* @__PURE__ */ k(Yf, w({
      "aria-hidden": !0
    }, g, {
      as: (o = (i = m.root) != null ? i : d.Root) != null ? o : u,
      className: ve(x.root, c, g == null ? void 0 : g.className),
      ownerState: w({}, y, g == null ? void 0 : g.ownerState),
      classes: x,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Js.propTypes = {
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
const Jf = Js;
function Zf(e) {
  return He("MuiModal", e);
}
st("MuiModal", ["root", "hidden", "backdrop"]);
const Qf = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], eh = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return Qe({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Zf, r);
}, th = xe("div", {
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
})), nh = xe(Jf, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Zs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, a, l, c;
  const u = et({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = nh,
    BackdropProps: f,
    className: p,
    closeAfterTransition: b = !1,
    children: v,
    container: m,
    component: h,
    components: E = {},
    componentsProps: $ = {},
    disableAutoFocus: y = !1,
    disableEnforceFocus: x = !1,
    disableEscapeKeyDown: g = !1,
    disablePortal: P = !1,
    disableRestoreFocus: S = !1,
    disableScrollLock: A = !1,
    hideBackdrop: D = !1,
    keepMounted: I = !1,
    onBackdropClick: B,
    open: z,
    slotProps: U,
    slots: V
    // eslint-disable-next-line react/prop-types
  } = u, M = ce(u, Qf), R = w({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: y,
    disableEnforceFocus: x,
    disableEscapeKeyDown: g,
    disablePortal: P,
    disableRestoreFocus: S,
    disableScrollLock: A,
    hideBackdrop: D,
    keepMounted: I
  }), {
    getRootProps: j,
    getBackdropProps: G,
    getTransitionProps: ee,
    portalRef: O,
    isTopModal: _,
    exited: F,
    hasTransition: X
  } = jf(w({}, R, {
    rootRef: n
  })), L = w({}, R, {
    exited: F
  }), q = eh(L), H = {};
  if (v.props.tabIndex === void 0 && (H.tabIndex = "-1"), X) {
    const {
      onEnter: Z,
      onExited: C
    } = ee();
    H.onEnter = Z, H.onExited = C;
  }
  const K = (r = (o = V == null ? void 0 : V.root) != null ? o : E.Root) != null ? r : th, W = (i = (a = V == null ? void 0 : V.backdrop) != null ? a : E.Backdrop) != null ? i : d, Y = (l = U == null ? void 0 : U.root) != null ? l : $.root, J = (c = U == null ? void 0 : U.backdrop) != null ? c : $.backdrop, ne = vt({
    elementType: K,
    externalSlotProps: Y,
    externalForwardedProps: M,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: h
    },
    ownerState: L,
    className: ve(p, Y == null ? void 0 : Y.className, q == null ? void 0 : q.root, !L.open && L.exited && (q == null ? void 0 : q.hidden))
  }), N = vt({
    elementType: W,
    externalSlotProps: J,
    additionalProps: f,
    getSlotProps: (Z) => G(w({}, Z, {
      onClick: (C) => {
        B && B(C), Z != null && Z.onClick && Z.onClick(C);
      }
    })),
    className: ve(J == null ? void 0 : J.className, f == null ? void 0 : f.className, q == null ? void 0 : q.backdrop),
    ownerState: L
  });
  return !I && !z && (!X || F) ? null : /* @__PURE__ */ k(pn, {
    ref: O,
    container: m,
    disablePortal: P,
    children: /* @__PURE__ */ Se(K, w({}, ne, {
      children: [!D && d ? /* @__PURE__ */ k(W, w({}, N)) : null, /* @__PURE__ */ k(Un, {
        disableEnforceFocus: x,
        disableAutoFocus: y,
        disableRestoreFocus: S,
        isEnabled: _,
        open: z,
        children: /* @__PURE__ */ T.cloneElement(v, H)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Zs.propTypes = {
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
  children: hn.isRequired,
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
  container: s.oneOfType([Ye, s.func]),
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
const rh = Zs;
function oh(e) {
  return He("MuiPaper", e);
}
st("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const ih = ["className", "component", "elevation", "square", "variant"], sh = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return Qe(i, oh, o);
}, ah = xe("div", {
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
    backgroundImage: `linear-gradient(${jn("#fff", gi(t.elevation))}, ${jn("#fff", gi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Qs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = et({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: a = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = ce(r, ih), d = w({}, r, {
    component: i,
    elevation: a,
    square: l,
    variant: c
  }), f = sh(d);
  return process.env.NODE_ENV !== "production" && tr().shadows[a] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)), /* @__PURE__ */ k(ah, w({
    as: i,
    ownerState: d,
    className: ve(f.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (Qs.propTypes = {
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
  elevation: Lt(es, (e) => {
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
const lh = Qs;
function ch(e) {
  return He("MuiPopover", e);
}
st("MuiPopover", ["root", "paper"]);
const uh = ["onEntering"], dh = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], ph = ["slotProps"];
function Oi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Pi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Si(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function In(e) {
  return typeof e == "function" ? e() : e;
}
const fh = (e) => {
  const {
    classes: t
  } = e;
  return Qe({
    root: ["root"],
    paper: ["paper"]
  }, ch, t);
}, hh = xe(rh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ea = xe(lh, {
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
}), ta = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i;
  const a = et({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: d,
    anchorReference: f = "anchorEl",
    children: p,
    className: b,
    container: v,
    elevation: m = 8,
    marginThreshold: h = 16,
    open: E,
    PaperProps: $ = {},
    slots: y,
    slotProps: x,
    transformOrigin: g = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: P = jr,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: A
    } = {},
    disableScrollLock: D = !1
  } = a, I = ce(a.TransitionProps, uh), B = ce(a, dh), z = (r = x == null ? void 0 : x.paper) != null ? r : $, U = T.useRef(), V = De(U, z.ref), M = w({}, a, {
    anchorOrigin: u,
    anchorReference: f,
    elevation: m,
    marginThreshold: h,
    externalPaperSlotProps: z,
    transformOrigin: g,
    TransitionComponent: P,
    transitionDuration: S,
    TransitionProps: I
  }), R = fh(M), j = T.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const Z = In(c), C = Z && Z.nodeType === 1 ? Z : ye(U.current).body, re = C.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ge = C.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ge.top === 0 && ge.left === 0 && ge.right === 0 && ge.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: re.top + Oi(re, u.vertical),
      left: re.left + Pi(re, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, d, f]), G = T.useCallback((Z) => ({
    vertical: Oi(Z, g.vertical),
    horizontal: Pi(Z, g.horizontal)
  }), [g.horizontal, g.vertical]), ee = T.useCallback((Z) => {
    const C = {
      width: Z.offsetWidth,
      height: Z.offsetHeight
    }, re = G(C);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Si(re)
      };
    const ge = j();
    let Ee = ge.top - re.vertical, fe = ge.left - re.horizontal;
    const ct = Ee + C.height, Te = fe + C.width, Ge = Mt(In(c)), ke = Ge.innerHeight - h, Ke = Ge.innerWidth - h;
    if (h !== null && Ee < h) {
      const be = Ee - h;
      Ee -= be, re.vertical += be;
    } else if (h !== null && ct > ke) {
      const be = ct - ke;
      Ee -= be, re.vertical += be;
    }
    if (process.env.NODE_ENV !== "production" && C.height > ke && C.height && ke && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${C.height - ke}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && fe < h) {
      const be = fe - h;
      fe -= be, re.horizontal += be;
    } else if (Te > Ke) {
      const be = Te - Ke;
      fe -= be, re.horizontal += be;
    }
    return {
      top: `${Math.round(Ee)}px`,
      left: `${Math.round(fe)}px`,
      transformOrigin: Si(re)
    };
  }, [c, f, j, G, h]), [O, _] = T.useState(E), F = T.useCallback(() => {
    const Z = U.current;
    if (!Z)
      return;
    const C = ee(Z);
    C.top !== null && (Z.style.top = C.top), C.left !== null && (Z.style.left = C.left), Z.style.transformOrigin = C.transformOrigin, _(!0);
  }, [ee]);
  T.useEffect(() => (D && window.addEventListener("scroll", F), () => window.removeEventListener("scroll", F)), [c, D, F]);
  const X = (Z, C) => {
    A && A(Z, C), F();
  }, L = () => {
    _(!1);
  };
  T.useEffect(() => {
    E && F();
  }), T.useImperativeHandle(l, () => E ? {
    updatePosition: () => {
      F();
    }
  } : null, [E, F]), T.useEffect(() => {
    if (!E)
      return;
    const Z = Gi(() => {
      F();
    }), C = Mt(c);
    return C.addEventListener("resize", Z), () => {
      Z.clear(), C.removeEventListener("resize", Z);
    };
  }, [c, E, F]);
  let q = S;
  S === "auto" && !P.muiSupportAuto && (q = void 0);
  const H = v || (c ? ye(In(c)).body : void 0), K = (o = y == null ? void 0 : y.root) != null ? o : hh, W = (i = y == null ? void 0 : y.paper) != null ? i : ea, Y = vt({
    elementType: W,
    externalSlotProps: w({}, z, {
      style: O ? z.style : w({}, z.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: V
    },
    ownerState: M,
    className: ve(R.paper, z == null ? void 0 : z.className)
  }), J = vt({
    elementType: K,
    externalSlotProps: (x == null ? void 0 : x.root) || {},
    externalForwardedProps: B,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: H,
      open: E
    },
    ownerState: M,
    className: ve(R.root, b)
  }), {
    slotProps: ne
  } = J, N = ce(J, ph);
  return /* @__PURE__ */ k(K, w({}, N, !Vi(K) && {
    slotProps: ne,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ k(P, w({
      appear: !0,
      in: E,
      onEntering: X,
      onExited: L,
      timeout: q
    }, I, {
      children: /* @__PURE__ */ k(W, w({}, Y, {
        children: p
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ta.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: zr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Lt(s.oneOfType([Ye, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = In(e.anchorEl);
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
  container: s.oneOfType([Ye, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: es,
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
    component: fl
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object
});
const mh = ta;
function gh(e) {
  return He("MuiMenu", e);
}
st("MuiMenu", ["root", "paper", "list"]);
const bh = ["onEntering"], vh = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], yh = {
  vertical: "top",
  horizontal: "right"
}, xh = {
  vertical: "top",
  horizontal: "left"
}, Eh = (e) => {
  const {
    classes: t
  } = e;
  return Qe({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, gh, t);
}, Th = xe(mh, {
  shouldForwardProp: (e) => ys(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), wh = xe(ea, {
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
}), Oh = xe(Cf, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), na = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o;
  const i = et({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: a = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: d = {},
    onClose: f,
    open: p,
    PaperProps: b = {},
    PopoverClasses: v,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: E = "selectedMenu",
    slots: $ = {},
    slotProps: y = {}
  } = i, x = ce(i.TransitionProps, bh), g = ce(i, vh), P = ds(), S = w({}, i, {
    autoFocus: a,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: h,
    PaperProps: b,
    transitionDuration: m,
    TransitionProps: x,
    variant: E
  }), A = Eh(S), D = a && !u && p, I = T.useRef(null), B = (G, ee) => {
    I.current && I.current.adjustStyleForScrollbar(G, {
      direction: P ? "rtl" : "ltr"
    }), h && h(G, ee);
  }, z = (G) => {
    G.key === "Tab" && (G.preventDefault(), f && f(G, "tabKeyDown"));
  };
  let U = -1;
  T.Children.map(l, (G, ee) => {
    /* @__PURE__ */ T.isValidElement(G) && (process.env.NODE_ENV !== "production" && An.isFragment(G) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), G.props.disabled || (E === "selectedMenu" && G.props.selected || U === -1) && (U = ee));
  });
  const V = (r = $.paper) != null ? r : wh, M = (o = y.paper) != null ? o : b, R = vt({
    elementType: $.root,
    externalSlotProps: y.root,
    ownerState: S,
    className: [A.root, c]
  }), j = vt({
    elementType: V,
    externalSlotProps: M,
    ownerState: S,
    className: A.paper
  });
  return /* @__PURE__ */ k(Th, w({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: P ? "right" : "left"
    },
    transformOrigin: P ? yh : xh,
    slots: {
      paper: V,
      root: $.root
    },
    slotProps: {
      root: R,
      paper: j
    },
    open: p,
    ref: n,
    transitionDuration: m,
    TransitionProps: w({
      onEntering: B
    }, x),
    ownerState: S
  }, g, {
    classes: v,
    children: /* @__PURE__ */ k(Oh, w({
      onKeyDown: z,
      actions: I,
      autoFocus: a && (U === -1 || u),
      autoFocusItem: D,
      variant: E
    }, d, {
      className: ve(A.list, d.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (na.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([Ye, s.func]),
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: s.oneOf(["menu", "selectedMenu"])
});
const Ph = na;
function Yh({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = ft.useState(void 0), a = ht(
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
  ), l = ht(() => {
    i(void 0);
  }, []), c = Bt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ Se(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: a,
      children: [
        r,
        /* @__PURE__ */ k(
          Ph,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ k(
              uo,
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
function Jh({
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
  return /* @__PURE__ */ k(
    Mi,
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
var Sh = Object.defineProperty, kh = (e, t, n) => t in e ? Sh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => (kh(e, typeof t != "symbol" ? t + "" : t, n), n);
const xt = [
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
], po = [
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
], ra = [
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
], ki = jh();
function zt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ki ? ki[e] : 0;
}
function fo(e) {
  return zt(e) > 0;
}
function Ch(e) {
  const t = typeof e == "string" ? zt(e) : e;
  return t >= 40 && t <= 66;
}
function Rh(e) {
  return (typeof e == "string" ? zt(e) : e) <= 39;
}
function oa(e) {
  return e <= 66;
}
function Nh(e) {
  const t = typeof e == "string" ? zt(e) : e;
  return aa(t) && !oa(t);
}
function* $h() {
  for (let e = 1; e <= xt.length; e++)
    yield e;
}
const _h = 1, ia = xt.length;
function Mh() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function ho(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= xt.length ? t : xt[n];
}
function sa(e) {
  return e <= 0 || e > ia ? "******" : ra[e - 1];
}
function Ih(e) {
  return sa(zt(e));
}
function aa(e) {
  const t = typeof e == "number" ? ho(e) : e;
  return fo(t) && !po.includes(t);
}
function Ah(e) {
  const t = typeof e == "number" ? ho(e) : e;
  return fo(t) && po.includes(t);
}
function Dh(e) {
  return ra[e - 1].includes("*obsolete*");
}
function jh() {
  const e = {};
  for (let t = 0; t < xt.length; t++)
    e[xt[t]] = t + 1;
  return e;
}
const Fe = {
  allBookIds: xt,
  nonCanonicalIds: po,
  bookIdToNumber: zt,
  isBookIdValid: fo,
  isBookNT: Ch,
  isBookOT: Rh,
  isBookOTNT: oa,
  isBookDC: Nh,
  allBookNumbers: $h,
  firstBook: _h,
  lastBook: ia,
  extraBooks: Mh,
  bookNumberToId: ho,
  bookNumberToEnglishName: sa,
  bookIdToEnglishName: Ih,
  isCanonical: aa,
  isExtraMaterial: Ah,
  isObsolete: Dh
};
var nt = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(nt || {});
const Re = class {
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
te(Re, "Original", new Re(nt.Original)), te(Re, "Septuagint", new Re(nt.Septuagint)), te(Re, "Vulgate", new Re(nt.Vulgate)), te(Re, "English", new Re(nt.English)), te(Re, "RussianProtestant", new Re(nt.RussianProtestant)), te(Re, "RussianOrthodox", new Re(nt.RussianOrthodox));
let $t = Re;
function Ci(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var la = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(la || {});
const we = class oe {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, a = n != null && n instanceof $t ? n : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof $t ? n : void 0;
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
          const i = t instanceof $t ? t : oe.defaultVersification;
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
      if (r instanceof Zt)
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
      throw new Zt(
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
    this.versification = this.versification != null ? new $t(t) : void 0;
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
          this.versification = new $t(nt[a]);
        } catch {
          throw new Zt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Zt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || Fe.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
      throw new Zt("Invalid reference : " + t);
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
    const o = [], i = Ci(this._verse, r);
    for (const a of i.map((l) => Ci(l, n))) {
      const l = this.clone();
      l.verse = a[0];
      const c = l.verseNum;
      if (o.push(l), a.length > 1) {
        const u = this.clone();
        if (u.verse = a[1], !t)
          for (let d = c + 1; d < u.verseNum; d++) {
            const f = new oe(
              this._bookNum,
              this._chapterNum,
              d,
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
te(we, "defaultVersification", $t.English), te(we, "verseRangeSeparator", "-"), te(we, "verseSequenceIndicator", ","), te(we, "verseRangeSeparators", [we.verseRangeSeparator]), te(we, "verseSequenceIndicators", [we.verseSequenceIndicator]), te(we, "chapterDigitShifter", 1e3), te(we, "bookDigitShifter", we.chapterDigitShifter * we.chapterDigitShifter), te(we, "bcvMaxValue", we.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(we, "ValidStatusType", la);
class Zt extends Error {
}
function qn({
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
  defaultValue: d,
  value: f,
  onChange: p,
  onFocus: b,
  onBlur: v
}) {
  return /* @__PURE__ */ k(
    Ni,
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
      defaultValue: d,
      value: f,
      onChange: p,
      onFocus: b,
      onBlur: v
    }
  );
}
let wr;
const Or = () => (wr || (wr = Fe.allBookIds.map((e) => ({
  bookId: e,
  label: Fe.bookIdToEnglishName(e)
}))), wr);
function Qh({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const f = { bookNum: Fe.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, a = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = Bt(() => Or()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ Se("span", { id: n, children: [
    /* @__PURE__ */ k(
      kr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: Or(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ k(
      Tt,
      {
        onClick: () => r(ko(e, -1)),
        isDisabled: e.bookNum <= Va,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(
      Tt,
      {
        onClick: () => r(ko(e, 1)),
        isDisabled: e.bookNum >= Or().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ k(
      qn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ k(
      Tt,
      {
        onClick: () => t(Co(e, -1)),
        isDisabled: e.chapterNum <= Fa,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(
      Tt,
      {
        onClick: () => t(Co(e, 1)),
        isDisabled: e.chapterNum >= za(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ k(
      qn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ k(
      Tt,
      {
        onClick: () => t(Ro(e, -1)),
        isDisabled: e.verseNum <= Ua,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(Tt, { onClick: () => t(Ro(e, 1)), children: ">" })
  ] });
}
function em({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = mt(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ k($a, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ k(
    qn,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (a) => i(a.target.value)
    }
  ) });
}
function tm({
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
  className: d,
  onChange: f,
  onChangeCommitted: p
}) {
  return /* @__PURE__ */ k(
    _a,
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
      className: `papi-slider ${n} ${d ?? ""}`,
      onChange: f,
      onChangeCommitted: p
    }
  );
}
function nm({
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
  return /* @__PURE__ */ k(
    Ma,
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
function rm({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ k(
    Ia,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Ri({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ k(qn, { defaultValue: t[n.key], onChange: r });
}
const Bh = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ k(
  Ha,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function om({
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
  enableSelectColumn: d,
  selectColumnWidth: f = 50,
  rowKeyGetter: p,
  rowHeight: b = 35,
  headerRowHeight: v = 35,
  selectedRows: m,
  onSelectedRowsChange: h,
  onRowsChange: E,
  onCellClick: $,
  onCellDoubleClick: y,
  onCellContextMenu: x,
  onCellKeyDown: g,
  direction: P = "ltr",
  enableVirtualization: S = !0,
  onCopy: A,
  onPaste: D,
  onScroll: I,
  className: B,
  "data-testid": z
}) {
  const U = Bt(() => {
    const V = e.map((M) => typeof M.editable == "function" ? {
      ...M,
      editable: (j) => !!M.editable(j),
      renderEditCell: M.renderEditCell || Ri
    } : M.editable && !M.renderEditCell ? { ...M, renderEditCell: Ri } : M.renderEditCell && !M.editable ? { ...M, editable: !1 } : M);
    return d ? [{ ...Wa, minWidth: f }, ...V] : V;
  }, [e, d, f]);
  return /* @__PURE__ */ k(
    qa,
    {
      columns: U,
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
      rowKeyGetter: p,
      rowHeight: b,
      headerRowHeight: v,
      selectedRows: m,
      onSelectedRowsChange: h,
      onRowsChange: E,
      onCellClick: $,
      onCellDoubleClick: y,
      onCellContextMenu: x,
      onCellKeyDown: g,
      direction: P,
      enableVirtualization: S,
      onCopy: A,
      onPaste: D,
      onScroll: I,
      renderers: { renderCheckbox: Bh },
      className: `papi-table ${B ?? "rdg-light"}`,
      "data-testid": z
    }
  );
}
const Lh = zs(/* @__PURE__ */ k("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Vh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const ca = (e, t, n = {}) => {
  const r = Sr(t);
  r.current = t;
  const o = Sr(n);
  o.current = Vh(o.current);
  const [i, a] = mt(() => r.current), [l, c] = mt(!0);
  return Wn(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const d = await e();
        u && (a(() => d), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || a(() => r.current);
    };
  }, [e]), [i, l];
};
function im({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const [i, a] = mt(!1), [l, c] = mt(!1), u = ht(() => {
    i && a(!1), c(!1);
  }, [i]), d = ht((h) => {
    h.stopPropagation(), a((E) => {
      const $ = !E;
      return $ && h.shiftKey ? c(!0) : $ || c(!1), $;
    });
  }, []), f = Sr(void 0), [p, b] = mt(0);
  Wn(() => {
    i && f.current && b(f.current.clientHeight);
  }, [i]);
  const v = ht(
    (h) => (u(), t(h)),
    [t, u]
  ), [m] = ca(
    ht(async () => e == null ? void 0 : e(l), [e, l, i]),
    void 0
  );
  return /* @__PURE__ */ k("div", { ref: f, style: { position: "relative" }, children: /* @__PURE__ */ k(Aa, { position: "static", id: r, children: /* @__PURE__ */ Se(Da, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    m ? /* @__PURE__ */ k(
      Mi,
      {
        edge: "start",
        className: `papi-menuButton ${n ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: d,
        children: /* @__PURE__ */ k(Lh, {})
      }
    ) : void 0,
    o ? /* @__PURE__ */ k("div", { className: "papi-menu-children", children: o }) : void 0,
    m ? /* @__PURE__ */ k(
      ja,
      {
        className: `papi-menu-drawer ${n ?? ""}`,
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
        children: /* @__PURE__ */ k(
          xf,
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
const sm = (e, t) => {
  Wn(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Pr = () => !1, am = (e, t) => {
  const [n] = ca(
    ht(async () => {
      if (!e)
        return Pr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Pr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Wn(() => () => {
    n !== Pr && n();
  }, [n]);
};
function Fh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Fh(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
}

.mlln6zg7-0-0-beta-42 {
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
}


.cj343x07-0-0-beta-42 {
  @layer rdg.Cell {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning,
     * layout/paint/style containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none;

    &[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }
}

.csofj7r7-0-0-beta-42 {
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
  }
}

.ch2wcw87-0-0-beta-42 {
  @layer rdg.Cell {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
}


.c1bn88vv7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
}

.c1qt073l7-0-0-beta-42 {
  @layer rdg.CheckboxInput {
    all: unset;
  }
}

.cf71kmq7-0-0-beta-42 {
  @layer rdg.CheckboxIcon {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color);

    .c1qt073l7-0-0-beta-42:checked + & {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .c1qt073l7-0-0-beta-42:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
}

.c1lwve4p7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: default;

    .cf71kmq7-0-0-beta-42 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
}


.g1s9ylgp7-0-0-beta-42 {
  @layer rdg.GroupCellContent {
    outline: none;
  }
}

.cz54e4y7-0-0-beta-42 {
  @layer rdg.GroupCellCaret {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle;

    > path {
      transition: d 0.1s;
    }
  }
}


.c1w9bbhr7-0-0-beta-42 {
  @layer rdg.DragHandle {
    --rdg-drag-handle-size: 8px;
    z-index: 0;
    cursor: move;
    inline-size: var(--rdg-drag-handle-size);
    block-size: var(--rdg-drag-handle-size);
    background-color: var(--rdg-selection-color);
    place-self: end;

    &:hover {
      --rdg-drag-handle-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
}

.c1creorc7-0-0-beta-42 {
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
}


.cis5rrm7-0-0-beta-42 {
  @layer rdg.EditCell {
    padding: 0;
  }
}


.h44jtk67-0-0-beta-42 {
  @layer rdg.SortableHeaderCell {
    display: flex;
  }
}

.hcgkhxz7-0-0-beta-42 {
  @layer rdg.SortableHeaderCellName {
    flex-grow: 1;
    overflow: clip;
    text-overflow: ellipsis;
  }
}


.c6l2wv17-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: pointer;
  }
}

.c1kqdw7y7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    touch-action: none;
  }
}

.r1y6ywlx7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: col-resize;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 10px;
  }
}

.c1bezg5o7-0-0-beta-42 {
  opacity: 0.5;
}

.c1vc96037-0-0-beta-42 {
  background-color: var(--rdg-header-draggable-background-color);
}


.r1upfr807-0-0-beta-42 {
  @layer rdg.Row {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color);

    &:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    &[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);

      &:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
    }
  }
}

.r190mhd37-0-0-beta-42 {
  @layer rdg.FocusSink {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
}

.r139qu9m7-0-0-beta-42 {
  @layer rdg.FocusSink {
    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }
}


.h10tskcx7-0-0-beta-42 {
  @layer rdg.HeaderRow {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold;

    & > .cj343x07-0-0-beta-42 {
      /* Should have a higher value than 1 to show up above regular cells and the focus sink */
      z-index: 2;
      position: sticky;
    }

    & > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}


.c6ra8a37-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;
  }
}

.cq910m07-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;

    &.c6ra8a37-0-0-beta-42 {
      background-color: #9999ff;
    }
  }
}


.a3ejtar7-0-0-beta-42 {
  @layer rdg.SortIcon {
    fill: currentColor;

    > path {
      transition: d 0.1s;
    }
  }
}


.rnvodz57-0-0-beta-42 {
  @layer rdg.Defaults {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  @layer rdg.Root {
    --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 90.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
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
    font-size: var(--rdg-font-size);

    /* needed on Firefox to fix scrollbars */
    &::before {
      content: '';
      grid-column: 1/-1;
      grid-row: 1/-1;
    }

    &.rdg-dark {
      --rdg-color-scheme: dark;
      --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
    }

    &.rdg-light {
      --rdg-color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      &:not(.rdg-light) {
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }
    }
  }
}

.vlqv91k7-0-0-beta-42 {
  @layer rdg.Root {
    user-select: none;

    & .r1upfr807-0-0-beta-42 {
      cursor: move;
    }
  }
}

.f1lsfrzw7-0-0-beta-42 {
  @layer rdg.FocusSink {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 1 to show up above regular frozen cells */
    z-index: 1;
  }
}

.f1cte0lg7-0-0-beta-42 {
  @layer rdg.FocusSink {
    /* Should have a higher value than 3 to show up above header and summary rows */
    z-index: 3;
  }
}


.s8wc6fl7-0-0-beta-42 {
  @layer rdg.SummaryCell {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
}


.skuhp557-0-0-beta-42 {
  @layer rdg.SummaryRow {
    line-height: var(--rdg-summary-row-height);

    > .cj343x07-0-0-beta-42 {
      position: sticky;
    }
  }
}

.tf8l5ub7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      z-index: 2;
    }

    > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}

.tb9ughf7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }
}

.b1yssfnt7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }
}


.g1yxluv37-0-0-beta-42 {
  @layer rdg.GroupedRow {
    &:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    > .cj343x07-0-0-beta-42:not(:last-child):not(.ch2wcw87-0-0-beta-42) {
      border-inline-end: none;
    }
  }
}


.t7vyx3i7-0-0-beta-42 {
  @layer rdg.TextEditor {
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
    font-size: var(--rdg-font-size);

    &:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  }
}

`, "top");
export {
  Tt as Button,
  Xh as ChapterRangeSelector,
  Ha as Checkbox,
  kr as ComboBox,
  Yh as ContextMenu,
  xf as GridMenu,
  Jh as IconButton,
  Rt as LabelPosition,
  qs as MenuItem,
  Qh as RefSelector,
  em as SearchBar,
  tm as Slider,
  nm as Snackbar,
  rm as Switch,
  om as Table,
  qn as TextField,
  im as Toolbar,
  sm as useEvent,
  am as useEventAsync,
  ca as usePromise
};
//# sourceMappingURL=index.js.map
