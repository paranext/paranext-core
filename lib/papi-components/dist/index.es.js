import * as b from 'react';
import Ft, {
  forwardRef as au,
  useContext as su,
  Children as lu,
  isValidElement as Vo,
  cloneElement as zo,
  useState as cu,
} from 'react';
import * as Js from 'react-dom';
import No from 'react-dom';
function uu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var Jr = { exports: {} },
  Qn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa;
function du() {
  if (aa) return Qn;
  aa = 1;
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
  return (Qn.Fragment = o), (Qn.jsx = s), (Qn.jsxs = s), Qn;
}
var eo = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sa;
function pu() {
  return (
    sa ||
      ((sa = 1),
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
          var C = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function T(x) {
            {
              for (var F = arguments.length, le = new Array(F > 1 ? F - 1 : 0), $ = 1; $ < F; $++)
                le[$ - 1] = arguments[$];
              O('error', x, le);
            }
          }
          function O(x, F, le) {
            {
              var $ = C.ReactDebugCurrentFrame,
                k = $.getStackAddendum();
              k !== '' && ((F += '%s'), (le = le.concat([k])));
              var Y = le.map(function (ne) {
                return String(ne);
              });
              Y.unshift('Warning: ' + F), Function.prototype.apply.call(console[x], console, Y);
            }
          }
          var E = !1,
            f = !1,
            S = !1,
            R = !1,
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
              R ||
              x === y ||
              E ||
              f ||
              S ||
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
            var $ = x.displayName;
            if ($) return $;
            var k = F.displayName || F.name || '';
            return k !== '' ? le + '(' + k + ')' : le;
          }
          function J(x) {
            return x.displayName || 'Context';
          }
          function j(x) {
            if (x == null) return null;
            if (
              (typeof x.tag == 'number' &&
                T(
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
                  var $ = x.displayName || null;
                  return $ !== null ? $ : j(x.type) || 'Memo';
                case h: {
                  var k = x,
                    Y = k._payload,
                    ne = k._init;
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
            V,
            w,
            L,
            G;
          function z() {}
          z.__reactDisabledLog = !0;
          function H() {
            {
              if (A === 0) {
                (q = console.log),
                  (ae = console.info),
                  (Q = console.warn),
                  (V = console.error),
                  (w = console.group),
                  (L = console.groupCollapsed),
                  (G = console.groupEnd);
                var x = {
                  configurable: !0,
                  enumerable: !0,
                  value: z,
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
                    value: V,
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
                T('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var re = C.ReactCurrentDispatcher,
            Z;
          function ie(x, F, le) {
            {
              if (Z === void 0)
                try {
                  throw Error();
                } catch (k) {
                  var $ = k.stack.trim().match(/\n( *(at )?)/);
                  Z = ($ && $[1]) || '';
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
            var $;
            ce = !0;
            var k = Error.prepareStackTrace;
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
                    $ = Lt;
                  }
                  Reflect.construct(x, [], ne);
                } else {
                  try {
                    ne.call();
                  } catch (Lt) {
                    $ = Lt;
                  }
                  x.call(ne.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Lt) {
                  $ = Lt;
                }
                x();
              }
            } catch (Lt) {
              if (Lt && $ && typeof Lt.stack == 'string') {
                for (
                  var fe = Lt.stack.split(`
`),
                    be = $.stack.split(`
`),
                    ve = fe.length - 1,
                    Se = be.length - 1;
                  ve >= 1 && Se >= 0 && fe[ve] !== be[Se];

                )
                  Se--;
                for (; ve >= 1 && Se >= 0; ve--, Se--)
                  if (fe[ve] !== be[Se]) {
                    if (ve !== 1 || Se !== 1)
                      do
                        if ((ve--, Se--, Se < 0 || fe[ve] !== be[Se])) {
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
                      while (ve >= 1 && Se >= 0);
                    break;
                  }
              }
            } finally {
              (ce = !1), (re.current = Y), K(), (Error.prepareStackTrace = k);
            }
            var Ve = x ? x.displayName || x.name : '',
              an = Ve ? ie(Ve) : '';
            return typeof x == 'function' && ue.set(x, an), an;
          }
          function Ce(x, F, le) {
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
                  return Ce(x.render);
                case p:
                  return W(x.type, F, le);
                case h: {
                  var $ = x,
                    k = $._payload,
                    Y = $._init;
                  try {
                    return W(Y(k), F, le);
                  } catch {}
                }
              }
            return '';
          }
          var Te = Object.prototype.hasOwnProperty,
            pe = {},
            $e = C.ReactDebugCurrentFrame;
          function je(x) {
            if (x) {
              var F = x._owner,
                le = W(x.type, x._source, F ? F.type : null);
              $e.setExtraStackFrame(le);
            } else $e.setExtraStackFrame(null);
          }
          function Je(x, F, le, $, k) {
            {
              var Y = Function.call.bind(Te);
              for (var ne in x)
                if (Y(x, ne)) {
                  var fe = void 0;
                  try {
                    if (typeof x[ne] != 'function') {
                      var be = Error(
                        ($ || 'React class') +
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
                    fe = x[ne](F, ne, $, le, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (ve) {
                    fe = ve;
                  }
                  fe &&
                    !(fe instanceof Error) &&
                    (je(k),
                    T(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      $ || 'React class',
                      le,
                      ne,
                      typeof fe,
                    ),
                    je(null)),
                    fe instanceof Error &&
                      !(fe.message in pe) &&
                      ((pe[fe.message] = !0),
                      je(k),
                      T('Failed %s type: %s', le, fe.message),
                      je(null));
                }
            }
          }
          var Ge = Array.isArray;
          function Fe(x) {
            return Ge(x);
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
                T(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  Ze(x),
                ),
                te(x)
              );
          }
          var he = C.ReactCurrentOwner,
            xe = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            Pe,
            se,
            we;
          we = {};
          function U(x) {
            if (Te.call(x, 'ref')) {
              var F = Object.getOwnPropertyDescriptor(x, 'ref').get;
              if (F && F.isReactWarning) return !1;
            }
            return x.ref !== void 0;
          }
          function ge(x) {
            if (Te.call(x, 'key')) {
              var F = Object.getOwnPropertyDescriptor(x, 'key').get;
              if (F && F.isReactWarning) return !1;
            }
            return x.key !== void 0;
          }
          function Re(x, F) {
            if (typeof x.ref == 'string' && he.current && F && he.current.stateNode !== F) {
              var le = j(he.current.type);
              we[le] ||
                (T(
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
                Pe ||
                  ((Pe = !0),
                  T(
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
                  T(
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
          var st = function (x, F, le, $, k, Y, ne) {
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
                value: $,
              }),
              Object.defineProperty(fe, '_source', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: k,
              }),
              Object.freeze && (Object.freeze(fe.props), Object.freeze(fe)),
              fe
            );
          };
          function Et(x, F, le, $, k) {
            {
              var Y,
                ne = {},
                fe = null,
                be = null;
              le !== void 0 && (ye(le), (fe = '' + le)),
                ge(F) && (ye(F.key), (fe = '' + F.key)),
                U(F) && ((be = F.ref), Re(F, k));
              for (Y in F) Te.call(F, Y) && !xe.hasOwnProperty(Y) && (ne[Y] = F[Y]);
              if (x && x.defaultProps) {
                var ve = x.defaultProps;
                for (Y in ve) ne[Y] === void 0 && (ne[Y] = ve[Y]);
              }
              if (fe || be) {
                var Se = typeof x == 'function' ? x.displayName || x.name || 'Unknown' : x;
                fe && ft(ne, Se), be && ht(ne, Se);
              }
              return st(x, fe, be, k, $, he.current, ne);
            }
          }
          var xt = C.ReactCurrentOwner,
            Qe = C.ReactDebugCurrentFrame;
          function lt(x) {
            if (x) {
              var F = x._owner,
                le = W(x.type, x._source, F ? F.type : null);
              Qe.setExtraStackFrame(le);
            } else Qe.setExtraStackFrame(null);
          }
          var ut;
          ut = !1;
          function Ht(x) {
            return typeof x == 'object' && x !== null && x.$$typeof === t;
          }
          function qt() {
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
          function on(x) {
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
          function Yt(x) {
            {
              var F = qt();
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
          function Kt(x, F) {
            {
              if (!x._store || x._store.validated || x.key != null) return;
              x._store.validated = !0;
              var le = Yt(F);
              if (Ot[le]) return;
              Ot[le] = !0;
              var $ = '';
              x &&
                x._owner &&
                x._owner !== xt.current &&
                ($ = ' It was passed a child from ' + j(x._owner.type) + '.'),
                lt(x),
                T(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  le,
                  $,
                ),
                lt(null);
            }
          }
          function Ct(x, F) {
            {
              if (typeof x != 'object') return;
              if (Fe(x))
                for (var le = 0; le < x.length; le++) {
                  var $ = x[le];
                  Ht($) && Kt($, F);
                }
              else if (Ht(x)) x._store && (x._store.validated = !0);
              else if (x) {
                var k = v(x);
                if (typeof k == 'function' && k !== x.entries)
                  for (var Y = k.call(x), ne; !(ne = Y.next()).done; )
                    Ht(ne.value) && Kt(ne.value, F);
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
                var $ = j(F);
                Je(le, x.props, 'prop', $, x);
              } else if (F.PropTypes !== void 0 && !ut) {
                ut = !0;
                var k = j(F);
                T(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  k || 'Unknown',
                );
              }
              typeof F.getDefaultProps == 'function' &&
                !F.getDefaultProps.isReactClassApproved &&
                T(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function rn(x) {
            {
              for (var F = Object.keys(x.props), le = 0; le < F.length; le++) {
                var $ = F[le];
                if ($ !== 'children' && $ !== 'key') {
                  lt(x),
                    T(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      $,
                    ),
                    lt(null);
                  break;
                }
              }
              x.ref !== null &&
                (lt(x), T('Invalid attribute `ref` supplied to `React.Fragment`.'), lt(null));
            }
          }
          function Tt(x, F, le, $, k, Y) {
            {
              var ne = N(x);
              if (!ne) {
                var fe = '';
                (x === void 0 ||
                  (typeof x == 'object' && x !== null && Object.keys(x).length === 0)) &&
                  (fe +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var be = on(k);
                be ? (fe += be) : (fe += qt());
                var ve;
                x === null
                  ? (ve = 'null')
                  : Fe(x)
                  ? (ve = 'array')
                  : x !== void 0 && x.$$typeof === t
                  ? ((ve = '<' + (j(x.type) || 'Unknown') + ' />'),
                    (fe = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (ve = typeof x),
                  T(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    ve,
                    fe,
                  );
              }
              var Se = Et(x, F, le, k, Y);
              if (Se == null) return Se;
              if (ne) {
                var Oe = F.children;
                if (Oe !== void 0)
                  if ($)
                    if (Fe(Oe)) {
                      for (var Ve = 0; Ve < Oe.length; Ve++) Ct(Oe[Ve], x);
                      Object.freeze && Object.freeze(Oe);
                    } else
                      T(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else Ct(Oe, x);
              }
              return x === r ? rn(Se) : hn(Se), Se;
            }
          }
          function Dt(x, F, le) {
            return Tt(x, F, le, !0);
          }
          function Gt(x, F, le) {
            return Tt(x, F, le, !1);
          }
          var bn = Gt,
            at = Dt;
          (eo.Fragment = r), (eo.jsx = bn), (eo.jsxs = at);
        })()),
    eo
  );
}
process.env.NODE_ENV === 'production' ? (Jr.exports = du()) : (Jr.exports = pu());
var bi = Jr.exports;
const fu = bi.Fragment,
  M = bi.jsx,
  Xe = bi.jsxs,
  mu = {
    black: '#000',
    white: '#fff',
  },
  vo = mu,
  hu = {
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
  wn = hu,
  bu = {
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
  $n = bu,
  vu = {
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
  kn = vu,
  gu = {
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
  Nn = gu,
  yu = {
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
  Pn = yu,
  Eu = {
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
  to = Eu,
  xu = {
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
  Ou = xu;
function Bt(e, t) {
  return process.env.NODE_ENV === 'production'
    ? () => null
    : function (...r) {
        return e(...r) || t(...r);
      };
}
function _n(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function Zs(e) {
  if (!_n(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = Zs(e[o]);
    }),
    t
  );
}
function Mt(
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
    _n(e) &&
      _n(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (_n(t[i]) && i in e && _n(e[i])
            ? (r[i] = Mt(e[i], t[i], o))
            : o.clone
            ? (r[i] = _n(t[i]) ? Zs(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var Zr = { exports: {} },
  Po = { exports: {} },
  ze = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var la;
function Cu() {
  if (la) return ze;
  la = 1;
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
    C = e ? Symbol.for('react.responder') : 60118,
    T = e ? Symbol.for('react.scope') : 60119;
  function O(f) {
    if (typeof f == 'object' && f !== null) {
      var S = f.$$typeof;
      switch (S) {
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
                  return S;
              }
          }
        case o:
          return S;
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
            f.$$typeof === C ||
            f.$$typeof === T ||
            f.$$typeof === m))
      );
    }),
    (ze.typeOf = O),
    ze
  );
}
var Be = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ca;
function Tu() {
  return (
    ca ||
      ((ca = 1),
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
            C = e ? Symbol.for('react.responder') : 60118,
            T = e ? Symbol.for('react.scope') : 60119;
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
                  P.$$typeof === C ||
                  P.$$typeof === T ||
                  P.$$typeof === m))
            );
          }
          function E(P) {
            if (typeof P == 'object' && P !== null) {
              var Ce = P.$$typeof;
              switch (Ce) {
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
                          return Ce;
                      }
                  }
                case o:
                  return Ce;
              }
            }
          }
          var f = c,
            S = d,
            R = l,
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
          function V(P) {
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
          function z(P) {
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
          (Be.AsyncMode = f),
            (Be.ConcurrentMode = S),
            (Be.ContextConsumer = R),
            (Be.ContextProvider = D),
            (Be.Element = B),
            (Be.ForwardRef = N),
            (Be.Fragment = I),
            (Be.Lazy = J),
            (Be.Memo = j),
            (Be.Portal = _),
            (Be.Profiler = A),
            (Be.StrictMode = q),
            (Be.Suspense = ae),
            (Be.isAsyncMode = V),
            (Be.isConcurrentMode = w),
            (Be.isContextConsumer = L),
            (Be.isContextProvider = G),
            (Be.isElement = z),
            (Be.isForwardRef = H),
            (Be.isFragment = K),
            (Be.isLazy = re),
            (Be.isMemo = Z),
            (Be.isPortal = ie),
            (Be.isProfiler = ce),
            (Be.isStrictMode = ue),
            (Be.isSuspense = me),
            (Be.isValidElementType = O),
            (Be.typeOf = E);
        })()),
    Be
  );
}
var ua;
function Qs() {
  return (
    ua ||
      ((ua = 1), process.env.NODE_ENV === 'production' ? (Po.exports = Cu()) : (Po.exports = Tu())),
    Po.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ar, da;
function Ru() {
  if (da) return Ar;
  da = 1;
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
    (Ar = i()
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
    Ar
  );
}
var Dr, pa;
function gi() {
  if (pa) return Dr;
  pa = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Dr = e), Dr;
}
var Lr, fa;
function el() {
  return fa || ((fa = 1), (Lr = Function.call.bind(Object.prototype.hasOwnProperty))), Lr;
}
var jr, ma;
function Su() {
  if (ma) return jr;
  ma = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = gi(),
      o = {},
      r = el();
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
    (jr = i),
    jr
  );
}
var Fr, ha;
function wu() {
  if (ha) return Fr;
  ha = 1;
  var e = Qs(),
    t = Ru(),
    o = gi(),
    r = el(),
    i = Su(),
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
    (Fr = function (l, c) {
      var d = typeof Symbol == 'function' && Symbol.iterator,
        u = '@@iterator';
      function p(w) {
        var L = w && ((d && w[d]) || w[u]);
        if (typeof L == 'function') return L;
      }
      var h = '<<anonymous>>',
        y = {
          array: C('array'),
          bigint: C('bigint'),
          bool: C('boolean'),
          func: C('function'),
          number: C('number'),
          object: C('object'),
          string: C('string'),
          symbol: C('symbol'),
          any: T(),
          arrayOf: O,
          element: E(),
          elementType: f(),
          instanceOf: S,
          node: N(),
          objectOf: D,
          oneOf: R,
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
        function z(K, re, Z, ie, ce, ue, me) {
          if (((ie = ie || h), (ue = ue || Z), me !== o)) {
            if (c) {
              var P = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((P.name = 'Invariant Violation'), P);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Ce = ie + ':' + Z;
              !L[Ce] && // Avoid spamming the console because they are often not actionable except for lib authors
                G < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    ue +
                    '` prop on `' +
                    ie +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (L[Ce] = !0),
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
        var H = z.bind(null, !1);
        return (H.isRequired = z.bind(null, !0)), H;
      }
      function C(w) {
        function L(G, z, H, K, re, Z) {
          var ie = G[z],
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
      function T() {
        return v(s);
      }
      function O(w) {
        function L(G, z, H, K, re) {
          if (typeof w != 'function')
            return new m(
              'Property `' +
                re +
                '` of component `' +
                H +
                '` has invalid PropType notation inside arrayOf.',
            );
          var Z = G[z];
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
        function w(L, G, z, H, K) {
          var re = L[G];
          if (!l(re)) {
            var Z = q(re);
            return new m(
              'Invalid ' +
                H +
                ' `' +
                K +
                '` of type ' +
                ('`' + Z + '` supplied to `' + z + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return v(w);
      }
      function f() {
        function w(L, G, z, H, K) {
          var re = L[G];
          if (!e.isValidElementType(re)) {
            var Z = q(re);
            return new m(
              'Invalid ' +
                H +
                ' `' +
                K +
                '` of type ' +
                ('`' + Z + '` supplied to `' + z + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return v(w);
      }
      function S(w) {
        function L(G, z, H, K, re) {
          if (!(G[z] instanceof w)) {
            var Z = w.name || h,
              ie = V(G[z]);
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
      function R(w) {
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
        function L(G, z, H, K, re) {
          for (var Z = G[z], ie = 0; ie < w.length; ie++) if (g(Z, w[ie])) return null;
          var ce = JSON.stringify(w, function (me, P) {
            var Ce = ae(P);
            return Ce === 'symbol' ? String(P) : P;
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
        function L(G, z, H, K, re) {
          if (typeof w != 'function')
            return new m(
              'Property `' +
                re +
                '` of component `' +
                H +
                '` has invalid PropType notation inside objectOf.',
            );
          var Z = G[z],
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
        function z(H, K, re, Z, ie) {
          for (var ce = [], ue = 0; ue < w.length; ue++) {
            var me = w[ue],
              P = me(H, K, re, Z, ie, o);
            if (P == null) return null;
            P.data && r(P.data, 'expectedType') && ce.push(P.data.expectedType);
          }
          var Ce = ce.length > 0 ? ', expected one of type [' + ce.join(', ') + ']' : '';
          return new m('Invalid ' + Z + ' `' + ie + '` supplied to ' + ('`' + re + '`' + Ce + '.'));
        }
        return v(z);
      }
      function N() {
        function w(L, G, z, H, K) {
          return _(L[G])
            ? null
            : new m(
                'Invalid ' +
                  H +
                  ' `' +
                  K +
                  '` supplied to ' +
                  ('`' + z + '`, expected a ReactNode.'),
              );
        }
        return v(w);
      }
      function I(w, L, G, z, H) {
        return new m(
          (w || 'React class') +
            ': ' +
            L +
            ' type `' +
            G +
            '.' +
            z +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            H +
            '`.',
        );
      }
      function J(w) {
        function L(G, z, H, K, re) {
          var Z = G[z],
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
        function L(G, z, H, K, re) {
          var Z = G[z],
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
          var ce = t({}, G[z], w);
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
                  JSON.stringify(G[z], null, '  ') +
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
                z;
              if (L !== w.entries) {
                for (; !(z = G.next()).done; ) if (!_(z.value)) return !1;
              } else
                for (; !(z = G.next()).done; ) {
                  var H = z.value;
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
      function V(w) {
        return !w.constructor || !w.constructor.name ? h : w.constructor.name;
      }
      return (
        (y.checkPropTypes = i), (y.resetWarningCache = i.resetWarningCache), (y.PropTypes = y), y
      );
    }),
    Fr
  );
}
var Vr, ba;
function $u() {
  if (ba) return Vr;
  ba = 1;
  var e = gi();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (Vr = function () {
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
    Vr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var ku = Qs(),
    Nu = !0;
  Zr.exports = wu()(ku.isElement, Nu);
} else Zr.exports = $u()();
var Pu = Zr.exports;
const n = /* @__PURE__ */ uu(Pu);
function Iu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function tl(e, t, o, r, i) {
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
      !Iu(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const nl = Bt(n.element, tl);
nl.isRequired = Bt(n.element.isRequired, tl);
const qn = nl;
function Mu(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function _u(e, t, o, r, i) {
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
      !Mu(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const yi = Bt(n.elementType, _u),
  Au = 'exact-prop: ​';
function Ei(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : {
        ...e,
        [Au]: (t) => {
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
var Qr = { exports: {} },
  Ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var va;
function Du() {
  if (va) return Ue;
  va = 1;
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
      var C = v.$$typeof;
      switch (C) {
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
                  return C;
              }
          }
        case t:
          return C;
      }
    }
  }
  return (
    (Ue.ContextConsumer = s),
    (Ue.ContextProvider = a),
    (Ue.Element = e),
    (Ue.ForwardRef = c),
    (Ue.Fragment = o),
    (Ue.Lazy = h),
    (Ue.Memo = p),
    (Ue.Portal = t),
    (Ue.Profiler = i),
    (Ue.StrictMode = r),
    (Ue.Suspense = d),
    (Ue.SuspenseList = u),
    (Ue.isAsyncMode = function () {
      return !1;
    }),
    (Ue.isConcurrentMode = function () {
      return !1;
    }),
    (Ue.isContextConsumer = function (v) {
      return m(v) === s;
    }),
    (Ue.isContextProvider = function (v) {
      return m(v) === a;
    }),
    (Ue.isElement = function (v) {
      return typeof v == 'object' && v !== null && v.$$typeof === e;
    }),
    (Ue.isForwardRef = function (v) {
      return m(v) === c;
    }),
    (Ue.isFragment = function (v) {
      return m(v) === o;
    }),
    (Ue.isLazy = function (v) {
      return m(v) === h;
    }),
    (Ue.isMemo = function (v) {
      return m(v) === p;
    }),
    (Ue.isPortal = function (v) {
      return m(v) === t;
    }),
    (Ue.isProfiler = function (v) {
      return m(v) === i;
    }),
    (Ue.isStrictMode = function (v) {
      return m(v) === r;
    }),
    (Ue.isSuspense = function (v) {
      return m(v) === d;
    }),
    (Ue.isSuspenseList = function (v) {
      return m(v) === u;
    }),
    (Ue.isValidElementType = function (v) {
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
    (Ue.typeOf = m),
    Ue
  );
}
var We = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ga;
function Lu() {
  return (
    ga ||
      ((ga = 1),
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
            C = !1,
            T = !1,
            O;
          O = Symbol.for('react.module.reference');
          function E(X) {
            return !!(
              typeof X == 'string' ||
              typeof X == 'function' ||
              X === o ||
              X === i ||
              T ||
              X === r ||
              X === d ||
              X === u ||
              C ||
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
                  var Te = X.type;
                  switch (Te) {
                    case o:
                    case i:
                    case r:
                    case d:
                    case u:
                      return Te;
                    default:
                      var pe = Te && Te.$$typeof;
                      switch (pe) {
                        case l:
                        case s:
                        case c:
                        case h:
                        case p:
                        case a:
                          return pe;
                        default:
                          return W;
                      }
                  }
                case t:
                  return W;
              }
            }
          }
          var S = s,
            R = a,
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
            V = !1;
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
              V ||
                ((V = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function G(X) {
            return f(X) === s;
          }
          function z(X) {
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
          function Ce(X) {
            return f(X) === u;
          }
          (We.ContextConsumer = S),
            (We.ContextProvider = R),
            (We.Element = D),
            (We.ForwardRef = B),
            (We.Fragment = N),
            (We.Lazy = I),
            (We.Memo = J),
            (We.Portal = j),
            (We.Profiler = _),
            (We.StrictMode = A),
            (We.Suspense = q),
            (We.SuspenseList = ae),
            (We.isAsyncMode = w),
            (We.isConcurrentMode = L),
            (We.isContextConsumer = G),
            (We.isContextProvider = z),
            (We.isElement = H),
            (We.isForwardRef = K),
            (We.isFragment = re),
            (We.isLazy = Z),
            (We.isMemo = ie),
            (We.isPortal = ce),
            (We.isProfiler = ue),
            (We.isStrictMode = me),
            (We.isSuspense = P),
            (We.isSuspenseList = Ce),
            (We.isValidElementType = E),
            (We.typeOf = f);
        })()),
    We
  );
}
process.env.NODE_ENV === 'production' ? (Qr.exports = Du()) : (Qr.exports = Lu());
var go = Qr.exports;
const ju = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Fu(e) {
  const t = `${e}`.match(ju);
  return (t && t[1]) || '';
}
function ol(e, t = '') {
  return e.displayName || e.name || Fu(e) || t;
}
function ya(e, t, o) {
  const r = ol(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function Vu(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return ol(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case go.ForwardRef:
          return ya(e, e.render, 'ForwardRef');
        case go.Memo:
          return ya(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function en(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = e[t],
    s = i || t;
  return a == null
    ? null
    : a && a.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const zu = n.oneOfType([n.func, n.object]),
  yt = zu;
function oe(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : pn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ea(...e) {
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
function rl(e, t = 166) {
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
function Cn(e) {
  return ot(e).defaultView || window;
}
function Yo(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const Bu = typeof window < 'u' ? b.useLayoutEffect : b.useEffect,
  tn = Bu;
let xa = 0;
function Uu(e) {
  const [t, o] = b.useState(e),
    r = e || t;
  return (
    b.useEffect(() => {
      t == null && ((xa += 1), o(`mui-${xa}`));
    }, [t]),
    r
  );
}
const Oa = b['useId'.toString()];
function il(e) {
  if (Oa !== void 0) {
    const t = Oa();
    return e ?? t;
  }
  return Uu(e);
}
function Wu(e, t, o, r, i) {
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
    tn(() => {
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
function rt(...e) {
  return b.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              Yo(o, t);
            });
          },
    e,
  );
}
let sr = !0,
  ei = !1,
  Ca;
const Hu = {
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
function qu(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && Hu[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function Yu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (sr = !0);
}
function Br() {
  sr = !1;
}
function Ku() {
  this.visibilityState === 'hidden' && ei && (sr = !0);
}
function Gu(e) {
  e.addEventListener('keydown', Yu, !0),
    e.addEventListener('mousedown', Br, !0),
    e.addEventListener('pointerdown', Br, !0),
    e.addEventListener('touchstart', Br, !0),
    e.addEventListener('visibilitychange', Ku, !0);
}
function Xu(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return sr || qu(t);
}
function al() {
  const e = b.useCallback((i) => {
      i != null && Gu(i.ownerDocument);
    }, []),
    t = b.useRef(!1);
  function o() {
    return t.current
      ? ((ei = !0),
        window.clearTimeout(Ca),
        (Ca = window.setTimeout(() => {
          ei = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return Xu(i) ? ((t.current = !0), !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: o,
    ref: e,
  };
}
function sl(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Ju = (e) => {
    const t = b.useRef({});
    return (
      b.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  Zu = Ju,
  Qu = {
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
  ed = Qu;
function td(e) {
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
function nd(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const od = Number.isInteger || nd;
function ll(e, t, o, r) {
  const i = e[t];
  if (i == null || !od(i)) {
    const a = td(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function cl(e, t, ...o) {
  return e[t] === void 0 ? null : ll(e, t, ...o);
}
function ti() {
  return null;
}
cl.isRequired = ll;
ti.isRequired = ti;
const xi = process.env.NODE_ENV === 'production' ? ti : cl;
function Oi(e, t) {
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
                o[r][s] = Oi(i[s], a[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function _e(e, t, o = void 0) {
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
const Ta = (e) => e,
  rd = () => {
    let e = Ta;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Ta;
      },
    };
  },
  id = rd(),
  ad = id,
  sd = {
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
function Ie(e, t, o = 'Mui') {
  const r = sd[t];
  return r ? `${o}-${r}` : `${ad.generate(e)}-${t}`;
}
function Ne(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = Ie(e, i, o);
    }),
    r
  );
}
const lr = '$$material';
function Ko() {
  return (
    (Ko = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
          }
          return e;
        }),
    Ko.apply(this, arguments)
  );
}
function ul(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var ld =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  cd = /* @__PURE__ */ ul(
    function (e) {
      return (
        ld.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
      );
    },
    /* Z+1 */
  );
function ud(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function dd(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var pd = /* @__PURE__ */ (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(dd(this));
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
          var s = ud(i);
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
  Go = '-moz-',
  Ae = '-webkit-',
  Ci = 'comm',
  Ti = 'rule',
  Ri = 'decl',
  fd = '@import',
  dl = '@keyframes',
  md = '@layer',
  hd = Math.abs,
  cr = String.fromCharCode,
  bd = Object.assign;
function vd(e, t) {
  return ct(e, 0) ^ 45
    ? (((((((t << 2) ^ ct(e, 0)) << 2) ^ ct(e, 1)) << 2) ^ ct(e, 2)) << 2) ^ ct(e, 3)
    : 0;
}
function pl(e) {
  return e.trim();
}
function gd(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function De(e, t, o) {
  return e.replace(t, o);
}
function ni(e, t) {
  return e.indexOf(t);
}
function ct(e, t) {
  return e.charCodeAt(t) | 0;
}
function yo(e, t, o) {
  return e.slice(t, o);
}
function Jt(e) {
  return e.length;
}
function Si(e) {
  return e.length;
}
function Io(e, t) {
  return t.push(e), e;
}
function yd(e, t) {
  return e.map(t).join('');
}
var ur = 1,
  Fn = 1,
  fl = 0,
  gt = 0,
  it = 0,
  Yn = '';
function dr(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: ur,
    column: Fn,
    length: s,
    return: '',
  };
}
function no(e, t) {
  return bd(dr('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function Ed() {
  return it;
}
function xd() {
  return (it = gt > 0 ? ct(Yn, --gt) : 0), Fn--, it === 10 && ((Fn = 1), ur--), it;
}
function $t() {
  return (it = gt < fl ? ct(Yn, gt++) : 0), Fn++, it === 10 && ((Fn = 1), ur++), it;
}
function Qt() {
  return ct(Yn, gt);
}
function Bo() {
  return gt;
}
function To(e, t) {
  return yo(Yn, e, t);
}
function Eo(e) {
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
function ml(e) {
  return (ur = Fn = 1), (fl = Jt((Yn = e))), (gt = 0), [];
}
function hl(e) {
  return (Yn = ''), e;
}
function Uo(e) {
  return pl(To(gt - 1, oi(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Od(e) {
  for (; (it = Qt()) && it < 33; ) $t();
  return Eo(e) > 2 || Eo(it) > 3 ? '' : ' ';
}
function Cd(e, t) {
  for (; --t && $t() && !(it < 48 || it > 102 || (it > 57 && it < 65) || (it > 70 && it < 97)); );
  return To(e, Bo() + (t < 6 && Qt() == 32 && $t() == 32));
}
function oi(e) {
  for (; $t(); )
    switch (it) {
      case e:
        return gt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && oi(it);
        break;
      case 40:
        e === 41 && oi(e);
        break;
      case 92:
        $t();
        break;
    }
  return gt;
}
function Td(e, t) {
  for (; $t() && e + it !== 47 + 10; ) if (e + it === 42 + 42 && Qt() === 47) break;
  return '/*' + To(t, gt - 1) + '*' + cr(e === 47 ? e : $t());
}
function Rd(e) {
  for (; !Eo(Qt()); ) $t();
  return To(e, gt);
}
function Sd(e) {
  return hl(Wo('', null, null, null, [''], (e = ml(e)), 0, [0], e));
}
function Wo(e, t, o, r, i, a, s, l, c) {
  for (
    var d = 0,
      u = 0,
      p = s,
      h = 0,
      y = 0,
      g = 0,
      m = 1,
      v = 1,
      C = 1,
      T = 0,
      O = '',
      E = i,
      f = a,
      S = r,
      R = O;
    v;

  )
    switch (((g = T), (T = $t()))) {
      case 40:
        if (g != 108 && ct(R, p - 1) == 58) {
          ni((R += De(Uo(T), '&', '&\f')), '&\f') != -1 && (C = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        R += Uo(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        R += Od(g);
        break;
      case 92:
        R += Cd(Bo() - 1, 7);
        continue;
      case 47:
        switch (Qt()) {
          case 42:
          case 47:
            Io(wd(Td($t(), Bo()), t, o), c);
            break;
          default:
            R += '/';
        }
        break;
      case 123 * m:
        l[d++] = Jt(R) * C;
      case 125 * m:
      case 59:
      case 0:
        switch (T) {
          case 0:
          case 125:
            v = 0;
          case 59 + u:
            C == -1 && (R = De(R, /\f/g, '')),
              y > 0 &&
                Jt(R) - p &&
                Io(y > 32 ? Sa(R + ';', r, o, p - 1) : Sa(De(R, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            R += ';';
          default:
            if ((Io((S = Ra(R, t, o, d, u, i, l, O, (E = []), (f = []), p)), a), T === 123))
              if (u === 0) Wo(R, t, S, S, E, a, p, l, f);
              else
                switch (h === 99 && ct(R, 3) === 110 ? 100 : h) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Wo(
                      e,
                      S,
                      S,
                      r && Io(Ra(e, S, S, 0, 0, i, l, O, i, (E = []), p), f),
                      i,
                      f,
                      p,
                      l,
                      r ? E : f,
                    );
                    break;
                  default:
                    Wo(R, S, S, S, [''], f, 0, l, f);
                }
        }
        (d = u = y = 0), (m = C = 1), (O = R = ''), (p = s);
        break;
      case 58:
        (p = 1 + Jt(R)), (y = g);
      default:
        if (m < 1) {
          if (T == 123) --m;
          else if (T == 125 && m++ == 0 && xd() == 125) continue;
        }
        switch (((R += cr(T)), T * m)) {
          case 38:
            C = u > 0 ? 1 : ((R += '\f'), -1);
            break;
          case 44:
            (l[d++] = (Jt(R) - 1) * C), (C = 1);
            break;
          case 64:
            Qt() === 45 && (R += Uo($t())), (h = Qt()), (u = p = Jt((O = R += Rd(Bo())))), T++;
            break;
          case 45:
            g === 45 && Jt(R) == 2 && (m = 0);
        }
    }
  return a;
}
function Ra(e, t, o, r, i, a, s, l, c, d, u) {
  for (var p = i - 1, h = i === 0 ? a : [''], y = Si(h), g = 0, m = 0, v = 0; g < r; ++g)
    for (var C = 0, T = yo(e, p + 1, (p = hd((m = s[g])))), O = e; C < y; ++C)
      (O = pl(m > 0 ? h[C] + ' ' + T : De(T, /&\f/g, h[C]))) && (c[v++] = O);
  return dr(e, t, o, i === 0 ? Ti : l, c, d, u);
}
function wd(e, t, o) {
  return dr(e, t, o, Ci, cr(Ed()), yo(e, 2, -2), 0);
}
function Sa(e, t, o, r) {
  return dr(e, t, o, Ri, yo(e, 0, r), yo(e, r + 1, -1), r);
}
function Ln(e, t) {
  for (var o = '', r = Si(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function $d(e, t, o, r) {
  switch (e.type) {
    case md:
      if (e.children.length) break;
    case fd:
    case Ri:
      return (e.return = e.return || e.value);
    case Ci:
      return '';
    case dl:
      return (e.return = e.value + '{' + Ln(e.children, r) + '}');
    case Ti:
      e.value = e.props.join(',');
  }
  return Jt((o = Ln(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function kd(e) {
  var t = Si(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function Nd(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var Pd = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = Qt()), i === 38 && a === 12 && (o[r] = 1), !Eo(a); ) $t();
    return To(t, gt);
  },
  Id = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (Eo(i)) {
        case 0:
          i === 38 && Qt() === 12 && (o[r] = 1), (t[r] += Pd(gt - 1, o, r));
          break;
        case 2:
          t[r] += Uo(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = Qt() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += cr(i);
      }
    while ((i = $t()));
    return t;
  },
  Md = function (t, o) {
    return hl(Id(ml(t), o));
  },
  wa = /* @__PURE__ */ new WeakMap(),
  _d = function (t) {
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
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !wa.get(r)) && !i) {
        wa.set(t, !0);
        for (var a = [], s = Md(o, a), l = r.props, c = 0, d = 0; c < s.length; c++)
          for (var u = 0; u < l.length; u++, d++)
            t.props[d] = a[c] ? s[c].replace(/&\f/g, l[u]) : l[u] + ' ' + s[c];
      }
    }
  },
  Ad = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      // charcode for l
      o.charCodeAt(0) === 108 && // charcode for b
        o.charCodeAt(2) === 98 &&
        ((t.return = ''), (t.value = ''));
    }
  },
  Dd =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  Ld = function (t) {
    return t.type === 'comm' && t.children.indexOf(Dd) > -1;
  },
  jd = function (t) {
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
              if (Ld(d)) return;
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
  bl = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  Fd = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!bl(o[r])) return !0;
    return !1;
  },
  $a = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  Vd = function (t, o, r) {
    bl(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          $a(t))
        : Fd(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          $a(t)));
  };
function vl(e, t) {
  switch (vd(e, t)) {
    case 5103:
      return Ae + 'print-' + e + e;
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
      return Ae + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Ae + e + Go + e + dt + e + e;
    case 6828:
    case 4268:
      return Ae + e + dt + e + e;
    case 6165:
      return Ae + e + dt + 'flex-' + e + e;
    case 5187:
      return Ae + e + De(e, /(\w+).+(:[^]+)/, Ae + 'box-$1$2' + dt + 'flex-$1$2') + e;
    case 5443:
      return Ae + e + dt + 'flex-item-' + De(e, /flex-|-self/, '') + e;
    case 4675:
      return Ae + e + dt + 'flex-line-pack' + De(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return Ae + e + dt + De(e, 'shrink', 'negative') + e;
    case 5292:
      return Ae + e + dt + De(e, 'basis', 'preferred-size') + e;
    case 6060:
      return Ae + 'box-' + De(e, '-grow', '') + Ae + e + dt + De(e, 'grow', 'positive') + e;
    case 4554:
      return Ae + De(e, /([^-])(transform)/g, '$1' + Ae + '$2') + e;
    case 6187:
      return De(De(De(e, /(zoom-|grab)/, Ae + '$1'), /(image-set)/, Ae + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return De(e, /(image-set\([^]*)/, Ae + '$1$`$1');
    case 4968:
      return (
        De(
          De(e, /(.+:)(flex-)?(.*)/, Ae + 'box-pack:$3' + dt + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify',
        ) +
        Ae +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return De(e, /(.+)-inline(.+)/, Ae + '$1$2') + e;
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
      if (Jt(e) - 1 - t > 6)
        switch (ct(e, t + 1)) {
          case 109:
            if (ct(e, t + 4) !== 45) break;
          case 102:
            return (
              De(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + Ae + '$2-$3$1' + Go + (ct(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~ni(e, 'stretch') ? vl(De(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (ct(e, t + 1) !== 115) break;
    case 6444:
      switch (ct(e, Jt(e) - 3 - (~ni(e, '!important') && 10))) {
        case 107:
          return De(e, ':', ':' + Ae) + e;
        case 101:
          return (
            De(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                Ae +
                (ct(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                Ae +
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
          return Ae + e + dt + De(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return Ae + e + dt + De(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return Ae + e + dt + De(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return Ae + e + dt + e + e;
  }
  return e;
}
var zd = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Ri:
          t.return = vl(t.value, t.length);
          break;
        case dl:
          return Ln(
            [
              no(t, {
                value: De(t.value, '@', '@' + Ae),
              }),
            ],
            i,
          );
        case Ti:
          if (t.length)
            return yd(t.props, function (a) {
              switch (gd(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Ln(
                    [
                      no(t, {
                        props: [De(a, /:(read-\w+)/, ':' + Go + '$1')],
                      }),
                    ],
                    i,
                  );
                case '::placeholder':
                  return Ln(
                    [
                      no(t, {
                        props: [De(a, /:(plac\w+)/, ':' + Ae + 'input-$1')],
                      }),
                      no(t, {
                        props: [De(a, /:(plac\w+)/, ':' + Go + '$1')],
                      }),
                      no(t, {
                        props: [De(a, /:(plac\w+)/, dt + 'input-$1')],
                      }),
                    ],
                    i,
                  );
              }
              return '';
            });
      }
  },
  Bd = [zd],
  Ud = function (t) {
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
    var i = t.stylisPlugins || Bd;
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
          for (var v = m.getAttribute('data-emotion').split(' '), C = 1; C < v.length; C++)
            a[v[C]] = !0;
          l.push(m);
        },
      );
    var c,
      d = [_d, Ad];
    process.env.NODE_ENV !== 'production' &&
      d.push(
        jd({
          get compat() {
            return g.compat;
          },
        }),
        Vd,
      );
    {
      var u,
        p = [
          $d,
          process.env.NODE_ENV !== 'production'
            ? function (m) {
                m.root ||
                  (m.return
                    ? u.insert(m.return)
                    : m.value && m.type !== Ci && u.insert(m.value + '{}'));
              }
            : Nd(function (m) {
                u.insert(m);
              }),
        ],
        h = kd(d.concat(i, p)),
        y = function (v) {
          return Ln(Sd(v), h);
        };
      c = function (v, C, T, O) {
        (u = T),
          process.env.NODE_ENV !== 'production' &&
            C.map !== void 0 &&
            (u = {
              insert: function (f) {
                T.insert(f + C.map);
              },
            }),
          y(v ? v + '{' + C.styles + '}' : C.styles),
          O && (g.inserted[C.name] = !0);
      };
    }
    var g = {
      key: o,
      sheet: new pd({
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
  ri = { exports: {} },
  He = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ka;
function Wd() {
  if (ka) return He;
  ka = 1;
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
    C = e ? Symbol.for('react.responder') : 60118,
    T = e ? Symbol.for('react.scope') : 60119;
  function O(f) {
    if (typeof f == 'object' && f !== null) {
      var S = f.$$typeof;
      switch (S) {
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
                  return S;
              }
          }
        case o:
          return S;
      }
    }
  }
  function E(f) {
    return O(f) === d;
  }
  return (
    (He.AsyncMode = c),
    (He.ConcurrentMode = d),
    (He.ContextConsumer = l),
    (He.ContextProvider = s),
    (He.Element = t),
    (He.ForwardRef = u),
    (He.Fragment = r),
    (He.Lazy = g),
    (He.Memo = y),
    (He.Portal = o),
    (He.Profiler = a),
    (He.StrictMode = i),
    (He.Suspense = p),
    (He.isAsyncMode = function (f) {
      return E(f) || O(f) === c;
    }),
    (He.isConcurrentMode = E),
    (He.isContextConsumer = function (f) {
      return O(f) === l;
    }),
    (He.isContextProvider = function (f) {
      return O(f) === s;
    }),
    (He.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (He.isForwardRef = function (f) {
      return O(f) === u;
    }),
    (He.isFragment = function (f) {
      return O(f) === r;
    }),
    (He.isLazy = function (f) {
      return O(f) === g;
    }),
    (He.isMemo = function (f) {
      return O(f) === y;
    }),
    (He.isPortal = function (f) {
      return O(f) === o;
    }),
    (He.isProfiler = function (f) {
      return O(f) === a;
    }),
    (He.isStrictMode = function (f) {
      return O(f) === i;
    }),
    (He.isSuspense = function (f) {
      return O(f) === p;
    }),
    (He.isValidElementType = function (f) {
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
            f.$$typeof === C ||
            f.$$typeof === T ||
            f.$$typeof === m))
      );
    }),
    (He.typeOf = O),
    He
  );
}
var qe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Na;
function Hd() {
  return (
    Na ||
      ((Na = 1),
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
            C = e ? Symbol.for('react.responder') : 60118,
            T = e ? Symbol.for('react.scope') : 60119;
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
                  P.$$typeof === C ||
                  P.$$typeof === T ||
                  P.$$typeof === m))
            );
          }
          function E(P) {
            if (typeof P == 'object' && P !== null) {
              var Ce = P.$$typeof;
              switch (Ce) {
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
                          return Ce;
                      }
                  }
                case o:
                  return Ce;
              }
            }
          }
          var f = c,
            S = d,
            R = l,
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
          function V(P) {
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
          function z(P) {
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
          (qe.AsyncMode = f),
            (qe.ConcurrentMode = S),
            (qe.ContextConsumer = R),
            (qe.ContextProvider = D),
            (qe.Element = B),
            (qe.ForwardRef = N),
            (qe.Fragment = I),
            (qe.Lazy = J),
            (qe.Memo = j),
            (qe.Portal = _),
            (qe.Profiler = A),
            (qe.StrictMode = q),
            (qe.Suspense = ae),
            (qe.isAsyncMode = V),
            (qe.isConcurrentMode = w),
            (qe.isContextConsumer = L),
            (qe.isContextProvider = G),
            (qe.isElement = z),
            (qe.isForwardRef = H),
            (qe.isFragment = K),
            (qe.isLazy = re),
            (qe.isMemo = Z),
            (qe.isPortal = ie),
            (qe.isProfiler = ce),
            (qe.isStrictMode = ue),
            (qe.isSuspense = me),
            (qe.isValidElementType = O),
            (qe.typeOf = E);
        })()),
    qe
  );
}
process.env.NODE_ENV === 'production' ? (ri.exports = Wd()) : (ri.exports = Hd());
var qd = ri.exports,
  gl = qd,
  Yd = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  Kd = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  yl = {};
yl[gl.ForwardRef] = Yd;
yl[gl.Memo] = Kd;
var Gd = !0;
function wi(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ';') : (r += i + ' ');
    }),
    r
  );
}
var pr = function (t, o, r) {
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
      Gd === !1) &&
      t.registered[i] === void 0 &&
      (t.registered[i] = o.styles);
  },
  fr = function (t, o, r) {
    pr(t, o, r);
    var i = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var a = o;
      do t.insert(o === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function Xd(e) {
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
var Jd = {
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
  Pa = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Zd =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  Qd = /[A-Z]|^ms/g,
  El = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  $i = function (t) {
    return t.charCodeAt(1) === 45;
  },
  Ia = function (t) {
    return t != null && typeof t != 'boolean';
  },
  Ur = /* @__PURE__ */ ul(function (e) {
    return $i(e) ? e : e.replace(Qd, '-$&').toLowerCase();
  }),
  Xo = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(El, function (r, i, a) {
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
    return Jd[t] !== 1 && !$i(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var ep =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    tp = ['normal', 'none', 'initial', 'inherit', 'unset'],
    np = Xo,
    op = /^-ms-/,
    rp = /-(.)/g,
    Ma = {};
  Xo = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (tp.indexOf(o) === -1 &&
          !ep.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = np(t, o);
    return (
      r !== '' &&
        !$i(t) &&
        t.indexOf('-') !== -1 &&
        Ma[t] === void 0 &&
        ((Ma[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(op, 'ms-').replace(rp, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var xl =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function xo(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(xl);
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
      return ip(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = jt,
          s = o(e);
        return (jt = a), xo(e, t, s);
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
          c = o.replace(El, function (u, p, h) {
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
function ip(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += xo(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : Ia(s) && (r += Ur(a) + ':' + Xo(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(xl);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) Ia(s[l]) && (r += Ur(a) + ':' + Xo(a, s[l]) + ';');
        else {
          var c = xo(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += Ur(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(Zd),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var _a = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  Ol;
process.env.NODE_ENV !== 'production' &&
  (Ol = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var jt,
  Vn = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    jt = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += xo(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(Pa),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += xo(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(Pa),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace(Ol, function (h) {
        return (c = h), '';
      })),
      (_a.lastIndex = 0);
    for (var d = '', u; (u = _a.exec(a)) !== null; )
      d +=
        '-' + // $FlowFixMe we know it's not null
        u[1];
    var p = Xd(a) + d;
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
  ap = function (t) {
    return t();
  },
  Cl = b['useInsertionEffect'] ? b['useInsertionEffect'] : !1,
  ki = Cl || ap,
  Aa = Cl || b.useLayoutEffect,
  sp = {}.hasOwnProperty,
  Ni = /* @__PURE__ */ b.createContext(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement < 'u'
      ? /* @__PURE__ */ Ud({
          key: 'css',
        })
      : null,
  );
process.env.NODE_ENV !== 'production' && (Ni.displayName = 'EmotionCacheContext');
Ni.Provider;
var mr = function (t) {
    return /* @__PURE__ */ au(function (o, r) {
      var i = su(Ni);
      return t(o, i, r);
    });
  },
  Kn = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (Kn.displayName = 'EmotionThemeContext');
var Da = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  La = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  lp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      pr(o, r, i),
      ki(function () {
        return fr(o, r, i);
      }),
      null
    );
  },
  cp = /* @__PURE__ */ mr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[Da],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = wi(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = Vn(a, void 0, b.useContext(Kn));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[La];
      c && (l = Vn([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var d = {};
    for (var u in e)
      sp.call(e, u) &&
        u !== 'css' &&
        u !== Da &&
        (process.env.NODE_ENV === 'production' || u !== La) &&
        (d[u] = e[u]);
    return (
      (d.ref = o),
      (d.className = s),
      /* @__PURE__ */ b.createElement(
        b.Fragment,
        null,
        /* @__PURE__ */ b.createElement(lp, {
          cache: t,
          serialized: l,
          isStringTag: typeof i == 'string',
        }),
        /* @__PURE__ */ b.createElement(i, d),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (cp.displayName = 'EmotionCssPropInternal');
var up = {
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
  ja = !1,
  Tl = /* @__PURE__ */ mr(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !ja && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (ja = !0));
    var o = e.styles,
      r = Vn([o], void 0, b.useContext(Kn)),
      i = b.useRef();
    return (
      Aa(
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
      Aa(
        function () {
          var a = i.current,
            s = a[0],
            l = a[1];
          if (l) {
            a[1] = !1;
            return;
          }
          if ((r.next !== void 0 && fr(t, r.next, !0), s.tags.length)) {
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
process.env.NODE_ENV !== 'production' && (Tl.displayName = 'EmotionGlobal');
function dp() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return Vn(t);
}
var Pi = function () {
    var t = dp.apply(void 0, arguments),
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
  pp = function e(t) {
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
function fp(e, t, o) {
  var r = [],
    i = wi(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var mp = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      ki(function () {
        for (var i = 0; i < r.length; i++) fr(o, r[i], !1);
      }),
      null
    );
  },
  hp = /* @__PURE__ */ mr(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++) u[p] = arguments[p];
        var h = Vn(u, t.registered);
        return r.push(h), pr(t, h, !1), t.key + '-' + h.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++) u[p] = arguments[p];
        return fp(t.registered, i, pp(u));
      },
      s = {
        css: i,
        cx: a,
        theme: b.useContext(Kn),
      },
      l = e.children(s);
    return (
      (o = !0),
      /* @__PURE__ */ b.createElement(
        b.Fragment,
        null,
        /* @__PURE__ */ b.createElement(mp, {
          cache: t,
          serializedArr: r,
        }),
        l,
      )
    );
  });
process.env.NODE_ENV !== 'production' && (hp.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var Fa = !0,
    bp = typeof jest < 'u' || typeof vi < 'u';
  if (Fa && !bp) {
    var Va =
        // $FlowIgnore
        typeof globalThis < 'u' ? globalThis : Fa ? window : global,
      za = '__EMOTION_REACT_' + up.version.split('.')[0] + '__';
    Va[za] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (Va[za] = !0);
  }
}
var vp = cd,
  gp = function (t) {
    return t !== 'theme';
  },
  Ba = function (t) {
    return typeof t == 'string' && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      t.charCodeAt(0) > 96
      ? vp
      : gp;
  },
  Ua = function (t, o, r) {
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
  Wa = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  yp = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      pr(o, r, i),
      ki(function () {
        return fr(o, r, i);
      }),
      null
    );
  },
  Ep = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      i = (r && t.__emotion_base) || t,
      a,
      s;
    o !== void 0 && ((a = o.label), (s = o.target));
    var l = Ua(t, o, r),
      c = l || Ba(i),
      d = !c('as');
    return function () {
      var u = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && p.push('label:' + a + ';'), u[0] == null || u[0].raw === void 0))
        p.push.apply(p, u);
      else {
        process.env.NODE_ENV !== 'production' && u[0][0] === void 0 && console.error(Wa),
          p.push(u[0][0]);
        for (var h = u.length, y = 1; y < h; y++)
          process.env.NODE_ENV !== 'production' && u[0][y] === void 0 && console.error(Wa),
            p.push(u[y], u[0][y]);
      }
      var g = mr(function (m, v, C) {
        var T = (d && m.as) || i,
          O = '',
          E = [],
          f = m;
        if (m.theme == null) {
          f = {};
          for (var S in m) f[S] = m[S];
          f.theme = b.useContext(Kn);
        }
        typeof m.className == 'string'
          ? (O = wi(v.registered, E, m.className))
          : m.className != null && (O = m.className + ' ');
        var R = Vn(p.concat(E), v.registered, f);
        (O += v.key + '-' + R.name), s !== void 0 && (O += ' ' + s);
        var D = d && l === void 0 ? Ba(T) : c,
          B = {};
        for (var N in m)
          (d && N === 'as') || // $FlowFixMe
            (D(N) && (B[N] = m[N]));
        return (
          (B.className = O),
          (B.ref = C),
          /* @__PURE__ */ b.createElement(
            b.Fragment,
            null,
            /* @__PURE__ */ b.createElement(yp, {
              cache: v,
              serialized: R,
              isStringTag: typeof T == 'string',
            }),
            /* @__PURE__ */ b.createElement(T, B),
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
            Ko({}, o, v, {
              shouldForwardProp: Ua(g, v, !0),
            }),
          ).apply(void 0, p);
        }),
        g
      );
    };
  },
  xp = [
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
  ii = Ep.bind();
xp.forEach(function (e) {
  ii[e] = ii(e);
});
function Op(e) {
  return e == null || Object.keys(e).length === 0;
}
function Rl(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return /* @__PURE__ */ M(Tl, {
    styles: typeof t == 'function' ? (i) => t(Op(i) ? o : i) : t,
  });
}
process.env.NODE_ENV !== 'production' &&
  (Rl.propTypes = {
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
function Cp(e, t) {
  const o = ii(e, t);
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
const Tp = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Rp = (e) => {
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
function Sp(e) {
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
    a = Rp(t),
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
const wp = {
    borderRadius: 4,
  },
  $p = wp,
  kp =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  fn = kp;
function uo(e, t) {
  return t
    ? Mt(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const Ii = {
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
  Ha = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${Ii[e]}px)`,
  };
function sn(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || Ha;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || Ha;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || Ii).indexOf(l) !== -1) {
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
function Np(e = {}) {
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
function Pp(e, t) {
  return e.reduce((o, r) => {
    const i = o[r];
    return (!i || Object.keys(i).length === 0) && delete o[r], o;
  }, t);
}
function hr(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((i, a) => (i && i[a] ? i[a] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, i) => (r && r[i] != null ? r[i] : null), e);
}
function Jo(e, t, o, r = o) {
  let i;
  return (
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = hr(e, o) || r),
    t && (i = t(i, r, e)),
    i
  );
}
function Ke(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: i } = e,
    a = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        d = hr(c, r) || {};
      return sn(s, l, (p) => {
        let h = Jo(d, i, p);
        return (
          p === h &&
            typeof p == 'string' &&
            (h = Jo(d, i, `${t}${p === 'default' ? '' : oe(p)}`, p)),
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
function Ip(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const Mp = {
    m: 'margin',
    p: 'padding',
  },
  _p = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  qa = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  Ap = Ip((e) => {
    if (e.length > 2)
      if (qa[e]) e = qa[e];
      else return [e];
    const [t, o] = e.split(''),
      r = Mp[t],
      i = _p[o] || '';
    return Array.isArray(i) ? i.map((a) => r + a) : [r + i];
  }),
  br = [
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
  vr = [
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
  Dp = [...br, ...vr];
function Ro(e, t, o, r) {
  var i;
  const a = (i = hr(e, t, !1)) != null ? i : o;
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
function Sl(e) {
  return Ro(e, 'spacing', 8, 'spacing');
}
function So(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function Lp(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = So(t, o)), r), {});
}
function jp(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = Ap(o),
    a = Lp(i, r),
    s = e[o];
  return sn(e, s, a);
}
function wl(e, t) {
  const o = Sl(e.theme);
  return Object.keys(e)
    .map((r) => jp(e, t, r, o))
    .reduce(uo, {});
}
function tt(e) {
  return wl(e, br);
}
tt.propTypes =
  process.env.NODE_ENV !== 'production' ? br.reduce((e, t) => ((e[t] = fn), e), {}) : {};
tt.filterProps = br;
function nt(e) {
  return wl(e, vr);
}
nt.propTypes =
  process.env.NODE_ENV !== 'production' ? vr.reduce((e, t) => ((e[t] = fn), e), {}) : {};
nt.filterProps = vr;
process.env.NODE_ENV !== 'production' && Dp.reduce((e, t) => ((e[t] = fn), e), {});
function Fp(e = 8) {
  if (e.mui) return e;
  const t = Sl({
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
function gr(...e) {
  const t = e.reduce(
      (r, i) => (
        i.filterProps.forEach((a) => {
          r[a] = i;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((i, a) => (t[a] ? uo(i, t[a](r)) : i), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, i) => Object.assign(r, i.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, i) => r.concat(i.filterProps), [])),
    o
  );
}
function Zt(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Vp = Ke({
    prop: 'border',
    themeKey: 'borders',
    transform: Zt,
  }),
  zp = Ke({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: Zt,
  }),
  Bp = Ke({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: Zt,
  }),
  Up = Ke({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: Zt,
  }),
  Wp = Ke({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: Zt,
  }),
  Hp = Ke({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  qp = Ke({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  Yp = Ke({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  Kp = Ke({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  Gp = Ke({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  yr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Ro(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({
          borderRadius: So(t, r),
        });
      return sn(e, e.borderRadius, o);
    }
    return null;
  };
yr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: fn,
      }
    : {};
yr.filterProps = ['borderRadius'];
gr(Vp, zp, Bp, Up, Wp, Hp, qp, Yp, Kp, Gp, yr);
const Er = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Ro(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({
        gap: So(t, r),
      });
    return sn(e, e.gap, o);
  }
  return null;
};
Er.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: fn,
      }
    : {};
Er.filterProps = ['gap'];
const xr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Ro(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({
        columnGap: So(t, r),
      });
    return sn(e, e.columnGap, o);
  }
  return null;
};
xr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: fn,
      }
    : {};
xr.filterProps = ['columnGap'];
const Or = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Ro(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({
        rowGap: So(t, r),
      });
    return sn(e, e.rowGap, o);
  }
  return null;
};
Or.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: fn,
      }
    : {};
Or.filterProps = ['rowGap'];
const Xp = Ke({
    prop: 'gridColumn',
  }),
  Jp = Ke({
    prop: 'gridRow',
  }),
  Zp = Ke({
    prop: 'gridAutoFlow',
  }),
  Qp = Ke({
    prop: 'gridAutoColumns',
  }),
  ef = Ke({
    prop: 'gridAutoRows',
  }),
  tf = Ke({
    prop: 'gridTemplateColumns',
  }),
  nf = Ke({
    prop: 'gridTemplateRows',
  }),
  of = Ke({
    prop: 'gridTemplateAreas',
  }),
  rf = Ke({
    prop: 'gridArea',
  });
gr(Er, xr, Or, Xp, Jp, Zp, Qp, ef, tf, nf, of, rf);
function jn(e, t) {
  return t === 'grey' ? t : e;
}
const af = Ke({
    prop: 'color',
    themeKey: 'palette',
    transform: jn,
  }),
  sf = Ke({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: jn,
  }),
  lf = Ke({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: jn,
  });
gr(af, sf, lf);
function wt(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const cf = Ke({
    prop: 'width',
    transform: wt,
  }),
  Mi = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            Ii[o] ||
            wt(o),
        };
      };
      return sn(e, e.maxWidth, t);
    }
    return null;
  };
Mi.filterProps = ['maxWidth'];
const uf = Ke({
    prop: 'minWidth',
    transform: wt,
  }),
  df = Ke({
    prop: 'height',
    transform: wt,
  }),
  pf = Ke({
    prop: 'maxHeight',
    transform: wt,
  }),
  ff = Ke({
    prop: 'minHeight',
    transform: wt,
  });
Ke({
  prop: 'size',
  cssProperty: 'width',
  transform: wt,
});
Ke({
  prop: 'size',
  cssProperty: 'height',
  transform: wt,
});
const mf = Ke({
  prop: 'boxSizing',
});
gr(cf, Mi, uf, df, pf, ff, mf);
const hf = {
    // borders
    border: {
      themeKey: 'borders',
      transform: Zt,
    },
    borderTop: {
      themeKey: 'borders',
      transform: Zt,
    },
    borderRight: {
      themeKey: 'borders',
      transform: Zt,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: Zt,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: Zt,
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
      style: yr,
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
      style: Er,
    },
    rowGap: {
      style: Or,
    },
    columnGap: {
      style: xr,
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
      style: Mi,
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
  _i = hf;
function bf(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function vf(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function gf() {
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
    const h = hr(i, d) || {};
    return p
      ? p(s)
      : sn(s, r, (g) => {
          let m = Jo(h, u, g);
          return (
            g === m &&
              typeof g == 'string' &&
              (m = Jo(h, u, `${o}${g === 'default' ? '' : oe(g)}`, g)),
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
    const s = (r = a.unstable_sxConfig) != null ? r : _i;
    function l(c) {
      let d = c;
      if (typeof c == 'function') d = c(a);
      else if (typeof c != 'object') return c;
      if (!d) return null;
      const u = Np(a.breakpoints),
        p = Object.keys(u);
      let h = u;
      return (
        Object.keys(d).forEach((y) => {
          const g = vf(d[y], a);
          if (g != null)
            if (typeof g == 'object')
              if (s[y]) h = uo(h, e(y, g, a, s));
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
                bf(m, g)
                  ? (h[y] = t({
                      sx: g,
                      theme: a,
                    }))
                  : (h = uo(h, m));
              }
            else h = uo(h, e(y, g, a, s));
        }),
        Pp(p, h)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const $l = gf();
$l.filterProps = ['sx'];
const Ai = $l;
function Di(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {}, ...s } = e,
    l = Sp(o),
    c = Fp(i);
  let d = Mt(
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
        ...$p,
        ...a,
      },
    },
    s,
  );
  return (
    (d = t.reduce((u, p) => Mt(u, p), d)),
    (d.unstable_sxConfig = {
      ..._i,
      ...(s == null ? void 0 : s.unstable_sxConfig),
    }),
    (d.unstable_sx = function (p) {
      return Ai({
        sx: p,
        theme: this,
      });
    }),
    d
  );
}
function yf(e) {
  return Object.keys(e).length === 0;
}
function kl(e = null) {
  const t = b.useContext(Kn);
  return !t || yf(t) ? e : t;
}
const Ef = Di();
function Li(e = Ef) {
  return kl(e);
}
function Nl({ styles: e, themeId: t, defaultTheme: o = {} }) {
  const r = Li(o),
    i = typeof e == 'function' ? e((t && r[t]) || r) : e;
  return /* @__PURE__ */ M(Rl, {
    styles: i,
  });
}
process.env.NODE_ENV !== 'production' &&
  (Nl.propTypes = {
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
function Pl(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = Pl(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function Ee() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = Pl(e)) && (r && (r += ' '), (r += t));
  return r;
}
function Ya(e) {
  return e.length === 0;
}
function Il(e) {
  const { variant: t, ...o } = e;
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += Ya(r) ? e[i] : oe(e[i]))
          : (r += `${Ya(r) ? i : oe(i)}${oe(e[i].toString())}`);
      }),
    r
  );
}
function xf(e) {
  return Object.keys(e).length === 0;
}
function Of(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const Cf = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Tf = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = Il(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  Rf = (e, t, o, r) => {
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
            u && l.push(t[Il(d.props)]);
        }),
      l
    );
  };
function po(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Sf = Di(),
  wf = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function oo({ defaultTheme: e, theme: t, themeId: o }) {
  return xf(t) ? e : t[o] || t;
}
function $f(e = {}) {
  const {
      themeId: t,
      defaultTheme: o = Sf,
      rootShouldForwardProp: r = po,
      slotShouldForwardProp: i = po,
    } = e,
    a = (s) =>
      Ai({
        ...s,
        theme: oo({
          ...s,
          defaultTheme: o,
          themeId: t,
        }),
      });
  return (
    (a.__mui_systemSx = !0),
    (s, l = {}) => {
      Tp(s, (E) => E.filter((f) => !(f != null && f.__mui_systemSx)));
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
      process.env.NODE_ENV !== 'production' && c && (v = `${c}-${wf(d || 'Root')}`);
      let C = po;
      d === 'Root' ? (C = r) : d ? (C = i) : Of(s) && (C = void 0);
      const T = Cp(s, {
          shouldForwardProp: C,
          label: v,
          ...y,
        }),
        O = (E, ...f) => {
          const S = f
            ? f.map((N) =>
                typeof N == 'function' && N.__emotion_real !== N
                  ? (I) =>
                      N({
                        ...I,
                        theme: oo({
                          ...I,
                          defaultTheme: o,
                          themeId: t,
                        }),
                      })
                  : N,
              )
            : [];
          let R = E;
          c &&
            h &&
            S.push((N) => {
              const I = oo({
                  ...N,
                  defaultTheme: o,
                  themeId: t,
                }),
                J = Cf(c, I);
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
              S.push((N) => {
                const I = oo({
                  ...N,
                  defaultTheme: o,
                  themeId: t,
                });
                return Rf(N, Tf(c, I), I, c);
              }),
            m || S.push(a);
          const D = S.length - f.length;
          if (Array.isArray(E) && D > 0) {
            const N = new Array(D).fill('');
            (R = [...E, ...N]), (R.raw = [...E.raw, ...N]);
          } else
            typeof E == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              E.__emotion_real !== E &&
              (R = (N) =>
                E({
                  ...N,
                  theme: oo({
                    ...N,
                    defaultTheme: o,
                    themeId: t,
                  }),
                }));
          const B = T(R, ...S);
          if (process.env.NODE_ENV !== 'production') {
            let N;
            c && (N = `${c}${d || ''}`),
              N === void 0 && (N = `Styled(${Vu(s)})`),
              (B.displayName = N);
          }
          return s.muiName && (B.muiName = s.muiName), B;
        };
      return T.withConfig && (O.withConfig = T.withConfig), O;
    }
  );
}
function kf(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : Oi(t.components[o].defaultProps, r);
}
function Nf({ props: e, name: t, defaultTheme: o, themeId: r }) {
  let i = Li(o);
  return (
    r && (i = i[r] || i),
    kf({
      theme: i,
      name: t,
      props: e,
    })
  );
}
function ji(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function Pf(e) {
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
function Tn(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Tn(Pf(e));
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
function Cr(e) {
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
function If(e) {
  e = Tn(e);
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
    Cr({
      type: l,
      values: c,
    })
  );
}
function ai(e) {
  e = Tn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? Tn(If(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function Ka(e, t) {
  const o = ai(e),
    r = ai(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Ye(e, t) {
  return (
    (e = Tn(e)),
    (t = ji(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Cr(e)
  );
}
function Tr(e, t) {
  if (((e = Tn(e)), (t = ji(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Cr(e);
}
function Rr(e, t) {
  if (((e = Tn(e)), (t = ji(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Cr(e);
}
function Mf(e, t = 0.15) {
  return ai(e) > 0.5 ? Tr(e, t) : Rr(e, t);
}
function _f(e, t) {
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
const Ga = {
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
      paper: vo.white,
      default: vo.white,
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
  Wr = {
    text: {
      primary: vo.white,
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
      active: vo.white,
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
function Xa(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = Rr(e.main, i))
      : t === 'dark' && (e.dark = Tr(e.main, a)));
}
function Af(e = 'light') {
  return e === 'dark'
    ? {
        main: kn[200],
        light: kn[50],
        dark: kn[400],
      }
    : {
        main: kn[700],
        light: kn[400],
        dark: kn[800],
      };
}
function Df(e = 'light') {
  return e === 'dark'
    ? {
        main: $n[200],
        light: $n[50],
        dark: $n[400],
      }
    : {
        main: $n[500],
        light: $n[300],
        dark: $n[700],
      };
}
function Lf(e = 'light') {
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
function jf(e = 'light') {
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
function Ff(e = 'light') {
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
function Vf(e = 'light') {
  return e === 'dark'
    ? {
        main: to[400],
        light: to[300],
        dark: to[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: to[500],
        dark: to[900],
      };
}
function zf(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2, ...i } = e,
    a = e.primary || Af(t),
    s = e.secondary || Df(t),
    l = e.error || Lf(t),
    c = e.info || jf(t),
    d = e.success || Ff(t),
    u = e.warning || Vf(t);
  function p(m) {
    const v = Ka(m, Wr.text.primary) >= o ? Wr.text.primary : Ga.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const C = Ka(m, v);
      C < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${C}:1 for ${v} on ${m}`,
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
      mainShade: C = 500,
      lightShade: T = 300,
      darkShade: O = 700,
    }) => {
      if (
        ((m = {
          ...m,
        }),
        !m.main && m[C] && (m.main = m[C]),
        !m.hasOwnProperty('main'))
      )
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${v ? ` (${v})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${C}\` property.`
            : pn(11, v ? ` (${v})` : '', C),
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
        Xa(m, 'light', T, r), Xa(m, 'dark', O, r), m.contrastText || (m.contrastText = p(m.main)), m
      );
    },
    y = {
      dark: Wr,
      light: Ga,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (y[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    Mt(
      {
        // A collection of common colors.
        common: {
          ...vo,
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
        grey: Ou,
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
function Bf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ja = {
    textTransform: 'uppercase',
  },
  Za = '"Roboto", "Helvetica", "Arial", sans-serif';
function Uf(e, t) {
  const {
    fontFamily: o = Za,
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
    g = (v, C, T, O, E) => ({
      fontFamily: o,
      fontWeight: v,
      fontSize: y(C),
      // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
      lineHeight: T,
      // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
      // across font-families can cause issues with the kerning.
      ...(o === Za
        ? {
            letterSpacing: `${Bf(O / C)}em`,
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
      button: g(s, 14, 1.75, 0.4, Ja),
      caption: g(a, 12, 1.66, 0.4),
      overline: g(a, 12, 2.66, 1, Ja),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return Mt(
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
const Wf = 0.2,
  Hf = 0.14,
  qf = 0.12;
function et(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Wf})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Hf})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${qf})`,
  ].join(',');
}
const Yf = [
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
  Kf = Yf,
  Gf = {
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
  Xf = {
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
function Qa(e) {
  return `${Math.round(e)}ms`;
}
function Jf(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Zf(e) {
  const t = {
      ...Gf,
      ...e.easing,
    },
    o = {
      ...Xf,
      ...e.duration,
    };
  return {
    getAutoHeightDuration: Jf,
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
            `${u} ${typeof s == 'string' ? s : Qa(s)} ${l} ${typeof c == 'string' ? c : Qa(c)}`,
        )
        .join(',');
    },
    ...e,
    easing: t,
    duration: o,
  };
}
const Qf = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  em = Qf;
function tm(e = {}, ...t) {
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
  const u = zf(a),
    p = Di(e);
  let h = Mt(p, {
    mixins: _f(p.breakpoints, r),
    palette: u,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Kf.slice(),
    typography: Uf(u, l),
    transitions: Zf(s),
    zIndex: {
      ...em,
    },
  });
  if (
    ((h = Mt(h, d)), (h = t.reduce((y, g) => Mt(y, g), h)), process.env.NODE_ENV !== 'production')
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
        let C;
        for (C in m) {
          const T = m[C];
          if (y.indexOf(C) !== -1 && Object.keys(T).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const O = Ie('', C);
              console.error(
                [
                  `MUI: The \`${v}\` component increases the CSS specificity of the \`${C}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(m, null, 2),
                  '',
                  `Instead, you need to use the '&.${O}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${O}`]: T,
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
            m[C] = {};
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
      ..._i,
      ...(d == null ? void 0 : d.unstable_sxConfig),
    }),
    (h.unstable_sx = function (g) {
      return Ai({
        sx: g,
        theme: this,
      });
    }),
    h
  );
}
const nm = tm(),
  Sr = nm;
function Gn() {
  const e = Li(Sr);
  return process.env.NODE_ENV !== 'production' && b.useDebugValue(e), e[lr] || e;
}
function Le({ props: e, name: t }) {
  return Nf({
    props: e,
    name: t,
    defaultTheme: Sr,
    themeId: lr,
  });
}
const Wt = (e) => po(e) && e !== 'classes',
  Fi = po,
  om = $f({
    themeId: lr,
    defaultTheme: Sr,
    rootShouldForwardProp: Wt,
  }),
  de = om,
  rm = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  es = rm;
function dn(e) {
  return typeof e == 'string';
}
function im(e, t, o) {
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
function am(e, t, o = (r, i) => r === i) {
  return e.length === t.length && e.every((r, i) => o(r, t[i]));
}
const sm = {
    disableDefaultClasses: !1,
  },
  lm = /* @__PURE__ */ b.createContext(sm);
function Ml(e) {
  const { disableDefaultClasses: t } = b.useContext(lm);
  return (o) => (t ? '' : e(o));
}
function _l(e, t = []) {
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
function si(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function ts(e) {
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
function cm(e) {
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
  const s = _l({
      ...i,
      ...r,
    }),
    l = ts(r),
    c = ts(i),
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
    s = si(r, i),
    { props: l, internalRef: c } = cm({
      ...a,
      externalSlotProps: s,
    }),
    d = rt(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return im(
    o,
    {
      ...l,
      ref: d,
    },
    i,
  );
}
function ns(e) {
  return e.substring(2).toLowerCase();
}
function um(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function Zo(e) {
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
  const u = rt(
      // @ts-expect-error TODO upstream fix
      t.ref,
      l,
    ),
    p = pt((g) => {
      const m = d.current;
      d.current = !1;
      const v = ot(l.current);
      if (!c.current || !l.current || ('clientX' in g && um(g, v))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let C;
      g.composedPath
        ? (C = g.composedPath().indexOf(l.current) > -1)
        : (C =
            !v.documentElement.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              g.target,
            ) ||
            l.current.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              g.target,
            )),
        !C && (o || !m) && i(g);
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
        const g = ns(a),
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
        const g = ns(r),
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
  (Zo.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * The wrapped element.
     */
    children: qn.isRequired,
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
process.env.NODE_ENV !== 'production' && (Zo['propTypes'] = Ei(Zo.propTypes));
const dm = [
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
function pm(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function fm(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function mm(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || fm(e));
}
function hm(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(dm)).forEach((r, i) => {
      const a = pm(r);
      a === -1 ||
        !mm(r) ||
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
function bm() {
  return !0;
}
function Qo(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = hm,
      isEnabled: s = bm,
      open: l,
    } = e,
    c = b.useRef(!1),
    d = b.useRef(null),
    u = b.useRef(null),
    p = b.useRef(null),
    h = b.useRef(null),
    y = b.useRef(!1),
    g = b.useRef(null),
    m = rt(t.ref, g),
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
        E = (R) => {
          const { current: D } = g;
          if (D !== null) {
            if (!O.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!D.contains(O.activeElement)) {
              if ((R && h.current !== R.target) || O.activeElement !== h.current) h.current = null;
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
        f = (R) => {
          (v.current = R),
            !(r || !s() || R.key !== 'Tab') &&
              O.activeElement === g.current &&
              R.shiftKey &&
              ((c.current = !0), u.current && u.current.focus());
        };
      O.addEventListener('focusin', E), O.addEventListener('keydown', f, !0);
      const S = setInterval(() => {
        O.activeElement && O.activeElement.tagName === 'BODY' && E(null);
      }, 50);
      return () => {
        clearInterval(S),
          O.removeEventListener('focusin', E),
          O.removeEventListener('keydown', f, !0);
      };
    }, [o, r, i, s, l, a]);
  const C = (O) => {
      p.current === null && (p.current = O.relatedTarget), (y.current = !0), (h.current = O.target);
      const E = t.props.onFocus;
      E && E(O);
    },
    T = (O) => {
      p.current === null && (p.current = O.relatedTarget), (y.current = !0);
    };
  return /* @__PURE__ */ Xe(b.Fragment, {
    children: [
      /* @__PURE__ */ M('div', {
        tabIndex: l ? 0 : -1,
        onFocus: T,
        ref: d,
        'data-testid': 'sentinelStart',
      }),
      /* @__PURE__ */ b.cloneElement(t, {
        ref: m,
        onFocus: C,
      }),
      /* @__PURE__ */ M('div', {
        tabIndex: l ? 0 : -1,
        onFocus: T,
        ref: u,
        'data-testid': 'sentinelEnd',
      }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (Qo.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: qn,
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
process.env.NODE_ENV !== 'production' && (Qo['propTypes'] = Ei(Qo.propTypes));
var bt = 'top',
  _t = 'bottom',
  At = 'right',
  vt = 'left',
  wr = 'auto',
  wo = [bt, _t, At, vt],
  zn = 'start',
  Oo = 'end',
  vm = 'clippingParents',
  Al = 'viewport',
  ro = 'popper',
  gm = 'reference',
  os = /* @__PURE__ */ wo.reduce(function (e, t) {
    return e.concat([t + '-' + zn, t + '-' + Oo]);
  }, []),
  Dl = /* @__PURE__ */ [].concat(wo, [wr]).reduce(function (e, t) {
    return e.concat([t, t + '-' + zn, t + '-' + Oo]);
  }, []),
  ym = 'beforeRead',
  Em = 'read',
  xm = 'afterRead',
  Om = 'beforeMain',
  Cm = 'main',
  Tm = 'afterMain',
  Rm = 'beforeWrite',
  Sm = 'write',
  wm = 'afterWrite',
  li = [ym, Em, xm, Om, Cm, Tm, Rm, Sm, wm];
function nn(e) {
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
function Rn(e) {
  var t = Nt(e).Element;
  return e instanceof t || e instanceof Element;
}
function kt(e) {
  var t = Nt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Vi(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Nt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function $m(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      i = t.attributes[o] || {},
      a = t.elements[o];
    !kt(a) ||
      !nn(a) ||
      (Object.assign(a.style, r),
      Object.keys(i).forEach(function (s) {
        var l = i[s];
        l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function km(e) {
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
        !kt(i) ||
          !nn(i) ||
          (Object.assign(i.style, l),
          Object.keys(a).forEach(function (c) {
            i.removeAttribute(c);
          }));
      });
    }
  );
}
const Nm = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: $m,
  effect: km,
  requires: ['computeStyles'],
};
function zt(e) {
  return e.split('-')[0];
}
var On = Math.max,
  er = Math.min,
  Bn = Math.round;
function ci() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function Ll() {
  return !/^((?!chrome|android).)*safari/i.test(ci());
}
function Un(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    kt(e) &&
    ((i = (e.offsetWidth > 0 && Bn(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && Bn(r.height) / e.offsetHeight) || 1));
  var s = Rn(e) ? Nt(e) : window,
    l = s.visualViewport,
    c = !Ll() && o,
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
function zi(e) {
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
function jl(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && Vi(o)) {
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
function Pm(e) {
  return ['table', 'td', 'th'].indexOf(nn(e)) >= 0;
}
function mn(e) {
  return (
    (Rn(e)
      ? e.ownerDocument
      : // $FlowFixMe[prop-missing]
        e.document) || window.document
  ).documentElement;
}
function $r(e) {
  return nn(e) === 'html'
    ? e
    : // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        e.parentNode || // DOM Element detected
        (Vi(e) ? e.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        mn(e);
}
function rs(e) {
  return !kt(e) || // https://github.com/popperjs/popper-core/issues/837
    Ut(e).position === 'fixed'
    ? null
    : e.offsetParent;
}
function Im(e) {
  var t = /firefox/i.test(ci()),
    o = /Trident/i.test(ci());
  if (o && kt(e)) {
    var r = Ut(e);
    if (r.position === 'fixed') return null;
  }
  var i = $r(e);
  for (Vi(i) && (i = i.host); kt(i) && ['html', 'body'].indexOf(nn(i)) < 0; ) {
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
function $o(e) {
  for (var t = Nt(e), o = rs(e); o && Pm(o) && Ut(o).position === 'static'; ) o = rs(o);
  return o && (nn(o) === 'html' || (nn(o) === 'body' && Ut(o).position === 'static'))
    ? t
    : o || Im(e) || t;
}
function Bi(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function fo(e, t, o) {
  return On(e, er(t, o));
}
function Mm(e, t, o) {
  var r = fo(e, t, o);
  return r > o ? o : r;
}
function Fl() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function Vl(e) {
  return Object.assign({}, Fl(), e);
}
function zl(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var _m = function (t, o) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, o.rects, {
              placement: o.placement,
            }),
          )
        : t),
    Vl(typeof t != 'number' ? t : zl(t, wo))
  );
};
function Am(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = zt(o.placement),
    c = Bi(l),
    d = [vt, At].indexOf(l) >= 0,
    u = d ? 'height' : 'width';
  if (!(!a || !s)) {
    var p = _m(i.padding, o),
      h = zi(a),
      y = c === 'y' ? bt : vt,
      g = c === 'y' ? _t : At,
      m = o.rects.reference[u] + o.rects.reference[c] - s[c] - o.rects.popper[u],
      v = s[c] - o.rects.reference[c],
      C = $o(a),
      T = C ? (c === 'y' ? C.clientHeight || 0 : C.clientWidth || 0) : 0,
      O = m / 2 - v / 2,
      E = p[y],
      f = T - h[u] - p[g],
      S = T / 2 - h[u] / 2 + O,
      R = fo(E, S, f),
      D = c;
    o.modifiersData[r] = ((t = {}), (t[D] = R), (t.centerOffset = R - S), t);
  }
}
function Dm(e) {
  var t = e.state,
    o = e.options,
    r = o.element,
    i = r === void 0 ? '[data-popper-arrow]' : r;
  if (i != null && !(typeof i == 'string' && ((i = t.elements.popper.querySelector(i)), !i))) {
    if (
      (process.env.NODE_ENV !== 'production' &&
        (kt(i) ||
          console.error(
            [
              'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
              'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
              'the arrow.',
            ].join(' '),
          )),
      !jl(t.elements.popper, i))
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
const Lm = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: Am,
  effect: Dm,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function Wn(e) {
  return e.split('-')[1];
}
var jm = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function Fm(e, t) {
  var o = e.x,
    r = e.y,
    i = t.devicePixelRatio || 1;
  return {
    x: Bn(o * i) / i || 0,
    y: Bn(r * i) / i || 0,
  };
}
function is(e) {
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
  var C = s.hasOwnProperty('x'),
    T = s.hasOwnProperty('y'),
    O = vt,
    E = bt,
    f = window;
  if (d) {
    var S = $o(o),
      R = 'clientHeight',
      D = 'clientWidth';
    if (
      (S === Nt(o) &&
        ((S = mn(o)),
        Ut(S).position !== 'static' &&
          l === 'absolute' &&
          ((R = 'scrollHeight'), (D = 'scrollWidth'))),
      (S = S),
      i === bt || ((i === vt || i === At) && a === Oo))
    ) {
      E = _t;
      var B =
        p && S === f && f.visualViewport
          ? f.visualViewport.height
          : // $FlowFixMe[prop-missing]
            S[R];
      (m -= B - r.height), (m *= c ? 1 : -1);
    }
    if (i === vt || ((i === bt || i === _t) && a === Oo)) {
      O = At;
      var N =
        p && S === f && f.visualViewport
          ? f.visualViewport.width
          : // $FlowFixMe[prop-missing]
            S[D];
      (y -= N - r.width), (y *= c ? 1 : -1);
    }
  }
  var I = Object.assign(
      {
        position: l,
      },
      d && jm,
    ),
    J =
      u === !0
        ? Fm(
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
      (j[E] = T ? '0' : ''),
      (j[O] = C ? '0' : ''),
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
    ((t = {}), (t[E] = T ? m + 'px' : ''), (t[O] = C ? y + 'px' : ''), (t.transform = ''), t),
  );
}
function Vm(e) {
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
    placement: zt(t.placement),
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
      is(
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
        is(
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
const zm = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: Vm,
  data: {},
};
var Mo = {
  passive: !0,
};
function Bm(e) {
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
        u.addEventListener('scroll', o.update, Mo);
      }),
    l && c.addEventListener('resize', o.update, Mo),
    function () {
      a &&
        d.forEach(function (u) {
          u.removeEventListener('scroll', o.update, Mo);
        }),
        l && c.removeEventListener('resize', o.update, Mo);
    }
  );
}
const Um = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: Bm,
  data: {},
};
var Wm = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function Ho(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return Wm[t];
  });
}
var Hm = {
  start: 'end',
  end: 'start',
};
function as(e) {
  return e.replace(/start|end/g, function (t) {
    return Hm[t];
  });
}
function Ui(e) {
  var t = Nt(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r,
  };
}
function Wi(e) {
  return Un(mn(e)).left + Ui(e).scrollLeft;
}
function qm(e, t) {
  var o = Nt(e),
    r = mn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var d = Ll();
    (d || (!d && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return {
    width: a,
    height: s,
    x: l + Wi(e),
    y: c,
  };
}
function Ym(e) {
  var t,
    o = mn(e),
    r = Ui(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = On(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = On(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + Wi(e),
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
function Hi(e) {
  var t = Ut(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function Bl(e) {
  return ['html', 'body', '#document'].indexOf(nn(e)) >= 0
    ? e.ownerDocument.body
    : kt(e) && Hi(e)
    ? e
    : Bl($r(e));
}
function mo(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = Bl(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = Nt(r),
    s = i ? [a].concat(a.visualViewport || [], Hi(r) ? r : []) : r,
    l = t.concat(s);
  return i
    ? l
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(mo($r(s)));
}
function ui(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Km(e, t) {
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
function ss(e, t, o) {
  return t === Al ? ui(qm(e, o)) : Rn(t) ? Km(t, o) : ui(Ym(mn(e)));
}
function Gm(e) {
  var t = mo($r(e)),
    o = ['absolute', 'fixed'].indexOf(Ut(e).position) >= 0,
    r = o && kt(e) ? $o(e) : e;
  return Rn(r)
    ? t.filter(function (i) {
        return Rn(i) && jl(i, r) && nn(i) !== 'body';
      })
    : [];
}
function Xm(e, t, o, r) {
  var i = t === 'clippingParents' ? Gm(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, d) {
      var u = ss(e, d, r);
      return (
        (c.top = On(u.top, c.top)),
        (c.right = er(u.right, c.right)),
        (c.bottom = er(u.bottom, c.bottom)),
        (c.left = On(u.left, c.left)),
        c
      );
    }, ss(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function Ul(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? zt(r) : null,
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
    case _t:
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
  var d = i ? Bi(i) : null;
  if (d != null) {
    var u = d === 'y' ? 'height' : 'width';
    switch (a) {
      case zn:
        c[d] = c[d] - (t[u] / 2 - o[u] / 2);
        break;
      case Oo:
        c[d] = c[d] + (t[u] / 2 - o[u] / 2);
        break;
    }
  }
  return c;
}
function Co(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = r === void 0 ? e.placement : r,
    a = o.strategy,
    s = a === void 0 ? e.strategy : a,
    l = o.boundary,
    c = l === void 0 ? vm : l,
    d = o.rootBoundary,
    u = d === void 0 ? Al : d,
    p = o.elementContext,
    h = p === void 0 ? ro : p,
    y = o.altBoundary,
    g = y === void 0 ? !1 : y,
    m = o.padding,
    v = m === void 0 ? 0 : m,
    C = Vl(typeof v != 'number' ? v : zl(v, wo)),
    T = h === ro ? gm : ro,
    O = e.rects.popper,
    E = e.elements[g ? T : h],
    f = Xm(Rn(E) ? E : E.contextElement || mn(e.elements.popper), c, u, s),
    S = Un(e.elements.reference),
    R = Ul({
      reference: S,
      element: O,
      strategy: 'absolute',
      placement: i,
    }),
    D = ui(Object.assign({}, O, R)),
    B = h === ro ? D : S,
    N = {
      top: f.top - B.top + C.top,
      bottom: B.bottom - f.bottom + C.bottom,
      left: f.left - B.left + C.left,
      right: B.right - f.right + C.right,
    },
    I = e.modifiersData.offset;
  if (h === ro && I) {
    var J = I[i];
    Object.keys(N).forEach(function (j) {
      var _ = [At, _t].indexOf(j) >= 0 ? 1 : -1,
        A = [bt, _t].indexOf(j) >= 0 ? 'y' : 'x';
      N[j] += J[A] * _;
    });
  }
  return N;
}
function Jm(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    d = c === void 0 ? Dl : c,
    u = Wn(r),
    p = u
      ? l
        ? os
        : os.filter(function (g) {
            return Wn(g) === u;
          })
      : wo,
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
      (g[m] = Co(e, {
        placement: m,
        boundary: i,
        rootBoundary: a,
        padding: s,
      })[zt(m)]),
      g
    );
  }, {});
  return Object.keys(y).sort(function (g, m) {
    return y[g] - y[m];
  });
}
function Zm(e) {
  if (zt(e) === wr) return [];
  var t = Ho(e);
  return [as(e), t, as(t)];
}
function Qm(e) {
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
        C = zt(v),
        T = C === v,
        O = c || (T || !g ? [Ho(v)] : Zm(v)),
        E = [v].concat(O).reduce(function (H, K) {
          return H.concat(
            zt(K) === wr
              ? Jm(t, {
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
        S = t.rects.popper,
        R = /* @__PURE__ */ new Map(),
        D = !0,
        B = E[0],
        N = 0;
      N < E.length;
      N++
    ) {
      var I = E[N],
        J = zt(I),
        j = Wn(I) === zn,
        _ = [bt, _t].indexOf(J) >= 0,
        A = _ ? 'width' : 'height',
        q = Co(t, {
          placement: I,
          boundary: u,
          rootBoundary: p,
          altBoundary: h,
          padding: d,
        }),
        ae = _ ? (j ? At : vt) : j ? _t : bt;
      f[A] > S[A] && (ae = Ho(ae));
      var Q = Ho(ae),
        V = [];
      if (
        (a && V.push(q[J] <= 0),
        l && V.push(q[ae] <= 0, q[Q] <= 0),
        V.every(function (H) {
          return H;
        }))
      ) {
        (B = I), (D = !1);
        break;
      }
      R.set(I, V);
    }
    if (D)
      for (
        var w = g ? 3 : 1,
          L = function (K) {
            var re = E.find(function (Z) {
              var ie = R.get(Z);
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
        var z = L(G);
        if (z === 'break') break;
      }
    t.placement !== B && ((t.modifiersData[r]._skip = !0), (t.placement = B), (t.reset = !0));
  }
}
const eh = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Qm,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function ls(e, t, o) {
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
function cs(e) {
  return [bt, At, _t, vt].some(function (t) {
    return e[t] >= 0;
  });
}
function th(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = Co(t, {
      elementContext: 'reference',
    }),
    l = Co(t, {
      altBoundary: !0,
    }),
    c = ls(s, r),
    d = ls(l, i, a),
    u = cs(c),
    p = cs(d);
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
const nh = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: th,
};
function oh(e, t, o) {
  var r = zt(e),
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
function rh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = Dl.reduce(function (u, p) {
      return (u[p] = oh(p, t.rects, a)), u;
    }, {}),
    l = s[t.placement],
    c = l.x,
    d = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += d)),
    (t.modifiersData[r] = s);
}
const ih = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: rh,
};
function ah(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = Ul({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const sh = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: ah,
  data: {},
};
function lh(e) {
  return e === 'x' ? 'y' : 'x';
}
function ch(e) {
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
    v = Co(t, {
      boundary: c,
      rootBoundary: d,
      padding: p,
      altBoundary: u,
    }),
    C = zt(t.placement),
    T = Wn(t.placement),
    O = !T,
    E = Bi(C),
    f = lh(E),
    S = t.modifiersData.popperOffsets,
    R = t.rects.reference,
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
  if (S) {
    if (a) {
      var j,
        _ = E === 'y' ? bt : vt,
        A = E === 'y' ? _t : At,
        q = E === 'y' ? 'height' : 'width',
        ae = S[E],
        Q = ae + v[_],
        V = ae - v[A],
        w = y ? -D[q] / 2 : 0,
        L = T === zn ? R[q] : D[q],
        G = T === zn ? -D[q] : -R[q],
        z = t.elements.arrow,
        H =
          y && z
            ? zi(z)
            : {
                width: 0,
                height: 0,
              },
        K = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : Fl(),
        re = K[_],
        Z = K[A],
        ie = fo(0, R[q], H[q]),
        ce = O ? R[q] / 2 - w - ie - re - N.mainAxis : L - ie - re - N.mainAxis,
        ue = O ? -R[q] / 2 + w + ie + Z + N.mainAxis : G + ie + Z + N.mainAxis,
        me = t.elements.arrow && $o(t.elements.arrow),
        P = me ? (E === 'y' ? me.clientTop || 0 : me.clientLeft || 0) : 0,
        Ce = (j = I == null ? void 0 : I[E]) != null ? j : 0,
        X = ae + ce - Ce - P,
        W = ae + ue - Ce,
        Te = fo(y ? er(Q, X) : Q, ae, y ? On(V, W) : V);
      (S[E] = Te), (J[E] = Te - ae);
    }
    if (l) {
      var pe,
        $e = E === 'x' ? bt : vt,
        je = E === 'x' ? _t : At,
        Je = S[f],
        Ge = f === 'y' ? 'height' : 'width',
        Fe = Je + v[$e],
        Ze = Je - v[je],
        ee = [bt, vt].indexOf(C) !== -1,
        te = (pe = I == null ? void 0 : I[f]) != null ? pe : 0,
        ye = ee ? Fe : Je - R[Ge] - D[Ge] - te + N.altAxis,
        he = ee ? Je + R[Ge] + D[Ge] - te - N.altAxis : Ze,
        xe = y && ee ? Mm(ye, Je, he) : fo(y ? ye : Fe, Je, y ? he : Ze);
      (S[f] = xe), (J[f] = xe - Je);
    }
    t.modifiersData[r] = J;
  }
}
const uh = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: ch,
  requiresIfExists: ['offset'],
};
function dh(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function ph(e) {
  return e === Nt(e) || !kt(e) ? Ui(e) : dh(e);
}
function fh(e) {
  var t = e.getBoundingClientRect(),
    o = Bn(t.width) / e.offsetWidth || 1,
    r = Bn(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function mh(e, t, o) {
  o === void 0 && (o = !1);
  var r = kt(t),
    i = kt(t) && fh(t),
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
      ((nn(t) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        Hi(a)) &&
        (l = ph(t)),
      kt(t) ? ((c = Un(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = Wi(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function hh(e) {
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
function bh(e) {
  var t = hh(e);
  return li.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
      }),
    );
  }, []);
}
function vh(e) {
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
  gh = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  us = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function yh(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), us)
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
            li.indexOf(t.phase) < 0 &&
              console.error(
                cn(vn, t.name, '"phase"', 'either ' + li.join(', '), '"' + String(t.phase) + '"'),
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
                us
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
            }) == null && console.error(cn(gh, String(t.name), r, r));
          });
      });
  });
}
function Eh(e, t) {
  var o = /* @__PURE__ */ new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function xh(e) {
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
var ds =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Oh =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  ps = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
  };
function fs() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function Ch(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    i = t.defaultOptions,
    a = i === void 0 ? ps : i;
  return function (l, c, d) {
    d === void 0 && (d = a);
    var u = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, ps, a),
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
        setOptions: function (C) {
          var T = typeof C == 'function' ? C(u.options) : C;
          m(),
            (u.options = Object.assign({}, a, u.options, T)),
            (u.scrollParents = {
              reference: Rn(l) ? mo(l) : l.contextElement ? mo(l.contextElement) : [],
              popper: mo(c),
            });
          var O = bh(xh([].concat(r, u.options.modifiers)));
          if (
            ((u.orderedModifiers = O.filter(function (I) {
              return I.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var E = Eh([].concat(O, u.options.modifiers), function (I) {
              var J = I.name;
              return J;
            });
            if ((yh(E), zt(u.options.placement) === wr)) {
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
            var S = Ut(c),
              R = S.marginTop,
              D = S.marginRight,
              B = S.marginBottom,
              N = S.marginLeft;
            [R, D, B, N].some(function (I) {
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
            var C = u.elements,
              T = C.reference,
              O = C.popper;
            if (!fs(T, O)) {
              process.env.NODE_ENV !== 'production' && console.error(ds);
              return;
            }
            (u.rects = {
              reference: mh(T, $o(O), u.options.strategy === 'fixed'),
              popper: zi(O),
            }),
              (u.reset = !1),
              (u.placement = u.options.placement),
              u.orderedModifiers.forEach(function (I) {
                return (u.modifiersData[I.name] = Object.assign({}, I.data));
              });
            for (var E = 0, f = 0; f < u.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((E += 1), E > 100)) {
                console.error(Oh);
                break;
              }
              if (u.reset === !0) {
                (u.reset = !1), (f = -1);
                continue;
              }
              var S = u.orderedModifiers[f],
                R = S.fn,
                D = S.options,
                B = D === void 0 ? {} : D,
                N = S.name;
              typeof R == 'function' &&
                (u =
                  R({
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
        update: vh(function () {
          return new Promise(function (v) {
            y.forceUpdate(), v(u);
          });
        }),
        destroy: function () {
          m(), (h = !0);
        },
      };
    if (!fs(l, c)) return process.env.NODE_ENV !== 'production' && console.error(ds), y;
    y.setOptions(d).then(function (v) {
      !h && d.onFirstUpdate && d.onFirstUpdate(v);
    });
    function g() {
      u.orderedModifiers.forEach(function (v) {
        var C = v.name,
          T = v.options,
          O = T === void 0 ? {} : T,
          E = v.effect;
        if (typeof E == 'function') {
          var f = E({
              state: u,
              name: C,
              instance: y,
              options: O,
            }),
            S = function () {};
          p.push(f || S);
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
var Th = [Um, sh, zm, Nm, ih, eh, uh, Lm, nh],
  Rh = /* @__PURE__ */ Ch({
    defaultModifiers: Th,
  });
function Sh(e) {
  return typeof e == 'function' ? e() : e;
}
const tr = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = b.useState(null),
    c = rt(/* @__PURE__ */ b.isValidElement(r) ? r.ref : null, o);
  if (
    (tn(() => {
      a || l(Sh(i) || document.body);
    }, [i, a]),
    tn(() => {
      if (s && !a)
        return (
          Yo(o, s),
          () => {
            Yo(o, null);
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
    children: s && /* @__PURE__ */ Js.createPortal(r, s),
  });
});
process.env.NODE_ENV !== 'production' &&
  (tr.propTypes = {
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
    container: n.oneOfType([en, n.func]),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (tr['propTypes'] = Ei(tr.propTypes));
const Wl = tr;
function wh(e) {
  return Ie('MuiPopper', e);
}
Ne('MuiPopper', ['root']);
function $h(e, t) {
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
function nr(e) {
  return typeof e == 'function' ? e() : e;
}
function kr(e) {
  return e.nodeType !== void 0;
}
function kh(e) {
  return !kr(e);
}
const Nh = () =>
    _e(
      {
        root: ['root'],
      },
      Ml(wh),
    ),
  Ph = {},
  Ih = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        ...C
      } = t,
      T = b.useRef(null),
      O = rt(T, o),
      E = b.useRef(null),
      f = rt(E, h),
      S = b.useRef(f);
    tn(() => {
      S.current = f;
    }, [f]),
      b.useImperativeHandle(h, () => E.current, []);
    const R = $h(u, s),
      [D, B] = b.useState(R),
      [N, I] = b.useState(nr(i));
    b.useEffect(() => {
      E.current && E.current.forceUpdate();
    }),
      b.useEffect(() => {
        i && I(nr(i));
      }, [i]),
      tn(() => {
        if (!N || !d) return;
        const q = (V) => {
          B(V.placement);
        };
        if (process.env.NODE_ENV !== 'production' && N && kr(N) && N.nodeType === 1) {
          const V = N.getBoundingClientRect();
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
            fn: ({ state: V }) => {
              q(V);
            },
          },
        ];
        c != null && (ae = ae.concat(c)), p && p.modifiers != null && (ae = ae.concat(p.modifiers));
        const Q = Rh(N, T.current, {
          placement: R,
          ...p,
          modifiers: ae,
        });
        return (
          S.current(Q),
          () => {
            Q.destroy(), S.current(null);
          }
        );
      }, [N, l, c, d, p, R]);
    const J = {
      placement: D,
    };
    m !== null && (J.TransitionProps = m);
    const j = Nh(),
      _ = (r = g.root) != null ? r : 'div',
      A = Pt({
        elementType: _,
        externalSlotProps: y.root,
        externalForwardedProps: C,
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
  Hl = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        popperOptions: h = Ph,
        popperRef: y,
        style: g,
        transition: m = !1,
        slotProps: v = {},
        slots: C = {},
        ...T
      } = t,
      [O, E] = b.useState(!0),
      f = () => {
        E(!1);
      },
      S = () => {
        E(!0);
      };
    if (!c && !u && (!m || O)) return null;
    let R;
    if (a) R = a;
    else if (r) {
      const N = nr(r);
      R = N && kr(N) ? ot(N).body : ot(null).body;
    }
    const D = !u && c && (!m || O) ? 'none' : void 0,
      B = m
        ? {
            in: u,
            onEnter: f,
            onExited: S,
          }
        : void 0;
    return /* @__PURE__ */ M(Wl, {
      disablePortal: l,
      container: R,
      children: /* @__PURE__ */ M(Ih, {
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
        slots: C,
        ...T,
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
  (Hl.propTypes = {
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
    anchorEl: Bt(n.oneOfType([en, n.object, n.func]), (e) => {
      if (e.open) {
        const t = nr(e.anchorEl);
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
          (kh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([en, n.func]),
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
const Mh = Hl;
function _h(e) {
  const t = ot(e);
  return t.body === e
    ? Cn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function ho(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function ms(e) {
  return parseInt(Cn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Ah(e) {
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
function hs(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !Ah(s);
    l && c && ho(s, i);
  });
}
function Hr(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function Dh(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (_h(r)) {
      const s = sl(ot(r));
      o.push({
        value: r.style.paddingRight,
        property: 'padding-right',
        el: r,
      }),
        (r.style.paddingRight = `${ms(r) + s}px`);
      const l = ot(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({
          value: c.style.paddingRight,
          property: 'padding-right',
          el: c,
        }),
          (c.style.paddingRight = `${ms(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = ot(r).body;
    else {
      const s = r.parentElement,
        l = Cn(r);
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
function Lh(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class jh {
  constructor() {
    (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && ho(t.modalRef, !1);
    const i = Lh(o);
    hs(o, t.mount, t.modalRef, i, !0);
    const a = Hr(this.containers, (s) => s.container === o);
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
    const r = Hr(this.containers, (a) => a.modals.indexOf(t) !== -1),
      i = this.containers[r];
    i.restore || (i.restore = Dh(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = Hr(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && ho(t.modalRef, o),
        hs(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
        this.containers.splice(i, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && ho(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Fh(e) {
  return Ie('MuiModal', e);
}
Ne('MuiModal', ['root', 'hidden', 'backdrop']);
const Vh = (e) => {
  const { open: t, exited: o } = e;
  return _e(
    {
      root: ['root', !t && o && 'hidden'],
      backdrop: ['backdrop'],
    },
    Ml(Fh),
  );
};
function zh(e) {
  return typeof e == 'function' ? e() : e;
}
function Bh(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const Uh = new jh(),
  ql = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        manager: v = Uh,
        onBackdropClick: C,
        onClose: T,
        onKeyDown: O,
        open: E,
        onTransitionEnter: f,
        onTransitionExited: S,
        slotProps: R = {},
        slots: D = {},
        ...B
      } = t,
      N = v,
      [I, J] = b.useState(!E),
      j = b.useRef({}),
      _ = b.useRef(null),
      A = b.useRef(null),
      q = rt(A, o),
      ae = Bh(a),
      Q = (r = t['aria-hidden']) != null ? r : !0,
      V = () => ot(_.current),
      w = () => ((j.current.modalRef = A.current), (j.current.mountNode = _.current), j.current),
      L = () => {
        N.mount(w(), {
          disableScrollLock: y,
        }),
          A.current && (A.current.scrollTop = 0);
      },
      G = pt(() => {
        const pe = zh(l) || V().body;
        N.add(w(), pe), A.current && L();
      }),
      z = b.useCallback(() => N.isTopModal(w()), [N]),
      H = pt((pe) => {
        (_.current = pe), !(!pe || !A.current) && (E && z() ? L() : ho(A.current, Q));
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
      Z = Vh(re),
      ie = () => {
        J(!1), f && f();
      },
      ce = () => {
        J(!0), S && S(), s && K();
      },
      ue = (pe) => {
        pe.target === pe.currentTarget && (C && C(pe), T && T(pe, 'backdropClick'));
      },
      me = (pe) => {
        O && O(pe),
          !(pe.key !== 'Escape' || !z()) &&
            (u || (pe.stopPropagation(), T && T(pe, 'escapeKeyDown')));
      },
      P = {};
    a.props.tabIndex === void 0 && (P.tabIndex = '-1'),
      ae && ((P.onEnter = Ea(ie, a.props.onEnter)), (P.onExited = Ea(ce, a.props.onExited)));
    const Ce = (i = D.root) != null ? i : 'div',
      X = Pt({
        elementType: Ce,
        externalSlotProps: R.root,
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
      Te = Pt({
        elementType: W,
        externalSlotProps: R.backdrop,
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
      : /* @__PURE__ */ M(Wl, {
          ref: H,
          container: l,
          disablePortal: p,
          children: /* @__PURE__ */ Xe(Ce, {
            ...X,
            children: [
              !g && W
                ? /* @__PURE__ */ M(W, {
                    ...Te,
                  })
                : null,
              /* @__PURE__ */ M(Qo, {
                disableEnforceFocus: d,
                disableAutoFocus: c,
                disableRestoreFocus: h,
                isEnabled: z,
                open: E,
                children: /* @__PURE__ */ b.cloneElement(a, P),
              }),
            ],
          }),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (ql.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: qn.isRequired,
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
    container: n.oneOfType([en, n.func]),
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
const Wh = ql,
  Hh = 2;
function Yl(e, t) {
  return e - t;
}
function io(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function bs(e, t) {
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
function or(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function qh(e, t, o) {
  return (o - t) * e + t;
}
function Yh(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function Kh(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(Yh(t)));
}
function vs({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(Yl);
}
function Ao({ sliderRef: e, activeIndex: t, setActive: o }) {
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
function Do(e, t) {
  return typeof e == 'number' && typeof t == 'number'
    ? e === t
    : typeof e == 'object' && typeof t == 'object'
    ? am(e, t)
    : !1;
}
const Gh = {
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
  Xh = (e) => e;
let Lo;
function qr() {
  return (
    Lo === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Lo = CSS.supports('touch-action', 'none'))
        : (Lo = !0)),
    Lo
  );
}
function Jh(e) {
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
      scale: g = Xh,
      step: m = 1,
      tabIndex: v,
      value: C,
    } = e,
    T = b.useRef(),
    [O, E] = b.useState(-1),
    [f, S] = b.useState(-1),
    [R, D] = b.useState(!1),
    B = b.useRef(0),
    [N, I] = xn({
      controlled: C,
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
  let _ = j ? N.slice().sort(Yl) : [N];
  _ = _.map((ee) => io(ee, c, l));
  const A =
      s === !0 && m !== null
        ? [...Array(Math.floor((l - c) / m) + 1)].map((ee, te) => ({
            value: c + m * te,
          }))
        : s || [],
    q = A.map((ee) => ee.value),
    { isFocusVisibleRef: ae, onBlur: Q, onFocus: V, ref: w } = al(),
    [L, G] = b.useState(-1),
    z = b.useRef(),
    H = rt(w, z),
    K = rt(y, H),
    re = (ee) => (te) => {
      var ye;
      const he = Number(te.currentTarget.getAttribute('data-index'));
      V(te),
        ae.current === !0 && G(he),
        S(he),
        ee == null || (ye = ee.onFocus) == null || ye.call(ee, te);
    },
    Z = (ee) => (te) => {
      var ye;
      Q(te),
        ae.current === !1 && G(-1),
        S(-1),
        ee == null || (ye = ee.onBlur) == null || ye.call(ee, te);
    };
  tn(() => {
    if (r && z.current.contains(document.activeElement)) {
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
        Pe = q.indexOf(xe);
      let se = te.target.valueAsNumber;
      if (
        (A && m == null && (se = se < xe ? q[Pe - 1] : q[Pe + 1]),
        (se = io(se, c, l)),
        A && m == null)
      ) {
        const we = q.indexOf(_[he]);
        se = se < _[he] ? q[we - 1] : q[we + 1];
      }
      if (j) {
        i && (se = io(se, _[he - 1] || -1 / 0, _[he + 1] || 1 / 0));
        const we = se;
        se = vs({
          values: _,
          newValue: se,
          index: he,
        });
        let U = he;
        i || (U = se.indexOf(we)),
          Ao({
            sliderRef: z,
            activeIndex: U,
          });
      }
      I(se), G(he), J && !Do(se, N) && J(te, se, he), p && p(te, se);
    },
    ce = b.useRef();
  let ue = h;
  a && h === 'horizontal' && (ue += '-reverse');
  const me = ({ finger: ee, move: te = !1 }) => {
      const { current: ye } = z,
        { width: he, height: xe, bottom: Pe, left: se } = ye.getBoundingClientRect();
      let we;
      ue.indexOf('vertical') === 0 ? (we = (Pe - ee.y) / xe) : (we = (ee.x - se) / he),
        ue.indexOf('-reverse') !== -1 && (we = 1 - we);
      let U;
      if (((U = qh(we, c, l)), m)) U = Kh(U, m, c);
      else {
        const Re = bs(q, U);
        U = q[Re];
      }
      U = io(U, c, l);
      let ge = 0;
      if (j) {
        te ? (ge = ce.current) : (ge = bs(_, U)),
          i && (U = io(U, _[ge - 1] || -1 / 0, _[ge + 1] || 1 / 0));
        const Re = U;
        (U = vs({
          values: _,
          newValue: U,
          index: ge,
        })),
          (i && te) || ((ge = U.indexOf(Re)), (ce.current = ge));
      }
      return {
        newValue: U,
        activeIndex: ge,
      };
    },
    P = pt((ee) => {
      const te = _o(ee, T);
      if (!te) return;
      if (((B.current += 1), ee.type === 'mousemove' && ee.buttons === 0)) {
        Ce(ee);
        return;
      }
      const { newValue: ye, activeIndex: he } = me({
        finger: te,
        move: !0,
      });
      Ao({
        sliderRef: z,
        activeIndex: he,
        setActive: E,
      }),
        I(ye),
        !R && B.current > Hh && D(!0),
        J && !Do(ye, N) && J(ee, ye, he);
    }),
    Ce = pt((ee) => {
      const te = _o(ee, T);
      if ((D(!1), !te)) return;
      const { newValue: ye } = me({
        finger: te,
        move: !0,
      });
      E(-1), ee.type === 'touchend' && S(-1), p && p(ee, ye), (T.current = void 0), W();
    }),
    X = pt((ee) => {
      if (r) return;
      qr() || ee.preventDefault();
      const te = ee.changedTouches[0];
      te != null && (T.current = te.identifier);
      const ye = _o(ee, T);
      if (ye !== !1) {
        const { newValue: xe, activeIndex: Pe } = me({
          finger: ye,
        });
        Ao({
          sliderRef: z,
          activeIndex: Pe,
          setActive: E,
        }),
          I(xe),
          J && !Do(xe, N) && J(ee, xe, Pe);
      }
      B.current = 0;
      const he = ot(z.current);
      he.addEventListener('touchmove', P), he.addEventListener('touchend', Ce);
    }),
    W = b.useCallback(() => {
      const ee = ot(z.current);
      ee.removeEventListener('mousemove', P),
        ee.removeEventListener('mouseup', Ce),
        ee.removeEventListener('touchmove', P),
        ee.removeEventListener('touchend', Ce);
    }, [Ce, P]);
  b.useEffect(() => {
    const { current: ee } = z;
    return (
      ee.addEventListener('touchstart', X, {
        passive: qr(),
      }),
      () => {
        ee.removeEventListener('touchstart', X, {
          passive: qr(),
        }),
          W();
      }
    );
  }, [W, X]),
    b.useEffect(() => {
      r && W();
    }, [r, W]);
  const Te = (ee) => (te) => {
      var ye;
      if (
        ((ye = ee.onMouseDown) == null || ye.call(ee, te),
        r || te.defaultPrevented || te.button !== 0)
      )
        return;
      te.preventDefault();
      const he = _o(te, T);
      if (he !== !1) {
        const { newValue: Pe, activeIndex: se } = me({
          finger: he,
        });
        Ao({
          sliderRef: z,
          activeIndex: se,
          setActive: E,
        }),
          I(Pe),
          J && !Do(Pe, N) && J(te, Pe, se);
      }
      B.current = 0;
      const xe = ot(z.current);
      xe.addEventListener('mousemove', P), xe.addEventListener('mouseup', Ce);
    },
    pe = or(j ? _[0] : c, c, l),
    $e = or(_[_.length - 1], c, l) - pe,
    je = (ee = {}) => {
      const te = {
          onMouseDown: Te(ee || {}),
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
    Je = (ee) => (te) => {
      var ye;
      (ye = ee.onMouseOver) == null || ye.call(ee, te);
      const he = Number(te.currentTarget.getAttribute('data-index'));
      S(he);
    },
    Ge = (ee) => (te) => {
      var ye;
      (ye = ee.onMouseLeave) == null || ye.call(ee, te), S(-1);
    };
  return {
    active: O,
    axis: ue,
    axisProps: Gh,
    dragging: R,
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
          ...ed,
          direction: a ? 'rtl' : 'ltr',
          // So that VoiceOver's focus indicator matches the thumb's dimensions
          width: '100%',
          height: '100%',
        },
      };
    },
    getRootProps: je,
    getThumbProps: (ee = {}) => {
      const te = {
        onMouseOver: Je(ee || {}),
        onMouseLeave: Ge(ee || {}),
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
    trackLeap: $e,
    trackOffset: pe,
    values: _,
  };
}
function Zh(e) {
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
    function C(T) {
      T.defaultPrevented ||
        ((T.key === 'Escape' || T.key === 'Esc') && (r == null || r(T, 'escapeKeyDown')));
    }
    return (
      document.addEventListener('keydown', C),
      () => {
        document.removeEventListener('keydown', C);
      }
    );
  }, [i, r]);
  const l = pt((C, T) => {
      r == null || r(C, T);
    }),
    c = pt((C) => {
      !r ||
        C == null ||
        (clearTimeout(s.current),
        (s.current = setTimeout(() => {
          l(null, 'timeout');
        }, C)));
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
  const d = (C) => {
      r == null || r(C, 'clickaway');
    },
    u = () => {
      clearTimeout(s.current);
    },
    p = b.useCallback(() => {
      t != null && c(a ?? t * 0.5);
    }, [t, a, c]),
    h = (C) => (T) => {
      const O = C.onBlur;
      O == null || O(T), p();
    },
    y = (C) => (T) => {
      const O = C.onFocus;
      O == null || O(T), u();
    },
    g = (C) => (T) => {
      const O = C.onMouseEnter;
      O == null || O(T), u();
    },
    m = (C) => (T) => {
      const O = C.onMouseLeave;
      O == null || O(T), p();
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
      getRootProps: (C = {}) => {
        const O = {
          ..._l(e),
          ...C,
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
function jo(e) {
  return parseInt(e, 10) || 0;
}
const Qh = {
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
function gs(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const Kl = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l, ...c } = t,
    { current: d } = b.useRef(l != null),
    u = b.useRef(null),
    p = rt(o, u),
    h = b.useRef(null),
    y = b.useRef(0),
    [g, m] = b.useState({
      outerHeightStyle: 0,
    }),
    v = b.useCallback(() => {
      const f = u.current,
        R = Cn(f).getComputedStyle(f);
      if (R.width === '0px')
        return {
          outerHeightStyle: 0,
        };
      const D = h.current;
      (D.style.width = R.width),
        (D.value = f.value || t.placeholder || 'x'),
        D.value.slice(-1) ===
          `
` && (D.value += ' ');
      const B = R.boxSizing,
        N = jo(R.paddingBottom) + jo(R.paddingTop),
        I = jo(R.borderBottomWidth) + jo(R.borderTopWidth),
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
    C = (f, S) => {
      const { outerHeightStyle: R, overflow: D } = S;
      return y.current < 20 &&
        ((R > 0 && Math.abs((f.outerHeightStyle || 0) - R) > 1) || f.overflow !== D)
        ? ((y.current += 1),
          {
            overflow: D,
            outerHeightStyle: R,
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
    T = b.useCallback(() => {
      const f = v();
      gs(f) || m((S) => C(S, f));
    }, [v]),
    O = () => {
      const f = v();
      gs(f) ||
        Js.flushSync(() => {
          m((S) => C(S, f));
        });
    };
  b.useEffect(() => {
    const f = rl(() => {
      (y.current = 0), u.current && O();
    });
    let S;
    const R = u.current,
      D = Cn(R);
    return (
      D.addEventListener('resize', f),
      typeof ResizeObserver < 'u' && ((S = new ResizeObserver(f)), S.observe(R)),
      () => {
        f.clear(), D.removeEventListener('resize', f), S && S.disconnect();
      }
    );
  }),
    tn(() => {
      T();
    }),
    b.useEffect(() => {
      y.current = 0;
    }, [l]);
  const E = (f) => {
    (y.current = 0), d || T(), r && r(f);
  };
  return /* @__PURE__ */ Xe(b.Fragment, {
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
          ...Qh.shadow,
          ...s,
          padding: 0,
        },
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (Kl.propTypes = {
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
const eb = Kl;
function ys(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function tb(e = {}) {
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
    o && (u = u.toLowerCase()), t && (u = ys(u));
    const p = u
      ? l.filter((h) => {
          let y = (a || d)(h);
          return (
            o && (y = y.toLowerCase()),
            t && (y = ys(y)),
            i === 'start' ? y.indexOf(u) === 0 : y.indexOf(u) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function Yr(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const nb = tb(),
  Es = 5,
  ob = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function rb(e) {
  const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_isActiveElementInListbox: t = ob,
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
      filterOptions: v = nb,
      filterSelectedOptions: C = !1,
      freeSolo: T = !1,
      getOptionDisabled: O,
      getOptionLabel: E = ($) => {
        var k;
        return (k = $.label) != null ? k : $;
      },
      groupBy: f,
      handleHomeEndKeys: S = !e.freeSolo,
      id: R,
      includeInputInList: D = !1,
      inputValue: B,
      isOptionEqualToValue: N = ($, k) => $ === k,
      multiple: I = !1,
      onChange: J,
      onClose: j,
      onHighlightChange: _,
      onInputChange: A,
      onOpen: q,
      open: ae,
      openOnFocus: Q = !1,
      options: V,
      readOnly: w = !1,
      selectOnFocus: L = !e.freeSolo,
      value: G,
    } = e,
    z = il(R);
  let H = E;
  H = ($) => {
    const k = E($);
    if (typeof k != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const Y = k === void 0 ? 'undefined' : `${typeof k} (${k})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${d} returned ${Y} instead of a string for ${JSON.stringify(
            $,
          )}.`,
        );
      }
      return String(k);
    }
    return k;
  };
  const K = b.useRef(!1),
    re = b.useRef(!0),
    Z = b.useRef(null),
    ie = b.useRef(null),
    [ce, ue] = b.useState(null),
    [me, P] = b.useState(-1),
    Ce = i ? 0 : -1,
    X = b.useRef(Ce),
    [W, Te] = xn({
      controlled: G,
      default: u,
      name: d,
    }),
    [pe, $e] = xn({
      controlled: B,
      default: '',
      name: d,
      state: 'inputValue',
    }),
    [je, Je] = b.useState(!1),
    Ge = b.useCallback(
      ($, k) => {
        if (!(I ? W.length < k.length : k !== null) && !l) return;
        let ne;
        if (I) ne = '';
        else if (k == null) ne = '';
        else {
          const fe = H(k);
          ne = typeof fe == 'string' ? fe : '';
        }
        pe !== ne && ($e(ne), A && A($, ne, 'reset'));
      },
      [H, pe, I, A, $e, l, W],
    ),
    [Fe, Ze] = xn({
      controlled: ae,
      default: !1,
      name: d,
      state: 'open',
    }),
    [ee, te] = b.useState(!0),
    ye = !I && W != null && pe === H(W),
    he = Fe && !w,
    xe = he
      ? v(
          V.filter(($) => !(C && (I ? W : [W]).some((k) => k !== null && N($, k)))),
          // we use the empty string to manipulate `filterOptions` to not filter any options
          // i.e. the filter predicate always returns true
          {
            inputValue: ye && ee ? '' : pe,
            getOptionLabel: H,
          },
        )
      : [],
    Pe = Zu({
      filteredOptions: xe,
      value: W,
    });
  b.useEffect(() => {
    const $ = W !== Pe.value;
    (je && !$) || (T && !$) || Ge(null, W);
  }, [W, Ge, je, Pe.value, T]);
  const se = Fe && xe.length > 0 && !w;
  if (process.env.NODE_ENV !== 'production' && W !== null && !T && V.length > 0) {
    const $ = (I ? W : [W]).filter((k) => !V.some((Y) => N(Y, k)));
    $.length > 0 &&
      console.warn(
        [
          `MUI: The value provided to ${d} is invalid.`,
          `None of the options match with \`${
            $.length > 1 ? JSON.stringify($) : JSON.stringify($[0])
          }\`.`,
          'You can use the `isOptionEqualToValue` prop to customize the equality test.',
        ].join(`
`),
      );
  }
  const we = pt(($) => {
    $ === -1 ? Z.current.focus() : ce.querySelector(`[data-tag-index="${$}"]`).focus();
  });
  b.useEffect(() => {
    I && me > W.length - 1 && (P(-1), we(-1));
  }, [W, I, me, we]);
  function U($, k) {
    if (!ie.current || $ === -1) return -1;
    let Y = $;
    for (;;) {
      if ((k === 'next' && Y === xe.length) || (k === 'previous' && Y === -1)) return -1;
      const ne = ie.current.querySelector(`[data-option-index="${Y}"]`),
        fe = g ? !1 : !ne || ne.disabled || ne.getAttribute('aria-disabled') === 'true';
      if ((ne && !ne.hasAttribute('tabindex')) || fe) Y += k === 'next' ? 1 : -1;
      else return Y;
    }
  }
  const ge = pt(({ event: $, index: k, reason: Y = 'auto' }) => {
      if (
        ((X.current = k),
        k === -1
          ? Z.current.removeAttribute('aria-activedescendant')
          : Z.current.setAttribute('aria-activedescendant', `${z}-option-${k}`),
        _ && _($, k === -1 ? null : xe[k], Y),
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
      if (k === -1) {
        fe.scrollTop = 0;
        return;
      }
      const be = ie.current.querySelector(`[data-option-index="${k}"]`);
      if (
        be &&
        (be.classList.add(`${o}-focused`),
        Y === 'keyboard' && be.classList.add(`${o}-focusVisible`),
        fe.scrollHeight > fe.clientHeight && Y !== 'mouse')
      ) {
        const ve = be,
          Se = fe.clientHeight + fe.scrollTop,
          Oe = ve.offsetTop + ve.offsetHeight;
        Oe > Se
          ? (fe.scrollTop = Oe - fe.clientHeight)
          : ve.offsetTop - ve.offsetHeight * (f ? 1.3 : 0) < fe.scrollTop &&
            (fe.scrollTop = ve.offsetTop - ve.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    Re = pt(({ event: $, diff: k, direction: Y = 'next', reason: ne = 'auto' }) => {
      if (!he) return;
      const be = U(
        (() => {
          const ve = xe.length - 1;
          if (k === 'reset') return Ce;
          if (k === 'start') return 0;
          if (k === 'end') return ve;
          const Se = X.current + k;
          return Se < 0
            ? Se === -1 && D
              ? -1
              : (m && X.current !== -1) || Math.abs(k) > 1
              ? 0
              : ve
            : Se > ve
            ? Se === ve + 1 && D
              ? -1
              : m || Math.abs(k) > 1
              ? ve
              : 0
            : Se;
        })(),
        Y,
      );
      if (
        (ge({
          index: be,
          reason: ne,
          event: $,
        }),
        r && k !== 'reset')
      )
        if (be === -1) Z.current.value = pe;
        else {
          const ve = H(xe[be]);
          (Z.current.value = ve),
            ve.toLowerCase().indexOf(pe.toLowerCase()) === 0 &&
              pe.length > 0 &&
              Z.current.setSelectionRange(pe.length, ve.length);
        }
    }),
    ft = () => {
      const $ = (k, Y) => {
        const ne = k ? H(k) : '',
          fe = Y ? H(Y) : '';
        return ne === fe;
      };
      if (
        X.current !== -1 &&
        Pe.filteredOptions &&
        Pe.filteredOptions.length !== xe.length &&
        (I
          ? W.length === Pe.value.length && Pe.value.every((k, Y) => H(W[Y]) === H(k))
          : $(Pe.value, W))
      ) {
        const k = Pe.filteredOptions[X.current];
        if (k && xe.some((ne) => H(ne) === H(k))) return !0;
      }
      return !1;
    },
    ht = b.useCallback(() => {
      if (!he || ft()) return;
      const $ = I ? W[0] : W;
      if (xe.length === 0 || $ == null) {
        Re({
          diff: 'reset',
        });
        return;
      }
      if (ie.current) {
        if ($ != null) {
          const k = xe[X.current];
          if (I && k && Yr(W, (ne) => N(k, ne)) !== -1) return;
          const Y = Yr(xe, (ne) => N(ne, $));
          Y === -1
            ? Re({
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
      C,
      Re,
      ge,
      he,
      pe,
      I,
    ]),
    st = pt(($) => {
      Yo(ie, $), $ && ht();
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
  const Et = ($) => {
      Fe || (Ze(!0), te(!0), q && q($));
    },
    xt = ($, k) => {
      Fe && (Ze(!1), j && j($, k));
    },
    Qe = ($, k, Y, ne) => {
      if (I) {
        if (W.length === k.length && W.every((fe, be) => fe === k[be])) return;
      } else if (W === k) return;
      J && J($, k, Y, ne), Te(k);
    },
    lt = b.useRef(!1),
    ut = ($, k, Y = 'selectOption', ne = 'options') => {
      let fe = Y,
        be = k;
      if (I) {
        if (((be = Array.isArray(W) ? W.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Se = be.filter((Oe) => N(k, Oe));
          Se.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${d} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Se.length} matches.`,
              ].join(`
`),
            );
        }
        const ve = Yr(be, (Se) => N(k, Se));
        ve === -1 ? be.push(k) : ne !== 'freeSolo' && (be.splice(ve, 1), (fe = 'removeOption'));
      }
      Ge($, be),
        Qe($, be, fe, {
          option: k,
        }),
        !h && (!$ || (!$.ctrlKey && !$.metaKey)) && xt($, fe),
        (s === !0 || (s === 'touch' && lt.current) || (s === 'mouse' && !lt.current)) &&
          Z.current.blur();
    };
  function Ht($, k) {
    if ($ === -1) return -1;
    let Y = $;
    for (;;) {
      if ((k === 'next' && Y === W.length) || (k === 'previous' && Y === -1)) return -1;
      const ne = ce.querySelector(`[data-tag-index="${Y}"]`);
      if (
        !ne ||
        !ne.hasAttribute('tabindex') ||
        ne.disabled ||
        ne.getAttribute('aria-disabled') === 'true'
      )
        Y += k === 'next' ? 1 : -1;
      else return Y;
    }
  }
  const qt = ($, k) => {
      if (!I) return;
      pe === '' && xt($, 'toggleInput');
      let Y = me;
      me === -1
        ? pe === '' && k === 'previous' && (Y = W.length - 1)
        : ((Y += k === 'next' ? 1 : -1), Y < 0 && (Y = 0), Y === W.length && (Y = -1)),
        (Y = Ht(Y, k)),
        P(Y),
        we(Y);
    },
    on = ($) => {
      (K.current = !0), $e(''), A && A($, '', 'clear'), Qe($, I ? [] : null, 'clear');
    },
    Ot = ($) => (k) => {
      if (
        ($.onKeyDown && $.onKeyDown(k),
        !k.defaultMuiPrevented &&
          (me !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(k.key) === -1 && (P(-1), we(-1)),
          k.which !== 229))
      )
        switch (k.key) {
          case 'Home':
            he &&
              S &&
              (k.preventDefault(),
              Re({
                diff: 'start',
                direction: 'next',
                reason: 'keyboard',
                event: k,
              }));
            break;
          case 'End':
            he &&
              S &&
              (k.preventDefault(),
              Re({
                diff: 'end',
                direction: 'previous',
                reason: 'keyboard',
                event: k,
              }));
            break;
          case 'PageUp':
            k.preventDefault(),
              Re({
                diff: -Es,
                direction: 'previous',
                reason: 'keyboard',
                event: k,
              }),
              Et(k);
            break;
          case 'PageDown':
            k.preventDefault(),
              Re({
                diff: Es,
                direction: 'next',
                reason: 'keyboard',
                event: k,
              }),
              Et(k);
            break;
          case 'ArrowDown':
            k.preventDefault(),
              Re({
                diff: 1,
                direction: 'next',
                reason: 'keyboard',
                event: k,
              }),
              Et(k);
            break;
          case 'ArrowUp':
            k.preventDefault(),
              Re({
                diff: -1,
                direction: 'previous',
                reason: 'keyboard',
                event: k,
              }),
              Et(k);
            break;
          case 'ArrowLeft':
            qt(k, 'previous');
            break;
          case 'ArrowRight':
            qt(k, 'next');
            break;
          case 'Enter':
            if (X.current !== -1 && he) {
              const Y = xe[X.current],
                ne = O ? O(Y) : !1;
              if ((k.preventDefault(), ne)) return;
              ut(k, Y, 'selectOption'),
                r && Z.current.setSelectionRange(Z.current.value.length, Z.current.value.length);
            } else
              T &&
                pe !== '' &&
                ye === !1 &&
                (I && k.preventDefault(), ut(k, pe, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            he
              ? (k.preventDefault(), k.stopPropagation(), xt(k, 'escape'))
              : c &&
                (pe !== '' || (I && W.length > 0)) &&
                (k.preventDefault(), k.stopPropagation(), on(k));
            break;
          case 'Backspace':
            if (I && !w && pe === '' && W.length > 0) {
              const Y = me === -1 ? W.length - 1 : me,
                ne = W.slice();
              ne.splice(Y, 1),
                Qe(k, ne, 'removeOption', {
                  option: W[Y],
                });
            }
            break;
          case 'Delete':
            if (I && !w && pe === '' && W.length > 0 && me !== -1) {
              const Y = me,
                ne = W.slice();
              ne.splice(Y, 1),
                Qe(k, ne, 'removeOption', {
                  option: W[Y],
                });
            }
            break;
        }
    },
    Yt = ($) => {
      Je(!0), Q && !K.current && Et($);
    },
    Kt = ($) => {
      if (t(ie)) {
        Z.current.focus();
        return;
      }
      Je(!1),
        (re.current = !0),
        (K.current = !1),
        a && X.current !== -1 && he
          ? ut($, xe[X.current], 'blur')
          : a && T && pe !== ''
          ? ut($, pe, 'blur', 'freeSolo')
          : l && Ge($, W),
        xt($, 'blur');
    },
    Ct = ($) => {
      const k = $.target.value;
      pe !== k && ($e(k), te(!1), A && A($, k, 'input')),
        k === '' ? !p && !I && Qe($, null, 'clear') : Et($);
    },
    hn = ($) => {
      const k = Number($.currentTarget.getAttribute('data-option-index'));
      X.current !== k &&
        ge({
          event: $,
          index: k,
          reason: 'mouse',
        });
    },
    rn = ($) => {
      ge({
        event: $,
        index: Number($.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (lt.current = !0);
    },
    Tt = ($) => {
      const k = Number($.currentTarget.getAttribute('data-option-index'));
      ut($, xe[k], 'selectOption'), (lt.current = !1);
    },
    Dt = ($) => (k) => {
      const Y = W.slice();
      Y.splice($, 1),
        Qe(k, Y, 'removeOption', {
          option: W[$],
        });
    },
    Gt = ($) => {
      Fe ? xt($, 'toggleInput') : Et($);
    },
    bn = ($) => {
      $.currentTarget.contains($.target) && $.target.getAttribute('id') !== z && $.preventDefault();
    },
    at = ($) => {
      $.currentTarget.contains($.target) &&
        (Z.current.focus(),
        L &&
          re.current &&
          Z.current.selectionEnd - Z.current.selectionStart === 0 &&
          Z.current.select(),
        (re.current = !1));
    },
    x = ($) => {
      (pe === '' || !Fe) && Gt($);
    };
  let F = T && pe.length > 0;
  F = F || (I ? W.length > 0 : W !== null);
  let le = xe;
  if (f) {
    const $ = /* @__PURE__ */ new Map();
    let k = !1;
    le = xe.reduce((Y, ne, fe) => {
      const be = f(ne);
      return (
        Y.length > 0 && Y[Y.length - 1].group === be
          ? Y[Y.length - 1].options.push(ne)
          : (process.env.NODE_ENV !== 'production' &&
              ($.get(be) &&
                !k &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${d} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                (k = !0)),
              $.set(be, !0)),
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
    y && je && Kt(),
    {
      getRootProps: ($ = {}) => ({
        'aria-owns': se ? `${z}-listbox` : null,
        ...$,
        onKeyDown: Ot($),
        onMouseDown: bn,
        onClick: at,
      }),
      getInputLabelProps: () => ({
        id: `${z}-label`,
        htmlFor: z,
      }),
      getInputProps: () => ({
        id: z,
        value: pe,
        onBlur: Kt,
        onFocus: Yt,
        onChange: Ct,
        onMouseDown: x,
        // if open then this is handled imperatively so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': he ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': se ? `${z}-listbox` : void 0,
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
        onClick: on,
      }),
      getPopupIndicatorProps: () => ({
        tabIndex: -1,
        onClick: Gt,
      }),
      getTagProps: ({ index: $ }) => ({
        key: $,
        'data-tag-index': $,
        tabIndex: -1,
        ...(!w && {
          onDelete: Dt($),
        }),
      }),
      getListboxProps: () => ({
        role: 'listbox',
        id: `${z}-listbox`,
        'aria-labelledby': `${z}-label`,
        ref: st,
        onMouseDown: ($) => {
          $.preventDefault();
        },
      }),
      getOptionProps: ({ index: $, option: k }) => {
        const Y = (I ? W : [W]).some((fe) => fe != null && N(k, fe)),
          ne = O ? O(k) : !1;
        return {
          key: H(k),
          tabIndex: -1,
          role: 'option',
          id: `${z}-option-${$}`,
          onMouseMove: hn,
          onClick: Tt,
          onTouchStart: rn,
          'data-option-index': $,
          'aria-disabled': ne,
          'aria-selected': Y,
        };
      },
      id: z,
      inputValue: pe,
      value: W,
      dirty: F,
      expanded: he && ce,
      popupOpen: he,
      focused: je || me !== -1,
      anchorEl: ce,
      setAnchorEl: ue,
      focusedTag: me,
      groupedOptions: le,
    }
  );
}
function ib(e) {
  return Ie('MuiSvgIcon', e);
}
Ne('MuiSvgIcon', [
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
const ab = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = {
        root: ['root', t !== 'inherit' && `color${oe(t)}`, `fontSize${oe(o)}`],
      };
    return _e(i, ib, r);
  },
  sb = de('svg', {
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
    var o, r, i, a, s, l, c, d, u, p, h, y, g, m, v, C, T;
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
                (C = (e.vars || e).palette) == null || (T = C.action) == null ? void 0 : T.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  qi = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
    const v = ab(g);
    return /* @__PURE__ */ Xe(sb, {
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
  (qi.propTypes = {
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
qi.muiName = 'SvgIcon';
const xs = qi;
function Xn(e, t) {
  function o(r, i) {
    return /* @__PURE__ */ M(xs, {
      'data-testid': `${t}Icon`,
      ref: i,
      ...r,
      children: e,
    });
  }
  return (
    process.env.NODE_ENV !== 'production' && (o.displayName = `${t}Icon`),
    (o.muiName = xs.muiName),
    /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(o))
  );
}
function Gl(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (o[i] = e[i]);
  return o;
}
function di(e, t) {
  return (
    (di = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    di(e, t)
  );
}
function Xl(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), di(e, t);
}
const Os = {
  disabled: !1,
};
var lb =
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
const rr = Ft.createContext(null);
var cb = function (t) {
    return t.scrollTop;
  },
  co = 'unmounted',
  gn = 'exited',
  yn = 'entering',
  An = 'entered',
  pi = 'exiting',
  ln = /* @__PURE__ */ (function (e) {
    Xl(t, e);
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
          ? (c = co)
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
      return s && a.status === co
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
          this.props.in ? s !== yn && s !== An && (a = yn) : (s === yn || s === An) && (a = pi);
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
              var s = this.props.nodeRef ? this.props.nodeRef.current : No.findDOMNode(this);
              s && cb(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === gn &&
            this.setState({
              status: co,
            });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [No.findDOMNode(this), l],
          d = c[0],
          u = c[1],
          p = this.getTimeouts(),
          h = l ? p.appear : p.enter;
        if ((!i && !s) || Os.disabled) {
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
          l = this.props.nodeRef ? void 0 : No.findDOMNode(this);
        if (!a || Os.disabled) {
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
              status: pi,
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : No.findDOMNode(this),
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
        if (i === co) return null;
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
        var l = Gl(a, [
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
            rr.Provider,
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
ln.contextType = rr;
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
          var o = lb;
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
ln.UNMOUNTED = co;
ln.EXITED = gn;
ln.ENTERING = yn;
ln.ENTERED = An;
ln.EXITING = pi;
const Jl = ln;
function ub(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Yi(e, t) {
  var o = function (a) {
      return t && Vo(a) ? t(a) : a;
    },
    r = /* @__PURE__ */ Object.create(null);
  return (
    e &&
      lu
        .map(e, function (i) {
          return i;
        })
        .forEach(function (i) {
          r[i.key] = o(i);
        }),
    r
  );
}
function db(e, t) {
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
function pb(e, t) {
  return Yi(e.children, function (o) {
    return zo(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: En(o, 'appear', e),
      enter: En(o, 'enter', e),
      exit: En(o, 'exit', e),
    });
  });
}
function fb(e, t, o) {
  var r = Yi(e.children),
    i = db(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (Vo(s)) {
        var l = a in t,
          c = a in r,
          d = t[a],
          u = Vo(d) && !d.props.in;
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
            Vo(d) &&
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
var mb =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  hb = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  Ki = /* @__PURE__ */ (function (e) {
    Xl(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = a.handleExited.bind(ub(a));
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
          children: c ? pb(i, l) : fb(i, s, l),
          firstRender: !1,
        };
      }),
      (o.handleExited = function (i, a) {
        var s = Yi(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(a),
          this.mounted &&
            this.setState(function (l) {
              var c = Ko({}, l.children);
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
          l = Gl(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          d = mb(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? /* @__PURE__ */ Ft.createElement(
                rr.Provider,
                {
                  value: c,
                },
                d,
              )
            : /* @__PURE__ */ Ft.createElement(
                rr.Provider,
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
Ki.propTypes =
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
Ki.defaultProps = hb;
const bb = Ki,
  Zl = (e) => e.scrollTop;
function ir(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function vb(e) {
  return Ie('MuiPaper', e);
}
Ne('MuiPaper', [
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
const gb = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = {
        root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`],
      };
    return _e(a, vb, i);
  },
  yb = de('div', {
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
            backgroundImage: `linear-gradient(${Ye('#fff', es(t.elevation))}, ${Ye(
              '#fff',
              es(t.elevation),
            )})`,
          }),
        ...(e.vars && {
          backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation],
        }),
      }),
    };
  }),
  Ql = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
      p = gb(u);
    return (
      process.env.NODE_ENV !== 'production' &&
        Gn().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      /* @__PURE__ */ M(yb, {
        as: a,
        ownerState: u,
        className: Ee(p.root, i),
        ref: o,
        ...d,
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ql.propTypes = {
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
    elevation: Bt(xi, (e) => {
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
const ko = Ql;
function ec(e) {
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
  (ec.propTypes = {
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
const Eb = Ne('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  It = Eb;
let Nr = (e) => e,
  Cs,
  Ts,
  Rs,
  Ss;
const fi = 550,
  xb = 80,
  Ob = Pi(
    Cs ||
      (Cs = Nr`
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
  Cb = Pi(
    Ts ||
      (Ts = Nr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  Tb = Pi(
    Rs ||
      (Rs = Nr`
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
  Rb = de('span', {
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
  Sb = de(ec, {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  })(
    Ss ||
      (Ss = Nr`
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
    Ob,
    fi,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    It.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    It.child,
    It.childLeaving,
    Cb,
    fi,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    It.childPulsate,
    Tb,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  tc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
          const { pulsate: f, rippleX: S, rippleY: R, rippleSize: D, cb: B } = E;
          d((N) => [
            ...N,
            /* @__PURE__ */ M(
              Sb,
              {
                classes: {
                  ripple: Ee(a.ripple, It.ripple),
                  rippleVisible: Ee(a.rippleVisible, It.rippleVisible),
                  ripplePulsate: Ee(a.ripplePulsate, It.ripplePulsate),
                  child: Ee(a.child, It.child),
                  childLeaving: Ee(a.childLeaving, It.childLeaving),
                  childPulsate: Ee(a.childPulsate, It.childPulsate),
                },
                timeout: fi,
                pulsate: f,
                rippleX: S,
                rippleY: R,
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
      C = b.useCallback(
        (E = {}, f = {}, S = () => {}) => {
          const {
            pulsate: R = !1,
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
                  pulsate: R,
                  rippleX: J,
                  rippleY: j,
                  rippleSize: _,
                  cb: S,
                });
              }),
              (y.current = setTimeout(() => {
                g.current && (g.current(), (g.current = null));
              }, xb)))
            : v({
                pulsate: R,
                rippleX: J,
                rippleY: j,
                rippleSize: _,
                cb: S,
              });
        },
        [i, v],
      ),
      T = b.useCallback(() => {
        C(
          {},
          {
            pulsate: !0,
          },
        );
      }, [C]),
      O = b.useCallback((E, f) => {
        if ((clearTimeout(y.current), (E == null ? void 0 : E.type) === 'touchend' && g.current)) {
          g.current(),
            (g.current = null),
            (y.current = setTimeout(() => {
              O(E, f);
            }));
          return;
        }
        (g.current = null), d((S) => (S.length > 0 ? S.slice(1) : S)), (p.current = f);
      }, []);
    return (
      b.useImperativeHandle(
        o,
        () => ({
          pulsate: T,
          start: C,
          stop: O,
        }),
        [T, C, O],
      ),
      /* @__PURE__ */ M(Rb, {
        className: Ee(It.root, a.root, s),
        ref: m,
        ...l,
        children: /* @__PURE__ */ M(bb, {
          component: null,
          exit: !0,
          children: c,
        }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (tc.propTypes = {
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
const wb = tc;
function $b(e) {
  return Ie('MuiButtonBase', e);
}
const kb = Ne('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  Nb = kb,
  Pb = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = _e(
        {
          root: ['root', t && 'disabled', o && 'focusVisible'],
        },
        $b,
        i,
      );
    return o && r && (s.root += ` ${r}`), s;
  },
  Ib = de('button', {
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
    [`&.${Nb.disabled}`]: {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
  }),
  nc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
        onContextMenu: C,
        onDragLeave: T,
        onFocus: O,
        onFocusVisible: E,
        onKeyDown: f,
        onKeyUp: S,
        onMouseDown: R,
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
      V = b.useRef(null),
      w = rt(V, A),
      { isFocusVisibleRef: L, onFocus: G, onBlur: z, ref: H } = al(),
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
      K && h && !u && Z && V.current.pulsate();
    }, [u, h, K, Z]);
    function ue(se, we, U = p) {
      return pt((ge) => (we && we(ge), !U && V.current && V.current[se](ge), !0));
    }
    const me = ue('start', R),
      P = ue('stop', C),
      Ce = ue('stop', T),
      X = ue('stop', B),
      W = ue('stop', (se) => {
        K && se.preventDefault(), D && D(se);
      }),
      Te = ue('start', J),
      pe = ue('stop', N),
      $e = ue('stop', I),
      je = ue(
        'stop',
        (se) => {
          z(se), L.current === !1 && re(!1), m && m(se);
        },
        !1,
      ),
      Je = pt((se) => {
        Q.current || (Q.current = se.currentTarget),
          G(se),
          L.current === !0 && (re(!0), E && E(se)),
          O && O(se);
      }),
      Ge = () => {
        const se = Q.current;
        return c && c !== 'button' && !(se.tagName === 'A' && se.href);
      },
      Fe = b.useRef(!1),
      Ze = pt((se) => {
        h &&
          !Fe.current &&
          K &&
          V.current &&
          se.key === ' ' &&
          ((Fe.current = !0),
          V.current.stop(se, () => {
            V.current.start(se);
          })),
          se.target === se.currentTarget && Ge() && se.key === ' ' && se.preventDefault(),
          f && f(se),
          se.target === se.currentTarget &&
            Ge() &&
            se.key === 'Enter' &&
            !d &&
            (se.preventDefault(), v && v(se));
      }),
      ee = pt((se) => {
        h &&
          se.key === ' ' &&
          V.current &&
          K &&
          !se.defaultPrevented &&
          ((Fe.current = !1),
          V.current.stop(se, () => {
            V.current.pulsate(se);
          })),
          S && S(se),
          v &&
            se.target === se.currentTarget &&
            Ge() &&
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
    const he = rt(o, H, Q);
    process.env.NODE_ENV !== 'production' &&
      b.useEffect(() => {
        ce &&
          !V.current &&
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
      Pe = Pb(xe);
    return /* @__PURE__ */ Xe(Ib, {
      as: te,
      className: Ee(Pe.root, l),
      ownerState: xe,
      onBlur: je,
      onClick: v,
      onContextMenu: P,
      onFocus: Je,
      onKeyDown: Ze,
      onKeyUp: ee,
      onMouseDown: me,
      onMouseLeave: W,
      onMouseUp: X,
      onDragLeave: Ce,
      onTouchEnd: pe,
      onTouchMove: $e,
      onTouchStart: Te,
      ref: he,
      tabIndex: d ? -1 : j,
      type: q,
      ...ye,
      ...ae,
      children: [
        s,
        ce
          ? /* TouchRipple is only needed client-side, x2 boost on the server. */
            /* @__PURE__ */ M(wb, {
              ref: w,
              center: a,
              ..._,
            })
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (nc.propTypes = {
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
    component: yi,
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
const Hn = nc;
function Mb(e) {
  return Ie('MuiIconButton', e);
}
const _b = Ne('MuiIconButton', [
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
  Ab = _b,
  Db = (e) => {
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
    return _e(s, Mb, t);
  },
  Lb = de(Hn, {
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
            : Ye(e.palette.action.active, e.palette.action.hoverOpacity),
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
                    : Ye(r.main, e.palette.action.hoverOpacity),
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
        [`&.${Ab.disabled}`]: {
          backgroundColor: 'transparent',
          color: (e.vars || e).palette.action.disabled,
        },
      };
    },
  ),
  oc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
      y = Db(h);
    return /* @__PURE__ */ M(Lb, {
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
  (oc.propTypes = {
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
const rc = oc,
  jb = Xn(
    /* @__PURE__ */ M('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  Fb = de(Mh, {
    name: 'MuiPopper',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  ic = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r;
    const i = kl(),
      a = Le({
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
        popperRef: C,
        transition: T,
        slots: O,
        slotProps: E,
        ...f
      } = a,
      S = (r = O == null ? void 0 : O.root) != null ? r : c == null ? void 0 : c.Root,
      R = {
        anchorEl: s,
        container: u,
        disablePortal: p,
        keepMounted: h,
        modifiers: y,
        open: g,
        placement: m,
        popperOptions: v,
        popperRef: C,
        transition: T,
        ...f,
      };
    return /* @__PURE__ */ M(Fb, {
      as: l,
      direction: i == null ? void 0 : i.direction,
      slots: {
        root: S,
      },
      slotProps: E ?? d,
      ...R,
      ref: o,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (ic.propTypes = {
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
    anchorEl: n.oneOfType([en, n.object, n.func]),
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
    container: n.oneOfType([en, n.func]),
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
const ac = ic;
function Vb(e) {
  return Ie('MuiListSubheader', e);
}
Ne('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const zb = (e) => {
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
    return _e(s, Vb, t);
  },
  Bb = de('li', {
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
  Gi = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
      h = zb(p);
    return /* @__PURE__ */ M(Bb, {
      as: s,
      className: Ee(h.root, i),
      ref: o,
      ownerState: p,
      ...u,
    });
  });
Gi.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (Gi.propTypes = {
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
const Ub = Gi,
  Wb = Xn(
    /* @__PURE__ */ M('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function Hb(e) {
  return Ie('MuiChip', e);
}
const qb = Ne('MuiChip', [
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
  Me = qb,
  Yb = (e) => {
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
    return _e(d, Hb, t);
  },
  Kb = de('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: i, clickable: a, onDelete: s, size: l, variant: c } = o;
      return [
        {
          [`& .${Me.avatar}`]: t.avatar,
        },
        {
          [`& .${Me.avatar}`]: t[`avatar${oe(l)}`],
        },
        {
          [`& .${Me.avatar}`]: t[`avatarColor${oe(r)}`],
        },
        {
          [`& .${Me.icon}`]: t.icon,
        },
        {
          [`& .${Me.icon}`]: t[`icon${oe(l)}`],
        },
        {
          [`& .${Me.icon}`]: t[`iconColor${oe(i)}`],
        },
        {
          [`& .${Me.deleteIcon}`]: t.deleteIcon,
        },
        {
          [`& .${Me.deleteIcon}`]: t[`deleteIcon${oe(l)}`],
        },
        {
          [`& .${Me.deleteIcon}`]: t[`deleteIconColor${oe(r)}`],
        },
        {
          [`& .${Me.deleteIcon}`]: t[`deleteIcon${oe(c)}Color${oe(r)}`],
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
        [`&.${Me.disabled}`]: {
          opacity: (e.vars || e).palette.action.disabledOpacity,
          pointerEvents: 'none',
        },
        [`& .${Me.avatar}`]: {
          marginLeft: 5,
          marginRight: -6,
          width: 24,
          height: 24,
          color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : o,
          fontSize: e.typography.pxToRem(12),
        },
        [`& .${Me.avatarColorPrimary}`]: {
          color: (e.vars || e).palette.primary.contrastText,
          backgroundColor: (e.vars || e).palette.primary.dark,
        },
        [`& .${Me.avatarColorSecondary}`]: {
          color: (e.vars || e).palette.secondary.contrastText,
          backgroundColor: (e.vars || e).palette.secondary.dark,
        },
        [`& .${Me.avatarSmall}`]: {
          marginLeft: 4,
          marginRight: -4,
          width: 18,
          height: 18,
          fontSize: e.typography.pxToRem(10),
        },
        [`& .${Me.icon}`]: {
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
        [`& .${Me.deleteIcon}`]: {
          WebkitTapHighlightColor: 'transparent',
          color: e.vars
            ? `rgba(${e.vars.palette.text.primaryChannel} / 0.26)`
            : Ye(e.palette.text.primary, 0.26),
          fontSize: 22,
          cursor: 'pointer',
          margin: '0 5px 0 -6px',
          '&:hover': {
            color: e.vars
              ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)`
              : Ye(e.palette.text.primary, 0.4),
          },
          ...(t.size === 'small' && {
            fontSize: 16,
            marginRight: 4,
            marginLeft: -4,
          }),
          ...(t.color !== 'default' && {
            color: e.vars
              ? `rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`
              : Ye(e.palette[t.color].contrastText, 0.7),
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
          [`&.${Me.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Ye(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        }),
        ...(t.onDelete &&
          t.color !== 'default' && {
            [`&.${Me.focusVisible}`]: {
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
            : Ye(
                e.palette.action.selected,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
        },
        [`&.${Me.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : Ye(
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
          [`&:hover, &.${Me.focusVisible}`]: {
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
        [`&.${Me.clickable}:hover`]: {
          backgroundColor: (e.vars || e).palette.action.hover,
        },
        [`&.${Me.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus,
        },
        [`& .${Me.avatar}`]: {
          marginLeft: 4,
        },
        [`& .${Me.avatarSmall}`]: {
          marginLeft: 2,
        },
        [`& .${Me.icon}`]: {
          marginLeft: 4,
        },
        [`& .${Me.iconSmall}`]: {
          marginLeft: 2,
        },
        [`& .${Me.deleteIcon}`]: {
          marginRight: 5,
        },
        [`& .${Me.deleteIconSmall}`]: {
          marginRight: 3,
        },
      }),
      ...(t.variant === 'outlined' &&
        t.color !== 'default' && {
          color: (e.vars || e).palette[t.color].main,
          border: `1px solid ${
            e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
              : Ye(e.palette[t.color].main, 0.7)
          }`,
          [`&.${Me.clickable}:hover`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                  e.vars.palette.action.hoverOpacity
                })`
              : Ye(e.palette[t.color].main, e.palette.action.hoverOpacity),
          },
          [`&.${Me.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                  e.vars.palette.action.focusOpacity
                })`
              : Ye(e.palette[t.color].main, e.palette.action.focusOpacity),
          },
          [`& .${Me.deleteIcon}`]: {
            color: e.vars
              ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
              : Ye(e.palette[t.color].main, 0.7),
            '&:hover, &:active': {
              color: (e.vars || e).palette[t.color].main,
            },
          },
        }),
    }),
  ),
  Gb = de('span', {
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
function ws(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const sc = /* @__PURE__ */ b.forwardRef(function (t, o) {
  const r = Le({
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
      size: C = 'medium',
      variant: T = 'filled',
      tabIndex: O,
      skipFocusWhenDisabled: E = !1,
      // TODO v6: Rename to `focusableWhenDisabled`.
      ...f
    } = r,
    S = b.useRef(null),
    R = rt(S, o),
    D = (V) => {
      V.stopPropagation(), g && g(V);
    },
    B = (V) => {
      V.currentTarget === V.target && ws(V) && V.preventDefault(), m && m(V);
    },
    N = (V) => {
      V.currentTarget === V.target &&
        (g && ws(V) ? g(V) : V.key === 'Escape' && S.current && S.current.blur()),
        v && v(V);
    },
    I = s !== !1 && y ? !0 : s,
    J = I || g ? Hn : c || 'div',
    j = {
      ...r,
      component: J,
      disabled: u,
      size: C,
      color: l,
      iconColor: /* @__PURE__ */ (b.isValidElement(p) && p.props.color) || l,
      onDelete: !!g,
      clickable: I,
      variant: T,
    },
    _ = Yb(j),
    A =
      J === Hn
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
        : /* @__PURE__ */ M(Wb, {
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
    /* @__PURE__ */ Xe(Kb, {
      as: J,
      className: Ee(_.root, a),
      disabled: I && u ? !0 : void 0,
      onClick: y,
      onKeyDown: B,
      onKeyUp: N,
      ref: R,
      tabIndex: E && u ? -1 : O,
      ownerState: j,
      ...A,
      ...f,
      children: [
        ae || Q,
        /* @__PURE__ */ M(Gb, {
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
  (sc.propTypes = {
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
    children: Wu,
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
const Xb = sc;
function Jn({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const lc = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== 'production' && (lc.displayName = 'FormControlContext');
const Xi = lc;
function Sn() {
  return b.useContext(Xi);
}
function cc(e) {
  return /* @__PURE__ */ M(Nl, {
    ...e,
    defaultTheme: Sr,
    themeId: lr,
  });
}
process.env.NODE_ENV !== 'production' &&
  (cc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The styles you want to apply globally.
     */
    styles: n.oneOfType([n.array, n.func, n.number, n.object, n.string, n.bool]),
  });
function $s(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function ar(e, t = !1) {
  return (
    e && (($s(e.value) && e.value !== '') || (t && $s(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Jb(e) {
  return e.startAdornment;
}
function Zb(e) {
  return Ie('MuiInputBase', e);
}
const Qb = Ne('MuiInputBase', [
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
  Rt = Qb,
  Pr = (e, t) => {
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
  Ir = (e, t) => {
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
  ev = (e) => {
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
    return _e(m, Zb, t);
  },
  Mr = de('div', {
    name: 'MuiInputBase',
    slot: 'Root',
    overridesResolver: Pr,
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
    [`&.${Rt.disabled}`]: {
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
  _r = de('input', {
    name: 'MuiInputBase',
    slot: 'Input',
    overridesResolver: Ir,
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
      [`label[data-shrink=false] + .${Rt.formControl} &`]: {
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
      [`&.${Rt.disabled}`]: {
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
  tv = /* @__PURE__ */ M(cc, {
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
  uc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r;
    const i = Le({
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
        fullWidth: C = !1,
        id: T,
        inputComponent: O = 'input',
        inputProps: E = {},
        inputRef: f,
        margin: S,
        maxRows: R,
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
        renderSuffix: V,
        rows: w,
        size: L,
        slotProps: G = {},
        slots: z = {},
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
      P = rt(ue, f, E.ref, me),
      [Ce, X] = b.useState(!1),
      W = Sn();
    process.env.NODE_ENV !== 'production' &&
      b.useEffect(() => {
        if (W) return W.registerEffect();
      }, [W]);
    const Te = Jn({
      props: i,
      muiFormControl: W,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (Te.focused = W ? W.focused : Ce),
      b.useEffect(() => {
        !W && y && Ce && (X(!1), I && I());
      }, [W, y, Ce, I]);
    const pe = W && W.onFilled,
      $e = W && W.onEmpty,
      je = b.useCallback(
        (U) => {
          ar(U) ? pe && pe() : $e && $e();
        },
        [pe, $e],
      );
    tn(() => {
      ce &&
        je({
          value: ie,
        });
    }, [ie, je, ce]);
    const Je = (U) => {
        if (Te.disabled) {
          U.stopPropagation();
          return;
        }
        _ && _(U), E.onFocus && E.onFocus(U), W && W.onFocus ? W.onFocus(U) : X(!0);
      },
      Ge = (U) => {
        I && I(U), E.onBlur && E.onBlur(U), W && W.onBlur ? W.onBlur(U) : X(!1);
      },
      Fe = (U, ...ge) => {
        if (!ce) {
          const Re = U.target || ue.current;
          if (Re == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : pn(1),
            );
          je({
            value: Re.value,
          });
        }
        E.onChange && E.onChange(U, ...ge), J && J(U, ...ge);
      };
    b.useEffect(() => {
      je(ue.current);
    }, []);
    const Ze = (U) => {
      ue.current && U.currentTarget === U.target && ue.current.focus(), j && !Te.disabled && j(U);
    };
    let ee = O,
      te = E;
    B &&
      ee === 'input' &&
      (w
        ? (process.env.NODE_ENV !== 'production' &&
            (D || R) &&
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
            maxRows: R,
            minRows: D,
            ...te,
          }),
      (ee = eb));
    const ye = (U) => {
      je(
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
        color: Te.color || 'primary',
        disabled: Te.disabled,
        endAdornment: m,
        error: Te.error,
        focused: Te.focused,
        formControl: W,
        fullWidth: C,
        hiddenLabel: Te.hiddenLabel,
        multiline: B,
        size: Te.size,
        startAdornment: H,
        type: K,
      },
      xe = ev(he),
      Pe = z.root || u.Root || Mr,
      se = G.root || p.root || {},
      we = z.input || u.Input || _r;
    return (
      (te = {
        ...te,
        ...((r = G.input) != null ? r : p.input),
      }),
      /* @__PURE__ */ Xe(b.Fragment, {
        children: [
          !g && tv,
          /* @__PURE__ */ Xe(Pe, {
            ...se,
            ...(!dn(Pe) && {
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
              /* @__PURE__ */ M(Xi.Provider, {
                value: null,
                children: /* @__PURE__ */ M(we, {
                  ownerState: he,
                  'aria-invalid': Te.error,
                  'aria-describedby': a,
                  autoComplete: s,
                  autoFocus: l,
                  defaultValue: h,
                  disabled: Te.disabled,
                  id: T,
                  onAnimationStart: ye,
                  name: N,
                  placeholder: ae,
                  readOnly: Q,
                  required: Te.required,
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
                  onBlur: Ge,
                  onChange: Fe,
                  onFocus: Je,
                }),
              }),
              m,
              V
                ? V({
                    ...Te,
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
  (uc.propTypes = {
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
    inputComponent: yi,
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
const Ji = uc;
function nv(e) {
  return Ie('MuiInput', e);
}
const ov = {
    ...Rt,
    ...Ne('MuiInput', ['root', 'underline', 'input']),
  },
  un = ov;
function rv(e) {
  return Ie('MuiOutlinedInput', e);
}
const iv = {
    ...Rt,
    ...Ne('MuiOutlinedInput', ['root', 'notchedOutline', 'input']),
  },
  Xt = iv;
function av(e) {
  return Ie('MuiFilledInput', e);
}
const sv = {
    ...Rt,
    ...Ne('MuiFilledInput', ['root', 'underline', 'input']),
  },
  St = sv,
  dc = Xn(
    /* @__PURE__ */ M('path', {
      d: 'M7 10l5 5 5-5z',
    }),
    'ArrowDropDown',
  );
function lv(e) {
  return Ie('MuiAutocomplete', e);
}
const cv = Ne('MuiAutocomplete', [
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
  ke = cv;
var ks, Ns;
const uv = (e) => {
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
    return _e(p, lv, t);
  },
  dv = de('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: i, hasPopupIcon: a, inputFocused: s, size: l } = o;
      return [
        {
          [`& .${ke.tag}`]: t.tag,
        },
        {
          [`& .${ke.tag}`]: t[`tagSize${oe(l)}`],
        },
        {
          [`& .${ke.inputRoot}`]: t.inputRoot,
        },
        {
          [`& .${ke.input}`]: t.input,
        },
        {
          [`& .${ke.input}`]: s && t.inputFocused,
        },
        t.root,
        r && t.fullWidth,
        a && t.hasPopupIcon,
        i && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) => ({
    [`&.${ke.focused} .${ke.clearIndicator}`]: {
      visibility: 'visible',
    },
    /* Avoid double tap issue on iOS */
    '@media (pointer: fine)': {
      [`&:hover .${ke.clearIndicator}`]: {
        visibility: 'visible',
      },
    },
    ...(e.fullWidth && {
      width: '100%',
    }),
    [`& .${ke.tag}`]: {
      margin: 3,
      maxWidth: 'calc(100% - 6px)',
      ...(e.size === 'small' && {
        margin: 2,
        maxWidth: 'calc(100% - 4px)',
      }),
    },
    [`& .${ke.inputRoot}`]: {
      flexWrap: 'wrap',
      [`.${ke.hasPopupIcon}&, .${ke.hasClearIcon}&`]: {
        paddingRight: 26 + 4,
      },
      [`.${ke.hasPopupIcon}.${ke.hasClearIcon}&`]: {
        paddingRight: 52 + 4,
      },
      [`& .${ke.input}`]: {
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
    [`& .${un.root}.${Rt.sizeSmall}`]: {
      [`& .${un.input}`]: {
        padding: '2px 4px 3px 0',
      },
    },
    [`& .${Xt.root}`]: {
      padding: 9,
      [`.${ke.hasPopupIcon}&, .${ke.hasClearIcon}&`]: {
        paddingRight: 26 + 4 + 9,
      },
      [`.${ke.hasPopupIcon}.${ke.hasClearIcon}&`]: {
        paddingRight: 52 + 4 + 9,
      },
      [`& .${ke.input}`]: {
        padding: '7.5px 4px 7.5px 5px',
      },
      [`& .${ke.endAdornment}`]: {
        right: 9,
      },
    },
    [`& .${Xt.root}.${Rt.sizeSmall}`]: {
      // Don't specify paddingRight, as it overrides the default value set when there is only
      // one of the popup or clear icon as the specificity is equal so the latter one wins
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 6,
      [`& .${ke.input}`]: {
        padding: '2.5px 4px 2.5px 8px',
      },
    },
    [`& .${St.root}`]: {
      paddingTop: 19,
      paddingLeft: 8,
      [`.${ke.hasPopupIcon}&, .${ke.hasClearIcon}&`]: {
        paddingRight: 26 + 4 + 9,
      },
      [`.${ke.hasPopupIcon}.${ke.hasClearIcon}&`]: {
        paddingRight: 52 + 4 + 9,
      },
      [`& .${St.input}`]: {
        padding: '7px 4px',
      },
      [`& .${ke.endAdornment}`]: {
        right: 9,
      },
    },
    [`& .${St.root}.${Rt.sizeSmall}`]: {
      paddingBottom: 1,
      [`& .${St.input}`]: {
        padding: '2.5px 4px',
      },
    },
    [`& .${Rt.hiddenLabel}`]: {
      paddingTop: 8,
    },
    [`& .${St.root}.${Rt.hiddenLabel}`]: {
      paddingTop: 0,
      paddingBottom: 0,
      [`& .${ke.input}`]: {
        paddingTop: 16,
        paddingBottom: 17,
      },
    },
    [`& .${St.root}.${Rt.hiddenLabel}.${Rt.sizeSmall}`]: {
      [`& .${ke.input}`]: {
        paddingTop: 8,
        paddingBottom: 9,
      },
    },
    [`& .${ke.input}`]: {
      flexGrow: 1,
      textOverflow: 'ellipsis',
      opacity: 0,
      ...(e.inputFocused && {
        opacity: 1,
      }),
    },
  })),
  pv = de('div', {
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
  fv = de(rc, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  }),
  mv = de(rc, {
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
  hv = de(ac, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${ke.option}`]: t.option,
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
  bv = de(ko, {
    name: 'MuiAutocomplete',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })(({ theme: e }) => ({
    ...e.typography.body1,
    overflow: 'auto',
  })),
  vv = de('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  gv = de('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  yv = de('div', {
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
    [`& .${ke.option}`]: {
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
      [`&.${ke.focused}`]: {
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
      [`&.${ke.focusVisible}`]: {
        backgroundColor: (e.vars || e).palette.action.focus,
      },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : Ye(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${ke.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : Ye(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: (e.vars || e).palette.action.selected,
          },
        },
        [`&.${ke.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : Ye(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
              ),
        },
      },
    },
  })),
  Ev = de(Ub, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({
    backgroundColor: (e.vars || e).palette.background.paper,
    top: -8,
  })),
  xv = de('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({
    padding: 0,
    [`& .${ke.option}`]: {
      paddingLeft: 24,
    },
  }),
  pc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Le({
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
        clearIcon: g = ks ||
          (ks = /* @__PURE__ */ M(jb, {
            fontSize: 'small',
          })),
        clearOnBlur: m = !l.freeSolo,
        clearOnEscape: v = !1,
        clearText: C = 'Clear',
        closeText: T = 'Close',
        componentsProps: O = {},
        defaultValue: E = l.multiple ? [] : null,
        disableClearable: f = !1,
        disableCloseOnSelect: S = !1,
        disabled: R = !1,
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
          var Ve;
          return (Ve = Oe.label) != null ? Ve : Oe;
        },
        isOptionEqualToValue: V,
        groupBy: w,
        handleHomeEndKeys: L = !l.freeSolo,
        id: G,
        includeInputInList: z = !1,
        inputValue: H,
        limitTags: K = -1,
        ListboxComponent: re = 'ul',
        ListboxProps: Z,
        loading: ie = !1,
        loadingText: ce = 'Loading…',
        multiple: ue = !1,
        noOptionsText: me = 'No options',
        onChange: P,
        onClose: Ce,
        onHighlightChange: X,
        onInputChange: W,
        onOpen: Te,
        open: pe,
        openOnFocus: $e = !1,
        openText: je = 'Open',
        options: Je,
        PaperComponent: Ge = ko,
        PopperComponent: Fe = ac,
        popupIcon: Ze = Ns || (Ns = /* @__PURE__ */ M(dc, {})),
        readOnly: ee = !1,
        renderGroup: te,
        renderInput: ye,
        renderOption: he,
        renderTags: xe,
        selectOnFocus: Pe = !l.freeSolo,
        size: se = 'medium',
        slotProps: we = {},
        value: U,
        ...ge
      } = l,
      {
        getRootProps: Re,
        getInputProps: ft,
        getInputLabelProps: ht,
        getPopupIndicatorProps: st,
        getClearProps: Et,
        getTagProps: xt,
        getListboxProps: Qe,
        getOptionProps: lt,
        value: ut,
        dirty: Ht,
        expanded: qt,
        id: on,
        popupOpen: Ot,
        focused: Yt,
        focusedTag: Kt,
        anchorEl: Ct,
        setAnchorEl: hn,
        inputValue: rn,
        groupedOptions: Tt,
      } = rb({
        ...l,
        componentName: 'Autocomplete',
      }),
      Dt = !f && !R && Ht && !ee,
      Gt = (!_ || j === !0) && j !== !1,
      { onMouseDown: bn } = ft(),
      at = {
        ...l,
        disablePortal: N,
        expanded: qt,
        focused: Yt,
        fullWidth: A,
        hasClearIcon: Dt,
        hasPopupIcon: Gt,
        inputFocused: Kt === -1,
        popupOpen: Ot,
        size: se,
      },
      x = uv(at);
    let F;
    if (ue && ut.length > 0) {
      const Oe = (Ve) => ({
        className: x.tag,
        disabled: R,
        ...xt(Ve),
      });
      xe
        ? (F = xe(ut, Oe, at))
        : (F = ut.map((Ve, an) =>
            /* @__PURE__ */ M(Xb, {
              label: Q(Ve),
              size: se,
              ...Oe({
                index: an,
              }),
              ...h,
            }),
          ));
    }
    if (K > -1 && Array.isArray(F)) {
      const Oe = F.length - K;
      !Yt &&
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
    const $ =
        te ||
        ((Oe) =>
          /* @__PURE__ */ Xe(
            'li',
            {
              children: [
                /* @__PURE__ */ M(Ev, {
                  className: x.groupLabel,
                  ownerState: at,
                  component: 'div',
                  children: Oe.group,
                }),
                /* @__PURE__ */ M(xv, {
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
        ((Oe, Ve) =>
          /* @__PURE__ */ M('li', {
            ...Oe,
            children: Q(Ve),
          })),
      ne = (Oe, Ve) => {
        const an = lt({
          option: Oe,
          index: Ve,
        });
        return Y(
          {
            ...an,
            className: x.option,
          },
          Oe,
          {
            selected: an['aria-selected'],
            index: Ve,
            inputValue: rn,
          },
        );
      },
      fe = (r = we.clearIndicator) != null ? r : O.clearIndicator,
      be = (i = we.paper) != null ? i : O.paper,
      ve = (a = we.popper) != null ? a : O.popper,
      Se = (s = we.popupIndicator) != null ? s : O.popupIndicator;
    return /* @__PURE__ */ Xe(b.Fragment, {
      children: [
        /* @__PURE__ */ M(dv, {
          ref: o,
          className: Ee(x.root, y),
          ownerState: at,
          ...Re(ge),
          children: ye({
            id: on,
            disabled: R,
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
              ...((Dt || Gt) && {
                endAdornment: /* @__PURE__ */ Xe(pv, {
                  className: x.endAdornment,
                  ownerState: at,
                  children: [
                    Dt
                      ? /* @__PURE__ */ M(fv, {
                          ...Et(),
                          'aria-label': C,
                          title: C,
                          ownerState: at,
                          ...fe,
                          className: Ee(x.clearIndicator, fe == null ? void 0 : fe.className),
                          children: g,
                        })
                      : null,
                    Gt
                      ? /* @__PURE__ */ M(mv, {
                          ...st(),
                          disabled: R,
                          'aria-label': Ot ? T : je,
                          title: Ot ? T : je,
                          ownerState: at,
                          ...Se,
                          className: Ee(x.popupIndicator, Se == null ? void 0 : Se.className),
                          children: Ze,
                        })
                      : null,
                  ],
                }),
              }),
            },
            inputProps: {
              className: x.input,
              disabled: R,
              readOnly: ee,
              ...ft(),
            },
          }),
        }),
        Ct
          ? /* @__PURE__ */ M(hv, {
              as: Fe,
              disablePortal: N,
              style: {
                width: Ct ? Ct.clientWidth : null,
              },
              ownerState: at,
              role: 'presentation',
              anchorEl: Ct,
              open: Ot,
              ...ve,
              className: Ee(x.popper, ve == null ? void 0 : ve.className),
              children: /* @__PURE__ */ Xe(bv, {
                ownerState: at,
                as: Ge,
                ...be,
                className: Ee(x.paper, be == null ? void 0 : be.className),
                children: [
                  ie && Tt.length === 0
                    ? /* @__PURE__ */ M(vv, {
                        className: x.loading,
                        ownerState: at,
                        children: ce,
                      })
                    : null,
                  Tt.length === 0 && !_ && !ie
                    ? /* @__PURE__ */ M(gv, {
                        className: x.noOptions,
                        ownerState: at,
                        role: 'presentation',
                        onMouseDown: (Oe) => {
                          Oe.preventDefault();
                        },
                        children: me,
                      })
                    : null,
                  Tt.length > 0
                    ? /* @__PURE__ */ M(yv, {
                        as: re,
                        className: x.listbox,
                        ownerState: at,
                        ...Qe(),
                        ...Z,
                        children: Tt.map((Oe, Ve) =>
                          w
                            ? $({
                                key: Oe.key,
                                group: Oe.group,
                                children: Oe.options.map((an, Lt) => ne(an, Oe.index + Lt)),
                              })
                            : ne(Oe, Ve),
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
  (pc.propTypes = {
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
    limitTags: xi,
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
const Ov = pc,
  Cv = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
  },
  fc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Gn(),
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
        timeout: C = i,
        // eslint-disable-next-line react/prop-types
        TransitionComponent: T = Jl,
        ...O
      } = t,
      E = b.useRef(null),
      f = rt(E, l.ref, o),
      S = (_) => (A) => {
        if (_) {
          const q = E.current;
          A === void 0 ? _(q) : _(q, A);
        }
      },
      R = S(h),
      D = S((_, A) => {
        Zl(_);
        const q = ir(
          {
            style: v,
            timeout: C,
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
      B = S(p),
      N = S(m),
      I = S((_) => {
        const A = ir(
          {
            style: v,
            timeout: C,
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
      J = S(g);
    return /* @__PURE__ */ M(T, {
      appear: s,
      in: d,
      nodeRef: E,
      onEnter: D,
      onEntered: B,
      onEntering: R,
      onExit: I,
      onExited: J,
      onExiting: N,
      addEndListener: (_) => {
        a && a(E.current, _);
      },
      timeout: C,
      ...O,
      children: (_, A) =>
        /* @__PURE__ */ b.cloneElement(l, {
          style: {
            opacity: 0,
            visibility: _ === 'exited' && !d ? 'hidden' : void 0,
            ...Cv[_],
            ...v,
            ...l.props.style,
          },
          ref: f,
          ...A,
        }),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (fc.propTypes = {
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
    children: qn.isRequired,
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
const Tv = fc;
function Rv(e) {
  return Ie('MuiBackdrop', e);
}
Ne('MuiBackdrop', ['root', 'invisible']);
const Sv = (e) => {
    const { classes: t, invisible: o } = e;
    return _e(
      {
        root: ['root', o && 'invisible'],
      },
      Rv,
      t,
    );
  },
  wv = de('div', {
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
  mc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a;
    const s = Le({
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
        TransitionComponent: v = Tv,
        transitionDuration: C,
        ...T
      } = s,
      O = {
        ...s,
        component: d,
        invisible: h,
      },
      E = Sv(O),
      f = (r = g.root) != null ? r : p.root;
    return /* @__PURE__ */ M(v, {
      in: y,
      timeout: C,
      ...T,
      children: /* @__PURE__ */ M(wv, {
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
  (mc.propTypes = {
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
const $v = mc;
function kv(e) {
  return Ie('MuiButton', e);
}
const Nv = Ne('MuiButton', [
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
  Fo = Nv,
  hc = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (hc.displayName = 'ButtonGroupContext');
const Pv = hc,
  Iv = (e) => {
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
      c = _e(l, kv, s);
    return {
      ...s,
      // forward the focused, disabled, etc. classes to the ButtonBase
      ...c,
    };
  },
  bc = (e) => ({
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
  Mv = de(Hn, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
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
            : Ye(e.palette.text.primary, e.palette.action.hoverOpacity),
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
                : Ye(e.palette[t.color].main, e.palette.action.hoverOpacity),
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
                : Ye(e.palette[t.color].main, e.palette.action.hoverOpacity),
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
        [`&.${Fo.focusVisible}`]: {
          ...(t.variant === 'contained' && {
            boxShadow: (e.vars || e).shadows[6],
          }),
        },
        [`&.${Fo.disabled}`]: {
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
              : `1px solid ${Ye(e.palette[t.color].main, 0.5)}`,
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
        [`&.${Fo.focusVisible}`]: {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        [`&.${Fo.disabled}`]: {
          boxShadow: 'none',
        },
      },
  ),
  _v = de('span', {
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
    ...bc(e),
  })),
  Av = de('span', {
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
    ...bc(e),
  })),
  vc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = b.useContext(Pv),
      i = Oi(r, t),
      a = Le({
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
        startIcon: C,
        type: T,
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
        type: T,
        variant: O,
      },
      S = Iv(f),
      R =
        C &&
        /* @__PURE__ */ M(_v, {
          className: S.startIcon,
          ownerState: f,
          children: C,
        }),
      D =
        y &&
        /* @__PURE__ */ M(Av, {
          className: S.endIcon,
          ownerState: f,
          children: y,
        });
    return /* @__PURE__ */ Xe(Mv, {
      ownerState: f,
      className: Ee(r.className, S.root, d),
      component: c,
      disabled: u,
      focusRipple: !h,
      focusVisibleClassName: Ee(S.focusVisible, g),
      ref: o,
      type: T,
      ...E,
      classes: S,
      children: [R, s, D],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (vc.propTypes = {
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
const Dv = vc;
function Lv(e) {
  return Ie('PrivateSwitchBase', e);
}
Ne('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const jv = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = {
        root: ['root', o && 'checked', r && 'disabled', i && `edge${oe(i)}`],
        input: ['input'],
      };
    return _e(a, Lv, t);
  },
  Fv = de(Hn)(({ ownerState: e }) => ({
    padding: 9,
    borderRadius: '50%',
    ...(e.edge === 'start' && {
      marginLeft: e.size === 'small' ? -3 : -12,
    }),
    ...(e.edge === 'end' && {
      marginRight: e.size === 'small' ? -3 : -12,
    }),
  })),
  Vv = de('input')({
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
  gc = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        onChange: C,
        onFocus: T,
        readOnly: O,
        required: E = !1,
        tabIndex: f,
        type: S,
        value: R,
        ...D
      } = t,
      [B, N] = xn({
        controlled: i,
        default: !!l,
        name: 'SwitchBase',
        state: 'checked',
      }),
      I = Sn(),
      J = (V) => {
        T && T(V), I && I.onFocus && I.onFocus(V);
      },
      j = (V) => {
        v && v(V), I && I.onBlur && I.onBlur(V);
      },
      _ = (V) => {
        if (V.nativeEvent.defaultPrevented) return;
        const w = V.target.checked;
        N(w), C && C(V, w);
      };
    let A = c;
    I && typeof A > 'u' && (A = I.disabled);
    const q = S === 'checkbox' || S === 'radio',
      ae = {
        ...t,
        checked: B,
        disabled: A,
        disableFocusRipple: d,
        edge: u,
      },
      Q = jv(ae);
    return /* @__PURE__ */ Xe(Fv, {
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
        /* @__PURE__ */ M(Vv, {
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
          type: S,
          ...(S === 'checkbox' && R === void 0
            ? {}
            : {
                value: R,
              }),
          ...y,
        }),
        B ? a : p,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (gc.propTypes = {
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
const yc = gc,
  zv = Xn(
    /* @__PURE__ */ M('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  Bv = Xn(
    /* @__PURE__ */ M('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Uv = Xn(
    /* @__PURE__ */ M('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function Wv(e) {
  return Ie('MuiCheckbox', e);
}
const Hv = Ne('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  Kr = Hv,
  qv = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = {
        root: ['root', o && 'indeterminate', `color${oe(r)}`],
      },
      a = _e(i, Wv, t);
    return {
      ...t,
      // forward the disabled and checked classes to the SwitchBase
      ...a,
    };
  },
  Yv = de(yc, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
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
          : Ye(
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
      [`&.${Kr.checked}, &.${Kr.indeterminate}`]: {
        color: (e.vars || e).palette[t.color].main,
      },
      [`&.${Kr.disabled}`]: {
        color: (e.vars || e).palette.action.disabled,
      },
    }),
  })),
  Kv = /* @__PURE__ */ M(Bv, {}),
  Gv = /* @__PURE__ */ M(zv, {}),
  Xv = /* @__PURE__ */ M(Uv, {}),
  Ec = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i;
    const a = Le({
        props: t,
        name: 'MuiCheckbox',
      }),
      {
        checkedIcon: s = Kv,
        color: l = 'primary',
        icon: c = Gv,
        indeterminate: d = !1,
        indeterminateIcon: u = Xv,
        inputProps: p,
        size: h = 'medium',
        className: y,
        ...g
      } = a,
      m = d ? u : c,
      v = d ? u : s,
      C = {
        ...a,
        color: l,
        indeterminate: d,
        size: h,
      },
      T = qv(C);
    return /* @__PURE__ */ M(Yv, {
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
      ownerState: C,
      ref: o,
      className: Ee(T.root, y),
      ...g,
      classes: T,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ec.propTypes = {
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
const Jv = Ec,
  Zv = de('div', {
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
  Qv = de($v, {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (e, t) => t.backdrop,
  })({
    zIndex: -1,
  }),
  xc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const d = Le({
        name: 'MuiModal',
        props: t,
      }),
      {
        BackdropComponent: u = Qv,
        BackdropProps: p,
        classes: h,
        className: y,
        closeAfterTransition: g = !1,
        children: m,
        container: v,
        component: C,
        components: T = {},
        componentsProps: O = {},
        disableAutoFocus: E = !1,
        disableEnforceFocus: f = !1,
        disableEscapeKeyDown: S = !1,
        disablePortal: R = !1,
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
      [V, w] = b.useState(!0),
      L = {
        container: v,
        closeAfterTransition: g,
        disableAutoFocus: E,
        disableEnforceFocus: f,
        disableEscapeKeyDown: S,
        disablePortal: R,
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
        exited: V,
      },
      z = (r = (i = q == null ? void 0 : q.root) != null ? i : T.Root) != null ? r : Zv,
      H = (a = (s = q == null ? void 0 : q.backdrop) != null ? s : T.Backdrop) != null ? a : u,
      K = (l = A == null ? void 0 : A.root) != null ? l : O.root,
      re = (c = A == null ? void 0 : A.backdrop) != null ? c : O.backdrop;
    return /* @__PURE__ */ M(Wh, {
      slots: {
        root: z,
        backdrop: H,
      },
      slotProps: {
        root: () => ({
          ...si(K, G),
          ...(!dn(z) && {
            as: C,
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
          ...si(re, G),
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
  (xc.propTypes = {
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
    children: qn.isRequired,
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
    container: n.oneOfType([en, n.func]),
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
const eg = xc,
  tg = Ne('MuiDivider', [
    'root',
    'absolute',
    'fullWidth',
    'inset',
    'middle',
    'flexItem',
    'light',
    'vertical',
    'withChildren',
    'withChildrenVertical',
    'textAlignRight',
    'textAlignLeft',
    'wrapper',
    'wrapperVertical',
  ]),
  Ps = tg,
  ng = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = _e(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        av,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...i,
    };
  },
  og = de(Mr, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Pr(e, t), !o.disableUnderline && t.underline];
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
      [`&.${St.focused}`]: {
        backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a,
      },
      [`&.${St.disabled}`]: {
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
        [`&.${St.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: 'scaleX(1) translateX(0)',
        },
        [`&.${St.error}`]: {
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
        [`&:hover:not(.${St.disabled}, .${St.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${St.disabled}:before`]: {
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
  rg = de(_r, {
    name: 'MuiFilledInput',
    slot: 'Input',
    overridesResolver: Ir,
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
  Zi = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Le({
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
        type: C = 'text',
        ...T
      } = l,
      O = {
        ...l,
        fullWidth: p,
        inputComponent: y,
        multiline: g,
        type: C,
      },
      E = ng(l),
      f = {
        root: {
          ownerState: O,
        },
        input: {
          ownerState: O,
        },
      },
      S = m ?? u ? Mt(m ?? u, f) : f,
      R = (r = (i = v.root) != null ? i : d.Root) != null ? r : og,
      D = (a = (s = v.input) != null ? s : d.Input) != null ? a : rg;
    return /* @__PURE__ */ M(Ji, {
      slots: {
        root: R,
        input: D,
      },
      componentsProps: S,
      fullWidth: p,
      inputComponent: y,
      multiline: g,
      ref: o,
      type: C,
      ...T,
      classes: E,
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
Zi.muiName = 'Input';
const Oc = Zi;
function ig(e) {
  return Ie('MuiFormControl', e);
}
Ne('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const ag = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = {
        root: ['root', o !== 'none' && `margin${oe(o)}`, r && 'fullWidth'],
      };
    return _e(i, ig, t);
  },
  sg = de('div', {
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
  Cc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
        ...C
      } = r,
      T = {
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
      O = ag(T),
      [E, f] = b.useState(() => {
        let j = !1;
        return (
          i &&
            b.Children.forEach(i, (_) => {
              if (!zr(_, ['Input', 'Select'])) return;
              const A = zr(_, ['Select']) ? _.props.input : _;
              A && Jb(A.props) && (j = !0);
            }),
          j
        );
      }),
      [S, R] = b.useState(() => {
        let j = !1;
        return (
          i &&
            b.Children.forEach(i, (_) => {
              zr(_, ['Input', 'Select']) &&
                (ar(_.props, !0) || ar(_.props.inputProps, !0)) &&
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
        filled: S,
        focused: N,
        fullWidth: p,
        hiddenLabel: h,
        size: m,
        onBlur: () => {
          B(!1);
        },
        onEmpty: () => {
          R(!1);
        },
        onFilled: () => {
          R(!0);
        },
        onFocus: () => {
          B(!0);
        },
        registerEffect: I,
        required: g,
        variant: v,
      }),
      [E, s, c, d, S, N, p, h, I, g, m, v],
    );
    return /* @__PURE__ */ M(Xi.Provider, {
      value: J,
      children: /* @__PURE__ */ M(sg, {
        as: l,
        ownerState: T,
        className: Ee(O.root, a),
        ref: o,
        ...C,
        children: i,
      }),
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
const lg = Cc;
function cg(e) {
  return Ie('MuiFormHelperText', e);
}
const ug = Ne('MuiFormHelperText', [
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
  Is = ug;
var Ms;
const dg = (e) => {
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
    return _e(d, cg, t);
  },
  pg = de('p', {
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
    [`&.${Is.disabled}`]: {
      color: (e.vars || e).palette.text.disabled,
    },
    [`&.${Is.error}`]: {
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
  Tc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
      m = Sn(),
      v = Jn({
        props: r,
        muiFormControl: m,
        states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
      }),
      C = {
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
      T = dg(C);
    return /* @__PURE__ */ M(pg, {
      as: s,
      ownerState: C,
      className: Ee(T.root, a),
      ref: o,
      ...g,
      children:
        i === ' '
          ? // notranslate needed while Google Translate will not fix zero-width space issue
            Ms ||
            (Ms = /* @__PURE__ */ M('span', {
              className: 'notranslate',
              children: '​',
            }))
          : i,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Tc.propTypes = {
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
const fg = Tc;
function mg(e) {
  return Ie('MuiFormLabel', e);
}
const hg = Ne('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  bo = hg,
  bg = (e) => {
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
    return _e(c, mg, t);
  },
  vg = de('label', {
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
    [`&.${bo.focused}`]: {
      color: (e.vars || e).palette[t.color].main,
    },
    [`&.${bo.disabled}`]: {
      color: (e.vars || e).palette.text.disabled,
    },
    [`&.${bo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  gg = de('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({
    [`&.${bo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  Rc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
      g = Sn(),
      m = Jn({
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
      C = bg(v);
    return /* @__PURE__ */ Xe(vg, {
      as: l,
      ownerState: v,
      className: Ee(C.root, a),
      ref: o,
      ...y,
      children: [
        i,
        m.required &&
          /* @__PURE__ */ Xe(gg, {
            ownerState: v,
            'aria-hidden': !0,
            className: C.asterisk,
            children: [' ', '*'],
          }),
      ],
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
const Sc = Rc;
function mi(e) {
  return `scale(${e}, ${e ** 2})`;
}
const yg = {
    entering: {
      opacity: 1,
      transform: mi(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
  },
  Gr =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  Qi = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        TransitionComponent: v = Jl,
        ...C
      } = t,
      T = b.useRef(),
      O = b.useRef(),
      E = Gn(),
      f = b.useRef(null),
      S = rt(f, a.ref, o),
      R = (A) => (q) => {
        if (A) {
          const ae = f.current;
          q === void 0 ? A(ae) : A(ae, q);
        }
      },
      D = R(u),
      B = R((A, q) => {
        Zl(A);
        const {
          duration: ae,
          delay: Q,
          easing: V,
        } = ir(
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
              duration: Gr ? w : w * 0.666,
              delay: Q,
              easing: V,
            }),
          ].join(',')),
          c && c(A, q);
      }),
      N = R(d),
      I = R(y),
      J = R((A) => {
        const {
          duration: q,
          delay: ae,
          easing: Q,
        } = ir(
          {
            style: g,
            timeout: m,
            easing: s,
          },
          {
            mode: 'exit',
          },
        );
        let V;
        m === 'auto'
          ? ((V = E.transitions.getAutoHeightDuration(A.clientHeight)), (O.current = V))
          : (V = q),
          (A.style.transition = [
            E.transitions.create('opacity', {
              duration: V,
              delay: ae,
            }),
            E.transitions.create('transform', {
              duration: Gr ? V : V * 0.666,
              delay: Gr ? ae : ae || V * 0.333,
              easing: Q,
            }),
          ].join(',')),
          (A.style.opacity = 0),
          (A.style.transform = mi(0.75)),
          p && p(A);
      }),
      j = R(h),
      _ = (A) => {
        m === 'auto' && (T.current = setTimeout(A, O.current || 0)), r && r(f.current, A);
      };
    return (
      b.useEffect(
        () => () => {
          clearTimeout(T.current);
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
        ...C,
        children: (A, q) =>
          /* @__PURE__ */ b.cloneElement(a, {
            style: {
              opacity: 0,
              transform: mi(0.75),
              visibility: A === 'exited' && !l ? 'hidden' : void 0,
              ...yg[A],
              ...g,
              ...a.props.style,
            },
            ref: S,
            ...q,
          }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Qi.propTypes = {
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
    children: qn.isRequired,
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
Qi.muiSupportAuto = !0;
const wc = Qi,
  Eg = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = _e(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        nv,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...i,
    };
  },
  xg = de(Mr, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Pr(e, t), !o.disableUnderline && t.underline];
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
  Og = de(_r, {
    name: 'MuiInput',
    slot: 'Input',
    overridesResolver: Ir,
  })({}),
  ea = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Le({
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
        ...C
      } = l,
      T = Eg(l),
      E = {
        root: {
          ownerState: {
            disableUnderline: c,
          },
        },
      },
      f = g ?? u ? Mt(g ?? u, E) : E,
      S = (r = (i = m.root) != null ? i : d.Root) != null ? r : xg,
      R = (a = (s = m.input) != null ? s : d.Input) != null ? a : Og;
    return /* @__PURE__ */ M(Ji, {
      slots: {
        root: S,
        input: R,
      },
      slotProps: f,
      fullWidth: p,
      inputComponent: h,
      multiline: y,
      ref: o,
      type: v,
      ...C,
      classes: T,
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
ea.muiName = 'Input';
const $c = ea;
function Cg(e) {
  return Ie('MuiInputLabel', e);
}
Ne('MuiInputLabel', [
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
const Tg = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      d = _e(
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
        Cg,
        t,
      );
    return {
      ...t,
      // forward the focused, disabled, etc. classes to the FormLabel
      ...d,
    };
  },
  Rg = de(Sc, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${bo.asterisk}`]: t.asterisk,
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
  kc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
        name: 'MuiInputLabel',
        props: t,
      }),
      { disableAnimation: i = !1, margin: a, shrink: s, variant: l, className: c, ...d } = r,
      u = Sn();
    let p = s;
    typeof p > 'u' && u && (p = u.filled || u.focused || u.adornedStart);
    const h = Jn({
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
      g = Tg(y);
    return /* @__PURE__ */ M(Rg, {
      'data-shrink': p,
      ownerState: y,
      ref: o,
      className: Ee(g.root, c),
      ...d,
      classes: g,
    });
  });
process.env.NODE_ENV !== 'production' &&
  (kc.propTypes = {
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
const Sg = kc,
  Nc = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== 'production' && (Nc.displayName = 'ListContext');
const hi = Nc;
function wg(e) {
  return Ie('MuiList', e);
}
Ne('MuiList', ['root', 'padding', 'dense', 'subheader']);
const $g = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return _e(
      {
        root: ['root', !o && 'padding', r && 'dense', i && 'subheader'],
      },
      wg,
      t,
    );
  },
  kg = de('ul', {
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
  Pc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
      y = $g(h);
    return /* @__PURE__ */ M(hi.Provider, {
      value: p,
      children: /* @__PURE__ */ Xe(kg, {
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
  (Pc.propTypes = {
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
const Ng = Pc,
  Pg = Ne('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  _s = Pg,
  Ig = Ne('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  As = Ig;
function Xr(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function Ds(e, t, o) {
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
function Ic(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function ao(e, t, o, r, i, a) {
  let s = !1,
    l = i(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !Ic(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const Mc = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
  tn(() => {
    i && y.current.focus();
  }, [i]),
    b.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (O, E) => {
          const f = !y.current.style.width;
          if (O.clientHeight < y.current.clientHeight && f) {
            const S = `${sl(ot(O))}px`;
            (y.current.style[E.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = S),
              (y.current.style.width = `calc(100% + ${S})`);
          }
          return y.current;
        },
      }),
      [],
    );
  const m = (O) => {
      const E = y.current,
        f = O.key,
        S = ot(E).activeElement;
      if (f === 'ArrowDown') O.preventDefault(), ao(E, S, d, c, Xr);
      else if (f === 'ArrowUp') O.preventDefault(), ao(E, S, d, c, Ds);
      else if (f === 'Home') O.preventDefault(), ao(E, null, d, c, Xr);
      else if (f === 'End') O.preventDefault(), ao(E, null, d, c, Ds);
      else if (f.length === 1) {
        const R = g.current,
          D = f.toLowerCase(),
          B = performance.now();
        R.keys.length > 0 &&
          (B - R.lastTime > 500
            ? ((R.keys = []), (R.repeating = !0), (R.previousKeyMatched = !0))
            : R.repeating && D !== R.keys[0] && (R.repeating = !1)),
          (R.lastTime = B),
          R.keys.push(D);
        const N = S && !R.repeating && Ic(S, R);
        R.previousKeyMatched && (N || ao(E, S, !1, c, Xr, R))
          ? O.preventDefault()
          : (R.previousKeyMatched = !1);
      }
      u && u(O);
    },
    v = rt(y, o);
  let C = -1;
  b.Children.forEach(s, (O, E) => {
    /* @__PURE__ */ b.isValidElement(O) &&
      (process.env.NODE_ENV !== 'production' &&
        go.isFragment(O) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      O.props.disabled || (((p === 'selectedMenu' && O.props.selected) || C === -1) && (C = E)),
      C === E &&
        (O.props.disabled || O.props.muiSkipListHighlight || O.type.muiSkipListHighlight) &&
        ((C += 1), C >= s.length && (C = -1)));
  });
  const T = b.Children.map(s, (O, E) => {
    if (E === C) {
      const f = {};
      return (
        a && (f.autoFocus = !0),
        O.props.tabIndex === void 0 && p === 'selectedMenu' && (f.tabIndex = 0),
        /* @__PURE__ */ b.cloneElement(O, f)
      );
    }
    return O;
  });
  return /* @__PURE__ */ M(Ng, {
    role: 'menu',
    ref: v,
    className: l,
    onKeyDown: m,
    tabIndex: i ? 0 : -1,
    ...h,
    children: T,
  });
});
process.env.NODE_ENV !== 'production' &&
  (Mc.propTypes = {
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
const Mg = Mc;
function _g(e) {
  return Ie('MuiPopover', e);
}
Ne('MuiPopover', ['root', 'paper']);
function Ls(e, t) {
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
function js(e, t) {
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
function Fs(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function qo(e) {
  return typeof e == 'function' ? e() : e;
}
const Ag = (e) => {
    const { classes: t } = e;
    return _e(
      {
        root: ['root'],
        paper: ['paper'],
      },
      _g,
      t,
    );
  },
  Dg = de(eg, {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Lg = de(ko, {
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
  _c = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
        TransitionComponent: C = wc,
        transitionDuration: T = 'auto',
        TransitionProps: { onEntering: O, ...E } = {},
        ...f
      } = r,
      S = b.useRef(),
      R = rt(S, m.ref),
      D = {
        ...r,
        anchorOrigin: s,
        anchorReference: c,
        elevation: h,
        marginThreshold: y,
        PaperProps: m,
        transformOrigin: v,
        TransitionComponent: C,
        transitionDuration: T,
        TransitionProps: E,
      },
      B = Ag(D),
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
        const w = qo(a),
          L = w && w.nodeType === 1 ? w : ot(S.current).body,
          G = L.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const z = L.getBoundingClientRect();
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
        return {
          top: G.top + Ls(G, s.vertical),
          left: G.left + js(G, s.horizontal),
        };
      }, [a, s.horizontal, s.vertical, l, c]),
      I = b.useCallback(
        (w) => ({
          vertical: Ls(w, v.vertical),
          horizontal: js(w, v.horizontal),
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
              transformOrigin: Fs(G),
            };
          const z = N();
          let H = z.top - G.vertical,
            K = z.left - G.horizontal;
          const re = H + L.height,
            Z = K + L.width,
            ie = Cn(qo(a)),
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
            transformOrigin: Fs(G),
          };
        },
        [a, c, N, I, y],
      ),
      [j, _] = b.useState(g),
      A = b.useCallback(() => {
        const w = S.current;
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
        const w = rl(() => {
            A();
          }),
          L = Cn(a);
        return (
          L.addEventListener('resize', w),
          () => {
            w.clear(), L.removeEventListener('resize', w);
          }
        );
      }, [a, g, A]);
    let Q = T;
    T === 'auto' && !C.muiSupportAuto && (Q = void 0);
    const V = p || (a ? ot(qo(a)).body : void 0);
    return /* @__PURE__ */ M(Dg, {
      BackdropProps: {
        invisible: !0,
      },
      className: Ee(B.root, u),
      container: V,
      open: g,
      ref: o,
      ownerState: D,
      ...f,
      children: /* @__PURE__ */ M(C, {
        appear: !0,
        in: g,
        onEntering: q,
        onExited: ae,
        timeout: Q,
        ...E,
        children: /* @__PURE__ */ M(Lg, {
          elevation: h,
          ...m,
          ref: R,
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
  (_c.propTypes = {
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
    anchorEl: Bt(n.oneOfType([en, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = qo(e.anchorEl);
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
    container: n.oneOfType([en, n.func]),
    /**
     * The elevation of the popover.
     * @default 8
     */
    elevation: xi,
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
      component: yi,
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
const jg = _c;
function Fg(e) {
  return Ie('MuiMenu', e);
}
Ne('MuiMenu', ['root', 'paper', 'list']);
const Vg = {
    vertical: 'top',
    horizontal: 'right',
  },
  zg = {
    vertical: 'top',
    horizontal: 'left',
  },
  Bg = (e) => {
    const { classes: t } = e;
    return _e(
      {
        root: ['root'],
        paper: ['paper'],
        list: ['list'],
      },
      Fg,
      t,
    );
  },
  Ug = de(jg, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Wg = de(ko, {
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
  Hg = de(Mg, {
    name: 'MuiMenu',
    slot: 'List',
    overridesResolver: (e, t) => t.list,
  })({
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  Ac = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
      C = Gn(),
      T = C.direction === 'rtl',
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
      E = Bg(O),
      f = i && !s && d,
      S = b.useRef(null),
      R = (N, I) => {
        S.current && S.current.adjustStyleForScrollbar(N, C), y && y(N, I);
      },
      D = (N) => {
        N.key === 'Tab' && (N.preventDefault(), c && c(N, 'tabKeyDown'));
      };
    let B = -1;
    return (
      b.Children.map(a, (N, I) => {
        /* @__PURE__ */ b.isValidElement(N) &&
          (process.env.NODE_ENV !== 'production' &&
            go.isFragment(N) &&
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
      /* @__PURE__ */ M(Ug, {
        onClose: c,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: T ? 'right' : 'left',
        },
        transformOrigin: T ? Vg : zg,
        PaperProps: {
          as: Wg,
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
          onEntering: R,
          ...g,
        },
        ownerState: O,
        ...v,
        classes: p,
        children: /* @__PURE__ */ M(Hg, {
          onKeyDown: D,
          actions: S,
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
  (Ac.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the menu.
     */
    anchorEl: n.oneOfType([en, n.func]),
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
const qg = Ac;
function Yg(e) {
  return Ie('MuiMenuItem', e);
}
const Kg = Ne('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  so = Kg,
  Gg = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  Xg = (e) => {
    const { disabled: t, dense: o, divider: r, disableGutters: i, selected: a, classes: s } = e,
      c = _e(
        {
          root: [
            'root',
            o && 'dense',
            t && 'disabled',
            !i && 'gutters',
            r && 'divider',
            a && 'selected',
          ],
        },
        Yg,
        s,
      );
    return {
      ...s,
      ...c,
    };
  },
  Jg = de(Hn, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: Gg,
  })(({ theme: e, ownerState: t }) => ({
    ...e.typography.body1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    minHeight: 48,
    paddingTop: 6,
    paddingBottom: 6,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    ...(!t.disableGutters && {
      paddingLeft: 16,
      paddingRight: 16,
    }),
    ...(t.divider && {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      backgroundClip: 'padding-box',
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: (e.vars || e).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    [`&.${so.selected}`]: {
      backgroundColor: e.vars
        ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
        : Ye(e.palette.primary.main, e.palette.action.selectedOpacity),
      [`&.${so.focusVisible}`]: {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
          : Ye(
              e.palette.primary.main,
              e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
            ),
      },
    },
    [`&.${so.selected}:hover`]: {
      backgroundColor: e.vars
        ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
        : Ye(
            e.palette.primary.main,
            e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
          ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : Ye(e.palette.primary.main, e.palette.action.selectedOpacity),
      },
    },
    [`&.${so.focusVisible}`]: {
      backgroundColor: (e.vars || e).palette.action.focus,
    },
    [`&.${so.disabled}`]: {
      opacity: (e.vars || e).palette.action.disabledOpacity,
    },
    [`& + .${Ps.root}`]: {
      marginTop: e.spacing(1),
      marginBottom: e.spacing(1),
    },
    [`& + .${Ps.inset}`]: {
      marginLeft: 52,
    },
    [`& .${As.root}`]: {
      marginTop: 0,
      marginBottom: 0,
    },
    [`& .${As.inset}`]: {
      paddingLeft: 36,
    },
    [`& .${_s.root}`]: {
      minWidth: 36,
    },
    ...(!t.dense && {
      [e.breakpoints.up('sm')]: {
        minHeight: 'auto',
      },
    }),
    ...(t.dense && {
      minHeight: 32,
      // https://m2.material.io/components/menus#specs > Dense
      paddingTop: 4,
      paddingBottom: 4,
      ...e.typography.body2,
      [`& .${_s.root} svg`]: {
        fontSize: '1.25rem',
      },
    }),
  })),
  Dc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
        props: t,
        name: 'MuiMenuItem',
      }),
      {
        autoFocus: i = !1,
        component: a = 'li',
        dense: s = !1,
        divider: l = !1,
        disableGutters: c = !1,
        focusVisibleClassName: d,
        role: u = 'menuitem',
        tabIndex: p,
        className: h,
        ...y
      } = r,
      g = b.useContext(hi),
      m = b.useMemo(
        () => ({
          dense: s || g.dense || !1,
          disableGutters: c,
        }),
        [g.dense, s, c],
      ),
      v = b.useRef(null);
    tn(() => {
      i &&
        (v.current
          ? v.current.focus()
          : process.env.NODE_ENV !== 'production' &&
            console.error(
              'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
            ));
    }, [i]);
    const C = {
        ...r,
        dense: m.dense,
        divider: l,
        disableGutters: c,
      },
      T = Xg(r),
      O = rt(v, o);
    let E;
    return (
      r.disabled || (E = p !== void 0 ? p : -1),
      /* @__PURE__ */ M(hi.Provider, {
        value: m,
        children: /* @__PURE__ */ M(Jg, {
          ref: O,
          role: u,
          tabIndex: E,
          component: a,
          focusVisibleClassName: Ee(T.focusVisible, d),
          className: Ee(T.root, h),
          ...y,
          ownerState: C,
          classes: T,
        }),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Dc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * If `true`, the list item is focused during the first mount.
     * Focus will also be triggered if the value changes from false to true.
     * @default false
     */
    autoFocus: n.bool,
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
     * If `true`, compact vertical padding designed for keyboard and mouse input is used.
     * The prop defaults to the value inherited from the parent Menu component.
     * @default false
     */
    dense: n.bool,
    /**
     * @ignore
     */
    disabled: n.bool,
    /**
     * If `true`, the left and right padding is removed.
     * @default false
     */
    disableGutters: n.bool,
    /**
     * If `true`, a 1px light border is added to the bottom of the menu item.
     * @default false
     */
    divider: n.bool,
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
    role: n.string,
    /**
     * If `true`, the component is selected.
     * @default false
     */
    selected: n.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * @default 0
     */
    tabIndex: n.number,
  });
const Zg = Dc;
function Qg(e) {
  return Ie('MuiNativeSelect', e);
}
const ey = Ne('MuiNativeSelect', [
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
  ta = ey,
  ty = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a, error: s } = e,
      l = {
        select: ['select', o, r && 'disabled', i && 'multiple', s && 'error'],
        icon: ['icon', `icon${oe(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return _e(l, Qg, t);
  },
  Lc = ({ ownerState: e, theme: t }) => ({
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
    [`&.${ta.disabled}`]: {
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
  ny = de('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: Wt,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.select,
        t[o.variant],
        o.error && t.error,
        {
          [`&.${ta.multiple}`]: t.multiple,
        },
      ];
    },
  })(Lc),
  jc = ({ ownerState: e, theme: t }) => ({
    // We use a position absolute over a flexbox in order to forward the pointer events
    // to the input and to support wrapping tags..
    position: 'absolute',
    right: 0,
    top: 'calc(50% - .5em)',
    // Center vertically, height is 1em
    pointerEvents: 'none',
    // Don't block pointer events on the select under the icon.
    color: (t.vars || t).palette.action.active,
    [`&.${ta.disabled}`]: {
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
  oy = de('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${oe(o.variant)}`], o.open && t.iconOpen];
    },
  })(jc),
  Fc = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
      p = ty(u);
    return /* @__PURE__ */ Xe(b.Fragment, {
      children: [
        /* @__PURE__ */ M(ny, {
          ownerState: u,
          className: Ee(p.select, r),
          disabled: i,
          ref: l || o,
          ...d,
        }),
        t.multiple
          ? null
          : /* @__PURE__ */ M(oy, {
              as: s,
              ownerState: u,
              className: p.icon,
            }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Fc.propTypes = {
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
const ry = Fc;
var Vs;
const iy = de('fieldset')({
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
  ay = de('legend')(({ ownerState: e, theme: t }) => ({
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
function Vc(e) {
  const { children: t, classes: o, className: r, label: i, notched: a, ...s } = e,
    l = i != null && i !== '',
    c = {
      ...e,
      notched: a,
      withLabel: l,
    };
  return /* @__PURE__ */ M(iy, {
    'aria-hidden': !0,
    className: r,
    ownerState: c,
    ...s,
    children: /* @__PURE__ */ M(ay, {
      ownerState: c,
      children: l
        ? /* @__PURE__ */ M('span', {
            children: i,
          })
        : // notranslate needed while Google Translate will not fix zero-width space issue
          Vs ||
          (Vs = /* @__PURE__ */ M('span', {
            className: 'notranslate',
            children: '​',
          })),
    }),
  });
}
process.env.NODE_ENV !== 'production' &&
  (Vc.propTypes = {
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
const sy = (e) => {
    const { classes: t } = e,
      r = _e(
        {
          root: ['root'],
          notchedOutline: ['notchedOutline'],
          input: ['input'],
        },
        rv,
        t,
      );
    return {
      ...t,
      // forward classes to the InputBase
      ...r,
    };
  },
  ly = de(Mr, {
    shouldForwardProp: (e) => Wt(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: Pr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      position: 'relative',
      borderRadius: (e.vars || e).shape.borderRadius,
      [`&:hover .${Xt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette.text.primary,
      },
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        [`&:hover .${Xt.notchedOutline}`]: {
          borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
        },
      },
      [`&.${Xt.focused} .${Xt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette[t.color].main,
        borderWidth: 2,
      },
      [`&.${Xt.error} .${Xt.notchedOutline}`]: {
        borderColor: (e.vars || e).palette.error.main,
      },
      [`&.${Xt.disabled} .${Xt.notchedOutline}`]: {
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
  cy = de(Vc, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  uy = de(_r, {
    name: 'MuiOutlinedInput',
    slot: 'Input',
    overridesResolver: Ir,
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
  na = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = Le({
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
        ...C
      } = c,
      T = sy(c),
      O = Sn(),
      E = Jn({
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
      S = (r = (i = m.root) != null ? i : d.Root) != null ? r : ly,
      R = (a = (s = m.input) != null ? s : d.Input) != null ? a : uy;
    return /* @__PURE__ */ M(Ji, {
      slots: {
        root: S,
        input: R,
      },
      renderSuffix: (D) =>
        /* @__PURE__ */ M(cy, {
          ownerState: f,
          className: T.notchedOutline,
          label:
            h != null && h !== '' && E.required
              ? l ||
                (l = /* @__PURE__ */ Xe(b.Fragment, {
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
      ...C,
      classes: {
        ...T,
        notchedOutline: null,
      },
    });
  });
process.env.NODE_ENV !== 'production' &&
  (na.propTypes = {
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
na.muiName = 'Input';
const zc = na;
function dy(e) {
  return Ie('MuiSelect', e);
}
const py = Ne('MuiSelect', [
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
  lo = py;
var zs;
const fy = de('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        // Win specificity over the input base
        {
          [`&.${lo.select}`]: t.select,
        },
        {
          [`&.${lo.select}`]: t[o.variant],
        },
        {
          [`&.${lo.error}`]: t.error,
        },
        {
          [`&.${lo.multiple}`]: t.multiple,
        },
      ];
    },
  })(Lc, {
    // Win specificity over the input base
    [`&.${lo.select}`]: {
      height: 'auto',
      // Resets for multiple select with chips
      minHeight: '1.4375em',
      // Required for select\text-field height consistency
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  my = de('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${oe(o.variant)}`], o.open && t.iconOpen];
    },
  })(jc),
  hy = de('input', {
    shouldForwardProp: (e) => Fi(e) && e !== 'classes',
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
function Bs(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function by(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const vy = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a, error: s } = e,
      l = {
        select: ['select', o, r && 'disabled', i && 'multiple', s && 'error'],
        icon: ['icon', `icon${oe(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return _e(l, dy, t);
  },
  Bc = /* @__PURE__ */ b.forwardRef(function (t, o) {
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
        MenuProps: C = {},
        multiple: T,
        name: O,
        onBlur: E,
        onChange: f,
        onClose: S,
        onFocus: R,
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
      [Q, V] = xn({
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
      z = b.useRef(null),
      [H, K] = b.useState(null),
      { current: re } = b.useRef(B != null),
      [Z, ie] = b.useState(),
      ce = rt(o, m),
      ue = b.useCallback((U) => {
        (z.current = U), U && K(U);
      }, []),
      me = H == null ? void 0 : H.parentNode;
    b.useImperativeHandle(
      ce,
      () => ({
        focus: () => {
          z.current.focus();
        },
        node: G.current,
        value: Q,
      }),
      [Q],
    ),
      b.useEffect(() => {
        d && w && H && !re && (ie(s ? null : me.clientWidth), z.current.focus());
      }, [H, s]),
      b.useEffect(() => {
        a && z.current.focus();
      }, [a]),
      b.useEffect(() => {
        if (!v) return;
        const U = ot(z.current).getElementById(v);
        if (U) {
          const ge = () => {
            getSelection().isCollapsed && z.current.focus();
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
        U ? D && D(ge) : S && S(ge), re || (ie(s ? null : me.clientWidth), L(U));
      },
      Ce = (U) => {
        U.button === 0 && (U.preventDefault(), z.current.focus(), P(!0, U));
      },
      X = (U) => {
        P(!1, U);
      },
      W = b.Children.toArray(l),
      Te = (U) => {
        const ge = W.find((Re) => Re.props.value === U.target.value);
        ge !== void 0 && (V(ge.props.value), f && f(U, ge));
      },
      pe = (U) => (ge) => {
        let Re;
        if (ge.currentTarget.hasAttribute('tabindex')) {
          if (T) {
            Re = Array.isArray(Q) ? Q.slice() : [];
            const ft = Q.indexOf(U.props.value);
            ft === -1 ? Re.push(U.props.value) : Re.splice(ft, 1);
          } else Re = U.props.value;
          if ((U.props.onClick && U.props.onClick(ge), Q !== Re && (V(Re), f))) {
            const ft = ge.nativeEvent || ge,
              ht = new ft.constructor(ft.type, ft);
            Object.defineProperty(ht, 'target', {
              writable: !0,
              value: {
                value: Re,
                name: O,
              },
            }),
              f(ht, U);
          }
          T || P(!1, ge);
        }
      },
      $e = (U) => {
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
      je = H !== null && w,
      Je = (U) => {
        !je &&
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
    let Ge, Fe;
    const Ze = [];
    let ee = !1,
      te = !1;
    (ar({
      value: Q,
    }) ||
      h) &&
      (I ? (Ge = I(Q)) : (ee = !0));
    const ye = W.map((U) => {
      if (!(/* @__PURE__ */ b.isValidElement(U))) return null;
      process.env.NODE_ENV !== 'production' &&
        go.isFragment(U) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let ge;
      if (T) {
        if (!Array.isArray(Q))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : pn(2),
          );
        (ge = Q.some((Re) => Bs(Re, U.props.value))), ge && ee && Ze.push(U.props.children);
      } else (ge = Bs(Q, U.props.value)), ge && ee && (Fe = U.props.children);
      return (
        ge && (te = !0),
        /* @__PURE__ */ b.cloneElement(U, {
          'aria-selected': ge ? 'true' : 'false',
          onClick: pe(U),
          onKeyUp: (Re) => {
            Re.key === ' ' && Re.preventDefault(), U.props.onKeyUp && U.props.onKeyUp(Re);
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
        if (!te && !T && Q !== '') {
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
      }, [te, W, T, O, Q]),
      ee &&
        (T
          ? Ze.length === 0
            ? (Ge = null)
            : (Ge = Ze.reduce(
                (U, ge, Re) => (U.push(ge), Re < Ze.length - 1 && U.push(', '), U),
                [],
              ))
          : (Ge = Fe));
    let he = Z;
    !s && re && H && (he = me.clientWidth);
    let xe;
    typeof j < 'u' ? (xe = j) : (xe = p ? null : 0);
    const Pe = J.id || (O ? `mui-component-select-${O}` : void 0),
      se = {
        ...t,
        variant: q,
        value: Q,
        open: je,
        error: y,
      },
      we = vy(se);
    return /* @__PURE__ */ Xe(b.Fragment, {
      children: [
        /* @__PURE__ */ M(fy, {
          ref: ue,
          tabIndex: xe,
          role: 'button',
          'aria-disabled': p ? 'true' : void 0,
          'aria-expanded': je ? 'true' : 'false',
          'aria-haspopup': 'listbox',
          'aria-label': i,
          'aria-labelledby': [v, Pe].filter(Boolean).join(' ') || void 0,
          'aria-describedby': r,
          onKeyDown: $e,
          onMouseDown: p || N ? null : Ce,
          onBlur: Je,
          onFocus: R,
          ...J,
          ownerState: se,
          className: Ee(J.className, we.select, c),
          id: Pe,
          children: by(Ge)
            ? // notranslate needed while Google Translate will not fix zero-width space issue
              zs ||
              (zs = /* @__PURE__ */ M('span', {
                className: 'notranslate',
                children: '​',
              }))
            : Ge,
        }),
        /* @__PURE__ */ M(hy, {
          'aria-invalid': y,
          value: Array.isArray(Q) ? Q.join(',') : Q,
          name: O,
          ref: G,
          'aria-hidden': !0,
          onChange: Te,
          tabIndex: -1,
          disabled: p,
          className: we.nativeInput,
          autoFocus: a,
          ownerState: se,
          ...ae,
        }),
        /* @__PURE__ */ M(my, {
          as: g,
          className: we.icon,
          ownerState: se,
        }),
        /* @__PURE__ */ M(qg, {
          id: `menu-${O || ''}`,
          anchorEl: me,
          open: je,
          onClose: X,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          ...C,
          MenuListProps: {
            'aria-labelledby': v,
            role: 'listbox',
            disableListWrap: !0,
            ...C.MenuListProps,
          },
          PaperProps: {
            ...C.PaperProps,
            style: {
              minWidth: he,
              ...(C.PaperProps != null ? C.PaperProps.style : null),
            },
          },
          children: ye,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Bc.propTypes = {
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
const gy = Bc,
  yy = (e) => {
    const { classes: t } = e;
    return t;
  },
  oa = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => Wt(e) && e !== 'variant',
    slot: 'Root',
  },
  Ey = de($c, oa)(''),
  xy = de(zc, oa)(''),
  Oy = de(Oc, oa)(''),
  ra = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
        IconComponent: u = dc,
        id: p,
        input: h,
        inputProps: y,
        label: g,
        labelId: m,
        MenuProps: v,
        multiple: C = !1,
        native: T = !1,
        onClose: O,
        onOpen: E,
        open: f,
        renderValue: S,
        SelectDisplayProps: R,
        variant: D = 'outlined',
        ...B
      } = r,
      N = T ? ry : gy,
      I = Sn(),
      J = Jn({
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
      A = yy(_),
      q =
        h ||
        {
          standard: /* @__PURE__ */ M(Ey, {
            ownerState: _,
          }),
          outlined: /* @__PURE__ */ M(xy, {
            label: g,
            ownerState: _,
          }),
          filled: /* @__PURE__ */ M(Oy, {
            ownerState: _,
          }),
        }[j],
      ae = rt(o, q.ref);
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
          multiple: C,
          ...(T
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
                renderValue: S,
                SelectDisplayProps: {
                  id: p,
                  ...R,
                },
              }),
          ...y,
          classes: y ? Mt(A, y.classes) : A,
          ...(h ? h.props.inputProps : {}),
        },
        ...(C && T && j === 'outlined'
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
  (ra.propTypes = {
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
ra.muiName = 'Select';
const Cy = ra,
  Ty = (e) => !e || !dn(e),
  Ry = Ty;
function Sy(e) {
  return Ie('MuiSlider', e);
}
const wy = Ne('MuiSlider', [
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
  Vt = wy,
  $y = (e) => {
    const { open: t } = e;
    return {
      offset: Ee(t && Vt.valueLabelOpen),
      circle: Vt.valueLabelCircle,
      label: Vt.valueLabelLabel,
    };
  };
function Uc(e) {
  const { children: t, className: o, value: r } = e,
    i = $y(e);
  return t
    ? /* @__PURE__ */ b.cloneElement(
        t,
        {
          className: Ee(t.props.className),
        },
        /* @__PURE__ */ Xe(b.Fragment, {
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
  (Uc.propTypes = {
    children: n.element.isRequired,
    className: n.string,
    value: n.node,
  });
function Us(e) {
  return e;
}
const Wc = de('span', {
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
  [`&.${Vt.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: (e.vars || e).palette.grey[400],
  },
  [`&.${Vt.dragging}`]: {
    [`& .${Vt.thumb}, & .${Vt.track}`]: {
      transition: 'none',
    },
  },
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
const Hc = de('span', {
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
  (Hc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const qc = de('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (e, t) => t.track,
})(({ theme: e, ownerState: t }) => {
  const o =
    // Same logic as the LinearProgress track color
    e.palette.mode === 'light'
      ? Rr(e.palette[t.color].main, 0.62)
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
  (qc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Yc = de('span', {
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
  [`&:hover, &.${Vt.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${
      e.vars
        ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
        : Ye(e.palette[t.color].main, 0.16)
    }`,
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  },
  [`&.${Vt.active}`]: {
    boxShadow: `0px 0px 0px 14px ${
      e.vars
        ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
        : Ye(e.palette[t.color].main, 0.16)
    }`,
  },
  [`&.${Vt.disabled}`]: {
    '&:hover': {
      boxShadow: 'none',
    },
  },
}));
process.env.NODE_ENV !== 'production' &&
  (Yc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Kc = de(Uc, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) => ({
  [`&.${Vt.valueLabelOpen}`]: {
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
  (Kc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Gc = de('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Fi(e) && e !== 'markActive',
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
  (Gc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Xc = de('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Fi(e) && e !== 'markLabelActive',
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
  (Xc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const ky = (e) => {
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
    return _e(d, Sy, s);
  },
  Ny = ({ children: e }) => e,
  Jc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    var r, i, a, s, l, c, d, u, p, h, y, g, m, v, C, T, O, E, f, S, R, D, B, N;
    const I = Le({
        props: t,
        name: 'MuiSlider',
      }),
      j = Gn().direction === 'rtl',
      {
        'aria-label': _,
        'aria-valuetext': A,
        'aria-labelledby': q,
        // eslint-disable-next-line react/prop-types
        component: ae = 'span',
        components: Q = {},
        componentsProps: V = {},
        color: w = 'primary',
        classes: L,
        className: G,
        disableSwap: z = !1,
        disabled: H = !1,
        getAriaLabel: K,
        getAriaValueText: re,
        marks: Z = !1,
        max: ie = 100,
        min: ce = 0,
        name: ue,
        onChange: me,
        onChangeCommitted: P,
        orientation: Ce = 'horizontal',
        size: X = 'medium',
        step: W = 1,
        scale: Te = Us,
        slotProps: pe,
        slots: $e,
        tabIndex: je,
        track: Je = 'normal',
        value: Ge,
        valueLabelDisplay: Fe = 'off',
        valueLabelFormat: Ze = Us,
        ...ee
      } = I,
      te = {
        ...I,
        isRtl: j,
        max: ie,
        min: ce,
        classes: L,
        disabled: H,
        disableSwap: z,
        orientation: Ce,
        marks: Z,
        color: w,
        size: X,
        step: W,
        scale: Te,
        track: Je,
        valueLabelDisplay: Fe,
        valueLabelFormat: Ze,
      },
      {
        axisProps: ye,
        getRootProps: he,
        getHiddenInputProps: xe,
        getThumbProps: Pe,
        open: se,
        active: we,
        axis: U,
        focusedThumbIndex: ge,
        range: Re,
        dragging: ft,
        marks: ht,
        values: st,
        trackOffset: Et,
        trackLeap: xt,
      } = Jh({
        ...te,
        rootRef: o,
      });
    (te.marked = ht.length > 0 && ht.some((be) => be.label)),
      (te.dragging = ft),
      (te.focusedThumbIndex = ge);
    const Qe = ky(te),
      lt = (r = (i = $e == null ? void 0 : $e.root) != null ? i : Q.Root) != null ? r : Wc,
      ut = (a = (s = $e == null ? void 0 : $e.rail) != null ? s : Q.Rail) != null ? a : Hc,
      Ht = (l = (c = $e == null ? void 0 : $e.track) != null ? c : Q.Track) != null ? l : qc,
      qt = (d = (u = $e == null ? void 0 : $e.thumb) != null ? u : Q.Thumb) != null ? d : Yc,
      on =
        (p = (h = $e == null ? void 0 : $e.valueLabel) != null ? h : Q.ValueLabel) != null ? p : Kc,
      Ot = (y = (g = $e == null ? void 0 : $e.mark) != null ? g : Q.Mark) != null ? y : Gc,
      Yt =
        (m = (v = $e == null ? void 0 : $e.markLabel) != null ? v : Q.MarkLabel) != null ? m : Xc,
      Kt = (C = (T = $e == null ? void 0 : $e.input) != null ? T : Q.Input) != null ? C : 'input',
      Ct = (O = pe == null ? void 0 : pe.root) != null ? O : V.root,
      hn = (E = pe == null ? void 0 : pe.rail) != null ? E : V.rail,
      rn = (f = pe == null ? void 0 : pe.track) != null ? f : V.track,
      Tt = (S = pe == null ? void 0 : pe.thumb) != null ? S : V.thumb,
      Dt = (R = pe == null ? void 0 : pe.valueLabel) != null ? R : V.valueLabel,
      Gt = (D = pe == null ? void 0 : pe.mark) != null ? D : V.mark,
      bn = (B = pe == null ? void 0 : pe.markLabel) != null ? B : V.markLabel,
      at = (N = pe == null ? void 0 : pe.input) != null ? N : V.input,
      x = Pt({
        elementType: lt,
        getSlotProps: he,
        externalSlotProps: Ct,
        externalForwardedProps: ee,
        additionalProps: {
          ...(Ry(lt) && {
            as: ae,
          }),
        },
        ownerState: {
          ...te,
          ...(Ct == null ? void 0 : Ct.ownerState),
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
        elementType: Ht,
        externalSlotProps: rn,
        additionalProps: {
          style: {
            ...ye[U].offset(Et),
            ...ye[U].leap(xt),
          },
        },
        ownerState: {
          ...te,
          ...(rn == null ? void 0 : rn.ownerState),
        },
        className: Qe.track,
      }),
      $ = Pt({
        elementType: qt,
        getSlotProps: Pe,
        externalSlotProps: Tt,
        ownerState: {
          ...te,
          ...(Tt == null ? void 0 : Tt.ownerState),
        },
        className: Qe.thumb,
      }),
      k = Pt({
        elementType: on,
        externalSlotProps: Dt,
        ownerState: {
          ...te,
          ...(Dt == null ? void 0 : Dt.ownerState),
        },
        className: Qe.valueLabel,
      }),
      Y = Pt({
        elementType: Ot,
        externalSlotProps: Gt,
        ownerState: te,
        className: Qe.mark,
      }),
      ne = Pt({
        elementType: Yt,
        externalSlotProps: bn,
        ownerState: te,
        className: Qe.markLabel,
      }),
      fe = Pt({
        elementType: Kt,
        getSlotProps: xe,
        externalSlotProps: at,
        ownerState: te,
      });
    return /* @__PURE__ */ Xe(lt, {
      ...x,
      children: [
        /* @__PURE__ */ M(ut, {
          ...F,
        }),
        /* @__PURE__ */ M(Ht, {
          ...le,
        }),
        ht
          .filter((be) => be.value >= ce && be.value <= ie)
          .map((be, ve) => {
            const Se = or(be.value, ce, ie),
              Oe = ye[U].offset(Se);
            let Ve;
            return (
              Je === !1
                ? (Ve = st.indexOf(be.value) !== -1)
                : (Ve =
                    (Je === 'normal' &&
                      (Re
                        ? be.value >= st[0] && be.value <= st[st.length - 1]
                        : be.value <= st[0])) ||
                    (Je === 'inverted' &&
                      (Re
                        ? be.value <= st[0] || be.value >= st[st.length - 1]
                        : be.value >= st[0]))),
              /* @__PURE__ */ Xe(
                b.Fragment,
                {
                  children: [
                    /* @__PURE__ */ M(Ot, {
                      'data-index': ve,
                      ...Y,
                      ...(!dn(Ot) && {
                        markActive: Ve,
                      }),
                      style: {
                        ...Oe,
                        ...Y.style,
                      },
                      className: Ee(Y.className, Ve && Qe.markActive),
                    }),
                    be.label != null
                      ? /* @__PURE__ */ M(Yt, {
                          'aria-hidden': !0,
                          'data-index': ve,
                          ...ne,
                          ...(!dn(Yt) && {
                            markLabelActive: Ve,
                          }),
                          style: {
                            ...Oe,
                            ...ne.style,
                          },
                          className: Ee(Qe.markLabel, ne.className, Ve && Qe.markLabelActive),
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
          const Se = or(be, ce, ie),
            Oe = ye[U].offset(Se),
            Ve = Fe === 'off' ? Ny : on;
          return (
            /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
            /* @__PURE__ */ M(
              Ve,
              {
                ...(!dn(Ve) && {
                  valueLabelFormat: Ze,
                  valueLabelDisplay: Fe,
                  value: typeof Ze == 'function' ? Ze(Te(be), ve) : Ze,
                  index: ve,
                  open: se === ve || we === ve || Fe === 'on',
                  disabled: H,
                }),
                ...k,
                children: /* @__PURE__ */ M(qt, {
                  'data-index': ve,
                  ...$,
                  className: Ee(
                    Qe.thumb,
                    $.className,
                    we === ve && Qe.active,
                    ge === ve && Qe.focusVisible,
                  ),
                  style: {
                    ...Oe,
                    pointerEvents: z && we !== ve ? 'none' : void 0,
                    ...$.style,
                  },
                  children: /* @__PURE__ */ M(Kt, {
                    'data-index': ve,
                    'aria-label': K ? K(ve) : _,
                    'aria-valuenow': Te(be),
                    'aria-labelledby': q,
                    'aria-valuetext': re ? re(Te(be), ve) : A,
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
  (Jc.propTypes = {
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
const Py = Jc;
function Iy(e) {
  return Ie('MuiSnackbarContent', e);
}
Ne('MuiSnackbarContent', ['root', 'message', 'action']);
const My = (e) => {
    const { classes: t } = e;
    return _e(
      {
        root: ['root'],
        action: ['action'],
        message: ['message'],
      },
      Iy,
      t,
    );
  },
  _y = de(ko, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 0.8 : 0.98,
      o = Mf(e.palette.background.default, t);
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
  Ay = de('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({
    padding: '8px 0',
  }),
  Dy = de('div', {
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
  Zc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
        props: t,
        name: 'MuiSnackbarContent',
      }),
      { action: i, className: a, message: s, role: l = 'alert', ...c } = r,
      d = r,
      u = My(d);
    return /* @__PURE__ */ Xe(_y, {
      role: l,
      square: !0,
      elevation: 6,
      className: Ee(u.root, a),
      ownerState: d,
      ref: o,
      ...c,
      children: [
        /* @__PURE__ */ M(Ay, {
          className: u.message,
          ownerState: d,
          children: s,
        }),
        i
          ? /* @__PURE__ */ M(Dy, {
              className: u.action,
              ownerState: d,
              children: i,
            })
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Zc.propTypes = {
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
const Ly = Zc;
function jy(e) {
  return Ie('MuiSnackbar', e);
}
Ne('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const Fy = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = {
        root: ['root', `anchorOrigin${oe(o.vertical)}${oe(o.horizontal)}`],
      };
    return _e(r, jy, t);
  },
  Ws = de('div', {
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
  Qc = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
        props: t,
        name: 'MuiSnackbar',
      }),
      i = Gn(),
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
        onClose: C,
        onFocus: T,
        onMouseEnter: O,
        onMouseLeave: E,
        open: f,
        resumeHideDuration: S,
        TransitionComponent: R = wc,
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
        TransitionComponent: R,
        transitionDuration: D,
      },
      _ = Fy(j),
      { getRootProps: A, onClickAway: q } = Zh({
        ...j,
      }),
      [ae, Q] = b.useState(!0),
      V = Pt({
        elementType: Ws,
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
      L = (G, z) => {
        Q(!1), B && B(G, z);
      };
    return !f && ae
      ? null
      : /* @__PURE__ */ M(Zo, {
          onClickAway: q,
          ...h,
          children: /* @__PURE__ */ M(Ws, {
            ...V,
            children: /* @__PURE__ */ M(R, {
              appear: !0,
              in: f,
              timeout: D,
              direction: l === 'top' ? 'down' : 'up',
              onEnter: L,
              onExited: w,
              ...I,
              children:
                u ||
                /* @__PURE__ */ M(Ly, {
                  message: m,
                  action: s,
                  ...y,
                }),
            }),
          }),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (Qc.propTypes = {
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
const Vy = Qc;
function zy(e) {
  return Ie('MuiSwitch', e);
}
const By = Ne('MuiSwitch', [
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
  mt = By,
  Uy = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${oe(o)}`, `size${oe(r)}`],
        switchBase: ['switchBase', `color${oe(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = _e(l, zy, t);
    return {
      ...t,
      // forward the disabled and checked classes to the SwitchBase
      ...c,
    };
  },
  Wy = de('span', {
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
  Hy = de(yc, {
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
          : Ye(e.palette.action.active, e.palette.action.hoverOpacity),
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
              : Ye(e.palette[t.color].main, e.palette.action.hoverOpacity),
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
          [`&.${mt.disabled}`]: {
            color: e.vars
              ? e.vars.palette.Switch[`${t.color}DisabledColor`]
              : `${
                  e.palette.mode === 'light'
                    ? Rr(e.palette[t.color].main, 0.62)
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
  qy = de('span', {
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
  Yy = de('span', {
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
  eu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
      p = Uy(u),
      h = /* @__PURE__ */ M(Yy, {
        className: p.thumb,
        ownerState: u,
      });
    return /* @__PURE__ */ Xe(Wy, {
      className: Ee(p.root, i),
      sx: c,
      ownerState: u,
      children: [
        /* @__PURE__ */ M(Hy, {
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
        /* @__PURE__ */ M(qy, {
          className: p.track,
          ownerState: u,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (eu.propTypes = {
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
const Ky = eu;
function Gy(e) {
  return Ie('MuiTextField', e);
}
Ne('MuiTextField', ['root']);
const Xy = {
    standard: $c,
    filled: Oc,
    outlined: zc,
  },
  Jy = (e) => {
    const { classes: t } = e;
    return _e(
      {
        root: ['root'],
      },
      Gy,
      t,
    );
  },
  Zy = de(lg, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  tu = /* @__PURE__ */ b.forwardRef(function (t, o) {
    const r = Le({
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
        inputProps: C,
        InputProps: T,
        inputRef: O,
        label: E,
        maxRows: f,
        minRows: S,
        multiline: R = !1,
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
        value: V,
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
        multiline: R,
        required: _,
        select: q,
        variant: w,
      },
      z = Jy(G);
    process.env.NODE_ENV !== 'production' &&
      q &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const H = {};
    w === 'outlined' && (v && typeof v.shrink < 'u' && (H.notched = v.shrink), (H.label = E)),
      q && ((!ae || !ae.native) && (H.id = void 0), (H['aria-describedby'] = void 0));
    const K = il(m),
      re = g && K ? `${K}-helper-text` : void 0,
      Z = E && K ? `${K}-label` : void 0,
      ie = Xy[w],
      ce = /* @__PURE__ */ M(ie, {
        'aria-describedby': re,
        autoComplete: i,
        autoFocus: a,
        defaultValue: d,
        fullWidth: y,
        multiline: R,
        name: D,
        rows: A,
        maxRows: f,
        minRows: S,
        type: Q,
        value: V,
        id: K,
        inputRef: O,
        onBlur: B,
        onChange: N,
        onFocus: J,
        onClick: I,
        placeholder: j,
        inputProps: C,
        ...H,
        ...T,
      });
    return /* @__PURE__ */ Xe(Zy, {
      className: Ee(z.root, l),
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
          /* @__PURE__ */ M(Sg, {
            htmlFor: K,
            id: Z,
            ...v,
            children: E,
          }),
        q
          ? /* @__PURE__ */ M(Cy, {
              'aria-describedby': re,
              id: K,
              labelId: Z,
              value: V,
              input: ce,
              ...ae,
              children: s,
            })
          : ce,
        g &&
          /* @__PURE__ */ M(fg, {
            id: re,
            ...h,
            children: g,
          }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (tu.propTypes = {
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
const nu = tu;
function Mn({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return /* @__PURE__ */ M(Dv, {
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
function r0({
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
  const d = /* @__PURE__ */ M(Jv, {
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
    u = /* @__PURE__ */ Xe(Sc, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [p && g, m, !p && g],
    });
  } else u = d;
  return u;
}
function Qy({
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
  return /* @__PURE__ */ M(Ov, {
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
      /* @__PURE__ */ M(nu, {
        ...h,
        error: r,
        fullWidth: i,
        disabled: t,
        label: e,
        style: { width: a },
      }),
  });
}
const Zn = [
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
  ia = 1,
  ou = Zn.length - 1,
  ru = 1,
  iu = 1,
  e0 = (e) => Zn.findIndex((t) => t.fullNames.includes(e)),
  Hs = (e) => Zn[e < ia || e > ou ? 0 : e].fullNames[0],
  qs = () => {
    const e = [];
    return (
      Zn.slice(1).forEach((t) => {
        const o = t.fullNames[0];
        e.push(o);
      }),
      e
    );
  },
  t0 = (e) => Zn[e].chapters,
  Ys = (e, t) => ({
    book: Math.max(ia, Math.min(e.book + t, ou)),
    chapter: 1,
    verse: 1,
  }),
  Ks = (e, t) => ({
    ...e,
    chapter: Math.min(Math.max(ru, e.chapter + t), Zn[e.book].chapters),
    verse: 1,
  }),
  Gs = (e, t) => ({
    ...e,
    verse: Math.max(iu, e.verse + t),
  });
function Xs({
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
  return /* @__PURE__ */ M(nu, {
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
function i0({ scrRef: e, handleSubmit: t }) {
  const [o, r] = cu(Hs(e.book)),
    i = (c) => {
      r(Hs(c.book)), t(c);
    },
    a = (c, d) => {
      const p = { book: e0(d), chapter: 1, verse: 1 };
      i(p);
    },
    s = (c) => {
      t({ ...e, chapter: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verse: +c.target.value });
    };
  return /* @__PURE__ */ Xe(fu, {
    children: [
      /* @__PURE__ */ M(Qy, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: qs(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ M(Mn, {
        onClick: () => i(Ys(e, -1)),
        isDisabled: e.book <= ia,
        children: '<',
      }),
      /* @__PURE__ */ M(Mn, {
        onClick: () => i(Ys(e, 1)),
        isDisabled: e.book >= qs().length,
        children: '>',
      }),
      /* @__PURE__ */ M(Xs, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapter,
        onChange: s,
      }),
      /* @__PURE__ */ M(Mn, {
        onClick: () => t(Ks(e, -1)),
        isDisabled: e.chapter <= ru,
        children: '<',
      }),
      /* @__PURE__ */ M(Mn, {
        onClick: () => t(Ks(e, 1)),
        isDisabled: e.chapter >= t0(e.book),
        children: '>',
      }),
      /* @__PURE__ */ M(Xs, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verse,
        onChange: l,
      }),
      /* @__PURE__ */ M(Mn, {
        onClick: () => t(Gs(e, -1)),
        isDisabled: e.verse <= iu,
        children: '<',
      }),
      /* @__PURE__ */ M(Mn, { onClick: () => t(Gs(e, 1)), children: '>' }),
    ],
  });
}
function a0({
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
  return /* @__PURE__ */ M(Py, {
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
function s0({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return /* @__PURE__ */ M(Ky, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function l0({
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
  return /* @__PURE__ */ M(Vy, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: i,
    ContentProps: a,
    children: s,
  });
}
function c0({
  hasAutoFocus: e = !1,
  className: t,
  isDense: o = !1,
  hasDisabledGutters: r = !1,
  hasDivider: i = !1,
  focusVisibleClassName: a,
  onClick: s,
  children: l,
}) {
  return /* @__PURE__ */ M(Zg, {
    autoFocus: e,
    className: t,
    dense: o,
    disableGutters: r,
    divider: i,
    focusVisibleClassName: a,
    onClick: s,
    children: l,
  });
}
export {
  Mn as Button,
  r0 as Checkbox,
  Qy as ComboBox,
  Dn as LabelPosition,
  c0 as MenuItem,
  i0 as RefSelector,
  a0 as Slider,
  l0 as Snackbar,
  s0 as Switch,
  Xs as TextField,
};
//# sourceMappingURL=index.es.js.map
