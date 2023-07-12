import * as x from 'react';
import Ht, {
  useLayoutEffect as Nu,
  forwardRef as $u,
  useContext as _o,
  createContext as bl,
  createElement as xn,
  Fragment as ka,
  useRef as Pu,
  Children as Iu,
  isValidElement as Jo,
  cloneElement as Zo,
  useState as _u,
  useMemo as Mu,
} from 'react';
import * as gl from 'react-dom';
import zo from 'react-dom';
import Au, { SelectColumn as Du } from 'react-data-grid';
function Lu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var ia = { exports: {} },
  co = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yi;
function Fu() {
  if (yi) return co;
  yi = 1;
  var e = Ht,
    t = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    r = Object.prototype.hasOwnProperty,
    a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, u) {
    var d,
      p = {},
      b = null,
      y = null;
    u !== void 0 && (b = '' + u),
      c.key !== void 0 && (b = '' + c.key),
      c.ref !== void 0 && (y = c.ref);
    for (d in c) r.call(c, d) && !i.hasOwnProperty(d) && (p[d] = c[d]);
    if (l && l.defaultProps) for (d in ((c = l.defaultProps), c)) p[d] === void 0 && (p[d] = c[d]);
    return { $$typeof: t, type: l, key: b, ref: y, props: p, _owner: a.current };
  }
  return (co.Fragment = o), (co.jsx = s), (co.jsxs = s), co;
}
var uo = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xi;
function ju() {
  return (
    xi ||
      ((xi = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Ht,
            t = Symbol.for('react.element'),
            o = Symbol.for('react.portal'),
            r = Symbol.for('react.fragment'),
            a = Symbol.for('react.strict_mode'),
            i = Symbol.for('react.profiler'),
            s = Symbol.for('react.provider'),
            l = Symbol.for('react.context'),
            c = Symbol.for('react.forward_ref'),
            u = Symbol.for('react.suspense'),
            d = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            b = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            v = Symbol.iterator,
            h = '@@iterator';
          function m(O) {
            if (O === null || typeof O != 'object') return null;
            var q = (v && O[v]) || O[h];
            return typeof q == 'function' ? q : null;
          }
          var S = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function T(O) {
            {
              for (var q = arguments.length, ce = new Array(q > 1 ? q - 1 : 0), N = 1; N < q; N++)
                ce[N - 1] = arguments[N];
              C('error', O, ce);
            }
          }
          function C(O, q, ce) {
            {
              var N = S.ReactDebugCurrentFrame,
                $ = N.getStackAddendum();
              $ !== '' && ((q += '%s'), (ce = ce.concat([$])));
              var K = ce.map(function (te) {
                return String(te);
              });
              K.unshift('Warning: ' + q), Function.prototype.apply.call(console[O], console, K);
            }
          }
          var E = !1,
            f = !1,
            w = !1,
            k = !1,
            V = !1,
            L;
          L = Symbol.for('react.module.reference');
          function D(O) {
            return !!(
              typeof O == 'string' ||
              typeof O == 'function' ||
              O === r ||
              O === i ||
              V ||
              O === a ||
              O === u ||
              O === d ||
              k ||
              O === y ||
              E ||
              f ||
              w ||
              (typeof O == 'object' &&
                O !== null &&
                (O.$$typeof === b ||
                  O.$$typeof === p ||
                  O.$$typeof === s ||
                  O.$$typeof === l ||
                  O.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  O.$$typeof === L ||
                  O.getModuleId !== void 0))
            );
          }
          function _(O, q, ce) {
            var N = O.displayName;
            if (N) return N;
            var $ = q.displayName || q.name || '';
            return $ !== '' ? ce + '(' + $ + ')' : ce;
          }
          function Y(O) {
            return O.displayName || 'Context';
          }
          function B(O) {
            if (O == null) return null;
            if (
              (typeof O.tag == 'number' &&
                T(
                  'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.',
                ),
              typeof O == 'function')
            )
              return O.displayName || O.name || null;
            if (typeof O == 'string') return O;
            switch (O) {
              case r:
                return 'Fragment';
              case o:
                return 'Portal';
              case i:
                return 'Profiler';
              case a:
                return 'StrictMode';
              case u:
                return 'Suspense';
              case d:
                return 'SuspenseList';
            }
            if (typeof O == 'object')
              switch (O.$$typeof) {
                case l:
                  var q = O;
                  return Y(q) + '.Consumer';
                case s:
                  var ce = O;
                  return Y(ce._context) + '.Provider';
                case c:
                  return _(O, O.render, 'ForwardRef');
                case p:
                  var N = O.displayName || null;
                  return N !== null ? N : B(O.type) || 'Memo';
                case b: {
                  var $ = O,
                    K = $._payload,
                    te = $._init;
                  try {
                    return B(te(K));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var M = Object.assign,
            F = 0,
            z,
            ie,
            se,
            G,
            R,
            j,
            X;
          function H() {}
          H.__reactDisabledLog = !0;
          function U() {
            {
              if (F === 0) {
                (z = console.log),
                  (ie = console.info),
                  (se = console.warn),
                  (G = console.error),
                  (R = console.group),
                  (j = console.groupCollapsed),
                  (X = console.groupEnd);
                var O = {
                  configurable: !0,
                  enumerable: !0,
                  value: H,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  info: O,
                  log: O,
                  warn: O,
                  error: O,
                  group: O,
                  groupCollapsed: O,
                  groupEnd: O,
                });
              }
              F++;
            }
          }
          function ne() {
            {
              if ((F--, F === 0)) {
                var O = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: M({}, O, {
                    value: z,
                  }),
                  info: M({}, O, {
                    value: ie,
                  }),
                  warn: M({}, O, {
                    value: se,
                  }),
                  error: M({}, O, {
                    value: G,
                  }),
                  group: M({}, O, {
                    value: R,
                  }),
                  groupCollapsed: M({}, O, {
                    value: j,
                  }),
                  groupEnd: M({}, O, {
                    value: X,
                  }),
                });
              }
              F < 0 &&
                T('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var oe = S.ReactCurrentDispatcher,
            J;
          function ae(O, q, ce) {
            {
              if (J === void 0)
                try {
                  throw Error();
                } catch ($) {
                  var N = $.stack.trim().match(/\n( *(at )?)/);
                  J = (N && N[1]) || '';
                }
              return (
                `
` +
                J +
                O
              );
            }
          }
          var le = !1,
            he;
          {
            var re = typeof WeakMap == 'function' ? WeakMap : Map;
            he = new re();
          }
          function P(O, q) {
            if (!O || le) return '';
            {
              var ce = he.get(O);
              if (ce !== void 0) return ce;
            }
            var N;
            le = !0;
            var $ = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var K;
            (K = oe.current), (oe.current = null), U();
            try {
              if (q) {
                var te = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(te.prototype, 'props', {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == 'object' && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(te, []);
                  } catch (pn) {
                    N = pn;
                  }
                  Reflect.construct(O, [], te);
                } else {
                  try {
                    te.call();
                  } catch (pn) {
                    N = pn;
                  }
                  O.call(te.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (pn) {
                  N = pn;
                }
                O();
              }
            } catch (pn) {
              if (pn && N && typeof pn.stack == 'string') {
                for (
                  var de = pn.stack.split(`
`),
                    Re = N.stack.split(`
`),
                    we = de.length - 1,
                    Me = Re.length - 1;
                  we >= 1 && Me >= 0 && de[we] !== Re[Me];

                )
                  Me--;
                for (; we >= 1 && Me >= 0; we--, Me--)
                  if (de[we] !== Re[Me]) {
                    if (we !== 1 || Me !== 1)
                      do
                        if ((we--, Me--, Me < 0 || de[we] !== Re[Me])) {
                          var gt =
                            `
` + de[we].replace(' at new ', ' at ');
                          return (
                            O.displayName &&
                              gt.includes('<anonymous>') &&
                              (gt = gt.replace('<anonymous>', O.displayName)),
                            typeof O == 'function' && he.set(O, gt),
                            gt
                          );
                        }
                      while (we >= 1 && Me >= 0);
                    break;
                  }
              }
            } finally {
              (le = !1), (oe.current = K), ne(), (Error.prepareStackTrace = $);
            }
            var Ln = O ? O.displayName || O.name : '',
              gi = Ln ? ae(Ln) : '';
            return typeof O == 'function' && he.set(O, gi), gi;
          }
          function Oe(O, q, ce) {
            return P(O, !1);
          }
          function I(O) {
            var q = O.prototype;
            return !!(q && q.isReactComponent);
          }
          function W(O, q, ce) {
            if (O == null) return '';
            if (typeof O == 'function') return P(O, I(O));
            if (typeof O == 'string') return ae(O);
            switch (O) {
              case u:
                return ae('Suspense');
              case d:
                return ae('SuspenseList');
            }
            if (typeof O == 'object')
              switch (O.$$typeof) {
                case c:
                  return Oe(O.render);
                case p:
                  return W(O.type, q, ce);
                case b: {
                  var N = O,
                    $ = N._payload,
                    K = N._init;
                  try {
                    return W(K($), q, ce);
                  } catch {}
                }
              }
            return '';
          }
          var Ne = Object.prototype.hasOwnProperty,
            ge = {},
            et = S.ReactDebugCurrentFrame;
          function je(O) {
            if (O) {
              var q = O._owner,
                ce = W(O.type, O._source, q ? q.type : null);
              et.setExtraStackFrame(ce);
            } else et.setExtraStackFrame(null);
          }
          function Se(O, q, ce, N, $) {
            {
              var K = Function.call.bind(Ne);
              for (var te in O)
                if (K(O, te)) {
                  var de = void 0;
                  try {
                    if (typeof O[te] != 'function') {
                      var Re = Error(
                        (N || 'React class') +
                          ': ' +
                          ce +
                          ' type `' +
                          te +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof O[te] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((Re.name = 'Invariant Violation'), Re);
                    }
                    de = O[te](q, te, N, ce, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (we) {
                    de = we;
                  }
                  de &&
                    !(de instanceof Error) &&
                    (je($),
                    T(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      N || 'React class',
                      ce,
                      te,
                      typeof de,
                    ),
                    je(null)),
                    de instanceof Error &&
                      !(de.message in ge) &&
                      ((ge[de.message] = !0),
                      je($),
                      T('Failed %s type: %s', ce, de.message),
                      je(null));
                }
            }
          }
          var ke = Array.isArray;
          function tt(O) {
            return ke(O);
          }
          function at(O) {
            {
              var q = typeof Symbol == 'function' && Symbol.toStringTag,
                ce = (q && O[Symbol.toStringTag]) || O.constructor.name || 'Object';
              return ce;
            }
          }
          function Z(O) {
            try {
              return me(O), !1;
            } catch {
              return !0;
            }
          }
          function me(O) {
            return '' + O;
          }
          function ve(O) {
            if (Z(O))
              return (
                T(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  at(O),
                ),
                me(O)
              );
          }
          var be = S.ReactCurrentOwner,
            fe = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            ue,
            ee,
            ye;
          ye = {};
          function xe(O) {
            if (Ne.call(O, 'ref')) {
              var q = Object.getOwnPropertyDescriptor(O, 'ref').get;
              if (q && q.isReactWarning) return !1;
            }
            return O.ref !== void 0;
          }
          function Ie(O) {
            if (Ne.call(O, 'key')) {
              var q = Object.getOwnPropertyDescriptor(O, 'key').get;
              if (q && q.isReactWarning) return !1;
            }
            return O.key !== void 0;
          }
          function it(O, q) {
            if (typeof O.ref == 'string' && be.current && q && be.current.stateNode !== q) {
              var ce = B(be.current.type);
              ye[ce] ||
                (T(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  B(be.current.type),
                  O.ref,
                ),
                (ye[ce] = !0));
            }
          }
          function ft(O, q) {
            {
              var ce = function () {
                ue ||
                  ((ue = !0),
                  T(
                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    q,
                  ));
              };
              (ce.isReactWarning = !0),
                Object.defineProperty(O, 'key', {
                  get: ce,
                  configurable: !0,
                });
            }
          }
          function Tt(O, q) {
            {
              var ce = function () {
                ee ||
                  ((ee = !0),
                  T(
                    '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    q,
                  ));
              };
              (ce.isReactWarning = !0),
                Object.defineProperty(O, 'ref', {
                  get: ce,
                  configurable: !0,
                });
            }
          }
          var hn = function (O, q, ce, N, $, K, te) {
            var de = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: O,
              key: q,
              ref: ce,
              props: te,
              // Record the component responsible for creating this element.
              _owner: K,
            };
            return (
              (de._store = {}),
              Object.defineProperty(de._store, 'validated', {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(de, '_self', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: N,
              }),
              Object.defineProperty(de, '_source', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: $,
              }),
              Object.freeze && (Object.freeze(de.props), Object.freeze(de)),
              de
            );
          };
          function St(O, q, ce, N, $) {
            {
              var K,
                te = {},
                de = null,
                Re = null;
              ce !== void 0 && (ve(ce), (de = '' + ce)),
                Ie(q) && (ve(q.key), (de = '' + q.key)),
                xe(q) && ((Re = q.ref), it(q, $));
              for (K in q) Ne.call(q, K) && !fe.hasOwnProperty(K) && (te[K] = q[K]);
              if (O && O.defaultProps) {
                var we = O.defaultProps;
                for (K in we) te[K] === void 0 && (te[K] = we[K]);
              }
              if (de || Re) {
                var Me = typeof O == 'function' ? O.displayName || O.name || 'Unknown' : O;
                de && ft(te, Me), Re && Tt(te, Me);
              }
              return hn(O, de, Re, $, N, be.current, te);
            }
          }
          var bt = S.ReactCurrentOwner,
            xt = S.ReactDebugCurrentFrame;
          function mt(O) {
            if (O) {
              var q = O._owner,
                ce = W(O.type, O._source, q ? q.type : null);
              xt.setExtraStackFrame(ce);
            } else xt.setExtraStackFrame(null);
          }
          var nt;
          nt = !1;
          function ot(O) {
            return typeof O == 'object' && O !== null && O.$$typeof === t;
          }
          function ht() {
            {
              if (bt.current) {
                var O = B(bt.current.type);
                if (O)
                  return (
                    `

Check the render method of \`` +
                    O +
                    '`.'
                  );
              }
              return '';
            }
          }
          function Sn(O) {
            {
              if (O !== void 0) {
                var q = O.fileName.replace(/^.*[\\\/]/, ''),
                  ce = O.lineNumber;
                return (
                  `

Check your code at ` +
                  q +
                  ':' +
                  ce +
                  '.'
                );
              }
              return '';
            }
          }
          var Jt = {};
          function bn(O) {
            {
              var q = ht();
              if (!q) {
                var ce = typeof O == 'string' ? O : O.displayName || O.name;
                ce &&
                  (q =
                    `

Check the top-level render call using <` +
                    ce +
                    '>.');
              }
              return q;
            }
          }
          function Bt(O, q) {
            {
              if (!O._store || O._store.validated || O.key != null) return;
              O._store.validated = !0;
              var ce = bn(q);
              if (Jt[ce]) return;
              Jt[ce] = !0;
              var N = '';
              O &&
                O._owner &&
                O._owner !== bt.current &&
                (N = ' It was passed a child from ' + B(O._owner.type) + '.'),
                mt(O),
                T(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  ce,
                  N,
                ),
                mt(null);
            }
          }
          function ln(O, q) {
            {
              if (typeof O != 'object') return;
              if (tt(O))
                for (var ce = 0; ce < O.length; ce++) {
                  var N = O[ce];
                  ot(N) && Bt(N, q);
                }
              else if (ot(O)) O._store && (O._store.validated = !0);
              else if (O) {
                var $ = m(O);
                if (typeof $ == 'function' && $ !== O.entries)
                  for (var K = $.call(O), te; !(te = K.next()).done; )
                    ot(te.value) && Bt(te.value, q);
              }
            }
          }
          function cn(O) {
            {
              var q = O.type;
              if (q == null || typeof q == 'string') return;
              var ce;
              if (typeof q == 'function') ce = q.propTypes;
              else if (
                typeof q == 'object' &&
                (q.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  q.$$typeof === p)
              )
                ce = q.propTypes;
              else return;
              if (ce) {
                var N = B(q);
                Se(ce, O.props, 'prop', N, O);
              } else if (q.PropTypes !== void 0 && !nt) {
                nt = !0;
                var $ = B(q);
                T(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  $ || 'Unknown',
                );
              }
              typeof q.getDefaultProps == 'function' &&
                !q.getDefaultProps.isReactClassApproved &&
                T(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function un(O) {
            {
              for (var q = Object.keys(O.props), ce = 0; ce < q.length; ce++) {
                var N = q[ce];
                if (N !== 'children' && N !== 'key') {
                  mt(O),
                    T(
                      'Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
                      N,
                    ),
                    mt(null);
                  break;
                }
              }
              O.ref !== null &&
                (mt(O), T('Invalid attribute `ref` supplied to `React.Fragment`.'), mt(null));
            }
          }
          function Zt(O, q, ce, N, $, K) {
            {
              var te = D(O);
              if (!te) {
                var de = '';
                (O === void 0 ||
                  (typeof O == 'object' && O !== null && Object.keys(O).length === 0)) &&
                  (de +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var Re = Sn($);
                Re ? (de += Re) : (de += ht());
                var we;
                O === null
                  ? (we = 'null')
                  : tt(O)
                  ? (we = 'array')
                  : O !== void 0 && O.$$typeof === t
                  ? ((we = '<' + (B(O.type) || 'Unknown') + ' />'),
                    (de = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (we = typeof O),
                  T(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    we,
                    de,
                  );
              }
              var Me = St(O, q, ce, $, K);
              if (Me == null) return Me;
              if (te) {
                var gt = q.children;
                if (gt !== void 0)
                  if (N)
                    if (tt(gt)) {
                      for (var Ln = 0; Ln < gt.length; Ln++) ln(gt[Ln], O);
                      Object.freeze && Object.freeze(gt);
                    } else
                      T(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else ln(gt, O);
              }
              return O === r ? un(Me) : cn(Me), Me;
            }
          }
          function dn(O, q, ce) {
            return Zt(O, q, ce, !0);
          }
          function _e(O, q, ce) {
            return Zt(O, q, ce, !1);
          }
          var ut = _e,
            At = dn;
          (uo.Fragment = r), (uo.jsx = ut), (uo.jsxs = At);
        })()),
    uo
  );
}
process.env.NODE_ENV === 'production' ? (ia.exports = Fu()) : (ia.exports = ju());
var Ra = ia.exports;
const Vu = Ra.Fragment,
  A = Ra.jsx,
  Qe = Ra.jsxs,
  zu = {
    black: '#000',
    white: '#fff',
  },
  ko = zu,
  Bu = {
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
  Fn = Bu,
  Uu = {
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
  jn = Uu,
  Wu = {
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
  Vn = Wu,
  Hu = {
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
  zn = Hu,
  qu = {
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
  Bn = qu,
  Yu = {
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
  po = Yu,
  Ku = {
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
  Gu = Ku;
function Kt(e, t) {
  return process.env.NODE_ENV === 'production'
    ? () => null
    : function (...r) {
        return e(...r) || t(...r);
      };
}
function g() {
  return (
    (g = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
          }
          return e;
        }),
    g.apply(this, arguments)
  );
}
function Hn(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function vl(e) {
  if (!Hn(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = vl(e[o]);
    }),
    t
  );
}
function Ft(
  e,
  t,
  o = {
    clone: !0,
  },
) {
  const r = o.clone ? g({}, e) : e;
  return (
    Hn(e) &&
      Hn(t) &&
      Object.keys(t).forEach((a) => {
        a !== '__proto__' &&
          (Hn(t[a]) && a in e && Hn(e[a])
            ? (r[a] = Ft(e[a], t[a], o))
            : o.clone
            ? (r[a] = Hn(t[a]) ? vl(t[a]) : t[a])
            : (r[a] = t[a]));
      }),
    r
  );
}
var sa = { exports: {} },
  Bo = { exports: {} },
  Be = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ei;
function Xu() {
  if (Ei) return Be;
  Ei = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    o = e ? Symbol.for('react.portal') : 60106,
    r = e ? Symbol.for('react.fragment') : 60107,
    a = e ? Symbol.for('react.strict_mode') : 60108,
    i = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    l = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    u = e ? Symbol.for('react.concurrent_mode') : 60111,
    d = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    b = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    v = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    m = e ? Symbol.for('react.fundamental') : 60117,
    S = e ? Symbol.for('react.responder') : 60118,
    T = e ? Symbol.for('react.scope') : 60119;
  function C(f) {
    if (typeof f == 'object' && f !== null) {
      var w = f.$$typeof;
      switch (w) {
        case t:
          switch (((f = f.type), f)) {
            case c:
            case u:
            case r:
            case i:
            case a:
            case p:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case d:
                case v:
                case y:
                case s:
                  return f;
                default:
                  return w;
              }
          }
        case o:
          return w;
      }
    }
  }
  function E(f) {
    return C(f) === u;
  }
  return (
    (Be.AsyncMode = c),
    (Be.ConcurrentMode = u),
    (Be.ContextConsumer = l),
    (Be.ContextProvider = s),
    (Be.Element = t),
    (Be.ForwardRef = d),
    (Be.Fragment = r),
    (Be.Lazy = v),
    (Be.Memo = y),
    (Be.Portal = o),
    (Be.Profiler = i),
    (Be.StrictMode = a),
    (Be.Suspense = p),
    (Be.isAsyncMode = function (f) {
      return E(f) || C(f) === c;
    }),
    (Be.isConcurrentMode = E),
    (Be.isContextConsumer = function (f) {
      return C(f) === l;
    }),
    (Be.isContextProvider = function (f) {
      return C(f) === s;
    }),
    (Be.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (Be.isForwardRef = function (f) {
      return C(f) === d;
    }),
    (Be.isFragment = function (f) {
      return C(f) === r;
    }),
    (Be.isLazy = function (f) {
      return C(f) === v;
    }),
    (Be.isMemo = function (f) {
      return C(f) === y;
    }),
    (Be.isPortal = function (f) {
      return C(f) === o;
    }),
    (Be.isProfiler = function (f) {
      return C(f) === i;
    }),
    (Be.isStrictMode = function (f) {
      return C(f) === a;
    }),
    (Be.isSuspense = function (f) {
      return C(f) === p;
    }),
    (Be.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === u ||
        f === i ||
        f === a ||
        f === p ||
        f === b ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === v ||
            f.$$typeof === y ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === d ||
            f.$$typeof === m ||
            f.$$typeof === S ||
            f.$$typeof === T ||
            f.$$typeof === h))
      );
    }),
    (Be.typeOf = C),
    Be
  );
}
var Ue = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ci;
function Ju() {
  return (
    Ci ||
      ((Ci = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = typeof Symbol == 'function' && Symbol.for,
            t = e ? Symbol.for('react.element') : 60103,
            o = e ? Symbol.for('react.portal') : 60106,
            r = e ? Symbol.for('react.fragment') : 60107,
            a = e ? Symbol.for('react.strict_mode') : 60108,
            i = e ? Symbol.for('react.profiler') : 60114,
            s = e ? Symbol.for('react.provider') : 60109,
            l = e ? Symbol.for('react.context') : 60110,
            c = e ? Symbol.for('react.async_mode') : 60111,
            u = e ? Symbol.for('react.concurrent_mode') : 60111,
            d = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            b = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            v = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            m = e ? Symbol.for('react.fundamental') : 60117,
            S = e ? Symbol.for('react.responder') : 60118,
            T = e ? Symbol.for('react.scope') : 60119;
          function C(P) {
            return (
              typeof P == 'string' ||
              typeof P == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              P === r ||
              P === u ||
              P === i ||
              P === a ||
              P === p ||
              P === b ||
              (typeof P == 'object' &&
                P !== null &&
                (P.$$typeof === v ||
                  P.$$typeof === y ||
                  P.$$typeof === s ||
                  P.$$typeof === l ||
                  P.$$typeof === d ||
                  P.$$typeof === m ||
                  P.$$typeof === S ||
                  P.$$typeof === T ||
                  P.$$typeof === h))
            );
          }
          function E(P) {
            if (typeof P == 'object' && P !== null) {
              var Oe = P.$$typeof;
              switch (Oe) {
                case t:
                  var I = P.type;
                  switch (I) {
                    case c:
                    case u:
                    case r:
                    case i:
                    case a:
                    case p:
                      return I;
                    default:
                      var W = I && I.$$typeof;
                      switch (W) {
                        case l:
                        case d:
                        case v:
                        case y:
                        case s:
                          return W;
                        default:
                          return Oe;
                      }
                  }
                case o:
                  return Oe;
              }
            }
          }
          var f = c,
            w = u,
            k = l,
            V = s,
            L = t,
            D = d,
            _ = r,
            Y = v,
            B = y,
            M = o,
            F = i,
            z = a,
            ie = p,
            se = !1;
          function G(P) {
            return (
              se ||
                ((se = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              R(P) || E(P) === c
            );
          }
          function R(P) {
            return E(P) === u;
          }
          function j(P) {
            return E(P) === l;
          }
          function X(P) {
            return E(P) === s;
          }
          function H(P) {
            return typeof P == 'object' && P !== null && P.$$typeof === t;
          }
          function U(P) {
            return E(P) === d;
          }
          function ne(P) {
            return E(P) === r;
          }
          function oe(P) {
            return E(P) === v;
          }
          function J(P) {
            return E(P) === y;
          }
          function ae(P) {
            return E(P) === o;
          }
          function le(P) {
            return E(P) === i;
          }
          function he(P) {
            return E(P) === a;
          }
          function re(P) {
            return E(P) === p;
          }
          (Ue.AsyncMode = f),
            (Ue.ConcurrentMode = w),
            (Ue.ContextConsumer = k),
            (Ue.ContextProvider = V),
            (Ue.Element = L),
            (Ue.ForwardRef = D),
            (Ue.Fragment = _),
            (Ue.Lazy = Y),
            (Ue.Memo = B),
            (Ue.Portal = M),
            (Ue.Profiler = F),
            (Ue.StrictMode = z),
            (Ue.Suspense = ie),
            (Ue.isAsyncMode = G),
            (Ue.isConcurrentMode = R),
            (Ue.isContextConsumer = j),
            (Ue.isContextProvider = X),
            (Ue.isElement = H),
            (Ue.isForwardRef = U),
            (Ue.isFragment = ne),
            (Ue.isLazy = oe),
            (Ue.isMemo = J),
            (Ue.isPortal = ae),
            (Ue.isProfiler = le),
            (Ue.isStrictMode = he),
            (Ue.isSuspense = re),
            (Ue.isValidElementType = C),
            (Ue.typeOf = E);
        })()),
    Ue
  );
}
var Oi;
function yl() {
  return (
    Oi ||
      ((Oi = 1), process.env.NODE_ENV === 'production' ? (Bo.exports = Xu()) : (Bo.exports = Ju())),
    Bo.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ur, Ti;
function Zu() {
  if (Ti) return Ur;
  Ti = 1;
  var e = Object.getOwnPropertySymbols,
    t = Object.prototype.hasOwnProperty,
    o = Object.prototype.propertyIsEnumerable;
  function r(i) {
    if (i == null) throw new TypeError('Object.assign cannot be called with null or undefined');
    return Object(i);
  }
  function a() {
    try {
      if (!Object.assign) return !1;
      var i = new String('abc');
      if (((i[5] = 'de'), Object.getOwnPropertyNames(i)[0] === '5')) return !1;
      for (var s = {}, l = 0; l < 10; l++) s['_' + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(s).map(function (d) {
        return s[d];
      });
      if (c.join('') !== '0123456789') return !1;
      var u = {};
      return (
        'abcdefghijklmnopqrst'.split('').forEach(function (d) {
          u[d] = d;
        }),
        Object.keys(Object.assign({}, u)).join('') === 'abcdefghijklmnopqrst'
      );
    } catch {
      return !1;
    }
  }
  return (
    (Ur = a()
      ? Object.assign
      : function (i, s) {
          for (var l, c = r(i), u, d = 1; d < arguments.length; d++) {
            l = Object(arguments[d]);
            for (var p in l) t.call(l, p) && (c[p] = l[p]);
            if (e) {
              u = e(l);
              for (var b = 0; b < u.length; b++) o.call(l, u[b]) && (c[u[b]] = l[u[b]]);
            }
          }
          return c;
        }),
    Ur
  );
}
var Wr, Si;
function Na() {
  if (Si) return Wr;
  Si = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Wr = e), Wr;
}
var Hr, wi;
function xl() {
  return wi || ((wi = 1), (Hr = Function.call.bind(Object.prototype.hasOwnProperty))), Hr;
}
var qr, ki;
function Qu() {
  if (ki) return qr;
  ki = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = Na(),
      o = {},
      r = xl();
    e = function (i) {
      var s = 'Warning: ' + i;
      typeof console < 'u' && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function a(i, s, l, c, u) {
    if (process.env.NODE_ENV !== 'production') {
      for (var d in i)
        if (r(i, d)) {
          var p;
          try {
            if (typeof i[d] != 'function') {
              var b = Error(
                (c || 'React class') +
                  ': ' +
                  l +
                  ' type `' +
                  d +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof i[d] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((b.name = 'Invariant Violation'), b);
            }
            p = i[d](s, d, c, l, null, t);
          } catch (v) {
            p = v;
          }
          if (
            (p &&
              !(p instanceof Error) &&
              e(
                (c || 'React class') +
                  ': type specification of ' +
                  l +
                  ' `' +
                  d +
                  '` is invalid; the type checker function must return `null` or an `Error` but returned a ' +
                  typeof p +
                  '. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
              ),
            p instanceof Error && !(p.message in o))
          ) {
            o[p.message] = !0;
            var y = u ? u() : '';
            e('Failed ' + l + ' type: ' + p.message + (y ?? ''));
          }
        }
    }
  }
  return (
    (a.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (o = {});
    }),
    (qr = a),
    qr
  );
}
var Yr, Ri;
function ed() {
  if (Ri) return Yr;
  Ri = 1;
  var e = yl(),
    t = Zu(),
    o = Na(),
    r = xl(),
    a = Qu(),
    i = function () {};
  process.env.NODE_ENV !== 'production' &&
    (i = function (l) {
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
    (Yr = function (l, c) {
      var u = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function p(R) {
        var j = R && ((u && R[u]) || R[d]);
        if (typeof j == 'function') return j;
      }
      var b = '<<anonymous>>',
        y = {
          array: S('array'),
          bigint: S('bigint'),
          bool: S('boolean'),
          func: S('function'),
          number: S('number'),
          object: S('object'),
          string: S('string'),
          symbol: S('symbol'),
          any: T(),
          arrayOf: C,
          element: E(),
          elementType: f(),
          instanceOf: w,
          node: D(),
          objectOf: V,
          oneOf: k,
          oneOfType: L,
          shape: Y,
          exact: B,
        };
      function v(R, j) {
        return R === j ? R !== 0 || 1 / R === 1 / j : R !== R && j !== j;
      }
      function h(R, j) {
        (this.message = R), (this.data = j && typeof j == 'object' ? j : {}), (this.stack = '');
      }
      h.prototype = Error.prototype;
      function m(R) {
        if (process.env.NODE_ENV !== 'production')
          var j = {},
            X = 0;
        function H(ne, oe, J, ae, le, he, re) {
          if (((ae = ae || b), (he = he || J), re !== o)) {
            if (c) {
              var P = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((P.name = 'Invariant Violation'), P);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Oe = ae + ':' + J;
              !j[Oe] && // Avoid spamming the console because they are often not actionable except for lib authors
                X < 3 &&
                (i(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    he +
                    '` prop on `' +
                    ae +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (j[Oe] = !0),
                X++);
            }
          }
          return oe[J] == null
            ? ne
              ? oe[J] === null
                ? new h(
                    'The ' +
                      le +
                      ' `' +
                      he +
                      '` is marked as required ' +
                      ('in `' + ae + '`, but its value is `null`.'),
                  )
                : new h(
                    'The ' +
                      le +
                      ' `' +
                      he +
                      '` is marked as required in ' +
                      ('`' + ae + '`, but its value is `undefined`.'),
                  )
              : null
            : R(oe, J, ae, le, he);
        }
        var U = H.bind(null, !1);
        return (U.isRequired = H.bind(null, !0)), U;
      }
      function S(R) {
        function j(X, H, U, ne, oe, J) {
          var ae = X[H],
            le = z(ae);
          if (le !== R) {
            var he = ie(ae);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type ' +
                ('`' + he + '` supplied to `' + U + '`, expected ') +
                ('`' + R + '`.'),
              { expectedType: R },
            );
          }
          return null;
        }
        return m(j);
      }
      function T() {
        return m(s);
      }
      function C(R) {
        function j(X, H, U, ne, oe) {
          if (typeof R != 'function')
            return new h(
              'Property `' +
                oe +
                '` of component `' +
                U +
                '` has invalid PropType notation inside arrayOf.',
            );
          var J = X[H];
          if (!Array.isArray(J)) {
            var ae = z(J);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type ' +
                ('`' + ae + '` supplied to `' + U + '`, expected an array.'),
            );
          }
          for (var le = 0; le < J.length; le++) {
            var he = R(J, le, U, ne, oe + '[' + le + ']', o);
            if (he instanceof Error) return he;
          }
          return null;
        }
        return m(j);
      }
      function E() {
        function R(j, X, H, U, ne) {
          var oe = j[X];
          if (!l(oe)) {
            var J = z(oe);
            return new h(
              'Invalid ' +
                U +
                ' `' +
                ne +
                '` of type ' +
                ('`' + J + '` supplied to `' + H + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return m(R);
      }
      function f() {
        function R(j, X, H, U, ne) {
          var oe = j[X];
          if (!e.isValidElementType(oe)) {
            var J = z(oe);
            return new h(
              'Invalid ' +
                U +
                ' `' +
                ne +
                '` of type ' +
                ('`' + J + '` supplied to `' + H + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return m(R);
      }
      function w(R) {
        function j(X, H, U, ne, oe) {
          if (!(X[H] instanceof R)) {
            var J = R.name || b,
              ae = G(X[H]);
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type ' +
                ('`' + ae + '` supplied to `' + U + '`, expected ') +
                ('instance of `' + J + '`.'),
            );
          }
          return null;
        }
        return m(j);
      }
      function k(R) {
        if (!Array.isArray(R))
          return (
            process.env.NODE_ENV !== 'production' &&
              (arguments.length > 1
                ? i(
                    'Invalid arguments supplied to oneOf, expected an array, got ' +
                      arguments.length +
                      ' arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).',
                  )
                : i('Invalid argument supplied to oneOf, expected an array.')),
            s
          );
        function j(X, H, U, ne, oe) {
          for (var J = X[H], ae = 0; ae < R.length; ae++) if (v(J, R[ae])) return null;
          var le = JSON.stringify(R, function (re, P) {
            var Oe = ie(P);
            return Oe === 'symbol' ? String(P) : P;
          });
          return new h(
            'Invalid ' +
              ne +
              ' `' +
              oe +
              '` of value `' +
              String(J) +
              '` ' +
              ('supplied to `' + U + '`, expected one of ' + le + '.'),
          );
        }
        return m(j);
      }
      function V(R) {
        function j(X, H, U, ne, oe) {
          if (typeof R != 'function')
            return new h(
              'Property `' +
                oe +
                '` of component `' +
                U +
                '` has invalid PropType notation inside objectOf.',
            );
          var J = X[H],
            ae = z(J);
          if (ae !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type ' +
                ('`' + ae + '` supplied to `' + U + '`, expected an object.'),
            );
          for (var le in J)
            if (r(J, le)) {
              var he = R(J, le, U, ne, oe + '.' + le, o);
              if (he instanceof Error) return he;
            }
          return null;
        }
        return m(j);
      }
      function L(R) {
        if (!Array.isArray(R))
          return (
            process.env.NODE_ENV !== 'production' &&
              i('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var j = 0; j < R.length; j++) {
          var X = R[j];
          if (typeof X != 'function')
            return (
              i(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  se(X) +
                  ' at index ' +
                  j +
                  '.',
              ),
              s
            );
        }
        function H(U, ne, oe, J, ae) {
          for (var le = [], he = 0; he < R.length; he++) {
            var re = R[he],
              P = re(U, ne, oe, J, ae, o);
            if (P == null) return null;
            P.data && r(P.data, 'expectedType') && le.push(P.data.expectedType);
          }
          var Oe = le.length > 0 ? ', expected one of type [' + le.join(', ') + ']' : '';
          return new h('Invalid ' + J + ' `' + ae + '` supplied to ' + ('`' + oe + '`' + Oe + '.'));
        }
        return m(H);
      }
      function D() {
        function R(j, X, H, U, ne) {
          return M(j[X])
            ? null
            : new h(
                'Invalid ' +
                  U +
                  ' `' +
                  ne +
                  '` supplied to ' +
                  ('`' + H + '`, expected a ReactNode.'),
              );
        }
        return m(R);
      }
      function _(R, j, X, H, U) {
        return new h(
          (R || 'React class') +
            ': ' +
            j +
            ' type `' +
            X +
            '.' +
            H +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            U +
            '`.',
        );
      }
      function Y(R) {
        function j(X, H, U, ne, oe) {
          var J = X[H],
            ae = z(J);
          if (ae !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type `' +
                ae +
                '` ' +
                ('supplied to `' + U + '`, expected `object`.'),
            );
          for (var le in R) {
            var he = R[le];
            if (typeof he != 'function') return _(U, ne, oe, le, ie(he));
            var re = he(J, le, U, ne, oe + '.' + le, o);
            if (re) return re;
          }
          return null;
        }
        return m(j);
      }
      function B(R) {
        function j(X, H, U, ne, oe) {
          var J = X[H],
            ae = z(J);
          if (ae !== 'object')
            return new h(
              'Invalid ' +
                ne +
                ' `' +
                oe +
                '` of type `' +
                ae +
                '` ' +
                ('supplied to `' + U + '`, expected `object`.'),
            );
          var le = t({}, X[H], R);
          for (var he in le) {
            var re = R[he];
            if (r(R, he) && typeof re != 'function') return _(U, ne, oe, he, ie(re));
            if (!re)
              return new h(
                'Invalid ' +
                  ne +
                  ' `' +
                  oe +
                  '` key `' +
                  he +
                  '` supplied to `' +
                  U +
                  '`.\nBad object: ' +
                  JSON.stringify(X[H], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(R), null, '  '),
              );
            var P = re(J, he, U, ne, oe + '.' + he, o);
            if (P) return P;
          }
          return null;
        }
        return m(j);
      }
      function M(R) {
        switch (typeof R) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !R;
          case 'object':
            if (Array.isArray(R)) return R.every(M);
            if (R === null || l(R)) return !0;
            var j = p(R);
            if (j) {
              var X = j.call(R),
                H;
              if (j !== R.entries) {
                for (; !(H = X.next()).done; ) if (!M(H.value)) return !1;
              } else
                for (; !(H = X.next()).done; ) {
                  var U = H.value;
                  if (U && !M(U[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function F(R, j) {
        return R === 'symbol'
          ? !0
          : j
          ? j['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && j instanceof Symbol)
          : !1;
      }
      function z(R) {
        var j = typeof R;
        return Array.isArray(R) ? 'array' : R instanceof RegExp ? 'object' : F(j, R) ? 'symbol' : j;
      }
      function ie(R) {
        if (typeof R > 'u' || R === null) return '' + R;
        var j = z(R);
        if (j === 'object') {
          if (R instanceof Date) return 'date';
          if (R instanceof RegExp) return 'regexp';
        }
        return j;
      }
      function se(R) {
        var j = ie(R);
        switch (j) {
          case 'array':
          case 'object':
            return 'an ' + j;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + j;
          default:
            return j;
        }
      }
      function G(R) {
        return !R.constructor || !R.constructor.name ? b : R.constructor.name;
      }
      return (
        (y.checkPropTypes = a), (y.resetWarningCache = a.resetWarningCache), (y.PropTypes = y), y
      );
    }),
    Yr
  );
}
var Kr, Ni;
function td() {
  if (Ni) return Kr;
  Ni = 1;
  var e = Na();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (Kr = function () {
      function r(s, l, c, u, d, p) {
        if (p !== e) {
          var b = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((b.name = 'Invariant Violation'), b);
        }
      }
      r.isRequired = r;
      function a() {
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
        arrayOf: a,
        element: r,
        elementType: r,
        instanceOf: a,
        node: r,
        objectOf: a,
        oneOf: a,
        oneOfType: a,
        shape: a,
        exact: a,
        checkPropTypes: o,
        resetWarningCache: t,
      };
      return (i.PropTypes = i), i;
    }),
    Kr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var nd = yl(),
    od = !0;
  sa.exports = ed()(nd.isElement, od);
} else sa.exports = td()();
var rd = sa.exports;
const n = /* @__PURE__ */ Lu(rd);
function ad(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function El(e, t, o, r, a) {
  const i = e[t],
    s = a || t;
  if (
    i == null || // When server-side rendering React doesn't warn either.
    // This is not an accurate check for SSR.
    // This is only in place for Emotion compat.
    // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
    typeof window > 'u'
  )
    return null;
  let l;
  const c = i.type;
  return (
    typeof c == 'function' &&
      !ad(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const Cl = Kt(n.element, El);
Cl.isRequired = Kt(n.element.isRequired, El);
const ro = Cl;
function id(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function sd(e, t, o, r, a) {
  const i = e[t],
    s = a || t;
  if (
    i == null || // When server-side rendering React doesn't warn either.
    // This is not an accurate check for SSR.
    // This is only in place for emotion compat.
    // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
    typeof window > 'u'
  )
    return null;
  let l;
  return (
    typeof i == 'function' &&
      !id(i) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const $a = Kt(n.elementType, sd),
  ld = 'exact-prop: ​';
function Pa(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : g({}, e, {
        [ld]: (t) => {
          const o = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
          return o.length > 0
            ? new Error(
                `The following props are not supported: ${o
                  .map((r) => `\`${r}\``)
                  .join(', ')}. Please remove them.`,
              )
            : null;
        },
      });
}
function Cn(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var la = { exports: {} },
  We = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $i;
function cd() {
  if ($i) return We;
  $i = 1;
  var e = Symbol.for('react.element'),
    t = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    a = Symbol.for('react.profiler'),
    i = Symbol.for('react.provider'),
    s = Symbol.for('react.context'),
    l = Symbol.for('react.server_context'),
    c = Symbol.for('react.forward_ref'),
    u = Symbol.for('react.suspense'),
    d = Symbol.for('react.suspense_list'),
    p = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    y = Symbol.for('react.offscreen'),
    v;
  v = Symbol.for('react.module.reference');
  function h(m) {
    if (typeof m == 'object' && m !== null) {
      var S = m.$$typeof;
      switch (S) {
        case e:
          switch (((m = m.type), m)) {
            case o:
            case a:
            case r:
            case u:
            case d:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case l:
                case s:
                case c:
                case b:
                case p:
                case i:
                  return m;
                default:
                  return S;
              }
          }
        case t:
          return S;
      }
    }
  }
  return (
    (We.ContextConsumer = s),
    (We.ContextProvider = i),
    (We.Element = e),
    (We.ForwardRef = c),
    (We.Fragment = o),
    (We.Lazy = b),
    (We.Memo = p),
    (We.Portal = t),
    (We.Profiler = a),
    (We.StrictMode = r),
    (We.Suspense = u),
    (We.SuspenseList = d),
    (We.isAsyncMode = function () {
      return !1;
    }),
    (We.isConcurrentMode = function () {
      return !1;
    }),
    (We.isContextConsumer = function (m) {
      return h(m) === s;
    }),
    (We.isContextProvider = function (m) {
      return h(m) === i;
    }),
    (We.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (We.isForwardRef = function (m) {
      return h(m) === c;
    }),
    (We.isFragment = function (m) {
      return h(m) === o;
    }),
    (We.isLazy = function (m) {
      return h(m) === b;
    }),
    (We.isMemo = function (m) {
      return h(m) === p;
    }),
    (We.isPortal = function (m) {
      return h(m) === t;
    }),
    (We.isProfiler = function (m) {
      return h(m) === a;
    }),
    (We.isStrictMode = function (m) {
      return h(m) === r;
    }),
    (We.isSuspense = function (m) {
      return h(m) === u;
    }),
    (We.isSuspenseList = function (m) {
      return h(m) === d;
    }),
    (We.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === o ||
        m === a ||
        m === r ||
        m === u ||
        m === d ||
        m === y ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === b ||
            m.$$typeof === p ||
            m.$$typeof === i ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === v ||
            m.getModuleId !== void 0))
      );
    }),
    (We.typeOf = h),
    We
  );
}
var He = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pi;
function ud() {
  return (
    Pi ||
      ((Pi = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Symbol.for('react.element'),
            t = Symbol.for('react.portal'),
            o = Symbol.for('react.fragment'),
            r = Symbol.for('react.strict_mode'),
            a = Symbol.for('react.profiler'),
            i = Symbol.for('react.provider'),
            s = Symbol.for('react.context'),
            l = Symbol.for('react.server_context'),
            c = Symbol.for('react.forward_ref'),
            u = Symbol.for('react.suspense'),
            d = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            b = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            v = !1,
            h = !1,
            m = !1,
            S = !1,
            T = !1,
            C;
          C = Symbol.for('react.module.reference');
          function E(I) {
            return !!(
              typeof I == 'string' ||
              typeof I == 'function' ||
              I === o ||
              I === a ||
              T ||
              I === r ||
              I === u ||
              I === d ||
              S ||
              I === y ||
              v ||
              h ||
              m ||
              (typeof I == 'object' &&
                I !== null &&
                (I.$$typeof === b ||
                  I.$$typeof === p ||
                  I.$$typeof === i ||
                  I.$$typeof === s ||
                  I.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  I.$$typeof === C ||
                  I.getModuleId !== void 0))
            );
          }
          function f(I) {
            if (typeof I == 'object' && I !== null) {
              var W = I.$$typeof;
              switch (W) {
                case e:
                  var Ne = I.type;
                  switch (Ne) {
                    case o:
                    case a:
                    case r:
                    case u:
                    case d:
                      return Ne;
                    default:
                      var ge = Ne && Ne.$$typeof;
                      switch (ge) {
                        case l:
                        case s:
                        case c:
                        case b:
                        case p:
                        case i:
                          return ge;
                        default:
                          return W;
                      }
                  }
                case t:
                  return W;
              }
            }
          }
          var w = s,
            k = i,
            V = e,
            L = c,
            D = o,
            _ = b,
            Y = p,
            B = t,
            M = a,
            F = r,
            z = u,
            ie = d,
            se = !1,
            G = !1;
          function R(I) {
            return (
              se ||
                ((se = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function j(I) {
            return (
              G ||
                ((G = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function X(I) {
            return f(I) === s;
          }
          function H(I) {
            return f(I) === i;
          }
          function U(I) {
            return typeof I == 'object' && I !== null && I.$$typeof === e;
          }
          function ne(I) {
            return f(I) === c;
          }
          function oe(I) {
            return f(I) === o;
          }
          function J(I) {
            return f(I) === b;
          }
          function ae(I) {
            return f(I) === p;
          }
          function le(I) {
            return f(I) === t;
          }
          function he(I) {
            return f(I) === a;
          }
          function re(I) {
            return f(I) === r;
          }
          function P(I) {
            return f(I) === u;
          }
          function Oe(I) {
            return f(I) === d;
          }
          (He.ContextConsumer = w),
            (He.ContextProvider = k),
            (He.Element = V),
            (He.ForwardRef = L),
            (He.Fragment = D),
            (He.Lazy = _),
            (He.Memo = Y),
            (He.Portal = B),
            (He.Profiler = M),
            (He.StrictMode = F),
            (He.Suspense = z),
            (He.SuspenseList = ie),
            (He.isAsyncMode = R),
            (He.isConcurrentMode = j),
            (He.isContextConsumer = X),
            (He.isContextProvider = H),
            (He.isElement = U),
            (He.isForwardRef = ne),
            (He.isFragment = oe),
            (He.isLazy = J),
            (He.isMemo = ae),
            (He.isPortal = le),
            (He.isProfiler = he),
            (He.isStrictMode = re),
            (He.isSuspense = P),
            (He.isSuspenseList = Oe),
            (He.isValidElementType = E),
            (He.typeOf = f);
        })()),
    He
  );
}
process.env.NODE_ENV === 'production' ? (la.exports = cd()) : (la.exports = ud());
var Ii = la.exports;
const dd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function pd(e) {
  const t = `${e}`.match(dd);
  return (t && t[1]) || '';
}
function Ol(e, t = '') {
  return e.displayName || e.name || pd(e) || t;
}
function _i(e, t, o) {
  const r = Ol(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function fd(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Ol(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Ii.ForwardRef:
          return _i(e, e.render, 'ForwardRef');
        case Ii.Memo:
          return _i(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function on(e, t, o, r, a) {
  if (process.env.NODE_ENV === 'production') return null;
  const i = e[t],
    s = a || t;
  return i == null
    ? null
    : i && i.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const md = n.oneOfType([n.func, n.object]),
  Nt = md;
function Q(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : Cn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Mi(...e) {
  return e.reduce(
    (t, o) =>
      o == null
        ? t
        : function (...a) {
            t.apply(this, a), o.apply(this, a);
          },
    () => {},
  );
}
function Tl(e, t = 166) {
  let o;
  function r(...a) {
    const i = () => {
      e.apply(this, a);
    };
    clearTimeout(o), (o = setTimeout(i, t));
  }
  return (
    (r.clear = () => {
      clearTimeout(o);
    }),
    r
  );
}
function Gr(e, t) {
  return /* @__PURE__ */ x.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function ct(e) {
  return (e && e.ownerDocument) || document;
}
function _n(e) {
  return ct(e).defaultView || window;
}
function rr(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const hd = typeof window < 'u' ? x.useLayoutEffect : x.useEffect,
  rn = hd;
let Ai = 0;
function bd(e) {
  const [t, o] = x.useState(e),
    r = e || t;
  return (
    x.useEffect(() => {
      t == null && ((Ai += 1), o(`mui-${Ai}`));
    }, [t]),
    r
  );
}
const Di = x['useId'];
function Sl(e) {
  if (Di !== void 0) {
    const t = Di();
    return e ?? t;
  }
  return bd(e);
}
function gd(e, t, o, r, a) {
  if (process.env.NODE_ENV === 'production') return null;
  const i = a || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${i}\` is not supported. Please remove it.`)
    : null;
}
function Pn({ controlled: e, default: t, name: o, state: r = 'value' }) {
  const { current: a } = x.useRef(e !== void 0),
    [i, s] = x.useState(t),
    l = a ? e : i;
  if (process.env.NODE_ENV !== 'production') {
    x.useEffect(() => {
      a !== (e !== void 0) &&
        console.error(
          [
            `MUI: A component is changing the ${a ? '' : 'un'}controlled ${r} state of ${o} to be ${
              a ? 'un' : ''
            }controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${o} element for the lifetime of the component.`,
            "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
            'More info: https://fb.me/react-controlled-components',
          ].join(`
`),
        );
    }, [r, o, e]);
    const { current: u } = x.useRef(t);
    x.useEffect(() => {
      !a &&
        u !== t &&
        console.error(
          [
            `MUI: A component is changing the default ${r} state of an uncontrolled ${o} after being initialized. To suppress this warning opt to use a controlled ${o}.`,
          ].join(`
`),
        );
    }, [JSON.stringify(t)]);
  }
  const c = x.useCallback((u) => {
    a || s(u);
  }, []);
  return [l, c];
}
function Ct(e) {
  const t = x.useRef(e);
  return (
    rn(() => {
      t.current = e;
    }),
    x.useCallback(
      (...o) =>
        // @ts-expect-error hide `this`
        // tslint:disable-next-line:ban-comma-operator
        (0, t.current)(...o),
      [],
    )
  );
}
function dt(...e) {
  return x.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              rr(o, t);
            });
          },
    e,
  );
}
let br = !0,
  ca = !1,
  Li;
const vd = {
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
function yd(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && vd[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function xd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (br = !0);
}
function Xr() {
  br = !1;
}
function Ed() {
  this.visibilityState === 'hidden' && ca && (br = !0);
}
function Cd(e) {
  e.addEventListener('keydown', xd, !0),
    e.addEventListener('mousedown', Xr, !0),
    e.addEventListener('pointerdown', Xr, !0),
    e.addEventListener('touchstart', Xr, !0),
    e.addEventListener('visibilitychange', Ed, !0);
}
function Od(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return br || yd(t);
}
function wl() {
  const e = x.useCallback((a) => {
      a != null && Cd(a.ownerDocument);
    }, []),
    t = x.useRef(!1);
  function o() {
    return t.current
      ? ((ca = !0),
        window.clearTimeout(Li),
        (Li = window.setTimeout(() => {
          ca = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(a) {
    return Od(a) ? ((t.current = !0), !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: o,
    ref: e,
  };
}
function kl(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Td = (e) => {
    const t = x.useRef({});
    return (
      x.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  Sd = Td,
  wd = {
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
  kd = wd;
function Rd(e) {
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
function Nd(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const $d = Number.isInteger || Nd;
function Rl(e, t, o, r) {
  const a = e[t];
  if (a == null || !$d(a)) {
    const i = Rd(a);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function Nl(e, t, ...o) {
  return e[t] === void 0 ? null : Rl(e, t, ...o);
}
function ua() {
  return null;
}
Nl.isRequired = Rl;
ua.isRequired = ua;
const Ia = process.env.NODE_ENV === 'production' ? ua : Nl;
function _a(e, t) {
  const o = g({}, t);
  return (
    Object.keys(e).forEach((r) => {
      if (r.toString().match(/^(components|slots)$/)) o[r] = g({}, e[r], o[r]);
      else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
        const a = e[r] || {},
          i = t[r];
        (o[r] = {}),
          !i || !Object.keys(i)
            ? (o[r] = a)
            : !a || !Object.keys(a)
            ? (o[r] = i)
            : ((o[r] = g({}, i)),
              Object.keys(a).forEach((s) => {
                o[r][s] = _a(a[s], i[s]);
              }));
      } else o[r] === void 0 && (o[r] = e[r]);
    }),
    o
  );
}
function Fe(e, t, o = void 0) {
  const r = {};
  return (
    Object.keys(e).forEach(
      // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
      // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
      (a) => {
        r[a] = e[a]
          .reduce((i, s) => {
            if (s) {
              const l = t(s);
              l !== '' && i.push(l), o && o[s] && i.push(o[s]);
            }
            return i;
          }, [])
          .join(' ');
      },
    ),
    r
  );
}
const Fi = (e) => e,
  Pd = () => {
    let e = Fi;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Fi;
      },
    };
  },
  Id = Pd(),
  _d = Id,
  Md = {
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
function Ae(e, t, o = 'Mui') {
  const r = Md[t];
  return r ? `${o}-${r}` : `${_d.generate(e)}-${t}`;
}
function Pe(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((a) => {
      r[a] = Ae(e, a, o);
    }),
    r
  );
}
function Ce(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    a,
    i;
  for (i = 0; i < r.length; i++) (a = r[i]), !(t.indexOf(a) >= 0) && (o[a] = e[a]);
  return o;
}
function $l(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var Ad =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  Dd = /* @__PURE__ */ $l(
    function (e) {
      return (
        Ad.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
      );
    },
    /* Z+1 */
  );
function Ld(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function Fd(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var jd = /* @__PURE__ */ (function () {
    function e(o) {
      var r = this;
      (this._insertTag = function (a) {
        var i;
        r.tags.length === 0
          ? r.insertionPoint
            ? (i = r.insertionPoint.nextSibling)
            : r.prepend
            ? (i = r.container.firstChild)
            : (i = r.before)
          : (i = r.tags[r.tags.length - 1].nextSibling),
          r.container.insertBefore(a, i),
          r.tags.push(a);
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Fd(this));
        var a = this.tags[this.tags.length - 1];
        if (process.env.NODE_ENV !== 'production') {
          var i = r.charCodeAt(0) === 64 && r.charCodeAt(1) === 105;
          i &&
            this._alreadyInsertedOrderInsensitiveRule &&
            console.error(
              `You're attempting to insert the following rule:
` +
                r +
                '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.',
            ),
            (this._alreadyInsertedOrderInsensitiveRule =
              this._alreadyInsertedOrderInsensitiveRule || !i);
        }
        if (this.isSpeedy) {
          var s = Ld(a);
          try {
            s.insertRule(r, s.cssRules.length);
          } catch (l) {
            process.env.NODE_ENV !== 'production' &&
              !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(
                r,
              ) &&
              console.error('There was a problem inserting the following rule: "' + r + '"', l);
          }
        } else a.appendChild(document.createTextNode(r));
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
  Et = '-ms-',
  ar = '-moz-',
  Ve = '-webkit-',
  Ma = 'comm',
  Aa = 'rule',
  Da = 'decl',
  Vd = '@import',
  Pl = '@keyframes',
  zd = Math.abs,
  gr = String.fromCharCode,
  Bd = Object.assign;
function Ud(e, t) {
  return vt(e, 0) ^ 45
    ? (((((((t << 2) ^ vt(e, 0)) << 2) ^ vt(e, 1)) << 2) ^ vt(e, 2)) << 2) ^ vt(e, 3)
    : 0;
}
function Il(e) {
  return e.trim();
}
function Wd(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Xe(e, t, o) {
  return e.replace(t, o);
}
function da(e, t) {
  return e.indexOf(t);
}
function vt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Ro(e, t, o) {
  return e.slice(t, o);
}
function en(e) {
  return e.length;
}
function La(e) {
  return e.length;
}
function Uo(e, t) {
  return t.push(e), e;
}
function Hd(e, t) {
  return e.map(t).join('');
}
var vr = 1,
  Jn = 1,
  _l = 0,
  Rt = 0,
  pt = 0,
  ao = '';
function yr(e, t, o, r, a, i, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: a,
    children: i,
    line: vr,
    column: Jn,
    length: s,
    return: '',
  };
}
function fo(e, t) {
  return Bd(yr('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function qd() {
  return pt;
}
function Yd() {
  return (pt = Rt > 0 ? vt(ao, --Rt) : 0), Jn--, pt === 10 && ((Jn = 1), vr--), pt;
}
function _t() {
  return (pt = Rt < _l ? vt(ao, Rt++) : 0), Jn++, pt === 10 && ((Jn = 1), vr++), pt;
}
function nn() {
  return vt(ao, Rt);
}
function Qo() {
  return Rt;
}
function Mo(e, t) {
  return Ro(ao, e, t);
}
function No(e) {
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
function Ml(e) {
  return (vr = Jn = 1), (_l = en((ao = e))), (Rt = 0), [];
}
function Al(e) {
  return (ao = ''), e;
}
function er(e) {
  return Il(Mo(Rt - 1, pa(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Kd(e) {
  for (; (pt = nn()) && pt < 33; ) _t();
  return No(e) > 2 || No(pt) > 3 ? '' : ' ';
}
function Gd(e, t) {
  for (; --t && _t() && !(pt < 48 || pt > 102 || (pt > 57 && pt < 65) || (pt > 70 && pt < 97)); );
  return Mo(e, Qo() + (t < 6 && nn() == 32 && _t() == 32));
}
function pa(e) {
  for (; _t(); )
    switch (pt) {
      case e:
        return Rt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && pa(pt);
        break;
      case 40:
        e === 41 && pa(e);
        break;
      case 92:
        _t();
        break;
    }
  return Rt;
}
function Xd(e, t) {
  for (; _t() && e + pt !== 47 + 10; ) if (e + pt === 42 + 42 && nn() === 47) break;
  return '/*' + Mo(t, Rt - 1) + '*' + gr(e === 47 ? e : _t());
}
function Jd(e) {
  for (; !No(nn()); ) _t();
  return Mo(e, Rt);
}
function Zd(e) {
  return Al(tr('', null, null, null, [''], (e = Ml(e)), 0, [0], e));
}
function tr(e, t, o, r, a, i, s, l, c) {
  for (
    var u = 0,
      d = 0,
      p = s,
      b = 0,
      y = 0,
      v = 0,
      h = 1,
      m = 1,
      S = 1,
      T = 0,
      C = '',
      E = a,
      f = i,
      w = r,
      k = C;
    m;

  )
    switch (((v = T), (T = _t()))) {
      case 40:
        if (v != 108 && vt(k, p - 1) == 58) {
          da((k += Xe(er(T), '&', '&\f')), '&\f') != -1 && (S = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        k += er(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        k += Kd(v);
        break;
      case 92:
        k += Gd(Qo() - 1, 7);
        continue;
      case 47:
        switch (nn()) {
          case 42:
          case 47:
            Uo(Qd(Xd(_t(), Qo()), t, o), c);
            break;
          default:
            k += '/';
        }
        break;
      case 123 * h:
        l[u++] = en(k) * S;
      case 125 * h:
      case 59:
      case 0:
        switch (T) {
          case 0:
          case 125:
            m = 0;
          case 59 + d:
            y > 0 &&
              en(k) - p &&
              Uo(y > 32 ? Vi(k + ';', r, o, p - 1) : Vi(Xe(k, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            k += ';';
          default:
            if ((Uo((w = ji(k, t, o, u, d, a, l, C, (E = []), (f = []), p)), i), T === 123))
              if (d === 0) tr(k, t, w, w, E, i, p, l, f);
              else
                switch (b === 99 && vt(k, 3) === 110 ? 100 : b) {
                  case 100:
                  case 109:
                  case 115:
                    tr(
                      e,
                      w,
                      w,
                      r && Uo(ji(e, w, w, 0, 0, a, l, C, a, (E = []), p), f),
                      a,
                      f,
                      p,
                      l,
                      r ? E : f,
                    );
                    break;
                  default:
                    tr(k, w, w, w, [''], f, 0, l, f);
                }
        }
        (u = d = y = 0), (h = S = 1), (C = k = ''), (p = s);
        break;
      case 58:
        (p = 1 + en(k)), (y = v);
      default:
        if (h < 1) {
          if (T == 123) --h;
          else if (T == 125 && h++ == 0 && Yd() == 125) continue;
        }
        switch (((k += gr(T)), T * h)) {
          case 38:
            S = d > 0 ? 1 : ((k += '\f'), -1);
            break;
          case 44:
            (l[u++] = (en(k) - 1) * S), (S = 1);
            break;
          case 64:
            nn() === 45 && (k += er(_t())), (b = nn()), (d = p = en((C = k += Jd(Qo())))), T++;
            break;
          case 45:
            v === 45 && en(k) == 2 && (h = 0);
        }
    }
  return i;
}
function ji(e, t, o, r, a, i, s, l, c, u, d) {
  for (var p = a - 1, b = a === 0 ? i : [''], y = La(b), v = 0, h = 0, m = 0; v < r; ++v)
    for (var S = 0, T = Ro(e, p + 1, (p = zd((h = s[v])))), C = e; S < y; ++S)
      (C = Il(h > 0 ? b[S] + ' ' + T : Xe(T, /&\f/g, b[S]))) && (c[m++] = C);
  return yr(e, t, o, a === 0 ? Aa : l, c, u, d);
}
function Qd(e, t, o) {
  return yr(e, t, o, Ma, gr(qd()), Ro(e, 2, -2), 0);
}
function Vi(e, t, o, r) {
  return yr(e, t, o, Da, Ro(e, 0, r), Ro(e, r + 1, -1), r);
}
function Kn(e, t) {
  for (var o = '', r = La(e), a = 0; a < r; a++) o += t(e[a], a, e, t) || '';
  return o;
}
function ep(e, t, o, r) {
  switch (e.type) {
    case Vd:
    case Da:
      return (e.return = e.return || e.value);
    case Ma:
      return '';
    case Pl:
      return (e.return = e.value + '{' + Kn(e.children, r) + '}');
    case Aa:
      e.value = e.props.join(',');
  }
  return en((o = Kn(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function tp(e) {
  var t = La(e);
  return function (o, r, a, i) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, a, i) || '';
    return s;
  };
}
function np(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var op = function (t, o, r) {
    for (var a = 0, i = 0; (a = i), (i = nn()), a === 38 && i === 12 && (o[r] = 1), !No(i); ) _t();
    return Mo(t, Rt);
  },
  rp = function (t, o) {
    var r = -1,
      a = 44;
    do
      switch (No(a)) {
        case 0:
          a === 38 && nn() === 12 && (o[r] = 1), (t[r] += op(Rt - 1, o, r));
          break;
        case 2:
          t[r] += er(a);
          break;
        case 4:
          if (a === 44) {
            (t[++r] = nn() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += gr(a);
      }
    while ((a = _t()));
    return t;
  },
  ap = function (t, o) {
    return Al(rp(Ml(t), o));
  },
  zi = /* @__PURE__ */ new WeakMap(),
  ip = function (t) {
    if (
      !(
        t.type !== 'rule' ||
        !t.parent || // positive .length indicates that this rule contains pseudo
        // negative .length indicates that this rule has been already prefixed
        t.length < 1
      )
    ) {
      for (
        var o = t.value, r = t.parent, a = t.column === r.column && t.line === r.line;
        r.type !== 'rule';

      )
        if (((r = r.parent), !r)) return;
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !zi.get(r)) && !a) {
        zi.set(t, !0);
        for (var i = [], s = ap(o, i), l = r.props, c = 0, u = 0; c < s.length; c++)
          for (var d = 0; d < l.length; d++, u++)
            t.props[u] = i[c] ? s[c].replace(/&\f/g, l[d]) : l[d] + ' ' + s[c];
      }
    }
  },
  sp = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      // charcode for l
      o.charCodeAt(0) === 108 && // charcode for b
        o.charCodeAt(2) === 98 &&
        ((t.return = ''), (t.value = ''));
    }
  },
  lp =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  cp = function (t) {
    return t.type === 'comm' && t.children.indexOf(lp) > -1;
  },
  up = function (t) {
    return function (o, r, a) {
      if (!(o.type !== 'rule' || t.compat)) {
        var i = o.value.match(/(:first|:nth|:nth-last)-child/g);
        if (i) {
          for (
            var s = o.parent === a[0],
              l = s
                ? a[0].children
                : // global rule at the root level
                  a,
              c = l.length - 1;
            c >= 0;
            c--
          ) {
            var u = l[c];
            if (u.line < o.line) break;
            if (u.column < o.column) {
              if (cp(u)) return;
              break;
            }
          }
          i.forEach(function (d) {
            console.error(
              'The pseudo class "' +
                d +
                '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
                d.split('-child')[0] +
                '-of-type".',
            );
          });
        }
      }
    };
  },
  Dl = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  dp = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!Dl(o[r])) return !0;
    return !1;
  },
  Bi = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  pp = function (t, o, r) {
    Dl(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          Bi(t))
        : dp(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          Bi(t)));
  };
function Ll(e, t) {
  switch (Ud(e, t)) {
    case 5103:
      return Ve + 'print-' + e + e;
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
      return Ve + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Ve + e + ar + e + Et + e + e;
    case 6828:
    case 4268:
      return Ve + e + Et + e + e;
    case 6165:
      return Ve + e + Et + 'flex-' + e + e;
    case 5187:
      return Ve + e + Xe(e, /(\w+).+(:[^]+)/, Ve + 'box-$1$2' + Et + 'flex-$1$2') + e;
    case 5443:
      return Ve + e + Et + 'flex-item-' + Xe(e, /flex-|-self/, '') + e;
    case 4675:
      return Ve + e + Et + 'flex-line-pack' + Xe(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return Ve + e + Et + Xe(e, 'shrink', 'negative') + e;
    case 5292:
      return Ve + e + Et + Xe(e, 'basis', 'preferred-size') + e;
    case 6060:
      return Ve + 'box-' + Xe(e, '-grow', '') + Ve + e + Et + Xe(e, 'grow', 'positive') + e;
    case 4554:
      return Ve + Xe(e, /([^-])(transform)/g, '$1' + Ve + '$2') + e;
    case 6187:
      return Xe(Xe(Xe(e, /(zoom-|grab)/, Ve + '$1'), /(image-set)/, Ve + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return Xe(e, /(image-set\([^]*)/, Ve + '$1$`$1');
    case 4968:
      return (
        Xe(
          Xe(e, /(.+:)(flex-)?(.*)/, Ve + 'box-pack:$3' + Et + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify',
        ) +
        Ve +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Xe(e, /(.+)-inline(.+)/, Ve + '$1$2') + e;
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
      if (en(e) - 1 - t > 6)
        switch (vt(e, t + 1)) {
          case 109:
            if (vt(e, t + 4) !== 45) break;
          case 102:
            return (
              Xe(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + Ve + '$2-$3$1' + ar + (vt(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~da(e, 'stretch') ? Ll(Xe(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (vt(e, t + 1) !== 115) break;
    case 6444:
      switch (vt(e, en(e) - 3 - (~da(e, '!important') && 10))) {
        case 107:
          return Xe(e, ':', ':' + Ve) + e;
        case 101:
          return (
            Xe(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                Ve +
                (vt(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                Ve +
                '$2$3$1' +
                Et +
                '$2box$3',
            ) + e
          );
      }
      break;
    case 5936:
      switch (vt(e, t + 11)) {
        case 114:
          return Ve + e + Et + Xe(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return Ve + e + Et + Xe(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return Ve + e + Et + Xe(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return Ve + e + Et + e + e;
  }
  return e;
}
var fp = function (t, o, r, a) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Da:
          t.return = Ll(t.value, t.length);
          break;
        case Pl:
          return Kn(
            [
              fo(t, {
                value: Xe(t.value, '@', '@' + Ve),
              }),
            ],
            a,
          );
        case Aa:
          if (t.length)
            return Hd(t.props, function (i) {
              switch (Wd(i, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Kn(
                    [
                      fo(t, {
                        props: [Xe(i, /:(read-\w+)/, ':' + ar + '$1')],
                      }),
                    ],
                    a,
                  );
                case '::placeholder':
                  return Kn(
                    [
                      fo(t, {
                        props: [Xe(i, /:(plac\w+)/, ':' + Ve + 'input-$1')],
                      }),
                      fo(t, {
                        props: [Xe(i, /:(plac\w+)/, ':' + ar + '$1')],
                      }),
                      fo(t, {
                        props: [Xe(i, /:(plac\w+)/, Et + 'input-$1')],
                      }),
                    ],
                    a,
                  );
              }
              return '';
            });
      }
  },
  mp = [fp],
  hp = function (t) {
    var o = t.key;
    if (process.env.NODE_ENV !== 'production' && !o)
      throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
    if (o === 'css') {
      var r = document.querySelectorAll('style[data-emotion]:not([data-s])');
      Array.prototype.forEach.call(r, function (h) {
        var m = h.getAttribute('data-emotion');
        m.indexOf(' ') !== -1 && (document.head.appendChild(h), h.setAttribute('data-s', ''));
      });
    }
    var a = t.stylisPlugins || mp;
    if (process.env.NODE_ENV !== 'production' && /[^a-z-]/.test(o))
      throw new Error(
        'Emotion key must only contain lower case alphabetical characters and - but "' +
          o +
          '" was passed',
      );
    var i = {},
      s,
      l = [];
    (s = t.container || document.head),
      Array.prototype.forEach.call(
        // this means we will ignore elements which don't have a space in them which
        // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
        document.querySelectorAll('style[data-emotion^="' + o + ' "]'),
        function (h) {
          for (var m = h.getAttribute('data-emotion').split(' '), S = 1; S < m.length; S++)
            i[m[S]] = !0;
          l.push(h);
        },
      );
    var c,
      u = [ip, sp];
    process.env.NODE_ENV !== 'production' &&
      u.push(
        up({
          get compat() {
            return v.compat;
          },
        }),
        pp,
      );
    {
      var d,
        p = [
          ep,
          process.env.NODE_ENV !== 'production'
            ? function (h) {
                h.root ||
                  (h.return
                    ? d.insert(h.return)
                    : h.value && h.type !== Ma && d.insert(h.value + '{}'));
              }
            : np(function (h) {
                d.insert(h);
              }),
        ],
        b = tp(u.concat(a, p)),
        y = function (m) {
          return Kn(Zd(m), b);
        };
      c = function (m, S, T, C) {
        (d = T),
          process.env.NODE_ENV !== 'production' &&
            S.map !== void 0 &&
            (d = {
              insert: function (f) {
                T.insert(f + S.map);
              },
            }),
          y(m ? m + '{' + S.styles + '}' : S.styles),
          C && (v.inserted[S.name] = !0);
      };
    }
    var v = {
      key: o,
      sheet: new jd({
        key: o,
        container: s,
        nonce: t.nonce,
        speedy: t.speedy,
        prepend: t.prepend,
        insertionPoint: t.insertionPoint,
      }),
      nonce: t.nonce,
      inserted: i,
      registered: {},
      insert: c,
    };
    return v.sheet.hydrate(l), v;
  },
  fa = { exports: {} },
  qe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ui;
function bp() {
  if (Ui) return qe;
  Ui = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    o = e ? Symbol.for('react.portal') : 60106,
    r = e ? Symbol.for('react.fragment') : 60107,
    a = e ? Symbol.for('react.strict_mode') : 60108,
    i = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    l = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    u = e ? Symbol.for('react.concurrent_mode') : 60111,
    d = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    b = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    v = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    m = e ? Symbol.for('react.fundamental') : 60117,
    S = e ? Symbol.for('react.responder') : 60118,
    T = e ? Symbol.for('react.scope') : 60119;
  function C(f) {
    if (typeof f == 'object' && f !== null) {
      var w = f.$$typeof;
      switch (w) {
        case t:
          switch (((f = f.type), f)) {
            case c:
            case u:
            case r:
            case i:
            case a:
            case p:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case d:
                case v:
                case y:
                case s:
                  return f;
                default:
                  return w;
              }
          }
        case o:
          return w;
      }
    }
  }
  function E(f) {
    return C(f) === u;
  }
  return (
    (qe.AsyncMode = c),
    (qe.ConcurrentMode = u),
    (qe.ContextConsumer = l),
    (qe.ContextProvider = s),
    (qe.Element = t),
    (qe.ForwardRef = d),
    (qe.Fragment = r),
    (qe.Lazy = v),
    (qe.Memo = y),
    (qe.Portal = o),
    (qe.Profiler = i),
    (qe.StrictMode = a),
    (qe.Suspense = p),
    (qe.isAsyncMode = function (f) {
      return E(f) || C(f) === c;
    }),
    (qe.isConcurrentMode = E),
    (qe.isContextConsumer = function (f) {
      return C(f) === l;
    }),
    (qe.isContextProvider = function (f) {
      return C(f) === s;
    }),
    (qe.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (qe.isForwardRef = function (f) {
      return C(f) === d;
    }),
    (qe.isFragment = function (f) {
      return C(f) === r;
    }),
    (qe.isLazy = function (f) {
      return C(f) === v;
    }),
    (qe.isMemo = function (f) {
      return C(f) === y;
    }),
    (qe.isPortal = function (f) {
      return C(f) === o;
    }),
    (qe.isProfiler = function (f) {
      return C(f) === i;
    }),
    (qe.isStrictMode = function (f) {
      return C(f) === a;
    }),
    (qe.isSuspense = function (f) {
      return C(f) === p;
    }),
    (qe.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === u ||
        f === i ||
        f === a ||
        f === p ||
        f === b ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === v ||
            f.$$typeof === y ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === d ||
            f.$$typeof === m ||
            f.$$typeof === S ||
            f.$$typeof === T ||
            f.$$typeof === h))
      );
    }),
    (qe.typeOf = C),
    qe
  );
}
var Ye = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wi;
function gp() {
  return (
    Wi ||
      ((Wi = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = typeof Symbol == 'function' && Symbol.for,
            t = e ? Symbol.for('react.element') : 60103,
            o = e ? Symbol.for('react.portal') : 60106,
            r = e ? Symbol.for('react.fragment') : 60107,
            a = e ? Symbol.for('react.strict_mode') : 60108,
            i = e ? Symbol.for('react.profiler') : 60114,
            s = e ? Symbol.for('react.provider') : 60109,
            l = e ? Symbol.for('react.context') : 60110,
            c = e ? Symbol.for('react.async_mode') : 60111,
            u = e ? Symbol.for('react.concurrent_mode') : 60111,
            d = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            b = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            v = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            m = e ? Symbol.for('react.fundamental') : 60117,
            S = e ? Symbol.for('react.responder') : 60118,
            T = e ? Symbol.for('react.scope') : 60119;
          function C(P) {
            return (
              typeof P == 'string' ||
              typeof P == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              P === r ||
              P === u ||
              P === i ||
              P === a ||
              P === p ||
              P === b ||
              (typeof P == 'object' &&
                P !== null &&
                (P.$$typeof === v ||
                  P.$$typeof === y ||
                  P.$$typeof === s ||
                  P.$$typeof === l ||
                  P.$$typeof === d ||
                  P.$$typeof === m ||
                  P.$$typeof === S ||
                  P.$$typeof === T ||
                  P.$$typeof === h))
            );
          }
          function E(P) {
            if (typeof P == 'object' && P !== null) {
              var Oe = P.$$typeof;
              switch (Oe) {
                case t:
                  var I = P.type;
                  switch (I) {
                    case c:
                    case u:
                    case r:
                    case i:
                    case a:
                    case p:
                      return I;
                    default:
                      var W = I && I.$$typeof;
                      switch (W) {
                        case l:
                        case d:
                        case v:
                        case y:
                        case s:
                          return W;
                        default:
                          return Oe;
                      }
                  }
                case o:
                  return Oe;
              }
            }
          }
          var f = c,
            w = u,
            k = l,
            V = s,
            L = t,
            D = d,
            _ = r,
            Y = v,
            B = y,
            M = o,
            F = i,
            z = a,
            ie = p,
            se = !1;
          function G(P) {
            return (
              se ||
                ((se = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              R(P) || E(P) === c
            );
          }
          function R(P) {
            return E(P) === u;
          }
          function j(P) {
            return E(P) === l;
          }
          function X(P) {
            return E(P) === s;
          }
          function H(P) {
            return typeof P == 'object' && P !== null && P.$$typeof === t;
          }
          function U(P) {
            return E(P) === d;
          }
          function ne(P) {
            return E(P) === r;
          }
          function oe(P) {
            return E(P) === v;
          }
          function J(P) {
            return E(P) === y;
          }
          function ae(P) {
            return E(P) === o;
          }
          function le(P) {
            return E(P) === i;
          }
          function he(P) {
            return E(P) === a;
          }
          function re(P) {
            return E(P) === p;
          }
          (Ye.AsyncMode = f),
            (Ye.ConcurrentMode = w),
            (Ye.ContextConsumer = k),
            (Ye.ContextProvider = V),
            (Ye.Element = L),
            (Ye.ForwardRef = D),
            (Ye.Fragment = _),
            (Ye.Lazy = Y),
            (Ye.Memo = B),
            (Ye.Portal = M),
            (Ye.Profiler = F),
            (Ye.StrictMode = z),
            (Ye.Suspense = ie),
            (Ye.isAsyncMode = G),
            (Ye.isConcurrentMode = R),
            (Ye.isContextConsumer = j),
            (Ye.isContextProvider = X),
            (Ye.isElement = H),
            (Ye.isForwardRef = U),
            (Ye.isFragment = ne),
            (Ye.isLazy = oe),
            (Ye.isMemo = J),
            (Ye.isPortal = ae),
            (Ye.isProfiler = le),
            (Ye.isStrictMode = he),
            (Ye.isSuspense = re),
            (Ye.isValidElementType = C),
            (Ye.typeOf = E);
        })()),
    Ye
  );
}
process.env.NODE_ENV === 'production' ? (fa.exports = bp()) : (fa.exports = gp());
var vp = fa.exports,
  Fl = vp,
  yp = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  xp = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  jl = {};
jl[Fl.ForwardRef] = yp;
jl[Fl.Memo] = xp;
var Ep = !0;
function Fa(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (a) {
      e[a] !== void 0 ? t.push(e[a] + ';') : (r += a + ' ');
    }),
    r
  );
}
var xr = function (t, o, r) {
    var a = t.key + '-' + o.name;
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (r === !1 || // we need to always store it if we're in compat mode and
      // in node since emotion-server relies on whether a style is in
      // the registered cache to know whether a style is global or not
      // also, note that this check will be dead code eliminated in the browser
      Ep === !1) &&
      t.registered[a] === void 0 &&
      (t.registered[a] = o.styles);
  },
  Er = function (t, o, r) {
    xr(t, o, r);
    var a = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var i = o;
      do t.insert(o === i ? '.' + a : '', i, t.sheet, !0), (i = i.next);
      while (i !== void 0);
    }
  };
function Cp(e) {
  for (var t = 0, o, r = 0, a = e.length; a >= 4; ++r, a -= 4)
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
  switch (a) {
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
var Op = {
    animationIterationCount: 1,
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
  Hi = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Tp =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  Sp = /[A-Z]|^ms/g,
  Vl = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  ja = function (t) {
    return t.charCodeAt(1) === 45;
  },
  qi = function (t) {
    return t != null && typeof t != 'boolean';
  },
  Jr = /* @__PURE__ */ $l(function (e) {
    return ja(e) ? e : e.replace(Sp, '-$&').toLowerCase();
  }),
  ir = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(Vl, function (r, a, i) {
            return (
              (Ut = {
                name: a,
                styles: i,
                next: Ut,
              }),
              a
            );
          });
    }
    return Op[t] !== 1 && !ja(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var wp =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    kp = ['normal', 'none', 'initial', 'inherit', 'unset'],
    Rp = ir,
    Np = /^-ms-/,
    $p = /-(.)/g,
    Yi = {};
  ir = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (kp.indexOf(o) === -1 &&
          !wp.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = Rp(t, o);
    return (
      r !== '' &&
        !ja(t) &&
        t.indexOf('-') !== -1 &&
        Yi[t] === void 0 &&
        ((Yi[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(Np, 'ms-').replace($p, function (a, i) {
              return i.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var zl =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function $o(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(zl);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1)
        return (
          (Ut = {
            name: o.name,
            styles: o.styles,
            next: Ut,
          }),
          o.name
        );
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; )
            (Ut = {
              name: r.name,
              styles: r.styles,
              next: Ut,
            }),
              (r = r.next);
        var a = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (a += o.map), a;
      }
      return Pp(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var i = Ut,
          s = o(e);
        return (Ut = i), $o(e, t, s);
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
          c = o.replace(Vl, function (d, p, b) {
            var y = 'animation' + l.length;
            return (
              l.push(
                'const ' + y + ' = keyframes`' + b.replace(/^@keyframes animation-\w+/, '') + '`',
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
  var u = t[o];
  return u !== void 0 ? u : o;
}
function Pp(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var a = 0; a < o.length; a++) r += $o(e, t, o[a]) + ';';
  else
    for (var i in o) {
      var s = o[i];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += i + '{' + t[s] + '}')
          : qi(s) && (r += Jr(i) + ':' + ir(i, s) + ';');
      else {
        if (i === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(zl);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) qi(s[l]) && (r += Jr(i) + ':' + ir(i, s[l]) + ';');
        else {
          var c = $o(e, t, s);
          switch (i) {
            case 'animation':
            case 'animationName': {
              r += Jr(i) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && i === 'undefined' && console.error(Tp),
                (r += i + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var Ki = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  Bl;
process.env.NODE_ENV !== 'production' &&
  (Bl = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var Ut,
  Zn = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var a = !0,
      i = '';
    Ut = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((a = !1), (i += $o(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(Hi),
        (i += s[0]));
    for (var l = 1; l < t.length; l++)
      (i += $o(r, o, t[l])),
        a &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(Hi),
          (i += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (i = i.replace(Bl, function (b) {
        return (c = b), '';
      })),
      (Ki.lastIndex = 0);
    for (var u = '', d; (d = Ki.exec(i)) !== null; )
      u +=
        '-' + // $FlowFixMe we know it's not null
        d[1];
    var p = Cp(i) + u;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: i,
          map: c,
          next: Ut,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : {
          name: p,
          styles: i,
          next: Ut,
        };
  },
  Ip = function (t) {
    return t();
  },
  Ul = x['useInsertionEffect'] ? x['useInsertionEffect'] : !1,
  Va = Ul || Ip,
  Gi = Ul || Nu,
  _p = {}.hasOwnProperty,
  za = /* @__PURE__ */ bl(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement < 'u'
      ? /* @__PURE__ */ hp({
          key: 'css',
        })
      : null,
  );
process.env.NODE_ENV !== 'production' && (za.displayName = 'EmotionCacheContext');
za.Provider;
var Cr = function (t) {
    return /* @__PURE__ */ $u(function (o, r) {
      var a = _o(za);
      return t(o, a, r);
    });
  },
  Ao = /* @__PURE__ */ bl({});
process.env.NODE_ENV !== 'production' && (Ao.displayName = 'EmotionThemeContext');
var Xi = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  Ji = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  Mp = function (t) {
    var o = t.cache,
      r = t.serialized,
      a = t.isStringTag;
    return (
      xr(o, r, a),
      Va(function () {
        return Er(o, r, a);
      }),
      null
    );
  },
  Ap = /* @__PURE__ */ Cr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var a = e[Xi],
      i = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = Fa(t.registered, i, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = Zn(i, void 0, _o(Ao));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[Ji];
      c && (l = Zn([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var u = {};
    for (var d in e)
      _p.call(e, d) &&
        d !== 'css' &&
        d !== Xi &&
        (process.env.NODE_ENV === 'production' || d !== Ji) &&
        (u[d] = e[d]);
    return (
      (u.ref = o),
      (u.className = s),
      /* @__PURE__ */ xn(
        ka,
        null,
        /* @__PURE__ */ xn(Mp, {
          cache: t,
          serialized: l,
          isStringTag: typeof a == 'string',
        }),
        /* @__PURE__ */ xn(a, u),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (Ap.displayName = 'EmotionCssPropInternal');
var Dp = {
    name: '@emotion/react',
    version: '11.10.6',
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
        default: './dist/emotion-react.cjs.js',
      },
      './jsx-runtime': {
        module: {
          worker: './jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js',
          browser: './jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
          default: './jsx-runtime/dist/emotion-react-jsx-runtime.esm.js',
        },
        default: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js',
      },
      './_isolated-hnrs': {
        module: {
          worker: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js',
          browser: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js',
          default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js',
        },
        default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js',
      },
      './jsx-dev-runtime': {
        module: {
          worker: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js',
          browser: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js',
          default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js',
        },
        default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js',
      },
      './package.json': './package.json',
      './types/css-prop': './types/css-prop.d.ts',
      './macro': './macro.js',
    },
    types: 'types/index.d.ts',
    files: [
      'src',
      'dist',
      'jsx-runtime',
      'jsx-dev-runtime',
      '_isolated-hnrs',
      'types/*.d.ts',
      'macro.js',
      'macro.d.ts',
      'macro.js.flow',
    ],
    sideEffects: !1,
    author: 'Emotion Contributors',
    license: 'MIT',
    scripts: {
      'test:typescript': 'dtslint types',
    },
    dependencies: {
      '@babel/runtime': '^7.18.3',
      '@emotion/babel-plugin': '^11.10.6',
      '@emotion/cache': '^11.10.5',
      '@emotion/serialize': '^1.1.1',
      '@emotion/use-insertion-effect-with-fallbacks': '^1.0.0',
      '@emotion/utils': '^1.2.0',
      '@emotion/weak-memoize': '^0.3.0',
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
      '@emotion/css': '11.10.6',
      '@emotion/css-prettifier': '1.1.1',
      '@emotion/server': '11.10.0',
      '@emotion/styled': '11.10.6',
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
          './macro': './macro.js',
        },
      },
    },
  },
  Zi = !1,
  Wl = /* @__PURE__ */ Cr(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !Zi && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (Zi = !0));
    var o = e.styles,
      r = Zn([o], void 0, _o(Ao)),
      a = Pu();
    return (
      Gi(
        function () {
          var i = t.key + '-global',
            s = new t.sheet.constructor({
              key: i,
              nonce: t.sheet.nonce,
              container: t.sheet.container,
              speedy: t.sheet.isSpeedy,
            }),
            l = !1,
            c = document.querySelector('style[data-emotion="' + i + ' ' + r.name + '"]');
          return (
            t.sheet.tags.length && (s.before = t.sheet.tags[0]),
            c !== null && ((l = !0), c.setAttribute('data-emotion', i), s.hydrate([c])),
            (a.current = [s, l]),
            function () {
              s.flush();
            }
          );
        },
        [t],
      ),
      Gi(
        function () {
          var i = a.current,
            s = i[0],
            l = i[1];
          if (l) {
            i[1] = !1;
            return;
          }
          if ((r.next !== void 0 && Er(t, r.next, !0), s.tags.length)) {
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
process.env.NODE_ENV !== 'production' && (Wl.displayName = 'EmotionGlobal');
function Lp() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return Zn(t);
}
var Ba = function () {
    var t = Lp.apply(void 0, arguments),
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
  Fp = function e(t) {
    for (var o = t.length, r = 0, a = ''; r < o; r++) {
      var i = t[r];
      if (i != null) {
        var s = void 0;
        switch (typeof i) {
          case 'boolean':
            break;
          case 'object': {
            if (Array.isArray(i)) s = e(i);
            else {
              process.env.NODE_ENV !== 'production' &&
                i.styles !== void 0 &&
                i.name !== void 0 &&
                console.error(
                  'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.',
                ),
                (s = '');
              for (var l in i) i[l] && l && (s && (s += ' '), (s += l));
            }
            break;
          }
          default:
            s = i;
        }
        s && (a && (a += ' '), (a += s));
      }
    }
    return a;
  };
function jp(e, t, o) {
  var r = [],
    a = Fa(e, r, o);
  return r.length < 2 ? o : a + t(r);
}
var Vp = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Va(function () {
        for (var a = 0; a < r.length; a++) Er(o, r[a], !1);
      }),
      null
    );
  },
  zp = /* @__PURE__ */ Cr(function (e, t) {
    var o = !1,
      r = [],
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        var b = Zn(d, t.registered);
        return r.push(b), xr(t, b, !1), t.key + '-' + b.name;
      },
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        return jp(t.registered, a, Fp(d));
      },
      s = {
        css: a,
        cx: i,
        theme: _o(Ao),
      },
      l = e.children(s);
    return (
      (o = !0),
      /* @__PURE__ */ xn(
        ka,
        null,
        /* @__PURE__ */ xn(Vp, {
          cache: t,
          serializedArr: r,
        }),
        l,
      )
    );
  });
process.env.NODE_ENV !== 'production' && (zp.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var Qi = !0,
    Bp = typeof jest < 'u' || typeof vi < 'u';
  if (Qi && !Bp) {
    var es =
        // $FlowIgnore
        typeof globalThis < 'u' ? globalThis : Qi ? window : global,
      ts = '__EMOTION_REACT_' + Dp.version.split('.')[0] + '__';
    es[ts] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (es[ts] = !0);
  }
}
var Up = Dd,
  Wp = function (t) {
    return t !== 'theme';
  },
  ns = function (t) {
    return typeof t == 'string' && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      t.charCodeAt(0) > 96
      ? Up
      : Wp;
  },
  os = function (t, o, r) {
    var a;
    if (o) {
      var i = o.shouldForwardProp;
      a =
        t.__emotion_forwardProp && i
          ? function (s) {
              return t.__emotion_forwardProp(s) && i(s);
            }
          : i;
    }
    return typeof a != 'function' && r && (a = t.__emotion_forwardProp), a;
  },
  rs = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Hp = function (t) {
    var o = t.cache,
      r = t.serialized,
      a = t.isStringTag;
    return (
      xr(o, r, a),
      Va(function () {
        return Er(o, r, a);
      }),
      null
    );
  },
  qp = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      a = (r && t.__emotion_base) || t,
      i,
      s;
    o !== void 0 && ((i = o.label), (s = o.target));
    var l = os(t, o, r),
      c = l || ns(a),
      u = !c('as');
    return function () {
      var d = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((i !== void 0 && p.push('label:' + i + ';'), d[0] == null || d[0].raw === void 0))
        p.push.apply(p, d);
      else {
        process.env.NODE_ENV !== 'production' && d[0][0] === void 0 && console.error(rs),
          p.push(d[0][0]);
        for (var b = d.length, y = 1; y < b; y++)
          process.env.NODE_ENV !== 'production' && d[0][y] === void 0 && console.error(rs),
            p.push(d[y], d[0][y]);
      }
      var v = Cr(function (h, m, S) {
        var T = (u && h.as) || a,
          C = '',
          E = [],
          f = h;
        if (h.theme == null) {
          f = {};
          for (var w in h) f[w] = h[w];
          f.theme = _o(Ao);
        }
        typeof h.className == 'string'
          ? (C = Fa(m.registered, E, h.className))
          : h.className != null && (C = h.className + ' ');
        var k = Zn(p.concat(E), m.registered, f);
        (C += m.key + '-' + k.name), s !== void 0 && (C += ' ' + s);
        var V = u && l === void 0 ? ns(T) : c,
          L = {};
        for (var D in h)
          (u && D === 'as') || // $FlowFixMe
            (V(D) && (L[D] = h[D]));
        return (
          (L.className = C),
          (L.ref = S),
          /* @__PURE__ */ xn(
            ka,
            null,
            /* @__PURE__ */ xn(Hp, {
              cache: m,
              serialized: k,
              isStringTag: typeof T == 'string',
            }),
            /* @__PURE__ */ xn(T, L),
          )
        );
      });
      return (
        (v.displayName =
          i !== void 0
            ? i
            : 'Styled(' +
              (typeof a == 'string' ? a : a.displayName || a.name || 'Component') +
              ')'),
        (v.defaultProps = t.defaultProps),
        (v.__emotion_real = v),
        (v.__emotion_base = a),
        (v.__emotion_styles = p),
        (v.__emotion_forwardProp = l),
        Object.defineProperty(v, 'toString', {
          value: function () {
            return s === void 0 && process.env.NODE_ENV !== 'production'
              ? 'NO_COMPONENT_SELECTOR'
              : '.' + s;
          },
        }),
        (v.withComponent = function (h, m) {
          return e(
            h,
            g({}, o, m, {
              shouldForwardProp: os(v, m, !0),
            }),
          ).apply(void 0, p);
        }),
        v
      );
    };
  };
const Yp = qp;
var Kp = [
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
  ma = Yp.bind();
Kp.forEach(function (e) {
  ma[e] = ma(e);
});
const Gp = ma;
function Xp(e) {
  return e == null || Object.keys(e).length === 0;
}
function Hl(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return /* @__PURE__ */ A(Wl, {
    styles: typeof t == 'function' ? (a) => t(Xp(a) ? o : a) : t,
  });
}
process.env.NODE_ENV !== 'production' &&
  (Hl.propTypes = {
    defaultTheme: n.object,
    styles: n.oneOfType([n.string, n.object, n.func]),
  });
/**
 * @mui/styled-engine v5.11.11
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Jp(e, t) {
  const o = Gp(e, t);
  return process.env.NODE_ENV !== 'production'
    ? (...r) => {
        const a = typeof e == 'string' ? `"${e}"` : 'component';
        return (
          r.length === 0
            ? console.error(
                [
                  `MUI: Seems like you called \`styled(${a})()\` without a \`style\` argument.`,
                  'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
                ].join(`
`),
              )
            : r.some((i) => i === void 0) &&
              console.error(
                `MUI: the styled(${a})(...args) API requires all its args to be defined.`,
              ),
          o(...r)
        );
      }
    : o;
}
const Zp = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Qp =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  On = Qp;
function Eo(e, t) {
  return t
    ? Ft(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const Ua = {
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
  as = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${Ua[e]}px)`,
  };
function an(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || as;
    return t.reduce((s, l, c) => ((s[i.up(i.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const i = r.breakpoints || as;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || Ua).indexOf(l) !== -1) {
        const c = i.up(l);
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
function ef(e = {}) {
  var t;
  return (
    ((t = e.keys) == null
      ? void 0
      : t.reduce((r, a) => {
          const i = e.up(a);
          return (r[i] = {}), r;
        }, {})) || {}
  );
}
function tf(e, t) {
  return e.reduce((o, r) => {
    const a = o[r];
    return (!a || Object.keys(a).length === 0) && delete o[r], o;
  }, t);
}
function Or(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((a, i) => (a && a[i] ? a[i] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, a) => (r && r[a] != null ? r[a] : null), e);
}
function sr(e, t, o, r = o) {
  let a;
  return (
    typeof e == 'function' ? (a = e(o)) : Array.isArray(e) ? (a = e[o] || r) : (a = Or(e, o) || r),
    t && (a = t(a, r, e)),
    a
  );
}
function Ze(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: a } = e,
    i = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        u = Or(c, r) || {};
      return an(s, l, (p) => {
        let b = sr(u, a, p);
        return (
          p === b &&
            typeof p == 'string' &&
            (b = sr(u, a, `${t}${p === 'default' ? '' : Q(p)}`, p)),
          o === !1
            ? b
            : {
                [o]: b,
              }
        );
      });
    };
  return (
    (i.propTypes =
      process.env.NODE_ENV !== 'production'
        ? {
            [t]: On,
          }
        : {}),
    (i.filterProps = [t]),
    i
  );
}
function Tr(...e) {
  const t = e.reduce(
      (r, a) => (
        a.filterProps.forEach((i) => {
          r[i] = a;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((a, i) => (t[i] ? Eo(a, t[i](r)) : a), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, a) => Object.assign(r, a.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, a) => r.concat(a.filterProps), [])),
    o
  );
}
function nf(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const of = {
    m: 'margin',
    p: 'padding',
  },
  rf = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  is = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  af = nf((e) => {
    if (e.length > 2)
      if (is[e]) e = is[e];
      else return [e];
    const [t, o] = e.split(''),
      r = of[t],
      a = rf[o] || '';
    return Array.isArray(a) ? a.map((i) => r + i) : [r + a];
  }),
  Sr = [
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
  wr = [
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
  sf = [...Sr, ...wr];
function Do(e, t, o, r) {
  var a;
  const i = (a = Or(e, t, !1)) != null ? a : o;
  return typeof i == 'number'
    ? (s) =>
        typeof s == 'string'
          ? s
          : (process.env.NODE_ENV !== 'production' &&
              typeof s != 'number' &&
              console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),
            i * s)
    : Array.isArray(i)
    ? (s) =>
        typeof s == 'string'
          ? s
          : (process.env.NODE_ENV !== 'production' &&
              (Number.isInteger(s)
                ? s > i.length - 1 &&
                  console.error(
                    [
                      `MUI: The value provided (${s}) overflows.`,
                      `The supported values are: ${JSON.stringify(i)}.`,
                      `${s} > ${i.length - 1}, you need to add the missing values.`,
                    ].join(`
`),
                  )
                : console.error(
                    [
                      `MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`,
                    ].join(`
`),
                  )),
            i[s])
    : typeof i == 'function'
    ? i
    : (process.env.NODE_ENV !== 'production' &&
        console.error(
          [
            `MUI: The \`theme.${t}\` value (${i}) is invalid.`,
            'It should be a number, an array or a function.',
          ].join(`
`),
        ),
      () => {});
}
function ql(e) {
  return Do(e, 'spacing', 8, 'spacing');
}
function Lo(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function lf(e, t) {
  return (o) => e.reduce((r, a) => ((r[a] = Lo(t, o)), r), {});
}
function cf(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const a = af(o),
    i = lf(a, r),
    s = e[o];
  return an(e, s, i);
}
function Yl(e, t) {
  const o = ql(e.theme);
  return Object.keys(e)
    .map((r) => cf(e, t, r, o))
    .reduce(Eo, {});
}
function st(e) {
  return Yl(e, Sr);
}
st.propTypes =
  process.env.NODE_ENV !== 'production' ? Sr.reduce((e, t) => ((e[t] = On), e), {}) : {};
st.filterProps = Sr;
function lt(e) {
  return Yl(e, wr);
}
lt.propTypes =
  process.env.NODE_ENV !== 'production' ? wr.reduce((e, t) => ((e[t] = On), e), {}) : {};
lt.filterProps = wr;
process.env.NODE_ENV !== 'production' && sf.reduce((e, t) => ((e[t] = On), e), {});
function tn(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const uf = Ze({
    prop: 'border',
    themeKey: 'borders',
    transform: tn,
  }),
  df = Ze({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: tn,
  }),
  pf = Ze({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: tn,
  }),
  ff = Ze({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: tn,
  }),
  mf = Ze({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: tn,
  }),
  hf = Ze({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  bf = Ze({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  gf = Ze({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  vf = Ze({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  yf = Ze({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  kr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Do(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({
          borderRadius: Lo(t, r),
        });
      return an(e, e.borderRadius, o);
    }
    return null;
  };
kr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: On,
      }
    : {};
kr.filterProps = ['borderRadius'];
Tr(uf, df, pf, ff, mf, hf, bf, gf, vf, yf, kr);
const Rr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Do(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({
        gap: Lo(t, r),
      });
    return an(e, e.gap, o);
  }
  return null;
};
Rr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: On,
      }
    : {};
Rr.filterProps = ['gap'];
const Nr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Do(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({
        columnGap: Lo(t, r),
      });
    return an(e, e.columnGap, o);
  }
  return null;
};
Nr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: On,
      }
    : {};
Nr.filterProps = ['columnGap'];
const $r = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Do(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({
        rowGap: Lo(t, r),
      });
    return an(e, e.rowGap, o);
  }
  return null;
};
$r.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: On,
      }
    : {};
$r.filterProps = ['rowGap'];
const xf = Ze({
    prop: 'gridColumn',
  }),
  Ef = Ze({
    prop: 'gridRow',
  }),
  Cf = Ze({
    prop: 'gridAutoFlow',
  }),
  Of = Ze({
    prop: 'gridAutoColumns',
  }),
  Tf = Ze({
    prop: 'gridAutoRows',
  }),
  Sf = Ze({
    prop: 'gridTemplateColumns',
  }),
  wf = Ze({
    prop: 'gridTemplateRows',
  }),
  kf = Ze({
    prop: 'gridTemplateAreas',
  }),
  Rf = Ze({
    prop: 'gridArea',
  });
Tr(Rr, Nr, $r, xf, Ef, Cf, Of, Tf, Sf, wf, kf, Rf);
function Gn(e, t) {
  return t === 'grey' ? t : e;
}
const Nf = Ze({
    prop: 'color',
    themeKey: 'palette',
    transform: Gn,
  }),
  $f = Ze({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: Gn,
  }),
  Pf = Ze({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: Gn,
  });
Tr(Nf, $f, Pf);
function It(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const If = Ze({
    prop: 'width',
    transform: It,
  }),
  Wa = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, a, i;
        return {
          maxWidth:
            ((r = e.theme) == null || (a = r.breakpoints) == null || (i = a.values) == null
              ? void 0
              : i[o]) ||
            Ua[o] ||
            It(o),
        };
      };
      return an(e, e.maxWidth, t);
    }
    return null;
  };
Wa.filterProps = ['maxWidth'];
const _f = Ze({
    prop: 'minWidth',
    transform: It,
  }),
  Mf = Ze({
    prop: 'height',
    transform: It,
  }),
  Af = Ze({
    prop: 'maxHeight',
    transform: It,
  }),
  Df = Ze({
    prop: 'minHeight',
    transform: It,
  });
Ze({
  prop: 'size',
  cssProperty: 'width',
  transform: It,
});
Ze({
  prop: 'size',
  cssProperty: 'height',
  transform: It,
});
const Lf = Ze({
  prop: 'boxSizing',
});
Tr(If, Wa, _f, Mf, Af, Df, Lf);
const Zr = (e) => (t) => {
    if (t[e] !== void 0 && t[e] !== null) {
      const o = (r) => {
        var a, i;
        let s =
          (a = t.theme.typography) == null
            ? void 0
            : a[
                `${e}${
                  t[e] === 'default' || t[e] === e
                    ? ''
                    : Q((i = t[e]) == null ? void 0 : i.toString())
                }`
              ];
        if (!s) {
          var l, c;
          s = (l = t.theme.typography) == null || (c = l[r]) == null ? void 0 : c[e];
        }
        return (
          s || (s = r),
          {
            [e]: s,
          }
        );
      };
      return an(t, t[e], o);
    }
    return null;
  },
  Ff = {
    // borders
    border: {
      themeKey: 'borders',
      transform: tn,
    },
    borderTop: {
      themeKey: 'borders',
      transform: tn,
    },
    borderRight: {
      themeKey: 'borders',
      transform: tn,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: tn,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: tn,
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
      style: kr,
    },
    // palette
    color: {
      themeKey: 'palette',
      transform: Gn,
    },
    bgcolor: {
      themeKey: 'palette',
      cssProperty: 'backgroundColor',
      transform: Gn,
    },
    backgroundColor: {
      themeKey: 'palette',
      transform: Gn,
    },
    // spacing
    p: {
      style: lt,
    },
    pt: {
      style: lt,
    },
    pr: {
      style: lt,
    },
    pb: {
      style: lt,
    },
    pl: {
      style: lt,
    },
    px: {
      style: lt,
    },
    py: {
      style: lt,
    },
    padding: {
      style: lt,
    },
    paddingTop: {
      style: lt,
    },
    paddingRight: {
      style: lt,
    },
    paddingBottom: {
      style: lt,
    },
    paddingLeft: {
      style: lt,
    },
    paddingX: {
      style: lt,
    },
    paddingY: {
      style: lt,
    },
    paddingInline: {
      style: lt,
    },
    paddingInlineStart: {
      style: lt,
    },
    paddingInlineEnd: {
      style: lt,
    },
    paddingBlock: {
      style: lt,
    },
    paddingBlockStart: {
      style: lt,
    },
    paddingBlockEnd: {
      style: lt,
    },
    m: {
      style: st,
    },
    mt: {
      style: st,
    },
    mr: {
      style: st,
    },
    mb: {
      style: st,
    },
    ml: {
      style: st,
    },
    mx: {
      style: st,
    },
    my: {
      style: st,
    },
    margin: {
      style: st,
    },
    marginTop: {
      style: st,
    },
    marginRight: {
      style: st,
    },
    marginBottom: {
      style: st,
    },
    marginLeft: {
      style: st,
    },
    marginX: {
      style: st,
    },
    marginY: {
      style: st,
    },
    marginInline: {
      style: st,
    },
    marginInlineStart: {
      style: st,
    },
    marginInlineEnd: {
      style: st,
    },
    marginBlock: {
      style: st,
    },
    marginBlockStart: {
      style: st,
    },
    marginBlockEnd: {
      style: st,
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
      style: Rr,
    },
    rowGap: {
      style: $r,
    },
    columnGap: {
      style: Nr,
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
      transform: It,
    },
    maxWidth: {
      style: Wa,
    },
    minWidth: {
      transform: It,
    },
    height: {
      transform: It,
    },
    maxHeight: {
      transform: It,
    },
    minHeight: {
      transform: It,
    },
    boxSizing: {},
    // typography
    fontFamily: {
      themeKey: 'typography',
      style: Zr('fontFamily'),
    },
    fontSize: {
      themeKey: 'typography',
      style: Zr('fontSize'),
    },
    fontStyle: {
      themeKey: 'typography',
    },
    fontWeight: {
      themeKey: 'typography',
      style: Zr('fontWeight'),
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
  Ha = Ff;
function jf(...e) {
  const t = e.reduce((r, a) => r.concat(Object.keys(a)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function Vf(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function zf() {
  function e(o, r, a, i) {
    const s = {
        [o]: r,
        theme: a,
      },
      l = i[o];
    if (!l)
      return {
        [o]: r,
      };
    const { cssProperty: c = o, themeKey: u, transform: d, style: p } = l;
    if (r == null) return null;
    const b = Or(a, u) || {};
    return p
      ? p(s)
      : an(s, r, (v) => {
          let h = sr(b, d, v);
          return (
            v === h &&
              typeof v == 'string' &&
              (h = sr(b, d, `${o}${v === 'default' ? '' : Q(v)}`, v)),
            c === !1
              ? h
              : {
                  [c]: h,
                }
          );
        });
  }
  function t(o) {
    var r;
    const { sx: a, theme: i = {} } = o || {};
    if (!a) return null;
    const s = (r = i.unstable_sxConfig) != null ? r : Ha;
    function l(c) {
      let u = c;
      if (typeof c == 'function') u = c(i);
      else if (typeof c != 'object') return c;
      if (!u) return null;
      const d = ef(i.breakpoints),
        p = Object.keys(d);
      let b = d;
      return (
        Object.keys(u).forEach((y) => {
          const v = Vf(u[y], i);
          if (v != null)
            if (typeof v == 'object')
              if (s[y]) b = Eo(b, e(y, v, i, s));
              else {
                const h = an(
                  {
                    theme: i,
                  },
                  v,
                  (m) => ({
                    [y]: m,
                  }),
                );
                jf(h, v)
                  ? (b[y] = t({
                      sx: v,
                      theme: i,
                    }))
                  : (b = Eo(b, h));
              }
            else b = Eo(b, e(y, v, i, s));
        }),
        tf(p, b)
      );
    }
    return Array.isArray(a) ? a.map(l) : l(a);
  }
  return t;
}
const Kl = zf();
Kl.filterProps = ['sx'];
const qa = Kl;
function Gl(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = Gl(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function Ee() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = Gl(e)) && (r && (r += ' '), (r += t));
  return r;
}
const Bf = ['values', 'unit', 'step'],
  Uf = (e) => {
    const t =
      Object.keys(e).map((o) => ({
        key: o,
        val: e[o],
      })) || [];
    return (
      t.sort((o, r) => o.val - r.val),
      t.reduce(
        (o, r) =>
          g({}, o, {
            [r.key]: r.val,
          }),
        {},
      )
    );
  };
function Wf(e) {
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
    } = e,
    a = Ce(e, Bf),
    i = Uf(t),
    s = Object.keys(i);
  function l(b) {
    return `@media (min-width:${typeof t[b] == 'number' ? t[b] : b}${o})`;
  }
  function c(b) {
    return `@media (max-width:${(typeof t[b] == 'number' ? t[b] : b) - r / 100}${o})`;
  }
  function u(b, y) {
    const v = s.indexOf(y);
    return `@media (min-width:${typeof t[b] == 'number' ? t[b] : b}${o}) and (max-width:${
      (v !== -1 && typeof t[s[v]] == 'number' ? t[s[v]] : y) - r / 100
    }${o})`;
  }
  function d(b) {
    return s.indexOf(b) + 1 < s.length ? u(b, s[s.indexOf(b) + 1]) : l(b);
  }
  function p(b) {
    const y = s.indexOf(b);
    return y === 0
      ? l(s[1])
      : y === s.length - 1
      ? c(s[y])
      : u(b, s[s.indexOf(b) + 1]).replace('@media', '@media not all and');
  }
  return g(
    {
      keys: s,
      values: i,
      up: l,
      down: c,
      between: u,
      only: d,
      not: p,
      unit: o,
    },
    a,
  );
}
const Hf = {
    borderRadius: 4,
  },
  qf = Hf;
function Yf(e = 8) {
  if (e.mui) return e;
  const t = ql({
      spacing: e,
    }),
    o = (...r) => (
      process.env.NODE_ENV !== 'production' &&
        (r.length <= 4 ||
          console.error(
            `MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`,
          )),
      (r.length === 0 ? [1] : r)
        .map((i) => {
          const s = t(i);
          return typeof s == 'number' ? `${s}px` : s;
        })
        .join(' ')
    );
  return (o.mui = !0), o;
}
const Kf = ['breakpoints', 'palette', 'spacing', 'shape'];
function Ya(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: a, shape: i = {} } = e,
    s = Ce(e, Kf),
    l = Wf(o),
    c = Yf(a);
  let u = Ft(
    {
      breakpoints: l,
      direction: 'ltr',
      components: {},
      // Inject component definitions.
      palette: g(
        {
          mode: 'light',
        },
        r,
      ),
      spacing: c,
      shape: g({}, qf, i),
    },
    s,
  );
  return (
    (u = t.reduce((d, p) => Ft(d, p), u)),
    (u.unstable_sxConfig = g({}, Ha, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return qa({
        sx: p,
        theme: this,
      });
    }),
    u
  );
}
const Xl = /* @__PURE__ */ x.createContext(null);
process.env.NODE_ENV !== 'production' && (Xl.displayName = 'ThemeContext');
const Gf = Xl;
function Xf() {
  const e = x.useContext(Gf);
  return process.env.NODE_ENV !== 'production' && x.useDebugValue(e), e;
}
function Jf(e) {
  return Object.keys(e).length === 0;
}
function Jl(e = null) {
  const t = Xf();
  return !t || Jf(t) ? e : t;
}
const Zf = Ya();
function Zl(e = Zf) {
  return Jl(e);
}
const Qf = ['variant'];
function ss(e) {
  return e.length === 0;
}
function Ql(e) {
  const { variant: t } = e,
    o = Ce(e, Qf);
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((a) => {
        a === 'color'
          ? (r += ss(r) ? e[a] : Q(e[a]))
          : (r += `${ss(r) ? a : Q(a)}${Q(e[a].toString())}`);
      }),
    r
  );
}
const em = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'],
  tm = ['theme'],
  nm = ['theme'];
function mo(e) {
  return Object.keys(e).length === 0;
}
function om(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const rm = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  am = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((a) => {
        const i = Ql(a.props);
        r[i] = a.style;
      }),
      r
    );
  },
  im = (e, t, o, r) => {
    var a, i;
    const { ownerState: s = {} } = e,
      l = [],
      c = o == null || (a = o.components) == null || (i = a[r]) == null ? void 0 : i.variants;
    return (
      c &&
        c.forEach((u) => {
          let d = !0;
          Object.keys(u.props).forEach((p) => {
            s[p] !== u.props[p] && e[p] !== u.props[p] && (d = !1);
          }),
            d && l.push(t[Ql(u.props)]);
        }),
      l
    );
  };
function Co(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const sm = Ya(),
  lm = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function cm(e = {}) {
  const { defaultTheme: t = sm, rootShouldForwardProp: o = Co, slotShouldForwardProp: r = Co } = e,
    a = (i) => {
      const s = mo(i.theme) ? t : i.theme;
      return qa(
        g({}, i, {
          theme: s,
        }),
      );
    };
  return (
    (a.__mui_systemSx = !0),
    (i, s = {}) => {
      Zp(i, (C) => C.filter((E) => !(E != null && E.__mui_systemSx)));
      const { name: l, slot: c, skipVariantsResolver: u, skipSx: d, overridesResolver: p } = s,
        b = Ce(s, em),
        y = u !== void 0 ? u : (c && c !== 'Root') || !1,
        v = d || !1;
      let h;
      process.env.NODE_ENV !== 'production' && l && (h = `${l}-${lm(c || 'Root')}`);
      let m = Co;
      c === 'Root' ? (m = o) : c ? (m = r) : om(i) && (m = void 0);
      const S = Jp(
          i,
          g(
            {
              shouldForwardProp: m,
              label: h,
            },
            b,
          ),
        ),
        T = (C, ...E) => {
          const f = E
            ? E.map((L) =>
                typeof L == 'function' && L.__emotion_real !== L
                  ? (D) => {
                      let { theme: _ } = D,
                        Y = Ce(D, tm);
                      return L(
                        g(
                          {
                            theme: mo(_) ? t : _,
                          },
                          Y,
                        ),
                      );
                    }
                  : L,
              )
            : [];
          let w = C;
          l &&
            p &&
            f.push((L) => {
              const D = mo(L.theme) ? t : L.theme,
                _ = rm(l, D);
              if (_) {
                const Y = {};
                return (
                  Object.entries(_).forEach(([B, M]) => {
                    Y[B] =
                      typeof M == 'function'
                        ? M(
                            g({}, L, {
                              theme: D,
                            }),
                          )
                        : M;
                  }),
                  p(L, Y)
                );
              }
              return null;
            }),
            l &&
              !y &&
              f.push((L) => {
                const D = mo(L.theme) ? t : L.theme;
                return im(L, am(l, D), D, l);
              }),
            v || f.push(a);
          const k = f.length - E.length;
          if (Array.isArray(C) && k > 0) {
            const L = new Array(k).fill('');
            (w = [...C, ...L]), (w.raw = [...C.raw, ...L]);
          } else
            typeof C == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              C.__emotion_real !== C &&
              (w = (L) => {
                let { theme: D } = L,
                  _ = Ce(L, nm);
                return C(
                  g(
                    {
                      theme: mo(D) ? t : D,
                    },
                    _,
                  ),
                );
              });
          const V = S(w, ...f);
          if (process.env.NODE_ENV !== 'production') {
            let L;
            l && (L = `${l}${c || ''}`),
              L === void 0 && (L = `Styled(${fd(i)})`),
              (V.displayName = L);
          }
          return V;
        };
      return S.withConfig && (T.withConfig = S.withConfig), T;
    }
  );
}
function um(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : _a(t.components[o].defaultProps, r);
}
function dm({ props: e, name: t, defaultTheme: o }) {
  const r = Zl(o);
  return um({
    theme: r,
    name: t,
    props: e,
  });
}
function Ka(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function pm(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, 'g');
  let o = e.match(t);
  return (
    o && o[0].length === 1 && (o = o.map((r) => r + r)),
    o
      ? `rgb${o.length === 4 ? 'a' : ''}(${o
          .map((r, a) =>
            a < 3 ? parseInt(r, 16) : Math.round((parseInt(r, 16) / 255) * 1e3) / 1e3,
          )
          .join(', ')})`
      : ''
  );
}
function Mn(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Mn(pm(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : Cn(9, e),
    );
  let r = e.substring(t + 1, e.length - 1),
    a;
  if (o === 'color') {
    if (
      ((r = r.split(' ')),
      (a = r.shift()),
      r.length === 4 && r[3].charAt(0) === '/' && (r[3] = r[3].slice(1)),
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(a) === -1)
    )
      throw new Error(
        process.env.NODE_ENV !== 'production'
          ? `MUI: unsupported \`${a}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
          : Cn(10, a),
      );
  } else r = r.split(',');
  return (
    (r = r.map((i) => parseFloat(i))),
    {
      type: o,
      values: r,
      colorSpace: a,
    }
  );
}
function Pr(e) {
  const { type: t, colorSpace: o } = e;
  let { values: r } = e;
  return (
    t.indexOf('rgb') !== -1
      ? (r = r.map((a, i) => (i < 3 ? parseInt(a, 10) : a)))
      : t.indexOf('hsl') !== -1 && ((r[1] = `${r[1]}%`), (r[2] = `${r[2]}%`)),
    t.indexOf('color') !== -1 ? (r = `${o} ${r.join(' ')}`) : (r = `${r.join(', ')}`),
    `${t}(${r})`
  );
}
function fm(e) {
  e = Mn(e);
  const { values: t } = e,
    o = t[0],
    r = t[1] / 100,
    a = t[2] / 100,
    i = r * Math.min(a, 1 - a),
    s = (u, d = (u + o / 30) % 12) => a - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return (
    e.type === 'hsla' && ((l += 'a'), c.push(t[3])),
    Pr({
      type: l,
      values: c,
    })
  );
}
function ha(e) {
  e = Mn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? Mn(fm(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function ls(e, t) {
  const o = ha(e),
    r = ha(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Je(e, t) {
  return (
    (e = Mn(e)),
    (t = Ka(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Pr(e)
  );
}
function Ir(e, t) {
  if (((e = Mn(e)), (t = Ka(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Pr(e);
}
function _r(e, t) {
  if (((e = Mn(e)), (t = Ka(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Pr(e);
}
function mm(e, t = 0.15) {
  return ha(e) > 0.5 ? Ir(e, t) : _r(e, t);
}
function hm(e, t) {
  return g(
    {
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
    },
    t,
  );
}
const bm = ['mode', 'contrastThreshold', 'tonalOffset'],
  cs = {
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
      paper: ko.white,
      default: ko.white,
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
  Qr = {
    text: {
      primary: ko.white,
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
      active: ko.white,
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
function us(e, t, o, r) {
  const a = r.light || r,
    i = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = _r(e.main, a))
      : t === 'dark' && (e.dark = Ir(e.main, i)));
}
function gm(e = 'light') {
  return e === 'dark'
    ? {
        main: Vn[200],
        light: Vn[50],
        dark: Vn[400],
      }
    : {
        main: Vn[700],
        light: Vn[400],
        dark: Vn[800],
      };
}
function vm(e = 'light') {
  return e === 'dark'
    ? {
        main: jn[200],
        light: jn[50],
        dark: jn[400],
      }
    : {
        main: jn[500],
        light: jn[300],
        dark: jn[700],
      };
}
function ym(e = 'light') {
  return e === 'dark'
    ? {
        main: Fn[500],
        light: Fn[300],
        dark: Fn[700],
      }
    : {
        main: Fn[700],
        light: Fn[400],
        dark: Fn[800],
      };
}
function xm(e = 'light') {
  return e === 'dark'
    ? {
        main: zn[400],
        light: zn[300],
        dark: zn[700],
      }
    : {
        main: zn[700],
        light: zn[500],
        dark: zn[900],
      };
}
function Em(e = 'light') {
  return e === 'dark'
    ? {
        main: Bn[400],
        light: Bn[300],
        dark: Bn[700],
      }
    : {
        main: Bn[800],
        light: Bn[500],
        dark: Bn[900],
      };
}
function Cm(e = 'light') {
  return e === 'dark'
    ? {
        main: po[400],
        light: po[300],
        dark: po[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: po[500],
        dark: po[900],
      };
}
function Om(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2 } = e,
    a = Ce(e, bm),
    i = e.primary || gm(t),
    s = e.secondary || vm(t),
    l = e.error || ym(t),
    c = e.info || xm(t),
    u = e.success || Em(t),
    d = e.warning || Cm(t);
  function p(h) {
    const m = ls(h, Qr.text.primary) >= o ? Qr.text.primary : cs.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const S = ls(h, m);
      S < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${S}:1 for ${m} on ${h}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return m;
  }
  const b = ({
      color: h,
      name: m,
      mainShade: S = 500,
      lightShade: T = 300,
      darkShade: C = 700,
    }) => {
      if (((h = g({}, h)), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${m ? ` (${m})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`
            : Cn(11, m ? ` (${m})` : '', S),
        );
      if (typeof h.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${m ? ` (${m})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : Cn(12, m ? ` (${m})` : '', JSON.stringify(h.main)),
        );
      return (
        us(h, 'light', T, r), us(h, 'dark', C, r), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    y = {
      dark: Qr,
      light: cs,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (y[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    Ft(
      g(
        {
          // A collection of common colors.
          common: g({}, ko),
          // prevent mutable object.
          // The palette mode, can be light or dark.
          mode: t,
          // The colors used to represent primary interface elements for a user.
          primary: b({
            color: i,
            name: 'primary',
          }),
          // The colors used to represent secondary interface elements for a user.
          secondary: b({
            color: s,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          // The colors used to represent interface elements that the user should be made aware of.
          error: b({
            color: l,
            name: 'error',
          }),
          // The colors used to represent potentially dangerous actions or important messages.
          warning: b({
            color: d,
            name: 'warning',
          }),
          // The colors used to present information to the user that is neutral and not necessarily important.
          info: b({
            color: c,
            name: 'info',
          }),
          // The colors used to indicate the successful completion of an action that user triggered.
          success: b({
            color: u,
            name: 'success',
          }),
          // The grey colors.
          grey: Gu,
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: o,
          // Takes a background color and returns the text color that maximizes the contrast.
          getContrastText: p,
          // Generate a rich color object.
          augmentColor: b,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: r,
        },
        y[t],
      ),
      a,
    )
  );
}
const Tm = [
  'fontFamily',
  'fontSize',
  'fontWeightLight',
  'fontWeightRegular',
  'fontWeightMedium',
  'fontWeightBold',
  'htmlFontSize',
  'allVariants',
  'pxToRem',
];
function Sm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ds = {
    textTransform: 'uppercase',
  },
  ps = '"Roboto", "Helvetica", "Arial", sans-serif';
function wm(e, t) {
  const o = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: r = ps,
      // The default font size of the Material Specification.
      fontSize: a = 14,
      // px
      fontWeightLight: i = 300,
      fontWeightRegular: s = 400,
      fontWeightMedium: l = 500,
      fontWeightBold: c = 700,
      // Tell MUI what's the font-size on the html element.
      // 16px is the default font-size used by browsers.
      htmlFontSize: u = 16,
      // Apply the CSS properties to all the variants.
      allVariants: d,
      pxToRem: p,
    } = o,
    b = Ce(o, Tm);
  process.env.NODE_ENV !== 'production' &&
    (typeof a != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof u != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const y = a / 14,
    v = p || ((S) => `${(S / u) * y}rem`),
    h = (S, T, C, E, f) =>
      g(
        {
          fontFamily: r,
          fontWeight: S,
          fontSize: v(T),
          // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
          lineHeight: C,
        },
        r === ps
          ? {
              letterSpacing: `${Sm(E / T)}em`,
            }
          : {},
        f,
        d,
      ),
    m = {
      h1: h(i, 96, 1.167, -1.5),
      h2: h(i, 60, 1.2, -0.5),
      h3: h(s, 48, 1.167, 0),
      h4: h(s, 34, 1.235, 0.25),
      h5: h(s, 24, 1.334, 0),
      h6: h(l, 20, 1.6, 0.15),
      subtitle1: h(s, 16, 1.75, 0.15),
      subtitle2: h(l, 14, 1.57, 0.1),
      body1: h(s, 16, 1.5, 0.15),
      body2: h(s, 14, 1.43, 0.15),
      button: h(l, 14, 1.75, 0.4, ds),
      caption: h(s, 12, 1.66, 0.4),
      overline: h(s, 12, 2.66, 1, ds),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return Ft(
    g(
      {
        htmlFontSize: u,
        pxToRem: v,
        fontFamily: r,
        fontSize: a,
        fontWeightLight: i,
        fontWeightRegular: s,
        fontWeightMedium: l,
        fontWeightBold: c,
      },
      m,
    ),
    b,
    {
      clone: !1,
      // No need to clone deep
    },
  );
}
const km = 0.2,
  Rm = 0.14,
  Nm = 0.12;
function rt(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${km})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Rm})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Nm})`,
  ].join(',');
}
const $m = [
    'none',
    rt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    rt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    rt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    rt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    rt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    rt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    rt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    rt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    rt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    rt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    rt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    rt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    rt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    rt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    rt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    rt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    rt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    rt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    rt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    rt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    rt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    rt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    rt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    rt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  Pm = $m,
  Im = ['duration', 'easing', 'delay'],
  _m = {
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
  Mm = {
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
function fs(e) {
  return `${Math.round(e)}ms`;
}
function Am(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Dm(e) {
  const t = g({}, _m, e.easing),
    o = g({}, Mm, e.duration);
  return g(
    {
      getAutoHeightDuration: Am,
      create: (a = ['all'], i = {}) => {
        const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0 } = i,
          u = Ce(i, Im);
        if (process.env.NODE_ENV !== 'production') {
          const d = (b) => typeof b == 'string',
            p = (b) => !isNaN(parseFloat(b));
          !d(a) &&
            !Array.isArray(a) &&
            console.error('MUI: Argument "props" must be a string or Array.'),
            !p(s) &&
              !d(s) &&
              console.error(
                `MUI: Argument "duration" must be a number or a string but found ${s}.`,
              ),
            d(l) || console.error('MUI: Argument "easing" must be a string.'),
            !p(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'),
            Object.keys(u).length !== 0 &&
              console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(',')}].`);
        }
        return (Array.isArray(a) ? a : [a])
          .map(
            (d) =>
              `${d} ${typeof s == 'string' ? s : fs(s)} ${l} ${typeof c == 'string' ? c : fs(c)}`,
          )
          .join(',');
      },
    },
    e,
    {
      easing: t,
      duration: o,
    },
  );
}
const Lm = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Fm = Lm,
  jm = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function Vm(e = {}, ...t) {
  const { mixins: o = {}, palette: r = {}, transitions: a = {}, typography: i = {} } = e,
    s = Ce(e, jm);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Cn(18),
    );
  const l = Om(r),
    c = Ya(e);
  let u = Ft(c, {
    mixins: hm(c.breakpoints, o),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Pm.slice(),
    typography: wm(l, i),
    transitions: Dm(a),
    zIndex: g({}, Fm),
  });
  if (
    ((u = Ft(u, s)), (u = t.reduce((d, p) => Ft(d, p), u)), process.env.NODE_ENV !== 'production')
  ) {
    const d = [
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
      p = (b, y) => {
        let v;
        for (v in b) {
          const h = b[v];
          if (d.indexOf(v) !== -1 && Object.keys(h).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const m = Ae('', v);
              console.error(
                [
                  `MUI: The \`${y}\` component increases the CSS specificity of the \`${v}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(b, null, 2),
                  '',
                  `Instead, you need to use the '&.${m}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${m}`]: h,
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
            b[v] = {};
          }
        }
      };
    Object.keys(u.components).forEach((b) => {
      const y = u.components[b].styleOverrides;
      y && b.indexOf('Mui') === 0 && p(y, b);
    });
  }
  return (
    (u.unstable_sxConfig = g({}, Ha, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return qa({
        sx: p,
        theme: this,
      });
    }),
    u
  );
}
const zm = Vm(),
  Mr = zm;
function io() {
  const e = Zl(Mr);
  return process.env.NODE_ENV !== 'production' && x.useDebugValue(e), e;
}
function ze({ props: e, name: t }) {
  return dm({
    props: e,
    name: t,
    defaultTheme: Mr,
  });
}
const Xt = (e) => Co(e) && e !== 'classes',
  Ga = Co,
  Bm = cm({
    defaultTheme: Mr,
    rootShouldForwardProp: Xt,
  }),
  pe = Bm,
  Um = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  ms = Um;
function En(e) {
  return typeof e == 'string';
}
function Wm(e, t, o) {
  return e === void 0 || En(e)
    ? t
    : g({}, t, {
        ownerState: g({}, t.ownerState, o),
      });
}
const Hm = {
    disableDefaultClasses: !1,
  },
  qm = /* @__PURE__ */ x.createContext(Hm);
function ec(e) {
  const { disableDefaultClasses: t } = x.useContext(qm);
  return (o) => (t ? '' : e(o));
}
function tc(e, t = []) {
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
function ba(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function hs(e) {
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
function Ym(e) {
  const {
    getSlotProps: t,
    additionalProps: o,
    externalSlotProps: r,
    externalForwardedProps: a,
    className: i,
  } = e;
  if (!t) {
    const y = Ee(
        a == null ? void 0 : a.className,
        r == null ? void 0 : r.className,
        i,
        o == null ? void 0 : o.className,
      ),
      v = g(
        {},
        o == null ? void 0 : o.style,
        a == null ? void 0 : a.style,
        r == null ? void 0 : r.style,
      ),
      h = g({}, o, a, r);
    return (
      y.length > 0 && (h.className = y),
      Object.keys(v).length > 0 && (h.style = v),
      {
        props: h,
        internalRef: void 0,
      }
    );
  }
  const s = tc(g({}, a, r)),
    l = hs(r),
    c = hs(a),
    u = t(s),
    d = Ee(
      u == null ? void 0 : u.className,
      o == null ? void 0 : o.className,
      i,
      a == null ? void 0 : a.className,
      r == null ? void 0 : r.className,
    ),
    p = g(
      {},
      u == null ? void 0 : u.style,
      o == null ? void 0 : o.style,
      a == null ? void 0 : a.style,
      r == null ? void 0 : r.style,
    ),
    b = g({}, u, o, c, l);
  return (
    d.length > 0 && (b.className = d),
    Object.keys(p).length > 0 && (b.style = p),
    {
      props: b,
      internalRef: u.ref,
    }
  );
}
const Km = ['elementType', 'externalSlotProps', 'ownerState'];
function Dt(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: a } = e,
    i = Ce(e, Km),
    s = ba(r, a),
    { props: l, internalRef: c } = Ym(
      g({}, i, {
        externalSlotProps: s,
      }),
    ),
    u = dt(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Wm(
    o,
    g({}, l, {
      ref: u,
    }),
    a,
  );
}
function bs(e) {
  return e.substring(2).toLowerCase();
}
function Gm(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function lr(e) {
  const {
      children: t,
      disableReactTree: o = !1,
      mouseEvent: r = 'onClick',
      onClickAway: a,
      touchEvent: i = 'onTouchEnd',
    } = e,
    s = x.useRef(!1),
    l = x.useRef(null),
    c = x.useRef(!1),
    u = x.useRef(!1);
  x.useEffect(
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
  const d = dt(
      // @ts-expect-error TODO upstream fix
      t.ref,
      l,
    ),
    p = Ct((v) => {
      const h = u.current;
      u.current = !1;
      const m = ct(l.current);
      if (!c.current || !l.current || ('clientX' in v && Gm(v, m))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let S;
      v.composedPath
        ? (S = v.composedPath().indexOf(l.current) > -1)
        : (S =
            !m.documentElement.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              v.target,
            ) ||
            l.current.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              v.target,
            )),
        !S && (o || !h) && a(v);
    }),
    b = (v) => (h) => {
      u.current = !0;
      const m = t.props[v];
      m && m(h);
    },
    y = {
      ref: d,
    };
  return (
    i !== !1 && (y[i] = b(i)),
    x.useEffect(() => {
      if (i !== !1) {
        const v = bs(i),
          h = ct(l.current),
          m = () => {
            s.current = !0;
          };
        return (
          h.addEventListener(v, p),
          h.addEventListener('touchmove', m),
          () => {
            h.removeEventListener(v, p), h.removeEventListener('touchmove', m);
          }
        );
      }
    }, [p, i]),
    r !== !1 && (y[r] = b(r)),
    x.useEffect(() => {
      if (r !== !1) {
        const v = bs(r),
          h = ct(l.current);
        return (
          h.addEventListener(v, p),
          () => {
            h.removeEventListener(v, p);
          }
        );
      }
    }, [p, r]),
    /* @__PURE__ */ A(x.Fragment, {
      children: /* @__PURE__ */ x.cloneElement(t, y),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (lr.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * The wrapped element.
     */
    children: ro.isRequired,
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
process.env.NODE_ENV !== 'production' && (lr['propTypes'] = Pa(lr.propTypes));
const Xm = [
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
function Jm(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function Zm(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function Qm(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || Zm(e));
}
function eh(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(Xm)).forEach((r, a) => {
      const i = Jm(r);
      i === -1 ||
        !Qm(r) ||
        (i === 0
          ? t.push(r)
          : o.push({
              documentOrder: a,
              tabIndex: i,
              node: r,
            }));
    }),
    o
      .sort((r, a) =>
        r.tabIndex === a.tabIndex ? r.documentOrder - a.documentOrder : r.tabIndex - a.tabIndex,
      )
      .map((r) => r.node)
      .concat(t)
  );
}
function th() {
  return !0;
}
function cr(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: a = !1,
      getTabbable: i = eh,
      isEnabled: s = th,
      open: l,
    } = e,
    c = x.useRef(!1),
    u = x.useRef(null),
    d = x.useRef(null),
    p = x.useRef(null),
    b = x.useRef(null),
    y = x.useRef(!1),
    v = x.useRef(null),
    h = dt(t.ref, v),
    m = x.useRef(null);
  x.useEffect(() => {
    !l || !v.current || (y.current = !o);
  }, [o, l]),
    x.useEffect(() => {
      if (!l || !v.current) return;
      const C = ct(v.current);
      return (
        v.current.contains(C.activeElement) ||
          (v.current.hasAttribute('tabIndex') ||
            (process.env.NODE_ENV !== 'production' &&
              console.error(
                [
                  'MUI: The modal content node does not accept focus.',
                  'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".',
                ].join(`
`),
              ),
            v.current.setAttribute('tabIndex', '-1')),
          y.current && v.current.focus()),
        () => {
          a ||
            (p.current && p.current.focus && ((c.current = !0), p.current.focus()),
            (p.current = null));
        }
      );
    }, [l]),
    x.useEffect(() => {
      if (!l || !v.current) return;
      const C = ct(v.current),
        E = (k) => {
          const { current: V } = v;
          if (V !== null) {
            if (!C.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!V.contains(C.activeElement)) {
              if ((k && b.current !== k.target) || C.activeElement !== b.current) b.current = null;
              else if (b.current !== null) return;
              if (!y.current) return;
              let _ = [];
              if (
                ((C.activeElement === u.current || C.activeElement === d.current) &&
                  (_ = i(v.current)),
                _.length > 0)
              ) {
                var L, D;
                const Y = !!(
                    (L = m.current) != null &&
                    L.shiftKey &&
                    ((D = m.current) == null ? void 0 : D.key) === 'Tab'
                  ),
                  B = _[0],
                  M = _[_.length - 1];
                typeof B != 'string' && typeof M != 'string' && (Y ? M.focus() : B.focus());
              } else V.focus();
            }
          }
        },
        f = (k) => {
          (m.current = k),
            !(r || !s() || k.key !== 'Tab') &&
              C.activeElement === v.current &&
              k.shiftKey &&
              ((c.current = !0), d.current && d.current.focus());
        };
      C.addEventListener('focusin', E), C.addEventListener('keydown', f, !0);
      const w = setInterval(() => {
        C.activeElement && C.activeElement.tagName === 'BODY' && E(null);
      }, 50);
      return () => {
        clearInterval(w),
          C.removeEventListener('focusin', E),
          C.removeEventListener('keydown', f, !0);
      };
    }, [o, r, a, s, l, i]);
  const S = (C) => {
      p.current === null && (p.current = C.relatedTarget), (y.current = !0), (b.current = C.target);
      const E = t.props.onFocus;
      E && E(C);
    },
    T = (C) => {
      p.current === null && (p.current = C.relatedTarget), (y.current = !0);
    };
  return /* @__PURE__ */ Qe(x.Fragment, {
    children: [
      /* @__PURE__ */ A('div', {
        tabIndex: l ? 0 : -1,
        onFocus: T,
        ref: u,
        'data-testid': 'sentinelStart',
      }),
      /* @__PURE__ */ x.cloneElement(t, {
        ref: h,
        onFocus: S,
      }),
      /* @__PURE__ */ A('div', {
        tabIndex: l ? 0 : -1,
        onFocus: T,
        ref: d,
        'data-testid': 'sentinelEnd',
      }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (cr.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: ro,
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
process.env.NODE_ENV !== 'production' && (cr['propTypes'] = Pa(cr.propTypes));
var wt = 'top',
  jt = 'bottom',
  Vt = 'right',
  kt = 'left',
  Ar = 'auto',
  Fo = [wt, jt, Vt, kt],
  Qn = 'start',
  Po = 'end',
  nh = 'clippingParents',
  nc = 'viewport',
  ho = 'popper',
  oh = 'reference',
  gs = /* @__PURE__ */ Fo.reduce(function (e, t) {
    return e.concat([t + '-' + Qn, t + '-' + Po]);
  }, []),
  oc = /* @__PURE__ */ [].concat(Fo, [Ar]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Qn, t + '-' + Po]);
  }, []),
  rh = 'beforeRead',
  ah = 'read',
  ih = 'afterRead',
  sh = 'beforeMain',
  lh = 'main',
  ch = 'afterMain',
  uh = 'beforeWrite',
  dh = 'write',
  ph = 'afterWrite',
  ga = [rh, ah, ih, sh, lh, ch, uh, dh, ph];
function sn(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function zt(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function An(e) {
  var t = zt(e).Element;
  return e instanceof t || e instanceof Element;
}
function Mt(e) {
  var t = zt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Xa(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = zt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function fh(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      a = t.attributes[o] || {},
      i = t.elements[o];
    !Mt(i) ||
      !sn(i) ||
      (Object.assign(i.style, r),
      Object.keys(a).forEach(function (s) {
        var l = a[s];
        l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function mh(e) {
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
        var a = t.elements[r],
          i = t.attributes[r] || {},
          s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : o[r]),
          l = s.reduce(function (c, u) {
            return (c[u] = ''), c;
          }, {});
        !Mt(a) ||
          !sn(a) ||
          (Object.assign(a.style, l),
          Object.keys(i).forEach(function (c) {
            a.removeAttribute(c);
          }));
      });
    }
  );
}
const hh = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: fh,
  effect: mh,
  requires: ['computeStyles'],
};
function Yt(e) {
  return e.split('-')[0];
}
var In = Math.max,
  ur = Math.min,
  eo = Math.round;
function va() {
  var e = navigator.userAgentData;
  return e != null && e.brands
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function rc() {
  return !/^((?!chrome|android).)*safari/i.test(va());
}
function to(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    a = 1,
    i = 1;
  t &&
    Mt(e) &&
    ((a = (e.offsetWidth > 0 && eo(r.width) / e.offsetWidth) || 1),
    (i = (e.offsetHeight > 0 && eo(r.height) / e.offsetHeight) || 1));
  var s = An(e) ? zt(e) : window,
    l = s.visualViewport,
    c = !rc() && o,
    u = (r.left + (c && l ? l.offsetLeft : 0)) / a,
    d = (r.top + (c && l ? l.offsetTop : 0)) / i,
    p = r.width / a,
    b = r.height / i;
  return {
    width: p,
    height: b,
    top: d,
    right: u + p,
    bottom: d + b,
    left: u,
    x: u,
    y: d,
  };
}
function Ja(e) {
  var t = to(e),
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
function ac(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && Xa(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Gt(e) {
  return zt(e).getComputedStyle(e);
}
function bh(e) {
  return ['table', 'td', 'th'].indexOf(sn(e)) >= 0;
}
function Tn(e) {
  return (
    (An(e)
      ? e.ownerDocument
      : // $FlowFixMe[prop-missing]
        e.document) || window.document
  ).documentElement;
}
function Dr(e) {
  return sn(e) === 'html'
    ? e
    : // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        e.parentNode || // DOM Element detected
        (Xa(e) ? e.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        Tn(e);
}
function vs(e) {
  return !Mt(e) || // https://github.com/popperjs/popper-core/issues/837
    Gt(e).position === 'fixed'
    ? null
    : e.offsetParent;
}
function gh(e) {
  var t = /firefox/i.test(va()),
    o = /Trident/i.test(va());
  if (o && Mt(e)) {
    var r = Gt(e);
    if (r.position === 'fixed') return null;
  }
  var a = Dr(e);
  for (Xa(a) && (a = a.host); Mt(a) && ['html', 'body'].indexOf(sn(a)) < 0; ) {
    var i = Gt(a);
    if (
      i.transform !== 'none' ||
      i.perspective !== 'none' ||
      i.contain === 'paint' ||
      ['transform', 'perspective'].indexOf(i.willChange) !== -1 ||
      (t && i.willChange === 'filter') ||
      (t && i.filter && i.filter !== 'none')
    )
      return a;
    a = a.parentNode;
  }
  return null;
}
function jo(e) {
  for (var t = zt(e), o = vs(e); o && bh(o) && Gt(o).position === 'static'; ) o = vs(o);
  return o && (sn(o) === 'html' || (sn(o) === 'body' && Gt(o).position === 'static'))
    ? t
    : o || gh(e) || t;
}
function Za(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function Oo(e, t, o) {
  return In(e, ur(t, o));
}
function vh(e, t, o) {
  var r = Oo(e, t, o);
  return r > o ? o : r;
}
function ic() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function sc(e) {
  return Object.assign({}, ic(), e);
}
function lc(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var yh = function (t, o) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, o.rects, {
              placement: o.placement,
            }),
          )
        : t),
    sc(typeof t != 'number' ? t : lc(t, Fo))
  );
};
function xh(e) {
  var t,
    o = e.state,
    r = e.name,
    a = e.options,
    i = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Yt(o.placement),
    c = Za(l),
    u = [kt, Vt].indexOf(l) >= 0,
    d = u ? 'height' : 'width';
  if (!(!i || !s)) {
    var p = yh(a.padding, o),
      b = Ja(i),
      y = c === 'y' ? wt : kt,
      v = c === 'y' ? jt : Vt,
      h = o.rects.reference[d] + o.rects.reference[c] - s[c] - o.rects.popper[d],
      m = s[c] - o.rects.reference[c],
      S = jo(i),
      T = S ? (c === 'y' ? S.clientHeight || 0 : S.clientWidth || 0) : 0,
      C = h / 2 - m / 2,
      E = p[y],
      f = T - b[d] - p[v],
      w = T / 2 - b[d] / 2 + C,
      k = Oo(E, w, f),
      V = c;
    o.modifiersData[r] = ((t = {}), (t[V] = k), (t.centerOffset = k - w), t);
  }
}
function Eh(e) {
  var t = e.state,
    o = e.options,
    r = o.element,
    a = r === void 0 ? '[data-popper-arrow]' : r;
  if (a != null && !(typeof a == 'string' && ((a = t.elements.popper.querySelector(a)), !a))) {
    if (
      (process.env.NODE_ENV !== 'production' &&
        (Mt(a) ||
          console.error(
            [
              'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
              'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
              'the arrow.',
            ].join(' '),
          )),
      !ac(t.elements.popper, a))
    ) {
      process.env.NODE_ENV !== 'production' &&
        console.error(
          ['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(
            ' ',
          ),
        );
      return;
    }
    t.elements.arrow = a;
  }
}
const Ch = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: xh,
  effect: Eh,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function no(e) {
  return e.split('-')[1];
}
var Oh = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function Th(e) {
  var t = e.x,
    o = e.y,
    r = window,
    a = r.devicePixelRatio || 1;
  return {
    x: eo(t * a) / a || 0,
    y: eo(o * a) / a || 0,
  };
}
function ys(e) {
  var t,
    o = e.popper,
    r = e.popperRect,
    a = e.placement,
    i = e.variation,
    s = e.offsets,
    l = e.position,
    c = e.gpuAcceleration,
    u = e.adaptive,
    d = e.roundOffsets,
    p = e.isFixed,
    b = s.x,
    y = b === void 0 ? 0 : b,
    v = s.y,
    h = v === void 0 ? 0 : v,
    m =
      typeof d == 'function'
        ? d({
            x: y,
            y: h,
          })
        : {
            x: y,
            y: h,
          };
  (y = m.x), (h = m.y);
  var S = s.hasOwnProperty('x'),
    T = s.hasOwnProperty('y'),
    C = kt,
    E = wt,
    f = window;
  if (u) {
    var w = jo(o),
      k = 'clientHeight',
      V = 'clientWidth';
    if (
      (w === zt(o) &&
        ((w = Tn(o)),
        Gt(w).position !== 'static' &&
          l === 'absolute' &&
          ((k = 'scrollHeight'), (V = 'scrollWidth'))),
      (w = w),
      a === wt || ((a === kt || a === Vt) && i === Po))
    ) {
      E = jt;
      var L =
        p && w === f && f.visualViewport
          ? f.visualViewport.height
          : // $FlowFixMe[prop-missing]
            w[k];
      (h -= L - r.height), (h *= c ? 1 : -1);
    }
    if (a === kt || ((a === wt || a === jt) && i === Po)) {
      C = Vt;
      var D =
        p && w === f && f.visualViewport
          ? f.visualViewport.width
          : // $FlowFixMe[prop-missing]
            w[V];
      (y -= D - r.width), (y *= c ? 1 : -1);
    }
  }
  var _ = Object.assign(
      {
        position: l,
      },
      u && Oh,
    ),
    Y =
      d === !0
        ? Th({
            x: y,
            y: h,
          })
        : {
            x: y,
            y: h,
          };
  if (((y = Y.x), (h = Y.y), c)) {
    var B;
    return Object.assign(
      {},
      _,
      ((B = {}),
      (B[E] = T ? '0' : ''),
      (B[C] = S ? '0' : ''),
      (B.transform =
        (f.devicePixelRatio || 1) <= 1
          ? 'translate(' + y + 'px, ' + h + 'px)'
          : 'translate3d(' + y + 'px, ' + h + 'px, 0)'),
      B),
    );
  }
  return Object.assign(
    {},
    _,
    ((t = {}), (t[E] = T ? h + 'px' : ''), (t[C] = S ? y + 'px' : ''), (t.transform = ''), t),
  );
}
function Sh(e) {
  var t = e.state,
    o = e.options,
    r = o.gpuAcceleration,
    a = r === void 0 ? !0 : r,
    i = o.adaptive,
    s = i === void 0 ? !0 : i,
    l = o.roundOffsets,
    c = l === void 0 ? !0 : l;
  if (process.env.NODE_ENV !== 'production') {
    var u = Gt(t.elements.popper).transitionProperty || '';
    s &&
      ['transform', 'top', 'right', 'bottom', 'left'].some(function (p) {
        return u.indexOf(p) >= 0;
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
  var d = {
    placement: Yt(t.placement),
    variation: no(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: a,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      ys(
        Object.assign({}, d, {
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
        ys(
          Object.assign({}, d, {
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
const wh = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: Sh,
  data: {},
};
var Wo = {
  passive: !0,
};
function kh(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    a = r.scroll,
    i = a === void 0 ? !0 : a,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = zt(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    i &&
      u.forEach(function (d) {
        d.addEventListener('scroll', o.update, Wo);
      }),
    l && c.addEventListener('resize', o.update, Wo),
    function () {
      i &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', o.update, Wo);
        }),
        l && c.removeEventListener('resize', o.update, Wo);
    }
  );
}
const Rh = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: kh,
  data: {},
};
var Nh = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function nr(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return Nh[t];
  });
}
var $h = {
  start: 'end',
  end: 'start',
};
function xs(e) {
  return e.replace(/start|end/g, function (t) {
    return $h[t];
  });
}
function Qa(e) {
  var t = zt(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r,
  };
}
function ei(e) {
  return to(Tn(e)).left + Qa(e).scrollLeft;
}
function Ph(e, t) {
  var o = zt(e),
    r = Tn(e),
    a = o.visualViewport,
    i = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (a) {
    (i = a.width), (s = a.height);
    var u = rc();
    (u || (!u && t === 'fixed')) && ((l = a.offsetLeft), (c = a.offsetTop));
  }
  return {
    width: i,
    height: s,
    x: l + ei(e),
    y: c,
  };
}
function Ih(e) {
  var t,
    o = Tn(e),
    r = Qa(e),
    a = (t = e.ownerDocument) == null ? void 0 : t.body,
    i = In(o.scrollWidth, o.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0),
    s = In(o.scrollHeight, o.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0),
    l = -r.scrollLeft + ei(e),
    c = -r.scrollTop;
  return (
    Gt(a || o).direction === 'rtl' && (l += In(o.clientWidth, a ? a.clientWidth : 0) - i),
    {
      width: i,
      height: s,
      x: l,
      y: c,
    }
  );
}
function ti(e) {
  var t = Gt(e),
    o = t.overflow,
    r = t.overflowX,
    a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + a + r);
}
function cc(e) {
  return ['html', 'body', '#document'].indexOf(sn(e)) >= 0
    ? e.ownerDocument.body
    : Mt(e) && ti(e)
    ? e
    : cc(Dr(e));
}
function To(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = cc(e),
    a = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    i = zt(r),
    s = a ? [i].concat(i.visualViewport || [], ti(r) ? r : []) : r,
    l = t.concat(s);
  return a
    ? l
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(To(Dr(s)));
}
function ya(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function _h(e, t) {
  var o = to(e, !1, t === 'fixed');
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
function Es(e, t, o) {
  return t === nc ? ya(Ph(e, o)) : An(t) ? _h(t, o) : ya(Ih(Tn(e)));
}
function Mh(e) {
  var t = To(Dr(e)),
    o = ['absolute', 'fixed'].indexOf(Gt(e).position) >= 0,
    r = o && Mt(e) ? jo(e) : e;
  return An(r)
    ? t.filter(function (a) {
        return An(a) && ac(a, r) && sn(a) !== 'body';
      })
    : [];
}
function Ah(e, t, o, r) {
  var a = t === 'clippingParents' ? Mh(e) : [].concat(t),
    i = [].concat(a, [o]),
    s = i[0],
    l = i.reduce(function (c, u) {
      var d = Es(e, u, r);
      return (
        (c.top = In(d.top, c.top)),
        (c.right = ur(d.right, c.right)),
        (c.bottom = ur(d.bottom, c.bottom)),
        (c.left = In(d.left, c.left)),
        c
      );
    }, Es(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function uc(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    a = r ? Yt(r) : null,
    i = r ? no(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (a) {
    case wt:
      c = {
        x: s,
        y: t.y - o.height,
      };
      break;
    case jt:
      c = {
        x: s,
        y: t.y + t.height,
      };
      break;
    case Vt:
      c = {
        x: t.x + t.width,
        y: l,
      };
      break;
    case kt:
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
  var u = a ? Za(a) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (i) {
      case Qn:
        c[u] = c[u] - (t[d] / 2 - o[d] / 2);
        break;
      case Po:
        c[u] = c[u] + (t[d] / 2 - o[d] / 2);
        break;
    }
  }
  return c;
}
function Io(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    a = r === void 0 ? e.placement : r,
    i = o.strategy,
    s = i === void 0 ? e.strategy : i,
    l = o.boundary,
    c = l === void 0 ? nh : l,
    u = o.rootBoundary,
    d = u === void 0 ? nc : u,
    p = o.elementContext,
    b = p === void 0 ? ho : p,
    y = o.altBoundary,
    v = y === void 0 ? !1 : y,
    h = o.padding,
    m = h === void 0 ? 0 : h,
    S = sc(typeof m != 'number' ? m : lc(m, Fo)),
    T = b === ho ? oh : ho,
    C = e.rects.popper,
    E = e.elements[v ? T : b],
    f = Ah(An(E) ? E : E.contextElement || Tn(e.elements.popper), c, d, s),
    w = to(e.elements.reference),
    k = uc({
      reference: w,
      element: C,
      strategy: 'absolute',
      placement: a,
    }),
    V = ya(Object.assign({}, C, k)),
    L = b === ho ? V : w,
    D = {
      top: f.top - L.top + S.top,
      bottom: L.bottom - f.bottom + S.bottom,
      left: f.left - L.left + S.left,
      right: L.right - f.right + S.right,
    },
    _ = e.modifiersData.offset;
  if (b === ho && _) {
    var Y = _[a];
    Object.keys(D).forEach(function (B) {
      var M = [Vt, jt].indexOf(B) >= 0 ? 1 : -1,
        F = [wt, jt].indexOf(B) >= 0 ? 'y' : 'x';
      D[B] += Y[F] * M;
    });
  }
  return D;
}
function Dh(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    a = o.boundary,
    i = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    u = c === void 0 ? oc : c,
    d = no(r),
    p = d
      ? l
        ? gs
        : gs.filter(function (v) {
            return no(v) === d;
          })
      : Fo,
    b = p.filter(function (v) {
      return u.indexOf(v) >= 0;
    });
  b.length === 0 &&
    ((b = p),
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
  var y = b.reduce(function (v, h) {
    return (
      (v[h] = Io(e, {
        placement: h,
        boundary: a,
        rootBoundary: i,
        padding: s,
      })[Yt(h)]),
      v
    );
  }, {});
  return Object.keys(y).sort(function (v, h) {
    return y[v] - y[h];
  });
}
function Lh(e) {
  if (Yt(e) === Ar) return [];
  var t = nr(e);
  return [xs(e), t, xs(t)];
}
function Fh(e) {
  var t = e.state,
    o = e.options,
    r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var a = o.mainAxis,
        i = a === void 0 ? !0 : a,
        s = o.altAxis,
        l = s === void 0 ? !0 : s,
        c = o.fallbackPlacements,
        u = o.padding,
        d = o.boundary,
        p = o.rootBoundary,
        b = o.altBoundary,
        y = o.flipVariations,
        v = y === void 0 ? !0 : y,
        h = o.allowedAutoPlacements,
        m = t.options.placement,
        S = Yt(m),
        T = S === m,
        C = c || (T || !v ? [nr(m)] : Lh(m)),
        E = [m].concat(C).reduce(function (U, ne) {
          return U.concat(
            Yt(ne) === Ar
              ? Dh(t, {
                  placement: ne,
                  boundary: d,
                  rootBoundary: p,
                  padding: u,
                  flipVariations: v,
                  allowedAutoPlacements: h,
                })
              : ne,
          );
        }, []),
        f = t.rects.reference,
        w = t.rects.popper,
        k = /* @__PURE__ */ new Map(),
        V = !0,
        L = E[0],
        D = 0;
      D < E.length;
      D++
    ) {
      var _ = E[D],
        Y = Yt(_),
        B = no(_) === Qn,
        M = [wt, jt].indexOf(Y) >= 0,
        F = M ? 'width' : 'height',
        z = Io(t, {
          placement: _,
          boundary: d,
          rootBoundary: p,
          altBoundary: b,
          padding: u,
        }),
        ie = M ? (B ? Vt : kt) : B ? jt : wt;
      f[F] > w[F] && (ie = nr(ie));
      var se = nr(ie),
        G = [];
      if (
        (i && G.push(z[Y] <= 0),
        l && G.push(z[ie] <= 0, z[se] <= 0),
        G.every(function (U) {
          return U;
        }))
      ) {
        (L = _), (V = !1);
        break;
      }
      k.set(_, G);
    }
    if (V)
      for (
        var R = v ? 3 : 1,
          j = function (ne) {
            var oe = E.find(function (J) {
              var ae = k.get(J);
              if (ae)
                return ae.slice(0, ne).every(function (le) {
                  return le;
                });
            });
            if (oe) return (L = oe), 'break';
          },
          X = R;
        X > 0;
        X--
      ) {
        var H = j(X);
        if (H === 'break') break;
      }
    t.placement !== L && ((t.modifiersData[r]._skip = !0), (t.placement = L), (t.reset = !0));
  }
}
const jh = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Fh,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function Cs(e, t, o) {
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
function Os(e) {
  return [wt, Vt, jt, kt].some(function (t) {
    return e[t] >= 0;
  });
}
function Vh(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    a = t.rects.popper,
    i = t.modifiersData.preventOverflow,
    s = Io(t, {
      elementContext: 'reference',
    }),
    l = Io(t, {
      altBoundary: !0,
    }),
    c = Cs(s, r),
    u = Cs(l, a, i),
    d = Os(c),
    p = Os(u);
  (t.modifiersData[o] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: p,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-reference-hidden': d,
      'data-popper-escaped': p,
    }));
}
const zh = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: Vh,
};
function Bh(e, t, o) {
  var r = Yt(e),
    a = [kt, wt].indexOf(r) >= 0 ? -1 : 1,
    i =
      typeof o == 'function'
        ? o(
            Object.assign({}, t, {
              placement: e,
            }),
          )
        : o,
    s = i[0],
    l = i[1];
  return (
    (s = s || 0),
    (l = (l || 0) * a),
    [kt, Vt].indexOf(r) >= 0
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
function Uh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    a = o.offset,
    i = a === void 0 ? [0, 0] : a,
    s = oc.reduce(function (d, p) {
      return (d[p] = Bh(p, t.rects, i)), d;
    }, {}),
    l = s[t.placement],
    c = l.x,
    u = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = s);
}
const Wh = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: Uh,
};
function Hh(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = uc({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const qh = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: Hh,
  data: {},
};
function Yh(e) {
  return e === 'x' ? 'y' : 'x';
}
function Kh(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    a = o.mainAxis,
    i = a === void 0 ? !0 : a,
    s = o.altAxis,
    l = s === void 0 ? !1 : s,
    c = o.boundary,
    u = o.rootBoundary,
    d = o.altBoundary,
    p = o.padding,
    b = o.tether,
    y = b === void 0 ? !0 : b,
    v = o.tetherOffset,
    h = v === void 0 ? 0 : v,
    m = Io(t, {
      boundary: c,
      rootBoundary: u,
      padding: p,
      altBoundary: d,
    }),
    S = Yt(t.placement),
    T = no(t.placement),
    C = !T,
    E = Za(S),
    f = Yh(E),
    w = t.modifiersData.popperOffsets,
    k = t.rects.reference,
    V = t.rects.popper,
    L =
      typeof h == 'function'
        ? h(
            Object.assign({}, t.rects, {
              placement: t.placement,
            }),
          )
        : h,
    D =
      typeof L == 'number'
        ? {
            mainAxis: L,
            altAxis: L,
          }
        : Object.assign(
            {
              mainAxis: 0,
              altAxis: 0,
            },
            L,
          ),
    _ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    Y = {
      x: 0,
      y: 0,
    };
  if (w) {
    if (i) {
      var B,
        M = E === 'y' ? wt : kt,
        F = E === 'y' ? jt : Vt,
        z = E === 'y' ? 'height' : 'width',
        ie = w[E],
        se = ie + m[M],
        G = ie - m[F],
        R = y ? -V[z] / 2 : 0,
        j = T === Qn ? k[z] : V[z],
        X = T === Qn ? -V[z] : -k[z],
        H = t.elements.arrow,
        U =
          y && H
            ? Ja(H)
            : {
                width: 0,
                height: 0,
              },
        ne = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : ic(),
        oe = ne[M],
        J = ne[F],
        ae = Oo(0, k[z], U[z]),
        le = C ? k[z] / 2 - R - ae - oe - D.mainAxis : j - ae - oe - D.mainAxis,
        he = C ? -k[z] / 2 + R + ae + J + D.mainAxis : X + ae + J + D.mainAxis,
        re = t.elements.arrow && jo(t.elements.arrow),
        P = re ? (E === 'y' ? re.clientTop || 0 : re.clientLeft || 0) : 0,
        Oe = (B = _ == null ? void 0 : _[E]) != null ? B : 0,
        I = ie + le - Oe - P,
        W = ie + he - Oe,
        Ne = Oo(y ? ur(se, I) : se, ie, y ? In(G, W) : G);
      (w[E] = Ne), (Y[E] = Ne - ie);
    }
    if (l) {
      var ge,
        et = E === 'x' ? wt : kt,
        je = E === 'x' ? jt : Vt,
        Se = w[f],
        ke = f === 'y' ? 'height' : 'width',
        tt = Se + m[et],
        at = Se - m[je],
        Z = [wt, kt].indexOf(S) !== -1,
        me = (ge = _ == null ? void 0 : _[f]) != null ? ge : 0,
        ve = Z ? tt : Se - k[ke] - V[ke] - me + D.altAxis,
        be = Z ? Se + k[ke] + V[ke] - me - D.altAxis : at,
        fe = y && Z ? vh(ve, Se, be) : Oo(y ? ve : tt, Se, y ? be : at);
      (w[f] = fe), (Y[f] = fe - Se);
    }
    t.modifiersData[r] = Y;
  }
}
const Gh = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: Kh,
  requiresIfExists: ['offset'],
};
function Xh(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function Jh(e) {
  return e === zt(e) || !Mt(e) ? Qa(e) : Xh(e);
}
function Zh(e) {
  var t = e.getBoundingClientRect(),
    o = eo(t.width) / e.offsetWidth || 1,
    r = eo(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function Qh(e, t, o) {
  o === void 0 && (o = !1);
  var r = Mt(t),
    a = Mt(t) && Zh(t),
    i = Tn(t),
    s = to(e, a, o),
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
      ((sn(t) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        ti(i)) &&
        (l = Jh(t)),
      Mt(t) ? ((c = to(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : i && (c.x = ei(i))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function eb(e) {
  var t = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Set(),
    r = [];
  e.forEach(function (i) {
    t.set(i.name, i);
  });
  function a(i) {
    o.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function (l) {
      if (!o.has(l)) {
        var c = t.get(l);
        c && a(c);
      }
    }),
      r.push(i);
  }
  return (
    e.forEach(function (i) {
      o.has(i.name) || a(i);
    }),
    r
  );
}
function tb(e) {
  var t = eb(e);
  return ga.reduce(function (o, r) {
    return o.concat(
      t.filter(function (a) {
        return a.phase === r;
      }),
    );
  }, []);
}
function nb(e) {
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
function gn(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  return [].concat(o).reduce(function (a, i) {
    return a.replace(/%s/, i);
  }, e);
}
var wn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  ob = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  Ts = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function rb(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), Ts)
      .filter(function (o, r, a) {
        return a.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                gn(wn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                gn(wn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            ga.indexOf(t.phase) < 0 &&
              console.error(
                gn(wn, t.name, '"phase"', 'either ' + ga.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(gn(wn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(gn(wn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                gn(wn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                gn(
                  wn,
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
                Ts.map(function (r) {
                  return '"' + r + '"';
                }).join(', ') +
                '; but "' +
                o +
                '" was provided.',
            );
        }
        t.requires &&
          t.requires.forEach(function (r) {
            e.find(function (a) {
              return a.name === r;
            }) == null && console.error(gn(ob, String(t.name), r, r));
          });
      });
  });
}
function ab(e, t) {
  var o = /* @__PURE__ */ new Set();
  return e.filter(function (r) {
    var a = t(r);
    if (!o.has(a)) return o.add(a), !0;
  });
}
function ib(e) {
  var t = e.reduce(function (o, r) {
    var a = o[r.name];
    return (
      (o[r.name] = a
        ? Object.assign({}, a, r, {
            options: Object.assign({}, a.options, r.options),
            data: Object.assign({}, a.data, r.data),
          })
        : r),
      o
    );
  }, {});
  return Object.keys(t).map(function (o) {
    return t[o];
  });
}
var Ss =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  sb =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  ws = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
  };
function ks() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function lb(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    a = t.defaultOptions,
    i = a === void 0 ? ws : a;
  return function (l, c, u) {
    u === void 0 && (u = i);
    var d = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, ws, i),
        modifiersData: {},
        elements: {
          reference: l,
          popper: c,
        },
        attributes: {},
        styles: {},
      },
      p = [],
      b = !1,
      y = {
        state: d,
        setOptions: function (S) {
          var T = typeof S == 'function' ? S(d.options) : S;
          h(),
            (d.options = Object.assign({}, i, d.options, T)),
            (d.scrollParents = {
              reference: An(l) ? To(l) : l.contextElement ? To(l.contextElement) : [],
              popper: To(c),
            });
          var C = tb(ib([].concat(r, d.options.modifiers)));
          if (
            ((d.orderedModifiers = C.filter(function (_) {
              return _.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var E = ab([].concat(C, d.options.modifiers), function (_) {
              var Y = _.name;
              return Y;
            });
            if ((rb(E), Yt(d.options.placement) === Ar)) {
              var f = d.orderedModifiers.find(function (_) {
                var Y = _.name;
                return Y === 'flip';
              });
              f ||
                console.error(
                  [
                    'Popper: "auto" placements require the "flip" modifier be',
                    'present and enabled to work.',
                  ].join(' '),
                );
            }
            var w = Gt(c),
              k = w.marginTop,
              V = w.marginRight,
              L = w.marginBottom,
              D = w.marginLeft;
            [k, V, L, D].some(function (_) {
              return parseFloat(_);
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
          return v(), y.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function () {
          if (!b) {
            var S = d.elements,
              T = S.reference,
              C = S.popper;
            if (!ks(T, C)) {
              process.env.NODE_ENV !== 'production' && console.error(Ss);
              return;
            }
            (d.rects = {
              reference: Qh(T, jo(C), d.options.strategy === 'fixed'),
              popper: Ja(C),
            }),
              (d.reset = !1),
              (d.placement = d.options.placement),
              d.orderedModifiers.forEach(function (_) {
                return (d.modifiersData[_.name] = Object.assign({}, _.data));
              });
            for (var E = 0, f = 0; f < d.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((E += 1), E > 100)) {
                console.error(sb);
                break;
              }
              if (d.reset === !0) {
                (d.reset = !1), (f = -1);
                continue;
              }
              var w = d.orderedModifiers[f],
                k = w.fn,
                V = w.options,
                L = V === void 0 ? {} : V,
                D = w.name;
              typeof k == 'function' &&
                (d =
                  k({
                    state: d,
                    options: L,
                    name: D,
                    instance: y,
                  }) || d);
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: nb(function () {
          return new Promise(function (m) {
            y.forceUpdate(), m(d);
          });
        }),
        destroy: function () {
          h(), (b = !0);
        },
      };
    if (!ks(l, c)) return process.env.NODE_ENV !== 'production' && console.error(Ss), y;
    y.setOptions(u).then(function (m) {
      !b && u.onFirstUpdate && u.onFirstUpdate(m);
    });
    function v() {
      d.orderedModifiers.forEach(function (m) {
        var S = m.name,
          T = m.options,
          C = T === void 0 ? {} : T,
          E = m.effect;
        if (typeof E == 'function') {
          var f = E({
              state: d,
              name: S,
              instance: y,
              options: C,
            }),
            w = function () {};
          p.push(f || w);
        }
      });
    }
    function h() {
      p.forEach(function (m) {
        return m();
      }),
        (p = []);
    }
    return y;
  };
}
var cb = [Rh, qh, wh, hh, Wh, jh, Gh, Ch, zh],
  ub = /* @__PURE__ */ lb({
    defaultModifiers: cb,
  });
function db(e) {
  return typeof e == 'function' ? e() : e;
}
const dr = /* @__PURE__ */ x.forwardRef(function (t, o) {
  const { children: r, container: a, disablePortal: i = !1 } = t,
    [s, l] = x.useState(null),
    c = dt(/* @__PURE__ */ x.isValidElement(r) ? r.ref : null, o);
  if (
    (rn(() => {
      i || l(db(a) || document.body);
    }, [a, i]),
    rn(() => {
      if (s && !i)
        return (
          rr(o, s),
          () => {
            rr(o, null);
          }
        );
    }, [o, s, i]),
    i)
  ) {
    if (/* @__PURE__ */ x.isValidElement(r)) {
      const u = {
        ref: c,
      };
      return /* @__PURE__ */ x.cloneElement(r, u);
    }
    return /* @__PURE__ */ A(x.Fragment, {
      children: r,
    });
  }
  return /* @__PURE__ */ A(x.Fragment, {
    children: s && /* @__PURE__ */ gl.createPortal(r, s),
  });
});
process.env.NODE_ENV !== 'production' &&
  (dr.propTypes = {
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
    container: n.oneOfType([on, n.func]),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (dr['propTypes'] = Pa(dr.propTypes));
const dc = dr;
function pb(e) {
  return Ae('MuiPopper', e);
}
Pe('MuiPopper', ['root']);
const fb = [
    'anchorEl',
    'children',
    'component',
    'direction',
    'disablePortal',
    'modifiers',
    'open',
    'ownerState',
    'placement',
    'popperOptions',
    'popperRef',
    'slotProps',
    'slots',
    'TransitionProps',
  ],
  mb = [
    'anchorEl',
    'children',
    'container',
    'direction',
    'disablePortal',
    'keepMounted',
    'modifiers',
    'open',
    'placement',
    'popperOptions',
    'popperRef',
    'style',
    'transition',
    'slotProps',
    'slots',
  ];
function hb(e, t) {
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
function pr(e) {
  return typeof e == 'function' ? e() : e;
}
function Lr(e) {
  return e.nodeType !== void 0;
}
function bb(e) {
  return !Lr(e);
}
const gb = () =>
    Fe(
      {
        root: ['root'],
      },
      ec(pb),
    ),
  vb = {},
  yb = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r;
    const {
        anchorEl: a,
        children: i,
        component: s,
        direction: l,
        disablePortal: c,
        modifiers: u,
        open: d,
        ownerState: p,
        placement: b,
        popperOptions: y,
        popperRef: v,
        slotProps: h = {},
        slots: m = {},
        TransitionProps: S,
      } = t,
      T = Ce(t, fb),
      C = x.useRef(null),
      E = dt(C, o),
      f = x.useRef(null),
      w = dt(f, v),
      k = x.useRef(w);
    rn(() => {
      k.current = w;
    }, [w]),
      x.useImperativeHandle(v, () => f.current, []);
    const V = hb(b, l),
      [L, D] = x.useState(V),
      [_, Y] = x.useState(pr(a));
    x.useEffect(() => {
      f.current && f.current.forceUpdate();
    }),
      x.useEffect(() => {
        a && Y(pr(a));
      }, [a]),
      rn(() => {
        if (!_ || !d) return;
        const ie = (R) => {
          D(R.placement);
        };
        if (process.env.NODE_ENV !== 'production' && _ && Lr(_) && _.nodeType === 1) {
          const R = _.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            R.top === 0 &&
            R.left === 0 &&
            R.right === 0 &&
            R.bottom === 0 &&
            console.warn(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join(`
`),
            );
        }
        let se = [
          {
            name: 'preventOverflow',
            options: {
              altBoundary: c,
            },
          },
          {
            name: 'flip',
            options: {
              altBoundary: c,
            },
          },
          {
            name: 'onUpdate',
            enabled: !0,
            phase: 'afterWrite',
            fn: ({ state: R }) => {
              ie(R);
            },
          },
        ];
        u != null && (se = se.concat(u)), y && y.modifiers != null && (se = se.concat(y.modifiers));
        const G = ub(
          _,
          C.current,
          g(
            {
              placement: V,
            },
            y,
            {
              modifiers: se,
            },
          ),
        );
        return (
          k.current(G),
          () => {
            G.destroy(), k.current(null);
          }
        );
      }, [_, c, u, d, y, V]);
    const B = {
      placement: L,
    };
    S !== null && (B.TransitionProps = S);
    const M = gb(),
      F = (r = s ?? m.root) != null ? r : 'div',
      z = Dt({
        elementType: F,
        externalSlotProps: h.root,
        externalForwardedProps: T,
        additionalProps: {
          role: 'tooltip',
          ref: E,
        },
        ownerState: g({}, t, p),
        className: M.root,
      });
    return /* @__PURE__ */ A(
      F,
      g({}, z, {
        children: typeof i == 'function' ? i(B) : i,
      }),
    );
  }),
  pc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const {
        anchorEl: r,
        children: a,
        container: i,
        direction: s = 'ltr',
        disablePortal: l = !1,
        keepMounted: c = !1,
        modifiers: u,
        open: d,
        placement: p = 'bottom',
        popperOptions: b = vb,
        popperRef: y,
        style: v,
        transition: h = !1,
        slotProps: m = {},
        slots: S = {},
      } = t,
      T = Ce(t, mb),
      [C, E] = x.useState(!0),
      f = () => {
        E(!1);
      },
      w = () => {
        E(!0);
      };
    if (!c && !d && (!h || C)) return null;
    let k;
    if (i) k = i;
    else if (r) {
      const D = pr(r);
      k = D && Lr(D) ? ct(D).body : ct(null).body;
    }
    const V = !d && c && (!h || C) ? 'none' : void 0,
      L = h
        ? {
            in: d,
            onEnter: f,
            onExited: w,
          }
        : void 0;
    return /* @__PURE__ */ A(dc, {
      disablePortal: l,
      container: k,
      children: /* @__PURE__ */ A(
        yb,
        g(
          {
            anchorEl: r,
            direction: s,
            disablePortal: l,
            modifiers: u,
            ref: o,
            open: h ? !C : d,
            placement: p,
            popperOptions: b,
            popperRef: y,
            slotProps: m,
            slots: S,
          },
          T,
          {
            style: g(
              {
                // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
                position: 'fixed',
                // Fix Popper.js display issue
                top: 0,
                left: 0,
                display: V,
              },
              v,
            ),
            TransitionProps: L,
            children: a,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (pc.propTypes = {
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
    anchorEl: Kt(n.oneOfType([on, n.object, n.func]), (e) => {
      if (e.open) {
        const t = pr(e.anchorEl);
        if (t && Lr(t) && t.nodeType === 1) {
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
          (bb(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([on, n.func]),
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
    popperRef: Nt,
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
     * @ignore
     */
    style: n.object,
    /**
     * Help supporting a react-transition-group/Transition component.
     * @default false
     */
    transition: n.bool,
  });
const xb = pc;
function Eb(e) {
  const t = ct(e);
  return t.body === e
    ? _n(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function So(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function Rs(e) {
  return parseInt(_n(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Cb(e) {
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
function Ns(e, t, o, r, a) {
  const i = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1,
      c = !Cb(s);
    l && c && So(s, a);
  });
}
function ea(e, t) {
  let o = -1;
  return e.some((r, a) => (t(r) ? ((o = a), !0) : !1)), o;
}
function Ob(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (Eb(r)) {
      const s = kl(ct(r));
      o.push({
        value: r.style.paddingRight,
        property: 'padding-right',
        el: r,
      }),
        (r.style.paddingRight = `${Rs(r) + s}px`);
      const l = ct(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({
          value: c.style.paddingRight,
          property: 'padding-right',
          el: c,
        }),
          (c.style.paddingRight = `${Rs(c) + s}px`);
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment) i = ct(r).body;
    else {
      const s = r.parentElement,
        l = _n(r);
      i =
        (s == null ? void 0 : s.nodeName) === 'HTML' && l.getComputedStyle(s).overflowY === 'scroll'
          ? s
          : r;
    }
    o.push(
      {
        value: i.style.overflow,
        property: 'overflow',
        el: i,
      },
      {
        value: i.style.overflowX,
        property: 'overflow-x',
        el: i,
      },
      {
        value: i.style.overflowY,
        property: 'overflow-y',
        el: i,
      },
    ),
      (i.style.overflow = 'hidden');
  }
  return () => {
    o.forEach(({ value: i, el: s, property: l }) => {
      i ? s.style.setProperty(l, i) : s.style.removeProperty(l);
    });
  };
}
function Tb(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class Sb {
  constructor() {
    (this.containers = void 0), (this.modals = void 0), (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && So(t.modalRef, !1);
    const a = Tb(o);
    Ns(o, t.mount, t.modalRef, a, !0);
    const i = ea(this.containers, (s) => s.container === o);
    return i !== -1
      ? (this.containers[i].modals.push(t), r)
      : (this.containers.push({
          modals: [t],
          container: o,
          restore: null,
          hiddenSiblings: a,
        }),
        r);
  }
  mount(t, o) {
    const r = ea(this.containers, (i) => i.modals.indexOf(t) !== -1),
      a = this.containers[r];
    a.restore || (a.restore = Ob(a, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const a = ea(this.containers, (s) => s.modals.indexOf(t) !== -1),
      i = this.containers[a];
    if ((i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0))
      i.restore && i.restore(),
        t.modalRef && So(t.modalRef, o),
        Ns(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1),
        this.containers.splice(a, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && So(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function wb(e) {
  return Ae('MuiModal', e);
}
Pe('MuiModal', ['root', 'hidden', 'backdrop']);
const kb = [
    'children',
    'closeAfterTransition',
    'component',
    'container',
    'disableAutoFocus',
    'disableEnforceFocus',
    'disableEscapeKeyDown',
    'disablePortal',
    'disableRestoreFocus',
    'disableScrollLock',
    'hideBackdrop',
    'keepMounted',
    'manager',
    'onBackdropClick',
    'onClose',
    'onKeyDown',
    'open',
    'onTransitionEnter',
    'onTransitionExited',
    'slotProps',
    'slots',
  ],
  Rb = (e) => {
    const { open: t, exited: o } = e;
    return Fe(
      {
        root: ['root', !t && o && 'hidden'],
        backdrop: ['backdrop'],
      },
      ec(wb),
    );
  };
function Nb(e) {
  return typeof e == 'function' ? e() : e;
}
function $b(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const Pb = new Sb(),
  fc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a;
    const {
        children: i,
        closeAfterTransition: s = !1,
        component: l,
        container: c,
        disableAutoFocus: u = !1,
        disableEnforceFocus: d = !1,
        disableEscapeKeyDown: p = !1,
        disablePortal: b = !1,
        disableRestoreFocus: y = !1,
        disableScrollLock: v = !1,
        hideBackdrop: h = !1,
        keepMounted: m = !1,
        // private
        manager: S = Pb,
        onBackdropClick: T,
        onClose: C,
        onKeyDown: E,
        open: f,
        onTransitionEnter: w,
        onTransitionExited: k,
        slotProps: V = {},
        slots: L = {},
      } = t,
      D = Ce(t, kb),
      [_, Y] = x.useState(!f),
      B = x.useRef({}),
      M = x.useRef(null),
      F = x.useRef(null),
      z = dt(F, o),
      ie = $b(i),
      se = (r = t['aria-hidden']) != null ? r : !0,
      G = () => ct(M.current),
      R = () => ((B.current.modalRef = F.current), (B.current.mountNode = M.current), B.current),
      j = () => {
        S.mount(R(), {
          disableScrollLock: v,
        }),
          F.current && (F.current.scrollTop = 0);
      },
      X = Ct(() => {
        const ge = Nb(c) || G().body;
        S.add(R(), ge), F.current && j();
      }),
      H = x.useCallback(() => S.isTopModal(R()), [S]),
      U = Ct((ge) => {
        (M.current = ge), !(!ge || !F.current) && (f && H() ? j() : So(F.current, se));
      }),
      ne = x.useCallback(() => {
        S.remove(R(), se);
      }, [S, se]);
    x.useEffect(
      () => () => {
        ne();
      },
      [ne],
    ),
      x.useEffect(() => {
        f ? X() : (!ie || !s) && ne();
      }, [f, ne, ie, s, X]);
    const oe = g({}, t, {
        closeAfterTransition: s,
        disableAutoFocus: u,
        disableEnforceFocus: d,
        disableEscapeKeyDown: p,
        disablePortal: b,
        disableRestoreFocus: y,
        disableScrollLock: v,
        exited: _,
        hideBackdrop: h,
        keepMounted: m,
      }),
      J = Rb(oe),
      ae = () => {
        Y(!1), w && w();
      },
      le = () => {
        Y(!0), k && k(), s && ne();
      },
      he = (ge) => {
        ge.target === ge.currentTarget && (T && T(ge), C && C(ge, 'backdropClick'));
      },
      re = (ge) => {
        E && E(ge),
          !(ge.key !== 'Escape' || !H()) &&
            (p || (ge.stopPropagation(), C && C(ge, 'escapeKeyDown')));
      },
      P = {};
    i.props.tabIndex === void 0 && (P.tabIndex = '-1'),
      ie && ((P.onEnter = Mi(ae, i.props.onEnter)), (P.onExited = Mi(le, i.props.onExited)));
    const Oe = (a = l ?? L.root) != null ? a : 'div',
      I = Dt({
        elementType: Oe,
        externalSlotProps: V.root,
        externalForwardedProps: D,
        additionalProps: {
          ref: z,
          role: 'presentation',
          onKeyDown: re,
        },
        className: J.root,
        ownerState: oe,
      }),
      W = L.backdrop,
      Ne = Dt({
        elementType: W,
        externalSlotProps: V.backdrop,
        additionalProps: {
          'aria-hidden': !0,
          onClick: he,
          open: f,
        },
        className: J.backdrop,
        ownerState: oe,
      });
    return !m && !f && (!ie || _)
      ? null
      : /* @__PURE__ */ A(dc, {
          ref: U,
          container: c,
          disablePortal: b,
          children: /* @__PURE__ */ Qe(
            Oe,
            g({}, I, {
              children: [
                !h && W ? /* @__PURE__ */ A(W, g({}, Ne)) : null,
                /* @__PURE__ */ A(cr, {
                  disableEnforceFocus: d,
                  disableAutoFocus: u,
                  disableRestoreFocus: y,
                  isEnabled: H,
                  open: f,
                  children: /* @__PURE__ */ x.cloneElement(i, P),
                }),
              ],
            }),
          ),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (fc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: ro.isRequired,
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
     * An HTML element or function that returns one.
     * The `container` will have the portal children appended to it.
     *
     * By default, it uses the body of the top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: n.oneOfType([on, n.func]),
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
     * @ignore
     */
    onKeyDown: n.func,
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
const Ib = fc,
  _b = 2;
function mc(e, t) {
  return e - t;
}
function bo(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function $s(e, t) {
  var o;
  const { index: r } =
    (o = e.reduce((a, i, s) => {
      const l = Math.abs(t - i);
      return a === null || l < a.distance || l === a.distance
        ? {
            distance: l,
            index: s,
          }
        : a;
    }, null)) != null
      ? o
      : {};
  return r;
}
function Ho(e, t) {
  if (t.current !== void 0 && e.changedTouches) {
    const o = e;
    for (let r = 0; r < o.changedTouches.length; r += 1) {
      const a = o.changedTouches[r];
      if (a.identifier === t.current)
        return {
          x: a.clientX,
          y: a.clientY,
        };
    }
    return !1;
  }
  return {
    x: e.clientX,
    y: e.clientY,
  };
}
function fr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function Mb(e, t, o) {
  return (o - t) * e + t;
}
function Ab(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function Db(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(Ab(t)));
}
function Ps({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(mc);
}
function qo({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, a;
  const i = ct(e.current);
  if (
    !((r = e.current) != null && r.contains(i.activeElement)) ||
    Number(i == null || (a = i.activeElement) == null ? void 0 : a.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
const Lb = {
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
  Fb = (e) => e;
let Yo;
function ta() {
  return (
    Yo === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Yo = CSS.supports('touch-action', 'none'))
        : (Yo = !0)),
    Yo
  );
}
function jb(e) {
  const {
      'aria-labelledby': t,
      defaultValue: o,
      disabled: r = !1,
      disableSwap: a = !1,
      isRtl: i = !1,
      marks: s = !1,
      max: l = 100,
      min: c = 0,
      name: u,
      onChange: d,
      onChangeCommitted: p,
      orientation: b = 'horizontal',
      ref: y,
      scale: v = Fb,
      step: h = 1,
      tabIndex: m,
      value: S,
    } = e,
    T = x.useRef(),
    [C, E] = x.useState(-1),
    [f, w] = x.useState(-1),
    [k, V] = x.useState(!1),
    L = x.useRef(0),
    [D, _] = Pn({
      controlled: S,
      default: o ?? c,
      name: 'Slider',
    }),
    Y =
      d &&
      ((Z, me, ve) => {
        const be = Z.nativeEvent || Z,
          fe = new be.constructor(be.type, be);
        Object.defineProperty(fe, 'target', {
          writable: !0,
          value: {
            value: me,
            name: u,
          },
        }),
          d(fe, me, ve);
      }),
    B = Array.isArray(D);
  let M = B ? D.slice().sort(mc) : [D];
  M = M.map((Z) => bo(Z, c, l));
  const F =
      s === !0 && h !== null
        ? [...Array(Math.floor((l - c) / h) + 1)].map((Z, me) => ({
            value: c + h * me,
          }))
        : s || [],
    z = F.map((Z) => Z.value),
    { isFocusVisibleRef: ie, onBlur: se, onFocus: G, ref: R } = wl(),
    [j, X] = x.useState(-1),
    H = x.useRef(),
    U = dt(R, H),
    ne = dt(y, U),
    oe = (Z) => (me) => {
      var ve;
      const be = Number(me.currentTarget.getAttribute('data-index'));
      G(me),
        ie.current === !0 && X(be),
        w(be),
        Z == null || (ve = Z.onFocus) == null || ve.call(Z, me);
    },
    J = (Z) => (me) => {
      var ve;
      se(me),
        ie.current === !1 && X(-1),
        w(-1),
        Z == null || (ve = Z.onBlur) == null || ve.call(Z, me);
    };
  rn(() => {
    if (r && H.current.contains(document.activeElement)) {
      var Z;
      (Z = document.activeElement) == null || Z.blur();
    }
  }, [r]),
    r && C !== -1 && E(-1),
    r && j !== -1 && X(-1);
  const ae = (Z) => (me) => {
      var ve;
      (ve = Z.onChange) == null || ve.call(Z, me);
      const be = Number(me.currentTarget.getAttribute('data-index')),
        fe = M[be],
        ue = z.indexOf(fe);
      let ee = me.target.valueAsNumber;
      if (
        (F && h == null && (ee = ee < fe ? z[ue - 1] : z[ue + 1]),
        (ee = bo(ee, c, l)),
        F && h == null)
      ) {
        const ye = z.indexOf(M[be]);
        ee = ee < M[be] ? z[ye - 1] : z[ye + 1];
      }
      if (B) {
        a && (ee = bo(ee, M[be - 1] || -1 / 0, M[be + 1] || 1 / 0));
        const ye = ee;
        ee = Ps({
          values: M,
          newValue: ee,
          index: be,
        });
        let xe = be;
        a || (xe = ee.indexOf(ye)),
          qo({
            sliderRef: H,
            activeIndex: xe,
          });
      }
      _(ee), X(be), Y && Y(me, ee, be), p && p(me, ee);
    },
    le = x.useRef();
  let he = b;
  i && b === 'horizontal' && (he += '-reverse');
  const re = ({ finger: Z, move: me = !1 }) => {
      const { current: ve } = H,
        { width: be, height: fe, bottom: ue, left: ee } = ve.getBoundingClientRect();
      let ye;
      he.indexOf('vertical') === 0 ? (ye = (ue - Z.y) / fe) : (ye = (Z.x - ee) / be),
        he.indexOf('-reverse') !== -1 && (ye = 1 - ye);
      let xe;
      if (((xe = Mb(ye, c, l)), h)) xe = Db(xe, h, c);
      else {
        const it = $s(z, xe);
        xe = z[it];
      }
      xe = bo(xe, c, l);
      let Ie = 0;
      if (B) {
        me ? (Ie = le.current) : (Ie = $s(M, xe)),
          a && (xe = bo(xe, M[Ie - 1] || -1 / 0, M[Ie + 1] || 1 / 0));
        const it = xe;
        (xe = Ps({
          values: M,
          newValue: xe,
          index: Ie,
        })),
          (a && me) || ((Ie = xe.indexOf(it)), (le.current = Ie));
      }
      return {
        newValue: xe,
        activeIndex: Ie,
      };
    },
    P = Ct((Z) => {
      const me = Ho(Z, T);
      if (!me) return;
      if (((L.current += 1), Z.type === 'mousemove' && Z.buttons === 0)) {
        Oe(Z);
        return;
      }
      const { newValue: ve, activeIndex: be } = re({
        finger: me,
        move: !0,
      });
      qo({
        sliderRef: H,
        activeIndex: be,
        setActive: E,
      }),
        _(ve),
        !k && L.current > _b && V(!0),
        Y && ve !== D && Y(Z, ve, be);
    }),
    Oe = Ct((Z) => {
      const me = Ho(Z, T);
      if ((V(!1), !me)) return;
      const { newValue: ve } = re({
        finger: me,
        move: !0,
      });
      E(-1), Z.type === 'touchend' && w(-1), p && p(Z, ve), (T.current = void 0), W();
    }),
    I = Ct((Z) => {
      if (r) return;
      ta() || Z.preventDefault();
      const me = Z.changedTouches[0];
      me != null && (T.current = me.identifier);
      const ve = Ho(Z, T);
      if (ve !== !1) {
        const { newValue: fe, activeIndex: ue } = re({
          finger: ve,
        });
        qo({
          sliderRef: H,
          activeIndex: ue,
          setActive: E,
        }),
          _(fe),
          Y && Y(Z, fe, ue);
      }
      L.current = 0;
      const be = ct(H.current);
      be.addEventListener('touchmove', P), be.addEventListener('touchend', Oe);
    }),
    W = x.useCallback(() => {
      const Z = ct(H.current);
      Z.removeEventListener('mousemove', P),
        Z.removeEventListener('mouseup', Oe),
        Z.removeEventListener('touchmove', P),
        Z.removeEventListener('touchend', Oe);
    }, [Oe, P]);
  x.useEffect(() => {
    const { current: Z } = H;
    return (
      Z.addEventListener('touchstart', I, {
        passive: ta(),
      }),
      () => {
        Z.removeEventListener('touchstart', I, {
          passive: ta(),
        }),
          W();
      }
    );
  }, [W, I]),
    x.useEffect(() => {
      r && W();
    }, [r, W]);
  const Ne = (Z) => (me) => {
      var ve;
      if (
        ((ve = Z.onMouseDown) == null || ve.call(Z, me),
        r || me.defaultPrevented || me.button !== 0)
      )
        return;
      me.preventDefault();
      const be = Ho(me, T);
      if (be !== !1) {
        const { newValue: ue, activeIndex: ee } = re({
          finger: be,
        });
        qo({
          sliderRef: H,
          activeIndex: ee,
          setActive: E,
        }),
          _(ue),
          Y && Y(me, ue, ee);
      }
      L.current = 0;
      const fe = ct(H.current);
      fe.addEventListener('mousemove', P), fe.addEventListener('mouseup', Oe);
    },
    ge = fr(B ? M[0] : c, c, l),
    et = fr(M[M.length - 1], c, l) - ge,
    je = (Z = {}) => {
      const me = {
          onMouseDown: Ne(Z || {}),
        },
        ve = g({}, Z, me);
      return g(
        {
          ref: ne,
        },
        ve,
      );
    },
    Se = (Z) => (me) => {
      var ve;
      (ve = Z.onMouseOver) == null || ve.call(Z, me);
      const be = Number(me.currentTarget.getAttribute('data-index'));
      w(be);
    },
    ke = (Z) => (me) => {
      var ve;
      (ve = Z.onMouseLeave) == null || ve.call(Z, me), w(-1);
    };
  return {
    active: C,
    axis: he,
    axisProps: Lb,
    dragging: k,
    focusedThumbIndex: j,
    getHiddenInputProps: (Z = {}) => {
      var me;
      const ve = {
          onChange: ae(Z || {}),
          onFocus: oe(Z || {}),
          onBlur: J(Z || {}),
        },
        be = g({}, Z, ve);
      return g(
        {
          tabIndex: m,
          'aria-labelledby': t,
          'aria-orientation': b,
          'aria-valuemax': v(l),
          'aria-valuemin': v(c),
          name: u,
          type: 'range',
          min: e.min,
          max: e.max,
          step: (me = e.step) != null ? me : void 0,
          disabled: r,
        },
        be,
        {
          style: g({}, kd, {
            direction: i ? 'rtl' : 'ltr',
            // So that VoiceOver's focus indicator matches the thumb's dimensions
            width: '100%',
            height: '100%',
          }),
        },
      );
    },
    getRootProps: je,
    getThumbProps: (Z = {}) => {
      const me = {
        onMouseOver: Se(Z || {}),
        onMouseLeave: ke(Z || {}),
      };
      return g({}, Z, me);
    },
    marks: F,
    open: f,
    range: B,
    trackLeap: et,
    trackOffset: ge,
    values: M,
  };
}
function Vb(e) {
  const {
      autoHideDuration: t = null,
      disableWindowBlurListener: o = !1,
      onClose: r,
      open: a,
      ref: i,
      resumeHideDuration: s,
    } = e,
    l = x.useRef();
  x.useEffect(() => {
    if (!a) return;
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
  }, [a, r]);
  const c = Ct((T, C) => {
      r == null || r(T, C);
    }),
    u = Ct((T) => {
      !r ||
        T == null ||
        (clearTimeout(l.current),
        (l.current = setTimeout(() => {
          c(null, 'timeout');
        }, T)));
    });
  x.useEffect(
    () => (
      a && u(t),
      () => {
        clearTimeout(l.current);
      }
    ),
    [a, t, u],
  );
  const d = (T) => {
      r == null || r(T, 'clickaway');
    },
    p = () => {
      clearTimeout(l.current);
    },
    b = x.useCallback(() => {
      t != null && u(s ?? t * 0.5);
    }, [t, s, u]),
    y = (T) => (C) => {
      const E = T.onBlur;
      E == null || E(C), b();
    },
    v = (T) => (C) => {
      const E = T.onFocus;
      E == null || E(C), p();
    },
    h = (T) => (C) => {
      const E = T.onMouseEnter;
      E == null || E(C), p();
    },
    m = (T) => (C) => {
      const E = T.onMouseLeave;
      E == null || E(C), b();
    };
  return (
    x.useEffect(() => {
      if (!o && a)
        return (
          window.addEventListener('focus', b),
          window.addEventListener('blur', p),
          () => {
            window.removeEventListener('focus', b), window.removeEventListener('blur', p);
          }
        );
    }, [o, b, a]),
    {
      getRootProps: (T = {}) => {
        const C = tc(e),
          E = g({}, C, T);
        return g(
          {
            ref: i,
            // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
            // See https://github.com/mui/material-ui/issues/29080
            role: 'presentation',
          },
          E,
          {
            onBlur: y(E),
            onFocus: v(E),
            onMouseEnter: h(E),
            onMouseLeave: m(E),
          },
        );
      },
      onClickAway: d,
    }
  );
}
const zb = ['onChange', 'maxRows', 'minRows', 'style', 'value'];
function Ko(e) {
  return parseInt(e, 10) || 0;
}
const Bb = {
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
function Is(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const hc = /* @__PURE__ */ x.forwardRef(function (t, o) {
  const { onChange: r, maxRows: a, minRows: i = 1, style: s, value: l } = t,
    c = Ce(t, zb),
    { current: u } = x.useRef(l != null),
    d = x.useRef(null),
    p = dt(o, d),
    b = x.useRef(null),
    y = x.useRef(0),
    [v, h] = x.useState({
      outerHeightStyle: 0,
    }),
    m = x.useCallback(() => {
      const f = d.current,
        k = _n(f).getComputedStyle(f);
      if (k.width === '0px')
        return {
          outerHeightStyle: 0,
        };
      const V = b.current;
      (V.style.width = k.width),
        (V.value = f.value || t.placeholder || 'x'),
        V.value.slice(-1) ===
          `
` && (V.value += ' ');
      const L = k.boxSizing,
        D = Ko(k.paddingBottom) + Ko(k.paddingTop),
        _ = Ko(k.borderBottomWidth) + Ko(k.borderTopWidth),
        Y = V.scrollHeight;
      V.value = 'x';
      const B = V.scrollHeight;
      let M = Y;
      i && (M = Math.max(Number(i) * B, M)),
        a && (M = Math.min(Number(a) * B, M)),
        (M = Math.max(M, B));
      const F = M + (L === 'border-box' ? D + _ : 0),
        z = Math.abs(M - Y) <= 1;
      return {
        outerHeightStyle: F,
        overflow: z,
      };
    }, [a, i, t.placeholder]),
    S = (f, w) => {
      const { outerHeightStyle: k, overflow: V } = w;
      return y.current < 20 &&
        ((k > 0 && Math.abs((f.outerHeightStyle || 0) - k) > 1) || f.overflow !== V)
        ? ((y.current += 1),
          {
            overflow: V,
            outerHeightStyle: k,
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
    T = x.useCallback(() => {
      const f = m();
      Is(f) || h((w) => S(w, f));
    }, [m]),
    C = () => {
      const f = m();
      Is(f) ||
        gl.flushSync(() => {
          h((w) => S(w, f));
        });
    };
  x.useEffect(() => {
    const f = Tl(() => {
      (y.current = 0), d.current && C();
    });
    let w;
    const k = d.current,
      V = _n(k);
    return (
      V.addEventListener('resize', f),
      typeof ResizeObserver < 'u' && ((w = new ResizeObserver(f)), w.observe(k)),
      () => {
        f.clear(), V.removeEventListener('resize', f), w && w.disconnect();
      }
    );
  }),
    rn(() => {
      T();
    }),
    x.useEffect(() => {
      y.current = 0;
    }, [l]);
  const E = (f) => {
    (y.current = 0), u || T(), r && r(f);
  };
  return /* @__PURE__ */ Qe(x.Fragment, {
    children: [
      /* @__PURE__ */ A(
        'textarea',
        g(
          {
            value: l,
            onChange: E,
            ref: p,
            rows: i,
            style: g(
              {
                height: v.outerHeightStyle,
                // Need a large enough difference to allow scrolling.
                // This prevents infinite rendering loop.
                overflow: v.overflow ? 'hidden' : void 0,
              },
              s,
            ),
          },
          c,
        ),
      ),
      /* @__PURE__ */ A('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: b,
        tabIndex: -1,
        style: g({}, Bb.shadow, s, {
          padding: 0,
        }),
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (hc.propTypes = {
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
const Ub = hc;
function _s(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function Wb(e = {}) {
  const {
    ignoreAccents: t = !0,
    ignoreCase: o = !0,
    limit: r,
    matchFrom: a = 'any',
    stringify: i,
    trim: s = !1,
  } = e;
  return (l, { inputValue: c, getOptionLabel: u }) => {
    let d = s ? c.trim() : c;
    o && (d = d.toLowerCase()), t && (d = _s(d));
    const p = d
      ? l.filter((b) => {
          let y = (i || u)(b);
          return (
            o && (y = y.toLowerCase()),
            t && (y = _s(y)),
            a === 'start' ? y.indexOf(d) === 0 : y.indexOf(d) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function na(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const Hb = Wb(),
  Ms = 5,
  qb = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function Yb(e) {
  const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_isActiveElementInListbox: t = qb,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_classNamePrefix: o = 'Mui',
      autoComplete: r = !1,
      autoHighlight: a = !1,
      autoSelect: i = !1,
      blurOnSelect: s = !1,
      clearOnBlur: l = !e.freeSolo,
      clearOnEscape: c = !1,
      componentName: u = 'useAutocomplete',
      defaultValue: d = e.multiple ? [] : null,
      disableClearable: p = !1,
      disableCloseOnSelect: b = !1,
      disabled: y,
      disabledItemsFocusable: v = !1,
      disableListWrap: h = !1,
      filterOptions: m = Hb,
      filterSelectedOptions: S = !1,
      freeSolo: T = !1,
      getOptionDisabled: C,
      getOptionLabel: E = (N) => {
        var $;
        return ($ = N.label) != null ? $ : N;
      },
      groupBy: f,
      handleHomeEndKeys: w = !e.freeSolo,
      id: k,
      includeInputInList: V = !1,
      inputValue: L,
      isOptionEqualToValue: D = (N, $) => N === $,
      multiple: _ = !1,
      onChange: Y,
      onClose: B,
      onHighlightChange: M,
      onInputChange: F,
      onOpen: z,
      open: ie,
      openOnFocus: se = !1,
      options: G,
      readOnly: R = !1,
      selectOnFocus: j = !e.freeSolo,
      value: X,
    } = e,
    H = Sl(k);
  let U = E;
  U = (N) => {
    const $ = E(N);
    if (typeof $ != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const K = $ === void 0 ? 'undefined' : `${typeof $} (${$})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${u} returned ${K} instead of a string for ${JSON.stringify(
            N,
          )}.`,
        );
      }
      return String($);
    }
    return $;
  };
  const ne = x.useRef(!1),
    oe = x.useRef(!0),
    J = x.useRef(null),
    ae = x.useRef(null),
    [le, he] = x.useState(null),
    [re, P] = x.useState(-1),
    Oe = a ? 0 : -1,
    I = x.useRef(Oe),
    [W, Ne] = Pn({
      controlled: X,
      default: d,
      name: u,
    }),
    [ge, et] = Pn({
      controlled: L,
      default: '',
      name: u,
      state: 'inputValue',
    }),
    [je, Se] = x.useState(!1),
    ke = x.useCallback(
      (N, $) => {
        if (!(_ ? W.length < $.length : $ !== null) && !l) return;
        let te;
        if (_) te = '';
        else if ($ == null) te = '';
        else {
          const de = U($);
          te = typeof de == 'string' ? de : '';
        }
        ge !== te && (et(te), F && F(N, te, 'reset'));
      },
      [U, ge, _, F, et, l, W],
    ),
    [tt, at] = Pn({
      controlled: ie,
      default: !1,
      name: u,
      state: 'open',
    }),
    [Z, me] = x.useState(!0),
    ve = !_ && W != null && ge === U(W),
    be = tt && !R,
    fe = be
      ? m(
          G.filter((N) => !(S && (_ ? W : [W]).some(($) => $ !== null && D(N, $)))),
          // we use the empty string to manipulate `filterOptions` to not filter any options
          // i.e. the filter predicate always returns true
          {
            inputValue: ve && Z ? '' : ge,
            getOptionLabel: U,
          },
        )
      : [],
    ue = Sd({
      filteredOptions: fe,
      value: W,
    });
  x.useEffect(() => {
    const N = W !== ue.value;
    (je && !N) || (T && !N) || ke(null, W);
  }, [W, ke, je, ue.value, T]);
  const ee = tt && fe.length > 0 && !R;
  if (process.env.NODE_ENV !== 'production' && W !== null && !T && G.length > 0) {
    const N = (_ ? W : [W]).filter(($) => !G.some((K) => D(K, $)));
    N.length > 0 &&
      console.warn(
        [
          `MUI: The value provided to ${u} is invalid.`,
          `None of the options match with \`${
            N.length > 1 ? JSON.stringify(N) : JSON.stringify(N[0])
          }\`.`,
          'You can use the `isOptionEqualToValue` prop to customize the equality test.',
        ].join(`
`),
      );
  }
  const ye = Ct((N) => {
    N === -1 ? J.current.focus() : le.querySelector(`[data-tag-index="${N}"]`).focus();
  });
  x.useEffect(() => {
    _ && re > W.length - 1 && (P(-1), ye(-1));
  }, [W, _, re, ye]);
  function xe(N, $) {
    if (!ae.current || N === -1) return -1;
    let K = N;
    for (;;) {
      if (($ === 'next' && K === fe.length) || ($ === 'previous' && K === -1)) return -1;
      const te = ae.current.querySelector(`[data-option-index="${K}"]`),
        de = v ? !1 : !te || te.disabled || te.getAttribute('aria-disabled') === 'true';
      if ((te && !te.hasAttribute('tabindex')) || de) K += $ === 'next' ? 1 : -1;
      else return K;
    }
  }
  const Ie = Ct(({ event: N, index: $, reason: K = 'auto' }) => {
      if (
        ((I.current = $),
        $ === -1
          ? J.current.removeAttribute('aria-activedescendant')
          : J.current.setAttribute('aria-activedescendant', `${H}-option-${$}`),
        M && M(N, $ === -1 ? null : fe[$], K),
        !ae.current)
      )
        return;
      const te = ae.current.querySelector(`[role="option"].${o}-focused`);
      te && (te.classList.remove(`${o}-focused`), te.classList.remove(`${o}-focusVisible`));
      const de = ae.current.parentElement.querySelector('[role="listbox"]');
      if (!de) return;
      if ($ === -1) {
        de.scrollTop = 0;
        return;
      }
      const Re = ae.current.querySelector(`[data-option-index="${$}"]`);
      if (
        Re &&
        (Re.classList.add(`${o}-focused`),
        K === 'keyboard' && Re.classList.add(`${o}-focusVisible`),
        de.scrollHeight > de.clientHeight && K !== 'mouse')
      ) {
        const we = Re,
          Me = de.clientHeight + de.scrollTop,
          gt = we.offsetTop + we.offsetHeight;
        gt > Me
          ? (de.scrollTop = gt - de.clientHeight)
          : we.offsetTop - we.offsetHeight * (f ? 1.3 : 0) < de.scrollTop &&
            (de.scrollTop = we.offsetTop - we.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    it = Ct(({ event: N, diff: $, direction: K = 'next', reason: te = 'auto' }) => {
      if (!be) return;
      const Re = xe(
        (() => {
          const we = fe.length - 1;
          if ($ === 'reset') return Oe;
          if ($ === 'start') return 0;
          if ($ === 'end') return we;
          const Me = I.current + $;
          return Me < 0
            ? Me === -1 && V
              ? -1
              : (h && I.current !== -1) || Math.abs($) > 1
              ? 0
              : we
            : Me > we
            ? Me === we + 1 && V
              ? -1
              : h || Math.abs($) > 1
              ? we
              : 0
            : Me;
        })(),
        K,
      );
      if (
        (Ie({
          index: Re,
          reason: te,
          event: N,
        }),
        r && $ !== 'reset')
      )
        if (Re === -1) J.current.value = ge;
        else {
          const we = U(fe[Re]);
          (J.current.value = we),
            we.toLowerCase().indexOf(ge.toLowerCase()) === 0 &&
              ge.length > 0 &&
              J.current.setSelectionRange(ge.length, we.length);
        }
    }),
    ft = () => {
      const N = ($, K) => {
        const te = $ ? U($) : '',
          de = K ? U(K) : '';
        return te === de;
      };
      if (
        I.current !== -1 &&
        ue.filteredOptions &&
        ue.filteredOptions.length !== fe.length &&
        (_
          ? W.length === ue.value.length && ue.value.every(($, K) => U(W[K]) === U($))
          : N(ue.value, W))
      ) {
        const $ = ue.filteredOptions[I.current];
        if ($ && fe.some((te) => U(te) === U($))) return !0;
      }
      return !1;
    },
    Tt = x.useCallback(() => {
      if (!be || ft()) return;
      const N = _ ? W[0] : W;
      if (fe.length === 0 || N == null) {
        it({
          diff: 'reset',
        });
        return;
      }
      if (ae.current) {
        if (N != null) {
          const $ = fe[I.current];
          if (_ && $ && na(W, (te) => D($, te)) !== -1) return;
          const K = na(fe, (te) => D(te, N));
          K === -1
            ? it({
                diff: 'reset',
              })
            : Ie({
                index: K,
              });
          return;
        }
        if (I.current >= fe.length - 1) {
          Ie({
            index: fe.length - 1,
          });
          return;
        }
        Ie({
          index: I.current,
        });
      }
    }, [
      // Only sync the highlighted index when the option switch between empty and not
      fe.length,
      // Don't sync the highlighted index with the value when multiple
      // eslint-disable-next-line react-hooks/exhaustive-deps
      _ ? !1 : W,
      S,
      it,
      Ie,
      be,
      ge,
      _,
    ]),
    hn = Ct((N) => {
      rr(ae, N), N && Tt();
    });
  process.env.NODE_ENV !== 'production' &&
    x.useEffect(() => {
      (!J.current || J.current.nodeName !== 'INPUT') &&
        (J.current && J.current.nodeName === 'TEXTAREA'
          ? console.warn(
              [
                `A textarea element was provided to ${u} where input was expected.`,
                'This is not a supported scenario but it may work under certain conditions.',
                'A textarea keyboard navigation may conflict with Autocomplete controls (e.g. enter and arrow keys).',
                'Make sure to test keyboard navigation and add custom event handlers if necessary.',
              ].join(`
`),
            )
          : console.error(
              [
                `MUI: Unable to find the input element. It was resolved to ${J.current} while an HTMLInputElement was expected.`,
                `Instead, ${u} expects an input element.`,
                '',
                u === 'useAutocomplete'
                  ? 'Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed.'
                  : 'Make sure you have customized the input component correctly.',
              ].join(`
`),
            ));
    }, [u]),
    x.useEffect(() => {
      Tt();
    }, [Tt]);
  const St = (N) => {
      tt || (at(!0), me(!0), z && z(N));
    },
    bt = (N, $) => {
      tt && (at(!1), B && B(N, $));
    },
    xt = (N, $, K, te) => {
      if (_) {
        if (W.length === $.length && W.every((de, Re) => de === $[Re])) return;
      } else if (W === $) return;
      Y && Y(N, $, K, te), Ne($);
    },
    mt = x.useRef(!1),
    nt = (N, $, K = 'selectOption', te = 'options') => {
      let de = K,
        Re = $;
      if (_) {
        if (((Re = Array.isArray(W) ? W.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Me = Re.filter((gt) => D($, gt));
          Me.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${u} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Me.length} matches.`,
              ].join(`
`),
            );
        }
        const we = na(Re, (Me) => D($, Me));
        we === -1 ? Re.push($) : te !== 'freeSolo' && (Re.splice(we, 1), (de = 'removeOption'));
      }
      ke(N, Re),
        xt(N, Re, de, {
          option: $,
        }),
        !b && (!N || (!N.ctrlKey && !N.metaKey)) && bt(N, de),
        (s === !0 || (s === 'touch' && mt.current) || (s === 'mouse' && !mt.current)) &&
          J.current.blur();
    };
  function ot(N, $) {
    if (N === -1) return -1;
    let K = N;
    for (;;) {
      if (($ === 'next' && K === W.length) || ($ === 'previous' && K === -1)) return -1;
      const te = le.querySelector(`[data-tag-index="${K}"]`);
      if (
        !te ||
        !te.hasAttribute('tabindex') ||
        te.disabled ||
        te.getAttribute('aria-disabled') === 'true'
      )
        K += $ === 'next' ? 1 : -1;
      else return K;
    }
  }
  const ht = (N, $) => {
      if (!_) return;
      ge === '' && bt(N, 'toggleInput');
      let K = re;
      re === -1
        ? ge === '' && $ === 'previous' && (K = W.length - 1)
        : ((K += $ === 'next' ? 1 : -1), K < 0 && (K = 0), K === W.length && (K = -1)),
        (K = ot(K, $)),
        P(K),
        ye(K);
    },
    Sn = (N) => {
      (ne.current = !0), et(''), F && F(N, '', 'clear'), xt(N, _ ? [] : null, 'clear');
    },
    Jt = (N) => ($) => {
      if (
        (N.onKeyDown && N.onKeyDown($),
        !$.defaultMuiPrevented &&
          (re !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf($.key) === -1 && (P(-1), ye(-1)),
          $.which !== 229))
      )
        switch ($.key) {
          case 'Home':
            be &&
              w &&
              ($.preventDefault(),
              it({
                diff: 'start',
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }));
            break;
          case 'End':
            be &&
              w &&
              ($.preventDefault(),
              it({
                diff: 'end',
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }));
            break;
          case 'PageUp':
            $.preventDefault(),
              it({
                diff: -Ms,
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }),
              St($);
            break;
          case 'PageDown':
            $.preventDefault(),
              it({
                diff: Ms,
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }),
              St($);
            break;
          case 'ArrowDown':
            $.preventDefault(),
              it({
                diff: 1,
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }),
              St($);
            break;
          case 'ArrowUp':
            $.preventDefault(),
              it({
                diff: -1,
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }),
              St($);
            break;
          case 'ArrowLeft':
            ht($, 'previous');
            break;
          case 'ArrowRight':
            ht($, 'next');
            break;
          case 'Enter':
            if (I.current !== -1 && be) {
              const K = fe[I.current],
                te = C ? C(K) : !1;
              if (($.preventDefault(), te)) return;
              nt($, K, 'selectOption'),
                r && J.current.setSelectionRange(J.current.value.length, J.current.value.length);
            } else
              T &&
                ge !== '' &&
                ve === !1 &&
                (_ && $.preventDefault(), nt($, ge, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            be
              ? ($.preventDefault(), $.stopPropagation(), bt($, 'escape'))
              : c &&
                (ge !== '' || (_ && W.length > 0)) &&
                ($.preventDefault(), $.stopPropagation(), Sn($));
            break;
          case 'Backspace':
            if (_ && !R && ge === '' && W.length > 0) {
              const K = re === -1 ? W.length - 1 : re,
                te = W.slice();
              te.splice(K, 1),
                xt($, te, 'removeOption', {
                  option: W[K],
                });
            }
            break;
          case 'Delete':
            if (_ && !R && ge === '' && W.length > 0 && re !== -1) {
              const K = re,
                te = W.slice();
              te.splice(K, 1),
                xt($, te, 'removeOption', {
                  option: W[K],
                });
            }
            break;
        }
    },
    bn = (N) => {
      Se(!0), se && !ne.current && St(N);
    },
    Bt = (N) => {
      if (t(ae)) {
        J.current.focus();
        return;
      }
      Se(!1),
        (oe.current = !0),
        (ne.current = !1),
        i && I.current !== -1 && be
          ? nt(N, fe[I.current], 'blur')
          : i && T && ge !== ''
          ? nt(N, ge, 'blur', 'freeSolo')
          : l && ke(N, W),
        bt(N, 'blur');
    },
    ln = (N) => {
      const $ = N.target.value;
      ge !== $ && (et($), me(!1), F && F(N, $, 'input')),
        $ === '' ? !p && !_ && xt(N, null, 'clear') : St(N);
    },
    cn = (N) => {
      Ie({
        event: N,
        index: Number(N.currentTarget.getAttribute('data-option-index')),
        reason: 'mouse',
      });
    },
    un = (N) => {
      Ie({
        event: N,
        index: Number(N.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (mt.current = !0);
    },
    Zt = (N) => {
      const $ = Number(N.currentTarget.getAttribute('data-option-index'));
      nt(N, fe[$], 'selectOption'), (mt.current = !1);
    },
    dn = (N) => ($) => {
      const K = W.slice();
      K.splice(N, 1),
        xt($, K, 'removeOption', {
          option: W[N],
        });
    },
    _e = (N) => {
      tt ? bt(N, 'toggleInput') : St(N);
    },
    ut = (N) => {
      N.target.getAttribute('id') !== H && N.preventDefault();
    },
    At = () => {
      J.current.focus(),
        j &&
          oe.current &&
          J.current.selectionEnd - J.current.selectionStart === 0 &&
          J.current.select(),
        (oe.current = !1);
    },
    O = (N) => {
      (ge === '' || !tt) && _e(N);
    };
  let q = T && ge.length > 0;
  q = q || (_ ? W.length > 0 : W !== null);
  let ce = fe;
  if (f) {
    const N = /* @__PURE__ */ new Map();
    let $ = !1;
    ce = fe.reduce((K, te, de) => {
      const Re = f(te);
      return (
        K.length > 0 && K[K.length - 1].group === Re
          ? K[K.length - 1].options.push(te)
          : (process.env.NODE_ENV !== 'production' &&
              (N.get(Re) &&
                !$ &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${u} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                ($ = !0)),
              N.set(Re, !0)),
            K.push({
              key: de,
              index: de,
              group: Re,
              options: [te],
            })),
        K
      );
    }, []);
  }
  return (
    y && je && Bt(),
    {
      getRootProps: (N = {}) =>
        g(
          {
            'aria-owns': ee ? `${H}-listbox` : null,
          },
          N,
          {
            onKeyDown: Jt(N),
            onMouseDown: ut,
            onClick: At,
          },
        ),
      getInputLabelProps: () => ({
        id: `${H}-label`,
        htmlFor: H,
      }),
      getInputProps: () => ({
        id: H,
        value: ge,
        onBlur: Bt,
        onFocus: bn,
        onChange: ln,
        onMouseDown: O,
        // if open then this is handled imperativeley so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': be ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': ee ? `${H}-listbox` : void 0,
        'aria-expanded': ee,
        // Disable browser's suggestion that might overlap with the popup.
        // Handle autocomplete but not autofill.
        autoComplete: 'off',
        ref: J,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: y,
      }),
      getClearProps: () => ({
        tabIndex: -1,
        onClick: Sn,
      }),
      getPopupIndicatorProps: () => ({
        tabIndex: -1,
        onClick: _e,
      }),
      getTagProps: ({ index: N }) =>
        g(
          {
            key: N,
            'data-tag-index': N,
            tabIndex: -1,
          },
          !R && {
            onDelete: dn(N),
          },
        ),
      getListboxProps: () => ({
        role: 'listbox',
        id: `${H}-listbox`,
        'aria-labelledby': `${H}-label`,
        ref: hn,
        onMouseDown: (N) => {
          N.preventDefault();
        },
      }),
      getOptionProps: ({ index: N, option: $ }) => {
        const K = (_ ? W : [W]).some((de) => de != null && D($, de)),
          te = C ? C($) : !1;
        return {
          key: U($),
          tabIndex: -1,
          role: 'option',
          id: `${H}-option-${N}`,
          onMouseOver: cn,
          onClick: Zt,
          onTouchStart: un,
          'data-option-index': N,
          'aria-disabled': te,
          'aria-selected': K,
        };
      },
      id: H,
      inputValue: ge,
      value: W,
      dirty: q,
      expanded: be && le,
      popupOpen: be,
      focused: je || re !== -1,
      anchorEl: le,
      setAnchorEl: he,
      focusedTag: re,
      groupedOptions: ce,
    }
  );
}
function Kb(e) {
  return Ae('MuiSvgIcon', e);
}
Pe('MuiSvgIcon', [
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
const Gb = [
    'children',
    'className',
    'color',
    'component',
    'fontSize',
    'htmlColor',
    'inheritViewBox',
    'titleAccess',
    'viewBox',
  ],
  Xb = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      a = {
        root: ['root', t !== 'inherit' && `color${Q(t)}`, `fontSize${Q(o)}`],
      };
    return Fe(a, Kb, r);
  },
  Jb = pe('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'inherit' && t[`color${Q(o.color)}`],
        t[`fontSize${Q(o.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var o, r, a, i, s, l, c, u, d, p, b, y, v, h, m, S, T;
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
                (a = e.transitions) == null || (i = a.duration) == null ? void 0 : i.shorter,
            }),
      fontSize: {
        inherit: 'inherit',
        small:
          ((s = e.typography) == null || (l = s.pxToRem) == null ? void 0 : l.call(s, 20)) ||
          '1.25rem',
        medium:
          ((c = e.typography) == null || (u = c.pxToRem) == null ? void 0 : u.call(c, 24)) ||
          '1.5rem',
        large:
          ((d = e.typography) == null || (p = d.pxToRem) == null ? void 0 : p.call(d, 35)) ||
          '2.1875rem',
      }[t.fontSize],
      // TODO v5 deprecate, v6 remove for sx
      color:
        (b = (y = (e.vars || e).palette) == null || (v = y[t.color]) == null ? void 0 : v.main) !=
        null
          ? b
          : {
              action:
                (h = (e.vars || e).palette) == null || (m = h.action) == null ? void 0 : m.active,
              disabled:
                (S = (e.vars || e).palette) == null || (T = S.action) == null ? void 0 : T.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  ni = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiSvgIcon',
      }),
      {
        children: a,
        className: i,
        color: s = 'inherit',
        component: l = 'svg',
        fontSize: c = 'medium',
        htmlColor: u,
        inheritViewBox: d = !1,
        titleAccess: p,
        viewBox: b = '0 0 24 24',
      } = r,
      y = Ce(r, Gb),
      v = g({}, r, {
        color: s,
        component: l,
        fontSize: c,
        instanceFontSize: t.fontSize,
        inheritViewBox: d,
        viewBox: b,
      }),
      h = {};
    d || (h.viewBox = b);
    const m = Xb(v);
    return /* @__PURE__ */ Qe(
      Jb,
      g(
        {
          as: l,
          className: Ee(m.root, i),
          focusable: 'false',
          color: u,
          'aria-hidden': p ? void 0 : !0,
          role: p ? 'img' : void 0,
          ref: o,
        },
        h,
        y,
        {
          ownerState: v,
          children: [
            a,
            p
              ? /* @__PURE__ */ A('title', {
                  children: p,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ni.propTypes = {
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
ni.muiName = 'SvgIcon';
const As = ni;
function so(e, t) {
  function o(r, a) {
    return /* @__PURE__ */ A(
      As,
      g(
        {
          'data-testid': `${t}Icon`,
          ref: a,
        },
        r,
        {
          children: e,
        },
      ),
    );
  }
  return (
    process.env.NODE_ENV !== 'production' && (o.displayName = `${t}Icon`),
    (o.muiName = As.muiName),
    /* @__PURE__ */ x.memo(/* @__PURE__ */ x.forwardRef(o))
  );
}
var xa = { exports: {} },
  Ke = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ds;
function Zb() {
  if (Ds) return Ke;
  Ds = 1;
  var e = Symbol.for('react.element'),
    t = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    a = Symbol.for('react.profiler'),
    i = Symbol.for('react.provider'),
    s = Symbol.for('react.context'),
    l = Symbol.for('react.server_context'),
    c = Symbol.for('react.forward_ref'),
    u = Symbol.for('react.suspense'),
    d = Symbol.for('react.suspense_list'),
    p = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    y = Symbol.for('react.offscreen'),
    v;
  v = Symbol.for('react.module.reference');
  function h(m) {
    if (typeof m == 'object' && m !== null) {
      var S = m.$$typeof;
      switch (S) {
        case e:
          switch (((m = m.type), m)) {
            case o:
            case a:
            case r:
            case u:
            case d:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case l:
                case s:
                case c:
                case b:
                case p:
                case i:
                  return m;
                default:
                  return S;
              }
          }
        case t:
          return S;
      }
    }
  }
  return (
    (Ke.ContextConsumer = s),
    (Ke.ContextProvider = i),
    (Ke.Element = e),
    (Ke.ForwardRef = c),
    (Ke.Fragment = o),
    (Ke.Lazy = b),
    (Ke.Memo = p),
    (Ke.Portal = t),
    (Ke.Profiler = a),
    (Ke.StrictMode = r),
    (Ke.Suspense = u),
    (Ke.SuspenseList = d),
    (Ke.isAsyncMode = function () {
      return !1;
    }),
    (Ke.isConcurrentMode = function () {
      return !1;
    }),
    (Ke.isContextConsumer = function (m) {
      return h(m) === s;
    }),
    (Ke.isContextProvider = function (m) {
      return h(m) === i;
    }),
    (Ke.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (Ke.isForwardRef = function (m) {
      return h(m) === c;
    }),
    (Ke.isFragment = function (m) {
      return h(m) === o;
    }),
    (Ke.isLazy = function (m) {
      return h(m) === b;
    }),
    (Ke.isMemo = function (m) {
      return h(m) === p;
    }),
    (Ke.isPortal = function (m) {
      return h(m) === t;
    }),
    (Ke.isProfiler = function (m) {
      return h(m) === a;
    }),
    (Ke.isStrictMode = function (m) {
      return h(m) === r;
    }),
    (Ke.isSuspense = function (m) {
      return h(m) === u;
    }),
    (Ke.isSuspenseList = function (m) {
      return h(m) === d;
    }),
    (Ke.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === o ||
        m === a ||
        m === r ||
        m === u ||
        m === d ||
        m === y ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === b ||
            m.$$typeof === p ||
            m.$$typeof === i ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === v ||
            m.getModuleId !== void 0))
      );
    }),
    (Ke.typeOf = h),
    Ke
  );
}
var Ge = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ls;
function Qb() {
  return (
    Ls ||
      ((Ls = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Symbol.for('react.element'),
            t = Symbol.for('react.portal'),
            o = Symbol.for('react.fragment'),
            r = Symbol.for('react.strict_mode'),
            a = Symbol.for('react.profiler'),
            i = Symbol.for('react.provider'),
            s = Symbol.for('react.context'),
            l = Symbol.for('react.server_context'),
            c = Symbol.for('react.forward_ref'),
            u = Symbol.for('react.suspense'),
            d = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            b = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            v = !1,
            h = !1,
            m = !1,
            S = !1,
            T = !1,
            C;
          C = Symbol.for('react.module.reference');
          function E(I) {
            return !!(
              typeof I == 'string' ||
              typeof I == 'function' ||
              I === o ||
              I === a ||
              T ||
              I === r ||
              I === u ||
              I === d ||
              S ||
              I === y ||
              v ||
              h ||
              m ||
              (typeof I == 'object' &&
                I !== null &&
                (I.$$typeof === b ||
                  I.$$typeof === p ||
                  I.$$typeof === i ||
                  I.$$typeof === s ||
                  I.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  I.$$typeof === C ||
                  I.getModuleId !== void 0))
            );
          }
          function f(I) {
            if (typeof I == 'object' && I !== null) {
              var W = I.$$typeof;
              switch (W) {
                case e:
                  var Ne = I.type;
                  switch (Ne) {
                    case o:
                    case a:
                    case r:
                    case u:
                    case d:
                      return Ne;
                    default:
                      var ge = Ne && Ne.$$typeof;
                      switch (ge) {
                        case l:
                        case s:
                        case c:
                        case b:
                        case p:
                        case i:
                          return ge;
                        default:
                          return W;
                      }
                  }
                case t:
                  return W;
              }
            }
          }
          var w = s,
            k = i,
            V = e,
            L = c,
            D = o,
            _ = b,
            Y = p,
            B = t,
            M = a,
            F = r,
            z = u,
            ie = d,
            se = !1,
            G = !1;
          function R(I) {
            return (
              se ||
                ((se = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function j(I) {
            return (
              G ||
                ((G = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function X(I) {
            return f(I) === s;
          }
          function H(I) {
            return f(I) === i;
          }
          function U(I) {
            return typeof I == 'object' && I !== null && I.$$typeof === e;
          }
          function ne(I) {
            return f(I) === c;
          }
          function oe(I) {
            return f(I) === o;
          }
          function J(I) {
            return f(I) === b;
          }
          function ae(I) {
            return f(I) === p;
          }
          function le(I) {
            return f(I) === t;
          }
          function he(I) {
            return f(I) === a;
          }
          function re(I) {
            return f(I) === r;
          }
          function P(I) {
            return f(I) === u;
          }
          function Oe(I) {
            return f(I) === d;
          }
          (Ge.ContextConsumer = w),
            (Ge.ContextProvider = k),
            (Ge.Element = V),
            (Ge.ForwardRef = L),
            (Ge.Fragment = D),
            (Ge.Lazy = _),
            (Ge.Memo = Y),
            (Ge.Portal = B),
            (Ge.Profiler = M),
            (Ge.StrictMode = F),
            (Ge.Suspense = z),
            (Ge.SuspenseList = ie),
            (Ge.isAsyncMode = R),
            (Ge.isConcurrentMode = j),
            (Ge.isContextConsumer = X),
            (Ge.isContextProvider = H),
            (Ge.isElement = U),
            (Ge.isForwardRef = ne),
            (Ge.isFragment = oe),
            (Ge.isLazy = J),
            (Ge.isMemo = ae),
            (Ge.isPortal = le),
            (Ge.isProfiler = he),
            (Ge.isStrictMode = re),
            (Ge.isSuspense = P),
            (Ge.isSuspenseList = Oe),
            (Ge.isValidElementType = E),
            (Ge.typeOf = f);
        })()),
    Ge
  );
}
process.env.NODE_ENV === 'production' ? (xa.exports = Zb()) : (xa.exports = Qb());
var oi = xa.exports;
function Ea(e, t) {
  return (
    (Ea = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, a) {
          return (r.__proto__ = a), r;
        }),
    Ea(e, t)
  );
}
function bc(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), Ea(e, t);
}
const Fs = {
  disabled: !1,
};
var eg =
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
const mr = Ht.createContext(null);
var tg = function (t) {
    return t.scrollTop;
  },
  xo = 'unmounted',
  kn = 'exited',
  Rn = 'entering',
  qn = 'entered',
  Ca = 'exiting',
  mn = /* @__PURE__ */ (function (e) {
    bc(t, e);
    function t(r, a) {
      var i;
      i = e.call(this, r, a) || this;
      var s = a,
        l = s && !s.isMounting ? r.enter : r.appear,
        c;
      return (
        (i.appearStatus = null),
        r.in
          ? l
            ? ((c = kn), (i.appearStatus = Rn))
            : (c = qn)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = xo)
          : (c = kn),
        (i.state = {
          status: c,
        }),
        (i.nextCallback = null),
        i
      );
    }
    t.getDerivedStateFromProps = function (a, i) {
      var s = a.in;
      return s && i.status === xo
        ? {
            status: kn,
          }
        : null;
    };
    var o = t.prototype;
    return (
      (o.componentDidMount = function () {
        this.updateStatus(!0, this.appearStatus);
      }),
      (o.componentDidUpdate = function (a) {
        var i = null;
        if (a !== this.props) {
          var s = this.state.status;
          this.props.in ? s !== Rn && s !== qn && (i = Rn) : (s === Rn || s === qn) && (i = Ca);
        }
        this.updateStatus(!1, i);
      }),
      (o.componentWillUnmount = function () {
        this.cancelNextCallback();
      }),
      (o.getTimeouts = function () {
        var a = this.props.timeout,
          i,
          s,
          l;
        return (
          (i = s = l = a),
          a != null &&
            typeof a != 'number' &&
            ((i = a.exit), (s = a.enter), (l = a.appear !== void 0 ? a.appear : s)),
          {
            exit: i,
            enter: s,
            appear: l,
          }
        );
      }),
      (o.updateStatus = function (a, i) {
        if ((a === void 0 && (a = !1), i !== null))
          if ((this.cancelNextCallback(), i === Rn)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : zo.findDOMNode(this);
              s && tg(s);
            }
            this.performEnter(a);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === kn &&
            this.setState({
              status: xo,
            });
      }),
      (o.performEnter = function (a) {
        var i = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : a,
          c = this.props.nodeRef ? [l] : [zo.findDOMNode(this), l],
          u = c[0],
          d = c[1],
          p = this.getTimeouts(),
          b = l ? p.appear : p.enter;
        if ((!a && !s) || Fs.disabled) {
          this.safeSetState(
            {
              status: qn,
            },
            function () {
              i.props.onEntered(u);
            },
          );
          return;
        }
        this.props.onEnter(u, d),
          this.safeSetState(
            {
              status: Rn,
            },
            function () {
              i.props.onEntering(u, d),
                i.onTransitionEnd(b, function () {
                  i.safeSetState(
                    {
                      status: qn,
                    },
                    function () {
                      i.props.onEntered(u, d);
                    },
                  );
                });
            },
          );
      }),
      (o.performExit = function () {
        var a = this,
          i = this.props.exit,
          s = this.getTimeouts(),
          l = this.props.nodeRef ? void 0 : zo.findDOMNode(this);
        if (!i || Fs.disabled) {
          this.safeSetState(
            {
              status: kn,
            },
            function () {
              a.props.onExited(l);
            },
          );
          return;
        }
        this.props.onExit(l),
          this.safeSetState(
            {
              status: Ca,
            },
            function () {
              a.props.onExiting(l),
                a.onTransitionEnd(s.exit, function () {
                  a.safeSetState(
                    {
                      status: kn,
                    },
                    function () {
                      a.props.onExited(l);
                    },
                  );
                });
            },
          );
      }),
      (o.cancelNextCallback = function () {
        this.nextCallback !== null && (this.nextCallback.cancel(), (this.nextCallback = null));
      }),
      (o.safeSetState = function (a, i) {
        (i = this.setNextCallback(i)), this.setState(a, i);
      }),
      (o.setNextCallback = function (a) {
        var i = this,
          s = !0;
        return (
          (this.nextCallback = function (l) {
            s && ((s = !1), (i.nextCallback = null), a(l));
          }),
          (this.nextCallback.cancel = function () {
            s = !1;
          }),
          this.nextCallback
        );
      }),
      (o.onTransitionEnd = function (a, i) {
        this.setNextCallback(i);
        var s = this.props.nodeRef ? this.props.nodeRef.current : zo.findDOMNode(this),
          l = a == null && !this.props.addEndListener;
        if (!s || l) {
          setTimeout(this.nextCallback, 0);
          return;
        }
        if (this.props.addEndListener) {
          var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback],
            u = c[0],
            d = c[1];
          this.props.addEndListener(u, d);
        }
        a != null && setTimeout(this.nextCallback, a);
      }),
      (o.render = function () {
        var a = this.state.status;
        if (a === xo) return null;
        var i = this.props,
          s = i.children;
        i.in,
          i.mountOnEnter,
          i.unmountOnExit,
          i.appear,
          i.enter,
          i.exit,
          i.timeout,
          i.addEndListener,
          i.onEnter,
          i.onEntering,
          i.onEntered,
          i.onExit,
          i.onExiting,
          i.onExited,
          i.nodeRef;
        var l = Ce(i, [
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
          /* @__PURE__ */ Ht.createElement(
            mr.Provider,
            {
              value: null,
            },
            typeof s == 'function' ? s(a, l) : Ht.cloneElement(Ht.Children.only(s), l),
          )
        );
      }),
      t
    );
  })(Ht.Component);
mn.contextType = mr;
mn.propTypes =
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
              : function (e, t, o, r, a, i) {
                  var s = e[t];
                  return n.instanceOf(
                    s && 'ownerDocument' in s ? s.ownerDocument.defaultView.Element : Element,
                  )(e, t, o, r, a, i);
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
          var o = eg;
          t.addEndListener || (o = o.isRequired);
          for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
            a[i - 1] = arguments[i];
          return o.apply(void 0, [t].concat(a));
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
function Un() {}
mn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Un,
  onEntering: Un,
  onEntered: Un,
  onExit: Un,
  onExiting: Un,
  onExited: Un,
};
mn.UNMOUNTED = xo;
mn.EXITED = kn;
mn.ENTERING = Rn;
mn.ENTERED = qn;
mn.EXITING = Ca;
const gc = mn;
function ng(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ri(e, t) {
  var o = function (i) {
      return t && Jo(i) ? t(i) : i;
    },
    r = /* @__PURE__ */ Object.create(null);
  return (
    e &&
      Iu.map(e, function (a) {
        return a;
      }).forEach(function (a) {
        r[a.key] = o(a);
      }),
    r
  );
}
function og(e, t) {
  (e = e || {}), (t = t || {});
  function o(d) {
    return d in t ? t[d] : e[d];
  }
  var r = /* @__PURE__ */ Object.create(null),
    a = [];
  for (var i in e) i in t ? a.length && ((r[i] = a), (a = [])) : a.push(i);
  var s,
    l = {};
  for (var c in t) {
    if (r[c])
      for (s = 0; s < r[c].length; s++) {
        var u = r[c][s];
        l[r[c][s]] = o(u);
      }
    l[c] = o(c);
  }
  for (s = 0; s < a.length; s++) l[a[s]] = o(a[s]);
  return l;
}
function $n(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function rg(e, t) {
  return ri(e.children, function (o) {
    return Zo(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: $n(o, 'appear', e),
      enter: $n(o, 'enter', e),
      exit: $n(o, 'exit', e),
    });
  });
}
function ag(e, t, o) {
  var r = ri(e.children),
    a = og(t, r);
  return (
    Object.keys(a).forEach(function (i) {
      var s = a[i];
      if (Jo(s)) {
        var l = i in t,
          c = i in r,
          u = t[i],
          d = Jo(u) && !u.props.in;
        c && (!l || d)
          ? (a[i] = Zo(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: $n(s, 'exit', e),
              enter: $n(s, 'enter', e),
            }))
          : !c && l && !d
          ? (a[i] = Zo(s, {
              in: !1,
            }))
          : c &&
            l &&
            Jo(u) &&
            (a[i] = Zo(s, {
              onExited: o.bind(null, s),
              in: u.props.in,
              exit: $n(s, 'exit', e),
              enter: $n(s, 'enter', e),
            }));
      }
    }),
    a
  );
}
var ig =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  sg = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  ai = /* @__PURE__ */ (function (e) {
    bc(t, e);
    function t(r, a) {
      var i;
      i = e.call(this, r, a) || this;
      var s = i.handleExited.bind(ng(i));
      return (
        (i.state = {
          contextValue: {
            isMounting: !0,
          },
          handleExited: s,
          firstRender: !0,
        }),
        i
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
      (t.getDerivedStateFromProps = function (a, i) {
        var s = i.children,
          l = i.handleExited,
          c = i.firstRender;
        return {
          children: c ? rg(a, l) : ag(a, s, l),
          firstRender: !1,
        };
      }),
      (o.handleExited = function (a, i) {
        var s = ri(this.props.children);
        a.key in s ||
          (a.props.onExited && a.props.onExited(i),
          this.mounted &&
            this.setState(function (l) {
              var c = g({}, l.children);
              return (
                delete c[a.key],
                {
                  children: c,
                }
              );
            }));
      }),
      (o.render = function () {
        var a = this.props,
          i = a.component,
          s = a.childFactory,
          l = Ce(a, ['component', 'childFactory']),
          c = this.state.contextValue,
          u = ig(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          i === null
            ? /* @__PURE__ */ Ht.createElement(
                mr.Provider,
                {
                  value: c,
                },
                u,
              )
            : /* @__PURE__ */ Ht.createElement(
                mr.Provider,
                {
                  value: c,
                },
                /* @__PURE__ */ Ht.createElement(i, l, u),
              )
        );
      }),
      t
    );
  })(Ht.Component);
ai.propTypes =
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
ai.defaultProps = sg;
const lg = ai,
  vc = (e) => e.scrollTop;
function hr(e, t) {
  var o, r;
  const { timeout: a, easing: i, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof a == 'number' ? a : a[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof i == 'object' ? i[t.mode] : i,
    delay: s.transitionDelay,
  };
}
function cg(e) {
  return Ae('MuiPaper', e);
}
Pe('MuiPaper', [
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
const ug = ['className', 'component', 'elevation', 'square', 'variant'],
  dg = (e) => {
    const { square: t, elevation: o, variant: r, classes: a } = e,
      i = {
        root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`],
      };
    return Fe(i, cg, a);
  },
  pg = pe('div', {
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
    return g(
      {
        backgroundColor: (e.vars || e).palette.background.paper,
        color: (e.vars || e).palette.text.primary,
        transition: e.transitions.create('box-shadow'),
      },
      !t.square && {
        borderRadius: e.shape.borderRadius,
      },
      t.variant === 'outlined' && {
        border: `1px solid ${(e.vars || e).palette.divider}`,
      },
      t.variant === 'elevation' &&
        g(
          {
            boxShadow: (e.vars || e).shadows[t.elevation],
          },
          !e.vars &&
            e.palette.mode === 'dark' && {
              backgroundImage: `linear-gradient(${Je('#fff', ms(t.elevation))}, ${Je(
                '#fff',
                ms(t.elevation),
              )})`,
            },
          e.vars && {
            backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation],
          },
        ),
    );
  }),
  yc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiPaper',
      }),
      {
        className: a,
        component: i = 'div',
        elevation: s = 1,
        square: l = !1,
        variant: c = 'elevation',
      } = r,
      u = Ce(r, ug),
      d = g({}, r, {
        component: i,
        elevation: s,
        square: l,
        variant: c,
      }),
      p = dg(d);
    return (
      process.env.NODE_ENV !== 'production' &&
        io().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      /* @__PURE__ */ A(
        pg,
        g(
          {
            as: i,
            ownerState: d,
            className: Ee(p.root, a),
            ref: o,
          },
          u,
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (yc.propTypes = {
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
    elevation: Kt(Ia, (e) => {
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
const Vo = yc;
function xc(e) {
  const {
      className: t,
      classes: o,
      pulsate: r = !1,
      rippleX: a,
      rippleY: i,
      rippleSize: s,
      in: l,
      onExited: c,
      timeout: u,
    } = e,
    [d, p] = x.useState(!1),
    b = Ee(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    y = {
      width: s,
      height: s,
      top: -(s / 2) + i,
      left: -(s / 2) + a,
    },
    v = Ee(o.child, d && o.childLeaving, r && o.childPulsate);
  return (
    !l && !d && p(!0),
    x.useEffect(() => {
      if (!l && c != null) {
        const h = setTimeout(c, u);
        return () => {
          clearTimeout(h);
        };
      }
    }, [c, l, u]),
    /* @__PURE__ */ A('span', {
      className: b,
      style: y,
      children: /* @__PURE__ */ A('span', {
        className: v,
      }),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (xc.propTypes = {
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
const fg = Pe('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  Lt = fg,
  mg = ['center', 'classes', 'className'];
let Fr = (e) => e,
  js,
  Vs,
  zs,
  Bs;
const Oa = 550,
  hg = 80,
  bg = Ba(
    js ||
      (js = Fr`
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
  gg = Ba(
    Vs ||
      (Vs = Fr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  vg = Ba(
    zs ||
      (zs = Fr`
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
  yg = pe('span', {
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
  xg = pe(xc, {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  })(
    Bs ||
      (Bs = Fr`
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
    Lt.rippleVisible,
    bg,
    Oa,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Lt.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    Lt.child,
    Lt.childLeaving,
    gg,
    Oa,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    Lt.childPulsate,
    vg,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  Ec = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiTouchRipple',
      }),
      { center: a = !1, classes: i = {}, className: s } = r,
      l = Ce(r, mg),
      [c, u] = x.useState([]),
      d = x.useRef(0),
      p = x.useRef(null);
    x.useEffect(() => {
      p.current && (p.current(), (p.current = null));
    }, [c]);
    const b = x.useRef(!1),
      y = x.useRef(null),
      v = x.useRef(null),
      h = x.useRef(null);
    x.useEffect(
      () => () => {
        clearTimeout(y.current);
      },
      [],
    );
    const m = x.useCallback(
        (E) => {
          const { pulsate: f, rippleX: w, rippleY: k, rippleSize: V, cb: L } = E;
          u((D) => [
            ...D,
            /* @__PURE__ */ A(
              xg,
              {
                classes: {
                  ripple: Ee(i.ripple, Lt.ripple),
                  rippleVisible: Ee(i.rippleVisible, Lt.rippleVisible),
                  ripplePulsate: Ee(i.ripplePulsate, Lt.ripplePulsate),
                  child: Ee(i.child, Lt.child),
                  childLeaving: Ee(i.childLeaving, Lt.childLeaving),
                  childPulsate: Ee(i.childPulsate, Lt.childPulsate),
                },
                timeout: Oa,
                pulsate: f,
                rippleX: w,
                rippleY: k,
                rippleSize: V,
              },
              d.current,
            ),
          ]),
            (d.current += 1),
            (p.current = L);
        },
        [i],
      ),
      S = x.useCallback(
        (E = {}, f = {}, w = () => {}) => {
          const {
            pulsate: k = !1,
            center: V = a || f.pulsate,
            fakeElement: L = !1,
            // For test purposes
          } = f;
          if ((E == null ? void 0 : E.type) === 'mousedown' && b.current) {
            b.current = !1;
            return;
          }
          (E == null ? void 0 : E.type) === 'touchstart' && (b.current = !0);
          const D = L ? null : h.current,
            _ = D
              ? D.getBoundingClientRect()
              : {
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                };
          let Y, B, M;
          if (
            V ||
            E === void 0 ||
            (E.clientX === 0 && E.clientY === 0) ||
            (!E.clientX && !E.touches)
          )
            (Y = Math.round(_.width / 2)), (B = Math.round(_.height / 2));
          else {
            const { clientX: F, clientY: z } = E.touches && E.touches.length > 0 ? E.touches[0] : E;
            (Y = Math.round(F - _.left)), (B = Math.round(z - _.top));
          }
          if (V) (M = Math.sqrt((2 * _.width ** 2 + _.height ** 2) / 3)), M % 2 === 0 && (M += 1);
          else {
            const F = Math.max(Math.abs((D ? D.clientWidth : 0) - Y), Y) * 2 + 2,
              z = Math.max(Math.abs((D ? D.clientHeight : 0) - B), B) * 2 + 2;
            M = Math.sqrt(F ** 2 + z ** 2);
          }
          E != null && E.touches
            ? v.current === null &&
              ((v.current = () => {
                m({
                  pulsate: k,
                  rippleX: Y,
                  rippleY: B,
                  rippleSize: M,
                  cb: w,
                });
              }),
              (y.current = setTimeout(() => {
                v.current && (v.current(), (v.current = null));
              }, hg)))
            : m({
                pulsate: k,
                rippleX: Y,
                rippleY: B,
                rippleSize: M,
                cb: w,
              });
        },
        [a, m],
      ),
      T = x.useCallback(() => {
        S(
          {},
          {
            pulsate: !0,
          },
        );
      }, [S]),
      C = x.useCallback((E, f) => {
        if ((clearTimeout(y.current), (E == null ? void 0 : E.type) === 'touchend' && v.current)) {
          v.current(),
            (v.current = null),
            (y.current = setTimeout(() => {
              C(E, f);
            }));
          return;
        }
        (v.current = null), u((w) => (w.length > 0 ? w.slice(1) : w)), (p.current = f);
      }, []);
    return (
      x.useImperativeHandle(
        o,
        () => ({
          pulsate: T,
          start: S,
          stop: C,
        }),
        [T, S, C],
      ),
      /* @__PURE__ */ A(
        yg,
        g(
          {
            className: Ee(Lt.root, i.root, s),
            ref: h,
          },
          l,
          {
            children: /* @__PURE__ */ A(lg, {
              component: null,
              exit: !0,
              children: c,
            }),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ec.propTypes = {
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
const Eg = Ec;
function Cg(e) {
  return Ae('MuiButtonBase', e);
}
const Og = Pe('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  Tg = Og,
  Sg = [
    'action',
    'centerRipple',
    'children',
    'className',
    'component',
    'disabled',
    'disableRipple',
    'disableTouchRipple',
    'focusRipple',
    'focusVisibleClassName',
    'LinkComponent',
    'onBlur',
    'onClick',
    'onContextMenu',
    'onDragLeave',
    'onFocus',
    'onFocusVisible',
    'onKeyDown',
    'onKeyUp',
    'onMouseDown',
    'onMouseLeave',
    'onMouseUp',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',
    'tabIndex',
    'TouchRippleProps',
    'touchRippleRef',
    'type',
  ],
  wg = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: a } = e,
      s = Fe(
        {
          root: ['root', t && 'disabled', o && 'focusVisible'],
        },
        Cg,
        a,
      );
    return o && r && (s.root += ` ${r}`), s;
  },
  kg = pe('button', {
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
    [`&.${Tg.disabled}`]: {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
  }),
  Cc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiButtonBase',
      }),
      {
        action: a,
        centerRipple: i = !1,
        children: s,
        className: l,
        component: c = 'button',
        disabled: u = !1,
        disableRipple: d = !1,
        disableTouchRipple: p = !1,
        focusRipple: b = !1,
        LinkComponent: y = 'a',
        onBlur: v,
        onClick: h,
        onContextMenu: m,
        onDragLeave: S,
        onFocus: T,
        onFocusVisible: C,
        onKeyDown: E,
        onKeyUp: f,
        onMouseDown: w,
        onMouseLeave: k,
        onMouseUp: V,
        onTouchEnd: L,
        onTouchMove: D,
        onTouchStart: _,
        tabIndex: Y = 0,
        TouchRippleProps: B,
        touchRippleRef: M,
        type: F,
      } = r,
      z = Ce(r, Sg),
      ie = x.useRef(null),
      se = x.useRef(null),
      G = dt(se, M),
      { isFocusVisibleRef: R, onFocus: j, onBlur: X, ref: H } = wl(),
      [U, ne] = x.useState(!1);
    u && U && ne(!1),
      x.useImperativeHandle(
        a,
        () => ({
          focusVisible: () => {
            ne(!0), ie.current.focus();
          },
        }),
        [],
      );
    const [oe, J] = x.useState(!1);
    x.useEffect(() => {
      J(!0);
    }, []);
    const ae = oe && !d && !u;
    x.useEffect(() => {
      U && b && !d && oe && se.current.pulsate();
    }, [d, b, U, oe]);
    function le(ue, ee, ye = p) {
      return Ct((xe) => (ee && ee(xe), !ye && se.current && se.current[ue](xe), !0));
    }
    const he = le('start', w),
      re = le('stop', m),
      P = le('stop', S),
      Oe = le('stop', V),
      I = le('stop', (ue) => {
        U && ue.preventDefault(), k && k(ue);
      }),
      W = le('start', _),
      Ne = le('stop', L),
      ge = le('stop', D),
      et = le(
        'stop',
        (ue) => {
          X(ue), R.current === !1 && ne(!1), v && v(ue);
        },
        !1,
      ),
      je = Ct((ue) => {
        ie.current || (ie.current = ue.currentTarget),
          j(ue),
          R.current === !0 && (ne(!0), C && C(ue)),
          T && T(ue);
      }),
      Se = () => {
        const ue = ie.current;
        return c && c !== 'button' && !(ue.tagName === 'A' && ue.href);
      },
      ke = x.useRef(!1),
      tt = Ct((ue) => {
        b &&
          !ke.current &&
          U &&
          se.current &&
          ue.key === ' ' &&
          ((ke.current = !0),
          se.current.stop(ue, () => {
            se.current.start(ue);
          })),
          ue.target === ue.currentTarget && Se() && ue.key === ' ' && ue.preventDefault(),
          E && E(ue),
          ue.target === ue.currentTarget &&
            Se() &&
            ue.key === 'Enter' &&
            !u &&
            (ue.preventDefault(), h && h(ue));
      }),
      at = Ct((ue) => {
        b &&
          ue.key === ' ' &&
          se.current &&
          U &&
          !ue.defaultPrevented &&
          ((ke.current = !1),
          se.current.stop(ue, () => {
            se.current.pulsate(ue);
          })),
          f && f(ue),
          h &&
            ue.target === ue.currentTarget &&
            Se() &&
            ue.key === ' ' &&
            !ue.defaultPrevented &&
            h(ue);
      });
    let Z = c;
    Z === 'button' && (z.href || z.to) && (Z = y);
    const me = {};
    Z === 'button'
      ? ((me.type = F === void 0 ? 'button' : F), (me.disabled = u))
      : (!z.href && !z.to && (me.role = 'button'), u && (me['aria-disabled'] = u));
    const ve = dt(o, H, ie);
    process.env.NODE_ENV !== 'production' &&
      x.useEffect(() => {
        ae &&
          !se.current &&
          console.error(
            [
              'MUI: The `component` prop provided to ButtonBase is invalid.',
              'Please make sure the children prop is rendered in this custom component.',
            ].join(`
`),
          );
      }, [ae]);
    const be = g({}, r, {
        centerRipple: i,
        component: c,
        disabled: u,
        disableRipple: d,
        disableTouchRipple: p,
        focusRipple: b,
        tabIndex: Y,
        focusVisible: U,
      }),
      fe = wg(be);
    return /* @__PURE__ */ Qe(
      kg,
      g(
        {
          as: Z,
          className: Ee(fe.root, l),
          ownerState: be,
          onBlur: et,
          onClick: h,
          onContextMenu: re,
          onFocus: je,
          onKeyDown: tt,
          onKeyUp: at,
          onMouseDown: he,
          onMouseLeave: I,
          onMouseUp: Oe,
          onDragLeave: P,
          onTouchEnd: Ne,
          onTouchMove: ge,
          onTouchStart: W,
          ref: ve,
          tabIndex: u ? -1 : Y,
          type: F,
        },
        me,
        z,
        {
          children: [
            s,
            ae
              ? /* TouchRipple is only needed client-side, x2 boost on the server. */
                /* @__PURE__ */ A(
                  Eg,
                  g(
                    {
                      ref: G,
                      center: i,
                    },
                    B,
                  ),
                )
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Cc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports `focusVisible()` action.
     */
    action: Nt,
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
    component: $a,
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
const oo = Cc;
function Rg(e) {
  return Ae('MuiIconButton', e);
}
const Ng = Pe('MuiIconButton', [
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
  $g = Ng,
  Pg = ['edge', 'children', 'className', 'color', 'disabled', 'disableFocusRipple', 'size'],
  Ig = (e) => {
    const { classes: t, disabled: o, color: r, edge: a, size: i } = e,
      s = {
        root: [
          'root',
          o && 'disabled',
          r !== 'default' && `color${Q(r)}`,
          a && `edge${Q(a)}`,
          `size${Q(i)}`,
        ],
      };
    return Fe(s, Rg, t);
  },
  _g = pe(oo, {
    name: 'MuiIconButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${Q(o.color)}`],
        o.edge && t[`edge${Q(o.edge)}`],
        t[`size${Q(o.size)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: t }) =>
      g(
        {
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
        },
        !t.disableRipple && {
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
              : Je(e.palette.action.active, e.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
        t.edge === 'start' && {
          marginLeft: t.size === 'small' ? -3 : -12,
        },
        t.edge === 'end' && {
          marginRight: t.size === 'small' ? -3 : -12,
        },
      ),
    ({ theme: e, ownerState: t }) => {
      var o;
      const r = (o = (e.vars || e).palette) == null ? void 0 : o[t.color];
      return g(
        {},
        t.color === 'inherit' && {
          color: 'inherit',
        },
        t.color !== 'inherit' &&
          t.color !== 'default' &&
          g(
            {
              color: r == null ? void 0 : r.main,
            },
            !t.disableRipple && {
              '&:hover': g(
                {},
                r && {
                  backgroundColor: e.vars
                    ? `rgba(${r.mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                    : Je(r.main, e.palette.action.hoverOpacity),
                },
                {
                  // Reset on touch devices, it doesn't add specificity
                  '@media (hover: none)': {
                    backgroundColor: 'transparent',
                  },
                },
              ),
            },
          ),
        t.size === 'small' && {
          padding: 5,
          fontSize: e.typography.pxToRem(18),
        },
        t.size === 'large' && {
          padding: 12,
          fontSize: e.typography.pxToRem(28),
        },
        {
          [`&.${$g.disabled}`]: {
            backgroundColor: 'transparent',
            color: (e.vars || e).palette.action.disabled,
          },
        },
      );
    },
  ),
  Oc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiIconButton',
      }),
      {
        edge: a = !1,
        children: i,
        className: s,
        color: l = 'default',
        disabled: c = !1,
        disableFocusRipple: u = !1,
        size: d = 'medium',
      } = r,
      p = Ce(r, Pg),
      b = g({}, r, {
        edge: a,
        color: l,
        disabled: c,
        disableFocusRipple: u,
        size: d,
      }),
      y = Ig(b);
    return /* @__PURE__ */ A(
      _g,
      g(
        {
          className: Ee(y.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: c,
          ref: o,
          ownerState: b,
        },
        p,
        {
          children: i,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Oc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The icon to display.
     */
    children: Kt(n.node, (e) =>
      x.Children.toArray(e.children).some(
        (o) => /* @__PURE__ */ x.isValidElement(o) && o.props.onClick,
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
const Tc = Oc,
  Mg = so(
    /* @__PURE__ */ A('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  ),
  Ag = ['components', 'componentsProps', 'slots', 'slotProps'],
  Dg = pe(xb, {
    name: 'MuiPopper',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Sc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r;
    const a = Jl(),
      i = ze({
        props: t,
        name: 'MuiPopper',
      }),
      { components: s, componentsProps: l, slots: c, slotProps: u } = i,
      d = Ce(i, Ag),
      p = (r = c == null ? void 0 : c.root) != null ? r : s == null ? void 0 : s.Root;
    return /* @__PURE__ */ A(
      Dg,
      g(
        {
          direction: a == null ? void 0 : a.direction,
          slots: {
            root: p,
          },
          slotProps: u ?? l,
        },
        d,
        {
          ref: o,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Sc.propTypes = {
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
    anchorEl: n.oneOfType([on, n.object, n.func]),
    /**
     * Popper render function or node.
     */
    children: n.oneOfType([n.node, n.func]),
    /**
     * @ignore
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
    container: n.oneOfType([on, n.func]),
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
     * @ignore
     */
    ownerState: n.any,
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
    popperRef: Nt,
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
const wc = Sc;
function Lg(e) {
  return Ae('MuiListSubheader', e);
}
Pe('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const Fg = ['className', 'color', 'component', 'disableGutters', 'disableSticky', 'inset'],
  jg = (e) => {
    const { classes: t, color: o, disableGutters: r, inset: a, disableSticky: i } = e,
      s = {
        root: [
          'root',
          o !== 'default' && `color${Q(o)}`,
          !r && 'gutters',
          a && 'inset',
          !i && 'sticky',
        ],
      };
    return Fe(s, Lg, t);
  },
  Vg = pe('li', {
    name: 'MuiListSubheader',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${Q(o.color)}`],
        !o.disableGutters && t.gutters,
        o.inset && t.inset,
        !o.disableSticky && t.sticky,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        boxSizing: 'border-box',
        lineHeight: '48px',
        listStyle: 'none',
        color: (e.vars || e).palette.text.secondary,
        fontFamily: e.typography.fontFamily,
        fontWeight: e.typography.fontWeightMedium,
        fontSize: e.typography.pxToRem(14),
      },
      t.color === 'primary' && {
        color: (e.vars || e).palette.primary.main,
      },
      t.color === 'inherit' && {
        color: 'inherit',
      },
      !t.disableGutters && {
        paddingLeft: 16,
        paddingRight: 16,
      },
      t.inset && {
        paddingLeft: 72,
      },
      !t.disableSticky && {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: (e.vars || e).palette.background.paper,
      },
    ),
  ),
  ii = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiListSubheader',
      }),
      {
        className: a,
        color: i = 'default',
        component: s = 'li',
        disableGutters: l = !1,
        disableSticky: c = !1,
        inset: u = !1,
      } = r,
      d = Ce(r, Fg),
      p = g({}, r, {
        color: i,
        component: s,
        disableGutters: l,
        disableSticky: c,
        inset: u,
      }),
      b = jg(p);
    return /* @__PURE__ */ A(
      Vg,
      g(
        {
          as: s,
          className: Ee(b.root, a),
          ref: o,
          ownerState: p,
        },
        d,
      ),
    );
  });
ii.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (ii.propTypes = {
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
const zg = ii,
  Bg = so(
    /* @__PURE__ */ A('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function Ug(e) {
  return Ae('MuiChip', e);
}
const Wg = Pe('MuiChip', [
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
  Le = Wg,
  Hg = [
    'avatar',
    'className',
    'clickable',
    'color',
    'component',
    'deleteIcon',
    'disabled',
    'icon',
    'label',
    'onClick',
    'onDelete',
    'onKeyDown',
    'onKeyUp',
    'size',
    'variant',
    'tabIndex',
    'skipFocusWhenDisabled',
  ],
  qg = (e) => {
    const {
        classes: t,
        disabled: o,
        size: r,
        color: a,
        iconColor: i,
        onDelete: s,
        clickable: l,
        variant: c,
      } = e,
      u = {
        root: [
          'root',
          c,
          o && 'disabled',
          `size${Q(r)}`,
          `color${Q(a)}`,
          l && 'clickable',
          l && `clickableColor${Q(a)}`,
          s && 'deletable',
          s && `deletableColor${Q(a)}`,
          `${c}${Q(a)}`,
        ],
        label: ['label', `label${Q(r)}`],
        avatar: ['avatar', `avatar${Q(r)}`, `avatarColor${Q(a)}`],
        icon: ['icon', `icon${Q(r)}`, `iconColor${Q(i)}`],
        deleteIcon: [
          'deleteIcon',
          `deleteIcon${Q(r)}`,
          `deleteIconColor${Q(a)}`,
          `deleteIcon${Q(c)}Color${Q(a)}`,
        ],
      };
    return Fe(u, Ug, t);
  },
  Yg = pe('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: a, clickable: i, onDelete: s, size: l, variant: c } = o;
      return [
        {
          [`& .${Le.avatar}`]: t.avatar,
        },
        {
          [`& .${Le.avatar}`]: t[`avatar${Q(l)}`],
        },
        {
          [`& .${Le.avatar}`]: t[`avatarColor${Q(r)}`],
        },
        {
          [`& .${Le.icon}`]: t.icon,
        },
        {
          [`& .${Le.icon}`]: t[`icon${Q(l)}`],
        },
        {
          [`& .${Le.icon}`]: t[`iconColor${Q(a)}`],
        },
        {
          [`& .${Le.deleteIcon}`]: t.deleteIcon,
        },
        {
          [`& .${Le.deleteIcon}`]: t[`deleteIcon${Q(l)}`],
        },
        {
          [`& .${Le.deleteIcon}`]: t[`deleteIconColor${Q(r)}`],
        },
        {
          [`& .${Le.deleteIcon}`]: t[`deleteIcon${Q(c)}Color${Q(r)}`],
        },
        t.root,
        t[`size${Q(l)}`],
        t[`color${Q(r)}`],
        i && t.clickable,
        i && r !== 'default' && t[`clickableColor${Q(r)})`],
        s && t.deletable,
        s && r !== 'default' && t[`deletableColor${Q(r)}`],
        t[c],
        t[`${c}${Q(r)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => {
      const o = Je(e.palette.text.primary, 0.26),
        r = e.palette.mode === 'light' ? e.palette.grey[700] : e.palette.grey[300];
      return g(
        {
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
          [`&.${Le.disabled}`]: {
            opacity: (e.vars || e).palette.action.disabledOpacity,
            pointerEvents: 'none',
          },
          [`& .${Le.avatar}`]: {
            marginLeft: 5,
            marginRight: -6,
            width: 24,
            height: 24,
            color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : r,
            fontSize: e.typography.pxToRem(12),
          },
          [`& .${Le.avatarColorPrimary}`]: {
            color: (e.vars || e).palette.primary.contrastText,
            backgroundColor: (e.vars || e).palette.primary.dark,
          },
          [`& .${Le.avatarColorSecondary}`]: {
            color: (e.vars || e).palette.secondary.contrastText,
            backgroundColor: (e.vars || e).palette.secondary.dark,
          },
          [`& .${Le.avatarSmall}`]: {
            marginLeft: 4,
            marginRight: -4,
            width: 18,
            height: 18,
            fontSize: e.typography.pxToRem(10),
          },
          [`& .${Le.icon}`]: g(
            {
              marginLeft: 5,
              marginRight: -6,
            },
            t.size === 'small' && {
              fontSize: 18,
              marginLeft: 4,
              marginRight: -4,
            },
            t.iconColor === t.color &&
              g(
                {
                  color: e.vars ? e.vars.palette.Chip.defaultIconColor : r,
                },
                t.color !== 'default' && {
                  color: 'inherit',
                },
              ),
          ),
          [`& .${Le.deleteIcon}`]: g(
            {
              WebkitTapHighlightColor: 'transparent',
              color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.26)` : o,
              fontSize: 22,
              cursor: 'pointer',
              margin: '0 5px 0 -6px',
              '&:hover': {
                color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)` : Je(o, 0.4),
              },
            },
            t.size === 'small' && {
              fontSize: 16,
              marginRight: 4,
              marginLeft: -4,
            },
            t.color !== 'default' && {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`
                : Je(e.palette[t.color].contrastText, 0.7),
              '&:hover, &:active': {
                color: (e.vars || e).palette[t.color].contrastText,
              },
            },
          ),
        },
        t.size === 'small' && {
          height: 24,
        },
        t.color !== 'default' && {
          backgroundColor: (e.vars || e).palette[t.color].main,
          color: (e.vars || e).palette[t.color].contrastText,
        },
        t.onDelete && {
          [`&.${Le.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Je(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        t.onDelete &&
          t.color !== 'default' && {
            [`&.${Le.focusVisible}`]: {
              backgroundColor: (e.vars || e).palette[t.color].dark,
            },
          },
      );
    },
    ({ theme: e, ownerState: t }) =>
      g(
        {},
        t.clickable && {
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
          [`&.${Le.focusVisible}`]: {
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
        },
        t.clickable &&
          t.color !== 'default' && {
            [`&:hover, &.${Le.focusVisible}`]: {
              backgroundColor: (e.vars || e).palette[t.color].dark,
            },
          },
      ),
    ({ theme: e, ownerState: t }) =>
      g(
        {},
        t.variant === 'outlined' && {
          backgroundColor: 'transparent',
          border: e.vars
            ? `1px solid ${e.vars.palette.Chip.defaultBorder}`
            : `1px solid ${e.palette.mode === 'light' ? e.palette.grey[400] : e.palette.grey[700]}`,
          [`&.${Le.clickable}:hover`]: {
            backgroundColor: (e.vars || e).palette.action.hover,
          },
          [`&.${Le.focusVisible}`]: {
            backgroundColor: (e.vars || e).palette.action.focus,
          },
          [`& .${Le.avatar}`]: {
            marginLeft: 4,
          },
          [`& .${Le.avatarSmall}`]: {
            marginLeft: 2,
          },
          [`& .${Le.icon}`]: {
            marginLeft: 4,
          },
          [`& .${Le.iconSmall}`]: {
            marginLeft: 2,
          },
          [`& .${Le.deleteIcon}`]: {
            marginRight: 5,
          },
          [`& .${Le.deleteIconSmall}`]: {
            marginRight: 3,
          },
        },
        t.variant === 'outlined' &&
          t.color !== 'default' && {
            color: (e.vars || e).palette[t.color].main,
            border: `1px solid ${
              e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : Je(e.palette[t.color].main, 0.7)
            }`,
            [`&.${Le.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Je(e.palette[t.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${Le.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : Je(e.palette[t.color].main, e.palette.action.focusOpacity),
            },
            [`& .${Le.deleteIcon}`]: {
              color: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`
                : Je(e.palette[t.color].main, 0.7),
              '&:hover, &:active': {
                color: (e.vars || e).palette[t.color].main,
              },
            },
          },
      ),
  ),
  Kg = pe('span', {
    name: 'MuiChip',
    slot: 'Label',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { size: r } = o;
      return [t.label, t[`label${Q(r)}`]];
    },
  })(({ ownerState: e }) =>
    g(
      {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingLeft: 12,
        paddingRight: 12,
        whiteSpace: 'nowrap',
      },
      e.size === 'small' && {
        paddingLeft: 8,
        paddingRight: 8,
      },
    ),
  );
function Us(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const kc = /* @__PURE__ */ x.forwardRef(function (t, o) {
  const r = ze({
      props: t,
      name: 'MuiChip',
    }),
    {
      avatar: a,
      className: i,
      clickable: s,
      color: l = 'default',
      component: c,
      deleteIcon: u,
      disabled: d = !1,
      icon: p,
      label: b,
      onClick: y,
      onDelete: v,
      onKeyDown: h,
      onKeyUp: m,
      size: S = 'medium',
      variant: T = 'filled',
      tabIndex: C,
      skipFocusWhenDisabled: E = !1,
    } = r,
    f = Ce(r, Hg),
    w = x.useRef(null),
    k = dt(w, o),
    V = (G) => {
      G.stopPropagation(), v && v(G);
    },
    L = (G) => {
      G.currentTarget === G.target && Us(G) && G.preventDefault(), h && h(G);
    },
    D = (G) => {
      G.currentTarget === G.target &&
        (v && Us(G) ? v(G) : G.key === 'Escape' && w.current && w.current.blur()),
        m && m(G);
    },
    _ = s !== !1 && y ? !0 : s,
    Y = _ || v ? oo : c || 'div',
    B = g({}, r, {
      component: Y,
      disabled: d,
      size: S,
      color: l,
      iconColor: /* @__PURE__ */ (x.isValidElement(p) && p.props.color) || l,
      onDelete: !!v,
      clickable: _,
      variant: T,
    }),
    M = qg(B),
    F =
      Y === oo
        ? g(
            {
              component: c || 'div',
              focusVisibleClassName: M.focusVisible,
            },
            v && {
              disableRipple: !0,
            },
          )
        : {};
  let z = null;
  v &&
    (z =
      u && /* @__PURE__ */ x.isValidElement(u)
        ? /* @__PURE__ */ x.cloneElement(u, {
            className: Ee(u.props.className, M.deleteIcon),
            onClick: V,
          })
        : /* @__PURE__ */ A(Bg, {
            className: Ee(M.deleteIcon),
            onClick: V,
          }));
  let ie = null;
  a &&
    /* @__PURE__ */ x.isValidElement(a) &&
    (ie = /* @__PURE__ */ x.cloneElement(a, {
      className: Ee(M.avatar, a.props.className),
    }));
  let se = null;
  return (
    p &&
      /* @__PURE__ */ x.isValidElement(p) &&
      (se = /* @__PURE__ */ x.cloneElement(p, {
        className: Ee(M.icon, p.props.className),
      })),
    process.env.NODE_ENV !== 'production' &&
      ie &&
      se &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    /* @__PURE__ */ Qe(
      Yg,
      g(
        {
          as: Y,
          className: Ee(M.root, i),
          disabled: _ && d ? !0 : void 0,
          onClick: y,
          onKeyDown: L,
          onKeyUp: D,
          ref: k,
          tabIndex: E && d ? -1 : C,
          ownerState: B,
        },
        F,
        f,
        {
          children: [
            ie || se,
            /* @__PURE__ */ A(Kg, {
              className: Ee(M.label),
              ownerState: B,
              children: b,
            }),
            z,
          ],
        },
      ),
    )
  );
});
process.env.NODE_ENV !== 'production' &&
  (kc.propTypes = {
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
    children: gd,
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
const Gg = kc;
function lo({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, a) => ((r[a] = e[a]), o && typeof e[a] > 'u' && (r[a] = o[a]), r), {});
}
const Rc = /* @__PURE__ */ x.createContext(void 0);
process.env.NODE_ENV !== 'production' && (Rc.displayName = 'FormControlContext');
const si = Rc;
function Dn() {
  return x.useContext(si);
}
function Nc(e) {
  return /* @__PURE__ */ A(
    Hl,
    g({}, e, {
      defaultTheme: Mr,
    }),
  );
}
process.env.NODE_ENV !== 'production' &&
  (Nc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The styles you want to apply globally.
     */
    styles: n.oneOfType([
      n.func,
      n.number,
      n.object,
      n.shape({
        __emotion_styles: n.any.isRequired,
      }),
      n.string,
      n.bool,
    ]),
  });
function Ws(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function li(e, t = !1) {
  return (
    e && ((Ws(e.value) && e.value !== '') || (t && Ws(e.defaultValue) && e.defaultValue !== ''))
  );
}
function Xg(e) {
  return e.startAdornment;
}
function Jg(e) {
  return Ae('MuiInputBase', e);
}
const Zg = Pe('MuiInputBase', [
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
  $t = Zg,
  Qg = [
    'aria-describedby',
    'autoComplete',
    'autoFocus',
    'className',
    'color',
    'components',
    'componentsProps',
    'defaultValue',
    'disabled',
    'disableInjectingGlobalStyles',
    'endAdornment',
    'error',
    'fullWidth',
    'id',
    'inputComponent',
    'inputProps',
    'inputRef',
    'margin',
    'maxRows',
    'minRows',
    'multiline',
    'name',
    'onBlur',
    'onChange',
    'onClick',
    'onFocus',
    'onKeyDown',
    'onKeyUp',
    'placeholder',
    'readOnly',
    'renderSuffix',
    'rows',
    'size',
    'slotProps',
    'slots',
    'startAdornment',
    'type',
    'value',
  ],
  jr = (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      o.formControl && t.formControl,
      o.startAdornment && t.adornedStart,
      o.endAdornment && t.adornedEnd,
      o.error && t.error,
      o.size === 'small' && t.sizeSmall,
      o.multiline && t.multiline,
      o.color && t[`color${Q(o.color)}`],
      o.fullWidth && t.fullWidth,
      o.hiddenLabel && t.hiddenLabel,
    ];
  },
  Vr = (e, t) => {
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
        error: a,
        endAdornment: i,
        focused: s,
        formControl: l,
        fullWidth: c,
        hiddenLabel: u,
        multiline: d,
        readOnly: p,
        size: b,
        startAdornment: y,
        type: v,
      } = e,
      h = {
        root: [
          'root',
          `color${Q(o)}`,
          r && 'disabled',
          a && 'error',
          c && 'fullWidth',
          s && 'focused',
          l && 'formControl',
          b === 'small' && 'sizeSmall',
          d && 'multiline',
          y && 'adornedStart',
          i && 'adornedEnd',
          u && 'hiddenLabel',
          p && 'readOnly',
        ],
        input: [
          'input',
          r && 'disabled',
          v === 'search' && 'inputTypeSearch',
          d && 'inputMultiline',
          b === 'small' && 'inputSizeSmall',
          u && 'inputHiddenLabel',
          y && 'inputAdornedStart',
          i && 'inputAdornedEnd',
          p && 'readOnly',
        ],
      };
    return Fe(h, Jg, t);
  },
  zr = pe('div', {
    name: 'MuiInputBase',
    slot: 'Root',
    overridesResolver: jr,
  })(({ theme: e, ownerState: t }) =>
    g(
      {},
      e.typography.body1,
      {
        color: (e.vars || e).palette.text.primary,
        lineHeight: '1.4375em',
        // 23px
        boxSizing: 'border-box',
        // Prevent padding issue with fullWidth.
        position: 'relative',
        cursor: 'text',
        display: 'inline-flex',
        alignItems: 'center',
        [`&.${$t.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
          cursor: 'default',
        },
      },
      t.multiline &&
        g(
          {
            padding: '4px 0 5px',
          },
          t.size === 'small' && {
            paddingTop: 1,
          },
        ),
      t.fullWidth && {
        width: '100%',
      },
    ),
  ),
  Br = pe('input', {
    name: 'MuiInputBase',
    slot: 'Input',
    overridesResolver: Vr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light',
      r = g(
        {
          color: 'currentColor',
        },
        e.vars
          ? {
              opacity: e.vars.opacity.inputPlaceholder,
            }
          : {
              opacity: o ? 0.42 : 0.5,
            },
        {
          transition: e.transitions.create('opacity', {
            duration: e.transitions.duration.shorter,
          }),
        },
      ),
      a = {
        opacity: '0 !important',
      },
      i = e.vars
        ? {
            opacity: e.vars.opacity.inputPlaceholder,
          }
        : {
            opacity: o ? 0.42 : 0.5,
          };
    return g(
      {
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
        [`label[data-shrink=false] + .${$t.formControl} &`]: {
          '&::-webkit-input-placeholder': a,
          '&::-moz-placeholder': a,
          // Firefox 19+
          '&:-ms-input-placeholder': a,
          // IE11
          '&::-ms-input-placeholder': a,
          // Edge
          '&:focus::-webkit-input-placeholder': i,
          '&:focus::-moz-placeholder': i,
          // Firefox 19+
          '&:focus:-ms-input-placeholder': i,
          // IE11
          '&:focus::-ms-input-placeholder': i,
          // Edge
        },
        [`&.${$t.disabled}`]: {
          opacity: 1,
          // Reset iOS opacity
          WebkitTextFillColor: (e.vars || e).palette.text.disabled,
          // Fix opacity Safari bug
        },
        '&:-webkit-autofill': {
          animationDuration: '5000s',
          animationName: 'mui-auto-fill',
        },
      },
      t.size === 'small' && {
        paddingTop: 1,
      },
      t.multiline && {
        height: 'auto',
        resize: 'none',
        padding: 0,
        paddingTop: 0,
      },
      t.type === 'search' && {
        // Improve type search style.
        MozAppearance: 'textfield',
      },
    );
  }),
  tv = /* @__PURE__ */ A(Nc, {
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
  $c = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r;
    const a = ze({
        props: t,
        name: 'MuiInputBase',
      }),
      {
        'aria-describedby': i,
        autoComplete: s,
        autoFocus: l,
        className: c,
        components: u = {},
        componentsProps: d = {},
        defaultValue: p,
        disabled: b,
        disableInjectingGlobalStyles: y,
        endAdornment: v,
        fullWidth: h = !1,
        id: m,
        inputComponent: S = 'input',
        inputProps: T = {},
        inputRef: C,
        maxRows: E,
        minRows: f,
        multiline: w = !1,
        name: k,
        onBlur: V,
        onChange: L,
        onClick: D,
        onFocus: _,
        onKeyDown: Y,
        onKeyUp: B,
        placeholder: M,
        readOnly: F,
        renderSuffix: z,
        rows: ie,
        slotProps: se = {},
        slots: G = {},
        startAdornment: R,
        type: j = 'text',
        value: X,
      } = a,
      H = Ce(a, Qg),
      U = T.value != null ? T.value : X,
      { current: ne } = x.useRef(U != null),
      oe = x.useRef(),
      J = x.useCallback((fe) => {
        process.env.NODE_ENV !== 'production' &&
          fe &&
          fe.nodeName !== 'INPUT' &&
          !fe.focus &&
          console.error(
            [
              'MUI: You have provided a `inputComponent` to the input component',
              'that does not correctly handle the `ref` prop.',
              'Make sure the `ref` prop is called with a HTMLInputElement.',
            ].join(`
`),
          );
      }, []),
      ae = dt(oe, C, T.ref, J),
      [le, he] = x.useState(!1),
      re = Dn();
    process.env.NODE_ENV !== 'production' &&
      x.useEffect(() => {
        if (re) return re.registerEffect();
      }, [re]);
    const P = lo({
      props: a,
      muiFormControl: re,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (P.focused = re ? re.focused : le),
      x.useEffect(() => {
        !re && b && le && (he(!1), V && V());
      }, [re, b, le, V]);
    const Oe = re && re.onFilled,
      I = re && re.onEmpty,
      W = x.useCallback(
        (fe) => {
          li(fe) ? Oe && Oe() : I && I();
        },
        [Oe, I],
      );
    rn(() => {
      ne &&
        W({
          value: U,
        });
    }, [U, W, ne]);
    const Ne = (fe) => {
        if (P.disabled) {
          fe.stopPropagation();
          return;
        }
        _ && _(fe), T.onFocus && T.onFocus(fe), re && re.onFocus ? re.onFocus(fe) : he(!0);
      },
      ge = (fe) => {
        V && V(fe), T.onBlur && T.onBlur(fe), re && re.onBlur ? re.onBlur(fe) : he(!1);
      },
      et = (fe, ...ue) => {
        if (!ne) {
          const ee = fe.target || oe.current;
          if (ee == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : Cn(1),
            );
          W({
            value: ee.value,
          });
        }
        T.onChange && T.onChange(fe, ...ue), L && L(fe, ...ue);
      };
    x.useEffect(() => {
      W(oe.current);
    }, []);
    const je = (fe) => {
      oe.current && fe.currentTarget === fe.target && oe.current.focus(), D && D(fe);
    };
    let Se = S,
      ke = T;
    w &&
      Se === 'input' &&
      (ie
        ? (process.env.NODE_ENV !== 'production' &&
            (f || E) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (ke = g(
            {
              type: void 0,
              minRows: ie,
              maxRows: ie,
            },
            ke,
          )))
        : (ke = g(
            {
              type: void 0,
              maxRows: E,
              minRows: f,
            },
            ke,
          )),
      (Se = Ub));
    const tt = (fe) => {
      W(
        fe.animationName === 'mui-auto-fill-cancel'
          ? oe.current
          : {
              value: 'x',
            },
      );
    };
    x.useEffect(() => {
      re && re.setAdornedStart(!!R);
    }, [re, R]);
    const at = g({}, a, {
        color: P.color || 'primary',
        disabled: P.disabled,
        endAdornment: v,
        error: P.error,
        focused: P.focused,
        formControl: re,
        fullWidth: h,
        hiddenLabel: P.hiddenLabel,
        multiline: w,
        size: P.size,
        startAdornment: R,
        type: j,
      }),
      Z = ev(at),
      me = G.root || u.Root || zr,
      ve = se.root || d.root || {},
      be = G.input || u.Input || Br;
    return (
      (ke = g({}, ke, (r = se.input) != null ? r : d.input)),
      /* @__PURE__ */ Qe(x.Fragment, {
        children: [
          !y && tv,
          /* @__PURE__ */ Qe(
            me,
            g(
              {},
              ve,
              !En(me) && {
                ownerState: g({}, at, ve.ownerState),
              },
              {
                ref: o,
                onClick: je,
              },
              H,
              {
                className: Ee(Z.root, ve.className, c, F && 'MuiInputBase-readOnly'),
                children: [
                  R,
                  /* @__PURE__ */ A(si.Provider, {
                    value: null,
                    children: /* @__PURE__ */ A(
                      be,
                      g(
                        {
                          ownerState: at,
                          'aria-invalid': P.error,
                          'aria-describedby': i,
                          autoComplete: s,
                          autoFocus: l,
                          defaultValue: p,
                          disabled: P.disabled,
                          id: m,
                          onAnimationStart: tt,
                          name: k,
                          placeholder: M,
                          readOnly: F,
                          required: P.required,
                          rows: ie,
                          value: U,
                          onKeyDown: Y,
                          onKeyUp: B,
                          type: j,
                        },
                        ke,
                        !En(be) && {
                          as: Se,
                          ownerState: g({}, at, ke.ownerState),
                        },
                        {
                          ref: ae,
                          className: Ee(Z.input, ke.className, F && 'MuiInputBase-readOnly'),
                          onBlur: ge,
                          onChange: et,
                          onFocus: Ne,
                        },
                      ),
                    ),
                  }),
                  v,
                  z
                    ? z(
                        g({}, P, {
                          startAdornment: R,
                        }),
                      )
                    : null,
                ],
              },
            ),
          ),
        ],
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  ($c.propTypes = {
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
    inputComponent: $a,
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * @default {}
     */
    inputProps: n.object,
    /**
     * Pass a ref to the `input` element.
     */
    inputRef: Nt,
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
const ci = $c;
function nv(e) {
  return Ae('MuiInput', e);
}
const ov = g({}, $t, Pe('MuiInput', ['root', 'underline', 'input'])),
  yn = ov;
function rv(e) {
  return Ae('MuiOutlinedInput', e);
}
const av = g({}, $t, Pe('MuiOutlinedInput', ['root', 'notchedOutline', 'input'])),
  Qt = av;
function iv(e) {
  return Ae('MuiFilledInput', e);
}
const sv = g({}, $t, Pe('MuiFilledInput', ['root', 'underline', 'input'])),
  Pt = sv,
  Pc = so(
    /* @__PURE__ */ A('path', {
      d: 'M7 10l5 5 5-5z',
    }),
    'ArrowDropDown',
  );
function lv(e) {
  return Ae('MuiAutocomplete', e);
}
const cv = Pe('MuiAutocomplete', [
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
  $e = cv;
var Hs, qs;
const uv = [
    'autoComplete',
    'autoHighlight',
    'autoSelect',
    'blurOnSelect',
    'ChipProps',
    'className',
    'clearIcon',
    'clearOnBlur',
    'clearOnEscape',
    'clearText',
    'closeText',
    'componentsProps',
    'defaultValue',
    'disableClearable',
    'disableCloseOnSelect',
    'disabled',
    'disabledItemsFocusable',
    'disableListWrap',
    'disablePortal',
    'filterOptions',
    'filterSelectedOptions',
    'forcePopupIcon',
    'freeSolo',
    'fullWidth',
    'getLimitTagsText',
    'getOptionDisabled',
    'getOptionLabel',
    'isOptionEqualToValue',
    'groupBy',
    'handleHomeEndKeys',
    'id',
    'includeInputInList',
    'inputValue',
    'limitTags',
    'ListboxComponent',
    'ListboxProps',
    'loading',
    'loadingText',
    'multiple',
    'noOptionsText',
    'onChange',
    'onClose',
    'onHighlightChange',
    'onInputChange',
    'onOpen',
    'open',
    'openOnFocus',
    'openText',
    'options',
    'PaperComponent',
    'PopperComponent',
    'popupIcon',
    'readOnly',
    'renderGroup',
    'renderInput',
    'renderOption',
    'renderTags',
    'selectOnFocus',
    'size',
    'slotProps',
    'value',
  ],
  dv = (e) => {
    const {
        classes: t,
        disablePortal: o,
        expanded: r,
        focused: a,
        fullWidth: i,
        hasClearIcon: s,
        hasPopupIcon: l,
        inputFocused: c,
        popupOpen: u,
        size: d,
      } = e,
      p = {
        root: [
          'root',
          r && 'expanded',
          a && 'focused',
          i && 'fullWidth',
          s && 'hasClearIcon',
          l && 'hasPopupIcon',
        ],
        inputRoot: ['inputRoot'],
        input: ['input', c && 'inputFocused'],
        tag: ['tag', `tagSize${Q(d)}`],
        endAdornment: ['endAdornment'],
        clearIndicator: ['clearIndicator'],
        popupIndicator: ['popupIndicator', u && 'popupIndicatorOpen'],
        popper: ['popper', o && 'popperDisablePortal'],
        paper: ['paper'],
        listbox: ['listbox'],
        loading: ['loading'],
        noOptions: ['noOptions'],
        option: ['option'],
        groupLabel: ['groupLabel'],
        groupUl: ['groupUl'],
      };
    return Fe(p, lv, t);
  },
  pv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: a, hasPopupIcon: i, inputFocused: s, size: l } = o;
      return [
        {
          [`& .${$e.tag}`]: t.tag,
        },
        {
          [`& .${$e.tag}`]: t[`tagSize${Q(l)}`],
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
        i && t.hasPopupIcon,
        a && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) =>
    g(
      {
        [`&.${$e.focused} .${$e.clearIndicator}`]: {
          visibility: 'visible',
        },
        /* Avoid double tap issue on iOS */
        '@media (pointer: fine)': {
          [`&:hover .${$e.clearIndicator}`]: {
            visibility: 'visible',
          },
        },
      },
      e.fullWidth && {
        width: '100%',
      },
      {
        [`& .${$e.tag}`]: g(
          {
            margin: 3,
            maxWidth: 'calc(100% - 6px)',
          },
          e.size === 'small' && {
            margin: 2,
            maxWidth: 'calc(100% - 4px)',
          },
        ),
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
        [`& .${yn.root}`]: {
          paddingBottom: 1,
          '& .MuiInput-input': {
            padding: '4px 4px 4px 0px',
          },
        },
        [`& .${yn.root}.${$t.sizeSmall}`]: {
          [`& .${yn.input}`]: {
            padding: '2px 4px 3px 0',
          },
        },
        [`& .${Qt.root}`]: {
          padding: 9,
          [`.${$e.hasPopupIcon}&, .${$e.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${$e.hasPopupIcon}.${$e.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${$e.input}`]: {
            padding: '7.5px 4px 7.5px 6px',
          },
          [`& .${$e.endAdornment}`]: {
            right: 9,
          },
        },
        [`& .${Qt.root}.${$t.sizeSmall}`]: {
          // Don't specify paddingRight, as it overrides the default value set when there is only
          // one of the popup or clear icon as the specificity is equal so the latter one wins
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${$e.input}`]: {
            padding: '2.5px 4px 2.5px 6px',
          },
        },
        [`& .${Pt.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${$e.hasPopupIcon}&, .${$e.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${$e.hasPopupIcon}.${$e.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${Pt.input}`]: {
            padding: '7px 4px',
          },
          [`& .${$e.endAdornment}`]: {
            right: 9,
          },
        },
        [`& .${Pt.root}.${$t.sizeSmall}`]: {
          paddingBottom: 1,
          [`& .${Pt.input}`]: {
            padding: '2.5px 4px',
          },
        },
        [`& .${$t.hiddenLabel}`]: {
          paddingTop: 8,
        },
        [`& .${Pt.root}.${$t.hiddenLabel}`]: {
          paddingTop: 0,
          paddingBottom: 0,
          [`& .${$e.input}`]: {
            paddingTop: 16,
            paddingBottom: 17,
          },
        },
        [`& .${Pt.root}.${$t.hiddenLabel}.${$t.sizeSmall}`]: {
          [`& .${$e.input}`]: {
            paddingTop: 8,
            paddingBottom: 9,
          },
        },
        [`& .${$e.input}`]: g(
          {
            flexGrow: 1,
            textOverflow: 'ellipsis',
            opacity: 0,
          },
          e.inputFocused && {
            opacity: 1,
          },
        ),
      },
    ),
  ),
  fv = pe('div', {
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
  mv = pe(Tc, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  }),
  hv = pe(Tc, {
    name: 'MuiAutocomplete',
    slot: 'PopupIndicator',
    overridesResolver: ({ ownerState: e }, t) =>
      g({}, t.popupIndicator, e.popupOpen && t.popupIndicatorOpen),
  })(({ ownerState: e }) =>
    g(
      {
        padding: 2,
        marginRight: -2,
      },
      e.popupOpen && {
        transform: 'rotate(180deg)',
      },
    ),
  ),
  bv = pe(wc, {
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
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        zIndex: (e.vars || e).zIndex.modal,
      },
      t.disablePortal && {
        position: 'absolute',
      },
    ),
  ),
  gv = pe(Vo, {
    name: 'MuiAutocomplete',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })(({ theme: e }) =>
    g({}, e.typography.body1, {
      overflow: 'auto',
    }),
  ),
  vv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  yv = pe('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  xv = pe('div', {
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
  Ev = pe(zg, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({
    backgroundColor: (e.vars || e).palette.background.paper,
    top: -8,
  })),
  Cv = pe('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({
    padding: 0,
    [`& .${$e.option}`]: {
      paddingLeft: 24,
    },
  }),
  Ic = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = ze({
        props: t,
        name: 'MuiAutocomplete',
      }),
      {
        autoComplete: c = !1,
        autoHighlight: u = !1,
        autoSelect: d = !1,
        blurOnSelect: p = !1,
        ChipProps: b,
        className: y,
        clearIcon: v = Hs ||
          (Hs = /* @__PURE__ */ A(Mg, {
            fontSize: 'small',
          })),
        clearOnBlur: h = !l.freeSolo,
        clearOnEscape: m = !1,
        clearText: S = 'Clear',
        closeText: T = 'Close',
        componentsProps: C = {},
        defaultValue: E = l.multiple ? [] : null,
        disableClearable: f = !1,
        disableCloseOnSelect: w = !1,
        disabled: k = !1,
        disabledItemsFocusable: V = !1,
        disableListWrap: L = !1,
        disablePortal: D = !1,
        filterSelectedOptions: _ = !1,
        forcePopupIcon: Y = 'auto',
        freeSolo: B = !1,
        fullWidth: M = !1,
        getLimitTagsText: F = (_e) => `+${_e}`,
        getOptionLabel: z = (_e) => {
          var ut;
          return (ut = _e.label) != null ? ut : _e;
        },
        groupBy: ie,
        handleHomeEndKeys: se = !l.freeSolo,
        includeInputInList: G = !1,
        limitTags: R = -1,
        ListboxComponent: j = 'ul',
        ListboxProps: X,
        loading: H = !1,
        loadingText: U = 'Loading…',
        multiple: ne = !1,
        noOptionsText: oe = 'No options',
        openOnFocus: J = !1,
        openText: ae = 'Open',
        PaperComponent: le = Vo,
        PopperComponent: he = wc,
        popupIcon: re = qs || (qs = /* @__PURE__ */ A(Pc, {})),
        readOnly: P = !1,
        renderGroup: Oe,
        renderInput: I,
        renderOption: W,
        renderTags: Ne,
        selectOnFocus: ge = !l.freeSolo,
        size: et = 'medium',
        slotProps: je = {},
      } = l,
      Se = Ce(l, uv),
      {
        getRootProps: ke,
        getInputProps: tt,
        getInputLabelProps: at,
        getPopupIndicatorProps: Z,
        getClearProps: me,
        getTagProps: ve,
        getListboxProps: be,
        getOptionProps: fe,
        value: ue,
        dirty: ee,
        expanded: ye,
        id: xe,
        popupOpen: Ie,
        focused: it,
        focusedTag: ft,
        anchorEl: Tt,
        setAnchorEl: hn,
        inputValue: St,
        groupedOptions: bt,
      } = Yb(
        g({}, l, {
          componentName: 'Autocomplete',
        }),
      ),
      xt = !f && !k && ee && !P,
      mt = (!B || Y === !0) && Y !== !1,
      nt = g({}, l, {
        disablePortal: D,
        expanded: ye,
        focused: it,
        fullWidth: M,
        hasClearIcon: xt,
        hasPopupIcon: mt,
        inputFocused: ft === -1,
        popupOpen: Ie,
        size: et,
      }),
      ot = dv(nt);
    let ht;
    if (ne && ue.length > 0) {
      const _e = (ut) =>
        g(
          {
            className: ot.tag,
            disabled: k,
          },
          ve(ut),
        );
      Ne
        ? (ht = Ne(ue, _e, nt))
        : (ht = ue.map((ut, At) =>
            /* @__PURE__ */ A(
              Gg,
              g(
                {
                  label: z(ut),
                  size: et,
                },
                _e({
                  index: At,
                }),
                b,
              ),
            ),
          ));
    }
    if (R > -1 && Array.isArray(ht)) {
      const _e = ht.length - R;
      !it &&
        _e > 0 &&
        ((ht = ht.splice(0, R)),
        ht.push(
          /* @__PURE__ */ A(
            'span',
            {
              className: ot.tag,
              children: F(_e),
            },
            ht.length,
          ),
        ));
    }
    const Jt =
        Oe ||
        ((_e) =>
          /* @__PURE__ */ Qe(
            'li',
            {
              children: [
                /* @__PURE__ */ A(Ev, {
                  className: ot.groupLabel,
                  ownerState: nt,
                  component: 'div',
                  children: _e.group,
                }),
                /* @__PURE__ */ A(Cv, {
                  className: ot.groupUl,
                  ownerState: nt,
                  children: _e.children,
                }),
              ],
            },
            _e.key,
          )),
      Bt =
        W ||
        ((_e, ut) =>
          /* @__PURE__ */ A(
            'li',
            g({}, _e, {
              children: z(ut),
            }),
          )),
      ln = (_e, ut) => {
        const At = fe({
          option: _e,
          index: ut,
        });
        return Bt(
          g({}, At, {
            className: ot.option,
          }),
          _e,
          {
            selected: At['aria-selected'],
            index: ut,
            inputValue: St,
          },
        );
      },
      cn = (r = je.clearIndicator) != null ? r : C.clearIndicator,
      un = (a = je.paper) != null ? a : C.paper,
      Zt = (i = je.popper) != null ? i : C.popper,
      dn = (s = je.popupIndicator) != null ? s : C.popupIndicator;
    return /* @__PURE__ */ Qe(x.Fragment, {
      children: [
        /* @__PURE__ */ A(
          pv,
          g(
            {
              ref: o,
              className: Ee(ot.root, y),
              ownerState: nt,
            },
            ke(Se),
            {
              children: I({
                id: xe,
                disabled: k,
                fullWidth: !0,
                size: et === 'small' ? 'small' : void 0,
                InputLabelProps: at(),
                InputProps: g(
                  {
                    ref: hn,
                    className: ot.inputRoot,
                    startAdornment: ht,
                  },
                  (xt || mt) && {
                    endAdornment: /* @__PURE__ */ Qe(fv, {
                      className: ot.endAdornment,
                      ownerState: nt,
                      children: [
                        xt
                          ? /* @__PURE__ */ A(
                              mv,
                              g(
                                {},
                                me(),
                                {
                                  'aria-label': S,
                                  title: S,
                                  ownerState: nt,
                                },
                                cn,
                                {
                                  className: Ee(
                                    ot.clearIndicator,
                                    cn == null ? void 0 : cn.className,
                                  ),
                                  children: v,
                                },
                              ),
                            )
                          : null,
                        mt
                          ? /* @__PURE__ */ A(
                              hv,
                              g(
                                {},
                                Z(),
                                {
                                  disabled: k,
                                  'aria-label': Ie ? T : ae,
                                  title: Ie ? T : ae,
                                  ownerState: nt,
                                },
                                dn,
                                {
                                  className: Ee(
                                    ot.popupIndicator,
                                    dn == null ? void 0 : dn.className,
                                  ),
                                  children: re,
                                },
                              ),
                            )
                          : null,
                      ],
                    }),
                  },
                ),
                inputProps: g(
                  {
                    className: ot.input,
                    disabled: k,
                    readOnly: P,
                  },
                  tt(),
                ),
              }),
            },
          ),
        ),
        Tt
          ? /* @__PURE__ */ A(
              bv,
              g(
                {
                  as: he,
                  disablePortal: D,
                  style: {
                    width: Tt ? Tt.clientWidth : null,
                  },
                  ownerState: nt,
                  role: 'presentation',
                  anchorEl: Tt,
                  open: Ie,
                },
                Zt,
                {
                  className: Ee(ot.popper, Zt == null ? void 0 : Zt.className),
                  children: /* @__PURE__ */ Qe(
                    gv,
                    g(
                      {
                        ownerState: nt,
                        as: le,
                      },
                      un,
                      {
                        className: Ee(ot.paper, un == null ? void 0 : un.className),
                        children: [
                          H && bt.length === 0
                            ? /* @__PURE__ */ A(vv, {
                                className: ot.loading,
                                ownerState: nt,
                                children: U,
                              })
                            : null,
                          bt.length === 0 && !B && !H
                            ? /* @__PURE__ */ A(yv, {
                                className: ot.noOptions,
                                ownerState: nt,
                                role: 'presentation',
                                onMouseDown: (_e) => {
                                  _e.preventDefault();
                                },
                                children: oe,
                              })
                            : null,
                          bt.length > 0
                            ? /* @__PURE__ */ A(
                                xv,
                                g(
                                  {
                                    as: j,
                                    className: ot.listbox,
                                    ownerState: nt,
                                  },
                                  be(),
                                  X,
                                  {
                                    children: bt.map((_e, ut) =>
                                      ie
                                        ? Jt({
                                            key: _e.key,
                                            group: _e.group,
                                            children: _e.options.map((At, O) =>
                                              ln(At, _e.index + O),
                                            ),
                                          })
                                        : ln(_e, ut),
                                    ),
                                  },
                                ),
                              )
                            : null,
                        ],
                      },
                    ),
                  ),
                },
              ),
            )
          : null,
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Ic.propTypes = {
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
    defaultValue: Kt(n.any, (e) =>
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
    limitTags: Ia,
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
    value: Kt(n.any, (e) =>
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
const Ov = Ic,
  Tv = [
    'addEndListener',
    'appear',
    'children',
    'easing',
    'in',
    'onEnter',
    'onEntered',
    'onEntering',
    'onExit',
    'onExited',
    'onExiting',
    'style',
    'timeout',
    'TransitionComponent',
  ],
  Sv = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
  },
  _c = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = io(),
      a = {
        enter: r.transitions.duration.enteringScreen,
        exit: r.transitions.duration.leavingScreen,
      },
      {
        addEndListener: i,
        appear: s = !0,
        children: l,
        easing: c,
        in: u,
        onEnter: d,
        onEntered: p,
        onEntering: b,
        onExit: y,
        onExited: v,
        onExiting: h,
        style: m,
        timeout: S = a,
        // eslint-disable-next-line react/prop-types
        TransitionComponent: T = gc,
      } = t,
      C = Ce(t, Tv),
      E = x.useRef(null),
      f = dt(E, l.ref, o),
      w = (M) => (F) => {
        if (M) {
          const z = E.current;
          F === void 0 ? M(z) : M(z, F);
        }
      },
      k = w(b),
      V = w((M, F) => {
        vc(M);
        const z = hr(
          {
            style: m,
            timeout: S,
            easing: c,
          },
          {
            mode: 'enter',
          },
        );
        (M.style.webkitTransition = r.transitions.create('opacity', z)),
          (M.style.transition = r.transitions.create('opacity', z)),
          d && d(M, F);
      }),
      L = w(p),
      D = w(h),
      _ = w((M) => {
        const F = hr(
          {
            style: m,
            timeout: S,
            easing: c,
          },
          {
            mode: 'exit',
          },
        );
        (M.style.webkitTransition = r.transitions.create('opacity', F)),
          (M.style.transition = r.transitions.create('opacity', F)),
          y && y(M);
      }),
      Y = w(v);
    return /* @__PURE__ */ A(
      T,
      g(
        {
          appear: s,
          in: u,
          nodeRef: E,
          onEnter: V,
          onEntered: L,
          onEntering: k,
          onExit: _,
          onExited: Y,
          onExiting: D,
          addEndListener: (M) => {
            i && i(E.current, M);
          },
          timeout: S,
        },
        C,
        {
          children: (M, F) =>
            /* @__PURE__ */ x.cloneElement(
              l,
              g(
                {
                  style: g(
                    {
                      opacity: 0,
                      visibility: M === 'exited' && !u ? 'hidden' : void 0,
                    },
                    Sv[M],
                    m,
                    l.props.style,
                  ),
                  ref: f,
                },
                F,
              ),
            ),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (_c.propTypes = {
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
    children: ro.isRequired,
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
const wv = _c;
function kv(e) {
  return Ae('MuiBackdrop', e);
}
Pe('MuiBackdrop', ['root', 'invisible']);
const Rv = [
    'children',
    'className',
    'component',
    'components',
    'componentsProps',
    'invisible',
    'open',
    'slotProps',
    'slots',
    'TransitionComponent',
    'transitionDuration',
  ],
  Nv = (e) => {
    const { classes: t, invisible: o } = e;
    return Fe(
      {
        root: ['root', o && 'invisible'],
      },
      kv,
      t,
    );
  },
  $v = pe('div', {
    name: 'MuiBackdrop',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.invisible && t.invisible];
    },
  })(({ ownerState: e }) =>
    g(
      {
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
      },
      e.invisible && {
        backgroundColor: 'transparent',
      },
    ),
  ),
  Mc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a, i;
    const s = ze({
        props: t,
        name: 'MuiBackdrop',
      }),
      {
        children: l,
        className: c,
        component: u = 'div',
        components: d = {},
        componentsProps: p = {},
        invisible: b = !1,
        open: y,
        slotProps: v = {},
        slots: h = {},
        TransitionComponent: m = wv,
        transitionDuration: S,
      } = s,
      T = Ce(s, Rv),
      C = g({}, s, {
        component: u,
        invisible: b,
      }),
      E = Nv(C),
      f = (r = v.root) != null ? r : p.root;
    return /* @__PURE__ */ A(
      m,
      g(
        {
          in: y,
          timeout: S,
        },
        T,
        {
          children: /* @__PURE__ */ A(
            $v,
            g(
              {
                'aria-hidden': !0,
              },
              f,
              {
                as: (a = (i = h.root) != null ? i : d.Root) != null ? a : u,
                className: Ee(E.root, c, f == null ? void 0 : f.className),
                ownerState: g({}, C, f == null ? void 0 : f.ownerState),
                classes: E,
                ref: o,
                children: l,
              },
            ),
          ),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Mc.propTypes = {
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
const Pv = Mc;
function Iv(e) {
  return Ae('MuiButton', e);
}
const _v = Pe('MuiButton', [
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
  Go = _v,
  Ac = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== 'production' && (Ac.displayName = 'ButtonGroupContext');
const Mv = Ac,
  Av = [
    'children',
    'color',
    'component',
    'className',
    'disabled',
    'disableElevation',
    'disableFocusRipple',
    'endIcon',
    'focusVisibleClassName',
    'fullWidth',
    'size',
    'startIcon',
    'type',
    'variant',
  ],
  Dv = (e) => {
    const { color: t, disableElevation: o, fullWidth: r, size: a, variant: i, classes: s } = e,
      l = {
        root: [
          'root',
          i,
          `${i}${Q(t)}`,
          `size${Q(a)}`,
          `${i}Size${Q(a)}`,
          t === 'inherit' && 'colorInherit',
          o && 'disableElevation',
          r && 'fullWidth',
        ],
        label: ['label'],
        startIcon: ['startIcon', `iconSize${Q(a)}`],
        endIcon: ['endIcon', `iconSize${Q(a)}`],
      },
      c = Fe(l, Iv, s);
    return g({}, s, c);
  },
  Dc = (e) =>
    g(
      {},
      e.size === 'small' && {
        '& > *:nth-of-type(1)': {
          fontSize: 18,
        },
      },
      e.size === 'medium' && {
        '& > *:nth-of-type(1)': {
          fontSize: 20,
        },
      },
      e.size === 'large' && {
        '& > *:nth-of-type(1)': {
          fontSize: 22,
        },
      },
    ),
  Lv = pe(oo, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[o.variant],
        t[`${o.variant}${Q(o.color)}`],
        t[`size${Q(o.size)}`],
        t[`${o.variant}Size${Q(o.size)}`],
        o.color === 'inherit' && t.colorInherit,
        o.disableElevation && t.disableElevation,
        o.fullWidth && t.fullWidth,
      ];
    },
  })(
    ({ theme: e, ownerState: t }) => {
      var o, r;
      return g(
        {},
        e.typography.button,
        {
          minWidth: 64,
          padding: '6px 16px',
          borderRadius: (e.vars || e).shape.borderRadius,
          transition: e.transitions.create(
            ['background-color', 'box-shadow', 'border-color', 'color'],
            {
              duration: e.transitions.duration.short,
            },
          ),
          '&:hover': g(
            {
              textDecoration: 'none',
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
                : Je(e.palette.text.primary, e.palette.action.hoverOpacity),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            },
            t.variant === 'text' &&
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
              },
            t.variant === 'outlined' &&
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
              },
            t.variant === 'contained' && {
              backgroundColor: (e.vars || e).palette.grey.A100,
              boxShadow: (e.vars || e).shadows[4],
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                boxShadow: (e.vars || e).shadows[2],
                backgroundColor: (e.vars || e).palette.grey[300],
              },
            },
            t.variant === 'contained' &&
              t.color !== 'inherit' && {
                backgroundColor: (e.vars || e).palette[t.color].dark,
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                  backgroundColor: (e.vars || e).palette[t.color].main,
                },
              },
          ),
          '&:active': g(
            {},
            t.variant === 'contained' && {
              boxShadow: (e.vars || e).shadows[8],
            },
          ),
          [`&.${Go.focusVisible}`]: g(
            {},
            t.variant === 'contained' && {
              boxShadow: (e.vars || e).shadows[6],
            },
          ),
          [`&.${Go.disabled}`]: g(
            {
              color: (e.vars || e).palette.action.disabled,
            },
            t.variant === 'outlined' && {
              border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`,
            },
            t.variant === 'contained' && {
              color: (e.vars || e).palette.action.disabled,
              boxShadow: (e.vars || e).shadows[0],
              backgroundColor: (e.vars || e).palette.action.disabledBackground,
            },
          ),
        },
        t.variant === 'text' && {
          padding: '6px 8px',
        },
        t.variant === 'text' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].main,
          },
        t.variant === 'outlined' && {
          padding: '5px 15px',
          border: '1px solid currentColor',
        },
        t.variant === 'outlined' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].main,
            border: e.vars
              ? `1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)`
              : `1px solid ${Je(e.palette[t.color].main, 0.5)}`,
          },
        t.variant === 'contained' && {
          color: e.vars
            ? // this is safe because grey does not change between default light/dark mode
              e.vars.palette.text.primary
            : (o = (r = e.palette).getContrastText) == null
            ? void 0
            : o.call(r, e.palette.grey[300]),
          backgroundColor: (e.vars || e).palette.grey[300],
          boxShadow: (e.vars || e).shadows[2],
        },
        t.variant === 'contained' &&
          t.color !== 'inherit' && {
            color: (e.vars || e).palette[t.color].contrastText,
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        t.color === 'inherit' && {
          color: 'inherit',
          borderColor: 'currentColor',
        },
        t.size === 'small' &&
          t.variant === 'text' && {
            padding: '4px 5px',
            fontSize: e.typography.pxToRem(13),
          },
        t.size === 'large' &&
          t.variant === 'text' && {
            padding: '8px 11px',
            fontSize: e.typography.pxToRem(15),
          },
        t.size === 'small' &&
          t.variant === 'outlined' && {
            padding: '3px 9px',
            fontSize: e.typography.pxToRem(13),
          },
        t.size === 'large' &&
          t.variant === 'outlined' && {
            padding: '7px 21px',
            fontSize: e.typography.pxToRem(15),
          },
        t.size === 'small' &&
          t.variant === 'contained' && {
            padding: '4px 10px',
            fontSize: e.typography.pxToRem(13),
          },
        t.size === 'large' &&
          t.variant === 'contained' && {
            padding: '8px 22px',
            fontSize: e.typography.pxToRem(15),
          },
        t.fullWidth && {
          width: '100%',
        },
      );
    },
    ({ ownerState: e }) =>
      e.disableElevation && {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        [`&.${Go.focusVisible}`]: {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        [`&.${Go.disabled}`]: {
          boxShadow: 'none',
        },
      },
  ),
  Fv = pe('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${Q(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    g(
      {
        display: 'inherit',
        marginRight: 8,
        marginLeft: -4,
      },
      e.size === 'small' && {
        marginLeft: -2,
      },
      Dc(e),
    ),
  ),
  jv = pe('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${Q(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    g(
      {
        display: 'inherit',
        marginRight: -4,
        marginLeft: 8,
      },
      e.size === 'small' && {
        marginRight: -2,
      },
      Dc(e),
    ),
  ),
  Lc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = x.useContext(Mv),
      a = _a(r, t),
      i = ze({
        props: a,
        name: 'MuiButton',
      }),
      {
        children: s,
        color: l = 'primary',
        component: c = 'button',
        className: u,
        disabled: d = !1,
        disableElevation: p = !1,
        disableFocusRipple: b = !1,
        endIcon: y,
        focusVisibleClassName: v,
        fullWidth: h = !1,
        size: m = 'medium',
        startIcon: S,
        type: T,
        variant: C = 'text',
      } = i,
      E = Ce(i, Av),
      f = g({}, i, {
        color: l,
        component: c,
        disabled: d,
        disableElevation: p,
        disableFocusRipple: b,
        fullWidth: h,
        size: m,
        type: T,
        variant: C,
      }),
      w = Dv(f),
      k =
        S &&
        /* @__PURE__ */ A(Fv, {
          className: w.startIcon,
          ownerState: f,
          children: S,
        }),
      V =
        y &&
        /* @__PURE__ */ A(jv, {
          className: w.endIcon,
          ownerState: f,
          children: y,
        });
    return /* @__PURE__ */ Qe(
      Lv,
      g(
        {
          ownerState: f,
          className: Ee(r.className, w.root, u),
          component: c,
          disabled: d,
          focusRipple: !b,
          focusVisibleClassName: Ee(w.focusVisible, v),
          ref: o,
          type: T,
        },
        E,
        {
          classes: w,
          children: [k, s, V],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Lc.propTypes = {
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
const Vv = Lc;
function zv(e) {
  return Ae('PrivateSwitchBase', e);
}
Pe('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const Bv = [
    'autoFocus',
    'checked',
    'checkedIcon',
    'className',
    'defaultChecked',
    'disabled',
    'disableFocusRipple',
    'edge',
    'icon',
    'id',
    'inputProps',
    'inputRef',
    'name',
    'onBlur',
    'onChange',
    'onFocus',
    'readOnly',
    'required',
    'tabIndex',
    'type',
    'value',
  ],
  Uv = (e) => {
    const { classes: t, checked: o, disabled: r, edge: a } = e,
      i = {
        root: ['root', o && 'checked', r && 'disabled', a && `edge${Q(a)}`],
        input: ['input'],
      };
    return Fe(i, zv, t);
  },
  Wv = pe(oo)(({ ownerState: e }) =>
    g(
      {
        padding: 9,
        borderRadius: '50%',
      },
      e.edge === 'start' && {
        marginLeft: e.size === 'small' ? -3 : -12,
      },
      e.edge === 'end' && {
        marginRight: e.size === 'small' ? -3 : -12,
      },
    ),
  ),
  Hv = pe('input')({
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
  Fc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const {
        autoFocus: r,
        checked: a,
        checkedIcon: i,
        className: s,
        defaultChecked: l,
        disabled: c,
        disableFocusRipple: u = !1,
        edge: d = !1,
        icon: p,
        id: b,
        inputProps: y,
        inputRef: v,
        name: h,
        onBlur: m,
        onChange: S,
        onFocus: T,
        readOnly: C,
        required: E = !1,
        tabIndex: f,
        type: w,
        value: k,
      } = t,
      V = Ce(t, Bv),
      [L, D] = Pn({
        controlled: a,
        default: !!l,
        name: 'SwitchBase',
        state: 'checked',
      }),
      _ = Dn(),
      Y = (G) => {
        T && T(G), _ && _.onFocus && _.onFocus(G);
      },
      B = (G) => {
        m && m(G), _ && _.onBlur && _.onBlur(G);
      },
      M = (G) => {
        if (G.nativeEvent.defaultPrevented) return;
        const R = G.target.checked;
        D(R), S && S(G, R);
      };
    let F = c;
    _ && typeof F > 'u' && (F = _.disabled);
    const z = w === 'checkbox' || w === 'radio',
      ie = g({}, t, {
        checked: L,
        disabled: F,
        disableFocusRipple: u,
        edge: d,
      }),
      se = Uv(ie);
    return /* @__PURE__ */ Qe(
      Wv,
      g(
        {
          component: 'span',
          className: Ee(se.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: F,
          tabIndex: null,
          role: void 0,
          onFocus: Y,
          onBlur: B,
          ownerState: ie,
          ref: o,
        },
        V,
        {
          children: [
            /* @__PURE__ */ A(
              Hv,
              g(
                {
                  autoFocus: r,
                  checked: a,
                  defaultChecked: l,
                  className: se.input,
                  disabled: F,
                  id: z ? b : void 0,
                  name: h,
                  onChange: M,
                  readOnly: C,
                  ref: v,
                  required: E,
                  ownerState: ie,
                  tabIndex: f,
                  type: w,
                },
                w === 'checkbox' && k === void 0
                  ? {}
                  : {
                      value: k,
                    },
                y,
              ),
            ),
            L ? i : p,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Fc.propTypes = {
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
    inputRef: Nt,
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
const jc = Fc,
  qv = so(
    /* @__PURE__ */ A('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  Yv = so(
    /* @__PURE__ */ A('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Kv = so(
    /* @__PURE__ */ A('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function Gv(e) {
  return Ae('MuiCheckbox', e);
}
const Xv = Pe('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  oa = Xv,
  Jv = [
    'checkedIcon',
    'color',
    'icon',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'size',
    'className',
  ],
  Zv = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      a = {
        root: ['root', o && 'indeterminate', `color${Q(r)}`],
      },
      i = Fe(a, Gv, t);
    return g({}, t, i);
  },
  Qv = pe(jc, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiCheckbox',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.indeterminate && t.indeterminate,
        o.color !== 'default' && t[`color${Q(o.color)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        color: (e.vars || e).palette.text.secondary,
      },
      !t.disableRipple && {
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
      },
      t.color !== 'default' && {
        [`&.${oa.checked}, &.${oa.indeterminate}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${oa.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
        },
      },
    ),
  ),
  ey = /* @__PURE__ */ A(Yv, {}),
  ty = /* @__PURE__ */ A(qv, {}),
  ny = /* @__PURE__ */ A(Kv, {}),
  Vc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a;
    const i = ze({
        props: t,
        name: 'MuiCheckbox',
      }),
      {
        checkedIcon: s = ey,
        color: l = 'primary',
        icon: c = ty,
        indeterminate: u = !1,
        indeterminateIcon: d = ny,
        inputProps: p,
        size: b = 'medium',
        className: y,
      } = i,
      v = Ce(i, Jv),
      h = u ? d : c,
      m = u ? d : s,
      S = g({}, i, {
        color: l,
        indeterminate: u,
        size: b,
      }),
      T = Zv(S);
    return /* @__PURE__ */ A(
      Qv,
      g(
        {
          type: 'checkbox',
          inputProps: g(
            {
              'data-indeterminate': u,
            },
            p,
          ),
          icon: /* @__PURE__ */ x.cloneElement(h, {
            fontSize: (r = h.props.fontSize) != null ? r : b,
          }),
          checkedIcon: /* @__PURE__ */ x.cloneElement(m, {
            fontSize: (a = m.props.fontSize) != null ? a : b,
          }),
          ownerState: S,
          ref: o,
          className: Ee(T.root, y),
        },
        v,
        {
          classes: T,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Vc.propTypes = {
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
    inputRef: Nt,
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
const oy = Vc,
  ry = [
    'BackdropComponent',
    'BackdropProps',
    'classes',
    'className',
    'closeAfterTransition',
    'children',
    'component',
    'components',
    'componentsProps',
    'disableAutoFocus',
    'disableEnforceFocus',
    'disableEscapeKeyDown',
    'disablePortal',
    'disableRestoreFocus',
    'disableScrollLock',
    'hideBackdrop',
    'keepMounted',
    'slotProps',
    'slots',
    'theme',
  ],
  ay = pe('div', {
    name: 'MuiModal',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, !o.open && o.exited && t.hidden];
    },
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        position: 'fixed',
        zIndex: (e.vars || e).zIndex.modal,
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
      },
      !t.open &&
        t.exited && {
          visibility: 'hidden',
        },
    ),
  ),
  iy = pe(Pv, {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (e, t) => t.backdrop,
  })({
    zIndex: -1,
  }),
  zc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a, i, s, l, c;
    const u = ze({
        name: 'MuiModal',
        props: t,
      }),
      {
        BackdropComponent: d = iy,
        BackdropProps: p,
        classes: b,
        className: y,
        closeAfterTransition: v = !1,
        children: h,
        component: m,
        components: S = {},
        componentsProps: T = {},
        disableAutoFocus: C = !1,
        disableEnforceFocus: E = !1,
        disableEscapeKeyDown: f = !1,
        disablePortal: w = !1,
        disableRestoreFocus: k = !1,
        disableScrollLock: V = !1,
        hideBackdrop: L = !1,
        keepMounted: D = !1,
        slotProps: _,
        slots: Y,
        // eslint-disable-next-line react/prop-types
        theme: B,
      } = u,
      M = Ce(u, ry),
      [F, z] = x.useState(!0),
      ie = {
        closeAfterTransition: v,
        disableAutoFocus: C,
        disableEnforceFocus: E,
        disableEscapeKeyDown: f,
        disablePortal: w,
        disableRestoreFocus: k,
        disableScrollLock: V,
        hideBackdrop: L,
        keepMounted: D,
      },
      se = g({}, u, ie, {
        exited: F,
      }),
      G = (r = (a = Y == null ? void 0 : Y.root) != null ? a : S.Root) != null ? r : ay,
      R = (i = (s = Y == null ? void 0 : Y.backdrop) != null ? s : S.Backdrop) != null ? i : d,
      j = (l = _ == null ? void 0 : _.root) != null ? l : T.root,
      X = (c = _ == null ? void 0 : _.backdrop) != null ? c : T.backdrop;
    return /* @__PURE__ */ A(
      Ib,
      g(
        {
          slots: {
            root: G,
            backdrop: R,
          },
          slotProps: {
            root: () =>
              g(
                {},
                ba(j, se),
                !En(G) && {
                  as: m,
                  theme: B,
                },
                {
                  className: Ee(
                    y,
                    j == null ? void 0 : j.className,
                    b == null ? void 0 : b.root,
                    !se.open && se.exited && (b == null ? void 0 : b.hidden),
                  ),
                },
              ),
            backdrop: () =>
              g({}, p, ba(X, se), {
                className: Ee(X == null ? void 0 : X.className, b == null ? void 0 : b.backdrop),
              }),
          },
          onTransitionEnter: () => z(!1),
          onTransitionExited: () => z(!0),
          ref: o,
        },
        M,
        ie,
        {
          children: h,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (zc.propTypes = {
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
    children: ro.isRequired,
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
    container: n.oneOfType([on, n.func]),
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
const sy = zc,
  ly = Pe('MuiDivider', [
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
  Ys = ly,
  cy = [
    'disableUnderline',
    'components',
    'componentsProps',
    'fullWidth',
    'hiddenLabel',
    'inputComponent',
    'multiline',
    'slotProps',
    'slots',
    'type',
  ],
  uy = (e) => {
    const { classes: t, disableUnderline: o } = e,
      a = Fe(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        iv,
        t,
      );
    return g({}, t, a);
  },
  dy = pe(zr, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...jr(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    var o;
    const r = e.palette.mode === 'light',
      a = r ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)',
      i = r ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
      s = r ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.13)',
      l = r ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
    return g(
      {
        position: 'relative',
        backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i,
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
            backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i,
          },
        },
        [`&.${Pt.focused}`]: {
          backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i,
        },
        [`&.${Pt.disabled}`]: {
          backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : l,
        },
      },
      !t.disableUnderline && {
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
        [`&.${Pt.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: 'scaleX(1) translateX(0)',
        },
        [`&.${Pt.error}`]: {
          '&:before, &:after': {
            borderBottomColor: (e.vars || e).palette.error.main,
          },
        },
        '&:before': {
          borderBottom: `1px solid ${
            e.vars
              ? `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`
              : a
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
        [`&:hover:not(.${Pt.disabled}, .${Pt.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`,
        },
        [`&.${Pt.disabled}:before`]: {
          borderBottomStyle: 'dotted',
        },
      },
      t.startAdornment && {
        paddingLeft: 12,
      },
      t.endAdornment && {
        paddingRight: 12,
      },
      t.multiline &&
        g(
          {
            padding: '25px 12px 8px',
          },
          t.size === 'small' && {
            paddingTop: 21,
            paddingBottom: 4,
          },
          t.hiddenLabel && {
            paddingTop: 16,
            paddingBottom: 17,
          },
        ),
    );
  }),
  py = pe(Br, {
    name: 'MuiFilledInput',
    slot: 'Input',
    overridesResolver: Vr,
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        paddingTop: 25,
        paddingRight: 12,
        paddingBottom: 8,
        paddingLeft: 12,
      },
      !e.vars && {
        '&:-webkit-autofill': {
          WebkitBoxShadow: e.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
          WebkitTextFillColor: e.palette.mode === 'light' ? null : '#fff',
          caretColor: e.palette.mode === 'light' ? null : '#fff',
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
        },
      },
      e.vars && {
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
      },
      t.size === 'small' && {
        paddingTop: 21,
        paddingBottom: 4,
      },
      t.hiddenLabel && {
        paddingTop: 16,
        paddingBottom: 17,
      },
      t.multiline && {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
      t.startAdornment && {
        paddingLeft: 0,
      },
      t.endAdornment && {
        paddingRight: 0,
      },
      t.hiddenLabel &&
        t.size === 'small' && {
          paddingTop: 8,
          paddingBottom: 9,
        },
    ),
  ),
  ui = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = ze({
        props: t,
        name: 'MuiFilledInput',
      }),
      {
        components: c = {},
        componentsProps: u,
        fullWidth: d = !1,
        // declare here to prevent spreading to DOM
        inputComponent: p = 'input',
        multiline: b = !1,
        slotProps: y,
        slots: v = {},
        type: h = 'text',
      } = l,
      m = Ce(l, cy),
      S = g({}, l, {
        fullWidth: d,
        inputComponent: p,
        multiline: b,
        type: h,
      }),
      T = uy(l),
      C = {
        root: {
          ownerState: S,
        },
        input: {
          ownerState: S,
        },
      },
      E = y ?? u ? Ft(y ?? u, C) : C,
      f = (r = (a = v.root) != null ? a : c.Root) != null ? r : dy,
      w = (i = (s = v.input) != null ? s : c.Input) != null ? i : py;
    return /* @__PURE__ */ A(
      ci,
      g(
        {
          slots: {
            root: f,
            input: w,
          },
          componentsProps: E,
          fullWidth: d,
          inputComponent: p,
          multiline: b,
          ref: o,
          type: h,
        },
        m,
        {
          classes: T,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ui.propTypes = {
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
    inputRef: Nt,
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
ui.muiName = 'Input';
const Bc = ui;
function fy(e) {
  return Ae('MuiFormControl', e);
}
Pe('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const my = [
    'children',
    'className',
    'color',
    'component',
    'disabled',
    'error',
    'focused',
    'fullWidth',
    'hiddenLabel',
    'margin',
    'required',
    'size',
    'variant',
  ],
  hy = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      a = {
        root: ['root', o !== 'none' && `margin${Q(o)}`, r && 'fullWidth'],
      };
    return Fe(a, fy, t);
  },
  by = pe('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      g({}, t.root, t[`margin${Q(e.margin)}`], e.fullWidth && t.fullWidth),
  })(({ ownerState: e }) =>
    g(
      {
        display: 'inline-flex',
        flexDirection: 'column',
        position: 'relative',
        // Reset fieldset default style.
        minWidth: 0,
        padding: 0,
        margin: 0,
        border: 0,
        verticalAlign: 'top',
      },
      e.margin === 'normal' && {
        marginTop: 16,
        marginBottom: 8,
      },
      e.margin === 'dense' && {
        marginTop: 8,
        marginBottom: 4,
      },
      e.fullWidth && {
        width: '100%',
      },
    ),
  ),
  Uc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiFormControl',
      }),
      {
        children: a,
        className: i,
        color: s = 'primary',
        component: l = 'div',
        disabled: c = !1,
        error: u = !1,
        focused: d,
        fullWidth: p = !1,
        hiddenLabel: b = !1,
        margin: y = 'none',
        required: v = !1,
        size: h = 'medium',
        variant: m = 'outlined',
      } = r,
      S = Ce(r, my),
      T = g({}, r, {
        color: s,
        component: l,
        disabled: c,
        error: u,
        fullWidth: p,
        hiddenLabel: b,
        margin: y,
        required: v,
        size: h,
        variant: m,
      }),
      C = hy(T),
      [E, f] = x.useState(() => {
        let B = !1;
        return (
          a &&
            x.Children.forEach(a, (M) => {
              if (!Gr(M, ['Input', 'Select'])) return;
              const F = Gr(M, ['Select']) ? M.props.input : M;
              F && Xg(F.props) && (B = !0);
            }),
          B
        );
      }),
      [w, k] = x.useState(() => {
        let B = !1;
        return (
          a &&
            x.Children.forEach(a, (M) => {
              Gr(M, ['Input', 'Select']) && li(M.props, !0) && (B = !0);
            }),
          B
        );
      }),
      [V, L] = x.useState(!1);
    c && V && L(!1);
    const D = d !== void 0 && !c ? d : V;
    let _;
    if (process.env.NODE_ENV !== 'production') {
      const B = x.useRef(!1);
      _ = () => (
        B.current &&
          console.error(
            [
              'MUI: There are multiple `InputBase` components inside a FormControl.',
              'This creates visual inconsistencies, only use one `InputBase`.',
            ].join(`
`),
          ),
        (B.current = !0),
        () => {
          B.current = !1;
        }
      );
    }
    const Y = x.useMemo(
      () => ({
        adornedStart: E,
        setAdornedStart: f,
        color: s,
        disabled: c,
        error: u,
        filled: w,
        focused: D,
        fullWidth: p,
        hiddenLabel: b,
        size: h,
        onBlur: () => {
          L(!1);
        },
        onEmpty: () => {
          k(!1);
        },
        onFilled: () => {
          k(!0);
        },
        onFocus: () => {
          L(!0);
        },
        registerEffect: _,
        required: v,
        variant: m,
      }),
      [E, s, c, u, w, D, p, b, _, v, h, m],
    );
    return /* @__PURE__ */ A(si.Provider, {
      value: Y,
      children: /* @__PURE__ */ A(
        by,
        g(
          {
            as: l,
            ownerState: T,
            className: Ee(C.root, i),
            ref: o,
          },
          S,
          {
            children: a,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Uc.propTypes = {
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
const gy = Uc;
function vy(e) {
  return Ae('MuiFormHelperText', e);
}
const yy = Pe('MuiFormHelperText', [
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
  Ks = yy;
var Gs;
const xy = [
    'children',
    'className',
    'component',
    'disabled',
    'error',
    'filled',
    'focused',
    'margin',
    'required',
    'variant',
  ],
  Ey = (e) => {
    const {
        classes: t,
        contained: o,
        size: r,
        disabled: a,
        error: i,
        filled: s,
        focused: l,
        required: c,
      } = e,
      u = {
        root: [
          'root',
          a && 'disabled',
          i && 'error',
          r && `size${Q(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return Fe(u, vy, t);
  },
  Cy = pe('p', {
    name: 'MuiFormHelperText',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.size && t[`size${Q(o.size)}`],
        o.contained && t.contained,
        o.filled && t.filled,
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        color: (e.vars || e).palette.text.secondary,
      },
      e.typography.caption,
      {
        textAlign: 'left',
        marginTop: 3,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        [`&.${Ks.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${Ks.error}`]: {
          color: (e.vars || e).palette.error.main,
        },
      },
      t.size === 'small' && {
        marginTop: 4,
      },
      t.contained && {
        marginLeft: 14,
        marginRight: 14,
      },
    ),
  ),
  Wc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiFormHelperText',
      }),
      { children: a, className: i, component: s = 'p' } = r,
      l = Ce(r, xy),
      c = Dn(),
      u = lo({
        props: r,
        muiFormControl: c,
        states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
      }),
      d = g({}, r, {
        component: s,
        contained: u.variant === 'filled' || u.variant === 'outlined',
        variant: u.variant,
        size: u.size,
        disabled: u.disabled,
        error: u.error,
        filled: u.filled,
        focused: u.focused,
        required: u.required,
      }),
      p = Ey(d);
    return /* @__PURE__ */ A(
      Cy,
      g(
        {
          as: s,
          ownerState: d,
          className: Ee(p.root, i),
          ref: o,
        },
        l,
        {
          children:
            a === ' '
              ? // notranslate needed while Google Translate will not fix zero-width space issue
                Gs ||
                (Gs = /* @__PURE__ */ A('span', {
                  className: 'notranslate',
                  children: '​',
                }))
              : a,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Wc.propTypes = {
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
const Oy = Wc;
function Ty(e) {
  return Ae('MuiFormLabel', e);
}
const Sy = Pe('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  wo = Sy,
  wy = [
    'children',
    'className',
    'color',
    'component',
    'disabled',
    'error',
    'filled',
    'focused',
    'required',
  ],
  ky = (e) => {
    const { classes: t, color: o, focused: r, disabled: a, error: i, filled: s, required: l } = e,
      c = {
        root: [
          'root',
          `color${Q(o)}`,
          a && 'disabled',
          i && 'error',
          s && 'filled',
          r && 'focused',
          l && 'required',
        ],
        asterisk: ['asterisk', i && 'error'],
      };
    return Fe(c, Ty, t);
  },
  Ry = pe('label', {
    name: 'MuiFormLabel',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      g({}, t.root, e.color === 'secondary' && t.colorSecondary, e.filled && t.filled),
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        color: (e.vars || e).palette.text.secondary,
      },
      e.typography.body1,
      {
        lineHeight: '1.4375em',
        padding: 0,
        position: 'relative',
        [`&.${wo.focused}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${wo.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${wo.error}`]: {
          color: (e.vars || e).palette.error.main,
        },
      },
    ),
  ),
  Ny = pe('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({
    [`&.${wo.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  Hc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiFormLabel',
      }),
      { children: a, className: i, component: s = 'label' } = r,
      l = Ce(r, wy),
      c = Dn(),
      u = lo({
        props: r,
        muiFormControl: c,
        states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
      }),
      d = g({}, r, {
        color: u.color || 'primary',
        component: s,
        disabled: u.disabled,
        error: u.error,
        filled: u.filled,
        focused: u.focused,
        required: u.required,
      }),
      p = ky(d);
    return /* @__PURE__ */ Qe(
      Ry,
      g(
        {
          as: s,
          ownerState: d,
          className: Ee(p.root, i),
          ref: o,
        },
        l,
        {
          children: [
            a,
            u.required &&
              /* @__PURE__ */ Qe(Ny, {
                ownerState: d,
                'aria-hidden': !0,
                className: p.asterisk,
                children: [' ', '*'],
              }),
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Hc.propTypes = {
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
const qc = Hc,
  $y = [
    'addEndListener',
    'appear',
    'children',
    'easing',
    'in',
    'onEnter',
    'onEntered',
    'onEntering',
    'onExit',
    'onExited',
    'onExiting',
    'style',
    'timeout',
    'TransitionComponent',
  ];
function Ta(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Py = {
    entering: {
      opacity: 1,
      transform: Ta(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
  },
  ra =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  di = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const {
        addEndListener: r,
        appear: a = !0,
        children: i,
        easing: s,
        in: l,
        onEnter: c,
        onEntered: u,
        onEntering: d,
        onExit: p,
        onExited: b,
        onExiting: y,
        style: v,
        timeout: h = 'auto',
        // eslint-disable-next-line react/prop-types
        TransitionComponent: m = gc,
      } = t,
      S = Ce(t, $y),
      T = x.useRef(),
      C = x.useRef(),
      E = io(),
      f = x.useRef(null),
      w = dt(f, i.ref, o),
      k = (F) => (z) => {
        if (F) {
          const ie = f.current;
          z === void 0 ? F(ie) : F(ie, z);
        }
      },
      V = k(d),
      L = k((F, z) => {
        vc(F);
        const {
          duration: ie,
          delay: se,
          easing: G,
        } = hr(
          {
            style: v,
            timeout: h,
            easing: s,
          },
          {
            mode: 'enter',
          },
        );
        let R;
        h === 'auto'
          ? ((R = E.transitions.getAutoHeightDuration(F.clientHeight)), (C.current = R))
          : (R = ie),
          (F.style.transition = [
            E.transitions.create('opacity', {
              duration: R,
              delay: se,
            }),
            E.transitions.create('transform', {
              duration: ra ? R : R * 0.666,
              delay: se,
              easing: G,
            }),
          ].join(',')),
          c && c(F, z);
      }),
      D = k(u),
      _ = k(y),
      Y = k((F) => {
        const {
          duration: z,
          delay: ie,
          easing: se,
        } = hr(
          {
            style: v,
            timeout: h,
            easing: s,
          },
          {
            mode: 'exit',
          },
        );
        let G;
        h === 'auto'
          ? ((G = E.transitions.getAutoHeightDuration(F.clientHeight)), (C.current = G))
          : (G = z),
          (F.style.transition = [
            E.transitions.create('opacity', {
              duration: G,
              delay: ie,
            }),
            E.transitions.create('transform', {
              duration: ra ? G : G * 0.666,
              delay: ra ? ie : ie || G * 0.333,
              easing: se,
            }),
          ].join(',')),
          (F.style.opacity = 0),
          (F.style.transform = Ta(0.75)),
          p && p(F);
      }),
      B = k(b),
      M = (F) => {
        h === 'auto' && (T.current = setTimeout(F, C.current || 0)), r && r(f.current, F);
      };
    return (
      x.useEffect(
        () => () => {
          clearTimeout(T.current);
        },
        [],
      ),
      /* @__PURE__ */ A(
        m,
        g(
          {
            appear: a,
            in: l,
            nodeRef: f,
            onEnter: L,
            onEntered: D,
            onEntering: V,
            onExit: Y,
            onExited: B,
            onExiting: _,
            addEndListener: M,
            timeout: h === 'auto' ? null : h,
          },
          S,
          {
            children: (F, z) =>
              /* @__PURE__ */ x.cloneElement(
                i,
                g(
                  {
                    style: g(
                      {
                        opacity: 0,
                        transform: Ta(0.75),
                        visibility: F === 'exited' && !l ? 'hidden' : void 0,
                      },
                      Py[F],
                      v,
                      i.props.style,
                    ),
                    ref: w,
                  },
                  z,
                ),
              ),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (di.propTypes = {
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
    children: ro.isRequired,
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
di.muiSupportAuto = !0;
const Yc = di,
  Iy = [
    'disableUnderline',
    'components',
    'componentsProps',
    'fullWidth',
    'inputComponent',
    'multiline',
    'slotProps',
    'slots',
    'type',
  ],
  _y = (e) => {
    const { classes: t, disableUnderline: o } = e,
      a = Fe(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        nv,
        t,
      );
    return g({}, t, a);
  },
  My = pe(zr, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...jr(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    let r = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
    return (
      e.vars &&
        (r = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`),
      g(
        {
          position: 'relative',
        },
        t.formControl && {
          'label + &': {
            marginTop: 16,
          },
        },
        !t.disableUnderline && {
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
          [`&.${yn.focused}:after`]: {
            // translateX(0) is a workaround for Safari transform scale bug
            // See https://github.com/mui/material-ui/issues/31766
            transform: 'scaleX(1) translateX(0)',
          },
          [`&.${yn.error}`]: {
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
          [`&:hover:not(.${yn.disabled}, .${yn.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              borderBottom: `1px solid ${r}`,
            },
          },
          [`&.${yn.disabled}:before`]: {
            borderBottomStyle: 'dotted',
          },
        },
      )
    );
  }),
  Ay = pe(Br, {
    name: 'MuiInput',
    slot: 'Input',
    overridesResolver: Vr,
  })({}),
  pi = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a, i, s;
    const l = ze({
        props: t,
        name: 'MuiInput',
      }),
      {
        disableUnderline: c,
        components: u = {},
        componentsProps: d,
        fullWidth: p = !1,
        inputComponent: b = 'input',
        multiline: y = !1,
        slotProps: v,
        slots: h = {},
        type: m = 'text',
      } = l,
      S = Ce(l, Iy),
      T = _y(l),
      E = {
        root: {
          ownerState: {
            disableUnderline: c,
          },
        },
      },
      f = v ?? d ? Ft(v ?? d, E) : E,
      w = (r = (a = h.root) != null ? a : u.Root) != null ? r : My,
      k = (i = (s = h.input) != null ? s : u.Input) != null ? i : Ay;
    return /* @__PURE__ */ A(
      ci,
      g(
        {
          slots: {
            root: w,
            input: k,
          },
          slotProps: f,
          fullWidth: p,
          inputComponent: b,
          multiline: y,
          ref: o,
          type: m,
        },
        S,
        {
          classes: T,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (pi.propTypes = {
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
    inputRef: Nt,
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
pi.muiName = 'Input';
const Kc = pi;
function Dy(e) {
  return Ae('MuiInputLabel', e);
}
Pe('MuiInputLabel', [
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
const Ly = ['disableAnimation', 'margin', 'shrink', 'variant', 'className'],
  Fy = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: a,
        disableAnimation: i,
        variant: s,
        required: l,
      } = e,
      u = Fe(
        {
          root: [
            'root',
            o && 'formControl',
            !i && 'animated',
            a && 'shrink',
            r === 'small' && 'sizeSmall',
            s,
          ],
          asterisk: [l && 'asterisk'],
        },
        Dy,
        t,
      );
    return g({}, t, u);
  },
  jy = pe(qc, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${wo.asterisk}`]: t.asterisk,
        },
        t.root,
        o.formControl && t.formControl,
        o.size === 'small' && t.sizeSmall,
        o.shrink && t.shrink,
        !o.disableAnimation && t.animated,
        t[o.variant],
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        display: 'block',
        transformOrigin: 'top left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
      },
      t.formControl && {
        position: 'absolute',
        left: 0,
        top: 0,
        // slight alteration to spec spacing to match visual spec result
        transform: 'translate(0, 20px) scale(1)',
      },
      t.size === 'small' && {
        // Compensation for the `Input.inputSizeSmall` style.
        transform: 'translate(0, 17px) scale(1)',
      },
      t.shrink && {
        transform: 'translate(0, -1.5px) scale(0.75)',
        transformOrigin: 'top left',
        maxWidth: '133%',
      },
      !t.disableAnimation && {
        transition: e.transitions.create(['color', 'transform', 'max-width'], {
          duration: e.transitions.duration.shorter,
          easing: e.transitions.easing.easeOut,
        }),
      },
      t.variant === 'filled' &&
        g(
          {
            // Chrome's autofill feature gives the input field a yellow background.
            // Since the input field is behind the label in the HTML tree,
            // the input field is drawn last and hides the label with an opaque background color.
            // zIndex: 1 will raise the label above opaque background-colors of input.
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(12px, 16px) scale(1)',
            maxWidth: 'calc(100% - 24px)',
          },
          t.size === 'small' && {
            transform: 'translate(12px, 13px) scale(1)',
          },
          t.shrink &&
            g(
              {
                userSelect: 'none',
                pointerEvents: 'auto',
                transform: 'translate(12px, 7px) scale(0.75)',
                maxWidth: 'calc(133% - 24px)',
              },
              t.size === 'small' && {
                transform: 'translate(12px, 4px) scale(0.75)',
              },
            ),
        ),
      t.variant === 'outlined' &&
        g(
          {
            // see comment above on filled.zIndex
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(14px, 16px) scale(1)',
            maxWidth: 'calc(100% - 24px)',
          },
          t.size === 'small' && {
            transform: 'translate(14px, 9px) scale(1)',
          },
          t.shrink && {
            userSelect: 'none',
            pointerEvents: 'auto',
            // Theoretically, we should have (8+5)*2/0.75 = 34px
            // but it feels a better when it bleeds a bit on the left, so 32px.
            maxWidth: 'calc(133% - 32px)',
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        ),
    ),
  ),
  Gc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        name: 'MuiInputLabel',
        props: t,
      }),
      { disableAnimation: a = !1, shrink: i, className: s } = r,
      l = Ce(r, Ly),
      c = Dn();
    let u = i;
    typeof u > 'u' && c && (u = c.filled || c.focused || c.adornedStart);
    const d = lo({
        props: r,
        muiFormControl: c,
        states: ['size', 'variant', 'required'],
      }),
      p = g({}, r, {
        disableAnimation: a,
        formControl: c,
        shrink: u,
        size: d.size,
        variant: d.variant,
        required: d.required,
      }),
      b = Fy(p);
    return /* @__PURE__ */ A(
      jy,
      g(
        {
          'data-shrink': u,
          ownerState: p,
          ref: o,
          className: Ee(b.root, s),
        },
        l,
        {
          classes: b,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Gc.propTypes = {
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
const Vy = Gc,
  Xc = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== 'production' && (Xc.displayName = 'ListContext');
const Sa = Xc;
function zy(e) {
  return Ae('MuiList', e);
}
Pe('MuiList', ['root', 'padding', 'dense', 'subheader']);
const By = ['children', 'className', 'component', 'dense', 'disablePadding', 'subheader'],
  Uy = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: a } = e;
    return Fe(
      {
        root: ['root', !o && 'padding', r && 'dense', a && 'subheader'],
      },
      zy,
      t,
    );
  },
  Wy = pe('ul', {
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
  })(({ ownerState: e }) =>
    g(
      {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'relative',
      },
      !e.disablePadding && {
        paddingTop: 8,
        paddingBottom: 8,
      },
      e.subheader && {
        paddingTop: 0,
      },
    ),
  ),
  Jc = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiList',
      }),
      {
        children: a,
        className: i,
        component: s = 'ul',
        dense: l = !1,
        disablePadding: c = !1,
        subheader: u,
      } = r,
      d = Ce(r, By),
      p = x.useMemo(
        () => ({
          dense: l,
        }),
        [l],
      ),
      b = g({}, r, {
        component: s,
        dense: l,
        disablePadding: c,
      }),
      y = Uy(b);
    return /* @__PURE__ */ A(Sa.Provider, {
      value: p,
      children: /* @__PURE__ */ Qe(
        Wy,
        g(
          {
            as: s,
            className: Ee(y.root, i),
            ref: o,
            ownerState: b,
          },
          d,
          {
            children: [u, a],
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Jc.propTypes = {
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
const Hy = Jc,
  qy = Pe('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  Xs = qy,
  Yy = Pe('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  Js = Yy,
  Ky = [
    'actions',
    'autoFocus',
    'autoFocusItem',
    'children',
    'className',
    'disabledItemsFocusable',
    'disableListWrap',
    'onKeyDown',
    'variant',
  ];
function aa(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function Zs(e, t, o) {
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
function Zc(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function go(e, t, o, r, a, i) {
  let s = !1,
    l = a(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !Zc(l, i) || c) l = a(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const Qc = /* @__PURE__ */ x.forwardRef(function (t, o) {
  const {
      // private
      // eslint-disable-next-line react/prop-types
      actions: r,
      autoFocus: a = !1,
      autoFocusItem: i = !1,
      children: s,
      className: l,
      disabledItemsFocusable: c = !1,
      disableListWrap: u = !1,
      onKeyDown: d,
      variant: p = 'selectedMenu',
    } = t,
    b = Ce(t, Ky),
    y = x.useRef(null),
    v = x.useRef({
      keys: [],
      repeating: !0,
      previousKeyMatched: !0,
      lastTime: null,
    });
  rn(() => {
    a && y.current.focus();
  }, [a]),
    x.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (C, E) => {
          const f = !y.current.style.width;
          if (C.clientHeight < y.current.clientHeight && f) {
            const w = `${kl(ct(C))}px`;
            (y.current.style[E.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = w),
              (y.current.style.width = `calc(100% + ${w})`);
          }
          return y.current;
        },
      }),
      [],
    );
  const h = (C) => {
      const E = y.current,
        f = C.key,
        w = ct(E).activeElement;
      if (f === 'ArrowDown') C.preventDefault(), go(E, w, u, c, aa);
      else if (f === 'ArrowUp') C.preventDefault(), go(E, w, u, c, Zs);
      else if (f === 'Home') C.preventDefault(), go(E, null, u, c, aa);
      else if (f === 'End') C.preventDefault(), go(E, null, u, c, Zs);
      else if (f.length === 1) {
        const k = v.current,
          V = f.toLowerCase(),
          L = performance.now();
        k.keys.length > 0 &&
          (L - k.lastTime > 500
            ? ((k.keys = []), (k.repeating = !0), (k.previousKeyMatched = !0))
            : k.repeating && V !== k.keys[0] && (k.repeating = !1)),
          (k.lastTime = L),
          k.keys.push(V);
        const D = w && !k.repeating && Zc(w, k);
        k.previousKeyMatched && (D || go(E, w, !1, c, aa, k))
          ? C.preventDefault()
          : (k.previousKeyMatched = !1);
      }
      d && d(C);
    },
    m = dt(y, o);
  let S = -1;
  x.Children.forEach(s, (C, E) => {
    /* @__PURE__ */ x.isValidElement(C) &&
      (process.env.NODE_ENV !== 'production' &&
        oi.isFragment(C) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      C.props.disabled || (((p === 'selectedMenu' && C.props.selected) || S === -1) && (S = E)),
      S === E &&
        (C.props.disabled || C.props.muiSkipListHighlight || C.type.muiSkipListHighlight) &&
        ((S += 1), S >= s.length && (S = -1)));
  });
  const T = x.Children.map(s, (C, E) => {
    if (E === S) {
      const f = {};
      return (
        i && (f.autoFocus = !0),
        C.props.tabIndex === void 0 && p === 'selectedMenu' && (f.tabIndex = 0),
        /* @__PURE__ */ x.cloneElement(C, f)
      );
    }
    return C;
  });
  return /* @__PURE__ */ A(
    Hy,
    g(
      {
        role: 'menu',
        ref: m,
        className: l,
        onKeyDown: h,
        tabIndex: a ? 0 : -1,
      },
      b,
      {
        children: T,
      },
    ),
  );
});
process.env.NODE_ENV !== 'production' &&
  (Qc.propTypes = {
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
const Gy = Qc;
function Xy(e) {
  return Ae('MuiPopover', e);
}
Pe('MuiPopover', ['root', 'paper']);
const Jy = ['onEntering'],
  Zy = [
    'action',
    'anchorEl',
    'anchorOrigin',
    'anchorPosition',
    'anchorReference',
    'children',
    'className',
    'container',
    'elevation',
    'marginThreshold',
    'open',
    'PaperProps',
    'transformOrigin',
    'TransitionComponent',
    'transitionDuration',
    'TransitionProps',
  ];
function Qs(e, t) {
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
function el(e, t) {
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
function tl(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function or(e) {
  return typeof e == 'function' ? e() : e;
}
const Qy = (e) => {
    const { classes: t } = e;
    return Fe(
      {
        root: ['root'],
        paper: ['paper'],
      },
      Xy,
      t,
    );
  },
  e0 = pe(sy, {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  t0 = pe(Vo, {
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
  eu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiPopover',
      }),
      {
        action: a,
        anchorEl: i,
        anchorOrigin: s = {
          vertical: 'top',
          horizontal: 'left',
        },
        anchorPosition: l,
        anchorReference: c = 'anchorEl',
        children: u,
        className: d,
        container: p,
        elevation: b = 8,
        marginThreshold: y = 16,
        open: v,
        PaperProps: h = {},
        transformOrigin: m = {
          vertical: 'top',
          horizontal: 'left',
        },
        TransitionComponent: S = Yc,
        transitionDuration: T = 'auto',
        TransitionProps: { onEntering: C } = {},
      } = r,
      E = Ce(r.TransitionProps, Jy),
      f = Ce(r, Zy),
      w = x.useRef(),
      k = dt(w, h.ref),
      V = g({}, r, {
        anchorOrigin: s,
        anchorReference: c,
        elevation: b,
        marginThreshold: y,
        PaperProps: h,
        transformOrigin: m,
        TransitionComponent: S,
        transitionDuration: T,
        TransitionProps: E,
      }),
      L = Qy(V),
      D = x.useCallback(() => {
        if (c === 'anchorPosition')
          return (
            process.env.NODE_ENV !== 'production' &&
              (l ||
                console.error(
                  'MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.',
                )),
            l
          );
        const R = or(i),
          j = R && R.nodeType === 1 ? R : ct(w.current).body,
          X = j.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const H = j.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            H.top === 0 &&
            H.left === 0 &&
            H.right === 0 &&
            H.bottom === 0 &&
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
          top: X.top + Qs(X, s.vertical),
          left: X.left + el(X, s.horizontal),
        };
      }, [i, s.horizontal, s.vertical, l, c]),
      _ = x.useCallback(
        (R) => ({
          vertical: Qs(R, m.vertical),
          horizontal: el(R, m.horizontal),
        }),
        [m.horizontal, m.vertical],
      ),
      Y = x.useCallback(
        (R) => {
          const j = {
              width: R.offsetWidth,
              height: R.offsetHeight,
            },
            X = _(j);
          if (c === 'none')
            return {
              top: null,
              left: null,
              transformOrigin: tl(X),
            };
          const H = D();
          let U = H.top - X.vertical,
            ne = H.left - X.horizontal;
          const oe = U + j.height,
            J = ne + j.width,
            ae = _n(or(i)),
            le = ae.innerHeight - y,
            he = ae.innerWidth - y;
          if (U < y) {
            const re = U - y;
            (U -= re), (X.vertical += re);
          } else if (oe > le) {
            const re = oe - le;
            (U -= re), (X.vertical += re);
          }
          if (
            (process.env.NODE_ENV !== 'production' &&
              j.height > le &&
              j.height &&
              le &&
              console.error(
                [
                  'MUI: The popover component is too tall.',
                  `Some part of it can not be seen on the screen (${j.height - le}px).`,
                  'Please consider adding a `max-height` to improve the user-experience.',
                ].join(`
`),
              ),
            ne < y)
          ) {
            const re = ne - y;
            (ne -= re), (X.horizontal += re);
          } else if (J > he) {
            const re = J - he;
            (ne -= re), (X.horizontal += re);
          }
          return {
            top: `${Math.round(U)}px`,
            left: `${Math.round(ne)}px`,
            transformOrigin: tl(X),
          };
        },
        [i, c, D, _, y],
      ),
      [B, M] = x.useState(v),
      F = x.useCallback(() => {
        const R = w.current;
        if (!R) return;
        const j = Y(R);
        j.top !== null && (R.style.top = j.top),
          j.left !== null && (R.style.left = j.left),
          (R.style.transformOrigin = j.transformOrigin),
          M(!0);
      }, [Y]),
      z = (R, j) => {
        C && C(R, j), F();
      },
      ie = () => {
        M(!1);
      };
    x.useEffect(() => {
      v && F();
    }),
      x.useImperativeHandle(
        a,
        () =>
          v
            ? {
                updatePosition: () => {
                  F();
                },
              }
            : null,
        [v, F],
      ),
      x.useEffect(() => {
        if (!v) return;
        const R = Tl(() => {
            F();
          }),
          j = _n(i);
        return (
          j.addEventListener('resize', R),
          () => {
            R.clear(), j.removeEventListener('resize', R);
          }
        );
      }, [i, v, F]);
    let se = T;
    T === 'auto' && !S.muiSupportAuto && (se = void 0);
    const G = p || (i ? ct(or(i)).body : void 0);
    return /* @__PURE__ */ A(
      e0,
      g(
        {
          BackdropProps: {
            invisible: !0,
          },
          className: Ee(L.root, d),
          container: G,
          open: v,
          ref: o,
          ownerState: V,
        },
        f,
        {
          children: /* @__PURE__ */ A(
            S,
            g(
              {
                appear: !0,
                in: v,
                onEntering: z,
                onExited: ie,
                timeout: se,
              },
              E,
              {
                children: /* @__PURE__ */ A(
                  t0,
                  g(
                    {
                      elevation: b,
                    },
                    h,
                    {
                      ref: k,
                      className: Ee(L.paper, h.className),
                    },
                    B
                      ? void 0
                      : {
                          style: g({}, h.style, {
                            opacity: 0,
                          }),
                        },
                    {
                      ownerState: V,
                      children: u,
                    },
                  ),
                ),
              },
            ),
          ),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (eu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * A ref for imperative actions.
     * It currently only supports updatePosition() action.
     */
    action: Nt,
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the popover.
     */
    anchorEl: Kt(n.oneOfType([on, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = or(e.anchorEl);
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
    container: n.oneOfType([on, n.func]),
    /**
     * The elevation of the popover.
     * @default 8
     */
    elevation: Ia,
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
      component: $a,
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
const n0 = eu;
function o0(e) {
  return Ae('MuiMenu', e);
}
Pe('MuiMenu', ['root', 'paper', 'list']);
const r0 = ['onEntering'],
  a0 = [
    'autoFocus',
    'children',
    'disableAutoFocusItem',
    'MenuListProps',
    'onClose',
    'open',
    'PaperProps',
    'PopoverClasses',
    'transitionDuration',
    'TransitionProps',
    'variant',
  ],
  i0 = {
    vertical: 'top',
    horizontal: 'right',
  },
  s0 = {
    vertical: 'top',
    horizontal: 'left',
  },
  l0 = (e) => {
    const { classes: t } = e;
    return Fe(
      {
        root: ['root'],
        paper: ['paper'],
        list: ['list'],
      },
      o0,
      t,
    );
  },
  c0 = pe(n0, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  u0 = pe(Vo, {
    name: 'MuiMenu',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })({
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tapable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100% - 96px)',
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch',
  }),
  d0 = pe(Gy, {
    name: 'MuiMenu',
    slot: 'List',
    overridesResolver: (e, t) => t.list,
  })({
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  tu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiMenu',
      }),
      {
        autoFocus: a = !0,
        children: i,
        disableAutoFocusItem: s = !1,
        MenuListProps: l = {},
        onClose: c,
        open: u,
        PaperProps: d = {},
        PopoverClasses: p,
        transitionDuration: b = 'auto',
        TransitionProps: { onEntering: y } = {},
        variant: v = 'selectedMenu',
      } = r,
      h = Ce(r.TransitionProps, r0),
      m = Ce(r, a0),
      S = io(),
      T = S.direction === 'rtl',
      C = g({}, r, {
        autoFocus: a,
        disableAutoFocusItem: s,
        MenuListProps: l,
        onEntering: y,
        PaperProps: d,
        transitionDuration: b,
        TransitionProps: h,
        variant: v,
      }),
      E = l0(C),
      f = a && !s && u,
      w = x.useRef(null),
      k = (D, _) => {
        w.current && w.current.adjustStyleForScrollbar(D, S), y && y(D, _);
      },
      V = (D) => {
        D.key === 'Tab' && (D.preventDefault(), c && c(D, 'tabKeyDown'));
      };
    let L = -1;
    return (
      x.Children.map(i, (D, _) => {
        /* @__PURE__ */ x.isValidElement(D) &&
          (process.env.NODE_ENV !== 'production' &&
            oi.isFragment(D) &&
            console.error(
              [
                "MUI: The Menu component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join(`
`),
            ),
          D.props.disabled ||
            (((v === 'selectedMenu' && D.props.selected) || L === -1) && (L = _)));
      }),
      /* @__PURE__ */ A(
        c0,
        g(
          {
            onClose: c,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: T ? 'right' : 'left',
            },
            transformOrigin: T ? i0 : s0,
            PaperProps: g(
              {
                as: u0,
              },
              d,
              {
                classes: g({}, d.classes, {
                  root: E.paper,
                }),
              },
            ),
            className: E.root,
            open: u,
            ref: o,
            transitionDuration: b,
            TransitionProps: g(
              {
                onEntering: k,
              },
              h,
            ),
            ownerState: C,
          },
          m,
          {
            classes: p,
            children: /* @__PURE__ */ A(
              d0,
              g(
                {
                  onKeyDown: V,
                  actions: w,
                  autoFocus: a && (L === -1 || s),
                  autoFocusItem: f,
                  variant: v,
                },
                l,
                {
                  className: Ee(E.list, l.className),
                  children: i,
                },
              ),
            ),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (tu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the menu.
     */
    anchorEl: n.oneOfType([on, n.func]),
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
const p0 = tu;
function f0(e) {
  return Ae('MuiMenuItem', e);
}
const m0 = Pe('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  vo = m0,
  h0 = [
    'autoFocus',
    'component',
    'dense',
    'divider',
    'disableGutters',
    'focusVisibleClassName',
    'role',
    'tabIndex',
    'className',
  ],
  b0 = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  g0 = (e) => {
    const { disabled: t, dense: o, divider: r, disableGutters: a, selected: i, classes: s } = e,
      c = Fe(
        {
          root: [
            'root',
            o && 'dense',
            t && 'disabled',
            !a && 'gutters',
            r && 'divider',
            i && 'selected',
          ],
        },
        f0,
        s,
      );
    return g({}, s, c);
  },
  v0 = pe(oo, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: b0,
  })(({ theme: e, ownerState: t }) =>
    g(
      {},
      e.typography.body1,
      {
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
      },
      !t.disableGutters && {
        paddingLeft: 16,
        paddingRight: 16,
      },
      t.divider && {
        borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
        backgroundClip: 'padding-box',
      },
      {
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: (e.vars || e).palette.action.hover,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
        [`&.${vo.selected}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
            : Je(e.palette.primary.main, e.palette.action.selectedOpacity),
          [`&.${vo.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Je(
                  e.palette.primary.main,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        [`&.${vo.selected}:hover`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : Je(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
              : Je(e.palette.primary.main, e.palette.action.selectedOpacity),
          },
        },
        [`&.${vo.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus,
        },
        [`&.${vo.disabled}`]: {
          opacity: (e.vars || e).palette.action.disabledOpacity,
        },
        [`& + .${Ys.root}`]: {
          marginTop: e.spacing(1),
          marginBottom: e.spacing(1),
        },
        [`& + .${Ys.inset}`]: {
          marginLeft: 52,
        },
        [`& .${Js.root}`]: {
          marginTop: 0,
          marginBottom: 0,
        },
        [`& .${Js.inset}`]: {
          paddingLeft: 36,
        },
        [`& .${Xs.root}`]: {
          minWidth: 36,
        },
      },
      !t.dense && {
        [e.breakpoints.up('sm')]: {
          minHeight: 'auto',
        },
      },
      t.dense &&
        g(
          {
            minHeight: 32,
            // https://m2.material.io/components/menus#specs > Dense
            paddingTop: 4,
            paddingBottom: 4,
          },
          e.typography.body2,
          {
            [`& .${Xs.root} svg`]: {
              fontSize: '1.25rem',
            },
          },
        ),
    ),
  ),
  nu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiMenuItem',
      }),
      {
        autoFocus: a = !1,
        component: i = 'li',
        dense: s = !1,
        divider: l = !1,
        disableGutters: c = !1,
        focusVisibleClassName: u,
        role: d = 'menuitem',
        tabIndex: p,
        className: b,
      } = r,
      y = Ce(r, h0),
      v = x.useContext(Sa),
      h = x.useMemo(
        () => ({
          dense: s || v.dense || !1,
          disableGutters: c,
        }),
        [v.dense, s, c],
      ),
      m = x.useRef(null);
    rn(() => {
      a &&
        (m.current
          ? m.current.focus()
          : process.env.NODE_ENV !== 'production' &&
            console.error(
              'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
            ));
    }, [a]);
    const S = g({}, r, {
        dense: h.dense,
        divider: l,
        disableGutters: c,
      }),
      T = g0(r),
      C = dt(m, o);
    let E;
    return (
      r.disabled || (E = p !== void 0 ? p : -1),
      /* @__PURE__ */ A(Sa.Provider, {
        value: h,
        children: /* @__PURE__ */ A(
          v0,
          g(
            {
              ref: C,
              role: d,
              tabIndex: E,
              component: i,
              focusVisibleClassName: Ee(T.focusVisible, u),
              className: Ee(T.root, b),
            },
            y,
            {
              ownerState: S,
              classes: T,
            },
          ),
        ),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (nu.propTypes = {
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
const y0 = nu;
function x0(e) {
  return Ae('MuiNativeSelect', e);
}
const E0 = Pe('MuiNativeSelect', [
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
  ]),
  fi = E0,
  C0 = ['className', 'disabled', 'IconComponent', 'inputRef', 'variant'],
  O0 = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: a, open: i } = e,
      s = {
        select: ['select', o, r && 'disabled', a && 'multiple'],
        icon: ['icon', `icon${Q(o)}`, i && 'iconOpen', r && 'disabled'],
      };
    return Fe(s, x0, t);
  },
  ou = ({ ownerState: e, theme: t }) =>
    g(
      {
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
        '&:focus': g(
          {},
          t.vars
            ? {
                backgroundColor: `rgba(${t.vars.palette.common.onBackgroundChannel} / 0.05)`,
              }
            : {
                backgroundColor:
                  t.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
              },
          {
            borderRadius: 0,
            // Reset Chrome style
          },
        ),
        // Remove IE11 arrow
        '&::-ms-expand': {
          display: 'none',
        },
        [`&.${fi.disabled}`]: {
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
      },
      e.variant === 'filled' && {
        '&&&': {
          paddingRight: 32,
        },
      },
      e.variant === 'outlined' && {
        borderRadius: (t.vars || t).shape.borderRadius,
        '&:focus': {
          borderRadius: (t.vars || t).shape.borderRadius,
          // Reset the reset for Chrome style
        },
        '&&&': {
          paddingRight: 32,
        },
      },
    ),
  T0 = pe('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: Xt,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.select,
        t[o.variant],
        {
          [`&.${fi.multiple}`]: t.multiple,
        },
      ];
    },
  })(ou),
  ru = ({ ownerState: e, theme: t }) =>
    g(
      {
        // We use a position absolute over a flexbox in order to forward the pointer events
        // to the input and to support wrapping tags..
        position: 'absolute',
        right: 0,
        top: 'calc(50% - .5em)',
        // Center vertically, height is 1em
        pointerEvents: 'none',
        // Don't block pointer events on the select under the icon.
        color: (t.vars || t).palette.action.active,
        [`&.${fi.disabled}`]: {
          color: (t.vars || t).palette.action.disabled,
        },
      },
      e.open && {
        transform: 'rotate(180deg)',
      },
      e.variant === 'filled' && {
        right: 7,
      },
      e.variant === 'outlined' && {
        right: 7,
      },
    ),
  S0 = pe('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${Q(o.variant)}`], o.open && t.iconOpen];
    },
  })(ru),
  au = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const { className: r, disabled: a, IconComponent: i, inputRef: s, variant: l = 'standard' } = t,
      c = Ce(t, C0),
      u = g({}, t, {
        disabled: a,
        variant: l,
      }),
      d = O0(u);
    return /* @__PURE__ */ Qe(x.Fragment, {
      children: [
        /* @__PURE__ */ A(
          T0,
          g(
            {
              ownerState: u,
              className: Ee(d.select, r),
              disabled: a,
              ref: s || o,
            },
            c,
          ),
        ),
        t.multiple
          ? null
          : /* @__PURE__ */ A(S0, {
              as: i,
              ownerState: u,
              className: d.icon,
            }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (au.propTypes = {
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
     * The icon that displays the arrow.
     */
    IconComponent: n.elementType.isRequired,
    /**
     * Use that prop to pass a ref to the native select element.
     * @deprecated
     */
    inputRef: Nt,
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
const w0 = au;
var nl;
const k0 = ['children', 'classes', 'className', 'label', 'notched'],
  R0 = pe('fieldset')({
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
  N0 = pe('legend')(({ ownerState: e, theme: t }) =>
    g(
      {
        float: 'unset',
        // Fix conflict with bootstrap
        width: 'auto',
        // Fix conflict with bootstrap
        overflow: 'hidden',
      },
      !e.withLabel && {
        padding: 0,
        lineHeight: '11px',
        // sync with `height` in `legend` styles
        transition: t.transitions.create('width', {
          duration: 150,
          easing: t.transitions.easing.easeOut,
        }),
      },
      e.withLabel &&
        g(
          {
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
          },
          e.notched && {
            maxWidth: '100%',
            transition: t.transitions.create('max-width', {
              duration: 100,
              easing: t.transitions.easing.easeOut,
              delay: 50,
            }),
          },
        ),
    ),
  );
function iu(e) {
  const { className: t, label: o, notched: r } = e,
    a = Ce(e, k0),
    i = o != null && o !== '',
    s = g({}, e, {
      notched: r,
      withLabel: i,
    });
  return /* @__PURE__ */ A(
    R0,
    g(
      {
        'aria-hidden': !0,
        className: t,
        ownerState: s,
      },
      a,
      {
        children: /* @__PURE__ */ A(N0, {
          ownerState: s,
          children: i
            ? /* @__PURE__ */ A('span', {
                children: o,
              })
            : // notranslate needed while Google Translate will not fix zero-width space issue
              nl ||
              (nl = /* @__PURE__ */ A('span', {
                className: 'notranslate',
                children: '​',
              })),
        }),
      },
    ),
  );
}
process.env.NODE_ENV !== 'production' &&
  (iu.propTypes = {
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
const $0 = [
    'components',
    'fullWidth',
    'inputComponent',
    'label',
    'multiline',
    'notched',
    'slots',
    'type',
  ],
  P0 = (e) => {
    const { classes: t } = e,
      r = Fe(
        {
          root: ['root'],
          notchedOutline: ['notchedOutline'],
          input: ['input'],
        },
        rv,
        t,
      );
    return g({}, t, r);
  },
  I0 = pe(zr, {
    shouldForwardProp: (e) => Xt(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: jr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return g(
      {
        position: 'relative',
        borderRadius: (e.vars || e).shape.borderRadius,
        [`&:hover .${Qt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.text.primary,
        },
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          [`&:hover .${Qt.notchedOutline}`]: {
            borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
          },
        },
        [`&.${Qt.focused} .${Qt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[t.color].main,
          borderWidth: 2,
        },
        [`&.${Qt.error} .${Qt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.error.main,
        },
        [`&.${Qt.disabled} .${Qt.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.action.disabled,
        },
      },
      t.startAdornment && {
        paddingLeft: 14,
      },
      t.endAdornment && {
        paddingRight: 14,
      },
      t.multiline &&
        g(
          {
            padding: '16.5px 14px',
          },
          t.size === 'small' && {
            padding: '8.5px 14px',
          },
        ),
    );
  }),
  _0 = pe(iu, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  M0 = pe(Br, {
    name: 'MuiOutlinedInput',
    slot: 'Input',
    overridesResolver: Vr,
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        padding: '16.5px 14px',
      },
      !e.vars && {
        '&:-webkit-autofill': {
          WebkitBoxShadow: e.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
          WebkitTextFillColor: e.palette.mode === 'light' ? null : '#fff',
          caretColor: e.palette.mode === 'light' ? null : '#fff',
          borderRadius: 'inherit',
        },
      },
      e.vars && {
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
      },
      t.size === 'small' && {
        padding: '8.5px 14px',
      },
      t.multiline && {
        padding: 0,
      },
      t.startAdornment && {
        paddingLeft: 0,
      },
      t.endAdornment && {
        paddingRight: 0,
      },
    ),
  ),
  mi = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a, i, s, l;
    const c = ze({
        props: t,
        name: 'MuiOutlinedInput',
      }),
      {
        components: u = {},
        fullWidth: d = !1,
        inputComponent: p = 'input',
        label: b,
        multiline: y = !1,
        notched: v,
        slots: h = {},
        type: m = 'text',
      } = c,
      S = Ce(c, $0),
      T = P0(c),
      C = Dn(),
      E = lo({
        props: c,
        muiFormControl: C,
        states: ['required'],
      }),
      f = g({}, c, {
        color: E.color || 'primary',
        disabled: E.disabled,
        error: E.error,
        focused: E.focused,
        formControl: C,
        fullWidth: d,
        hiddenLabel: E.hiddenLabel,
        multiline: y,
        size: E.size,
        type: m,
      }),
      w = (r = (a = h.root) != null ? a : u.Root) != null ? r : I0,
      k = (i = (s = h.input) != null ? s : u.Input) != null ? i : M0;
    return /* @__PURE__ */ A(
      ci,
      g(
        {
          slots: {
            root: w,
            input: k,
          },
          renderSuffix: (V) =>
            /* @__PURE__ */ A(_0, {
              ownerState: f,
              className: T.notchedOutline,
              label:
                b != null && b !== '' && E.required
                  ? l ||
                    (l = /* @__PURE__ */ Qe(x.Fragment, {
                      children: [b, ' ', '*'],
                    }))
                  : b,
              notched: typeof v < 'u' ? v : !!(V.startAdornment || V.filled || V.focused),
            }),
          fullWidth: d,
          inputComponent: p,
          multiline: y,
          ref: o,
          type: m,
        },
        S,
        {
          classes: g({}, T, {
            notchedOutline: null,
          }),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (mi.propTypes = {
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
    inputRef: Nt,
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
mi.muiName = 'Input';
const su = mi;
function A0(e) {
  return Ae('MuiSelect', e);
}
const D0 = Pe('MuiSelect', [
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
  ]),
  Xo = D0;
var ol;
const L0 = [
    'aria-describedby',
    'aria-label',
    'autoFocus',
    'autoWidth',
    'children',
    'className',
    'defaultOpen',
    'defaultValue',
    'disabled',
    'displayEmpty',
    'IconComponent',
    'inputRef',
    'labelId',
    'MenuProps',
    'multiple',
    'name',
    'onBlur',
    'onChange',
    'onClose',
    'onFocus',
    'onOpen',
    'open',
    'readOnly',
    'renderValue',
    'SelectDisplayProps',
    'tabIndex',
    'type',
    'value',
    'variant',
  ],
  F0 = pe('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        // Win specificity over the input base
        {
          [`&.${Xo.select}`]: t.select,
        },
        {
          [`&.${Xo.select}`]: t[o.variant],
        },
        {
          [`&.${Xo.multiple}`]: t.multiple,
        },
      ];
    },
  })(ou, {
    // Win specificity over the input base
    [`&.${Xo.select}`]: {
      height: 'auto',
      // Resets for multiple select with chips
      minHeight: '1.4375em',
      // Required for select\text-field height consistency
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  j0 = pe('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${Q(o.variant)}`], o.open && t.iconOpen];
    },
  })(ru),
  V0 = pe('input', {
    shouldForwardProp: (e) => Ga(e) && e !== 'classes',
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
function rl(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function z0(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const B0 = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: a, open: i } = e,
      s = {
        select: ['select', o, r && 'disabled', a && 'multiple'],
        icon: ['icon', `icon${Q(o)}`, i && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return Fe(s, A0, t);
  },
  lu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const {
        'aria-describedby': r,
        'aria-label': a,
        autoFocus: i,
        autoWidth: s,
        children: l,
        className: c,
        defaultOpen: u,
        defaultValue: d,
        disabled: p,
        displayEmpty: b,
        IconComponent: y,
        inputRef: v,
        labelId: h,
        MenuProps: m = {},
        multiple: S,
        name: T,
        onBlur: C,
        onChange: E,
        onClose: f,
        onFocus: w,
        onOpen: k,
        open: V,
        readOnly: L,
        renderValue: D,
        SelectDisplayProps: _ = {},
        tabIndex: Y,
        value: B,
        variant: M = 'standard',
      } = t,
      F = Ce(t, L0),
      [z, ie] = Pn({
        controlled: B,
        default: d,
        name: 'Select',
      }),
      [se, G] = Pn({
        controlled: V,
        default: u,
        name: 'Select',
      }),
      R = x.useRef(null),
      j = x.useRef(null),
      [X, H] = x.useState(null),
      { current: U } = x.useRef(V != null),
      [ne, oe] = x.useState(),
      J = dt(o, v),
      ae = x.useCallback((ee) => {
        (j.current = ee), ee && H(ee);
      }, []),
      le = X == null ? void 0 : X.parentNode;
    x.useImperativeHandle(
      J,
      () => ({
        focus: () => {
          j.current.focus();
        },
        node: R.current,
        value: z,
      }),
      [z],
    ),
      x.useEffect(() => {
        u && se && X && !U && (oe(s ? null : le.clientWidth), j.current.focus());
      }, [X, s]),
      x.useEffect(() => {
        i && j.current.focus();
      }, [i]),
      x.useEffect(() => {
        if (!h) return;
        const ee = ct(j.current).getElementById(h);
        if (ee) {
          const ye = () => {
            getSelection().isCollapsed && j.current.focus();
          };
          return (
            ee.addEventListener('click', ye),
            () => {
              ee.removeEventListener('click', ye);
            }
          );
        }
      }, [h]);
    const he = (ee, ye) => {
        ee ? k && k(ye) : f && f(ye), U || (oe(s ? null : le.clientWidth), G(ee));
      },
      re = (ee) => {
        ee.button === 0 && (ee.preventDefault(), j.current.focus(), he(!0, ee));
      },
      P = (ee) => {
        he(!1, ee);
      },
      Oe = x.Children.toArray(l),
      I = (ee) => {
        const ye = Oe.map((Ie) => Ie.props.value).indexOf(ee.target.value);
        if (ye === -1) return;
        const xe = Oe[ye];
        ie(xe.props.value), E && E(ee, xe);
      },
      W = (ee) => (ye) => {
        let xe;
        if (ye.currentTarget.hasAttribute('tabindex')) {
          if (S) {
            xe = Array.isArray(z) ? z.slice() : [];
            const Ie = z.indexOf(ee.props.value);
            Ie === -1 ? xe.push(ee.props.value) : xe.splice(Ie, 1);
          } else xe = ee.props.value;
          if ((ee.props.onClick && ee.props.onClick(ye), z !== xe && (ie(xe), E))) {
            const Ie = ye.nativeEvent || ye,
              it = new Ie.constructor(Ie.type, Ie);
            Object.defineProperty(it, 'target', {
              writable: !0,
              value: {
                value: xe,
                name: T,
              },
            }),
              E(it, ee);
          }
          S || he(!1, ye);
        }
      },
      Ne = (ee) => {
        L ||
          ([
            ' ',
            'ArrowUp',
            'ArrowDown',
            // The native select doesn't respond to enter on macOS, but it's recommended by
            // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
            'Enter',
          ].indexOf(ee.key) !== -1 &&
            (ee.preventDefault(), he(!0, ee)));
      },
      ge = X !== null && se,
      et = (ee) => {
        !ge &&
          C &&
          (Object.defineProperty(ee, 'target', {
            writable: !0,
            value: {
              value: z,
              name: T,
            },
          }),
          C(ee));
      };
    delete F['aria-invalid'];
    let je, Se;
    const ke = [];
    let tt = !1,
      at = !1;
    (li({
      value: z,
    }) ||
      b) &&
      (D ? (je = D(z)) : (tt = !0));
    const Z = Oe.map((ee) => {
      if (!(/* @__PURE__ */ x.isValidElement(ee))) return null;
      process.env.NODE_ENV !== 'production' &&
        oi.isFragment(ee) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let ye;
      if (S) {
        if (!Array.isArray(z))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : Cn(2),
          );
        (ye = z.some((xe) => rl(xe, ee.props.value))), ye && tt && ke.push(ee.props.children);
      } else (ye = rl(z, ee.props.value)), ye && tt && (Se = ee.props.children);
      return (
        ye && (at = !0),
        /* @__PURE__ */ x.cloneElement(ee, {
          'aria-selected': ye ? 'true' : 'false',
          onClick: W(ee),
          onKeyUp: (xe) => {
            xe.key === ' ' && xe.preventDefault(), ee.props.onKeyUp && ee.props.onKeyUp(xe);
          },
          role: 'option',
          selected: ye,
          value: void 0,
          // The value is most likely not a valid HTML attribute.
          'data-value': ee.props.value,
          // Instead, we provide it as a data attribute.
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      x.useEffect(() => {
        if (!at && !S && z !== '') {
          const ee = Oe.map((ye) => ye.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${z}\` for the select ${
                T ? `(name="${T}") ` : ''
              }component.`,
              "Consider providing a value that matches one of the available options or ''.",
              `The available values are ${
                ee
                  .filter((ye) => ye != null)
                  .map((ye) => `\`${ye}\``)
                  .join(', ') || '""'
              }.`,
            ].join(`
`),
          );
        }
      }, [at, Oe, S, T, z]),
      tt &&
        (S
          ? ke.length === 0
            ? (je = null)
            : (je = ke.reduce(
                (ee, ye, xe) => (ee.push(ye), xe < ke.length - 1 && ee.push(', '), ee),
                [],
              ))
          : (je = Se));
    let me = ne;
    !s && U && X && (me = le.clientWidth);
    let ve;
    typeof Y < 'u' ? (ve = Y) : (ve = p ? null : 0);
    const be = _.id || (T ? `mui-component-select-${T}` : void 0),
      fe = g({}, t, {
        variant: M,
        value: z,
        open: ge,
      }),
      ue = B0(fe);
    return /* @__PURE__ */ Qe(x.Fragment, {
      children: [
        /* @__PURE__ */ A(
          F0,
          g(
            {
              ref: ae,
              tabIndex: ve,
              role: 'button',
              'aria-disabled': p ? 'true' : void 0,
              'aria-expanded': ge ? 'true' : 'false',
              'aria-haspopup': 'listbox',
              'aria-label': a,
              'aria-labelledby': [h, be].filter(Boolean).join(' ') || void 0,
              'aria-describedby': r,
              onKeyDown: Ne,
              onMouseDown: p || L ? null : re,
              onBlur: et,
              onFocus: w,
            },
            _,
            {
              ownerState: fe,
              className: Ee(_.className, ue.select, c),
              id: be,
              children: z0(je)
                ? // notranslate needed while Google Translate will not fix zero-width space issue
                  ol ||
                  (ol = /* @__PURE__ */ A('span', {
                    className: 'notranslate',
                    children: '​',
                  }))
                : je,
            },
          ),
        ),
        /* @__PURE__ */ A(
          V0,
          g(
            {
              value: Array.isArray(z) ? z.join(',') : z,
              name: T,
              ref: R,
              'aria-hidden': !0,
              onChange: I,
              tabIndex: -1,
              disabled: p,
              className: ue.nativeInput,
              autoFocus: i,
              ownerState: fe,
            },
            F,
          ),
        ),
        /* @__PURE__ */ A(j0, {
          as: y,
          className: ue.icon,
          ownerState: fe,
        }),
        /* @__PURE__ */ A(
          p0,
          g(
            {
              id: `menu-${T || ''}`,
              anchorEl: le,
              open: ge,
              onClose: P,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            },
            m,
            {
              MenuListProps: g(
                {
                  'aria-labelledby': h,
                  role: 'listbox',
                  disableListWrap: !0,
                },
                m.MenuListProps,
              ),
              PaperProps: g({}, m.PaperProps, {
                style: g(
                  {
                    minWidth: me,
                  },
                  m.PaperProps != null ? m.PaperProps.style : null,
                ),
              }),
              children: Z,
            },
          ),
        ),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (lu.propTypes = {
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
     * The icon that displays the arrow.
     */
    IconComponent: n.elementType.isRequired,
    /**
     * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
     * Equivalent to `ref`
     */
    inputRef: Nt,
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
const U0 = lu;
var al, il;
const W0 = [
    'autoWidth',
    'children',
    'classes',
    'className',
    'defaultOpen',
    'displayEmpty',
    'IconComponent',
    'id',
    'input',
    'inputProps',
    'label',
    'labelId',
    'MenuProps',
    'multiple',
    'native',
    'onClose',
    'onOpen',
    'open',
    'renderValue',
    'SelectDisplayProps',
    'variant',
  ],
  H0 = (e) => {
    const { classes: t } = e;
    return t;
  },
  hi = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => Xt(e) && e !== 'variant',
    slot: 'Root',
  },
  q0 = pe(Kc, hi)(''),
  Y0 = pe(su, hi)(''),
  K0 = pe(Bc, hi)(''),
  bi = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        name: 'MuiSelect',
        props: t,
      }),
      {
        autoWidth: a = !1,
        children: i,
        classes: s = {},
        className: l,
        defaultOpen: c = !1,
        displayEmpty: u = !1,
        IconComponent: d = Pc,
        id: p,
        input: b,
        inputProps: y,
        label: v,
        labelId: h,
        MenuProps: m,
        multiple: S = !1,
        native: T = !1,
        onClose: C,
        onOpen: E,
        open: f,
        renderValue: w,
        SelectDisplayProps: k,
        variant: V = 'outlined',
      } = r,
      L = Ce(r, W0),
      D = T ? w0 : U0,
      _ = Dn(),
      B =
        lo({
          props: r,
          muiFormControl: _,
          states: ['variant'],
        }).variant || V,
      M =
        b ||
        {
          standard: al || (al = /* @__PURE__ */ A(q0, {})),
          outlined: /* @__PURE__ */ A(Y0, {
            label: v,
          }),
          filled: il || (il = /* @__PURE__ */ A(K0, {})),
        }[B],
      F = g({}, r, {
        variant: B,
        classes: s,
      }),
      z = H0(F),
      ie = dt(o, M.ref);
    return /* @__PURE__ */ A(x.Fragment, {
      children: /* @__PURE__ */ x.cloneElement(
        M,
        g(
          {
            // Most of the logic is implemented in `SelectInput`.
            // The `Select` component is a simple API wrapper to expose something better to play with.
            inputComponent: D,
            inputProps: g(
              {
                children: i,
                IconComponent: d,
                variant: B,
                type: void 0,
                // We render a select. We can ignore the type provided by the `Input`.
                multiple: S,
              },
              T
                ? {
                    id: p,
                  }
                : {
                    autoWidth: a,
                    defaultOpen: c,
                    displayEmpty: u,
                    labelId: h,
                    MenuProps: m,
                    onClose: C,
                    onOpen: E,
                    open: f,
                    renderValue: w,
                    SelectDisplayProps: g(
                      {
                        id: p,
                      },
                      k,
                    ),
                  },
              y,
              {
                classes: y ? Ft(z, y.classes) : z,
              },
              b ? b.props.inputProps : {},
            ),
          },
          S && T && B === 'outlined'
            ? {
                notched: !0,
              }
            : {},
          {
            ref: ie,
            className: Ee(M.props.className, l),
          },
          !b && {
            variant: B,
          },
          L,
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (bi.propTypes = {
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
     * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapes).
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
bi.muiName = 'Select';
const G0 = bi,
  X0 = (e) => !e || !En(e),
  J0 = X0;
function Z0(e) {
  return Ae('MuiSlider', e);
}
const Q0 = Pe('MuiSlider', [
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
  qt = Q0,
  ex = (e) => {
    const { open: t } = e;
    return {
      offset: Ee(t && qt.valueLabelOpen),
      circle: qt.valueLabelCircle,
      label: qt.valueLabelLabel,
    };
  };
function cu(e) {
  const { children: t, className: o, value: r } = e,
    a = ex(e);
  return t
    ? /* @__PURE__ */ x.cloneElement(
        t,
        {
          className: Ee(t.props.className),
        },
        /* @__PURE__ */ Qe(x.Fragment, {
          children: [
            t.props.children,
            /* @__PURE__ */ A('span', {
              className: Ee(a.offset, o),
              'aria-hidden': !0,
              children: /* @__PURE__ */ A('span', {
                className: a.circle,
                children: /* @__PURE__ */ A('span', {
                  className: a.label,
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
  (cu.propTypes = {
    children: n.element.isRequired,
    className: n.string,
    value: n.node,
  });
const tx = [
  'aria-label',
  'aria-valuetext',
  'aria-labelledby',
  'component',
  'components',
  'componentsProps',
  'color',
  'classes',
  'className',
  'disableSwap',
  'disabled',
  'getAriaLabel',
  'getAriaValueText',
  'marks',
  'max',
  'min',
  'name',
  'onChange',
  'onChangeCommitted',
  'orientation',
  'size',
  'step',
  'scale',
  'slotProps',
  'slots',
  'tabIndex',
  'track',
  'value',
  'valueLabelDisplay',
  'valueLabelFormat',
];
function sl(e) {
  return e;
}
const uu = pe('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      t[`color${Q(o.color)}`],
      o.size !== 'medium' && t[`size${Q(o.size)}`],
      o.marked && t.marked,
      o.orientation === 'vertical' && t.vertical,
      o.track === 'inverted' && t.trackInverted,
      o.track === !1 && t.trackFalse,
    ];
  },
})(({ theme: e, ownerState: t }) =>
  g(
    {
      borderRadius: 12,
      boxSizing: 'content-box',
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      touchAction: 'none',
      color: (e.vars || e).palette[t.color].main,
      WebkitTapHighlightColor: 'transparent',
    },
    t.orientation === 'horizontal' &&
      g(
        {
          height: 4,
          width: '100%',
          padding: '13px 0',
          // The primary input mechanism of the device includes a pointing device of limited accuracy.
          '@media (pointer: coarse)': {
            // Reach 42px touch target, about ~8mm on screen.
            padding: '20px 0',
          },
        },
        t.size === 'small' && {
          height: 2,
        },
        t.marked && {
          marginBottom: 20,
        },
      ),
    t.orientation === 'vertical' &&
      g(
        {
          height: '100%',
          width: 4,
          padding: '0 13px',
          // The primary input mechanism of the device includes a pointing device of limited accuracy.
          '@media (pointer: coarse)': {
            // Reach 42px touch target, about ~8mm on screen.
            padding: '0 20px',
          },
        },
        t.size === 'small' && {
          width: 2,
        },
        t.marked && {
          marginRight: 44,
        },
      ),
    {
      '@media print': {
        colorAdjust: 'exact',
      },
      [`&.${qt.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        color: (e.vars || e).palette.grey[400],
      },
      [`&.${qt.dragging}`]: {
        [`& .${qt.thumb}, & .${qt.track}`]: {
          transition: 'none',
        },
      },
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (uu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const du = pe('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (e, t) => t.rail,
})(({ ownerState: e }) =>
  g(
    {
      display: 'block',
      position: 'absolute',
      borderRadius: 'inherit',
      backgroundColor: 'currentColor',
      opacity: 0.38,
    },
    e.orientation === 'horizontal' && {
      width: '100%',
      height: 'inherit',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    e.orientation === 'vertical' && {
      height: '100%',
      width: 'inherit',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    e.track === 'inverted' && {
      opacity: 1,
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (du.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const pu = pe('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (e, t) => t.track,
})(({ theme: e, ownerState: t }) => {
  const o =
    // Same logic as the LinearProgress track color
    e.palette.mode === 'light'
      ? _r(e.palette[t.color].main, 0.62)
      : Ir(e.palette[t.color].main, 0.5);
  return g(
    {
      display: 'block',
      position: 'absolute',
      borderRadius: 'inherit',
      border: '1px solid currentColor',
      backgroundColor: 'currentColor',
      transition: e.transitions.create(['left', 'width', 'bottom', 'height'], {
        duration: e.transitions.duration.shortest,
      }),
    },
    t.size === 'small' && {
      border: 'none',
    },
    t.orientation === 'horizontal' && {
      height: 'inherit',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    t.orientation === 'vertical' && {
      width: 'inherit',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    t.track === !1 && {
      display: 'none',
    },
    t.track === 'inverted' && {
      backgroundColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : o,
      borderColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : o,
    },
  );
});
process.env.NODE_ENV !== 'production' &&
  (pu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const fu = pe('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.thumb,
      t[`thumbColor${Q(o.color)}`],
      o.size !== 'medium' && t[`thumbSize${Q(o.size)}`],
    ];
  },
})(({ theme: e, ownerState: t }) =>
  g(
    {
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
    },
    t.size === 'small' && {
      width: 12,
      height: 12,
    },
    t.orientation === 'horizontal' && {
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    t.orientation === 'vertical' && {
      left: '50%',
      transform: 'translate(-50%, 50%)',
    },
    {
      '&:before': g(
        {
          position: 'absolute',
          content: '""',
          borderRadius: 'inherit',
          width: '100%',
          height: '100%',
          boxShadow: (e.vars || e).shadows[2],
        },
        t.size === 'small' && {
          boxShadow: 'none',
        },
      ),
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
      [`&:hover, &.${qt.focusVisible}`]: {
        boxShadow: `0px 0px 0px 8px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : Je(e.palette[t.color].main, 0.16)
        }`,
        '@media (hover: none)': {
          boxShadow: 'none',
        },
      },
      [`&.${qt.active}`]: {
        boxShadow: `0px 0px 0px 14px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : Je(e.palette[t.color].main, 0.16)
        }`,
      },
      [`&.${qt.disabled}`]: {
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (fu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const mu = pe(cu, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) =>
  g(
    {
      [`&.${qt.valueLabelOpen}`]: {
        transform: 'translateY(-100%) scale(1)',
      },
      zIndex: 1,
      whiteSpace: 'nowrap',
    },
    e.typography.body2,
    {
      fontWeight: 500,
      transition: e.transitions.create(['transform'], {
        duration: e.transitions.duration.shortest,
      }),
      transform: 'translateY(-100%) scale(0)',
      position: 'absolute',
      backgroundColor: (e.vars || e).palette.grey[600],
      borderRadius: 2,
      color: (e.vars || e).palette.common.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem 0.75rem',
    },
    t.orientation === 'horizontal' && {
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
    },
    t.orientation === 'vertical' && {
      right: '30px',
      top: '24px',
      transformOrigin: 'right center',
      '&:before': {
        position: 'absolute',
        content: '""',
        width: 8,
        height: 8,
        transform: 'translate(-50%, 50%) rotate(45deg)',
        backgroundColor: 'inherit',
        right: '-20%',
        top: '25%',
      },
    },
    t.size === 'small' && {
      fontSize: e.typography.pxToRem(12),
      padding: '0.25rem 0.5rem',
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (mu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const hu = pe('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => Ga(e) && e !== 'markActive',
  overridesResolver: (e, t) => {
    const { markActive: o } = e;
    return [t.mark, o && t.markActive];
  },
})(({ theme: e, ownerState: t, markActive: o }) =>
  g(
    {
      position: 'absolute',
      width: 2,
      height: 2,
      borderRadius: 1,
      backgroundColor: 'currentColor',
    },
    t.orientation === 'horizontal' && {
      top: '50%',
      transform: 'translate(-1px, -50%)',
    },
    t.orientation === 'vertical' && {
      left: '50%',
      transform: 'translate(-50%, 1px)',
    },
    o && {
      backgroundColor: (e.vars || e).palette.background.paper,
      opacity: 0.8,
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (hu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const bu = pe('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => Ga(e) && e !== 'markLabelActive',
  overridesResolver: (e, t) => t.markLabel,
})(({ theme: e, ownerState: t, markLabelActive: o }) =>
  g(
    {},
    e.typography.body2,
    {
      color: (e.vars || e).palette.text.secondary,
      position: 'absolute',
      whiteSpace: 'nowrap',
    },
    t.orientation === 'horizontal' && {
      top: 30,
      transform: 'translateX(-50%)',
      '@media (pointer: coarse)': {
        top: 40,
      },
    },
    t.orientation === 'vertical' && {
      left: 36,
      transform: 'translateY(50%)',
      '@media (pointer: coarse)': {
        left: 44,
      },
    },
    o && {
      color: (e.vars || e).palette.text.primary,
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (bu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const nx = (e) => {
    const {
        disabled: t,
        dragging: o,
        marked: r,
        orientation: a,
        track: i,
        classes: s,
        color: l,
        size: c,
      } = e,
      u = {
        root: [
          'root',
          t && 'disabled',
          o && 'dragging',
          r && 'marked',
          a === 'vertical' && 'vertical',
          i === 'inverted' && 'trackInverted',
          i === !1 && 'trackFalse',
          l && `color${Q(l)}`,
          c && `size${Q(c)}`,
        ],
        rail: ['rail'],
        track: ['track'],
        mark: ['mark'],
        markActive: ['markActive'],
        markLabel: ['markLabel'],
        markLabelActive: ['markLabelActive'],
        valueLabel: ['valueLabel'],
        thumb: ['thumb', t && 'disabled', c && `thumbSize${Q(c)}`, l && `thumbColor${Q(l)}`],
        active: ['active'],
        disabled: ['disabled'],
        focusVisible: ['focusVisible'],
      };
    return Fe(u, Z0, s);
  },
  ox = ({ children: e }) => e,
  gu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    var r, a, i, s, l, c, u, d, p, b, y, v, h, m, S, T, C, E, f, w, k, V, L, D;
    const _ = ze({
        props: t,
        name: 'MuiSlider',
      }),
      B = io().direction === 'rtl',
      {
        'aria-label': M,
        'aria-valuetext': F,
        'aria-labelledby': z,
        // eslint-disable-next-line react/prop-types
        component: ie = 'span',
        components: se = {},
        componentsProps: G = {},
        color: R = 'primary',
        classes: j,
        className: X,
        disableSwap: H = !1,
        disabled: U = !1,
        getAriaLabel: ne,
        getAriaValueText: oe,
        marks: J = !1,
        max: ae = 100,
        min: le = 0,
        orientation: he = 'horizontal',
        size: re = 'medium',
        step: P = 1,
        scale: Oe = sl,
        slotProps: I,
        slots: W,
        track: Ne = 'normal',
        valueLabelDisplay: ge = 'off',
        valueLabelFormat: et = sl,
      } = _,
      je = Ce(_, tx),
      Se = g({}, _, {
        isRtl: B,
        max: ae,
        min: le,
        classes: j,
        disabled: U,
        disableSwap: H,
        orientation: he,
        marks: J,
        color: R,
        size: re,
        step: P,
        scale: Oe,
        track: Ne,
        valueLabelDisplay: ge,
        valueLabelFormat: et,
      }),
      {
        axisProps: ke,
        getRootProps: tt,
        getHiddenInputProps: at,
        getThumbProps: Z,
        open: me,
        active: ve,
        axis: be,
        focusedThumbIndex: fe,
        range: ue,
        dragging: ee,
        marks: ye,
        values: xe,
        trackOffset: Ie,
        trackLeap: it,
      } = jb(
        g({}, Se, {
          ref: o,
        }),
      );
    (Se.marked = ye.length > 0 && ye.some((N) => N.label)),
      (Se.dragging = ee),
      (Se.focusedThumbIndex = fe);
    const ft = nx(Se),
      Tt = (r = (a = W == null ? void 0 : W.root) != null ? a : se.Root) != null ? r : uu,
      hn = (i = (s = W == null ? void 0 : W.rail) != null ? s : se.Rail) != null ? i : du,
      St = (l = (c = W == null ? void 0 : W.track) != null ? c : se.Track) != null ? l : pu,
      bt = (u = (d = W == null ? void 0 : W.thumb) != null ? d : se.Thumb) != null ? u : fu,
      xt =
        (p = (b = W == null ? void 0 : W.valueLabel) != null ? b : se.ValueLabel) != null ? p : mu,
      mt = (y = (v = W == null ? void 0 : W.mark) != null ? v : se.Mark) != null ? y : hu,
      nt = (h = (m = W == null ? void 0 : W.markLabel) != null ? m : se.MarkLabel) != null ? h : bu,
      ot = (S = (T = W == null ? void 0 : W.input) != null ? T : se.Input) != null ? S : 'input',
      ht = (C = I == null ? void 0 : I.root) != null ? C : G.root,
      Sn = (E = I == null ? void 0 : I.rail) != null ? E : G.rail,
      Jt = (f = I == null ? void 0 : I.track) != null ? f : G.track,
      bn = (w = I == null ? void 0 : I.thumb) != null ? w : G.thumb,
      Bt = (k = I == null ? void 0 : I.valueLabel) != null ? k : G.valueLabel,
      ln = (V = I == null ? void 0 : I.mark) != null ? V : G.mark,
      cn = (L = I == null ? void 0 : I.markLabel) != null ? L : G.markLabel,
      un = (D = I == null ? void 0 : I.input) != null ? D : G.input,
      Zt = Dt({
        elementType: Tt,
        getSlotProps: tt,
        externalSlotProps: ht,
        externalForwardedProps: je,
        additionalProps: g(
          {},
          J0(Tt) && {
            as: ie,
          },
        ),
        ownerState: g({}, Se, ht == null ? void 0 : ht.ownerState),
        className: [ft.root, X],
      }),
      dn = Dt({
        elementType: hn,
        externalSlotProps: Sn,
        ownerState: Se,
        className: ft.rail,
      }),
      _e = Dt({
        elementType: St,
        externalSlotProps: Jt,
        additionalProps: {
          style: g({}, ke[be].offset(Ie), ke[be].leap(it)),
        },
        ownerState: g({}, Se, Jt == null ? void 0 : Jt.ownerState),
        className: ft.track,
      }),
      ut = Dt({
        elementType: bt,
        getSlotProps: Z,
        externalSlotProps: bn,
        ownerState: g({}, Se, bn == null ? void 0 : bn.ownerState),
        className: ft.thumb,
      }),
      At = Dt({
        elementType: xt,
        externalSlotProps: Bt,
        ownerState: g({}, Se, Bt == null ? void 0 : Bt.ownerState),
        className: ft.valueLabel,
      }),
      O = Dt({
        elementType: mt,
        externalSlotProps: ln,
        ownerState: Se,
        className: ft.mark,
      }),
      q = Dt({
        elementType: nt,
        externalSlotProps: cn,
        ownerState: Se,
        className: ft.markLabel,
      }),
      ce = Dt({
        elementType: ot,
        getSlotProps: at,
        externalSlotProps: un,
        ownerState: Se,
      });
    return /* @__PURE__ */ Qe(
      Tt,
      g({}, Zt, {
        children: [
          /* @__PURE__ */ A(hn, g({}, dn)),
          /* @__PURE__ */ A(St, g({}, _e)),
          ye
            .filter((N) => N.value >= le && N.value <= ae)
            .map((N, $) => {
              const K = fr(N.value, le, ae),
                te = ke[be].offset(K);
              let de;
              return (
                Ne === !1
                  ? (de = xe.indexOf(N.value) !== -1)
                  : (de =
                      (Ne === 'normal' &&
                        (ue
                          ? N.value >= xe[0] && N.value <= xe[xe.length - 1]
                          : N.value <= xe[0])) ||
                      (Ne === 'inverted' &&
                        (ue
                          ? N.value <= xe[0] || N.value >= xe[xe.length - 1]
                          : N.value >= xe[0]))),
                /* @__PURE__ */ Qe(
                  x.Fragment,
                  {
                    children: [
                      /* @__PURE__ */ A(
                        mt,
                        g(
                          {
                            'data-index': $,
                          },
                          O,
                          !En(mt) && {
                            markActive: de,
                          },
                          {
                            style: g({}, te, O.style),
                            className: Ee(O.className, de && ft.markActive),
                          },
                        ),
                      ),
                      N.label != null
                        ? /* @__PURE__ */ A(
                            nt,
                            g(
                              {
                                'aria-hidden': !0,
                                'data-index': $,
                              },
                              q,
                              !En(nt) && {
                                markLabelActive: de,
                              },
                              {
                                style: g({}, te, q.style),
                                className: Ee(ft.markLabel, q.className, de && ft.markLabelActive),
                                children: N.label,
                              },
                            ),
                          )
                        : null,
                    ],
                  },
                  $,
                )
              );
            }),
          xe.map((N, $) => {
            const K = fr(N, le, ae),
              te = ke[be].offset(K),
              de = ge === 'off' ? ox : xt;
            return (
              /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
              /* @__PURE__ */ A(
                de,
                g(
                  {},
                  !En(de) && {
                    valueLabelFormat: et,
                    valueLabelDisplay: ge,
                    value: typeof et == 'function' ? et(Oe(N), $) : et,
                    index: $,
                    open: me === $ || ve === $ || ge === 'on',
                    disabled: U,
                  },
                  At,
                  {
                    children: /* @__PURE__ */ A(
                      bt,
                      g(
                        {
                          'data-index': $,
                        },
                        ut,
                        {
                          className: Ee(
                            ft.thumb,
                            ut.className,
                            ve === $ && ft.active,
                            fe === $ && ft.focusVisible,
                          ),
                          style: g(
                            {},
                            te,
                            {
                              pointerEvents: H && ve !== $ ? 'none' : void 0,
                            },
                            ut.style,
                          ),
                          children: /* @__PURE__ */ A(
                            ot,
                            g(
                              {
                                'data-index': $,
                                'aria-label': ne ? ne($) : M,
                                'aria-valuenow': Oe(N),
                                'aria-labelledby': z,
                                'aria-valuetext': oe ? oe(Oe(N), $) : F,
                                value: xe[$],
                              },
                              ce,
                            ),
                          ),
                        },
                      ),
                    ),
                  },
                ),
                $,
              )
            );
          }),
        ],
      }),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (gu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The label of the slider.
     */
    'aria-label': Kt(n.string, (e) =>
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
    'aria-valuetext': Kt(n.string, (e) =>
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
const rx = gu;
function ax(e) {
  return Ae('MuiSnackbarContent', e);
}
Pe('MuiSnackbarContent', ['root', 'message', 'action']);
const ix = ['action', 'className', 'message', 'role'],
  sx = (e) => {
    const { classes: t } = e;
    return Fe(
      {
        root: ['root'],
        action: ['action'],
        message: ['message'],
      },
      ax,
      t,
    );
  },
  lx = pe(Vo, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 0.8 : 0.98,
      o = mm(e.palette.background.default, t);
    return g({}, e.typography.body2, {
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
    });
  }),
  cx = pe('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({
    padding: '8px 0',
  }),
  ux = pe('div', {
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
  vu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiSnackbarContent',
      }),
      { action: a, className: i, message: s, role: l = 'alert' } = r,
      c = Ce(r, ix),
      u = r,
      d = sx(u);
    return /* @__PURE__ */ Qe(
      lx,
      g(
        {
          role: l,
          square: !0,
          elevation: 6,
          className: Ee(d.root, i),
          ownerState: u,
          ref: o,
        },
        c,
        {
          children: [
            /* @__PURE__ */ A(cx, {
              className: d.message,
              ownerState: u,
              children: s,
            }),
            a
              ? /* @__PURE__ */ A(ux, {
                  className: d.action,
                  ownerState: u,
                  children: a,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (vu.propTypes = {
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
const dx = vu;
function px(e) {
  return Ae('MuiSnackbar', e);
}
Pe('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const fx = ['onEnter', 'onExited'],
  mx = [
    'action',
    'anchorOrigin',
    'autoHideDuration',
    'children',
    'className',
    'ClickAwayListenerProps',
    'ContentProps',
    'disableWindowBlurListener',
    'message',
    'onBlur',
    'onClose',
    'onFocus',
    'onMouseEnter',
    'onMouseLeave',
    'open',
    'resumeHideDuration',
    'TransitionComponent',
    'transitionDuration',
    'TransitionProps',
  ],
  hx = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = {
        root: ['root', `anchorOrigin${Q(o.vertical)}${Q(o.horizontal)}`],
      };
    return Fe(r, px, t);
  },
  ll = pe('div', {
    name: 'MuiSnackbar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[`anchorOrigin${Q(o.anchorOrigin.vertical)}${Q(o.anchorOrigin.horizontal)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    const o = {
      left: '50%',
      right: 'auto',
      transform: 'translateX(-50%)',
    };
    return g(
      {
        zIndex: (e.vars || e).zIndex.snackbar,
        position: 'fixed',
        display: 'flex',
        left: 8,
        right: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      t.anchorOrigin.vertical === 'top'
        ? {
            top: 8,
          }
        : {
            bottom: 8,
          },
      t.anchorOrigin.horizontal === 'left' && {
        justifyContent: 'flex-start',
      },
      t.anchorOrigin.horizontal === 'right' && {
        justifyContent: 'flex-end',
      },
      {
        [e.breakpoints.up('sm')]: g(
          {},
          t.anchorOrigin.vertical === 'top'
            ? {
                top: 24,
              }
            : {
                bottom: 24,
              },
          t.anchorOrigin.horizontal === 'center' && o,
          t.anchorOrigin.horizontal === 'left' && {
            left: 24,
            right: 'auto',
          },
          t.anchorOrigin.horizontal === 'right' && {
            right: 24,
            left: 'auto',
          },
        ),
      },
    );
  }),
  yu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiSnackbar',
      }),
      a = io(),
      i = {
        enter: a.transitions.duration.enteringScreen,
        exit: a.transitions.duration.leavingScreen,
      },
      {
        action: s,
        anchorOrigin: { vertical: l, horizontal: c } = {
          vertical: 'bottom',
          horizontal: 'left',
        },
        autoHideDuration: u = null,
        children: d,
        className: p,
        ClickAwayListenerProps: b,
        ContentProps: y,
        disableWindowBlurListener: v = !1,
        message: h,
        open: m,
        TransitionComponent: S = Yc,
        transitionDuration: T = i,
        TransitionProps: { onEnter: C, onExited: E } = {},
      } = r,
      f = Ce(r.TransitionProps, fx),
      w = Ce(r, mx),
      k = g({}, r, {
        anchorOrigin: {
          vertical: l,
          horizontal: c,
        },
        autoHideDuration: u,
        disableWindowBlurListener: v,
        TransitionComponent: S,
        transitionDuration: T,
      }),
      V = hx(k),
      { getRootProps: L, onClickAway: D } = Vb(
        g({}, k, {
          ref: o,
        }),
      ),
      [_, Y] = x.useState(!0),
      B = Dt({
        elementType: ll,
        getSlotProps: L,
        externalForwardedProps: w,
        ownerState: k,
        className: [V.root, p],
      }),
      M = (z) => {
        Y(!0), E && E(z);
      },
      F = (z, ie) => {
        Y(!1), C && C(z, ie);
      };
    return !m && _
      ? null
      : /* @__PURE__ */ A(
          lr,
          g(
            {
              onClickAway: D,
            },
            b,
            {
              children: /* @__PURE__ */ A(
                ll,
                g({}, B, {
                  children: /* @__PURE__ */ A(
                    S,
                    g(
                      {
                        appear: !0,
                        in: m,
                        timeout: T,
                        direction: l === 'top' ? 'down' : 'up',
                        onEnter: F,
                        onExited: M,
                      },
                      f,
                      {
                        children:
                          d ||
                          /* @__PURE__ */ A(
                            dx,
                            g(
                              {
                                message: h,
                                action: s,
                              },
                              y,
                            ),
                          ),
                      },
                    ),
                  ),
                }),
              ),
            },
          ),
        );
  });
process.env.NODE_ENV !== 'production' &&
  (yu.propTypes = {
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
const bx = yu;
function gx(e) {
  return Ae('MuiSwitch', e);
}
const vx = Pe('MuiSwitch', [
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
  Ot = vx,
  yx = ['className', 'color', 'edge', 'size', 'sx'],
  xx = (e) => {
    const { classes: t, edge: o, size: r, color: a, checked: i, disabled: s } = e,
      l = {
        root: ['root', o && `edge${Q(o)}`, `size${Q(r)}`],
        switchBase: ['switchBase', `color${Q(a)}`, i && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = Fe(l, gx, t);
    return g({}, t, c);
  },
  Ex = pe('span', {
    name: 'MuiSwitch',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.edge && t[`edge${Q(o.edge)}`], t[`size${Q(o.size)}`]];
    },
  })(({ ownerState: e }) =>
    g(
      {
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
      },
      e.edge === 'start' && {
        marginLeft: -8,
      },
      e.edge === 'end' && {
        marginRight: -8,
      },
      e.size === 'small' && {
        width: 40,
        height: 24,
        padding: 7,
        [`& .${Ot.thumb}`]: {
          width: 16,
          height: 16,
        },
        [`& .${Ot.switchBase}`]: {
          padding: 4,
          [`&.${Ot.checked}`]: {
            transform: 'translateX(16px)',
          },
        },
      },
    ),
  ),
  Cx = pe(jc, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        {
          [`& .${Ot.input}`]: t.input,
        },
        o.color !== 'default' && t[`color${Q(o.color)}`],
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
      [`&.${Ot.checked}`]: {
        transform: 'translateX(20px)',
      },
      [`&.${Ot.disabled}`]: {
        color: e.vars
          ? e.vars.palette.Switch.defaultDisabledColor
          : `${e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[600]}`,
      },
      [`&.${Ot.checked} + .${Ot.track}`]: {
        opacity: 0.5,
      },
      [`&.${Ot.disabled} + .${Ot.track}`]: {
        opacity: e.vars
          ? e.vars.opacity.switchTrackDisabled
          : `${e.palette.mode === 'light' ? 0.12 : 0.2}`,
      },
      [`& .${Ot.input}`]: {
        left: '-100%',
        width: '300%',
      },
    }),
    ({ theme: e, ownerState: t }) =>
      g(
        {
          '&:hover': {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
              : Je(e.palette.action.active, e.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
        t.color !== 'default' && {
          [`&.${Ot.checked}`]: {
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
            [`&.${Ot.disabled}`]: {
              color: e.vars
                ? e.vars.palette.Switch[`${t.color}DisabledColor`]
                : `${
                    e.palette.mode === 'light'
                      ? _r(e.palette[t.color].main, 0.62)
                      : Ir(e.palette[t.color].main, 0.55)
                  }`,
            },
          },
          [`&.${Ot.checked} + .${Ot.track}`]: {
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        },
      ),
  ),
  Ox = pe('span', {
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
  Tx = pe('span', {
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
  xu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiSwitch',
      }),
      { className: a, color: i = 'primary', edge: s = !1, size: l = 'medium', sx: c } = r,
      u = Ce(r, yx),
      d = g({}, r, {
        color: i,
        edge: s,
        size: l,
      }),
      p = xx(d),
      b = /* @__PURE__ */ A(Tx, {
        className: p.thumb,
        ownerState: d,
      });
    return /* @__PURE__ */ Qe(Ex, {
      className: Ee(p.root, a),
      sx: c,
      ownerState: d,
      children: [
        /* @__PURE__ */ A(
          Cx,
          g(
            {
              type: 'checkbox',
              icon: b,
              checkedIcon: b,
              ref: o,
              ownerState: d,
            },
            u,
            {
              classes: g({}, p, {
                root: p.switchBase,
              }),
            },
          ),
        ),
        /* @__PURE__ */ A(Ox, {
          className: p.track,
          ownerState: d,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (xu.propTypes = {
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
    inputRef: Nt,
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
const Sx = xu;
function wx(e) {
  return Ae('MuiTextField', e);
}
Pe('MuiTextField', ['root']);
const kx = [
    'autoComplete',
    'autoFocus',
    'children',
    'className',
    'color',
    'defaultValue',
    'disabled',
    'error',
    'FormHelperTextProps',
    'fullWidth',
    'helperText',
    'id',
    'InputLabelProps',
    'inputProps',
    'InputProps',
    'inputRef',
    'label',
    'maxRows',
    'minRows',
    'multiline',
    'name',
    'onBlur',
    'onChange',
    'onFocus',
    'placeholder',
    'required',
    'rows',
    'select',
    'SelectProps',
    'type',
    'value',
    'variant',
  ],
  Rx = {
    standard: Kc,
    filled: Bc,
    outlined: su,
  },
  Nx = (e) => {
    const { classes: t } = e;
    return Fe(
      {
        root: ['root'],
      },
      wx,
      t,
    );
  },
  $x = pe(gy, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Eu = /* @__PURE__ */ x.forwardRef(function (t, o) {
    const r = ze({
        props: t,
        name: 'MuiTextField',
      }),
      {
        autoComplete: a,
        autoFocus: i = !1,
        children: s,
        className: l,
        color: c = 'primary',
        defaultValue: u,
        disabled: d = !1,
        error: p = !1,
        FormHelperTextProps: b,
        fullWidth: y = !1,
        helperText: v,
        id: h,
        InputLabelProps: m,
        inputProps: S,
        InputProps: T,
        inputRef: C,
        label: E,
        maxRows: f,
        minRows: w,
        multiline: k = !1,
        name: V,
        onBlur: L,
        onChange: D,
        onFocus: _,
        placeholder: Y,
        required: B = !1,
        rows: M,
        select: F = !1,
        SelectProps: z,
        type: ie,
        value: se,
        variant: G = 'outlined',
      } = r,
      R = Ce(r, kx),
      j = g({}, r, {
        autoFocus: i,
        color: c,
        disabled: d,
        error: p,
        fullWidth: y,
        multiline: k,
        required: B,
        select: F,
        variant: G,
      }),
      X = Nx(j);
    process.env.NODE_ENV !== 'production' &&
      F &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const H = {};
    G === 'outlined' && (m && typeof m.shrink < 'u' && (H.notched = m.shrink), (H.label = E)),
      F && ((!z || !z.native) && (H.id = void 0), (H['aria-describedby'] = void 0));
    const U = Sl(h),
      ne = v && U ? `${U}-helper-text` : void 0,
      oe = E && U ? `${U}-label` : void 0,
      J = Rx[G],
      ae = /* @__PURE__ */ A(
        J,
        g(
          {
            'aria-describedby': ne,
            autoComplete: a,
            autoFocus: i,
            defaultValue: u,
            fullWidth: y,
            multiline: k,
            name: V,
            rows: M,
            maxRows: f,
            minRows: w,
            type: ie,
            value: se,
            id: U,
            inputRef: C,
            onBlur: L,
            onChange: D,
            onFocus: _,
            placeholder: Y,
            inputProps: S,
          },
          H,
          T,
        ),
      );
    return /* @__PURE__ */ Qe(
      $x,
      g(
        {
          className: Ee(X.root, l),
          disabled: d,
          error: p,
          fullWidth: y,
          ref: o,
          required: B,
          color: c,
          variant: G,
          ownerState: j,
        },
        R,
        {
          children: [
            E != null &&
              E !== '' &&
              /* @__PURE__ */ A(
                Vy,
                g(
                  {
                    htmlFor: U,
                    id: oe,
                  },
                  m,
                  {
                    children: E,
                  },
                ),
              ),
            F
              ? /* @__PURE__ */ A(
                  G0,
                  g(
                    {
                      'aria-describedby': ne,
                      id: U,
                      labelId: oe,
                      value: se,
                      input: ae,
                    },
                    z,
                    {
                      children: s,
                    },
                  ),
                )
              : ae,
            v &&
              /* @__PURE__ */ A(
                Oy,
                g(
                  {
                    id: ne,
                  },
                  b,
                  {
                    children: v,
                  },
                ),
              ),
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Eu.propTypes = {
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
    inputRef: Nt,
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
const Cu = Eu;
function Wn({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: a }) {
  return /* @__PURE__ */ A(Vv, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: a,
  });
}
var Yn = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(Yn || {});
function Px({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = Yn.After,
  isIndeterminate: r = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const u = /* @__PURE__ */ A(oy, {
    checked: e,
    indeterminate: r,
    defaultChecked: a,
    disabled: i,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let d;
  if (t) {
    const p = o === Yn.Before || o === Yn.Above,
      b = /* @__PURE__ */ A('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      y = o === Yn.Before || o === Yn.After,
      v = y ? b : /* @__PURE__ */ A('div', { children: b }),
      h = y ? u : /* @__PURE__ */ A('div', { children: u });
    d = /* @__PURE__ */ Qe(qc, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: i,
      error: s,
      children: [p && v, h, !p && v],
    });
  } else d = u;
  return d;
}
function Ix({
  title: e,
  isDisabled: t = !1,
  isClearable: o = !0,
  hasError: r = !1,
  isFullWidth: a = !1,
  width: i,
  options: s = [],
  className: l,
  value: c,
  onChange: u,
  onFocus: d,
  onBlur: p,
}) {
  return /* @__PURE__ */ A(Ov, {
    disablePortal: !0,
    disabled: t,
    disableClearable: !o,
    fullWidth: a,
    options: s,
    className: `papi-combo-box ${r ? 'error' : ''} ${l ?? ''}`,
    value: c,
    onChange: u,
    onFocus: d,
    onBlur: p,
    renderInput: (b) =>
      /* @__PURE__ */ A(Cu, {
        ...b,
        error: r,
        fullWidth: a,
        disabled: t,
        label: e,
        style: { width: i },
      }),
  });
}
var _x = Object.defineProperty,
  Mx = (e, t, o) =>
    t in e ? _x(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[t] = o),
  Te = (e, t, o) => (Mx(e, typeof t != 'symbol' ? t + '' : t, o), o);
const Xn = class {
  /**
   * Gets the 1-based number of the specified book.
   * This is a fairly performance-critical method.
   * @param id - 3-letter book ID, e.g. `'MAT'`.
   * @param ignoreCase - should case be ignored. Defaults to `true`.
   * @returns book number, or 0 if ID doesn't exist.
   */
  static bookIdToNumber(e, t = !0) {
    return t && (e = e.toUpperCase()), e in this.bookNumbers ? this.bookNumbers[e] : 0;
  }
  /**
   * Gets the ID of a book from its book number.
   * @param number - Book number (this is 1-based, not an index).
   * @param errorValue - The string to return if the book number does not correspond to a valid book.
   * Defaults to `'***'`.
   * @returns The 3-letter `bookId` if found, or the `errorValue` otherwise.
   */
  static bookNumberToId(e, t = '***') {
    const o = e - 1;
    return o < 0 || o >= Xn.allBookIds.length ? t : Xn.allBookIds[o];
  }
  /**
   * Gets the English book name from its book number.
   * @param number - Book number (this is 1-based, not an index).
   * @returns The English name of the book if found, or `'******'` otherwise.
   */
  static bookNumberToEnglishName(e) {
    return e <= 0 || e > this.lastBook ? '******' : Xn.allBookEnglishNames[e - 1];
  }
  /**
   * Gets the English book name from its book ID.
   * @param id - 3-letter book ID, e.g. `'MAT'`.
   * @returns The English name of the book if found, or `'******'` otherwise.
   */
  static bookIdToEnglishName(e) {
    return this.bookNumberToEnglishName(this.bookIdToNumber(e));
  }
  /**
   *
   * @param bookNum - Book number (this is 1-based, not an index).
   * @returns `true` if the book is obsolete, or `false` otherwise.
   */
  static isObsolete(e) {
    return this.allBookEnglishNames[e - 1].includes('*obsolete*');
  }
  static createBookNumbers() {
    const e = {};
    for (let t = 0; t < this.allBookIds.length; t++) e[this.allBookIds[t]] = t + 1;
    return e;
  }
};
let yt = Xn;
Te(yt, 'allBookIds', [
  'GEN',
  'EXO',
  'LEV',
  'NUM',
  'DEU',
  'JOS',
  'JDG',
  'RUT',
  '1SA',
  '2SA',
  // 10
  '1KI',
  '2KI',
  '1CH',
  '2CH',
  'EZR',
  'NEH',
  'EST',
  'JOB',
  'PSA',
  'PRO',
  // 20
  'ECC',
  'SNG',
  'ISA',
  'JER',
  'LAM',
  'EZK',
  'DAN',
  'HOS',
  'JOL',
  'AMO',
  // 30
  'OBA',
  'JON',
  'MIC',
  'NAM',
  'HAB',
  'ZEP',
  'HAG',
  'ZEC',
  'MAL',
  'MAT',
  // 40
  'MRK',
  'LUK',
  'JHN',
  'ACT',
  'ROM',
  '1CO',
  '2CO',
  'GAL',
  'EPH',
  'PHP',
  // 50
  'COL',
  '1TH',
  '2TH',
  '1TI',
  '2TI',
  'TIT',
  'PHM',
  'HEB',
  'JAS',
  '1PE',
  // 60
  '2PE',
  '1JN',
  '2JN',
  '3JN',
  'JUD',
  'REV',
  'TOB',
  'JDT',
  'ESG',
  'WIS',
  // 70
  'SIR',
  'BAR',
  'LJE',
  'S3Y',
  'SUS',
  'BEL',
  '1MA',
  '2MA',
  '3MA',
  '4MA',
  // 80
  '1ES',
  '2ES',
  'MAN',
  'PS2',
  'ODA',
  'PSS',
  'JSA',
  // actual variant text for JOS, now in LXA text
  'JDB',
  // actual variant text for JDG, now in LXA text
  'TBS',
  // actual variant text for TOB, now in LXA text
  'SST',
  // actual variant text for SUS, now in LXA text // 90
  'DNT',
  // actual variant text for DAN, now in LXA text
  'BLT',
  // actual variant text for BEL, now in LXA text
  'XXA',
  'XXB',
  'XXC',
  'XXD',
  'XXE',
  'XXF',
  'XXG',
  'FRT',
  // 100
  'BAK',
  'OTH',
  '3ES',
  // Used previously but really should be 2ES
  'EZA',
  // Used to be called 4ES, but not actually in any known project
  '5EZ',
  // Used to be called 5ES, but not actually in any known project
  '6EZ',
  // Used to be called 6ES, but not actually in any known project
  'INT',
  'CNC',
  'GLO',
  'TDX',
  // 110
  'NDX',
  'DAG',
  'PS3',
  '2BA',
  'LBA',
  'JUB',
  'ENO',
  '1MQ',
  '2MQ',
  '3MQ',
  // 120
  'REP',
  '4BA',
  'LAO',
]) /** Array of all non-canonical book IDs. */,
  Te(yt, 'nonCanonicalIds', [
    'XXA',
    'XXB',
    'XXC',
    'XXD',
    'XXE',
    'XXF',
    'XXG',
    'FRT',
    'BAK',
    'OTH',
    'INT',
    'CNC',
    'GLO',
    'TDX',
    'NDX',
  ]),
  Te(yt, 'firstBook', 1),
  Te(yt, 'lastBook', Xn.allBookIds.length)
  /**
   * Array of the English names of all books.
   */,
  Te(yt, 'allBookEnglishNames', [
    'Genesis',
    'Exodus',
    'Leviticus',
    'Numbers',
    'Deuteronomy',
    'Joshua',
    'Judges',
    'Ruth',
    '1 Samuel',
    '2 Samuel',
    '1 Kings',
    '2 Kings',
    '1 Chronicles',
    '2 Chronicles',
    'Ezra',
    'Nehemiah',
    'Esther (Hebrew)',
    'Job',
    'Psalms',
    'Proverbs',
    'Ecclesiastes',
    'Song of Songs',
    'Isaiah',
    'Jeremiah',
    'Lamentations',
    'Ezekiel',
    'Daniel (Hebrew)',
    'Hosea',
    'Joel',
    'Amos',
    'Obadiah',
    'Jonah',
    'Micah',
    'Nahum',
    'Habakkuk',
    'Zephaniah',
    'Haggai',
    'Zechariah',
    'Malachi',
    'Matthew',
    'Mark',
    'Luke',
    'John',
    'Acts',
    'Romans',
    '1 Corinthians',
    '2 Corinthians',
    'Galatians',
    'Ephesians',
    'Philippians',
    'Colossians',
    '1 Thessalonians',
    '2 Thessalonians',
    '1 Timothy',
    '2 Timothy',
    'Titus',
    'Philemon',
    'Hebrews',
    'James',
    '1 Peter',
    '2 Peter',
    '1 John',
    '2 John',
    '3 John',
    'Jude',
    'Revelation',
    'Tobit',
    'Judith',
    'Esther Greek',
    'Wisdom of Solomon',
    'Sirach (Ecclesiasticus)',
    'Baruch',
    'Letter of Jeremiah',
    'Song of 3 Young Men',
    'Susanna',
    'Bel and the Dragon',
    '1 Maccabees',
    '2 Maccabees',
    '3 Maccabees',
    '4 Maccabees',
    '1 Esdras (Greek)',
    '2 Esdras (Latin)',
    'Prayer of Manasseh',
    'Psalm 151',
    'Odes',
    'Psalms of Solomon',
    // WARNING, if you change the spelling of the *obsolete* tag be sure to update
    // IsObsolete routine
    'Joshua A. *obsolete*',
    'Judges B. *obsolete*',
    'Tobit S. *obsolete*',
    'Susanna Th. *obsolete*',
    'Daniel Th. *obsolete*',
    'Bel Th. *obsolete*',
    'Extra A',
    'Extra B',
    'Extra C',
    'Extra D',
    'Extra E',
    'Extra F',
    'Extra G',
    'Front Matter',
    'Back Matter',
    'Other Matter',
    '3 Ezra *obsolete*',
    'Apocalypse of Ezra',
    '5 Ezra (Latin Prologue)',
    '6 Ezra (Latin Epilogue)',
    'Introduction',
    'Concordance ',
    'Glossary ',
    'Topical Index',
    'Names Index',
    'Daniel Greek',
    'Psalms 152-155',
    '2 Baruch (Apocalypse)',
    'Letter of Baruch',
    'Jubilees',
    'Enoch',
    '1 Meqabyan',
    '2 Meqabyan',
    '3 Meqabyan',
    'Reproof (Proverbs 25-31)',
    '4 Baruch (Rest of Baruch)',
    'Laodiceans',
  ]), // Used for fast look up of book IDs to the book number.
  Te(yt, 'bookNumbers', Xn.createBookNumbers());
var vn = /* @__PURE__ */ ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(vn || {});
const Nn = class {
  // private versInfo: Versification;
  constructor(e) {
    if (
      (Te(this, 'name'),
      Te(this, 'fullPath'),
      Te(this, 'isPresent'),
      Te(this, 'hasVerseSegments'),
      Te(this, 'isCustomized'),
      Te(this, 'baseVersification'),
      Te(this, 'scriptureBooks'),
      Te(this, '_type'),
      e != null)
    )
      typeof e == 'string' ? (this.name = e) : (this._type = e);
    else throw new Error('Argument null');
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
let Wt = Nn;
Te(Wt, 'Original', new Nn(vn.Original)),
  Te(Wt, 'Septuagint', new Nn(vn.Septuagint)),
  Te(Wt, 'Vulgate', new Nn(vn.Vulgate)),
  Te(Wt, 'English', new Nn(vn.English)),
  Te(Wt, 'RussianProtestant', new Nn(vn.RussianProtestant)),
  Te(Wt, 'RussianOrthodox', new Nn(vn.RussianOrthodox));
function cl(e, t) {
  const o = t[0];
  for (let r = 1; r < t.length; r++) e = e.split(t[r]).join(o);
  return e.split(o);
}
var Ou = /* @__PURE__ */ ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(Ou || {});
const De = class {
  constructor(e, t, o, r) {
    if (
      (Te(this, 'firstChapter'),
      Te(this, 'lastChapter'),
      Te(this, 'lastVerse'),
      Te(this, 'hasSegmentsDefined'),
      Te(this, 'text'),
      Te(this, 'BBBCCCVVVS'),
      Te(this, 'longHashCode'),
      Te(this, 'versification'),
      Te(this, 'rtlMark', '‏'),
      Te(this, '_bookNum', 0),
      Te(this, '_chapterNum', 0),
      Te(this, '_verseNum', 0),
      Te(this, '_verse'),
      o == null && r == null)
    )
      if (e != null && typeof e == 'string') {
        const a = e,
          i = t != null && t instanceof Wt ? t : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t == null)
        if (e != null && e instanceof De) {
          const a = e;
          (this._bookNum = a.bookNum),
            (this._chapterNum = a.chapterNum),
            (this._verseNum = a.verseNum),
            (this._verse = a.verse),
            (this.versification = a.versification);
        } else {
          if (e == null) return;
          const a = e instanceof Wt ? e : De.defaultVersification;
          this.setEmpty(a);
        }
      else throw new Error('VerseRef constructor not supported.');
    else if (e != null && t != null && o != null)
      if (typeof e == 'string' && typeof t == 'string' && typeof o == 'string')
        this.setEmpty(r), this.updateInternal(e, t, o);
      else if (typeof e == 'number' && typeof t == 'number' && typeof o == 'number')
        (this._bookNum = e),
          (this._chapterNum = t),
          (this._verseNum = o),
          (this.versification = r ?? De.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, t = De.defaultVersification) {
    const o = new De(t);
    return o.parse(e), o;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(e) {
    return (
      e.length > 0 &&
      '0123456789'.includes(e[0]) &&
      !e.endsWith(this.verseRangeSeparator) &&
      !e.endsWith(this.verseSequenceIndicator)
    );
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(e) {
    let t;
    try {
      return (t = De.parse(e)), { success: !0, verseRef: t };
    } catch (o) {
      if (o instanceof yo) return (t = new De()), { success: !1, verseRef: t };
      throw o;
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
  static getBBBCCCVVV(e, t, o) {
    return (
      (e % De.bcvMaxValue) * De.bookDigitShifter +
      (t >= 0 ? (t % De.bcvMaxValue) * De.chapterDigitShifter : 0) +
      (o >= 0 ? o % De.bcvMaxValue : 0)
    );
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let t;
    if (!e) return (t = -1), { success: !0, vNum: t };
    t = 0;
    let o;
    for (let r = 0; r < e.length; r++) {
      if (((o = e[r]), o < '0' || o > '9')) return r === 0 && (t = -1), { success: !1, vNum: t };
      if (((t = t * 10 + +o - +'0'), t > De.bcvMaxValue)) return (t = -1), { success: !1, vNum: t };
    }
    return { success: !0, vNum: t };
  }
  /**
   * Checks to see if a VerseRef hasn't been set - all values are the default.
   */
  get isDefault() {
    return (
      this.bookNum === 0 &&
      this.chapterNum === 0 &&
      this.verseNum === 0 &&
      this.versification == null
    );
  }
  /**
   * Gets whether the verse contains multiple verses.
   */
  get hasMultiple() {
    return (
      this._verse != null &&
      (this._verse.includes(De.verseRangeSeparator) ||
        this._verse.includes(De.verseSequenceIndicator))
    );
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return yt.bookNumberToId(this.bookNum, '');
  }
  set book(e) {
    this.bookNum = yt.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? '' : this._chapterNum.toString();
  }
  set chapter(e) {
    const t = +e;
    this._chapterNum = Number.isInteger(t) ? t : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null
      ? this._verse
      : this.isDefault || this._verseNum < 0
      ? ''
      : this._verseNum.toString();
  }
  set verse(e) {
    const { success: t, vNum: o } = De.tryGetVerseNum(e);
    (this._verse = t ? void 0 : e.replace(this.rtlMark, '')),
      (this._verseNum = o),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = De.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > yt.lastBook)
      throw new yo('BookNum must be greater than zero and less than or equal to last book');
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
    this.versification = this.versification != null ? new Wt(e) : void 0;
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
    return this.validateVerse(De.verseRangeSeparators, De.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return De.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return De.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
    if (((e = e.replace(this.rtlMark, '')), e.includes('/'))) {
      const a = e.split('/');
      if (((e = a[0]), a.length > 1))
        try {
          const i = +a[1].trim();
          this.versification = new Wt(vn[i]);
        } catch {
          throw new yo('Invalid reference : ' + e);
        }
    }
    const t = e.trim().split(' ');
    if (t.length !== 2) throw new yo('Invalid reference : ' + e);
    const o = t[1].split(':'),
      r = +o[0];
    if (
      o.length !== 2 ||
      yt.bookIdToNumber(t[0]) === 0 ||
      !Number.isInteger(r) ||
      r < 0 ||
      !De.isVerseParseable(o[1])
    )
      throw new yo('Invalid reference : ' + e);
    this.updateInternal(t[0], o[0], o[1]);
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
    return new De(this);
  }
  toString() {
    const e = this.book;
    return e === '' ? '' : `${e} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(e) {
    return (
      e._bookNum === this._bookNum &&
      e._chapterNum === this._chapterNum &&
      e._verseNum === this._verseNum &&
      e._verse === this._verse &&
      e.versification != null &&
      this.versification != null &&
      e.versification.equals(this.versification)
    );
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
  allVerses(e = !1, t = De.verseRangeSeparators, o = De.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const r = [],
      a = cl(this._verse, o);
    for (const i of a.map((s) => cl(s, t))) {
      const s = this.clone();
      s.verse = i[0];
      const l = s.verseNum;
      if ((r.push(s), i.length > 1)) {
        const c = this.clone();
        if (((c.verse = i[1]), !e))
          for (let u = l + 1; u < c.verseNum; u++) {
            const d = new De(this._bookNum, this._chapterNum, u, this.versification);
            this.isExcluded || r.push(d);
          }
        r.push(c);
      }
    }
    return r;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, t) {
    if (!this.verse) return this.internalValid;
    let o = 0;
    for (const r of this.allVerses(!0, e, t)) {
      const a = r.internalValid;
      if (a !== 0) return a;
      const i = r.BBBCCCVVV;
      if (o > i) return 3;
      if (o === i) return 4;
      o = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > yt.lastBook
      ? 2
      : 0;
  }
  setEmpty(e = De.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, t, o) {
    (this.bookNum = yt.bookIdToNumber(e)), (this.chapter = t), (this.verse = o);
  }
};
let fn = De;
Te(fn, 'defaultVersification', Wt.English),
  Te(fn, 'verseRangeSeparator', '-'),
  Te(fn, 'verseSequenceIndicator', ','),
  Te(fn, 'verseRangeSeparators', [De.verseRangeSeparator]),
  Te(fn, 'verseSequenceIndicators', [De.verseSequenceIndicator]),
  Te(fn, 'chapterDigitShifter', 1e3),
  Te(fn, 'bookDigitShifter', De.chapterDigitShifter * De.chapterDigitShifter),
  Te(fn, 'bcvMaxValue', De.chapterDigitShifter - 1)
  /**
   * The valid status of the VerseRef.
   */,
  Te(fn, 'ValidStatusType', Ou);
class yo extends Error {}
const Tu = [
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
];
function ul() {
  return yt.allBookIds.map((e) => ({
    bookId: e,
    label: yt.bookIdToEnglishName(e),
  }));
}
function dl(e) {
  return {
    bookId: yt.bookNumberToId(e),
    label: yt.bookNumberToEnglishName(e),
  };
}
const Su = 1,
  Ax = Tu.length - 1,
  wu = 1,
  ku = 1,
  Ru = (e) => {
    var t;
    return ((t = Tu[e]) == null ? void 0 : t.chapters) ?? -1;
  },
  pl = (e, t) => ({
    bookNum: Math.max(Su, Math.min(e.bookNum + t, Ax)),
    chapterNum: 1,
    verseNum: 1,
  }),
  fl = (e, t) => ({
    ...e,
    chapterNum: Math.min(Math.max(wu, e.chapterNum + t), Ru(e.bookNum)),
    verseNum: 1,
  }),
  ml = (e, t) => ({
    ...e,
    verseNum: Math.max(ku, e.verseNum + t),
  });
function wa({
  variant: e = 'outlined',
  isDisabled: t = !1,
  hasError: o = !1,
  isFullWidth: r = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: u,
  value: d,
  onChange: p,
  onFocus: b,
  onBlur: y,
}) {
  return /* @__PURE__ */ A(Cu, {
    variant: e,
    disabled: t,
    error: o,
    fullWidth: r,
    helperText: a,
    label: i,
    placeholder: s,
    required: l,
    className: `papi-textfield ${c ?? ''}`,
    defaultValue: u,
    value: d,
    onChange: p,
    onFocus: b,
    onBlur: y,
  });
}
function zx({ scrRef: e, handleSubmit: t }) {
  const [o, r] = _u(dl(e.bookNum)),
    a = (c) => {
      r(dl(c.bookNum)), t(c);
    },
    i = (c, u) => {
      const p = { bookNum: yt.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
      a(p);
    },
    s = (c) => {
      t({ ...e, chapterNum: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verseNum: +c.target.value });
    };
  return /* @__PURE__ */ Qe(Vu, {
    children: [
      /* @__PURE__ */ A(Ix, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: ul(),
        onChange: i,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ A(Wn, {
        onClick: () => a(pl(e, -1)),
        isDisabled: e.bookNum <= Su,
        children: '<',
      }),
      /* @__PURE__ */ A(Wn, {
        onClick: () => a(pl(e, 1)),
        isDisabled: e.bookNum >= ul().length,
        children: '>',
      }),
      /* @__PURE__ */ A(wa, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: s,
      }),
      /* @__PURE__ */ A(Wn, {
        onClick: () => t(fl(e, -1)),
        isDisabled: e.chapterNum <= wu,
        children: '<',
      }),
      /* @__PURE__ */ A(Wn, {
        onClick: () => t(fl(e, 1)),
        isDisabled: e.chapterNum >= Ru(e.bookNum),
        children: '>',
      }),
      /* @__PURE__ */ A(wa, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: l,
      }),
      /* @__PURE__ */ A(Wn, {
        onClick: () => t(ml(e, -1)),
        isDisabled: e.verseNum <= ku,
        children: '<',
      }),
      /* @__PURE__ */ A(Wn, { onClick: () => t(ml(e, 1)), children: '>' }),
    ],
  });
}
function Bx({
  isDisabled: e = !1,
  orientation: t = 'horizontal',
  min: o = 0,
  max: r = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: s,
  valueLabelDisplay: l = 'off',
  className: c,
  onChange: u,
  onChangeCommitted: d,
}) {
  return /* @__PURE__ */ A(rx, {
    disabled: e,
    orientation: t,
    min: o,
    max: r,
    step: a,
    marks: i,
    defaultValue: s,
    valueLabelDisplay: l,
    className: `papi-slider ${t} ${c ?? ''}`,
    onChange: u,
    onChangeCommitted: d,
  });
}
function Ux({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: a }) {
  return /* @__PURE__ */ A(Sx, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: a,
  });
}
function Wx({
  autoHideDuration: e = null,
  isOpen: t = !1,
  className: o,
  onClose: r,
  anchorOrigin: a = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: i = {
    action: '',
    message: '',
    className: `papi-snackbar ${o ?? ''}`,
  },
  children: s,
}) {
  return /* @__PURE__ */ A(bx, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: a,
    ContentProps: i,
    children: s,
  });
}
function Hx({
  hasAutoFocus: e = !1,
  className: t,
  isDense: o = !1,
  hasDisabledGutters: r = !1,
  hasDivider: a = !1,
  focusVisibleClassName: i,
  onClick: s,
  children: l,
}) {
  return /* @__PURE__ */ A(y0, {
    autoFocus: e,
    className: t,
    dense: o,
    disableGutters: r,
    divider: a,
    focusVisibleClassName: i,
    onClick: s,
    children: l,
  });
}
function hl({ onRowChange: e, row: t, column: o }) {
  const r = (a) => {
    e({ ...t, [o.key]: a.target.value });
  };
  return /* @__PURE__ */ A(wa, { defaultValue: t[o.key], onChange: r });
}
const Dx = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function a(i) {
    e(i.target.checked, i.nativeEvent.shiftKey);
  }
  return /* @__PURE__ */ A(Px, {
    ...r,
    isChecked: o,
    isDisabled: t,
    onChange: a,
  });
};
function qx({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: o,
  onColumnResize: r,
  defaultColumnWidth: a,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: u,
  enableSelectColumn: d,
  selectColumnWidth: p = 50,
  rowKeyGetter: b,
  rowHeight: y = 35,
  headerRowHeight: v = 35,
  selectedRows: h,
  onSelectedRowsChange: m,
  onRowsChange: S,
  onCellClick: T,
  onCellDoubleClick: C,
  onCellContextMenu: E,
  onCellKeyDown: f,
  direction: w = 'ltr',
  enableVirtualization: k = !0,
  onCopy: V,
  onPaste: L,
  onScroll: D,
  className: _,
}) {
  const Y = Mu(() => {
    const B = e.map((M) =>
      typeof M.editable == 'function'
        ? {
            ...M,
            editable: (z) => !!M.editable(z),
            renderEditCell: M.renderEditCell || hl,
          }
        : M.editable && !M.renderEditCell
        ? { ...M, renderEditCell: hl }
        : M.renderEditCell && !M.editable
        ? { ...M, editable: !1 }
        : M,
    );
    return d ? [{ ...Du, minWidth: p }, ...B] : B;
  }, [d, e]);
  return /* @__PURE__ */ A(Au, {
    columns: Y,
    defaultColumnOptions: {
      width: a,
      minWidth: i,
      maxWidth: s,
      sortable: l,
      resizable: c,
    },
    sortColumns: t,
    onSortColumnsChange: o,
    onColumnResize: r,
    rows: u,
    rowKeyGetter: b,
    rowHeight: y,
    headerRowHeight: v,
    selectedRows: h,
    onSelectedRowsChange: m,
    onRowsChange: S,
    onCellClick: T,
    onCellDoubleClick: C,
    onCellContextMenu: E,
    onCellKeyDown: f,
    direction: w,
    enableVirtualization: k,
    onCopy: V,
    onPaste: L,
    onScroll: D,
    renderers: { renderCheckbox: Dx },
    className: `${_ ?? 'rdg-light'}`,
  });
}
function Lx(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const o = document.head || document.querySelector('head'),
    r = o.querySelector(':first-child'),
    a = document.createElement('style');
  a.appendChild(document.createTextNode(e)),
    t === 'top' && r ? o.insertBefore(a, r) : o.appendChild(a);
}
Lx(
  `.papi-menu-item {
  line-height: 0.8;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-snackbar {
  font-family: Arial, Helvetica, sans-serif;
}

.papi-snackbar.primary {
  background: #1ea7fd;
  color: white;
  height: auto;
  line-height: auto;
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
@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-33 {
    contain: strict;
    grid-row: 1;
    visibility: hidden
}
  }


@layer rdg.Cell {.c1wupbe7-0-0-beta-33 {
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

    .c1wupbe7-0-0-beta-33[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }

@layer rdg.Cell {

.cd0kgiy7-0-0-beta-33 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}
  }

@layer rdg.Cell {

.c1730fa47-0-0-beta-33 {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3)
}
  }


@layer rdg.CheckboxLabel {.c1hs68w07-0-0-beta-33 {
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

.cojpd0n7-0-0-beta-33 {
    all: unset
}
  }

@layer rdg.CheckboxIcon {

.cwsfieb7-0-0-beta-33 {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color)
}

    .cojpd0n7-0-0-beta-33:checked + .cwsfieb7-0-0-beta-33 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .cojpd0n7-0-0-beta-33:focus + .cwsfieb7-0-0-beta-33 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

@layer rdg.CheckboxLabel {

.c1fgadbl7-0-0-beta-33 {
    cursor: default
}

    .c1fgadbl7-0-0-beta-33 .cwsfieb7-0-0-beta-33 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }


@layer rdg.GroupCellContent {.g1w3c5217-0-0-beta-33 {
    outline: none
}
  }

@layer rdg.GroupCellCaret {

.cm5tyhw7-0-0-beta-33 {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

    .cm5tyhw7-0-0-beta-33 > path {
      transition: d 0.1s;
    }
  }


@layer rdg.DragHandle {.cadd3bp7-0-0-beta-33 {
    cursor: move;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color)
}

    .cadd3bp7-0-0-beta-33:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }


@layer rdg.EditCell {.c1tngyp17-0-0-beta-33 {
    padding: 0
}
  }


@layer rdg.Row {.r1otpg647-0-0-beta-33 {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color)
}

    .r1otpg647-0-0-beta-33:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-33[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

      .r1otpg647-0-0-beta-33[aria-selected='true']:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
  }

@layer rdg.FocusSink {

.rel5gk27-0-0-beta-33 {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px
}
  }

@layer rdg.FocusSink {
    .r1qymf1z7-0-0-beta-33::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }


@layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-33:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-33 > .c1wupbe7-0-0-beta-33:not(:last-child):not(.c1730fa47-0-0-beta-33) {
      border-inline-end: none;
    }
  }


@layer rdg.SortableHeaderCell {.hizp7y17-0-0-beta-33 {
    cursor: pointer;
    display: flex
}

    .hizp7y17-0-0-beta-33:focus {
      outline: none;
    }
  }

@layer rdg.SortableHeaderCellName {

.h14cojrm7-0-0-beta-33 {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis
}
  }


@layer rdg.HeaderCell {.celq7o97-0-0-beta-33 {
    touch-action: none
}

    .celq7o97-0-0-beta-33::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }


@layer rdg.HeaderRow {.h197vzie7-0-0-beta-33 {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold
}

    .h197vzie7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-33 > .cd0kgiy7-0-0-beta-33 {
      z-index: 2;
    }
  }


@layer rdg.Cell {.ccpfvsn7-0-0-beta-33 {
    background-color: #ccccff
}
  }

@layer rdg.Cell {

.c1bmg16t7-0-0-beta-33 {
    background-color: #ccccff
}

    .c1bmg16t7-0-0-beta-33.ccpfvsn7-0-0-beta-33 {
      background-color: #9999ff;
    }
  }


@layer rdg.SortIcon {.a1mygwml7-0-0-beta-33 {
    fill: currentColor
}

    .a1mygwml7-0-0-beta-33 > path {
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
      .r104f42s7-0-0-beta-33 *,
      .r104f42s7-0-0-beta-33 *::before,
      .r104f42s7-0-0-beta-33 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {.r104f42s7-0-0-beta-33 {
      --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
      --rdg-selection-color: #66afe9;
      --rdg-font-size: 14px;

      display: grid;

      color-scheme: var(--rdg-color-scheme, light dark);

      /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
      /* We set a stacking context so internal elements don't render on top of external elements. */
      contain: strict;
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
      .r104f42s7-0-0-beta-33::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-33.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-33.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-33:not(.rdg-light) {
          --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

@layer rdg.Root {

.v7ly7s7-0-0-beta-33 {
    user-select: none
}

    .v7ly7s7-0-0-beta-33 .r1otpg647-0-0-beta-33 {
      cursor: move;
    }
  }

@layer rdg.FocusSink {

.fc4f4zb7-0-0-beta-33 {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 2 to show up above header row */
    z-index: 3
}
  }


@layer rdg.SummaryCell {.s1n3hxke7-0-0-beta-33 {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom)
}
  }


@layer rdg.SummaryRow {.snfqesz7-0-0-beta-33 {
    line-height: var(--rdg-summary-row-height)
}

    .snfqesz7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      position: sticky;
    }
  }

@layer rdg.SummaryRow {
    .t1jijrjz7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-33 > .cd0kgiy7-0-0-beta-33 {
      z-index: 2;
    }
  }

@layer rdg.SummaryRow {
    .t14bmecc7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }

@layer rdg.SummaryRow {
    .b1odhhml7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }


@layer rdg.TextEditor {.tlmcuo07-0-0-beta-33 {
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

    .tlmcuo07-0-0-beta-33:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-33::placeholder {
      color: #999;
      opacity: 1;
    }
  }

.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
`,
  'top',
);
export {
  Wn as Button,
  Px as Checkbox,
  Ix as ComboBox,
  Yn as LabelPosition,
  Hx as MenuItem,
  zx as RefSelector,
  Bx as Slider,
  Wx as Snackbar,
  Ux as Switch,
  qx as Table,
  wa as TextField,
};
//# sourceMappingURL=index.es.js.map
