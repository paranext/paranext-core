import * as b from 'react';
import Ft, {
  forwardRef as eu,
  useContext as tu,
  Children as nu,
  isValidElement as Fo,
  cloneElement as zo,
  useState as ou,
} from 'react';
import * as qs from 'react-dom';
import $o from 'react-dom';
function ru(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var Xr = { exports: {} },
  Zn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ra;
function iu() {
  if (ra) return Zn;
  ra = 1;
  var e = Ft,
    t = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    r = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, d) {
    var u,
      p = {},
      h = null,
      y = null;
    d !== void 0 && (h = '' + d),
      c.key !== void 0 && (h = '' + c.key),
      c.ref !== void 0 && (y = c.ref);
    for (u in c) r.call(c, u) && !a.hasOwnProperty(u) && (p[u] = c[u]);
    if (l && l.defaultProps) for (u in ((c = l.defaultProps), c)) p[u] === void 0 && (p[u] = c[u]);
    return { $$typeof: t, type: l, key: h, ref: y, props: p, _owner: i.current };
  }
  return (Zn.Fragment = o), (Zn.jsx = s), (Zn.jsxs = s), Zn;
}
var Qn = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ia;
function au() {
  return (
    ia ||
      ((ia = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Ft,
            t = Symbol.for('react.element'),
            o = Symbol.for('react.portal'),
            r = Symbol.for('react.fragment'),
            i = Symbol.for('react.strict_mode'),
            a = Symbol.for('react.profiler'),
            s = Symbol.for('react.provider'),
            l = Symbol.for('react.context'),
            c = Symbol.for('react.forward_ref'),
            d = Symbol.for('react.suspense'),
            u = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            h = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            g = Symbol.iterator,
            m = '@@iterator';
          function v(x) {
            if (x === null || typeof x != 'object') return null;
            var F = (g && x[g]) || x[m];
            return typeof F == 'function' ? F : null;
          }
          var T = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function C(x) {
            {
              for (var F = arguments.length, le = new Array(F > 1 ? F - 1 : 0), k = 1; k < F; k++)
                le[k - 1] = arguments[k];
              O('error', x, le);
            }
          }
          function O(x, F, le) {
            {
              var k = T.ReactDebugCurrentFrame,
                $ = k.getStackAddendum();
              $ !== '' && ((F += '%s'), (le = le.concat([$])));
              var Y = le.map(function (ne) {
                return String(ne);
              });
              Y.unshift('Warning: ' + F), Function.prototype.apply.call(console[x], console, Y);
            }
          }
          var E = !1,
            f = !1,
            R = !1,
            S = !1,
            D = !1,
            B;
          B = Symbol.for('react.module.reference');
          function N(x) {
            return !!(
              typeof x == 'string' ||
              typeof x == 'function' ||
              x === r ||
              x === a ||
              D ||
              x === i ||
              x === d ||
              x === u ||
              S ||
              x === y ||
              E ||
              f ||
              R ||
              (typeof x == 'object' &&
                x !== null &&
                (x.$$typeof === h ||
                  x.$$typeof === p ||
                  x.$$typeof === s ||
                  x.$$typeof === l ||
                  x.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  x.$$typeof === B ||
                  x.getModuleId !== void 0))
            );
          }
          function I(x, F, le) {
            var k = x.displayName;
            if (k) return k;
            var $ = F.displayName || F.name || '';
            return $ !== '' ? le + '(' + $ + ')' : le;
          }
          function J(x) {
            return x.displayName || 'Context';
          }
          function j(x) {
            if (x == null) return null;
            if (
              (typeof x.tag == 'number' &&
                C(
                  'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.',
                ),
              typeof x == 'function')
            )
              return x.displayName || x.name || null;
            if (typeof x == 'string') return x;
            switch (x) {
              case r:
                return 'Fragment';
              case o:
                return 'Portal';
              case a:
                return 'Profiler';
              case i:
                return 'StrictMode';
              case d:
                return 'Suspense';
              case u:
                return 'SuspenseList';
            }
            if (typeof x == 'object')
              switch (x.$$typeof) {
                case l:
                  var F = x;
                  return J(F) + '.Consumer';
                case s:
                  var le = x;
                  return J(le._context) + '.Provider';
                case c:
                  return I(x, x.render, 'ForwardRef');
                case p:
                  var k = x.displayName || null;
                  return k !== null ? k : j(x.type) || 'Memo';
                case h: {
                  var $ = x,
                    Y = $._payload,
                    ne = $._init;
                  try {
                    return j(ne(Y));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var _ = Object.assign,
            A = 0,
            q,
            ae,
            Q,
            z,
            w,
            L,
            G;
          function V() {}
          V.__reactDisabledLog = !0;
          function H() {
            {
              if (A === 0) {
                (q = console.log),
                  (ae = console.info),
                  (Q = console.warn),
                  (z = console.error),
                  (w = console.group),
                  (L = console.groupCollapsed),
                  (G = console.groupEnd);
                var x = {
                  configurable: !0,
                  enumerable: !0,
                  value: V,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: x,
                  log: x,
                  warn: x,
                  error: x,
                  group: x,
                  groupCollapsed: x,
                  groupEnd: x,
                });
              }
              A++;
            }
          }
          function K() {
            {
              if ((A--, A === 0)) {
                var x = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: _({}, x, {
                    value: q,
                  }),
                  info: _({}, x, {
                    value: ae,
                  }),
                  warn: _({}, x, {
                    value: Q,
                  }),
                  error: _({}, x, {
                    value: z,
                  }),
                  group: _({}, x, {
                    value: w,
                  }),
                  groupCollapsed: _({}, x, {
                    value: L,
                  }),
                  groupEnd: _({}, x, {
                    value: G,
                  }),
                });
              }
              A < 0 &&
                C('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var re = T.ReactCurrentDispatcher,
            Z;
          function ie(x, F, le) {
            {
              if (Z === void 0)
                try {
                  throw Error();
                } catch ($) {
                  var k = $.stack.trim().match(/\n( *(at )?)/);
                  Z = (k && k[1]) || '';
                }
              return (
                `
` +
                Z +
                x
              );
            }
          }
          var ce = !1,
            ue;
          {
            var me = typeof WeakMap == 'function' ? WeakMap : Map;
            ue = new me();
          }
          function P(x, F) {
            if (!x || ce) return '';
            {
              var le = ue.get(x);
              if (le !== void 0) return le;
            }
            var k;
            ce = !0;
            var $ = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var Y;
            (Y = re.current), (re.current = null), H();
            try {
              if (F) {
                var ne = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(ne.prototype, 'props', {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == 'object' && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(ne, []);
                  } catch (Lt) {
                    k = Lt;
                  }
                  Reflect.construct(x, [], ne);
                } else {
                  try {
                    ne.call();
                  } catch (Lt) {
                    k = Lt;
                  }
                  x.call(ne.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Lt) {
                  k = Lt;
                }
                x();
              }
            } catch (Lt) {
              if (Lt && k && typeof Lt.stack == 'string') {
                for (
                  var fe = Lt.stack.split(`
`),
                    be = k.stack.split(`
`),
                    ve = fe.length - 1,
                    Re = be.length - 1;
                  ve >= 1 && Re >= 0 && fe[ve] !== be[Re];

                )
                  Re--;
                for (; ve >= 1 && Re >= 0; ve--, Re--)
                  if (fe[ve] !== be[Re]) {
                    if (ve !== 1 || Re !== 1)
                      do
                        if ((ve--, Re--, Re < 0 || fe[ve] !== be[Re])) {
                          var Oe =
                            `
` + fe[ve].replace(' at new ', ' at ');
                          return (
                            x.displayName &&
                              Oe.includes('<anonymous>') &&
                              (Oe = Oe.replace('<anonymous>', x.displayName)),
                            typeof x == 'function' && ue.set(x, Oe),
                            Oe
                          );
                        }
                      while (ve >= 1 && Re >= 0);
                    break;
                  }
              }
            } finally {
              (ce = !1), (re.current = Y), K(), (Error.prepareStackTrace = $);
            }
            var Fe = x ? x.displayName || x.name : '',
              rn = Fe ? ie(Fe) : '';
            return typeof x == 'function' && ue.set(x, rn), rn;
          }
          function Te(x, F, le) {
            return P(x, !1);
          }
          function X(x) {
            var F = x.prototype;
            return !!(F && F.isReactComponent);
          }
          function W(x, F, le) {
            if (x == null) return '';
            if (typeof x == 'function') return P(x, X(x));
            if (typeof x == 'string') return ie(x);
            switch (x) {
              case d:
                return ie('Suspense');
              case u:
                return ie('SuspenseList');
            }
            if (typeof x == 'object')
              switch (x.$$typeof) {
                case c:
                  return Te(x.render);
                case p:
                  return W(x.type, F, le);
                case h: {
                  var k = x,
                    $ = k._payload,
                    Y = k._init;
                  try {
                    return W(Y($), F, le);
                  } catch {}
                }
              }
            return '';
          }
          var Ce = Object.prototype.hasOwnProperty,
            de = {},
            ke = T.ReactDebugCurrentFrame;
          function Le(x) {
            if (x) {
              var F = x._owner,
                le = W(x.type, x._source, F ? F.type : null);
              ke.setExtraStackFrame(le);
            } else ke.setExtraStackFrame(null);
          }
          function Xe(x, F, le, k, $) {
            {
              var Y = Function.call.bind(Ce);
              for (var ne in x)
                if (Y(x, ne)) {
                  var fe = void 0;
                  try {
                    if (typeof x[ne] != 'function') {
                      var be = Error(
                        (k || 'React class') +
                          ': ' +
                          le +
                          ' type `' +
                          ne +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof x[ne] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((be.name = 'Invariant Violation'), be);
                    }
                    fe = x[ne](F, ne, k, le, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (ve) {
                    fe = ve;
                  }
                  fe &&
                    !(fe instanceof Error) &&
                    (Le($),
                    C(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      k || 'React class',
                      le,
                      ne,
                      typeof fe,
                    ),
                    Le(null)),
                    fe instanceof Error &&
                      !(fe.message in de) &&
                      ((de[fe.message] = !0),
                      Le($),
                      C('Failed %s type: %s', le, fe.message),
                      Le(null));
                }
            }
          }
          var Ke = Array.isArray;
          function je(x) {
            return Ke(x);
          }
          function Ze(x) {
            {
              var F = typeof Symbol == 'function' && Symbol.toStringTag,
                le = (F && x[Symbol.toStringTag]) || x.constructor.name || 'Object';
              return le;
            }
          }
          function ee(x) {
            try {
              return te(x), !1;
            } catch {
              return !0;
            }
          }
          function te(x) {
            return '' + x;
          }
          function ye(x) {
            if (ee(x))
              return (
                C(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  Ze(x),
                ),
                te(x)
              );
          }
          var he = T.ReactCurrentOwner,
            xe = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Ne,
            se,
            we;
          we = {};
          function U(x) {
            if (Ce.call(x, 'ref')) {
              var F = Object.getOwnPropertyDescriptor(x, 'ref').get;
              if (F && F.isReactWarning) return !1;
            }
            return x.ref !== void 0;
          }
          function ge(x) {
            if (Ce.call(x, 'key')) {
              var F = Object.getOwnPropertyDescriptor(x, 'key').get;
              if (F && F.isReactWarning) return !1;
            }
            return x.key !== void 0;
          }
          function Se(x, F) {
            if (typeof x.ref == 'string' && he.current && F && he.current.stateNode !== F) {
              var le = j(he.current.type);
              we[le] ||
                (C(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  j(he.current.type),
                  x.ref,
                ),
                (we[le] = !0));
            }
          }
          function ft(x, F) {
            {
              var le = function () {
                Ne ||
                  ((Ne = !0),
                  C(
                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    F,
                  ));
              };
              (le.isReactWarning = !0),
                Object.defineProperty(x, 'key', {
                  get: le,
                  configurable: !0,
                });
            }
          }
          function ht(x, F) {
            {
              var le = function () {
                se ||
                  ((se = !0),
                  C(
                    '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    F,
                  ));
              };
              (le.isReactWarning = !0),
                Object.defineProperty(x, 'ref', {
                  get: le,
                  configurable: !0,
                });
            }
          }
          var st = function (x, F, le, k, $, Y, ne) {
            var fe = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: x,
              key: F,
              ref: le,
              props: ne,
              // Record the component responsible for creating this element.
              _owner: Y,
            };
            return (
              (fe._store = {}),
              Object.defineProperty(fe._store, 'validated', {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(fe, '_self', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: k,
              }),
              Object.defineProperty(fe, '_source', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: $,
              }),
              Object.freeze && (Object.freeze(fe.props), Object.freeze(fe)),
              fe
            );
          };
          function Et(x, F, le, k, $) {
            {
              var Y,
                ne = {},
                fe = null,
                be = null;
              le !== void 0 && (ye(le), (fe = '' + le)),
                ge(F) && (ye(F.key), (fe = '' + F.key)),
                U(F) && ((be = F.ref), Se(F, $));
              for (Y in F) Ce.call(F, Y) && !xe.hasOwnProperty(Y) && (ne[Y] = F[Y]);
              if (x && x.defaultProps) {
                var ve = x.defaultProps;
                for (Y in ve) ne[Y] === void 0 && (ne[Y] = ve[Y]);
              }
              if (fe || be) {
                var Re = typeof x == 'function' ? x.displayName || x.name || 'Unknown' : x;
                fe && ft(ne, Re), be && ht(ne, Re);
              }
              return st(x, fe, be, $, k, he.current, ne);
            }
          }
          var xt = T.ReactCurrentOwner,
            Qe = T.ReactDebugCurrentFrame;
          function lt(x) {
            if (x) {
              var F = x._owner,
                le = W(x.type, x._source, F ? F.type : null);
              Qe.setExtraStackFrame(le);
            } else Qe.setExtraStackFrame(null);
          }
          var ut;
          ut = !1;
          function Wt(x) {
            return typeof x == 'object' && x !== null && x.$$typeof === t;
          }
          function Ht() {
            {
              if (xt.current) {
                var x = j(xt.current.type);
                if (x)
                  return (
                    `

Check the render method of \`` +
                    x +
                    '`.'
                  );
              }
              return '';
            }
          }
          function nn(x) {
            {
              if (x !== void 0) {
                var F = x.fileName.replace(/^.*[\\\/]/, ''),
                  le = x.lineNumber;
                return (
                  `

Check your code at ` +
                  F +
                  ':' +
                  le +
                  '.'
                );
              }
              return '';
            }
          }
          var Ot = {};
          function qt(x) {
            {
              var F = Ht();
              if (!F) {
                var le = typeof x == 'string' ? x : x.displayName || x.name;
                le &&
                  (F =
                    `

Check the top-level render call using <` +
                    le +
                    '>.');
              }
              return F;
            }
          }
          function Yt(x, F) {
            {
              if (!x._store || x._store.validated || x.key != null) return;
              x._store.validated = !0;
              var le = qt(F);
              if (Ot[le]) return;
              Ot[le] = !0;
              var k = '';
              x &&
                x._owner &&
                x._owner !== xt.current &&
                (k = ' It was passed a child from ' + j(x._owner.type) + '.'),
                lt(x),
                C(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  le,
                  k,
                ),
                lt(null);
            }
          }
          function Tt(x, F) {
            {
              if (typeof x != 'object') return;
              if (je(x))
                for (var le = 0; le < x.length; le++) {
                  var k = x[le];
                  Wt(k) && Yt(k, F);
                }
              else if (Wt(x)) x._store && (x._store.validated = !0);
              else if (x) {
                var $ = v(x);
                if (typeof $ == 'function' && $ !== x.entries)
                  for (var Y = $.call(x), ne; !(ne = Y.next()).done; )
                    Wt(ne.value) && Yt(ne.value, F);
              }
            }
          }
          function hn(x) {
            {
              var F = x.type;
              if (F == null || typeof F == 'string') return;
              var le;
              if (typeof F == 'function') le = F.propTypes;
              else if (
                typeof F == 'object' &&
                (F.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  F.$$typeof === p)
              )
                le = F.propTypes;
              else return;
              if (le) {
                var k = j(F);
                Xe(le, x.props, 'prop', k, x);
              } else if (F.PropTypes !== void 0 && !ut) {
                ut = !0;
                var $ = j(F);
                C(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  $ || 'Unknown',
                );
              }
              typeof F.getDefaultProps == 'function' &&
                !F.getDefaultProps.isReactClassApproved &&
                C(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function on(x) {
            {
              for (var F = Object.keys(x.props), le = 0; le < F.length; le++) {
                var k = F[le];
                if (k !== 'children' && k !== 'key') {
                  lt(x),
                    C(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      k,
                    ),
                    lt(null);
                  break;
                }
              }
              x.ref !== null &&
                (lt(x), C('Invalid attribute `ref` supplied to `React.Fragment`.'), lt(null));
            }
          }
          function Ct(x, F, le, k, $, Y) {
            {
              var ne = N(x);
              if (!ne) {
                var fe = '';
                (x === void 0 ||
                  (typeof x == 'object' && x !== null && Object.keys(x).length === 0)) &&
                  (fe +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var be = nn($);
                be ? (fe += be) : (fe += Ht());
                var ve;
                x === null
                  ? (ve = 'null')
                  : je(x)
                  ? (ve = 'array')
                  : x !== void 0 && x.$$typeof === t
                  ? ((ve = '<' + (j(x.type) || 'Unknown') + ' />'),
                    (fe = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (ve = typeof x),
                  C(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    ve,
                    fe,
                  );
              }
              var Re = Et(x, F, le, $, Y);
              if (Re == null) return Re;
              if (ne) {
                var Oe = F.children;
                if (Oe !== void 0)
                  if (k)
                    if (je(Oe)) {
                      for (var Fe = 0; Fe < Oe.length; Fe++) Tt(Oe[Fe], x);
                      Object.freeze && Object.freeze(Oe);
                    } else
                      C(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else Tt(Oe, x);
              }
              return x === r ? on(Re) : hn(Re), Re;
            }
          }
          function Dt(x, F, le) {
            return Ct(x, F, le, !0);
          }
          function Kt(x, F, le) {
            return Ct(x, F, le, !1);
          }
          var bn = Kt,
            at = Dt;
          (Qn.Fragment = r), (Qn.jsx = bn), (Qn.jsxs = at);
        })()),
    Qn
  );
}
process.env.NODE_ENV === 'production' ? (Xr.exports = iu()) : (Xr.exports = au());
var mi = Xr.exports;
const su = mi.Fragment,
  M = mi.jsx,
  Ge = mi.jsxs,
  lu = {
    black: '#000',
    white: '#fff',
  },
  ho = lu,
  cu = {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
    A100: '#ff8a80',
    A200: '#ff5252',
    A400: '#ff1744',
    A700: '#d50000',
  },
  wn = cu,
  uu = {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
    A100: '#ea80fc',
    A200: '#e040fb',
    A400: '#d500f9',
    A700: '#aa00ff',
  },
  kn = uu,
  du = {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    A100: '#82b1ff',
    A200: '#448aff',
    A400: '#2979ff',
    A700: '#2962ff',
  },
  $n = du,
  pu = {
    50: '#e1f5fe',
    100: '#b3e5fc',
    200: '#81d4fa',
    300: '#4fc3f7',
    400: '#29b6f6',
    500: '#03a9f4',
    600: '#039be5',
    700: '#0288d1',
    800: '#0277bd',
    900: '#01579b',
    A100: '#80d8ff',
    A200: '#40c4ff',
    A400: '#00b0ff',
    A700: '#0091ea',
  },
  Nn = pu,
  fu = {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
    A100: '#b9f6ca',
    A200: '#69f0ae',
    A400: '#00e676',
    A700: '#00c853',
  },
  Pn = fu,
  mu = {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
    A100: '#ffd180',
    A200: '#ffab40',
    A400: '#ff9100',
    A700: '#ff6d00',
  },
  eo = mu,
  hu = {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
  },
  bu = hu;
function Bt(e, t) {
  return process.env.NODE_ENV === 'production'
    ? () => null
    : function (...r) {
        return e(...r) || t(...r);
      };
}
function Mn(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function Ys(e) {
  if (!Mn(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = Ys(e[o]);
    }),
    t
  );
}
function _t(
  e,
  t,
  o = {
    clone: !0,
  },
) {
  const r = o.clone
    ? {
        ...e,
      }
    : e;
  return (
    Mn(e) &&
      Mn(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (Mn(t[i]) && i in e && Mn(e[i])
            ? (r[i] = _t(e[i], t[i], o))
            : o.clone
            ? (r[i] = Mn(t[i]) ? Ys(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var Jr = { exports: {} },
  No = { exports: {} },
  ze = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa;
function vu() {
  if (aa) return ze;
  aa = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    o = e ? Symbol.for('react.portal') : 60106,
    r = e ? Symbol.for('react.fragment') : 60107,
    i = e ? Symbol.for('react.strict_mode') : 60108,
    a = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    l = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    d = e ? Symbol.for('react.concurrent_mode') : 60111,
    u = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    h = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    g = e ? Symbol.for('react.lazy') : 60116,
    m = e ? Symbol.for('react.block') : 60121,
    v = e ? Symbol.for('react.fundamental') : 60117,
    T = e ? Symbol.for('react.responder') : 60118,
    C = e ? Symbol.for('react.scope') : 60119;
  function O(f) {
    if (typeof f == 'object' && f !== null) {
      var R = f.$$typeof;
      switch (R) {
        case t:
          switch (((f = f.type), f)) {
            case c:
            case d:
            case r:
            case a:
            case i:
            case p:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case u:
                case g:
                case y:
                case s:
                  return f;
                default:
                  return R;
              }
          }
        case o:
          return R;
      }
    }
  }
  function E(f) {
    return O(f) === d;
  }
  return (
    (ze.AsyncMode = c),
    (ze.ConcurrentMode = d),
    (ze.ContextConsumer = l),
    (ze.ContextProvider = s),
    (ze.Element = t),
    (ze.ForwardRef = u),
    (ze.Fragment = r),
    (ze.Lazy = g),
    (ze.Memo = y),
    (ze.Portal = o),
    (ze.Profiler = a),
    (ze.StrictMode = i),
    (ze.Suspense = p),
    (ze.isAsyncMode = function (f) {
      return E(f) || O(f) === c;
    }),
    (ze.isConcurrentMode = E),
    (ze.isContextConsumer = function (f) {
      return O(f) === l;
    }),
    (ze.isContextProvider = function (f) {
      return O(f) === s;
    }),
    (ze.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (ze.isForwardRef = function (f) {
      return O(f) === u;
    }),
    (ze.isFragment = function (f) {
      return O(f) === r;
    }),
    (ze.isLazy = function (f) {
      return O(f) === g;
    }),
    (ze.isMemo = function (f) {
      return O(f) === y;
    }),
    (ze.isPortal = function (f) {
      return O(f) === o;
    }),
    (ze.isProfiler = function (f) {
      return O(f) === a;
    }),
    (ze.isStrictMode = function (f) {
      return O(f) === i;
    }),
    (ze.isSuspense = function (f) {
      return O(f) === p;
    }),
    (ze.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === d ||
        f === a ||
        f === i ||
        f === p ||
        f === h ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === g ||
            f.$$typeof === y ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === u ||
            f.$$typeof === v ||
            f.$$typeof === T ||
            f.$$typeof === C ||
            f.$$typeof === m))
      );
    }),
    (ze.typeOf = O),
    ze
  );
}
var Ve = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sa;
function gu() {
  return (
    sa ||
      ((sa = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = typeof Symbol == 'function' && Symbol.for,
            t = e ? Symbol.for('react.element') : 60103,
            o = e ? Symbol.for('react.portal') : 60106,
            r = e ? Symbol.for('react.fragment') : 60107,
            i = e ? Symbol.for('react.strict_mode') : 60108,
            a = e ? Symbol.for('react.profiler') : 60114,
            s = e ? Symbol.for('react.provider') : 60109,
            l = e ? Symbol.for('react.context') : 60110,
            c = e ? Symbol.for('react.async_mode') : 60111,
            d = e ? Symbol.for('react.concurrent_mode') : 60111,
            u = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            h = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            g = e ? Symbol.for('react.lazy') : 60116,
            m = e ? Symbol.for('react.block') : 60121,
            v = e ? Symbol.for('react.fundamental') : 60117,
            T = e ? Symbol.for('react.responder') : 60118,
            C = e ? Symbol.for('react.scope') : 60119;
          function O(P) {
            return (
              typeof P == 'string' ||
              typeof P == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              P === r ||
              P === d ||
              P === a ||
              P === i ||
              P === p ||
              P === h ||
              (typeof P == 'object' &&
                P !== null &&
                (P.$$typeof === g ||
                  P.$$typeof === y ||
                  P.$$typeof === s ||
                  P.$$typeof === l ||
                  P.$$typeof === u ||
                  P.$$typeof === v ||
                  P.$$typeof === T ||
                  P.$$typeof === C ||
                  P.$$typeof === m))
            );
          }
          function E(P) {
            if (typeof P == 'object' && P !== null) {
              var Te = P.$$typeof;
              switch (Te) {
                case t:
                  var X = P.type;
                  switch (X) {
                    case c:
                    case d:
                    case r:
                    case a:
                    case i:
                    case p:
                      return X;
                    default:
                      var W = X && X.$$typeof;
                      switch (W) {
                        case l:
                        case u:
                        case g:
                        case y:
                        case s:
                          return W;
                        default:
                          return Te;
                      }
                  }
                case o:
                  return Te;
              }
            }
          }
          var f = c,
            R = d,
            S = l,
            D = s,
            B = t,
            N = u,
            I = r,
            J = g,
            j = y,
            _ = o,
            A = a,
            q = i,
            ae = p,
            Q = !1;
          function z(P) {
            return (
              Q ||
                ((Q = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              w(P) || E(P) === c
            );
          }
          function w(P) {
            return E(P) === d;
          }
          function L(P) {
            return E(P) === l;
          }
          function G(P) {
            return E(P) === s;
          }
          function V(P) {
            return typeof P == 'object' && P !== null && P.$$typeof === t;
          }
          function H(P) {
            return E(P) === u;
          }
          function K(P) {
            return E(P) === r;
          }
          function re(P) {
            return E(P) === g;
          }
          function Z(P) {
            return E(P) === y;
          }
          function ie(P) {
            return E(P) === o;
          }
          function ce(P) {
            return E(P) === a;
          }
          function ue(P) {
            return E(P) === i;
          }
          function me(P) {
            return E(P) === p;
          }
          (Ve.AsyncMode = f),
            (Ve.ConcurrentMode = R),
            (Ve.ContextConsumer = S),
            (Ve.ContextProvider = D),
            (Ve.Element = B),
            (Ve.ForwardRef = N),
            (Ve.Fragment = I),
            (Ve.Lazy = J),
            (Ve.Memo = j),
            (Ve.Portal = _),
            (Ve.Profiler = A),
            (Ve.StrictMode = q),
            (Ve.Suspense = ae),
            (Ve.isAsyncMode = z),
            (Ve.isConcurrentMode = w),
            (Ve.isContextConsumer = L),
            (Ve.isContextProvider = G),
            (Ve.isElement = V),
            (Ve.isForwardRef = H),
            (Ve.isFragment = K),
            (Ve.isLazy = re),
            (Ve.isMemo = Z),
            (Ve.isPortal = ie),
            (Ve.isProfiler = ce),
            (Ve.isStrictMode = ue),
            (Ve.isSuspense = me),
            (Ve.isValidElementType = O),
            (Ve.typeOf = E);
        })()),
    Ve
  );
}
var la;
function Ks() {
  return (
    la ||
      ((la = 1), process.env.NODE_ENV === 'production' ? (No.exports = vu()) : (No.exports = gu())),
    No.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Mr, ca;
function yu() {
  if (ca) return Mr;
  ca = 1;
  var e = Object.getOwnPropertySymbols,
    t = Object.prototype.hasOwnProperty,
    o = Object.prototype.propertyIsEnumerable;
  function r(a) {
    if (a == null) throw new TypeError('Object.assign cannot be called with null or undefined');
    return Object(a);
  }
  function i() {
    try {
      if (!Object.assign) return !1;
      var a = new String('abc');
      if (((a[5] = 'de'), Object.getOwnPropertyNames(a)[0] === '5')) return !1;
      for (var s = {}, l = 0; l < 10; l++) s['_' + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(s).map(function (u) {
        return s[u];
      });
      if (c.join('') !== '0123456789') return !1;
      var d = {};
      return (
        'abcdefghijklmnopqrst'.split('').forEach(function (u) {
          d[u] = u;
        }),
        Object.keys(Object.assign({}, d)).join('') === 'abcdefghijklmnopqrst'
      );
    } catch {
      return !1;
    }
  }
  return (
    (Mr = i()
      ? Object.assign
      : function (a, s) {
          for (var l, c = r(a), d, u = 1; u < arguments.length; u++) {
            l = Object(arguments[u]);
            for (var p in l) t.call(l, p) && (c[p] = l[p]);
            if (e) {
              d = e(l);
              for (var h = 0; h < d.length; h++) o.call(l, d[h]) && (c[d[h]] = l[d[h]]);
            }
          }
          return c;
        }),
    Mr
  );
}
var Ar, ua;
function hi() {
  if (ua) return Ar;
  ua = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Ar = e), Ar;
}
var Dr, da;
function Gs() {
  return da || ((da = 1), (Dr = Function.call.bind(Object.prototype.hasOwnProperty))), Dr;
}
var Lr, pa;
function Eu() {
  if (pa) return Lr;
  pa = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = hi(),
      o = {},
      r = Gs();
    e = function (a) {
      var s = 'Warning: ' + a;
      typeof console < 'u' && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function i(a, s, l, c, d) {
    if (process.env.NODE_ENV !== 'production') {
      for (var u in a)
        if (r(a, u)) {
          var p;
          try {
            if (typeof a[u] != 'function') {
              var h = Error(
                (c || 'React class') +
                  ': ' +
                  l +
                  ' type `' +
                  u +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof a[u] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((h.name = 'Invariant Violation'), h);
            }
            p = a[u](s, u, c, l, null, t);
          } catch (g) {
            p = g;
          }
          if (
            (p &&
              !(p instanceof Error) &&
              e(
                (c || 'React class') +
                  ': type specification of ' +
                  l +
                  ' `' +
                  u +
                  '` is invalid; the type checker function must return `null` or an `Error` but returned a ' +
                  typeof p +
                  '. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
              ),
            p instanceof Error && !(p.message in o))
          ) {
            o[p.message] = !0;
            var y = d ? d() : '';
            e('Failed ' + l + ' type: ' + p.message + (y ?? ''));
          }
        }
    }
  }
  return (
    (i.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (o = {});
    }),
    (Lr = i),
    Lr
  );
}
var jr, fa;
function xu() {
  if (fa) return jr;
  fa = 1;
  var e = Ks(),
    t = yu(),
    o = hi(),
    r = Gs(),
    i = Eu(),
    a = function () {};
  process.env.NODE_ENV !== 'production' &&
    (a = function (l) {
      var c = 'Warning: ' + l;
      typeof console < 'u' && console.error(c);
      try {
        throw new Error(c);
      } catch {}
    });
  function s() {
    return null;
  }
  return (
    (jr = function (l, c) {
      var d = typeof Symbol == 'function' && Symbol.iterator,
        u = '@@iterator';
      function p(w) {
        var L = w && ((d && w[d]) || w[u]);
        if (typeof L == 'function') return L;
      }
      var h = '<<anonymous>>',
        y = {
          array: T('array'),
          bigint: T('bigint'),
          bool: T('boolean'),
          func: T('function'),
          number: T('number'),
          object: T('object'),
          string: T('string'),
          symbol: T('symbol'),
          any: C(),
          arrayOf: O,
          element: E(),
          elementType: f(),
          instanceOf: R,
          node: N(),
          objectOf: D,
          oneOf: S,
          oneOfType: B,
          shape: J,
          exact: j,
        };
      function g(w, L) {
        return w === L ? w !== 0 || 1 / w === 1 / L : w !== w && L !== L;
      }
      function m(w, L) {
        (this.message = w), (this.data = L && typeof L == 'object' ? L : {}), (this.stack = '');
      }
      m.prototype = Error.prototype;
      function v(w) {
        if (process.env.NODE_ENV !== 'production')
          var L = {},
            G = 0;
        function V(K, re, Z, ie, ce, ue, me) {
          if (((ie = ie || h), (ue = ue || Z), me !== o)) {
            if (c) {
              var P = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((P.name = 'Invariant Violation'), P);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Te = ie + ':' + Z;
              !L[Te] && // Avoid spamming the console because they are often not actionable except for lib authors
                G < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    ue +
                    '` prop on `' +
                    ie +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (L[Te] = !0),
                G++);
            }
          }
          return re[Z] == null
            ? K
              ? re[Z] === null
                ? new m(
                    'The ' +
                      ce +
                      ' `' +
                      ue +
                      '` is marked as required ' +
                      ('in `' + ie + '`, but its value is `null`.'),
                  )
                : new m(
                    'The ' +
                      ce +
                      ' `' +
                      ue +
                      '` is marked as required in ' +
                      ('`' + ie + '`, but its value is `undefined`.'),
                  )
              : null
            : w(re, Z, ie, ce, ue);
        }
        var H = V.bind(null, !1);
        return (H.isRequired = V.bind(null, !0)), H;
      }
      function T(w) {
        function L(G, V, H, K, re, Z) {
          var ie = G[V],
            ce = q(ie);
          if (ce !== w) {
            var ue = ae(ie);
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type ' +
                ('`' + ue + '` supplied to `' + H + '`, expected ') +
                ('`' + w + '`.'),
              { expectedType: w },
            );
          }
          return null;
        }
        return v(L);
      }
      function C() {
        return v(s);
      }
      function O(w) {
        function L(G, V, H, K, re) {
          if (typeof w != 'function')
            return new m(
              'Property `' +
                re +
                '` of component `' +
                H +
                '` has invalid PropType notation inside arrayOf.',
            );
          var Z = G[V];
          if (!Array.isArray(Z)) {
            var ie = q(Z);
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type ' +
                ('`' + ie + '` supplied to `' + H + '`, expected an array.'),
            );
          }
          for (var ce = 0; ce < Z.length; ce++) {
            var ue = w(Z, ce, H, K, re + '[' + ce + ']', o);
            if (ue instanceof Error) return ue;
          }
          return null;
        }
        return v(L);
      }
      function E() {
        function w(L, G, V, H, K) {
          var re = L[G];
          if (!l(re)) {
            var Z = q(re);
            return new m(
              'Invalid ' +
                H +
                ' `' +
                K +
                '` of type ' +
                ('`' + Z + '` supplied to `' + V + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return v(w);
      }
      function f() {
        function w(L, G, V, H, K) {
          var re = L[G];
          if (!e.isValidElementType(re)) {
            var Z = q(re);
            return new m(
              'Invalid ' +
                H +
                ' `' +
                K +
                '` of type ' +
                ('`' + Z + '` supplied to `' + V + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return v(w);
      }
      function R(w) {
        function L(G, V, H, K, re) {
          if (!(G[V] instanceof w)) {
            var Z = w.name || h,
              ie = z(G[V]);
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type ' +
                ('`' + ie + '` supplied to `' + H + '`, expected ') +
                ('instance of `' + Z + '`.'),
            );
          }
          return null;
        }
        return v(L);
      }
      function S(w) {
        if (!Array.isArray(w))
          return (
            process.env.NODE_ENV !== 'production' &&
              (arguments.length > 1
                ? a(
                    'Invalid arguments supplied to oneOf, expected an array, got ' +
                      arguments.length +
                      ' arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).',
                  )
                : a('Invalid argument supplied to oneOf, expected an array.')),
            s
          );
        function L(G, V, H, K, re) {
          for (var Z = G[V], ie = 0; ie < w.length; ie++) if (g(Z, w[ie])) return null;
          var ce = JSON.stringify(w, function (me, P) {
            var Te = ae(P);
            return Te === 'symbol' ? String(P) : P;
          });
          return new m(
            'Invalid ' +
              K +
              ' `' +
              re +
              '` of value `' +
              String(Z) +
              '` ' +
              ('supplied to `' + H + '`, expected one of ' + ce + '.'),
          );
        }
        return v(L);
      }
      function D(w) {
        function L(G, V, H, K, re) {
          if (typeof w != 'function')
            return new m(
              'Property `' +
                re +
                '` of component `' +
                H +
                '` has invalid PropType notation inside objectOf.',
            );
          var Z = G[V],
            ie = q(Z);
          if (ie !== 'object')
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type ' +
                ('`' + ie + '` supplied to `' + H + '`, expected an object.'),
            );
          for (var ce in Z)
            if (r(Z, ce)) {
              var ue = w(Z, ce, H, K, re + '.' + ce, o);
              if (ue instanceof Error) return ue;
            }
          return null;
        }
        return v(L);
      }
      function B(w) {
        if (!Array.isArray(w))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var L = 0; L < w.length; L++) {
          var G = w[L];
          if (typeof G != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  Q(G) +
                  ' at index ' +
                  L +
                  '.',
              ),
              s
            );
        }
        function V(H, K, re, Z, ie) {
          for (var ce = [], ue = 0; ue < w.length; ue++) {
            var me = w[ue],
              P = me(H, K, re, Z, ie, o);
            if (P == null) return null;
            P.data && r(P.data, 'expectedType') && ce.push(P.data.expectedType);
          }
          var Te = ce.length > 0 ? ', expected one of type [' + ce.join(', ') + ']' : '';
          return new m('Invalid ' + Z + ' `' + ie + '` supplied to ' + ('`' + re + '`' + Te + '.'));
        }
        return v(V);
      }
      function N() {
        function w(L, G, V, H, K) {
          return _(L[G])
            ? null
            : new m(
                'Invalid ' +
                  H +
                  ' `' +
                  K +
                  '` supplied to ' +
                  ('`' + V + '`, expected a ReactNode.'),
              );
        }
        return v(w);
      }
      function I(w, L, G, V, H) {
        return new m(
          (w || 'React class') +
            ': ' +
            L +
            ' type `' +
            G +
            '.' +
            V +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            H +
            '`.',
        );
      }
      function J(w) {
        function L(G, V, H, K, re) {
          var Z = G[V],
            ie = q(Z);
          if (ie !== 'object')
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type `' +
                ie +
                '` ' +
                ('supplied to `' + H + '`, expected `object`.'),
            );
          for (var ce in w) {
            var ue = w[ce];
            if (typeof ue != 'function') return I(H, K, re, ce, ae(ue));
            var me = ue(Z, ce, H, K, re + '.' + ce, o);
            if (me) return me;
          }
          return null;
        }
        return v(L);
      }
      function j(w) {
        function L(G, V, H, K, re) {
          var Z = G[V],
            ie = q(Z);
          if (ie !== 'object')
            return new m(
              'Invalid ' +
                K +
                ' `' +
                re +
                '` of type `' +
                ie +
                '` ' +
                ('supplied to `' + H + '`, expected `object`.'),
            );
          var ce = t({}, G[V], w);
          for (var ue in ce) {
            var me = w[ue];
            if (r(w, ue) && typeof me != 'function') return I(H, K, re, ue, ae(me));
            if (!me)
              return new m(
                'Invalid ' +
                  K +
                  ' `' +
                  re +
                  '` key `' +
                  ue +
                  '` supplied to `' +
                  H +
                  '`.\nBad object: ' +
                  JSON.stringify(G[V], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(w), null, '  '),
              );
            var P = me(Z, ue, H, K, re + '.' + ue, o);
            if (P) return P;
          }
          return null;
        }
        return v(L);
      }
      function _(w) {
        switch (typeof w) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !w;
          case 'object':
            if (Array.isArray(w)) return w.every(_);
            if (w === null || l(w)) return !0;
            var L = p(w);
            if (L) {
              var G = L.call(w),
                V;
              if (L !== w.entries) {
                for (; !(V = G.next()).done; ) if (!_(V.value)) return !1;
              } else
                for (; !(V = G.next()).done; ) {
                  var H = V.value;
                  if (H && !_(H[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function A(w, L) {
        return w === 'symbol'
          ? !0
          : L
          ? L['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && L instanceof Symbol)
          : !1;
      }
      function q(w) {
        var L = typeof w;
        return Array.isArray(w) ? 'array' : w instanceof RegExp ? 'object' : A(L, w) ? 'symbol' : L;
      }
      function ae(w) {
        if (typeof w > 'u' || w === null) return '' + w;
        var L = q(w);
        if (L === 'object') {
          if (w instanceof Date) return 'date';
          if (w instanceof RegExp) return 'regexp';
        }
        return L;
      }
      function Q(w) {
        var L = ae(w);
        switch (L) {
          case 'array':
          case 'object':
            return 'an ' + L;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + L;
          default:
            return L;
        }
      }
      function z(w) {
        return !w.constructor || !w.constructor.name ? h : w.constructor.name;
      }
      return (
        (y.checkPropTypes = i), (y.resetWarningCache = i.resetWarningCache), (y.PropTypes = y), y
      );
    }),
    jr
  );
}
var Fr, ma;
function Ou() {
  if (ma) return Fr;
  ma = 1;
  var e = hi();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (Fr = function () {
      function r(s, l, c, d, u, p) {
        if (p !== e) {
          var h = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((h.name = 'Invariant Violation'), h);
        }
      }
      r.isRequired = r;
      function i() {
        return r;
      }
      var a = {
        array: r,
        bigint: r,
        bool: r,
        func: r,
        number: r,
        object: r,
        string: r,
        symbol: r,
        any: r,
        arrayOf: i,
        element: r,
        elementType: r,
        instanceOf: i,
        node: r,
        objectOf: i,
        oneOf: i,
        oneOfType: i,
        shape: i,
        exact: i,
        checkPropTypes: o,
        resetWarningCache: t,
      };
      return (a.PropTypes = a), a;
    }),
    Fr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var Tu = Ks(),
    Cu = !0;
  Jr.exports = xu()(Tu.isElement, Cu);
} else Jr.exports = Ou()();
var Su = Jr.exports;
const n = /* @__PURE__ */ ru(Su);
function Ru(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Xs(e, t, o, r, i) {
  const a = e[t],
    s = i || t;
  if (
    a == null || // When server-side rendering React doesn't warn either.
    // This is not an accurate check for SSR.
    // This is only in place for Emotion compat.
    // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
    typeof window > 'u'
  )
    return null;
  let l;
  const c = a.type;
  return (
    typeof c == 'function' &&
      !Ru(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const Js = Bt(n.element, Xs);
Js.isRequired = Bt(n.element.isRequired, Xs);
const Hn = Js;
function wu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function ku(e, t, o, r, i) {
  const a = e[t],
    s = i || t;
  if (
    a == null || // When server-side rendering React doesn't warn either.
    // This is not an accurate check for SSR.
    // This is only in place for emotion compat.
    // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
    typeof window > 'u'
  )
    return null;
  let l;
  return (
    typeof a == 'function' &&
      !wu(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const bi = Bt(n.elementType, ku),
  $u = 'exact-prop: ​';
function gi(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : {
        ...e,
        [$u]: (t) => {
          const o = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
          return o.length > 0
            ? new Error(
                `The following props are not supported: ${o
                  .map((r) => `\`${r}\``)
                  .join(', ')}. Please remove them.`,
              )
            : null;
        },
      };
}
function pn(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var Zr = { exports: {} },
  Be = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ha;
function Nu() {
  if (ha) return Be;
  ha = 1;
  var e = Symbol.for('react.element'),
    t = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    i = Symbol.for('react.profiler'),
    a = Symbol.for('react.provider'),
    s = Symbol.for('react.context'),
    l = Symbol.for('react.server_context'),
    c = Symbol.for('react.forward_ref'),
    d = Symbol.for('react.suspense'),
    u = Symbol.for('react.suspense_list'),
    p = Symbol.for('react.memo'),
    h = Symbol.for('react.lazy'),
    y = Symbol.for('react.offscreen'),
    g;
  g = Symbol.for('react.module.reference');
  function m(v) {
    if (typeof v == 'object' && v !== null) {
      var T = v.$$typeof;
      switch (T) {
        case e:
          switch (((v = v.type), v)) {
            case o:
            case i:
            case r:
            case d:
            case u:
              return v;
            default:
              switch (((v = v && v.$$typeof), v)) {
                case l:
                case s:
                case c:
                case h:
                case p:
                case a:
                  return v;
                default:
                  return T;
              }
          }
        case t:
          return T;
      }
    }
  }
  return (
    (Be.ContextConsumer = s),
    (Be.ContextProvider = a),
    (Be.Element = e),
    (Be.ForwardRef = c),
    (Be.Fragment = o),
    (Be.Lazy = h),
    (Be.Memo = p),
    (Be.Portal = t),
    (Be.Profiler = i),
    (Be.StrictMode = r),
    (Be.Suspense = d),
    (Be.SuspenseList = u),
    (Be.isAsyncMode = function () {
      return !1;
    }),
    (Be.isConcurrentMode = function () {
      return !1;
    }),
    (Be.isContextConsumer = function (v) {
      return m(v) === s;
    }),
    (Be.isContextProvider = function (v) {
      return m(v) === a;
    }),
    (Be.isElement = function (v) {
      return typeof v == 'object' && v !== null && v.$$typeof === e;
    }),
    (Be.isForwardRef = function (v) {
      return m(v) === c;
    }),
    (Be.isFragment = function (v) {
      return m(v) === o;
    }),
    (Be.isLazy = function (v) {
      return m(v) === h;
    }),
    (Be.isMemo = function (v) {
      return m(v) === p;
    }),
    (Be.isPortal = function (v) {
      return m(v) === t;
    }),
    (Be.isProfiler = function (v) {
      return m(v) === i;
    }),
    (Be.isStrictMode = function (v) {
      return m(v) === r;
    }),
    (Be.isSuspense = function (v) {
      return m(v) === d;
    }),
    (Be.isSuspenseList = function (v) {
      return m(v) === u;
    }),
    (Be.isValidElementType = function (v) {
      return (
        typeof v == 'string' ||
        typeof v == 'function' ||
        v === o ||
        v === i ||
        v === r ||
        v === d ||
        v === u ||
        v === y ||
        (typeof v == 'object' &&
          v !== null &&
          (v.$$typeof === h ||
            v.$$typeof === p ||
            v.$$typeof === a ||
            v.$$typeof === s ||
            v.$$typeof === c ||
            v.$$typeof === g ||
            v.getModuleId !== void 0))
      );
    }),
    (Be.typeOf = m),
    Be
  );
}
var Ue = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ba;
function Pu() {
  return (
    ba ||
      ((ba = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Symbol.for('react.element'),
            t = Symbol.for('react.portal'),
            o = Symbol.for('react.fragment'),
            r = Symbol.for('react.strict_mode'),
            i = Symbol.for('react.profiler'),
            a = Symbol.for('react.provider'),
            s = Symbol.for('react.context'),
            l = Symbol.for('react.server_context'),
            c = Symbol.for('react.forward_ref'),
            d = Symbol.for('react.suspense'),
            u = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            h = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            g = !1,
            m = !1,
            v = !1,
            T = !1,
            C = !1,
            O;
          O = Symbol.for('react.module.reference');
          function E(X) {
            return !!(
              typeof X == 'string' ||
              typeof X == 'function' ||
              X === o ||
              X === i ||
              C ||
              X === r ||
              X === d ||
              X === u ||
              T ||
              X === y ||
              g ||
              m ||
              v ||
              (typeof X == 'object' &&
                X !== null &&
                (X.$$typeof === h ||
                  X.$$typeof === p ||
                  X.$$typeof === a ||
                  X.$$typeof === s ||
                  X.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  X.$$typeof === O ||
                  X.getModuleId !== void 0))
            );
          }
          function f(X) {
            if (typeof X == 'object' && X !== null) {
              var W = X.$$typeof;
              switch (W) {
                case e:
                  var Ce = X.type;
                  switch (Ce) {
                    case o:
                    case i:
                    case r:
                    case d:
                    case u:
                      return Ce;
                    default:
                      var de = Ce && Ce.$$typeof;
                      switch (de) {
                        case l:
                        case s:
                        case c:
                        case h:
                        case p:
                        case a:
                          return de;
                        default:
                          return W;
                      }
                  }
                case t:
                  return W;
              }
            }
          }
          var R = s,
            S = a,
            D = e,
            B = c,
            N = o,
            I = h,
            J = p,
            j = t,
            _ = i,
            A = r,
            q = d,
            ae = u,
            Q = !1,
            z = !1;
          function w(X) {
            return (
              Q ||
                ((Q = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function L(X) {
            return (
              z ||
                ((z = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function G(X) {
            return f(X) === s;
          }
          function V(X) {
            return f(X) === a;
          }
          function H(X) {
            return typeof X == 'object' && X !== null && X.$$typeof === e;
          }
          function K(X) {
            return f(X) === c;
          }
          function re(X) {
            return f(X) === o;
          }
          function Z(X) {
            return f(X) === h;
          }
          function ie(X) {
            return f(X) === p;
          }
          function ce(X) {
            return f(X) === t;
          }
          function ue(X) {
            return f(X) === i;
          }
          function me(X) {
            return f(X) === r;
          }
          function P(X) {
            return f(X) === d;
          }
          function Te(X) {
            return f(X) === u;
          }
          (Ue.ContextConsumer = R),
            (Ue.ContextProvider = S),
            (Ue.Element = D),
            (Ue.ForwardRef = B),
            (Ue.Fragment = N),
            (Ue.Lazy = I),
            (Ue.Memo = J),
            (Ue.Portal = j),
            (Ue.Profiler = _),
            (Ue.StrictMode = A),
            (Ue.Suspense = q),
            (Ue.SuspenseList = ae),
            (Ue.isAsyncMode = w),
            (Ue.isConcurrentMode = L),
            (Ue.isContextConsumer = G),
            (Ue.isContextProvider = V),
            (Ue.isElement = H),
            (Ue.isForwardRef = K),
            (Ue.isFragment = re),
            (Ue.isLazy = Z),
            (Ue.isMemo = ie),
            (Ue.isPortal = ce),
            (Ue.isProfiler = ue),
            (Ue.isStrictMode = me),
            (Ue.isSuspense = P),
            (Ue.isSuspenseList = Te),
            (Ue.isValidElementType = E),
            (Ue.typeOf = f);
        })()),
    Ue
  );
}
process.env.NODE_ENV === 'production' ? (Zr.exports = Nu()) : (Zr.exports = Pu());
var bo = Zr.exports;
const Iu = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function _u(e) {
  const t = `${e}`.match(Iu);
  return (t && t[1]) || '';
}
function Zs(e, t = '') {
  return e.displayName || e.name || _u(e) || t;
}
function va(e, t, o) {
  const r = Zs(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function Mu(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Zs(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case bo.ForwardRef:
          return va(e, e.render, 'ForwardRef');
        case bo.Memo:
          return va(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function Qt(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = e[t],
    s = i || t;
  return a == null
    ? null
    : a && a.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const Au = n.oneOfType([n.func, n.object]),
  yt = Au;
function oe(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : pn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ga(...e) {
  return e.reduce(
    (t, o) =>
      o == null
        ? t
        : function (...i) {
            t.apply(this, i), o.apply(this, i);
          },
    () => {},
  );
}
function Qs(e, t = 166) {
  let o;
  function r(...i) {
    const a = () => {
      e.apply(this, i);
    };
    clearTimeout(o), (o = setTimeout(a, t));
  }
  return (
    (r.clear = () => {
      clearTimeout(o);
    }),
    r
  );
}
function zr(e, t) {
  return /* @__PURE__ */ b.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function ot(e) {
  return (e && e.ownerDocument) || document;
}
function Tn(e) {
  return ot(e).defaultView || window;
}
function qo(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const Du = typeof window < 'u' ? b.useLayoutEffect : b.useEffect,
  an = Du;
let ya = 0;
function Lu(e) {
  const [t, o] = b.useState(e),
    r = e || t;
  return (
    b.useEffect(() => {
      t == null && ((ya += 1), o(`mui-${ya}`));
    }, [t]),
    r
  );
}
const Ea = b['useId'.toString()];
function el(e) {
  if (Ea !== void 0) {
    const t = Ea();
    return e ?? t;
  }
  return Lu(e);
}
function ju(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = i || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${a}\` is not supported. Please remove it.`)
    : null;
}
function xn({ controlled: e, default: t, name: o, state: r = 'value' }) {
  const { current: i } = b.useRef(e !== void 0),
    [a, s] = b.useState(t),
    l = i ? e : a;
  if (process.env.NODE_ENV !== 'production') {
    b.useEffect(() => {
      i !== (e !== void 0) &&
        console.error(
          [
            `MUI: A component is changing the ${i ? '' : 'un'}controlled ${r} state of ${o} to be ${
              i ? 'un' : ''
            }controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${o} element for the lifetime of the component.`,
            "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
            'More info: https://fb.me/react-controlled-components',
          ].join(`
`),
        );
    }, [r, o, e]);
    const { current: d } = b.useRef(t);
    b.useEffect(() => {
      !i &&
        d !== t &&
        console.error(
          [
            `MUI: A component is changing the default ${r} state of an uncontrolled ${o} after being initialized. To suppress this warning opt to use a controlled ${o}.`,
          ].join(`
`),
        );
    }, [JSON.stringify(t)]);
  }
  const c = b.useCallback((d) => {
    i || s(d);
  }, []);
  return [l, c];
}
function pt(e) {
  const t = b.useRef(e);
  return (
    an(() => {
      t.current = e;
    }),
    b.useCallback(
      (...o) =>
        // @ts-expect-error hide `this`
        // tslint:disable-next-line:ban-comma-operator
        (0, t.current)(...o),
      [],
    )
  );
}
function it(...e) {
  return b.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              qo(o, t);
            });
          },
    e,
  );
}
let ar = !0,
  Qr = !1,
  xa;
const Fu = {
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
  'datetime-local': !0,
};
function zu(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && Fu[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function Vu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (ar = !0);
}
function Vr() {
  ar = !1;
}
function Bu() {
  this.visibilityState === 'hidden' && Qr && (ar = !0);
}
function Uu(e) {
  e.addEventListener('keydown', Vu, !0),
    e.addEventListener('mousedown', Vr, !0),
    e.addEventListener('pointerdown', Vr, !0),
    e.addEventListener('touchstart', Vr, !0),
    e.addEventListener('visibilitychange', Bu, !0);
}
function Wu(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return ar || zu(t);
}
function tl() {
  const e = b.useCallback((i) => {
      i != null && Uu(i.ownerDocument);
    }, []),
    t = b.useRef(!1);
  function o() {
    return t.current
      ? ((Qr = !0),
        window.clearTimeout(xa),
        (xa = window.setTimeout(() => {
          Qr = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return Wu(i) ? ((t.current = !0), !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: o,
    ref: e,
  };
}
function nl(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Hu = (e) => {
    const t = b.useRef({});
    return (
      b.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  qu = Hu,
  Yu = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
  Ku = Yu;
function Gu(e) {
  const t = typeof e;
  switch (t) {
    case 'number':
      return Number.isNaN(e)
        ? 'NaN'
        : Number.isFinite(e)
        ? e !== Math.floor(e)
          ? 'float'
          : 'number'
        : 'Infinity';
    case 'object':
      return e === null ? 'null' : e.constructor.name;
    default:
      return t;
  }
}
function Xu(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const Ju = Number.isInteger || Xu;
function ol(e, t, o, r) {
  const i = e[t];
  if (i == null || !Ju(i)) {
    const a = Gu(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function rl(e, t, ...o) {
  return e[t] === void 0 ? null : ol(e, t, ...o);
}
function ei() {
  return null;
}
rl.isRequired = ol;
ei.isRequired = ei;
const yi = process.env.NODE_ENV === 'production' ? ei : rl;
function Ei(e, t) {
  const o = {
    ...t,
  };
  return (
    Object.keys(e).forEach((r) => {
      if (r.toString().match(/^(components|slots)$/))
        o[r] = {
          ...e[r],
          ...o[r],
        };
      else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
        const i = e[r] || {},
          a = t[r];
        (o[r] = {}),
          !a || !Object.keys(a)
            ? (o[r] = i)
            : !i || !Object.keys(i)
            ? (o[r] = a)
            : ((o[r] = {
                ...a,
              }),
              Object.keys(i).forEach((s) => {
                o[r][s] = Ei(i[s], a[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function De(e, t, o = void 0) {
  const r = {};
  return (
    Object.keys(e).forEach(
      // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
      // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
      (i) => {
        r[i] = e[i]
          .reduce((a, s) => {
            if (s) {
              const l = t(s);
              l !== '' && a.push(l), o && o[s] && a.push(o[s]);
            }
            return a;
          }, [])
          .join(' ');
      },
    ),
    r
  );
}
const Oa = (e) => e,
  Zu = () => {
    let e = Oa;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Oa;
      },
    };
  },
  Qu = Zu(),
  ed = Qu,
  td = {
    active: 'active',
    checked: 'checked',
    completed: 'completed',
    disabled: 'disabled',
    readOnly: 'readOnly',
    error: 'error',
    expanded: 'expanded',
    focused: 'focused',
    focusVisible: 'focusVisible',
    required: 'required',
    selected: 'selected',
  };
function Pe(e, t, o = 'Mui') {
  const r = td[t];
  return r ? `${o}-${r}` : `${ed.generate(e)}-${t}`;
}
function _e(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = Pe(e, i, o);
    }),
    r
  );
}
const sr = '$$material';
function Yo() {
  return (
    (Yo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
          }
          return e;
        }),
    Yo.apply(this, arguments)
  );
}
function il(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var nd =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  od = /* @__PURE__ */ il(
    function (e) {
      return (
        nd.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
      );
    },
    /* Z+1 */
  );
function rd(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function id(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var ad = /* @__PURE__ */ (function () {
    function e(o) {
      var r = this;
      (this._insertTag = function (i) {
        var a;
        r.tags.length === 0
          ? r.insertionPoint
            ? (a = r.insertionPoint.nextSibling)
            : r.prepend
            ? (a = r.container.firstChild)
            : (a = r.before)
          : (a = r.tags[r.tags.length - 1].nextSibling),
          r.container.insertBefore(i, a),
          r.tags.push(i);
      }),
        (this.isSpeedy = o.speedy === void 0 ? process.env.NODE_ENV === 'production' : o.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = o.nonce),
        (this.key = o.key),
        (this.container = o.container),
        (this.prepend = o.prepend),
        (this.insertionPoint = o.insertionPoint),
        (this.before = null);
    }
    var t = e.prototype;
    return (
      (t.hydrate = function (r) {
        r.forEach(this._insertTag);
      }),
      (t.insert = function (r) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(id(this));
        var i = this.tags[this.tags.length - 1];
        if (process.env.NODE_ENV !== 'production') {
          var a = r.charCodeAt(0) === 64 && r.charCodeAt(1) === 105;
          a &&
            this._alreadyInsertedOrderInsensitiveRule &&
            console.error(
              `You're attempting to insert the following rule:
` +
                r +
                '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.',
            ),
            (this._alreadyInsertedOrderInsensitiveRule =
              this._alreadyInsertedOrderInsensitiveRule || !a);
        }
        if (this.isSpeedy) {
          var s = rd(i);
          try {
            s.insertRule(r, s.cssRules.length);
          } catch (l) {
            process.env.NODE_ENV !== 'production' &&
              !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(
                r,
              ) &&
              console.error('There was a problem inserting the following rule: "' + r + '"', l);
          }
        } else i.appendChild(document.createTextNode(r));
        this.ctr++;
      }),
      (t.flush = function () {
        this.tags.forEach(function (r) {
          return r.parentNode && r.parentNode.removeChild(r);
        }),
          (this.tags = []),
          (this.ctr = 0),
          process.env.NODE_ENV !== 'production' && (this._alreadyInsertedOrderInsensitiveRule = !1);
      }),
      e
    );
  })(),
  dt = '-ms-',
  Ko = '-moz-',
  Me = '-webkit-',
  xi = 'comm',
  Oi = 'rule',
  Ti = 'decl',
  sd = '@import',
  al = '@keyframes',
  ld = '@layer',
  cd = Math.abs,
  lr = String.fromCharCode,
  ud = Object.assign;
function dd(e, t) {
  return ct(e, 0) ^ 45
    ? (((((((t << 2) ^ ct(e, 0)) << 2) ^ ct(e, 1)) << 2) ^ ct(e, 2)) << 2) ^ ct(e, 3)
    : 0;
}
function sl(e) {
  return e.trim();
}
function pd(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Ae(e, t, o) {
  return e.replace(t, o);
}
function ti(e, t) {
  return e.indexOf(t);
}
function ct(e, t) {
  return e.charCodeAt(t) | 0;
}
function vo(e, t, o) {
  return e.slice(t, o);
}
function Xt(e) {
  return e.length;
}
function Ci(e) {
  return e.length;
}
function Po(e, t) {
  return t.push(e), e;
}
function fd(e, t) {
  return e.map(t).join('');
}
var cr = 1,
  Fn = 1,
  ll = 0,
  gt = 0,
  rt = 0,
  qn = '';
function ur(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: cr,
    column: Fn,
    length: s,
    return: '',
  };
}
function to(e, t) {
  return ud(ur('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function md() {
  return rt;
}
function hd() {
  return (rt = gt > 0 ? ct(qn, --gt) : 0), Fn--, rt === 10 && ((Fn = 1), cr--), rt;
}
function kt() {
  return (rt = gt < ll ? ct(qn, gt++) : 0), Fn++, rt === 10 && ((Fn = 1), cr++), rt;
}
function Zt() {
  return ct(qn, gt);
}
function Vo() {
  return gt;
}
function To(e, t) {
  return vo(qn, e, t);
}
function go(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function cl(e) {
  return (cr = Fn = 1), (ll = Xt((qn = e))), (gt = 0), [];
}
function ul(e) {
  return (qn = ''), e;
}
function Bo(e) {
  return sl(To(gt - 1, ni(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function bd(e) {
  for (; (rt = Zt()) && rt < 33; ) kt();
  return go(e) > 2 || go(rt) > 3 ? '' : ' ';
}
function vd(e, t) {
  for (; --t && kt() && !(rt < 48 || rt > 102 || (rt > 57 && rt < 65) || (rt > 70 && rt < 97)); );
  return To(e, Vo() + (t < 6 && Zt() == 32 && kt() == 32));
}
function ni(e) {
  for (; kt(); )
    switch (rt) {
      case e:
        return gt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ni(rt);
        break;
      case 40:
        e === 41 && ni(e);
        break;
      case 92:
        kt();
        break;
    }
  return gt;
}
function gd(e, t) {
  for (; kt() && e + rt !== 47 + 10; ) if (e + rt === 42 + 42 && Zt() === 47) break;
  return '/*' + To(t, gt - 1) + '*' + lr(e === 47 ? e : kt());
}
function yd(e) {
  for (; !go(Zt()); ) kt();
  return To(e, gt);
}
function Ed(e) {
  return ul(Uo('', null, null, null, [''], (e = cl(e)), 0, [0], e));
}
function Uo(e, t, o, r, i, a, s, l, c) {
  for (
    var d = 0,
      u = 0,
      p = s,
      h = 0,
      y = 0,
      g = 0,
      m = 1,
      v = 1,
      T = 1,
      C = 0,
      O = '',
      E = i,
      f = a,
      R = r,
      S = O;
    v;

  )
    switch (((g = C), (C = kt()))) {
      case 40:
        if (g != 108 && ct(S, p - 1) == 58) {
          ti((S += Ae(Bo(C), '&', '&\f')), '&\f') != -1 && (T = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        S += Bo(C);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        S += bd(g);
        break;
      case 92:
        S += vd(Vo() - 1, 7);
        continue;
      case 47:
        switch (Zt()) {
          case 42:
          case 47:
            Po(xd(gd(kt(), Vo()), t, o), c);
            break;
          default:
            S += '/';
        }
        break;
      case 123 * m:
        l[d++] = Xt(S) * T;
      case 125 * m:
      case 59:
      case 0:
        switch (C) {
          case 0:
          case 125:
            v = 0;
          case 59 + u:
            T == -1 && (S = Ae(S, /\f/g, '')),
              y > 0 &&
                Xt(S) - p &&
                Po(y > 32 ? Ca(S + ';', r, o, p - 1) : Ca(Ae(S, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            S += ';';
          default:
            if ((Po((R = Ta(S, t, o, d, u, i, l, O, (E = []), (f = []), p)), a), C === 123))
              if (u === 0) Uo(S, t, R, R, E, a, p, l, f);
              else
                switch (h === 99 && ct(S, 3) === 110 ? 100 : h) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Uo(
                      e,
                      R,
                      R,
                      r && Po(Ta(e, R, R, 0, 0, i, l, O, i, (E = []), p), f),
                      i,
                      f,
                      p,
                      l,
                      r ? E : f,
                    );
                    break;
                  default:
                    Uo(S, R, R, R, [''], f, 0, l, f);
                }
        }
        (d = u = y = 0), (m = T = 1), (O = S = ''), (p = s);
        break;
      case 58:
        (p = 1 + Xt(S)), (y = g);
      default:
        if (m < 1) {
          if (C == 123) --m;
          else if (C == 125 && m++ == 0 && hd() == 125) continue;
        }
        switch (((S += lr(C)), C * m)) {
          case 38:
            T = u > 0 ? 1 : ((S += '\f'), -1);
            break;
          case 44:
            (l[d++] = (Xt(S) - 1) * T), (T = 1);
            break;
          case 64:
            Zt() === 45 && (S += Bo(kt())), (h = Zt()), (u = p = Xt((O = S += yd(Vo())))), C++;
            break;
          case 45:
            g === 45 && Xt(S) == 2 && (m = 0);
        }
    }
  return a;
}
function Ta(e, t, o, r, i, a, s, l, c, d, u) {
  for (var p = i - 1, h = i === 0 ? a : [''], y = Ci(h), g = 0, m = 0, v = 0; g < r; ++g)
    for (var T = 0, C = vo(e, p + 1, (p = cd((m = s[g])))), O = e; T < y; ++T)
      (O = sl(m > 0 ? h[T] + ' ' + C : Ae(C, /&\f/g, h[T]))) && (c[v++] = O);
  return ur(e, t, o, i === 0 ? Oi : l, c, d, u);
}
function xd(e, t, o) {
  return ur(e, t, o, xi, lr(md()), vo(e, 2, -2), 0);
}
function Ca(e, t, o, r) {
  return ur(e, t, o, Ti, vo(e, 0, r), vo(e, r + 1, -1), r);
}
function Ln(e, t) {
  for (var o = '', r = Ci(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function Od(e, t, o, r) {
  switch (e.type) {
    case ld:
      if (e.children.length) break;
    case sd:
    case Ti:
      return (e.return = e.return || e.value);
    case xi:
      return '';
    case al:
      return (e.return = e.value + '{' + Ln(e.children, r) + '}');
    case Oi:
      e.value = e.props.join(',');
  }
  return Xt((o = Ln(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function Td(e) {
  var t = Ci(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function Cd(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var Sd = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = Zt()), i === 38 && a === 12 && (o[r] = 1), !go(a); ) kt();
    return To(t, gt);
  },
  Rd = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (go(i)) {
        case 0:
          i === 38 && Zt() === 12 && (o[r] = 1), (t[r] += Sd(gt - 1, o, r));
          break;
        case 2:
          t[r] += Bo(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = Zt() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += lr(i);
      }
    while ((i = kt()));
    return t;
  },
  wd = function (t, o) {
    return ul(Rd(cl(t), o));
  },
  Sa = /* @__PURE__ */ new WeakMap(),
  kd = function (t) {
    if (
      !(
        t.type !== 'rule' ||
        !t.parent || // positive .length indicates that this rule contains pseudo
        // negative .length indicates that this rule has been already prefixed
        t.length < 1
      )
    ) {
      for (
        var o = t.value, r = t.parent, i = t.column === r.column && t.line === r.line;
        r.type !== 'rule';

      )
        if (((r = r.parent), !r)) return;
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !Sa.get(r)) && !i) {
        Sa.set(t, !0);
        for (var a = [], s = wd(o, a), l = r.props, c = 0, d = 0; c < s.length; c++)
          for (var u = 0; u < l.length; u++, d++)
            t.props[d] = a[c] ? s[c].replace(/&\f/g, l[u]) : l[u] + ' ' + s[c];
      }
    }
  },
  $d = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      // charcode for l
      o.charCodeAt(0) === 108 && // charcode for b
        o.charCodeAt(2) === 98 &&
        ((t.return = ''), (t.value = ''));
    }
  },
  Nd =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Pd = function (t) {
    return t.type === 'comm' && t.children.indexOf(Nd) > -1;
  },
  Id = function (t) {
    return function (o, r, i) {
      if (!(o.type !== 'rule' || t.compat)) {
        var a = o.value.match(/(:first|:nth|:nth-last)-child/g);
        if (a) {
          for (
            var s = !!o.parent,
              l = s
                ? o.parent.children
                : // global rule at the root level
                  i,
              c = l.length - 1;
            c >= 0;
            c--
          ) {
            var d = l[c];
            if (d.line < o.line) break;
            if (d.column < o.column) {
              if (Pd(d)) return;
              break;
            }
          }
          a.forEach(function (u) {
            console.error(
              'The pseudo class "' +
                u +
                '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
                u.split('-child')[0] +
                '-of-type".',
            );
          });
        }
      }
    };
  },
  dl = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  _d = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!dl(o[r])) return !0;
    return !1;
  },
  Ra = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  Md = function (t, o, r) {
    dl(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          Ra(t))
        : _d(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          Ra(t)));
  };
function pl(e, t) {
  switch (dd(e, t)) {
    case 5103:
      return Me + 'print-' + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Me + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Me + e + Ko + e + dt + e + e;
    case 6828:
    case 4268:
      return Me + e + dt + e + e;
    case 6165:
      return Me + e + dt + 'flex-' + e + e;
    case 5187:
      return Me + e + Ae(e, /(\w+).+(:[^]+)/, Me + 'box-$1$2' + dt + 'flex-$1$2') + e;
    case 5443:
      return Me + e + dt + 'flex-item-' + Ae(e, /flex-|-self/, '') + e;
    case 4675:
      return Me + e + dt + 'flex-line-pack' + Ae(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return Me + e + dt + Ae(e, 'shrink', 'negative') + e;
    case 5292:
      return Me + e + dt + Ae(e, 'basis', 'preferred-size') + e;
    case 6060:
      return Me + 'box-' + Ae(e, '-grow', '') + Me + e + dt + Ae(e, 'grow', 'positive') + e;
    case 4554:
      return Me + Ae(e, /([^-])(transform)/g, '$1' + Me + '$2') + e;
    case 6187:
      return Ae(Ae(Ae(e, /(zoom-|grab)/, Me + '$1'), /(image-set)/, Me + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return Ae(e, /(image-set\([^]*)/, Me + '$1$`$1');
    case 4968:
      return (
        Ae(
          Ae(e, /(.+:)(flex-)?(.*)/, Me + 'box-pack:$3' + dt + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify',
        ) +
        Me +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Ae(e, /(.+)-inline(.+)/, Me + '$1$2') + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Xt(e) - 1 - t > 6)
        switch (ct(e, t + 1)) {
          case 109:
            if (ct(e, t + 4) !== 45) break;
          case 102:
            return (
              Ae(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + Me + '$2-$3$1' + Ko + (ct(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~ti(e, 'stretch') ? pl(Ae(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (ct(e, t + 1) !== 115) break;
    case 6444:
      switch (ct(e, Xt(e) - 3 - (~ti(e, '!important') && 10))) {
        case 107:
          return Ae(e, ':', ':' + Me) + e;
        case 101:
          return (
            Ae(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                Me +
                (ct(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                Me +
                '$2$3$1' +
                dt +
                '$2box$3',
            ) + e
          );
      }
      break;
    case 5936:
      switch (ct(e, t + 11)) {
        case 114:
          return Me + e + dt + Ae(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return Me + e + dt + Ae(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return Me + e + dt + Ae(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return Me + e + dt + e + e;
  }
  return e;
}
var Ad = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Ti:
          t.return = pl(t.value, t.length);
          break;
        case al:
          return Ln(
            [
              to(t, {
                value: Ae(t.value, '@', '@' + Me),
              }),
            ],
            i,
          );
        case Oi:
          if (t.length)
            return fd(t.props, function (a) {
              switch (pd(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Ln(
                    [
                      to(t, {
                        props: [Ae(a, /:(read-\w+)/, ':' + Ko + '$1')],
                      }),
                    ],
                    i,
                  );
                case '::placeholder':
                  return Ln(
                    [
                      to(t, {
                        props: [Ae(a, /:(plac\w+)/, ':' + Me + 'input-$1')],
                      }),
                      to(t, {
                        props: [Ae(a, /:(plac\w+)/, ':' + Ko + '$1')],
                      }),
                      to(t, {
                        props: [Ae(a, /:(plac\w+)/, dt + 'input-$1')],
                      }),
                    ],
                    i,
                  );
              }
              return '';
            });
      }
  },
  Dd = [Ad],
  Ld = function (t) {
    var o = t.key;
    if (process.env.NODE_ENV !== 'production' && !o)
      throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
    if (o === 'css') {
      var r = document.querySelectorAll('style[data-emotion]:not([data-s])');
      Array.prototype.forEach.call(r, function (m) {
        var v = m.getAttribute('data-emotion');
        v.indexOf(' ') !== -1 && (document.head.appendChild(m), m.setAttribute('data-s', ''));
      });
    }
    var i = t.stylisPlugins || Dd;
    if (process.env.NODE_ENV !== 'production' && /[^a-z-]/.test(o))
      throw new Error(
        'Emotion key must only contain lower case alphabetical characters and - but "' +
          o +
          '" was passed',
      );
    var a = {},
      s,
      l = [];
    (s = t.container || document.head),
      Array.prototype.forEach.call(
        // this means we will ignore elements which don't have a space in them which
        // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
        document.querySelectorAll('style[data-emotion^="' + o + ' "]'),
        function (m) {
          for (var v = m.getAttribute('data-emotion').split(' '), T = 1; T < v.length; T++)
            a[v[T]] = !0;
          l.push(m);
        },
      );
    var c,
      d = [kd, $d];
    process.env.NODE_ENV !== 'production' &&
      d.push(
        Id({
          get compat() {
            return g.compat;
          },
        }),
        Md,
      );
    {
      var u,
        p = [
          Od,
          process.env.NODE_ENV !== 'production'
            ? function (m) {
                m.root ||
                  (m.return
                    ? u.insert(m.return)
                    : m.value && m.type !== xi && u.insert(m.value + '{}'));
              }
            : Cd(function (m) {
                u.insert(m);
              }),
        ],
        h = Td(d.concat(i, p)),
        y = function (v) {
          return Ln(Ed(v), h);
        };
      c = function (v, T, C, O) {
        (u = C),
          process.env.NODE_ENV !== 'production' &&
            T.map !== void 0 &&
            (u = {
              insert: function (f) {
                C.insert(f + T.map);
              },
            }),
          y(v ? v + '{' + T.styles + '}' : T.styles),
          O && (g.inserted[T.name] = !0);
      };
    }
    var g = {
      key: o,
      sheet: new ad({
        key: o,
        container: s,
        nonce: t.nonce,
        speedy: t.speedy,
        prepend: t.prepend,
        insertionPoint: t.insertionPoint,
      }),
      nonce: t.nonce,
      inserted: a,
      registered: {},
      insert: c,
    };
    return g.sheet.hydrate(l), g;
  },
  oi = { exports: {} },
  We = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wa;
function jd() {
  if (wa) return We;
  wa = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    o = e ? Symbol.for('react.portal') : 60106,
    r = e ? Symbol.for('react.fragment') : 60107,
    i = e ? Symbol.for('react.strict_mode') : 60108,
    a = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    l = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    d = e ? Symbol.for('react.concurrent_mode') : 60111,
    u = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    h = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    g = e ? Symbol.for('react.lazy') : 60116,
    m = e ? Symbol.for('react.block') : 60121,
    v = e ? Symbol.for('react.fundamental') : 60117,
    T = e ? Symbol.for('react.responder') : 60118,
    C = e ? Symbol.for('react.scope') : 60119;
  function O(f) {
    if (typeof f == 'object' && f !== null) {
      var R = f.$$typeof;
      switch (R) {
        case t:
          switch (((f = f.type), f)) {
            case c:
            case d:
            case r:
            case a:
            case i:
            case p:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case u:
                case g:
                case y:
                case s:
                  return f;
                default:
                  return R;
              }
          }
        case o:
          return R;
      }
    }
  }
  function E(f) {
    return O(f) === d;
  }
  return (
    (We.AsyncMode = c),
    (We.ConcurrentMode = d),
    (We.ContextConsumer = l),
    (We.ContextProvider = s),
    (We.Element = t),
    (We.ForwardRef = u),
    (We.Fragment = r),
    (We.Lazy = g),
    (We.Memo = y),
    (We.Portal = o),
    (We.Profiler = a),
    (We.StrictMode = i),
    (We.Suspense = p),
    (We.isAsyncMode = function (f) {
      return E(f) || O(f) === c;
    }),
    (We.isConcurrentMode = E),
    (We.isContextConsumer = function (f) {
      return O(f) === l;
    }),
    (We.isContextProvider = function (f) {
      return O(f) === s;
    }),
    (We.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (We.isForwardRef = function (f) {
      return O(f) === u;
    }),
    (We.isFragment = function (f) {
      return O(f) === r;
    }),
    (We.isLazy = function (f) {
      return O(f) === g;
    }),
    (We.isMemo = function (f) {
      return O(f) === y;
    }),
    (We.isPortal = function (f) {
      return O(f) === o;
    }),
    (We.isProfiler = function (f) {
      return O(f) === a;
    }),
    (We.isStrictMode = function (f) {
      return O(f) === i;
    }),
    (We.isSuspense = function (f) {
      return O(f) === p;
    }),
    (We.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === d ||
        f === a ||
        f === i ||
        f === p ||
        f === h ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === g ||
            f.$$typeof === y ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === u ||
            f.$$typeof === v ||
            f.$$typeof === T ||
            f.$$typeof === C ||
            f.$$typeof === m))
      );
    }),
    (We.typeOf = O),
    We
  );
}
var He = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ka;
function Fd() {
  return (
    ka ||
      ((ka = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = typeof Symbol == 'function' && Symbol.for,
            t = e ? Symbol.for('react.element') : 60103,
            o = e ? Symbol.for('react.portal') : 60106,
            r = e ? Symbol.for('react.fragment') : 60107,
            i = e ? Symbol.for('react.strict_mode') : 60108,
            a = e ? Symbol.for('react.profiler') : 60114,
            s = e ? Symbol.for('react.provider') : 60109,
            l = e ? Symbol.for('react.context') : 60110,
            c = e ? Symbol.for('react.async_mode') : 60111,
            d = e ? Symbol.for('react.concurrent_mode') : 60111,
            u = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            h = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            g = e ? Symbol.for('react.lazy') : 60116,
            m = e ? Symbol.for('react.block') : 60121,
            v = e ? Symbol.for('react.fundamental') : 60117,
            T = e ? Symbol.for('react.responder') : 60118,
            C = e ? Symbol.for('react.scope') : 60119;
          function O(P) {
            return (
              typeof P == 'string' ||
              typeof P == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              P === r ||
              P === d ||
              P === a ||
              P === i ||
              P === p ||
              P === h ||
              (typeof P == 'object' &&
                P !== null &&
                (P.$$typeof === g ||
                  P.$$typeof === y ||
                  P.$$typeof === s ||
                  P.$$typeof === l ||
                  P.$$typeof === u ||
                  P.$$typeof === v ||
                  P.$$typeof === T ||
                  P.$$typeof === C ||
                  P.$$typeof === m))
            );
          }
          function E(P) {
            if (typeof P == 'object' && P !== null) {
              var Te = P.$$typeof;
              switch (Te) {
                case t:
                  var X = P.type;
                  switch (X) {
                    case c:
                    case d:
                    case r:
                    case a:
                    case i:
                    case p:
                      return X;
                    default:
                      var W = X && X.$$typeof;
                      switch (W) {
                        case l:
                        case u:
                        case g:
                        case y:
                        case s:
                          return W;
                        default:
                          return Te;
                      }
                  }
                case o:
                  return Te;
              }
            }
          }
          var f = c,
            R = d,
            S = l,
            D = s,
            B = t,
            N = u,
            I = r,
            J = g,
            j = y,
            _ = o,
            A = a,
            q = i,
            ae = p,
            Q = !1;
          function z(P) {
            return (
              Q ||
                ((Q = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              w(P) || E(P) === c
            );
          }
          function w(P) {
            return E(P) === d;
          }
          function L(P) {
            return E(P) === l;
          }
          function G(P) {
            return E(P) === s;
          }
          function V(P) {
            return typeof P == 'object' && P !== null && P.$$typeof === t;
          }
          function H(P) {
            return E(P) === u;
          }
          function K(P) {
            return E(P) === r;
          }
          function re(P) {
            return E(P) === g;
          }
          function Z(P) {
            return E(P) === y;
          }
          function ie(P) {
            return E(P) === o;
          }
          function ce(P) {
            return E(P) === a;
          }
          function ue(P) {
            return E(P) === i;
          }
          function me(P) {
            return E(P) === p;
          }
          (He.AsyncMode = f),
            (He.ConcurrentMode = R),
            (He.ContextConsumer = S),
            (He.ContextProvider = D),
            (He.Element = B),
            (He.ForwardRef = N),
            (He.Fragment = I),
            (He.Lazy = J),
            (He.Memo = j),
            (He.Portal = _),
            (He.Profiler = A),
            (He.StrictMode = q),
            (He.Suspense = ae),
            (He.isAsyncMode = z),
            (He.isConcurrentMode = w),
            (He.isContextConsumer = L),
            (He.isContextProvider = G),
            (He.isElement = V),
            (He.isForwardRef = H),
            (He.isFragment = K),
            (He.isLazy = re),
            (He.isMemo = Z),
            (He.isPortal = ie),
            (He.isProfiler = ce),
            (He.isStrictMode = ue),
            (He.isSuspense = me),
            (He.isValidElementType = O),
            (He.typeOf = E);
        })()),
    He
  );
}
process.env.NODE_ENV === 'production' ? (oi.exports = jd()) : (oi.exports = Fd());
var zd = oi.exports,
  fl = zd,
  Vd = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  Bd = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  ml = {};
ml[fl.ForwardRef] = Vd;
ml[fl.Memo] = Bd;
var Ud = !0;
function Si(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ';') : (r += i + ' ');
    }),
    r
  );
}
var dr = function (t, o, r) {
    var i = t.key + '-' + o.name;
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (r === !1 || // we need to always store it if we're in compat mode and
      // in node since emotion-server relies on whether a style is in
      // the registered cache to know whether a style is global or not
      // also, note that this check will be dead code eliminated in the browser
      Ud === !1) &&
      t.registered[i] === void 0 &&
      (t.registered[i] = o.styles);
  },
  pr = function (t, o, r) {
    dr(t, o, r);
    var i = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var a = o;
      do t.insert(o === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function Wd(e) {
  for (var t = 0, o, r = 0, i = e.length; i >= 4; ++r, i -= 4)
    (o =
      (e.charCodeAt(r) & 255) |
      ((e.charCodeAt(++r) & 255) << 8) |
      ((e.charCodeAt(++r) & 255) << 16) |
      ((e.charCodeAt(++r) & 255) << 24)),
      (o = /* Math.imul(k, m): */ (o & 65535) * 1540483477 + (((o >>> 16) * 59797) << 16)),
      (o ^= /* k >>> r: */ o >>> 24),
      (t =
        /* Math.imul(k, m): */
        ((o & 65535) * 1540483477 + (((o >>> 16) * 59797) << 16)) /* Math.imul(h, m): */ ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
  switch (i) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      (t ^= e.charCodeAt(r) & 255),
        (t = /* Math.imul(h, m): */ (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
  }
  return (
    (t ^= t >>> 13),
    (t = /* Math.imul(h, m): */ (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  );
}
var Hd = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  $a = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  qd =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  Yd = /[A-Z]|^ms/g,
  hl = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Ri = function (t) {
    return t.charCodeAt(1) === 45;
  },
  Na = function (t) {
    return t != null && typeof t != 'boolean';
  },
  Br = /* @__PURE__ */ il(function (e) {
    return Ri(e) ? e : e.replace(Yd, '-$&').toLowerCase();
  }),
  Go = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(hl, function (r, i, a) {
            return (
              (jt = {
                name: i,
                styles: a,
                next: jt,
              }),
              i
            );
          });
    }
    return Hd[t] !== 1 && !Ri(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var Kd =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    Gd = ['normal', 'none', 'initial', 'inherit', 'unset'],
    Xd = Go,
    Jd = /^-ms-/,
    Zd = /-(.)/g,
    Pa = {};
  Go = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (Gd.indexOf(o) === -1 &&
          !Kd.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = Xd(t, o);
    return (
      r !== '' &&
        !Ri(t) &&
        t.indexOf('-') !== -1 &&
        Pa[t] === void 0 &&
        ((Pa[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(Jd, 'ms-').replace(Zd, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var bl =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function yo(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(bl);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1)
        return (
          (jt = {
            name: o.name,
            styles: o.styles,
            next: jt,
          }),
          o.name
        );
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; )
            (jt = {
              name: r.name,
              styles: r.styles,
              next: jt,
            }),
              (r = r.next);
        var i = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (i += o.map), i;
      }
      return Qd(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = jt,
          s = o(e);
        return (jt = a), yo(e, t, s);
      } else
        process.env.NODE_ENV !== 'production' &&
          console.error(
            "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`",
          );
      break;
    }
    case 'string':
      if (process.env.NODE_ENV !== 'production') {
        var l = [],
          c = o.replace(hl, function (u, p, h) {
            var y = 'animation' + l.length;
            return (
              l.push(
                'const ' + y + ' = keyframes`' + h.replace(/^@keyframes animation-\w+/, '') + '`',
              ),
              '${' + y + '}'
            );
          });
        l.length &&
          console.error(
            '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
              [].concat(l, ['`' + c + '`']).join(`
`) +
              `

You should wrap it with \`css\` like this:

` +
              ('css`' + c + '`'),
          );
      }
      break;
  }
  if (t == null) return o;
  var d = t[o];
  return d !== void 0 ? d : o;
}
function Qd(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += yo(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : Na(s) && (r += Br(a) + ':' + Go(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(bl);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) Na(s[l]) && (r += Br(a) + ':' + Go(a, s[l]) + ';');
        else {
          var c = yo(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += Br(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(qd),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var Ia = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  vl;
process.env.NODE_ENV !== 'production' &&
  (vl = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var jt,
  zn = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    jt = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += yo(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error($a),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += yo(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error($a),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace(vl, function (h) {
        return (c = h), '';
      })),
      (Ia.lastIndex = 0);
    for (var d = '', u; (u = Ia.exec(a)) !== null; )
      d +=
        '-' + // $FlowFixMe we know it's not null
        u[1];
    var p = Wd(a) + d;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: a,
          map: c,
          next: jt,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : {
          name: p,
          styles: a,
          next: jt,
        };
  },
  ep = function (t) {
    return t();
  },
  gl = b['useInsertionEffect'] ? b['useInsertionEffect'] : !1,
  wi = gl || ep,
  _a = gl || b.useLayoutEffect,
  tp = {}.hasOwnProperty,
  ki = /* @__PURE__ */ b.createContext(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement < 'u'
      ? /* @__PURE__ */ Ld({
          key: 'css',
        })
      : null,
  );
process.env.NODE_ENV !== 'production' && (ki.displayName = 'EmotionCacheContext');
ki.Provider;
var fr = function (t) {
    return /* @__PURE__ */ eu(function (o, r) {
      var i = tu(ki);
      return t(o, i, r);
    });
  },
  Yn = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (Yn.displayName = 'EmotionThemeContext');
var Ma = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  Aa = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  np = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      dr(o, r, i),
      wi(function () {
        return pr(o, r, i);
      }),
      null
    );
  },
  op = /* @__PURE__ */ fr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[Ma],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = Si(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = zn(a, void 0, b.useContext(Yn));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[Aa];
      c && (l = zn([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var d = {};
    for (var u in e)
      tp.call(e, u) &&
        u !== 'css' &&
        u !== Ma &&
        (process.env.NODE_ENV === 'production' || u !== Aa) &&
        (d[u] = e[u]);
    return (
      (d.ref = o),
      (d.className = s),
      /* @__PURE__ */ b.createElement(
        b.Fragment,
        null,
        /* @__PURE__ */ b.createElement(np, {
          cache: t,
          serialized: l,
          isStringTag: typeof i == 'string',
        }),
        /* @__PURE__ */ b.createElement(i, d),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (op.displayName = 'EmotionCssPropInternal');
var rp = {
    name: '@emotion/react',
    version: '11.11.0',
    main: 'dist/emotion-react.cjs.js',
    module: 'dist/emotion-react.esm.js',
    browser: {
      './dist/emotion-react.esm.js': './dist/emotion-react.browser.esm.js',
    },
    exports: {
      '.': {
        module: {
          worker: './dist/emotion-react.worker.esm.js',
          browser: './dist/emotion-react.browser.esm.js',
          default: './dist/emotion-react.esm.js',
        },
        import: './dist/emotion-react.cjs.mjs',
        default: './dist/emotion-react.cjs.js',
      },
      './jsx-runtime': {
        module: {
          worker: './jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js',
          browser: './jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
          default: './jsx-runtime/dist/emotion-react-jsx-runtime.esm.js',
        },
        import: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs',
        default: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js',
      },
      './_isolated-hnrs': {
        module: {
          worker: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js',
          browser: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js',
          default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js',
        },
        import: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs',
        default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js',
      },
      './jsx-dev-runtime': {
        module: {
          worker: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js',
          browser: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js',
          default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js',
        },
        import: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs',
        default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js',
      },
      './package.json': './package.json',
      './types/css-prop': './types/css-prop.d.ts',
      './macro': {
        types: {
          import: './macro.d.mts',
          default: './macro.d.ts',
        },
        default: './macro.js',
      },
    },
    types: 'types/index.d.ts',
    files: [
      'src',
      'dist',
      'jsx-runtime',
      'jsx-dev-runtime',
      '_isolated-hnrs',
      'types/*.d.ts',
      'macro.*',
    ],
    sideEffects: !1,
    author: 'Emotion Contributors',
    license: 'MIT',
    scripts: {
      'test:typescript': 'dtslint types',
    },
    dependencies: {
      '@babel/runtime': '^7.18.3',
      '@emotion/babel-plugin': '^11.11.0',
      '@emotion/cache': '^11.11.0',
      '@emotion/serialize': '^1.1.2',
      '@emotion/use-insertion-effect-with-fallbacks': '^1.0.1',
      '@emotion/utils': '^1.2.1',
      '@emotion/weak-memoize': '^0.3.1',
      'hoist-non-react-statics': '^3.3.1',
    },
    peerDependencies: {
      react: '>=16.8.0',
    },
    peerDependenciesMeta: {
      '@types/react': {
        optional: !0,
      },
    },
    devDependencies: {
      '@definitelytyped/dtslint': '0.0.112',
      '@emotion/css': '11.11.0',
      '@emotion/css-prettifier': '1.1.3',
      '@emotion/server': '11.11.0',
      '@emotion/styled': '11.11.0',
      'html-tag-names': '^1.1.2',
      react: '16.14.0',
      'svg-tag-names': '^1.1.1',
      typescript: '^4.5.5',
    },
    repository: 'https://github.com/emotion-js/emotion/tree/main/packages/react',
    publishConfig: {
      access: 'public',
    },
    'umd:main': 'dist/emotion-react.umd.min.js',
    preconstruct: {
      entrypoints: [
        './index.js',
        './jsx-runtime.js',
        './jsx-dev-runtime.js',
        './_isolated-hnrs.js',
      ],
      umdName: 'emotionReact',
      exports: {
        envConditions: ['browser', 'worker'],
        extra: {
          './types/css-prop': './types/css-prop.d.ts',
          './macro': {
            types: {
              import: './macro.d.mts',
              default: './macro.d.ts',
            },
            default: './macro.js',
          },
        },
      },
    },
  },
  Da = !1,
  yl = /* @__PURE__ */ fr(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !Da && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (Da = !0));
    var o = e.styles,
      r = zn([o], void 0, b.useContext(Yn)),
      i = b.useRef();
    return (
      _a(
        function () {
          var a = t.key + '-global',
            s = new t.sheet.constructor({
              key: a,
              nonce: t.sheet.nonce,
              container: t.sheet.container,
              speedy: t.sheet.isSpeedy,
            }),
            l = !1,
            c = document.querySelector('style[data-emotion="' + a + ' ' + r.name + '"]');
          return (
            t.sheet.tags.length && (s.before = t.sheet.tags[0]),
            c !== null && ((l = !0), c.setAttribute('data-emotion', a), s.hydrate([c])),
            (i.current = [s, l]),
            function () {
              s.flush();
            }
          );
        },
        [t],
      ),
      _a(
        function () {
          var a = i.current,
            s = a[0],
            l = a[1];
          if (l) {
            a[1] = !1;
            return;
          }
          if ((r.next !== void 0 && pr(t, r.next, !0), s.tags.length)) {
            var c = s.tags[s.tags.length - 1].nextElementSibling;
            (s.before = c), s.flush();
          }
          t.insert('', r, s, !1);
        },
        [t, r.name],
      ),
      null
    );
  });
process.env.NODE_ENV !== 'production' && (yl.displayName = 'EmotionGlobal');
function ip() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return zn(t);
}
var $i = function () {
    var t = ip.apply(void 0, arguments),
      o = 'animation-' + t.name;
    return {
      name: o,
      styles: '@keyframes ' + o + '{' + t.styles + '}',
      anim: 1,
      toString: function () {
        return '_EMO_' + this.name + '_' + this.styles + '_EMO_';
      },
    };
  },
  ap = function e(t) {
    for (var o = t.length, r = 0, i = ''; r < o; r++) {
      var a = t[r];
      if (a != null) {
        var s = void 0;
        switch (typeof a) {
          case 'boolean':
            break;
          case 'object': {
            if (Array.isArray(a)) s = e(a);
            else {
              process.env.NODE_ENV !== 'production' &&
                a.styles !== void 0 &&
                a.name !== void 0 &&
                console.error(
                  'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.',
                ),
                (s = '');
              for (var l in a) a[l] && l && (s && (s += ' '), (s += l));
            }
            break;
          }
          default:
            s = a;
        }
        s && (i && (i += ' '), (i += s));
      }
    }
    return i;
  };
function sp(e, t, o) {
  var r = [],
    i = Si(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var lp = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      wi(function () {
        for (var i = 0; i < r.length; i++) pr(o, r[i], !1);
      }),
      null
    );
  },
  cp = /* @__PURE__ */ fr(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++) u[p] = arguments[p];
        var h = zn(u, t.registered);
        return r.push(h), dr(t, h, !1), t.key + '-' + h.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++) u[p] = arguments[p];
        return sp(t.registered, i, ap(u));
      },
      s = {
        css: i,
        cx: a,
        theme: b.useContext(Yn),
      },
      l = e.children(s);
    return (
      (o = !0),
      /* @__PURE__ */ b.createElement(
        b.Fragment,
        null,
        /* @__PURE__ */ b.createElement(lp, {
          cache: t,
          serializedArr: r,
        }),
        l,
      )
    );
  });
process.env.NODE_ENV !== 'production' && (cp.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var La = !0,
    up = typeof jest < 'u' || typeof vi < 'u';
  if (La && !up) {
    var ja =
        // $FlowIgnore
        typeof globalThis < 'u' ? globalThis : La ? window : global,
      Fa = '__EMOTION_REACT_' + rp.version.split('.')[0] + '__';
    ja[Fa] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (ja[Fa] = !0);
  }
}
var dp = od,
  pp = function (t) {
    return t !== 'theme';
  },
  za = function (t) {
    return typeof t == 'string' && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      t.charCodeAt(0) > 96
      ? dp
      : pp;
  },
  Va = function (t, o, r) {
    var i;
    if (o) {
      var a = o.shouldForwardProp;
      i =
        t.__emotion_forwardProp && a
          ? function (s) {
              return t.__emotion_forwardProp(s) && a(s);
            }
          : a;
    }
    return typeof i != 'function' && r && (i = t.__emotion_forwardProp), i;
  },
  Ba = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  fp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      dr(o, r, i),
      wi(function () {
        return pr(o, r, i);
      }),
      null
    );
  },
  mp = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      i = (r && t.__emotion_base) || t,
      a,
      s;
    o !== void 0 && ((a = o.label), (s = o.target));
    var l = Va(t, o, r),
      c = l || za(i),
      d = !c('as');
    return function () {
      var u = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && p.push('label:' + a + ';'), u[0] == null || u[0].raw === void 0))
        p.push.apply(p, u);
      else {
        process.env.NODE_ENV !== 'production' && u[0][0] === void 0 && console.error(Ba),
          p.push(u[0][0]);
        for (var h = u.length, y = 1; y < h; y++)
          process.env.NODE_ENV !== 'production' && u[0][y] === void 0 && console.error(Ba),
            p.push(u[y], u[0][y]);
      }
      var g = fr(function (m, v, T) {
        var C = (d && m.as) || i,
          O = '',
          E = [],
          f = m;
        if (m.theme == null) {
          f = {};
          for (var R in m) f[R] = m[R];
          f.theme = b.useContext(Yn);
        }
        typeof m.className == 'string'
          ? (O = Si(v.registered, E, m.className))
          : m.className != null && (O = m.className + ' ');
        var S = zn(p.concat(E), v.registered, f);
        (O += v.key + '-' + S.name), s !== void 0 && (O += ' ' + s);
        var D = d && l === void 0 ? za(C) : c,
          B = {};
        for (var N in m)
          (d && N === 'as') || // $FlowFixMe
            (D(N) && (B[N] = m[N]));
        return (
          (B.className = O),
          (B.ref = T),
          /* @__PURE__ */ b.createElement(
            b.Fragment,
            null,
            /* @__PURE__ */ b.createElement(fp, {
              cache: v,
              serialized: S,
              isStringTag: typeof C == 'string',
            }),
            /* @__PURE__ */ b.createElement(C, B),
          )
        );
      });
      return (
        (g.displayName =
          a !== void 0
            ? a
            : 'Styled(' +
              (typeof i == 'string' ? i : i.displayName || i.name || 'Component') +
              ')'),
        (g.defaultProps = t.defaultProps),
        (g.__emotion_real = g),
        (g.__emotion_base = i),
        (g.__emotion_styles = p),
        (g.__emotion_forwardProp = l),
        Object.defineProperty(g, 'toString', {
          value: function () {
            return s === void 0 && process.env.NODE_ENV !== 'production'
              ? 'NO_COMPONENT_SELECTOR'
              : '.' + s;
          },
        }),
        (g.withComponent = function (m, v) {
          return e(
            m,
            Yo({}, o, v, {
              shouldForwardProp: Va(g, v, !0),
            }),
          ).apply(void 0, p);
        }),
        g
      );
    };
  },
  hp = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'big',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
    // SVG
    'circle',
    'clipPath',
    'defs',
    'ellipse',
    'foreignObject',
    'g',
    'image',
    'line',
    'linearGradient',
    'mask',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'stop',
    'svg',
    'text',
    'tspan',
  ],
  ri = mp.bind();
hp.forEach(function (e) {
  ri[e] = ri(e);
});
function bp(e) {
  return e == null || Object.keys(e).length === 0;
}
function El(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return /* @__PURE__ */ M(yl, {
    styles: typeof t == 'function' ? (i) => t(bp(i) ? o : i) : t,
  });
}
process.env.NODE_ENV !== 'production' &&
  (El.propTypes = {
    defaultTheme: n.object,
    styles: n.oneOfType([n.array, n.string, n.object, n.func]),
  });
/**
 * @mui/styled-engine v5.12.3
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function vp(e, t) {
  const o = ri(e, t);
  return process.env.NODE_ENV !== 'production'
    ? (...r) => {
        const i = typeof e == 'string' ? `"${e}"` : 'component';
        return (
          r.length === 0
            ? console.error(
                [
                  `MUI: Seems like you called \`styled(${i})()\` without a \`style\` argument.`,
                  'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
                ].join(`
`),
              )
            : r.some((a) => a === void 0) &&
              console.error(
                `MUI: the styled(${i})(...args) API requires all its args to be defined.`,
              ),
          o(...r)
        );
      }
    : o;
}
const gp = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  yp = (e) => {
    const t =
      Object.keys(e).map((o) => ({
        key: o,
        val: e[o],
      })) || [];
    return (
      t.sort((o, r) => o.val - r.val),
      t.reduce(
        (o, r) => ({
          ...o,
          [r.key]: r.val,
        }),
        {},
      )
    );
  };
function Ep(e) {
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
        xl: 1536,
        // large screen
      },
      unit: o = 'px',
      step: r = 5,
      ...i
    } = e,
    a = yp(t),
    s = Object.keys(a);
  function l(h) {
    return `@media (min-width:${typeof t[h] == 'number' ? t[h] : h}${o})`;
  }
  function c(h) {
    return `@media (max-width:${(typeof t[h] == 'number' ? t[h] : h) - r / 100}${o})`;
  }
  function d(h, y) {
    const g = s.indexOf(y);
    return `@media (min-width:${typeof t[h] == 'number' ? t[h] : h}${o}) and (max-width:${
      (g !== -1 && typeof t[s[g]] == 'number' ? t[s[g]] : y) - r / 100
    }${o})`;
  }
  function u(h) {
    return s.indexOf(h) + 1 < s.length ? d(h, s[s.indexOf(h) + 1]) : l(h);
  }
  function p(h) {
    const y = s.indexOf(h);
    return y === 0
      ? l(s[1])
      : y === s.length - 1
      ? c(s[y])
      : d(h, s[s.indexOf(h) + 1]).replace('@media', '@media not all and');
  }
  return {
    keys: s,
    values: a,
    up: l,
    down: c,
    between: d,
    only: u,
    not: p,
    unit: o,
    ...i,
  };
}
const xp = {
    borderRadius: 4,
  },
  Op = xp,
  Tp =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  fn = Tp;
function lo(e, t) {
  return t
    ? _t(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const Ni = {
    xs: 0,
    // phone
    sm: 600,
    // tablet
    md: 900,
    // small laptop
    lg: 1200,
    // desktop
    xl: 1536,
    // large screen
  },
  Ua = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${Ni[e]}px)`,
  };
function sn(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || Ua;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || Ua;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || Ni).indexOf(l) !== -1) {
        const c = a.up(l);
        s[c] = o(t[l], l);
      } else {
        const c = l;
        s[c] = t[c];
      }
      return s;
    }, {});
  }
  return o(t);
}
function Cp(e = {}) {
  var t;
  return (
    ((t = e.keys) == null
      ? void 0
      : t.reduce((r, i) => {
          const a = e.up(i);
          return (r[a] = {}), r;
        }, {})) || {}
  );
}
function Sp(e, t) {
  return e.reduce((o, r) => {
    const i = o[r];
    return (!i || Object.keys(i).length === 0) && delete o[r], o;
  }, t);
}
function mr(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((i, a) => (i && i[a] ? i[a] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, i) => (r && r[i] != null ? r[i] : null), e);
}
function Xo(e, t, o, r = o) {
  let i;
  return (
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = mr(e, o) || r),
    t && (i = t(i, r, e)),
    i
  );
}
function qe(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: i } = e,
    a = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        d = mr(c, r) || {};
      return sn(s, l, (p) => {
        let h = Xo(d, i, p);
        return (
          p === h &&
            typeof p == 'string' &&
            (h = Xo(d, i, `${t}${p === 'default' ? '' : oe(p)}`, p)),
          o === !1
            ? h
            : {
                [o]: h,
              }
        );
      });
    };
  return (
    (a.propTypes =
      process.env.NODE_ENV !== 'production'
        ? {
            [t]: fn,
          }
        : {}),
    (a.filterProps = [t]),
    a
  );
}
function Rp(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const wp = {
    m: 'margin',
    p: 'padding',
  },
  kp = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  Wa = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  $p = Rp((e) => {
    if (e.length > 2)
      if (Wa[e]) e = Wa[e];
      else return [e];
    const [t, o] = e.split(''),
      r = wp[t],
      i = kp[o] || '';
    return Array.isArray(i) ? i.map((a) => r + a) : [r + i];
  }),
  hr = [
    'm',
    'mt',
    'mr',
    'mb',
    'ml',
    'mx',
    'my',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginX',
    'marginY',
    'marginInline',
    'marginInlineStart',
    'marginInlineEnd',
    'marginBlock',
    'marginBlockStart',
    'marginBlockEnd',
  ],
  br = [
    'p',
    'pt',
    'pr',
    'pb',
    'pl',
    'px',
    'py',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingX',
    'paddingY',
    'paddingInline',
    'paddingInlineStart',
    'paddingInlineEnd',
    'paddingBlock',
    'paddingBlockStart',
    'paddingBlockEnd',
  ],
  Np = [...hr, ...br];
function Co(e, t, o, r) {
  var i;
  const a = (i = mr(e, t, !1)) != null ? i : o;
  return typeof a == 'number'
    ? (s) =>
        typeof s == 'string'
          ? s
          : (process.env.NODE_ENV !== 'production' &&
              typeof s != 'number' &&
              console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),
            a * s)
    : Array.isArray(a)
    ? (s) =>
        typeof s == 'string'
          ? s
          : (process.env.NODE_ENV !== 'production' &&
              (Number.isInteger(s)
                ? s > a.length - 1 &&
                  console.error(
                    [
                      `MUI: The value provided (${s}) overflows.`,
                      `The supported values are: ${JSON.stringify(a)}.`,
                      `${s} > ${a.length - 1}, you need to add the missing values.`,
                    ].join(`
`),
                  )
                : console.error(
                    [
                      `MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`,
                    ].join(`
`),
                  )),
            a[s])
    : typeof a == 'function'
    ? a
    : (process.env.NODE_ENV !== 'production' &&
        console.error(
          [
            `MUI: The \`theme.${t}\` value (${a}) is invalid.`,
            'It should be a number, an array or a function.',
          ].join(`
`),
        ),
      () => {});
}
function xl(e) {
  return Co(e, 'spacing', 8, 'spacing');
}
function So(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Pp(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = So(t, o)), r), {});
}
function Ip(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = $p(o),
    a = Pp(i, r),
    s = e[o];
  return sn(e, s, a);
}
function Ol(e, t) {
  const o = xl(e.theme);
  return Object.keys(e)
    .map((r) => Ip(e, t, r, o))
    .reduce(lo, {});
}
function tt(e) {
  return Ol(e, hr);
}
tt.propTypes =
  process.env.NODE_ENV !== 'production' ? hr.reduce((e, t) => ((e[t] = fn), e), {}) : {};
tt.filterProps = hr;
function nt(e) {
  return Ol(e, br);
}
nt.propTypes =
  process.env.NODE_ENV !== 'production' ? br.reduce((e, t) => ((e[t] = fn), e), {}) : {};
nt.filterProps = br;
process.env.NODE_ENV !== 'production' && Np.reduce((e, t) => ((e[t] = fn), e), {});
function _p(e = 8) {
  if (e.mui) return e;
  const t = xl({
      spacing: e,
    }),
    o = (...r) => (
      process.env.NODE_ENV !== 'production' &&
        (r.length <= 4 ||
          console.error(
            `MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`,
          )),
      (r.length === 0 ? [1] : r)
        .map((a) => {
          const s = t(a);
          return typeof s == 'number' ? `${s}px` : s;
        })
        .join(' ')
    );
  return (o.mui = !0), o;
}
function vr(...e) {
  const t = e.reduce(
      (r, i) => (
        i.filterProps.forEach((a) => {
          r[a] = i;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((i, a) => (t[a] ? lo(i, t[a](r)) : i), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, i) => Object.assign(r, i.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, i) => r.concat(i.filterProps), [])),
    o
  );
}
function Jt(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Mp = qe({
    prop: 'border',
    themeKey: 'borders',
    transform: Jt,
  }),
  Ap = qe({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: Jt,
  }),
  Dp = qe({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: Jt,
  }),
  Lp = qe({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: Jt,
  }),
  jp = qe({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: Jt,
  }),
  Fp = qe({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  zp = qe({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  Vp = qe({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  Bp = qe({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  Up = qe({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  gr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Co(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({
          borderRadius: So(t, r),
        });
      return sn(e, e.borderRadius, o);
    }
    return null;
  };
gr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: fn,
      }
    : {};
gr.filterProps = ['borderRadius'];
vr(Mp, Ap, Dp, Lp, jp, Fp, zp, Vp, Bp, Up, gr);
const yr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Co(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({
        gap: So(t, r),
      });
    return sn(e, e.gap, o);
  }
  return null;
};
yr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: fn,
      }
    : {};
yr.filterProps = ['gap'];
const Er = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Co(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({
        columnGap: So(t, r),
      });
    return sn(e, e.columnGap, o);
  }
  return null;
};
Er.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: fn,
      }
    : {};
Er.filterProps = ['columnGap'];
const xr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Co(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({
        rowGap: So(t, r),
      });
    return sn(e, e.rowGap, o);
  }
  return null;
};
xr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: fn,
      }
    : {};
xr.filterProps = ['rowGap'];
const Wp = qe({
    prop: 'gridColumn',
  }),
  Hp = qe({
    prop: 'gridRow',
  }),
  qp = qe({
    prop: 'gridAutoFlow',
  }),
  Yp = qe({
    prop: 'gridAutoColumns',
  }),
  Kp = qe({
    prop: 'gridAutoRows',
  }),
  Gp = qe({
    prop: 'gridTemplateColumns',
  }),
  Xp = qe({
    prop: 'gridTemplateRows',
  }),
  Jp = qe({
    prop: 'gridTemplateAreas',
  }),
  Zp = qe({
    prop: 'gridArea',
  });
vr(yr, Er, xr, Wp, Hp, qp, Yp, Kp, Gp, Xp, Jp, Zp);
function jn(e, t) {
  return t === 'grey' ? t : e;
}
const Qp = qe({
    prop: 'color',
    themeKey: 'palette',
    transform: jn,
  }),
  ef = qe({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: jn,
  }),
  tf = qe({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: jn,
  });
vr(Qp, ef, tf);
function wt(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const nf = qe({
    prop: 'width',
    transform: wt,
  }),
  Pi = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            Ni[o] ||
            wt(o),
        };
      };
      return sn(e, e.maxWidth, t);
    }
    return null;
  };
Pi.filterProps = ['maxWidth'];
const of = qe({
    prop: 'minWidth',
    transform: wt,
  }),
  rf = qe({
    prop: 'height',
    transform: wt,
  }),
  af = qe({
    prop: 'maxHeight',
    transform: wt,
  }),
  sf = qe({
    prop: 'minHeight',
    transform: wt,
  });
qe({
  prop: 'size',
  cssProperty: 'width',
  transform: wt,
});
qe({
  prop: 'size',
  cssProperty: 'height',
  transform: wt,
});
const lf = qe({
  prop: 'boxSizing',
});
vr(nf, Pi, of, rf, af, sf, lf);
const cf = {
    // borders
    border: {
      themeKey: 'borders',
      transform: Jt,
    },
    borderTop: {
      themeKey: 'borders',
      transform: Jt,
    },
    borderRight: {
      themeKey: 'borders',
      transform: Jt,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: Jt,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: Jt,
    },
    borderColor: {
      themeKey: 'palette',
    },
    borderTopColor: {
      themeKey: 'palette',
    },
    borderRightColor: {
      themeKey: 'palette',
    },
    borderBottomColor: {
      themeKey: 'palette',
    },
    borderLeftColor: {
      themeKey: 'palette',
    },
    borderRadius: {
      themeKey: 'shape.borderRadius',
      style: gr,
    },
    // palette
    color: {
      themeKey: 'palette',
      transform: jn,
    },
    bgcolor: {
      themeKey: 'palette',
      cssProperty: 'backgroundColor',
      transform: jn,
    },
    backgroundColor: {
      themeKey: 'palette',
      transform: jn,
    },
    // spacing
    p: {
      style: nt,
    },
    pt: {
      style: nt,
    },
    pr: {
      style: nt,
    },
    pb: {
      style: nt,
    },
    pl: {
      style: nt,
    },
    px: {
      style: nt,
    },
    py: {
      style: nt,
    },
    padding: {
      style: nt,
    },
    paddingTop: {
      style: nt,
    },
    paddingRight: {
      style: nt,
    },
    paddingBottom: {
      style: nt,
    },
    paddingLeft: {
      style: nt,
    },
    paddingX: {
      style: nt,
    },
    paddingY: {
      style: nt,
    },
    paddingInline: {
      style: nt,
    },
    paddingInlineStart: {
      style: nt,
    },
    paddingInlineEnd: {
      style: nt,
    },
    paddingBlock: {
      style: nt,
    },
    paddingBlockStart: {
      style: nt,
    },
    paddingBlockEnd: {
      style: nt,
    },
    m: {
      style: tt,
    },
    mt: {
      style: tt,
    },
    mr: {
      style: tt,
    },
    mb: {
      style: tt,
    },
    ml: {
      style: tt,
    },
    mx: {
      style: tt,
    },
    my: {
      style: tt,
    },
    margin: {
      style: tt,
    },
    marginTop: {
      style: tt,
    },
    marginRight: {
      style: tt,
    },
    marginBottom: {
      style: tt,
    },
    marginLeft: {
      style: tt,
    },
    marginX: {
      style: tt,
    },
    marginY: {
      style: tt,
    },
    marginInline: {
      style: tt,
    },
    marginInlineStart: {
      style: tt,
    },
    marginInlineEnd: {
      style: tt,
    },
    marginBlock: {
      style: tt,
    },
    marginBlockStart: {
      style: tt,
    },
    marginBlockEnd: {
      style: tt,
    },
    // display
    displayPrint: {
      cssProperty: !1,
      transform: (e) => ({
        '@media print': {
          display: e,
        },
      }),
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
      style: yr,
    },
    rowGap: {
      style: xr,
    },
    columnGap: {
      style: Er,
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
      themeKey: 'zIndex',
    },
    top: {},
    right: {},
    bottom: {},
    left: {},
    // shadows
    boxShadow: {
      themeKey: 'shadows',
    },
    // sizing
    width: {
      transform: wt,
    },
    maxWidth: {
      style: Pi,
    },
    minWidth: {
      transform: wt,
    },
    height: {
      transform: wt,
    },
    maxHeight: {
      transform: wt,
    },
    minHeight: {
      transform: wt,
    },
    boxSizing: {},
    // typography
    fontFamily: {
      themeKey: 'typography',
    },
    fontSize: {
      themeKey: 'typography',
    },
    fontStyle: {
      themeKey: 'typography',
    },
    fontWeight: {
      themeKey: 'typography',
    },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: {
      cssProperty: !1,
      themeKey: 'typography',
    },
  },
  Ii = cf;
function uf(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function df(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function pf() {
  function e(o, r, i, a) {
    const s = {
        [o]: r,
        theme: i,
      },
      l = a[o];
    if (!l)
      return {
        [o]: r,
      };
    const { cssProperty: c = o, themeKey: d, transform: u, style: p } = l;
    if (r == null) return null;
    if (d === 'typography' && r === 'inherit')
      return {
        [o]: r,
      };
    const h = mr(i, d) || {};
    return p
      ? p(s)
      : sn(s, r, (g) => {
          let m = Xo(h, u, g);
          return (
            g === m &&
              typeof g == 'string' &&
              (m = Xo(h, u, `${o}${g === 'default' ? '' : oe(g)}`, g)),
            c === !1
              ? m
              : {
                  [c]: m,
                }
          );
        });
  }
  function t(o) {
    var r;
    const { sx: i, theme: a = {} } = o || {};
    if (!i) return null;
    const s = (r = a.unstable_sxConfig) != null ? r : Ii;
    function l(c) {
      let d = c;
      if (typeof c == 'function') d = c(a);
      else if (typeof c != 'object') return c;
      if (!d) return null;
      const u = Cp(a.breakpoints),
        p = Object.keys(u);
      let h = u;
      return (
        Object.keys(d).forEach((y) => {
          const g = df(d[y], a);
          if (g != null)
            if (typeof g == 'object')
              if (s[y]) h = lo(h, e(y, g, a, s));
              else {
                const m = sn(
                  {
                    theme: a,
                  },
                  g,
                  (v) => ({
                    [y]: v,
                  }),
                );
                uf(m, g)
                  ? (h[y] = t({
                      sx: g,
                      theme: a,
                    }))
                  : (h = lo(h, m));
              }
            else h = lo(h, e(y, g, a, s));
        }),
        Sp(p, h)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const Tl = pf();
Tl.filterProps = ['sx'];
const _i = Tl;
function Mi(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {}, ...s } = e,
    l = Ep(o),
    c = _p(i);
  let d = _t(
    {
      breakpoints: l,
      direction: 'ltr',
      components: {},
      // Inject component definitions.
      palette: {
        mode: 'light',
        ...r,
      },
      spacing: c,
      shape: {
        ...Op,
        ...a,
      },
    },
    s,
  );
  return (
    (d = t.reduce((u, p) => _t(u, p), d)),
    (d.unstable_sxConfig = {
      ...Ii,
      ...(s == null ? void 0 : s.unstable_sxConfig),
    }),
    (d.unstable_sx = function (p) {
      return _i({
        sx: p,
        theme: this,
      });
    }),
    d
  );
}
function ff(e) {
  return Object.keys(e).length === 0;
}
function Cl(e = null) {
  const t = b.useContext(Yn);
  return !t || ff(t) ? e : t;
}
const mf = Mi();
function Ai(e = mf) {
  return Cl(e);
}
function Sl({ styles: e, themeId: t, defaultTheme: o = {} }) {
  const r = Ai(o),
    i = typeof e == 'function' ? e((t && r[t]) || r) : e;
  return /* @__PURE__ */ M(El, {
    styles: i,
  });
}
process.env.NODE_ENV !== 'production' &&
  (Sl.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    defaultTheme: n.object,
    /**
     * @ignore
     */
    styles: n.oneOfType([n.array, n.func, n.number, n.object, n.string, n.bool]),
    /**
     * @ignore
     */
    themeId: n.string,
  });
function Rl(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = Rl(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function Ee() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = Rl(e)) && (r && (r += ' '), (r += t));
  return r;
}
function Ha(e) {
  return e.length === 0;
}
function wl(e) {
  const { variant: t, ...o } = e;
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += Ha(r) ? e[i] : oe(e[i]))
          : (r += `${Ha(r) ? i : oe(i)}${oe(e[i].toString())}`);
      }),
    r
  );
}
function hf(e) {
  return Object.keys(e).length === 0;
}
function bf(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const vf = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  gf = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = wl(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  yf = (e, t, o, r) => {
    var i, a;
    const { ownerState: s = {} } = e,
      l = [],
      c = o == null || (i = o.components) == null || (a = i[r]) == null ? void 0 : a.variants;
    return (
      c &&
        c.forEach((d) => {
          let u = !0;
          Object.keys(d.props).forEach((p) => {
            s[p] !== d.props[p] && e[p] !== d.props[p] && (u = !1);
          }),
            u && l.push(t[wl(d.props)]);
        }),
      l
    );
  };
function co(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Ef = Mi(),
  xf = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function no({ defaultTheme: e, theme: t, themeId: o }) {
  return hf(t) ? e : t[o] || t;
}
function Of(e = {}) {
  const {
      themeId: t,
      defaultTheme: o = Ef,
      rootShouldForwardProp: r = co,
      slotShouldForwardProp: i = co,
    } = e,
    a = (s) =>
      _i({
        ...s,
        theme: no({
          ...s,
          defaultTheme: o,
          themeId: t,
        }),
      });
  return (
    (a.__mui_systemSx = !0),
    (s, l = {}) => {
      gp(s, (E) => E.filter((f) => !(f != null && f.__mui_systemSx)));
      const {
          name: c,
          slot: d,
          skipVariantsResolver: u,
          skipSx: p,
          overridesResolver: h,
          ...y
        } = l,
        g = u !== void 0 ? u : (d && d !== 'Root') || !1,
        m = p || !1;
      let v;
      process.env.NODE_ENV !== 'production' && c && (v = `${c}-${xf(d || 'Root')}`);
      let T = co;
      d === 'Root' ? (T = r) : d ? (T = i) : bf(s) && (T = void 0);
      const C = vp(s, {
          shouldForwardProp: T,
          label: v,
          ...y,
        }),
        O = (E, ...f) => {
          const R = f
            ? f.map((N) =>
                typeof N == 'function' && N.__emotion_real !== N
                  ? (I) =>
                      N({
                        ...I,
                        theme: no({
                          ...I,
                          defaultTheme: o,
                          themeId: t,
                        }),
                      })
                  : N,
              )
            : [];
          let S = E;
          c &&
            h &&
            R.push((N) => {
              const I = no({
                  ...N,
                  defaultTheme: o,
                  themeId: t,
                }),
                J = vf(c, I);
              if (J) {
                const j = {};
                return (
                  Object.entries(J).forEach(([_, A]) => {
                    j[_] =
                      typeof A == 'function'
                        ? A({
                            ...N,
                            theme: I,
                          })
                        : A;
                  }),
                  h(N, j)
                );
              }
              return null;
            }),
            c &&
              !g &&
              R.push((N) => {
                const I = no({
                  ...N,
                  defaultTheme: o,
                  themeId: t,
                });
                return yf(N, gf(c, I), I, c);
              }),
            m || R.push(a);
          const D = R.length - f.length;
          if (Array.isArray(E) && D > 0) {
            const N = new Array(D).fill('');
            (S = [...E, ...N]), (S.raw = [...E.raw, ...N]);
          } else
            typeof E == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              E.__emotion_real !== E &&
              (S = (N) =>
                E({
                  ...N,
                  theme: no({
                    ...N,
                    defaultTheme: o,
                    themeId: t,
                  }),
                }));
          const B = C(S, ...R);
          if (process.env.NODE_ENV !== 'production') {
            let N;
            c && (N = `${c}${d || ''}`),
              N === void 0 && (N = `Styled(${Mu(s)})`),
              (B.displayName = N);
          }
          return s.muiName && (B.muiName = s.muiName), B;
        };
      return C.withConfig && (O.withConfig = C.withConfig), O;
    }
  );
}
function Tf(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : Ei(t.components[o].defaultProps, r);
}
function Cf({ props: e, name: t, defaultTheme: o, themeId: r }) {
  let i = Ai(o);
  return (
    r && (i = i[r] || i),
    Tf({
      theme: i,
      name: t,
      props: e,
    })
  );
}
function Di(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function Sf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, 'g');
  let o = e.match(t);
  return (
    o && o[0].length === 1 && (o = o.map((r) => r + r)),
    o
      ? `rgb${o.length === 4 ? 'a' : ''}(${o
          .map((r, i) =>
            i < 3 ? parseInt(r, 16) : Math.round((parseInt(r, 16) / 255) * 1e3) / 1e3,
          )
          .join(', ')})`
      : ''
  );
}
function Cn(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Cn(Sf(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : pn(9, e),
    );
  let r = e.substring(t + 1, e.length - 1),
    i;
  if (o === 'color') {
    if (
      ((r = r.split(' ')),
      (i = r.shift()),
      r.length === 4 && r[3].charAt(0) === '/' && (r[3] = r[3].slice(1)),
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(i) === -1)
    )
      throw new Error(
        process.env.NODE_ENV !== 'production'
          ? `MUI: unsupported \`${i}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
          : pn(10, i),
      );
  } else r = r.split(',');
  return (
    (r = r.map((a) => parseFloat(a))),
    {
      type: o,
      values: r,
      colorSpace: i,
    }
  );
}
function Or(e) {
  const { type: t, colorSpace: o } = e;
  let { values: r } = e;
  return (
    t.indexOf('rgb') !== -1
      ? (r = r.map((i, a) => (a < 3 ? parseInt(i, 10) : i)))
      : t.indexOf('hsl') !== -1 && ((r[1] = `${r[1]}%`), (r[2] = `${r[2]}%`)),
    t.indexOf('color') !== -1 ? (r = `${o} ${r.join(' ')}`) : (r = `${r.join(', ')}`),
    `${t}(${r})`
  );
}
function Rf(e) {
  e = Cn(e);
  const { values: t } = e,
    o = t[0],
    r = t[1] / 100,
    i = t[2] / 100,
    a = r * Math.min(i, 1 - i),
    s = (d, u = (d + o / 30) % 12) => i - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return (
    e.type === 'hsla' && ((l += 'a'), c.push(t[3])),
    Or({
      type: l,
      values: c,
    })
  );
}
function ii(e) {
  e = Cn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? Cn(Rf(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function qa(e, t) {
  const o = ii(e),
    r = ii(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Je(e, t) {
  return (
    (e = Cn(e)),
    (t = Di(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Or(e)
  );
}
function Tr(e, t) {
  if (((e = Cn(e)), (t = Di(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Or(e);
}
function Cr(e, t) {
  if (((e = Cn(e)), (t = Di(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Or(e);
}
function wf(e, t = 0.15) {
  return ii(e) > 0.5 ? Tr(e, t) : Cr(e, t);
}
function kf(e, t) {
  return {
    toolbar: {
      minHeight: 56,
      [e.up('xs')]: {
        '@media (orientation: landscape)': {
          minHeight: 48,
        },
      },
      [e.up('sm')]: {
        minHeight: 64,
      },
    },
    ...t,
  };
}
const Ya = {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: 'rgba(0, 0, 0, 0.87)',
      // Secondary text.
      secondary: 'rgba(0, 0, 0, 0.6)',
      // Disabled text have even lower visual prominence.
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    // The color used to divide different elements.
    divider: 'rgba(0, 0, 0, 0.12)',
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: ho.white,
      default: ho.white,
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: 'rgba(0, 0, 0, 0.54)',
      // The color of an hovered action.
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: 'rgba(0, 0, 0, 0.26)',
      // The background color of a disabled action.
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  Ur = {
    text: {
      primary: ho.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: '#121212',
      default: '#121212',
    },
    action: {
      active: ho.white,
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  };
function Ka(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = Cr(e.main, i))
      : t === 'dark' && (e.dark = Tr(e.main, a)));
}
function $f(e = 'light') {
  return e === 'dark'
    ? {
        main: $n[200],
        light: $n[50],
        dark: $n[400],
      }
    : {
        main: $n[700],
        light: $n[400],
        dark: $n[800],
      };
}
function Nf(e = 'light') {
  return e === 'dark'
    ? {
        main: kn[200],
        light: kn[50],
        dark: kn[400],
      }
    : {
        main: kn[500],
        light: kn[300],
        dark: kn[700],
      };
}
function Pf(e = 'light') {
  return e === 'dark'
    ? {
        main: wn[500],
        light: wn[300],
        dark: wn[700],
      }
    : {
        main: wn[700],
        light: wn[400],
        dark: wn[800],
      };
}
function If(e = 'light') {
  return e === 'dark'
    ? {
        main: Nn[400],
        light: Nn[300],
        dark: Nn[700],
      }
    : {
        main: Nn[700],
        light: Nn[500],
        dark: Nn[900],
      };
}
function _f(e = 'light') {
  return e === 'dark'
    ? {
        main: Pn[400],
        light: Pn[300],
        dark: Pn[700],
      }
    : {
        main: Pn[800],
        light: Pn[500],
        dark: Pn[900],
      };
}
function Mf(e = 'light') {
  return e === 'dark'
    ? {
        main: eo[400],
        light: eo[300],
        dark: eo[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: eo[500],
        dark: eo[900],
      };
}
function Af(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2, ...i } = e,
    a = e.primary || $f(t),
    s = e.secondary || Nf(t),
    l = e.error || Pf(t),
    c = e.info || If(t),
    d = e.success || _f(t),
    u = e.warning || Mf(t);
  function p(m) {
    const v = qa(m, Ur.text.primary) >= o ? Ur.text.primary : Ya.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const T = qa(m, v);
      T < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${T}:1 for ${v} on ${m}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return v;
  }
  const h = ({
      color: m,
      name: v,
      mainShade: T = 500,
      lightShade: C = 300,
      darkShade: O = 700,
    }) => {
      if (
        ((m = {
          ...m,
        }),
        !m.main && m[T] && (m.main = m[T]),
        !m.hasOwnProperty('main'))
      )
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${v ? ` (${v})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`
            : pn(11, v ? ` (${v})` : '', T),
        );
      if (typeof m.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${v ? ` (${v})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : pn(12, v ? ` (${v})` : '', JSON.stringify(m.main)),
        );
      return (
        Ka(m, 'light', C, r), Ka(m, 'dark', O, r), m.contrastText || (m.contrastText = p(m.main)), m
      );
    },
    y = {
      dark: Ur,
      light: Ya,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (y[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    _t(
      {
        // A collection of common colors.
        common: {
          ...ho,
        },
        // prevent mutable object.
        // The palette mode, can be light or dark.
        mode: t,
        // The colors used to represent primary interface elements for a user.
        primary: h({
          color: a,
          name: 'primary',
        }),
        // The colors used to represent secondary interface elements for a user.
        secondary: h({
          color: s,
          name: 'secondary',
          mainShade: 'A400',
          lightShade: 'A200',
          darkShade: 'A700',
        }),
        // The colors used to represent interface elements that the user should be made aware of.
        error: h({
          color: l,
          name: 'error',
        }),
        // The colors used to represent potentially dangerous actions or important messages.
        warning: h({
          color: u,
          name: 'warning',
        }),
        // The colors used to present information to the user that is neutral and not necessarily important.
        info: h({
          color: c,
          name: 'info',
        }),
        // The colors used to indicate the successful completion of an action that user triggered.
        success: h({
          color: d,
          name: 'success',
        }),
        // The grey colors.
        grey: bu,
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: o,
        // Takes a background color and returns the text color that maximizes the contrast.
        getContrastText: p,
        // Generate a rich color object.
        augmentColor: h,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: r,
        // The light and dark mode object.
        ...y[t],
      },
      i,
    )
  );
}
function Df(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ga = {
    textTransform: 'uppercase',
  },
  Xa = '"Roboto", "Helvetica", "Arial", sans-serif';
function Lf(e, t) {
  const {
    fontFamily: o = Xa,
    // The default font size of the Material Specification.
    fontSize: r = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: a = 400,
    fontWeightMedium: s = 500,
    fontWeightBold: l = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: c = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: u,
    ...p
  } = typeof t == 'function' ? t(e) : t;
  process.env.NODE_ENV !== 'production' &&
    (typeof r != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof c != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const h = r / 14,
    y = u || ((v) => `${(v / c) * h}rem`),
    g = (v, T, C, O, E) => ({
      fontFamily: o,
      fontWeight: v,
      fontSize: y(T),
      // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
      lineHeight: C,
      // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
      // across font-families can cause issues with the kerning.
      ...(o === Xa
        ? {
            letterSpacing: `${Df(O / T)}em`,
          }
        : {}),
      ...E,
      ...d,
    }),
    m = {
      h1: g(i, 96, 1.167, -1.5),
      h2: g(i, 60, 1.2, -0.5),
      h3: g(a, 48, 1.167, 0),
      h4: g(a, 34, 1.235, 0.25),
      h5: g(a, 24, 1.334, 0),
      h6: g(s, 20, 1.6, 0.15),
      subtitle1: g(a, 16, 1.75, 0.15),
      subtitle2: g(s, 14, 1.57, 0.1),
      body1: g(a, 16, 1.5, 0.15),
      body2: g(a, 14, 1.43, 0.15),
      button: g(s, 14, 1.75, 0.4, Ga),
      caption: g(a, 12, 1.66, 0.4),
      overline: g(a, 12, 2.66, 1, Ga),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return _t(
    {
      htmlFontSize: c,
      pxToRem: y,
      fontFamily: o,
      fontSize: r,
      fontWeightLight: i,
      fontWeightRegular: a,
      fontWeightMedium: s,
      fontWeightBold: l,
      ...m,
    },
    p,
    {
      clone: !1,
      // No need to clone deep
    },
  );
}
const jf = 0.2,
  Ff = 0.14,
  zf = 0.12;
function et(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${jf})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ff})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${zf})`,
  ].join(',');
}
const Vf = [
    'none',
    et(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    et(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    et(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    et(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    et(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    et(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    et(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    et(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    et(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    et(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    et(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    et(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    et(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    et(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    et(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    et(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    et(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    et(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    et(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    et(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    et(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    et(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    et(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    et(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  Bf = Vf,
  Uf = {
    // This is the most common easing curve.
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Objects enter the screen at full velocity from off-screen and
    // slowly decelerate to a resting point.
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    // Objects leave the screen at full velocity. They do not decelerate when off-screen.
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    // The sharp curve is used by objects that may return to the screen at any time.
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  Wf = {
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
    leavingScreen: 195,
  };
function Ja(e) {
  return `${Math.round(e)}ms`;
}
function Hf(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function qf(e) {
  const t = {
      ...Uf,
      ...e.easing,
    },
    o = {
      ...Wf,
      ...e.duration,
    };
  return {
    getAutoHeightDuration: Hf,
    create: (i = ['all'], a = {}) => {
      const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0, ...d } = a;
      if (process.env.NODE_ENV !== 'production') {
        const u = (h) => typeof h == 'string',
          p = (h) => !isNaN(parseFloat(h));
        !u(i) &&
          !Array.isArray(i) &&
          console.error('MUI: Argument "props" must be a string or Array.'),
          !p(s) &&
            !u(s) &&
            console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),
          u(l) || console.error('MUI: Argument "easing" must be a string.'),
          !p(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'),
          Object.keys(d).length !== 0 &&
            console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(',')}].`);
      }
      return (Array.isArray(i) ? i : [i])
        .map(
          (u) =>
            `${u} ${typeof s == 'string' ? s : Ja(s)} ${l} ${typeof c == 'string' ? c : Ja(c)}`,
        )
        .join(',');
    },
    ...e,
    easing: t,
    duration: o,
  };
}
const Yf = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Kf = Yf;
function Gf(e = {}, ...t) {
  const {
    breakpoints: o,
    mixins: r = {},
    spacing: i,
    palette: a = {},
    transitions: s = {},
    typography: l = {},
    shape: c,
    ...d
  } = e;
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : pn(18),
    );
  const u = Af(a),
    p = Mi(e);
  let h = _t(p, {
    mixins: kf(p.breakpoints, r),
    palette: u,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Bf.slice(),
    typography: Lf(u, l),
    transitions: qf(s),
    zIndex: {
      ...Kf,
    },
  });
  if (
    ((h = _t(h, d)), (h = t.reduce((y, g) => _t(y, g), h)), process.env.NODE_ENV !== 'production')
  ) {
    const y = [
        'active',
        'checked',
        'completed',
        'disabled',
        'error',
        'expanded',
        'focused',
        'focusVisible',
        'required',
        'selected',
      ],
      g = (m, v) => {
        let T;
        for (T in m) {
          const C = m[T];
          if (y.indexOf(T) !== -1 && Object.keys(C).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const O = Pe('', T);
              console.error(
                [
                  `MUI: The \`${v}\` component increases the CSS specificity of the \`${T}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(m, null, 2),
                  '',
                  `Instead, you need to use the '&.${O}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${O}`]: C,
                      },
                    },
                    null,
                    2,
                  ),
                  '',
                  'https://mui.com/r/state-classes-guide',
                ].join(`
`),
              );
            }
            m[T] = {};
          }
        }
      };
    Object.keys(h.components).forEach((m) => {
      const v = h.components[m].styleOverrides;
      v && m.indexOf('Mui') === 0 && g(v, m);
    });
  }
  return (
    (h.unstable_sxConfig = {
      ...Ii,
      ...(d == null ? void 0 : d.unstable_sxConfig),
    }),
    (h.unstable_sx = function (g) {
      return _i({
        sx: g,
        theme: this,
      });
    }),
    h
  );
}
const Xf = Gf(),
  Sr = Xf;
function Kn() {
  const e = Ai(Sr);
  return process.env.NODE_ENV !== 'production' && b.useDebugValue(e), e[sr] || e;
}
function Ye({ props: e, name: t }) {
  return Cf({
    props: e,
    name: t,
    defaultTheme: Sr,
    themeId: sr,
  });
}
const tn = (e) => co(e) && e !== 'classes',
  Li = co,
  Jf = Of({
    themeId: sr,
    defaultTheme: Sr,
    rootShouldForwardProp: tn,
  }),
  pe = Jf,
  Zf = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  Za = Zf;
function dn(e) {
  return typeof e == 'string';
}
function Qf(e, t, o) {
  return e === void 0 || dn(e)
    ? t
    : {
        ...t,
        ownerState: {
          ...t.ownerState,
          ...o,
        },
      };
}
function em(e, t, o = (r, i) => r === i) {
  return e.length === t.length && e.every((r, i) => o(r, t[i]));
}
const tm = {
    disableDefaultClasses: !1,
  },
  nm = /* @__PURE__ */ b.createContext(tm);
function kl(e) {
  const { disableDefaultClasses: t } = b.useContext(nm);
  return (o) => (t ? '' : e(o));
}
function $l(e, t = []) {
  if (e === void 0) return {};
  const o = {};
  return (
    Object.keys(e)
      .filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == 'function' && !t.includes(r))
      .forEach((r) => {
        o[r] = e[r];
      }),
    o
  );
}
function ai(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Qa(e) {
  if (e === void 0) return {};
  const t = {};
  return (
    Object.keys(e)
      .filter((o) => !(o.match(/^on[A-Z]/) && typeof e[o] == 'function'))
      .forEach((o) => {
        t[o] = e[o];
      }),
    t
  );
}
function om(e) {
  const {
    getSlotProps: t,
    additionalProps: o,
    externalSlotProps: r,
    externalForwardedProps: i,
    className: a,
  } = e;
  if (!t) {
    const y = Ee(
        i == null ? void 0 : i.className,
        r == null ? void 0 : r.className,
        a,
        o == null ? void 0 : o.className,
      ),
      g = {
        ...(o == null ? void 0 : o.style),
        ...(i == null ? void 0 : i.style),
        ...(r == null ? void 0 : r.style),
      },
      m = {
        ...o,
        ...i,
        ...r,
      };
    return (
      y.length > 0 && (m.className = y),
      Object.keys(g).length > 0 && (m.style = g),
      {
        props: m,
        internalRef: void 0,
      }
    );
  }
  const s = $l({
      ...i,
      ...r,
    }),
    l = Qa(r),
    c = Qa(i),
    d = t(s),
    u = Ee(
      d == null ? void 0 : d.className,
      o == null ? void 0 : o.className,
      a,
      i == null ? void 0 : i.className,
      r == null ? void 0 : r.className,
    ),
    p = {
      ...(d == null ? void 0 : d.style),
      ...(o == null ? void 0 : o.style),
      ...(i == null ? void 0 : i.style),
      ...(r == null ? void 0 : r.style),
    },
    h = {
      ...d,
      ...o,
      ...c,
      ...l,
    };
  return (
    u.length > 0 && (h.className = u),
    Object.keys(p).length > 0 && (h.style = p),
    {
      props: h,
      internalRef: d.ref,
    }
  );
}
function Pt(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: i, ...a } = e,
    s = ai(r, i),
    { props: l, internalRef: c } = om({
      ...a,
      externalSlotProps: s,
    }),
    d = it(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Qf(
    o,
    {
      ...l,
      ref: d,
    },
    i,
  );
}
function es(e) {
  return e.substring(2).toLowerCase();
}
function rm(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function Jo(e) {
  const {
      children: t,
      disableReactTree: o = !1,
      mouseEvent: r = 'onClick',
      onClickAway: i,
      touchEvent: a = 'onTouchEnd',
    } = e,
    s = b.useRef(!1),
    l = b.useRef(null),
    c = b.useRef(!1),
    d = b.useRef(!1);
  b.useEffect(
    () => (
      setTimeout(() => {
        c.current = !0;
      }, 0),
      () => {
        c.current = !1;
      }
    ),
    [],
  );
  const u = it(
      // @ts-expect-error TODO upstream fix
      t.ref,
      l,
    ),
    p = pt((g) => {
      const m = d.current;
      d.current = !1;
      const v = ot(l.current);
      if (!c.current || !l.current || ('clientX' in g && rm(g, v))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let T;
      g.composedPath
        ? (T = g.composedPath().indexOf(l.current) > -1)
        : (T =
            !v.documentElement.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              g.target,
            ) ||
            l.current.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              g.target,
            )),
        !T && (o || !m) && i(g);
    }),
    h = (g) => (m) => {
      d.current = !0;
      const v = t.props[g];
      v && v(m);
    },
    y = {
      ref: u,
    };
  return (
    a !== !1 && (y[a] = h(a)),
    b.useEffect(() => {
      if (a !== !1) {
        const g = es(a),
          m = ot(l.current),
          v = () => {
            s.current = !0;
          };
        return (
          m.addEventListener(g, p),
          m.addEventListener('touchmove', v),
          () => {
            m.removeEventListener(g, p), m.removeEventListener('touchmove', v);
          }
        );
      }
    }, [p, a]),
    r !== !1 && (y[r] = h(r)),
    b.useEffect(() => {
      if (r !== !1) {
        const g = es(r),
          m = ot(l.current);
        return (
          m.addEventListener(g, p),
          () => {
            m.removeEventListener(g, p);
          }
        );
      }
    }, [p, r]),
    /* @__PURE__ */ M(b.Fragment, {
      children: /* @__PURE__ */ b.cloneElement(t, y),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (Jo.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * The wrapped element.
     */
    children: Hn.isRequired,
    /**
     * If `true`, the React tree is ignored and only the DOM tree is considered.
     * This prop changes how portaled elements are handled.
     * @default false
     */
    disableReactTree: n.bool,
    /**
     * The mouse event to listen to. You can disable the listener by providing `false`.
     * @default 'onClick'
     */
    mouseEvent: n.oneOf([
      'onClick',
      'onMouseDown',
      'onMouseUp',
      'onPointerDown',
      'onPointerUp',
      !1,
    ]),
    /**
     * Callback fired when a "click away" event is detected.
     */
    onClickAway: n.func.isRequired,
    /**
     * The touch event to listen to. You can disable the listener by providing `false`.
     * @default 'onTouchEnd'
     */
    touchEvent: n.oneOf(['onTouchEnd', 'onTouchStart', !1]),
  });
process.env.NODE_ENV !== 'production' && (Jo['propTypes'] = gi(Jo.propTypes));
const im = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');
function am(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function sm(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function lm(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || sm(e));
}
function cm(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(im)).forEach((r, i) => {
      const a = am(r);
      a === -1 ||
        !lm(r) ||
        (a === 0
          ? t.push(r)
          : o.push({
              documentOrder: i,
              tabIndex: a,
              node: r,
            }));
    }),
    o
      .sort((r, i) =>
        r.tabIndex === i.tabIndex ? r.documentOrder - i.documentOrder : r.tabIndex - i.tabIndex,
      )
      .map((r) => r.node)
      .concat(t)
  );
}
function um() {
  return !0;
}
function Zo(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = cm,
      isEnabled: s = um,
      open: l,
    } = e,
    c = b.useRef(!1),
    d = b.useRef(null),
    u = b.useRef(null),
    p = b.useRef(null),
    h = b.useRef(null),
    y = b.useRef(!1),
    g = b.useRef(null),
    m = it(t.ref, g),
    v = b.useRef(null);
  b.useEffect(() => {
    !l || !g.current || (y.current = !o);
  }, [o, l]),
    b.useEffect(() => {
      if (!l || !g.current) return;
      const O = ot(g.current);
      return (
        g.current.contains(O.activeElement) ||
          (g.current.hasAttribute('tabIndex') ||
            (process.env.NODE_ENV !== 'production' &&
              console.error(
                [
                  'MUI: The modal content node does not accept focus.',
                  'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".',
                ].join(`
`),
              ),
            g.current.setAttribute('tabIndex', '-1')),
          y.current && g.current.focus()),
        () => {
          i ||
            (p.current && p.current.focus && ((c.current = !0), p.current.focus()),
            (p.current = null));
        }
      );
    }, [l]),
    b.useEffect(() => {
      if (!l || !g.current) return;
      const O = ot(g.current),
        E = (S) => {
          const { current: D } = g;
          if (D !== null) {
            if (!O.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!D.contains(O.activeElement)) {
              if ((S && h.current !== S.target) || O.activeElement !== h.current) h.current = null;
              else if (h.current !== null) return;
              if (!y.current) return;
              let I = [];
              if (
                ((O.activeElement === d.current || O.activeElement === u.current) &&
                  (I = a(g.current)),
                I.length > 0)
              ) {
                var B, N;
                const J = !!(
                    (B = v.current) != null &&
                    B.shiftKey &&
                    ((N = v.current) == null ? void 0 : N.key) === 'Tab'
                  ),
                  j = I[0],
                  _ = I[I.length - 1];
                typeof j != 'string' && typeof _ != 'string' && (J ? _.focus() : j.focus());
              } else D.focus();
            }
          }
        },
        f = (S) => {
          (v.current = S),
            !(r || !s() || S.key !== 'Tab') &&
              O.activeElement === g.current &&
              S.shiftKey &&
              ((c.current = !0), u.current && u.current.focus());
        };
      O.addEventListener('focusin', E), O.addEventListener('keydown', f, !0);
      const R = setInterval(() => {
        O.activeElement && O.activeElement.tagName === 'BODY' && E(null);
      }, 50);
      return () => {
        clearInterval(R),
          O.removeEventListener('focusin', E),
          O.removeEventListener('keydown', f, !0);
      };
    }, [o, r, i, s, l, a]);
  const T = (O) => {
      p.current === null && (p.current = O.relatedTarget), (y.current = !0), (h.current = O.target);
      const E = t.props.onFocus;
      E && E(O);
    },
    C = (O) => {
      p.current === null && (p.current = O.relatedTarget), (y.current = !0);
    };
  return /* @__PURE__ */ Ge(b.Fragment, {
    children: [
      /* @__PURE__ */ M('div', {
        tabIndex: l ? 0 : -1,
        onFocus: C,
        ref: d,
        'data-testid': 'sentinelStart',
      }),
      /* @__PURE__ */ b.cloneElement(t, {
        ref: m,
        onFocus: T,
      }),
      /* @__PURE__ */ M('div', {
        tabIndex: l ? 0 : -1,
        onFocus: C,
        ref: u,
        'data-testid': 'sentinelEnd',
      }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (Zo.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: Hn,
    /**
     * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
     * replace it to the last focused element when it closes.
     * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
     *
     * Generally this should never be set to `true` as it makes the focus trap less
     * accessible to assistive technologies, like screen readers.
     * @default false
     */
    disableAutoFocus: n.bool,
    /**
     * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
     *
     * Generally this should never be set to `true` as it makes the focus trap less
     * accessible to assistive technologies, like screen readers.
     * @default false
     */
    disableEnforceFocus: n.bool,
    /**
     * If `true`, the focus trap will not restore focus to previously focused element once
     * focus trap is hidden or unmounted.
     * @default false
     */
    disableRestoreFocus: n.bool,
    /**
     * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
     * For instance, you can provide the "tabbable" npm dependency.
     * @param {HTMLElement} root
     */
    getTabbable: n.func,
    /**
     * This prop extends the `open` prop.
     * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
     * This prop should be memoized.
     * It can be used to support multiple focus trap mounted at the same time.
     * @default function defaultIsEnabled(): boolean {
     *   return true;
     * }
     */
    isEnabled: n.func,
    /**
     * If `true`, focus is locked.
     */
    open: n.bool.isRequired,
  });
process.env.NODE_ENV !== 'production' && (Zo['propTypes'] = gi(Zo.propTypes));
var bt = 'top',
  Mt = 'bottom',
  At = 'right',
  vt = 'left',
  Rr = 'auto',
  Ro = [bt, Mt, At, vt],
  Vn = 'start',
  Eo = 'end',
  dm = 'clippingParents',
  Nl = 'viewport',
  oo = 'popper',
  pm = 'reference',
  ts = /* @__PURE__ */ Ro.reduce(function (e, t) {
    return e.concat([t + '-' + Vn, t + '-' + Eo]);
  }, []),
  Pl = /* @__PURE__ */ [].concat(Ro, [Rr]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Vn, t + '-' + Eo]);
  }, []),
  fm = 'beforeRead',
  mm = 'read',
  hm = 'afterRead',
  bm = 'beforeMain',
  vm = 'main',
  gm = 'afterMain',
  ym = 'beforeWrite',
  Em = 'write',
  xm = 'afterWrite',
  si = [fm, mm, hm, bm, vm, gm, ym, Em, xm];
function en(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function Nt(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function Sn(e) {
  var t = Nt(e).Element;
  return e instanceof t || e instanceof Element;
}
function $t(e) {
  var t = Nt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ji(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Nt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Om(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      i = t.attributes[o] || {},
      a = t.elements[o];
    !$t(a) ||
      !en(a) ||
      (Object.assign(a.style, r),
      Object.keys(i).forEach(function (s) {
        var l = i[s];
        l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function Tm(e) {
  var t = e.state,
    o = {
      popper: {
        position: t.options.strategy,
        left: '0',
        top: '0',
        margin: '0',
      },
      arrow: {
        position: 'absolute',
      },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, o.popper),
    (t.styles = o),
    t.elements.arrow && Object.assign(t.elements.arrow.style, o.arrow),
    function () {
      Object.keys(t.elements).forEach(function (r) {
        var i = t.elements[r],
          a = t.attributes[r] || {},
          s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : o[r]),
          l = s.reduce(function (c, d) {
            return (c[d] = ''), c;
          }, {});
        !$t(i) ||
          !en(i) ||
          (Object.assign(i.style, l),
          Object.keys(a).forEach(function (c) {
            i.removeAttribute(c);
          }));
      });
    }
  );
}
const Cm = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: Om,
  effect: Tm,
  requires: ['computeStyles'],
};
function Vt(e) {
  return e.split('-')[0];
}
var On = Math.max,
  Qo = Math.min,
  Bn = Math.round;
function li() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function Il() {
  return !/^((?!chrome|android).)*safari/i.test(li());
}
function Un(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    $t(e) &&
    ((i = (e.offsetWidth > 0 && Bn(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && Bn(r.height) / e.offsetHeight) || 1));
  var s = Sn(e) ? Nt(e) : window,
    l = s.visualViewport,
    c = !Il() && o,
    d = (r.left + (c && l ? l.offsetLeft : 0)) / i,
    u = (r.top + (c && l ? l.offsetTop : 0)) / a,
    p = r.width / i,
    h = r.height / a;
  return {
    width: p,
    height: h,
    top: u,
    right: d + p,
    bottom: u + h,
    left: d,
    x: d,
    y: u,
  };
}
function Fi(e) {
  var t = Un(e),
    o = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - o) <= 1 && (o = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    {
      x: e.offsetLeft,
      y: e.offsetTop,
      width: o,
      height: r,
    }
  );
}
function _l(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && ji(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ut(e) {
  return Nt(e).getComputedStyle(e);
}
function Sm(e) {
  return ['table', 'td', 'th'].indexOf(en(e)) >= 0;
}
function mn(e) {
  return (
    (Sn(e)
      ? e.ownerDocument
      : // $FlowFixMe[prop-missing]
        e.document) || window.document
  ).documentElement;
}
function wr(e) {
  return en(e) === 'html'
    ? e
    : // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        e.parentNode || // DOM Element detected
        (ji(e) ? e.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        mn(e);
}
function ns(e) {
  return !$t(e) || // https://github.com/popperjs/popper-core/issues/837
    Ut(e).position === 'fixed'
    ? null
    : e.offsetParent;
}
function Rm(e) {
  var t = /firefox/i.test(li()),
    o = /Trident/i.test(li());
  if (o && $t(e)) {
    var r = Ut(e);
    if (r.position === 'fixed') return null;
  }
  var i = wr(e);
  for (ji(i) && (i = i.host); $t(i) && ['html', 'body'].indexOf(en(i)) < 0; ) {
    var a = Ut(i);
    if (
      a.transform !== 'none' ||
      a.perspective !== 'none' ||
      a.contain === 'paint' ||
      ['transform', 'perspective'].indexOf(a.willChange) !== -1 ||
      (t && a.willChange === 'filter') ||
      (t && a.filter && a.filter !== 'none')
    )
      return i;
    i = i.parentNode;
  }
  return null;
}
function wo(e) {
  for (var t = Nt(e), o = ns(e); o && Sm(o) && Ut(o).position === 'static'; ) o = ns(o);
  return o && (en(o) === 'html' || (en(o) === 'body' && Ut(o).position === 'static'))
    ? t
    : o || Rm(e) || t;
}
function zi(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function uo(e, t, o) {
  return On(e, Qo(t, o));
}
function wm(e, t, o) {
  var r = uo(e, t, o);
  return r > o ? o : r;
}
function Ml() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function Al(e) {
  return Object.assign({}, Ml(), e);
}
function Dl(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var km = function (t, o) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, o.rects, {
              placement: o.placement,
            }),
          )
        : t),
    Al(typeof t != 'number' ? t : Dl(t, Ro))
  );
};
function $m(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Vt(o.placement),
    c = zi(l),
    d = [vt, At].indexOf(l) >= 0,
    u = d ? 'height' : 'width';
  if (!(!a || !s)) {
    var p = km(i.padding, o),
      h = Fi(a),
      y = c === 'y' ? bt : vt,
      g = c === 'y' ? Mt : At,
      m = o.rects.reference[u] + o.rects.reference[c] - s[c] - o.rects.popper[u],
      v = s[c] - o.rects.reference[c],
      T = wo(a),
      C = T ? (c === 'y' ? T.clientHeight || 0 : T.clientWidth || 0) : 0,
      O = m / 2 - v / 2,
      E = p[y],
      f = C - h[u] - p[g],
      R = C / 2 - h[u] / 2 + O,
      S = uo(E, R, f),
      D = c;
    o.modifiersData[r] = ((t = {}), (t[D] = S), (t.centerOffset = S - R), t);
  }
}
function Nm(e) {
  var t = e.state,
    o = e.options,
    r = o.element,
    i = r === void 0 ? '[data-popper-arrow]' : r;
  if (i != null && !(typeof i == 'string' && ((i = t.elements.popper.querySelector(i)), !i))) {
    if (
      (process.env.NODE_ENV !== 'production' &&
        ($t(i) ||
          console.error(
            [
              'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
              'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
              'the arrow.',
            ].join(' '),
          )),
      !_l(t.elements.popper, i))
    ) {
      process.env.NODE_ENV !== 'production' &&
        console.error(
          ['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(
            ' ',
          ),
        );
      return;
    }
    t.elements.arrow = i;
  }
}
const Pm = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: $m,
  effect: Nm,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function Wn(e) {
  return e.split('-')[1];
}
var Im = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function _m(e, t) {
  var o = e.x,
    r = e.y,
    i = t.devicePixelRatio || 1;
  return {
    x: Bn(o * i) / i || 0,
    y: Bn(r * i) / i || 0,
  };
}
function os(e) {
  var t,
    o = e.popper,
    r = e.popperRect,
    i = e.placement,
    a = e.variation,
    s = e.offsets,
    l = e.position,
    c = e.gpuAcceleration,
    d = e.adaptive,
    u = e.roundOffsets,
    p = e.isFixed,
    h = s.x,
    y = h === void 0 ? 0 : h,
    g = s.y,
    m = g === void 0 ? 0 : g,
    v =
      typeof u == 'function'
        ? u({
            x: y,
            y: m,
          })
        : {
            x: y,
            y: m,
          };
  (y = v.x), (m = v.y);
  var T = s.hasOwnProperty('x'),
    C = s.hasOwnProperty('y'),
    O = vt,
    E = bt,
    f = window;
  if (d) {
    var R = wo(o),
      S = 'clientHeight',
      D = 'clientWidth';
    if (
      (R === Nt(o) &&
        ((R = mn(o)),
        Ut(R).position !== 'static' &&
          l === 'absolute' &&
          ((S = 'scrollHeight'), (D = 'scrollWidth'))),
      (R = R),
      i === bt || ((i === vt || i === At) && a === Eo))
    ) {
      E = Mt;
      var B =
        p && R === f && f.visualViewport
          ? f.visualViewport.height
          : // $FlowFixMe[prop-missing]
            R[S];
      (m -= B - r.height), (m *= c ? 1 : -1);
    }
    if (i === vt || ((i === bt || i === Mt) && a === Eo)) {
      O = At;
      var N =
        p && R === f && f.visualViewport
          ? f.visualViewport.width
          : // $FlowFixMe[prop-missing]
            R[D];
      (y -= N - r.width), (y *= c ? 1 : -1);
    }
  }
  var I = Object.assign(
      {
        position: l,
      },
      d && Im,
    ),
    J =
      u === !0
        ? _m(
            {
              x: y,
              y: m,
            },
            Nt(o),
          )
        : {
            x: y,
            y: m,
          };
  if (((y = J.x), (m = J.y), c)) {
    var j;
    return Object.assign(
      {},
      I,
      ((j = {}),
      (j[E] = C ? '0' : ''),
      (j[O] = T ? '0' : ''),
      (j.transform =
        (f.devicePixelRatio || 1) <= 1
          ? 'translate(' + y + 'px, ' + m + 'px)'
          : 'translate3d(' + y + 'px, ' + m + 'px, 0)'),
      j),
    );
  }
  return Object.assign(
    {},
    I,
    ((t = {}), (t[E] = C ? m + 'px' : ''), (t[O] = T ? y + 'px' : ''), (t.transform = ''), t),
  );
}
function Mm(e) {
  var t = e.state,
    o = e.options,
    r = o.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    a = o.adaptive,
    s = a === void 0 ? !0 : a,
    l = o.roundOffsets,
    c = l === void 0 ? !0 : l;
  if (process.env.NODE_ENV !== 'production') {
    var d = Ut(t.elements.popper).transitionProperty || '';
    s &&
      ['transform', 'top', 'right', 'bottom', 'left'].some(function (p) {
        return d.indexOf(p) >= 0;
      }) &&
      console.warn(
        [
          'Popper: Detected CSS transitions on at least one of the following',
          'CSS properties: "transform", "top", "right", "bottom", "left".',
          `

`,
          'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
          'for smooth transitions, or remove these properties from the CSS',
          'transition declaration on the popper element if only transitioning',
          'opacity or background-color for example.',
          `

`,
          'We recommend using the popper element as a wrapper around an inner',
          'element that can have any CSS property transitioned for animations.',
        ].join(' '),
      );
  }
  var u = {
    placement: Vt(t.placement),
    variation: Wn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      os(
        Object.assign({}, u, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: s,
          roundOffsets: c,
        }),
      ),
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        os(
          Object.assign({}, u, {
            offsets: t.modifiersData.arrow,
            position: 'absolute',
            adaptive: !1,
            roundOffsets: c,
          }),
        ),
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-placement': t.placement,
    }));
}
const Am = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: Mm,
  data: {},
};
var Io = {
  passive: !0,
};
function Dm(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    i = r.scroll,
    a = i === void 0 ? !0 : i,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = Nt(t.elements.popper),
    d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      d.forEach(function (u) {
        u.addEventListener('scroll', o.update, Io);
      }),
    l && c.addEventListener('resize', o.update, Io),
    function () {
      a &&
        d.forEach(function (u) {
          u.removeEventListener('scroll', o.update, Io);
        }),
        l && c.removeEventListener('resize', o.update, Io);
    }
  );
}
const Lm = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: Dm,
  data: {},
};
var jm = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function Wo(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return jm[t];
  });
}
var Fm = {
  start: 'end',
  end: 'start',
};
function rs(e) {
  return e.replace(/start|end/g, function (t) {
    return Fm[t];
  });
}
function Vi(e) {
  var t = Nt(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r,
  };
}
function Bi(e) {
  return Un(mn(e)).left + Vi(e).scrollLeft;
}
function zm(e, t) {
  var o = Nt(e),
    r = mn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var d = Il();
    (d || (!d && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return {
    width: a,
    height: s,
    x: l + Bi(e),
    y: c,
  };
}
function Vm(e) {
  var t,
    o = mn(e),
    r = Vi(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = On(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = On(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + Bi(e),
    c = -r.scrollTop;
  return (
    Ut(i || o).direction === 'rtl' && (l += On(o.clientWidth, i ? i.clientWidth : 0) - a),
    {
      width: a,
      height: s,
      x: l,
      y: c,
    }
  );
}
function Ui(e) {
  var t = Ut(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function Ll(e) {
  return ['html', 'body', '#document'].indexOf(en(e)) >= 0
    ? e.ownerDocument.body
    : $t(e) && Ui(e)
    ? e
    : Ll(wr(e));
}
function po(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = Ll(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = Nt(r),
    s = i ? [a].concat(a.visualViewport || [], Ui(r) ? r : []) : r,
    l = t.concat(s);
  return i
    ? l
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(po(wr(s)));
}
function ci(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Bm(e, t) {
  var o = Un(e, !1, t === 'fixed');
  return (
    (o.top = o.top + e.clientTop),
    (o.left = o.left + e.clientLeft),
    (o.bottom = o.top + e.clientHeight),
    (o.right = o.left + e.clientWidth),
    (o.width = e.clientWidth),
    (o.height = e.clientHeight),
    (o.x = o.left),
    (o.y = o.top),
    o
  );
}
function is(e, t, o) {
  return t === Nl ? ci(zm(e, o)) : Sn(t) ? Bm(t, o) : ci(Vm(mn(e)));
}
function Um(e) {
  var t = po(wr(e)),
    o = ['absolute', 'fixed'].indexOf(Ut(e).position) >= 0,
    r = o && $t(e) ? wo(e) : e;
  return Sn(r)
    ? t.filter(function (i) {
        return Sn(i) && _l(i, r) && en(i) !== 'body';
      })
    : [];
}
function Wm(e, t, o, r) {
  var i = t === 'clippingParents' ? Um(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, d) {
      var u = is(e, d, r);
      return (
        (c.top = On(u.top, c.top)),
        (c.right = Qo(u.right, c.right)),
        (c.bottom = Qo(u.bottom, c.bottom)),
        (c.left = On(u.left, c.left)),
        c
      );
    }, is(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function jl(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? Vt(r) : null,
    a = r ? Wn(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (i) {
    case bt:
      c = {
        x: s,
        y: t.y - o.height,
      };
      break;
    case Mt:
      c = {
        x: s,
        y: t.y + t.height,
      };
      break;
    case At:
      c = {
        x: t.x + t.width,
        y: l,
      };
      break;
    case vt:
      c = {
        x: t.x - o.width,
        y: l,
      };
      break;
    default:
      c = {
        x: t.x,
        y: t.y,
      };
  }
  var d = i ? zi(i) : null;
  if (d != null) {
    var u = d === 'y' ? 'height' : 'width';
    switch (a) {
      case Vn:
        c[d] = c[d] - (t[u] / 2 - o[u] / 2);
        break;
      case Eo:
        c[d] = c[d] + (t[u] / 2 - o[u] / 2);
        break;
    }
  }
  return c;
}
function xo(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = r === void 0 ? e.placement : r,
    a = o.strategy,
    s = a === void 0 ? e.strategy : a,
    l = o.boundary,
    c = l === void 0 ? dm : l,
    d = o.rootBoundary,
    u = d === void 0 ? Nl : d,
    p = o.elementContext,
    h = p === void 0 ? oo : p,
    y = o.altBoundary,
    g = y === void 0 ? !1 : y,
    m = o.padding,
    v = m === void 0 ? 0 : m,
    T = Al(typeof v != 'number' ? v : Dl(v, Ro)),
    C = h === oo ? pm : oo,
    O = e.rects.popper,
    E = e.elements[g ? C : h],
    f = Wm(Sn(E) ? E : E.contextElement || mn(e.elements.popper), c, u, s),
    R = Un(e.elements.reference),
    S = jl({
      reference: R,
      element: O,
      strategy: 'absolute',
      placement: i,
    }),
    D = ci(Object.assign({}, O, S)),
    B = h === oo ? D : R,
    N = {
      top: f.top - B.top + T.top,
      bottom: B.bottom - f.bottom + T.bottom,
      left: f.left - B.left + T.left,
      right: B.right - f.right + T.right,
    },
    I = e.modifiersData.offset;
  if (h === oo && I) {
    var J = I[i];
    Object.keys(N).forEach(function (j) {
      var _ = [At, Mt].indexOf(j) >= 0 ? 1 : -1,
        A = [bt, Mt].indexOf(j) >= 0 ? 'y' : 'x';
      N[j] += J[A] * _;
    });
  }
  return N;
}
function Hm(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    d = c === void 0 ? Pl : c,
    u = Wn(r),
    p = u
      ? l
        ? ts
        : ts.filter(function (g) {
            return Wn(g) === u;
          })
      : Ro,
    h = p.filter(function (g) {
      return d.indexOf(g) >= 0;
    });
  h.length === 0 &&
    ((h = p),
    process.env.NODE_ENV !== 'production' &&
      console.error(
        [
          'Popper: The `allowedAutoPlacements` option did not allow any',
          'placements. Ensure the `placement` option matches the variation',
          'of the allowed placements.',
          'For example, "auto" cannot be used to allow "bottom-start".',
          'Use "auto-start" instead.',
        ].join(' '),
      ));
  var y = h.reduce(function (g, m) {
    return (
      (g[m] = xo(e, {
        placement: m,
        boundary: i,
        rootBoundary: a,
        padding: s,
      })[Vt(m)]),
      g
    );
  }, {});
  return Object.keys(y).sort(function (g, m) {
    return y[g] - y[m];
  });
}
function qm(e) {
  if (Vt(e) === Rr) return [];
  var t = Wo(e);
  return [rs(e), t, rs(t)];
}
function Ym(e) {
  var t = e.state,
    o = e.options,
    r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var i = o.mainAxis,
        a = i === void 0 ? !0 : i,
        s = o.altAxis,
        l = s === void 0 ? !0 : s,
        c = o.fallbackPlacements,
        d = o.padding,
        u = o.boundary,
        p = o.rootBoundary,
        h = o.altBoundary,
        y = o.flipVariations,
        g = y === void 0 ? !0 : y,
        m = o.allowedAutoPlacements,
        v = t.options.placement,
        T = Vt(v),
        C = T === v,
        O = c || (C || !g ? [Wo(v)] : qm(v)),
        E = [v].concat(O).reduce(function (H, K) {
          return H.concat(
            Vt(K) === Rr
              ? Hm(t, {
                  placement: K,
                  boundary: u,
                  rootBoundary: p,
                  padding: d,
                  flipVariations: g,
                  allowedAutoPlacements: m,
                })
              : K,
          );
        }, []),
        f = t.rects.reference,
        R = t.rects.popper,
        S = /* @__PURE__ */ new Map(),
        D = !0,
        B = E[0],
        N = 0;
      N < E.length;
      N++
    ) {
      var I = E[N],
        J = Vt(I),
        j = Wn(I) === Vn,
        _ = [bt, Mt].indexOf(J) >= 0,
        A = _ ? 'width' : 'height',
        q = xo(t, {
          placement: I,
          boundary: u,
          rootBoundary: p,
          altBoundary: h,
          padding: d,
        }),
        ae = _ ? (j ? At : vt) : j ? Mt : bt;
      f[A] > R[A] && (ae = Wo(ae));
      var Q = Wo(ae),
        z = [];
      if (
        (a && z.push(q[J] <= 0),
        l && z.push(q[ae] <= 0, q[Q] <= 0),
        z.every(function (H) {
          return H;
        }))
      ) {
        (B = I), (D = !1);
        break;
      }
      S.set(I, z);
    }
    if (D)
      for (
        var w = g ? 3 : 1,
          L = function (K) {
            var re = E.find(function (Z) {
              var ie = S.get(Z);
              if (ie)
                return ie.slice(0, K).every(function (ce) {
                  return ce;
                });
            });
            if (re) return (B = re), 'break';
          },
          G = w;
        G > 0;
        G--
      ) {
        var V = L(G);
        if (V === 'break') break;
      }
    t.placement !== B && ((t.modifiersData[r]._skip = !0), (t.placement = B), (t.reset = !0));
  }
}
const Km = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Ym,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function as(e, t, o) {
  return (
    o === void 0 &&
      (o = {
        x: 0,
        y: 0,
      }),
    {
      top: e.top - t.height - o.y,
      right: e.right - t.width + o.x,
      bottom: e.bottom - t.height + o.y,
      left: e.left - t.width - o.x,
    }
  );
}
function ss(e) {
  return [bt, At, Mt, vt].some(function (t) {
    return e[t] >= 0;
  });
}
function Gm(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = xo(t, {
      elementContext: 'reference',
    }),
    l = xo(t, {
      altBoundary: !0,
    }),
    c = as(s, r),
    d = as(l, i, a),
    u = ss(c),
    p = ss(d);
  (t.modifiersData[o] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: u,
    hasPopperEscaped: p,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-reference-hidden': u,
      'data-popper-escaped': p,
    }));
}
const Xm = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: Gm,
};
function Jm(e, t, o) {
  var r = Vt(e),
    i = [vt, bt].indexOf(r) >= 0 ? -1 : 1,
    a =
      typeof o == 'function'
        ? o(
            Object.assign({}, t, {
              placement: e,
            }),
          )
        : o,
    s = a[0],
    l = a[1];
  return (
    (s = s || 0),
    (l = (l || 0) * i),
    [vt, At].indexOf(r) >= 0
      ? {
          x: l,
          y: s,
        }
      : {
          x: s,
          y: l,
        }
  );
}
function Zm(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = Pl.reduce(function (u, p) {
      return (u[p] = Jm(p, t.rects, a)), u;
    }, {}),
    l = s[t.placement],
    c = l.x,
    d = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += d)),
    (t.modifiersData[r] = s);
}
const Qm = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: Zm,
};
function eh(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = jl({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const th = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: eh,
  data: {},
};
function nh(e) {
  return e === 'x' ? 'y' : 'x';
}
function oh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.mainAxis,
    a = i === void 0 ? !0 : i,
    s = o.altAxis,
    l = s === void 0 ? !1 : s,
    c = o.boundary,
    d = o.rootBoundary,
    u = o.altBoundary,
    p = o.padding,
    h = o.tether,
    y = h === void 0 ? !0 : h,
    g = o.tetherOffset,
    m = g === void 0 ? 0 : g,
    v = xo(t, {
      boundary: c,
      rootBoundary: d,
      padding: p,
      altBoundary: u,
    }),
    T = Vt(t.placement),
    C = Wn(t.placement),
    O = !C,
    E = zi(T),
    f = nh(E),
    R = t.modifiersData.popperOffsets,
    S = t.rects.reference,
    D = t.rects.popper,
    B =
      typeof m == 'function'
        ? m(
            Object.assign({}, t.rects, {
              placement: t.placement,
            }),
          )
        : m,
    N =
      typeof B == 'number'
        ? {
            mainAxis: B,
            altAxis: B,
          }
        : Object.assign(
            {
              mainAxis: 0,
              altAxis: 0,
            },
            B,
          ),
    I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    J = {
      x: 0,
      y: 0,
    };
  if (R) {
    if (a) {
      var j,
        _ = E === 'y' ? bt : vt,
        A = E === 'y' ? Mt : At,
        q = E === 'y' ? 'height' : 'width',
        ae = R[E],
        Q = ae + v[_],
        z = ae - v[A],
        w = y ? -D[q] / 2 : 0,
        L = C === Vn ? S[q] : D[q],
        G = C === Vn ? -D[q] : -S[q],
        V = t.elements.arrow,
        H =
          y && V
            ? Fi(V)
            : {
                width: 0,
                height: 0,
              },
        K = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : Ml(),
        re = K[_],
        Z = K[A],
        ie = uo(0, S[q], H[q]),
        ce = O ? S[q] / 2 - w - ie - re - N.mainAxis : L - ie - re - N.mainAxis,
        ue = O ? -S[q] / 2 + w + ie + Z + N.mainAxis : G + ie + Z + N.mainAxis,
        me = t.elements.arrow && wo(t.elements.arrow),
        P = me ? (E === 'y' ? me.clientTop || 0 : me.clientLeft || 0) : 0,
        Te = (j = I == null ? void 0 : I[E]) != null ? j : 0,
        X = ae + ce - Te - P,
        W = ae + ue - Te,
        Ce = uo(y ? Qo(Q, X) : Q, ae, y ? On(z, W) : z);
      (R[E] = Ce), (J[E] = Ce - ae);
    }
    if (l) {
      var de,
        ke = E === 'x' ? bt : vt,
        Le = E === 'x' ? Mt : At,
        Xe = R[f],
        Ke = f === 'y' ? 'height' : 'width',
        je = Xe + v[ke],
        Ze = Xe - v[Le],
        ee = [bt, vt].indexOf(T) !== -1,
        te = (de = I == null ? void 0 : I[f]) != null ? de : 0,
        ye = ee ? je : Xe - S[Ke] - D[Ke] - te + N.altAxis,
        he = ee ? Xe + S[Ke] + D[Ke] - te - N.altAxis : Ze,
        xe = y && ee ? wm(ye, Xe, he) : uo(y ? ye : je, Xe, y ? he : Ze);
      (R[f] = xe), (J[f] = xe - Xe);
    }
    t.modifiersData[r] = J;
  }
}
const rh = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: oh,
  requiresIfExists: ['offset'],
};
function ih(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function ah(e) {
  return e === Nt(e) || !$t(e) ? Vi(e) : ih(e);
}
function sh(e) {
  var t = e.getBoundingClientRect(),
    o = Bn(t.width) / e.offsetWidth || 1,
    r = Bn(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function lh(e, t, o) {
  o === void 0 && (o = !1);
  var r = $t(t),
    i = $t(t) && sh(t),
    a = mn(t),
    s = Un(e, i, o),
    l = {
      scrollLeft: 0,
      scrollTop: 0,
    },
    c = {
      x: 0,
      y: 0,
    };
  return (
    (r || (!r && !o)) &&
      ((en(t) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        Ui(a)) &&
        (l = ah(t)),
      $t(t) ? ((c = Un(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = Bi(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function ch(e) {
  var t = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Set(),
    r = [];
  e.forEach(function (a) {
    t.set(a.name, a);
  });
  function i(a) {
    o.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function (l) {
      if (!o.has(l)) {
        var c = t.get(l);
        c && i(c);
      }
    }),
      r.push(a);
  }
  return (
    e.forEach(function (a) {
      o.has(a.name) || i(a);
    }),
    r
  );
}
function uh(e) {
  var t = ch(e);
  return si.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
      }),
    );
  }, []);
}
function dh(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (o) {
          Promise.resolve().then(function () {
            (t = void 0), o(e());
          });
        })),
      t
    );
  };
}
function cn(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  return [].concat(o).reduce(function (i, a) {
    return i.replace(/%s/, a);
  }, e);
}
var vn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  ph = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  ls = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function fh(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), ls)
      .filter(function (o, r, i) {
        return i.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                cn(vn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                cn(vn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            si.indexOf(t.phase) < 0 &&
              console.error(
                cn(vn, t.name, '"phase"', 'either ' + si.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(cn(vn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(cn(vn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                cn(vn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                cn(
                  vn,
                  t.name,
                  '"requiresIfExists"',
                  '"array"',
                  '"' + String(t.requiresIfExists) + '"',
                ),
              );
            break;
          case 'options':
          case 'data':
            break;
          default:
            console.error(
              'PopperJS: an invalid property has been provided to the "' +
                t.name +
                '" modifier, valid properties are ' +
                ls
                  .map(function (r) {
                    return '"' + r + '"';
                  })
                  .join(', ') +
                '; but "' +
                o +
                '" was provided.',
            );
        }
        t.requires &&
          t.requires.forEach(function (r) {
            e.find(function (i) {
              return i.name === r;
            }) == null && console.error(cn(ph, String(t.name), r, r));
          });
      });
  });
}
function mh(e, t) {
  var o = /* @__PURE__ */ new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function hh(e) {
  var t = e.reduce(function (o, r) {
    var i = o[r.name];
    return (
      (o[r.name] = i
        ? Object.assign({}, i, r, {
            options: Object.assign({}, i.options, r.options),
            data: Object.assign({}, i.data, r.data),
          })
        : r),
      o
    );
  }, {});
  return Object.keys(t).map(function (o) {
    return t[o];
  });
}
var cs =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  bh =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  us = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
  };
function ds() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function vh(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    i = t.defaultOptions,
    a = i === void 0 ? us : i;
  return function (l, c, d) {
    d === void 0 && (d = a);
    var u = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, us, a),
        modifiersData: {},
        elements: {
          reference: l,
          popper: c,
        },
        attributes: {},
        styles: {},
      },
      p = [],
      h = !1,
      y = {
        state: u,
        setOptions: function (T) {
          var C = typeof T == 'function' ? T(u.options) : T;
          m(),
            (u.options = Object.assign({}, a, u.options, C)),
            (u.scrollParents = {
              reference: Sn(l) ? po(l) : l.contextElement ? po(l.contextElement) : [],
              popper: po(c),
            });
          var O = uh(hh([].concat(r, u.options.modifiers)));
          if (
            ((u.orderedModifiers = O.filter(function (I) {
              return I.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var E = mh([].concat(O, u.options.modifiers), function (I) {
              var J = I.name;
              return J;
            });
            if ((fh(E), Vt(u.options.placement) === Rr)) {
              var f = u.orderedModifiers.find(function (I) {
                var J = I.name;
                return J === 'flip';
              });
              f ||
                console.error(
                  [
                    'Popper: "auto" placements require the "flip" modifier be',
                    'present and enabled to work.',
                  ].join(' '),
                );
            }
            var R = Ut(c),
              S = R.marginTop,
              D = R.marginRight,
              B = R.marginBottom,
              N = R.marginLeft;
            [S, D, B, N].some(function (I) {
              return parseFloat(I);
            }) &&
              console.warn(
                [
                  'Popper: CSS "margin" styles cannot be used to apply padding',
                  'between the popper and its reference element or boundary.',
                  'To replicate margin, use the `offset` modifier, as well as',
                  'the `padding` option in the `preventOverflow` and `flip`',
                  'modifiers.',
                ].join(' '),
              );
          }
          return g(), y.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function () {
          if (!h) {
            var T = u.elements,
              C = T.reference,
              O = T.popper;
            if (!ds(C, O)) {
              process.env.NODE_ENV !== 'production' && console.error(cs);
              return;
            }
            (u.rects = {
              reference: lh(C, wo(O), u.options.strategy === 'fixed'),
              popper: Fi(O),
            }),
              (u.reset = !1),
              (u.placement = u.options.placement),
              u.orderedModifiers.forEach(function (I) {
                return (u.modifiersData[I.name] = Object.assign({}, I.data));
              });
            for (var E = 0, f = 0; f < u.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((E += 1), E > 100)) {
                console.error(bh);
                break;
              }
              if (u.reset === !0) {
                (u.reset = !1), (f = -1);
                continue;
              }
              var R = u.orderedModifiers[f],
                S = R.fn,
                D = R.options,
                B = D === void 0 ? {} : D,
                N = R.name;
              typeof S == 'function' &&
                (u =
                  S({
                    state: u,
                    options: B,
                    name: N,
                    instance: y,
                  }) || u);
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: dh(function () {
          return new Promise(function (v) {
            y.forceUpdate(), v(u);
          });
        }),
        destroy: function () {
          m(), (h = !0);
        },
      };
    if (!ds(l, c)) return process.env.NODE_ENV !== 'production' && console.error(cs), y;
    y.setOptions(d).then(function (v) {
      !h && d.onFirstUpdate && d.onFirstUpdate(v);
    });
    function g() {
      u.orderedModifiers.forEach(function (v) {
        var T = v.name,
          C = v.options,
          O = C === void 0 ? {} : C,
          E = v.effect;
        if (typeof E == 'function') {
          var f = E({
              state: u,
              name: T,
              instance: y,
              options: O,
            }),
            R = function () {};
          p.push(f || R);
        }
      });
    }
    function m() {
      p.forEach(function (v) {
        return v();
      }),
        (p = []);
    }
    return y;
  };
}
var gh = [Lm, th, Am, Cm, Qm, Km, rh, Pm, Xm],
  yh = /* @__PURE__ */ vh({
    defaultModifiers: gh,
  });
function Eh(e) {
  return typeof e == 'function' ? e() : e;
}
const er = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = b.useState(null),
    c = it(/* @__PURE__ */ b.isValidElement(r) ? r.ref : null, o);
  if (
    (an(() => {
      a || l(Eh(i) || document.body);
    }, [i, a]),
    an(() => {
      if (s && !a)
        return (
          qo(o, s),
          () => {
            qo(o, null);
          }
        );
    }, [o, s, a]),
    a)
  ) {
    if (/* @__PURE__ */ b.isValidElement(r)) {
      const d = {
        ref: c,
      };
      return /* @__PURE__ */ b.cloneElement(r, d);
    }
    return /* @__PURE__ */ M(b.Fragment, {
      children: r,
    });
  }
  return /* @__PURE__ */ M(b.Fragment, {
    children: s && /* @__PURE__ */ qs.createPortal(r, s),
  });
});
process.env.NODE_ENV !== 'production' &&
  (er.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * The children to render into the `container`.
     */
    children: n.node,
    /**
     * An HTML element or function that returns one.
     * The `container` will have the portal children appended to it.
     *
     * By default, it uses the body of the top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: n.oneOfType([Qt, n.func]),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (er['propTypes'] = gi(er.propTypes));
const Fl = er;
function xh(e) {
  return Pe('MuiPopper', e);
}
_e('MuiPopper', ['root']);
function Oh(e, t) {
  if (t === 'ltr') return e;
  switch (e) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return e;
  }
}
function tr(e) {
  return typeof e == 'function' ? e() : e;
}
function kr(e) {
  return e.nodeType !== void 0;
}
function Th(e) {
  return !kr(e);
}
const Ch = () =>
    De(
      {
        root: ['root'],
      },
      kl(xh),
    ),
  Sh = {},
  Rh = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r;
    const {
        anchorEl: i,
        children: a,
        direction: s,
        disablePortal: l,
        modifiers: c,
        open: d,
        placement: u,
        popperOptions: p,
        popperRef: h,
        slotProps: y = {},
        slots: g = {},
        TransitionProps: m,
        // @ts-ignore internal logic
        ownerState: v,
        // prevent from spreading to DOM, it can come from the parent component e.g. Select.
        ...T
      } = t,
      C = b.useRef(null),
      O = it(C, o),
      E = b.useRef(null),
      f = it(E, h),
      R = b.useRef(f);
    an(() => {
      R.current = f;
    }, [f]),
      b.useImperativeHandle(h, () => E.current, []);
    const S = Oh(u, s),
      [D, B] = b.useState(S),
      [N, I] = b.useState(tr(i));
    b.useEffect(() => {
      E.current && E.current.forceUpdate();
    }),
      b.useEffect(() => {
        i && I(tr(i));
      }, [i]),
      an(() => {
        if (!N || !d) return;
        const q = (z) => {
          B(z.placement);
        };
        if (process.env.NODE_ENV !== 'production' && N && kr(N) && N.nodeType === 1) {
          const z = N.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            z.top === 0 &&
            z.left === 0 &&
            z.right === 0 &&
            z.bottom === 0 &&
            console.warn(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join(`
`),
            );
        }
        let ae = [
          {
            name: 'preventOverflow',
            options: {
              altBoundary: l,
            },
          },
          {
            name: 'flip',
            options: {
              altBoundary: l,
            },
          },
          {
            name: 'onUpdate',
            enabled: !0,
            phase: 'afterWrite',
            fn: ({ state: z }) => {
              q(z);
            },
          },
        ];
        c != null && (ae = ae.concat(c)), p && p.modifiers != null && (ae = ae.concat(p.modifiers));
        const Q = yh(N, C.current, {
          placement: S,
          ...p,
          modifiers: ae,
        });
        return (
          R.current(Q),
          () => {
            Q.destroy(), R.current(null);
          }
        );
      }, [N, l, c, d, p, S]);
    const J = {
      placement: D,
    };
    m !== null && (J.TransitionProps = m);
    const j = Ch(),
      _ = (r = g.root) != null ? r : 'div',
      A = Pt({
        elementType: _,
        externalSlotProps: y.root,
        externalForwardedProps: T,
        additionalProps: {
          role: 'tooltip',
          ref: O,
        },
        ownerState: t,
        className: j.root,
      });
    return /* @__PURE__ */ M(_, {
      ...A,
      children: typeof a == 'function' ? a(J) : a,
    });
  }),
  zl = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const {
        anchorEl: r,
        children: i,
        container: a,
        direction: s = 'ltr',
        disablePortal: l = !1,
        keepMounted: c = !1,
        modifiers: d,
        open: u,
        placement: p = 'bottom',
        popperOptions: h = Sh,
        popperRef: y,
        style: g,
        transition: m = !1,
        slotProps: v = {},
        slots: T = {},
        ...C
      } = t,
      [O, E] = b.useState(!0),
      f = () => {
        E(!1);
      },
      R = () => {
        E(!0);
      };
    if (!c && !u && (!m || O)) return null;
    let S;
    if (a) S = a;
    else if (r) {
      const N = tr(r);
      S = N && kr(N) ? ot(N).body : ot(null).body;
    }
    const D = !u && c && (!m || O) ? 'none' : void 0,
      B = m
        ? {
            in: u,
            onEnter: f,
            onExited: R,
          }
        : void 0;
    return /* @__PURE__ */ M(Fl, {
      disablePortal: l,
      container: S,
      children: /* @__PURE__ */ M(Rh, {
        anchorEl: r,
        direction: s,
        disablePortal: l,
        modifiers: d,
        ref: o,
        open: m ? !O : u,
        placement: p,
        popperOptions: h,
        popperRef: y,
        slotProps: v,
        slots: T,
        ...C,
        style: {
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: 'fixed',
          // Fix Popper.js display issue
          top: 0,
          left: 0,
          display: D,
          ...g,
        },
        TransitionProps: B,
        children: i,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (zl.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
     * or a function that returns either.
     * It's used to set the position of the popper.
     * The return value will passed as the reference object of the Popper instance.
     */
    anchorEl: Bt(n.oneOfType([Qt, n.object, n.func]), (e) => {
      if (e.open) {
        const t = tr(e.anchorEl);
        if (t && kr(t) && t.nodeType === 1) {
          const o = t.getBoundingClientRect();
          if (
            process.env.NODE_ENV !== 'test' &&
            o.top === 0 &&
            o.left === 0 &&
            o.right === 0 &&
            o.bottom === 0
          )
            return new Error(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join(`
`),
            );
        } else if (
          !t ||
          typeof t.getBoundingClientRect != 'function' ||
          (Th(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        )
          return new Error(
            [
              'MUI: The `anchorEl` prop provided to the component is invalid.',
              'It should be an HTML element instance or a virtualElement ',
              '(https://popper.js.org/docs/v2/virtual-elements/).',
            ].join(`
`),
          );
      }
      return null;
    }),
    /**
     * Popper render function or node.
     */
    children: n.oneOfType([n.node, n.func]),
    /**
     * An HTML element or function that returns one.
     * The `container` will have the portal children appended to it.
     *
     * By default, it uses the body of the top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: n.oneOfType([Qt, n.func]),
    /**
     * Direction of the text.
     * @default 'ltr'
     */
    direction: n.oneOf(['ltr', 'rtl']),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
    /**
     * Always keep the children in the DOM.
     * This prop can be useful in SEO situation or
     * when you want to maximize the responsiveness of the Popper.
     * @default false
     */
    keepMounted: n.bool,
    /**
     * Popper.js is based on a "plugin-like" architecture,
     * most of its features are fully encapsulated "modifiers".
     *
     * A modifier is a function that is called each time Popper.js needs to
     * compute the position of the popper.
     * For this reason, modifiers should be very performant to avoid bottlenecks.
     * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
     */
    modifiers: n.arrayOf(
      n.shape({
        data: n.object,
        effect: n.func,
        enabled: n.bool,
        fn: n.func,
        name: n.any,
        options: n.object,
        phase: n.oneOf([
          'afterMain',
          'afterRead',
          'afterWrite',
          'beforeMain',
          'beforeRead',
          'beforeWrite',
          'main',
          'read',
          'write',
        ]),
        requires: n.arrayOf(n.string),
        requiresIfExists: n.arrayOf(n.string),
      }),
    ),
    /**
     * If `true`, the component is shown.
     */
    open: n.bool.isRequired,
    /**
     * Popper placement.
     * @default 'bottom'
     */
    placement: n.oneOf([
      'auto-end',
      'auto-start',
      'auto',
      'bottom-end',
      'bottom-start',
      'bottom',
      'left-end',
      'left-start',
      'left',
      'right-end',
      'right-start',
      'right',
      'top-end',
      'top-start',
      'top',
    ]),
    /**
     * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
     * @default {}
     */
    popperOptions: n.shape({
      modifiers: n.array,
      onFirstUpdate: n.func,
      placement: n.oneOf([
        'auto-end',
        'auto-start',
        'auto',
        'bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top',
      ]),
      strategy: n.oneOf(['absolute', 'fixed']),
    }),
    /**
     * A ref that points to the used popper instance.
     */
    popperRef: yt,
    /**
     * The props used for each slot inside the Popper.
     * @default {}
     */
    slotProps: n.shape({
      root: n.oneOfType([n.func, n.object]),
    }),
    /**
     * The components used for each slot inside the Popper.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: n.shape({
      root: n.elementType,
    }),
    /**
     * Help supporting a react-transition-group/Transition component.
     * @default false
     */
    transition: n.bool,
  });
const wh = zl;
function kh(e) {
  const t = ot(e);
  return t.body === e
    ? Tn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function fo(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function ps(e) {
  return parseInt(Tn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function $h(e) {
  const o =
      [
        'TEMPLATE',
        'SCRIPT',
        'STYLE',
        'LINK',
        'MAP',
        'META',
        'NOSCRIPT',
        'PICTURE',
        'COL',
        'COLGROUP',
        'PARAM',
        'SLOT',
        'SOURCE',
        'TRACK',
      ].indexOf(e.tagName) !== -1,
    r = e.tagName === 'INPUT' && e.getAttribute('type') === 'hidden';
  return o || r;
}
function fs(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !$h(s);
    l && c && fo(s, i);
  });
}
function Wr(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function Nh(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (kh(r)) {
      const s = nl(ot(r));
      o.push({
        value: r.style.paddingRight,
        property: 'padding-right',
        el: r,
      }),
        (r.style.paddingRight = `${ps(r) + s}px`);
      const l = ot(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({
          value: c.style.paddingRight,
          property: 'padding-right',
          el: c,
        }),
          (c.style.paddingRight = `${ps(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = ot(r).body;
    else {
      const s = r.parentElement,
        l = Tn(r);
      a =
        (s == null ? void 0 : s.nodeName) === 'HTML' && l.getComputedStyle(s).overflowY === 'scroll'
          ? s
          : r;
    }
    o.push(
      {
        value: a.style.overflow,
        property: 'overflow',
        el: a,
      },
      {
        value: a.style.overflowX,
        property: 'overflow-x',
        el: a,
      },
      {
        value: a.style.overflowY,
        property: 'overflow-y',
        el: a,
      },
    ),
      (a.style.overflow = 'hidden');
  }
  return () => {
    o.forEach(({ value: a, el: s, property: l }) => {
      a ? s.style.setProperty(l, a) : s.style.removeProperty(l);
    });
  };
}
function Ph(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class Ih {
  constructor() {
    (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && fo(t.modalRef, !1);
    const i = Ph(o);
    fs(o, t.mount, t.modalRef, i, !0);
    const a = Wr(this.containers, (s) => s.container === o);
    return a !== -1
      ? (this.containers[a].modals.push(t), r)
      : (this.containers.push({
          modals: [t],
          container: o,
          restore: null,
          hiddenSiblings: i,
        }),
        r);
  }
  mount(t, o) {
    const r = Wr(this.containers, (a) => a.modals.indexOf(t) !== -1),
      i = this.containers[r];
    i.restore || (i.restore = Nh(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = Wr(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && fo(t.modalRef, o),
        fs(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
        this.containers.splice(i, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && fo(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function _h(e) {
  return Pe('MuiModal', e);
}
_e('MuiModal', ['root', 'hidden', 'backdrop']);
const Mh = (e) => {
  const { open: t, exited: o } = e;
  return De(
    {
      root: ['root', !t && o && 'hidden'],
      backdrop: ['backdrop'],
    },
    kl(_h),
  );
};
function Ah(e) {
  return typeof e == 'function' ? e() : e;
}
function Dh(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const Lh = new Ih(),
  Vl = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i;
    const {
        children: a,
        closeAfterTransition: s = !1,
        container: l,
        disableAutoFocus: c = !1,
        disableEnforceFocus: d = !1,
        disableEscapeKeyDown: u = !1,
        disablePortal: p = !1,
        disableRestoreFocus: h = !1,
        disableScrollLock: y = !1,
        hideBackdrop: g = !1,
        keepMounted: m = !1,
        // private
        manager: v = Lh,
        onBackdropClick: T,
        onClose: C,
        onKeyDown: O,
        open: E,
        onTransitionEnter: f,
        onTransitionExited: R,
        slotProps: S = {},
        slots: D = {},
        ...B
      } = t,
      N = v,
      [I, J] = b.useState(!E),
      j = b.useRef({}),
      _ = b.useRef(null),
      A = b.useRef(null),
      q = it(A, o),
      ae = Dh(a),
      Q = (r = t['aria-hidden']) != null ? r : !0,
      z = () => ot(_.current),
      w = () => ((j.current.modalRef = A.current), (j.current.mountNode = _.current), j.current),
      L = () => {
        N.mount(w(), {
          disableScrollLock: y,
        }),
          A.current && (A.current.scrollTop = 0);
      },
      G = pt(() => {
        const de = Ah(l) || z().body;
        N.add(w(), de), A.current && L();
      }),
      V = b.useCallback(() => N.isTopModal(w()), [N]),
      H = pt((de) => {
        (_.current = de), !(!de || !A.current) && (E && V() ? L() : fo(A.current, Q));
      }),
      K = b.useCallback(() => {
        N.remove(w(), Q);
      }, [N, Q]);
    b.useEffect(
      () => () => {
        K();
      },
      [K],
    ),
      b.useEffect(() => {
        E ? G() : (!ae || !s) && K();
      }, [E, K, ae, s, G]);
    const re = {
        ...t,
        closeAfterTransition: s,
        disableAutoFocus: c,
        disableEnforceFocus: d,
        disableEscapeKeyDown: u,
        disablePortal: p,
        disableRestoreFocus: h,
        disableScrollLock: y,
        exited: I,
        hideBackdrop: g,
        keepMounted: m,
      },
      Z = Mh(re),
      ie = () => {
        J(!1), f && f();
      },
      ce = () => {
        J(!0), R && R(), s && K();
      },
      ue = (de) => {
        de.target === de.currentTarget && (T && T(de), C && C(de, 'backdropClick'));
      },
      me = (de) => {
        O && O(de),
          !(de.key !== 'Escape' || !V()) &&
            (u || (de.stopPropagation(), C && C(de, 'escapeKeyDown')));
      },
      P = {};
    a.props.tabIndex === void 0 && (P.tabIndex = '-1'),
      ae && ((P.onEnter = ga(ie, a.props.onEnter)), (P.onExited = ga(ce, a.props.onExited)));
    const Te = (i = D.root) != null ? i : 'div',
      X = Pt({
        elementType: Te,
        externalSlotProps: S.root,
        externalForwardedProps: B,
        additionalProps: {
          ref: q,
          role: 'presentation',
          onKeyDown: me,
        },
        className: Z.root,
        ownerState: re,
      }),
      W = D.backdrop,
      Ce = Pt({
        elementType: W,
        externalSlotProps: S.backdrop,
        additionalProps: {
          'aria-hidden': !0,
          onClick: ue,
          open: E,
        },
        className: Z.backdrop,
        ownerState: re,
      });
    return !m && !E && (!ae || I)
      ? null
      : /* @__PURE__ */ M(Fl, {
          ref: H,
          container: l,
          disablePortal: p,
          children: /* @__PURE__ */ Ge(Te, {
            ...X,
            children: [
              !g && W
                ? /* @__PURE__ */ M(W, {
                    ...Ce,
                  })
                : null,
              /* @__PURE__ */ M(Zo, {
                disableEnforceFocus: d,
                disableAutoFocus: c,
                disableRestoreFocus: h,
                isEnabled: V,
                open: E,
                children: /* @__PURE__ */ b.cloneElement(a, P),
              }),
            ],
          }),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (Vl.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: Hn.isRequired,
    /**
     * When set to true the Modal waits until a nested Transition is completed before closing.
     * @default false
     */
    closeAfterTransition: n.bool,
    /**
     * An HTML element or function that returns one.
     * The `container` will have the portal children appended to it.
     *
     * By default, it uses the body of the top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: n.oneOfType([Qt, n.func]),
    /**
     * If `true`, the modal will not automatically shift focus to itself when it opens, and
     * replace it to the last focused element when it closes.
     * This also works correctly with any modal children that have the `disableAutoFocus` prop.
     *
     * Generally this should never be set to `true` as it makes the modal less
     * accessible to assistive technologies, like screen readers.
     * @default false
     */
    disableAutoFocus: n.bool,
    /**
     * If `true`, the modal will not prevent focus from leaving the modal while open.
     *
     * Generally this should never be set to `true` as it makes the modal less
     * accessible to assistive technologies, like screen readers.
     * @default false
     */
    disableEnforceFocus: n.bool,
    /**
     * If `true`, hitting escape will not fire the `onClose` callback.
     * @default false
     */
    disableEscapeKeyDown: n.bool,
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
    /**
     * If `true`, the modal will not restore focus to previously focused element once
     * modal is hidden or unmounted.
     * @default false
     */
    disableRestoreFocus: n.bool,
    /**
     * Disable the scroll lock behavior.
     * @default false
     */
    disableScrollLock: n.bool,
    /**
     * If `true`, the backdrop is not rendered.
     * @default false
     */
    hideBackdrop: n.bool,
    /**
     * Always keep the children in the DOM.
     * This prop can be useful in SEO situation or
     * when you want to maximize the responsiveness of the Modal.
     * @default false
     */
    keepMounted: n.bool,
    /**
     * Callback fired when the backdrop is clicked.
     * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
     */
    onBackdropClick: n.func,
    /**
     * Callback fired when the component requests to be closed.
     * The `reason` parameter can optionally be used to control the response to `onClose`.
     *
     * @param {object} event The event source of the callback.
     * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
     */
    onClose: n.func,
    /**
     * If `true`, the component is shown.
     */
    open: n.bool.isRequired,
    /**
     * The props used for each slot inside the Modal.
     * @default {}
     */
    slotProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    /**
     * The components used for each slot inside the Modal.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: n.shape({
      backdrop: n.elementType,
      root: n.elementType,
    }),
  });
const jh = Vl,
  Fh = 2;
function Bl(e, t) {
  return e - t;
}
function ro(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function ms(e, t) {
  var o;
  const { index: r } =
    (o = e.reduce((i, a, s) => {
      const l = Math.abs(t - a);
      return i === null || l < i.distance || l === i.distance
        ? {
            distance: l,
            index: s,
          }
        : i;
    }, null)) != null
      ? o
      : {};
  return r;
}
function _o(e, t) {
  if (t.current !== void 0 && e.changedTouches) {
    const o = e;
    for (let r = 0; r < o.changedTouches.length; r += 1) {
      const i = o.changedTouches[r];
      if (i.identifier === t.current)
        return {
          x: i.clientX,
          y: i.clientY,
        };
    }
    return !1;
  }
  return {
    x: e.clientX,
    y: e.clientY,
  };
}
function nr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function zh(e, t, o) {
  return (o - t) * e + t;
}
function Vh(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function Bh(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(Vh(t)));
}
function hs({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(Bl);
}
function Mo({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, i;
  const a = ot(e.current);
  if (
    !((r = e.current) != null && r.contains(a.activeElement)) ||
    Number(a == null || (i = a.activeElement) == null ? void 0 : i.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
function Ao(e, t) {
  return typeof e == 'number' && typeof t == 'number'
    ? e === t
    : typeof e == 'object' && typeof t == 'object'
    ? em(e, t)
    : !1;
}
const Uh = {
    horizontal: {
      offset: (e) => ({
        left: `${e}%`,
      }),
      leap: (e) => ({
        width: `${e}%`,
      }),
    },
    'horizontal-reverse': {
      offset: (e) => ({
        right: `${e}%`,
      }),
      leap: (e) => ({
        width: `${e}%`,
      }),
    },
    vertical: {
      offset: (e) => ({
        bottom: `${e}%`,
      }),
      leap: (e) => ({
        height: `${e}%`,
      }),
    },
  },
  Wh = (e) => e;
let Do;
function Hr() {
  return (
    Do === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Do = CSS.supports('touch-action', 'none'))
        : (Do = !0)),
    Do
  );
}
function Hh(e) {
  const {
      'aria-labelledby': t,
      defaultValue: o,
      disabled: r = !1,
      disableSwap: i = !1,
      isRtl: a = !1,
      marks: s = !1,
      max: l = 100,
      min: c = 0,
      name: d,
      onChange: u,
      onChangeCommitted: p,
      orientation: h = 'horizontal',
      rootRef: y,
      scale: g = Wh,
      step: m = 1,
      tabIndex: v,
      value: T,
    } = e,
    C = b.useRef(),
    [O, E] = b.useState(-1),
    [f, R] = b.useState(-1),
    [S, D] = b.useState(!1),
    B = b.useRef(0),
    [N, I] = xn({
      controlled: T,
      default: o ?? c,
      name: 'Slider',
    }),
    J =
      u &&
      ((ee, te, ye) => {
        const he = ee.nativeEvent || ee,
          xe = new he.constructor(he.type, he);
        Object.defineProperty(xe, 'target', {
          writable: !0,
          value: {
            value: te,
            name: d,
          },
        }),
          u(xe, te, ye);
      }),
    j = Array.isArray(N);
  let _ = j ? N.slice().sort(Bl) : [N];
  _ = _.map((ee) => ro(ee, c, l));
  const A =
      s === !0 && m !== null
        ? [...Array(Math.floor((l - c) / m) + 1)].map((ee, te) => ({
            value: c + m * te,
          }))
        : s || [],
    q = A.map((ee) => ee.value),
    { isFocusVisibleRef: ae, onBlur: Q, onFocus: z, ref: w } = tl(),
    [L, G] = b.useState(-1),
    V = b.useRef(),
    H = it(w, V),
    K = it(y, H),
    re = (ee) => (te) => {
      var ye;
      const he = Number(te.currentTarget.getAttribute('data-index'));
      z(te),
        ae.current === !0 && G(he),
        R(he),
        ee == null || (ye = ee.onFocus) == null || ye.call(ee, te);
    },
    Z = (ee) => (te) => {
      var ye;
      Q(te),
        ae.current === !1 && G(-1),
        R(-1),
        ee == null || (ye = ee.onBlur) == null || ye.call(ee, te);
    };
  an(() => {
    if (r && V.current.contains(document.activeElement)) {
      var ee;
      (ee = document.activeElement) == null || ee.blur();
    }
  }, [r]),
    r && O !== -1 && E(-1),
    r && L !== -1 && G(-1);
  const ie = (ee) => (te) => {
      var ye;
      (ye = ee.onChange) == null || ye.call(ee, te);
      const he = Number(te.currentTarget.getAttribute('data-index')),
        xe = _[he],
        Ne = q.indexOf(xe);
      let se = te.target.valueAsNumber;
      if (
        (A && m == null && (se = se < xe ? q[Ne - 1] : q[Ne + 1]),
        (se = ro(se, c, l)),
        A && m == null)
      ) {
        const we = q.indexOf(_[he]);
        se = se < _[he] ? q[we - 1] : q[we + 1];
      }
      if (j) {
        i && (se = ro(se, _[he - 1] || -1 / 0, _[he + 1] || 1 / 0));
        const we = se;
        se = hs({
          values: _,
          newValue: se,
          index: he,
        });
        let U = he;
        i || (U = se.indexOf(we)),
          Mo({
            sliderRef: V,
            activeIndex: U,
          });
      }
      I(se), G(he), J && !Ao(se, N) && J(te, se, he), p && p(te, se);
    },
    ce = b.useRef();
  let ue = h;
  a && h === 'horizontal' && (ue += '-reverse');
  const me = ({ finger: ee, move: te = !1 }) => {
      const { current: ye } = V,
        { width: he, height: xe, bottom: Ne, left: se } = ye.getBoundingClientRect();
      let we;
      ue.indexOf('vertical') === 0 ? (we = (Ne - ee.y) / xe) : (we = (ee.x - se) / he),
        ue.indexOf('-reverse') !== -1 && (we = 1 - we);
      let U;
      if (((U = zh(we, c, l)), m)) U = Bh(U, m, c);
      else {
        const Se = ms(q, U);
        U = q[Se];
      }
      U = ro(U, c, l);
      let ge = 0;
      if (j) {
        te ? (ge = ce.current) : (ge = ms(_, U)),
          i && (U = ro(U, _[ge - 1] || -1 / 0, _[ge + 1] || 1 / 0));
        const Se = U;
        (U = hs({
          values: _,
          newValue: U,
          index: ge,
        })),
          (i && te) || ((ge = U.indexOf(Se)), (ce.current = ge));
      }
      return {
        newValue: U,
        activeIndex: ge,
      };
    },
    P = pt((ee) => {
      const te = _o(ee, C);
      if (!te) return;
      if (((B.current += 1), ee.type === 'mousemove' && ee.buttons === 0)) {
        Te(ee);
        return;
      }
      const { newValue: ye, activeIndex: he } = me({
        finger: te,
        move: !0,
      });
      Mo({
        sliderRef: V,
        activeIndex: he,
        setActive: E,
      }),
        I(ye),
        !S && B.current > Fh && D(!0),
        J && !Ao(ye, N) && J(ee, ye, he);
    }),
    Te = pt((ee) => {
      const te = _o(ee, C);
      if ((D(!1), !te)) return;
      const { newValue: ye } = me({
        finger: te,
        move: !0,
      });
      E(-1), ee.type === 'touchend' && R(-1), p && p(ee, ye), (C.current = void 0), W();
    }),
    X = pt((ee) => {
      if (r) return;
      Hr() || ee.preventDefault();
      const te = ee.changedTouches[0];
      te != null && (C.current = te.identifier);
      const ye = _o(ee, C);
      if (ye !== !1) {
        const { newValue: xe, activeIndex: Ne } = me({
          finger: ye,
        });
        Mo({
          sliderRef: V,
          activeIndex: Ne,
          setActive: E,
        }),
          I(xe),
          J && !Ao(xe, N) && J(ee, xe, Ne);
      }
      B.current = 0;
      const he = ot(V.current);
      he.addEventListener('touchmove', P), he.addEventListener('touchend', Te);
    }),
    W = b.useCallback(() => {
      const ee = ot(V.current);
      ee.removeEventListener('mousemove', P),
        ee.removeEventListener('mouseup', Te),
        ee.removeEventListener('touchmove', P),
        ee.removeEventListener('touchend', Te);
    }, [Te, P]);
  b.useEffect(() => {
    const { current: ee } = V;
    return (
      ee.addEventListener('touchstart', X, {
        passive: Hr(),
      }),
      () => {
        ee.removeEventListener('touchstart', X, {
          passive: Hr(),
        }),
          W();
      }
    );
  }, [W, X]),
    b.useEffect(() => {
      r && W();
    }, [r, W]);
  const Ce = (ee) => (te) => {
      var ye;
      if (
        ((ye = ee.onMouseDown) == null || ye.call(ee, te),
        r || te.defaultPrevented || te.button !== 0)
      )
        return;
      te.preventDefault();
      const he = _o(te, C);
      if (he !== !1) {
        const { newValue: Ne, activeIndex: se } = me({
          finger: he,
        });
        Mo({
          sliderRef: V,
          activeIndex: se,
          setActive: E,
        }),
          I(Ne),
          J && !Ao(Ne, N) && J(te, Ne, se);
      }
      B.current = 0;
      const xe = ot(V.current);
      xe.addEventListener('mousemove', P), xe.addEventListener('mouseup', Te);
    },
    de = nr(j ? _[0] : c, c, l),
    ke = nr(_[_.length - 1], c, l) - de,
    Le = (ee = {}) => {
      const te = {
          onMouseDown: Ce(ee || {}),
        },
        ye = {
          ...ee,
          ...te,
        };
      return {
        ref: K,
        ...ye,
      };
    },
    Xe = (ee) => (te) => {
      var ye;
      (ye = ee.onMouseOver) == null || ye.call(ee, te);
      const he = Number(te.currentTarget.getAttribute('data-index'));
      R(he);
    },
    Ke = (ee) => (te) => {
      var ye;
      (ye = ee.onMouseLeave) == null || ye.call(ee, te), R(-1);
    };
  return {
    active: O,
    axis: ue,
    axisProps: Uh,
    dragging: S,
    focusedThumbIndex: L,
    getHiddenInputProps: (ee = {}) => {
      var te;
      const ye = {
          onChange: ie(ee || {}),
          onFocus: re(ee || {}),
          onBlur: Z(ee || {}),
        },
        he = {
          ...ee,
          ...ye,
        };
      return {
        tabIndex: v,
        'aria-labelledby': t,
        'aria-orientation': h,
        'aria-valuemax': g(l),
        'aria-valuemin': g(c),
        name: d,
        type: 'range',
        min: e.min,
        max: e.max,
        step: (te = e.step) != null ? te : void 0,
        disabled: r,
        ...he,
        style: {
          ...Ku,
          direction: a ? 'rtl' : 'ltr',
          // So that VoiceOver's focus indicator matches the thumb's dimensions
          width: '100%',
          height: '100%',
        },
      };
    },
    getRootProps: Le,
    getThumbProps: (ee = {}) => {
      const te = {
        onMouseOver: Xe(ee || {}),
        onMouseLeave: Ke(ee || {}),
      };
      return {
        ...ee,
        ...te,
      };
    },
    marks: A,
    open: f,
    range: j,
    rootRef: K,
    trackLeap: ke,
    trackOffset: de,
    values: _,
  };
}
function qh(e) {
  const {
      autoHideDuration: t = null,
      disableWindowBlurListener: o = !1,
      onClose: r,
      open: i,
      resumeHideDuration: a,
    } = e,
    s = b.useRef();
  b.useEffect(() => {
    if (!i) return;
    function T(C) {
      C.defaultPrevented ||
        ((C.key === 'Escape' || C.key === 'Esc') && (r == null || r(C, 'escapeKeyDown')));
    }
    return (
      document.addEventListener('keydown', T),
      () => {
        document.removeEventListener('keydown', T);
      }
    );
  }, [i, r]);
  const l = pt((T, C) => {
      r == null || r(T, C);
    }),
    c = pt((T) => {
      !r ||
        T == null ||
        (clearTimeout(s.current),
        (s.current = setTimeout(() => {
          l(null, 'timeout');
        }, T)));
    });
  b.useEffect(
    () => (
      i && c(t),
      () => {
        clearTimeout(s.current);
      }
    ),
    [i, t, c],
  );
  const d = (T) => {
      r == null || r(T, 'clickaway');
    },
    u = () => {
      clearTimeout(s.current);
    },
    p = b.useCallback(() => {
      t != null && c(a ?? t * 0.5);
    }, [t, a, c]),
    h = (T) => (C) => {
      const O = T.onBlur;
      O == null || O(C), p();
    },
    y = (T) => (C) => {
      const O = T.onFocus;
      O == null || O(C), u();
    },
    g = (T) => (C) => {
      const O = T.onMouseEnter;
      O == null || O(C), u();
    },
    m = (T) => (C) => {
      const O = T.onMouseLeave;
      O == null || O(C), p();
    };
  return (
    b.useEffect(() => {
      if (!o && i)
        return (
          window.addEventListener('focus', p),
          window.addEventListener('blur', u),
          () => {
            window.removeEventListener('focus', p), window.removeEventListener('blur', u);
          }
        );
    }, [o, p, i]),
    {
      getRootProps: (T = {}) => {
        const O = {
          ...$l(e),
          ...T,
        };
        return {
          // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
          // See https://github.com/mui/material-ui/issues/29080
          role: 'presentation',
          ...O,
          onBlur: h(O),
          onFocus: y(O),
          onMouseEnter: g(O),
          onMouseLeave: m(O),
        };
      },
      onClickAway: d,
    }
  );
}
function Lo(e) {
  return parseInt(e, 10) || 0;
}
const Yh = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: 'translateZ(0)',
  },
};
function bs(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const Ul = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l, ...c } = t,
    { current: d } = b.useRef(l != null),
    u = b.useRef(null),
    p = it(o, u),
    h = b.useRef(null),
    y = b.useRef(0),
    [g, m] = b.useState({
      outerHeightStyle: 0,
    }),
    v = b.useCallback(() => {
      const f = u.current,
        S = Tn(f).getComputedStyle(f);
      if (S.width === '0px')
        return {
          outerHeightStyle: 0,
        };
      const D = h.current;
      (D.style.width = S.width),
        (D.value = f.value || t.placeholder || 'x'),
        D.value.slice(-1) ===
          `
` && (D.value += ' ');
      const B = S.boxSizing,
        N = Lo(S.paddingBottom) + Lo(S.paddingTop),
        I = Lo(S.borderBottomWidth) + Lo(S.borderTopWidth),
        J = D.scrollHeight;
      D.value = 'x';
      const j = D.scrollHeight;
      let _ = J;
      a && (_ = Math.max(Number(a) * j, _)),
        i && (_ = Math.min(Number(i) * j, _)),
        (_ = Math.max(_, j));
      const A = _ + (B === 'border-box' ? N + I : 0),
        q = Math.abs(_ - J) <= 1;
      return {
        outerHeightStyle: A,
        overflow: q,
      };
    }, [i, a, t.placeholder]),
    T = (f, R) => {
      const { outerHeightStyle: S, overflow: D } = R;
      return y.current < 20 &&
        ((S > 0 && Math.abs((f.outerHeightStyle || 0) - S) > 1) || f.overflow !== D)
        ? ((y.current += 1),
          {
            overflow: D,
            outerHeightStyle: S,
          })
        : (process.env.NODE_ENV !== 'production' &&
            y.current === 20 &&
            console.error(
              [
                'MUI: Too many re-renders. The layout is unstable.',
                'TextareaAutosize limits the number of renders to prevent an infinite loop.',
              ].join(`
`),
            ),
          f);
    },
    C = b.useCallback(() => {
      const f = v();
      bs(f) || m((R) => T(R, f));
    }, [v]),
    O = () => {
      const f = v();
      bs(f) ||
        qs.flushSync(() => {
          m((R) => T(R, f));
        });
    };
  b.useEffect(() => {
    const f = Qs(() => {
      (y.current = 0), u.current && O();
    });
    let R;
    const S = u.current,
      D = Tn(S);
    return (
      D.addEventListener('resize', f),
      typeof ResizeObserver < 'u' && ((R = new ResizeObserver(f)), R.observe(S)),
      () => {
        f.clear(), D.removeEventListener('resize', f), R && R.disconnect();
      }
    );
  }),
    an(() => {
      C();
    }),
    b.useEffect(() => {
      y.current = 0;
    }, [l]);
  const E = (f) => {
    (y.current = 0), d || C(), r && r(f);
  };
  return /* @__PURE__ */ Ge(b.Fragment, {
    children: [
      /* @__PURE__ */ M('textarea', {
        value: l,
        onChange: E,
        ref: p,
        rows: a,
        style: {
          height: g.outerHeightStyle,
          // Need a large enough difference to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: g.overflow ? 'hidden' : void 0,
          ...s,
        },
        ...c,
      }),
      /* @__PURE__ */ M('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: h,
        tabIndex: -1,
        style: {
          ...Yh.shadow,
          ...s,
          padding: 0,
        },
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (Ul.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    className: n.string,
    /**
     * Maximum number of rows to display.
     */
    maxRows: n.oneOfType([n.number, n.string]),
    /**
     * Minimum number of rows to display.
     * @default 1
     */
    minRows: n.oneOfType([n.number, n.string]),
    /**
     * @ignore
     */
    onChange: n.func,
    /**
     * @ignore
     */
    placeholder: n.string,
    /**
     * @ignore
     */
    style: n.object,
    /**
     * @ignore
     */
    value: n.oneOfType([n.arrayOf(n.string), n.number, n.string]),
  });
const Kh = Ul;
function vs(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function Gh(e = {}) {
  const {
    ignoreAccents: t = !0,
    ignoreCase: o = !0,
    limit: r,
    matchFrom: i = 'any',
    stringify: a,
    trim: s = !1,
  } = e;
  return (l, { inputValue: c, getOptionLabel: d }) => {
    let u = s ? c.trim() : c;
    o && (u = u.toLowerCase()), t && (u = vs(u));
    const p = u
      ? l.filter((h) => {
          let y = (a || d)(h);
          return (
            o && (y = y.toLowerCase()),
            t && (y = vs(y)),
            i === 'start' ? y.indexOf(u) === 0 : y.indexOf(u) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function qr(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const Xh = Gh(),
  gs = 5,
  Jh = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function Zh(e) {
  const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_isActiveElementInListbox: t = Jh,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_classNamePrefix: o = 'Mui',
      autoComplete: r = !1,
      autoHighlight: i = !1,
      autoSelect: a = !1,
      blurOnSelect: s = !1,
      clearOnBlur: l = !e.freeSolo,
      clearOnEscape: c = !1,
      componentName: d = 'useAutocomplete',
      defaultValue: u = e.multiple ? [] : null,
      disableClearable: p = !1,
      disableCloseOnSelect: h = !1,
      disabled: y,
      disabledItemsFocusable: g = !1,
      disableListWrap: m = !1,
      filterOptions: v = Xh,
      filterSelectedOptions: T = !1,
      freeSolo: C = !1,
      getOptionDisabled: O,
      getOptionLabel: E = (k) => {
        var $;
        return ($ = k.label) != null ? $ : k;
      },
      groupBy: f,
      handleHomeEndKeys: R = !e.freeSolo,
      id: S,
      includeInputInList: D = !1,
      inputValue: B,
      isOptionEqualToValue: N = (k, $) => k === $,
      multiple: I = !1,
      onChange: J,
      onClose: j,
      onHighlightChange: _,
      onInputChange: A,
      onOpen: q,
      open: ae,
      openOnFocus: Q = !1,
      options: z,
      readOnly: w = !1,
      selectOnFocus: L = !e.freeSolo,
      value: G,
    } = e,
    V = el(S);
  let H = E;
  H = (k) => {
    const $ = E(k);
    if (typeof $ != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const Y = $ === void 0 ? 'undefined' : `${typeof $} (${$})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${d} returned ${Y} instead of a string for ${JSON.stringify(
            k,
          )}.`,
        );
      }
      return String($);
    }
    return $;
  };
  const K = b.useRef(!1),
    re = b.useRef(!0),
    Z = b.useRef(null),
    ie = b.useRef(null),
    [ce, ue] = b.useState(null),
    [me, P] = b.useState(-1),
    Te = i ? 0 : -1,
    X = b.useRef(Te),
    [W, Ce] = xn({
      controlled: G,
      default: u,
      name: d,
    }),
    [de, ke] = xn({
      controlled: B,
      default: '',
      name: d,
      state: 'inputValue',
    }),
    [Le, Xe] = b.useState(!1),
    Ke = b.useCallback(
      (k, $) => {
        if (!(I ? W.length < $.length : $ !== null) && !l) return;
        let ne;
        if (I) ne = '';
        else if ($ == null) ne = '';
        else {
          const fe = H($);
          ne = typeof fe == 'string' ? fe : '';
        }
        de !== ne && (ke(ne), A && A(k, ne, 'reset'));
      },
      [H, de, I, A, ke, l, W],
    ),
    [je, Ze] = xn({
      controlled: ae,
      default: !1,
      name: d,
      state: 'open',
    }),
    [ee, te] = b.useState(!0),
    ye = !I && W != null && de === H(W),
    he = je && !w,
    xe = he
      ? v(
          z.filter((k) => !(T && (I ? W : [W]).some(($) => $ !== null && N(k, $)))),
          // we use the empty string to manipulate `filterOptions` to not filter any options
          // i.e. the filter predicate always returns true
          {
            inputValue: ye && ee ? '' : de,
            getOptionLabel: H,
          },
        )
      : [],
    Ne = qu({
      filteredOptions: xe,
      value: W,
    });
  b.useEffect(() => {
    const k = W !== Ne.value;
    (Le && !k) || (C && !k) || Ke(null, W);
  }, [W, Ke, Le, Ne.value, C]);
  const se = je && xe.length > 0 && !w;
  if (process.env.NODE_ENV !== 'production' && W !== null && !C && z.length > 0) {
    const k = (I ? W : [W]).filter(($) => !z.some((Y) => N(Y, $)));
    k.length > 0 &&
      console.warn(
        [
          `MUI: The value provided to ${d} is invalid.`,
          `None of the options match with \`${
            k.length > 1 ? JSON.stringify(k) : JSON.stringify(k[0])
          }\`.`,
          'You can use the `isOptionEqualToValue` prop to customize the equality test.',
        ].join(`
`),
      );
  }
  const we = pt((k) => {
    k === -1 ? Z.current.focus() : ce.querySelector(`[data-tag-index="${k}"]`).focus();
  });
  b.useEffect(() => {
    I && me > W.length - 1 && (P(-1), we(-1));
  }, [W, I, me, we]);
  function U(k, $) {
    if (!ie.current || k === -1) return -1;
    let Y = k;
    for (;;) {
      if (($ === 'next' && Y === xe.length) || ($ === 'previous' && Y === -1)) return -1;
      const ne = ie.current.querySelector(`[data-option-index="${Y}"]`),
        fe = g ? !1 : !ne || ne.disabled || ne.getAttribute('aria-disabled') === 'true';
      if ((ne && !ne.hasAttribute('tabindex')) || fe) Y += $ === 'next' ? 1 : -1;
      else return Y;
    }
  }
  const ge = pt(({ event: k, index: $, reason: Y = 'auto' }) => {
      if (
        ((X.current = $),
        $ === -1
          ? Z.current.removeAttribute('aria-activedescendant')
          : Z.current.setAttribute('aria-activedescendant', `${V}-option-${$}`),
        _ && _(k, $ === -1 ? null : xe[$], Y),
        !ie.current)
      )
        return;
      const ne = ie.current.querySelector(`[role="option"].${o}-focused`);
      ne && (ne.classList.remove(`${o}-focused`), ne.classList.remove(`${o}-focusVisible`));
      let fe = ie.current;
      if (
        (ie.current.getAttribute('role') !== 'listbox' &&
          (fe = ie.current.parentElement.querySelector('[role="listbox"]')),
        !fe)
      )
        return;
      if ($ === -1) {
        fe.scrollTop = 0;
        return;
      }
      const be = ie.current.querySelector(`[data-option-index="${$}"]`);
      if (
        be &&
        (be.classList.add(`${o}-focused`),
        Y === 'keyboard' && be.classList.add(`${o}-focusVisible`),
        fe.scrollHeight > fe.clientHeight && Y !== 'mouse')
      ) {
        const ve = be,
          Re = fe.clientHeight + fe.scrollTop,
          Oe = ve.offsetTop + ve.offsetHeight;
        Oe > Re
          ? (fe.scrollTop = Oe - fe.clientHeight)
          : ve.offsetTop - ve.offsetHeight * (f ? 1.3 : 0) < fe.scrollTop &&
            (fe.scrollTop = ve.offsetTop - ve.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    Se = pt(({ event: k, diff: $, direction: Y = 'next', reason: ne = 'auto' }) => {
      if (!he) return;
      const be = U(
        (() => {
          const ve = xe.length - 1;
          if ($ === 'reset') return Te;
          if ($ === 'start') return 0;
          if ($ === 'end') return ve;
          const Re = X.current + $;
          return Re < 0
            ? Re === -1 && D
              ? -1
              : (m && X.current !== -1) || Math.abs($) > 1
              ? 0
              : ve
            : Re > ve
            ? Re === ve + 1 && D
              ? -1
              : m || Math.abs($) > 1
              ? ve
              : 0
            : Re;
        })(),
        Y,
      );
      if (
        (ge({
          index: be,
          reason: ne,
          event: k,
        }),
        r && $ !== 'reset')
      )
        if (be === -1) Z.current.value = de;
        else {
          const ve = H(xe[be]);
          (Z.current.value = ve),
            ve.toLowerCase().indexOf(de.toLowerCase()) === 0 &&
              de.length > 0 &&
              Z.current.setSelectionRange(de.length, ve.length);
        }
    }),
    ft = () => {
      const k = ($, Y) => {
        const ne = $ ? H($) : '',
          fe = Y ? H(Y) : '';
        return ne === fe;
      };
      if (
        X.current !== -1 &&
        Ne.filteredOptions &&
        Ne.filteredOptions.length !== xe.length &&
        (I
          ? W.length === Ne.value.length && Ne.value.every(($, Y) => H(W[Y]) === H($))
          : k(Ne.value, W))
      ) {
        const $ = Ne.filteredOptions[X.current];
        if ($ && xe.some((ne) => H(ne) === H($))) return !0;
      }
      return !1;
    },
    ht = b.useCallback(() => {
      if (!he || ft()) return;
      const k = I ? W[0] : W;
      if (xe.length === 0 || k == null) {
        Se({
          diff: 'reset',
        });
        return;
      }
      if (ie.current) {
        if (k != null) {
          const $ = xe[X.current];
          if (I && $ && qr(W, (ne) => N($, ne)) !== -1) return;
          const Y = qr(xe, (ne) => N(ne, k));
          Y === -1
            ? Se({
                diff: 'reset',
              })
            : ge({
                index: Y,
              });
          return;
        }
        if (X.current >= xe.length - 1) {
          ge({
            index: xe.length - 1,
          });
          return;
        }
        ge({
          index: X.current,
        });
      }
    }, [
      // Only sync the highlighted index when the option switch between empty and not
      xe.length,
      // Don't sync the highlighted index with the value when multiple
      // eslint-disable-next-line react-hooks/exhaustive-deps
      I ? !1 : W,
      T,
      Se,
      ge,
      he,
      de,
      I,
    ]),
    st = pt((k) => {
      qo(ie, k), k && ht();
    });
  process.env.NODE_ENV !== 'production' &&
    b.useEffect(() => {
      (!Z.current || Z.current.nodeName !== 'INPUT') &&
        (Z.current && Z.current.nodeName === 'TEXTAREA'
          ? console.warn(
              [
                `A textarea element was provided to ${d} where input was expected.`,
                'This is not a supported scenario but it may work under certain conditions.',
                'A textarea keyboard navigation may conflict with Autocomplete controls (e.g. enter and arrow keys).',
                'Make sure to test keyboard navigation and add custom event handlers if necessary.',
              ].join(`
`),
            )
          : console.error(
              [
                `MUI: Unable to find the input element. It was resolved to ${Z.current} while an HTMLInputElement was expected.`,
                `Instead, ${d} expects an input element.`,
                '',
                d === 'useAutocomplete'
                  ? 'Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed.'
                  : 'Make sure you have customized the input component correctly.',
              ].join(`
`),
            ));
    }, [d]),
    b.useEffect(() => {
      ht();
    }, [ht]);
  const Et = (k) => {
      je || (Ze(!0), te(!0), q && q(k));
    },
    xt = (k, $) => {
      je && (Ze(!1), j && j(k, $));
    },
    Qe = (k, $, Y, ne) => {
      if (I) {
        if (W.length === $.length && W.every((fe, be) => fe === $[be])) return;
      } else if (W === $) return;
      J && J(k, $, Y, ne), Ce($);
    },
    lt = b.useRef(!1),
    ut = (k, $, Y = 'selectOption', ne = 'options') => {
      let fe = Y,
        be = $;
      if (I) {
        if (((be = Array.isArray(W) ? W.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Re = be.filter((Oe) => N($, Oe));
          Re.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${d} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Re.length} matches.`,
              ].join(`
`),
            );
        }
        const ve = qr(be, (Re) => N($, Re));
        ve === -1 ? be.push($) : ne !== 'freeSolo' && (be.splice(ve, 1), (fe = 'removeOption'));
      }
      Ke(k, be),
        Qe(k, be, fe, {
          option: $,
        }),
        !h && (!k || (!k.ctrlKey && !k.metaKey)) && xt(k, fe),
        (s === !0 || (s === 'touch' && lt.current) || (s === 'mouse' && !lt.current)) &&
          Z.current.blur();
    };
  function Wt(k, $) {
    if (k === -1) return -1;
    let Y = k;
    for (;;) {
      if (($ === 'next' && Y === W.length) || ($ === 'previous' && Y === -1)) return -1;
      const ne = ce.querySelector(`[data-tag-index="${Y}"]`);
      if (
        !ne ||
        !ne.hasAttribute('tabindex') ||
        ne.disabled ||
        ne.getAttribute('aria-disabled') === 'true'
      )
        Y += $ === 'next' ? 1 : -1;
      else return Y;
    }
  }
  const Ht = (k, $) => {
      if (!I) return;
      de === '' && xt(k, 'toggleInput');
      let Y = me;
      me === -1
        ? de === '' && $ === 'previous' && (Y = W.length - 1)
        : ((Y += $ === 'next' ? 1 : -1), Y < 0 && (Y = 0), Y === W.length && (Y = -1)),
        (Y = Wt(Y, $)),
        P(Y),
        we(Y);
    },
    nn = (k) => {
      (K.current = !0), ke(''), A && A(k, '', 'clear'), Qe(k, I ? [] : null, 'clear');
    },
    Ot = (k) => ($) => {
      if (
        (k.onKeyDown && k.onKeyDown($),
        !$.defaultMuiPrevented &&
          (me !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf($.key) === -1 && (P(-1), we(-1)),
          $.which !== 229))
      )
        switch ($.key) {
          case 'Home':
            he &&
              R &&
              ($.preventDefault(),
              Se({
                diff: 'start',
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }));
            break;
          case 'End':
            he &&
              R &&
              ($.preventDefault(),
              Se({
                diff: 'end',
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }));
            break;
          case 'PageUp':
            $.preventDefault(),
              Se({
                diff: -gs,
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }),
              Et($);
            break;
          case 'PageDown':
            $.preventDefault(),
              Se({
                diff: gs,
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }),
              Et($);
            break;
          case 'ArrowDown':
            $.preventDefault(),
              Se({
                diff: 1,
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }),
              Et($);
            break;
          case 'ArrowUp':
            $.preventDefault(),
              Se({
                diff: -1,
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }),
              Et($);
            break;
          case 'ArrowLeft':
            Ht($, 'previous');
            break;
          case 'ArrowRight':
            Ht($, 'next');
            break;
          case 'Enter':
            if (X.current !== -1 && he) {
              const Y = xe[X.current],
                ne = O ? O(Y) : !1;
              if (($.preventDefault(), ne)) return;
              ut($, Y, 'selectOption'),
                r && Z.current.setSelectionRange(Z.current.value.length, Z.current.value.length);
            } else
              C &&
                de !== '' &&
                ye === !1 &&
                (I && $.preventDefault(), ut($, de, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            he
              ? ($.preventDefault(), $.stopPropagation(), xt($, 'escape'))
              : c &&
                (de !== '' || (I && W.length > 0)) &&
                ($.preventDefault(), $.stopPropagation(), nn($));
            break;
          case 'Backspace':
            if (I && !w && de === '' && W.length > 0) {
              const Y = me === -1 ? W.length - 1 : me,
                ne = W.slice();
              ne.splice(Y, 1),
                Qe($, ne, 'removeOption', {
                  option: W[Y],
                });
            }
            break;
          case 'Delete':
            if (I && !w && de === '' && W.length > 0 && me !== -1) {
              const Y = me,
                ne = W.slice();
              ne.splice(Y, 1),
                Qe($, ne, 'removeOption', {
                  option: W[Y],
                });
            }
            break;
        }
    },
    qt = (k) => {
      Xe(!0), Q && !K.current && Et(k);
    },
    Yt = (k) => {
      if (t(ie)) {
        Z.current.focus();
        return;
      }
      Xe(!1),
        (re.current = !0),
        (K.current = !1),
        a && X.current !== -1 && he
          ? ut(k, xe[X.current], 'blur')
          : a && C && de !== ''
          ? ut(k, de, 'blur', 'freeSolo')
          : l && Ke(k, W),
        xt(k, 'blur');
    },
    Tt = (k) => {
      const $ = k.target.value;
      de !== $ && (ke($), te(!1), A && A(k, $, 'input')),
        $ === '' ? !p && !I && Qe(k, null, 'clear') : Et(k);
    },
    hn = (k) => {
      const $ = Number(k.currentTarget.getAttribute('data-option-index'));
      X.current !== $ &&
        ge({
          event: k,
          index: $,
          reason: 'mouse',
        });
    },
    on = (k) => {
      ge({
        event: k,
        index: Number(k.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (lt.current = !0);
    },
    Ct = (k) => {
      const $ = Number(k.currentTarget.getAttribute('data-option-index'));
      ut(k, xe[$], 'selectOption'), (lt.current = !1);
    },
    Dt = (k) => ($) => {
      const Y = W.slice();
      Y.splice(k, 1),
        Qe($, Y, 'removeOption', {
          option: W[k],
        });
    },
    Kt = (k) => {
      je ? xt(k, 'toggleInput') : Et(k);
    },
    bn = (k) => {
      k.currentTarget.contains(k.target) && k.target.getAttribute('id') !== V && k.preventDefault();
    },
    at = (k) => {
      k.currentTarget.contains(k.target) &&
        (Z.current.focus(),
        L &&
          re.current &&
          Z.current.selectionEnd - Z.current.selectionStart === 0 &&
          Z.current.select(),
        (re.current = !1));
    },
    x = (k) => {
      (de === '' || !je) && Kt(k);
    };
  let F = C && de.length > 0;
  F = F || (I ? W.length > 0 : W !== null);
  let le = xe;
  if (f) {
    const k = /* @__PURE__ */ new Map();
    let $ = !1;
    le = xe.reduce((Y, ne, fe) => {
      const be = f(ne);
      return (
        Y.length > 0 && Y[Y.length - 1].group === be
          ? Y[Y.length - 1].options.push(ne)
          : (process.env.NODE_ENV !== 'production' &&
              (k.get(be) &&
                !$ &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${d} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                ($ = !0)),
              k.set(be, !0)),
            Y.push({
              key: fe,
              index: fe,
              group: be,
              options: [ne],
            })),
        Y
      );
    }, []);
  }
  return (
    y && Le && Yt(),
    {
      getRootProps: (k = {}) => ({
        'aria-owns': se ? `${V}-listbox` : null,
        ...k,
        onKeyDown: Ot(k),
        onMouseDown: bn,
        onClick: at,
      }),
      getInputLabelProps: () => ({
        id: `${V}-label`,
        htmlFor: V,
      }),
      getInputProps: () => ({
        id: V,
        value: de,
        onBlur: Yt,
        onFocus: qt,
        onChange: Tt,
        onMouseDown: x,
        // if open then this is handled imperatively so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': he ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': se ? `${V}-listbox` : void 0,
        'aria-expanded': se,
        // Disable browser's suggestion that might overlap with the popup.
        // Handle autocomplete but not autofill.
        autoComplete: 'off',
        ref: Z,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: y,
      }),
      getClearProps: () => ({
        tabIndex: -1,
        onClick: nn,
      }),
      getPopupIndicatorProps: () => ({
        tabIndex: -1,
        onClick: Kt,
      }),
      getTagProps: ({ index: k }) => ({
        key: k,
        'data-tag-index': k,
        tabIndex: -1,
        ...(!w && {
          onDelete: Dt(k),
        }),
      }),
      getListboxProps: () => ({
        role: 'listbox',
        id: `${V}-listbox`,
        'aria-labelledby': `${V}-label`,
        ref: st,
        onMouseDown: (k) => {
          k.preventDefault();
        },
      }),
      getOptionProps: ({ index: k, option: $ }) => {
        const Y = (I ? W : [W]).some((fe) => fe != null && N($, fe)),
          ne = O ? O($) : !1;
        return {
          key: H($),
          tabIndex: -1,
          role: 'option',
          id: `${V}-option-${k}`,
          onMouseMove: hn,
          onClick: Ct,
          onTouchStart: on,
          'data-option-index': k,
          'aria-disabled': ne,
          'aria-selected': Y,
        };
      },
      id: V,
      inputValue: de,
      value: W,
      dirty: F,
      expanded: he && ce,
      popupOpen: he,
      focused: Le || me !== -1,
      anchorEl: ce,
      setAnchorEl: ue,
      focusedTag: me,
      groupedOptions: le,
    }
  );
}
function Qh(e) {
  return Pe('MuiSvgIcon', e);
}
_e('MuiSvgIcon', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'colorAction',
  'colorError',
  'colorDisabled',
  'fontSizeInherit',
  'fontSizeSmall',
  'fontSizeMedium',
  'fontSizeLarge',
]);
const eb = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = {
        root: ['root', t !== 'inherit' && `color${oe(t)}`, `fontSize${oe(o)}`],
      };
    return De(i, Qh, r);
  },
  tb = pe('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'inherit' && t[`color${oe(o.color)}`],
        t[`fontSize${oe(o.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var o, r, i, a, s, l, c, d, u, p, h, y, g, m, v, T, C;
    return {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
      fill: 'currentColor',
      flexShrink: 0,
      transition:
        (o = e.transitions) == null || (r = o.create) == null
          ? void 0
          : r.call(o, 'fill', {
              duration:
                (i = e.transitions) == null || (a = i.duration) == null ? void 0 : a.shorter,
            }),
      fontSize: {
        inherit: 'inherit',
        small:
          ((s = e.typography) == null || (l = s.pxToRem) == null ? void 0 : l.call(s, 20)) ||
          '1.25rem',
        medium:
          ((c = e.typography) == null || (d = c.pxToRem) == null ? void 0 : d.call(c, 24)) ||
          '1.5rem',
        large:
          ((u = e.typography) == null || (p = u.pxToRem) == null ? void 0 : p.call(u, 35)) ||
          '2.1875rem',
      }[t.fontSize],
      // TODO v5 deprecate, v6 remove for sx
      color:
        (h = (y = (e.vars || e).palette) == null || (g = y[t.color]) == null ? void 0 : g.main) !=
        null
          ? h
          : {
              action:
                (m = (e.vars || e).palette) == null || (v = m.action) == null ? void 0 : v.active,
              disabled:
                (T = (e.vars || e).palette) == null || (C = T.action) == null ? void 0 : C.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  Wi = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiSvgIcon',
      }),
      {
        children: i,
        className: a,
        color: s = 'inherit',
        component: l = 'svg',
        fontSize: c = 'medium',
        htmlColor: d,
        inheritViewBox: u = !1,
        titleAccess: p,
        viewBox: h = '0 0 24 24',
        ...y
      } = r,
      g = {
        ...r,
        color: s,
        component: l,
        fontSize: c,
        instanceFontSize: t.fontSize,
        inheritViewBox: u,
        viewBox: h,
      },
      m = {};
    u || (m.viewBox = h);
    const v = eb(g);
    return /* @__PURE__ */ Ge(tb, {
      as: l,
      className: Ee(v.root, a),
      focusable: 'false',
      color: d,
      'aria-hidden': p ? void 0 : !0,
      role: p ? 'img' : void 0,
      ref: o,
      ...m,
      ...y,
      ownerState: g,
      children: [
        i,
        p
          ? /* @__PURE__ */ M('title', {
              children: p,
            })
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Wi.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * Node passed into the SVG element.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
     * @default 'inherit'
     */
    color: n.oneOfType([
      n.oneOf([
        'inherit',
        'action',
        'disabled',
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
      ]),
      n.string,
    ]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     * @default 'medium'
     */
    fontSize: n.oneOfType([n.oneOf(['inherit', 'large', 'medium', 'small']), n.string]),
    /**
     * Applies a color attribute to the SVG element.
     */
    htmlColor: n.string,
    /**
     * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
     * prop will be ignored.
     * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
     * `component`'s viewBox to the root node.
     * @default false
     */
    inheritViewBox: n.bool,
    /**
     * The shape-rendering attribute. The behavior of the different options is described on the
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     * If you are having issues with blurry icons you should investigate this prop.
     */
    shapeRendering: n.string,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess: n.string,
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height),
     * and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     * @default '0 0 24 24'
     */
    viewBox: n.string,
  });
Wi.muiName = 'SvgIcon';
const ys = Wi;
function Gn(e, t) {
  function o(r, i) {
    return /* @__PURE__ */ M(ys, {
      'data-testid': `${t}Icon`,
      ref: i,
      ...r,
      children: e,
    });
  }
  return (
    process.env.NODE_ENV !== 'production' && (o.displayName = `${t}Icon`),
    (o.muiName = ys.muiName),
    /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(o))
  );
}
function Wl(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (o[i] = e[i]);
  return o;
}
function ui(e, t) {
  return (
    (ui = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    ui(e, t)
  );
}
function Hl(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), ui(e, t);
}
const Es = {
  disabled: !1,
};
var nb =
  process.env.NODE_ENV !== 'production'
    ? n.oneOfType([
        n.number,
        n.shape({
          enter: n.number,
          exit: n.number,
          appear: n.number,
        }).isRequired,
      ])
    : null;
process.env.NODE_ENV !== 'production' &&
  n.oneOfType([
    n.string,
    n.shape({
      enter: n.string,
      exit: n.string,
      active: n.string,
    }),
    n.shape({
      enter: n.string,
      enterDone: n.string,
      enterActive: n.string,
      exit: n.string,
      exitDone: n.string,
      exitActive: n.string,
    }),
  ]);
const or = Ft.createContext(null);
var ob = function (t) {
    return t.scrollTop;
  },
  so = 'unmounted',
  gn = 'exited',
  yn = 'entering',
  An = 'entered',
  di = 'exiting',
  ln = /* @__PURE__ */ (function (e) {
    Hl(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = i,
        l = s && !s.isMounting ? r.enter : r.appear,
        c;
      return (
        (a.appearStatus = null),
        r.in
          ? l
            ? ((c = gn), (a.appearStatus = yn))
            : (c = An)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = so)
          : (c = gn),
        (a.state = {
          status: c,
        }),
        (a.nextCallback = null),
        a
      );
    }
    t.getDerivedStateFromProps = function (i, a) {
      var s = i.in;
      return s && a.status === so
        ? {
            status: gn,
          }
        : null;
    };
    var o = t.prototype;
    return (
      (o.componentDidMount = function () {
        this.updateStatus(!0, this.appearStatus);
      }),
      (o.componentDidUpdate = function (i) {
        var a = null;
        if (i !== this.props) {
          var s = this.state.status;
          this.props.in ? s !== yn && s !== An && (a = yn) : (s === yn || s === An) && (a = di);
        }
        this.updateStatus(!1, a);
      }),
      (o.componentWillUnmount = function () {
        this.cancelNextCallback();
      }),
      (o.getTimeouts = function () {
        var i = this.props.timeout,
          a,
          s,
          l;
        return (
          (a = s = l = i),
          i != null &&
            typeof i != 'number' &&
            ((a = i.exit), (s = i.enter), (l = i.appear !== void 0 ? i.appear : s)),
          {
            exit: a,
            enter: s,
            appear: l,
          }
        );
      }),
      (o.updateStatus = function (i, a) {
        if ((i === void 0 && (i = !1), a !== null))
          if ((this.cancelNextCallback(), a === yn)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : $o.findDOMNode(this);
              s && ob(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === gn &&
            this.setState({
              status: so,
            });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [$o.findDOMNode(this), l],
          d = c[0],
          u = c[1],
          p = this.getTimeouts(),
          h = l ? p.appear : p.enter;
        if ((!i && !s) || Es.disabled) {
          this.safeSetState(
            {
              status: An,
            },
            function () {
              a.props.onEntered(d);
            },
          );
          return;
        }
        this.props.onEnter(d, u),
          this.safeSetState(
            {
              status: yn,
            },
            function () {
              a.props.onEntering(d, u),
                a.onTransitionEnd(h, function () {
                  a.safeSetState(
                    {
                      status: An,
                    },
                    function () {
                      a.props.onEntered(d, u);
                    },
                  );
                });
            },
          );
      }),
      (o.performExit = function () {
        var i = this,
          a = this.props.exit,
          s = this.getTimeouts(),
          l = this.props.nodeRef ? void 0 : $o.findDOMNode(this);
        if (!a || Es.disabled) {
          this.safeSetState(
            {
              status: gn,
            },
            function () {
              i.props.onExited(l);
            },
          );
          return;
        }
        this.props.onExit(l),
          this.safeSetState(
            {
              status: di,
            },
            function () {
              i.props.onExiting(l),
                i.onTransitionEnd(s.exit, function () {
                  i.safeSetState(
                    {
                      status: gn,
                    },
                    function () {
                      i.props.onExited(l);
                    },
                  );
                });
            },
          );
      }),
      (o.cancelNextCallback = function () {
        this.nextCallback !== null && (this.nextCallback.cancel(), (this.nextCallback = null));
      }),
      (o.safeSetState = function (i, a) {
        (a = this.setNextCallback(a)), this.setState(i, a);
      }),
      (o.setNextCallback = function (i) {
        var a = this,
          s = !0;
        return (
          (this.nextCallback = function (l) {
            s && ((s = !1), (a.nextCallback = null), i(l));
          }),
          (this.nextCallback.cancel = function () {
            s = !1;
          }),
          this.nextCallback
        );
      }),
      (o.onTransitionEnd = function (i, a) {
        this.setNextCallback(a);
        var s = this.props.nodeRef ? this.props.nodeRef.current : $o.findDOMNode(this),
          l = i == null && !this.props.addEndListener;
        if (!s || l) {
          setTimeout(this.nextCallback, 0);
          return;
        }
        if (this.props.addEndListener) {
          var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback],
            d = c[0],
            u = c[1];
          this.props.addEndListener(d, u);
        }
        i != null && setTimeout(this.nextCallback, i);
      }),
      (o.render = function () {
        var i = this.state.status;
        if (i === so) return null;
        var a = this.props,
          s = a.children;
        a.in,
          a.mountOnEnter,
          a.unmountOnExit,
          a.appear,
          a.enter,
          a.exit,
          a.timeout,
          a.addEndListener,
          a.onEnter,
          a.onEntering,
          a.onEntered,
          a.onExit,
          a.onExiting,
          a.onExited,
          a.nodeRef;
        var l = Wl(a, [
          'children',
          'in',
          'mountOnEnter',
          'unmountOnExit',
          'appear',
          'enter',
          'exit',
          'timeout',
          'addEndListener',
          'onEnter',
          'onEntering',
          'onEntered',
          'onExit',
          'onExiting',
          'onExited',
          'nodeRef',
        ]);
        return (
          // allows for nested Transitions
          /* @__PURE__ */ Ft.createElement(
            or.Provider,
            {
              value: null,
            },
            typeof s == 'function' ? s(i, l) : Ft.cloneElement(Ft.Children.only(s), l),
          )
        );
      }),
      t
    );
  })(Ft.Component);
ln.contextType = or;
ln.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
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
        nodeRef: n.shape({
          current:
            typeof Element > 'u'
              ? n.any
              : function (e, t, o, r, i, a) {
                  var s = e[t];
                  return n.instanceOf(
                    s && 'ownerDocument' in s ? s.ownerDocument.defaultView.Element : Element,
                  )(e, t, o, r, i, a);
                },
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
        children: n.oneOfType([n.func.isRequired, n.element.isRequired]).isRequired,
        /**
         * Show the component; triggers the enter or exit states
         */
        in: n.bool,
        /**
         * By default the child component is mounted immediately along with
         * the parent `Transition` component. If you want to "lazy mount" the component on the
         * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
         * mounted, even on "exited", unless you also specify `unmountOnExit`.
         */
        mountOnEnter: n.bool,
        /**
         * By default the child component stays mounted after it reaches the `'exited'` state.
         * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
         */
        unmountOnExit: n.bool,
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
        appear: n.bool,
        /**
         * Enable or disable enter transitions.
         */
        enter: n.bool,
        /**
         * Enable or disable exit transitions.
         */
        exit: n.bool,
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
        timeout: function (t) {
          var o = nb;
          t.addEndListener || (o = o.isRequired);
          for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            i[a - 1] = arguments[a];
          return o.apply(void 0, [t].concat(i));
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
        addEndListener: n.func,
        /**
         * Callback fired before the "entering" status is applied. An extra parameter
         * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
         *
         * **Note**: when `nodeRef` prop is passed, `node` is not passed.
         *
         * @type Function(node: HtmlElement, isAppearing: bool) -> void
         */
        onEnter: n.func,
        /**
         * Callback fired after the "entering" status is applied. An extra parameter
         * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
         *
         * **Note**: when `nodeRef` prop is passed, `node` is not passed.
         *
         * @type Function(node: HtmlElement, isAppearing: bool)
         */
        onEntering: n.func,
        /**
         * Callback fired after the "entered" status is applied. An extra parameter
         * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
         *
         * **Note**: when `nodeRef` prop is passed, `node` is not passed.
         *
         * @type Function(node: HtmlElement, isAppearing: bool) -> void
         */
        onEntered: n.func,
        /**
         * Callback fired before the "exiting" status is applied.
         *
         * **Note**: when `nodeRef` prop is passed, `node` is not passed.
         *
         * @type Function(node: HtmlElement) -> void
         */
        onExit: n.func,
        /**
         * Callback fired after the "exiting" status is applied.
         *
         * **Note**: when `nodeRef` prop is passed, `node` is not passed.
         *
         * @type Function(node: HtmlElement) -> void
         */
        onExiting: n.func,
        /**
         * Callback fired after the "exited" status is applied.
         *
         * **Note**: when `nodeRef` prop is passed, `node` is not passed
         *
         * @type Function(node: HtmlElement) -> void
         */
        onExited: n.func,
      }
    : {};
function In() {}
ln.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: In,
  onEntering: In,
  onEntered: In,
  onExit: In,
  onExiting: In,
  onExited: In,
};
ln.UNMOUNTED = so;
ln.EXITED = gn;
ln.ENTERING = yn;
ln.ENTERED = An;
ln.EXITING = di;
const ql = ln;
function rb(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Hi(e, t) {
  var o = function (a) {
      return t && Fo(a) ? t(a) : a;
    },
    r = /* @__PURE__ */ Object.create(null);
  return (
    e &&
      nu
        .map(e, function (i) {
          return i;
        })
        .forEach(function (i) {
          r[i.key] = o(i);
        }),
    r
  );
}
function ib(e, t) {
  (e = e || {}), (t = t || {});
  function o(u) {
    return u in t ? t[u] : e[u];
  }
  var r = /* @__PURE__ */ Object.create(null),
    i = [];
  for (var a in e) a in t ? i.length && ((r[a] = i), (i = [])) : i.push(a);
  var s,
    l = {};
  for (var c in t) {
    if (r[c])
      for (s = 0; s < r[c].length; s++) {
        var d = r[c][s];
        l[r[c][s]] = o(d);
      }
    l[c] = o(c);
  }
  for (s = 0; s < i.length; s++) l[i[s]] = o(i[s]);
  return l;
}
function En(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function ab(e, t) {
  return Hi(e.children, function (o) {
    return zo(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: En(o, 'appear', e),
      enter: En(o, 'enter', e),
      exit: En(o, 'exit', e),
    });
  });
}
function sb(e, t, o) {
  var r = Hi(e.children),
    i = ib(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (Fo(s)) {
        var l = a in t,
          c = a in r,
          d = t[a],
          u = Fo(d) && !d.props.in;
        c && (!l || u)
          ? (i[a] = zo(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: En(s, 'exit', e),
              enter: En(s, 'enter', e),
            }))
          : !c && l && !u
          ? (i[a] = zo(s, {
              in: !1,
            }))
          : c &&
            l &&
            Fo(d) &&
            (i[a] = zo(s, {
              onExited: o.bind(null, s),
              in: d.props.in,
              exit: En(s, 'exit', e),
              enter: En(s, 'enter', e),
            }));
      }
    }),
    i
  );
}
var lb =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  cb = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  qi = /* @__PURE__ */ (function (e) {
    Hl(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = a.handleExited.bind(rb(a));
      return (
        (a.state = {
          contextValue: {
            isMounting: !0,
          },
          handleExited: s,
          firstRender: !0,
        }),
        a
      );
    }
    var o = t.prototype;
    return (
      (o.componentDidMount = function () {
        (this.mounted = !0),
          this.setState({
            contextValue: {
              isMounting: !1,
            },
          });
      }),
      (o.componentWillUnmount = function () {
        this.mounted = !1;
      }),
      (t.getDerivedStateFromProps = function (i, a) {
        var s = a.children,
          l = a.handleExited,
          c = a.firstRender;
        return {
          children: c ? ab(i, l) : sb(i, s, l),
          firstRender: !1,
        };
      }),
      (o.handleExited = function (i, a) {
        var s = Hi(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(a),
          this.mounted &&
            this.setState(function (l) {
              var c = Yo({}, l.children);
              return (
                delete c[i.key],
                {
                  children: c,
                }
              );
            }));
      }),
      (o.render = function () {
        var i = this.props,
          a = i.component,
          s = i.childFactory,
          l = Wl(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          d = lb(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? /* @__PURE__ */ Ft.createElement(
                or.Provider,
                {
                  value: c,
                },
                d,
              )
            : /* @__PURE__ */ Ft.createElement(
                or.Provider,
                {
                  value: c,
                },
                /* @__PURE__ */ Ft.createElement(a, l, d),
              )
        );
      }),
      t
    );
  })(Ft.Component);
qi.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        /**
         * `<TransitionGroup>` renders a `<div>` by default. You can change this
         * behavior by providing a `component` prop.
         * If you use React v16+ and would like to avoid a wrapping `<div>` element
         * you can pass in `component={null}`. This is useful if the wrapping div
         * borks your css styles.
         */
        component: n.any,
        /**
         * A set of `<Transition>` components, that are toggled `in` and out as they
         * leave. the `<TransitionGroup>` will inject specific transition props, so
         * remember to spread them through if you are wrapping the `<Transition>` as
         * with our `<Fade>` example.
         *
         * While this component is meant for multiple `Transition` or `CSSTransition`
         * children, sometimes you may want to have a single transition child with
         * content that you want to be transitioned out and in when you change it
         * (e.g. routes, images etc.) In that case you can change the `key` prop of
         * the transition child as you change its content, this will cause
         * `TransitionGroup` to transition the child out and back in.
         */
        children: n.node,
        /**
         * A convenience prop that enables or disables appear animations
         * for all children. Note that specifying this will override any defaults set
         * on individual children Transitions.
         */
        appear: n.bool,
        /**
         * A convenience prop that enables or disables enter animations
         * for all children. Note that specifying this will override any defaults set
         * on individual children Transitions.
         */
        enter: n.bool,
        /**
         * A convenience prop that enables or disables exit animations
         * for all children. Note that specifying this will override any defaults set
         * on individual children Transitions.
         */
        exit: n.bool,
        /**
         * You may need to apply reactive updates to a child as it is exiting.
         * This is generally done by using `cloneElement` however in the case of an exiting
         * child the element has already been removed and not accessible to the consumer.
         *
         * If you do need to update a child as it leaves you can provide a `childFactory`
         * to wrap every child, even the ones that are leaving.
         *
         * @type Function(child: ReactElement) -> ReactElement
         */
        childFactory: n.func,
      }
    : {};
qi.defaultProps = cb;
const ub = qi,
  Yl = (e) => e.scrollTop;
function rr(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function db(e) {
  return Pe('MuiPaper', e);
}
_e('MuiPaper', [
  'root',
  'rounded',
  'outlined',
  'elevation',
  'elevation0',
  'elevation1',
  'elevation2',
  'elevation3',
  'elevation4',
  'elevation5',
  'elevation6',
  'elevation7',
  'elevation8',
  'elevation9',
  'elevation10',
  'elevation11',
  'elevation12',
  'elevation13',
  'elevation14',
  'elevation15',
  'elevation16',
  'elevation17',
  'elevation18',
  'elevation19',
  'elevation20',
  'elevation21',
  'elevation22',
  'elevation23',
  'elevation24',
]);
const pb = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = {
        root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`],
      };
    return De(a, db, i);
  },
  fb = pe('div', {
    name: 'MuiPaper',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[o.variant],
        !o.square && t.rounded,
        o.variant === 'elevation' && t[`elevation${o.elevation}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var o;
    return {
      backgroundColor: (e.vars || e).palette.background.paper,
      color: (e.vars || e).palette.text.primary,
      transition: e.transitions.create('box-shadow'),
      ...(!t.square && {
        borderRadius: e.shape.borderRadius,
      }),
      ...(t.variant === 'outlined' && {
        border: `1px solid ${(e.vars || e).palette.divider}`,
      }),
      ...(t.variant === 'elevation' && {
        boxShadow: (e.vars || e).shadows[t.elevation],
        ...(!e.vars &&
          e.palette.mode === 'dark' && {
            backgroundImage: `linear-gradient(${Je('#fff', Za(t.elevation))}, ${Je(
              '#fff',
              Za(t.elevation),
            )})`,
          }),
        ...(e.vars && {
          backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation],
        }),
      }),
    };
  }),
  Kl = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiPaper',
      }),
      {
        className: i,
        component: a = 'div',
        elevation: s = 1,
        square: l = !1,
        variant: c = 'elevation',
        ...d
      } = r,
      u = {
        ...r,
        component: a,
        elevation: s,
        square: l,
        variant: c,
      },
      p = pb(u);
    return (
      process.env.NODE_ENV !== 'production' &&
        Kn().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      /* @__PURE__ */ M(fb, {
        as: a,
        ownerState: u,
        className: Ee(p.root, i),
        ref: o,
        ...d,
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Kl.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * Shadow depth, corresponds to `dp` in the spec.
     * It accepts values between 0 and 24 inclusive.
     * @default 1
     */
    elevation: Bt(yi, (e) => {
      const { elevation: t, variant: o } = e;
      return t > 0 && o === 'outlined'
        ? new Error(
            `MUI: Combining \`elevation={${t}}\` with \`variant="${o}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`,
          )
        : null;
    }),
    /**
     * If `true`, rounded corners are disabled.
     * @default false
     */
    square: n.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The variant to use.
     * @default 'elevation'
     */
    variant: n.oneOfType([n.oneOf(['elevation', 'outlined']), n.string]),
  });
const ko = Kl;
function Gl(e) {
  const {
      className: t,
      classes: o,
      pulsate: r = !1,
      rippleX: i,
      rippleY: a,
      rippleSize: s,
      in: l,
      onExited: c,
      timeout: d,
    } = e,
    [u, p] = b.useState(!1),
    h = Ee(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    y = {
      width: s,
      height: s,
      top: -(s / 2) + a,
      left: -(s / 2) + i,
    },
    g = Ee(o.child, u && o.childLeaving, r && o.childPulsate);
  return (
    !l && !u && p(!0),
    b.useEffect(() => {
      if (!l && c != null) {
        const m = setTimeout(c, d);
        return () => {
          clearTimeout(m);
        };
      }
    }, [c, l, d]),
    /* @__PURE__ */ M('span', {
      className: h,
      style: y,
      children: /* @__PURE__ */ M('span', {
        className: g,
      }),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (Gl.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: n.object.isRequired,
    className: n.string,
    /**
     * @ignore - injected from TransitionGroup
     */
    in: n.bool,
    /**
     * @ignore - injected from TransitionGroup
     */
    onExited: n.func,
    /**
     * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
     */
    pulsate: n.bool,
    /**
     * Diameter of the ripple.
     */
    rippleSize: n.number,
    /**
     * Horizontal position of the ripple center.
     */
    rippleX: n.number,
    /**
     * Vertical position of the ripple center.
     */
    rippleY: n.number,
    /**
     * exit delay
     */
    timeout: n.number.isRequired,
  });
const mb = _e('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  It = mb;
let $r = (e) => e,
  xs,
  Os,
  Ts,
  Cs;
const pi = 550,
  hb = 80,
  bb = $i(
    xs ||
      (xs = $r`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`),
  ),
  vb = $i(
    Os ||
      (Os = $r`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  gb = $i(
    Ts ||
      (Ts = $r`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`),
  ),
  yb = pe('span', {
    name: 'MuiTouchRipple',
    slot: 'Root',
  })({
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
  }),
  Eb = pe(Gl, {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  })(
    Cs ||
      (Cs = $r`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),
    It.rippleVisible,
    bb,
    pi,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    It.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    It.child,
    It.childLeaving,
    vb,
    pi,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    It.childPulsate,
    gb,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  Xl = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiTouchRipple',
      }),
      { center: i = !1, classes: a = {}, className: s, ...l } = r,
      [c, d] = b.useState([]),
      u = b.useRef(0),
      p = b.useRef(null);
    b.useEffect(() => {
      p.current && (p.current(), (p.current = null));
    }, [c]);
    const h = b.useRef(!1),
      y = b.useRef(null),
      g = b.useRef(null),
      m = b.useRef(null);
    b.useEffect(
      () => () => {
        clearTimeout(y.current);
      },
      [],
    );
    const v = b.useCallback(
        (E) => {
          const { pulsate: f, rippleX: R, rippleY: S, rippleSize: D, cb: B } = E;
          d((N) => [
            ...N,
            /* @__PURE__ */ M(
              Eb,
              {
                classes: {
                  ripple: Ee(a.ripple, It.ripple),
                  rippleVisible: Ee(a.rippleVisible, It.rippleVisible),
                  ripplePulsate: Ee(a.ripplePulsate, It.ripplePulsate),
                  child: Ee(a.child, It.child),
                  childLeaving: Ee(a.childLeaving, It.childLeaving),
                  childPulsate: Ee(a.childPulsate, It.childPulsate),
                },
                timeout: pi,
                pulsate: f,
                rippleX: R,
                rippleY: S,
                rippleSize: D,
              },
              u.current,
            ),
          ]),
            (u.current += 1),
            (p.current = B);
        },
        [a],
      ),
      T = b.useCallback(
        (E = {}, f = {}, R = () => {}) => {
          const {
            pulsate: S = !1,
            center: D = i || f.pulsate,
            fakeElement: B = !1,
            // For test purposes
          } = f;
          if ((E == null ? void 0 : E.type) === 'mousedown' && h.current) {
            h.current = !1;
            return;
          }
          (E == null ? void 0 : E.type) === 'touchstart' && (h.current = !0);
          const N = B ? null : m.current,
            I = N
              ? N.getBoundingClientRect()
              : {
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                };
          let J, j, _;
          if (
            D ||
            E === void 0 ||
            (E.clientX === 0 && E.clientY === 0) ||
            (!E.clientX && !E.touches)
          )
            (J = Math.round(I.width / 2)), (j = Math.round(I.height / 2));
          else {
            const { clientX: A, clientY: q } = E.touches && E.touches.length > 0 ? E.touches[0] : E;
            (J = Math.round(A - I.left)), (j = Math.round(q - I.top));
          }
          if (D) (_ = Math.sqrt((2 * I.width ** 2 + I.height ** 2) / 3)), _ % 2 === 0 && (_ += 1);
          else {
            const A = Math.max(Math.abs((N ? N.clientWidth : 0) - J), J) * 2 + 2,
              q = Math.max(Math.abs((N ? N.clientHeight : 0) - j), j) * 2 + 2;
            _ = Math.sqrt(A ** 2 + q ** 2);
          }
          E != null && E.touches
            ? g.current === null &&
              ((g.current = () => {
                v({
                  pulsate: S,
                  rippleX: J,
                  rippleY: j,
                  rippleSize: _,
                  cb: R,
                });
              }),
              (y.current = setTimeout(() => {
                g.current && (g.current(), (g.current = null));
              }, hb)))
            : v({
                pulsate: S,
                rippleX: J,
                rippleY: j,
                rippleSize: _,
                cb: R,
              });
        },
        [i, v],
      ),
      C = b.useCallback(() => {
        T(
          {},
          {
            pulsate: !0,
          },
        );
      }, [T]),
      O = b.useCallback((E, f) => {
        if ((clearTimeout(y.current), (E == null ? void 0 : E.type) === 'touchend' && g.current)) {
          g.current(),
            (g.current = null),
            (y.current = setTimeout(() => {
              O(E, f);
            }));
          return;
        }
        (g.current = null), d((R) => (R.length > 0 ? R.slice(1) : R)), (p.current = f);
      }, []);
    return (
      b.useImperativeHandle(
        o,
        () => ({
          pulsate: C,
          start: T,
          stop: O,
        }),
        [C, T, O],
      ),
      /* @__PURE__ */ M(yb, {
        className: Ee(It.root, a.root, s),
        ref: m,
        ...l,
        children: /* @__PURE__ */ M(ub, {
          component: null,
          exit: !0,
          children: c,
        }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Xl.propTypes = {
    /**
     * If `true`, the ripple starts at the center of the component
     * rather than at the point of interaction.
     */
    center: n.bool,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
  });
const xb = Xl;
function Ob(e) {
  return Pe('MuiButtonBase', e);
}
const Tb = _e('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  Cb = Tb,
  Sb = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = De(
        {
          root: ['root', t && 'disabled', o && 'focusVisible'],
        },
        Ob,
        i,
      );
    return o && r && (s.root += ` ${r}`), s;
  },
  Rb = pe('button', {
    name: 'MuiButtonBase',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    // Reset
    WebkitAppearance: 'none',
    // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none',
      // Remove Firefox dotted outline.
    },
    [`&.${Cb.disabled}`]: {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
  }),
  Jl = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiButtonBase',
      }),
      {
        action: i,
        centerRipple: a = !1,
        children: s,
        className: l,
        component: c = 'button',
        disabled: d = !1,
        disableRipple: u = !1,
        disableTouchRipple: p = !1,
        focusRipple: h = !1,
        focusVisibleClassName: y,
        LinkComponent: g = 'a',
        onBlur: m,
        onClick: v,
        onContextMenu: T,
        onDragLeave: C,
        onFocus: O,
        onFocusVisible: E,
        onKeyDown: f,
        onKeyUp: R,
        onMouseDown: S,
        onMouseLeave: D,
        onMouseUp: B,
        onTouchEnd: N,
        onTouchMove: I,
        onTouchStart: J,
        tabIndex: j = 0,
        TouchRippleProps: _,
        touchRippleRef: A,
        type: q,
        ...ae
      } = r,
      Q = b.useRef(null),
      z = b.useRef(null),
      w = it(z, A),
      { isFocusVisibleRef: L, onFocus: G, onBlur: V, ref: H } = tl(),
      [K, re] = b.useState(!1);
    d && K && re(!1),
      b.useImperativeHandle(
        i,
        () => ({
          focusVisible: () => {
            re(!0), Q.current.focus();
          },
        }),
        [],
      );
    const [Z, ie] = b.useState(!1);
    b.useEffect(() => {
      ie(!0);
    }, []);
    const ce = Z && !u && !d;
    b.useEffect(() => {
      K && h && !u && Z && z.current.pulsate();
    }, [u, h, K, Z]);
    function ue(se, we, U = p) {
      return pt((ge) => (we && we(ge), !U && z.current && z.current[se](ge), !0));
    }
    const me = ue('start', S),
      P = ue('stop', T),
      Te = ue('stop', C),
      X = ue('stop', B),
      W = ue('stop', (se) => {
        K && se.preventDefault(), D && D(se);
      }),
      Ce = ue('start', J),
      de = ue('stop', N),
      ke = ue('stop', I),
      Le = ue(
        'stop',
        (se) => {
          V(se), L.current === !1 && re(!1), m && m(se);
        },
        !1,
      ),
      Xe = pt((se) => {
        Q.current || (Q.current = se.currentTarget),
          G(se),
          L.current === !0 && (re(!0), E && E(se)),
          O && O(se);
      }),
      Ke = () => {
        const se = Q.current;
        return c && c !== 'button' && !(se.tagName === 'A' && se.href);
      },
      je = b.useRef(!1),
      Ze = pt((se) => {
        h &&
          !je.current &&
          K &&
          z.current &&
          se.key === ' ' &&
          ((je.current = !0),
          z.current.stop(se, () => {
            z.current.start(se);
          })),
          se.target === se.currentTarget && Ke() && se.key === ' ' && se.preventDefault(),
          f && f(se),
          se.target === se.currentTarget &&
            Ke() &&
            se.key === 'Enter' &&
            !d &&
            (se.preventDefault(), v && v(se));
      }),
      ee = pt((se) => {
        h &&
          se.key === ' ' &&
          z.current &&
          K &&
          !se.defaultPrevented &&
          ((je.current = !1),
          z.current.stop(se, () => {
            z.current.pulsate(se);
          })),
          R && R(se),
          v &&
            se.target === se.currentTarget &&
            Ke() &&
            se.key === ' ' &&
            !se.defaultPrevented &&
            v(se);
      });
    let te = c;
    te === 'button' && (ae.href || ae.to) && (te = g);
    const ye = {};
    te === 'button'
      ? ((ye.type = q === void 0 ? 'button' : q), (ye.disabled = d))
      : (!ae.href && !ae.to && (ye.role = 'button'), d && (ye['aria-disabled'] = d));
    const he = it(o, H, Q);
    process.env.NODE_ENV !== 'production' &&
      b.useEffect(() => {
        ce &&
          !z.current &&
          console.error(
            [
              'MUI: The `component` prop provided to ButtonBase is invalid.',
              'Please make sure the children prop is rendered in this custom component.',
            ].join(`
`),
          );
      }, [ce]);
    const xe = {
        ...r,
        centerRipple: a,
        component: c,
        disabled: d,
        disableRipple: u,
        disableTouchRipple: p,
        focusRipple: h,
        tabIndex: j,
        focusVisible: K,
      },
      Ne = Sb(xe);
    return /* @__PURE__ */ Ge(Rb, {
      as: te,
      className: Ee(Ne.root, l),
      ownerState: xe,
      onBlur: Le,
      onClick: v,
      onContextMenu: P,
      onFocus: Xe,
      onKeyDown: Ze,
      onKeyUp: ee,
      onMouseDown: me,
      onMouseLeave: W,
      onMouseUp: X,
      onDragLeave: Te,
      onTouchEnd: de,
      onTouchMove: ke,
      onTouchStart: Ce,
      ref: he,
      tabIndex: d ? -1 : j,
      type: q,
      ...ye,
      ...ae,
      children: [
        s,
        ce
          ? /* TouchRipple is only needed client-side, x2 boost on the server. */
            /* @__PURE__ */ M(xb, {
              ref: w,
              center: a,
              ..._,
            })
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Jl.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports `focusVisible()` action.
     */
    action: yt,
    /**
     * If `true`, the ripples are centered.
     * They won't start at the cursor interaction position.
     * @default false
     */
    centerRipple: n.bool,
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: bi,
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: n.bool,
    /**
     * If `true`, the ripple effect is disabled.
     *
     * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
     * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
     * @default false
     */
    disableRipple: n.bool,
    /**
     * If `true`, the touch ripple effect is disabled.
     * @default false
     */
    disableTouchRipple: n.bool,
    /**
     * If `true`, the base button will have a keyboard focus ripple.
     * @default false
     */
    focusRipple: n.bool,
    /**
     * This prop can help identify which element has keyboard focus.
     * The class name will be applied when the element gains the focus through keyboard interaction.
     * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
     * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
     * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
     * if needed.
     */
    focusVisibleClassName: n.string,
    /**
     * @ignore
     */
    href: n.any,
    /**
     * The component used to render a link when the `href` prop is provided.
     * @default 'a'
     */
    LinkComponent: n.elementType,
    /**
     * @ignore
     */
    onBlur: n.func,
    /**
     * @ignore
     */
    onClick: n.func,
    /**
     * @ignore
     */
    onContextMenu: n.func,
    /**
     * @ignore
     */
    onDragLeave: n.func,
    /**
     * @ignore
     */
    onFocus: n.func,
    /**
     * Callback fired when the component is focused with a keyboard.
     * We trigger a `onFocus` callback too.
     */
    onFocusVisible: n.func,
    /**
     * @ignore
     */
    onKeyDown: n.func,
    /**
     * @ignore
     */
    onKeyUp: n.func,
    /**
     * @ignore
     */
    onMouseDown: n.func,
    /**
     * @ignore
     */
    onMouseLeave: n.func,
    /**
     * @ignore
     */
    onMouseUp: n.func,
    /**
     * @ignore
     */
    onTouchEnd: n.func,
    /**
     * @ignore
     */
    onTouchMove: n.func,
    /**
     * @ignore
     */
    onTouchStart: n.func,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * @default 0
     */
    tabIndex: n.number,
    /**
     * Props applied to the `TouchRipple` element.
     */
    TouchRippleProps: n.object,
    /**
     * A ref that points to the `TouchRipple` element.
     */
    touchRippleRef: n.oneOfType([
      n.func,
      n.shape({
        current: n.shape({
          pulsate: n.func.isRequired,
          start: n.func.isRequired,
          stop: n.func.isRequired,
        }),
      }),
    ]),
    /**
     * @ignore
     */
    type: n.oneOfType([n.oneOf(['button', 'reset', 'submit']), n.string]),
  });
const Oo = Jl;
function wb(e) {
  return Pe('MuiIconButton', e);
}
const kb = _e('MuiIconButton', [
    'root',
    'disabled',
    'colorInherit',
    'colorPrimary',
    'colorSecondary',
    'colorError',
    'colorInfo',
    'colorSuccess',
    'colorWarning',
    'edgeStart',
    'edgeEnd',
    'sizeSmall',
    'sizeMedium',
    'sizeLarge',
  ]),
  $b = kb,
  Nb = (e) => {
    const { classes: t, disabled: o, color: r, edge: i, size: a } = e,
      s = {
        root: [
          'root',
          o && 'disabled',
          r !== 'default' && `color${oe(r)}`,
          i && `edge${oe(i)}`,
          `size${oe(a)}`,
        ],
      };
    return De(s, wb, t);
  },
  Pb = pe(Oo, {
    name: 'MuiIconButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${oe(o.color)}`],
        o.edge && t[`edge${oe(o.edge)}`],
        t[`size${oe(o.size)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => ({
      textAlign: 'center',
      flex: '0 0 auto',
      fontSize: e.typography.pxToRem(24),
      padding: 8,
      borderRadius: '50%',
      overflow: 'visible',
      // Explicitly set the default value to solve a bug on IE11.
      color: (e.vars || e).palette.action.active,
      transition: e.transitions.create('background-color', {
        duration: e.transitions.duration.shortest,
      }),
      ...(!t.disableRipple && {
        '&:hover': {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
            : Je(e.palette.action.active, e.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
      }),
      ...(t.edge === 'start' && {
        marginLeft: t.size === 'small' ? -3 : -12,
      }),
      ...(t.edge === 'end' && {
        marginRight: t.size === 'small' ? -3 : -12,
      }),
    }),
    ({ theme: e, ownerState: t }) => {
      var o;
      const r = (o = (e.vars || e).palette) == null ? void 0 : o[t.color];
      return {
        ...(t.color === 'inherit' && {
          color: 'inherit',
        }),
        ...(t.color !== 'inherit' &&
          t.color !== 'default' && {
            color: r == null ? void 0 : r.main,
            ...(!t.disableRipple && {
              '&:hover': {
                ...(r && {
                  backgroundColor: e.vars
                    ? `rgba(${r.mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                    : Je(r.main, e.palette.action.hoverOpacity),
                }),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                  backgroundColor: 'transparent',
                },
              },
            }),
          }),
        ...(t.size === 'small' && {
          padding: 5,
          fontSize: e.typography.pxToRem(18),
        }),
        ...(t.size === 'large' && {
          padding: 12,
          fontSize: e.typography.pxToRem(28),
        }),
        [`&.${$b.disabled}`]: {
          backgroundColor: 'transparent',
          color: (e.vars || e).palette.action.disabled,
        },
      };
    },
  ),
  Zl = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiIconButton',
      }),
      {
        edge: i = !1,
        children: a,
        className: s,
        color: l = 'default',
        disabled: c = !1,
        disableFocusRipple: d = !1,
        size: u = 'medium',
        ...p
      } = r,
      h = {
        ...r,
        edge: i,
        color: l,
        disabled: c,
        disableFocusRipple: d,
        size: u,
      },
      y = Nb(h);
    return /* @__PURE__ */ M(Pb, {
      className: Ee(y.root, s),
      centerRipple: !0,
      focusRipple: !d,
      disabled: c,
      ref: o,
      ownerState: h,
      ...p,
      children: a,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Zl.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The icon to display.
     */
    children: Bt(n.node, (e) =>
      b.Children.toArray(e.children).some(
        (o) => /* @__PURE__ */ b.isValidElement(o) && o.props.onClick,
      )
        ? new Error(
            [
              'MUI: You are providing an onClick event listener to a child of a button element.',
              'Prefer applying it to the IconButton directly.',
              'This guarantees that the whole <button> will be responsive to click events.',
            ].join(`
`),
          )
        : null,
    ),
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'default'
     */
    color: n.oneOfType([
      n.oneOf([
        'inherit',
        'default',
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
      ]),
      n.string,
    ]),
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: n.bool,
    /**
     * If `true`, the  keyboard focus ripple is disabled.
     * @default false
     */
    disableFocusRipple: n.bool,
    /**
     * If `true`, the ripple effect is disabled.
     *
     * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
     * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
     * @default false
     */
    disableRipple: n.bool,
    /**
     * If given, uses a negative margin to counteract the padding on one
     * side (this is often helpful for aligning the left or right
     * side of the icon with content above or below, without ruining the border
     * size and shape).
     * @default false
     */
    edge: n.oneOf(['end', 'start', !1]),
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size: n.oneOfType([n.oneOf(['small', 'medium', 'large']), n.string]),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const Ql = Zl,
  Ib = Gn(
    /* @__PURE__ */ M('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  _b = pe(wh, {
    name: 'MuiPopper',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  ec = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r;
    const i = Cl(),
      a = Ye({
        props: t,
        name: 'MuiPopper',
      }),
      {
        anchorEl: s,
        component: l,
        components: c,
        componentsProps: d,
        container: u,
        disablePortal: p,
        keepMounted: h,
        modifiers: y,
        open: g,
        placement: m,
        popperOptions: v,
        popperRef: T,
        transition: C,
        slots: O,
        slotProps: E,
        ...f
      } = a,
      R = (r = O == null ? void 0 : O.root) != null ? r : c == null ? void 0 : c.Root,
      S = {
        anchorEl: s,
        container: u,
        disablePortal: p,
        keepMounted: h,
        modifiers: y,
        open: g,
        placement: m,
        popperOptions: v,
        popperRef: T,
        transition: C,
        ...f,
      };
    return /* @__PURE__ */ M(_b, {
      as: l,
      direction: i == null ? void 0 : i.direction,
      slots: {
        root: R,
      },
      slotProps: E ?? d,
      ...S,
      ref: o,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ec.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
     * or a function that returns either.
     * It's used to set the position of the popper.
     * The return value will passed as the reference object of the Popper instance.
     */
    anchorEl: n.oneOfType([Qt, n.object, n.func]),
    /**
     * Popper render function or node.
     */
    children: n.oneOfType([n.node, n.func]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * The components used for each slot inside the Popper.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components: n.shape({
      Root: n.elementType,
    }),
    /**
     * The props used for each slot inside the Popper.
     * @default {}
     */
    componentsProps: n.shape({
      root: n.oneOfType([n.func, n.object]),
    }),
    /**
     * An HTML element or function that returns one.
     * The `container` will have the portal children appended to it.
     *
     * By default, it uses the body of the top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: n.oneOfType([Qt, n.func]),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
    /**
     * Always keep the children in the DOM.
     * This prop can be useful in SEO situation or
     * when you want to maximize the responsiveness of the Popper.
     * @default false
     */
    keepMounted: n.bool,
    /**
     * Popper.js is based on a "plugin-like" architecture,
     * most of its features are fully encapsulated "modifiers".
     *
     * A modifier is a function that is called each time Popper.js needs to
     * compute the position of the popper.
     * For this reason, modifiers should be very performant to avoid bottlenecks.
     * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
     */
    modifiers: n.arrayOf(
      n.shape({
        data: n.object,
        effect: n.func,
        enabled: n.bool,
        fn: n.func,
        name: n.any,
        options: n.object,
        phase: n.oneOf([
          'afterMain',
          'afterRead',
          'afterWrite',
          'beforeMain',
          'beforeRead',
          'beforeWrite',
          'main',
          'read',
          'write',
        ]),
        requires: n.arrayOf(n.string),
        requiresIfExists: n.arrayOf(n.string),
      }),
    ),
    /**
     * If `true`, the component is shown.
     */
    open: n.bool.isRequired,
    /**
     * Popper placement.
     * @default 'bottom'
     */
    placement: n.oneOf([
      'auto-end',
      'auto-start',
      'auto',
      'bottom-end',
      'bottom-start',
      'bottom',
      'left-end',
      'left-start',
      'left',
      'right-end',
      'right-start',
      'right',
      'top-end',
      'top-start',
      'top',
    ]),
    /**
     * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
     * @default {}
     */
    popperOptions: n.shape({
      modifiers: n.array,
      onFirstUpdate: n.func,
      placement: n.oneOf([
        'auto-end',
        'auto-start',
        'auto',
        'bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top',
      ]),
      strategy: n.oneOf(['absolute', 'fixed']),
    }),
    /**
     * A ref that points to the used popper instance.
     */
    popperRef: yt,
    /**
     * The props used for each slot inside the Popper.
     * @default {}
     */
    slotProps: n.shape({
      root: n.oneOfType([n.func, n.object]),
    }),
    /**
     * The components used for each slot inside the Popper.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: n.shape({
      root: n.elementType,
    }),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Help supporting a react-transition-group/Transition component.
     * @default false
     */
    transition: n.bool,
  });
const tc = ec;
function Mb(e) {
  return Pe('MuiListSubheader', e);
}
_e('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const Ab = (e) => {
    const { classes: t, color: o, disableGutters: r, inset: i, disableSticky: a } = e,
      s = {
        root: [
          'root',
          o !== 'default' && `color${oe(o)}`,
          !r && 'gutters',
          i && 'inset',
          !a && 'sticky',
        ],
      };
    return De(s, Mb, t);
  },
  Db = pe('li', {
    name: 'MuiListSubheader',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${oe(o.color)}`],
        !o.disableGutters && t.gutters,
        o.inset && t.inset,
        !o.disableSticky && t.sticky,
      ];
    },
  })(({ theme: e, ownerState: t }) => ({
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    color: (e.vars || e).palette.text.secondary,
    fontFamily: e.typography.fontFamily,
    fontWeight: e.typography.fontWeightMedium,
    fontSize: e.typography.pxToRem(14),
    ...(t.color === 'primary' && {
      color: (e.vars || e).palette.primary.main,
    }),
    ...(t.color === 'inherit' && {
      color: 'inherit',
    }),
    ...(!t.disableGutters && {
      paddingLeft: 16,
      paddingRight: 16,
    }),
    ...(t.inset && {
      paddingLeft: 72,
    }),
    ...(!t.disableSticky && {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: (e.vars || e).palette.background.paper,
    }),
  })),
  Yi = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiListSubheader',
      }),
      {
        className: i,
        color: a = 'default',
        component: s = 'li',
        disableGutters: l = !1,
        disableSticky: c = !1,
        inset: d = !1,
        ...u
      } = r,
      p = {
        ...r,
        color: a,
        component: s,
        disableGutters: l,
        disableSticky: c,
        inset: d,
      },
      h = Ab(p);
    return /* @__PURE__ */ M(Db, {
      as: s,
      className: Ee(h.root, i),
      ref: o,
      ownerState: p,
      ...u,
    });
  });
Yi.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (Yi.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'default'
     */
    color: n.oneOf(['default', 'inherit', 'primary']),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * If `true`, the List Subheader will not have gutters.
     * @default false
     */
    disableGutters: n.bool,
    /**
     * If `true`, the List Subheader will not stick to the top during scroll.
     * @default false
     */
    disableSticky: n.bool,
    /**
     * If `true`, the List Subheader is indented.
     * @default false
     */
    inset: n.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const Lb = Yi,
  jb = Gn(
    /* @__PURE__ */ M('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function Fb(e) {
  return Pe('MuiChip', e);
}
const zb = _e('MuiChip', [
    'root',
    'sizeSmall',
    'sizeMedium',
    'colorError',
    'colorInfo',
    'colorPrimary',
    'colorSecondary',
    'colorSuccess',
    'colorWarning',
    'disabled',
    'clickable',
    'clickableColorPrimary',
    'clickableColorSecondary',
    'deletable',
    'deletableColorPrimary',
    'deletableColorSecondary',
    'outlined',
    'filled',
    'outlinedPrimary',
    'outlinedSecondary',
    'filledPrimary',
    'filledSecondary',
    'avatar',
    'avatarSmall',
    'avatarMedium',
    'avatarColorPrimary',
    'avatarColorSecondary',
    'icon',
    'iconSmall',
    'iconMedium',
    'iconColorPrimary',
    'iconColorSecondary',
    'label',
    'labelSmall',
    'labelMedium',
    'deleteIcon',
    'deleteIconSmall',
    'deleteIconMedium',
    'deleteIconColorPrimary',
    'deleteIconColorSecondary',
    'deleteIconOutlinedColorPrimary',
    'deleteIconOutlinedColorSecondary',
    'deleteIconFilledColorPrimary',
    'deleteIconFilledColorSecondary',
    'focusVisible',
  ]),
  Ie = zb,
  Vb = (e) => {
    const {
        classes: t,
        disabled: o,
        size: r,
        color: i,
        iconColor: a,
        onDelete: s,
        clickable: l,
        variant: c,
      } = e,
      d = {
        root: [
          'root',
          c,
          o && 'disabled',
          `size${oe(r)}`,
          `color${oe(i)}`,
          l && 'clickable',
          l && `clickableColor${oe(i)}`,
          s && 'deletable',
          s && `deletableColor${oe(i)}`,
          `${c}${oe(i)}`,
        ],
        label: ['label', `label${oe(r)}`],
        avatar: ['avatar', `avatar${oe(r)}`, `avatarColor${oe(i)}`],
        icon: ['icon', `icon${oe(r)}`, `iconColor${oe(a)}`],
        deleteIcon: [
          'deleteIcon',
          `deleteIcon${oe(r)}`,
          `deleteIconColor${oe(i)}`,
          `deleteIcon${oe(c)}Color${oe(i)}`,
        ],
      };
    return De(d, Fb, t);
  },
  Bb = pe('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: i, clickable: a, onDelete: s, size: l, variant: c } = o;
      return [
        {
          [`& .${Ie.avatar}`]: t.avatar,
        },
        {
          [`& .${Ie.avatar}`]: t[`avatar${oe(l)}`],
        },
        {
          [`& .${Ie.avatar}`]: t[`avatarColor${oe(r)}`],
        },
        {
          [`& .${Ie.icon}`]: t.icon,
        },
        {
          [`& .${Ie.icon}`]: t[`icon${oe(l)}`],
        },
        {
          [`& .${Ie.icon}`]: t[`iconColor${oe(i)}`],
        },
        {
          [`& .${Ie.deleteIcon}`]: t.deleteIcon,
        },
        {
          [`& .${Ie.deleteIcon}`]: t[`deleteIcon${oe(l)}`],
        },
        {
          [`& .${Ie.deleteIcon}`]: t[`deleteIconColor${oe(r)}`],
        },
        {
          [`& .${Ie.deleteIcon}`]: t[`deleteIcon${oe(c)}Color${oe(r)}`],
        },
        t.root,
        t[`size${oe(l)}`],
        t[`color${oe(r)}`],
        a && t.clickable,
        a && r !== 'default' && t[`clickableColor${oe(r)})`],
        s && t.deletable,
        s && r !== 'default' && t[`deletableColor${oe(r)}`],
        t[c],
        t[`${c}${oe(r)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => {
      const o = e.palette.mode === 'light' ? e.palette.grey[700] : e.palette.grey[300];
      return {
        maxWidth: '100%',
        fontFamily: e.typography.fontFamily,
        fontSize: e.typography.pxToRem(13),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        color: (e.vars || e).palette.text.primary,
        backgroundColor: (e.vars || e).palette.action.selected,
        borderRadius: 32 / 2,
        whiteSpace: 'nowrap',
        transition: e.transitions.create(['background-color', 'box-shadow']),
        // label will inherit this from root, then `clickable` class overrides this for both
        cursor: 'default',
        // We disable the focus ring for mouse, touch and keyboard users.
        outline: 0,
        textDecoration: 'none',
        border: 0,
        // Remove `button` border
        padding: 0,
        // Remove `button` padding
        verticalAlign: 'middle',
        boxSizing: 'border-box',
        [`&.${Ie.disabled}`]: {
          opacity: (e.vars || e).palette.action.disabledOpacity,
          pointerEvents: 'none',
        },
        [`& .${Ie.avatar}`]: {
          marginLeft: 5,
          marginRight: -6,
          width: 24,
          height: 24,
          color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : o,
          fontSize: e.typography.pxToRem(12),
        },
        [`& .${Ie.avatarColorPrimary}`]: {
          color: (e.vars || e).palette.primary.contrastText,
          backgroundColor: (e.vars || e).palette.primary.dark,
        },
        [`& .${Ie.avatarColorSecondary}`]: {
          color: (e.vars || e).palette.secondary.contrastText,
          backgroundColor: (e.vars || e).palette.secondary.dark,
        },
        [`& .${Ie.avatarSmall}`]: {
          marginLeft: 4,
          marginRight: -4,
          width: 18,
          height: 18,
          fontSize: e.typography.pxToRem(10),
        },
        [`& .${Ie.icon}`]: {
          marginLeft: 5,
          marginRight: -6,
          ...(t.size === 'small' && {
            fontSize: 18,
            marginLeft: 4,
            marginRight: -4,
          }),
          ...(t.iconColor === t.color && {
            color: e.vars ? e.vars.palette.Chip.defaultIconColor : o,
            ...(t.color !== 'default' && {
              color: 'inherit',
            }),
          }),
        },
        [`& .${Ie.deleteIcon}`]: {
          WebkitTapHighlightColor: 'transparent',
          color: e.vars
            ? `rgba(${e.vars.palette.text.primaryChannel} / 0.26)`
            : Je(e.palette.text.primary, 0.26),
          fontSize: 22,
          cursor: 'pointer',
          margin: '0 5px 0 -6px',
          '&:hover': {
            color: e.vars
              ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)`
              : Je(e.palette.text.primary, 0.4),
          },
          ...(t.size === 'small' && {
            fontSize: 16,
            marginRight: 4,
            marginLeft: -4,
          }),
          ...(t.color !== 'default' && {
            color: e.vars
              ? `rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`
              : Je(e.palette[t.color].contrastText, 0.7),
            '&:hover, &:active': {
              color: (e.vars || e).palette[t.color].contrastText,
            },
          }),
        },
        ...(t.size === 'small' && {
          height: 24,
        }),
        ...(t.color !== 'default' && {
          backgroundColor: (e.vars || e).palette[t.color].main,
          color: (e.vars || e).palette[t.color].contrastText,
        }),
        ...(t.onDelete && {
          [`&.${Ie.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Je(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        }),
        ...(t.onDelete &&
          t.color !== 'default' && {
            [`&.${Ie.focusVisible}`]: {
              backgroundColor: (e.vars || e).palette[t.color].dark,
            },
          }),
      };
    },
    ({ theme: e, ownerState: t }) => ({
      ...(t.clickable && {
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : Je(
                e.palette.action.selected,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
        },
        [`&.${Ie.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : Je(
                e.palette.action.selected,
                e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
              ),
        },
        '&:active': {
          boxShadow: (e.vars || e).shadows[1],
        },
      }),
      ...(t.clickable &&
        t.color !== 'default' && {
          [`&:hover, &.${Ie.focusVisible}`]: {
            backgroundColor: (e.vars || e).palette[t.color].dark,
          },
        }),
    }),
    ({ theme: e, ownerState: t }) => ({
      ...(t.variant === 'outlined' && {
        backgroundColor: 'transparent',
        border: e.vars
          ? `1px solid ${e.vars.palette.Chip.defaultBorder}`
          : `1px solid ${e.palette.mode === 'light' ? e.palette.grey[400] : e.palette.grey[700]}`,
        [`&.${Ie.clickable}:hover`]: {
          backgroundColor: (e.vars || e).palette.action.hover,
        },
        [`&.${Ie.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus,
        },
        [`& .${Ie.avatar}`]: {
          marginLeft: 4,
        },
        [`& .${Ie.avatarSmall}`]: {
          marginLeft: 2,
        },
        [`& .${Ie.icon}`]: {
          marginLeft: 4,
        },
        [`& .${Ie.iconSmall}`]: {
          marginLeft: 2,
        },
        [`& .${Ie.deleteIcon}`]: {
          marginRight: 5,
        },
        [`& .${Ie.deleteIconSmall}`]: {
          marginRight: 3,
        },
      }),
      ...(t.variant === 'outlined' &&
        t.color !== 'default' && {
          color: (e.vars || e).palette[t.color].main,
          border: `1px solid ${
            e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
              : Je(e.palette[t.color].main, 0.7)
          }`,
          [`&.${Ie.clickable}:hover`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                  e.vars.palette.action.hoverOpacity
                })`
              : Je(e.palette[t.color].main, e.palette.action.hoverOpacity),
          },
          [`&.${Ie.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                  e.vars.palette.action.focusOpacity
                })`
              : Je(e.palette[t.color].main, e.palette.action.focusOpacity),
          },
          [`& .${Ie.deleteIcon}`]: {
            color: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
              : Je(e.palette[t.color].main, 0.7),
            '&:hover, &:active': {
              color: (e.vars || e).palette[t.color].main,
            },
          },
        }),
    }),
  ),
  Ub = pe('span', {
    name: 'MuiChip',
    slot: 'Label',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { size: r } = o;
      return [t.label, t[`label${oe(r)}`]];
    },
  })(({ ownerState: e }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: 12,
    paddingRight: 12,
    whiteSpace: 'nowrap',
    ...(e.size === 'small' && {
      paddingLeft: 8,
      paddingRight: 8,
    }),
  }));
function Ss(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const nc = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const r = Ye({
      props: t,
      name: 'MuiChip',
    }),
    {
      avatar: i,
      className: a,
      clickable: s,
      color: l = 'default',
      component: c,
      deleteIcon: d,
      disabled: u = !1,
      icon: p,
      label: h,
      onClick: y,
      onDelete: g,
      onKeyDown: m,
      onKeyUp: v,
      size: T = 'medium',
      variant: C = 'filled',
      tabIndex: O,
      skipFocusWhenDisabled: E = !1,
      // TODO v6: Rename to `focusableWhenDisabled`.
      ...f
    } = r,
    R = b.useRef(null),
    S = it(R, o),
    D = (z) => {
      z.stopPropagation(), g && g(z);
    },
    B = (z) => {
      z.currentTarget === z.target && Ss(z) && z.preventDefault(), m && m(z);
    },
    N = (z) => {
      z.currentTarget === z.target &&
        (g && Ss(z) ? g(z) : z.key === 'Escape' && R.current && R.current.blur()),
        v && v(z);
    },
    I = s !== !1 && y ? !0 : s,
    J = I || g ? Oo : c || 'div',
    j = {
      ...r,
      component: J,
      disabled: u,
      size: T,
      color: l,
      iconColor: /* @__PURE__ */ (b.isValidElement(p) && p.props.color) || l,
      onDelete: !!g,
      clickable: I,
      variant: C,
    },
    _ = Vb(j),
    A =
      J === Oo
        ? {
            component: c || 'div',
            focusVisibleClassName: _.focusVisible,
            ...(g && {
              disableRipple: !0,
            }),
          }
        : {};
  let q = null;
  g &&
    (q =
      d && /* @__PURE__ */ b.isValidElement(d)
        ? /* @__PURE__ */ b.cloneElement(d, {
            className: Ee(d.props.className, _.deleteIcon),
            onClick: D,
          })
        : /* @__PURE__ */ M(jb, {
            className: Ee(_.deleteIcon),
            onClick: D,
          }));
  let ae = null;
  i &&
    /* @__PURE__ */ b.isValidElement(i) &&
    (ae = /* @__PURE__ */ b.cloneElement(i, {
      className: Ee(_.avatar, i.props.className),
    }));
  let Q = null;
  return (
    p &&
      /* @__PURE__ */ b.isValidElement(p) &&
      (Q = /* @__PURE__ */ b.cloneElement(p, {
        className: Ee(_.icon, p.props.className),
      })),
    process.env.NODE_ENV !== 'production' &&
      ae &&
      Q &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    /* @__PURE__ */ Ge(Bb, {
      as: J,
      className: Ee(_.root, a),
      disabled: I && u ? !0 : void 0,
      onClick: y,
      onKeyDown: B,
      onKeyUp: N,
      ref: S,
      tabIndex: E && u ? -1 : O,
      ownerState: j,
      ...A,
      ...f,
      children: [
        ae || Q,
        /* @__PURE__ */ M(Ub, {
          className: Ee(_.label),
          ownerState: j,
          children: h,
        }),
        q,
      ],
    })
  );
});
process.env.NODE_ENV !== 'production' &&
  (nc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The Avatar element to display.
     */
    avatar: n.element,
    /**
     * This prop isn't supported.
     * Use the `component` prop if you need to change the children structure.
     */
    children: ju,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * If `true`, the chip will appear clickable, and will raise when pressed,
     * even if the onClick prop is not defined.
     * If `false`, the chip will not appear clickable, even if onClick prop is defined.
     * This can be used, for example,
     * along with the component prop to indicate an anchor Chip is clickable.
     * Note: this controls the UI and does not affect the onClick event.
     */
    clickable: n.bool,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'default'
     */
    color: n.oneOfType([
      n.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * Override the default delete icon element. Shown only if `onDelete` is set.
     */
    deleteIcon: n.element,
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: n.bool,
    /**
     * Icon element.
     */
    icon: n.element,
    /**
     * The content of the component.
     */
    label: n.node,
    /**
     * @ignore
     */
    onClick: n.func,
    /**
     * Callback fired when the delete icon is clicked.
     * If set, the delete icon will be shown.
     */
    onDelete: n.func,
    /**
     * @ignore
     */
    onKeyDown: n.func,
    /**
     * @ignore
     */
    onKeyUp: n.func,
    /**
     * The size of the component.
     * @default 'medium'
     */
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    /**
     * If `true`, allows the disabled chip to escape focus.
     * If `false`, allows the disabled chip to receive focus.
     * @default false
     */
    skipFocusWhenDisabled: n.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * @ignore
     */
    tabIndex: n.number,
    /**
     * The variant to use.
     * @default 'filled'
     */
    variant: n.oneOfType([n.oneOf(['filled', 'outlined']), n.string]),
  });
const Wb = nc;
function Xn({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const oc = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== 'production' && (oc.displayName = 'FormControlContext');
const Ki = oc;
function Rn() {
  return b.useContext(Ki);
}
function rc(e) {
  return /* @__PURE__ */ M(Sl, {
    ...e,
    defaultTheme: Sr,
    themeId: sr,
  });
}
process.env.NODE_ENV !== 'production' &&
  (rc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The styles you want to apply globally.
     */
    styles: n.oneOfType([n.array, n.func, n.number, n.object, n.string, n.bool]),
  });
function Rs(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function ir(e, t = !1) {
  return (
    e && ((Rs(e.value) && e.value !== '') || (t && Rs(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Hb(e) {
  return e.startAdornment;
}
function qb(e) {
  return Pe('MuiInputBase', e);
}
const Yb = _e('MuiInputBase', [
    'root',
    'formControl',
    'focused',
    'disabled',
    'adornedStart',
    'adornedEnd',
    'error',
    'sizeSmall',
    'multiline',
    'colorSecondary',
    'fullWidth',
    'hiddenLabel',
    'readOnly',
    'input',
    'inputSizeSmall',
    'inputMultiline',
    'inputTypeSearch',
    'inputAdornedStart',
    'inputAdornedEnd',
    'inputHiddenLabel',
  ]),
  St = Yb,
  Nr = (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      o.formControl && t.formControl,
      o.startAdornment && t.adornedStart,
      o.endAdornment && t.adornedEnd,
      o.error && t.error,
      o.size === 'small' && t.sizeSmall,
      o.multiline && t.multiline,
      o.color && t[`color${oe(o.color)}`],
      o.fullWidth && t.fullWidth,
      o.hiddenLabel && t.hiddenLabel,
    ];
  },
  Pr = (e, t) => {
    const { ownerState: o } = e;
    return [
      t.input,
      o.size === 'small' && t.inputSizeSmall,
      o.multiline && t.inputMultiline,
      o.type === 'search' && t.inputTypeSearch,
      o.startAdornment && t.inputAdornedStart,
      o.endAdornment && t.inputAdornedEnd,
      o.hiddenLabel && t.inputHiddenLabel,
    ];
  },
  Kb = (e) => {
    const {
        classes: t,
        color: o,
        disabled: r,
        error: i,
        endAdornment: a,
        focused: s,
        formControl: l,
        fullWidth: c,
        hiddenLabel: d,
        multiline: u,
        readOnly: p,
        size: h,
        startAdornment: y,
        type: g,
      } = e,
      m = {
        root: [
          'root',
          `color${oe(o)}`,
          r && 'disabled',
          i && 'error',
          c && 'fullWidth',
          s && 'focused',
          l && 'formControl',
          h === 'small' && 'sizeSmall',
          u && 'multiline',
          y && 'adornedStart',
          a && 'adornedEnd',
          d && 'hiddenLabel',
          p && 'readOnly',
        ],
        input: [
          'input',
          r && 'disabled',
          g === 'search' && 'inputTypeSearch',
          u && 'inputMultiline',
          h === 'small' && 'inputSizeSmall',
          d && 'inputHiddenLabel',
          y && 'inputAdornedStart',
          a && 'inputAdornedEnd',
          p && 'readOnly',
        ],
      };
    return De(m, qb, t);
  },
  Ir = pe('div', {
    name: 'MuiInputBase',
    slot: 'Root',
    overridesResolver: Nr,
  })(({ theme: e, ownerState: t }) => ({
    ...e.typography.body1,
    color: (e.vars || e).palette.text.primary,
    lineHeight: '1.4375em',
    // 23px
    boxSizing: 'border-box',
    // Prevent padding issue with fullWidth.
    position: 'relative',
    cursor: 'text',
    display: 'inline-flex',
    alignItems: 'center',
    [`&.${St.disabled}`]: {
      color: (e.vars || e).palette.text.disabled,
      cursor: 'default',
    },
    ...(t.multiline && {
      padding: '4px 0 5px',
      ...(t.size === 'small' && {
        paddingTop: 1,
      }),
    }),
    ...(t.fullWidth && {
      width: '100%',
    }),
  })),
  _r = pe('input', {
    name: 'MuiInputBase',
    slot: 'Input',
    overridesResolver: Pr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light',
      r = {
        color: 'currentColor',
        ...(e.vars
          ? {
              opacity: e.vars.opacity.inputPlaceholder,
            }
          : {
              opacity: o ? 0.42 : 0.5,
            }),
        transition: e.transitions.create('opacity', {
          duration: e.transitions.duration.shorter,
        }),
      },
      i = {
        opacity: '0 !important',
      },
      a = e.vars
        ? {
            opacity: e.vars.opacity.inputPlaceholder,
          }
        : {
            opacity: o ? 0.42 : 0.5,
          };
    return {
      font: 'inherit',
      letterSpacing: 'inherit',
      color: 'currentColor',
      padding: '4px 0 5px',
      border: 0,
      boxSizing: 'content-box',
      background: 'none',
      height: '1.4375em',
      // Reset 23pxthe native input line-height
      margin: 0,
      // Reset for Safari
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: '100%',
      // Fix IE11 width issue
      animationName: 'mui-auto-fill-cancel',
      animationDuration: '10ms',
      '&::-webkit-input-placeholder': r,
      '&::-moz-placeholder': r,
      // Firefox 19+
      '&:-ms-input-placeholder': r,
      // IE11
      '&::-ms-input-placeholder': r,
      // Edge
      '&:focus': {
        outline: 0,
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none',
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        WebkitAppearance: 'none',
      },
      // Show and hide the placeholder logic
      [`label[data-shrink=false] + .${St.formControl} &`]: {
        '&::-webkit-input-placeholder': i,
        '&::-moz-placeholder': i,
        // Firefox 19+
        '&:-ms-input-placeholder': i,
        // IE11
        '&::-ms-input-placeholder': i,
        // Edge
        '&:focus::-webkit-input-placeholder': a,
        '&:focus::-moz-placeholder': a,
        // Firefox 19+
        '&:focus:-ms-input-placeholder': a,
        // IE11
        '&:focus::-ms-input-placeholder': a,
        // Edge
      },
      [`&.${St.disabled}`]: {
        opacity: 1,
        // Reset iOS opacity
        WebkitTextFillColor: (e.vars || e).palette.text.disabled,
        // Fix opacity Safari bug
      },
      '&:-webkit-autofill': {
        animationDuration: '5000s',
        animationName: 'mui-auto-fill',
      },
      ...(t.size === 'small' && {
        paddingTop: 1,
      }),
      ...(t.multiline && {
        height: 'auto',
        resize: 'none',
        padding: 0,
        paddingTop: 0,
      }),
      ...(t.type === 'search' && {
        // Improve type search style.
        MozAppearance: 'textfield',
      }),
    };
  }),
  Gb = /* @__PURE__ */ M(rc, {
    styles: {
      '@keyframes mui-auto-fill': {
        from: {
          display: 'block',
        },
      },
      '@keyframes mui-auto-fill-cancel': {
        from: {
          display: 'block',
        },
      },
    },
  }),
  ic = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r;
    const i = Ye({
        props: t,
        name: 'MuiInputBase',
      }),
      {
        'aria-describedby': a,
        autoComplete: s,
        autoFocus: l,
        className: c,
        color: d,
        components: u = {},
        componentsProps: p = {},
        defaultValue: h,
        disabled: y,
        disableInjectingGlobalStyles: g,
        endAdornment: m,
        error: v,
        fullWidth: T = !1,
        id: C,
        inputComponent: O = 'input',
        inputProps: E = {},
        inputRef: f,
        margin: R,
        maxRows: S,
        minRows: D,
        multiline: B = !1,
        name: N,
        onBlur: I,
        onChange: J,
        onClick: j,
        onFocus: _,
        onKeyDown: A,
        onKeyUp: q,
        placeholder: ae,
        readOnly: Q,
        renderSuffix: z,
        rows: w,
        size: L,
        slotProps: G = {},
        slots: V = {},
        startAdornment: H,
        type: K = 'text',
        value: re,
        ...Z
      } = i,
      ie = E.value != null ? E.value : re,
      { current: ce } = b.useRef(ie != null),
      ue = b.useRef(),
      me = b.useCallback((U) => {
        process.env.NODE_ENV !== 'production' &&
          U &&
          U.nodeName !== 'INPUT' &&
          !U.focus &&
          console.error(
            [
              'MUI: You have provided a `inputComponent` to the input component',
              'that does not correctly handle the `ref` prop.',
              'Make sure the `ref` prop is called with a HTMLInputElement.',
            ].join(`
`),
          );
      }, []),
      P = it(ue, f, E.ref, me),
      [Te, X] = b.useState(!1),
      W = Rn();
    process.env.NODE_ENV !== 'production' &&
      b.useEffect(() => {
        if (W) return W.registerEffect();
      }, [W]);
    const Ce = Xn({
      props: i,
      muiFormControl: W,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (Ce.focused = W ? W.focused : Te),
      b.useEffect(() => {
        !W && y && Te && (X(!1), I && I());
      }, [W, y, Te, I]);
    const de = W && W.onFilled,
      ke = W && W.onEmpty,
      Le = b.useCallback(
        (U) => {
          ir(U) ? de && de() : ke && ke();
        },
        [de, ke],
      );
    an(() => {
      ce &&
        Le({
          value: ie,
        });
    }, [ie, Le, ce]);
    const Xe = (U) => {
        if (Ce.disabled) {
          U.stopPropagation();
          return;
        }
        _ && _(U), E.onFocus && E.onFocus(U), W && W.onFocus ? W.onFocus(U) : X(!0);
      },
      Ke = (U) => {
        I && I(U), E.onBlur && E.onBlur(U), W && W.onBlur ? W.onBlur(U) : X(!1);
      },
      je = (U, ...ge) => {
        if (!ce) {
          const Se = U.target || ue.current;
          if (Se == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : pn(1),
            );
          Le({
            value: Se.value,
          });
        }
        E.onChange && E.onChange(U, ...ge), J && J(U, ...ge);
      };
    b.useEffect(() => {
      Le(ue.current);
    }, []);
    const Ze = (U) => {
      ue.current && U.currentTarget === U.target && ue.current.focus(), j && !Ce.disabled && j(U);
    };
    let ee = O,
      te = E;
    B &&
      ee === 'input' &&
      (w
        ? (process.env.NODE_ENV !== 'production' &&
            (D || S) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (te = {
            type: void 0,
            minRows: w,
            maxRows: w,
            ...te,
          }))
        : (te = {
            type: void 0,
            maxRows: S,
            minRows: D,
            ...te,
          }),
      (ee = Kh));
    const ye = (U) => {
      Le(
        U.animationName === 'mui-auto-fill-cancel'
          ? ue.current
          : {
              value: 'x',
            },
      );
    };
    b.useEffect(() => {
      W && W.setAdornedStart(!!H);
    }, [W, H]);
    const he = {
        ...i,
        color: Ce.color || 'primary',
        disabled: Ce.disabled,
        endAdornment: m,
        error: Ce.error,
        focused: Ce.focused,
        formControl: W,
        fullWidth: T,
        hiddenLabel: Ce.hiddenLabel,
        multiline: B,
        size: Ce.size,
        startAdornment: H,
        type: K,
      },
      xe = Kb(he),
      Ne = V.root || u.Root || Ir,
      se = G.root || p.root || {},
      we = V.input || u.Input || _r;
    return (
      (te = {
        ...te,
        ...((r = G.input) != null ? r : p.input),
      }),
      /* @__PURE__ */ Ge(b.Fragment, {
        children: [
          !g && Gb,
          /* @__PURE__ */ Ge(Ne, {
            ...se,
            ...(!dn(Ne) && {
              ownerState: {
                ...he,
                ...se.ownerState,
              },
            }),
            ref: o,
            onClick: Ze,
            ...Z,
            className: Ee(xe.root, se.className, c, Q && 'MuiInputBase-readOnly'),
            children: [
              H,
              /* @__PURE__ */ M(Ki.Provider, {
                value: null,
                children: /* @__PURE__ */ M(we, {
                  ownerState: he,
                  'aria-invalid': Ce.error,
                  'aria-describedby': a,
                  autoComplete: s,
                  autoFocus: l,
                  defaultValue: h,
                  disabled: Ce.disabled,
                  id: C,
                  onAnimationStart: ye,
                  name: N,
                  placeholder: ae,
                  readOnly: Q,
                  required: Ce.required,
                  rows: w,
                  value: ie,
                  onKeyDown: A,
                  onKeyUp: q,
                  type: K,
                  ...te,
                  ...(!dn(we) && {
                    as: ee,
                    ownerState: {
                      ...he,
                      ...te.ownerState,
                    },
                  }),
                  ref: P,
                  className: Ee(xe.input, te.className, Q && 'MuiInputBase-readOnly'),
                  onBlur: Ke,
                  onChange: je,
                  onFocus: Xe,
                }),
              }),
              m,
              z
                ? z({
                    ...Ce,
                    startAdornment: H,
                  })
                : null,
            ],
          }),
        ],
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ic.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    'aria-describedby': n.string,
    /**
     * This prop helps users to fill forms faster, especially on mobile devices.
     * The name can be confusing, as it's more like an autofill.
     * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
     */
    autoComplete: n.string,
    /**
     * If `true`, the `input` element is focused during the first mount.
     */
    autoFocus: n.bool,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
     */
    color: n.oneOfType([
      n.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components: n.shape({
      Input: n.elementType,
      Root: n.elementType,
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
    componentsProps: n.shape({
      input: n.object,
      root: n.object,
    }),
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: n.any,
    /**
     * If `true`, the component is disabled.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    disabled: n.bool,
    /**
     * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
     * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
     * @default false
     */
    disableInjectingGlobalStyles: n.bool,
    /**
     * End `InputAdornment` for this component.
     */
    endAdornment: n.node,
    /**
     * If `true`, the `input` will indicate an error.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    error: n.bool,
    /**
     * If `true`, the `input` will take up the full width of its container.
     * @default false
     */
    fullWidth: n.bool,
    /**
     * The id of the `input` element.
     */
    id: n.string,
    /**
     * The component used for the `input` element.
     * Either a string to use a HTML element or a component.
     * @default 'input'
     */
    inputComponent: bi,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * @default {}
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: yt,
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
     */
    margin: n.oneOf(['dense', 'none']),
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    maxRows: n.oneOfType([n.number, n.string]),
    /**
     * Minimum number of rows to display when multiline option is set to true.
     */
    minRows: n.oneOfType([n.number, n.string]),
    /**
     * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
     * @default false
     */
    multiline: n.bool,
    /**
     * Name attribute of the `input` element.
     */
    name: n.string,
    /**
     * Callback fired when the `input` is blurred.
     *
     * Notice that the first argument (event) might be undefined.
     */
    onBlur: n.func,
    /**
     * Callback fired when the value is changed.
     *
     * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     */
    onChange: n.func,
    /**
     * @ignore
     */
    onClick: n.func,
    /**
     * @ignore
     */
    onFocus: n.func,
    /**
     * Callback fired when the `input` doesn't satisfy its constraints.
     */
    onInvalid: n.func,
    /**
     * @ignore
     */
    onKeyDown: n.func,
    /**
     * @ignore
     */
    onKeyUp: n.func,
    /**
     * The short hint displayed in the `input` before the user enters a value.
     */
    placeholder: n.string,
    /**
     * It prevents the user from changing the value of the field
     * (not from interacting with the field).
     */
    readOnly: n.bool,
    /**
     * @ignore
     */
    renderSuffix: n.func,
    /**
     * If `true`, the `input` element is required.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    required: n.bool,
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows: n.oneOfType([n.number, n.string]),
    /**
     * The size of the component.
     */
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slotProps: n.shape({
      input: n.object,
      root: n.object,
    }),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `components` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slots: n.shape({
      input: n.elementType,
      root: n.elementType,
    }),
    /**
     * Start `InputAdornment` for this component.
     */
    startAdornment: n.node,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
     * @default 'text'
     */
    type: n.string,
    /**
     * The value of the `input` element, required for a controlled component.
     */
    value: n.any,
  });
const Gi = ic;
function Xb(e) {
  return Pe('MuiInput', e);
}
const Jb = {
    ...St,
    ..._e('MuiInput', ['root', 'underline', 'input']),
  },
  un = Jb;
function Zb(e) {
  return Pe('MuiOutlinedInput', e);
}
const Qb = {
    ...St,
    ..._e('MuiOutlinedInput', ['root', 'notchedOutline', 'input']),
  },
  Gt = Qb;
function ev(e) {
  return Pe('MuiFilledInput', e);
}
const tv = {
    ...St,
    ..._e('MuiFilledInput', ['root', 'underline', 'input']),
  },
  Rt = tv,
  ac = Gn(
    /* @__PURE__ */ M('path', {
      d: 'M7 10l5 5 5-5z',
    }),
    'ArrowDropDown',
  );
function nv(e) {
  return Pe('MuiAutocomplete', e);
}
const ov = _e('MuiAutocomplete', [
    'root',
    'expanded',
    'fullWidth',
    'focused',
    'focusVisible',
    'tag',
    'tagSizeSmall',
    'tagSizeMedium',
    'hasPopupIcon',
    'hasClearIcon',
    'inputRoot',
    'input',
    'inputFocused',
    'endAdornment',
    'clearIndicator',
    'popupIndicator',
    'popupIndicatorOpen',
    'popper',
    'popperDisablePortal',
    'paper',
    'listbox',
    'loading',
    'noOptions',
    'option',
    'groupLabel',
    'groupUl',
  ]),
  $e = ov;
var ws, ks;
const rv = (e) => {
    const {
        classes: t,
        disablePortal: o,
        expanded: r,
        focused: i,
        fullWidth: a,
        hasClearIcon: s,
        hasPopupIcon: l,
        inputFocused: c,
        popupOpen: d,
        size: u,
      } = e,
      p = {
        root: [
          'root',
          r && 'expanded',
          i && 'focused',
          a && 'fullWidth',
          s && 'hasClearIcon',
          l && 'hasPopupIcon',
        ],
        inputRoot: ['inputRoot'],
        input: ['input', c && 'inputFocused'],
        tag: ['tag', `tagSize${oe(u)}`],
        endAdornment: ['endAdornment'],
        clearIndicator: ['clearIndicator'],
        popupIndicator: ['popupIndicator', d && 'popupIndicatorOpen'],
        popper: ['popper', o && 'popperDisablePortal'],
        paper: ['paper'],
        listbox: ['listbox'],
        loading: ['loading'],
        noOptions: ['noOptions'],
        option: ['option'],
        groupLabel: ['groupLabel'],
        groupUl: ['groupUl'],
      };
    return De(p, nv, t);
  },
  iv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: i, hasPopupIcon: a, inputFocused: s, size: l } = o;
      return [
        {
          [`& .${$e.tag}`]: t.tag,
        },
        {
          [`& .${$e.tag}`]: t[`tagSize${oe(l)}`],
        },
        {
          [`& .${$e.inputRoot}`]: t.inputRoot,
        },
        {
          [`& .${$e.input}`]: t.input,
        },
        {
          [`& .${$e.input}`]: s && t.inputFocused,
        },
        t.root,
        r && t.fullWidth,
        a && t.hasPopupIcon,
        i && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) => ({
    [`&.${$e.focused} .${$e.clearIndicator}`]: {
      visibility: 'visible',
    },
    /* Avoid double tap issue on iOS */
    '@media (pointer: fine)': {
      [`&:hover .${$e.clearIndicator}`]: {
        visibility: 'visible',
      },
    },
    ...(e.fullWidth && {
      width: '100%',
    }),
    [`& .${$e.tag}`]: {
      margin: 3,
      maxWidth: 'calc(100% - 6px)',
      ...(e.size === 'small' && {
        margin: 2,
        maxWidth: 'calc(100% - 4px)',
      }),
    },
    [`& .${$e.inputRoot}`]: {
      flexWrap: 'wrap',
      [`.${$e.hasPopupIcon}&, .${$e.hasClearIcon}&`]: {
        paddingRight: 26 + 4,
      },
      [`.${$e.hasPopupIcon}.${$e.hasClearIcon}&`]: {
        paddingRight: 52 + 4,
      },
      [`& .${$e.input}`]: {
        width: 0,
        minWidth: 30,
      },
    },
    [`& .${un.root}`]: {
      paddingBottom: 1,
      '& .MuiInput-input': {
        padding: '4px 4px 4px 0px',
      },
    },
    [`& .${un.root}.${St.sizeSmall}`]: {
      [`& .${un.input}`]: {
        padding: '2px 4px 3px 0',
      },
    },
    [`& .${Gt.root}`]: {
      padding: 9,
      [`.${$e.hasPopupIcon}&, .${$e.hasClearIcon}&`]: {
        paddingRight: 26 + 4 + 9,
      },
      [`.${$e.hasPopupIcon}.${$e.hasClearIcon}&`]: {
        paddingRight: 52 + 4 + 9,
      },
      [`& .${$e.input}`]: {
        padding: '7.5px 4px 7.5px 5px',
      },
      [`& .${$e.endAdornment}`]: {
        right: 9,
      },
    },
    [`& .${Gt.root}.${St.sizeSmall}`]: {
      // Don't specify paddingRight, as it overrides the default value set when there is only
      // one of the popup or clear icon as the specificity is equal so the latter one wins
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 6,
      [`& .${$e.input}`]: {
        padding: '2.5px 4px 2.5px 8px',
      },
    },
    [`& .${Rt.root}`]: {
      paddingTop: 19,
      paddingLeft: 8,
      [`.${$e.hasPopupIcon}&, .${$e.hasClearIcon}&`]: {
        paddingRight: 26 + 4 + 9,
      },
      [`.${$e.hasPopupIcon}.${$e.hasClearIcon}&`]: {
        paddingRight: 52 + 4 + 9,
      },
      [`& .${Rt.input}`]: {
        padding: '7px 4px',
      },
      [`& .${$e.endAdornment}`]: {
        right: 9,
      },
    },
    [`& .${Rt.root}.${St.sizeSmall}`]: {
      paddingBottom: 1,
      [`& .${Rt.input}`]: {
        padding: '2.5px 4px',
      },
    },
    [`& .${St.hiddenLabel}`]: {
      paddingTop: 8,
    },
    [`& .${Rt.root}.${St.hiddenLabel}`]: {
      paddingTop: 0,
      paddingBottom: 0,
      [`& .${$e.input}`]: {
        paddingTop: 16,
        paddingBottom: 17,
      },
    },
    [`& .${Rt.root}.${St.hiddenLabel}.${St.sizeSmall}`]: {
      [`& .${$e.input}`]: {
        paddingTop: 8,
        paddingBottom: 9,
      },
    },
    [`& .${$e.input}`]: {
      flexGrow: 1,
      textOverflow: 'ellipsis',
      opacity: 0,
      ...(e.inputFocused && {
        opacity: 1,
      }),
    },
  })),
  av = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'EndAdornment',
    overridesResolver: (e, t) => t.endAdornment,
  })({
    // We use a position absolute to support wrapping tags.
    position: 'absolute',
    right: 0,
    top: 'calc(50% - 14px)',
    // Center vertically
  }),
  sv = pe(Ql, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  }),
  lv = pe(Ql, {
    name: 'MuiAutocomplete',
    slot: 'PopupIndicator',
    overridesResolver: ({ ownerState: e }, t) => ({
      ...t.popupIndicator,
      ...(e.popupOpen && t.popupIndicatorOpen),
    }),
  })(({ ownerState: e }) => ({
    padding: 2,
    marginRight: -2,
    ...(e.popupOpen && {
      transform: 'rotate(180deg)',
    }),
  })),
  cv = pe(tc, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${$e.option}`]: t.option,
        },
        t.popper,
        o.disablePortal && t.popperDisablePortal,
      ];
    },
  })(({ theme: e, ownerState: t }) => ({
    zIndex: (e.vars || e).zIndex.modal,
    ...(t.disablePortal && {
      position: 'absolute',
    }),
  })),
  uv = pe(ko, {
    name: 'MuiAutocomplete',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })(({ theme: e }) => ({
    ...e.typography.body1,
    overflow: 'auto',
  })),
  dv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  pv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  fv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Listbox',
    overridesResolver: (e, t) => t.listbox,
  })(({ theme: e }) => ({
    listStyle: 'none',
    margin: 0,
    padding: '8px 0',
    maxHeight: '40vh',
    overflow: 'auto',
    position: 'relative',
    [`& .${$e.option}`]: {
      minHeight: 48,
      display: 'flex',
      overflow: 'hidden',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      paddingTop: 6,
      boxSizing: 'border-box',
      outline: '0',
      WebkitTapHighlightColor: 'transparent',
      paddingBottom: 6,
      paddingLeft: 16,
      paddingRight: 16,
      [e.breakpoints.up('sm')]: {
        minHeight: 'auto',
      },
      [`&.${$e.focused}`]: {
        backgroundColor: (e.vars || e).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&[aria-disabled="true"]': {
        opacity: (e.vars || e).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`&.${$e.focusVisible}`]: {
        backgroundColor: (e.vars || e).palette.action.focus,
      },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : Je(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${$e.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : Je(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: (e.vars || e).palette.action.selected,
          },
        },
        [`&.${$e.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : Je(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
              ),
        },
      },
    },
  })),
  mv = pe(Lb, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({
    backgroundColor: (e.vars || e).palette.background.paper,
    top: -8,
  })),
  hv = pe('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({
    padding: 0,
    [`& .${$e.option}`]: {
      paddingLeft: 24,
    },
  }),
  sc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ye({
        props: t,
        name: 'MuiAutocomplete',
      }),
      {
        autoComplete: c = !1,
        autoHighlight: d = !1,
        autoSelect: u = !1,
        blurOnSelect: p = !1,
        ChipProps: h,
        className: y,
        clearIcon: g = ws ||
          (ws = /* @__PURE__ */ M(Ib, {
            fontSize: 'small',
          })),
        clearOnBlur: m = !l.freeSolo,
        clearOnEscape: v = !1,
        clearText: T = 'Clear',
        closeText: C = 'Close',
        componentsProps: O = {},
        defaultValue: E = l.multiple ? [] : null,
        disableClearable: f = !1,
        disableCloseOnSelect: R = !1,
        disabled: S = !1,
        disabledItemsFocusable: D = !1,
        disableListWrap: B = !1,
        disablePortal: N = !1,
        filterOptions: I,
        filterSelectedOptions: J = !1,
        forcePopupIcon: j = 'auto',
        freeSolo: _ = !1,
        fullWidth: A = !1,
        getLimitTagsText: q = (Oe) => `+${Oe}`,
        getOptionDisabled: ae,
        getOptionLabel: Q = (Oe) => {
          var Fe;
          return (Fe = Oe.label) != null ? Fe : Oe;
        },
        isOptionEqualToValue: z,
        groupBy: w,
        handleHomeEndKeys: L = !l.freeSolo,
        id: G,
        includeInputInList: V = !1,
        inputValue: H,
        limitTags: K = -1,
        ListboxComponent: re = 'ul',
        ListboxProps: Z,
        loading: ie = !1,
        loadingText: ce = 'Loading…',
        multiple: ue = !1,
        noOptionsText: me = 'No options',
        onChange: P,
        onClose: Te,
        onHighlightChange: X,
        onInputChange: W,
        onOpen: Ce,
        open: de,
        openOnFocus: ke = !1,
        openText: Le = 'Open',
        options: Xe,
        PaperComponent: Ke = ko,
        PopperComponent: je = tc,
        popupIcon: Ze = ks || (ks = /* @__PURE__ */ M(ac, {})),
        readOnly: ee = !1,
        renderGroup: te,
        renderInput: ye,
        renderOption: he,
        renderTags: xe,
        selectOnFocus: Ne = !l.freeSolo,
        size: se = 'medium',
        slotProps: we = {},
        value: U,
        ...ge
      } = l,
      {
        getRootProps: Se,
        getInputProps: ft,
        getInputLabelProps: ht,
        getPopupIndicatorProps: st,
        getClearProps: Et,
        getTagProps: xt,
        getListboxProps: Qe,
        getOptionProps: lt,
        value: ut,
        dirty: Wt,
        expanded: Ht,
        id: nn,
        popupOpen: Ot,
        focused: qt,
        focusedTag: Yt,
        anchorEl: Tt,
        setAnchorEl: hn,
        inputValue: on,
        groupedOptions: Ct,
      } = Zh({
        ...l,
        componentName: 'Autocomplete',
      }),
      Dt = !f && !S && Wt && !ee,
      Kt = (!_ || j === !0) && j !== !1,
      { onMouseDown: bn } = ft(),
      at = {
        ...l,
        disablePortal: N,
        expanded: Ht,
        focused: qt,
        fullWidth: A,
        hasClearIcon: Dt,
        hasPopupIcon: Kt,
        inputFocused: Yt === -1,
        popupOpen: Ot,
        size: se,
      },
      x = rv(at);
    let F;
    if (ue && ut.length > 0) {
      const Oe = (Fe) => ({
        className: x.tag,
        disabled: S,
        ...xt(Fe),
      });
      xe
        ? (F = xe(ut, Oe, at))
        : (F = ut.map((Fe, rn) =>
            /* @__PURE__ */ M(Wb, {
              label: Q(Fe),
              size: se,
              ...Oe({
                index: rn,
              }),
              ...h,
            }),
          ));
    }
    if (K > -1 && Array.isArray(F)) {
      const Oe = F.length - K;
      !qt &&
        Oe > 0 &&
        ((F = F.splice(0, K)),
        F.push(
          /* @__PURE__ */ M(
            'span',
            {
              className: x.tag,
              children: q(Oe),
            },
            F.length,
          ),
        ));
    }
    const k =
        te ||
        ((Oe) =>
          /* @__PURE__ */ Ge(
            'li',
            {
              children: [
                /* @__PURE__ */ M(mv, {
                  className: x.groupLabel,
                  ownerState: at,
                  component: 'div',
                  children: Oe.group,
                }),
                /* @__PURE__ */ M(hv, {
                  className: x.groupUl,
                  ownerState: at,
                  children: Oe.children,
                }),
              ],
            },
            Oe.key,
          )),
      Y =
        he ||
        ((Oe, Fe) =>
          /* @__PURE__ */ M('li', {
            ...Oe,
            children: Q(Fe),
          })),
      ne = (Oe, Fe) => {
        const rn = lt({
          option: Oe,
          index: Fe,
        });
        return Y(
          {
            ...rn,
            className: x.option,
          },
          Oe,
          {
            selected: rn['aria-selected'],
            index: Fe,
            inputValue: on,
          },
        );
      },
      fe = (r = we.clearIndicator) != null ? r : O.clearIndicator,
      be = (i = we.paper) != null ? i : O.paper,
      ve = (a = we.popper) != null ? a : O.popper,
      Re = (s = we.popupIndicator) != null ? s : O.popupIndicator;
    return /* @__PURE__ */ Ge(b.Fragment, {
      children: [
        /* @__PURE__ */ M(iv, {
          ref: o,
          className: Ee(x.root, y),
          ownerState: at,
          ...Se(ge),
          children: ye({
            id: nn,
            disabled: S,
            fullWidth: !0,
            size: se === 'small' ? 'small' : void 0,
            InputLabelProps: ht(),
            InputProps: {
              ref: hn,
              className: x.inputRoot,
              startAdornment: F,
              onClick: (Oe) => {
                Oe.target === Oe.currentTarget && bn(Oe);
              },
              ...((Dt || Kt) && {
                endAdornment: /* @__PURE__ */ Ge(av, {
                  className: x.endAdornment,
                  ownerState: at,
                  children: [
                    Dt
                      ? /* @__PURE__ */ M(sv, {
                          ...Et(),
                          'aria-label': T,
                          title: T,
                          ownerState: at,
                          ...fe,
                          className: Ee(x.clearIndicator, fe == null ? void 0 : fe.className),
                          children: g,
                        })
                      : null,
                    Kt
                      ? /* @__PURE__ */ M(lv, {
                          ...st(),
                          disabled: S,
                          'aria-label': Ot ? C : Le,
                          title: Ot ? C : Le,
                          ownerState: at,
                          ...Re,
                          className: Ee(x.popupIndicator, Re == null ? void 0 : Re.className),
                          children: Ze,
                        })
                      : null,
                  ],
                }),
              }),
            },
            inputProps: {
              className: x.input,
              disabled: S,
              readOnly: ee,
              ...ft(),
            },
          }),
        }),
        Tt
          ? /* @__PURE__ */ M(cv, {
              as: je,
              disablePortal: N,
              style: {
                width: Tt ? Tt.clientWidth : null,
              },
              ownerState: at,
              role: 'presentation',
              anchorEl: Tt,
              open: Ot,
              ...ve,
              className: Ee(x.popper, ve == null ? void 0 : ve.className),
              children: /* @__PURE__ */ Ge(uv, {
                ownerState: at,
                as: Ke,
                ...be,
                className: Ee(x.paper, be == null ? void 0 : be.className),
                children: [
                  ie && Ct.length === 0
                    ? /* @__PURE__ */ M(dv, {
                        className: x.loading,
                        ownerState: at,
                        children: ce,
                      })
                    : null,
                  Ct.length === 0 && !_ && !ie
                    ? /* @__PURE__ */ M(pv, {
                        className: x.noOptions,
                        ownerState: at,
                        role: 'presentation',
                        onMouseDown: (Oe) => {
                          Oe.preventDefault();
                        },
                        children: me,
                      })
                    : null,
                  Ct.length > 0
                    ? /* @__PURE__ */ M(fv, {
                        as: re,
                        className: x.listbox,
                        ownerState: at,
                        ...Qe(),
                        ...Z,
                        children: Ct.map((Oe, Fe) =>
                          w
                            ? k({
                                key: Oe.key,
                                group: Oe.group,
                                children: Oe.options.map((rn, Lt) => ne(rn, Oe.index + Lt)),
                              })
                            : ne(Oe, Fe),
                        ),
                      })
                    : null,
                ],
              }),
            })
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (sc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * If `true`, the portion of the selected suggestion that has not been typed by the user,
     * known as the completion string, appears inline after the input cursor in the textbox.
     * The inline completion string is visually highlighted and has a selected state.
     * @default false
     */
    autoComplete: n.bool,
    /**
     * If `true`, the first option is automatically highlighted.
     * @default false
     */
    autoHighlight: n.bool,
    /**
     * If `true`, the selected option becomes the value of the input
     * when the Autocomplete loses focus unless the user chooses
     * a different option or changes the character string in the input.
     *
     * When using `freeSolo` mode, the typed value will be the input value
     * if the Autocomplete loses focus without highlighting an option.
     * @default false
     */
    autoSelect: n.bool,
    /**
     * Control if the input should be blurred when an option is selected:
     *
     * - `false` the input is not blurred.
     * - `true` the input is always blurred.
     * - `touch` the input is blurred after a touch event.
     * - `mouse` the input is blurred after a mouse event.
     * @default false
     */
    blurOnSelect: n.oneOfType([n.oneOf(['mouse', 'touch']), n.bool]),
    /**
     * Props applied to the [`Chip`](/material-ui/api/chip/) element.
     */
    ChipProps: n.object,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The icon to display in place of the default clear icon.
     * @default <ClearIcon fontSize="small" />
     */
    clearIcon: n.node,
    /**
     * If `true`, the input's text is cleared on blur if no value is selected.
     *
     * Set to `true` if you want to help the user enter a new value.
     * Set to `false` if you want to help the user resume their search.
     * @default !props.freeSolo
     */
    clearOnBlur: n.bool,
    /**
     * If `true`, clear all values when the user presses escape and the popup is closed.
     * @default false
     */
    clearOnEscape: n.bool,
    /**
     * Override the default text for the *clear* icon button.
     *
     * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
     * @default 'Clear'
     */
    clearText: n.string,
    /**
     * Override the default text for the *close popup* icon button.
     *
     * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
     * @default 'Close'
     */
    closeText: n.string,
    /**
     * The props used for each slot inside.
     * @default {}
     */
    componentsProps: n.shape({
      clearIndicator: n.object,
      paper: n.object,
      popper: n.object,
      popupIndicator: n.object,
    }),
    /**
     * The default value. Use when the component is not controlled.
     * @default props.multiple ? [] : null
     */
    defaultValue: Bt(n.any, (e) =>
      e.multiple && e.defaultValue !== void 0 && !Array.isArray(e.defaultValue)
        ? new Error(
            [
              'MUI: The Autocomplete expects the `defaultValue` prop to be an array when `multiple={true}` or undefined.',
              `However, ${e.defaultValue} was provided.`,
            ].join(`
`),
          )
        : null,
    ),
    /**
     * If `true`, the input can't be cleared.
     * @default false
     */
    disableClearable: n.bool,
    /**
     * If `true`, the popup won't close when a value is selected.
     * @default false
     */
    disableCloseOnSelect: n.bool,
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: n.bool,
    /**
     * If `true`, will allow focus on disabled items.
     * @default false
     */
    disabledItemsFocusable: n.bool,
    /**
     * If `true`, the list box in the popup will not wrap focus.
     * @default false
     */
    disableListWrap: n.bool,
    /**
     * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
    /**
     * A function that determines the filtered options to be rendered on search.
     *
     * @default createFilterOptions()
     * @param {T[]} options The options to render.
     * @param {object} state The state of the component.
     * @returns {T[]}
     */
    filterOptions: n.func,
    /**
     * If `true`, hide the selected options from the list box.
     * @default false
     */
    filterSelectedOptions: n.bool,
    /**
     * Force the visibility display of the popup icon.
     * @default 'auto'
     */
    forcePopupIcon: n.oneOfType([n.oneOf(['auto']), n.bool]),
    /**
     * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
     * @default false
     */
    freeSolo: n.bool,
    /**
     * If `true`, the input will take up the full width of its container.
     * @default false
     */
    fullWidth: n.bool,
    /**
     * The label to display when the tags are truncated (`limitTags`).
     *
     * @param {number} more The number of truncated tags.
     * @returns {ReactNode}
     * @default (more) => `+${more}`
     */
    getLimitTagsText: n.func,
    /**
     * Used to determine the disabled state for a given option.
     *
     * @param {T} option The option to test.
     * @returns {boolean}
     */
    getOptionDisabled: n.func,
    /**
     * Used to determine the string value for a given option.
     * It's used to fill the input (and the list box options if `renderOption` is not provided).
     *
     * If used in free solo mode, it must accept both the type of the options and a string.
     *
     * @param {T} option
     * @returns {string}
     * @default (option) => option.label ?? option
     */
    getOptionLabel: n.func,
    /**
     * If provided, the options will be grouped under the returned string.
     * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
     *
     * @param {T} options The options to group.
     * @returns {string}
     */
    groupBy: n.func,
    /**
     * If `true`, the component handles the "Home" and "End" keys when the popup is open.
     * It should move focus to the first option and last option, respectively.
     * @default !props.freeSolo
     */
    handleHomeEndKeys: n.bool,
    /**
     * This prop is used to help implement the accessibility logic.
     * If you don't provide an id it will fall back to a randomly generated one.
     */
    id: n.string,
    /**
     * If `true`, the highlight can move to the input.
     * @default false
     */
    includeInputInList: n.bool,
    /**
     * The input value.
     */
    inputValue: n.string,
    /**
     * Used to determine if the option represents the given value.
     * Uses strict equality by default.
     * ⚠️ Both arguments need to be handled, an option can only match with one value.
     *
     * @param {T} option The option to test.
     * @param {T} value The value to test against.
     * @returns {boolean}
     */
    isOptionEqualToValue: n.func,
    /**
     * The maximum number of tags that will be visible when not focused.
     * Set `-1` to disable the limit.
     * @default -1
     */
    limitTags: yi,
    /**
     * The component used to render the listbox.
     * @default 'ul'
     */
    ListboxComponent: n.elementType,
    /**
     * Props applied to the Listbox element.
     */
    ListboxProps: n.object,
    /**
     * If `true`, the component is in a loading state.
     * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, e.g. `options` are empty).
     * @default false
     */
    loading: n.bool,
    /**
     * Text to display when in a loading state.
     *
     * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
     * @default 'Loading…'
     */
    loadingText: n.node,
    /**
     * If `true`, `value` must be an array and the menu will support multiple selections.
     * @default false
     */
    multiple: n.bool,
    /**
     * Text to display when there are no options.
     *
     * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
     * @default 'No options'
     */
    noOptionsText: n.node,
    /**
     * Callback fired when the value changes.
     *
     * @param {React.SyntheticEvent} event The event source of the callback.
     * @param {T|T[]} value The new value of the component.
     * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
     * @param {string} [details]
     */
    onChange: n.func,
    /**
     * Callback fired when the popup requests to be closed.
     * Use in controlled mode (see open).
     *
     * @param {React.SyntheticEvent} event The event source of the callback.
     * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
     */
    onClose: n.func,
    /**
     * Callback fired when the highlight option changes.
     *
     * @param {React.SyntheticEvent} event The event source of the callback.
     * @param {T} option The highlighted option.
     * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`, `"touch"`.
     */
    onHighlightChange: n.func,
    /**
     * Callback fired when the input value changes.
     *
     * @param {React.SyntheticEvent} event The event source of the callback.
     * @param {string} value The new value of the text input.
     * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
     */
    onInputChange: n.func,
    /**
     * Callback fired when the popup requests to be opened.
     * Use in controlled mode (see open).
     *
     * @param {React.SyntheticEvent} event The event source of the callback.
     */
    onOpen: n.func,
    /**
     * If `true`, the component is shown.
     */
    open: n.bool,
    /**
     * If `true`, the popup will open on input focus.
     * @default false
     */
    openOnFocus: n.bool,
    /**
     * Override the default text for the *open popup* icon button.
     *
     * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
     * @default 'Open'
     */
    openText: n.string,
    /**
     * Array of options.
     */
    options: n.array.isRequired,
    /**
     * The component used to render the body of the popup.
     * @default Paper
     */
    PaperComponent: n.elementType,
    /**
     * The component used to position the popup.
     * @default Popper
     */
    PopperComponent: n.elementType,
    /**
     * The icon to display in place of the default popup icon.
     * @default <ArrowDropDownIcon />
     */
    popupIcon: n.node,
    /**
     * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
     * @default false
     */
    readOnly: n.bool,
    /**
     * Render the group.
     *
     * @param {AutocompleteRenderGroupParams} params The group to render.
     * @returns {ReactNode}
     */
    renderGroup: n.func,
    /**
     * Render the input.
     *
     * @param {object} params
     * @returns {ReactNode}
     */
    renderInput: n.func.isRequired,
    /**
     * Render the option, use `getOptionLabel` by default.
     *
     * @param {object} props The props to apply on the li element.
     * @param {T} option The option to render.
     * @param {object} state The state of the component.
     * @returns {ReactNode}
     */
    renderOption: n.func,
    /**
     * Render the selected value.
     *
     * @param {T[]} value The `value` provided to the component.
     * @param {function} getTagProps A tag props getter.
     * @param {object} ownerState The state of the Autocomplete component.
     * @returns {ReactNode}
     */
    renderTags: n.func,
    /**
     * If `true`, the input's text is selected on focus.
     * It helps the user clear the selected value.
     * @default !props.freeSolo
     */
    selectOnFocus: n.bool,
    /**
     * The size of the component.
     * @default 'medium'
     */
    size: n.oneOfType([n.oneOf(['small', 'medium']), n.string]),
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps: n.shape({
      clearIndicator: n.object,
      paper: n.object,
      popper: n.object,
      popupIndicator: n.object,
    }),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The value of the autocomplete.
     *
     * The value must have reference equality with the option in order to be selected.
     * You can customize the equality behavior with the `isOptionEqualToValue` prop.
     */
    value: Bt(n.any, (e) =>
      e.multiple && e.value !== void 0 && !Array.isArray(e.value)
        ? new Error(
            [
              'MUI: The Autocomplete expects the `value` prop to be an array when `multiple={true}` or undefined.',
              `However, ${e.value} was provided.`,
            ].join(`
`),
          )
        : null,
    ),
  });
const bv = sc,
  vv = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
  },
  lc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Kn(),
      i = {
        enter: r.transitions.duration.enteringScreen,
        exit: r.transitions.duration.leavingScreen,
      },
      {
        addEndListener: a,
        appear: s = !0,
        children: l,
        easing: c,
        in: d,
        onEnter: u,
        onEntered: p,
        onEntering: h,
        onExit: y,
        onExited: g,
        onExiting: m,
        style: v,
        timeout: T = i,
        // eslint-disable-next-line react/prop-types
        TransitionComponent: C = ql,
        ...O
      } = t,
      E = b.useRef(null),
      f = it(E, l.ref, o),
      R = (_) => (A) => {
        if (_) {
          const q = E.current;
          A === void 0 ? _(q) : _(q, A);
        }
      },
      S = R(h),
      D = R((_, A) => {
        Yl(_);
        const q = rr(
          {
            style: v,
            timeout: T,
            easing: c,
          },
          {
            mode: 'enter',
          },
        );
        (_.style.webkitTransition = r.transitions.create('opacity', q)),
          (_.style.transition = r.transitions.create('opacity', q)),
          u && u(_, A);
      }),
      B = R(p),
      N = R(m),
      I = R((_) => {
        const A = rr(
          {
            style: v,
            timeout: T,
            easing: c,
          },
          {
            mode: 'exit',
          },
        );
        (_.style.webkitTransition = r.transitions.create('opacity', A)),
          (_.style.transition = r.transitions.create('opacity', A)),
          y && y(_);
      }),
      J = R(g);
    return /* @__PURE__ */ M(C, {
      appear: s,
      in: d,
      nodeRef: E,
      onEnter: D,
      onEntered: B,
      onEntering: S,
      onExit: I,
      onExited: J,
      onExiting: N,
      addEndListener: (_) => {
        a && a(E.current, _);
      },
      timeout: T,
      ...O,
      children: (_, A) =>
        /* @__PURE__ */ b.cloneElement(l, {
          style: {
            opacity: 0,
            visibility: _ === 'exited' && !d ? 'hidden' : void 0,
            ...vv[_],
            ...v,
            ...l.props.style,
          },
          ref: f,
          ...A,
        }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (lc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * Add a custom transition end trigger. Called with the transitioning DOM
     * node and a done callback. Allows for more fine grained transition end
     * logic. Note: Timeouts are still used as a fallback if provided.
     */
    addEndListener: n.func,
    /**
     * Perform the enter transition when it first mounts if `in` is also `true`.
     * Set this to `false` to disable this behavior.
     * @default true
     */
    appear: n.bool,
    /**
     * A single child content element.
     */
    children: Hn.isRequired,
    /**
     * The transition timing function.
     * You may specify a single easing or a object containing enter and exit values.
     */
    easing: n.oneOfType([
      n.shape({
        enter: n.string,
        exit: n.string,
      }),
      n.string,
    ]),
    /**
     * If `true`, the component will transition in.
     */
    in: n.bool,
    /**
     * @ignore
     */
    onEnter: n.func,
    /**
     * @ignore
     */
    onEntered: n.func,
    /**
     * @ignore
     */
    onEntering: n.func,
    /**
     * @ignore
     */
    onExit: n.func,
    /**
     * @ignore
     */
    onExited: n.func,
    /**
     * @ignore
     */
    onExiting: n.func,
    /**
     * @ignore
     */
    style: n.object,
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     * @default {
     *   enter: theme.transitions.duration.enteringScreen,
     *   exit: theme.transitions.duration.leavingScreen,
     * }
     */
    timeout: n.oneOfType([
      n.number,
      n.shape({
        appear: n.number,
        enter: n.number,
        exit: n.number,
      }),
    ]),
  });
const gv = lc;
function yv(e) {
  return Pe('MuiBackdrop', e);
}
_e('MuiBackdrop', ['root', 'invisible']);
const Ev = (e) => {
    const { classes: t, invisible: o } = e;
    return De(
      {
        root: ['root', o && 'invisible'],
      },
      yv,
      t,
    );
  },
  xv = pe('div', {
    name: 'MuiBackdrop',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.invisible && t.invisible];
    },
  })(({ ownerState: e }) => ({
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
    ...(e.invisible && {
      backgroundColor: 'transparent',
    }),
  })),
  cc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a;
    const s = Ye({
        props: t,
        name: 'MuiBackdrop',
      }),
      {
        children: l,
        className: c,
        component: d = 'div',
        components: u = {},
        componentsProps: p = {},
        invisible: h = !1,
        open: y,
        slotProps: g = {},
        slots: m = {},
        TransitionComponent: v = gv,
        transitionDuration: T,
        ...C
      } = s,
      O = {
        ...s,
        component: d,
        invisible: h,
      },
      E = Ev(O),
      f = (r = g.root) != null ? r : p.root;
    return /* @__PURE__ */ M(v, {
      in: y,
      timeout: T,
      ...C,
      children: /* @__PURE__ */ M(xv, {
        'aria-hidden': !0,
        ...f,
        as: (i = (a = m.root) != null ? a : u.Root) != null ? i : d,
        className: Ee(E.root, c, f == null ? void 0 : f.className),
        ownerState: {
          ...O,
          ...(f == null ? void 0 : f.ownerState),
        },
        classes: E,
        ref: o,
        children: l,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (cc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components: n.shape({
      Root: n.elementType,
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
    componentsProps: n.shape({
      root: n.object,
    }),
    /**
     * If `true`, the backdrop is invisible.
     * It can be used when rendering a popover or a custom select component.
     * @default false
     */
    invisible: n.bool,
    /**
     * If `true`, the component is shown.
     */
    open: n.bool.isRequired,
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slotProps: n.shape({
      root: n.object,
    }),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `components` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slots: n.shape({
      root: n.elementType,
    }),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The component used for the transition.
     * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
     * @default Fade
     */
    TransitionComponent: n.elementType,
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     */
    transitionDuration: n.oneOfType([
      n.number,
      n.shape({
        appear: n.number,
        enter: n.number,
        exit: n.number,
      }),
    ]),
  });
const Ov = cc;
function Tv(e) {
  return Pe('MuiButton', e);
}
const Cv = _e('MuiButton', [
    'root',
    'text',
    'textInherit',
    'textPrimary',
    'textSecondary',
    'textSuccess',
    'textError',
    'textInfo',
    'textWarning',
    'outlined',
    'outlinedInherit',
    'outlinedPrimary',
    'outlinedSecondary',
    'outlinedSuccess',
    'outlinedError',
    'outlinedInfo',
    'outlinedWarning',
    'contained',
    'containedInherit',
    'containedPrimary',
    'containedSecondary',
    'containedSuccess',
    'containedError',
    'containedInfo',
    'containedWarning',
    'disableElevation',
    'focusVisible',
    'disabled',
    'colorInherit',
    'textSizeSmall',
    'textSizeMedium',
    'textSizeLarge',
    'outlinedSizeSmall',
    'outlinedSizeMedium',
    'outlinedSizeLarge',
    'containedSizeSmall',
    'containedSizeMedium',
    'containedSizeLarge',
    'sizeMedium',
    'sizeSmall',
    'sizeLarge',
    'fullWidth',
    'startIcon',
    'endIcon',
    'iconSizeSmall',
    'iconSizeMedium',
    'iconSizeLarge',
  ]),
  jo = Cv,
  uc = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (uc.displayName = 'ButtonGroupContext');
const Sv = uc,
  Rv = (e) => {
    const { color: t, disableElevation: o, fullWidth: r, size: i, variant: a, classes: s } = e,
      l = {
        root: [
          'root',
          a,
          `${a}${oe(t)}`,
          `size${oe(i)}`,
          `${a}Size${oe(i)}`,
          t === 'inherit' && 'colorInherit',
          o && 'disableElevation',
          r && 'fullWidth',
        ],
        label: ['label'],
        startIcon: ['startIcon', `iconSize${oe(i)}`],
        endIcon: ['endIcon', `iconSize${oe(i)}`],
      },
      c = De(l, Tv, s);
    return {
      ...s,
      // forward the focused, disabled, etc. classes to the ButtonBase
      ...c,
    };
  },
  dc = (e) => ({
    ...(e.size === 'small' && {
      '& > *:nth-of-type(1)': {
        fontSize: 18,
      },
    }),
    ...(e.size === 'medium' && {
      '& > *:nth-of-type(1)': {
        fontSize: 20,
      },
    }),
    ...(e.size === 'large' && {
      '& > *:nth-of-type(1)': {
        fontSize: 22,
      },
    }),
  }),
  wv = pe(Oo, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[o.variant],
        t[`${o.variant}${oe(o.color)}`],
        t[`size${oe(o.size)}`],
        t[`${o.variant}Size${oe(o.size)}`],
        o.color === 'inherit' && t.colorInherit,
        o.disableElevation && t.disableElevation,
        o.fullWidth && t.fullWidth,
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => {
      var o, r;
      const i = e.palette.mode === 'light' ? e.palette.grey[300] : e.palette.grey[800],
        a = e.palette.mode === 'light' ? e.palette.grey.A100 : e.palette.grey[700];
      return {
        ...e.typography.button,
        minWidth: 64,
        padding: '6px 16px',
        borderRadius: (e.vars || e).shape.borderRadius,
        transition: e.transitions.create(
          ['background-color', 'box-shadow', 'border-color', 'color'],
          {
            duration: e.transitions.duration.short,
          },
        ),
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
            : Je(e.palette.text.primary, e.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
          ...(t.variant === 'text' &&
            t.color !== 'inherit' && {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Je(e.palette[t.color].main, e.palette.action.hoverOpacity),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            }),
          ...(t.variant === 'outlined' &&
            t.color !== 'inherit' && {
              border: `1px solid ${(e.vars || e).palette[t.color].main}`,
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Je(e.palette[t.color].main, e.palette.action.hoverOpacity),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            }),
          ...(t.variant === 'contained' && {
            backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedHoverBg : a,
            boxShadow: (e.vars || e).shadows[4],
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              boxShadow: (e.vars || e).shadows[2],
              backgroundColor: (e.vars || e).palette.grey[300],
            },
          }),
          ...(t.variant === 'contained' &&
            t.color !== 'inherit' && {
              backgroundColor: (e.vars || e).palette[t.color].dark,
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: (e.vars || e).palette[t.color].main,
              },
            }),
        },
        '&:active': {
          ...(t.variant === 'contained' && {
            boxShadow: (e.vars || e).shadows[8],
          }),
        },
        [`&.${jo.focusVisible}`]: {
          ...(t.variant === 'contained' && {
            boxShadow: (e.vars || e).shadows[6],
          }),
        },
        [`&.${jo.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
          ...(t.variant === 'outlined' && {
            border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`,
          }),
          ...(t.variant === 'contained' && {
            color: (e.vars || e).palette.action.disabled,
            boxShadow: (e.vars || e).shadows[0],
            backgroundColor: (e.vars || e).palette.action.disabledBackground,
          }),
        },
        ...(t.variant === 'text' && {
          padding: '6px 8px',
        }),
        ...(t.variant === 'text' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].main,
          }),
        ...(t.variant === 'outlined' && {
          padding: '5px 15px',
          border: '1px solid currentColor',
        }),
        ...(t.variant === 'outlined' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].main,
            border: e.vars
              ? `1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)`
              : `1px solid ${Je(e.palette[t.color].main, 0.5)}`,
          }),
        ...(t.variant === 'contained' && {
          color: e.vars
            ? // this is safe because grey does not change between default light/dark mode
              e.vars.palette.text.primary
            : (o = (r = e.palette).getContrastText) == null
            ? void 0
            : o.call(r, e.palette.grey[300]),
          backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedBg : i,
          boxShadow: (e.vars || e).shadows[2],
        }),
        ...(t.variant === 'contained' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].contrastText,
            backgroundColor: (e.vars || e).palette[t.color].main,
          }),
        ...(t.color === 'inherit' && {
          color: 'inherit',
          borderColor: 'currentColor',
        }),
        ...(t.size === 'small' &&
          t.variant === 'text' && {
            padding: '4px 5px',
            fontSize: e.typography.pxToRem(13),
          }),
        ...(t.size === 'large' &&
          t.variant === 'text' && {
            padding: '8px 11px',
            fontSize: e.typography.pxToRem(15),
          }),
        ...(t.size === 'small' &&
          t.variant === 'outlined' && {
            padding: '3px 9px',
            fontSize: e.typography.pxToRem(13),
          }),
        ...(t.size === 'large' &&
          t.variant === 'outlined' && {
            padding: '7px 21px',
            fontSize: e.typography.pxToRem(15),
          }),
        ...(t.size === 'small' &&
          t.variant === 'contained' && {
            padding: '4px 10px',
            fontSize: e.typography.pxToRem(13),
          }),
        ...(t.size === 'large' &&
          t.variant === 'contained' && {
            padding: '8px 22px',
            fontSize: e.typography.pxToRem(15),
          }),
        ...(t.fullWidth && {
          width: '100%',
        }),
      };
    },
    ({ ownerState: e }) =>
      e.disableElevation && {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        [`&.${jo.focusVisible}`]: {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        [`&.${jo.disabled}`]: {
          boxShadow: 'none',
        },
      },
  ),
  kv = pe('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${oe(o.size)}`]];
    },
  })(({ ownerState: e }) => ({
    display: 'inherit',
    marginRight: 8,
    marginLeft: -4,
    ...(e.size === 'small' && {
      marginLeft: -2,
    }),
    ...dc(e),
  })),
  $v = pe('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${oe(o.size)}`]];
    },
  })(({ ownerState: e }) => ({
    display: 'inherit',
    marginRight: -4,
    marginLeft: 8,
    ...(e.size === 'small' && {
      marginRight: -2,
    }),
    ...dc(e),
  })),
  pc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = b.useContext(Sv),
      i = Ei(r, t),
      a = Ye({
        props: i,
        name: 'MuiButton',
      }),
      {
        children: s,
        color: l = 'primary',
        component: c = 'button',
        className: d,
        disabled: u = !1,
        disableElevation: p = !1,
        disableFocusRipple: h = !1,
        endIcon: y,
        focusVisibleClassName: g,
        fullWidth: m = !1,
        size: v = 'medium',
        startIcon: T,
        type: C,
        variant: O = 'text',
        ...E
      } = a,
      f = {
        ...a,
        color: l,
        component: c,
        disabled: u,
        disableElevation: p,
        disableFocusRipple: h,
        fullWidth: m,
        size: v,
        type: C,
        variant: O,
      },
      R = Rv(f),
      S =
        T &&
        /* @__PURE__ */ M(kv, {
          className: R.startIcon,
          ownerState: f,
          children: T,
        }),
      D =
        y &&
        /* @__PURE__ */ M($v, {
          className: R.endIcon,
          ownerState: f,
          children: y,
        });
    return /* @__PURE__ */ Ge(wv, {
      ownerState: f,
      className: Ee(r.className, R.root, d),
      component: c,
      disabled: u,
      focusRipple: !h,
      focusVisibleClassName: Ee(R.focusVisible, g),
      ref: o,
      type: C,
      ...E,
      classes: R,
      children: [S, s, D],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (pc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */
    color: n.oneOfType([
      n.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
      n.string,
    ]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: n.bool,
    /**
     * If `true`, no elevation is used.
     * @default false
     */
    disableElevation: n.bool,
    /**
     * If `true`, the  keyboard focus ripple is disabled.
     * @default false
     */
    disableFocusRipple: n.bool,
    /**
     * If `true`, the ripple effect is disabled.
     *
     * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
     * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
     * @default false
     */
    disableRipple: n.bool,
    /**
     * Element placed after the children.
     */
    endIcon: n.node,
    /**
     * @ignore
     */
    focusVisibleClassName: n.string,
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    fullWidth: n.bool,
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href: n.string,
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size: n.oneOfType([n.oneOf(['small', 'medium', 'large']), n.string]),
    /**
     * Element placed before the children.
     */
    startIcon: n.node,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * @ignore
     */
    type: n.oneOfType([n.oneOf(['button', 'reset', 'submit']), n.string]),
    /**
     * The variant to use.
     * @default 'text'
     */
    variant: n.oneOfType([n.oneOf(['contained', 'outlined', 'text']), n.string]),
  });
const Nv = pc;
function Pv(e) {
  return Pe('PrivateSwitchBase', e);
}
_e('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const Iv = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = {
        root: ['root', o && 'checked', r && 'disabled', i && `edge${oe(i)}`],
        input: ['input'],
      };
    return De(a, Pv, t);
  },
  _v = pe(Oo)(({ ownerState: e }) => ({
    padding: 9,
    borderRadius: '50%',
    ...(e.edge === 'start' && {
      marginLeft: e.size === 'small' ? -3 : -12,
    }),
    ...(e.edge === 'end' && {
      marginRight: e.size === 'small' ? -3 : -12,
    }),
  })),
  Mv = pe('input')({
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    zIndex: 1,
  }),
  fc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const {
        autoFocus: r,
        checked: i,
        checkedIcon: a,
        className: s,
        defaultChecked: l,
        disabled: c,
        disableFocusRipple: d = !1,
        edge: u = !1,
        icon: p,
        id: h,
        inputProps: y,
        inputRef: g,
        name: m,
        onBlur: v,
        onChange: T,
        onFocus: C,
        readOnly: O,
        required: E = !1,
        tabIndex: f,
        type: R,
        value: S,
        ...D
      } = t,
      [B, N] = xn({
        controlled: i,
        default: !!l,
        name: 'SwitchBase',
        state: 'checked',
      }),
      I = Rn(),
      J = (z) => {
        C && C(z), I && I.onFocus && I.onFocus(z);
      },
      j = (z) => {
        v && v(z), I && I.onBlur && I.onBlur(z);
      },
      _ = (z) => {
        if (z.nativeEvent.defaultPrevented) return;
        const w = z.target.checked;
        N(w), T && T(z, w);
      };
    let A = c;
    I && typeof A > 'u' && (A = I.disabled);
    const q = R === 'checkbox' || R === 'radio',
      ae = {
        ...t,
        checked: B,
        disabled: A,
        disableFocusRipple: d,
        edge: u,
      },
      Q = Iv(ae);
    return /* @__PURE__ */ Ge(_v, {
      component: 'span',
      className: Ee(Q.root, s),
      centerRipple: !0,
      focusRipple: !d,
      disabled: A,
      tabIndex: null,
      role: void 0,
      onFocus: J,
      onBlur: j,
      ownerState: ae,
      ref: o,
      ...D,
      children: [
        /* @__PURE__ */ M(Mv, {
          autoFocus: r,
          checked: i,
          defaultChecked: l,
          className: Q.input,
          disabled: A,
          id: q ? h : void 0,
          name: m,
          onChange: _,
          readOnly: O,
          ref: g,
          required: E,
          ownerState: ae,
          tabIndex: f,
          type: R,
          ...(R === 'checkbox' && S === void 0
            ? {}
            : {
                value: S,
              }),
          ...y,
        }),
        B ? a : p,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (fc.propTypes = {
    /**
     * If `true`, the `input` element is focused during the first mount.
     */
    autoFocus: n.bool,
    /**
     * If `true`, the component is checked.
     */
    checked: n.bool,
    /**
     * The icon to display when the component is checked.
     */
    checkedIcon: n.node.isRequired,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * @ignore
     */
    defaultChecked: n.bool,
    /**
     * If `true`, the component is disabled.
     */
    disabled: n.bool,
    /**
     * If `true`, the  keyboard focus ripple is disabled.
     * @default false
     */
    disableFocusRipple: n.bool,
    /**
     * If given, uses a negative margin to counteract the padding on one
     * side (this is often helpful for aligning the left or right
     * side of the icon with content above or below, without ruining the border
     * size and shape).
     * @default false
     */
    edge: n.oneOf(['end', 'start', !1]),
    /**
     * The icon to display when the component is unchecked.
     */
    icon: n.node.isRequired,
    /**
     * The id of the `input` element.
     */
    id: n.string,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: yt,
    /*
     * @ignore
     */
    name: n.string,
    /**
     * @ignore
     */
    onBlur: n.func,
    /**
     * Callback fired when the state is changed.
     *
     * @param {object} event The event source of the callback.
     * You can pull out the new checked state by accessing `event.target.checked` (boolean).
     */
    onChange: n.func,
    /**
     * @ignore
     */
    onFocus: n.func,
    /**
     * It prevents the user from changing the value of the field
     * (not from interacting with the field).
     */
    readOnly: n.bool,
    /**
     * If `true`, the `input` element is required.
     */
    required: n.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.object,
    /**
     * @ignore
     */
    tabIndex: n.oneOfType([n.number, n.string]),
    /**
     * The input component prop `type`.
     */
    type: n.string.isRequired,
    /**
     * The value of the component.
     */
    value: n.any,
  });
const mc = fc,
  Av = Gn(
    /* @__PURE__ */ M('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  Dv = Gn(
    /* @__PURE__ */ M('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Lv = Gn(
    /* @__PURE__ */ M('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function jv(e) {
  return Pe('MuiCheckbox', e);
}
const Fv = _e('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  Yr = Fv,
  zv = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = {
        root: ['root', o && 'indeterminate', `color${oe(r)}`],
      },
      a = De(i, jv, t);
    return {
      ...t,
      // forward the disabled and checked classes to the SwitchBase
      ...a,
    };
  },
  Vv = pe(mc, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiCheckbox',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.indeterminate && t.indeterminate,
        o.color !== 'default' && t[`color${oe(o.color)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => ({
    color: (e.vars || e).palette.text.secondary,
    ...(!t.disableRipple && {
      '&:hover': {
        backgroundColor: e.vars
          ? `rgba(${
              t.color === 'default'
                ? e.vars.palette.action.activeChannel
                : e.vars.palette.primary.mainChannel
            } / ${e.vars.palette.action.hoverOpacity})`
          : Je(
              t.color === 'default' ? e.palette.action.active : e.palette[t.color].main,
              e.palette.action.hoverOpacity,
            ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    }),
    ...(t.color !== 'default' && {
      [`&.${Yr.checked}, &.${Yr.indeterminate}`]: {
        color: (e.vars || e).palette[t.color].main,
      },
      [`&.${Yr.disabled}`]: {
        color: (e.vars || e).palette.action.disabled,
      },
    }),
  })),
  Bv = /* @__PURE__ */ M(Dv, {}),
  Uv = /* @__PURE__ */ M(Av, {}),
  Wv = /* @__PURE__ */ M(Lv, {}),
  hc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i;
    const a = Ye({
        props: t,
        name: 'MuiCheckbox',
      }),
      {
        checkedIcon: s = Bv,
        color: l = 'primary',
        icon: c = Uv,
        indeterminate: d = !1,
        indeterminateIcon: u = Wv,
        inputProps: p,
        size: h = 'medium',
        className: y,
        ...g
      } = a,
      m = d ? u : c,
      v = d ? u : s,
      T = {
        ...a,
        color: l,
        indeterminate: d,
        size: h,
      },
      C = zv(T);
    return /* @__PURE__ */ M(Vv, {
      type: 'checkbox',
      inputProps: {
        'data-indeterminate': d,
        ...p,
      },
      icon: /* @__PURE__ */ b.cloneElement(m, {
        fontSize: (r = m.props.fontSize) != null ? r : h,
      }),
      checkedIcon: /* @__PURE__ */ b.cloneElement(v, {
        fontSize: (i = v.props.fontSize) != null ? i : h,
      }),
      ownerState: T,
      ref: o,
      className: Ee(C.root, y),
      ...g,
      classes: C,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (hc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * If `true`, the component is checked.
     */
    checked: n.bool,
    /**
     * The icon to display when the component is checked.
     * @default <CheckBoxIcon />
     */
    checkedIcon: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */
    color: n.oneOfType([
      n.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    /**
     * The default checked state. Use when the component is not controlled.
     */
    defaultChecked: n.bool,
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: n.bool,
    /**
     * If `true`, the ripple effect is disabled.
     * @default false
     */
    disableRipple: n.bool,
    /**
     * The icon to display when the component is unchecked.
     * @default <CheckBoxOutlineBlankIcon />
     */
    icon: n.node,
    /**
     * The id of the `input` element.
     */
    id: n.string,
    /**
     * If `true`, the component appears indeterminate.
     * This does not set the native input element to indeterminate due
     * to inconsistent behavior across browsers.
     * However, we set a `data-indeterminate` attribute on the `input`.
     * @default false
     */
    indeterminate: n.bool,
    /**
     * The icon to display when the component is indeterminate.
     * @default <IndeterminateCheckBoxIcon />
     */
    indeterminateIcon: n.node,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: yt,
    /**
     * Callback fired when the state is changed.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * You can pull out the new checked state by accessing `event.target.checked` (boolean).
     */
    onChange: n.func,
    /**
     * If `true`, the `input` element is required.
     * @default false
     */
    required: n.bool,
    /**
     * The size of the component.
     * `small` is equivalent to the dense checkbox styling.
     * @default 'medium'
     */
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The value of the component. The DOM API casts this to a string.
     * The browser uses "on" as the default value.
     */
    value: n.any,
  });
const Hv = hc,
  qv = pe('div', {
    name: 'MuiModal',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, !o.open && o.exited && t.hidden];
    },
  })(({ theme: e, ownerState: t }) => ({
    position: 'fixed',
    zIndex: (e.vars || e).zIndex.modal,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    ...(!t.open &&
      t.exited && {
        visibility: 'hidden',
      }),
  })),
  Yv = pe(Ov, {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (e, t) => t.backdrop,
  })({
    zIndex: -1,
  }),
  bc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const d = Ye({
        name: 'MuiModal',
        props: t,
      }),
      {
        BackdropComponent: u = Yv,
        BackdropProps: p,
        classes: h,
        className: y,
        closeAfterTransition: g = !1,
        children: m,
        container: v,
        component: T,
        components: C = {},
        componentsProps: O = {},
        disableAutoFocus: E = !1,
        disableEnforceFocus: f = !1,
        disableEscapeKeyDown: R = !1,
        disablePortal: S = !1,
        disableRestoreFocus: D = !1,
        disableScrollLock: B = !1,
        hideBackdrop: N = !1,
        keepMounted: I = !1,
        onBackdropClick: J,
        onClose: j,
        open: _,
        slotProps: A,
        slots: q,
        // eslint-disable-next-line react/prop-types
        theme: ae,
        ...Q
      } = d,
      [z, w] = b.useState(!0),
      L = {
        container: v,
        closeAfterTransition: g,
        disableAutoFocus: E,
        disableEnforceFocus: f,
        disableEscapeKeyDown: R,
        disablePortal: S,
        disableRestoreFocus: D,
        disableScrollLock: B,
        hideBackdrop: N,
        keepMounted: I,
        onBackdropClick: J,
        onClose: j,
        open: _,
      },
      G = {
        ...d,
        ...L,
        exited: z,
      },
      V = (r = (i = q == null ? void 0 : q.root) != null ? i : C.Root) != null ? r : qv,
      H = (a = (s = q == null ? void 0 : q.backdrop) != null ? s : C.Backdrop) != null ? a : u,
      K = (l = A == null ? void 0 : A.root) != null ? l : O.root,
      re = (c = A == null ? void 0 : A.backdrop) != null ? c : O.backdrop;
    return /* @__PURE__ */ M(jh, {
      slots: {
        root: V,
        backdrop: H,
      },
      slotProps: {
        root: () => ({
          ...ai(K, G),
          ...(!dn(V) && {
            as: T,
            theme: ae,
          }),
          className: Ee(
            y,
            K == null ? void 0 : K.className,
            h == null ? void 0 : h.root,
            !G.open && G.exited && (h == null ? void 0 : h.hidden),
          ),
        }),
        backdrop: () => ({
          ...p,
          ...ai(re, G),
          className: Ee(re == null ? void 0 : re.className, h == null ? void 0 : h.backdrop),
        }),
      },
      onTransitionEnter: () => w(!1),
      onTransitionExited: () => w(!0),
      ref: o,
      ...Q,
      ...L,
      children: m,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (bc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
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
    BackdropComponent: n.elementType,
    /**
     * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
     * @deprecated Use `slotProps.backdrop` instead.
     */
    BackdropProps: n.object,
    /**
     * A single child content element.
     */
    children: Hn.isRequired,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * When set to true the Modal waits until a nested Transition is completed before closing.
     * @default false
     */
    closeAfterTransition: n.bool,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components: n.shape({
      Backdrop: n.elementType,
      Root: n.elementType,
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
    componentsProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    /**
     * An HTML element or function that returns one.
     * The `container` will have the portal children appended to it.
     *
     * By default, it uses the body of the top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: n.oneOfType([Qt, n.func]),
    /**
     * If `true`, the modal will not automatically shift focus to itself when it opens, and
     * replace it to the last focused element when it closes.
     * This also works correctly with any modal children that have the `disableAutoFocus` prop.
     *
     * Generally this should never be set to `true` as it makes the modal less
     * accessible to assistive technologies, like screen readers.
     * @default false
     */
    disableAutoFocus: n.bool,
    /**
     * If `true`, the modal will not prevent focus from leaving the modal while open.
     *
     * Generally this should never be set to `true` as it makes the modal less
     * accessible to assistive technologies, like screen readers.
     * @default false
     */
    disableEnforceFocus: n.bool,
    /**
     * If `true`, hitting escape will not fire the `onClose` callback.
     * @default false
     */
    disableEscapeKeyDown: n.bool,
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
    /**
     * If `true`, the modal will not restore focus to previously focused element once
     * modal is hidden or unmounted.
     * @default false
     */
    disableRestoreFocus: n.bool,
    /**
     * Disable the scroll lock behavior.
     * @default false
     */
    disableScrollLock: n.bool,
    /**
     * If `true`, the backdrop is not rendered.
     * @default false
     */
    hideBackdrop: n.bool,
    /**
     * Always keep the children in the DOM.
     * This prop can be useful in SEO situation or
     * when you want to maximize the responsiveness of the Modal.
     * @default false
     */
    keepMounted: n.bool,
    /**
     * Callback fired when the backdrop is clicked.
     * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
     */
    onBackdropClick: n.func,
    /**
     * Callback fired when the component requests to be closed.
     * The `reason` parameter can optionally be used to control the response to `onClose`.
     *
     * @param {object} event The event source of the callback.
     * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
     */
    onClose: n.func,
    /**
     * If `true`, the component is shown.
     */
    open: n.bool.isRequired,
    /**
     * The props used for each slot inside the Modal.
     * @default {}
     */
    slotProps: n.shape({
      backdrop: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
    }),
    /**
     * The components used for each slot inside the Modal.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: n.shape({
      backdrop: n.elementType,
      root: n.elementType,
    }),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const Kv = bc,
  Gv = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = De(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        ev,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...i,
    };
  },
  Xv = pe(Ir, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Nr(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    var o;
    const r = e.palette.mode === 'light',
      i = r ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)',
      a = r ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
      s = r ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.13)',
      l = r ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
    return {
      position: 'relative',
      backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a,
      borderTopLeftRadius: (e.vars || e).shape.borderRadius,
      borderTopRightRadius: (e.vars || e).shape.borderRadius,
      transition: e.transitions.create('background-color', {
        duration: e.transitions.duration.shorter,
        easing: e.transitions.easing.easeOut,
      }),
      '&:hover': {
        backgroundColor: e.vars ? e.vars.palette.FilledInput.hoverBg : s,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a,
        },
      },
      [`&.${Rt.focused}`]: {
        backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a,
      },
      [`&.${Rt.disabled}`]: {
        backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : l,
      },
      ...(!t.disableUnderline && {
        '&:after': {
          borderBottom: `2px solid ${
            (o = (e.vars || e).palette[t.color || 'primary']) == null ? void 0 : o.main
          }`,
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '""',
          position: 'absolute',
          right: 0,
          transform: 'scaleX(0)',
          transition: e.transitions.create('transform', {
            duration: e.transitions.duration.shorter,
            easing: e.transitions.easing.easeOut,
          }),
          pointerEvents: 'none',
          // Transparent to the hover style.
        },
        [`&.${Rt.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: 'scaleX(1) translateX(0)',
        },
        [`&.${Rt.error}`]: {
          '&:before, &:after': {
            borderBottomColor: (e.vars || e).palette.error.main,
          },
        },
        '&:before': {
          borderBottom: `1px solid ${
            e.vars
              ? `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`
              : i
          }`,
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '"\\00a0"',
          position: 'absolute',
          right: 0,
          transition: e.transitions.create('border-bottom-color', {
            duration: e.transitions.duration.shorter,
          }),
          pointerEvents: 'none',
          // Transparent to the hover style.
        },
        [`&:hover:not(.${Rt.disabled}, .${Rt.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${Rt.disabled}:before`]: {
          borderBottomStyle: 'dotted',
        },
      }),
      ...(t.startAdornment && {
        paddingLeft: 12,
      }),
      ...(t.endAdornment && {
        paddingRight: 12,
      }),
      ...(t.multiline && {
        padding: '25px 12px 8px',
        ...(t.size === 'small' && {
          paddingTop: 21,
          paddingBottom: 4,
        }),
        ...(t.hiddenLabel && {
          paddingTop: 16,
          paddingBottom: 17,
        }),
      }),
    };
  }),
  Jv = pe(_r, {
    name: 'MuiFilledInput',
    slot: 'Input',
    overridesResolver: Pr,
  })(({ theme: e, ownerState: t }) => ({
    paddingTop: 25,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    ...(!e.vars && {
      '&:-webkit-autofill': {
        WebkitBoxShadow: e.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
        WebkitTextFillColor: e.palette.mode === 'light' ? null : '#fff',
        caretColor: e.palette.mode === 'light' ? null : '#fff',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      },
    }),
    ...(e.vars && {
      '&:-webkit-autofill': {
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      },
      [e.getColorSchemeSelector('dark')]: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #266798 inset',
          WebkitTextFillColor: '#fff',
          caretColor: '#fff',
        },
      },
    }),
    ...(t.size === 'small' && {
      paddingTop: 21,
      paddingBottom: 4,
    }),
    ...(t.hiddenLabel && {
      paddingTop: 16,
      paddingBottom: 17,
    }),
    ...(t.multiline && {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    }),
    ...(t.startAdornment && {
      paddingLeft: 0,
    }),
    ...(t.endAdornment && {
      paddingRight: 0,
    }),
    ...(t.hiddenLabel &&
      t.size === 'small' && {
        paddingTop: 8,
        paddingBottom: 9,
      }),
  })),
  Xi = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ye({
        props: t,
        name: 'MuiFilledInput',
      }),
      {
        disableUnderline: c,
        components: d = {},
        componentsProps: u,
        fullWidth: p = !1,
        hiddenLabel: h,
        // declare here to prevent spreading to DOM
        inputComponent: y = 'input',
        multiline: g = !1,
        slotProps: m,
        slots: v = {},
        type: T = 'text',
        ...C
      } = l,
      O = {
        ...l,
        fullWidth: p,
        inputComponent: y,
        multiline: g,
        type: T,
      },
      E = Gv(l),
      f = {
        root: {
          ownerState: O,
        },
        input: {
          ownerState: O,
        },
      },
      R = m ?? u ? _t(m ?? u, f) : f,
      S = (r = (i = v.root) != null ? i : d.Root) != null ? r : Xv,
      D = (a = (s = v.input) != null ? s : d.Input) != null ? a : Jv;
    return /* @__PURE__ */ M(Gi, {
      slots: {
        root: S,
        input: D,
      },
      componentsProps: R,
      fullWidth: p,
      inputComponent: y,
      multiline: g,
      ref: o,
      type: T,
      ...C,
      classes: E,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Xi.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * This prop helps users to fill forms faster, especially on mobile devices.
     * The name can be confusing, as it's more like an autofill.
     * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
     */
    autoComplete: n.string,
    /**
     * If `true`, the `input` element is focused during the first mount.
     */
    autoFocus: n.bool,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
     */
    color: n.oneOfType([n.oneOf(['primary', 'secondary']), n.string]),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components: n.shape({
      Input: n.elementType,
      Root: n.elementType,
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
    componentsProps: n.shape({
      input: n.object,
      root: n.object,
    }),
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: n.any,
    /**
     * If `true`, the component is disabled.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    disabled: n.bool,
    /**
     * If `true`, the input will not have an underline.
     */
    disableUnderline: n.bool,
    /**
     * End `InputAdornment` for this component.
     */
    endAdornment: n.node,
    /**
     * If `true`, the `input` will indicate an error.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    error: n.bool,
    /**
     * If `true`, the `input` will take up the full width of its container.
     * @default false
     */
    fullWidth: n.bool,
    /**
     * If `true`, the label is hidden.
     * This is used to increase density for a `FilledInput`.
     * Be sure to add `aria-label` to the `input` element.
     * @default false
     */
    hiddenLabel: n.bool,
    /**
     * The id of the `input` element.
     */
    id: n.string,
    /**
     * The component used for the `input` element.
     * Either a string to use a HTML element or a component.
     * @default 'input'
     */
    inputComponent: n.elementType,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * @default {}
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: yt,
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
     */
    margin: n.oneOf(['dense', 'none']),
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    maxRows: n.oneOfType([n.number, n.string]),
    /**
     * Minimum number of rows to display when multiline option is set to true.
     */
    minRows: n.oneOfType([n.number, n.string]),
    /**
     * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
     * @default false
     */
    multiline: n.bool,
    /**
     * Name attribute of the `input` element.
     */
    name: n.string,
    /**
     * Callback fired when the value is changed.
     *
     * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     */
    onChange: n.func,
    /**
     * The short hint displayed in the `input` before the user enters a value.
     */
    placeholder: n.string,
    /**
     * It prevents the user from changing the value of the field
     * (not from interacting with the field).
     */
    readOnly: n.bool,
    /**
     * If `true`, the `input` element is required.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    required: n.bool,
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows: n.oneOfType([n.number, n.string]),
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slotProps: n.shape({
      input: n.object,
      root: n.object,
    }),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `components` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slots: n.shape({
      input: n.elementType,
      root: n.elementType,
    }),
    /**
     * Start `InputAdornment` for this component.
     */
    startAdornment: n.node,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
     * @default 'text'
     */
    type: n.string,
    /**
     * The value of the `input` element, required for a controlled component.
     */
    value: n.any,
  });
Xi.muiName = 'Input';
const vc = Xi;
function Zv(e) {
  return Pe('MuiFormControl', e);
}
_e('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const Qv = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = {
        root: ['root', o !== 'none' && `margin${oe(o)}`, r && 'fullWidth'],
      };
    return De(i, Zv, t);
  },
  eg = pe('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) => ({
      ...t.root,
      ...t[`margin${oe(e.margin)}`],
      ...(e.fullWidth && t.fullWidth),
    }),
  })(({ ownerState: e }) => ({
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    // Reset fieldset default style.
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: 'top',
    // Fix alignment issue on Safari.
    ...(e.margin === 'normal' && {
      marginTop: 16,
      marginBottom: 8,
    }),
    ...(e.margin === 'dense' && {
      marginTop: 8,
      marginBottom: 4,
    }),
    ...(e.fullWidth && {
      width: '100%',
    }),
  })),
  gc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiFormControl',
      }),
      {
        children: i,
        className: a,
        color: s = 'primary',
        component: l = 'div',
        disabled: c = !1,
        error: d = !1,
        focused: u,
        fullWidth: p = !1,
        hiddenLabel: h = !1,
        margin: y = 'none',
        required: g = !1,
        size: m = 'medium',
        variant: v = 'outlined',
        ...T
      } = r,
      C = {
        ...r,
        color: s,
        component: l,
        disabled: c,
        error: d,
        fullWidth: p,
        hiddenLabel: h,
        margin: y,
        required: g,
        size: m,
        variant: v,
      },
      O = Qv(C),
      [E, f] = b.useState(() => {
        let j = !1;
        return (
          i &&
            b.Children.forEach(i, (_) => {
              if (!zr(_, ['Input', 'Select'])) return;
              const A = zr(_, ['Select']) ? _.props.input : _;
              A && Hb(A.props) && (j = !0);
            }),
          j
        );
      }),
      [R, S] = b.useState(() => {
        let j = !1;
        return (
          i &&
            b.Children.forEach(i, (_) => {
              zr(_, ['Input', 'Select']) &&
                (ir(_.props, !0) || ir(_.props.inputProps, !0)) &&
                (j = !0);
            }),
          j
        );
      }),
      [D, B] = b.useState(!1);
    c && D && B(!1);
    const N = u !== void 0 && !c ? u : D;
    let I;
    if (process.env.NODE_ENV !== 'production') {
      const j = b.useRef(!1);
      I = () => (
        j.current &&
          console.error(
            [
              'MUI: There are multiple `InputBase` components inside a FormControl.',
              'This creates visual inconsistencies, only use one `InputBase`.',
            ].join(`
`),
          ),
        (j.current = !0),
        () => {
          j.current = !1;
        }
      );
    }
    const J = b.useMemo(
      () => ({
        adornedStart: E,
        setAdornedStart: f,
        color: s,
        disabled: c,
        error: d,
        filled: R,
        focused: N,
        fullWidth: p,
        hiddenLabel: h,
        size: m,
        onBlur: () => {
          B(!1);
        },
        onEmpty: () => {
          S(!1);
        },
        onFilled: () => {
          S(!0);
        },
        onFocus: () => {
          B(!0);
        },
        registerEffect: I,
        required: g,
        variant: v,
      }),
      [E, s, c, d, R, N, p, h, I, g, m, v],
    );
    return /* @__PURE__ */ M(Ki.Provider, {
      value: J,
      children: /* @__PURE__ */ M(eg, {
        as: l,
        ownerState: C,
        className: Ee(O.root, a),
        ref: o,
        ...T,
        children: i,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (gc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */
    color: n.oneOfType([
      n.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * If `true`, the label, input and helper text should be displayed in a disabled state.
     * @default false
     */
    disabled: n.bool,
    /**
     * If `true`, the label is displayed in an error state.
     * @default false
     */
    error: n.bool,
    /**
     * If `true`, the component is displayed in focused state.
     */
    focused: n.bool,
    /**
     * If `true`, the component will take up the full width of its container.
     * @default false
     */
    fullWidth: n.bool,
    /**
     * If `true`, the label is hidden.
     * This is used to increase density for a `FilledInput`.
     * Be sure to add `aria-label` to the `input` element.
     * @default false
     */
    hiddenLabel: n.bool,
    /**
     * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
     * @default 'none'
     */
    margin: n.oneOf(['dense', 'none', 'normal']),
    /**
     * If `true`, the label will indicate that the `input` is required.
     * @default false
     */
    required: n.bool,
    /**
     * The size of the component.
     * @default 'medium'
     */
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant: n.oneOf(['filled', 'outlined', 'standard']),
  });
const tg = gc;
function ng(e) {
  return Pe('MuiFormHelperText', e);
}
const og = _e('MuiFormHelperText', [
    'root',
    'error',
    'disabled',
    'sizeSmall',
    'sizeMedium',
    'contained',
    'focused',
    'filled',
    'required',
  ]),
  $s = og;
var Ns;
const rg = (e) => {
    const {
        classes: t,
        contained: o,
        size: r,
        disabled: i,
        error: a,
        filled: s,
        focused: l,
        required: c,
      } = e,
      d = {
        root: [
          'root',
          i && 'disabled',
          a && 'error',
          r && `size${oe(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return De(d, ng, t);
  },
  ig = pe('p', {
    name: 'MuiFormHelperText',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.size && t[`size${oe(o.size)}`],
        o.contained && t.contained,
        o.filled && t.filled,
      ];
    },
  })(({ theme: e, ownerState: t }) => ({
    color: (e.vars || e).palette.text.secondary,
    ...e.typography.caption,
    textAlign: 'left',
    marginTop: 3,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    [`&.${$s.disabled}`]: {
      color: (e.vars || e).palette.text.disabled,
    },
    [`&.${$s.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
    ...(t.size === 'small' && {
      marginTop: 4,
    }),
    ...(t.contained && {
      marginLeft: 14,
      marginRight: 14,
    }),
  })),
  yc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiFormHelperText',
      }),
      {
        children: i,
        className: a,
        component: s = 'p',
        disabled: l,
        error: c,
        filled: d,
        focused: u,
        margin: p,
        required: h,
        variant: y,
        ...g
      } = r,
      m = Rn(),
      v = Xn({
        props: r,
        muiFormControl: m,
        states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
      }),
      T = {
        ...r,
        component: s,
        contained: v.variant === 'filled' || v.variant === 'outlined',
        variant: v.variant,
        size: v.size,
        disabled: v.disabled,
        error: v.error,
        filled: v.filled,
        focused: v.focused,
        required: v.required,
      },
      C = rg(T);
    return /* @__PURE__ */ M(ig, {
      as: s,
      ownerState: T,
      className: Ee(C.root, a),
      ref: o,
      ...g,
      children:
        i === ' '
          ? // notranslate needed while Google Translate will not fix zero-width space issue
            Ns ||
            (Ns = /* @__PURE__ */ M('span', {
              className: 'notranslate',
              children: '​',
            }))
          : i,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (yc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     *
     * If `' '` is provided, the component reserves one line height for displaying a future message.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * If `true`, the helper text should be displayed in a disabled state.
     */
    disabled: n.bool,
    /**
     * If `true`, helper text should be displayed in an error state.
     */
    error: n.bool,
    /**
     * If `true`, the helper text should use filled classes key.
     */
    filled: n.bool,
    /**
     * If `true`, the helper text should use focused classes key.
     */
    focused: n.bool,
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     */
    margin: n.oneOf(['dense']),
    /**
     * If `true`, the helper text should use required classes key.
     */
    required: n.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The variant to use.
     */
    variant: n.oneOfType([n.oneOf(['filled', 'outlined', 'standard']), n.string]),
  });
const ag = yc;
function sg(e) {
  return Pe('MuiFormLabel', e);
}
const lg = _e('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  mo = lg,
  cg = (e) => {
    const { classes: t, color: o, focused: r, disabled: i, error: a, filled: s, required: l } = e,
      c = {
        root: [
          'root',
          `color${oe(o)}`,
          i && 'disabled',
          a && 'error',
          s && 'filled',
          r && 'focused',
          l && 'required',
        ],
        asterisk: ['asterisk', a && 'error'],
      };
    return De(c, sg, t);
  },
  ug = pe('label', {
    name: 'MuiFormLabel',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) => ({
      ...t.root,
      ...(e.color === 'secondary' && t.colorSecondary),
      ...(e.filled && t.filled),
    }),
  })(({ theme: e, ownerState: t }) => ({
    color: (e.vars || e).palette.text.secondary,
    ...e.typography.body1,
    lineHeight: '1.4375em',
    padding: 0,
    position: 'relative',
    [`&.${mo.focused}`]: {
      color: (e.vars || e).palette[t.color].main,
    },
    [`&.${mo.disabled}`]: {
      color: (e.vars || e).palette.text.disabled,
    },
    [`&.${mo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  dg = pe('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({
    [`&.${mo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  Ec = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiFormLabel',
      }),
      {
        children: i,
        className: a,
        color: s,
        component: l = 'label',
        disabled: c,
        error: d,
        filled: u,
        focused: p,
        required: h,
        ...y
      } = r,
      g = Rn(),
      m = Xn({
        props: r,
        muiFormControl: g,
        states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
      }),
      v = {
        ...r,
        color: m.color || 'primary',
        component: l,
        disabled: m.disabled,
        error: m.error,
        filled: m.filled,
        focused: m.focused,
        required: m.required,
      },
      T = cg(v);
    return /* @__PURE__ */ Ge(ug, {
      as: l,
      ownerState: v,
      className: Ee(T.root, a),
      ref: o,
      ...y,
      children: [
        i,
        m.required &&
          /* @__PURE__ */ Ge(dg, {
            ownerState: v,
            'aria-hidden': !0,
            className: T.asterisk,
            children: [' ', '*'],
          }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ec.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     */
    color: n.oneOfType([
      n.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
      n.string,
    ]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * If `true`, the label should be displayed in a disabled state.
     */
    disabled: n.bool,
    /**
     * If `true`, the label is displayed in an error state.
     */
    error: n.bool,
    /**
     * If `true`, the label should use filled classes key.
     */
    filled: n.bool,
    /**
     * If `true`, the input of this label is focused (used by `FormGroup` components).
     */
    focused: n.bool,
    /**
     * If `true`, the label will indicate that the `input` is required.
     */
    required: n.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const xc = Ec;
function fi(e) {
  return `scale(${e}, ${e ** 2})`;
}
const pg = {
    entering: {
      opacity: 1,
      transform: fi(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
  },
  Kr =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  Ji = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const {
        addEndListener: r,
        appear: i = !0,
        children: a,
        easing: s,
        in: l,
        onEnter: c,
        onEntered: d,
        onEntering: u,
        onExit: p,
        onExited: h,
        onExiting: y,
        style: g,
        timeout: m = 'auto',
        // eslint-disable-next-line react/prop-types
        TransitionComponent: v = ql,
        ...T
      } = t,
      C = b.useRef(),
      O = b.useRef(),
      E = Kn(),
      f = b.useRef(null),
      R = it(f, a.ref, o),
      S = (A) => (q) => {
        if (A) {
          const ae = f.current;
          q === void 0 ? A(ae) : A(ae, q);
        }
      },
      D = S(u),
      B = S((A, q) => {
        Yl(A);
        const {
          duration: ae,
          delay: Q,
          easing: z,
        } = rr(
          {
            style: g,
            timeout: m,
            easing: s,
          },
          {
            mode: 'enter',
          },
        );
        let w;
        m === 'auto'
          ? ((w = E.transitions.getAutoHeightDuration(A.clientHeight)), (O.current = w))
          : (w = ae),
          (A.style.transition = [
            E.transitions.create('opacity', {
              duration: w,
              delay: Q,
            }),
            E.transitions.create('transform', {
              duration: Kr ? w : w * 0.666,
              delay: Q,
              easing: z,
            }),
          ].join(',')),
          c && c(A, q);
      }),
      N = S(d),
      I = S(y),
      J = S((A) => {
        const {
          duration: q,
          delay: ae,
          easing: Q,
        } = rr(
          {
            style: g,
            timeout: m,
            easing: s,
          },
          {
            mode: 'exit',
          },
        );
        let z;
        m === 'auto'
          ? ((z = E.transitions.getAutoHeightDuration(A.clientHeight)), (O.current = z))
          : (z = q),
          (A.style.transition = [
            E.transitions.create('opacity', {
              duration: z,
              delay: ae,
            }),
            E.transitions.create('transform', {
              duration: Kr ? z : z * 0.666,
              delay: Kr ? ae : ae || z * 0.333,
              easing: Q,
            }),
          ].join(',')),
          (A.style.opacity = 0),
          (A.style.transform = fi(0.75)),
          p && p(A);
      }),
      j = S(h),
      _ = (A) => {
        m === 'auto' && (C.current = setTimeout(A, O.current || 0)), r && r(f.current, A);
      };
    return (
      b.useEffect(
        () => () => {
          clearTimeout(C.current);
        },
        [],
      ),
      /* @__PURE__ */ M(v, {
        appear: i,
        in: l,
        nodeRef: f,
        onEnter: B,
        onEntered: N,
        onEntering: D,
        onExit: J,
        onExited: j,
        onExiting: I,
        addEndListener: _,
        timeout: m === 'auto' ? null : m,
        ...T,
        children: (A, q) =>
          /* @__PURE__ */ b.cloneElement(a, {
            style: {
              opacity: 0,
              transform: fi(0.75),
              visibility: A === 'exited' && !l ? 'hidden' : void 0,
              ...pg[A],
              ...g,
              ...a.props.style,
            },
            ref: R,
            ...q,
          }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ji.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * Add a custom transition end trigger. Called with the transitioning DOM
     * node and a done callback. Allows for more fine grained transition end
     * logic. Note: Timeouts are still used as a fallback if provided.
     */
    addEndListener: n.func,
    /**
     * Perform the enter transition when it first mounts if `in` is also `true`.
     * Set this to `false` to disable this behavior.
     * @default true
     */
    appear: n.bool,
    /**
     * A single child content element.
     */
    children: Hn.isRequired,
    /**
     * The transition timing function.
     * You may specify a single easing or a object containing enter and exit values.
     */
    easing: n.oneOfType([
      n.shape({
        enter: n.string,
        exit: n.string,
      }),
      n.string,
    ]),
    /**
     * If `true`, the component will transition in.
     */
    in: n.bool,
    /**
     * @ignore
     */
    onEnter: n.func,
    /**
     * @ignore
     */
    onEntered: n.func,
    /**
     * @ignore
     */
    onEntering: n.func,
    /**
     * @ignore
     */
    onExit: n.func,
    /**
     * @ignore
     */
    onExited: n.func,
    /**
     * @ignore
     */
    onExiting: n.func,
    /**
     * @ignore
     */
    style: n.object,
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     *
     * Set to 'auto' to automatically calculate transition time based on height.
     * @default 'auto'
     */
    timeout: n.oneOfType([
      n.oneOf(['auto']),
      n.number,
      n.shape({
        appear: n.number,
        enter: n.number,
        exit: n.number,
      }),
    ]),
  });
Ji.muiSupportAuto = !0;
const Oc = Ji,
  fg = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = De(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Xb,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...i,
    };
  },
  mg = pe(Ir, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Nr(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    let r = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
    return (
      e.vars &&
        (r = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`),
      {
        position: 'relative',
        ...(t.formControl && {
          'label + &': {
            marginTop: 16,
          },
        }),
        ...(!t.disableUnderline && {
          '&:after': {
            borderBottom: `2px solid ${(e.vars || e).palette[t.color].main}`,
            left: 0,
            bottom: 0,
            // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
            content: '""',
            position: 'absolute',
            right: 0,
            transform: 'scaleX(0)',
            transition: e.transitions.create('transform', {
              duration: e.transitions.duration.shorter,
              easing: e.transitions.easing.easeOut,
            }),
            pointerEvents: 'none',
            // Transparent to the hover style.
          },
          [`&.${un.focused}:after`]: {
            // translateX(0) is a workaround for Safari transform scale bug
            // See https://github.com/mui/material-ui/issues/31766
            transform: 'scaleX(1) translateX(0)',
          },
          [`&.${un.error}`]: {
            '&:before, &:after': {
              borderBottomColor: (e.vars || e).palette.error.main,
            },
          },
          '&:before': {
            borderBottom: `1px solid ${r}`,
            left: 0,
            bottom: 0,
            // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
            content: '"\\00a0"',
            position: 'absolute',
            right: 0,
            transition: e.transitions.create('border-bottom-color', {
              duration: e.transitions.duration.shorter,
            }),
            pointerEvents: 'none',
            // Transparent to the hover style.
          },
          [`&:hover:not(.${un.disabled}, .${un.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              borderBottom: `1px solid ${r}`,
            },
          },
          [`&.${un.disabled}:before`]: {
            borderBottomStyle: 'dotted',
          },
        }),
      }
    );
  }),
  hg = pe(_r, {
    name: 'MuiInput',
    slot: 'Input',
    overridesResolver: Pr,
  })({}),
  Zi = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ye({
        props: t,
        name: 'MuiInput',
      }),
      {
        disableUnderline: c,
        components: d = {},
        componentsProps: u,
        fullWidth: p = !1,
        inputComponent: h = 'input',
        multiline: y = !1,
        slotProps: g,
        slots: m = {},
        type: v = 'text',
        ...T
      } = l,
      C = fg(l),
      E = {
        root: {
          ownerState: {
            disableUnderline: c,
          },
        },
      },
      f = g ?? u ? _t(g ?? u, E) : E,
      R = (r = (i = m.root) != null ? i : d.Root) != null ? r : mg,
      S = (a = (s = m.input) != null ? s : d.Input) != null ? a : hg;
    return /* @__PURE__ */ M(Gi, {
      slots: {
        root: R,
        input: S,
      },
      slotProps: f,
      fullWidth: p,
      inputComponent: h,
      multiline: y,
      ref: o,
      type: v,
      ...T,
      classes: C,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Zi.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * This prop helps users to fill forms faster, especially on mobile devices.
     * The name can be confusing, as it's more like an autofill.
     * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
     */
    autoComplete: n.string,
    /**
     * If `true`, the `input` element is focused during the first mount.
     */
    autoFocus: n.bool,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
     */
    color: n.oneOfType([n.oneOf(['primary', 'secondary']), n.string]),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components: n.shape({
      Input: n.elementType,
      Root: n.elementType,
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
    componentsProps: n.shape({
      input: n.object,
      root: n.object,
    }),
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: n.any,
    /**
     * If `true`, the component is disabled.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    disabled: n.bool,
    /**
     * If `true`, the `input` will not have an underline.
     */
    disableUnderline: n.bool,
    /**
     * End `InputAdornment` for this component.
     */
    endAdornment: n.node,
    /**
     * If `true`, the `input` will indicate an error.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    error: n.bool,
    /**
     * If `true`, the `input` will take up the full width of its container.
     * @default false
     */
    fullWidth: n.bool,
    /**
     * The id of the `input` element.
     */
    id: n.string,
    /**
     * The component used for the `input` element.
     * Either a string to use a HTML element or a component.
     * @default 'input'
     */
    inputComponent: n.elementType,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * @default {}
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: yt,
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
     */
    margin: n.oneOf(['dense', 'none']),
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    maxRows: n.oneOfType([n.number, n.string]),
    /**
     * Minimum number of rows to display when multiline option is set to true.
     */
    minRows: n.oneOfType([n.number, n.string]),
    /**
     * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
     * @default false
     */
    multiline: n.bool,
    /**
     * Name attribute of the `input` element.
     */
    name: n.string,
    /**
     * Callback fired when the value is changed.
     *
     * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     */
    onChange: n.func,
    /**
     * The short hint displayed in the `input` before the user enters a value.
     */
    placeholder: n.string,
    /**
     * It prevents the user from changing the value of the field
     * (not from interacting with the field).
     */
    readOnly: n.bool,
    /**
     * If `true`, the `input` element is required.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    required: n.bool,
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows: n.oneOfType([n.number, n.string]),
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slotProps: n.shape({
      input: n.object,
      root: n.object,
    }),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `components` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slots: n.shape({
      input: n.elementType,
      root: n.elementType,
    }),
    /**
     * Start `InputAdornment` for this component.
     */
    startAdornment: n.node,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
     * @default 'text'
     */
    type: n.string,
    /**
     * The value of the `input` element, required for a controlled component.
     */
    value: n.any,
  });
Zi.muiName = 'Input';
const Tc = Zi;
function bg(e) {
  return Pe('MuiInputLabel', e);
}
_e('MuiInputLabel', [
  'root',
  'focused',
  'disabled',
  'error',
  'required',
  'asterisk',
  'formControl',
  'sizeSmall',
  'shrink',
  'animated',
  'standard',
  'filled',
  'outlined',
]);
const vg = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      d = De(
        {
          root: [
            'root',
            o && 'formControl',
            !a && 'animated',
            i && 'shrink',
            r === 'small' && 'sizeSmall',
            s,
          ],
          asterisk: [l && 'asterisk'],
        },
        bg,
        t,
      );
    return {
      ...t,
      // forward the focused, disabled, etc. classes to the FormLabel
      ...d,
    };
  },
  gg = pe(xc, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${mo.asterisk}`]: t.asterisk,
        },
        t.root,
        o.formControl && t.formControl,
        o.size === 'small' && t.sizeSmall,
        o.shrink && t.shrink,
        !o.disableAnimation && t.animated,
        t[o.variant],
      ];
    },
  })(({ theme: e, ownerState: t }) => ({
    display: 'block',
    transformOrigin: 'top left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    ...(t.formControl && {
      position: 'absolute',
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: 'translate(0, 20px) scale(1)',
    }),
    ...(t.size === 'small' && {
      // Compensation for the `Input.inputSizeSmall` style.
      transform: 'translate(0, 17px) scale(1)',
    }),
    ...(t.shrink && {
      transform: 'translate(0, -1.5px) scale(0.75)',
      transformOrigin: 'top left',
      maxWidth: '133%',
    }),
    ...(!t.disableAnimation && {
      transition: e.transitions.create(['color', 'transform', 'max-width'], {
        duration: e.transitions.duration.shorter,
        easing: e.transitions.easing.easeOut,
      }),
    }),
    ...(t.variant === 'filled' && {
      // Chrome's autofill feature gives the input field a yellow background.
      // Since the input field is behind the label in the HTML tree,
      // the input field is drawn last and hides the label with an opaque background color.
      // zIndex: 1 will raise the label above opaque background-colors of input.
      zIndex: 1,
      pointerEvents: 'none',
      transform: 'translate(12px, 16px) scale(1)',
      maxWidth: 'calc(100% - 24px)',
      ...(t.size === 'small' && {
        transform: 'translate(12px, 13px) scale(1)',
      }),
      ...(t.shrink && {
        userSelect: 'none',
        pointerEvents: 'auto',
        transform: 'translate(12px, 7px) scale(0.75)',
        maxWidth: 'calc(133% - 24px)',
        ...(t.size === 'small' && {
          transform: 'translate(12px, 4px) scale(0.75)',
        }),
      }),
    }),
    ...(t.variant === 'outlined' && {
      // see comment above on filled.zIndex
      zIndex: 1,
      pointerEvents: 'none',
      transform: 'translate(14px, 16px) scale(1)',
      maxWidth: 'calc(100% - 24px)',
      ...(t.size === 'small' && {
        transform: 'translate(14px, 9px) scale(1)',
      }),
      ...(t.shrink && {
        userSelect: 'none',
        pointerEvents: 'auto',
        // Theoretically, we should have (8+5)*2/0.75 = 34px
        // but it feels a better when it bleeds a bit on the left, so 32px.
        maxWidth: 'calc(133% - 32px)',
        transform: 'translate(14px, -9px) scale(0.75)',
      }),
    }),
  })),
  Cc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        name: 'MuiInputLabel',
        props: t,
      }),
      { disableAnimation: i = !1, margin: a, shrink: s, variant: l, className: c, ...d } = r,
      u = Rn();
    let p = s;
    typeof p > 'u' && u && (p = u.filled || u.focused || u.adornedStart);
    const h = Xn({
        props: r,
        muiFormControl: u,
        states: ['size', 'variant', 'required'],
      }),
      y = {
        ...r,
        disableAnimation: i,
        formControl: u,
        shrink: p,
        size: h.size,
        variant: h.variant,
        required: h.required,
      },
      g = vg(y);
    return /* @__PURE__ */ M(gg, {
      'data-shrink': p,
      ownerState: y,
      ref: o,
      className: Ee(g.root, c),
      ...d,
      classes: g,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Cc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     */
    color: n.oneOfType([
      n.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
      n.string,
    ]),
    /**
     * If `true`, the transition animation is disabled.
     * @default false
     */
    disableAnimation: n.bool,
    /**
     * If `true`, the component is disabled.
     */
    disabled: n.bool,
    /**
     * If `true`, the label is displayed in an error state.
     */
    error: n.bool,
    /**
     * If `true`, the `input` of this label is focused.
     */
    focused: n.bool,
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     */
    margin: n.oneOf(['dense']),
    /**
     * if `true`, the label will indicate that the `input` is required.
     */
    required: n.bool,
    /**
     * If `true`, the label is shrunk.
     */
    shrink: n.bool,
    /**
     * The size of the component.
     * @default 'normal'
     */
    size: n.oneOfType([n.oneOf(['normal', 'small']), n.string]),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The variant to use.
     */
    variant: n.oneOf(['filled', 'outlined', 'standard']),
  });
const yg = Cc,
  Sc = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (Sc.displayName = 'ListContext');
const Eg = Sc;
function xg(e) {
  return Pe('MuiList', e);
}
_e('MuiList', ['root', 'padding', 'dense', 'subheader']);
const Og = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return De(
      {
        root: ['root', !o && 'padding', r && 'dense', i && 'subheader'],
      },
      xg,
      t,
    );
  },
  Tg = pe('ul', {
    name: 'MuiList',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        !o.disablePadding && t.padding,
        o.dense && t.dense,
        o.subheader && t.subheader,
      ];
    },
  })(({ ownerState: e }) => ({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
    ...(!e.disablePadding && {
      paddingTop: 8,
      paddingBottom: 8,
    }),
    ...(e.subheader && {
      paddingTop: 0,
    }),
  })),
  Rc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiList',
      }),
      {
        children: i,
        className: a,
        component: s = 'ul',
        dense: l = !1,
        disablePadding: c = !1,
        subheader: d,
        ...u
      } = r,
      p = b.useMemo(
        () => ({
          dense: l,
        }),
        [l],
      ),
      h = {
        ...r,
        component: s,
        dense: l,
        disablePadding: c,
      },
      y = Og(h);
    return /* @__PURE__ */ M(Eg.Provider, {
      value: p,
      children: /* @__PURE__ */ Ge(Tg, {
        as: s,
        className: Ee(y.root, a),
        ref: o,
        ownerState: h,
        ...u,
        children: [d, i],
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Rc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input is used for
     * the list and list items.
     * The prop is available to descendant components as the `dense` context.
     * @default false
     */
    dense: n.bool,
    /**
     * If `true`, vertical padding is removed from the list.
     * @default false
     */
    disablePadding: n.bool,
    /**
     * The content of the subheader, normally `ListSubheader`.
     */
    subheader: n.node,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const Cg = Rc;
function Gr(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function Ps(e, t, o) {
  return e === t
    ? o
      ? e.firstChild
      : e.lastChild
    : t && t.previousElementSibling
    ? t.previousElementSibling
    : o
    ? null
    : e.lastChild;
}
function wc(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function io(e, t, o, r, i, a) {
  let s = !1,
    l = i(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !wc(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const kc = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const {
      // private
      // eslint-disable-next-line react/prop-types
      actions: r,
      autoFocus: i = !1,
      autoFocusItem: a = !1,
      children: s,
      className: l,
      disabledItemsFocusable: c = !1,
      disableListWrap: d = !1,
      onKeyDown: u,
      variant: p = 'selectedMenu',
      ...h
    } = t,
    y = b.useRef(null),
    g = b.useRef({
      keys: [],
      repeating: !0,
      previousKeyMatched: !0,
      lastTime: null,
    });
  an(() => {
    i && y.current.focus();
  }, [i]),
    b.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (O, E) => {
          const f = !y.current.style.width;
          if (O.clientHeight < y.current.clientHeight && f) {
            const R = `${nl(ot(O))}px`;
            (y.current.style[E.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = R),
              (y.current.style.width = `calc(100% + ${R})`);
          }
          return y.current;
        },
      }),
      [],
    );
  const m = (O) => {
      const E = y.current,
        f = O.key,
        R = ot(E).activeElement;
      if (f === 'ArrowDown') O.preventDefault(), io(E, R, d, c, Gr);
      else if (f === 'ArrowUp') O.preventDefault(), io(E, R, d, c, Ps);
      else if (f === 'Home') O.preventDefault(), io(E, null, d, c, Gr);
      else if (f === 'End') O.preventDefault(), io(E, null, d, c, Ps);
      else if (f.length === 1) {
        const S = g.current,
          D = f.toLowerCase(),
          B = performance.now();
        S.keys.length > 0 &&
          (B - S.lastTime > 500
            ? ((S.keys = []), (S.repeating = !0), (S.previousKeyMatched = !0))
            : S.repeating && D !== S.keys[0] && (S.repeating = !1)),
          (S.lastTime = B),
          S.keys.push(D);
        const N = R && !S.repeating && wc(R, S);
        S.previousKeyMatched && (N || io(E, R, !1, c, Gr, S))
          ? O.preventDefault()
          : (S.previousKeyMatched = !1);
      }
      u && u(O);
    },
    v = it(y, o);
  let T = -1;
  b.Children.forEach(s, (O, E) => {
    /* @__PURE__ */ b.isValidElement(O) &&
      (process.env.NODE_ENV !== 'production' &&
        bo.isFragment(O) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      O.props.disabled || (((p === 'selectedMenu' && O.props.selected) || T === -1) && (T = E)),
      T === E &&
        (O.props.disabled || O.props.muiSkipListHighlight || O.type.muiSkipListHighlight) &&
        ((T += 1), T >= s.length && (T = -1)));
  });
  const C = b.Children.map(s, (O, E) => {
    if (E === T) {
      const f = {};
      return (
        a && (f.autoFocus = !0),
        O.props.tabIndex === void 0 && p === 'selectedMenu' && (f.tabIndex = 0),
        /* @__PURE__ */ b.cloneElement(O, f)
      );
    }
    return O;
  });
  return /* @__PURE__ */ M(Cg, {
    role: 'menu',
    ref: v,
    className: l,
    onKeyDown: m,
    tabIndex: i ? 0 : -1,
    ...h,
    children: C,
  });
});
process.env.NODE_ENV !== 'production' &&
  (kc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * If `true`, will focus the `[role="menu"]` container and move into tab order.
     * @default false
     */
    autoFocus: n.bool,
    /**
     * If `true`, will focus the first menuitem if `variant="menu"` or selected item
     * if `variant="selectedMenu"`.
     * @default false
     */
    autoFocusItem: n.bool,
    /**
     * MenuList contents, normally `MenuItem`s.
     */
    children: n.node,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * If `true`, will allow focus on disabled items.
     * @default false
     */
    disabledItemsFocusable: n.bool,
    /**
     * If `true`, the menu items will not wrap focus.
     * @default false
     */
    disableListWrap: n.bool,
    /**
     * @ignore
     */
    onKeyDown: n.func,
    /**
     * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
     * and the vertical alignment relative to the anchor element.
     * @default 'selectedMenu'
     */
    variant: n.oneOf(['menu', 'selectedMenu']),
  });
const Sg = kc;
function Rg(e) {
  return Pe('MuiPopover', e);
}
_e('MuiPopover', ['root', 'paper']);
function Is(e, t) {
  let o = 0;
  return (
    typeof t == 'number'
      ? (o = t)
      : t === 'center'
      ? (o = e.height / 2)
      : t === 'bottom' && (o = e.height),
    o
  );
}
function _s(e, t) {
  let o = 0;
  return (
    typeof t == 'number'
      ? (o = t)
      : t === 'center'
      ? (o = e.width / 2)
      : t === 'right' && (o = e.width),
    o
  );
}
function Ms(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function Ho(e) {
  return typeof e == 'function' ? e() : e;
}
const wg = (e) => {
    const { classes: t } = e;
    return De(
      {
        root: ['root'],
        paper: ['paper'],
      },
      Rg,
      t,
    );
  },
  kg = pe(Kv, {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  $g = pe(ko, {
    name: 'MuiPopover',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })({
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  $c = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiPopover',
      }),
      {
        action: i,
        anchorEl: a,
        anchorOrigin: s = {
          vertical: 'top',
          horizontal: 'left',
        },
        anchorPosition: l,
        anchorReference: c = 'anchorEl',
        children: d,
        className: u,
        container: p,
        elevation: h = 8,
        marginThreshold: y = 16,
        open: g,
        PaperProps: m = {},
        transformOrigin: v = {
          vertical: 'top',
          horizontal: 'left',
        },
        TransitionComponent: T = Oc,
        transitionDuration: C = 'auto',
        TransitionProps: { onEntering: O, ...E } = {},
        ...f
      } = r,
      R = b.useRef(),
      S = it(R, m.ref),
      D = {
        ...r,
        anchorOrigin: s,
        anchorReference: c,
        elevation: h,
        marginThreshold: y,
        PaperProps: m,
        transformOrigin: v,
        TransitionComponent: T,
        transitionDuration: C,
        TransitionProps: E,
      },
      B = wg(D),
      N = b.useCallback(() => {
        if (c === 'anchorPosition')
          return (
            process.env.NODE_ENV !== 'production' &&
              (l ||
                console.error(
                  'MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.',
                )),
            l
          );
        const w = Ho(a),
          L = w && w.nodeType === 1 ? w : ot(R.current).body,
          G = L.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const V = L.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            V.top === 0 &&
            V.left === 0 &&
            V.right === 0 &&
            V.bottom === 0 &&
            console.warn(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join(`
`),
            );
        }
        return {
          top: G.top + Is(G, s.vertical),
          left: G.left + _s(G, s.horizontal),
        };
      }, [a, s.horizontal, s.vertical, l, c]),
      I = b.useCallback(
        (w) => ({
          vertical: Is(w, v.vertical),
          horizontal: _s(w, v.horizontal),
        }),
        [v.horizontal, v.vertical],
      ),
      J = b.useCallback(
        (w) => {
          const L = {
              width: w.offsetWidth,
              height: w.offsetHeight,
            },
            G = I(L);
          if (c === 'none')
            return {
              top: null,
              left: null,
              transformOrigin: Ms(G),
            };
          const V = N();
          let H = V.top - G.vertical,
            K = V.left - G.horizontal;
          const re = H + L.height,
            Z = K + L.width,
            ie = Tn(Ho(a)),
            ce = ie.innerHeight - y,
            ue = ie.innerWidth - y;
          if (H < y) {
            const me = H - y;
            (H -= me), (G.vertical += me);
          } else if (re > ce) {
            const me = re - ce;
            (H -= me), (G.vertical += me);
          }
          if (
            (process.env.NODE_ENV !== 'production' &&
              L.height > ce &&
              L.height &&
              ce &&
              console.error(
                [
                  'MUI: The popover component is too tall.',
                  `Some part of it can not be seen on the screen (${L.height - ce}px).`,
                  'Please consider adding a `max-height` to improve the user-experience.',
                ].join(`
`),
              ),
            K < y)
          ) {
            const me = K - y;
            (K -= me), (G.horizontal += me);
          } else if (Z > ue) {
            const me = Z - ue;
            (K -= me), (G.horizontal += me);
          }
          return {
            top: `${Math.round(H)}px`,
            left: `${Math.round(K)}px`,
            transformOrigin: Ms(G),
          };
        },
        [a, c, N, I, y],
      ),
      [j, _] = b.useState(g),
      A = b.useCallback(() => {
        const w = R.current;
        if (!w) return;
        const L = J(w);
        L.top !== null && (w.style.top = L.top),
          L.left !== null && (w.style.left = L.left),
          (w.style.transformOrigin = L.transformOrigin),
          _(!0);
      }, [J]),
      q = (w, L) => {
        O && O(w, L), A();
      },
      ae = () => {
        _(!1);
      };
    b.useEffect(() => {
      g && A();
    }),
      b.useImperativeHandle(
        i,
        () =>
          g
            ? {
                updatePosition: () => {
                  A();
                },
              }
            : null,
        [g, A],
      ),
      b.useEffect(() => {
        if (!g) return;
        const w = Qs(() => {
            A();
          }),
          L = Tn(a);
        return (
          L.addEventListener('resize', w),
          () => {
            w.clear(), L.removeEventListener('resize', w);
          }
        );
      }, [a, g, A]);
    let Q = C;
    C === 'auto' && !T.muiSupportAuto && (Q = void 0);
    const z = p || (a ? ot(Ho(a)).body : void 0);
    return /* @__PURE__ */ M(kg, {
      BackdropProps: {
        invisible: !0,
      },
      className: Ee(B.root, u),
      container: z,
      open: g,
      ref: o,
      ownerState: D,
      ...f,
      children: /* @__PURE__ */ M(T, {
        appear: !0,
        in: g,
        onEntering: q,
        onExited: ae,
        timeout: Q,
        ...E,
        children: /* @__PURE__ */ M($g, {
          elevation: h,
          ...m,
          ref: S,
          className: Ee(B.paper, m.className),
          ...(j
            ? void 0
            : {
                style: {
                  ...m.style,
                  opacity: 0,
                },
              }),
          ownerState: D,
          children: d,
        }),
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  ($c.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports updatePosition() action.
     */
    action: yt,
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the popover.
     */
    anchorEl: Bt(n.oneOfType([Qt, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = Ho(e.anchorEl);
        if (t && t.nodeType === 1) {
          const o = t.getBoundingClientRect();
          if (
            process.env.NODE_ENV !== 'test' &&
            o.top === 0 &&
            o.left === 0 &&
            o.right === 0 &&
            o.bottom === 0
          )
            return new Error(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join(`
`),
            );
        } else
          return new Error(
            [
              'MUI: The `anchorEl` prop provided to the component is invalid.',
              `It should be an Element instance but it's \`${t}\` instead.`,
            ].join(`
`),
          );
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
    anchorOrigin: n.shape({
      horizontal: n.oneOfType([n.oneOf(['center', 'left', 'right']), n.number]).isRequired,
      vertical: n.oneOfType([n.oneOf(['bottom', 'center', 'top']), n.number]).isRequired,
    }),
    /**
     * This is the position that may be used to set the position of the popover.
     * The coordinates are relative to the application's client area.
     */
    anchorPosition: n.shape({
      left: n.number.isRequired,
      top: n.number.isRequired,
    }),
    /**
     * This determines which anchor prop to refer to when setting
     * the position of the popover.
     * @default 'anchorEl'
     */
    anchorReference: n.oneOf(['anchorEl', 'anchorPosition', 'none']),
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * An HTML element, component instance, or function that returns either.
     * The `container` will passed to the Modal component.
     *
     * By default, it uses the body of the anchorEl's top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: n.oneOfType([Qt, n.func]),
    /**
     * The elevation of the popover.
     * @default 8
     */
    elevation: yi,
    /**
     * Specifies how close to the edge of the window the popover can appear.
     * @default 16
     */
    marginThreshold: n.number,
    /**
     * Callback fired when the component requests to be closed.
     * The `reason` parameter can optionally be used to control the response to `onClose`.
     */
    onClose: n.func,
    /**
     * If `true`, the component is shown.
     */
    open: n.bool.isRequired,
    /**
     * Props applied to the [`Paper`](/material-ui/api/paper/) element.
     * @default {}
     */
    PaperProps: n.shape({
      component: bi,
    }),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
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
    transformOrigin: n.shape({
      horizontal: n.oneOfType([n.oneOf(['center', 'left', 'right']), n.number]).isRequired,
      vertical: n.oneOfType([n.oneOf(['bottom', 'center', 'top']), n.number]).isRequired,
    }),
    /**
     * The component used for the transition.
     * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
     * @default Grow
     */
    TransitionComponent: n.elementType,
    /**
     * Set to 'auto' to automatically calculate transition time based on height.
     * @default 'auto'
     */
    transitionDuration: n.oneOfType([
      n.oneOf(['auto']),
      n.number,
      n.shape({
        appear: n.number,
        enter: n.number,
        exit: n.number,
      }),
    ]),
    /**
     * Props applied to the transition element.
     * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
     * @default {}
     */
    TransitionProps: n.object,
  });
const Ng = $c;
function Pg(e) {
  return Pe('MuiMenu', e);
}
_e('MuiMenu', ['root', 'paper', 'list']);
const Ig = {
    vertical: 'top',
    horizontal: 'right',
  },
  _g = {
    vertical: 'top',
    horizontal: 'left',
  },
  Mg = (e) => {
    const { classes: t } = e;
    return De(
      {
        root: ['root'],
        paper: ['paper'],
        list: ['list'],
      },
      Pg,
      t,
    );
  },
  Ag = pe(Ng, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Dg = pe(ko, {
    name: 'MuiMenu',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })({
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tappable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100% - 96px)',
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch',
  }),
  Lg = pe(Sg, {
    name: 'MuiMenu',
    slot: 'List',
    overridesResolver: (e, t) => t.list,
  })({
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  Nc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiMenu',
      }),
      {
        autoFocus: i = !0,
        children: a,
        disableAutoFocusItem: s = !1,
        MenuListProps: l = {},
        onClose: c,
        open: d,
        PaperProps: u = {},
        PopoverClasses: p,
        transitionDuration: h = 'auto',
        TransitionProps: { onEntering: y, ...g } = {},
        variant: m = 'selectedMenu',
        ...v
      } = r,
      T = Kn(),
      C = T.direction === 'rtl',
      O = {
        ...r,
        autoFocus: i,
        disableAutoFocusItem: s,
        MenuListProps: l,
        onEntering: y,
        PaperProps: u,
        transitionDuration: h,
        TransitionProps: g,
        variant: m,
      },
      E = Mg(O),
      f = i && !s && d,
      R = b.useRef(null),
      S = (N, I) => {
        R.current && R.current.adjustStyleForScrollbar(N, T), y && y(N, I);
      },
      D = (N) => {
        N.key === 'Tab' && (N.preventDefault(), c && c(N, 'tabKeyDown'));
      };
    let B = -1;
    return (
      b.Children.map(a, (N, I) => {
        /* @__PURE__ */ b.isValidElement(N) &&
          (process.env.NODE_ENV !== 'production' &&
            bo.isFragment(N) &&
            console.error(
              [
                "MUI: The Menu component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join(`
`),
            ),
          N.props.disabled ||
            (((m === 'selectedMenu' && N.props.selected) || B === -1) && (B = I)));
      }),
      /* @__PURE__ */ M(Ag, {
        onClose: c,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: C ? 'right' : 'left',
        },
        transformOrigin: C ? Ig : _g,
        PaperProps: {
          as: Dg,
          ...u,
          classes: {
            ...u.classes,
            root: E.paper,
          },
        },
        className: E.root,
        open: d,
        ref: o,
        transitionDuration: h,
        TransitionProps: {
          onEntering: S,
          ...g,
        },
        ownerState: O,
        ...v,
        classes: p,
        children: /* @__PURE__ */ M(Lg, {
          onKeyDown: D,
          actions: R,
          autoFocus: i && (B === -1 || s),
          autoFocusItem: f,
          variant: m,
          ...l,
          className: Ee(E.list, l.className),
          children: a,
        }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Nc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the menu.
     */
    anchorEl: n.oneOfType([Qt, n.func]),
    /**
     * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
     * children are not focusable. If you set this prop to `false` focus will be placed
     * on the parent modal container. This has severe accessibility implications
     * and should only be considered if you manage focus otherwise.
     * @default true
     */
    autoFocus: n.bool,
    /**
     * Menu contents, normally `MenuItem`s.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * When opening the menu will not focus the active item but the `[role="menu"]`
     * unless `autoFocus` is also set to `false`. Not using the default means not
     * following WAI-ARIA authoring practices. Please be considerate about possible
     * accessibility implications.
     * @default false
     */
    disableAutoFocusItem: n.bool,
    /**
     * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
     * @default {}
     */
    MenuListProps: n.object,
    /**
     * Callback fired when the component requests to be closed.
     *
     * @param {object} event The event source of the callback.
     * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
     */
    onClose: n.func,
    /**
     * If `true`, the component is shown.
     */
    open: n.bool.isRequired,
    /**
     * @ignore
     */
    PaperProps: n.object,
    /**
     * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
     */
    PopoverClasses: n.object,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The length of the transition in `ms`, or 'auto'
     * @default 'auto'
     */
    transitionDuration: n.oneOfType([
      n.oneOf(['auto']),
      n.number,
      n.shape({
        appear: n.number,
        enter: n.number,
        exit: n.number,
      }),
    ]),
    /**
     * Props applied to the transition element.
     * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
     * @default {}
     */
    TransitionProps: n.object,
    /**
     * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
     * @default 'selectedMenu'
     */
    variant: n.oneOf(['menu', 'selectedMenu']),
  });
const jg = Nc;
function Fg(e) {
  return Pe('MuiNativeSelect', e);
}
const zg = _e('MuiNativeSelect', [
    'root',
    'select',
    'multiple',
    'filled',
    'outlined',
    'standard',
    'disabled',
    'icon',
    'iconOpen',
    'iconFilled',
    'iconOutlined',
    'iconStandard',
    'nativeInput',
    'error',
  ]),
  Qi = zg,
  Vg = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a, error: s } = e,
      l = {
        select: ['select', o, r && 'disabled', i && 'multiple', s && 'error'],
        icon: ['icon', `icon${oe(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return De(l, Fg, t);
  },
  Pc = ({ ownerState: e, theme: t }) => ({
    MozAppearance: 'none',
    // Reset
    WebkitAppearance: 'none',
    // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    borderRadius: 0,
    // Reset
    cursor: 'pointer',
    '&:focus': {
      // Show that it's not an text input
      ...(t.vars
        ? {
            backgroundColor: `rgba(${t.vars.palette.common.onBackgroundChannel} / 0.05)`,
          }
        : {
            backgroundColor:
              t.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
          }),
      borderRadius: 0,
      // Reset Chrome style
    },
    // Remove IE11 arrow
    '&::-ms-expand': {
      display: 'none',
    },
    [`&.${Qi.disabled}`]: {
      cursor: 'default',
    },
    '&[multiple]': {
      height: 'auto',
    },
    '&:not([multiple]) option, &:not([multiple]) optgroup': {
      backgroundColor: (t.vars || t).palette.background.paper,
    },
    // Bump specificity to allow extending custom inputs
    '&&&': {
      paddingRight: 24,
      minWidth: 16,
      // So it doesn't collapse.
    },
    ...(e.variant === 'filled' && {
      '&&&': {
        paddingRight: 32,
      },
    }),
    ...(e.variant === 'outlined' && {
      borderRadius: (t.vars || t).shape.borderRadius,
      '&:focus': {
        borderRadius: (t.vars || t).shape.borderRadius,
        // Reset the reset for Chrome style
      },
      '&&&': {
        paddingRight: 32,
      },
    }),
  }),
  Bg = pe('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: tn,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.select,
        t[o.variant],
        o.error && t.error,
        {
          [`&.${Qi.multiple}`]: t.multiple,
        },
      ];
    },
  })(Pc),
  Ic = ({ ownerState: e, theme: t }) => ({
    // We use a position absolute over a flexbox in order to forward the pointer events
    // to the input and to support wrapping tags..
    position: 'absolute',
    right: 0,
    top: 'calc(50% - .5em)',
    // Center vertically, height is 1em
    pointerEvents: 'none',
    // Don't block pointer events on the select under the icon.
    color: (t.vars || t).palette.action.active,
    [`&.${Qi.disabled}`]: {
      color: (t.vars || t).palette.action.disabled,
    },
    ...(e.open && {
      transform: 'rotate(180deg)',
    }),
    ...(e.variant === 'filled' && {
      right: 7,
    }),
    ...(e.variant === 'outlined' && {
      right: 7,
    }),
  }),
  Ug = pe('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${oe(o.variant)}`], o.open && t.iconOpen];
    },
  })(Ic),
  _c = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const {
        className: r,
        disabled: i,
        error: a,
        IconComponent: s,
        inputRef: l,
        variant: c = 'standard',
        ...d
      } = t,
      u = {
        ...t,
        disabled: i,
        variant: c,
        error: a,
      },
      p = Vg(u);
    return /* @__PURE__ */ Ge(b.Fragment, {
      children: [
        /* @__PURE__ */ M(Bg, {
          ownerState: u,
          className: Ee(p.select, r),
          disabled: i,
          ref: l || o,
          ...d,
        }),
        t.multiple
          ? null
          : /* @__PURE__ */ M(Ug, {
              as: s,
              ownerState: u,
              className: p.icon,
            }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (_c.propTypes = {
    /**
     * The option elements to populate the select with.
     * Can be some `<option>` elements.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: n.object,
    /**
     * The CSS class name of the select element.
     */
    className: n.string,
    /**
     * If `true`, the select is disabled.
     */
    disabled: n.bool,
    /**
     * If `true`, the `select input` will indicate an error.
     */
    error: n.bool,
    /**
     * The icon that displays the arrow.
     */
    IconComponent: n.elementType.isRequired,
    /**
     * Use that prop to pass a ref to the native select element.
     * @deprecated
     */
    inputRef: yt,
    /**
     * @ignore
     */
    multiple: n.bool,
    /**
     * Name attribute of the `select` or hidden `input` element.
     */
    name: n.string,
    /**
     * Callback fired when a menu item is selected.
     *
     * @param {object} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     */
    onChange: n.func,
    /**
     * The input value.
     */
    value: n.any,
    /**
     * The variant to use.
     */
    variant: n.oneOf(['standard', 'outlined', 'filled']),
  });
const Wg = _c;
var As;
const Hg = pe('fieldset')({
    textAlign: 'left',
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: -5,
    left: 0,
    margin: 0,
    padding: '0 8px',
    pointerEvents: 'none',
    borderRadius: 'inherit',
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    minWidth: '0%',
  }),
  qg = pe('legend')(({ ownerState: e, theme: t }) => ({
    float: 'unset',
    // Fix conflict with bootstrap
    width: 'auto',
    // Fix conflict with bootstrap
    overflow: 'hidden',
    // Fix Horizontal scroll when label too long
    ...(!e.withLabel && {
      padding: 0,
      lineHeight: '11px',
      // sync with `height` in `legend` styles
      transition: t.transitions.create('width', {
        duration: 150,
        easing: t.transitions.easing.easeOut,
      }),
    }),
    ...(e.withLabel && {
      display: 'block',
      // Fix conflict with normalize.css and sanitize.css
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: '0.75em',
      visibility: 'hidden',
      maxWidth: 0.01,
      transition: t.transitions.create('max-width', {
        duration: 50,
        easing: t.transitions.easing.easeOut,
      }),
      whiteSpace: 'nowrap',
      '& > span': {
        paddingLeft: 5,
        paddingRight: 5,
        display: 'inline-block',
        opacity: 0,
        visibility: 'visible',
      },
      ...(e.notched && {
        maxWidth: '100%',
        transition: t.transitions.create('max-width', {
          duration: 100,
          easing: t.transitions.easing.easeOut,
          delay: 50,
        }),
      }),
    }),
  }));
function Mc(e) {
  const { children: t, classes: o, className: r, label: i, notched: a, ...s } = e,
    l = i != null && i !== '',
    c = {
      ...e,
      notched: a,
      withLabel: l,
    };
  return /* @__PURE__ */ M(Hg, {
    'aria-hidden': !0,
    className: r,
    ownerState: c,
    ...s,
    children: /* @__PURE__ */ M(qg, {
      ownerState: c,
      children: l
        ? /* @__PURE__ */ M('span', {
            children: i,
          })
        : // notranslate needed while Google Translate will not fix zero-width space issue
          As ||
          (As = /* @__PURE__ */ M('span', {
            className: 'notranslate',
            children: '​',
          })),
    }),
  });
}
process.env.NODE_ENV !== 'production' &&
  (Mc.propTypes = {
    /**
     * The content of the component.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The label.
     */
    label: n.node,
    /**
     * If `true`, the outline is notched to accommodate the label.
     */
    notched: n.bool.isRequired,
    /**
     * @ignore
     */
    style: n.object,
  });
const Yg = (e) => {
    const { classes: t } = e,
      r = De(
        {
          root: ['root'],
          notchedOutline: ['notchedOutline'],
          input: ['input'],
        },
        Zb,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...r,
    };
  },
  Kg = pe(Ir, {
    shouldForwardProp: (e) => tn(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: Nr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      position: 'relative',
      borderRadius: (e.vars || e).shape.borderRadius,
      [`&:hover .${Gt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette.text.primary,
      },
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        [`&:hover .${Gt.notchedOutline}`]: {
          borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
        },
      },
      [`&.${Gt.focused} .${Gt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette[t.color].main,
        borderWidth: 2,
      },
      [`&.${Gt.error} .${Gt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette.error.main,
      },
      [`&.${Gt.disabled} .${Gt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette.action.disabled,
      },
      ...(t.startAdornment && {
        paddingLeft: 14,
      }),
      ...(t.endAdornment && {
        paddingRight: 14,
      }),
      ...(t.multiline && {
        padding: '16.5px 14px',
        ...(t.size === 'small' && {
          padding: '8.5px 14px',
        }),
      }),
    };
  }),
  Gg = pe(Mc, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  Xg = pe(_r, {
    name: 'MuiOutlinedInput',
    slot: 'Input',
    overridesResolver: Pr,
  })(({ theme: e, ownerState: t }) => ({
    padding: '16.5px 14px',
    ...(!e.vars && {
      '&:-webkit-autofill': {
        WebkitBoxShadow: e.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
        WebkitTextFillColor: e.palette.mode === 'light' ? null : '#fff',
        caretColor: e.palette.mode === 'light' ? null : '#fff',
        borderRadius: 'inherit',
      },
    }),
    ...(e.vars && {
      '&:-webkit-autofill': {
        borderRadius: 'inherit',
      },
      [e.getColorSchemeSelector('dark')]: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #266798 inset',
          WebkitTextFillColor: '#fff',
          caretColor: '#fff',
        },
      },
    }),
    ...(t.size === 'small' && {
      padding: '8.5px 14px',
    }),
    ...(t.multiline && {
      padding: 0,
    }),
    ...(t.startAdornment && {
      paddingLeft: 0,
    }),
    ...(t.endAdornment && {
      paddingRight: 0,
    }),
  })),
  ea = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = Ye({
        props: t,
        name: 'MuiOutlinedInput',
      }),
      {
        components: d = {},
        fullWidth: u = !1,
        inputComponent: p = 'input',
        label: h,
        multiline: y = !1,
        notched: g,
        slots: m = {},
        type: v = 'text',
        ...T
      } = c,
      C = Yg(c),
      O = Rn(),
      E = Xn({
        props: c,
        muiFormControl: O,
        states: ['required'],
      }),
      f = {
        ...c,
        color: E.color || 'primary',
        disabled: E.disabled,
        error: E.error,
        focused: E.focused,
        formControl: O,
        fullWidth: u,
        hiddenLabel: E.hiddenLabel,
        multiline: y,
        size: E.size,
        type: v,
      },
      R = (r = (i = m.root) != null ? i : d.Root) != null ? r : Kg,
      S = (a = (s = m.input) != null ? s : d.Input) != null ? a : Xg;
    return /* @__PURE__ */ M(Gi, {
      slots: {
        root: R,
        input: S,
      },
      renderSuffix: (D) =>
        /* @__PURE__ */ M(Gg, {
          ownerState: f,
          className: C.notchedOutline,
          label:
            h != null && h !== '' && E.required
              ? l ||
                (l = /* @__PURE__ */ Ge(b.Fragment, {
                  children: [h, ' ', '*'],
                }))
              : h,
          notched: typeof g < 'u' ? g : !!(D.startAdornment || D.filled || D.focused),
        }),
      fullWidth: u,
      inputComponent: p,
      multiline: y,
      ref: o,
      type: v,
      ...T,
      classes: {
        ...C,
        notchedOutline: null,
      },
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ea.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * This prop helps users to fill forms faster, especially on mobile devices.
     * The name can be confusing, as it's more like an autofill.
     * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
     */
    autoComplete: n.string,
    /**
     * If `true`, the `input` element is focused during the first mount.
     */
    autoFocus: n.bool,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
     */
    color: n.oneOfType([n.oneOf(['primary', 'secondary']), n.string]),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components: n.shape({
      Input: n.elementType,
      Root: n.elementType,
    }),
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: n.any,
    /**
     * If `true`, the component is disabled.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    disabled: n.bool,
    /**
     * End `InputAdornment` for this component.
     */
    endAdornment: n.node,
    /**
     * If `true`, the `input` will indicate an error.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    error: n.bool,
    /**
     * If `true`, the `input` will take up the full width of its container.
     * @default false
     */
    fullWidth: n.bool,
    /**
     * The id of the `input` element.
     */
    id: n.string,
    /**
     * The component used for the `input` element.
     * Either a string to use a HTML element or a component.
     * @default 'input'
     */
    inputComponent: n.elementType,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * @default {}
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: yt,
    /**
     * The label of the `input`. It is only used for layout. The actual labelling
     * is handled by `InputLabel`.
     */
    label: n.node,
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
     */
    margin: n.oneOf(['dense', 'none']),
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    maxRows: n.oneOfType([n.number, n.string]),
    /**
     * Minimum number of rows to display when multiline option is set to true.
     */
    minRows: n.oneOfType([n.number, n.string]),
    /**
     * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
     * @default false
     */
    multiline: n.bool,
    /**
     * Name attribute of the `input` element.
     */
    name: n.string,
    /**
     * If `true`, the outline is notched to accommodate the label.
     */
    notched: n.bool,
    /**
     * Callback fired when the value is changed.
     *
     * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     */
    onChange: n.func,
    /**
     * The short hint displayed in the `input` before the user enters a value.
     */
    placeholder: n.string,
    /**
     * It prevents the user from changing the value of the field
     * (not from interacting with the field).
     */
    readOnly: n.bool,
    /**
     * If `true`, the `input` element is required.
     * The prop defaults to the value (`false`) inherited from the parent FormControl component.
     */
    required: n.bool,
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows: n.oneOfType([n.number, n.string]),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `components` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slots: n.shape({
      input: n.elementType,
      root: n.elementType,
    }),
    /**
     * Start `InputAdornment` for this component.
     */
    startAdornment: n.node,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
     * @default 'text'
     */
    type: n.string,
    /**
     * The value of the `input` element, required for a controlled component.
     */
    value: n.any,
  });
ea.muiName = 'Input';
const Ac = ea;
function Jg(e) {
  return Pe('MuiSelect', e);
}
const Zg = _e('MuiSelect', [
    'select',
    'multiple',
    'filled',
    'outlined',
    'standard',
    'disabled',
    'focused',
    'icon',
    'iconOpen',
    'iconFilled',
    'iconOutlined',
    'iconStandard',
    'nativeInput',
    'error',
  ]),
  ao = Zg;
var Ds;
const Qg = pe('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        // Win specificity over the input base
        {
          [`&.${ao.select}`]: t.select,
        },
        {
          [`&.${ao.select}`]: t[o.variant],
        },
        {
          [`&.${ao.error}`]: t.error,
        },
        {
          [`&.${ao.multiple}`]: t.multiple,
        },
      ];
    },
  })(Pc, {
    // Win specificity over the input base
    [`&.${ao.select}`]: {
      height: 'auto',
      // Resets for multiple select with chips
      minHeight: '1.4375em',
      // Required for select\text-field height consistency
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  ey = pe('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${oe(o.variant)}`], o.open && t.iconOpen];
    },
  })(Ic),
  ty = pe('input', {
    shouldForwardProp: (e) => Li(e) && e !== 'classes',
    name: 'MuiSelect',
    slot: 'NativeInput',
    overridesResolver: (e, t) => t.nativeInput,
  })({
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
    width: '100%',
    boxSizing: 'border-box',
  });
function Ls(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function ny(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const oy = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a, error: s } = e,
      l = {
        select: ['select', o, r && 'disabled', i && 'multiple', s && 'error'],
        icon: ['icon', `icon${oe(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return De(l, Jg, t);
  },
  Dc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const {
        'aria-describedby': r,
        'aria-label': i,
        autoFocus: a,
        autoWidth: s,
        children: l,
        className: c,
        defaultOpen: d,
        defaultValue: u,
        disabled: p,
        displayEmpty: h,
        error: y = !1,
        IconComponent: g,
        inputRef: m,
        labelId: v,
        MenuProps: T = {},
        multiple: C,
        name: O,
        onBlur: E,
        onChange: f,
        onClose: R,
        onFocus: S,
        onOpen: D,
        open: B,
        readOnly: N,
        renderValue: I,
        SelectDisplayProps: J = {},
        tabIndex: j,
        // catching `type` from Input which makes no sense for SelectInput
        type: _,
        value: A,
        variant: q = 'standard',
        ...ae
      } = t,
      [Q, z] = xn({
        controlled: A,
        default: u,
        name: 'Select',
      }),
      [w, L] = xn({
        controlled: B,
        default: d,
        name: 'Select',
      }),
      G = b.useRef(null),
      V = b.useRef(null),
      [H, K] = b.useState(null),
      { current: re } = b.useRef(B != null),
      [Z, ie] = b.useState(),
      ce = it(o, m),
      ue = b.useCallback((U) => {
        (V.current = U), U && K(U);
      }, []),
      me = H == null ? void 0 : H.parentNode;
    b.useImperativeHandle(
      ce,
      () => ({
        focus: () => {
          V.current.focus();
        },
        node: G.current,
        value: Q,
      }),
      [Q],
    ),
      b.useEffect(() => {
        d && w && H && !re && (ie(s ? null : me.clientWidth), V.current.focus());
      }, [H, s]),
      b.useEffect(() => {
        a && V.current.focus();
      }, [a]),
      b.useEffect(() => {
        if (!v) return;
        const U = ot(V.current).getElementById(v);
        if (U) {
          const ge = () => {
            getSelection().isCollapsed && V.current.focus();
          };
          return (
            U.addEventListener('click', ge),
            () => {
              U.removeEventListener('click', ge);
            }
          );
        }
      }, [v]);
    const P = (U, ge) => {
        U ? D && D(ge) : R && R(ge), re || (ie(s ? null : me.clientWidth), L(U));
      },
      Te = (U) => {
        U.button === 0 && (U.preventDefault(), V.current.focus(), P(!0, U));
      },
      X = (U) => {
        P(!1, U);
      },
      W = b.Children.toArray(l),
      Ce = (U) => {
        const ge = W.find((Se) => Se.props.value === U.target.value);
        ge !== void 0 && (z(ge.props.value), f && f(U, ge));
      },
      de = (U) => (ge) => {
        let Se;
        if (ge.currentTarget.hasAttribute('tabindex')) {
          if (C) {
            Se = Array.isArray(Q) ? Q.slice() : [];
            const ft = Q.indexOf(U.props.value);
            ft === -1 ? Se.push(U.props.value) : Se.splice(ft, 1);
          } else Se = U.props.value;
          if ((U.props.onClick && U.props.onClick(ge), Q !== Se && (z(Se), f))) {
            const ft = ge.nativeEvent || ge,
              ht = new ft.constructor(ft.type, ft);
            Object.defineProperty(ht, 'target', {
              writable: !0,
              value: {
                value: Se,
                name: O,
              },
            }),
              f(ht, U);
          }
          C || P(!1, ge);
        }
      },
      ke = (U) => {
        N ||
          ([
            ' ',
            'ArrowUp',
            'ArrowDown',
            // The native select doesn't respond to enter on macOS, but it's recommended by
            // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
            'Enter',
          ].indexOf(U.key) !== -1 &&
            (U.preventDefault(), P(!0, U)));
      },
      Le = H !== null && w,
      Xe = (U) => {
        !Le &&
          E &&
          (Object.defineProperty(U, 'target', {
            writable: !0,
            value: {
              value: Q,
              name: O,
            },
          }),
          E(U));
      };
    delete ae['aria-invalid'];
    let Ke, je;
    const Ze = [];
    let ee = !1,
      te = !1;
    (ir({
      value: Q,
    }) ||
      h) &&
      (I ? (Ke = I(Q)) : (ee = !0));
    const ye = W.map((U) => {
      if (!(/* @__PURE__ */ b.isValidElement(U))) return null;
      process.env.NODE_ENV !== 'production' &&
        bo.isFragment(U) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let ge;
      if (C) {
        if (!Array.isArray(Q))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : pn(2),
          );
        (ge = Q.some((Se) => Ls(Se, U.props.value))), ge && ee && Ze.push(U.props.children);
      } else (ge = Ls(Q, U.props.value)), ge && ee && (je = U.props.children);
      return (
        ge && (te = !0),
        /* @__PURE__ */ b.cloneElement(U, {
          'aria-selected': ge ? 'true' : 'false',
          onClick: de(U),
          onKeyUp: (Se) => {
            Se.key === ' ' && Se.preventDefault(), U.props.onKeyUp && U.props.onKeyUp(Se);
          },
          role: 'option',
          selected: ge,
          value: void 0,
          // The value is most likely not a valid HTML attribute.
          'data-value': U.props.value,
          // Instead, we provide it as a data attribute.
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      b.useEffect(() => {
        if (!te && !C && Q !== '') {
          const U = W.map((ge) => ge.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${Q}\` for the select ${
                O ? `(name="${O}") ` : ''
              }component.`,
              "Consider providing a value that matches one of the available options or ''.",
              `The available values are ${
                U.filter((ge) => ge != null)
                  .map((ge) => `\`${ge}\``)
                  .join(', ') || '""'
              }.`,
            ].join(`
`),
          );
        }
      }, [te, W, C, O, Q]),
      ee &&
        (C
          ? Ze.length === 0
            ? (Ke = null)
            : (Ke = Ze.reduce(
                (U, ge, Se) => (U.push(ge), Se < Ze.length - 1 && U.push(', '), U),
                [],
              ))
          : (Ke = je));
    let he = Z;
    !s && re && H && (he = me.clientWidth);
    let xe;
    typeof j < 'u' ? (xe = j) : (xe = p ? null : 0);
    const Ne = J.id || (O ? `mui-component-select-${O}` : void 0),
      se = {
        ...t,
        variant: q,
        value: Q,
        open: Le,
        error: y,
      },
      we = oy(se);
    return /* @__PURE__ */ Ge(b.Fragment, {
      children: [
        /* @__PURE__ */ M(Qg, {
          ref: ue,
          tabIndex: xe,
          role: 'button',
          'aria-disabled': p ? 'true' : void 0,
          'aria-expanded': Le ? 'true' : 'false',
          'aria-haspopup': 'listbox',
          'aria-label': i,
          'aria-labelledby': [v, Ne].filter(Boolean).join(' ') || void 0,
          'aria-describedby': r,
          onKeyDown: ke,
          onMouseDown: p || N ? null : Te,
          onBlur: Xe,
          onFocus: S,
          ...J,
          ownerState: se,
          className: Ee(J.className, we.select, c),
          id: Ne,
          children: ny(Ke)
            ? // notranslate needed while Google Translate will not fix zero-width space issue
              Ds ||
              (Ds = /* @__PURE__ */ M('span', {
                className: 'notranslate',
                children: '​',
              }))
            : Ke,
        }),
        /* @__PURE__ */ M(ty, {
          'aria-invalid': y,
          value: Array.isArray(Q) ? Q.join(',') : Q,
          name: O,
          ref: G,
          'aria-hidden': !0,
          onChange: Ce,
          tabIndex: -1,
          disabled: p,
          className: we.nativeInput,
          autoFocus: a,
          ownerState: se,
          ...ae,
        }),
        /* @__PURE__ */ M(ey, {
          as: g,
          className: we.icon,
          ownerState: se,
        }),
        /* @__PURE__ */ M(jg, {
          id: `menu-${O || ''}`,
          anchorEl: me,
          open: Le,
          onClose: X,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          ...T,
          MenuListProps: {
            'aria-labelledby': v,
            role: 'listbox',
            disableListWrap: !0,
            ...T.MenuListProps,
          },
          PaperProps: {
            ...T.PaperProps,
            style: {
              minWidth: he,
              ...(T.PaperProps != null ? T.PaperProps.style : null),
            },
          },
          children: ye,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Dc.propTypes = {
    /**
     * @ignore
     */
    'aria-describedby': n.string,
    /**
     * @ignore
     */
    'aria-label': n.string,
    /**
     * @ignore
     */
    autoFocus: n.bool,
    /**
     * If `true`, the width of the popover will automatically be set according to the items inside the
     * menu, otherwise it will be at least the width of the select input.
     */
    autoWidth: n.bool,
    /**
     * The option elements to populate the select with.
     * Can be some `<MenuItem>` elements.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: n.object,
    /**
     * The CSS class name of the select element.
     */
    className: n.string,
    /**
     * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
     * You can only use it when the `native` prop is `false` (default).
     */
    defaultOpen: n.bool,
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: n.any,
    /**
     * If `true`, the select is disabled.
     */
    disabled: n.bool,
    /**
     * If `true`, the selected item is displayed even if its value is empty.
     */
    displayEmpty: n.bool,
    /**
     * If `true`, the `select input` will indicate an error.
     */
    error: n.bool,
    /**
     * The icon that displays the arrow.
     */
    IconComponent: n.elementType.isRequired,
    /**
     * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
     * Equivalent to `ref`
     */
    inputRef: yt,
    /**
     * The ID of an element that acts as an additional label. The Select will
     * be labelled by the additional label and the selected value.
     */
    labelId: n.string,
    /**
     * Props applied to the [`Menu`](/material-ui/api/menu/) element.
     */
    MenuProps: n.object,
    /**
     * If `true`, `value` must be an array and the menu will support multiple selections.
     */
    multiple: n.bool,
    /**
     * Name attribute of the `select` or hidden `input` element.
     */
    name: n.string,
    /**
     * @ignore
     */
    onBlur: n.func,
    /**
     * Callback fired when a menu item is selected.
     *
     * @param {object} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (any).
     * @param {object} [child] The react element that was selected.
     */
    onChange: n.func,
    /**
     * Callback fired when the component requests to be closed.
     * Use in controlled mode (see open).
     *
     * @param {object} event The event source of the callback.
     */
    onClose: n.func,
    /**
     * @ignore
     */
    onFocus: n.func,
    /**
     * Callback fired when the component requests to be opened.
     * Use in controlled mode (see open).
     *
     * @param {object} event The event source of the callback.
     */
    onOpen: n.func,
    /**
     * If `true`, the component is shown.
     */
    open: n.bool,
    /**
     * @ignore
     */
    readOnly: n.bool,
    /**
     * Render the selected value.
     *
     * @param {any} value The `value` provided to the component.
     * @returns {ReactNode}
     */
    renderValue: n.func,
    /**
     * Props applied to the clickable div element.
     */
    SelectDisplayProps: n.object,
    /**
     * @ignore
     */
    tabIndex: n.oneOfType([n.number, n.string]),
    /**
     * @ignore
     */
    type: n.any,
    /**
     * The input value.
     */
    value: n.any,
    /**
     * The variant to use.
     */
    variant: n.oneOf(['standard', 'outlined', 'filled']),
  });
const ry = Dc,
  iy = (e) => {
    const { classes: t } = e;
    return t;
  },
  ta = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => tn(e) && e !== 'variant',
    slot: 'Root',
  },
  ay = pe(Tc, ta)(''),
  sy = pe(Ac, ta)(''),
  ly = pe(vc, ta)(''),
  na = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        name: 'MuiSelect',
        props: t,
      }),
      {
        autoWidth: i = !1,
        children: a,
        classes: s = {},
        className: l,
        defaultOpen: c = !1,
        displayEmpty: d = !1,
        IconComponent: u = ac,
        id: p,
        input: h,
        inputProps: y,
        label: g,
        labelId: m,
        MenuProps: v,
        multiple: T = !1,
        native: C = !1,
        onClose: O,
        onOpen: E,
        open: f,
        renderValue: R,
        SelectDisplayProps: S,
        variant: D = 'outlined',
        ...B
      } = r,
      N = C ? Wg : ry,
      I = Rn(),
      J = Xn({
        props: r,
        muiFormControl: I,
        states: ['variant', 'error'],
      }),
      j = J.variant || D,
      _ = {
        ...r,
        variant: j,
        classes: s,
      },
      A = iy(_),
      q =
        h ||
        {
          standard: /* @__PURE__ */ M(ay, {
            ownerState: _,
          }),
          outlined: /* @__PURE__ */ M(sy, {
            label: g,
            ownerState: _,
          }),
          filled: /* @__PURE__ */ M(ly, {
            ownerState: _,
          }),
        }[j],
      ae = it(o, q.ref);
    return /* @__PURE__ */ M(b.Fragment, {
      children: /* @__PURE__ */ b.cloneElement(q, {
        // Most of the logic is implemented in `SelectInput`.
        // The `Select` component is a simple API wrapper to expose something better to play with.
        inputComponent: N,
        inputProps: {
          children: a,
          error: J.error,
          IconComponent: u,
          variant: j,
          type: void 0,
          // We render a select. We can ignore the type provided by the `Input`.
          multiple: T,
          ...(C
            ? {
                id: p,
              }
            : {
                autoWidth: i,
                defaultOpen: c,
                displayEmpty: d,
                labelId: m,
                MenuProps: v,
                onClose: O,
                onOpen: E,
                open: f,
                renderValue: R,
                SelectDisplayProps: {
                  id: p,
                  ...S,
                },
              }),
          ...y,
          classes: y ? _t(A, y.classes) : A,
          ...(h ? h.props.inputProps : {}),
        },
        ...(T && C && j === 'outlined'
          ? {
              notched: !0,
            }
          : {}),
        ref: ae,
        className: Ee(q.props.className, l),
        // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
        ...(!h && {
          variant: j,
        }),
        ...B,
      }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (na.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * If `true`, the width of the popover will automatically be set according to the items inside the
     * menu, otherwise it will be at least the width of the select input.
     * @default false
     */
    autoWidth: n.bool,
    /**
     * The option elements to populate the select with.
     * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
     *
     * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     * @default {}
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
     * You can only use it when the `native` prop is `false` (default).
     * @default false
     */
    defaultOpen: n.bool,
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: n.any,
    /**
     * If `true`, a value is displayed even if no items are selected.
     *
     * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
     * returns the value to be displayed when no items are selected.
     *
     * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
     * The label should either be hidden or forced to a shrunk state.
     * @default false
     */
    displayEmpty: n.bool,
    /**
     * The icon that displays the arrow.
     * @default ArrowDropDownIcon
     */
    IconComponent: n.elementType,
    /**
     * The `id` of the wrapper element or the `select` element when `native`.
     */
    id: n.string,
    /**
     * An `Input` element; does not have to be a material-ui specific `Input`.
     */
    input: n.element,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * When `native` is `true`, the attributes are applied on the `select` element.
     */
    inputProps: n.object,
    /**
     * See [OutlinedInput#label](/material-ui/api/outlined-input/#props)
     */
    label: n.node,
    /**
     * The ID of an element that acts as an additional label. The Select will
     * be labelled by the additional label and the selected value.
     */
    labelId: n.string,
    /**
     * Props applied to the [`Menu`](/material-ui/api/menu/) element.
     */
    MenuProps: n.object,
    /**
     * If `true`, `value` must be an array and the menu will support multiple selections.
     * @default false
     */
    multiple: n.bool,
    /**
     * If `true`, the component uses a native `select` element.
     * @default false
     */
    native: n.bool,
    /**
     * Callback fired when a menu item is selected.
     *
     * @param {SelectChangeEvent<T>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (any).
     * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
     * @param {object} [child] The react element that was selected when `native` is `false` (default).
     */
    onChange: n.func,
    /**
     * Callback fired when the component requests to be closed.
     * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
     *
     * @param {object} event The event source of the callback.
     */
    onClose: n.func,
    /**
     * Callback fired when the component requests to be opened.
     * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
     *
     * @param {object} event The event source of the callback.
     */
    onOpen: n.func,
    /**
     * If `true`, the component is shown.
     * You can only use it when the `native` prop is `false` (default).
     */
    open: n.bool,
    /**
     * Render the selected value.
     * You can only use it when the `native` prop is `false` (default).
     *
     * @param {any} value The `value` provided to the component.
     * @returns {ReactNode}
     */
    renderValue: n.func,
    /**
     * Props applied to the clickable div element.
     */
    SelectDisplayProps: n.object,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The `input` value. Providing an empty string will select no options.
     * Set to an empty string `''` if you don't want any of the available options to be selected.
     *
     * If the value is an object it must have reference equality with the option in order to be selected.
     * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
     */
    value: n.oneOfType([n.oneOf(['']), n.any]),
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant: n.oneOf(['filled', 'outlined', 'standard']),
  });
na.muiName = 'Select';
const cy = na,
  uy = (e) => !e || !dn(e),
  dy = uy;
function py(e) {
  return Pe('MuiSlider', e);
}
const fy = _e('MuiSlider', [
    'root',
    'active',
    'colorPrimary',
    'colorSecondary',
    'disabled',
    'dragging',
    'focusVisible',
    'mark',
    'markActive',
    'marked',
    'markLabel',
    'markLabelActive',
    'rail',
    'sizeSmall',
    'thumb',
    'thumbColorPrimary',
    'thumbColorSecondary',
    'track',
    'trackInverted',
    'trackFalse',
    'thumbSizeSmall',
    'valueLabel',
    'valueLabelOpen',
    'valueLabelCircle',
    'valueLabelLabel',
    'vertical',
  ]),
  zt = fy,
  my = (e) => {
    const { open: t } = e;
    return {
      offset: Ee(t && zt.valueLabelOpen),
      circle: zt.valueLabelCircle,
      label: zt.valueLabelLabel,
    };
  };
function Lc(e) {
  const { children: t, className: o, value: r } = e,
    i = my(e);
  return t
    ? /* @__PURE__ */ b.cloneElement(
        t,
        {
          className: Ee(t.props.className),
        },
        /* @__PURE__ */ Ge(b.Fragment, {
          children: [
            t.props.children,
            /* @__PURE__ */ M('span', {
              className: Ee(i.offset, o),
              'aria-hidden': !0,
              children: /* @__PURE__ */ M('span', {
                className: i.circle,
                children: /* @__PURE__ */ M('span', {
                  className: i.label,
                  children: r,
                }),
              }),
            }),
          ],
        }),
      )
    : null;
}
process.env.NODE_ENV !== 'production' &&
  (Lc.propTypes = {
    children: n.element.isRequired,
    className: n.string,
    value: n.node,
  });
function js(e) {
  return e;
}
const jc = pe('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      t[`color${oe(o.color)}`],
      o.size !== 'medium' && t[`size${oe(o.size)}`],
      o.marked && t.marked,
      o.orientation === 'vertical' && t.vertical,
      o.track === 'inverted' && t.trackInverted,
      o.track === !1 && t.trackFalse,
    ];
  },
})(({ theme: e, ownerState: t }) => ({
  borderRadius: 12,
  boxSizing: 'content-box',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  color: (e.vars || e).palette[t.color].main,
  WebkitTapHighlightColor: 'transparent',
  ...(t.orientation === 'horizontal' && {
    height: 4,
    width: '100%',
    padding: '13px 0',
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '20px 0',
    },
    ...(t.size === 'small' && {
      height: 2,
    }),
    ...(t.marked && {
      marginBottom: 20,
    }),
  }),
  ...(t.orientation === 'vertical' && {
    height: '100%',
    width: 4,
    padding: '0 13px',
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '0 20px',
    },
    ...(t.size === 'small' && {
      width: 2,
    }),
    ...(t.marked && {
      marginRight: 44,
    }),
  }),
  '@media print': {
    colorAdjust: 'exact',
  },
  [`&.${zt.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: (e.vars || e).palette.grey[400],
  },
  [`&.${zt.dragging}`]: {
    [`& .${zt.thumb}, & .${zt.track}`]: {
      transition: 'none',
    },
  },
}));
process.env.NODE_ENV !== 'production' &&
  (jc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Fc = pe('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (e, t) => t.rail,
})(({ ownerState: e }) => ({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
  ...(e.orientation === 'horizontal' && {
    width: '100%',
    height: 'inherit',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  ...(e.orientation === 'vertical' && {
    height: '100%',
    width: 'inherit',
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  ...(e.track === 'inverted' && {
    opacity: 1,
  }),
}));
process.env.NODE_ENV !== 'production' &&
  (Fc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const zc = pe('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (e, t) => t.track,
})(({ theme: e, ownerState: t }) => {
  const o =
    // Same logic as the LinearProgress track color
    e.palette.mode === 'light'
      ? Cr(e.palette[t.color].main, 0.62)
      : Tr(e.palette[t.color].main, 0.5);
  return {
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    border: '1px solid currentColor',
    backgroundColor: 'currentColor',
    transition: e.transitions.create(['left', 'width', 'bottom', 'height'], {
      duration: e.transitions.duration.shortest,
    }),
    ...(t.size === 'small' && {
      border: 'none',
    }),
    ...(t.orientation === 'horizontal' && {
      height: 'inherit',
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    ...(t.orientation === 'vertical' && {
      width: 'inherit',
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(t.track === !1 && {
      display: 'none',
    }),
    ...(t.track === 'inverted' && {
      backgroundColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : o,
      borderColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : o,
    }),
  };
});
process.env.NODE_ENV !== 'production' &&
  (zc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Vc = pe('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.thumb,
      t[`thumbColor${oe(o.color)}`],
      o.size !== 'medium' && t[`thumbSize${oe(o.size)}`],
    ];
  },
})(({ theme: e, ownerState: t }) => ({
  position: 'absolute',
  width: 20,
  height: 20,
  boxSizing: 'border-box',
  borderRadius: '50%',
  outline: 0,
  backgroundColor: 'currentColor',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: e.transitions.create(['box-shadow', 'left', 'bottom'], {
    duration: e.transitions.duration.shortest,
  }),
  ...(t.size === 'small' && {
    width: 12,
    height: 12,
  }),
  ...(t.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  ...(t.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 50%)',
  }),
  '&:before': {
    position: 'absolute',
    content: '""',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    boxShadow: (e.vars || e).shadows[2],
    ...(t.size === 'small' && {
      boxShadow: 'none',
    }),
  },
  '&::after': {
    position: 'absolute',
    content: '""',
    borderRadius: '50%',
    // 42px is the hit target
    width: 42,
    height: 42,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  [`&:hover, &.${zt.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${
      e.vars
        ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
        : Je(e.palette[t.color].main, 0.16)
    }`,
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  },
  [`&.${zt.active}`]: {
    boxShadow: `0px 0px 0px 14px ${
      e.vars
        ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
        : Je(e.palette[t.color].main, 0.16)
    }`,
  },
  [`&.${zt.disabled}`]: {
    '&:hover': {
      boxShadow: 'none',
    },
  },
}));
process.env.NODE_ENV !== 'production' &&
  (Vc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Bc = pe(Lc, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) => ({
  [`&.${zt.valueLabelOpen}`]: {
    transform: `${
      t.orientation === 'vertical' ? 'translateY(-50%)' : 'translateY(-100%)'
    } scale(1)`,
  },
  zIndex: 1,
  whiteSpace: 'nowrap',
  ...e.typography.body2,
  fontWeight: 500,
  transition: e.transitions.create(['transform'], {
    duration: e.transitions.duration.shortest,
  }),
  transform: `${t.orientation === 'vertical' ? 'translateY(-50%)' : 'translateY(-100%)'} scale(0)`,
  position: 'absolute',
  backgroundColor: (e.vars || e).palette.grey[600],
  borderRadius: 2,
  color: (e.vars || e).palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.75rem',
  ...(t.orientation === 'horizontal' && {
    top: '-10px',
    transformOrigin: 'bottom center',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: 8,
      height: 8,
      transform: 'translate(-50%, 50%) rotate(45deg)',
      backgroundColor: 'inherit',
      bottom: 0,
      left: '50%',
    },
  }),
  ...(t.orientation === 'vertical' && {
    right: t.size === 'small' ? '20px' : '30px',
    top: '50%',
    transformOrigin: 'right center',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: 8,
      height: 8,
      transform: 'translate(-50%, -50%) rotate(45deg)',
      backgroundColor: 'inherit',
      right: '-20%',
      top: '50%',
    },
  }),
  ...(t.size === 'small' && {
    fontSize: e.typography.pxToRem(12),
    padding: '0.25rem 0.5rem',
  }),
}));
process.env.NODE_ENV !== 'production' &&
  (Bc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Uc = pe('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Li(e) && e !== 'markActive',
  overridesResolver: (e, t) => {
    const { markActive: o } = e;
    return [t.mark, o && t.markActive];
  },
})(({ theme: e, ownerState: t, markActive: o }) => ({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  ...(t.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-1px, -50%)',
  }),
  ...(t.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 1px)',
  }),
  ...(o && {
    backgroundColor: (e.vars || e).palette.background.paper,
    opacity: 0.8,
  }),
}));
process.env.NODE_ENV !== 'production' &&
  (Uc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Wc = pe('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Li(e) && e !== 'markLabelActive',
  overridesResolver: (e, t) => t.markLabel,
})(({ theme: e, ownerState: t, markLabelActive: o }) => ({
  ...e.typography.body2,
  color: (e.vars || e).palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  ...(t.orientation === 'horizontal' && {
    top: 30,
    transform: 'translateX(-50%)',
    '@media (pointer: coarse)': {
      top: 40,
    },
  }),
  ...(t.orientation === 'vertical' && {
    left: 36,
    transform: 'translateY(50%)',
    '@media (pointer: coarse)': {
      left: 44,
    },
  }),
  ...(o && {
    color: (e.vars || e).palette.text.primary,
  }),
}));
process.env.NODE_ENV !== 'production' &&
  (Wc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const hy = (e) => {
    const {
        disabled: t,
        dragging: o,
        marked: r,
        orientation: i,
        track: a,
        classes: s,
        color: l,
        size: c,
      } = e,
      d = {
        root: [
          'root',
          t && 'disabled',
          o && 'dragging',
          r && 'marked',
          i === 'vertical' && 'vertical',
          a === 'inverted' && 'trackInverted',
          a === !1 && 'trackFalse',
          l && `color${oe(l)}`,
          c && `size${oe(c)}`,
        ],
        rail: ['rail'],
        track: ['track'],
        mark: ['mark'],
        markActive: ['markActive'],
        markLabel: ['markLabel'],
        markLabelActive: ['markLabelActive'],
        valueLabel: ['valueLabel'],
        thumb: ['thumb', t && 'disabled', c && `thumbSize${oe(c)}`, l && `thumbColor${oe(l)}`],
        active: ['active'],
        disabled: ['disabled'],
        focusVisible: ['focusVisible'],
      };
    return De(d, py, s);
  },
  by = ({ children: e }) => e,
  Hc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l, c, d, u, p, h, y, g, m, v, T, C, O, E, f, R, S, D, B, N;
    const I = Ye({
        props: t,
        name: 'MuiSlider',
      }),
      j = Kn().direction === 'rtl',
      {
        'aria-label': _,
        'aria-valuetext': A,
        'aria-labelledby': q,
        // eslint-disable-next-line react/prop-types
        component: ae = 'span',
        components: Q = {},
        componentsProps: z = {},
        color: w = 'primary',
        classes: L,
        className: G,
        disableSwap: V = !1,
        disabled: H = !1,
        getAriaLabel: K,
        getAriaValueText: re,
        marks: Z = !1,
        max: ie = 100,
        min: ce = 0,
        name: ue,
        onChange: me,
        onChangeCommitted: P,
        orientation: Te = 'horizontal',
        size: X = 'medium',
        step: W = 1,
        scale: Ce = js,
        slotProps: de,
        slots: ke,
        tabIndex: Le,
        track: Xe = 'normal',
        value: Ke,
        valueLabelDisplay: je = 'off',
        valueLabelFormat: Ze = js,
        ...ee
      } = I,
      te = {
        ...I,
        isRtl: j,
        max: ie,
        min: ce,
        classes: L,
        disabled: H,
        disableSwap: V,
        orientation: Te,
        marks: Z,
        color: w,
        size: X,
        step: W,
        scale: Ce,
        track: Xe,
        valueLabelDisplay: je,
        valueLabelFormat: Ze,
      },
      {
        axisProps: ye,
        getRootProps: he,
        getHiddenInputProps: xe,
        getThumbProps: Ne,
        open: se,
        active: we,
        axis: U,
        focusedThumbIndex: ge,
        range: Se,
        dragging: ft,
        marks: ht,
        values: st,
        trackOffset: Et,
        trackLeap: xt,
      } = Hh({
        ...te,
        rootRef: o,
      });
    (te.marked = ht.length > 0 && ht.some((be) => be.label)),
      (te.dragging = ft),
      (te.focusedThumbIndex = ge);
    const Qe = hy(te),
      lt = (r = (i = ke == null ? void 0 : ke.root) != null ? i : Q.Root) != null ? r : jc,
      ut = (a = (s = ke == null ? void 0 : ke.rail) != null ? s : Q.Rail) != null ? a : Fc,
      Wt = (l = (c = ke == null ? void 0 : ke.track) != null ? c : Q.Track) != null ? l : zc,
      Ht = (d = (u = ke == null ? void 0 : ke.thumb) != null ? u : Q.Thumb) != null ? d : Vc,
      nn =
        (p = (h = ke == null ? void 0 : ke.valueLabel) != null ? h : Q.ValueLabel) != null ? p : Bc,
      Ot = (y = (g = ke == null ? void 0 : ke.mark) != null ? g : Q.Mark) != null ? y : Uc,
      qt =
        (m = (v = ke == null ? void 0 : ke.markLabel) != null ? v : Q.MarkLabel) != null ? m : Wc,
      Yt = (T = (C = ke == null ? void 0 : ke.input) != null ? C : Q.Input) != null ? T : 'input',
      Tt = (O = de == null ? void 0 : de.root) != null ? O : z.root,
      hn = (E = de == null ? void 0 : de.rail) != null ? E : z.rail,
      on = (f = de == null ? void 0 : de.track) != null ? f : z.track,
      Ct = (R = de == null ? void 0 : de.thumb) != null ? R : z.thumb,
      Dt = (S = de == null ? void 0 : de.valueLabel) != null ? S : z.valueLabel,
      Kt = (D = de == null ? void 0 : de.mark) != null ? D : z.mark,
      bn = (B = de == null ? void 0 : de.markLabel) != null ? B : z.markLabel,
      at = (N = de == null ? void 0 : de.input) != null ? N : z.input,
      x = Pt({
        elementType: lt,
        getSlotProps: he,
        externalSlotProps: Tt,
        externalForwardedProps: ee,
        additionalProps: {
          ...(dy(lt) && {
            as: ae,
          }),
        },
        ownerState: {
          ...te,
          ...(Tt == null ? void 0 : Tt.ownerState),
        },
        className: [Qe.root, G],
      }),
      F = Pt({
        elementType: ut,
        externalSlotProps: hn,
        ownerState: te,
        className: Qe.rail,
      }),
      le = Pt({
        elementType: Wt,
        externalSlotProps: on,
        additionalProps: {
          style: {
            ...ye[U].offset(Et),
            ...ye[U].leap(xt),
          },
        },
        ownerState: {
          ...te,
          ...(on == null ? void 0 : on.ownerState),
        },
        className: Qe.track,
      }),
      k = Pt({
        elementType: Ht,
        getSlotProps: Ne,
        externalSlotProps: Ct,
        ownerState: {
          ...te,
          ...(Ct == null ? void 0 : Ct.ownerState),
        },
        className: Qe.thumb,
      }),
      $ = Pt({
        elementType: nn,
        externalSlotProps: Dt,
        ownerState: {
          ...te,
          ...(Dt == null ? void 0 : Dt.ownerState),
        },
        className: Qe.valueLabel,
      }),
      Y = Pt({
        elementType: Ot,
        externalSlotProps: Kt,
        ownerState: te,
        className: Qe.mark,
      }),
      ne = Pt({
        elementType: qt,
        externalSlotProps: bn,
        ownerState: te,
        className: Qe.markLabel,
      }),
      fe = Pt({
        elementType: Yt,
        getSlotProps: xe,
        externalSlotProps: at,
        ownerState: te,
      });
    return /* @__PURE__ */ Ge(lt, {
      ...x,
      children: [
        /* @__PURE__ */ M(ut, {
          ...F,
        }),
        /* @__PURE__ */ M(Wt, {
          ...le,
        }),
        ht
          .filter((be) => be.value >= ce && be.value <= ie)
          .map((be, ve) => {
            const Re = nr(be.value, ce, ie),
              Oe = ye[U].offset(Re);
            let Fe;
            return (
              Xe === !1
                ? (Fe = st.indexOf(be.value) !== -1)
                : (Fe =
                    (Xe === 'normal' &&
                      (Se
                        ? be.value >= st[0] && be.value <= st[st.length - 1]
                        : be.value <= st[0])) ||
                    (Xe === 'inverted' &&
                      (Se
                        ? be.value <= st[0] || be.value >= st[st.length - 1]
                        : be.value >= st[0]))),
              /* @__PURE__ */ Ge(
                b.Fragment,
                {
                  children: [
                    /* @__PURE__ */ M(Ot, {
                      'data-index': ve,
                      ...Y,
                      ...(!dn(Ot) && {
                        markActive: Fe,
                      }),
                      style: {
                        ...Oe,
                        ...Y.style,
                      },
                      className: Ee(Y.className, Fe && Qe.markActive),
                    }),
                    be.label != null
                      ? /* @__PURE__ */ M(qt, {
                          'aria-hidden': !0,
                          'data-index': ve,
                          ...ne,
                          ...(!dn(qt) && {
                            markLabelActive: Fe,
                          }),
                          style: {
                            ...Oe,
                            ...ne.style,
                          },
                          className: Ee(Qe.markLabel, ne.className, Fe && Qe.markLabelActive),
                          children: be.label,
                        })
                      : null,
                  ],
                },
                ve,
              )
            );
          }),
        st.map((be, ve) => {
          const Re = nr(be, ce, ie),
            Oe = ye[U].offset(Re),
            Fe = je === 'off' ? by : nn;
          return (
            /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
            /* @__PURE__ */ M(
              Fe,
              {
                ...(!dn(Fe) && {
                  valueLabelFormat: Ze,
                  valueLabelDisplay: je,
                  value: typeof Ze == 'function' ? Ze(Ce(be), ve) : Ze,
                  index: ve,
                  open: se === ve || we === ve || je === 'on',
                  disabled: H,
                }),
                ...$,
                children: /* @__PURE__ */ M(Ht, {
                  'data-index': ve,
                  ...k,
                  className: Ee(
                    Qe.thumb,
                    k.className,
                    we === ve && Qe.active,
                    ge === ve && Qe.focusVisible,
                  ),
                  style: {
                    ...Oe,
                    pointerEvents: V && we !== ve ? 'none' : void 0,
                    ...k.style,
                  },
                  children: /* @__PURE__ */ M(Yt, {
                    'data-index': ve,
                    'aria-label': K ? K(ve) : _,
                    'aria-valuenow': Ce(be),
                    'aria-labelledby': q,
                    'aria-valuetext': re ? re(Ce(be), ve) : A,
                    value: st[ve],
                    ...fe,
                  }),
                }),
              },
              ve,
            )
          );
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Hc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The label of the slider.
     */
    'aria-label': Bt(n.string, (e) =>
      Array.isArray(e.value || e.defaultValue) && e['aria-label'] != null
        ? new Error(
            'MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
          )
        : null,
    ),
    /**
     * The id of the element containing a label for the slider.
     */
    'aria-labelledby': n.string,
    /**
     * A string value that provides a user-friendly name for the current value of the slider.
     */
    'aria-valuetext': Bt(n.string, (e) =>
      Array.isArray(e.value || e.defaultValue) && e['aria-valuetext'] != null
        ? new Error(
            'MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.',
          )
        : null,
    ),
    /**
     * @ignore
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */
    color: n.oneOfType([n.oneOf(['primary', 'secondary']), n.string]),
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components: n.shape({
      Input: n.elementType,
      Mark: n.elementType,
      MarkLabel: n.elementType,
      Rail: n.elementType,
      Root: n.elementType,
      Thumb: n.elementType,
      Track: n.elementType,
      ValueLabel: n.elementType,
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
    componentsProps: n.shape({
      input: n.oneOfType([n.func, n.object]),
      mark: n.oneOfType([n.func, n.object]),
      markLabel: n.oneOfType([n.func, n.object]),
      rail: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
      thumb: n.oneOfType([n.func, n.object]),
      track: n.oneOfType([n.func, n.object]),
      valueLabel: n.oneOfType([
        n.func,
        n.shape({
          children: n.element,
          className: n.string,
          open: n.bool,
          style: n.object,
          value: n.number,
          valueLabelDisplay: n.oneOf(['auto', 'off', 'on']),
        }),
      ]),
    }),
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: n.oneOfType([n.arrayOf(n.number), n.number]),
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: n.bool,
    /**
     * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
     * @default false
     */
    disableSwap: n.bool,
    /**
     * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
     * This is important for screen reader users.
     * @param {number} index The thumb label's index to format.
     * @returns {string}
     */
    getAriaLabel: n.func,
    /**
     * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
     * This is important for screen reader users.
     * @param {number} value The thumb label's value to format.
     * @param {number} index The thumb label's index to format.
     * @returns {string}
     */
    getAriaValueText: n.func,
    /**
     * Marks indicate predetermined values to which the user can move the slider.
     * If `true` the marks are spaced according the value of the `step` prop.
     * If an array, it should contain objects with `value` and an optional `label` keys.
     * @default false
     */
    marks: n.oneOfType([
      n.arrayOf(
        n.shape({
          label: n.node,
          value: n.number.isRequired,
        }),
      ),
      n.bool,
    ]),
    /**
     * The maximum allowed value of the slider.
     * Should not be equal to min.
     * @default 100
     */
    max: n.number,
    /**
     * The minimum allowed value of the slider.
     * Should not be equal to max.
     * @default 0
     */
    min: n.number,
    /**
     * Name attribute of the hidden `input` element.
     */
    name: n.string,
    /**
     * Callback function that is fired when the slider's value changed.
     *
     * @param {Event} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (any).
     * **Warning**: This is a generic event not a change event.
     * @param {number | number[]} value The new value.
     * @param {number} activeThumb Index of the currently moved thumb.
     */
    onChange: n.func,
    /**
     * Callback function that is fired when the `mouseup` is triggered.
     *
     * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
     * @param {number | number[]} value The new value.
     */
    onChangeCommitted: n.func,
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation: n.oneOf(['horizontal', 'vertical']),
    /**
     * A transformation function, to change the scale of the slider.
     * @param {any} x
     * @returns {any}
     * @default function Identity(x) {
     *   return x;
     * }
     */
    scale: n.func,
    /**
     * The size of the slider.
     * @default 'medium'
     */
    size: n.oneOfType([n.oneOf(['small', 'medium']), n.string]),
    /**
     * The props used for each slot inside the Slider.
     * @default {}
     */
    slotProps: n.shape({
      input: n.oneOfType([n.func, n.object]),
      mark: n.oneOfType([n.func, n.object]),
      markLabel: n.oneOfType([n.func, n.object]),
      rail: n.oneOfType([n.func, n.object]),
      root: n.oneOfType([n.func, n.object]),
      thumb: n.oneOfType([n.func, n.object]),
      track: n.oneOfType([n.func, n.object]),
      valueLabel: n.oneOfType([
        n.func,
        n.shape({
          children: n.element,
          className: n.string,
          open: n.bool,
          style: n.object,
          value: n.number,
          valueLabelDisplay: n.oneOf(['auto', 'off', 'on']),
        }),
      ]),
    }),
    /**
     * The components used for each slot inside the Slider.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: n.shape({
      input: n.elementType,
      mark: n.elementType,
      markLabel: n.elementType,
      rail: n.elementType,
      root: n.elementType,
      thumb: n.elementType,
      track: n.elementType,
      valueLabel: n.elementType,
    }),
    /**
     * The granularity with which the slider can step through values. (A "discrete" slider.)
     * The `min` prop serves as the origin for the valid values.
     * We recommend (max - min) to be evenly divisible by the step.
     *
     * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
     * @default 1
     */
    step: n.number,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Tab index attribute of the hidden `input` element.
     */
    tabIndex: n.number,
    /**
     * The track presentation:
     *
     * - `normal` the track will render a bar representing the slider value.
     * - `inverted` the track will render a bar representing the remaining slider value.
     * - `false` the track will render without a bar.
     * @default 'normal'
     */
    track: n.oneOf(['inverted', 'normal', !1]),
    /**
     * The value of the slider.
     * For ranged sliders, provide an array with two values.
     */
    value: n.oneOfType([n.arrayOf(n.number), n.number]),
    /**
     * Controls when the value label is displayed:
     *
     * - `auto` the value label will display when the thumb is hovered or focused.
     * - `on` will display persistently.
     * - `off` will never display.
     * @default 'off'
     */
    valueLabelDisplay: n.oneOf(['auto', 'off', 'on']),
    /**
     * The format function the value label's value.
     *
     * When a function is provided, it should have the following signature:
     *
     * - {number} value The value label's value to format
     * - {number} index The value label's index to format
     * @param {any} x
     * @returns {any}
     * @default function Identity(x) {
     *   return x;
     * }
     */
    valueLabelFormat: n.oneOfType([n.func, n.string]),
  });
const vy = Hc;
function gy(e) {
  return Pe('MuiSnackbarContent', e);
}
_e('MuiSnackbarContent', ['root', 'message', 'action']);
const yy = (e) => {
    const { classes: t } = e;
    return De(
      {
        root: ['root'],
        action: ['action'],
        message: ['message'],
      },
      gy,
      t,
    );
  },
  Ey = pe(ko, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 0.8 : 0.98,
      o = wf(e.palette.background.default, t);
    return {
      ...e.typography.body2,
      color: e.vars ? e.vars.palette.SnackbarContent.color : e.palette.getContrastText(o),
      backgroundColor: e.vars ? e.vars.palette.SnackbarContent.bg : o,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px 16px',
      borderRadius: (e.vars || e).shape.borderRadius,
      flexGrow: 1,
      [e.breakpoints.up('sm')]: {
        flexGrow: 'initial',
        minWidth: 288,
      },
    };
  }),
  xy = pe('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({
    padding: '8px 0',
  }),
  Oy = pe('div', {
    name: 'MuiSnackbarContent',
    slot: 'Action',
    overridesResolver: (e, t) => t.action,
  })({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingLeft: 16,
    marginRight: -8,
  }),
  qc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiSnackbarContent',
      }),
      { action: i, className: a, message: s, role: l = 'alert', ...c } = r,
      d = r,
      u = yy(d);
    return /* @__PURE__ */ Ge(Ey, {
      role: l,
      square: !0,
      elevation: 6,
      className: Ee(u.root, a),
      ownerState: d,
      ref: o,
      ...c,
      children: [
        /* @__PURE__ */ M(xy, {
          className: u.message,
          ownerState: d,
          children: s,
        }),
        i
          ? /* @__PURE__ */ M(Oy, {
              className: u.action,
              ownerState: d,
              children: i,
            })
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (qc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The message to display.
     */
    message: n.node,
    /**
     * The ARIA role attribute of the element.
     * @default 'alert'
     */
    role: n.string,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const Ty = qc;
function Cy(e) {
  return Pe('MuiSnackbar', e);
}
_e('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const Sy = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = {
        root: ['root', `anchorOrigin${oe(o.vertical)}${oe(o.horizontal)}`],
      };
    return De(r, Cy, t);
  },
  Fs = pe('div', {
    name: 'MuiSnackbar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[`anchorOrigin${oe(o.anchorOrigin.vertical)}${oe(o.anchorOrigin.horizontal)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    const o = {
      left: '50%',
      right: 'auto',
      transform: 'translateX(-50%)',
    };
    return {
      zIndex: (e.vars || e).zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 8,
      right: 8,
      justifyContent: 'center',
      alignItems: 'center',
      ...(t.anchorOrigin.vertical === 'top'
        ? {
            top: 8,
          }
        : {
            bottom: 8,
          }),
      ...(t.anchorOrigin.horizontal === 'left' && {
        justifyContent: 'flex-start',
      }),
      ...(t.anchorOrigin.horizontal === 'right' && {
        justifyContent: 'flex-end',
      }),
      [e.breakpoints.up('sm')]: {
        ...(t.anchorOrigin.vertical === 'top'
          ? {
              top: 24,
            }
          : {
              bottom: 24,
            }),
        ...(t.anchorOrigin.horizontal === 'center' && o),
        ...(t.anchorOrigin.horizontal === 'left' && {
          left: 24,
          right: 'auto',
        }),
        ...(t.anchorOrigin.horizontal === 'right' && {
          right: 24,
          left: 'auto',
        }),
      },
    };
  }),
  Yc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiSnackbar',
      }),
      i = Kn(),
      a = {
        enter: i.transitions.duration.enteringScreen,
        exit: i.transitions.duration.leavingScreen,
      },
      {
        action: s,
        anchorOrigin: { vertical: l, horizontal: c } = {
          vertical: 'bottom',
          horizontal: 'left',
        },
        autoHideDuration: d = null,
        children: u,
        className: p,
        ClickAwayListenerProps: h,
        ContentProps: y,
        disableWindowBlurListener: g = !1,
        message: m,
        onBlur: v,
        onClose: T,
        onFocus: C,
        onMouseEnter: O,
        onMouseLeave: E,
        open: f,
        resumeHideDuration: R,
        TransitionComponent: S = Oc,
        transitionDuration: D = a,
        TransitionProps: { onEnter: B, onExited: N, ...I } = {},
        ...J
      } = r,
      j = {
        ...r,
        anchorOrigin: {
          vertical: l,
          horizontal: c,
        },
        autoHideDuration: d,
        disableWindowBlurListener: g,
        TransitionComponent: S,
        transitionDuration: D,
      },
      _ = Sy(j),
      { getRootProps: A, onClickAway: q } = qh({
        ...j,
      }),
      [ae, Q] = b.useState(!0),
      z = Pt({
        elementType: Fs,
        getSlotProps: A,
        externalForwardedProps: J,
        ownerState: j,
        additionalProps: {
          ref: o,
        },
        className: [_.root, p],
      }),
      w = (G) => {
        Q(!0), N && N(G);
      },
      L = (G, V) => {
        Q(!1), B && B(G, V);
      };
    return !f && ae
      ? null
      : /* @__PURE__ */ M(Jo, {
          onClickAway: q,
          ...h,
          children: /* @__PURE__ */ M(Fs, {
            ...z,
            children: /* @__PURE__ */ M(S, {
              appear: !0,
              in: f,
              timeout: D,
              direction: l === 'top' ? 'down' : 'up',
              onEnter: L,
              onExited: w,
              ...I,
              children:
                u ||
                /* @__PURE__ */ M(Ty, {
                  message: m,
                  action: s,
                  ...y,
                }),
            }),
          }),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (Yc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action: n.node,
    /**
     * The anchor of the `Snackbar`.
     * On smaller screens, the component grows to occupy all the available width,
     * the horizontal alignment is ignored.
     * @default { vertical: 'bottom', horizontal: 'left' }
     */
    anchorOrigin: n.shape({
      horizontal: n.oneOf(['center', 'left', 'right']).isRequired,
      vertical: n.oneOf(['bottom', 'top']).isRequired,
    }),
    /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. `onClose` should then set the state of the `open`
     * prop to hide the Snackbar. This behavior is disabled by default with
     * the `null` value.
     * @default null
     */
    autoHideDuration: n.number,
    /**
     * Replace the `SnackbarContent` component.
     */
    children: n.element,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * Props applied to the `ClickAwayListener` element.
     */
    ClickAwayListenerProps: n.object,
    /**
     * Props applied to the [`SnackbarContent`](/material-ui/api/snackbar-content/) element.
     */
    ContentProps: n.object,
    /**
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     * @default false
     */
    disableWindowBlurListener: n.bool,
    /**
     * When displaying multiple consecutive Snackbars from a parent rendering a single
     * <Snackbar/>, add the key prop to ensure independent treatment of each message.
     * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
     * features such as autoHideDuration may be canceled.
     */
    key: () => null,
    /**
     * The message to display.
     */
    message: n.node,
    /**
     * @ignore
     */
    onBlur: n.func,
    /**
     * Callback fired when the component requests to be closed.
     * Typically `onClose` is used to set state in the parent component,
     * which is used to control the `Snackbar` `open` prop.
     * The `reason` parameter can optionally be used to control the response to `onClose`,
     * for example ignoring `clickaway`.
     *
     * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
     * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
     */
    onClose: n.func,
    /**
     * @ignore
     */
    onFocus: n.func,
    /**
     * @ignore
     */
    onMouseEnter: n.func,
    /**
     * @ignore
     */
    onMouseLeave: n.func,
    /**
     * If `true`, the component is shown.
     */
    open: n.bool,
    /**
     * The number of milliseconds to wait before dismissing after user interaction.
     * If `autoHideDuration` prop isn't specified, it does nothing.
     * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
     * we default to `autoHideDuration / 2` ms.
     */
    resumeHideDuration: n.number,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The component used for the transition.
     * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
     * @default Grow
     */
    TransitionComponent: n.elementType,
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     * @default {
     *   enter: theme.transitions.duration.enteringScreen,
     *   exit: theme.transitions.duration.leavingScreen,
     * }
     */
    transitionDuration: n.oneOfType([
      n.number,
      n.shape({
        appear: n.number,
        enter: n.number,
        exit: n.number,
      }),
    ]),
    /**
     * Props applied to the transition element.
     * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
     * @default {}
     */
    TransitionProps: n.object,
  });
const Ry = Yc;
function wy(e) {
  return Pe('MuiSwitch', e);
}
const ky = _e('MuiSwitch', [
    'root',
    'edgeStart',
    'edgeEnd',
    'switchBase',
    'colorPrimary',
    'colorSecondary',
    'sizeSmall',
    'sizeMedium',
    'checked',
    'disabled',
    'input',
    'thumb',
    'track',
  ]),
  mt = ky,
  $y = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${oe(o)}`, `size${oe(r)}`],
        switchBase: ['switchBase', `color${oe(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = De(l, wy, t);
    return {
      ...t,
      // forward the disabled and checked classes to the SwitchBase
      ...c,
    };
  },
  Ny = pe('span', {
    name: 'MuiSwitch',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.edge && t[`edge${oe(o.edge)}`], t[`size${oe(o.size)}`]];
    },
  })(({ ownerState: e }) => ({
    display: 'inline-flex',
    width: 34 + 12 * 2,
    height: 14 + 12 * 2,
    overflow: 'hidden',
    padding: 12,
    boxSizing: 'border-box',
    position: 'relative',
    flexShrink: 0,
    zIndex: 0,
    // Reset the stacking context.
    verticalAlign: 'middle',
    // For correct alignment with the text.
    '@media print': {
      colorAdjust: 'exact',
    },
    ...(e.edge === 'start' && {
      marginLeft: -8,
    }),
    ...(e.edge === 'end' && {
      marginRight: -8,
    }),
    ...(e.size === 'small' && {
      width: 40,
      height: 24,
      padding: 7,
      [`& .${mt.thumb}`]: {
        width: 16,
        height: 16,
      },
      [`& .${mt.switchBase}`]: {
        padding: 4,
        [`&.${mt.checked}`]: {
          transform: 'translateX(16px)',
        },
      },
    }),
  })),
  Py = pe(mc, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        {
          [`& .${mt.input}`]: t.input,
        },
        o.color !== 'default' && t[`color${oe(o.color)}`],
      ];
    },
  })(
    ({ theme: e }) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      // Render above the focus ripple.
      color: e.vars
        ? e.vars.palette.Switch.defaultColor
        : `${e.palette.mode === 'light' ? e.palette.common.white : e.palette.grey[300]}`,
      transition: e.transitions.create(['left', 'transform'], {
        duration: e.transitions.duration.shortest,
      }),
      [`&.${mt.checked}`]: {
        transform: 'translateX(20px)',
      },
      [`&.${mt.disabled}`]: {
        color: e.vars
          ? e.vars.palette.Switch.defaultDisabledColor
          : `${e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[600]}`,
      },
      [`&.${mt.checked} + .${mt.track}`]: {
        opacity: 0.5,
      },
      [`&.${mt.disabled} + .${mt.track}`]: {
        opacity: e.vars
          ? e.vars.opacity.switchTrackDisabled
          : `${e.palette.mode === 'light' ? 0.12 : 0.2}`,
      },
      [`& .${mt.input}`]: {
        left: '-100%',
        width: '300%',
      },
    }),
    ({ theme: e, ownerState: t }) => ({
      '&:hover': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
          : Je(e.palette.action.active, e.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      ...(t.color !== 'default' && {
        [`&.${mt.checked}`]: {
          color: (e.vars || e).palette[t.color].main,
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                  e.vars.palette.action.hoverOpacity
                })`
              : Je(e.palette[t.color].main, e.palette.action.hoverOpacity),
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
          [`&.${mt.disabled}`]: {
            color: e.vars
              ? e.vars.palette.Switch[`${t.color}DisabledColor`]
              : `${
                  e.palette.mode === 'light'
                    ? Cr(e.palette[t.color].main, 0.62)
                    : Tr(e.palette[t.color].main, 0.55)
                }`,
          },
        },
        [`&.${mt.checked} + .${mt.track}`]: {
          backgroundColor: (e.vars || e).palette[t.color].main,
        },
      }),
    }),
  ),
  Iy = pe('span', {
    name: 'MuiSwitch',
    slot: 'Track',
    overridesResolver: (e, t) => t.track,
  })(({ theme: e }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 14 / 2,
    zIndex: -1,
    transition: e.transitions.create(['opacity', 'background-color'], {
      duration: e.transitions.duration.shortest,
    }),
    backgroundColor: e.vars
      ? e.vars.palette.common.onBackground
      : `${e.palette.mode === 'light' ? e.palette.common.black : e.palette.common.white}`,
    opacity: e.vars ? e.vars.opacity.switchTrack : `${e.palette.mode === 'light' ? 0.38 : 0.3}`,
  })),
  _y = pe('span', {
    name: 'MuiSwitch',
    slot: 'Thumb',
    overridesResolver: (e, t) => t.thumb,
  })(({ theme: e }) => ({
    boxShadow: (e.vars || e).shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%',
  })),
  Kc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiSwitch',
      }),
      { className: i, color: a = 'primary', edge: s = !1, size: l = 'medium', sx: c, ...d } = r,
      u = {
        ...r,
        color: a,
        edge: s,
        size: l,
      },
      p = $y(u),
      h = /* @__PURE__ */ M(_y, {
        className: p.thumb,
        ownerState: u,
      });
    return /* @__PURE__ */ Ge(Ny, {
      className: Ee(p.root, i),
      sx: c,
      ownerState: u,
      children: [
        /* @__PURE__ */ M(Py, {
          type: 'checkbox',
          icon: h,
          checkedIcon: h,
          ref: o,
          ownerState: u,
          ...d,
          classes: {
            ...p,
            root: p.switchBase,
          },
        }),
        /* @__PURE__ */ M(Iy, {
          className: p.track,
          ownerState: u,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Kc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * If `true`, the component is checked.
     */
    checked: n.bool,
    /**
     * The icon to display when the component is checked.
     */
    checkedIcon: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */
    color: n.oneOfType([
      n.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    /**
     * The default checked state. Use when the component is not controlled.
     */
    defaultChecked: n.bool,
    /**
     * If `true`, the component is disabled.
     */
    disabled: n.bool,
    /**
     * If `true`, the ripple effect is disabled.
     * @default false
     */
    disableRipple: n.bool,
    /**
     * If given, uses a negative margin to counteract the padding on one
     * side (this is often helpful for aligning the left or right
     * side of the icon with content above or below, without ruining the border
     * size and shape).
     * @default false
     */
    edge: n.oneOf(['end', 'start', !1]),
    /**
     * The icon to display when the component is unchecked.
     */
    icon: n.node,
    /**
     * The id of the `input` element.
     */
    id: n.string,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: yt,
    /**
     * Callback fired when the state is changed.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     * You can pull out the new checked state by accessing `event.target.checked` (boolean).
     */
    onChange: n.func,
    /**
     * If `true`, the `input` element is required.
     * @default false
     */
    required: n.bool,
    /**
     * The size of the component.
     * `small` is equivalent to the dense switch styling.
     * @default 'medium'
     */
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The value of the component. The DOM API casts this to a string.
     * The browser uses "on" as the default value.
     */
    value: n.any,
  });
const My = Kc;
function Ay(e) {
  return Pe('MuiTextField', e);
}
_e('MuiTextField', ['root']);
const Dy = {
    standard: Tc,
    filled: vc,
    outlined: Ac,
  },
  Ly = (e) => {
    const { classes: t } = e;
    return De(
      {
        root: ['root'],
      },
      Ay,
      t,
    );
  },
  jy = pe(tg, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Gc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Ye({
        props: t,
        name: 'MuiTextField',
      }),
      {
        autoComplete: i,
        autoFocus: a = !1,
        children: s,
        className: l,
        color: c = 'primary',
        defaultValue: d,
        disabled: u = !1,
        error: p = !1,
        FormHelperTextProps: h,
        fullWidth: y = !1,
        helperText: g,
        id: m,
        InputLabelProps: v,
        inputProps: T,
        InputProps: C,
        inputRef: O,
        label: E,
        maxRows: f,
        minRows: R,
        multiline: S = !1,
        name: D,
        onBlur: B,
        onChange: N,
        onClick: I,
        onFocus: J,
        placeholder: j,
        required: _ = !1,
        rows: A,
        select: q = !1,
        SelectProps: ae,
        type: Q,
        value: z,
        variant: w = 'outlined',
        ...L
      } = r,
      G = {
        ...r,
        autoFocus: a,
        color: c,
        disabled: u,
        error: p,
        fullWidth: y,
        multiline: S,
        required: _,
        select: q,
        variant: w,
      },
      V = Ly(G);
    process.env.NODE_ENV !== 'production' &&
      q &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const H = {};
    w === 'outlined' && (v && typeof v.shrink < 'u' && (H.notched = v.shrink), (H.label = E)),
      q && ((!ae || !ae.native) && (H.id = void 0), (H['aria-describedby'] = void 0));
    const K = el(m),
      re = g && K ? `${K}-helper-text` : void 0,
      Z = E && K ? `${K}-label` : void 0,
      ie = Dy[w],
      ce = /* @__PURE__ */ M(ie, {
        'aria-describedby': re,
        autoComplete: i,
        autoFocus: a,
        defaultValue: d,
        fullWidth: y,
        multiline: S,
        name: D,
        rows: A,
        maxRows: f,
        minRows: R,
        type: Q,
        value: z,
        id: K,
        inputRef: O,
        onBlur: B,
        onChange: N,
        onFocus: J,
        onClick: I,
        placeholder: j,
        inputProps: T,
        ...H,
        ...C,
      });
    return /* @__PURE__ */ Ge(jy, {
      className: Ee(V.root, l),
      disabled: u,
      error: p,
      fullWidth: y,
      ref: o,
      required: _,
      color: c,
      variant: w,
      ownerState: G,
      ...L,
      children: [
        E != null &&
          E !== '' &&
          /* @__PURE__ */ M(yg, {
            htmlFor: K,
            id: Z,
            ...v,
            children: E,
          }),
        q
          ? /* @__PURE__ */ M(cy, {
              'aria-describedby': re,
              id: K,
              labelId: Z,
              value: z,
              input: ce,
              ...ae,
              children: s,
            })
          : ce,
        g &&
          /* @__PURE__ */ M(ag, {
            id: re,
            ...h,
            children: g,
          }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Gc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * This prop helps users to fill forms faster, especially on mobile devices.
     * The name can be confusing, as it's more like an autofill.
     * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
     */
    autoComplete: n.string,
    /**
     * If `true`, the `input` element is focused during the first mount.
     * @default false
     */
    autoFocus: n.bool,
    /**
     * @ignore
     */
    children: n.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: n.object,
    /**
     * @ignore
     */
    className: n.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */
    color: n.oneOfType([
      n.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
      n.string,
    ]),
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue: n.any,
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: n.bool,
    /**
     * If `true`, the label is displayed in an error state.
     * @default false
     */
    error: n.bool,
    /**
     * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
     */
    FormHelperTextProps: n.object,
    /**
     * If `true`, the input will take up the full width of its container.
     * @default false
     */
    fullWidth: n.bool,
    /**
     * The helper text content.
     */
    helperText: n.node,
    /**
     * The id of the `input` element.
     * Use this prop to make `label` and `helperText` accessible for screen readers.
     */
    id: n.string,
    /**
     * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
     * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
     */
    InputLabelProps: n.object,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     */
    inputProps: n.object,
    /**
     * Props applied to the Input element.
     * It will be a [`FilledInput`](/material-ui/api/filled-input/),
     * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
     * component depending on the `variant` prop value.
     */
    InputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: yt,
    /**
     * The label content.
     */
    label: n.node,
    /**
     * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
     * @default 'none'
     */
    margin: n.oneOf(['dense', 'none', 'normal']),
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    maxRows: n.oneOfType([n.number, n.string]),
    /**
     * Minimum number of rows to display when multiline option is set to true.
     */
    minRows: n.oneOfType([n.number, n.string]),
    /**
     * If `true`, a `textarea` element is rendered instead of an input.
     * @default false
     */
    multiline: n.bool,
    /**
     * Name attribute of the `input` element.
     */
    name: n.string,
    /**
     * @ignore
     */
    onBlur: n.func,
    /**
     * Callback fired when the value is changed.
     *
     * @param {object} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     */
    onChange: n.func,
    /**
     * @ignore
     */
    onClick: n.func,
    /**
     * @ignore
     */
    onFocus: n.func,
    /**
     * The short hint displayed in the `input` before the user enters a value.
     */
    placeholder: n.string,
    /**
     * If `true`, the label is displayed as required and the `input` element is required.
     * @default false
     */
    required: n.bool,
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows: n.oneOfType([n.number, n.string]),
    /**
     * Render a [`Select`](/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
     * If this option is set you must pass the options of the select as children.
     * @default false
     */
    select: n.bool,
    /**
     * Props applied to the [`Select`](/material-ui/api/select/) element.
     */
    SelectProps: n.object,
    /**
     * The size of the component.
     */
    size: n.oneOfType([n.oneOf(['medium', 'small']), n.string]),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
     */
    type: n.string,
    /**
     * The value of the `input` element, required for a controlled component.
     */
    value: n.any,
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant: n.oneOf(['filled', 'outlined', 'standard']),
  });
const Xc = Gc;
function _n({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return /* @__PURE__ */ M(Nv, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: i,
  });
}
var Dn = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(Dn || {});
function Wy({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = Dn.After,
  isIndeterminate: r = !1,
  isDefaultChecked: i = !1,
  isDisabled: a = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const d = /* @__PURE__ */ M(Hv, {
    checked: e,
    indeterminate: r,
    defaultChecked: i,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let u;
  if (t) {
    const p = o === Dn.Before || o === Dn.Above,
      h = /* @__PURE__ */ M('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      y = o === Dn.Before || o === Dn.After,
      g = y ? h : /* @__PURE__ */ M('div', { children: h }),
      m = y ? d : /* @__PURE__ */ M('div', { children: d });
    u = /* @__PURE__ */ Ge(xc, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [p && g, m, !p && g],
    });
  } else u = d;
  return u;
}
function Fy({
  title: e,
  isDisabled: t = !1,
  isClearable: o = !0,
  hasError: r = !1,
  isFullWidth: i = !1,
  width: a,
  options: s = [],
  className: l,
  value: c,
  onChange: d,
  onFocus: u,
  onBlur: p,
}) {
  return /* @__PURE__ */ M(bv, {
    disablePortal: !0,
    disabled: t,
    disableClearable: !o,
    fullWidth: i,
    options: s,
    className: `papi-combo-box ${r ? 'error' : ''} ${l ?? ''}`,
    value: c,
    onChange: d,
    onFocus: u,
    onBlur: p,
    renderInput: (h) =>
      /* @__PURE__ */ M(Xc, {
        ...h,
        error: r,
        fullWidth: i,
        disabled: t,
        label: e,
        style: { width: a },
      }),
  });
}
const Jn = [
    { shortName: 'ERR', fullNames: ['ERROR'], chapters: -1 },
    { shortName: 'GEN', fullNames: ['Genesis'], chapters: 50 },
    { shortName: 'EXO', fullNames: ['Exodus'], chapters: 40 },
    { shortName: 'LEV', fullNames: ['Leviticus'], chapters: 27 },
    { shortName: 'NUM', fullNames: ['Numbers'], chapters: 36 },
    { shortName: 'DEU', fullNames: ['Deuteronomy'], chapters: 34 },
    { shortName: 'JOS', fullNames: ['Joshua'], chapters: 24 },
    { shortName: 'JDG', fullNames: ['Judges'], chapters: 21 },
    { shortName: 'RUT', fullNames: ['Ruth'], chapters: 4 },
    { shortName: '1SA', fullNames: ['1 Samuel'], chapters: 31 },
    { shortName: '2SA', fullNames: ['2 Samuel'], chapters: 24 },
    { shortName: '1KI', fullNames: ['1 Kings'], chapters: 22 },
    { shortName: '2KI', fullNames: ['2 Kings'], chapters: 25 },
    { shortName: '1CH', fullNames: ['1 Chronicles'], chapters: 29 },
    { shortName: '2CH', fullNames: ['2 Chronicles'], chapters: 36 },
    { shortName: 'EZR', fullNames: ['Ezra'], chapters: 10 },
    { shortName: 'NEH', fullNames: ['Nehemiah'], chapters: 13 },
    { shortName: 'EST', fullNames: ['Esther'], chapters: 10 },
    { shortName: 'JOB', fullNames: ['Job'], chapters: 42 },
    { shortName: 'PSA', fullNames: ['Psalm', 'Psalms'], chapters: 150 },
    { shortName: 'PRO', fullNames: ['Proverbs'], chapters: 31 },
    { shortName: 'ECC', fullNames: ['Ecclesiastes'], chapters: 12 },
    { shortName: 'SNG', fullNames: ['Song of Solomon', 'Song of Songs'], chapters: 8 },
    { shortName: 'ISA', fullNames: ['Isaiah'], chapters: 66 },
    { shortName: 'JER', fullNames: ['Jeremiah'], chapters: 52 },
    { shortName: 'LAM', fullNames: ['Lamentations'], chapters: 5 },
    { shortName: 'EZK', fullNames: ['Ezekiel'], chapters: 48 },
    { shortName: 'DAN', fullNames: ['Daniel'], chapters: 12 },
    { shortName: 'HOS', fullNames: ['Hosea'], chapters: 14 },
    { shortName: 'JOL', fullNames: ['Joel'], chapters: 3 },
    { shortName: 'AMO', fullNames: ['Amos'], chapters: 9 },
    { shortName: 'OBA', fullNames: ['Obadiah'], chapters: 1 },
    { shortName: 'JON', fullNames: ['Jonah'], chapters: 4 },
    { shortName: 'MIC', fullNames: ['Micah'], chapters: 7 },
    { shortName: 'NAM', fullNames: ['Nahum'], chapters: 3 },
    { shortName: 'HAB', fullNames: ['Habakkuk'], chapters: 3 },
    { shortName: 'ZEP', fullNames: ['Zephaniah'], chapters: 3 },
    { shortName: 'HAG', fullNames: ['Haggai'], chapters: 2 },
    { shortName: 'ZEC', fullNames: ['Zechariah'], chapters: 14 },
    { shortName: 'MAL', fullNames: ['Malachi'], chapters: 4 },
    { shortName: 'MAT', fullNames: ['Matthew'], chapters: 28 },
    { shortName: 'MRK', fullNames: ['Mark'], chapters: 16 },
    { shortName: 'LUK', fullNames: ['Luke'], chapters: 24 },
    { shortName: 'JHN', fullNames: ['John'], chapters: 21 },
    { shortName: 'ACT', fullNames: ['Acts'], chapters: 28 },
    { shortName: 'ROM', fullNames: ['Romans'], chapters: 16 },
    { shortName: '1CO', fullNames: ['1 Corinthians'], chapters: 16 },
    { shortName: '2CO', fullNames: ['2 Corinthians'], chapters: 13 },
    { shortName: 'GAL', fullNames: ['Galatians'], chapters: 6 },
    { shortName: 'EPH', fullNames: ['Ephesians'], chapters: 6 },
    { shortName: 'PHP', fullNames: ['Philippians'], chapters: 4 },
    { shortName: 'COL', fullNames: ['Colossians'], chapters: 4 },
    { shortName: '1TH', fullNames: ['1 Thessalonians'], chapters: 5 },
    { shortName: '2TH', fullNames: ['2 Thessalonians'], chapters: 3 },
    { shortName: '1TI', fullNames: ['1 Timothy'], chapters: 6 },
    { shortName: '2TI', fullNames: ['2 Timothy'], chapters: 4 },
    { shortName: 'TIT', fullNames: ['Titus'], chapters: 3 },
    { shortName: 'PHM', fullNames: ['Philemon'], chapters: 1 },
    { shortName: 'HEB', fullNames: ['Hebrews'], chapters: 13 },
    { shortName: 'JAS', fullNames: ['James'], chapters: 5 },
    { shortName: '1PE', fullNames: ['1 Peter'], chapters: 5 },
    { shortName: '2PE', fullNames: ['2 Peter'], chapters: 3 },
    { shortName: '1JN', fullNames: ['1 John'], chapters: 5 },
    { shortName: '2JN', fullNames: ['2 John'], chapters: 1 },
    { shortName: '3JN', fullNames: ['3 John'], chapters: 1 },
    { shortName: 'JUD', fullNames: ['Jude'], chapters: 1 },
    { shortName: 'REV', fullNames: ['Revelation'], chapters: 22 },
  ],
  oa = 1,
  Jc = Jn.length - 1,
  Zc = 1,
  Qc = 1,
  zy = (e) => Jn.findIndex((t) => t.fullNames.includes(e)),
  zs = (e) => Jn[e < oa || e > Jc ? 0 : e].fullNames[0],
  Vs = () => {
    const e = [];
    return (
      Jn.slice(1).forEach((t) => {
        const o = t.fullNames[0];
        e.push(o);
      }),
      e
    );
  },
  Vy = (e) => Jn[e].chapters,
  Bs = (e, t) => ({
    book: Math.max(oa, Math.min(e.book + t, Jc)),
    chapter: 1,
    verse: 1,
  }),
  Us = (e, t) => ({
    ...e,
    chapter: Math.min(Math.max(Zc, e.chapter + t), Jn[e.book].chapters),
    verse: 1,
  }),
  Ws = (e, t) => ({
    ...e,
    verse: Math.max(Qc, e.verse + t),
  });
function Hs({
  variant: e = 'outlined',
  isDisabled: t = !1,
  hasError: o = !1,
  isFullWidth: r = !1,
  helperText: i,
  label: a,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: u,
  onChange: p,
  onFocus: h,
  onBlur: y,
}) {
  return /* @__PURE__ */ M(Xc, {
    variant: e,
    disabled: t,
    error: o,
    fullWidth: r,
    helperText: i,
    label: a,
    placeholder: s,
    required: l,
    className: `papi-textfield ${c ?? ''}`,
    defaultValue: d,
    value: u,
    onChange: p,
    onFocus: h,
    onBlur: y,
  });
}
function Hy({ scrRef: e, handleSubmit: t }) {
  const [o, r] = ou(zs(e.book)),
    i = (c) => {
      r(zs(c.book)), t(c);
    },
    a = (c, d) => {
      const p = { book: zy(d), chapter: 1, verse: 1 };
      i(p);
    },
    s = (c) => {
      t({ ...e, chapter: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verse: +c.target.value });
    };
  return /* @__PURE__ */ Ge(su, {
    children: [
      /* @__PURE__ */ M(Fy, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: Vs(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ M(_n, {
        onClick: () => i(Bs(e, -1)),
        isDisabled: e.book <= oa,
        children: '<',
      }),
      /* @__PURE__ */ M(_n, {
        onClick: () => i(Bs(e, 1)),
        isDisabled: e.book >= Vs().length,
        children: '>',
      }),
      /* @__PURE__ */ M(Hs, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapter,
        onChange: s,
      }),
      /* @__PURE__ */ M(_n, {
        onClick: () => t(Us(e, -1)),
        isDisabled: e.chapter <= Zc,
        children: '<',
      }),
      /* @__PURE__ */ M(_n, {
        onClick: () => t(Us(e, 1)),
        isDisabled: e.chapter >= Vy(e.book),
        children: '>',
      }),
      /* @__PURE__ */ M(Hs, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verse,
        onChange: l,
      }),
      /* @__PURE__ */ M(_n, {
        onClick: () => t(Ws(e, -1)),
        isDisabled: e.verse <= Qc,
        children: '<',
      }),
      /* @__PURE__ */ M(_n, { onClick: () => t(Ws(e, 1)), children: '>' }),
    ],
  });
}
function qy({
  isDisabled: e = !1,
  orientation: t = 'horizontal',
  min: o = 0,
  max: r = 100,
  step: i = 1,
  showMarks: a = !1,
  defaultValue: s,
  valueLabelDisplay: l = 'off',
  className: c,
  onChange: d,
  onChangeCommitted: u,
}) {
  return /* @__PURE__ */ M(vy, {
    disabled: e,
    orientation: t,
    min: o,
    max: r,
    step: i,
    marks: a,
    defaultValue: s,
    valueLabelDisplay: l,
    className: `papi-slider ${t} ${c ?? ''}`,
    onChange: d,
    onChangeCommitted: u,
  });
}
function Yy({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return /* @__PURE__ */ M(My, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function Ky({
  autoHideDuration: e = null,
  isOpen: t = !1,
  className: o,
  onClose: r,
  anchorOrigin: i = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: a = {
    action: '',
    message: '',
    className: `papi-snackbar ${o ?? ''}`,
  },
  children: s,
}) {
  return /* @__PURE__ */ M(Ry, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: i,
    ContentProps: a,
    children: s,
  });
}
export {
  _n as Button,
  Wy as Checkbox,
  Fy as ComboBox,
  Dn as LabelPosition,
  Hy as RefSelector,
  qy as Slider,
  Ky as Snackbar,
  Yy as Switch,
  Hs as TextField,
};
//# sourceMappingURL=index.es.js.map
