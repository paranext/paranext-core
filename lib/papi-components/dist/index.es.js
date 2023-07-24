import * as y from 'react';
import Gt, {
  useLayoutEffect as Ju,
  forwardRef as Zu,
  useContext as Fo,
  createContext as $l,
  createElement as Cn,
  Fragment as ji,
  useRef as hi,
  Children as Qu,
  isValidElement as rr,
  cloneElement as ir,
  useState as Pl,
  useMemo as ed,
} from 'react';
import * as Il from 'react-dom';
import qo from 'react-dom';
import td, { SelectColumn as nd } from 'react-data-grid';
function od(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var bi = { exports: {} },
  fo = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pa;
function rd() {
  if (Pa) return fo;
  Pa = 1;
  var e = Gt,
    t = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    r = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, c, u) {
    var d,
      p = {},
      h = null,
      v = null;
    u !== void 0 && (h = '' + u),
      c.key !== void 0 && (h = '' + c.key),
      c.ref !== void 0 && (v = c.ref);
    for (d in c) r.call(c, d) && !a.hasOwnProperty(d) && (p[d] = c[d]);
    if (l && l.defaultProps) for (d in ((c = l.defaultProps), c)) p[d] === void 0 && (p[d] = c[d]);
    return { $$typeof: t, type: l, key: h, ref: v, props: p, _owner: i.current };
  }
  return (fo.Fragment = o), (fo.jsx = s), (fo.jsxs = s), fo;
}
var mo = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ia;
function id() {
  return (
    Ia ||
      ((Ia = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Gt,
            t = Symbol.for('react.element'),
            o = Symbol.for('react.portal'),
            r = Symbol.for('react.fragment'),
            i = Symbol.for('react.strict_mode'),
            a = Symbol.for('react.profiler'),
            s = Symbol.for('react.provider'),
            l = Symbol.for('react.context'),
            c = Symbol.for('react.forward_ref'),
            u = Symbol.for('react.suspense'),
            d = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            h = Symbol.for('react.lazy'),
            v = Symbol.for('react.offscreen'),
            x = Symbol.iterator,
            b = '@@iterator';
          function m(O) {
            if (O === null || typeof O != 'object') return null;
            var K = (x && O[x]) || O[b];
            return typeof K == 'function' ? K : null;
          }
          var k = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function T(O) {
            {
              for (var K = arguments.length, ue = new Array(K > 1 ? K - 1 : 0), N = 1; N < K; N++)
                ue[N - 1] = arguments[N];
              C('error', O, ue);
            }
          }
          function C(O, K, ue) {
            {
              var N = k.ReactDebugCurrentFrame,
                $ = N.getStackAddendum();
              $ !== '' && ((K += '%s'), (ue = ue.concat([$])));
              var X = ue.map(function (oe) {
                return String(oe);
              });
              X.unshift('Warning: ' + K), Function.prototype.apply.call(console[O], console, X);
            }
          }
          var E = !1,
            f = !1,
            S = !1,
            w = !1,
            j = !1,
            L;
          L = Symbol.for('react.module.reference');
          function D(O) {
            return !!(
              typeof O == 'string' ||
              typeof O == 'function' ||
              O === r ||
              O === a ||
              j ||
              O === i ||
              O === u ||
              O === d ||
              w ||
              O === v ||
              E ||
              f ||
              S ||
              (typeof O == 'object' &&
                O !== null &&
                (O.$$typeof === h ||
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
          function I(O, K, ue) {
            var N = O.displayName;
            if (N) return N;
            var $ = K.displayName || K.name || '';
            return $ !== '' ? ue + '(' + $ + ')' : ue;
          }
          function q(O) {
            return O.displayName || 'Context';
          }
          function V(O) {
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
              case a:
                return 'Profiler';
              case i:
                return 'StrictMode';
              case u:
                return 'Suspense';
              case d:
                return 'SuspenseList';
            }
            if (typeof O == 'object')
              switch (O.$$typeof) {
                case l:
                  var K = O;
                  return q(K) + '.Consumer';
                case s:
                  var ue = O;
                  return q(ue._context) + '.Provider';
                case c:
                  return I(O, O.render, 'ForwardRef');
                case p:
                  var N = O.displayName || null;
                  return N !== null ? N : V(O.type) || 'Memo';
                case h: {
                  var $ = O,
                    X = $._payload,
                    oe = $._init;
                  try {
                    return V(oe(X));
                  } catch {
                    return null;
                  }
                }
              }
            return null;
          }
          var A = Object.assign,
            F = 0,
            B,
            te,
            U,
            W,
            R,
            z,
            Z;
          function G() {}
          G.__reactDisabledLog = !0;
          function H() {
            {
              if (F === 0) {
                (B = console.log),
                  (te = console.info),
                  (U = console.warn),
                  (W = console.error),
                  (R = console.group),
                  (z = console.groupCollapsed),
                  (Z = console.groupEnd);
                var O = {
                  configurable: !0,
                  enumerable: !0,
                  value: G,
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
          function re() {
            {
              if ((F--, F === 0)) {
                var O = {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                };
                Object.defineProperties(console, {
                  log: A({}, O, {
                    value: B,
                  }),
                  info: A({}, O, {
                    value: te,
                  }),
                  warn: A({}, O, {
                    value: U,
                  }),
                  error: A({}, O, {
                    value: W,
                  }),
                  group: A({}, O, {
                    value: R,
                  }),
                  groupCollapsed: A({}, O, {
                    value: z,
                  }),
                  groupEnd: A({}, O, {
                    value: Z,
                  }),
                });
              }
              F < 0 &&
                T('disabledDepth fell below zero. This is a bug in React. Please file an issue.');
            }
          }
          var ie = k.ReactCurrentDispatcher,
            Q;
          function se(O, K, ue) {
            {
              if (Q === void 0)
                try {
                  throw Error();
                } catch ($) {
                  var N = $.stack.trim().match(/\n( *(at )?)/);
                  Q = (N && N[1]) || '';
                }
              return (
                `
` +
                Q +
                O
              );
            }
          }
          var le = !1,
            he;
          {
            var ae = typeof WeakMap == 'function' ? WeakMap : Map;
            he = new ae();
          }
          function P(O, K) {
            if (!O || le) return '';
            {
              var ue = he.get(O);
              if (ue !== void 0) return ue;
            }
            var N;
            le = !0;
            var $ = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var X;
            (X = ie.current), (ie.current = null), H();
            try {
              if (K) {
                var oe = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(oe.prototype, 'props', {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == 'object' && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(oe, []);
                  } catch (pn) {
                    N = pn;
                  }
                  Reflect.construct(O, [], oe);
                } else {
                  try {
                    oe.call();
                  } catch (pn) {
                    N = pn;
                  }
                  O.call(oe.prototype);
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
                  var pe = pn.stack.split(`
`),
                    Ne = N.stack.split(`
`),
                    we = pe.length - 1,
                    Le = Ne.length - 1;
                  we >= 1 && Le >= 0 && pe[we] !== Ne[Le];

                )
                  Le--;
                for (; we >= 1 && Le >= 0; we--, Le--)
                  if (pe[we] !== Ne[Le]) {
                    if (we !== 1 || Le !== 1)
                      do
                        if ((we--, Le--, Le < 0 || pe[we] !== Ne[Le])) {
                          var gt =
                            `
` + pe[we].replace(' at new ', ' at ');
                          return (
                            O.displayName &&
                              gt.includes('<anonymous>') &&
                              (gt = gt.replace('<anonymous>', O.displayName)),
                            typeof O == 'function' && he.set(O, gt),
                            gt
                          );
                        }
                      while (we >= 1 && Le >= 0);
                    break;
                  }
              }
            } finally {
              (le = !1), (ie.current = X), re(), (Error.prepareStackTrace = $);
            }
            var Vn = O ? O.displayName || O.name : '',
              $a = Vn ? se(Vn) : '';
            return typeof O == 'function' && he.set(O, $a), $a;
          }
          function Oe(O, K, ue) {
            return P(O, !1);
          }
          function M(O) {
            var K = O.prototype;
            return !!(K && K.isReactComponent);
          }
          function Y(O, K, ue) {
            if (O == null) return '';
            if (typeof O == 'function') return P(O, M(O));
            if (typeof O == 'string') return se(O);
            switch (O) {
              case u:
                return se('Suspense');
              case d:
                return se('SuspenseList');
            }
            if (typeof O == 'object')
              switch (O.$$typeof) {
                case c:
                  return Oe(O.render);
                case p:
                  return Y(O.type, K, ue);
                case h: {
                  var N = O,
                    $ = N._payload,
                    X = N._init;
                  try {
                    return Y(X($), K, ue);
                  } catch {}
                }
              }
            return '';
          }
          var Pe = Object.prototype.hasOwnProperty,
            ge = {},
            et = k.ReactDebugCurrentFrame;
          function Be(O) {
            if (O) {
              var K = O._owner,
                ue = Y(O.type, O._source, K ? K.type : null);
              et.setExtraStackFrame(ue);
            } else et.setExtraStackFrame(null);
          }
          function ke(O, K, ue, N, $) {
            {
              var X = Function.call.bind(Pe);
              for (var oe in O)
                if (X(O, oe)) {
                  var pe = void 0;
                  try {
                    if (typeof O[oe] != 'function') {
                      var Ne = Error(
                        (N || 'React class') +
                          ': ' +
                          ue +
                          ' type `' +
                          oe +
                          '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                          typeof O[oe] +
                          '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
                      );
                      throw ((Ne.name = 'Invariant Violation'), Ne);
                    }
                    pe = O[oe](K, oe, N, ue, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
                  } catch (we) {
                    pe = we;
                  }
                  pe &&
                    !(pe instanceof Error) &&
                    (Be($),
                    T(
                      '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                      N || 'React class',
                      ue,
                      oe,
                      typeof pe,
                    ),
                    Be(null)),
                    pe instanceof Error &&
                      !(pe.message in ge) &&
                      ((ge[pe.message] = !0),
                      Be($),
                      T('Failed %s type: %s', ue, pe.message),
                      Be(null));
                }
            }
          }
          var Re = Array.isArray;
          function tt(O) {
            return Re(O);
          }
          function it(O) {
            {
              var K = typeof Symbol == 'function' && Symbol.toStringTag,
                ue = (K && O[Symbol.toStringTag]) || O.constructor.name || 'Object';
              return ue;
            }
          }
          function ee(O) {
            try {
              return me(O), !1;
            } catch {
              return !0;
            }
          }
          function me(O) {
            return '' + O;
          }
          function xe(O) {
            if (ee(O))
              return (
                T(
                  'The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.',
                  it(O),
                ),
                me(O)
              );
          }
          var be = k.ReactCurrentOwner,
            fe = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0,
            },
            de,
            ne,
            Ee;
          Ee = {};
          function Ce(O) {
            if (Pe.call(O, 'ref')) {
              var K = Object.getOwnPropertyDescriptor(O, 'ref').get;
              if (K && K.isReactWarning) return !1;
            }
            return O.ref !== void 0;
          }
          function Me(O) {
            if (Pe.call(O, 'key')) {
              var K = Object.getOwnPropertyDescriptor(O, 'key').get;
              if (K && K.isReactWarning) return !1;
            }
            return O.key !== void 0;
          }
          function at(O, K) {
            if (typeof O.ref == 'string' && be.current && K && be.current.stateNode !== K) {
              var ue = V(be.current.type);
              Ee[ue] ||
                (T(
                  'Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
                  V(be.current.type),
                  O.ref,
                ),
                (Ee[ue] = !0));
            }
          }
          function ft(O, K) {
            {
              var ue = function () {
                de ||
                  ((de = !0),
                  T(
                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    K,
                  ));
              };
              (ue.isReactWarning = !0),
                Object.defineProperty(O, 'key', {
                  get: ue,
                  configurable: !0,
                });
            }
          }
          function Tt(O, K) {
            {
              var ue = function () {
                ne ||
                  ((ne = !0),
                  T(
                    '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)',
                    K,
                  ));
              };
              (ue.isReactWarning = !0),
                Object.defineProperty(O, 'ref', {
                  get: ue,
                  configurable: !0,
                });
            }
          }
          var gn = function (O, K, ue, N, $, X, oe) {
            var pe = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: t,
              // Built-in properties that belong on the element
              type: O,
              key: K,
              ref: ue,
              props: oe,
              // Record the component responsible for creating this element.
              _owner: X,
            };
            return (
              (pe._store = {}),
              Object.defineProperty(pe._store, 'validated', {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1,
              }),
              Object.defineProperty(pe, '_self', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: N,
              }),
              Object.defineProperty(pe, '_source', {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: $,
              }),
              Object.freeze && (Object.freeze(pe.props), Object.freeze(pe)),
              pe
            );
          };
          function kt(O, K, ue, N, $) {
            {
              var X,
                oe = {},
                pe = null,
                Ne = null;
              ue !== void 0 && (xe(ue), (pe = '' + ue)),
                Me(K) && (xe(K.key), (pe = '' + K.key)),
                Ce(K) && ((Ne = K.ref), at(K, $));
              for (X in K) Pe.call(K, X) && !fe.hasOwnProperty(X) && (oe[X] = K[X]);
              if (O && O.defaultProps) {
                var we = O.defaultProps;
                for (X in we) oe[X] === void 0 && (oe[X] = we[X]);
              }
              if (pe || Ne) {
                var Le = typeof O == 'function' ? O.displayName || O.name || 'Unknown' : O;
                pe && ft(oe, Le), Ne && Tt(oe, Le);
              }
              return gn(O, pe, Ne, $, N, be.current, oe);
            }
          }
          var bt = k.ReactCurrentOwner,
            xt = k.ReactDebugCurrentFrame;
          function mt(O) {
            if (O) {
              var K = O._owner,
                ue = Y(O.type, O._source, K ? K.type : null);
              xt.setExtraStackFrame(ue);
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
                var O = V(bt.current.type);
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
                var K = O.fileName.replace(/^.*[\\\/]/, ''),
                  ue = O.lineNumber;
                return (
                  `

Check your code at ` +
                  K +
                  ':' +
                  ue +
                  '.'
                );
              }
              return '';
            }
          }
          var Qt = {};
          function vn(O) {
            {
              var K = ht();
              if (!K) {
                var ue = typeof O == 'string' ? O : O.displayName || O.name;
                ue &&
                  (K =
                    `

Check the top-level render call using <` +
                    ue +
                    '>.');
              }
              return K;
            }
          }
          function Ht(O, K) {
            {
              if (!O._store || O._store.validated || O.key != null) return;
              O._store.validated = !0;
              var ue = vn(K);
              if (Qt[ue]) return;
              Qt[ue] = !0;
              var N = '';
              O &&
                O._owner &&
                O._owner !== bt.current &&
                (N = ' It was passed a child from ' + V(O._owner.type) + '.'),
                mt(O),
                T(
                  'Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',
                  ue,
                  N,
                ),
                mt(null);
            }
          }
          function ln(O, K) {
            {
              if (typeof O != 'object') return;
              if (tt(O))
                for (var ue = 0; ue < O.length; ue++) {
                  var N = O[ue];
                  ot(N) && Ht(N, K);
                }
              else if (ot(O)) O._store && (O._store.validated = !0);
              else if (O) {
                var $ = m(O);
                if (typeof $ == 'function' && $ !== O.entries)
                  for (var X = $.call(O), oe; !(oe = X.next()).done; )
                    ot(oe.value) && Ht(oe.value, K);
              }
            }
          }
          function cn(O) {
            {
              var K = O.type;
              if (K == null || typeof K == 'string') return;
              var ue;
              if (typeof K == 'function') ue = K.propTypes;
              else if (
                typeof K == 'object' &&
                (K.$$typeof === c || // Note: Memo only checks outer props here.
                  // Inner props are checked in the reconciler.
                  K.$$typeof === p)
              )
                ue = K.propTypes;
              else return;
              if (ue) {
                var N = V(K);
                ke(ue, O.props, 'prop', N, O);
              } else if (K.PropTypes !== void 0 && !nt) {
                nt = !0;
                var $ = V(K);
                T(
                  'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                  $ || 'Unknown',
                );
              }
              typeof K.getDefaultProps == 'function' &&
                !K.getDefaultProps.isReactClassApproved &&
                T(
                  'getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.',
                );
            }
          }
          function un(O) {
            {
              for (var K = Object.keys(O.props), ue = 0; ue < K.length; ue++) {
                var N = K[ue];
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
          function en(O, K, ue, N, $, X) {
            {
              var oe = D(O);
              if (!oe) {
                var pe = '';
                (O === void 0 ||
                  (typeof O == 'object' && O !== null && Object.keys(O).length === 0)) &&
                  (pe +=
                    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var Ne = Sn($);
                Ne ? (pe += Ne) : (pe += ht());
                var we;
                O === null
                  ? (we = 'null')
                  : tt(O)
                  ? (we = 'array')
                  : O !== void 0 && O.$$typeof === t
                  ? ((we = '<' + (V(O.type) || 'Unknown') + ' />'),
                    (pe = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (we = typeof O),
                  T(
                    'React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
                    we,
                    pe,
                  );
              }
              var Le = kt(O, K, ue, $, X);
              if (Le == null) return Le;
              if (oe) {
                var gt = K.children;
                if (gt !== void 0)
                  if (N)
                    if (tt(gt)) {
                      for (var Vn = 0; Vn < gt.length; Vn++) ln(gt[Vn], O);
                      Object.freeze && Object.freeze(gt);
                    } else
                      T(
                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
                      );
                  else ln(gt, O);
              }
              return O === r ? un(Le) : cn(Le), Le;
            }
          }
          function dn(O, K, ue) {
            return en(O, K, ue, !0);
          }
          function De(O, K, ue) {
            return en(O, K, ue, !1);
          }
          var dt = De,
            Dt = dn;
          (mo.Fragment = r), (mo.jsx = dt), (mo.jsxs = Dt);
        })()),
    mo
  );
}
process.env.NODE_ENV === 'production' ? (bi.exports = rd()) : (bi.exports = id());
var Fi = bi.exports;
const ad = Fi.Fragment,
  _ = Fi.jsx,
  Ze = Fi.jsxs,
  sd = {
    black: '#000',
    white: '#fff',
  },
  Io = sd,
  ld = {
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
  Un = ld,
  cd = {
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
  Wn = cd,
  ud = {
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
  Hn = ud,
  dd = {
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
  qn = dd,
  pd = {
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
  Yn = pd,
  fd = {
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
  ho = fd,
  md = {
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
  hd = md;
function Bt(e, t) {
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
function In(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function _l(e) {
  if (!In(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = _l(e[o]);
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
    In(e) &&
      In(t) &&
      Object.keys(t).forEach((i) => {
        i !== '__proto__' &&
          (In(t[i]) && i in e && In(e[i])
            ? (r[i] = Ft(e[i], t[i], o))
            : o.clone
            ? (r[i] = In(t[i]) ? _l(t[i]) : t[i])
            : (r[i] = t[i]));
      }),
    r
  );
}
var gi = { exports: {} },
  Yo = { exports: {} },
  Ve = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _a;
function bd() {
  if (_a) return Ve;
  _a = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    o = e ? Symbol.for('react.portal') : 60106,
    r = e ? Symbol.for('react.fragment') : 60107,
    i = e ? Symbol.for('react.strict_mode') : 60108,
    a = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    l = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    u = e ? Symbol.for('react.concurrent_mode') : 60111,
    d = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    h = e ? Symbol.for('react.suspense_list') : 60120,
    v = e ? Symbol.for('react.memo') : 60115,
    x = e ? Symbol.for('react.lazy') : 60116,
    b = e ? Symbol.for('react.block') : 60121,
    m = e ? Symbol.for('react.fundamental') : 60117,
    k = e ? Symbol.for('react.responder') : 60118,
    T = e ? Symbol.for('react.scope') : 60119;
  function C(f) {
    if (typeof f == 'object' && f !== null) {
      var S = f.$$typeof;
      switch (S) {
        case t:
          switch (((f = f.type), f)) {
            case c:
            case u:
            case r:
            case a:
            case i:
            case p:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case d:
                case x:
                case v:
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
    return C(f) === u;
  }
  return (
    (Ve.AsyncMode = c),
    (Ve.ConcurrentMode = u),
    (Ve.ContextConsumer = l),
    (Ve.ContextProvider = s),
    (Ve.Element = t),
    (Ve.ForwardRef = d),
    (Ve.Fragment = r),
    (Ve.Lazy = x),
    (Ve.Memo = v),
    (Ve.Portal = o),
    (Ve.Profiler = a),
    (Ve.StrictMode = i),
    (Ve.Suspense = p),
    (Ve.isAsyncMode = function (f) {
      return E(f) || C(f) === c;
    }),
    (Ve.isConcurrentMode = E),
    (Ve.isContextConsumer = function (f) {
      return C(f) === l;
    }),
    (Ve.isContextProvider = function (f) {
      return C(f) === s;
    }),
    (Ve.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === t;
    }),
    (Ve.isForwardRef = function (f) {
      return C(f) === d;
    }),
    (Ve.isFragment = function (f) {
      return C(f) === r;
    }),
    (Ve.isLazy = function (f) {
      return C(f) === x;
    }),
    (Ve.isMemo = function (f) {
      return C(f) === v;
    }),
    (Ve.isPortal = function (f) {
      return C(f) === o;
    }),
    (Ve.isProfiler = function (f) {
      return C(f) === a;
    }),
    (Ve.isStrictMode = function (f) {
      return C(f) === i;
    }),
    (Ve.isSuspense = function (f) {
      return C(f) === p;
    }),
    (Ve.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === u ||
        f === a ||
        f === i ||
        f === p ||
        f === h ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === x ||
            f.$$typeof === v ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === d ||
            f.$$typeof === m ||
            f.$$typeof === k ||
            f.$$typeof === T ||
            f.$$typeof === b))
      );
    }),
    (Ve.typeOf = C),
    Ve
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
var Ma;
function gd() {
  return (
    Ma ||
      ((Ma = 1),
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
            u = e ? Symbol.for('react.concurrent_mode') : 60111,
            d = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            h = e ? Symbol.for('react.suspense_list') : 60120,
            v = e ? Symbol.for('react.memo') : 60115,
            x = e ? Symbol.for('react.lazy') : 60116,
            b = e ? Symbol.for('react.block') : 60121,
            m = e ? Symbol.for('react.fundamental') : 60117,
            k = e ? Symbol.for('react.responder') : 60118,
            T = e ? Symbol.for('react.scope') : 60119;
          function C(P) {
            return (
              typeof P == 'string' ||
              typeof P == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              P === r ||
              P === u ||
              P === a ||
              P === i ||
              P === p ||
              P === h ||
              (typeof P == 'object' &&
                P !== null &&
                (P.$$typeof === x ||
                  P.$$typeof === v ||
                  P.$$typeof === s ||
                  P.$$typeof === l ||
                  P.$$typeof === d ||
                  P.$$typeof === m ||
                  P.$$typeof === k ||
                  P.$$typeof === T ||
                  P.$$typeof === b))
            );
          }
          function E(P) {
            if (typeof P == 'object' && P !== null) {
              var Oe = P.$$typeof;
              switch (Oe) {
                case t:
                  var M = P.type;
                  switch (M) {
                    case c:
                    case u:
                    case r:
                    case a:
                    case i:
                    case p:
                      return M;
                    default:
                      var Y = M && M.$$typeof;
                      switch (Y) {
                        case l:
                        case d:
                        case x:
                        case v:
                        case s:
                          return Y;
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
            S = u,
            w = l,
            j = s,
            L = t,
            D = d,
            I = r,
            q = x,
            V = v,
            A = o,
            F = a,
            B = i,
            te = p,
            U = !1;
          function W(P) {
            return (
              U ||
                ((U = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              R(P) || E(P) === c
            );
          }
          function R(P) {
            return E(P) === u;
          }
          function z(P) {
            return E(P) === l;
          }
          function Z(P) {
            return E(P) === s;
          }
          function G(P) {
            return typeof P == 'object' && P !== null && P.$$typeof === t;
          }
          function H(P) {
            return E(P) === d;
          }
          function re(P) {
            return E(P) === r;
          }
          function ie(P) {
            return E(P) === x;
          }
          function Q(P) {
            return E(P) === v;
          }
          function se(P) {
            return E(P) === o;
          }
          function le(P) {
            return E(P) === a;
          }
          function he(P) {
            return E(P) === i;
          }
          function ae(P) {
            return E(P) === p;
          }
          (Ue.AsyncMode = f),
            (Ue.ConcurrentMode = S),
            (Ue.ContextConsumer = w),
            (Ue.ContextProvider = j),
            (Ue.Element = L),
            (Ue.ForwardRef = D),
            (Ue.Fragment = I),
            (Ue.Lazy = q),
            (Ue.Memo = V),
            (Ue.Portal = A),
            (Ue.Profiler = F),
            (Ue.StrictMode = B),
            (Ue.Suspense = te),
            (Ue.isAsyncMode = W),
            (Ue.isConcurrentMode = R),
            (Ue.isContextConsumer = z),
            (Ue.isContextProvider = Z),
            (Ue.isElement = G),
            (Ue.isForwardRef = H),
            (Ue.isFragment = re),
            (Ue.isLazy = ie),
            (Ue.isMemo = Q),
            (Ue.isPortal = se),
            (Ue.isProfiler = le),
            (Ue.isStrictMode = he),
            (Ue.isSuspense = ae),
            (Ue.isValidElementType = C),
            (Ue.typeOf = E);
        })()),
    Ue
  );
}
var Aa;
function Ml() {
  return (
    Aa ||
      ((Aa = 1), process.env.NODE_ENV === 'production' ? (Yo.exports = bd()) : (Yo.exports = gd())),
    Yo.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Zr, Da;
function vd() {
  if (Da) return Zr;
  Da = 1;
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
    (Zr = i()
      ? Object.assign
      : function (a, s) {
          for (var l, c = r(a), u, d = 1; d < arguments.length; d++) {
            l = Object(arguments[d]);
            for (var p in l) t.call(l, p) && (c[p] = l[p]);
            if (e) {
              u = e(l);
              for (var h = 0; h < u.length; h++) o.call(l, u[h]) && (c[u[h]] = l[u[h]]);
            }
          }
          return c;
        }),
    Zr
  );
}
var Qr, La;
function Bi() {
  if (La) return Qr;
  La = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (Qr = e), Qr;
}
var ei, ja;
function Al() {
  return ja || ((ja = 1), (ei = Function.call.bind(Object.prototype.hasOwnProperty))), ei;
}
var ti, Fa;
function yd() {
  if (Fa) return ti;
  Fa = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = Bi(),
      o = {},
      r = Al();
    e = function (a) {
      var s = 'Warning: ' + a;
      typeof console < 'u' && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function i(a, s, l, c, u) {
    if (process.env.NODE_ENV !== 'production') {
      for (var d in a)
        if (r(a, d)) {
          var p;
          try {
            if (typeof a[d] != 'function') {
              var h = Error(
                (c || 'React class') +
                  ': ' +
                  l +
                  ' type `' +
                  d +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof a[d] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((h.name = 'Invariant Violation'), h);
            }
            p = a[d](s, d, c, l, null, t);
          } catch (x) {
            p = x;
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
            var v = u ? u() : '';
            e('Failed ' + l + ' type: ' + p.message + (v ?? ''));
          }
        }
    }
  }
  return (
    (i.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (o = {});
    }),
    (ti = i),
    ti
  );
}
var ni, Ba;
function xd() {
  if (Ba) return ni;
  Ba = 1;
  var e = Ml(),
    t = vd(),
    o = Bi(),
    r = Al(),
    i = yd(),
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
    (ni = function (l, c) {
      var u = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function p(R) {
        var z = R && ((u && R[u]) || R[d]);
        if (typeof z == 'function') return z;
      }
      var h = '<<anonymous>>',
        v = {
          array: k('array'),
          bigint: k('bigint'),
          bool: k('boolean'),
          func: k('function'),
          number: k('number'),
          object: k('object'),
          string: k('string'),
          symbol: k('symbol'),
          any: T(),
          arrayOf: C,
          element: E(),
          elementType: f(),
          instanceOf: S,
          node: D(),
          objectOf: j,
          oneOf: w,
          oneOfType: L,
          shape: q,
          exact: V,
        };
      function x(R, z) {
        return R === z ? R !== 0 || 1 / R === 1 / z : R !== R && z !== z;
      }
      function b(R, z) {
        (this.message = R), (this.data = z && typeof z == 'object' ? z : {}), (this.stack = '');
      }
      b.prototype = Error.prototype;
      function m(R) {
        if (process.env.NODE_ENV !== 'production')
          var z = {},
            Z = 0;
        function G(re, ie, Q, se, le, he, ae) {
          if (((se = se || h), (he = he || Q), ae !== o)) {
            if (c) {
              var P = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((P.name = 'Invariant Violation'), P);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var Oe = se + ':' + Q;
              !z[Oe] && // Avoid spamming the console because they are often not actionable except for lib authors
                Z < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    he +
                    '` prop on `' +
                    se +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (z[Oe] = !0),
                Z++);
            }
          }
          return ie[Q] == null
            ? re
              ? ie[Q] === null
                ? new b(
                    'The ' +
                      le +
                      ' `' +
                      he +
                      '` is marked as required ' +
                      ('in `' + se + '`, but its value is `null`.'),
                  )
                : new b(
                    'The ' +
                      le +
                      ' `' +
                      he +
                      '` is marked as required in ' +
                      ('`' + se + '`, but its value is `undefined`.'),
                  )
              : null
            : R(ie, Q, se, le, he);
        }
        var H = G.bind(null, !1);
        return (H.isRequired = G.bind(null, !0)), H;
      }
      function k(R) {
        function z(Z, G, H, re, ie, Q) {
          var se = Z[G],
            le = B(se);
          if (le !== R) {
            var he = te(se);
            return new b(
              'Invalid ' +
                re +
                ' `' +
                ie +
                '` of type ' +
                ('`' + he + '` supplied to `' + H + '`, expected ') +
                ('`' + R + '`.'),
              { expectedType: R },
            );
          }
          return null;
        }
        return m(z);
      }
      function T() {
        return m(s);
      }
      function C(R) {
        function z(Z, G, H, re, ie) {
          if (typeof R != 'function')
            return new b(
              'Property `' +
                ie +
                '` of component `' +
                H +
                '` has invalid PropType notation inside arrayOf.',
            );
          var Q = Z[G];
          if (!Array.isArray(Q)) {
            var se = B(Q);
            return new b(
              'Invalid ' +
                re +
                ' `' +
                ie +
                '` of type ' +
                ('`' + se + '` supplied to `' + H + '`, expected an array.'),
            );
          }
          for (var le = 0; le < Q.length; le++) {
            var he = R(Q, le, H, re, ie + '[' + le + ']', o);
            if (he instanceof Error) return he;
          }
          return null;
        }
        return m(z);
      }
      function E() {
        function R(z, Z, G, H, re) {
          var ie = z[Z];
          if (!l(ie)) {
            var Q = B(ie);
            return new b(
              'Invalid ' +
                H +
                ' `' +
                re +
                '` of type ' +
                ('`' + Q + '` supplied to `' + G + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return m(R);
      }
      function f() {
        function R(z, Z, G, H, re) {
          var ie = z[Z];
          if (!e.isValidElementType(ie)) {
            var Q = B(ie);
            return new b(
              'Invalid ' +
                H +
                ' `' +
                re +
                '` of type ' +
                ('`' + Q + '` supplied to `' + G + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return m(R);
      }
      function S(R) {
        function z(Z, G, H, re, ie) {
          if (!(Z[G] instanceof R)) {
            var Q = R.name || h,
              se = W(Z[G]);
            return new b(
              'Invalid ' +
                re +
                ' `' +
                ie +
                '` of type ' +
                ('`' + se + '` supplied to `' + H + '`, expected ') +
                ('instance of `' + Q + '`.'),
            );
          }
          return null;
        }
        return m(z);
      }
      function w(R) {
        if (!Array.isArray(R))
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
        function z(Z, G, H, re, ie) {
          for (var Q = Z[G], se = 0; se < R.length; se++) if (x(Q, R[se])) return null;
          var le = JSON.stringify(R, function (ae, P) {
            var Oe = te(P);
            return Oe === 'symbol' ? String(P) : P;
          });
          return new b(
            'Invalid ' +
              re +
              ' `' +
              ie +
              '` of value `' +
              String(Q) +
              '` ' +
              ('supplied to `' + H + '`, expected one of ' + le + '.'),
          );
        }
        return m(z);
      }
      function j(R) {
        function z(Z, G, H, re, ie) {
          if (typeof R != 'function')
            return new b(
              'Property `' +
                ie +
                '` of component `' +
                H +
                '` has invalid PropType notation inside objectOf.',
            );
          var Q = Z[G],
            se = B(Q);
          if (se !== 'object')
            return new b(
              'Invalid ' +
                re +
                ' `' +
                ie +
                '` of type ' +
                ('`' + se + '` supplied to `' + H + '`, expected an object.'),
            );
          for (var le in Q)
            if (r(Q, le)) {
              var he = R(Q, le, H, re, ie + '.' + le, o);
              if (he instanceof Error) return he;
            }
          return null;
        }
        return m(z);
      }
      function L(R) {
        if (!Array.isArray(R))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var z = 0; z < R.length; z++) {
          var Z = R[z];
          if (typeof Z != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  U(Z) +
                  ' at index ' +
                  z +
                  '.',
              ),
              s
            );
        }
        function G(H, re, ie, Q, se) {
          for (var le = [], he = 0; he < R.length; he++) {
            var ae = R[he],
              P = ae(H, re, ie, Q, se, o);
            if (P == null) return null;
            P.data && r(P.data, 'expectedType') && le.push(P.data.expectedType);
          }
          var Oe = le.length > 0 ? ', expected one of type [' + le.join(', ') + ']' : '';
          return new b('Invalid ' + Q + ' `' + se + '` supplied to ' + ('`' + ie + '`' + Oe + '.'));
        }
        return m(G);
      }
      function D() {
        function R(z, Z, G, H, re) {
          return A(z[Z])
            ? null
            : new b(
                'Invalid ' +
                  H +
                  ' `' +
                  re +
                  '` supplied to ' +
                  ('`' + G + '`, expected a ReactNode.'),
              );
        }
        return m(R);
      }
      function I(R, z, Z, G, H) {
        return new b(
          (R || 'React class') +
            ': ' +
            z +
            ' type `' +
            Z +
            '.' +
            G +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            H +
            '`.',
        );
      }
      function q(R) {
        function z(Z, G, H, re, ie) {
          var Q = Z[G],
            se = B(Q);
          if (se !== 'object')
            return new b(
              'Invalid ' +
                re +
                ' `' +
                ie +
                '` of type `' +
                se +
                '` ' +
                ('supplied to `' + H + '`, expected `object`.'),
            );
          for (var le in R) {
            var he = R[le];
            if (typeof he != 'function') return I(H, re, ie, le, te(he));
            var ae = he(Q, le, H, re, ie + '.' + le, o);
            if (ae) return ae;
          }
          return null;
        }
        return m(z);
      }
      function V(R) {
        function z(Z, G, H, re, ie) {
          var Q = Z[G],
            se = B(Q);
          if (se !== 'object')
            return new b(
              'Invalid ' +
                re +
                ' `' +
                ie +
                '` of type `' +
                se +
                '` ' +
                ('supplied to `' + H + '`, expected `object`.'),
            );
          var le = t({}, Z[G], R);
          for (var he in le) {
            var ae = R[he];
            if (r(R, he) && typeof ae != 'function') return I(H, re, ie, he, te(ae));
            if (!ae)
              return new b(
                'Invalid ' +
                  re +
                  ' `' +
                  ie +
                  '` key `' +
                  he +
                  '` supplied to `' +
                  H +
                  '`.\nBad object: ' +
                  JSON.stringify(Z[G], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(R), null, '  '),
              );
            var P = ae(Q, he, H, re, ie + '.' + he, o);
            if (P) return P;
          }
          return null;
        }
        return m(z);
      }
      function A(R) {
        switch (typeof R) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !R;
          case 'object':
            if (Array.isArray(R)) return R.every(A);
            if (R === null || l(R)) return !0;
            var z = p(R);
            if (z) {
              var Z = z.call(R),
                G;
              if (z !== R.entries) {
                for (; !(G = Z.next()).done; ) if (!A(G.value)) return !1;
              } else
                for (; !(G = Z.next()).done; ) {
                  var H = G.value;
                  if (H && !A(H[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function F(R, z) {
        return R === 'symbol'
          ? !0
          : z
          ? z['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && z instanceof Symbol)
          : !1;
      }
      function B(R) {
        var z = typeof R;
        return Array.isArray(R) ? 'array' : R instanceof RegExp ? 'object' : F(z, R) ? 'symbol' : z;
      }
      function te(R) {
        if (typeof R > 'u' || R === null) return '' + R;
        var z = B(R);
        if (z === 'object') {
          if (R instanceof Date) return 'date';
          if (R instanceof RegExp) return 'regexp';
        }
        return z;
      }
      function U(R) {
        var z = te(R);
        switch (z) {
          case 'array':
          case 'object':
            return 'an ' + z;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + z;
          default:
            return z;
        }
      }
      function W(R) {
        return !R.constructor || !R.constructor.name ? h : R.constructor.name;
      }
      return (
        (v.checkPropTypes = i), (v.resetWarningCache = i.resetWarningCache), (v.PropTypes = v), v
      );
    }),
    ni
  );
}
var oi, za;
function Ed() {
  if (za) return oi;
  za = 1;
  var e = Bi();
  function t() {}
  function o() {}
  return (
    (o.resetWarningCache = t),
    (oi = function () {
      function r(s, l, c, u, d, p) {
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
    oi
  );
}
if (process.env.NODE_ENV !== 'production') {
  var Cd = Ml(),
    Od = !0;
  gi.exports = xd()(Cd.isElement, Od);
} else gi.exports = Ed()();
var Td = gi.exports;
const n = /* @__PURE__ */ od(Td);
function kd(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Dl(e, t, o, r, i) {
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
      !kd(c) &&
      (l = 'Did you accidentally use a plain function component for an element instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const Ll = Bt(n.element, Dl);
Ll.isRequired = Bt(n.element.isRequired, Dl);
const jn = Ll;
function wd(e) {
  const { prototype: t = {} } = e;
  return !!t.isReactComponent;
}
function Sd(e, t, o, r, i) {
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
      !wd(a) &&
      (l = 'Did you accidentally provide a plain function component instead?'),
    l !== void 0
      ? new Error(
          `Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`,
        )
      : null
  );
}
const zi = Bt(n.elementType, Sd),
  Rd = 'exact-prop: ​';
function Vi(e) {
  return process.env.NODE_ENV === 'production'
    ? e
    : g({}, e, {
        [Rd]: (t) => {
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
function Tn(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let o = 1; o < arguments.length; o += 1) t += '&args[]=' + encodeURIComponent(arguments[o]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var yi = { exports: {} },
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
var Va;
function Nd() {
  if (Va) return We;
  Va = 1;
  var e = Symbol.for('react.element'),
    t = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    i = Symbol.for('react.profiler'),
    a = Symbol.for('react.provider'),
    s = Symbol.for('react.context'),
    l = Symbol.for('react.server_context'),
    c = Symbol.for('react.forward_ref'),
    u = Symbol.for('react.suspense'),
    d = Symbol.for('react.suspense_list'),
    p = Symbol.for('react.memo'),
    h = Symbol.for('react.lazy'),
    v = Symbol.for('react.offscreen'),
    x;
  x = Symbol.for('react.module.reference');
  function b(m) {
    if (typeof m == 'object' && m !== null) {
      var k = m.$$typeof;
      switch (k) {
        case e:
          switch (((m = m.type), m)) {
            case o:
            case i:
            case r:
            case u:
            case d:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case l:
                case s:
                case c:
                case h:
                case p:
                case a:
                  return m;
                default:
                  return k;
              }
          }
        case t:
          return k;
      }
    }
  }
  return (
    (We.ContextConsumer = s),
    (We.ContextProvider = a),
    (We.Element = e),
    (We.ForwardRef = c),
    (We.Fragment = o),
    (We.Lazy = h),
    (We.Memo = p),
    (We.Portal = t),
    (We.Profiler = i),
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
      return b(m) === s;
    }),
    (We.isContextProvider = function (m) {
      return b(m) === a;
    }),
    (We.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (We.isForwardRef = function (m) {
      return b(m) === c;
    }),
    (We.isFragment = function (m) {
      return b(m) === o;
    }),
    (We.isLazy = function (m) {
      return b(m) === h;
    }),
    (We.isMemo = function (m) {
      return b(m) === p;
    }),
    (We.isPortal = function (m) {
      return b(m) === t;
    }),
    (We.isProfiler = function (m) {
      return b(m) === i;
    }),
    (We.isStrictMode = function (m) {
      return b(m) === r;
    }),
    (We.isSuspense = function (m) {
      return b(m) === u;
    }),
    (We.isSuspenseList = function (m) {
      return b(m) === d;
    }),
    (We.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === o ||
        m === i ||
        m === r ||
        m === u ||
        m === d ||
        m === v ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === h ||
            m.$$typeof === p ||
            m.$$typeof === a ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === x ||
            m.getModuleId !== void 0))
      );
    }),
    (We.typeOf = b),
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
var Ua;
function $d() {
  return (
    Ua ||
      ((Ua = 1),
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
            u = Symbol.for('react.suspense'),
            d = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            h = Symbol.for('react.lazy'),
            v = Symbol.for('react.offscreen'),
            x = !1,
            b = !1,
            m = !1,
            k = !1,
            T = !1,
            C;
          C = Symbol.for('react.module.reference');
          function E(M) {
            return !!(
              typeof M == 'string' ||
              typeof M == 'function' ||
              M === o ||
              M === i ||
              T ||
              M === r ||
              M === u ||
              M === d ||
              k ||
              M === v ||
              x ||
              b ||
              m ||
              (typeof M == 'object' &&
                M !== null &&
                (M.$$typeof === h ||
                  M.$$typeof === p ||
                  M.$$typeof === a ||
                  M.$$typeof === s ||
                  M.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  M.$$typeof === C ||
                  M.getModuleId !== void 0))
            );
          }
          function f(M) {
            if (typeof M == 'object' && M !== null) {
              var Y = M.$$typeof;
              switch (Y) {
                case e:
                  var Pe = M.type;
                  switch (Pe) {
                    case o:
                    case i:
                    case r:
                    case u:
                    case d:
                      return Pe;
                    default:
                      var ge = Pe && Pe.$$typeof;
                      switch (ge) {
                        case l:
                        case s:
                        case c:
                        case h:
                        case p:
                        case a:
                          return ge;
                        default:
                          return Y;
                      }
                  }
                case t:
                  return Y;
              }
            }
          }
          var S = s,
            w = a,
            j = e,
            L = c,
            D = o,
            I = h,
            q = p,
            V = t,
            A = i,
            F = r,
            B = u,
            te = d,
            U = !1,
            W = !1;
          function R(M) {
            return (
              U ||
                ((U = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function z(M) {
            return (
              W ||
                ((W = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function Z(M) {
            return f(M) === s;
          }
          function G(M) {
            return f(M) === a;
          }
          function H(M) {
            return typeof M == 'object' && M !== null && M.$$typeof === e;
          }
          function re(M) {
            return f(M) === c;
          }
          function ie(M) {
            return f(M) === o;
          }
          function Q(M) {
            return f(M) === h;
          }
          function se(M) {
            return f(M) === p;
          }
          function le(M) {
            return f(M) === t;
          }
          function he(M) {
            return f(M) === i;
          }
          function ae(M) {
            return f(M) === r;
          }
          function P(M) {
            return f(M) === u;
          }
          function Oe(M) {
            return f(M) === d;
          }
          (He.ContextConsumer = S),
            (He.ContextProvider = w),
            (He.Element = j),
            (He.ForwardRef = L),
            (He.Fragment = D),
            (He.Lazy = I),
            (He.Memo = q),
            (He.Portal = V),
            (He.Profiler = A),
            (He.StrictMode = F),
            (He.Suspense = B),
            (He.SuspenseList = te),
            (He.isAsyncMode = R),
            (He.isConcurrentMode = z),
            (He.isContextConsumer = Z),
            (He.isContextProvider = G),
            (He.isElement = H),
            (He.isForwardRef = re),
            (He.isFragment = ie),
            (He.isLazy = Q),
            (He.isMemo = se),
            (He.isPortal = le),
            (He.isProfiler = he),
            (He.isStrictMode = ae),
            (He.isSuspense = P),
            (He.isSuspenseList = Oe),
            (He.isValidElementType = E),
            (He.typeOf = f);
        })()),
    He
  );
}
process.env.NODE_ENV === 'production' ? (yi.exports = Nd()) : (yi.exports = $d());
var Wa = yi.exports;
const Pd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Id(e) {
  const t = `${e}`.match(Pd);
  return (t && t[1]) || '';
}
function jl(e, t = '') {
  return e.displayName || e.name || Id(e) || t;
}
function Ha(e, t, o) {
  const r = jl(t);
  return e.displayName || (r !== '' ? `${o}(${r})` : o);
}
function _d(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return jl(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Wa.ForwardRef:
          return Ha(e, e.render, 'ForwardRef');
        case Wa.Memo:
          return Ha(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function Jt(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = e[t],
    s = i || t;
  return a == null
    ? null
    : a && a.nodeType !== 1
    ? new Error(`Invalid ${r} \`${s}\` supplied to \`${o}\`. Expected an HTMLElement.`)
    : null;
}
const Md = n.oneOfType([n.func, n.object]),
  Nt = Md;
function J(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : Tn(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function qa(...e) {
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
function Ui(e, t = 166) {
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
function ri(e, t) {
  return /* @__PURE__ */ y.isValidElement(e) && t.indexOf(e.type.muiName) !== -1;
}
function ct(e) {
  return (e && e.ownerDocument) || document;
}
function mn(e) {
  return ct(e).defaultView || window;
}
function Ad(e, t) {
  if (process.env.NODE_ENV === 'production') return () => null;
  const o = t ? g({}, t.propTypes) : null;
  return (i) =>
    (a, s, l, c, u, ...d) => {
      const p = u || s,
        h = o == null ? void 0 : o[p];
      if (h) {
        const v = h(a, s, l, c, u, ...d);
        if (v) return v;
      }
      return typeof a[s] < 'u' && !a[i]
        ? new Error(
            `The prop \`${p}\` of \`${e}\` can only be used together with the \`${i}\` prop.`,
          )
        : null;
    };
}
function dr(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
const Dd = typeof window < 'u' ? y.useLayoutEffect : y.useEffect,
  an = Dd;
let Ya = 0;
function Ld(e) {
  const [t, o] = y.useState(e),
    r = e || t;
  return (
    y.useEffect(() => {
      t == null && ((Ya += 1), o(`mui-${Ya}`));
    }, [t]),
    r
  );
}
const Ga = y['useId'];
function Fl(e) {
  if (Ga !== void 0) {
    const t = Ga();
    return e ?? t;
  }
  return Ld(e);
}
function jd(e, t, o, r, i) {
  if (process.env.NODE_ENV === 'production') return null;
  const a = i || t;
  return typeof e[t] < 'u'
    ? new Error(`The prop \`${a}\` is not supported. Please remove it.`)
    : null;
}
function Mn({ controlled: e, default: t, name: o, state: r = 'value' }) {
  const { current: i } = y.useRef(e !== void 0),
    [a, s] = y.useState(t),
    l = i ? e : a;
  if (process.env.NODE_ENV !== 'production') {
    y.useEffect(() => {
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
    const { current: u } = y.useRef(t);
    y.useEffect(() => {
      !i &&
        u !== t &&
        console.error(
          [
            `MUI: A component is changing the default ${r} state of an uncontrolled ${o} after being initialized. To suppress this warning opt to use a controlled ${o}.`,
          ].join(`
`),
        );
    }, [JSON.stringify(t)]);
  }
  const c = y.useCallback((u) => {
    i || s(u);
  }, []);
  return [l, c];
}
function Ct(e) {
  const t = y.useRef(e);
  return (
    an(() => {
      t.current = e;
    }),
    y.useCallback(
      (...o) =>
        // @ts-expect-error hide `this`
        // tslint:disable-next-line:ban-comma-operator
        (0, t.current)(...o),
      [],
    )
  );
}
function ut(...e) {
  return y.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((o) => {
              dr(o, t);
            });
          },
    e,
  );
}
let Cr = !0,
  xi = !1,
  Ka;
const Fd = {
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
function Bd(e) {
  const { type: t, tagName: o } = e;
  return !!(
    (o === 'INPUT' && Fd[t] && !e.readOnly) ||
    (o === 'TEXTAREA' && !e.readOnly) ||
    e.isContentEditable
  );
}
function zd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Cr = !0);
}
function ii() {
  Cr = !1;
}
function Vd() {
  this.visibilityState === 'hidden' && xi && (Cr = !0);
}
function Ud(e) {
  e.addEventListener('keydown', zd, !0),
    e.addEventListener('mousedown', ii, !0),
    e.addEventListener('pointerdown', ii, !0),
    e.addEventListener('touchstart', ii, !0),
    e.addEventListener('visibilitychange', Vd, !0);
}
function Wd(e) {
  const { target: t } = e;
  try {
    return t.matches(':focus-visible');
  } catch {}
  return Cr || Bd(t);
}
function Bl() {
  const e = y.useCallback((i) => {
      i != null && Ud(i.ownerDocument);
    }, []),
    t = y.useRef(!1);
  function o() {
    return t.current
      ? ((xi = !0),
        window.clearTimeout(Ka),
        (Ka = window.setTimeout(() => {
          xi = !1;
        }, 100)),
        (t.current = !1),
        !0)
      : !1;
  }
  function r(i) {
    return Wd(i) ? ((t.current = !0), !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: o,
    ref: e,
  };
}
function zl(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
const Hd = (e) => {
    const t = y.useRef({});
    return (
      y.useEffect(() => {
        t.current = e;
      }),
      t.current
    );
  },
  qd = Hd,
  Yd = {
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
  Gd = Yd;
function Kd(e) {
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
function Xd(e) {
  return typeof e == 'number' && isFinite(e) && Math.floor(e) === e;
}
const Jd = Number.isInteger || Xd;
function Vl(e, t, o, r) {
  const i = e[t];
  if (i == null || !Jd(i)) {
    const a = Kd(i);
    return new RangeError(
      `Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${o}\`, expected \`integer\`.`,
    );
  }
  return null;
}
function Ul(e, t, ...o) {
  return e[t] === void 0 ? null : Vl(e, t, ...o);
}
function Ei() {
  return null;
}
Ul.isRequired = Vl;
Ei.isRequired = Ei;
const Or = process.env.NODE_ENV === 'production' ? Ei : Ul;
function Wi(e, t) {
  const o = g({}, t);
  return (
    Object.keys(e).forEach((r) => {
      if (r.toString().match(/^(components|slots)$/)) o[r] = g({}, e[r], o[r]);
      else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
        const i = e[r] || {},
          a = t[r];
        (o[r] = {}),
          !a || !Object.keys(a)
            ? (o[r] = i)
            : !i || !Object.keys(i)
            ? (o[r] = a)
            : ((o[r] = g({}, a)),
              Object.keys(i).forEach((s) => {
                o[r][s] = Wi(i[s], a[s]);
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
const Xa = (e) => e,
  Zd = () => {
    let e = Xa;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Xa;
      },
    };
  },
  Qd = Zd(),
  ep = Qd,
  tp = {
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
function $e(e, t, o = 'Mui') {
  const r = tp[t];
  return r ? `${o}-${r}` : `${ep.generate(e)}-${t}`;
}
function Se(e, t, o = 'Mui') {
  const r = {};
  return (
    t.forEach((i) => {
      r[i] = $e(e, i, o);
    }),
    r
  );
}
function ye(e, t) {
  if (e == null) return {};
  var o = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (o[i] = e[i]);
  return o;
}
function Wl(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function (o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var np =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  op = /* @__PURE__ */ Wl(
    function (e) {
      return (
        np.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
      );
    },
    /* Z+1 */
  );
function rp(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function ip(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var ap = /* @__PURE__ */ (function () {
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
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(ip(this));
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
          var s = rp(i);
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
  Et = '-ms-',
  pr = '-moz-',
  ze = '-webkit-',
  Hi = 'comm',
  qi = 'rule',
  Yi = 'decl',
  sp = '@import',
  Hl = '@keyframes',
  lp = Math.abs,
  Tr = String.fromCharCode,
  cp = Object.assign;
function up(e, t) {
  return vt(e, 0) ^ 45
    ? (((((((t << 2) ^ vt(e, 0)) << 2) ^ vt(e, 1)) << 2) ^ vt(e, 2)) << 2) ^ vt(e, 3)
    : 0;
}
function ql(e) {
  return e.trim();
}
function dp(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Xe(e, t, o) {
  return e.replace(t, o);
}
function Ci(e, t) {
  return e.indexOf(t);
}
function vt(e, t) {
  return e.charCodeAt(t) | 0;
}
function _o(e, t, o) {
  return e.slice(t, o);
}
function nn(e) {
  return e.length;
}
function Gi(e) {
  return e.length;
}
function Go(e, t) {
  return t.push(e), e;
}
function pp(e, t) {
  return e.map(t).join('');
}
var kr = 1,
  no = 1,
  Yl = 0,
  Rt = 0,
  pt = 0,
  uo = '';
function wr(e, t, o, r, i, a, s) {
  return {
    value: e,
    root: t,
    parent: o,
    type: r,
    props: i,
    children: a,
    line: kr,
    column: no,
    length: s,
    return: '',
  };
}
function bo(e, t) {
  return cp(wr('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function fp() {
  return pt;
}
function mp() {
  return (pt = Rt > 0 ? vt(uo, --Rt) : 0), no--, pt === 10 && ((no = 1), kr--), pt;
}
function _t() {
  return (pt = Rt < Yl ? vt(uo, Rt++) : 0), no++, pt === 10 && ((no = 1), kr++), pt;
}
function rn() {
  return vt(uo, Rt);
}
function ar() {
  return Rt;
}
function Bo(e, t) {
  return _o(uo, e, t);
}
function Mo(e) {
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
function Gl(e) {
  return (kr = no = 1), (Yl = nn((uo = e))), (Rt = 0), [];
}
function Kl(e) {
  return (uo = ''), e;
}
function sr(e) {
  return ql(Bo(Rt - 1, Oi(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function hp(e) {
  for (; (pt = rn()) && pt < 33; ) _t();
  return Mo(e) > 2 || Mo(pt) > 3 ? '' : ' ';
}
function bp(e, t) {
  for (; --t && _t() && !(pt < 48 || pt > 102 || (pt > 57 && pt < 65) || (pt > 70 && pt < 97)); );
  return Bo(e, ar() + (t < 6 && rn() == 32 && _t() == 32));
}
function Oi(e) {
  for (; _t(); )
    switch (pt) {
      case e:
        return Rt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Oi(pt);
        break;
      case 40:
        e === 41 && Oi(e);
        break;
      case 92:
        _t();
        break;
    }
  return Rt;
}
function gp(e, t) {
  for (; _t() && e + pt !== 47 + 10; ) if (e + pt === 42 + 42 && rn() === 47) break;
  return '/*' + Bo(t, Rt - 1) + '*' + Tr(e === 47 ? e : _t());
}
function vp(e) {
  for (; !Mo(rn()); ) _t();
  return Bo(e, Rt);
}
function yp(e) {
  return Kl(lr('', null, null, null, [''], (e = Gl(e)), 0, [0], e));
}
function lr(e, t, o, r, i, a, s, l, c) {
  for (
    var u = 0,
      d = 0,
      p = s,
      h = 0,
      v = 0,
      x = 0,
      b = 1,
      m = 1,
      k = 1,
      T = 0,
      C = '',
      E = i,
      f = a,
      S = r,
      w = C;
    m;

  )
    switch (((x = T), (T = _t()))) {
      case 40:
        if (x != 108 && vt(w, p - 1) == 58) {
          Ci((w += Xe(sr(T), '&', '&\f')), '&\f') != -1 && (k = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        w += sr(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        w += hp(x);
        break;
      case 92:
        w += bp(ar() - 1, 7);
        continue;
      case 47:
        switch (rn()) {
          case 42:
          case 47:
            Go(xp(gp(_t(), ar()), t, o), c);
            break;
          default:
            w += '/';
        }
        break;
      case 123 * b:
        l[u++] = nn(w) * k;
      case 125 * b:
      case 59:
      case 0:
        switch (T) {
          case 0:
          case 125:
            m = 0;
          case 59 + d:
            v > 0 &&
              nn(w) - p &&
              Go(v > 32 ? Za(w + ';', r, o, p - 1) : Za(Xe(w, ' ', '') + ';', r, o, p - 2), c);
            break;
          case 59:
            w += ';';
          default:
            if ((Go((S = Ja(w, t, o, u, d, i, l, C, (E = []), (f = []), p)), a), T === 123))
              if (d === 0) lr(w, t, S, S, E, a, p, l, f);
              else
                switch (h === 99 && vt(w, 3) === 110 ? 100 : h) {
                  case 100:
                  case 109:
                  case 115:
                    lr(
                      e,
                      S,
                      S,
                      r && Go(Ja(e, S, S, 0, 0, i, l, C, i, (E = []), p), f),
                      i,
                      f,
                      p,
                      l,
                      r ? E : f,
                    );
                    break;
                  default:
                    lr(w, S, S, S, [''], f, 0, l, f);
                }
        }
        (u = d = v = 0), (b = k = 1), (C = w = ''), (p = s);
        break;
      case 58:
        (p = 1 + nn(w)), (v = x);
      default:
        if (b < 1) {
          if (T == 123) --b;
          else if (T == 125 && b++ == 0 && mp() == 125) continue;
        }
        switch (((w += Tr(T)), T * b)) {
          case 38:
            k = d > 0 ? 1 : ((w += '\f'), -1);
            break;
          case 44:
            (l[u++] = (nn(w) - 1) * k), (k = 1);
            break;
          case 64:
            rn() === 45 && (w += sr(_t())), (h = rn()), (d = p = nn((C = w += vp(ar())))), T++;
            break;
          case 45:
            x === 45 && nn(w) == 2 && (b = 0);
        }
    }
  return a;
}
function Ja(e, t, o, r, i, a, s, l, c, u, d) {
  for (var p = i - 1, h = i === 0 ? a : [''], v = Gi(h), x = 0, b = 0, m = 0; x < r; ++x)
    for (var k = 0, T = _o(e, p + 1, (p = lp((b = s[x])))), C = e; k < v; ++k)
      (C = ql(b > 0 ? h[k] + ' ' + T : Xe(T, /&\f/g, h[k]))) && (c[m++] = C);
  return wr(e, t, o, i === 0 ? qi : l, c, u, d);
}
function xp(e, t, o) {
  return wr(e, t, o, Hi, Tr(fp()), _o(e, 2, -2), 0);
}
function Za(e, t, o, r) {
  return wr(e, t, o, Yi, _o(e, 0, r), _o(e, r + 1, -1), r);
}
function Zn(e, t) {
  for (var o = '', r = Gi(e), i = 0; i < r; i++) o += t(e[i], i, e, t) || '';
  return o;
}
function Ep(e, t, o, r) {
  switch (e.type) {
    case sp:
    case Yi:
      return (e.return = e.return || e.value);
    case Hi:
      return '';
    case Hl:
      return (e.return = e.value + '{' + Zn(e.children, r) + '}');
    case qi:
      e.value = e.props.join(',');
  }
  return nn((o = Zn(e.children, r))) ? (e.return = e.value + '{' + o + '}') : '';
}
function Cp(e) {
  var t = Gi(e);
  return function (o, r, i, a) {
    for (var s = '', l = 0; l < t; l++) s += e[l](o, r, i, a) || '';
    return s;
  };
}
function Op(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var Tp = function (t, o, r) {
    for (var i = 0, a = 0; (i = a), (a = rn()), i === 38 && a === 12 && (o[r] = 1), !Mo(a); ) _t();
    return Bo(t, Rt);
  },
  kp = function (t, o) {
    var r = -1,
      i = 44;
    do
      switch (Mo(i)) {
        case 0:
          i === 38 && rn() === 12 && (o[r] = 1), (t[r] += Tp(Rt - 1, o, r));
          break;
        case 2:
          t[r] += sr(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = rn() === 58 ? '&\f' : ''), (o[r] = t[r].length);
            break;
          }
        default:
          t[r] += Tr(i);
      }
    while ((i = _t()));
    return t;
  },
  wp = function (t, o) {
    return Kl(kp(Gl(t), o));
  },
  Qa = /* @__PURE__ */ new WeakMap(),
  Sp = function (t) {
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
      if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !Qa.get(r)) && !i) {
        Qa.set(t, !0);
        for (var a = [], s = wp(o, a), l = r.props, c = 0, u = 0; c < s.length; c++)
          for (var d = 0; d < l.length; d++, u++)
            t.props[u] = a[c] ? s[c].replace(/&\f/g, l[d]) : l[d] + ' ' + s[c];
      }
    }
  },
  Rp = function (t) {
    if (t.type === 'decl') {
      var o = t.value;
      // charcode for l
      o.charCodeAt(0) === 108 && // charcode for b
        o.charCodeAt(2) === 98 &&
        ((t.return = ''), (t.value = ''));
    }
  },
  Np =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  $p = function (t) {
    return t.type === 'comm' && t.children.indexOf(Np) > -1;
  },
  Pp = function (t) {
    return function (o, r, i) {
      if (!(o.type !== 'rule' || t.compat)) {
        var a = o.value.match(/(:first|:nth|:nth-last)-child/g);
        if (a) {
          for (
            var s = o.parent === i[0],
              l = s
                ? i[0].children
                : // global rule at the root level
                  i,
              c = l.length - 1;
            c >= 0;
            c--
          ) {
            var u = l[c];
            if (u.line < o.line) break;
            if (u.column < o.column) {
              if ($p(u)) return;
              break;
            }
          }
          a.forEach(function (d) {
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
  Xl = function (t) {
    return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
  },
  Ip = function (t, o) {
    for (var r = t - 1; r >= 0; r--) if (!Xl(o[r])) return !0;
    return !1;
  },
  es = function (t) {
    (t.type = ''), (t.value = ''), (t.return = ''), (t.children = ''), (t.props = '');
  },
  _p = function (t, o, r) {
    Xl(t) &&
      (t.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
          ),
          es(t))
        : Ip(o, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
          ),
          es(t)));
  };
function Jl(e, t) {
  switch (up(e, t)) {
    case 5103:
      return ze + 'print-' + e + e;
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
      return ze + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return ze + e + pr + e + Et + e + e;
    case 6828:
    case 4268:
      return ze + e + Et + e + e;
    case 6165:
      return ze + e + Et + 'flex-' + e + e;
    case 5187:
      return ze + e + Xe(e, /(\w+).+(:[^]+)/, ze + 'box-$1$2' + Et + 'flex-$1$2') + e;
    case 5443:
      return ze + e + Et + 'flex-item-' + Xe(e, /flex-|-self/, '') + e;
    case 4675:
      return ze + e + Et + 'flex-line-pack' + Xe(e, /align-content|flex-|-self/, '') + e;
    case 5548:
      return ze + e + Et + Xe(e, 'shrink', 'negative') + e;
    case 5292:
      return ze + e + Et + Xe(e, 'basis', 'preferred-size') + e;
    case 6060:
      return ze + 'box-' + Xe(e, '-grow', '') + ze + e + Et + Xe(e, 'grow', 'positive') + e;
    case 4554:
      return ze + Xe(e, /([^-])(transform)/g, '$1' + ze + '$2') + e;
    case 6187:
      return Xe(Xe(Xe(e, /(zoom-|grab)/, ze + '$1'), /(image-set)/, ze + '$1'), e, '') + e;
    case 5495:
    case 3959:
      return Xe(e, /(image-set\([^]*)/, ze + '$1$`$1');
    case 4968:
      return (
        Xe(
          Xe(e, /(.+:)(flex-)?(.*)/, ze + 'box-pack:$3' + Et + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify',
        ) +
        ze +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Xe(e, /(.+)-inline(.+)/, ze + '$1$2') + e;
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
      if (nn(e) - 1 - t > 6)
        switch (vt(e, t + 1)) {
          case 109:
            if (vt(e, t + 4) !== 45) break;
          case 102:
            return (
              Xe(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' + ze + '$2-$3$1' + pr + (vt(e, t + 3) == 108 ? '$3' : '$2-$3'),
              ) + e
            );
          case 115:
            return ~Ci(e, 'stretch') ? Jl(Xe(e, 'stretch', 'fill-available'), t) + e : e;
        }
      break;
    case 4949:
      if (vt(e, t + 1) !== 115) break;
    case 6444:
      switch (vt(e, nn(e) - 3 - (~Ci(e, '!important') && 10))) {
        case 107:
          return Xe(e, ':', ':' + ze) + e;
        case 101:
          return (
            Xe(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                ze +
                (vt(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                ze +
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
          return ze + e + Et + Xe(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return ze + e + Et + Xe(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return ze + e + Et + Xe(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return ze + e + Et + e + e;
  }
  return e;
}
var Mp = function (t, o, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Yi:
          t.return = Jl(t.value, t.length);
          break;
        case Hl:
          return Zn(
            [
              bo(t, {
                value: Xe(t.value, '@', '@' + ze),
              }),
            ],
            i,
          );
        case qi:
          if (t.length)
            return pp(t.props, function (a) {
              switch (dp(a, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Zn(
                    [
                      bo(t, {
                        props: [Xe(a, /:(read-\w+)/, ':' + pr + '$1')],
                      }),
                    ],
                    i,
                  );
                case '::placeholder':
                  return Zn(
                    [
                      bo(t, {
                        props: [Xe(a, /:(plac\w+)/, ':' + ze + 'input-$1')],
                      }),
                      bo(t, {
                        props: [Xe(a, /:(plac\w+)/, ':' + pr + '$1')],
                      }),
                      bo(t, {
                        props: [Xe(a, /:(plac\w+)/, Et + 'input-$1')],
                      }),
                    ],
                    i,
                  );
              }
              return '';
            });
      }
  },
  Ap = [Mp],
  Dp = function (t) {
    var o = t.key;
    if (process.env.NODE_ENV !== 'production' && !o)
      throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
    if (o === 'css') {
      var r = document.querySelectorAll('style[data-emotion]:not([data-s])');
      Array.prototype.forEach.call(r, function (b) {
        var m = b.getAttribute('data-emotion');
        m.indexOf(' ') !== -1 && (document.head.appendChild(b), b.setAttribute('data-s', ''));
      });
    }
    var i = t.stylisPlugins || Ap;
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
        function (b) {
          for (var m = b.getAttribute('data-emotion').split(' '), k = 1; k < m.length; k++)
            a[m[k]] = !0;
          l.push(b);
        },
      );
    var c,
      u = [Sp, Rp];
    process.env.NODE_ENV !== 'production' &&
      u.push(
        Pp({
          get compat() {
            return x.compat;
          },
        }),
        _p,
      );
    {
      var d,
        p = [
          Ep,
          process.env.NODE_ENV !== 'production'
            ? function (b) {
                b.root ||
                  (b.return
                    ? d.insert(b.return)
                    : b.value && b.type !== Hi && d.insert(b.value + '{}'));
              }
            : Op(function (b) {
                d.insert(b);
              }),
        ],
        h = Cp(u.concat(i, p)),
        v = function (m) {
          return Zn(yp(m), h);
        };
      c = function (m, k, T, C) {
        (d = T),
          process.env.NODE_ENV !== 'production' &&
            k.map !== void 0 &&
            (d = {
              insert: function (f) {
                T.insert(f + k.map);
              },
            }),
          v(m ? m + '{' + k.styles + '}' : k.styles),
          C && (x.inserted[k.name] = !0);
      };
    }
    var x = {
      key: o,
      sheet: new ap({
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
    return x.sheet.hydrate(l), x;
  },
  Ti = { exports: {} },
  qe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ts;
function Lp() {
  if (ts) return qe;
  ts = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    o = e ? Symbol.for('react.portal') : 60106,
    r = e ? Symbol.for('react.fragment') : 60107,
    i = e ? Symbol.for('react.strict_mode') : 60108,
    a = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    l = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    u = e ? Symbol.for('react.concurrent_mode') : 60111,
    d = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    h = e ? Symbol.for('react.suspense_list') : 60120,
    v = e ? Symbol.for('react.memo') : 60115,
    x = e ? Symbol.for('react.lazy') : 60116,
    b = e ? Symbol.for('react.block') : 60121,
    m = e ? Symbol.for('react.fundamental') : 60117,
    k = e ? Symbol.for('react.responder') : 60118,
    T = e ? Symbol.for('react.scope') : 60119;
  function C(f) {
    if (typeof f == 'object' && f !== null) {
      var S = f.$$typeof;
      switch (S) {
        case t:
          switch (((f = f.type), f)) {
            case c:
            case u:
            case r:
            case a:
            case i:
            case p:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case l:
                case d:
                case x:
                case v:
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
    (qe.Lazy = x),
    (qe.Memo = v),
    (qe.Portal = o),
    (qe.Profiler = a),
    (qe.StrictMode = i),
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
      return C(f) === x;
    }),
    (qe.isMemo = function (f) {
      return C(f) === v;
    }),
    (qe.isPortal = function (f) {
      return C(f) === o;
    }),
    (qe.isProfiler = function (f) {
      return C(f) === a;
    }),
    (qe.isStrictMode = function (f) {
      return C(f) === i;
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
        f === a ||
        f === i ||
        f === p ||
        f === h ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === x ||
            f.$$typeof === v ||
            f.$$typeof === s ||
            f.$$typeof === l ||
            f.$$typeof === d ||
            f.$$typeof === m ||
            f.$$typeof === k ||
            f.$$typeof === T ||
            f.$$typeof === b))
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
var ns;
function jp() {
  return (
    ns ||
      ((ns = 1),
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
            u = e ? Symbol.for('react.concurrent_mode') : 60111,
            d = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            h = e ? Symbol.for('react.suspense_list') : 60120,
            v = e ? Symbol.for('react.memo') : 60115,
            x = e ? Symbol.for('react.lazy') : 60116,
            b = e ? Symbol.for('react.block') : 60121,
            m = e ? Symbol.for('react.fundamental') : 60117,
            k = e ? Symbol.for('react.responder') : 60118,
            T = e ? Symbol.for('react.scope') : 60119;
          function C(P) {
            return (
              typeof P == 'string' ||
              typeof P == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              P === r ||
              P === u ||
              P === a ||
              P === i ||
              P === p ||
              P === h ||
              (typeof P == 'object' &&
                P !== null &&
                (P.$$typeof === x ||
                  P.$$typeof === v ||
                  P.$$typeof === s ||
                  P.$$typeof === l ||
                  P.$$typeof === d ||
                  P.$$typeof === m ||
                  P.$$typeof === k ||
                  P.$$typeof === T ||
                  P.$$typeof === b))
            );
          }
          function E(P) {
            if (typeof P == 'object' && P !== null) {
              var Oe = P.$$typeof;
              switch (Oe) {
                case t:
                  var M = P.type;
                  switch (M) {
                    case c:
                    case u:
                    case r:
                    case a:
                    case i:
                    case p:
                      return M;
                    default:
                      var Y = M && M.$$typeof;
                      switch (Y) {
                        case l:
                        case d:
                        case x:
                        case v:
                        case s:
                          return Y;
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
            S = u,
            w = l,
            j = s,
            L = t,
            D = d,
            I = r,
            q = x,
            V = v,
            A = o,
            F = a,
            B = i,
            te = p,
            U = !1;
          function W(P) {
            return (
              U ||
                ((U = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              R(P) || E(P) === c
            );
          }
          function R(P) {
            return E(P) === u;
          }
          function z(P) {
            return E(P) === l;
          }
          function Z(P) {
            return E(P) === s;
          }
          function G(P) {
            return typeof P == 'object' && P !== null && P.$$typeof === t;
          }
          function H(P) {
            return E(P) === d;
          }
          function re(P) {
            return E(P) === r;
          }
          function ie(P) {
            return E(P) === x;
          }
          function Q(P) {
            return E(P) === v;
          }
          function se(P) {
            return E(P) === o;
          }
          function le(P) {
            return E(P) === a;
          }
          function he(P) {
            return E(P) === i;
          }
          function ae(P) {
            return E(P) === p;
          }
          (Ye.AsyncMode = f),
            (Ye.ConcurrentMode = S),
            (Ye.ContextConsumer = w),
            (Ye.ContextProvider = j),
            (Ye.Element = L),
            (Ye.ForwardRef = D),
            (Ye.Fragment = I),
            (Ye.Lazy = q),
            (Ye.Memo = V),
            (Ye.Portal = A),
            (Ye.Profiler = F),
            (Ye.StrictMode = B),
            (Ye.Suspense = te),
            (Ye.isAsyncMode = W),
            (Ye.isConcurrentMode = R),
            (Ye.isContextConsumer = z),
            (Ye.isContextProvider = Z),
            (Ye.isElement = G),
            (Ye.isForwardRef = H),
            (Ye.isFragment = re),
            (Ye.isLazy = ie),
            (Ye.isMemo = Q),
            (Ye.isPortal = se),
            (Ye.isProfiler = le),
            (Ye.isStrictMode = he),
            (Ye.isSuspense = ae),
            (Ye.isValidElementType = C),
            (Ye.typeOf = E);
        })()),
    Ye
  );
}
process.env.NODE_ENV === 'production' ? (Ti.exports = Lp()) : (Ti.exports = jp());
var Fp = Ti.exports,
  Zl = Fp,
  Bp = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  zp = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  Ql = {};
Ql[Zl.ForwardRef] = Bp;
Ql[Zl.Memo] = zp;
var Vp = !0;
function Ki(e, t, o) {
  var r = '';
  return (
    o.split(' ').forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ';') : (r += i + ' ');
    }),
    r
  );
}
var Sr = function (t, o, r) {
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
      Vp === !1) &&
      t.registered[i] === void 0 &&
      (t.registered[i] = o.styles);
  },
  Rr = function (t, o, r) {
    Sr(t, o, r);
    var i = t.key + '-' + o.name;
    if (t.inserted[o.name] === void 0) {
      var a = o;
      do t.insert(o === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function Up(e) {
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
var Wp = {
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
  os = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Hp =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  qp = /[A-Z]|^ms/g,
  ec = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Xi = function (t) {
    return t.charCodeAt(1) === 45;
  },
  rs = function (t) {
    return t != null && typeof t != 'boolean';
  },
  ai = /* @__PURE__ */ Wl(function (e) {
    return Xi(e) ? e : e.replace(qp, '-$&').toLowerCase();
  }),
  fr = function (t, o) {
    switch (t) {
      case 'animation':
      case 'animationName':
        if (typeof o == 'string')
          return o.replace(ec, function (r, i, a) {
            return (
              (qt = {
                name: i,
                styles: a,
                next: qt,
              }),
              i
            );
          });
    }
    return Wp[t] !== 1 && !Xi(t) && typeof o == 'number' && o !== 0 ? o + 'px' : o;
  };
if (process.env.NODE_ENV !== 'production') {
  var Yp =
      /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,
    Gp = ['normal', 'none', 'initial', 'inherit', 'unset'],
    Kp = fr,
    Xp = /^-ms-/,
    Jp = /-(.)/g,
    is = {};
  fr = function (t, o) {
    if (
      t === 'content' &&
      (typeof o != 'string' ||
        (Gp.indexOf(o) === -1 &&
          !Yp.test(o) &&
          (o.charAt(0) !== o.charAt(o.length - 1) || (o.charAt(0) !== '"' && o.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          o +
          '"\'`',
      );
    var r = Kp(t, o);
    return (
      r !== '' &&
        !Xi(t) &&
        t.indexOf('-') !== -1 &&
        is[t] === void 0 &&
        ((is[t] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            t.replace(Xp, 'ms-').replace(Jp, function (i, a) {
              return a.toUpperCase();
            }) +
            '?',
        )),
      r
    );
  };
}
var tc =
  'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function Ao(e, t, o) {
  if (o == null) return '';
  if (o.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== 'production' && o.toString() === 'NO_COMPONENT_SELECTOR')
      throw new Error(tc);
    return o;
  }
  switch (typeof o) {
    case 'boolean':
      return '';
    case 'object': {
      if (o.anim === 1)
        return (
          (qt = {
            name: o.name,
            styles: o.styles,
            next: qt,
          }),
          o.name
        );
      if (o.styles !== void 0) {
        var r = o.next;
        if (r !== void 0)
          for (; r !== void 0; )
            (qt = {
              name: r.name,
              styles: r.styles,
              next: qt,
            }),
              (r = r.next);
        var i = o.styles + ';';
        return process.env.NODE_ENV !== 'production' && o.map !== void 0 && (i += o.map), i;
      }
      return Zp(e, t, o);
    }
    case 'function': {
      if (e !== void 0) {
        var a = qt,
          s = o(e);
        return (qt = a), Ao(e, t, s);
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
          c = o.replace(ec, function (d, p, h) {
            var v = 'animation' + l.length;
            return (
              l.push(
                'const ' + v + ' = keyframes`' + h.replace(/^@keyframes animation-\w+/, '') + '`',
              ),
              '${' + v + '}'
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
function Zp(e, t, o) {
  var r = '';
  if (Array.isArray(o)) for (var i = 0; i < o.length; i++) r += Ao(e, t, o[i]) + ';';
  else
    for (var a in o) {
      var s = o[a];
      if (typeof s != 'object')
        t != null && t[s] !== void 0
          ? (r += a + '{' + t[s] + '}')
          : rs(s) && (r += ai(a) + ':' + fr(a, s) + ';');
      else {
        if (a === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production')
          throw new Error(tc);
        if (Array.isArray(s) && typeof s[0] == 'string' && (t == null || t[s[0]] === void 0))
          for (var l = 0; l < s.length; l++) rs(s[l]) && (r += ai(a) + ':' + fr(a, s[l]) + ';');
        else {
          var c = Ao(e, t, s);
          switch (a) {
            case 'animation':
            case 'animationName': {
              r += ai(a) + ':' + c + ';';
              break;
            }
            default:
              process.env.NODE_ENV !== 'production' && a === 'undefined' && console.error(Hp),
                (r += a + '{' + c + '}');
          }
        }
      }
    }
  return r;
}
var as = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  nc;
process.env.NODE_ENV !== 'production' &&
  (nc = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var qt,
  oo = function (t, o, r) {
    if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      a = '';
    qt = void 0;
    var s = t[0];
    s == null || s.raw === void 0
      ? ((i = !1), (a += Ao(r, o, s)))
      : (process.env.NODE_ENV !== 'production' && s[0] === void 0 && console.error(os),
        (a += s[0]));
    for (var l = 1; l < t.length; l++)
      (a += Ao(r, o, t[l])),
        i &&
          (process.env.NODE_ENV !== 'production' && s[l] === void 0 && console.error(os),
          (a += s[l]));
    var c;
    process.env.NODE_ENV !== 'production' &&
      (a = a.replace(nc, function (h) {
        return (c = h), '';
      })),
      (as.lastIndex = 0);
    for (var u = '', d; (d = as.exec(a)) !== null; )
      u +=
        '-' + // $FlowFixMe we know it's not null
        d[1];
    var p = Up(a) + u;
    return process.env.NODE_ENV !== 'production'
      ? {
          name: p,
          styles: a,
          map: c,
          next: qt,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          },
        }
      : {
          name: p,
          styles: a,
          next: qt,
        };
  },
  Qp = function (t) {
    return t();
  },
  oc = y['useInsertionEffect'] ? y['useInsertionEffect'] : !1,
  Ji = oc || Qp,
  ss = oc || Ju,
  ef = {}.hasOwnProperty,
  Zi = /* @__PURE__ */ $l(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement < 'u'
      ? /* @__PURE__ */ Dp({
          key: 'css',
        })
      : null,
  );
process.env.NODE_ENV !== 'production' && (Zi.displayName = 'EmotionCacheContext');
Zi.Provider;
var Nr = function (t) {
    return /* @__PURE__ */ Zu(function (o, r) {
      var i = Fo(Zi);
      return t(o, i, r);
    });
  },
  zo = /* @__PURE__ */ $l({});
process.env.NODE_ENV !== 'production' && (zo.displayName = 'EmotionThemeContext');
var ls = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  cs = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  tf = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      Sr(o, r, i),
      Ji(function () {
        return Rr(o, r, i);
      }),
      null
    );
  },
  nf = /* @__PURE__ */ Nr(function (e, t, o) {
    var r = e.css;
    typeof r == 'string' && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[ls],
      a = [r],
      s = '';
    typeof e.className == 'string'
      ? (s = Ki(t.registered, a, e.className))
      : e.className != null && (s = e.className + ' ');
    var l = oo(a, void 0, Fo(zo));
    if (process.env.NODE_ENV !== 'production' && l.name.indexOf('-') === -1) {
      var c = e[cs];
      c && (l = oo([l, 'label:' + c + ';']));
    }
    s += t.key + '-' + l.name;
    var u = {};
    for (var d in e)
      ef.call(e, d) &&
        d !== 'css' &&
        d !== ls &&
        (process.env.NODE_ENV === 'production' || d !== cs) &&
        (u[d] = e[d]);
    return (
      (u.ref = o),
      (u.className = s),
      /* @__PURE__ */ Cn(
        ji,
        null,
        /* @__PURE__ */ Cn(tf, {
          cache: t,
          serialized: l,
          isStringTag: typeof i == 'string',
        }),
        /* @__PURE__ */ Cn(i, u),
      )
    );
  });
process.env.NODE_ENV !== 'production' && (nf.displayName = 'EmotionCssPropInternal');
var of = {
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
  us = !1,
  rc = /* @__PURE__ */ Nr(function (e, t) {
    process.env.NODE_ENV !== 'production' &&
      !us && // check for className as well since the user is
      // probably using the custom createElement which
      // means it will be turned into a className prop
      // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?",
      ),
      (us = !0));
    var o = e.styles,
      r = oo([o], void 0, Fo(zo)),
      i = hi();
    return (
      ss(
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
      ss(
        function () {
          var a = i.current,
            s = a[0],
            l = a[1];
          if (l) {
            a[1] = !1;
            return;
          }
          if ((r.next !== void 0 && Rr(t, r.next, !0), s.tags.length)) {
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
process.env.NODE_ENV !== 'production' && (rc.displayName = 'EmotionGlobal');
function rf() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return oo(t);
}
var Qi = function () {
    var t = rf.apply(void 0, arguments),
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
  af = function e(t) {
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
function sf(e, t, o) {
  var r = [],
    i = Ki(e, r, o);
  return r.length < 2 ? o : i + t(r);
}
var lf = function (t) {
    var o = t.cache,
      r = t.serializedArr;
    return (
      Ji(function () {
        for (var i = 0; i < r.length; i++) Rr(o, r[i], !1);
      }),
      null
    );
  },
  cf = /* @__PURE__ */ Nr(function (e, t) {
    var o = !1,
      r = [],
      i = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('css can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        var h = oo(d, t.registered);
        return r.push(h), Sr(t, h, !1), t.key + '-' + h.name;
      },
      a = function () {
        if (o && process.env.NODE_ENV !== 'production')
          throw new Error('cx can only be used during render');
        for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++) d[p] = arguments[p];
        return sf(t.registered, i, af(d));
      },
      s = {
        css: i,
        cx: a,
        theme: Fo(zo),
      },
      l = e.children(s);
    return (
      (o = !0),
      /* @__PURE__ */ Cn(
        ji,
        null,
        /* @__PURE__ */ Cn(lf, {
          cache: t,
          serializedArr: r,
        }),
        l,
      )
    );
  });
process.env.NODE_ENV !== 'production' && (cf.displayName = 'EmotionClassNames');
if (process.env.NODE_ENV !== 'production') {
  var ds = !0,
    uf = typeof jest < 'u' || typeof vi < 'u';
  if (ds && !uf) {
    var ps =
        // $FlowIgnore
        typeof globalThis < 'u' ? globalThis : ds ? window : global,
      fs = '__EMOTION_REACT_' + of.version.split('.')[0] + '__';
    ps[fs] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.',
      ),
      (ps[fs] = !0);
  }
}
var df = op,
  pf = function (t) {
    return t !== 'theme';
  },
  ms = function (t) {
    return typeof t == 'string' && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      t.charCodeAt(0) > 96
      ? df
      : pf;
  },
  hs = function (t, o, r) {
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
  bs = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  ff = function (t) {
    var o = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      Sr(o, r, i),
      Ji(function () {
        return Rr(o, r, i);
      }),
      null
    );
  },
  mf = function e(t, o) {
    if (process.env.NODE_ENV !== 'production' && t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var r = t.__emotion_real === t,
      i = (r && t.__emotion_base) || t,
      a,
      s;
    o !== void 0 && ((a = o.label), (s = o.target));
    var l = hs(t, o, r),
      c = l || ms(i),
      u = !c('as');
    return function () {
      var d = arguments,
        p = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if ((a !== void 0 && p.push('label:' + a + ';'), d[0] == null || d[0].raw === void 0))
        p.push.apply(p, d);
      else {
        process.env.NODE_ENV !== 'production' && d[0][0] === void 0 && console.error(bs),
          p.push(d[0][0]);
        for (var h = d.length, v = 1; v < h; v++)
          process.env.NODE_ENV !== 'production' && d[0][v] === void 0 && console.error(bs),
            p.push(d[v], d[0][v]);
      }
      var x = Nr(function (b, m, k) {
        var T = (u && b.as) || i,
          C = '',
          E = [],
          f = b;
        if (b.theme == null) {
          f = {};
          for (var S in b) f[S] = b[S];
          f.theme = Fo(zo);
        }
        typeof b.className == 'string'
          ? (C = Ki(m.registered, E, b.className))
          : b.className != null && (C = b.className + ' ');
        var w = oo(p.concat(E), m.registered, f);
        (C += m.key + '-' + w.name), s !== void 0 && (C += ' ' + s);
        var j = u && l === void 0 ? ms(T) : c,
          L = {};
        for (var D in b)
          (u && D === 'as') || // $FlowFixMe
            (j(D) && (L[D] = b[D]));
        return (
          (L.className = C),
          (L.ref = k),
          /* @__PURE__ */ Cn(
            ji,
            null,
            /* @__PURE__ */ Cn(ff, {
              cache: m,
              serialized: w,
              isStringTag: typeof T == 'string',
            }),
            /* @__PURE__ */ Cn(T, L),
          )
        );
      });
      return (
        (x.displayName =
          a !== void 0
            ? a
            : 'Styled(' +
              (typeof i == 'string' ? i : i.displayName || i.name || 'Component') +
              ')'),
        (x.defaultProps = t.defaultProps),
        (x.__emotion_real = x),
        (x.__emotion_base = i),
        (x.__emotion_styles = p),
        (x.__emotion_forwardProp = l),
        Object.defineProperty(x, 'toString', {
          value: function () {
            return s === void 0 && process.env.NODE_ENV !== 'production'
              ? 'NO_COMPONENT_SELECTOR'
              : '.' + s;
          },
        }),
        (x.withComponent = function (b, m) {
          return e(
            b,
            g({}, o, m, {
              shouldForwardProp: hs(x, m, !0),
            }),
          ).apply(void 0, p);
        }),
        x
      );
    };
  };
const hf = mf;
var bf = [
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
  ki = hf.bind();
bf.forEach(function (e) {
  ki[e] = ki(e);
});
const gf = ki;
function vf(e) {
  return e == null || Object.keys(e).length === 0;
}
function ic(e) {
  const { styles: t, defaultTheme: o = {} } = e;
  return /* @__PURE__ */ _(rc, {
    styles: typeof t == 'function' ? (i) => t(vf(i) ? o : i) : t,
  });
}
process.env.NODE_ENV !== 'production' &&
  (ic.propTypes = {
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
function yf(e, t) {
  const o = gf(e, t);
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
const xf = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Ef =
    process.env.NODE_ENV !== 'production'
      ? n.oneOfType([n.number, n.string, n.object, n.array])
      : {},
  kn = Ef;
function ko(e, t) {
  return t
    ? Ft(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const ea = {
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
  gs = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${ea[e]}px)`,
  };
function At(e, t, o) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || gs;
    return t.reduce((s, l, c) => ((s[a.up(a.keys[c])] = o(t[c])), s), {});
  }
  if (typeof t == 'object') {
    const a = r.breakpoints || gs;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || ea).indexOf(l) !== -1) {
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
function Cf(e = {}) {
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
function Of(e, t) {
  return e.reduce((o, r) => {
    const i = o[r];
    return (!i || Object.keys(i).length === 0) && delete o[r], o;
  }, t);
}
function Tf(e, t) {
  if (typeof e != 'object') return {};
  const o = {},
    r = Object.keys(t);
  return (
    Array.isArray(e)
      ? r.forEach((i, a) => {
          a < e.length && (o[i] = !0);
        })
      : r.forEach((i) => {
          e[i] != null && (o[i] = !0);
        }),
    o
  );
}
function $r({ values: e, breakpoints: t, base: o }) {
  const r = o || Tf(e, t),
    i = Object.keys(r);
  if (i.length === 0) return e;
  let a;
  return i.reduce(
    (s, l, c) => (
      Array.isArray(e)
        ? ((s[l] = e[c] != null ? e[c] : e[a]), (a = c))
        : typeof e == 'object'
        ? ((s[l] = e[l] != null ? e[l] : e[a]), (a = l))
        : (s[l] = e),
      s
    ),
    {},
  );
}
function Pr(e, t, o = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && o) {
    const r = `vars.${t}`.split('.').reduce((i, a) => (i && i[a] ? i[a] : null), e);
    if (r != null) return r;
  }
  return t.split('.').reduce((r, i) => (r && r[i] != null ? r[i] : null), e);
}
function mr(e, t, o, r = o) {
  let i;
  return (
    typeof e == 'function' ? (i = e(o)) : Array.isArray(e) ? (i = e[o] || r) : (i = Pr(e, o) || r),
    t && (i = t(i, r, e)),
    i
  );
}
function Qe(e) {
  const { prop: t, cssProperty: o = e.prop, themeKey: r, transform: i } = e,
    a = (s) => {
      if (s[t] == null) return null;
      const l = s[t],
        c = s.theme,
        u = Pr(c, r) || {};
      return At(s, l, (p) => {
        let h = mr(u, i, p);
        return (
          p === h &&
            typeof p == 'string' &&
            (h = mr(u, i, `${t}${p === 'default' ? '' : J(p)}`, p)),
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
            [t]: kn,
          }
        : {}),
    (a.filterProps = [t]),
    a
  );
}
function Ir(...e) {
  const t = e.reduce(
      (r, i) => (
        i.filterProps.forEach((a) => {
          r[a] = i;
        }),
        r
      ),
      {},
    ),
    o = (r) => Object.keys(r).reduce((i, a) => (t[a] ? ko(i, t[a](r)) : i), {});
  return (
    (o.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((r, i) => Object.assign(r, i.propTypes), {})
        : {}),
    (o.filterProps = e.reduce((r, i) => r.concat(i.filterProps), [])),
    o
  );
}
function kf(e) {
  const t = {};
  return (o) => (t[o] === void 0 && (t[o] = e(o)), t[o]);
}
const wf = {
    m: 'margin',
    p: 'padding',
  },
  Sf = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  vs = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  Rf = kf((e) => {
    if (e.length > 2)
      if (vs[e]) e = vs[e];
      else return [e];
    const [t, o] = e.split(''),
      r = wf[t],
      i = Sf[o] || '';
    return Array.isArray(i) ? i.map((a) => r + a) : [r + i];
  }),
  _r = [
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
  Mr = [
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
  Nf = [..._r, ...Mr];
function Vo(e, t, o, r) {
  var i;
  const a = (i = Pr(e, t, !1)) != null ? i : o;
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
function ac(e) {
  return Vo(e, 'spacing', 8, 'spacing');
}
function Uo(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const o = Math.abs(t),
    r = e(o);
  return t >= 0 ? r : typeof r == 'number' ? -r : `-${r}`;
}
function $f(e, t) {
  return (o) => e.reduce((r, i) => ((r[i] = Uo(t, o)), r), {});
}
function Pf(e, t, o, r) {
  if (t.indexOf(o) === -1) return null;
  const i = Rf(o),
    a = $f(i, r),
    s = e[o];
  return At(e, s, a);
}
function sc(e, t) {
  const o = ac(e.theme);
  return Object.keys(e)
    .map((r) => Pf(e, t, r, o))
    .reduce(ko, {});
}
function st(e) {
  return sc(e, _r);
}
st.propTypes =
  process.env.NODE_ENV !== 'production' ? _r.reduce((e, t) => ((e[t] = kn), e), {}) : {};
st.filterProps = _r;
function lt(e) {
  return sc(e, Mr);
}
lt.propTypes =
  process.env.NODE_ENV !== 'production' ? Mr.reduce((e, t) => ((e[t] = kn), e), {}) : {};
lt.filterProps = Mr;
process.env.NODE_ENV !== 'production' && Nf.reduce((e, t) => ((e[t] = kn), e), {});
function on(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const If = Qe({
    prop: 'border',
    themeKey: 'borders',
    transform: on,
  }),
  _f = Qe({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: on,
  }),
  Mf = Qe({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: on,
  }),
  Af = Qe({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: on,
  }),
  Df = Qe({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: on,
  }),
  Lf = Qe({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  jf = Qe({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  Ff = Qe({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  Bf = Qe({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  zf = Qe({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  Ar = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Vo(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        o = (r) => ({
          borderRadius: Uo(t, r),
        });
      return At(e, e.borderRadius, o);
    }
    return null;
  };
Ar.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: kn,
      }
    : {};
Ar.filterProps = ['borderRadius'];
Ir(If, _f, Mf, Af, Df, Lf, jf, Ff, Bf, zf, Ar);
const Dr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Vo(e.theme, 'spacing', 8, 'gap'),
      o = (r) => ({
        gap: Uo(t, r),
      });
    return At(e, e.gap, o);
  }
  return null;
};
Dr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: kn,
      }
    : {};
Dr.filterProps = ['gap'];
const Lr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Vo(e.theme, 'spacing', 8, 'columnGap'),
      o = (r) => ({
        columnGap: Uo(t, r),
      });
    return At(e, e.columnGap, o);
  }
  return null;
};
Lr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: kn,
      }
    : {};
Lr.filterProps = ['columnGap'];
const jr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Vo(e.theme, 'spacing', 8, 'rowGap'),
      o = (r) => ({
        rowGap: Uo(t, r),
      });
    return At(e, e.rowGap, o);
  }
  return null;
};
jr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: kn,
      }
    : {};
jr.filterProps = ['rowGap'];
const Vf = Qe({
    prop: 'gridColumn',
  }),
  Uf = Qe({
    prop: 'gridRow',
  }),
  Wf = Qe({
    prop: 'gridAutoFlow',
  }),
  Hf = Qe({
    prop: 'gridAutoColumns',
  }),
  qf = Qe({
    prop: 'gridAutoRows',
  }),
  Yf = Qe({
    prop: 'gridTemplateColumns',
  }),
  Gf = Qe({
    prop: 'gridTemplateRows',
  }),
  Kf = Qe({
    prop: 'gridTemplateAreas',
  }),
  Xf = Qe({
    prop: 'gridArea',
  });
Ir(Dr, Lr, jr, Vf, Uf, Wf, Hf, qf, Yf, Gf, Kf, Xf);
function Qn(e, t) {
  return t === 'grey' ? t : e;
}
const Jf = Qe({
    prop: 'color',
    themeKey: 'palette',
    transform: Qn,
  }),
  Zf = Qe({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: Qn,
  }),
  Qf = Qe({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: Qn,
  });
Ir(Jf, Zf, Qf);
function It(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const em = Qe({
    prop: 'width',
    transform: It,
  }),
  ta = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (o) => {
        var r, i, a;
        return {
          maxWidth:
            ((r = e.theme) == null || (i = r.breakpoints) == null || (a = i.values) == null
              ? void 0
              : a[o]) ||
            ea[o] ||
            It(o),
        };
      };
      return At(e, e.maxWidth, t);
    }
    return null;
  };
ta.filterProps = ['maxWidth'];
const tm = Qe({
    prop: 'minWidth',
    transform: It,
  }),
  nm = Qe({
    prop: 'height',
    transform: It,
  }),
  om = Qe({
    prop: 'maxHeight',
    transform: It,
  }),
  rm = Qe({
    prop: 'minHeight',
    transform: It,
  });
Qe({
  prop: 'size',
  cssProperty: 'width',
  transform: It,
});
Qe({
  prop: 'size',
  cssProperty: 'height',
  transform: It,
});
const im = Qe({
  prop: 'boxSizing',
});
Ir(em, ta, tm, nm, om, rm, im);
const si = (e) => (t) => {
    if (t[e] !== void 0 && t[e] !== null) {
      const o = (r) => {
        var i, a;
        let s =
          (i = t.theme.typography) == null
            ? void 0
            : i[
                `${e}${
                  t[e] === 'default' || t[e] === e
                    ? ''
                    : J((a = t[e]) == null ? void 0 : a.toString())
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
      return At(t, t[e], o);
    }
    return null;
  },
  am = {
    // borders
    border: {
      themeKey: 'borders',
      transform: on,
    },
    borderTop: {
      themeKey: 'borders',
      transform: on,
    },
    borderRight: {
      themeKey: 'borders',
      transform: on,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: on,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: on,
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
      style: Ar,
    },
    // palette
    color: {
      themeKey: 'palette',
      transform: Qn,
    },
    bgcolor: {
      themeKey: 'palette',
      cssProperty: 'backgroundColor',
      transform: Qn,
    },
    backgroundColor: {
      themeKey: 'palette',
      transform: Qn,
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
      style: Dr,
    },
    rowGap: {
      style: jr,
    },
    columnGap: {
      style: Lr,
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
      style: ta,
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
      style: si('fontFamily'),
    },
    fontSize: {
      themeKey: 'typography',
      style: si('fontSize'),
    },
    fontStyle: {
      themeKey: 'typography',
    },
    fontWeight: {
      themeKey: 'typography',
      style: si('fontWeight'),
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
  Fr = am;
function sm(...e) {
  const t = e.reduce((r, i) => r.concat(Object.keys(i)), []),
    o = new Set(t);
  return e.every((r) => o.size === Object.keys(r).length);
}
function lm(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function cm() {
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
    const { cssProperty: c = o, themeKey: u, transform: d, style: p } = l;
    if (r == null) return null;
    const h = Pr(i, u) || {};
    return p
      ? p(s)
      : At(s, r, (x) => {
          let b = mr(h, d, x);
          return (
            x === b &&
              typeof x == 'string' &&
              (b = mr(h, d, `${o}${x === 'default' ? '' : J(x)}`, x)),
            c === !1
              ? b
              : {
                  [c]: b,
                }
          );
        });
  }
  function t(o) {
    var r;
    const { sx: i, theme: a = {} } = o || {};
    if (!i) return null;
    const s = (r = a.unstable_sxConfig) != null ? r : Fr;
    function l(c) {
      let u = c;
      if (typeof c == 'function') u = c(a);
      else if (typeof c != 'object') return c;
      if (!u) return null;
      const d = Cf(a.breakpoints),
        p = Object.keys(d);
      let h = d;
      return (
        Object.keys(u).forEach((v) => {
          const x = lm(u[v], a);
          if (x != null)
            if (typeof x == 'object')
              if (s[v]) h = ko(h, e(v, x, a, s));
              else {
                const b = At(
                  {
                    theme: a,
                  },
                  x,
                  (m) => ({
                    [v]: m,
                  }),
                );
                sm(b, x)
                  ? (h[v] = t({
                      sx: x,
                      theme: a,
                    }))
                  : (h = ko(h, b));
              }
            else h = ko(h, e(v, x, a, s));
        }),
        Of(p, h)
      );
    }
    return Array.isArray(i) ? i.map(l) : l(i);
  }
  return t;
}
const lc = cm();
lc.filterProps = ['sx'];
const na = lc,
  um = ['sx'],
  dm = (e) => {
    var t, o;
    const r = {
        systemProps: {},
        otherProps: {},
      },
      i = (t = e == null || (o = e.theme) == null ? void 0 : o.unstable_sxConfig) != null ? t : Fr;
    return (
      Object.keys(e).forEach((a) => {
        i[a] ? (r.systemProps[a] = e[a]) : (r.otherProps[a] = e[a]);
      }),
      r
    );
  };
function pm(e) {
  const { sx: t } = e,
    o = ye(e, um),
    { systemProps: r, otherProps: i } = dm(o);
  let a;
  return (
    Array.isArray(t)
      ? (a = [r, ...t])
      : typeof t == 'function'
      ? (a = (...s) => {
          const l = t(...s);
          return In(l) ? g({}, r, l) : r;
        })
      : (a = g({}, r, t)),
    g({}, i, {
      sx: a,
    })
  );
}
function cc(e) {
  var t,
    o,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (o = cc(e[t])) && (r && (r += ' '), (r += o));
    else for (t in e) e[t] && (r && (r += ' '), (r += t));
  return r;
}
function ve() {
  for (var e, t, o = 0, r = ''; o < arguments.length; )
    (e = arguments[o++]) && (t = cc(e)) && (r && (r += ' '), (r += t));
  return r;
}
const fm = ['values', 'unit', 'step'],
  mm = (e) => {
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
function hm(e) {
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
    i = ye(e, fm),
    a = mm(t),
    s = Object.keys(a);
  function l(h) {
    return `@media (min-width:${typeof t[h] == 'number' ? t[h] : h}${o})`;
  }
  function c(h) {
    return `@media (max-width:${(typeof t[h] == 'number' ? t[h] : h) - r / 100}${o})`;
  }
  function u(h, v) {
    const x = s.indexOf(v);
    return `@media (min-width:${typeof t[h] == 'number' ? t[h] : h}${o}) and (max-width:${
      (x !== -1 && typeof t[s[x]] == 'number' ? t[s[x]] : v) - r / 100
    }${o})`;
  }
  function d(h) {
    return s.indexOf(h) + 1 < s.length ? u(h, s[s.indexOf(h) + 1]) : l(h);
  }
  function p(h) {
    const v = s.indexOf(h);
    return v === 0
      ? l(s[1])
      : v === s.length - 1
      ? c(s[v])
      : u(h, s[s.indexOf(h) + 1]).replace('@media', '@media not all and');
  }
  return g(
    {
      keys: s,
      values: a,
      up: l,
      down: c,
      between: u,
      only: d,
      not: p,
      unit: o,
    },
    i,
  );
}
const bm = {
    borderRadius: 4,
  },
  gm = bm;
function vm(e = 8) {
  if (e.mui) return e;
  const t = ac({
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
const ym = ['breakpoints', 'palette', 'spacing', 'shape'];
function oa(e = {}, ...t) {
  const { breakpoints: o = {}, palette: r = {}, spacing: i, shape: a = {} } = e,
    s = ye(e, ym),
    l = hm(o),
    c = vm(i);
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
      shape: g({}, gm, a),
    },
    s,
  );
  return (
    (u = t.reduce((d, p) => Ft(d, p), u)),
    (u.unstable_sxConfig = g({}, Fr, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return na({
        sx: p,
        theme: this,
      });
    }),
    u
  );
}
const uc = /* @__PURE__ */ y.createContext(null);
process.env.NODE_ENV !== 'production' && (uc.displayName = 'ThemeContext');
const xm = uc;
function Em() {
  const e = y.useContext(xm);
  return process.env.NODE_ENV !== 'production' && y.useDebugValue(e), e;
}
function Cm(e) {
  return Object.keys(e).length === 0;
}
function dc(e = null) {
  const t = Em();
  return !t || Cm(t) ? e : t;
}
const Om = oa();
function pc(e = Om) {
  return dc(e);
}
const Tm = ['variant'];
function ys(e) {
  return e.length === 0;
}
function fc(e) {
  const { variant: t } = e,
    o = ye(e, Tm);
  let r = t || '';
  return (
    Object.keys(o)
      .sort()
      .forEach((i) => {
        i === 'color'
          ? (r += ys(r) ? e[i] : J(e[i]))
          : (r += `${ys(r) ? i : J(i)}${J(e[i].toString())}`);
      }),
    r
  );
}
const km = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'],
  wm = ['theme'],
  Sm = ['theme'];
function go(e) {
  return Object.keys(e).length === 0;
}
function Rm(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const Nm = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  $m = (e, t) => {
    let o = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (o = t.components[e].variants);
    const r = {};
    return (
      o.forEach((i) => {
        const a = fc(i.props);
        r[a] = i.style;
      }),
      r
    );
  },
  Pm = (e, t, o, r) => {
    var i, a;
    const { ownerState: s = {} } = e,
      l = [],
      c = o == null || (i = o.components) == null || (a = i[r]) == null ? void 0 : a.variants;
    return (
      c &&
        c.forEach((u) => {
          let d = !0;
          Object.keys(u.props).forEach((p) => {
            s[p] !== u.props[p] && e[p] !== u.props[p] && (d = !1);
          }),
            d && l.push(t[fc(u.props)]);
        }),
      l
    );
  };
function wo(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Im = oa(),
  _m = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function Mm(e = {}) {
  const { defaultTheme: t = Im, rootShouldForwardProp: o = wo, slotShouldForwardProp: r = wo } = e,
    i = (a) => {
      const s = go(a.theme) ? t : a.theme;
      return na(
        g({}, a, {
          theme: s,
        }),
      );
    };
  return (
    (i.__mui_systemSx = !0),
    (a, s = {}) => {
      xf(a, (C) => C.filter((E) => !(E != null && E.__mui_systemSx)));
      const { name: l, slot: c, skipVariantsResolver: u, skipSx: d, overridesResolver: p } = s,
        h = ye(s, km),
        v = u !== void 0 ? u : (c && c !== 'Root') || !1,
        x = d || !1;
      let b;
      process.env.NODE_ENV !== 'production' && l && (b = `${l}-${_m(c || 'Root')}`);
      let m = wo;
      c === 'Root' ? (m = o) : c ? (m = r) : Rm(a) && (m = void 0);
      const k = yf(
          a,
          g(
            {
              shouldForwardProp: m,
              label: b,
            },
            h,
          ),
        ),
        T = (C, ...E) => {
          const f = E
            ? E.map((L) =>
                typeof L == 'function' && L.__emotion_real !== L
                  ? (D) => {
                      let { theme: I } = D,
                        q = ye(D, wm);
                      return L(
                        g(
                          {
                            theme: go(I) ? t : I,
                          },
                          q,
                        ),
                      );
                    }
                  : L,
              )
            : [];
          let S = C;
          l &&
            p &&
            f.push((L) => {
              const D = go(L.theme) ? t : L.theme,
                I = Nm(l, D);
              if (I) {
                const q = {};
                return (
                  Object.entries(I).forEach(([V, A]) => {
                    q[V] =
                      typeof A == 'function'
                        ? A(
                            g({}, L, {
                              theme: D,
                            }),
                          )
                        : A;
                  }),
                  p(L, q)
                );
              }
              return null;
            }),
            l &&
              !v &&
              f.push((L) => {
                const D = go(L.theme) ? t : L.theme;
                return Pm(L, $m(l, D), D, l);
              }),
            x || f.push(i);
          const w = f.length - E.length;
          if (Array.isArray(C) && w > 0) {
            const L = new Array(w).fill('');
            (S = [...C, ...L]), (S.raw = [...C.raw, ...L]);
          } else
            typeof C == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              C.__emotion_real !== C &&
              (S = (L) => {
                let { theme: D } = L,
                  I = ye(L, Sm);
                return C(
                  g(
                    {
                      theme: go(D) ? t : D,
                    },
                    I,
                  ),
                );
              });
          const j = k(S, ...f);
          if (process.env.NODE_ENV !== 'production') {
            let L;
            l && (L = `${l}${c || ''}`),
              L === void 0 && (L = `Styled(${_d(a)})`),
              (j.displayName = L);
          }
          return j;
        };
      return k.withConfig && (T.withConfig = k.withConfig), T;
    }
  );
}
function Am(e) {
  const { theme: t, name: o, props: r } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps
    ? r
    : Wi(t.components[o].defaultProps, r);
}
function Dm({ props: e, name: t, defaultTheme: o }) {
  const r = pc(o);
  return Am({
    theme: r,
    name: t,
    props: e,
  });
}
function ra(e, t = 0, o = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > o) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`),
    Math.min(Math.max(t, e), o)
  );
}
function Lm(e) {
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
function Dn(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Dn(Lm(e));
  const t = e.indexOf('('),
    o = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(o) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : Tn(9, e),
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
          : Tn(10, i),
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
function Br(e) {
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
function jm(e) {
  e = Dn(e);
  const { values: t } = e,
    o = t[0],
    r = t[1] / 100,
    i = t[2] / 100,
    a = r * Math.min(i, 1 - i),
    s = (u, d = (u + o / 30) % 12) => i - a * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return (
    e.type === 'hsla' && ((l += 'a'), c.push(t[3])),
    Br({
      type: l,
      values: c,
    })
  );
}
function wi(e) {
  e = Dn(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? Dn(jm(e)).values : e.values;
  return (
    (t = t.map(
      (o) => (
        e.type !== 'color' && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function xs(e, t) {
  const o = wi(e),
    r = wi(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Je(e, t) {
  return (
    (e = Dn(e)),
    (t = ra(t)),
    (e.type === 'rgb' || e.type === 'hsl') && (e.type += 'a'),
    e.type === 'color' ? (e.values[3] = `/${t}`) : (e.values[3] = t),
    Br(e)
  );
}
function zr(e, t) {
  if (((e = Dn(e)), (t = ra(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] *= 1 - t;
  return Br(e);
}
function Vr(e, t) {
  if (((e = Dn(e)), (t = ra(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let o = 0; o < 3; o += 1) e.values[o] += (1 - e.values[o]) * t;
  return Br(e);
}
function Fm(e, t = 0.15) {
  return wi(e) > 0.5 ? zr(e, t) : Vr(e, t);
}
function Bm(e, t) {
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
const zm = ['mode', 'contrastThreshold', 'tonalOffset'],
  Es = {
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
      paper: Io.white,
      default: Io.white,
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
  li = {
    text: {
      primary: Io.white,
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
      active: Io.white,
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
function Cs(e, t, o, r) {
  const i = r.light || r,
    a = r.dark || r * 1.5;
  e[t] ||
    (e.hasOwnProperty(o)
      ? (e[t] = e[o])
      : t === 'light'
      ? (e.light = Vr(e.main, i))
      : t === 'dark' && (e.dark = zr(e.main, a)));
}
function Vm(e = 'light') {
  return e === 'dark'
    ? {
        main: Hn[200],
        light: Hn[50],
        dark: Hn[400],
      }
    : {
        main: Hn[700],
        light: Hn[400],
        dark: Hn[800],
      };
}
function Um(e = 'light') {
  return e === 'dark'
    ? {
        main: Wn[200],
        light: Wn[50],
        dark: Wn[400],
      }
    : {
        main: Wn[500],
        light: Wn[300],
        dark: Wn[700],
      };
}
function Wm(e = 'light') {
  return e === 'dark'
    ? {
        main: Un[500],
        light: Un[300],
        dark: Un[700],
      }
    : {
        main: Un[700],
        light: Un[400],
        dark: Un[800],
      };
}
function Hm(e = 'light') {
  return e === 'dark'
    ? {
        main: qn[400],
        light: qn[300],
        dark: qn[700],
      }
    : {
        main: qn[700],
        light: qn[500],
        dark: qn[900],
      };
}
function qm(e = 'light') {
  return e === 'dark'
    ? {
        main: Yn[400],
        light: Yn[300],
        dark: Yn[700],
      }
    : {
        main: Yn[800],
        light: Yn[500],
        dark: Yn[900],
      };
}
function Ym(e = 'light') {
  return e === 'dark'
    ? {
        main: ho[400],
        light: ho[300],
        dark: ho[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: ho[500],
        dark: ho[900],
      };
}
function Gm(e) {
  const { mode: t = 'light', contrastThreshold: o = 3, tonalOffset: r = 0.2 } = e,
    i = ye(e, zm),
    a = e.primary || Vm(t),
    s = e.secondary || Um(t),
    l = e.error || Wm(t),
    c = e.info || Hm(t),
    u = e.success || qm(t),
    d = e.warning || Ym(t);
  function p(b) {
    const m = xs(b, li.text.primary) >= o ? li.text.primary : Es.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const k = xs(b, m);
      k < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${k}:1 for ${m} on ${b}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return m;
  }
  const h = ({
      color: b,
      name: m,
      mainShade: k = 500,
      lightShade: T = 300,
      darkShade: C = 700,
    }) => {
      if (((b = g({}, b)), !b.main && b[k] && (b.main = b[k]), !b.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${m ? ` (${m})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.`
            : Tn(11, m ? ` (${m})` : '', k),
        );
      if (typeof b.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${m ? ` (${m})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(b.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : Tn(12, m ? ` (${m})` : '', JSON.stringify(b.main)),
        );
      return (
        Cs(b, 'light', T, r), Cs(b, 'dark', C, r), b.contrastText || (b.contrastText = p(b.main)), b
      );
    },
    v = {
      dark: li,
      light: Es,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (v[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    Ft(
      g(
        {
          // A collection of common colors.
          common: g({}, Io),
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
            color: d,
            name: 'warning',
          }),
          // The colors used to present information to the user that is neutral and not necessarily important.
          info: h({
            color: c,
            name: 'info',
          }),
          // The colors used to indicate the successful completion of an action that user triggered.
          success: h({
            color: u,
            name: 'success',
          }),
          // The grey colors.
          grey: hd,
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
        },
        v[t],
      ),
      i,
    )
  );
}
const Km = [
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
function Xm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Os = {
    textTransform: 'uppercase',
  },
  Ts = '"Roboto", "Helvetica", "Arial", sans-serif';
function Jm(e, t) {
  const o = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: r = Ts,
      // The default font size of the Material Specification.
      fontSize: i = 14,
      // px
      fontWeightLight: a = 300,
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
    h = ye(o, Km);
  process.env.NODE_ENV !== 'production' &&
    (typeof i != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof u != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const v = i / 14,
    x = p || ((k) => `${(k / u) * v}rem`),
    b = (k, T, C, E, f) =>
      g(
        {
          fontFamily: r,
          fontWeight: k,
          fontSize: x(T),
          // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
          lineHeight: C,
        },
        r === Ts
          ? {
              letterSpacing: `${Xm(E / T)}em`,
            }
          : {},
        f,
        d,
      ),
    m = {
      h1: b(a, 96, 1.167, -1.5),
      h2: b(a, 60, 1.2, -0.5),
      h3: b(s, 48, 1.167, 0),
      h4: b(s, 34, 1.235, 0.25),
      h5: b(s, 24, 1.334, 0),
      h6: b(l, 20, 1.6, 0.15),
      subtitle1: b(s, 16, 1.75, 0.15),
      subtitle2: b(l, 14, 1.57, 0.1),
      body1: b(s, 16, 1.5, 0.15),
      body2: b(s, 14, 1.43, 0.15),
      button: b(l, 14, 1.75, 0.4, Os),
      caption: b(s, 12, 1.66, 0.4),
      overline: b(s, 12, 2.66, 1, Os),
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
        pxToRem: x,
        fontFamily: r,
        fontSize: i,
        fontWeightLight: a,
        fontWeightRegular: s,
        fontWeightMedium: l,
        fontWeightBold: c,
      },
      m,
    ),
    h,
    {
      clone: !1,
      // No need to clone deep
    },
  );
}
const Zm = 0.2,
  Qm = 0.14,
  eh = 0.12;
function rt(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Zm})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Qm})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${eh})`,
  ].join(',');
}
const th = [
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
  nh = th,
  oh = ['duration', 'easing', 'delay'],
  rh = {
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
  ih = {
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
function ks(e) {
  return `${Math.round(e)}ms`;
}
function ah(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function sh(e) {
  const t = g({}, rh, e.easing),
    o = g({}, ih, e.duration);
  return g(
    {
      getAutoHeightDuration: ah,
      create: (i = ['all'], a = {}) => {
        const { duration: s = o.standard, easing: l = t.easeInOut, delay: c = 0 } = a,
          u = ye(a, oh);
        if (process.env.NODE_ENV !== 'production') {
          const d = (h) => typeof h == 'string',
            p = (h) => !isNaN(parseFloat(h));
          !d(i) &&
            !Array.isArray(i) &&
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
        return (Array.isArray(i) ? i : [i])
          .map(
            (d) =>
              `${d} ${typeof s == 'string' ? s : ks(s)} ${l} ${typeof c == 'string' ? c : ks(c)}`,
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
const lh = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  ch = lh,
  uh = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function dh(e = {}, ...t) {
  const { mixins: o = {}, palette: r = {}, transitions: i = {}, typography: a = {} } = e,
    s = ye(e, uh);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Tn(18),
    );
  const l = Gm(r),
    c = oa(e);
  let u = Ft(c, {
    mixins: Bm(c.breakpoints, o),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: nh.slice(),
    typography: Jm(l, a),
    transitions: sh(i),
    zIndex: g({}, ch),
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
      p = (h, v) => {
        let x;
        for (x in h) {
          const b = h[x];
          if (d.indexOf(x) !== -1 && Object.keys(b).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const m = $e('', x);
              console.error(
                [
                  `MUI: The \`${v}\` component increases the CSS specificity of the \`${x}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(h, null, 2),
                  '',
                  `Instead, you need to use the '&.${m}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${m}`]: b,
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
            h[x] = {};
          }
        }
      };
    Object.keys(u.components).forEach((h) => {
      const v = u.components[h].styleOverrides;
      v && h.indexOf('Mui') === 0 && p(v, h);
    });
  }
  return (
    (u.unstable_sxConfig = g({}, Fr, s == null ? void 0 : s.unstable_sxConfig)),
    (u.unstable_sx = function (p) {
      return na({
        sx: p,
        theme: this,
      });
    }),
    u
  );
}
const ph = dh(),
  Ur = ph;
function hn() {
  const e = pc(Ur);
  return process.env.NODE_ENV !== 'production' && y.useDebugValue(e), e;
}
function Ae({ props: e, name: t }) {
  return Dm({
    props: e,
    name: t,
    defaultTheme: Ur,
  });
}
const Ut = (e) => wo(e) && e !== 'classes',
  ia = wo,
  fh = Mm({
    defaultTheme: Ur,
    rootShouldForwardProp: Ut,
  }),
  ce = fh,
  mh = (e) => {
    let t;
    return e < 1 ? (t = 5.11916 * e ** 2) : (t = 4.5 * Math.log(e + 1) + 2), (t / 100).toFixed(2);
  },
  ws = mh;
function On(e) {
  return typeof e == 'string';
}
function hh(e, t, o) {
  return e === void 0 || On(e)
    ? t
    : g({}, t, {
        ownerState: g({}, t.ownerState, o),
      });
}
const bh = {
    disableDefaultClasses: !1,
  },
  gh = /* @__PURE__ */ y.createContext(bh);
function mc(e) {
  const { disableDefaultClasses: t } = y.useContext(gh);
  return (o) => (t ? '' : e(o));
}
function hc(e, t = []) {
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
function Si(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Ss(e) {
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
function vh(e) {
  const {
    getSlotProps: t,
    additionalProps: o,
    externalSlotProps: r,
    externalForwardedProps: i,
    className: a,
  } = e;
  if (!t) {
    const v = ve(
        i == null ? void 0 : i.className,
        r == null ? void 0 : r.className,
        a,
        o == null ? void 0 : o.className,
      ),
      x = g(
        {},
        o == null ? void 0 : o.style,
        i == null ? void 0 : i.style,
        r == null ? void 0 : r.style,
      ),
      b = g({}, o, i, r);
    return (
      v.length > 0 && (b.className = v),
      Object.keys(x).length > 0 && (b.style = x),
      {
        props: b,
        internalRef: void 0,
      }
    );
  }
  const s = hc(g({}, i, r)),
    l = Ss(r),
    c = Ss(i),
    u = t(s),
    d = ve(
      u == null ? void 0 : u.className,
      o == null ? void 0 : o.className,
      a,
      i == null ? void 0 : i.className,
      r == null ? void 0 : r.className,
    ),
    p = g(
      {},
      u == null ? void 0 : u.style,
      o == null ? void 0 : o.style,
      i == null ? void 0 : i.style,
      r == null ? void 0 : r.style,
    ),
    h = g({}, u, o, c, l);
  return (
    d.length > 0 && (h.className = d),
    Object.keys(p).length > 0 && (h.style = p),
    {
      props: h,
      internalRef: u.ref,
    }
  );
}
const yh = ['elementType', 'externalSlotProps', 'ownerState'];
function Lt(e) {
  var t;
  const { elementType: o, externalSlotProps: r, ownerState: i } = e,
    a = ye(e, yh),
    s = Si(r, i),
    { props: l, internalRef: c } = vh(
      g({}, a, {
        externalSlotProps: s,
      }),
    ),
    u = ut(c, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return hh(
    o,
    g({}, l, {
      ref: u,
    }),
    i,
  );
}
function Rs(e) {
  return e.substring(2).toLowerCase();
}
function xh(e, t) {
  return t.documentElement.clientWidth < e.clientX || t.documentElement.clientHeight < e.clientY;
}
function hr(e) {
  const {
      children: t,
      disableReactTree: o = !1,
      mouseEvent: r = 'onClick',
      onClickAway: i,
      touchEvent: a = 'onTouchEnd',
    } = e,
    s = y.useRef(!1),
    l = y.useRef(null),
    c = y.useRef(!1),
    u = y.useRef(!1);
  y.useEffect(
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
  const d = ut(
      // @ts-expect-error TODO upstream fix
      t.ref,
      l,
    ),
    p = Ct((x) => {
      const b = u.current;
      u.current = !1;
      const m = ct(l.current);
      if (!c.current || !l.current || ('clientX' in x && xh(x, m))) return;
      if (s.current) {
        s.current = !1;
        return;
      }
      let k;
      x.composedPath
        ? (k = x.composedPath().indexOf(l.current) > -1)
        : (k =
            !m.documentElement.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              x.target,
            ) ||
            l.current.contains(
              // @ts-expect-error returns `false` as intended when not dispatched from a Node
              x.target,
            )),
        !k && (o || !b) && i(x);
    }),
    h = (x) => (b) => {
      u.current = !0;
      const m = t.props[x];
      m && m(b);
    },
    v = {
      ref: d,
    };
  return (
    a !== !1 && (v[a] = h(a)),
    y.useEffect(() => {
      if (a !== !1) {
        const x = Rs(a),
          b = ct(l.current),
          m = () => {
            s.current = !0;
          };
        return (
          b.addEventListener(x, p),
          b.addEventListener('touchmove', m),
          () => {
            b.removeEventListener(x, p), b.removeEventListener('touchmove', m);
          }
        );
      }
    }, [p, a]),
    r !== !1 && (v[r] = h(r)),
    y.useEffect(() => {
      if (r !== !1) {
        const x = Rs(r),
          b = ct(l.current);
        return (
          b.addEventListener(x, p),
          () => {
            b.removeEventListener(x, p);
          }
        );
      }
    }, [p, r]),
    /* @__PURE__ */ _(y.Fragment, {
      children: /* @__PURE__ */ y.cloneElement(t, v),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (hr.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * The wrapped element.
     */
    children: jn.isRequired,
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
process.env.NODE_ENV !== 'production' && (hr['propTypes'] = Vi(hr.propTypes));
const Eh = [
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
function Ch(e) {
  const t = parseInt(e.getAttribute('tabindex') || '', 10);
  return Number.isNaN(t)
    ? e.contentEditable === 'true' ||
      ((e.nodeName === 'AUDIO' || e.nodeName === 'VIDEO' || e.nodeName === 'DETAILS') &&
        e.getAttribute('tabindex') === null)
      ? 0
      : e.tabIndex
    : t;
}
function Oh(e) {
  if (e.tagName !== 'INPUT' || e.type !== 'radio' || !e.name) return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function Th(e) {
  return !(e.disabled || (e.tagName === 'INPUT' && e.type === 'hidden') || Oh(e));
}
function kh(e) {
  const t = [],
    o = [];
  return (
    Array.from(e.querySelectorAll(Eh)).forEach((r, i) => {
      const a = Ch(r);
      a === -1 ||
        !Th(r) ||
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
function wh() {
  return !0;
}
function br(e) {
  const {
      children: t,
      disableAutoFocus: o = !1,
      disableEnforceFocus: r = !1,
      disableRestoreFocus: i = !1,
      getTabbable: a = kh,
      isEnabled: s = wh,
      open: l,
    } = e,
    c = y.useRef(!1),
    u = y.useRef(null),
    d = y.useRef(null),
    p = y.useRef(null),
    h = y.useRef(null),
    v = y.useRef(!1),
    x = y.useRef(null),
    b = ut(t.ref, x),
    m = y.useRef(null);
  y.useEffect(() => {
    !l || !x.current || (v.current = !o);
  }, [o, l]),
    y.useEffect(() => {
      if (!l || !x.current) return;
      const C = ct(x.current);
      return (
        x.current.contains(C.activeElement) ||
          (x.current.hasAttribute('tabIndex') ||
            (process.env.NODE_ENV !== 'production' &&
              console.error(
                [
                  'MUI: The modal content node does not accept focus.',
                  'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".',
                ].join(`
`),
              ),
            x.current.setAttribute('tabIndex', '-1')),
          v.current && x.current.focus()),
        () => {
          i ||
            (p.current && p.current.focus && ((c.current = !0), p.current.focus()),
            (p.current = null));
        }
      );
    }, [l]),
    y.useEffect(() => {
      if (!l || !x.current) return;
      const C = ct(x.current),
        E = (w) => {
          const { current: j } = x;
          if (j !== null) {
            if (!C.hasFocus() || r || !s() || c.current) {
              c.current = !1;
              return;
            }
            if (!j.contains(C.activeElement)) {
              if ((w && h.current !== w.target) || C.activeElement !== h.current) h.current = null;
              else if (h.current !== null) return;
              if (!v.current) return;
              let I = [];
              if (
                ((C.activeElement === u.current || C.activeElement === d.current) &&
                  (I = a(x.current)),
                I.length > 0)
              ) {
                var L, D;
                const q = !!(
                    (L = m.current) != null &&
                    L.shiftKey &&
                    ((D = m.current) == null ? void 0 : D.key) === 'Tab'
                  ),
                  V = I[0],
                  A = I[I.length - 1];
                typeof V != 'string' && typeof A != 'string' && (q ? A.focus() : V.focus());
              } else j.focus();
            }
          }
        },
        f = (w) => {
          (m.current = w),
            !(r || !s() || w.key !== 'Tab') &&
              C.activeElement === x.current &&
              w.shiftKey &&
              ((c.current = !0), d.current && d.current.focus());
        };
      C.addEventListener('focusin', E), C.addEventListener('keydown', f, !0);
      const S = setInterval(() => {
        C.activeElement && C.activeElement.tagName === 'BODY' && E(null);
      }, 50);
      return () => {
        clearInterval(S),
          C.removeEventListener('focusin', E),
          C.removeEventListener('keydown', f, !0);
      };
    }, [o, r, i, s, l, a]);
  const k = (C) => {
      p.current === null && (p.current = C.relatedTarget), (v.current = !0), (h.current = C.target);
      const E = t.props.onFocus;
      E && E(C);
    },
    T = (C) => {
      p.current === null && (p.current = C.relatedTarget), (v.current = !0);
    };
  return /* @__PURE__ */ Ze(y.Fragment, {
    children: [
      /* @__PURE__ */ _('div', {
        tabIndex: l ? 0 : -1,
        onFocus: T,
        ref: u,
        'data-testid': 'sentinelStart',
      }),
      /* @__PURE__ */ y.cloneElement(t, {
        ref: b,
        onFocus: k,
      }),
      /* @__PURE__ */ _('div', {
        tabIndex: l ? 0 : -1,
        onFocus: T,
        ref: d,
        'data-testid': 'sentinelEnd',
      }),
    ],
  });
}
process.env.NODE_ENV !== 'production' &&
  (br.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: jn,
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
process.env.NODE_ENV !== 'production' && (br['propTypes'] = Vi(br.propTypes));
var wt = 'top',
  zt = 'bottom',
  Vt = 'right',
  St = 'left',
  Wr = 'auto',
  Wo = [wt, zt, Vt, St],
  ro = 'start',
  Do = 'end',
  Sh = 'clippingParents',
  bc = 'viewport',
  vo = 'popper',
  Rh = 'reference',
  Ns = /* @__PURE__ */ Wo.reduce(function (e, t) {
    return e.concat([t + '-' + ro, t + '-' + Do]);
  }, []),
  gc = /* @__PURE__ */ [].concat(Wo, [Wr]).reduce(function (e, t) {
    return e.concat([t, t + '-' + ro, t + '-' + Do]);
  }, []),
  Nh = 'beforeRead',
  $h = 'read',
  Ph = 'afterRead',
  Ih = 'beforeMain',
  _h = 'main',
  Mh = 'afterMain',
  Ah = 'beforeWrite',
  Dh = 'write',
  Lh = 'afterWrite',
  Ri = [Nh, $h, Ph, Ih, _h, Mh, Ah, Dh, Lh];
function sn(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function Wt(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function Ln(e) {
  var t = Wt(e).Element;
  return e instanceof t || e instanceof Element;
}
function Mt(e) {
  var t = Wt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function aa(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Wt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function jh(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (o) {
    var r = t.styles[o] || {},
      i = t.attributes[o] || {},
      a = t.elements[o];
    !Mt(a) ||
      !sn(a) ||
      (Object.assign(a.style, r),
      Object.keys(i).forEach(function (s) {
        var l = i[s];
        l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? '' : l);
      }));
  });
}
function Fh(e) {
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
          l = s.reduce(function (c, u) {
            return (c[u] = ''), c;
          }, {});
        !Mt(i) ||
          !sn(i) ||
          (Object.assign(i.style, l),
          Object.keys(a).forEach(function (c) {
            i.removeAttribute(c);
          }));
      });
    }
  );
}
const Bh = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: jh,
  effect: Fh,
  requires: ['computeStyles'],
};
function Xt(e) {
  return e.split('-')[0];
}
var An = Math.max,
  gr = Math.min,
  io = Math.round;
function Ni() {
  var e = navigator.userAgentData;
  return e != null && e.brands
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function vc() {
  return !/^((?!chrome|android).)*safari/i.test(Ni());
}
function ao(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    Mt(e) &&
    ((i = (e.offsetWidth > 0 && io(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && io(r.height) / e.offsetHeight) || 1));
  var s = Ln(e) ? Wt(e) : window,
    l = s.visualViewport,
    c = !vc() && o,
    u = (r.left + (c && l ? l.offsetLeft : 0)) / i,
    d = (r.top + (c && l ? l.offsetTop : 0)) / a,
    p = r.width / i,
    h = r.height / a;
  return {
    width: p,
    height: h,
    top: d,
    right: u + p,
    bottom: d + h,
    left: u,
    x: u,
    y: d,
  };
}
function sa(e) {
  var t = ao(e),
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
function yc(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && aa(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Zt(e) {
  return Wt(e).getComputedStyle(e);
}
function zh(e) {
  return ['table', 'td', 'th'].indexOf(sn(e)) >= 0;
}
function wn(e) {
  return (
    (Ln(e)
      ? e.ownerDocument
      : // $FlowFixMe[prop-missing]
        e.document) || window.document
  ).documentElement;
}
function Hr(e) {
  return sn(e) === 'html'
    ? e
    : // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        e.parentNode || // DOM Element detected
        (aa(e) ? e.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        wn(e);
}
function $s(e) {
  return !Mt(e) || // https://github.com/popperjs/popper-core/issues/837
    Zt(e).position === 'fixed'
    ? null
    : e.offsetParent;
}
function Vh(e) {
  var t = /firefox/i.test(Ni()),
    o = /Trident/i.test(Ni());
  if (o && Mt(e)) {
    var r = Zt(e);
    if (r.position === 'fixed') return null;
  }
  var i = Hr(e);
  for (aa(i) && (i = i.host); Mt(i) && ['html', 'body'].indexOf(sn(i)) < 0; ) {
    var a = Zt(i);
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
function Ho(e) {
  for (var t = Wt(e), o = $s(e); o && zh(o) && Zt(o).position === 'static'; ) o = $s(o);
  return o && (sn(o) === 'html' || (sn(o) === 'body' && Zt(o).position === 'static'))
    ? t
    : o || Vh(e) || t;
}
function la(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function So(e, t, o) {
  return An(e, gr(t, o));
}
function Uh(e, t, o) {
  var r = So(e, t, o);
  return r > o ? o : r;
}
function xc() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function Ec(e) {
  return Object.assign({}, xc(), e);
}
function Cc(e, t) {
  return t.reduce(function (o, r) {
    return (o[r] = e), o;
  }, {});
}
var Wh = function (t, o) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, o.rects, {
              placement: o.placement,
            }),
          )
        : t),
    Ec(typeof t != 'number' ? t : Cc(t, Wo))
  );
};
function Hh(e) {
  var t,
    o = e.state,
    r = e.name,
    i = e.options,
    a = o.elements.arrow,
    s = o.modifiersData.popperOffsets,
    l = Xt(o.placement),
    c = la(l),
    u = [St, Vt].indexOf(l) >= 0,
    d = u ? 'height' : 'width';
  if (!(!a || !s)) {
    var p = Wh(i.padding, o),
      h = sa(a),
      v = c === 'y' ? wt : St,
      x = c === 'y' ? zt : Vt,
      b = o.rects.reference[d] + o.rects.reference[c] - s[c] - o.rects.popper[d],
      m = s[c] - o.rects.reference[c],
      k = Ho(a),
      T = k ? (c === 'y' ? k.clientHeight || 0 : k.clientWidth || 0) : 0,
      C = b / 2 - m / 2,
      E = p[v],
      f = T - h[d] - p[x],
      S = T / 2 - h[d] / 2 + C,
      w = So(E, S, f),
      j = c;
    o.modifiersData[r] = ((t = {}), (t[j] = w), (t.centerOffset = w - S), t);
  }
}
function qh(e) {
  var t = e.state,
    o = e.options,
    r = o.element,
    i = r === void 0 ? '[data-popper-arrow]' : r;
  if (i != null && !(typeof i == 'string' && ((i = t.elements.popper.querySelector(i)), !i))) {
    if (
      (process.env.NODE_ENV !== 'production' &&
        (Mt(i) ||
          console.error(
            [
              'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
              'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
              'the arrow.',
            ].join(' '),
          )),
      !yc(t.elements.popper, i))
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
const Yh = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: Hh,
  effect: qh,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function so(e) {
  return e.split('-')[1];
}
var Gh = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function Kh(e) {
  var t = e.x,
    o = e.y,
    r = window,
    i = r.devicePixelRatio || 1;
  return {
    x: io(t * i) / i || 0,
    y: io(o * i) / i || 0,
  };
}
function Ps(e) {
  var t,
    o = e.popper,
    r = e.popperRect,
    i = e.placement,
    a = e.variation,
    s = e.offsets,
    l = e.position,
    c = e.gpuAcceleration,
    u = e.adaptive,
    d = e.roundOffsets,
    p = e.isFixed,
    h = s.x,
    v = h === void 0 ? 0 : h,
    x = s.y,
    b = x === void 0 ? 0 : x,
    m =
      typeof d == 'function'
        ? d({
            x: v,
            y: b,
          })
        : {
            x: v,
            y: b,
          };
  (v = m.x), (b = m.y);
  var k = s.hasOwnProperty('x'),
    T = s.hasOwnProperty('y'),
    C = St,
    E = wt,
    f = window;
  if (u) {
    var S = Ho(o),
      w = 'clientHeight',
      j = 'clientWidth';
    if (
      (S === Wt(o) &&
        ((S = wn(o)),
        Zt(S).position !== 'static' &&
          l === 'absolute' &&
          ((w = 'scrollHeight'), (j = 'scrollWidth'))),
      (S = S),
      i === wt || ((i === St || i === Vt) && a === Do))
    ) {
      E = zt;
      var L =
        p && S === f && f.visualViewport
          ? f.visualViewport.height
          : // $FlowFixMe[prop-missing]
            S[w];
      (b -= L - r.height), (b *= c ? 1 : -1);
    }
    if (i === St || ((i === wt || i === zt) && a === Do)) {
      C = Vt;
      var D =
        p && S === f && f.visualViewport
          ? f.visualViewport.width
          : // $FlowFixMe[prop-missing]
            S[j];
      (v -= D - r.width), (v *= c ? 1 : -1);
    }
  }
  var I = Object.assign(
      {
        position: l,
      },
      u && Gh,
    ),
    q =
      d === !0
        ? Kh({
            x: v,
            y: b,
          })
        : {
            x: v,
            y: b,
          };
  if (((v = q.x), (b = q.y), c)) {
    var V;
    return Object.assign(
      {},
      I,
      ((V = {}),
      (V[E] = T ? '0' : ''),
      (V[C] = k ? '0' : ''),
      (V.transform =
        (f.devicePixelRatio || 1) <= 1
          ? 'translate(' + v + 'px, ' + b + 'px)'
          : 'translate3d(' + v + 'px, ' + b + 'px, 0)'),
      V),
    );
  }
  return Object.assign(
    {},
    I,
    ((t = {}), (t[E] = T ? b + 'px' : ''), (t[C] = k ? v + 'px' : ''), (t.transform = ''), t),
  );
}
function Xh(e) {
  var t = e.state,
    o = e.options,
    r = o.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    a = o.adaptive,
    s = a === void 0 ? !0 : a,
    l = o.roundOffsets,
    c = l === void 0 ? !0 : l;
  if (process.env.NODE_ENV !== 'production') {
    var u = Zt(t.elements.popper).transitionProperty || '';
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
    placement: Xt(t.placement),
    variation: so(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === 'fixed',
  };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Ps(
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
        Ps(
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
const Jh = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: Xh,
  data: {},
};
var Ko = {
  passive: !0,
};
function Zh(e) {
  var t = e.state,
    o = e.instance,
    r = e.options,
    i = r.scroll,
    a = i === void 0 ? !0 : i,
    s = r.resize,
    l = s === void 0 ? !0 : s,
    c = Wt(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      u.forEach(function (d) {
        d.addEventListener('scroll', o.update, Ko);
      }),
    l && c.addEventListener('resize', o.update, Ko),
    function () {
      a &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', o.update, Ko);
        }),
        l && c.removeEventListener('resize', o.update, Ko);
    }
  );
}
const Qh = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: Zh,
  data: {},
};
var eb = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function cr(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return eb[t];
  });
}
var tb = {
  start: 'end',
  end: 'start',
};
function Is(e) {
  return e.replace(/start|end/g, function (t) {
    return tb[t];
  });
}
function ca(e) {
  var t = Wt(e),
    o = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r,
  };
}
function ua(e) {
  return ao(wn(e)).left + ca(e).scrollLeft;
}
function nb(e, t) {
  var o = Wt(e),
    r = wn(e),
    i = o.visualViewport,
    a = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    c = 0;
  if (i) {
    (a = i.width), (s = i.height);
    var u = vc();
    (u || (!u && t === 'fixed')) && ((l = i.offsetLeft), (c = i.offsetTop));
  }
  return {
    width: a,
    height: s,
    x: l + ua(e),
    y: c,
  };
}
function ob(e) {
  var t,
    o = wn(e),
    r = ca(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = An(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
    s = An(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
    l = -r.scrollLeft + ua(e),
    c = -r.scrollTop;
  return (
    Zt(i || o).direction === 'rtl' && (l += An(o.clientWidth, i ? i.clientWidth : 0) - a),
    {
      width: a,
      height: s,
      x: l,
      y: c,
    }
  );
}
function da(e) {
  var t = Zt(e),
    o = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function Oc(e) {
  return ['html', 'body', '#document'].indexOf(sn(e)) >= 0
    ? e.ownerDocument.body
    : Mt(e) && da(e)
    ? e
    : Oc(Hr(e));
}
function Ro(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = Oc(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    a = Wt(r),
    s = i ? [a].concat(a.visualViewport || [], da(r) ? r : []) : r,
    l = t.concat(s);
  return i
    ? l
    : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      l.concat(Ro(Hr(s)));
}
function $i(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function rb(e, t) {
  var o = ao(e, !1, t === 'fixed');
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
function _s(e, t, o) {
  return t === bc ? $i(nb(e, o)) : Ln(t) ? rb(t, o) : $i(ob(wn(e)));
}
function ib(e) {
  var t = Ro(Hr(e)),
    o = ['absolute', 'fixed'].indexOf(Zt(e).position) >= 0,
    r = o && Mt(e) ? Ho(e) : e;
  return Ln(r)
    ? t.filter(function (i) {
        return Ln(i) && yc(i, r) && sn(i) !== 'body';
      })
    : [];
}
function ab(e, t, o, r) {
  var i = t === 'clippingParents' ? ib(e) : [].concat(t),
    a = [].concat(i, [o]),
    s = a[0],
    l = a.reduce(function (c, u) {
      var d = _s(e, u, r);
      return (
        (c.top = An(d.top, c.top)),
        (c.right = gr(d.right, c.right)),
        (c.bottom = gr(d.bottom, c.bottom)),
        (c.left = An(d.left, c.left)),
        c
      );
    }, _s(e, s, r));
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  );
}
function Tc(e) {
  var t = e.reference,
    o = e.element,
    r = e.placement,
    i = r ? Xt(r) : null,
    a = r ? so(r) : null,
    s = t.x + t.width / 2 - o.width / 2,
    l = t.y + t.height / 2 - o.height / 2,
    c;
  switch (i) {
    case wt:
      c = {
        x: s,
        y: t.y - o.height,
      };
      break;
    case zt:
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
    case St:
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
  var u = i ? la(i) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (a) {
      case ro:
        c[u] = c[u] - (t[d] / 2 - o[d] / 2);
        break;
      case Do:
        c[u] = c[u] + (t[d] / 2 - o[d] / 2);
        break;
    }
  }
  return c;
}
function Lo(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = r === void 0 ? e.placement : r,
    a = o.strategy,
    s = a === void 0 ? e.strategy : a,
    l = o.boundary,
    c = l === void 0 ? Sh : l,
    u = o.rootBoundary,
    d = u === void 0 ? bc : u,
    p = o.elementContext,
    h = p === void 0 ? vo : p,
    v = o.altBoundary,
    x = v === void 0 ? !1 : v,
    b = o.padding,
    m = b === void 0 ? 0 : b,
    k = Ec(typeof m != 'number' ? m : Cc(m, Wo)),
    T = h === vo ? Rh : vo,
    C = e.rects.popper,
    E = e.elements[x ? T : h],
    f = ab(Ln(E) ? E : E.contextElement || wn(e.elements.popper), c, d, s),
    S = ao(e.elements.reference),
    w = Tc({
      reference: S,
      element: C,
      strategy: 'absolute',
      placement: i,
    }),
    j = $i(Object.assign({}, C, w)),
    L = h === vo ? j : S,
    D = {
      top: f.top - L.top + k.top,
      bottom: L.bottom - f.bottom + k.bottom,
      left: f.left - L.left + k.left,
      right: L.right - f.right + k.right,
    },
    I = e.modifiersData.offset;
  if (h === vo && I) {
    var q = I[i];
    Object.keys(D).forEach(function (V) {
      var A = [Vt, zt].indexOf(V) >= 0 ? 1 : -1,
        F = [wt, zt].indexOf(V) >= 0 ? 'y' : 'x';
      D[V] += q[F] * A;
    });
  }
  return D;
}
function sb(e, t) {
  t === void 0 && (t = {});
  var o = t,
    r = o.placement,
    i = o.boundary,
    a = o.rootBoundary,
    s = o.padding,
    l = o.flipVariations,
    c = o.allowedAutoPlacements,
    u = c === void 0 ? gc : c,
    d = so(r),
    p = d
      ? l
        ? Ns
        : Ns.filter(function (x) {
            return so(x) === d;
          })
      : Wo,
    h = p.filter(function (x) {
      return u.indexOf(x) >= 0;
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
  var v = h.reduce(function (x, b) {
    return (
      (x[b] = Lo(e, {
        placement: b,
        boundary: i,
        rootBoundary: a,
        padding: s,
      })[Xt(b)]),
      x
    );
  }, {});
  return Object.keys(v).sort(function (x, b) {
    return v[x] - v[b];
  });
}
function lb(e) {
  if (Xt(e) === Wr) return [];
  var t = cr(e);
  return [Is(e), t, Is(t)];
}
function cb(e) {
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
        u = o.padding,
        d = o.boundary,
        p = o.rootBoundary,
        h = o.altBoundary,
        v = o.flipVariations,
        x = v === void 0 ? !0 : v,
        b = o.allowedAutoPlacements,
        m = t.options.placement,
        k = Xt(m),
        T = k === m,
        C = c || (T || !x ? [cr(m)] : lb(m)),
        E = [m].concat(C).reduce(function (H, re) {
          return H.concat(
            Xt(re) === Wr
              ? sb(t, {
                  placement: re,
                  boundary: d,
                  rootBoundary: p,
                  padding: u,
                  flipVariations: x,
                  allowedAutoPlacements: b,
                })
              : re,
          );
        }, []),
        f = t.rects.reference,
        S = t.rects.popper,
        w = /* @__PURE__ */ new Map(),
        j = !0,
        L = E[0],
        D = 0;
      D < E.length;
      D++
    ) {
      var I = E[D],
        q = Xt(I),
        V = so(I) === ro,
        A = [wt, zt].indexOf(q) >= 0,
        F = A ? 'width' : 'height',
        B = Lo(t, {
          placement: I,
          boundary: d,
          rootBoundary: p,
          altBoundary: h,
          padding: u,
        }),
        te = A ? (V ? Vt : St) : V ? zt : wt;
      f[F] > S[F] && (te = cr(te));
      var U = cr(te),
        W = [];
      if (
        (a && W.push(B[q] <= 0),
        l && W.push(B[te] <= 0, B[U] <= 0),
        W.every(function (H) {
          return H;
        }))
      ) {
        (L = I), (j = !1);
        break;
      }
      w.set(I, W);
    }
    if (j)
      for (
        var R = x ? 3 : 1,
          z = function (re) {
            var ie = E.find(function (Q) {
              var se = w.get(Q);
              if (se)
                return se.slice(0, re).every(function (le) {
                  return le;
                });
            });
            if (ie) return (L = ie), 'break';
          },
          Z = R;
        Z > 0;
        Z--
      ) {
        var G = z(Z);
        if (G === 'break') break;
      }
    t.placement !== L && ((t.modifiersData[r]._skip = !0), (t.placement = L), (t.reset = !0));
  }
}
const ub = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: cb,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function Ms(e, t, o) {
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
function As(e) {
  return [wt, Vt, zt, St].some(function (t) {
    return e[t] >= 0;
  });
}
function db(e) {
  var t = e.state,
    o = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = Lo(t, {
      elementContext: 'reference',
    }),
    l = Lo(t, {
      altBoundary: !0,
    }),
    c = Ms(s, r),
    u = Ms(l, i, a),
    d = As(c),
    p = As(u);
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
const pb = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: db,
};
function fb(e, t, o) {
  var r = Xt(e),
    i = [St, wt].indexOf(r) >= 0 ? -1 : 1,
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
    [St, Vt].indexOf(r) >= 0
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
function mb(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.offset,
    a = i === void 0 ? [0, 0] : i,
    s = gc.reduce(function (d, p) {
      return (d[p] = fb(p, t.rects, a)), d;
    }, {}),
    l = s[t.placement],
    c = l.x,
    u = l.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = s);
}
const hb = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: mb,
};
function bb(e) {
  var t = e.state,
    o = e.name;
  t.modifiersData[o] = Tc({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const gb = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: bb,
  data: {},
};
function vb(e) {
  return e === 'x' ? 'y' : 'x';
}
function yb(e) {
  var t = e.state,
    o = e.options,
    r = e.name,
    i = o.mainAxis,
    a = i === void 0 ? !0 : i,
    s = o.altAxis,
    l = s === void 0 ? !1 : s,
    c = o.boundary,
    u = o.rootBoundary,
    d = o.altBoundary,
    p = o.padding,
    h = o.tether,
    v = h === void 0 ? !0 : h,
    x = o.tetherOffset,
    b = x === void 0 ? 0 : x,
    m = Lo(t, {
      boundary: c,
      rootBoundary: u,
      padding: p,
      altBoundary: d,
    }),
    k = Xt(t.placement),
    T = so(t.placement),
    C = !T,
    E = la(k),
    f = vb(E),
    S = t.modifiersData.popperOffsets,
    w = t.rects.reference,
    j = t.rects.popper,
    L =
      typeof b == 'function'
        ? b(
            Object.assign({}, t.rects, {
              placement: t.placement,
            }),
          )
        : b,
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
    I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    q = {
      x: 0,
      y: 0,
    };
  if (S) {
    if (a) {
      var V,
        A = E === 'y' ? wt : St,
        F = E === 'y' ? zt : Vt,
        B = E === 'y' ? 'height' : 'width',
        te = S[E],
        U = te + m[A],
        W = te - m[F],
        R = v ? -j[B] / 2 : 0,
        z = T === ro ? w[B] : j[B],
        Z = T === ro ? -j[B] : -w[B],
        G = t.elements.arrow,
        H =
          v && G
            ? sa(G)
            : {
                width: 0,
                height: 0,
              },
        re = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : xc(),
        ie = re[A],
        Q = re[F],
        se = So(0, w[B], H[B]),
        le = C ? w[B] / 2 - R - se - ie - D.mainAxis : z - se - ie - D.mainAxis,
        he = C ? -w[B] / 2 + R + se + Q + D.mainAxis : Z + se + Q + D.mainAxis,
        ae = t.elements.arrow && Ho(t.elements.arrow),
        P = ae ? (E === 'y' ? ae.clientTop || 0 : ae.clientLeft || 0) : 0,
        Oe = (V = I == null ? void 0 : I[E]) != null ? V : 0,
        M = te + le - Oe - P,
        Y = te + he - Oe,
        Pe = So(v ? gr(U, M) : U, te, v ? An(W, Y) : W);
      (S[E] = Pe), (q[E] = Pe - te);
    }
    if (l) {
      var ge,
        et = E === 'x' ? wt : St,
        Be = E === 'x' ? zt : Vt,
        ke = S[f],
        Re = f === 'y' ? 'height' : 'width',
        tt = ke + m[et],
        it = ke - m[Be],
        ee = [wt, St].indexOf(k) !== -1,
        me = (ge = I == null ? void 0 : I[f]) != null ? ge : 0,
        xe = ee ? tt : ke - w[Re] - j[Re] - me + D.altAxis,
        be = ee ? ke + w[Re] + j[Re] - me - D.altAxis : it,
        fe = v && ee ? Uh(xe, ke, be) : So(v ? xe : tt, ke, v ? be : it);
      (S[f] = fe), (q[f] = fe - ke);
    }
    t.modifiersData[r] = q;
  }
}
const xb = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: yb,
  requiresIfExists: ['offset'],
};
function Eb(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function Cb(e) {
  return e === Wt(e) || !Mt(e) ? ca(e) : Eb(e);
}
function Ob(e) {
  var t = e.getBoundingClientRect(),
    o = io(t.width) / e.offsetWidth || 1,
    r = io(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function Tb(e, t, o) {
  o === void 0 && (o = !1);
  var r = Mt(t),
    i = Mt(t) && Ob(t),
    a = wn(t),
    s = ao(e, i, o),
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
        da(a)) &&
        (l = Cb(t)),
      Mt(t) ? ((c = ao(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : a && (c.x = ua(a))),
    {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function kb(e) {
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
function wb(e) {
  var t = kb(e);
  return Ri.reduce(function (o, r) {
    return o.concat(
      t.filter(function (i) {
        return i.phase === r;
      }),
    );
  }, []);
}
function Sb(e) {
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
function yn(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  return [].concat(o).reduce(function (i, a) {
    return i.replace(/%s/, a);
  }, e);
}
var Rn = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
  Rb = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
  Ds = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function Nb(e) {
  e.forEach(function (t) {
    []
      .concat(Object.keys(t), Ds)
      .filter(function (o, r, i) {
        return i.indexOf(o) === r;
      })
      .forEach(function (o) {
        switch (o) {
          case 'name':
            typeof t.name != 'string' &&
              console.error(
                yn(Rn, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'),
              );
            break;
          case 'enabled':
            typeof t.enabled != 'boolean' &&
              console.error(
                yn(Rn, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'),
              );
            break;
          case 'phase':
            Ri.indexOf(t.phase) < 0 &&
              console.error(
                yn(Rn, t.name, '"phase"', 'either ' + Ri.join(', '), '"' + String(t.phase) + '"'),
              );
            break;
          case 'fn':
            typeof t.fn != 'function' &&
              console.error(yn(Rn, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'effect':
            t.effect != null &&
              typeof t.effect != 'function' &&
              console.error(yn(Rn, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
            break;
          case 'requires':
            t.requires != null &&
              !Array.isArray(t.requires) &&
              console.error(
                yn(Rn, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'),
              );
            break;
          case 'requiresIfExists':
            Array.isArray(t.requiresIfExists) ||
              console.error(
                yn(
                  Rn,
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
                Ds.map(function (r) {
                  return '"' + r + '"';
                }).join(', ') +
                '; but "' +
                o +
                '" was provided.',
            );
        }
        t.requires &&
          t.requires.forEach(function (r) {
            e.find(function (i) {
              return i.name === r;
            }) == null && console.error(yn(Rb, String(t.name), r, r));
          });
      });
  });
}
function $b(e, t) {
  var o = /* @__PURE__ */ new Set();
  return e.filter(function (r) {
    var i = t(r);
    if (!o.has(i)) return o.add(i), !0;
  });
}
function Pb(e) {
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
var Ls =
    'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
  Ib =
    'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
  js = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute',
  };
function Fs() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function _b(e) {
  e === void 0 && (e = {});
  var t = e,
    o = t.defaultModifiers,
    r = o === void 0 ? [] : o,
    i = t.defaultOptions,
    a = i === void 0 ? js : i;
  return function (l, c, u) {
    u === void 0 && (u = a);
    var d = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, js, a),
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
      v = {
        state: d,
        setOptions: function (k) {
          var T = typeof k == 'function' ? k(d.options) : k;
          b(),
            (d.options = Object.assign({}, a, d.options, T)),
            (d.scrollParents = {
              reference: Ln(l) ? Ro(l) : l.contextElement ? Ro(l.contextElement) : [],
              popper: Ro(c),
            });
          var C = wb(Pb([].concat(r, d.options.modifiers)));
          if (
            ((d.orderedModifiers = C.filter(function (I) {
              return I.enabled;
            })),
            process.env.NODE_ENV !== 'production')
          ) {
            var E = $b([].concat(C, d.options.modifiers), function (I) {
              var q = I.name;
              return q;
            });
            if ((Nb(E), Xt(d.options.placement) === Wr)) {
              var f = d.orderedModifiers.find(function (I) {
                var q = I.name;
                return q === 'flip';
              });
              f ||
                console.error(
                  [
                    'Popper: "auto" placements require the "flip" modifier be',
                    'present and enabled to work.',
                  ].join(' '),
                );
            }
            var S = Zt(c),
              w = S.marginTop,
              j = S.marginRight,
              L = S.marginBottom,
              D = S.marginLeft;
            [w, j, L, D].some(function (I) {
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
          return x(), v.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function () {
          if (!h) {
            var k = d.elements,
              T = k.reference,
              C = k.popper;
            if (!Fs(T, C)) {
              process.env.NODE_ENV !== 'production' && console.error(Ls);
              return;
            }
            (d.rects = {
              reference: Tb(T, Ho(C), d.options.strategy === 'fixed'),
              popper: sa(C),
            }),
              (d.reset = !1),
              (d.placement = d.options.placement),
              d.orderedModifiers.forEach(function (I) {
                return (d.modifiersData[I.name] = Object.assign({}, I.data));
              });
            for (var E = 0, f = 0; f < d.orderedModifiers.length; f++) {
              if (process.env.NODE_ENV !== 'production' && ((E += 1), E > 100)) {
                console.error(Ib);
                break;
              }
              if (d.reset === !0) {
                (d.reset = !1), (f = -1);
                continue;
              }
              var S = d.orderedModifiers[f],
                w = S.fn,
                j = S.options,
                L = j === void 0 ? {} : j,
                D = S.name;
              typeof w == 'function' &&
                (d =
                  w({
                    state: d,
                    options: L,
                    name: D,
                    instance: v,
                  }) || d);
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: Sb(function () {
          return new Promise(function (m) {
            v.forceUpdate(), m(d);
          });
        }),
        destroy: function () {
          b(), (h = !0);
        },
      };
    if (!Fs(l, c)) return process.env.NODE_ENV !== 'production' && console.error(Ls), v;
    v.setOptions(u).then(function (m) {
      !h && u.onFirstUpdate && u.onFirstUpdate(m);
    });
    function x() {
      d.orderedModifiers.forEach(function (m) {
        var k = m.name,
          T = m.options,
          C = T === void 0 ? {} : T,
          E = m.effect;
        if (typeof E == 'function') {
          var f = E({
              state: d,
              name: k,
              instance: v,
              options: C,
            }),
            S = function () {};
          p.push(f || S);
        }
      });
    }
    function b() {
      p.forEach(function (m) {
        return m();
      }),
        (p = []);
    }
    return v;
  };
}
var Mb = [Qh, gb, Jh, Bh, hb, ub, xb, Yh, pb],
  Ab = /* @__PURE__ */ _b({
    defaultModifiers: Mb,
  });
function Db(e) {
  return typeof e == 'function' ? e() : e;
}
const vr = /* @__PURE__ */ y.forwardRef(function (t, o) {
  const { children: r, container: i, disablePortal: a = !1 } = t,
    [s, l] = y.useState(null),
    c = ut(/* @__PURE__ */ y.isValidElement(r) ? r.ref : null, o);
  if (
    (an(() => {
      a || l(Db(i) || document.body);
    }, [i, a]),
    an(() => {
      if (s && !a)
        return (
          dr(o, s),
          () => {
            dr(o, null);
          }
        );
    }, [o, s, a]),
    a)
  ) {
    if (/* @__PURE__ */ y.isValidElement(r)) {
      const u = {
        ref: c,
      };
      return /* @__PURE__ */ y.cloneElement(r, u);
    }
    return /* @__PURE__ */ _(y.Fragment, {
      children: r,
    });
  }
  return /* @__PURE__ */ _(y.Fragment, {
    children: s && /* @__PURE__ */ Il.createPortal(r, s),
  });
});
process.env.NODE_ENV !== 'production' &&
  (vr.propTypes = {
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
    container: n.oneOfType([Jt, n.func]),
    /**
     * The `children` will be under the DOM hierarchy of the parent component.
     * @default false
     */
    disablePortal: n.bool,
  });
process.env.NODE_ENV !== 'production' && (vr['propTypes'] = Vi(vr.propTypes));
const kc = vr;
function Lb(e) {
  return $e('MuiPopper', e);
}
Se('MuiPopper', ['root']);
const jb = [
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
  Fb = [
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
function Bb(e, t) {
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
function yr(e) {
  return typeof e == 'function' ? e() : e;
}
function qr(e) {
  return e.nodeType !== void 0;
}
function zb(e) {
  return !qr(e);
}
const Vb = () =>
    _e(
      {
        root: ['root'],
      },
      mc(Lb),
    ),
  Ub = {},
  Wb = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r;
    const {
        anchorEl: i,
        children: a,
        component: s,
        direction: l,
        disablePortal: c,
        modifiers: u,
        open: d,
        ownerState: p,
        placement: h,
        popperOptions: v,
        popperRef: x,
        slotProps: b = {},
        slots: m = {},
        TransitionProps: k,
      } = t,
      T = ye(t, jb),
      C = y.useRef(null),
      E = ut(C, o),
      f = y.useRef(null),
      S = ut(f, x),
      w = y.useRef(S);
    an(() => {
      w.current = S;
    }, [S]),
      y.useImperativeHandle(x, () => f.current, []);
    const j = Bb(h, l),
      [L, D] = y.useState(j),
      [I, q] = y.useState(yr(i));
    y.useEffect(() => {
      f.current && f.current.forceUpdate();
    }),
      y.useEffect(() => {
        i && q(yr(i));
      }, [i]),
      an(() => {
        if (!I || !d) return;
        const te = (R) => {
          D(R.placement);
        };
        if (process.env.NODE_ENV !== 'production' && I && qr(I) && I.nodeType === 1) {
          const R = I.getBoundingClientRect();
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
        let U = [
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
              te(R);
            },
          },
        ];
        u != null && (U = U.concat(u)), v && v.modifiers != null && (U = U.concat(v.modifiers));
        const W = Ab(
          I,
          C.current,
          g(
            {
              placement: j,
            },
            v,
            {
              modifiers: U,
            },
          ),
        );
        return (
          w.current(W),
          () => {
            W.destroy(), w.current(null);
          }
        );
      }, [I, c, u, d, v, j]);
    const V = {
      placement: L,
    };
    k !== null && (V.TransitionProps = k);
    const A = Vb(),
      F = (r = s ?? m.root) != null ? r : 'div',
      B = Lt({
        elementType: F,
        externalSlotProps: b.root,
        externalForwardedProps: T,
        additionalProps: {
          role: 'tooltip',
          ref: E,
        },
        ownerState: g({}, t, p),
        className: A.root,
      });
    return /* @__PURE__ */ _(
      F,
      g({}, B, {
        children: typeof a == 'function' ? a(V) : a,
      }),
    );
  }),
  wc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const {
        anchorEl: r,
        children: i,
        container: a,
        direction: s = 'ltr',
        disablePortal: l = !1,
        keepMounted: c = !1,
        modifiers: u,
        open: d,
        placement: p = 'bottom',
        popperOptions: h = Ub,
        popperRef: v,
        style: x,
        transition: b = !1,
        slotProps: m = {},
        slots: k = {},
      } = t,
      T = ye(t, Fb),
      [C, E] = y.useState(!0),
      f = () => {
        E(!1);
      },
      S = () => {
        E(!0);
      };
    if (!c && !d && (!b || C)) return null;
    let w;
    if (a) w = a;
    else if (r) {
      const D = yr(r);
      w = D && qr(D) ? ct(D).body : ct(null).body;
    }
    const j = !d && c && (!b || C) ? 'none' : void 0,
      L = b
        ? {
            in: d,
            onEnter: f,
            onExited: S,
          }
        : void 0;
    return /* @__PURE__ */ _(kc, {
      disablePortal: l,
      container: w,
      children: /* @__PURE__ */ _(
        Wb,
        g(
          {
            anchorEl: r,
            direction: s,
            disablePortal: l,
            modifiers: u,
            ref: o,
            open: b ? !C : d,
            placement: p,
            popperOptions: h,
            popperRef: v,
            slotProps: m,
            slots: k,
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
                display: j,
              },
              x,
            ),
            TransitionProps: L,
            children: i,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (wc.propTypes = {
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
    anchorEl: Bt(n.oneOfType([Jt, n.object, n.func]), (e) => {
      if (e.open) {
        const t = yr(e.anchorEl);
        if (t && qr(t) && t.nodeType === 1) {
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
          (zb(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
    container: n.oneOfType([Jt, n.func]),
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
const Hb = wc;
function qb(e) {
  const t = ct(e);
  return t.body === e
    ? mn(e).innerWidth > t.documentElement.clientWidth
    : e.scrollHeight > e.clientHeight;
}
function No(e, t) {
  t ? e.setAttribute('aria-hidden', 'true') : e.removeAttribute('aria-hidden');
}
function Bs(e) {
  return parseInt(mn(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Yb(e) {
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
function zs(e, t, o, r, i) {
  const a = [t, o, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1,
      c = !Yb(s);
    l && c && No(s, i);
  });
}
function ci(e, t) {
  let o = -1;
  return e.some((r, i) => (t(r) ? ((o = i), !0) : !1)), o;
}
function Gb(e, t) {
  const o = [],
    r = e.container;
  if (!t.disableScrollLock) {
    if (qb(r)) {
      const s = zl(ct(r));
      o.push({
        value: r.style.paddingRight,
        property: 'padding-right',
        el: r,
      }),
        (r.style.paddingRight = `${Bs(r) + s}px`);
      const l = ct(r).querySelectorAll('.mui-fixed');
      [].forEach.call(l, (c) => {
        o.push({
          value: c.style.paddingRight,
          property: 'padding-right',
          el: c,
        }),
          (c.style.paddingRight = `${Bs(c) + s}px`);
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment) a = ct(r).body;
    else {
      const s = r.parentElement,
        l = mn(r);
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
function Kb(e) {
  const t = [];
  return (
    [].forEach.call(e.children, (o) => {
      o.getAttribute('aria-hidden') === 'true' && t.push(o);
    }),
    t
  );
}
class Xb {
  constructor() {
    (this.containers = void 0), (this.modals = void 0), (this.modals = []), (this.containers = []);
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1) return r;
    (r = this.modals.length), this.modals.push(t), t.modalRef && No(t.modalRef, !1);
    const i = Kb(o);
    zs(o, t.mount, t.modalRef, i, !0);
    const a = ci(this.containers, (s) => s.container === o);
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
    const r = ci(this.containers, (a) => a.modals.indexOf(t) !== -1),
      i = this.containers[r];
    i.restore || (i.restore = Gb(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1) return r;
    const i = ci(this.containers, (s) => s.modals.indexOf(t) !== -1),
      a = this.containers[i];
    if ((a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0))
      a.restore && a.restore(),
        t.modalRef && No(t.modalRef, o),
        zs(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1),
        this.containers.splice(i, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && No(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Jb(e) {
  return $e('MuiModal', e);
}
Se('MuiModal', ['root', 'hidden', 'backdrop']);
const Zb = [
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
  Qb = (e) => {
    const { open: t, exited: o } = e;
    return _e(
      {
        root: ['root', !t && o && 'hidden'],
        backdrop: ['backdrop'],
      },
      mc(Jb),
    );
  };
function eg(e) {
  return typeof e == 'function' ? e() : e;
}
function tg(e) {
  return e ? e.props.hasOwnProperty('in') : !1;
}
const ng = new Xb(),
  Sc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i;
    const {
        children: a,
        closeAfterTransition: s = !1,
        component: l,
        container: c,
        disableAutoFocus: u = !1,
        disableEnforceFocus: d = !1,
        disableEscapeKeyDown: p = !1,
        disablePortal: h = !1,
        disableRestoreFocus: v = !1,
        disableScrollLock: x = !1,
        hideBackdrop: b = !1,
        keepMounted: m = !1,
        // private
        manager: k = ng,
        onBackdropClick: T,
        onClose: C,
        onKeyDown: E,
        open: f,
        onTransitionEnter: S,
        onTransitionExited: w,
        slotProps: j = {},
        slots: L = {},
      } = t,
      D = ye(t, Zb),
      [I, q] = y.useState(!f),
      V = y.useRef({}),
      A = y.useRef(null),
      F = y.useRef(null),
      B = ut(F, o),
      te = tg(a),
      U = (r = t['aria-hidden']) != null ? r : !0,
      W = () => ct(A.current),
      R = () => ((V.current.modalRef = F.current), (V.current.mountNode = A.current), V.current),
      z = () => {
        k.mount(R(), {
          disableScrollLock: x,
        }),
          F.current && (F.current.scrollTop = 0);
      },
      Z = Ct(() => {
        const ge = eg(c) || W().body;
        k.add(R(), ge), F.current && z();
      }),
      G = y.useCallback(() => k.isTopModal(R()), [k]),
      H = Ct((ge) => {
        (A.current = ge), !(!ge || !F.current) && (f && G() ? z() : No(F.current, U));
      }),
      re = y.useCallback(() => {
        k.remove(R(), U);
      }, [k, U]);
    y.useEffect(
      () => () => {
        re();
      },
      [re],
    ),
      y.useEffect(() => {
        f ? Z() : (!te || !s) && re();
      }, [f, re, te, s, Z]);
    const ie = g({}, t, {
        closeAfterTransition: s,
        disableAutoFocus: u,
        disableEnforceFocus: d,
        disableEscapeKeyDown: p,
        disablePortal: h,
        disableRestoreFocus: v,
        disableScrollLock: x,
        exited: I,
        hideBackdrop: b,
        keepMounted: m,
      }),
      Q = Qb(ie),
      se = () => {
        q(!1), S && S();
      },
      le = () => {
        q(!0), w && w(), s && re();
      },
      he = (ge) => {
        ge.target === ge.currentTarget && (T && T(ge), C && C(ge, 'backdropClick'));
      },
      ae = (ge) => {
        E && E(ge),
          !(ge.key !== 'Escape' || !G()) &&
            (p || (ge.stopPropagation(), C && C(ge, 'escapeKeyDown')));
      },
      P = {};
    a.props.tabIndex === void 0 && (P.tabIndex = '-1'),
      te && ((P.onEnter = qa(se, a.props.onEnter)), (P.onExited = qa(le, a.props.onExited)));
    const Oe = (i = l ?? L.root) != null ? i : 'div',
      M = Lt({
        elementType: Oe,
        externalSlotProps: j.root,
        externalForwardedProps: D,
        additionalProps: {
          ref: B,
          role: 'presentation',
          onKeyDown: ae,
        },
        className: Q.root,
        ownerState: ie,
      }),
      Y = L.backdrop,
      Pe = Lt({
        elementType: Y,
        externalSlotProps: j.backdrop,
        additionalProps: {
          'aria-hidden': !0,
          onClick: he,
          open: f,
        },
        className: Q.backdrop,
        ownerState: ie,
      });
    return !m && !f && (!te || I)
      ? null
      : /* @__PURE__ */ _(kc, {
          ref: H,
          container: c,
          disablePortal: h,
          children: /* @__PURE__ */ Ze(
            Oe,
            g({}, M, {
              children: [
                !b && Y ? /* @__PURE__ */ _(Y, g({}, Pe)) : null,
                /* @__PURE__ */ _(br, {
                  disableEnforceFocus: d,
                  disableAutoFocus: u,
                  disableRestoreFocus: v,
                  isEnabled: G,
                  open: f,
                  children: /* @__PURE__ */ y.cloneElement(a, P),
                }),
              ],
            }),
          ),
        });
  });
process.env.NODE_ENV !== 'production' &&
  (Sc.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
    /**
     * A single child content element.
     */
    children: jn.isRequired,
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
    container: n.oneOfType([Jt, n.func]),
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
const og = Sc,
  rg = 2;
function Rc(e, t) {
  return e - t;
}
function yo(e, t, o) {
  return e == null ? t : Math.min(Math.max(t, e), o);
}
function Vs(e, t) {
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
function Xo(e, t) {
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
function xr(e, t, o) {
  return ((e - t) * 100) / (o - t);
}
function ig(e, t, o) {
  return (o - t) * e + t;
}
function ag(e) {
  if (Math.abs(e) < 1) {
    const o = e.toExponential().split('e-'),
      r = o[0].split('.')[1];
    return (r ? r.length : 0) + parseInt(o[1], 10);
  }
  const t = e.toString().split('.')[1];
  return t ? t.length : 0;
}
function sg(e, t, o) {
  const r = Math.round((e - o) / t) * t + o;
  return Number(r.toFixed(ag(t)));
}
function Us({ values: e, newValue: t, index: o }) {
  const r = e.slice();
  return (r[o] = t), r.sort(Rc);
}
function Jo({ sliderRef: e, activeIndex: t, setActive: o }) {
  var r, i;
  const a = ct(e.current);
  if (
    !((r = e.current) != null && r.contains(a.activeElement)) ||
    Number(a == null || (i = a.activeElement) == null ? void 0 : i.getAttribute('data-index')) !== t
  ) {
    var s;
    (s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  o && o(t);
}
const lg = {
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
  cg = (e) => e;
let Zo;
function ui() {
  return (
    Zo === void 0 &&
      (typeof CSS < 'u' && typeof CSS.supports == 'function'
        ? (Zo = CSS.supports('touch-action', 'none'))
        : (Zo = !0)),
    Zo
  );
}
function ug(e) {
  const {
      'aria-labelledby': t,
      defaultValue: o,
      disabled: r = !1,
      disableSwap: i = !1,
      isRtl: a = !1,
      marks: s = !1,
      max: l = 100,
      min: c = 0,
      name: u,
      onChange: d,
      onChangeCommitted: p,
      orientation: h = 'horizontal',
      ref: v,
      scale: x = cg,
      step: b = 1,
      tabIndex: m,
      value: k,
    } = e,
    T = y.useRef(),
    [C, E] = y.useState(-1),
    [f, S] = y.useState(-1),
    [w, j] = y.useState(!1),
    L = y.useRef(0),
    [D, I] = Mn({
      controlled: k,
      default: o ?? c,
      name: 'Slider',
    }),
    q =
      d &&
      ((ee, me, xe) => {
        const be = ee.nativeEvent || ee,
          fe = new be.constructor(be.type, be);
        Object.defineProperty(fe, 'target', {
          writable: !0,
          value: {
            value: me,
            name: u,
          },
        }),
          d(fe, me, xe);
      }),
    V = Array.isArray(D);
  let A = V ? D.slice().sort(Rc) : [D];
  A = A.map((ee) => yo(ee, c, l));
  const F =
      s === !0 && b !== null
        ? [...Array(Math.floor((l - c) / b) + 1)].map((ee, me) => ({
            value: c + b * me,
          }))
        : s || [],
    B = F.map((ee) => ee.value),
    { isFocusVisibleRef: te, onBlur: U, onFocus: W, ref: R } = Bl(),
    [z, Z] = y.useState(-1),
    G = y.useRef(),
    H = ut(R, G),
    re = ut(v, H),
    ie = (ee) => (me) => {
      var xe;
      const be = Number(me.currentTarget.getAttribute('data-index'));
      W(me),
        te.current === !0 && Z(be),
        S(be),
        ee == null || (xe = ee.onFocus) == null || xe.call(ee, me);
    },
    Q = (ee) => (me) => {
      var xe;
      U(me),
        te.current === !1 && Z(-1),
        S(-1),
        ee == null || (xe = ee.onBlur) == null || xe.call(ee, me);
    };
  an(() => {
    if (r && G.current.contains(document.activeElement)) {
      var ee;
      (ee = document.activeElement) == null || ee.blur();
    }
  }, [r]),
    r && C !== -1 && E(-1),
    r && z !== -1 && Z(-1);
  const se = (ee) => (me) => {
      var xe;
      (xe = ee.onChange) == null || xe.call(ee, me);
      const be = Number(me.currentTarget.getAttribute('data-index')),
        fe = A[be],
        de = B.indexOf(fe);
      let ne = me.target.valueAsNumber;
      if (
        (F && b == null && (ne = ne < fe ? B[de - 1] : B[de + 1]),
        (ne = yo(ne, c, l)),
        F && b == null)
      ) {
        const Ee = B.indexOf(A[be]);
        ne = ne < A[be] ? B[Ee - 1] : B[Ee + 1];
      }
      if (V) {
        i && (ne = yo(ne, A[be - 1] || -1 / 0, A[be + 1] || 1 / 0));
        const Ee = ne;
        ne = Us({
          values: A,
          newValue: ne,
          index: be,
        });
        let Ce = be;
        i || (Ce = ne.indexOf(Ee)),
          Jo({
            sliderRef: G,
            activeIndex: Ce,
          });
      }
      I(ne), Z(be), q && q(me, ne, be), p && p(me, ne);
    },
    le = y.useRef();
  let he = h;
  a && h === 'horizontal' && (he += '-reverse');
  const ae = ({ finger: ee, move: me = !1 }) => {
      const { current: xe } = G,
        { width: be, height: fe, bottom: de, left: ne } = xe.getBoundingClientRect();
      let Ee;
      he.indexOf('vertical') === 0 ? (Ee = (de - ee.y) / fe) : (Ee = (ee.x - ne) / be),
        he.indexOf('-reverse') !== -1 && (Ee = 1 - Ee);
      let Ce;
      if (((Ce = ig(Ee, c, l)), b)) Ce = sg(Ce, b, c);
      else {
        const at = Vs(B, Ce);
        Ce = B[at];
      }
      Ce = yo(Ce, c, l);
      let Me = 0;
      if (V) {
        me ? (Me = le.current) : (Me = Vs(A, Ce)),
          i && (Ce = yo(Ce, A[Me - 1] || -1 / 0, A[Me + 1] || 1 / 0));
        const at = Ce;
        (Ce = Us({
          values: A,
          newValue: Ce,
          index: Me,
        })),
          (i && me) || ((Me = Ce.indexOf(at)), (le.current = Me));
      }
      return {
        newValue: Ce,
        activeIndex: Me,
      };
    },
    P = Ct((ee) => {
      const me = Xo(ee, T);
      if (!me) return;
      if (((L.current += 1), ee.type === 'mousemove' && ee.buttons === 0)) {
        Oe(ee);
        return;
      }
      const { newValue: xe, activeIndex: be } = ae({
        finger: me,
        move: !0,
      });
      Jo({
        sliderRef: G,
        activeIndex: be,
        setActive: E,
      }),
        I(xe),
        !w && L.current > rg && j(!0),
        q && xe !== D && q(ee, xe, be);
    }),
    Oe = Ct((ee) => {
      const me = Xo(ee, T);
      if ((j(!1), !me)) return;
      const { newValue: xe } = ae({
        finger: me,
        move: !0,
      });
      E(-1), ee.type === 'touchend' && S(-1), p && p(ee, xe), (T.current = void 0), Y();
    }),
    M = Ct((ee) => {
      if (r) return;
      ui() || ee.preventDefault();
      const me = ee.changedTouches[0];
      me != null && (T.current = me.identifier);
      const xe = Xo(ee, T);
      if (xe !== !1) {
        const { newValue: fe, activeIndex: de } = ae({
          finger: xe,
        });
        Jo({
          sliderRef: G,
          activeIndex: de,
          setActive: E,
        }),
          I(fe),
          q && q(ee, fe, de);
      }
      L.current = 0;
      const be = ct(G.current);
      be.addEventListener('touchmove', P), be.addEventListener('touchend', Oe);
    }),
    Y = y.useCallback(() => {
      const ee = ct(G.current);
      ee.removeEventListener('mousemove', P),
        ee.removeEventListener('mouseup', Oe),
        ee.removeEventListener('touchmove', P),
        ee.removeEventListener('touchend', Oe);
    }, [Oe, P]);
  y.useEffect(() => {
    const { current: ee } = G;
    return (
      ee.addEventListener('touchstart', M, {
        passive: ui(),
      }),
      () => {
        ee.removeEventListener('touchstart', M, {
          passive: ui(),
        }),
          Y();
      }
    );
  }, [Y, M]),
    y.useEffect(() => {
      r && Y();
    }, [r, Y]);
  const Pe = (ee) => (me) => {
      var xe;
      if (
        ((xe = ee.onMouseDown) == null || xe.call(ee, me),
        r || me.defaultPrevented || me.button !== 0)
      )
        return;
      me.preventDefault();
      const be = Xo(me, T);
      if (be !== !1) {
        const { newValue: de, activeIndex: ne } = ae({
          finger: be,
        });
        Jo({
          sliderRef: G,
          activeIndex: ne,
          setActive: E,
        }),
          I(de),
          q && q(me, de, ne);
      }
      L.current = 0;
      const fe = ct(G.current);
      fe.addEventListener('mousemove', P), fe.addEventListener('mouseup', Oe);
    },
    ge = xr(V ? A[0] : c, c, l),
    et = xr(A[A.length - 1], c, l) - ge,
    Be = (ee = {}) => {
      const me = {
          onMouseDown: Pe(ee || {}),
        },
        xe = g({}, ee, me);
      return g(
        {
          ref: re,
        },
        xe,
      );
    },
    ke = (ee) => (me) => {
      var xe;
      (xe = ee.onMouseOver) == null || xe.call(ee, me);
      const be = Number(me.currentTarget.getAttribute('data-index'));
      S(be);
    },
    Re = (ee) => (me) => {
      var xe;
      (xe = ee.onMouseLeave) == null || xe.call(ee, me), S(-1);
    };
  return {
    active: C,
    axis: he,
    axisProps: lg,
    dragging: w,
    focusedThumbIndex: z,
    getHiddenInputProps: (ee = {}) => {
      var me;
      const xe = {
          onChange: se(ee || {}),
          onFocus: ie(ee || {}),
          onBlur: Q(ee || {}),
        },
        be = g({}, ee, xe);
      return g(
        {
          tabIndex: m,
          'aria-labelledby': t,
          'aria-orientation': h,
          'aria-valuemax': x(l),
          'aria-valuemin': x(c),
          name: u,
          type: 'range',
          min: e.min,
          max: e.max,
          step: (me = e.step) != null ? me : void 0,
          disabled: r,
        },
        be,
        {
          style: g({}, Gd, {
            direction: a ? 'rtl' : 'ltr',
            // So that VoiceOver's focus indicator matches the thumb's dimensions
            width: '100%',
            height: '100%',
          }),
        },
      );
    },
    getRootProps: Be,
    getThumbProps: (ee = {}) => {
      const me = {
        onMouseOver: ke(ee || {}),
        onMouseLeave: Re(ee || {}),
      };
      return g({}, ee, me);
    },
    marks: F,
    open: f,
    range: V,
    trackLeap: et,
    trackOffset: ge,
    values: A,
  };
}
function dg(e) {
  const {
      autoHideDuration: t = null,
      disableWindowBlurListener: o = !1,
      onClose: r,
      open: i,
      ref: a,
      resumeHideDuration: s,
    } = e,
    l = y.useRef();
  y.useEffect(() => {
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
  y.useEffect(
    () => (
      i && u(t),
      () => {
        clearTimeout(l.current);
      }
    ),
    [i, t, u],
  );
  const d = (T) => {
      r == null || r(T, 'clickaway');
    },
    p = () => {
      clearTimeout(l.current);
    },
    h = y.useCallback(() => {
      t != null && u(s ?? t * 0.5);
    }, [t, s, u]),
    v = (T) => (C) => {
      const E = T.onBlur;
      E == null || E(C), h();
    },
    x = (T) => (C) => {
      const E = T.onFocus;
      E == null || E(C), p();
    },
    b = (T) => (C) => {
      const E = T.onMouseEnter;
      E == null || E(C), p();
    },
    m = (T) => (C) => {
      const E = T.onMouseLeave;
      E == null || E(C), h();
    };
  return (
    y.useEffect(() => {
      if (!o && i)
        return (
          window.addEventListener('focus', h),
          window.addEventListener('blur', p),
          () => {
            window.removeEventListener('focus', h), window.removeEventListener('blur', p);
          }
        );
    }, [o, h, i]),
    {
      getRootProps: (T = {}) => {
        const C = hc(e),
          E = g({}, C, T);
        return g(
          {
            ref: a,
            // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
            // See https://github.com/mui/material-ui/issues/29080
            role: 'presentation',
          },
          E,
          {
            onBlur: v(E),
            onFocus: x(E),
            onMouseEnter: b(E),
            onMouseLeave: m(E),
          },
        );
      },
      onClickAway: d,
    }
  );
}
const pg = ['onChange', 'maxRows', 'minRows', 'style', 'value'];
function Qo(e) {
  return parseInt(e, 10) || 0;
}
const fg = {
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
function Ws(e) {
  return e == null || Object.keys(e).length === 0 || (e.outerHeightStyle === 0 && !e.overflow);
}
const Nc = /* @__PURE__ */ y.forwardRef(function (t, o) {
  const { onChange: r, maxRows: i, minRows: a = 1, style: s, value: l } = t,
    c = ye(t, pg),
    { current: u } = y.useRef(l != null),
    d = y.useRef(null),
    p = ut(o, d),
    h = y.useRef(null),
    v = y.useRef(0),
    [x, b] = y.useState({
      outerHeightStyle: 0,
    }),
    m = y.useCallback(() => {
      const f = d.current,
        w = mn(f).getComputedStyle(f);
      if (w.width === '0px')
        return {
          outerHeightStyle: 0,
        };
      const j = h.current;
      (j.style.width = w.width),
        (j.value = f.value || t.placeholder || 'x'),
        j.value.slice(-1) ===
          `
` && (j.value += ' ');
      const L = w.boxSizing,
        D = Qo(w.paddingBottom) + Qo(w.paddingTop),
        I = Qo(w.borderBottomWidth) + Qo(w.borderTopWidth),
        q = j.scrollHeight;
      j.value = 'x';
      const V = j.scrollHeight;
      let A = q;
      a && (A = Math.max(Number(a) * V, A)),
        i && (A = Math.min(Number(i) * V, A)),
        (A = Math.max(A, V));
      const F = A + (L === 'border-box' ? D + I : 0),
        B = Math.abs(A - q) <= 1;
      return {
        outerHeightStyle: F,
        overflow: B,
      };
    }, [i, a, t.placeholder]),
    k = (f, S) => {
      const { outerHeightStyle: w, overflow: j } = S;
      return v.current < 20 &&
        ((w > 0 && Math.abs((f.outerHeightStyle || 0) - w) > 1) || f.overflow !== j)
        ? ((v.current += 1),
          {
            overflow: j,
            outerHeightStyle: w,
          })
        : (process.env.NODE_ENV !== 'production' &&
            v.current === 20 &&
            console.error(
              [
                'MUI: Too many re-renders. The layout is unstable.',
                'TextareaAutosize limits the number of renders to prevent an infinite loop.',
              ].join(`
`),
            ),
          f);
    },
    T = y.useCallback(() => {
      const f = m();
      Ws(f) || b((S) => k(S, f));
    }, [m]),
    C = () => {
      const f = m();
      Ws(f) ||
        Il.flushSync(() => {
          b((S) => k(S, f));
        });
    };
  y.useEffect(() => {
    const f = Ui(() => {
      (v.current = 0), d.current && C();
    });
    let S;
    const w = d.current,
      j = mn(w);
    return (
      j.addEventListener('resize', f),
      typeof ResizeObserver < 'u' && ((S = new ResizeObserver(f)), S.observe(w)),
      () => {
        f.clear(), j.removeEventListener('resize', f), S && S.disconnect();
      }
    );
  }),
    an(() => {
      T();
    }),
    y.useEffect(() => {
      v.current = 0;
    }, [l]);
  const E = (f) => {
    (v.current = 0), u || T(), r && r(f);
  };
  return /* @__PURE__ */ Ze(y.Fragment, {
    children: [
      /* @__PURE__ */ _(
        'textarea',
        g(
          {
            value: l,
            onChange: E,
            ref: p,
            rows: a,
            style: g(
              {
                height: x.outerHeightStyle,
                // Need a large enough difference to allow scrolling.
                // This prevents infinite rendering loop.
                overflow: x.overflow ? 'hidden' : void 0,
              },
              s,
            ),
          },
          c,
        ),
      ),
      /* @__PURE__ */ _('textarea', {
        'aria-hidden': !0,
        className: t.className,
        readOnly: !0,
        ref: h,
        tabIndex: -1,
        style: g({}, fg.shadow, s, {
          padding: 0,
        }),
      }),
    ],
  });
});
process.env.NODE_ENV !== 'production' &&
  (Nc.propTypes = {
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
const mg = Nc;
function Hs(e) {
  return typeof e.normalize < 'u' ? e.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : e;
}
function hg(e = {}) {
  const {
    ignoreAccents: t = !0,
    ignoreCase: o = !0,
    limit: r,
    matchFrom: i = 'any',
    stringify: a,
    trim: s = !1,
  } = e;
  return (l, { inputValue: c, getOptionLabel: u }) => {
    let d = s ? c.trim() : c;
    o && (d = d.toLowerCase()), t && (d = Hs(d));
    const p = d
      ? l.filter((h) => {
          let v = (a || u)(h);
          return (
            o && (v = v.toLowerCase()),
            t && (v = Hs(v)),
            i === 'start' ? v.indexOf(d) === 0 : v.indexOf(d) > -1
          );
        })
      : l;
    return typeof r == 'number' ? p.slice(0, r) : p;
  };
}
function di(e, t) {
  for (let o = 0; o < e.length; o += 1) if (t(e[o])) return o;
  return -1;
}
const bg = hg(),
  qs = 5,
  gg = (e) => {
    var t;
    return (
      e.current !== null &&
      ((t = e.current.parentElement) == null ? void 0 : t.contains(document.activeElement))
    );
  };
function vg(e) {
  const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_isActiveElementInListbox: t = gg,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      unstable_classNamePrefix: o = 'Mui',
      autoComplete: r = !1,
      autoHighlight: i = !1,
      autoSelect: a = !1,
      blurOnSelect: s = !1,
      clearOnBlur: l = !e.freeSolo,
      clearOnEscape: c = !1,
      componentName: u = 'useAutocomplete',
      defaultValue: d = e.multiple ? [] : null,
      disableClearable: p = !1,
      disableCloseOnSelect: h = !1,
      disabled: v,
      disabledItemsFocusable: x = !1,
      disableListWrap: b = !1,
      filterOptions: m = bg,
      filterSelectedOptions: k = !1,
      freeSolo: T = !1,
      getOptionDisabled: C,
      getOptionLabel: E = (N) => {
        var $;
        return ($ = N.label) != null ? $ : N;
      },
      groupBy: f,
      handleHomeEndKeys: S = !e.freeSolo,
      id: w,
      includeInputInList: j = !1,
      inputValue: L,
      isOptionEqualToValue: D = (N, $) => N === $,
      multiple: I = !1,
      onChange: q,
      onClose: V,
      onHighlightChange: A,
      onInputChange: F,
      onOpen: B,
      open: te,
      openOnFocus: U = !1,
      options: W,
      readOnly: R = !1,
      selectOnFocus: z = !e.freeSolo,
      value: Z,
    } = e,
    G = Fl(w);
  let H = E;
  H = (N) => {
    const $ = E(N);
    if (typeof $ != 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const X = $ === void 0 ? 'undefined' : `${typeof $} (${$})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${u} returned ${X} instead of a string for ${JSON.stringify(
            N,
          )}.`,
        );
      }
      return String($);
    }
    return $;
  };
  const re = y.useRef(!1),
    ie = y.useRef(!0),
    Q = y.useRef(null),
    se = y.useRef(null),
    [le, he] = y.useState(null),
    [ae, P] = y.useState(-1),
    Oe = i ? 0 : -1,
    M = y.useRef(Oe),
    [Y, Pe] = Mn({
      controlled: Z,
      default: d,
      name: u,
    }),
    [ge, et] = Mn({
      controlled: L,
      default: '',
      name: u,
      state: 'inputValue',
    }),
    [Be, ke] = y.useState(!1),
    Re = y.useCallback(
      (N, $) => {
        if (!(I ? Y.length < $.length : $ !== null) && !l) return;
        let oe;
        if (I) oe = '';
        else if ($ == null) oe = '';
        else {
          const pe = H($);
          oe = typeof pe == 'string' ? pe : '';
        }
        ge !== oe && (et(oe), F && F(N, oe, 'reset'));
      },
      [H, ge, I, F, et, l, Y],
    ),
    [tt, it] = Mn({
      controlled: te,
      default: !1,
      name: u,
      state: 'open',
    }),
    [ee, me] = y.useState(!0),
    xe = !I && Y != null && ge === H(Y),
    be = tt && !R,
    fe = be
      ? m(
          W.filter((N) => !(k && (I ? Y : [Y]).some(($) => $ !== null && D(N, $)))),
          // we use the empty string to manipulate `filterOptions` to not filter any options
          // i.e. the filter predicate always returns true
          {
            inputValue: xe && ee ? '' : ge,
            getOptionLabel: H,
          },
        )
      : [],
    de = qd({
      filteredOptions: fe,
      value: Y,
    });
  y.useEffect(() => {
    const N = Y !== de.value;
    (Be && !N) || (T && !N) || Re(null, Y);
  }, [Y, Re, Be, de.value, T]);
  const ne = tt && fe.length > 0 && !R;
  if (process.env.NODE_ENV !== 'production' && Y !== null && !T && W.length > 0) {
    const N = (I ? Y : [Y]).filter(($) => !W.some((X) => D(X, $)));
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
  const Ee = Ct((N) => {
    N === -1 ? Q.current.focus() : le.querySelector(`[data-tag-index="${N}"]`).focus();
  });
  y.useEffect(() => {
    I && ae > Y.length - 1 && (P(-1), Ee(-1));
  }, [Y, I, ae, Ee]);
  function Ce(N, $) {
    if (!se.current || N === -1) return -1;
    let X = N;
    for (;;) {
      if (($ === 'next' && X === fe.length) || ($ === 'previous' && X === -1)) return -1;
      const oe = se.current.querySelector(`[data-option-index="${X}"]`),
        pe = x ? !1 : !oe || oe.disabled || oe.getAttribute('aria-disabled') === 'true';
      if ((oe && !oe.hasAttribute('tabindex')) || pe) X += $ === 'next' ? 1 : -1;
      else return X;
    }
  }
  const Me = Ct(({ event: N, index: $, reason: X = 'auto' }) => {
      if (
        ((M.current = $),
        $ === -1
          ? Q.current.removeAttribute('aria-activedescendant')
          : Q.current.setAttribute('aria-activedescendant', `${G}-option-${$}`),
        A && A(N, $ === -1 ? null : fe[$], X),
        !se.current)
      )
        return;
      const oe = se.current.querySelector(`[role="option"].${o}-focused`);
      oe && (oe.classList.remove(`${o}-focused`), oe.classList.remove(`${o}-focusVisible`));
      const pe = se.current.parentElement.querySelector('[role="listbox"]');
      if (!pe) return;
      if ($ === -1) {
        pe.scrollTop = 0;
        return;
      }
      const Ne = se.current.querySelector(`[data-option-index="${$}"]`);
      if (
        Ne &&
        (Ne.classList.add(`${o}-focused`),
        X === 'keyboard' && Ne.classList.add(`${o}-focusVisible`),
        pe.scrollHeight > pe.clientHeight && X !== 'mouse')
      ) {
        const we = Ne,
          Le = pe.clientHeight + pe.scrollTop,
          gt = we.offsetTop + we.offsetHeight;
        gt > Le
          ? (pe.scrollTop = gt - pe.clientHeight)
          : we.offsetTop - we.offsetHeight * (f ? 1.3 : 0) < pe.scrollTop &&
            (pe.scrollTop = we.offsetTop - we.offsetHeight * (f ? 1.3 : 0));
      }
    }),
    at = Ct(({ event: N, diff: $, direction: X = 'next', reason: oe = 'auto' }) => {
      if (!be) return;
      const Ne = Ce(
        (() => {
          const we = fe.length - 1;
          if ($ === 'reset') return Oe;
          if ($ === 'start') return 0;
          if ($ === 'end') return we;
          const Le = M.current + $;
          return Le < 0
            ? Le === -1 && j
              ? -1
              : (b && M.current !== -1) || Math.abs($) > 1
              ? 0
              : we
            : Le > we
            ? Le === we + 1 && j
              ? -1
              : b || Math.abs($) > 1
              ? we
              : 0
            : Le;
        })(),
        X,
      );
      if (
        (Me({
          index: Ne,
          reason: oe,
          event: N,
        }),
        r && $ !== 'reset')
      )
        if (Ne === -1) Q.current.value = ge;
        else {
          const we = H(fe[Ne]);
          (Q.current.value = we),
            we.toLowerCase().indexOf(ge.toLowerCase()) === 0 &&
              ge.length > 0 &&
              Q.current.setSelectionRange(ge.length, we.length);
        }
    }),
    ft = () => {
      const N = ($, X) => {
        const oe = $ ? H($) : '',
          pe = X ? H(X) : '';
        return oe === pe;
      };
      if (
        M.current !== -1 &&
        de.filteredOptions &&
        de.filteredOptions.length !== fe.length &&
        (I
          ? Y.length === de.value.length && de.value.every(($, X) => H(Y[X]) === H($))
          : N(de.value, Y))
      ) {
        const $ = de.filteredOptions[M.current];
        if ($ && fe.some((oe) => H(oe) === H($))) return !0;
      }
      return !1;
    },
    Tt = y.useCallback(() => {
      if (!be || ft()) return;
      const N = I ? Y[0] : Y;
      if (fe.length === 0 || N == null) {
        at({
          diff: 'reset',
        });
        return;
      }
      if (se.current) {
        if (N != null) {
          const $ = fe[M.current];
          if (I && $ && di(Y, (oe) => D($, oe)) !== -1) return;
          const X = di(fe, (oe) => D(oe, N));
          X === -1
            ? at({
                diff: 'reset',
              })
            : Me({
                index: X,
              });
          return;
        }
        if (M.current >= fe.length - 1) {
          Me({
            index: fe.length - 1,
          });
          return;
        }
        Me({
          index: M.current,
        });
      }
    }, [
      // Only sync the highlighted index when the option switch between empty and not
      fe.length,
      // Don't sync the highlighted index with the value when multiple
      // eslint-disable-next-line react-hooks/exhaustive-deps
      I ? !1 : Y,
      k,
      at,
      Me,
      be,
      ge,
      I,
    ]),
    gn = Ct((N) => {
      dr(se, N), N && Tt();
    });
  process.env.NODE_ENV !== 'production' &&
    y.useEffect(() => {
      (!Q.current || Q.current.nodeName !== 'INPUT') &&
        (Q.current && Q.current.nodeName === 'TEXTAREA'
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
                `MUI: Unable to find the input element. It was resolved to ${Q.current} while an HTMLInputElement was expected.`,
                `Instead, ${u} expects an input element.`,
                '',
                u === 'useAutocomplete'
                  ? 'Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed.'
                  : 'Make sure you have customized the input component correctly.',
              ].join(`
`),
            ));
    }, [u]),
    y.useEffect(() => {
      Tt();
    }, [Tt]);
  const kt = (N) => {
      tt || (it(!0), me(!0), B && B(N));
    },
    bt = (N, $) => {
      tt && (it(!1), V && V(N, $));
    },
    xt = (N, $, X, oe) => {
      if (I) {
        if (Y.length === $.length && Y.every((pe, Ne) => pe === $[Ne])) return;
      } else if (Y === $) return;
      q && q(N, $, X, oe), Pe($);
    },
    mt = y.useRef(!1),
    nt = (N, $, X = 'selectOption', oe = 'options') => {
      let pe = X,
        Ne = $;
      if (I) {
        if (((Ne = Array.isArray(Y) ? Y.slice() : []), process.env.NODE_ENV !== 'production')) {
          const Le = Ne.filter((gt) => D($, gt));
          Le.length > 1 &&
            console.error(
              [
                `MUI: The \`isOptionEqualToValue\` method of ${u} does not handle the arguments correctly.`,
                `The component expects a single value to match a given option but found ${Le.length} matches.`,
              ].join(`
`),
            );
        }
        const we = di(Ne, (Le) => D($, Le));
        we === -1 ? Ne.push($) : oe !== 'freeSolo' && (Ne.splice(we, 1), (pe = 'removeOption'));
      }
      Re(N, Ne),
        xt(N, Ne, pe, {
          option: $,
        }),
        !h && (!N || (!N.ctrlKey && !N.metaKey)) && bt(N, pe),
        (s === !0 || (s === 'touch' && mt.current) || (s === 'mouse' && !mt.current)) &&
          Q.current.blur();
    };
  function ot(N, $) {
    if (N === -1) return -1;
    let X = N;
    for (;;) {
      if (($ === 'next' && X === Y.length) || ($ === 'previous' && X === -1)) return -1;
      const oe = le.querySelector(`[data-tag-index="${X}"]`);
      if (
        !oe ||
        !oe.hasAttribute('tabindex') ||
        oe.disabled ||
        oe.getAttribute('aria-disabled') === 'true'
      )
        X += $ === 'next' ? 1 : -1;
      else return X;
    }
  }
  const ht = (N, $) => {
      if (!I) return;
      ge === '' && bt(N, 'toggleInput');
      let X = ae;
      ae === -1
        ? ge === '' && $ === 'previous' && (X = Y.length - 1)
        : ((X += $ === 'next' ? 1 : -1), X < 0 && (X = 0), X === Y.length && (X = -1)),
        (X = ot(X, $)),
        P(X),
        Ee(X);
    },
    Sn = (N) => {
      (re.current = !0), et(''), F && F(N, '', 'clear'), xt(N, I ? [] : null, 'clear');
    },
    Qt = (N) => ($) => {
      if (
        (N.onKeyDown && N.onKeyDown($),
        !$.defaultMuiPrevented &&
          (ae !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf($.key) === -1 && (P(-1), Ee(-1)),
          $.which !== 229))
      )
        switch ($.key) {
          case 'Home':
            be &&
              S &&
              ($.preventDefault(),
              at({
                diff: 'start',
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }));
            break;
          case 'End':
            be &&
              S &&
              ($.preventDefault(),
              at({
                diff: 'end',
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }));
            break;
          case 'PageUp':
            $.preventDefault(),
              at({
                diff: -qs,
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }),
              kt($);
            break;
          case 'PageDown':
            $.preventDefault(),
              at({
                diff: qs,
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }),
              kt($);
            break;
          case 'ArrowDown':
            $.preventDefault(),
              at({
                diff: 1,
                direction: 'next',
                reason: 'keyboard',
                event: $,
              }),
              kt($);
            break;
          case 'ArrowUp':
            $.preventDefault(),
              at({
                diff: -1,
                direction: 'previous',
                reason: 'keyboard',
                event: $,
              }),
              kt($);
            break;
          case 'ArrowLeft':
            ht($, 'previous');
            break;
          case 'ArrowRight':
            ht($, 'next');
            break;
          case 'Enter':
            if (M.current !== -1 && be) {
              const X = fe[M.current],
                oe = C ? C(X) : !1;
              if (($.preventDefault(), oe)) return;
              nt($, X, 'selectOption'),
                r && Q.current.setSelectionRange(Q.current.value.length, Q.current.value.length);
            } else
              T &&
                ge !== '' &&
                xe === !1 &&
                (I && $.preventDefault(), nt($, ge, 'createOption', 'freeSolo'));
            break;
          case 'Escape':
            be
              ? ($.preventDefault(), $.stopPropagation(), bt($, 'escape'))
              : c &&
                (ge !== '' || (I && Y.length > 0)) &&
                ($.preventDefault(), $.stopPropagation(), Sn($));
            break;
          case 'Backspace':
            if (I && !R && ge === '' && Y.length > 0) {
              const X = ae === -1 ? Y.length - 1 : ae,
                oe = Y.slice();
              oe.splice(X, 1),
                xt($, oe, 'removeOption', {
                  option: Y[X],
                });
            }
            break;
          case 'Delete':
            if (I && !R && ge === '' && Y.length > 0 && ae !== -1) {
              const X = ae,
                oe = Y.slice();
              oe.splice(X, 1),
                xt($, oe, 'removeOption', {
                  option: Y[X],
                });
            }
            break;
        }
    },
    vn = (N) => {
      ke(!0), U && !re.current && kt(N);
    },
    Ht = (N) => {
      if (t(se)) {
        Q.current.focus();
        return;
      }
      ke(!1),
        (ie.current = !0),
        (re.current = !1),
        a && M.current !== -1 && be
          ? nt(N, fe[M.current], 'blur')
          : a && T && ge !== ''
          ? nt(N, ge, 'blur', 'freeSolo')
          : l && Re(N, Y),
        bt(N, 'blur');
    },
    ln = (N) => {
      const $ = N.target.value;
      ge !== $ && (et($), me(!1), F && F(N, $, 'input')),
        $ === '' ? !p && !I && xt(N, null, 'clear') : kt(N);
    },
    cn = (N) => {
      Me({
        event: N,
        index: Number(N.currentTarget.getAttribute('data-option-index')),
        reason: 'mouse',
      });
    },
    un = (N) => {
      Me({
        event: N,
        index: Number(N.currentTarget.getAttribute('data-option-index')),
        reason: 'touch',
      }),
        (mt.current = !0);
    },
    en = (N) => {
      const $ = Number(N.currentTarget.getAttribute('data-option-index'));
      nt(N, fe[$], 'selectOption'), (mt.current = !1);
    },
    dn = (N) => ($) => {
      const X = Y.slice();
      X.splice(N, 1),
        xt($, X, 'removeOption', {
          option: Y[N],
        });
    },
    De = (N) => {
      tt ? bt(N, 'toggleInput') : kt(N);
    },
    dt = (N) => {
      N.target.getAttribute('id') !== G && N.preventDefault();
    },
    Dt = () => {
      Q.current.focus(),
        z &&
          ie.current &&
          Q.current.selectionEnd - Q.current.selectionStart === 0 &&
          Q.current.select(),
        (ie.current = !1);
    },
    O = (N) => {
      (ge === '' || !tt) && De(N);
    };
  let K = T && ge.length > 0;
  K = K || (I ? Y.length > 0 : Y !== null);
  let ue = fe;
  if (f) {
    const N = /* @__PURE__ */ new Map();
    let $ = !1;
    ue = fe.reduce((X, oe, pe) => {
      const Ne = f(oe);
      return (
        X.length > 0 && X[X.length - 1].group === Ne
          ? X[X.length - 1].options.push(oe)
          : (process.env.NODE_ENV !== 'production' &&
              (N.get(Ne) &&
                !$ &&
                (console.warn(
                  `MUI: The options provided combined with the \`groupBy\` method of ${u} returns duplicated headers.`,
                  'You can solve the issue by sorting the options with the output of `groupBy`.',
                ),
                ($ = !0)),
              N.set(Ne, !0)),
            X.push({
              key: pe,
              index: pe,
              group: Ne,
              options: [oe],
            })),
        X
      );
    }, []);
  }
  return (
    v && Be && Ht(),
    {
      getRootProps: (N = {}) =>
        g(
          {
            'aria-owns': ne ? `${G}-listbox` : null,
          },
          N,
          {
            onKeyDown: Qt(N),
            onMouseDown: dt,
            onClick: Dt,
          },
        ),
      getInputLabelProps: () => ({
        id: `${G}-label`,
        htmlFor: G,
      }),
      getInputProps: () => ({
        id: G,
        value: ge,
        onBlur: Ht,
        onFocus: vn,
        onChange: ln,
        onMouseDown: O,
        // if open then this is handled imperativeley so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': be ? '' : null,
        'aria-autocomplete': r ? 'both' : 'list',
        'aria-controls': ne ? `${G}-listbox` : void 0,
        'aria-expanded': ne,
        // Disable browser's suggestion that might overlap with the popup.
        // Handle autocomplete but not autofill.
        autoComplete: 'off',
        ref: Q,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled: v,
      }),
      getClearProps: () => ({
        tabIndex: -1,
        onClick: Sn,
      }),
      getPopupIndicatorProps: () => ({
        tabIndex: -1,
        onClick: De,
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
        id: `${G}-listbox`,
        'aria-labelledby': `${G}-label`,
        ref: gn,
        onMouseDown: (N) => {
          N.preventDefault();
        },
      }),
      getOptionProps: ({ index: N, option: $ }) => {
        const X = (I ? Y : [Y]).some((pe) => pe != null && D($, pe)),
          oe = C ? C($) : !1;
        return {
          key: H($),
          tabIndex: -1,
          role: 'option',
          id: `${G}-option-${N}`,
          onMouseOver: cn,
          onClick: en,
          onTouchStart: un,
          'data-option-index': N,
          'aria-disabled': oe,
          'aria-selected': X,
        };
      },
      id: G,
      inputValue: ge,
      value: Y,
      dirty: K,
      expanded: be && le,
      popupOpen: be,
      focused: Be || ae !== -1,
      anchorEl: le,
      setAnchorEl: he,
      focusedTag: ae,
      groupedOptions: ue,
    }
  );
}
function yg(e) {
  return $e('MuiSvgIcon', e);
}
Se('MuiSvgIcon', [
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
const xg = [
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
  Eg = (e) => {
    const { color: t, fontSize: o, classes: r } = e,
      i = {
        root: ['root', t !== 'inherit' && `color${J(t)}`, `fontSize${J(o)}`],
      };
    return _e(i, yg, r);
  },
  Cg = ce('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'inherit' && t[`color${J(o.color)}`],
        t[`fontSize${J(o.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var o, r, i, a, s, l, c, u, d, p, h, v, x, b, m, k, T;
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
          ((c = e.typography) == null || (u = c.pxToRem) == null ? void 0 : u.call(c, 24)) ||
          '1.5rem',
        large:
          ((d = e.typography) == null || (p = d.pxToRem) == null ? void 0 : p.call(d, 35)) ||
          '2.1875rem',
      }[t.fontSize],
      // TODO v5 deprecate, v6 remove for sx
      color:
        (h = (v = (e.vars || e).palette) == null || (x = v[t.color]) == null ? void 0 : x.main) !=
        null
          ? h
          : {
              action:
                (b = (e.vars || e).palette) == null || (m = b.action) == null ? void 0 : m.active,
              disabled:
                (k = (e.vars || e).palette) == null || (T = k.action) == null ? void 0 : T.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  pa = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiSvgIcon',
      }),
      {
        children: i,
        className: a,
        color: s = 'inherit',
        component: l = 'svg',
        fontSize: c = 'medium',
        htmlColor: u,
        inheritViewBox: d = !1,
        titleAccess: p,
        viewBox: h = '0 0 24 24',
      } = r,
      v = ye(r, xg),
      x = g({}, r, {
        color: s,
        component: l,
        fontSize: c,
        instanceFontSize: t.fontSize,
        inheritViewBox: d,
        viewBox: h,
      }),
      b = {};
    d || (b.viewBox = h);
    const m = Eg(x);
    return /* @__PURE__ */ Ze(
      Cg,
      g(
        {
          as: l,
          className: ve(m.root, a),
          focusable: 'false',
          color: u,
          'aria-hidden': p ? void 0 : !0,
          role: p ? 'img' : void 0,
          ref: o,
        },
        b,
        v,
        {
          ownerState: x,
          children: [
            i,
            p
              ? /* @__PURE__ */ _('title', {
                  children: p,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (pa.propTypes = {
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
pa.muiName = 'SvgIcon';
const Ys = pa;
function Fn(e, t) {
  function o(r, i) {
    return /* @__PURE__ */ _(
      Ys,
      g(
        {
          'data-testid': `${t}Icon`,
          ref: i,
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
    (o.muiName = Ys.muiName),
    /* @__PURE__ */ y.memo(/* @__PURE__ */ y.forwardRef(o))
  );
}
var Pi = { exports: {} },
  Ge = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gs;
function Og() {
  if (Gs) return Ge;
  Gs = 1;
  var e = Symbol.for('react.element'),
    t = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    i = Symbol.for('react.profiler'),
    a = Symbol.for('react.provider'),
    s = Symbol.for('react.context'),
    l = Symbol.for('react.server_context'),
    c = Symbol.for('react.forward_ref'),
    u = Symbol.for('react.suspense'),
    d = Symbol.for('react.suspense_list'),
    p = Symbol.for('react.memo'),
    h = Symbol.for('react.lazy'),
    v = Symbol.for('react.offscreen'),
    x;
  x = Symbol.for('react.module.reference');
  function b(m) {
    if (typeof m == 'object' && m !== null) {
      var k = m.$$typeof;
      switch (k) {
        case e:
          switch (((m = m.type), m)) {
            case o:
            case i:
            case r:
            case u:
            case d:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case l:
                case s:
                case c:
                case h:
                case p:
                case a:
                  return m;
                default:
                  return k;
              }
          }
        case t:
          return k;
      }
    }
  }
  return (
    (Ge.ContextConsumer = s),
    (Ge.ContextProvider = a),
    (Ge.Element = e),
    (Ge.ForwardRef = c),
    (Ge.Fragment = o),
    (Ge.Lazy = h),
    (Ge.Memo = p),
    (Ge.Portal = t),
    (Ge.Profiler = i),
    (Ge.StrictMode = r),
    (Ge.Suspense = u),
    (Ge.SuspenseList = d),
    (Ge.isAsyncMode = function () {
      return !1;
    }),
    (Ge.isConcurrentMode = function () {
      return !1;
    }),
    (Ge.isContextConsumer = function (m) {
      return b(m) === s;
    }),
    (Ge.isContextProvider = function (m) {
      return b(m) === a;
    }),
    (Ge.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === e;
    }),
    (Ge.isForwardRef = function (m) {
      return b(m) === c;
    }),
    (Ge.isFragment = function (m) {
      return b(m) === o;
    }),
    (Ge.isLazy = function (m) {
      return b(m) === h;
    }),
    (Ge.isMemo = function (m) {
      return b(m) === p;
    }),
    (Ge.isPortal = function (m) {
      return b(m) === t;
    }),
    (Ge.isProfiler = function (m) {
      return b(m) === i;
    }),
    (Ge.isStrictMode = function (m) {
      return b(m) === r;
    }),
    (Ge.isSuspense = function (m) {
      return b(m) === u;
    }),
    (Ge.isSuspenseList = function (m) {
      return b(m) === d;
    }),
    (Ge.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === o ||
        m === i ||
        m === r ||
        m === u ||
        m === d ||
        m === v ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === h ||
            m.$$typeof === p ||
            m.$$typeof === a ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === x ||
            m.getModuleId !== void 0))
      );
    }),
    (Ge.typeOf = b),
    Ge
  );
}
var Ke = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ks;
function Tg() {
  return (
    Ks ||
      ((Ks = 1),
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
            u = Symbol.for('react.suspense'),
            d = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            h = Symbol.for('react.lazy'),
            v = Symbol.for('react.offscreen'),
            x = !1,
            b = !1,
            m = !1,
            k = !1,
            T = !1,
            C;
          C = Symbol.for('react.module.reference');
          function E(M) {
            return !!(
              typeof M == 'string' ||
              typeof M == 'function' ||
              M === o ||
              M === i ||
              T ||
              M === r ||
              M === u ||
              M === d ||
              k ||
              M === v ||
              x ||
              b ||
              m ||
              (typeof M == 'object' &&
                M !== null &&
                (M.$$typeof === h ||
                  M.$$typeof === p ||
                  M.$$typeof === a ||
                  M.$$typeof === s ||
                  M.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  M.$$typeof === C ||
                  M.getModuleId !== void 0))
            );
          }
          function f(M) {
            if (typeof M == 'object' && M !== null) {
              var Y = M.$$typeof;
              switch (Y) {
                case e:
                  var Pe = M.type;
                  switch (Pe) {
                    case o:
                    case i:
                    case r:
                    case u:
                    case d:
                      return Pe;
                    default:
                      var ge = Pe && Pe.$$typeof;
                      switch (ge) {
                        case l:
                        case s:
                        case c:
                        case h:
                        case p:
                        case a:
                          return ge;
                        default:
                          return Y;
                      }
                  }
                case t:
                  return Y;
              }
            }
          }
          var S = s,
            w = a,
            j = e,
            L = c,
            D = o,
            I = h,
            q = p,
            V = t,
            A = i,
            F = r,
            B = u,
            te = d,
            U = !1,
            W = !1;
          function R(M) {
            return (
              U ||
                ((U = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function z(M) {
            return (
              W ||
                ((W = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function Z(M) {
            return f(M) === s;
          }
          function G(M) {
            return f(M) === a;
          }
          function H(M) {
            return typeof M == 'object' && M !== null && M.$$typeof === e;
          }
          function re(M) {
            return f(M) === c;
          }
          function ie(M) {
            return f(M) === o;
          }
          function Q(M) {
            return f(M) === h;
          }
          function se(M) {
            return f(M) === p;
          }
          function le(M) {
            return f(M) === t;
          }
          function he(M) {
            return f(M) === i;
          }
          function ae(M) {
            return f(M) === r;
          }
          function P(M) {
            return f(M) === u;
          }
          function Oe(M) {
            return f(M) === d;
          }
          (Ke.ContextConsumer = S),
            (Ke.ContextProvider = w),
            (Ke.Element = j),
            (Ke.ForwardRef = L),
            (Ke.Fragment = D),
            (Ke.Lazy = I),
            (Ke.Memo = q),
            (Ke.Portal = V),
            (Ke.Profiler = A),
            (Ke.StrictMode = F),
            (Ke.Suspense = B),
            (Ke.SuspenseList = te),
            (Ke.isAsyncMode = R),
            (Ke.isConcurrentMode = z),
            (Ke.isContextConsumer = Z),
            (Ke.isContextProvider = G),
            (Ke.isElement = H),
            (Ke.isForwardRef = re),
            (Ke.isFragment = ie),
            (Ke.isLazy = Q),
            (Ke.isMemo = se),
            (Ke.isPortal = le),
            (Ke.isProfiler = he),
            (Ke.isStrictMode = ae),
            (Ke.isSuspense = P),
            (Ke.isSuspenseList = Oe),
            (Ke.isValidElementType = E),
            (Ke.typeOf = f);
        })()),
    Ke
  );
}
process.env.NODE_ENV === 'production' ? (Pi.exports = Og()) : (Pi.exports = Tg());
var fa = Pi.exports;
function Ii(e, t) {
  return (
    (Ii = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    Ii(e, t)
  );
}
function $c(e, t) {
  (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), Ii(e, t);
}
const Xs = {
  disabled: !1,
};
var kg =
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
const Er = Gt.createContext(null);
var wg = function (t) {
    return t.scrollTop;
  },
  To = 'unmounted',
  Nn = 'exited',
  $n = 'entering',
  Xn = 'entered',
  _i = 'exiting',
  bn = /* @__PURE__ */ (function (e) {
    $c(t, e);
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
            ? ((c = Nn), (a.appearStatus = $n))
            : (c = Xn)
          : r.unmountOnExit || r.mountOnEnter
          ? (c = To)
          : (c = Nn),
        (a.state = {
          status: c,
        }),
        (a.nextCallback = null),
        a
      );
    }
    t.getDerivedStateFromProps = function (i, a) {
      var s = i.in;
      return s && a.status === To
        ? {
            status: Nn,
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
          this.props.in ? s !== $n && s !== Xn && (a = $n) : (s === $n || s === Xn) && (a = _i);
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
          if ((this.cancelNextCallback(), a === $n)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef ? this.props.nodeRef.current : qo.findDOMNode(this);
              s && wg(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === Nn &&
            this.setState({
              status: To,
            });
      }),
      (o.performEnter = function (i) {
        var a = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [l] : [qo.findDOMNode(this), l],
          u = c[0],
          d = c[1],
          p = this.getTimeouts(),
          h = l ? p.appear : p.enter;
        if ((!i && !s) || Xs.disabled) {
          this.safeSetState(
            {
              status: Xn,
            },
            function () {
              a.props.onEntered(u);
            },
          );
          return;
        }
        this.props.onEnter(u, d),
          this.safeSetState(
            {
              status: $n,
            },
            function () {
              a.props.onEntering(u, d),
                a.onTransitionEnd(h, function () {
                  a.safeSetState(
                    {
                      status: Xn,
                    },
                    function () {
                      a.props.onEntered(u, d);
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
          l = this.props.nodeRef ? void 0 : qo.findDOMNode(this);
        if (!a || Xs.disabled) {
          this.safeSetState(
            {
              status: Nn,
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
              status: _i,
            },
            function () {
              i.props.onExiting(l),
                i.onTransitionEnd(s.exit, function () {
                  i.safeSetState(
                    {
                      status: Nn,
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
        var s = this.props.nodeRef ? this.props.nodeRef.current : qo.findDOMNode(this),
          l = i == null && !this.props.addEndListener;
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
        i != null && setTimeout(this.nextCallback, i);
      }),
      (o.render = function () {
        var i = this.state.status;
        if (i === To) return null;
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
        var l = ye(a, [
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
          /* @__PURE__ */ Gt.createElement(
            Er.Provider,
            {
              value: null,
            },
            typeof s == 'function' ? s(i, l) : Gt.cloneElement(Gt.Children.only(s), l),
          )
        );
      }),
      t
    );
  })(Gt.Component);
bn.contextType = Er;
bn.propTypes =
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
          var o = kg;
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
function Gn() {}
bn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Gn,
  onEntering: Gn,
  onEntered: Gn,
  onExit: Gn,
  onExiting: Gn,
  onExited: Gn,
};
bn.UNMOUNTED = To;
bn.EXITED = Nn;
bn.ENTERING = $n;
bn.ENTERED = Xn;
bn.EXITING = _i;
const ma = bn;
function Sg(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ha(e, t) {
  var o = function (a) {
      return t && rr(a) ? t(a) : a;
    },
    r = /* @__PURE__ */ Object.create(null);
  return (
    e &&
      Qu.map(e, function (i) {
        return i;
      }).forEach(function (i) {
        r[i.key] = o(i);
      }),
    r
  );
}
function Rg(e, t) {
  (e = e || {}), (t = t || {});
  function o(d) {
    return d in t ? t[d] : e[d];
  }
  var r = /* @__PURE__ */ Object.create(null),
    i = [];
  for (var a in e) a in t ? i.length && ((r[a] = i), (i = [])) : i.push(a);
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
  for (s = 0; s < i.length; s++) l[i[s]] = o(i[s]);
  return l;
}
function _n(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function Ng(e, t) {
  return ha(e.children, function (o) {
    return ir(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: _n(o, 'appear', e),
      enter: _n(o, 'enter', e),
      exit: _n(o, 'exit', e),
    });
  });
}
function $g(e, t, o) {
  var r = ha(e.children),
    i = Rg(t, r);
  return (
    Object.keys(i).forEach(function (a) {
      var s = i[a];
      if (rr(s)) {
        var l = a in t,
          c = a in r,
          u = t[a],
          d = rr(u) && !u.props.in;
        c && (!l || d)
          ? (i[a] = ir(s, {
              onExited: o.bind(null, s),
              in: !0,
              exit: _n(s, 'exit', e),
              enter: _n(s, 'enter', e),
            }))
          : !c && l && !d
          ? (i[a] = ir(s, {
              in: !1,
            }))
          : c &&
            l &&
            rr(u) &&
            (i[a] = ir(s, {
              onExited: o.bind(null, s),
              in: u.props.in,
              exit: _n(s, 'exit', e),
              enter: _n(s, 'enter', e),
            }));
      }
    }),
    i
  );
}
var Pg =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  Ig = {
    component: 'div',
    childFactory: function (t) {
      return t;
    },
  },
  ba = /* @__PURE__ */ (function (e) {
    $c(t, e);
    function t(r, i) {
      var a;
      a = e.call(this, r, i) || this;
      var s = a.handleExited.bind(Sg(a));
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
          children: c ? Ng(i, l) : $g(i, s, l),
          firstRender: !1,
        };
      }),
      (o.handleExited = function (i, a) {
        var s = ha(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(a),
          this.mounted &&
            this.setState(function (l) {
              var c = g({}, l.children);
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
          l = ye(i, ['component', 'childFactory']),
          c = this.state.contextValue,
          u = Pg(this.state.children).map(s);
        return (
          delete l.appear,
          delete l.enter,
          delete l.exit,
          a === null
            ? /* @__PURE__ */ Gt.createElement(
                Er.Provider,
                {
                  value: c,
                },
                u,
              )
            : /* @__PURE__ */ Gt.createElement(
                Er.Provider,
                {
                  value: c,
                },
                /* @__PURE__ */ Gt.createElement(a, l, u),
              )
        );
      }),
      t
    );
  })(Gt.Component);
ba.propTypes =
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
ba.defaultProps = Ig;
const _g = ba,
  ga = (e) => e.scrollTop;
function lo(e, t) {
  var o, r;
  const { timeout: i, easing: a, style: s = {} } = e;
  return {
    duration: (o = s.transitionDuration) != null ? o : typeof i == 'number' ? i : i[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == 'object' ? a[t.mode] : a,
    delay: s.transitionDelay,
  };
}
function Mg(e) {
  return $e('MuiPaper', e);
}
Se('MuiPaper', [
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
const Ag = ['className', 'component', 'elevation', 'square', 'variant'],
  Dg = (e) => {
    const { square: t, elevation: o, variant: r, classes: i } = e,
      a = {
        root: ['root', r, !t && 'rounded', r === 'elevation' && `elevation${o}`],
      };
    return _e(a, Mg, i);
  },
  Lg = ce('div', {
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
              backgroundImage: `linear-gradient(${Je('#fff', ws(t.elevation))}, ${Je(
                '#fff',
                ws(t.elevation),
              )})`,
            },
          e.vars && {
            backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[t.elevation],
          },
        ),
    );
  }),
  Pc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiPaper',
      }),
      {
        className: i,
        component: a = 'div',
        elevation: s = 1,
        square: l = !1,
        variant: c = 'elevation',
      } = r,
      u = ye(r, Ag),
      d = g({}, r, {
        component: a,
        elevation: s,
        square: l,
        variant: c,
      }),
      p = Dg(d);
    return (
      process.env.NODE_ENV !== 'production' &&
        hn().shadows[s] === void 0 &&
        console.error(
          [
            `MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,
            `Please make sure that \`theme.shadows[${s}]\` is defined.`,
          ].join(`
`),
        ),
      /* @__PURE__ */ _(
        Lg,
        g(
          {
            as: a,
            ownerState: d,
            className: ve(p.root, i),
            ref: o,
          },
          u,
        ),
      )
    );
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
     * Shadow depth, corresponds to `dp` in the spec.
     * It accepts values between 0 and 24 inclusive.
     * @default 1
     */
    elevation: Bt(Or, (e) => {
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
const Bn = Pc;
function Ic(e) {
  const {
      className: t,
      classes: o,
      pulsate: r = !1,
      rippleX: i,
      rippleY: a,
      rippleSize: s,
      in: l,
      onExited: c,
      timeout: u,
    } = e,
    [d, p] = y.useState(!1),
    h = ve(t, o.ripple, o.rippleVisible, r && o.ripplePulsate),
    v = {
      width: s,
      height: s,
      top: -(s / 2) + a,
      left: -(s / 2) + i,
    },
    x = ve(o.child, d && o.childLeaving, r && o.childPulsate);
  return (
    !l && !d && p(!0),
    y.useEffect(() => {
      if (!l && c != null) {
        const b = setTimeout(c, u);
        return () => {
          clearTimeout(b);
        };
      }
    }, [c, l, u]),
    /* @__PURE__ */ _('span', {
      className: h,
      style: v,
      children: /* @__PURE__ */ _('span', {
        className: x,
      }),
    })
  );
}
process.env.NODE_ENV !== 'production' &&
  (Ic.propTypes = {
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
const jg = Se('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  jt = jg,
  Fg = ['center', 'classes', 'className'];
let Yr = (e) => e,
  Js,
  Zs,
  Qs,
  el;
const Mi = 550,
  Bg = 80,
  zg = Qi(
    Js ||
      (Js = Yr`
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
  Vg = Qi(
    Zs ||
      (Zs = Yr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
  ),
  Ug = Qi(
    Qs ||
      (Qs = Yr`
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
  Wg = ce('span', {
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
  Hg = ce(Ic, {
    name: 'MuiTouchRipple',
    slot: 'Ripple',
  })(
    el ||
      (el = Yr`
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
    jt.rippleVisible,
    zg,
    Mi,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    jt.ripplePulsate,
    ({ theme: e }) => e.transitions.duration.shorter,
    jt.child,
    jt.childLeaving,
    Vg,
    Mi,
    ({ theme: e }) => e.transitions.easing.easeInOut,
    jt.childPulsate,
    Ug,
    ({ theme: e }) => e.transitions.easing.easeInOut,
  ),
  _c = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiTouchRipple',
      }),
      { center: i = !1, classes: a = {}, className: s } = r,
      l = ye(r, Fg),
      [c, u] = y.useState([]),
      d = y.useRef(0),
      p = y.useRef(null);
    y.useEffect(() => {
      p.current && (p.current(), (p.current = null));
    }, [c]);
    const h = y.useRef(!1),
      v = y.useRef(null),
      x = y.useRef(null),
      b = y.useRef(null);
    y.useEffect(
      () => () => {
        clearTimeout(v.current);
      },
      [],
    );
    const m = y.useCallback(
        (E) => {
          const { pulsate: f, rippleX: S, rippleY: w, rippleSize: j, cb: L } = E;
          u((D) => [
            ...D,
            /* @__PURE__ */ _(
              Hg,
              {
                classes: {
                  ripple: ve(a.ripple, jt.ripple),
                  rippleVisible: ve(a.rippleVisible, jt.rippleVisible),
                  ripplePulsate: ve(a.ripplePulsate, jt.ripplePulsate),
                  child: ve(a.child, jt.child),
                  childLeaving: ve(a.childLeaving, jt.childLeaving),
                  childPulsate: ve(a.childPulsate, jt.childPulsate),
                },
                timeout: Mi,
                pulsate: f,
                rippleX: S,
                rippleY: w,
                rippleSize: j,
              },
              d.current,
            ),
          ]),
            (d.current += 1),
            (p.current = L);
        },
        [a],
      ),
      k = y.useCallback(
        (E = {}, f = {}, S = () => {}) => {
          const {
            pulsate: w = !1,
            center: j = i || f.pulsate,
            fakeElement: L = !1,
            // For test purposes
          } = f;
          if ((E == null ? void 0 : E.type) === 'mousedown' && h.current) {
            h.current = !1;
            return;
          }
          (E == null ? void 0 : E.type) === 'touchstart' && (h.current = !0);
          const D = L ? null : b.current,
            I = D
              ? D.getBoundingClientRect()
              : {
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                };
          let q, V, A;
          if (
            j ||
            E === void 0 ||
            (E.clientX === 0 && E.clientY === 0) ||
            (!E.clientX && !E.touches)
          )
            (q = Math.round(I.width / 2)), (V = Math.round(I.height / 2));
          else {
            const { clientX: F, clientY: B } = E.touches && E.touches.length > 0 ? E.touches[0] : E;
            (q = Math.round(F - I.left)), (V = Math.round(B - I.top));
          }
          if (j) (A = Math.sqrt((2 * I.width ** 2 + I.height ** 2) / 3)), A % 2 === 0 && (A += 1);
          else {
            const F = Math.max(Math.abs((D ? D.clientWidth : 0) - q), q) * 2 + 2,
              B = Math.max(Math.abs((D ? D.clientHeight : 0) - V), V) * 2 + 2;
            A = Math.sqrt(F ** 2 + B ** 2);
          }
          E != null && E.touches
            ? x.current === null &&
              ((x.current = () => {
                m({
                  pulsate: w,
                  rippleX: q,
                  rippleY: V,
                  rippleSize: A,
                  cb: S,
                });
              }),
              (v.current = setTimeout(() => {
                x.current && (x.current(), (x.current = null));
              }, Bg)))
            : m({
                pulsate: w,
                rippleX: q,
                rippleY: V,
                rippleSize: A,
                cb: S,
              });
        },
        [i, m],
      ),
      T = y.useCallback(() => {
        k(
          {},
          {
            pulsate: !0,
          },
        );
      }, [k]),
      C = y.useCallback((E, f) => {
        if ((clearTimeout(v.current), (E == null ? void 0 : E.type) === 'touchend' && x.current)) {
          x.current(),
            (x.current = null),
            (v.current = setTimeout(() => {
              C(E, f);
            }));
          return;
        }
        (x.current = null), u((S) => (S.length > 0 ? S.slice(1) : S)), (p.current = f);
      }, []);
    return (
      y.useImperativeHandle(
        o,
        () => ({
          pulsate: T,
          start: k,
          stop: C,
        }),
        [T, k, C],
      ),
      /* @__PURE__ */ _(
        Wg,
        g(
          {
            className: ve(jt.root, a.root, s),
            ref: b,
          },
          l,
          {
            children: /* @__PURE__ */ _(_g, {
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
  (_c.propTypes = {
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
const qg = _c;
function Yg(e) {
  return $e('MuiButtonBase', e);
}
const Gg = Se('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  Kg = Gg,
  Xg = [
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
  Jg = (e) => {
    const { disabled: t, focusVisible: o, focusVisibleClassName: r, classes: i } = e,
      s = _e(
        {
          root: ['root', t && 'disabled', o && 'focusVisible'],
        },
        Yg,
        i,
      );
    return o && r && (s.root += ` ${r}`), s;
  },
  Zg = ce('button', {
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
    [`&.${Kg.disabled}`]: {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
  }),
  Mc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiButtonBase',
      }),
      {
        action: i,
        centerRipple: a = !1,
        children: s,
        className: l,
        component: c = 'button',
        disabled: u = !1,
        disableRipple: d = !1,
        disableTouchRipple: p = !1,
        focusRipple: h = !1,
        LinkComponent: v = 'a',
        onBlur: x,
        onClick: b,
        onContextMenu: m,
        onDragLeave: k,
        onFocus: T,
        onFocusVisible: C,
        onKeyDown: E,
        onKeyUp: f,
        onMouseDown: S,
        onMouseLeave: w,
        onMouseUp: j,
        onTouchEnd: L,
        onTouchMove: D,
        onTouchStart: I,
        tabIndex: q = 0,
        TouchRippleProps: V,
        touchRippleRef: A,
        type: F,
      } = r,
      B = ye(r, Xg),
      te = y.useRef(null),
      U = y.useRef(null),
      W = ut(U, A),
      { isFocusVisibleRef: R, onFocus: z, onBlur: Z, ref: G } = Bl(),
      [H, re] = y.useState(!1);
    u && H && re(!1),
      y.useImperativeHandle(
        i,
        () => ({
          focusVisible: () => {
            re(!0), te.current.focus();
          },
        }),
        [],
      );
    const [ie, Q] = y.useState(!1);
    y.useEffect(() => {
      Q(!0);
    }, []);
    const se = ie && !d && !u;
    y.useEffect(() => {
      H && h && !d && ie && U.current.pulsate();
    }, [d, h, H, ie]);
    function le(de, ne, Ee = p) {
      return Ct((Ce) => (ne && ne(Ce), !Ee && U.current && U.current[de](Ce), !0));
    }
    const he = le('start', S),
      ae = le('stop', m),
      P = le('stop', k),
      Oe = le('stop', j),
      M = le('stop', (de) => {
        H && de.preventDefault(), w && w(de);
      }),
      Y = le('start', I),
      Pe = le('stop', L),
      ge = le('stop', D),
      et = le(
        'stop',
        (de) => {
          Z(de), R.current === !1 && re(!1), x && x(de);
        },
        !1,
      ),
      Be = Ct((de) => {
        te.current || (te.current = de.currentTarget),
          z(de),
          R.current === !0 && (re(!0), C && C(de)),
          T && T(de);
      }),
      ke = () => {
        const de = te.current;
        return c && c !== 'button' && !(de.tagName === 'A' && de.href);
      },
      Re = y.useRef(!1),
      tt = Ct((de) => {
        h &&
          !Re.current &&
          H &&
          U.current &&
          de.key === ' ' &&
          ((Re.current = !0),
          U.current.stop(de, () => {
            U.current.start(de);
          })),
          de.target === de.currentTarget && ke() && de.key === ' ' && de.preventDefault(),
          E && E(de),
          de.target === de.currentTarget &&
            ke() &&
            de.key === 'Enter' &&
            !u &&
            (de.preventDefault(), b && b(de));
      }),
      it = Ct((de) => {
        h &&
          de.key === ' ' &&
          U.current &&
          H &&
          !de.defaultPrevented &&
          ((Re.current = !1),
          U.current.stop(de, () => {
            U.current.pulsate(de);
          })),
          f && f(de),
          b &&
            de.target === de.currentTarget &&
            ke() &&
            de.key === ' ' &&
            !de.defaultPrevented &&
            b(de);
      });
    let ee = c;
    ee === 'button' && (B.href || B.to) && (ee = v);
    const me = {};
    ee === 'button'
      ? ((me.type = F === void 0 ? 'button' : F), (me.disabled = u))
      : (!B.href && !B.to && (me.role = 'button'), u && (me['aria-disabled'] = u));
    const xe = ut(o, G, te);
    process.env.NODE_ENV !== 'production' &&
      y.useEffect(() => {
        se &&
          !U.current &&
          console.error(
            [
              'MUI: The `component` prop provided to ButtonBase is invalid.',
              'Please make sure the children prop is rendered in this custom component.',
            ].join(`
`),
          );
      }, [se]);
    const be = g({}, r, {
        centerRipple: a,
        component: c,
        disabled: u,
        disableRipple: d,
        disableTouchRipple: p,
        focusRipple: h,
        tabIndex: q,
        focusVisible: H,
      }),
      fe = Jg(be);
    return /* @__PURE__ */ Ze(
      Zg,
      g(
        {
          as: ee,
          className: ve(fe.root, l),
          ownerState: be,
          onBlur: et,
          onClick: b,
          onContextMenu: ae,
          onFocus: Be,
          onKeyDown: tt,
          onKeyUp: it,
          onMouseDown: he,
          onMouseLeave: M,
          onMouseUp: Oe,
          onDragLeave: P,
          onTouchEnd: Pe,
          onTouchMove: ge,
          onTouchStart: Y,
          ref: xe,
          tabIndex: u ? -1 : q,
          type: F,
        },
        me,
        B,
        {
          children: [
            s,
            se
              ? /* TouchRipple is only needed client-side, x2 boost on the server. */
                /* @__PURE__ */ _(
                  qg,
                  g(
                    {
                      ref: W,
                      center: a,
                    },
                    V,
                  ),
                )
              : null,
          ],
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
    component: zi,
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
const co = Mc;
function Qg(e) {
  return $e('MuiIconButton', e);
}
const ev = Se('MuiIconButton', [
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
  tv = ev,
  nv = ['edge', 'children', 'className', 'color', 'disabled', 'disableFocusRipple', 'size'],
  ov = (e) => {
    const { classes: t, disabled: o, color: r, edge: i, size: a } = e,
      s = {
        root: [
          'root',
          o && 'disabled',
          r !== 'default' && `color${J(r)}`,
          i && `edge${J(i)}`,
          `size${J(a)}`,
        ],
      };
    return _e(s, Qg, t);
  },
  rv = ce(co, {
    name: 'MuiIconButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${J(o.color)}`],
        o.edge && t[`edge${J(o.edge)}`],
        t[`size${J(o.size)}`],
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
          [`&.${tv.disabled}`]: {
            backgroundColor: 'transparent',
            color: (e.vars || e).palette.action.disabled,
          },
        },
      );
    },
  ),
  Ac = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiIconButton',
      }),
      {
        edge: i = !1,
        children: a,
        className: s,
        color: l = 'default',
        disabled: c = !1,
        disableFocusRipple: u = !1,
        size: d = 'medium',
      } = r,
      p = ye(r, nv),
      h = g({}, r, {
        edge: i,
        color: l,
        disabled: c,
        disableFocusRipple: u,
        size: d,
      }),
      v = ov(h);
    return /* @__PURE__ */ _(
      rv,
      g(
        {
          className: ve(v.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: c,
          ref: o,
          ownerState: h,
        },
        p,
        {
          children: a,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ac.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The icon to display.
     */
    children: Bt(n.node, (e) =>
      y.Children.toArray(e.children).some(
        (o) => /* @__PURE__ */ y.isValidElement(o) && o.props.onClick,
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
const va = Ac,
  iv = Fn(
    /* @__PURE__ */ _('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    }),
    'Close',
  );
function av(e) {
  return $e('MuiAppBar', e);
}
Se('MuiAppBar', [
  'root',
  'positionFixed',
  'positionAbsolute',
  'positionSticky',
  'positionStatic',
  'positionRelative',
  'colorDefault',
  'colorPrimary',
  'colorSecondary',
  'colorInherit',
  'colorTransparent',
]);
const sv = ['className', 'color', 'enableColorOnDark', 'position'],
  lv = (e) => {
    const { color: t, position: o, classes: r } = e,
      i = {
        root: ['root', `color${J(t)}`, `position${J(o)}`],
      };
    return _e(i, av, r);
  },
  er = (e, t) => (e ? `${e == null ? void 0 : e.replace(')', '')}, ${t})` : t),
  cv = ce(Bn, {
    name: 'MuiAppBar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, t[`position${J(o.position)}`], t[`color${J(o.color)}`]];
    },
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? e.palette.grey[100] : e.palette.grey[900];
    return g(
      {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
        // Prevent padding issue with the Modal and fixed positioned AppBar.
        flexShrink: 0,
      },
      t.position === 'fixed' && {
        position: 'fixed',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
        '@media print': {
          // Prevent the app bar to be visible on each printed page.
          position: 'absolute',
        },
      },
      t.position === 'absolute' && {
        position: 'absolute',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
      },
      t.position === 'sticky' && {
        // ⚠️ sticky is not supported by IE11.
        position: 'sticky',
        zIndex: (e.vars || e).zIndex.appBar,
        top: 0,
        left: 'auto',
        right: 0,
      },
      t.position === 'static' && {
        position: 'static',
      },
      t.position === 'relative' && {
        position: 'relative',
      },
      !e.vars &&
        g(
          {},
          t.color === 'default' && {
            backgroundColor: o,
            color: e.palette.getContrastText(o),
          },
          t.color &&
            t.color !== 'default' &&
            t.color !== 'inherit' &&
            t.color !== 'transparent' && {
              backgroundColor: e.palette[t.color].main,
              color: e.palette[t.color].contrastText,
            },
          t.color === 'inherit' && {
            color: 'inherit',
          },
          e.palette.mode === 'dark' &&
            !t.enableColorOnDark && {
              backgroundColor: null,
              color: null,
            },
          t.color === 'transparent' &&
            g(
              {
                backgroundColor: 'transparent',
                color: 'inherit',
              },
              e.palette.mode === 'dark' && {
                backgroundImage: 'none',
              },
            ),
        ),
      e.vars &&
        g(
          {},
          t.color === 'default' && {
            '--AppBar-background': t.enableColorOnDark
              ? e.vars.palette.AppBar.defaultBg
              : er(e.vars.palette.AppBar.darkBg, e.vars.palette.AppBar.defaultBg),
            '--AppBar-color': t.enableColorOnDark
              ? e.vars.palette.text.primary
              : er(e.vars.palette.AppBar.darkColor, e.vars.palette.text.primary),
          },
          t.color &&
            !t.color.match(/^(default|inherit|transparent)$/) && {
              '--AppBar-background': t.enableColorOnDark
                ? e.vars.palette[t.color].main
                : er(e.vars.palette.AppBar.darkBg, e.vars.palette[t.color].main),
              '--AppBar-color': t.enableColorOnDark
                ? e.vars.palette[t.color].contrastText
                : er(e.vars.palette.AppBar.darkColor, e.vars.palette[t.color].contrastText),
            },
          {
            backgroundColor: 'var(--AppBar-background)',
            color: t.color === 'inherit' ? 'inherit' : 'var(--AppBar-color)',
          },
          t.color === 'transparent' && {
            backgroundImage: 'none',
            backgroundColor: 'transparent',
            color: 'inherit',
          },
        ),
    );
  }),
  Dc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiAppBar',
      }),
      { className: i, color: a = 'primary', enableColorOnDark: s = !1, position: l = 'fixed' } = r,
      c = ye(r, sv),
      u = g({}, r, {
        color: a,
        position: l,
        enableColorOnDark: s,
      }),
      d = lv(u);
    return /* @__PURE__ */ _(
      cv,
      g(
        {
          square: !0,
          component: 'header',
          ownerState: u,
          elevation: 4,
          className: ve(d.root, i, l === 'fixed' && 'mui-fixed'),
          ref: o,
        },
        c,
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Dc.propTypes = {
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
      n.oneOf(['default', 'inherit', 'primary', 'secondary', 'transparent']),
      n.string,
    ]),
    /**
     * If true, the `color` prop is applied in dark mode.
     * @default false
     */
    enableColorOnDark: n.bool,
    /**
     * The positioning type. The behavior of the different options is described
     * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
     * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
     * @default 'fixed'
     */
    position: n.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  });
const uv = Dc,
  dv = ['components', 'componentsProps', 'slots', 'slotProps'],
  pv = ce(Hb, {
    name: 'MuiPopper',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Lc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r;
    const i = dc(),
      a = Ae({
        props: t,
        name: 'MuiPopper',
      }),
      { components: s, componentsProps: l, slots: c, slotProps: u } = a,
      d = ye(a, dv),
      p = (r = c == null ? void 0 : c.root) != null ? r : s == null ? void 0 : s.Root;
    return /* @__PURE__ */ _(
      pv,
      g(
        {
          direction: i == null ? void 0 : i.direction,
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
  (Lc.propTypes = {
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
    anchorEl: n.oneOfType([Jt, n.object, n.func]),
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
    container: n.oneOfType([Jt, n.func]),
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
const jc = Lc;
function fv(e) {
  return $e('MuiListSubheader', e);
}
Se('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
const mv = ['className', 'color', 'component', 'disableGutters', 'disableSticky', 'inset'],
  hv = (e) => {
    const { classes: t, color: o, disableGutters: r, inset: i, disableSticky: a } = e,
      s = {
        root: [
          'root',
          o !== 'default' && `color${J(o)}`,
          !r && 'gutters',
          i && 'inset',
          !a && 'sticky',
        ],
      };
    return _e(s, fv, t);
  },
  bv = ce('li', {
    name: 'MuiListSubheader',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.color !== 'default' && t[`color${J(o.color)}`],
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
  ya = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiListSubheader',
      }),
      {
        className: i,
        color: a = 'default',
        component: s = 'li',
        disableGutters: l = !1,
        disableSticky: c = !1,
        inset: u = !1,
      } = r,
      d = ye(r, mv),
      p = g({}, r, {
        color: a,
        component: s,
        disableGutters: l,
        disableSticky: c,
        inset: u,
      }),
      h = hv(p);
    return /* @__PURE__ */ _(
      bv,
      g(
        {
          as: s,
          className: ve(h.root, i),
          ref: o,
          ownerState: p,
        },
        d,
      ),
    );
  });
ya.muiSkipListHighlight = !0;
process.env.NODE_ENV !== 'production' &&
  (ya.propTypes = {
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
const gv = ya,
  vv = Fn(
    /* @__PURE__ */ _('path', {
      d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    }),
    'Cancel',
  );
function yv(e) {
  return $e('MuiChip', e);
}
const xv = Se('MuiChip', [
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
  Fe = xv,
  Ev = [
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
  Cv = (e) => {
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
      u = {
        root: [
          'root',
          c,
          o && 'disabled',
          `size${J(r)}`,
          `color${J(i)}`,
          l && 'clickable',
          l && `clickableColor${J(i)}`,
          s && 'deletable',
          s && `deletableColor${J(i)}`,
          `${c}${J(i)}`,
        ],
        label: ['label', `label${J(r)}`],
        avatar: ['avatar', `avatar${J(r)}`, `avatarColor${J(i)}`],
        icon: ['icon', `icon${J(r)}`, `iconColor${J(a)}`],
        deleteIcon: [
          'deleteIcon',
          `deleteIcon${J(r)}`,
          `deleteIconColor${J(i)}`,
          `deleteIcon${J(c)}Color${J(i)}`,
        ],
      };
    return _e(u, yv, t);
  },
  Ov = ce('div', {
    name: 'MuiChip',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { color: r, iconColor: i, clickable: a, onDelete: s, size: l, variant: c } = o;
      return [
        {
          [`& .${Fe.avatar}`]: t.avatar,
        },
        {
          [`& .${Fe.avatar}`]: t[`avatar${J(l)}`],
        },
        {
          [`& .${Fe.avatar}`]: t[`avatarColor${J(r)}`],
        },
        {
          [`& .${Fe.icon}`]: t.icon,
        },
        {
          [`& .${Fe.icon}`]: t[`icon${J(l)}`],
        },
        {
          [`& .${Fe.icon}`]: t[`iconColor${J(i)}`],
        },
        {
          [`& .${Fe.deleteIcon}`]: t.deleteIcon,
        },
        {
          [`& .${Fe.deleteIcon}`]: t[`deleteIcon${J(l)}`],
        },
        {
          [`& .${Fe.deleteIcon}`]: t[`deleteIconColor${J(r)}`],
        },
        {
          [`& .${Fe.deleteIcon}`]: t[`deleteIcon${J(c)}Color${J(r)}`],
        },
        t.root,
        t[`size${J(l)}`],
        t[`color${J(r)}`],
        a && t.clickable,
        a && r !== 'default' && t[`clickableColor${J(r)})`],
        s && t.deletable,
        s && r !== 'default' && t[`deletableColor${J(r)}`],
        t[c],
        t[`${c}${J(r)}`],
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
          [`&.${Fe.disabled}`]: {
            opacity: (e.vars || e).palette.action.disabledOpacity,
            pointerEvents: 'none',
          },
          [`& .${Fe.avatar}`]: {
            marginLeft: 5,
            marginRight: -6,
            width: 24,
            height: 24,
            color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : r,
            fontSize: e.typography.pxToRem(12),
          },
          [`& .${Fe.avatarColorPrimary}`]: {
            color: (e.vars || e).palette.primary.contrastText,
            backgroundColor: (e.vars || e).palette.primary.dark,
          },
          [`& .${Fe.avatarColorSecondary}`]: {
            color: (e.vars || e).palette.secondary.contrastText,
            backgroundColor: (e.vars || e).palette.secondary.dark,
          },
          [`& .${Fe.avatarSmall}`]: {
            marginLeft: 4,
            marginRight: -4,
            width: 18,
            height: 18,
            fontSize: e.typography.pxToRem(10),
          },
          [`& .${Fe.icon}`]: g(
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
          [`& .${Fe.deleteIcon}`]: g(
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
          [`&.${Fe.focusVisible}`]: {
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
            [`&.${Fe.focusVisible}`]: {
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
          [`&.${Fe.focusVisible}`]: {
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
            [`&:hover, &.${Fe.focusVisible}`]: {
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
          [`&.${Fe.clickable}:hover`]: {
            backgroundColor: (e.vars || e).palette.action.hover,
          },
          [`&.${Fe.focusVisible}`]: {
            backgroundColor: (e.vars || e).palette.action.focus,
          },
          [`& .${Fe.avatar}`]: {
            marginLeft: 4,
          },
          [`& .${Fe.avatarSmall}`]: {
            marginLeft: 2,
          },
          [`& .${Fe.icon}`]: {
            marginLeft: 4,
          },
          [`& .${Fe.iconSmall}`]: {
            marginLeft: 2,
          },
          [`& .${Fe.deleteIcon}`]: {
            marginRight: 5,
          },
          [`& .${Fe.deleteIconSmall}`]: {
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
            [`&.${Fe.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : Je(e.palette[t.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${Fe.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : Je(e.palette[t.color].main, e.palette.action.focusOpacity),
            },
            [`& .${Fe.deleteIcon}`]: {
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
  Tv = ce('span', {
    name: 'MuiChip',
    slot: 'Label',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { size: r } = o;
      return [t.label, t[`label${J(r)}`]];
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
function tl(e) {
  return e.key === 'Backspace' || e.key === 'Delete';
}
const Fc = /* @__PURE__ */ y.forwardRef(function (t, o) {
  const r = Ae({
      props: t,
      name: 'MuiChip',
    }),
    {
      avatar: i,
      className: a,
      clickable: s,
      color: l = 'default',
      component: c,
      deleteIcon: u,
      disabled: d = !1,
      icon: p,
      label: h,
      onClick: v,
      onDelete: x,
      onKeyDown: b,
      onKeyUp: m,
      size: k = 'medium',
      variant: T = 'filled',
      tabIndex: C,
      skipFocusWhenDisabled: E = !1,
    } = r,
    f = ye(r, Ev),
    S = y.useRef(null),
    w = ut(S, o),
    j = (W) => {
      W.stopPropagation(), x && x(W);
    },
    L = (W) => {
      W.currentTarget === W.target && tl(W) && W.preventDefault(), b && b(W);
    },
    D = (W) => {
      W.currentTarget === W.target &&
        (x && tl(W) ? x(W) : W.key === 'Escape' && S.current && S.current.blur()),
        m && m(W);
    },
    I = s !== !1 && v ? !0 : s,
    q = I || x ? co : c || 'div',
    V = g({}, r, {
      component: q,
      disabled: d,
      size: k,
      color: l,
      iconColor: /* @__PURE__ */ (y.isValidElement(p) && p.props.color) || l,
      onDelete: !!x,
      clickable: I,
      variant: T,
    }),
    A = Cv(V),
    F =
      q === co
        ? g(
            {
              component: c || 'div',
              focusVisibleClassName: A.focusVisible,
            },
            x && {
              disableRipple: !0,
            },
          )
        : {};
  let B = null;
  x &&
    (B =
      u && /* @__PURE__ */ y.isValidElement(u)
        ? /* @__PURE__ */ y.cloneElement(u, {
            className: ve(u.props.className, A.deleteIcon),
            onClick: j,
          })
        : /* @__PURE__ */ _(vv, {
            className: ve(A.deleteIcon),
            onClick: j,
          }));
  let te = null;
  i &&
    /* @__PURE__ */ y.isValidElement(i) &&
    (te = /* @__PURE__ */ y.cloneElement(i, {
      className: ve(A.avatar, i.props.className),
    }));
  let U = null;
  return (
    p &&
      /* @__PURE__ */ y.isValidElement(p) &&
      (U = /* @__PURE__ */ y.cloneElement(p, {
        className: ve(A.icon, p.props.className),
      })),
    process.env.NODE_ENV !== 'production' &&
      te &&
      U &&
      console.error(
        'MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.',
      ),
    /* @__PURE__ */ Ze(
      Ov,
      g(
        {
          as: q,
          className: ve(A.root, a),
          disabled: I && d ? !0 : void 0,
          onClick: v,
          onKeyDown: L,
          onKeyUp: D,
          ref: w,
          tabIndex: E && d ? -1 : C,
          ownerState: V,
        },
        F,
        f,
        {
          children: [
            te || U,
            /* @__PURE__ */ _(Tv, {
              className: ve(A.label),
              ownerState: V,
              children: h,
            }),
            B,
          ],
        },
      ),
    )
  );
});
process.env.NODE_ENV !== 'production' &&
  (Fc.propTypes = {
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
    children: jd,
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
const kv = Fc;
function po({ props: e, states: t, muiFormControl: o }) {
  return t.reduce((r, i) => ((r[i] = e[i]), o && typeof e[i] > 'u' && (r[i] = o[i]), r), {});
}
const Bc = /* @__PURE__ */ y.createContext(void 0);
process.env.NODE_ENV !== 'production' && (Bc.displayName = 'FormControlContext');
const xa = Bc;
function zn() {
  return y.useContext(xa);
}
function zc(e) {
  return /* @__PURE__ */ _(
    ic,
    g({}, e, {
      defaultTheme: Ur,
    }),
  );
}
process.env.NODE_ENV !== 'production' &&
  (zc.propTypes = {
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
function nl(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function Ea(e, t = !1) {
  return (
    e && ((nl(e.value) && e.value !== '') || (t && nl(e.defaultValue) && e.defaultValue !== ''))
  );
}
function wv(e) {
  return e.startAdornment;
}
function Sv(e) {
  return $e('MuiInputBase', e);
}
const Rv = Se('MuiInputBase', [
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
  $t = Rv,
  Nv = [
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
  Gr = (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      o.formControl && t.formControl,
      o.startAdornment && t.adornedStart,
      o.endAdornment && t.adornedEnd,
      o.error && t.error,
      o.size === 'small' && t.sizeSmall,
      o.multiline && t.multiline,
      o.color && t[`color${J(o.color)}`],
      o.fullWidth && t.fullWidth,
      o.hiddenLabel && t.hiddenLabel,
    ];
  },
  Kr = (e, t) => {
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
  $v = (e) => {
    const {
        classes: t,
        color: o,
        disabled: r,
        error: i,
        endAdornment: a,
        focused: s,
        formControl: l,
        fullWidth: c,
        hiddenLabel: u,
        multiline: d,
        readOnly: p,
        size: h,
        startAdornment: v,
        type: x,
      } = e,
      b = {
        root: [
          'root',
          `color${J(o)}`,
          r && 'disabled',
          i && 'error',
          c && 'fullWidth',
          s && 'focused',
          l && 'formControl',
          h === 'small' && 'sizeSmall',
          d && 'multiline',
          v && 'adornedStart',
          a && 'adornedEnd',
          u && 'hiddenLabel',
          p && 'readOnly',
        ],
        input: [
          'input',
          r && 'disabled',
          x === 'search' && 'inputTypeSearch',
          d && 'inputMultiline',
          h === 'small' && 'inputSizeSmall',
          u && 'inputHiddenLabel',
          v && 'inputAdornedStart',
          a && 'inputAdornedEnd',
          p && 'readOnly',
        ],
      };
    return _e(b, Sv, t);
  },
  Xr = ce('div', {
    name: 'MuiInputBase',
    slot: 'Root',
    overridesResolver: Gr,
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
  Jr = ce('input', {
    name: 'MuiInputBase',
    slot: 'Input',
    overridesResolver: Kr,
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
  Pv = /* @__PURE__ */ _(zc, {
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
  Vc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r;
    const i = Ae({
        props: t,
        name: 'MuiInputBase',
      }),
      {
        'aria-describedby': a,
        autoComplete: s,
        autoFocus: l,
        className: c,
        components: u = {},
        componentsProps: d = {},
        defaultValue: p,
        disabled: h,
        disableInjectingGlobalStyles: v,
        endAdornment: x,
        fullWidth: b = !1,
        id: m,
        inputComponent: k = 'input',
        inputProps: T = {},
        inputRef: C,
        maxRows: E,
        minRows: f,
        multiline: S = !1,
        name: w,
        onBlur: j,
        onChange: L,
        onClick: D,
        onFocus: I,
        onKeyDown: q,
        onKeyUp: V,
        placeholder: A,
        readOnly: F,
        renderSuffix: B,
        rows: te,
        slotProps: U = {},
        slots: W = {},
        startAdornment: R,
        type: z = 'text',
        value: Z,
      } = i,
      G = ye(i, Nv),
      H = T.value != null ? T.value : Z,
      { current: re } = y.useRef(H != null),
      ie = y.useRef(),
      Q = y.useCallback((fe) => {
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
      se = ut(ie, C, T.ref, Q),
      [le, he] = y.useState(!1),
      ae = zn();
    process.env.NODE_ENV !== 'production' &&
      y.useEffect(() => {
        if (ae) return ae.registerEffect();
      }, [ae]);
    const P = po({
      props: i,
      muiFormControl: ae,
      states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
    });
    (P.focused = ae ? ae.focused : le),
      y.useEffect(() => {
        !ae && h && le && (he(!1), j && j());
      }, [ae, h, le, j]);
    const Oe = ae && ae.onFilled,
      M = ae && ae.onEmpty,
      Y = y.useCallback(
        (fe) => {
          Ea(fe) ? Oe && Oe() : M && M();
        },
        [Oe, M],
      );
    an(() => {
      re &&
        Y({
          value: H,
        });
    }, [H, Y, re]);
    const Pe = (fe) => {
        if (P.disabled) {
          fe.stopPropagation();
          return;
        }
        I && I(fe), T.onFocus && T.onFocus(fe), ae && ae.onFocus ? ae.onFocus(fe) : he(!0);
      },
      ge = (fe) => {
        j && j(fe), T.onBlur && T.onBlur(fe), ae && ae.onBlur ? ae.onBlur(fe) : he(!1);
      },
      et = (fe, ...de) => {
        if (!re) {
          const ne = fe.target || ie.current;
          if (ne == null)
            throw new Error(
              process.env.NODE_ENV !== 'production'
                ? 'MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.'
                : Tn(1),
            );
          Y({
            value: ne.value,
          });
        }
        T.onChange && T.onChange(fe, ...de), L && L(fe, ...de);
      };
    y.useEffect(() => {
      Y(ie.current);
    }, []);
    const Be = (fe) => {
      ie.current && fe.currentTarget === fe.target && ie.current.focus(), D && D(fe);
    };
    let ke = k,
      Re = T;
    S &&
      ke === 'input' &&
      (te
        ? (process.env.NODE_ENV !== 'production' &&
            (f || E) &&
            console.warn(
              'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
            ),
          (Re = g(
            {
              type: void 0,
              minRows: te,
              maxRows: te,
            },
            Re,
          )))
        : (Re = g(
            {
              type: void 0,
              maxRows: E,
              minRows: f,
            },
            Re,
          )),
      (ke = mg));
    const tt = (fe) => {
      Y(
        fe.animationName === 'mui-auto-fill-cancel'
          ? ie.current
          : {
              value: 'x',
            },
      );
    };
    y.useEffect(() => {
      ae && ae.setAdornedStart(!!R);
    }, [ae, R]);
    const it = g({}, i, {
        color: P.color || 'primary',
        disabled: P.disabled,
        endAdornment: x,
        error: P.error,
        focused: P.focused,
        formControl: ae,
        fullWidth: b,
        hiddenLabel: P.hiddenLabel,
        multiline: S,
        size: P.size,
        startAdornment: R,
        type: z,
      }),
      ee = $v(it),
      me = W.root || u.Root || Xr,
      xe = U.root || d.root || {},
      be = W.input || u.Input || Jr;
    return (
      (Re = g({}, Re, (r = U.input) != null ? r : d.input)),
      /* @__PURE__ */ Ze(y.Fragment, {
        children: [
          !v && Pv,
          /* @__PURE__ */ Ze(
            me,
            g(
              {},
              xe,
              !On(me) && {
                ownerState: g({}, it, xe.ownerState),
              },
              {
                ref: o,
                onClick: Be,
              },
              G,
              {
                className: ve(ee.root, xe.className, c, F && 'MuiInputBase-readOnly'),
                children: [
                  R,
                  /* @__PURE__ */ _(xa.Provider, {
                    value: null,
                    children: /* @__PURE__ */ _(
                      be,
                      g(
                        {
                          ownerState: it,
                          'aria-invalid': P.error,
                          'aria-describedby': a,
                          autoComplete: s,
                          autoFocus: l,
                          defaultValue: p,
                          disabled: P.disabled,
                          id: m,
                          onAnimationStart: tt,
                          name: w,
                          placeholder: A,
                          readOnly: F,
                          required: P.required,
                          rows: te,
                          value: H,
                          onKeyDown: q,
                          onKeyUp: V,
                          type: z,
                        },
                        Re,
                        !On(be) && {
                          as: ke,
                          ownerState: g({}, it, Re.ownerState),
                        },
                        {
                          ref: se,
                          className: ve(ee.input, Re.className, F && 'MuiInputBase-readOnly'),
                          onBlur: ge,
                          onChange: et,
                          onFocus: Pe,
                        },
                      ),
                    ),
                  }),
                  x,
                  B
                    ? B(
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
  (Vc.propTypes = {
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
    inputComponent: zi,
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
const Ca = Vc;
function Iv(e) {
  return $e('MuiInput', e);
}
const _v = g({}, $t, Se('MuiInput', ['root', 'underline', 'input'])),
  En = _v;
function Mv(e) {
  return $e('MuiOutlinedInput', e);
}
const Av = g({}, $t, Se('MuiOutlinedInput', ['root', 'notchedOutline', 'input'])),
  tn = Av;
function Dv(e) {
  return $e('MuiFilledInput', e);
}
const Lv = g({}, $t, Se('MuiFilledInput', ['root', 'underline', 'input'])),
  Pt = Lv,
  Uc = Fn(
    /* @__PURE__ */ _('path', {
      d: 'M7 10l5 5 5-5z',
    }),
    'ArrowDropDown',
  );
function jv(e) {
  return $e('MuiAutocomplete', e);
}
const Fv = Se('MuiAutocomplete', [
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
  Ie = Fv;
var ol, rl;
const Bv = [
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
  zv = (e) => {
    const {
        classes: t,
        disablePortal: o,
        expanded: r,
        focused: i,
        fullWidth: a,
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
          i && 'focused',
          a && 'fullWidth',
          s && 'hasClearIcon',
          l && 'hasPopupIcon',
        ],
        inputRoot: ['inputRoot'],
        input: ['input', c && 'inputFocused'],
        tag: ['tag', `tagSize${J(d)}`],
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
    return _e(p, jv, t);
  },
  Vv = ce('div', {
    name: 'MuiAutocomplete',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e,
        { fullWidth: r, hasClearIcon: i, hasPopupIcon: a, inputFocused: s, size: l } = o;
      return [
        {
          [`& .${Ie.tag}`]: t.tag,
        },
        {
          [`& .${Ie.tag}`]: t[`tagSize${J(l)}`],
        },
        {
          [`& .${Ie.inputRoot}`]: t.inputRoot,
        },
        {
          [`& .${Ie.input}`]: t.input,
        },
        {
          [`& .${Ie.input}`]: s && t.inputFocused,
        },
        t.root,
        r && t.fullWidth,
        a && t.hasPopupIcon,
        i && t.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) =>
    g(
      {
        [`&.${Ie.focused} .${Ie.clearIndicator}`]: {
          visibility: 'visible',
        },
        /* Avoid double tap issue on iOS */
        '@media (pointer: fine)': {
          [`&:hover .${Ie.clearIndicator}`]: {
            visibility: 'visible',
          },
        },
      },
      e.fullWidth && {
        width: '100%',
      },
      {
        [`& .${Ie.tag}`]: g(
          {
            margin: 3,
            maxWidth: 'calc(100% - 6px)',
          },
          e.size === 'small' && {
            margin: 2,
            maxWidth: 'calc(100% - 4px)',
          },
        ),
        [`& .${Ie.inputRoot}`]: {
          flexWrap: 'wrap',
          [`.${Ie.hasPopupIcon}&, .${Ie.hasClearIcon}&`]: {
            paddingRight: 26 + 4,
          },
          [`.${Ie.hasPopupIcon}.${Ie.hasClearIcon}&`]: {
            paddingRight: 52 + 4,
          },
          [`& .${Ie.input}`]: {
            width: 0,
            minWidth: 30,
          },
        },
        [`& .${En.root}`]: {
          paddingBottom: 1,
          '& .MuiInput-input': {
            padding: '4px 4px 4px 0px',
          },
        },
        [`& .${En.root}.${$t.sizeSmall}`]: {
          [`& .${En.input}`]: {
            padding: '2px 4px 3px 0',
          },
        },
        [`& .${tn.root}`]: {
          padding: 9,
          [`.${Ie.hasPopupIcon}&, .${Ie.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${Ie.hasPopupIcon}.${Ie.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${Ie.input}`]: {
            padding: '7.5px 4px 7.5px 6px',
          },
          [`& .${Ie.endAdornment}`]: {
            right: 9,
          },
        },
        [`& .${tn.root}.${$t.sizeSmall}`]: {
          // Don't specify paddingRight, as it overrides the default value set when there is only
          // one of the popup or clear icon as the specificity is equal so the latter one wins
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${Ie.input}`]: {
            padding: '2.5px 4px 2.5px 6px',
          },
        },
        [`& .${Pt.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${Ie.hasPopupIcon}&, .${Ie.hasClearIcon}&`]: {
            paddingRight: 26 + 4 + 9,
          },
          [`.${Ie.hasPopupIcon}.${Ie.hasClearIcon}&`]: {
            paddingRight: 52 + 4 + 9,
          },
          [`& .${Pt.input}`]: {
            padding: '7px 4px',
          },
          [`& .${Ie.endAdornment}`]: {
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
          [`& .${Ie.input}`]: {
            paddingTop: 16,
            paddingBottom: 17,
          },
        },
        [`& .${Pt.root}.${$t.hiddenLabel}.${$t.sizeSmall}`]: {
          [`& .${Ie.input}`]: {
            paddingTop: 8,
            paddingBottom: 9,
          },
        },
        [`& .${Ie.input}`]: g(
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
  Uv = ce('div', {
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
  Wv = ce(va, {
    name: 'MuiAutocomplete',
    slot: 'ClearIndicator',
    overridesResolver: (e, t) => t.clearIndicator,
  })({
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  }),
  Hv = ce(va, {
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
  qv = ce(jc, {
    name: 'MuiAutocomplete',
    slot: 'Popper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${Ie.option}`]: t.option,
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
  Yv = ce(Bn, {
    name: 'MuiAutocomplete',
    slot: 'Paper',
    overridesResolver: (e, t) => t.paper,
  })(({ theme: e }) =>
    g({}, e.typography.body1, {
      overflow: 'auto',
    }),
  ),
  Gv = ce('div', {
    name: 'MuiAutocomplete',
    slot: 'Loading',
    overridesResolver: (e, t) => t.loading,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  Kv = ce('div', {
    name: 'MuiAutocomplete',
    slot: 'NoOptions',
    overridesResolver: (e, t) => t.noOptions,
  })(({ theme: e }) => ({
    color: (e.vars || e).palette.text.secondary,
    padding: '14px 16px',
  })),
  Xv = ce('div', {
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
    [`& .${Ie.option}`]: {
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
      [`&.${Ie.focused}`]: {
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
      [`&.${Ie.focusVisible}`]: {
        backgroundColor: (e.vars || e).palette.action.focus,
      },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : Je(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${Ie.focused}`]: {
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
        [`&.${Ie.focusVisible}`]: {
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
  Jv = ce(gv, {
    name: 'MuiAutocomplete',
    slot: 'GroupLabel',
    overridesResolver: (e, t) => t.groupLabel,
  })(({ theme: e }) => ({
    backgroundColor: (e.vars || e).palette.background.paper,
    top: -8,
  })),
  Zv = ce('ul', {
    name: 'MuiAutocomplete',
    slot: 'GroupUl',
    overridesResolver: (e, t) => t.groupUl,
  })({
    padding: 0,
    [`& .${Ie.option}`]: {
      paddingLeft: 24,
    },
  }),
  Wc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ae({
        props: t,
        name: 'MuiAutocomplete',
      }),
      {
        autoComplete: c = !1,
        autoHighlight: u = !1,
        autoSelect: d = !1,
        blurOnSelect: p = !1,
        ChipProps: h,
        className: v,
        clearIcon: x = ol ||
          (ol = /* @__PURE__ */ _(iv, {
            fontSize: 'small',
          })),
        clearOnBlur: b = !l.freeSolo,
        clearOnEscape: m = !1,
        clearText: k = 'Clear',
        closeText: T = 'Close',
        componentsProps: C = {},
        defaultValue: E = l.multiple ? [] : null,
        disableClearable: f = !1,
        disableCloseOnSelect: S = !1,
        disabled: w = !1,
        disabledItemsFocusable: j = !1,
        disableListWrap: L = !1,
        disablePortal: D = !1,
        filterSelectedOptions: I = !1,
        forcePopupIcon: q = 'auto',
        freeSolo: V = !1,
        fullWidth: A = !1,
        getLimitTagsText: F = (De) => `+${De}`,
        getOptionLabel: B = (De) => {
          var dt;
          return (dt = De.label) != null ? dt : De;
        },
        groupBy: te,
        handleHomeEndKeys: U = !l.freeSolo,
        includeInputInList: W = !1,
        limitTags: R = -1,
        ListboxComponent: z = 'ul',
        ListboxProps: Z,
        loading: G = !1,
        loadingText: H = 'Loading…',
        multiple: re = !1,
        noOptionsText: ie = 'No options',
        openOnFocus: Q = !1,
        openText: se = 'Open',
        PaperComponent: le = Bn,
        PopperComponent: he = jc,
        popupIcon: ae = rl || (rl = /* @__PURE__ */ _(Uc, {})),
        readOnly: P = !1,
        renderGroup: Oe,
        renderInput: M,
        renderOption: Y,
        renderTags: Pe,
        selectOnFocus: ge = !l.freeSolo,
        size: et = 'medium',
        slotProps: Be = {},
      } = l,
      ke = ye(l, Bv),
      {
        getRootProps: Re,
        getInputProps: tt,
        getInputLabelProps: it,
        getPopupIndicatorProps: ee,
        getClearProps: me,
        getTagProps: xe,
        getListboxProps: be,
        getOptionProps: fe,
        value: de,
        dirty: ne,
        expanded: Ee,
        id: Ce,
        popupOpen: Me,
        focused: at,
        focusedTag: ft,
        anchorEl: Tt,
        setAnchorEl: gn,
        inputValue: kt,
        groupedOptions: bt,
      } = vg(
        g({}, l, {
          componentName: 'Autocomplete',
        }),
      ),
      xt = !f && !w && ne && !P,
      mt = (!V || q === !0) && q !== !1,
      nt = g({}, l, {
        disablePortal: D,
        expanded: Ee,
        focused: at,
        fullWidth: A,
        hasClearIcon: xt,
        hasPopupIcon: mt,
        inputFocused: ft === -1,
        popupOpen: Me,
        size: et,
      }),
      ot = zv(nt);
    let ht;
    if (re && de.length > 0) {
      const De = (dt) =>
        g(
          {
            className: ot.tag,
            disabled: w,
          },
          xe(dt),
        );
      Pe
        ? (ht = Pe(de, De, nt))
        : (ht = de.map((dt, Dt) =>
            /* @__PURE__ */ _(
              kv,
              g(
                {
                  label: B(dt),
                  size: et,
                },
                De({
                  index: Dt,
                }),
                h,
              ),
            ),
          ));
    }
    if (R > -1 && Array.isArray(ht)) {
      const De = ht.length - R;
      !at &&
        De > 0 &&
        ((ht = ht.splice(0, R)),
        ht.push(
          /* @__PURE__ */ _(
            'span',
            {
              className: ot.tag,
              children: F(De),
            },
            ht.length,
          ),
        ));
    }
    const Qt =
        Oe ||
        ((De) =>
          /* @__PURE__ */ Ze(
            'li',
            {
              children: [
                /* @__PURE__ */ _(Jv, {
                  className: ot.groupLabel,
                  ownerState: nt,
                  component: 'div',
                  children: De.group,
                }),
                /* @__PURE__ */ _(Zv, {
                  className: ot.groupUl,
                  ownerState: nt,
                  children: De.children,
                }),
              ],
            },
            De.key,
          )),
      Ht =
        Y ||
        ((De, dt) =>
          /* @__PURE__ */ _(
            'li',
            g({}, De, {
              children: B(dt),
            }),
          )),
      ln = (De, dt) => {
        const Dt = fe({
          option: De,
          index: dt,
        });
        return Ht(
          g({}, Dt, {
            className: ot.option,
          }),
          De,
          {
            selected: Dt['aria-selected'],
            index: dt,
            inputValue: kt,
          },
        );
      },
      cn = (r = Be.clearIndicator) != null ? r : C.clearIndicator,
      un = (i = Be.paper) != null ? i : C.paper,
      en = (a = Be.popper) != null ? a : C.popper,
      dn = (s = Be.popupIndicator) != null ? s : C.popupIndicator;
    return /* @__PURE__ */ Ze(y.Fragment, {
      children: [
        /* @__PURE__ */ _(
          Vv,
          g(
            {
              ref: o,
              className: ve(ot.root, v),
              ownerState: nt,
            },
            Re(ke),
            {
              children: M({
                id: Ce,
                disabled: w,
                fullWidth: !0,
                size: et === 'small' ? 'small' : void 0,
                InputLabelProps: it(),
                InputProps: g(
                  {
                    ref: gn,
                    className: ot.inputRoot,
                    startAdornment: ht,
                  },
                  (xt || mt) && {
                    endAdornment: /* @__PURE__ */ Ze(Uv, {
                      className: ot.endAdornment,
                      ownerState: nt,
                      children: [
                        xt
                          ? /* @__PURE__ */ _(
                              Wv,
                              g(
                                {},
                                me(),
                                {
                                  'aria-label': k,
                                  title: k,
                                  ownerState: nt,
                                },
                                cn,
                                {
                                  className: ve(
                                    ot.clearIndicator,
                                    cn == null ? void 0 : cn.className,
                                  ),
                                  children: x,
                                },
                              ),
                            )
                          : null,
                        mt
                          ? /* @__PURE__ */ _(
                              Hv,
                              g(
                                {},
                                ee(),
                                {
                                  disabled: w,
                                  'aria-label': Me ? T : se,
                                  title: Me ? T : se,
                                  ownerState: nt,
                                },
                                dn,
                                {
                                  className: ve(
                                    ot.popupIndicator,
                                    dn == null ? void 0 : dn.className,
                                  ),
                                  children: ae,
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
                    disabled: w,
                    readOnly: P,
                  },
                  tt(),
                ),
              }),
            },
          ),
        ),
        Tt
          ? /* @__PURE__ */ _(
              qv,
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
                  open: Me,
                },
                en,
                {
                  className: ve(ot.popper, en == null ? void 0 : en.className),
                  children: /* @__PURE__ */ Ze(
                    Yv,
                    g(
                      {
                        ownerState: nt,
                        as: le,
                      },
                      un,
                      {
                        className: ve(ot.paper, un == null ? void 0 : un.className),
                        children: [
                          G && bt.length === 0
                            ? /* @__PURE__ */ _(Gv, {
                                className: ot.loading,
                                ownerState: nt,
                                children: H,
                              })
                            : null,
                          bt.length === 0 && !V && !G
                            ? /* @__PURE__ */ _(Kv, {
                                className: ot.noOptions,
                                ownerState: nt,
                                role: 'presentation',
                                onMouseDown: (De) => {
                                  De.preventDefault();
                                },
                                children: ie,
                              })
                            : null,
                          bt.length > 0
                            ? /* @__PURE__ */ _(
                                Xv,
                                g(
                                  {
                                    as: z,
                                    className: ot.listbox,
                                    ownerState: nt,
                                  },
                                  be(),
                                  Z,
                                  {
                                    children: bt.map((De, dt) =>
                                      te
                                        ? Qt({
                                            key: De.key,
                                            group: De.group,
                                            children: De.options.map((Dt, O) =>
                                              ln(Dt, De.index + O),
                                            ),
                                          })
                                        : ln(De, dt),
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
  (Wc.propTypes = {
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
    limitTags: Or,
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
const Qv = Wc,
  ey = [
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
  ty = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
  },
  Hc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = hn(),
      i = {
        enter: r.transitions.duration.enteringScreen,
        exit: r.transitions.duration.leavingScreen,
      },
      {
        addEndListener: a,
        appear: s = !0,
        children: l,
        easing: c,
        in: u,
        onEnter: d,
        onEntered: p,
        onEntering: h,
        onExit: v,
        onExited: x,
        onExiting: b,
        style: m,
        timeout: k = i,
        // eslint-disable-next-line react/prop-types
        TransitionComponent: T = ma,
      } = t,
      C = ye(t, ey),
      E = y.useRef(null),
      f = ut(E, l.ref, o),
      S = (A) => (F) => {
        if (A) {
          const B = E.current;
          F === void 0 ? A(B) : A(B, F);
        }
      },
      w = S(h),
      j = S((A, F) => {
        ga(A);
        const B = lo(
          {
            style: m,
            timeout: k,
            easing: c,
          },
          {
            mode: 'enter',
          },
        );
        (A.style.webkitTransition = r.transitions.create('opacity', B)),
          (A.style.transition = r.transitions.create('opacity', B)),
          d && d(A, F);
      }),
      L = S(p),
      D = S(b),
      I = S((A) => {
        const F = lo(
          {
            style: m,
            timeout: k,
            easing: c,
          },
          {
            mode: 'exit',
          },
        );
        (A.style.webkitTransition = r.transitions.create('opacity', F)),
          (A.style.transition = r.transitions.create('opacity', F)),
          v && v(A);
      }),
      q = S(x);
    return /* @__PURE__ */ _(
      T,
      g(
        {
          appear: s,
          in: u,
          nodeRef: E,
          onEnter: j,
          onEntered: L,
          onEntering: w,
          onExit: I,
          onExited: q,
          onExiting: D,
          addEndListener: (A) => {
            a && a(E.current, A);
          },
          timeout: k,
        },
        C,
        {
          children: (A, F) =>
            /* @__PURE__ */ y.cloneElement(
              l,
              g(
                {
                  style: g(
                    {
                      opacity: 0,
                      visibility: A === 'exited' && !u ? 'hidden' : void 0,
                    },
                    ty[A],
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
  (Hc.propTypes = {
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
    children: jn.isRequired,
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
const ny = Hc;
function oy(e) {
  return $e('MuiBackdrop', e);
}
Se('MuiBackdrop', ['root', 'invisible']);
const ry = [
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
  iy = (e) => {
    const { classes: t, invisible: o } = e;
    return _e(
      {
        root: ['root', o && 'invisible'],
      },
      oy,
      t,
    );
  },
  ay = ce('div', {
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
  qc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i, a;
    const s = Ae({
        props: t,
        name: 'MuiBackdrop',
      }),
      {
        children: l,
        className: c,
        component: u = 'div',
        components: d = {},
        componentsProps: p = {},
        invisible: h = !1,
        open: v,
        slotProps: x = {},
        slots: b = {},
        TransitionComponent: m = ny,
        transitionDuration: k,
      } = s,
      T = ye(s, ry),
      C = g({}, s, {
        component: u,
        invisible: h,
      }),
      E = iy(C),
      f = (r = x.root) != null ? r : p.root;
    return /* @__PURE__ */ _(
      m,
      g(
        {
          in: v,
          timeout: k,
        },
        T,
        {
          children: /* @__PURE__ */ _(
            ay,
            g(
              {
                'aria-hidden': !0,
              },
              f,
              {
                as: (i = (a = b.root) != null ? a : d.Root) != null ? i : u,
                className: ve(E.root, c, f == null ? void 0 : f.className),
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
  (qc.propTypes = {
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
const sy = qc;
function ly(e) {
  return $e('MuiButton', e);
}
const cy = Se('MuiButton', [
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
  tr = cy,
  Yc = /* @__PURE__ */ y.createContext({});
process.env.NODE_ENV !== 'production' && (Yc.displayName = 'ButtonGroupContext');
const uy = Yc,
  dy = [
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
  py = (e) => {
    const { color: t, disableElevation: o, fullWidth: r, size: i, variant: a, classes: s } = e,
      l = {
        root: [
          'root',
          a,
          `${a}${J(t)}`,
          `size${J(i)}`,
          `${a}Size${J(i)}`,
          t === 'inherit' && 'colorInherit',
          o && 'disableElevation',
          r && 'fullWidth',
        ],
        label: ['label'],
        startIcon: ['startIcon', `iconSize${J(i)}`],
        endIcon: ['endIcon', `iconSize${J(i)}`],
      },
      c = _e(l, ly, s);
    return g({}, s, c);
  },
  Gc = (e) =>
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
  fy = ce(co, {
    shouldForwardProp: (e) => Ut(e) || e === 'classes',
    name: 'MuiButton',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[o.variant],
        t[`${o.variant}${J(o.color)}`],
        t[`size${J(o.size)}`],
        t[`${o.variant}Size${J(o.size)}`],
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
          [`&.${tr.focusVisible}`]: g(
            {},
            t.variant === 'contained' && {
              boxShadow: (e.vars || e).shadows[6],
            },
          ),
          [`&.${tr.disabled}`]: g(
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
        [`&.${tr.focusVisible}`]: {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        [`&.${tr.disabled}`]: {
          boxShadow: 'none',
        },
      },
  ),
  my = ce('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.startIcon, t[`iconSize${J(o.size)}`]];
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
      Gc(e),
    ),
  ),
  hy = ce('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.endIcon, t[`iconSize${J(o.size)}`]];
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
      Gc(e),
    ),
  ),
  Kc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = y.useContext(uy),
      i = Wi(r, t),
      a = Ae({
        props: i,
        name: 'MuiButton',
      }),
      {
        children: s,
        color: l = 'primary',
        component: c = 'button',
        className: u,
        disabled: d = !1,
        disableElevation: p = !1,
        disableFocusRipple: h = !1,
        endIcon: v,
        focusVisibleClassName: x,
        fullWidth: b = !1,
        size: m = 'medium',
        startIcon: k,
        type: T,
        variant: C = 'text',
      } = a,
      E = ye(a, dy),
      f = g({}, a, {
        color: l,
        component: c,
        disabled: d,
        disableElevation: p,
        disableFocusRipple: h,
        fullWidth: b,
        size: m,
        type: T,
        variant: C,
      }),
      S = py(f),
      w =
        k &&
        /* @__PURE__ */ _(my, {
          className: S.startIcon,
          ownerState: f,
          children: k,
        }),
      j =
        v &&
        /* @__PURE__ */ _(hy, {
          className: S.endIcon,
          ownerState: f,
          children: v,
        });
    return /* @__PURE__ */ Ze(
      fy,
      g(
        {
          ownerState: f,
          className: ve(r.className, S.root, u),
          component: c,
          disabled: d,
          focusRipple: !h,
          focusVisibleClassName: ve(S.focusVisible, x),
          ref: o,
          type: T,
        },
        E,
        {
          classes: S,
          children: [w, s, j],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Kc.propTypes = {
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
const by = Kc;
function gy(e) {
  return $e('PrivateSwitchBase', e);
}
Se('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
const vy = [
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
  yy = (e) => {
    const { classes: t, checked: o, disabled: r, edge: i } = e,
      a = {
        root: ['root', o && 'checked', r && 'disabled', i && `edge${J(i)}`],
        input: ['input'],
      };
    return _e(a, gy, t);
  },
  xy = ce(co)(({ ownerState: e }) =>
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
  Ey = ce('input')({
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
  Xc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const {
        autoFocus: r,
        checked: i,
        checkedIcon: a,
        className: s,
        defaultChecked: l,
        disabled: c,
        disableFocusRipple: u = !1,
        edge: d = !1,
        icon: p,
        id: h,
        inputProps: v,
        inputRef: x,
        name: b,
        onBlur: m,
        onChange: k,
        onFocus: T,
        readOnly: C,
        required: E = !1,
        tabIndex: f,
        type: S,
        value: w,
      } = t,
      j = ye(t, vy),
      [L, D] = Mn({
        controlled: i,
        default: !!l,
        name: 'SwitchBase',
        state: 'checked',
      }),
      I = zn(),
      q = (W) => {
        T && T(W), I && I.onFocus && I.onFocus(W);
      },
      V = (W) => {
        m && m(W), I && I.onBlur && I.onBlur(W);
      },
      A = (W) => {
        if (W.nativeEvent.defaultPrevented) return;
        const R = W.target.checked;
        D(R), k && k(W, R);
      };
    let F = c;
    I && typeof F > 'u' && (F = I.disabled);
    const B = S === 'checkbox' || S === 'radio',
      te = g({}, t, {
        checked: L,
        disabled: F,
        disableFocusRipple: u,
        edge: d,
      }),
      U = yy(te);
    return /* @__PURE__ */ Ze(
      xy,
      g(
        {
          component: 'span',
          className: ve(U.root, s),
          centerRipple: !0,
          focusRipple: !u,
          disabled: F,
          tabIndex: null,
          role: void 0,
          onFocus: q,
          onBlur: V,
          ownerState: te,
          ref: o,
        },
        j,
        {
          children: [
            /* @__PURE__ */ _(
              Ey,
              g(
                {
                  autoFocus: r,
                  checked: i,
                  defaultChecked: l,
                  className: U.input,
                  disabled: F,
                  id: B ? h : void 0,
                  name: b,
                  onChange: A,
                  readOnly: C,
                  ref: x,
                  required: E,
                  ownerState: te,
                  tabIndex: f,
                  type: S,
                },
                S === 'checkbox' && w === void 0
                  ? {}
                  : {
                      value: w,
                    },
                v,
              ),
            ),
            L ? a : p,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Xc.propTypes = {
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
const Jc = Xc,
  Cy = Fn(
    /* @__PURE__ */ _('path', {
      d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
    }),
    'CheckBoxOutlineBlank',
  ),
  Oy = Fn(
    /* @__PURE__ */ _('path', {
      d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    }),
    'CheckBox',
  ),
  Ty = Fn(
    /* @__PURE__ */ _('path', {
      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z',
    }),
    'IndeterminateCheckBox',
  );
function ky(e) {
  return $e('MuiCheckbox', e);
}
const wy = Se('MuiCheckbox', [
    'root',
    'checked',
    'disabled',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
  ]),
  pi = wy,
  Sy = [
    'checkedIcon',
    'color',
    'icon',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'size',
    'className',
  ],
  Ry = (e) => {
    const { classes: t, indeterminate: o, color: r } = e,
      i = {
        root: ['root', o && 'indeterminate', `color${J(r)}`],
      },
      a = _e(i, ky, t);
    return g({}, t, a);
  },
  Ny = ce(Jc, {
    shouldForwardProp: (e) => Ut(e) || e === 'classes',
    name: 'MuiCheckbox',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.indeterminate && t.indeterminate,
        o.color !== 'default' && t[`color${J(o.color)}`],
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
        [`&.${pi.checked}, &.${pi.indeterminate}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${pi.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
        },
      },
    ),
  ),
  $y = /* @__PURE__ */ _(Oy, {}),
  Py = /* @__PURE__ */ _(Cy, {}),
  Iy = /* @__PURE__ */ _(Ty, {}),
  Zc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i;
    const a = Ae({
        props: t,
        name: 'MuiCheckbox',
      }),
      {
        checkedIcon: s = $y,
        color: l = 'primary',
        icon: c = Py,
        indeterminate: u = !1,
        indeterminateIcon: d = Iy,
        inputProps: p,
        size: h = 'medium',
        className: v,
      } = a,
      x = ye(a, Sy),
      b = u ? d : c,
      m = u ? d : s,
      k = g({}, a, {
        color: l,
        indeterminate: u,
        size: h,
      }),
      T = Ry(k);
    return /* @__PURE__ */ _(
      Ny,
      g(
        {
          type: 'checkbox',
          inputProps: g(
            {
              'data-indeterminate': u,
            },
            p,
          ),
          icon: /* @__PURE__ */ y.cloneElement(b, {
            fontSize: (r = b.props.fontSize) != null ? r : h,
          }),
          checkedIcon: /* @__PURE__ */ y.cloneElement(m, {
            fontSize: (i = m.props.fontSize) != null ? i : h,
          }),
          ownerState: k,
          ref: o,
          className: ve(T.root, v),
        },
        x,
        {
          classes: T,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Zc.propTypes = {
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
const _y = Zc,
  My = [
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
  Ay = ce('div', {
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
  Dy = ce(sy, {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (e, t) => t.backdrop,
  })({
    zIndex: -1,
  }),
  Qc = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i, a, s, l, c;
    const u = Ae({
        name: 'MuiModal',
        props: t,
      }),
      {
        BackdropComponent: d = Dy,
        BackdropProps: p,
        classes: h,
        className: v,
        closeAfterTransition: x = !1,
        children: b,
        component: m,
        components: k = {},
        componentsProps: T = {},
        disableAutoFocus: C = !1,
        disableEnforceFocus: E = !1,
        disableEscapeKeyDown: f = !1,
        disablePortal: S = !1,
        disableRestoreFocus: w = !1,
        disableScrollLock: j = !1,
        hideBackdrop: L = !1,
        keepMounted: D = !1,
        slotProps: I,
        slots: q,
        // eslint-disable-next-line react/prop-types
        theme: V,
      } = u,
      A = ye(u, My),
      [F, B] = y.useState(!0),
      te = {
        closeAfterTransition: x,
        disableAutoFocus: C,
        disableEnforceFocus: E,
        disableEscapeKeyDown: f,
        disablePortal: S,
        disableRestoreFocus: w,
        disableScrollLock: j,
        hideBackdrop: L,
        keepMounted: D,
      },
      U = g({}, u, te, {
        exited: F,
      }),
      W = (r = (i = q == null ? void 0 : q.root) != null ? i : k.Root) != null ? r : Ay,
      R = (a = (s = q == null ? void 0 : q.backdrop) != null ? s : k.Backdrop) != null ? a : d,
      z = (l = I == null ? void 0 : I.root) != null ? l : T.root,
      Z = (c = I == null ? void 0 : I.backdrop) != null ? c : T.backdrop;
    return /* @__PURE__ */ _(
      og,
      g(
        {
          slots: {
            root: W,
            backdrop: R,
          },
          slotProps: {
            root: () =>
              g(
                {},
                Si(z, U),
                !On(W) && {
                  as: m,
                  theme: V,
                },
                {
                  className: ve(
                    v,
                    z == null ? void 0 : z.className,
                    h == null ? void 0 : h.root,
                    !U.open && U.exited && (h == null ? void 0 : h.hidden),
                  ),
                },
              ),
            backdrop: () =>
              g({}, p, Si(Z, U), {
                className: ve(Z == null ? void 0 : Z.className, h == null ? void 0 : h.backdrop),
              }),
          },
          onTransitionEnter: () => B(!1),
          onTransitionExited: () => B(!0),
          ref: o,
        },
        A,
        te,
        {
          children: b,
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
    children: jn.isRequired,
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
    container: n.oneOfType([Jt, n.func]),
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
const eu = Qc,
  Ly = Se('MuiDivider', [
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
  il = Ly,
  jy = [
    'addEndListener',
    'appear',
    'children',
    'container',
    'direction',
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
function Fy(e, t, o) {
  const r = t.getBoundingClientRect(),
    i = o && o.getBoundingClientRect(),
    a = mn(t);
  let s;
  if (t.fakeTransform) s = t.fakeTransform;
  else {
    const u = a.getComputedStyle(t);
    s = u.getPropertyValue('-webkit-transform') || u.getPropertyValue('transform');
  }
  let l = 0,
    c = 0;
  if (s && s !== 'none' && typeof s == 'string') {
    const u = s.split('(')[1].split(')')[0].split(',');
    (l = parseInt(u[4], 10)), (c = parseInt(u[5], 10));
  }
  return e === 'left'
    ? i
      ? `translateX(${i.right + l - r.left}px)`
      : `translateX(${a.innerWidth + l - r.left}px)`
    : e === 'right'
    ? i
      ? `translateX(-${r.right - i.left - l}px)`
      : `translateX(-${r.left + r.width - l}px)`
    : e === 'up'
    ? i
      ? `translateY(${i.bottom + c - r.top}px)`
      : `translateY(${a.innerHeight + c - r.top}px)`
    : i
    ? `translateY(-${r.top - i.top + r.height - c}px)`
    : `translateY(-${r.top + r.height - c}px)`;
}
function tu(e) {
  return typeof e == 'function' ? e() : e;
}
function nr(e, t, o) {
  const r = tu(o),
    i = Fy(e, t, r);
  i && ((t.style.webkitTransform = i), (t.style.transform = i));
}
const nu = /* @__PURE__ */ y.forwardRef(function (t, o) {
  const r = hn(),
    i = {
      enter: r.transitions.easing.easeOut,
      exit: r.transitions.easing.sharp,
    },
    a = {
      enter: r.transitions.duration.enteringScreen,
      exit: r.transitions.duration.leavingScreen,
    },
    {
      addEndListener: s,
      appear: l = !0,
      children: c,
      container: u,
      direction: d = 'down',
      easing: p = i,
      in: h,
      onEnter: v,
      onEntered: x,
      onEntering: b,
      onExit: m,
      onExited: k,
      onExiting: T,
      style: C,
      timeout: E = a,
      // eslint-disable-next-line react/prop-types
      TransitionComponent: f = ma,
    } = t,
    S = ye(t, jy),
    w = y.useRef(null),
    j = ut(c.ref, w, o),
    L = (U) => (W) => {
      U && (W === void 0 ? U(w.current) : U(w.current, W));
    },
    D = L((U, W) => {
      nr(d, U, u), ga(U), v && v(U, W);
    }),
    I = L((U, W) => {
      const R = lo(
        {
          timeout: E,
          style: C,
          easing: p,
        },
        {
          mode: 'enter',
        },
      );
      (U.style.webkitTransition = r.transitions.create('-webkit-transform', g({}, R))),
        (U.style.transition = r.transitions.create('transform', g({}, R))),
        (U.style.webkitTransform = 'none'),
        (U.style.transform = 'none'),
        b && b(U, W);
    }),
    q = L(x),
    V = L(T),
    A = L((U) => {
      const W = lo(
        {
          timeout: E,
          style: C,
          easing: p,
        },
        {
          mode: 'exit',
        },
      );
      (U.style.webkitTransition = r.transitions.create('-webkit-transform', W)),
        (U.style.transition = r.transitions.create('transform', W)),
        nr(d, U, u),
        m && m(U);
    }),
    F = L((U) => {
      (U.style.webkitTransition = ''), (U.style.transition = ''), k && k(U);
    }),
    B = (U) => {
      s && s(w.current, U);
    },
    te = y.useCallback(() => {
      w.current && nr(d, w.current, u);
    }, [d, u]);
  return (
    y.useEffect(() => {
      if (h || d === 'down' || d === 'right') return;
      const U = Ui(() => {
          w.current && nr(d, w.current, u);
        }),
        W = mn(w.current);
      return (
        W.addEventListener('resize', U),
        () => {
          U.clear(), W.removeEventListener('resize', U);
        }
      );
    }, [d, h, u]),
    y.useEffect(() => {
      h || te();
    }, [h, te]),
    /* @__PURE__ */ _(
      f,
      g(
        {
          nodeRef: w,
          onEnter: D,
          onEntered: q,
          onEntering: I,
          onExit: A,
          onExited: F,
          onExiting: V,
          addEndListener: B,
          appear: l,
          in: h,
          timeout: E,
        },
        S,
        {
          children: (U, W) =>
            /* @__PURE__ */ y.cloneElement(
              c,
              g(
                {
                  ref: j,
                  style: g(
                    {
                      visibility: U === 'exited' && !h ? 'hidden' : void 0,
                    },
                    C,
                    c.props.style,
                  ),
                },
                W,
              ),
            ),
        },
      ),
    )
  );
});
process.env.NODE_ENV !== 'production' &&
  (nu.propTypes = {
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
    children: jn.isRequired,
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the container the Slide is transitioning from.
     */
    container: Bt(n.oneOfType([Jt, n.func]), (e) => {
      if (e.open) {
        const t = tu(e.container);
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
                'MUI: The `container` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join(`
`),
            );
        } else if (
          !t ||
          typeof t.getBoundingClientRect != 'function' ||
          (t.contextElement != null && t.contextElement.nodeType !== 1)
        )
          return new Error(
            [
              'MUI: The `container` prop provided to the component is invalid.',
              'It should be an HTML element instance.',
            ].join(`
`),
          );
      }
      return null;
    }),
    /**
     * Direction the child node will enter from.
     * @default 'down'
     */
    direction: n.oneOf(['down', 'left', 'right', 'up']),
    /**
     * The transition timing function.
     * You may specify a single easing or a object containing enter and exit values.
     * @default {
     *   enter: theme.transitions.easing.easeOut,
     *   exit: theme.transitions.easing.sharp,
     * }
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
const By = nu;
function zy(e) {
  return $e('MuiDrawer', e);
}
Se('MuiDrawer', [
  'root',
  'docked',
  'paper',
  'paperAnchorLeft',
  'paperAnchorRight',
  'paperAnchorTop',
  'paperAnchorBottom',
  'paperAnchorDockedLeft',
  'paperAnchorDockedRight',
  'paperAnchorDockedTop',
  'paperAnchorDockedBottom',
  'modal',
]);
const Vy = ['BackdropProps'],
  Uy = [
    'anchor',
    'BackdropProps',
    'children',
    'className',
    'elevation',
    'hideBackdrop',
    'ModalProps',
    'onClose',
    'open',
    'PaperProps',
    'SlideProps',
    'TransitionComponent',
    'transitionDuration',
    'variant',
  ],
  ou = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, (o.variant === 'permanent' || o.variant === 'persistent') && t.docked, t.modal];
  },
  Wy = (e) => {
    const { classes: t, anchor: o, variant: r } = e,
      i = {
        root: ['root'],
        docked: [(r === 'permanent' || r === 'persistent') && 'docked'],
        modal: ['modal'],
        paper: ['paper', `paperAnchor${J(o)}`, r !== 'temporary' && `paperAnchorDocked${J(o)}`],
      };
    return _e(i, zy, t);
  },
  Hy = ce(eu, {
    name: 'MuiDrawer',
    slot: 'Root',
    overridesResolver: ou,
  })(({ theme: e }) => ({
    zIndex: (e.vars || e).zIndex.drawer,
  })),
  al = ce('div', {
    shouldForwardProp: Ut,
    name: 'MuiDrawer',
    slot: 'Docked',
    skipVariantsResolver: !1,
    overridesResolver: ou,
  })({
    flex: '0 0 auto',
  }),
  qy = ce(Bn, {
    name: 'MuiDrawer',
    slot: 'Paper',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.paper,
        t[`paperAnchor${J(o.anchor)}`],
        o.variant !== 'temporary' && t[`paperAnchorDocked${J(o.anchor)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) =>
    g(
      {
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flex: '1 0 auto',
        zIndex: (e.vars || e).zIndex.drawer,
        // Add iOS momentum scrolling for iOS < 13.0
        WebkitOverflowScrolling: 'touch',
        // temporary style
        position: 'fixed',
        top: 0,
        // We disable the focus ring for mouse, touch and keyboard users.
        // At some point, it would be better to keep it for keyboard users.
        // :focus-ring CSS pseudo-class will help.
        outline: 0,
      },
      t.anchor === 'left' && {
        left: 0,
      },
      t.anchor === 'top' && {
        top: 0,
        left: 0,
        right: 0,
        height: 'auto',
        maxHeight: '100%',
      },
      t.anchor === 'right' && {
        right: 0,
      },
      t.anchor === 'bottom' && {
        top: 'auto',
        left: 0,
        bottom: 0,
        right: 0,
        height: 'auto',
        maxHeight: '100%',
      },
      t.anchor === 'left' &&
        t.variant !== 'temporary' && {
          borderRight: `1px solid ${(e.vars || e).palette.divider}`,
        },
      t.anchor === 'top' &&
        t.variant !== 'temporary' && {
          borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
        },
      t.anchor === 'right' &&
        t.variant !== 'temporary' && {
          borderLeft: `1px solid ${(e.vars || e).palette.divider}`,
        },
      t.anchor === 'bottom' &&
        t.variant !== 'temporary' && {
          borderTop: `1px solid ${(e.vars || e).palette.divider}`,
        },
    ),
  ),
  ru = {
    left: 'right',
    right: 'left',
    top: 'down',
    bottom: 'up',
  };
function Yy(e) {
  return ['left', 'right'].indexOf(e) !== -1;
}
function Gy(e, t) {
  return e.direction === 'rtl' && Yy(t) ? ru[t] : t;
}
const iu = /* @__PURE__ */ y.forwardRef(function (t, o) {
  const r = Ae({
      props: t,
      name: 'MuiDrawer',
    }),
    i = hn(),
    a = {
      enter: i.transitions.duration.enteringScreen,
      exit: i.transitions.duration.leavingScreen,
    },
    {
      anchor: s = 'left',
      BackdropProps: l,
      children: c,
      className: u,
      elevation: d = 16,
      hideBackdrop: p = !1,
      ModalProps: { BackdropProps: h } = {},
      onClose: v,
      open: x = !1,
      PaperProps: b = {},
      SlideProps: m,
      // eslint-disable-next-line react/prop-types
      TransitionComponent: k = By,
      transitionDuration: T = a,
      variant: C = 'temporary',
    } = r,
    E = ye(r.ModalProps, Vy),
    f = ye(r, Uy),
    S = y.useRef(!1);
  y.useEffect(() => {
    S.current = !0;
  }, []);
  const w = Gy(i, s),
    L = g(
      {},
      r,
      {
        anchor: s,
        elevation: d,
        open: x,
        variant: C,
      },
      f,
    ),
    D = Wy(L),
    I = /* @__PURE__ */ _(
      qy,
      g(
        {
          elevation: C === 'temporary' ? d : 0,
          square: !0,
        },
        b,
        {
          className: ve(D.paper, b.className),
          ownerState: L,
          children: c,
        },
      ),
    );
  if (C === 'permanent')
    return /* @__PURE__ */ _(
      al,
      g(
        {
          className: ve(D.root, D.docked, u),
          ownerState: L,
          ref: o,
        },
        f,
        {
          children: I,
        },
      ),
    );
  const q = /* @__PURE__ */ _(
    k,
    g(
      {
        in: x,
        direction: ru[w],
        timeout: T,
        appear: S.current,
      },
      m,
      {
        children: I,
      },
    ),
  );
  return C === 'persistent'
    ? /* @__PURE__ */ _(
        al,
        g(
          {
            className: ve(D.root, D.docked, u),
            ownerState: L,
            ref: o,
          },
          f,
          {
            children: q,
          },
        ),
      )
    : /* @__PURE__ */ _(
        Hy,
        g(
          {
            BackdropProps: g({}, l, h, {
              transitionDuration: T,
            }),
            className: ve(D.root, D.modal, u),
            open: x,
            ownerState: L,
            onClose: v,
            hideBackdrop: p,
            ref: o,
          },
          f,
          E,
          {
            children: q,
          },
        ),
      );
});
process.env.NODE_ENV !== 'production' &&
  (iu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * Side from which the drawer will appear.
     * @default 'left'
     */
    anchor: n.oneOf(['bottom', 'left', 'right', 'top']),
    /**
     * @ignore
     */
    BackdropProps: n.object,
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
     * The elevation of the drawer.
     * @default 16
     */
    elevation: Or,
    /**
     * If `true`, the backdrop is not rendered.
     * @default false
     */
    hideBackdrop: n.bool,
    /**
     * Props applied to the [`Modal`](/material-ui/api/modal/) element.
     * @default {}
     */
    ModalProps: n.object,
    /**
     * Callback fired when the component requests to be closed.
     *
     * @param {object} event The event source of the callback.
     */
    onClose: n.func,
    /**
     * If `true`, the component is shown.
     * @default false
     */
    open: n.bool,
    /**
     * Props applied to the [`Paper`](/material-ui/api/paper/) element.
     * @default {}
     */
    PaperProps: n.object,
    /**
     * Props applied to the [`Slide`](/material-ui/api/slide/) element.
     */
    SlideProps: n.object,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
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
     * The variant to use.
     * @default 'temporary'
     */
    variant: n.oneOf(['permanent', 'persistent', 'temporary']),
  });
const Ky = iu,
  Xy = [
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
  Jy = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = _e(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Dv,
        t,
      );
    return g({}, t, i);
  },
  Zy = ce(Xr, {
    shouldForwardProp: (e) => Ut(e) || e === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Gr(e, t), !o.disableUnderline && t.underline];
    },
  })(({ theme: e, ownerState: t }) => {
    var o;
    const r = e.palette.mode === 'light',
      i = r ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)',
      a = r ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
      s = r ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.13)',
      l = r ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
    return g(
      {
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
        [`&.${Pt.focused}`]: {
          backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : a,
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
  Qy = ce(Jr, {
    name: 'MuiFilledInput',
    slot: 'Input',
    overridesResolver: Kr,
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
  Oa = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ae({
        props: t,
        name: 'MuiFilledInput',
      }),
      {
        components: c = {},
        componentsProps: u,
        fullWidth: d = !1,
        // declare here to prevent spreading to DOM
        inputComponent: p = 'input',
        multiline: h = !1,
        slotProps: v,
        slots: x = {},
        type: b = 'text',
      } = l,
      m = ye(l, Xy),
      k = g({}, l, {
        fullWidth: d,
        inputComponent: p,
        multiline: h,
        type: b,
      }),
      T = Jy(l),
      C = {
        root: {
          ownerState: k,
        },
        input: {
          ownerState: k,
        },
      },
      E = v ?? u ? Ft(v ?? u, C) : C,
      f = (r = (i = x.root) != null ? i : c.Root) != null ? r : Zy,
      S = (a = (s = x.input) != null ? s : c.Input) != null ? a : Qy;
    return /* @__PURE__ */ _(
      Ca,
      g(
        {
          slots: {
            root: f,
            input: S,
          },
          componentsProps: E,
          fullWidth: d,
          inputComponent: p,
          multiline: h,
          ref: o,
          type: b,
        },
        m,
        {
          classes: T,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Oa.propTypes = {
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
Oa.muiName = 'Input';
const au = Oa;
function e0(e) {
  return $e('MuiFormControl', e);
}
Se('MuiFormControl', [
  'root',
  'marginNone',
  'marginNormal',
  'marginDense',
  'fullWidth',
  'disabled',
]);
const t0 = [
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
  n0 = (e) => {
    const { classes: t, margin: o, fullWidth: r } = e,
      i = {
        root: ['root', o !== 'none' && `margin${J(o)}`, r && 'fullWidth'],
      };
    return _e(i, e0, t);
  },
  o0 = ce('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: ({ ownerState: e }, t) =>
      g({}, t.root, t[`margin${J(e.margin)}`], e.fullWidth && t.fullWidth),
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
  su = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiFormControl',
      }),
      {
        children: i,
        className: a,
        color: s = 'primary',
        component: l = 'div',
        disabled: c = !1,
        error: u = !1,
        focused: d,
        fullWidth: p = !1,
        hiddenLabel: h = !1,
        margin: v = 'none',
        required: x = !1,
        size: b = 'medium',
        variant: m = 'outlined',
      } = r,
      k = ye(r, t0),
      T = g({}, r, {
        color: s,
        component: l,
        disabled: c,
        error: u,
        fullWidth: p,
        hiddenLabel: h,
        margin: v,
        required: x,
        size: b,
        variant: m,
      }),
      C = n0(T),
      [E, f] = y.useState(() => {
        let V = !1;
        return (
          i &&
            y.Children.forEach(i, (A) => {
              if (!ri(A, ['Input', 'Select'])) return;
              const F = ri(A, ['Select']) ? A.props.input : A;
              F && wv(F.props) && (V = !0);
            }),
          V
        );
      }),
      [S, w] = y.useState(() => {
        let V = !1;
        return (
          i &&
            y.Children.forEach(i, (A) => {
              ri(A, ['Input', 'Select']) && Ea(A.props, !0) && (V = !0);
            }),
          V
        );
      }),
      [j, L] = y.useState(!1);
    c && j && L(!1);
    const D = d !== void 0 && !c ? d : j;
    let I;
    if (process.env.NODE_ENV !== 'production') {
      const V = y.useRef(!1);
      I = () => (
        V.current &&
          console.error(
            [
              'MUI: There are multiple `InputBase` components inside a FormControl.',
              'This creates visual inconsistencies, only use one `InputBase`.',
            ].join(`
`),
          ),
        (V.current = !0),
        () => {
          V.current = !1;
        }
      );
    }
    const q = y.useMemo(
      () => ({
        adornedStart: E,
        setAdornedStart: f,
        color: s,
        disabled: c,
        error: u,
        filled: S,
        focused: D,
        fullWidth: p,
        hiddenLabel: h,
        size: b,
        onBlur: () => {
          L(!1);
        },
        onEmpty: () => {
          w(!1);
        },
        onFilled: () => {
          w(!0);
        },
        onFocus: () => {
          L(!0);
        },
        registerEffect: I,
        required: x,
        variant: m,
      }),
      [E, s, c, u, S, D, p, h, I, x, b, m],
    );
    return /* @__PURE__ */ _(xa.Provider, {
      value: q,
      children: /* @__PURE__ */ _(
        o0,
        g(
          {
            as: l,
            ownerState: T,
            className: ve(C.root, a),
            ref: o,
          },
          k,
          {
            children: i,
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (su.propTypes = {
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
const r0 = su;
function i0(e) {
  return $e('MuiFormHelperText', e);
}
const a0 = Se('MuiFormHelperText', [
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
  sl = a0;
var ll;
const s0 = [
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
  l0 = (e) => {
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
      u = {
        root: [
          'root',
          i && 'disabled',
          a && 'error',
          r && `size${J(r)}`,
          o && 'contained',
          l && 'focused',
          s && 'filled',
          c && 'required',
        ],
      };
    return _e(u, i0, t);
  },
  c0 = ce('p', {
    name: 'MuiFormHelperText',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        o.size && t[`size${J(o.size)}`],
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
        [`&.${sl.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${sl.error}`]: {
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
  lu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiFormHelperText',
      }),
      { children: i, className: a, component: s = 'p' } = r,
      l = ye(r, s0),
      c = zn(),
      u = po({
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
      p = l0(d);
    return /* @__PURE__ */ _(
      c0,
      g(
        {
          as: s,
          ownerState: d,
          className: ve(p.root, a),
          ref: o,
        },
        l,
        {
          children:
            i === ' '
              ? // notranslate needed while Google Translate will not fix zero-width space issue
                ll ||
                (ll = /* @__PURE__ */ _('span', {
                  className: 'notranslate',
                  children: '​',
                }))
              : i,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (lu.propTypes = {
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
const u0 = lu;
function d0(e) {
  return $e('MuiFormLabel', e);
}
const p0 = Se('MuiFormLabel', [
    'root',
    'colorSecondary',
    'focused',
    'disabled',
    'error',
    'filled',
    'required',
    'asterisk',
  ]),
  $o = p0,
  f0 = [
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
  m0 = (e) => {
    const { classes: t, color: o, focused: r, disabled: i, error: a, filled: s, required: l } = e,
      c = {
        root: [
          'root',
          `color${J(o)}`,
          i && 'disabled',
          a && 'error',
          s && 'filled',
          r && 'focused',
          l && 'required',
        ],
        asterisk: ['asterisk', a && 'error'],
      };
    return _e(c, d0, t);
  },
  h0 = ce('label', {
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
        [`&.${$o.focused}`]: {
          color: (e.vars || e).palette[t.color].main,
        },
        [`&.${$o.disabled}`]: {
          color: (e.vars || e).palette.text.disabled,
        },
        [`&.${$o.error}`]: {
          color: (e.vars || e).palette.error.main,
        },
      },
    ),
  ),
  b0 = ce('span', {
    name: 'MuiFormLabel',
    slot: 'Asterisk',
    overridesResolver: (e, t) => t.asterisk,
  })(({ theme: e }) => ({
    [`&.${$o.error}`]: {
      color: (e.vars || e).palette.error.main,
    },
  })),
  cu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiFormLabel',
      }),
      { children: i, className: a, component: s = 'label' } = r,
      l = ye(r, f0),
      c = zn(),
      u = po({
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
      p = m0(d);
    return /* @__PURE__ */ Ze(
      h0,
      g(
        {
          as: s,
          ownerState: d,
          className: ve(p.root, a),
          ref: o,
        },
        l,
        {
          children: [
            i,
            u.required &&
              /* @__PURE__ */ Ze(b0, {
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
  (cu.propTypes = {
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
const uu = cu,
  du = /* @__PURE__ */ y.createContext();
process.env.NODE_ENV !== 'production' && (du.displayName = 'GridContext');
const cl = du;
function g0(e) {
  return $e('MuiGrid', e);
}
const v0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  y0 = ['column-reverse', 'column', 'row-reverse', 'row'],
  x0 = ['nowrap', 'wrap-reverse', 'wrap'],
  xo = ['auto', !0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  jo = Se('MuiGrid', [
    'root',
    'container',
    'item',
    'zeroMinWidth',
    // spacings
    ...v0.map((e) => `spacing-xs-${e}`),
    // direction values
    ...y0.map((e) => `direction-xs-${e}`),
    // wrap values
    ...x0.map((e) => `wrap-xs-${e}`),
    // grid sizes for all breakpoints
    ...xo.map((e) => `grid-xs-${e}`),
    ...xo.map((e) => `grid-sm-${e}`),
    ...xo.map((e) => `grid-md-${e}`),
    ...xo.map((e) => `grid-lg-${e}`),
    ...xo.map((e) => `grid-xl-${e}`),
  ]),
  E0 = [
    'className',
    'columns',
    'columnSpacing',
    'component',
    'container',
    'direction',
    'item',
    'rowSpacing',
    'spacing',
    'wrap',
    'zeroMinWidth',
  ];
function eo(e) {
  const t = parseFloat(e);
  return `${t}${String(e).replace(String(t), '') || 'px'}`;
}
function C0({ theme: e, ownerState: t }) {
  let o;
  return e.breakpoints.keys.reduce((r, i) => {
    let a = {};
    if ((t[i] && (o = t[i]), !o)) return r;
    if (o === !0)
      a = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%',
      };
    else if (o === 'auto')
      a = {
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: 'none',
        width: 'auto',
      };
    else {
      const s = $r({
          values: t.columns,
          breakpoints: e.breakpoints.values,
        }),
        l = typeof s == 'object' ? s[i] : s;
      if (l == null) return r;
      const c = `${Math.round((o / l) * 1e8) / 1e6}%`;
      let u = {};
      if (t.container && t.item && t.columnSpacing !== 0) {
        const d = e.spacing(t.columnSpacing);
        if (d !== '0px') {
          const p = `calc(${c} + ${eo(d)})`;
          u = {
            flexBasis: p,
            maxWidth: p,
          };
        }
      }
      a = g(
        {
          flexBasis: c,
          flexGrow: 0,
          maxWidth: c,
        },
        u,
      );
    }
    return e.breakpoints.values[i] === 0 ? Object.assign(r, a) : (r[e.breakpoints.up(i)] = a), r;
  }, {});
}
function O0({ theme: e, ownerState: t }) {
  const o = $r({
    values: t.direction,
    breakpoints: e.breakpoints.values,
  });
  return At(
    {
      theme: e,
    },
    o,
    (r) => {
      const i = {
        flexDirection: r,
      };
      return (
        r.indexOf('column') === 0 &&
          (i[`& > .${jo.item}`] = {
            maxWidth: 'none',
          }),
        i
      );
    },
  );
}
function pu({ breakpoints: e, values: t }) {
  let o = '';
  Object.keys(t).forEach((i) => {
    o === '' && t[i] !== 0 && (o = i);
  });
  const r = Object.keys(e).sort((i, a) => e[i] - e[a]);
  return r.slice(0, r.indexOf(o));
}
function T0({ theme: e, ownerState: t }) {
  const { container: o, rowSpacing: r } = t;
  let i = {};
  if (o && r !== 0) {
    const a = $r({
      values: r,
      breakpoints: e.breakpoints.values,
    });
    let s;
    typeof a == 'object' &&
      (s = pu({
        breakpoints: e.breakpoints.values,
        values: a,
      })),
      (i = At(
        {
          theme: e,
        },
        a,
        (l, c) => {
          var u;
          const d = e.spacing(l);
          return d !== '0px'
            ? {
                marginTop: `-${eo(d)}`,
                [`& > .${jo.item}`]: {
                  paddingTop: eo(d),
                },
              }
            : (u = s) != null && u.includes(c)
            ? {}
            : {
                marginTop: 0,
                [`& > .${jo.item}`]: {
                  paddingTop: 0,
                },
              };
        },
      ));
  }
  return i;
}
function k0({ theme: e, ownerState: t }) {
  const { container: o, columnSpacing: r } = t;
  let i = {};
  if (o && r !== 0) {
    const a = $r({
      values: r,
      breakpoints: e.breakpoints.values,
    });
    let s;
    typeof a == 'object' &&
      (s = pu({
        breakpoints: e.breakpoints.values,
        values: a,
      })),
      (i = At(
        {
          theme: e,
        },
        a,
        (l, c) => {
          var u;
          const d = e.spacing(l);
          return d !== '0px'
            ? {
                width: `calc(100% + ${eo(d)})`,
                marginLeft: `-${eo(d)}`,
                [`& > .${jo.item}`]: {
                  paddingLeft: eo(d),
                },
              }
            : (u = s) != null && u.includes(c)
            ? {}
            : {
                width: '100%',
                marginLeft: 0,
                [`& > .${jo.item}`]: {
                  paddingLeft: 0,
                },
              };
        },
      ));
  }
  return i;
}
function w0(e, t, o = {}) {
  if (!e || e <= 0) return [];
  if ((typeof e == 'string' && !Number.isNaN(Number(e))) || typeof e == 'number')
    return [o[`spacing-xs-${String(e)}`]];
  const r = [];
  return (
    t.forEach((i) => {
      const a = e[i];
      Number(a) > 0 && r.push(o[`spacing-${i}-${String(a)}`]);
    }),
    r
  );
}
const S0 = ce('div', {
  name: 'MuiGrid',
  slot: 'Root',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e,
      {
        container: r,
        direction: i,
        item: a,
        spacing: s,
        wrap: l,
        zeroMinWidth: c,
        breakpoints: u,
      } = o;
    let d = [];
    r && (d = w0(s, u, t));
    const p = [];
    return (
      u.forEach((h) => {
        const v = o[h];
        v && p.push(t[`grid-${h}-${String(v)}`]);
      }),
      [
        t.root,
        r && t.container,
        a && t.item,
        c && t.zeroMinWidth,
        ...d,
        i !== 'row' && t[`direction-xs-${String(i)}`],
        l !== 'wrap' && t[`wrap-xs-${String(l)}`],
        ...p,
      ]
    );
  },
})(
  ({ ownerState: e }) =>
    g(
      {
        boxSizing: 'border-box',
      },
      e.container && {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
      },
      e.item && {
        margin: 0,
        // For instance, it's useful when used with a `figure` element.
      },
      e.zeroMinWidth && {
        minWidth: 0,
      },
      e.wrap !== 'wrap' && {
        flexWrap: e.wrap,
      },
    ),
  O0,
  T0,
  k0,
  C0,
);
function R0(e, t) {
  if (!e || e <= 0) return [];
  if ((typeof e == 'string' && !Number.isNaN(Number(e))) || typeof e == 'number')
    return [`spacing-xs-${String(e)}`];
  const o = [];
  return (
    t.forEach((r) => {
      const i = e[r];
      if (Number(i) > 0) {
        const a = `spacing-${r}-${String(i)}`;
        o.push(a);
      }
    }),
    o
  );
}
const N0 = (e) => {
    const {
      classes: t,
      container: o,
      direction: r,
      item: i,
      spacing: a,
      wrap: s,
      zeroMinWidth: l,
      breakpoints: c,
    } = e;
    let u = [];
    o && (u = R0(a, c));
    const d = [];
    c.forEach((h) => {
      const v = e[h];
      v && d.push(`grid-${h}-${String(v)}`);
    });
    const p = {
      root: [
        'root',
        o && 'container',
        i && 'item',
        l && 'zeroMinWidth',
        ...u,
        r !== 'row' && `direction-xs-${String(r)}`,
        s !== 'wrap' && `wrap-xs-${String(s)}`,
        ...d,
      ],
    };
    return _e(p, g0, t);
  },
  Po = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiGrid',
      }),
      { breakpoints: i } = hn(),
      a = pm(r),
      {
        className: s,
        columns: l,
        columnSpacing: c,
        component: u = 'div',
        container: d = !1,
        direction: p = 'row',
        item: h = !1,
        rowSpacing: v,
        spacing: x = 0,
        wrap: b = 'wrap',
        zeroMinWidth: m = !1,
      } = a,
      k = ye(a, E0),
      T = v || x,
      C = c || x,
      E = y.useContext(cl),
      f = d ? l || 12 : E,
      S = {},
      w = g({}, k);
    i.keys.forEach((D) => {
      k[D] != null && ((S[D] = k[D]), delete w[D]);
    });
    const j = g(
        {},
        a,
        {
          columns: f,
          container: d,
          direction: p,
          item: h,
          rowSpacing: T,
          columnSpacing: C,
          wrap: b,
          zeroMinWidth: m,
          spacing: x,
        },
        S,
        {
          breakpoints: i.keys,
        },
      ),
      L = N0(j);
    return /* @__PURE__ */ _(cl.Provider, {
      value: f,
      children: /* @__PURE__ */ _(
        S0,
        g(
          {
            ownerState: j,
            className: ve(L.root, s),
            as: u,
            ref: o,
          },
          w,
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Po.propTypes = {
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
     * The number of columns.
     * @default 12
     */
    columns: n.oneOfType([n.arrayOf(n.number), n.number, n.object]),
    /**
     * Defines the horizontal space between the type `item` components.
     * It overrides the value of the `spacing` prop.
     */
    columnSpacing: n.oneOfType([
      n.arrayOf(n.oneOfType([n.number, n.string])),
      n.number,
      n.object,
      n.string,
    ]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: n.elementType,
    /**
     * If `true`, the component will have the flex *container* behavior.
     * You should be wrapping *items* with a *container*.
     * @default false
     */
    container: n.bool,
    /**
     * Defines the `flex-direction` style property.
     * It is applied for all screen sizes.
     * @default 'row'
     */
    direction: n.oneOfType([
      n.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      n.arrayOf(n.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
      n.object,
    ]),
    /**
     * If `true`, the component will have the flex *item* behavior.
     * You should be wrapping *items* with a *container*.
     * @default false
     */
    item: n.bool,
    /**
     * If a number, it sets the number of columns the grid item uses.
     * It can't be greater than the total number of columns of the container (12 by default).
     * If 'auto', the grid item's width matches its content.
     * If false, the prop is ignored.
     * If true, the grid item's width grows to use the space available in the grid container.
     * The value is applied for the `lg` breakpoint and wider screens if not overridden.
     * @default false
     */
    lg: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    /**
     * If a number, it sets the number of columns the grid item uses.
     * It can't be greater than the total number of columns of the container (12 by default).
     * If 'auto', the grid item's width matches its content.
     * If false, the prop is ignored.
     * If true, the grid item's width grows to use the space available in the grid container.
     * The value is applied for the `md` breakpoint and wider screens if not overridden.
     * @default false
     */
    md: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    /**
     * Defines the vertical space between the type `item` components.
     * It overrides the value of the `spacing` prop.
     */
    rowSpacing: n.oneOfType([
      n.arrayOf(n.oneOfType([n.number, n.string])),
      n.number,
      n.object,
      n.string,
    ]),
    /**
     * If a number, it sets the number of columns the grid item uses.
     * It can't be greater than the total number of columns of the container (12 by default).
     * If 'auto', the grid item's width matches its content.
     * If false, the prop is ignored.
     * If true, the grid item's width grows to use the space available in the grid container.
     * The value is applied for the `sm` breakpoint and wider screens if not overridden.
     * @default false
     */
    sm: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    /**
     * Defines the space between the type `item` components.
     * It can only be used on a type `container` component.
     * @default 0
     */
    spacing: n.oneOfType([
      n.arrayOf(n.oneOfType([n.number, n.string])),
      n.number,
      n.object,
      n.string,
    ]),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * Defines the `flex-wrap` style property.
     * It's applied for all screen sizes.
     * @default 'wrap'
     */
    wrap: n.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
    /**
     * If a number, it sets the number of columns the grid item uses.
     * It can't be greater than the total number of columns of the container (12 by default).
     * If 'auto', the grid item's width matches its content.
     * If false, the prop is ignored.
     * If true, the grid item's width grows to use the space available in the grid container.
     * The value is applied for the `xl` breakpoint and wider screens if not overridden.
     * @default false
     */
    xl: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    /**
     * If a number, it sets the number of columns the grid item uses.
     * It can't be greater than the total number of columns of the container (12 by default).
     * If 'auto', the grid item's width matches its content.
     * If false, the prop is ignored.
     * If true, the grid item's width grows to use the space available in the grid container.
     * The value is applied for all the screen sizes with the lowest priority.
     * @default false
     */
    xs: n.oneOfType([n.oneOf(['auto']), n.number, n.bool]),
    /**
     * If `true`, it sets `min-width: 0` on the item.
     * Refer to the limitations section of the documentation to better understand the use case.
     * @default false
     */
    zeroMinWidth: n.bool,
  });
if (process.env.NODE_ENV !== 'production') {
  const e = Ad('Grid', Po);
  Po['propTypes'] = g({}, Po.propTypes, {
    direction: e('container'),
    lg: e('item'),
    md: e('item'),
    sm: e('item'),
    spacing: e('container'),
    wrap: e('container'),
    xs: e('item'),
    zeroMinWidth: e('item'),
  });
}
const fu = Po,
  $0 = [
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
function Ai(e) {
  return `scale(${e}, ${e ** 2})`;
}
const P0 = {
    entering: {
      opacity: 1,
      transform: Ai(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
  },
  fi =
    typeof navigator < 'u' &&
    /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
    /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
  Ta = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const {
        addEndListener: r,
        appear: i = !0,
        children: a,
        easing: s,
        in: l,
        onEnter: c,
        onEntered: u,
        onEntering: d,
        onExit: p,
        onExited: h,
        onExiting: v,
        style: x,
        timeout: b = 'auto',
        // eslint-disable-next-line react/prop-types
        TransitionComponent: m = ma,
      } = t,
      k = ye(t, $0),
      T = y.useRef(),
      C = y.useRef(),
      E = hn(),
      f = y.useRef(null),
      S = ut(f, a.ref, o),
      w = (F) => (B) => {
        if (F) {
          const te = f.current;
          B === void 0 ? F(te) : F(te, B);
        }
      },
      j = w(d),
      L = w((F, B) => {
        ga(F);
        const {
          duration: te,
          delay: U,
          easing: W,
        } = lo(
          {
            style: x,
            timeout: b,
            easing: s,
          },
          {
            mode: 'enter',
          },
        );
        let R;
        b === 'auto'
          ? ((R = E.transitions.getAutoHeightDuration(F.clientHeight)), (C.current = R))
          : (R = te),
          (F.style.transition = [
            E.transitions.create('opacity', {
              duration: R,
              delay: U,
            }),
            E.transitions.create('transform', {
              duration: fi ? R : R * 0.666,
              delay: U,
              easing: W,
            }),
          ].join(',')),
          c && c(F, B);
      }),
      D = w(u),
      I = w(v),
      q = w((F) => {
        const {
          duration: B,
          delay: te,
          easing: U,
        } = lo(
          {
            style: x,
            timeout: b,
            easing: s,
          },
          {
            mode: 'exit',
          },
        );
        let W;
        b === 'auto'
          ? ((W = E.transitions.getAutoHeightDuration(F.clientHeight)), (C.current = W))
          : (W = B),
          (F.style.transition = [
            E.transitions.create('opacity', {
              duration: W,
              delay: te,
            }),
            E.transitions.create('transform', {
              duration: fi ? W : W * 0.666,
              delay: fi ? te : te || W * 0.333,
              easing: U,
            }),
          ].join(',')),
          (F.style.opacity = 0),
          (F.style.transform = Ai(0.75)),
          p && p(F);
      }),
      V = w(h),
      A = (F) => {
        b === 'auto' && (T.current = setTimeout(F, C.current || 0)), r && r(f.current, F);
      };
    return (
      y.useEffect(
        () => () => {
          clearTimeout(T.current);
        },
        [],
      ),
      /* @__PURE__ */ _(
        m,
        g(
          {
            appear: i,
            in: l,
            nodeRef: f,
            onEnter: L,
            onEntered: D,
            onEntering: j,
            onExit: q,
            onExited: V,
            onExiting: I,
            addEndListener: A,
            timeout: b === 'auto' ? null : b,
          },
          k,
          {
            children: (F, B) =>
              /* @__PURE__ */ y.cloneElement(
                a,
                g(
                  {
                    style: g(
                      {
                        opacity: 0,
                        transform: Ai(0.75),
                        visibility: F === 'exited' && !l ? 'hidden' : void 0,
                      },
                      P0[F],
                      x,
                      a.props.style,
                    ),
                    ref: S,
                  },
                  B,
                ),
              ),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ta.propTypes = {
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
    children: jn.isRequired,
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
Ta.muiSupportAuto = !0;
const mu = Ta,
  I0 = [
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
  _0 = (e) => {
    const { classes: t, disableUnderline: o } = e,
      i = _e(
        {
          root: ['root', !o && 'underline'],
          input: ['input'],
        },
        Iv,
        t,
      );
    return g({}, t, i);
  },
  M0 = ce(Xr, {
    shouldForwardProp: (e) => Ut(e) || e === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [...Gr(e, t), !o.disableUnderline && t.underline];
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
          [`&.${En.focused}:after`]: {
            // translateX(0) is a workaround for Safari transform scale bug
            // See https://github.com/mui/material-ui/issues/31766
            transform: 'scaleX(1) translateX(0)',
          },
          [`&.${En.error}`]: {
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
          [`&:hover:not(.${En.disabled}, .${En.error}):before`]: {
            borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              borderBottom: `1px solid ${r}`,
            },
          },
          [`&.${En.disabled}:before`]: {
            borderBottomStyle: 'dotted',
          },
        },
      )
    );
  }),
  A0 = ce(Jr, {
    name: 'MuiInput',
    slot: 'Input',
    overridesResolver: Kr,
  })({}),
  ka = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i, a, s;
    const l = Ae({
        props: t,
        name: 'MuiInput',
      }),
      {
        disableUnderline: c,
        components: u = {},
        componentsProps: d,
        fullWidth: p = !1,
        inputComponent: h = 'input',
        multiline: v = !1,
        slotProps: x,
        slots: b = {},
        type: m = 'text',
      } = l,
      k = ye(l, I0),
      T = _0(l),
      E = {
        root: {
          ownerState: {
            disableUnderline: c,
          },
        },
      },
      f = x ?? d ? Ft(x ?? d, E) : E,
      S = (r = (i = b.root) != null ? i : u.Root) != null ? r : M0,
      w = (a = (s = b.input) != null ? s : u.Input) != null ? a : A0;
    return /* @__PURE__ */ _(
      Ca,
      g(
        {
          slots: {
            root: S,
            input: w,
          },
          slotProps: f,
          fullWidth: p,
          inputComponent: h,
          multiline: v,
          ref: o,
          type: m,
        },
        k,
        {
          classes: T,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (ka.propTypes = {
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
ka.muiName = 'Input';
const hu = ka;
function D0(e) {
  return $e('MuiInputLabel', e);
}
Se('MuiInputLabel', [
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
const L0 = ['disableAnimation', 'margin', 'shrink', 'variant', 'className'],
  j0 = (e) => {
    const {
        classes: t,
        formControl: o,
        size: r,
        shrink: i,
        disableAnimation: a,
        variant: s,
        required: l,
      } = e,
      u = _e(
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
        D0,
        t,
      );
    return g({}, t, u);
  },
  F0 = ce(uu, {
    shouldForwardProp: (e) => Ut(e) || e === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        {
          [`& .${$o.asterisk}`]: t.asterisk,
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
  bu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        name: 'MuiInputLabel',
        props: t,
      }),
      { disableAnimation: i = !1, shrink: a, className: s } = r,
      l = ye(r, L0),
      c = zn();
    let u = a;
    typeof u > 'u' && c && (u = c.filled || c.focused || c.adornedStart);
    const d = po({
        props: r,
        muiFormControl: c,
        states: ['size', 'variant', 'required'],
      }),
      p = g({}, r, {
        disableAnimation: i,
        formControl: c,
        shrink: u,
        size: d.size,
        variant: d.variant,
        required: d.required,
      }),
      h = j0(p);
    return /* @__PURE__ */ _(
      F0,
      g(
        {
          'data-shrink': u,
          ownerState: p,
          ref: o,
          className: ve(h.root, s),
        },
        l,
        {
          classes: h,
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (bu.propTypes = {
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
const B0 = bu,
  gu = /* @__PURE__ */ y.createContext({});
process.env.NODE_ENV !== 'production' && (gu.displayName = 'ListContext');
const Di = gu;
function z0(e) {
  return $e('MuiList', e);
}
Se('MuiList', ['root', 'padding', 'dense', 'subheader']);
const V0 = ['children', 'className', 'component', 'dense', 'disablePadding', 'subheader'],
  U0 = (e) => {
    const { classes: t, disablePadding: o, dense: r, subheader: i } = e;
    return _e(
      {
        root: ['root', !o && 'padding', r && 'dense', i && 'subheader'],
      },
      z0,
      t,
    );
  },
  W0 = ce('ul', {
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
  vu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiList',
      }),
      {
        children: i,
        className: a,
        component: s = 'ul',
        dense: l = !1,
        disablePadding: c = !1,
        subheader: u,
      } = r,
      d = ye(r, V0),
      p = y.useMemo(
        () => ({
          dense: l,
        }),
        [l],
      ),
      h = g({}, r, {
        component: s,
        dense: l,
        disablePadding: c,
      }),
      v = U0(h);
    return /* @__PURE__ */ _(Di.Provider, {
      value: p,
      children: /* @__PURE__ */ Ze(
        W0,
        g(
          {
            as: s,
            className: ve(v.root, a),
            ref: o,
            ownerState: h,
          },
          d,
          {
            children: [u, i],
          },
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (vu.propTypes = {
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
const H0 = vu,
  q0 = Se('MuiListItemIcon', ['root', 'alignItemsFlexStart']),
  ul = q0,
  Y0 = Se('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']),
  dl = Y0,
  G0 = [
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
function mi(e, t, o) {
  return e === t
    ? e.firstChild
    : t && t.nextElementSibling
    ? t.nextElementSibling
    : o
    ? null
    : e.firstChild;
}
function pl(e, t, o) {
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
function yu(e, t) {
  if (t === void 0) return !0;
  let o = e.innerText;
  return (
    o === void 0 && (o = e.textContent),
    (o = o.trim().toLowerCase()),
    o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.indexOf(t.keys.join('')) === 0
  );
}
function Eo(e, t, o, r, i, a) {
  let s = !1,
    l = i(e, t, t ? o : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s) return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute('aria-disabled') === 'true';
    if (!l.hasAttribute('tabindex') || !yu(l, a) || c) l = i(e, l, o);
    else return l.focus(), !0;
  }
  return !1;
}
const xu = /* @__PURE__ */ y.forwardRef(function (t, o) {
  const {
      // private
      // eslint-disable-next-line react/prop-types
      actions: r,
      autoFocus: i = !1,
      autoFocusItem: a = !1,
      children: s,
      className: l,
      disabledItemsFocusable: c = !1,
      disableListWrap: u = !1,
      onKeyDown: d,
      variant: p = 'selectedMenu',
    } = t,
    h = ye(t, G0),
    v = y.useRef(null),
    x = y.useRef({
      keys: [],
      repeating: !0,
      previousKeyMatched: !0,
      lastTime: null,
    });
  an(() => {
    i && v.current.focus();
  }, [i]),
    y.useImperativeHandle(
      r,
      () => ({
        adjustStyleForScrollbar: (C, E) => {
          const f = !v.current.style.width;
          if (C.clientHeight < v.current.clientHeight && f) {
            const S = `${zl(ct(C))}px`;
            (v.current.style[E.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = S),
              (v.current.style.width = `calc(100% + ${S})`);
          }
          return v.current;
        },
      }),
      [],
    );
  const b = (C) => {
      const E = v.current,
        f = C.key,
        S = ct(E).activeElement;
      if (f === 'ArrowDown') C.preventDefault(), Eo(E, S, u, c, mi);
      else if (f === 'ArrowUp') C.preventDefault(), Eo(E, S, u, c, pl);
      else if (f === 'Home') C.preventDefault(), Eo(E, null, u, c, mi);
      else if (f === 'End') C.preventDefault(), Eo(E, null, u, c, pl);
      else if (f.length === 1) {
        const w = x.current,
          j = f.toLowerCase(),
          L = performance.now();
        w.keys.length > 0 &&
          (L - w.lastTime > 500
            ? ((w.keys = []), (w.repeating = !0), (w.previousKeyMatched = !0))
            : w.repeating && j !== w.keys[0] && (w.repeating = !1)),
          (w.lastTime = L),
          w.keys.push(j);
        const D = S && !w.repeating && yu(S, w);
        w.previousKeyMatched && (D || Eo(E, S, !1, c, mi, w))
          ? C.preventDefault()
          : (w.previousKeyMatched = !1);
      }
      d && d(C);
    },
    m = ut(v, o);
  let k = -1;
  y.Children.forEach(s, (C, E) => {
    /* @__PURE__ */ y.isValidElement(C) &&
      (process.env.NODE_ENV !== 'production' &&
        fa.isFragment(C) &&
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        ),
      C.props.disabled || (((p === 'selectedMenu' && C.props.selected) || k === -1) && (k = E)),
      k === E &&
        (C.props.disabled || C.props.muiSkipListHighlight || C.type.muiSkipListHighlight) &&
        ((k += 1), k >= s.length && (k = -1)));
  });
  const T = y.Children.map(s, (C, E) => {
    if (E === k) {
      const f = {};
      return (
        a && (f.autoFocus = !0),
        C.props.tabIndex === void 0 && p === 'selectedMenu' && (f.tabIndex = 0),
        /* @__PURE__ */ y.cloneElement(C, f)
      );
    }
    return C;
  });
  return /* @__PURE__ */ _(
    H0,
    g(
      {
        role: 'menu',
        ref: m,
        className: l,
        onKeyDown: b,
        tabIndex: i ? 0 : -1,
      },
      h,
      {
        children: T,
      },
    ),
  );
});
process.env.NODE_ENV !== 'production' &&
  (xu.propTypes = {
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
const K0 = xu;
function X0(e) {
  return $e('MuiPopover', e);
}
Se('MuiPopover', ['root', 'paper']);
const J0 = ['onEntering'],
  Z0 = [
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
function fl(e, t) {
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
function ml(e, t) {
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
function hl(e) {
  return [e.horizontal, e.vertical].map((t) => (typeof t == 'number' ? `${t}px` : t)).join(' ');
}
function ur(e) {
  return typeof e == 'function' ? e() : e;
}
const Q0 = (e) => {
    const { classes: t } = e;
    return _e(
      {
        root: ['root'],
        paper: ['paper'],
      },
      X0,
      t,
    );
  },
  ex = ce(eu, {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  tx = ce(Bn, {
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
  Eu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
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
        children: u,
        className: d,
        container: p,
        elevation: h = 8,
        marginThreshold: v = 16,
        open: x,
        PaperProps: b = {},
        transformOrigin: m = {
          vertical: 'top',
          horizontal: 'left',
        },
        TransitionComponent: k = mu,
        transitionDuration: T = 'auto',
        TransitionProps: { onEntering: C } = {},
      } = r,
      E = ye(r.TransitionProps, J0),
      f = ye(r, Z0),
      S = y.useRef(),
      w = ut(S, b.ref),
      j = g({}, r, {
        anchorOrigin: s,
        anchorReference: c,
        elevation: h,
        marginThreshold: v,
        PaperProps: b,
        transformOrigin: m,
        TransitionComponent: k,
        transitionDuration: T,
        TransitionProps: E,
      }),
      L = Q0(j),
      D = y.useCallback(() => {
        if (c === 'anchorPosition')
          return (
            process.env.NODE_ENV !== 'production' &&
              (l ||
                console.error(
                  'MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.',
                )),
            l
          );
        const R = ur(a),
          z = R && R.nodeType === 1 ? R : ct(S.current).body,
          Z = z.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'production') {
          const G = z.getBoundingClientRect();
          process.env.NODE_ENV !== 'test' &&
            G.top === 0 &&
            G.left === 0 &&
            G.right === 0 &&
            G.bottom === 0 &&
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
          top: Z.top + fl(Z, s.vertical),
          left: Z.left + ml(Z, s.horizontal),
        };
      }, [a, s.horizontal, s.vertical, l, c]),
      I = y.useCallback(
        (R) => ({
          vertical: fl(R, m.vertical),
          horizontal: ml(R, m.horizontal),
        }),
        [m.horizontal, m.vertical],
      ),
      q = y.useCallback(
        (R) => {
          const z = {
              width: R.offsetWidth,
              height: R.offsetHeight,
            },
            Z = I(z);
          if (c === 'none')
            return {
              top: null,
              left: null,
              transformOrigin: hl(Z),
            };
          const G = D();
          let H = G.top - Z.vertical,
            re = G.left - Z.horizontal;
          const ie = H + z.height,
            Q = re + z.width,
            se = mn(ur(a)),
            le = se.innerHeight - v,
            he = se.innerWidth - v;
          if (H < v) {
            const ae = H - v;
            (H -= ae), (Z.vertical += ae);
          } else if (ie > le) {
            const ae = ie - le;
            (H -= ae), (Z.vertical += ae);
          }
          if (
            (process.env.NODE_ENV !== 'production' &&
              z.height > le &&
              z.height &&
              le &&
              console.error(
                [
                  'MUI: The popover component is too tall.',
                  `Some part of it can not be seen on the screen (${z.height - le}px).`,
                  'Please consider adding a `max-height` to improve the user-experience.',
                ].join(`
`),
              ),
            re < v)
          ) {
            const ae = re - v;
            (re -= ae), (Z.horizontal += ae);
          } else if (Q > he) {
            const ae = Q - he;
            (re -= ae), (Z.horizontal += ae);
          }
          return {
            top: `${Math.round(H)}px`,
            left: `${Math.round(re)}px`,
            transformOrigin: hl(Z),
          };
        },
        [a, c, D, I, v],
      ),
      [V, A] = y.useState(x),
      F = y.useCallback(() => {
        const R = S.current;
        if (!R) return;
        const z = q(R);
        z.top !== null && (R.style.top = z.top),
          z.left !== null && (R.style.left = z.left),
          (R.style.transformOrigin = z.transformOrigin),
          A(!0);
      }, [q]),
      B = (R, z) => {
        C && C(R, z), F();
      },
      te = () => {
        A(!1);
      };
    y.useEffect(() => {
      x && F();
    }),
      y.useImperativeHandle(
        i,
        () =>
          x
            ? {
                updatePosition: () => {
                  F();
                },
              }
            : null,
        [x, F],
      ),
      y.useEffect(() => {
        if (!x) return;
        const R = Ui(() => {
            F();
          }),
          z = mn(a);
        return (
          z.addEventListener('resize', R),
          () => {
            R.clear(), z.removeEventListener('resize', R);
          }
        );
      }, [a, x, F]);
    let U = T;
    T === 'auto' && !k.muiSupportAuto && (U = void 0);
    const W = p || (a ? ct(ur(a)).body : void 0);
    return /* @__PURE__ */ _(
      ex,
      g(
        {
          BackdropProps: {
            invisible: !0,
          },
          className: ve(L.root, d),
          container: W,
          open: x,
          ref: o,
          ownerState: j,
        },
        f,
        {
          children: /* @__PURE__ */ _(
            k,
            g(
              {
                appear: !0,
                in: x,
                onEntering: B,
                onExited: te,
                timeout: U,
              },
              E,
              {
                children: /* @__PURE__ */ _(
                  tx,
                  g(
                    {
                      elevation: h,
                    },
                    b,
                    {
                      ref: w,
                      className: ve(L.paper, b.className),
                    },
                    V
                      ? void 0
                      : {
                          style: g({}, b.style, {
                            opacity: 0,
                          }),
                        },
                    {
                      ownerState: j,
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
  (Eu.propTypes = {
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
    anchorEl: Bt(n.oneOfType([Jt, n.func]), (e) => {
      if (e.open && (!e.anchorReference || e.anchorReference === 'anchorEl')) {
        const t = ur(e.anchorEl);
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
    container: n.oneOfType([Jt, n.func]),
    /**
     * The elevation of the popover.
     * @default 8
     */
    elevation: Or,
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
      component: zi,
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
const nx = Eu;
function ox(e) {
  return $e('MuiMenu', e);
}
Se('MuiMenu', ['root', 'paper', 'list']);
const rx = ['onEntering'],
  ix = [
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
  ax = {
    vertical: 'top',
    horizontal: 'right',
  },
  sx = {
    vertical: 'top',
    horizontal: 'left',
  },
  lx = (e) => {
    const { classes: t } = e;
    return _e(
      {
        root: ['root'],
        paper: ['paper'],
        list: ['list'],
      },
      ox,
      t,
    );
  },
  cx = ce(nx, {
    shouldForwardProp: (e) => Ut(e) || e === 'classes',
    name: 'MuiMenu',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  ux = ce(Bn, {
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
  dx = ce(K0, {
    name: 'MuiMenu',
    slot: 'List',
    overridesResolver: (e, t) => t.list,
  })({
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  }),
  Cu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiMenu',
      }),
      {
        autoFocus: i = !0,
        children: a,
        disableAutoFocusItem: s = !1,
        MenuListProps: l = {},
        onClose: c,
        open: u,
        PaperProps: d = {},
        PopoverClasses: p,
        transitionDuration: h = 'auto',
        TransitionProps: { onEntering: v } = {},
        variant: x = 'selectedMenu',
      } = r,
      b = ye(r.TransitionProps, rx),
      m = ye(r, ix),
      k = hn(),
      T = k.direction === 'rtl',
      C = g({}, r, {
        autoFocus: i,
        disableAutoFocusItem: s,
        MenuListProps: l,
        onEntering: v,
        PaperProps: d,
        transitionDuration: h,
        TransitionProps: b,
        variant: x,
      }),
      E = lx(C),
      f = i && !s && u,
      S = y.useRef(null),
      w = (D, I) => {
        S.current && S.current.adjustStyleForScrollbar(D, k), v && v(D, I);
      },
      j = (D) => {
        D.key === 'Tab' && (D.preventDefault(), c && c(D, 'tabKeyDown'));
      };
    let L = -1;
    return (
      y.Children.map(a, (D, I) => {
        /* @__PURE__ */ y.isValidElement(D) &&
          (process.env.NODE_ENV !== 'production' &&
            fa.isFragment(D) &&
            console.error(
              [
                "MUI: The Menu component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join(`
`),
            ),
          D.props.disabled ||
            (((x === 'selectedMenu' && D.props.selected) || L === -1) && (L = I)));
      }),
      /* @__PURE__ */ _(
        cx,
        g(
          {
            onClose: c,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: T ? 'right' : 'left',
            },
            transformOrigin: T ? ax : sx,
            PaperProps: g(
              {
                as: ux,
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
            transitionDuration: h,
            TransitionProps: g(
              {
                onEntering: w,
              },
              b,
            ),
            ownerState: C,
          },
          m,
          {
            classes: p,
            children: /* @__PURE__ */ _(
              dx,
              g(
                {
                  onKeyDown: j,
                  actions: S,
                  autoFocus: i && (L === -1 || s),
                  autoFocusItem: f,
                  variant: x,
                },
                l,
                {
                  className: ve(E.list, l.className),
                  children: a,
                },
              ),
            ),
          },
        ),
      )
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Cu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * An HTML element, or a function that returns one.
     * It's used to set the position of the menu.
     */
    anchorEl: n.oneOfType([Jt, n.func]),
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
const px = Cu;
function fx(e) {
  return $e('MuiMenuItem', e);
}
const mx = Se('MuiMenuItem', [
    'root',
    'focusVisible',
    'dense',
    'disabled',
    'divider',
    'gutters',
    'selected',
  ]),
  Co = mx,
  hx = [
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
  bx = (e, t) => {
    const { ownerState: o } = e;
    return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
  },
  gx = (e) => {
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
        fx,
        s,
      );
    return g({}, s, c);
  },
  vx = ce(co, {
    shouldForwardProp: (e) => Ut(e) || e === 'classes',
    name: 'MuiMenuItem',
    slot: 'Root',
    overridesResolver: bx,
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
        [`&.${Co.selected}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
            : Je(e.palette.primary.main, e.palette.action.selectedOpacity),
          [`&.${Co.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : Je(
                  e.palette.primary.main,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        [`&.${Co.selected}:hover`]: {
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
        [`&.${Co.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus,
        },
        [`&.${Co.disabled}`]: {
          opacity: (e.vars || e).palette.action.disabledOpacity,
        },
        [`& + .${il.root}`]: {
          marginTop: e.spacing(1),
          marginBottom: e.spacing(1),
        },
        [`& + .${il.inset}`]: {
          marginLeft: 52,
        },
        [`& .${dl.root}`]: {
          marginTop: 0,
          marginBottom: 0,
        },
        [`& .${dl.inset}`]: {
          paddingLeft: 36,
        },
        [`& .${ul.root}`]: {
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
            [`& .${ul.root} svg`]: {
              fontSize: '1.25rem',
            },
          },
        ),
    ),
  ),
  Ou = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiMenuItem',
      }),
      {
        autoFocus: i = !1,
        component: a = 'li',
        dense: s = !1,
        divider: l = !1,
        disableGutters: c = !1,
        focusVisibleClassName: u,
        role: d = 'menuitem',
        tabIndex: p,
        className: h,
      } = r,
      v = ye(r, hx),
      x = y.useContext(Di),
      b = y.useMemo(
        () => ({
          dense: s || x.dense || !1,
          disableGutters: c,
        }),
        [x.dense, s, c],
      ),
      m = y.useRef(null);
    an(() => {
      i &&
        (m.current
          ? m.current.focus()
          : process.env.NODE_ENV !== 'production' &&
            console.error(
              'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
            ));
    }, [i]);
    const k = g({}, r, {
        dense: b.dense,
        divider: l,
        disableGutters: c,
      }),
      T = gx(r),
      C = ut(m, o);
    let E;
    return (
      r.disabled || (E = p !== void 0 ? p : -1),
      /* @__PURE__ */ _(Di.Provider, {
        value: b,
        children: /* @__PURE__ */ _(
          vx,
          g(
            {
              ref: C,
              role: d,
              tabIndex: E,
              component: a,
              focusVisibleClassName: ve(T.focusVisible, u),
              className: ve(T.root, h),
            },
            v,
            {
              ownerState: k,
              classes: T,
            },
          ),
        ),
      })
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ou.propTypes = {
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
const yx = Ou;
function xx(e) {
  return $e('MuiNativeSelect', e);
}
const Ex = Se('MuiNativeSelect', [
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
  wa = Ex,
  Cx = ['className', 'disabled', 'IconComponent', 'inputRef', 'variant'],
  Ox = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${J(o)}`, a && 'iconOpen', r && 'disabled'],
      };
    return _e(s, xx, t);
  },
  Tu = ({ ownerState: e, theme: t }) =>
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
        [`&.${wa.disabled}`]: {
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
  Tx = ce('select', {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: Ut,
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.select,
        t[o.variant],
        {
          [`&.${wa.multiple}`]: t.multiple,
        },
      ];
    },
  })(Tu),
  ku = ({ ownerState: e, theme: t }) =>
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
        [`&.${wa.disabled}`]: {
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
  kx = ce('svg', {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${J(o.variant)}`], o.open && t.iconOpen];
    },
  })(ku),
  wu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const { className: r, disabled: i, IconComponent: a, inputRef: s, variant: l = 'standard' } = t,
      c = ye(t, Cx),
      u = g({}, t, {
        disabled: i,
        variant: l,
      }),
      d = Ox(u);
    return /* @__PURE__ */ Ze(y.Fragment, {
      children: [
        /* @__PURE__ */ _(
          Tx,
          g(
            {
              ownerState: u,
              className: ve(d.select, r),
              disabled: i,
              ref: s || o,
            },
            c,
          ),
        ),
        t.multiple
          ? null
          : /* @__PURE__ */ _(kx, {
              as: a,
              ownerState: u,
              className: d.icon,
            }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (wu.propTypes = {
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
const wx = wu;
var bl;
const Sx = ['children', 'classes', 'className', 'label', 'notched'],
  Rx = ce('fieldset')({
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
  Nx = ce('legend')(({ ownerState: e, theme: t }) =>
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
function Su(e) {
  const { className: t, label: o, notched: r } = e,
    i = ye(e, Sx),
    a = o != null && o !== '',
    s = g({}, e, {
      notched: r,
      withLabel: a,
    });
  return /* @__PURE__ */ _(
    Rx,
    g(
      {
        'aria-hidden': !0,
        className: t,
        ownerState: s,
      },
      i,
      {
        children: /* @__PURE__ */ _(Nx, {
          ownerState: s,
          children: a
            ? /* @__PURE__ */ _('span', {
                children: o,
              })
            : // notranslate needed while Google Translate will not fix zero-width space issue
              bl ||
              (bl = /* @__PURE__ */ _('span', {
                className: 'notranslate',
                children: '​',
              })),
        }),
      },
    ),
  );
}
process.env.NODE_ENV !== 'production' &&
  (Su.propTypes = {
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
const $x = [
    'components',
    'fullWidth',
    'inputComponent',
    'label',
    'multiline',
    'notched',
    'slots',
    'type',
  ],
  Px = (e) => {
    const { classes: t } = e,
      r = _e(
        {
          root: ['root'],
          notchedOutline: ['notchedOutline'],
          input: ['input'],
        },
        Mv,
        t,
      );
    return g({}, t, r);
  },
  Ix = ce(Xr, {
    shouldForwardProp: (e) => Ut(e) || e === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: Gr,
  })(({ theme: e, ownerState: t }) => {
    const o = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return g(
      {
        position: 'relative',
        borderRadius: (e.vars || e).shape.borderRadius,
        [`&:hover .${tn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.text.primary,
        },
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          [`&:hover .${tn.notchedOutline}`]: {
            borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o,
          },
        },
        [`&.${tn.focused} .${tn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[t.color].main,
          borderWidth: 2,
        },
        [`&.${tn.error} .${tn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.error.main,
        },
        [`&.${tn.disabled} .${tn.notchedOutline}`]: {
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
  _x = ce(Su, {
    name: 'MuiOutlinedInput',
    slot: 'NotchedOutline',
    overridesResolver: (e, t) => t.notchedOutline,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t,
    };
  }),
  Mx = ce(Jr, {
    name: 'MuiOutlinedInput',
    slot: 'Input',
    overridesResolver: Kr,
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
  Sa = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i, a, s, l;
    const c = Ae({
        props: t,
        name: 'MuiOutlinedInput',
      }),
      {
        components: u = {},
        fullWidth: d = !1,
        inputComponent: p = 'input',
        label: h,
        multiline: v = !1,
        notched: x,
        slots: b = {},
        type: m = 'text',
      } = c,
      k = ye(c, $x),
      T = Px(c),
      C = zn(),
      E = po({
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
        multiline: v,
        size: E.size,
        type: m,
      }),
      S = (r = (i = b.root) != null ? i : u.Root) != null ? r : Ix,
      w = (a = (s = b.input) != null ? s : u.Input) != null ? a : Mx;
    return /* @__PURE__ */ _(
      Ca,
      g(
        {
          slots: {
            root: S,
            input: w,
          },
          renderSuffix: (j) =>
            /* @__PURE__ */ _(_x, {
              ownerState: f,
              className: T.notchedOutline,
              label:
                h != null && h !== '' && E.required
                  ? l ||
                    (l = /* @__PURE__ */ Ze(y.Fragment, {
                      children: [h, ' ', '*'],
                    }))
                  : h,
              notched: typeof x < 'u' ? x : !!(j.startAdornment || j.filled || j.focused),
            }),
          fullWidth: d,
          inputComponent: p,
          multiline: v,
          ref: o,
          type: m,
        },
        k,
        {
          classes: g({}, T, {
            notchedOutline: null,
          }),
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Sa.propTypes = {
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
Sa.muiName = 'Input';
const Ru = Sa;
function Ax(e) {
  return $e('MuiSelect', e);
}
const Dx = Se('MuiSelect', [
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
  or = Dx;
var gl;
const Lx = [
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
  jx = ce('div', {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        // Win specificity over the input base
        {
          [`&.${or.select}`]: t.select,
        },
        {
          [`&.${or.select}`]: t[o.variant],
        },
        {
          [`&.${or.multiple}`]: t.multiple,
        },
      ];
    },
  })(Tu, {
    // Win specificity over the input base
    [`&.${or.select}`]: {
      height: 'auto',
      // Resets for multiple select with chips
      minHeight: '1.4375em',
      // Required for select\text-field height consistency
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  Fx = ce('svg', {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.icon, o.variant && t[`icon${J(o.variant)}`], o.open && t.iconOpen];
    },
  })(ku),
  Bx = ce('input', {
    shouldForwardProp: (e) => ia(e) && e !== 'classes',
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
function vl(e, t) {
  return typeof t == 'object' && t !== null ? e === t : String(e) === String(t);
}
function zx(e) {
  return e == null || (typeof e == 'string' && !e.trim());
}
const Vx = (e) => {
    const { classes: t, variant: o, disabled: r, multiple: i, open: a } = e,
      s = {
        select: ['select', o, r && 'disabled', i && 'multiple'],
        icon: ['icon', `icon${J(o)}`, a && 'iconOpen', r && 'disabled'],
        nativeInput: ['nativeInput'],
      };
    return _e(s, Ax, t);
  },
  Nu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const {
        'aria-describedby': r,
        'aria-label': i,
        autoFocus: a,
        autoWidth: s,
        children: l,
        className: c,
        defaultOpen: u,
        defaultValue: d,
        disabled: p,
        displayEmpty: h,
        IconComponent: v,
        inputRef: x,
        labelId: b,
        MenuProps: m = {},
        multiple: k,
        name: T,
        onBlur: C,
        onChange: E,
        onClose: f,
        onFocus: S,
        onOpen: w,
        open: j,
        readOnly: L,
        renderValue: D,
        SelectDisplayProps: I = {},
        tabIndex: q,
        value: V,
        variant: A = 'standard',
      } = t,
      F = ye(t, Lx),
      [B, te] = Mn({
        controlled: V,
        default: d,
        name: 'Select',
      }),
      [U, W] = Mn({
        controlled: j,
        default: u,
        name: 'Select',
      }),
      R = y.useRef(null),
      z = y.useRef(null),
      [Z, G] = y.useState(null),
      { current: H } = y.useRef(j != null),
      [re, ie] = y.useState(),
      Q = ut(o, x),
      se = y.useCallback((ne) => {
        (z.current = ne), ne && G(ne);
      }, []),
      le = Z == null ? void 0 : Z.parentNode;
    y.useImperativeHandle(
      Q,
      () => ({
        focus: () => {
          z.current.focus();
        },
        node: R.current,
        value: B,
      }),
      [B],
    ),
      y.useEffect(() => {
        u && U && Z && !H && (ie(s ? null : le.clientWidth), z.current.focus());
      }, [Z, s]),
      y.useEffect(() => {
        a && z.current.focus();
      }, [a]),
      y.useEffect(() => {
        if (!b) return;
        const ne = ct(z.current).getElementById(b);
        if (ne) {
          const Ee = () => {
            getSelection().isCollapsed && z.current.focus();
          };
          return (
            ne.addEventListener('click', Ee),
            () => {
              ne.removeEventListener('click', Ee);
            }
          );
        }
      }, [b]);
    const he = (ne, Ee) => {
        ne ? w && w(Ee) : f && f(Ee), H || (ie(s ? null : le.clientWidth), W(ne));
      },
      ae = (ne) => {
        ne.button === 0 && (ne.preventDefault(), z.current.focus(), he(!0, ne));
      },
      P = (ne) => {
        he(!1, ne);
      },
      Oe = y.Children.toArray(l),
      M = (ne) => {
        const Ee = Oe.map((Me) => Me.props.value).indexOf(ne.target.value);
        if (Ee === -1) return;
        const Ce = Oe[Ee];
        te(Ce.props.value), E && E(ne, Ce);
      },
      Y = (ne) => (Ee) => {
        let Ce;
        if (Ee.currentTarget.hasAttribute('tabindex')) {
          if (k) {
            Ce = Array.isArray(B) ? B.slice() : [];
            const Me = B.indexOf(ne.props.value);
            Me === -1 ? Ce.push(ne.props.value) : Ce.splice(Me, 1);
          } else Ce = ne.props.value;
          if ((ne.props.onClick && ne.props.onClick(Ee), B !== Ce && (te(Ce), E))) {
            const Me = Ee.nativeEvent || Ee,
              at = new Me.constructor(Me.type, Me);
            Object.defineProperty(at, 'target', {
              writable: !0,
              value: {
                value: Ce,
                name: T,
              },
            }),
              E(at, ne);
          }
          k || he(!1, Ee);
        }
      },
      Pe = (ne) => {
        L ||
          ([
            ' ',
            'ArrowUp',
            'ArrowDown',
            // The native select doesn't respond to enter on macOS, but it's recommended by
            // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
            'Enter',
          ].indexOf(ne.key) !== -1 &&
            (ne.preventDefault(), he(!0, ne)));
      },
      ge = Z !== null && U,
      et = (ne) => {
        !ge &&
          C &&
          (Object.defineProperty(ne, 'target', {
            writable: !0,
            value: {
              value: B,
              name: T,
            },
          }),
          C(ne));
      };
    delete F['aria-invalid'];
    let Be, ke;
    const Re = [];
    let tt = !1,
      it = !1;
    (Ea({
      value: B,
    }) ||
      h) &&
      (D ? (Be = D(B)) : (tt = !0));
    const ee = Oe.map((ne) => {
      if (!(/* @__PURE__ */ y.isValidElement(ne))) return null;
      process.env.NODE_ENV !== 'production' &&
        fa.isFragment(ne) &&
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join(`
`),
        );
      let Ee;
      if (k) {
        if (!Array.isArray(B))
          throw new Error(
            process.env.NODE_ENV !== 'production'
              ? 'MUI: The `value` prop must be an array when using the `Select` component with `multiple`.'
              : Tn(2),
          );
        (Ee = B.some((Ce) => vl(Ce, ne.props.value))), Ee && tt && Re.push(ne.props.children);
      } else (Ee = vl(B, ne.props.value)), Ee && tt && (ke = ne.props.children);
      return (
        Ee && (it = !0),
        /* @__PURE__ */ y.cloneElement(ne, {
          'aria-selected': Ee ? 'true' : 'false',
          onClick: Y(ne),
          onKeyUp: (Ce) => {
            Ce.key === ' ' && Ce.preventDefault(), ne.props.onKeyUp && ne.props.onKeyUp(Ce);
          },
          role: 'option',
          selected: Ee,
          value: void 0,
          // The value is most likely not a valid HTML attribute.
          'data-value': ne.props.value,
          // Instead, we provide it as a data attribute.
        })
      );
    });
    process.env.NODE_ENV !== 'production' &&
      y.useEffect(() => {
        if (!it && !k && B !== '') {
          const ne = Oe.map((Ee) => Ee.props.value);
          console.warn(
            [
              `MUI: You have provided an out-of-range value \`${B}\` for the select ${
                T ? `(name="${T}") ` : ''
              }component.`,
              "Consider providing a value that matches one of the available options or ''.",
              `The available values are ${
                ne
                  .filter((Ee) => Ee != null)
                  .map((Ee) => `\`${Ee}\``)
                  .join(', ') || '""'
              }.`,
            ].join(`
`),
          );
        }
      }, [it, Oe, k, T, B]),
      tt &&
        (k
          ? Re.length === 0
            ? (Be = null)
            : (Be = Re.reduce(
                (ne, Ee, Ce) => (ne.push(Ee), Ce < Re.length - 1 && ne.push(', '), ne),
                [],
              ))
          : (Be = ke));
    let me = re;
    !s && H && Z && (me = le.clientWidth);
    let xe;
    typeof q < 'u' ? (xe = q) : (xe = p ? null : 0);
    const be = I.id || (T ? `mui-component-select-${T}` : void 0),
      fe = g({}, t, {
        variant: A,
        value: B,
        open: ge,
      }),
      de = Vx(fe);
    return /* @__PURE__ */ Ze(y.Fragment, {
      children: [
        /* @__PURE__ */ _(
          jx,
          g(
            {
              ref: se,
              tabIndex: xe,
              role: 'button',
              'aria-disabled': p ? 'true' : void 0,
              'aria-expanded': ge ? 'true' : 'false',
              'aria-haspopup': 'listbox',
              'aria-label': i,
              'aria-labelledby': [b, be].filter(Boolean).join(' ') || void 0,
              'aria-describedby': r,
              onKeyDown: Pe,
              onMouseDown: p || L ? null : ae,
              onBlur: et,
              onFocus: S,
            },
            I,
            {
              ownerState: fe,
              className: ve(I.className, de.select, c),
              id: be,
              children: zx(Be)
                ? // notranslate needed while Google Translate will not fix zero-width space issue
                  gl ||
                  (gl = /* @__PURE__ */ _('span', {
                    className: 'notranslate',
                    children: '​',
                  }))
                : Be,
            },
          ),
        ),
        /* @__PURE__ */ _(
          Bx,
          g(
            {
              value: Array.isArray(B) ? B.join(',') : B,
              name: T,
              ref: R,
              'aria-hidden': !0,
              onChange: M,
              tabIndex: -1,
              disabled: p,
              className: de.nativeInput,
              autoFocus: a,
              ownerState: fe,
            },
            F,
          ),
        ),
        /* @__PURE__ */ _(Fx, {
          as: v,
          className: de.icon,
          ownerState: fe,
        }),
        /* @__PURE__ */ _(
          px,
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
                  'aria-labelledby': b,
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
              children: ee,
            },
          ),
        ),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Nu.propTypes = {
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
const Ux = Nu;
var yl, xl;
const Wx = [
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
  Hx = (e) => {
    const { classes: t } = e;
    return t;
  },
  Ra = {
    name: 'MuiSelect',
    overridesResolver: (e, t) => t.root,
    shouldForwardProp: (e) => Ut(e) && e !== 'variant',
    slot: 'Root',
  },
  qx = ce(hu, Ra)(''),
  Yx = ce(Ru, Ra)(''),
  Gx = ce(au, Ra)(''),
  Na = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        name: 'MuiSelect',
        props: t,
      }),
      {
        autoWidth: i = !1,
        children: a,
        classes: s = {},
        className: l,
        defaultOpen: c = !1,
        displayEmpty: u = !1,
        IconComponent: d = Uc,
        id: p,
        input: h,
        inputProps: v,
        label: x,
        labelId: b,
        MenuProps: m,
        multiple: k = !1,
        native: T = !1,
        onClose: C,
        onOpen: E,
        open: f,
        renderValue: S,
        SelectDisplayProps: w,
        variant: j = 'outlined',
      } = r,
      L = ye(r, Wx),
      D = T ? wx : Ux,
      I = zn(),
      V =
        po({
          props: r,
          muiFormControl: I,
          states: ['variant'],
        }).variant || j,
      A =
        h ||
        {
          standard: yl || (yl = /* @__PURE__ */ _(qx, {})),
          outlined: /* @__PURE__ */ _(Yx, {
            label: x,
          }),
          filled: xl || (xl = /* @__PURE__ */ _(Gx, {})),
        }[V],
      F = g({}, r, {
        variant: V,
        classes: s,
      }),
      B = Hx(F),
      te = ut(o, A.ref);
    return /* @__PURE__ */ _(y.Fragment, {
      children: /* @__PURE__ */ y.cloneElement(
        A,
        g(
          {
            // Most of the logic is implemented in `SelectInput`.
            // The `Select` component is a simple API wrapper to expose something better to play with.
            inputComponent: D,
            inputProps: g(
              {
                children: a,
                IconComponent: d,
                variant: V,
                type: void 0,
                // We render a select. We can ignore the type provided by the `Input`.
                multiple: k,
              },
              T
                ? {
                    id: p,
                  }
                : {
                    autoWidth: i,
                    defaultOpen: c,
                    displayEmpty: u,
                    labelId: b,
                    MenuProps: m,
                    onClose: C,
                    onOpen: E,
                    open: f,
                    renderValue: S,
                    SelectDisplayProps: g(
                      {
                        id: p,
                      },
                      w,
                    ),
                  },
              v,
              {
                classes: v ? Ft(B, v.classes) : B,
              },
              h ? h.props.inputProps : {},
            ),
          },
          k && T && V === 'outlined'
            ? {
                notched: !0,
              }
            : {},
          {
            ref: te,
            className: ve(A.props.className, l),
          },
          !h && {
            variant: V,
          },
          L,
        ),
      ),
    });
  });
process.env.NODE_ENV !== 'production' &&
  (Na.propTypes = {
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
Na.muiName = 'Select';
const Kx = Na,
  Xx = (e) => !e || !On(e),
  Jx = Xx;
function Zx(e) {
  return $e('MuiSlider', e);
}
const Qx = Se('MuiSlider', [
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
  Kt = Qx,
  eE = (e) => {
    const { open: t } = e;
    return {
      offset: ve(t && Kt.valueLabelOpen),
      circle: Kt.valueLabelCircle,
      label: Kt.valueLabelLabel,
    };
  };
function $u(e) {
  const { children: t, className: o, value: r } = e,
    i = eE(e);
  return t
    ? /* @__PURE__ */ y.cloneElement(
        t,
        {
          className: ve(t.props.className),
        },
        /* @__PURE__ */ Ze(y.Fragment, {
          children: [
            t.props.children,
            /* @__PURE__ */ _('span', {
              className: ve(i.offset, o),
              'aria-hidden': !0,
              children: /* @__PURE__ */ _('span', {
                className: i.circle,
                children: /* @__PURE__ */ _('span', {
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
  ($u.propTypes = {
    children: n.element.isRequired,
    className: n.string,
    value: n.node,
  });
const tE = [
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
function El(e) {
  return e;
}
const Pu = ce('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.root,
      t[`color${J(o.color)}`],
      o.size !== 'medium' && t[`size${J(o.size)}`],
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
      [`&.${Kt.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        color: (e.vars || e).palette.grey[400],
      },
      [`&.${Kt.dragging}`]: {
        [`& .${Kt.thumb}, & .${Kt.track}`]: {
          transition: 'none',
        },
      },
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (Pu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Iu = ce('span', {
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
  (Iu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const _u = ce('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (e, t) => t.track,
})(({ theme: e, ownerState: t }) => {
  const o =
    // Same logic as the LinearProgress track color
    e.palette.mode === 'light'
      ? Vr(e.palette[t.color].main, 0.62)
      : zr(e.palette[t.color].main, 0.5);
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
  (_u.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Mu = ce('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (e, t) => {
    const { ownerState: o } = e;
    return [
      t.thumb,
      t[`thumbColor${J(o.color)}`],
      o.size !== 'medium' && t[`thumbSize${J(o.size)}`],
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
      [`&:hover, &.${Kt.focusVisible}`]: {
        boxShadow: `0px 0px 0px 8px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : Je(e.palette[t.color].main, 0.16)
        }`,
        '@media (hover: none)': {
          boxShadow: 'none',
        },
      },
      [`&.${Kt.active}`]: {
        boxShadow: `0px 0px 0px 14px ${
          e.vars
            ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`
            : Je(e.palette[t.color].main, 0.16)
        }`,
      },
      [`&.${Kt.disabled}`]: {
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
  ),
);
process.env.NODE_ENV !== 'production' &&
  (Mu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Au = ce($u, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (e, t) => t.valueLabel,
})(({ theme: e, ownerState: t }) =>
  g(
    {
      [`&.${Kt.valueLabelOpen}`]: {
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
  (Au.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Du = ce('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (e) => ia(e) && e !== 'markActive',
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
  (Du.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const Lu = ce('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (e) => ia(e) && e !== 'markLabelActive',
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
  (Lu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: n.node,
  });
const nE = (e) => {
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
      u = {
        root: [
          'root',
          t && 'disabled',
          o && 'dragging',
          r && 'marked',
          i === 'vertical' && 'vertical',
          a === 'inverted' && 'trackInverted',
          a === !1 && 'trackFalse',
          l && `color${J(l)}`,
          c && `size${J(c)}`,
        ],
        rail: ['rail'],
        track: ['track'],
        mark: ['mark'],
        markActive: ['markActive'],
        markLabel: ['markLabel'],
        markLabelActive: ['markLabelActive'],
        valueLabel: ['valueLabel'],
        thumb: ['thumb', t && 'disabled', c && `thumbSize${J(c)}`, l && `thumbColor${J(l)}`],
        active: ['active'],
        disabled: ['disabled'],
        focusVisible: ['focusVisible'],
      };
    return _e(u, Zx, s);
  },
  oE = ({ children: e }) => e,
  ju = /* @__PURE__ */ y.forwardRef(function (t, o) {
    var r, i, a, s, l, c, u, d, p, h, v, x, b, m, k, T, C, E, f, S, w, j, L, D;
    const I = Ae({
        props: t,
        name: 'MuiSlider',
      }),
      V = hn().direction === 'rtl',
      {
        'aria-label': A,
        'aria-valuetext': F,
        'aria-labelledby': B,
        // eslint-disable-next-line react/prop-types
        component: te = 'span',
        components: U = {},
        componentsProps: W = {},
        color: R = 'primary',
        classes: z,
        className: Z,
        disableSwap: G = !1,
        disabled: H = !1,
        getAriaLabel: re,
        getAriaValueText: ie,
        marks: Q = !1,
        max: se = 100,
        min: le = 0,
        orientation: he = 'horizontal',
        size: ae = 'medium',
        step: P = 1,
        scale: Oe = El,
        slotProps: M,
        slots: Y,
        track: Pe = 'normal',
        valueLabelDisplay: ge = 'off',
        valueLabelFormat: et = El,
      } = I,
      Be = ye(I, tE),
      ke = g({}, I, {
        isRtl: V,
        max: se,
        min: le,
        classes: z,
        disabled: H,
        disableSwap: G,
        orientation: he,
        marks: Q,
        color: R,
        size: ae,
        step: P,
        scale: Oe,
        track: Pe,
        valueLabelDisplay: ge,
        valueLabelFormat: et,
      }),
      {
        axisProps: Re,
        getRootProps: tt,
        getHiddenInputProps: it,
        getThumbProps: ee,
        open: me,
        active: xe,
        axis: be,
        focusedThumbIndex: fe,
        range: de,
        dragging: ne,
        marks: Ee,
        values: Ce,
        trackOffset: Me,
        trackLeap: at,
      } = ug(
        g({}, ke, {
          ref: o,
        }),
      );
    (ke.marked = Ee.length > 0 && Ee.some((N) => N.label)),
      (ke.dragging = ne),
      (ke.focusedThumbIndex = fe);
    const ft = nE(ke),
      Tt = (r = (i = Y == null ? void 0 : Y.root) != null ? i : U.Root) != null ? r : Pu,
      gn = (a = (s = Y == null ? void 0 : Y.rail) != null ? s : U.Rail) != null ? a : Iu,
      kt = (l = (c = Y == null ? void 0 : Y.track) != null ? c : U.Track) != null ? l : _u,
      bt = (u = (d = Y == null ? void 0 : Y.thumb) != null ? d : U.Thumb) != null ? u : Mu,
      xt =
        (p = (h = Y == null ? void 0 : Y.valueLabel) != null ? h : U.ValueLabel) != null ? p : Au,
      mt = (v = (x = Y == null ? void 0 : Y.mark) != null ? x : U.Mark) != null ? v : Du,
      nt = (b = (m = Y == null ? void 0 : Y.markLabel) != null ? m : U.MarkLabel) != null ? b : Lu,
      ot = (k = (T = Y == null ? void 0 : Y.input) != null ? T : U.Input) != null ? k : 'input',
      ht = (C = M == null ? void 0 : M.root) != null ? C : W.root,
      Sn = (E = M == null ? void 0 : M.rail) != null ? E : W.rail,
      Qt = (f = M == null ? void 0 : M.track) != null ? f : W.track,
      vn = (S = M == null ? void 0 : M.thumb) != null ? S : W.thumb,
      Ht = (w = M == null ? void 0 : M.valueLabel) != null ? w : W.valueLabel,
      ln = (j = M == null ? void 0 : M.mark) != null ? j : W.mark,
      cn = (L = M == null ? void 0 : M.markLabel) != null ? L : W.markLabel,
      un = (D = M == null ? void 0 : M.input) != null ? D : W.input,
      en = Lt({
        elementType: Tt,
        getSlotProps: tt,
        externalSlotProps: ht,
        externalForwardedProps: Be,
        additionalProps: g(
          {},
          Jx(Tt) && {
            as: te,
          },
        ),
        ownerState: g({}, ke, ht == null ? void 0 : ht.ownerState),
        className: [ft.root, Z],
      }),
      dn = Lt({
        elementType: gn,
        externalSlotProps: Sn,
        ownerState: ke,
        className: ft.rail,
      }),
      De = Lt({
        elementType: kt,
        externalSlotProps: Qt,
        additionalProps: {
          style: g({}, Re[be].offset(Me), Re[be].leap(at)),
        },
        ownerState: g({}, ke, Qt == null ? void 0 : Qt.ownerState),
        className: ft.track,
      }),
      dt = Lt({
        elementType: bt,
        getSlotProps: ee,
        externalSlotProps: vn,
        ownerState: g({}, ke, vn == null ? void 0 : vn.ownerState),
        className: ft.thumb,
      }),
      Dt = Lt({
        elementType: xt,
        externalSlotProps: Ht,
        ownerState: g({}, ke, Ht == null ? void 0 : Ht.ownerState),
        className: ft.valueLabel,
      }),
      O = Lt({
        elementType: mt,
        externalSlotProps: ln,
        ownerState: ke,
        className: ft.mark,
      }),
      K = Lt({
        elementType: nt,
        externalSlotProps: cn,
        ownerState: ke,
        className: ft.markLabel,
      }),
      ue = Lt({
        elementType: ot,
        getSlotProps: it,
        externalSlotProps: un,
        ownerState: ke,
      });
    return /* @__PURE__ */ Ze(
      Tt,
      g({}, en, {
        children: [
          /* @__PURE__ */ _(gn, g({}, dn)),
          /* @__PURE__ */ _(kt, g({}, De)),
          Ee.filter((N) => N.value >= le && N.value <= se).map((N, $) => {
            const X = xr(N.value, le, se),
              oe = Re[be].offset(X);
            let pe;
            return (
              Pe === !1
                ? (pe = Ce.indexOf(N.value) !== -1)
                : (pe =
                    (Pe === 'normal' &&
                      (de ? N.value >= Ce[0] && N.value <= Ce[Ce.length - 1] : N.value <= Ce[0])) ||
                    (Pe === 'inverted' &&
                      (de ? N.value <= Ce[0] || N.value >= Ce[Ce.length - 1] : N.value >= Ce[0]))),
              /* @__PURE__ */ Ze(
                y.Fragment,
                {
                  children: [
                    /* @__PURE__ */ _(
                      mt,
                      g(
                        {
                          'data-index': $,
                        },
                        O,
                        !On(mt) && {
                          markActive: pe,
                        },
                        {
                          style: g({}, oe, O.style),
                          className: ve(O.className, pe && ft.markActive),
                        },
                      ),
                    ),
                    N.label != null
                      ? /* @__PURE__ */ _(
                          nt,
                          g(
                            {
                              'aria-hidden': !0,
                              'data-index': $,
                            },
                            K,
                            !On(nt) && {
                              markLabelActive: pe,
                            },
                            {
                              style: g({}, oe, K.style),
                              className: ve(ft.markLabel, K.className, pe && ft.markLabelActive),
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
          Ce.map((N, $) => {
            const X = xr(N, le, se),
              oe = Re[be].offset(X),
              pe = ge === 'off' ? oE : xt;
            return (
              /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
              /* @__PURE__ */ _(
                pe,
                g(
                  {},
                  !On(pe) && {
                    valueLabelFormat: et,
                    valueLabelDisplay: ge,
                    value: typeof et == 'function' ? et(Oe(N), $) : et,
                    index: $,
                    open: me === $ || xe === $ || ge === 'on',
                    disabled: H,
                  },
                  Dt,
                  {
                    children: /* @__PURE__ */ _(
                      bt,
                      g(
                        {
                          'data-index': $,
                        },
                        dt,
                        {
                          className: ve(
                            ft.thumb,
                            dt.className,
                            xe === $ && ft.active,
                            fe === $ && ft.focusVisible,
                          ),
                          style: g(
                            {},
                            oe,
                            {
                              pointerEvents: G && xe !== $ ? 'none' : void 0,
                            },
                            dt.style,
                          ),
                          children: /* @__PURE__ */ _(
                            ot,
                            g(
                              {
                                'data-index': $,
                                'aria-label': re ? re($) : A,
                                'aria-valuenow': Oe(N),
                                'aria-labelledby': B,
                                'aria-valuetext': ie ? ie(Oe(N), $) : F,
                                value: Ce[$],
                              },
                              ue,
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
  (ju.propTypes = {
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
const rE = ju;
function iE(e) {
  return $e('MuiSnackbarContent', e);
}
Se('MuiSnackbarContent', ['root', 'message', 'action']);
const aE = ['action', 'className', 'message', 'role'],
  sE = (e) => {
    const { classes: t } = e;
    return _e(
      {
        root: ['root'],
        action: ['action'],
        message: ['message'],
      },
      iE,
      t,
    );
  },
  lE = ce(Bn, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })(({ theme: e }) => {
    const t = e.palette.mode === 'light' ? 0.8 : 0.98,
      o = Fm(e.palette.background.default, t);
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
  cE = ce('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (e, t) => t.message,
  })({
    padding: '8px 0',
  }),
  uE = ce('div', {
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
  Fu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiSnackbarContent',
      }),
      { action: i, className: a, message: s, role: l = 'alert' } = r,
      c = ye(r, aE),
      u = r,
      d = sE(u);
    return /* @__PURE__ */ Ze(
      lE,
      g(
        {
          role: l,
          square: !0,
          elevation: 6,
          className: ve(d.root, a),
          ownerState: u,
          ref: o,
        },
        c,
        {
          children: [
            /* @__PURE__ */ _(cE, {
              className: d.message,
              ownerState: u,
              children: s,
            }),
            i
              ? /* @__PURE__ */ _(uE, {
                  className: d.action,
                  ownerState: u,
                  children: i,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Fu.propTypes = {
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
const dE = Fu;
function pE(e) {
  return $e('MuiSnackbar', e);
}
Se('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);
const fE = ['onEnter', 'onExited'],
  mE = [
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
  hE = (e) => {
    const { classes: t, anchorOrigin: o } = e,
      r = {
        root: ['root', `anchorOrigin${J(o.vertical)}${J(o.horizontal)}`],
      };
    return _e(r, pE, t);
  },
  Cl = ce('div', {
    name: 'MuiSnackbar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.root,
        t[`anchorOrigin${J(o.anchorOrigin.vertical)}${J(o.anchorOrigin.horizontal)}`],
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
  Bu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiSnackbar',
      }),
      i = hn(),
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
        autoHideDuration: u = null,
        children: d,
        className: p,
        ClickAwayListenerProps: h,
        ContentProps: v,
        disableWindowBlurListener: x = !1,
        message: b,
        open: m,
        TransitionComponent: k = mu,
        transitionDuration: T = a,
        TransitionProps: { onEnter: C, onExited: E } = {},
      } = r,
      f = ye(r.TransitionProps, fE),
      S = ye(r, mE),
      w = g({}, r, {
        anchorOrigin: {
          vertical: l,
          horizontal: c,
        },
        autoHideDuration: u,
        disableWindowBlurListener: x,
        TransitionComponent: k,
        transitionDuration: T,
      }),
      j = hE(w),
      { getRootProps: L, onClickAway: D } = dg(
        g({}, w, {
          ref: o,
        }),
      ),
      [I, q] = y.useState(!0),
      V = Lt({
        elementType: Cl,
        getSlotProps: L,
        externalForwardedProps: S,
        ownerState: w,
        className: [j.root, p],
      }),
      A = (B) => {
        q(!0), E && E(B);
      },
      F = (B, te) => {
        q(!1), C && C(B, te);
      };
    return !m && I
      ? null
      : /* @__PURE__ */ _(
          hr,
          g(
            {
              onClickAway: D,
            },
            h,
            {
              children: /* @__PURE__ */ _(
                Cl,
                g({}, V, {
                  children: /* @__PURE__ */ _(
                    k,
                    g(
                      {
                        appear: !0,
                        in: m,
                        timeout: T,
                        direction: l === 'top' ? 'down' : 'up',
                        onEnter: F,
                        onExited: A,
                      },
                      f,
                      {
                        children:
                          d ||
                          /* @__PURE__ */ _(
                            dE,
                            g(
                              {
                                message: b,
                                action: s,
                              },
                              v,
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
  (Bu.propTypes = {
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
const bE = Bu;
function gE(e) {
  return $e('MuiSwitch', e);
}
const vE = Se('MuiSwitch', [
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
  Ot = vE,
  yE = ['className', 'color', 'edge', 'size', 'sx'],
  xE = (e) => {
    const { classes: t, edge: o, size: r, color: i, checked: a, disabled: s } = e,
      l = {
        root: ['root', o && `edge${J(o)}`, `size${J(r)}`],
        switchBase: ['switchBase', `color${J(i)}`, a && 'checked', s && 'disabled'],
        thumb: ['thumb'],
        track: ['track'],
        input: ['input'],
      },
      c = _e(l, gE, t);
    return g({}, t, c);
  },
  EE = ce('span', {
    name: 'MuiSwitch',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, o.edge && t[`edge${J(o.edge)}`], t[`size${J(o.size)}`]];
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
  CE = ce(Jc, {
    name: 'MuiSwitch',
    slot: 'SwitchBase',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [
        t.switchBase,
        {
          [`& .${Ot.input}`]: t.input,
        },
        o.color !== 'default' && t[`color${J(o.color)}`],
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
                      ? Vr(e.palette[t.color].main, 0.62)
                      : zr(e.palette[t.color].main, 0.55)
                  }`,
            },
          },
          [`&.${Ot.checked} + .${Ot.track}`]: {
            backgroundColor: (e.vars || e).palette[t.color].main,
          },
        },
      ),
  ),
  OE = ce('span', {
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
  TE = ce('span', {
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
  zu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiSwitch',
      }),
      { className: i, color: a = 'primary', edge: s = !1, size: l = 'medium', sx: c } = r,
      u = ye(r, yE),
      d = g({}, r, {
        color: a,
        edge: s,
        size: l,
      }),
      p = xE(d),
      h = /* @__PURE__ */ _(TE, {
        className: p.thumb,
        ownerState: d,
      });
    return /* @__PURE__ */ Ze(EE, {
      className: ve(p.root, i),
      sx: c,
      ownerState: d,
      children: [
        /* @__PURE__ */ _(
          CE,
          g(
            {
              type: 'checkbox',
              icon: h,
              checkedIcon: h,
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
        /* @__PURE__ */ _(OE, {
          className: p.track,
          ownerState: d,
        }),
      ],
    });
  });
process.env.NODE_ENV !== 'production' &&
  (zu.propTypes = {
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
const kE = zu;
function wE(e) {
  return $e('MuiToolbar', e);
}
Se('MuiToolbar', ['root', 'gutters', 'regular', 'dense']);
const SE = ['className', 'component', 'disableGutters', 'variant'],
  RE = (e) => {
    const { classes: t, disableGutters: o, variant: r } = e;
    return _e(
      {
        root: ['root', !o && 'gutters', r],
      },
      wE,
      t,
    );
  },
  NE = ce('div', {
    name: 'MuiToolbar',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: o } = e;
      return [t.root, !o.disableGutters && t.gutters, t[o.variant]];
    },
  })(
    ({ theme: e, ownerState: t }) =>
      g(
        {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        },
        !t.disableGutters && {
          paddingLeft: e.spacing(2),
          paddingRight: e.spacing(2),
          [e.breakpoints.up('sm')]: {
            paddingLeft: e.spacing(3),
            paddingRight: e.spacing(3),
          },
        },
        t.variant === 'dense' && {
          minHeight: 48,
        },
      ),
    ({ theme: e, ownerState: t }) => t.variant === 'regular' && e.mixins.toolbar,
  ),
  Vu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiToolbar',
      }),
      { className: i, component: a = 'div', disableGutters: s = !1, variant: l = 'regular' } = r,
      c = ye(r, SE),
      u = g({}, r, {
        component: a,
        disableGutters: s,
        variant: l,
      }),
      d = RE(u);
    return /* @__PURE__ */ _(
      NE,
      g(
        {
          as: a,
          className: ve(d.root, i),
          ref: o,
          ownerState: u,
        },
        c,
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Vu.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
     * The Toolbar is a flex container, allowing flex item properites to be used to lay out the children.
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
     * If `true`, disables gutter padding.
     * @default false
     */
    disableGutters: n.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
    /**
     * The variant to use.
     * @default 'regular'
     */
    variant: n.oneOfType([n.oneOf(['dense', 'regular']), n.string]),
  });
const $E = Vu;
function PE(e) {
  return $e('MuiTextField', e);
}
Se('MuiTextField', ['root']);
const IE = [
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
  _E = {
    standard: hu,
    filled: au,
    outlined: Ru,
  },
  ME = (e) => {
    const { classes: t } = e;
    return _e(
      {
        root: ['root'],
      },
      PE,
      t,
    );
  },
  AE = ce(r0, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (e, t) => t.root,
  })({}),
  Uu = /* @__PURE__ */ y.forwardRef(function (t, o) {
    const r = Ae({
        props: t,
        name: 'MuiTextField',
      }),
      {
        autoComplete: i,
        autoFocus: a = !1,
        children: s,
        className: l,
        color: c = 'primary',
        defaultValue: u,
        disabled: d = !1,
        error: p = !1,
        FormHelperTextProps: h,
        fullWidth: v = !1,
        helperText: x,
        id: b,
        InputLabelProps: m,
        inputProps: k,
        InputProps: T,
        inputRef: C,
        label: E,
        maxRows: f,
        minRows: S,
        multiline: w = !1,
        name: j,
        onBlur: L,
        onChange: D,
        onFocus: I,
        placeholder: q,
        required: V = !1,
        rows: A,
        select: F = !1,
        SelectProps: B,
        type: te,
        value: U,
        variant: W = 'outlined',
      } = r,
      R = ye(r, IE),
      z = g({}, r, {
        autoFocus: a,
        color: c,
        disabled: d,
        error: p,
        fullWidth: v,
        multiline: w,
        required: V,
        select: F,
        variant: W,
      }),
      Z = ME(z);
    process.env.NODE_ENV !== 'production' &&
      F &&
      !s &&
      console.error(
        'MUI: `children` must be passed when using the `TextField` component with `select`.',
      );
    const G = {};
    W === 'outlined' && (m && typeof m.shrink < 'u' && (G.notched = m.shrink), (G.label = E)),
      F && ((!B || !B.native) && (G.id = void 0), (G['aria-describedby'] = void 0));
    const H = Fl(b),
      re = x && H ? `${H}-helper-text` : void 0,
      ie = E && H ? `${H}-label` : void 0,
      Q = _E[W],
      se = /* @__PURE__ */ _(
        Q,
        g(
          {
            'aria-describedby': re,
            autoComplete: i,
            autoFocus: a,
            defaultValue: u,
            fullWidth: v,
            multiline: w,
            name: j,
            rows: A,
            maxRows: f,
            minRows: S,
            type: te,
            value: U,
            id: H,
            inputRef: C,
            onBlur: L,
            onChange: D,
            onFocus: I,
            placeholder: q,
            inputProps: k,
          },
          G,
          T,
        ),
      );
    return /* @__PURE__ */ Ze(
      AE,
      g(
        {
          className: ve(Z.root, l),
          disabled: d,
          error: p,
          fullWidth: v,
          ref: o,
          required: V,
          color: c,
          variant: W,
          ownerState: z,
        },
        R,
        {
          children: [
            E != null &&
              E !== '' &&
              /* @__PURE__ */ _(
                B0,
                g(
                  {
                    htmlFor: H,
                    id: ie,
                  },
                  m,
                  {
                    children: E,
                  },
                ),
              ),
            F
              ? /* @__PURE__ */ _(
                  Kx,
                  g(
                    {
                      'aria-describedby': re,
                      id: H,
                      labelId: ie,
                      value: U,
                      input: se,
                    },
                    B,
                    {
                      children: s,
                    },
                  ),
                )
              : se,
            x &&
              /* @__PURE__ */ _(
                u0,
                g(
                  {
                    id: re,
                  },
                  h,
                  {
                    children: x,
                  },
                ),
              ),
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Uu.propTypes = {
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
const Wu = Uu;
function Kn({ isDisabled: e = !1, className: t, onClick: o, onContextMenu: r, children: i }) {
  return /* @__PURE__ */ _(by, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: o,
    onContextMenu: r,
    children: i,
  });
}
var Jn = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(Jn || {});
function DE({
  isChecked: e,
  labelText: t = '',
  labelPosition: o = Jn.After,
  isIndeterminate: r = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: s = !1,
  className: l,
  onChange: c,
}) {
  const u = /* @__PURE__ */ _(_y, {
    checked: e,
    indeterminate: r,
    defaultChecked: i,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${l ?? ''}`,
    onChange: c,
  });
  let d;
  if (t) {
    const p = o === Jn.Before || o === Jn.Above,
      h = /* @__PURE__ */ _('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${l ?? ''}`,
        children: t,
      }),
      v = o === Jn.Before || o === Jn.After,
      x = v ? h : /* @__PURE__ */ _('div', { children: h }),
      b = v ? u : /* @__PURE__ */ _('div', { children: u });
    d = /* @__PURE__ */ Ze(uu, {
      className: `papi-checkbox ${o.toString()}`,
      disabled: a,
      error: s,
      children: [p && x, b, !p && x],
    });
  } else d = u;
  return d;
}
function LE({
  title: e,
  isDisabled: t = !1,
  isClearable: o = !0,
  hasError: r = !1,
  isFullWidth: i = !1,
  width: a,
  options: s = [],
  className: l,
  value: c,
  onChange: u,
  onFocus: d,
  onBlur: p,
}) {
  return /* @__PURE__ */ _(Qv, {
    disablePortal: !0,
    disabled: t,
    disableClearable: !o,
    fullWidth: i,
    options: s,
    className: `papi-combo-box ${r ? 'error' : ''} ${l ?? ''}`,
    value: c,
    onChange: u,
    onFocus: d,
    onBlur: p,
    renderInput: (h) =>
      /* @__PURE__ */ _(Wu, {
        ...h,
        error: r,
        fullWidth: i,
        disabled: t,
        label: e,
        style: { width: a },
      }),
  });
}
var jE = Object.defineProperty,
  FE = (e, t, o) =>
    t in e ? jE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[t] = o),
  Te = (e, t, o) => (FE(e, typeof t != 'symbol' ? t + '' : t, o), o);
const to = class {
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
    return o < 0 || o >= to.allBookIds.length ? t : to.allBookIds[o];
  }
  /**
   * Gets the English book name from its book number.
   * @param number - Book number (this is 1-based, not an index).
   * @returns The English name of the book if found, or `'******'` otherwise.
   */
  static bookNumberToEnglishName(e) {
    return e <= 0 || e > this.lastBook ? '******' : to.allBookEnglishNames[e - 1];
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
let yt = to;
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
  Te(yt, 'lastBook', to.allBookIds.length)
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
  Te(yt, 'bookNumbers', to.createBookNumbers());
var xn = /* @__PURE__ */ ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(xn || {});
const Pn = class {
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
let Yt = Pn;
Te(Yt, 'Original', new Pn(xn.Original)),
  Te(Yt, 'Septuagint', new Pn(xn.Septuagint)),
  Te(Yt, 'Vulgate', new Pn(xn.Vulgate)),
  Te(Yt, 'English', new Pn(xn.English)),
  Te(Yt, 'RussianProtestant', new Pn(xn.RussianProtestant)),
  Te(Yt, 'RussianOrthodox', new Pn(xn.RussianOrthodox));
function Ol(e, t) {
  const o = t[0];
  for (let r = 1; r < t.length; r++) e = e.split(t[r]).join(o);
  return e.split(o);
}
var Hu = /* @__PURE__ */ ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(Hu || {});
const je = class {
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
        const i = e,
          a = t != null && t instanceof Yt ? t : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t == null)
        if (e != null && e instanceof je) {
          const i = e;
          (this._bookNum = i.bookNum),
            (this._chapterNum = i.chapterNum),
            (this._verseNum = i.verseNum),
            (this._verse = i.verse),
            (this.versification = i.versification);
        } else {
          if (e == null) return;
          const i = e instanceof Yt ? e : je.defaultVersification;
          this.setEmpty(i);
        }
      else throw new Error('VerseRef constructor not supported.');
    else if (e != null && t != null && o != null)
      if (typeof e == 'string' && typeof t == 'string' && typeof o == 'string')
        this.setEmpty(r), this.updateInternal(e, t, o);
      else if (typeof e == 'number' && typeof t == 'number' && typeof o == 'number')
        (this._bookNum = e),
          (this._chapterNum = t),
          (this._verseNum = o),
          (this.versification = r ?? je.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, t = je.defaultVersification) {
    const o = new je(t);
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
      return (t = je.parse(e)), { success: !0, verseRef: t };
    } catch (o) {
      if (o instanceof Oo) return (t = new je()), { success: !1, verseRef: t };
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
      (e % je.bcvMaxValue) * je.bookDigitShifter +
      (t >= 0 ? (t % je.bcvMaxValue) * je.chapterDigitShifter : 0) +
      (o >= 0 ? o % je.bcvMaxValue : 0)
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
      if (((t = t * 10 + +o - +'0'), t > je.bcvMaxValue)) return (t = -1), { success: !1, vNum: t };
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
      (this._verse.includes(je.verseRangeSeparator) ||
        this._verse.includes(je.verseSequenceIndicator))
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
    const { success: t, vNum: o } = je.tryGetVerseNum(e);
    (this._verse = t ? void 0 : e.replace(this.rtlMark, '')),
      (this._verseNum = o),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = je.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > yt.lastBook)
      throw new Oo('BookNum must be greater than zero and less than or equal to last book');
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
    this.versification = this.versification != null ? new Yt(e) : void 0;
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
    return this.validateVerse(je.verseRangeSeparators, je.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return je.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return je.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
      const i = e.split('/');
      if (((e = i[0]), i.length > 1))
        try {
          const a = +i[1].trim();
          this.versification = new Yt(xn[a]);
        } catch {
          throw new Oo('Invalid reference : ' + e);
        }
    }
    const t = e.trim().split(' ');
    if (t.length !== 2) throw new Oo('Invalid reference : ' + e);
    const o = t[1].split(':'),
      r = +o[0];
    if (
      o.length !== 2 ||
      yt.bookIdToNumber(t[0]) === 0 ||
      !Number.isInteger(r) ||
      r < 0 ||
      !je.isVerseParseable(o[1])
    )
      throw new Oo('Invalid reference : ' + e);
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
    return new je(this);
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
  allVerses(e = !1, t = je.verseRangeSeparators, o = je.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const r = [],
      i = Ol(this._verse, o);
    for (const a of i.map((s) => Ol(s, t))) {
      const s = this.clone();
      s.verse = a[0];
      const l = s.verseNum;
      if ((r.push(s), a.length > 1)) {
        const c = this.clone();
        if (((c.verse = a[1]), !e))
          for (let u = l + 1; u < c.verseNum; u++) {
            const d = new je(this._bookNum, this._chapterNum, u, this.versification);
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
      const i = r.internalValid;
      if (i !== 0) return i;
      const a = r.BBBCCCVVV;
      if (o > a) return 3;
      if (o === a) return 4;
      o = a;
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
  setEmpty(e = je.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, t, o) {
    (this.bookNum = yt.bookIdToNumber(e)), (this.chapter = t), (this.verse = o);
  }
};
let fn = je;
Te(fn, 'defaultVersification', Yt.English),
  Te(fn, 'verseRangeSeparator', '-'),
  Te(fn, 'verseSequenceIndicator', ','),
  Te(fn, 'verseRangeSeparators', [je.verseRangeSeparator]),
  Te(fn, 'verseSequenceIndicators', [je.verseSequenceIndicator]),
  Te(fn, 'chapterDigitShifter', 1e3),
  Te(fn, 'bookDigitShifter', je.chapterDigitShifter * je.chapterDigitShifter),
  Te(fn, 'bcvMaxValue', je.chapterDigitShifter - 1)
  /**
   * The valid status of the VerseRef.
   */,
  Te(fn, 'ValidStatusType', Hu);
class Oo extends Error {}
const qu = [
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
function Tl() {
  return yt.allBookIds.map((e) => ({
    bookId: e,
    label: yt.bookIdToEnglishName(e),
  }));
}
function kl(e) {
  return {
    bookId: yt.bookNumberToId(e),
    label: yt.bookNumberToEnglishName(e),
  };
}
const Yu = 1,
  BE = qu.length - 1,
  Gu = 1,
  Ku = 1,
  Xu = (e) => {
    var t;
    return ((t = qu[e]) == null ? void 0 : t.chapters) ?? -1;
  },
  wl = (e, t) => ({
    bookNum: Math.max(Yu, Math.min(e.bookNum + t, BE)),
    chapterNum: 1,
    verseNum: 1,
  }),
  Sl = (e, t) => ({
    ...e,
    chapterNum: Math.min(Math.max(Gu, e.chapterNum + t), Xu(e.bookNum)),
    verseNum: 1,
  }),
  Rl = (e, t) => ({
    ...e,
    verseNum: Math.max(Ku, e.verseNum + t),
  });
function Li({
  variant: e = 'outlined',
  isDisabled: t = !1,
  hasError: o = !1,
  isFullWidth: r = !1,
  helperText: i,
  label: a,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: u,
  value: d,
  onChange: p,
  onFocus: h,
  onBlur: v,
}) {
  return /* @__PURE__ */ _(Wu, {
    variant: e,
    disabled: t,
    error: o,
    fullWidth: r,
    helperText: i,
    label: a,
    placeholder: s,
    required: l,
    className: `papi-textfield ${c ?? ''}`,
    defaultValue: u,
    value: d,
    onChange: p,
    onFocus: h,
    onBlur: v,
  });
}
function XE({ scrRef: e, handleSubmit: t }) {
  const [o, r] = Pl(kl(e.bookNum)),
    i = (c) => {
      r(kl(c.bookNum)), t(c);
    },
    a = (c, u) => {
      const p = { bookNum: yt.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
      i(p);
    },
    s = (c) => {
      t({ ...e, chapterNum: +c.target.value });
    },
    l = (c) => {
      t({ ...e, verseNum: +c.target.value });
    };
  return /* @__PURE__ */ Ze(ad, {
    children: [
      /* @__PURE__ */ _(LE, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: Tl(),
        onChange: a,
        value: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ _(Kn, {
        onClick: () => i(wl(e, -1)),
        isDisabled: e.bookNum <= Yu,
        children: '<',
      }),
      /* @__PURE__ */ _(Kn, {
        onClick: () => i(wl(e, 1)),
        isDisabled: e.bookNum >= Tl().length,
        children: '>',
      }),
      /* @__PURE__ */ _(Li, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: s,
      }),
      /* @__PURE__ */ _(Kn, {
        onClick: () => t(Sl(e, -1)),
        isDisabled: e.chapterNum <= Gu,
        children: '<',
      }),
      /* @__PURE__ */ _(Kn, {
        onClick: () => t(Sl(e, 1)),
        isDisabled: e.chapterNum >= Xu(e.bookNum),
        children: '>',
      }),
      /* @__PURE__ */ _(Li, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: l,
      }),
      /* @__PURE__ */ _(Kn, {
        onClick: () => t(Rl(e, -1)),
        isDisabled: e.verseNum <= Ku,
        children: '<',
      }),
      /* @__PURE__ */ _(Kn, { onClick: () => t(Rl(e, 1)), children: '>' }),
    ],
  });
}
function JE({
  isDisabled: e = !1,
  orientation: t = 'horizontal',
  min: o = 0,
  max: r = 100,
  step: i = 1,
  showMarks: a = !1,
  defaultValue: s,
  valueLabelDisplay: l = 'off',
  className: c,
  onChange: u,
  onChangeCommitted: d,
}) {
  return /* @__PURE__ */ _(rE, {
    disabled: e,
    orientation: t,
    min: o,
    max: r,
    step: i,
    marks: a,
    defaultValue: s,
    valueLabelDisplay: l,
    className: `papi-slider ${t} ${c ?? ''}`,
    onChange: u,
    onChangeCommitted: d,
  });
}
function ZE({ isChecked: e, isDisabled: t = !1, hasError: o = !1, className: r, onChange: i }) {
  return /* @__PURE__ */ _(kE, {
    checked: e,
    disabled: t,
    className: `papi-switch ${o ? 'error' : ''} ${r ?? ''}`,
    onChange: i,
  });
}
function QE({
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
  return /* @__PURE__ */ _(bE, {
    autoHideDuration: e,
    className: `papi-snackbar ${o ?? ''}`,
    open: t,
    onClose: r,
    anchorOrigin: i,
    ContentProps: a,
    children: s,
  });
}
function zE(e) {
  const {
    onClick: t,
    name: o,
    hasAutoFocus: r = !1,
    className: i,
    isDense: a = !0,
    hasDisabledGutters: s = !1,
    hasDivider: l = !1,
    focusVisibleClassName: c,
  } = e;
  return /* @__PURE__ */ _(yx, {
    autoFocus: r,
    className: i,
    dense: a,
    disableGutters: s,
    divider: l,
    focusVisibleClassName: c,
    onClick: t,
    children: o,
  });
}
function Nl({ onRowChange: e, row: t, column: o }) {
  const r = (i) => {
    e({ ...t, [o.key]: i.target.value });
  };
  return /* @__PURE__ */ _(Li, { defaultValue: t[o.key], onChange: r });
}
const VE = ({ onChange: e, disabled: t, checked: o, ...r }) => {
  function i(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return /* @__PURE__ */ _(DE, {
    ...r,
    isChecked: o,
    isDisabled: t,
    onChange: i,
  });
};
function e1({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: o,
  onColumnResize: r,
  defaultColumnWidth: i,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: u,
  enableSelectColumn: d,
  selectColumnWidth: p = 50,
  rowKeyGetter: h,
  rowHeight: v = 35,
  headerRowHeight: x = 35,
  selectedRows: b,
  onSelectedRowsChange: m,
  onRowsChange: k,
  onCellClick: T,
  onCellDoubleClick: C,
  onCellContextMenu: E,
  onCellKeyDown: f,
  direction: S = 'ltr',
  enableVirtualization: w = !0,
  onCopy: j,
  onPaste: L,
  onScroll: D,
  className: I,
}) {
  const q = ed(() => {
    const V = e.map((A) =>
      typeof A.editable == 'function'
        ? {
            ...A,
            editable: (B) => !!A.editable(B),
            renderEditCell: A.renderEditCell || Nl,
          }
        : A.editable && !A.renderEditCell
        ? { ...A, renderEditCell: Nl }
        : A.renderEditCell && !A.editable
        ? { ...A, editable: !1 }
        : A,
    );
    return d ? [{ ...nd, minWidth: p }, ...V] : V;
  }, [d, e]);
  return /* @__PURE__ */ _(td, {
    columns: q,
    defaultColumnOptions: {
      width: i,
      minWidth: a,
      maxWidth: s,
      sortable: l,
      resizable: c,
    },
    sortColumns: t,
    onSortColumnsChange: o,
    onColumnResize: r,
    rows: u,
    rowKeyGetter: h,
    rowHeight: v,
    headerRowHeight: x,
    selectedRows: b,
    onSelectedRowsChange: m,
    onRowsChange: k,
    onCellClick: T,
    onCellDoubleClick: C,
    onCellContextMenu: E,
    onCellKeyDown: f,
    direction: S,
    enableVirtualization: w,
    onCopy: j,
    onPaste: L,
    onScroll: D,
    renderers: { renderCheckbox: VE },
    className: `${I ?? 'rdg-light'}`,
  });
}
function UE({ commandHandler: e, name: t, className: o, items: r }) {
  return /* @__PURE__ */ Ze(fu, {
    item: !0,
    xs: 1,
    className: `papi-menu-column ${o ?? ''}`,
    children: [
      /* @__PURE__ */ _('h3', { className: `papi-menu ${o ?? ''}`, children: t }),
      r.map((i, a) =>
        /* @__PURE__ */ _(
          zE,
          {
            className: `papi-menu-item ${i.className}`,
            onClick: () => e(i),
            ...i,
          },
          a,
        ),
      ),
    ],
  });
}
function WE({ commandHandler: e, className: t, columns: o }) {
  return /* @__PURE__ */ _(fu, {
    container: !0,
    spacing: 0,
    className: `papi-multi-column-menu ${t ?? ''}`,
    columns: o.length,
    children: o.map((r) =>
      /* @__PURE__ */ _(UE, {
        commandHandler: e,
        name: r.name,
        className: t,
        items: r.items,
      }),
    ),
  });
}
const HE = Fn(
  /* @__PURE__ */ _('path', {
    d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  }),
  'Menu',
);
function t1(e) {
  var a;
  const [t, o] = Pl(!1),
    r = hi(null),
    i = hi(null);
  return /* @__PURE__ */ _('div', {
    ref: r,
    style: { position: 'relative' },
    children: /* @__PURE__ */ _(uv, {
      position: 'static',
      children: /* @__PURE__ */ Ze($E, {
        className: `papi-toolbar ${e.className ?? ''}`,
        ref: i,
        variant: 'dense',
        children: [
          e.menu
            ? /* @__PURE__ */ _(va, {
                edge: 'start',
                className: `papi-menuButton ${e.className ?? ''}`,
                color: 'inherit',
                'aria-label': 'open drawer',
                onClick: () => {
                  o((s) => !s);
                },
                children: /* @__PURE__ */ _(HE, {}),
              })
            : null,
          e.children,
          e.menu
            ? /* @__PURE__ */ _(Ky, {
                className: `papi-menu-drawer ${e.className ?? ''}`,
                anchor: 'left',
                variant: 'persistent',
                open: t,
                onClose: () => {
                  t && o(!1);
                },
                style: {
                  position: 'relative',
                  // top: `${
                  //   toolbarRef.current === null
                  //     ? 2
                  //     : Number(
                  //         window
                  //           .getComputedStyle(toolbarRef.current, null)
                  //           .getPropertyValue('min-height'),
                  //       ) / 2
                  // }`,
                },
                PaperProps: {
                  style: {
                    top: '24px',
                    // top: `${
                    //   (toolbarRef.current?.parentElement?.offsetTop ?? 0) +
                    //   (toolbarRef.current?.offsetTop ?? 0) +
                    //   (toolbarRef.current?.clientHeight ?? 40)
                    // }px`,
                    height: '190px',
                    position: 'absolute',
                    width: '95%',
                  },
                },
                children: /* @__PURE__ */ _(WE, {
                  commandHandler: e.commandHandler,
                  columns: (a = e.menu) == null ? void 0 : a.columns,
                }),
              })
            : null,
        ],
      }),
    }),
  });
}
function qE(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const o = document.head || document.querySelector('head'),
    r = o.querySelector(':first-child'),
    i = document.createElement('style');
  i.appendChild(document.createTextNode(e)),
    t === 'top' && r ? o.insertBefore(i, r) : o.appendChild(i);
}
qE(
  `.papi-checkbox {
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
.papi-menu-item {
  line-height: 0.8;
}

.papi-menu-item.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-menu-item.paratext.bright {
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
.papi-toolbar {
  background-color: rgb(245, 245, 245);
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

.papi-menu-drawer {
  /* margin-right: auto; */
  position: relative;
  width: 100%;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.papi-multi-column-menu {
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu {
  background-color: rgb(145, 145, 145);
  font-size: 11pt;
  font-weight: 600;
  margin-top: 1px;
  padding-bottom: 2px;
  padding-left: 24px;
  padding-top: 2px;
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

`,
  'top',
);
export {
  Kn as Button,
  DE as Checkbox,
  LE as ComboBox,
  WE as GridMenu,
  Jn as LabelPosition,
  zE as MenuItem,
  XE as RefSelector,
  JE as Slider,
  QE as Snackbar,
  ZE as Switch,
  e1 as Table,
  Li as TextField,
  t1 as Toolbar,
};
//# sourceMappingURL=index.es.js.map
