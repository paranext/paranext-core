import u, { forwardRef as ln, createContext as Ea, useContext as ka, useCallback as ae, useState as L, useRef as se, useEffect as ye, useLayoutEffect as Ln, useMemo as fe, Fragment as rr } from "react";
import { clsx as Va } from "clsx";
import { extendTailwindMerge as Pa } from "tailwind-merge";
import { cva as Ue } from "class-variance-authority";
import * as H from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ja } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as cn, Check as ze, Circle as mn, X as dn, Search as ar, ChevronsUpDown as un, FilterIcon as Ga, ChevronDown as Nt, ChevronUp as Ua, ArrowLeftIcon as _a, ChevronLeftIcon as Sa, ChevronRightIcon as Ra, ArrowRightIcon as Ta, Filter as Oa, User as Ma, Link as Ia, CircleHelp as za, Star as Aa, CircleCheckIcon as Ba, CircleXIcon as Fa, CircleHelpIcon as Xa, ArrowUpIcon as $a, ArrowDownIcon as La, ArrowUpDownIcon as Ya, PanelLeft as Ha, PanelRight as Ja, ScrollText as qa, ChevronLeft as Ka, MenuIcon as Wa, Menu as Za, EllipsisVertical as Qa, LoaderCircle as eo } from "lucide-react";
import { formatScrRef as Xe, MODIFIER_KEYS as to, getChaptersForBook as no, NumberFormat as ro, formatBytes as ao, deepEqual as pn, isString as Yt, compareScrRefs as Qt, scrRefToBBBCCCVVV as Ht, getLocalizeKeyForScrollGroupId as F } from "platform-bible-utils";
import { Slot as He } from "@radix-ui/react-slot";
import * as or from "@radix-ui/react-label";
import * as at from "@radix-ui/react-radio-group";
import * as ot from "@radix-ui/react-popover";
import { Command as ue } from "cmdk";
import * as Ce from "@radix-ui/react-dialog";
import { useReactTable as sr, getFilteredRowModel as oo, getSortedRowModel as ir, getPaginationRowModel as so, getCoreRowModel as lr, flexRender as rt, getGroupedRowModel as io, getExpandedRowModel as lo } from "@tanstack/react-table";
import * as W from "@radix-ui/react-select";
import co from "markdown-to-jsx";
import * as en from "@radix-ui/react-checkbox";
import * as Dt from "@radix-ui/react-toggle-group";
import * as cr from "@radix-ui/react-toggle";
import * as mr from "@radix-ui/react-separator";
import * as it from "@radix-ui/react-tooltip";
import * as pe from "@radix-ui/react-tabs";
import * as J from "@radix-ui/react-menubar";
import { useHotkeys as mo } from "react-hotkeys-hook";
import * as Je from "@radix-ui/react-avatar";
import { Drawer as ge } from "vaul";
import * as tn from "@radix-ui/react-progress";
import { Toaster as uo } from "sonner";
import { toast as Sl } from "sonner";
import * as nt from "@radix-ui/react-slider";
import * as nn from "@radix-ui/react-switch";
var wt = { exports: {} }, bt = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yn;
function po() {
  if (Yn) return bt;
  Yn = 1;
  var e = Symbol.for("react.fragment");
  return bt.Fragment = e, bt.jsxDEV = void 0, bt;
}
var ft = {};
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hn;
function wo() {
  return Hn || (Hn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = u, n = Symbol.for("react.element"), r = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), E = Symbol.iterator, G = "@@iterator";
    function C(s) {
      if (s === null || typeof s != "object")
        return null;
      var w = E && s[E] || s[G];
      return typeof w == "function" ? w : null;
    }
    var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function D(s) {
      {
        for (var w = arguments.length, g = new Array(w > 1 ? w - 1 : 0), j = 1; j < w; j++)
          g[j - 1] = arguments[j];
        P("error", s, g);
      }
    }
    function P(s, w, g) {
      {
        var j = y.ReactDebugCurrentFrame, B = j.getStackAddendum();
        B !== "" && (w += "%s", g = g.concat([B]));
        var $ = g.map(function(I) {
          return String(I);
        });
        $.unshift("Warning: " + w), Function.prototype.apply.call(console[s], console, $);
      }
    }
    var M = !1, q = !1, Ee = !1, he = !1, V = !1, v;
    v = Symbol.for("react.module.reference");
    function X(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === a || s === i || V || s === o || s === p || s === x || he || s === b || M || q || Ee || typeof s == "object" && s !== null && (s.$$typeof === h || s.$$typeof === N || s.$$typeof === l || s.$$typeof === c || s.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === v || s.getModuleId !== void 0));
    }
    function U(s, w, g) {
      var j = s.displayName;
      if (j)
        return j;
      var B = w.displayName || w.name || "";
      return B !== "" ? g + "(" + B + ")" : g;
    }
    function ie(s) {
      return s.displayName || "Context";
    }
    function oe(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && D("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case a:
          return "Fragment";
        case r:
          return "Portal";
        case i:
          return "Profiler";
        case o:
          return "StrictMode";
        case p:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case c:
            var w = s;
            return ie(w) + ".Consumer";
          case l:
            var g = s;
            return ie(g._context) + ".Provider";
          case d:
            return U(s, s.render, "ForwardRef");
          case N:
            var j = s.displayName || null;
            return j !== null ? j : oe(s.type) || "Memo";
          case h: {
            var B = s, $ = B._payload, I = B._init;
            try {
              return oe(I($));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var we = Object.assign, le = 0, ne, _, f, S, k, R, re;
    function K() {
    }
    K.__reactDisabledLog = !0;
    function ea() {
      {
        if (le === 0) {
          ne = console.log, _ = console.info, f = console.warn, S = console.error, k = console.group, R = console.groupCollapsed, re = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: K,
            writable: !0
          };
          Object.defineProperties(console, {
            info: s,
            log: s,
            warn: s,
            error: s,
            group: s,
            groupCollapsed: s,
            groupEnd: s
          });
        }
        le++;
      }
    }
    function ta() {
      {
        if (le--, le === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: we({}, s, {
              value: ne
            }),
            info: we({}, s, {
              value: _
            }),
            warn: we({}, s, {
              value: f
            }),
            error: we({}, s, {
              value: S
            }),
            group: we({}, s, {
              value: k
            }),
            groupCollapsed: we({}, s, {
              value: R
            }),
            groupEnd: we({}, s, {
              value: re
            })
          });
        }
        le < 0 && D("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Mt = y.ReactCurrentDispatcher, It;
    function mt(s, w, g) {
      {
        if (It === void 0)
          try {
            throw Error();
          } catch (B) {
            var j = B.stack.trim().match(/\n( *(at )?)/);
            It = j && j[1] || "";
          }
        return `
` + It + s;
      }
    }
    var zt = !1, dt;
    {
      var na = typeof WeakMap == "function" ? WeakMap : Map;
      dt = new na();
    }
    function _n(s, w) {
      if (!s || zt)
        return "";
      {
        var g = dt.get(s);
        if (g !== void 0)
          return g;
      }
      var j;
      zt = !0;
      var B = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var $;
      $ = Mt.current, Mt.current = null, ea();
      try {
        if (w) {
          var I = function() {
            throw Error();
          };
          if (Object.defineProperty(I.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(I, []);
            } catch (me) {
              j = me;
            }
            Reflect.construct(s, [], I);
          } else {
            try {
              I.call();
            } catch (me) {
              j = me;
            }
            s.call(I.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (me) {
            j = me;
          }
          s();
        }
      } catch (me) {
        if (me && j && typeof me.stack == "string") {
          for (var T = me.stack.split(`
`), ce = j.stack.split(`
`), Z = T.length - 1, Q = ce.length - 1; Z >= 1 && Q >= 0 && T[Z] !== ce[Q]; )
            Q--;
          for (; Z >= 1 && Q >= 0; Z--, Q--)
            if (T[Z] !== ce[Q]) {
              if (Z !== 1 || Q !== 1)
                do
                  if (Z--, Q--, Q < 0 || T[Z] !== ce[Q]) {
                    var xe = `
` + T[Z].replace(" at new ", " at ");
                    return s.displayName && xe.includes("<anonymous>") && (xe = xe.replace("<anonymous>", s.displayName)), typeof s == "function" && dt.set(s, xe), xe;
                  }
                while (Z >= 1 && Q >= 0);
              break;
            }
        }
      } finally {
        zt = !1, Mt.current = $, ta(), Error.prepareStackTrace = B;
      }
      var Be = s ? s.displayName || s.name : "", _e = Be ? mt(Be) : "";
      return typeof s == "function" && dt.set(s, _e), _e;
    }
    function ra(s, w, g) {
      return _n(s, !1);
    }
    function aa(s) {
      var w = s.prototype;
      return !!(w && w.isReactComponent);
    }
    function ut(s, w, g) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return _n(s, aa(s));
      if (typeof s == "string")
        return mt(s);
      switch (s) {
        case p:
          return mt("Suspense");
        case x:
          return mt("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case d:
            return ra(s.render);
          case N:
            return ut(s.type, w, g);
          case h: {
            var j = s, B = j._payload, $ = j._init;
            try {
              return ut($(B), w, g);
            } catch {
            }
          }
        }
      return "";
    }
    var We = Object.prototype.hasOwnProperty, Sn = {}, Rn = y.ReactDebugCurrentFrame;
    function pt(s) {
      if (s) {
        var w = s._owner, g = ut(s.type, s._source, w ? w.type : null);
        Rn.setExtraStackFrame(g);
      } else
        Rn.setExtraStackFrame(null);
    }
    function oa(s, w, g, j, B) {
      {
        var $ = Function.call.bind(We);
        for (var I in s)
          if ($(s, I)) {
            var T = void 0;
            try {
              if (typeof s[I] != "function") {
                var ce = Error((j || "React class") + ": " + g + " type `" + I + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[I] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ce.name = "Invariant Violation", ce;
              }
              T = s[I](w, I, j, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              T = Z;
            }
            T && !(T instanceof Error) && (pt(B), D("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", j || "React class", g, I, typeof T), pt(null)), T instanceof Error && !(T.message in Sn) && (Sn[T.message] = !0, pt(B), D("Failed %s type: %s", g, T.message), pt(null));
          }
      }
    }
    var sa = Array.isArray;
    function At(s) {
      return sa(s);
    }
    function ia(s) {
      {
        var w = typeof Symbol == "function" && Symbol.toStringTag, g = w && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return g;
      }
    }
    function la(s) {
      try {
        return Tn(s), !1;
      } catch {
        return !0;
      }
    }
    function Tn(s) {
      return "" + s;
    }
    function On(s) {
      if (la(s))
        return D("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ia(s)), Tn(s);
    }
    var Ze = y.ReactCurrentOwner, ca = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Mn, In, Bt;
    Bt = {};
    function ma(s) {
      if (We.call(s, "ref")) {
        var w = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function da(s) {
      if (We.call(s, "key")) {
        var w = Object.getOwnPropertyDescriptor(s, "key").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function ua(s, w) {
      if (typeof s.ref == "string" && Ze.current && w && Ze.current.stateNode !== w) {
        var g = oe(Ze.current.type);
        Bt[g] || (D('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', oe(Ze.current.type), s.ref), Bt[g] = !0);
      }
    }
    function pa(s, w) {
      {
        var g = function() {
          Mn || (Mn = !0, D("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        g.isReactWarning = !0, Object.defineProperty(s, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function wa(s, w) {
      {
        var g = function() {
          In || (In = !0, D("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        g.isReactWarning = !0, Object.defineProperty(s, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var ba = function(s, w, g, j, B, $, I) {
      var T = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: s,
        key: w,
        ref: g,
        props: I,
        // Record the component responsible for creating this element.
        _owner: $
      };
      return T._store = {}, Object.defineProperty(T._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(T, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.defineProperty(T, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: B
      }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
    };
    function fa(s, w, g, j, B) {
      {
        var $, I = {}, T = null, ce = null;
        g !== void 0 && (On(g), T = "" + g), da(w) && (On(w.key), T = "" + w.key), ma(w) && (ce = w.ref, ua(w, B));
        for ($ in w)
          We.call(w, $) && !ca.hasOwnProperty($) && (I[$] = w[$]);
        if (s && s.defaultProps) {
          var Z = s.defaultProps;
          for ($ in Z)
            I[$] === void 0 && (I[$] = Z[$]);
        }
        if (T || ce) {
          var Q = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          T && pa(I, Q), ce && wa(I, Q);
        }
        return ba(s, T, ce, B, j, Ze.current, I);
      }
    }
    var Ft = y.ReactCurrentOwner, zn = y.ReactDebugCurrentFrame;
    function Ae(s) {
      if (s) {
        var w = s._owner, g = ut(s.type, s._source, w ? w.type : null);
        zn.setExtraStackFrame(g);
      } else
        zn.setExtraStackFrame(null);
    }
    var Xt;
    Xt = !1;
    function $t(s) {
      return typeof s == "object" && s !== null && s.$$typeof === n;
    }
    function An() {
      {
        if (Ft.current) {
          var s = oe(Ft.current.type);
          if (s)
            return `

Check the render method of \`` + s + "`.";
        }
        return "";
      }
    }
    function xa(s) {
      {
        if (s !== void 0) {
          var w = s.fileName.replace(/^.*[\\\/]/, ""), g = s.lineNumber;
          return `

Check your code at ` + w + ":" + g + ".";
        }
        return "";
      }
    }
    var Bn = {};
    function ha(s) {
      {
        var w = An();
        if (!w) {
          var g = typeof s == "string" ? s : s.displayName || s.name;
          g && (w = `

Check the top-level render call using <` + g + ">.");
        }
        return w;
      }
    }
    function Fn(s, w) {
      {
        if (!s._store || s._store.validated || s.key != null)
          return;
        s._store.validated = !0;
        var g = ha(w);
        if (Bn[g])
          return;
        Bn[g] = !0;
        var j = "";
        s && s._owner && s._owner !== Ft.current && (j = " It was passed a child from " + oe(s._owner.type) + "."), Ae(s), D('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, j), Ae(null);
      }
    }
    function Xn(s, w) {
      {
        if (typeof s != "object")
          return;
        if (At(s))
          for (var g = 0; g < s.length; g++) {
            var j = s[g];
            $t(j) && Fn(j, w);
          }
        else if ($t(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var B = C(s);
          if (typeof B == "function" && B !== s.entries)
            for (var $ = B.call(s), I; !(I = $.next()).done; )
              $t(I.value) && Fn(I.value, w);
        }
      }
    }
    function va(s) {
      {
        var w = s.type;
        if (w == null || typeof w == "string")
          return;
        var g;
        if (typeof w == "function")
          g = w.propTypes;
        else if (typeof w == "object" && (w.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        w.$$typeof === N))
          g = w.propTypes;
        else
          return;
        if (g) {
          var j = oe(w);
          oa(g, s.props, "prop", j, s);
        } else if (w.PropTypes !== void 0 && !Xt) {
          Xt = !0;
          var B = oe(w);
          D("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
        }
        typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && D("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ga(s) {
      {
        for (var w = Object.keys(s.props), g = 0; g < w.length; g++) {
          var j = w[g];
          if (j !== "children" && j !== "key") {
            Ae(s), D("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", j), Ae(null);
            break;
          }
        }
        s.ref !== null && (Ae(s), D("Invalid attribute `ref` supplied to `React.Fragment`."), Ae(null));
      }
    }
    var $n = {};
    function Na(s, w, g, j, B, $) {
      {
        var I = X(s);
        if (!I) {
          var T = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = xa(B);
          ce ? T += ce : T += An();
          var Z;
          s === null ? Z = "null" : At(s) ? Z = "array" : s !== void 0 && s.$$typeof === n ? (Z = "<" + (oe(s.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof s, D("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, T);
        }
        var Q = fa(s, w, g, B, $);
        if (Q == null)
          return Q;
        if (I) {
          var xe = w.children;
          if (xe !== void 0)
            if (j)
              if (At(xe)) {
                for (var Be = 0; Be < xe.length; Be++)
                  Xn(xe[Be], s);
                Object.freeze && Object.freeze(xe);
              } else
                D("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Xn(xe, s);
        }
        if (We.call(w, "key")) {
          var _e = oe(s), me = Object.keys(w).filter(function(Ca) {
            return Ca !== "key";
          }), Lt = me.length > 0 ? "{key: someKey, " + me.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!$n[_e + Lt]) {
            var ya = me.length > 0 ? "{" + me.join(": ..., ") + ": ...}" : "{}";
            D(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Lt, _e, ya, _e), $n[_e + Lt] = !0;
          }
        }
        return s === a ? ga(Q) : va(Q), Q;
      }
    }
    var Da = Na;
    ft.Fragment = a, ft.jsxDEV = Da;
  }()), ft;
}
var Jn;
function bo() {
  return Jn || (Jn = 1, process.env.NODE_ENV === "production" ? wt.exports = po() : wt.exports = wo()), wt.exports;
}
var t = bo();
const fo = Pa({ prefix: "tw-" });
function m(...e) {
  return fo(Va(e));
}
const qe = u.forwardRef(
  ({ className: e, type: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV(
    "input",
    {
      type: n,
      className: m(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: a,
      ...r
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/input.tsx",
      lineNumber: 21,
      columnNumber: 7
    },
    void 0
  )
);
qe.displayName = "Input";
const xo = ln(
  ({
    handleSearch: e,
    handleKeyDown: n,
    handleOnClick: r,
    handleSubmit: a,
    className: o,
    ...i
  }, l) => /* @__PURE__ */ t.jsxDEV(
    qe,
    {
      ...i,
      type: "text",
      className: m(
        "tw-relative tw-box-border tw-min-w-0 tw-max-w-48 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",
        o
      ),
      onChange: (c) => e(c.target.value),
      onKeyDown: (c) => {
        c.key === "Enter" ? (a(), c.preventDefault()) : n(c);
      },
      onClick: r,
      ref: l
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-input.component.tsx",
      lineNumber: 31,
      columnNumber: 7
    },
    void 0
  )
), wn = Ea(void 0);
function Ne() {
  const e = ka(wn);
  if (!e)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return e;
}
const ke = Ue("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ho = "layoutDirection";
function te() {
  const e = localStorage.getItem(ho);
  return e === "rtl" ? e : "ltr";
}
const bn = H.Trigger, dr = H.Group, vo = H.Portal, go = H.Sub, Yi = H.RadioGroup;
function yt({ variant: e = "default", ...n }) {
  const r = u.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ t.jsxDEV(wn.Provider, { value: r, children: /* @__PURE__ */ t.jsxDEV(H.Root, { ...n }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
    lineNumber: 119,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
    lineNumber: 118,
    columnNumber: 5
  }, this);
}
const ur = u.forwardRef(({ className: e, inset: n, children: r, ...a }, o) => {
  const i = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    H.SubTrigger,
    {
      ref: o,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        n && "tw-pl-8",
        e,
        ke({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ t.jsxDEV(cn, { className: "tw-ml-auto tw-h-4 tw-w-4" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
          lineNumber: 143,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
      lineNumber: 132,
      columnNumber: 5
    },
    void 0
  );
});
ur.displayName = H.SubTrigger.displayName;
const pr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  H.SubContent,
  {
    ref: r,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
    lineNumber: 154,
    columnNumber: 3
  },
  void 0
));
pr.displayName = H.SubContent.displayName;
const lt = u.forwardRef(({ className: e, sideOffset: n = 4, children: r, ...a }, o) => {
  const i = te();
  return /* @__PURE__ */ t.jsxDEV(H.Portal, { children: /* @__PURE__ */ t.jsxDEV(
    H.Content,
    {
      ref: o,
      sideOffset: n,
      className: m(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...a,
      children: /* @__PURE__ */ t.jsxDEV("div", { dir: i, children: r }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
        lineNumber: 186,
        columnNumber: 9
      }, void 0)
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
      lineNumber: 176,
      columnNumber: 7
    },
    void 0
  ) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
    lineNumber: 175,
    columnNumber: 5
  }, void 0);
});
lt.displayName = H.Content.displayName;
const fn = u.forwardRef(({ className: e, inset: n, ...r }, a) => {
  const o = te(), i = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    H.Item,
    {
      ref: a,
      className: m(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        n && "tw-pl-8",
        e,
        ke({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      dir: o
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
      lineNumber: 201,
      columnNumber: 5
    },
    void 0
  );
});
fn.displayName = H.Item.displayName;
const xn = u.forwardRef(({ className: e, children: n, checked: r, ...a }, o) => {
  const i = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    H.CheckboxItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        ke({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ t.jsxDEV("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ t.jsxDEV(H.ItemIndicator, { children: /* @__PURE__ */ t.jsxDEV(ze, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
          lineNumber: 236,
          columnNumber: 11
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
          lineNumber: 235,
          columnNumber: 9
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
          lineNumber: 234,
          columnNumber: 7
        }, void 0),
        n
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
      lineNumber: 224,
      columnNumber: 5
    },
    void 0
  );
});
xn.displayName = H.CheckboxItem.displayName;
const wr = u.forwardRef(({ className: e, children: n, ...r }, a) => {
  const o = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    H.RadioItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        ke({ variant: o.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      children: [
        /* @__PURE__ */ t.jsxDEV("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ t.jsxDEV(H.ItemIndicator, { children: /* @__PURE__ */ t.jsxDEV(mn, { className: "tw-h-2 tw-w-2 tw-fill-current" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
          lineNumber: 263,
          columnNumber: 11
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
          lineNumber: 262,
          columnNumber: 9
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
          lineNumber: 261,
          columnNumber: 7
        }, void 0),
        n
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
      lineNumber: 252,
      columnNumber: 5
    },
    void 0
  );
});
wr.displayName = H.RadioItem.displayName;
const Ct = u.forwardRef(({ className: e, inset: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV(
  H.Label,
  {
    ref: a,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", n && "tw-pl-8", e),
    ...r
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
    lineNumber: 277,
    columnNumber: 3
  },
  void 0
));
Ct.displayName = H.Label.displayName;
const ct = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  H.Separator,
  {
    ref: r,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
    lineNumber: 290,
    columnNumber: 3
  },
  void 0
));
ct.displayName = H.Separator.displayName;
function No({ className: e, ...n }) {
  return /* @__PURE__ */ t.jsxDEV(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",
      lineNumber: 301,
      columnNumber: 5
    },
    this
  );
}
No.displayName = "DropdownMenuShortcut";
var Do = Object.defineProperty, yo = (e, n, r) => n in e ? Do(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, O = (e, n, r) => yo(e, typeof n != "symbol" ? n + "" : n, r);
const Oe = [
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
], hn = [
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
], br = [
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
], qn = So();
function Ke(e, n = !0) {
  return n && (e = e.toUpperCase()), e in qn ? qn[e] : 0;
}
function vn(e) {
  return Ke(e) > 0;
}
function Co(e) {
  const n = typeof e == "string" ? Ke(e) : e;
  return n >= 40 && n <= 66;
}
function Eo(e) {
  return (typeof e == "string" ? Ke(e) : e) <= 39;
}
function fr(e) {
  return e <= 66;
}
function ko(e) {
  const n = typeof e == "string" ? Ke(e) : e;
  return vr(n) && !fr(n);
}
function* Vo() {
  for (let e = 1; e <= Oe.length; e++) yield e;
}
const Po = 1, xr = Oe.length;
function jo() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function gn(e, n = "***") {
  const r = e - 1;
  return r < 0 || r >= Oe.length ? n : Oe[r];
}
function hr(e) {
  return e <= 0 || e > xr ? "******" : br[e - 1];
}
function Go(e) {
  return hr(Ke(e));
}
function vr(e) {
  const n = typeof e == "number" ? gn(e) : e;
  return vn(n) && !hn.includes(n);
}
function Uo(e) {
  const n = typeof e == "number" ? gn(e) : e;
  return vn(n) && hn.includes(n);
}
function _o(e) {
  return br[e - 1].includes("*obsolete*");
}
function So() {
  const e = {};
  for (let n = 0; n < Oe.length; n++)
    e[Oe[n]] = n + 1;
  return e;
}
const z = {
  allBookIds: Oe,
  nonCanonicalIds: hn,
  bookIdToNumber: Ke,
  isBookIdValid: vn,
  isBookNT: Co,
  isBookOT: Eo,
  isBookOTNT: fr,
  isBookDC: ko,
  allBookNumbers: Vo,
  firstBook: Po,
  lastBook: xr,
  extraBooks: jo,
  bookNumberToId: gn,
  bookNumberToEnglishName: hr,
  bookIdToEnglishName: Go,
  isCanonical: vr,
  isExtraMaterial: Uo,
  isObsolete: _o
};
var De = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(De || {});
const be = class {
  // private versInfo: Versification;
  constructor(n) {
    if (O(this, "name"), O(this, "fullPath"), O(this, "isPresent"), O(this, "hasVerseSegments"), O(this, "isCustomized"), O(this, "baseVersification"), O(this, "scriptureBooks"), O(this, "_type"), n == null)
      throw new Error("Argument undefined");
    typeof n == "string" ? (this.name = n, this._type = De[n]) : (this._type = n, this.name = De[n]);
  }
  get type() {
    return this._type;
  }
  equals(n) {
    return !n.type || !this.type ? !1 : n.type === this.type;
  }
};
O(be, "Original", new be(De.Original)), O(be, "Septuagint", new be(De.Septuagint)), O(be, "Vulgate", new be(De.Vulgate)), O(be, "English", new be(De.English)), O(be, "RussianProtestant", new be(De.RussianProtestant)), O(be, "RussianOrthodox", new be(De.RussianOrthodox));
let Re = be;
function Kn(e, n) {
  const r = n[0];
  for (let a = 1; a < n.length; a++)
    e = e.split(n[a]).join(r);
  return e.split(r);
}
var gr = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(gr || {});
const de = class A {
  constructor(n, r, a, o) {
    if (O(this, "firstChapter"), O(this, "lastChapter"), O(this, "lastVerse"), O(this, "hasSegmentsDefined"), O(this, "text"), O(this, "BBBCCCVVVS"), O(this, "longHashCode"), O(this, "versification"), O(this, "rtlMark", "‏"), O(this, "_bookNum", 0), O(this, "_chapterNum", 0), O(this, "_verseNum", 0), O(this, "_verse"), a == null && o == null)
      if (n != null && typeof n == "string") {
        const i = n, l = r != null && r instanceof Re ? r : void 0;
        this.setEmpty(l), this.parse(i);
      } else if (n != null && typeof n == "number") {
        const i = r != null && r instanceof Re ? r : void 0;
        this.setEmpty(i), this._verseNum = n % A.chapterDigitShifter, this._chapterNum = Math.floor(
          n % A.bookDigitShifter / A.chapterDigitShifter
        ), this._bookNum = Math.floor(n / A.bookDigitShifter);
      } else if (r == null)
        if (n != null && n instanceof A) {
          const i = n;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (n == null) return;
          const i = n instanceof Re ? n : A.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (n != null && r != null && a != null)
      if (typeof n == "string" && typeof r == "string" && typeof a == "string")
        this.setEmpty(o), this.updateInternal(n, r, a);
      else if (typeof n == "number" && typeof r == "number" && typeof a == "number")
        this._bookNum = n, this._chapterNum = r, this._verseNum = a, this.versification = o ?? A.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
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
    let r;
    try {
      return r = new A(n), { success: !0, verseRef: r };
    } catch (a) {
      if (a instanceof Qe)
        return r = new A(), { success: !1, verseRef: r };
      throw a;
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
  static getBBBCCCVVV(n, r, a) {
    return n % A.bcvMaxValue * A.bookDigitShifter + (r >= 0 ? r % A.bcvMaxValue * A.chapterDigitShifter : 0) + (a >= 0 ? a % A.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(n) {
    const { book: r, chapterNum: a, verseNum: o, verse: i, versificationStr: l } = n, c = i || o.toString();
    let d;
    return l && (d = new Re(l)), r ? new A(r, a.toString(), c, d) : new A();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(n) {
    let r;
    if (!n)
      return r = -1, { success: !0, vNum: r };
    r = 0;
    let a;
    for (let o = 0; o < n.length; o++) {
      if (a = n[o], a < "0" || a > "9")
        return o === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +a - 0, r > A.bcvMaxValue)
        return r = -1, { success: !1, vNum: r };
    }
    return { success: !0, vNum: r };
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
    return this._verse != null && (this._verse.includes(A.verseRangeSeparator) || this._verse.includes(A.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return z.bookNumberToId(this.bookNum, "");
  }
  set book(n) {
    this.bookNum = z.bookIdToNumber(n);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(n) {
    const r = +n;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(n) {
    const { success: r, vNum: a } = A.tryGetVerseNum(n);
    this._verse = r ? void 0 : n.replace(this.rtlMark, ""), this._verseNum = a, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = A.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(n) {
    if (n <= 0 || n > z.lastBook)
      throw new Qe(
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
    this.versification = this.versification != null ? new Re(n) : void 0;
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
    return this.validateVerse(A.verseRangeSeparators, A.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return A.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return A.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const l = +i[1].trim();
          this.versification = new Re(De[l]);
        } catch {
          throw new Qe("Invalid reference : " + n);
        }
    }
    const r = n.trim().split(" ");
    if (r.length !== 2)
      throw new Qe("Invalid reference : " + n);
    const a = r[1].split(":"), o = +a[0];
    if (a.length !== 2 || z.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !A.isVerseParseable(a[1]))
      throw new Qe("Invalid reference : " + n);
    this.updateInternal(r[0], a[0], a[1]);
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
    return new A(this);
  }
  toString() {
    const n = this.book;
    return n === "" ? "" : `${n} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let n = this.verse;
    (n === "" || n === this.verseNum.toString()) && (n = void 0);
    const r = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: n,
      versificationStr: this.versificationStr
    };
    return n || delete r.verse, r;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(n) {
    return n instanceof A ? n._bookNum === this._bookNum && n._chapterNum === this._chapterNum && n._verseNum === this._verseNum && n.verse === this.verse && (n.versification == null && this.versification == null || n.versification != null && this.versification != null && n.versification.equals(this.versification)) : !1;
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
  allVerses(n = !1, r = A.verseRangeSeparators, a = A.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = Kn(this._verse, a);
    for (const l of i.map((c) => Kn(c, r))) {
      const c = this.clone();
      c.verse = l[0];
      const d = c.verseNum;
      if (o.push(c), l.length > 1) {
        const p = this.clone();
        if (p.verse = l[1], !n)
          for (let x = d + 1; x < p.verseNum; x++) {
            const N = new A(
              this._bookNum,
              this._chapterNum,
              x,
              this.versification
            );
            this.isExcluded || o.push(N);
          }
        o.push(p);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(n, r) {
    if (!this.verse)
      return this.internalValid;
    let a = 0;
    for (const o of this.allVerses(!0, n, r)) {
      const i = o.internalValid;
      if (i !== 0)
        return i;
      const l = o.BBBCCCVVV;
      if (a > l)
        return 3;
      if (a === l)
        return 4;
      a = l;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > z.lastBook ? 2 : (z.isCanonical(this._bookNum), 0);
  }
  setEmpty(n = A.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = n;
  }
  updateInternal(n, r, a) {
    this.bookNum = z.bookIdToNumber(n), this.chapter = r, this.verse = a;
  }
};
O(de, "defaultVersification", Re.English), O(de, "verseRangeSeparator", "-"), O(de, "verseSequenceIndicator", ","), O(de, "verseRangeSeparators", [de.verseRangeSeparator]), O(de, "verseSequenceIndicators", [de.verseSequenceIndicator]), O(de, "chapterDigitShifter", 1e3), O(de, "bookDigitShifter", de.chapterDigitShifter * de.chapterDigitShifter), O(de, "bcvMaxValue", de.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
O(de, "ValidStatusType", gr);
class Qe extends Error {
}
const Ro = ln(
  ({
    bookId: e,
    handleSelectBook: n,
    isSelected: r,
    handleHighlightBook: a,
    handleKeyDown: o,
    bookType: i,
    children: l
  }, c) => /* @__PURE__ */ t.jsxDEV(
    fn,
    {
      ref: c,
      textValue: e,
      className: m(
        "tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",
        {
          // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
          "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": r
        }
      ),
      onSelect: (d) => {
        d.preventDefault(), n();
      },
      onKeyDown: (d) => {
        o(d);
      },
      onFocus: a,
      onMouseMove: a,
      children: [
        /* @__PURE__ */ t.jsxDEV(
          "span",
          {
            className: m(
              "tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": r,
                "tw-border-s-red-200": i.toLowerCase() === "ot",
                "tw-border-s-purple-200": i.toLowerCase() === "nt",
                "tw-border-s-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: z.bookIdToEnglishName(e)
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-menu-item.component.tsx",
            lineNumber: 66,
            columnNumber: 9
          },
          void 0
        ),
        r && /* @__PURE__ */ t.jsxDEV("div", { children: l }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-menu-item.component.tsx",
          lineNumber: 79,
          columnNumber: 24
        }, void 0)
      ]
    },
    e,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-menu-item.component.tsx",
      lineNumber: 44,
      columnNumber: 7
    },
    void 0
  )
);
function To({
  handleSelectChapter: e,
  endChapter: n,
  activeChapter: r,
  highlightedChapter: a,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: n }, (c, d) => d + 1), l = ae(
    (c) => {
      o(c);
    },
    [o]
  );
  return /* @__PURE__ */ t.jsxDEV("div", { className: m("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: i.map((c) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      className: m(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": c === r,
          "tw-bg-amber-200": c === a
        }
      ),
      onClick: (d) => {
        d.preventDefault(), d.stopPropagation(), e(c);
      },
      role: "button",
      onKeyDown: (d) => {
        d.key === "Enter" && e(c);
      },
      tabIndex: 0,
      onMouseMove: () => l(c),
      children: c
    },
    c,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/chapter-select.component.tsx",
      lineNumber: 44,
      columnNumber: 9
    },
    this
  )) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/chapter-select.component.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
const Oo = 6, Nn = z.allBookIds.filter((e) => !z.isObsolete(z.bookIdToNumber(e))), Mo = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Wn = ["OT", "NT", "DC"], Io = 96, zo = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Zn = /* @__PURE__ */ new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter"
]), Ao = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])', et = (e) => no(z.bookIdToNumber(e));
function Bo() {
  return Nn.map((n) => z.bookIdToEnglishName(n));
}
function Fo(e) {
  return Bo().includes(e);
}
function Xo(e) {
  const n = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (Fo(n))
    return Nn.find((a) => z.bookIdToEnglishName(a) === n);
}
function Ji({
  scrRef: e,
  handleSubmit: n,
  className: r,
  getActiveBookIds: a
}) {
  const o = te(), [i, l] = L(
    () => Xe(e, "English")
  ), [c, d] = L(""), [p, x] = L(e.book), [N, h] = L(e.chapterNum ?? 0), [b, E] = L(e.book), [G, C] = L(!1), [y, D] = L(G), P = se(void 0), M = se(void 0), q = se(void 0), Ee = ae(
    (f) => {
      const S = a ? a() : Nn;
      return {
        OT: S.filter((k) => z.isBookOT(k)),
        NT: S.filter((k) => z.isBookNT(k)),
        DC: S.filter((k) => z.isBookDC(k))
      }[f].filter((k) => {
        const R = z.bookIdToEnglishName(k).toLowerCase(), re = c.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return R.includes(re) || // Match book name
        k.toLowerCase().includes(re);
      });
    },
    [c, a]
    // Only recompute when relevant values change
  ), he = (f) => {
    l(f), d(f);
  }, V = se(!1), v = ae(() => {
    l(Xe(e, "English")), d(""), x(e.book), E(e.book);
  }, [e]), X = ae((f) => {
    if (V.current) {
      V.current = !1;
      return;
    }
    C(f);
  }, []), U = ae(
    (f, S, k, R) => {
      if (h(e.book !== f ? 1 : e.chapterNum), S || et(f) === -1) {
        n({
          book: f,
          chapterNum: k ?? 1,
          verseNum: R ?? 1
        }), C(!1), d("");
        return;
      }
      x(p !== f ? f : ""), C(!S);
    },
    [n, e.book, e.chapterNum, p]
  ), ie = (f) => {
    f <= 0 || f > et(p) || U(p, !0, f);
  }, oe = ae(() => {
    zo.forEach((f) => {
      const S = f.exec(c);
      if (S) {
        const [k, R = void 0, re = void 0] = S.slice(1), K = Xo(k);
        (z.isBookIdValid(k) || K) && U(
          K ?? k,
          !0,
          R ? parseInt(R, 10) : 1,
          re ? parseInt(re, 10) : 1
        );
      }
    });
  }, [U, c]), we = ae(
    (f) => {
      G ? f.key === "ArrowDown" || f.key === "Tab" && !f.shiftKey ? (q != null && q.current ? q.current.focus() : M.current && M.current.focus(), f.preventDefault()) : f.key === "Escape" && document.activeElement === P.current && (C(!1), f.preventDefault(), f.stopPropagation()) : f.key !== "Tab" && C(!0);
    },
    [G]
  ), le = ae((f) => {
    if (!to.has(f.key)) {
      if (f.key === "Tab") {
        if (f.shiftKey)
          P.current.focus();
        else {
          const S = [
            ...document.querySelectorAll(Ao)
          ].filter(
            (R) => {
              var re, K;
              return R instanceof HTMLElement && ((R.offsetWidth > 0 || R.offsetHeight > 0) && !((re = M.current) != null && re.contains(R)) && !((K = P.current) != null && K.contains(R)) || R === f.target);
            }
          ), k = f.target instanceof HTMLElement ? S.indexOf(f.target) : -1;
          k >= 0 ? S[(k + 1) % S.length].focus() : P.current.focus();
        }
        f.preventDefault(), f.stopPropagation();
        return;
      }
      f.stopPropagation(), P.current.focus(), P.current.dispatchEvent(new KeyboardEvent("keydown", { ...f, view: void 0 }));
    }
  }, []), ne = ae(
    (f) => {
      const { key: S } = f;
      Zn.has(S) || (le(f), f.preventDefault());
    },
    [le]
  ), _ = ae(
    (f, S) => {
      const { key: k } = f;
      if (Zn.has(k)) {
        if (b === p) {
          if (k === "Enter") {
            f.preventDefault(), U(p, !0, N);
            return;
          }
          const R = k === "ArrowRight" && !o || k === "ArrowRight" && o === "ltr" || k === "ArrowLeft" && o === "rtl", re = k === "ArrowLeft" && !o || k === "ArrowLeft" && o === "ltr" || k === "ArrowRight" && o === "rtl";
          let K = 0;
          if (R)
            if (N < et(b))
              K = 1;
            else {
              f.preventDefault();
              return;
            }
          else if (re)
            if (N > 1)
              K = -1;
            else {
              f.preventDefault();
              return;
            }
          else k === "ArrowDown" ? K = Oo : k === "ArrowUp" && (K = -6);
          if (N + K <= 0 || N + K > et(b))
            h(0);
          else if (K !== 0) {
            h(N + K), f.preventDefault();
            return;
          }
        }
        if (S === 0 && k === "ArrowUp") {
          f.preventDefault(), P.current.focus();
          return;
        }
        return;
      }
      le(f);
    },
    [
      o,
      b,
      N,
      le,
      p,
      U
    ]
  );
  return ye(() => {
    p === b ? p === e.book ? h(e.chapterNum) : h(1) : h(0);
  }, [b, e.book, e.chapterNum, p]), ye(() => {
    v();
  }, [v]), ye(() => {
  }, [G, v]), Ln(() => {
    D(G);
  }, [G]), Ln(() => {
    const f = setTimeout(() => {
      var S, k;
      if (y && M.current && q.current) {
        const re = q.current.offsetTop - Io;
        M.current.scrollTo({ top: re, behavior: "instant" }), P.current.focus();
      }
      !y && document.activeElement !== P.current && !((S = P.current) != null && S.contains(document.activeElement)) && document.activeElement !== M.current && !((k = M.current) != null && k.contains(document.activeElement)) && v();
    }, 10);
    return () => {
      clearTimeout(f);
    };
  }, [y, v]), /* @__PURE__ */ t.jsxDEV(yt, { modal: !1, open: G, onOpenChange: X, children: [
    /* @__PURE__ */ t.jsxDEV(bn, { asChild: !0, children: /* @__PURE__ */ t.jsxDEV(
      xo,
      {
        ref: P,
        value: i,
        handleSearch: he,
        handleKeyDown: we,
        handleOnClick: () => {
          x(e.book), E(e.book), h(e.chapterNum > 0 ? e.chapterNum : 0), C(!0), P.current.focus();
        },
        onFocus: () => {
          V.current = !0;
        },
        handleSubmit: oe,
        placeholder: Xe(e, "English"),
        className: r
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
        lineNumber: 521,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
      lineNumber: 520,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(
      lt,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        align: o === "ltr" ? "start" : "end",
        ref: M,
        onKeyDown: ne,
        onFocus: (f) => {
          var S, k;
          !((S = P.current) != null && S.contains(f.relatedTarget)) && !((k = M.current) != null && k.contains(f.relatedTarget)) && P.current.select();
        },
        children: /* @__PURE__ */ t.jsxDEV("div", { className: "rtl:tw-ps-2", children: Wn.map((f, S) => {
          const k = Ee(f);
          return k.length > 0 && /* @__PURE__ */ t.jsxDEV("div", { children: [
            /* @__PURE__ */ t.jsxDEV(Ct, { className: "tw-font-semibold tw-text-foreground/80", children: Mo[f] }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
              lineNumber: 566,
              columnNumber: 19
            }, this),
            k.map((R, re) => /* @__PURE__ */ t.jsxDEV("div", { children: /* @__PURE__ */ t.jsxDEV(
              Ro,
              {
                bookId: R,
                handleSelectBook: () => U(R, !1),
                isSelected: p === R,
                handleHighlightBook: () => E(R),
                handleKeyDown: (K) => _(K, re),
                bookType: f,
                ref: (K) => {
                  p === R && (q.current = K);
                },
                children: /* @__PURE__ */ t.jsxDEV(
                  To,
                  {
                    handleSelectChapter: ie,
                    endChapter: et(R),
                    activeChapter: e.book === R ? e.chapterNum : 0,
                    highlightedChapter: N,
                    handleHighlightedChapter: (K) => {
                      h(K);
                    }
                  },
                  void 0,
                  !1,
                  {
                    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
                    lineNumber: 583,
                    columnNumber: 25
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
                lineNumber: 572,
                columnNumber: 23
              },
              this
            ) }, R, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
              lineNumber: 571,
              columnNumber: 21
            }, this)),
            Wn.length - 1 !== S ? /* @__PURE__ */ t.jsxDEV(ct, {}, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
              lineNumber: 597,
              columnNumber: 21
            }, this) : void 0
          ] }, f, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
            lineNumber: 565,
            columnNumber: 17
          }, this);
        }) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
          lineNumber: 560,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
        lineNumber: 542,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",
    lineNumber: 519,
    columnNumber: 5
  }, this);
}
const $o = Ue(
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
), Y = u.forwardRef(
  ({ className: e, variant: n, size: r, asChild: a = !1, ...o }, i) => {
    const l = a ? He : "button";
    return /* @__PURE__ */ t.jsxDEV(l, { className: m($o({ variant: n, size: r, className: e })), ref: i, ...o }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/button.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, void 0);
  }
);
Y.displayName = "Button";
const Lo = Ue(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), ee = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(or.Root, { ref: r, className: m("pr-twp", Lo(), e), ...n }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/label.tsx",
  lineNumber: 28,
  columnNumber: 3
}, void 0));
ee.displayName = or.Root.displayName;
const Dn = u.forwardRef(({ className: e, ...n }, r) => {
  const a = te();
  return /* @__PURE__ */ t.jsxDEV(
    at.Root,
    {
      className: m("pr-twp tw-grid tw-gap-2", e),
      ...n,
      ref: r,
      dir: a
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/radio-group.tsx",
      lineNumber: 22,
      columnNumber: 5
    },
    void 0
  );
});
Dn.displayName = at.Root.displayName;
const ht = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  at.Item,
  {
    ref: r,
    className: m(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...n,
    children: /* @__PURE__ */ t.jsxDEV(at.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ t.jsxDEV(mn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/radio-group.tsx",
      lineNumber: 47,
      columnNumber: 9
    }, void 0) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/radio-group.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, void 0)
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/radio-group.tsx",
    lineNumber: 38,
    columnNumber: 5
  },
  void 0
));
ht.displayName = at.Item.displayName;
const yn = ot.Root, Cn = ot.Trigger, Et = u.forwardRef(({ className: e, align: n = "center", sideOffset: r = 4, ...a }, o) => {
  const i = te();
  return /* @__PURE__ */ t.jsxDEV(ot.Portal, { children: /* @__PURE__ */ t.jsxDEV(
    ot.Content,
    {
      ref: o,
      align: n,
      sideOffset: r,
      className: m(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...a,
      dir: i
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/popover.tsx",
      lineNumber: 27,
      columnNumber: 7
    },
    void 0
  ) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/popover.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, void 0);
});
Et.displayName = ot.Content.displayName;
const Yo = Ce.Portal, Nr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  Ce.Overlay,
  {
    ref: r,
    className: m(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
    lineNumber: 20,
    columnNumber: 3
  },
  void 0
));
Nr.displayName = Ce.Overlay.displayName;
const Ho = u.forwardRef(({ className: e, children: n, ...r }, a) => {
  const o = te();
  return /* @__PURE__ */ t.jsxDEV(Yo, { children: [
    /* @__PURE__ */ t.jsxDEV(Nr, {}, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ t.jsxDEV(
      Ce.Content,
      {
        ref: a,
        className: m(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          e
        ),
        ...r,
        dir: o,
        children: [
          n,
          /* @__PURE__ */ t.jsxDEV(
            Ce.Close,
            {
              className: m(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ t.jsxDEV(dn, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
                  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
                  lineNumber: 56,
                  columnNumber: 11
                }, void 0),
                /* @__PURE__ */ t.jsxDEV("span", { className: "tw-sr-only", children: "Close" }, void 0, !1, {
                  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
                  lineNumber: 57,
                  columnNumber: 11
                }, void 0)
              ]
            },
            void 0,
            !0,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
              lineNumber: 49,
              columnNumber: 9
            },
            void 0
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
        lineNumber: 39,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, void 0);
});
Ho.displayName = Ce.Content.displayName;
const Jo = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  Ce.Title,
  {
    ref: r,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
    lineNumber: 94,
    columnNumber: 3
  },
  void 0
));
Jo.displayName = Ce.Title.displayName;
const qo = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  Ce.Description,
  {
    ref: r,
    className: m("tw-text-sm tw-text-muted-foreground", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",
    lineNumber: 106,
    columnNumber: 3
  },
  void 0
));
qo.displayName = Ce.Description.displayName;
const kt = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  ue,
  {
    ref: r,
    className: m(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
    lineNumber: 14,
    columnNumber: 3
  },
  void 0
));
kt.displayName = ue.displayName;
const Vt = u.forwardRef(({ className: e, ...n }, r) => {
  const a = te();
  return /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ t.jsxDEV(ar, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ t.jsxDEV(
      ue.Input,
      {
        ref: r,
        className: m(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          e
        ),
        ...n
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
        lineNumber: 47,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
    lineNumber: 45,
    columnNumber: 5
  }, void 0);
});
Vt.displayName = ue.Input.displayName;
const Pt = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  ue.List,
  {
    ref: r,
    className: m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
    lineNumber: 65,
    columnNumber: 3
  },
  void 0
));
Pt.displayName = ue.List.displayName;
const jt = u.forwardRef((e, n) => /* @__PURE__ */ t.jsxDEV(ue.Empty, { ref: n, className: "tw-py-6 tw-text-center tw-text-sm", ...e }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
  lineNumber: 78,
  columnNumber: 3
}, void 0));
jt.displayName = ue.Empty.displayName;
const En = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  ue.Group,
  {
    ref: r,
    className: m(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
    lineNumber: 87,
    columnNumber: 3
  },
  void 0
));
En.displayName = ue.Group.displayName;
const Dr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  ue.Separator,
  {
    ref: r,
    className: m("tw--mx-1 tw-h-px tw-bg-border", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
    lineNumber: 103,
    columnNumber: 3
  },
  void 0
));
Dr.displayName = ue.Separator.displayName;
const Gt = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  ue.Item,
  {
    ref: r,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",
    lineNumber: 115,
    columnNumber: 3
  },
  void 0
));
Gt.displayName = ue.Item.displayName;
function Ko(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function rn({
  id: e,
  options: n = [],
  className: r,
  buttonClassName: a,
  popoverContentClassName: o,
  value: i,
  onChange: l = () => {
  },
  getOptionLabel: c = Ko,
  icon: d = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: x = "",
  commandEmptyMessage: N = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: b = "start",
  isDisabled: E = !1,
  ...G
}) {
  const [C, y] = L(!1);
  return /* @__PURE__ */ t.jsxDEV(yn, { open: C, onOpenChange: y, ...G, children: [
    /* @__PURE__ */ t.jsxDEV(Cn, { asChild: !0, children: /* @__PURE__ */ t.jsxDEV(
      Y,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": C,
        id: e,
        className: m(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? r
        ),
        disabled: E,
        children: [
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            d && /* @__PURE__ */ t.jsxDEV("div", { className: "tw-pe-2", children: d }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
              lineNumber: 106,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ t.jsxDEV("span", { className: m("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: i ? c(i) : p }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
              lineNumber: 107,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
            lineNumber: 105,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(un, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
            lineNumber: 112,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
        lineNumber: 94,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
      lineNumber: 93,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(
      Et,
      {
        align: b,
        className: m("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ t.jsxDEV(kt, { children: [
          /* @__PURE__ */ t.jsxDEV(Vt, { placeholder: x, className: "tw-text-inherit" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
            lineNumber: 120,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(jt, { children: N }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
            lineNumber: 121,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(Pt, { children: n.map((D) => /* @__PURE__ */ t.jsxDEV(
            Gt,
            {
              value: c(D),
              onSelect: () => {
                l(D), y(!1);
              },
              children: [
                /* @__PURE__ */ t.jsxDEV(
                  ze,
                  {
                    className: m("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !i || c(i) !== c(D)
                    })
                  },
                  void 0,
                  !1,
                  {
                    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
                    lineNumber: 132,
                    columnNumber: 17
                  },
                  this
                ),
                c(D)
              ]
            },
            c(D),
            !0,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
              lineNumber: 124,
              columnNumber: 15
            },
            this
          )) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
            lineNumber: 122,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
          lineNumber: 119,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
        lineNumber: 115,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",
    lineNumber: 92,
    columnNumber: 5
  }, this);
}
function Wo({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: r,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: i
}) {
  const l = fe(
    () => Array.from({ length: i }, (p, x) => x + 1),
    [i]
  ), c = (p) => {
    r(p), p > n && a(p);
  }, d = (p) => {
    a(p), p < e && r(p);
  };
  return /* @__PURE__ */ t.jsxDEV(t.Fragment, { children: [
    /* @__PURE__ */ t.jsxDEV(ee, { htmlFor: "start-chapters-combobox", children: "Chapters" }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(
      rn,
      {
        isDisabled: o,
        onChange: c,
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: l,
        getOptionLabel: (p) => p.toString(),
        value: e
      },
      "start chapter",
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",
        lineNumber: 58,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ t.jsxDEV(ee, { htmlFor: "end-chapters-combobox", children: "to" }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(
      rn,
      {
        isDisabled: o,
        onChange: d,
        buttonClassName: "tw-ms-2 tw-w-20",
        options: l,
        getOptionLabel: (p) => p.toString(),
        value: n
      },
      "end chapter",
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",
        lineNumber: 69,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}
var Zo = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(Zo || {});
const qi = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Jt = (e, n) => e[n] ?? n;
function Ki({
  handleBookSelectionModeChange: e,
  currentBookName: n,
  onSelectBooks: r,
  selectedBookIds: a,
  chapterCount: o,
  endChapter: i,
  handleSelectEndChapter: l,
  startChapter: c,
  handleSelectStartChapter: d,
  localizedStrings: p
}) {
  const x = Jt(p, "%webView_bookSelector_currentBook%"), N = Jt(p, "%webView_bookSelector_choose%"), h = Jt(p, "%webView_bookSelector_chooseBooks%"), [b, E] = L(
    "current book"
    /* CURRENT_BOOK */
  ), G = (C) => {
    E(C), e(C);
  };
  return /* @__PURE__ */ t.jsxDEV(
    Dn,
    {
      className: "pr-twp tw-flex",
      value: b,
      onValueChange: (C) => G(C),
      children: /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ t.jsxDEV(ht, {
              value: "current book"
              /* CURRENT_BOOK */
            }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
              lineNumber: 107,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV(ee, { className: "tw-ms-1", children: x }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
              lineNumber: 108,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
            lineNumber: 106,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(ee, { className: "tw-flex tw-items-center", children: n }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
            lineNumber: 110,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ t.jsxDEV(
            Wo,
            {
              isDisabled: b === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: l,
              chapterCount: o,
              startChapter: c,
              endChapter: i
            },
            void 0,
            !1,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
              lineNumber: 112,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
            lineNumber: 111,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
          lineNumber: 105,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ t.jsxDEV(ht, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
              lineNumber: 124,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV(ee, { className: "tw-ms-1", children: h }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
              lineNumber: 125,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
            lineNumber: 123,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(ee, { className: "tw-flex tw-items-center", children: a.map((C) => z.bookIdToEnglishName(C)).join(", ") }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
            lineNumber: 127,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(
            Y,
            {
              disabled: b === "current book",
              onClick: () => r(),
              children: N
            },
            void 0,
            !1,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
              lineNumber: 130,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
          lineNumber: 122,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
        lineNumber: 104,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",
      lineNumber: 97,
      columnNumber: 5
    },
    this
  );
}
function Qo({ table: e }) {
  return /* @__PURE__ */ t.jsxDEV(yt, { children: [
    /* @__PURE__ */ t.jsxDEV(ja, { asChild: !0, children: /* @__PURE__ */ t.jsxDEV(Y, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ t.jsxDEV(Ga, { className: "tw-mr-2 tw-h-4 tw-w-4" }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      "View"
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(lt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ t.jsxDEV(Ct, { children: "Toggle columns" }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ t.jsxDEV(ct, {}, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      e.getAllColumns().filter((n) => n.getCanHide()).map((n) => /* @__PURE__ */ t.jsxDEV(
        xn,
        {
          className: "tw-capitalize",
          checked: n.getIsVisible(),
          onCheckedChange: (r) => n.toggleVisibility(!!r),
          children: n.id
        },
        n.id,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",
          lineNumber: 35,
          columnNumber: 15
        },
        this
      ))
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}
const $e = W.Root, es = W.Group, Le = W.Value, ts = Ue(
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
), Me = u.forwardRef(({ className: e, children: n, size: r, ...a }, o) => {
  const i = te();
  return /* @__PURE__ */ t.jsxDEV(
    W.Trigger,
    {
      className: m(ts({ size: r, className: e })),
      ref: o,
      ...a,
      dir: i,
      children: [
        n,
        /* @__PURE__ */ t.jsxDEV(W.Icon, { asChild: !0, children: /* @__PURE__ */ t.jsxDEV(Nt, { className: "tw-h-4 tw-w-4 tw-opacity-50" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
          lineNumber: 72,
          columnNumber: 9
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
          lineNumber: 71,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
      lineNumber: 64,
      columnNumber: 5
    },
    void 0
  );
});
Me.displayName = W.Trigger.displayName;
const yr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  W.ScrollUpButton,
  {
    ref: r,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...n,
    children: /* @__PURE__ */ t.jsxDEV(Ua, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
      lineNumber: 89,
      columnNumber: 5
    }, void 0)
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
    lineNumber: 84,
    columnNumber: 3
  },
  void 0
));
yr.displayName = W.ScrollUpButton.displayName;
const Cr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  W.ScrollDownButton,
  {
    ref: r,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...n,
    children: /* @__PURE__ */ t.jsxDEV(Nt, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
      lineNumber: 104,
      columnNumber: 5
    }, void 0)
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
    lineNumber: 99,
    columnNumber: 3
  },
  void 0
));
Cr.displayName = W.ScrollDownButton.displayName;
const Ie = u.forwardRef(({ className: e, children: n, position: r = "popper", ...a }, o) => {
  const i = te();
  return /* @__PURE__ */ t.jsxDEV(W.Portal, { children: /* @__PURE__ */ t.jsxDEV(
    W.Content,
    {
      ref: o,
      className: m(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        r === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        e
      ),
      position: r,
      ...a,
      children: [
        /* @__PURE__ */ t.jsxDEV(yr, {}, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
          lineNumber: 128,
          columnNumber: 9
        }, void 0),
        /* @__PURE__ */ t.jsxDEV(
          W.Viewport,
          {
            className: m(
              "tw-p-1",
              r === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ t.jsxDEV("div", { dir: i, children: n }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
              lineNumber: 136,
              columnNumber: 11
            }, void 0)
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
            lineNumber: 129,
            columnNumber: 9
          },
          void 0
        ),
        /* @__PURE__ */ t.jsxDEV(Cr, {}, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
          lineNumber: 138,
          columnNumber: 9
        }, void 0)
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
      lineNumber: 117,
      columnNumber: 7
    },
    void 0
  ) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, void 0);
});
Ie.displayName = W.Content.displayName;
const ns = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  W.Label,
  {
    ref: r,
    className: m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
    lineNumber: 150,
    columnNumber: 3
  },
  void 0
));
ns.displayName = W.Label.displayName;
const ve = u.forwardRef(({ className: e, children: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV(
  W.Item,
  {
    ref: a,
    className: m(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ t.jsxDEV("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ t.jsxDEV(W.ItemIndicator, { children: /* @__PURE__ */ t.jsxDEV(ze, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, void 0) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
        lineNumber: 172,
        columnNumber: 7
      }, void 0) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
        lineNumber: 171,
        columnNumber: 5
      }, void 0),
      /* @__PURE__ */ t.jsxDEV(W.ItemText, { children: n }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
        lineNumber: 177,
        columnNumber: 5
      }, void 0)
    ]
  },
  void 0,
  !0,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
    lineNumber: 163,
    columnNumber: 3
  },
  void 0
));
ve.displayName = W.Item.displayName;
const rs = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  W.Separator,
  {
    ref: r,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",
    lineNumber: 187,
    columnNumber: 3
  },
  void 0
));
rs.displayName = W.Separator.displayName;
function as({ table: e }) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ t.jsxDEV("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
        lineNumber: 26,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ t.jsxDEV(
        $e,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (n) => {
            e.setPageSize(Number(n));
          },
          children: [
            /* @__PURE__ */ t.jsxDEV(Me, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ t.jsxDEV(Le, { placeholder: e.getState().pagination.pageSize }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 34,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 33,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV(Ie, { side: "top", children: [10, 20, 30, 40, 50].map((n) => /* @__PURE__ */ t.jsxDEV(ve, { value: `${n}`, children: n }, n, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 38,
              columnNumber: 17
            }, this)) }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 36,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
          lineNumber: 27,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
      lineNumber: 45,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ t.jsxDEV(
        Y,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ t.jsxDEV("span", { className: "tw-sr-only", children: "Go to first page" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 56,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV(_a, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 57,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
          lineNumber: 49,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ t.jsxDEV(
        Y,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ t.jsxDEV("span", { className: "tw-sr-only", children: "Go to previous page" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 66,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV(Sa, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 67,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
          lineNumber: 59,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ t.jsxDEV(
        Y,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ t.jsxDEV("span", { className: "tw-sr-only", children: "Go to next page" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 76,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV(Ra, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 77,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
          lineNumber: 69,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ t.jsxDEV(
        Y,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ t.jsxDEV("span", { className: "tw-sr-only", children: "Go to last page" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 86,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV(Ta, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
              lineNumber: 87,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
          lineNumber: 79,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
const Ut = u.forwardRef(({ className: e, stickyHeader: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV("div", { className: m("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !n }), children: /* @__PURE__ */ t.jsxDEV(
  "table",
  {
    ref: a,
    className: m("tw-w-full tw-caption-bottom tw-text-sm", e),
    ...r
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
    lineNumber: 14,
    columnNumber: 5
  },
  void 0
) }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
  lineNumber: 13,
  columnNumber: 3
}, void 0));
Ut.displayName = "Table";
const _t = u.forwardRef(({ className: e, stickyHeader: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV(
  "thead",
  {
    ref: a,
    className: m(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": n },
      "[&_tr]:tw-border-b",
      e
    ),
    ...r
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
    lineNumber: 28,
    columnNumber: 3
  },
  void 0
));
_t.displayName = "TableHeader";
const St = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV("tbody", { ref: r, className: m("[&_tr:last-child]:tw-border-0", e), ...n }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
  lineNumber: 45,
  columnNumber: 3
}, void 0));
St.displayName = "TableBody";
const os = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  "tfoot",
  {
    ref: r,
    className: m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
    lineNumber: 54,
    columnNumber: 3
  },
  void 0
));
os.displayName = "TableFooter";
const Ge = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "tr",
    {
      ref: r,
      className: m(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
      lineNumber: 65,
      columnNumber: 5
    },
    void 0
  )
);
Ge.displayName = "TableRow";
const st = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  "th",
  {
    ref: r,
    className: m(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
    lineNumber: 82,
    columnNumber: 3
  },
  void 0
));
st.displayName = "TableHead";
const Ye = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  "td",
  {
    ref: r,
    className: m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
    lineNumber: 98,
    columnNumber: 3
  },
  void 0
));
Ye.displayName = "TableCell";
const ss = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  "caption",
  {
    ref: r,
    className: m("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",
    lineNumber: 111,
    columnNumber: 3
  },
  void 0
));
ss.displayName = "TableCaption";
function is({
  columns: e,
  data: n,
  enablePagination: r = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: i = !1,
  onRowClickHandler: l = () => {
  }
}) {
  var C;
  const [c, d] = L([]), [p, x] = L([]), [N, h] = L({}), [b, E] = L({}), G = sr({
    data: n,
    columns: e,
    getCoreRowModel: lr(),
    ...r && { getPaginationRowModel: so() },
    onSortingChange: d,
    getSortedRowModel: ir(),
    onColumnFiltersChange: x,
    getFilteredRowModel: oo(),
    onColumnVisibilityChange: h,
    onRowSelectionChange: E,
    state: {
      sorting: c,
      columnFilters: p,
      columnVisibility: N,
      rowSelection: b
    }
  });
  return /* @__PURE__ */ t.jsxDEV("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ t.jsxDEV(Qo, { table: G }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
      lineNumber: 87,
      columnNumber: 40
    }, this),
    /* @__PURE__ */ t.jsxDEV(Ut, { stickyHeader: i, children: [
      /* @__PURE__ */ t.jsxDEV(_t, { stickyHeader: i, children: G.getHeaderGroups().map((y) => /* @__PURE__ */ t.jsxDEV(Ge, { children: y.headers.map((D) => /* @__PURE__ */ t.jsxDEV(st, { children: D.isPlaceholder ? void 0 : rt(D.column.columnDef.header, D.getContext()) }, D.id, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
        lineNumber: 94,
        columnNumber: 19
      }, this)) }, y.id, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
        lineNumber: 91,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ t.jsxDEV(St, { children: (C = G.getRowModel().rows) != null && C.length ? G.getRowModel().rows.map((y) => /* @__PURE__ */ t.jsxDEV(
        Ge,
        {
          onClick: () => l(y, G),
          "data-state": y.getIsSelected() && "selected",
          children: y.getVisibleCells().map((D) => /* @__PURE__ */ t.jsxDEV(Ye, { children: rt(D.column.columnDef.cell, D.getContext()) }, D.id, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
            lineNumber: 113,
            columnNumber: 19
          }, this))
        },
        y.id,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
          lineNumber: 107,
          columnNumber: 15
        },
        this
      )) : /* @__PURE__ */ t.jsxDEV(Ge, { children: /* @__PURE__ */ t.jsxDEV(Ye, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: "No results." }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
        lineNumber: 121,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
        lineNumber: 120,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    r && /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ t.jsxDEV(
        Y,
        {
          variant: "outline",
          size: "sm",
          onClick: () => G.previousPage(),
          disabled: !G.getCanPreviousPage(),
          children: "Previous"
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
          lineNumber: 130,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ t.jsxDEV(
        Y,
        {
          variant: "outline",
          size: "sm",
          onClick: () => G.nextPage(),
          disabled: !G.getCanNextPage(),
          children: "Next"
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
          lineNumber: 138,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
      lineNumber: 129,
      columnNumber: 9
    }, this),
    r && a && /* @__PURE__ */ t.jsxDEV(as, { table: G }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
      lineNumber: 148,
      columnNumber: 54
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
}
function Wi({ id: e, markdown: n, className: r, anchorTarget: a }) {
  const o = fe(
    () => ({
      overrides: {
        a: {
          props: {
            target: a
          }
        }
      }
    }),
    [a]
  );
  return /* @__PURE__ */ t.jsxDEV("div", { id: e, className: m("pr-twp", r), children: /* @__PURE__ */ t.jsxDEV(co, { options: o, children: n }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/markdown-renderer.component.tsx",
    lineNumber: 41,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/markdown-renderer.component.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}
var ls = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(ls || {});
function Zi({ id: e, label: n, groups: r }) {
  return /* @__PURE__ */ t.jsxDEV("div", { id: e, children: /* @__PURE__ */ t.jsxDEV(yt, { children: [
    /* @__PURE__ */ t.jsxDEV(bn, { asChild: !0, children: /* @__PURE__ */ t.jsxDEV(Y, { variant: "default", children: [
      /* @__PURE__ */ t.jsxDEV(Oa, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
        lineNumber: 62,
        columnNumber: 13
      }, this),
      n,
      /* @__PURE__ */ t.jsxDEV(Nt, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
        lineNumber: 64,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
      lineNumber: 61,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ t.jsxDEV(lt, { children: r.map((a) => /* @__PURE__ */ t.jsxDEV("div", { children: [
      /* @__PURE__ */ t.jsxDEV(Ct, { children: a.groupLabel }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
        lineNumber: 70,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ t.jsxDEV(dr, { children: a.items.map((o) => /* @__PURE__ */ t.jsxDEV("div", { children: o.itemType === 0 ? /* @__PURE__ */ t.jsxDEV(xn, { onClick: o.onClick, children: o.itemLabel }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
        lineNumber: 75,
        columnNumber: 23
      }, this) : /* @__PURE__ */ t.jsxDEV(wr, { onClick: o.onClick, value: o.itemLabel, children: o.itemLabel }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
        lineNumber: 79,
        columnNumber: 23
      }, this) }, o.itemLabel, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
        lineNumber: 73,
        columnNumber: 19
      }, this)) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
        lineNumber: 71,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ t.jsxDEV(ct, {}, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
        lineNumber: 86,
        columnNumber: 15
      }, this)
    ] }, a.groupLabel, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
      lineNumber: 69,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
      lineNumber: 67,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
    lineNumber: 59,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}
function Qi({ id: e, category: n, downloads: r, languages: a, moreInfoUrl: o }) {
  const i = new ro("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((c, d) => c + d, 0)), l = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      id: e,
      className: "tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex", children: /* @__PURE__ */ t.jsxDEV("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: n }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 52,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 51,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ t.jsxDEV("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 54,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
          lineNumber: 50,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ t.jsxDEV(Ma, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
              lineNumber: 58,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ t.jsxDEV("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: i }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
              lineNumber: 59,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 57,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ t.jsxDEV("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 61,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
          lineNumber: 56,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-gap-2", children: a.slice(0, 3).map((c) => /* @__PURE__ */ t.jsxDEV("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c.toUpperCase() }, c, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 66,
            columnNumber: 13
          }, this)) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 64,
            columnNumber: 9
          }, this),
          a.length > 3 && /* @__PURE__ */ t.jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => l(),
              className: "tw-text-xs tw-text-foreground tw-underline",
              children: [
                "+",
                a.length - 3,
                " more languages"
              ]
            },
            void 0,
            !0,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
              lineNumber: 72,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
          lineNumber: 63,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ t.jsxDEV(
              "a",
              {
                href: o,
                target: "_blank",
                rel: "noreferrer",
                className: "tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",
                children: "Website"
              },
              void 0,
              !1,
              {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
                lineNumber: 83,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ t.jsxDEV(Ia, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
              lineNumber: 91,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 82,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ t.jsxDEV(
              "a",
              {
                href: "https://example.com",
                target: "_blank",
                rel: "noreferrer",
                className: "tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",
                children: "Support"
              },
              void 0,
              !1,
              {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
                lineNumber: 94,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ t.jsxDEV(za, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
              lineNumber: 102,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
            lineNumber: 93,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
          lineNumber: 81,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",
      lineNumber: 46,
      columnNumber: 5
    },
    this
  );
}
function cs({ id: e, versionHistory: n }) {
  const [r, a] = L(!1), o = /* @__PURE__ */ new Date();
  function i(c) {
    const d = new Date(c), p = new Date(o.getTime() - d.getTime()), x = p.getUTCFullYear() - 1970, N = p.getUTCMonth(), h = p.getUTCDate() - 1;
    let b = "";
    return x > 0 ? b = `${x.toString()} year${x === 1 ? "" : "s"} ago` : N > 0 ? b = `${N.toString()} month${N === 1 ? "" : "s"} ago` : h === 0 ? b = "today" : b = `${h.toString()} day${h === 1 ? "" : "s"} ago`, b;
  }
  const l = Object.entries(n).sort((c, d) => d[0].localeCompare(c[0]));
  return /* @__PURE__ */ t.jsxDEV("div", { id: e, children: [
    /* @__PURE__ */ t.jsxDEV("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (r ? l : l.slice(0, 5)).map((c) => /* @__PURE__ */ t.jsxDEV("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ t.jsxDEV("div", { className: "tw-text-foreground", children: /* @__PURE__ */ t.jsxDEV("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ t.jsxDEV("span", { children: c[1].description }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
        lineNumber: 71,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
        lineNumber: 70,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
        lineNumber: 69,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ t.jsxDEV("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ t.jsxDEV("div", { children: [
          "Version ",
          c[0]
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
          lineNumber: 75,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ t.jsxDEV("div", { children: i(c[1].date) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
          lineNumber: 76,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
        lineNumber: 74,
        columnNumber: 13
      }, this)
    ] }, c[0], !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
      lineNumber: 68,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this),
    l.length > 5 && /* @__PURE__ */ t.jsxDEV(
      "button",
      {
        type: "button",
        onClick: () => a(!r),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: r ? "Show Less Version History" : "Show All Version History"
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
        lineNumber: 82,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
}
function el({
  id: e,
  publisherDisplayName: n,
  fileSize: r,
  locales: a,
  versionHistory: o
}) {
  const i = fe(() => ao(r), [r]), c = ((d) => {
    const p = new Intl.DisplayNames(navigator.language, { type: "language" });
    return d.map((x) => p.of(x));
  })(a);
  return /* @__PURE__ */ t.jsxDEV("div", { id: e, className: "tw-border-t tw-py-2", children: /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    /* @__PURE__ */ t.jsxDEV(cs, { versionHistory: o }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
      lineNumber: 52,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ t.jsxDEV("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ t.jsxDEV("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ t.jsxDEV("span", { children: "Publisher" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
            lineNumber: 57,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ t.jsxDEV("span", { className: "tw-font-semibold", children: n }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
            lineNumber: 58,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ t.jsxDEV("span", { children: "Size" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
            lineNumber: 59,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ t.jsxDEV("span", { className: "tw-font-semibold", children: i }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
            lineNumber: 60,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
          lineNumber: 56,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ t.jsxDEV("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ t.jsxDEV("span", { children: "Languages" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
            lineNumber: 64,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ t.jsxDEV("span", { className: "tw-font-semibold", children: c.join(", ") }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
            lineNumber: 65,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
          lineNumber: 63,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
          lineNumber: 62,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
        lineNumber: 55,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
      lineNumber: 53,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
    lineNumber: 51,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}
const ms = Ue(
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
), vt = u.forwardRef(
  ({ className: e, variant: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV("div", { ref: a, className: m("pr-twp", ms({ variant: n }), e), ...r }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/badge.tsx",
    lineNumber: 55,
    columnNumber: 7
  }, void 0)
);
vt.displayName = "Badge";
function ds({
  entries: e,
  getEntriesCount: n = void 0,
  selected: r,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: i = "No entries found",
  customSelectedText: l,
  isDisabled: c = !1,
  sortSelected: d = !1,
  icon: p = void 0,
  className: x = void 0
}) {
  const [N, h] = L(!1), b = ae(
    (C) => {
      var D;
      const y = (D = e.find((P) => P.label === C)) == null ? void 0 : D.value;
      y && a(
        r.includes(y) ? r.filter((P) => P !== y) : [...r, y]
      );
    },
    [e, r, a]
  ), E = () => l || o, G = fe(() => {
    if (!d) return e;
    const C = e.filter((D) => D.starred).sort((D, P) => D.label.localeCompare(P.label)), y = e.filter((D) => !D.starred).sort((D, P) => {
      const M = r.includes(D.value), q = r.includes(P.value);
      return M && !q ? -1 : !M && q ? 1 : D.label.localeCompare(P.label);
    });
    return [...C, ...y];
  }, [e, r, d]);
  return /* @__PURE__ */ t.jsxDEV("div", { className: x, children: /* @__PURE__ */ t.jsxDEV(yn, { open: N, onOpenChange: h, children: [
    /* @__PURE__ */ t.jsxDEV(Cn, { asChild: !0, children: /* @__PURE__ */ t.jsxDEV(
      Y,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": N,
        className: m(
          "tw-w-full tw-justify-between",
          r.length > 0 && r.length < e.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: c,
        children: [
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ t.jsxDEV("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ t.jsxDEV("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: p }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
              lineNumber: 120,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
              lineNumber: 119,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ t.jsxDEV(
              "div",
              {
                className: m({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": r.length === 0 || r.length === e.length
                }),
                children: /* @__PURE__ */ t.jsxDEV("div", { className: "tw-font-normal", children: E() }, void 0, !1, {
                  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
                  lineNumber: 130,
                  columnNumber: 17
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
                lineNumber: 124,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ t.jsxDEV(un, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
            lineNumber: 133,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
        lineNumber: 107,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ t.jsxDEV(Et, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ t.jsxDEV(kt, { children: [
      /* @__PURE__ */ t.jsxDEV(Vt, { placeholder: `Search ${o.toLowerCase()}...` }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
        lineNumber: 138,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ t.jsxDEV(Pt, { children: [
        /* @__PURE__ */ t.jsxDEV(jt, { children: i }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ t.jsxDEV(En, { children: G.map((C) => {
          const y = n ? n(C) : void 0;
          return /* @__PURE__ */ t.jsxDEV(
            Gt,
            {
              value: C.label,
              onSelect: b,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ t.jsxDEV("div", { className: "w-4", children: /* @__PURE__ */ t.jsxDEV(
                  ze,
                  {
                    className: m(
                      "tw-h-4 tw-w-4",
                      r.includes(C.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
                    lineNumber: 154,
                    columnNumber: 25
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
                  lineNumber: 153,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ t.jsxDEV("div", { className: "tw-w-4", children: C.starred && /* @__PURE__ */ t.jsxDEV(Aa, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
                  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
                  lineNumber: 162,
                  columnNumber: 44
                }, this) }, void 0, !1, {
                  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
                  lineNumber: 161,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex-grow", children: C.label }, void 0, !1, {
                  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
                  lineNumber: 164,
                  columnNumber: 23
                }, this),
                n && /* @__PURE__ */ t.jsxDEV("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: y }, void 0, !1, {
                  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
                  lineNumber: 166,
                  columnNumber: 25
                }, this)
              ]
            },
            C.label,
            !0,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
              lineNumber: 147,
              columnNumber: 21
            },
            this
          );
        }) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
        lineNumber: 139,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
      lineNumber: 137,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
      lineNumber: 136,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
    lineNumber: 105,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",
    lineNumber: 104,
    columnNumber: 5
  }, this);
}
function tl({
  entries: e,
  getEntriesCount: n,
  selected: r,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: i,
  customSelectedText: l,
  isDisabled: c,
  sortSelected: d,
  icon: p,
  className: x,
  badgesPlaceholder: N
}) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ t.jsxDEV(
      ds,
      {
        entries: e,
        getEntriesCount: n,
        selected: r,
        onChange: a,
        placeholder: o,
        commandEmptyMessage: i,
        customSelectedText: l,
        isDisabled: c,
        sortSelected: d,
        icon: p,
        className: x
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",
        lineNumber: 37,
        columnNumber: 7
      },
      this
    ),
    r.length > 0 ? /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: r.map((h) => {
      var b;
      return /* @__PURE__ */ t.jsxDEV(vt, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ t.jsxDEV(
          Y,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => a(r.filter((E) => E !== h)),
            children: /* @__PURE__ */ t.jsxDEV(dn, { className: "tw-h-3 tw-w-3" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",
              lineNumber: 60,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",
            lineNumber: 54,
            columnNumber: 15
          },
          this
        ),
        (b = e.find((E) => E.value === h)) == null ? void 0 : b.label
      ] }, h, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",
        lineNumber: 53,
        columnNumber: 13
      }, this);
    }) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",
      lineNumber: 51,
      columnNumber: 9
    }, this) : /* @__PURE__ */ t.jsxDEV(ee, { children: N }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",
      lineNumber: 67,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}
function us({
  occurrenceData: e,
  setScriptureReference: n,
  localizedStrings: r
}) {
  const a = r["%webView_inventory_occurrences_table_header_reference%"], o = r["%webView_inventory_occurrences_table_header_occurrence%"], i = fe(() => {
    const l = [];
    return e.forEach((c) => {
      l.some((d) => pn(d, c)) || l.push(c);
    }), l;
  }, [e]);
  return /* @__PURE__ */ t.jsxDEV(Ut, { stickyHeader: !0, children: [
    /* @__PURE__ */ t.jsxDEV(_t, { stickyHeader: !0, children: /* @__PURE__ */ t.jsxDEV(Ge, { children: [
      /* @__PURE__ */ t.jsxDEV(st, { children: a }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ t.jsxDEV(st, { children: o }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
        lineNumber: 59,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(St, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ t.jsxDEV(
      Ge,
      {
        onClick: () => {
          n(l.reference);
        },
        children: [
          /* @__PURE__ */ t.jsxDEV(Ye, { children: `${z.bookIdToEnglishName(l.reference.book)} ${l.reference.chapterNum}:${l.reference.verseNum}` }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
            lineNumber: 73,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ t.jsxDEV(Ye, { children: l.text }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
            lineNumber: 74,
            columnNumber: 15
          }, this)
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
        lineNumber: 65,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
      lineNumber: 62,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
}
const kn = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  en.Root,
  {
    ref: r,
    className: m(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...n,
    children: /* @__PURE__ */ t.jsxDEV(
      en.Indicator,
      {
        className: m("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ t.jsxDEV(ze, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/checkbox.tsx",
          lineNumber: 29,
          columnNumber: 7
        }, void 0)
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/checkbox.tsx",
        lineNumber: 26,
        columnNumber: 5
      },
      void 0
    )
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/checkbox.tsx",
    lineNumber: 18,
    columnNumber: 3
  },
  void 0
));
kn.displayName = en.Root.displayName;
const Er = Ue(
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
), ps = u.forwardRef(({ className: e, variant: n, size: r, ...a }, o) => /* @__PURE__ */ t.jsxDEV(
  cr.Root,
  {
    ref: o,
    className: m(Er({ variant: n, size: r, className: e })),
    ...a
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/toggle.tsx",
    lineNumber: 33,
    columnNumber: 3
  },
  void 0
));
ps.displayName = cr.Root.displayName;
const kr = u.createContext({
  size: "default",
  variant: "default"
}), Vr = u.forwardRef(({ className: e, variant: n, size: r, children: a, ...o }, i) => {
  const l = te();
  return /* @__PURE__ */ t.jsxDEV(
    Dt.Root,
    {
      ref: i,
      className: m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
      ...o,
      dir: l,
      children: /* @__PURE__ */ t.jsxDEV(
        kr.Provider,
        {
          value: { variant: n, size: r },
          children: a
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/toggle-group.tsx",
          lineNumber: 34,
          columnNumber: 7
        },
        void 0
      )
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/toggle-group.tsx",
      lineNumber: 28,
      columnNumber: 5
    },
    void 0
  );
});
Vr.displayName = Dt.Root.displayName;
const xt = u.forwardRef(({ className: e, children: n, variant: r, size: a, ...o }, i) => {
  const l = u.useContext(kr);
  return /* @__PURE__ */ t.jsxDEV(
    Dt.Item,
    {
      ref: i,
      className: m(
        Er({
          variant: l.variant || r,
          size: l.size || a
        }),
        e
      ),
      ...o,
      children: n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/toggle-group.tsx",
      lineNumber: 56,
      columnNumber: 5
    },
    void 0
  );
});
xt.displayName = Dt.Item.displayName;
const Rt = (e) => e === "asc" ? /* @__PURE__ */ t.jsxDEV($a, { className: "tw-ms-2 tw-h-4 tw-w-4" }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
  lineNumber: 24,
  columnNumber: 12
}, void 0) : e === "desc" ? /* @__PURE__ */ t.jsxDEV(La, { className: "tw-ms-2 tw-h-4 tw-w-4" }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
  lineNumber: 27,
  columnNumber: 12
}, void 0) : /* @__PURE__ */ t.jsxDEV(Ya, { className: "tw-ms-2 tw-h-4 tw-w-4" }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
  lineNumber: 29,
  columnNumber: 10
}, void 0), nl = (e) => ({
  accessorKey: "item",
  accessorFn: (n) => n.items[0],
  header: ({ column: n }) => /* @__PURE__ */ t.jsxDEV(Y, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    Rt(n.getIsSorted())
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
    lineNumber: 43,
    columnNumber: 7
  }, void 0)
}), ws = (e, n) => ({
  accessorKey: `item${n}`,
  accessorFn: (r) => r.items[n],
  header: ({ column: r }) => /* @__PURE__ */ t.jsxDEV(Y, { variant: "ghost", onClick: () => r.toggleSorting(void 0), children: [
    e,
    Rt(r.getIsSorted())
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
    lineNumber: 69,
    columnNumber: 7
  }, void 0)
}), rl = (e) => ({
  accessorKey: "count",
  header: ({ column: n }) => /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ t.jsxDEV(Y, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    Rt(n.getIsSorted())
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
    lineNumber: 89,
    columnNumber: 9
  }, void 0) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
    lineNumber: 88,
    columnNumber: 7
  }, void 0),
  cell: ({ row: n }) => /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-justify-end", children: n.getValue("count") }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
    lineNumber: 95,
    columnNumber: 24
  }, void 0)
}), qt = (e, n, r, a, o, i) => {
  let l = [...r];
  e.forEach((d) => {
    n === "approved" ? l.includes(d) || l.push(d) : l = l.filter((p) => p !== d);
  }), a(l);
  let c = [...o];
  e.forEach((d) => {
    n === "unapproved" ? c.includes(d) || c.push(d) : c = c.filter((p) => p !== d);
  }), i(c);
}, al = (e, n, r, a, o) => ({
  accessorKey: "status",
  header: ({ column: i }) => /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ t.jsxDEV(Y, { variant: "ghost", onClick: () => i.toggleSorting(void 0), children: [
    e,
    Rt(i.getIsSorted())
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
    lineNumber: 166,
    columnNumber: 11
  }, void 0) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
    lineNumber: 165,
    columnNumber: 9
  }, void 0),
  cell: ({ row: i }) => {
    const l = i.getValue("status"), c = i.getValue("item");
    return /* @__PURE__ */ t.jsxDEV(Vr, { value: l, variant: "outline", type: "single", children: [
      /* @__PURE__ */ t.jsxDEV(
        xt,
        {
          onClick: (d) => {
            d.stopPropagation(), qt(
              [c],
              "approved",
              n,
              r,
              a,
              o
            );
          },
          value: "approved",
          children: /* @__PURE__ */ t.jsxDEV(Ba, {}, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
            lineNumber: 192,
            columnNumber: 13
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
          lineNumber: 178,
          columnNumber: 11
        },
        void 0
      ),
      /* @__PURE__ */ t.jsxDEV(
        xt,
        {
          onClick: (d) => {
            d.stopPropagation(), qt(
              [c],
              "unapproved",
              n,
              r,
              a,
              o
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ t.jsxDEV(Fa, {}, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
            lineNumber: 208,
            columnNumber: 13
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
          lineNumber: 194,
          columnNumber: 11
        },
        void 0
      ),
      /* @__PURE__ */ t.jsxDEV(
        xt,
        {
          onClick: (d) => {
            d.stopPropagation(), qt(
              [c],
              "unknown",
              n,
              r,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ t.jsxDEV(Xa, {}, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
            lineNumber: 224,
            columnNumber: 13
          }, void 0)
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
          lineNumber: 210,
          columnNumber: 11
        },
        void 0
      )
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",
      lineNumber: 177,
      columnNumber: 9
    }, void 0);
  }
}), ol = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), sl = (e) => {
  const n = /^\\[vc]\s+(\d+)/, r = e.match(n);
  if (r)
    return +r[1];
}, il = (e) => {
  const n = e.match(/^\\id\s+([A-Za-z]+)/);
  return n ? n[1] : "";
}, bs = (e, n, r) => r.includes(e) ? "unapproved" : n.includes(e) ? "approved" : "unknown", ll = Object.freeze([
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
  "%webView_inventory_occurrences_table_header_occurrence%"
]), fs = (e, n, r) => {
  let a = e;
  return n !== "all" && (a = a.filter(
    (o) => n === "approved" && o.status === "approved" || n === "unapproved" && o.status === "unapproved" || n === "unknown" && o.status === "unknown"
  )), r !== "" && (a = a.filter((o) => o.items[0].includes(r))), a;
}, xs = (e, n, r) => {
  const a = [];
  return e.forEach((o) => {
    const i = a.find(
      (l) => pn(
        l.items,
        Yt(o.inventoryText) ? [o.inventoryText] : o.inventoryText
      )
    );
    if (i)
      i.count += 1, i.occurrences.push({
        reference: o.verseRef,
        text: o.verse
      });
    else {
      const l = {
        items: Yt(o.inventoryText) ? [o.inventoryText] : o.inventoryText,
        count: 1,
        status: bs(
          Yt(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
          n,
          r
        ),
        occurrences: [
          {
            reference: o.verseRef,
            text: o.verse
          }
        ]
      };
      a.push(l);
    }
  }), a;
}, Ve = (e, n) => e[n] ?? n;
function cl({
  inventoryItems: e,
  setVerseRef: n,
  localizedStrings: r,
  additionalItemsLabels: a,
  approvedItems: o,
  unapprovedItems: i,
  scope: l,
  onScopeChange: c,
  columns: d
}) {
  const p = Ve(r, "%webView_inventory_all%"), x = Ve(r, "%webView_inventory_approved%"), N = Ve(r, "%webView_inventory_unapproved%"), h = Ve(r, "%webView_inventory_unknown%"), b = Ve(r, "%webView_inventory_scope_currentBook%"), E = Ve(r, "%webView_inventory_scope_chapter%"), G = Ve(r, "%webView_inventory_filter_text%"), C = Ve(
    r,
    "%webView_inventory_show_additional_items%"
  ), [y, D] = L(!1), [P, M] = L("all"), [q, Ee] = L(""), [he, V] = L([]), v = fe(() => e.length === 0 ? [] : xs(e, o, i), [e, o, i]), X = fe(() => {
    if (y) return v;
    const _ = [];
    return v.forEach((f) => {
      const S = f.items[0], k = _.find(
        (R) => R.items[0] === S
      );
      k ? (k.count += f.count, k.occurrences = k.occurrences.concat(f.occurrences)) : _.push({
        items: [S],
        count: f.count,
        occurrences: f.occurrences,
        status: f.status
      });
    }), _;
  }, [y, v]), U = fe(() => fs(X, P, q), [X, P, q]), ie = fe(() => {
    var S, k;
    if (!y) return d;
    const _ = (S = a == null ? void 0 : a.tableHeaders) == null ? void 0 : S.length;
    if (!_) return d;
    const f = [];
    for (let R = 0; R < _; R++)
      f.push(
        ws(
          ((k = a == null ? void 0 : a.tableHeaders) == null ? void 0 : k[R]) || "Additional Item",
          R + 1
        )
      );
    return [...f, ...d];
  }, [a == null ? void 0 : a.tableHeaders, d, y]);
  ye(() => {
    U.length === 0 ? V([]) : U.length === 1 && V(U[0].items);
  }, [U]);
  const oe = (_, f) => {
    f.setRowSelection(() => {
      const S = {};
      return S[_.index] = !0, S;
    }), V(_.original.items);
  }, we = (_) => {
    if (_ === "book" || _ === "chapter")
      c(_);
    else
      throw new Error(`Invalid scope value: ${_}`);
  }, le = (_) => {
    if (_ === "all" || _ === "approved" || _ === "unapproved" || _ === "unknown")
      M(_);
    else
      throw new Error(`Invalid status filter value: ${_}`);
  }, ne = fe(() => {
    if (X.length === 0 || he.length === 0) return [];
    const _ = X.filter((f) => pn(
      y ? f.items : [f.items[0]],
      he
    ));
    if (_.length > 1) throw new Error("Selected item is not unique");
    return _.length === 0 ? [] : _[0].occurrences;
  }, [he, y, X]);
  return /* @__PURE__ */ t.jsxDEV("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ t.jsxDEV(
        $e,
        {
          onValueChange: (_) => le(_),
          defaultValue: P,
          children: [
            /* @__PURE__ */ t.jsxDEV(Me, { className: "tw-m-1", children: /* @__PURE__ */ t.jsxDEV(Le, { placeholder: "Select filter" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
              lineNumber: 364,
              columnNumber: 13
            }, this) }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
              lineNumber: 363,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ t.jsxDEV(Ie, { children: [
              /* @__PURE__ */ t.jsxDEV(ve, { value: "all", children: p }, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
                lineNumber: 367,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ t.jsxDEV(ve, { value: "approved", children: x }, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
                lineNumber: 368,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ t.jsxDEV(ve, { value: "unapproved", children: N }, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
                lineNumber: 369,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ t.jsxDEV(ve, { value: "unknown", children: h }, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
                lineNumber: 370,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
              lineNumber: 366,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
          lineNumber: 359,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ t.jsxDEV($e, { onValueChange: (_) => we(_), defaultValue: l, children: [
        /* @__PURE__ */ t.jsxDEV(Me, { className: "tw-m-1", children: /* @__PURE__ */ t.jsxDEV(Le, { placeholder: "Select scope" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
          lineNumber: 375,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
          lineNumber: 374,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ t.jsxDEV(Ie, { children: [
          /* @__PURE__ */ t.jsxDEV(ve, { value: "book", children: b }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
            lineNumber: 378,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ t.jsxDEV(ve, { value: "chapter", children: E }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
            lineNumber: 379,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
          lineNumber: 377,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
        lineNumber: 373,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ t.jsxDEV(
        qe,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: G,
          value: q,
          onChange: (_) => {
            Ee(_.target.value);
          }
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
          lineNumber: 382,
          columnNumber: 9
        },
        this
      ),
      a && /* @__PURE__ */ t.jsxDEV("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ t.jsxDEV(
          kn,
          {
            className: "tw-m-1",
            checked: y,
            onCheckedChange: (_) => {
              D(_);
            }
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
            lineNumber: 392,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ t.jsxDEV(ee, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (a == null ? void 0 : a.checkboxText) ?? C }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
          lineNumber: 399,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
        lineNumber: 391,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
      lineNumber: 358,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ t.jsxDEV(
      is,
      {
        columns: ie,
        data: U,
        onRowClickHandler: oe,
        stickyHeader: !0
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
        lineNumber: 406,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
      lineNumber: 405,
      columnNumber: 7
    }, this),
    ne.length > 0 && /* @__PURE__ */ t.jsxDEV("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ t.jsxDEV(
      us,
      {
        occurrenceData: ne,
        setScriptureReference: n,
        localizedStrings: r
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
        lineNumber: 415,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
      lineNumber: 414,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",
    lineNumber: 357,
    columnNumber: 5
  }, this);
}
const Vn = u.forwardRef(({ className: e, orientation: n = "horizontal", decorative: r = !0, ...a }, o) => /* @__PURE__ */ t.jsxDEV(
  mr.Root,
  {
    ref: o,
    decorative: r,
    orientation: n,
    className: m(
      "pr-twp tw-shrink-0 tw-bg-border",
      n === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...a
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/separator.tsx",
    lineNumber: 17,
    columnNumber: 3
  },
  void 0
));
Vn.displayName = mr.Root.displayName;
function Qn({ className: e, ...n }) {
  return /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      className: m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/skeleton.tsx",
      lineNumber: 6,
      columnNumber: 5
    },
    this
  );
}
const Pn = it.Provider, jn = it.Root, Gn = it.Trigger, Tt = u.forwardRef(({ className: e, sideOffset: n = 4, ...r }, a) => /* @__PURE__ */ t.jsxDEV(
  it.Content,
  {
    ref: a,
    sideOffset: n,
    className: m(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...r
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/tooltip.tsx",
    lineNumber: 25,
    columnNumber: 3
  },
  void 0
));
Tt.displayName = it.Content.displayName;
const hs = "16rem", vs = "3rem", Pr = u.createContext(void 0);
function Ot() {
  const e = u.useContext(Pr);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return e;
}
const jr = u.forwardRef(
  ({
    defaultOpen: e = !0,
    open: n,
    onOpenChange: r,
    className: a,
    style: o,
    children: i,
    side: l = "primary",
    ...c
  }, d) => {
    const [p, x] = u.useState(e), N = n ?? p, h = u.useCallback(
      (P) => {
        const M = typeof P == "function" ? P(N) : P;
        r ? r(M) : x(M);
      },
      [r, N]
    ), b = u.useCallback(() => h((P) => !P), [h]), E = N ? "expanded" : "collapsed", y = te() === "ltr" ? l : l === "primary" ? "secondary" : "primary", D = u.useMemo(
      () => ({
        state: E,
        open: N,
        setOpen: h,
        toggleSidebar: b,
        side: y
      }),
      [E, N, h, b, y]
    );
    return /* @__PURE__ */ t.jsxDEV(Pr.Provider, { value: D, children: /* @__PURE__ */ t.jsxDEV(Pn, { delayDuration: 0, children: /* @__PURE__ */ t.jsxDEV(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": hs,
            "--sidebar-width-icon": vs,
            ...o
          }
        ),
        className: m(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          a
        ),
        ref: d,
        ...c,
        children: i
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
        lineNumber: 131,
        columnNumber: 11
      },
      void 0
    ) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 130,
      columnNumber: 9
    }, void 0) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 129,
      columnNumber: 7
    }, void 0);
  }
);
jr.displayName = "SidebarProvider";
const Gr = u.forwardRef(({ variant: e = "sidebar", collapsible: n = "offcanvas", className: r, children: a, ...o }, i) => {
  const l = Ot();
  return n === "none" ? /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      className: m(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        r
      ),
      ref: i,
      ...o,
      children: a
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 168,
      columnNumber: 7
    },
    void 0
  ) : /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: i,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": l.state,
      "data-collapsible": l.state === "collapsed" ? n : "",
      "data-variant": e,
      "data-side": l.side,
      children: [
        /* @__PURE__ */ t.jsxDEV(
          "div",
          {
            className: m(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
            lineNumber: 191,
            columnNumber: 7
          },
          void 0
        ),
        /* @__PURE__ */ t.jsxDEV(
          "div",
          {
            className: m(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              l.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              e === "floating" || e === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              r
            ),
            ...o,
            children: /* @__PURE__ */ t.jsxDEV(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                children: a
              },
              void 0,
              !1,
              {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
                lineNumber: 216,
                columnNumber: 9
              },
              void 0
            )
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
            lineNumber: 201,
            columnNumber: 7
          },
          void 0
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 182,
      columnNumber: 5
    },
    void 0
  );
});
Gr.displayName = "Sidebar";
const gs = u.forwardRef(({ className: e, onClick: n, ...r }, a) => {
  const o = Ot();
  return /* @__PURE__ */ t.jsxDEV(
    Y,
    {
      ref: a,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: m("tw-h-7 tw-w-7", e),
      onClick: (i) => {
        n == null || n(i), o.toggleSidebar();
      },
      ...r,
      children: [
        o.side === "primary" ? /* @__PURE__ */ t.jsxDEV(Ha, {}, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
          lineNumber: 247,
          columnNumber: 37
        }, void 0) : /* @__PURE__ */ t.jsxDEV(Ja, {}, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
          lineNumber: 247,
          columnNumber: 53
        }, void 0),
        /* @__PURE__ */ t.jsxDEV("span", { className: "tw-sr-only", children: "Toggle Sidebar" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
          lineNumber: 248,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 235,
      columnNumber: 5
    },
    void 0
  );
});
gs.displayName = "SidebarTrigger";
const Ns = u.forwardRef(
  ({ className: e, ...n }, r) => {
    const { toggleSidebar: a } = Ot();
    return /* @__PURE__ */ t.jsxDEV(
      "button",
      {
        type: "button",
        ref: r,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: a,
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
        ...n
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
        lineNumber: 259,
        columnNumber: 7
      },
      void 0
    );
  }
);
Ns.displayName = "SidebarRail";
const Ur = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "main",
    {
      ref: r,
      className: m(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 286,
      columnNumber: 7
    },
    void 0
  )
);
Ur.displayName = "SidebarInset";
const Ds = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  qe,
  {
    ref: r,
    "data-sidebar": "input",
    className: m(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
    lineNumber: 306,
    columnNumber: 5
  },
  void 0
));
Ds.displayName = "SidebarInput";
const ys = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
      "data-sidebar": "header",
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 322,
      columnNumber: 7
    },
    void 0
  )
);
ys.displayName = "SidebarHeader";
const Cs = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
      "data-sidebar": "footer",
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 336,
      columnNumber: 7
    },
    void 0
  )
);
Cs.displayName = "SidebarFooter";
const Es = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  Vn,
  {
    ref: r,
    "data-sidebar": "separator",
    className: m("tw-mx-2 tw-w-auto tw-bg-sidebar-border", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
    lineNumber: 352,
    columnNumber: 5
  },
  void 0
));
Es.displayName = "SidebarSeparator";
const _r = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
      "data-sidebar": "content",
      className: m(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 365,
      columnNumber: 7
    },
    void 0
  )
);
_r.displayName = "SidebarContent";
const an = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
      "data-sidebar": "group",
      className: m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 382,
      columnNumber: 7
    },
    void 0
  )
);
an.displayName = "SidebarGroup";
const on = u.forwardRef(({ className: e, asChild: n = !1, ...r }, a) => {
  const o = n ? He : "div";
  return /* @__PURE__ */ t.jsxDEV(
    o,
    {
      ref: a,
      "data-sidebar": "group-label",
      className: m(
        "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
        "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
        e
      ),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 400,
      columnNumber: 5
    },
    void 0
  );
});
on.displayName = "SidebarGroupLabel";
const ks = u.forwardRef(({ className: e, asChild: n = !1, ...r }, a) => {
  const o = n ? He : "button";
  return /* @__PURE__ */ t.jsxDEV(
    o,
    {
      ref: a,
      "data-sidebar": "group-action",
      className: m(
        "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 421,
      columnNumber: 5
    },
    void 0
  );
});
ks.displayName = "SidebarGroupAction";
const sn = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
      "data-sidebar": "group-content",
      className: m("tw-w-full tw-text-sm", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 439,
      columnNumber: 5
    },
    void 0
  )
);
sn.displayName = "SidebarGroupContent";
const Sr = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "ul",
    {
      ref: r,
      "data-sidebar": "menu",
      className: m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 451,
      columnNumber: 5
    },
    void 0
  )
);
Sr.displayName = "SidebarMenu";
const Rr = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "li",
    {
      ref: r,
      "data-sidebar": "menu-item",
      className: m("tw-group/menu-item tw-relative", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 463,
      columnNumber: 5
    },
    void 0
  )
);
Rr.displayName = "SidebarMenuItem";
const Vs = Ue(
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
), Tr = u.forwardRef(
  ({
    asChild: e = !1,
    isActive: n = !1,
    variant: r = "default",
    size: a = "default",
    tooltip: o,
    className: i,
    ...l
  }, c) => {
    const d = e ? He : "button", { state: p } = Ot(), x = /* @__PURE__ */ t.jsxDEV(
      d,
      {
        ref: c,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": n,
        className: m(Vs({ variant: r, size: a }), i),
        ...l
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
        lineNumber: 519,
        columnNumber: 7
      },
      void 0
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ t.jsxDEV(jn, { children: [
      /* @__PURE__ */ t.jsxDEV(Gn, { asChild: !0, children: x }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
        lineNumber: 542,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ t.jsxDEV(Tt, { side: "right", align: "center", hidden: p !== "collapsed", ...o }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
        lineNumber: 543,
        columnNumber: 9
      }, void 0)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 541,
      columnNumber: 7
    }, void 0)) : x;
  }
);
Tr.displayName = "SidebarMenuButton";
const Ps = u.forwardRef(({ className: e, asChild: n = !1, showOnHover: r = !1, ...a }, o) => {
  const i = n ? He : "button";
  return /* @__PURE__ */ t.jsxDEV(
    i,
    {
      ref: o,
      "data-sidebar": "menu-action",
      className: m(
        "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
        "tw-peer-data-[size=sm]/menu-button:top-1",
        "tw-peer-data-[size=default]/menu-button:top-1.5",
        "tw-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:tw-hidden",
        r && "tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",
        e
      ),
      ...a
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 560,
      columnNumber: 5
    },
    void 0
  );
});
Ps.displayName = "SidebarMenuAction";
const js = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
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
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 583,
      columnNumber: 5
    },
    void 0
  )
);
js.displayName = "SidebarMenuBadge";
const Gs = u.forwardRef(({ className: e, showIcon: n = !1, ...r }, a) => {
  const o = u.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", e),
      ...r,
      children: [
        n && /* @__PURE__ */ t.jsxDEV(Qn, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
          lineNumber: 620,
          columnNumber: 9
        }, void 0),
        /* @__PURE__ */ t.jsxDEV(
          Qn,
          {
            className: "tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              {
                "--skeleton-width": o
              }
            )
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
            lineNumber: 622,
            columnNumber: 7
          },
          void 0
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 613,
      columnNumber: 5
    },
    void 0
  );
});
Gs.displayName = "SidebarMenuSkeleton";
const Us = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "ul",
    {
      ref: r,
      "data-sidebar": "menu-sub",
      className: m(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 639,
      columnNumber: 5
    },
    void 0
  )
);
Us.displayName = "SidebarMenuSub";
const _s = u.forwardRef(
  ({ ...e }, n) => /* @__PURE__ */ t.jsxDEV("li", { ref: n, ...e }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
    lineNumber: 654,
    columnNumber: 26
  }, void 0)
);
_s.displayName = "SidebarMenuSubItem";
const Ss = u.forwardRef(({ asChild: e = !1, size: n = "md", isActive: r, className: a, ...o }, i) => {
  const l = e ? He : "a";
  return /* @__PURE__ */ t.jsxDEV(
    l,
    {
      ref: i,
      "data-sidebar": "menu-sub-button",
      "data-size": n,
      "data-active": r,
      className: m(
        "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
        "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
        n === "sm" && "tw-text-xs",
        n === "md" && "tw-text-sm",
        "group-data-[collapsible=icon]:tw-hidden",
        a
      ),
      ...o
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",
      lineNumber: 669,
      columnNumber: 5
    },
    void 0
  );
});
Ss.displayName = "SidebarMenuSubButton";
function Rs({
  id: e,
  extensionLabels: n,
  projectInfo: r,
  handleSelectSidebarItem: a,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: l,
  buttonPlaceholderText: c,
  className: d
}) {
  const p = ae(
    (h, b) => {
      a(h, b);
    },
    [a]
  ), x = ae(
    (h) => {
      const b = r.find((E) => E.projectId === h);
      return b ? b.projectName : h;
    },
    [r]
  ), N = ae(
    (h) => !o.projectId && h === o.label,
    [o]
  );
  return /* @__PURE__ */ t.jsxDEV(
    Gr,
    {
      id: e,
      collapsible: "none",
      variant: "inset",
      className: m("tw-w-96 tw-gap-2 tw-overflow-y-auto", d),
      children: /* @__PURE__ */ t.jsxDEV(_r, { children: [
        /* @__PURE__ */ t.jsxDEV(an, { children: [
          /* @__PURE__ */ t.jsxDEV(on, { className: "tw-text-sm", children: i }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
            lineNumber: 98,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(sn, { children: /* @__PURE__ */ t.jsxDEV(Sr, { children: Object.entries(n).map(([h, b]) => /* @__PURE__ */ t.jsxDEV(Rr, { children: /* @__PURE__ */ t.jsxDEV(
            Tr,
            {
              onClick: () => p(h),
              isActive: N(h),
              children: /* @__PURE__ */ t.jsxDEV("span", { className: "tw-pl-3", children: b }, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
                lineNumber: 109,
                columnNumber: 21
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
              lineNumber: 105,
              columnNumber: 19
            },
            this
          ) }, h, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
            lineNumber: 104,
            columnNumber: 17
          }, this)) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
            lineNumber: 102,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
            lineNumber: 101,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
          lineNumber: 97,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ t.jsxDEV(an, { children: [
          /* @__PURE__ */ t.jsxDEV(on, { className: "tw-text-sm", children: l }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
            lineNumber: 117,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(sn, { className: "tw-pl-3", children: /* @__PURE__ */ t.jsxDEV(
            rn,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": o == null ? void 0 : o.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: r.flatMap((h) => h.projectId),
              getOptionLabel: (h) => x(h),
              buttonPlaceholder: c,
              onChange: (h) => {
                const b = x(h);
                p(b, h);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ t.jsxDEV(qa, {}, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
                lineNumber: 138,
                columnNumber: 21
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
              lineNumber: 119,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
            lineNumber: 118,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
          lineNumber: 116,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
        lineNumber: 96,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",
      lineNumber: 90,
      columnNumber: 5
    },
    this
  );
}
function Or({
  value: e,
  onSearch: n,
  placeholder: r,
  isFullWidth: a,
  className: o,
  isDisabled: i = !1
}) {
  const l = te();
  return /* @__PURE__ */ t.jsxDEV("div", { className: m("tw-relative", { "tw-w-full": a }, o), children: [
    /* @__PURE__ */ t.jsxDEV(
      ar,
      {
        className: m(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": l === "rtl" },
          { "tw-left-3": l === "ltr" }
        )
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",
        lineNumber: 57,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ t.jsxDEV(
      qe,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: r,
        value: e,
        onChange: (c) => n(c.target.value),
        disabled: i
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",
        lineNumber: 64,
        columnNumber: 7
      },
      this
    ),
    e && /* @__PURE__ */ t.jsxDEV(
      Y,
      {
        variant: "ghost",
        size: "icon",
        className: m(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": l === "rtl" },
          { "tw-right-0": l === "ltr" }
        ),
        onClick: () => {
          n("");
        },
        children: [
          /* @__PURE__ */ t.jsxDEV(dn, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",
            lineNumber: 84,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV("span", { className: "tw-sr-only", children: "Clear" }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",
            lineNumber: 85,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",
        lineNumber: 72,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}
function ml({
  id: e,
  extensionLabels: n,
  projectInfo: r,
  children: a,
  handleSelectSidebarItem: o,
  selectedSidebarItem: i,
  searchValue: l,
  onSearch: c,
  extensionsSidebarGroupLabel: d,
  projectsSidebarGroupLabel: p,
  buttonPlaceholderText: x
}) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ t.jsxDEV(
      Or,
      {
        className: "tw-w-9/12",
        value: l,
        onSearch: c,
        placeholder: "Search app settings, extension settings, and project settings"
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",
        lineNumber: 38,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(
      jr,
      {
        id: e,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ t.jsxDEV(
            Rs,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: n,
              projectInfo: r,
              handleSelectSidebarItem: o,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: p,
              buttonPlaceholderText: x
            },
            void 0,
            !1,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",
              lineNumber: 49,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ t.jsxDEV(Ur, { className: "tw-min-w-[215px]", children: a }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",
            lineNumber: 59,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",
        lineNumber: 45,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}
const Pe = "scrBook", Ts = "scrRef", Te = "source", Os = "details", Ms = "Scripture Reference", Is = "Scripture Book", Mr = "Type", zs = "Details";
function As(e, n) {
  const r = n ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: Pe,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Ms,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? z.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === Pe ? Xe(o.start) : void 0;
      },
      getGroupingValue: (a) => z.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => Qt(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => Xe(a.start),
      id: Ts,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : Xe(o.start);
      },
      sortingFn: (a, o) => Qt(a.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: Te,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? Mr : void 0,
      cell: (a) => r || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, o) => a.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: Os,
      header: (e == null ? void 0 : e.detailsColumnName) ?? zs,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const Bs = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: n } = e.start;
  let r = 0;
  return e.end && ({ offset: r } = e.end), !e.end || Qt(e.start, e.end) === 0 ? `${Ht(e.start)}+${n}` : `${Ht(e.start)}+${n}-${Ht(e.end)}+${r}`;
}, er = (e) => `${Bs({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function dl({
  sources: e,
  showColumnHeaders: n = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: i,
  detailsColumnName: l,
  onRowSelected: c
}) {
  const [d, p] = L([]), [x, N] = L([{ id: Pe, desc: !1 }]), [h, b] = L({}), E = fe(
    () => e.flatMap((V) => V.data.map((v) => ({
      ...v,
      source: V.source
    }))),
    [e]
  ), G = fe(
    () => As(
      {
        scriptureReferenceColumnName: a,
        typeColumnName: i,
        detailsColumnName: l
      },
      r
    ),
    [a, i, l, r]
  );
  ye(() => {
    d.includes(Te) ? N([
      { id: Te, desc: !1 },
      { id: Pe, desc: !1 }
    ]) : N([{ id: Pe, desc: !1 }]);
  }, [d]);
  const C = sr({
    data: E,
    columns: G,
    state: {
      grouping: d,
      sorting: x,
      rowSelection: h
    },
    onGroupingChange: p,
    onSortingChange: N,
    onRowSelectionChange: b,
    getExpandedRowModel: lo(),
    getGroupedRowModel: io(),
    getCoreRowModel: lr(),
    getSortedRowModel: ir(),
    getRowId: er,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  ye(() => {
    if (c) {
      const V = C.getSelectedRowModel().rowsById, v = Object.keys(V);
      if (v.length === 1) {
        const X = E.find((U) => er(U) === v[0]) || void 0;
        X && c(X);
      }
    }
  }, [h, E, c, C]);
  const y = o ?? Is, D = i ?? Mr, P = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [Pe] },
    { label: `Group by ${D}`, value: [Te] },
    {
      label: `Group by ${y} and ${D}`,
      value: [Pe, Te]
    },
    {
      label: `Group by ${D} and ${y}`,
      value: [Te, Pe]
    }
  ], M = (V) => {
    p(JSON.parse(V));
  }, q = (V, v) => {
    !V.getIsGrouped() && !V.getIsSelected() && V.getToggleSelectedHandler()(v);
  }, Ee = (V, v) => V.getIsGrouped() ? "" : m("banded-row", v % 2 === 0 ? "even" : "odd"), he = (V, v, X) => {
    if (!((V == null ? void 0 : V.length) === 0 || v.depth < X.column.getGroupedIndex())) {
      if (v.getIsGrouped())
        switch (v.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (v.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ t.jsxDEV("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !n && /* @__PURE__ */ t.jsxDEV(
      $e,
      {
        value: JSON.stringify(d),
        onValueChange: (V) => {
          M(V);
        },
        children: [
          /* @__PURE__ */ t.jsxDEV(Me, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ t.jsxDEV(Le, {}, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
            lineNumber: 380,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
            lineNumber: 379,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ t.jsxDEV(Ie, { position: "item-aligned", children: /* @__PURE__ */ t.jsxDEV(es, { children: P.map((V) => /* @__PURE__ */ t.jsxDEV(ve, { value: JSON.stringify(V.value), children: V.label }, V.label, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
            lineNumber: 385,
            columnNumber: 17
          }, this)) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
            lineNumber: 383,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
            lineNumber: 382,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
        lineNumber: 373,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ t.jsxDEV(Ut, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      n && /* @__PURE__ */ t.jsxDEV(_t, { children: C.getHeaderGroups().map((V) => /* @__PURE__ */ t.jsxDEV(Ge, { children: V.headers.filter((v) => v.column.columnDef.header).map((v) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ t.jsxDEV(st, { colSpan: v.colSpan, className: "top-0 tw-sticky", children: v.isPlaceholder ? void 0 : /* @__PURE__ */ t.jsxDEV("div", { children: [
          v.column.getCanGroup() ? /* @__PURE__ */ t.jsxDEV(
            Y,
            {
              variant: "ghost",
              title: `Toggle grouping by ${v.column.columnDef.header}`,
              onClick: v.column.getToggleGroupingHandler(),
              type: "button",
              children: v.column.getIsGrouped() ? "🛑" : "👊 "
            },
            void 0,
            !1,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
              lineNumber: 406,
              columnNumber: 29
            },
            this
          ) : void 0,
          " ",
          rt(v.column.columnDef.header, v.getContext())
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
          lineNumber: 404,
          columnNumber: 25
        }, this) }, v.id, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
          lineNumber: 402,
          columnNumber: 21
        }, this)
      )) }, V.id, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
        lineNumber: 397,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
        lineNumber: 395,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ t.jsxDEV(St, { children: C.getRowModel().rows.map((V, v) => {
        const X = te();
        return /* @__PURE__ */ t.jsxDEV(
          Ge,
          {
            "data-state": V.getIsSelected() ? "selected" : "",
            className: m(Ee(V, v)),
            onClick: (U) => q(V, U),
            children: V.getVisibleCells().map((U) => {
              if (!(U.getIsPlaceholder() || U.column.columnDef.enableGrouping && !U.getIsGrouped() && (U.column.columnDef.id !== Te || !r)))
                return /* @__PURE__ */ t.jsxDEV(
                  Ye,
                  {
                    className: m(
                      U.column.columnDef.id,
                      "tw-p-[1px]",
                      he(d, V, U)
                    ),
                    children: U.getIsGrouped() ? /* @__PURE__ */ t.jsxDEV(
                      Y,
                      {
                        variant: "link",
                        onClick: V.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          V.getIsExpanded() && /* @__PURE__ */ t.jsxDEV(Nt, {}, void 0, !1, {
                            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
                            lineNumber: 464,
                            columnNumber: 55
                          }, this),
                          !V.getIsExpanded() && (X === "ltr" ? /* @__PURE__ */ t.jsxDEV(cn, {}, void 0, !1, {
                            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
                            lineNumber: 466,
                            columnNumber: 50
                          }, this) : /* @__PURE__ */ t.jsxDEV(Ka, {}, void 0, !1, {
                            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
                            lineNumber: 466,
                            columnNumber: 69
                          }, this)),
                          " ",
                          rt(U.column.columnDef.cell, U.getContext()),
                          " (",
                          V.subRows.length,
                          ")"
                        ]
                      },
                      void 0,
                      !0,
                      {
                        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
                        lineNumber: 459,
                        columnNumber: 29
                      },
                      this
                    ) : rt(U.column.columnDef.cell, U.getContext())
                  },
                  U.id,
                  !1,
                  {
                    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
                    lineNumber: 443,
                    columnNumber: 21
                  },
                  this
                );
            })
          },
          V.id,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
            lineNumber: 428,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
        lineNumber: 424,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
      lineNumber: 393,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",
    lineNumber: 371,
    columnNumber: 5
  }, this);
}
var je = /* @__PURE__ */ ((e) => (e.OT = "OT", e.NT = "NT", e.DC = "DC", e.Extra = "Extra", e))(je || {});
const Fs = (e, n, r, a, o) => {
  switch (e) {
    case "OT":
      return n ?? "Old Testament";
    case "NT":
      return r ?? "New Testament";
    case "DC":
      return a ?? "Deuterocanon";
    case "Extra":
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
}, Xs = (e, n, r, a, o) => {
  switch (e) {
    case "OT":
      return n ?? "OT";
    case "NT":
      return r ?? "NT";
    case "DC":
      return a ?? "DC";
    case "Extra":
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
}, Fe = (e) => {
  if (z.isBookOT(e)) return "OT";
  if (z.isBookNT(e)) return "NT";
  if (z.isBookDC(e)) return "DC";
  if (z.isExtraMaterial(e)) return "Extra";
  throw new Error(`Unknown section for book: ${e}`);
}, Un = (e, n) => e.filter((r) => {
  try {
    return Fe(r) === n;
  } catch {
    return !1;
  }
}), Ir = (e, n, r) => Un(e, n).every((a) => r.includes(a));
function $s({
  bookId: e,
  selectedBookIds: n,
  toggleBook: r,
  lastKeyEventShiftKey: a,
  localizedBookNames: o
}) {
  var c, d;
  const i = se(!1), l = se();
  return /* @__PURE__ */ t.jsxDEV(
    Gt,
    {
      value: e,
      className: "tw-flex tw-items-center",
      onSelect: () => {
        i.current || (r(e, a.current), a.current = !1), l.current && clearTimeout(l.current), l.current = setTimeout(() => {
          i.current = !1;
        }, 100);
      },
      onMouseDown: (p) => {
        p.preventDefault(), i.current = !0, r(e, p.shiftKey);
      },
      role: "option",
      "aria-selected": n.includes(e),
      "aria-label": `${z.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
      children: [
        /* @__PURE__ */ t.jsxDEV(
          ze,
          {
            className: m(
              "tw-me-2 tw-h-4 tw-w-4",
              n.includes(e) ? "tw-opacity-100" : "tw-opacity-0"
            )
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-item.component.tsx",
            lineNumber: 66,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ t.jsxDEV(
          "span",
          {
            className: m(
              "tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-border-s-red-200": Fe(e) === je.OT,
                "tw-border-s-purple-200": Fe(e) === je.NT,
                "tw-border-s-indigo-200": Fe(e) === je.DC,
                "tw-border-s-yellow-200": Fe(e) === je.Extra
              }
            ),
            children: o && ((c = o.get(e)) == null ? void 0 : c.localizedName) || z.bookIdToEnglishName(e)
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-item.component.tsx",
            lineNumber: 72,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ t.jsxDEV("span", { className: "tw-ml-2 tw-text-xs tw-text-muted-foreground", children: o && ((d = o.get(e)) == null ? void 0 : d.localizedId) || e.toLocaleUpperCase() }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-item.component.tsx",
          lineNumber: 87,
          columnNumber: 7
        }, this)
      ]
    },
    e,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-item.component.tsx",
      lineNumber: 40,
      columnNumber: 5
    },
    this
  );
}
function Ls({
  section: e,
  availableBookIds: n,
  selectedBookIds: r,
  onToggle: a,
  localizedStrings: o
}) {
  const i = Un(n, e).length === 0, l = o["%scripture_section_ot_short%"], c = o["%scripture_section_nt_short%"], d = o["%scripture_section_dc_short%"], p = o["%scripture_section_extra_short%"];
  return /* @__PURE__ */ t.jsxDEV(
    Y,
    {
      variant: "outline",
      size: "sm",
      onClick: () => a(e),
      className: m(
        Ir(n, e, r) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: Xs(
        e,
        l,
        c,
        d,
        p
      )
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/section-button.component.tsx",
      lineNumber: 37,
      columnNumber: 5
    },
    this
  );
}
const tr = 5, Kt = 6;
function Ys({
  availableBookInfo: e,
  selectedBookIds: n,
  onChangeSelectedBookIds: r,
  localizedStrings: a,
  localizedBookNames: o
}) {
  const i = a["%webView_book_selector_books_selected%"], l = a["%webView_book_selector_select_books%"], c = a["%webView_book_selector_search_books%"], d = a["%webView_book_selector_select_all%"], p = a["%webView_book_selector_clear_all%"], x = a["%webView_book_selector_no_book_found%"], N = a["%webView_book_selector_more%"], h = a["%scripture_section_ot_long%"], b = a["%scripture_section_nt_long%"], E = a["%scripture_section_dc_long%"], G = a["%scripture_section_extra_long%"], [C, y] = L(!1), D = se(void 0), P = se(!1);
  if (e.length !== z.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const M = fe(() => z.allBookIds.filter(
    (v, X) => e[X] === "1" && !z.isObsolete(z.bookIdToNumber(v))
  ), [e]), q = ae(
    (v, X = !1) => {
      if (!X || !D.current) {
        r(
          n.includes(v) ? n.filter((ne) => ne !== v) : [...n, v]
        ), D.current = v;
        return;
      }
      const U = M.findIndex((ne) => ne === D.current), ie = M.findIndex((ne) => ne === v);
      if (U === -1 || ie === -1) return;
      const [oe, we] = [
        Math.min(U, ie),
        Math.max(U, ie)
      ], le = M.slice(oe, we + 1).map((ne) => ne);
      r(
        n.includes(v) ? n.filter((ne) => !le.includes(ne)) : [.../* @__PURE__ */ new Set([...n, ...le])]
      );
    },
    [n, r, M]
  ), Ee = ae(
    (v) => {
      const X = Un(M, v).map((U) => U);
      r(
        Ir(M, v, n) ? n.filter((U) => !X.includes(U)) : [.../* @__PURE__ */ new Set([...n, ...X])]
      );
    },
    [n, r, M]
  ), he = () => {
    r(M.map((v) => v));
  }, V = () => {
    r([]);
  };
  return /* @__PURE__ */ t.jsxDEV("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(je).map((v) => /* @__PURE__ */ t.jsxDEV(
      Ls,
      {
        section: v,
        availableBookIds: M,
        selectedBookIds: n,
        onToggle: Ee,
        localizedStrings: a
      },
      v,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
        lineNumber: 149,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(yn, { open: C, onOpenChange: y, children: [
      /* @__PURE__ */ t.jsxDEV(Cn, { asChild: !0, children: /* @__PURE__ */ t.jsxDEV(
        Y,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": C,
          className: "tw-max-w-64 tw-justify-between",
          children: [
            n.length > 0 ? `${i}: ${n.length}` : l,
            /* @__PURE__ */ t.jsxDEV(un, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
              lineNumber: 172,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
          lineNumber: 163,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
        lineNumber: 162,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ t.jsxDEV(Et, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ t.jsxDEV(
        kt,
        {
          onKeyDown: (v) => {
            v.key === "Enter" && (P.current = v.shiftKey);
          },
          children: [
            /* @__PURE__ */ t.jsxDEV(Vt, { placeholder: c }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
              lineNumber: 184,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
              /* @__PURE__ */ t.jsxDEV(Y, { variant: "ghost", size: "sm", onClick: he, children: d }, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
                lineNumber: 186,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ t.jsxDEV(Y, { variant: "ghost", size: "sm", onClick: V, children: p }, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
                lineNumber: 189,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
              lineNumber: 185,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ t.jsxDEV(Pt, { children: [
              /* @__PURE__ */ t.jsxDEV(jt, { children: x }, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
                lineNumber: 194,
                columnNumber: 15
              }, this),
              Object.values(je).map((v, X) => {
                const U = M.filter(
                  (ie) => Fe(ie) === v
                );
                if (U.length !== 0)
                  return /* @__PURE__ */ t.jsxDEV(rr, { children: [
                    /* @__PURE__ */ t.jsxDEV(
                      En,
                      {
                        heading: Fs(
                          v,
                          h,
                          b,
                          E,
                          G
                        ),
                        children: U.map((ie) => /* @__PURE__ */ t.jsxDEV(
                          $s,
                          {
                            bookId: ie,
                            selectedBookIds: n,
                            toggleBook: q,
                            lastKeyEventShiftKey: P,
                            localizedBookNames: o
                          },
                          ie,
                          !1,
                          {
                            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
                            lineNumber: 214,
                            columnNumber: 25
                          },
                          this
                        ))
                      },
                      void 0,
                      !1,
                      {
                        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
                        lineNumber: 204,
                        columnNumber: 21
                      },
                      this
                    ),
                    X < Object.values(je).length - 1 && /* @__PURE__ */ t.jsxDEV(Dr, {}, void 0, !1, {
                      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
                      lineNumber: 224,
                      columnNumber: 67
                    }, this)
                  ] }, v, !0, {
                    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
                    lineNumber: 203,
                    columnNumber: 19
                  }, this);
              })
            ] }, void 0, !0, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
              lineNumber: 193,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
          lineNumber: 176,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
        lineNumber: 175,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
      lineNumber: 161,
      columnNumber: 7
    }, this),
    n.length > 0 && /* @__PURE__ */ t.jsxDEV("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      n.slice(
        0,
        n.length === Kt ? Kt : tr
      ).map((v) => {
        var X;
        return /* @__PURE__ */ t.jsxDEV(vt, { variant: "secondary", children: o && ((X = o.get(v)) == null ? void 0 : X.localizedName) || z.bookIdToEnglishName(v) || v }, v, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
          lineNumber: 243,
          columnNumber: 15
        }, this);
      }),
      n.length > Kt && /* @__PURE__ */ t.jsxDEV(vt, { variant: "secondary", children: `+${n.length - tr} ${N}` }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
        lineNumber: 250,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
      lineNumber: 234,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",
    lineNumber: 145,
    columnNumber: 5
  }, this);
}
const ul = Object.freeze([
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
]), Se = (e, n) => e[n] ?? n;
function pl({
  scope: e,
  availableScopes: n,
  onScopeChange: r,
  availableBookInfo: a,
  selectedBookIds: o,
  onSelectedBookIdsChange: i,
  localizedStrings: l,
  localizedBookNames: c
}) {
  const d = Se(
    l,
    "%webView_scope_selector_selected_text%"
  ), p = Se(
    l,
    "%webView_scope_selector_current_verse%"
  ), x = Se(
    l,
    "%webView_scope_selector_current_chapter%"
  ), N = Se(l, "%webView_scope_selector_current_book%"), h = Se(l, "%webView_scope_selector_choose_books%"), b = Se(l, "%webView_scope_selector_scope%"), E = Se(l, "%webView_scope_selector_select_books%"), G = [
    { value: "selectedText", label: d, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: x, id: "scope-chapter" },
    { value: "book", label: N, id: "scope-book" },
    { value: "selectedBooks", label: h, id: "scope-selected" }
  ], C = n ? G.filter((y) => n.includes(y.value)) : G;
  return /* @__PURE__ */ t.jsxDEV("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ t.jsxDEV(ee, { children: b }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ t.jsxDEV(
        Dn,
        {
          value: e,
          onValueChange: r,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: C.map(({ value: y, label: D, id: P }) => /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ t.jsxDEV(ht, { className: "tw-me-2", value: y, id: P }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
              lineNumber: 152,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ t.jsxDEV(ee, { htmlFor: P, children: D }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this)
          ] }, P, !0, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this))
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
          lineNumber: 145,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
      lineNumber: 143,
      columnNumber: 7
    }, this),
    e === "selectedBooks" && /* @__PURE__ */ t.jsxDEV("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ t.jsxDEV(ee, { children: E }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ t.jsxDEV(
        Ys,
        {
          availableBookInfo: a,
          selectedBookIds: o,
          onChangeSelectedBookIds: i,
          localizedStrings: l,
          localizedBookNames: c
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
          lineNumber: 162,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
      lineNumber: 160,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",
    lineNumber: 142,
    columnNumber: 5
  }, this);
}
const Wt = {
  [F("undefined")]: "Ø",
  [F(0)]: "A",
  [F(1)]: "B",
  [F(2)]: "C",
  [F(3)]: "D",
  [F(4)]: "E",
  [F(5)]: "F",
  [F(6)]: "G",
  [F(7)]: "H",
  [F(8)]: "I",
  [F(9)]: "J",
  [F(10)]: "K",
  [F(11)]: "L",
  [F(12)]: "M",
  [F(13)]: "N",
  [F(14)]: "O",
  [F(15)]: "P",
  [F(16)]: "Q",
  [F(17)]: "R",
  [F(18)]: "S",
  [F(19)]: "T",
  [F(20)]: "U",
  [F(21)]: "V",
  [F(22)]: "W",
  [F(23)]: "X",
  [F(24)]: "Y",
  [F(25)]: "Z"
};
function wl({
  availableScrollGroupIds: e,
  scrollGroupId: n,
  onChangeScrollGroupId: r,
  localizedStrings: a = {},
  size: o,
  className: i
}) {
  const l = {
    ...Wt,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([d, p]) => [
          d,
          d === p && d in Wt ? Wt[d] : p
        ]
      )
    )
  }, c = te();
  return /* @__PURE__ */ t.jsxDEV(
    $e,
    {
      value: `${n}`,
      onValueChange: (d) => r(
        d === "undefined" ? void 0 : parseInt(d, 10)
      ),
      children: [
        /* @__PURE__ */ t.jsxDEV(Me, { size: o, className: m("pr-twp tw-w-auto", i), children: /* @__PURE__ */ t.jsxDEV(
          Le,
          {
            placeholder: l[F(n)] ?? n
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",
            lineNumber: 140,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",
          lineNumber: 139,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ t.jsxDEV(
          Ie,
          {
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: e.map((d) => /* @__PURE__ */ t.jsxDEV(ve, { value: `${d}`, children: l[F(d)] }, `${d}`, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",
              lineNumber: 153,
              columnNumber: 11
            }, this))
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",
            lineNumber: 147,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",
      lineNumber: 131,
      columnNumber: 5
    },
    this
  );
}
function bl({ children: e }) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: "pr-twp tw-grid", children: e }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
    lineNumber: 14,
    columnNumber: 10
  }, this);
}
function fl({
  primary: e,
  secondary: n,
  children: r,
  isLoading: a = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ t.jsxDEV("div", { children: [
      /* @__PURE__ */ t.jsxDEV("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ t.jsxDEV("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: n }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    a ? /* @__PURE__ */ t.jsxDEV("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this) : /* @__PURE__ */ t.jsxDEV("div", { children: r }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
    lineNumber: 46,
    columnNumber: 5
  }, this);
}
function xl({
  primary: e,
  secondary: n,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ t.jsxDEV("div", { children: [
      /* @__PURE__ */ t.jsxDEV("h3", { className: "tw-text-lg tw-font-medium", children: e }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ t.jsxDEV("p", { className: "tw-text-sm tw-text-muted-foreground", children: n }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    r ? /* @__PURE__ */ t.jsxDEV(Vn, {}, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
      lineNumber: 92,
      columnNumber: 27
    }, this) : ""
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",
    lineNumber: 87,
    columnNumber: 5
  }, this);
}
function zr(e, n) {
  var r;
  return (r = Object.entries(e).find(
    ([, a]) => "menuItem" in a && a.menuItem === n
  )) == null ? void 0 : r[0];
}
function gt({ icon: e, menuLabel: n, leading: r }) {
  return e ? /* @__PURE__ */ t.jsxDEV(
    "img",
    {
      className: m("tw-max-h-5 tw-max-w-5", r ? "tw-me-2" : "tw-ms-2"),
      src: e,
      alt: `${r ? "Leading" : "Trailing"} icon for ${n}`
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/menu-icon.component.tsx",
      lineNumber: 14,
      columnNumber: 5
    },
    this
  ) : void 0;
}
const Ar = (e, n, r, a) => r ? Object.entries(e).filter(
  ([i, l]) => "column" in l && l.column === r || i === r
).sort(([, i], [, l]) => i.order - l.order).flatMap(([i]) => n.filter((c) => c.group === i).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ t.jsxDEV(jn, { children: [
  /* @__PURE__ */ t.jsxDEV(Gn, { asChild: !0, children: "command" in c ? /* @__PURE__ */ t.jsxDEV(
    fn,
    {
      onClick: () => {
        a(c);
      },
      children: [
        c.iconPathBefore && /* @__PURE__ */ t.jsxDEV(gt, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
          lineNumber: 66,
          columnNumber: 21
        }, void 0),
        c.label,
        c.iconPathAfter && /* @__PURE__ */ t.jsxDEV(gt, { icon: c.iconPathAfter, menuLabel: c.label }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
          lineNumber: 70,
          columnNumber: 21
        }, void 0)
      ]
    },
    `dropdown-menu-item-${c.label}-${c.command}`,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 57,
      columnNumber: 17
    },
    void 0
  ) : /* @__PURE__ */ t.jsxDEV(go, { children: [
    /* @__PURE__ */ t.jsxDEV(ur, { children: c.label }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 75,
      columnNumber: 19
    }, void 0),
    /* @__PURE__ */ t.jsxDEV(vo, { children: /* @__PURE__ */ t.jsxDEV(pr, { children: Ar(
      e,
      n,
      zr(e, c.id),
      a
    ) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 78,
      columnNumber: 21
    }, void 0) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 77,
      columnNumber: 19
    }, void 0)
  ] }, `dropdown-menu-sub-${c.label}-${c.id}`, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
    lineNumber: 74,
    columnNumber: 17
  }, void 0) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
    lineNumber: 55,
    columnNumber: 13
  }, void 0),
  c.tooltip && /* @__PURE__ */ t.jsxDEV(Tt, { children: c.tooltip }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
    lineNumber: 90,
    columnNumber: 30
  }, void 0)
] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`, !0, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
  lineNumber: 54,
  columnNumber: 11
}, void 0))) : void 0;
function nr({
  onSelectMenuItem: e,
  menuData: n,
  tabLabel: r,
  icon: a,
  className: o,
  variant: i,
  id: l
}) {
  return /* @__PURE__ */ t.jsxDEV(yt, { variant: i, children: [
    /* @__PURE__ */ t.jsxDEV(bn, { "aria-label": r, className: o, asChild: !0, id: l, children: /* @__PURE__ */ t.jsxDEV(Y, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ t.jsxDEV(Wa, {}, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 142,
      columnNumber: 20
    }, this) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 141,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 140,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(lt, { align: "start", className: "tw-z-[250]", children: Object.entries(n.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, d]) => typeof c == "boolean" || typeof d == "boolean" ? 0 : c.order - d.order).map(([c], d, p) => /* @__PURE__ */ t.jsxDEV(rr, { children: [
      /* @__PURE__ */ t.jsxDEV(dr, { children: /* @__PURE__ */ t.jsxDEV(Pn, { children: Ar(n.groups, n.items, c, e) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
        lineNumber: 155,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
        lineNumber: 154,
        columnNumber: 15
      }, this),
      d < p.length - 1 && /* @__PURE__ */ t.jsxDEV(ct, {}, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
        lineNumber: 160,
        columnNumber: 44
      }, this)
    ] }, c, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 153,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
      lineNumber: 145,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",
    lineNumber: 139,
    columnNumber: 5
  }, this);
}
function hl({
  onSelectProjectMenuItem: e,
  onSelectViewInfoMenuItem: n,
  projectMenuData: r,
  tabViewMenuData: a,
  id: o,
  className: i,
  startAreaChildren: l,
  centerAreaChildren: c,
  endAreaChildren: d
}) {
  return /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      className: m(
        "tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar",
        i
      ),
      id: o,
      children: [
        r && /* @__PURE__ */ t.jsxDEV(
          nr,
          {
            onSelectMenuItem: e,
            menuData: r,
            tabLabel: "Project",
            icon: /* @__PURE__ */ t.jsxDEV(Za, {}, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",
              lineNumber: 67,
              columnNumber: 17
            }, this),
            className: "tw-h-full tw-w-8"
          },
          void 0,
          !1,
          {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",
            lineNumber: 63,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: l }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",
          lineNumber: 71,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: c }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",
          lineNumber: 74,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
          a && /* @__PURE__ */ t.jsxDEV(
            nr,
            {
              onSelectMenuItem: n,
              menuData: a,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ t.jsxDEV(Qa, {}, void 0, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",
                lineNumber: 83,
                columnNumber: 19
              }, this),
              className: "tw-h-full"
            },
            void 0,
            !1,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",
              lineNumber: 79,
              columnNumber: 11
            },
            this
          ),
          d
        ] }, void 0, !0, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",
          lineNumber: 77,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",
      lineNumber: 55,
      columnNumber: 5
    },
    this
  );
}
const Br = u.forwardRef(({ className: e, ...n }, r) => {
  const a = te();
  return /* @__PURE__ */ t.jsxDEV(
    pe.Root,
    {
      orientation: "vertical",
      ref: r,
      className: m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
      ...n,
      dir: a
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/tabs-vertical.tsx",
      lineNumber: 32,
      columnNumber: 5
    },
    void 0
  );
});
Br.displayName = pe.List.displayName;
const Fr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  pe.List,
  {
    ref: r,
    className: m(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/tabs-vertical.tsx",
    lineNumber: 49,
    columnNumber: 3
  },
  void 0
));
Fr.displayName = pe.List.displayName;
const Hs = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  pe.Trigger,
  {
    ref: r,
    ...n,
    className: m(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/tabs-vertical.tsx",
    lineNumber: 65,
    columnNumber: 3
  },
  void 0
)), Xr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  pe.Content,
  {
    ref: r,
    className: m(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/tabs-vertical.tsx",
    lineNumber: 80,
    columnNumber: 3
  },
  void 0
));
Xr.displayName = pe.Content.displayName;
function vl({
  tabList: e,
  searchValue: n,
  onSearch: r,
  searchPlaceholder: a,
  headerTitle: o,
  searchClassName: i
}) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: "pr-twp", children: [
    /* @__PURE__ */ t.jsxDEV("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ t.jsxDEV("h1", { children: o }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",
        lineNumber: 63,
        columnNumber: 24
      }, this) : "",
      /* @__PURE__ */ t.jsxDEV(
        Or,
        {
          className: i,
          value: n,
          onSearch: r,
          placeholder: a
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",
          lineNumber: 64,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",
      lineNumber: 62,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ t.jsxDEV(Br, { children: [
      /* @__PURE__ */ t.jsxDEV(Fr, { children: e.map((l) => /* @__PURE__ */ t.jsxDEV(Hs, { value: l.value, children: l.value }, l.key, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",
        lineNumber: 74,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      e.map((l) => /* @__PURE__ */ t.jsxDEV(Xr, { value: l.value, children: l.content }, l.key, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this))
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",
    lineNumber: 61,
    columnNumber: 5
  }, this);
}
function Js({ ...e }) {
  return /* @__PURE__ */ t.jsxDEV(J.Menu, { ...e }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
    lineNumber: 13,
    columnNumber: 10
  }, this);
}
function qs({ ...e }) {
  return /* @__PURE__ */ t.jsxDEV(J.Sub, { "data-slot": "menubar-sub", ...e }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
}
const $r = u.forwardRef(({ className: e, variant: n = "default", ...r }, a) => {
  const o = u.useMemo(
    () => ({
      variant: n
    }),
    [n]
  );
  return /* @__PURE__ */ t.jsxDEV(wn.Provider, { value: o, children: /* @__PURE__ */ t.jsxDEV(
    J.Root,
    {
      ref: a,
      className: m(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        e
      ),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
      lineNumber: 48,
      columnNumber: 7
    },
    void 0
  ) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
    lineNumber: 46,
    columnNumber: 5
  }, void 0);
});
$r.displayName = J.Root.displayName;
const Lr = u.forwardRef(({ className: e, ...n }, r) => {
  const a = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    J.Trigger,
    {
      ref: r,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        ke({ variant: a.variant, className: e })
        // CUSTOM use context to add variants
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
      lineNumber: 67,
      columnNumber: 5
    },
    void 0
  );
});
Lr.displayName = J.Trigger.displayName;
const Yr = u.forwardRef(({ className: e, inset: n, children: r, ...a }, o) => {
  const i = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    J.SubTrigger,
    {
      ref: o,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        n && "tw-pl-8",
        ke({ variant: i.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ t.jsxDEV(cn, { className: "tw-ml-auto tw-h-4 tw-w-4" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
          lineNumber: 99,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
      lineNumber: 88,
      columnNumber: 5
    },
    void 0
  );
});
Yr.displayName = J.SubTrigger.displayName;
const Hr = u.forwardRef(({ className: e, ...n }, r) => {
  const a = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    J.SubContent,
    {
      ref: r,
      className: m(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": a.variant === "muted"
        },
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
      lineNumber: 111,
      columnNumber: 5
    },
    void 0
  );
});
Hr.displayName = J.SubContent.displayName;
const Jr = u.forwardRef(({ className: e, align: n = "start", alignOffset: r = -4, sideOffset: a = 8, ...o }, i) => {
  const l = Ne();
  return /* @__PURE__ */ t.jsxDEV(J.Portal, { children: /* @__PURE__ */ t.jsxDEV(
    J.Content,
    {
      ref: i,
      align: n,
      alignOffset: r,
      sideOffset: a,
      className: m(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": l.variant === "muted"
        },
        e
      ),
      ...o
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
      lineNumber: 134,
      columnNumber: 7
    },
    void 0
  ) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
    lineNumber: 133,
    columnNumber: 5
  }, void 0);
});
Jr.displayName = J.Content.displayName;
const qr = u.forwardRef(({ className: e, inset: n, ...r }, a) => {
  const o = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    J.Item,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        n && "tw-pl-8",
        ke({ variant: o.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...r
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
      lineNumber: 164,
      columnNumber: 5
    },
    void 0
  );
});
qr.displayName = J.Item.displayName;
const Ks = u.forwardRef(({ className: e, children: n, checked: r, ...a }, o) => {
  const i = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    J.CheckboxItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ke({ variant: i.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ t.jsxDEV("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ t.jsxDEV(J.ItemIndicator, { children: /* @__PURE__ */ t.jsxDEV(ze, { className: "tw-h-4 tw-w-4" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
          lineNumber: 196,
          columnNumber: 11
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
          lineNumber: 195,
          columnNumber: 9
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
          lineNumber: 194,
          columnNumber: 7
        }, void 0),
        n
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
      lineNumber: 184,
      columnNumber: 5
    },
    void 0
  );
});
Ks.displayName = J.CheckboxItem.displayName;
const Ws = u.forwardRef(({ className: e, children: n, ...r }, a) => {
  const o = Ne();
  return /* @__PURE__ */ t.jsxDEV(
    J.RadioItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ke({ variant: o.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...r,
      children: [
        /* @__PURE__ */ t.jsxDEV("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ t.jsxDEV(J.ItemIndicator, { children: /* @__PURE__ */ t.jsxDEV(mn, { className: "tw-h-2 tw-w-2 tw-fill-current" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
          lineNumber: 222,
          columnNumber: 11
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
          lineNumber: 221,
          columnNumber: 9
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
          lineNumber: 220,
          columnNumber: 7
        }, void 0),
        n
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
      lineNumber: 211,
      columnNumber: 5
    },
    void 0
  );
});
Ws.displayName = J.RadioItem.displayName;
const Zs = u.forwardRef(({ className: e, inset: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV(
  J.Label,
  {
    ref: a,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", n && "tw-pl-8", e),
    ...r
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
    lineNumber: 237,
    columnNumber: 3
  },
  void 0
));
Zs.displayName = J.Label.displayName;
const Kr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  J.Separator,
  {
    ref: r,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",
    lineNumber: 249,
    columnNumber: 3
  },
  void 0
));
Kr.displayName = J.Separator.displayName;
const tt = (e, n) => {
  setTimeout(() => {
    n.forEach((r) => {
      var a;
      (a = e.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, Wr = (e, n, r, a) => {
  if (!r) return;
  const o = Object.entries(e).filter(
    ([i, l]) => "column" in l && l.column === r || i === r
  ).sort(([, i], [, l]) => i.order - l.order);
  return o.flatMap(([i], l) => {
    const c = n.filter((p) => p.group === i).sort((p, x) => p.order - x.order).map((p) => /* @__PURE__ */ t.jsxDEV(jn, { children: [
      /* @__PURE__ */ t.jsxDEV(Gn, { asChild: !0, children: "command" in p ? /* @__PURE__ */ t.jsxDEV(
        qr,
        {
          onClick: () => {
            a(p);
          },
          children: [
            p.iconPathBefore && /* @__PURE__ */ t.jsxDEV(gt, { icon: p.iconPathBefore, menuLabel: p.label, leading: !0 }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
              lineNumber: 79,
              columnNumber: 21
            }, void 0),
            p.label,
            p.iconPathAfter && /* @__PURE__ */ t.jsxDEV(gt, { icon: p.iconPathAfter, menuLabel: p.label }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
              lineNumber: 83,
              columnNumber: 21
            }, void 0)
          ]
        },
        `menubar-item-${p.label}-${p.command}`,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
          lineNumber: 70,
          columnNumber: 17
        },
        void 0
      ) : /* @__PURE__ */ t.jsxDEV(qs, { children: [
        /* @__PURE__ */ t.jsxDEV(Yr, { children: p.label }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
          lineNumber: 88,
          columnNumber: 19
        }, void 0),
        /* @__PURE__ */ t.jsxDEV(Hr, { children: Wr(
          e,
          n,
          zr(e, p.id),
          a
        ) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
          lineNumber: 89,
          columnNumber: 19
        }, void 0)
      ] }, `menubar-sub-${p.label}-${p.id}`, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
        lineNumber: 87,
        columnNumber: 17
      }, void 0) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
        lineNumber: 68,
        columnNumber: 13
      }, void 0),
      p.tooltip && /* @__PURE__ */ t.jsxDEV(Tt, { children: p.tooltip }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
        lineNumber: 100,
        columnNumber: 30
      }, void 0)
    ] }, `tooltip-${p.label}-${"command" in p ? p.command : p.id}`, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
      lineNumber: 67,
      columnNumber: 11
    }, void 0)), d = [...c];
    return c.length > 0 && l < o.length - 1 && d.push(/* @__PURE__ */ t.jsxDEV(Kr, {}, `separator-${i}`, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
      lineNumber: 107,
      columnNumber: 31
    }, void 0)), d;
  });
};
function Qs({
  menuData: e,
  onSelectMenuItem: n,
  onOpenChange: r,
  variant: a
}) {
  const o = se(void 0), i = se(void 0), l = se(void 0), c = se(void 0), d = se(void 0), p = (x) => {
    switch (x) {
      case "platform.app":
        return i;
      case "platform.window":
        return l;
      case "platform.layout":
        return c;
      case "platform.help":
        return d;
      default:
        return;
    }
  };
  if (mo(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (x, N) => {
    var E, G, C, y;
    x.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, b = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (N.hotkey) {
      case "alt":
        tt(i, [h]);
        break;
      case "alt+p":
        (E = i.current) == null || E.focus(), tt(i, [h, b]);
        break;
      case "alt+l":
        (G = l.current) == null || G.focus(), tt(l, [h, b]);
        break;
      case "alt+n":
        (C = c.current) == null || C.focus(), tt(c, [h, b]);
        break;
      case "alt+h":
        (y = d.current) == null || y.focus(), tt(d, [h, b]);
        break;
    }
  }), ye(() => {
    if (!r || !o.current) return;
    const x = new MutationObserver((b) => {
      b.forEach((E) => {
        if (E.attributeName === "data-state" && E.target instanceof HTMLElement) {
          const G = E.target.getAttribute("data-state");
          r(G === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((b) => {
      x.observe(b, { attributes: !0 });
    }), () => x.disconnect();
  }, [r]), !!e)
    return /* @__PURE__ */ t.jsxDEV($r, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(e.columns).filter(([, x]) => typeof x == "object").sort(([, x], [, N]) => typeof x == "boolean" || typeof N == "boolean" ? 0 : x.order - N.order).map(([x, N]) => /* @__PURE__ */ t.jsxDEV(Js, { children: [
      /* @__PURE__ */ t.jsxDEV(Lr, { ref: p(x), children: typeof N == "object" && "label" in N && N.label }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
        lineNumber: 237,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ t.jsxDEV(
        Jr,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ t.jsxDEV(Pn, { children: Wr(e.groups, e.items, x, n) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
            lineNumber: 243,
            columnNumber: 15
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
          lineNumber: 240,
          columnNumber: 13
        },
        this
      )
    ] }, x, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
      lineNumber: 236,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",
      lineNumber: 228,
      columnNumber: 5
    }, this);
}
function gl(e) {
  switch (e) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Nl({
  menuData: e,
  onOpenChange: n,
  onSelectMenuItem: r,
  className: a,
  id: o,
  children: i,
  appMenuAreaChildren: l,
  configAreaChildren: c,
  shouldUseAsAppDragArea: d,
  menubarVariant: p = "default"
}) {
  const x = se(void 0);
  return /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      className: m("tw-border tw-px-4 tw-text-foreground", a),
      ref: x,
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ t.jsxDEV(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ t.jsxDEV(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  l,
                  e && /* @__PURE__ */ t.jsxDEV(
                    Qs,
                    {
                      menuData: e,
                      onOpenChange: n,
                      onSelectMenuItem: r,
                      variant: p
                    },
                    void 0,
                    !1,
                    {
                      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",
                      lineNumber: 120,
                      columnNumber: 15
                    },
                    this
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",
                lineNumber: 112,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",
              lineNumber: 111,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ t.jsxDEV(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              },
              void 0,
              !1,
              {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",
                lineNumber: 131,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ t.jsxDEV(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: c
              },
              void 0,
              !1,
              {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",
                lineNumber: 141,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",
              lineNumber: 140,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",
          lineNumber: 105,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",
      lineNumber: 99,
      columnNumber: 5
    },
    this
  );
}
const ei = (e, n) => e[n] ?? n;
function Dl({
  knownUiLanguages: e,
  primaryLanguage: n = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: i,
  localizedStrings: l,
  className: c
}) {
  const d = ei(
    l,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [p, x] = L(!1), N = (b) => {
    o && o(b), a && a([b, ...r.filter((E) => E !== b)]), i && r.find((E) => E === b) && i([...r.filter((E) => E !== b)]), x(!1);
  }, h = (b, E) => {
    var C, y, D, P, M, q;
    const G = E !== b ? ((y = (C = e[b]) == null ? void 0 : C.uiNames) == null ? void 0 : y[E]) ?? ((P = (D = e[b]) == null ? void 0 : D.uiNames) == null ? void 0 : P.en) : void 0;
    return G ? `${(M = e[b]) == null ? void 0 : M.autonym} (${G})` : (q = e[b]) == null ? void 0 : q.autonym;
  };
  return /* @__PURE__ */ t.jsxDEV("div", { className: m("pr-twp tw-max-w-sm", c), children: [
    /* @__PURE__ */ t.jsxDEV(
      $e,
      {
        name: "uiLanguage",
        value: n,
        onValueChange: N,
        open: p,
        onOpenChange: (b) => x(b),
        children: [
          /* @__PURE__ */ t.jsxDEV(Me, { children: /* @__PURE__ */ t.jsxDEV(Le, {}, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
            lineNumber: 148,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
            lineNumber: 147,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ t.jsxDEV(
            Ie,
            {
              className: "tw-z-[250]",
              children: Object.keys(e).map((b) => /* @__PURE__ */ t.jsxDEV(ve, { value: b, children: h(b, n) }, b, !1, {
                fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
                lineNumber: 155,
                columnNumber: 15
              }, this))
            },
            void 0,
            !1,
            {
              fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
              lineNumber: 150,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
        lineNumber: 140,
        columnNumber: 7
      },
      this
    ),
    n !== "en" && /* @__PURE__ */ t.jsxDEV(t.Fragment, { children: [
      /* @__PURE__ */ t.jsxDEV(ee, { className: "tw-ms-3", children: d }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
        lineNumber: 166,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ t.jsxDEV("div", { className: "tw-ms-3", children: /* @__PURE__ */ t.jsxDEV(ee, { children: [
        "Currently:",
        " ",
        (r == null ? void 0 : r.length) > 0 ? `${r.map((b) => h(b, n)).join(", ")}` : `default (${e.en.autonym})`
      ] }, void 0, !0, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
        lineNumber: 169,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
        lineNumber: 167,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
      lineNumber: 165,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",
    lineNumber: 138,
    columnNumber: 5
  }, this);
}
function ti({ item: e, createLabel: n, createComplexLabel: r }) {
  return n ? /* @__PURE__ */ t.jsxDEV(ee, { children: n(e) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/smart-label.component.tsx",
    lineNumber: 13,
    columnNumber: 12
  }, this) : r ? /* @__PURE__ */ t.jsxDEV(ee, { children: r(e) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/smart-label.component.tsx",
    lineNumber: 16,
    columnNumber: 12
  }, this) : /* @__PURE__ */ t.jsxDEV(ee, { children: e }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/smart-label.component.tsx",
    lineNumber: 18,
    columnNumber: 10
  }, this);
}
function yl({
  id: e,
  className: n,
  listItems: r,
  selectedListItems: a,
  handleSelectListItem: o,
  createLabel: i,
  createComplexLabel: l
}) {
  return /* @__PURE__ */ t.jsxDEV("div", { id: e, className: n, children: r.map((c) => /* @__PURE__ */ t.jsxDEV("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ t.jsxDEV(
      kn,
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(c),
        onCheckedChange: (d) => o(c, d)
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/checklist.component.tsx",
        lineNumber: 55,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ t.jsxDEV(
      ti,
      {
        item: c,
        createLabel: i,
        createComplexLabel: l
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/checklist.component.tsx",
        lineNumber: 60,
        columnNumber: 11
      },
      this
    )
  ] }, c, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/checklist.component.tsx",
    lineNumber: 54,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/checklist.component.tsx",
    lineNumber: 52,
    columnNumber: 5
  }, this);
}
const ni = ln(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(eo, { size: 35, className: m("tw-animate-spin", e), ...n, ref: r }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/spinner.component.tsx",
  lineNumber: 13,
  columnNumber: 5
}, void 0));
ni.displayName = "Spinner";
function Cl({
  id: e,
  isDisabled: n = !1,
  hasError: r = !1,
  isFullWidth: a = !1,
  helperText: o,
  label: i,
  placeholder: l,
  isRequired: c = !1,
  className: d,
  defaultValue: p,
  value: x,
  onChange: N,
  onFocus: h,
  onBlur: b
}) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: m("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": a }), children: [
    /* @__PURE__ */ t.jsxDEV(
      ee,
      {
        htmlFor: e,
        className: m({
          "tw-text-red-600": r,
          "tw-hidden": !i
        }),
        children: `${i}${c ? "*" : ""}`
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/text-field.component.tsx",
        lineNumber: 77,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ t.jsxDEV(
      qe,
      {
        id: e,
        disabled: n,
        placeholder: l,
        required: c,
        className: m(d, { "tw-border-red-600": r }),
        defaultValue: p,
        value: x,
        onChange: N,
        onFocus: h,
        onBlur: b
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/text-field.component.tsx",
        lineNumber: 84,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ t.jsxDEV("p", { className: m({ "tw-hidden": !o }), children: o }, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/text-field.component.tsx",
      lineNumber: 96,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/text-field.component.tsx",
    lineNumber: 76,
    columnNumber: 5
  }, this);
}
const ri = Ue(
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
), ai = u.forwardRef(({ className: e, variant: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV("div", { ref: a, role: "alert", className: m(ri({ variant: n }), e), ...r }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/alert.tsx",
  lineNumber: 40,
  columnNumber: 3
}, void 0));
ai.displayName = "Alert";
const oi = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "h5",
    {
      ref: r,
      className: m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...n,
      children: [
        n.children,
        " "
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/alert.tsx",
      lineNumber: 47,
      columnNumber: 5
    },
    void 0
  )
);
oi.displayName = "AlertTitle";
const si = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV("div", { ref: r, className: m("tw-text-sm [&_p]:tw-leading-relaxed", e), ...n }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/alert.tsx",
  lineNumber: 64,
  columnNumber: 3
}, void 0));
si.displayName = "AlertDescription";
const ii = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  Je.Root,
  {
    ref: r,
    className: m(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/avatar.tsx",
    lineNumber: 14,
    columnNumber: 3
  },
  void 0
));
ii.displayName = Je.Root.displayName;
const li = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  Je.Image,
  {
    ref: r,
    className: m("pr-twp tw-aspect-square tw-h-full tw-w-full", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/avatar.tsx",
    lineNumber: 30,
    columnNumber: 3
  },
  void 0
));
li.displayName = Je.Image.displayName;
const ci = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  Je.Fallback,
  {
    ref: r,
    className: m(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/avatar.tsx",
    lineNumber: 43,
    columnNumber: 3
  },
  void 0
));
ci.displayName = Je.Fallback.displayName;
const mi = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
      className: m(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    void 0
  )
);
mi.displayName = "Card";
const di = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
      className: m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",
      lineNumber: 26,
      columnNumber: 5
    },
    void 0
  )
);
di.displayName = "CardHeader";
const ui = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "h3",
    {
      ref: r,
      className: m(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...n,
      children: n.children
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",
      lineNumber: 38,
      columnNumber: 5
    },
    void 0
  )
);
ui.displayName = "CardTitle";
const pi = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV("p", { ref: r, className: m("pr-twp tw-text-sm tw-text-muted-foreground", e), ...n }, void 0, !1, {
  fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",
  lineNumber: 58,
  columnNumber: 3
}, void 0));
pi.displayName = "CardDescription";
const wi = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV("div", { ref: r, className: m("pr-twp tw-p-6 tw-pt-0", e), ...n }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",
    lineNumber: 65,
    columnNumber: 5
  }, void 0)
);
wi.displayName = "CardContent";
const bi = u.forwardRef(
  ({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      ref: r,
      className: m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",
      lineNumber: 73,
      columnNumber: 5
    },
    void 0
  )
);
bi.displayName = "CardFooter";
const Zr = u.createContext({
  direction: "bottom"
});
function fi({
  shouldScaleBackground: e = !0,
  direction: n = "bottom",
  ...r
}) {
  const a = u.useMemo(() => ({ direction: n }), [n]);
  return /* @__PURE__ */ t.jsxDEV(Zr.Provider, { value: a, children: /* @__PURE__ */ t.jsxDEV(
    ge.Root,
    {
      shouldScaleBackground: e,
      direction: n,
      ...r
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
      lineNumber: 22,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
    lineNumber: 21,
    columnNumber: 5
  }, this);
}
fi.displayName = "Drawer";
const El = ge.Trigger, xi = ge.Portal, kl = ge.Close, Qr = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  ge.Overlay,
  {
    ref: r,
    className: m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
    lineNumber: 42,
    columnNumber: 3
  },
  void 0
));
Qr.displayName = ge.Overlay.displayName;
const hi = u.forwardRef(({ className: e, children: n, ...r }, a) => {
  const { direction: o = "bottom" } = u.useContext(Zr), i = {
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
  return /* @__PURE__ */ t.jsxDEV(xi, { children: [
    /* @__PURE__ */ t.jsxDEV(Qr, {}, void 0, !1, {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ t.jsxDEV(
      ge.Content,
      {
        ref: a,
        className: m(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          o === "bottom" || o === "top" ? "tw-flex-col" : "tw-flex-row",
          i[o],
          e
        ),
        ...r,
        children: [
          (o === "bottom" || o === "right") && /* @__PURE__ */ t.jsxDEV("div", { className: l[o] }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
            lineNumber: 90,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ t.jsxDEV("div", { className: "tw-flex tw-flex-col", children: n }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
            lineNumber: 92,
            columnNumber: 9
          }, void 0),
          (o === "top" || o === "left") && /* @__PURE__ */ t.jsxDEV("div", { className: l[o] }, void 0, !1, {
            fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
            lineNumber: 94,
            columnNumber: 11
          }, void 0)
        ]
      },
      void 0,
      !0,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
        lineNumber: 76,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, !0, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
    lineNumber: 74,
    columnNumber: 5
  }, void 0);
});
hi.displayName = "DrawerContent";
function vi({ className: e, ...n }) {
  return /* @__PURE__ */ t.jsxDEV(
    "div",
    {
      className: m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", e),
      ...n
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
      lineNumber: 104,
      columnNumber: 5
    },
    this
  );
}
vi.displayName = "DrawerHeader";
function gi({ className: e, ...n }) {
  return /* @__PURE__ */ t.jsxDEV("div", { className: m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", e), ...n }, void 0, !1, {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
    lineNumber: 114,
    columnNumber: 5
  }, this);
}
gi.displayName = "DrawerFooter";
const Ni = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  ge.Title,
  {
    ref: r,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
    lineNumber: 123,
    columnNumber: 3
  },
  void 0
));
Ni.displayName = ge.Title.displayName;
const Di = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  ge.Description,
  {
    ref: r,
    className: m("tw-text-sm tw-text-muted-foreground", e),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",
    lineNumber: 135,
    columnNumber: 3
  },
  void 0
));
Di.displayName = ge.Description.displayName;
const yi = u.forwardRef(({ className: e, value: n, ...r }, a) => /* @__PURE__ */ t.jsxDEV(
  tn.Root,
  {
    ref: a,
    className: m(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      e
    ),
    ...r,
    children: /* @__PURE__ */ t.jsxDEV(
      tn.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (n || 0)}%)` }
      },
      void 0,
      !1,
      {
        fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/progress.tsx",
        lineNumber: 18,
        columnNumber: 5
      },
      void 0
    )
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/progress.tsx",
    lineNumber: 10,
    columnNumber: 3
  },
  void 0
));
yi.displayName = tn.Root.displayName;
function Vl({ ...e }) {
  return /* @__PURE__ */ t.jsxDEV(
    uo,
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
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sonner.tsx",
      lineNumber: 22,
      columnNumber: 5
    },
    this
  );
}
const Ci = u.forwardRef(({ className: e, ...n }, r) => {
  const a = te();
  return /* @__PURE__ */ t.jsxDEV(
    nt.Root,
    {
      ref: r,
      className: m(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        e
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ t.jsxDEV(nt.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ t.jsxDEV(nt.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/slider.tsx",
          lineNumber: 30,
          columnNumber: 9
        }, void 0) }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/slider.tsx",
          lineNumber: 29,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ t.jsxDEV(nt.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" }, void 0, !1, {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/slider.tsx",
          lineNumber: 32,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    !0,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/slider.tsx",
      lineNumber: 20,
      columnNumber: 5
    },
    void 0
  );
});
Ci.displayName = nt.Root.displayName;
const Ei = u.forwardRef(({ className: e, ...n }, r) => {
  const a = te();
  return /* @__PURE__ */ t.jsxDEV(
    nn.Root,
    {
      className: m(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        e
      ),
      ...n,
      ref: r,
      children: /* @__PURE__ */ t.jsxDEV(
        nn.Thumb,
        {
          className: m(
            "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",
            {
              "data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0": a === "ltr"
            },
            {
              "data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0": a === "rtl"
            }
          )
        },
        void 0,
        !1,
        {
          fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/switch.tsx",
          lineNumber: 28,
          columnNumber: 7
        },
        void 0
      )
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/switch.tsx",
      lineNumber: 20,
      columnNumber: 5
    },
    void 0
  );
});
Ei.displayName = nn.Root.displayName;
const Pl = pe.Root, ki = u.forwardRef(({ className: e, ...n }, r) => {
  const a = te();
  return /* @__PURE__ */ t.jsxDEV(
    pe.List,
    {
      ref: r,
      className: m(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        e
      ),
      ...n,
      dir: a
    },
    void 0,
    !1,
    {
      fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/tabs.tsx",
      lineNumber: 37,
      columnNumber: 5
    },
    void 0
  );
});
ki.displayName = pe.List.displayName;
const Vi = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  pe.Trigger,
  {
    ref: r,
    className: m(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/tabs.tsx",
    lineNumber: 55,
    columnNumber: 3
  },
  void 0
));
Vi.displayName = pe.Trigger.displayName;
const Pi = u.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.jsxDEV(
  pe.Content,
  {
    ref: r,
    className: m(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...n
  },
  void 0,
  !1,
  {
    fileName: "C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/tabs.tsx",
    lineNumber: 71,
    columnNumber: 3
  },
  void 0
));
Pi.displayName = pe.Content.displayName;
const jl = (e, n) => {
  ye(() => {
    if (!e) return () => {
    };
    const r = e(n);
    return () => {
      r();
    };
  }, [e, n]);
};
function ji(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Gi = (e, n, r = {}) => {
  const a = se(n);
  a.current = n;
  const o = se(r);
  o.current = ji(o.current);
  const [i, l] = L(() => a.current), [c, d] = L(!0);
  return ye(() => {
    let p = !0;
    return d(!!e), (async () => {
      if (e) {
        const x = await e();
        p && (l(() => x), d(!1));
      }
    })(), () => {
      p = !1, o.current.preserveValue || l(() => a.current);
    };
  }, [e]), [i, c];
}, Zt = () => !1, Gl = (e, n) => {
  const [r] = Gi(
    ae(async () => {
      if (!e) return Zt;
      const a = await Promise.resolve(e(n));
      return async () => a();
    }, [n, e]),
    Zt,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  ye(() => () => {
    r !== Zt && r();
  }, [r]);
};
function Ui(e, n = "top") {
  if (!e || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), a = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && a ? r.insertBefore(o, a) : r.appendChild(o);
}
Ui(`.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%; /* black */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%; /* black */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* black */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* black */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* black */
    --sidebar-primary: 222.2 47.4% 11.2%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* black */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* black */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* black */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* black */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%;

    --sidebar-background: 222.2 84% 4.9%; /* black */
    --sidebar-foreground: 215 20.2% 65.1%;
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%;
    --sidebar-accent-foreground: 215 20.2% 65.1%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 212.7 26.8% 83.9%;
  }

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0 0% 100%; /* white */
    --foreground: 0 0% 0%; /* black */
    --muted: 33.9 32.4% 86.1%; /* paratext light brown */
    --muted-foreground: 15.5 13.2% 53.9%; /*paratext brown */
    --popover: 40 20% 98%; /* popover paratext */
    --popover-foreground: 0 0% 0%; /* black */
    --card: 0 0% 100%; /* white */
    --card-foreground: 0 0% 0%; /* black */
    --border: 220 13% 91%; /* border */
    --input: 161.3 26.7% 88.2%; /* paratext light green */
    --primary: 173.4 82.1% 15.3%; /* paratext dark green */
    --primary-foreground: 40 85.7% 97.3%; /* paratext sand */
    --secondary: 161.3 26.7% 88.2%; /* paratext light green */
    --secondary-foreground: 173.4 82.1% 15.3%; /* paratext dark green */
    --accent: 161.3 26.7% 88.2%; /* paratext light green */
    --accent-foreground: 173.4 82.1% 15.3%; /* paratext dark green */
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 15.5 13.2% 53.9%; /*paratext brown */

    --sidebar-background: 40 20% 98%; /* popover paratext */
    --sidebar-foreground: 12 10.95% 26.86%; /* dark brown */
    --sidebar-primary: 173.4 82.1% 15.3%; /* paratext dark green */
    --sidebar-primary-foreground: 40 85.7% 97.3%; /* paratext sand */
    --sidebar-accent: 33.9 32.4% 86.1%; /* paratext light brown */
    --sidebar-accent-foreground: 0 0% 0%; /* black */
    --sidebar-border: 220 13% 91%; /* border */
    --sidebar-ring: 15.5 13.2% 53.9%; /*paratext brown */
  }

  .paratext-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --muted: 15.5 13.2% 53.9%;
    --muted-foreground: 33.9 32.4% 86.1%;
    --popover: 180 71.4% 5%;
    --popover-foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3 26.7% 88.2%;
    --primary-foreground: 173.4 82.1% 15.3%;
    --secondary: 180 71.4% 11%;
    --secondary-foreground: 161.3 26.7% 88.2%;
    --accent: 180 71.4% 11%;
    --accent-foreground: 161.3 26.7% 88.2%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;

    --sidebar-background: 180 71.4% 5%;
    --sidebar-foreground: 33.9 32.4% 86.1%;
    --sidebar-primary: 161.3 26.7% 88.2%;
    --sidebar-primary-foreground: 173.4 82.1% 15.3%;
    --sidebar-accent: 15.5 13.2% 53.9%;
    --sidebar-accent-foreground: 33.9 32.4% 86.1%;
    --sidebar-border: 220 13% 20%;
    --sidebar-ring: 15.5 13.2% 53.9%;
  }
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
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #6b7280;
  --tw-prose-bullets: #d1d5db;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
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
.tw-bottom-0 {
  bottom: 0px;
}
.tw-bottom-2 {
  bottom: 0.5rem;
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
.tw-z-30 {
  z-index: 30;
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
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw-m-4 {
  margin: 1rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
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
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
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
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
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
.tw-ms-3 {
  margin-inline-start: 0.75rem;
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
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-box-content {
  box-sizing: content-box;
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
.tw-h-1\\/2 {
  height: 50%;
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
.tw-h-\\[100\\%\\] {
  height: 100%;
}
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[405px\\] {
  height: 405px;
}
.tw-h-\\[5px\\] {
  height: 5px;
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
.tw-h-screen {
  height: 100vh;
}
.tw-h-svh {
  height: 100svh;
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
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-0 {
  width: 0px;
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
.tw-w-14 {
  width: 3.5rem;
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
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-6 {
  width: 1.5rem;
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
.tw-w-9 {
  width: 2.25rem;
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
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
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
.tw-w-\\[46px\\] {
  width: 46px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-auto {
  width: auto;
}
.tw-w-full {
  width: 100%;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-72 {
  min-width: 18rem;
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
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-lg {
  max-width: 32rem;
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
.tw-flex-shrink {
  flex-shrink: 1;
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
.tw-basis-32 {
  flex-basis: 8rem;
}
.tw-caption-bottom {
  caption-side: bottom;
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
.tw-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
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
.tw-list-disc {
  list-style-type: disc;
}
.tw-columns-2 {
  columns: 2;
}
.tw-auto-rows-max {
  grid-auto-rows: max-content;
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
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
.tw-items-start {
  align-items: flex-start;
}
.tw-items-center {
  align-items: center;
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
.tw-gap-0\\.5 {
  gap: 0.125rem;
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
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-8 {
  gap: 2rem;
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
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
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
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
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
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.tw-rounded-ee-none {
  border-end-end-radius: 0px;
}
.tw-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ss-none {
  border-start-start-radius: 0px;
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
.tw-border-\\[\\#22ac32\\] {
  --tw-border-opacity: 1;
  border-color: rgb(34 172 50 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#df4744\\] {
  --tw-border-opacity: 1;
  border-color: rgb(223 71 68 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#e0a035\\] {
  --tw-border-opacity: 1;
  border-color: rgb(224 160 53 / var(--tw-border-opacity, 1));
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-transparent {
  border-color: transparent;
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
.tw-border-s-yellow-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 240 138 / var(--tw-border-opacity, 1));
}
.tw-bg-\\[\\#36c84b\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(54 200 75 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#f25450\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(242 84 80 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#fdbb40\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(253 187 64 / var(--tw-bg-opacity, 1));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.tw-bg-foreground {
  background-color: hsl(var(--foreground));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.tw-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-ring {
  background-color: hsl(var(--ring));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
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
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-bg-none {
  background-image: none;
}
.tw-fill-current {
  fill: currentColor;
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
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
.tw-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
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
.tw-py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
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
.tw-pl-1 {
  padding-left: 0.25rem;
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
.tw-ps-3 {
  padding-inline-start: 0.75rem;
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
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-4 {
  padding-top: 1rem;
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
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-5xl {
  font-size: 3rem;
  line-height: 1;
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
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-not-italic {
  font-style: normal;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-9 {
  line-height: 2.25rem;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity, 1));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
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
.tw-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
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
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
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
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
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
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
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
.tw-duration-500 {
  transition-duration: 500ms;
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
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-500 {
  animation-duration: 500ms;
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
.\\*\\:tw-m-4 > * {
  margin: 1rem;
}
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
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:tw-bg-gray-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
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
.hover\\:tw-bg-red-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
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
.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
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
.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
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
.tw-group:hover .group-hover\\:tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
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
.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
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

  .sm\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:tw-static {
    position: static;
  }

  .sm\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-table-cell {
    display: table-cell;
  }

  .sm\\:tw-hidden {
    display: none;
  }

  .sm\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-gap-4 {
    gap: 1rem;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-border-0 {
    border-width: 0px;
  }

  .sm\\:tw-bg-transparent {
    background-color: transparent;
  }

  .sm\\:tw-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:tw-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:tw-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:tw-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:tw-pl-14 {
    padding-left: 3.5rem;
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

  .md\\:tw-inline {
    display: inline;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-table-cell {
    display: table-cell;
  }

  .md\\:tw-h-8 {
    height: 2rem;
  }

  .md\\:tw-w-8 {
    width: 2rem;
  }

  .md\\:tw-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:tw-grow-0 {
    flex-grow: 0;
  }

  .md\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:tw-gap-8 {
    gap: 2rem;
  }

  .md\\:tw-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
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

  .lg\\:tw-sr-only {
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

  .lg\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
@media (min-width: 1280px) {

  .xl\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:tw-whitespace-nowrap {
    white-space: nowrap;
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.ltr\\:tw-left-2\\.5:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.625rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
.rtl\\:tw-right-2\\.5:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.625rem;
}
.rtl\\:tw-ps-2:where([dir="rtl"], [dir="rtl"] *) {
  padding-inline-start: 0.5rem;
}
@media (prefers-color-scheme: dark) {

  .dark\\:tw--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
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
`, "after-all");
export {
  ai as Alert,
  si as AlertDescription,
  oi as AlertTitle,
  ii as Avatar,
  ci as AvatarFallback,
  li as AvatarImage,
  qi as BOOK_SELECTOR_STRING_KEYS,
  vt as Badge,
  Ji as BookChapterControl,
  Zo as BookSelectionMode,
  Ki as BookSelector,
  Y as Button,
  mi as Card,
  wi as CardContent,
  pi as CardDescription,
  bi as CardFooter,
  di as CardHeader,
  ui as CardTitle,
  Wo as ChapterRangeSelector,
  kn as Checkbox,
  yl as Checklist,
  rn as ComboBox,
  kt as Command,
  jt as CommandEmpty,
  En as CommandGroup,
  Vt as CommandInput,
  Gt as CommandItem,
  Pt as CommandList,
  is as DataTable,
  fi as Drawer,
  kl as DrawerClose,
  hi as DrawerContent,
  Di as DrawerDescription,
  gi as DrawerFooter,
  vi as DrawerHeader,
  Qr as DrawerOverlay,
  xi as DrawerPortal,
  Ni as DrawerTitle,
  El as DrawerTrigger,
  yt as DropdownMenu,
  xn as DropdownMenuCheckboxItem,
  lt as DropdownMenuContent,
  dr as DropdownMenuGroup,
  fn as DropdownMenuItem,
  ls as DropdownMenuItemType,
  Ct as DropdownMenuLabel,
  vo as DropdownMenuPortal,
  Yi as DropdownMenuRadioGroup,
  wr as DropdownMenuRadioItem,
  ct as DropdownMenuSeparator,
  No as DropdownMenuShortcut,
  go as DropdownMenuSub,
  pr as DropdownMenuSubContent,
  ur as DropdownMenuSubTrigger,
  bn as DropdownMenuTrigger,
  tl as Filter,
  Zi as FilterDropdown,
  el as Footer,
  ll as INVENTORY_STRING_KEYS,
  qe as Input,
  cl as Inventory,
  ee as Label,
  Wi as MarkdownRenderer,
  Qi as MoreInfo,
  ds as MultiSelectComboBox,
  vl as NavigationContentSearch,
  yn as Popover,
  Et as PopoverContent,
  Cn as PopoverTrigger,
  yi as Progress,
  Dn as RadioGroup,
  ht as RadioGroupItem,
  ul as SCOPE_SELECTOR_STRING_KEYS,
  pl as ScopeSelector,
  dl as ScriptureResultsViewer,
  wl as ScrollGroupSelector,
  Or as SearchBar,
  $e as Select,
  Ie as SelectContent,
  es as SelectGroup,
  ve as SelectItem,
  ns as SelectLabel,
  Cr as SelectScrollDownButton,
  yr as SelectScrollUpButton,
  rs as SelectSeparator,
  Me as SelectTrigger,
  Le as SelectValue,
  Vn as Separator,
  bl as SettingsList,
  xl as SettingsListHeader,
  fl as SettingsListItem,
  Rs as SettingsSidebar,
  ml as SettingsSidebarContentSearch,
  Qn as Skeleton,
  Ci as Slider,
  Vl as Sonner,
  ni as Spinner,
  Ei as Switch,
  nr as TabDropdownMenu,
  hl as TabToolbar,
  Ut as Table,
  St as TableBody,
  ss as TableCaption,
  Ye as TableCell,
  os as TableFooter,
  st as TableHead,
  _t as TableHeader,
  Ge as TableRow,
  Pl as Tabs,
  Pi as TabsContent,
  ki as TabsList,
  Vi as TabsTrigger,
  Cl as TextField,
  Vr as ToggleGroup,
  xt as ToggleGroupItem,
  Nl as Toolbar,
  jn as Tooltip,
  Tt as TooltipContent,
  Pn as TooltipProvider,
  Gn as TooltipTrigger,
  Dl as UiLanguageSelector,
  Br as VerticalTabs,
  Xr as VerticalTabsContent,
  Fr as VerticalTabsList,
  Hs as VerticalTabsTrigger,
  ms as badgeVariants,
  $o as buttonVariants,
  m as cn,
  il as getBookIdFromUSFM,
  ol as getLinesFromUSFM,
  sl as getNumberFromUSFM,
  bs as getStatusForItem,
  gl as getToolbarOSReservedSpaceClassName,
  rl as inventoryCountColumn,
  nl as inventoryItemColumn,
  al as inventoryStatusColumn,
  ts as selectTriggerVariants,
  Sl as sonner,
  jl as useEvent,
  Gl as useEventAsync,
  Gi as usePromise
};
//# sourceMappingURL=index.js.map
